export interface ICorporationTax {
  smallProfitsTaxRate: number;
  mainRateOfTax: number;
  profitThresholdForSmallProfits: number;
  annualInvestmentAllowance: number;
  rateForCapitalAllowancesSpecialPool: number;
  smallPoolAllowanceThreshold: number;
}
export interface Iebit {
  ebit: number[];
  ebitda: number[];
}
