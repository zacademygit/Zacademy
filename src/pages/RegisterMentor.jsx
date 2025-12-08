// src/pages/auth/RegisterMentor.jsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

const RegisterMentor = () => {
    const navigate = useNavigate();
    const { checkAuth } = useAuth();
    const [step, setStep] = useState(1); // Multi-step form for mentors

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

    const occupationAreaOptions = [
        'STEM (Science, Technology, Engineering, Mathematics)',
        'Business & Finance',
        'Healthcare & Life Sciences',
        'International Relations & Public Policy',
        'Creative & Media Industries',
        'Education & Research',
        'Law & Governance',
        'Environmental & Sustainability',
        'Social Impact & Human Services',
        'Digital Economy & E-commerce',
        'Advanced Manufacturing & Logistics'
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

    const handleNextStep = () => {
        // Validate current step before proceeding
        if (step === 1) {
            if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword || !formData.phone || !formData.dateOfBirth) {
                setError('Please fill in all required fields');
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return;
            }
            if (formData.password.length < 8) {
                setError('Password must be at least 8 characters long');
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

        if (!formData.agreeToTerms) {
            setError('You must agree to the Terms of Service and Privacy Policy');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // Note: Photo upload would need to be handled separately (e.g., upload to cloud storage)
            // For now, we'll send null for photoUrl
            const payload = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                dateOfBirth: formData.dateOfBirth,
                occupationArea: formData.occupationArea,
                currentPosition: formData.currentPosition,
                company: formData.company,
                yearsOfExperience: formData.yearsOfExperience,
                university: formData.university,
                faculty: formData.faculty,
                bio: formData.bio,
                linkedin: formData.linkedin,
                photoUrl: null, // TODO: Implement photo upload to cloud storage
                agreeToTerms: formData.agreeToTerms,
                agreeToMarketing: formData.agreeToMarketing
            };

            const response = await fetch('/api/auth/register/mentor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
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
                <div className="w-full max-w-2xl">
                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">
                            <span className="text-lime-400">BECOME A MENTOR</span>
                        </h1>
                        <p className="text-white/80">Join our community of expert mentors</p>
                    </div>

                    {/* Progress Indicator */}
                    <div className="flex justify-center mb-8">
                        <div className="flex items-center space-x-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-lime-400 text-blue-700' : 'bg-white/20 text-white'} font-bold`}>
                                1
                            </div>
                            <div className={`w-20 h-1 ${step >= 2 ? 'bg-lime-400' : 'bg-white/20'}`}></div>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-lime-400 text-blue-700' : 'bg-white/20 text-white'} font-bold`}>
                                2
                            </div>
                            <div className={`w-20 h-1 ${step >= 3 ? 'bg-lime-400' : 'bg-white/20'}`}></div>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-lime-400 text-blue-700' : 'bg-white/20 text-white'} font-bold`}>
                                3
                            </div>
                        </div>
                    </div>

                    {/* Registration Form Card */}
                    <div className="bg-blue-800/30 backdrop-blur-sm border-2 border-blue-500/50 rounded-3xl p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-lime-400 text-center mb-6">
                            {step === 1 && 'Basic Information'}
                            {step === 2 && 'Professional Background'}
                            {step === 3 && 'Mentoring Details'}
                        </h2>

                        {/* Role Toggle */}
                        {step === 1 && (
                            <div className="text-center mb-6">
                                <button
                                    onClick={() => navigate('/auth')}
                                    className=" hover:text-lime-400 text-sm transition"
                                >
                                    ← Register as student instead
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
                                        placeholder="First name *"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-2 border-white/40 text-white placeholder:text-white/70 focus:border-white rounded-full h-14 px-6 focus:outline-none transition"
                                        required
                                    />

                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last name *"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-2 border-white/40 text-white placeholder:text-white/70 focus:border-white rounded-full h-14 px-6 focus:outline-none transition"
                                        required
                                    />

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email *"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-2 border-white/40 text-white placeholder:text-white/70 focus:border-white rounded-full h-14 px-6 focus:outline-none transition"
                                        required
                                    />

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
                                        />
                                    </div>

                                    <input
                                        type="text"
                                        name="dateOfBirth"
                                        placeholder="Date of birth (DD/MM/YYYY) *"
                                        value={formData.dateOfBirth}
                                        onChange={handleChange}
                                        maxLength={10}
                                        className="w-full bg-transparent border-2 border-white/40 text-white placeholder:text-white/70 focus:border-white rounded-full h-14 px-6 focus:outline-none transition"
                                        required
                                    />

                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password (min 8 characters) *"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-2 border-white/40 text-white placeholder:text-white/70 focus:border-white rounded-full h-14 px-6 focus:outline-none transition"
                                        required
                                    />

                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm Password *"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-2 border-white/40 text-white placeholder:text-white/70 focus:border-white rounded-full h-14 px-6 focus:outline-none transition"
                                        required
                                    />

                                    <button
                                        type="button"
                                        onClick={handleNextStep}
                                        className="w-full bg-lime-400 hover:bg-lime-300 text-blue-700 font-bold py-4 rounded-full transition duration-200 text-lg"
                                    >
                                        Next
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
                                        className="w-full bg-transparent border-2 border-white/40 text-white rounded-full h-14 px-6 focus:outline-none transition appearance-none cursor-pointer"
                                        required
                                        style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                            backgroundPosition: 'right 1.5rem center',
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
                                        className="w-full bg-transparent border-2 border-white/40 text-white placeholder:text-white/70 focus:border-white rounded-full h-14 px-6 focus:outline-none transition"
                                        required
                                    />

                                    <input
                                        type="text"
                                        name="company"
                                        placeholder="Company/Organization"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-2 border-white/40 text-white placeholder:text-white/70 focus:border-white rounded-full h-14 px-6 focus:outline-none transition"
                                    />

                                    <select
                                        name="yearsOfExperience"
                                        value={formData.yearsOfExperience}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-2 border-white/40 text-white rounded-full h-14 px-6 focus:outline-none transition appearance-none cursor-pointer"
                                        style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                            backgroundPosition: 'right 1.5rem center',
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

                                    <input
                                        type="text"
                                        name="university"
                                        placeholder="University/Institution *"
                                        value={formData.university}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-2 border-white/40 text-white placeholder:text-white/70 focus:border-white rounded-full h-14 px-6 focus:outline-none transition"
                                        required
                                    />

                                    <input
                                        type="text"
                                        name="faculty"
                                        placeholder="Faculty *"
                                        value={formData.faculty}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-2 border-white/40 text-white placeholder:text-white/70 focus:border-white rounded-full h-14 px-6 focus:outline-none transition"
                                        required
                                    />

                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={handlePrevStep}
                                            className="flex-1 bg-white/20 hover:bg-white/30 text-white font-bold py-4 rounded-full transition duration-200 text-lg"
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleNextStep}
                                            className="flex-1 bg-lime-400 hover:bg-lime-300 text-blue-700 font-bold py-4 rounded-full transition duration-200 text-lg"
                                        >
                                            Next
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
                                        className="w-full bg-transparent border-2 border-white/40 text-white placeholder:text-white/70 focus:border-white rounded-2xl px-6 py-3 focus:outline-none transition resize-none"
                                        required
                                    />

                                    <input
                                        type="url"
                                        name="linkedin"
                                        placeholder="LinkedIn Profile"
                                        value={formData.linkedin}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-2 border-white/40 text-white placeholder:text-white/70 focus:border-white rounded-full h-14 px-6 focus:outline-none transition"
                                    />

                                    <div className="space-y-2">
                                        <label htmlFor="photo" className="text-white text-sm font-semibold">
                                            Upload Photo
                                        </label>
                                        <input
                                            type="file"
                                            id="photo"
                                            name="photo"
                                            accept="image/*"
                                            onChange={handleChange}
                                            className="w-full bg-transparent border-2 border-white/40 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-lime-400 file:text-blue-700 hover:file:bg-lime-300 file:cursor-pointer rounded-full h-14 px-6 focus:outline-none transition flex items-center"
                                        />
                                        {formData.photo && (
                                            <p className="text-white text-xs">
                                                Selected: {formData.photo.name}
                                            </p>
                                        )}
                                    </div>

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
                                            />
                                            <label htmlFor="marketing" className="text-white text-sm leading-relaxed cursor-pointer">
                                                I agree to receive the direct marketing campaign messages.
                                            </label>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={handlePrevStep}
                                            className="flex-1 bg-white/20 hover:bg-white/30 text-white font-bold py-4 rounded-full transition duration-200 text-lg"
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isLoading || !formData.agreeToTerms}
                                            className="flex-1 bg-lime-400 hover:bg-lime-300 text-blue-700 font-bold py-4 rounded-full transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                                        >
                                            {isLoading ? 'Submitting...' : 'Submit Application'}
                                        </button>
                                    </div>
                                </>
                            )}
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

export default RegisterMentor;