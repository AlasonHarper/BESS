import { number, string } from 'prop-types';

export interface IAssumptionData {
  providerName: string;
  data: {
    efficiency: number;
    inflation: string;
    baseYear: number;
    region: string;
    tradingStrategy: string;
  };
}

export interface IRevenueSetup {
  forecastProviderChoice: string;
  inflation: string;
  baseYear: number;
}

export interface IScenario {
  item: string;
  data: number[];
}

export interface IDataByRegion {
  region: string;
  dataByItems: { item: string; data: number[] }[];
}

export interface IDataByTradingStrategy {
  tradingStrategy: string;
  dataByRegion: IDataByRegion[];
}

export interface IDataBatteryDuration {
  duration: number;
  dataByTradingStrategy: IDataByTradingStrategy[];
}

export interface IDetailedRevenueData {
  forecastProvider: string;
  dataByBatteryDuration: IDataBatteryDuration[];
}

export interface ICycleData {
  averageCyclesPerDay: number;
  retentionRate: number[];
}

export interface IStartingBatteryAssumptions {
  degradationForecastAverageCyclesPerDay: number;
  batteryAvailability: number;
  batteryDuration: number;
}

export interface IBatteryDisposal {
  batteryDisposalSwitch: number;
  disposedRetentionRate: number;
  recyclePricePercent: number;
}

export interface IBatteryEfficiency {
  efficiencySwitch: number;
  fixedEfficiency: number;
  forecastEfficiency?: number[];
}
export interface IBatteryAugmentation {
  batteryAugmentationSwitch: number;
  batteryAugmentationStopYear: number;
}
export interface IBatteryCubes {
  baseYear: number;
  data: { duration: number; value: number }[];
}

export interface IBatteryExcubes {
  baseYear: number;
  data: { duration: number; value: number }[];
}

export interface IInflationForm {
  profile: string;
  rate: number[];
}

export interface ICapexPaymentForm {
  capexObject: string;
  paymentProfile: string;
}

export interface ICapexPaymentMilestoneForm {
  profileName: string;
  timing: number[];
}

export interface ICapexUELForm {
  capexObject: string;
  usefulEconomicLife: number;
}
export interface IBessCapexForecast {
  inflationProfile: string;
  baseYear: number;
}

export interface IVintage {
  electricitySold: number[];
  vintages: { name: string; data: any }[];
  totalGenerationCapacity: number[];
}
export interface IMCapexProvision {
  cashEndBalance: number[];
  cashStartBalance: number[];
  dividends: number[];
  netCashflow: number[];
  profit_loss_after_tax: number[];
  profit_loss_before_tax: number[];
  retained_earnings_end_balance: number[];
  retained_earnings_start_balance: number[];
  seniorDebtDrawdown: number[];
  seniorDebtRepayment: number[];
  senior_debt_for_balance_sheet: number[];
  senior_debt_interest: number[];
  shareCapitalDrawdown: number[];
  shareholderLoanDrawdown: number[];
  shareholder_loan_for_balance_sheet: number[];
  shareholder_loan_interest: number[];
  shareholder_loan_repayment: number[];
  total_cash_payment: number[];
}

export interface IFixedPPADataForm {
  contract: string;
  data: { startDate: string; endDate: string; price: number };
}
export interface IFixedPPA {
  data: IFixedPPADataForm[];
  assignedPercentage: number;
  switch: number;
}
export interface IFlaotingPPADataFrom {
  contract: string;
  data: { startDate: string; endDate: string };
}
export interface IFloatingPPA {
  data: IFlaotingPPADataFrom[];
  assignedPercentage: number;
  discountToWholesalePriceForMarginPercentage: number;
  switch: number;
}
export interface ITriadsIncome {
  value: number[];
  switch: number;
}

export interface IGainOnDisposal {
  forecastRecycleRevenue: number[];
  bookValueAtPointOfDisposal: number[];
  gainOnDisposalRevenue: number[];
}
