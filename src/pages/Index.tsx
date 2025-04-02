
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="max-w-xl w-full p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Hostel Management System</h1>
        <p className="text-lg text-gray-600 mb-8">
          A comprehensive solution for managing hostel operations, student requirements, and mess attendance.
        </p>
        
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Choose Your Portal</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                className="h-auto py-6 flex flex-col gap-2" 
                onClick={() => navigate("/login")}
                variant="outline"
              >
                <span className="font-bold">Students</span>
                <span className="text-xs text-muted-foreground">
                  Outpass, Mess Menu, Complaints
                </span>
              </Button>
              
              <Button 
                className="h-auto py-6 flex flex-col gap-2" 
                onClick={() => navigate("/login")}
                variant="outline"
              >
                <span className="font-bold">Mess Authority</span>
                <span className="text-xs text-muted-foreground">
                  Attendance, Menu Management
                </span>
              </Button>
              
              <Button 
                className="h-auto py-6 flex flex-col gap-2" 
                onClick={() => navigate("/login")}
                variant="outline"
              >
                <span className="font-bold">Hostel Office</span>
                <span className="text-xs text-muted-foreground">
                  Outpass Approval, Complaints
                </span>
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center gap-4 mt-8">
            <Button variant="link" onClick={() => navigate("/register")}>
              New User? Register Here
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
