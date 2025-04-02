
import React from "react";
import { hostelImages } from "@/lib/mockDb";
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";

export const HostelGallery = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Hostel Gallery</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hostelImages.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-video">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback for missing images
                    (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Hostel+Image";
                  }}
                />
              </div>
            </CardContent>
            <CardFooter className="p-3">
              <CardDescription className="w-full text-center font-medium">
                {image.title}
              </CardDescription>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
