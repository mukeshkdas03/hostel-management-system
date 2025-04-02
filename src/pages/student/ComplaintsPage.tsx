
import React from "react";
import { StudentComplaint } from "@/components/student/StudentComplaint";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const ComplaintsPage = () => {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <StudentComplaint />
    </ProtectedRoute>
  );
};

export default ComplaintsPage;
