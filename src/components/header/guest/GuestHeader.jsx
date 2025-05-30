import { Fade, IconButton, Menu, MenuItem, styled } from "@mui/material";
import { PATHS } from "../../../utils/constants/constants";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Icons } from "../../../assets";
import { FaRegCircleUser } from "react-icons/fa6";

const GuestHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
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
        <StyledNavLink to={PATHS.GUEST.ABOUTUS}>О нас</StyledNavLink>
      </nav>
      <StyledRightBox>
        <StyledMenu
          anchorEl={anchorEl}
          id="fade-menu"
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <StyledMenuItem onClick={handleClose}>
            <StyledLink onClick={handleOpenModal}>Войти</StyledLink>
          </StyledMenuItem>
        </StyledMenu>
        <StyledIconButton onClick={handleClick}>
          <FaRegCircleUser
            style={{ color: "white", width: "25", height: "25" }}
          />
          <span>Гость</span>
          <Icons.ArrowDown />
        </StyledIconButton>
      </StyledRightBox>
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
const StyledRightBox = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "30px",
});
const StyledMenu = styled(Menu)(() => ({
  "& .css-1tktgsa-MuiPaper-root-MuiPopover-paper-MuiMenu-paper": {
    width: "120px",
    height: "54px",
    borderRadius: "10px",
  },
}));
const StyledMenuItem = styled(MenuItem)({
  "&:hover": {
    color: "#0073DE",
  },
});
const StyledLink = styled(Link)({
  width: "100%",
  textDecoration: "none",
  color: "#292929",
  textAlign: "center",

  "&:hover": {
    color: "#0073DE",
  },
});
const StyledIconButton = styled(IconButton)`
  display: flex;
  align-items: center;
  gap: 8px;
  span {
    color: #fff902;
    font-size: 18px;
    font-weight: 600;
  }
`;
