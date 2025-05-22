import { useCallback, useState } from "react";
import { Select } from "../../components/UI/select/Select";
import Input from "../../components/UI/input/Input";
import { useDropzone } from "react-dropzone";
import Button from "../../components/UI/button/Button";
import styled from "styled-components";
import { Icons } from "../../assets";
import { styled as muistyled } from "@mui/material";
const categoryOptions = [
  { value: "econom", label: "Эконом" },
  { value: "standart", label: "Стандарт" },
  { value: "business", label: "Бизнес" },
  { value: "premium", label: "Премиум" },
  { value: "minivan", label: "Минивен" },
  { value: "crossover", label: "Кроссовер" },
  { value: "suv", label: "Внедорожник" },
];
const brandOptions = [
  { value: "toyota", label: "Toyota" },
  { value: "mercedes", label: "Mercedes" },
  { value: "bmw", label: "BMW" },
  { value: "audi", label: "Audi" },
  { value: "jeep", label: "Jeep" },
  { value: "honda", label: "Honda" },
  { value: "hyundai", label: "Hyundai" },
  { value: "skoda", label: "Skoda" },
  { value: "lada", label: "Lada" },
];
const flueTypeOptions = [
  { value: "standart", label: "Стандартная выхлопная система" },
  { value: "sport", label: "Спортивная выхлопная система" },
  { value: "straight", label: "Прямоточная система (стрейтпайп)" },
  { value: "active", label: "Активная выхлопная система" },
];
const transmissionOptions = [
  {
    value: "mt",
    label: "МКПП (Manual Transmission) — Механическая коробка передач",
  },
  {
    value: "at",
    label: "АКПП (Automatic Transmission) — Классический автомат",
  },
  {
    value: "robot",
    label: "Роботизированная КПП (AMT / RMT)",
  },
  {
    value: "dsg",
    label: "DSG (Dual-Clutch Transmission) — Робот с двумя сцеплениями",
  },
  {
    value: "cvt",
    label: "CVT (Continuously Variable Transmission) — Вариатор",
  },
];
const driveTypeOptions = [
  {
    value: "fwd",
    label: "Передний привод (FWD – Front-Wheel Drive)",
  },
  {
    value: "rwd",
    label: "Задний привод (RWD – Rear-Wheel Drive)",
  },
  {
    value: "awd",
    label: "Полный привод (AWD/4WD – All-Wheel Drive / Four-Wheel Drive)",
  },
];
export const CreateCard = () => {
  const [carValues, setCarValues] = useState({
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
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setCarValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);
  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => URL.createObjectURL(file));
    setCarValues((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
    multiple: true,
    maxFiles: 4,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(carValues);
  };
  return (
    <StyledWrapper>
      <div className="top-info">
        <h1>Добавление карточки</h1>
      </div>
      <StyledForm onSubmit={handleSubmit}>
        <Select
          label={"Выберите категорию"}
          value={carValues.category}
          onChange={(e) =>
            setCarValues({ ...carValues, category: e.target.value })
          }
          options={categoryOptions}
          name="category"
        />
        <Select
          label={"Выберите марку"}
          value={carValues.brand}
          onChange={handleChange}
          options={brandOptions}
          name="brand"
        />
        <Input
          fullWidth
          label="Модель"
          placeholder="Введите модель"
          value={carValues.model}
          onChange={handleChange}
          name="model"
        />
        <Input
          fullWidth
          label="Цвет"
          placeholder="Введите цвет"
          value={carValues.color}
          onChange={handleChange}
          name="color"
        />
        <Input
          fullWidth
          label="Год выпуска"
          type="number"
          placeholder="Введите год выпуска"
          value={carValues.yearOfRelease}
          onChange={handleChange}
          name="yearOfRelease"
        />
        <Input
          fullWidth
          label="Страна производства"
          placeholder="Введите страну производства"
          value={carValues.madeInCountry}
          onChange={handleChange}
          name="madeInCountry"
        />
        <Input
          fullWidth
          label="Сумма аренды"
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
        <Input
          fullWidth
          type="number"
          label="Количество сидений"
          placeholder="Введите количество сидений"
          value={carValues.numberOfSeats}
          onChange={handleChange}
          name="numberOfSeats"
        />
        <Select
          label={"Выберите тип трансмиссии"}
          value={carValues.transmission}
          onChange={handleChange}
          options={transmissionOptions}
          name="transmission"
        />
        <Select
          label={"Выберите тип привода"}
          value={carValues.driveType}
          onChange={handleChange}
          options={driveTypeOptions}
          name="driveType"
        />
        <div></div>
        <StyledDropZoneInfo {...getRootProps()}>
          <input {...getInputProps()} />
          <Icons.DefaultDropeZone />
          <p>Нажмите или перетащите сюда файл </p>
          <StyledList>
            <li>Минимальное разрешение - 450x600</li>
            <li>Максимальное количество - 4 фото</li>
          </StyledList>
        </StyledDropZoneInfo>

        <div style={{ marginTop: "20px" }}>
          {carValues.images.length > 0 && (
            <div>
              <h4>Загруженные изображения:</h4>
              <div style={{ display: "flex", gap: "10px" }}>
                {carValues.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Car Image ${index}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <StyledButton type={"submit"}>Создать</StyledButton>
      </StyledForm>
    </StyledWrapper>
  );
};
const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 50px;
  & .top-info {
    width: 100%;
    display: flex;
    justify-content: start;
  }
`;
const StyledForm = styled.form`
  width: 340px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 50px;
  grid-row-gap: 30px;
  gap: 25px;
`;
const StyledDropZoneInfo = styled.div`
  width: 396px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  border: 2px dashed #ccc;
  cursor: pointer;
  background: #d2d4d880;
`;
const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 5px;
`;
const StyledButton = muistyled(Button)({
  width: "100%",
  marginBottom: "80px",
});
