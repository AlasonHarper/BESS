import { SvgIconTypeMap } from '@mui/material';
import React from 'react';

export type AppProviderProps = {
  children: React.ReactNode;
};

export interface IParameter {
  id: number | string | undefined | null;
  user_id: number | undefined | null;
  title: string;
  description: string | null | undefined;
}

export interface IParameterAdd {
  clone_id: number;
  title: string;
  description: string;
}

export interface IInputParameter {
  id: string;
  title: string;
  datum?: any[];
  children?: any[];
}
