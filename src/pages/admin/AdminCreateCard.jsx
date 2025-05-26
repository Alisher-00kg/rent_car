import styled from "styled-components";
import { Icons } from "../../assets";
import { useCallback, useState } from "react";
import {
  brandOptions,
  categoryOptions,
  driveTypeOptions,
  flueTypeOptions,
  transmissionOptions,
} from "../../utils/constants/admin-create-card/options";
import { useDropzone } from "react-dropzone";
import Button from "../../components/UI/button/Button";
import Input from "../../components/UI/input/Input";
import { Select } from "../../components/UI/select/Select";
import { IconButton } from "@mui/material";
import { BaseModal } from "../../components/UI/modal/BaseModal";
import { styled as muiStyled } from "@mui/material/styles";
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
    flueType: flueTypeOptions[0].value,
    numberOfSeats: "",
    transmission: transmissionOptions[0].value,
    driveType: driveTypeOptions[0].value,
    images: [],
  };

  const [carValues, setCarValues] = useState(initialCarValues);
  const [isOpen, setIsOpen] = useState(false);
  const [tempImages, setTempImages] = useState([]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setCarValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => URL.createObjectURL(file));
    setTempImages((prev) => [...prev, ...newImages]);
  };
  const handleUploadImages = () => {
    setCarValues((prev) => ({
      ...prev,
      images: [...prev.images, ...tempImages],
    }));
    setTempImages([]);
    setIsOpen(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop,
    multiple: true,
    maxFiles: 4,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(carValues);
  };
  const deleteTempImage = (indexToDelete) => {
    const imageToRevoke = tempImages[indexToDelete];
    URL.revokeObjectURL(imageToRevoke);
    setTempImages((prev) => prev.filter((_, i) => i !== indexToDelete));
  };
  const handleResetForm = () => {
    setCarValues(initialCarValues);
    setTempImages([]);
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
                        {tempImages.map((image, index) => (
                          <div key={index} className="downloaded_box">
                            <StyledDeleteIcon
                              onClick={() => deleteTempImage(index)}
                            />
                            <StyledDroppedImage
                              src={image}
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
        <StyledSelect
          label={"Выберите категорию"}
          value={carValues.category}
          onChange={(e) =>
            setCarValues({ ...carValues, category: e.target.value })
          }
          options={categoryOptions}
          name="category"
        />
        <StyledSelect
          label={"Выберите марку"}
          value={carValues.brand}
          onChange={handleChange}
          options={brandOptions}
          name="brand"
        />
        <StyledInput
          inputLabel="Модель"
          fullWidth
          placeholder="Введите модель"
          value={carValues.model}
          onChange={handleChange}
          name="model"
        />
        <StyledInput
          inputLabel="Цвет"
          fullWidth
          placeholder="Введите цвет"
          value={carValues.color}
          onChange={handleChange}
          name="color"
        />
        <StyledInput
          inputLabel="Год выпуска"
          fullWidth
          type="number"
          placeholder="Введите год выпуска"
          value={carValues.yearOfRelease}
          onChange={handleChange}
          name="yearOfRelease"
        />
        <StyledInput
          inputLabel="Страна производства"
          fullWidth
          placeholder="Введите страну производства"
          value={carValues.madeInCountry}
          onChange={handleChange}
          name="madeInCountry"
        />
        <StyledInput
          inputLabel="Сумма аренды"
          fullWidth
          placeholder="Введите сумму аренды"
          value={carValues.rentPrice}
          onChange={handleChange}
          name="rentPrice"
        />
        <Select
          label={"Выберите выхлопную систему"}
          value={carValues.flueType}
          onChange={handleChange}
          options={flueTypeOptions}
          name="flueType"
        />
        <StyledInput
          inputLabel="Количество сидений"
          fullWidth
          type="number"
          placeholder="Введите количество сидений"
          value={carValues.numberOfSeats}
          onChange={handleChange}
          name="numberOfSeats"
        />
        <StyledSelect
          label={"Выберите тип трансмиссии"}
          value={carValues.transmission}
          onChange={handleChange}
          options={transmissionOptions}
          name="transmission"
        />
        <StyledSelect
          label={"Выберите тип привода"}
          value={carValues.driveType}
          onChange={handleChange}
          options={driveTypeOptions}
          name="driveType"
        />
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
  height: "39px",
});
const StyledInput = muiStyled(Input)({
  "& .MuiInputBase-input": {
    height: "39px !important",
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
