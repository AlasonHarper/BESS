import { calcNationalGridSecurities } from '../../Cash flow/Movement/movement_in_escrow_account';
import {
  DEFAULT_NATIONAL_GRID_SECURITIES,
  DEFAULT_VARIABLE_PROFILE_FOR_ATTRIBUTABLE_COSTS
} from '../../Cash flow/constant';
import {
  INationalGridSecurities,
  IVariableProfileForAttributableCosts
} from '../../Cash flow/type';
import { roundArray } from '../../calculates/utils';

export function escrowAccountForBalanceSheet({
  national_grid_securities = DEFAULT_NATIONAL_GRID_SECURITIES,
  // variable_profile_for_attributable_costs comes from Timing 15 National grid securities
  // ~~~ 15.01 Variable profile for attributable costs
  variable_profile_for_attributable_costs = DEFAULT_VARIABLE_PROFILE_FOR_ATTRIBUTABLE_COSTS,
  modelStartDate = '2023-01-01',
  fullyConsentedDate = '2024-11-01',
  developmentStartDate = '2023-07-01',
  operationStartDate = '2028-01-01',
  decommissioningStartDate = '2068-01-01',
  decommissioningEndDate = '2068-06-30'
}: {
  national_grid_securities?: INationalGridSecurities;
  variable_profile_for_attributable_costs?: IVariableProfileForAttributableCosts;
  modelStartDate?: string;
  fullyConsentedDate?: string;
  developmentStartDate?: string;
  operationStartDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
}) {
  const escrow_account = calcNationalGridSecurities({
    national_grid_securities,

    variable_profile_for_attributable_costs,
    modelStartDate,
    fullyConsentedDate,
    developmentStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate
  }).national_grid_securities_for_balance_sheet;
  return roundArray(escrow_account, 2);
}
