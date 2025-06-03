
import { useState } from "react";
import Button from "../../components/UI/button/Button";
import Input from "../../components/UI/input/Input";

const feedbackMessages = [
    {
        id: 1,
        name: "Айнура",
        surname: "Исакова",
        email: "aynura@example.com",
        phone: "+7 999 111 2233",
        message: "Здравствуйте! Как арендовать машину?",
        adminReply: "",
    },

];
const AdminFeedbackPage = () => {
    const [messages, setMessages] = useState(feedbackMessages);
    const [replies, setReplies] = useState({});

    const handleReplyChange = (id, value) => {
        setReplies((prev) => ({ ...prev, [id]: value }));
    };

    const handleSendReply = (id) => {
        const replyText = replies[id] || "";
        setMessages((prevMessages) =>
            prevMessages.map((msg) =>
                msg.id === id ? { ...msg, adminReply: replyText } : msg
            )
        );
        setReplies((prev) => ({ ...prev, [id]: "" }));
    };

    return (
        <div style={{ background:'rgba(201, 204, 248, 0.702)',height:'100%'} }>
            <h2>Сообщения с формы обратной связи</h2>
            {messages.map((item) => (
                <div
                    key={item.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "12px",
                        margin: "10px 0",
                    }}
                >
                    <p><strong>Имя:</strong> {item.name} {item.surname}</p>
                    <p><strong>Email:</strong> {item.email}</p>
                    <p><strong>Телефон:</strong> {item.phone}</p>
                    <p><strong>Сообщение:</strong> {item.message}</p>
                    <p><strong>Ответ администратора:</strong> {item.adminReply || "—"}</p>

                    <div style={{ marginTop: "10px" ,display:'flex',flexDirection:'column',gap:'20px'}}>
                        <Input
                            value={replies[item.id] || ""}
                            onChange={(e) => handleReplyChange(item.id, e.target.value)}
                            placeholder="Напишите ответ..."
                            multiline
                            rows={4}
                            style={{ width: "50%" }}
                        />
                        <Button width="300px" variant="contained"onClick={() => handleSendReply(item.id)}>
                            Отправить ответ
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default AdminFeedbackPage;
