import { styled, TextField } from "@mui/material";
import { forwardRef } from "react";

const Input = forwardRef(
  ({ placeholder, InputProps, borderRadius = null, label, ...props }, ref) => {
    return (
      <StyledInput
        type="text"
        placeholder={placeholder}
        label={label}
        inputRef={ref}
        InputProps={InputProps}
        borderRadius={borderRadius}
        {...props}
      />
    );
  }
);

export default Input;
const StyledInput = styled(TextField)(({ borderRadius }) => ({
  "& .MuiInputBase-root": {
    borderRadius: borderRadius || "6px",
    height: "fit-content",
    "& ::placeholder": {
      color: "#535353",
    },
  },
}));
