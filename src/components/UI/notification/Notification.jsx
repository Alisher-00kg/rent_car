import { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import { List, MenuList, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../../api/axiosInstance";
import { getSingleUserFeedback } from "../../../store/thunks/usersThunk";

export const Notification = ({
  open = false,
  onClose,
  onShow = 0,
  anchorEl,
}) => {
  const [notifications, setNotifications] = useState([]);
  const { feedbacks } = useSelector((state) => state.allUsers);
  const { user } = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();
  const filteredFeedBacks = feedbacks?.filter((item) =>
    item.email?.toLowerCase().includes(user.email)
  );
  console.log(filteredFeedBacks, "feed");

  useEffect(() => {
    if (feedbacks?.length && user?.email) {
      const filteredFeedBacks = feedbacks.filter((item) =>
        item.email?.toLowerCase().includes(user.email)
      );

      const mapped = filteredFeedBacks.map((item) => ({
        id: item.id,
        message: item.message,
        status: item.response?.status,
        read: item.response?.status === "read",
        text: item.response?.text,
      }));

      setNotifications(mapped);
    }
  }, [feedbacks, user.email]);

  useEffect(() => {
    if (typeof onShow === "function") {
      const unreadWithTextCount = notifications.filter(
        (notify) => !notify.read && notify.text?.trim()
      ).length;
      onShow(unreadWithTextCount);
    }
  }, [notifications, onShow]);

  const markAsRead = async (id) => {
    try {
      const current = notifications.find((item) => item.id === id);

      await axiosInstance.patch(`/feedbacks/${id}`, {
        response: { status: "read", text: current.text || "" },
      });

      setNotifications((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, read: true, status: "read" } : item
        )
      );
    } catch (error) {
      console.error("Ошибка при отметке как прочитано:", error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axiosInstance.delete(`/feedbacks/${id}`);
      setNotifications((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении уведомления:", error);
    }
  };

  useEffect(() => {
    dispatch(getSingleUserFeedback());
  }, []);

  const markAllAsRead = async () => {
    try {
      const updateRequests = notifications
        .filter((n) => !n.read)
        .map((n) =>
          axiosInstance.patch(`/feedbacks/${n.id}`, {
            response: { status: "read", text: n.text || "" },
          })
        );

      await Promise.all(updateRequests);

      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          read: true,
          status: "read",
        }))
      );
    } catch (error) {
      console.error("Ошибка при отметке всех как прочитанных:", error);
    }
  };

  return (
    <StyledMenu
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      PaperProps={{
        sx: {
          transform: "translate(-40px, -20px) !important",
          padding: "0px 15px",
          overflowY: "visible",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <StyledHeaderMenuItem>
        <div>
          <p>Уведомления</p>
          <MarkReadText onClick={markAllAsRead}>Прочитано все</MarkReadText>
        </div>
      </StyledHeaderMenuItem>
      <StyledUlList>
        {notifications.length === 0 ? (
          <p>Нет уведомлений</p>
        ) : (
          notifications.map((notification) => (
            <StyledMenuList key={notification.id}>
              <Dot read={notification.read} />
              <InnerBlock
                onClick={() => markAsRead(notification.id)}
                style={{
                  opacity: notification.read ? 0.6 : 1,
                }}
              >
                <StyledAboutUser>
                  <strong>Сообщение:</strong>
                </StyledAboutUser>

                <DescriptionParentBox>
                  <CommentAndSvgBox>
                    <span className="comment">{notification.message}</span>

                    <span
                      style={{
                        marginLeft: "10px",
                        cursor: "pointer",
                        color: "red",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                    >
                      ✖
                    </span>
                  </CommentAndSvgBox>

                  <StyledMoreDescription>
                    <span className="time">Менеджер:{notification.text}</span>
                  </StyledMoreDescription>
                </DescriptionParentBox>
              </InnerBlock>
            </StyledMenuList>
          ))
        )}
      </StyledUlList>
    </StyledMenu>
  );
};
const StyledMenu = styled(Menu)({
  "& .MuiPaper-root": {
    width: "400px",
    minHeight: "15vh",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    transform: "translateX(-20px) !important",
  },
});

const StyledHeaderMenuItem = styled("div")(() => ({
  width: "100%",
  height: "40px",
  display: "flex",
  justifyContent: "end",
  padding: "16px 0px 15px 0px",
  background: "#ffffff",
  "& div": {
    width: "fit-content",
    display: "flex",
    alignItems: "center",
    gap: "40px",
  },
}));
const StyledUlList = styled(List)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  overflowY: "hidden",
  color: "#6e6c6c",
}));
const StyledMenuList = styled(MenuList)(() => ({
  width: "100%",
  display: "flex",
  alignItems: "start",
  flexDirection: "row",
  gap: "10px",
  borderBottom: "1px solid #E3E3E3",
  cursor: "pointer",
  paddingBottom: "10px",
}));

const MarkReadText = styled("span")(() => ({
  width: "fit-content",
  height: "18px",
  color: "#919191",
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "18px",
  cursor: "pointer",
  borderBottom: "1px solid ",
}));
const Dot = styled("div")(({ read, theme }) => ({
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  backgroundColor: read ? "transparent" : theme.palette.primary.light,
}));
const Container = styled("div")(({ background }) => ({
  width: "304px",
  height: "138px",
  borderRadius: "8px",
  cursor: "pointer",
  background:
    background?.startsWith("http") || background?.includes("/")
      ? `url(${background}) center/cover no-repeat`
      : background,
  color: "white",
  display: "flex",
  flexDirection: "column",
  padding: "16px",
  "& .title": {
    fontWeight: "500",
  },
}));
const InnerBlock = styled("div")(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  alignItems: "start",
}));

const StyledAboutUser = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
}));
const DescriptionParentBox = styled("div")(() => ({
  width: "fit-content",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
}));
const CommentAndSvgBox = styled("div")(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "8px",
  "& .comment": {
    flex: 1,
    fontWeight: "500",
    wordBreak: "break-word",
    whiteSpace: "pre-wrap",
  },
}));

const StyledMoreDescription = styled("div")(() => ({
  maxWidth: "100%",
  wordBreak: "break-word",
  whiteSpace: "pre-wrap",
  marginTop: "10px",
  "& .time": {
    color: "#0d67dd",
    fontSize: "14px",
    lineHeight: "1.4",
    fontWeight: "600",
  },
}));
