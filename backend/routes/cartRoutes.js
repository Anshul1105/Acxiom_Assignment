const express = require('express');
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.get('/', authMiddleware, getCart); // Get the cart for the logged-in user
router.post('/add', authMiddleware, addToCart); // Add product to cart
router.post('/remove', authMiddleware, removeFromCart); // Remove product from cart

module.exports = router;
