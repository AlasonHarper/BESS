import { ISharedYearRoundTariffData } from '../CoGS/type';
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
  IStartingBatteryAssumptions
} from '../Revenue/type';
import { DEFAULT_CAPEX_UEL } from '../constant';
import { DEFAULT_COST_OF_ADDITIONS } from './constant';
import { ICostOfAdditions } from './type';
import { addYears } from 'date-fns';
import { getAsAPercentOfPeriod, roundArray } from '../utils';

export function calcPoolingSubstation({
  capexUEL = DEFAULT_CAPEX_UEL,
  // costOfAdditions comes from fixed~~ 7 Capex~~~7.03~7.10
  costOfAdditions = DEFAULT_COST_OF_ADDITIONS,
  initialCapacity = 1000,
  capexSensitivity = 0,
  operationStartDate = '2028-01-01',
  modelStartDate = '2023-01-01',
  decommissioningEndDate = '2068-06-30'
}: {
  capexUEL?: ICapexUELForm[];
  // costOfAdditions comes from fixed~~ 7 Capex~~~7.03~7.10
  costOfAdditions?: ICostOfAdditions;
  batteryDuration?: number;
  capexSensitivity?: number;
  operationStartDate?: string;
  modelStartDate?: string;
  initialCapacity?: number;
  decommissioningEndDate?: string;
}) {
  // depreciationOfPoolingSubstation = monthlyDepreciationForPoolingSubstation*poolingSubstationAsAPercentOfPeriod

  const depreciationEndDate = addYears(
    operationStartDate,
    capexUEL.find((d) => d?.capexObject == 'Pooling substation')
      ?.usefulEconomicLife || 0
  );
  const poolingSubstationAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    depreciationEndDate,
    decommissioningEndDate
  );
  const totalPoolingSubstation =
    initialCapacity *
    costOfAdditions.poolingSubstation *
    (1 + capexSensitivity);
  const monthlyDepreciationForPoolingSubstation =
    -totalPoolingSubstation /
    (12 *
      (capexUEL.find(
        (d) => d?.capexObject == 'Capitalised rent in construction'
      )?.usefulEconomicLife || 0));
  const depreciationOfPoolingSubstation =
    poolingSubstationAsAPercentOfPeriod.map(
      (d) => d * monthlyDepreciationForPoolingSubstation
    );
  return roundArray(depreciationOfPoolingSubstation, 3);
}
