import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import parameterService from '../../services/parameter.service';
import { RootState } from '../store';
import {
  CreateParam,
  CreateParamInfo,
  Parameter,
  ParamState,
  UpdateParam,
  UpdateParamInfo,
  UserParamSetting
} from '../types/types';
import { IParameter } from '../../utils/types';
import { logoutAsync } from './authSlice';
import {
  DEFAULT_BATTERY_AUGMENTATION,
  DEFAULT_BATTERY_CUBES,
  DEFAULT_BATTERY_DISPOSAL,
  DEFAULT_BATTERY_EFFICIENCY,
  DEFAULT_BATTERY_EXCUBES,
  DEFAULT_BESS_CAPEX_FORECAST,
  DEFAULT_CAPEX_PAYMENT_MILESTONES,
  DEFAULT_CAPEX_PAYMENTS_PROFILE,
  DEFAULT_CAPEX_UEL,
  DEFAULT_DETAILED_REVENUE_DATA,
  DEFAULT_FIXED_PPA,
  DEFAULT_FLOATING_PPA,
  DEFAULT_INFLATION_INPUTS,
  DEFAULT_INITIAL_CYCLE_DATA,
  DEFAULT_MCAPEX_PROVISION,
  DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  DEFAULT_REVENUE_SETUP,
  DEFAULT_STARTING_BATTERY_ASSUMPTION,
  DEFAULT_TRIADS_INCOME,
  DEFAULT_VINTAGE
} from '../../calculates/constant';
import {
  DEFAULT_CAPEX_PROVISION,
  DEFAULT_CASH_REQUIREMENTS,
  DEFAULT_DIVIDENDS,
  DEFAULT_EQUITY,
  DEFAULT_GEARING_BY_TAXES,
  DEFAULT_NATIONAL_GRID_SECURITIES,
  DEFAULT_SENIOR_DEBT,
  DEFAULT_VARIABLE_PROFILE_FOR_ATTRIBUTABLE_COSTS,
  DEFAULT_VAT,
  DEFAULT_WORKING_CAPITAL
} from '../../Cash flow/constant';
import {
  DEFAULT_ASSET_MANAGEMENT,
  DEFAULT_BUSINESS_RATES,
  DEFAULT_COMMUNITY_BENEFIT,
  DEFAULT_EXTENDED_WARRANTY,
  DEFAULT_INSURANCE,
  DEFAULT_LAND_RENT,
  DEFAULT_LEGAL_COST,
  DEFAULT_O_AND_M,
  DEFAULT_OTHER_ADMIN_COSTs,
  DEFAULT_SITE_SECURITY
} from '../../calculates/Administrative costs/constant';
import { DEFAULT_COST_OF_ADDITIONS } from '../../calculates/Depreciation/constant';
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
import { DEFAULT_CORPORATION_TAX } from '../../calculates/Cash flow/constant';
import {
  DEFAULT_DEVELOPMENT_FEE_PAYMENT_DATES,
  DEFAULT_DEVELOPMENT_FEE_PAYMENT_PROFILE
} from '../../Balance sheet/constant';
import { number } from 'prop-types';

