
import React from "react";
import { MessMenu } from "@/components/student/MessMenu";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const MessMenuPage = () => {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <MessMenu />
    </ProtectedRoute>
  );
};

export default MessMenuPage;
