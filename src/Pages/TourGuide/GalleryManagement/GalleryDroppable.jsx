// src/Pages/TourGuide/GalleryDroppable.jsx
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import GalleryItem from './GalleryItem';
import styles from '../UserMang/UserManagement.module.css';

function GalleryDroppable({ images, onDelete }) {
  return (
    <Droppable droppableId="gallery" direction="horizontal">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            minHeight: '120px',
            padding: '10px',
            border: '2px dashed #ccc',
            borderRadius: '10px',
          }}
        >
          {images.map((img, index) => (
            <Draggable key={img.id} draggableId={String(img.id)} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <GalleryItem image={img} onDelete={() => onDelete(img.id)} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default GalleryDroppable;
