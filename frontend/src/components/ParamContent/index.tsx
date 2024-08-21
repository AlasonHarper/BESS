import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardProps as MuiCardProps,
  Divider,
  Typography,
  useMediaQuery,
  CircularProgress,
  LinearProgress
} from '@mui/material';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CardItem from './CardItem';
import { CreateParamInfo, UpdateParamInfo } from '../../store/types/types';
import { current, Update } from '@reduxjs/toolkit';
import { INPUT_PARAMS, PARAM_TYPE } from '../../utils/constant';
import { IInputParameter } from '../../utils/types';

import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { checkEqualObject } from '../../utils/funtions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  paramInfoCreateAsync,
  paramInfoUpdateAsync,
  selectParam,
  setSaveValue
} from '../../store/slices/parameterSlice';
import { ConstructionOutlined } from '@mui/icons-material';

const Content: FC<any> = ({
  items,
  handleChange,
  currentValue,
  getIsShowProps,
  getRenderValue
}) => {
  return (
    <>
      {items.map((item: any, index: number) => {
        const rV = getRenderValue({ item });
        const value =
          rV != null
            ? { [item?.id]: rV }
            : (currentValue as UpdateParamInfo)?.value;
        if (typeof getIsShowProps == 'function' && !getIsShowProps({ item }))
          return null;
        if (item.type == PARAM_TYPE.GROUP) {
          return (
            <div
              style={{
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                margin: 10
              }}
            >
              <div
                style={{ textAlign: 'left', fontSize: 16, fontWeight: '600' }}
              >
                {item.title}
              </div>
              <Content
                items={item.children}
                currentValue={currentValue}
                handleChange={handleChange}
                getIsShowProps={getIsShowProps}
                getRenderValue={getRenderValue}
              />
            </div>
          );
        }
        return (
          <div key={index}>
            <CardItem
              disabled={rV != null}
              item={item}
              value={value}
              onChange={handleChange}
            />
          </div>
        );
      })}
    </>
  );
};
interface CardProps extends MuiCardProps {
  open?: boolean;
}
const CCard = styled(Card)<CardProps>(({ theme, open }) => ({
  maxWidth: `calc(100vw - ${open ? theme.sidebar.width : '0px'})`
}));

interface ParamContentProps {
  param: IInputParameter;
  parentId: string;
}

const ParamContent: FC<ParamContentProps> = ({ param, parentId }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { currentParameterId, parameterInfos, saveValue } =
    useAppSelector(selectParam);
  const items = useMemo(() => {
    return param.datum || [];
  }, [param]);

  const ID = useMemo(() => {
    return parentId != '' ? `${parentId}@${param.id}` : param.id;
  }, [param, parentId]);

  const valueRef = useRef<UpdateParamInfo>();
  const [currentValue, setCurrentValue] = useState<UpdateParamInfo>();

  useEffect(() => {
    if (Array.isArray(parameterInfos)) {
      const pp = parameterInfos?.find(
        (i) => i?.param_index == ID && i?.parameter_id == currentParameterId
      ) as UpdateParamInfo;
      valueRef.current = pp;
      setCurrentValue(pp);
    }
  }, [parameterInfos, ID]);

  const isChanged = useMemo(() => {
    return !checkEqualObject(currentValue, valueRef.current);
  }, [currentValue]);

  const getIsShowProps = useCallback(
    ({ item }: { item: any }) => {
      if (!item.isShow) return true;
      if (!item.isShow.fn) return true;
      const show: Record<string, any> = {};
      if (item.isShow.params.local && currentValue != undefined) {
        item.isShow.params.local.map((l: string) => {
          show[l] = (currentValue as UpdateParamInfo).value[l];
        });
      }
      if (Array.isArray(item.isShow.params.global)) {
        console.log('add global');
      }
      return item.isShow.fn(show);
    },
    [currentValue]
  );

  const getRenderValue = useCallback(
    ({ item }: { item: any }) => {
      if (!item.renderValue) return null;
      if (!item.renderValue.fn) return null;
      const props: Record<string, any> = {};
      if (item.renderValue.params.local && currentValue != undefined) {
        item.renderValue.params.local.map((l: string) => {
          props[l] = (currentValue as UpdateParamInfo).value[l];
        });
      }
      if (Array.isArray(item.renderValue.params.global)) {
        console.log('add render value');
      }
      return item.renderValue.fn(props);
    },
    [currentValue]
  );

  const handleChange = (name: string, val: any) => {
    const newVal = { ...currentValue };
    newVal.value = {
      ...newVal.value,
      [name]: val
    };
    setCurrentValue(newVal as UpdateParamInfo);
  };

  // const [saveValue, setSaveValue] = useState(false);
  const handleSave = useCallback(() => {
    dispatch(setSaveValue(false));
    // console.log('buttonClick', saveValue);
    if (currentValue?.id) {
      dispatch(paramInfoUpdateAsync(currentValue as UpdateParamInfo));
    } else {
      const payload = {
        parameter_id: currentParameterId as number,
        param_index: ID,
        value: currentValue?.value
      };
      dispatch(paramInfoCreateAsync(payload as CreateParamInfo));
    }

    // console.log('saveVal', saveValue);
  }, [currentValue]);
  useEffect(() => {
    console.log('fromDB', saveValue);
  }, [saveValue]);
  return (
    <CCard
      sx={{
        m: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minWidth: '25vw',
        minHeight: '25vh'
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {param.title}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Content
          items={items}
          handleChange={handleChange}
          currentValue={currentValue}
          getIsShowProps={getIsShowProps}
          getRenderValue={getRenderValue}
        />
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          size="small"
          color="primary"
          disabled={!isChanged}
          onClick={handleSave}
        >
          {saveValue ? 'Save' : <LinearProgress />}
        </Button>
      </CardActions>
    </CCard>
  );
};

export default ParamContent;
