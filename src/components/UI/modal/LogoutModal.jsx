import { styled } from "@mui/material";
import Button from "../button/Button";

export const LogoutModal = ({ onClose }) => {
  return (
    <StyledModalka>
      <p>Вы уверены, что хотите выйти?</p>
      <StyledContainerModal>
        <StyledCanel variant="" onClick={onClose}>
          Отменить
        </StyledCanel>
        <StyledGetOut variant="text"> Выйти</StyledGetOut>
      </StyledContainerModal>
    </StyledModalka>
  );
};

const StyledModalka = styled("div")(() => ({
  width: "458px",
  height: "100px",
  display: "flex",
  flexDirection: "column",
  gap: "30px",

  "& p": {
    textAlign: "center",
    fontSize: "18px",
    color: "#000000",
  },
}));
const StyledContainerModal = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  gap: "20px",
}));
const StyledCanel = styled(Button)(() => ({
  width: "116px",
  height: "42px",
  borderRadius: "10px",
  border: "1px solid #959595",
  color: "#959595",
  "&:hover": {
    color: "#959595",
  },
}));
const StyledGetOut = styled(Button)(() => ({
  width: "88px",
  height: "42px",
  backgroundColor: "#0079BF",
  color: "#FFFFFF",
  fontSize: "14px",
  borderRadius: "10px",
  "&:hover": {
    color: "#FFFFFF",
  },
}));
