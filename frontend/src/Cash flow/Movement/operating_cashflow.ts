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
  DEFAULT_DECOMMSSIONING_COSTS,
  DEFAULT_EXTENDED_WARRANTY,
  DEFAULT_INSURANCE,
  DEFAULT_LAND_RENT,
  DEFAULT_LEGAL_COST,
  DEFAULT_NG_SECURITIES,
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
  ILegalCost,
  INGSecurities,
  IOAndM,
  IOtherAdminCosts,
  ISiteSecurity
} from '../../calculates/Administrative costs/type';
import {
  DEFAULT_CORPORATION_TAX,
  DEFAULT_EBIT
} from '../../calculates/Cash flow/constant';
import { ICorporationTax, Iebit } from '../../calculates/Cash flow/type';
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
  IGainOnDisposal,
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
  DEFAULT_GAIN_ON_DISPOSAL,
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
import {
  DEFAULT_CAPEX_CREDITOR,
  DEFAULT_MOVEMENT_IN_PREPAYMENTS,
  DEFAULT_MOVEMENT_IN_TRADE_CREDITOR,
  DEFAULT_MOVEMENT_IN_TRADE_DEBTOR,
  DEFAULT_MOVEMENT_IN_VAT_CREDITOR,
  DEFAULT_NATIONAL_GRID_SECURITIES,
  DEFAULT_VARIABLE_PROFILE_FOR_ATTRIBUTABLE_COSTS,
  DEFAULT_VAT,
  DEFAULT_WORKING_CAPITAL
} from '../constant';
import {
  ICapexCreditor,
  IMovementInPrepayments,
  IMovementInTradeCreditor,
  IMovementInTradeDebtor,
  IMovementInVatCreditor,
  INationalGridSecurities,
  IVariableProfileForAttributableCosts,
  IWrokingCapital,
  Ivat
} from '../type';
import { calcCapexCreditor } from './movement_in_capex_creditor';
import { calcNationalGridSecurities } from './movement_in_escrow_account';
import { calcPrepayments } from './movement_in_prepayments';
import { calcTradeCreditors } from './movement_in_trade_creditors';
import { calcTradeDebtors } from './movement_in_trade_debtors';
import { calcVATCreditor } from './movement_in_vat_creditor';

export function calcOperatingCashFlow({
  ebit = DEFAULT_EBIT,
  movementInTradeCreditor = DEFAULT_MOVEMENT_IN_TRADE_CREDITOR,
  movementInTradeDebtor = DEFAULT_MOVEMENT_IN_TRADE_DEBTOR,
  gainOnDisposal = DEFAULT_GAIN_ON_DISPOSAL,
  decommissioningCosts = DEFAULT_DECOMMSSIONING_COSTS,
  nGSecurities = DEFAULT_NG_SECURITIES,
  movementInPrepayments = DEFAULT_MOVEMENT_IN_PREPAYMENTS,
  movementInVATCreditor = DEFAULT_MOVEMENT_IN_VAT_CREDITOR,
  capexCreditor = DEFAULT_CAPEX_CREDITOR
}: {
  ebit?: Iebit;
  movementInTradeCreditor?: IMovementInTradeCreditor;
  movementInTradeDebtor?: IMovementInTradeDebtor;
  gainOnDisposal?: IGainOnDisposal;
  decommissioningCosts?: IDecommissioningCosts;
  nGSecurities?: INGSecurities;
  movementInPrepayments?: IMovementInPrepayments;
  movementInVATCreditor?: IMovementInVatCreditor;
  capexCreditor?: ICapexCreditor;
}) {
  const forecast_ebitda = ebit.ebitda;
  const less_gain_loss_on_disposal = multiplyNumber(
    gainOnDisposal.gainOnDisposalRevenue,
    -1
  );
  const movement_in_trade_debtors =
    movementInTradeDebtor.movement_in_working_capital;
  const movement_in_prepayments =
    movementInPrepayments.movement_in_working_capital;
  const movement_in_trade_creditors =
    movementInTradeCreditor.movement_in_working_capital;
  const movement_in_capex_creditors = capexCreditor.movement_in_working_capital;
  const movement_in_vat_creditor =
    movementInVATCreditor.movement_in_working_capital;
  const movement_in_escrow_account =
    nGSecurities.national_grid_securities_for_cash_flow;
  const movement_in_decommissioning_provision =
    decommissioningCosts.movement_in_working_capital;
  const operating_cash_flow = sumArrays(
    forecast_ebitda,
    less_gain_loss_on_disposal,
    movement_in_capex_creditors,
    movement_in_trade_creditors,
    movement_in_trade_debtors,
    movement_in_prepayments,
    movement_in_vat_creditor,
    movement_in_escrow_account,
    movement_in_decommissioning_provision
  );
  return operating_cash_flow;
}