const initialState: any = {
  vintage: DEFAULT_VINTAGE,
  mCapexProvision: DEFAULT_MCAPEX_PROVISION,
  modelStartDate: '2023-01-01',
  batteryDuration: 4,
  operationStartDate: '2028-01-01',
  lengthOfOperations: 480,
  lengthOfDecommissioning: 6,
  workingCapital: DEFAULT_WORKING_CAPITAL,
  vat: DEFAULT_VAT,
  decommissioningStartDate: '2068-01-01',
  decommissioningEndDate: '2068-06-30',
  calculationPeriod: 546,
  constraintFactor: 100,
  revenueSensitivity: 0,
  revenueSetup: DEFAULT_REVENUE_SETUP,
  triadsIncome: DEFAULT_TRIADS_INCOME,
  assumptionsData: DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  detailedRevenueData: DEFAULT_DETAILED_REVENUE_DATA,
  initialCycleData: DEFAULT_INITIAL_CYCLE_DATA,
  initialCapacity: 1000,
  startingAssumptionsForBatteries: DEFAULT_STARTING_BATTERY_ASSUMPTION,
  batteryDisposals: DEFAULT_BATTERY_DISPOSAL,
  batteryEfficiency: DEFAULT_BATTERY_EFFICIENCY,
  batteryAugmentation: DEFAULT_BATTERY_AUGMENTATION,
  capexForecastModel: 'Conservative',
  batteryCubes: DEFAULT_BATTERY_CUBES,
  batteryExCubes: DEFAULT_BATTERY_EXCUBES,
  inflationInputs: DEFAULT_INFLATION_INPUTS,
  capexPaymentMilestones: DEFAULT_CAPEX_PAYMENT_MILESTONES,
  capexPaymentsProfile: DEFAULT_CAPEX_PAYMENTS_PROFILE,
  capexUEL: DEFAULT_CAPEX_UEL,
  bessCapexForecast: DEFAULT_BESS_CAPEX_FORECAST,
  batterySensitivity: 0,
  landRent: DEFAULT_LAND_RENT,
  landSize: 75,
  developmentStartDate: '2023-07-01',
  fullyConsentedDate: '2024-11-01',
  operationEndDate: '2068-06-30',
  lengthOfConstruction: 12,
  constructionStartDate: '2027-01-01',
  costOfAdditions: DEFAULT_COST_OF_ADDITIONS,
  auxilliaryLossesSettings: DEFAULT_AUXILLIARY,
  averageWholeSaleDayAheadPrice: DEFAULT_AVERAGE_WHOLESALE_DAY_AHEAD_PRICE,
  fixedPPARevenue: DEFAULT_FIXED_PPA,
  floatingPPARevenue: DEFAULT_FLOATING_PPA,
  ppaFeesPercentage: 5,
  assetManagement: DEFAULT_ASSET_MANAGEMENT,
  operationAndManagementSettings: DEFAULT_O_AND_M,
  insurance: DEFAULT_INSURANCE,
  communityBenefit: DEFAULT_COMMUNITY_BENEFIT,
  businessRates: DEFAULT_BUSINESS_RATES,
  extended_warranty: DEFAULT_EXTENDED_WARRANTY,
  siteSecurity: DEFAULT_SITE_SECURITY,
  legalCosts: DEFAULT_LEGAL_COST,
  otherAdministrativeCosts: DEFAULT_OTHER_ADMIN_COSTs,
  optimiser: DEFAULT_OPTIMISER,
  meteringSettings: DEFAULT_METERING,
  exportChargesOfTNUoS: DEFAULT_EXPORT_CHARGES_OF_TNUOS,
  ajdustmentTariffData: DEFAULT_ADJUSTMENT_TARIFF_Data,
  model: 'Conservative',
  localSubstationTariff: DEFAULT_LOCAL_SUBSTATION_TARIFF,
  localCircuitsData: DEFAULT_LOCAL_CIRCUITS,
  localSubstationSwitch: 0,
  sharedYearRoundTariffData: DEFAULT_SHARED_YEAR_ROUND_TARIFF_DATA,
  notSharedYearRoundTariffData: DEFAULT_NOT_SHARED_YEAR_ROUND_TARIFF_DATA,
  capexSensitivity: 0,
  opexSensitivity: 0,
  nationalGridSecurities: DEFAULT_NATIONAL_GRID_SECURITIES,
  variableProfileForAttributableCosts:
    DEFAULT_VARIABLE_PROFILE_FOR_ATTRIBUTABLE_COSTS,
  corporationTax: DEFAULT_CORPORATION_TAX,
  capexProvision: DEFAULT_CAPEX_PROVISION,
  cashRequirements: DEFAULT_CASH_REQUIREMENTS,
  gearingByCapexType: DEFAULT_GEARING_BY_TAXES,
  equity: DEFAULT_EQUITY,
  dividends: DEFAULT_DIVIDENDS,
  developmentFeePaymentPercentageProfile:
    DEFAULT_DEVELOPMENT_FEE_PAYMENT_PROFILE,
  developmentFeePaymentDateProfile: DEFAULT_DEVELOPMENT_FEE_PAYMENT_DATES,
  seniorDebt: DEFAULT_SENIOR_DEBT,
  systemPeakTariffData: DEFAULT_SYSTEM_PEAK_TARIFF_DATA,
  operationYears: 40
};

