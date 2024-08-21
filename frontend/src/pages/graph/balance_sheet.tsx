import { Box, BoxProps, styled } from '@mui/material';
import moment from 'moment';
import { useMemo } from 'react';
import { calcCashForBalanceSheet } from '../../Balance sheet/Current asset/cash';
import { fixedAssetsForBalanceSheet } from '../../Balance sheet/Non current asset/Fixed asset/total_fixed_asset';
import { calcSeniorDebtForBalanceSheet } from '../../Balance sheet/Non current liabilities/senior_debt';
import { shareholderLoanForBalanceSheet } from '../../Balance sheet/Non current liabilities/shareholder_loan';
import CustomGraph from '../../components/Graphs/CustomGraph';
import useParameter from '../../utils/usePrameter';
import { useAppSelector } from '../../store/hooks';
import { selectResult } from '../../store/slices/resultSlice';

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

export function BalanceSheetGraphPage() {
  // const { currentParameterId, parameterInfos } = useAppSelector(selectParam);
  const {
    gainOnDisposal,
    totalDepreciation,
    capitalExpenditure,

    currentParameterId,
    parameterInfos,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate,
    revenueSetup,
    calculationPeriod,
    assumptionsData,
    startingAssumptionsForBatteries,
    batteryDisposals,
    batteryEfficiency,
    batteryAugmentation,
    capexForecastModel,
    capexPaymentsProfile,
    capexUEL,
    revenueSensitivity,
    batterySensitivity: sensitivity,
    detailedRevenueData,
    batteryDuration,
    batteryCubes,
    inflationInputs,
    batteryExCubes,
    capexPaymentMilestones,
    bessCapexForecast,
    lengthOfOperations,
    initialCycleData,
    initialCapacity
  } = useAppSelector(selectResult);

  const { vintage, mCapexProvision } = useAppSelector(selectResult);

  const revenueData = useMemo(() => {
    const payload = {
      gainOnDisposal,
      totalDepreciation,
      capitalExpenditure,
      revenueSensitivity,
      revenueSetup,
      assumptionsData,
      detailedRevenueData,
      startingAssumptionsForBatteries,
      inflationInputs,
      initialCycleData,
      initialCapacity,
      batteryDisposals,
      batteryEfficiency,
      batteryAugmentation,
      model: capexForecastModel,
      batteryDuration,
      batteryCubes,
      batteryExCubes,
      capexPaymentsProfile,
      capexPaymentMilestones,
      capexUEL,
      bessCapexForecast,
      sensitivity,
      operationYears: lengthOfOperations / 12,
      modelStartDate,
      operationStartDate,
      decommissioningStartDate,
      decommissioningEndDate,
      vintage,
      mCapexProvision
    };
    const fixed_assets = fixedAssetsForBalanceSheet(payload);
    const cash = calcCashForBalanceSheet(payload);
    const senior_debt = calcSeniorDebtForBalanceSheet(payload);
    const shareholder_loan = shareholderLoanForBalanceSheet(payload);
    const result: ApexAxisChartSeries = [
      {
        name: 'Fixed assets' as string,
        data: fixed_assets.map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      },
      {
        name: 'Cash' as string,
        data: cash.map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      },
      {
        name: 'Senior debt' as string,
        data: senior_debt.map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      },
      {
        name: 'Shareholder loan' as string,
        data: shareholder_loan.map((r, index) => ({
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
              stacked: false,
              width: '100%',
              animations: {
                enabled: true
              }
            },
            title: {
              text: 'Key balance sheet items'
            }
          }}
        />
      </Content>
    </div>
  );
}
