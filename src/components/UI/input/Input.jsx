import { styled, TextField } from "@mui/material";
import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      placeholder,
      InputProps,
      borderradius = null,
      label,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    return (
      <StyledInput
        type="text"
        placeholder={placeholder}
        label={label}
        inputRef={ref}
        InputProps={InputProps}
        borderradius={borderradius}
        value={value}
        onChange={onChange}
        {...props}
      />
    );
  }
);

export default Input;
const StyledInput = styled(TextField)(({ borderradius }) => ({
  "& .MuiInputBase-root": {
    borderRadius: borderradius || "6px",
    height: "fit-content",
    "& ::placeholder": {
      color: "#535353",
    },
  },
}));
