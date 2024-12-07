import React, { useState, useEffect } from 'react';
import { fetchProductsByVendor, addToCart, fetchCart } from '../services/api';
import ProductCard from '../components/ProductCard';

const VendorProducts = ({ vendorId }) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetchProductsByVendor(vendorId);
                setProducts(response.data);
            } catch (err) {
                console.error('Error fetching products:', err);
            }
        };
        getProducts();
    }, [vendorId]);

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

    const handleAdd = async (productId) => {
        try {
            const response = await addToCart(productId);
            setCart(response.data.cart.products);
            console.log('Product added:', productId);
        } catch (err) {
            console.error('Error adding product to cart:', err);
        }
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
                    />
                ))}
            </div>

            <div>
                <h3>Your Cart</h3>
                <ul>
                    {cart.map((item) => (
                        <li key={item.product && item.product._id}>
                            {item.product && item.product.name} - {item.quantity} x $
                            {item.product && item.product.price}
                        </li>
                    ))}
                </ul>
                <p>
                    Total Price: $
                    {cart.reduce(
                        (total, item) =>
                            total +
                            (item.product && item.product.price) * item.quantity,
                        0
                    )}
                </p>
            </div>
        </div>
    );
};

export default VendorProducts;
