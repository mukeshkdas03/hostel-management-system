
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { HostelAuthority } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileTextIcon, MessageSquare, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HostelDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const hostelAuthority = user as HostelAuthority;

  if (!hostelAuthority) {
    return null;
  }

  const dashboardItems = [
    {
      title: "Outpass Management",
      description: "Review and manage student outpass requests",
      icon: <FileTextIcon className="h-5 w-5" />,
      onClick: () => navigate("/hostel/outpass"),
    },
    {
      title: "Complaint Management",
      description: "Manage and respond to student complaints",
      icon: <MessageSquare className="h-5 w-5" />,
      onClick: () => navigate("/hostel/complaints"),
    },
    {
      title: "Student Management",
      description: "Manage student information",
      icon: <UserIcon className="h-5 w-5" />,
      onClick: () => navigate("/hostel/students"),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Welcome, {hostelAuthority.name}</h1>
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
