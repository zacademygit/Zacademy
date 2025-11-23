// src/components/mentor/TimezoneServices.jsx

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const HOURS = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
});

const UTC_OFFSETS = [
    { value: -12, label: 'UTC-12' },
    { value: -11, label: 'UTC-11' },
    { value: -10, label: 'UTC-10 (Hawaii)' },
    { value: -9, label: 'UTC-9 (Alaska)' },
    { value: -8, label: 'UTC-8 (Pacific Time)' },
    { value: -7, label: 'UTC-7 (Mountain Time)' },
    { value: -6, label: 'UTC-6 (Central Time)' },
    { value: -5, label: 'UTC-5 (Eastern Time)' },
    { value: -4, label: 'UTC-4 (Atlantic)' },
    { value: -3, label: 'UTC-3 (Brazil)' },
    { value: -2, label: 'UTC-2' },
    { value: -1, label: 'UTC-1' },
    { value: 0, label: 'UTC±0 (London)' },
    { value: 1, label: 'UTC+1 (Central Europe)' },
    { value: 2, label: 'UTC+2 (Eastern Europe)' },
    { value: 3, label: 'UTC+3 (Moscow/Turkey)' },
    { value: 4, label: 'UTC+4 (Georgia/Dubai)' },
    { value: 5, label: 'UTC+5 (Pakistan)' },
    { value: 5.5, label: 'UTC+5:30 (India)' },
    { value: 6, label: 'UTC+6 (Kazakhstan)' },
    { value: 7, label: 'UTC+7 (Thailand)' },
    { value: 8, label: 'UTC+8 (China/Singapore)' },
    { value: 9, label: 'UTC+9 (Japan/Korea)' },
    { value: 10, label: 'UTC+10 (Sydney)' },
    { value: 11, label: 'UTC+11' },
    { value: 12, label: 'UTC+12 (New Zealand)' },
];

const formatTimezoneOffset = (offset) => {
    if (offset === null || offset === undefined) return 'Not Set';
    if (offset === 0) return 'UTC±0';
    const sign = offset > 0 ? '+' : '';
    return `UTC${sign}${offset}`;
};

