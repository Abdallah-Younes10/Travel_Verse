import React from 'react';
import { ImageList, ImageListItem } from '@mui/material'; // تأكد من تثبيت @mui/material
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';

const BASE_URL = 'http://localhost:8000';
const ImageGallery = ({ images = [] }) => {
  if (images.length === 0) return null;
// console.log(images);

  return (
    <MDBCarousel showControls fade>
      {images.map((img, idx) => (
        <MDBCarouselItem itemId={idx + 1} key={idx}>
          <img
           src={img.startsWith('http') ? img : `${BASE_URL}${img}`}
 // لو الصور polymorphic فيها url
            className="d-block w-100"
            alt={`slide-${idx}`}
            style={{objectFit:'cover'}}
          />
        </MDBCarouselItem>
      ))}
    </MDBCarousel>
  );
};


export default ImageGallery;