export const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {
    setVintage: (state, action: PayloadAction<any>) => {
      state.vintage = action.payload;
    },
    setMCapexProvision: (state, action: PayloadAction<any>) => {
      state.mCapexProvision = action.payload;
    },
    setCapexProvision: (state, action: PayloadAction<any>) => {
      state.capexProvision = action.payload;
    },
    setModelStartDate: (state, action: PayloadAction<any>) => {
      state.modelStartDate = action.payload;
    },
    setBatteryDuration: (state, action: PayloadAction<any>) => {
      state.batteryDuration = action.payload;
    },
    setOperationStartDate: (state, action: PayloadAction<any>) => {
      state.operationStartDate = action.payload;
    },
    setLengthOfOperations: (state, action: PayloadAction<any>) => {
      state.lengthOfOperations = action.payload;
    },
    setLengthOfDecommissioning: (state, action: PayloadAction<any>) => {
      state.lengthOfDecommissioning = action.payload;
    },
    setWaterRatesSettings: (state, action: PayloadAction<any>) => {
      state.water_rates = action.payload;
    },
    setWorkingCapital: (state, action: PayloadAction<any>) => {
      state.workingCapital = action.payload;
    },
    setVat: (state, action: PayloadAction<any>) => {
      state.vat = action.payload;
    },
    setDecommissioningStartDate: (state, action: PayloadAction<any>) => {
      state.decommissioningStartDate = action.payload;
    },
    setDecommissioningEndDate: (state, action: PayloadAction<any>) => {
      state.decommissioningEndDate = action.payload;
    },
    setCalculationPeriod: (state, action: PayloadAction<any>) => {
      state.calculationPeriod = action.payload;
    },
    setConstraintFactor: (state, action: PayloadAction<any>) => {
      state.constraintFactor = action.payload;
    },
    setRevenueSensitivity: (state, action: PayloadAction<any>) => {
      state.revenueSensitivity = action.payload;
    },
    setRevenueSetup: (state, action: PayloadAction<any>) => {
      state.revenueSetup = action.payload;
    },
    setTriadsIncome: (state, action: PayloadAction<any>) => {
      state.triadsIncome = action.payload;
    },
    setAssumptionsData: (state, action: PayloadAction<any>) => {
      state.assumptionsData = action.payload;
    },
    setDetailedRevenueData: (state, action: PayloadAction<any>) => {
      state.detailedRevenueData = action.payload;
    },
    setInitialCycleData: (state, action: PayloadAction<any>) => {
      state.initialCycleData = action.payload;
    },
    setInitialCapacity: (state, action: PayloadAction<any>) => {
      state.initialCapacity = action.payload;
    },
    setStartingAssumptionsForBatteries: (state, action: PayloadAction<any>) => {
      state.startingAssumptionsForBatteries = action.payload;
    },
    setBatteryDisposals: (state, action: PayloadAction<any>) => {
      state.batteryDisposals = action.payload;
    },
    setBatteryEfficiency: (state, action: PayloadAction<any>) => {
      state.batteryEfficiency = action.payload;
    },
    setBatteryAugmentation: (state, action: PayloadAction<any>) => {
      state.batteryAugmentation = action.payload;
    },
    setCapexForecastModel: (state, action: PayloadAction<any>) => {
      state.capexForecastModel = action.payload;
    },
    setBatteryCubes: (state, action: PayloadAction<any>) => {
      state.batteryCubes = action.payload;
    },
    setBatteryExCubes: (state, action: PayloadAction<any>) => {
      state.batteryExCubes = action.payload;
    },
    setInflationInputs: (state, action: PayloadAction<any>) => {
      state.inflationInputs = action.payload;
    },
    setCapexPaymentMilestones: (state, action: PayloadAction<any>) => {
      state.capexPaymentMilestones = action.payload;
    },
    setCapexPaymentsProfile: (state, action: PayloadAction<any>) => {
      state.capexPaymentsProfile = action.payload;
    },
    setCapexUEL: (state, action: PayloadAction<any>) => {
      state.capexUEL = action.payload;
    },
    setBessCapexForecast: (state, action: PayloadAction<any>) => {
      state.bessCapexForecast = action.payload;
    },
    setBatterySensitivity: (state, action: PayloadAction<any>) => {
      state.batterySensitivity = action.payload;
    },
    setLandRent: (state, action: PayloadAction<any>) => {
      state.landRent = action.payload;
    },
    setLandSize: (state, action: PayloadAction<any>) => {
      state.landSize = action.payload;
    },
    setDevelopmentStartDate: (state, action: PayloadAction<any>) => {
      state.developmentStartDate = action.payload;
    },
    setFullyConsentedDate: (state, action: PayloadAction<any>) => {
      state.fullyConsentedDate = action.payload;
    },
    setOperationEndDate: (state, action: PayloadAction<any>) => {
      state.operationEndDate = action.payload;
    },
    setLengthOfConstruction: (state, action: PayloadAction<any>) => {
      state.lengthOfConstruction = action.payload;
    },
    setConstructionStartDate: (state, action: PayloadAction<any>) => {
      state.constructionStartDate = action.payload;
    },
    setCostOfAdditions: (state, action: PayloadAction<any>) => {
      state.costOfAdditions = action.payload;
    },
    setAuxilliaryLossesSettings: (state, action: PayloadAction<any>) => {
      state.auxilliaryLossesSettings = action.payload;
    },
    setAverageWholeSaleDayAheadPrice: (state, action: PayloadAction<any>) => {
      state.averageWholeSaleDayAheadPrice = action.payload;
    },
    setFixedPPARevenue: (state, action: PayloadAction<any>) => {
      state.fixedPPARevenue = action.payload;
    },
    setFloatingPPARevenue: (state, action: PayloadAction<any>) => {
      state.floatingPPARevenue = action.payload;
    },
    setPpaFeesPercentage: (state, action: PayloadAction<any>) => {
      state.ppaFeesPercentage = action.payload;
    },
    setAssetManagement: (state, action: PayloadAction<any>) => {
      state.assetManagement = action.payload;
    },
    setOperationAndManagementSettings: (state, action: PayloadAction<any>) => {
      state.operationAndManagementSettings = action.payload;
    },
    setInsurance: (state, action: PayloadAction<any>) => {
      state.insurance = action.payload;
    },
    setCommunityBenefit: (state, action: PayloadAction<any>) => {
      state.communityBenefit = action.payload;
    },
    setBusinessRates: (state, action: PayloadAction<any>) => {
      state.businessRates = action.payload;
    },
    setExtended_warranty: (state, action: PayloadAction<any>) => {
      state.extended_warranty = action.payload;
    },
    setSiteSecurity: (state, action: PayloadAction<any>) => {
      state.siteSecurity = action.payload;
    },
    setLegalCosts: (state, action: PayloadAction<any>) => {
      state.legalCosts = action.payload;
    },
    setOtherAdministrativeCosts: (state, action: PayloadAction<any>) => {
      state.otherAdministrativeCosts = action.payload;
    },
    setOptimiser: (state, action: PayloadAction<any>) => {
      state.optimiser = action.payload;
    },
    setMeteringSettings: (state, action: PayloadAction<any>) => {
      state.meteringSettings = action.payload;
    },
    setExportChargesOfTNUoS: (state, action: PayloadAction<any>) => {
      state.exportChargesOfTNUoS = action.payload;
    },
    setAjdustmentTariffData: (state, action: PayloadAction<any>) => {
      state.ajdustmentTariffData = action.payload;
    },
    setModel: (state, action: PayloadAction<any>) => {
      state.model = action.payload;
    },
    setLocalSubstationTariff: (state, action: PayloadAction<any>) => {
      state.localSubstationTariff = action.payload;
    },
    setLocalCircuitsData: (state, action: PayloadAction<any>) => {
      state.localCircuitsData = action.payload;
    },
    setLocalSubstationSwitch: (state, action: PayloadAction<any>) => {
      state.localSubstationSwitch = action.payload;
    },
    setSharedYearRoundTariffData: (state, action: PayloadAction<any>) => {
      state.sharedYearRoundTariffData = action.payload;
    },
    setNotSharedYearRoundTariffData: (state, action: PayloadAction<any>) => {
      state.notSharedYearRoundTariffData = action.payload;
    },
    setCapexSensitivity: (state, action: PayloadAction<any>) => {
      state.capexSensitivity = action.payload;
    },
    setOpexSensitivity: (state, action: PayloadAction<any>) => {
      state.opexSensitivity = action.payload;
    },
    setNationalGridSecurities: (state, action: PayloadAction<any>) => {
      state.nationalGridSecurities = action.payload;
    },
    setVariableProfileForAttributableCosts: (
      state,
      action: PayloadAction<any>
    ) => {
      state.variableProfileForAttributableCosts = action.payload;
    },
    setCorporationTax: (state, action: PayloadAction<any>) => {
      state.corporationTax = action.payload;
    },
    setCashRequirements: (state, action: PayloadAction<any>) => {
      state.cashRequirements = action.payload;
    },
    setGearingByCapexType: (state, action: PayloadAction<any>) => {
      state.gearingByCapexType = action.payload;
    },
    setEquity: (state, action: PayloadAction<any>) => {
      state.equity = action.payload;
    },
    setDividends: (state, action: PayloadAction<any>) => {
      state.dividends = action.payload;
    },
    setDevelopmentFeePaymentPercentageProfile: (
      state,
      action: PayloadAction<any>
    ) => {
      state.developmentFeePaymentPercentageProfile = action.payload;
    },
    setDevelopmentFeePaymentDateProfile: (
      state,
      action: PayloadAction<any>
    ) => {
      state.developmentFeePaymentDateProfile = action.payload;
    },
    setSeniorDebt: (state, action: PayloadAction<any>) => {
      state.seniorDebt = action.payload;
    },
    setIntercompanySettings: (state, action: PayloadAction<any>) => {
      state.intercompany_expense = action.payload;
    },
    setEasementSetting: (state, action: PayloadAction<any>) => {
      state.easement_costs = action.payload;
    },
    setSystemPeakTariffData: (state, action: PayloadAction<any>) => {
      state.systemPeakTariffData = action.payload;
    },
    setOperationYears: (state, action: PayloadAction<any>) => {
      state.operationYears = action.payload;
    },
    setWholesaleDayAhead: (state, action: PayloadAction<any>) => {
      state.wholesaleDayAhead = action.payload;
    },
    setWholesaleDayIntraday: (state, action: PayloadAction<any>) => {
      state.wholesaleDayIntraday = action.payload;
    },
    setBalancingMechanism: (state, action: PayloadAction<any>) => {
      state.balancingMechanism = action.payload;
    },
    setCapacityMarket: (state, action: PayloadAction<any>) => {
      state.capacityMarket = action.payload;
    },
    setFrequencyResponse: (state, action: PayloadAction<any>) => {
      state.frequencyResponse = action.payload;
    },
    setGainOnDisposal: (state, action: PayloadAction<any>) => {
      state.gainOnDisposal = action.payload;
    },
    setTotalRevenue: (state, action: PayloadAction<any>) => {
      state.totalRevenue = action.payload;
    },
    setAuxilliaryLoss: (state, action: PayloadAction<any>) => {
      state.auxilliaryLoss = action.payload;
    },
    setOptimiserCost: (state, action: PayloadAction<any>) => {
      state.optimiserCost = action.payload;
    },
    setTNUoSCharge: (state, action: PayloadAction<any>) => {
      state.tnuosCharge = action.payload;
    },
    setMeteringCost: (state, action: PayloadAction<any>) => {
      state.meteringCost = action.payload;
    },

    setTotalCoGS: (state, action: PayloadAction<any>) => {
      state.totalCoGS = action.payload;
    },
    setAssetMExpense: (state, action: PayloadAction<any>) => {
      state.assetMExpense = action.payload;
    },
    setBusinessRatesExpense: (state, action: PayloadAction<any>) => {
      state.businessRatesExpense = action.payload;
    },

    setCommunityBenefitExpense: (state, action: PayloadAction<any>) => {
      state.communityBenefitExpense = action.payload;
    },
    setInsuranceExpense: (state, action: PayloadAction<any>) => {
      state.insuranceExpense = action.payload;
    },
    setLandRentExpense: (state, action: PayloadAction<any>) => {
      state.landRentExpense = action.payload;
    },
    setLegalExpense: (state, action: PayloadAction<any>) => {
      state.legalExpense = action.payload;
    },
    setOAndMExpense: (state, action: PayloadAction<any>) => {
      state.oAndMExpense = action.payload;
    },
    setOtherAdminExpense: (state, action: PayloadAction<any>) => {
      state.otherAdminExpense = action.payload;
    },
    setSiteSecurityExpense: (state, action: PayloadAction<any>) => {
      state.siteSecurityExpense = action.payload;
    },
    setExtendedWarrantyExpense: (state, action: PayloadAction<any>) => {
      state.extendedWarrantyExpense = action.payload;
    },
    setIntercompanyExp: (state, action: PayloadAction<any>) => {
      state.intercompanyExp = action.payload;
    },
    setEasementExpense: (state, action: PayloadAction<any>) => {
      state.easementExpnese = action.payload;
    },
    setDecommissioningCosts: (state, action: PayloadAction<any>) => {
      state.decommissioningCosts = action.payload;
    },
    setWaterRatesExpense: (state, action: PayloadAction<any>) => {
      state.waterRatesExpense = action.payload;
    },
    setNGSecurities: (state, action: PayloadAction<any>) => {
      state.nGSecurities = action.payload;
    },
    setTotalAdminCosts: (state, action: PayloadAction<any>) => {
      state.totalAdminCosts = action.payload;
    },
    setBalanceOfPlantDepreciation: (state, action: PayloadAction<any>) => {
      state.balanceOfPlantDepreciation = action.payload;
    },
    setTransformersDepreciation: (state, action: PayloadAction<any>) => {
      state.transformersDepreciation = action.payload;
    },
    setEVDepreciation: (state, action: PayloadAction<any>) => {
      state.evDepreciation = action.payload;
    },
    setVintagesDepreciation: (state, action: PayloadAction<any>) => {
      state.vintagesDepreciation = action.payload;
    },
    setPoolingSubstationDepreciation: (state, action: PayloadAction<any>) => {
      state.poolingSubstationDepreciation = action.payload;
    },
    setCapitalizedRentInConstruction: (state, action: PayloadAction<any>) => {
      state.capitalizedRentInConstruction = action.payload;
    },
    setTotalDepreciation: (state, action: PayloadAction<any>) => {
      state.totalDepreciation = action.payload;
    },
    setEBIT: (state, action: PayloadAction<any>) => {
      state.ebit = action.payload;
    },

    setMovementInTradeCreditor: (state, action: PayloadAction<any>) => {
      state.movementInTradeCreditor = action.payload;
    },
    setMovementInTradeDebtor: (state, action: PayloadAction<any>) => {
      state.movementInTradeDebtor = action.payload;
    },

    setLandAdditions: (state, action: PayloadAction<any>) => {
      state.landAdditions = action.payload;
    },
    setPoolingSubstationAdditions: (state, action: PayloadAction<any>) => {
      state.poolingSubstationAdditions = action.payload;
    },
    setTransformersAdditions: (state, action: PayloadAction<any>) => {
      state.transformersAdditions = action.payload;
    },
    setBalanceOfPlantAdditions: (state, action: PayloadAction<any>) => {
      state.balanceOfPlantAdditions = action.payload;
    },
    setEVAdditions: (state, action: PayloadAction<any>) => {
      state.evAdditions = action.payload;
    },
    setDevexAdditions: (state, action: PayloadAction<any>) => {
      state.devexAdditions = action.payload;
    },
    setCapitalExpenditure: (state, action: PayloadAction<any>) => {
      state.capitalExpenditure = action.payload;
    },
    setCapexCreditor: (state, action: PayloadAction<any>) => {
      state.capexCreditor = action.payload;
    },
    setMovementInPrepayments: (state, action: PayloadAction<any>) => {
      state.movementInPrepayments = action.payload;
    },
    setMovementInVATCreditor: (state, action: PayloadAction<any>) => {
      state.movementInVATCreditor = action.payload;
    },
    setCorporationTaxValue: (state, action: PayloadAction<any>) => {
      state.corporationTaxValue = action.payload;
    },
    setOperatingCashFlowValue: (state, action: PayloadAction<any>) => {
      state.operatingCashFlowValue = action.payload;
    },
    setValuation: (state, action: PayloadAction<any>) => {
      state.valuation = action.payload;
    },
    setFixedPPAValue: (state, action: PayloadAction<any>) => {
      state.fixedPPAValue = action.payload;
    },
    setFloatingPPAValue: (state, action: PayloadAction<any>) => {
      state.floatingPPAValue = action.payload;
    },
    setPPAFee: (state, action: PayloadAction<any>) => {
      state.ppaFee = action.payload;
    },
    setPPAFeesPercentage: (state, action: PayloadAction<any>) => {
      state.ppaFeesPercentage = action.payload;
    },
    setInvestorClosingDate: (state, action: PayloadAction<any>) => {
      state.investorClosingDate = action.payload;
    },
    setRegion: (state, action: PayloadAction<any>) => {
      state.region = action.payload;
    }
  }
});

