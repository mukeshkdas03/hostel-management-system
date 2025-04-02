
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Student } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, FileTextIcon, UtensilsIcon, UserIcon, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const student = user as Student;

  if (!student) {
    return null;
  }

  const dashboardItems = [
    {
      title: "Outpass Requests",
      description: "Apply for and manage your outpass requests",
      icon: <FileTextIcon className="h-5 w-5" />,
      onClick: () => navigate("/student/outpass"),
    },
    {
      title: "Mess Menu",
      description: "View the weekly mess menu",
      icon: <UtensilsIcon className="h-5 w-5" />,
      onClick: () => navigate("/student/mess-menu"),
    },
    {
      title: "College Schedule",
      description: "Stay updated with college events and schedules",
      icon: <CalendarIcon className="h-5 w-5" />,
      onClick: () => navigate("/student/schedule"),
    },
    {
      title: "Personal Information",
      description: "View your personal and room information",
      icon: <UserIcon className="h-5 w-5" />,
      onClick: () => navigate("/student/profile"),
    },
    {
      title: "Complaints",
      description: "Submit and track complaints",
      icon: <MessageSquare className="h-5 w-5" />,
      onClick: () => navigate("/student/complaints"),
    },
    {
      title: "Hostel Gallery",
      description: "View images of the hostel facilities",
      icon: <FileTextIcon className="h-5 w-5" />,
      onClick: () => navigate("/student/gallery"),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Welcome, {student.name}</h1>
        <Button onClick={() => logout()}>Logout</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardItems.map((item) => (
          <Card 
            key={item.title}
            className="cursor-pointer transition-all hover:shadow-lg"
            onClick={item.onClick}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                {item.icon}
                <CardTitle>{item.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{item.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
