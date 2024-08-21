import moment from 'moment';
import { DATE_FORMAT } from '../utils/usePrameter';
import { getMonth, getTime } from 'date-fns';
import { get } from 'http';
import { start } from 'repl';
import { TempleHinduRounded } from '@mui/icons-material';

export function operatingFla({
  modelStartDate = '2015-01-01',
  operationStartDate = '2017-06-01',
  decommissioningDate = '2042-05-31'
}: {
  modelStartDate?: string;
  operationStartDate?: string;
  decommissioningDate?: string;
}) {
  const flag: number[] = [];
}

export function operatingFlag({
  modelStartDate = '2015-01-01',
  operationStartDate = '2017-06-01',
  decommissioningDate = '2042-05-31'
}: {
  modelStartDate?: string;
  operationStartDate?: string;
  decommissioningDate?: string;
}): number[] {
  // Convert strings to Date objects
  const startDate = new Date(modelStartDate);
  const midDate = new Date(operationStartDate);
  const endDate = new Date(decommissioningDate);

  // Calculate the number of semi-annual periods between two dates
  const calculatePeriods = (start: Date, end: Date): number => {
    const startMoment = start.getTime();
    const endMoment = end.getTime();
    const halfYearInMilliseconds = 15778476000; // half year in milliseconds
    return Math.round((endMoment - startMoment) / halfYearInMilliseconds);
  };

  // Prepare the result array
  const result: number[] = [];

  // Calculate periods for the first interval
  const firstIntervalPeriods = calculatePeriods(startDate, midDate);
  for (let i = 0; i < firstIntervalPeriods; i++) {
    result.push(0);
  }

  // Calculate periods for the second interval
  const secondIntervalPeriods = calculatePeriods(midDate, endDate);
  for (let i = 0; i < secondIntervalPeriods; i++) {
    result.push(1);
  }

  return result;
}

export function dateGet({
  startDate = '2015-10-01',
  months = 20
}: {
  startDate?: string;
  months?: number;
}) {
  const resultDate = moment(startDate).add(months, 'month').format(DATE_FORMAT);
  return resultDate;
}
export function percentageFlagBetweenTwoDates({
  startDate = '2015-01-01',
  midDate_1 = '2017-06-01'
}: {
  startDate?: string;
  midDate_1?: string;
}) {
  const result: number[] = [];
  let tempDateStr = startDate;
  let tempDate = new Date(startDate);
  const midDate_1_str = new Date(midDate_1);
  while (tempDate < midDate_1_str) {
    let tempResult: number;
    if (moment(tempDateStr).add(6, 'month').format(DATE_FORMAT) < midDate_1) {
      tempResult = 1;
    } else {
      tempResult =
        1 -
        (midDate_1_str.getMonth() -
          tempDate.getMonth() +
          12 * (midDate_1_str.getFullYear() - tempDate.getFullYear())) /
          6;
    }
    result.push(tempResult);
    tempDateStr = moment(tempDateStr).add(6, 'month').format(DATE_FORMAT);
    tempDate = new Date(tempDateStr);
  }
  return result;
}

export function percentageFlag({
  startDate = '2015-01-01',
  midDate_1 = '2017-06-01',
  midDate_2 = '2032-05-31',
  endDate = '2042-06-30'
}: {
  startDate?: string;
  midDate_1?: string;
  midDate_2?: string;
  endDate?: string;
}) {
  const result: number[] = [];
  const result_1: number[] = percentageFlagBetweenTwoDates({
    startDate,
    midDate_1
  });
  const leng_1 = result_1.length;
  const result_2: number[] = percentageFlagBetweenTwoDates({
    startDate: startDate,
    midDate_1: midDate_2
  });
  const result_3: number[] = percentageFlagBetweenTwoDates({
    startDate: startDate,
    midDate_1: endDate
  });
  const leng_2 = result_2.length;
  const leng_3 = result_3.length;

  for (let i = 0; i < leng_3; i++) {
    if (i < leng_1) result.push(result_2[i] - result_1[i]);
    else if (i < leng_2) result.push(result_2[i]);
    else result.push(0);
  }
  return result;
}
