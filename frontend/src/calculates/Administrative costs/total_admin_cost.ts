// Calcs 17.07 Water rates
import { annualIndexToMonths, normalizeArray, sumArrays } from '../utils';
import {
  DEFAULT_ASSET_M_EXPENSE,
  DEFAULT_BUSINESS_RATES,
  DEFAULT_BUSINESS_RATES_EXPENSE,
  DEFAULT_COMMUNITY_BENEFIT,
  DEFAULT_COMMUNITY_BENEFIT_EXPENSE,
  DEFAULT_DECOMMSSIONING_COSTS,
  DEFAULT_EASEMENT_COSTS,
  DEFAULT_EASEMENT_EXPENSE,
  DEFAULT_EXTENDED_WARRANTY,
  DEFAULT_EXTENDED_WARRANTY_EXPENSE,
  DEFAULT_INSURANCE,
  DEFAULT_INSURANCE_EXPENSE,
  DEFAULT_INTERCOMPANY_EXP,
  DEFAULT_INTERCOMPANY_EXPENSES,
  DEFAULT_LAND_RENT,
  DEFAULT_LAND_RENT_EXEPNESE,
  DEFAULT_LEGAL_COST,
  DEFAULT_LEGAL_EXPENSE,
  DEFAULT_NG_SECURITIES,
  DEFAULT_O_AND_M_EXPENSE,
  DEFAULT_OTHER_ADMIN_COSTs,
  DEFAULT_OTHER_ADMIN_EXPENSE,
  DEFAULT_SITE_SECURITY,
  DEFAULT_SITE_SECURITY_EXPENSE,
  DEFAULT_WATER_RATES,
  DEFAULT_WATER_RATES_EXPENSE
} from './constant';
import {
  IBusinessRates,
  ICommunityBenefit,
  IDecommissioningCosts,
  IEasementCosts,
  IExtendedWarranty,
  IIntercompanyExpenses,
  ILandRent,
  ILandRentExpense,
  ILegalCost,
  INGSecurities,
  IOtherAdminCosts,
  ISiteSecurity,
  IWaterRates
} from './type';
import { calcTotalRevenue } from '../Revenue/total_revenue';
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
} from '../Revenue/type';
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
} from '../constant';
import {
  addZeros,
  calcVintages,
  getAsAPercentOfPeriod,
  getMonthsNumberFromModelStartDate,
  inflationIndex,
  roundArray
} from '../utils';
import { DEFAULT_ASSET_MANAGEMENT, DEFAULT_O_AND_M } from './constant';
import { IAssetManagement, IOAndM } from './type';
import { calcAssetManagementCosts } from './asset_management';
import { calcBusinessRates } from './business_rates';
import { calcCommunityBenefit } from './community_benefit';
import { calcLandRentToPL } from './land_rent';
import { calcLegalCosts } from './legal_cost';
import { calcOperationAndManagementCost } from './o_and_m';
import { calcOtherAdminCosts } from './other_administrative_cost';
import { calcSiteSecurity } from './site_security';
import { calcExtendedWarranty } from './extended_warranty';
import { DEFAULT_AVERAGE_WHOLESALE_DAY_AHEAD_PRICE } from '../CoGS/constant';
import { IInsurance } from '../CoGS/type';
import { calcInsuranceExpense } from './insurance';
import { calcDecommissiongCosts } from './decommissioning_cost';
import { ICostOfAdditions } from '../Depreciation/type';
import { DEFAULT_COST_OF_ADDITIONS } from '../Depreciation/constant';
import { calcNationalGridSecurities } from '../../Cash flow/Movement/movement_in_escrow_account';
import {
  INationalGridSecurities,
  IVariableProfileForAttributableCosts
} from '../../Cash flow/type';
import {
  DEFAULT_NATIONAL_GRID_SECURITIES,
  DEFAULT_VARIABLE_PROFILE_FOR_ATTRIBUTABLE_COSTS
} from '../../Cash flow/constant';
import { calcWaterRates } from './water_rates';
import { calcEasementCosts } from './easement_costs';
import { calcIntercompanyExpense } from './intercompany_expenses';
import { extend } from 'dayjs';

