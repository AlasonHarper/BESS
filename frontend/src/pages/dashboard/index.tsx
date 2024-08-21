import { Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectAuth } from '../../store/slices/authSlice';
import styles from './dashboard.module.scss';

import { BoxProps as MuiBoxProps } from '@mui/material/Box';
import { calcCorporationTax } from '../../calculates/Cash flow/corporation_tax';
import {
  calcVintages,
  getOperationsAsAPercentOfPeriod
} from '../../calculates/utils';
import useParameter from '../../utils/usePrameter';
import { calcVintagesDepreciation } from '../../calculates/Depreciation/vintages_depreciation';
import { selectResult } from '../../store/slices/resultSlice';
import { calcKPIs } from '../../Valuation/KPIs';
import { calcTotalRevenue } from '../../calculates/Revenue/total_revenue';
import { projectValuation } from '../../Valuation/valuation';
import { calcCapexProvision } from '../../Cash flow/capex_provision';
import { act } from 'react-dom/test-utils';
import moment from 'moment';
import { REGION_LIST } from '../../utils/constant';
import { ElectricitySoldGraphPage } from '../graph/electricity_sold';
import { calcFCFE } from '../../Cash flow/fcfe';
interface BoxProps extends MuiBoxProps {
  open?: boolean;
}

export function Dashboard() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { error } = useAppSelector(selectAuth);
  // const { vintage, mCapexProvision } = useAppSelector(selectResult);

  // const { updateVintage,updateCapexProvision } = useParameter();

  const { initialCapacity, batteryDuration, region, operationYears } =
    useAppSelector(selectResult);
  const {
    wholesaleDayAhead,
    wholesaleDayIntraday,
    balancingMechanism,
    capacityMarket,
    frequencyResponse,
    gainOnDisposal,
    totalRevenue,
    vintage,
    mCapexProvision
  } = useAppSelector(selectResult);
  const {
    auxilliaryLoss,
    optimiserCost,
    tnuosCharge,
    meteringCost,
    totalCoGS
  } = useAppSelector(selectResult);
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
    easementExpnese,
    intercompanyExp,
    decommissioningCosts,
    waterRatesExpense,
    nGSecurities,
    totalAdminCosts,
    ebit
  } = useAppSelector(selectResult);
  const {
    balanceOfPlantDepreciation,
    evDepreciation,
    poolingSubstationDepreciation,
    transformersDepreciation,
    capitalizedRentInConstruction,
    vintagesDepreciation,
    totalDepreciation
  } = useAppSelector(selectResult);
  const {
    movementInTradeCreditor,
    movementInTradeDebtor,
    capexCreditor,
    movementInVATCreditor,
    movementInPrepayments
  } = useAppSelector(selectResult);
  const { corporationTaxValue, capitalExpenditure, operatingCashFlowValue } =
    useAppSelector(selectResult);

  const {
    corporationTax,
    gearingByCapexType,
    seniorDebt,
    modelStartDate,
    decommissioningEndDate
  } = useAppSelector(selectResult);
  const valuation = {
    cost_of_equity: 10,
    valuation_date: '2024-11-01'
  };
  const payload = {
    corporationTax,
    gearingByCapexType,
    seniorDebt,
    modelStartDate,
    decommissioningEndDate,
    valuation,
    mCapexProvision,
    operatingCashFlowValue,
    capitalExpenditure,
    gainOnDisposal,
    corporationTaxValue
  };
  const valuationResult = calcKPIs(payload);
  const onClickButton = () => {
    console.log('test', valuationResult);
  };

  return (
    // <main
    //   className={styles.body}
    //   style={{
    //     padding: '20px',
    //     display: 'inline-block',
    //     backgroundColor: '#f0f0f0'
    //   }}
    // >
    //   <div style={{ fontSize: '40px', alignContent: 'end', color: '#3e4444' }}>
    //     Dashboard
    //   </div>
    //   <div
    //     style={{
    //       width: '100%',
    //       margin: '20px',
    //       display: 'inline-flex',
    //       height: '30%'
    //     }}
    //   >
    //     <div
    //       style={{
    //         borderWidth: 2,
    //         borderColor: '#3e4444',
    //         width: '30%',
    //         padding: '15px',
    //         margin: '10px',
    //         backgroundColor: '#d3d3d3',
    //         borderRadius: '8px',
    //         boxShadow: '5px 5px 10px #888888',
    //         height: 'fit-content'
    //       }}
    //     >
    //       <h2
    //         style={{
    //           fontSize: '24px',
    //           textDecorationLine: 'underline',
    //           color: '#3e4444',
    //           fontFamily: 'Arial, sans-serif'
    //         }}
    //       >
    //         BESS Information
    //       </h2>
    //       <p
    //         style={{
    //           fontSize: '16px',
    //           textAlign: 'left',
    //           color: '#3e4444',
    //           fontFamily: 'Verdana, sans-serif'
    //         }}
    //       >
    //         <b>Grid connection capacity</b>: {initialCapacity}MW
    //       </p>
    //       <p
    //         style={{
    //           fontSize: '16px',
    //           textAlign: 'left',
    //           color: '#3e4444',
    //           fontFamily: 'Verdana, sans-serif'
    //         }}
    //       >
    //         <b>Battery duration</b>: {batteryDuration}hours
    //       </p>
    //       <p
    //         style={{
    //           fontSize: '16px',
    //           textAlign: 'left',
    //           color: '#3e4444',
    //           fontFamily: 'Verdana, sans-serif'
    //         }}
    //       >
    //         <b>Region</b>: {region}
    //       </p>
    //       <p
    //         style={{
    //           fontSize: '16px',
    //           textAlign: 'left',
    //           color: '#3e4444',
    //           fontFamily: 'Verdana, sans-serif'
    //         }}
    //       >
    //         <b>Operation years</b>: {operationYears}
    //       </p>
    //     </div>
    //     {/* <div
    //       style={{
    //         borderWidth: 2,
    //         borderColor: '#3e4444',
    //         width: '60%',
    //         padding: '20px',
    //         margin: '10px',
    //         backgroundColor: '#d3d3d3',
    //         borderRadius: '15px',
    //         boxShadow: '5px 5px 10px #888888'
    //       }}
    //     >
    //       Generation capacity over the period <ElectricitySoldGraphPage />
    //       <Button
    //         onClick={onClickButton}
    //         style={{ backgroundColor: '#3e4444', color: '#f0f0f0' }}
    //       >
    //         Test
    //       </Button>
    //     </div> */}
    //   </div>
    // </main>
    <div></div>
  );
}
