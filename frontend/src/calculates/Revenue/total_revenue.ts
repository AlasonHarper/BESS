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
  DEFAULT_VINTAGE,
  DEFAULT_WHOLESALE_DAY_AHEAD,
  DEFAULT_WHOLESALE_INTRADAY,
  DEFAULT_BALANCING_MECHANISM,
  DEFAULT_FREQUENCY_RESPONSE,
  DEFAULT_CAPACITY_MARKET,
  DEFAULT_GAIN_ON_DISPOSAL,
  DEFAULT_FIXED_PPA_VALUE,
  DEFAULT_FLOATING_PPA_VALUE
} from '../constant';
import {
  addZeros,
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
  roundArray,
  sumArrays
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
  IGainOnDisposal,
  IInflationForm,
  IRevenueSetup,
  IScenario,
  IStartingBatteryAssumptions,
  IVintage
} from './type';
import {
  calcInflationAdjustmentFactor,
  calcWholeSaleDayAheadRevenue,
  getActiveScenarioRevenueItems
} from './wholesale_day_ahead';
import { calcBalancingMechanismRevenue } from './balancing_mechanism';
import { calcGainOnDisposal } from './gain_on_disposal_of_batteries';
import { calcWholesaleIntraday } from './wholsale_intraday';
import { calcCapacityMarket } from './capacity_market';
import { calcFrequencyResponse } from './frequency_response';
import { calcTotalCostOfSales } from '../CoGS/total_cost_of_sales';

