import { INFLATION_START_YEAR, MODEL_START_YEAR } from '../../utils/constant';
import { DEFAULT_AVERAGE_WHOLESALE_DAY_AHEAD_PRICE } from '../CoGS/constant';
import { calcTotalRevenue } from '../Revenue/total_revenue';
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
  roundArray
} from '../utils';
import {
  DEFAULT_ASSET_MANAGEMENT,
  DEFAULT_BUSINESS_RATES,
  DEFAULT_COMMUNITY_BENEFIT,
  DEFAULT_O_AND_M
} from './constant';
import {
  IAssetManagement,
  IBusinessRates,
  ICommunityBenefit,
  IOAndM
} from './type';

export function calcBusinessRates({
  businessRates = DEFAULT_BUSINESS_RATES,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  initialCapacity = 1000,
  operationStartDate = '2028-01-01',
  modelStartDate = '2023-01-01',
  operationEndDate = '2067-12-31',
  decommissioningEndDate = '2068-06-30'
}: {
  businessRates?: IBusinessRates;
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
  // businessRatesCost = operationAsAPercentOfPeriod*monthlyFeesPerMW*indexValue
  const operationAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    operationEndDate,
    decommissioningEndDate
  );

  const indexValue = annualIndexToMonths(
    inflationIndex({
      inflationInputs,
      baseYear: businessRates.baseYear,
      profile: businessRates.inflationProfile
    }).slice(MODEL_START_YEAR - INFLATION_START_YEAR)
  );

  const monthlyFeesPerMW =
    (businessRates.annualFeesPerMW * initialCapacity) / -12;

  const businessRatesCost = operationAsAPercentOfPeriod.map(
    (d, index) => d * indexValue[index] * monthlyFeesPerMW
  );

  return addZeros(roundArray(businessRatesCost, 2), period);
}
