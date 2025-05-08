import { colors, styled } from "@mui/material";
import React from "react";
import { Icons } from "../../assets";

const ChoseUs = () => {
  return (
    <StyledDiv>
      <h2>Почему нужно выбрать нас?</h2>
      <div className="container">
        <div className="box">
          <Icons.Progress />
          <p>Новый и ухоженный автопарк</p>
        </div>
        <div className="box">
          <Icons.Location />
          <p>На месте когда и где нужно</p>
        </div>
        <div className="box">
          <Icons.Warning />
          <p>Саблюдаем дорожные правила и этикет</p>
        </div>
      </div>
    </StyledDiv>
  );
};

export default ChoseUs;
const StyledDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "70px",
  "& h2": {
    textShadow: "2px 2px 2px rgba(0,0,0,0.94)",
    color: "#0000a9",
    fontSize: "40px",
  },
  "& .container": {
    width: "100%",
    height: "200px",
    background: "linear-gradient(#00d4b8, #0077b6, #03045e)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    "& .box": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "150px",
      gap: "10px",
      "& p": {
        fontSize: "14px",
        fontWeight: "750",
        color: "white",
        textAlign: "center",
      },
    },
  },
});
