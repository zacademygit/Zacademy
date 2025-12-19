// src/pages/auth/RegisterMentor.jsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import { ArrowLeft } from 'lucide-react';
import universitiesData from '../data/universities.json';
import facultiesData from '../data/faculties.json';

const RegisterMentor = () => {
    const API_BASE_URL = import.meta.env.VITE_API_URL

    const navigate = useNavigate();
    const { checkAuth } = useAuth();
    const [step, setStep] = useState(1); // Multi-step form for mentors
    const [showOtherUniversity, setShowOtherUniversity] = useState(false);
    const [showOtherFaculty, setShowOtherFaculty] = useState(false);

    const [formData, setFormData] = useState({
        // Step 1: Basic Info
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        dateOfBirth: '',

        // Step 2: Professional Info
        occupationArea: '',
        currentPosition: '',
        company: '',
        yearsOfExperience: '',
        university: '',
        faculty: '',

        // Step 3: Mentoring Info
        bio: '',
        linkedin: '',
        photo: null,

        agreeToTerms: false,
        agreeToMarketing: false
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedRole, setSelectedRole] = useState('mentor');

    const occupationAreaOptions = [
        'STEM (Science, Technology, Engineering, Mathematics)',
        'Business, Finance & Management',
        'Creative Arts, Media & Design',
        'Healthcare & Medicine',
        'Education & Social Sciences',
        'Law, Government & Public Policy',
        'Trades, Vocational & Technical Careers',
        'Hospitality, Tourism & Customer Experience',
        'Environment, Agriculture & Sustainability',
        'Sports, Fitness & Wellness',
        'Emerging & Future-Forward Fields'
    ];

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (name === 'phone') {
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
        } else if (name === 'university') {
            // Handle university selection
            if (value === 'Other') {
                setShowOtherUniversity(true);
                setFormData({
                    ...formData,
                    university: ''
                });
            } else {
                // Don't toggle showOtherUniversity here - only the "Back" button should do that
                setFormData({
                    ...formData,
                    university: value
                });
            }
        } else if (name === 'faculty') {
            // Handle faculty selection
            if (value === 'Other') {
                setShowOtherFaculty(true);
                setFormData({
                    ...formData,
                    faculty: ''
                });
            } else {
                // Don't toggle showOtherFaculty here - only the "Back" button should do that
                setFormData({
                    ...formData,
                    faculty: value
                });
            }
        } else if (type === 'file') {
            setFormData({
                ...formData,
                [name]: files[0]
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

    const handleNextStep = () => {
        // Validate current step before proceeding
        if (step === 1) {
            if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword || !formData.phone || !formData.dateOfBirth) {
                setError('Please fill in all required fields');
                return;
            }
            // Age validation - Mentors must be 18 or older
            const age = calculateAge(formData.dateOfBirth);
            if (age === null) {
                setError('Invalid date of birth format');
                return;
            }
            if (age < 18) {
                setError('You must be at least 18 years old to register as a mentor');
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return;
            }
            // Password validation
            if (formData.password.length < 8) {
                setError('Password must be at least 8 characters long');
                return;
            }
            if (formData.password.length > 64) {
                setError('Password must not exceed 64 characters');
                return;
            }
            if (!/[A-Z]/.test(formData.password)) {
                setError('Password must contain at least one uppercase letter');
                return;
            }
            if (!/[0-9]/.test(formData.password)) {
                setError('Password must contain at least one number');
                return;
            }
        } else if (step === 2) {
            if (!formData.occupationArea || !formData.currentPosition || !formData.university || !formData.faculty) {
                setError('Please fill in all required fields');
                return;
            }
        }

        setError('');
        setStep(step + 1);
    };

    const handlePrevStep = () => {
        setError('');
        setStep(step - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        console.log(formData.agreeToTerms)
        console.log('tye', typeof (formData.agreeToTerms))
        if (!formData.agreeToTerms == true) {
            setError('You must agree to the Terms of Service and Privacy Policy');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // Create FormData to handle file upload
            const payload = new FormData();

            // Append all form fields
            payload.append('firstName', formData.firstName);
            payload.append('lastName', formData.lastName);
            payload.append('email', formData.email);
            payload.append('password', formData.password);
            payload.append('phone', formData.phone);
            payload.append('dateOfBirth', formData.dateOfBirth);
            payload.append('occupationArea', formData.occupationArea);
            payload.append('currentPosition', formData.currentPosition);
            payload.append('company', formData.company || '');
            payload.append('yearsOfExperience', formData.yearsOfExperience || '');
            payload.append('university', formData.university);
            payload.append('faculty', formData.faculty);
            payload.append('bio', formData.bio);
            payload.append('linkedin', formData.linkedin || '');
            payload.append('agreeToTerms', formData.agreeToTerms);
            payload.append('agreeToMarketing', formData.agreeToMarketing);

            // Append photo file if selected
            if (formData.photo) {
                payload.append('photo', formData.photo);
            }

            const response = await fetch(`${API_BASE_URL}/api/auth/register/mentor`, {
                method: 'POST',
                credentials: 'include',
                body: payload,
                // Don't set Content-Type header - browser will set it automatically with boundary
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            // Update auth state with newly registered mentor
            await checkAuth();

            // Redirect to mentor dashboard after successful registration
            navigate('/mentor-dashboard');
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        if (role === 'student') {
            navigate('/auth/register/student');
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
                <div className="text-center max-w-2xl w-full">
                    {/* Heading */}
                    <h1 className="text-3xl text-secondary mb-8">
                        დაიწყე შენი მოგზაურობა ჩვენთან
                    </h1>

                    {/* Progress Indicator */}
                    <div className="flex justify-center mb-8">
                        <div className="flex items-center space-x-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-secondary ' : 'bg-white/20 text-white'} font-bold`}>
                                1
                            </div>
                            <div className={`w-20 h-1 ${step >= 2 ? 'bg-secondary' : 'bg-white/20'}`}></div>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-secondary ' : 'bg-white/20 text-white'} font-bold`}>
                                2
                            </div>
                            <div className={`w-20 h-1 ${step >= 3 ? 'bg-secondary' : 'bg-white/20'}`}></div>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-secondary ' : 'bg-white/20 text-white'} font-bold`}>
                                3
                            </div>
                        </div>
                    </div>

                    {/* Registration Form Card */}
                    <div className="bg-primary/60 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20">
                        <h2 className="text-xl text-secondary mb-6">
                            {step === 1 && 'ძირითადი ინფორმაცია'}
                            {step === 2 && 'პროფესიული გამოცდილება'}
                            {step === 3 && 'მენტორობის დეტალები'}
                        </h2>

                        {/* Role Toggle */}
                        {step === 1 && (
                            <div className="flex gap-2 mb-6 bg-white/10 p-1 rounded-full">
                                <button
                                    onClick={() => handleRoleSelect('student')}
                                    className={`flex-1 py-2 px-4 rounded-full transition-all text-sm ${selectedRole === 'student'
                                        ? 'bg-white '
                                        : 'text-white hover:bg-white/20'
                                        }`}
                                >
                                    როგორც სტუდენტი
                                </button>
                                <button
                                    onClick={() => handleRoleSelect('mentor')}
                                    className={`flex-1 py-2 px-4 rounded-full transition-all text-sm ${selectedRole === 'mentor'
                                        ? 'bg-white '
                                        : 'text-white hover:bg-white/20'
                                        }`}
                                >
                                    როგორც მენტორი
                                </button>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="bg-red-500/20 border border-red-500/50 text-white px-4 py-3 rounded-full text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Step 1: Basic Information */}
                            {step === 1 && (
                                <>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="სახელი *"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-full bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-secondary text-sm"
                                        required
                                    />

                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="გვარი *"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-full bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-secondary text-sm"
                                        required
                                    />

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="ელ-ფოსტა *"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-full bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-secondary text-sm"
                                        required
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
                                    />

                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="გაიმეორე პაროლი *"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-full bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-secondary text-sm"
                                        required
                                    />

                                    <button
                                        type="button"
                                        onClick={handleNextStep}
                                        className="w-full py-3 bg-white  rounded-full hover:bg-white/90 transition-colors"
                                    >
                                        შემდეგი
                                    </button>
                                </>
                            )}

                            {/* Step 2: Professional Background */}
                            {step === 2 && (
                                <>
                                    <select
                                        name="occupationArea"
                                        value={formData.occupationArea}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-full bg-white/10 border border-white/30 text-white/60 focus:outline-none focus:border-secondary text-sm appearance-none cursor-pointer"
                                        required
                                        style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(255,255,255,0.6)'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                            backgroundPosition: 'right 1rem center',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: '1.5rem',
                                            paddingRight: '3rem'
                                        }}
                                    >
                                        <option value="" disabled className="bg-blue-700 text-white">Occupation Area *</option>
                                        {occupationAreaOptions.map(area => (
                                            <option key={area} value={area} className="bg-blue-700 text-white">{area}</option>
                                        ))}
                                    </select>

                                    <input
                                        type="text"
                                        name="currentPosition"
                                        placeholder="Current Position/Title *"
                                        value={formData.currentPosition}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-full bg-white/10 border border-white/30 text-white/60 placeholder-white/60 focus:outline-none focus:border-secondary text-sm"
                                        required
                                    />

                                    <input
                                        type="text"
                                        name="company"
                                        placeholder="Company/Organization"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-full bg-white/10 border border-white/30 text-white/60 placeholder-white/60 focus:outline-none focus:border-secondary text-sm"
                                    />

                                    <select
                                        name="yearsOfExperience"
                                        value={formData.yearsOfExperience}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-full bg-white/10 border border-white/30 text-white/60 focus:outline-none focus:border-secondary text-sm appearance-none cursor-pointer"
                                        style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(255,255,255,0.6)'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                            backgroundPosition: 'right 1rem center',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: '1.5rem',
                                            paddingRight: '3rem'
                                        }}
                                    >
                                        <option value="" disabled className="bg-blue-700 text-white">Years of Experience</option>
                                        <option value="0-2" className="bg-blue-700 text-white">0-2 years</option>
                                        <option value="3-5" className="bg-blue-700 text-white">3-5 years</option>
                                        <option value="6-10" className="bg-blue-700 text-white">6-10 years</option>
                                        <option value="10+" className="bg-blue-700 text-white">10+ years</option>
                                    </select>

                                    {/* University Dropdown */}
                                    {!showOtherUniversity ? (
                                        <select
                                            name="university"
                                            value={formData.university}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-full bg-white/10 border border-white/30 text-white/60 focus:outline-none focus:border-secondary text-sm"
                                            required
                                        >
                                            <option value="" className="bg-blue-700 text-white">Select University *</option>
                                            <optgroup label="Georgia" className="bg-blue-700 text-white">
                                                {universitiesData.universities
                                                    .filter(uni => uni.country === 'Georgia')
                                                    .map((uni, idx) => (
                                                        <option key={idx} value={uni.name} className="bg-blue-700 text-white">
                                                            {uni.name}
                                                        </option>
                                                    ))
                                                }
                                            </optgroup>
                                            <optgroup label="United Kingdom" className="bg-blue-700 text-white">
                                                {universitiesData.universities
                                                    .filter(uni => uni.country === 'UK')
                                                    .map((uni, idx) => (
                                                        <option key={idx} value={uni.name} className="bg-blue-700 text-white">
                                                            {uni.name}
                                                        </option>
                                                    ))
                                                }
                                            </optgroup>
                                            <optgroup label="United States" className="bg-blue-700 text-white">
                                                {universitiesData.universities
                                                    .filter(uni => uni.country === 'USA')
                                                    .map((uni, idx) => (
                                                        <option key={idx} value={uni.name} className="bg-blue-700 text-white">
                                                            {uni.name}
                                                        </option>
                                                    ))
                                                }
                                            </optgroup>
                                            <optgroup label="France" className="bg-blue-700 text-white">
                                                {universitiesData.universities
                                                    .filter(uni => uni.country === 'France')
                                                    .map((uni, idx) => (
                                                        <option key={idx} value={uni.name} className="bg-blue-700 text-white">
                                                            {uni.name}
                                                        </option>
                                                    ))
                                                }
                                            </optgroup>
                                            <optgroup label="Germany" className="bg-blue-700 text-white">
                                                {universitiesData.universities
                                                    .filter(uni => uni.country === 'Germany')
                                                    .map((uni, idx) => (
                                                        <option key={idx} value={uni.name} className="bg-blue-700 text-white">
                                                            {uni.name}
                                                        </option>
                                                    ))
                                                }
                                            </optgroup>
                                            <option value="Other" className="bg-blue-700 text-white font-semibold">Other (Enter Manually)</option>
                                        </select>
                                    ) : (
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                name="university"
                                                placeholder="Enter your university name *"
                                                value={formData.university}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-full bg-white/10 border border-white/30 text-white/60 placeholder-white/60 focus:outline-none focus:border-secondary text-sm"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowOtherUniversity(false);
                                                    setFormData({ ...formData, university: '' });
                                                }}
                                                className="text-lime-400 hover:text-lime-300 text-sm"
                                            >
                                                ← Back to university list
                                            </button>
                                        </div>
                                    )}

                                    {/* Faculty Dropdown */}
                                    {!showOtherFaculty ? (
                                        <select
                                            name="faculty"
                                            value={formData.faculty}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-full bg-white/10 border border-white/30 text-white/60 focus:outline-none focus:border-secondary text-sm"
                                            required
                                        >
                                            <option value="" className="bg-blue-700 text-white">Select Faculty *</option>
                                            {facultiesData.faculties.map((category, catIdx) => (
                                                <optgroup key={catIdx} label={category.category} className="bg-blue-700 text-white">
                                                    {category.items.map((faculty, idx) => (
                                                        <option key={idx} value={faculty} className="bg-blue-700 text-white">
                                                            {faculty}
                                                        </option>
                                                    ))}
                                                </optgroup>
                                            ))}
                                            <option value="Other" className="bg-blue-700 text-white font-semibold">Other (Enter Manually)</option>
                                        </select>
                                    ) : (
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                name="faculty"
                                                placeholder="Enter your faculty name *"
                                                value={formData.faculty}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-full bg-white/10 border border-white/30 text-white/60 placeholder-white/60 focus:outline-none focus:border-secondary text-sm"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowOtherFaculty(false);
                                                    setFormData({ ...formData, faculty: '' });
                                                }}
                                                className="text-lime-400 hover:text-lime-300 text-sm"
                                            >
                                                ← Back to faculty list
                                            </button>
                                        </div>
                                    )}

                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={handlePrevStep}
                                            className="flex-1 bg-white/20 hover:bg-white/30 text-white py-3 rounded-full transition"
                                        >
                                            უკან
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleNextStep}
                                            className="flex-1 bg-white  py-3 rounded-full hover:bg-white/90 transition-colors"
                                        >
                                            შემდეგი
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* Step 3: Mentoring Details */}
                            {step === 3 && (
                                <>
                                    <textarea
                                        name="bio"
                                        placeholder="About me (Tell people about yourself) *"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/30 text-white/60 placeholder-white/60 focus:outline-none focus:border-secondary text-sm resize-none"
                                        required
                                    />

                                    <input
                                        type="url"
                                        name="linkedin"
                                        placeholder="LinkedIn Profile"
                                        value={formData.linkedin}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-full bg-white/10 border border-white/30 text-white/60 placeholder-white/60 focus:outline-none focus:border-secondary text-sm"
                                    />

                                    <div className="space-y-2">
                                        <label htmlFor="photo" className="text-white/60 text-sm font-semibold">
                                            Upload Photo
                                        </label>
                                        <input
                                            type="file"
                                            id="photo"
                                            name="photo"
                                            accept="image/*"
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-full bg-white/10 border border-white/30 text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-white hover:file:opacity-90 file:cursor-pointer focus:outline-none focus:border-secondary text-sm flex items-center"
                                        />
                                        {formData.photo && (
                                            <p className="text-white/60 text-xs">
                                                Selected: {formData.photo.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Terms and Privacy */}
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
                                            />
                                            <span>ვეთანხმები მივიღო გუნდისგან მარკეტინგული კამპანიები</span>
                                        </label>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={handlePrevStep}
                                            className="flex-1 bg-white/20 hover:bg-white/30 text-white py-3 rounded-full transition"
                                        >
                                            უკან
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isLoading || !formData.agreeToTerms}
                                            className="flex-1 bg-white  py-3 rounded-full hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? 'იტვირთება...' : 'გაგზავნა'}
                                        </button>
                                    </div>
                                </>
                            )}
                        </form>

                        {/* Already have an account */}
                        <p className="text-white/80 text-xs text-center pt-6">
                            უკვე გაქვს ანგარიში?{' '}
                            <Link to="/auth/login" className="text-secondary hover:underline">
                                შესვლა
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterMentor;