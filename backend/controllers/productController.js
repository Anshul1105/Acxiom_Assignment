const Product = require('../models/Product');

// Get products by vendor
exports.getProductsByVendor = async (req, res) => {
    try {
        const { vendorId } = req.params;
        const products = await Product.find({ vendor: vendorId });
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
