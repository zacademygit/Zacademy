// src/pages/auth/Login.jsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import { ArrowLeft } from 'lucide-react';

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
            const response = await login(formData.email, formData.password);

            // Redirect based on user type
            if (response.user.user_type === 'mentor') {
                navigate('/mentor-dashboard');
            } else {
                navigate('/student-dashboard');
            }
        } catch (err) {
            setError(err.message || 'Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-primary relative overflow-hidden">
            {/* Grid Pattern Background */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, white 1px, transparent 1px),
                        linear-gradient(to bottom, white 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                }}
            />

            {/* Top Navigation */}
            <div className="relative z-10 max-w-[1440px] mx-auto px-8 py-4 flex justify-between items-center">
                <button
                    onClick={() => navigate('/auth')}
                    className="bg-primary text-white hover:text-secondary transition-colors flex items-center gap-2 text-sm"
                >
                    <ArrowLeft size={16} />
                    <span>უკან</span>
                </button>
                <Link to="/support" className="text-white hover:text-secondary transition-colors text-sm">
                    დახმარება?
                </Link>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-8 py-8">
                <div className="text-center max-w-md w-full">
                    {/* Heading */}
                    <h1 className="text-3xl text-secondary mb-8">
                        კეთილი იყოს შენი დაბრუნება
                    </h1>

                    {/* Login Card */}
                    <div className="bg-primary/60 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20">
                        <h2 className="text-xl text-secondary mb-6">
                            შესვლა
                        </h2>

                        {/* Form */}
                        <form className="space-y-4 text-left" onSubmit={handleSubmit}>
                            {error && (
                                <div className="bg-red-500/20 border border-red-500/50 text-white px-4 py-3 rounded-full text-sm">
                                    {error}
                                </div>
                            )}

                            <input
                                type="email"
                                name="email"
                                placeholder="ელ-ფოსტა *"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-full bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-secondary text-sm"
                                required
                                disabled={isLoading}
                            />

                            <input
                                type="password"
                                name="password"
                                placeholder="პაროლი *"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-full bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-secondary text-sm"
                                required
                                disabled={isLoading}
                            />

                            <div className="text-right">
                                <Link to="/forgot-password" className="text-xs text-white/80 hover:text-secondary">
                                    დაგავიწყდა პაროლი?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 bg-white  rounded-full hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'იტვირთება...' : 'შესვლა'}
                            </button>

                            {/* Sign Up Link */}
                            <p className="text-white/80 text-xs text-center pt-2">
                                არ გაქვს ანგარიში?{' '}
                                <Link to="/auth" className="text-secondary hover:underline">
                                    რეგისტრაცია
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;