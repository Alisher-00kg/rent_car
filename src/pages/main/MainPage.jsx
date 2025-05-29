import { useEffect } from "react";
import { keyframes, styled } from "@mui/material";
import Card from "../../components/UI/card/Card";
import ChoseUs from "../../components/chose-us/ChoseUs";
import Slider from "../../components/swiper/Slider";
import { imageArray } from "../../utils/constants/carsSlider";
import { Icons } from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars } from "../../store/thunks/allCars";
import { InfinitySlider } from "../../components/partners/InfinitySlider";
import { Feedback } from "../../components/feedback-card/Feedback";
const MainPage = () => {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.allCars);
  console.log(cars, "sds");

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "100px" }}>
      <StyledWhatsApp />
      <Slider images={imageArray} />
      <ChoseUs />
      <StyledUl>
        {cars?.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </StyledUl>
      <Feedback />
      <InfinitySlider />
    </div>
  );
};

export default MainPage;
const StyledUl = styled("ul")({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "50px",
  flexWrap: "wrap",
});

const animatedWhatsApp = keyframes`
  
0%{
    transform: scale(1);
}

50%{
    transform: scale(1.1);
}
100%{
    transform: scale(1);
}
`;
const StyledWhatsApp = styled(Icons.WhatsApp)`
  position: fixed;
  z-index: 99;
  right: 20px;
  bottom: 20px;
  margin: 10px 90px;
  animation: ${animatedWhatsApp} 1s infinite linear;
`;
