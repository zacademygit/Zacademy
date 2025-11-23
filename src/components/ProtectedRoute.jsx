// src/components/ProtectedRoute.jsx

import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { user, loading } = useAuth();
    console.log('protexteduser', user)
    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    // Check if user has the required role (if roles are specified)
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.userType)) {
        // Redirect to appropriate dashboard based on user role
        if (user.userType === 'mentor') {
            return <Navigate to="/mentor-dashboard" replace />;
        } else if (user.userType === 'student') {
            return <Navigate to="/student-dashboard" replace />;
        } else {
            return <Navigate to="/" replace />;
        }
    }

    // User is authenticated and authorized
    return children;
};

export default ProtectedRoute;