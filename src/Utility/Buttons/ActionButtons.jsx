import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from '../../Pages/Auth/axios';
import { toast } from 'react-toastify';

const ActionButtons = ({ data, type = "trip" }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleReservation = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error(t('mustBeLoggedIn'));
      return;
    }

    try {
      await axios.post(
        'http://localhost:8000/api/reservations',
        {
          reservable_type: `App\\Models\\${type.charAt(0).toUpperCase() + type.slice(1)}`,
          reservable_id: data.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(t('reservationSuccessful'));
    //   navigate('/user/my-reservations');
    } catch (error) {
      toast.error(error.response?.data?.message || t('reservationFailed'));
    }
  };

  const handleAddToFavorites = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error(t('mustBeLoggedInFavorites'));
      return;
    }

    try {
      await axios.post(
        'http://localhost:8000/api/favorites',
        {
          favoritable_type: `App\\Models\\${type.charAt(0).toUpperCase() + type.slice(1)}`,
          favoritable_id: data.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(t('addedToFavorites'));
    } catch (error) {
      toast.error(error.response?.data?.message || t('favoritesFailed'));
    }
  };

  return (
    <div className="d-flex flex-column gap-2 mt-4">
      <Link
        to={`/itemdetail/${data.id}?type=${type}`}
        type={{ type }}
        className="btn btn-primary btn-sm"
      >
        {t('details')}
      </Link>

      <button
        onClick={handleReservation}
        className="btn btn-success btn-sm"
      >
        {t('bookTickets')}
      </button>

      <button
        onClick={handleAddToFavorites}
        className="btn btn-outline-primary btn-sm"
      >
        {t('addToWishList')}
      </button>
    </div>
  );
};

export default ActionButtons;
