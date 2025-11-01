const router = require('express').Router();
const axios = require('axios');
const Search = require('../models/Search'); 
const { isAuth } = require('../middleware/authMiddleware'); 


router.post('/search', isAuth, async (req, res) => {
  const { term } = req.body;
  const userId = req.user.id; 

  if (!term) {
    return res.status(400).json({ message: 'Search term is required' });
  }

  try {
    
    const newSearch = new Search({
      term: term,
      user: userId,
    });
    await newSearch.save();

    
    const unsplashUrl = `https://api.unsplash.com/search/photos?query=${term}&per_page=20`;
    const unsplashResponse = await axios.get(unsplashUrl, {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    });

   
    res.status(200).json({
      message: `Successfully found ${unsplashResponse.data.results.length} results.`,
      images: unsplashResponse.data.results,
    });

  } catch (err) {
    console.error('Search API error:', err.message);
    res.status(500).json({ message: 'Server error during search' });
  }
});





router.get('/history', isAuth, async (req, res) => {
  try {
    const userId = req.user.id;

   
    const history = await Search.find({ user: userId })
      .sort({ timestamp: -1 })
      .limit(20);

    
    const formattedHistory = history.map(item => ({
        term: item.term,
        timestamp: item.timestamp
    }));

    res.status(200).json(formattedHistory);

  } catch (err) {
    console.error('Get History API error:', err.message);
    res.status(500).json({ message: 'Server error fetching history' });
  }
});







router.get('/top-searches', isAuth, async (req, res) => {
  try {
    
    const topSearches = await Search.aggregate([
      {
        $group: {
          
          _id: '$term',
         
          count: { $sum: 1 },
        },
      },
      {
        
        $sort: { count: -1 },
      },
      {
    
        $limit: 5,
      },
      {
       
        $project: {
          _id: 0, 
          term: '$_id', 
          count: 1, 
        },
      },
    ]);

    res.status(200).json(topSearches);
  } catch (err) {
    console.error('Top Searches API error:', err.message);
    res.status(500).json({ message: 'Server error fetching top searches' });
  }
});




module.exports = router;