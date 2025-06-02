import styled from "styled-components";
import { SuccesCheck } from "../../../assets/images/images";

export const SuccessMessage = () => (
  <StyledWrapper>
    <StyledImageCheck src={SuccesCheck} alt="succes check icon" />
    <StyledInnerBox>
      <h2>Ваша заявка успешно отправлено!</h2>
      <p>С вами свяжется наш менеджер в ближайшее время.</p>
    </StyledInnerBox>
  </StyledWrapper>
);
const StyledWrapper = styled.div`
  width: 100%;
  text-align: center;
  padding: 0px 30px 30px 30px;
`;
const StyledImageCheck = styled.img`
  width: 300px;
  height: 200px;
  object-fit: contain;
`;
const StyledInnerBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  h2 {
    color: #1522ad;
  }
  p {
    color: #1522ad;
    font-size: 18px;
  }
`;
