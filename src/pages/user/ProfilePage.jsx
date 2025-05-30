
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import Button from "../../components/UI/button/Button";

const ProfilePage = () => {
  const [images, setImages] = useState([]);

  const onDrop = (acceptedFiles) => {
    if (images.length + acceptedFiles.length > 4) {
      alert('Максимум 4 фото');
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
      'image/*': [],
    },
    multiple: true,
    maxFiles: 4,
  });
  const removeImage = (indexToRemove) => {
    setImages(images.filter((_, i) => i !== indexToRemove));
  };



  return <div>
    <ProfileWrapper>

      <Section>
        <ProfileHeader>
          <Title>Профиль</Title>
          <Button variant="contained" width="150px" >Редактировать</Button>
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
                <RemoveIcon onClick={() => removeImage(index)}>&times;</RemoveIcon>
              </ImageWrapper>
            ))}
          </PreviewList>
          <UploadButton disabled={images.length === 0}>
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

          <SettingLink>Сменить пароль</SettingLink>
          <SettingLink>Уведомления</SettingLink>
          <SettingLink className="danger">Выйти из аккаунта</SettingLink>
        </SettingsGrid>
      </ProfileConfig>
    </ProfileWrapper>

  </div>;
};

export default ProfilePage;


const ProfileWrapper = styled.section`
  max-width: 720px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  font-family: 'Inter', sans-serif;
  color: #111827;
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
const InfoGrid = styled.div`
  display: grid;
  gap: 16px;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  background: #f8f9fa;
  padding: 12px 16px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
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
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.5rem;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  color: #374151;
`;

const ActionLink = styled.button`
  background: none;
  border: none;
  color: #4f46e5;
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
  border: 2px dashed #19b08f;
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
const UploadButton = styled.button`
  margin-top: 20px;
  width: 400px;
  background-color: #19b08f;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: 0.3s;

  &:hover {
    background-color: #15997a;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`
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
  box-shadow: 0 0 6px rgba(0,0,0,0.2);

  
`;
const ImageWrapper = styled.div`
  position: relative;
  width: 90px;
  height: 90px;
`;
const ProfileConfig = styled.div`
  margin-top: 40px;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SettingsGrid = styled.div`
  display: grid;
  gap: 16px;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;



const SettingLink = styled.a`
  color: #19b08f;
  cursor: pointer;
  font-weight: 500;
  padding: 10px 14px;
  border-radius: 8px;
  transition: 0.3s;
  background: #f0fdf9;
  width: fit-content;

  &:hover {
    background: #dffaf2;
  }

  &.danger {
    color: #d9534f;
    background: #fcecec;

    &:hover {
      background: #f9d9d9;
    }
  }
`;