import { calcAuxilliaryLosses } from './auxilliary_losses';
import {
  DEFAULT_ADJUSTMENT_TARIFF_Data,
  DEFAULT_EXPORT_CHARGES_OF_TNUOS,
  DEFAULT_LOCAL_CIRCUITS,
  DEFAULT_LOCAL_SUBSTATION_TARIFF,
  DEFAULT_NOT_SHARED_YEAR_ROUND_TARIFF_DATA,
  DEFAULT_SHARED_YEAR_ROUND_TARIFF_DATA,
  DEFAULT_SYSTEM_PEAK_TARIFF_DATA
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
  DEFAULT_FIXED_PPA,
  DEFAULT_FIXED_PPA_VALUE,
  DEFAULT_FLOATING_PPA,
  DEFAULT_FLOATING_PPA_VALUE,
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
  IFixedPPA,
  IFloatingPPA,
  IInflationForm,
  IRevenueSetup,
  IStartingBatteryAssumptions,
  IVintage
} from '../Revenue/type';
import { multiplyNumber, roundArray, sumArrays } from '../utils';
import {
  DEFAULT_AUXILLIARY,
  DEFAULT_AVERAGE_WHOLESALE_DAY_AHEAD_PRICE,
  DEFAULT_METERING,
  DEFAULT_OPTIMISER
} from './constant';
import { IAuxilliaryLosses, IMetering, ISensitivity } from './type';
import { calcFixedPPA } from '../Revenue/fixed_ppa';
import { calcFloatingPPA } from '../Revenue/floating_ppa';
import { setFixedPPAValue } from '../../store/slices/resultSlice';

export function calcPPAFees({
  fixedPPAValue = DEFAULT_FIXED_PPA_VALUE,
  floatingPPAValue = DEFAULT_FLOATING_PPA_VALUE,
  ppaFeesPercentage = 20
}: {
  fixedPPAValue?: number[];
  floatingPPAValue?: number[];
  ppaFeesPercentage?: number;
  modelStartDate?: string;
  operationStartDate?: string;
  decommissioningEndDate?: string;
  vintage?: IVintage;
}) {
  const ppaRevenueFee = multiplyNumber(
    sumArrays(fixedPPAValue, floatingPPAValue),
    -ppaFeesPercentage / 100
  );
  return roundArray(ppaRevenueFee, 3);
}
