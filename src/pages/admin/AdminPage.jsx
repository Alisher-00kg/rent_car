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
import { getAllCars, removeCarsDiscount } from "../../store/thunks/allCars";
import { toast } from "react-toastify";

export const AdminPage = () => {
  const { cars } = useSelector((state) => state.allCars);
  const [selectedCarIds, setSelectedCarIds] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  const handleRemoveDiscounts = async () => {
    if (selectedCarIds.length === 0) {
      toast.info("Выберите хотя бы одну машину для удаления скидки");
      return;
    }
    try {
      await dispatch(removeCarsDiscount(selectedCarIds)).unwrap();
      setSelectedCarIds([]);
    } catch (error) {
      toast.error("Ошибка при удалении скидок: " + error);
    }
  };
  const filteredCars = useMemo(() => {
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
          <Button
            onClick={handleRemoveDiscounts}
            variant="showmore"
            sx={{
              textTransform: "Capitalize",
            }}
          >
            Убрать скидку
          </Button>
        </StyledWrapperButtons>
      </StyledInnerPanel>
      <CreateDiscount
        isOpen={isOpen}
        onClose={handleCloseModal}
        selectedIds={selectedCarIds}
        setSelectedIds={setSelectedCarIds}
      />

      {searchQuery && (
        <SearchResults>
          Найдено результатов: {filteredCars.length} из {cars.length}
        </SearchResults>
      )}

      <Table
        columns={COLUMNS}
        data={filteredCars}
        selectedIds={selectedCarIds}
        setSelectedIds={setSelectedCarIds}
        tableType="adminPage"
      />
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

const StyledInput = muistyled(Input)({
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
