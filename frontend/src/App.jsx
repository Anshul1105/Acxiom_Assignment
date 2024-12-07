import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import VendorProducts from './pages/VendorProducts';
import Cart from './components/Cart';
import Profile from './components/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { fetchVendors } from './services/api';

const App = () => {
    const [vendors, setVendors] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState(null);

    useEffect(() => {
        const loadVendors = async () => {
            try {
                const { data } = await fetchVendors();
                setVendors(data);
                console.log(data);
                if (data.length > 0) setSelectedVendor(data[0]._id); // Default to the first vendor's ObjectId
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
                    onVendorClick={(vendorId) => setSelectedVendor(vendorId)} // Update selected vendor
                />
                <Routes>
                    {selectedVendor && (
                        <Route
                            path="/"
                            element={<VendorProducts vendorId={selectedVendor} />}
                        />
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
