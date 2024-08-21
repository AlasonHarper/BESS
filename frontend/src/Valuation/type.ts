export interface IValuation {
  valuation_date: string;
  cost_of_equity: number;
}
export interface IValuationResult {
  discountRate: number;
  valuation_condition: string;
  value: {
    npv: number;
    irr: number;
    payback_period: number;
  };
}
