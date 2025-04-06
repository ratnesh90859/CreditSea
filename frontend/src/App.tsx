"use client";

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LoanProvider } from "./contexts/LoanContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/user/Dashboard";
import UserLoans from "./pages/user/Loans";
import UserLoanApplication from "./pages/user/LoanApplication";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminLoans from "./pages/admin/Loans";
import NotFound from "./pages/NotFound";
import AdminSidebar from "./components/AdminSidebar";

// Layout for admin pages
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return (
    <div className="flex min-h-screen">
      {user?.role === "admin" && <AdminSidebar />}
      <div className="flex-1">{children}</div>
    </div>
  );
};

// Protected route component
const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode; requiredRole?: string }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === "admin" ? "/admin/dashboard" : "/dashboard"} replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <LoanProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* User routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requiredRole="user">
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/loans"
              element={
                <ProtectedRoute requiredRole="user">
                  <UserLoans />
                </ProtectedRoute>
              }
            />
            <Route
              path="/apply-loan"
              element={
                <ProtectedRoute requiredRole="user">
                  <UserLoanApplication />
                </ProtectedRoute>
              }
            />

            {/* Admin routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/loans"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminLayout>
                    <AdminLoans />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />

            {/* Redirect root to dashboard or login */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </LoanProvider>
    </AuthProvider>
  );
}

export default App;
