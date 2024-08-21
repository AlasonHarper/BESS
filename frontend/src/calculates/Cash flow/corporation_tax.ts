import {
  annualIndexToMonths,
  getMonthsNumberFromModelStartDate,
  multiplyArrays,
  normalizeArray,
  sumMonthlyValues
} from '../utils';
import { DEFAULT_CORPORATION_TAX, DEFAULT_EBIT } from './constant';
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
} from '../Administrative costs/constant';
import { calcTotalAdminCosts } from '../Administrative costs/total_admin_cost';
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
} from '../Administrative costs/type';
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
} from '../CoGS/constant';
import { calcTotalCostOfSales } from '../CoGS/total_cost_of_sales';
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
} from '../CoGS/type';
import { DEFAULT_COST_OF_ADDITIONS } from '../Depreciation/constant';
import { calcTotalDepreciation } from '../Depreciation/total_depreciation';
import { ICostOfAdditions } from '../Depreciation/type';
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
import { roundArray, sumArrays } from '../utils';
import { ICorporationTax, Iebit } from './type';
import { calcEBIT } from '../ebit';
import { calcCapitalExpenditure } from '../../Cash flow/capital_expenditure';
import {
  IDevFeePaymentDates,
  IDevFeePaymentProfile
} from '../../Balance sheet/type';
import {
  DEFAULT_DEVELOPMENT_FEE_PAYMENT_DATES,
  DEFAULT_DEVELOPMENT_FEE_PAYMENT_PROFILE
} from '../../Balance sheet/constant';
import { ICapitalExpenditure } from '../../Cash flow/type';
import { DEFAULT_CAPITAL_EXPENDITURE } from '../../Cash flow/constant';

