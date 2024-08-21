import { Box, BoxProps, styled } from '@mui/material';
import moment from 'moment';
import { useMemo } from 'react';
import { calcTotalCostOfSales } from '../../calculates/CoGS/total_cost_of_sales';
import { calcEBIT } from '../../calculates/ebit';
import { calcTotalRevenue } from '../../calculates/Revenue/total_revenue';
import { calcVintages, preProcessArray4Graph, sumArrays } from '../../calculates/utils';
import { calcCapexProvision } from '../../Cash flow/capex_provision';
import CustomGraph from '../../components/Graphs/CustomGraph';
import useParameter from '../../utils/usePrameter';
import { calcFixedPPA } from '../../calculates/Revenue/fixed_ppa';
import { calcWholeSaleDayAheadRevenue } from '../../calculates/Revenue/wholesale_day_ahead';
import { useAppSelector } from '../../store/hooks';
import { selectResult } from '../../store/slices/resultSlice';
import { calcWholesaleIntraday } from '../../calculates/Revenue/wholsale_intraday';
import { calcBalancingMechanismRevenue } from '../../calculates/Revenue/balancing_mechanism';
import { calcFrequencyResponse } from '../../calculates/Revenue/frequency_response';
import { calcGainOnDisposal } from '../../calculates/Revenue/gain_on_disposal_of_batteries';
import { calcCapacityMarket } from '../../calculates/Revenue/capacity_market';
import { calcOptimiserCommission } from '../../calculates/CoGS/optimiser_commission';
import { calcGrossProfitAndLoss } from '../../calculates/gross_profit_and_loss';
import { calcTNUoSCharges } from '../../calculates/CoGS/tnuos_export_charges';
import { calcAuxilliaryLosses } from '../../calculates/CoGS/auxilliary_losses';
import { calcMetering } from '../../calculates/CoGS/metering';
import { calcLandRentToPL } from '../../calculates/Administrative costs/land_rent';
import { calcTotalAdminCosts } from '../../calculates/Administrative costs/total_admin_cost';
import { calcTotalDepreciation } from '../../calculates/Depreciation/total_depreciation';
import { calcFloatingPPA } from '../../calculates/Revenue/floating_ppa';
import { calcPPAFees } from '../../calculates/CoGS/ppa_fees';
import { calcAssetManagementCosts } from '../../calculates/Administrative costs/asset_management';
import { calcBusinessRates } from '../../calculates/Administrative costs/business_rates';
import { calcNationalGridSecurities } from '../../Cash flow/Movement/movement_in_escrow_account';
import { calcTriadsIncome } from '../../calculates/Revenue/triads_income';
import { calcOperatingCashFlow } from '../../Cash flow/Movement/operating_cashflow';
import { calcTradeCreditors } from '../../Cash flow/Movement/movement_in_trade_creditors';
import { calcVintagesDepreciation } from '../../calculates/Depreciation/vintages_depreciation';

interface CBoxProps extends BoxProps {
  open?: boolean;
}

const TopContent = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  minHeight: 150,
  backgroundColor: '#093939f0'
}));

const Content = styled(Box)<CBoxProps>(({ theme, open }) => ({
  width: '100%',
  backgroundColor: '#eee',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex'
}));

export function ProfitAcrossTimeGraphPage() {
  // const { currentParameterId, parameterInfos } = useAppSelector(selectParam);
  const {
    // revenue inputs
    revenueSetup,
    assumptionsData,
    averageWholeSaleDayAheadPrice,
    fixedPPARevenue,
    floatingPPARevenue,
    detailedRevenueData,
    revenueSensitivity,
    // basic project inputs
    initialCapacity,
    landSize,
    modelStartDate,
    constructionStartDate,
    operationStartDate,
    operationEndDate,
    decommissioningStartDate,
    decommissioningEndDate,

    // battery assumption
    batterySensitivity,
    batteryDuration,
    initialCycleData,
    startingAssumptionsForBatteries,
    batteryEfficiency,
    batteryDisposals,
    batteryAugmentation,
    // admin costs inputs
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
    // CoGS
    ppaFeesPercentage,
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
    // capexPaymentProfileData,
    // other inputs
    inflationInputs,
    bessCapexForecast,
    operationYears,
    capexSensitivity,
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
    // sensitivities,
    constraintFactor,
    opexSensitivity
  } = useAppSelector(selectResult);
  const { wholesaleDayAhead, wholesaleDayIntraday, balancingMechanism,
    capacityMarket,
    frequencyResponse, gainOnDisposal,
    totalRevenue } = useAppSelector(selectResult);
  const { auxilliaryLoss,
    optimiserCost,
    tnuosCharge,
    meteringCost,
    totalCoGS
  } = useAppSelector(selectResult);
  const { ebit
  } = useAppSelector(selectResult);

  const { vintage, mCapexProvision } = useAppSelector(selectResult)
  const graphData = useMemo(() => {
    const payload = {
      // revenue
      wholesaleDayAhead, wholesaleDayIntraday, balancingMechanism,
      capacityMarket,
      frequencyResponse, gainOnDisposal,
      totalRevenue,
      // Cost of goods sold
      auxilliaryLoss,
      optimiserCost,
      tnuosCharge,
      meteringCost,
      totalCoGS,
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
      fixedPPARevenue,
      floatingPPARevenue,
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
      ppaFeesPercentage,
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
      vintage,
      mCapexProvision
    };

    // const gross_profit = sumArrays(
    //   calcTotalRevenue(payload),
    //   calcTotalCostOfSales(payload)
    // );
    const gross_profit = calcGrossProfitAndLoss(payload);
    const ebitda = ebit.ebitda;
    const profitAfterTax = mCapexProvision.profit_loss_after_tax;

    const result: ApexAxisChartSeries = [
      {
        name: 'EBITDA' as string,
        data: preProcessArray4Graph(ebitda).map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      },
      {
        name: 'Gross profit' as string,
        data: preProcessArray4Graph(gross_profit).map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      },
      {
        name: 'Profit after tax' as string,
        data: preProcessArray4Graph(profitAfterTax).map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      }
    ];
    return result;
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%'
      }}
    >
      <TopContent></TopContent>
      <Content>
        <CustomGraph
          datum={graphData}
          option={{
            chart: {
              id: 'apexchart-example',
              stacked: false,
              width: '100%',
              animations: {
                enabled: true
              }
            },
            title: {
              text: 'Profit Across Time'
            }
          }}
        />
      </Content>
    </div>
  );
}
