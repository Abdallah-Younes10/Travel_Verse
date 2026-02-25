// src/Pages/TourGuide/Notifications.jsx
import React, { useState } from 'react';
import styles from '../UserMang/UserManagement.module.css';

function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'booking',
      content: 'تم استلام حجز جديد لرحلة "Luxor Tour"',
      date: '2025-06-21',
    },
    {
      id: 2,
      type: 'review',
      content: 'تم إضافة تقييم جديد على رحلة "Nile Cruise"',
      date: '2025-06-20',
    },
  ]);

  const handleClear = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  return (
    <div className={styles.content}>
      <div className={styles.card}>
        <h2>الإشعارات</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {notifications.map((notif) => (
            <li key={notif.id} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '8px' }}>
              <p><strong>{notif.type === 'booking' ? '🛎️ حجز جديد' : '⭐ تقييم جديد'}:</strong> {notif.content}</p>
              <p style={{ fontSize: '12px', color: '#666' }}>{notif.date}</p>
              <button className={styles.actionButton} onClick={() => handleClear(notif.id)}>مسح</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Notifications;
