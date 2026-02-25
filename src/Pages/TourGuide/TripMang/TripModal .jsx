import React, { useState, useEffect } from 'react';
import styles from '../UserMang/UserManagement.module.css';

function TripModal({ isOpen, onClose, onSubmit, initialData }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [startTimes, setStartTimes] = useState(['']);

  // لتخزين ملفات الصور وعرضها
  const [imageFiles, setImageFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setLocation(initialData.location);
      setPrice(initialData.price);
      setDuration(initialData.duration);
      setStartTimes(initialData.startTimes || []);

      // عند التعديل، لو فيه روابط صور فقط (من الـ backend مثلاً)
      if (initialData.images && Array.isArray(initialData.images)) {
        setPreviewImages(initialData.images);
        setImageFiles([]); // مفيش ملفات فعلية طالما هي روابط
      }
    } else {
      setTitle('');
      setDescription('');
      setLocation('');
      setPrice('');
      setDuration('');
      setStartTimes(['']);
      setImageFiles([]);
      setPreviewImages([]);
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // ممكن هنا ترفع الصور فعليًا لـ backend في المستقبل
    const imageURLs = previewImages;

    onSubmit({
      id: initialData ? initialData.id : null,
      title,
      description,
      location,
      price,
      duration,
      startTimes: startTimes.filter(time => time),
      images: imageURLs
    });
  };

  const handleChangeArray = (setter, index, value, arr) => {
    const updated = [...arr];
    updated[index] = value;
    setter(updated);
  };

  const addField = (setter, arr) => {
    setter([...arr, '']);
  };

  const removeField = (setter, index, arr) => {
    const updated = arr.filter((_, i) => i !== index);
    setter(updated.length ? updated : ['']);
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    const previews = [];

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });

    // Reset input if re-selecting same file
    e.target.value = null;
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>×</span>
        <h2>{initialData ? 'Update Trip' : 'Add Trip'}</h2>
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

          <label>Location</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />

          <label>Price (EGP)</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />

          <label>Duration</label>
          <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} required />

          <label>Start Times</label>
          {startTimes.map((time, index) => (
            <div key={index}>
              <input
                type="text"
                value={time}
                onChange={(e) => handleChangeArray(setStartTimes, index, e.target.value, startTimes)}
              />
              <button type="button" onClick={() => removeField(setStartTimes, index, startTimes)}>-</button>
            </div>
          ))}
          <button type="button" onClick={() => addField(setStartTimes, startTimes)}>+ Add Time</button>

          <label>Images</label>
          <input type="file" accept="image/*" multiple onChange={handleImagesChange} />
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
            {previewImages.map((src, i) => (
              <img key={i} src={src} alt={`preview-${i}`} style={{ width: '100px', height: '80px', objectFit: 'cover', borderRadius: '6px' }} />
            ))}
          </div>

          <button type="submit" className={styles.modalButton}>Save</button>
        </form>
      </div>
    </div>
  );
}

export default TripModal;
