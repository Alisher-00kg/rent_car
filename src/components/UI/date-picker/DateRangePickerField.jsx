import { Box, TextField } from "@mui/material";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const DateRangePickerField = ({ value, onChange }) => {
  const handleStartDateChange = (newDate) => {
    onChange({ ...value, startDate: newDate.toDate() });
  };

  const handleEndDateChange = (newDate) => {
    onChange({ ...value, endDate: newDate.toDate() });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" gap={2} mt={2}>
        <DateTimePicker
          label="Дата начала"
          value={dayjs(value.startDate)}
          onChange={handleStartDateChange}
          renderInput={(props) => <TextField {...props} />}
        />
        <DateTimePicker
          label="Дата окончания"
          value={dayjs(value.endDate)}
          onChange={handleEndDateChange}
          renderInput={(props) => <TextField {...props} />}
        />
      </Box>
    </LocalizationProvider>
  );
};
