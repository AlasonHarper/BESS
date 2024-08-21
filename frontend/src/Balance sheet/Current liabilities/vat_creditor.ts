import { roundArray } from '../../calculates/utils';
// FS_M 1 Cash Flow
import {
  DEFAULT_DEVELOPMENT_FEE_PAYMENT_DATES,
  DEFAULT_DEVELOPMENT_FEE_PAYMENT_PROFILE
} from '../../Balance sheet/constant';
import {
  IDevFeePaymentDates,
  IDevFeePaymentProfile
} from '../../Balance sheet/type';
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
import { calcDecommissiongCosts } from '../../calculates/Administrative costs/decommissioning_cost';
import { calcLandRentToPL } from '../../calculates/Administrative costs/land_rent';
import { calcTotalAdminCosts } from '../../calculates/Administrative costs/total_admin_cost';
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
  DEFAULT_OPTIMISER,
  DEFAULT_SHARED_YEAR_ROUND_TARIFF_DATA,
  DEFAULT_SYSTEM_PEAK_TARIFF_DATA
} from '../../calculates/CoGS/constant';
import { calcTotalCostOfSales } from '../../calculates/CoGS/total_cost_of_sales';
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
  DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  DEFAULT_REVENUE_SETUP,
  DEFAULT_STARTING_BATTERY_ASSUMPTION,
  DEFAULT_VINTAGE
} from '../../calculates/constant';
import { calcEBIT } from '../../calculates/ebit';
import {
  calcDaysInMonth,
  getAsAPercentOfPeriod,
  getMonthsNumberFromModelStartDate,
  multiplyArrays,
  multiplyNumber,
  sumArrays
} from '../../calculates/utils';

import { IWrokingCapital, Ivat } from '../../Cash flow/type';
import { DEFAULT_VAT, DEFAULT_WORKING_CAPITAL } from '../../Cash flow/constant';
import { calcVATCreditor } from '../../Cash flow/Movement/movement_in_vat_creditor';

