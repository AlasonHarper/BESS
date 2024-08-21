import { calcBalacneOfPlantAdditions } from '../../Balance sheet/Non current asset/Fixed asset/balance_of_plant';
import { calcDevexAdditions } from '../../Balance sheet/Non current asset/Fixed asset/devex';
import { calcEnterpriseValueAdditions } from '../../Balance sheet/Non current asset/Fixed asset/enterprise_value';
import { calcLandAdditions } from '../../Balance sheet/Non current asset/Fixed asset/land';
import { calcPoolingSubstationAdditions } from '../../Balance sheet/Non current asset/Fixed asset/pooling_substation';
import { calcTransformersAdditions } from '../../Balance sheet/Non current asset/Fixed asset/transformers';
import {
  DEFAULT_DEVELOPMENT_FEE_PAYMENT_DATES,
  DEFAULT_DEVELOPMENT_FEE_PAYMENT_PROFILE
} from '../../Balance sheet/constant';
import {
  IDevFeePaymentDates,
  IDevFeePaymentProfile
} from '../../Balance sheet/type';
import { calcCapexProvision } from '../../Cash flow/capex_provision';
import {
  DEFAULT_CAPEX_PROVISION,
  DEFAULT_CASH_REQUIREMENTS,
  DEFAULT_DIVIDENDS,
  DEFAULT_EQUITY,
  DEFAULT_GEARING_BY_TAXES,
  DEFAULT_NATIONAL_GRID_SECURITIES,
  DEFAULT_SENIOR_DEBT,
  DEFAULT_VARIABLE_PROFILE_FOR_ATTRIBUTABLE_COSTS,
  DEFAULT_VAT,
  DEFAULT_WORKING_CAPITAL
} from '../../Cash flow/constant';
import {
  ICapexProvision,
  ICashRequirements,
  IDividends,
  IEquity,
  IGearingByTaxes,
  INationalGridSecurities,
  ISeniorDebt,
  IVariableProfileForAttributableCosts,
  IWrokingCapital,
  Ivat
} from '../../Cash flow/type';
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
} from '../../calculates/Administrative costs/constant';
import { calcLandRentToPL } from '../../calculates/Administrative costs/land_rent';
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
} from '../../calculates/Administrative costs/type';
import { DEFAULT_CORPORATION_TAX } from '../../calculates/Cash flow/constant';
import { calcCorporationTax } from '../../calculates/Cash flow/corporation_tax';
import { ICorporationTax } from '../../calculates/Cash flow/type';
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
} from '../../calculates/CoGS/constant';
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
} from '../../calculates/CoGS/type';
import { DEFAULT_COST_OF_ADDITIONS } from '../../calculates/Depreciation/constant';
import { ICostOfAdditions } from '../../calculates/Depreciation/type';
import { calcGainOnDisposal } from '../../calculates/Revenue/gain_on_disposal_of_batteries';
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
  IInflationForm,
  IMCapexProvision,
  IRevenueSetup,
  IStartingBatteryAssumptions,
  IVintage
} from '../../calculates/Revenue/type';
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
  DEFAULT_INFLATION_INPUTS,
  DEFAULT_INITIAL_CYCLE_DATA,
  DEFAULT_MCAPEX_PROVISION,
  DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  DEFAULT_REVENUE_SETUP,
  DEFAULT_STARTING_BATTERY_ASSUMPTION,
  DEFAULT_VINTAGE
} from '../../calculates/constant';
import { calcEBIT } from '../../calculates/ebit';
import {
  arraySum,
  calcVintages,
  expandAndAverage,
  expandAndSum,
  getAsAPercentOfPeriod,
  getMonthsNumberFromModelStartDate,
  minArray,
  multiplyArrays,
  multiplyNumber,
  nthLargest,
  roundArray,
  sumArray,
  sumArrays
} from '../../calculates/utils';

export function calcCashForBalanceSheet({
  mCapexProvision = DEFAULT_MCAPEX_PROVISION
}: {
  mCapexProvision?: IMCapexProvision;
}) {
  const cash = mCapexProvision.cashEndBalance;
  return roundArray(cash, 3);
}
