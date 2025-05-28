import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/UI/button/Button";
import { PATHS } from "../../utils/constants/constants";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/UI/input/Input";
import { BaseModal } from "../../components/UI/modal/BaseModal";
import { IconButton, Typography } from "@mui/material";
import { getAllCars, getSingleCar } from "../../store/thunks/allCars";
import { Icons } from "../../assets";
import Card from "../../components/UI/card/Card";
import { BreadCrumbs } from "../../components/UI/breadcrumbs/BreadCrumbs";

export const InnerCardPage = () => {
  const navigate = useNavigate();
  const { carId } = useParams();
  const { role } = useSelector((state) => state.auth);
  const { singleCar, cars } = useSelector((state) => state.allCars);
  const [isOpen, setIsOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  const dispatch = useDispatch();
  console.log(singleCar);
  console.log(carId);

  useEffect(() => {
    if (carId) {
      dispatch(getSingleCar(carId));
    }
  }, [carId, dispatch]);

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const handleReservation = () => {};
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleNavigateToBack = () => {
    switch (role) {
      case "USER":
        return navigate(PATHS.USER.PAGE);
      default:
        return navigate(PATHS.GUEST.PAGE);
    }
  };
  const aboutCar = [
    {
      text: "Категория:",
      value: singleCar?.category,
    },
    {
      text: "Цвет:",
      value: singleCar?.color,
    },
    {
      text: "Год выпуска:",
      value: singleCar?.yearOfRelease,
    },
    {
      text: "Производство:",
      value: singleCar?.madeInCountry,
    },
    {
      text: "Тип топлива:",
      value: singleCar?.flueType,
    },
    {
      text: "Трансмиссия:",
      value: singleCar?.transmission,
    },
    {
      text: "Привод:",
      value: singleCar?.driveType,
    },
    {
      text: "Мест:",
      value: singleCar?.numberOfSeats,
    },
    {
      text: "В наличии:",
      value: singleCar?.hasCarInStock ? "Да" : "Нет",
    },
    {
      text: "Цена за сутки:",
      value: `${singleCar?.rentPrice}руб`,
    },
  ];

  function getRouteByRole(car) {
    switch (role) {
      case "USER":
        return [
          {
            label: "Главная",
            href: "/user/user-page",
          },
          {
            label: `${car.brand}  ${car.model}`,
            href: `/user/user-page/${car.id}`,
          },
        ];
        break;
      case "ADMIN":
        return [
          {
            label: "Главная",
            href: "/admin/admin-page",
          },
          {
            label: `${car.brand}  ${car.model}`,
            href: `/admin/admin-page/${car.id}`,
          },
        ];
      default:
        return [
          {
            label: "Главная",
            href: "/guest/main-page",
          },
          {
            label: "Избранное",
            href: "/guest/favorite",
          },
        ];
    }
  }
  return (
    <StyledMainWrapper>
      <StyledInnerWrapper>
        <StyledCap>
          <BreadCrumbs breadcrumbs={getRouteByRole(singleCar)} />
          <StyledIconButton onClick={handleNavigateToBack}>
            <Icons.ChevronLeft /> Назад
          </StyledIconButton>
        </StyledCap>
        <GalleryWrapper>
          <div className="title_wrapper">
            <p className="title">
              {singleCar?.brand} {singleCar?.model}
            </p>
          </div>
          <article className="main_container">
            <div>
              <WrapperSlider>
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
                        <img
                          src={img}
                          alt={`Slide ${index}`}
                          className="main_slide_img"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </MainSlider>
              </WrapperSlider>

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
                <CarInfoList>
                  {aboutCar?.map(({ text, value }, index) => (
                    <li key={index}>
                      <span className="label">{text}</span>
                      <span className="dots" />
                      <span className="value">{value}</span>
                    </li>
                  ))}
                </CarInfoList>
              </section>
              <LowerLayout>
                <StyledButton onClick={handleOpenModal} variant={"contained"}>
                  Забронировать
                </StyledButton>
                <IconButton>
                  <StyledHeart />
                </IconButton>
              </LowerLayout>
            </StyledRightBar>
          </article>

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
              <FormBook>
                <Input label="Имя" />
                <Input label="Фамилия" />
                <Input label="Номер телефон" />
                <Button variant="contained">Забронировать</Button>
              </FormBook>
            )}
          </BaseModal>
        </GalleryWrapper>
      </StyledInnerWrapper>
      <StyledAnotherInfo>
        <StyledSection>
          <p className="friends_title">Поделиться с друзьями</p>
          <nav className="friends_navigation">
            <IconButton>
              <Icons.WhatsAppNav />
            </IconButton>
            <IconButton>
              <Icons.Telegram />
            </IconButton>
            <IconButton>
              <Icons.Instagram />
            </IconButton>
            <IconButton>
              <Icons.TikTok />
            </IconButton>
            <IconButton>
              <Icons.FaceBook />
            </IconButton>
          </nav>
        </StyledSection>
        <StyledArticle>
          <p className="similar_title">Похожие объявления</p>
          <StyledUl>
            {cars?.slice(0, visibleCount).map((item, index) => (
              <Card key={item.id || index} {...item} />
            ))}
          </StyledUl>
          {visibleCount < cars.length && (
            <Button
              variant="showmore"
              onClick={() => setVisibleCount((prev) => prev + 4)}
            >
              Посмотреть еще
            </Button>
          )}
        </StyledArticle>
      </StyledAnotherInfo>
    </StyledMainWrapper>
  );
};
const StyledMainWrapper = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "109px",
  padding: "0px 90px",
});
const StyledInnerWrapper = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "63px",
});
const GalleryWrapper = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "start",
  gap: "20px",
  "& .title_wrapper": {
    width: "100%",
    textAlign: "start",
    paddingLeft: "15px",
    "& .title": {
      fontSize: "34px",
    },
  },
  "& .main_container": {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "108px",
  },
});

