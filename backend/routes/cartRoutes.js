const express = require('express');
const { getCart, addToCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.get('/', authMiddleware, getCart);
router.post('/add', authMiddleware, addToCart);

module.exports = router;
