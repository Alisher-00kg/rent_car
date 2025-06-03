import styled from "styled-components";
import Input from "../../components/UI/input/Input";
import Button from "../../components/UI/button/Button";
import { CiSearch } from "react-icons/ci";
import { IconButton, InputAdornment, Typography } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import { CreateDiscount } from "../../components/UI/modal/CreateDiscount";
import { COLUMNS, PATHS } from "../../utils/constants/constants";
import { useNavigate } from "react-router-dom";
import { styled as muistyled } from "@mui/material";
import { Table } from "../../components/UI/table";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars } from "../../store/thunks/allCars";

export const AdminPage = () => {
  const { cars } = useSelector((state) => state.allCars);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredCars = useMemo(() => {
    if (!searchQuery.trim()) {
      return cars;
    }

    const query = searchQuery.toLowerCase().trim();

    return cars.filter((car) => {
      // Поиск по модели
      if (car.model?.toLowerCase().includes(query)) return true;

      // Поиск по категории
      if (car.category?.toLowerCase().includes(query)) return true;

      // Поиск по году (конвертируем в строку)
      if (car.year?.toString().includes(query)) return true;

      // Поиск по коробке передач
      if (car.transmission?.toLowerCase().includes(query)) return true;

      // Поиск по типу топлива
      if (car.fuel?.toLowerCase().includes(query)) return true;

      // Поиск по двигателю
      if (car.engine?.toLowerCase().includes(query)) return true;

      // Поиск по цене
      if (car.pricePerDay?.toString().includes(query)) return true;

      return false;
    });
  }, [cars, searchQuery]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Поиск уже работает через useMemo, но можно добавить дополнительную логику
  };

  return (
    <StyledWrapper>
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
        <StyledWrapperButtons>
          <CreateSale variant="outlined" onClick={handleOpenModal}>
            Создать скидку
          </CreateSale>
          <StyledButton
            variant="outlined"
            onClick={() => navigate(PATHS.ADMIN.CREATE)}
          >
            Добавить карточку
          </StyledButton>
        </StyledWrapperButtons>
      </StyledInnerPanel>
      <CreateDiscount isOpen={isOpen} onClose={handleCloseModal} />

      {/* Показываем результаты поиска */}
      {searchQuery && (
        <SearchResults>
          Найдено результатов: {filteredCars.length} из {cars.length}
        </SearchResults>
      )}

      <Table columns={COLUMNS} data={filteredCars} />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const StyledInnerPanel = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledInput = styled(Input)({
  width: "550px",
});

const StyledButton = styled(Button)({
  width: "fit-content",
  fontSize: "16px",
  textTransform: "capitalize !important",
  "&.MuiButtonBase-root": {
    color: "#03045e",
    border: "1px solid #03045e",
  },
});

const StyledWrapperButtons = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 30px;
`;

const CreateSale = muistyled(Typography)({
  color: "#03045e",
  fontWeight: "500",
  cursor: "pointer",
  textDecoration: "underline dotted #03045e",
});

const SearchResults = styled.div`
  color: #666;
  font-size: 14px;
  align-self: flex-start;
  margin-left: 20px;
`;