const MainSlider = styled("div")({
  width: "100%",
  height: "100%",
  marginBottom: "20px",
  borderRadius: "12px",
  overflow: "hidden",

  "& .main_slide_img": {
    maxWidth: "760px",
    minHeight: "450px",
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
  "&.MuiButtonBase-root": {
    height: "40px !important",
  },
});

const StyledRightBar = styled.div`
  position: relative;
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  padding: 20px;
  border-radius: 8px;
`;
const LowerLayout = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "40px",
});
const StyledBackInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;
const CarInfoList = styled.ul`
  font-size: 18px;
  width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  color: #282828;
  & li {
    display: flex;
    align-items: center;
    width: 100%;
  }
  .label {
    white-space: nowrap;
    flex-shrink: 0;
  }

  .dots {
    flex-grow: 1;
    border-bottom: 1px dotted #ccc;
    height: 1px;
    margin: 0 8px;
    overflow: hidden;
  }

  .value {
    white-space: nowrap;
    flex-shrink: 0;
  }
`;

const StyledIconButton = styled("div")({
  display: "flex",
  alignItems: "center",
  color: "#03045e",
  cursor: "pointer",
  paddingTop: "72px",
  "& svg path": {
    color: "#03045e",
  },
});

const StyledCap = styled("nav")({
  width: "100%",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});
const StyledHeart = styled(Icons.WhiteHeart)({
  width: "34px",
  height: "34px",
  stroke: "#000",
  transition: "transform 0.4s ease-out",
  "&:hover": {
    transform: "scale(1.2)",
  },
});
const WrapperSlider = styled("div")({
  width: "760px",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  gap: "24px",
});
const StyledAnotherInfo = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  gap: "80px",
});
const StyledSection = styled("section")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  gap: "26px",
  "& .friends_title": {
    fontSize: "30px",
    color: "#282828",
    fontWeight: "700",
  },
  "& .friends_navigation": {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
});
const StyledArticle = styled("article")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  gap: "65px",
  "& .similar_title": {
    fontSize: "34px",
    color: "#282828",
    fontWeight: "700",
  },
});
const StyledUl = styled("ul")({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "30px",
  flexWrap: "wrap",
});

const FormBook = styled("form")({
  width: "285px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  margin: "20px 10px",
});
