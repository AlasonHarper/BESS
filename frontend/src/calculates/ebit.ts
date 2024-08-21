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
  DEFAULT_SITE_SECURITY,
  DEFAULT_TOTAL_REVENUE
} from './Administrative costs/constant';
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
} from './Administrative costs/type';
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
  IRevenueSetup,
  IStartingBatteryAssumptions,
  IVintage
} from './Revenue/type';
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
  DEFAULT_TOTAL_ADMIN_COSTS,
  DEFAULT_TOTAL_COGS,
  DEFAULT_TOTAL_DEPRECIATION,
  DEFAULT_VINTAGE
} from './constant';
import { roundArray, sumArrays } from '../calculates/utils';

export function calcEBIT({
  // landRent = DEFAULT_LAND_RENT,
  // landSize = 75,
  // operationEndDate = '2067-12-31',
  // constructionStartDate = '2027-01-01',
  // // costOfAdditions comes from fixed~~ 7 Capex~~~7.03~7.10
  // costOfAdditions = DEFAULT_COST_OF_ADDITIONS,
  // revenueSetup = DEFAULT_REVENUE_SETUP,
  // assumptionsData = DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  // detailedRevenueData = DEFAULT_DETAILED_REVENUE_DATA,
  // initialCycleData = DEFAULT_INITIAL_CYCLE_DATA,
  // initialCapacity = 1000,
  // startingAssumptionsForBatteries = DEFAULT_STARTING_BATTERY_ASSUMPTION,
  // batteryDisposals = DEFAULT_BATTERY_DISPOSAL,
  // batteryEfficiency = DEFAULT_BATTERY_EFFICIENCY,
  // batteryAugmentation = DEFAULT_BATTERY_AUGMENTATION,
  // model = 'Conservative',
  // batteryDuration = 4,
  // batteryCubes = DEFAULT_BATTERY_CUBES,
  // batteryExCubes = DEFAULT_BATTERY_EXCUBES,
  // inflationInputs = DEFAULT_INFLATION_INPUTS,
  // capexPaymentsProfile = DEFAULT_CAPEX_PAYMENTS_PROFILE,
  // capexPaymentMilestones = DEFAULT_CAPEX_PAYMENT_MILESTONES,
  // capexUEL = DEFAULT_CAPEX_UEL,
  // bessCapexForecast = DEFAULT_BESS_CAPEX_FORECAST,
  // batterySensitivity = 0,
  // operationYears = 40,
  // capexSensitivity = 0,
  // modelStartDate = '2023-01-01',
  // operationStartDate = '2028-01-01',
  // decommissioningEndDate = '2068-06-30',
  // decommissioningStartDate = '2068-01-01',
  // meteringSettings = DEFAULT_METERING,
  // auxilliaryLossesSettings = DEFAULT_AUXILLIARY,
  // systemPeakTariffData = DEFAULT_SYSTEM_PEAK_TARIFF_DATA,
  // sharedYearRoundTariffData = DEFAULT_SHARED_YEAR_ROUND_TARIFF_DATA,
  // notSharedYearRoundTariffData = DEFAULT_NOT_SHARED_YEAR_ROUND_TARIFF_DATA,
  // ajdustmentTariffData = DEFAULT_ADJUSTMENT_TARIFF_Data,
  // exportChargesOfTNUoS = DEFAULT_EXPORT_CHARGES_OF_TNUOS,
  // localSubstationTariff = DEFAULT_LOCAL_SUBSTATION_TARIFF,
  // localSubstationSwitch = 0,
  // localCircuitsData = DEFAULT_LOCAL_CIRCUITS,
  // battery_duration = 4,
  // extended_warranty = DEFAULT_EXTENDED_WARRANTY,
  // siteSecurity = DEFAULT_SITE_SECURITY,
  // otherAdministrativeCosts = DEFAULT_OTHER_ADMIN_COSTs,
  // legalCosts = DEFAULT_LEGAL_COST,
  // insurance = DEFAULT_INSURANCE,
  // communityBenefit = DEFAULT_COMMUNITY_BENEFIT,
  // averageWholeSaleDayAheadPrice = DEFAULT_AVERAGE_WHOLESALE_DAY_AHEAD_PRICE,
  // businessRates = DEFAULT_BUSINESS_RATES,
  // assetManagement = DEFAULT_ASSET_MANAGEMENT,
  // revenueSensitivity = 0,
  // operationAndManagementSettings = DEFAULT_O_AND_M,
  // constraintFactor = 100,
  // opexSensitivity = 0,
  // vintage = DEFAULT_VINTAGE,
  totalRevenue = DEFAULT_TOTAL_REVENUE,
  totalCoGS = DEFAULT_TOTAL_COGS,
  totalAdminCosts = DEFAULT_TOTAL_ADMIN_COSTS,
  totalDepreciation = DEFAULT_TOTAL_DEPRECIATION
}: {
  // costOfAdditions?: ICostOfAdditions;
  // capexSensitivity?: number;
  // extended_warranty?: IExtendedWarranty;
  // siteSecurity?: ISiteSecurity;
  // otherAdministrativeCosts?: IOtherAdminCosts;
  // legalCosts?: ILegalCost;
  // landRent?: ILandRent;
  // landSize?: number;
  // insurance?: IInsurance;
  // communityBenefit?: ICommunityBenefit;
  // businessRates?: IBusinessRates;
  // assetManagement?: IAssetManagement;
  // operationAndManagementSettings?: IOAndM[];
  // constraintFactor?: number;
  // battery_duration?: number;
  // operationEndDate?: string;
  // constructionStartDate?: string;
  // opexSensitivity?: number;
  // optimiser?: IOptimiser;
  // meteringSettings?: IMetering;
  // auxilliaryLossesSettings?: IAuxilliaryLosses;
  // averageWholeSaleDayAheadPrice?: number[];
  // revenueSensitivity?: number;
  // revenueSetup?: IRevenueSetup;
  // assumptionsData?: IAssumptionData[];
  // detailedRevenueData?: IDetailedRevenueData[];
  // initialCycleData?: ICycleData[];
  // startingAssumptionsForBatteries?: IStartingBatteryAssumptions;
  // batteryDisposals?: IBatteryDisposal;
  // batteryEfficiency?: IBatteryEfficiency;
  // batteryAugmentation?: IBatteryAugmentation;
  // model?: string;
  // batteryDuration?: number;
  // batteryCubes?: IBatteryCubes;
  // batteryExCubes?: IBatteryExcubes;
  // inflationInputs?: IInflationForm[];
  // capexPaymentsProfile?: ICapexPaymentForm[];
  // capexPaymentMilestones?: ICapexPaymentMilestoneForm[];
  // capexUEL?: ICapexUELForm[];
  // bessCapexForecast?: IBessCapexForecast;
  // batterySensitivity?: number;
  // sharedYearRoundTariffData?: ISharedYearRoundTariffData[];
  // systemPeakTariffData?: ISystemTariffData[];
  // notSharedYearRoundTariffData?: INotSharedYearRoundTariffData[];
  // ajdustmentTariffData?: IAdjustmentTariffData[];
  // exportChargesOfTNUoS?: IExportChargesOfTNUoS;
  // localSubstationTariff?: ILocalSubstationTariff[];
  // localSubstationSwitch?: number;
  // initialCapacity?: number;
  // operationYears?: number;
  // modelStartDate?: string;
  // operationStartDate?: string;
  // decommissioningStartDate?: string;
  // decommissioningEndDate?: string;
  // localCircuitsData?: ILocalCircuits[];
  // vintage?: IVintage;
  totalRevenue?: number[];
  totalCoGS?: number[];
  totalAdminCosts?: number[];
  totalDepreciation?: number[];
}) {
  // const totalRevenue = calcTotalRevenue({
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
  //   modelStartDate,
  //   operationStartDate,
  //   decommissioningStartDate,
  //   decommissioningEndDate,
  //   vintage
  // });
  // const totalCoGS = calcTotalCostOfSales({
  //   meteringSettings,
  //   auxilliaryLossesSettings,
  //   averageWholeSaleDayAheadPrice,
  //   model,
  //   batteryCubes,
  //   batteryExCubes,
  //   capexPaymentsProfile,
  //   capexPaymentMilestones,
  //   capexUEL,
  //   bessCapexForecast,
  //   batterySensitivity,
  //   decommissioningStartDate,
  //   revenueSensitivity,
  //   batteryDuration,
  //   revenueSetup,
  //   assumptionsData,
  //   detailedRevenueData,
  //   initialCycleData,
  //   initialCapacity,
  //   startingAssumptionsForBatteries,
  //   batteryDisposals,
  //   batteryEfficiency,
  //   batteryAugmentation,
  //   inflationInputs,
  //   modelStartDate,
  //   decommissioningEndDate,
  //   operationStartDate,
  //   operationYears,
  //   systemPeakTariffData,
  //   sharedYearRoundTariffData,
  //   notSharedYearRoundTariffData,
  //   ajdustmentTariffData,
  //   exportChargesOfTNUoS,
  //   localSubstationTariff,
  //   localSubstationSwitch,
  //   localCircuitsData,
  //   vintage
  // });
  // const totalAdminCost = calcTotalAdminCosts({
  //   battery_duration,
  //   extended_warranty,
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
  //   siteSecurity,
  //   otherAdministrativeCosts,
  //   legalCosts,
  //   landRent,
  //   landSize,
  //   insurance,
  //   communityBenefit,
  //   averageWholeSaleDayAheadPrice,
  //   businessRates,
  //   assetManagement,
  //   revenueSensitivity,
  //   operationAndManagementSettings,
  //   constraintFactor,
  //   operationEndDate,
  //   constructionStartDate,
  //   opexSensitivity,
  //   batterySensitivity,
  //   operationYears,
  //   modelStartDate,
  //   operationStartDate,
  //   decommissioningStartDate,
  //   decommissioningEndDate,
  //   vintage
  // });
  return {
    ebit: roundArray(
      sumArrays(totalRevenue, totalCoGS, totalAdminCosts, totalDepreciation),
      2
    ),
    ebitda: roundArray(sumArrays(totalRevenue, totalCoGS, totalAdminCosts), 2)
  };
}
