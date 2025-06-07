import { useDispatch } from "react-redux";
import { BaseModal } from "./BaseModal";
import { Controller, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadDocuments } from "../../../store/thunks/usersThunk";
import { getAllCars, updateCarFromAdmin } from "../../../store/thunks/allCars";
import { toast } from "react-toastify";
import Input from "../input/Input";
import { styled as muiStyled } from "@mui/material/styles";
import { Box, IconButton, Typography } from "@mui/material";
import {
  brandOptions,
  categoryOptions,
  driveTypeOptions,
  fuelTypeOptions,
  transmissionOptions,
} from "../../../utils/constants/admin-create-card/options";
import { Icons } from "../../../assets";
import Button from "../button/Button";
import { Select } from "../select/Select";
import styled from "styled-components";

export const EditCarModal = ({ open, onClose, car }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: car,
  });

  const [images, setImages] = useState(car.images || []);
  const [newFiles, setNewFiles] = useState([]);

  useEffect(() => {
    reset(car);
    setImages(car.images || []);
    setNewFiles([]);
  }, [car, reset]);

  const onDrop = useCallback((acceptedFiles) => {
    setNewFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
    multiple: true,
    maxFiles: 4 - images.length - newFiles.length,
  });

  const deleteImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const deleteNewFile = (index) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    try {
      let uploadedUrls = [];
      if (newFiles.length > 0) {
        uploadedUrls = await dispatch(uploadDocuments(newFiles)).unwrap();
      }

      const updatedImages = [...images, ...uploadedUrls];

      await dispatch(
        updateCarFromAdmin({
          id: car.id,
          data: { ...data, images: updatedImages },
        })
      );
      await dispatch(getAllCars());
      toast.success("Данные успешно обновлены!");
      onClose();
    } catch (error) {
      toast.error("Ошибка при обновлении:", error);
    }
  };

  return (
    <BaseModal open={open} onClose={onClose}>
      <StyledBox>
        <Typography sx={{ textAlign: "center", mb: "30px" }} variant="h5">
          Редактирование данных карточки
        </Typography>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <StyledSelect
                label="Категория"
                required
                options={categoryOptions}
                {...field}
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />
          <Controller
            name="brand"
            control={control}
            render={({ field }) => (
              <StyledSelect
                label="Марка"
                required
                options={brandOptions}
                {...field}
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />
          <StyledInput
            required
            inputLabel="Модель"
            {...register("model")}
            fullWidth
          />
          <StyledInput
            required
            inputLabel="Цвет"
            {...register("color")}
            fullWidth
          />
          <StyledInput
            required
            inputLabel="Год выпуска"
            {...register("yearOfRelease")}
            fullWidth
          />
          <StyledInput
            required
            inputLabel="Страна производства"
            {...register("madeInCountry")}
            fullWidth
          />
          <StyledInput
            required
            inputLabel="Цена"
            {...register("rentPrice")}
            fullWidth
          />
          <Controller
            name="fuelType"
            control={control}
            render={({ field }) => (
              <StyledSelect
                label="Тип топлива"
                required
                options={fuelTypeOptions}
                {...field}
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />
          <StyledInput
            required
            inputLabel="Количество сидений"
            {...register("numberOfSeats")}
            fullWidth
          />
          <Controller
            name="transmission"
            control={control}
            render={({ field }) => (
              <StyledSelect
                label="Трансмиссия"
                required
                options={transmissionOptions}
                {...field}
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />
          <Controller
            name="driveType"
            control={control}
            render={({ field }) => (
              <StyledSelect
                label="Тип привода"
                required
                options={driveTypeOptions}
                {...field}
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />
          <Box sx={{ mt: 2, mb: 1 }}>
            <p>Текущие изображения:</p>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {images.map((url, i) => (
                <Box key={i} sx={{ position: "relative" }}>
                  <img
                    src={url}
                    alt={`image-${i}`}
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      borderRadius: 4,
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => deleteImage(i)}
                    sx={{ position: "absolute", top: 0, right: 0 }}
                  >
                    <Icons.DeleteDropZoneImage />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>
          {newFiles.length > 0 && (
            <Box sx={{ mt: 1, mb: 1 }}>
              <p>Новые изображения:</p>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {newFiles.map((file, i) => (
                  <Box key={i} sx={{ position: "relative" }}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`new-file-${i}`}
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => deleteNewFile(i)}
                      sx={{ position: "absolute", top: 0, right: 0 }}
                    >
                      <Icons.DeleteDropZoneImage />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
          {images.length + newFiles.length < 4 && (
            <Box
              {...getRootProps()}
              sx={{
                border: "2px dashed #266bd3",
                borderRadius: 2,
                cursor: "pointer",
                height: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 2,
              }}
            >
              <input {...getInputProps()} />
              <Icons.DropClick style={{ width: 60, height: 60 }} />
              <p style={{ marginLeft: 10 }}>Добавить изображения</p>
            </Box>
          )}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            Сохранить изменения
          </Button>
        </StyledForm>
      </StyledBox>
    </BaseModal>
  );
};
const StyledInput = muiStyled(Input)({
  "& .MuiInputBase-input": {
    height: "39px !important",
  },
  "& input": {
    fontSize: "18px",
    fontWeight: 600,
    height: "39px",
    padding: "8px 14px",
    boxSizing: "border-box",
  },
  "& input::placeholder": {
    fontWeight: 400,
    fontSize: "14px",
    color: "#999",
  },
});
const StyledSelect = muiStyled(Select)({
  "& .MuiFormLabel-root": {
    height: "39px",
  },
  "& .MuiSelect-select": {
    fontSize: "18px",
    fontWeight: 600,
  },
  "& .MuiInputLabel-root": {
    fontSize: "14px",
    fontWeight: 500,
  },
  "& .MuiMenuItem-root": {
    fontSize: "16px",
  },
});
const StyledForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 30px;
  & .top_info {
    width: 100%;
    display: flex;
    justify-content: start;
    font-size: 24px;
  }
`;
const StyledBox = muiStyled(Box)({
  maxHeight: "80vh",
  overflowY: "auto",
  padding: 2,
  width: "100%",
});
