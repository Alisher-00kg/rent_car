import { useState } from "react";
import { BreadCrumbs } from "../../components/UI/breadcrumbs/BreadCrumbs";
import Input from "../../components/UI/input/Input";
import { styled } from "@mui/material";
import Button from "../../components/UI/button/Button";
import { useSelector } from "react-redux";

export const ContactsPage = () => {
  const { role } = useSelector((state) => state.auth);
  function getRouteByRole() {
    switch (role) {
      case "USER":
        return [
          {
            label: "Главная",
            href: "/user/user-page",
          },
          {
            label: "Контакты",
            href: "/user/contacts",
          },
        ];
      default:
        return [
          {
            label: "Главная",
            href: "/guest/main-page",
          },
          {
            label: "Контакты",
            href: "/guest/contacts",
          },
        ];
    }
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleClick = () => {
    setName("");
    setEmail("");
    setSurname("");
    setPhone("");
    setMessage("");
  };
  return (
    <ContainerDiv>
      <StyledTitleAndBr>
        <BreadCrumbs breadcrumbs={getRouteByRole()} />
        <p>Контакты</p>
      </StyledTitleAndBr>
      <Container>
        <StyledLeftContainer>
          <Title>
            Компания аренды автомобилей ©
            <div className="title_box">
              Rent<span>Car</span>
            </div>
          </Title>
          <Box>
            <span>АДРЕС:</span>
            <p>г. Москва, ул. 800-летия Москвы, д28, к1</p>
          </Box>
          <Box>
            <span>Телефон:</span>
            <p>+79992781923</p>
          </Box>
          <Box>
            <span>Почта:</span>
            <p>abdibaitovvs@gmail.com</p>
          </Box>
          <Box>
            <span>Режим работы:</span>
            <p>10:00 - 21:00</p>
          </Box>
        </StyledLeftContainer>
        <StyledForm>
          <p className="form_title">Напишите нам</p>
          <div>
            <div className="right_parent">
              <StyledInputs>
                <div>
                  <Input
                    inputLabel={
                      <p className="label">
                        Имя<em>*</em>
                      </p>
                    }
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Напишите ваше имя"
                  />
                </div>
                <div>
                  <Input
                    inputLabel={
                      <p className="label">
                        Фамилия<em>*</em>
                      </p>
                    }
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="Напишите вашу фамилию"
                  />
                </div>
              </StyledInputs>
              <StyledInputs>
                <div>
                  <Input
                    inputLabel={
                      <p className="label">
                        Email<em>*</em>
                      </p>
                    }
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Напишите ваш email"
                  />
                </div>
                <div>
                  <Input
                    inputLabel={
                      <p className="label">
                        Телефон<em>*</em>
                      </p>
                    }
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (_ _ _) _ _ _  _ _  _ _"
                  />
                </div>
              </StyledInputs>
            </div>
          </div>
          <div>
            <StyledInput
              inputLabel={
                <p className="label">
                  Сообщение<em>*</em>
                </p>
              }
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Напишите сообщение"
            />
          </div>
          <Button variant={"contained"} onClick={handleClick}>
            Отправить
          </Button>
        </StyledForm>
      </Container>
      <MapContainer>
        <iframe
          title="Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1451.8109023955456!2d37.54793614067941!3d55.87873875735654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b5377a4777d6d1%3A0xa24645aa4c5e67e0!2z0YPQuy4gODAwLdC70LXRgtC40Y8g0JzQvtGB0LrQstGLLCDQnNC-0YHQutCy0LA!5e0!3m2!1sru!2sru!4v1748360818225!5m2!1sru!2sru"
          width="96%"
          height="700"
          style={{ border: 0 }}
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          loading="lazy"
        />
      </MapContainer>
    </ContainerDiv>
  );
};

const ContainerDiv = styled("div")(() => ({
  padding: "0px 90px",
}));
const StyledTitleAndBr = styled("div")(() => ({
  display: "flex",
  gap: "25px",
  flexDirection: "column",
  "& p": {
    fontSize: "30px",
    borderBottom: "2px solid #cdcdcd",
    fontFamily: "Ubuntu",
    fontWeight: "500 ",
    paddingBottom: "15px",
  },
}));
const StyledLeftContainer = styled("div")(() => ({
  display: "flex",
  gap: "19px",
  flexDirection: "column",
}));

const StyledForm = styled("form")(() => ({
  width: "688px",
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  "& .form_title": {
    fontFamily: "Inter",
    fontSize: "24px",
    fontWeight: "600",
  },
  "& em": {
    color: "red",
  },
  "& .right_parent": {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },
}));
const Container = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "40px 0px 0px 0px",
}));
const StyledInputs = styled("div")(() => ({
  display: "flex",
  gap: "12px",
  "& div": {
    display: "flex",
    width: "338px",
    height: "80px",
  },
  "& .label": {
    fontSize: "16px",
    fontWeight: "400",
  },
}));

const StyledInput = styled(Input)(() => ({
  ".MuiInputBase-root": {
    width: "685px",
    height: "200px",
    paddingBottom: "130px",
  },
}));

const Box = styled("div")(() => ({
  span: {
    fontFamily: "Inter",
    fontSize: "18px",
    fontWeight: "700",
  },
  p: {
    fontFamily: "Inter",
    fontSize: "18px",
    fontWeight: "400",
  },
}));

const Title = styled("p")(() => ({
  fontFamily: "Inter",
  fontWeight: "500",
  fontSize: "24px",
  display: "flex",
  alignItems: "center",
  gap: "15px",
  "& .title_box": {
    background: "#03045e",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "8px",
  },
  "& span": {
    color: "#e5fd0a",
  },
}));
const MapContainer = styled("div")(() => ({
  padding: "90px 0px 0px 40px",
}));
