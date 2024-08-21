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

import { UpdateParamInfo } from '../../store/types/types';
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
} from '../../utils/constant';
import {
  ConstructionOutlined,
  ExpandLess,
  ExpandMore
} from '@mui/icons-material';
import { checkEqualObject, cloneObject } from '../../utils/funtions';
import styled from '@emotion/styled';
import { useAsyncValue } from 'react-router-dom';
import useParameter from '../../utils/usePrameter';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SidebarContext } from '../../contexts/SidebarContext';
import { useAppSelector } from '../../store/hooks';
import { selectResult } from '../../store/slices/resultSlice';

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

const CCard = MuiStyles(Card)<CCardProps>(({ theme, open }) => ({
  width: `calc(100vw - ${theme.sidebar.width})`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}));

interface StatementTableCompoentProps {
  tableData: any;
  value: any;
  defaultExpanded?: boolean;
  onSave: (value: any) => void;
}

const StatementTableCompoent: FC<StatementTableCompoentProps> = ({
  tableData,
  value,
  defaultExpanded = false,
  onSave
}) => {
  const theme = useTheme();
  const {
    operationStartDate,
    modelStartDate,
    calculationPeriod,
    lengthOfOperations
  } = useAppSelector(selectResult)
  const [expanded, setExpand] = useState(false);
  const { sidebarToggle } = React.useContext(SidebarContext);

  const getTableParameters = useCallback(
    (params: string[]) => {
      const rlt: Record<string, any> = {};
      params.map((param) => {
        if (param == 'defaultCurrency')
          rlt['defaultCurrency'] = defaultCurrency;
        if (param == 'modelStartDate') rlt['modelStartDate'] = modelStartDate;
        if (param == 'calculationPeriod')
          rlt['calculationPeriod'] = calculationPeriod;
        if (param == 'lengthOfOperations')
          rlt['lengthOfOperations'] = lengthOfOperations;
        if (param == 'cyclesPerDay') rlt['cyclesPerDay'] = [2, 1.5, 1];
      });
      return rlt;
    },
    [calculationPeriod, lengthOfOperations]
  );

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

  const hasChanged = useMemo(() => {
    return !checkEqualObject(customValue, valueRef.current);
  }, [value, customValue]);

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
      // onSave(
      //   new Array(stickyCols.length).fill(
      //     new Array(stickyRows.length - 1).fill(0)
      //   )
      // );
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

  const toggleExpand = () => {
    setExpand(!expanded);
  };

  useEffect(() => {
    setExpand(defaultExpanded);
  }, [defaultExpanded]);

  return (
    <CCard
      sx={{
        m: 1
      }}
    >
      <CardContent
        sx={{
          m: 1,
          minWidth: '100%',
          maxWidth: '100%'
        }}
      >
        <div className="flex flex-row justify-center relative">
          <div style={{ position: 'absolute', left: 0 }}>
            <IconButton onClick={toggleExpand}>
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </div>
          <Typography gutterBottom variant="h4" component="div">
            {tableData.title}
          </Typography>
          <div style={{ position: 'absolute', right: 0 }}>
            <IconButton component="label" tabIndex={-1}>
              <FileDownloadIcon />
              <VisuallyHiddenInput
                type="file"
                accept=".csv"
                onChange={importCSV}
              />
            </IconButton>
            <IconButton onClick={generateCSV}>
              <FileUploadIcon />
            </IconButton>
            <IconButton
              disabled={!hasChanged}
              onClick={() => {
                valueRef.current = customValue;
                onSave(customValue);
              }}
            >
              <SaveIcon />
            </IconButton>
          </div>
        </div>
        <Divider sx={{ my: 2 }} />
        {expanded && (
          <TableContainer
            component={Paper}
            sx={{ borderRadius: '8px', overflowX: 'auto' }}
          >
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
                                      {tableData.unit
                                        ? tableData.unit.label
                                        : ''}
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
        )}
      </CardContent>
    </CCard>
  );
};

// export default StatementTableCompoent;

