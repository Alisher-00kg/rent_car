import React, { useState } from "react";
import ChoseUs from "../components/chose-us/ChoseUs";
import Card from "../components/UI/card/Card";
import { CARS } from "../utils/constants/constants";
import { styled } from "@mui/material";
const MainPage = () => {
  const [cars, setCars] = useState(CARS);
  return (
    <div>
      <ChoseUs />
      <StyledUl>
        {cars.map((item) => (
          <Card key={item.fuel} {...item} />
        ))}
      </StyledUl>
    </div>
  );
};

export default MainPage;
const StyledUl = styled("ul")({
  display: "flex",
  justifyContent: "space-around",
});
