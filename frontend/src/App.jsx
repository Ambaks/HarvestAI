import React, { useState, useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import PrivateRoute from "./utils/PrivateRoute";
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";
import FarmerDashLayout from "./layouts/FarmerDashLayout";
import { UserContext, UserProvider } from "./context/UserContext";
import { DataProvider } from "./context/DataContext";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "./utils/PageWrapper";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isAuthenticated, user } = useContext(UserContext);
  const location = useLocation(); // ✅ Track route changes

  return (
    <UserProvider>
      <DataProvider>
        {/* ✅ Wrap routes in AnimatePresence */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Homepage /></PageWrapper>} />

            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  user.role === "admin" ? (
                    <Navigate to="/admin-dashboard" replace />
                  ) : user.role === "farmer" ? (
                    <Navigate to="/farmer-dashboard" replace />
                  ) : user.role === "exporter" ? (
                    <Navigate to="/exporter-dashboard" replace />
                  ) : (
                    <Navigate to="/" replace />
                  )
                ) : (
                  <PageWrapper><Login /></PageWrapper>
                )
              }
            />

            <Route
              path="/admin-dashboard/*"
              element={
                <PrivateRoute>
                  <PageWrapper>
                    <div className="bg-[#fff]">
                      <AdminDashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                    </div>
                  </PageWrapper>
                </PrivateRoute>
              }
            />

            <Route
              path="/farmer-dashboard/*"
              element={
                <PrivateRoute>
                  <PageWrapper>
                    <div className="bg-[#fff]">
                      <FarmerDashLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                    </div>
                  </PageWrapper>
                </PrivateRoute>
              }
            />

            <Route
              path="/exporter-dashboard/*"
              element={
                <PrivateRoute>
                  <PageWrapper>
                    <div className="bg-[#fff]">
                      <AdminDashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                    </div>
                  </PageWrapper>
                </PrivateRoute>
              }
            />
          </Routes>
        </AnimatePresence>
      </DataProvider>
    </UserProvider>
  );
};

export default App;