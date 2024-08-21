import {
  DEFAULT_LAND_RENT,
  DEFAULT_LAND_RENT_EXEPNESE
} from '../../calculates/Administrative costs/constant';
import { calcLandRentToPL } from '../../calculates/Administrative costs/land_rent';
import {
  ILandRent,
  ILandRentExpense
} from '../../calculates/Administrative costs/type';
import { IInflationForm } from '../../calculates/Revenue/type';
import { DEFAULT_INFLATION_INPUTS } from '../../calculates/constant';
import {
  getAsAPercentOfPeriod,
  getMonthsNumberFromModelStartDate,
  roundArray,
  sumArrays
} from '../../calculates/utils';

// Calcs 21 Prepayments
export function calcPrepayments({
  operationStartDate = '2028-01-01',
  modelStartDate = '2023-01-01',
  developmentStartDate = '2023-07-01',
  decommissioningStartDate = '2068-01-01',
  decommissioningEndDate = '2068-06-30',
  landRentExpense = DEFAULT_LAND_RENT_EXEPNESE
}: {
  landRent?: ILandRent;
  landSize?: number;
  initialCapacity?: number;
  inflationInputs?: IInflationForm[];
  operationStartDate?: string;
  modelStartDate?: string;
  operationEndDate?: string;
  decommissioningStartDate?: string;
  developmentStartDate?: string;
  decommissioningEndDate?: string;
  constructionStartDate?: string;
  landRentExpense?: ILandRentExpense;
}) {
  const period =
    getMonthsNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  const operatingFlag = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate
  );
  const developmentToDecommissioningFlag = getAsAPercentOfPeriod(
    modelStartDate,
    developmentStartDate,
    decommissioningEndDate,
    decommissioningEndDate
  );

  // 21.01 Profit and loss expense

  const capitalised_rent = landRentExpense.rentToFixedAssets;
  const expensed_rent = landRentExpense.rentToProfit;
  const total_rent = sumArrays(capitalised_rent, expensed_rent);

  // 21.02 Cash prepayment

  const rent_prepayment_flag = [];
  const rent_prepayment = [];

  for (let i = 0; i < period; i++) {
    if (i % 3 == 2) {
      rent_prepayment_flag[i] = 1;
    } else {
      rent_prepayment_flag[i] = 0;
    }
    if (i < period - 3)
      rent_prepayment[i] =
        -(total_rent[i + 1] + total_rent[i + 2] + total_rent[i + 3]) *
        rent_prepayment_flag[i];
    else if (i == period - 3)
      rent_prepayment[i] =
        -(total_rent[i + 1] + total_rent[i + 2]) * rent_prepayment_flag[i];
    else if (i == period - 2)
      rent_prepayment[i] = -total_rent[i + 1] * rent_prepayment_flag[i];
    else rent_prepayment[i] = 0;
  }

  // 21.03 Control account

  const prepayments_start_balance = [];
  prepayments_start_balance[0] = 0;
  const rent_expense = total_rent;
  const prepayments_end_balance = [];
  const movement_in_working_capital = [];

  for (let i = 0; i < period; i++) {
    prepayments_end_balance[i] =
      prepayments_start_balance[i] + rent_prepayment[i] + rent_expense[i];
    if (i < period - 1)
      prepayments_start_balance[i + 1] = prepayments_end_balance[i];
    movement_in_working_capital[i] =
      -developmentToDecommissioningFlag[i] *
      (prepayments_end_balance[i] - prepayments_start_balance[i]);
  }

  return {
    movement_in_working_capital: roundArray(movement_in_working_capital, 3),
    prepayments_for_balance_sheet: prepayments_end_balance
  };
}