export function calcVATCreditorForBalanceSheet({
  developmentFeePaymentPercentageProfile = DEFAULT_DEVELOPMENT_FEE_PAYMENT_PROFILE,
  developmentFeePaymentDateProfile = DEFAULT_DEVELOPMENT_FEE_PAYMENT_DATES,
  working_capital = DEFAULT_WORKING_CAPITAL,
  vat = DEFAULT_VAT,
  corporationTax = DEFAULT_CORPORATION_TAX,
  landRent = DEFAULT_LAND_RENT,
  landSize = 75,
  operationEndDate = '2067-12-31',
  constructionStartDate = '2027-01-01',
  // costOfAdditions comes from fixed~~ 7 Capex~~~7.03~7.10
  costOfAdditions = DEFAULT_COST_OF_ADDITIONS,
  revenueSetup = DEFAULT_REVENUE_SETUP,
  assumptionsData = DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  detailedRevenueData = DEFAULT_DETAILED_REVENUE_DATA,
  initialCycleData = DEFAULT_INITIAL_CYCLE_DATA,
  initialCapacity = 1000,
  startingAssumptionsForBatteries = DEFAULT_STARTING_BATTERY_ASSUMPTION,
  batteryDisposals = DEFAULT_BATTERY_DISPOSAL,
  batteryEfficiency = DEFAULT_BATTERY_EFFICIENCY,
  batteryAugmentation = DEFAULT_BATTERY_AUGMENTATION,
  model = 'Conservative',
  batteryDuration = 4,
  batteryCubes = DEFAULT_BATTERY_CUBES,
  batteryExCubes = DEFAULT_BATTERY_EXCUBES,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  capexPaymentsProfile = DEFAULT_CAPEX_PAYMENTS_PROFILE,
  capexPaymentMilestones = DEFAULT_CAPEX_PAYMENT_MILESTONES,
  capexUEL = DEFAULT_CAPEX_UEL,
  bessCapexForecast = DEFAULT_BESS_CAPEX_FORECAST,
  batterySensitivity = 0,
  operationYears = 40,
  capexSensitivity = 0,
  modelStartDate = '2023-01-01',
  operationStartDate = '2028-01-01',
  decommissioningEndDate = '2068-06-30',
  decommissioningStartDate = '2068-01-01',
  developmentStartDate = '2023-07-01',
  length_of_construction = 12,
  length_of_decommissioning = 6,
  meteringSettings = DEFAULT_METERING,
  auxilliaryLossesSettings = DEFAULT_AUXILLIARY,
  systemPeakTariffData = DEFAULT_SYSTEM_PEAK_TARIFF_DATA,
  sharedYearRoundTariffData = DEFAULT_SHARED_YEAR_ROUND_TARIFF_DATA,
  notSharedYearRoundTariffData = DEFAULT_NOT_SHARED_YEAR_ROUND_TARIFF_DATA,
  ajdustmentTariffData = DEFAULT_ADJUSTMENT_TARIFF_Data,
  exportChargesOfTNUoS = DEFAULT_EXPORT_CHARGES_OF_TNUOS,
  localSubstationTariff = DEFAULT_LOCAL_SUBSTATION_TARIFF,
  localSubstationSwitch = 0,
  localCircuitsData = DEFAULT_LOCAL_CIRCUITS,
  opex_sensitivity = 0,
  battery_duration = 4,
  extended_warranty = DEFAULT_EXTENDED_WARRANTY,
  siteSecurity = DEFAULT_SITE_SECURITY,
  otherAdministrativeCosts = DEFAULT_OTHER_ADMIN_COSTs,
  legalCosts = DEFAULT_LEGAL_COST,
  insurance = DEFAULT_INSURANCE,
  communityBenefit = DEFAULT_COMMUNITY_BENEFIT,
  averageWholeSaleDayAheadPrice = DEFAULT_AVERAGE_WHOLESALE_DAY_AHEAD_PRICE,
  businessRates = DEFAULT_BUSINESS_RATES,
  assetManagement = DEFAULT_ASSET_MANAGEMENT,
  revenueSensitivity = 0,
  operationAndManagementSettings = DEFAULT_O_AND_M,
  constraintFactor = 100,
  opexSensitivity = 0,
  vintage = DEFAULT_VINTAGE
}: {
  developmentFeePaymentPercentageProfile?: IDevFeePaymentProfile;
  developmentFeePaymentDateProfile?: IDevFeePaymentDates;

  working_capital?: IWrokingCapital;
  vat?: Ivat;
  corporationTax?: ICorporationTax;
  costOfAdditions?: ICostOfAdditions;
  capexSensitivity?: number;
  extended_warranty?: IExtendedWarranty;
  siteSecurity?: ISiteSecurity;
  otherAdministrativeCosts?: IOtherAdminCosts;
  legalCosts?: ILegalCost;
  landRent?: ILandRent;
  landSize?: number;
  insurance?: IInsurance;
  communityBenefit?: ICommunityBenefit;
  businessRates?: IBusinessRates;
  assetManagement?: IAssetManagement;
  operationAndManagementSettings?: IOAndM[];
  constraintFactor?: number;
  battery_duration?: number;
  operationEndDate?: string;
  constructionStartDate?: string;
  opex_sensitivity?: number;
  opexSensitivity?: number;
  optimiser?: IOptimiser;
  meteringSettings?: IMetering;
  auxilliaryLossesSettings?: IAuxilliaryLosses;
  averageWholeSaleDayAheadPrice?: number[];
  revenueSensitivity?: number;
  revenueSetup?: IRevenueSetup;
  assumptionsData?: IAssumptionData[];
  detailedRevenueData?: IDetailedRevenueData[];
  initialCycleData?: ICycleData[];
  startingAssumptionsForBatteries?: IStartingBatteryAssumptions;
  batteryDisposals?: IBatteryDisposal;
  batteryEfficiency?: IBatteryEfficiency;
  batteryAugmentation?: IBatteryAugmentation;
  model?: string;
  batteryDuration?: number;
  batteryCubes?: IBatteryCubes;
  batteryExCubes?: IBatteryExcubes;
  inflationInputs?: IInflationForm[];
  capexPaymentsProfile?: ICapexPaymentForm[];
  capexPaymentMilestones?: ICapexPaymentMilestoneForm[];
  capexUEL?: ICapexUELForm[];
  bessCapexForecast?: IBessCapexForecast;
  batterySensitivity?: number;
  sensitivities?: ISensitivity[];
  sharedYearRoundTariffData?: ISharedYearRoundTariffData[];
  systemPeakTariffData?: ISystemTariffData[];
  notSharedYearRoundTariffData?: INotSharedYearRoundTariffData[];
  ajdustmentTariffData?: IAdjustmentTariffData[];
  exportChargesOfTNUoS?: IExportChargesOfTNUoS;
  localSubstationTariff?: ILocalSubstationTariff[];
  localSubstationSwitch?: number;
  initialCapacity?: number;
  operationYears?: number;
  length_of_construction?: number;
  length_of_decommissioning?: number;
  modelStartDate?: string;
  operationStartDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
  developmentStartDate?: string;
  localCircuitsData?: ILocalCircuits[];
  vintage?: IVintage;
}) {
  const vat_creditor = calcVATCreditor({
    developmentFeePaymentPercentageProfile,
    developmentFeePaymentDateProfile,
    working_capital,
    vat,
    corporationTax,
    landRent,
    landSize,
    operationEndDate,
    constructionStartDate,
    // costOfAdditions comes from fixed~~ 7 Capex~~~7.03~7.10
    costOfAdditions,
    revenueSetup,
    assumptionsData,
    detailedRevenueData,
    initialCycleData,
    initialCapacity,
    startingAssumptionsForBatteries,
    batteryDisposals,
    batteryEfficiency,
    batteryAugmentation,
    model,
    batteryDuration,
    batteryCubes,
    batteryExCubes,
    inflationInputs,
    capexPaymentsProfile,
    capexPaymentMilestones,
    capexUEL,
    bessCapexForecast,
    batterySensitivity,
    operationYears,
    capexSensitivity,
    modelStartDate,
    operationStartDate,
    decommissioningEndDate,
    decommissioningStartDate,
    developmentStartDate,
    length_of_construction,
    length_of_decommissioning,
    meteringSettings,
    auxilliaryLossesSettings,
    // sensitivities,
    systemPeakTariffData,
    sharedYearRoundTariffData,
    notSharedYearRoundTariffData,
    ajdustmentTariffData,
    exportChargesOfTNUoS,
    localSubstationTariff,
    localSubstationSwitch,
    localCircuitsData,
    opex_sensitivity,
    battery_duration,
    extended_warranty,
    siteSecurity,
    otherAdministrativeCosts,
    legalCosts,
    insurance,
    communityBenefit,
    averageWholeSaleDayAheadPrice,
    businessRates,
    assetManagement,
    revenueSensitivity,
    operationAndManagementSettings,
    constraintFactor,
    opexSensitivity,
    vintage
  }).vat_creditor_for_balance_sheet;
  return roundArray(vat_creditor, 2);
}
