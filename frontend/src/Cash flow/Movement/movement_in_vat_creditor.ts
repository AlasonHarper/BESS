// Calcs 24 VAT creditor
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
  calcDaysInMonth,
  getAsAPercentOfPeriod,
  getMonthsNumberFromModelStartDate,
  multiplyArrays,
  multiplyNumber,
  roundArray,
  sumArrays
} from '../../calculates/utils';
import {
  DEFAULT_CAPEX_CREDITOR,
  DEFAULT_MOVEMENT_IN_TRADE_CREDITOR,
  DEFAULT_MOVEMENT_IN_TRADE_DEBTOR,
  DEFAULT_VAT,
  DEFAULT_WORKING_CAPITAL
} from '../constant';
import {
  ICapexCreditor,
  IMovementInTradeCreditor,
  IMovementInTradeDebtor,
  IWrokingCapital,
  Ivat
} from '../type';
import { calcCapexCreditor } from './movement_in_capex_creditor';
import { calcTradeCreditors } from './movement_in_trade_creditors';
import { calcTradeDebtors } from './movement_in_trade_debtors';

export function calcVATCreditor({
  vat = DEFAULT_VAT,
  modelStartDate = '2023-01-01',
  operationStartDate = '2028-01-01',
  decommissioningEndDate = '2068-06-30',
  decommissioningStartDate = '2068-01-01',
  developmentStartDate = '2023-07-01',
  movementInTradeCreditor = DEFAULT_MOVEMENT_IN_TRADE_CREDITOR,
  movementInTradeDebtor = DEFAULT_MOVEMENT_IN_TRADE_DEBTOR,
  capexCreditor = DEFAULT_CAPEX_CREDITOR
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
  movementInTradeCreditor?: IMovementInTradeCreditor;
  movementInTradeDebtor?: IMovementInTradeDebtor;
  capexCreditor?: ICapexCreditor;
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
  // 24.01 VAT accrued

  const output_vat_on_revenue = movementInTradeDebtor.vat_on_revenue;

  const input_vat_on_costs = movementInTradeCreditor.vat_on_costs;

  const input_vat_on_capex = multiplyNumber(capexCreditor.vat_on_costs, -1);
  const net_vat_accrued = sumArrays(
    output_vat_on_revenue,
    input_vat_on_costs,
    input_vat_on_capex
  );
  // 24.02 VAT payments ~~~ Quarterly payments

  const quarterly_payment_flag = [];
  for (let i = 0; i < period; i++) {
    if (i % 3 == 2) quarterly_payment_flag[i] = 1;
    else quarterly_payment_flag[i] = 0;
  }
  const quarterly_vat_payment = [];

  // 24.02 VAT payments ~~~ Monthly payments on account

  const monthly_payments_on_account = vat.monthlyPaymentsOnAccount;
  const monthly_payments_on_account_negative = -vat.monthlyPaymentsOnAccount;
  const monthly_payments_on_account_forecasts = quarterly_payment_flag.map(
    (d, index) =>
      (1 - d) *
      monthly_payments_on_account_negative *
      developmentToDecommissioningFlag[index]
  );
  const total_vat_payments = [];
  // 24.02 Control account

  const vat_creditors_start_balance = [];
  vat_creditors_start_balance[0] = 0;
  const vat_accrued = multiplyNumber(
    multiplyArrays([net_vat_accrued, developmentToDecommissioningFlag]),
    -1
  );
  const vat_paid = [];
  const vat_creditors_end_balance = [];
  const movement_in_working_capital = [];

  for (let i = 0; i < period; i++) {
    quarterly_vat_payment[i] =
      vat_creditors_start_balance[i] *
      quarterly_payment_flag[i] *
      developmentToDecommissioningFlag[i];
    total_vat_payments[i] =
      quarterly_vat_payment[i] + monthly_payments_on_account_forecasts[i];
    vat_paid[i] = -total_vat_payments[i] * developmentToDecommissioningFlag[i];
    vat_creditors_end_balance[i] =
      vat_creditors_start_balance[i] + vat_accrued[i] + vat_paid[i];

    movement_in_working_capital[i] =
      -(vat_creditors_end_balance[i] - vat_creditors_start_balance[i]) *
      developmentToDecommissioningFlag[i];
    if (i < period - 1)
      vat_creditors_start_balance[i + 1] =
        vat_creditors_end_balance[i] * developmentToDecommissioningFlag[i + 1];
  }
  return {
    movement_in_working_capital: roundArray(movement_in_working_capital, 3),
    vat_creditor_for_balance_sheet: vat_creditors_end_balance
  };
}
