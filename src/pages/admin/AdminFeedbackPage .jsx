import { useEffect, useState } from "react";
import Button from "../../components/UI/button/Button";
import Input from "../../components/UI/input/Input";
import {
  deleteFeedBack,
  fetchFeedbackMessages,
  sendFeedbackReply,
} from "../../store/thunks/adminfeedbackThunks";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "../../components/UI/table";
import deleteIcon from "../../assets/icons/delete-icon.svg";

import { BaseModal } from "../../components/UI/modal/BaseModal";
import { IconButton, Tooltip } from "@mui/material";

const AdminFeedbackPage = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.feedback);

  const [selectedFeedbackIds, setSelectedFeedbackIds] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openReplyModal = (message) => {
    setSelectedMessage(message);
    setReplyText("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
    setReplyText("");
  };

  useEffect(() => {
    dispatch(fetchFeedbackMessages());
  }, [dispatch]);

  const handleSendReply = (id) => {
    dispatch(
      sendFeedbackReply({
        id,
        response: {
          text: replyText,
          status: "unread",
        },
      })
    );
    closeModal();
  };

  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    { Header: "Имя", accessor: "name" },
    { Header: "Фамилия", accessor: "surname" },
    { Header: "Электронная почта", accessor: "email" },
    { Header: "Сообщение", accessor: "message" },
    {
      Header: "Ответ администратора",
      accessor: "response",
      Cell: ({ value, row }) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {value && value.text ? (
            <span>{value.text}</span>
          ) : (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                openReplyModal(row.original);
              }}
            >
              Ответить
            </Button>
          )}
        </div>
      ),
    },
    {
      Header: "Действие",
      accessor: "action",
      Cell: ({ row }) => (
        <Tooltip arrow title="Удалить">
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteOne(row.original.id);
            }}
            aria-label="Удалить"
            style={{ marginLeft: "20px" }}
          >
            <img src={deleteIcon} alt="" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const handleDeleteOne = (id) => {
    dispatch(deleteFeedBack(id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Сообщения с формы обратной связи</h2>
      <Table
        columns={columns}
        data={messages}
        selectedIds={selectedFeedbackIds}
        setSelectedIds={setSelectedFeedbackIds}
      />
      {isModalOpen && selectedMessage && (
        <BaseModal open={isModalOpen} onClose={closeModal}>
          <div
            style={{ display: "flex", gap: "15px", flexDirection: "column" }}
          >
            <h3>Ответ на сообщение от {selectedMessage.fullName}</h3>
            <p>
              <strong>Сообщение:</strong> {selectedMessage.message}
            </p>
          </div>

          <Input
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Напишите ответ..."
            multiline
            rows={5}
            fullWidth
            style={{ margin: "20px 0" }}
          />
          <Button
            onClick={() => handleSendReply(selectedMessage.id)}
            variant="contained"
          >
            Отправить
          </Button>
        </BaseModal>
      )}
    </div>
  );
};
export default AdminFeedbackPage;
