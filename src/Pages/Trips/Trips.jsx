import React, { useMemo, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import HeroTrip from "../../Component/Trips/HeroTrip";
import DropdownFilter from "../../Utility/DropdownFilter/DropdownFilter";
import TripCard from "../../Utility/Cards/TripCard";
import Head from "../../Component/Trips/Head";
import style from "../../Style/Trips/Trips.module.css";
import { useTranslation } from "react-i18next";

const fetchTrips = async ({ page = 1 }) => {
    const response = await axios.get("http://localhost:8000/api/trips", {
        params: { page },
    });
    return response.data;
};

const Trips = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        style: [],
        budget: [],
        duration: [],
        continent: [],
    });
    const [sortOption, setSortOption] = useState("");

    const { t } = useTranslation();

    const { data, isLoading } = useQuery({
        queryKey: ["trips", currentPage],
        queryFn: () => fetchTrips({ page: currentPage }),
        keepPreviousData: true,
    });

    const trips = data?.data || [];
    const totalPages = data?.meta?.last_page || 1;

    // حساب خيارات الفلترة تلقائيًا من البيانات
    const filterOptions = useMemo(() => {
        const styles = [...new Set(trips.map((t) => t.type))];
        const continents = [...new Set(trips.map((t) => t.continent))];
        const durations = ["1-3 Days", "4-7 Days", "8-14 Days", "15 Days+"];
        const budgets = ["0-500", "500-1000", "1000-1500", "1500+"];
        return { styles, continents, durations, budgets };
    }, [trips]);

    // فلترة و فرز الرحلات على الواجهة
    const filteredTrips = useMemo(() => {
        let result = [...trips];

        if (filters.style.length)
            result = result.filter((trip) => filters.style.includes(trip.type));

        if (filters.continent.length)
            result = result.filter((trip) =>
                filters.continent.includes(trip.continent),
            );

        if (filters.duration.length) {
            result = result.filter((trip) => {
                const days = parseInt(trip.duration); // "12 Day" → 12
                return filters.duration.some((d) => {
                    if (d === "1-3 Days") return days <= 3;
                    if (d === "4-7 Days") return days >= 4 && days <= 7;
                    if (d === "8-14 Days") return days >= 8 && days <= 14;
                    if (d === "15 Days+") return days > 14;
                    return true;
                });
            });
        }

        if (filters.budget.length) {
            result = result.filter((trip) => {
                const price = parseFloat(trip.price);
                return filters.budget.some((b) => {
                    if (b === "0-500") return price <= 500;
                    if (b === "500-1000") return price > 500 && price <= 1000;
                    if (b === "1000-1500") return price > 1000 && price <= 1500;
                    if (b === "1500+") return price > 1500;
                    return true;
                });
            });
        }

        if (sortOption) {
            result.sort((a, b) => {
                if (sortOption === "Budget low to high")
                    return a.price - b.price;
                if (sortOption === "Budget high to low")
                    return b.price - a.price;
                if (sortOption === "Duration low to high")
                    return parseInt(a.duration) - parseInt(b.duration);
                if (sortOption === "Duration high to low")
                    return parseInt(b.duration) - parseInt(a.duration);
                if (sortOption === "Recently Added")
                    return new Date(b.created_at) - new Date(a.created_at);
                return 0;
            });
        }

        return result;
    }, [trips, filters, sortOption]);

    return (
        <div>
            <HeroTrip />
            <h1 style={{ textAlign: "center", marginTop: "15px" }}>
                {t("travelIdeasTitle")}
            </h1>
            <h5 style={{ textAlign: "center", marginTop: "5px" }}>
                {t("travelIdeasSubtitle")}
            </h5>

            <h3 className="my-5 me-auto" style={{ textAlign: "center" }}>
                {" "}
                {t("travelIdeasFilter")}
            </h3>
            <Container>
                <Row className={style.filter}>
                    <Col>
                        <DropdownFilter
                            title={t("budget")}
                            options={filterOptions.budgets}
                            selected={filters.budget}
                            onChange={(val) => {
                                setCurrentPage(1);
                                setFilters((prev) => ({
                                    ...prev,
                                    budget: val,
                                }));
                            }}
                        />
                    </Col>
                    <Col>
                        <DropdownFilter
                            title={t("duration")}
                            options={filterOptions.durations}
                            selected={filters.duration}
                            onChange={(val) => {
                                setCurrentPage(1);
                                setFilters((prev) => ({
                                    ...prev,
                                    duration: val,
                                }));
                            }}
                        />
                    </Col>
                    <Col>
                        <DropdownFilter
                            title={t("continent")}
                            options={filterOptions.continents}
                            selected={filters.continent}
                            onChange={(val) => {
                                setCurrentPage(1);
                                setFilters((prev) => ({
                                    ...prev,
                                    continent: val,
                                }));
                            }}
                        />
                    </Col>
                </Row>

                <Row className={style.head}>
                    <Col>
                        <h5>
                            {filteredTrips.length} {t("curatedTrips")}
                        </h5>
                    </Col>
                    <Col style={{ maxWidth: "fit-content" }}>
                        <Head
                            title={t("sort")}
                            options={[
                                t("sortBudgetLowHigh"),
                                t("sortBudgetHighLow"),
                                t("sortDurationLowHigh"),
                                t("sortDurationHighLow"),
                            ]}
                            selected={sortOption}
                            onChange={(val) => {
                                setSortOption(val);
                                setCurrentPage(1);
                            }}
                        />
                    </Col>
                </Row>

                <Row xs={1} sm={2} md={3} lg={4} className="g-4 mb-4" >
                    {isLoading ? (
                        Array.from({ length: 8 }).map((_, i) => (
                            <Col key={i}>
                                <TripCard loading={true} />
                            </Col>
                        ))
                    ) : filteredTrips.length > 0 ? (
                        filteredTrips.map((trip) => (
                            <Col key={trip.id} >
                                <TripCard
                                    id={trip.id}
                                    image={trip.images}
                                    title={trip.name}
                                    duration={trip.duration}
                                    price={trip.price}
                                    description={trip.description}
                                    rate={trip.rate}
                                />
                            </Col>
                        ))
                    ) : (
                        <Col>
                            <div
                                style={{
                                    textAlign: "center",
                                    margin: "40px 0",
                                }}
                            >
                                <h5>No trips found matching your filters.</h5>
                            </div>
                        </Col>
                    )}
                </Row>

                {!isLoading && totalPages > 1 && (
                    <div className="d-flex justify-content-center mt-4 gap-3">
                        <Button
                            variant="outline-secondary"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => p - 1)}
                        >
                            السابق
                        </Button>
                        <span className="align-self-center">
                            صفحة {currentPage} من {totalPages}
                        </span>
                        <Button
                            variant="outline-secondary"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((p) => p + 1)}
                        >
                            التالي
                        </Button>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Trips;
