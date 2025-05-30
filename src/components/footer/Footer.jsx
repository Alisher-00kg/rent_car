import styled from "styled-components";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

export const Footer = () => {
  return (
    <StyledFooter>
      <StyledNav></StyledNav>
      <FooterContainer>
        <Section>
          <Title>О компании</Title>
          <Link href="#">О нас</Link>
          <Link href="#">Контакты</Link>
          <Link href="#">Партнёрство</Link>
        </Section>
        <Section>
          <Title>Служба поддержки</Title>
          <Link href="#">Центр помощи</Link>
          <Link href="#">Условия аренды</Link>
          <Link href="#">Политика конфиденциальности</Link>
        </Section>
        <Section>
          <Title>Контакты</Title>
          <Link href="+79992781923">
            <FaPhone /> +79992781923
          </Link>
          <Link href="mailto:rentcar@example.com">
            <FaEnvelope /> rentcar@bayel.com
          </Link>
        </Section>
        <Section>
          <Title>Мы в соцсетях</Title>
          <SocialIcons>
            <IconLink href="#">
              <FaFacebookF />
            </IconLink>
            <IconLink href="#">
              <FaInstagram />
            </IconLink>
            <IconLink href="#">
              <FaTwitter />
            </IconLink>
          </SocialIcons>
        </Section>
        <FooterBottom>
          © {new Date().getFullYear()} RentCar. Все права защищены.
        </FooterBottom>
      </FooterContainer>
    </StyledFooter>
  );
};
const StyledFooter = styled.footer`
  width: 100%;
  min-height: 300px;
`;

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 100px;
`;
const FooterContainer = styled.footer`
  background-color: #1f1f1f;
  color: #fff;
  padding: 40px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 30px;
`;

const Section = styled.div`
  flex: 1;
  min-width: 200px;
`;

const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 15px;
  color: #fff902;
`;

const Link = styled.a`
  display: block;
  color: #ccc;
  margin-bottom: 8px;
  font-size: 14px;
  text-decoration: none;

  &:hover {
    color: #fff;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
`;

const IconLink = styled.a`
  color: #ccc;
  font-size: 18px;

  &:hover {
    color: #f78b31;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #333;
  text-align: center;
  padding-top: 20px;
  font-size: 14px;
  color: #888;
  margin-top: 30px;
  width: 100%;
`;
