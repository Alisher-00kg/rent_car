import styled from "styled-components";
import Input from "../../components/UI/input/Input";
import Button from "../../components/UI/button/Button";
import { CiSearch } from "react-icons/ci";
import { IconButton, InputAdornment } from "@mui/material";
export const AdminPage = () => {
  return (
    <div>
      <StyledInnerPanel>
        <StyledInput
          placeholder="Поис по названию или ..."
          borderRadius="11px"
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
          <StyledButton variant="outlined">Добавить товар</StyledButton>
          <StyledButton variant="outlined">Создать скидку</StyledButton>
        </StyledWrapperButtons>
      </StyledInnerPanel>
    </div>
  );
};

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
  width: "180px",
  fontSize: "16px",
  textTransform: "capitalize !important",
});
const StyledWrapperButtons = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 20px;
`;
