import { PrivateRoute } from "../PrivateRoute";
import MainPage from "../../pages/main/MainPage";
import { PATHS } from "../../utils/constants/constants";
import TariffsPage from "../../pages/user/TariffsPage";
import SalesPage from "../../pages/user/SalesPage";
import { ContactsPage } from "../../pages/user/ContactsPage";
import ProfilePage from "../../pages/user/ProfilePage";
import { Navigate } from "react-router-dom";
import { InnerCardPage } from "../../pages/user/InnerCardPage";
import AboutUsPage from "../../pages/user/AddressPage";
import { FavoritePage } from "../../pages/favorite/FavoritePage";

export const GuestRoutes = () => {
  return [
    {
      index: true,
      element: <Navigate to={PATHS.GUEST.PAGE} />,
    },
    {
      path: PATHS.GUEST.PAGE,
      element: (
        <PrivateRoute isAllowed={true} fallBackPath={PATHS.SIGN_IN}>
          <MainPage />
        </PrivateRoute>
      ),
    },
    {
      path: PATHS.GUEST.TARIFFS,
      element: (
        <PrivateRoute fallBackPath={PATHS.SIGN_IN} isAllowed={true}>
          <TariffsPage />
        </PrivateRoute>
      ),
    },
    {
      path: PATHS.GUEST.SALES,
      element: (
        <PrivateRoute fallBackPath={PATHS.SIGN_IN} isAllowed={true}>
          <SalesPage />
        </PrivateRoute>
      ),
    },
    {
      path: PATHS.GUEST.CONTACTS,
      element: (
        <PrivateRoute fallBackPath={PATHS.SIGN_IN} isAllowed={true}>
          <ContactsPage />
        </PrivateRoute>
      ),
    },
    {
      path: PATHS.GUEST.ABOUTUS,
      element: (
        <PrivateRoute fallBackPath={PATHS.SIGN_IN} isAllowed={true}>
          <AboutUsPage />
        </PrivateRoute>
      ),
    },
    {
      path: PATHS.GUEST.PROFILE,
      element: (
        <PrivateRoute fallBackPath={PATHS.SIGN_IN} isAllowed={true}>
          <ProfilePage />
        </PrivateRoute>
      ),
    },
    {
      path: PATHS.GUEST.PAGE_DETAILS,
      element: (
        <PrivateRoute fallBackPath={PATHS.SIGN_IN} isAllowed={true}>
          <InnerCardPage />
        </PrivateRoute>
      ),
    },
    {
      path: PATHS.GUEST.FAVORITE,
      element: (
        <PrivateRoute fallBackPath={PATHS.SIGN_IN} isAllowed={true}>
          <FavoritePage />
        </PrivateRoute>
      ),
    },
  ];
};
