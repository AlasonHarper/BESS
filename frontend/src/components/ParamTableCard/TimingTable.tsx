import {
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
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
  useMediaQuery
} from '@mui/material';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import { UpdateParamInfo } from '../../store/types/types';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SaveIcon from '@mui/icons-material/Save';
import {
  MaterialReactTable,
  useMaterialReactTable
} from 'material-react-table';
import {
  CURRENCY_LIST,
  TIMING_PARAMETERS,
  defaultCurrency
} from '../../utils/constant';
import { ConstructionOutlined } from '@mui/icons-material';
import { cloneObject } from '../../utils/funtions';
import styled from '@emotion/styled';
import { useAsyncValue } from 'react-router-dom';

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
interface TimingTableProps {
  tableData: any;
  value: any;
  onSave: (value: any) => void;
}

const getTableParameters = (params: string[]) => {
  const rlt: Record<string, any> = {};
  params.map((param) => {
    if (param == 'defaultCurrency') rlt['defaultCurrency'] = defaultCurrency;
    if (param == 'modelStartDate') rlt['modelStartDate'] = new Date();
    if (param == 'modelPeriod') rlt['modelPeriod'] = 100;
    if (param == 'cyclesPerDay') rlt['cyclesPerDay'] = [2, 1.5, 1];
  });
  return rlt;
};

const TimingTable: FC<TimingTableProps> = ({ tableData, value, onSave }) => {
  const [focusCell, setFocusCell] = useState<{
    rowIndex: null | number;
    colIndex: null | number;
  }>({
    rowIndex: null,
    colIndex: null
  });

  const valueRef = useRef();
  const [customValue, setCustomValue] = useState(value);

  useEffect(() => {
    valueRef.current = value;
    setCustomValue(value);
    setFocusCell({ rowIndex: null, colIndex: null });
  }, [value]);

  const stickyRows = useMemo(() => {
    return tableData.stickyRows?.fn(
      getTableParameters(tableData.stickyRows.params)
    );
  }, [tableData]);

  const stickyCols = useMemo(() => {
    return tableData.stickyCols
      ?.fn(getTableParameters(tableData.stickyCols.params))
      .map((c: any) => (['string', 'number'].includes(typeof c) ? c : c.label));
  }, [tableData]);

  useEffect(() => {
    if (!value) {
      setCustomValue(
        new Array(stickyCols.length).fill(
          new Array(stickyRows.length - 1).fill(0)
        )
      );
    }
  }, [stickyRows, stickyCols, value]);

  const rows = useMemo(() => {
    const rowL = stickyCols.length;
    if (
      customValue == undefined ||
      customValue == null ||
      customValue.length != stickyCols.length
    )
      return [];
    const rowData = [];
    for (let i = 0; i < rowL; i++) {
      rowData.push([stickyCols[i], ...customValue[i]]);
    }
    return rowData;
  }, [stickyCols, customValue]);

  const generateCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    const l = stickyRows[0].length;
    for (let i = 0; i < l; i++) {
      csvContent += stickyRows.map((s: any) => s[i]).join(',') + '\r\n';
    }
    rows.forEach((row) => {
      const csvRow = row.join(',');
      csvContent += csvRow + '\r\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };
  const importCSV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      try {
        const file = e.target.files[0];
        const fileUrl = URL.createObjectURL(file);
        const response = await fetch(fileUrl);
        const text = await response.text();
        const lines = text.split('\n');

        const _data = lines.map((line) => line.split(','));
        const colL = stickyRows.length - 1;
        const rowL = stickyCols.length;
        const stickyRowL = stickyRows[0].length;
        setCustomValue(
          _data.slice(stickyRowL, stickyRowL + rowL).map((d) => {
            d.shift();
            return d;
          })
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChange = (rowIndex: number, colIndex: number, value: string) => {
    const v = cloneObject(customValue);
    v[rowIndex][colIndex] = value;
    setCustomValue(v);
  };

  return (
    <Card
      sx={{
        m: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <CardContent>
        <div className="flex flex-row justify-center">
          <Typography gutterBottom variant="h4" component="div">
            {tableData.title}
          </Typography>
          <div style={{ position: 'absolute', right: 40 }}>
            <Button
              component="label"
              tabIndex={-1}
              startIcon={<FileDownloadIcon />}
            >
              Import
              <VisuallyHiddenInput
                type="file"
                accept=".csv"
                onChange={importCSV}
              />
            </Button>
            <Button startIcon={<FileUploadIcon />} onClick={generateCSV}>
              Export
            </Button>
            <Button
              startIcon={<SaveIcon />}
              onClick={() => {
                onSave(customValue);
              }}
            >
              Save
            </Button>
          </div>
        </div>
        <Divider sx={{ my: 2 }} />
        <TableContainer component={Paper} sx={{ borderRadius: '8px' }}>
          <Table>
            <TableHead>
              <TableRow>
                {stickyRows.map((row: any, index: number) => (
                  <TableCell
                    key={index}
                    sx={[
                      {
                        padding: 0,
                        borderWidth: 1,
                        minWidth: 70,
                        textTransform: 'none',
                        backgroundColor: '#fff'
                      },
                      index == 0 && {
                        position: 'sticky',
                        left: 0,
                        zIndex: 2,
                        backgroundColor: '#aaa'
                      }
                    ]}
                    align="center"
                  >
                    {typeof row === 'string' ? (
                      row
                    ) : Array.isArray(row) ? (
                      <div className="flex flex-col">
                        {row.map((col, index) => {
                          return (
                            <div
                              key={index}
                              style={{
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'pre'
                              }}
                            >
                              {col}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <></>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((r, ri) => {
                return (
                  <TableRow key={ri}>
                    {r.map((c, ci) => {
                      return (
                        <TableCell
                          key={ci}
                          align="center"
                          sx={[
                            {
                              borderWidth: 1,
                              minWidth: 60,
                              maxWidth: 100,
                              padding: '1px',
                              paddingLeft: '5px',
                              paddingRight: '5px',
                              textAlign: 'center',
                              backgroundColor: '#eee'
                            },
                            ci == 0
                              ? {
                                  position: 'sticky',
                                  left: 0,
                                  zIndex: 2,
                                  backgroundColor: '#aaa'
                                }
                              : { zIndex: 1 }
                          ]}
                        >
                          {ri == focusCell.rowIndex &&
                          ci == focusCell.colIndex ? (
                            <Input
                              type="tel"
                              disableUnderline
                              inputProps={{
                                style: {
                                  textAlign: 'center',
                                  paddingTop: 0,
                                  paddingBottom: 0
                                }
                              }}
                              sx={{
                                color: '#000',
                                backgroundColor: '#888'
                              }}
                              className="text-center"
                              endAdornment={
                                ci > 0 && (
                                  <InputAdornment
                                    sx={{ marginLeft: 0 }}
                                    position="end"
                                  >
                                    {tableData.unit ? tableData.unit.label : ''}
                                  </InputAdornment>
                                )
                              }
                              value={c}
                              onChange={(e: any) => {
                                handleChange(ri, ci - 1, e.target.value);
                              }}
                            />
                          ) : (
                            <div
                              className="cursor-pointer"
                              onClick={() => {
                                setFocusCell({ rowIndex: ri, colIndex: ci });
                              }}
                            >
                              {c}
                            </div>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default TimingTable;
