
import React from "react";
import { MessDashboard } from "@/components/mess/MessDashboard";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const MessDashboardPage = () => {
  return (
    <ProtectedRoute allowedRoles={["mess"]}>
      <MessDashboard />
    </ProtectedRoute>
  );
};

export default MessDashboardPage;
