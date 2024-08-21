import { Interests } from '@mui/icons-material';
import { number, string } from 'prop-types';

export interface IOptimiser {
  switch: number;
  commission: number;
  floor: { startDate: string; endDate: string; floorPrice: number };
  upsideValue: number;
}

export interface IAuxilliaryLosses {
  inflationProfile: string;
  baseYear: number;
  lossFactor: { duration: number; auxilliaryLossValue: number }[];
}

export interface IMetering {
  inflationProfile: string;
  baseYear: number;
  annualCost: { duration: number; annualCostPerMW: number }[];
}

export interface ISensitivity {
  object: string;
  data: { switch: number; magnitude: number };
}

export interface IExportChargesOfTNUoS {
  transmissionConnectionSwitch: number;
  zone: string;
  localCircuits: string;
  annualLoadFactor: number;
  gridConnectionVoltage: string;
  localSubstationType: string;
}

export interface ILocalCircuits {
  zone: string;
  value: number[];
}

export interface ILocalSubstationTariff {
  voltage: string;
  data: { type: string; value: number }[];
}

export interface ISharedYearRoundTariffData {
  zone: string;
  value: number[];
}

export interface ISystemTariffData {
  zone: string;
  value: number[];
}

export interface INotSharedYearRoundTariffData {
  zone: string;
  value: number[];
}

export interface IAdjustmentTariffData {
  zone: string;
  value: number[];
}

export interface IInsurance {
  inflation: { profile: string; baseYear: number };
  annualFees: number;
}

export interface IDno {
  region: string;
  data: {
    importFixedCharge: number;
    importSuperRedUnitCharge: number;
    importCapacityCharge: number;
    exportFixedCharge: number;
    gDUoSGenerationRed: number;
    exportExceededCapacityCharge: number;
  };
}
