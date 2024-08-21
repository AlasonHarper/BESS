import { FC, useEffect, useMemo, useState } from 'react';
import { CHOICE_DATA, PARAM_TYPE } from '../../utils/constant';
import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { UpdateParamInfo } from '../../store/types/types';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ChoiceComponent from './ChoiceComponent';
import SwitchComponent from './SwitchComponent';

interface CardItemProps {
  item: any;
  value: Record<string, any>;
  onChange: (name: string, value: any) => void;
}
const CardItem: FC<CardItemProps> = ({ item, value, onChange }) => {
  const type = useMemo(() => {
    return item.type;
  }, [item]);

  const customValue = useMemo(() => {
    if (typeof value === 'object' && Object.keys(value).includes(item?.title)) {
      return value[item?.title];
    }
    return '';
  }, [value, item]);

  return (
    <div className="flex justify-between items-center py-1">
      <div className={'px-2 text-left'}>{item.title}</div>
      <div className="">
        {typeof type !== 'string' ? (
          <></>
        ) : type.startsWith('choice') ? (
          <ChoiceComponent
            type={type}
            value={customValue}
            onChange={(v: any) => {
              onChange(item.title, v);
            }}
          />
        ) : type.startsWith('switch') ? (
          <SwitchComponent
            type={type}
            value={customValue}
            onChange={(v: any) => {
              onChange(item.title, v);
            }}
          />
        ) : type == PARAM_TYPE.NUMBER ? (
          <Input
            type="number"
            endAdornment={
              <InputAdornment position="end">
                {item?.unit?.label}
              </InputAdornment>
            }
            value={customValue}
            onChange={(v: any) => {
              onChange(item.title, v.target.value);
            }}
          />
        ) : type == PARAM_TYPE.DATE ? (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{
                '& .MuiInputBase-root': {
                  height: '40px'
                }
              }}
              value={dayjs(customValue)}
              onChange={(v: any) => {
                onChange(item.title, v.format('YYYY-MM-DD'));
              }}
            />
          </LocalizationProvider>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CardItem;
