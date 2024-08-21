import { Box, BoxProps, styled } from '@mui/material';
import moment from 'moment';
import { useMemo } from 'react';
import { calcAssetManagementCosts } from '../../calculates/Administrative costs/asset_management';
import { calcBusinessRates } from '../../calculates/Administrative costs/business_rates';
import { calcCommunityBenefit } from '../../calculates/Administrative costs/community_benefit';
import { calcDecommissiongCosts } from '../../calculates/Administrative costs/decommissioning_cost';
import { calcExtendedWarranty } from '../../calculates/Administrative costs/extended_warranty';
import { calcInsuranceExpense } from '../../calculates/Administrative costs/insurance';
import { calcLandRentToPL } from '../../calculates/Administrative costs/land_rent';
import { calcLegalCosts } from '../../calculates/Administrative costs/legal_cost';
import { calcOperationAndManagementCost } from '../../calculates/Administrative costs/o_and_m';
import { calcOtherAdminCosts } from '../../calculates/Administrative costs/other_administrative_cost';
import { calcSiteSecurity } from '../../calculates/Administrative costs/site_security';
import { multiplyNumber, preProcessArray4Graph } from '../../calculates/utils';
import { calcNationalGridSecurities } from '../../Cash flow/Movement/movement_in_escrow_account';
import CustomGraph from '../../components/Graphs/CustomGraph';
import useParameter from '../../utils/usePrameter';
import { useAppSelector } from '../../store/hooks';
import { selectResult } from '../../store/slices/resultSlice';

interface CBoxProps extends BoxProps {
  open?: boolean;
}

const TopContent = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  minHeight: 150,
  backgroundColor: '#093939f0'
}));

const Content = styled(Box)<CBoxProps>(({ theme, open }) => ({
  width: '100%',
  backgroundColor: '#eee',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex'
}));

export function AdministrativeExpenseGraphPage() {
  // const { currentParameterId, parameterInfos } = useAppSelector(selectParam);

  const {
    assetMExpense,
    businessRatesExpense,
    communityBenefitExpense,
    insuranceExpense,
    landRentExpense,
    legalExpense,
    oAndMExpense,
    otherAdminExpense,
    siteSecurityExpense,
    extendedWarrantyExpense,
    intercompanyExp,
    easementExpnese,
    decommissioningCosts,
    waterRatesExpense,
    nGSecurities,
    totalAdminCosts, } = useAppSelector(selectResult);

  const data = useMemo(() => {

    const land_rent = multiplyNumber(
      landRentExpense.rentToProfit,
      -1
    );
    const o_m = multiplyNumber(oAndMExpense, -1);
    const asset_management = multiplyNumber(
      assetMExpense,
      -1
    );
    const insurance = multiplyNumber(insuranceExpense, -1);
    const community_benefit = multiplyNumber(communityBenefitExpense, -1);
    const business_rates = multiplyNumber(businessRatesExpense, -1);
    const other_admin_costs = multiplyNumber(otherAdminExpense, -1);
    const decommissioning_costs = multiplyNumber(
      decommissioningCosts.decommissioning_cost,
      -1
    );
    const legal_costs = multiplyNumber(legalExpense, -1);
    const site_security = multiplyNumber(siteSecurityExpense, -1);
    const extended_warranty = multiplyNumber(extendedWarrantyExpense, -1);
    const national_grid_security_premium_fees = multiplyNumber(
      nGSecurities.securities_premium_fee,
      -1
    );

    const result: ApexAxisChartSeries = [
      {
        name: 'Land rent' as string,
        data: preProcessArray4Graph(land_rent).map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      },
      {
        name: 'O&M' as string,
        data: preProcessArray4Graph(o_m).map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      },
      {
        name: 'Asset management' as string,
        data: preProcessArray4Graph(asset_management).map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      },
      {
        name: 'Insurance' as string,
        data: insurance.map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      },
      {
        name: 'Community benefit' as string,
        data: community_benefit.map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      },
      {
        name: 'Business rates' as string,
        data: preProcessArray4Graph(business_rates).map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      },
      {
        name: 'NG secuirty premium fees' as string,
        data: national_grid_security_premium_fees.map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      },
      {
        name: 'Extended warranty' as string,
        data: extended_warranty.map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      },
      {
        name: 'Site security' as string,
        data: preProcessArray4Graph(site_security).map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      },
      {
        name: 'Legal costs' as string,
        data: preProcessArray4Graph(legal_costs).map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      },
      {
        name: 'Other admin expenses' as string,
        data: preProcessArray4Graph(other_admin_costs).map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      },
      {
        name: 'Decommissioning costs' as string,
        data: preProcessArray4Graph(decommissioning_costs).map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      },
      {
        name: 'Easement costs' as string,
        data: preProcessArray4Graph(multiplyNumber(easementExpnese, -1)).map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      },
      {
        name: 'Intercompany expenses' as string,
        data: preProcessArray4Graph(multiplyNumber(intercompanyExp, -1)).map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      },
      {
        name: 'Water rates' as string,
        data: preProcessArray4Graph(multiplyNumber(waterRatesExpense, -1)).map((r, index) => ({
          x: moment()
            .add(index, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          y: r
        }))
      },
    ];
    return result;
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%'
      }}
    >
      <TopContent></TopContent>
      <Content>
        <CustomGraph
          datum={data}
          option={{
            chart: {
              id: 'apexchart-example',
              stacked: true,
              width: '100%',
              animations: {
                enabled: true
              }
            },
            title: {
              text: 'Administrative expenses'
            }
          }}
        />
      </Content>
    </div>
  );
}
