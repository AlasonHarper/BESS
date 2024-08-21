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
  multiplyNumber,
  normalizeArrayBySeasonality,
  roundArray
} from '../utils';
import {
  DEFAULT_ASSET_MANAGEMENT,
  DEFAULT_COMMUNITY_BENEFIT,
  DEFAULT_O_AND_M
} from './constant';
import { IAssetManagement, ICommunityBenefit, IOAndM } from './type';

export function calcCommunityBenefit({
  communityBenefit = DEFAULT_COMMUNITY_BENEFIT,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  averageWholeSaleDayAheadPrice = DEFAULT_AVERAGE_WHOLESALE_DAY_AHEAD_PRICE,
  initialCapacity = 1000,
  opexSensitivity = 0,
  operationStartDate = '2028-01-01',
  modelStartDate = '2023-01-01',
  operationEndDate = '2067-12-31',
  decommissioningEndDate = '2068-06-30'
}: {
  communityBenefit?: ICommunityBenefit;
  inflationInputs?: IInflationForm[];
  averageWholeSaleDayAheadPrice?: number[];
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
  let freeElectricityFund: number[] = [];
  // communityBenefitCost = freeElectricityFund + fixedFund
  let communityBenefitCost = freeElectricityFund.map(
    (d, index) => d + fixedFund[index]
  );
  const operationAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    operationEndDate,
    decommissioningEndDate
  );

  const indexValue = annualIndexToMonths(
    inflationIndex({
      inflationInputs,
      baseYear: communityBenefit.baseYear,
      profile: communityBenefit.inflationProfile
    }).slice(MODEL_START_YEAR - INFLATION_START_YEAR)
  );
  const fixedFund = operationAsAPercentOfPeriod.map(
    (d, index) =>
      (d *
        indexValue[index] *
        communityBenefit.annualFixedFundToCommunityBenefit *
        (1 + opexSensitivity)) /
      -12
  );

  const monthlyMWhToCommunityBenefit =
    (communityBenefit.annualMWhToCommunityBenefit * (1 + opexSensitivity)) / 12;
  freeElectricityFund = operationAsAPercentOfPeriod.map(
    (d, index) =>
      d *
      monthlyMWhToCommunityBenefit *
      normalizeArrayBySeasonality(
        multiplyNumber(averageWholeSaleDayAheadPrice, 1),
        period
      )[index]
  );
  communityBenefitCost = roundArray(
    freeElectricityFund.map((d, index) => d + fixedFund[index]),
    2
  );
  return addZeros(communityBenefitCost, period);
}
