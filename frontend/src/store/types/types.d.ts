import { Update } from '@reduxjs/toolkit';
import { IParameter } from '../../utils/types';

export interface User {
  id: number | undefined;
  email: string | undefined;
  accessToken: string;
  refreshToken: string | undefined;
}

export type AuthState = {
  isLoggedIn: boolean;
  user: User | None;
  error: string;
};

export type UserCredentials = {
  email: string;
  password: string;
};

export type UserRegister = {
  email: string;
  password: string;
  passwordConf: string;
};
export interface Parameter {
  id: number | undefined;
  user_id: number | undefined;
  title: string | undefined;
  description: string | undefined;
  type: string | undefined;
}
export type CreateParam = {
  clone_id: number;
  title: string;
  description: string;
};
export type DeleteParam = {
  id: number;
  // user_id: number;
};

export type UpdateParam = {
  id: number;
  user_id: number;
  title: string;
  description: string;
};

export type CreateParamInfo = {
  parameter_id: number;
  param_index: string;
  value: object;
};

export type UpdateParamInfo = {
  id: number;
  parameter_id: number;
  param_index: string;
  value: Record<string, any>;
};
export type ParamState = {
  parameters: Array<Parameter>;
  currentParameterId: null | number;
  parameterInfos: Array<UpdateParamInfo>;
  fixedParam: null | number;
  fixedParameterInfos: Array<UpdateParamInfo>;
  timingParam: null | number;
  timingParameterInfos: Array<UpdateParamInfo>;
  saveValue: Boolean;
};

export type UserParamSetting = {
  parameter_id: number;
};
