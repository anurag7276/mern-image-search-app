
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); 
const passport = require('passport'); 
const session = require('express-session'); 
const cookieParser = require('cookie-parser'); 


require('./config/passport'); 

// Connect to database
connectDB(); 

// Initialize the Express app
const app = express();

// Middleware

app.use(
  cors({
    origin: process.env.CLIENT_URL, 
    credentials: true, 
  })
);
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 


app.use(
  session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: false,
    
  })
);

// --- PASSPORT MIDDLEWARE ---
app.use(passport.initialize()); 
app.use(passport.session()); 



app.get('/', (req, res) => {
  res.send('Server is running successfully!');
});


app.use('/auth', require('./routes/auth')); 

app.use('/api', require('./routes/api')); 



const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});