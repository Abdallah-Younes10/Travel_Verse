// src/Pages/TourGuide/MyReviews.jsx
import React, { useState } from 'react';
import ReviewTable from './ReviewTable';
import ReplyModal from './ReplyModal';
import styles from '../UserMang/UserManagement.module.css';

function MyReviews() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      guest: 'Mohamed Youssef',
      trip: 'Cairo City Tour',
      rating: 5,
      comment: 'Amazing trip! Highly recommended!',
      reply: ''
    },
    {
      id: 2,
      guest: 'Laila Hassan',
      trip: 'Pyramids Adventure',
      rating: 3,
      comment: 'Good but the timing was off.',
      reply: 'Thank you for your feedback. We’ll improve the timing.'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const handleOpenModal = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedReview(null);
    setIsModalOpen(false);
  };

  const handleReply = (id, reply) => {
    setReviews(reviews.map(r => (r.id === id ? { ...r, reply } : r)));
    handleCloseModal();
  };

  return (
    <div className={styles.content}>
      <div className={styles.card}>
        <h2>Customer Reviews</h2>
        <ReviewTable reviews={reviews} onReply={handleOpenModal} />
      </div>

      <ReplyModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleReply}
        review={selectedReview}
      />
    </div>
  );
}

export default MyReviews;
