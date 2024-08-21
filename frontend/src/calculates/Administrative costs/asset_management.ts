import { INFLATION_START_YEAR, MODEL_START_YEAR } from '../../utils/constant';
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
  IStartingBatteryAssumptions,
  IVintage
} from '../Revenue/type';
import {
  DEFAULT_BALANCING_MECHANISM,
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
  DEFAULT_FREQUENCY_RESPONSE,
  DEFAULT_INFLATION_INPUTS,
  DEFAULT_INITIAL_CYCLE_DATA,
  DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  DEFAULT_REVENUE_SETUP,
  DEFAULT_STARTING_BATTERY_ASSUMPTION,
  DEFAULT_VINTAGE,
  DEFAULT_WHOLESALE_DAY_AHEAD,
  DEFAULT_WHOLESALE_INTRADAY
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
  DEFAULT_O_AND_M,
  DEFAULT_TOTAL_REVENUE
} from './constant';
import { IAssetManagement, IOAndM } from './type';

export function calcAssetManagementCosts({
  // revenueSensitivity = 0,
  // revenueSetup = DEFAULT_REVENUE_SETUP,
  // assumptionsData = DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  // detailedRevenueData = DEFAULT_DETAILED_REVENUE_DATA,
  // initialCycleData = DEFAULT_INITIAL_CYCLE_DATA,
  // initialCapacity = 1000,
  // startingAssumptionsForBatteries = DEFAULT_STARTING_BATTERY_ASSUMPTION,
  // batteryDisposals = DEFAULT_BATTERY_DISPOSAL,
  // batteryEfficiency = DEFAULT_BATTERY_EFFICIENCY,
  // batteryAugmentation = DEFAULT_BATTERY_AUGMENTATION,
  // model = 'Conservative',
  // batteryDuration = 4,
  // batteryCubes = DEFAULT_BATTERY_CUBES,
  // batteryExCubes = DEFAULT_BATTERY_EXCUBES,
  // capexPaymentsProfile = DEFAULT_CAPEX_PAYMENTS_PROFILE,
  // capexPaymentMilestones = DEFAULT_CAPEX_PAYMENT_MILESTONES,
  // capexUEL = DEFAULT_CAPEX_UEL,
  // bessCapexForecast = DEFAULT_BESS_CAPEX_FORECAST,
  // batterySensitivity = 0,
  // operationYears = 40,
  // decommissioningStartDate = '2068-01-01',

  // operationAndManagementSettings = DEFAULT_O_AND_M,
  // operationStartDate = '2028-01-01',
  // operationEndDate = '2067-12-31',
  // constructionStartDate = '2027-01-01',
  assetManagement = DEFAULT_ASSET_MANAGEMENT,
  decommissioningEndDate = '2068-06-30',
  modelStartDate = '2023-01-01',
  constraintFactor = 100,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  opexSensitivity = 0,
  vintage = DEFAULT_VINTAGE,
  totalRevenue = DEFAULT_TOTAL_REVENUE
}: {
  assetManagement?: IAssetManagement;
  revenueSensitivity?: number;
  revenueSetup?: IRevenueSetup;
  assumptionsData?: IAssumptionData[];
  detailedRevenueData?: IDetailedRevenueData[];
  initialCycleData?: ICycleData[];
  initialCapacity?: number;
  startingAssumptionsForBatteries?: IStartingBatteryAssumptions;
  batteryDisposals?: IBatteryDisposal;
  batteryEfficiency?: IBatteryEfficiency;
  batteryAugmentation?: IBatteryAugmentation;
  model?: string;
  batteryCubes?: IBatteryCubes;
  batteryExCubes?: IBatteryExcubes;
  capexPaymentsProfile?: ICapexPaymentForm[];
  capexPaymentMilestones?: ICapexPaymentMilestoneForm[];
  capexUEL?: ICapexUELForm[];
  bessCapexForecast?: IBessCapexForecast;
  batterySensitivity?: number;
  operationYears?: number;
  operationAndManagementSettings?: IOAndM[];
  constraintFactor?: number;
  inflationInputs?: IInflationForm[];
  batteryDuration?: number;
  operationStartDate?: string;
  modelStartDate?: string;
  operationEndDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
  constructionStartDate?: string;
  opexSensitivity?: number;
  vintage?: IVintage;
  totalRevenue?: number[];
}) {
  const period =
    getMonthsNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  // assetManagement.firstPeriod.startDate = operationStartDate;
  // assetManagement.firstPeriod.endDate = operationEndDate;

  // const totalRevenue = calcTotalRevenue({
  //   revenueSensitivity,
  //   revenueSetup,
  //   assumptionsData,
  //   detailedRevenueData,
  //   initialCycleData,
  //   initialCapacity,
  //   startingAssumptionsForBatteries,
  //   batteryDisposals,
  //   batteryEfficiency,
  //   batteryAugmentation,
  //   model,
  //   batteryDuration,
  //   batteryCubes,
  //   batteryExCubes,
  //   inflationInputs,
  //   capexPaymentsProfile,
  //   capexPaymentMilestones,
  //   capexUEL,
  //   bessCapexForecast,
  //   batterySensitivity,
  //   operationYears,
  //   modelStartDate,
  //   operationStartDate,
  //   decommissioningStartDate,
  //   decommissioningEndDate,
  //   vintage
  // });
  const assetManagementAsAPercentOfPeriod_1 = getAsAPercentOfPeriod(
    modelStartDate,
    assetManagement.firstPeriod.startDate,
    assetManagement.firstPeriod.endDate,
    decommissioningEndDate
  );
  const costBasedOnRevenue_1 = assetManagementAsAPercentOfPeriod_1.map(
    (d, index) =>
      (((1 + opexSensitivity) *
        -d *
        (assetManagement.firstPeriod.feesAsAPercentOfRevenue
          .realTimeManagement +
          assetManagement.firstPeriod.feesAsAPercentOfRevenue.maintenance)) /
        100) *
      totalRevenue[index]
  );

  const indexValue_1 = annualIndexToMonths(
    inflationIndex({
      inflationInputs,
      baseYear: assetManagement.firstPeriod.baseYear,
      profile: assetManagement.firstPeriod.inflationProfile
    }).slice(MODEL_START_YEAR - INFLATION_START_YEAR)
  );

  const averageBatteryCapacityInPeriod = vintage.totalGenerationCapacity;

  const costBasedOnMW_1 = averageBatteryCapacityInPeriod.map(
    (d, index) =>
      ((((1 + opexSensitivity) * -d) / 12) *
        (assetManagement.firstPeriod.feesPerMW.realTimeManagement * 1 +
          assetManagement.firstPeriod.feesPerMW.maintenance * 1) *
        indexValue_1[index] *
        constraintFactor) /
      100
  );

  const costOfPeriod_1 = costBasedOnMW_1.map(
    (d, index) => d + costBasedOnRevenue_1[index]
  );
  const assetManagementAsAPercentOfPeriod_2 = getAsAPercentOfPeriod(
    modelStartDate,
    assetManagement.secondPeriod.startDate,
    assetManagement.secondPeriod.endDate,
    decommissioningEndDate
  );
  return addZeros(roundArray(costOfPeriod_1, 2), period);
}
