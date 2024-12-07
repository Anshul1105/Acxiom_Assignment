const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
    description: String,
    stock: { type: Number, default: 0 },
});

module.exports = mongoose.model('Product', productSchema);
