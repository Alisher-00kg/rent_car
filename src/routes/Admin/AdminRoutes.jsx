import { Navigate } from "react-router-dom";
import { PATHS } from "../../utils/constants/constants";
import { useSelector } from "react-redux";
import { PrivateRoute } from "../PrivateRoute";
import { AdminPage } from "../../pages/admin/AdminPage";
import { AdminOrders } from "../../pages/admin/AdminOrders";
import { CreateCard } from "../../pages/admin/CreateCard";

export const AdminRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return [
    {
      index: true,
      element: <Navigate to={PATHS.ADMIN.PAGE} />,
    },
    {
      path: PATHS.ADMIN.PAGE,
      // index: true,
      element: (
        <PrivateRoute isAllowed={isAuthenticated} fallBackPath={PATHS.SIGN_IN}>
          <AdminPage />
        </PrivateRoute>
      ),
    },
    {
      path: PATHS.ADMIN.ORDERS,
      element: (
        <PrivateRoute isAllowed={isAuthenticated} fallBackPath={PATHS.SIGN_IN}>
          <AdminOrders />
        </PrivateRoute>
      ),
    },
    {
      path: PATHS.ADMIN.CREATE,
      element: (
        <PrivateRoute isAllowed={isAuthenticated} fallBackPath={PATHS.SIGN_IN}>
          <CreateCard />
        </PrivateRoute>
      ),
    },
  ];
};
