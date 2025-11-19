    // backend/controllers/usercontroller.js

    const asyncHandler = require('express-async-handler');
    const User = require('../models/user'); 
    const Review = require('../models/review'); // ⬅️ CRITICAL: Imported for data cleanup
    const generateToken = require('../utils/generatetokens'); 

    
    const registerUser = asyncHandler(async (req, res) => {
                        const { username, email, password } = req.body;
                        const userExists = await User.findOne({ email });

                        if (userExists) {
                                        res.status(400);
                                        throw new Error('User already exists');
                        }

                        const user = await User.create({ username, email, password });

                        if (user) {
                                        generateToken(res, user._id); 
                                        res.status(201).json({
                                                        _id: user._id,
                                                        username: user.username,
                                                        email: user.email,
                                                        isAdmin: user.isAdmin,
                                        });
                        } else {
                                        res.status(400);
                                        throw new Error('Invalid user data');
                        }
    });

    
    const loginUser = asyncHandler(async (req, res) => {
                        const { email, password } = req.body;
                        const user = await User.findOne({ email });

                        if (user && (await user.matchPassword(password))) {
                                        generateToken(res, user._id); 
                                        res.json({
                                                        _id: user._id,
                                                        username: user.username,
                                                        email: user.email,
                                                        isAdmin: user.isAdmin,
                                        });
                        } else {
                                        res.status(401);
                                        throw new Error('Invalid email or password');
                        }
    });

    
    const logoutUser = asyncHandler(async (req, res) => {
                        res.cookie('jwt', '', {
                                        httpOnly: true,
                                        expires: new Date(0), // Clears the cookie
                        });
                        res.status(200).json({ message: 'User logged out successfully' });
    });

    
    const getUserProfile = asyncHandler(async (req, res) => {
                        const user = {
                                        _id: req.user._id,
                                        username: req.user.username,
                                        email: req.user.email,
                                        isAdmin: req.user.isAdmin,
                        };
                        res.status(200).json(user);
    });

    
    const updateUserProfile = asyncHandler(async (req, res) => {
                        const user = await User.findById(req.user._id);

                        if (user) {
                                        user.username = req.body.username || user.username;
                                        user.email = req.body.email || user.email;

                                        if (req.body.password) {
                                                        user.password = req.body.password;
                                        }

                                        const updatedUser = await user.save();

                                        res.status(200).json({
                                                        _id: updatedUser._id,
                                                        username: updatedUser.username,
                                                        email: updatedUser.email,
                                                        isAdmin: updatedUser.isAdmin,
                                        });
                        } else {
                                        res.status(404);
                                        throw new Error('User not found');
                        }
    });

    
    const deleteUser = asyncHandler(async (req, res) => {
        const userIdToDelete = req.params.id; 
        const requestingUser = req.user._id;

        if (userIdToDelete.toString() !== requestingUser.toString()) {
            res.status(403);
            throw new Error('Not authorized to delete this specific account.');
        }

        const user = await User.findById(userIdToDelete);

        if (!user) {
            res.status(404);
            throw new Error('User not found.');
        }

        await Review.deleteMany({ user: userIdToDelete });

        await User.deleteOne({ _id: userIdToDelete });

        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0), 
        });

        res.status(200).json({ message: 'User account and associated data successfully removed.' });
    });


    module.exports = {
                        registerUser,
                        loginUser,
                        logoutUser,
                        getUserProfile,
                        updateUserProfile,
            deleteUser, // ⬅️ Must be included in exports
    };