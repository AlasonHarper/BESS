import { useEffect, useMemo, useState } from 'react';
import { fixedAssetsForBalanceSheet } from '../../Balance sheet/Non current asset/Fixed asset/total_fixed_asset';
import {
  getFilterData,
  getHeaders,
  localeStringArray,
  roundArray,
  sumArrays
} from '../../calculates/utils';
import DateRangePicker from '../../components/FinStatements/DateRangePicker';
import ParamCollapsableTable from '../../components/FinStatements/StatementTable';
import TypeSelector from '../../components/FinStatements/TypeSelector';
import { useAppSelector } from '../../store/hooks';
import { selectResult } from '../../store/slices/resultSlice';
import moment from 'moment';
import { DATE_FORMAT } from '../../utils/usePrameter';

export function BalanceSheet() {
  const {
    modelStartDate,
    // basic project inputs
    initialCapacity,
    landSize,
    constructionStartDate,
    operationStartDate,
    operationEndDate,
    decommissioningStartDate,
    decommissioningEndDate,
    // battery assumption inputs

    batterySensitivity,
    batteryDuration,
    initialCycleData,
    startingAssumptionsForBatteries,
    batteryEfficiency,
    batteryDisposals,
    batteryAugmentation,
    // revenue inputs
    revenueSensitivity,
    revenueSetup,
    assumptionsData,
    averageWholeSaleDayAheadPrice,
    detailedRevenueData,
    //admin costs inputs
    landRent,
    operationAndManagementSettings,
    assetManagement,
    insurance,
    communityBenefit,
    businessRates,
    extended_warranty,
    siteSecurity,
    legalCosts,
    otherAdministrativeCosts,
    // CoGS inputs
    optimiser,
    auxilliaryLossesSettings,
    meteringSettings,
    exportChargesOfTNUoS,
    localCircuitsData,
    localSubstationTariff,
    localSubstationSwitch,
    ajdustmentTariffData,
    systemPeakTariffData,
    sharedYearRoundTariffData,
    notSharedYearRoundTariffData,
    // Capex inputs
    model,
    costOfAdditions,
    capexUEL,
    batteryCubes,
    batteryExCubes,
    capexPaymentsProfile,
    capexPaymentMilestones,
    // other inputs
    inflationInputs,
    corporationTax,
    capexProvision,
    cashRequirements,
    gearingByCapexType,
    equity,
    seniorDebt,
    dividends,
    developmentFeePaymentPercentageProfile,
    developmentFeePaymentDateProfile,
    developmentStartDate,
    workingCapital,
    vat,

    // // costOfAdditions comes from fixed~~ 7 Capex~~~7.03~7.10
    bessCapexForecast,
    operationYears,
    capexSensitivity,
    // sensitivities,
    constraintFactor,
    opexSensitivity,
    nationalGridSecurities,
    variableProfileForAttributableCosts,
    calculationPeriod,
    fullyConsentedDate
  } = useAppSelector(selectResult);
  // const { updateVintage,updateCapexProvision } = useParameter();

  const {
    wholesaleDayAhead,
    wholesaleDayIntraday,
    balancingMechanism,
    capacityMarket,
    frequencyResponse,
    gainOnDisposal,
    totalRevenue,
    vintage,
    mCapexProvision
  } = useAppSelector(selectResult);
  const {
    auxilliaryLoss,
    optimiserCost,
    tnuosCharge,
    meteringCost,
    totalCoGS
  } = useAppSelector(selectResult);
  const {
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
    easementExpnese,
    intercompanyExp,
    decommissioningCosts,
    waterRatesExpense,
    nGSecurities,
    totalAdminCosts
  } = useAppSelector(selectResult);
  const {
    balanceOfPlantDepreciation,
    evDepreciation,
    poolingSubstationDepreciation,
    transformersDepreciation,
    capitalizedRentInConstruction,
    vintagesDepreciation,
    totalDepreciation
  } = useAppSelector(selectResult);
  const { ebit } = useAppSelector(selectResult);
  const {
    movementInTradeCreditor,
    movementInTradeDebtor,
    capexCreditor,
    movementInVATCreditor,
    movementInPrepayments
  } = useAppSelector(selectResult);
  const { corporationTaxValue, capitalExpenditure, operatingCashFlowValue } =
    useAppSelector(selectResult);

  const [active, setActive] = useState('monthly');
  const [dateRange, setDateRange] = useState({
    from: '2023-01-01',
    to: '2024-01-01'
  });

  useEffect(() => {
    if (active == 'monthly') {
      setDateRange({
        from: operationStartDate,
        to: moment(operationStartDate).add(19, 'month').format(DATE_FORMAT)
      });
    } else if (active == 'semi_annually') {
      setDateRange({
        from: operationStartDate,
        to: moment(operationStartDate)
          .add(20 * 6 - 5, 'month')
          .format(DATE_FORMAT)
      });
    } else {
      setDateRange({
        from: operationStartDate,
        to: moment(operationStartDate).add(19, 'year').format(DATE_FORMAT)
      });
    }
  }, [active, operationStartDate]);

  const headers = useMemo(() => {
    return getHeaders(modelStartDate, active, dateRange);
  }, [modelStartDate, active, dateRange]);
  const tableData = useMemo(() => {
    const payload = {
      gainOnDisposal,
      capitalExpenditure,
      totalDepreciation,
      movementInTradeDebtor,
      vintage,
      mCapexProvision,
      // basic project inputs
      initialCapacity,
      landSize,
      modelStartDate,
      constructionStartDate,
      operationStartDate,
      operationEndDate,
      decommissioningStartDate,
      decommissioningEndDate,
      // battery assumption inputs

      batterySensitivity,
      batteryDuration,
      initialCycleData,
      startingAssumptionsForBatteries,
      batteryEfficiency,
      batteryDisposals,
      batteryAugmentation,
      // revenue inputs
      revenueSensitivity,
      revenueSetup,
      assumptionsData,
      averageWholeSaleDayAheadPrice,
      detailedRevenueData,
      //admin costs inputs
      landRent,
      operationAndManagementSettings,
      assetManagement,
      insurance,
      communityBenefit,
      businessRates,
      extended_warranty,
      siteSecurity,
      legalCosts,
      otherAdministrativeCosts,
      // CoGS inputs
      optimiser,
      auxilliaryLossesSettings,
      meteringSettings,
      exportChargesOfTNUoS,
      localCircuitsData,
      localSubstationTariff,
      localSubstationSwitch,
      ajdustmentTariffData,
      systemPeakTariffData,
      sharedYearRoundTariffData,
      notSharedYearRoundTariffData,
      // Capex inputs
      model,
      costOfAdditions,
      capexUEL,
      batteryCubes,
      batteryExCubes,
      capexPaymentsProfile,
      capexPaymentMilestones,
      // other inputs
      inflationInputs,
      corporationTax,
      capexProvision,
      cashRequirements,
      gearingByCapexType,
      equity,
      seniorDebt,
      dividends,
      developmentFeePaymentPercentageProfile,
      developmentFeePaymentDateProfile,
      developmentStartDate,
      workingCapital,
      working_capital: workingCapital,
      vat,

      // // costOfAdditions comes from fixed~~ 7 Capex~~~7.03~7.10
      bessCapexForecast,
      operationYears,
      capexSensitivity,
      // sensitivities,
      constraintFactor,
      opexSensitivity,
      national_grid_securities: nationalGridSecurities,
      variable_profile_for_attributable_costs:
        variableProfileForAttributableCosts,
      fullyConsentedDate
    };
    // console.log("mCapexProvision",mCapexProvision)
    const rlt = {
      id: 'cashflow',
      title: 'Cashflow',
      data: [],
      children: [
        {
          id: 'total_assets',
          title: 'Total assets',
          data: localeStringArray(
            getFilterData(
              roundArray(
                sumArrays(
                  fixedAssetsForBalanceSheet(payload),
                  nGSecurities?.national_grid_securities_for_balance_sheet,
                  sumArrays(
                    movementInTradeDebtor?.trade_debtors_for_balance_sheet,
                    movementInPrepayments?.prepayments_for_balance_sheet,
                    mCapexProvision?.cashEndBalance
                  )
                ),
                1
              ),
              modelStartDate,
              active,
              dateRange
            )
          ),
          children: [
            {
              id: 'non_current_assets',
              title: 'Non-current assets',
              data: localeStringArray(
                getFilterData(
                  roundArray(
                    sumArrays(
                      fixedAssetsForBalanceSheet(payload),
                      nGSecurities?.national_grid_securities_for_balance_sheet
                    ),
                    1
                  ),
                  modelStartDate,
                  active,
                  dateRange
                )
              ),
              children: [
                {
                  id: 'fixed_assets',
                  title: 'Fixed assets',
                  data: localeStringArray(
                    getFilterData(
                      roundArray(fixedAssetsForBalanceSheet(payload), 1),
                      modelStartDate,
                      active,
                      dateRange
                    )
                  )
                },
                {
                  id: 'escrow_account',
                  title: 'Escrow account',
                  data: localeStringArray(
                    getFilterData(
                      roundArray(
                        nGSecurities?.national_grid_securities_for_balance_sheet ||
                          [],
                        1
                      ),
                      modelStartDate,
                      active,
                      dateRange
                    )
                  )
                }
              ]
            },
            {
              id: 'current_assets',
              title: 'Current assets',
              data: localeStringArray(
                getFilterData(
                  roundArray(
                    sumArrays(
                      movementInTradeDebtor?.trade_debtors_for_balance_sheet,
                      movementInPrepayments?.prepayments_for_balance_sheet,
                      mCapexProvision?.cashEndBalance
                    ),
                    1
                  ),
                  modelStartDate,
                  active,
                  dateRange
                )
              ),
              children: [
                {
                  id: 'trade_debtors',
                  title: 'Trade debtors',
                  data: localeStringArray(
                    getFilterData(
                      roundArray(
                        movementInTradeDebtor?.trade_debtors_for_balance_sheet ||
                          [],
                        1
                      ),
                      modelStartDate,
                      active,
                      dateRange
                    )
                  )
                },
                {
                  id: 'prepayments',
                  title: 'Prepayments',
                  data: localeStringArray(
                    getFilterData(
                      roundArray(
                        movementInPrepayments?.prepayments_for_balance_sheet ||
                          [],
                        1
                      ),
                      modelStartDate,
                      active,
                      dateRange
                    )
                  )
                },
                {
                  id: 'cash',
                  title: 'Cash',
                  data: localeStringArray(
                    getFilterData(
                      roundArray(mCapexProvision?.cashEndBalance || [], 1),
                      modelStartDate,
                      active,
                      dateRange
                    )
                  )
                }
              ]
            }
          ]
        },
        {
          id: 'total_liabilities',
          title: 'Total liabilities',
          data: localeStringArray(
            getFilterData(
              roundArray(
                sumArrays(
                  movementInTradeCreditor?.trade_creditors_for_balance_sheet,
                  capexCreditor?.capex_creditor_for_balance_sheet,
                  movementInVATCreditor?.vat_creditor_for_balance_sheet,
                  sumArrays(
                    mCapexProvision?.senior_debt_for_balance_sheet,
                    mCapexProvision?.shareholder_loan_for_balance_sheet,
                    decommissioningCosts?.decommissioning_provision_for_balance_sheet
                  ),
                  corporationTaxValue?.corporate_tax_creditor_for_balance_sheet
                ),
                1
              ),
              modelStartDate,
              active,
              dateRange
            )
          ),
          children: [
            {
              id: 'current_liabilities',
              title: 'Current liabilities',
              data: localeStringArray(
                getFilterData(
                  roundArray(
                    sumArrays(
                      movementInTradeCreditor?.trade_creditors_for_balance_sheet,
                      capexCreditor?.capex_creditor_for_balance_sheet,
                      movementInVATCreditor?.vat_creditor_for_balance_sheet,
                      corporationTaxValue?.corporate_tax_creditor_for_balance_sheet
                    ),
                    1
                  ),
                  modelStartDate,
                  active,
                  dateRange
                )
              ),
              children: [
                {
                  id: 'trade_creditors',
                  title: 'Trade creditors',
                  data: localeStringArray(
                    getFilterData(
                      roundArray(
                        movementInTradeCreditor?.trade_creditors_for_balance_sheet ||
                          [],
                        1
                      ),
                      modelStartDate,
                      active,
                      dateRange
                    )
                  )
                },
                {
                  id: 'capex_creditor',
                  title: 'Capex creditor',
                  data: localeStringArray(
                    getFilterData(
                      roundArray(
                        capexCreditor?.capex_creditor_for_balance_sheet || [],
                        1
                      ),
                      modelStartDate,
                      active,
                      dateRange
                    )
                  )
                },
                {
                  id: 'vat_creditor',
                  title: 'VAT creditor',
                  data: localeStringArray(
                    getFilterData(
                      roundArray(
                        movementInVATCreditor?.vat_creditor_for_balance_sheet ||
                          [],
                        1
                      ),
                      modelStartDate,
                      active,
                      dateRange
                    )
                  )
                },
                {
                  id: 'corporate_tax_creditor',
                  title: 'Corporate tax creditor',
                  data: localeStringArray(
                    getFilterData(
                      roundArray(
                        corporationTaxValue?.corporate_tax_creditor_for_balance_sheet ||
                          [],
                        1
                      ),
                      modelStartDate,
                      active,
                      dateRange
                    )
                  )
                }
              ]
            },
            {
              id: 'non_current_liabilities',
              title: 'Non-current liabilities',
              data: localeStringArray(
                getFilterData(
                  roundArray(
                    sumArrays(
                      mCapexProvision?.senior_debt_for_balance_sheet,
                      mCapexProvision?.shareholder_loan_for_balance_sheet,
                      decommissioningCosts?.decommissioning_provision_for_balance_sheet
                    ),
                    1
                  ),
                  modelStartDate,
                  active,
                  dateRange
                )
              ),
              children: [
                {
                  id: 'senior_debt',
                  title: 'Senior debt',
                  data: localeStringArray(
                    getFilterData(
                      roundArray(
                        mCapexProvision?.senior_debt_for_balance_sheet || [],
                        1
                      ),
                      modelStartDate,
                      active,
                      dateRange
                    )
                  )
                },
                {
                  id: 'shareholder_loan',
                  title: 'Shareholder loan',
                  data: localeStringArray(
                    getFilterData(
                      roundArray(
                        mCapexProvision?.shareholder_loan_for_balance_sheet ||
                          [],
                        1
                      ),
                      modelStartDate,
                      active,
                      dateRange
                    )
                  )
                },
                {
                  id: 'decommissioning_provision',
                  title: 'Decommissioning provision',
                  data: localeStringArray(
                    getFilterData(
                      roundArray(
                        decommissioningCosts?.decommissioning_provision_for_balance_sheet ||
                          [],
                        1
                      ),
                      modelStartDate,
                      active,
                      dateRange
                    )
                  )
                }
              ]
            }
          ]
        },
        {
          id: 'shareholder_funds',
          title: 'Shareholders funds',
          data: localeStringArray(
            getFilterData(
              roundArray(
                sumArrays(
                  mCapexProvision.share_capital_end_balance,
                  mCapexProvision.retained_earnings_end_balance
                ),
                1
              ),
              modelStartDate,
              active,
              dateRange
            )
          ),
          children: [
            {
              id: 'share_capital',
              title: 'Share capital',
              data: localeStringArray(
                getFilterData(
                  mCapexProvision.share_capital_end_balance,
                  modelStartDate,
                  active,
                  dateRange
                )
              )
            },
            {
              id: 'retained_earnings',
              title: 'Retained earnings',
              data: localeStringArray(
                getFilterData(
                  roundArray(mCapexProvision.retained_earnings_end_balance, 1),
                  modelStartDate,
                  active,
                  dateRange
                )
              )
            }
          ]
        }
      ]
    };
    return rlt;
  }, [
    initialCapacity,
    landSize,
    modelStartDate,
    constructionStartDate,
    operationStartDate,
    operationEndDate,
    decommissioningStartDate,
    decommissioningEndDate,
    // battery assumption inputs

    batterySensitivity,
    batteryDuration,
    initialCycleData,
    startingAssumptionsForBatteries,
    batteryEfficiency,
    batteryDisposals,
    batteryAugmentation,
    // revenue inputs
    revenueSensitivity,
    revenueSetup,
    assumptionsData,
    averageWholeSaleDayAheadPrice,
    detailedRevenueData,
    //admin costs inputs
    landRent,
    operationAndManagementSettings,
    assetManagement,
    insurance,
    communityBenefit,
    businessRates,
    extended_warranty,
    siteSecurity,
    legalCosts,
    otherAdministrativeCosts,
    // CoGS inputs
    optimiser,
    auxilliaryLossesSettings,
    meteringSettings,
    exportChargesOfTNUoS,
    localCircuitsData,
    localSubstationTariff,
    localSubstationSwitch,
    ajdustmentTariffData,
    systemPeakTariffData,
    sharedYearRoundTariffData,
    notSharedYearRoundTariffData,
    // Capex inputs
    model,
    costOfAdditions,
    capexUEL,
    batteryCubes,
    batteryExCubes,
    capexPaymentsProfile,
    capexPaymentMilestones,
    // other inputs
    inflationInputs,
    corporationTax,
    capexProvision,
    cashRequirements,
    gearingByCapexType,
    equity,
    seniorDebt,
    dividends,
    developmentFeePaymentPercentageProfile,
    developmentFeePaymentDateProfile,
    developmentStartDate,
    workingCapital,
    vat,

    // // costOfAdditions comes from fixed~~ 7 Capex~~~7.03~7.10
    bessCapexForecast,
    operationYears,
    capexSensitivity,
    // sensitivities,
    constraintFactor,
    opexSensitivity,
    nationalGridSecurities,
    variableProfileForAttributableCosts,
    fullyConsentedDate,
    active,
    modelStartDate,
    dateRange
  ]);
  return (
    <div style={{ flex: 1, padding: 5 }}>
      <div style={{ fontSize: 25, paddingBottom: 10, fontWeight: '900' }}>
        Balance Sheet
      </div>

      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          marginBottom: 10
        }}
      >
        <TypeSelector active={active} setActive={setActive} />
        <div style={{ marginLeft: 20 }}>
          <DateRangePicker
            value={dateRange}
            minDate={modelStartDate}
            maxDate={decommissioningEndDate}
            onChange={(v) => {
              setDateRange(v);
            }}
          />
        </div>
      </div>
      <ParamCollapsableTable headers={headers} itemList={tableData} />
    </div>
  );
}
