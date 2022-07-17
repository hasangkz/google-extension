import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useLog } from "../hooks/useLog";
export const AuthLayout = () => {
  const isLog = useLog();

  if (isLog === null) return <Navigate to="/welcome" replace />;
  return <Outlet />;
};
