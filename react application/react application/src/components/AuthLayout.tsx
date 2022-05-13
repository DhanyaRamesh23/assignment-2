import { Outlet, Navigate } from "react-router-dom";
const AuthLayout = () => {
  const arequestionsNotAnswered = false;
  return arequestionsNotAnswered ? (
    <Navigate to="/questions" replace />
  ) : (
    <Outlet />
  );
};

export default AuthLayout;