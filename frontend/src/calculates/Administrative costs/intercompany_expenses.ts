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
import { DEFAULT_INTERCOMPANY_EXPENSES } from './constant';
import { IIntercompanyExpenses } from './type';

// Calcs 17.14 Intercompany expense
export function calcIntercompanyExpense({
  intercompany_expense = DEFAULT_INTERCOMPANY_EXPENSES,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  modelStartDate = '2023-01-01',
  operationStartDate = '2028-01-01',
  decommissioningStartDate = '2068-01-01',
  decommissioningEndDate = '2068-06-30',
  opexSensitivity = 0
}: {
  intercompany_expense?: IIntercompanyExpenses;
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
    (-intercompany_expense.annual_cost * (1 + opexSensitivity)) / 12;

  // Indexation on annual timeline
  let forecast_cost = [];
  if (intercompany_expense.inflation_profile_intercompany_expense == '') {
    forecast_cost = multiplyNumber(operations_as_a_percent_of_period, 0);
  } else {
    const indexation = normalizeArray(
      annualIndexToMonths(
        inflationIndex({
          inflationInputs,
          baseYear: intercompany_expense.inflation_profile_base_year,
          profile: intercompany_expense.inflation_profile_intercompany_expense
        })
      ),
      period
    );
    forecast_cost = multiplyArrays([
      multiplyNumber(indexation, monthly_cost),
      operations_as_a_percent_of_period
    ]);
  }

  return forecast_cost;
}
