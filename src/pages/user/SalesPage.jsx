import styled from "styled-components";
import TabsUi from "../../components/UI/tabs";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/UI/card/Card";
import { getAllCars } from "../../store/thunks/allCars";

const secondTab = [
  { value: "", label: "Все" },
  { value: "Стандарт", label: "Стандарт" },
  { value: "Комфорт", label: "Комфорт" },
  { value: "Бизнес", label: "Бизнес" },
  { value: "Минивен", label: "Минивен" },
  { value: "Внедорожник", label: "Внедорожник" },
  { value: "Премиум", label: "Премиум" },
  { value: "Кроссовер", label: "Кроссовер" },
  { value: "Эконом", label: "Эконом" },
];
import {
  Box,
  Card as MuiCard,
  CardContent,
  Typography,
  Button,
  Container,
  Grid,
} from "@mui/material";
import {
  DirectionsCar,
  AccessTime,
  ArrowForward,
  Map,
} from "@mui/icons-material";
const services = [
  {
    title: "Прокат автомобилей",
    description:
      "Современные и надежные автомобили на любой вкус — от эконома до премиум-класса. Все авто проходят регулярное обслуживание и готовы к любым поездкам.",
    icon: <DirectionsCar sx={{ fontSize: 40, color: "white" }} />,
    bgColor: "#FF6B35",
    bgGradient: "linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)",
    cta: "Свяжитесь с менеджером",
  },
  {
    title: "Аренда для путешествий",
    description:
      "Свобода передвижения и комфорт на протяжении всего пути — арендуйте автомобиль для путешествий по городам, живописным маршрутам и незабываемым локациям.",
    icon: <Map sx={{ fontSize: 40, color: "white" }} />,
    bgColor: "#1ABC9C",
    bgGradient: "linear-gradient(135deg, #1ABC9C 0%, #16A085 100%)",
    cta: "Узнать подробнее",
  },
  {
    title: "Долгосрочная аренда",
    description:
      "Гибкие условия аренды на длительный срок для бизнеса и личного пользования. Удобные тарифы и индивидуальный подход к каждому клиенту.",
    icon: <AccessTime sx={{ fontSize: 40, color: "white" }} />,
    bgColor: "#16A085",
    bgGradient: "linear-gradient(135deg, #bfa70a 0%, #fd9d43 100%)",
    cta: "Получить консультацию",
  },
];
const openLink = (url) => window.open(url, "_blank");
const SalesPage = () => {
  const [activeTab, setActiveTab] = useState("");
  const { cars } = useSelector((state) => state.allCars);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  const handleTabChange = (tabValue) => {
    setActiveTab(tabValue);
  };
  const filteredCarsDependenciesDiscount = cars.filter((item) => item.discount);
  const filteredCars = useMemo(() => {
    if (!activeTab) return filteredCarsDependenciesDiscount;
    return filteredCarsDependenciesDiscount.filter(
      (car) => car.category === activeTab
    );
  }, [filteredCarsDependenciesDiscount, activeTab]);

  return (
    <StyledWrapper>
      <StyledSection>
        <Typography variant="h3" mb={5} color="#214af1">
          Категории:
        </Typography>
        <TabsUi
          tabs={secondTab}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        <StyledUl>
          {filteredCars?.map((item) => (
            <Card key={item.id} {...item} />
          ))}
        </StyledUl>
      </StyledSection>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          {services.map((service, index) => (
            <Grid item xs={12} md={4} key={index}>
              <MuiCard
                sx={{
                  height: "100%",
                  background: service.bgGradient,
                  color: "white",
                  borderRadius: 4,
                  overflow: "hidden",
                  position: "relative",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 4,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ mb: 3 }}>{service.icon}</Box>

                  <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                      fontWeight: "bold",
                      mb: 3,
                      fontSize: { xs: "1.5rem", md: "2rem" },
                    }}
                  >
                    {service.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      mb: 4,
                      lineHeight: 1.6,
                      opacity: 0.95,
                      flexGrow: 1,
                    }}
                  >
                    {service.description}
                  </Typography>

                  <Button
                    variant="text"
                    endIcon={<ArrowForward />}
                    sx={{
                      color: "white",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      alignSelf: "flex-start",
                      p: 0,
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                        transform: "translateX(5px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                    onClick={() => openLink("https://wa.me/+79992781923")}
                  >
                    {service.cta}
                  </Button>
                </CardContent>

                <Box
                  sx={{
                    position: "absolute",
                    top: -50,
                    right: -50,
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.1)",
                    opacity: 0.3,
                  }}
                />
              </MuiCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </StyledWrapper>
  );
};

export default SalesPage;

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 60px 40px 0 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px;
`;

const StyledUl = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 50px;
  flex-wrap: wrap;
  padding: 0;
  margin-top: 40px;
`;
const StyledSection = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
