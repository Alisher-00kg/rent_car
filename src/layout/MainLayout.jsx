import React from "react";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material";

const MainLayout = () => {
  return (
    <StyledMain>
      <Header />
      <Outlet />
    </StyledMain>
  );
};

export default MainLayout;
const StyledMain = styled("div")({
  marginTop: "100px",
});
