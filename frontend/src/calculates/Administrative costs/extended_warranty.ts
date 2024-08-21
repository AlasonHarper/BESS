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
import { DEFAULT_EXTENDED_WARRANTY } from './constant';
import { IExtendedWarranty } from './type';

export function calcExtendedWarranty({
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
  batteryDuration = 4,
  batteryCubes = DEFAULT_BATTERY_CUBES,
  batteryExCubes = DEFAULT_BATTERY_EXCUBES,
  capexPaymentsProfile = DEFAULT_CAPEX_PAYMENTS_PROFILE,
  capexPaymentMilestones = DEFAULT_CAPEX_PAYMENT_MILESTONES,
  capexUEL = DEFAULT_CAPEX_UEL,
  bessCapexForecast = DEFAULT_BESS_CAPEX_FORECAST,
  batterySensitivity = 0,
  operationYears = 40,
  extended_warranty = DEFAULT_EXTENDED_WARRANTY,
  battery_duration = 4,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  opexSensitivity = 0,
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
  extended_warranty?: IExtendedWarranty;
  operationEndDate?: string;
  battery_duration?: number;
  opexSensitivity?: number;
  vintage?: IVintage;
}) {
  const period =
    getMonthsNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  const operatingFlag = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate
  );

  // Monthly cost

  const monthly_fees_per_mw =
    (-extended_warranty.extended_warranty_switch *
      ((
        extended_warranty.annual_fees_per_mw.find(
          (d) => d.duration == battery_duration
        ) || {}
      ).fee || 0) *
      (1 + opexSensitivity)) /
    12;

  // Indexation on annual timeline

  const indexation = normalizeArray(
    annualIndexToMonths(
      inflationIndex({
        inflationInputs,
        baseYear: extended_warranty.inflation_base_year_warranty,
        profile: extended_warranty.inflation_profile_warranty
      })
    ),
    period
  );
  // Monthly unit cost on monthly timeline

  const inflated_monthly_cost_on_annual_timeline = multiplyNumber(
    indexation,
    monthly_fees_per_mw
  );

  // MW for warranty consdieration

  const length_of_warranty = extended_warranty.length_of_warranty * 12;
  const vinatges_data = vintage.vintages;

  const number_of_vintages = vinatges_data.length;

  const vintages_capacity_added: number[][] = [];
  const vintages_flag: number[][] = [];
  const vintages_flag_another: number[][] = [];
  let vintages_total_mw: number[] = [];
  for (let i = 0; i < number_of_vintages; i++) {
    if (vinatges_data[i].data.stagingMonthNumber == 0) break;

    vintages_capacity_added[i] = [];
    vintages_flag[i] = [];
    vintages_flag_another[i] = [];
    for (let j = 0; j < period; j++) {
      if (j == vinatges_data[i].data.stagingMonthNumber - 1)
        vintages_capacity_added[i][j] =
          vinatges_data[i].data.capacityAddedAdjustedForEfficiency;
      else vintages_capacity_added[i][j] = 0;
    }
    for (let j = 0; j < period; j++) {
      if (j == 0) {
        if (vintages_capacity_added[i][j] == 0) {
          vintages_flag[i][j] = 0;
          vintages_flag_another[i][j] = 0;
        } else {
          vintages_flag[i][j] = 1;
          vintages_flag_another[i][j] = 1;
        }
      } else {
        if (vintages_flag_another[i][j - 1] < length_of_warranty) {
          if (
            vintages_flag[i][j - 1] == 0 &&
            vintages_capacity_added[i][j] != 0
          ) {
            vintages_flag[i][j] = 1;
          } else vintages_flag[i][j] = vintages_flag[i][j - 1];
        } else vintages_flag[i][j] = 0;

        vintages_flag_another[i][j] =
          vintages_flag_another[i][j - 1] * vintages_flag[i][j] +
          vintages_flag[i][j];
      }
    }
    if (i == 0) {
      vintages_total_mw = multiplyNumber(
        vintages_flag[i],
        vinatges_data[i].data.capacityAddedAdjustedForEfficiency
      );
    } else
      vintages_total_mw = sumArrays(
        vintages_total_mw,
        multiplyNumber(
          vintages_flag[i],
          vinatges_data[i].data.capacityAddedAdjustedForEfficiency
        )
      );
  }

  // Forecast cost

  const mw_for_warrantny_consideration = vintages_total_mw;
  const forecast_cost = multiplyArrays([
    multiplyArrays([mw_for_warrantny_consideration, operatingFlag]),
    inflated_monthly_cost_on_annual_timeline
  ]);
  return roundArray(forecast_cost, 3);
}
