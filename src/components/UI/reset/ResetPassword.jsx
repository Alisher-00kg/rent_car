import { useState } from "react";
import styled from "styled-components";
import { Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import Input from "../input/Input";
import Button from "../button/Button";
import { firebaseAuth } from "../../config/firebase";
import { axiosInstance } from "../../../api/axiosInstance";
import { IconButton, InputAdornment } from "@mui/material";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../utils/constants/constants";

export const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async ({ email }) => {
    setLoading(true);
    setIsVisible(true);
    setEmail(email);
    try {
      await sendPasswordResetEmail(firebaseAuth, email);
      toast.success("Ссылка для сброса пароля отправлена на почту");
    } catch (error) {
      toast.error("Ошибка при отправке письма: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitNewPassword = async (formData) => {
    setLoading(true);
    try {
      const password = formData.password;

      const { data } = await axiosInstance.get(`/users?email=${email}`);

      if (data.length === 0) {
        toast.error("Пользователь с такой почтой не найден");
        return;
      }

      const userId = data[0].id;

      await axiosInstance.patch(`/users/${userId}`, {
        password,
      });
      reset();
      navigate(PATHS.SIGN_IN);
      toast.success("Пароль успешно обновлён в системе");
    } catch (error) {
      toast.error("Ошибка при обновлении пароля");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <StyledPaper elevation={3}>
        {isVisible ? (
          <>
            <Typography variant="h5" sx={{ color: "#1976d2" }}>
              Подтвердите новый пароль
            </Typography>
            <StyledForm onSubmit={handleSubmit(onSubmitNewPassword)}>
              <Input
                fullWidth
                placeholder="Введите ваш новый пароль"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: {
                    value: true,
                    message: "Обязательное поле",
                  },
                })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <span
                style={{
                  color: "red",
                  fontSize: "12px",
                }}
              >
                {errors?.password?.message}
              </span>
              <StyledButton type="submit" variant="contained">
                Подтвердить
              </StyledButton>
            </StyledForm>
          </>
        ) : (
          <>
            <Typography variant="h5" sx={{ color: "#1976d2" }}>
              Сброс пароля
            </Typography>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
              <Input
                fullWidth
                placeholder="Введите вашу почту"
                type="email"
                {...register("email", {
                  required: "Обязательное поле",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Неверный email",
                  },
                })}
              />
              <span
                style={{
                  color: "red",
                  fontSize: "12px",
                }}
              >
                {errors?.email?.message}
              </span>

              <StyledButton
                type="submit"
                variant="contained"
                disabled={loading}
              >
                {loading ? "Отправка..." : "Отправить ссылку"}
              </StyledButton>
            </StyledForm>
          </>
        )}
      </StyledPaper>
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

const StyledPaper = styled(Paper)`
  width: 400px;
  padding: 30px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;
