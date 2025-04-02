
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { MessAuthority } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersIcon, UtensilsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MessDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const messAuthority = user as MessAuthority;

  if (!messAuthority) {
    return null;
  }

  const dashboardItems = [
    {
      title: "Attendance",
      description: "Mark and manage student mess attendance",
      icon: <UsersIcon className="h-5 w-5" />,
      onClick: () => navigate("/mess/attendance"),
    },
    {
      title: "Mess Menu",
      description: "View and update the weekly mess menu",
      icon: <UtensilsIcon className="h-5 w-5" />,
      onClick: () => navigate("/mess/menu"),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Welcome, {messAuthority.name}</h1>
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
