import { Box, BoxProps, styled } from '@mui/material';
import moment from 'moment';
import { useMemo } from 'react';
import {
  getCyclesPerMonth,
  preProcessArray4Graph
} from '../../calculates/utils';
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

export function AverageBatteryCyclesGraphPage() {
  // const { currentParameterId, parameterInfos } = useAppSelector(selectParam);
  const {
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
  const revenueData = useMemo(() => {
    const payload = {
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
      decommissioningEndDate
    };
    const battery_cycles_per_month = getCyclesPerMonth(payload);
    const result: ApexAxisChartSeries = [
      {
        name: 'Battery cycles' as string,
        data: preProcessArray4Graph(battery_cycles_per_month).map(
          (r, index) => ({
            x: moment()
              .add(index, 'months')
              .startOf('month')
              .format('YYYY-MM-DD'),
            y: r
          })
        )
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
          datum={revenueData}
          option={{
            chart: {
              id: 'average-battery-cycles',
              stacked: true,
              width: '100%',
              animations: {
                enabled: true
              }
            },
            title: {
              text: 'Battery cycles per month'
            }
          }}
        />
      </Content>
    </div>
  );
}
