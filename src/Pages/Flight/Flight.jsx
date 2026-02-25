import React, { useState } from 'react';
import { Col, Container, Row, Pagination } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import CityContent from '../../Component/City/CityContent';
import citiesData from '../../Component/City/citiesData';
import FlightCard from '../../Utility/Cards/FlightCard';
import Head from '../../Component/Trips/Head';
import FlightFilter from '../../Component/Flight/FlightFilter';
import style from '../../Style/Hotel/Hotel.module.css';
import FlightCardPlaceholder from '../../Utility/Cards/FlightCardPlaceholder';
import HeroCar from '../../Component/Home/Hero/HeroCar';
import car from '../../Assets/images/pexels-marina-hinic-199169-730778.jpg';

export const Flight = () => {
  const { cityName } = useParams();
  const { t } = useTranslation();
  const cityInfo = citiesData.find(city => city.name === cityName);

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['flights', currentPage],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:8000/api/flights?page=${currentPage}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  if (!cityInfo) return <p>{t('noCityFound')}</p>;

  const cityFlights = (data?.data || []).filter(
    flight =>
      flight?.from_location?.toLowerCase().includes(cityName.toLowerCase()) ||
      flight?.to_location?.toLowerCase().includes(cityName.toLowerCase())
  );

  const totalPages = data?.last_page || 1;

  return (
    <div>
              <HeroCar image={car} />
      {/* <FlightFilter countryName={cityInfo.name} title="Flights" /> */}
      <CityContent countryName={cityInfo.name} />

      <Container>
        <Row className={style.head}>
          <Col>
            <h5>{cityFlights.length} {t('flightsFound')}</h5>
          </Col>
          <Col style={{ maxWidth: 'fit-content' }}>
            <Head
              title={t('sortBy')}
              options={[t('bestValue'), t('travelerRanked'), t('priceLowToHigh')]}
            />
          </Col>
        </Row>

        <Row className={style.head}>


          <Col xs={12}>
            {isLoading ? (
              <>
                <FlightCardPlaceholder />
                <FlightCardPlaceholder />
                <FlightCardPlaceholder />
              </>
            ) : cityFlights.length === 0 ? (
              <p>{t('noFlightsFound')} {cityName}.</p>
            ) : (
              <>
                {cityFlights.map((flight) => (
                  <FlightCard key={flight.id} data={flight} />
                ))}

                <Pagination className="justify-content-center mt-4">
                  <Pagination.Prev
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  />
                  {[...Array(totalPages).keys()].map((page) => (
                    <Pagination.Item
                      key={page + 1}
                      active={page + 1 === currentPage}
                      onClick={() => setCurrentPage(page + 1)}
                    >
                      {page + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Flight;
