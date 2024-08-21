import { INFLATION_START_YEAR, MODEL_START_YEAR } from '../../utils/constant';
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
  IStartingBatteryAssumptions
} from '../Revenue/type';
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
  DEFAULT_STARTING_BATTERY_ASSUMPTION
} from '../constant';
import {
  addZeros,
  annualIndexToMonths,
  calcVintages,
  getAsAPercentOfPeriod,
  getMonthsNumberFromModelStartDate,
  inflationIndex,
  multiplyArrays,
  multiplyNumber,
  normalizeArray,
  roundArray,
  sumArrays
} from '../utils';
import {
  DEFAULT_EXTENDED_WARRANTY,
  DEFAULT_LEGAL_COST,
  DEFAULT_SITE_SECURITY
} from './constant';
import { IExtendedWarranty, ILegalCost, ISiteSecurity } from './type';

export function calcLegalCosts({
  legalCosts = DEFAULT_LEGAL_COST,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  initialCapacity = 1000,
  opexSensitivity = 0,
  operationStartDate = '2028-01-01',
  modelStartDate = '2023-01-01',
  operationEndDate = '2067-12-31',
  decommissioningEndDate = '2068-06-30'
}: {
  legalCosts?: ILegalCost;
  inflationInputs?: IInflationForm[];
  initialCapacity?: number;
  opexSensitivity?: number;
  operationStartDate?: string;
  modelStartDate?: string;
  operationEndDate?: string;
  decommissioningEndDate?: string;
}) {
  const period =
    getMonthsNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  // siteSecurityCost = operationAsAPercentOfPeriod*monthlyFeesPerMW*indexValue
  const operationAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    operationEndDate,
    decommissioningEndDate
  );

  const indexValue = annualIndexToMonths(
    inflationIndex({
      inflationInputs,
      baseYear: legalCosts.baseYear,
      profile: legalCosts.inflationProfile
    }).slice(MODEL_START_YEAR - INFLATION_START_YEAR)
  );

  const monthlyFeesPerMW =
    (legalCosts.annualCost * (1 + opexSensitivity)) / -12;

  const legalCostsForecast = operationAsAPercentOfPeriod.map(
    (d, index) => d * indexValue[index] * monthlyFeesPerMW
  );

  return addZeros(roundArray(legalCostsForecast, 2), period);
}
