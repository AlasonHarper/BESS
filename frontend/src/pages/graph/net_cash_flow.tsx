import { Box, BoxProps, styled } from '@mui/material';
import moment from 'moment';
import { useMemo } from 'react';
import { calcCapexProvision } from '../../Cash flow/capex_provision';
import CustomGraph from '../../components/Graphs/CustomGraph';
import useParameter from '../../utils/usePrameter';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectResult } from '../../store/slices/resultSlice';
import { calcAssetManagementCosts } from '../../calculates/Administrative costs/asset_management';

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

export function NetCashFlowGraphPage() {
  // const { currentParameterId, parameterInfos } = useAppSelector(selectParam);
  const {
    // revenue inputs
    revenueSetup,
    assumptionsData,
    averageWholeSaleDayAheadPrice,
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
  const { vintage,mCapexProvision } = useAppSelector(selectResult);
  const revenueData = useMemo(() => {
    const payload = {
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
      working_capital:workingCapital,

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
    const net_cash_flow = mCapexProvision.netCashflow;
    
    const result: ApexAxisChartSeries = [
      {
        name: 'Net cashflow' as string,
        data: net_cash_flow.map((r:number, index:number) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      }
    ];
    return result;
  }, [modelStartDate, operationStartDate]);

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
          datum={revenueData}
          option={{
            chart: {
              id: 'apexchart-example',
              stacked: true,
              width: '100%',
              animations: {
                enabled: true
              }
            },
            title: {
              text: 'Net cashflow'
            }
          }}
        />
      </Content>
    </div>
  );
}
