
import React from "react";
import { StudentManagement } from "@/components/hostel/StudentManagement";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const StudentManagementPage = () => {
  return (
    <ProtectedRoute allowedRoles={["hostel"]}>
      <StudentManagement />
    </ProtectedRoute>
  );
};

export default StudentManagementPage;
