// src/Pages/TourGuide/MyTrips.jsx
import React, { useState } from 'react';
import TripTable from './TripTable';
import TripModal from './TripModal ';
import styles from '../UserMang/UserManagement.module.css';

function MyTrips() {
  const [trips, setTrips] = useState([
    {
      id: 1,
      title: 'Luxor Tour',
      description: 'A full day tour in Luxor',
      location: 'Luxor',
      price: 1500,
      duration: '8 hours',
      startTimes: ['09:00 AM', '02:00 PM'],
      images: ['https://via.placeholder.com/150']
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTrip, setCurrentTrip] = useState(null);

  const handleAddTrip = (data) => {
    const newId = trips.length > 0 ? Math.max(...trips.map(t => t.id)) + 1 : 1;
    setTrips([...trips, { id: newId, ...data }]);
    setIsModalOpen(false);
  };

  const handleEditTrip = (data) => {
    setTrips(trips.map(t => (t.id === data.id ? data : t)));
    setIsModalOpen(false);
    setCurrentTrip(null);
  };

  const handleDeleteTrip = (id) => {
    if (window.confirm("Are you sure to delete this trip?")) {
      setTrips(trips.filter(t => t.id !== id));
    }
  };

  const openAddModal = () => {
    setCurrentTrip(null);
    setIsModalOpen(true);
  };

  const openEditModal = (trip) => {
    setCurrentTrip(trip);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTrip(null);
  };

  return (
    <div className={styles.content}>
      <div className={styles.card}>
        <h2>My Trips</h2>
        <button className={styles.btn} onClick={openAddModal}>Add Trip</button>
        <TripTable trips={trips} onEdit={openEditModal} onDelete={handleDeleteTrip} />
      </div>

      <TripModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={currentTrip ? handleEditTrip : handleAddTrip}
        initialData={currentTrip}
      />
    </div>
  );
}

export default MyTrips;
