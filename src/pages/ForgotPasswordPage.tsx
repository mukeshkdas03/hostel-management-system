
import React from "react";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Hostel Management System</h1>
          <p className="text-muted-foreground mt-2">Reset your password</p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
