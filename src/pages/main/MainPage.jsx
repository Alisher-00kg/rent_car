import { useEffect } from "react";
import { IconButton, keyframes, styled } from "@mui/material";
import Card from "../../components/UI/card/Card";
import ChoseUs from "../../components/chose-us/ChoseUs";
import { Icons } from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars } from "../../store/thunks/allCars";
import { InfinitySlider } from "../../components/partners/InfinitySlider";
import { Feedback } from "../../components/feedback-card/Feedback";
import { BannerSlider } from "../../components/swiper/BannerSlider";
import { bannerImages } from "../../utils/constants/carsSlider.js";

const MainPage = () => {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.allCars);

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  const openLink = (url) => window.open(url, "_blank");

  return (
    <Wrapper>
      <BannerSlider images={bannerImages} />
      <WhatsAppButton onClick={() => openLink("https://wa.me/+79992781923")}>
        <Icons.WhatsAppNav />
      </WhatsAppButton>
      <TelegramButton onClick={() => openLink("https://t.me/+79992781923")}>
        <Icons.Telegram />
      </TelegramButton>
      <ChoseUs />

      <StyledUl>
        {cars?.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </StyledUl>
      <Feedback />
      <InfinitySlider />
    </Wrapper>
  );
};

export default MainPage;

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "100px",
});

const StyledUl = styled("ul")({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "50px",
  flexWrap: "wrap",
});

const animatedPulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const rippleEffect = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  100% {
    transform: scale(2.2);
    opacity: 0;
  }
`;

const baseButtonStyles = {
  position: "fixed",
  right: "20px",
  zIndex: 99,
  width: "56px",
  height: "56px",
  padding: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  animation: `${animatedPulse} 2s infinite ease-in-out`,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    backgroundColor: "rgba(0, 255, 0, 0.3)",
    animation: `${rippleEffect} 2.4s infinite ease-out`,
    zIndex: -1,
  },
};

const WhatsAppButton = styled(IconButton)({
  ...baseButtonStyles,
  bottom: "120px",
  "&::before": {
    ...baseButtonStyles["&::before"],
    backgroundColor: "rgba(0, 255, 0, 0.3)",
  },
});

const TelegramButton = styled(IconButton)({
  ...baseButtonStyles,
  bottom: "20px",
  "&::before": {
    ...baseButtonStyles["&::before"],
    backgroundColor: "rgba(0, 136, 204, 0.3)",
  },
});
