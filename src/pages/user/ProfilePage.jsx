import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import Button from "../../components/UI/button/Button";
import { styled as muiStyled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { BreadCrumbs } from "../../components/UI/breadcrumbs/BreadCrumbs";
import Cookies from "js-cookie";
import {
  editUserProfile,
  getAllBookings,
  getSingleUserData,
  patchUserDocuments,
  uploadDocuments,
} from "../../store/thunks/usersThunk";
import { toast } from "react-toastify";
import { LogoutModal } from "../../components/UI/modal/LogoutModal";
import { BaseModal } from "../../components/UI/modal/BaseModal";

const ProfilePage = () => {
  const [images, setImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const { role } = useSelector((state) => state.auth);
  const { user, bookings } = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const [editedData, setEditedData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const handleImageClick = (imgUrl) => {
    setSelectedImage(imgUrl);
    setIsImageModalOpen(true);
  };

  const handleCloseImageModal = () => {
    setSelectedImage(null);
    setIsImageModalOpen(false);
  };

  function getRouteByRole() {
    switch (role) {
      case "USER":
        return [
          { label: "Главная", href: "/user/user-page" },
          { label: "Профиль", href: "/user/profile" },
        ];
      default:
        return role;
    }
  }

  const onDrop = (acceptedFiles) => {
    if (images.length + acceptedFiles.length > 4) {
      toast.warning("Максимум 4 фото");
      return;
    }

    const newImages = acceptedFiles.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setImages([...images, ...newImages]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
    maxFiles: 4,
  });

  const removeImage = (indexToRemove) => {
    setImages(images.filter((_, i) => i !== indexToRemove));
  };

  useEffect(() => {
    const userData = JSON.parse(Cookies.get("auth"));
    if (!user?.id) {
      dispatch(getSingleUserData(userData.data.id));
      dispatch(getAllBookings(userData.data.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (user) {
      setEditedData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNumber: user.phoneNumber || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleUploadClick = async () => {
    try {
      const uploaded = await dispatch(uploadDocuments(images)).unwrap();
      const documentUrls = uploaded.documentUrls || uploaded;
      await dispatch(
        patchUserDocuments({ userId: user.id, documentUrls })
      ).unwrap();
      toast.success("Документы успешно загружены и сохранены!");
      setImages([]);
    } catch (error) {
      console.error(error);
      toast.error("Произошла ошибка. Повторите позже.");
    }
  };

  const handleEditClick = () => setIsEditing(true);

  const handleChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await dispatch(
        editUserProfile({ userId: user.id, ...editedData })
      ).unwrap();
      await dispatch(getSingleUserData(user.id));
      toast.success("Профиль обновлён!");
      setIsEditing(false);
    } catch (err) {
      toast.error("Ошибка при обновлении профиля");
      console.error(err);
    }
  };

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // const formatted = bookings.dateRange?.endDate
  //   ? new Date(bookings.dateRange.endDate).toLocaleString("ru-RU", {
  //       day: "2-digit",
  //       month: "long",
  //       year: "numeric",
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     })
  //   : "Нет данных";

  return (
    <StyledWrapper>
      <StyledTitleAndBr>
        <BreadCrumbs breadcrumbs={getRouteByRole()} />
      </StyledTitleAndBr>

      <ProfileWrapper>
        <Section>
          <ProfileHeader>
            <Title>Персональные данные</Title>
            {isEditing ? (
              <Button variant="contained" width="180px" onClick={handleSave}>
                Сохранить
              </Button>
            ) : (
              <Button
                variant="contained"
                width="180px"
                onClick={handleEditClick}
              >
                Редактировать
              </Button>
            )}
          </ProfileHeader>

          <InfoGrid>
            <InfoItem>
              <Label>Имя</Label>
              {isEditing ? (
                <Input
                  value={editedData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                />
              ) : (
                <Value>{user.firstName}</Value>
              )}
            </InfoItem>

            <InfoItem>
              <Label>Фамилия</Label>
              {isEditing ? (
                <Input
                  value={editedData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                />
              ) : (
                <Value>{user.lastName}</Value>
              )}
            </InfoItem>

            <InfoItem>
              <Label>Телефон</Label>
              {isEditing ? (
                <Input
                  value={editedData.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                />
              ) : (
                <Value>{user.phoneNumber}</Value>
              )}
            </InfoItem>

            <InfoItem>
              <Label>Email</Label>
              {isEditing ? (
                <Input
                  value={editedData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              ) : (
                <Value>{user.email}</Value>
              )}
            </InfoItem>
          </InfoGrid>
        </Section>

        <Section>
          <Title>Водительские права и паспорт</Title>
          {user.documents && user.documents.length > 0 ? (
            <DocumentsInfo>
              <InfoText>Документы успешно загружены:</InfoText>
              <DocumentsList>
                {user.documents.map((doc, idx) => (
                  <DocumentItem key={idx}>
                    <DocumentLink
                      href={doc}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      📄 Документ {idx + 1}
                    </DocumentLink>
                    <img
                      src={doc}
                      alt=""
                      onClick={() => handleImageClick(doc)}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    />
                  </DocumentItem>
                ))}
              </DocumentsList>
            </DocumentsInfo>
          ) : (
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
              <UploadButton
                variant="outlined"
                disabled={images.length === 0}
                onClick={handleUploadClick}
              >
                Загрузить
              </UploadButton>
            </DropZoneWrapper>
          )}
        </Section>
        <Section>
          <Title>Активные аренды</Title>
          {bookings && bookings.length > 0 ? (
            <>
              {bookings
                .filter((item) => item.bookingStatus !== "Завершенный")
                .slice(0, 1)
                .map((item, index) => (
                  <StyledInfoList key={`active-${index}`}>
                    <li>
                      <span className="label">Машина</span>
                      <span className="dots" />
                      <span className="value">{item.car}</span>
                    </li>
                    <li>
                      <span className="label">Статус аренды</span>
                      <span className="dots" />
                      <span className="value">{item.bookingStatus}</span>
                    </li>
                    <li>
                      <span className="label">Оплата</span>
                      <span className="dots" />
                      <span className="value">{item.payment}</span>
                    </li>
                    <li>
                      <span className="label">Сумма аренды</span>
                      <span className="dots" />
                      <span className="value">{item.rentPrice} ₽</span>
                    </li>
                    <li>
                      <span className="label">Стартовая локация</span>
                      <span className="dots" />
                      <span className="value">{item.pickupLocation}</span>
                    </li>
                    <li>
                      <span className="label">Конечная локация</span>
                      <span className="dots" />
                      <span className="value">{item.returnLocation}</span>
                    </li>
                    <li>
                      <span className="label">Начало аренды</span>
                      <span className="dots" />
                      <span className="value">
                        {formatDate(item.dateRange.startDate)}
                      </span>
                    </li>
                    <li>
                      <span className="label">Конец аренды</span>
                      <span className="dots" />
                      <span className="value">
                        {formatDate(item.dateRange.endDate)}
                      </span>
                    </li>
                  </StyledInfoList>
                ))}
            </>
          ) : (
            <p>Нет активных аренд.</p>
          )}
        </Section>

        <Section>
          <Title>Завершенные аренды</Title>
          {bookings && bookings.length > 0 ? (
            <>
              {bookings
                .filter((item) => item.bookingStatus === "Завершенный")
                .slice(0, 1)
                .map((item, index) => (
                  <StyledInfoList key={`completed-${index}`}>
                    <li>
                      <span className="label">Машина</span>
                      <span className="dots" />
                      <span className="value">{item.car}</span>
                    </li>
                    <li>
                      <span className="label">Статус аренды</span>
                      <span className="dots" />
                      <span className="value">{item.bookingStatus}</span>
                    </li>
                    <li>
                      <span className="label">Оплата</span>
                      <span className="dots" />
                      <span className="value">{item.payment}</span>
                    </li>
                    <li>
                      <span className="label">Сумма аренды</span>
                      <span className="dots" />
                      <span className="value">{item.rentPrice} ₽</span>
                    </li>
                    <li>
                      <span className="label">Стартовая локация</span>
                      <span className="dots" />
                      <span className="value">{item.pickupLocation}</span>
                    </li>
                    <li>
                      <span className="label">Конечная локация</span>
                      <span className="dots" />
                      <span className="value">{item.returnLocation}</span>
                    </li>
                    <li>
                      <span className="label">Начало аренды</span>
                      <span className="dots" />
                      <span className="value">
                        {formatDate(item.dateRange.startDate)}
                      </span>
                    </li>
                    <li>
                      <span className="label">Конец аренды</span>
                      <span className="dots" />
                      <span className="value">
                        {formatDate(item.dateRange.endDate)}
                      </span>
                    </li>
                  </StyledInfoList>
                ))}
            </>
          ) : (
            <p>Нет завершённых аренд.</p>
          )}
        </Section>

        <ProfileConfig>
          <SettingsGrid>
            <Button variant="outlined" width="220px" onClick={handleOpenModal}>
              Выйти из аккаунта
            </Button>
          </SettingsGrid>
        </ProfileConfig>
      </ProfileWrapper>

      <BaseModal open={isOpen} onClose={handleCloseModal}>
        <LogoutModal onClose={handleCloseModal} />
      </BaseModal>

      <BaseModal open={isImageModalOpen} onClose={handleCloseImageModal}>
        <img
          src={selectedImage}
          alt="Документ"
          style={{
            maxWidth: "100%",
            maxHeight: "80vh",
            borderRadius: "8px",
            display: "block",
            margin: "0 auto",
          }}
        />
      </BaseModal>
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
const DocumentsInfo = styled.div`
  background-color: #e0f2ff;
  border: 1px solid #7ac1ff;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
`;

const InfoText = styled.p`
  font-size: 1.1rem;
  color: #0366d6;
  margin-bottom: 16px;
  font-weight: 600;
`;

const DocumentsList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const DocumentItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: #fff;
  border: 1px solid #7ac1ff;
  padding: 8px 12px;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(122, 193, 255, 0.4);
`;

const DocumentLink = styled.a`
  color: #0366d6;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;
const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 60%;
  font-size: 14px;
`;
const StyledInfoList = styled.ul`
  border: 1px solid rgb(18, 11, 142);
  border-radius: 8px;
  padding: 20px;
  font-size: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: #111;

  & li {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .label {
    white-space: nowrap;
    flex-shrink: 0;
    font-weight: 500;
    color: #555;
  }

  .dots {
    flex-grow: 1;
    border-bottom: 1px dotted rgb(13, 8, 8);
    height: 1px;
    margin: 0 8px;
    overflow: hidden;
  }

  .value {
    white-space: nowrap;
    flex-shrink: 0;
    font-weight: 600;
    color: #111;
  }
`;
