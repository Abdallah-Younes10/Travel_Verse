import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import HeroContinent from "../../Component/Continent/HeroContinent";
import ContainerCatCard from "../../Component/Home/ContainerCatCard/ContainerCatCard";
import CitySelect from "../../Component/Continent/CitySelect";
import { continentData } from "./continentData";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useTranslation } from "react-i18next";

const fetchData = async (endpoint) => {
  const res = await axios.get(`http://localhost:8000/api/${endpoint}`);
  return res.data;
};

const Continent = () => {
  const { continent } = useParams();
  const { t } = useTranslation();
  const currentContinent = continentData(t)[continent];

  const { data: tripsData = [], isLoading: tripsLoading } = useQuery({
    queryKey: ["trips"],
    queryFn: () => fetchData("trips"),
    staleTime: 1000 * 60 * 5,
  });

  const { data: hotelsData = [], isLoading: hotelsLoading } = useQuery({
    queryKey: ["hotels"],
    queryFn: () => fetchData("hotels"),
    staleTime: 1000 * 60 * 5,
  });

  const { data: restaurantsData = [], isLoading: restaurantsLoading } = useQuery({
    queryKey: ["restaurants"],
    queryFn: () => fetchData("restaurants"),
    staleTime: 1000 * 60 * 5,
  });

  const { data: activitiesData = [], isLoading: activitiesLoading } = useQuery({
    queryKey: ["activities"],
    queryFn: () => fetchData("activities"),
    staleTime: 1000 * 60 * 5,
  });

  const filterByContinent = (items) => {
    if (!items) return [];
    return items.filter((item) =>
      currentContinent?.cities.some((city) =>
        item.location?.toLowerCase().includes(city.trim().toLowerCase())
      )
    );
  };

  const filteredTrips = useMemo(() => filterByContinent(tripsData?.data), [continent, tripsData]);
  const filteredHotels = useMemo(() => filterByContinent(hotelsData?.data), [continent, hotelsData]);
  const filteredRestaurants = useMemo(() => filterByContinent(restaurantsData?.data), [continent, restaurantsData]);
  const filteredActivities = useMemo(() => filterByContinent(activitiesData?.data), [continent, activitiesData]);

  return (
    <div className="continent-wrapper">
      <HeroContinent {...currentContinent} />
      <CitySelect cities={currentContinent?.cities} />

      {/* Bloc: Trips */}
      <div className="section-block">
        <ContainerCatCard type="trip" data={filteredTrips} isLoading={tripsLoading} />
      </div>

      {/* Bloc: Hotels */}
      <div className="section-block">
        <ContainerCatCard type="hotel" data={filteredHotels} isLoading={hotelsLoading} />
      </div>

      {/* Bloc: Restaurants */}
      <div className="section-block">
        <ContainerCatCard type="restaurant" data={filteredRestaurants} isLoading={restaurantsLoading} />
      </div>

      {/* Bloc: Activities */}
      <div className="section-block">
        <ContainerCatCard type="activitie" data={filteredActivities} isLoading={activitiesLoading} />
      </div>
    </div>
  );
};

export default Continent;
