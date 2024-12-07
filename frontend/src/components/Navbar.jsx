import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ vendors, onVendorClick }) => {
    const { isLoggedIn, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/profile">Profile</Link>

            {/* Dropdown for vendors */}
            <select onChange={(e) => onVendorClick(e.target.value)}>
                <option value="">Select a Vendor</option>
                {vendors.map((vendor) => (
                    <option key={vendor._id} value={vendor._id}>
                        {vendor.name}
                    </option>
                ))}
            </select>

            {/* Conditional rendering of login, signup, or logout buttons */}
            {isLoggedIn ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                    <Link to="/signup">
                        <button>Sign Up</button>
                    </Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;
