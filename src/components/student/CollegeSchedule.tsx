
import React from "react";
import { schedules } from "@/lib/mockDb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";

export const CollegeSchedule = () => {
  // Sort schedules by date
  const sortedSchedules = [...schedules].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">College Schedule</h1>
      
      <div className="grid grid-cols-1 gap-6">
        {sortedSchedules.map((schedule) => (
          <Card key={schedule.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>{schedule.title}</CardTitle>
                <div className="flex items-center text-muted-foreground">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span>
                    {format(new Date(schedule.date), "MMMM d, yyyy")}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">{schedule.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
        
        {sortedSchedules.length === 0 && (
          <Card>
            <CardContent className="text-center py-10">
              <p className="text-muted-foreground">No upcoming events scheduled</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
