import { Outlet } from "react-router-dom";
import { Footer } from "../components/footer/Footer";
import GuestHeader from "../components/header/guest/GuestHeader";

export const GuestLayout = () => {
  return (
    <div>
      GuestLayout
      <GuestHeader />
      <Outlet />
      <Footer />
    </div>
  );
};
