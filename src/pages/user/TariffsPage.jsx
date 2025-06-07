import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Typography,
  Select as MuiSelect,
  MenuItem,
  InputLabel,
  Container,
  Slider,
  InputAdornment,
  IconButton,
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

const TariffsPage = () => {
  const { cars } = useSelector((state) => state.allCars);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  return (
    <Container sx={{ py: 4 }}>
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
      <Grid container spacing={2} mb={3}>
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
          />
        </Grid>
        <Grid item xs={12} sm={3}>
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
        <Button variant={"contained"} onClick={resetFilters}>
          Сбросить фильтры
        </Button>
      </Grid>
      {searchQuery && (
        <SearchResults>
          Найдено результатов: {filteredCarsQuery.length} из {cars.length}
        </SearchResults>
      )}

      <StyledUl>
        {filteredCars.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </StyledUl>
    </Container>
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
  margin-top: 40px;
`;
const StyledSelect = muiStyled(MuiSelect)(() => ({
  "&.MuiInputBase-root": {
    borderRadius: "6px",
    width: "100%",
    width: "100%",
  },
}));
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
`;

const StyledInput = muiStyled(Input)({
  width: "550px",
});
