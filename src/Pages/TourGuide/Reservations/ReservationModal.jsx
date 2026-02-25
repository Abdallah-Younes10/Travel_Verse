import React, { useState, useEffect } from 'react';
import styles from '../UserMang/UserManagement.module.css';

function RestaurantModal({ isOpen, onClose, onSubmit, initialData }) {
  const [previewImages, setPreviewImages] = useState([]);

  const [form, setForm] = useState({
    name_ar: '',
    name_en: '',
    description_ar: '',
    description_en: '',
    rate: '',
    location: '',
    booking_link: '',
    price: '',
    images: []
  });

  useEffect(() => {
    if (initialData) {
      setForm({ ...initialData });
      if (initialData.images) {
        setPreviewImages(
          initialData.images.map(img =>
            typeof img === 'string' ? img : URL.createObjectURL(img)
          )
        );
      }
    } else {
      setForm({
        name_ar: '',
        name_en: '',
        description_ar: '',
        description_en: '',
        rate: '',
        location: '',
        booking_link: '',
        price: '',
        images: []
      });
      setPreviewImages([]);
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setForm(prev => ({ ...prev, images: files }));
    setPreviewImages(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: initialData?.id || null, ...form });
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>×</span>
        <h2>{initialData ? 'Edit Restaurant' : 'Add Restaurant'}</h2>
        <form onSubmit={handleSubmit}>
          <label>Arabic Name</label>
          <input name="name_ar" value={form.name_ar} onChange={handleChange} required />

          <label>English Name</label>
          <input name="name_en" value={form.name_en} onChange={handleChange} required />

          <label>Arabic Description</label>
          <textarea name="description_ar" value={form.description_ar} onChange={handleChange} required />

          <label>English Description</label>
          <textarea name="description_en" value={form.description_en} onChange={handleChange} required />

          <label>Rate</label>
          <input type="number" step="0.1" name="rate" value={form.rate} onChange={handleChange} required />

          <label>Location</label>
          <input name="location" value={form.location} onChange={handleChange} required />

          <label>Booking Link</label>
          <input name="booking_link" value={form.booking_link} onChange={handleChange} required />

          <label>Price</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} required />

          <label>Images</label>
          <input type="file" accept="image/*" multiple onChange={handleImagesChange} />
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
            {previewImages.map((src, i) => (
              <img key={i} src={src} alt={`preview-${i}`} style={{ width: '100px', height: '80px', objectFit: 'cover' }} />
            ))}
          </div>

          <button type="submit" className={styles.modalButton}>Save</button>
        </form>
      </div>
    </div>
  );
}

export default RestaurantModal;