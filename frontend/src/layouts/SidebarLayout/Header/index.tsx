import { useContext } from 'react';

import {
  Box,
  alpha,
  Stack,
  lighten,
  Divider,
  IconButton,
  Tooltip,
  styled,
  useTheme
} from '@mui/material';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

import HeaderButtons from './Buttons';
import HeaderUserbox from './Userbox';
import HeaderMenu from './Menu';
import { SidebarContext } from '../../../contexts/SidebarContext';
import { BoxProps as MuiBoxProps } from '@mui/material/Box';

interface BoxProps extends MuiBoxProps {
  open?: boolean;
}

const HeaderWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open'
})<BoxProps>(({ theme, open }) => ({
  height: `${theme.header.height}`,
  color: `${theme.header.textColor}`,
  padding: `${theme.spacing(0, 2)}`,
  backgroundColor: `${alpha(theme.header.background as string, 0.95)}`,
  justifyContent: 'space-between',
  ...(open && {
    marginLeft: theme.sidebar.width,
    width: `calc(100% - ${theme.sidebar.width}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

function Header() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const theme = useTheme();

  return (
    <HeaderWrapper
      display="flex"
      alignItems="center"
      open={sidebarToggle}
      sx={{
        boxShadow:
          theme.palette.mode === 'dark'
            ? `0 1px 0 ${alpha(
                lighten(theme.colors.primary.main, 0.7),
                0.15
              )}, 0px 2px 8px -3px rgba(0, 0, 0, 0.2), 0px 5px 22px -4px rgba(0, 0, 0, .1)`
            : `0px 2px 8px -3px ${alpha(
                theme.colors.alpha.black[100],
                0.2
              )}, 0px 5px 22px -4px ${alpha(
                theme.colors.alpha.black[100],
                0.1
              )}`
      }}
    >
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        alignItems="center"
        spacing={2}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleSidebar}
          edge="start"
          sx={{
            marginRight: 5
          }}
        >
          {sidebarToggle ? <MenuOpenIcon /> : <MenuTwoToneIcon />}
        </IconButton>
      </Stack>
      <Box display="flex" alignItems="center">
        <HeaderUserbox />
      </Box>
    </HeaderWrapper>
  );
}

export default Header;
