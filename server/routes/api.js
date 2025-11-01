const router = require('express').Router();
const axios = require('axios');
const Search = require('../models/Search'); // Import the Search model
const { isAuth } = require('../middleware/authMiddleware'); // Import our auth check

// This single route handles searching [cite: 19]
// We protect it using our isAuth middleware
router.post('/search', isAuth, async (req, res) => {
  const { term } = req.body;
  const userId = req.user.id; // req.user is available because of isAuth + Passport

  if (!term) {
    return res.status(400).json({ message: 'Search term is required' });
  }

  try {
    // 1. Save the search to our database 
    const newSearch = new Search({
      term: term,
      user: userId,
    });
    await newSearch.save();

    // 2. Call the Unsplash API [cite: 22]
    const unsplashUrl = `https://api.unsplash.com/search/photos?query=${term}&per_page=20`;
    const unsplashResponse = await axios.get(unsplashUrl, {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    });

    // 3. Send Unsplash results back to the client
    res.status(200).json({
      message: `Successfully found ${unsplashResponse.data.results.length} results.`,
      images: unsplashResponse.data.results,
    });

  } catch (err) {
    console.error('Search API error:', err.message);
    res.status(500).json({ message: 'Server error during search' });
  }
});




// GET /api/history - Fetches the user's personal search history
router.get('/history', isAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    // Find all searches for this user
    // Sort by timestamp in descending order (most recent first)
    // Populate 'user' to get user details (though we don't need it here, it's good practice)
    // Limit to the 20 most recent searches
    const history = await Search.find({ user: userId })
      .sort({ timestamp: -1 })
      .limit(20);

    // We only need to return the term and timestamp
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






// GET /api/top-searches - Fetches top 5 searches across all users
router.get('/top-searches', isAuth, async (req, res) => {
  try {
    // This is a MongoDB Aggregation Pipeline
    const topSearches = await Search.aggregate([
      {
        $group: {
          // Group documents by the 'term' field
          _id: '$term',
          // Count the number of occurrences for each term
          count: { $sum: 1 },
        },
      },
      {
        // Sort by the count in descending order (most frequent first)
        $sort: { count: -1 },
      },
      {
        // Limit the result to the top 5
        $limit: 5,
      },
      {
        // Format the output
        $project: {
          _id: 0, // Don't include the _id
          term: '$_id', // Rename _id to 'term'
          count: 1, // Include the count
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