import { useEffect, useState } from "react";
import Button from "../../components/UI/button/Button";
import Input from "../../components/UI/input/Input";
import { fetchFeedbackMessages, sendFeedbackReply } from "../../store/thunks/adminfeedbackThunks";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "../../components/UI/table";

import { BaseModal } from "../../components/UI/modal/BaseModal";

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
    { Header: "Имя", accessor: "fullName" },
    { Header: "Телефон", accessor: "phoneNumber" },
    { Header: "Электронная почта", accessor: "email" },
    { Header: "Сообщение", accessor: "message" },
    {
      Header: "Ответ администратора",
      Cell: ({ row }) => (
        <Button
          variant="outlined"
          onClick={(e) => {
            e.stopPropagation();
            openReplyModal(row)
          }}
        >
          Ответить
        </Button>
      ),
    },

  ]


  return (

    <div style={{ padding: "20px" }}>
      <h2>Сообщения с формы обратной связи</h2>
      <Table columns={columns} data={feedbackMessages} />

      {isModalOpen && selectedMessage && (
        <BaseModal open={isModalOpen} onClose={closeModal}>
          <h3>Ответ на сообщение от {selectedMessage.fullName}</h3>
          <p>
            <strong>Сообщение:</strong> {selectedMessage.message}
          </p>
          <Input
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Напишите ответ..."
            multiline
            rows={5}
            fullWidth
            style={{ margin: "20px 0" }}
          />
          <Button onClick={handleSendReply} variant="contained">
            Отправить
          </Button>
        </BaseModal>
      )}
    </div>
  );
};
export default AdminFeedbackPage;

