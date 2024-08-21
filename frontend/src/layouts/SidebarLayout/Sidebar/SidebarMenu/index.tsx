import { useContext, useMemo } from 'react';

import {
  ListSubheader,
  alpha,
  Box,
  List,
  styled,
  Button,
  ListItem
} from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import GridViewIcon from '@mui/icons-material/GridView';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import BrightnessLowTwoToneIcon from '@mui/icons-material/BrightnessLowTwoTone';
import MmsTwoToneIcon from '@mui/icons-material/MmsTwoTone';
import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import BallotTwoToneIcon from '@mui/icons-material/BallotTwoTone';
import BeachAccessTwoToneIcon from '@mui/icons-material/BeachAccessTwoTone';
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
import FilterVintageTwoToneIcon from '@mui/icons-material/FilterVintageTwoTone';
import HowToVoteTwoToneIcon from '@mui/icons-material/HowToVoteTwoTone';
import LocalPharmacyTwoToneIcon from '@mui/icons-material/LocalPharmacyTwoTone';
import RedeemTwoToneIcon from '@mui/icons-material/RedeemTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import TrafficTwoToneIcon from '@mui/icons-material/TrafficTwoTone';
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
import ChromeReaderModeTwoToneIcon from '@mui/icons-material/ChromeReaderModeTwoTone';
import WorkspacePremiumTwoToneIcon from '@mui/icons-material/WorkspacePremiumTwoTone';
import CameraFrontTwoToneIcon from '@mui/icons-material/CameraFrontTwoTone';
import DisplaySettingsTwoToneIcon from '@mui/icons-material/DisplaySettingsTwoTone';
import { SidebarContext } from '../../../../contexts/SidebarContext';
import CollapsableList from './CollapsableList';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import EngineeringIcon from '@mui/icons-material/Engineering';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { INPUT_PARAMS } from '../../../../utils/constant';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../../../store/hooks';
import { selectParam } from '../../../../store/slices/parameterSlice';
import { CurrencyBitcoinSharp } from '@mui/icons-material';
const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root { 
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
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

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
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
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
                border-radius: 20px;
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

function SidebarMenu() {
  const { closeSidebar } = useContext(SidebarContext);
  const { currentParameterId } = useAppSelector(selectParam);

  const menuList = useMemo(() => {
    return [
      {
        to: 'dashboard',
        title: 'Dashboard',
        icon: <GridViewIcon />
      },
      {
        to: 'parameters',
        title: 'Inputs',
        icon: <SettingsSuggestIcon />,
        children: [
          {
            to: 'setting',
            title: 'Setting',
            icon: <GridViewIcon />
          },
          ...INPUT_PARAMS.map((param) => ({
            to: param.id,
            disabled: currentParameterId == null || currentParameterId == 0,
            title: param.title
          }))
        ]
      },
      {
        to: 'graphs',
        title: 'Graphs',
        icon: <SettingsSuggestIcon />,
        children: [
          {
            to: 'battery',
            title: 'Battery',
            icon: <SettingsSuggestIcon />,
            children: [
              {
                to: 'average_battery_cycles',
                title: 'Avg battery cycles',
                icon: <GridViewIcon />
              },
              {
                to: 'electricity_sold',
                title: 'Electricity sold',
                icon: <GridViewIcon />
              }
            ]
          },
          {
            to: 'cashflow',
            title: 'Cashflow',
            icon: <SettingsSuggestIcon />
          },
          {
            to: 'profit_loss',
            title: 'Profit & Loss',
            icon: <SettingsSuggestIcon />,
            children: [
              {
                to: 'revenue',
                title: 'Revenue',
                icon: <GridViewIcon />
              },
              {
                to: 'cost_of_sales',
                title: 'Cost of Sales',
                icon: <GridViewIcon />
              },
              {
                to: 'admin_costs',
                title: 'Admin costs',
                icon: <GridViewIcon />
              },
              {
                to: 'profit_across_time',
                title: 'Profit across time',
                icon: <GridViewIcon />
              }
            ]
          },
          {
            to: 'balance_sheet',
            title: 'Balance sheet',
            icon: <SettingsSuggestIcon />
          }
        ]
      },
      {
        to: 'financial_statements',
        title: 'Financial Statements',
        icon: <SettingsSuggestIcon />,
        children: [
          {
            to: 'cashflow',
            title: 'CashFlow',
            icon: <GridViewIcon />
          },
          {
            to: 'profit_loss',
            title: 'Profit & Loss',
            icon: <GridViewIcon />
          },
          {
            to: 'balance_sheet',
            title: 'Balance Sheet',
            icon: <GridViewIcon />
          }
        ]
      },
      {
        to: "valuation",
        title: "Project valuation",
        icon: <GridViewIcon />,
      }
    ];
  }, [INPUT_PARAMS, currentParameterId]);

  return (
    <>
      <MenuWrapper>
        <List component="div">
          {menuList.map((menu, index) => {
            return <CollapsableList key={index} menuList={menu} />;
          })}
        </List>
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
