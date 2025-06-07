import styled from "styled-components";
import { Icons } from "../../assets";
import { useCallback, useState } from "react";
import {
  brandOptions,
  categoryOptions,
  driveTypeOptions,
  fuelTypeOptions,
  transmissionOptions,
} from "../../utils/constants/admin-create-card/options";
import { useDropzone } from "react-dropzone";
import Button from "../../components/UI/button/Button";
import Input from "../../components/UI/input/Input";
import { Select } from "../../components/UI/select/Select";
import { IconButton } from "@mui/material";
import { BaseModal } from "../../components/UI/modal/BaseModal";
import { styled as muiStyled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { postNewCarCard } from "../../store/thunks/allCars";
import { uploadDocuments } from "../../store/thunks/usersThunk";

export const AdminCreateCard = () => {
  const initialCarValues = {
    category: categoryOptions[0].value,
    brand: brandOptions[0].value,
    model: "",
    color: "",
    yearOfRelease: "",
    madeInCountry: "",
    rentPrice: "",
    hasCarInStock: true,
    fuelType: fuelTypeOptions[0].value,
    numberOfSeats: "",
    transmission: transmissionOptions[0].value,
    driveType: driveTypeOptions[0].value,
    images: [],
  };

  const [carValues, setCarValues] = useState(initialCarValues);
  const [isOpen, setIsOpen] = useState(false);
  const [tempImages, setTempImages] = useState([]);
  const dispatch = useDispatch();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setCarValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const onDrop = (acceptedFiles) => {
    setTempImages((prev) => [...prev, ...acceptedFiles]);
  };
  const handleUploadImages = async () => {
    try {
      const uploadedUrls = await dispatch(uploadDocuments(tempImages)).unwrap();
      setCarValues((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));
      setTempImages([]);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при загрузке изображений");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop,
    multiple: true,
    maxFiles: 4,
  });

  const deleteTempImage = (indexToDelete) => {
    setTempImages((prev) => prev.filter((_, i) => i !== indexToDelete));
  };

  const handleResetForm = () => {
    setCarValues(initialCarValues);
    setTempImages([]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(carValues);
    dispatch(postNewCarCard(carValues));
    handleResetForm();
  };

  return (
    <StyledMainWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <div className="top_info">
          <p>Добавление карточки</p>
        </div>
        <StyledTopBox>
          <p className="image_title">
            Изображение <span>максимум 4 фото</span>
          </p>
          <div className="image_inner_block">
            <StyledIconButton onClick={() => setIsOpen(true)}>
              <StyledDropIcon />
            </StyledIconButton>
            <BaseModal open={isOpen} onClose={() => setIsOpen(false)}>
              <StyledInnerModalBox>
                <p className="drop_title">Загрузить баннер</p>
                <StyledDropedSection $imagesCount={tempImages.length}>
                  <div {...getRootProps()} className="drop_main_zone">
                    <input {...getInputProps()} />
                    <StyledDropIcon />
                  </div>
                  <div>
                    {tempImages.length > 0 && (
                      <StyledDownloadedImagesBox
                        $imagesCount={tempImages.length}
                      >
                        {tempImages.map((file, index) => (
                          <div key={index} className="downloaded_box">
                            <StyledDeleteIcon
                              onClick={() => deleteTempImage(index)}
                            />
                            <StyledDroppedImage
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index}`}
                            />
                          </div>
                        ))}
                      </StyledDownloadedImagesBox>
                    )}
                  </div>
                </StyledDropedSection>
                <ButtonsWrapper>
                  <Button
                    type="reset"
                    variant="outlined"
                    onClick={() => setIsOpen(false)}
                  >
                    Отменить
                  </Button>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={handleUploadImages}
                  >
                    Загрузить
                  </Button>
                </ButtonsWrapper>
              </StyledInnerModalBox>
            </BaseModal>
            <p>Добавьте изображение</p>
          </div>
        </StyledTopBox>
        <StyledInputWrapper>
          <StyledSelect
            label={
              <p className="label">
                Выберите категорию<em>*</em>
              </p>
            }
            value={carValues.category}
            onChange={(e) =>
              setCarValues({ ...carValues, category: e.target.value })
            }
            options={categoryOptions}
            name="category"
          />
        </StyledInputWrapper>
        <StyledInputWrapper>
          <StyledSelect
            label={
              <p className="label">
                Выберите марку<em>*</em>
              </p>
            }
            value={carValues.brand}
            onChange={handleChange}
            options={brandOptions}
            name="brand"
          />
        </StyledInputWrapper>
        <StyledInputWrapper>
          <StyledInput
            inputLabel={
              <p className="label">
                Модель<em>*</em>
              </p>
            }
            fullWidth
            placeholder="Введите модель"
            value={carValues.model}
            onChange={handleChange}
            name="model"
          />
        </StyledInputWrapper>
        <StyledInputWrapper>
          <StyledInput
            inputLabel={
              <p className="label">
                Цвет<em>*</em>
              </p>
            }
            fullWidth
            placeholder="Введите цвет"
            value={carValues.color}
            onChange={handleChange}
            name="color"
          />
        </StyledInputWrapper>
        <StyledInputWrapper>
          <StyledInput
            inputLabel={
              <p className="label">
                Год выпуска<em>*</em>
              </p>
            }
            fullWidth
            type="number"
            placeholder="Введите год выпуска"
            value={carValues.yearOfRelease}
            onChange={handleChange}
            name="yearOfRelease"
          />
        </StyledInputWrapper>
        <StyledInputWrapper>
          <StyledInput
            inputLabel={
              <p className="label">
                Страна производства<em>*</em>
              </p>
            }
            fullWidth
            placeholder="Введите страну производства"
            value={carValues.madeInCountry}
            onChange={handleChange}
            name="madeInCountry"
          />
        </StyledInputWrapper>
        <StyledInputWrapper>
          <StyledInput
            inputLabel={
              <p className="label">
                Сумма аренды<em>*</em>
              </p>
            }
            fullWidth
            placeholder="Введите сумму аренды"
            value={carValues.rentPrice}
            onChange={handleChange}
            name="rentPrice"
          />
        </StyledInputWrapper>
        <StyledInputWrapper>
          <Select
            label={
              <p className="label">
                Выберите тип топливо<em>*</em>
              </p>
            }
            value={carValues.fuelType}
            onChange={handleChange}
            options={fuelTypeOptions}
            name="fuelType"
          />
        </StyledInputWrapper>
        <StyledInputWrapper>
          <StyledInput
            inputLabel={
              <p className="label">
                Количество сидений<em>*</em>
              </p>
            }
            fullWidth
            type="number"
            placeholder="Введите количество сидений"
            value={carValues.numberOfSeats}
            onChange={handleChange}
            name="numberOfSeats"
          />
        </StyledInputWrapper>
        <StyledInputWrapper>
          <StyledSelect
            label={
              <p className="label">
                Выберите тип трансмиссии<em>*</em>
              </p>
            }
            value={carValues.transmission}
            onChange={handleChange}
            options={transmissionOptions}
            name="transmission"
          />
        </StyledInputWrapper>
        <StyledInputWrapper>
          <StyledSelect
            label={
              <p className="label">
                Выберите тип привода<em>*</em>
              </p>
            }
            value={carValues.driveType}
            onChange={handleChange}
            options={driveTypeOptions}
            name="driveType"
          />
        </StyledInputWrapper>
        <ButtonsWrapper>
          <StyledButton
            variant="outlined"
            type="reset"
            onClick={handleResetForm}
          >
            Очистить
          </StyledButton>
          <StyledButton type="submit" variant="contained">
            Создать
          </StyledButton>
        </ButtonsWrapper>
      </StyledForm>
    </StyledMainWrapper>
  );
};

const StyledMainWrapper = styled.div`
  width: fit-content;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
  background-color: #f3f3f3;
  margin: 0 auto;
  padding: 40px;
  border-radius: 12px;
`;
const StyledForm = styled.form`
  width: 610px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 28px;
  & .top_info {
    width: 100%;
    display: flex;
    justify-content: start;
    font-size: 24px;
  }
`;
const StyledTopBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 14px;
  & .image_title {
    display: flex;
    align-items: center;
    gap: 15px;
    span {
      color: #a9a9a9;
    }
  }
  & .image_inner_block {
    display: flex;
    align-items: center;
    gap: 16px;
    color: #266bd3;
  }
`;
const StyledDropIcon = styled(Icons.DropClick)`
  width: 135px;
  height: 135px;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 8px;
`;
const StyledIconButton = muiStyled(IconButton)({
  "&.MuiButtonBase-root:hover": {
    background: "none",
  },
});
const StyledInnerModalBox = styled("div")`
  max-width: 544px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  & .drop_title {
    font-size: 24px;
  }
`;
const ButtonsWrapper = styled("div")`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
`;
const StyledDownloadedImagesBox = styled("div")(({ $imagesCount }) => ({
  width: $imagesCount === 4 ? "276px" : "100%",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  flexWrap: $imagesCount === 4 ? "wrap" : "nowrap",
  "& .downloaded_box": {
    position: "relative",
  },
}));
const StyledDropedSection = styled("section")(({ $imagesCount }) => ({
  width: "fit-content",
  display: "flex",
  alignItems: "center",
  gap: "20px",
  flexDirection: $imagesCount >= 3 ? "column" : "row",
  "& .drop_main_zone": {
    width: "fit-content",
    height: "fit-content",
    display: $imagesCount === 4 ? "none" : "flex",
  },
}));
const StyledDroppedImage = styled("img")`
  width: 130px;
  height: 130px;
  object-fit: cover;
`;
const StyledDeleteIcon = styled(Icons.DeleteDropZoneImage)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 25;
`;
const StyledSelect = muiStyled(Select)({
  "&.MuiFormLabel-root": {
    height: "39px",
    "& .label em": {
      color: "red",
      fontStyle: "normal",
    },
  },
});
const StyledInput = muiStyled(Input)({
  "& .MuiInputBase-input": {
    height: "39px !important",
    "& .label em": {
      color: "red",
      fontStyle: "normal",
    },
  },
  "& input": {
    height: "39px",
    padding: "8px 14px",
    boxSizing: "border-box",
  },
});
const StyledButton = muiStyled(Button)({
  width: "245px !important",
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
