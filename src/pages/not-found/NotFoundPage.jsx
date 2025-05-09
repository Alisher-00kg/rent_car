import styled from "styled-components";

export const NotFoundPage = () => {
  return (
    <StyledWrapper>
      <StyledHeading>Oops Not found Page</StyledHeading>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledHeading = styled.h1`
  color: red;
`;
