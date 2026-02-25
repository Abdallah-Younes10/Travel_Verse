// src/Pages/TourGuide/ReplyModal.jsx
import React, { useState, useEffect } from 'react';
import styles from '../UserMang/UserManagement.module.css';

function ReplyModal({ isOpen, onClose, onSubmit, review }) {
  const [reply, setReply] = useState('');

  useEffect(() => {
    if (review) {
      setReply(review.reply || '');
    } else {
      setReply('');
    }
  }, [review]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (review) {
      onSubmit(review.id, reply);
    }
  };

  if (!isOpen || !review) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>×</span>
        <h2>Reply to {review.guest}</h2>
        <p><strong>Comment:</strong> {review.comment}</p>
        <form onSubmit={handleSubmit}>
          <label>Reply</label>
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            required
          />
          <button type="submit" className={styles.modalButton}>Send Reply</button>
        </form>
      </div>
    </div>
  );
}

export default ReplyModal;
