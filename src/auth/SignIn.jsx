import { IconButton, InputAdornment, Paper, Typography } from "@mui/material";
import Input from "../components/UI/input/Input";
import styled from "styled-components";
import Button from "../components/UI/button/Button";
import { ErrorMessage } from "../components/UI/error/ErrorMessage";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../utils/constants/constants";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signInThunk } from "../store/thunks/authThunk";

export const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(signInThunk({ userData: data, navigate }));
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
              type="email"
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
            <StyledTextField
              placeholder="Введите пароль ..."
              label="Пароль"
              type={showPassword ? "text" : "password"}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <FaRegEye style={{ backgroundColor: "transparent" }} />
                      ) : (
                        <FaRegEyeSlash />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
          <StyledButton type="submit" variant={"contained"}>
            Вход
          </StyledButton>
          <StyledInfoText>
            <p>Создать аккаунт?</p>
            <StyledLink to={PATHS.SIGN_UP}>Зарегистрироваться</StyledLink>
            <StyledLink to={PATHS.RESET_PASSWORD} className="red">
              Сбросить пароль
            </StyledLink>
          </StyledInfoText>
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
const StyledInfoText = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    color: #1976d2;
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: 600;
  color: #1976d2;
  &.red {
    color: red;
  }
`;
const InputWrapper = styled.div`
  width: 100%;
  position: relative;
`;
const StyledButton = styled(Button)`
  margin-top: 25px !important;
  width: 100%;
`;
const StyledTextField = styled(Input)({
  "& .MuiInputBase-root": {
    backgroundColor: "#e7f0ff",
  },
});
