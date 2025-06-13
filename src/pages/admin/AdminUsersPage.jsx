import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersData } from "../../store/thunks/usersThunk";
import {
  IconButton,
  InputAdornment,
  styled as muistyled,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import Input from "../../components/UI/input/Input";
import Button from "../../components/UI/button/Button";
import { CiSearch } from "react-icons/ci";
import { usersColumn } from "../../utils/constants/usersColumn";
import { Table } from "../../components/UI/table";

export const AdminUsersPage = () => {
  const { users } = useSelector((state) => state.allUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) {
      return users;
    }

    const query = searchQuery.toLowerCase().trim();

    return users.filter((user) => {
      if (user.firstName?.toLowerCase().includes(query)) return true;

      if (user.lastName?.toLowerCase().includes(query)) return true;

      if (user.phoneNumber?.toLowerCase().includes(query)) return true;

      if (user.email?.toString().includes(query)) return true;

      return false;
    });
  }, [users, searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    dispatch(getAllUsersData());
  }, [dispatch]);
  return (
    <StyledWrapper>
      <StyledInnerPanel>
        <form onSubmit={handleSearchSubmit} style={{ display: "contents" }}>
          <StyledInput
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Поиск по имени, фамилии, почте, телефону..."
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

      {searchQuery && (
        <SearchResults>
          Найдено результатов: {filteredUsers.length} из {users.length}
        </SearchResults>
      )}

      <Table columns={usersColumn} data={filteredUsers} tableType="users" />
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
