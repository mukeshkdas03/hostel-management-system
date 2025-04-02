
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
import { Lock } from "lucide-react"; 

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
      
      const success = await login(values.username, values.password);
      if (success) {
        navigate(`/${values.role}/dashboard`);
      } else {
        setAuthError("Authentication failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setAuthError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    form.setValue("role", value as UserRole);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-t-4 border-t-primary">
      <CardHeader>
        <div className="flex items-center justify-center mb-2">
          <div className="bg-primary/10 p-3 rounded-full">
            <Lock className="h-6 w-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center">Secure Login</CardTitle>
        <CardDescription className="text-center">
          Sign in to access your hostel management portal
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs 
          defaultValue="student" 
          className="w-full" 
          onValueChange={handleTabChange}
        >
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="mess">Mess Authority</TabsTrigger>
            <TabsTrigger value="hostel">Hostel Office</TabsTrigger>
          </TabsList>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {authError && (
                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                  {authError}
                </div>
              )}
              
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button
                type="submit"
                className="w-full mt-6"
                disabled={isLoading}
              >
                {isLoading ? "Authenticating..." : "Log In"}
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
