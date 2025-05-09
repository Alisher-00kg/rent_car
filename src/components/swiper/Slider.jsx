import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { styled } from "@mui/material/styles";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const StyledSwiper = styled(Swiper)({
  "--swiper-navigation-color": "white",
  "--swiper-pagination-color": "white",

  width: "94%",

  ".swiper-wrapper": {},
  ".swiper-slide": {
    overflow: "hidden",
  },
  ".swiper-slide img": {
    width: "100%",
    height: "40vh",
    objectFit: "cover",
    cursor: "pointer",
  },

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

const Slider = ({ images }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "70px",
      }}
    >
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
          <SwiperSlide key={index} style={{ overflow: "hidden" }}>
            <img
              src={img}
              alt={`slide-${index}`}
              style={{
                width: "100%",
                height: "60vh",
                objectFit: "cover",
                cursor: "pointer",
              }}
            />
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </div>
  );
};

export default Slider;
