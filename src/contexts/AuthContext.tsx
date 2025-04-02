
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Student, MessAuthority, HostelAuthority } from "@/types";
import { mockAuthService } from "@/lib/mockDb";
import { useToast } from "@/components/ui/use-toast";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (
    username: string,
    password: string,
    name: string,
    email: string,
    role: "student" | "mess" | "hostel",
    additionalInfo?: any
  ) => Promise<{ success: boolean; message?: string }>;
  resetPassword: (username: string, newPassword: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("hostelUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("hostelUser");
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const loggedInUser = mockAuthService.login(username, password);
      if (loggedInUser) {
        setUser(loggedInUser);
        localStorage.setItem("hostelUser", JSON.stringify(loggedInUser));
        toast({
          title: "Login successful",
          description: `Welcome back, ${loggedInUser.name}!`,
        });
        return true;
      } else {
        toast({
          title: "Login failed",
          description: "Invalid username or password",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("hostelUser");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const register = async (
    username: string,
    password: string,
    name: string,
    email: string,
    role: "student" | "mess" | "hostel",
    additionalInfo?: any
  ) => {
    try {
      const result = mockAuthService.register(
        username,
        password,
        name,
        email,
        role,
        additionalInfo
      );

      if (result.success) {
        toast({
          title: "Registration successful",
          description: "Your account has been created successfully",
        });
        return { success: true };
      } else {
        toast({
          title: "Registration failed",
          description: result.message || "An error occurred during registration",
          variant: "destructive",
        });
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return { success: false, message: "An unexpected error occurred" };
    }
  };

  const resetPassword = async (username: string, newPassword: string) => {
    try {
      const success = mockAuthService.resetPassword(username, newPassword);
      
      if (success) {
        toast({
          title: "Password reset successful",
          description: "Your password has been reset successfully",
        });
        return true;
      } else {
        toast({
          title: "Password reset failed",
          description: "Username not found",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Password reset error:", error);
      toast({
        title: "Password reset error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
