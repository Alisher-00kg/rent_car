import { useState } from "react";
import Button from "../button/Button";
import { Box, Typography } from "@mui/material";
import Input from "../input/Input";
import { BaseModal } from "./BaseModal";
import styled from "styled-components";
import { DateRangePickerField } from "../date-picker/DateRangePickerField";
import dayjs from "dayjs";

export const CreateDiscount = ({ isOpen, onClose }) => {
  const [selectedDates, setSelectedDates] = useState({
    startDate: dayjs().toDate(),
    endDate: dayjs().toDate(),
  });
  const [discountValue, setDiscountValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const handleShow = () => {
    if (!discountValue || !titleValue) {
      alert("Заполните все поля!");
    } else {
      const newDiscount = {
        discountId: new Date().toISOString(),
        nameOfDiscount: titleValue,
        percentage: discountValue,
        discountActive: true,
        startDate: dayjs(selectedDates.startDate).format("YYYY-MM-DD HH:mm"),
        endDate: dayjs(selectedDates.endDate).format("YYYY-MM-DD HH:mm"),
      };
      console.log(newDiscount);
      setDiscountValue("");
      setTitleValue("");
    }
  };

  return (
    <BaseModal open={isOpen} onClose={onClose}>
      <StyledWrapper>
        <header>
          <Typography variant="h4">Создать скидку</Typography>
        </header>
        <StyledMain>
          <StyledInnerWrapper>
            <Input
              label="Название скидки"
              type="text"
              fullWidth
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
            />
            <Input
              label="Размер скидки"
              type="text"
              fullWidth
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
            />
            <DateRangePickerField
              value={selectedDates}
              onChange={(range) => {
                setSelectedDates({ ...range });
              }}
            />
          </StyledInnerWrapper>

          <StyledButtonsWrapper>
            <Button variant="outlined" onClick={onClose}>
              Отменить
            </Button>
            <Button variant="contained" onClick={handleShow}>
              Добавить
            </Button>
          </StyledButtonsWrapper>
        </StyledMain>
      </StyledWrapper>
    </BaseModal>
  );
};
const StyledWrapper = styled.div`
  width: 544px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const StyledMain = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const StyledButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 40px;
  justify-content: center;
`;
const StyledInnerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;
