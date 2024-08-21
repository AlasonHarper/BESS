import { sumArrays } from '../calculates/utils';
//   import { DEFAULT_CORPORATION_TAX } from "../calculates/constant";
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
import { calcTotalAdminCosts } from '../calculates/Administrative costs/total_admin_cost';
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
} from '../calculates/CoGS/constant';
import { calcTotalCostOfSales } from '../calculates/CoGS/total_cost_of_sales';
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
import { calcTotalDepreciation } from '../calculates/Depreciation/total_depreciation';
import { ICostOfAdditions } from '../calculates/Depreciation/type';
import { calcTotalRevenue } from '../calculates/Revenue/total_revenue';
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
} from '../calculates//Revenue/type';
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
} from '../calculates/constant';
import {
  getMonthsNumberFromModelStartDate,
  roundArray
} from '../calculates/utils';
import { calcEBIT } from '../calculates/ebit';
import { calcLandRentToPL } from '../calculates/Administrative costs/land_rent';

import { calcCapitalExpenditure } from '../Cash flow/capital_expenditure';
import { calcGainOnDisposal } from '../calculates/Revenue/gain_on_disposal_of_batteries';

import { fixedAssetsForBalanceSheet } from './Non current asset/Fixed asset/total_fixed_asset';
import { escrowAccountForBalanceSheet } from './Non current asset/escrow_account';
import { calcTradeDebtorsForBalanceSheet } from './Current asset/trade_debtors';
import {
  DEFAULT_DEVELOPMENT_FEE_PAYMENT_DATES,
  DEFAULT_DEVELOPMENT_FEE_PAYMENT_PROFILE
} from './constant';
import { IDevFeePaymentDates, IDevFeePaymentProfile } from './type';
import {
  ICapexProvision,
  ICashRequirements,
  IDividends,
  IEquity,
  IGearingByTaxes,
  IMovementInTradeDebtor,
  INationalGridSecurities,
  ISeniorDebt,
  IVariableProfileForAttributableCosts,
  IWrokingCapital,
  Ivat
} from '../Cash flow/type';
import {
  DEFAULT_CAPEX_PROVISION,
  DEFAULT_CASH_REQUIREMENTS,
  DEFAULT_EQUITY,
  DEFAULT_GEARING_BY_TAXES,
  DEFAULT_MOVEMENT_IN_TRADE_DEBTOR,
  DEFAULT_NATIONAL_GRID_SECURITIES,
  DEFAULT_VARIABLE_PROFILE_FOR_ATTRIBUTABLE_COSTS,
  DEFAULT_VAT,
  DEFAULT_WORKING_CAPITAL
} from '../Cash flow/constant';
import { calcPrepaymentsForBalanceSheet } from './Current asset/prepayments';
import { calcCashForBalanceSheet } from './Current asset/cash';
import { ICorporationTax } from '../calculates/Cash flow/type';
import { DEFAULT_CORPORATION_TAX } from '../calculates/Cash flow/constant';
import { calcTradeCreditorsForBalanceSheet } from './Current liabilities/trade_creditor';
import { calcCapexCreditorForBalanceSheet } from './Current liabilities/capex_creditor';
import { calcVATCreditorForBalanceSheet } from './Current liabilities/vat_creditor';
import { calcCorporateTaxCreditorForBalanceSheet } from './Current liabilities/corporate_tax_creditor';
import { calcSeniorDebtForBalanceSheet } from './Non current liabilities/senior_debt';
import { shareholderLoanForBalanceSheet } from './Non current liabilities/shareholder_loan';
import { decommissionigProvisionForBalanceSheet } from './Non current liabilities/decommissioning_provision';
// import { calcDevexAdditions } from "../Balance sheet/Non current asset/Fixed asset/devex";

