import {
  DEFAULT_INFLATION_INPUTS,
  DEFAULT_STARTING_BATTERY_ASSUMPTION
} from '../constant';
import { IInflationForm, IStartingBatteryAssumptions } from '../Revenue/type';
import {
  addZeros,
  annualIndexToMonths,
  getMonthsNumberFromModelStartDate,
  getOperationsAsAPercentOfPeriod,
  inflationIndex,
  normalizeArray,
  roundArray
} from '../utils';
import { DEFAULT_METERING } from './constant';
import { IMetering } from './type';

export function calcMetering({
  meteringSettings = DEFAULT_METERING,
  initialCapacity = 1000,
  startingAssumptionsForBatteries = DEFAULT_STARTING_BATTERY_ASSUMPTION,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  modelStartDate = '2023-01-01',
  decommissioningEndDate = '2068-06-30',
  operationStartDate = '2028-01-01',
  operationYears = 40,
  opexSensitivity = 0
}: {
  meteringSettings?: IMetering;
  initialCapacity?: number;
  startingAssumptionsForBatteries?: IStartingBatteryAssumptions;
  inflationInputs?: IInflationForm[];
  operationYears?: number;
  modelStartDate?: string;
  operationStartDate?: string;
  decommissioningEndDate?: string;
  opexSensitivity?: number;
}) {
  const period =
    getMonthsNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  const operationsAsAPercentOfPeriod = getOperationsAsAPercentOfPeriod({
    modelStartDate,
    operationStartDate,
    operationYears
  });
  const indexValue = annualIndexToMonths(
    normalizeArray(
      inflationIndex({
        inflationInputs,
        baseYear: meteringSettings.baseYear,
        profile: meteringSettings.inflationProfile
      }),
      operationYears + 25
    )
  );

  const capacity = initialCapacity;

  const annualCost =
    meteringSettings.annualCost?.find(
      (d) => d.duration == startingAssumptionsForBatteries.batteryDuration
    )?.annualCostPerMW || 0;
  const costPerMonth = ((1 + opexSensitivity) * annualCost * capacity) / 12;

  const metering = operationsAsAPercentOfPeriod.map(
    (d, index) => -d * indexValue[index] * costPerMonth
  );
  return addZeros(roundArray(metering, 3), period);
}
