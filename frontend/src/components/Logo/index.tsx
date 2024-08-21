import { Box, styled, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import LogoImage from '../../assets/images/logo.png';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        padding: ${theme.spacing(0, 1, 0, 0)};
        display: flex;
        text-decoration: none;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const LogoSignWrapper = styled(Box)(
  () => ` 
        height: auto; 
        padding-bottom: 20px;
`
);

const VersionBadge = styled(Box)(
  ({ theme }) => `
        background: ${theme.palette.success.main};
        color: ${theme.palette.success.contrastText};
        padding: ${theme.spacing(0.4, 1)};
        border-radius: ${theme.general.borderRadiusSm};
        text-align: center;
        display: inline-block;
        line-height: 1;
        font-size: ${theme.typography.pxToRem(11)};
`
);

const LogoText = styled(Box)(
  ({ theme }) => `
        font-size: ${theme.typography.pxToRem(15)};
        font-weight: ${theme.typography.fontWeightBold};
`
);

function Logo() {
  return (
    <LogoWrapper to="/">
      <LogoSignWrapper>
        <img
          src={LogoImage}
          style={{
            height: '35px',
            marginTop: '20px',
            paddingLeft: '20px'
          }}
        />
      </LogoSignWrapper>
    </LogoWrapper>
  );
}

export default Logo;
