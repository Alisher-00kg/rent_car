import { useState } from "react";
import Button from "../button/Button";
import { Typography } from "@mui/material";
import Input from "../input/Input";
import { BaseModal } from "./BaseModal";
import styled from "styled-components";
import { DateRangePickerField } from "../date-picker/DateRangePickerField";
import dayjs from "dayjs";
import { updateCarsDiscount } from "../../../store/thunks/allCars";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export const CreateDiscount = ({
  isOpen,
  onClose,
  selectedIds,
  setSelectedIds,
}) => {
  const [selectedDates, setSelectedDates] = useState({
    startDate: dayjs().toDate(),
    endDate: dayjs().toDate(),
  });
  const [discountValue, setDiscountValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const dispatch = useDispatch();

  const isFormValid = () => {
    const discountNum = Number(discountValue);
    return (
      titleValue.trim() !== "" &&
      !isNaN(discountNum) &&
      discountNum > 0 &&
      discountNum <= 100 &&
      dayjs(selectedDates.startDate).isBefore(dayjs(selectedDates.endDate))
    );
  };

  const buildDiscountData = () => ({
    discountId: new Date().toISOString(),
    nameOfDiscount: titleValue.trim(),
    percentage: Number(discountValue),
    discountActive: true,
    startDate: dayjs(selectedDates.startDate).format("YYYY-MM-DD HH:mm"),
    endDate: dayjs(selectedDates.endDate).format("YYYY-MM-DD HH:mm"),
  });

  const handleCreate = async () => {
    if (!isFormValid()) {
      toast.info(
        "Заполните корректно все поля! Скидка должна быть числом от 1 до 100. Даты должны быть корректными."
      );
      return;
    }
    const discountData = buildDiscountData();

    try {
      await dispatch(
        updateCarsDiscount({
          carIds: selectedIds,
          discount: discountData,
        })
      ).unwrap();
      setDiscountValue("");
      setTitleValue("");
      setSelectedIds([]);
      onClose();
    } catch (error) {
      toast.error("Ошибка при применении скидок: " + error);
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
              label="Размер скидки (%)"
              type="number"
              fullWidth
              inputProps={{ min: 1, max: 100 }}
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
            <Button
              variant="contained"
              onClick={handleCreate}
              disabled={!isFormValid()}
            >
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
