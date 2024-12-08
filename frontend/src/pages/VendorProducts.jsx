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
        <div className="max-w-6xl mx-auto p-6">
    <h2 className="text-2xl font-bold mb-4">Products from Vendor: {vendor.name}</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.length > 0 ? (
            products.map((product) => (
                <ProductCard 
                    key={product._id} 
                    product={product} 
                    onAdd={handleAdd} 
                    onRemove={handleRemove} 
                />
            ))
        ) : (
            <p className="text-gray-500 col-span-full">No products available for this vendor.</p>
        )}
    </div>
    <h3 className="text-xl font-semibold mt-6">Your Cart</h3>
    <ul className="space-y-2">
        {cart.length > 0 ? (
            cart.map((item) => (
                <li key={item.product && item.product._id} className="border p-2 rounded-md">
                    {item.product && item.product.name} - {item.quantity} x $
                    {item.product && item.product.price}
                </li>
            ))
        ) : (
            <p className="text-gray-500">Your cart is empty.</p>
        )}
    </ul>
    {cart.length > 0 && (
        <p className="font-bold mt-4">
            Total Price: $
            {cart.reduce(
                (total, item) =>
                    total + (item.product && item.product.price) * item.quantity,
                0
            )}
        </p>
    )}
</div>

    );
};

export default VendorProducts;
