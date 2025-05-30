import { useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import Button from "../../components/UI/button/Button";
import { styled as muiStyled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { BreadCrumbs } from "../../components/UI/breadcrumbs/BreadCrumbs";

const ProfilePage = () => {
  const [images, setImages] = useState([]);
  const { role } = useSelector((state) => state.auth);
  function getRouteByRole() {
    switch (role) {
      case "USER":
        return [
          {
            label: "Главная",
            href: "/user/user-page",
          },
          {
            label: "Профиль",
            href: "/user/profile",
          },
        ];
      default:
        return role;
    }
  }

  const onDrop = (acceptedFiles) => {
    if (images.length + acceptedFiles.length > 4) {
      alert("Максимум 4 фото");
      return;
    }

    const newImages = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    setImages([...images, ...newImages]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: true,
    maxFiles: 4,
  });
  const removeImage = (indexToRemove) => {
    setImages(images.filter((_, i) => i !== indexToRemove));
  };

  return (
    <StyledWrapper>
      <StyledTitleAndBr>
        <BreadCrumbs breadcrumbs={getRouteByRole()} />
      </StyledTitleAndBr>
      <ProfileWrapper>
        <Section>
          <ProfileHeader>
            <Title>Персональные данные</Title>
            <Button variant="contained" width="180px">
              Редактировать
            </Button>
          </ProfileHeader>

          <InfoGrid>
            <InfoItem>
              <Label>Имя</Label>
              <Value>Айбек Омуров</Value>
            </InfoItem>
            <InfoItem>
              <Label>Телефон</Label>
              <Value>+7 903 263 18 65</Value>
            </InfoItem>
            <InfoItem>
              <Label>Email</Label>
              <Value>aibek@gmail.com</Value>
            </InfoItem>
          </InfoGrid>
        </Section>

        <div>
          <Title>Водительские права и паспорт</Title>
          <DropZoneWrapper>
            <DropArea {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Отпустите изображения...</p>
              ) : (
                <p>Перетащите или нажмите для загрузки (до 4 фото)</p>
              )}
            </DropArea>

            <PreviewList>
              {images.map((file, index) => (
                <ImageWrapper key={index}>
                  <PreviewImage src={file.preview} alt={`preview-${index}`} />
                  <RemoveIcon onClick={() => removeImage(index)}>
                    &times;
                  </RemoveIcon>
                </ImageWrapper>
              ))}
            </PreviewList>
            <UploadButton variant={"outlined"} disabled={images.length === 0}>
              Загрузить
            </UploadButton>
          </DropZoneWrapper>
        </div>

        <Section>
          <Title>Аренды</Title>
          <Card>Kia K5 — 01.06–05.06 — Активна</Card>
          <Card>Toyota Camry — 10.05–12.05 — Завершена</Card>
          <ActionLink>Посмотреть все</ActionLink>
        </Section>
        <ProfileConfig>
          <HeaderRow>
            <Title>Настройки</Title>
          </HeaderRow>

          <SettingsGrid>
            <SettingItem>
              <Label>Язык</Label>
              <Value>Русский</Value>
            </SettingItem>

            <Button variant={"text"}>Сменить пароль</Button>
            <Button variant={"text"}>Уведомления</Button>
            <Button variant={"outlined"} width="220px">
              Выйти из аккаунта
            </Button>
          </SettingsGrid>
        </ProfileConfig>
      </ProfileWrapper>
    </StyledWrapper>
  );
};

export default ProfilePage;
const StyledWrapper = styled("div")(() => ({
  width: "100%",
  padding: "0px 90px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "60px",
}));
const ProfileWrapper = styled.section`
  width: 820px;
  padding: 3rem 2.5rem;
  font-family: "Inter", sans-serif;
  color: #111827;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px;
  background-color: rgba(201, 204, 248, 0.702);
  border-radius: 12px;
`;
const StyledTitleAndBr = styled("div")(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "start",
  borderBottom: "2px solid #cdcdcd",
}));
const ProfileHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;
const InfoGrid = styled.div`
  width: 100%;
  display: grid;
  gap: 16px;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  background: #f8f9fa;
  padding: 12px 16px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const Label = styled.span`
  color: #555;
  font-weight: 500;
`;

const Value = styled.span`
  color: #111;
  font-weight: 600;
`;

const Section = styled.div`
  margin-bottom: 2.5rem;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.5rem;
`;

const ActionLink = styled.button`
  background: none;
  border: none;
  color: #7e52ff;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  margin-top: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const Card = styled.div`
  padding: 1rem 1.25rem;
  background: #f9fafb;
  border-radius: 0.75rem;
  margin-bottom: 0.75rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  font-size: 0.95rem;
  color: #1f2937;
`;

const DropZoneWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const DropArea = styled.div`
  border: 2px dashed #4b00a2;
  border-radius: 10px;
  padding: 30px;
  text-align: center;
  background-color: #f9f9f9;
  cursor: pointer;
  color: #666;
  transition: 0.3s;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const PreviewList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
`;

const PreviewImage = styled.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ccc;
`;
const UploadButton = muiStyled(Button)(({ disabled }) => ({
  "&.MuiButtonBase-root": {
    border: disabled && "1px solid gray",
    background: disabled && "gray",
    color: disabled && "#fff",
    marginTop: "15px",
  },
  "&.Mui-disabled": {
    pointerEvents: "unset",
    cursor: "no-drop",
    opacity: 0.5,
  },
}));

const RemoveIcon = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: #a4a09ccc;
  color: white;
  border-radius: 50%;
  padding: 4px 6px;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
`;
const ImageWrapper = styled.div`
  position: relative;
  width: 90px;
  height: 90px;
`;
const ProfileConfig = styled.div`
  width: 100%;
  margin-top: 40px;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SettingsGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const SettingItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;
