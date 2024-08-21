import { Box, BoxProps, styled } from '@mui/material';
import moment from 'moment';
import { useEffect, useMemo } from 'react';
import { calcVintages, preProcessArray4Graph } from '../../calculates/utils';
import CustomGraph from '../../components/Graphs/CustomGraph';
import useParameter from '../../utils/usePrameter';
import {
  PhotoSizeSelectLargeRounded,
  ViewInArTwoTone
} from '@mui/icons-material';
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

export function ElectricitySoldGraphPage() {
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
    batterySensitivity,
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
      revenueSetup,
      assumptionsData,
      detailedRevenueData,
      initialCycleData,
      initialCapacity,
      startingAssumptionsForBatteries,
      batteryDisposals,
      batteryEfficiency,
      batteryAugmentation,
      model: capexForecastModel,
      batteryDuration,
      batteryCubes,
      batteryExCubes,
      inflationInputs,
      capexPaymentsProfile,
      capexPaymentMilestones,
      capexUEL,
      bessCapexForecast,
      batterySensitivity,
      operationYears: lengthOfOperations / 12,
      modelStartDate,
      operationStartDate,
      decommissioningEndDate,
      decommissioningStartDate,
      vintage
    };
    const electricity_sold = vintage.electricitySold;

    const result: ApexAxisChartSeries = [
      {
        name: 'Electricity sold' as string,
        data: preProcessArray4Graph(electricity_sold).map((r, index) => ({
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
              text: 'Electricity sold'
            }
          }}
        />
      </Content>
    </div>
  );
}
