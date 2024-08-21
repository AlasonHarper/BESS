import { number } from 'prop-types';
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
  DEFAULT_VINTAGE
} from '../constant';
import {
  annualIndexToMonths,
  arrayDivide,
  calcCapexForecast,
  calcVintages,
  getAsAPercentOfPeriod,
  getMonthsNumberFromModelStartDate,
  getOperationsAsAPercentOfPeriod,
  inflationIndex,
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
  IVintage
} from './type';
import {
  calcInflationAdjustmentFactor,
  getActiveScenarioRevenueItems
} from './wholesale_day_ahead';

export function calcGainOnDisposal({
  model = 'Conservative',
  batteryDuration = 4,
  batteryCubes = DEFAULT_BATTERY_CUBES,
  batteryExCubes = DEFAULT_BATTERY_EXCUBES,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  bessCapexForecast = DEFAULT_BESS_CAPEX_FORECAST,
  batterySensitivity = 0,
  operationYears = 40,
  modelStartDate = '2023-01-01',
  decommissioningStartDate = '2068-01-01',
  decommissioningEndDate = '2068-06-30',
  vintage = DEFAULT_VINTAGE
}: {
  model?: string;
  batteryDuration?: number;
  batteryCubes?: IBatteryCubes;
  batteryExCubes?: IBatteryExcubes;
  inflationInputs?: IInflationForm[];
  bessCapexForecast?: IBessCapexForecast;
  batterySensitivity?: number;
  operationYears?: number;
  modelStartDate?: string;
  operationStartDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
  vintage?: IVintage;
}) {
  const period =
    getMonthsNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  // gainOnDisposalRevenue = forecastRecycleRevenue - bookValueAtPointOfDisposal

  // calculaion of forecastRecycleRevenue.
  // forecastRecycleRevenue comes from Calcs 7.11 Recycle revenue.

  const decommissioningStratMonthNumber =
    getMonthsNumberFromModelStartDate(
      modelStartDate,
      decommissioningStartDate
    ) - 1;
  const decommissioningEndMonthNumber =
    getMonthsNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;

  const forecastCapexCost = normalizeArray(
    annualIndexToMonths(
      calcCapexForecast({
        model,
        batteryDuration,
        batteryCubes,
        batteryExCubes,
        inflationInputs,
        bessCapexForecast,
        batterySensitivity,
        operationYears
      })[2]
    ),
    decommissioningEndMonthNumber
  );

  const vintages = vintage.vintages;
  const numberOfVintages = vintages.length;

  const forecastRecycleRevenue = [];
  for (let i = 0; i < decommissioningEndMonthNumber; i++) {
    forecastRecycleRevenue.push(0);
  }
  for (let i = 0; i < numberOfVintages; i++) {
    if (vintages[i].data.disposalMonthNumber != 0)
      forecastRecycleRevenue[vintages[i].data.disposalMonthNumber - 1] =
        forecastRecycleRevenue[vintages[i].data.disposalMonthNumber - 1] +
        (forecastCapexCost[vintages[i].data.disposalMonthNumber - 1] *
          vintages[i].data.capacityAddedAdjustedForEfficiency *
          DEFAULT_BATTERY_DISPOSAL.recyclePricePercent) /
          100;
  }

  // calculation of closing bookvalue of vintages.
  const bookValueAtPointOfDisposal: number[] = [];
  for (let i = 0; i < decommissioningEndMonthNumber; i++) {
    bookValueAtPointOfDisposal.push(0);
  }

  for (let i = 0; i < numberOfVintages; i++) {
    if (vintages[i].data.disposalMonthNumber != 0)
      bookValueAtPointOfDisposal[vintages[i].data.disposalMonthNumber - 1] =
        bookValueAtPointOfDisposal[vintages[i].data.disposalMonthNumber - 1] +
        vintages[i].data.endBalance[vintages[i].data.disposalMonthNumber - 1];
  }
  const gainOnDisposalRevenue = roundArray(
    forecastRecycleRevenue.map(
      (d, index) => d - bookValueAtPointOfDisposal[index]
    ),
    3
  );

  return {
    bookValueAtPointOfDisposal: bookValueAtPointOfDisposal,
    forecastRecycleRevenue: forecastRecycleRevenue,
    gainOnDisposalRevenue: gainOnDisposalRevenue
  };
}
