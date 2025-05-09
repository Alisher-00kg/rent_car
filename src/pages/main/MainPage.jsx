import React, { useState } from "react";

import { styled } from "@mui/material";
import { CARS } from "../../utils/constants/constants";
import Card from "../../components/UI/card/Card";
import ChoseUs from "../../components/chose-us/ChoseUs";
import Slider from "../../components/swiper/Slider";
import { imageArray } from "../../utils/constants/carsSlider";
const MainPage = () => {
  const [cars, setCars] = useState(CARS);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "100px" }}>
      <Slider images={imageArray} />
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
