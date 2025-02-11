import React, {useState, useContext} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import PrivateRoute from "./utils/PrivateRoute";
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";
import FarmerDashLayout from "./layouts/FarmerDashLayout";
import { UserContext, UserProvider } from "./context/UserContext";
import FarmerCrops from "./pages/FarmerCrops";

const App = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isAuthenticated, user, loading } = useContext(UserContext);

  return (
  <UserProvider>
    <Routes>

      <Route path="/" element={<Homepage />} />

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
              <Login />
            )
          }
      />

      <Route
          path="/admin-dashboard/*"
          element={
            <PrivateRoute>
                <div className="bg-[#fff]">
                <AdminDashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
                </div>
            </PrivateRoute>
          }
        />

        <Route
          path="/farmer-dashboard/*"
          element={
            <PrivateRoute>
                <div className="bg-[#fff]">
                <FarmerDashLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
                </div>
            </PrivateRoute>
          }
        />

        <Route
          path="/exporter-dashboard/*"
          element={
            <PrivateRoute>
                <div className="bg-[#fff]">
                <AdminDashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
                </div>
            </PrivateRoute>
          }
        />
        

    </Routes>
   </UserProvider>
  );
};

export default App;
