import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { IInputParameter } from '../../utils/types';
import ParamContent from '../../components/ParamContent';
import ParamCollapsableList from '../../components/ParamContent/CollapsableList';
import { Box, BoxProps, List, useTheme, styled } from '@mui/material';
import { SidebarContext } from '../../contexts/SidebarContext';
import moment from 'moment';

interface CBoxProps extends BoxProps {
  open?: boolean;
}

const LeftContent = styled(Box)<BoxProps>(({ theme }) => ({
  width: theme.sidebar.width,
  minWidth: theme.sidebar.width,
  maxWidth: theme.sidebar.width,
  backgroundColor: '#093939f0'
}));

const RightContent = styled(Box)<CBoxProps>(({ theme, open }) => ({
  maxWidth: `calc(100vw - ${theme.sidebar.width} - ${
    open ? theme.sidebar.width : '0px'
  })`,
  width: `calc(100vw - ${theme.sidebar.width} - ${
    open ? theme.sidebar.width : '0px'
  })`,
  padding: '30px',
  backgroundColor: '#f2f5f9',
  overflowY: 'auto',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start'
}));

interface InputParameterProps {
  param: IInputParameter;
}

export function InputParameter({ param }: InputParameterProps) {
  const { sidebarToggle } = React.useContext(SidebarContext);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const [selectedParam, setSelectedParam] = useState<IInputParameter | null>(
    null
  );
  const [parentId, setParentId] = useState('');

  const showLeftContent = useMemo(() => {
    return Array.isArray(param.children) && param.children.length > 0;
  }, [param]);

  useEffect(() => {
    if (Array.isArray(param.children) && param.children?.length > 0) {
      setSelectedParam(param.children[0]);
      setParentId(param.id);
    } else {
      setSelectedParam(param);
      setParentId('');
    }
  }, [param]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      {showLeftContent && (
        <LeftContent>
          <List component="div">
            {param?.children?.map((p: IInputParameter, index: any) => {
              return (
                <ParamCollapsableList
                  key={index}
                  menuList={p}
                  selected={selectedParam}
                  onClick={(m: IInputParameter, parent: string) => {
                    if (parent) setParentId(`${param.id}@${parent}`);
                    else setParentId(param.id);
                    setSelectedParam(m);
                  }}
                />
              );
            })}
          </List>
        </LeftContent>
      )}
      <RightContent open={sidebarToggle && showLeftContent}>
        {selectedParam &&
          Array.isArray(selectedParam?.datum) &&
          selectedParam?.datum?.length > 0 && (
            <ParamContent param={selectedParam} parentId={parentId} />
          )}
      </RightContent>
    </div>
  );
}
