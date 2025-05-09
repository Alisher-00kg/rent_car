import { Navigate } from "react-router-dom";

export const PrivateRoute = ({
  component: Component,
  fallBackPath,
  isAllowed,
}) => {
  return isAllowed ? Component : <Navigate to={fallBackPath} replace />;
};
