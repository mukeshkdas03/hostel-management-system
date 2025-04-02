
import React from "react";
import { LoginForm } from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Hostel Management System</h1>
          <p className="text-muted-foreground mt-2">Sign in to access your dashboard</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
