import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import ParamContent from '../../components/ParamContent';
import ParamCollapsableList from '../../components/ParamContent/CollapsableList';
import {
  Box,
  BoxProps,
  List,
  useTheme,
  styled,
  ListItem,
  Button,
  alpha,
  Fab,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Grid,
  Typography,
  TextField,
  DialogActions,
  Select,
  MenuItem as SelectMenuItem,
  FormControl
} from '@mui/material';
import { SidebarContext } from '../../contexts/SidebarContext';
import { toast } from 'react-toastify';
import {
  paramCreateAsync,
  paramDeleteAsync,
  paramSettingUpdateAsync,
  paramUpdateAsync,
  selectParam
} from '../../store/slices/parameterSlice';
import ParamTableCard from '../../components/ParamTableCard';
import AddIcon from '@mui/icons-material/Add';

import CloseIcon from '@mui/icons-material/Close';
import TextArea from '../../components/TextArea';
import { IParameter, IParameterAdd } from '../../utils/types';
import { logoutAsync } from '../../store/slices/authSlice';
import { DeleteParam } from '../../store/types/types';
import { current } from '@reduxjs/toolkit';
interface CBoxProps extends BoxProps {
  open?: boolean;
  selected?: boolean;
  activated?: boolean;
}

const LeftContent = styled(Box)<BoxProps>(({ theme }) => ({
  width: theme.sidebar.width,
  minWidth: theme.sidebar.width,
  maxWidth: theme.sidebar.width,
  backgroundColor: '#093939f0',
  position: 'relative'
}));

const RightContent = styled(Box)<CBoxProps>(({ theme, open }) => ({
  maxWidth: `calc(100vw - ${theme.sidebar.width} - ${
    open ? theme.sidebar.width : '0px'
  })`,
  width: `calc(100vw - ${theme.sidebar.width} - ${
    open ? theme.sidebar.width : '0px'
  })`,
  padding: '30px',
  backgroundColor: '#f2f5f9',
  overflowY: 'auto',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start'
}));

