import { multiplyNumber, sumArrays } from '../calculates/utils';
import { useAppSelector } from '../store/hooks';
import { selectResult } from '../store/slices/resultSlice';

export function calcFCFE() {
  const {
    mCapexProvision,
    totalDepreciation,
    operatingCashFlowValue,
    ebit,
    capitalExpenditure
  } = useAppSelector(selectResult);

  const fcfe: number[] = sumArrays(
    mCapexProvision.profit_loss_after_tax,
    multiplyNumber(totalDepreciation, -1),
    multiplyNumber(operatingCashFlowValue, -1),
    ebit.ebitda,
    capitalExpenditure.capexExpenditureForCashflow,
    sumArrays(
      mCapexProvision.seniorDebtDrawdown,
      mCapexProvision.shareholderLoanDrawdown,
      mCapexProvision.seniorDebtRepayment,
      mCapexProvision.shareholder_loan_repayment
    ),
    multiplyNumber(mCapexProvision.shareholder_loan_interest, -1)
  );
  const sum = 0;
  //   const len = fcfe.length || 0;
  //   for (let i = 0; i < len; i++) {
  //     sum += fcfe[i];
  //   }

  return sum;
}
