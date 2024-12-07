import React, { useState, useEffect } from 'react';
import { fetchUserOrders } from '../services/api';

const Profile = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const { data } = await fetchUserOrders();
                setOrders(data);
            } catch (err) {
                console.error('Error fetching orders:', err);
            }
        };

        loadOrders();
    }, []);

    return (
        <div>
            <h2>Order History</h2>
            {orders.length === 0 ? (
                <p>No orders yet</p>
            ) : (
                <ul>
                    {orders.map((order) => (
                        <li key={order._id}>
                            Order #{order._id} - Total: ${order.netPayable} - Status: {order.status}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Profile;
