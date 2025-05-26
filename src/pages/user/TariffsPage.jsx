import styled from "styled-components";

import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Grid,
} from "@mui/material";
import { FitnessCenter, Group, Spa, ArrowForward } from "@mui/icons-material";

const services = [
  {
    title: "Тренажерный зал",
    description:
      "Премиальное фитнес-оборудование от брендов с мировым именем. Качество каждой детали в тренажерах высочайшего уровня.",
    icon: <FitnessCenter sx={{ fontSize: 40, color: "white" }} />,
    bgColor: "#FF6B35",
    bgGradient: "linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)",
  },
  {
    title: "Групповые программы",
    description:
      "Всемирно известные групповые занятия, проработанные до мелочей. Каждый шаг, любое движение выверено и рассчитано ведущими в мире фитнес-специалистами.",
    icon: <Group sx={{ fontSize: 40, color: "white" }} />,
    bgColor: "#2C3E50",
    bgGradient: "linear-gradient(135deg, #2C3E50 0%, #34495E 100%)",
  },
  {
    title: "SPA-зона",
    description:
      "Финская сауна и турецкий хаммам, джакузи с панорамными окнами и соляная пещера после тренировки полноценно заменят сеанс релакс-массажа.",
    icon: <Spa sx={{ fontSize: 40, color: "white" }} />,
    bgColor: "#16A085",
    bgGradient: "linear-gradient(135deg, #16A085 0%, #1ABC9C 100%)",
  },
];

const TariffsPage = () => {
  return (
    <StyledWrapper>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          {services.map((service, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
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
                  >
                    Узнать больше
                  </Button>
                </CardContent>

                {/* Decorative element */}
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
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </StyledWrapper>
  );
};

export default TariffsPage;
const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: start;
  font-size: 50px;
  font-weight: 700;
  color: yellowgreen;
`;