export const {
  // revenue
  setWholesaleDayAhead,
  setWholesaleDayIntraday,
  setBalancingMechanism,
  setCapacityMarket,
  setFrequencyResponse,
  setGainOnDisposal,
  setTotalRevenue,
  setFixedPPAValue,
  setFloatingPPAValue,
  //revenue
  // Cost of goods sold
  setPPAFeesPercentage,
  setAuxilliaryLoss,
  setOptimiserCost,
  setTNUoSCharge,
  setMeteringCost,
  setTotalCoGS,
  setPPAFee,
  // Cost of goods sold
  // Admin costs
  setAssetMExpense,
  setBusinessRatesExpense,
  setCommunityBenefitExpense,
  setInsuranceExpense,
  setLandRentExpense,
  setLegalExpense,
  setOAndMExpense,
  setOtherAdminExpense,
  setSiteSecurityExpense,
  setExtendedWarrantyExpense,
  setIntercompanyExp,
  setEasementExpense,
  setDecommissioningCosts,
  setWaterRatesExpense,
  setNGSecurities,
  setTotalAdminCosts,
  setEBIT,
  //
  // depreciation
  setBalanceOfPlantDepreciation,
  setTransformersDepreciation,
  setEVDepreciation,
  setVintagesDepreciation,
  setPoolingSubstationDepreciation,
  setCapitalizedRentInConstruction,
  setTotalDepreciation,
  //
  // movements
  setMovementInTradeCreditor,
  setMovementInTradeDebtor,
  setMovementInPrepayments,
  setMovementInVATCreditor,
  setCapexCreditor,
  //
  // additions
  setLandAdditions,
  setPoolingSubstationAdditions,
  setTransformersAdditions,
  setBalanceOfPlantAdditions,
  setEVAdditions,
  setDevexAdditions,
  //
  setCapitalExpenditure,
  setCorporationTaxValue,
  setOperatingCashFlowValue,
  //,
  setValuation,
  setInvestorClosingDate,
  //
  setVintage,
  setMCapexProvision,
  setCapexProvision,
  setModelStartDate,
  setBatteryDuration,
  setOperationStartDate,
  setLengthOfOperations,
  setLengthOfDecommissioning,
  setWorkingCapital,
  setVat,
  setDecommissioningStartDate,
  setDecommissioningEndDate,
  setCalculationPeriod,
  setConstraintFactor,
  setRevenueSensitivity,
  setRevenueSetup,
  setTriadsIncome,
  setEasementSetting,
  setAssumptionsData,
  setDetailedRevenueData,
  setInitialCycleData,
  setStartingAssumptionsForBatteries,
  setBatteryDisposals,
  setBatteryEfficiency,
  setBatteryAugmentation,
  setCapexForecastModel,
  setBatteryCubes,
  setBatteryExCubes,
  setInflationInputs,
  setCapexPaymentMilestones,
  setCapexPaymentsProfile,
  setCapexUEL,
  setBessCapexForecast,
  setBatterySensitivity,
  setLandRent,
  setLandSize,
  setDevelopmentStartDate,
  setFullyConsentedDate,
  setOperationEndDate,
  setLengthOfConstruction,
  setConstructionStartDate,
  setCostOfAdditions,
  setAuxilliaryLossesSettings,
  setAverageWholeSaleDayAheadPrice,
  setFixedPPARevenue,
  setFloatingPPARevenue,
  setPpaFeesPercentage,
  setIntercompanySettings,
  setAssetManagement,
  setOperationAndManagementSettings,
  setInsurance,
  setCommunityBenefit,
  setBusinessRates,
  setExtended_warranty,
  setSiteSecurity,
  setLegalCosts,
  setOtherAdministrativeCosts,
  setOptimiser,
  setMeteringSettings,
  setExportChargesOfTNUoS,
  setWaterRatesSettings,
  setAjdustmentTariffData,
  setModel,
  setLocalSubstationTariff,
  setLocalCircuitsData,
  setLocalSubstationSwitch,
  setSharedYearRoundTariffData,
  setNotSharedYearRoundTariffData,
  setCapexSensitivity,
  setOpexSensitivity,
  setNationalGridSecurities,
  setVariableProfileForAttributableCosts,
  setCorporationTax,
  setCashRequirements,
  setGearingByCapexType,
  setEquity,
  setDividends,
  setDevelopmentFeePaymentPercentageProfile,
  setDevelopmentFeePaymentDateProfile,
  setSeniorDebt,
  setSystemPeakTariffData,
  setOperationYears,
  setInitialCapacity,
  setRegion
} = resultSlice.actions;
export const selectResult = (state: RootState) => state.result;

export default resultSlice.reducer;
