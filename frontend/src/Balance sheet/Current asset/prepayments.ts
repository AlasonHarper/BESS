import { calcPrepayments } from '../../Cash flow/Movement/movement_in_prepayments';
import { DEFAULT_LAND_RENT } from '../../calculates/Administrative costs/constant';
import { ILandRent } from '../../calculates/Administrative costs/type';
import { IInflationForm } from '../../calculates/Revenue/type';
import { DEFAULT_INFLATION_INPUTS } from '../../calculates/constant';
import { roundArray } from '../../calculates/utils';

export function calcPrepaymentsForBalanceSheet({
  landRent = DEFAULT_LAND_RENT,
  landSize = 75,
  initialCapacity = 1000,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  operationStartDate = '2028-01-01',
  modelStartDate = '2023-01-01',
  operationEndDate = '2067-12-31',
  developmentStartDate = '2023-07-01',

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
  developmentStartDate?: string;

  decommissioningEndDate?: string;
  constructionStartDate?: string;
}) {
  const prepayments = calcPrepayments({
    landRent,
    landSize,
    initialCapacity,
    inflationInputs,
    operationStartDate,
    modelStartDate,
    operationEndDate,
    developmentStartDate,

    decommissioningStartDate,
    decommissioningEndDate,
    constructionStartDate
  }).prepayments_for_balance_sheet;
  return roundArray(prepayments, 3);
}
