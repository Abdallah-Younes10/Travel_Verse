// src/Utility/Cards/CategoriesCard.jsx
import React from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const CategoriesCard = ({ image, title, description, isLoading, onClick }) => {
  const getImageSrc = () => {
    if (!image) return '/fallback.jpg';

    if (Array.isArray(image)) {
      if (image.length === 0) return '/fallback.jpg';
      image = image[0];
    }

    if (typeof image === 'object' && image instanceof File) {
      return URL.createObjectURL(image);
    }

    if (typeof image === 'string') {
      if (image.startsWith('http') || image.startsWith('data:')) {
        return image;
      } else {
        const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
        return `${BASE_URL}${image}`;
      }
    }

    return '/fallback.jpg';
  };

  return (
    <StyledWrapper onClick={onClick}>
      <div className="card">
        {isLoading ? (
          <>
            <div className="image-placeholder" />
            <div className="content-placeholder">
              <div className="line title" />
              <div className="line" />
              <div className="line short" />
              <div className="line half" />
              <div className="button-placeholder" />
            </div>
          </>
        ) : (
          <>
            <LazyLoadImage
              src={getImageSrc()}
              alt={title}
              effect="blur"
              height="100%"
              width="100%"
              className="card-img h-full"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/fallback.jpg';
              }}
            />
            <div className="card__content p-3">
              <p className="card__title">{title}</p>
              <p className="card__description">{description}</p>
            </div>
          </>
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  cursor: pointer;

  .card {
    position: relative;
    width: 100%;
    height: 200px;
    border-radius: 10px;
    overflow: hidden;
    background: #eee;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  .card-img {
    object-fit: cover;
  }

  .card__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 0.7);
    width: 100%;
    height: 100%;
    padding: 20px;
    opacity: 0;
    transition: 0.6s;
  }

  .card:hover .card__content {
    opacity: 1;
  }

  .card__title {
    font-size: 20px;
    font-weight: bold;
  }

  .card__description {
    font-size: 12px;
    margin-top: 10px;
  }
`;

export default CategoriesCard;
