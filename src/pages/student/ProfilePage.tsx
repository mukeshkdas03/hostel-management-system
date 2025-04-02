
import React from "react";
import { StudentProfile } from "@/components/student/StudentProfile";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const ProfilePage = () => {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <StudentProfile />
    </ProtectedRoute>
  );
};

export default ProfilePage;
