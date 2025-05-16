import styled from "styled-components";

export const Footer = () => {
  return (
    <StyledFooter>
      <nav></nav>
      <StyledNav>
        <h2>
          Rent<span>Car</span>
        </h2>
        <h1>
          Выбирайте надёжность — выбирайте Rent<span>car</span>
        </h1>
      </StyledNav>
      <nav></nav>
    </StyledFooter>
  );
};
const StyledFooter = styled.footer`
  width: 100%;
  background: linear-gradient(#03045e, #03045e, #0077b6, #00d4b8);
  padding: 30px;
  min-height: 300px;
  margin-top: 20%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  nav > h2 {
    color: white;
    span {
      color: yellow;
    }
  }
`;
const StyledNav = styled.nav`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px;
  h1 {
    color: rgba(255, 255, 255, 0.7);
    span {
      color: #fff902;
    }
  }
`;
