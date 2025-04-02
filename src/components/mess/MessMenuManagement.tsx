
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { mockMessService } from "@/lib/mockDb";
import { MenuItem } from "@/types";
import { useToast } from "@/components/ui/use-toast";

const menuItemSchema = z.object({
  breakfast: z.string().min(1, "Breakfast menu is required"),
  lunch: z.string().min(1, "Lunch menu is required"),
  dinner: z.string().min(1, "Dinner menu is required"),
});

type MenuItemFormValues = z.infer<typeof menuItemSchema>;

export const MessMenuManagement = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(
    mockMessService.getMenuItems()
  );
  const [currentDay, setCurrentDay] = useState<string>("monday");
  const { toast } = useToast();

  const days = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ];

  const currentMenuItem = menuItems.find((item) => item.day === currentDay);

  const form = useForm<MenuItemFormValues>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      breakfast: currentMenuItem?.breakfast || "",
      lunch: currentMenuItem?.lunch || "",
      dinner: currentMenuItem?.dinner || "",
    },
  });

  // Update form values when day changes
  React.useEffect(() => {
    const menuItem = menuItems.find((item) => item.day === currentDay);
    if (menuItem) {
      form.reset({
        breakfast: menuItem.breakfast,
        lunch: menuItem.lunch,
        dinner: menuItem.dinner,
      });
    }
  }, [currentDay, form, menuItems]);

  const onSubmit = (values: MenuItemFormValues) => {
    if (!currentMenuItem) return;

    const updatedMenuItem = mockMessService.updateMenuItem(currentMenuItem.id, {
      breakfast: values.breakfast,
      lunch: values.lunch,
      dinner: values.dinner,
    });

    if (updatedMenuItem) {
      setMenuItems(
        menuItems.map((item) =>
          item.id === updatedMenuItem.id ? updatedMenuItem : item
        )
      );
      
      toast({
        title: "Menu Updated",
        description: `Menu for ${currentDay.charAt(0).toUpperCase() + currentDay.slice(1)} has been updated successfully`,
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Mess Menu Management</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Weekly Menu</CardTitle>
          <CardDescription>
            Update the mess menu for each day of the week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs 
            defaultValue="monday" 
            value={currentDay}
            onValueChange={(value) => setCurrentDay(value)}
          >
            <TabsList className="grid grid-cols-7 mb-8">
              {days.map((day) => (
                <TabsTrigger key={day.value} value={day.value}>
                  {day.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="breakfast"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Breakfast</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter breakfast menu items"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="lunch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lunch</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter lunch menu items"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="dinner"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dinner</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter dinner menu items"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">
                  Update Menu
                </Button>
              </form>
            </Form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
