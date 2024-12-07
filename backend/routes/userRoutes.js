const express = require('express');
const { registerUser, loginUser, logoutUser, getUserOrders } = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/register', registerUser);  // Now, this should work
router.post('/login', loginUser);
router.post('/logout', auth, logoutUser);
router.get('/orders', auth, getUserOrders);

module.exports = router;
