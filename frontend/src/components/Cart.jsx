import React, { useEffect, useState } from 'react';
import { fetchCart ,placeOrder} from '../services/api';

const Cart = () => {
    const [cart, setCart] = useState(null);

    useEffect(() => {
        const loadCart = async () => {
            if (cart !== null) return;
            try {
                const { data } = await fetchCart();
                setCart(data);
                console.log("Fetched cart : ", data,cart)
            } catch (err) {
                console.error('Error fetching cart:', err);
            }
        };

        loadCart();
    }, []);
    console.log("Cart is",cart);
    if (!cart) {
        return <p>Loading cart...</p>;
    }


    const handlePlaceOrder = async () => {
        try {
            const response = await placeOrder(); // Calls the API to place the order
            alert(response && response.message); // Notify the user
            setCart(null); // Reset cart after successful order
        } catch (err) {
            console.error('Error placing order:', err);
            alert('Failed to place order. Please try again.');
        }
    };

    const totalPrice = cart.products.reduce((total, item) => total + (item.product && item.product.price) * item.quantity, 0);

    return (
        <div>
            <h2>Your Cart</h2>
            <ul>
                {cart.products.map((item) => (
                    <li key={item.prouct && item.product._id}>
                        {item.product && item.product.name} - {item.quantity} x ${item.product && item.product.price}
                    </li>
                ))}
            </ul>
            <p>Total: ${totalPrice}</p>
            <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
    );
};

export default Cart;
