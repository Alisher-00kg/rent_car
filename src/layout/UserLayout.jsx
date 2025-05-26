import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material";
import { Footer } from "../components/footer/Footer";
import ScrollToTop from "../components/UI/scroll-to-top/ScrollToTop";

const UserLayout = () => {
  return (
    <>
      <ScrollToTop />
      <StyledMain>
        <Header />
        <Outlet />
        <Footer />
      </StyledMain>
      s
    </>
  );
};

export default UserLayout;
const StyledMain = styled("div")({
  marginTop: "100px",
});
