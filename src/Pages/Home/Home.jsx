import React, { Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const HeroPlane = lazy(() => import('../../Component/Home/Hero/HeroPlane'));
const FeaturedContainer = lazy(() => import('../../Component/Home/FeaturedContainer/FeaturedContainer'));
const TripCarousel = lazy(() => import('../../Utility/TripCarousel/TripCarousel'));
const ModernSlider = lazy(() => import('../../Utility/ModernSlider/ModernSlider'));
const ContainerCatCard = lazy(() => import('../../Component/Home/ContainerCatCard/ContainerCatCard'));
const Poster = lazy(() => import('../../Utility/Poster/Poster'));


const Home = () => {
    const { t } = useTranslation();
    const currency = useSelector((state) => state.currency.currency);

  return (
    <Suspense fallback={<div>Loading page...</div>}>
  <HeroPlane />
  <FeaturedContainer />
  <section className="text-center my-5">
    <h1>{t("featured_trips")}</h1>
    <TripCarousel />
  </section>
  <section className="text-center mt-5">
    <h2>{t("treat_yourself")}</h2>
    <h3>{t("choice_awards")}</h3>
    <ModernSlider />
  </section>
  <section className="container my-5">
    <ContainerCatCard type="activitie" />
    <ContainerCatCard type="trip" />
    <ContainerCatCard type="hotel" />
    <ContainerCatCard type="restaurant" />
  </section>
  <Poster />
</Suspense>

  );
};

export default Home;
