import { Button, ButtonGroup } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const DateRangePicker = ({
  value,
  onChange,
  minDate,
  maxDate
}: {
  value: { from: string; to: string };
  onChange: (v: { from: string; to: string }) => void;
  minDate: string;
  maxDate: string;
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <DatePicker
          value={dayjs(value?.from)}
          maxDate={dayjs(value?.to)}
          minDate={dayjs(minDate)}
          views={['month', 'year']}
          onChange={(v: any) => {
            onChange({ ...value, from: v.format('YYYY-MM-DD') });
          }}
        />
        <div
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            justifyContent: 'center'
          }}
        >
          -
        </div>
        <DatePicker
          minDate={dayjs(value?.from)}
          maxDate={dayjs(maxDate)}
          views={['month', 'year']}
          value={dayjs(value?.to)}
          onChange={(v: any) => {
            onChange({ ...value, to: v.format('YYYY-MM-DD') });
          }}
        />
      </div>
    </LocalizationProvider>
  );
};

export default DateRangePicker;
