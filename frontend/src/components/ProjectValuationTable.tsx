import {
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardProps,
  Divider,
  IconButton,
  Input,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
  styled as MuiStyles,
  BoxProps as MuiBoxProps,
  Box,
  alpha,
  List,
  ListItem,
  Collapse
} from '@mui/material';
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import CircularProgress from '@mui/material/CircularProgress';

import { UpdateParamInfo } from '../store/types/types';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { NavLink as RouterLink, useMatch } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import {
  MaterialReactTable,
  useMaterialReactTable
} from 'material-react-table';
import {
  CURRENCY_LIST,
  TIMING_PARAMETERS,
  defaultCurrency
} from '../utils/constant';
import {
  ConstructionOutlined,
  ExpandLess,
  ExpandMore,
  Padding,
  RoundaboutLeft
} from '@mui/icons-material';
import { checkEqualObject, cloneObject } from '../utils/funtions';
import styled from '@emotion/styled';
import { useAsyncValue } from 'react-router-dom';
import useParameter from '../utils/usePrameter';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SidebarContext } from '../contexts/SidebarContext';
import { useAppSelector } from '../store/hooks';
import { selectResult } from '../store/slices/resultSlice';
import { calcKPIs } from '../Valuation/KPIs';
import { redNumber, roundArray, roundNumber } from '../calculates/utils';
import { IValuation, IValuationResult } from '../Valuation/type';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
});

interface CCardProps extends CardProps {
  open?: boolean;
}

