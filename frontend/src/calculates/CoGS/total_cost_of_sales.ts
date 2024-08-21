import { calcAuxilliaryLosses } from './auxilliary_losses';
import {
  DEFAULT_ADJUSTMENT_TARIFF_Data,
  DEFAULT_AUXILLIARY_LOSS,
  DEFAULT_EXPORT_CHARGES_OF_TNUOS,
  DEFAULT_LOCAL_CIRCUITS,
  DEFAULT_LOCAL_SUBSTATION_TARIFF,
  DEFAULT_METERING_COST,
  DEFAULT_NOT_SHARED_YEAR_ROUND_TARIFF_DATA,
  DEFAULT_OPTIMISER_COST,
  DEFAULT_PPA_FEE,
  DEFAULT_SHARED_YEAR_ROUND_TARIFF_DATA,
  DEFAULT_SYSTEM_PEAK_TARIFF_DATA,
  DEFAULT_TNUOS_CHARGE
} from './constant';
import { calcMetering } from './metering';
import { calcOptimiserCommission } from './optimiser_commission';
import { calcTNUoSCharges } from './tnuos_export_charges';
import {
  IAdjustmentTariffData,
  IExportChargesOfTNUoS,
  ILocalCircuits,
  ILocalSubstationTariff,
  INotSharedYearRoundTariffData,
  IOptimiser,
  ISharedYearRoundTariffData,
  ISystemTariffData
} from './type';

import { DEFAULT_WATER_RATES } from '../Administrative costs/constant';
import { IWaterRates } from '../Administrative costs/type';
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
import { roundArray, sumArray, sumArrays } from '../utils';
import {
  DEFAULT_AUXILLIARY,
  DEFAULT_AVERAGE_WHOLESALE_DAY_AHEAD_PRICE,
  DEFAULT_METERING,
  DEFAULT_OPTIMISER
} from './constant';
import { IAuxilliaryLosses, IMetering, ISensitivity } from './type';

