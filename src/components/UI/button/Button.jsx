import { Button as MuiButton, styled } from "@mui/material";

const Button = ({
  children,
  variant = "contained",
  onClick,
  type,
  disabled,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
const StyledButton = styled(MuiButton)(() => ({
  fontSize: "17px",
  fontWeight: "500",
  borderRadius: "9.9px",
}));
