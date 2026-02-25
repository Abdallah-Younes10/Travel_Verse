// src/Pages/TourGuide/GalleryItem.jsx
import React from 'react';
import styles from '../UserMang/UserManagement.module.css';

function GalleryItem({ image, onDelete }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '10px',
      width: '160px',
      textAlign: 'center',
      background: '#f9f9f9'
    }}>
      <img
        src={image.src}
        alt="gallery"
        style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '6px' }}
      />
      <p style={{ fontSize: '12px', marginTop: '8px' }}><strong>Trip:</strong> {image.trip}</p>
      <button className={styles.actionButton} onClick={onDelete}>Delete</button>
    </div>
  );
}

export default GalleryItem;
