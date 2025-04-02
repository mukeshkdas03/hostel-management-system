
import React from "react";
import { MessMenuManagement } from "@/components/mess/MessMenuManagement";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const MenuPage = () => {
  return (
    <ProtectedRoute allowedRoles={["mess"]}>
      <MessMenuManagement />
    </ProtectedRoute>
  );
};

export default MenuPage;
