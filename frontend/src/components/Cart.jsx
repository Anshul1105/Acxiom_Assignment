import React, { useEffect, useState } from 'react';
import { fetchCart, placeOrder } from '../services/api';

const Cart = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const loadCart = async () => {
      if (cart !== null) return;
      try {
        const { data } = await fetchCart();
        setCart(data);
        console.log("Fetched cart : ", data, cart);
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
    };

    loadCart();
  }, []);

  console.log("Cart is", cart);
  if (!cart) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading cart...</p>
      </div>
    );
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

  const totalPrice = cart.products.reduce(
    (total, item) => total + (item.product && item.product.price) * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Cart</h2>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <ul className="space-y-4">
          {cart.products.map((item) => (
            <li
              key={item.product && item.product._id}
              className="flex justify-between items-center border-b pb-4"
            >
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    {item.product && item.product.name}
                  </h3>
                  <p className="text-gray-500">
                    {item.quantity} x ${item.product && item.product.price}
                  </p>
                </div>
              </div>
              <div className="text-xl font-semibold">
                ${item.product && item.product.price * item.quantity}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-between items-center">
          <p className="text-xl font-semibold">Total:</p>
          <p className="text-xl font-semibold text-green-600">${totalPrice.toFixed(2)}</p>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handlePlaceOrder}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
