// src/Pages/TourGuide/ReviewTable.jsx
import React from 'react';
import styles from '../UserMang/UserManagement.module.css';

function ReviewTable({ reviews, onReply }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Guest</th>
          <th>Trip</th>
          <th>Rating</th>
          <th>Comment</th>
          <th>Reply</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {reviews.map((review) => (
          <tr key={review.id}>
            <td>{review.id}</td>
            <td>{review.guest}</td>
            <td>{review.trip}</td>
            <td>{'⭐'.repeat(review.rating)}</td>
            <td>{review.comment}</td>
            <td>{review.reply || '-'}</td>
            <td>
              <button
                className={styles.actionButton}
                onClick={() => onReply(review)}
              >
                {review.reply ? 'Edit Reply' : 'Reply'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ReviewTable;
