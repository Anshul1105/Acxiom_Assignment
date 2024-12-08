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
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Order History</h2>

      {orders.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <p className="text-lg text-gray-600">You have no orders yet.</p>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg">
          <ul className="space-y-4 p-6">
            {orders.map((order) => (
              <li
                key={order._id}
                className="flex justify-between items-center border-b pb-4"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6">
                  <div className="space-y-2 sm:space-y-0 sm:w-3/4">
                    <h3 className="text-xl font-semibold">
                      Order #{order._id}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Total: <span className="font-medium">${order.netPayable}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Status: <span className="font-medium">{order.status}</span>
                    </p>
                  </div>
                </div>
                <div className="sm:w-1/4 flex justify-end">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                    View Details
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
