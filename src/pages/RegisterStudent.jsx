// src/pages/auth/RegisterStudent.jsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

const RegisterStudent = () => {
    const navigate = useNavigate();
    const { checkAuth } = useAuth();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        dateOfBirth: '',
        agreeToTerms: false,
        agreeToMarketing: false
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === 'phone') {
            // Only allow numbers
            const numbersOnly = value.replace(/\D/g, '');
            setFormData({
                ...formData,
                phone: numbersOnly
            });
        } else if (name === 'dateOfBirth') {
            // Format date as DD/MM/YYYY
            let formattedValue = value.replace(/\D/g, '');
            if (formattedValue.length >= 2) {
                formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2);
            }
            if (formattedValue.length >= 5) {
                formattedValue = formattedValue.slice(0, 5) + '/' + formattedValue.slice(5, 9);
            }
            setFormData({
                ...formData,
                dateOfBirth: formattedValue
            });
        } else if (type === 'checkbox') {
            setFormData({
                ...formData,
                [name]: checked
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Validation
        if (!formData.agreeToTerms) {
            setError('You must agree to the Terms of Service and Privacy Policy');
            setIsLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/register/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone,
                    dateOfBirth: formData.dateOfBirth,
                    agreeToTerms: formData.agreeToTerms,
                    agreeToMarketing: formData.agreeToMarketing
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            // Update auth state with newly registered user
            await checkAuth();

            // Check if user should be redirected back to mentor profile
            const redirectMentorId = sessionStorage.getItem('redirectToMentor');
            if (redirectMentorId) {
                navigate(`/mentor/${redirectMentorId}`);
            } else {
                // Default redirect to student dashboard
                navigate('/student-dashboard');
            }
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
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
            <div className="flex-1 flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-xl">
                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-5xl md:text-7xl font-bold mb-4">
                            <span className="text-lime-400">START YOUR</span>
                            <br />
                            <span className="text-lime-400">JOURNEY WITH US</span>
                        </h1>
                    </div>

                    {/* Registration Form Card */}
                    <div className="bg-blue-800/30 backdrop-blur-sm border-2 border-blue-500/50 rounded-3xl p-8 md:p-10">
                        <h2 className="text-3xl font-bold text-lime-400 text-center mb-2">SIGN UP</h2>

                        {/* Role Toggle */}
                        <div className="text-center mb-6">
                            <button
                                onClick={() => navigate('/auth')}
                                className=" hover:text-lime-400 text-sm transition"
                            >
                                ← Change role
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="bg-red-500/20 border border-red-500/50 text-white px-4 py-3 rounded-full text-sm">
                                    {error}
                                </div>
                            )}

                            {/* First Name */}
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First name *"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full bg-transparent border-2 border-white/40 text-white placeholder:text-white/70 focus:border-white rounded-full h-14 px-6 focus:outline-none transition"
                                required
                                disabled={isLoading}
                            />

                            {/* Last Name */}
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last name *"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full bg-transparent border-2 border-white/40 text-white placeholder:text-white/70 focus:border-white rounded-full h-14 px-6 focus:outline-none transition"
                                required
                                disabled={isLoading}
                            />

                            {/* Email */}
                            <input
                                type="email"
                                name="email"
                                placeholder="Email *"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-transparent border-2 border-white/40 text-white placeholder:text-white/70 focus:border-white rounded-full h-14 px-6 focus:outline-none transition"
                                required
                                disabled={isLoading}
                            />

                            {/* Phone with Country Code */}
                            <div className="flex gap-2">
                                <div className="bg-transparent border-2 border-white/40 text-white rounded-full h-14 w-24 flex items-center justify-center font-medium">
                                    +995
                                </div>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone *"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    maxLength={9}
                                    className="flex-1 bg-transparent border-2 border-white/40 text-white placeholder:text-white/70 focus:border-white rounded-full h-14 px-6 focus:outline-none transition"
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Date of Birth */}
                            <input
                                type="text"
                                name="dateOfBirth"
                                placeholder="Date of birth (DD/MM/YYYY) *"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                maxLength={10}
                                className="w-full bg-transparent border-2 border-white/40 text-white placeholder:text-white/70 focus:border-white rounded-full h-14 px-6 focus:outline-none transition"
                                required
                                disabled={isLoading}
                            />

                            {/* Password */}
                            <input
                                type="password"
                                name="password"
                                placeholder="Password (min 8 characters) *"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-transparent border-2 border-white/40 text-white placeholder:text-white/70 focus:border-white rounded-full h-14 px-6 focus:outline-none transition"
                                required
                                disabled={isLoading}
                            />

                            {/* Confirm Password */}
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password *"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full bg-transparent border-2 border-white/40 text-white placeholder:text-white/70 focus:border-white rounded-full h-14 px-6 focus:outline-none transition"
                                required
                                disabled={isLoading}
                            />

                            {/* Terms and Privacy */}
                            <div className="space-y-3 pt-2">
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        name="agreeToTerms"
                                        checked={formData.agreeToTerms}
                                        onChange={handleChange}
                                        className="mt-1 w-4 h-4 rounded border-white/40 bg-transparent text-lime-400 focus:ring-lime-400 cursor-pointer"
                                        required
                                        disabled={isLoading}
                                    />
                                    <label htmlFor="terms" className="text-white text-sm leading-relaxed cursor-pointer">
                                        I agree to the{' '}
                                        <Link to="/terms" target="_blank" className="underline hover:text-lime-400">
                                            Terms of Service
                                        </Link>{' '}
                                        and{' '}
                                        <Link to="/privacy" target="_blank" className="underline hover:text-lime-400">
                                            Privacy Policy
                                        </Link>.
                                    </label>
                                </div>

                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        id="marketing"
                                        name="agreeToMarketing"
                                        checked={formData.agreeToMarketing}
                                        onChange={handleChange}
                                        className="mt-1 w-4 h-4 rounded border-white/40 bg-transparent text-lime-400 focus:ring-lime-400 cursor-pointer"
                                        disabled={isLoading}
                                    />
                                    <label htmlFor="marketing" className="text-white text-sm leading-relaxed cursor-pointer">
                                        I agree to receive the direct marketing campaign messages.
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading || !formData.agreeToTerms}
                                className="w-full bg-white/80 hover:bg-white text-blue-700 font-bold py-4 rounded-full transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                            >
                                {isLoading ? 'Processing...' : 'Register'}
                            </button>
                        </form>

                        {/* Already have an account */}
                        <div className="mt-6 text-center text-white">
                            <span className="text-sm">Already have an account? </span>
                            <Link to="/auth/login" className="text-lime-400 hover:underline font-semibold">
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterStudent;