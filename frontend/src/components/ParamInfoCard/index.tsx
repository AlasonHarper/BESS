import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Divider,
  Typography,
  useMediaQuery
} from '@mui/material';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import CardItem from './CardItem';
import { UpdateParamInfo } from '../../store/types/types';
import { Update } from '@reduxjs/toolkit';

interface ParamInfoCardProps {
  sub_category: any;
  value: UpdateParamInfo | null;
  onSave: (
    sub_category: string,
    value: Record<string, any>,
    isNew: boolean
  ) => void;
}

const ParamInfoCard: FC<ParamInfoCardProps> = ({
  sub_category,
  value,
  onSave
}) => {
  const items = useMemo(() => {
    return sub_category.values;
  }, [sub_category, value]);

  const valueRef = useRef<UpdateParamInfo>();
  const [currentValue, setCurrentValue] = useState<UpdateParamInfo>();

  useEffect(() => {
    valueRef.current = value as UpdateParamInfo;
    setCurrentValue(value as UpdateParamInfo);
  }, [value]);

  const handleChange = (name: string, val: any) => {
    const newVal = { ...currentValue };
    newVal.value = {
      ...newVal.value,
      [name]: val
    };
    setCurrentValue(newVal as UpdateParamInfo);
  };

  const handleSave = () => {
    if (currentValue != undefined && currentValue?.id) {
      onSave(sub_category.title, currentValue, false);
    } else {
      onSave(sub_category.title, currentValue as UpdateParamInfo, true);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 600,
        minWidth: 200,
        m: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {sub_category.title}
        </Typography>
        <Divider sx={{ my: 2 }} />
        {items.map((item: any, index: number) => {
          return (
            <div key={index}>
              <CardItem
                item={item}
                value={(currentValue as UpdateParamInfo)?.value}
                onChange={handleChange}
              />
            </div>
          );
        })}
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          size="small"
          color="primary"
          disabled={false}
          onClick={handleSave}
        >
          Save
        </Button>
      </CardActions>
    </Card>
  );
};

export default ParamInfoCard;
