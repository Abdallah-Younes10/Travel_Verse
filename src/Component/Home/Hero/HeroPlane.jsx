import React, { memo } from "react";
// import { LazyLoadImage } from 'react-lazy-load-image-component';
import "react-lazy-load-image-component/src/effects/blur.css";
import { Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import cloud from "../../../Assets/videos/cloud-scene-4k.mp4.mp4";
import cloudPoster from "../../../Assets/images/watercolor-sky-with-clouds-wind-flow-background.jpg"; // صورة صغيرة كمؤشر للفيديو
import style from "../../../Style/HomeStyle/HeroPlane.module.css";
import plane from "../../../Assets/images/pexels-pascalr-113017-removebg-preview.png";
import { LazyLoadImage } from "react-lazy-load-image-component";

const HeroPlane = () => {
    const { t } = useTranslation();

    return (
        <div className={`${style.video_container}`}>
            {/* Lazy Loaded Video */}
            <video
                className={style.vid}
                autoPlay
                muted
                loop
                width="1920"
                height="400"
                preload="none"
                poster={cloudPoster}
                aria-label="خلفية فيديو تعرض مشهد السحاب"
            >
                <source src={cloud} type="video/mp4" />
            </video>

            <div className={style.info}>
                <div className={style.container}>
                    <Row className={style.row_plane}>
                        <Col xs={10} lg="4" className="text-black content-center text-center flex flex-col gap-2 justify-center">
                            <h4>{t("hero_title")}</h4>
                            <h2>{t("hero_experience")}</h2>
                            <p>{t("hero_discover")}</p>
                        </Col>
                        <Col xs={12} lg="6">
                            <Row>
                                {/* Lazy Loaded Image */}
                                <LazyLoadImage
                                    src={plane}
                                    alt="صورة الطائرة"
                                    effect="blur"
                                    width="600"
                                    height="300"
                                    className={`${style.image} hidden md:block`}
                                />
                            </Row>
                            <Row className={`${style.container_text} `}>
                                <div className={`bg-white text-black dark:bg-gray-900! dark:text-white! ${style.small_text } `}>
                                    {t("feature_knowledge")}
                                </div>
                                <div className={`bg-white text-black dark:bg-gray-900! dark:text-white! ${style.big_text}`}>
                                    <h5>{t("book_now")}</h5>
                                    <p>{t("plan_trip_description")}</p>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default memo(HeroPlane); // تحسين الأداء بمنع إعادة التصيير غير الضروري
