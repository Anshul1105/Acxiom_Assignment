const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Place Order
exports.placeOrder = async (req, res) => {
    try {
        // Fetch the cart for the user
        console.log(req.user, req.body);
        const cart = await Cart.findOne({ user: req.user.id }).populate('products.product');
        
        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: 'Your cart is empty' });
        }

        // Calculate the total amount, discount (if any), and net payable
        let totalAmount = 0;
        const orderItems = [];

        cart.products.forEach(item => {
            const product = item && item.product;
            const quantity = item && item.quantity;
            const price = product && product.price;

            totalAmount += price * quantity;

            orderItems.push({
                product: product._id,
                quantity: quantity,
                price: price,
            });
        });

        // Calculate discount if needed (this is a placeholder, you can adjust based on your business logic)
        const discount = 0; // You can implement logic for discounts here (e.g., promo codes)
        const netPayable = totalAmount - discount;

        // Create the new order
        const newOrder = new Order({
            user: req.user.id,
            orderItems: orderItems,
            totalAmount: totalAmount,
            discount: discount,
            netPayable: netPayable,
            status: 'Placed',  // Order status is initially set to 'Placed'
        });

        // Save the new order to the database
        await newOrder.save();

        // Clear the user's cart after placing the order
        await Cart.updateOne({ user: req.user.id }, { $set: { products: [] } });

        res.status(200).json({ message: 'Order placed successfully', order: newOrder });
    } catch (err) {
        console.error('Error placing order:', err);
        res.status(500).json({ error: err.message });
    }
};

// Get User's Orders
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('orderItems.product');
        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }
        res.status(200).json(orders);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ error: err.message });
    }
};

// Update Order Status (Admin only or user management)
exports.updateOrderStatus = async (req, res) => {
    const { orderId, status } = req.body;

    if (!status || !['Placed', 'Dispatched', 'Out for Delivery', 'Delivered'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Update order status
        order.status = status;
        await order.save();

        res.status(200).json({ message: 'Order status updated', order });
    } catch (err) {
        console.error('Error updating order status:', err);
        res.status(500).json({ error: err.message });
    }
};
