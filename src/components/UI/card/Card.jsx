import { useState } from "react";
import { styled } from "@mui/material";

const Card = ({ image, model, year, transmission, fuel, engine }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % image.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? image.length - 1 : prevIndex - 1
    );
  };

  return (
    <StyledDiv>
      <li
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <div id="box_cars">
            <div className="slider">
              <button className="slider-btn left" onClick={prevSlide}>
                &#8592;
              </button>
              <img src={image[currentIndex]} alt="car" />
              <button className="slider-btn right" onClick={nextSlide}>
                &#8594;
              </button>
            </div>
            <h3>{model}</h3>
            <div className="box">
              <p>Год выпуска....{year}</p>
              <p>КПП...............{transmission}</p>
              <p>Топливо......{fuel}</p>
              <p>Двигатель........{engine}</p>
            </div>
          </div>
        </div>
      </li>
    </StyledDiv>
  );
};

export default Card;

const StyledDiv = styled("div")({
  listStyle: "none",
  display: "flex",
  justifyContent: "center",

  "& #box_cars": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "240px",
    height: "388px",
    borderRadius: "14px",
    gap: "20px",
    boxShadow:
      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
    cursor: "pointer",
    position: "relative",

    "&:hover": {
      transform: "scale(1.03)",
      transition: "0.3s",
    },

    "& .box": {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    },

    "& .slider": {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "230px",
      height: "155px",

      "& img": {
        width: "100%",
        height: "100%",
        objectFit: "contain",
      },

      "& .slider-btn": {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        background: "#ffffffa0",
        border: "none",
        fontSize: "18px",
        cursor: "pointer",
        padding: "5px",
        borderRadius: "50%",
        zIndex: 1,

        "&:hover": {
          background: "#ffffff",
        },
      },

      "& .left": {
        left: 0,
      },
      "& .right": {
        right: 0,
      },
    },
    "& .slider": {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "230px",
      height: "155px",

      "& img": {
        width: "100%",
        height: "100%",
        objectFit: "contain",
      },

      "& .slider-btn": {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        background: "#ffffffa0",
        border: "none",
        fontSize: "18px",
        cursor: "pointer",
        padding: "5px",
        borderRadius: "50%",
        zIndex: 1,
        opacity: 0,
        transition: "opacity 0.3s",
        pointerEvents: "none",
      },

      "& .left": {
        left: 0,
      },
      "& .right": {
        right: 0,
      },
    },
    "&:hover .slider-btn": {
      opacity: 1,
      pointerEvents: "auto",
    },
  },
});
