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
import { DEFAULT_CAPEX_UEL, DEFAULT_INFLATION_INPUTS } from '../constant';
import { DEFAULT_COST_OF_ADDITIONS } from './constant';
import { ICostOfAdditions } from './type';
import { addYears } from 'date-fns';
import { getAsAPercentOfPeriod, roundArray } from '../utils';
import { calcLandRentToPL } from '../Administrative costs/land_rent';
import { DEFAULT_LAND_RENT } from '../Administrative costs/constant';
import { ILandRent } from '../Administrative costs/type';

export function calcCapitalizedRentInConstruction({
  capexUEL = DEFAULT_CAPEX_UEL,
  operationStartDate = '2028-01-01',
  modelStartDate = '2023-01-01',
  landRent = DEFAULT_LAND_RENT,
  landSize = 75,
  initialCapacity = 1000,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  operationEndDate = '2067-12-31',
  decommissioningStartDate = '2068-01-01',
  decommissioningEndDate = '2068-06-30',
  constructionStartDate = '2027-01-01'
}: {
  capexUEL?: ICapexUELForm[];
  landRent?: ILandRent;
  landSize?: number;
  initialCapacity?: number;
  inflationInputs?: IInflationForm[];
  operationStartDate?: string;
  modelStartDate?: string;
  operationEndDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
  constructionStartDate?: string;
}) {
  const capitalizedRent = calcLandRentToPL({
    landRent,
    landSize,
    initialCapacity,
    inflationInputs,
    operationStartDate,
    modelStartDate,
    operationEndDate,
    decommissioningStartDate,
    decommissioningEndDate,
    constructionStartDate
  }).rentToFixedAssets;
  let totalRentToFixed = 0;
  const len = capitalizedRent.length;
  for (let i = 0; i < len; i++) {
    totalRentToFixed = totalRentToFixed + capitalizedRent[i];
  }
  const monthlyDepreciationForCapitalizedRent =
    totalRentToFixed /
    (12 *
      (capexUEL.find(
        (d) => d?.capexObject == 'Capitalised rent in construction'
      )?.usefulEconomicLife || 0));
  const depreciationEndDate = addYears(
    operationStartDate,
    capexUEL.find((d) => d?.capexObject == 'Capitalised rent in construction')
      ?.usefulEconomicLife || 40
  );

  const capitalisedRentAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    depreciationEndDate,
    decommissioningEndDate
  );
  const depreciationValue = capitalisedRentAsAPercentOfPeriod.map(
    (d) => d * monthlyDepreciationForCapitalizedRent
  );

  return roundArray(depreciationValue, 3);
}
