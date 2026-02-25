import React from 'react';
import styles from '../UserMang/UserManagement.module.css';

function TripTable({ trips, onEdit, onDelete }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Location</th>
          <th>Price</th>
          <th>Start Times</th>
          <th>Images</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {trips.map(trip => (
          <tr key={trip.id}>
            <td>{trip.id}</td>
            <td>{trip.title}</td>
            <td>{trip.location}</td>
            <td>{parseFloat(trip.price).toLocaleString()} EGP</td>
            <td>{trip.startTimes.join(', ')}</td>
            <td>{trip.images?.length || 0}</td>
            <td>
              <button className={styles.actionButton} onClick={() => onEdit(trip)}>Update</button>
              <button className={styles.actionButton} onClick={() => onDelete(trip.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TripTable;
