
import React from "react";
import { StudentDashboard } from "@/components/student/StudentDashboard";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const StudentDashboardPage = () => {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <StudentDashboard />
    </ProtectedRoute>
  );
};

export default StudentDashboardPage;