const ProjectValuationTable = ({ a }: any) => {
  const theme = useTheme();
  const {
    operationStartDate,
    investorClosingDate,
    fullyConsentedDate,
    valuation,
    corporationTax,
    gearingByCapexType,
    seniorDebt,
    decommissioningEndDate,
    mCapexProvision,
    operatingCashFlowValue,
    capitalExpenditure,
    corporationTaxValue,
    gainOnDisposal
  } = useAppSelector(selectResult);
  const payload = {
    // valuation,
    corporationTax,
    gearingByCapexType,
    seniorDebt,
    decommissioningEndDate,
    mCapexProvision,
    operatingCashFlowValue,
    capitalExpenditure,
    corporationTaxValue,
    gainOnDisposal
  };
  const costOfEquity = valuation?.cost_of_equity || 10;

  const valuationArray: IValuation[] = [
    {
      cost_of_equity: costOfEquity,
      valuation_date: investorClosingDate
    },
    {
      cost_of_equity: costOfEquity,
      valuation_date: fullyConsentedDate
    },
    valuation
  ];
  const resultArray: IValuationResult[][] = [];
  valuationArray.map((dd, index) => {
    resultArray.push(
      calcKPIs({
        corporationTax,
        gearingByCapexType,
        seniorDebt,
        decommissioningEndDate,
        mCapexProvision,
        operatingCashFlowValue,
        capitalExpenditure,
        corporationTaxValue,
        gainOnDisposal,
        valuation: dd
      })
    );
  });

  const valuationResult = calcKPIs(payload);
  // useEffect(() => {
  //   console.log(valuation);
  // }, [valuation]);
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: '8px',
        overflowX: 'auto'
      }}
    >
      <Table>
        <TableHead>
          <TableCell
            sx={[
              {
                borderWidth: 1,
                borderLeftWidth: 0,
                textAlign: 'center',
                color: '#fff',
                backgroundColor: '#4c73d6',
                width: '25%'
              },
              {
                position: 'sticky',
                left: 0,
                backgroundColor: '#373e50'
              }
            ]}
            align="center"
          ></TableCell>
          <TableCell
            sx={[
              {
                borderWidth: 1,
                borderLeftWidth: 0,
                textAlign: 'center',
                color: '#fff',
                backgroundColor: '#4c73d6',
                width: '25%'
              },
              {
                position: 'sticky',
                left: 0,
                backgroundColor: '#373e50'
              }
            ]}
            align="center"
          >
            Pre-tax unlevered
          </TableCell>
          <TableCell
            sx={[
              {
                borderWidth: 1,
                textAlign: 'center',
                color: '#fff',
                backgroundColor: '#4c73d6',
                width: '25%'
              },
              {
                position: 'sticky',
                left: 0,
                backgroundColor: '#373e50'
              }
            ]}
            align="center"
          >
            Post-tax unlevered
          </TableCell>
          <TableCell
            sx={[
              {
                borderWidth: 1,
                textAlign: 'center',
                color: '#fff',
                backgroundColor: '#4c73d6',
                width: '25%'
              },
              {
                position: 'sticky',
                left: 0,
                backgroundColor: '#373e50'
              }
            ]}
            align="center"
          >
            Post-tax levered
          </TableCell>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell
              sx={[
                {
                  borderWidth: 1,
                  textAlign: 'center',
                  color: '#fff',
                  backgroundColor: '#4c73d6'
                },
                {
                  position: 'sticky',
                  left: 0,
                  backgroundColor: '#373e50'
                }
              ]}
              align="center"
            >
              Discount rates
            </TableCell>
            <TableCell
              sx={[
                {
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  textAlign: 'center',
                  color: '#fff',
                  backgroundColor: '#4c73d6'
                },
                {
                  position: 'sticky',
                  left: 0,
                  backgroundColor: '#373e50'
                }
              ]}
              align="center"
            >
              {roundNumber(valuationResult[2].discountRate, 4) * 100}%
            </TableCell>
            <TableCell
              sx={[
                {
                  borderWidth: 1,
                  textAlign: 'center',
                  color: '#fff',
                  backgroundColor: '#4c73d6'
                },
                {
                  position: 'sticky',
                  left: 0,
                  backgroundColor: '#373e50'
                }
              ]}
              align="center"
            >
              {roundNumber(valuationResult[1].discountRate, 4) * 100}%
            </TableCell>
            <TableCell
              sx={[
                {
                  borderWidth: 1,
                  textAlign: 'center',
                  color: '#fff',
                  backgroundColor: '#4c73d6'
                },
                {
                  position: 'sticky',
                  left: 0,
                  backgroundColor: '#373e50'
                }
              ]}
              align="center"
            >
              {roundNumber(valuationResult[2].discountRate, 4) * 100}%
            </TableCell>
          </TableRow>
          <TableRow sx={[{ padding: 0, borderTopWidth: 0 }]}>
            <TableCell
              sx={[
                {
                  borderWidth: 1,
                  textAlign: 'center',
                  color: '#fff',
                  backgroundColor: '#4c73d6',
                  padding: 0
                },
                {
                  position: 'sticky',
                  left: 0,
                  backgroundColor: '#373e50'
                }
              ]}
              align="center"
            ></TableCell>
            {[0, 1, 2].map((i, index) => {
              return (
                <TableCell
                  sx={[{ padding: 0, borderLeftWidth: 1 }]}
                  align="center"
                  key={index}
                >
                  <TableCell
                    sx={[
                      {
                        borderRightWidth: 0,
                        borderLeftWidth: 0,
                        borderBottomWidth: 0,
                        textAlign: 'center',
                        color: '#fff',
                        backgroundColor: '#373e50',
                        width: '33.3%'
                      },
                      {
                        position: 'sticky',
                        left: 0
                      }
                    ]}
                    align="center"
                  >
                    NPV £'000
                  </TableCell>
                  <TableCell
                    sx={[
                      {
                        borderWidth: 0,
                        borderLeftWidth: 0,
                        textAlign: 'center',
                        color: '#fff',
                        width: '33.3%',
                        backgroundColor: '#373e50'
                      },
                      {
                        position: 'sticky',
                        left: 0
                      }
                    ]}
                    align="center"
                  >
                    IRR %
                  </TableCell>
                  <TableCell
                    sx={[
                      {
                        borderWidth: 0,
                        textAlign: 'center',
                        color: '#fff',
                        backgroundColor: '#373e50',
                        width: '33.3%'
                      },
                      {
                        position: 'sticky',
                        left: 0
                      }
                    ]}
                    align="center"
                  >
                    Payback period years
                  </TableCell>
                </TableCell>
              );
            })}
          </TableRow>
          {resultArray.map((dd, index) => {
            return (
              <TableRow sx={[{ padding: 0, borderTopWidth: 0 }]}>
                <TableCell
                  sx={[
                    {
                      borderWidth: 1,
                      textAlign: 'center',
                      color: '#fff',
                      backgroundColor: '#4c73d6',
                      padding: 0
                    },
                    {
                      position: 'sticky',
                      left: 0
                    }
                  ]}
                  align="center"
                >
                  Retruns at{' '}
                  {valuationArray[index]?.valuation_date || '2023-01-01'}
                </TableCell>
                {[0, 1, 2].map((i, index) => {
                  return (
                    <TableCell
                      sx={[{ padding: 0, borderLeftWidth: 1 }]}
                      align="center"
                      key={index}
                    >
                      <TableCell
                        sx={[
                          {
                            flex: 1,
                            borderWidth: 0,
                            textAlign: 'center',
                            color: '#fff',
                            backgroundColor: '#4c73d6',
                            width: '19%'
                          }
                        ]}
                        align="center"
                      >
                        {redNumber(roundNumber(dd[i].value.npv || 0, 2))}
                      </TableCell>
                      <TableCell
                        sx={[
                          {
                            flex: 1,
                            borderWidth: 0,
                            textAlign: 'center',
                            color: '#fff',
                            backgroundColor: '#4c73d6',
                            width: '19%'
                          }
                        ]}
                        align="center"
                      >
                        {roundNumber(dd[i].value.irr || 0, 4) * 100}
                      </TableCell>
                      <TableCell
                        sx={[
                          {
                            flex: 1,
                            borderWidth: 0,
                            textAlign: 'center',
                            color: '#fff',
                            backgroundColor: '#4c73d6',
                            width: '19%'
                          }
                        ]}
                        align="center"
                      >
                        {roundNumber(dd[i].value.payback_period || 0, 2)}
                      </TableCell>
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectValuationTable;
