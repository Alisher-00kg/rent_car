import { useState } from "react";
import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../utils/constants/constants";
import { useSelector } from "react-redux";

const Card = ({
  id,
  category,
  brand,
  model,
  color,
  yearOfRelease,
  madeInCountry,
  rentPrice,
  hasCarInStock,
  flueType,
  numberOfSeats,
  transmission,
  driveType,
  images,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNavigate = (id) => {
    navigate(
      role === "GUEST"
        ? PATHS.GUEST.PAGE + "/" + id
        : PATHS.USER.PAGE + "/" + id
    );
  };

  return (
    <StyledDiv>
      <li onClick={() => handleNavigate(id)}>
        <div id="box_cars">
          <div className="slider">
            <button
              className="slider-btn left"
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
            >
              <span className="arrow">&#8592;</span>
            </button>
            {images && images.length > 0 ? (
              <img src={images[currentIndex]} alt={model} />
            ) : (
              <p>Изображения не доступны</p>
            )}
            <button
              className="slider-btn right"
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
            >
              <span className="arrow">&#8594;</span>
            </button>
          </div>
          <h3>{model}</h3>
          <div className="info">
            <p>
              <strong>Бренд: ............. </strong> {brand}
            </p>
            <p>
              <strong>Год выпуска: ............. </strong> {yearOfRelease}
            </p>
            <p>
              <strong>КПП: ............. </strong> {transmission}
            </p>
            <p>
              <strong>Топливо: ............. </strong> {flueType}
            </p>
            <p>
              <strong>Двигатель: ............. </strong> {driveType}
            </p>
            <p>
              <strong>Мест: ............. </strong> {numberOfSeats}
            </p>
            <p>
              <strong>Цена аренды: ............. </strong> {rentPrice} ₽
            </p>
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
  padding: "15px",
  margin: "10px",
  "& #box_cars": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "350px",
    height: "auto",
    borderRadius: "14px",
    gap: "20px",
    boxShadow:
      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#fff",
    paddingBottom: "25px",
    "&:hover": {
      transform: "scale(1.03)",
      transition: "0.3s",
    },

    "& h3": {
      fontSize: "18px",
      fontWeight: "bold",
      margin: "10px 0",
      color: "#333",
    },

    "& .info": {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
      color: "#666",
      fontSize: "18px",
      padding: "0 10px",
      textAlign: "left",

      "& p": {
        margin: 0,
      },

      "& strong": {
        color: "#000",
      },
    },

    "& .slider": {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "200px",
      borderRadius: "8px",
      overflow: "hidden",

      "& img": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },

      "& .slider-btn": {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        background: "rgba(255, 255, 255, 0.6)",
        border: "none",
        fontSize: "18px",
        cursor: "pointer",
        padding: "12px",
        borderRadius: "50%",
        zIndex: 1,
        transition: "background 0.3s, transform 0.3s",
      },

      "& .left": {
        left: 10,
      },

      "& .right": {
        right: 10,
      },

      "&:hover .slider-btn": {
        background: "rgba(255, 255, 255, 1)",
        transform: "scale(1.1)",
      },

      "& .arrow": {
        fontSize: "20px",
        color: "#333",
      },
    },
  },
});
