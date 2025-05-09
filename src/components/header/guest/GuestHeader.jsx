import { styled } from "@mui/material";
import { PATHS } from "../../../utils/constants/constants";
import { NavLink } from "react-router-dom";

const GuestHeader = () => {
  return (
    <StyledHeader>
      <NavLink to={PATHS.GUEST.ROOT} className={"link"}>
        <h2>
          Rent<span>Car</span>
        </h2>
      </NavLink>
      <nav className="nav">
        <StyledNavLink to={PATHS.GUEST.TARIFFS}>Тарифы</StyledNavLink>
        <StyledNavLink to={PATHS.GUEST.SALES}>Акции</StyledNavLink>
        <StyledNavLink to={PATHS.GUEST.CONTACTS}>Контакты</StyledNavLink>
        <StyledNavLink to={PATHS.GUEST.ADDRESS}>Адрес</StyledNavLink>
        <StyledNavLink to={PATHS.GUEST.PROFILE}>Профиль</StyledNavLink>
      </nav>
    </StyledHeader>
  );
};

export default GuestHeader;

const StyledHeader = styled("header")({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  height: "100px",
  width: "100%",
  background: "#03045e",
  position: "fixed",
  top: "0",
  left: "0",
  zIndex: 2,
  "& .nav": {
    display: "flex",
    gap: "50px",
  },
  "& h2": {
    color: "white",
    "& span": {
      color: "#fff902",
    },
  },
  "& .link": {
    textDecoration: "none",
  },
});

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-weight: 700;
  font-size: 20px;
  color: white;
  &.active {
    color: #fff902;
    border-bottom: 2px solid #fff902;
  }
  &:hover {
    color: #fff902;
  }
`;
