import { Navigate } from "react-router-dom";
import { PATHS } from "../../utils/constants/constants";
import { useSelector } from "react-redux";
import { PrivateRoute } from "../PrivateRoute";
import TariffsPage from "../../pages/user/TariffsPage";
import SalesPage from "../../pages/user/SalesPage";
import { ContactsPage } from "../../pages/user/ContactsPage";
import ProfilePage from "../../pages/user/ProfilePage";
import MainPage from "../../pages/main/MainPage";
import { InnerCardPage } from "../../pages/user/InnerCardPage";
import AboutUsPage from "../../pages/user/AddressPage";
import { FavoritePage } from "../../pages/favorite/FavoritePage";

export const UserRoutes = () => {
  const { isAuthorized } = useSelector((state) => state.auth);
  return [
    {
      index: true,
      element: <Navigate to={PATHS.USER.PAGE} />,
    },
    {
      path: PATHS.USER.PAGE,
      element: (
        <PrivateRoute isAllowed={isAuthorized} fallBackPath={PATHS.SIGN_IN}>
          <MainPage />
        </PrivateRoute>
      ),
    },
    {
      path: PATHS.USER.TARIFFS,
      element: (
        <PrivateRoute isAllowed={isAuthorized} fallBackPath={PATHS.SIGN_IN}>
          <TariffsPage />
        </PrivateRoute>
      ),
    },
    {
      path: PATHS.USER.SALES,
      element: (
        <PrivateRoute isAllowed={isAuthorized} fallBackPath={PATHS.SIGN_IN}>
          <SalesPage />
        </PrivateRoute>
      ),
    },
    {
      path: PATHS.USER.CONTACTS,
      element: (
        <PrivateRoute isAllowed={isAuthorized} fallBackPath={PATHS.SIGN_INT}>
          <ContactsPage />
        </PrivateRoute>
      ),
    },
    {
      path: PATHS.USER.ABOUTUS,
      element: (
        <PrivateRoute isAllowed={isAuthorized} fallBackPath={PATHS.SIGN_IN}>
          <AboutUsPage />
        </PrivateRoute>
      ),
    },
    {
      path: PATHS.USER.PROFILE,
      element: (
        <PrivateRoute isAllowed={isAuthorized} fallBackPath={PATHS.SIGN_IN}>
          <ProfilePage />
        </PrivateRoute>
      ),
    },
    {
      path: PATHS.USER.PAGE_DETAILS,
      element: (
        <PrivateRoute isAllowed={isAuthorized} fallBackPath={PATHS.SIGN_IN}>
          <InnerCardPage />
        </PrivateRoute>
      ),
    },
    {
      path: PATHS.USER.FAVORITE,
      element: (
        <PrivateRoute isAllowed={isAuthorized} fallBackPath={PATHS.SIGN_IN}>
          <FavoritePage />
        </PrivateRoute>
      ),
    },
  ];
};
