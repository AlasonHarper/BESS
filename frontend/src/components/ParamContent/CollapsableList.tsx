import {
  Box,
  Button,
  Collapse,
  IconButton,
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
  selected?: boolean;
}

const SubMenuWrapper = styled(Box)<BoxProps>(
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
            color: ${theme.colors.alpha.trueWhite[70]};
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
  to,
  title,
  handleClick,
  startIcon,
  endIcon,
  selected = false,
  depth = 0
}: any) => {
  return (
    <SubMenuWrapper selected={selected}>
      <List component="div">
        <ListItem component="div">
          <Button
            disableRipple
            onClick={handleClick}
            sx={{ ml: 4 * depth }}
            component={to ? RouterLink : 'label'}
            to={to}
          >
            {title}
            {endIcon}
          </Button>
        </ListItem>
      </List>
    </SubMenuWrapper>
  );
};

const ParamCollapsableList = ({
  menuList = {},
  parent = null,
  onClick,
  selected = null,
  depth = 0
}: any) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const handleClick = () => {
    // setOpen(!open);
    if (typeof onClick === 'function') onClick(menuList, parent);
  };

  const isEmptyChildren = useMemo(() => {
    if (!Array.isArray(menuList.children)) return true;
    return menuList.children.length == 0;
  }, [menuList]);

  return (
    <>
      <MenuItem
        depth={depth}
        selected={
          selected?.id == menuList.id &&
          selected?.parentId == menuList?.parentId
        }
        handleClick={handleClick}
        title={menuList.title}
        startIcon={menuList.icon || <DesignServicesTwoToneIcon />}
        endIcon={
          isEmptyChildren ? null : open ? (
            <div className="pl-2" onClick={() => setOpen(false)}>
              <ExpandLess />
            </div>
          ) : (
            <div className="pl-2" onClick={() => setOpen(true)}>
              <ExpandMore />
            </div>
          )
        }
      />
      {!isEmptyChildren && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {menuList.children.map((menu: any, index: number) => {
            return (
              <ParamCollapsableList
                key={index}
                onClick={onClick}
                selected={selected}
                depth={depth + 1}
                menuList={menu}
                parent={parent ? `${parent}@${menuList.id}` : `${menuList.id}`}
              />
            );
          })}
        </Collapse>
      )}
    </>
  );
};

export default ParamCollapsableList;
