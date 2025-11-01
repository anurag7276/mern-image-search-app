import React from 'react';


const ImageGrid = ({ images, selectedImages, onImageSelect }) => {
  return (
    <div style={{
      display: 'grid',
      
      gridTemplateColumns: 'repeat(4, 1fr)', 
      gap: '10px',
      padding: '0 20px',
    }}>
      {images.map((image) => {
        const isSelected = selectedImages.includes(image.id);
        return (
          <div key={image.id} style={{ position: 'relative', cursor: 'pointer' }} onClick={() => onImageSelect(image.id)}>
            <img
              src={image.urls.small}
              alt={image.alt_description}
              style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
            />
            <input
              type="checkbox"
              checked={isSelected}
              readOnly
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                width: '20px',
                height: '20px',
                cursor: 'pointer',
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ImageGrid;