// Calcs 17.07 Water rates

import { string } from 'prop-types';
import { IInflationForm } from '../Revenue/type';
import { DEFAULT_INFLATION_INPUTS } from '../constant';
import {
  annualIndexToMonths,
  getAsAPercentOfPeriod,
  getMonthsNumberFromModelStartDate,
  inflationIndex,
  multiplyArrays,
  multiplyNumber,
  normalizeArray
} from '../utils';
import { DEFAULT_WATER_RATES } from './constant';
import { IWaterRates } from './type';

export function calcWaterRates({
  water_rates = DEFAULT_WATER_RATES,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  modelStartDate = '2023-01-01',
  initialCapacity = 1000,
  operationStartDate = '2028-01-01',
  decommissioningStartDate = '2068-01-01',
  decommissioningEndDate = '2068-06-30',
  opexSensitivity = 0
}: {
  water_rates?: IWaterRates;
  inflationInputs?: IInflationForm[];
  modelStartDate?: string;
  initialCapacity?: number;
  operationStartDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
  opexSensitivity?: number;
}) {
  const period =
    getMonthsNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  const operations_as_a_percent_of_period = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate
  );

  // Monthly cost

  const monthly_cost =
    -(
      water_rates?.annual_fees_per_mw ||
      0 * initialCapacity * (1 + opexSensitivity)
    ) / 12;

  // Indexation on annual timeline
  let forecast_cost = [];
  if (water_rates.inflation_profile_water_rates == '') {
    forecast_cost = multiplyNumber(operations_as_a_percent_of_period, 0);
  } else {
    const indexation = normalizeArray(
      annualIndexToMonths(
        inflationIndex({
          inflationInputs,
          baseYear: water_rates?.inflation_profile_base_year || 2023,
          profile: water_rates?.inflation_profile_water_rates
        })
      ),
      period
    );
    if (water_rates.annual_fees_per_mw != 0)
      forecast_cost = multiplyArrays([
        multiplyNumber(indexation, monthly_cost),
        operations_as_a_percent_of_period
      ]);
    else
      forecast_cost = multiplyArrays([
        multiplyNumber(indexation, 0),
        operations_as_a_percent_of_period
      ]);
  }

  return forecast_cost;
}
