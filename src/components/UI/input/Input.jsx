import { styled, TextField } from "@mui/material";
import React from "react";

const Input = ({ placeholder }) => {
  return <StyledInput type="text" placeholder={placeholder} />;
};

export default Input;
const StyledInput = styled(TextField)(() => ({
  "& .css-quhxjy-MuiInputBase-root-MuiOutlinedInput-root": {
    borderRadius: "6px",
    height: "40px",
    "& ::placeholder": {
      color: "#535353",
    },
  },
}));
