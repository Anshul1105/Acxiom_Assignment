import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api'; // Import the loginUser function

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser({ username, password });
            const { token } = response.data;
            sessionStorage.setItem('token', token); // Store token in sessionStorage
            console.log(response.data);
            navigate('/'); // Redirect to homepage after successful login
        } catch (err) {
            console.error('Error logging in:', err);
        }
    };

    return (
        // <div className="min-h-screen flex items-center justify-center bg-gray-100">
        //     <div className="w-[60%] max-w-[1440px] bg-white p-8 rounded-lg shadow-md">
        <div className='translate-y-[100px]'>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-50 p-16">
                <div className="w-[60%] max-w-[1440px] bg-white p-10 md:p-12 lg:p-16 rounded-2xl shadow-lg border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                        Login
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Login
                        </button>
                    </form>
                    <p className="mt-4 text-center text-gray-600 text-sm">
                        Don't have an account?{' '}
                        <a href="/signup" className="text-blue-500 hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
