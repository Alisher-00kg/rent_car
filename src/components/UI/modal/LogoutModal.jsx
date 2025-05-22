import { styled } from "@mui/material";
import Button from "../button/Button";
import { useDispatch } from "react-redux";
import { logOut } from "../../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../utils/constants/constants";

export const LogoutModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logOut());
    navigate(PATHS.SIGN_IN, { replace: true });
    onClose();
  };

  return (
    <StyledModalka>
      <p>Вы уверены, что хотите выйти?</p>
      <StyledContainerModal>
        <StyledCanel variant="" onClick={onClose}>
          Отменить
        </StyledCanel>
        <StyledGetOut variant="text" onClick={handleLogOut}>
          Выйти
        </StyledGetOut>
      </StyledContainerModal>
    </StyledModalka>
  );
};

const StyledModalka = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  padding: "20px 50px",

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
  borderRadius: "6px",
  border: "1px solid #03045e",
  color: "#03045e",
  fontSize: "14px",
}));
const StyledGetOut = styled(Button)(() => ({
  width: "120px",
  height: "43px",
  backgroundColor: "#03045e",
  color: "#FFFFFF",
  fontSize: "14px",
  borderRadius: "6px",
  "&:hover": {
    color: "#FFFFFF",
  },
}));
