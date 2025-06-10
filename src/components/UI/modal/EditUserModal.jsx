import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { BaseModal } from "./BaseModal";
import { toast } from "react-toastify";
import { Box, IconButton, Typography } from "@mui/material";
import Button from "../button/Button";
import Input from "../input/Input";
import styled from "styled-components";
import { Icons } from "../../../assets";
import { editUserProfile } from "../../../store/thunks/usersThunk";

export const EditUserModal = ({ open, onClose, user }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: user,
  });

  const [documents, setDocuments] = useState(user.documents || []);

  useEffect(() => {
    reset(user);
    setDocuments(user.documents || []);
  }, [user, reset]);

  const handleDeleteDocument = (index) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    try {
      const updatedUser = {
        ...data,
        documents,
      };

      await dispatch(
        editUserProfile({ userId: user.id, ...updatedUser })
      ).unwrap();

      toast.success("Профиль успешно обновлён");
      onClose();
    } catch (error) {
      toast.error("Ошибка при обновлении профиля");
    }
  };

  return (
    <BaseModal open={open} onClose={onClose}>
      <StyledBox>
        <Typography sx={{ textAlign: "center", mb: "30px" }} variant="h5">
          Редактирование пользователя
        </Typography>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <StyledInput
            inputLabel="Имя"
            required
            {...register("firstName")}
            fullWidth
          />
          <StyledInput
            inputLabel="Фамилия"
            required
            {...register("lastName")}
            fullWidth
          />
          <StyledInput
            inputLabel="Телефон"
            required
            {...register("phoneNumber")}
            fullWidth
          />
          <StyledInput
            inputLabel="Email"
            required
            type="email"
            {...register("email")}
            fullWidth
          />
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Документы:</Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {documents.map((doc, i) => (
                <Box key={i} sx={{ position: "relative" }}>
                  <img
                    src={doc}
                    alt={`doc-${i}`}
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      borderRadius: 4,
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteDocument(i)}
                    sx={{ position: "absolute", top: 0, right: 0 }}
                  >
                    <Icons.DeleteDropZoneImage />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            Сохранить изменения
          </Button>
        </StyledForm>
      </StyledBox>
    </BaseModal>
  );
};

const StyledBox = styled(Box)`
  padding: 20px;
  min-width: 550px;
  max-width: 90vw;
`;

const StyledForm = styled("form")`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledInput = styled(Input)`
  width: 100%;
`;
