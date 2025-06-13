import { Badge, Fade, IconButton, Menu, MenuItem, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { PATHS } from "../../utils/constants/constants";
import { useContext, useEffect, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { Icons } from "../../assets";
import { BaseModal } from "../UI/modal/BaseModal";
import { LogoutModal } from "../UI/modal/LogoutModal";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineFavorite } from "react-icons/md";
import { FavoriteContext } from "../../context/FavoriteContext";
import Cookies from "js-cookie";
import { getSingleUserData } from "../../store/thunks/usersThunk";
import { Notification } from "../UI/notification/Notification";

const Header = () => {
  const { user } = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { counter } = useContext(FavoriteContext);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [anchorElNotification, setAnchorElNotification] = useState(null);

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

  const handleClickNotification = (event) => {
    setAnchorElNotification(event.currentTarget);
    setIsOpenNotification(true);
  };
  useEffect(() => {
    const userData = JSON.parse(Cookies.get("auth"));

    if (!user?.id) {
      dispatch(getSingleUserData(userData.data.id));
    }
  }, [dispatch, user?.id]);

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
          <span>{user.firstName}</span>
          <Icons.ArrowDown />
        </StyledIconButton>
        <div>
          <IconButton onClick={handleClickNotification}>
            <IoIosNotificationsOutline
              style={{
                color: "white",
                width: "25",
                height: "25",
                cursor: "pointer",
              }}
            />
          </IconButton>
          <Notification
            open={isOpenNotification}
            onClose={() => setIsOpenNotification(false)}
            anchorEl={anchorElNotification}
          />
          <IconButton onClick={() => navigate(PATHS.USER.FAVORITE)}>
            <Badge
              badgeContent={counter}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "rgb(250, 223, 70)",
                  color: "#03045e",
                },
              }}
            >
              <MdOutlineFavorite
                style={{
                  color: "white",
                  width: "25",
                  height: "25",
                  fill: "white",
                  cursor: "pointer",
                }}
              />
            </Badge>
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
  zIndex: 10,
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
