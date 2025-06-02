import { Fade, IconButton, Menu, MenuItem, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { PATHS } from "../../../utils/constants/constants";
import { Icons } from "../../../assets";
import { MdAdminPanelSettings } from "react-icons/md";
import { useState } from "react";
import { BaseModal } from "../../UI/modal/BaseModal";
import { LogoutModal } from "../../UI/modal/LogoutModal";
export const AdminHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
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
        <StyledMenu
          anchorEl={anchorEl}
          id="fade-menu"
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <StyledMenuItem onClick={handleClose}>
            <StyledLink onClick={handleOpenModal}>Log out</StyledLink>
          </StyledMenuItem>
        </StyledMenu>
        <StyledIconButton onClick={handleClick}>
          <span>Администратор</span>
          <Icons.ArrowDown />
        </StyledIconButton>
      </StyledRightBox>
      <BaseModal open={isOpen} onClose={handleCloseModal}>
        <LogoutModal onClose={handleCloseModal} />
      </BaseModal>
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
    gap: "30px",
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
    color: #fff902;
    font-size: 18px;
    font-weight: 600;
  }
`;

const StyledRightBox = styled("div")({
  display: "flex",
  alignItems: "center",
});
const StyledMenu = styled(Menu)(() => ({
  "& .css-1tktgsa-MuiPaper-root-MuiPopover-paper-MuiMenu-paper": {
    width: "150px",
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
