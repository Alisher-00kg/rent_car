import { Paper, Typography } from "@mui/material";
import Input from "../components/UI/input/Input";
import styled from "styled-components";
import Button from "../components/UI/button/Button";
import { ErrorMessage } from "../components/UI/error/ErrorMessage";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { PATHS } from "../utils/constants/constants";

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    reset();
  };
  return (
    <StyledWrapper>
      <StyledInnerWrapper elevation={5}>
        <Typography
          variant="h5"
          sx={{
            color: "#1976d2",
          }}
        >
          Войти
        </Typography>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <InputWrapper>
            <Input
              placeholder="Введите почту ..."
              label="Почта"
              fullWidth
              {...register("email", {
                required: {
                  value: true,
                  message: "Обязательное поле",
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Недействительный адрес электронной почты",
                },
              })}
            />
            <ErrorMessage>{errors?.email?.message}</ErrorMessage>
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder="Введите пароль ..."
              label="Пароль"
              fullWidth
              {...register("password", {
                required: {
                  value: true,
                  message: "Обязательное поле",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
                  message:
                    "Должен содержать 6 символов: одну заглавную букву, одну строчную букву, одну цифру и один символ специального регистра.",
                },
              })}
            />
            <ErrorMessage>{errors?.password?.message}</ErrorMessage>
          </InputWrapper>
          <StyledButton type="submit">Вход</StyledButton>
          <Link to={PATHS.SIGN_UP}>Зарегистрироваться</Link>
        </StyledForm>
      </StyledInnerWrapper>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledInnerWrapper = styled(Paper)(() => ({
  "&.MuiPaper-root ": {
    width: "400px",
    height: "fit-content",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "50px",
    borderRadius: "12px",
  },
}));

const StyledForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
`;

const InputWrapper = styled.div`
  width: 100%;
  position: relative;
`;
const StyledButton = styled(Button)`
  margin-top: 25px !important;
  width: 100%;
`;
