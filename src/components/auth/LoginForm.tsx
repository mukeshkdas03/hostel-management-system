
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRole } from "@/types";
import { Lock, User, BuildingIcon, UtensilsIcon } from "lucide-react";
import { OTPVerification } from "./OTPVerification";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["student", "mess", "hostel"] as const),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showOTP, setShowOTP] = useState(false);
  const [formValues, setFormValues] = useState<LoginFormValues | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      role: "student",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      // Additional validation
      if (!values.username.trim() || !values.password.trim()) {
        setAuthError("Username and password are required");
        setIsLoading(false);
        return;
      }
      
      // Store form values and show OTP verification
      setFormValues(values);
      setShowOTP(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Login error:", error);
      setAuthError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const handleOTPVerification = async (isVerified: boolean) => {
    if (isVerified && formValues) {
      setIsLoading(true);
      const success = await login(formValues.username, formValues.password);
      if (success) {
        navigate(`/${formValues.role}/dashboard`);
      } else {
        setAuthError("Authentication failed. Please check your credentials.");
        setShowOTP(false);
      }
      setIsLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    form.setValue("role", value as UserRole);
  };
  
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student':
        return <User className="h-5 w-5" />;
      case 'mess':
        return <UtensilsIcon className="h-5 w-5" />;
      case 'hostel':
        return <BuildingIcon className="h-5 w-5" />;
      default:
        return <User className="h-5 w-5" />;
    }
  };

  if (showOTP) {
    return (
      <OTPVerification
        username={formValues?.username || ""}
        onVerify={handleOTPVerification}
        onCancel={() => setShowOTP(false)}
      />
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl border-t-4 border-t-primary bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-center mb-2">
          <div className="bg-gradient-to-r from-primary/80 to-primary p-4 rounded-full shadow-md">
            <Lock className="h-7 w-7 text-primary-foreground" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          Hostel Management System
        </CardTitle>
        <CardDescription className="text-center text-base">
          Sign in to access your hostel management portal
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs 
          defaultValue="student" 
          className="w-full" 
          onValueChange={handleTabChange}
        >
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="student" className="flex items-center gap-2">
              <User className="h-4 w-4" /> Student
            </TabsTrigger>
            <TabsTrigger value="mess" className="flex items-center gap-2">
              <UtensilsIcon className="h-4 w-4" /> Mess
            </TabsTrigger>
            <TabsTrigger value="hostel" className="flex items-center gap-2">
              <BuildingIcon className="h-4 w-4" /> Hostel
            </TabsTrigger>
          </TabsList>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {authError && (
                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md border border-destructive/20 animate-fade-in">
                  {authError}
                </div>
              )}
              
              <div className="space-y-5">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Username</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input 
                            placeholder="Enter your username" 
                            className="pl-10"
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="Enter your password"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Button
                type="submit"
                className="w-full mt-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all shadow-md hover:shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? "Authenticating..." : "Log In & Get OTP"}
              </Button>
            </form>
          </Form>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div className="w-full text-center">
          <Button variant="link" onClick={() => navigate("/register")}>
            Don't have an account? Register
          </Button>
        </div>
        <div className="w-full text-center">
          <Button variant="link" onClick={() => navigate("/forgot-password")}>
            Forgot your password?
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
