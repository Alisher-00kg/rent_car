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
  ...rest
}) => {
  return (
    <StyledWrapper>
      {label && (
        <InputLabel sx={{ textAlign: "start", width: "100%" }}>
          {label}
        </InputLabel>
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
  },
}));
