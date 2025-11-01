import React from 'react';

// This component receives the list of images and the selection handlers
const ImageGrid = ({ images, selectedImages, onImageSelect }) => {
  return (
    <div style={{
      display: 'grid',
      // This line below is the fix. The citation markers were removed.
      gridTemplateColumns: 'repeat(4, 1fr)', // 4-column grid
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