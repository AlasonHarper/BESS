import {
  annualIndexToMonths,
  arraySum,
  calcVintages,
  getAsAPercentOfPeriod,
  getMonthsNumberFromModelStartDate,
  multiplyArrays,
  multiplyNumber,
  normalizeArray,
  sumMonthlyValues
} from '../calculates/utils';
//   import { DEFAULT_CORPORATION_TAX } from "../calculates/constant";
import {
  DEFAULT_ASSET_MANAGEMENT,
  DEFAULT_BUSINESS_RATES,
  DEFAULT_COMMUNITY_BENEFIT,
  DEFAULT_EXTENDED_WARRANTY,
  DEFAULT_INSURANCE,
  DEFAULT_LAND_RENT,
  DEFAULT_LAND_RENT_EXEPNESE,
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
  ILandRentExpense,
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
  DEFAULT_SHARED_YEAR_ROUND_TARIFF_DATA
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
  DEFAULT_INFLATION_INPUTS,
  DEFAULT_INITIAL_CYCLE_DATA,
  DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  DEFAULT_REVENUE_SETUP,
  DEFAULT_STARTING_BATTERY_ASSUMPTION,
  DEFAULT_VINTAGE
} from '../calculates/constant';
import { roundArray, sumArrays } from '../calculates/utils';
import { calcEBIT } from '../calculates/ebit';
import { calcLandRentToPL } from '../calculates/Administrative costs/land_rent';
import { calcLandAdditions } from '../Balance sheet/Non current asset/Fixed asset/land';
import { calcPoolingSubstationAdditions } from '../Balance sheet/Non current asset/Fixed asset/pooling_substation';
import { calcTransformersAdditions } from '../Balance sheet/Non current asset/Fixed asset/transformers';
import { calcBalacneOfPlantAdditions } from '../Balance sheet/Non current asset/Fixed asset/balance_of_plant';
import {
  DEFAULT_DEVELOPMENT_FEE_PAYMENT_DATES,
  DEFAULT_DEVELOPMENT_FEE_PAYMENT_PROFILE
} from '../Balance sheet/constant';
import {
  IDevFeePaymentDates,
  IDevFeePaymentProfile
} from '../Balance sheet/type';
import { calcEnterpriseValueAdditions } from '../Balance sheet/Non current asset/Fixed asset/enterprise_value';
import { calcDevexAdditions } from '../Balance sheet/Non current asset/Fixed asset/devex';
import {
  DEFAULT_BALANCE_OF_PLANT_ADDITIONS,
  DEFAULT_DEVEX_ADDITIONS,
  DEFAULT_EV_ADDITIONS,
  DEFAULT_LAND_ADDITIONS,
  DEFAULT_POOLING_SUBSTATION_ADDITIONS,
  DEFAULT_TRANSFORMERS_ADDITIONS
} from './constant';

export function calcCapitalExpenditure({
  modelStartDate = '2023-01-01',
  developmentStartDate = '2023-07-01',
  decommissioningEndDate = '2068-06-30',
  vintage = DEFAULT_VINTAGE,
  landAdditions = DEFAULT_LAND_ADDITIONS,
  poolingSubstationAdditions = DEFAULT_POOLING_SUBSTATION_ADDITIONS,
  transformersAdditions = DEFAULT_TRANSFORMERS_ADDITIONS,
  balanceOfPlantAdditions = DEFAULT_BALANCE_OF_PLANT_ADDITIONS,
  evAdditions = DEFAULT_EV_ADDITIONS,
  devexAdditions = DEFAULT_DEVEX_ADDITIONS,
  landRentExpense = DEFAULT_LAND_RENT_EXEPNESE
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
  landAdditions?: number[];
  poolingSubstationAdditions?: number[];
  transformersAdditions?: number[];
  balanceOfPlantAdditions?: number[];
  evAdditions?: number[];
  devexAdditions?: number[];
  landRentExpense?: ILandRentExpense;
}) {
  const period =
    getMonthsNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  // vintagesAdditionsCost Calcs 19 Fixed assets ~~~ 19.01 Additions ~~~ Forecast additions

  const vintagesData = vintage.vintages;
  let vintagesAdditionsCost =
    vintagesData[0].data.forecastAdditionsByMilestones;
  const numberOfVintages = vintagesData.length;
  for (let i = 1; i < numberOfVintages; i++) {
    if (vintagesData[i].data.stagingMonthNumber == 0) break;
    else
      vintagesAdditionsCost = arraySum(
        vintagesAdditionsCost,
        vintagesData[i].data.forecastAdditionsByMilestones
      );
  }

  // land, pooling, ...

  const enterpriseValueAdditions = evAdditions;

  const capitalisedRent = multiplyNumber(landRentExpense.rentToFixedAssets, -1);

  const capexExcludingBatteries = sumArrays(
    landAdditions,
    poolingSubstationAdditions,
    capitalisedRent,
    devexAdditions,
    transformersAdditions,
    balanceOfPlantAdditions,
    enterpriseValueAdditions
  );

  // developmentToDecommissioningFlag

  const developmentToDecommissioningFlag = getAsAPercentOfPeriod(
    modelStartDate,
    developmentStartDate,
    decommissioningEndDate,
    decommissioningEndDate
  );

  const capexExpenditure = arraySum(
    capexExcludingBatteries,
    normalizeArray(vintagesAdditionsCost, period, 0)
  );
  // capexExpenditure is the calculation of FS_M ~~~ 1 Cashflow ~~~ capital expenditure
  const capexExpenditureForCashflow = developmentToDecommissioningFlag.map(
    (d, index) => -d * capexExpenditure[index]
  );

  const total_additions = arraySum(
    capexExcludingBatteries,
    vintagesAdditionsCost
  );
  // arraySum(capexExcludingBatteries, vintagesAdditionsCost) is used for fixed assets additions.
  return {
    fixed_assets_additions_for_balance_sheet: total_additions,
    capexExpenditure: capexExpenditure,
    capexExpenditureForCashflow: capexExpenditureForCashflow
  };
}
