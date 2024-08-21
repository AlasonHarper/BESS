import { useEffect, useMemo, useState } from 'react';
import {
  getFilterData,
  getHeaders,
  localeStringArray,
  multiplyNumber,
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

export function CashFlow() {
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
    // mCapexProvision,
    // vintage
  } = useAppSelector(selectResult);
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
    totalAdminCosts,
    ebit
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
  const {
    movementInTradeCreditor,
    movementInTradeDebtor,
    capexCreditor,
    movementInVATCreditor,
    movementInPrepayments
  } = useAppSelector(selectResult);
  const { corporationTaxValue, capitalExpenditure, operatingCashFlowValue } =
    useAppSelector(selectResult);

  const headers = useMemo(() => {
    const result = getHeaders(modelStartDate, active, dateRange);
    return result;
  }, [modelStartDate, calculationPeriod, active, dateRange]);

  const tableData = useMemo(() => {
    const payload = {
      wholesaleDayAhead,
      wholesaleDayIntraday,
      balancingMechanism,
      capacityMarket,
      frequencyResponse,
      gainOnDisposal,
      totalRevenue,
      vintage,
      mCapexProvision,
      auxilliaryLoss,
      optimiserCost,
      tnuosCharge,
      meteringCost,
      totalCoGS,
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
      totalAdminCosts,
      ebit,
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
      opexSensitivity
    };
    const cash_starting_balance = roundArray(
      mCapexProvision.cashStartBalance,
      1
    );
    // const operating_cash_flow = calcOperatingCashFlow(payload);
    // const corporation_tax = calcCorporationTax(payload);
    // const ebit = calcEBIT(payload);
    // const gain_on_disposal = calcGainOnDisposal(payload);
    // const capital_expenditure = calcCapitalExpenditure(payload);
    // console.log(
    //   getFilterData(
    //     roundArray(cash_starting_balance, 1),
    //     modelStartDate,
    //     active,
    //     dateRange
    //   )
    // );
    const rlt = {
      id: 'cashflow',
      title: 'Cashflow',
      data: [],
      children: [
        {
          id: 'cash_starting_balance',
          title: 'Cash starting balance',
          data: localeStringArray(
            roundArray(
              getFilterData(
                cash_starting_balance,
                modelStartDate,
                active,
                dateRange
              ),
              1
            )
          )
        },
        {
          id: 'net_cashflow',
          title: 'Net cashflow',
          data: localeStringArray(
            roundArray(
              getFilterData(
                mCapexProvision.netCashflow,
                modelStartDate,
                active,
                dateRange
              ),
              1
            )
          ),
          children: [
            {
              id: 'cashflow_from_operating',
              title: 'Cashflow from Operating',
              data: localeStringArray(
                getFilterData(
                  roundArray(
                    sumArrays(
                      operatingCashFlowValue,
                      corporationTaxValue?.taxPayment || []
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
                  id: 'forecast_ebitda',
                  title: 'Forecast EBITDA',
                  data: localeStringArray(
                    getFilterData(
                      roundArray(ebit?.ebitda || [], 1),
                      modelStartDate,
                      active,
                      dateRange
                    )
                  )
                },
                {
                  id: 'movement_in_accounts',
                  title: 'Movemet in Accounts',
                  data: localeStringArray(
                    getFilterData(
                      roundArray(
                        sumArrays(
                          operatingCashFlowValue,
                          multiplyNumber(ebit?.ebitda || [], -1)
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
                      id: 'less_gain_on_disposal',
                      title: `Less gain/(loss) on disposal`,
                      data: localeStringArray(
                        getFilterData(
                          gainOnDisposal?.gainOnDisposalRevenue || [],
                          modelStartDate,
                          active,
                          dateRange
                        )
                      )
                    },
                    {
                      id: 'movement_in_trade_debtors',
                      title: `Movement in trade debtors`,
                      data: localeStringArray(
                        getFilterData(
                          movementInTradeDebtor?.movement_in_working_capital ||
                            [],
                          modelStartDate,
                          active,
                          dateRange
                        )
                      )
                    },
                    {
                      id: 'pmovement_in_repayments',
                      title: `Movement in repayments`,
                      data: localeStringArray(
                        getFilterData(
                          movementInPrepayments?.movement_in_working_capital ||
                            [],
                          modelStartDate,
                          active,
                          dateRange
                        )
                      )
                    },
                    {
                      id: 'movement_in_trade_creditors',
                      title: `Movement in trade creditors`,
                      data: localeStringArray(
                        getFilterData(
                          movementInTradeCreditor?.movement_in_working_capital ||
                            [],
                          modelStartDate,
                          active,
                          dateRange
                        )
                      )
                    },
                    {
                      id: 'movement_in_capex_creditor',
                      title: `Movement in capex creditor`,
                      data: localeStringArray(
                        getFilterData(
                          capexCreditor?.movement_in_working_capital || [],
                          modelStartDate,
                          active,
                          dateRange
                        )
                      )
                    },
                    {
                      id: 'movement_in_vat_creditor',
                      title: `Movement in VAT creditor`,
                      data: localeStringArray(
                        getFilterData(
                          movementInVATCreditor?.movement_in_working_capital ||
                            [],
                          modelStartDate,
                          active,
                          dateRange
                        )
                      )
                    },
                    {
                      id: 'movement_in_escrow_account',
                      title: `Movement in Escrow account`,
                      data: localeStringArray(
                        getFilterData(
                          nGSecurities?.national_grid_securities_for_cash_flow ||
                            [],
                          modelStartDate,
                          active,
                          dateRange
                        )
                      )
                    },
                    {
                      id: 'movement_in_decommissioning_provision',
                      title: `Movement in decommissioning provision`,
                      data: localeStringArray(
                        getFilterData(
                          decommissioningCosts?.movement_in_working_capital ||
                            [],
                          modelStartDate,
                          active,
                          dateRange
                        )
                      )
                    }
                  ]
                },
                {
                  id: 'corporation_tax',
                  title: 'Corporation tax',
                  data: localeStringArray(
                    getFilterData(
                      roundArray(corporationTaxValue?.taxPayment || [], 1),
                      modelStartDate,
                      active,
                      dateRange
                    )
                  )
                }
              ]
            },
            {
              id: 'cashflow_from_investing',
              title: 'Cashflow from Investing',
              data: localeStringArray(
                getFilterData(
                  roundArray(
                    sumArrays(
                      capitalExpenditure?.capexExpenditureForCashflow || [],
                      gainOnDisposal?.forecastRecycleRevenue || []
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
                  id: 'capital_expenditure',
                  title: 'Capital expenditure',
                  data: localeStringArray(
                    getFilterData(
                      roundArray(
                        capitalExpenditure?.capexExpenditureForCashflow || [],
                        1
                      ),
                      modelStartDate,
                      active,
                      dateRange
                    )
                  )
                },
                {
                  id: 'sale_of_fixed_assets',
                  title: 'Sale of fixed assets',
                  data: localeStringArray(
                    getFilterData(
                      roundArray(
                        gainOnDisposal?.forecastRecycleRevenue || [],
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
              id: 'cashflow_from_financing',
              title: 'Cashflow from Financing',
              data: localeStringArray(
                getFilterData(
                  roundArray(
                    sumArrays(
                      sumArrays(
                        mCapexProvision.seniorDebtDrawdown,
                        mCapexProvision.shareholderLoanDrawdown,
                        mCapexProvision.shareCapitalDrawdown
                      ),
                      sumArrays(
                        mCapexProvision.seniorDebtRepayment,
                        mCapexProvision.shareholder_loan_repayment
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
                  id: 'drawdowns',
                  title: 'Drawdowns',
                  data: localeStringArray(
                    getFilterData(
                      roundArray(
                        sumArrays(
                          mCapexProvision.seniorDebtDrawdown,
                          mCapexProvision.shareholderLoanDrawdown,
                          mCapexProvision.shareCapitalDrawdown
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
                      id: 'senior_debawdrawdown',
                      title: `Senior debt drawdown`,
                      data: localeStringArray(
                        getFilterData(
                          roundArray(mCapexProvision.seniorDebtDrawdown, 1),
                          modelStartDate,
                          active,
                          dateRange
                        )
                      )
                    },
                    {
                      id: 'shareholder_loan_drawdown',
                      title: `Shareholder loan drawdown`,
                      data: localeStringArray(
                        getFilterData(
                          roundArray(
                            mCapexProvision.shareholderLoanDrawdown,
                            1
                          ),
                          modelStartDate,
                          active,
                          dateRange
                        )
                      )
                    },
                    {
                      id: 'share_capital_drawdown',
                      title: `Share capital drawdown`,
                      data: localeStringArray(
                        getFilterData(
                          roundArray(mCapexProvision.shareCapitalDrawdown, 1),
                          modelStartDate,
                          active,
                          dateRange
                        )
                      )
                    }
                  ]
                },
                {
                  id: 'repayments',
                  title: 'Repayments',
                  data: localeStringArray(
                    getFilterData(
                      roundArray(
                        sumArrays(
                          mCapexProvision.seniorDebtRepayment,
                          mCapexProvision.shareholder_loan_repayment
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
                      id: 'senior_debt_repayment',
                      title: `Senior debt repayment`,
                      data: localeStringArray(
                        getFilterData(
                          roundArray(mCapexProvision.seniorDebtRepayment, 1),
                          modelStartDate,
                          active,
                          dateRange
                        )
                      )
                    },
                    {
                      id: 'shareholder_loan_repayment',
                      title: `Shareholder loan repayment`,
                      data: localeStringArray(
                        getFilterData(
                          roundArray(
                            mCapexProvision.shareholder_loan_repayment,
                            1
                          ),
                          modelStartDate,
                          active,
                          dateRange
                        )
                      )
                    }
                    // {
                    //   id: 'share_capital_repayment',
                    //   title: `Share capital repayment`,
                    //   data: roundArray(mCapexProvision.shareCapitalRepayment,1)
                    // },
                  ]
                }
                // {
                //   id: 'dividends',
                //   title: 'Dividends',
                //   data: roundArray(corporation_tax.taxPayment,1)
                // }
              ]
            }
          ]
        },
        {
          id: 'cash_ending_balance',
          title: 'Cash ending balance',
          data: localeStringArray(
            getFilterData(
              roundArray(mCapexProvision.cashEndBalance, 1),
              modelStartDate,
              active,
              dateRange
            )
          )
        }
      ]
    };
    return rlt;
  }, [mCapexProvision, vintage, modelStartDate, active, dateRange]);
  return (
    <>
      <div style={{ flex: 1, padding: 5 }}>
        <div style={{ fontSize: 25, paddingBottom: 10, fontWeight: '900' }}>
          Cashflow statement
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
    </>
  );
}