export function calcNetAssets({
  capexProvision = DEFAULT_CAPEX_PROVISION,
  cashRequirements = DEFAULT_CASH_REQUIREMENTS,
  gearingByCapexType = DEFAULT_GEARING_BY_TAXES,
  equity = DEFAULT_EQUITY,
  seniorDebt,
  dividends,
  revenueSensitivity = 0,
  developmentFeePaymentPercentageProfile = DEFAULT_DEVELOPMENT_FEE_PAYMENT_PROFILE,
  developmentFeePaymentDateProfile = DEFAULT_DEVELOPMENT_FEE_PAYMENT_DATES,
  national_grid_securities = DEFAULT_NATIONAL_GRID_SECURITIES,
  // variable_profile_for_attributable_costs comes from Timing 15 National grid securities
  // ~~~ 15.01 Variable profile for attributable costs
  variable_profile_for_attributable_costs = DEFAULT_VARIABLE_PROFILE_FOR_ATTRIBUTABLE_COSTS,
  fullyConsentedDate = '2024-11-01',
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
  operationAndManagementSettings = DEFAULT_O_AND_M,
  constraintFactor = 100,
  opexSensitivity = 0,
  vintage = DEFAULT_VINTAGE,
  mCapexProvision = DEFAULT_MCAPEX_PROVISION,
  movementInTradeDebtor = DEFAULT_MOVEMENT_IN_TRADE_DEBTOR
}: {
  capexProvision?: ICapexProvision[];
  cashRequirements?: ICashRequirements;
  gearingByCapexType?: IGearingByTaxes;
  equity?: IEquity;
  seniorDebt?: ISeniorDebt;
  dividends?: IDividends;
  national_grid_securities?: INationalGridSecurities;
  variable_profile_for_attributable_costs?: IVariableProfileForAttributableCosts;
  fullyConsentedDate?: string;
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
  mCapexProvision?: IMCapexProvision;
  movementInTradeDebtor?: IMovementInTradeDebtor;
}) {
  let net_assets = [];
  const fixed_assets = fixedAssetsForBalanceSheet({
    developmentFeePaymentPercentageProfile,
    developmentFeePaymentDateProfile,
    costOfAdditions,
    landRent,
    revenueSetup,
    assumptionsData,
    detailedRevenueData,
    initialCycleData,
    startingAssumptionsForBatteries,
    batteryDisposals,
    batteryEfficiency,
    batteryAugmentation,
    batteryCubes,
    batteryExCubes,
    inflationInputs,
    capexPaymentsProfile,
    capexPaymentMilestones,
    capexUEL,
    bessCapexForecast,
    model,
    initialCapacity,
    batteryDuration,
    landSize,
    batterySensitivity,
    operationYears,
    capexSensitivity,
    operationStartDate,
    modelStartDate,
    developmentStartDate,
    constructionStartDate,
    operationEndDate,
    decommissioningStartDate,
    decommissioningEndDate,
    vintage
  });
  const escrow_account = escrowAccountForBalanceSheet({
    national_grid_securities,
    // variable_profile_for_attributable_costs comes from Timing 15 National grid securities
    // ~~~ 15.01 Variable profile for attributable costs
    variable_profile_for_attributable_costs,
    modelStartDate,
    fullyConsentedDate,
    developmentStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate
  });
  const trade_debtors = movementInTradeDebtor.trade_debtors_for_balance_sheet;
  const prepayments = calcPrepaymentsForBalanceSheet({
    landRent,
    landSize,
    initialCapacity,
    operationStartDate,
    modelStartDate,
    operationEndDate,
    developmentStartDate,

    decommissioningStartDate,
    decommissioningEndDate,
    constructionStartDate
  });
  const cash = calcCashForBalanceSheet({
    mCapexProvision
  });

  const trade_creditors = calcTradeCreditorsForBalanceSheet({
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
    systemPeakTariffData,
    sharedYearRoundTariffData,
    notSharedYearRoundTariffData,
    ajdustmentTariffData,
    exportChargesOfTNUoS,
    localSubstationTariff,
    localSubstationSwitch,
    localCircuitsData,
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
    opexSensitivity
  });
  const capex_creditor = calcCapexCreditorForBalanceSheet({
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
    developmentStartDate
  });
  const vat_creditor = calcVATCreditorForBalanceSheet({
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
    systemPeakTariffData,
    sharedYearRoundTariffData,
    notSharedYearRoundTariffData,
    ajdustmentTariffData,
    exportChargesOfTNUoS,
    localSubstationTariff,
    localSubstationSwitch,
    localCircuitsData,
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
    opexSensitivity
  });
  const corporate_tax_creditor = calcCorporateTaxCreditorForBalanceSheet({
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
    developmentStartDate,
    meteringSettings,
    auxilliaryLossesSettings,
    systemPeakTariffData,
    sharedYearRoundTariffData,
    notSharedYearRoundTariffData,
    ajdustmentTariffData,
    exportChargesOfTNUoS,
    localSubstationTariff,
    localSubstationSwitch,
    localCircuitsData,
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
    opexSensitivity
  });

  const senior_debt = calcSeniorDebtForBalanceSheet({
    mCapexProvision
  });
  const shareholder_loan = shareholderLoanForBalanceSheet({
    mCapexProvision
  });
  const decommissioing_provision = decommissionigProvisionForBalanceSheet({
    costOfAdditions,
    length_of_construction,
    modelStartDate,
    developmentStartDate,
    constructionStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    length_of_decommissioning
  });

  net_assets = sumArrays(
    fixed_assets,
    escrow_account,
    trade_debtors,
    prepayments,
    cash,
    trade_creditors,
    capex_creditor,
    vat_creditor,
    corporate_tax_creditor,
    senior_debt,
    shareholder_loan,
    decommissioing_provision
  );
  return net_assets;
}
