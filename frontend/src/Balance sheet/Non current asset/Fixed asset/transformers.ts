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

export function calcTransformersAdditions({
  costOfAdditions = DEFAULT_COST_OF_ADDITIONS,
  capexPaymentsProfile = DEFAULT_CAPEX_PAYMENTS_PROFILE,
  capexPaymentMilestones = DEFAULT_CAPEX_PAYMENT_MILESTONES,
  initialCapacity = 1000,
  capexSensitivity = 0,
  operationStartDate = '2028-01-01',
  modelStartDate = '2023-01-01',
  decommissioningEndDate = '2068-06-30'
}: {
  initialCapacity?: number;
  costOfAdditions?: ICostOfAdditions;
  capexPaymentsProfile?: ICapexPaymentForm[];
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
    costOfAdditions.transformers * initialCapacity * (1 + capexSensitivity);

  const paymentMilestonesData: number[] =
    capexPaymentMilestones.find(
      (d) =>
        d.profileName ==
        capexPaymentsProfile.find((d) => d.capexObject == 'Transformers')
          ?.paymentProfile
    )?.timing || [];

  const paymentMilestonesLength = paymentMilestonesData.length;
  const forecastTransformersAdditions = [];
  for (let i = 0; i < calcLength; i++) forecastTransformersAdditions.push(0);
  for (let i = 0; i < paymentMilestonesLength; i++)
    forecastTransformersAdditions[
      operationStartDateMonthNumber + i - paymentMilestonesLength
    ] = additionsCost * paymentMilestonesData[i];

  return forecastTransformersAdditions;
}
