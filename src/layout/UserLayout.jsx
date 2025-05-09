import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material";
import { Footer } from "../components/footer/Footer";

const UserLayout = () => {
  return (
    <StyledMain>
      <Header />
      <Outlet />
      <Footer />
    </StyledMain>
  );
};

export default UserLayout;
const StyledMain = styled("div")({
  marginTop: "100px",
});