interface BoxProps extends MuiBoxProps {
  selected?: boolean;
}

const SubMenuWrapper = MuiStyles(Box)<BoxProps>(
  ({ theme, selected }) => `
        .MuiList-root {
          padding: 4px;
          .MuiListItem-root {
            padding: 1px 0;
    
            .MuiBadge-root {
              position: absolute;
              right: ${theme.spacing(3.2)};
    
              .MuiBadge-standard {
                background: ${theme.colors.primary.main};
                font-size: ${theme.typography.pxToRem(10)};
                font-weight: bold;
                text-transform: uppercase;
                color: ${theme.palette.primary.contrastText};
              }
            }
        
            .MuiButton-root {
              display: flex;
              color: black;
              background-color: ${
                selected
                  ? alpha(theme.colors.alpha.trueWhite[100], 0.4)
                  : 'transparent'
              };
              width: 100%; 
              justify-content: flex-start;
              padding: ${theme.spacing(0.8, 0.8)};
              border-radius: 8px;
    
              .MuiButton-startIcon,
              .MuiButton-endIcon {
                transition: ${theme.transitions.create(['color'])};
    
                .MuiSvgIcon-root {
                  font-size: inherit;
                  transition: none;
                }
              }
    
              .MuiButton-startIcon {
                color: ${theme.colors.alpha.trueWhite[30]};
                font-size: ${theme.typography.pxToRem(20)};
                margin-right: ${theme.spacing(1)};
              }
              
              .MuiButton-endIcon {
                color: ${theme.colors.alpha.trueWhite[50]};
                margin-left: auto;
                opacity: .8;
                font-size: ${theme.typography.pxToRem(20)};
              }
    
              &.active,
              &:hover {
                background-color: ${alpha(
                  theme.colors.alpha.trueWhite[100],
                  0.06
                )};
                color: black;
    
                .MuiButton-startIcon,
                .MuiButton-endIcon {
                  color: ${theme.colors.alpha.trueWhite[100]};
                }
              }
            }
    
            &.Mui-children {
              flex-direction: column;
    
              .MuiBadge-root {
                position: absolute;
                right: ${theme.spacing(7)};
              }
            }
    
            .MuiCollapse-root {
              width: 100%;
    
              .MuiList-root {
                padding: ${theme.spacing(1, 0)};
              }
    
              .MuiListItem-root {
                padding: 1px 0;
    
                .MuiButton-root {
                  padding: ${theme.spacing(0.8, 3)};
    
                  .MuiBadge-root {
                    right: ${theme.spacing(3.2)};
                  }
    
                  &:before {
                    content: ' ';
                    background: ${theme.colors.alpha.trueWhite[100]};
                    opacity: 0;
                    transition: ${theme.transitions.create([
                      'transform',
                      'opacity'
                    ])};
                    width: 6px;
                    height: 6px;
                    transform: scale(0);
                    transform-origin: center;
                    border-radius: 10px;
                    margin-right: ${theme.spacing(1.8)};
                  }
    
                  &.active,
                  &:hover {
    
                    &:before {
                      transform: scale(1);
                      opacity: 1;
                    }
                  }
                }
              }
            }
          }
        }
    `
);

export const TableItem = ({
  to,
  item,
  title,
  headers,
  handleClick,
  startIcon,
  endIcon,
  selected = false,
  depth = 0
}: any) => {
  return (
    <>
      <TableCell
        align="center"
        sx={[
          {
            borderWidth: 1,
            minWidth: 250,
            maxWidth: 250,
            paddingLeft: startIcon ? depth - 1 : depth + 2,
            textAlign: 'center',
            fontSize: 20 - depth * 2,
            fontWeight: 700 - depth * 50,
            backgroundColor: '#eee'
          },
          {
            position: 'sticky',
            left: 0,
            zIndex: 2,
            backgroundColor: '#93be96e8'
          }
        ]}
      >
        <div
          className="cursor-pointer flex flex-row"
          style={{ justifyContent: 'flex-start' }}
        >
          {startIcon}
          {item?.title}
        </div>
      </TableCell>
      {item?.data?.map((c: any, index: number) => {
        return (
          <TableCell
            key={index}
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
              { zIndex: 1 }
            ]}
          >
            <div className="cursor-pointer">{c}</div>
          </TableCell>
        );
      })}
    </>
  );
  return (
    <SubMenuWrapper selected={selected}>
      <List component="div">
        <ListItem component="div">
          <Button onClick={handleClick} sx={{ ml: 4 * depth }}>
            {startIcon}
            {title}
          </Button>
        </ListItem>
      </List>
    </SubMenuWrapper>
  );
};

