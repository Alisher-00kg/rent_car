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
    height:
      variant === "base"
        ? "31px"
        : variant === "showmore"
        ? "46px"
        : "fit-content",
    fontSize: variant === "showmore" ? "18px" : "16px",
    fontWeight: "500",
    borderRadius: "10px",
    color:
      variant === "base"
        ? "#fff"
        : variant === "text"
        ? "#7E52FF"
        : variant === "showmore"
        ? "#03045E"
        : "",
    background:
      variant === "base" ? "#03045E" : variant === "showmore" ? "#FFF902" : "",
    "& span": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
    },
  },
}));