export function calcTotalAdminCosts({
  intercompany_expense = DEFAULT_INTERCOMPANY_EXPENSES,
  water_rates = DEFAULT_WATER_RATES,
  national_grid_securities = DEFAULT_NATIONAL_GRID_SECURITIES,
  variable_profile_for_attributable_costs = DEFAULT_VARIABLE_PROFILE_FOR_ATTRIBUTABLE_COSTS,
  easement_costs = DEFAULT_EASEMENT_COSTS,
  costOfAdditions = DEFAULT_COST_OF_ADDITIONS,
  length_of_construction = 12,
  developmentStartDate = '2023-07-01',
  length_of_decommissioning = 6,
  battery_duration = 4,
  extended_warranty = DEFAULT_EXTENDED_WARRANTY,
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
  siteSecurity = DEFAULT_SITE_SECURITY,
  otherAdministrativeCosts = DEFAULT_OTHER_ADMIN_COSTs,
  legalCosts = DEFAULT_LEGAL_COST,
  landRent = DEFAULT_LAND_RENT,
  landSize = 75,
  insurance = DEFAULT_INSURANCE,
  communityBenefit = DEFAULT_COMMUNITY_BENEFIT,
  averageWholeSaleDayAheadPrice = DEFAULT_AVERAGE_WHOLESALE_DAY_AHEAD_PRICE,
  businessRates = DEFAULT_BUSINESS_RATES,
  assetManagement = DEFAULT_ASSET_MANAGEMENT,
  revenueSensitivity = 0,
  operationAndManagementSettings = DEFAULT_O_AND_M,
  constraintFactor = 100,
  operationEndDate = '2067-12-31',
  constructionStartDate = '2027-01-01',
  opexSensitivity = 0,
  batterySensitivity = 0,
  operationYears = 40,
  modelStartDate = '2023-01-01',
  fullyConsentedDate = '2024-11-01',
  operationStartDate = '2028-01-01',
  decommissioningStartDate = '2068-01-01',
  decommissioningEndDate = '2068-06-30',
  vintage = DEFAULT_VINTAGE,
  assetMExpense = DEFAULT_ASSET_M_EXPENSE,
  businessRatesExpense = DEFAULT_BUSINESS_RATES_EXPENSE,
  communityBenefitExpense = DEFAULT_COMMUNITY_BENEFIT_EXPENSE,
  insuranceExpense = DEFAULT_INSURANCE_EXPENSE,
  landRentExpense = DEFAULT_LAND_RENT_EXEPNESE,
  legalExpense = DEFAULT_LEGAL_EXPENSE,
  oAndMExpense = DEFAULT_O_AND_M_EXPENSE,
  otherAdminExpense = DEFAULT_OTHER_ADMIN_EXPENSE,
  siteSecurityExpense = DEFAULT_SITE_SECURITY_EXPENSE,
  extendedWarrantyExpense = DEFAULT_EXTENDED_WARRANTY_EXPENSE,
  intercompanyExp = DEFAULT_INTERCOMPANY_EXP,
  easementExpnese = DEFAULT_EASEMENT_EXPENSE,
  decommissioningCosts = DEFAULT_DECOMMSSIONING_COSTS,
  waterRatesExpense = DEFAULT_WATER_RATES_EXPENSE,
  nGSecurities = DEFAULT_NG_SECURITIES
}: {
  intercompany_expense?: IIntercompanyExpenses;
  water_rates?: IWaterRates;
  easement_costs?: IEasementCosts;
  variable_profile_for_attributable_costs?: IVariableProfileForAttributableCosts;
  national_grid_securities?: INationalGridSecurities;
  costOfAdditions?: ICostOfAdditions;
  length_of_construction?: number;
  developmentStartDate?: string;
  length_of_decommissioning?: number;
  extended_warranty?: IExtendedWarranty;
  siteSecurity?: ISiteSecurity;
  otherAdministrativeCosts?: IOtherAdminCosts;
  legalCosts?: ILegalCost;
  landRent?: ILandRent;
  landSize?: number;
  insurance?: IInsurance;
  communityBenefit?: ICommunityBenefit;
  averageWholeSaleDayAheadPrice?: number[];
  businessRates?: IBusinessRates;
  assetManagement?: IAssetManagement;
  revenueSensitivity?: number;
  revenueSetup?: IRevenueSetup;
  assumptionsData?: IAssumptionData[];
  detailedRevenueData?: IDetailedRevenueData[];
  initialCycleData?: ICycleData[];
  initialCapacity?: number;
  startingAssumptionsForBatteries?: IStartingBatteryAssumptions;
  batteryDisposals?: IBatteryDisposal;
  batteryEfficiency?: IBatteryEfficiency;
  batteryAugmentation?: IBatteryAugmentation;
  model?: string;
  batteryCubes?: IBatteryCubes;
  batteryExCubes?: IBatteryExcubes;
  capexPaymentsProfile?: ICapexPaymentForm[];
  capexPaymentMilestones?: ICapexPaymentMilestoneForm[];
  capexUEL?: ICapexUELForm[];
  bessCapexForecast?: IBessCapexForecast;
  batterySensitivity?: number;
  operationYears?: number;
  operationAndManagementSettings?: IOAndM[];
  constraintFactor?: number;
  inflationInputs?: IInflationForm[];
  batteryDuration?: number;
  battery_duration?: number;
  operationStartDate?: string;
  modelStartDate?: string;
  operationEndDate?: string;
  fullyConsentedDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
  constructionStartDate?: string;
  opex_sensitivity?: number;
  opexSensitivity?: number;
  vintage?: IVintage;
  assetMExpense?: number[];
  businessRatesExpense?: number[];
  communityBenefitExpense?: number[];
  insuranceExpense?: number[];
  landRentExpense?: ILandRentExpense;
  legalExpense?: number[];
  oAndMExpense?: number[];
  otherAdminExpense?: number[];
  siteSecurityExpense?: number[];
  extendedWarrantyExpense?: number[];
  intercompanyExp?: number[];
  easementExpnese?: number[];
  decommissioningCosts?: IDecommissioningCosts;
  waterRatesExpense?: number[];
  nGSecurities?: INGSecurities;
}) {
  // const assetManagementCost = calcAssetManagementCosts({
  //   assetManagement,
  //   revenueSensitivity,
  //   revenueSetup,
  //   assumptionsData,
  //   detailedRevenueData,
  //   initialCycleData,
  //   initialCapacity,
  //   startingAssumptionsForBatteries,
  //   batteryDisposals,
  //   batteryEfficiency,
  //   batteryAugmentation,
  //   model,
  //   batteryDuration,
  //   batteryCubes,
  //   batteryExCubes,
  //   inflationInputs,
  //   capexPaymentsProfile,
  //   capexPaymentMilestones,
  //   capexUEL,
  //   bessCapexForecast,
  //   batterySensitivity,
  //   operationYears,
  //   decommissioningStartDate,
  //   operationAndManagementSettings,
  //   constraintFactor,
  //   operationStartDate,
  //   modelStartDate,
  //   operationEndDate,
  //   decommissioningEndDate,
  //   constructionStartDate,
  //   opexSensitivity,
  //   vintage
  // });
  // const businessRatesCost = calcBusinessRates({
  //   businessRates,
  //   inflationInputs,
  //   initialCapacity,
  //   operationStartDate,
  //   modelStartDate,
  //   operationEndDate,
  //   decommissioningEndDate
  // });
  // const communityBenefitCost = calcCommunityBenefit({
  //   communityBenefit,
  //   inflationInputs,
  //   averageWholeSaleDayAheadPrice,
  //   initialCapacity,
  //   opexSensitivity,
  //   operationStartDate,
  //   modelStartDate,
  //   operationEndDate,
  //   decommissioningEndDate
  // });
  // const insuranceCost = calcInsuranceExpense({
  //   insurance,
  //   inflationInputs,
  //   initialCapacity,
  //   opexSensitivity,
  //   operationStartDate,
  //   modelStartDate,
  //   operationEndDate,
  //   decommissioningEndDate
  // });
  // const landRentToProfitAndLoss = calcLandRentToPL({
  //   landRent,
  //   landSize,
  //   initialCapacity,
  //   inflationInputs,
  //   operationStartDate,
  //   modelStartDate,
  //   operationEndDate,
  //   decommissioningStartDate,
  //   decommissioningEndDate,
  //   constructionStartDate
  // }).rentToProfit;
  // const legalCost = calcLegalCosts({
  //   legalCosts,
  //   inflationInputs,
  //   initialCapacity,
  //   opexSensitivity,
  //   operationStartDate,
  //   modelStartDate,
  //   operationEndDate,
  //   decommissioningEndDate
  // });
  // const operationAndManagementCost = calcOperationAndManagementCost({
  //   revenueSetup,
  //   assumptionsData,
  //   detailedRevenueData,
  //   initialCycleData,
  //   initialCapacity,
  //   startingAssumptionsForBatteries,
  //   batteryDisposals,
  //   batteryEfficiency,
  //   batteryAugmentation,
  //   model,
  //   batteryDuration,
  //   batteryCubes,
  //   batteryExCubes,
  //   inflationInputs,
  //   capexPaymentsProfile,
  //   capexPaymentMilestones,
  //   capexUEL,
  //   bessCapexForecast,
  //   batterySensitivity,
  //   operationYears,
  //   operationAndManagementSettings,
  //   operationStartDate,
  //   modelStartDate,
  //   operationEndDate,
  //   decommissioningEndDate,
  //   opexSensitivity,
  //   vintage
  // });
  // const otherAdminCost = calcOtherAdminCosts({
  //   otherAdministrativeCosts,
  //   opexSensitivity,
  //   inflationInputs,
  //   operationStartDate,
  //   modelStartDate,
  //   operationEndDate,
  //   decommissioningEndDate
  // });
  // const siteSecurityCost = calcSiteSecurity({
  //   initialCapacity,
  //   inflationInputs,
  //   modelStartDate,
  //   operationStartDate,
  //   operationEndDate,
  //   decommissioningEndDate,
  //   siteSecurity
  // });
  // const decommissioning_cost = calcDecommissiongCosts({
  //   costOfAdditions,
  //   length_of_construction,
  //   modelStartDate,
  //   developmentStartDate,
  //   constructionStartDate,
  //   operationStartDate,
  //   decommissioningStartDate,
  //   decommissioningEndDate,
  //   length_of_decommissioning
  // }).decommissioning_cost;
  // const extended_warranty_cost = calcExtendedWarranty({
  //   extended_warranty,
  //   battery_duration,
  //   revenueSetup,
  //   assumptionsData,
  //   detailedRevenueData,
  //   initialCycleData,
  //   initialCapacity,
  //   startingAssumptionsForBatteries,
  //   batteryDisposals,
  //   batteryEfficiency,
  //   batteryAugmentation,
  //   model,
  //   batteryDuration,
  //   batteryCubes,
  //   batteryExCubes,
  //   inflationInputs,
  //   capexPaymentsProfile,
  //   capexPaymentMilestones,
  //   capexUEL,
  //   bessCapexForecast,
  //   batterySensitivity,
  //   operationYears,
  //   modelStartDate,
  //   operationStartDate,
  //   decommissioningStartDate,
  //   decommissioningEndDate,
  //   vintage
  // });
  // const intercompanyExpense = calcIntercompanyExpense({
  //   intercompany_expense,
  //   inflationInputs,
  //   modelStartDate,
  //   operationStartDate,
  //   decommissioningStartDate,
  //   decommissioningEndDate,
  //   opexSensitivity
  // });
  // const easementCosts = calcEasementCosts({
  //   easement_costs,
  //   inflationInputs,
  //   modelStartDate,
  //   operationStartDate,
  //   decommissioningStartDate,
  //   decommissioningEndDate,
  //   battery_duration,
  //   opexSensitivity
  // });
  // const national_grid_security_premium_fees = calcNationalGridSecurities({
  //   national_grid_securities,
  //   variable_profile_for_attributable_costs,
  //   modelStartDate,
  //   fullyConsentedDate,
  //   developmentStartDate,
  //   operationStartDate,
  //   decommissioningStartDate,
  //   decommissioningEndDate
  // }).securities_premium_fee;
  // const waterRates = calcWaterRates({
  //   water_rates,
  //   inflationInputs,
  //   modelStartDate,
  //   operationStartDate,
  //   decommissioningStartDate,
  //   decommissioningEndDate,
  //   opexSensitivity
  // });
  // const totalAdminCost = roundArray(
  //   landRentToProfitAndLoss.map(
  //     (d, index) =>
  //       d +
  //       businessRatesCost[index] +
  //       communityBenefitCost[index] +
  //       assetManagementCost[index] +
  //       insuranceCost[index] +
  //       legalCost[index] +
  //       operationAndManagementCost[index] +
  //       otherAdminCost[index] +
  //       siteSecurityCost[index] +
  //       decommissioning_cost[index] +
  //       extended_warranty_cost[index] +
  //       intercompanyExpense[index] +
  //       easementCosts[index] +
  //       national_grid_security_premium_fees[index] +
  //       waterRates[index]
  //   ),
  //   2
  // );
  const totalAdminCost: number[] = sumArrays(
    assetMExpense,
    businessRatesExpense,
    communityBenefitExpense,
    insuranceExpense,
    landRentExpense.rentToProfit,
    legalExpense,
    oAndMExpense,
    otherAdminExpense,
    siteSecurityExpense,
    extendedWarrantyExpense,
    intercompanyExp,
    easementExpnese,
    decommissioningCosts.decommissioning_cost,
    waterRatesExpense,
    nGSecurities.securities_premium_fee
  );
  return totalAdminCost;
}
