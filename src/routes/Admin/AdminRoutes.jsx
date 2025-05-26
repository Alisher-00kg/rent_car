import { Navigate } from "react-router-dom";
import { PATHS } from "../../utils/constants/constants";
import { useSelector } from "react-redux";
import { PrivateRoute } from "../PrivateRoute";
import { AdminPage } from "../../pages/admin/AdminPage";
import { AdminOrders } from "../../pages/admin/AdminOrders";
import { AdminDetailsPage } from "../../pages/admin/AdminDetailsPage";
import { AdminCreateCard } from "../../pages/admin/AdminCreateCard";

export const AdminRoutes = () => {
  const { isAuthorized } = useSelector((state) => state.auth);
  return [
    {
      index: true,
      element: <Navigate to={PATHS.ADMIN.PAGE} />,
    },
    {
      path: PATHS.ADMIN.PAGE,
      element: (
        <PrivateRoute isAllowed={isAuthorized} fallBackPath={PATHS.SIGN_IN}>
          <AdminPage />
        </PrivateRoute>
      ),
    },
    {
      path: PATHS.ADMIN.PAGE_DETAILS,
      element: (
        <PrivateRoute isAllowed={isAuthorized} fallBackPath={PATHS.SIGN_IN}>
          <AdminDetailsPage />
        </PrivateRoute>
      ),
    },
    {
      path: PATHS.ADMIN.ORDERS,
      element: (
        <PrivateRoute isAllowed={isAuthorized} fallBackPath={PATHS.SIGN_IN}>
          <AdminOrders />
        </PrivateRoute>
      ),
    },
    {
      path: PATHS.ADMIN.CREATE,
      element: (
        <PrivateRoute isAllowed={isAuthorized} fallBackPath={PATHS.SIGN_IN}>
          <AdminCreateCard />
        </PrivateRoute>
      ),
    },
  ];
};
