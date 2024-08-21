import { DEFAULT_COST_OF_ADDITIONS } from '../Depreciation/constant';
import { ICostOfAdditions } from '../Depreciation/type';
import {
  getAsAPercentOfPeriod,
  getMonthsNumberFromModelStartDate,
  multiplyNumber,
  roundArray
} from '../utils';

export function calcDecommissiongCosts({
  costOfAdditions = DEFAULT_COST_OF_ADDITIONS,
  length_of_construction = 12,
  modelStartDate = '2023-01-01',
  developmentStartDate = '2023-07-01',
  constructionStartDate = '2027-01-01',
  operationStartDate = '2028-01-01',
  decommissioningStartDate = '2068-01-01',
  decommissioningEndDate = '2068-06-30',
  length_of_decommissioning = 6
}: {
  costOfAdditions?: ICostOfAdditions;
  length_of_construction?: number;
  modelStartDate?: string;
  developmentStartDate?: string;
  constructionStartDate?: string;
  operationStartDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
  length_of_decommissioning?: number;
}) {
  const period =
    getMonthsNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  const developmentToDecommissioningFlag = getAsAPercentOfPeriod(
    modelStartDate,
    developmentStartDate,
    decommissioningEndDate,
    decommissioningEndDate
  );
  const decommissioning_as_a_percent_of_period = getAsAPercentOfPeriod(
    modelStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    decommissioningEndDate
  );
  // 28.01 Decommissioning costs

  const construction_as_a_percent_of_period = getAsAPercentOfPeriod(
    modelStartDate,
    constructionStartDate,
    operationStartDate,
    decommissioningEndDate
  );
  const total_cost = costOfAdditions.enterPriseValue;

  const monthly_cost = -total_cost / length_of_construction;

  const decommissioning_cost = multiplyNumber(
    construction_as_a_percent_of_period,
    monthly_cost
  );
  // 28.02 Decommissioning cash

  const release_per_month = total_cost / length_of_decommissioning;
  const cash_payment = multiplyNumber(
    decommissioning_as_a_percent_of_period,
    -release_per_month
  );
  // 28.02 Control account

  const decommissioning_provision_start_balance = [];
  decommissioning_provision_start_balance[0] = 0;
  const accrual = decommissioning_cost;
  const release = multiplyNumber(cash_payment, -1);
  const decommissioning_provision_end_balance = [];
  const movement_in_working_capital = [];
  for (let i = 0; i < period; i++) {
    decommissioning_provision_end_balance[i] =
      decommissioning_provision_start_balance[i] + accrual[i] + release[i];
    movement_in_working_capital[i] = -(
      decommissioning_provision_end_balance[i] -
      decommissioning_provision_start_balance[i]
    );
    if (i < period - 1)
      decommissioning_provision_start_balance[i + 1] =
        decommissioning_provision_end_balance[i] *
        developmentToDecommissioningFlag[i + 1];
  }

  return {
    decommissioning_cost: decommissioning_cost,
    movement_in_working_capital: roundArray(movement_in_working_capital, 1),
    decommissioning_provision_for_balance_sheet:
      decommissioning_provision_end_balance
  };
}
