import { Button as MuiButton, styled } from "@mui/material";

const Button = ({ children, variant, onClick, type, disabled, ...props }) => {
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
const StyledButton = styled(MuiButton)(({ variant }) => ({
  "&.MuiButtonBase-root": {
    width: "100%",
    height: variant === "base" ? "31px" : "fit-content",
    fontSize: "16px",
    fontWeight: "500",
    borderRadius: "10px",
    color: variant === "base" ? "#fff" : "",
    background: variant === "base" ? "#03045E" : "",
  },
}));