const ParamCollapsableTable = ({
  itemList = {},
  headers = [],
  parent = null,
  onClick,
  selected = null,
  depth = 0
}: any) => {
  const [open, setOpen] = useState(depth < 1);
  const theme = useTheme();
  const handleClick = () => {
    // setOpen(!open);
    if (typeof onClick === 'function') onClick(itemList, parent);
  };

  const isEmptyChildren = useMemo(() => {
    if (!Array.isArray(itemList.children)) return true;
    return itemList.children.length == 0;
  }, [itemList]);

  return (
    <>
      {depth == 0 ? (
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: '8px',
            overflowX: depth == 0 ? 'auto' : 'hidden'
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((row: any, index: number) => (
                  <TableCell
                    key={index}
                    sx={[
                      {
                        borderWidth: 1,
                        textAlign: 'center',
                        color: '#fff',
                        backgroundColor: '#4c73d6'
                      },
                      index == 0 && { minWidth: 150, maxWidth: 150 },
                      {
                        position: 'sticky',
                        left: 0,
                        zIndex: index == 0 ? 2 : 1
                      }
                    ]}
                    align="center"
                  >
                    {typeof row === 'string' || typeof row === 'number' ? (
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
              <TableRow>
                {/* <TableItem
                  depth={depth}
                  item={itemList}
                  headers={headers}
                  selected={selected?.id == itemList.id}
                  handleClick={handleClick}
                  title={itemList.title}
                  // startIcon={itemList.icon || <DesignServicesTwoToneIcon />}
                  startIcon={
                    isEmptyChildren ? null : open ? (
                      <div className="" onClick={() => setOpen(false)}>
                        <ExpandLess />
                      </div>
                    ) : (
                      <div className="" onClick={() => setOpen(true)}>
                        <ExpandMore />
                      </div>
                    )
                  }
                /> */}
              </TableRow>
              {!isEmptyChildren &&
                open &&
                itemList.children.map((menu: any, index: number) => {
                  return (
                    <ParamCollapsableTable
                      key={index}
                      onClick={onClick}
                      selected={selected}
                      depth={depth + 1}
                      itemList={menu}
                      parent={
                        parent ? `${parent}@${itemList.id}` : `${itemList.id}`
                      }
                    />
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <>
          <TableRow>
            <TableItem
              depth={depth}
              item={itemList}
              headers={headers}
              selected={selected?.id == itemList.id}
              handleClick={handleClick}
              title={itemList.title}
              // startIcon={itemList.icon || <DesignServicesTwoToneIcon />}
              startIcon={
                isEmptyChildren ? null : open ? (
                  <div className="" onClick={() => setOpen(false)}>
                    <ExpandLess />
                  </div>
                ) : (
                  <div className="" onClick={() => setOpen(true)}>
                    <ExpandMore />
                  </div>
                )
              }
            />
          </TableRow>
          {!isEmptyChildren &&
            open &&
            itemList.children.map((menu: any, index: number) => {
              return (
                <ParamCollapsableTable
                  key={index}
                  onClick={onClick}
                  selected={selected}
                  depth={depth + 1}
                  itemList={menu}
                  parent={
                    parent ? `${parent}@${itemList.id}` : `${itemList.id}`
                  }
                />
              );
            })}
        </>
      )}
    </>
  );
};

export default ParamCollapsableTable;
