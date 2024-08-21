import { number } from 'prop-types';
import {
  DEFAULT_INFLATION_INPUTS,
  DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  DEFAULT_REVENUE_SETUP,
  DEFAULT_STARTING_BATTERY_ASSUMPTION
} from '../constant';
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
import { calcInflationAdjustmentFactor } from '../Revenue/wholesale_day_ahead';
import {
  addZeros,
  annualIndexToMonths,
  calcDaysInMonth,
  calcNumberOfDaysInMonth,
  getAsAPercentOfPeriod,
  getMonthsNumberFromModelStartDate,
  getOperationsAsAPercentOfPeriod,
  inflationIndex,
  multiplyNumber,
  normalizeArray,
  normalizeArrayBySeasonality,
  roundArray
} from '../utils';
import {
  DEFAULT_AUXILLIARY,
  DEFAULT_AVERAGE_WHOLESALE_DAY_AHEAD_PRICE
} from './constant';
import { IAuxilliaryLosses } from './type';

export function calcAuxilliaryLosses({
  auxilliaryLossesSettings = DEFAULT_AUXILLIARY,
  averageWholeSaleDayAheadPrice = DEFAULT_AVERAGE_WHOLESALE_DAY_AHEAD_PRICE,
  revenueSetup = DEFAULT_REVENUE_SETUP,
  assumptionsData = DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  initialCapacity = 1000,
  startingAssumptionsForBatteries = DEFAULT_STARTING_BATTERY_ASSUMPTION,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  modelStartDate = '2023-01-01',
  decommissioningStartDate = '2068-01-01',
  decommissioningEndDate = '2068-06-30',
  operationStartDate = '2028-01-01',
  operationYears = 40
}: {
  auxilliaryLossesSettings?: IAuxilliaryLosses;
  averageWholeSaleDayAheadPrice?: number[];
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
  batteryDuration?: number;
  batteryCubes?: IBatteryCubes;
  batteryExCubes?: IBatteryExcubes;
  inflationInputs?: IInflationForm[];
  capexPaymentsProfile?: ICapexPaymentForm[];
  capexPaymentMilestones?: ICapexPaymentMilestoneForm[];
  capexUEL?: ICapexUELForm[];
  bessCapexForecast?: IBessCapexForecast;
  sensitivity?: number;
  operationYears?: number;
  modelStartDate?: string;
  operationStartDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
}) {
  const period =
    getMonthsNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  const importPrice = normalizeArrayBySeasonality(
    multiplyNumber(averageWholeSaleDayAheadPrice, 1),
    period
  );

  const auxilliaryLossFactor =
    auxilliaryLossesSettings?.lossFactor?.find(
      (d) => d.duration == startingAssumptionsForBatteries.batteryDuration
    )?.auxilliaryLossValue || 0;

  const installedCapacity = initialCapacity;

  const numberOfDaysInMonth = calcDaysInMonth(
    '2023-01-02',
    decommissioningEndDate
  );
  const operationsAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate
  );
  const indexValue = annualIndexToMonths(
    normalizeArray(
      inflationIndex({
        inflationInputs,
        baseYear: auxilliaryLossesSettings.baseYear,
        profile: auxilliaryLossesSettings.inflationProfile
      }),
      operationYears + 20
    )
  );
  const selectedAssumptionsData = assumptionsData?.find(
    (d) => d?.providerName == revenueSetup.forecastProviderChoice
  )?.data;

  const tempinflationAdjustmentFactor = roundArray(
    calcInflationAdjustmentFactor({
      inflationInputs,
      providerInflationProfile: selectedAssumptionsData?.inflation as string,
      providerBaseYear: selectedAssumptionsData?.baseYear as number,
      projectInflationProfile: revenueSetup.inflation,
      projectBaseYear: revenueSetup.baseYear
    }),
    10
  );
  const inflationAdjustmentFactor = normalizeArray(
    annualIndexToMonths(tempinflationAdjustmentFactor),
    period
  );

  const costPerMonth = operationsAsAPercentOfPeriod.map(
    (d, index) =>
      ((((d *
        numberOfDaysInMonth[index] *
        importPrice[index] *
        inflationAdjustmentFactor[index]) /
        1000) *
        auxilliaryLossFactor) /
        1000) *
      installedCapacity *
      24
  );

  const auxilliaryLosses = roundArray(
    costPerMonth.map((d, index) => -d * indexValue[index]),
    5
  );
  return roundArray(addZeros(auxilliaryLosses, period), 3);
}
