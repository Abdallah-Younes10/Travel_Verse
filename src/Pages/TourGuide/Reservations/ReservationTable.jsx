// src/Pages/TourGuide/ReservationTable.jsx
import React from 'react';
import styles from '../UserMang/UserManagement.module.css';

function ReservationTable({ reservations, onUpdateStatus }) {
  const renderActions = (res) => {
    switch (res.status) {
      case 'Pending':
        return (
          <>
            <button className={styles.actionButton} onClick={() => onUpdateStatus(res.id, 'Confirmed')}>Confirm</button>
            <button className={styles.actionButton} onClick={() => onUpdateStatus(res.id, 'Cancelled')}>Reject</button>
          </>
        );
      case 'Confirmed':
        return (
          <button className={styles.actionButton} onClick={() => onUpdateStatus(res.id, 'Completed')}>Mark Completed</button>
        );
      default:
        return <span style={{ color: 'gray' }}>No Actions</span>;
    }
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Guest</th>
          <th>Trip</th>
          <th>Email</th>
          <th>Notes</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map(res => (
          <tr key={res.id}>
            <td>{res.id}</td>
            <td>{res.guest}</td>
            <td>{res.trip}</td>
            <td>{res.email}</td>
            <td>{res.notes || '-'}</td>
            <td>{res.status}</td>
            <td>{renderActions(res)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ReservationTable;
