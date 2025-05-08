import { Button as MuiButton, styled } from "@mui/material";
import React from "react";

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
const StyledButton = styled(MuiButton)(({ variant = "contained" }) => ({
  fontSize: "17px",
  fontWeight: "600",
  background: "#fff",
  color: "gray",
  borderRadius: "9.9px",
  "&:active": {
    background: "#3a3af8",
    color: "white",
    transition: "0.2s",
  },
}));
