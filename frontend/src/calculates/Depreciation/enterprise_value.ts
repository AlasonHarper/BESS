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

export function calcEnterpriseValue({
  capexUEL = DEFAULT_CAPEX_UEL,
  // costOfAdditions comes from fixed~~ 7 Capex~~~7.03~7.10
  costOfAdditions = DEFAULT_COST_OF_ADDITIONS,
  batteryDuration = 4,
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
  // depreciationOfEnterpriseValue = monthlyDepreciationForEnterpriseValue*enterPriseValueAsAPercentOfPeriod

  const depreciationEndDate = addYears(
    operationStartDate,
    capexUEL.find((d) => d?.capexObject == 'Enterprise value - Development fee')
      ?.usefulEconomicLife || 0
  );
  const enterPriseValueAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    depreciationEndDate,
    decommissioningEndDate
  );
  const totalEnterpriseValue =
    initialCapacity * costOfAdditions.enterPriseValue * (1 + capexSensitivity);

  const monthlyDepreciationForEnterpriseValue =
    -totalEnterpriseValue /
    (12 *
      (capexUEL.find(
        (d) => d.capexObject == 'Enterprise value - Development fee'
      )?.usefulEconomicLife || 0));
  const depreciationOfEnterpriseValue = enterPriseValueAsAPercentOfPeriod.map(
    (d) => d * monthlyDepreciationForEnterpriseValue
  );
  return roundArray(depreciationOfEnterpriseValue, 3);
}
