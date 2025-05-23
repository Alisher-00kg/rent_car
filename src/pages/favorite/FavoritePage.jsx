import { Typography } from "@mui/material";
import Button from "../../components/UI/button/Button";
import styled from "styled-components";

export const FavoritePage = () => {
  return (
    <StyledWrapper>
      <StyledHeader>
        <p>MainPage/Favorite</p>
        <Typography variant="h4">Избранное</Typography>
      </StyledHeader>
      <StyledMainContent>
        <StyledInnerBox>
          <p className="title">В ИЗБРАННОМ ПОКА ПУСТО</p>
          <p className="description">
            Воспользуйтесь поиском, выберите нужные товары и добавьте их в
            избранное!
          </p>
          <Button>К аренде</Button>
        </StyledInnerBox>
      </StyledMainContent>
    </StyledWrapper>
  );
};
const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 50px 120px;
`;
const StyledHeader = styled.header`
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 40px;
  border-bottom: 2px solid #cdcdcd;
`;
const StyledMainContent = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
    /* font-weight: ; */
  }
`;
