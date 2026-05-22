import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login_Page from "../pages/Auth/Login_Page";
import SignUp_Page from "../pages/Auth/SignUp_Page";
import Home_Page from "../pages/Dashboards/Home_Page";

export default function AppRoutes() {
      return (
            <BrowserRouter>
                  <Routes>

                        {/* Home Page */}
                        <Route path="/" element={<Home_Page />} />

                        {/* Authentication Routes */}
                        <Route path="/login" element={<Login_Page />} />
                        <Route path="/signup" element={<SignUp_Page />} />

                        {/* 404 Not Found - Catch all undefined routes */}
                        <Route path="*" element={<Navigate to="/" replace />} />

                  </Routes>
            </BrowserRouter>
      );
}