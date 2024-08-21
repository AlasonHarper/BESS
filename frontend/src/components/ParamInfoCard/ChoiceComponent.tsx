import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { FC, useMemo } from 'react';
import { CHOICE_DATA } from '../../utils/constant';

interface ChoiceComponentProps {
  type: string;
  value: string;
  onChange: (v: string) => void;
}
const ChoiceComponent: FC<ChoiceComponentProps> = ({
  type,
  value,
  onChange
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string);
  };

  const choiceList = useMemo(() => {
    if (Object.keys(CHOICE_DATA).includes(type)) return CHOICE_DATA[type];
    return [];
  }, [type, CHOICE_DATA]);
  return (
    <FormControl fullWidth sx={{ minWidth: 200, maxWidth: 300 }}>
      <Select variant="standard" value={value} onChange={handleChange}>
        {choiceList.map((option: any, index: number) => {
          return (
            <MenuItem
              disabled={option?.disabled == true}
              key={index}
              value={option.id}
            >
              {option.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default ChoiceComponent;
