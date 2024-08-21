import { getOperationsAsAPercentOfPeriod } from '../utils';
import {
  DEFAULT_EXPORT_CHARGES_OF_TNUOS,
  DEFAULT_LOCAL_SUBSTATION_TARIFF
} from './constant';
import { IExportChargesOfTNUoS, ILocalSubstationTariff } from './type';

export function calcLocalSubstation({
  exportChargesOfTNUoS = DEFAULT_EXPORT_CHARGES_OF_TNUOS,
  localSubstationTariff = DEFAULT_LOCAL_SUBSTATION_TARIFF,
  localSubstationSwitch = 0,
  operationYears = 40,
  modelStartDate = '2023-01-01',
  operationStartDate = '2028-01-01'
}: {
  exportChargesOfTNUoS?: IExportChargesOfTNUoS;
  localSubstationTariff?: ILocalSubstationTariff[];
  localSubstationSwitch?: number;
  operationYears?: number;
  modelStartDate?: string;
  operationStartDate?: string;
  decommissioningStartDate?: string;
}) {
  const operationsAsAPercentOfPeriod = getOperationsAsAPercentOfPeriod({
    modelStartDate,
    operationStartDate,
    operationYears
  });
  const localSubstationTariffValue =
    localSubstationTariff
      ?.find((d) => d.voltage == exportChargesOfTNUoS?.gridConnectionVoltage)
      ?.data?.find((d) => d.type == exportChargesOfTNUoS?.localSubstationType)
      ?.value || 0;

  const forecastLocalSubstation = operationsAsAPercentOfPeriod?.map(
    (d) => (d * localSubstationTariffValue * localSubstationSwitch) / 12
  );

  return forecastLocalSubstation;
}
