import {
  Box,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  alpha,
  BoxProps as MuiBoxProps,
  styled
} from '@mui/material';
import { useMemo, useState } from 'react';
import { StarBorder, ExpandLess, ExpandMore } from '@mui/icons-material';
import { NavLink as RouterLink, useMatch } from 'react-router-dom';
import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import { useTheme } from '@emotion/react';

interface BoxProps extends MuiBoxProps {
  disabled?: boolean;
}
const SubMenuWrapper = styled(Box)<BoxProps>(
  ({ theme, disabled }) => `
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
            color: ${theme.colors.alpha.trueWhite[disabled ? 10 : 70]};
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

export const MenuItem = ({
  to,
  title,
  disabled = false,
  handleClick,
  startIcon,
  endIcon,
  depth = 0
}: any) => {
  return (
    <SubMenuWrapper disabled={disabled}>
      <List component="div">
        <ListItem component="div">
          <Button
            disableRipple
            disabled={disabled}
            onClick={handleClick}
            startIcon={startIcon}
            endIcon={endIcon}
            sx={{ ml: 4 * depth }}
            component={to ? RouterLink : 'label'}
            to={to}
          >
            {title}
          </Button>
        </ListItem>
      </List>
    </SubMenuWrapper>
  );
};

const CollapsableList = ({ menuList = {}, parent = '', depth = 0 }: any) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const handleClick = () => {
    setOpen(!open);
  };

  const isEmptyChildren = useMemo(() => {
    if (!Array.isArray(menuList.children)) return true;
    return menuList.children.length == 0;
  }, [menuList]);

  return (
    <>
      <MenuItem
        depth={depth}
        disabled={menuList.disabled}
        handleClick={!isEmptyChildren ? handleClick : null}
        to={!isEmptyChildren ? null : `${parent}/${menuList.to}`}
        title={menuList.title}
        startIcon={menuList.icon || <DesignServicesTwoToneIcon />}
        endIcon={
          isEmptyChildren ? null : open ? <ExpandLess /> : <ExpandMore />
        }
      />
      {!isEmptyChildren && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {menuList.children.map((menu: any, index: number) => {
            return (
              <CollapsableList
                key={index}
                depth={depth + 1}
                menuList={menu}
                parent={`${parent}/${menuList.to}`}
              />
            );
          })}
        </Collapse>
      )}
    </>
  );
};

export default CollapsableList;
