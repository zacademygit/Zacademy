// src/pages/auth/Login.jsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');



    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            // Add your login API call here
            console.log('Login:', formData);
            const response = await login(formData.email, formData.password)
            console.log('respos', response)
            navigate('/');
        } catch (err) {
            setError('Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-6 text-white">
                <Link to="/" className="text-sm hover:underline">
                    ← Back to home
                </Link>
                <Link to="/support" className="text-sm hover:underline">
                    Need help?
                </Link>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    {/* Logo/Brand */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-lime-400 mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-white/80">Sign in to continue your journey</p>
                    </div>

                    {/* Login Form */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-red-500/20 border border-red-500/50 text-white px-4 py-3 rounded-lg">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-white text-sm font-medium mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-white text-sm font-medium mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div className="flex items-center justify-between">

                                <Link to="/forgot-password" className="text-sm text-lime-400 hover:underline">
                                    Forgot password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-lime-400 text-blue-800 font-semibold py-3 px-4 rounded-lg hover:bg-lime-300 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Signing in...' : 'Sign In'}
                            </button>


                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-white/80">
                                Don't have an account?{' '}
                                <Link to="/auth/register" className="text-lime-400 hover:underline font-semibold">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;