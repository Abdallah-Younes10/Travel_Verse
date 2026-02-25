import React, { useState } from 'react';
import styles from '../TourGuide/UserManagement.module.css';

const UserReviews = () => {
  const [reviews, setReviews] = useState([
    { id: 1, content: 'Great trip!', date: '2025-06-01' },
    { id: 2, content: 'Nice hotel.', date: '2025-06-10' },
  ]);

  const deleteReview = (id) => {
    setReviews(reviews.filter(r => r.id !== id));
  };

  return (
    <div className={styles.card}>
      <h2>My Reviews</h2>
      {reviews.map(r => (
        <div key={r.id} className={styles.cardBox}>
          <p>{r.content}</p>
          <small>{r.date}</small>
          <div>
            <button className={styles.actionButton}>Edit</button>
            <button className={styles.dangerButton} onClick={() => deleteReview(r.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserReviews;