import { Outlet } from "react-router-dom";
import { Footer } from "../components/footer/Footer";
import GuestHeader from "../components/header/guest/GuestHeader";

export const GuestLayout = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "yellow",
      }}
    >
      GuestLayout
      <GuestHeader />
      <Outlet />
      <Footer />
    </div>
  );
};
