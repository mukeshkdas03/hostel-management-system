
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Student } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserIcon, PhoneIcon, HomeIcon, UserCogIcon } from "lucide-react";

export const StudentProfile = () => {
  const { user } = useAuth();
  const student = user as Student;

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Personal Information</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserIcon className="h-5 w-5 mr-2" />
              Personal Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="font-medium">Name:</dt>
                <dd>{student.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">Email:</dt>
                <dd>{student.email}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">Username:</dt>
                <dd>{student.username}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HomeIcon className="h-5 w-5 mr-2" />
              Room Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="font-medium">Room Number:</dt>
                <dd>{student.roomNumber}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCogIcon className="h-5 w-5 mr-2" />
              Warden Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="font-medium">Name:</dt>
                <dd>{student.wardenName}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">Contact Number:</dt>
                <dd>{student.wardenContactNumber}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PhoneIcon className="h-5 w-5 mr-2" />
              Parent Contact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="font-medium">Contact Number:</dt>
                <dd>{student.parentContactNumber}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
