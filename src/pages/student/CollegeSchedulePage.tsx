
import React from "react";
import { CollegeSchedule } from "@/components/student/CollegeSchedule";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const CollegeSchedulePage = () => {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <CollegeSchedule />
    </ProtectedRoute>
  );
};

export default CollegeSchedulePage;
