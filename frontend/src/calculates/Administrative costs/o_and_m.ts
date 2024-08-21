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
  IStartingBatteryAssumptions,
  IVintage
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
  DEFAULT_STARTING_BATTERY_ASSUMPTION,
  DEFAULT_VINTAGE
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
import { DEFAULT_O_AND_M } from './constant';
import { IOAndM } from './type';

export function calcOperationAndManagementCost({
  revenueSensitivity = 0,
  revenueSetup = DEFAULT_REVENUE_SETUP,
  assumptionsData = DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  detailedRevenueData = DEFAULT_DETAILED_REVENUE_DATA,
  initialCycleData = DEFAULT_INITIAL_CYCLE_DATA,
  initialCapacity = 1000,
  startingAssumptionsForBatteries = DEFAULT_STARTING_BATTERY_ASSUMPTION,
  batteryDisposals = DEFAULT_BATTERY_DISPOSAL,
  batteryEfficiency = DEFAULT_BATTERY_EFFICIENCY,
  batteryAugmentation = DEFAULT_BATTERY_AUGMENTATION,
  model = 'Conservative',
  batteryCubes = DEFAULT_BATTERY_CUBES,
  batteryExCubes = DEFAULT_BATTERY_EXCUBES,
  capexPaymentsProfile = DEFAULT_CAPEX_PAYMENTS_PROFILE,
  capexPaymentMilestones = DEFAULT_CAPEX_PAYMENT_MILESTONES,
  capexUEL = DEFAULT_CAPEX_UEL,
  bessCapexForecast = DEFAULT_BESS_CAPEX_FORECAST,
  batterySensitivity = 0,
  constraintFactor = 100,
  operationYears = 40,
  constructionStartDate = '2027-01-01',
  decommissioningStartDate = '2068-01-01',
  batteryDuration = 4,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  operationAndManagementSettings = DEFAULT_O_AND_M,
  operationStartDate = '2028-01-01',
  modelStartDate = '2023-01-01',
  operationEndDate = '2067-12-31',
  decommissioningEndDate = '2068-06-30',
  opexSensitivity = 0,
  vintage = DEFAULT_VINTAGE
}: {
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
}) {
  const period =
    getMonthsNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  const fixedCost = [];

  const operationsAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    operationEndDate,
    decommissioningEndDate
  );

  const fixedData = operationAndManagementSettings.find(
    (d) => d.type == 'Fixed'
  );
  const variableData = operationAndManagementSettings.find(
    (d) => d.type == 'Variable'
  );

  // const fixedIndexValue = annualIndexToMonths(
  // 	inflationIndex(
  // 		inflationInputs,
  // 		fixedData.baseYear,
  // 		fixedData.inflationProfile
  // 	).slice(2)
  // );
  // const monthlyFixedCost =
  // 	(fixedData.cost.find(
  // 		(d) => (d.duration = batteryDuration)
  // 	).value *
  // 		(1 + opexSensitivity)) /
  // 	12;

  // fixedCost = operationsAsAPercentOfPeriod.map(
  // 	(d, index) =>
  // 		d * fixedIndexValue[index] * monthlyFixedCost
  // );

  // variableCost = monthlyVariableCost*variableIndexValue*averageBatteryCapacity*constraintFactor.

  const variableIndexValue = annualIndexToMonths(
    inflationIndex({
      inflationInputs,
      baseYear: variableData?.baseYear,
      profile: variableData?.inflationProfile
    }).slice(MODEL_START_YEAR - INFLATION_START_YEAR)
  );

  const monthlyVariableCost =
    (variableData?.cost.find((d) => d.duration == batteryDuration)?.value ||
      0 * (1 + opexSensitivity)) / -12;

  const averageBatteryCapacity = vintage.totalGenerationCapacity;

  const variableCost = roundArray(
    averageBatteryCapacity.map(
      (d, index) =>
        d *
        monthlyVariableCost *
        operationsAsAPercentOfPeriod[index] *
        variableIndexValue[index]
    ),
    2
  );
  return addZeros(variableCost, period);
}
