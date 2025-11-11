// backend/controllers/bookcontroller.js

const asyncHandler = require('express-async-handler');
const Book = require('../models/book'); 

// @desc    Get all books
// @route   GET /api/books
// @access  Public
const getBooks = asyncHandler(async (req, res) => {
    // Finds and returns all documents. If the database is empty, it returns [].
    const books = await Book.find({}); 
    res.json(books); 
});

// @desc    Fetch single book details
// @route   GET /api/books/:id
// @access  Public
const getBookById = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id)
        .populate('submittedBy', 'username') 
        .populate('reviews'); 

    if (book) {
        res.json(book);
    } else {
        res.status(404);
        throw new Error('Book not found');
    }
});

// @desc    Create a book
// @route   POST /api/books
// @access  Private (Admin/User)
const createBook = asyncHandler(async (req, res) => {
    const { 
        title, 
        author, 
        description, 
        genre,
        publicationYear
    } = req.body;
    
    // Check for required fields based on your schema
    if (!title || !author || !description || !genre || !publicationYear) {
        res.status(400);
        throw new Error('Please fill all required fields.');
    }

    const book = new Book({
        title,
        author,
        description,
        genre,
        publicationYear,
        submittedBy: req.user._id, // Uses the mock ID from auth.js
    });

    const createdBook = await book.save();
    res.status(201).json(createdBook);
});

module.exports = { 
    getBooks, 
    getBookById, 
    createBook 
};