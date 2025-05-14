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
      element: (
        <PrivateRoute
          component={<AdminPage />}
          isAllowed={isAuthenticated}
          fallBackPath={PATHS.ADMIN.ROOT}
        />
      ),
    },
    {
      path: PATHS.ADMIN.ORDERS,
      element: (
        <PrivateRoute
          component={<AdminOrders />}
          isAllowed={isAuthenticated}
          fallBackPath={PATHS.ADMIN.ROOT}
        />
      ),
    },
    {
      path: PATHS.ADMIN.CREATE,
      element: (
        <PrivateRoute
          component={<CreateCard />}
          isAllowed={isAuthenticated}
          fallBackPath={PATHS.ADMIN.ROOT}
        />
      ),
    },
  ];
};
