
import React from "react";
import { ComplaintManagement } from "@/components/hostel/ComplaintManagement";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const ComplaintManagementPage = () => {
  return (
    <ProtectedRoute allowedRoles={["hostel"]}>
      <ComplaintManagement />
    </ProtectedRoute>
  );
};

export default ComplaintManagementPage;