const TimezoneServices = ({ profile, refreshProfile, api }) => {
    // Availability states
    const [schedule, setSchedule] = useState({});
    const [timezoneOffset, setTimezoneOffset] = useState(null);
    const [requiresTimezone, setRequiresTimezone] = useState(false);
    const [availabilityLoading, setAvailabilityLoading] = useState(true);

    // Services states
    const [services, setServices] = useState([]);

    // Dialog states
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isTimezoneDialogOpen, setIsTimezoneDialogOpen] = useState(false);
    const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);

    // Form states
    const [selectedDay, setSelectedDay] = useState("");
    const [editingSlot, setEditingSlot] = useState(null);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(null);
    const [selectedOffset, setSelectedOffset] = useState(null);
    const [tempSelectedOffset, setTempSelectedOffset] = useState("");
    const [sendingApplication, setSendingApplication] = useState(false);

    // Service form
    const [editingService, setEditingService] = useState(null);
    const [serviceForm, setServiceForm] = useState({
        category: '',
        description: '',
        price: ''
    });

    // Fetch availability
    const fetchAvailability = async () => {
        try {
            setAvailabilityLoading(true);
            const response = await api.get('/availability');

            if (response.data.success) {
                setSchedule(response.data.schedule || {});
                setTimezoneOffset(response.data.timezoneOffset);
                setRequiresTimezone(response.data.requiresTimezone || false);
                setSelectedOffset(response.data.timezoneOffset);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to load availability');
        } finally {
            setAvailabilityLoading(false);
        }
    };

    // Fetch services
    const fetchServices = async () => {
        try {
            const response = await api.get('/mentor/services');
            if (response.data.success) {
                setServices(response.data.services || []);
            }
        } catch (err) {
            console.error('Failed to load services:', err);
        }
    };

    useEffect(() => {
        fetchAvailability();
        fetchServices();
    }, []);

    useEffect(() => {
        if (requiresTimezone && !availabilityLoading) {
            setIsTimezoneDialogOpen(true);
        }
    }, [requiresTimezone, availabilityLoading]);

    // Availability management
    const addTimeSlot = async (day, start, end) => {
        try {
            const response = await api.post('/mentor/availability/slot', {
                day,
                startTime: start,
                endTime: end
            });

            if (response.data.success) {
                await fetchAvailability();
                return { success: true };
            }
        } catch (err) {
            return { success: false, error: err.response?.data?.message };
        }
    };

    const updateTimeSlot = async (day, slotId, start, end) => {
        try {
            const response = await api.put(`/mentor/availability/slot/${slotId}`, {
                day,
                startTime: start,
                endTime: end
            });

            if (response.data.success) {
                await fetchAvailability();
                return { success: true };
            }
        } catch (err) {
            return { success: false, error: err.response?.data?.message };
        }
    };

    const deleteTimeSlot = async (day, slotId) => {
        try {
            const response = await api.delete(`/mentor/availability/slot/${slotId}`);

            if (response.data.success) {
                await fetchAvailability();
                return { success: true };
            }
        } catch (err) {
            return { success: false, error: err.response?.data?.message };
        }
    };

    const updateTimezone = async (offset) => {
        try {
            const response = await api.post('/mentor/availability/timezone', {
                timezoneOffset: offset
            });

            if (response.data.success) {
                setTimezoneOffset(offset);
                setSelectedOffset(offset);
                setRequiresTimezone(false);
                return { success: true };
            }
        } catch (err) {
            return { success: false, error: err.response?.data?.message };
        }
    };

    // Service management
    const handleServiceSubmit = async () => {
        if (!serviceForm.category || !serviceForm.price) {
            toast.error('Please fill in all required fields');
            return;
        }

        setIsSaving(true);
        try {
            if (editingService) {
                await api.put(`/mentor/services/${editingService.id}`, serviceForm);
                toast.success('Service updated successfully');
            } else {
                await api.post('/mentor/services', serviceForm);
                toast.success('Service added successfully');
            }

            await fetchServices();
            setIsServiceDialogOpen(false);
            setServiceForm({ category: '', description: '', price: '' });
            setEditingService(null);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to save service');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteService = async (serviceId) => {
        if (!window.confirm('Are you sure you want to delete this service?')) return;

        try {
            await api.delete(`/mentor/services/${serviceId}`);
            toast.success('Service deleted successfully');
            await fetchServices();
        } catch (err) {
            toast.error('Failed to delete service');
        }
    };

    // Application submission
    const handleSendApplication = async () => {
        if (requiresTimezone) {
            toast.error('Please set your timezone before sending the application');
            return;
        }

        const hasAvailability = Object.values(schedule).some(slots => slots.length > 0);
        if (!hasAvailability) {
            toast.error('Please add at least one availability slot before sending your application');
            return;
        }

        if (!window.confirm('Are you ready to submit your application?')) {
            return;
        }

        setSendingApplication(true);
        try {
            const response = await api.post('/mentor/send-application');
            if (response.data.success) {
                toast.success('Application sent successfully! 🎉');
                await refreshProfile();
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to send application');
        } finally {
            setSendingApplication(false);
        }
    };

    const canSendApplication = () => {
        if (!profile?.profileComplete) return false;
        if (profile?.applicationStatus === 'pending' || profile?.applicationStatus === 'approved') return false;
        if (requiresTimezone) return false;
        const hasAvailability = Object.values(schedule).some(slots => slots && slots.length > 0);
        return hasAvailability;
    };

    // Dialog handlers
    const openAddDialog = (day) => {
        if (requiresTimezone) {
            toast.error('Please set your timezone before adding availability');
            setIsTimezoneDialogOpen(true);
            return;
        }
        setSelectedDay(day);
        setEditingSlot(null);
        setStartTime("");
        setEndTime("");
        setIsDialogOpen(true);
    };

    const openEditDialog = (day, slot) => {
        setSelectedDay(day);
        setEditingSlot(slot);
        setStartTime(slot.startTime);
        setEndTime(slot.endTime);
        setIsDialogOpen(true);
    };

    const handleSaveSlot = async () => {
        if (!startTime || !endTime) {
            toast.error('Please select both start and end times');
            return;
        }

        if (startTime >= endTime) {
            toast.error('End time must be after start time');
            return;
        }

        setIsSaving(true);
        try {
            const result = editingSlot
                ? await updateTimeSlot(selectedDay, editingSlot.id, startTime, endTime)
                : await addTimeSlot(selectedDay, startTime, endTime);

            if (result.success) {
                toast.success(editingSlot ? 'Time slot updated' : 'Time slot added');
                setIsDialogOpen(false);
                setStartTime("");
                setEndTime("");
                setEditingSlot(null);
            } else {
                toast.error(result.error || 'Failed to save time slot');
            }
        } catch (err) {
            toast.error('An unexpected error occurred');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteSlot = async (day, slotId) => {
        if (!window.confirm('Delete this time slot?')) return;

        setIsDeleting(slotId);
        try {
            const result = await deleteTimeSlot(day, slotId);
            if (result.success) {
                toast.success('Time slot deleted');
            } else {
                toast.error(result.error || 'Failed to delete');
            }
        } catch (err) {
            toast.error('An error occurred');
        } finally {
            setIsDeleting(null);
        }
    };

    const handleTimezoneChange = async (offsetStr) => {
        const offset = parseFloat(offsetStr);
        const result = await updateTimezone(offset);

        if (result.success) {
            toast.success('Timezone updated');
            await fetchAvailability();
        } else {
            toast.error(result.error || 'Failed to update timezone');
        }
    };

    const handleSetupTimezone = async () => {
        if (!tempSelectedOffset) {
            toast.error('Please select a timezone');
            return;
        }

        setIsSaving(true);
        const offset = parseFloat(tempSelectedOffset);
        const result = await updateTimezone(offset);

        if (result.success) {
            toast.success('Timezone set successfully!');
            setIsTimezoneDialogOpen(false);
            setTempSelectedOffset("");
            await fetchAvailability();
        } else {
            toast.error(result.error || 'Failed to set timezone');
        }
        setIsSaving(false);
    };

    if (availabilityLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading availability...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Timezone Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Timezone Settings</h2>
                        <p className="text-sm text-gray-600 mt-1">Set your timezone for accurate scheduling</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        {requiresTimezone ? (
                            <button
                                onClick={() => setIsTimezoneDialogOpen(true)}
                                className="px-4 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition"
                            >
                                Set Timezone
                            </button>
                        ) : (
                            <select
                                value={selectedOffset?.toString() || ""}
                                onChange={(e) => handleTimezoneChange(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">{formatTimezoneOffset(selectedOffset)}</option>
                                {UTC_OFFSETS.map((tz) => (
                                    <option key={tz.value} value={tz.value.toString()}>
                                        {tz.label}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                </div>

                {requiresTimezone ? (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <p className="text-orange-800">
                            <strong>Action Required:</strong> Please set your timezone to manage availability.
                        </p>
                    </div>
                ) : (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-blue-800">
                            Current timezone: <strong>{formatTimezoneOffset(timezoneOffset)}</strong>
                        </p>
                    </div>
                )}
            </div>

            {/* Services Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Services & Pricing</h2>
                        <p className="text-sm text-gray-600 mt-1">Configure your mentoring services and rates</p>
                    </div>
                    <button
                        onClick={() => {
                            setEditingService(null);
                            setServiceForm({ category: '', description: '', price: '' });
                            setIsServiceDialogOpen(true);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Service
                    </button>
                </div>

                {services.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A6.997 6.997 0 0018 8h-1.25C14.679 8 13 6.321 13 4.25V3a1 1 0 00-1-1H8a1 1 0 00-1 1v1.25C7 6.321 5.321 8 3.25 8H2a6.997 6.997 0 00-3 5.745V19a2 2 0 002 2h18a2 2 0 002-2v-5.745z" />
                        </svg>
                        <p>No services added yet</p>
                        <p className="text-sm mt-1">Click "Add Service" to get started</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {services.map((service) => (
                            <div key={service.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900">{service.category}</h4>
                                        <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                                        <p className="text-lg font-bold text-blue-600 mt-2">${service.price}/hour</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setEditingService(service);
                                                setServiceForm({
                                                    category: service.category,
                                                    description: service.description,
                                                    price: service.price
                                                });
                                                setIsServiceDialogOpen(true);
                                            }}
                                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleDeleteService(service.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Availability Grid */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Weekly Availability</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {WEEKDAYS.map((day) => (
                        <div key={day} className={`border rounded-lg p-4 ${requiresTimezone ? 'opacity-60' : ''}`}>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold text-gray-900">{day}</h3>
                                <button
                                    onClick={() => openAddDialog(day)}
                                    disabled={requiresTimezone}
                                    className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </button>
                            </div>

                            {requiresTimezone ? (
                                <p className="text-sm text-gray-500 italic">Set timezone first</p>
                            ) : schedule[day]?.length === 0 || !schedule[day] ? (
                                <p className="text-sm text-gray-500">No time slots</p>
                            ) : (
                                <div className="space-y-2">
                                    {schedule[day]?.map((slot) => (
                                        <div key={slot.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                            <span className="text-sm">{slot.startTime} - {slot.endTime}</span>
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => openEditDialog(day, slot)}
                                                    className="p-1 text-gray-600 hover:bg-gray-200 rounded"
                                                >
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteSlot(day, slot.id)}
                                                    disabled={isDeleting === slot.id}
                                                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                                                >
                                                    {isDeleting === slot.id ? (
                                                        <div className="animate-spin rounded-full h-3 w-3 border-b border-red-600"></div>
                                                    ) : (
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Send Application Section */}
            {profile && profile.applicationStatus !== 'approved' && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">
                        {profile.applicationStatus === 'pending' ? 'Application Status' : 'Ready to Start?'}
                    </h2>

                    {profile.applicationStatus === 'pending' ? (
                        <div>
                            <svg className="w-16 h-16 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-gray-600">Your application is under review. We'll notify you soon!</p>
                        </div>
                    ) : (
                        <>
                            <p className="text-gray-600 mb-6">
                                Complete all requirements to submit your mentor application
                            </p>
                            <div className="flex justify-center mb-6">
                                <ul className="text-left space-y-2">
                                    <li className="flex items-center gap-2">
                                        {profile.profileComplete ? (
                                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        )}
                                        <span>Complete profile</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        {timezoneOffset !== null ? (
                                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        )}
                                        <span>Set timezone</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        {Object.values(schedule).some(slots => slots && slots.length > 0) ? (
                                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        )}
                                        <span>Add availability</span>
                                    </li>
                                </ul>
                            </div>
                            <button
                                onClick={handleSendApplication}
                                disabled={!canSendApplication() || sendingApplication}
                                className={`px-8 py-3 rounded-lg font-semibold transition ${canSendApplication() && !sendingApplication
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {sendingApplication ? 'Sending...' : 'Send Application'}
                            </button>
                        </>
                    )}
                </div>
            )}

            {/* Modals */}
            {/* Timezone Dialog */}
            {isTimezoneDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl max-w-md w-full p-6">
                        <h3 className="text-xl font-bold mb-4">Set Your Timezone</h3>
                        <select
                            value={tempSelectedOffset}
                            onChange={(e) => setTempSelectedOffset(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg mb-4"
                        >
                            <option value="">Select timezone</option>
                            {UTC_OFFSETS.map((tz) => (
                                <option key={tz.value} value={tz.value.toString()}>
                                    {tz.label}
                                </option>
                            ))}
                        </select>
                        <div className="flex gap-3">
                            <button
                                onClick={handleSetupTimezone}
                                disabled={!tempSelectedOffset || isSaving}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                {isSaving ? 'Setting...' : 'Set Timezone'}
                            </button>
                            <button
                                onClick={() => setIsTimezoneDialogOpen(false)}
                                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Time Slot Dialog */}
            {isDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl max-w-md w-full p-6">
                        <h3 className="text-xl font-bold mb-4">
                            {editingSlot ? 'Edit' : 'Add'} Time Slot - {selectedDay}
                        </h3>
                        <div className="space-y-4">
                            <select
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg"
                            >
                                <option value="">Start time</option>
                                {HOURS.map((hour) => (
                                    <option key={hour} value={hour}>{hour}</option>
                                ))}
                            </select>
                            <select
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg"
                            >
                                <option value="">End time</option>
                                {HOURS.map((hour) => (
                                    <option key={hour} value={hour}>{hour}</option>
                                ))}
                            </select>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleSaveSlot}
                                    disabled={!startTime || !endTime || isSaving}
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {isSaving ? 'Saving...' : 'Save'}
                                </button>
                                <button
                                    onClick={() => setIsDialogOpen(false)}
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Service Dialog */}
            {isServiceDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl max-w-md w-full p-6">
                        <h3 className="text-xl font-bold mb-4">
                            {editingService ? 'Edit' : 'Add'} Service
                        </h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                value={serviceForm.category}
                                onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                                placeholder="Service category"
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                            <textarea
                                value={serviceForm.description}
                                onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                                placeholder="Description"
                                rows="3"
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                            <input
                                type="number"
                                value={serviceForm.price}
                                onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                                placeholder="Price per hour"
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                            <div className="flex gap-3">
                                <button
                                    onClick={handleServiceSubmit}
                                    disabled={!serviceForm.category || !serviceForm.price || isSaving}
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {isSaving ? 'Saving...' : 'Save'}
                                </button>
                                <button
                                    onClick={() => setIsServiceDialogOpen(false)}
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TimezoneServices;