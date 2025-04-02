
import React from "react";
import { HostelDashboard } from "@/components/hostel/HostelDashboard";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const HostelDashboardPage = () => {
  return (
    <ProtectedRoute allowedRoles={["hostel"]}>
      <HostelDashboard />
    </ProtectedRoute>
  );
};

export default HostelDashboardPage;
