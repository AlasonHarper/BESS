import {
  addZeros,
  getMonthsNumberFromModelStartDate,
  roundArray
} from '../utils';
import {
  DEFAULT_ADJUSTMENT_TARIFF_Data,
  DEFAULT_EXPORT_CHARGES_OF_TNUOS,
  DEFAULT_LOCAL_CIRCUITS,
  DEFAULT_LOCAL_SUBSTATION_TARIFF,
  DEFAULT_NOT_SHARED_YEAR_ROUND_TARIFF_DATA,
  DEFAULT_SHARED_YEAR_ROUND_TARIFF_DATA,
  DEFAULT_SYSTEM_PEAK_TARIFF_DATA
} from './constant';
import { calcLocalCircuits } from './local_circuits';
import { calcLocalSubstation } from './local_substation';
import {
  IAdjustmentTariffData,
  IExportChargesOfTNUoS,
  ILocalCircuits,
  ILocalSubstationTariff,
  INotSharedYearRoundTariffData,
  ISharedYearRoundTariffData,
  ISystemTariffData
} from './type';
import { calcWiderTariff } from './wider_tariff';

export function calcTNUoSCharges({
  systemPeakTariffData = DEFAULT_SYSTEM_PEAK_TARIFF_DATA,
  sharedYearRoundTariffData = DEFAULT_SHARED_YEAR_ROUND_TARIFF_DATA,
  notSharedYearRoundTariffData = DEFAULT_NOT_SHARED_YEAR_ROUND_TARIFF_DATA,
  ajdustmentTariffData = DEFAULT_ADJUSTMENT_TARIFF_Data,
  exportChargesOfTNUoS = DEFAULT_EXPORT_CHARGES_OF_TNUOS,
  localSubstationTariff = DEFAULT_LOCAL_SUBSTATION_TARIFF,
  localSubstationSwitch = 0,
  localCircuitsData = DEFAULT_LOCAL_CIRCUITS,
  initialCapacity = 1000,
  operationYears = 40,
  modelStartDate = '2023-01-01',
  operationStartDate = '2028-01-01',
  decommissioningEndDate = '2068-06-30'
}: {
  sharedYearRoundTariffData?: ISharedYearRoundTariffData[];
  systemPeakTariffData?: ISystemTariffData[];
  notSharedYearRoundTariffData?: INotSharedYearRoundTariffData[];
  ajdustmentTariffData?: IAdjustmentTariffData[];
  exportChargesOfTNUoS?: IExportChargesOfTNUoS;
  localSubstationTariff?: ILocalSubstationTariff[];
  localSubstationSwitch?: number;
  initialCapacity?: number;
  operationYears?: number;
  modelStartDate?: string;
  operationStartDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
  localCircuitsData?: ILocalCircuits[];
}) {
  const widerTariff = calcWiderTariff({
    exportChargesOfTNUoS,
    systemPeakTariffData,
    sharedYearRoundTariffData,
    notSharedYearRoundTariffData,
    ajdustmentTariffData,
    operationYears,
    modelStartDate,
    operationStartDate
  });
  const localSubstation = calcLocalSubstation({
    exportChargesOfTNUoS,
    localSubstationTariff,
    localSubstationSwitch,
    operationYears,
    modelStartDate,
    operationStartDate
  });
  const localCircuits = calcLocalCircuits({
    exportChargesOfTNUoS,
    localCircuitsData,
    operationYears,
    modelStartDate,
    operationStartDate
  });
  const period =
    getMonthsNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  return addZeros(
    roundArray(
      widerTariff.map(
        (d, index) =>
          (initialCapacity *
            1000 *
            (d + localCircuits[index] + localSubstation[index])) /
          1000
      ),
      3
    ),
    period
  );
}