export function calcCorporationTax({
  corporationTax = DEFAULT_CORPORATION_TAX,
  modelStartDate = '2023-01-01',
  operationStartDate = '2028-01-01',
  decommissioningEndDate = '2068-06-30',
  decommissioningStartDate = '2068-01-01',
  developmentStartDate = '2023-07-01',
  ebit = DEFAULT_EBIT,
  capitalExpenditure = DEFAULT_CAPITAL_EXPENDITURE
}: {
  developmentFeePaymentPercentageProfile?: IDevFeePaymentProfile;
  developmentFeePaymentDateProfile?: IDevFeePaymentDates;
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
  operationStartDate?: string;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
  developmentStartDate?: string;
  localCircuitsData?: ILocalCircuits[];
  vintage?: IVintage;
  ebit?: Iebit;
  capitalExpenditure?: ICapitalExpenditure;
}) {
  const operationStartDateMonthNumber = getMonthsNumberFromModelStartDate(
    modelStartDate,
    operationStartDate
  );

  const period =
    getMonthsNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;

  const operationEndDateMonthNumber =
    getMonthsNumberFromModelStartDate(
      modelStartDate,
      decommissioningStartDate
    ) - 1;
  const developmentStartDateMonthNumber =
    getMonthsNumberFromModelStartDate(modelStartDate, developmentStartDate) - 1;

  const developmentToDecommissioningFlag: number[] = [];
  for (let i = 0; i < period; i++) {
    if (i < developmentStartDateMonthNumber)
      developmentToDecommissioningFlag[i] = 0;
    else developmentToDecommissioningFlag[i] = 1;
  }
  // Calc ~~~ 25 Corporate tax creditor ~~~
  // 25.01 Capital allowances ~~~ Additions adjusted for AIA

  const additions = capitalExpenditure.capexExpenditure;
  let additionsPreOperations = [];
  let additionsDuringOperations = [];
  const annualInvestmentAllowanceUtilised = [];
  const capexAdjustedForAIAToSpecialRatePool = [];
  const additionsPreOperationsFlag = [];
  for (let i = 0; i < period; i++) {
    if (i < operationStartDateMonthNumber - 1)
      additionsPreOperationsFlag.push(1);
    else additionsPreOperationsFlag.push(0);
  }

  additionsPreOperations = multiplyArrays([
    additions,
    additionsPreOperationsFlag
  ]);
  const operationFlag = [];
  for (let i = 0; i < period; i++) {
    if (
      i < operationStartDateMonthNumber - 1 ||
      operationEndDateMonthNumber - 1 < i
    )
      operationFlag.push(0);
    else operationFlag.push(1);
  }
  additionsDuringOperations = multiplyArrays([additions, operationFlag]);

  let totalAdditionsPreOperations = 0;
  for (let i = 0; i < period; i++) {
    totalAdditionsPreOperations =
      totalAdditionsPreOperations + additionsPreOperations[i];
  }

  const total = [];
  for (let i = 0; i < period; i++) {
    if (i == operationStartDateMonthNumber - 1)
      total[i] = totalAdditionsPreOperations + additionsDuringOperations[i];
    else total[i] = additionsDuringOperations[i];
  }
  let temp = 0;
  for (let i = 0; i < period; i++) {
    if (i < 12) {
      annualInvestmentAllowanceUtilised[i] = 0;
    } else {
      annualInvestmentAllowanceUtilised[i] =
        -1 *
        Math.min(total[i], 1 * corporationTax.annualInvestmentAllowance + temp);
      temp =
        temp -
        annualInvestmentAllowanceUtilised[i - 12] +
        annualInvestmentAllowanceUtilised[i];
    }
    capexAdjustedForAIAToSpecialRatePool[i] =
      total[i] + annualInvestmentAllowanceUtilised[i];
  }

  // Calc ~~~ 25 Corporate tax creditor ~~~
  // 25.01 Capital allowances ~~~ Capital allowances claimed

  const balanceBeforeCapitalAllowancesClaimed = [];
  const capitalAllowancesClaimed = [];

  // Calc ~~~ 25 Corporate tax creditor ~~~
  // 25.01 Capital allowances ~~~ Control account

  const specialRatePoolStartBalance = [];
  const additionsAdjustedForAIA = [];
  const specialRatePoolEndBalance = [];

  specialRatePoolStartBalance[0] = 0;

  for (let i = 0; i < period; i++) {
    additionsAdjustedForAIA[i] = capexAdjustedForAIAToSpecialRatePool[i];

    balanceBeforeCapitalAllowancesClaimed[i] =
      specialRatePoolStartBalance[i] + additionsAdjustedForAIA[i];

    if (
      corporationTax.smallPoolAllowanceThreshold >
      balanceBeforeCapitalAllowancesClaimed[i]
    )
      capitalAllowancesClaimed[i] =
        -balanceBeforeCapitalAllowancesClaimed[i] * operationFlag[i];
    else
      capitalAllowancesClaimed[i] =
        -(
          balanceBeforeCapitalAllowancesClaimed[i] *
          operationFlag[i] *
          corporationTax.rateForCapitalAllowancesSpecialPool
        ) /
        100 /
        12;

    specialRatePoolEndBalance[i] =
      specialRatePoolStartBalance[i] +
      additionsAdjustedForAIA[i] +
      capitalAllowancesClaimed[i];
    if (i < period - 1)
      specialRatePoolStartBalance[i + 1] = specialRatePoolEndBalance[i];
  }

  // Calc ~~~ 25 Corporate tax creditor ~~~
  // 25.02 Tax losses

  const taxLossAccrued = [];
  const taxLossUtilised: number[] = [];
  const taxLossStartBalance = [];
  taxLossStartBalance[0] = 0;
  const taxLossEndBalance = [];

  // Calc ~~~ 25 Corporate tax creditor ~~~
  // 25.03 Tax adjusted PBT

  const earningsBeforeIT = ebit.ebit;

  const adjustmentForAIA = annualInvestmentAllowanceUtilised;

  const adjustmentForCapitalAllowances = capitalAllowancesClaimed;

  const adjustmentForTaxLossesUtilised: number[] = [];
  const adjustedProfitBeforeTax = [];

  for (let i = 0; i < period; i++) {
    taxLossUtilised[i] = Math.min(
      -taxLossStartBalance[i],
      Math.max(
        earningsBeforeIT[i] +
          adjustmentForAIA[i] +
          adjustmentForCapitalAllowances[i],
        0
      )
    );

    adjustmentForTaxLossesUtilised[i] = -taxLossUtilised[i];

    adjustedProfitBeforeTax[i] =
      earningsBeforeIT[i] +
      adjustmentForAIA[i] +
      adjustmentForCapitalAllowances[i] +
      adjustmentForTaxLossesUtilised[i];

    taxLossAccrued[i] = Math.min(adjustedProfitBeforeTax[i], 0);

    taxLossEndBalance[i] =
      taxLossStartBalance[i] + taxLossAccrued[i] + taxLossUtilised[i];

    if (i != period - 1) taxLossStartBalance[i + 1] = taxLossEndBalance[i];
  }

  // Calc ~~~ 25 Corporate tax creditor ~~~
  // 25.04 Tax charge

  const annualTaxAdjustedPBT = sumMonthlyValues(
    adjustedProfitBeforeTax,
    modelStartDate
  );
  const years = annualTaxAdjustedPBT.length;
  const taxRateOnAnnualTimeline = [];
  for (let i = 0; i < years; i++) {
    if (annualTaxAdjustedPBT[i] < corporationTax.profitThresholdForSmallProfits)
      taxRateOnAnnualTimeline.push(corporationTax.smallProfitsTaxRate);
    else taxRateOnAnnualTimeline.push(corporationTax.mainRateOfTax);
  }
  const taxRateOnMonthlyTimeline = normalizeArray(
    annualIndexToMonths(taxRateOnAnnualTimeline),
    period
  );

  const forecastTaxCharge = adjustedProfitBeforeTax.map(
    (d, index) =>
      Math.min((-d * taxRateOnMonthlyTimeline[index]) / 100, 0) *
      developmentToDecommissioningFlag[index]
  );

  // Calc ~~~ 25 Corporate tax creditor ~~~
  // 25.05	Tax payment

  const taxPaymentFlag = [];
  const taxPayment = [];
  const taxPayable = sumMonthlyValues(forecastTaxCharge, modelStartDate);
  for (let i = 0; i < period; i++) {
    if (i < 21) {
      taxPaymentFlag[i] = 0;
      taxPayment[i] = 0;
    } else if (i % 12 == 9) {
      taxPaymentFlag[i] = 1;
      taxPayment[i] =
        taxPaymentFlag[i] *
        developmentToDecommissioningFlag[i] *
        taxPayable[(i - 9) / 12 - 1];
    } else {
      taxPaymentFlag[i] = 0;
      taxPayment[i] = 0;
    }
  }

  // Calc ~~~ 25 Corporate tax creditor ~~~
  // 25.06	Control account
  const corporateTaxCreditorStartBalance = [];
  corporateTaxCreditorStartBalance[0] = 0;
  const corporateTaxCreditorEndBalance = [];
  for (let i = 0; i < period; i++) {
    corporateTaxCreditorEndBalance[i] =
      corporateTaxCreditorStartBalance[i] +
      forecastTaxCharge[i] -
      taxPayment[i];

    if (i < period - 1)
      corporateTaxCreditorStartBalance[i + 1] =
        corporateTaxCreditorEndBalance[i];
  }

  return {
    taxPayment: taxPayment,
    forecastTaxCharge: forecastTaxCharge,
    corporate_tax_creditor_for_balance_sheet: corporateTaxCreditorEndBalance
  };
}
