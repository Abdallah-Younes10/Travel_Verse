import React, { useState } from 'react';
import styles from '../UserMang/UserManagement.module.css';
import GalleryItem from './GalleryItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import GalleryDroppable from './GalleryDroppable';

const trips = ['Luxor Tour', 'Nile Cruise', 'Cairo Adventure'];

const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

function GalleryManager() {
  const [images, setImages] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(trips[0]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [
          ...prev,
          {
            id: generateId(),
            src: reader.result,
            trip: selectedTrip
          }
        ]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const handleDeleteImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(images);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setImages(reordered);
  };
console.log(images);

  return (
    <div className={styles.content}>
      <div className={styles.card}>
        <h2>Manage Trip Gallery</h2>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <select value={selectedTrip} onChange={(e) => setSelectedTrip(e.target.value)}>
            {trips.map((trip, i) => (
              <option key={i} value={trip}>{trip}</option>
            ))}
          </select>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className={styles.btn}
          />
        </div>

        {/* ✅ لا تحيط DragDropContext بأي شرط */}
        <DragDropContext onDragEnd={onDragEnd}>
  <GalleryDroppable images={images} onDelete={handleDeleteImage} />
</DragDropContext>

      </div>
    </div>
  );
}

export default GalleryManager;
