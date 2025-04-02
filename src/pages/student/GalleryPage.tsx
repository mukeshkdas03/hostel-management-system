
import React from "react";
import { HostelGallery } from "@/components/student/HostelGallery";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const GalleryPage = () => {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <HostelGallery />
    </ProtectedRoute>
  );
};

export default GalleryPage;
