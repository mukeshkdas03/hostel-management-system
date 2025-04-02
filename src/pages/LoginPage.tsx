
import React from "react";
import { LoginForm } from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100 via-transparent to-transparent opacity-60"></div>
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-100/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-100/30 to-transparent"></div>
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-blue-100/30 to-transparent"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-purple-100/30 to-transparent"></div>
      </div>
      
      <div className="w-full max-w-md z-10 mb-8 text-center">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Hostel Management System
        </h1>
        <p className="text-muted-foreground mt-2">Secure and efficient hostel administration</p>
      </div>
      
      <div className="w-full max-w-md z-10">
        <LoginForm />
      </div>
      
      <div className="mt-12 text-center text-sm text-muted-foreground z-10">
        © {new Date().getFullYear()} Hostel Management System. All rights reserved.
      </div>
    </div>
  );
};

export default LoginPage;
