import { Fade, IconButton, Menu, MenuItem, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { PATHS } from "../../utils/constants/constants";
import { useEffect, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { Icons } from "../../assets";
import { BaseModal } from "../UI/modal/BaseModal";
import { LogoutModal } from "../UI/modal/LogoutModal";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineFavorite } from "react-icons/md";
import Cookies from "js-cookie";

const Header = () => {
  const [localValue, setLocalValue] = useState("");
  const { role } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
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
  useEffect(() => {
    const authUserCookie = Cookies.get("auth");
    const userData = JSON.parse(authUserCookie);
    setLocalValue(userData?.data?.firstName);
  }, []);
  return (
    <StyledHeader>
      <NavLink to={PATHS.USER.ROOT} className={"link"}>
        <h2>
          Rent<span>Car</span>
        </h2>
      </NavLink>
      {role === "USER" && (
        <nav className="nav">
          <StyledNavLink to={PATHS.USER.TARIFFS}>Тарифы</StyledNavLink>
          <StyledNavLink to={PATHS.USER.SALES}>Акции</StyledNavLink>
          <StyledNavLink to={PATHS.USER.CONTACTS}>Контакты</StyledNavLink>
          <StyledNavLink to={PATHS.USER.ABOUTUS}>О нас</StyledNavLink>
          <StyledNavLink to={PATHS.USER.PROFILE}>Профиль</StyledNavLink>
        </nav>
      )}

      <StyledRightBox>
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
          <FaRegCircleUser
            style={{ color: "white", width: "25", height: "25" }}
          />
          <span>{localValue}</span>
          <Icons.ArrowDown />
        </StyledIconButton>
        <div>
          <IconButton>
            <IoIosNotificationsOutline
              style={{
                color: "white",
                width: "25",
                height: "25",
                cursor: "pointer",
              }}
            />
          </IconButton>
          <IconButton onClick={() => navigate(PATHS.USER.FAVORITE)}>
            <MdOutlineFavorite
              style={{
                color: "white",
                width: "25",
                height: "25",
                fill: "white",
                cursor: "pointer",
              }}
            />
          </IconButton>
        </div>
      </StyledRightBox>
      <BaseModal open={isOpen} onClose={handleCloseModal}>
        <LogoutModal onClose={handleCloseModal} />
      </BaseModal>
    </StyledHeader>
  );
};

export default Header;

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
    color: #fff902;
    font-size: 18px;
    font: 600;
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
