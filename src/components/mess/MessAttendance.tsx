
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { mockStudentService, mockMessService } from "@/lib/mockDb";
import { Student } from "@/types";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { Search } from "lucide-react";

export const MessAttendance = () => {
  const [students, setStudents] = useState<Student[]>(mockStudentService.getAllStudents());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const { toast } = useToast();

  const meals = [
    { id: "breakfast", label: "Breakfast" },
    { id: "lunch", label: "Lunch" },
    { id: "dinner", label: "Dinner" },
  ];

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.roomNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAttendanceChange = (studentId: string, meal: "breakfast" | "lunch" | "dinner", attended: boolean) => {
    const updatedStudent = mockMessService.updateAttendance(
      studentId,
      selectedDate,
      meal,
      attended
    );

    if (updatedStudent) {
      setStudents(
        students.map((student) =>
          student.id === studentId ? updatedStudent : student
        )
      );
      
      toast({
        title: "Attendance Updated",
        description: `${meal.charAt(0).toUpperCase() + meal.slice(1)} attendance updated for ${updatedStudent.name}`,
      });
    }
  };

  const getAttendanceStatus = (student: Student, meal: "breakfast" | "lunch" | "dinner") => {
    const attendanceRecord = student.messAttendance.find(
      (record) => record.date === selectedDate
    );
    return attendanceRecord ? attendanceRecord[meal] : false;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Mess Attendance</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students by name or room number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-2">
          <Label htmlFor="date" className="whitespace-nowrap">Date:</Label>
          <Input
            id="date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full md:w-auto"
          />
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Student Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="breakfast">
            <TabsList className="grid grid-cols-3">
              {meals.map((meal) => (
                <TabsTrigger key={meal.id} value={meal.id}>
                  {meal.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {meals.map((meal) => (
              <TabsContent key={meal.id} value={meal.id}>
                <div className="border rounded-md">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 text-left border-b">Name</th>
                        <th className="py-2 px-4 text-left border-b">Room</th>
                        <th className="py-2 px-4 text-center border-b">Present</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((student) => (
                          <tr key={student.id} className="hover:bg-muted/50">
                            <td className="py-2 px-4 border-b">{student.name}</td>
                            <td className="py-2 px-4 border-b">{student.roomNumber}</td>
                            <td className="py-2 px-4 border-b text-center">
                              <Checkbox
                                checked={getAttendanceStatus(
                                  student,
                                  meal.id as "breakfast" | "lunch" | "dinner"
                                )}
                                onCheckedChange={(checked) => {
                                  handleAttendanceChange(
                                    student.id,
                                    meal.id as "breakfast" | "lunch" | "dinner",
                                    !!checked
                                  );
                                }}
                                aria-label={`Mark ${student.name} as present for ${meal.label}`}
                              />
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="py-6 text-center text-muted-foreground">
                            No students found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
