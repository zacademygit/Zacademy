// src/components/mentor/ProfileSettings.jsx

import { useState } from 'react';
import toast from 'react-hot-toast';

const ProfileSettings = ({ profile, refreshProfile, api }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        firstName: profile?.firstName || '',
        lastName: profile?.lastName || '',
        email: profile?.email || '',
        phone: profile?.phone || '',
        countryCode: profile?.countryCode || '+995',
        university: profile?.university || '',
        fieldOfStudy: profile?.fieldOfStudy || '',
        bio: profile?.bio || '',
        workingLanguages: profile?.workingLanguages || [],
        linkedIn: profile?.linkedIn || '',
        yearsOfExperience: profile?.yearsOfExperience || ''
    });

    const [newLanguage, setNewLanguage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddLanguage = () => {
        if (newLanguage && !formData.workingLanguages.includes(newLanguage)) {
            setFormData(prev => ({
                ...prev,
                workingLanguages: [...prev.workingLanguages, newLanguage]
            }));
            setNewLanguage('');
        }
    };

    const handleRemoveLanguage = (language) => {
        setFormData(prev => ({
            ...prev,
            workingLanguages: prev.workingLanguages.filter(lang => lang !== language)
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const response = await api.put('/mentor/profile', formData);

            if (response.data.success) {
                toast.success('Profile updated successfully');
                await refreshProfile();
                setIsEditing(false);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            firstName: profile?.firstName || '',
            lastName: profile?.lastName || '',
            email: profile?.email || '',
            phone: profile?.phone || '',
            countryCode: profile?.countryCode || '+995',
            university: profile?.university || '',
            fieldOfStudy: profile?.fieldOfStudy || '',
            bio: profile?.bio || '',
            workingLanguages: profile?.workingLanguages || [],
            linkedIn: profile?.linkedIn || '',
            yearsOfExperience: profile?.yearsOfExperience || ''
        });
        setIsEditing(false);
    };

    return (
        <div className="space-y-6">
            {/* Profile Completion Alert */}
            {!profile?.profileComplete && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex gap-3">
                        <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                            <h3 className="font-medium text-yellow-800">Complete Your Profile</h3>
                            <p className="text-sm text-yellow-700 mt-1">
                                Please fill in all required information to complete your profile and submit your application.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Personal Information Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit Profile
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                            >
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                }`}
                            required
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                }`}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                }`}
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
                            <select
                                name="countryCode"
                                value={formData.countryCode}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={`w-24 px-2 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
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
                                className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                    }`}
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Academic & Professional Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Academic & Professional Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* University */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            University/Institution <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="university"
                            value={formData.university}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="e.g., Harvard University"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                }`}
                            required
                        />
                    </div>

                    {/* Field of Study */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Field of Study <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="fieldOfStudy"
                            value={formData.fieldOfStudy}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="e.g., Computer Science"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                }`}
                            required
                        />
                    </div>

                    {/* Years of Experience */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Years of Experience <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="yearsOfExperience"
                            value={formData.yearsOfExperience}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                }`}
                            required
                        >
                            <option value="">Select years</option>
                            <option value="0-2">0-2 years</option>
                            <option value="2-5">2-5 years</option>
                            <option value="5-10">5-10 years</option>
                            <option value="10+">10+ years</option>
                        </select>
                    </div>

                    {/* LinkedIn */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            LinkedIn Profile
                        </label>
                        <input
                            type="url"
                            name="linkedIn"
                            value={formData.linkedIn}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="https://linkedin.com/in/yourprofile"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                }`}
                        />
                    </div>
                </div>

                {/* Bio */}
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio / About You <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        rows="5"
                        placeholder="Tell students about your experience, expertise, and what you can help them with..."
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                            }`}
                        required
                    />
                    <p className="text-sm text-gray-500 mt-1">Minimum 100 characters</p>
                </div>

                {/* Working Languages */}
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Working Languages <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {formData.workingLanguages.map((language, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                            >
                                {language}
                                {isEditing && (
                                    <button
                                        onClick={() => handleRemoveLanguage(language)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </span>
                        ))}
                    </div>
                    {isEditing && (
                        <div className="flex gap-2">
                            <select
                                value={newLanguage}
                                onChange={(e) => setNewLanguage(e.target.value)}
                                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select language</option>
                                <option value="English">English</option>
                                <option value="Georgian">Georgian</option>
                                <option value="Russian">Russian</option>
                                <option value="Spanish">Spanish</option>
                                <option value="French">French</option>
                                <option value="German">German</option>
                                <option value="Mandarin">Mandarin</option>
                                <option value="Arabic">Arabic</option>
                            </select>
                            <button
                                type="button"
                                onClick={handleAddLanguage}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Add Language
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Profile Photo Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Photo</h2>
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {profile?.firstName?.[0]}{profile?.lastName?.[0]}
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-3">
                            Upload a professional photo to help students connect with you
                        </p>
                        <button
                            disabled={!isEditing}
                            className={`px-4 py-2 border border-gray-300 rounded-lg transition ${isEditing ? 'hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'
                                }`}
                        >
                            Upload Photo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;