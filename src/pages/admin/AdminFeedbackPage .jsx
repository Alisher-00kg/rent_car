import { useEffect, useState } from "react";
import Button from "../../components/UI/button/Button";
import Input from "../../components/UI/input/Input";
import {
  fetchFeedbackMessages,
  sendFeedbackReply,
} from "../../store/thunks/adminfeedbackThunks";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "../../components/UI/table";
import deleteIcon from "../../assets/icons/delete-icon.svg";

import { BaseModal } from "../../components/UI/modal/BaseModal";
import { Checkbox, IconButton } from "@mui/material";

const feedbackMessages = [
  {
    id: 1,
    fullName: "Владимир Владимирович",
    email: "vlad10@gmail.com",
    phoneNumber: "+7 999 111 2233",
    message: "Здравствуйте! Как арендовать машину?",
    adminReply: "рплап",
  },
  {
    id: 2,
    fullName: "Владимир Владимирович",
    email: "vlad10@gmail.com",
    phoneNumber: "+7 999 111 2233",
    message: "Здравствуйте! Как продлить время?",
    adminReply: "вавв",
  },
];

const AdminFeedbackPage = () => {
  // const dispatch = useDispatch();
  // const messages = useSelector((state) => state.feedback?.massages);
  // const [replies, setReplies] = useState({});
  const [selectedFeedbackIds, setSelectedFeedbackIds] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openReplyModal = (message) => {
    console.log("Opening modal for message:", message);
    setSelectedMessage(message);
    setReplyText("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
    setReplyText("");
  };

  // useEffect(() => {
  //   dispatch(fetchFeedbackMessages());
  // }, [dispatch]);

  const handleSendReply = (id) => {
    console.log("Отправка ответа на сообщение с id:", id);
    console.log("Текст ответа:", replyText);

    closeModal();
  };
  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    { Header: "Имя", accessor: "fullName" },
    { Header: "Телефон", accessor: "phoneNumber" },
    { Header: "Электронная почта", accessor: "email" },
    { Header: "Сообщение", accessor: "message" },
    {
      Header: "Ответ администратора",
      Cell: ({ row }) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              openReplyModal(row.original);
            }}
          >
            Ответить
          </Button>
        </div>
      ),
    },
    {
      Header: "Действие",
      accessor: "action",
      Cell: ({ row }) => (
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
      ),
    },
  ];

  const handleDeleteOne = (id) => {
    console.log("Удалить обращение с ID:", id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Сообщения с формы обратной связи</h2>
      <Table
        columns={columns}
        data={feedbackMessages}
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
