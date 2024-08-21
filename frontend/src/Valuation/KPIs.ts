import {
  calcIRR,
  calcPeriod,
  getMonthsNumberFromModelStartDate,
  npv,
  paybackPeriod
} from '../calculates/utils';
import {
  DEFAULT_DEVELOPMENT_FEE_PAYMENT_DATES,
  DEFAULT_DEVELOPMENT_FEE_PAYMENT_PROFILE
} from '../Balance sheet/constant';
import {
  IDevFeePaymentDates,
  IDevFeePaymentProfile
} from '../Balance sheet/type';
import { calcOperatingCashFlow } from '../Cash flow/Movement/operating_cashflow';
import { calcCapexProvision } from '../Cash flow/capex_provision';
import { calcCapitalExpenditure } from '../Cash flow/capital_expenditure';
import {
  DEFAULT_CAPEX_PROVISION,
  DEFAULT_CAPITAL_EXPENDITURE,
  DEFAULT_CASH_REQUIREMENTS,
  DEFAULT_CORPORATION_TAX_VALUE,
  DEFAULT_DIVIDENDS,
  DEFAULT_EQUITY,
  DEFAULT_GEARING_BY_TAXES,
  DEFAULT_NATIONAL_GRID_SECURITIES,
  DEFAULT_OPERATING_CASH_FLOW_VALUE,
  DEFAULT_SENIOR_DEBT,
  DEFAULT_VARIABLE_PROFILE_FOR_ATTRIBUTABLE_COSTS,
  DEFAULT_VAT,
  DEFAULT_WORKING_CAPITAL
} from '../Cash flow/constant';
import {
  ICapexProvision,
  ICapitalExpenditure,
  ICashRequirements,
  ICorporationTaxValue,
  IDividends,
  IEquity,
  IGearingByTaxes,
  INationalGridSecurities,
  ISeniorDebt,
  IVariableProfileForAttributableCosts,
  IWrokingCapital,
  Ivat
} from '../Cash flow/type';
import {
  DEFAULT_ASSET_MANAGEMENT,
  DEFAULT_BUSINESS_RATES,
  DEFAULT_COMMUNITY_BENEFIT,
  DEFAULT_EXTENDED_WARRANTY,
  DEFAULT_INSURANCE,
  DEFAULT_LAND_RENT,
  DEFAULT_LEGAL_COST,
  DEFAULT_OTHER_ADMIN_COSTs,
  DEFAULT_O_AND_M,
  DEFAULT_SITE_SECURITY
} from '../calculates/Administrative costs/constant';
import {
  IAssetManagement,
  IBusinessRates,
  ICommunityBenefit,
  IExtendedWarranty,
  ILandRent,
  ILegalCost,
  IOAndM,
  IOtherAdminCosts,
  ISiteSecurity
} from '../calculates/Administrative costs/type';
import { DEFAULT_CORPORATION_TAX } from '../calculates/Cash flow/constant';
import { calcCorporationTax } from '../calculates/Cash flow/corporation_tax';
import { ICorporationTax } from '../calculates/Cash flow/type';
import {
  DEFAULT_ADJUSTMENT_TARIFF_Data,
  DEFAULT_AUXILLIARY,
  DEFAULT_AVERAGE_WHOLESALE_DAY_AHEAD_PRICE,
  DEFAULT_EXPORT_CHARGES_OF_TNUOS,
  DEFAULT_LOCAL_CIRCUITS,
  DEFAULT_LOCAL_SUBSTATION_TARIFF,
  DEFAULT_METERING,
  DEFAULT_NOT_SHARED_YEAR_ROUND_TARIFF_DATA,
  DEFAULT_SHARED_YEAR_ROUND_TARIFF_DATA,
  DEFAULT_SYSTEM_PEAK_TARIFF_DATA
} from '../calculates/CoGS/constant';
import {
  IAdjustmentTariffData,
  IAuxilliaryLosses,
  IExportChargesOfTNUoS,
  IInsurance,
  ILocalCircuits,
  ILocalSubstationTariff,
  IMetering,
  INotSharedYearRoundTariffData,
  IOptimiser,
  ISensitivity,
  ISharedYearRoundTariffData,
  ISystemTariffData
} from '../calculates/CoGS/type';
import { DEFAULT_COST_OF_ADDITIONS } from '../calculates/Depreciation/constant';
import { ICostOfAdditions } from '../calculates/Depreciation/type';
import { calcGainOnDisposal } from '../calculates/Revenue/gain_on_disposal_of_batteries';
import {
  IAssumptionData,
  IBatteryAugmentation,
  IBatteryCubes,
  IBatteryDisposal,
  IBatteryEfficiency,
  IBatteryExcubes,
  IBessCapexForecast,
  ICapexPaymentForm,
  ICapexPaymentMilestoneForm,
  ICapexUELForm,
  ICycleData,
  IDetailedRevenueData,
  IGainOnDisposal,
  IInflationForm,
  IMCapexProvision,
  IRevenueSetup,
  IStartingBatteryAssumptions,
  IVintage
} from '../calculates/Revenue/type';
import {
  DEFAULT_BATTERY_AUGMENTATION,
  DEFAULT_BATTERY_CUBES,
  DEFAULT_BATTERY_DISPOSAL,
  DEFAULT_BATTERY_EFFICIENCY,
  DEFAULT_BATTERY_EXCUBES,
  DEFAULT_BESS_CAPEX_FORECAST,
  DEFAULT_CAPEX_PAYMENTS_PROFILE,
  DEFAULT_CAPEX_PAYMENT_MILESTONES,
  DEFAULT_CAPEX_UEL,
  DEFAULT_DETAILED_REVENUE_DATA,
  DEFAULT_GAIN_ON_DISPOSAL,
  DEFAULT_INFLATION_INPUTS,
  DEFAULT_INITIAL_CYCLE_DATA,
  DEFAULT_MCAPEX_PROVISION,
  DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  DEFAULT_REVENUE_SETUP,
  DEFAULT_STARTING_BATTERY_ASSUMPTION,
  DEFAULT_VINTAGE
} from '../calculates/constant';
import { sumArrays } from '../calculates/utils';
import { DEFAULT_VALUATION } from './constant';
import { IValuation } from './type';
import { projectValuation } from './valuation';

