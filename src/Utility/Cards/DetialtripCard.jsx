import { Rating } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useTransCurrency from '../../Hooks/useTransCurrency';
import styled from 'styled-components';
import axios from '../../Pages/Auth/axios';
import { toast } from 'react-toastify';

const DetialtripCard = ({ trip, loading  , reservable_type }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const convertedPrice = useTransCurrency(trip?.price || 0);

  const handleReservation = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You must be logged in');
      return;
    }
    if(reservable_type === 'activitie'){
        reservable_type = 'activity';
      return;
    }

    try {
      await axios.post(
        'http://localhost:8000/api/reservations',
        {
          reservable_type: `App\\Models\\${reservable_type.charAt(0).toUpperCase() + reservable_type.slice(1)}`,
          reservable_id: trip?.id,
        //   reservable_name: trip?.name
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success('Reservation successful!');
    //   navigate('/user/reservations');
    } catch (error) {
      toast.error(error.response?.data?.message || t('reservationFailed'));
    }
  };

  // 🛡️ حماية ضد undefined
  if (loading || !trip) {
    return <p>{t('loadingTripDetails')}</p>;
  }

  return (
    <StyledWrapper>
      <article className="job-card">
        <div>
          <p className="text-title">{trip.name}</p>
          <p>{t('guide')}: {trip.guide ? trip.guide.name : 'No'}</p>
        </div>

        <div className="budget-exp">
          <div>
            <p className="value">{t('admissionTickets')}</p>
            <p className="label"><span>{t('from')} </span>{convertedPrice}</p>
          </div>
          <div>
            <p className="value">{t('experience')}</p>
            <p className="label">{trip.difficulty || 'N/A'}</p>
          </div>
        </div>

        <h4>{t('about')}</h4>
        <p className="text-body">{trip.description}</p>

        <div className="tags">
          <article>
            <Rating name="half-rating-read" defaultValue={Number(trip.rate) || 3.5} precision={0.5} readOnly />
            <h6>{trip.reviews_count || 0} {t('nReviews')}</h6>
            <ul>
              <li>{t('duration')}: {trip.duration} {t('hours')}</li>
              <li>{t('location')}: {trip.location}</li>
              <li>{t('difficulty')}: {trip.difficulty || 'Easy'}</li>
            </ul>
          </article>
        </div>

        <div className="reservation-fields">
          <button className="card-btn" onClick={handleReservation}>{t('addWatchList')}</button>
        </div>

        <div className="reservation-fields">
          {trip.booking_link ? (
            <a
              href={trip.booking_link}
              target="_blank"
              rel="noopener noreferrer"
              className="card-btn"
            >
              {t('bookTickets')}
            </a>
          ) : (
            <button className="card-btn disabled" disabled>
              {t('bookingUnavailable')}
            </button>
          )}
        </div>
      </article>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .job-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: #091e4240 0px 1px 1px, #091e4221 0px 0px 1px 1px;
    border-radius: 0.6em;
    padding: 1em;
    max-width: 30em;
  }

  .text-title {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 1.25em;
    font-weight: 600;
    font-family: "Noto Sans", sans-serif;
    margin-bottom: 0;
  }

  .text-body {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-family: "Poppins", sans-serif;
    letter-spacing: 0.4px;
  }

  .post-date {
    color: #2768b3;
  }

  .budget-exp {
    display: flex;
    gap: 5em;
  }

  .budget-exp .value {
    font-size: 1em;
    font-weight: 600;
    margin-bottom: 0;
  }

  .budget-exp .label {
    font-size: 1em;
    color: #2768b3;
  }

  .budget-exp .label span {
    color: black;
    font-size: 0.8em;
  }

  .tags article {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6em;
  }

  .reservation-fields {
    margin-top: 1em;
  }

  .card-btn {
    border: none;
    font-size: 1rem;
    background-color: #2768b3;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 2em;
    padding: 0.6em 1em;
    width: 100%;
  }

  .card-btn:hover {
    background-color: rgb(27, 71, 121);
  }
`;

export default DetialtripCard;
