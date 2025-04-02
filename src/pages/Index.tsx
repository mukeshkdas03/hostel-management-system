
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect logged in users to their respective dashboards
  React.useEffect(() => {
    if (user) {
      switch (user.role) {
        case "student":
          navigate("/student/dashboard");
          break;
        case "mess":
          navigate("/mess/dashboard");
          break;
        case "hostel":
          navigate("/hostel/dashboard");
          break;
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-200 via-transparent to-transparent opacity-60"></div>
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-blue-100/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-purple-100/50 to-transparent"></div>
        <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-blue-100/50 to-transparent"></div>
        <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-purple-100/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 pt-8"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Hostel Management System
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            A comprehensive solution for managing hostel operations, student requirements, and mess attendance
          </p>
        </motion.div>

        {/* Features section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="h-14 w-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Student Portal</h3>
            <p className="text-gray-600 mb-4">Apply for outpass, view mess menu, submit complaints, and manage your hostel experience efficiently.</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="h-14 w-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Mess Management</h3>
            <p className="text-gray-600 mb-4">Track student attendance, manage menu planning, and ensure efficient food service operations.</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="h-14 w-14 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Hostel Administration</h3>
            <p className="text-gray-600 mb-4">Handle outpass approvals, manage complaints, and oversee hostel facilities and student welfare.</p>
          </div>
        </motion.div>

        {/* Login/Register section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Access Your Portal</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              className="h-auto py-6 flex flex-col gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all" 
              onClick={() => navigate("/login")}
            >
              <span className="font-bold">Students</span>
            </Button>
            
            <Button 
              className="h-auto py-6 flex flex-col gap-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-md hover:shadow-lg transition-all" 
              onClick={() => navigate("/login")}
            >
              <span className="font-bold">Mess Authority</span>
            </Button>
            
            <Button 
              className="h-auto py-6 flex flex-col gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg transition-all" 
              onClick={() => navigate("/login")}
            >
              <span className="font-bold">Hostel Office</span>
            </Button>
          </div>
          
          <div className="flex justify-center mt-8">
            <Button variant="outline" onClick={() => navigate("/register")} className="bg-white hover:bg-gray-50 border-gray-300">
              New User? Register Here
            </Button>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-20">
          <p>© {new Date().getFullYear()} Hostel Management System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
