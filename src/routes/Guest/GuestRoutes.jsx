import { PrivateRoute } from "../PrivateRoute";
import MainPage from "../../pages/main/MainPage";
import { PATHS } from "../../utils/constants/constants";
import TariffsPage from "../../pages/user/TariffsPage";
import SalesPage from "../../pages/user/SalesPage";
import ContactsPage from "../../pages/user/ContactsPage";
import AddressPage from "../../pages/user/AddressPage";
import ProfilePage from "../../pages/user/ProfilePage";
import { Navigate } from "react-router-dom";
// import MainPage from "../../pages/MainPage";

export const GuestRoutes = () => {
  return [
    {
      index: true,
      element: <Navigate to={PATHS.GUEST.PAGE} />,
    },
    {
      path: PATHS.GUEST.PAGE,
      element: (
        <PrivateRoute
          component={<MainPage />}
          isAllowed={true}
          fallBackPath={PATHS.GUEST.ROOT}
        />
      ),
    },
    {
      path: "/guest/car/:id",
      element: (
        <PrivateRoute
          component={<MainPage />}
          fallBackPath={PATHS.SIGN_IN}
          isAllowed={false}
        />
      ),
    },
    {
      path: PATHS.GUEST.TARIFFS,
      element: (
        <PrivateRoute
          component={<TariffsPage />}
          fallBackPath={PATHS.GUEST.ROOT}
          isAllowed={true}
        />
      ),
    },
    {
      path: PATHS.GUEST.SALES,
      element: (
        <PrivateRoute
          component={<SalesPage />}
          fallBackPath={PATHS.GUEST.ROOT}
          isAllowed={true}
        />
      ),
    },
    {
      path: PATHS.GUEST.CONTACTS,
      element: (
        <PrivateRoute
          component={<ContactsPage />}
          fallBackPath={PATHS.GUEST.ROOT}
          isAllowed={true}
        />
      ),
    },
    {
      path: PATHS.GUEST.ADDRESS,
      element: (
        <PrivateRoute
          component={<AddressPage />}
          fallBackPath={PATHS.GUEST.ROOT}
          isAllowed={true}
        />
      ),
    },
    {
      path: PATHS.GUEST.PROFILE,
      element: (
        <PrivateRoute
          component={<ProfilePage />}
          fallBackPath={PATHS.GUEST.ROOT}
          isAllowed={true}
        />
      ),
    },
  ];
};
