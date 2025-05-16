import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Audi from "../../assets/images/Audi2.png";
import Bizness from "../../assets/images/biznez4.png";
import Mers from "../../assets/images/biznez5.png";
import Bently from "../../assets/images/biznez16.png";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/UI/button/Button";
import { PATHS } from "../../utils/constants/constants";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/UI/input/Input";
import { BaseModal } from "../../components/UI/modal/BaseModal";
import { Typography } from "@mui/material";
import { getSingleCar } from "../../store/thunks/allCars";

export const InnerCardPage = () => {
  const navigate = useNavigate();
  const { cardID } = useParams();
  const { role } = useSelector((state) => state.auth);
  const { singleCar } = useSelector((state) => state.allCars);
  console.log(singleCar);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (cardID) {
      dispatch(getSingleCar(cardID));
    }
  }, [cardID, dispatch]);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const handleReservation = () => {};
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <GalleryWrapper>
      <div>
        <div
          style={{
            maxWidth: "700px",
          }}
        >
          <MainSlider>
            <Swiper
              modules={[Navigation, Thumbs]}
              navigation
              thumbs={{ swiper: thumbsSwiper }}
              className="main-slider"
              spaceBetween={10}
            >
              {singleCar?.images?.map((img, index) => (
                <SwiperSlide key={index}>
                  <img src={img} alt={`Slide ${index}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          </MainSlider>
        </div>

        <ThumbsSlider>
          <Swiper
            modules={[Thumbs]}
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            watchSlidesProgress
            className="thumbs-slider"
          >
            {singleCar?.images?.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt={`Thumb ${index}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </ThumbsSlider>
      </div>

      <StyledRightBar>
        <section>
          <h2>
            {singleCar?.brand} {singleCar?.model}
          </h2>
          <CarInfoList>
            <li>
              <strong>Категория:</strong> {singleCar?.category}
            </li>
            <li>
              <strong>Цвет:</strong> {singleCar?.color}
            </li>
            <li>
              <strong>Год выпуска:</strong> {singleCar?.yearOfRelease}
            </li>
            <li>
              <strong>Производство:</strong> {singleCar?.madeInCountry}
            </li>
            <li>
              <strong>Тип топлива:</strong> {singleCar?.flueType}
            </li>
            <li>
              <strong>Трансмиссия:</strong> {singleCar?.transmission}
            </li>
            <li>
              <strong>Привод:</strong> {singleCar?.driveType}
            </li>
            <li>
              <strong>Мест:</strong> {singleCar?.numberOfSeats}
            </li>
            <li>
              <strong>В наличии:</strong>{" "}
              {singleCar?.hasCarInStock ? "Да" : "Нет"}
            </li>
            <li>
              <strong>Цена за сутки: </strong> {singleCar?.rentPrice} руб
            </li>
          </CarInfoList>
        </section>

        <StyledBtnsWrapper>
          <StyledButton onClick={handleOpenModal}>Забронировать</StyledButton>
          <StyledButton onClick={() => navigate(PATHS.USER.PAGE)}>
            Назад
          </StyledButton>
        </StyledBtnsWrapper>
      </StyledRightBar>
      <BaseModal open={isOpen} onClose={handleCloseModal}>
        {role === "GUEST" ? (
          <StyledBackInfo>
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
              }}
            >
              Чтобы забронировать вам сначала надо войти в аккаунт или
              зарегистрироваться!
            </Typography>
            <StyledBtnsWrapper>
              <StyledButton onClick={() => navigate(PATHS.SIGN_IN)}>
                Войти
              </StyledButton>
              <StyledButton onClick={() => navigate(PATHS.SIGN_UP)}>
                Зарегистрироваться
              </StyledButton>
            </StyledBtnsWrapper>
          </StyledBackInfo>
        ) : (
          <form>
            <Input label="Имя" />
            <Input label="Фамилия" />
            <Input label="Номер телефон" />
          </form>
        )}
      </BaseModal>
    </GalleryWrapper>
  );
};

const GalleryWrapper = styled("div")({
  padding: "80px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "200px",
});

const MainSlider = styled("div")({
  width: "100%",
  height: "100%",
  marginBottom: "20px",
  borderRadius: "12px",
  overflow: "hidden",

  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "12px",
  },
});

const ThumbsSlider = styled("div")({
  width: "100%",
  height: "80px",
  boxSizing: "border-box",

  "& .swiper-slide": {
    width: "80px !important",
    height: "80px",
    opacity: 0.4,
    cursor: "pointer",
    borderRadius: "8px",
    overflow: "hidden",
    transition: "opacity 0.3s ease",
  },

  "& .swiper-slide-thumb-active": {
    opacity: 1,
    border: "2px solid #007aff",
  },

  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "8px",
  },
});

const StyledBtnsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 50px;
`;
const StyledButton = styled(Button)({
  width: "220px",
});

const StyledRightBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px;
`;
const StyledBackInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;
const CarInfoList = styled.ul`
  margin-top: 20px;
  padding: 0;
  list-style: none;
  font-size: 16px;
  line-height: 1.8;
  width: 100%;
  max-width: 400px;

  & li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  & strong {
    font-weight: 600;
    color: #333;
  }
`;
