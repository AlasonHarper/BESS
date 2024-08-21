import {
  annualIndexToMonths,
  getOperationsAsAPercentOfPeriod,
  roundArray
} from '../utils';
import {
  DEFAULT_EXPORT_CHARGES_OF_TNUOS,
  DEFAULT_LOCAL_CIRCUITS
} from './constant';
import { IExportChargesOfTNUoS, ILocalCircuits } from './type';

export function calcLocalCircuits({
  exportChargesOfTNUoS = DEFAULT_EXPORT_CHARGES_OF_TNUOS,
  localCircuitsData = DEFAULT_LOCAL_CIRCUITS,
  operationYears = 40,
  modelStartDate = '2023-01-01',
  operationStartDate = '2028-01-01'
}: {
  exportChargesOfTNUoS?: IExportChargesOfTNUoS;
  localCircuitsData?: ILocalCircuits[];
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

  const tempLocalCircuitsValue =
    localCircuitsData?.find((d) => d.zone == exportChargesOfTNUoS.localCircuits)
      ?.value || [];
  const tempLocalCircuitsLength = tempLocalCircuitsValue.length;
  const localCircuits: number[] = [];
  for (let i = 0; i < tempLocalCircuitsLength - 1; i++) {
    localCircuits[i] =
      (tempLocalCircuitsValue[i] * 3) / 12 +
      (tempLocalCircuitsValue[i + 1] * 9) / 12;
  }

  const forecastLocalCircuits = roundArray(
    operationsAsAPercentOfPeriod.map(
      (d, index) => (d * annualIndexToMonths(localCircuits)[index]) / -12
    ),
    3
  );
  return forecastLocalCircuits;
}
