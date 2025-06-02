import { styled, TextField } from "@mui/material";
import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      placeholder,
      InputProps,
      borderradius = null,
      label,
      inputLabel,
      value,
      onChange,
      id = null,
      ...props
    },
    ref
  ) => {
    const inputField = (
      <StyledInput
        type="text"
        id={typeof id === "string" ? id : undefined}
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

    if (inputLabel) {
      return (
        <StyledInputWrapper>
          <label htmlFor={typeof id === "string" ? id : undefined}>
            {inputLabel}
          </label>
          {inputField}
        </StyledInputWrapper>
      );
    }

    return inputField;
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
const StyledInputWrapper = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  gap: "12px",
  "& label": {
    color: "#00000099",
  },
});
