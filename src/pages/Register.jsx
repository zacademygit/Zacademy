// src/pages/Auth.jsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Auth = () => {
    const [selectedRole, setSelectedRole] = useState('');
    const navigate = useNavigate();

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        // Navigate to the appropriate registration page based on role
        if (role === 'student') {
            navigate('/auth/register/student');
        } else {
            navigate('/auth/register/mentor');
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
            <div className="flex-1 flex items-center justify-center px-4">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                        <span className="text-lime-400">START YOUR</span>
                        <br />
                        <span className="text-lime-400">JOURNEY WITH US</span>
                    </h1>

                    {/* Role Selection Card */}
                    <div className="bg-blue-800/50 backdrop-blur-sm border-2 border-blue-600 rounded-2xl p-8 md:p-12 mt-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-lime-400 mb-8">
                            SELECT YOUR ROLE
                        </h2>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => handleRoleSelect('student')}
                                className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-full hover:bg-lime-400 hover:text-blue-800 transition-all transform hover:scale-105"
                            >
                                Student
                            </button>
                            <button
                                onClick={() => handleRoleSelect('mentor')}
                                className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-full hover:bg-lime-400 hover:text-blue-800 transition-all transform hover:scale-105"
                            >
                                Mentor
                            </button>
                        </div>

                        <div className="mt-8 text-white/80">
                            <p className="text-sm">
                                Already have an account?{' '}
                                <Link to="/auth/login" className="text-lime-400 hover:underline">
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;