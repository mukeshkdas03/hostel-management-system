
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { mockStudentService } from "@/lib/mockDb";
import { Student, Complaint } from "@/types";
import { format } from "date-fns";

const complaintSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type ComplaintFormValues = z.infer<typeof complaintSchema>;

export const StudentComplaint = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  const student = user as Student;

  const form = useForm<ComplaintFormValues>({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (student?.id) {
      setComplaints(mockStudentService.getComplaintsByStudentId(student.id));
      setLoading(false);
    }
  }, [student?.id]);

  const onSubmit = (values: ComplaintFormValues) => {
    if (!student) return;

    const newComplaint = mockStudentService.createComplaint({
      studentId: student.id,
      studentName: student.name,
      title: values.title,
      description: values.description,
    });

    setComplaints([newComplaint, ...complaints]);
    
    toast({
      title: "Complaint Submitted",
      description: "Your complaint has been submitted successfully.",
    });
    
    form.reset();
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Complaints</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>New Complaint</CardTitle>
              <CardDescription>
                Submit a new complaint or issue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Brief title of your complaint" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Detailed description of your complaint" 
                            className="min-h-32"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full">
                    Submit Complaint
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Complaint History</CardTitle>
              <CardDescription>
                View status and responses to your complaints
              </CardDescription>
            </CardHeader>
            <CardContent>
              {complaints.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No complaints found
                </p>
              ) : (
                <div className="space-y-4">
                  {complaints.map((complaint) => (
                    <div
                      key={complaint.id}
                      className="border rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{complaint.title}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadgeClass(
                            complaint.status
                          )}`}
                        >
                          {complaint.status}
                        </span>
                      </div>
                      <p className="text-sm mb-2">{complaint.description}</p>
                      {complaint.response && (
                        <div className="bg-muted p-3 rounded-md mt-2">
                          <p className="text-xs font-medium mb-1">Response:</p>
                          <p className="text-sm">{complaint.response}</p>
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        Submitted on {new Date(complaint.createdAt).toLocaleString()}
                      </p>
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
