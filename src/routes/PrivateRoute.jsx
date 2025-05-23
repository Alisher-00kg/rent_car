import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children, fallBackPath, isAllowed }) => {
  return isAllowed ? children : <Navigate to={fallBackPath} replace />;
};
