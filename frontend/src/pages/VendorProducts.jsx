import React, { useState, useEffect } from 'react';
import { fetchProductsByVendor, addToCart, fetchCart, removeFromCart } from '../services/api';
import ProductCard from '../components/ProductCard';

const VendorProducts = ({ vendor }) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    // Fetch products based on vendor._id
    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetchProductsByVendor(vendor._id); // Use vendor._id
                setProducts(response.data);
            } catch (err) {
                console.error('Error fetching products:', err);
            }
        };

        if (vendor) getProducts();
    }, [vendor]);

    // Fetch cart items
    useEffect(() => {
        const loadCart = async () => {
            try {
                const { data } = await fetchCart();
                setCart(data.products);
            } catch (err) {
                console.error('Error fetching cart:', err);
            }
        };

        loadCart();
    }, []);

    // Handle adding a product to the cart
    const handleAdd = async (productId) => {
        try {
            const response = await addToCart(productId);
            setCart(response.data.cart.products);
            console.log('Product added:', productId);
        } catch (err) {
            console.error('Error adding product to cart:', err);
        }
    };

    // Handle removing a product from the cart
    const handleRemove = async (productId) => {
        try {
            const response = await removeFromCart(productId);
            setCart(response.data.cart.products);
            console.log('Product removed:', productId);
        } catch (err) {
            console.error('Error removing product from cart:', err);
        }
    };

    return (
        <div>
            <h2>Products from Vendor: {vendor.name}</h2>
            <div className="product-list">
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            onAdd={handleAdd}
                            onRemove={handleRemove} // Pass handleRemove to ProductCard
                        />
                    ))
                ) : (
                    <p>No products available for this vendor.</p>
                )}
            </div>

            <div>
                <h3>Your Cart</h3>
                <ul>
                    {cart.length > 0 ? (
                        cart.map((item) => (
                            <li key={item.product && item.product._id}>
                                {item.product && item.product.name} - {item.quantity} x $
                                {item.product && item.product.price}
                            </li>
                        ))
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </ul>
                {cart.length > 0 && (
                    <p>
                        Total Price: $
                        {cart.reduce(
                            (total, item) =>
                                total +
                                (item.product && item.product.price) * item.quantity,
                            0
                        )}
                    </p>
                )}
            </div>
        </div>
    );
};

export default VendorProducts;
