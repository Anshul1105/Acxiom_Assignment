const express = require('express');
const {getAllVendors} = require('../controllers/vendorController')
const router = express.Router();

router.get('/', getAllVendors);

module.exports = router;
