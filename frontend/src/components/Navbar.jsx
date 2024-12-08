import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ vendors, onVendorClick }) => {
    const { isLoggedIn, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white">
            <div className="flex items-center space-x-4">
                <Link to="/" className=" hover:text-blue-300 ml-2">Home</Link>
                <Link to="/cart" className="hover:text-blue-300 ml-2">Cart</Link>
                <Link to="/profile" className="hover:text-blue-300 ml-2">Profile</Link>
            </div>
            <div className="space-x-4">
                <select
                    onChange={(e) => onVendorClick(e.target.value)}
                    className="p-2 rounded-md bg-gray-700 text-white focus:outline-none"
                >
                    <option value="">Select a Vendor</option>
                    {vendors.map((vendor) => (
                        <option key={vendor._id} value={vendor._id}>
                            {vendor.name}
                        </option>
                    ))}
                </select>
                {isLoggedIn ? (
                    <button 
                        onClick={handleLogout} 
                        className="px-4 py-2 bg-red-500 rounded-md hover:bg-red-600"
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login">
                            <button className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600">
                                Login
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className="px-4 py-2 bg-green-500 rounded-md hover:bg-green-600">
                                Sign Up
                            </button>
                        </Link>
                    </>
                )}
            </div>
    </nav>

    );
};

export default Navbar;
