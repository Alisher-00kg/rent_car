import { useSelector } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { PATHS } from "../utils/constants/constants";
import { PrivateRoute } from "./PrivateRoute";
import { AdminLayout } from "../layout/AdminLayout";
import UserLayout from "../layout/UserLayout";
import { AdminRoutes } from "./Admin/AdminRoutes";
import { UserRoutes } from "./User/UserRoutes";
import { NotFoundPage } from "../pages/not-found/NotFoundPage";
import { GuestLayout } from "../layout/GuestLayout";
import { GuestRoutes } from "./Guest/GuestRoutes";
import { SignIn } from "../auth/SignIn";
import { SignUp } from "../auth/SignUp";

export const AppRoutes = () => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  const routeByRole = {
    ADMIN: PATHS.ADMIN.ROOT,
    USER: PATHS.USER.ROOT,
    GUEST: PATHS.GUEST.ROOT,
  };
  const routes = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? (
        <Navigate to={routeByRole[role]} replace />
      ) : (
        <Navigate to={PATHS.GUEST.PAGE} />
      ),
    },
    {
      path: PATHS.ADMIN.ROOT,
      element: (
        <PrivateRoute
          component={<AdminLayout />}
          isAllowed={role === "ADMIN"}
          fallBackPath={routeByRole[role] || PATHS.ADMIN.ROOT}
        />
      ),
      children: AdminRoutes(),
    },
    {
      path: PATHS.USER.ROOT,
      element: (
        <PrivateRoute
          component={<UserLayout />}
          isAllowed={role === "USER"}
          fallBackPath={routeByRole[role] || PATHS.USER.ROOT}
        />
      ),
      children: UserRoutes(),
    },
    {
      path: PATHS.GUEST.ROOT,
      element: (
        <PrivateRoute
          component={<GuestLayout />}
          isAllowed={role === "GUEST"}
          fallBackPath={routeByRole[role] || PATHS.GUEST.ROOT}
        />
      ),
      children: GuestRoutes(),
    },
    {
      path: PATHS.SIGN_IN,
      element: (
        <PrivateRoute
          component={<SignIn />}
          isAllowed={role === "GUEST"}
          fallBackPath={routeByRole[role]}
        />
      ),
    },
    {
      path: PATHS.SIGN_UP,
      element: (
        <PrivateRoute
          component={<SignUp />}
          isAllowed={role === "GUEST"}
          fallBackPath={routeByRole[role]}
        />
      ),
    },
    {
      path: PATHS.NOT_FOUND,
      element: <NotFoundPage />,
    },
  ]);
  return <RouterProvider router={routes} />;
};
