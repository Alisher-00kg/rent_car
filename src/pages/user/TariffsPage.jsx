// import styled from "styled-components";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Container,
//   Grid,
// } from "@mui/material";
// import {
//   DirectionsCar,
//   Person,
//   AccessTime,
//   ArrowForward,
// } from "@mui/icons-material";
// const services = [
//   {
//     title: "Прокат автомобилей",
//     description:
//       "Современные и надежные автомобили на любой вкус — от эконома до премиум-класса. Все авто проходят регулярное обслуживание и готовы к любым поездкам.",
//     icon: <DirectionsCar sx={{ fontSize: 40, color: "white" }} />,
//     bgColor: "#FF6B35",
//     bgGradient: "linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)",
//     cta: "Свяжитесь с менеджером",
//   },
//   {
//     title: "Аренда с водителем",
//     description:
//       "Профессиональные водители и комфортные автомобили — идеальное решение для деловых встреч, трансферов в аэропорт и особых мероприятий.",
//     icon: <Person sx={{ fontSize: 40, color: "white" }} />,
//     bgColor: "#2C3E50",
//     bgGradient: "linear-gradient(135deg, #2C3E50 0%, #34495E 100%)",
//     cta: "Напишите нам",
//   },
//   {
//     title: "Долгосрочная аренда",
//     description:
//       "Гибкие условия аренды на длительный срок для бизнеса и личного пользования. Удобные тарифы и индивидуальный подход к каждому клиенту.",
//     icon: <AccessTime sx={{ fontSize: 40, color: "white" }} />,
//     bgColor: "#16A085",
//     bgGradient: "linear-gradient(135deg, #bfa70a 0%, #fd9d43 100%)",
//     cta: "Получить консультацию",
//   },
// ];
// const openLink = (url) => window.open(url, "_blank");

// const TariffsPage = () => {
//   return (
//     <StyledWrapper>
//       <Container maxWidth="lg">
//         <Grid container spacing={4} justifyContent="center">
//           {services.map((service, index) => (
//             <Grid item xs={12} md={4} key={index}>
//               <Card
//                 sx={{
//                   height: "100%",
//                   background: service.bgGradient,
//                   color: "white",
//                   borderRadius: 4,
//                   overflow: "hidden",
//                   position: "relative",
//                   transition: "all 0.3s ease-in-out",
//                   "&:hover": {
//                     transform: "translateY(-8px)",
//                     boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
//                   },
//                 }}
//               >
//                 <CardContent
//                   sx={{
//                     p: 4,
//                     height: "100%",
//                     display: "flex",
//                     flexDirection: "column",
//                   }}
//                 >
//                   <Box sx={{ mb: 3 }}>{service.icon}</Box>

//                   <Typography
//                     variant="h4"
//                     component="h2"
//                     sx={{
//                       fontWeight: "bold",
//                       mb: 3,
//                       fontSize: { xs: "1.5rem", md: "2rem" },
//                     }}
//                   >
//                     {service.title}
//                   </Typography>

//                   <Typography
//                     variant="body1"
//                     sx={{
//                       mb: 4,
//                       lineHeight: 1.6,
//                       opacity: 0.95,
//                       flexGrow: 1,
//                     }}
//                   >
//                     {service.description}
//                   </Typography>

//                   <Button
//                     variant="text"
//                     endIcon={<ArrowForward />}
//                     sx={{
//                       color: "white",
//                       fontSize: "1.1rem",
//                       fontWeight: 600,
//                       alignSelf: "flex-start",
//                       p: 0,
//                       "&:hover": {
//                         backgroundColor: "rgba(255,255,255,0.1)",
//                         transform: "translateX(5px)",
//                       },
//                       transition: "all 0.3s ease",
//                     }}
//                     onClick={() => openLink("https://wa.me/+79992781923")}
//                   >
//                     {service.cta}
//                   </Button>
//                 </CardContent>

//                 <Box
//                   sx={{
//                     position: "absolute",
//                     top: -50,
//                     right: -50,
//                     width: 100,
//                     height: 100,
//                     borderRadius: "50%",
//                     background: "rgba(255,255,255,0.1)",
//                     opacity: 0.3,
//                   }}
//                 />
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </StyledWrapper>
//   );
// };

// export default TariffsPage;
// const StyledWrapper = styled.div`
//   width: 100%;
//   min-height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: start;
//   font-size: 50px;
//   font-weight: 700;
//   color: yellowgreen;
// `;
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Slider,
  Container,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";

const TariffsPage = () => {
  const { cars } = useSelector((state) => state.allCars);
  const [searchParams, setSearchParams] = useSearchParams();

  const getFilter = (key, fallback = "") => searchParams.get(key) || fallback;

  const filters = {
    category: getFilter("category"),
    transmission: getFilter("transmission"),
    year: getFilter("year"),
    price: getFilter("price"),
  };

  const handleChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchCategory = filters.category
        ? car.category === filters.category
        : true;
      const matchTransmission = filters.transmission
        ? car.transmission === filters.transmission
        : true;
      const matchYear = filters.year
        ? car.yearOfRelease === filters.year
        : true;
      const matchPrice = filters.price
        ? Number(car.rentPrice) <= Number(filters.price)
        : true;
      return (
        matchCategory &&
        matchTransmission &&
        matchYear &&
        matchPrice &&
        car.hasCarInStock
      );
    });
  }, [cars, filters]);

  const uniqueCategories = [...new Set(cars.map((car) => car.category))];
  const uniqueYears = [...new Set(cars.map((car) => car.yearOfRelease))];
  const maxPrice = Math.max(...cars.map((car) => Number(car.rentPrice)));

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Категория</InputLabel>
            <Select
              value={filters.category}
              onChange={(e) => handleChange("category", e.target.value)}
              label="Категория"
            >
              <MenuItem value="">Все</MenuItem>
              {uniqueCategories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Трансмиссия</InputLabel>
            <Select
              value={filters.transmission}
              onChange={(e) => handleChange("transmission", e.target.value)}
              label="Трансмиссия"
            >
              <MenuItem value="">Все</MenuItem>
              <MenuItem value="АКПП">АКПП</MenuItem>
              <MenuItem value="МКПП">МКПП</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Год выпуска</InputLabel>
            <Select
              value={filters.year}
              onChange={(e) => handleChange("year", e.target.value)}
              label="Год выпуска"
            >
              <MenuItem value="">Все</MenuItem>
              {uniqueYears.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography gutterBottom>
            Максимальная цена: {filters.price || maxPrice} ₽
          </Typography>
          <Slider
            value={Number(filters.price || maxPrice)}
            min={0}
            max={maxPrice}
            onChange={(_, value) => handleChange("price", value)}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {filteredCars.map((car) => (
          <Grid item xs={12} sm={6} md={4} key={car.id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                image={car.images?.[0]}
                alt={car.brand}
                sx={{ height: 200, objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {car.brand} {car.model}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {car.category} • {car.yearOfRelease} • {car.transmission}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {car.rentPrice} ₽ / день
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TariffsPage;
