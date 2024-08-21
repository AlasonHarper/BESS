import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { IInputParameter } from '../../utils/types';
import ParamContent from '../../components/ParamContent';
import ParamCollapsableList from '../../components/ParamContent/CollapsableList';
import { Box, BoxProps, List, useTheme, styled } from '@mui/material';
import { SidebarContext } from '../../contexts/SidebarContext';

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

export function GraphPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      <LeftContent></LeftContent>
      <RightContent></RightContent>
    </div>
  );
}
