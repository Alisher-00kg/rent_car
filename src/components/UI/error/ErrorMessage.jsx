import styled from "styled-components";

export const ErrorMessage = ({ children }) => {
  return <StyledErrorMessage>{children}</StyledErrorMessage>;
};

const StyledErrorMessage = styled.p`
  position: absolute;
  left: 0;
  color: red;
  font-size: 12px;
`;
