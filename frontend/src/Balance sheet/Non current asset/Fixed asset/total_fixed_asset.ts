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
} from '../../../calculates/Administrative costs/constant';
import { calcTotalAdminCosts } from '../../../calculates/Administrative costs/total_admin_cost';
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
} from '../../../calculates/Administrative costs/type';
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
  DEFAULT_SHARED_YEAR_ROUND_TARIFF_DATA
} from '../../../calculates/CoGS/constant';
import { calcTotalCostOfSales } from '../../../calculates/CoGS/total_cost_of_sales';
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
} from '../../../calculates/CoGS/type';
import { DEFAULT_COST_OF_ADDITIONS } from '../../../calculates/Depreciation/constant';
import { calcTotalDepreciation } from '../../../calculates/Depreciation/total_depreciation';
import { ICostOfAdditions } from '../../../calculates/Depreciation/type';
import { calcTotalRevenue } from '../../../calculates/Revenue/total_revenue';
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
  IRevenueSetup,
  IStartingBatteryAssumptions,
  IVintage
} from '../../../calculates//Revenue/type';
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
  DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  DEFAULT_REVENUE_SETUP,
  DEFAULT_STARTING_BATTERY_ASSUMPTION,
  DEFAULT_TOTAL_DEPRECIATION,
  DEFAULT_VINTAGE
} from '../../../calculates//constant';
import {
  getMonthsNumberFromModelStartDate,
  roundArray,
  sumArrays
} from '../../../calculates//utils';
import { calcEBIT } from '../../../calculates//ebit';
import { calcLandRentToPL } from '../../../calculates//Administrative costs/land_rent';
import { calcLandAdditions } from '../../Non current asset/Fixed asset/land';

import { calcCapitalExpenditure } from '../../../Cash flow/capital_expenditure';
import { calcGainOnDisposal } from '../../../calculates//Revenue/gain_on_disposal_of_batteries';
import {
  DEFAULT_DEVELOPMENT_FEE_PAYMENT_DATES,
  DEFAULT_DEVELOPMENT_FEE_PAYMENT_PROFILE
} from '../../constant';
import { IDevFeePaymentDates, IDevFeePaymentProfile } from '../../type';
import { DEFAULT_CAPITAL_EXPENDITURE } from '../../../Cash flow/constant';
import { ICapitalExpenditure } from '../../../Cash flow/type';
// import { calcDevexAdditions } from "../Balance sheet/Non current asset/Fixed asset/devex";

export function fixedAssetsForBalanceSheet({
  modelStartDate = '2023-01-01',
  developmentStartDate = '2023-07-01',
  decommissioningEndDate = '2068-06-30',
  totalDepreciation = DEFAULT_TOTAL_DEPRECIATION,
  gainOnDisposal = DEFAULT_GAIN_ON_DISPOSAL,
  capitalExpenditure = DEFAULT_CAPITAL_EXPENDITURE
}: {
  developmentFeePaymentPercentageProfile?: IDevFeePaymentProfile;
  developmentFeePaymentDateProfile?: IDevFeePaymentDates;
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
  modelStartDate?: string;
  developmentStartDate?: string;
  operationStartDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
  localCircuitsData?: ILocalCircuits[];
  vintage?: IVintage;
  totalDepreciation?: number[];
  gainOnDisposal?: IGainOnDisposal;
  capitalExpenditure?: ICapitalExpenditure;
}) {
  const period =
    getMonthsNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  const developmentToDecommissioningFlag = [];
  const developmentStartDateMonthNumber =
    getMonthsNumberFromModelStartDate(modelStartDate, developmentStartDate) - 1;
  for (let i = 0; i < period; i++) {
    if (i < developmentStartDateMonthNumber)
      developmentToDecommissioningFlag[i] = 0;
    else developmentToDecommissioningFlag[i] = 1;
  }
  const fixed_assets_additions =
    capitalExpenditure.fixed_assets_additions_for_balance_sheet;
  const disposals = gainOnDisposal.bookValueAtPointOfDisposal;

  const fixed_assets_start_balance = [];
  fixed_assets_start_balance[0] = 0;
  const fixed_assets_end_balance = [];
  for (let i = 0; i < period; i++) {
    fixed_assets_end_balance[i] =
      fixed_assets_start_balance[i] -
      disposals[i] +
      fixed_assets_additions[i] +
      totalDepreciation[i];
    if (i < period - 1)
      fixed_assets_start_balance[i + 1] =
        fixed_assets_end_balance[i] * developmentToDecommissioningFlag[i + 1];
  }

  return roundArray(fixed_assets_end_balance, 2);
}
