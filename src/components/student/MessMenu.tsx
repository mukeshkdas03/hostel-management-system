
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockMessService } from "@/lib/mockDb";

export const MessMenu = () => {
  const menuItems = mockMessService.getMenuItems();

  const days = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ];

  // Get current day
  const today = new Date().toLocaleDateString('en-US', { weekday: 'lowercase' });
  const defaultDay = days.find(day => day.value === today)?.value || "monday";

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Mess Menu</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Weekly Menu</CardTitle>
          <CardDescription>
            Check out the mess menu for the week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={defaultDay}>
            <TabsList className="grid grid-cols-7 md:grid-cols-7">
              {days.map((day) => (
                <TabsTrigger key={day.value} value={day.value}>
                  {day.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {menuItems.map((item) => (
              <TabsContent key={item.id} value={item.day}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Breakfast</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{item.breakfast}</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Lunch</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{item.lunch}</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Dinner</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{item.dinner}</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
