// Calcs 23 Capex creditor
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
  DEFAULT_SHARED_YEAR_ROUND_TARIFF_DATA
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
  DEFAULT_VINTAGE
} from '../../calculates/constant';
import {
  arraySum,
  calcDaysInMonth,
  calcVintages,
  getAsAPercentOfPeriod,
  getMonthsNumberFromModelStartDate,
  multiplyArrays,
  multiplyNumber,
  roundArray,
  sumArrays
} from '../../calculates/utils';
import { calcCapitalExpenditure } from '../capital_expenditure';
import {
  DEFAULT_BALANCE_OF_PLANT_ADDITIONS,
  DEFAULT_CAPITAL_EXPENDITURE,
  DEFAULT_DEVEX_ADDITIONS,
  DEFAULT_EV_ADDITIONS,
  DEFAULT_LAND_ADDITIONS,
  DEFAULT_POOLING_SUBSTATION_ADDITIONS,
  DEFAULT_TRANSFORMERS_ADDITIONS,
  DEFAULT_VAT,
  DEFAULT_WORKING_CAPITAL
} from '../constant';
import { ICapitalExpenditure, IWrokingCapital, Ivat } from '../type';
import { calcTradeCreditors } from './movement_in_trade_creditors';
import { calcTradeDebtors } from './movement_in_trade_debtors';

export function calcCapexCreditor({
  // developmentFeePaymentPercentageProfile = DEFAULT_DEVELOPMENT_FEE_PAYMENT_PROFILE,
  // developmentFeePaymentDateProfile = DEFAULT_DEVELOPMENT_FEE_PAYMENT_DATES,
  // working_capital = DEFAULT_WORKING_CAPITAL,
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
  decommissioningStartDate = '2068-01-01',
  developmentStartDate = '2023-07-01',
  vintage = DEFAULT_VINTAGE,
  landAdditions = DEFAULT_LAND_ADDITIONS,
  poolingSubstationAdditions = DEFAULT_POOLING_SUBSTATION_ADDITIONS,
  transformersAdditions = DEFAULT_TRANSFORMERS_ADDITIONS,
  balanceOfPlantAdditions = DEFAULT_BALANCE_OF_PLANT_ADDITIONS,
  evAdditions = DEFAULT_EV_ADDITIONS,
  devexAdditions = DEFAULT_DEVEX_ADDITIONS,
  landRentExpense = DEFAULT_LAND_RENT_EXEPNESE,
  capitalExpenditure = DEFAULT_CAPITAL_EXPENDITURE
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
  landAdditions?: number[];
  poolingSubstationAdditions?: number[];
  transformersAdditions?: number[];
  balanceOfPlantAdditions?: number[];
  evAdditions?: number[];
  devexAdditions?: number[];
  landRentExpense?: ILandRentExpense;
  capitalExpenditure?: ICapitalExpenditure;
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

  // Calcs ~~~ 19 Fixed assets ~~~ 19.02 Cash payments
  // Capex provision length
  // Calcs ~~~ 26 Capex provisioin ~~~ 26.01 Accrual
  // Forecast cash payments
  const vintagesData = vintage.vintages;
  let vintagesAdditionsCost: number[] =
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
  const vintagesGrossCashPayments = vintagesAdditionsCost.map(
    (d) => -d * (1 + vat.vatRate / 100)
  );

  const landGrossCashPayments = landAdditions.map(
    (d) => -d * (1 + vat.vatRate / 100)
  );
  const poolingSubstationGrossCashPayments = poolingSubstationAdditions.map(
    (d) => -d * (1 + vat.vatRate / 100)
  );

  const transformersGrossCashPayments = transformersAdditions.map(
    (d) => -d * (1 + vat.vatRate / 100)
  );
  const balanceOfPlantGrossCashPayments = balanceOfPlantAdditions.map(
    (d) => -d * (1 + vat.vatRate / 100)
  );
  const enterpriseValueGrossCashPayments = multiplyNumber(evAdditions, -1);

  const capitalisedRentGrossCashPayments =
    landRentExpense.rentToFixedAssets.map((d) => d * (1 + vat.vatRate / 100));
  const devexGrossCashPayments = devexAdditions.map(
    (d) => -d * (1 + vat.vatRate / 100)
  );
  // total_cash_payment is used in movement in capex creditor
  const total_cash_payment = sumArrays(
    vintagesGrossCashPayments,
    landGrossCashPayments,
    poolingSubstationGrossCashPayments,
    transformersGrossCashPayments,
    balanceOfPlantGrossCashPayments,
    enterpriseValueGrossCashPayments,
    capitalisedRentGrossCashPayments,
    devexGrossCashPayments
  );
  // 23.01 Accrual ~~~ Net costs

  const total_additions = capitalExpenditure.capexExpenditure;
  const less_development_fee = multiplyNumber(evAdditions, -1);
  const net_additions = sumArrays(total_additions, less_development_fee);

  // 23.01 Accrual ~~~ VAT on costs

  const effectiveVATRateOnCosts =
    ((vat.vatRate / 100) * vat.percentageOfRevenueSubjectToVAT) / 100;

  const net_costs = net_additions;
  const vat_on_costs = multiplyNumber(net_costs, effectiveVATRateOnCosts);

  const gross_costs = sumArrays(net_costs, vat_on_costs);

  // 23.02 Cash payment
  const development_fee = evAdditions;
  const net_cash_payment = sumArrays(total_cash_payment, development_fee);

  // 23.03 Control account
  const capex_creditors_start_balance = [];
  capex_creditors_start_balance[0] = 0;
  const accrual = multiplyArrays([
    developmentToDecommissioningFlag,
    multiplyNumber(gross_costs, -1)
  ]);
  const cash_payments = multiplyArrays([
    developmentToDecommissioningFlag,
    multiplyNumber(net_cash_payment, -1)
  ]);
  const capex_creditors_end_balance = [];
  const movement_in_working_capital = [];

  for (let i = 0; i < period; i++) {
    capex_creditors_end_balance[i] =
      capex_creditors_start_balance[i] + accrual[i] + cash_payments[i];
    if (i < period - 1)
      capex_creditors_start_balance[i + 1] = capex_creditors_end_balance[i];
    movement_in_working_capital[i] =
      -developmentToDecommissioningFlag[i] *
      (capex_creditors_end_balance[i] - capex_creditors_start_balance[i]);
  }

  return {
    capex_creditor_for_balance_sheet: capex_creditors_end_balance,
    movement_in_working_capital: roundArray(movement_in_working_capital, 3),
    vat_on_costs: vat_on_costs
  };
}
