import { IconButton, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { PATHS } from "../../../utils/constants/constants";
import { Icons } from "../../../assets";
import { MdAdminPanelSettings } from "react-icons/md";
export const AdminHeader = () => {
  const { role } = useSelector((state) => state.auth);
  return (
    <StyledHeader>
      <NavLink to={PATHS.ADMIN.ROOT} className={"link"}>
        <h2>
          Rent<span>Car</span>
        </h2>
      </NavLink>
      <nav className="nav">
        <StyledNavLink to={PATHS.ADMIN.PAGE}>Машины</StyledNavLink>
        <StyledNavLink to={PATHS.ADMIN.ORDERS}>Заказы</StyledNavLink>
      </nav>
      <StyledRightBox>
        <MdAdminPanelSettings
          style={{ color: "white", width: "25", height: "25" }}
        />
        <StyledIconButton>
          <span>Администратор</span>
          <Icons.ArrowDown />
        </StyledIconButton>
      </StyledRightBox>
    </StyledHeader>
  );
};

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

const StyledIconButton = styled(IconButton)`
  display: flex;
  align-items: center;
  gap: 8px;
  span {
    color: #fff;
    font-size: 16px;
  }
`;

const StyledRightBox = styled("div")({
  display: "flex",
  alignItems: "center",
});
