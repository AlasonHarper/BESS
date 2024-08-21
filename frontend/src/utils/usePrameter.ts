import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectParam } from '../store/slices/parameterSlice';
import moment from 'moment';
import { IBatteryCubes, IRevenueSetup } from '../calculates/Revenue/type';
import {
  CHOICE_DATA,
  INFLATION_LIST,
  LOCAL_CIRCUITS_ZONE,
  PARAM_TYPE,
  PAYMENT_PROFILE_LIST,
  REGION_LIST,
  REGION_PARAMS,
  STRATEGY_LIST,
  TNUOS_ZONE_LIST,
  VARIABLE_PROFILE_FOR_ATTRIBUTABLE_COSTS
} from './constant';
import {
  DEFAULT_BATTERY_CUBES,
  DEFAULT_BATTERY_EXCUBES,
  DEFAULT_BESS_CAPEX_FORECAST
} from '../calculates/constant';
import { calcVintages, multiplyNumber } from '../calculates/utils';
import {
  selectResult,
  setWholesaleDayAhead,
  setAjdustmentTariffData,
  setAssetManagement,
  setAssumptionsData,
  setAuxilliaryLossesSettings,
  setAverageWholeSaleDayAheadPrice,
  setBatteryAugmentation,
  setBatteryCubes,
  setBatteryDisposals,
  setBatteryDuration,
  setBatteryEfficiency,
  setBatteryExCubes,
  setBatterySensitivity,
  setBessCapexForecast,
  setBusinessRates,
  setCalculationPeriod,
  setCapexForecastModel,
  setCapexPaymentMilestones,
  setCapexPaymentsProfile,
  setCapexProvision,
  setCapexSensitivity,
  setCapexUEL,
  setCashRequirements,
  setCommunityBenefit,
  setConstraintFactor,
  setConstructionStartDate,
  setCorporationTax,
  setCostOfAdditions,
  setDecommissioningEndDate,
  setDecommissioningStartDate,
  setDetailedRevenueData,
  setDevelopmentFeePaymentDateProfile,
  setDevelopmentFeePaymentPercentageProfile,
  setDevelopmentStartDate,
  setDividends,
  setEquity,
  setExportChargesOfTNUoS,
  setExtended_warranty,
  setFixedPPARevenue,
  setFloatingPPARevenue,
  setFullyConsentedDate,
  setGearingByCapexType,
  setInflationInputs,
  setInitialCapacity,
  setInitialCycleData,
  setInsurance,
  setLandRent,
  setLandSize,
  setLegalCosts,
  setLengthOfConstruction,
  setLengthOfDecommissioning,
  setLengthOfOperations,
  setLocalCircuitsData,
  setMCapexProvision,
  setMeteringSettings,
  setModel,
  setModelStartDate,
  setNationalGridSecurities,
  setNotSharedYearRoundTariffData,
  setOperationAndManagementSettings,
  setOperationEndDate,
  setOperationStartDate,
  setOperationYears,
  setOpexSensitivity,
  setOptimiser,
  setOtherAdministrativeCosts,
  setRevenueSensitivity,
  setRevenueSetup,
  setSeniorDebt,
  setSharedYearRoundTariffData,
  setSiteSecurity,
  setStartingAssumptionsForBatteries,
  setSystemPeakTariffData,
  setTriadsIncome,
  setVariableProfileForAttributableCosts,
  setVat,
  setVintage,
  setWorkingCapital,
  setWholesaleDayIntraday,
  setBalancingMechanism,
  setCapacityMarket,
  setFrequencyResponse,
  setGainOnDisposal,
  setTotalRevenue,
  setAuxilliaryLoss,
  setOptimiserCost,
  setTNUoSCharge,
  setMeteringCost,
  setTotalCoGS,
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
  setIntercompanySettings,
  setEasementExpense,
  setEasementSetting,
  setDecommissioningCosts,
  setWaterRatesExpense,
  setWaterRatesSettings,
  setNGSecurities,
  setTotalAdminCosts,
  setBalanceOfPlantDepreciation,
  setTransformersDepreciation,
  setEVDepreciation,
  setVintagesDepreciation,
  setPoolingSubstationDepreciation,
  setCapitalizedRentInConstruction,
  setTotalDepreciation,
  setEBIT,
  setMovementInTradeCreditor,
  setMovementInTradeDebtor,
  setLandAdditions,
  setPoolingSubstationAdditions,
  setTransformersAdditions,
  setBalanceOfPlantAdditions,
  setEVAdditions,
  setDevexAdditions,
  setCapitalExpenditure,
  setCapexCreditor,
  setMovementInPrepayments,
  setMovementInVATCreditor,
  setCorporationTaxValue,
  setOperatingCashFlowValue,
  setValuation,
  setFixedPPAValue,
  setFloatingPPAValue,
  setPPAFeesPercentage,
  setPPAFee,
  setInvestorClosingDate,
  setRegion
} from '../store/slices/resultSlice';
import { calcCapexProvision } from '../Cash flow/capex_provision';
import { calcWholeSaleDayAheadRevenue } from '../calculates/Revenue/wholesale_day_ahead';
import { calcWholesaleIntraday } from '../calculates/Revenue/wholsale_intraday';
import { calcBalancingMechanismRevenue } from '../calculates/Revenue/balancing_mechanism';
import { calcCapacityMarket } from '../calculates/Revenue/capacity_market';
import { calcFrequencyResponse } from '../calculates/Revenue/frequency_response';
import { calcGainOnDisposal } from '../calculates/Revenue/gain_on_disposal_of_batteries';
import { calcTotalRevenue } from '../calculates/Revenue/total_revenue';
import { calcAuxilliaryLosses } from '../calculates/CoGS/auxilliary_losses';
import { calcOptimiserCommission } from '../calculates/CoGS/optimiser_commission';
import { calcTNUoSCharges } from '../calculates/CoGS/tnuos_export_charges';
import { calcMetering } from '../calculates/CoGS/metering';
import { calcTotalCostOfSales } from '../calculates/CoGS/total_cost_of_sales';
import { calcAssetManagementCosts } from '../calculates/Administrative costs/asset_management';
import { calcBusinessRates } from '../calculates/Administrative costs/business_rates';
import { calcCommunityBenefit } from '../calculates/Administrative costs/community_benefit';
import { calcInsuranceExpense } from '../calculates/Administrative costs/insurance';
import { calcLandRentToPL } from '../calculates/Administrative costs/land_rent';
import { calcLegalCosts } from '../calculates/Administrative costs/legal_cost';
import { calcOperationAndManagementCost } from '../calculates/Administrative costs/o_and_m';
import { calcOtherAdminCosts } from '../calculates/Administrative costs/other_administrative_cost';
import { calcSiteSecurity } from '../calculates/Administrative costs/site_security';
import { calcExtendedWarranty } from '../calculates/Administrative costs/extended_warranty';
import { calcIntercompanyExpense } from '../calculates/Administrative costs/intercompany_expenses';
import { calcEasementCosts } from '../calculates/Administrative costs/easement_costs';
import { calcDecommissiongCosts } from '../calculates/Administrative costs/decommissioning_cost';
import { calcWaterRates } from '../calculates/Administrative costs/water_rates';
import { calcNationalGridSecurities } from '../Cash flow/Movement/movement_in_escrow_account';
import { calcTotalAdminCosts } from '../calculates/Administrative costs/total_admin_cost';
import { calcBalanceOfPlant } from '../calculates/Depreciation/balance_of_plant';
import { calcTransformers } from '../calculates/Depreciation/transformers';
import { calcEnterpriseValue } from '../calculates/Depreciation/enterprise_value';
import { calcVintagesDepreciation } from '../calculates/Depreciation/vintages_depreciation';
import { calcPoolingSubstation } from '../calculates/Depreciation/pooling_substation';
import { calcCapitalizedRentInConstruction } from '../calculates/Depreciation/capitalised_rent_in_construction';
import { calcTotalDepreciation } from '../calculates/Depreciation/total_depreciation';
import { calcEBIT } from '../calculates/ebit';
import { calcTradeCreditors } from '../Cash flow/Movement/movement_in_trade_creditors';
import { calcTradeDebtors } from '../Cash flow/Movement/movement_in_trade_debtors';
import { calcLandAdditions } from '../Balance sheet/Non current asset/Fixed asset/land';
import { calcPoolingSubstationAdditions } from '../Balance sheet/Non current asset/Fixed asset/pooling_substation';
import { calcTransformersAdditions } from '../Balance sheet/Non current asset/Fixed asset/transformers';
import { calcBalacneOfPlantAdditions } from '../Balance sheet/Non current asset/Fixed asset/balance_of_plant';
import { calcEnterpriseValueAdditions } from '../Balance sheet/Non current asset/Fixed asset/enterprise_value';
import { calcDevexAdditions } from '../Balance sheet/Non current asset/Fixed asset/devex';
import { calcCapitalExpenditure } from '../Cash flow/capital_expenditure';
import { calcCapexCreditor } from '../Cash flow/Movement/movement_in_capex_creditor';
import { calcPrepayments } from '../Cash flow/Movement/movement_in_prepayments';
import { calcVATCreditor } from '../Cash flow/Movement/movement_in_vat_creditor';
import { calcCorporationTax } from '../calculates/Cash flow/corporation_tax';
import { calcOperatingCashFlow } from '../Cash flow/Movement/operating_cashflow';
import { calcFixedPPA } from '../calculates/Revenue/fixed_ppa';
import { calcFloatingPPA } from '../calculates/Revenue/floating_ppa';
import { calcPPAFees } from '../calculates/CoGS/ppa_fees';

export const DATE_FORMAT = 'YYYY-MM-DD';

