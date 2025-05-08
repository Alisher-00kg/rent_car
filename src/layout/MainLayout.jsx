import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material";
import MainPage from "../pages/MainPage";

const MainLayout = () => {
  return (
    <StyledMain>
      <Header />
      <Outlet />
      <MainPage />
    </StyledMain>
  );
};

export default MainLayout;
const StyledMain = styled("div")({
  marginTop: "100px",
});
