
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { mockStudentService } from "@/lib/mockDb";
import { Student, Outpass } from "@/types";
import { format } from "date-fns";

const outpassSchema = z.object({
  reason: z.string().min(10, "Reason must be at least 10 characters"),
  fromDate: z.string().min(1, "From date is required"),
  toDate: z.string().min(1, "To date is required"),
}).refine(data => new Date(data.fromDate) <= new Date(data.toDate), {
  message: "To date must be after or equal to From date",
  path: ["toDate"],
});

type OutpassFormValues = z.infer<typeof outpassSchema>;

export const OutpassRequest = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [outpasses, setOutpasses] = useState<Outpass[]>([]);
  const [loading, setLoading] = useState(true);

  const student = user as Student;

  const form = useForm<OutpassFormValues>({
    resolver: zodResolver(outpassSchema),
    defaultValues: {
      reason: "",
      fromDate: format(new Date(), "yyyy-MM-dd"),
      toDate: format(new Date(), "yyyy-MM-dd"),
    },
  });

  useEffect(() => {
    if (student?.id) {
      setOutpasses(mockStudentService.getOutpassesByStudentId(student.id));
      setLoading(false);
    }
  }, [student?.id]);

  const onSubmit = (values: OutpassFormValues) => {
    if (!student) return;

    const newOutpass = mockStudentService.createOutpass({
      studentId: student.id,
      studentName: student.name,
      reason: values.reason,
      fromDate: values.fromDate,
      toDate: values.toDate,
    });

    setOutpasses([newOutpass, ...outpasses]);
    
    toast({
      title: "Outpass Request Submitted",
      description: "Your outpass request has been submitted successfully and is pending approval.",
    });
    
    form.reset();
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Outpass Request</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>New Outpass Request</CardTitle>
              <CardDescription>
                Request permission to leave the hostel premises
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reason</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Provide the reason for your outpass request" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="fromDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>From Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="toDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>To Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full">
                    Submit Request
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Outpass History</CardTitle>
              <CardDescription>
                View status of your outpass requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              {outpasses.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No outpass requests found
                </p>
              ) : (
                <div className="space-y-4">
                  {outpasses.map((outpass) => (
                    <div
                      key={outpass.id}
                      className="border rounded-lg p-4 flex flex-col md:flex-row justify-between"
                    >
                      <div>
                        <p className="font-medium">{outpass.reason}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(outpass.fromDate).toLocaleDateString()} to {new Date(outpass.toDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Requested on {new Date(outpass.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="mt-2 md:mt-0 flex items-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadgeClass(
                            outpass.status
                          )}`}
                        >
                          {outpass.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
