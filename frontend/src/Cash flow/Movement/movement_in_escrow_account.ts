import {
  getAsAPercentOfPeriod,
  getMonthsNumberFromModelStartDate,
  multiplyArrays,
  multiplyNumber,
  roundArray,
  sumArrays
} from '../../calculates/utils';
import {
  DEFAULT_NATIONAL_GRID_SECURITIES,
  DEFAULT_VARIABLE_PROFILE_FOR_ATTRIBUTABLE_COSTS
} from '../constant';
import {
  INationalGridSecurities,
  IVariableProfileForAttributableCosts
} from '../type';

// Calcs 29 National grid securities
export function calcNationalGridSecurities({
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

  const grid_connection_date_month_number = getMonthsNumberFromModelStartDate(
    modelStartDate,
    operationStartDate
  );

  // 29.01 Security flag

  const repayment_of_securities_1_month_after_grid_connection_date =
    grid_connection_date_month_number + 1;

  const one_year_pre_grid_connection_date =
    repayment_of_securities_1_month_after_grid_connection_date - 12;
  const two_years_pre_grid_connection_date =
    one_year_pre_grid_connection_date - 12;
  const three_years_pre_grid_connection_date =
    two_years_pre_grid_connection_date - 12;
  const four_years_pre_grid_connection_date =
    three_years_pre_grid_connection_date - 12;
  const securities_flag = [];

  for (let i = 0; i < period; i++) {
    if (
      i == one_year_pre_grid_connection_date - 1 ||
      i == two_years_pre_grid_connection_date - 1 ||
      i == three_years_pre_grid_connection_date - 1 ||
      i == four_years_pre_grid_connection_date - 1
    ) {
      securities_flag[i] = 1;
    } else securities_flag[i] = 0;
  }

  // 29.02 Securities needed for fixed attributable
  // liability ~~~ Vairable approach
  const variable_upsall_central =
    variable_profile_for_attributable_costs.variable_upsall_central;
  const temp: number[] = [];

  variable_upsall_central.map((d, index, arr) => {
    if (index == 0) {
      temp[index] = d;
    } else temp[index] = d - arr[index - 1];
  });
  const incremental_movement = temp;
  const variable_forecast = [];

  for (let i = 0; i < period; i++) {
    if (
      i < grid_connection_date_month_number &&
      i >= grid_connection_date_month_number - 4 * 12 &&
      i % 6 == 1
    ) {
      variable_forecast[i] = incremental_movement[0];
    } else variable_forecast[i] = 0;
  }
  // 29.02 Securities needed for fixed attributable
  // liability ~~~ Fixed approach

  const payment_per_milestone = 25;
  const attributable_costs = national_grid_securities.total_attributable_costs;
  const increase_in_secuirty_per_year =
    (attributable_costs * payment_per_milestone) / 100;
  const fixed_forecast = multiplyNumber(
    securities_flag,
    increase_in_secuirty_per_year
  );

  // 29.02 Securities needed for fixed attributable
  // liability ~~~ Live forecast
  const fixed_option = 'Fixed profile';
  const attributable_security_choice =
    national_grid_securities.attributable_security_choice;
  let forecast = [];

  if (attributable_security_choice == fixed_option) {
    forecast = fixed_forecast;
  } else forecast = variable_forecast;
  // 29.03 Securities needed for wider cancellation

  const annual_wider_cancellation_costs =
    national_grid_securities.annual_wider_cancellation_costs;
  const forecast_wider_cancellation = multiplyNumber(
    securities_flag,
    annual_wider_cancellation_costs
  );

  // 29.04 Total securities
  const security_as_a_percent_of_liability_pre_consents = 42;
  const security_as_a_percent_of_liability_post_consents = 10;
  const fully_consented = fullyConsentedDate;

  const fully_consented_date_month_number =
    getMonthsNumberFromModelStartDate(modelStartDate, fully_consented) - 1;
  const security_as_a_percent_of_liability = [];
  for (let i = 0; i < period; i++) {
    if (i < fully_consented_date_month_number)
      security_as_a_percent_of_liability[i] =
        security_as_a_percent_of_liability_pre_consents / 100;
    else
      security_as_a_percent_of_liability[i] =
        security_as_a_percent_of_liability_post_consents / 100;
  }

  const total = multiplyArrays([
    sumArrays(forecast_wider_cancellation, forecast),
    security_as_a_percent_of_liability
  ]);
  // 29.05 Release of security

  const reduction_of_liability_post_consent = [];
  reduction_of_liability_post_consent[0] = 0;
  const release_of_security_post_commissioning = [];
  const release_of_security = [];

  // 29.06 Fees to CF and P&L
  // ~~~ Premium fee as a % of total security

  const security_choice = national_grid_securities.security_choice;
  const premium_fee = national_grid_securities.premium_fee;
  const monthly_premium_fee = premium_fee / 12;
  const securities_premium_fee = [];

  // 29.07 Control account for premium

  const national_grid_securities_start_balance = [];
  national_grid_securities_start_balance[0] = 0;
  const additions = total;
  const release = [];
  const national_grid_securities_end_balance: number[] = [];
  let cumulative_securities_profile = [];

  const max_securities =
    attributable_costs + annual_wider_cancellation_costs * 4;

  for (let i = 0; i < period; i++) {
    if (i != repayment_of_securities_1_month_after_grid_connection_date - 1)
      release_of_security_post_commissioning[i] = 0;
    else
      release_of_security_post_commissioning[i] = -(
        national_grid_securities_start_balance[i] + additions[i]
      );

    release_of_security[i] =
      reduction_of_liability_post_consent[i] +
      release_of_security_post_commissioning[i];

    release[i] = release_of_security[i];

    national_grid_securities_end_balance[i] =
      national_grid_securities_start_balance[i] + additions[i] + release[i];

    securities_premium_fee[i] =
      (-(national_grid_securities_start_balance[i] + additions[i]) *
        monthly_premium_fee) /
      100;
    if (i < period - 1) {
      reduction_of_liability_post_consent[i + 1] =
        (national_grid_securities_end_balance[i] /
          security_as_a_percent_of_liability[i]) *
          security_as_a_percent_of_liability[i + 1] -
        national_grid_securities_end_balance[i];

      national_grid_securities_start_balance[i + 1] =
        national_grid_securities_end_balance[i] *
        developmentToDecommissioningFlag[i + 1];
    }
  }
  if (max_securities == 0)
    cumulative_securities_profile = multiplyNumber(
      national_grid_securities_end_balance,
      0
    );
  else
    cumulative_securities_profile = multiplyNumber(
      national_grid_securities_end_balance,
      1 / max_securities
    );

  // 29.08 For financial statements

  const escrow_account_option = 'Escrow account';
  let national_grid_securities_for_balance_sheet = [];
  let national_grid_securities_for_cash_flow = [];

  if (security_choice == escrow_account_option) {
    national_grid_securities_for_balance_sheet =
      national_grid_securities_end_balance;
    national_grid_securities_for_cash_flow =
      national_grid_securities_start_balance.map(
        (d, index) =>
          -(national_grid_securities_end_balance[index] - d) *
          developmentToDecommissioningFlag[index]
      );
  } else {
    national_grid_securities_for_balance_sheet = multiplyNumber(
      national_grid_securities_end_balance,
      0
    );
    national_grid_securities_for_cash_flow = multiplyNumber(
      national_grid_securities_start_balance,
      0
    );
  }
  return {
    national_grid_securities_for_cash_flow: roundArray(
      national_grid_securities_for_cash_flow,
      3
    ),
    national_grid_securities_for_balance_sheet:
      national_grid_securities_for_balance_sheet,
    securities_premium_fee: securities_premium_fee
  };
}
