import { INFLATION_START_YEAR, MODEL_START_YEAR } from '../../utils/constant';
import { IInflationForm } from '../Revenue/type';
import { DEFAULT_INFLATION_INPUTS } from '../constant';
import {
  annualIndexToMonths,
  getAsAPercentOfPeriod,
  inflationIndex,
  normalizeArray,
  roundArray
} from '../utils';
import { DEFAULT_LAND_RENT } from './constant';
import { ILandRent } from './type';

export function calcLandRentToPL({
  landRent = DEFAULT_LAND_RENT,
  landSize = 75,
  initialCapacity = 1000,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  operationStartDate = '2028-01-01',
  modelStartDate = '2023-01-01',
  operationEndDate = '2067-12-31',
  decommissioningStartDate = '2068-01-01',
  decommissioningEndDate = '2068-06-30',
  constructionStartDate = '2027-01-01'
}: {
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
  const landRentInflationIndex = annualIndexToMonths(
    roundArray(
      inflationIndex({
        inflationInputs,
        baseYear: landRent.inflation.baseYear,
        profile: landRent.inflation.profile
      }),
      3
    ).slice(MODEL_START_YEAR - INFLATION_START_YEAR)
  );

  const monthlyLandRentAcrePortion =
    (landRent.switch *
      landRent.annualLandRent.annualLandRentPerAcreCharge *
      landSize) /
    -12;
  const constructionAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    constructionStartDate,
    operationStartDate,
    decommissioningEndDate
  );

  const operationsAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    operationEndDate,
    decommissioningEndDate
  );

  const decommissioningAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    decommissioningEndDate
  );

  // postConstructionForecastCost is included as an administrative expense to Profit and loss account.
  const postConstructionForecastCost = operationsAsAPercentOfPeriod.map(
    (d, index) =>
      ((d * landRent.annualLandRent.portionPayableDuringOperations +
        decommissioningAsAPercentOfPeriod[index] *
          landRent.annualLandRent.portionPayableDuringDecommissioning) /
        100) *
      monthlyLandRentAcrePortion *
      landRentInflationIndex[index]
  );
  let landRentSensitivity = 0;
  if (landRent.sensitivity == 1) {
    landRentSensitivity = landRent.sensitivity_magnitude / 100;
  } else landRentSensitivity = 0;
  // bespokeMonthlyChargePerMWForecast is included as an administrative expense to Profit and loss account.
  const bespokeMonthlyChargePerMWForecast = operationsAsAPercentOfPeriod.map(
    (d, index) =>
      (((((d * landRent.annualLandRent.portionPayableDuringOperations +
        decommissioningAsAPercentOfPeriod[index] *
          landRent.annualLandRent.portionPayableDuringDecommissioning +
        landRent.annualLandRent.portionPayableDuringConstruction *
          constructionAsAPercentOfPeriod[index]) *
        initialCapacity *
        landRent.switch *
        landRent.bespokeCasesCapacityCharge.annualLandRentPerMWCharge) /
        12) *
        (1 + landRentSensitivity)) /
        100) *
      landRentInflationIndex[index]
  );
  // bespokeMonthlyChargePerAcreForecast is included as an administrative expense to Profit and loss account.

  const bespokeMonthlyChargePerAcreForecast = normalizeArray(
    landRentInflationIndex.map(
      (d, index) =>
        (d *
          landRent.switch *
          landRent.bespokeCasesLandRentPerAcreAndOptionCharge
            .annualLandPostOptionRentPerAcreCharge *
          landSize) /
        12
    ),
    bespokeMonthlyChargePerMWForecast.length
  );

  const forecastLandRentToPL = postConstructionForecastCost.map(
    (d, index) =>
      d +
      bespokeMonthlyChargePerMWForecast[index] +
      bespokeMonthlyChargePerAcreForecast[index]
  );

  // constructionForecastCost is included as a capitalized rent to fixed assets.
  const constructionForecastCost = constructionAsAPercentOfPeriod.map(
    (d, index) =>
      ((d * landRent.annualLandRent.portionPayableDuringConstruction) / 100) *
      monthlyLandRentAcrePortion *
      landRentInflationIndex[index] *
      constructionAsAPercentOfPeriod[index]
  );

  //bespokeOptionChargePerAcreForecast

  const bespokeOptionChargePerAcreForecast = getAsAPercentOfPeriod(
    modelStartDate,
    landRent.bespokeCasesLandRentPerAcreAndOptionCharge.optionRentStartDate,
    landRent.bespokeCasesLandRentPerAcreAndOptionCharge.optionRentEndDate,
    decommissioningEndDate
  ).map(
    (d, index) =>
      ((d *
        landRent.switch *
        landSize *
        landRent.bespokeCasesLandRentPerAcreAndOptionCharge
          .annualLandPostOptionRentPerAcreCharge) /
        12) *
      landRentInflationIndex[index]
  );

  const capitalizedRentToFixedAssets = constructionForecastCost.map(
    (d, index) => d + bespokeOptionChargePerAcreForecast[index]
  );

  // real return:  return forecastLandRentToPL;

  return {
    rentToProfit: roundArray(forecastLandRentToPL, 2),
    rentToFixedAssets: capitalizedRentToFixedAssets
  };
}
