
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockStudentService, mockHostelService } from "@/lib/mockDb";
import { Student } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Search } from "lucide-react";

const updateStudentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  roomNumber: z.string().min(1, "Room number is required"),
  parentContactNumber: z.string().min(1, "Parent's contact number is required"),
  wardenName: z.string().min(2, "Warden's name is required"),
  wardenContactNumber: z.string().min(1, "Warden's contact number is required"),
});

type UpdateStudentFormValues = z.infer<typeof updateStudentSchema>;

export const StudentManagement = () => {
  const [students, setStudents] = useState<Student[]>(mockStudentService.getAllStudents());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const form = useForm<UpdateStudentFormValues>({
    resolver: zodResolver(updateStudentSchema),
    defaultValues: selectedStudent ? {
      name: selectedStudent.name,
      email: selectedStudent.email,
      roomNumber: selectedStudent.roomNumber,
      parentContactNumber: selectedStudent.parentContactNumber,
      wardenName: selectedStudent.wardenName,
      wardenContactNumber: selectedStudent.wardenContactNumber,
    } : {
      name: "",
      email: "",
      roomNumber: "",
      parentContactNumber: "",
      wardenName: "",
      wardenContactNumber: "",
    },
  });

  // Update form when selected student changes
  React.useEffect(() => {
    if (selectedStudent) {
      form.reset({
        name: selectedStudent.name,
        email: selectedStudent.email,
        roomNumber: selectedStudent.roomNumber,
        parentContactNumber: selectedStudent.parentContactNumber,
        wardenName: selectedStudent.wardenName,
        wardenContactNumber: selectedStudent.wardenContactNumber,
      });
    }
  }, [selectedStudent, form]);

  const onSubmit = (values: UpdateStudentFormValues) => {
    if (!selectedStudent) return;
    
    const updatedStudent = mockHostelService.updateStudentDetails(selectedStudent.id, values);
    
    if (updatedStudent) {
      setStudents(students.map(s => s.id === updatedStudent.id ? updatedStudent : s));
      setDialogOpen(false);
      
      toast({
        title: "Student Updated",
        description: `${updatedStudent.name}'s information has been updated successfully`,
      });
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Student Management</h1>
        
        <div className="relative mb-6">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students by name, email or room number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Students</CardTitle>
            <CardDescription>
              View and manage student information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="py-2 px-4 text-left border-b">Name</th>
                    <th className="py-2 px-4 text-left border-b">Email</th>
                    <th className="py-2 px-4 text-left border-b">Room</th>
                    <th className="py-2 px-4 text-left border-b">Parent Contact</th>
                    <th className="py-2 px-4 text-center border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-muted/50">
                        <td className="py-2 px-4 border-b">{student.name}</td>
                        <td className="py-2 px-4 border-b">{student.email}</td>
                        <td className="py-2 px-4 border-b">{student.roomNumber}</td>
                        <td className="py-2 px-4 border-b">{student.parentContactNumber}</td>
                        <td className="py-2 px-4 border-b text-center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedStudent(student);
                              setDialogOpen(true);
                            }}
                          >
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-muted-foreground">
                        No students found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {selectedStudent && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Student Information</DialogTitle>
              <DialogDescription>
                Update student details and room information.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="roomNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="parentContactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parent's Contact Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="wardenName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Warden's Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="wardenContactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Warden's Contact Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="submit">Save Changes</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
