import styled from "styled-components";
import Input from "../../components/UI/input/Input";
import Button from "../../components/UI/button/Button";
import { CiSearch } from "react-icons/ci";
import { IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import { CreateDiscount } from "../../components/UI/modal/CreateDiscount";
import { PATHS } from "../../utils/constants/constants";
import { useNavigate } from "react-router-dom";

import { styled as muistyled } from "@mui/material";
import { CARS } from "../../utils/constants/constants";
import Card from "../../components/UI/card/Card";
import ChoseUs from "../../components/chose-us/ChoseUs";
import Slider from "../../components/swiper/Slider";
import { imageArray } from "../../utils/constants/carsSlider";
export const AdminPage = () => {
  const [cars, setCars] = useState(CARS);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <StyledWrapper>
      <StyledInnerPanel>
        <StyledInput
          placeholder="Поис по названию или ..."
          borderradius="11px"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <CiSearch />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <StyledWrapperButtons>
          <StyledButton
            variant="outlined"
            onClick={() => navigate(PATHS.ADMIN.CREATE)}
          >
            Добавить карточку
          </StyledButton>
          <StyledButton variant="outlined" onClick={handleOpenModal}>
            Создать скидку
          </StyledButton>
        </StyledWrapperButtons>
      </StyledInnerPanel>
      <CreateDiscount isOpen={isOpen} onClose={handleCloseModal} />
      <div style={{ display: "flex", flexDirection: "column", gap: "100px" }}>
        <StyledUl>
          {cars.map((item) => (
            <Card key={item.fuel} {...item} />
          ))}
        </StyledUl>
      </div>
    </StyledWrapper>
  );
};
const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 200px;
`;
const StyledInnerPanel = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StyledInput = styled(Input)`
  width: 550px;
`;
const StyledButton = styled(Button)({
  width: "fit-content",
  fontSize: "16px",
  textTransform: "capitalize !important",
});
const StyledWrapperButtons = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 20px;
`;
const StyledUl = muistyled("ul")({
  width: "100%",
  display: "flex",
  gap: "50px",  
});
