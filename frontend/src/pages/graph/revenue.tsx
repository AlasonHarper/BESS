import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { IInputParameter } from '../../utils/types';
import ParamContent from '../../components/ParamContent';
import ParamCollapsableList from '../../components/ParamContent/CollapsableList';
import { Box, BoxProps, List, useTheme, styled } from '@mui/material';
import { SidebarContext } from '../../contexts/SidebarContext';
import GRevenue from '../../components/Graphs/CustomGraph';
import CustomGraph from '../../components/Graphs/CustomGraph';
import moment from 'moment';
import { calcWholeSaleDayAheadRevenue } from '../../calculates/Revenue/wholesale_day_ahead';
import { selectParam } from '../../store/slices/parameterSlice';
import useParameter from '../../utils/usePrameter';
import {
  DEFAULT_DETAILED_REVENUE_DATA,
  DEFAULT_INFLATION_INPUTS,
  DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  DEFAULT_STARTING_BATTERY_ASSUMPTION
} from '../../calculates/constant';
import { checkEqualObject } from '../../utils/funtions';
import { calcWholesaleIntraday } from '../../calculates/Revenue/wholsale_intraday';
import { calcCapacityMarket } from '../../calculates/Revenue/capacity_market';
import { calcFrequencyResponse } from '../../calculates/Revenue/frequency_response';
import { calcBalancingMechanismRevenue } from '../../calculates/Revenue/balancing_mechanism';
import { calcTotalRevenue } from '../../calculates/Revenue/total_revenue';
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

export function RevenueGraphPage() {
  // const { currentParameterId, parameterInfos } = useAppSelector(selectParam);
  const {
    wholesaleDayAhead,
    wholesaleDayIntraday,
    balancingMechanism,
    frequencyResponse,
    capacityMarket,
    gainOnDisposal,
    totalRevenue,
    fixedPPAValue,
    floatingPPAValue
  } = useAppSelector(selectResult);

  const revenueData = useMemo(() => {
    const payload = {
      wholesaleDayAhead,
      wholesaleDayIntraday,
      balancingMechanism,
      frequencyResponse,
      capacityMarket,
      gainOnDisposal,
      totalRevenue,
      fixedPPAValue,
      floatingPPAValue
    };
    const total = totalRevenue;
    const result: ApexAxisChartSeries = [
      {
        name: 'Capacity Market' as string,
        data: capacityMarket || [].map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      },
      {
        name: 'Frequency Response' as string,
        data: frequencyResponse || [].map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      },
      {
        name: 'Wholesale Intraday' as string,
        data: wholesaleDayIntraday || [].map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      },
      {
        name: 'Wholesale day ahead' as string,
        data: wholesaleDayAhead || [].map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      },
      {
        name: 'Balancing Mechanism' as string,
        data: balancingMechanism || [].map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      },
      {
        name: 'Gain on diposal' as string,
        data: gainOnDisposal?.gainOnDisposalRevenue || [].map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      },
      {
        name: 'Fixed PPA Revenue' as string,
        data: fixedPPAValue || [].map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      },
      {
        name: 'Floating PPA Revenue' as string,
        data: floatingPPAValue || [].map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      },
    ];
    return result;
  }, [wholesaleDayAhead,
    wholesaleDayIntraday,
    balancingMechanism,
    frequencyResponse,
    capacityMarket,
    gainOnDisposal,
    totalRevenue,]);

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
              text: 'Revenue stack across time'
            }
          }}
        />
      </Content>
    </div>
  );
}
