import React, { useState } from 'react';
import SearchComponent from '../components/SearchComponent';
import ImageGrid from '../components/ImageGrid';
import MultiSelectCounter from '../components/MultiSelectCounter';
// home page 
const HomePage = ({ user }) => {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [lastSearchTerm, setLastSearchTerm] = useState('');

 
  const handleSearch = (searchResults, term) => {
    setImages(searchResults);
    setLastSearchTerm(term);
    setSelectedImages([]); 
  };


  const handleImageSelect = (imageId) => {
    setSelectedImages((prevSelected) => {
      if (prevSelected.includes(imageId)) {
       
        return prevSelected.filter((id) => id !== imageId);
      } else {
        
        return [...prevSelected, imageId];
      }
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome, {user.displayName}!</h1>
      <p>Use the search bar below to find images from Unsplash.</p>

      <hr />

      
      <SearchComponent onSearch={handleSearch} />

      
      {images.length > 0 && (
        <>
          <MultiSelectCounter
            count={selectedImages.length}
            lastSearchTerm={lastSearchTerm}
            totalResults={images.length}
          />
          <ImageGrid
            images={images}
            selectedImages={selectedImages}
            onImageSelect={handleImageSelect}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;