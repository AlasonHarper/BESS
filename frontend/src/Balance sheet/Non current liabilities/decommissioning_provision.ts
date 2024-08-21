import { calcDecommissiongCosts } from '../../calculates/Administrative costs/decommissioning_cost';
import { DEFAULT_COST_OF_ADDITIONS } from '../../calculates/Depreciation/constant';
import { ICostOfAdditions } from '../../calculates/Depreciation/type';
import { roundArray } from '../../calculates/utils';

export function decommissionigProvisionForBalanceSheet({
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
  const decommissioing_provision = calcDecommissiongCosts({
    costOfAdditions,
    length_of_construction,
    modelStartDate,
    developmentStartDate,
    constructionStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    length_of_decommissioning
  }).decommissioning_provision_for_balance_sheet;
  return roundArray(decommissioing_provision, 3);
}
