// src/Pages/Details/DetialItem.jsx
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Rating from '@mui/material/Rating';
import { Skeleton } from '@mui/material';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from '../Auth/axios';

import style from '../../Style/DetialTrip/DetialTrip.module.css';
import ImageGallery from '../../Component/DetialTrip/ImageList';
import DetialtripCard from '../../Utility/Cards/DetialtripCard';
import ContainerCatCard from '../../Component/Home/ContainerCatCard/ContainerCatCard';
import CommentCard from '../../Utility/Cards/CommentCard';
import { ArrowBigLeft } from 'lucide-react';

// Map singular types to plural API endpoints
const getApiEndpoint = (type) => {
  const pluralMap = {
    'activity': 'activities',
    'trip': 'trips',
    'hotel': 'hotels',
    'restaurant': 'restaurants',
    'cruise': 'cruises',
    'car': 'cars',
    'flight': 'flights',
  };
  return pluralMap[type] || `${type}s`; // fallback to adding 's' if not in map
};

const fetchItem = async ({ queryKey }) => {
  const [_key, { type, id }] = queryKey;
  const endpoint = getApiEndpoint(type);
  const res = await axios.get(`http://localhost:8000/api/${endpoint}/${id}`);
  return { ...res.data, endpoint };
};

const fetchReviews = async () => {
  try {
    const res = await axios.get('http://localhost:8000/api/reviews');
    return res.data.data || [];
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    return [];
  }
};

const DetialItem = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
const type = searchParams.get('type')?.toLowerCase() || 'trip';



  const [visibleCount, setVisibleCount] = useState(3);

 const {
  data: selectedItem,
  isLoading: itemLoading
} = useQuery({
  queryKey: ['item', { type, id }],
  queryFn: fetchItem
});

const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

const {
  data: allReviews = [],
  isLoading: reviewLoading
} = useQuery({
  queryKey: ['reviews'],
  queryFn: fetchReviews,
  enabled: !!token,
});


  const itemReviews = allReviews
    .filter((r) => r[`${type}_id`] === Number(id))
    .slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };
// useEffect(() => {
//   console.log('API Response:', selectedItem);
// }, [selectedItem]);

  return (
    <Container>
      <h1>{itemLoading ? <Skeleton width={300} /> : selectedItem?.name || 'Details'}</h1>
      <div className="flex items-center mb-3">
        <ArrowBigLeft />
     <Link to={-1} className="dark:text-white! text-black hover:scale-120  ">{t('back')}</Link>
     </div>
      <Row className={style.info}>
        <Col>
          {itemLoading ? (
            <Skeleton width={120} />
          ) : (
            <Rating
              name="rating"
              defaultValue={Number(selectedItem?.rate) || 3.5}
              precision={0.5}
              readOnly
            />
          )}
        </Col>
        <Col>
          {itemLoading ? <Skeleton width={80} /> : <p>{t('location')}: {selectedItem?.location || <Skeleton width={100} />}</p>}
        </Col>
        <Col>
          <ul>
            <li>{t('duration')}: {selectedItem?.duration || <Skeleton width={50} />} {t('hours')}</li>
            {/* <li>{t('location')}: {selectedItem?.location || <Skeleton width={100} />}</li> */}
            <li>{t('guide')}: {selectedItem?.guide ? selectedItem?.guide.name : 'No'}</li>
          </ul>
        </Col>
      </Row>

      <Row className={style.info}>
        <Col>
          <ImageGallery images={selectedItem?.images || []} />
        </Col>
        <Col>
          <DetialtripCard trip={selectedItem} loading={itemLoading} reservable_type={type} />
        </Col>
      </Row>

      <ContainerCatCard type={type} />

      {/* <div className={style.bg}>
        <h3 className={style.text}>See what travelers are saying</h3>
        <Container className={style.comment}>
          {reviewLoading || itemLoading ? (
            [1, 2, 3].map((i) => <Skeleton key={i} height={100} style={{ marginBottom: 20 }} />)
          ) : itemReviews.length > 0 ? (
            <>
              {itemReviews.map((review) => (
                <CommentCard
                  key={review.id}
                  name={review.name}
                  image={review.avatar}
                  description={review.comment}
                />
              ))}
              {itemReviews.length < allReviews.filter((r) => r[`${type}_id`] === Number(id)).length && (
                <button className="btn btn-outline-primary mt-3" onClick={handleLoadMore}>
                  Load More
                </button>
              )}
            </>
          ) : (
            <p>No reviews yet for this {type}.</p>
          )}
        </Container>
      </div> */}
    </Container>
  );
};

export default DetialItem;
