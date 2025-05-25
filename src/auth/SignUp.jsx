import { IconButton, InputAdornment, Paper, Typography } from "@mui/material";
import Input from "../components/UI/input/Input";
import Button from "../components/UI/button/Button";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PATHS } from "../utils/constants/constants";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../components/UI/error/ErrorMessage";
import { useGetAllQuery, useSignUpMutation } from "../store/api/auth.service";

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signUp] = useSignUpMutation();
  const { data } = useGetAllQuery();
  console.log(data);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    const signUpData = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      role: "USER", // или можете сделать это динамическим
      localDate: new Date().toISOString().split("T")[0], // текущая дата в формате YYYY-MM-DD
    };

    signUp(signUpData);
    // reset();
  };

  return (
    <StyledWrapper>
      <StyledInnerWrapper elevation={3}>
        <Typography
          variant="h5"
          sx={{
            color: "#1976d2",
          }}
        >
          Регистрация
        </Typography>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <InputWrapper>
            <Input
              label="Имя"
              fullWidth
              placeholder="Имя"
              type="text"
              {...register("name", {
                required: {
                  value: true,
                  message: "Обязательное поле",
                },
              })}
            />
            <ErrorMessage>{errors?.name?.message}</ErrorMessage>
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Почта"
              fullWidth
              type="email"
              placeholder="Почта"
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
              label="Пароль"
              fullWidth
              placeholder="Пароль"
              type={showPassword ? "text" : "password"}
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
                minLength: {
                  value: 6,
                  message: "Пароль должен содержать минимум 6 символов",
                },
              })}
            />
            <ErrorMessage>{errors?.password?.message}</ErrorMessage>
          </InputWrapper>
          <InputWrapper>
            <StyledTextField
              label="Подтвердите пароль"
              fullWidth
              placeholder="Подтвердите пароль"
              type={showConfirmPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      {showConfirmPassword ? (
                        <FaRegEye style={{ backgroundColor: "transparent" }} />
                      ) : (
                        <FaRegEyeSlash />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Обязательное поле",
                },
                validate: (value) =>
                  value === password || "Пароли не совпадают",
              })}
            />
            <ErrorMessage>{errors?.confirmPassword?.message}</ErrorMessage>
          </InputWrapper>
          <StyledButton type="submit">Зарегистрироваться</StyledButton>
          <StyledInfoText>
            <p>У вас уже есть аккаунт?</p>
            <StyledLink to={PATHS.SIGN_IN}>Войти</StyledLink>
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
  align-items: center;
  justify-content: center;
  p {
    color: #1976d2;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: 600;
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
