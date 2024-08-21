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
import { DEFAULT_EXTENDED_WARRANTY, DEFAULT_SITE_SECURITY } from './constant';
import { IExtendedWarranty, ISiteSecurity } from './type';

export function calcSiteSecurity({
  initialCapacity = 1000,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  modelStartDate = '2023-01-01',
  operationStartDate = '2028-01-01',
  operationEndDate = '2068-01-01',
  decommissioningEndDate = '2068-06-30',
  siteSecurity = DEFAULT_SITE_SECURITY
}: {
  siteSecurity?: ISiteSecurity;
  initialCapacity?: number;
  inflationInputs?: IInflationForm[];
  sensitivity?: number;
  operationYears?: number;
  modelStartDate?: string;
  operationStartDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
  operationEndDate?: string;
  battery_duration?: number;
}) {
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
      baseYear: siteSecurity.baseYear,
      profile: siteSecurity.inflationProfile
    }).slice(MODEL_START_YEAR - INFLATION_START_YEAR)
  );

  const monthlyFeesPerMW =
    (siteSecurity.annualFeesPerMW * initialCapacity) / -12;

  const siteSecurityCost = operationAsAPercentOfPeriod.map(
    (d, index) => d * indexValue[index] * monthlyFeesPerMW
  );

  return roundArray(siteSecurityCost, 2);
}
