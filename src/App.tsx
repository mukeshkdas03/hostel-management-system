
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

// Student pages
import StudentDashboardPage from "./pages/student/StudentDashboardPage";
import OutpassPage from "./pages/student/OutpassPage";
import MessMenuPage from "./pages/student/MessMenuPage";
import CollegeSchedulePage from "./pages/student/CollegeSchedulePage";
import ProfilePage from "./pages/student/ProfilePage";
import ComplaintsPage from "./pages/student/ComplaintsPage";
import GalleryPage from "./pages/student/GalleryPage";

// Mess authority pages
import MessDashboardPage from "./pages/mess/MessDashboardPage";
import AttendancePage from "./pages/mess/AttendancePage";
import MenuPage from "./pages/mess/MenuPage";

// Hostel office pages
import HostelDashboardPage from "./pages/hostel/HostelDashboardPage";
import OutpassManagementPage from "./pages/hostel/OutpassManagementPage";
import ComplaintManagementPage from "./pages/hostel/ComplaintManagementPage";
import StudentManagementPage from "./pages/hostel/StudentManagementPage";

import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            
            {/* Student routes */}
            <Route path="/student/dashboard" element={<StudentDashboardPage />} />
            <Route path="/student/outpass" element={<OutpassPage />} />
            <Route path="/student/mess-menu" element={<MessMenuPage />} />
            <Route path="/student/schedule" element={<CollegeSchedulePage />} />
            <Route path="/student/profile" element={<ProfilePage />} />
            <Route path="/student/complaints" element={<ComplaintsPage />} />
            <Route path="/student/gallery" element={<GalleryPage />} />
            
            {/* Mess authority routes */}
            <Route path="/mess/dashboard" element={<MessDashboardPage />} />
            <Route path="/mess/attendance" element={<AttendancePage />} />
            <Route path="/mess/menu" element={<MenuPage />} />
            
            {/* Hostel office routes */}
            <Route path="/hostel/dashboard" element={<HostelDashboardPage />} />
            <Route path="/hostel/outpass" element={<OutpassManagementPage />} />
            <Route path="/hostel/complaints" element={<ComplaintManagementPage />} />
            <Route path="/hostel/students" element={<StudentManagementPage />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
