import {
  Select as MUISelect,
  MenuItem,
  InputLabel,
  styled,
} from "@mui/material";

export const Select = ({
  label,
  value,
  onChange,
  options = [],
  name,
  error,
  helperText,
  disabled = false,
  fullWidth = true,
  required = false,
  ...rest
}) => {
  return (
    <StyledWrapper>
      {label && (
        <StyledInputLabel>
          {label}
          {required && <em>*</em>}
        </StyledInputLabel>
      )}
      <StyledSelect
        value={value}
        onChange={onChange}
        name={name}
        label={label}
        {...rest}
        sx={{
          marginTop: "12px",
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </StyledSelect>
    </StyledWrapper>
  );
};
const StyledWrapper = styled("div")({
  width: "100%",
});
const StyledSelect = styled(MUISelect)(() => ({
  "&.MuiInputBase-root": {
    borderRadius: "6px",
    width: "100%",
    width: "100%",
  },
}));
const StyledInputLabel = styled(InputLabel)({
  textAlign: "start",
  width: "100%",
  color: "#00000099",
  fontSize: "14px",
  fontWeight: 500,
  "& em": {
    color: "red",
    marginLeft: 2,
    fontStyle: "normal",
  },
});
