import { INFLATION_START_YEAR, MODEL_START_YEAR } from '../../utils/constant';
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
  DEFAULT_REVENUE_SETUP,
  DEFAULT_STARTING_BATTERY_ASSUMPTION,
  DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  DEFAULT_VINTAGE,
  DEFAULT_TRIADS_INCOME
} from '../constant';
import {
  annualIndexToMonths,
  arrayDivide,
  calcVintages,
  getAsAPercentOfPeriod,
  getMonthsNumberFromModelStartDate,
  getOperationsAsAPercentOfPeriod,
  inflationIndex,
  multiplyArrays,
  multiplyNumber,
  normalizeArray,
  normalizeArrayBySeasonality,
  roundArray
} from '../utils';
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
  IScenario,
  IStartingBatteryAssumptions,
  ITriadsIncome,
  IVintage
} from './type';
import {
  calcInflationAdjustmentFactor,
  getActiveScenarioRevenueItems
} from './wholesale_day_ahead';

export function calcTriadsIncome({
  triadsIncome = DEFAULT_TRIADS_INCOME,
  constraintFactor = 100,
  revenueSetup = DEFAULT_REVENUE_SETUP,
  startingAssumptionsForBatteries = DEFAULT_STARTING_BATTERY_ASSUMPTION,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  modelStartDate = '2023-01-01',
  operationStartDate = '2028-01-01',
  decommissioningStartDate = '2068-01-01',
  decommissioningEndDate = '2068-06-30',
  vintage = DEFAULT_VINTAGE
}: {
  triadsIncome?: ITriadsIncome;
  constraintFactor?: number;
  revenueSetup?: IRevenueSetup;
  startingAssumptionsForBatteries?: IStartingBatteryAssumptions;
  inflationInputs?: IInflationForm[];
  modelStartDate?: string;
  operationStartDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
  vintage?: IVintage;
}) {
  const period =
    getMonthsNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;

  if (triadsIncome.switch == 0) {
    return new Array(period).fill(0);
  } else {
    const inflatedUnitPrice = annualIndexToMonths(
      triadsIncome?.value.map(
        (d, index, arr) => (d * 3 + 9 * arr[index + 1]) / 12
      ) || new Array(period).fill(0)
    );
    const indexValue = annualIndexToMonths(
      inflationIndex({
        inflationInputs,
        baseYear: revenueSetup.baseYear,
        profile: revenueSetup.inflation
      }).slice(MODEL_START_YEAR - INFLATION_START_YEAR)
    );

    const operationsAsAPercentOfPeriod = getAsAPercentOfPeriod(
      modelStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate
    );
    const averageBatteryCapacityInPeriod = roundArray(
      vintage.totalGenerationCapacity.map(
        (d) => d * 0.01 * startingAssumptionsForBatteries.batteryAvailability
      ),
      3
    );

    const forecastRevenue = multiplyNumber(
      multiplyArrays([
        operationsAsAPercentOfPeriod,
        averageBatteryCapacityInPeriod,
        inflatedUnitPrice,
        indexValue
      ]),
      constraintFactor
    );
    return roundArray(forecastRevenue, 3);
  }
}
