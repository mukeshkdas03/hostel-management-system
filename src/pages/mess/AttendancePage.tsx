
import React from "react";
import { MessAttendance } from "@/components/mess/MessAttendance";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const AttendancePage = () => {
  return (
    <ProtectedRoute allowedRoles={["mess"]}>
      <MessAttendance />
    </ProtectedRoute>
  );
};

export default AttendancePage;
