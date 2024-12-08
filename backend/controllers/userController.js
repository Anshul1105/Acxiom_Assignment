const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register User
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save user to the database
        const savedUser = await newUser.save();

        // Serialize user into session
        req.session.user = { id: savedUser._id, username: savedUser.username };

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Login User
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        req.session.user = { id: user._id, username: user.username }; // Save user session
        res.status(200).json({ message: 'Logged in successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Logout User
exports.logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ message: 'Error logging out' });
        res.clearCookie('connect.sid'); // Clear session cookie
        res.status(200).json({ message: 'Logged out successfully' });
    });
};


exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.session.user.id;  // Getting the user ID from the session

        // Find user by ID and populate the orders field (if orders are referenced as another collection)
        const user = await User.findById(userId).populate('orders'); // Assuming the `orders` field is populated from the Order model

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If orders are stored within the user document directly
        res.status(200).json({ orders: user.orders });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};