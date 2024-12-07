const Product = require('../models/Product');
const Vendor = require('../models/Vendor');

exports.getAllVendors = async (req, res) => {
    try {
        // Fetch all products and populate the vendor field to get detailed information
        const products = await Product.find().populate('vendor', 'name'); // Populates vendor name

        // Extract unique vendors
        const vendors = [...new Set(products.map((product) => product.vendor))]; // Get unique vendor names
        // console.log(products);

        res.status(200).json(vendors); // Return unique vendor names
    } catch (err) {
        console.error("Error fetching vendors:", err); // Log the error
        res.status(500).json({ message: 'Error fetching vendors', error: err.message });
    }
};
