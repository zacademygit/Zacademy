// src/components/mentor/TimezoneServices.jsx

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { AlertCircle } from 'lucide-react'

const TimezoneServices = ({ api }) => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingServices, setIsEditingServices] = useState(false);
    const [savingServices, setSavingServices] = useState(false);

    // Section collapse states - all collapsed by default
    const [isDocumentsExpanded, setIsDocumentsExpanded] = useState(false);
    const [isTimesExpanded, setIsTimesExpanded] = useState(false);
    const [isServicesExpanded, setIsServicesExpanded] = useState(false);
    const [isPaymentExpanded, setIsPaymentExpanded] = useState(false);

    // Document confirmation state
    const [documentStatus, setDocumentStatus] = useState(null);
    const [selectedDocumentType, setSelectedDocumentType] = useState('');
    const [confirmingDocument, setConfirmingDocument] = useState(false);
    const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);

    // Send application state
    const [sendingApplication, setSendingApplication] = useState(false);

    // Payment information state
    const [paymentInfo, setPaymentInfo] = useState({
        identificationNumber: '',
        address: '',
        bank: '',
        bankRtgsCode: '',
        bankAccountNumber: ''
    });
    const [originalPaymentInfo, setOriginalPaymentInfo] = useState({
        identificationNumber: '',
        address: '',
        bank: '',
        bankRtgsCode: '',
        bankAccountNumber: ''
    });
    const [isEditingPayment, setIsEditingPayment] = useState(false);
    const [savingPayment, setSavingPayment] = useState(false);
    const [showOtherBankInput, setShowOtherBankInput] = useState(false);

    const [timezone, setTimezone] = useState('');
    const [schedule, setSchedule] = useState({
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: []
    });

    // Initialize with default service
    const defaultService = {
        mentorshipService: 'Profession Introduction Session',
        mentorSessionPrice: 0
    };

    const [services, setServices] = useState([defaultService]);
    const [originalServices, setOriginalServices] = useState([defaultService]);

    const [originalData, setOriginalData] = useState({ timezone: '', schedule: {} });

    // Fee percentages - dynamic based on document type
    const getFeePercentages = () => {
        if (selectedDocumentType === 'individual_entrepreneur') {
            return {
                platformFee: 15,
                taxes: 0
            };
        } else if (selectedDocumentType === 'private_individual') {
            return {
                platformFee: 14,
                taxes: 26
            };
        }
        // Default fallback
        return {
            platformFee: 14,
            taxes: 26
        };
    };

    // Common timezones list
    const timezones = [
        { value: 'America/New_York', label: 'Eastern Time (ET)' },
        { value: 'America/Chicago', label: 'Central Time (CT)' },
        { value: 'America/Denver', label: 'Mountain Time (MT)' },
        { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
        { value: 'Europe/London', label: 'London (GMT/BST)' },
        { value: 'Europe/Paris', label: 'Paris (CET/CEST)' },
        { value: 'Europe/Berlin', label: 'Berlin (CET/CEST)' },
        { value: 'Europe/Istanbul', label: 'Istanbul (TRT)' },
        { value: 'Asia/Dubai', label: 'Dubai (GST)' },
        { value: 'Asia/Tbilisi', label: 'Tbilisi (GET)' },
        { value: 'Asia/Kolkata', label: 'India (IST)' },
        { value: 'Asia/Shanghai', label: 'Shanghai (CST)' },
        { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
        { value: 'Australia/Sydney', label: 'Sydney (AEDT/AEST)' },
    ];

    // Fetch availability and services data
    useEffect(() => {
        fetchDocumentStatus();
        fetchAvailability();
        fetchServices();
        fetchPaymentInfo();
    }, []);

    const fetchDocumentStatus = async () => {
        try {
            const response = await api.get('/mentor/document-status');
            if (response.data.success) {
                setDocumentStatus(response.data);
                if (response.data.hasConfirmed) {
                    setSelectedDocumentType(response.data.documentConfirmation.documentType);
                }
            }
        } catch (err) {
            console.error('Failed to load document status:', err);
        }
    };

    const fetchAvailability = async () => {
        setLoading(true);
        try {
            const response = await api.get('/mentor/availability');

            if (response.data.success) {
                const { timezone: tz, schedule: sched, requiresTimezone } = response.data;

                setTimezone(tz || '');
                setSchedule(sched);
                setOriginalData({ timezone: tz || '', schedule: sched });

                // If no timezone set, automatically enter edit mode
                if (requiresTimezone) {
                    setIsEditing(true);
                }
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to load availability');
        } finally {
            setLoading(false);
        }
    };

    // Add time slot to a day
    const addTimeSlot = (day) => {
        const newSlot = {
            id: `${day.toLowerCase()}-${Date.now()}`,
            startTime: '09:00',
            endTime: '17:00'
        };

        setSchedule(prev => ({
            ...prev,
            [day]: [...prev[day], newSlot]
        }));
    };

    // Remove time slot from a day
    const removeTimeSlot = (day, slotId) => {
        setSchedule(prev => ({
            ...prev,
            [day]: prev[day].filter(slot => slot.id !== slotId)
        }));
    };

    // Update time slot
    const updateTimeSlot = (day, slotId, field, value) => {
        setSchedule(prev => ({
            ...prev,
            [day]: prev[day].map(slot =>
                slot.id === slotId
                    ? { ...slot, [field]: value }
                    : slot
            )
        }));
    };

    // Check if there are unsaved changes
    const hasChanges = () => {
        if (timezone !== originalData.timezone) return true;

        // Check if schedules are different
        const days = Object.keys(schedule);
        for (const day of days) {
            const current = schedule[day];
            const original = originalData.schedule[day] || [];

            if (current.length !== original.length) return true;

            for (let i = 0; i < current.length; i++) {
                if (current[i].startTime !== original[i].startTime ||
                    current[i].endTime !== original[i].endTime) {
                    return true;
                }
            }
        }

        return false;
    };

    // Validate schedule before saving
    const validateSchedule = () => {
        // Check timezone is selected
        if (!timezone) {
            toast.error('Please select your timezone');
            return false;
        }

        // Check if at least one time slot is added
        const hasSlots = Object.values(schedule).some(slots => slots.length > 0);
        if (!hasSlots) {
            toast.error('Please add at least one available time slot');
            return false;
        }

        // Validate each time slot
        for (const [day, slots] of Object.entries(schedule)) {
            for (const slot of slots) {
                // Check if start time is before end time
                if (slot.startTime >= slot.endTime) {
                    toast.error(`Invalid time slot on ${day}: start time must be before end time`);
                    return false;
                }

                // Check time format (HH:MM)
                const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
                if (!timeRegex.test(slot.startTime) || !timeRegex.test(slot.endTime)) {
                    toast.error(`Invalid time format on ${day}`);
                    return false;
                }
            }

            // Check for overlapping slots
            const sortedSlots = [...slots].sort((a, b) =>
                a.startTime.localeCompare(b.startTime)
            );

            for (let i = 0; i < sortedSlots.length - 1; i++) {
                if (sortedSlots[i].endTime > sortedSlots[i + 1].startTime) {
                    toast.error(`Overlapping time slots detected on ${day}`);
                    return false;
                }
            }
        }

        return true;
    };

    // Save availability
    const handleSave = async () => {
        if (!validateSchedule()) {
            return;
        }

        setSaving(true);
        try {
            // Convert frontend format to backend format
            const backendSchedule = {};
            Object.keys(schedule).forEach(day => {
                const dayLower = day.toLowerCase();
                backendSchedule[dayLower] = schedule[day].map(slot => ({
                    start: slot.startTime,
                    end: slot.endTime
                }));
            });

            const response = await api.put('/mentor/availability', {
                timezone,
                schedule: backendSchedule
            });

            if (response.data.success) {
                toast.success('Availability saved successfully');
                setOriginalData({ timezone, schedule });
                setIsEditing(false);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to save availability');
        } finally {
            setSaving(false);
        }
    };

    // Cancel editing
    const handleCancel = () => {
        if (hasChanges()) {
            const confirmCancel = window.confirm(
                'You have unsaved changes. Are you sure you want to cancel?'
            );
            if (!confirmCancel) return;
        }

        setTimezone(originalData.timezone);
        setSchedule(originalData.schedule);
        setIsEditing(false);
    };

    // Fetch services
    const fetchServices = async () => {
        try {
            const response = await api.get('/mentor/services');

            if (response.data.success) {
                const fetchedServices = response.data.data;

                // If services exist in database, use them; otherwise keep default
                if (fetchedServices.length > 0) {
                    setServices(fetchedServices);
                    setOriginalServices(fetchedServices);
                }
                // If no services in database, default service is already initialized in state
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to load services');
            // On error, keep the default service that was initialized
        }
    };

    // Update service price
    const updateServicePrice = (index, price) => {
        const updatedServices = [...services];
        // Ensure price is a valid integer
        const parsedPrice = parseInt(price, 10);
        updatedServices[index].mentorSessionPrice = isNaN(parsedPrice) ? 0 : parsedPrice;
        setServices(updatedServices);
    };

    // Calculate all fees and total price
    const calculatePricing = (mentorSessionPrice) => {
        const feePercentages = getFeePercentages();
        const platformFee = Math.round(mentorSessionPrice * (feePercentages.platformFee / 100));
        const taxesFee = Math.round(mentorSessionPrice * (feePercentages.taxes / 100));
        const totalPrice = mentorSessionPrice + platformFee + taxesFee;

        return {
            platformFee,
            taxesFee,
            totalPrice
        };
    };

    // Save services
    const handleSaveServices = async () => {
        // Validate prices
        for (const service of services) {
            if (!service.mentorSessionPrice || service.mentorSessionPrice <= 0) {
                toast.error('Please set a valid price for all services');
                return;
            }
        }

        // Calculate fees for each service before sending to backend
        const servicesWithFees = services.map(service => {
            const pricing = calculatePricing(service.mentorSessionPrice);
            return {
                mentorshipService: service.mentorshipService,
                mentorSessionPrice: service.mentorSessionPrice,
                platformFee: pricing.platformFee,
                taxesFee: pricing.taxesFee,
                totalPrice: pricing.totalPrice
            };
        });

        setSavingServices(true);
        try {
            const response = await api.put('/mentor/services', { services: servicesWithFees });

            if (response.data.success) {
                toast.success('Services saved successfully');
                setOriginalServices(services);
                setIsEditingServices(false);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to save services');
        } finally {
            setSavingServices(false);
        }
    };

    // Cancel editing services
    const handleCancelServices = () => {
        setServices(originalServices);
        setIsEditingServices(false);
    };

    // Fetch payment information
    const fetchPaymentInfo = async () => {
        try {
            const response = await api.get('/mentor/payment-info');

            if (response.data.success) {
                const info = {
                    identificationNumber: response.data.identificationNumber || '',
                    address: response.data.address || '',
                    bank: response.data.bank || '',
                    bankRtgsCode: response.data.bankRtgsCode || '',
                    bankAccountNumber: response.data.bankAccountNumber || ''
                };
                setPaymentInfo(info);
                setOriginalPaymentInfo(info);

                // Check if "Other" bank is selected
                const predefinedBanks = ['TBC Bank', 'Bank of Georgia', 'Liberty Bank', 'Credo Bank', 'Procredit Bank'];
                if (info.bank && !predefinedBanks.includes(info.bank)) {
                    setShowOtherBankInput(true);
                }
            }
        } catch (err) {
            console.error('Failed to load payment info:', err);
            // Don't show error toast, payment info might not exist yet
        }
    };

    // Save payment information
    const handleSavePayment = async () => {
        // Validate all required fields
        if (!paymentInfo.identificationNumber || paymentInfo.identificationNumber.trim() === '') {
            toast.error('Please enter your identification number');
            return;
        }

        if (!paymentInfo.address || paymentInfo.address.trim() === '') {
            toast.error('Please enter your address');
            return;
        }

        if (!paymentInfo.bank || paymentInfo.bank.trim() === '') {
            toast.error('Please select a bank');
            return;
        }

        if (!paymentInfo.bankRtgsCode || paymentInfo.bankRtgsCode.trim() === '') {
            toast.error('Please enter the bank RTGS code');
            return;
        }

        if (!paymentInfo.bankAccountNumber || paymentInfo.bankAccountNumber.trim() === '') {
            toast.error('Please enter your bank account number');
            return;
        }

        setSavingPayment(true);
        try {
            const response = await api.put('/mentor/payment-info', {
                identificationNumber: paymentInfo.identificationNumber.trim(),
                address: paymentInfo.address.trim(),
                bank: paymentInfo.bank.trim(),
                bankRtgsCode: paymentInfo.bankRtgsCode.trim(),
                bankAccountNumber: paymentInfo.bankAccountNumber.trim()
            });

            if (response.data.success) {
                toast.success('Payment information saved successfully');
                setOriginalPaymentInfo({
                    identificationNumber: paymentInfo.identificationNumber.trim(),
                    address: paymentInfo.address.trim(),
                    bank: paymentInfo.bank.trim(),
                    bankRtgsCode: paymentInfo.bankRtgsCode.trim(),
                    bankAccountNumber: paymentInfo.bankAccountNumber.trim()
                });
                setIsEditingPayment(false);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to save payment information');
        } finally {
            setSavingPayment(false);
        }
    };

    // Cancel editing payment
    const handleCancelPayment = () => {
        setPaymentInfo(originalPaymentInfo);
        setIsEditingPayment(false);

        // Reset "Other" bank input visibility
        const predefinedBanks = ['TBC Bank', 'Bank of Georgia', 'Liberty Bank', 'Credo Bank', 'Procredit Bank'];
        if (originalPaymentInfo.bank && !predefinedBanks.includes(originalPaymentInfo.bank)) {
            setShowOtherBankInput(true);
        } else {
            setShowOtherBankInput(false);
        }
    };

    // Handle payment info input changes
    const handlePaymentInfoChange = (field, value) => {
        setPaymentInfo(prev => ({
            ...prev,
            [field]: value
        }));

        // Handle bank selection
        if (field === 'bank') {
            if (value === 'Other') {
                setShowOtherBankInput(true);
                setPaymentInfo(prev => ({ ...prev, bank: '' }));
            } else {
                setShowOtherBankInput(false);
                setPaymentInfo(prev => ({ ...prev, bank: value }));
            }
        }
    };

    // Handle document confirmation
    const handleConfirmDocument = async () => {
        if (!selectedDocumentType) {
            toast.error('Please select a document type');
            return;
        }

        setConfirmingDocument(true);
        try {
            const response = await api.post('/mentor/confirm-document', {
                documentType: selectedDocumentType
            });

            if (response.data.success) {
                toast.success('Document confirmed successfully!');
                // Refresh document status
                await fetchDocumentStatus();
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to confirm document');
        } finally {
            setConfirmingDocument(false);
        }
    };

    // Check if application is ready to send
    const isApplicationReady = () => {
        // Must have confirmed documents
        if (!documentStatus || !documentStatus.hasConfirmed) {
            return false;
        }

        // Must have set timezone
        if (!timezone) {
            return false;
        }

        // Must have at least one time slot
        const hasTimeSlots = Object.values(schedule).some(slots => slots.length > 0);
        if (!hasTimeSlots) {
            return false;
        }

        // Must have set service price
        if (!services || services.length === 0 || !services[0].mentorSessionPrice || services[0].mentorSessionPrice <= 0) {
            return false;
        }

        // Must have completed all payment information
        if (!paymentInfo.identificationNumber || paymentInfo.identificationNumber.trim() === '' ||
            !paymentInfo.address || paymentInfo.address.trim() === '' ||
            !paymentInfo.bank || paymentInfo.bank.trim() === '' ||
            !paymentInfo.bankRtgsCode || paymentInfo.bankRtgsCode.trim() === '' ||
            !paymentInfo.bankAccountNumber || paymentInfo.bankAccountNumber.trim() === '') {
            return false;
        }

        return true;
    };

    // Handle send application
    const handleSendApplication = async () => {
        if (!isApplicationReady()) {
            toast.error('Please complete all required sections before sending your application');
            return;
        }

        setSendingApplication(true);
        try {
            const response = await api.post('/mentor/send-application');

            if (response.data.success) {
                toast.success(response.data.message || 'Application sent successfully! We will review it within 24 hours.');

                // Optionally refresh data
                await fetchDocumentStatus();
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to send application. Please try again.');
        } finally {
            setSendingApplication(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // Collapsible Section Header Component
    const SectionHeader = ({ title, isExpanded, onToggle, badge }) => (
        <button
            onClick={onToggle}
            className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 transition-colors"
        >
            <div className="flex items-center gap-3">
                <h2 className="text-base font-normal text-gray-900">{title}</h2>
                {badge && (
                    <span className="px-2 py-0.5 bg-[#FA8AFF] text-white text-xs font-medium rounded">
                        {badge}
                    </span>
                )}
            </div>
            <svg
                className={`w-5 h-5 text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </button>
    );

    return (
        <div className="max-w-5xl mx-auto p-8">
            {/* ============ INFO MESSAGE FOR PENDING APPLICATIONS ============ */}
            {documentStatus && documentStatus.applicationStatus === 'pending' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex gap-3">
                    <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-blue-900">
                        Please fill out <span className="font-medium">available times</span>, <span className="font-medium">services</span>, and <span className="font-medium">confirm documents</span>.
                        Once completed, click <span className="font-medium">"Send Application"</span> and we'll review it in 24-48 hours.
                        You'll receive update information on your dashboard and via email.
                    </p>
                </div>
            )}

            <div className="space-y-4 mb-8">

                {/* ============ DOCUMENTS SECTION ============ */}
                {documentStatus && documentStatus.applicationStatus === 'pending' && (
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <SectionHeader
                            title="Documents"
                            isExpanded={isDocumentsExpanded}
                            onToggle={() => setIsDocumentsExpanded(!isDocumentsExpanded)}
                            badge={!documentStatus.hasConfirmed ? 'Action Required' : null}
                        />

                        {isDocumentsExpanded && (
                            <div className="px-6 py-6 border-t border-gray-200">
                                <div className={`border-l-4 p-6 rounded-lg ${documentStatus.hasConfirmed ? 'bg-green-50 border-green-400' : 'bg-yellow-50 border-yellow-400'}`}>
                                    <div className="flex items-start mb-4">
                                        <svg className={`w-6 h-6 mt-0.5 mr-3 ${documentStatus.hasConfirmed ? 'text-green-600' : 'text-yellow-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            {documentStatus.hasConfirmed ? (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            ) : (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            )}
                                        </svg>
                                        <div>
                                            <h3 className={`text-lg font-semibold mb-1 ${documentStatus.hasConfirmed ? 'text-green-800' : 'text-yellow-800'}`}>
                                                {documentStatus.hasConfirmed ? 'Document Confirmed' : 'Document Confirmation Required'}
                                            </h3>
                                            <p className={`text-sm ${documentStatus.hasConfirmed ? 'text-green-700' : 'text-yellow-700'}`}>
                                                {documentStatus.hasConfirmed
                                                    ? 'You have confirmed your legal status. Your application is now under review.'
                                                    : 'Please select your legal status and confirm the terms before your application can be reviewed.'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg p-6 mt-4">
                                        <h4 className="font-medium text-gray-900 mb-4">
                                            Your Legal Status
                                            {documentStatus.hasConfirmed && (
                                                <span className="ml-2 px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                                    Confirmed
                                                </span>
                                            )}
                                        </h4>

                                        {/* Radio buttons */}
                                        <div className="space-y-3 mb-6">
                                            <label className={`flex items-start p-4 border-2 rounded-lg ${documentStatus.hasConfirmed ? 'cursor-not-allowed opacity-75' : 'cursor-pointer hover:bg-gray-50'} transition`}>
                                                <input
                                                    type="radio"
                                                    name="documentType"
                                                    value="individual_entrepreneur"
                                                    checked={selectedDocumentType === 'individual_entrepreneur'}
                                                    onChange={(e) => setSelectedDocumentType(e.target.value)}
                                                    disabled={documentStatus.hasConfirmed}
                                                    className="mt-1 mr-3"
                                                />
                                                <div>
                                                    <div className="font-medium text-gray-900">Individual Entrepreneur</div>
                                                    <div className="text-sm text-gray-600">Registered as an individual entrepreneur</div>
                                                </div>
                                            </label>

                                            <label className={`flex items-start p-4 border-2 rounded-lg ${documentStatus.hasConfirmed ? 'cursor-not-allowed opacity-75' : 'cursor-pointer hover:bg-gray-50'} transition`}>
                                                <input
                                                    type="radio"
                                                    name="documentType"
                                                    value="private_individual"
                                                    checked={selectedDocumentType === 'private_individual'}
                                                    onChange={(e) => setSelectedDocumentType(e.target.value)}
                                                    disabled={documentStatus.hasConfirmed}
                                                    className="mt-1 mr-3"
                                                />
                                                <div>
                                                    <div className="font-medium text-gray-900">Private Individual</div>
                                                    <div className="text-sm text-gray-600">Operating as a private individual</div>
                                                </div>
                                            </label>
                                        </div>

                                        {/* Preview Document Button */}
                                        {selectedDocumentType && (
                                            <div className="mb-6">
                                                <button
                                                    onClick={() => setIsDocumentModalOpen(true)}
                                                    className="w-full px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium flex items-center justify-center gap-2"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    Preview Document
                                                </button>
                                            </div>
                                        )}

                                        {/* Submit button - only show if not confirmed */}
                                        {!documentStatus.hasConfirmed && (
                                            <>
                                                <button
                                                    onClick={handleConfirmDocument}
                                                    disabled={!selectedDocumentType || confirmingDocument}
                                                    className="w-full px-6 py-2.5 bg-[#FA8AFF] text-white rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                                                >
                                                    {confirmingDocument ? 'Confirming...' : 'Confirm Document Type'}
                                                </button>

                                                <p className="text-xs text-gray-500 mt-3 text-center">
                                                    Note: Once confirmed, you cannot change your selection. Please contact support if you need to make changes.
                                                </p>
                                            </>
                                        )}

                                        {/* Show note if confirmed */}
                                        {documentStatus.hasConfirmed && (
                                            <p className="text-xs text-gray-500 text-center">
                                                Your document type has been confirmed. Please contact support if you need to make changes.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* ============ TIMES SECTION ============ */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <SectionHeader
                        title="Times & Availability"
                        isExpanded={isTimesExpanded}
                        onToggle={() => setIsTimesExpanded(!isTimesExpanded)}
                    />

                    {isTimesExpanded && (
                        <div className="px-6 py-6 border-t border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-4 py-2 bg-[#FA8AFF] text-white rounded-lg hover:opacity-90 transition flex items-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit Schedule
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleSave}
                                            disabled={saving || !hasChanges()}
                                            className="px-4 py-2 bg-[#FA8AFF] text-white rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {saving ? 'Saving...' : 'Save Changes'}
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            disabled={saving}
                                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6">
                                {/* Timezone Selection */}
                                <div>
                                    <label className="block text-sm text-gray-700 mb-2">
                                        Your Timezone <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={timezone}
                                        onChange={(e) => setTimezone(e.target.value)}
                                        disabled={!isEditing}
                                        className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#FA8AFF] ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                            }`}
                                    >
                                        <option value="">Select your timezone</option>
                                        {timezones.map(tz => (
                                            <option key={tz.value} value={tz.value}>
                                                {tz.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Weekly Schedule */}
                                <div>
                                    <h4 className="text-sm text-gray-900 mb-4">Weekly Schedule</h4>
                                    <p className="text-xs text-gray-500 mb-4">
                                        Add time slots for each day when you're available to meet with students
                                    </p>

                                    <div className="space-y-3">
                                        {Object.keys(schedule).map(day => (
                                            <div key={day} className="py-3 border-b border-gray-100 last:border-0">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm text-gray-900">{day}</span>
                                                    {isEditing && (
                                                        <button
                                                            onClick={() => addTimeSlot(day)}
                                                            className="text-sm text-[#FA8AFF] hover:text-[#FA8AFF]/80"
                                                        >
                                                            + Add Time Slot
                                                        </button>
                                                    )}
                                                </div>
                                                {schedule[day].length === 0 ? (
                                                    <p className="text-xs text-gray-500">No time slots yet</p>
                                                ) : (
                                                    <div className="space-y-2">
                                                        {schedule[day].map((slot) => (
                                                            <div key={slot.id} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                                                                {isEditing ? (
                                                                    <>
                                                                        <div className="flex items-center gap-2 flex-1">
                                                                            <input
                                                                                type="time"
                                                                                value={slot.startTime}
                                                                                onChange={(e) => updateTimeSlot(day, slot.id, 'startTime', e.target.value)}
                                                                                className="px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#FA8AFF] bg-white"
                                                                            />
                                                                            <span className="text-xs text-gray-500">-</span>
                                                                            <input
                                                                                type="time"
                                                                                value={slot.endTime}
                                                                                onChange={(e) => updateTimeSlot(day, slot.id, 'endTime', e.target.value)}
                                                                                className="px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#FA8AFF] bg-white"
                                                                            />
                                                                        </div>
                                                                        <button
                                                                            onClick={() => removeTimeSlot(day, slot.id)}
                                                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                                                        >
                                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                            </svg>
                                                                        </button>
                                                                    </>
                                                                ) : (
                                                                    <span className="text-xs text-gray-700">{slot.startTime} - {slot.endTime}</span>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* ============ PAYMENT SECTION ============ */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <SectionHeader
                        title="Payment Information"
                        isExpanded={isPaymentExpanded}
                        onToggle={() => setIsPaymentExpanded(!isPaymentExpanded)}
                    />

                    {isPaymentExpanded && (
                        <div className="px-6 py-6 border-t border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                                {!isEditingPayment ? (
                                    <button
                                        onClick={() => setIsEditingPayment(true)}
                                        className="px-4 py-2 bg-[#FA8AFF] text-white rounded-lg hover:opacity-90 transition flex items-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit Payment Info
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleSavePayment}
                                            disabled={savingPayment}
                                            className="px-4 py-2 bg-[#FA8AFF] text-white rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {savingPayment ? 'Saving...' : 'Save Changes'}
                                        </button>
                                        <button
                                            onClick={handleCancelPayment}
                                            disabled={savingPayment}
                                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Payment Info Instructions */}
                            {/* <div className="mb-6 p-5 bg-blue-50 rounded-lg border border-blue-100"> */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3 mb-4">
                                <AlertCircle size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                                <div className='text-left'>
                                    <p className="text-sm text-blue-900 mb-1">გადახდის ინფორმაცია</p>
                                    <p className="text-xs text-blue-800">
                                        დაამატეთ თქვენი ბანკის დეტალები, რათა მიიღოთ გადახდები სტუდენტებისგან. ყველა ინფორმაცია დაშიფრული და უსაფრთხოა.
                                    </p>
                                </div>
                            </div>
                            {/* </div> */}

                            <div className="space-y-6 text-left">
                                {/* Identification Number & Address - 2 column grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Identification Number <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={paymentInfo.identificationNumber}
                                            onChange={(e) => handlePaymentInfoChange('identificationNumber', e.target.value)}
                                            disabled={!isEditingPayment}
                                            placeholder="e.g., 01001234567"
                                            className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#FA8AFF] ${!isEditingPayment ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                                }`}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={paymentInfo.address}
                                            onChange={(e) => handlePaymentInfoChange('address', e.target.value)}
                                            disabled={!isEditingPayment}
                                            placeholder="e.g., Tbilisi, Rustaveli 15"
                                            className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#FA8AFF] ${!isEditingPayment ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                                }`}
                                        />
                                    </div>
                                </div>

                                {/* Bank Dropdown */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Select Bank <span className="text-red-500">*</span>
                                    </label>
                                    {!showOtherBankInput ? (
                                        <select
                                            value={paymentInfo.bank}
                                            onChange={(e) => handlePaymentInfoChange('bank', e.target.value)}
                                            disabled={!isEditingPayment}
                                            className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#FA8AFF] ${!isEditingPayment ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                                }`}
                                        >
                                            <option value="">Select your bank</option>
                                            <option value="TBC Bank">TBC Bank</option>
                                            <option value="Bank of Georgia">Bank of Georgia</option>
                                            <option value="Liberty Bank">Liberty Bank</option>
                                            <option value="Credo Bank">Credo Bank</option>
                                            <option value="Procredit Bank">Procredit Bank</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    ) : (
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                value={paymentInfo.bank}
                                                onChange={(e) => handlePaymentInfoChange('bank', e.target.value)}
                                                disabled={!isEditingPayment}
                                                placeholder="Enter your bank name"
                                                className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#FA8AFF] ${!isEditingPayment ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                                    }`}
                                            />
                                            {isEditingPayment && (
                                                <button
                                                    onClick={() => {
                                                        setShowOtherBankInput(false);
                                                        setPaymentInfo(prev => ({ ...prev, bank: '' }));
                                                    }}
                                                    className="text-sm text-[#FA8AFF] hover:opacity-80"
                                                >
                                                    ← Back to bank selection
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Bank RTGS Code */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        RTGS Code <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={paymentInfo.bankRtgsCode}
                                        onChange={(e) => handlePaymentInfoChange('bankRtgsCode', e.target.value)}
                                        disabled={!isEditingPayment}
                                        placeholder="e.g., TBCBGE22"
                                        className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#FA8AFF] ${!isEditingPayment ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                            }`}
                                    />
                                    <p className="text-left text-xs text-gray-500 mt-2">
                                        Find your bank's RTGS code at{' '}
                                        <a
                                            href="https://nbg.gov.ge/payment-system/iban"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#FA8AFF] hover:opacity-80 underline"
                                        >
                                            nbg.gov.ge/payment-system/iban
                                        </a>
                                    </p>
                                </div>

                                {/* Bank Account Number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Bank Account Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={paymentInfo.bankAccountNumber}
                                        onChange={(e) => handlePaymentInfoChange('bankAccountNumber', e.target.value)}
                                        disabled={!isEditingPayment}
                                        placeholder="GE00TB0000000000000000"
                                        className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#FA8AFF] ${!isEditingPayment ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
                                            }`}
                                    />
                                    {paymentInfo.bankAccountNumber && (
                                        <p className="text-xs text-gray-500 mt-2">
                                            Make sure your bank account number is correct. Payments will be sent to this account.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* ============ SERVICES SECTION ============ */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <SectionHeader
                        title="Services & Pricing"
                        isExpanded={isServicesExpanded}
                        onToggle={() => setIsServicesExpanded(!isServicesExpanded)}
                    />

                    {isServicesExpanded && (
                        <div className="px-6 py-6 border-t border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                                {!isEditingServices ? (
                                    <button
                                        onClick={() => setIsEditingServices(true)}
                                        className="px-4 py-2 bg-[#FA8AFF] text-white rounded-lg hover:opacity-90 transition flex items-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit Services
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleSaveServices}
                                            disabled={savingServices}
                                            className="px-4 py-2 bg-[#FA8AFF] text-white rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {savingServices ? 'Saving...' : 'Save Changes'}
                                        </button>
                                        <button
                                            onClick={handleCancelServices}
                                            disabled={savingServices}
                                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Service Description */}
                            <div className="mb-6 p-5 bg-blue-50 rounded-lg border border-blue-100">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 mt-1">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            1. Profession Introduction Session & Ask Me Anything
                                        </h3>
                                        <p className="text-sm text-gray-700 mb-3">
                                            A short, structured session where the mentor:
                                        </p>
                                        <ul className="space-y-2 text-sm text-gray-700">
                                            <li className="flex items-start gap-2">
                                                <span className="text-blue-600 mt-0.5">•</span>
                                                <span>Explains what their job actually looks like</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-blue-600 mt-0.5">•</span>
                                                <span>Breaks down day-to-day tasks</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-blue-600 mt-0.5">•</span>
                                                <span>Talks about required skills, education, and personality traits</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-blue-600 mt-0.5">•</span>
                                                <span>Shares real examples from their work</span>
                                            </li>
                                        </ul>
                                        <p className="text-sm font-medium text-blue-900 mt-3">
                                            <span className="font-semibold">Purpose:</span> Give the student a realistic understanding of the profession.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Services Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b-2 border-gray-200">
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Service</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Your Session Price</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Platform Fee ({getFeePercentages().platformFee}%)</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Taxes ({getFeePercentages().taxes}%)</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Student Pays (Total)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {services.map((service, index) => {
                                            const pricing = calculatePricing(service.mentorSessionPrice || 0);
                                            return (
                                                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                                    <td className="py-4 px-4">
                                                        <div className="font-medium text-gray-900">{service.mentorshipService}</div>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        {isEditingServices ? (
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-gray-600">₾</span>
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    step="1"
                                                                    value={service.mentorSessionPrice || ''}
                                                                    onChange={(e) => updateServicePrice(index, e.target.value)}
                                                                    className="w-32 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                    placeholder="0"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <span className="text-gray-900 font-medium">₾{service.mentorSessionPrice || 0}</span>
                                                        )}
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <span className="text-gray-600">₾{pricing.platformFee}</span>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <span className="text-gray-600">₾{pricing.taxesFee}</span>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <span className="text-green-600 font-semibold text-lg">
                                                            ₾{pricing.totalPrice}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Info Box */}
                            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-gray-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div className="text-sm text-gray-700">
                                        <p className="font-medium mb-1">Pricing Information:</p>
                                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                                            <li>Set your base session price (what you'll receive)</li>
                                            {getFeePercentages().taxes > 0 ? (
                                                <li>Platform fee ({getFeePercentages().platformFee}%) and taxes ({getFeePercentages().taxes}%) are added for students</li>
                                            ) : (
                                                <li>Platform fee ({getFeePercentages().platformFee}%) is added for students (no taxes for individual entrepreneurs)</li>
                                            )}
                                            <li>Students pay the total: your price + platform fee{getFeePercentages().taxes > 0 ? ' + taxes' : ''}</li>
                                            <li>All prices are in GEL (₾) and must be whole numbers</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>

            {/* ============ SEND APPLICATION BUTTON ============ */}
            {documentStatus && documentStatus.applicationStatus === 'pending' && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Ready to Submit Your Application?</h3>
                        <p className="text-sm text-gray-600 mb-6">
                            Make sure you've completed all sections: documents, availability times, and service pricing.
                        </p>

                        {!isApplicationReady() && (
                            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <p className="text-sm text-yellow-800">
                                    <span className="font-medium">Incomplete:</span> Please complete the following:
                                </p>
                                <ul className="text-sm text-yellow-700 mt-2 space-y-1 text-left list-disc list-inside">
                                    {!documentStatus?.hasConfirmed && <li>Confirm your document type</li>}
                                    {!timezone && <li>Set your timezone</li>}
                                    {!Object.values(schedule).some(slots => slots.length > 0) && <li>Add at least one available time slot</li>}
                                    {(!services || services.length === 0 || !services[0].mentorSessionPrice || services[0].mentorSessionPrice <= 0) && <li>Set your service pricing</li>}
                                    {(!paymentInfo.identificationNumber || paymentInfo.identificationNumber.trim() === '') && <li>Add your identification number</li>}
                                    {(!paymentInfo.address || paymentInfo.address.trim() === '') && <li>Add your address</li>}
                                    {(!paymentInfo.bank || paymentInfo.bank.trim() === '') && <li>Select your bank</li>}
                                    {(!paymentInfo.bankRtgsCode || paymentInfo.bankRtgsCode.trim() === '') && <li>Add your bank RTGS code</li>}
                                    {(!paymentInfo.bankAccountNumber || paymentInfo.bankAccountNumber.trim() === '') && <li>Add your bank account number</li>}
                                </ul>
                            </div>
                        )}

                        <button
                            onClick={handleSendApplication}
                            disabled={!isApplicationReady() || sendingApplication}
                            className="w-full px-6 py-3 bg-[#FA8AFF] text-white rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {sendingApplication ? 'Sending...' : 'Send Application'}
                        </button>

                        {isApplicationReady() && (
                            <p className="text-xs text-gray-500 mt-4">
                                By sending your application, you confirm that all information provided is accurate.
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* Document Preview Modal */}
            {isDocumentModalOpen && (
                <div className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white h-full rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b">
                            <h3 className="text-xl font-semibold text-gray-900">Document Preview</h3>
                            <button
                                onClick={() => setIsDocumentModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="flex-1 overflow-hidden">
                            <iframe
                                className="h-full w-full"
                                src={`https://jjcnyzuuqwcsjbznjknn.supabase.co/storage/v1/object/public/Documents/forma100.pdf`}
                                title="Document Preview"
                            />
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
                            <button
                                onClick={() => setIsDocumentModalOpen(false)}
                                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TimezoneServices;
