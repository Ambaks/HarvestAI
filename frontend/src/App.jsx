import React, {useState} from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import PrivateRoute from "./utils/PrivateRoute";
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";


const App = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Routes>

      <Route path="/" element={<Homepage />} />

      <Route path="/login" element={<Login />} />

      <Route
          path="/dashboard/admin/*"
          element={
            <PrivateRoute>
                <div className="bg-[#fff]">
                <AdminDashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
                </div>
            </PrivateRoute>
          }
        />

    </Routes>
  );
};

export default App;
