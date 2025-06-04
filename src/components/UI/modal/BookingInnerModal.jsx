import { styled } from "@mui/material";
import Input from "../input/Input";
import Button from "../button/Button";
import { styled as muiStyled } from "@mui/material/styles";
import { DateRangePickerField } from "../date-picker/DateRangePickerField";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { postBookingCar } from "../../../store/thunks/allCars";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { getSingleUserData } from "../../../store/thunks/usersThunk";

export const BookingInnerModal = ({ onSuccess, car }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.allUsers);
  const defaultValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    pickupLocation: "",
    comment: "",
    returnLocation: "",
    car: "",
    rentPrice: 0,
    bookingStatus: "В обработке",
    payment: "Карта",
    dateRange: {
      startDate: new Date(),
      endDate: new Date(),
    },
    agreeToTerms: false,
  };

  const prepareFormValues = (user, car) => ({
    ...defaultValues,
    id: user?.id ? user.id - 1 : undefined,
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phoneNumber: user?.phoneNumber || "",
    car: car ? `${car.brand} ${car.model}` : "",
    rentPrice: car?.rentPrice || 0,
    bookingStatus: "В обработке",
  });
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    reset,
  } = useForm({ defaultValues });

  useEffect(() => {
    const auth = Cookies.get("auth");
    if (auth) {
      const userData = JSON.parse(auth);
      if (!user?.id && userData?.data?.id) {
        dispatch(getSingleUserData(userData.data.id));
      }
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      reset(prepareFormValues(user, car));
    }
  }, [user, car, reset]);

  const onSubmit = (data) => {
    dispatch(postBookingCar(data));
    onSuccess();
    reset(prepareFormValues(user, car));
  };

  return (
    <FormBook onSubmit={handleSubmit(onSubmit)}>
      <StyledInputWrapper>
        <StyledInput
          required
          inputLabel="Имя"
          placeholder="Введите имя"
          {...register("firstName", { required: "Имя обязательно" })}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
      </StyledInputWrapper>

      <StyledInputWrapper>
        <StyledInput
          required
          inputLabel="Фамилия"
          placeholder="Введите фамилию"
          {...register("lastName", { required: "Фамилия обязательна" })}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
      </StyledInputWrapper>

      <StyledInputWrapper>
        <StyledInput
          required
          inputLabel="Телефон"
          placeholder="+7 ( _ _ _ ) - _ _ _ - _ _ - _ _"
          {...register("phoneNumber", { required: "Телефон обязателен" })}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
        />
      </StyledInputWrapper>

      <StyledInputWrapper>
        <StyledInput
          required
          inputLabel="Стартовый адрес"
          placeholder="Введите адрес"
          {...register("pickupLocation", {
            required: "Введите стартовый адрес",
          })}
          error={!!errors.pickupLocation}
          helperText={errors.pickupLocation?.message}
        />
      </StyledInputWrapper>

      <StyledInputWrapper>
        <StyledInput
          required
          inputLabel="Конечный адрес"
          placeholder="Введите адрес"
          {...register("returnLocation", {
            required: "Введите конечный адрес",
          })}
          error={!!errors.returnLocation}
          helperText={errors.returnLocation?.message}
        />
      </StyledInputWrapper>

      <StyledInputWrapper>
        <Controller
          name="dateRange"
          control={control}
          rules={{
            validate: (value) =>
              value.startDate && value.endDate ? true : "Выберите обе даты",
          }}
          render={({ field }) => (
            <DateRangePickerField
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        {errors.dateRange && (
          <span style={{ color: "red", fontSize: "12px" }}>
            {errors.dateRange.message}
          </span>
        )}
      </StyledInputWrapper>

      <StyledInputWrapper>
        <label htmlFor="comment">Комментарий</label>
        <textarea
          id="comment"
          {...register("comment")}
          rows={3}
          style={{
            width: "100%",
            borderRadius: "6px",
            padding: "10px",
            fontFamily: "inherit",
          }}
        />
      </StyledInputWrapper>
      <StyledCheckboxWrapper>
        <input
          type="checkbox"
          id="rules"
          {...register("agreeToTerms", {
            required: "Вы должны согласиться с правилами",
          })}
        />
        <label htmlFor="rules">
          Я согласен с
          <a href="/rules" target="_blank">
            правилами
          </a>
        </label>
        {errors.agreeToTerms?.message && (
          <span style={{ color: "red", fontSize: "12px" }}>
            {errors.agreeToTerms.message}
          </span>
        )}
      </StyledCheckboxWrapper>

      <Button variant="contained" type="submit">
        Забронировать
      </Button>
    </FormBook>
  );
};

const FormBook = styled("form")({
  width: "500px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  margin: "20px 10px",
});

const StyledInputWrapper = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  gap: "12px",
  "& label": {
    color: "#00000099",
    "& em": {
      color: "red",
      fontStyle: "normal",
    },
  },
});

const StyledInput = muiStyled(Input)({
  "& .MuiInputBase-input": {
    width: "100%",
    height: "39px !important",
  },
  "& input": {
    width: "100%",
    height: "39px",
    padding: "8px 14px",
    boxSizing: "border-box",
  },
});
const StyledCheckboxWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontSize: "14px",
  "& input": {
    width: "18px",
    height: "18px",
  },
  "& label": {
    color: "#000",
    cursor: "pointer",
    "& a": {
      color: "#007BFF",
      textDecoration: "underline",
    },
  },
});
