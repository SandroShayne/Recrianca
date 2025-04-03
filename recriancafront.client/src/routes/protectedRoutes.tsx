import React from "react";
import TemplatePage from "../template-page/templatePage";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // if (!isAuthenticated()) {
  //   return <Navigate to="/" />;
  // }
  return <TemplatePage>{children}</TemplatePage>;
};

export default ProtectedRoute;
