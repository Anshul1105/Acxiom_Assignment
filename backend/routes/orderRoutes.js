const express = require('express');
const router = express.Router();
const { placeOrder, getUserOrders, updateOrderStatus } = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth'); // Assuming you have authentication middleware

// Route to place an order
router.post('/place', authMiddleware, placeOrder);  // User must be logged in to place an order

// Route to get all orders for the authenticated user
router.get('/user/orders', authMiddleware, getUserOrders);

// Route to update order status (typically for admin or order management)
router.post('/update-status', authMiddleware, updateOrderStatus);

module.exports = router;
