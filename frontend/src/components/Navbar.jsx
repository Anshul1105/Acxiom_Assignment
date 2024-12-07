import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the custom hook

const Navbar = ({ vendors, onVendorClick }) => {
    const { isLoggedIn, logout } = useAuth(); // Use the AuthContext

    const handleLogout = () => {
        logout(); // Call the logout function from context
    };

    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/profile">Profile</Link>
            
            {/* Conditional rendering of Vendor buttons */}
            {vendors.map((vendor) => (
                <button key={vendor} onClick={() => onVendorClick(vendor)}>
                    Vendor {vendor}
                </button>
            ))}
            
            {/* Conditional rendering of login, signup or logout buttons */}
            {isLoggedIn ? (
                <button onClick={handleLogout}>Logout</button> // Show logout if logged in
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
