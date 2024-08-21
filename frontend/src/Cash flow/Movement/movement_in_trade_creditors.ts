import {
  DEFAULT_ASSET_MANAGEMENT,
  DEFAULT_BUSINESS_RATES,
  DEFAULT_COMMUNITY_BENEFIT,
  DEFAULT_DECOMMSSIONING_COSTS,
  DEFAULT_EXTENDED_WARRANTY,
  DEFAULT_INSURANCE,
  DEFAULT_LAND_RENT,
  DEFAULT_LAND_RENT_EXEPNESE,
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
  IDecommissioningCosts,
  IExtendedWarranty,
  ILandRent,
  ILandRentExpense,
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
  DEFAULT_TOTAL_ADMIN_COSTS,
  DEFAULT_TOTAL_COGS,
  DEFAULT_VINTAGE
} from '../../calculates/constant';
import {
  calcDaysInMonth,
  getAsAPercentOfPeriod,
  getMonthsNumberFromModelStartDate,
  multiplyArrays,
  multiplyNumber,
  roundArray,
  sumArrays
} from '../../calculates/utils';
import { DEFAULT_VAT, DEFAULT_WORKING_CAPITAL } from '../constant';
import { IWrokingCapital, Ivat } from '../type';

// Calcs 22 Trade creditors
export function calcTradeCreditors({
  working_capital = DEFAULT_WORKING_CAPITAL,
  vat = DEFAULT_VAT,
  // corporationTax = DEFAULT_CORPORATION_TAX,
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
  modelStartDate = '2023-01-01',
  operationStartDate = '2028-01-01',
  decommissioningEndDate = '2068-06-30',
  // decommissioningStartDate = '2068-01-01',
  developmentStartDate = '2023-07-01',
  // length_of_construction = 12,
  // length_of_decommissioning = 6,
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
  // opex_sensitivity = 0,
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
  totalCoGS = DEFAULT_TOTAL_COGS,
  totalAdminCosts = DEFAULT_TOTAL_ADMIN_COSTS,
  landRentExpense = DEFAULT_LAND_RENT_EXEPNESE,
  decommissioningCosts = DEFAULT_DECOMMSSIONING_COSTS
}: {
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
  totalCoGS?: number[];
  totalAdminCosts?: number[];
  landRentExpense?: ILandRentExpense;
  decommissioningCosts?: IDecommissioningCosts;
}) {
  const period =
    getMonthsNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  const operatingFlag = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    decommissioningEndDate,
    decommissioningEndDate
  );
  const developmentToDecommissioningFlag = getAsAPercentOfPeriod(
    modelStartDate,
    developmentStartDate,
    decommissioningEndDate,
    decommissioningEndDate
  );
  // 22.01 Costs for trade creditors calculation ~~~ Net costs

  const effectiveVATRateOnCosts =
    ((vat.vatRate / 100) * vat.percentageOfRevenueSubjectToVAT) / 100;

  // const total_cost_of_sales = calcTotalCostOfSales({
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
  //   // sensitivities,
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
  const total_administrative_expenses = totalAdminCosts;
  const less_land_rent = multiplyNumber(landRentExpense.rentToProfit, -1);
  const less_decommissioning_costs_provision = multiplyNumber(
    decommissioningCosts.decommissioning_cost,
    -1
  );

  const net_costs = sumArrays(
    total_administrative_expenses,
    totalCoGS,
    less_land_rent,
    less_decommissioning_costs_provision
  );

  const vat_on_costs = multiplyNumber(net_costs, effectiveVATRateOnCosts);

  const gross_costs = sumArrays(net_costs, vat_on_costs);

  // 22.02 Days calculation

  const creditor_days_assumption = working_capital.creditor_days;
  const numberOfDaysInMonth = calcDaysInMonth(
    '2023-01-02',
    decommissioningEndDate
  );

  const number_of_days_of_creditors_relating_to_month = numberOfDaysInMonth.map(
    (d, index) => Math.min(d, creditor_days_assumption) * operatingFlag[index]
  );

  const number_of_days_of_creditors_relating_to_month_1 = [];
  const number_of_days_of_creditors_relating_to_month_2 = [];
  const number_of_days_of_creditors_relating_to_month_3 = [];

  for (let i = 0; i < period; i++) {
    if (i == 0) {
      number_of_days_of_creditors_relating_to_month_1[i] = 0;
      number_of_days_of_creditors_relating_to_month_2[i] = 0;
      number_of_days_of_creditors_relating_to_month_3[i] = 0;
    } else if (i == 1) {
      number_of_days_of_creditors_relating_to_month_1[i] =
        Math.min(
          creditor_days_assumption -
            number_of_days_of_creditors_relating_to_month[i],
          numberOfDaysInMonth[i - 1]
        ) * operatingFlag[i];
      number_of_days_of_creditors_relating_to_month_2[i] = 0;
      number_of_days_of_creditors_relating_to_month_3[i] = 0;
    } else if (i == 2) {
      number_of_days_of_creditors_relating_to_month_1[i] =
        Math.min(
          creditor_days_assumption -
            number_of_days_of_creditors_relating_to_month[i],
          numberOfDaysInMonth[i - 1]
        ) * operatingFlag[i];
      number_of_days_of_creditors_relating_to_month_2[i] =
        Math.min(
          creditor_days_assumption -
            number_of_days_of_creditors_relating_to_month[i] -
            number_of_days_of_creditors_relating_to_month_1[i],
          numberOfDaysInMonth[i - 2]
        ) * operatingFlag[i];
      number_of_days_of_creditors_relating_to_month_3[i] = 0;
    } else {
      number_of_days_of_creditors_relating_to_month_1[i] =
        Math.min(
          creditor_days_assumption -
            number_of_days_of_creditors_relating_to_month[i],
          numberOfDaysInMonth[i - 1]
        ) * operatingFlag[i];
      number_of_days_of_creditors_relating_to_month_2[i] =
        Math.min(
          creditor_days_assumption -
            number_of_days_of_creditors_relating_to_month[i] -
            number_of_days_of_creditors_relating_to_month_1[i],
          numberOfDaysInMonth[i - 2]
        ) * operatingFlag[i];
      number_of_days_of_creditors_relating_to_month_3[i] =
        Math.min(
          creditor_days_assumption -
            number_of_days_of_creditors_relating_to_month[i] -
            number_of_days_of_creditors_relating_to_month_1[i] -
            number_of_days_of_creditors_relating_to_month_2[i],
          numberOfDaysInMonth[i - 3]
        ) * operatingFlag[i];
    }
  }

  // 22.03 Closing trade creditors

  const costs_per_day = gross_costs.map(
    (d, index) => d / numberOfDaysInMonth[index]
  );

  const closing_creditors_relating_to_sales_in_month = multiplyArrays([
    costs_per_day,
    number_of_days_of_creditors_relating_to_month
  ]);

  const closing_creditors_relating_to_sales_in_month_1 = [];
  const closing_creditors_relating_to_sales_in_month_2 = [];
  const closing_creditors_relating_to_sales_in_month_3 = [];

  for (let i = 0; i < period; i++) {
    if (i == 0) {
      closing_creditors_relating_to_sales_in_month_1[i] = 0;
      closing_creditors_relating_to_sales_in_month_2[i] = 0;
      closing_creditors_relating_to_sales_in_month_3[i] = 0;
    } else if (i == 1) {
      closing_creditors_relating_to_sales_in_month_1[i] =
        costs_per_day[i - 1] *
        number_of_days_of_creditors_relating_to_month_1[i];
      closing_creditors_relating_to_sales_in_month_2[i] = 0;
      closing_creditors_relating_to_sales_in_month_3[i] = 0;
    } else if (i == 2) {
      closing_creditors_relating_to_sales_in_month_1[i] =
        costs_per_day[i - 1] *
        number_of_days_of_creditors_relating_to_month_1[i];
      closing_creditors_relating_to_sales_in_month_2[i] =
        costs_per_day[i - 2] *
        number_of_days_of_creditors_relating_to_month_2[i];
      closing_creditors_relating_to_sales_in_month_3[i] = 0;
    } else {
      closing_creditors_relating_to_sales_in_month_1[i] =
        costs_per_day[i - 1] *
        number_of_days_of_creditors_relating_to_month_1[i];
      closing_creditors_relating_to_sales_in_month_2[i] =
        costs_per_day[i - 2] *
        number_of_days_of_creditors_relating_to_month_2[i];
      closing_creditors_relating_to_sales_in_month_3[i] =
        costs_per_day[i - 3] *
        number_of_days_of_creditors_relating_to_month_3[i];
    }
  }
  const total_closing_trade_creditors = sumArrays(
    closing_creditors_relating_to_sales_in_month,
    closing_creditors_relating_to_sales_in_month_1,
    closing_creditors_relating_to_sales_in_month_2,
    closing_creditors_relating_to_sales_in_month_3
  );

  // Calcs 20 Trade creditors 20.04 Control account

  const trade_creditors_start_balance = [];
  trade_creditors_start_balance[0] = 0;
  const trade_creditors_end_balance = multiplyArrays([
    total_closing_trade_creditors,
    developmentToDecommissioningFlag
  ]);
  const cash_payments = [];

  const movement_in_working_capital = [];

  for (let i = 0; i < period; i++) {
    cash_payments[i] =
      trade_creditors_end_balance[i] -
      (gross_costs[i] + trade_creditors_start_balance[i]) *
        developmentToDecommissioningFlag[i];
    movement_in_working_capital[i] =
      -(trade_creditors_end_balance[i] - trade_creditors_start_balance[i]) *
      developmentToDecommissioningFlag[i];
    if (i != period - 1)
      trade_creditors_start_balance[i + 1] =
        trade_creditors_end_balance[i] *
        developmentToDecommissioningFlag[i + 1];
  }
  return {
    trade_creditors_for_balance_sheet: trade_creditors_end_balance,
    movement_in_working_capital: roundArray(movement_in_working_capital, 3),
    vat_on_costs: vat_on_costs
  };
}
