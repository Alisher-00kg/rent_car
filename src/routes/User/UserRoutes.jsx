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

export const UserRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return [
    {
      index: true,
      element: <Navigate to={PATHS.USER.PAGE} />,
    },
    {
      path: PATHS.USER.PAGE,
      element: (
        <PrivateRoute
          component={<MainPage />}
          isAllowed={isAuthenticated}
          fallBackPath={PATHS.USER.ROOT}
        />
      ),
    },
    {
      path: PATHS.USER.TARIFFS,
      element: (
        <PrivateRoute
          component={<TariffsPage />}
          isAllowed={isAuthenticated}
          fallBackPath={PATHS.USER.ROOT}
        />
      ),
    },
    {
      path: PATHS.USER.SALES,
      element: (
        <PrivateRoute
          component={<SalesPage />}
          isAllowed={isAuthenticated}
          fallBackPath={PATHS.USER.ROOT}
        />
      ),
    },
    {
      path: PATHS.USER.CONTACTS,
      element: (
        <PrivateRoute
          component={<ContactsPage />}
          isAllowed={isAuthenticated}
          fallBackPath={PATHS.USER.ROOT}
        />
      ),
    },
    {
      path: PATHS.USER.ADDRESS,
      element: (
        <PrivateRoute
          component={<AddressPage />}
          isAllowed={isAuthenticated}
          fallBackPath={PATHS.USER.ROOT}
        />
      ),
    },
    {
      path: PATHS.USER.PROFILE,
      element: (
        <PrivateRoute
          component={<ProfilePage />}
          isAllowed={isAuthenticated}
          fallBackPath={PATHS.USER.ROOT}
        />
      ),
    },
  ];
};
