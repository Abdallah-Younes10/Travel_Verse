// src/Pages/TourGuide/ReplyModal.jsx
import React, { useState } from 'react';
import styles from '../UserMang/UserManagement.module.css';

function ReplyModal({ message, onClose, onSend }) {
  const [replyText, setReplyText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (replyText.trim()) {
      onSend(replyText);
      setReplyText('');
    } else {
      alert('يرجى كتابة الرد قبل الإرسال');
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>×</span>
        <h3>الرد على: {message.name}</h3>
        <p><strong>الرسالة الأصلية:</strong></p>
        <p style={{ background: '#f1f1f1', padding: '8px', borderRadius: '5px' }}>{message.message}</p>

        <form onSubmit={handleSubmit}>
          <label>ردك</label>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            rows="4"
            required
          />
          <button type="submit" className={styles.modalButton}>إرسال</button>
        </form>
      </div>
    </div>
  );
}

export default ReplyModal;
