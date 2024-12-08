import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api'; // Import the registerUser function

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser({ username, email, password });
            const { token } = response.data; // Assuming the API returns a token on successful signup
            sessionStorage.setItem('token', token);
            navigate('/'); // Redirect to homepage after successful signup
        } catch (err) {
            console.error('Error signing up:', err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-50">
            <div className="w-[50%] max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Create an Account</h2>
                <p className="text-center text-gray-600 mb-6">
                    Sign up to get started and explore our features.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className='m-6 p-12'>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600 text-sm">
                    Already have an account?{' '}
                    <a href="/login" className="text-green-500 hover:underline">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
