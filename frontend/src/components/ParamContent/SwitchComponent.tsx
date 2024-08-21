import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  Typography,
  styled
} from '@mui/material';
import { FC, useMemo } from 'react';
import { CHOICE_DATA, SWITCH_DATA } from '../../utils/constant';

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)'
    }
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff'
      }
    }
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200
    })
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,.35)'
        : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box'
  }
}));
interface SwitchComponentProps {
  type: string;
  value: string;
  onChange: (v: number) => void;
}
const SwitchComponent: FC<SwitchComponentProps> = ({
  type,
  value,
  onChange
}) => {
  const switchData = useMemo(() => {
    if (Object.keys(SWITCH_DATA).includes(type))
      return Object.values(SWITCH_DATA[type]);
    return [];
  }, [type, SWITCH_DATA]);

  const checked = useMemo(() => {
    const s = switchData.find((s) => s?.id == parseInt(value));
    if (s && s.id == 1) return true;
    return false;
  }, [value, switchData]);

  return (
    <>
      {switchData.length == 2 && (
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>{switchData[0].label}</Typography>
          <AntSwitch
            checked={checked}
            onChange={(v) => {
              if (v.target.checked == true) {
                onChange(1);
              } else {
                onChange(0);
              }
            }}
          />
          <Typography>{switchData[1].label}</Typography>
        </Stack>
      )}
    </>
  );
};

export default SwitchComponent;
