import moment from 'moment';
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
  DEFAULT_FIXED_PPA,
  DEFAULT_VINTAGE
} from '../constant';
import {
  annualIndexToMonths,
  arrayDivide,
  calcVintages,
  getAsAPercentOfPeriod,
  getCyclesPerMonth,
  getMonthsNumberFromModelStartDate,
  getOperationsAsAPercentOfPeriod,
  inflationIndex,
  multiplyArrays,
  multiplyNumber,
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
  IFixedPPA,
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

export function calcFixedPPA({
  fixedPPARevenue = DEFAULT_FIXED_PPA,
  modelStartDate = '2023-01-01',
  decommissioningEndDate = '2068-06-30',
  vintage = DEFAULT_VINTAGE
}: {
  fixedPPARevenue: IFixedPPA;
  modelStartDate?: string;
  decommissioningEndDate?: string;
  vintage?: IVintage;
}) {
  const period =
    getMonthsNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  let fixedPPARevenueArray: number[] = [];
  let firstFixedPPA = [];
  let secondFixedPPA = [];

  const totalGeneration = vintage.electricitySold;
  if (fixedPPARevenue.switch == 0) {
    return new Array(period).fill(0);
  } else {
    const fixedPPAPercentage = fixedPPARevenue?.assignedPercentage || 0;
    const firstFixedPrice =
      fixedPPARevenue.data.find((d) => d.contract == 'firstFixed')?.data
        ?.price || 0;
    const secondFixedPrice =
      fixedPPARevenue.data.find((d) => d.contract == 'secondFixed')?.data
        ?.price || 0;

    if (
      !moment(fixedPPARevenue.data[0].data.startDate).isValid() ||
      !moment(fixedPPARevenue.data[0].data.endDate).isValid()
    ) {
      firstFixedPPA = new Array(period).fill(0);
    } else {
      const firstPPAAsAPercentOfPeriod: number[] = getAsAPercentOfPeriod(
        modelStartDate,
        fixedPPARevenue.data[0].data?.startDate,
        fixedPPARevenue.data[0].data?.endDate,
        decommissioningEndDate
      );
      const fixedPPAGeneration: number[] = multiplyNumber(
        totalGeneration,
        fixedPPAPercentage / 100
      );
      firstFixedPPA = multiplyNumber(
        multiplyArrays([fixedPPAGeneration, firstPPAAsAPercentOfPeriod]),
        firstFixedPrice / 1000
      );
    }
    if (
      !moment(fixedPPARevenue.data[1].data.startDate).isValid() ||
      !moment(fixedPPARevenue.data[1].data.endDate).isValid()
    ) {
      secondFixedPPA = new Array(period).fill(0);
    } else {
      const secondPPAAsAPercentOfPeriod: number[] = getAsAPercentOfPeriod(
        modelStartDate,
        fixedPPARevenue.data[1].data?.startDate,
        fixedPPARevenue.data[1].data?.endDate,
        decommissioningEndDate
      );
      const fixedPPAGeneration: number[] = multiplyNumber(
        totalGeneration,
        fixedPPAPercentage / 100
      );
      secondFixedPPA = multiplyNumber(
        multiplyArrays([fixedPPAGeneration, secondPPAAsAPercentOfPeriod]),
        secondFixedPrice / 1000
      );
    }

    fixedPPARevenueArray = sumArrays(firstFixedPPA, secondFixedPPA);

    return fixedPPARevenueArray;
  }
}
