import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Typography,
  Select as MuiSelect,
  MenuItem,
  InputLabel,
  Slider,
  InputAdornment,
  IconButton,
  Paper,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Card from "../../components/UI/card/Card";
import { Select } from "../../components/UI/select/Select";
import { transmissionOptionsTariffs } from "../../utils/constants/admin-create-card/options";
import { styled as muiStyled } from "@mui/material/styles";
import Button from "../../components/UI/button/Button";
import Input from "../../components/UI/input/Input";
import { CiSearch } from "react-icons/ci";
import { getAllCars } from "../../store/thunks/allCars";
import { BreadCrumbs } from "../../components/UI/breadcrumbs/BreadCrumbs";

const TariffsPage = () => {
  const { cars } = useSelector((state) => state.allCars);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);

  const getFilter = (key, fallback = "") => searchParams.get(key) || fallback;
  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  const filteredCarsQuery = useMemo(() => {
    if (!searchQuery.trim()) {
      return cars;
    }

    const query = searchQuery.toLowerCase().trim();

    return cars.filter((car) => {
      if (car.brand?.toLowerCase().includes(query)) return true;

      if (car.model?.toLowerCase().includes(query)) return true;

      if (car.category?.toLowerCase().includes(query)) return true;

      if (car.yearOfRelease?.toString().includes(query)) return true;

      if (car.transmission?.toLowerCase().includes(query)) return true;

      if (car.fuelType?.toLowerCase().includes(query)) return true;

      if (car.rentPrice?.toString().includes(query)) return true;

      return false;
    });
  }, [cars, searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  const filters = {
    category: getFilter("category", "Все"),
    transmission: getFilter("transmission", "Все"),
    year: getFilter("year", "Все"),
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
      const matchCategory =
        filters.category && filters.category !== "Все"
          ? car.category === filters.category
          : true;

      const matchTransmission =
        filters.transmission && filters.transmission !== "Все"
          ? car.transmission === filters.transmission
          : true;

      const matchYear =
        filters.year && filters.year !== "Все"
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

  const resetFilters = () => {
    setSearchParams({});
  };
  function getRouteByRole() {
    switch (role) {
      case "USER":
        return [
          { label: "Главная", href: "/user/user-page" },
          { label: "Тарифы", href: "/user/tariffs" },
        ];
      default:
        return [
          { label: "Главная", href: "/guest/main-page" },
          { label: "Тарифы", href: "/guest/tariffs" },
        ];
    }
  }

  return (
    <div style={{ width: "100%", padding: "0px 90px" }}>
      <StyledTitleAndBr>
        <BreadCrumbs breadcrumbs={getRouteByRole()} />
      </StyledTitleAndBr>
      <StyledInnerPanel>
        <form onSubmit={handleSearchSubmit} style={{ display: "contents" }}>
          <StyledInput
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Поиск по модели, категории, году..."
            borderradius="11px"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" type="submit">
                    <CiSearch />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </StyledInnerPanel>
      <Paper
        elevation={2}
        style={{
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "30px",
          background: "#f9f9f9",
        }}
      >
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} sm={3}>
            <StyledInputLabel>
              Категория <em>*</em>
            </StyledInputLabel>
            <StyledSelect
              value={filters.category}
              onChange={(e) => handleChange("category", e.target.value)}
            >
              <MenuItem value="Все">Все</MenuItem>
              {uniqueCategories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </StyledSelect>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Select
              value={filters.transmission || "Все"}
              onChange={(e) => handleChange("transmission", e.target.value)}
              label="Трансмиссия"
              required
              options={transmissionOptionsTariffs}
              sx={{
                height: "44px",
                borderRadius: "8px",
                background: "#fff",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "8px",
                },
                "& .MuiSelect-select": {
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  height: "44px",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <StyledInputLabel>
              Год выпуска <em>*</em>
            </StyledInputLabel>
            <StyledSelect
              value={filters.year}
              onChange={(e) => handleChange("year", e.target.value)}
            >
              <MenuItem value="Все">Все</MenuItem>
              {uniqueYears.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </StyledSelect>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography gutterBottom>
              Макс. цена: {filters.price || maxPrice} ₽
            </Typography>
            <Slider
              value={Number(filters.price || maxPrice)}
              min={0}
              max={maxPrice}
              onChange={(_, value) => handleChange("price", value)}
            />
          </Grid>
        </Grid>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="outlined"
            onClick={resetFilters}
            style={{
              height: "40px",
              padding: "0 16px",
              borderRadius: "8px",
              textTransform: "none",
            }}
          >
            Сбросить фильтры
          </Button>
        </div>
      </Paper>

      {searchQuery && (
        <SearchResults>
          Найдено результатов: {filteredCarsQuery.length} из {cars.length}
        </SearchResults>
      )}

      <StyledUl>
        {(searchQuery ? filteredCarsQuery : filteredCars).map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </StyledUl>
    </div>
  );
};

export default TariffsPage;

const StyledUl = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 50px;
  flex-wrap: wrap;
  padding: 0;
  margin-top: 80px;
`;

const StyledSelect = muiStyled(MuiSelect)({
  height: "44px",
  borderRadius: "8px",
  width: "100%",
  backgroundColor: "#fff",
  "& .MuiSelect-select": {
    height: "44px",
    display: "flex",
    alignItems: "center",
    padding: "10px 14px",
    borderRadius: "8px",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "8px",
  },
});

const StyledInputLabel = muiStyled(InputLabel)({
  textAlign: "start",
  width: "100%",
  color: "#00000099",
  fontSize: "14px",
  fontWeight: 500,
  marginBottom: "12px",
  "& em": {
    color: "red",
    marginLeft: 2,
    fontStyle: "normal",
  },
});
const SearchResults = styled.div`
  color: #666;
  font-size: 14px;
  align-self: flex-start;
  margin-left: 20px;
`;
const StyledInnerPanel = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
`;

const StyledInput = muiStyled(Input)({
  width: "550px",
});
const StyledTitleAndBr = muiStyled("div")(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "start",
  borderBottom: "2px solid #cdcdcd",
  marginBottom: "50px",
}));
