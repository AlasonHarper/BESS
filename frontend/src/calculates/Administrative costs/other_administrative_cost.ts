import { type } from 'os';
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
  DEFAULT_STARTING_BATTERY_ASSUMPTION
} from '../constant';
import {
  addZeros,
  annualIndexToMonths,
  calcVintages,
  getAsAPercentOfPeriod,
  getMonthsNumberFromModelStartDate,
  inflationIndex,
  multiplyArrays,
  multiplyNumber,
  normalizeArray,
  roundArray,
  sumArrays
} from '../utils';
import {
  DEFAULT_EXTENDED_WARRANTY,
  DEFAULT_LEGAL_COST,
  DEFAULT_OTHER_ADMIN_COSTs,
  DEFAULT_SITE_SECURITY
} from './constant';
import {
  IExtendedWarranty,
  ILegalCost,
  IOtherAdminCosts,
  ISiteSecurity
} from './type';
import { INFLATION_START_YEAR, MODEL_START_YEAR } from '../../utils/constant';

export function calcOtherAdminCosts({
  otherAdministrativeCosts = DEFAULT_OTHER_ADMIN_COSTs,
  opexSensitivity = 0,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  operationStartDate = '2028-01-01',
  modelStartDate = '2023-01-01',
  operationEndDate = '2067-12-31',
  decommissioningEndDate = '2068-06-30'
}: {
  otherAdministrativeCosts?: IOtherAdminCosts;
  opexSensitivity?: number;
  inflationInputs?: IInflationForm[];
  operationStartDate?: string;
  modelStartDate?: string;
  operationEndDate?: string;
  decommissioningEndDate?: string;
}) {
  const monthlyCost =
    ((otherAdministrativeCosts.annualAccountingFeesAndAudit * 1 +
      otherAdministrativeCosts.annualIT * 1 +
      otherAdministrativeCosts.annualOtherCost * 1) *
      (1 + opexSensitivity)) /
    12;
  const operationsAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    operationEndDate,
    decommissioningEndDate
  );

  const indexValue = annualIndexToMonths(
    inflationIndex({
      inflationInputs,
      baseYear: otherAdministrativeCosts.baseYear,
      profile: otherAdministrativeCosts.inflationProfile
    }).slice(MODEL_START_YEAR - INFLATION_START_YEAR)
  );

  const forecastOtherAdminCosts = operationsAsAPercentOfPeriod.map(
    (d, index) => -d * monthlyCost * indexValue[index]
  );

  return roundArray(forecastOtherAdminCosts, 2);
}
