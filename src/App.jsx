// src/App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { LanguageProvider } from './contexts/LanguageContext';
// Public Pages
import Index from './pages/Index';
import About from './pages/About';
import Mentors from './pages/Mentors';
import MentorProfile from './pages/MentorProfile';
import BecomeMentor from './pages/BecomeMentor';
import Blogs from './pages/Blogs';
import FAQ from './pages/FAQ';
import Support from './pages/Support';

// Auth Pages
import Auth from './pages/Auth';
import Login from './pages/Login';
import Register from './pages/RegisterStudent';
import RegisterStudent from './pages/RegisterStudent';
import RegisterMentor from './pages/RegisterMentor';

// Dashboard Pages
import MentorDashboard from './pages/MentorDashboard';
import StudentDashboard from './pages/StudentDashboard';

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            {/* Auth Routes - No Layout wrapper */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/register/student" element={<RegisterStudent />} />
            <Route path="/auth/register/mentor" element={<RegisterMentor />} />

            {/* All other routes wrapped in Layout */}
            <Route path="/" element={<Layout />}>
              {/* Public Routes */}
              <Route index element={<Index />} />
              <Route path="about" element={<About />} />
              <Route path="mentors" element={<Mentors />} />
              <Route path="mentor/:mentorId" element={<MentorProfile />} />
              <Route path="become-mentor" element={<BecomeMentor />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="support" element={<Support />} />

              {/* Protected Dashboard Routes - Only accessible when logged in */}
              <Route
                path="mentor-dashboard"
                element={
                  <ProtectedRoute allowedRoles={['mentor']}>
                    <MentorDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="student-dashboard"
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Alternative dashboard URLs */}
              <Route
                path="mentor/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['mentor']}>
                    <MentorDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="student/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />

              {/* 404 Page - Create NotFound.jsx when needed */}
              <Route path="*" element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-6xl font-bold text-gray-300">404</h1>
                    <p className="text-xl text-gray-600 mt-4">Page not found</p>
                    <a href="/" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      Go Home
                    </a>
                  </div>
                </div>
              } />
            </Route>
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;