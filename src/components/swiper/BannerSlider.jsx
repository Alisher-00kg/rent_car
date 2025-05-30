import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { styled } from "@mui/material/styles";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const BannerSlider = ({ images }) => {
  return (
    <Wrapper>
      <StyledSwiper
        modules={[Navigation, Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 2300,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          1024: { slidesPerView: 1 },
        }}
      >
        {images.map((img, index) => (
          <StyledSwiperSlide key={index}>
            <SlideImage src={img} alt={`slide-${index}`} />
          </StyledSwiperSlide>
        ))}
      </StyledSwiper>
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "50px 0px 0px 0px",
});

const StyledSwiper = styled(Swiper)({
  "--swiper-navigation-color": "white",
  "--swiper-pagination-color": "white",
  width: "94%",

  ".swiper-button-next, .swiper-button-prev": {
    color: "white",
  },
  ".swiper-pagination": {
    position: "relative",
    marginTop: "10px",
    textAlign: "center",
  },
  ".swiper-pagination-bullet": {
    backgroundColor: "#466cad",
    opacity: 1,
  },
  ".swiper-pagination-bullet-active": {
    backgroundColor: "blue",
  },
});

const StyledSwiperSlide = styled(SwiperSlide)({
  overflow: "hidden",
  borderRadius: "12px",
});

const SlideImage = styled("img")({
  width: "100%",
  height: "60vh",
  objectFit: "cover",
  cursor: "pointer",
});