const SubMenuWrapper = styled(Box)<CBoxProps>(
  ({ theme, selected, activated }) => `
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
            color: ${activated ? '#0f0' : theme.colors.alpha.trueWhite[70]};
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
              color: ${theme.colors.alpha.trueWhite[100]};
  
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

export const MenuItem = ({
  title,
  handleClick,
  selected = false,
  activated = false
}: any) => {
  return (
    <SubMenuWrapper selected={selected} activated={activated}>
      <List component="div">
        <ListItem component="div">
          <Button
            disableRipple
            onClick={handleClick}
            component={'label'}
            sx={{ fontSize: 18 }}
          >
            {title}
          </Button>
        </ListItem>
      </List>
    </SubMenuWrapper>
  );
};

export function ParameterSetting() {
  const { sidebarToggle } = React.useContext(SidebarContext);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const { currentParameterId: activeParameter, parameters } =
    useAppSelector(selectParam);
  const currentParameterRef = useRef<IParameter>();
  const [currentParameter, setCurrentParameter] = useState<IParameter>({
    id: null,
    user_id: null,
    title: '',
    description: ''
  });

  const [addParameter, setAddParameter] = useState<IParameterAdd>({
    clone_id: -1,
    title: '',
    description: ''
  });
  const [deleteParam, setDeleteParam] = useState<DeleteParam>({
    id: -1
  });

  useEffect(() => {
    const pp = parameters.find((p) => p?.id == activeParameter) as IParameter;
    currentParameterRef.current = pp;
    setCurrentParameter(pp);
  }, [parameters, activeParameter]);

  const onAddParameter = useCallback(() => {
    dispatch(paramCreateAsync(addParameter))
      .unwrap()
      .then(() => {
        handleCloseModal();
      })
      .catch((e) => {
        toast.error(e);
      });
  }, [addParameter]);

  const deleteParameter = useCallback(() => {
    dispatch(paramDeleteAsync({ id: currentParameter.id as number }))
      .unwrap()
      .then(() => {
        handleCloseModal();
      })
      .catch((e) => {
        toast.error(e);
      });
  }, [currentParameter, parameters]);

  const onActiveParameter = useCallback(() => {
    dispatch(
      paramSettingUpdateAsync({ parameter_id: currentParameter.id as number })
    )
      .unwrap()
      .then(() => {
        handleCloseModal();
      })
      .catch((e) => {
        toast.error(e);
      });
  }, [currentParameter]);

  const onUpdateParameter = useCallback(() => {
    dispatch(paramUpdateAsync(currentParameter))
      .unwrap()
      .then(() => {
        handleCloseModal();
      })
      .catch((e) => {
        toast.error(e);
      });
  }, [currentParameter]);

  const hasChange = useMemo(() => {
    return (
      currentParameterRef.current?.title != currentParameter?.title ||
      currentParameterRef.current?.description != currentParameter?.description
    );
  }, [currentParameter]);

  return (
    <div className="flex flex-row h-full">
      {parameters.length ? (
        <LeftContent>
          <List component="div" sx={{ paddingBottom: 10 }}>
            {parameters.map((p, index) => {
              return (
                <MenuItem
                  title={p.title}
                  key={index}
                  selected={p?.id == currentParameter?.id}
                  activated={p?.id == activeParameter}
                  handleClick={() => {
                    currentParameterRef.current = p as IParameter;
                    setCurrentParameter(p as IParameter);
                  }}
                />
              );
            })}
          </List>
          <div className="absolute right-4 bottom-4">
            <Fab color="primary" aria-label="add" onClick={handleOpenModal}>
              <AddIcon />
            </Fab>
          </div>
        </LeftContent>
      ) : (
        ''
      )}

      {parameters.length ? (
        <RightContent open={sidebarToggle}>
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 10,
                borderWidth: 2,
                marginBottom: 10,
                boxShadow: `0px 2px 8px -3px ${alpha(
                  theme.colors.alpha.black[100],
                  0.2
                )}, 0px 5px 22px -4px ${alpha(
                  theme.colors.alpha.black[100],
                  0.1
                )}`
              }}
            >
              <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ paddingRight: 2, minWidth: 100 }}>
                  Title :{' '}
                </Typography>
                <TextField
                  sx={{ flex: 1 }}
                  value={currentParameter?.title as string}
                  onChange={(v) => {
                    setCurrentParameter({
                      ...currentParameter,
                      title: v.target.value
                    });
                  }}
                  id="outlined-basic"
                  variant="outlined"
                />
              </Grid>
              <Grid
                sx={{ display: 'flex', alignItems: 'flex-start', marginTop: 1 }}
              >
                <Typography sx={{ paddingRight: 2, minWidth: 100 }}>
                  Description :{' '}
                </Typography>
                <TextArea
                  style={{ flex: 1 }}
                  minRows={3}
                  defaultValue={currentParameter?.description as string}
                  onBlur={(v: any) => {
                    setCurrentParameter({
                      ...currentParameter,
                      description: v.target.value
                    });
                  }}
                />
              </Grid>
            </div>
            <div
              style={{
                backgroundColor: '#b8bbb9ab',
                flex: 1,
                width: '100%',
                borderRadius: 10,
                borderWidth: 2,
                marginBottom: 10,
                boxShadow: `0px 2px 8px -3px ${alpha(
                  theme.colors.alpha.black[100],
                  0.2
                )}, 0px 5px 22px -4px ${alpha(
                  theme.colors.alpha.black[100],
                  0.1
                )}`
              }}
            ></div>
            <div style={{ width: '100%' }}>
              <DialogActions>
                <Button
                  disabled={false}
                  variant="contained"
                  autoFocus
                  onClick={deleteParameter}
                >
                  Delete
                </Button>
                <Button
                  disabled={!hasChange}
                  variant="contained"
                  autoFocus
                  onClick={onUpdateParameter}
                >
                  Save
                </Button>
                <Button
                  disabled={currentParameter?.id == activeParameter}
                  variant="contained"
                  autoFocus
                  onClick={onActiveParameter}
                >
                  Set Active
                </Button>
              </DialogActions>
            </div>
          </div>
        </RightContent>
      ) : (
        <div>
          <div className="absolute right-4 bottom-4">
            <Fab color="primary" aria-label="add" onClick={handleOpenModal}>
              <AddIcon />
            </Fab>
          </div>
          <div
            style={{
              width: '100%',
              fontSize: '50px',
              display: 'flex',
              padding: '50px'
            }}
          >
            Click plus button to create new inputs
          </div>
        </div>
      )}
      <Dialog
        onClose={handleCloseModal}
        aria-labelledby="customized-dialog-title"
        open={openModal}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Parameter
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{ maxWidth: '600px', overflowX: 'hidden' }}>
          <Grid
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Typography
              sx={{ paddingRight: 2, minWidth: 100, marginBottom: 2 }}
            >
              Clone from :{' '}
            </Typography>

            <FormControl fullWidth sx={{ minWidth: 200, maxWidth: 300 }}>
              <Select
                variant="standard"
                value={addParameter?.clone_id}
                onChange={(v) => {
                  setAddParameter({
                    ...addParameter,
                    clone_id: v.target.value as number
                  });
                }}
              >
                <SelectMenuItem value={-1}>{'No Clone'}</SelectMenuItem>
                {parameters.map((parameter: any, index: number) => {
                  return (
                    <SelectMenuItem key={index} value={parameter.id}>
                      {parameter.title}
                    </SelectMenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Typography sx={{ paddingRight: 2, minWidth: 100 }}>
              Title :{' '}
            </Typography>
            <TextField
              sx={{ flex: 1 }}
              value={addParameter.title}
              onChange={(v) => {
                setAddParameter({ ...addParameter, title: v.target.value });
              }}
              id="outlined-basic"
              variant="outlined"
            />
          </Grid>
          <Grid
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              marginTop: 1,
              minWidth: '40vw',
              maxWidth: '40vw'
            }}
          >
            <Typography sx={{ paddingRight: 2, minWidth: 100 }}>
              Description :{' '}
            </Typography>
            <TextArea
              style={{ flex: 1, maxWidth: 450 }}
              minRows={3}
              defaultValue={addParameter.description}
              onBlur={(v: any) => {
                setAddParameter({
                  ...addParameter,
                  description: v.target.value
                });
              }}
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button autoFocus onClick={onAddParameter}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
