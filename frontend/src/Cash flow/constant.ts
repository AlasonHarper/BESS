import {
  ICapexCreditor,
  ICapexProvision,
  ICapitalExpenditure,
  ICashRequirements,
  ICorporationTaxValue,
  IDividends,
  IEquity,
  IGearingByTaxes,
  IMovementInPrepayments,
  IMovementInTradeCreditor,
  IMovementInTradeDebtor,
  IMovementInVatCreditor,
  INationalGridSecurities,
  ISeniorDebt,
  IVariableProfileForAttributableCosts,
  IWrokingCapital,
  Ivat
} from './type';

export const DEFAULT_VAT = {
  vatRate: 20,
  percentageOfRevenueSubjectToVAT: 100,
  percentageOfCostsAndCapexSubjectToVAT: 100,
  monthlyPaymentsOnAccount: 35
} as Ivat;

export const DEFAULT_WORKING_CAPITAL = {
  debtor_days: 90,
  creditor_days: 90
} as IWrokingCapital;

export const DEFAULT_NATIONAL_GRID_SECURITIES = {
  security_choice: 'Bond',
  attributable_security_choice: 'Variable - Upsall central',
  total_attributable_costs: 4800,
  annual_wider_cancellation_costs: 401,
  premium_fee: 1.5
} as INationalGridSecurities;

export const DEFAULT_VARIABLE_PROFILE_FOR_ATTRIBUTABLE_COSTS = {
  variable_upsall_central: [
    0.0, 69.98, 612.24, 1505.36, 2622.6, 3810.91, 4800.06, 4800.06
  ],
  variable_tees: [
    0.0, 69.98, 612.24, 1505.36, 2622.6, 3810.91, 4800.06, 4800.06
  ]
} as IVariableProfileForAttributableCosts;

export const DEFAULT_SENIOR_DEBT = {
  seniorDebtInterst: 8.25,
  cashSweepPercentOfAvailableCash: 100,
  minimumAllowedDSCRHalfYearly: 0,
  minimumAllowedDSCRAnnual: 0
} as ISeniorDebt;

export const DEFAULT_DIVIDENDS = {
  dividends_cash_sweep_percent_of_available_cash: 0
} as IDividends;

export const DEFAULT_EQUITY = {
  equitySplitToShareholderLoan: 100,
  equitySplitToShareholderCapital: 0,
  shareholderLoanInterest: 8,
  shareholderLoanCashSweepPercentage: 100,
  shareCapitalCashSweepPercentage: 0
} as IEquity;

export const DEFAULT_CASH_REQUIREMENTS = {
  minimumCashBalance: 10,
  cashRequirementLookForwardRestriction: 12
} as ICashRequirements;

export const DEFAULT_GEARING_BY_TAXES = {
  bessAugmentation: 0,
  bessReplacement1: 70,
  bessReplacement2: 70,
  excludingBatteries: 0
} as IGearingByTaxes;

export const DEFAULT_CAPEX_PROVISION = [
  {
    capexObject: 'Batteries',
    months: 3
  },
  {
    capexObject: 'Devex',
    months: 3
  },
  {
    capexObject: 'Capitalised rent in construction',
    months: 0
  },
  {
    capexObject: 'Land',
    months: 0
  },
  {
    capexObject: 'Pooling substation',
    months: 3
  },
  {
    capexObject: 'Transformers',
    months: 3
  },
  {
    capexObject: 'Balance of Plant',
    months: 3
  },
  {
    capexObject: 'Enterprise value - Development fee',
    months: 0
  }
] as ICapexProvision[];
export const DEFAULT_MOVEMENT_IN_TRADE_CREDITOR = {
  trade_creditors_for_balance_sheet: new Array(600).fill(0),
  movement_in_working_capital: new Array(600).fill(0),
  vat_on_costs: new Array(600).fill(0)
} as IMovementInTradeCreditor;
export const DEFAULT_MOVEMENT_IN_TRADE_DEBTOR = {
  movement_in_working_capital: new Array(600).fill(0),
  vat_on_revenue: new Array(600).fill(0),
  trade_debtors_for_balance_sheet: new Array(600).fill(0)
} as IMovementInTradeDebtor;

export const DEFAULT_LAND_ADDITIONS = new Array(600).fill(0);
export const DEFAULT_POOLING_SUBSTATION_ADDITIONS = new Array(600).fill(0);
export const DEFAULT_TRANSFORMERS_ADDITIONS = new Array(600).fill(0);
export const DEFAULT_BALANCE_OF_PLANT_ADDITIONS = new Array(600).fill(0);
export const DEFAULT_EV_ADDITIONS = new Array(600).fill(0);
export const DEFAULT_DEVEX_ADDITIONS = new Array(600).fill(0);
export const DEFAULT_CAPITAL_EXPENDITURE = {
  fixed_assets_additions_for_balance_sheet: new Array(600).fill(0),
  capexExpenditure: new Array(600).fill(0),
  capexExpenditureForCashflow: new Array(600).fill(0)
} as ICapitalExpenditure;
export const DEFAULT_CAPEX_CREDITOR = {
  capex_creditor_for_balance_sheet: new Array(600).fill(0),
  movement_in_working_capital: new Array(600).fill(0),
  vat_on_costs: new Array(600).fill(0)
} as ICapexCreditor;
export const DEFAULT_MOVEMENT_IN_PREPAYMENTS = {
  movement_in_working_capital: new Array(600).fill(0),
  prepayments_for_balance_sheet: new Array(600).fill(0)
} as IMovementInPrepayments;

export const DEFAULT_MOVEMENT_IN_VAT_CREDITOR = {
  movement_in_working_capital: new Array(600).fill(0),
  vat_creditor_for_balance_sheet: new Array(600).fill(0)
} as IMovementInVatCreditor;
export const DEFAULT_OPERATING_CASH_FLOW_VALUE = new Array(600).fill(0);
export const DEFAULT_CORPORATION_TAX_VALUE = {
  taxPayment: new Array(600).fill(0),
  forecastTaxCharge: new Array(600).fill(0),
  corporate_tax_creditor_for_balance_sheet: new Array(600).fill(0)
} as ICorporationTaxValue;
