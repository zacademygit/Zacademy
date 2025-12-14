// src/pages/Auth.jsx

import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Auth = () => {
    const navigate = useNavigate();

    const handleRoleSelect = (role) => {
        // Navigate to the appropriate registration page based on role
        if (role === 'student') {
            navigate('/auth/register/student');
        } else {
            navigate('/auth/register/mentor');
        }
    };

    const handleNavigation = (destination) => {
        if (destination === 'home') {
            navigate('/');
        }
    };

    // Role Selection Screen
    return (
        <div className="min-h-screen bg-primary relative overflow-hidden">
            {/* Top Navigation */}
            <div className="relative z-10 max-w-[1440px] mx-auto px-8 py-4 flex justify-between items-center">
                <button
                    onClick={() => handleNavigation('home')}
                    className="bg-primary text-white hover:text-secondary transition-colors flex items-center gap-2 text-sm"
                >
                    <ArrowLeft size={16} />
                    <span>უკან მთავარზე</span>
                </button>
                <Link to="/support" className="text-white hover:text-secondary transition-colors text-sm">
                    დახმარება?
                </Link>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-8">
                <div className="text-center max-w-3xl w-full">
                    {/* Heading */}
                    <h1 className="text-3xl text-white mb-3">
                        გაიარე რეგისტრაცია
                    </h1>
                    <p className="text-white/80 mb-10">
                        აირჩიე როგორც გსურს შემოხვიდე პლატფორმაზე
                    </p>

                    {/* Role Cards */}
                    <div className="grid grid-cols-2 gap-6">
                        {/* Student Card */}
                        <button
                            onClick={() => handleRoleSelect('student')}
                            className="bg-primary/60 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20 hover:border-secondary transition-all transform hover:scale-105"
                        >
                            <h2 className="text-xl text-white mb-3">როგორც სტუდენტი</h2>
                            <p className="text-sm text-white/70">
                                იპოვე შენთვის სასურველი მენტორი და განავითარე უნარები
                            </p>
                        </button>

                        {/* Mentor Card */}
                        <button
                            onClick={() => handleRoleSelect('mentor')}
                            className="bg-primary/60 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20 hover:border-secondary transition-all transform hover:scale-105"
                        >
                            <h2 className="text-xl text-white mb-3">როგორც მენტორი</h2>
                            <p className="text-sm text-white/70">
                                გაუზიარე შენი ცოდნა და გამოცდილება სტუდენტებს
                            </p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;