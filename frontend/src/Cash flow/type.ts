export interface Ivat {
  vatRate: number;
  percentageOfRevenueSubjectToVAT: number;
  percentageOfCostsAndCapexSubjectToVAT: number;
  monthlyPaymentsOnAccount: number;
}

export interface IWrokingCapital {
  debtor_days: number;
  creditor_days: number;
}

export interface INationalGridSecurities {
  security_choice: string;
  attributable_security_choice: string;
  total_attributable_costs: number;
  annual_wider_cancellation_costs: number;
  premium_fee: number;
}

export interface IVariableProfileForAttributableCosts {
  variable_upsall_central: number[];
  variable_tees: number[];
}

export interface ISeniorDebt {
  seniorDebtInterst: number;
  cashSweepPercentOfAvailableCash: number;
  minimumAllowedDSCRHalfYearly: number;
  minimumAllowedDSCRAnnual: number;
}

export interface IDividends {
  dividends_cash_sweep_percent_of_available_cash: number;
}

export interface IEquity {
  equitySplitToShareholderLoan: number;
  equitySplitToShareholderCapital: number;
  shareholderLoanInterest: number;
  shareholderLoanCashSweepPercentage: number;
  shareCapitalCashSweepPercentage: number;
}

export interface ICashRequirements {
  minimumCashBalance: number;
  cashRequirementLookForwardRestriction: number;
}

export interface IGearingByTaxes {
  bessAugmentation: number;
  bessReplacement1: number;
  bessReplacement2: number;
  excludingBatteries: number;
}

export interface ICapexProvision {
  capexObject: string;
  months: number;
}
export interface IMovementInTradeCreditor {
  trade_creditors_for_balance_sheet: number[];
  movement_in_working_capital: number[];
  vat_on_costs: number[];
}
export interface IMovementInTradeDebtor {
  movement_in_working_capital: number[];
  vat_on_revenue: number[];
  trade_debtors_for_balance_sheet: number[];
}
export interface ICapitalExpenditure {
  fixed_assets_additions_for_balance_sheet: number[];
  capexExpenditure: number[];
  capexExpenditureForCashflow: number[];
}
export interface ICapexCreditor {
  capex_creditor_for_balance_sheet: number[];
  movement_in_working_capital: number[];
  vat_on_costs: number[];
}
export interface IMovementInPrepayments {
  movement_in_working_capital: number[];
  prepayments_for_balance_sheet: number[];
}
export interface IMovementInVatCreditor {
  movement_in_working_capital: number[];
  vat_creditor_for_balance_sheet: number[];
}
export interface ICorporationTaxValue {
  taxPayment: number[];
  forecastTaxCharge: number[];
  corporate_tax_creditor_for_balance_sheet: number[];
}
