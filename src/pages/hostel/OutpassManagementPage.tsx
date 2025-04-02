
import React from "react";
import { OutpassManagement } from "@/components/hostel/OutpassManagement";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const OutpassManagementPage = () => {
  return (
    <ProtectedRoute allowedRoles={["hostel"]}>
      <OutpassManagement />
    </ProtectedRoute>
  );
};

export default OutpassManagementPage;
