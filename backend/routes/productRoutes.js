const express = require('express');
const { getProductsByVendor } = require('../controllers/productController');
const router = express.Router();

router.get('/vendor/:vendorId', getProductsByVendor);

module.exports = router;
