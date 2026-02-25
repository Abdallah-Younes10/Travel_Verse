import React, { useState } from 'react';
import styles from '../TourGuide/UserManagement.module.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../../Pages/Auth/axios';
import { Spinner, Alert, Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const typeLabels = {
  all: 'All',
  Trip: 'Trips',
  Hotel: 'Hotels',
  Restaurant: 'Restaurants',
  Activity: 'Activities',
};

const MyFavorites = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState('all');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const res = await axios.get('/favorites');
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`/favorites/${id}`);
    },
    onSuccess: () => {
      toast.success('Removed from favorites');
      queryClient.invalidateQueries(['favorites']);
    },
    onError: () => toast.error('Failed to remove'),
  });

  const filteredData =
    filter === 'all'
      ? data
      : data?.filter((fav) => fav.favoritable_type === `App\\Models\\${filter}`);

  if (isLoading) {
    return (
      <div className={styles.card}>
        <Spinner animation="border" /> Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.card}>
        <Alert variant="danger">Failed to load favorites.</Alert>
      </div>
    );
  }

  if (!filteredData || filteredData.length === 0) {
    return (
      <div className={styles.card}>
        <h2>My Favorites</h2>
        <FilterBar filter={filter} setFilter={setFilter} />
        <Alert variant="warning">No favorites found for selected type.</Alert>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <h2>My Favorites</h2>
      <FilterBar filter={filter} setFilter={setFilter} />

      <ul className="list-unstyled mt-3">
        {filteredData.map((fav) => {
          const item = fav.favoritable;
          const type = fav.favoritable_type?.replace('App\\Models\\', '');
          const title =
            item?.name ||
            item?.title ||
            item?.name_en ||
            item?.name_ar ||
            item?.title_en ||
            item?.title_ar ||
            'Unnamed';

          if (!item) return null;

          return (
            <li
              key={fav.id}
              className="mb-3 d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center">
                {item.image && (
                  <img
                    src={item.image}
                    alt={title}
                    style={{
                      width: '60px',
                      height: '40px',
                      objectFit: 'cover',
                      marginRight: '10px',
                    }}
                  />
                )}
                <strong>{title}</strong> - {type}
              </div>
              <div>
                <Link
  to={`/itemdetail/${item.id}?type=${type}`}
  className="btn btn-sm btn-primary me-2"
>
  Details
</Link>

                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => deleteMutation.mutate(fav.id)}
                >
                  Remove
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// ✅ مكون الفلترة العلوي
const FilterBar = ({ filter, setFilter }) => (
  <ButtonGroup className="mt-2">
    {Object.entries(typeLabels).map(([key, label]) => (
      <Button
        key={key}
        variant={filter === key ? 'primary' : 'outline-primary'}
        onClick={() => setFilter(key)}
        size="sm"
      >
        {label}
      </Button>
    ))}
  </ButtonGroup>
);

export default MyFavorites;
