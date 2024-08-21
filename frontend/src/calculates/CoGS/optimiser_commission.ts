import { useAppSelector } from '../../store/hooks';
import { selectResult } from '../../store/slices/resultSlice';
import {
  DEFAULT_BALANCING_MECHANISM,
  DEFAULT_BATTERY_AUGMENTATION,
  DEFAULT_BATTERY_CUBES,
  DEFAULT_BATTERY_DISPOSAL,
  DEFAULT_BATTERY_EFFICIENCY,
  DEFAULT_BATTERY_EXCUBES,
  DEFAULT_BESS_CAPEX_FORECAST,
  DEFAULT_CAPACITY_MARKET,
  DEFAULT_CAPEX_PAYMENTS_PROFILE,
  DEFAULT_CAPEX_PAYMENT_MILESTONES,
  DEFAULT_CAPEX_UEL,
  DEFAULT_DETAILED_REVENUE_DATA,
  DEFAULT_FREQUENCY_RESPONSE,
  DEFAULT_GAIN_ON_DISPOSAL,
  DEFAULT_INFLATION_INPUTS,
  DEFAULT_INITIAL_CYCLE_DATA,
  DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  DEFAULT_REVENUE_SETUP,
  DEFAULT_STARTING_BATTERY_ASSUMPTION,
  DEFAULT_VINTAGE,
  DEFAULT_WHOLESALE_DAY_AHEAD,
  DEFAULT_WHOLESALE_INTRADAY
} from '../constant';
import { calcBalancingMechanismRevenue } from '../Revenue/balancing_mechanism';
import { calcCapacityMarket } from '../Revenue/capacity_market';
import { calcFrequencyResponse } from '../Revenue/frequency_response';
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
  IStartingBatteryAssumptions,
  IVintage
} from '../Revenue/type';
import { calcWholeSaleDayAheadRevenue } from '../Revenue/wholesale_day_ahead';
import { calcWholesaleIntraday } from '../Revenue/wholsale_intraday';
import {
  addZeros,
  calcVintages,
  getMonthsNumberFromModelStartDate,
  roundArray
} from '../utils';
import { DEFAULT_OPTIMISER } from './constant';
import { IOptimiser } from './type';

export function calcOptimiserCommission({
  modelStartDate = '2023-01-01',
  decommissioningEndDate = '2068-06-30',
  optimiser = DEFAULT_OPTIMISER,
  vintage = DEFAULT_VINTAGE,
  wholesaleDayAhead = DEFAULT_WHOLESALE_DAY_AHEAD,
  wholesaleDayIntraday = DEFAULT_WHOLESALE_INTRADAY,
  balancingMechanism = DEFAULT_BALANCING_MECHANISM,
  frequencyResponse = DEFAULT_FREQUENCY_RESPONSE,
  capacityMarket = DEFAULT_CAPACITY_MARKET
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
  batteryDuration?: number;
  batteryCubes?: IBatteryCubes;
  batteryExCubes?: IBatteryExcubes;
  inflationInputs?: IInflationForm[];
  capexPaymentsProfile?: ICapexPaymentForm[];
  capexPaymentMilestones?: ICapexPaymentMilestoneForm[];
  capexUEL?: ICapexUELForm[];
  bessCapexForecast?: IBessCapexForecast;
  batterySensitivity?: number;
  operationYears?: number;
  modelStartDate?: string;
  operationStartDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
  optimiser?: IOptimiser;
  vintage?: IVintage;
  wholesaleDayAhead?: number[];
  wholesaleDayIntraday?: number[];
  balancingMechanism?: number[];
  frequencyResponse?: number[];
  capacityMarket?: number[];
}) {
  const period =
    getMonthsNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
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
  let upsidePotential: number[] = [];
  let tradingFloorTopUp: number[] = [];
  const tradingFloor = optimiser.floor.floorPrice;
  const averageBatteryCapacityInperiod = vintage.totalGenerationCapacity;
  const tradingFloorAsAPercentOfPeriod = 0;
  const tradingFloorValue = averageBatteryCapacityInperiod.map(
    (d: any) => d * tradingFloorAsAPercentOfPeriod * tradingFloor
  );
  upsidePotential = wholesaleDayAhead.map(
    (d, index) =>
      ((d +
        wholesaleDayIntraday[index] +
        balancingMechanism[index] +
        frequencyResponse[index] +
        capacityMarket[index]) *
        optimiser.switch *
        optimiser.upsideValue) /
      100
  );

  tradingFloorTopUp = tradingFloorValue.map((d: any, index: number) =>
    Math.max(
      d -
        upsidePotential[index] -
        (wholesaleDayIntraday[index] +
          balancingMechanism[index] +
          frequencyResponse[index] +
          capacityMarket[index]),
      0
    )
  );
  const optimiserCommission = frequencyResponse.map(
    (d, index) =>
      -(
        optimiser.commission *
        (d +
          wholesaleDayIntraday[index] +
          balancingMechanism[index] +
          wholesaleDayAhead[index] +
          capacityMarket[index] +
          upsidePotential[index] +
          tradingFloorTopUp[index])
      ) / 100
  );
  return roundArray(addZeros(optimiserCommission, period), 3);
}
