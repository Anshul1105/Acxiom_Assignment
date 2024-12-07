import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import VendorProducts from './pages/VendorProducts';
import Cart from './components/Cart';
import Profile from './components/Profile';
import Login from './pages/Login';
import { fetchVendors } from './services/api';
import Signup from './pages/Signup';

const App = () => {
    const [vendors, setVendors] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState(null);

    useEffect(() => {
        const loadVendors = async () => {
            try {
                const { data } = await fetchVendors();
                console.log(data);
                setVendors(data);
                setSelectedVendor(data[0]); // Default to the first vendor's ObjectId
                console.log(data)
            } catch (err) {
                console.error('Error loading vendors:', err);
            }
        };

        loadVendors();
    }, []);

    return (
        <AuthProvider>
            <Router>
                <Navbar
                    vendors={vendors}
                    onVendorClick={(vendor) => setSelectedVendor(vendor._id)} // Set only the ObjectId
                />
                <Routes>
                    {selectedVendor && (
                        <Route path="/" element={<VendorProducts vendorId={selectedVendor} />} />
                    )}
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