const useParameter = () => {
  const dispatch = useAppDispatch();
  const { parameterInfos } = useAppSelector(selectParam);
  const {
    // revenue
    wholesaleDayAhead,
    wholesaleDayIntraday,
    balancingMechanism,
    frequencyResponse,
    capacityMarket,
    gainOnDisposal,
    totalRevenue,
    fixedPPARevenue,
    floatingPPARevenue,
    fixedPPAValue,
    floatingPPAValue,
    // revenue
    // cost of goods sold
    ppaFee,
    ppaFeesPercentage,
    auxilliaryLoss,
    optimiserCost,
    meteringCost,
    tnuosCharge,
    totalCoGS,
    // cost of goods sold
    // admin costs
    assetMExpense,
    businessRatesExpense,
    communityBenefitExpense,
    insuranceExpense,
    landRentExpense,
    legalExpense,
    oAndMExpense,
    otherAdminExpense,
    siteSecurityExpense,
    extendedWarrantyExpense,
    intercompanyExp,
    easementExpnese,
    decommissioningCosts,
    waterRatesExpense,
    nGSecurities,
    totalAdminCosts,
    // depreciation
    balanceOfPlantDepreciation,
    transformersDepreciation,
    evDepreciation,
    vintagesDepreciation,
    poolingSubstationDepreciation,
    capitalizedRentInConstruction,
    totalDepreciation,
    ebit,
    //
    landAdditions,
    poolingSubstationAdditions,
    transformersAdditions,
    balanceOfPlantAdditions,
    evAdditions,
    devexAdditions,
    //
    movementInTradeCreditor,
    movementInTradeDebtor,
    capexCreditor,
    movementInPrepayments,
    movementInVATCreditor,
    capitalExpenditure,
    operatingCashFlowValue,
    corporationTaxValue,
    //
    vintage,
    model,
    operationYears,
    decommissioningStartDate,
    modelStartDate,
    lengthOfOperations,
    operationStartDate,
    lengthOfDecommissioning,
    decommissioningEndDate,
    revenueSetup,
    lengthOfConstruction,
    batteryDuration,
    assumptionsData,
    easement_costs,
    fullyConsentedDate,
    detailedRevenueData,
    initialCycleData,
    initialCapacity,
    startingAssumptionsForBatteries,
    batteryDisposals,
    batteryEfficiency,
    batteryAugmentation,
    batteryCubes,
    batteryExCubes,
    inflationInputs,
    capexPaymentsProfile,
    capexPaymentMilestones,
    capexUEL,
    bessCapexForecast,
    batterySensitivity,
    water_rates,
    workingCapital,
    vat,
    landRent,
    landSize,
    operationEndDate,
    constructionStartDate,
    costOfAdditions,
    capexSensitivity,
    developmentStartDate,
    optimiser,
    meteringSettings,
    auxilliaryLossesSettings,
    systemPeakTariffData,
    sharedYearRoundTariffData,
    notSharedYearRoundTariffData,
    ajdustmentTariffData,
    exportChargesOfTNUoS,
    localCircuitsData,
    opexSensitivity,
    extended_warranty,
    intercompany_expense,
    siteSecurity,
    otherAdministrativeCosts,
    legalCosts,
    insurance,
    nationalGridSecurities,
    variableProfileForAttributableCosts,
    corporationTax,
    capexProvision,
    cashRequirements,
    gearingByCapexType,
    equity,
    seniorDebt,
    dividends,
    developmentFeePaymentPercentageProfile,
    developmentFeePaymentDateProfile,
    communityBenefit,
    averageWholeSaleDayAheadPrice,
    businessRates,
    assetManagement,
    revenueSensitivity,
    operationAndManagementSettings,
    constraintFactor
  } = useAppSelector(selectResult);
  const getParameter = useCallback(
    (param_index: string) => {
      return parameterInfos?.find((p) => p?.param_index == param_index);
    },
    [parameterInfos]
  );
  // useEffect(() => {
  //   console.log('before', operationStartDate);
  // }, [operationStartDate]);

  useEffect(() => {
    dispatch(setModelStartDate('2023-01-01'));
  }, []);

  useEffect(() => {
    dispatch(
      setBatteryDuration(
        CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION]?.find(
          (d) =>
            d?.id ==
            getParameter('battery_assumption@starting_assumption')?.value
              ?.battery_duration
        )?.label as number
      )
    );
  }, [parameterInfos]);

  useEffect(() => {
    dispatch(
      setOperationStartDate(
        parameterInfos?.find((p) => p?.param_index == 'basic_project_inputs')
          ?.value.grid_connection_date
      )
    );
  }, [parameterInfos]);

  useEffect(() => {
    dispatch(
      setValuation({
        valuation_date:
          parameterInfos?.find((p) => p?.param_index == 'valuation_inputs')
            ?.value.valuation_date || '2024-01-31',
        cost_of_equity:
          parameterInfos?.find((p) => p?.param_index == 'valuation_inputs')
            ?.value.cost_of_equity || 10
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    dispatch(
      setLengthOfOperations(
        parameterInfos?.find((p) => p?.param_index == 'basic_project_inputs')
          ?.value.length_of_operations
      )
    );
  }, [parameterInfos]);

  useEffect(() => {
    dispatch(
      setLengthOfDecommissioning(
        parameterInfos?.find((p) => p?.param_index == 'basic_project_inputs')
          ?.value.length_of_decommissioning
      )
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter('other_inputs@working_capital')?.value;
    dispatch(
      setWorkingCapital({
        debtor_days: r?.debtor_days,
        creditor_days: r?.creditor_days
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter('other_inputs@vat')?.value;
    dispatch(
      setVat({
        vatRate: r?.vat_rate,
        percentageOfRevenueSubjectToVAT:
          r?.percentage_of_revenue_subject_to_vat,
        percentageOfCostsAndCapexSubjectToVAT:
          r?.percentage_of_costs_and_capex_subject_to_vat,
        monthlyPaymentsOnAccount: r?.monthly_payments_on_account
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    dispatch(
      setDecommissioningStartDate(
        moment(operationStartDate)
          .add(lengthOfOperations * 1, 'month')
          .format(DATE_FORMAT)
      )
    );
  }, [lengthOfOperations, operationStartDate]);

  useEffect(() => {
    // console.log(
    //   'decommisioning',
    //   decommissioningStartDate,
    //   lengthOfDecommissioning
    // );
    dispatch(
      setDecommissioningEndDate(
        moment(decommissioningStartDate)
          .add(1 * lengthOfDecommissioning, 'month')
          .format(DATE_FORMAT)
      )
    );
  }, [decommissioningStartDate, lengthOfDecommissioning]);

  useEffect(() => {
    dispatch(
      setCalculationPeriod(
        moment(decommissioningEndDate).diff(moment(modelStartDate), 'months')
      )
    );
  }, [modelStartDate, decommissioningEndDate]);

  useEffect(() => {
    dispatch(setConstraintFactor(100));
  }, []);

  useEffect(() => {
    const r = parameterInfos?.find(
      (p) => p?.param_index == 'revenue@setup'
    )?.value;
    dispatch(
      setRevenueSetup({
        forecastProviderChoice: CHOICE_DATA[
          PARAM_TYPE.CHOICE.FORECAST_PROVIDER
        ]?.find((p) => p?.id == r?.forecast_provider)?.label,
        inflation: CHOICE_DATA[PARAM_TYPE.CHOICE.INFLATION]?.find(
          (p) => p?.id == r?.revenue_inflation
        )?.label,
        baseYear: r?.revenue_inflation_base_year as number
      } as IRevenueSetup)
    );
  }, [parameterInfos]);

  useEffect(() => {
    dispatch(
      setRegion(
        REGION_LIST[
          (getParameter('basic_project_inputs')?.value?.region as number) - 1
        ]
      )
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = parameterInfos?.find(
      (p) => p?.param_index == 'revenue@triads'
    )?.value;
    dispatch(
      setTriadsIncome({
        switch: r?.triads_income_switch,
        value: r?.triads_embedded_export_tariffs
      })
    );
  }, [parameterInfos]);
  useEffect(() => {
    const model = revenueSetup?.forecastProviderChoice?.toLowerCase() || 'modo';
    dispatch(
      setAssumptionsData([
        {
          providerName: revenueSetup?.forecastProviderChoice,
          data: {
            efficiency: parseFloat(
              getParameter(`revenue@forecast_provider@${model}`)?.value
                ?.model_efficiency
            ),
            inflation:
              INFLATION_LIST[
                (getParameter(`revenue@forecast_provider@${model}`)?.value
                  ?.model_inflation_profile as number) - 1
              ],
            baseYear: 2023,
            region:
              REGION_LIST[
                (getParameter(`revenue@forecast_provider@${model}`)?.value
                  ?.model_region as number) - 1
              ],
            tradingStrategy:
              STRATEGY_LIST[
                (getParameter(`revenue@forecast_provider@${model}`)?.value
                  ?.model_trading_strategy as number) - 1
              ]
          }
        }
      ])
    );
  }, [parameterInfos, revenueSetup]);

  useEffect(() => {
    const model = revenueSetup?.forecastProviderChoice?.toLowerCase() || 'modo';
    const trading =
      getParameter(`revenue@forecast_provider@${model}`)?.value
        ?.model_trading_strategy == 0
        ? 'merchant_only'
        : 'merchant_and_ancillaries';
    dispatch(
      setDetailedRevenueData([
        {
          forecastProvider: revenueSetup?.forecastProviderChoice,
          dataByBatteryDuration: [
            {
              duration: batteryDuration,
              dataByTradingStrategy: [
                {
                  tradingStrategy:
                    STRATEGY_LIST[
                      ((getParameter(`revenue@forecast_provider@${model}`)
                        ?.value?.model_trading_strategy as number) || 1) - 1
                    ],
                  dataByRegion: [
                    {
                      region:
                        REGION_LIST[
                          ((getParameter(`revenue@forecast_provider@${model}`)
                            ?.value?.model_region as number) || 1) - 1
                        ],
                      dataByItems: getParameter(
                        `revenue@forecast_provider@${model}@${batteryDuration}_hour_system@${trading}`
                      )?.value[
                        REGION_LIST[
                          (getParameter(`revenue@forecast_provider@${model}`)
                            ?.value?.model_region as number) - 1
                        ]
                      ]?.map((p: number[], index: number) => ({
                        item: REGION_PARAMS[index],
                        data: multiplyNumber(p, 1)
                      }))
                    }
                  ]
                }
              ]
            }
          ]
        }
      ])
    );
  }, [revenueSetup, batteryDuration, parameterInfos]);

  useEffect(() => {
    dispatch(
      setInitialCycleData(
        getParameter('battery_assumption@starting_assumption')?.value[
          'degradation_forecast_retention_rate_data'
        ]?.map((p: number[], index: number) => ({
          averageCyclesPerDay: index == 0 ? 2.0 : index == 1 ? 1.5 : 1.0,
          retentionRate: p
        }))
      )
    );
  }, [parameterInfos]);

  useEffect(() => {
    dispatch(
      setInitialCapacity(
        (getParameter('battery_assumption@starting_assumption')?.value[
          'grid_connection_capacity'
        ] as number) || 1000
      )
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter('administrative_costs@intercompany_expense')?.value;
    dispatch(
      setIntercompanySettings({
        inflation_profile_intercompany_expense:
          INFLATION_LIST[r?.inflation_profile - 1] || 'CPI',
        inflation_profile_base_year: r?.inflation_base_year || 2023,
        annual_cost: r?.annual_cost || 0
      })
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter('administrative_costs@water_rates')?.value;
    dispatch(
      setWaterRatesSettings({
        inflation_profile_water_rates:
          INFLATION_LIST[r?.inflation_profile - 1] || 'CPI',
        inflation_profile_base_year: r?.inflation_base_year || 2023,
        annual_fees_per_mw: r?.annual_fees_per_mw || 0
      })
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter('administrative_costs@easement_costs')?.value;
    dispatch(
      setEasementSetting({
        inflation_profile_easement_costs:
          INFLATION_LIST[r?.inflation_profile - 1] || 'CPI',
        inflation_profile_base_year: r?.inflation_base_year || 2023,
        annual_cost: r?.annual_cost || 0,
        cable_length: r?.cable_length || 0
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter('battery_assumption@starting_assumption')?.value;
    dispatch(
      setStartingAssumptionsForBatteries({
        degradationForecastAverageCyclesPerDay: r?.degradation_forecast,
        batteryAvailability: r?.battery_availablity,
        batteryDuration: batteryDuration
      })
    );
  }, [parameterInfos, batteryDuration]);

  useEffect(() => {
    const r = getParameter('battery_assumption@disposal')?.value;
    dispatch(
      setBatteryDisposals({
        batteryDisposalSwitch: r?.disposal_switch,
        disposedRetentionRate: r?.diposal_percentage,
        recyclePricePercent: r?.recycle_percentage
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter('battery_assumption@efficiency')?.value;
    dispatch(
      setBatteryEfficiency({
        efficiencySwitch: r?.forecast_switch,
        fixedEfficiency: r?.fixed_battery_efficiency
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter('battery_assumption@augmentation')?.value;
    dispatch(
      setBatteryAugmentation({
        batteryAugmentationSwitch: r?.augmentation_switch,
        batteryAugmentationStopYear:
          r?.number_of_months_before_end_of_operations_to_stop_augmentation_and_disposals /
          12
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter('capex@batteries')?.value;
    dispatch(
      setCapexForecastModel(
        CHOICE_DATA[PARAM_TYPE.CHOICE.FORECAST]?.find(
          (f) => f?.id == r?.capex_forecast_scenario_choice
        )?.label as string
      )
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter('capex@batteries')?.value;
    dispatch(
      setBatteryCubes({
        baseYear:
          (r?.capex_forecast_base_year as number) ||
          DEFAULT_BATTERY_CUBES.baseYear,
        data: [
          {
            duration: batteryDuration as number,
            value: ((batteryDuration / 2) *
              r?.capex_forecast_battery_cubes_base_price) as number
          }
        ]
      } as IBatteryCubes)
    );
  }, [parameterInfos, batteryDuration]);

  useEffect(() => {
    const r = getParameter('capex@batteries')?.value;
    dispatch(
      setBatteryExCubes({
        baseYear:
          (r?.capex_forecast_base_year as number) ||
          DEFAULT_BATTERY_EXCUBES.baseYear,
        data: [
          {
            duration: batteryDuration,
            value:
              (batteryDuration / 2) *
              r?.capex_forecast_battery_excluding_cubes_base_price
          }
        ]
      })
    );
  }, [parameterInfos, batteryDuration]);

  useEffect(() => {
    const model = revenueSetup?.forecastProviderChoice?.toLowerCase() || 'modo';
    const r = getParameter('other_inputs@inflation_rate_data')?.value;
    const inflation_profile = getParameter(`revenue@forecast_provider@${model}`)
      ?.value?.model_inflation_profile as number;
    dispatch(
      setInflationInputs(
        INFLATION_LIST.map((i, index) => ({
          profile: i,
          rate: r?.inflation_index_table[index]
        }))
      )
    );
  }, [parameterInfos, revenueSetup]);

  useEffect(() => {
    const r = getParameter('capex@capex_payment_profile_data')?.value
      ?.capex_payment_profiles;
    if (Array.isArray(r))
      dispatch(
        setCapexPaymentMilestones(
          PAYMENT_PROFILE_LIST.map((rr, index) => ({
            profileName: rr,
            timing: r[index]
          }))
        )
      );
  }, [parameterInfos, revenueSetup]);
  // useEffect(() => {
  //   console.log('capex', capexPaymentMilestones);
  // });
  useEffect(() => {
    const model = revenueSetup?.forecastProviderChoice?.toLowerCase() || 'modo';
    const batteries =
      (getParameter('capex@batteries')?.value?.payment_profile as number | 1) -
      1;
    const land =
      (getParameter('capex@excluding_batteries@land')?.value
        ?.payment_profile as number | 1) - 1;
    const pooling_substation =
      (getParameter('capex@excluding_batteries@pooling_substation')?.value
        ?.payment_profile as number | 1) - 1;
    const transformers =
      (getParameter('capex@excluding_batteries@transformers')?.value
        ?.payment_profile as number | 1) - 1;
    const balance_of_plant =
      (getParameter('capex@excluding_batteries@balance_of_plant')?.value
        ?.payment_profile as number | 1) - 1;
    const enterprise_value =
      (getParameter('capex@excluding_batteries@enterprise_value')?.value
        ?.payment_profile as number | 1) - 1;
    dispatch(
      setCapexPaymentsProfile([
        {
          capexObject: 'Batteries',
          paymentProfile: PAYMENT_PROFILE_LIST[batteries] || 'BESS profile'
        },
        {
          capexObject: 'Land',
          paymentProfile: PAYMENT_PROFILE_LIST[land] || ''
        },
        {
          capexObject: 'Pooling substation',
          paymentProfile:
            PAYMENT_PROFILE_LIST[pooling_substation] || 'BESS profile'
        },
        {
          capexObject: 'Transformers',
          paymentProfile: PAYMENT_PROFILE_LIST[transformers] || 'Tx profile'
        },
        {
          capexObject: 'Balance of Plant',
          paymentProfile:
            PAYMENT_PROFILE_LIST[balance_of_plant] || 'Balance of Plant profile'
        },
        {
          capexObject: 'Enterprise value - Development fee',
          paymentProfile: PAYMENT_PROFILE_LIST[enterprise_value]
        }
      ])
    );
  }, [parameterInfos]);

  useEffect(() => {
    const batteries = getParameter('capex@batteries')?.value
      ?.useful_economic_life as number;
    const land = getParameter('capex@excluding_batteries@land')?.value
      ?.useful_economic_life as number;
    const pooling_substation = getParameter(
      'capex@excluding_batteries@pooling_substation'
    )?.value?.useful_economic_life as number;
    const transformers = getParameter('capex@excluding_batteries@transformers')
      ?.value?.useful_economic_life as number;
    const balance_of_plant = getParameter(
      'capex@excluding_batteries@balance_of_plant'
    )?.value?.useful_economic_life as number;
    const enterprise_value = getParameter(
      'capex@excluding_batteries@enterprise_value'
    )?.value?.useful_economic_life as number;
    dispatch(
      setCapexUEL([
        {
          capexObject: 'Batteries',
          usefulEconomicLife: batteries || 15
        },
        {
          capexObject: 'Pooling substation',
          usefulEconomicLife: pooling_substation || operationYears
        },
        {
          capexObject: 'Transformers',
          usefulEconomicLife: transformers || operationYears
        },
        {
          capexObject: 'Balance of Plant',
          usefulEconomicLife: balance_of_plant || operationYears
        },
        {
          capexObject: 'Enterprise value - Development fee',
          usefulEconomicLife: enterprise_value || operationYears
        },
        {
          capexObject: 'Capitalised rent in construction',
          usefulEconomicLife: land || operationYears
        }
      ])
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter('capex@batteries')?.value;
    const inflation_profile_index =
      (r?.capex_forecast_inflation_profile as number) || 1;
    dispatch(
      setBessCapexForecast({
        inflationProfile: INFLATION_LIST[inflation_profile_index - 1],
        baseYear:
          r?.capex_forecast_inflation_base_year ||
          DEFAULT_BESS_CAPEX_FORECAST.baseYear
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter('capex@batteries')?.value;
    dispatch(
      setBatterySensitivity(
        r?.battery_sensitivity == 0
          ? 0
          : r?.battery_sensitivity_magnitude / 100 || 0
      )
    );
  }, [parameterInfos]);

  useEffect(() => {
    const admin_cost = getParameter('administrative_costs@land_rent')?.value;
    const anual_land_rent = getParameter(
      'administrative_costs@land_rent@annual_land_rent'
    )?.value;
    const bespoke_cases_capacity_charge = getParameter(
      'administrative_costs@land_rent@bespoke_cases_capacity_charge'
    )?.value;
    const bespoke_cases_land_rent_per_acre_and_option_charge = getParameter(
      'administrative_costs@land_rent@bespoke_cases_land_rent_per_acre_and_option_charge'
    )?.value;
    dispatch(
      setLandRent({
        switch: admin_cost?.land_rent_switch,
        sensitivity: admin_cost?.land_rent_sensitivity,
        sensitivity_magnitude: admin_cost?.land_rent_sensitivity_magnitude,
        annualLandRent: {
          annualLandRentPerAcreCharge:
            anual_land_rent?.annual_land_rent_per_acre_charge || 0,
          portionPayableDuringConstruction:
            anual_land_rent?.portion_payable_during_construction,
          portionPayableDuringOperations:
            anual_land_rent?.portion_payable_during_operations,
          portionPayableDuringDecommissioning:
            anual_land_rent?.portion_payable_during_decommissioning
        },
        bespokeCasesCapacityCharge: {
          annualLandRentPerMWCharge:
            bespoke_cases_capacity_charge?.annual_land_rent_per_mw_charge || 0,
          portionPayableDuringConstruction:
            bespoke_cases_capacity_charge?.portion_payable_during_construction,
          portionPayableDuringOperations:
            bespoke_cases_capacity_charge?.portion_payable_during_operations,
          portionPayableDuringDecommissioning:
            bespoke_cases_capacity_charge?.portion_payable_during_decommissioning
        },
        bespokeCasesLandRentPerAcreAndOptionCharge: {
          optionRentStartDate:
            bespoke_cases_land_rent_per_acre_and_option_charge?.option_rent_start_date,
          optionRentEndDate:
            bespoke_cases_land_rent_per_acre_and_option_charge?.option_rent_end_date,
          annualLandPostOptionRentPerAcreCharge:
            bespoke_cases_land_rent_per_acre_and_option_charge?.annual_land_option_rent_per_acre_charge ||
            0,
          postOptionRentStartDate:
            bespoke_cases_land_rent_per_acre_and_option_charge?.post_option_rent_start_date,
          postOptionRentEndDate:
            bespoke_cases_land_rent_per_acre_and_option_charge?.post_option_rent_end_date
        },
        inflation: {
          profile:
            INFLATION_LIST[
              ((admin_cost?.land_rent_inflation_profile as number) || 1) - 1
            ],
          baseYear: admin_cost?.land_rent_inflation_base_year
        }
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    dispatch(
      setLandSize(getParameter('basic_project_inputs')?.value?.land_size)
    );
  }, [parameterInfos]);

  useEffect(() => {
    const dev_start_date = getParameter('basic_project_inputs')?.value
      ?.development_start_date;
    dispatch(setDevelopmentStartDate(dev_start_date));
  }, [parameterInfos]);

  useEffect(() => {
    const dev_start_date = getParameter('basic_project_inputs')?.value
      ?.development_start_date;
    const time_between_development_start_date_and_planning_permission_granted =
      getParameter('basic_project_inputs')?.value
        ?.time_between_development_start_date_and_planning_permission_granted;

    dispatch(
      setFullyConsentedDate(
        moment(dev_start_date)
          .add(
            time_between_development_start_date_and_planning_permission_granted,
            'month'
          )
          .format('DD-MMM-YYYY')
      )
    );
  }, []);

  // const landRentSensitivity = useMemo(() => {
  //   return 0;
  // }, [parameterInfos]);

  useEffect(() => {
    dispatch(
      setOperationEndDate(
        moment(operationStartDate)
          .add(lengthOfOperations, 'month')
          .format(DATE_FORMAT)
      )
    );
  }, [operationStartDate, lengthOfOperations]);

  useEffect(() => {
    dispatch(
      setLengthOfConstruction(
        getParameter('basic_project_inputs')?.value?.length_of_construction
      )
    );
  }, [parameterInfos]);

  useEffect(() => {
    dispatch(
      setConstructionStartDate(
        moment(operationStartDate)
          .add(-lengthOfConstruction, 'month')
          .format(DATE_FORMAT)
      )
    );
  }, [operationStartDate, lengthOfConstruction]);

  useEffect(() => {
    const grid_connection_capacity =
      getParameter('basic_project_inputs')?.value?.grid_connection_capacity ||
      1000;
    const land = getParameter('capex@excluding_batteries@land')?.value;
    const pooling_substation = getParameter(
      'capex@excluding_batteries@pooling_substation'
    )?.value;
    const transformers = getParameter(
      'capex@excluding_batteries@transformers'
    )?.value;
    const enterprise =
      getParameter('capex@excluding_batteries@enterprise_value')?.value || {};
    let vv = 0;
    for (let i = 1; i <= batteryDuration; i++) {
      vv += parseFloat(enterprise[`development_fee_hour_${i}`]) || 0;
    }
    const balance_of_plant = getParameter(
      'capex@excluding_batteries@enterprise_value'
    )?.value;
    dispatch(
      setCostOfAdditions({
        land: land?.land_cost,
        poolingSubstation: pooling_substation?.pooling_substation_cost,
        transformers: transformers?.transformers_cost,
        balanceOfPlant: [
          {
            duration: 8,
            value: balance_of_plant?.balance_of_plant_cost || 0
          },
          {
            duration: 2,
            value: balance_of_plant?.balance_of_plant_cost || 156698
          },
          {
            duration: 4,
            value: balance_of_plant?.balance_of_plant_cost || 298689
          }
        ],
        enterPriseValue: vv
      })
    );
  }, [batteryDuration]);

  useEffect(() => {
    const r = getParameter('cost_of_sales@auxilliary_losses')?.value;
    dispatch(
      setAuxilliaryLossesSettings({
        inflationProfile:
          INFLATION_LIST[(r?.auxilliary_losses_inflation_profile || 1) - 1],
        baseYear: r?.auxilliary_losses_inflation_base_year,
        lossFactor: [
          {
            duration: 2,
            auxilliaryLossValue: r?.auxilliary_losses_factor_2 as number
          },
          {
            duration: 4,
            auxilliaryLossValue: r?.auxilliary_losses_factor_4 as number
          },
          {
            duration: 8,
            auxilliaryLossValue: r?.auxilliary_losses_factor_8 as number
          }
        ]
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const model = revenueSetup?.forecastProviderChoice?.toLowerCase() || 'modo';
    const r = getParameter(`revenue@forecast_provider@${model}`)?.value;
    dispatch(
      setAverageWholeSaleDayAheadPrice(
        r?.average_wholesale_day_ahead_price[0] || new Array(600).fill(0)
      )
    );
  }, [parameterInfos, revenueSetup]);

  useEffect(() => {
    const fixedData = getParameter(`revenue@ppa@fixed_ppa`)?.value;
    dispatch(
      setFixedPPARevenue({
        data: [
          {
            contract: 'firstFixed',
            data: {
              startDate: fixedData?.ppa_start_date_1,
              endDate: fixedData?.ppa_end_date_1,
              price: fixedData?.ppa_price_period_1
            }
          },
          {
            contract: 'secondFixed',
            data: {
              startDate: fixedData?.ppa_start_date_2,
              endDate: fixedData?.ppa_end_date_2,
              price: fixedData?.ppa_price_period_2
            }
          }
        ],
        assignedPercentage: fixedData?.fixed_ppa_percentage,
        switch: fixedData?.fixed_ppa_switch
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const floatingPPAData = getParameter(`revenue@ppa@floating_ppa`)?.value;
    dispatch(
      setFloatingPPARevenue({
        data: [
          {
            contract: 'firstFloating',
            data: {
              startDate: floatingPPAData?.ppa_start_date_1,
              endDate: floatingPPAData?.ppa_end_date_1
            }
          },
          {
            contract: 'secondFloating',
            data: {
              startDate: floatingPPAData?.ppa_start_date_2,
              endDate: floatingPPAData?.ppa_end_date_2
            }
          }
        ],
        discountToWholesalePriceForMarginPercentage:
          floatingPPAData?.discount_to_wholesale_price_for_margin || 10,
        assignedPercentage: floatingPPAData?.flaoting_ppa_percentage || 0,
        switch: floatingPPAData?.floating_ppa_switch || 0
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const percentage = getParameter(`cost_of_sales@ppa_fees`)?.value;
    dispatch(
      setPPAFeesPercentage(percentage?.ppa_fee_as_a_percent_of_revenue || 0)
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter(`administrative_costs@asset_management`)?.value;
    dispatch(
      setAssetManagement({
        firstPeriod: {
          inflationProfile: INFLATION_LIST[r?.inflation_profile_1 - 1 || 0],
          baseYear: r?.inflation_base_year_1 || 2024,
          startDate: r?.start_date_period_1 || '2028-01-01',
          endDate: r?.end_date_period_1 || '2067-12-31',
          feesAsAPercentOfRevenue: {
            realTimeManagement: r?.real_time_management_percentage_period_1,
            maintenance: r?.maintenance_percentage_period_1
          },
          feesPerMW: {
            realTimeManagement: r?.real_time_management_period_1,
            maintenance: r?.maintenance_period_1
          }
        },
        secondPeriod: {
          inflationProfile: INFLATION_LIST[r?.inflation_profile_2 - 1 || 0],
          baseYear: r?.inflation_base_year_2,
          startDate: r?.start_date_period_2,
          endDate: r?.end_date_period_2,
          feesAsAPercentOfRevenue: {
            realTimeManagement: r?.real_time_management_percentage_period_2,
            maintenance: r?.maintenance_percentage_period_2
          },
          feesPerMW: {
            realTimeManagement: r?.real_time_management_period_2,
            maintenance: r?.maintenance_period_2
          }
        }
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const fixed = getParameter(`administrative_costs@o_and_m@fixed`)?.value;
    const variable = getParameter(
      `administrative_costs@o_and_m@variable`
    )?.value;

    dispatch(
      setOperationAndManagementSettings([
        {
          type: 'Fixed',
          inflationProfile: INFLATION_LIST[fixed?.inflation_profile - 1 || 0],
          baseYear: fixed?.inflation_base_year,
          cost: [
            { duration: 2, value: fixed?.annual_fixed_o_and_m_2 },
            { duration: 4, value: fixed?.annual_fixed_o_and_m_4 },
            { duration: 8, value: fixed?.annual_fixed_o_and_m_8 }
          ]
        },
        {
          type: 'Variable',
          inflationProfile:
            INFLATION_LIST[variable?.inflation_profile - 1 || 0],
          baseYear: variable?.inflation_base_year,
          cost: [
            { duration: 2, value: variable?.variable_o_and_m_2 },
            { duration: 4, value: variable?.variable_o_and_m_4 },
            { duration: 8, value: variable?.variable_o_and_m_8 }
          ]
        }
      ])
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter(`administrative_costs@insurance`)?.value;
    dispatch(
      setInsurance({
        inflation: {
          profile: INFLATION_LIST[r?.inflation_profile - 1 || 0],
          baseYear: r?.inflation_base_year_operations
        },
        annualFees: r?.annual_fees_per_mw_operations
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter(`administrative_costs@community_benefit`)?.value;
    dispatch(
      setCommunityBenefit({
        inflationProfile: INFLATION_LIST[r?.inflation_profile - 1 || 0],
        baseYear: r?.inflation_base_year,
        annualFixedFundToCommunityBenefit:
          r?.annual_fixed_fund_to_community_benefit,
        annualMWhToCommunityBenefit: r?.annual_mwh_to_community_benefit
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter(`administrative_costs@business_rates`)?.value;
    dispatch(
      setBusinessRates({
        inflationProfile: INFLATION_LIST[r?.inflation_profile - 1 || 0],
        baseYear: r?.inflation_base_year,
        annualFeesPerMW: r?.annual_fees_per_mw
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter(`administrative_costs@extended_warranty`)?.value;
    dispatch(
      setExtended_warranty({
        extended_warranty_switch: r?.extended_warranty_switch,
        inflation_profile_warranty:
          INFLATION_LIST[r?.inflation_profile - 1 || 0],
        inflation_base_year_warranty: r?.inflation_base_year,
        length_of_warranty: r?.length_of_warranty,
        annual_fees_per_mw: [
          { duration: 2, fee: r?.annual_fees_per_mw_2 },
          { duration: 4, fee: r?.annual_fees_per_mw_4 },
          { duration: 8, fee: r?.annual_fees_per_mw_8 }
        ]
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter(`administrative_costs@site_security`)?.value;
    dispatch(
      setSiteSecurity({
        inflationProfile: INFLATION_LIST[r?.inflation_profile - 1 || 0],
        baseYear: r?.inflation_base_year,
        annualFeesPerMW: r?.annual_fees_per_mw
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter(`administrative_costs@legal_costs`)?.value;
    dispatch(
      setLegalCosts({
        inflationProfile: INFLATION_LIST[r?.inflation_profile - 1 || 0],
        baseYear: r?.inflation_base_year,
        annualCost: r?.annual_cost
      })
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter(
      `administrative_costs@other_administrative_costs`
    )?.value;
    dispatch(
      setOtherAdministrativeCosts({
        inflationProfile: INFLATION_LIST[r?.inflation_profile - 1 || 0],
        baseYear: r?.inflation_base_year,
        annualAccountingFeesAndAudit: r?.annual_accounting_fees_and_audit,
        annualIT: r?.annual_it,
        annualOtherCost: r?.annual_other_cost
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter(`cost_of_sales@optimiser`)?.value;
    dispatch(
      setOptimiser({
        switch: r?.optimiser_switch,
        commission: r?.optimiser_commission,
        floor: {
          startDate: r?.start_date,
          endDate: r?.end_date,
          floorPrice: r?.floor_price || 0
        },
        upsideValue: r?.optimiser_upside_value || 0
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter(`cost_of_sales@metering`)?.value;
    dispatch(
      setMeteringSettings({
        inflationProfile:
          INFLATION_LIST[r?.metering_inflation_profile - 1 || 0],
        baseYear: r?.metering_inflation_base_year,
        annualCost: [
          { duration: 2, annualCostPerMW: r?.annual_cost_per_MW_2 },
          { duration: 4, annualCostPerMW: r?.annual_cost_per_MW_4 },
          { duration: 8, annualCostPerMW: r?.annual_cost_per_MW_8 }
        ]
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter(`cost_of_sales@tnuos@export_charges`)?.value;
    dispatch(
      setExportChargesOfTNUoS({
        transmissionConnectionSwitch: r?.transmission_connection_switch,
        zone: TNUOS_ZONE_LIST[r?.tnuos_zone - 1 || 0],
        localCircuits: LOCAL_CIRCUITS_ZONE[r?.local_circuits - 1],
        annualLoadFactor: r?.annual_load_factor,
        gridConnectionVoltage: r?.grid_connection_voltage,
        localSubstationType: r?.local_substation_type
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const zone = getParameter(`cost_of_sales@tnuos@export_charges`)?.value
      ?.tnuos_zone;
    const r =
      getParameter(`cost_of_sales@tnuos@wider_tariff`)?.value
        ?.adjustment_tariff || [];

    dispatch(
      setAjdustmentTariffData([
        {
          zone: TNUOS_ZONE_LIST[zone - 1],
          value: r?.length > zone ? r[zone - 1] : []
        }
      ])
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter(`capex@batteries`)?.value;
    const mdl =
      CHOICE_DATA[PARAM_TYPE.CHOICE.FORECAST][
        r?.capex_forecast_scenario_choice - 1 || 0
      ]?.label;
    dispatch(setModel(mdl.toString()));
  }, [parameterInfos]);

  const localSubstationTariff = useMemo(() => {
    const r = getParameter(`cost_of_sales@tnuos@export_charges`)?.value;
    CHOICE_DATA[PARAM_TYPE.CHOICE.SUBSTATION_TYPE];
    return r?.local_substation_type_by_voltage_data;
  }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter(`cost_of_sales@tnuos@export_charges`)?.value;
    dispatch(
      setLocalCircuitsData([
        {
          zone: LOCAL_CIRCUITS_ZONE[r?.local_circuits - 1],
          value:
            r?.local_circuits_data[r?.local_circuits - 1] ||
            new Array(60).fill(0)
        }
      ])
    );
  }, [parameterInfos]);
  const localSubstationSwitch = useMemo(() => {
    const r = getParameter(`cost_of_sales@pooling_substation`)?.value;
    if (r?.pooling_substation_cost == 0) return 1;
    else return 0;
  }, [parameterInfos]);

  useEffect(() => {
    const zone = getParameter(`cost_of_sales@tnuos@export_charges`)?.value
      ?.tnuos_zone;
    const r =
      getParameter(`cost_of_sales@tnuos@wider_tariff`)?.value
        ?.shared_year_round_tariff || [];
    dispatch(
      setSharedYearRoundTariffData([
        {
          zone: TNUOS_ZONE_LIST[zone - 1],
          value: r?.length > zone ? r[zone - 1] : []
        }
      ])
    );
  }, [parameterInfos]);

  useEffect(() => {
    const zone = getParameter(`cost_of_sales@tnuos@export_charges`)?.value
      ?.tnuos_zone;
    const r =
      getParameter(`cost_of_sales@tnuos@wider_tariff`)?.value
        ?.not_shared_round_tariff || [];
    dispatch(
      setNotSharedYearRoundTariffData([
        {
          zone: TNUOS_ZONE_LIST[zone - 1],
          value: r?.length > zone ? r[zone - 1] : []
        }
      ])
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter('capex@excluding_batteries')?.value;
    dispatch(
      setCapexSensitivity(
        r?.excluding_battery_sensitivity == 0
          ? 0
          : r?.excluding_battery_sensitivity_magnitude / 100 || 0
      )
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter('revenue@setup')?.value;
    dispatch(
      setRevenueSensitivity(
        r?.revenue_sensitivity == 0
          ? 0
          : r?.revenue_sensitivity_magnitude / 100 || 0
      )
    );
  }, [parameterInfos]);

  useEffect(() => {
    // const r = getParameter('administrative_costs@setup')?.value;
    const rq = dispatch(setOpexSensitivity(0));
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter('other_inputs@national_grid_securities')?.value;
    dispatch(
      setNationalGridSecurities({
        security_choice: CHOICE_DATA[PARAM_TYPE.CHOICE.SECURITY][
          r?.security_choice - 1
        ]?.label as string,
        attributable_security_choice:
          VARIABLE_PROFILE_FOR_ATTRIBUTABLE_COSTS[
            r?.attributable_security_choice - 1
          ],
        total_attributable_costs: r?.total_attributable_costs,
        annual_wider_cancellation_costs: r?.annual_wider_cancellation_costs,
        premium_fee: r?.premium_fee
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter('other_inputs@national_grid_securities')?.value;
    dispatch(
      setVariableProfileForAttributableCosts({
        variable_upsall_central: r?.attributable_security_choice_data[0] || [
          0.0, 69.98, 612.24, 1505.36, 2622.6, 3810.91, 4800.06, 4800.06
        ],
        variable_tees: r?.attributable_security_choice_data[1] || [
          0.0, 69.98, 612.24, 1505.36, 2622.6, 3810.91, 4800.06, 4800.06
        ]
      })
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter('other_inputs@corporation_tax')?.value;
    dispatch(
      setCorporationTax({
        smallProfitsTaxRate: r?.small_profits_tax_rate,
        mainRateOfTax: r?.main_rate_of_tax,
        profitThresholdForSmallProfits: r?.profit_threshold_for_small_profits,
        annualInvestmentAllowance: r?.aia,
        rateForCapitalAllowancesSpecialPool:
          r?.rate_for_capital_allowances_capital_pool,
        smallPoolAllowanceThreshold: r?.small_pool_allowances_threshold
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter('capex@excluding_batteries')?.value;
    // return [
    //   {
    //     capexObject: 'Batteries',
    //     months: 3
    //   },
    //   {
    //     capexObject: 'Devex',
    //     months: r?.land.capex_provision_months || 3
    //   },
    //   {
    //     capexObject: 'Capitalised rent in construction',
    //     months:
    //       getParameter('administrative_costs@land_rent')?.value
    //         .land_rent_provision_months || 0
    //   },
    //   {
    //     capexObject: 'Land',
    //     months: r?.land.capex_provision_months || 0
    //   },
    //   {
    //     capexObject: 'Pooling substation',
    //     months: r?.pooling_substation.capex_provision_months || 3
    //   },
    //   {
    //     capexObject: 'Transformers',
    //     months: r?.transformers.capex_provision_months || 3
    //   },
    //   {
    //     capexObject: 'Balance of Plant',
    //     months: r?.balance_of_plant.capex_provision_months || 3
    //   },
    //   {
    //     capexObject: 'Enterprise value - Development fee',
    //     months: r?.enterprise_value.capex_provision_months || 0
    //   }
    // ];
    dispatch(
      setCapexProvision([
        {
          capexObject: 'Batteries',
          months: 3
        },
        {
          capexObject: 'Devex',
          months: 3
        },
        {
          capexObject: 'Capitalised rent in construction',
          months:
            getParameter('administrative_costs@land_rent')?.value
              .land_rent_provision_months || 0
        },
        {
          capexObject: 'Land',
          months: 0
        },
        {
          capexObject: 'Pooling substation',
          months: 3
        },
        {
          capexObject: 'Transformers',
          months: 3
        },
        {
          capexObject: 'Balance of Plant',
          months: 3
        },
        {
          capexObject: 'Enterprise value - Development fee',
          months: 0
        }
      ])
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter('other_inputs@financing@cash_requirements')?.value;
    dispatch(
      setCashRequirements({
        minimumCashBalance: r?.minimum_cash_balance,
        cashRequirementLookForwardRestriction:
          r?.cash_requirement_look_forward_restriction
      })
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter(
      'other_inputs@financing@gearing_by_capex_type'
    )?.value;
    dispatch(
      setGearingByCapexType({
        bessAugmentation: r?.bess_augmentation,
        bessReplacement1: r?.bess_replacement_1,
        bessReplacement2: r?.bess_replacement_2,
        excludingBatteries: r?.gearing_excluding_batteries
      })
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter('other_inputs@financing@equity')?.value;
    dispatch(
      setEquity({
        equitySplitToShareholderLoan: r?.equity_split_to_sharholder_loan || 100,
        equitySplitToShareholderCapital:
          100 - r?.equity_split_to_sharholder_loan || 0,
        shareholderLoanInterest: r?.shareholder_loan_interest,
        shareholderLoanCashSweepPercentage:
          r?.shareholder_loan_cash_sweep_percentage_of_available_cash,
        shareCapitalCashSweepPercentage:
          r?.share_capital_cash_sweep_percentage_of_available_cash
      })
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter('other_inputs@financing@equity')?.value;
    dispatch(
      setDividends({
        dividends_cash_sweep_percent_of_available_cash:
          r?.dividends_cash_sweep_percentage_of_available_cash
      })
    );
  }, [parameterInfos]);
  useEffect(() => {
    dispatch(
      setDevelopmentFeePaymentPercentageProfile({
        paymentPercentageAtInvestorClosingDate: 0,
        paymentPercentageAtLandSecuredDate: 0,
        paymentPercentageAtGridSecuredDate: 0,
        paymentPercentageAtClosingOfDebtAgreementDate: 0,
        paymentPercentageAtFullyConsented: 0,
        paymentPercentageAtrTB: 100,
        paymentPercentageAtcOD: 0
      })
    );
  }, [parameterInfos]);
  useEffect(() => {
    const data = getParameter('basic_project_inputs')?.value;
    dispatch(
      setDevelopmentFeePaymentDateProfile({
        investorClosingDate: data?.investor_closing_date || '2024-06-01',
        landSecuredDate: data?.land_secured_date || '2024-05-05',
        gridSecuredDate: data?.grid_secured_date_offer_accepted || '2024-01-02',
        closingOfDebtAgreementDate:
          data?.closing_of_dbt_agreement_date || '2024-09-01',
        fullyConsented:
          moment(data?.development_start_date)
            .add(
              data?.time_between_development_start_date_and_planning_permission_granted ||
                16,
              'month'
            )
            .format(DATE_FORMAT) || '2024-11-01',
        rTB:
          moment(data?.development_start_date)
            .add(
              1 *
                data?.time_between_development_start_date_and_planning_permission_granted +
                1 * data?.time_between_planning_permission_granted_and_rtb || 6,
              'month'
            )
            .format(DATE_FORMAT) || '2025-05-01',
        cOD: data?.grid_connection_date || '2028-01-01'
      })
    );
  }, [parameterInfos]);
  useEffect(() => {
    const data = getParameter('basic_project_inputs')?.value;
    dispatch(
      setInvestorClosingDate(data?.investor_closing_date || '2024-06-01')
    );
  }, [parameterInfos]);
  useEffect(() => {
    const data = getParameter('basic_project_inputs')?.value;
    dispatch(
      setFullyConsentedDate(
        moment(data?.development_start_date)
          .add(
            data?.time_between_development_start_date_and_planning_permission_granted ||
              16,
            'month'
          )
          .format(DATE_FORMAT) || '2024-11-01'
      )
    );
  }, [parameterInfos]);
  useEffect(() => {
    const r = getParameter('other_inputs@financing@senior_debt')?.value;
    dispatch(
      setSeniorDebt({
        seniorDebtInterst: r?.senior_debt_interest,
        cashSweepPercentOfAvailableCash:
          r?.cash_sweep_percentage_of_available_cash,
        minimumAllowedDSCRHalfYearly: r?.minimum_allowed_dscr_half_yearly,
        minimumAllowedDSCRAnnual: r?.minimum_allowed_dscr_annual
      })
    );
  }, [parameterInfos]);

  useEffect(() => {
    const zone = getParameter(`cost_of_sales@tnuos@export_charges`)?.value
      ?.tnuos_zone;
    const r =
      getParameter(`cost_of_sales@tnuos@wider_tariff`)?.value
        ?.system_peak_tariff_data || [];
    dispatch(
      setSystemPeakTariffData([
        {
          zone: TNUOS_ZONE_LIST[zone - 1],
          value: r?.length > zone ? r[zone - 1] : []
        }
      ])
    );
  }, [parameterInfos]);

  useEffect(() => {
    const r = getParameter(`basic_project_inputs`)?.value;
    dispatch(setOperationYears(r?.length_of_operations / 12));
  }, [parameterInfos]);

  // updates of function results

  useEffect(() => {
    // console.log('vintage ok');
    updateVintage();
  }, [
    // revenueSetup,
    // assumptionsData,
    // detailedRevenueData,
    // initialCycleData,
    // initialCapacity,
    // startingAssumptionsForBatteries,
    // batteryDisposals,
    // batteryEfficiency,
    // batteryAugmentation,
    // model,
    // batteryDuration,
    // batteryCubes,
    // batteryExCubes,
    // // inflationInputs,
    // capexPaymentsProfile,
    // capexPaymentMilestones,
    // capexUEL,
    // bessCapexForecast,
    // batterySensitivity,
    // lengthOfOperations,
    // operationYears,
    // modelStartDate,
    operationStartDate,
    decommissioningEndDate
    // lengthOfDecommissioning
  ]);
  useEffect(() => {
    updateWholesaleDayAhead();
  }, [
    revenueSensitivity,
    revenueSetup,
    assumptionsData,
    detailedRevenueData,
    startingAssumptionsForBatteries,
    inflationInputs,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    vintage
  ]);
  useEffect(() => {
    updateWholesaleDayIntraday();
  }, [
    revenueSensitivity,
    revenueSetup,
    assumptionsData,
    detailedRevenueData,
    startingAssumptionsForBatteries,
    inflationInputs,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    vintage
  ]);
  useEffect(() => {
    updateBalancingMechanism();
  }, [
    revenueSensitivity,
    revenueSetup,
    assumptionsData,
    detailedRevenueData,
    startingAssumptionsForBatteries,
    inflationInputs,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    vintage
  ]);
  useEffect(() => {
    updateCapacityMarket();
  }, [
    revenueSensitivity,
    revenueSetup,
    assumptionsData,
    detailedRevenueData,
    startingAssumptionsForBatteries,
    inflationInputs,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    vintage
  ]);
  useEffect(() => {
    updateFrequencyResponse();
  }, [
    revenueSensitivity,
    revenueSetup,
    assumptionsData,
    detailedRevenueData,
    startingAssumptionsForBatteries,
    inflationInputs,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    vintage
  ]);
  useEffect(() => {
    updateGainOnDiposal();
  }, [
    model,
    batteryDuration,
    batteryCubes,
    batteryExCubes,
    inflationInputs,
    bessCapexForecast,
    batterySensitivity,
    operationYears,
    modelStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    vintage
  ]);
  useEffect(() => {
    updateTotalRevenue();
  }, [
    wholesaleDayAhead,
    wholesaleDayIntraday,
    balancingMechanism,
    frequencyResponse,
    capacityMarket,
    gainOnDisposal,
    fixedPPAValue,
    floatingPPAValue
  ]);
  useEffect(() => {
    updateAuxilliaryLoss();
  }, [
    auxilliaryLossesSettings,
    averageWholeSaleDayAheadPrice,
    revenueSetup,
    assumptionsData,
    initialCapacity,
    startingAssumptionsForBatteries,
    inflationInputs,
    modelStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    operationStartDate,
    operationYears
  ]);
  useEffect(() => {
    updateOptimiserCost();
  }, [
    modelStartDate,
    decommissioningEndDate,
    optimiser,
    vintage,
    wholesaleDayAhead,
    wholesaleDayIntraday,
    balancingMechanism,
    frequencyResponse,
    capacityMarket
  ]);
  useEffect(() => {
    updateTNUoSCharge();
  }, [
    systemPeakTariffData,
    sharedYearRoundTariffData,
    notSharedYearRoundTariffData,
    ajdustmentTariffData,
    exportChargesOfTNUoS,
    localSubstationTariff,
    localSubstationSwitch,
    localCircuitsData,
    initialCapacity,
    operationYears,
    modelStartDate,
    operationStartDate,
    decommissioningEndDate
  ]);
  useEffect(() => {
    updateMeteringCost();
  }, [
    meteringSettings,
    initialCapacity,
    startingAssumptionsForBatteries,
    inflationInputs,
    modelStartDate,
    decommissioningEndDate,
    operationStartDate,
    operationYears,
    opexSensitivity
  ]);
  useEffect(() => {
    updateTotalCoGS();
  }, [meteringCost, auxilliaryLoss, optimiserCost, tnuosCharge, ppaFee]);
  useEffect(() => {
    updateAssetMExpense();
  }, [
    assetManagement,
    decommissioningEndDate,
    modelStartDate,
    constraintFactor,
    inflationInputs,
    opexSensitivity,
    vintage,
    totalRevenue
  ]);
  useEffect(() => {
    updateBusinessRatesExpense();
  }, [
    businessRates,
    inflationInputs,
    initialCapacity,
    operationStartDate,
    modelStartDate,
    operationEndDate,
    decommissioningEndDate
  ]);
  useEffect(() => {
    updateCommunityBenefitExpense();
  }, [
    communityBenefit,
    inflationInputs,
    averageWholeSaleDayAheadPrice,
    initialCapacity,
    opexSensitivity,
    operationStartDate,
    modelStartDate,
    operationEndDate,
    decommissioningEndDate
  ]);
  useEffect(() => {
    updateInsuranceExpense();
  }, [
    insurance,
    inflationInputs,
    initialCapacity,
    opexSensitivity,
    operationStartDate,
    modelStartDate,
    operationEndDate,
    decommissioningEndDate
  ]);
  useEffect(() => {
    updateLandRentExpense();
  }, [
    landRent,
    landSize,
    initialCapacity,
    inflationInputs,
    operationStartDate,
    modelStartDate,
    operationEndDate,
    decommissioningStartDate,
    decommissioningEndDate,
    constructionStartDate
  ]);
  useEffect(() => {
    updateLegalExpense();
  }, [
    legalCosts,
    inflationInputs,
    initialCapacity,
    opexSensitivity,
    operationStartDate,
    modelStartDate,
    operationEndDate,
    decommissioningEndDate
  ]);
  useEffect(() => {
    updateOAndMexpense();
  }, [
    batteryDuration,
    inflationInputs,
    operationAndManagementSettings,
    operationStartDate,
    modelStartDate,
    operationEndDate,
    decommissioningEndDate,
    opexSensitivity,
    vintage
  ]);
  useEffect(() => {
    updateOtherAdminExpense();
  }, [
    otherAdministrativeCosts,
    opexSensitivity,
    inflationInputs,
    operationStartDate,
    modelStartDate,
    operationEndDate,
    decommissioningEndDate
  ]);
  useEffect(() => {
    updateSiteSecurityExpense();
  }, [
    initialCapacity,
    inflationInputs,
    modelStartDate,
    operationStartDate,
    operationEndDate,
    decommissioningEndDate,
    siteSecurity
  ]);
  useEffect(() => {
    updateExtendedWarrantyExpense();
  }, [
    extended_warranty,
    batteryDuration,
    inflationInputs,
    opexSensitivity,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    vintage
  ]);
  useEffect(() => {
    updateIntercompanyExp();
  }, [
    intercompany_expense,
    inflationInputs,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    opexSensitivity
  ]);
  useEffect(() => {
    updateIntercompanyExp();
  }, [
    easement_costs,
    inflationInputs,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    batteryDuration,
    opexSensitivity
  ]);
  useEffect(() => {
    updateEasementExpense();
  }, [
    easement_costs,
    inflationInputs,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    batteryDuration,
    opexSensitivity
  ]);
  useEffect(() => {
    updateDecommissioningCosts();
  }, [
    costOfAdditions,
    lengthOfConstruction,
    modelStartDate,
    developmentStartDate,
    constructionStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    lengthOfDecommissioning
  ]);
  useEffect(() => {
    updateWaterRatesExpense();
  }, [
    water_rates,
    inflationInputs,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    opexSensitivity
  ]);
  useEffect(() => {
    updateNGSecurities();
  }, [
    nationalGridSecurities,
    variableProfileForAttributableCosts,
    modelStartDate,
    fullyConsentedDate,
    developmentStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate
  ]);
  useEffect(() => {
    updateTotalAdminCosts();
  }, [
    assetMExpense,
    businessRatesExpense,
    communityBenefitExpense,
    insuranceExpense,
    landRentExpense,
    legalExpense,
    oAndMExpense,
    otherAdminExpense,
    siteSecurityExpense,
    extendedWarrantyExpense,
    intercompanyExp,
    easementExpnese,
    decommissioningCosts,
    waterRatesExpense,
    nGSecurities
  ]);
  useEffect(() => {
    updateBalanceOfPlantDepreciation();
  }, [
    capexUEL,
    costOfAdditions,
    batteryDuration,
    capexSensitivity,
    operationStartDate,
    modelStartDate,
    decommissioningEndDate
  ]);
  useEffect(() => {
    updateTransformersDepreciation();
  }, [
    capexUEL,
    costOfAdditions,
    batteryDuration,
    capexSensitivity,
    operationStartDate,
    modelStartDate,
    decommissioningEndDate
  ]);
  useEffect(() => {
    updateEVDepreciation();
  }, [
    capexUEL,
    costOfAdditions,
    batteryDuration,
    capexSensitivity,
    operationStartDate,
    modelStartDate,
    decommissioningEndDate
  ]);
  useEffect(() => {
    updateVintagesDepreciation();
  }, [modelStartDate, decommissioningEndDate, vintage]);
  useEffect(() => {
    updatePoolingSubstationDepreciation();
  }, [
    capexUEL,
    costOfAdditions,
    batteryDuration,
    capexSensitivity,
    operationStartDate,
    modelStartDate,
    decommissioningEndDate
  ]);
  useEffect(() => {
    updateCapitalizedRentInConstruction();
  }, [
    capexUEL,
    operationStartDate,
    modelStartDate,
    landRent,
    landSize,
    initialCapacity,
    inflationInputs,
    operationEndDate,
    decommissioningStartDate,
    decommissioningEndDate,
    constructionStartDate
  ]);
  useEffect(() => {
    updateTotalDepreciation();
  }, [
    balanceOfPlantDepreciation,
    transformersDepreciation,
    evDepreciation,
    vintagesDepreciation,
    poolingSubstationDepreciation,
    capitalizedRentInConstruction
  ]);
  useEffect(() => {
    updateMovementInTradeCreditor();
  }, [
    workingCapital,
    vat,
    modelStartDate,
    operationStartDate,
    decommissioningEndDate,
    developmentStartDate,
    totalCoGS,
    totalAdminCosts,
    landRentExpense,
    decommissioningCosts
  ]);
  useEffect(() => {
    updateMovementInTradeDebtor();
  }, [
    workingCapital,
    vat,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    developmentStartDate,
    totalRevenue,
    gainOnDisposal
  ]);
  useEffect(() => {
    updatetLandAdditions();
  }, [
    costOfAdditions,
    capexPaymentsProfile,
    capexPaymentMilestones,
    batteryDuration,
    initialCapacity,
    capexSensitivity,
    operationStartDate,
    modelStartDate,
    decommissioningEndDate
  ]);
  useEffect(() => {
    updatePoolingSubstationAdditions();
  }, [
    costOfAdditions,
    capexPaymentsProfile,
    capexPaymentMilestones,
    initialCapacity,
    capexSensitivity,
    operationStartDate,
    modelStartDate,
    decommissioningEndDate
  ]);
  useEffect(() => {
    updateTransformersAdditions();
  }, [
    costOfAdditions,
    capexPaymentsProfile,
    capexPaymentMilestones,
    initialCapacity,
    capexSensitivity,
    operationStartDate,
    modelStartDate,
    decommissioningEndDate
  ]);
  useEffect(() => {
    updateBalanceOfPlantAdditions();
  }, [
    costOfAdditions,
    capexPaymentsProfile,
    capexPaymentMilestones,
    batteryDuration,
    capexSensitivity,
    operationStartDate,
    modelStartDate,
    decommissioningEndDate
  ]);
  useEffect(() => {
    updateEVAdditions();
  }, [
    developmentFeePaymentPercentageProfile,
    developmentFeePaymentDateProfile,
    costOfAdditions,
    initialCapacity,
    modelStartDate,
    developmentStartDate,
    decommissioningEndDate
  ]);
  useEffect(() => {
    updateDevexAdditions();
  }, [
    batteryDuration,
    capexSensitivity,
    operationStartDate,
    modelStartDate,
    decommissioningEndDate
  ]);
  useEffect(() => {
    updateCapitalExpenditure();
  }, [
    modelStartDate,
    developmentStartDate,
    decommissioningEndDate,
    vintage,
    landAdditions,
    poolingSubstationAdditions,
    transformersAdditions,
    balanceOfPlantAdditions,
    evAdditions,
    devexAdditions,
    landRentExpense
  ]);
  useEffect(() => {
    updateCapexCreditor();
  }, [
    modelStartDate,
    operationStartDate,
    decommissioningEndDate,
    decommissioningStartDate,
    developmentStartDate,
    vintage,
    landAdditions,
    poolingSubstationAdditions,
    transformersAdditions,
    balanceOfPlantAdditions,
    evAdditions,
    devexAdditions,
    landRentExpense,
    capitalExpenditure
  ]);
  useEffect(() => {
    updateMovementInPrepayments();
  }, [
    operationStartDate,
    modelStartDate,
    developmentStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    landRentExpense
  ]);
  useEffect(() => {
    updateMovementInVATCreditor();
  }, [
    operationStartDate,
    modelStartDate,
    developmentStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    landRentExpense
  ]);
  useEffect(() => {
    updateMovementInVATCreditor();
  }, [
    vat,
    modelStartDate,
    operationStartDate,
    decommissioningEndDate,
    decommissioningStartDate,
    developmentStartDate,
    movementInTradeCreditor,
    movementInTradeDebtor,
    capexCreditor
  ]);
  useEffect(() => {
    updateCorporationTaxValue();
  }, [
    corporationTax,
    modelStartDate,
    operationStartDate,
    decommissioningEndDate,
    decommissioningStartDate,
    developmentStartDate,
    ebit,
    capitalExpenditure
  ]);
  useEffect(() => {
    updateOperatingCashFlowValue();
  }, [
    ebit,
    movementInTradeCreditor,
    movementInTradeDebtor,
    gainOnDisposal,
    decommissioningCosts,
    nGSecurities,
    movementInPrepayments,
    movementInVATCreditor,
    capexCreditor
  ]);
  useEffect(() => {
    updatePPAFee();
  }, [floatingPPAValue, fixedPPAValue, ppaFeesPercentage]);
  useEffect(() => {
    updateFixedPPAValue();
  }, [fixedPPARevenue, modelStartDate, decommissioningEndDate, vintage]);
  useEffect(() => {
    updateFloatingPPAValue();
  }, [
    floatingPPARevenue,
    modelStartDate,
    decommissioningEndDate,
    averageWholeSaleDayAheadPrice,
    vintage
  ]);

  useEffect(() => {
    updateEBIT();
  }, [totalRevenue, totalCoGS, totalAdminCosts, totalDepreciation]);
  useEffect(() => {
    if (
      Array.isArray(vintage?.totalGenerationCapacity) &&
      Array.isArray(vintage?.electricitySold) &&
      Array.isArray(vintage?.vintages)
    )
      updateMCapexProvision();
  }, [
    capexProvision,
    cashRequirements,
    gearingByCapexType,
    equity,
    seniorDebt,
    dividends,
    vat,
    modelStartDate,
    decommissioningEndDate,
    developmentStartDate,
    vintage,
    ebit,
    operatingCashFlowValue,
    corporationTaxValue,
    capitalExpenditure,
    landAdditions,
    poolingSubstationAdditions,
    transformersAdditions,
    balanceOfPlantAdditions,
    evAdditions,
    devexAdditions,
    landRentExpense,
    gainOnDisposal
  ]);

  // update functions
  const updateVintage = () => {
    const calc_vintage = calcVintages({
      revenueSetup,
      assumptionsData,
      detailedRevenueData,
      initialCycleData,
      initialCapacity,
      startingAssumptionsForBatteries,
      batteryDisposals,
      batteryEfficiency,
      batteryAugmentation,
      model,
      operationYears,
      batteryDuration,
      batteryCubes,
      batteryExCubes,
      inflationInputs,
      capexPaymentsProfile,
      capexPaymentMilestones,
      capexUEL,
      bessCapexForecast,
      batterySensitivity,
      modelStartDate,
      operationStartDate,
      decommissioningEndDate,
      decommissioningStartDate
    });
    dispatch(setVintage(calc_vintage));
  };
  const updateMCapexProvision = () => {
    const m_capex_provision = calcCapexProvision({
      capexProvision,
      cashRequirements,
      gearingByCapexType,
      equity,
      seniorDebt,
      dividends,
      vat,
      modelStartDate,
      decommissioningEndDate,
      developmentStartDate,
      vintage,
      ebit,
      operatingCashFlowValue,
      corporationTaxValue,
      capitalExpenditure,
      landAdditions,
      poolingSubstationAdditions,
      transformersAdditions,
      balanceOfPlantAdditions,
      evAdditions,
      devexAdditions,
      landRentExpense,
      gainOnDisposal
    });
    // console.log('capex ok');

    dispatch(setMCapexProvision(m_capex_provision));
  };
  const updateWholesaleDayAhead = () => {
    const wholesaleDayAhead = calcWholeSaleDayAheadRevenue({
      revenueSensitivity,
      revenueSetup,
      assumptionsData,
      detailedRevenueData,
      startingAssumptionsForBatteries,
      inflationInputs,
      modelStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      vintage
    });
    dispatch(setWholesaleDayAhead(wholesaleDayAhead));
  };
  const updateWholesaleDayIntraday = () => {
    const wholesaleDayIntraday = calcWholesaleIntraday({
      revenueSensitivity,
      revenueSetup,
      assumptionsData,
      detailedRevenueData,
      startingAssumptionsForBatteries,
      inflationInputs,
      modelStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      vintage
    });
    dispatch(setWholesaleDayIntraday(wholesaleDayIntraday));
  };
  const updateBalancingMechanism = () => {
    const balancingMechanism = calcBalancingMechanismRevenue({
      revenueSensitivity,
      revenueSetup,
      assumptionsData,
      detailedRevenueData,
      startingAssumptionsForBatteries,
      inflationInputs,
      modelStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      vintage
    });
    dispatch(setBalancingMechanism(balancingMechanism));
  };
  const updateCapacityMarket = () => {
    const capacityMarket = calcCapacityMarket({
      revenueSensitivity,
      revenueSetup,
      assumptionsData,
      detailedRevenueData,
      startingAssumptionsForBatteries,
      inflationInputs,
      modelStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      vintage
    });
    dispatch(setCapacityMarket(capacityMarket));
  };
  const updateFrequencyResponse = () => {
    const frequencyResponse = calcFrequencyResponse({
      revenueSensitivity,
      revenueSetup,
      assumptionsData,
      detailedRevenueData,
      startingAssumptionsForBatteries,
      inflationInputs,
      modelStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      vintage
    });
    dispatch(setFrequencyResponse(frequencyResponse));
  };
  const updateGainOnDiposal = () => {
    const r = calcGainOnDisposal({
      model,
      batteryDuration,
      batteryCubes,
      batteryExCubes,
      inflationInputs,
      bessCapexForecast,
      batterySensitivity,
      operationYears,
      modelStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      vintage
    });
    dispatch(setGainOnDisposal(r));
  };
  const updateTotalRevenue = () => {
    const totalRevenue = calcTotalRevenue({
      wholesaleDayAhead,
      wholesaleDayIntraday,
      balancingMechanism,
      frequencyResponse,
      capacityMarket,
      gainOnDisposal,
      fixedPPAValue,
      floatingPPAValue
    });
    dispatch(setTotalRevenue(totalRevenue));
  };
  const updateAuxilliaryLoss = () => {
    const auxilliaryLoss = calcAuxilliaryLosses({
      auxilliaryLossesSettings,
      averageWholeSaleDayAheadPrice,
      revenueSetup,
      assumptionsData,
      initialCapacity,
      startingAssumptionsForBatteries,
      inflationInputs,
      modelStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      operationStartDate,
      operationYears
    });
    dispatch(setAuxilliaryLoss(auxilliaryLoss));
  };
  const updateOptimiserCost = () => {
    const optimiserCost = calcOptimiserCommission({
      modelStartDate,
      decommissioningEndDate,
      optimiser,
      vintage,
      wholesaleDayAhead,
      wholesaleDayIntraday,
      balancingMechanism,
      frequencyResponse,
      capacityMarket
    });
    dispatch(setOptimiserCost(optimiserCost));
  };
  const updateMeteringCost = () => {
    const meteringCost = calcMetering({
      meteringSettings,
      initialCapacity,
      startingAssumptionsForBatteries,
      inflationInputs,
      modelStartDate,
      decommissioningEndDate,
      operationStartDate,
      operationYears,
      opexSensitivity
    });
    dispatch(setMeteringCost(meteringCost));
  };
  const updateTNUoSCharge = () => {
    const tnuosCharge = calcTNUoSCharges({
      systemPeakTariffData,
      sharedYearRoundTariffData,
      notSharedYearRoundTariffData,
      ajdustmentTariffData,
      exportChargesOfTNUoS,
      localSubstationTariff,
      localSubstationSwitch,
      localCircuitsData,
      initialCapacity,
      operationYears,
      modelStartDate,
      operationStartDate,
      decommissioningEndDate
    });
    dispatch(setTNUoSCharge(tnuosCharge));
  };
  const updateTotalCoGS = () => {
    const totalCoGS = calcTotalCostOfSales({
      meteringCost,
      auxilliaryLoss,
      optimiserCost,
      tnuosCharge,
      ppaFee
    });
    dispatch(setTotalCoGS(totalCoGS));
  };
  const updateAssetMExpense = () => {
    const assetMExpense = calcAssetManagementCosts({
      assetManagement,
      decommissioningEndDate,
      modelStartDate,
      constraintFactor,
      inflationInputs,
      opexSensitivity,
      vintage,
      totalRevenue
    });
    dispatch(setAssetMExpense(assetMExpense));
  };
  const updateBusinessRatesExpense = () => {
    const businessRatesExpense = calcBusinessRates({
      businessRates,
      inflationInputs,
      initialCapacity,
      operationStartDate,
      modelStartDate,
      operationEndDate,
      decommissioningEndDate
    });
    dispatch(setBusinessRatesExpense(businessRatesExpense));
  };
  const updateCommunityBenefitExpense = () => {
    const result = calcCommunityBenefit({
      communityBenefit,
      inflationInputs,
      averageWholeSaleDayAheadPrice,
      initialCapacity,
      opexSensitivity,
      operationStartDate,
      modelStartDate,
      operationEndDate,
      decommissioningEndDate
    });
    dispatch(setCommunityBenefitExpense(result));
  };
  const updateInsuranceExpense = () => {
    const result = calcInsuranceExpense({
      insurance,
      inflationInputs,
      initialCapacity,
      opexSensitivity,
      operationStartDate,
      modelStartDate,
      operationEndDate,
      decommissioningEndDate
    });
    dispatch(setInsuranceExpense(result));
  };
  const updateLandRentExpense = () => {
    const result = calcLandRentToPL({
      landRent,
      landSize,
      initialCapacity,
      inflationInputs,
      operationStartDate,
      modelStartDate,
      operationEndDate,
      decommissioningStartDate,
      decommissioningEndDate,
      constructionStartDate
    });
    dispatch(setLandRentExpense(result));
  };
  const updateLegalExpense = () => {
    const result = calcLegalCosts({
      legalCosts,
      inflationInputs,
      initialCapacity,
      opexSensitivity,
      operationStartDate,
      modelStartDate,
      operationEndDate,
      decommissioningEndDate
    });
    dispatch(setLegalExpense(result));
  };
  const updateOAndMexpense = () => {
    const result = calcOperationAndManagementCost({
      batteryDuration,
      inflationInputs,
      operationAndManagementSettings,
      operationStartDate,
      modelStartDate,
      operationEndDate,
      decommissioningEndDate,
      opexSensitivity,
      vintage
    });
    dispatch(setOAndMExpense(result));
  };
  const updateOtherAdminExpense = () => {
    const result = calcOtherAdminCosts({
      otherAdministrativeCosts,
      opexSensitivity,
      inflationInputs,
      operationStartDate,
      modelStartDate,
      operationEndDate,
      decommissioningEndDate
    });
    dispatch(setOtherAdminExpense(result));
  };
  const updateSiteSecurityExpense = () => {
    const result = calcSiteSecurity({
      initialCapacity,
      inflationInputs,
      modelStartDate,
      operationStartDate,
      operationEndDate,
      decommissioningEndDate,
      siteSecurity
    });
    dispatch(setSiteSecurityExpense(result));
  };
  const updateExtendedWarrantyExpense = () => {
    const result = calcExtendedWarranty({
      extended_warranty,
      battery_duration: batteryDuration,
      inflationInputs,
      opexSensitivity,
      modelStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      vintage
    });
    dispatch(setExtendedWarrantyExpense(result));
  };
  const updateIntercompanyExp = () => {
    const result = calcIntercompanyExpense({
      intercompany_expense,
      inflationInputs,
      modelStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      opexSensitivity
    });
    dispatch(setIntercompanyExp(result));
  };
  const updateEasementExpense = () => {
    const result = calcEasementCosts({
      easement_costs,
      inflationInputs,
      modelStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      battery_duration: batteryDuration,
      opexSensitivity
    });
    dispatch(setEasementExpense(result));
  };
  const updateDecommissioningCosts = () => {
    const result = calcDecommissiongCosts({
      costOfAdditions,
      length_of_construction: lengthOfConstruction,
      modelStartDate,
      developmentStartDate,
      constructionStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      length_of_decommissioning: lengthOfDecommissioning
    });
    dispatch(setDecommissioningCosts(result));
  };
  const updateWaterRatesExpense = () => {
    const result = calcWaterRates({
      water_rates,
      inflationInputs,
      modelStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      opexSensitivity
    });
    dispatch(setWaterRatesExpense(result));
  };
  const updateNGSecurities = () => {
    const result = calcNationalGridSecurities({
      national_grid_securities: nationalGridSecurities,
      variable_profile_for_attributable_costs:
        variableProfileForAttributableCosts,
      modelStartDate,
      fullyConsentedDate,
      developmentStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate
    });
    dispatch(setNGSecurities(result));
  };
  const updateTotalAdminCosts = () => {
    const result = calcTotalAdminCosts({
      assetMExpense,
      businessRatesExpense,
      communityBenefitExpense,
      insuranceExpense,
      landRentExpense,
      legalExpense,
      oAndMExpense,
      otherAdminExpense,
      siteSecurityExpense,
      extendedWarrantyExpense,
      intercompanyExp,
      easementExpnese,
      decommissioningCosts,
      waterRatesExpense,
      nGSecurities
    });
    dispatch(setTotalAdminCosts(result));
  };
  const updateBalanceOfPlantDepreciation = () => {
    const result = calcBalanceOfPlant({
      capexUEL,
      costOfAdditions,
      batteryDuration,
      capexSensitivity,
      operationStartDate,
      modelStartDate,
      decommissioningEndDate
    });
    dispatch(setBalanceOfPlantDepreciation(result));
  };
  const updateTransformersDepreciation = () => {
    const result = calcTransformers({
      capexUEL,
      costOfAdditions,
      batteryDuration,
      capexSensitivity,
      operationStartDate,
      modelStartDate,
      decommissioningEndDate
    });
    dispatch(setTransformersDepreciation(result));
  };
  const updateEVDepreciation = () => {
    const result = calcEnterpriseValue({
      capexUEL,
      costOfAdditions,
      batteryDuration,
      capexSensitivity,
      operationStartDate,
      modelStartDate,
      decommissioningEndDate
    });
    dispatch(setEVDepreciation(result));
  };
  const updateVintagesDepreciation = () => {
    const result = calcVintagesDepreciation({
      modelStartDate,
      decommissioningEndDate,
      vintage
    });
    dispatch(setVintagesDepreciation(result));
  };
  const updatePoolingSubstationDepreciation = () => {
    const result = calcPoolingSubstation({
      capexUEL,
      // costOfAdditions comes from fixed~~ 7 Capex~~~7.03~7.10
      costOfAdditions,
      batteryDuration,
      capexSensitivity,
      operationStartDate,
      modelStartDate,
      decommissioningEndDate
    });
    dispatch(setPoolingSubstationDepreciation(result));
  };
  const updateCapitalizedRentInConstruction = () => {
    const result = calcCapitalizedRentInConstruction({
      capexUEL,
      operationStartDate,
      modelStartDate,
      landRent,
      landSize,
      initialCapacity,
      inflationInputs,
      operationEndDate,
      decommissioningStartDate,
      decommissioningEndDate,
      constructionStartDate
    });
    dispatch(setCapitalizedRentInConstruction(result));
  };
  const updateTotalDepreciation = () => {
    const result = calcTotalDepreciation({
      balanceOfPlantDepreciation,
      transformersDepreciation,
      evDepreciation,
      vintagesDepreciation,
      poolingSubstationDepreciation,
      capitalizedRentInConstruction
    });
    dispatch(setTotalDepreciation(result));
  };
  const updateMovementInTradeCreditor = () => {
    const result = calcTradeCreditors({
      working_capital: workingCapital,
      vat,
      modelStartDate,
      operationStartDate,
      decommissioningEndDate,
      developmentStartDate,
      totalCoGS,
      totalAdminCosts,
      landRentExpense,
      decommissioningCosts
    });
    dispatch(setMovementInTradeCreditor(result));
  };
  const updateMovementInTradeDebtor = () => {
    const result = calcTradeDebtors({
      working_capital: workingCapital,
      vat,
      modelStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      developmentStartDate,
      totalRevenue,
      gainOnDisposal
    });
    dispatch(setMovementInTradeDebtor(result));
  };
  const updatetLandAdditions = () => {
    const result = calcLandAdditions({
      costOfAdditions,
      capexPaymentsProfile,
      capexPaymentMilestones,
      batteryDuration,
      initialCapacity,
      capexSensitivity,
      operationStartDate,
      modelStartDate,
      decommissioningEndDate
    });
    dispatch(setLandAdditions(result));
  };
  const updatePoolingSubstationAdditions = () => {
    const result = calcPoolingSubstationAdditions({
      costOfAdditions,
      capexPaymentsProfile,
      capexPaymentMilestones,
      initialCapacity,
      capexSensitivity,
      operationStartDate,
      modelStartDate,
      decommissioningEndDate
    });
    dispatch(setPoolingSubstationAdditions(result));
  };
  const updateTransformersAdditions = () => {
    const result = calcTransformersAdditions({
      costOfAdditions,
      capexPaymentsProfile,
      capexPaymentMilestones,
      initialCapacity,
      capexSensitivity,
      operationStartDate,
      modelStartDate,
      decommissioningEndDate
    });
    dispatch(setTransformersAdditions(result));
  };
  const updateBalanceOfPlantAdditions = () => {
    const result = calcBalacneOfPlantAdditions({
      costOfAdditions,
      capexPaymentsProfile,
      capexPaymentMilestones,
      batteryDuration,
      capexSensitivity,
      operationStartDate,
      modelStartDate,
      decommissioningEndDate
    });
    dispatch(setBalanceOfPlantAdditions(result));
  };
  const updateEVAdditions = () => {
    const result = calcEnterpriseValueAdditions({
      developmentFeePaymentPercentageProfile,
      developmentFeePaymentDateProfile,
      costOfAdditions,
      initialCapacity,
      modelStartDate,
      developmentStartDate,
      decommissioningEndDate
    });
    dispatch(setEVAdditions(result));
  };
  const updateDevexAdditions = () => {
    const result = calcDevexAdditions({
      batteryDuration,
      capexSensitivity,
      operationStartDate,
      modelStartDate,
      decommissioningEndDate
    });
    dispatch(setDevexAdditions(result));
  };
  const updateCapitalExpenditure = () => {
    const result = calcCapitalExpenditure({
      modelStartDate,
      developmentStartDate,
      decommissioningEndDate,
      vintage,
      landAdditions,
      poolingSubstationAdditions,
      transformersAdditions,
      balanceOfPlantAdditions,
      evAdditions,
      devexAdditions,
      landRentExpense
    });
    dispatch(setCapitalExpenditure(result));
  };
  const updateCapexCreditor = () => {
    const result = calcCapexCreditor({
      modelStartDate,
      operationStartDate,
      decommissioningEndDate,
      decommissioningStartDate,
      developmentStartDate,
      vintage,
      landAdditions,
      poolingSubstationAdditions,
      transformersAdditions,
      balanceOfPlantAdditions,
      evAdditions,
      devexAdditions,
      landRentExpense,
      capitalExpenditure
    });
    dispatch(setCapexCreditor(result));
  };
  const updateMovementInPrepayments = () => {
    const result = calcPrepayments({
      operationStartDate,
      modelStartDate,
      developmentStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      landRentExpense
    });
    dispatch(setMovementInPrepayments(result));
  };
  const updateMovementInVATCreditor = () => {
    const result = calcVATCreditor({
      vat,
      modelStartDate,
      operationStartDate,
      decommissioningEndDate,
      decommissioningStartDate,
      developmentStartDate,
      movementInTradeCreditor,
      movementInTradeDebtor,
      capexCreditor
    });
    dispatch(setMovementInVATCreditor(result));
  };
  const updateEBIT = () => {
    const result = calcEBIT({
      totalRevenue,
      totalCoGS,
      totalAdminCosts,
      totalDepreciation
    });
    dispatch(setEBIT(result));
  };
  const updateCorporationTaxValue = () => {
    const result = calcCorporationTax({
      corporationTax,
      modelStartDate,
      operationStartDate,
      decommissioningEndDate,
      decommissioningStartDate,
      developmentStartDate,
      ebit,
      capitalExpenditure
    });
    dispatch(setCorporationTaxValue(result));
  };
  const updateOperatingCashFlowValue = () => {
    const result = calcOperatingCashFlow({
      ebit,
      movementInTradeCreditor,
      movementInTradeDebtor,
      gainOnDisposal,
      decommissioningCosts,
      nGSecurities,
      movementInPrepayments,
      movementInVATCreditor,
      capexCreditor
    });
    dispatch(setOperatingCashFlowValue(result));
  };
  const updateFixedPPAValue = () => {
    const result = calcFixedPPA({
      fixedPPARevenue,
      modelStartDate,
      decommissioningEndDate,
      vintage
    });
    dispatch(setFixedPPAValue(result));
  };
  const updateFloatingPPAValue = () => {
    const result = calcFloatingPPA({
      floatingPPARevenue,
      modelStartDate,
      decommissioningEndDate,
      vintage,
      averageWholeSaleDayAheadPrice
    });
    dispatch(setFloatingPPAValue(result));
  };
  const updatePPAFee = () => {
    const result = calcPPAFees({
      floatingPPAValue,
      fixedPPAValue,
      ppaFeesPercentage
    });
    dispatch(setPPAFee(result));
  };

  return {
    updateVintage,
    updateMCapexProvision
  };
};

export default useParameter;
