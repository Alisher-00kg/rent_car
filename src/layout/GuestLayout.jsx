import { Outlet } from "react-router-dom";
import { Footer } from "../components/footer/Footer";
import GuestHeader from "../components/header/guest/GuestHeader";
import { styled } from "@mui/material";

export const GuestLayout = () => {
  return (
    <StyledMain>
      <GuestHeader />
      <Outlet />
      <Footer />
    </StyledMain>
  );
};
const StyledMain = styled("div")({
  marginTop: "100px",
  display: "flex",
  flexDirection: "column",
});
