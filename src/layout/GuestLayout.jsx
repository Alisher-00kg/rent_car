import { Outlet } from "react-router-dom";
import { Footer } from "../components/footer/Footer";
import GuestHeader from "../components/header/guest/GuestHeader";
import { styled } from "@mui/material";
import ScrollToTop from "../components/UI/scroll-to-top/ScrollToTop";

export const GuestLayout = () => {
  return (
    <>
      <ScrollToTop />
      <StyledMain>
        <div>
          <GuestHeader />
          <Outlet />
        </div>
        <Footer />
      </StyledMain>
    </>
  );
};
const StyledMain = styled("div")({
  marginTop: "100px",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  gap: "250px",
  background: "#f3f3f3",
});
