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
  addZeros,
  annualIndexToMonths,
  arrayDivide,
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

export function calcCapacityMarket({
  revenueSensitivity = 0,
  revenueSetup = DEFAULT_REVENUE_SETUP,
  assumptionsData = DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  detailedRevenueData = DEFAULT_DETAILED_REVENUE_DATA,
  startingAssumptionsForBatteries = DEFAULT_STARTING_BATTERY_ASSUMPTION,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  modelStartDate = '2023-01-01',
  operationStartDate = '2028-01-01',
  decommissioningStartDate = '2068-01-01',
  decommissioningEndDate = '2068-06-30',
  vintage = DEFAULT_VINTAGE
}: {
  revenueSensitivity?: number;
  revenueSetup?: IRevenueSetup;
  assumptionsData?: IAssumptionData[];
  detailedRevenueData?: IDetailedRevenueData[];
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
  //wholeSaleDayAheadRevenue = forecastProviderInputs * inflationAdjustmentFactor * operationsAsAPercentOfPeriod *Degraded capacity adjusted for efficiency and availability*(1+revenue sensitivity)

  const selectedAssumptionsData = assumptionsData.find(
    (d) => d?.providerName == revenueSetup.forecastProviderChoice
  )?.data;
  const forecastProviderInputs = normalizeArrayBySeasonality(
    roundArray(
      getActiveScenarioRevenueItems({
        revenueSetup,
        assumptionsData,
        startingAssumptionsForBatteries,
        detailedRevenueData
      })
        ?.find((d) => d?.item == 'Capacity Market Revenues')
        ?.data.map(
          (d) =>
            d /
            (1000 *
              ((1 + (selectedAssumptionsData?.efficiency || 0) / 100) / 2))
        ) || [],
      10
    ),
    period
  );

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
  const operationsAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate
  );
  const degradadedCapacityAdjustedForEffiAndAvailability = roundArray(
    vintage.totalGenerationCapacity.map(
      (d) => d * 0.01 * startingAssumptionsForBatteries.batteryAvailability
    ),
    3
  );

  return addZeros(
    roundArray(
      degradadedCapacityAdjustedForEffiAndAvailability.map(
        (d, index) =>
          d *
          forecastProviderInputs[index] *
          operationsAsAPercentOfPeriod[index] *
          inflationAdjustmentFactor[index] *
          (1 + revenueSensitivity)
      ),
      3
    ),
    period
  );
}
