import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import {
  getFilterData,
  getHeaders,
  localeStringArray,
  roundArray,
  sumArrays
} from '../../calculates/utils';
import ParamCollapsableTable from '../../components/FinStatements/StatementTable';
import { useAppSelector } from '../../store/hooks';
import { selectResult } from '../../store/slices/resultSlice';
import TypeSelector from '../../components/FinStatements/TypeSelector';
import DateRangePicker from '../../components/FinStatements/DateRangePicker';
import { DATE_FORMAT } from '../../utils/usePrameter';

export function ProfitLoss() {
  const {
    nationalGridSecurities,
    variableProfileForAttributableCosts,
    fullyConsentedDate,
    corporationTax,
    capexProvision,
    cashRequirements,
    gearingByCapexType,
    equity,
    seniorDebt,
    dividends,
    developmentFeePaymentPercentageProfile,
    developmentFeePaymentDateProfile,
    workingCapital,
    vat,
    landRent,
    landSize,
    operationEndDate,
    constructionStartDate,
    costOfAdditions,
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
    batteryDuration,
    batteryCubes,
    batteryExCubes,
    inflationInputs,
    capexPaymentsProfile,
    capexPaymentMilestones,
    capexUEL,
    bessCapexForecast,
    batterySensitivity,
    operationYears,
    capexSensitivity,
    modelStartDate,
    operationStartDate,
    decommissioningEndDate,
    decommissioningStartDate,
    developmentStartDate,
    lengthOfConstruction,
    lengthOfDecommissioning,
    meteringSettings,
    auxilliaryLossesSettings,
    systemPeakTariffData,
    sharedYearRoundTariffData,
    notSharedYearRoundTariffData,
    ajdustmentTariffData,
    exportChargesOfTNUoS,
    localSubstationTariff,
    localSubstationSwitch,
    localCircuitsData,
    extendedWarranty,
    siteSecurity,
    otherAdministrativeCosts,
    legalCosts,
    insurance,
    communityBenefit,
    averageWholeSaleDayAheadPrice,
    businessRates,
    assetManagement,
    revenueSensitivity,
    operationAndManagementSettings,
    constraintFactor,
    opexSensitivity,
    calculationPeriod,
    optimiser
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
    fixedPPAValue,
    floatingPPAValue,
    totalRevenue,
    vintage,
    mCapexProvision
  } = useAppSelector(selectResult);
  const {
    ppaFee,
    auxilliaryLoss,
    optimiserCost,
    tnuosCharge,
    meteringCost,
    totalCoGS
  } = useAppSelector(selectResult);
  const {
    water_rates,
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
  const { corporationTaxValue, operatingCashFlowValue, capitalExpenditure } =
    useAppSelector(selectResult);

  const headers = useMemo(() => {
    return getHeaders(modelStartDate, active, dateRange);
  }, [modelStartDate, calculationPeriod, active, dateRange]);

  // useEffect(() => {
  //   console.log(floatingPPAValue);
  // }, [floatingPPAValue]);

  const tableData = useMemo(() => {
    const payload = {
      // revenue
      wholesaleDayAhead,
      wholesaleDayIntraday,
      balancingMechanism,
      frequencyResponse,
      capacityMarket,
      gainOnDisposal,
      fixedPPAValue,
      // revenueF
      vintage,
      national_grid_securities: nationalGridSecurities,
      variable_profile_for_attributable_costs:
        variableProfileForAttributableCosts,
      fullyConsentedDate,
      corporationTax,
      capexProvision,
      cashRequirements,
      gearingByCapexType,
      equity,
      seniorDebt,
      dividends,
      developmentFeePaymentPercentageProfile,
      developmentFeePaymentDateProfile,
      workingCapital,
      working_capital: workingCapital,
      vat,
      landRent,
      landSize,
      operationEndDate,
      constructionStartDate,
      costOfAdditions,
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
      batteryDuration,
      batteryCubes,
      batteryExCubes,
      inflationInputs,
      capexPaymentsProfile,
      capexPaymentMilestones,
      capexUEL,
      bessCapexForecast,
      batterySensitivity,
      operationYears,
      capexSensitivity,
      modelStartDate,
      operationStartDate,
      decommissioningEndDate,
      decommissioningStartDate,
      developmentStartDate,
      length_of_construction: lengthOfConstruction,
      length_of_decommissioning: lengthOfDecommissioning,
      meteringSettings,
      auxilliaryLossesSettings,
      systemPeakTariffData,
      sharedYearRoundTariffData,
      notSharedYearRoundTariffData,
      ajdustmentTariffData,
      exportChargesOfTNUoS,
      localSubstationTariff,
      localSubstationSwitch,
      localCircuitsData,
      opex_sensitivity: opexSensitivity,
      battery_duration: batteryDuration,
      extended_warranty: extendedWarranty,
      siteSecurity,
      otherAdministrativeCosts,
      legalCosts,
      insurance,
      communityBenefit,
      averageWholeSaleDayAheadPrice,
      businessRates,
      assetManagement,
      revenueSensitivity,
      operationAndManagementSettings,
      constraintFactor,
      opexSensitivity,
      calculationPeriod,
      optimiser
    };

    const rlt = {
      id: 'cashflow',
      title: 'Cashflow',
      data: [],
      children: [
        {
          id: 'total_revenue',
          title: 'Total Revenue',
          data: localeStringArray(
            getFilterData(
              roundArray(totalRevenue, 1),
              modelStartDate,
              active,
              dateRange
            )
          ),
          children: [
            {
              id: 'wholesale_day_ahead',
              title: 'Wholesale day ahead',
              data: localeStringArray(
                getFilterData(
                  roundArray(wholesaleDayAhead, 3),
                  modelStartDate,
                  active,
                  dateRange
                )
              )
            },
            {
              id: 'wholesale_day_intraday',
              title: 'Wholesale day intraday',
              data: localeStringArray(
                getFilterData(
                  roundArray(wholesaleDayIntraday, 3),
                  modelStartDate,
                  active,
                  dateRange
                )
              )
            },
            {
              id: 'balancing_mechanism',
              title: 'Balancing Mechanism',
              data: localeStringArray(
                getFilterData(
                  roundArray(balancingMechanism, 1),
                  modelStartDate,
                  active,
                  dateRange
                )
              )
            },
            {
              id: 'capacity_market',
              title: 'Capacity Market',
              data: localeStringArray(
                getFilterData(
                  roundArray(capacityMarket, 1),
                  modelStartDate,
                  active,
                  dateRange
                )
              )
            },
            {
              id: 'frequency_response',
              title: 'Frequency response',
              data: localeStringArray(
                getFilterData(
                  roundArray(frequencyResponse, 1),
                  modelStartDate,
                  active,
                  dateRange
                )
              )
            },
            {
              id: 'gain_on_disposal_of_batteries',
              title: 'Gain on disposal of batteries',
              data: localeStringArray(
                getFilterData(
                  roundArray(gainOnDisposal?.gainOnDisposalRevenue || [], 1),
                  modelStartDate,
                  active,
                  dateRange
                )
              )
            },
            {
              id: 'fixed_ppa',
              title: 'Fixed PPA',
              data: localeStringArray(
                getFilterData(
                  roundArray(fixedPPAValue || [], 1),
                  modelStartDate,
                  active,
                  dateRange
                )
              )
            },
            {
              id: 'floating_ppa',
              title: 'Floating PPA',
              data: localeStringArray(
                getFilterData(
                  roundArray(floatingPPAValue || [], 1),
                  modelStartDate,
                  active,
                  dateRange
                )
              )
            }
          ]
        },
        {
          id: 'total_cost_of_sales',
          title: 'Total cost of sales',
          data: localeStringArray(
            getFilterData(
              roundArray(totalCoGS, 1),
              modelStartDate,
              active,
              dateRange
            )
          ),
          children: [
            {
              id: 'ppa_fee',
              title: 'PPA fee',
              data: localeStringArray(
                getFilterData(
                  roundArray(ppaFee, 1),
                  modelStartDate,
                  active,
                  dateRange
                )
              )
            },
            {
              id: 'optimiser_commission',
              title: 'Optimiser commission',
              data: localeStringArray(
                getFilterData(
                  roundArray(optimiserCost, 1),
                  modelStartDate,
                  active,
                  dateRange
                )
              )
            },
            {
              id: 'auxilliary_lossees',
              title: 'Auxilliary losses',
              data: localeStringArray(
                getFilterData(
                  roundArray(auxilliaryLoss, 1),
                  modelStartDate,
                  active,
                  dateRange
                )
              )
            },
            {
              id: 'metering',
              title: 'Metering',
              data: localeStringArray(
                getFilterData(
                  roundArray(meteringCost, 1),
                  modelStartDate,
                  active,
                  dateRange
                )
              )
            },
            {
              id: 'tnuos_export_charges',
              title: 'TNUoS export charges',
              data: localeStringArray(
                getFilterData(
                  roundArray(tnuosCharge, 1),
                  modelStartDate,
                  active,
                  dateRange
                )
              )
            }
          ]
        },
        {
          id: 'gross_profit',
          title: 'Gross profit/loss',
          data: localeStringArray(
            getFilterData(
              roundArray(sumArrays(totalRevenue, totalCoGS), 1),
              modelStartDate,
              active,
              dateRange
            )
          )
        },
        {
          id: 'total_admin_costs',
          title: 'Total administrative costs',
          data: localeStringArray(
            getFilterData(
              roundArray(totalAdminCosts, 1),
              modelStartDate,
              active,
              dateRange
            )
          ),
          children: [
            {
              id: 'land_rent',
              title: 'Land rent',
              data: localeStringArray(
                getFilterData(
                  roundArray(landRentExpense?.rentToProfit || [], 1),
                  modelStartDate,
                  active,
                  dateRange
                )
              )
            },
            {
              id: 'o_and_m',
              title: 'O&M',
              data: localeStringArray(
                getFilterData(
                  roundArray(oAndMExpense, 1),
                  modelStartDate,
                  active,
                  dateRange
                )
              )
            },
            {
              id: 'asset_management',
              title: 'Asset management',
              data: localeStringArray(
                getFilterData(
                  roundArray(assetMExpense, 1),
                  modelStartDate,
                  active,
                  dateRange
                )
              )
            },
            {
              id: 'insurance',
              title: 'Insurance',
              data: localeStringArray(
                getFilterData(
                  roundArray(insuranceExpense, 1),
                  modelStartDate,
                  active,
                  dateRange
                )
              )
            },
            {
              id: 'community_benefit',
              title: 'Community benefit',
              data: localeStringArray(
                getFilterData(
                  roundArray(communityBenefitExpense, 1),
                  modelStartDate,
                  active,
                  dateRange
                )
              )
            },
            {
              id: 'water_rates',
              title: 'Water rates',
              data: localeStringArray(
                getFilterData(
                  roundArray(waterRatesExpense, 1),
                  modelStartDate,
                  active,
                  dateRange
                )
              )
            },
            {
              id: 'business_rates',
              title: 'Business rates',
              data: localeStringArray(
                getFilterData(
                  roundArray(businessRatesExpense, 1),
                  modelStartDate,
                  active,
                  dateRange
                )
              )
            },
            {
              id: 'ng_security_premium_fees',
              title: 'NG security premium fees',
              data: localeStringArray(
                getFilterData(
                  roundArray(nGSecurities?.securities_premium_fee || [], 1),
                  modelStartDate,
                  active,
                  dateRange
                )
              )
            },
            {
              id: 'extended_warranty',
              title: 'Extended warranty',
              data: localeStringArray(
                getFilterData(
                  roundArray(extendedWarrantyExpense, 1),
                  modelStartDate,
                  active,
                  dateRange
                )
              )
            },
            {
              id: 'site_security',
              title: 'Site security',
              data: localeStringArray(
                getFilterData(
                  roundArray(siteSecurityExpense, 1),
                  modelStartDate,
                  active,
                  dateRange
                )
              )
            },
            {
              id: 'easement_costs',
              title: 'Easement costs',
              data: localeStringArray(
                getFilterData(
                  roundArray(easementExpnese, 1),
                  modelStartDate,
                  active,
                  dateRange
                )
              )
            },
            {
              id: 'legal_costs',
              title: 'Legal costs',
              data: localeStringArray(
                getFilterData(
                  roundArray(legalExpense, 1),
                  modelStartDate,
                  active,
                  dateRange
                )
              )
            },
            {
              id: 'other_admin_costs',
              title: 'Other admin costs',
              data: localeStringArray(
                getFilterData(
                  roundArray(otherAdminExpense, 1),
                  modelStartDate,
                  active,
                  dateRange
                )
              )
            },
            {
              id: 'intercompany_expense',
              title: 'Intercompany expense',
              data: localeStringArray(
                getFilterData(
                  roundArray(intercompanyExp, 1),
                  modelStartDate,
                  active,
                  dateRange
                )
              )
            },
            {
              id: 'decommissioing_costs',
              title: 'Decommissioning costs',
              data: localeStringArray(
                getFilterData(
                  roundArray(
                    decommissioningCosts?.decommissioning_cost || [],
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
          id: 'ebitda',
          title: 'EBITDA',
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
          id: 'depreciation',
          title: 'Depreciation',
          data: localeStringArray(
            getFilterData(
              roundArray(totalDepreciation, 1),
              modelStartDate,
              active,
              dateRange
            )
          )
        },
        {
          id: 'ebit',
          title: 'EBIT',
          data: localeStringArray(
            getFilterData(
              roundArray(ebit?.ebit || [], 1),
              modelStartDate,
              active,
              dateRange
            )
          )
        },
        {
          id: 'interest_expense',
          title: 'Interest expense',
          data: localeStringArray(
            getFilterData(
              roundArray(
                sumArrays(
                  mCapexProvision.senior_debt_interest,
                  mCapexProvision.shareholder_loan_interest
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
              id: 'senior_debt_interest',
              title: 'Senior debt interest',
              data: localeStringArray(
                getFilterData(
                  roundArray(mCapexProvision.senior_debt_interest, 1),
                  modelStartDate,
                  active,
                  dateRange
                )
              )
            },
            {
              id: 'shareholder_loan_interest',
              title: 'Shareholder loan interest',
              data: localeStringArray(
                getFilterData(
                  roundArray(mCapexProvision.shareholder_loan_interest, 1),
                  modelStartDate,
                  active,
                  dateRange
                )
              )
            }
          ]
        },
        {
          id: 'profit_before_tax',
          title: 'Profit/loss before tax',
          data: localeStringArray(
            getFilterData(
              roundArray(mCapexProvision.profit_loss_before_tax, 1),
              modelStartDate,
              active,
              dateRange
            )
          )
        },
        {
          id: 'corporation_tax',
          title: 'Corporation tax',
          data: localeStringArray(
            getFilterData(
              roundArray(corporationTaxValue?.forecastTaxCharge || [], 1),
              modelStartDate,
              active,
              dateRange
            )
          )
        },
        {
          id: 'profit_after_tax',
          title: 'Profit/loss after tax',
          data: localeStringArray(
            getFilterData(
              roundArray(mCapexProvision.profit_loss_after_tax, 1),
              modelStartDate,
              active,
              dateRange
            )
          )
        }
      ]
    };
    return rlt;
  }, [
    vintage,
    mCapexProvision,
    active,
    operationStartDate,
    modelStartDate,
    dateRange
  ]);
  return (
    <div style={{ flex: 1, padding: 5 }}>
      <div style={{ fontSize: 25, paddingBottom: 10, fontWeight: '900' }}>
        Profit and loss account
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
