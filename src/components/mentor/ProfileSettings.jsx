// src/components/mentor/ProfileSettings.jsx

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Camera, Save, X, ChevronDown, ChevronUp } from 'lucide-react';

const ProfileSettings = ({ profile, refreshProfile, api }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [isProfessionalExpanded, setIsProfessionalExpanded] = useState(true);
    const [formData, setFormData] = useState({
        firstName: profile?.firstName || '',
        lastName: profile?.lastName || '',
        email: profile?.email || '',
        phone: profile?.phone || '',
        countryCode: profile?.countryCode || '+995',
        occupationArea: profile?.occupationArea || '',
        currentPosition: profile?.currentPosition || '',
        company: profile?.company || '',
        yearsOfExperience: profile?.yearsOfExperience || '',
        university: profile?.university || '',
        faculty: profile?.faculty || '',
        bio: profile?.bio || '',
        linkedin: profile?.linkedin || ''
    });

    // Sync formData when profile updates
    useEffect(() => {
        if (profile) {
            setFormData({
                firstName: profile.firstName || '',
                lastName: profile.lastName || '',
                email: profile.email || '',
                phone: profile.phone || '',
                countryCode: profile.countryCode || '+995',
                occupationArea: profile.occupationArea || '',
                currentPosition: profile.currentPosition || '',
                company: profile.company || '',
                yearsOfExperience: profile.yearsOfExperience || '',
                university: profile.university || '',
                faculty: profile.faculty || '',
                bio: profile.bio || '',
                linkedin: profile.linkedin || ''
            });
        }
    }, [profile]);

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        // Check required personal fields
        if (!formData.firstName?.trim()) {
            toast.error('სახელი აუცილებელია');
            return false;
        }
        if (!formData.lastName?.trim()) {
            toast.error('გვარი აუცილებელია');
            return false;
        }
        if (!formData.email?.trim()) {
            toast.error('ელ-ფოსტა აუცილებელია');
            return false;
        }
        if (!formData.phone?.trim()) {
            toast.error('ტელეფონის ნომერი აუცილებელია');
            return false;
        }

        // Check required professional fields
        if (!formData.occupationArea) {
            toast.error('საქმიანობის სფერო აუცილებელია');
            return false;
        }
        if (!formData.currentPosition?.trim()) {
            toast.error('მიმდინარე პოზიცია აუცილებელია');
            return false;
        }
        if (!formData.university?.trim()) {
            toast.error('უნივერსიტეტი აუცილებელია');
            return false;
        }
        if (!formData.faculty?.trim()) {
            toast.error('ფაკულტეტი აუცილებელია');
            return false;
        }

        // Check bio
        if (!formData.bio?.trim()) {
            toast.error('ბიოგრაფია აუცილებელია');
            return false;
        }
        if (formData.bio.trim().length < 100) {
            toast.error('ბიოგრაფია უნდა იყოს მინიმუმ 100 სიმბოლო');
            return false;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error('გთხოვთ, შეიყვანოთ სწორი ელ-ფოსტა');
            return false;
        }

        // Validate LinkedIn URL if provided
        if (formData.linkedin && formData.linkedin.trim()) {
            try {
                new URL(formData.linkedin);
            } catch (e) {
                toast.error('გთხოვთ, შეიყვანოთ სწორი LinkedIn ბმული');
                return false;
            }
        }

        return true;
    };

    const handleSave = async () => {
        // Validate form before saving
        if (!validateForm()) {
            return;
        }

        setSaving(true);
        try {
            const response = await api.put('/mentor/profile', formData);

            if (response.data.success) {
                toast.success('პროფილი წარმატებით განახლდა');
                await refreshProfile();
                setIsEditing(false);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'პროფილის განახლება ვერ მოხერხდა');
        } finally {
            setSaving(false);
        }
    };

    const hasChanges = () => {
        if (!profile) return false;

        return (
            formData.firstName !== (profile.firstName || '') ||
            formData.lastName !== (profile.lastName || '') ||
            formData.email !== (profile.email || '') ||
            formData.phone !== (profile.phone || '') ||
            formData.countryCode !== (profile.countryCode || '+995') ||
            formData.occupationArea !== (profile.occupationArea || '') ||
            formData.currentPosition !== (profile.currentPosition || '') ||
            formData.company !== (profile.company || '') ||
            formData.yearsOfExperience !== (profile.yearsOfExperience || '') ||
            formData.university !== (profile.university || '') ||
            formData.faculty !== (profile.faculty || '') ||
            formData.bio !== (profile.bio || '') ||
            formData.linkedin !== (profile.linkedin || '')
        );
    };

    const handleCancel = () => {
        if (hasChanges()) {
            const confirmCancel = window.confirm(
                'თქვენ გაქვთ შეუნახავი ცვლილებები. დარწმუნებული ხართ, რომ გსურთ გაუქმება?'
            );
            if (!confirmCancel) return;
        }

        setFormData({
            firstName: profile?.firstName || '',
            lastName: profile?.lastName || '',
            email: profile?.email || '',
            phone: profile?.phone || '',
            countryCode: profile?.countryCode || '+995',
            occupationArea: profile?.occupationArea || '',
            currentPosition: profile?.currentPosition || '',
            company: profile?.company || '',
            yearsOfExperience: profile?.yearsOfExperience || '',
            university: profile?.university || '',
            faculty: profile?.faculty || '',
            bio: profile?.bio || '',
            linkedin: profile?.linkedin || ''
        });
        setIsEditing(false);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">პროფილის პარამეტრები</h1>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        პროფილის რედაქტირება
                    </button>
                ) : (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleSave}
                            disabled={saving || !hasChanges()}
                            className="px-6 py-2 bg-secondary  rounded-lg hover:bg-secondary/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            <Save size={16} />
                            {saving ? 'ინახება...' : 'შენახვა'}
                        </button>
                        <button
                            onClick={handleCancel}
                            disabled={saving}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 flex items-center gap-2"
                        >
                            <X size={16} />
                            გაუქმება
                        </button>
                    </div>
                )}
            </div>

            {/* Unsaved Changes Warning */}
            {isEditing && hasChanges() && (
                <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-orange-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                            <p className="text-sm font-medium text-orange-800">თქვენ გაქვთ შეუნახავი ცვლილებები</p>
                            <p className="text-xs text-orange-700 mt-1">გთხოვთ შეინახოთ ცვლილებები გვერდის დატოვებამდე</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Profile Photo Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-4">პროფილის ფოტო</h2>
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {profile?.firstName?.[0]}{profile?.lastName?.[0]}
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-3">
                            ატვირთეთ პროფესიონალური ფოტო სტუდენტებთან დასაკავშირებლად
                        </p>
                        <button
                            disabled={!isEditing}
                            className={`px-4 py-2 border border-gray-300 rounded-lg transition flex items-center gap-2 ${isEditing ? 'hover:bg-gray-50 text-gray-700' : 'opacity-50 cursor-not-allowed text-gray-400'
                                }`}
                        >
                            <Camera size={16} />
                            ფოტოს ატვირთვა
                        </button>
                    </div>
                </div>
            </div>

            {/* Personal Information Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-6">პირადი ინფორმაცია</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            სახელი <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                }`}
                            required
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            გვარი <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                }`}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            ელ-ფოსტა <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                }`}
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            ტელეფონი <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
                            <select
                                name="countryCode"
                                value={formData.countryCode}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={`w-24 px-2 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                    }`}
                            >
                                <option value="+995">+995</option>
                                <option value="+1">+1</option>
                                <option value="+44">+44</option>
                                <option value="+49">+49</option>
                                <option value="+33">+33</option>
                            </select>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={`flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                    }`}
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Academic & Professional Information */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900">აკადემიური და პროფესიული ინფორმაცია</h2>
                    <button
                        onClick={() => setIsProfessionalExpanded(!isProfessionalExpanded)}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition"
                    >
                        <span>{isProfessionalExpanded ? 'ჩაკეცვა' : 'გაშლა'}</span>
                        {isProfessionalExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                </div>

                {isProfessionalExpanded && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Occupation Area */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    საქმიანობის სფერო <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="occupationArea"
                                    value={formData.occupationArea}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                        }`}
                                    required
                                >
                                    <option value="">აირჩიეთ სფერო</option>
                                    {occupationAreaOptions.map(area => (
                                        <option key={area} value={area}>{area}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Current Position */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    მიმდინარე პოზიცია <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="currentPosition"
                                    value={formData.currentPosition}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    placeholder="მაგ., Senior Engineer"
                                    className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                        }`}
                                    required
                                />
                            </div>

                            {/* Company */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    კომპანია/ორგანიზაცია
                                </label>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    placeholder="მაგ., Google"
                                    className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                        }`}
                                />
                            </div>

                            {/* Years of Experience */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    გამოცდილების წლები
                                </label>
                                <select
                                    name="yearsOfExperience"
                                    value={formData.yearsOfExperience}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                        }`}
                                >
                                    <option value="">აირჩიეთ წლები</option>
                                    <option value="0-2">0-2 წელი</option>
                                    <option value="3-5">3-5 წელი</option>
                                    <option value="6-10">6-10 წელი</option>
                                    <option value="10+">10+ წელი</option>
                                </select>
                            </div>

                            {/* University */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    უნივერსიტეტი <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="university"
                                    value={formData.university}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    placeholder="მაგ., თსუ"
                                    className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                        }`}
                                    required
                                />
                            </div>

                            {/* Faculty */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    ფაკულტეტი <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="faculty"
                                    value={formData.faculty}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    placeholder="მაგ., ინფორმატიკა"
                                    className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                        }`}
                                    required
                                />
                            </div>

                            {/* LinkedIn */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    LinkedIn პროფილი
                                </label>
                                <input
                                    type="url"
                                    name="linkedin"
                                    value={formData.linkedin}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    placeholder="https://linkedin.com/in/yourprofile"
                                    className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                        }`}
                                />
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ბიოგრაფია <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                rows="5"
                                placeholder="მოგვიყევით თქვენი გამოცდილების, ექსპერტიზისა და თქვენი დახმარების შესახებ..."
                                className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                    }`}
                                required
                            />
                            <div className="flex justify-between items-center mt-1">
                                <p className="text-sm text-gray-500">მინიმუმ 100 სიმბოლო</p>
                                <p className={`text-sm font-medium ${formData.bio.length >= 100
                                        ? 'text-green-600'
                                        : formData.bio.length > 0
                                            ? 'text-orange-600'
                                            : 'text-gray-500'
                                    }`}>
                                    {formData.bio.length} / 100
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProfileSettings;
