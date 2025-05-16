// import { Navigate } from "react-router-dom";

// export const PrivateRoute = ({
//   component: Component,
//   fallBackPath,
//   isAllowed,
// }) => {
//   return isAllowed ? <Component /> : <Navigate to={fallBackPath} replace />;
// };
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children, fallBackPath, isAllowed }) => {
  return isAllowed ? children : <Navigate to={fallBackPath} replace />;
};
