import { IconButton, Typography } from "@mui/material";
import Button from "../../components/UI/button/Button";
import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import { Icons } from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { PATHS } from "../../utils/constants/constants";
import Card from "../../components/UI/card/Card";
import { getAllCars } from "../../store/thunks/allCars";
import { BreadCrumbs } from "../../components/UI/breadcrumbs/BreadCrumbs";

export const FavoritePage = () => {
  const { cars } = useSelector((state) => state.allCars);
  const { role } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);
  const handleNavigateToBack = () => {
    switch (role) {
      case "USER":
        return navigate(PATHS.USER.PAGE);
      default:
        return navigate(PATHS.GUEST.PAGE);
    }
  };
  function getRouteByRole() {
    switch (role) {
      case "USER":
        return [
          {
            label: "Главная",
            href: "/user/user-page",
          },
          {
            label: "Избранное",
            href: "/user/favorite",
          },
        ];
      default:
        return role;
    }
  }
  return (
    <StyledWrapper>
      <StyledHeader>
        <BreadCrumbs breadcrumbs={getRouteByRole()} />
        <Typography variant="h4">Избранное</Typography>
      </StyledHeader>
      <StyledMainContent>
        {cars?.length === 0 ? (
          <StyledEmptyBlock>
            <StyledEmptyIcon />
            <StyledInnerBox>
              <p className="title">В ИЗБРАННОМ ПОКА ПУСТО</p>
              <p className="description">
                Воспользуйтесь поиском, выберите нужные товары и добавьте их в
                избранное!
              </p>
              <StyledButton variant="contained" onClick={handleNavigateToBack}>
                К аренде
              </StyledButton>
            </StyledInnerBox>
          </StyledEmptyBlock>
        ) : (
          <StyledMainCardsBlock>
            <StyledIconButton>
              <Icons.XSymbol /> Очистить список машин
            </StyledIconButton>
            <StyledUl>
              {cars?.slice(0).map((item) => (
                <Card key={item.id} {...item} />
              ))}
            </StyledUl>
            <nav className="navigation_btn">
              <StyledButton variant="outlined" onClick={handleNavigateToBack}>
                К главной
              </StyledButton>
            </nav>
          </StyledMainCardsBlock>
        )}
      </StyledMainContent>
    </StyledWrapper>
  );
};
const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 0px 90px;
`;
const StyledHeader = styled.header`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: start;
  border-bottom: 2px solid #cdcdcd;
  padding-bottom: 15px;
`;
const StyledMainContent = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;
const StyledInnerBox = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  &.title {
    font-weight: 600;
    font-size: 24px;
  }
`;
const StyledButton = muiStyled(Button)({
  width: "240px !important",
});

const StyledEmptyIcon = styled(Icons.EmptyFavorite)`
  width: 800px;
  height: 320px;
`;
const StyledEmptyBlock = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  margin-top: 80px;
`;
const StyledUl = styled("ul")({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "30px",
  flexWrap: "wrap",
});
const StyledIconButton = muiStyled(IconButton)({
  "&.MuiButtonBase-root:hover": {
    background: "none",
  },
  "&.MuiButtonBase-root": {
    fontSize: "16px",
  },
});

const StyledMainCardsBlock = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 15px;
  margin-top: 40px;
  & .navigation_btn {
    width: 100%;
    text-align: center;
    margin-top: 30px;
  }
`;
