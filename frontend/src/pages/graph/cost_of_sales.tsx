import { Box, BoxProps, styled } from '@mui/material';
import moment from 'moment';
import { useMemo } from 'react';
import { calcAuxilliaryLosses } from '../../calculates/CoGS/auxilliary_losses';
import { calcMetering } from '../../calculates/CoGS/metering';
import { calcOptimiserCommission } from '../../calculates/CoGS/optimiser_commission';
import { calcTNUoSCharges } from '../../calculates/CoGS/tnuos_export_charges';
import {
  multiplyNumber,
  preProcessArray4Graph,
  sumArrays
} from '../../calculates/utils';
import CustomGraph from '../../components/Graphs/CustomGraph';
import useParameter from '../../utils/usePrameter';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
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

export function CostOfSalesGraphPage() {
  // const { currentParameterId, parameterInfos } = useAppSelector(selectParam);
  const {
    currentParameterId,
    parameterInfos,
    modelStartDate,
    operationStartDate,

  } = useAppSelector(selectResult);
  const { ppaFee,
    auxilliaryLoss,
    optimiserCost,
    meteringCost,
    tnuosCharge,
    totalCoGS, } = useAppSelector(selectResult);
  const data = useMemo(() => {

    const result: ApexAxisChartSeries = [
      {
        name: 'PPA Fee' as string,
        data: preProcessArray4Graph(ppaFee).map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      },
      {
        name: 'Optimiser commission' as string,
        data: preProcessArray4Graph(optimiserCost).map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      },
      {
        name: 'Auxilliary losses' as string,
        data: preProcessArray4Graph(auxilliaryLoss).map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      },
      {
        name: 'Metering' as string,
        data: preProcessArray4Graph(meteringCost).map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      },
      {
        name: 'TNUoS export charges' as string,
        data: preProcessArray4Graph(tnuosCharge).map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      },
      {
        name: 'Total cost of sales' as string,
        data: preProcessArray4Graph(totalCoGS).map((r, index) => ({
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
          datum={data}
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
              text: 'Cost of Sales'
            }
          }}
        />
      </Content>
    </div>
  );
}
