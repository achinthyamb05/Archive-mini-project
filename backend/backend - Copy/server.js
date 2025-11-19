// backend/server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db'); 
const { notFound, errorHandler } = require('./middleware/errormiddleware'); 


dotenv.config();
connectDB(); 
const app = express();


app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true, 
}));

app.use(express.json()); 
app.use(cookieParser());

// --- Routes ---
app.use('/api/auth', require('./routes/authroutes'));
app.use('/api/books', require('./routes/bookroutes')); 
app.use('/api/reviews', require('./routes/reviewroutes')); 

// --- Error Handling Middleware ---
app.use(notFound);
app.use(errorHandler);

// --- Server Startup ---
const PORT = process.env.PORT || 5000;
app.listen(
    PORT,
    console.log(`Server running on port ${PORT}`)
);