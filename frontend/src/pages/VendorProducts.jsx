import React, { useState, useEffect } from 'react';
import { fetchProductsByVendor, addToCart, fetchCart } from '../services/api'; // API calls
import ProductCard from '../components/ProductCard'; // ProductCard component

const VendorProducts = ({ vendorId }) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]); // Store cart state locally (optional: can also be fetched from server)

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetchProductsByVendor(vendorId); // Fetch products by vendor
                console.log("Here res",response.data);
                setProducts(response.data);
            } catch (err) {
                console.error('Error fetching products:', err);
            }
        };
        getProducts();
    }, [vendorId]);

    // Fetch the cart data when the component mounts
    useEffect(() => {
        const loadCart = async () => {
            try {
                const { data } = await fetchCart(); // Fetch the current user's cart
                setCart(data.products); // Set the cart products
            } catch (err) {
                console.error('Error fetching cart:', err);
            }
        };
        loadCart();
    }, []);

    // Handle adding a product to the cart
    const handleAdd = async (productId) => {
        try {
            const response = await addToCart(productId); // API call to add product to the cart
            setCart(response.data.cart.products); // Update cart state
            console.log('Product added:', productId);
        } catch (err) {
            console.error('Error adding product to cart:', err);
        }
    };

    // Handle removing a product from the cart (optional: you can add a remove from cart feature)
    const handleRemove = async (productId) => {
        // This could be implemented based on your backend's remove functionality
        // For now, let's log the action
        console.log('Removing product with id:', productId);
    };

    return (
        <div>
            <h2>Products from Vendor {vendorId}</h2>
            <div className="product-list">
                {products.map((product) => (
                    <ProductCard 
                        key={product._id} 
                        product={product} 
                        onAdd={handleAdd} 
                        onRemove={handleRemove} 
                    />
                ))}
            </div>

            {/* Display Cart Information */}
            <div>
                <h3>Your Cart</h3>
                <ul>
                    {cart.map((item) => (
                        <li key={item.product && item.product._id}>
                            {item.product && item.product.name} - {item.quantity} x ${item.product && item.product.price}
                        </li>
                    ))}
                </ul>
                <p>Total Price: ${cart.reduce((total, item) => total + (item.product && item.product.price) * item.quantity, 0)}</p>
            </div>
        </div>
    );
};

export default VendorProducts;
    