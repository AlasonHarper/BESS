import { calcBalacneOfPlantAdditions } from '../Balance sheet/Non current asset/Fixed asset/balance_of_plant';
import { calcDevexAdditions } from '../Balance sheet/Non current asset/Fixed asset/devex';
import { calcEnterpriseValueAdditions } from '../Balance sheet/Non current asset/Fixed asset/enterprise_value';
import { calcLandAdditions } from '../Balance sheet/Non current asset/Fixed asset/land';
import { calcPoolingSubstationAdditions } from '../Balance sheet/Non current asset/Fixed asset/pooling_substation';
import { calcTransformersAdditions } from '../Balance sheet/Non current asset/Fixed asset/transformers';
import {
  DEFAULT_DEVELOPMENT_FEE_PAYMENT_DATES,
  DEFAULT_DEVELOPMENT_FEE_PAYMENT_PROFILE
} from '../Balance sheet/constant';
import {
  IDevFeePaymentDates,
  IDevFeePaymentProfile
} from '../Balance sheet/type';
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
import { calcLandRentToPL } from '../calculates/Administrative costs/land_rent';
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
  DEFAULT_CORPORATION_TAX,
  DEFAULT_EBIT
} from '../calculates/Cash flow/constant';
import { calcCorporationTax } from '../calculates/Cash flow/corporation_tax';
import { ICorporationTax, Iebit } from '../calculates/Cash flow/type';
import {
  DEFAULT_ADJUSTMENT_TARIFF_Data,
  DEFAULT_AUXILLIARY,
  DEFAULT_AVERAGE_WHOLESALE_DAY_AHEAD_PRICE,
  DEFAULT_EXPORT_CHARGES_OF_TNUOS,
  DEFAULT_LOCAL_CIRCUITS,
  DEFAULT_LOCAL_SUBSTATION_TARIFF,
  DEFAULT_METERING,
  DEFAULT_NOT_SHARED_YEAR_ROUND_TARIFF_DATA,
  DEFAULT_SHARED_YEAR_ROUND_TARIFF_DATA,
  DEFAULT_SYSTEM_PEAK_TARIFF_DATA
} from '../calculates/CoGS/constant';
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
import { ICostOfAdditions } from '../calculates/Depreciation/type';
import { calcGainOnDisposal } from '../calculates/Revenue/gain_on_disposal_of_batteries';
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
  DEFAULT_GAIN_ON_DISPOSAL,
  DEFAULT_INFLATION_INPUTS,
  DEFAULT_INITIAL_CYCLE_DATA,
  DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  DEFAULT_REVENUE_SETUP,
  DEFAULT_STARTING_BATTERY_ASSUMPTION,
  DEFAULT_VINTAGE
} from '../calculates/constant';
import { calcEBIT } from '../calculates/ebit';
import {
  arraySum,
  calcVintages,
  expandAndAverage,
  expandAndSum,
  getAsAPercentOfPeriod,
  getMonthsNumberFromModelStartDate,
  minArray,
  multiplyArrays,
  multiplyNumber,
  nthLargest,
  sumArray,
  sumArrays
} from '../calculates/utils';
import { calcOperatingCashFlow } from './Movement/operating_cashflow';
import { calcCapitalExpenditure } from './capital_expenditure';
import {
  DEFAULT_BALANCE_OF_PLANT_ADDITIONS,
  DEFAULT_CAPEX_PROVISION,
  DEFAULT_CAPITAL_EXPENDITURE,
  DEFAULT_CASH_REQUIREMENTS,
  DEFAULT_CORPORATION_TAX_VALUE,
  DEFAULT_DEVEX_ADDITIONS,
  DEFAULT_DIVIDENDS,
  DEFAULT_EQUITY,
  DEFAULT_EV_ADDITIONS,
  DEFAULT_GEARING_BY_TAXES,
  DEFAULT_LAND_ADDITIONS,
  DEFAULT_NATIONAL_GRID_SECURITIES,
  DEFAULT_OPERATING_CASH_FLOW_VALUE,
  DEFAULT_POOLING_SUBSTATION_ADDITIONS,
  DEFAULT_SENIOR_DEBT,
  DEFAULT_TRANSFORMERS_ADDITIONS,
  DEFAULT_VARIABLE_PROFILE_FOR_ATTRIBUTABLE_COSTS,
  DEFAULT_VAT,
  DEFAULT_WORKING_CAPITAL
} from './constant';
import {
  ICapexProvision,
  ICapitalExpenditure,
  ICashRequirements,
  ICorporationTaxValue,
  IDividends,
  IEquity,
  IGearingByTaxes,
  INationalGridSecurities,
  ISeniorDebt,
  IVariableProfileForAttributableCosts,
  IWrokingCapital,
  Ivat
} from './type';

