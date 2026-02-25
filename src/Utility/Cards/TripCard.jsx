import React from "react";
import styles from "./ContainerCatCard.module.css";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useTransCurrency from "../../Hooks/useTransCurrency";
import WatchlistButton from '../Buttons/WatchlistButton';

const ContainerCatCard = ({
  id,
  title,
  name,
  image,
  cover,
  location,
  price,
  rate,
  description,
  type = "trip",
  loading = false,
}) => {
  const getPath = () => {
    switch (type) {
      case "trip":
        return `/itemdetail/${id}?type=trip`;
      case "hotel":
        return `/itemdetail/${id}?type=hotel`;
      case "restaurant":
        return `/itemdetail/${id}?type=restaurant`;
      case "activity":
        return `/itemdetail/${id}?type=activity`;
      case "cruise":
        return `/itemdetail/${id}?type=cruise`;
      case "car":
        return `/itemdetail/${id}?type=car`;
      default:
        return "#";
    }
  };

  const getFullImageUrl = (img) => {
  if (!img) return "/fallback.jpg";

  // لو img مصفوفة ناخد أول عنصر
  if (Array.isArray(img)) {
    img = img[0];
  }

  if (typeof img !== "string") return "/fallback.jpg";

  if (img.startsWith("http") || img.startsWith("data:")) return img;

  const BASE_URL =
    process.env.REACT_APP_API_BASE_URL ||
    "http://localhost:8000";

  return `${BASE_URL}${img}`;
};


  const cardTitle = title || name;
  const img = image || cover;
  const shortDesc =
    description && description.length > 100
      ? description.slice(0, 100) + "..."
      : description;

  return (
    <Link to={loading ? "#" : getPath()} className={styles.cardLink}>
      <div className={`${styles.card} bg-transparent h-full shadow-lg hover:shadow-xl transition-shadow duration-300 `} style={{ position: 'relative' }}>
        <div className={styles.imageWrapper} style={{ position: 'relative' }}>
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height={180} />
          ) : (
            <>
              <LazyLoadImage
                src={getFullImageUrl(img)}
                alt={cardTitle}
                className={styles.image}
                effect="blur"
              />
              <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 10 }}>
                <WatchlistButton type={type} id={id} />
              </div>
            </>
          )}
        </div>

        <div className={styles.content}>
          <h4 className={`${styles.title} dark:text-white!`}>
            {loading ? <Skeleton width={120} /> : cardTitle}
          </h4>
          <p className={styles.location}>
            {loading ? <Skeleton width={80} /> : location}
          </p>
          <p className={styles.description}>
            {loading ? <Skeleton height={40} /> : shortDesc}
          </p>
          <div className={styles.bottomRow}>
            <span className={styles.price}>
              {loading ? <Skeleton width={60} /> : useTransCurrency(price)}
            </span>
            <span className={styles.rate}>
              ⭐ {rate ? rate : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ContainerCatCard;
