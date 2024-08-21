import { DEFAULT_COST_OF_ADDITIONS } from '../../../calculates/Depreciation/constant';
import { ICostOfAdditions } from '../../../calculates/Depreciation/type';
import {
  ICapexPaymentForm,
  ICapexPaymentMilestoneForm
} from '../../../calculates/Revenue/type';
import {
  DEFAULT_CAPEX_PAYMENTS_PROFILE,
  DEFAULT_CAPEX_PAYMENT_MILESTONES
} from '../../../calculates/constant';
import { getMonthsNumberFromModelStartDate } from '../../../calculates/utils';

export function calcPoolingSubstationAdditions({
  // costOfAdditions comes from fixed~~ 7 Capex~~~7.03~7.10
  costOfAdditions = DEFAULT_COST_OF_ADDITIONS,
  // capexPaymentsProfile comes from fixed ~~~ 8 Capex-other inputs ~~~ 8.01 Capex payments ~~~ Payment profile choice
  capexPaymentsProfile = DEFAULT_CAPEX_PAYMENTS_PROFILE,
  // capexPaymentMilestones comes from timing ~~~ 5 Capex ~~~ 5.03 Milestone payments.
  capexPaymentMilestones = DEFAULT_CAPEX_PAYMENT_MILESTONES,
  batteryDuration = 4,
  initialCapacity = 1000,
  capexSensitivity = 0,
  operationStartDate = '2028-01-01',
  modelStartDate = '2023-01-01',
  decommissioningEndDate = '2068-06-30'
}: {
  initialCapacity?: number;
  costOfAdditions?: ICostOfAdditions;
  // capexPaymentsProfile comes from fixed ~~~ 8 Capex-other inputs ~~~ 8.01 Capex payments ~~~ Payment profile choice
  capexPaymentsProfile?: ICapexPaymentForm[];
  // capexPaymentMilestones comes from timing ~~~ 5 Capex ~~~ 5.03 Milestone payments.
  capexPaymentMilestones?: ICapexPaymentMilestoneForm[];
  batteryDuration?: number;
  capexSensitivity?: number;
  operationStartDate?: string;
  modelStartDate?: string;
  decommissioningEndDate?: string;
}) {
  // calcLength ~~~ Month number of decommissioning end date from model start date.
  // example:546
  const calcLength =
    getMonthsNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;

  const operationStartDateMonthNumber = getMonthsNumberFromModelStartDate(
    modelStartDate,
    operationStartDate
  );
  const additionsCost =
    costOfAdditions.poolingSubstation *
    initialCapacity *
    (1 + capexSensitivity);

  const paymentMilestonesData: number[] =
    capexPaymentMilestones.find(
      (d) =>
        d.profileName ==
        capexPaymentsProfile.find((d) => d.capexObject == 'Pooling substation')
          ?.paymentProfile
    )?.timing || [];

  const paymentMilestonesLength = paymentMilestonesData.length;
  const forecastPoolingSubstationAdditions = [];
  for (let i = 0; i < calcLength; i++)
    forecastPoolingSubstationAdditions.push(0);
  for (let i = 0; i < paymentMilestonesLength; i++)
    forecastPoolingSubstationAdditions[
      operationStartDateMonthNumber + i - paymentMilestonesLength
    ] = additionsCost * paymentMilestonesData[i];

  return forecastPoolingSubstationAdditions;
}
