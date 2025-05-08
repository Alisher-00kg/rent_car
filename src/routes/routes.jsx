import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import TariffsPage from "../pages/TariffsPage";
import SalesPage from "../pages/SalesPage";
import ContcactsPage from "../pages/ContcactsPage";
import AddressPage from "../pages/AddressPage";
import ProfilePage from "../pages/ProfilePage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "tariffs",
        element: <TariffsPage />,
      },
      {
        path: "sales",
        element: <SalesPage />,
      },
      {
        path: "contacts",
        element: <ContcactsPage />,
      },
      {
        path: "address",
        element: <AddressPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);
