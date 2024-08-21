import { DEFAULT_COST_OF_ADDITIONS } from '../../../calculates/Depreciation/constant';
import { ICostOfAdditions } from '../../../calculates/Depreciation/type';
import {
  ICapexPaymentForm,
  ICapexPaymentMilestoneForm
} from '../../../calculates/Revenue/type';
import { getMonthsNumberFromModelStartDate } from '../../../calculates/utils';
import {
  DEFAULT_DEVELOPMENT_FEE_PAYMENT_DATES,
  DEFAULT_DEVELOPMENT_FEE_PAYMENT_PROFILE
} from '../../constant';
import { IDevFeePaymentDates, IDevFeePaymentProfile } from '../../type';

export function calcEnterpriseValueAdditions({
  // developmentFeePaymentPercentageProfile ~~~ Fixed ~~~
  // 8.01 Capex payments ~~~ Development fee payment profile.
  developmentFeePaymentPercentageProfile = DEFAULT_DEVELOPMENT_FEE_PAYMENT_PROFILE,
  // developmentFeePaymentDateProfile ~~~ Fixed ~~~ 1.02 technnology,
  // sizing, timing
  developmentFeePaymentDateProfile = DEFAULT_DEVELOPMENT_FEE_PAYMENT_DATES,
  costOfAdditions = DEFAULT_COST_OF_ADDITIONS,
  initialCapacity = 1000,
  modelStartDate = '2023-01-01',
  developmentStartDate = '2023-07-01',
  decommissioningEndDate = '2068-06-30'
}: {
  developmentFeePaymentPercentageProfile?: IDevFeePaymentProfile;
  developmentFeePaymentDateProfile?: IDevFeePaymentDates;
  costOfAdditions?: ICostOfAdditions;
  // capexPaymentsProfile comes from fixed ~~~ 8 Capex-other inputs ~~~ 8.01 Capex payments ~~~ Payment profile choice
  capexPaymentsProfile?: ICapexPaymentForm[];
  // capexPaymentMilestones comes from timing ~~~ 5 Capex ~~~ 5.03 Milestone payments.
  capexPaymentMilestones?: ICapexPaymentMilestoneForm[];
  initialCapacity?: number;
  batteryDuration?: number;
  capexSensitivity?: number;
  developmentStartDate?: string;
  operationStartDate?: string;
  modelStartDate?: string;
  decommissioningEndDate?: string;
}) {
  const period =
    getMonthsNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  const calcLength =
    getMonthsNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;

  const totalEnterpriseVlaueAdditions = [];
  for (let i = 0; i < period; i++) {
    totalEnterpriseVlaueAdditions.push(0);
  }
  const investorClosingDateMonthNumber = getMonthsNumberFromModelStartDate(
    modelStartDate,
    developmentFeePaymentDateProfile.investorClosingDate
  );

  totalEnterpriseVlaueAdditions[investorClosingDateMonthNumber - 1] =
    (developmentFeePaymentPercentageProfile.paymentPercentageAtInvestorClosingDate *
      costOfAdditions.enterPriseValue *
      initialCapacity) /
    100;

  const landSecuredDateMonthNumber = getMonthsNumberFromModelStartDate(
    modelStartDate,
    developmentFeePaymentDateProfile.landSecuredDate
  );

  totalEnterpriseVlaueAdditions[landSecuredDateMonthNumber - 1] =
    (developmentFeePaymentPercentageProfile.paymentPercentageAtLandSecuredDate *
      costOfAdditions.enterPriseValue *
      initialCapacity) /
    100;

  const gridSecuredDateMonthNumber = getMonthsNumberFromModelStartDate(
    modelStartDate,
    developmentFeePaymentDateProfile.gridSecuredDate
  );

  totalEnterpriseVlaueAdditions[gridSecuredDateMonthNumber - 1] =
    (developmentFeePaymentPercentageProfile.paymentPercentageAtGridSecuredDate *
      costOfAdditions.enterPriseValue *
      initialCapacity) /
    100;

  const closingOfDebtAgreementDateMonthNumber =
    getMonthsNumberFromModelStartDate(
      modelStartDate,
      developmentFeePaymentDateProfile.closingOfDebtAgreementDate
    );

  totalEnterpriseVlaueAdditions[closingOfDebtAgreementDateMonthNumber - 1] =
    (developmentFeePaymentPercentageProfile.paymentPercentageAtClosingOfDebtAgreementDate *
      costOfAdditions.enterPriseValue *
      initialCapacity) /
    100;

  const fullyConsentedMonthNumber = getMonthsNumberFromModelStartDate(
    modelStartDate,
    developmentFeePaymentDateProfile.fullyConsented
  );

  totalEnterpriseVlaueAdditions[fullyConsentedMonthNumber - 1] =
    (developmentFeePaymentPercentageProfile.paymentPercentageAtFullyConsented *
      costOfAdditions.enterPriseValue *
      initialCapacity) /
    100;

  const rTBMonthNumber = getMonthsNumberFromModelStartDate(
    modelStartDate,
    developmentFeePaymentDateProfile.rTB
  );

  totalEnterpriseVlaueAdditions[rTBMonthNumber - 1] =
    (developmentFeePaymentPercentageProfile.paymentPercentageAtrTB *
      costOfAdditions.enterPriseValue *
      initialCapacity) /
    100;

  const cODMonthNumber = getMonthsNumberFromModelStartDate(
    modelStartDate,
    developmentFeePaymentDateProfile.cOD
  );
  totalEnterpriseVlaueAdditions[cODMonthNumber - 1] =
    (developmentFeePaymentPercentageProfile.paymentPercentageAtcOD *
      costOfAdditions.enterPriseValue *
      initialCapacity) /
    100;

  return totalEnterpriseVlaueAdditions;
}
