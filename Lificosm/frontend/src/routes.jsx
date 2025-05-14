import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from './contexts/UserContext';

// Lazy load pages for better performance
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const WaitlistPage = lazy(() => import('./pages/WaitlistPage'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const ComingSoonPage = lazy(() => import('./pages/ComingSoonPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useUser();
  
  if (isLoading) {
    return <div className="lf-loading-container">
      <div className="lf-loading-spinner"></div>
    </div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className="lf-loading-container">
          <div className="lf-loading-spinner"></div>
        </div>
      }>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<WaitlistPage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage isRegister />} />
          <Route path="/waitlist" element={<WaitlistPage />} />
          
          {/* Coming soon pages */}
          <Route path="/about" element={<ComingSoonPage title="About Us" />} />
          <Route path="/features" element={<ComingSoonPage title="Features" />} />
          <Route path="/privacy" element={<ComingSoonPage title="Privacy Policy" />} />
          <Route path="/terms" element={<ComingSoonPage title="Terms & Conditions" />} />
          <Route path="/contact" element={<ComingSoonPage title="Contact Us" />} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <ComingSoonPage title="Settings" />
            </ProtectedRoute>
          } />
          <Route path="/explore" element={
            <ProtectedRoute>
              <ComingSoonPage title="Explore Streams" />
            </ProtectedRoute>
          } />
          
          {/* 404 fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;