// src/Pages/TourGuide/MyReservations.jsx
import React, { useState } from 'react';
import ReservationTable from './ReservationTable';
import styles from '../UserMang/UserManagement.module.css';

function MyReservations() {
  const [reservations, setReservations] = useState([
    {
      id: 1,
      guest: 'Ahmed Ali',
      trip: 'Luxor Tour',
      status: 'Pending',
      email: 'ahmed@example.com',
      notes: 'Please confirm before Friday.'
    },
    {
      id: 2,
      guest: 'Sara Samir',
      trip: 'Nile Cruise',
      status: 'Confirmed',
      email: 'sara@example.com',
      notes: ''
    }
  ]);

  const updateStatus = (id, newStatus) => {
    setReservations(prev =>
      prev.map(res => (res.id === id ? { ...res, status: newStatus } : res))
    );
  };

  return (
    <div className={styles.content}>
      <div className={styles.card}>
        <h2>My Reservations</h2>
        <ReservationTable reservations={reservations} onUpdateStatus={updateStatus} />
      </div>
    </div>
  );
}

export default MyReservations;
