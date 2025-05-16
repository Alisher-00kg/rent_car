import { useDispatch, useSelector } from "react-redux";
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
import { useEffect } from "react";
import { isAuth } from "../store/slices/authSlice";

export const AppRoutes = () => {
  const { isAuthenticated, role, isAuthInitialized } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth")) || {};
    if (!role) {
      dispatch(isAuth(authData.data?.role));
    }
  }, [dispatch, role]);
  // if (!isAuthInitialized) {
  //   return <div>Загрузка...</div>;
  // }
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
          isAllowed={role === "ADMIN"}
          fallBackPath={routeByRole[role] || PATHS.ADMIN.ROOT}
        >
          <AdminLayout />
        </PrivateRoute>
      ),
      children: AdminRoutes(),
    },
    {
      path: PATHS.USER.ROOT,
      element: (
        <PrivateRoute
          isAllowed={role === "USER"}
          fallBackPath={routeByRole[role] || PATHS.USER.ROOT}
        >
          <UserLayout />
        </PrivateRoute>
      ),
      children: UserRoutes(),
    },
    {
      path: PATHS.GUEST.ROOT,
      element: (
        <PrivateRoute
          isAllowed={role === "GUEST"}
          fallBackPath={routeByRole[role] || PATHS.GUEST.ROOT}
        >
          <GuestLayout />
        </PrivateRoute>
      ),
      children: GuestRoutes(),
    },
    {
      path: PATHS.SIGN_IN,
      element: (
        <PrivateRoute
          isAllowed={role === "GUEST"}
          fallBackPath={routeByRole[role]}
        >
          <SignIn />
        </PrivateRoute>
      ),
    },
    {
      path: PATHS.SIGN_UP,
      element: (
        <PrivateRoute
          isAllowed={role === "GUEST"}
          fallBackPath={routeByRole[role]}
        >
          <SignUp />
        </PrivateRoute>
      ),
    },
    {
      path: PATHS.NOT_FOUND,
      element: <NotFoundPage />,
    },
  ]);
  // if (isLoading) {
  //   return <div>Загрузка...</div>;
  // }
  return <RouterProvider router={routes} />;
};
