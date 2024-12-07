const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get Cart
exports.getCart = async (req, res) => {
    console.log("Cart req:", req.user);  // Log user data

    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('products.product');
        res.status(200).json(cart || { products: [] });
    } catch (err) {
        console.log("Hello error")
        res.status(500).json({ error: err.message });
    }
};

// Add to Cart
exports.addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        let cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            cart = new Cart({ user: req.user.id, products: [{ product: productId, quantity: 1 }] });
        } else {
            const existingProduct = cart.products.find(p => p.product.toString() === productId);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.products.push({ product: productId, quantity: 1 });
            }
        }
        await cart.save();
        res.status(200).json({ message: 'Product added to cart', cart });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
