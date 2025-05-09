import { styled, TextField } from "@mui/material";
import { forwardRef } from "react";

const Input = forwardRef(({ placeholder, label, ...props }, ref) => {
  return (
    <StyledInput
      type="text"
      placeholder={placeholder}
      label={label}
      inputRef={ref}
      {...props}
    />
  );
});

export default Input;
const StyledInput = styled(TextField)(() => ({
  "& .css-quhxjy-MuiInputBase-root-MuiOutlinedInput-root": {
    borderRadius: "6px",
    height: "fit-content",
    "& ::placeholder": {
      color: "#535353",
    },
  },
}));