export function calcTotalCostOfSales({
  // water_rates = DEFAULT_WATER_RATES,
  // optimiser = DEFAULT_OPTIMISER,
  // meteringSettings = DEFAULT_METERING,
  // auxilliaryLossesSettings = DEFAULT_AUXILLIARY,
  // averageWholeSaleDayAheadPrice = DEFAULT_AVERAGE_WHOLESALE_DAY_AHEAD_PRICE,
  // model = 'Conservative',
  // batteryCubes = DEFAULT_BATTERY_CUBES,
  // batteryExCubes = DEFAULT_BATTERY_EXCUBES,
  // capexPaymentsProfile = DEFAULT_CAPEX_PAYMENTS_PROFILE,
  // capexPaymentMilestones = DEFAULT_CAPEX_PAYMENT_MILESTONES,
  // capexUEL = DEFAULT_CAPEX_UEL,
  // bessCapexForecast = DEFAULT_BESS_CAPEX_FORECAST,
  // decommissioningStartDate = '2068-01-01',
  // revenueSensitivity = 0,
  // batteryDuration = 4,
  // revenueSetup = DEFAULT_REVENUE_SETUP,
  // assumptionsData = DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  // detailedRevenueData = DEFAULT_DETAILED_REVENUE_DATA,
  // initialCycleData = DEFAULT_INITIAL_CYCLE_DATA,
  // initialCapacity = 1000,
  // startingAssumptionsForBatteries = DEFAULT_STARTING_BATTERY_ASSUMPTION,
  // batteryDisposals = DEFAULT_BATTERY_DISPOSAL,
  // batteryEfficiency = DEFAULT_BATTERY_EFFICIENCY,
  // batteryAugmentation = DEFAULT_BATTERY_AUGMENTATION,
  // inflationInputs = DEFAULT_INFLATION_INPUTS,
  // modelStartDate = '2023-01-01',
  // decommissioningEndDate = '2068-06-30',
  // operationStartDate = '2028-01-01',
  // operationYears = 40,
  // batterySensitivity = 0,
  // systemPeakTariffData = DEFAULT_SYSTEM_PEAK_TARIFF_DATA,
  // sharedYearRoundTariffData = DEFAULT_SHARED_YEAR_ROUND_TARIFF_DATA,
  // notSharedYearRoundTariffData = DEFAULT_NOT_SHARED_YEAR_ROUND_TARIFF_DATA,
  // ajdustmentTariffData = DEFAULT_ADJUSTMENT_TARIFF_Data,
  // exportChargesOfTNUoS = DEFAULT_EXPORT_CHARGES_OF_TNUOS,
  // localSubstationTariff = DEFAULT_LOCAL_SUBSTATION_TARIFF,
  // localSubstationSwitch = 0,
  // localCircuitsData = DEFAULT_LOCAL_CIRCUITS,
  // opexSensitivity = 0,
  // vintage = DEFAULT_VINTAGE,
  meteringCost = DEFAULT_METERING_COST,
  auxilliaryLoss = DEFAULT_AUXILLIARY_LOSS,
  optimiserCost = DEFAULT_OPTIMISER_COST,
  tnuosCharge = DEFAULT_TNUOS_CHARGE,
  ppaFee = DEFAULT_PPA_FEE
}: {
  // water_rates?: IWaterRates;
  // optimiser?: IOptimiser;
  // meteringSettings?: IMetering;
  // auxilliaryLossesSettings?: IAuxilliaryLosses;
  // averageWholeSaleDayAheadPrice?: number[];
  // revenueSensitivity?: number;
  // revenueSetup?: IRevenueSetup;
  // assumptionsData?: IAssumptionData[];
  // detailedRevenueData?: IDetailedRevenueData[];
  // initialCycleData?: ICycleData[];
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
  // sharedYearRoundTariffData?: ISharedYearRoundTariffData[];
  // systemPeakTariffData?: ISystemTariffData[];
  // notSharedYearRoundTariffData?: INotSharedYearRoundTariffData[];
  // ajdustmentTariffData?: IAdjustmentTariffData[];
  // exportChargesOfTNUoS?: IExportChargesOfTNUoS;
  // localSubstationTariff?: ILocalSubstationTariff[];
  // localSubstationSwitch?: number;
  // initialCapacity?: number;
  // operationYears?: number;
  // modelStartDate?: string;
  // operationStartDate?: string;
  // decommissioningStartDate?: string;
  // decommissioningEndDate?: string;
  // opexSensitivity?: number;
  // localCircuitsData?: ILocalCircuits[];
  // vintage?: IVintage;
  meteringCost?: number[];
  auxilliaryLoss?: number[];
  optimiserCost?: number[];
  tnuosCharge?: number[];
  ppaFee?: number[];
}) {
  // const auxilliaryLosses = calcAuxilliaryLosses({
  //   auxilliaryLossesSettings,
  //   averageWholeSaleDayAheadPrice,
  //   revenueSetup,
  //   assumptionsData,
  //   initialCapacity,
  //   startingAssumptionsForBatteries,
  //   inflationInputs,
  //   modelStartDate,
  //   decommissioningEndDate,
  //   operationStartDate,
  //   operationYears
  // });
  // const metering = calcMetering({
  //   meteringSettings,
  //   initialCapacity,
  //   startingAssumptionsForBatteries,
  //   inflationInputs,
  //   modelStartDate,
  //   decommissioningEndDate,
  //   operationStartDate,
  //   operationYears,
  //   opexSensitivity
  // });
  // const optimiserCommission = calcOptimiserCommission({
  //   model,
  //   batteryCubes,
  //   batteryExCubes,
  //   capexPaymentsProfile,
  //   capexPaymentMilestones,
  //   capexUEL,
  //   bessCapexForecast,
  //   batterySensitivity,
  //   decommissioningStartDate,
  //   revenueSensitivity,
  //   batteryDuration,
  //   revenueSetup,
  //   assumptionsData,
  //   detailedRevenueData,
  //   initialCycleData,
  //   initialCapacity,
  //   startingAssumptionsForBatteries,
  //   batteryDisposals,
  //   batteryEfficiency,
  //   batteryAugmentation,
  //   inflationInputs,
  //   modelStartDate,
  //   decommissioningEndDate,
  //   operationStartDate,
  //   operationYears,
  //   optimiser,
  //   vintage
  // });
  // const TNUoSCharges = calcTNUoSCharges({
  //   systemPeakTariffData,
  //   sharedYearRoundTariffData,
  //   notSharedYearRoundTariffData,
  //   ajdustmentTariffData,
  //   exportChargesOfTNUoS,
  //   localSubstationTariff,
  //   localSubstationSwitch,
  //   localCircuitsData,
  //   initialCapacity,
  //   operationYears,
  //   modelStartDate,
  //   operationStartDate,
  //   decommissioningEndDate
  // });

  const totalCoGS: number[] = sumArrays(
    optimiserCost,
    tnuosCharge,
    meteringCost,
    auxilliaryLoss,
    ppaFee
  );

  return totalCoGS;
  // return roundArray(
  //   auxilliaryLosses.map(
  //     (d, index) =>
  //       d + metering[index] + optimiserCommission[index] + TNUoSCharges[index]
  //   ),
  //   2
  // );
}