export function calcCapexProvision({
  capexProvision = DEFAULT_CAPEX_PROVISION,
  cashRequirements = DEFAULT_CASH_REQUIREMENTS,
  gearingByCapexType = DEFAULT_GEARING_BY_TAXES,
  equity = DEFAULT_EQUITY,
  seniorDebt = DEFAULT_SENIOR_DEBT,
  dividends = DEFAULT_DIVIDENDS,
  vat = DEFAULT_VAT,
  modelStartDate = '2023-01-01',
  decommissioningEndDate = '2068-06-30',
  developmentStartDate = '2023-07-01',
  vintage = DEFAULT_VINTAGE,
  ebit = DEFAULT_EBIT,
  operatingCashFlowValue = DEFAULT_OPERATING_CASH_FLOW_VALUE,
  corporationTaxValue = DEFAULT_CORPORATION_TAX_VALUE,
  capitalExpenditure = DEFAULT_CAPITAL_EXPENDITURE,
  landAdditions = DEFAULT_LAND_ADDITIONS,
  poolingSubstationAdditions = DEFAULT_POOLING_SUBSTATION_ADDITIONS,
  transformersAdditions = DEFAULT_TRANSFORMERS_ADDITIONS,
  balanceOfPlantAdditions = DEFAULT_BALANCE_OF_PLANT_ADDITIONS,
  evAdditions = DEFAULT_EV_ADDITIONS,
  devexAdditions = DEFAULT_DEVEX_ADDITIONS,
  landRentExpense = DEFAULT_LAND_RENT_EXEPNESE,
  gainOnDisposal = DEFAULT_GAIN_ON_DISPOSAL
}: {
  national_grid_securities?: INationalGridSecurities;
  variable_profile_for_attributable_costs?: IVariableProfileForAttributableCosts;
  fullyConsentedDate?: string;
  capexProvision?: ICapexProvision[];
  cashRequirements?: ICashRequirements;
  gearingByCapexType?: IGearingByTaxes;
  equity?: IEquity;
  seniorDebt?: ISeniorDebt;
  dividends?: IDividends;
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
  ebit?: Iebit;
  operatingCashFlowValue?: number[];
  corporationTaxValue?: ICorporationTaxValue;
  landAdditions?: number[];
  poolingSubstationAdditions?: number[];
  transformersAdditions?: number[];
  balanceOfPlantAdditions?: number[];
  evAdditions?: number[];
  devexAdditions?: number[];
  landRentExpense?: ILandRentExpense;
  gainOnDisposal?: IGainOnDisposal;
  capitalExpenditure?: ICapitalExpenditure;
}) {
  const period =
    getMonthsNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
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
  const vintagesData = vintage?.vintages;
  let vintagesAdditionsCost =
    vintagesData[0]?.data?.forecastAdditionsByMilestones;
  const numberOfVintages = vintagesData.length;
  for (let i = 1; i < numberOfVintages; i++) {
    if (vintagesData[i]?.data?.stagingMonthNumber == 0) break;
    else
      vintagesAdditionsCost = arraySum(
        vintagesAdditionsCost,
        vintagesData[i]?.data?.forecastAdditionsByMilestones
      );
  }
  const vintagesGrossCashPayments = vintagesAdditionsCost?.map(
    (d: number) => -d * (1 + (1 * vat.vatRate) / 100)
  );

  const landGrossCashPayments = landAdditions.map(
    (d) => -d * (1 + (1 * vat.vatRate) / 100)
  );
  const poolingSubstationGrossCashPayments = poolingSubstationAdditions.map(
    (d) => -d * (1 + (1 * vat.vatRate) / 100)
  );
  const transformersGrossCashPayments = transformersAdditions.map(
    (d) => -d * (1 + (1 * vat.vatRate) / 100)
  );
  const balanceOfPlantGrossCashPayments = balanceOfPlantAdditions.map(
    (d) => -d * (1 + (1 * vat.vatRate) / 100)
  );
  const enterpriseValueGrossCashPayments = multiplyNumber(evAdditions, -1);

  const capitalisedRentGrossCashPayments =
    landRentExpense.rentToFixedAssets.map(
      (d) => -d * (1 + (1 * vat.vatRate) / 100)
    );
  const devexGrossCashPayments = devexAdditions.map(
    (d) => -d * (1 + (1 * vat.vatRate) / 100)
  );
  // total_cash_payment is used in movementin capex creditor
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
  // Calcs ~~~ 26 Capex provisioin ~~~ 26.01 Accrual
  // Total accrual

  let vintagesAccrual = [];
  let devexAccrual = [];
  let capitalisedRentAccrual = [];
  let landAccrual = [];
  let enterpriseValueAccrual = [];
  let poolingSubstationAccrual = [];
  let transformersAccrual = [];
  let balanceOfPlantAccrual = [];
  const vintagesAccrualMonth =
    capexProvision.find((d) => d.capexObject == 'Batteries')?.months || 0;
  if (vintagesAccrualMonth != 0) {
    vintagesAccrual = expandAndAverage(
      vintagesGrossCashPayments,
      vintagesAccrualMonth
    );
  } else vintagesAccrual = vintagesGrossCashPayments.map((d: number) => d * 0);

  const devexAccrualMonth =
    capexProvision.find((d) => d.capexObject == 'Devex')?.months || 0;

  if (devexAccrualMonth != 0) {
    devexAccrual = expandAndAverage(devexGrossCashPayments, devexAccrualMonth);
  } else devexAccrual = devexGrossCashPayments.map((d) => d * 0);

  const landAccrualMonth =
    capexProvision.find((d) => d.capexObject == 'Land')?.months || 0;

  if (landAccrualMonth != 0) {
    landAccrual = expandAndAverage(landGrossCashPayments, landAccrualMonth);
  } else landAccrual = landGrossCashPayments.map((d) => d * 0);

  const capitalisedRentAccrualMonth =
    capexProvision.find(
      (d) => d.capexObject == 'Capitalised rent in construction'
    )?.months || 0;

  if (capitalisedRentAccrualMonth != 0) {
    capitalisedRentAccrual = expandAndAverage(
      capitalisedRentGrossCashPayments,
      capitalisedRentAccrualMonth
    );
  } else
    capitalisedRentAccrual = capitalisedRentGrossCashPayments.map((d) => d * 0);

  const poolingSubstationAccrualMonth =
    capexProvision.find((d) => d.capexObject == 'Pooling substation')?.months ||
    0;

  if (poolingSubstationAccrualMonth != 0) {
    poolingSubstationAccrual = expandAndAverage(
      poolingSubstationGrossCashPayments,
      poolingSubstationAccrualMonth
    );
  } else
    poolingSubstationAccrual = poolingSubstationGrossCashPayments.map(
      (d) => d * 0
    );

  const transformersAccrualMonth =
    capexProvision.find((d) => d.capexObject == 'Transformers')?.months || 0;

  if (transformersAccrualMonth != 0) {
    transformersAccrual = expandAndAverage(
      transformersGrossCashPayments,
      transformersAccrualMonth
    );
  } else transformersAccrual = transformersGrossCashPayments.map((d) => d * 0);

  const balanceOfPlantAccrualMonth =
    capexProvision.find((d) => d.capexObject == 'Balance of Plant')?.months ||
    0;

  if (balanceOfPlantAccrualMonth != 0) {
    balanceOfPlantAccrual = expandAndAverage(
      balanceOfPlantGrossCashPayments,
      balanceOfPlantAccrualMonth
    );
  } else
    balanceOfPlantAccrual = balanceOfPlantGrossCashPayments.map((d) => d * 0);

  const enterpriseValueAccrualMonth =
    capexProvision.find(
      (d) => d.capexObject == 'Enterprise value - Development fee'
    )?.months || 0;

  if (enterpriseValueAccrualMonth != 0) {
    enterpriseValueAccrual = expandAndAverage(
      enterpriseValueGrossCashPayments,
      enterpriseValueAccrualMonth
    );
  } else
    enterpriseValueAccrual = enterpriseValueGrossCashPayments.map((d) => d * 0);

  const totalAccrual = sumArrays(
    vintagesAccrual,
    enterpriseValueAccrual,
    balanceOfPlantAccrual,
    poolingSubstationAccrual,
    transformersAccrual,
    landAccrual,
    capitalisedRentAccrual,
    devexAccrual
  );

  const accrualByVintages = [];
  for (let i = 0; i < numberOfVintages; i++) {
    if (vintagesData[i].data.stagingMonthNumber == 0) break;
    else
      accrualByVintages[i] = expandAndAverage(
        vintagesData[i].data.forecastAdditionsByMilestones.map(
          (d: number) => d * (1 + (1 * vat.vatRate) / 100)
        ),
        vintagesAccrualMonth
      );
  }

  // Calcs ~~~ 26 Capex provisioin ~~~ 26.02 Cash payment

  // Calcs ~~~ 27 Senior debt ~~~ 27.01 Drawdowns
  // Capex total cash drawdowns per provision

  let capexExcludingBatteries = [];
  capexExcludingBatteries = sumArrays(
    devexAccrual,
    capitalisedRentAccrual,
    landAccrual,
    enterpriseValueAccrual,
    poolingSubstationAccrual,
    transformersAccrual,
    balanceOfPlantAccrual
  );

  // Calcs ~~~ 27 Senior debt ~~~ 27.01 Drawdowns
  // Minimum cash drawdown

  // let operatingCashflow = calcEBIT().ebitda.map(
  // 	(d, index) =>
  // 		d - calcGainOnDisposal().gainOnDisposalRevenue[index]
  // );
  const operatingCashflow = operatingCashFlowValue;

  const capitalExpenditureValue =
    capitalExpenditure.capexExpenditureForCashflow;

  const saleOfFixedAssets = gainOnDisposal.forecastRecycleRevenue;

  const corporationTaxPayment = corporationTaxValue.taxPayment;

  const sum = sumArrays(
    operatingCashflow,
    capitalExpenditureValue,
    saleOfFixedAssets,
    corporationTaxPayment
  );

  // Calcs ~~~ 27 Senior debt ~~~ 27.01 Drawdowns
  // Gearing

  const gearingRatio = [];
  for (let i = 0; i < numberOfVintages; i++) {
    if (i == 14) gearingRatio[i] = gearingByCapexType.bessReplacement1;
    else gearingRatio[i] = 0;
  }

  // calculation of replacement1 and 2 is shown on Calcs 7.02 ~~~ initial batteries replaced by vintage
  const replacement2 = '';

  const capacityPreAdjustmentForEfficiency = [];
  for (let i = 0; i < numberOfVintages; i++) {
    if (vintagesData[i].data.stagingMonthNumber == 0) break;
    else
      capacityPreAdjustmentForEfficiency[i] =
        vintagesData[i].data.capacityPreAdjustmentForEfficiency;
  }

  const replacement1 = nthLargest(capacityPreAdjustmentForEfficiency, 1);

  const batteriesDrawdown = multiplyNumber(accrualByVintages[14], 70 / 100);
  const nonBatteriesDrawdown = multiplyNumber(
    capexExcludingBatteries,
    gearingByCapexType.excludingBatteries
  );

  const seniorDebtDrawdown = multiplyArrays([
    sumArrays(batteriesDrawdown, nonBatteriesDrawdown),
    developmentToDecommissioningFlag
  ]);
  // Calcs ~~~ 27 Senior debt ~~~ 27.01 Drawdowns
  // Adjustment for capex accrual before start of development

  const preDevelopmentFlag = getAsAPercentOfPeriod(
    modelStartDate,
    modelStartDate,
    developmentStartDate,
    decommissioningEndDate
  );

  const preDevelopmentAccruals = sumArray(
    multiplyArrays([preDevelopmentFlag, capexExcludingBatteries])
  );
  const firstDevelopmentMonthNumber = getMonthsNumberFromModelStartDate(
    modelStartDate,
    developmentStartDate
  );
  const firstDevelopmentFlag = [];
  for (let i = 0; i < period; i++) {
    if (i != firstDevelopmentMonthNumber - 1) firstDevelopmentFlag[i] = 0;
    else firstDevelopmentFlag[i] = 1;
  }
  const pre_DevelopmentAccruals = multiplyNumber(
    firstDevelopmentFlag,
    preDevelopmentAccruals
  );
  const totalCashDrawdownsRequired = [];
  const cashAvailableBeforeDrawdown = [];
  const cashDrawdownsRequired = [];
  const balanceToEquity = [];

  // FS_M ~~~ 1 Cash flow
  // Calcs ~~~ 27 Senior debt ~~~ 27.01 Drawdowns
  // Minimum cash drawdown

  const cashStartBalance = [];
  cashStartBalance[0] = 0;
  const cashflow = [];
  const cashEndBalance = [];

  // Calcs 31 Shareholder loan ~~~ 31.01 Drawdowns
  const equityDrawdowns = [];
  const shareholderLoanDrawdown = [];
  const shareCapitalDrawdown = [];
  // Calcs 31 Shareholder loan ~~~ 31.02 Interest
  const shareholder_loan_interest_rate = equity.shareholderLoanInterest;
  const shareholder_loan_monthly_interest_rate =
    Math.pow(1 + shareholder_loan_interest_rate / 100, 1 / 12) - 1;
  // Calcs 31 Shareholder loan ~~~
  // 31.03 Repayment ~~~ Cash available before shareholder loan repayment

  const cash_available_before_shareholder_loan_repayment = [];

  // Calcs 31 Shareholder loan ~~~
  // 31.03 Repayment ~~~ Cash sweep

  const minimum_cash_available_and_lookforward_restriction = [];
  const control_account_balance_before_shareholder_loan_repayment = [];

  // Calcs 31 Shareholder loan ~~~ 31.04 Control account

  const shareholder_loan_start_balance = [];
  shareholder_loan_start_balance[0] = 0;
  const shareholder_loan_drawdown = [];
  const shareholder_loan_interest = [];
  const shareholder_loan_interest_expense_for_profit_and_loss = [];
  const shareholder_loan_repayment = [];
  const shareholder_loan_end_balance = [];

  // Calcs 27.03 Repayments ~~~ Cash available before senior debt repayment

  const cashAvailableBeforeSeniorDebtRepayment = [];
  // Calcs 27.03 Repayments ~~~ Cash look-forward workings
  const lookForward = [];
  const cumulativeLookForward = [];
  let minimumCumulative = [];
  for (let i = 0; i < period; i++) {
    if (i != period - 1) lookForward[i] = sum[i + 1];
    else lookForward[i] = 0;
  }
  for (
    let i = 0;
    i < 1 * cashRequirements.cashRequirementLookForwardRestriction;
    i++
  ) {
    cumulativeLookForward[i] = expandAndSum(lookForward, i + 1);
  }
  minimumCumulative = minArray([
    cumulativeLookForward[0],
    cumulativeLookForward[1],
    cumulativeLookForward[2],
    cumulativeLookForward[3],
    cumulativeLookForward[4],
    cumulativeLookForward[5],
    cumulativeLookForward[6],
    cumulativeLookForward[7],
    cumulativeLookForward[8],
    cumulativeLookForward[9],
    cumulativeLookForward[10],
    cumulativeLookForward[11]
  ]);

  // Calcs 27.03 Repayments ~~~ Look-forward restriction
  // let cashAvailableForSeniorDebtRepaymentLessMinimum =
  // 	cashAvailableBeforeSeniorDebtRepayment.map(
  // 		(d) => d - cashRequirements.minimumCashBalance
  // 	);

  // let lookForwardRestriction = multiplyArrays(
  // 	developmentToDecommissioningFlag,
  // 	sumArrays(
  // 		cashAvailableForSeniorDebtRepaymentLessMinimum,
  // 		minimumCumulative
  // 	)
  // );

  // Calcs 27.03 Repayments ~~~ Cash sweep
  // let minimumCashAvailableAndLookForwardRestriction = multiplyArrays(
  // 	developmentToDecommissioningFlag,
  // 	lookForwardRestriction.map(
  // 		(d, index) =>
  // 			(Math.min(
  // 				d,
  // 				cashAvailableForSeniorDebtRepaymentLessMinimum[index]
  // 			) *
  // 				seniorDebt.cashSweepPercentOfAvailableCash) /
  // 			100
  // 	)
  // );
  const lookForwardRestriction = [];
  const minimumCashAvailableAndLookForwardRestriction = [];
  const netCashflow = [];
  const cashAvailableForSeniorDebtRepaymentLessMinimum = [];
  const seniorDebtRepayment = [];
  const controlAccountBalanceBeforeRepayment = [];
  const seniorDebtRepaymentForControlAccount = [];
  const seniorDebtRepaymentForCashFlow = [];

  // Calcs 27.02 Interest
  // Calcs 27.04 Control account

  const seniorDebtStartBalance = [];
  seniorDebtStartBalance[0] = 0;
  const seniorDebtEndBalance = [];
  const interest = [];
  const repayments = [];
  const monthlyInterestRate =
    Math.pow(1 + (1 * seniorDebt.seniorDebtInterst) / 100, 1 / 12) - 1;

  // Calcs 32 Dividends

  // 32.01 Cash available before dividends

  // cash_available_before_shareholder_loan_repayment is already calculated
  // shareholder_loan_repayment is already calculated and this
  // is same with the value in the profit and loss account
  const cash_available_before_dividends = [];

  // retained_earnings_start_balance comes from FS_M
  const retained_earnings_start_balance = [];
  retained_earnings_start_balance[0] = 0;
  const profit_loss_before_tax = [];
  const corporation_tax_for_profit_and_loss_account =
    corporationTaxValue.forecastTaxCharge;
  const profit_loss_after_tax = [];
  const retained_earnings_end_balance = [];
  const ebitValue = ebit.ebit;

  const dividends_for_retained_earnings = [];
  const retained_earnings_balance_before_dividends = [];
  const share_capital_start_balance: number[] = [];
  share_capital_start_balance[0] = 0;
  const share_capital_repayment: number[] = [];
  const share_capital_end_balance: number[] = [];
  const cash_available_before_share_capital_repayment: number[] = [];
  const total_cash_look_forward_restriction_in_share_capital: number[] = [];
  const minimum_cash_available_and_look_forward_restriction_in_share_capital: number[] =
    [];
  const control_account_balance_before_repayment_in_share_capital: number[] =
    [];

  // minimum_cash_available_and_lookforward_restriction_for_dividends is the value of Calcs 5730 row

  const minimum_cash_available_and_lookforward_restriction_for_dividends = [];

  for (let i = 0; i < period; i++) {
    interest[i] =
      (seniorDebtStartBalance[i] - seniorDebtDrawdown[i]) *
      monthlyInterestRate *
      developmentToDecommissioningFlag[i];

    controlAccountBalanceBeforeRepayment[i] =
      seniorDebtStartBalance[i] - seniorDebtDrawdown[i] + interest[i];

    cashAvailableBeforeDrawdown[i] =
      cashStartBalance[i] +
      operatingCashflow[i] +
      capitalExpenditureValue[i] +
      saleOfFixedAssets[i] +
      corporationTaxPayment[i];

    cashDrawdownsRequired[i] =
      -Math.min(
        cashAvailableBeforeDrawdown[i] -
          1 * cashRequirements.minimumCashBalance,
        0
      ) * developmentToDecommissioningFlag[i];

    // Calcs ~~~ 27 Senior debt ~~~ 27.01 Drawdowns
    // Total drawdowns

    totalCashDrawdownsRequired[i] =
      (pre_DevelopmentAccruals[i] +
        cashDrawdownsRequired[i] -
        capexExcludingBatteries[i] -
        vintagesAccrual[i]) *
      developmentToDecommissioningFlag[i];
    balanceToEquity[i] = totalCashDrawdownsRequired[i] - seniorDebtDrawdown[i];

    shareholderLoanDrawdown[i] =
      (balanceToEquity[i] * equity.equitySplitToShareholderLoan) / 100;
    shareholder_loan_drawdown[i] = -shareholderLoanDrawdown[i];
    shareholder_loan_interest[i] =
      (shareholder_loan_start_balance[i] + shareholder_loan_drawdown[i]) *
      shareholder_loan_monthly_interest_rate *
      developmentToDecommissioningFlag[i];
    shareholder_loan_interest_expense_for_profit_and_loss[i] =
      shareholder_loan_interest[i];

    shareCapitalDrawdown[i] =
      (balanceToEquity[i] * equity.equitySplitToShareholderCapital) / 100;
    cashAvailableBeforeSeniorDebtRepayment[i] =
      cashStartBalance[i] +
      operatingCashflow[i] +
      capitalExpenditureValue[i] +
      saleOfFixedAssets[i] +
      corporationTaxPayment[i] +
      seniorDebtDrawdown[i] +
      shareholderLoanDrawdown[i] +
      shareCapitalDrawdown[i];

    cashAvailableForSeniorDebtRepaymentLessMinimum[i] =
      cashAvailableBeforeSeniorDebtRepayment[i] -
      1 * cashRequirements.minimumCashBalance;

    lookForwardRestriction[i] =
      (minimumCumulative[i] +
        cashAvailableForSeniorDebtRepaymentLessMinimum[i]) *
      developmentToDecommissioningFlag[i];

    minimumCashAvailableAndLookForwardRestriction[i] =
      (Math.min(
        cashAvailableForSeniorDebtRepaymentLessMinimum[i],
        lookForwardRestriction[i]
      ) *
        developmentToDecommissioningFlag[i] *
        seniorDebt.cashSweepPercentOfAvailableCash) /
      100;

    seniorDebtRepaymentForControlAccount[i] = Math.min(
      Math.max(0, minimumCashAvailableAndLookForwardRestriction[i]),
      -controlAccountBalanceBeforeRepayment[i]
    );

    seniorDebtRepaymentForCashFlow[i] =
      -seniorDebtRepaymentForControlAccount[i];

    // seniorDebtRepayment is shown on the income statement
    seniorDebtRepayment[i] = seniorDebtRepaymentForCashFlow[i];

    cash_available_before_shareholder_loan_repayment[i] =
      seniorDebtRepayment[i] + cashAvailableBeforeSeniorDebtRepayment[i];
    minimum_cash_available_and_lookforward_restriction[i] =
      (Math.min(
        lookForwardRestriction[i] + seniorDebtRepaymentForCashFlow[i],
        cash_available_before_shareholder_loan_repayment[i] -
          1 * cashRequirements.minimumCashBalance
      ) *
        equity.shareholderLoanCashSweepPercentage) /
      100;
    control_account_balance_before_shareholder_loan_repayment[i] =
      shareholder_loan_start_balance[i] +
      shareholder_loan_drawdown[i] +
      shareholder_loan_interest[i];

    shareholder_loan_repayment[i] =
      -Math.min(
        Math.max(0, minimum_cash_available_and_lookforward_restriction[i]),
        -control_account_balance_before_shareholder_loan_repayment[i]
      ) * developmentToDecommissioningFlag[i];
    profit_loss_before_tax[i] =
      ebitValue[i] + interest[i] + shareholder_loan_interest[i];

    profit_loss_after_tax[i] =
      profit_loss_before_tax[i] +
      corporation_tax_for_profit_and_loss_account[i];

    retained_earnings_balance_before_dividends[i] =
      retained_earnings_start_balance[i] + profit_loss_after_tax[i];

    minimum_cash_available_and_lookforward_restriction_for_dividends[i] =
      (Math.min(
        lookForwardRestriction[i] +
          seniorDebtRepaymentForCashFlow[i] +
          shareholder_loan_repayment[i],
        cash_available_before_shareholder_loan_repayment[i] +
          shareholder_loan_repayment[i] -
          1 * cashRequirements.minimumCashBalance
      ) *
        dividends.dividends_cash_sweep_percent_of_available_cash) /
      100;
    dividends_for_retained_earnings[i] =
      -Math.max(
        Math.min(
          minimum_cash_available_and_lookforward_restriction_for_dividends[i],
          retained_earnings_balance_before_dividends[i]
        ),
        0
      ) * developmentToDecommissioningFlag[i];

    retained_earnings_end_balance[i] =
      retained_earnings_start_balance[i] +
      profit_loss_after_tax[i] +
      dividends_for_retained_earnings[i];
    shareholder_loan_end_balance[i] =
      shareholder_loan_start_balance[i] +
      shareholder_loan_drawdown[i] +
      shareholder_loan_interest[i] -
      shareholder_loan_repayment[i];

    repayments[i] = seniorDebtRepaymentForControlAccount[i];

    cash_available_before_dividends[i] =
      cash_available_before_shareholder_loan_repayment[i] +
      shareholder_loan_repayment[i];

    cash_available_before_share_capital_repayment[i] =
      cash_available_before_dividends[i] + dividends_for_retained_earnings[i];
    total_cash_look_forward_restriction_in_share_capital[i] =
      lookForwardRestriction[i] +
      seniorDebtRepaymentForCashFlow[i] +
      shareholder_loan_repayment[i] +
      dividends_for_retained_earnings[i];
    minimum_cash_available_and_look_forward_restriction_in_share_capital[i] =
      (Math.min(
        total_cash_look_forward_restriction_in_share_capital[i],
        cash_available_before_share_capital_repayment[i] -
          cashRequirements.minimumCashBalance
      ) *
        equity.shareCapitalCashSweepPercentage) /
      100;

    control_account_balance_before_repayment_in_share_capital[i] =
      share_capital_start_balance[i] + shareCapitalDrawdown[i];

    share_capital_repayment[i] =
      -Math.min(
        Math.max(
          0,
          minimum_cash_available_and_look_forward_restriction_in_share_capital[
            i
          ]
        ),
        control_account_balance_before_repayment_in_share_capital[i]
      ) * developmentToDecommissioningFlag[i];
    share_capital_end_balance[i] =
      share_capital_start_balance[i] +
      shareCapitalDrawdown[i] +
      share_capital_repayment[i];

    seniorDebtEndBalance[i] =
      seniorDebtStartBalance[i] -
      seniorDebtDrawdown[i] +
      interest[i] +
      repayments[i];

    netCashflow[i] =
      operatingCashflow[i] +
      capitalExpenditureValue[i] +
      saleOfFixedAssets[i] +
      corporationTaxPayment[i] +
      seniorDebtDrawdown[i] +
      shareholderLoanDrawdown[i] +
      shareCapitalDrawdown[i] +
      seniorDebtRepayment[i] +
      shareholder_loan_repayment[i];
    cashEndBalance[i] = cashStartBalance[i] + netCashflow[i];

    if (i != period - 1) {
      cashStartBalance[i + 1] = cashEndBalance[i];
      seniorDebtStartBalance[i + 1] =
        seniorDebtEndBalance[i] * developmentToDecommissioningFlag[i + 1];
      shareholder_loan_start_balance[i + 1] =
        shareholder_loan_end_balance[i] *
        developmentToDecommissioningFlag[i + 1];
      retained_earnings_start_balance[i + 1] =
        retained_earnings_end_balance[i] * developmentToDecommissioningFlag[i];
      share_capital_start_balance[i + 1] =
        share_capital_end_balance[i] * developmentToDecommissioningFlag[i];
    }

    // 	for (let i = 0; i < period; i++) {
    // 		cashAvailableBeforeDrawdown[i] =
    // 			cashStartBalance[i] +
    // 			operatingCashflow[i] +
    // 			capitalExpenditure[i] +
    // 			saleOfFixedAssets[i] +
    // 			corporationTax[i];

    // 		cashDrawdownsRequired[i] =
    // 			-Math.min(
    // 				cashAvailableBeforeDrawdown[i] -
    // 					cashRequirements.minimumCashBalance,
    // 				0
    // 			) * developmentToDecommissioningFlag[i];

    // 		// Calcs ~~~ 27 Senior debt ~~~ 27.01 Drawdowns
    // 		// Total drawdowns

    // 		totalCashDrawdownsRequired[i] =
    // 			(pre_DevelopmentAccruals[i] +
    // 				cashDrawdownsRequired[i] +
    // 				capexExcludingBatteries[i] +
    // 				vintagesAccrual[i]) *
    // 			developmentToDecommissioningFlag[i];
    // 		balanceToEquity[i] =
    // 			totalCashDrawdownsRequired[i] - seniorDebtDrawdown[i];
    // 		shareholderLoanDrawdown[i] =
    // 			(balanceToEquity[i] * equity.equitySplitToShareholderLoan) /
    // 			100;
    // 		shareCapitalDrawdown[i] =
    // 			(balanceToEquity[i] *
    // 				equity.equitySplitToShareholderCapital) /
    // 			100;
    // 		cashAvailableBeforeSeniorDebtRepayment[i] =
    // 			cashAvailableBeforeDrawdown[i] +
    // 			seniorDebtDrawdown[i] +
    // 			shareholderLoanDrawdown[i] +
    // 			shareCapitalDrawdown[i];
    // 	}

    // 	// return {
    // 	// 	seniorDebtDrawdown: seniorDebtDrawdown,
    // 	// 	balanceToEquity: balanceToEquity,
    // 	// };
    // }
  }
  return {
    total_cash_payment: total_cash_payment,
    seniorDebtDrawdown: seniorDebtDrawdown,
    shareholderLoanDrawdown: shareholderLoanDrawdown,
    senior_debt_interest: interest,
    shareCapitalDrawdown: shareCapitalDrawdown,
    seniorDebtRepayment: seniorDebtRepayment,
    senior_debt_for_balance_sheet: seniorDebtEndBalance,
    netCashflow: netCashflow,
    cashStartBalance: cashStartBalance,
    cashEndBalance: cashEndBalance,
    shareholder_loan_for_balance_sheet: shareholder_loan_end_balance,
    shareholder_loan_repayment: shareholder_loan_repayment,
    shareholder_loan_interest:
      shareholder_loan_interest_expense_for_profit_and_loss,
    profit_loss_before_tax: profit_loss_before_tax,
    profit_loss_after_tax: profit_loss_after_tax,
    dividends: dividends_for_retained_earnings,
    retained_earnings_start_balance: retained_earnings_start_balance,
    retained_earnings_end_balance: retained_earnings_end_balance,
    share_capital_repayment: share_capital_repayment,
    share_capital_end_balance: share_capital_end_balance
  };
}
