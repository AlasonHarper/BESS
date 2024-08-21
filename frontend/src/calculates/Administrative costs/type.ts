import { StepIconClassKey } from '@mui/material';
import { number, string } from 'prop-types';
import { Interface } from 'readline';

export interface ILandRent {
  switch: number;
  sensitivity: number;
  sensitivity_magnitude: number;
  annualLandRent: {
    annualLandRentPerAcreCharge: number;
    portionPayableDuringConstruction: number;
    portionPayableDuringOperations: number;
    portionPayableDuringDecommissioning: number;
  };
  bespokeCasesCapacityCharge: {
    annualLandRentPerMWCharge: number;
    portionPayableDuringConstruction: number;
    portionPayableDuringOperations: number;
    portionPayableDuringDecommissioning: number;
  };
  bespokeCasesLandRentPerAcreAndOptionCharge: {
    optionRentStartDate: string;
    optionRentEndDate: string;
    annualLandPostOptionRentPerAcreCharge: number;
    postOptionRentStartDate: string;
    postOptionRentEndDate: string;
  };
  inflation: { profile: string; baseYear: number };
}

export interface IOAndM {
  type: string;
  inflationProfile: string;
  baseYear: number;
  cost: { duration: number; value: number }[];
}

export interface IAssetManagement {
  firstPeriod: {
    inflationProfile: string;
    baseYear: number;
    startDate: string;
    endDate: string;
    feesAsAPercentOfRevenue: {
      realTimeManagement: number;
      maintenance: number;
    };
    feesPerMW: {
      realTimeManagement: number;
      maintenance: number;
    };
  };
  secondPeriod: {
    inflationProfile: string;
    baseYear: number;
    startDate: string;
    endDate: string;
    feesAsAPercentOfRevenue: {
      realTimeManagement: number;
      maintenance: number;
    };
    feesPerMW: {
      realTimeManagement: number;
      maintenance: number;
    };
  };
}

export interface ICommunityBenefit {
  inflationProfile: string;
  baseYear: number;
  annualFixedFundToCommunityBenefit: number;
  annualMWhToCommunityBenefit: number;
}

export interface IBusinessRates {
  inflationProfile: string;
  baseYear: number;
  annualFeesPerMW: number;
}

export interface IExtendedWarranty {
  extended_warranty_switch: number;
  inflation_profile_warranty: string;
  inflation_base_year_warranty: number;
  length_of_warranty: number;
  annual_fees_per_mw: { duration: number; fee: number }[];
}

export interface ISiteSecurity {
  inflationProfile: string;
  baseYear: number;
  annualFeesPerMW: number;
}

export interface ILegalCost {
  inflationProfile: string;
  baseYear: number;
  annualCost: number;
}

export interface IOtherAdminCosts {
  inflationProfile: string;
  baseYear: number;
  annualAccountingFeesAndAudit: number;
  annualIT: number;
  annualOtherCost: number;
}
export interface IWaterRates {
  inflation_profile_water_rates: string;
  inflation_profile_base_year: number;
  annual_fees_per_mw: number;
}

export interface IEasementCosts {
  inflation_profile_easement_costs: string;
  inflation_profile_base_year: number;
  annual_cost: number;
  cable_length: number;
}
export interface IIntercompanyExpenses {
  inflation_profile_intercompany_expense: string;
  inflation_profile_base_year: number;
  annual_cost: number;
}
export interface ILandRentExpense {
  rentToProfit: number[];
  rentToFixedAssets: number[];
}
export interface IDecommissioningCosts {
  decommissioning_cost: number[];
  movement_in_working_capital: number[];
  decommissioning_provision_for_balance_sheet: number[];
}
export interface INGSecurities {
  national_grid_securities_for_cash_flow: number[];
  national_grid_securities_for_balance_sheet: number[];
  securities_premium_fee: number[];
}
