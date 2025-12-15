// src/pages/auth/RegisterStudent.jsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import { ArrowLeft } from 'lucide-react';

const RegisterStudent = () => {
    const navigate = useNavigate();
    const { checkAuth } = useAuth();
    const API_BASE_URL = import.meta.env.VITE_API_URL

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
    const [selectedRole, setSelectedRole] = useState('student');

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
            // Format date as DD/MM/YYYY with validation
            let formattedValue = value.replace(/\D/g, '');

            // Validate day (DD) - max 31
            if (formattedValue.length >= 2) {
                const day = parseInt(formattedValue.slice(0, 2), 10);
                if (day > 31) {
                    formattedValue = '31' + formattedValue.slice(2);
                }
                formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2);
            }

            // Validate month (MM) - max 12
            if (formattedValue.length >= 5) {
                const month = parseInt(formattedValue.slice(3, 5), 10);
                if (month > 12) {
                    formattedValue = formattedValue.slice(0, 3) + '12' + formattedValue.slice(5);
                }
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

    // Helper function to calculate age from DD/MM/YYYY format
    const calculateAge = (dateString) => {
        const parts = dateString.split('/');
        if (parts.length !== 3) return null;

        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed in JavaScript
        const year = parseInt(parts[2], 10);

        const birthDate = new Date(year, month, day);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
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

        // Age validation - Students must be 16 or older
        const age = calculateAge(formData.dateOfBirth);
        if (age === null) {
            setError('Invalid date of birth format');
            setIsLoading(false);
            return;
        }
        if (age < 16) {
            setError('You must be at least 16 years old to register as a student');
            setIsLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        // Password validation
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long');
            setIsLoading(false);
            return;
        }

        if (formData.password.length > 64) {
            setError('Password must not exceed 64 characters');
            setIsLoading(false);
            return;
        }

        if (!/[A-Z]/.test(formData.password)) {
            setError('Password must contain at least one uppercase letter');
            setIsLoading(false);
            return;
        }

        if (!/[0-9]/.test(formData.password)) {
            setError('Password must contain at least one number');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/register/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
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

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        if (role === 'mentor') {
            navigate('/auth/register/mentor');
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
                        დაიწყე შენი მოგზაურობა ჩვენთან
                    </h1>

                    {/* Sign Up Card */}
                    <div className="bg-primary/60 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20">
                        <h2 className="text-xl text-secondary mb-6">
                            რეგისტრაცია
                        </h2>

                        {/* Role Tabs */}
                        <div className="flex gap-2 mb-6 bg-white/10 p-1 rounded-full">
                            <button
                                onClick={() => handleRoleSelect('student')}
                                className={`flex-1 py-2 px-4 rounded-full transition-all text-sm ${selectedRole === 'student'
                                    ? 'bg-white text-primary'
                                    : 'text-white hover:bg-white/20'
                                    }`}
                            >
                                როგორც სტუდენტი
                            </button>
                            <button
                                onClick={() => handleRoleSelect('mentor')}
                                className={`flex-1 py-2 px-4 rounded-full transition-all text-sm ${selectedRole === 'mentor'
                                    ? 'bg-white text-primary'
                                    : 'text-white hover:bg-white/20'
                                    }`}
                            >
                                როგორც მენტორი
                            </button>
                        </div>

                        {/* Form */}
                        <form className="space-y-4 text-left" onSubmit={handleSubmit}>
                            {error && (
                                <div className="bg-red-500/20 border border-red-500/50 text-white px-4 py-3 rounded-full text-sm">
                                    {error}
                                </div>
                            )}

                            <input
                                type="text"
                                name="firstName"
                                placeholder="სახელი *"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-full bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-secondary text-sm"
                                required
                                disabled={isLoading}
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="გვარი *"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-full bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-secondary text-sm"
                                required
                                disabled={isLoading}
                            />
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
                            <div className="flex gap-2">
                                <div className="w-20 px-4 py-2.5 rounded-full bg-white/10 border border-white/30 text-white text-sm flex items-center justify-center">
                                    +995
                                </div>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="ტელეფონი *"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    maxLength={9}
                                    className="flex-1 px-4 py-2.5 rounded-full bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-secondary text-sm"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <input
                                type="text"
                                name="dateOfBirth"
                                placeholder="დაბადების თარიღი (დდ/თთ/წწწწ) *"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                maxLength={10}
                                className="w-full px-4 py-2.5 rounded-full bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-secondary text-sm"
                                required
                                disabled={isLoading}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="პაროლი (მინ 8 სიმბოლო, 1 დიდი ასო, 1 ციფრი) *"
                                value={formData.password}
                                onChange={handleChange}
                                maxLength={64}
                                className="w-full px-4 py-2.5 rounded-full bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-secondary text-sm"
                                required
                                disabled={isLoading}
                            />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="გაიმეორე პაროლი *"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-full bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-secondary text-sm"
                                required
                                disabled={isLoading}
                            />

                            {/* Checkboxes */}
                            <div className="space-y-2 text-xs">
                                <label className="flex items-start gap-2 text-white/80 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        name="agreeToTerms"
                                        checked={formData.agreeToTerms}
                                        onChange={handleChange}
                                        className="mt-0.5 w-4 h-4 flex-shrink-0 bg-white border-2 border-white rounded-sm appearance-none checked:bg-white checked:border-white relative cursor-pointer
                                        before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                                        before:w-2.5 before:h-2.5 before:bg-secondary before:rounded-sm before:opacity-0 checked:before:opacity-100"
                                        required
                                        disabled={isLoading}
                                    />
                                    <span>
                                        ვეთანხმები{' '}
                                        <Link to="/terms-of-service" target="_blank" className="underline hover:text-secondary">
                                            გამოყენების წესებს
                                        </Link>
                                    </span>
                                </label>
                                <label className="flex items-start gap-2 text-white/80 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        id="marketing"
                                        name="agreeToMarketing"
                                        checked={formData.agreeToMarketing}
                                        onChange={handleChange}
                                        className="mt-0.5 w-4 h-4 flex-shrink-0 bg-white border-2 border-white rounded-sm appearance-none checked:bg-white checked:border-white relative cursor-pointer
                                        before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                                        before:w-2.5 before:h-2.5 before:bg-secondary before:rounded-sm before:opacity-0 checked:before:opacity-100"
                                        disabled={isLoading}
                                    />
                                    <span>ვეთანხმები მივიღო გუნდისგან მარკეტინგული კამპანიები</span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading || !formData.agreeToTerms}
                                className="w-full py-3 bg-white text-primary rounded-full hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'იტვირთება...' : 'შემდეგი'}
                            </button>

                            {/* Sign In Link */}
                            <p className="text-white/80 text-xs text-center pt-2">
                                უკვე გაქვს ანგარიში?{' '}
                                <Link to="/auth/login" className="text-secondary hover:underline">
                                    შესვლა
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterStudent;