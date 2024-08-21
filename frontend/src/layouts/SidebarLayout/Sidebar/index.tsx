import { useContext, useState } from 'react';

import {
  Box,
  alpha,
  styled,
  Divider,
  useTheme,
  Button,
  lighten,
  darken,
  Tooltip,
  Grid,
  Drawer
} from '@mui/material';

import SidebarMenu from './SidebarMenu';
import Scrollbar from '../../../components/Scrollbar';
import { SidebarContext } from '../../../contexts/SidebarContext';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Logo from '../../../components/Logo';
import MuiDrawer from '@mui/material/Drawer';
const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width: ${theme.sidebar.width};
        min-width: ${theme.sidebar.width};
        color: ${theme.colors.alpha.trueWhite[70]};
        position: relative;
        z-index: 7;
        height: 100%;
        padding-bottom: 68px; 
`
);

function Sidebar() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const theme = useTheme();

  return (
    <>
      <SidebarWrapper
        sx={{
          background:
            theme.palette.mode === 'dark'
              ? theme.colors.alpha.white[100]
              : darken(theme.colors.alpha.black[100], 0.5)
        }}
      >
        <Scrollbar>
          <Box mx={2}>
            <Logo />
          </Box>
          <Divider
            sx={{
              mx: theme.spacing(2),
              background: theme.colors.alpha.trueWhite[10]
            }}
          />
          <SidebarMenu />
        </Scrollbar>
      </SidebarWrapper>
    </>
  );
}

export default Sidebar;
