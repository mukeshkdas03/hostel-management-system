
import React from "react";
import { OutpassRequest } from "@/components/student/OutpassRequest";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const OutpassPage = () => {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <OutpassRequest />
    </ProtectedRoute>
  );
};

export default OutpassPage;
