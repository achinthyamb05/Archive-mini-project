// backend/middleware/auth.js

// WARNING: THIS FILE BYPASSES ALL AUTHENTICATION FOR ALL ROUTES THAT USE IT.

const protect = (req, res, next) => {
    // Using a valid 24-character hexadecimal string for Mongoose ObjectId compatibility
    req.user = {
        _id: '60c72b2f9f1b9f00159491a1', 
        username: 'BypassUser',
        email: 'bypass@example.com',
        isAdmin: false,
    };
    
    next(); 
};


module.exports = { protect };