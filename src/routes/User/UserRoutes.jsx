import { Navigate } from "react-router-dom";
import { PATHS } from "../../utils/constants/constants";
import { useSelector } from "react-redux";
import { PrivateRoute } from "../PrivateRoute";
import TariffsPage from "../../pages/user/TariffsPage";
import SalesPage from "../../pages/user/SalesPage";
import ContactsPage from "../../pages/user/ContactsPage";
import AddressPage from "../../pages/user/AddressPage";
import ProfilePage from "../../pages/user/ProfilePage";
import MainPage from "../../pages/main/MainPage";
import { InnerCardPage } from "../../pages/user/InnerCardPage";

export const UserRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return [
    {
      index: true,
      element: <Navigate to={PATHS.USER.PAGE} />,
    },
    {
      path: PATHS.USER.PAGE,
      // index: true,
      element: (
        <PrivateRoute isAllowed={isAuthenticated} fallBackPath={PATHS.SIGN_IN}>
          <MainPage />
        </PrivateRoute>
      ),
    },
    {
      path: PATHS.USER.TARIFFS,
      element: (
        <PrivateRoute isAllowed={isAuthenticated} fallBackPath={PATHS.SIGN_IN}>
          <TariffsPage />
        </PrivateRoute>
      ),
    },
    {
      path: PATHS.USER.SALES,
      element: (
        <PrivateRoute isAllowed={isAuthenticated} fallBackPath={PATHS.SIGN_IN}>
          <SalesPage />
        </PrivateRoute>
      ),
    },
    {
      path: PATHS.USER.CONTACTS,
      element: (
        <PrivateRoute isAllowed={isAuthenticated} fallBackPath={PATHS.SIGN_INT}>
          <ContactsPage />
        </PrivateRoute>
      ),
    },
    {
      path: PATHS.USER.ADDRESS,
      element: (
        <PrivateRoute isAllowed={isAuthenticated} fallBackPath={PATHS.SIGN_IN}>
          <AddressPage />
        </PrivateRoute>
      ),
    },
    {
      path: PATHS.USER.PROFILE,
      element: (
        <PrivateRoute isAllowed={isAuthenticated} fallBackPath={PATHS.SIGN_IN}>
          <ProfilePage />
        </PrivateRoute>
      ),
    },
    {
      path: PATHS.USER.PAGE + "/:cardID",
      element: (
        <PrivateRoute isAllowed={isAuthenticated} fallBackPath={PATHS.SIGN_IN}>
          <InnerCardPage />
        </PrivateRoute>
      ),
    },
  ];
};
