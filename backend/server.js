// backend/server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // REQUIRED to read the JWT cookie
const connectDB = require('./config/db'); 
const { notFound, errorHandler } = require('./middleware/errormiddleware'); 

// --- Configuration ---
dotenv.config();
connectDB(); 
const app = express();

// --- Middleware ---
app.use(cors()); 
app.use(express.json()); 
app.use(cookieParser()); // Initialize cookie-parser

// --- Routes ---
app.use('/api/auth', require('./routes/authroutes'));
app.use('/api/books', require('./routes/bookroutes')); // Ensure this file exports router
app.use('/api/reviews', require('./routes/reviewroutes')); // Ensure this file exports router

// --- Error Handling Middleware ---
app.use(notFound);
app.use(errorHandler);

// --- Server Startup ---
const PORT = process.env.PORT || 5000;
app.listen(
    PORT,
    console.log(`Server running on port ${PORT}`)
);