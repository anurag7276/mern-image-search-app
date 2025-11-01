import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchComponent from '../components/SearchComponent';
import ImageGrid from '../components/ImageGrid';
import MultiSelectCounter from '../components/MultiSelectCounter';
import UserHistory from '../components/UserHistory';
import TopSearches from '../components/TopSearches'; 

const HomePage = ({ user }) => {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [lastSearchTerm, setLastSearchTerm] = useState('');
  const [history, setHistory] = useState([]); 
  const [topSearches, setTopSearches] = useState([]); 

  const serverURL = 'http://localhost:5001';

  // --- Function to fetch history ---
  // THIS IS THE CORRECTED LINE:
  const fetchHistory = async () => { 
    try {
      const res = await axios.get(`${serverURL}/api/history`, {
        withCredentials: true,
      });
      setHistory(res.data);
    } catch (err) {
      console.error('Failed to fetch history', err);
    }
  };

  // --- Function to fetch top searches ---
  const fetchTopSearches = async () => {
    try {
      const res = await axios.get(`${serverURL}/api/top-searches`, {
        withCredentials: true,
      });
      setTopSearches(res.data);
    } catch (err) {
      console.error('Failed to fetch top searches', err);
    }
  };

  // --- UseEffect to fetch data on page load ---
  useEffect(() => {
    fetchHistory();
    fetchTopSearches(); 
  }, []); 

  // This function is passed down to SearchComponent
  const handleSearch = (searchResults, term) => {
    setImages(searchResults);
    setLastSearchTerm(term);
    setSelectedImages([]); 
    
    fetchHistory();
    fetchTopSearches(); 
  };

  // This function is passed down to ImageGrid
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
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      
      {/* --- Main Content Area (Left Side) --- */}
      <div style={{ flex: 3 }}>
        
        {/* --- Top Searches Banner --- */}
        <TopSearches topSearches={topSearches} />

        <h1>Welcome, {user.displayName}!</h1>
        <p>Use the search bar below to find images from Unsplash.</p>
        <hr />

        {/* --- Search Bar --- */}
        <SearchComponent onSearch={handleSearch} />

        {/* --- Results & Counter --- */}
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

      {/* --- Sidebar Area (Right Side) --- */}
      <div style={{ flex: 1, paddingTop: '20px' }}>
        <h3>Search History</h3>
        <UserHistory history={history} />
      </div>

    </div>
  );
};

export default HomePage;