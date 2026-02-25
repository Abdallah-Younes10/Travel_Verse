import React, { useState, useEffect } from 'react';
import styles from './UserManagement.module.css'; // استخدام CSS Module

function UserModal({ isOpen, onClose, onSubmit, initialData }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  // useEffect لتحديث حالة النموذج عند تغيير initialData (للتعديل)
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setRole(initialData.role);
    } else {
      // مسح النموذج إذا كان في وضع الإضافة
      setName('');
      setEmail('');
      setRole('');
    }
  }, [initialData, isOpen]); // إضافة isOpen كاعتماد لضمان التحديث عند فتح المودال

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: initialData ? initialData.id : null, name, email, role });
    // يتم مسح البيانات بواسطة useEffect بعد الإغلاق
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>×</span>
        <h2>{initialData ? 'User Update ' : ' Add User'}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label htmlFor="role">Rule</label>
          <input type="text" id="role" value={role} onChange={(e) => setRole(e.target.value)} required />

          <button type="submit" className={styles.modalButton}>Save</button>
        </form>
      </div>
    </div>
  );
}

export default UserModal;