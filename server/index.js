// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); 
const passport = require('passport'); // <-- ADD THIS
const session = require('express-session'); // <-- ADD THIS
const cookieParser = require('cookie-parser'); // <-- ADD THIS

// --- IMPORT PASSPORT CONFIG ---
require('./config/passport'); // <-- ADD THIS

// Connect to database
connectDB(); 

// Initialize the Express app
const app = express();

// Middleware
// --- CONFIGURE CORS ---
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Allow the React app to make requests
    credentials: true, // Allow cookies to be sent
  })
);
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // <-- ADD THIS

// --- EXPRESS SESSION MIDDLEWARE ---
app.use(
  session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: false,
    // You might want to configure cookie: { secure: true } for production
  })
);

// --- PASSPORT MIDDLEWARE ---
app.use(passport.initialize()); // Initialize Passport
app.use(passport.session()); // Enable persistent login sessions


// A simple test route
app.get('/', (req, res) => {
  res.send('Server is running successfully!');
});

// --- DEFINE AUTH ROUTES ---
// We will create this file next
app.use('/auth', require('./routes/auth')); 
// --- DEFINE API ROUTES ---
app.use('/api', require('./routes/api')); // <-- ADD THIS LINE


// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});