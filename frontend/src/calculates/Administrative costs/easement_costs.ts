// Calcs 17.11 Easement costs

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
import { DEFAULT_EASEMENT_COSTS } from './constant';
import { IEasementCosts } from './type';

export function calcEasementCosts({
  easement_costs = DEFAULT_EASEMENT_COSTS,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  modelStartDate = '2023-01-01',
  operationStartDate = '2028-01-01',
  decommissioningStartDate = '2068-01-01',
  decommissioningEndDate = '2068-06-30',
  battery_duration = 4,
  opexSensitivity = 0
}: {
  easement_costs?: IEasementCosts;
  inflationInputs?: IInflationForm[];
  modelStartDate?: string;
  initialCapacity?: number;
  operationStartDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
  opexSensitivity?: number;
  battery_duration?: number;
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
      easement_costs.annual_cost *
      easement_costs.cable_length *
      (1 + opexSensitivity)
    ) / 12;

  // Indexation on annual timeline
  let forecast_cost = [];
  if (easement_costs.inflation_profile_easement_costs == '') {
    forecast_cost = multiplyNumber(operations_as_a_percent_of_period, 0);
  } else {
    const indexation = normalizeArray(
      annualIndexToMonths(
        inflationIndex({
          inflationInputs,
          baseYear: easement_costs.inflation_profile_base_year,
          profile: easement_costs.inflation_profile_easement_costs
        })
      ),
      period
    );
    if (easement_costs.annual_cost != 0 && easement_costs.cable_length != 0)
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
