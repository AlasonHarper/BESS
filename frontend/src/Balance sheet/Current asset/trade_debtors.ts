import { calcTradeDebtors } from '../../Cash flow/Movement/movement_in_trade_debtors';
import {
  DEFAULT_MOVEMENT_IN_TRADE_DEBTOR,
  DEFAULT_VAT,
  DEFAULT_WORKING_CAPITAL
} from '../../Cash flow/constant';
import {
  IMovementInTradeDebtor,
  IWrokingCapital,
  Ivat
} from '../../Cash flow/type';
import { calcGainOnDisposal } from '../../calculates/Revenue/gain_on_disposal_of_batteries';
import { calcTotalRevenue } from '../../calculates/Revenue/total_revenue';
import {
  IAssumptionData,
  IBatteryAugmentation,
  IBatteryCubes,
  IBatteryDisposal,
  IBatteryEfficiency,
  IBatteryExcubes,
  IBessCapexForecast,
  ICapexPaymentForm,
  ICapexPaymentMilestoneForm,
  ICapexUELForm,
  ICycleData,
  IDetailedRevenueData,
  IInflationForm,
  IRevenueSetup,
  IStartingBatteryAssumptions,
  IVintage
} from '../../calculates/Revenue/type';
import {
  DEFAULT_BATTERY_AUGMENTATION,
  DEFAULT_BATTERY_CUBES,
  DEFAULT_BATTERY_DISPOSAL,
  DEFAULT_BATTERY_EFFICIENCY,
  DEFAULT_BATTERY_EXCUBES,
  DEFAULT_BESS_CAPEX_FORECAST,
  DEFAULT_CAPEX_PAYMENTS_PROFILE,
  DEFAULT_CAPEX_PAYMENT_MILESTONES,
  DEFAULT_CAPEX_UEL,
  DEFAULT_DETAILED_REVENUE_DATA,
  DEFAULT_INFLATION_INPUTS,
  DEFAULT_INITIAL_CYCLE_DATA,
  DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  DEFAULT_REVENUE_SETUP,
  DEFAULT_STARTING_BATTERY_ASSUMPTION,
  DEFAULT_VINTAGE
} from '../../calculates/constant';
import {
  calcDaysInMonth,
  getAsAPercentOfPeriod,
  getMonthsNumberFromModelStartDate,
  multiplyArrays,
  multiplyNumber,
  roundArray,
  sumArrays
} from '../../calculates/utils';

export function calcTradeDebtorsForBalanceSheet({
  movementInTradeDebtor = DEFAULT_MOVEMENT_IN_TRADE_DEBTOR
}: {
  movementInTradeDebtor?: IMovementInTradeDebtor;
}) {
  const trade_debtors = movementInTradeDebtor.trade_debtors_for_balance_sheet;

  return roundArray(trade_debtors, 3);
}
