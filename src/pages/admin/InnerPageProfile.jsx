import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getAllBookings,
  getSingleUserData,
} from "../../store/thunks/usersThunk";
import styled from "styled-components";
import { BreadCrumbs } from "../../components/UI/breadcrumbs/BreadCrumbs";
import { BaseModal } from "../../components/UI/modal/BaseModal";
import Button from "../../components/UI/button/Button";

export const InnerPageProfile = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { user, bookings } = useSelector((state) => state.allUsers);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [activeRentalsToShow, setActiveRentalsToShow] = useState(1);
  const [completedRentalsToShow, setCompletedRentalsToShow] = useState(1);

  const showMoreActiveRentals = () => {
    setActiveRentalsToShow((prev) => prev + 1);
  };

  const showMoreCompletedRentals = () => {
    setCompletedRentalsToShow((prev) => prev + 1);
  };

  const filteredUser = bookings?.filter((item) =>
    item.email?.toLowerCase().includes(user.email)
  );
  const activeBookings =
    filteredUser?.filter((item) => item.bookingStatus !== "Завершенный") || [];

  const completedBookings =
    filteredUser?.filter((item) => item.bookingStatus === "Завершенный") || [];

  const handleImageClick = (imgUrl) => {
    setSelectedImage(imgUrl);
    setIsImageModalOpen(true);
  };

  const handleCloseImageModal = () => {
    setSelectedImage(null);
    setIsImageModalOpen(false);
  };

  function getRouteByRole(aboutUser) {
    return [
      { label: "Главная", href: "/admin/admin-page" },
      {
        label: `${aboutUser.firstName} ${aboutUser.lastName}`,
        href: "/admin/users/" + aboutUser.id,
      },
    ];
  }
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

  useEffect(() => {
    if (userId) {
      dispatch(getSingleUserData(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);
  return (
    <StyledWrapper>
      <StyledTitleAndBr>
        <BreadCrumbs breadcrumbs={getRouteByRole(user)} />
      </StyledTitleAndBr>

      <ProfileWrapper>
        <Section>
          <ProfileHeader>
            <Title>Персональные данные</Title>
          </ProfileHeader>
          <InfoGrid>
            <InfoItem>
              <Label>Имя</Label>
              <Value>{user.firstName}</Value>
            </InfoItem>

            <InfoItem>
              <Label>Фамилия</Label>
              <Value>{user.lastName}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Телефон</Label>
              <Value>{user.phoneNumber}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Email</Label>
              <Value>{user.email}</Value>
            </InfoItem>
          </InfoGrid>
        </Section>

        <Section>
          <Title>Водительские права и паспорт</Title>
          {user.documents && user.documents.length > 0 ? (
            <DocumentsInfo>
              <InfoText>Документы загружены</InfoText>
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
            <p>Документы не загружены</p>
          )}
        </Section>

        <Section>
          <Title>Аренды</Title>
          {activeBookings.length > 0 ? (
            <>
              {activeBookings
                .slice(0, activeRentalsToShow)
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
              {activeRentalsToShow < activeBookings.length && (
                <Button variant={"showmore"} onClick={showMoreActiveRentals}>
                  Посмотреть ещё
                </Button>
              )}
            </>
          ) : (
            <p>Нет информации об аренде.</p>
          )}
          <Section>
            <Title>Завершенные</Title>
            {completedBookings.length > 0 ? (
              <>
                {completedBookings
                  .slice(0, completedRentalsToShow)
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
                {completedRentalsToShow < completedBookings.length && (
                  <Button
                    variant={"showmore"}
                    onClick={showMoreCompletedRentals}
                    color="red"
                  >
                    Посмотреть ещё завершенные
                  </Button>
                )}
              </>
            ) : (
              <p>Нет информации об аренде.</p>
            )}
          </Section>
        </Section>
      </ProfileWrapper>

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
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.5rem;
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
