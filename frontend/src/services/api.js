import axios from 'axios';

const API = axios.create({
    baseURL: 'https://acxiom-assignment.onrender.com', // Adjust this based on your backend URL
    withCredentials: true, // Enable session cookies
});

// API calls for User Authentication
export const registerUser = (data) => API.post('/users/register', data);
export const loginUser = (data) => API.post('/users/login', data);
// export const fetchUserOrders = () => API.get('/users/orders');

// API calls for Cart
export const fetchCart = () => API.get('/cart');
export const addToCart = (productId) => API.post('/cart/add', { productId });

export const removeFromCart = (productId) =>
    API.post('/cart/remove', { productId }); // Remove endpoint

// API calls for Products
export const fetchProductsByVendor = (vendorId) => API.get(`/products/vendor/${vendorId}`);

// API call for Vendors
export const fetchVendors = () => API.get('/vendors');

// API Calls for Orders
// export const placeOrder = () => API.post('/order/place'); // Place an order
// export const fetchUserOrders = () => API.get('/order/user/orders'); // Fetch user orders
// export const updateOrderStatus = (orderId, status) => 
//     API.post('/order/update-status', { orderId, status });  // Admin update order status
// Place Order
export const placeOrder = async () => {
    return await API.post('/orders/place');
};
export const fetchUserOrders = async () => {
    return await API.get('/orders/user/orders');
};
export default API;
