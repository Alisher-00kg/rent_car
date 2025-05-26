import { useState } from "react";
import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../utils/constants/constants";
import { useSelector } from "react-redux";
import Button from "../button/Button";
import { Icons } from "../../../assets";
const Card = ({
  id,
  brand,
  model,
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
          <StyledHeart />
          <div className="slider">
            <button
              className="slider-btn left"
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
            >
              <span className="arrow">&#8249;</span>
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
              <span className="arrow">&#8250;</span>
            </button>
          </div>
          <StyledDescription>
            <div className="inner_box">
              <p className="title">{brand}</p>
              <p>
                {model},{transmission}. {flueType}, {driveType}, {numberOfSeats}
              </p>
            </div>
            <Button variant="base">Посмотреть</Button>
          </StyledDescription>
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
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "350px",
    height: "auto",
    borderRadius: "14px",
    gap: "45px",
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
        background: "none",
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
        transform: "scale(1.2)",
      },

      "& .arrow": {
        fontSize: "80px",
        color: "#fff",
      },
    },
  },
});

const StyledDescription = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  color: "#282828",
  gap: "15px",
  fontSize: "18px",
  padding: "0 15px",
  textAlign: "left",
  "& .title": {
    fontSize: "20px",
  },
  "& p": {
    margin: 0,
  },

  "& strong": {
    color: "#000",
  },
  "& .inner_box": {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    "& :nth-of-type(2)": {
      fontSize: "15px",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
});
const StyledHeart = styled(Icons.WhiteHeart)({
  position: "absolute",
  zIndex: "10",
  top: "15px",
  right: "15px",
  stroke: "white",
  transition: "transform 0.4s easy-out",
  "&:hover": {
    transform: "scale(1.2)",
  },
});