export function calcKPIs({
  valuation = DEFAULT_VALUATION,
  corporationTax = DEFAULT_CORPORATION_TAX,
  gearingByCapexType = DEFAULT_GEARING_BY_TAXES,
  seniorDebt = DEFAULT_SENIOR_DEBT,
  decommissioningEndDate = '2068-06-30',
  mCapexProvision = DEFAULT_MCAPEX_PROVISION,
  operatingCashFlowValue = DEFAULT_OPERATING_CASH_FLOW_VALUE,
  capitalExpenditure = DEFAULT_CAPITAL_EXPENDITURE,
  corporationTaxValue = DEFAULT_CORPORATION_TAX_VALUE,
  gainOnDisposal = DEFAULT_GAIN_ON_DISPOSAL
}: {
  valuation?: IValuation;
  mCapexProvision?: IMCapexProvision;
  operatingCashFlowValue?: number[];
  capitalExpenditure?: ICapitalExpenditure;
  gainOnDisposal?: IGainOnDisposal;
  corporationTaxValue?: ICorporationTaxValue;
  valuation_date?: string;
  gearingByCapexType?: IGearingByTaxes;
  equity?: IEquity;
  seniorDebt?: ISeniorDebt;
  corporationTax?: ICorporationTax;
  decommissioningEndDate?: string;
}) {
  const modelStartDate = '2023-01-01';
  const operation_start_date = '2028-01-01';
  const operation_start_date_month_number = getMonthsNumberFromModelStartDate(
    modelStartDate,
    operation_start_date
  );

  // const period = calcPeriod();
  const period =
    getMonthsNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  const valuation_date_month_number = getMonthsNumberFromModelStartDate(
    modelStartDate,
    valuation.valuation_date
  );

  const npv_calculation_data = projectValuation({
    valuation,
    corporationTax,
    gearingByCapexType,
    seniorDebt,
    modelStartDate,
    decommissioningEndDate,
    mCapexProvision,
    operatingCashFlowValue,
    capitalExpenditure,
    corporationTaxValue,
    gainOnDisposal
  });

  const pre_tax_unlevered_cash_flow_from_valuation_date = [];
  const cumulative_pre_tax_unlevered_cash_flow_from_valuation_date = [];
  const post_tax_unlevered_cash_flow_from_valuation_date = [];
  const cumulative_post_tax_unlevered_cash_flow_from_valuation_date = [];

  const post_tax_levered_cash_flow_from_valuation_date = [];
  const cumulative_post_tax_levered_cash_flow_from_valuation_date = [];

  for (let i = 0; i < period; i++) {
    if (i >= valuation_date_month_number - 1) {
      pre_tax_unlevered_cash_flow_from_valuation_date[
        i + 1 - valuation_date_month_number
      ] = npv_calculation_data.pre_tax_unlevered_cash_flow[i];

      post_tax_unlevered_cash_flow_from_valuation_date[
        i + 1 - valuation_date_month_number
      ] = npv_calculation_data.post_tax_unlevered_cash_flow[i];

      post_tax_levered_cash_flow_from_valuation_date[
        i + 1 - valuation_date_month_number
      ] = npv_calculation_data.post_tax_levered_cash_flow[i];
    }
  }
  const pre_tax_unlevered_npv_at_valuation_date = npv(
    npv_calculation_data.discount_rate_pre_tax_and_unlevered,
    pre_tax_unlevered_cash_flow_from_valuation_date
  );
  const irr_pre_tax_unlevered_at_valuation_date = calcIRR(
    pre_tax_unlevered_npv_at_valuation_date,
    npv_calculation_data.discount_rate_pre_tax_and_unlevered,
    pre_tax_unlevered_cash_flow_from_valuation_date
  );

  const payback_period_pre_tax_unlevered = paybackPeriod(
    pre_tax_unlevered_cash_flow_from_valuation_date,
    operation_start_date_month_number - valuation_date_month_number
  );

  const post_tax_unlevered_npv_at_valuation_date = npv(
    npv_calculation_data.discount_rate_post_tax_and_unlevered,
    post_tax_unlevered_cash_flow_from_valuation_date
  );

  const irr_post_tax_unlevered_at_valuation_date = calcIRR(
    post_tax_unlevered_npv_at_valuation_date,
    npv_calculation_data.discount_rate_post_tax_and_unlevered,
    post_tax_unlevered_cash_flow_from_valuation_date
  );
  const payback_period_post_tax_unlevered = paybackPeriod(
    post_tax_unlevered_cash_flow_from_valuation_date,
    operation_start_date_month_number - valuation_date_month_number
  );

  const post_tax_levered_npv_at_valuation_date = npv(
    npv_calculation_data.discount_rate_post_tax_and_levered,
    post_tax_levered_cash_flow_from_valuation_date
  );

  const irr_post_tax_levered_at_valuation_date = calcIRR(
    post_tax_levered_npv_at_valuation_date,
    npv_calculation_data.discount_rate_post_tax_and_levered,
    post_tax_levered_cash_flow_from_valuation_date
  );
  const payback_period_post_tax_levered = paybackPeriod(
    post_tax_levered_cash_flow_from_valuation_date,
    operation_start_date_month_number - valuation_date_month_number
  );
  return [
    {
      discountRate: npv_calculation_data.discount_rate_pre_tax_and_unlevered,
      valuation_condition: 'Pre-tax unlevered',
      value: {
        npv: pre_tax_unlevered_npv_at_valuation_date,
        irr: irr_pre_tax_unlevered_at_valuation_date,
        payback_period: payback_period_pre_tax_unlevered
      }
    },
    {
      discountRate: npv_calculation_data.discount_rate_post_tax_and_unlevered,
      valuation_condition: 'Post-tax unlevered',
      value: {
        npv: post_tax_unlevered_npv_at_valuation_date,
        irr: irr_post_tax_unlevered_at_valuation_date,
        payback_period: payback_period_post_tax_unlevered
      }
    },
    {
      discountRate: npv_calculation_data.discount_rate_post_tax_and_levered,

      valuation_condition: 'Post-tax levered',
      value: {
        npv: post_tax_levered_npv_at_valuation_date,
        irr: irr_post_tax_levered_at_valuation_date,
        payback_period: payback_period_post_tax_levered
      }
    }
  ];
}