export function calcTotalRevenue({
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
  // inflationInputs = DEFAULT_INFLATION_INPUTS,
  // capexPaymentsProfile = DEFAULT_CAPEX_PAYMENTS_PROFILE,
  // capexPaymentMilestones = DEFAULT_CAPEX_PAYMENT_MILESTONES,
  // capexUEL = DEFAULT_CAPEX_UEL,
  // bessCapexForecast = DEFAULT_BESS_CAPEX_FORECAST,
  // batterySensitivity = 0,
  // operationYears = 40,
  // modelStartDate = '2023-01-01',
  // operationStartDate = '2028-01-01',
  // decommissioningStartDate = '2068-01-01',
  // decommissioningEndDate = '2068-06-30',
  // vintage = DEFAULT_VINTAGE,
  wholesaleDayAhead = DEFAULT_WHOLESALE_DAY_AHEAD,
  wholesaleDayIntraday = DEFAULT_WHOLESALE_INTRADAY,
  balancingMechanism = DEFAULT_BALANCING_MECHANISM,
  frequencyResponse = DEFAULT_FREQUENCY_RESPONSE,
  capacityMarket = DEFAULT_CAPACITY_MARKET,
  gainOnDisposal = DEFAULT_GAIN_ON_DISPOSAL,
  fixedPPAValue = DEFAULT_FIXED_PPA_VALUE,
  floatingPPAValue = DEFAULT_FLOATING_PPA_VALUE
}: {
  // revenueSensitivity?: number;
  // revenueSetup?: IRevenueSetup;
  // assumptionsData?: IAssumptionData[];
  // detailedRevenueData?: IDetailedRevenueData[];
  // initialCycleData?: ICycleData[];
  // initialCapacity?: number;
  // startingAssumptionsForBatteries?: IStartingBatteryAssumptions;
  // batteryDisposals?: IBatteryDisposal;
  // batteryEfficiency?: IBatteryEfficiency;
  // batteryAugmentation?: IBatteryAugmentation;
  // model?: string;
  // batteryDuration?: number;
  // batteryCubes?: IBatteryCubes;
  // batteryExCubes?: IBatteryExcubes;
  // inflationInputs?: IInflationForm[];
  // capexPaymentsProfile?: ICapexPaymentForm[];
  // capexPaymentMilestones?: ICapexPaymentMilestoneForm[];
  // capexUEL?: ICapexUELForm[];
  // bessCapexForecast?: IBessCapexForecast;
  // batterySensitivity?: number;
  // operationYears?: number;
  // modelStartDate?: string;
  // operationStartDate?: string;
  // decommissioningStartDate?: string;
  // decommissioningEndDate?: string;
  // vintage?: IVintage;
  wholesaleDayAhead?: number[];
  wholesaleDayIntraday?: number[];
  balancingMechanism?: number[];
  frequencyResponse?: number[];
  capacityMarket?: number[];
  gainOnDisposal?: IGainOnDisposal;
  fixedPPAValue?: number[];
  floatingPPAValue?: number[];
}) {
  // const balancingMechanismRevenue = calcBalancingMechanismRevenue({
  //   revenueSensitivity,
  //   revenueSetup,
  //   assumptionsData,
  //   detailedRevenueData,
  //   startingAssumptionsForBatteries,
  //   inflationInputs,
  //   modelStartDate,
  //   operationStartDate,
  //   decommissioningStartDate,
  //   decommissioningEndDate,
  //   vintage
  // });
  // const capacityMarketRevenue = calcCapacityMarket({
  //   revenueSensitivity,
  //   revenueSetup,
  //   assumptionsData,
  //   detailedRevenueData,
  //   startingAssumptionsForBatteries,
  //   inflationInputs,
  //   modelStartDate,
  //   operationStartDate,
  //   decommissioningStartDate,
  //   decommissioningEndDate,
  //   vintage
  // });
  // const frequencyResponseRevenue = calcFrequencyResponse({
  //   revenueSensitivity,
  //   revenueSetup,
  //   assumptionsData,
  //   detailedRevenueData,
  //   startingAssumptionsForBatteries,
  //   inflationInputs,
  //   modelStartDate,
  //   operationStartDate,
  //   decommissioningStartDate,
  //   decommissioningEndDate,
  //   vintage
  // });
  // const wholeSaleDayAheadRevenue = calcWholeSaleDayAheadRevenue({
  //   revenueSensitivity,
  //   revenueSetup,
  //   assumptionsData,
  //   detailedRevenueData,
  //   startingAssumptionsForBatteries,
  //   inflationInputs,
  //   modelStartDate,
  //   operationStartDate,
  //   decommissioningStartDate,
  //   decommissioningEndDate,
  //   vintage
  // });
  // const wholeSaleIntradayRevenue = calcWholesaleIntraday({
  //   revenueSensitivity,
  //   revenueSetup,
  //   assumptionsData,
  //   detailedRevenueData,
  //   startingAssumptionsForBatteries,
  //   inflationInputs,
  //   modelStartDate,
  //   operationStartDate,
  //   decommissioningStartDate,
  //   decommissioningEndDate,
  //   vintage
  // });
  // const gainOnDisposal = calcGainOnDisposal({
  //   model,
  //   batteryDuration,
  //   batteryCubes,
  //   batteryExCubes,
  //   inflationInputs,
  //   bessCapexForecast,
  //   batterySensitivity,
  //   operationYears,
  //   modelStartDate,
  //   operationStartDate,
  //   decommissioningStartDate,
  //   decommissioningEndDate,
  //   vintage
  // }).gainOnDisposalRevenue;
  // const period =
  //   getMonthsNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
  //   1;
  const totalRevenue: number[] = sumArrays(
    wholesaleDayAhead,
    wholesaleDayIntraday,
    capacityMarket,
    balancingMechanism,
    frequencyResponse,
    gainOnDisposal?.gainOnDisposalRevenue,
    fixedPPAValue,
    floatingPPAValue
  );

  return totalRevenue;
  // return gainOnDisposal.map(
  //   (d, index) =>
  //     d +
  //     addZeros(
  //       sumArrays(
  //         balancingMechanismRevenue,
  //         capacityMarketRevenue,
  //         frequencyResponseRevenue,
  //         wholeSaleDayAheadRevenue,
  //         wholeSaleIntradayRevenue
  //       ),
  //       period
  //     )[index]
  // );
}
