import moment from 'moment';
import { INFLATION_START_YEAR } from '../utils/constant';
import {
  DEFAULT_BATTERY_AUGMENTATION,
  DEFAULT_BATTERY_CUBES,
  DEFAULT_BATTERY_DISPOSAL,
  DEFAULT_BATTERY_EFFICIENCY,
  DEFAULT_BATTERY_EXCUBES,
  DEFAULT_BESS_CAPEX_FORECAST,
  DEFAULT_CAPEX_PAYMENT_MILESTONES,
  DEFAULT_CAPEX_PAYMENTS_PROFILE,
  DEFAULT_CAPEX_UEL,
  DEFAULT_DETAILED_REVENUE_DATA,
  DEFAULT_INFLATION_INPUTS,
  DEFAULT_INITIAL_CYCLE_DATA,
  DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  DEFAULT_REVENUE_SETUP,
  DEFAULT_STARTING_BATTERY_ASSUMPTION
} from './constant';
import {
  IAssumptionData,
  IBatteryAugmentation,
  IBatteryCubes,
  IBatteryDisposal,
  IBatteryEfficiency,
  IBatteryExcubes,
  IBessCapexForecast,
  ICapexPaymentForm,
  ICapexPaymentMilestoneForm,
  ICapexUELForm,
  ICycleData,
  IDetailedRevenueData,
  IInflationForm,
  IRevenueSetup,
  IStartingBatteryAssumptions
} from './Revenue/type';
import { getActiveScenarioRevenueItems } from './Revenue/wholesale_day_ahead';
import { RoundaboutLeftSharp } from '@mui/icons-material';

export function calcNumberOfDaysInMonth(
  modelStartDate = '2023-01-01',
  operationStartDate = '2028-01-01',
  operationYears = 40
): number[] {
  let modelStartDateObj = new Date(modelStartDate);
  let operationStartDateObj = new Date(operationStartDate);
  operationStartDateObj.setFullYear(
    operationStartDateObj.getFullYear() + operationYears
  );

  if (modelStartDateObj > operationStartDateObj) {
    const temp = modelStartDateObj;
    modelStartDateObj = operationStartDateObj;
    operationStartDateObj = temp;
  }

  const daysInMonths: number[] = [];

  while (modelStartDateObj < operationStartDateObj) {
    const year = modelStartDateObj.getFullYear();
    const month = modelStartDateObj.getMonth();
    let daysInMonth = new Date(year, month + 1, 0).getDate();

    if (modelStartDateObj.getDate() > 1) {
      daysInMonth -= modelStartDateObj.getDate() - 1;
      modelStartDateObj.setDate(1);
    }

    if (
      modelStartDateObj.getFullYear() === operationStartDateObj.getFullYear() &&
      modelStartDateObj.getMonth() === operationStartDateObj.getMonth() &&
      operationStartDateObj.getDate() !== new Date(year, month + 1, 0).getDate()
    ) {
      daysInMonth -=
        new Date(year, month + 1, 0).getDate() -
        operationStartDateObj.getDate();
    }

    daysInMonths.push(daysInMonth);
    modelStartDateObj.setMonth(modelStartDateObj.getMonth() + 1);
  }

  return daysInMonths;
}

export function getOperationsAsAPercentOfPeriod({
  modelStartDate = '2023-01-01',
  operationStartDate = '2028-01-01',
  operationYears = 40
}: {
  modelStartDate?: string;
  operationStartDate?: string;
  operationYears?: number;
}): number[] {
  let modelStartDateObj = new Date(modelStartDate);
  let operationStartDateObj = new Date(operationStartDate);
  operationStartDateObj.setFullYear(
    operationStartDateObj.getFullYear() + operationYears
  );

  if (modelStartDateObj > operationStartDateObj) {
    const temp = modelStartDateObj;
    modelStartDateObj = operationStartDateObj;
    operationStartDateObj = temp;
  }

  const values: number[] = [];

  while (modelStartDateObj < operationStartDateObj) {
    if (
      modelStartDateObj <=
      new Date(
        operationStartDateObj.getFullYear() - operationYears,
        operationStartDateObj.getMonth(),
        operationStartDateObj.getDate()
      )
    ) {
      values.push(0);
    } else {
      values.push(1);
    }

    modelStartDateObj.setMonth(modelStartDateObj.getMonth() + 1);
  }

  return values;
}
export function getMonthsNumberFromModelStartDate(
  date1 = '2023-01-01',
  date2 = '2068-06-30'
): number {
  let date1Obj = new Date(date1);
  let date2Obj = new Date(date2);

  date1Obj.setDate(1);
  date2Obj.setDate(1);

  if (date1Obj > date2Obj) {
    const temp = date1Obj;
    date1Obj = date2Obj;
    date2Obj = temp;
  }

  const years = date2Obj.getFullYear() - date1Obj.getFullYear();
  const months = date2Obj.getMonth() - date1Obj.getMonth();

  const monthNumberFromModelStartDate = years * 12 + months + 1;
  return monthNumberFromModelStartDate;
}

export function getAsAPercentOfPeriod(
  startDate: Date | string,
  date1: Date | string,
  date2: Date | string,
  endDate: Date | string
): number[] {
  const arr: number[] = [];
  startDate = new Date(startDate);
  date1 = new Date(date1);
  date2 = new Date(date2);
  endDate = new Date(endDate);

  while (startDate <= endDate) {
    if (startDate >= date1 && startDate <= date2) {
      arr.push(1);
    } else {
      arr.push(0);
    }
    startDate.setMonth(startDate.getMonth() + 1);
  }

  return arr;
}

export function calcDaysInMonth(
  modelStartDate = '2023-01-01',
  operationEndDate = '2024-01-01'
): number[] {
  // Convert strings to Date objects
  let modelStart: Date = new Date(modelStartDate);
  let operationEnd: Date = new Date(operationEndDate);

  // Convert to UTC
  modelStart = new Date(
    Date.UTC(
      modelStart.getFullYear(),
      modelStart.getMonth(),
      modelStart.getDate()
    )
  );
  operationEnd = new Date(
    Date.UTC(
      operationEnd.getFullYear(),
      operationEnd.getMonth(),
      operationEnd.getDate()
    )
  );

  // Ensure modelStartDate is the earlier date
  if (modelStart > operationEnd) {
    const temp: Date = modelStart;
    modelStart = operationEnd;
    operationEnd = temp;
  }

  const daysInMonths: number[] = [];

  while (modelStart < operationEnd) {
    const year: number = modelStart.getUTCFullYear();
    const month: number = modelStart.getUTCMonth();
    let daysInMonth: number = new Date(
      Date.UTC(year, month + 1, 0)
    ).getUTCDate(); // Get last day of month

    // If it's the first month, subtract the starting day
    if (modelStart.getUTCDate() > 1) {
      daysInMonth -= modelStart.getUTCDate() - 1;
      modelStart.setUTCDate(1); // Set to the first day of the month
    }

    // If it's the last month and not the last day of the month, subtract the remaining days
    if (
      modelStart.getUTCFullYear() === operationEnd.getUTCFullYear() &&
      modelStart.getUTCMonth() === operationEnd.getUTCMonth()
    ) {
      daysInMonth -=
        new Date(Date.UTC(year, month + 1, 0)).getUTCDate() -
        operationEnd.getUTCDate();

      daysInMonths.push(daysInMonth);
      break;
    }

    daysInMonths.push(daysInMonth);

    modelStart.setUTCMonth(modelStart.getUTCMonth() + 1); // Go to the next month
  }

  return daysInMonths;
}

export function calcPeriod(): number {
  const period = getMonthsNumberFromModelStartDate() - 1;
  return period;
}

export function yearlyFlag(arr: number[], startDate: string): number[] {
  const startMonth = new Date(startDate).getMonth() + 1;
  const sumArr: number[] = [];
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    if (i < 12 - startMonth) {
      sum += arr[i];
      if (i === 11 - startMonth) {
        if (sum > 0) sumArr.push(1);
        else sumArr.push(0);
        sum = 0;
      }
    } else {
      sum += arr[i];
      if ((i - (11 - startMonth)) % 12 === 0) {
        if (sum > 0) sumArr.push(1);
        else sumArr.push(0);
        sum = 0;
      } else if (i === arr.length - 1) {
        if (sum > 0) sumArr.push(1);
        else sumArr.push(0);
      }
    }
  }

  return sumArr;
}

export function normalizeArray(
  array: any[],
  length: number,
  defaultValue?: any
): any[] {
  const array_length = array.length;
  const _d: any = defaultValue || array[array_length - 1];

  for (let i = array_length; i < length; i++) {
    array.push(_d);
  }

  array = array.slice(0, length);
  return array;
}
export function normalizeArrayBySeasonality(arr: any[], length: number): any[] {
  const arr_length = arr.length;

  for (let i = arr_length; i < length; i++) {
    arr.push(arr[i - 12]);
  }

  return arr;
}

export function roundArray(value: number[], numDigits: number): number[] {
  return value?.map((d) => parseFloat(d.toFixed(numDigits)));
}

export function arrayDivide(array1: number[], array2: number[]): number[] {
  return array1.map((d, index) => d / array2[index]);
}

export function roundNumber(value: number, numDigits: number): number {
  return parseFloat(value.toFixed(numDigits));
}

export function cumulativeMultiply(arr: number[]): number[] {
  const arrayLength = arr?.length;
  const value: number[] = [];

  for (let i = 0; i < arrayLength; i++) {
    if (i === 0) {
      value[i] = 1;
    } else {
      value[i] = value[i - 1] * (1 + arr[i] / 100);
    }
  }

  return value;
}

export function annualIndexToMonths(array: number[]): number[] {
  const len = array.length;
  const resultArray: number[] = [];

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < 12; j++) {
      resultArray[i * 12 + j] = array[i];
    }
  }

  return resultArray;
}

export function addYears(dateString: string, years: number): string {
  const date: Date = new Date(dateString);
  date.setFullYear(date.getFullYear() + years);
  return date.toISOString().split('T')[0];
}

export function arraySum(array1: number[], array2: number[]): number[] {
  return array1.map((d, index) => d + array2[index]);
}
export function addZeros(array: number[], length: number): number[] {
  const array_length = array.length;
  const _d = 0;

  for (let i = array_length; i < length; i++) {
    array.push(_d);
  }

  array = array.slice(0, length);
  return array;
}

export function sumMonthlyValues(arr: number[], startDate: string): number[] {
  const startMonth = new Date(startDate).getMonth() + 1;
  const sumArr: number[] = [];
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    if (i < 12 - startMonth) {
      sum += arr[i];
      if (i === 11 - startMonth) {
        sumArr.push(sum);
        sum = 0;
      }
    } else {
      sum += arr[i];
      if ((i - (11 - startMonth)) % 12 === 0) {
        sumArr.push(sum);
        sum = 0;
      } else if (i === arr.length - 1) {
        sumArr.push(sum);
      }
    }
  }

  return sumArr;
}

export function expandAndAverage(arr: number[], num: number): number[] {
  // Expand array with zeros
  for (let i = 0; i < num; i++) {
    arr.push(0);
  }
  // Create a new array for the averages
  const averages: number[] = [];
  // Calculate average for each element
  for (let i = 0; i < arr.length - num; i++) {
    let sum = 0;
    for (let j = i + 1; j <= i + num; j++) {
      sum += arr[j];
    }
    averages.push(sum / num);
  }
  return averages;
}

export function sumArrays(...arrays: number[][]): number[] {
  const length = arrays[0]?.length;
  const result: number[] = new Array(length).fill(0);

  for (const array of arrays) {
    for (let i = 0; i < length; i++) {
      result[i] += array[i];
    }
  }

  return result;
}

export function multiplyNumber(array: number[], num: number): number[] {
  const len = array.length;
  const result = [];
  for (let i = 0; i < len; i++) result[i] = array[i] * num;
  return result;
}

export function nthLargest(
  arr: number[],
  n: number
): { index: number; value: number } {
  const indexedArr = arr.map((e, i) => ({ index: i, value: e }));
  indexedArr.sort((a, b) => b.value - a.value);
  return indexedArr[n - 1];
}

export function multiplyArrays(ararys: number[][]): number[] {
  const length = ararys[0].length;
  const result = new Array(length).fill(1);

  for (const array of ararys) {
    for (let i = 0; i < length; i++) {
      result[i] *= array[i];
    }
  }
  return result;
}

export function sumArray(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0);
}

export function expandAndSum(arr: number[], num: number): number[] {
  // Create a copy of the original array
  const arrCopy = [...arr];

  // Expand array with zeros
  for (let i = 0; i < num; i++) {
    arrCopy.push(0);
  }

  // Create a new array for the averages
  const sums = [];

  // Calculate average for each element
  for (let i = 0; i < arrCopy.length - num; i++) {
    let sum = 0;
    for (let j = i; j < i + num; j++) {
      sum += arrCopy[j];
    }
    sums.push(sum);
  }

  return sums;
}

export function minArray(arr: number[][]) {
  const result = [];
  for (let i = 0; i < arr[0]?.length; i++) {
    let min = arr[0][i];
    for (let j = 0; j < arr?.length; j++) {
      if (arr[j][i] < min) {
        min = arr[j][i];
      }
    }
    result.push(min);
  }
  return result;
}

export function sum(arr: number[]): number {
  const len = arr.length;
  let sum = 0;
  for (let i = 0; i < len; i++) {
    sum += arr[i];
  }
  return sum;
}

export function npv(rate: number, cashflows: number[]): number {
  let npv = 0;
  const len = cashflows.length;
  const real_rate = Math.pow(1 + rate, 1 / 12);
  for (let i = 0; i < len; i++) {
    npv += cashflows[i] / Math.pow(real_rate, i + 1);
  }
  return npv;
}

export function calcIRR(
  temp_npv: number,
  temp_discount_rate: number,
  cash_flow: number[]
): number {
  const inc = 0.25;
  const dec = -0.25;
  let count = 1;
  while (Math.abs(temp_npv) > 0.01) {
    if (temp_npv > 0) {
      temp_discount_rate = temp_discount_rate * (1 + inc / count);
    } else temp_discount_rate = temp_discount_rate * (1 + dec / count);

    temp_npv = npv(temp_discount_rate, cash_flow);
    count++;
  }

  const irr = temp_discount_rate;
  return irr;
}

export function paybackPeriod(
  cashflow: number[],
  payback_start_date_month_number_from_valuation_date: number
): number {
  const len = cashflow.length;
  let sum = 0;
  let i = 0;
  while (i <= payback_start_date_month_number_from_valuation_date) {
    sum += cashflow[i];
    i++;
  }
  while (sum < 0) {
    sum += cashflow[i];
    i++;
  }

  const payback_period = (i + 1) / 12;
  return payback_period;
}

/*Calcs ~~~ 3.04 Live selection*/

export function getLiveDegradationPerCycle(
  initialCycleData = [
    {
      averageCyclesPerDay: 2.0,
      retentionRate: [
        92.22, 88.58, 85.59, 83.04, 80.74, 78.63, 76.66, 74.82, 73.08, 71.41,
        69.79, 68.23, 66.71, 65.19, 63.67, 62.15, 60.63, 59.11, 57.59, 56.07,
        54.55, 53.03, 51.51, 49.99, 48.47, 46.95, 45.43, 43.91, 42.39, 40.87,
        39.35, 37.83, 36.31, 34.79, 33.27, 31.75, 30.23, 28.71, 27.19, 25.67,
        24.15, 22.63, 21.11, 19.59, 18.07
      ]
    },
    {
      averageCyclesPerDay: 1.5,
      retentionRate: [
        92.83, 89.56, 86.89, 84.61, 82.56, 80.68, 78.93, 77.29, 75.75, 74.27,
        72.83, 71.44, 70.09, 68.79, 67.52, 66.28, 65.08, 63.88, 62.68, 61.48,
        60.28, 59.08, 57.88, 56.68, 55.48, 54.28, 53.08, 51.88, 50.68, 49.48,
        48.28, 47.08, 45.88, 44.68, 43.48, 42.28, 41.08, 39.88, 38.68, 37.48,
        36.28, 35.08, 33.88, 32.68, 31.48
      ]
    },
    {
      averageCyclesPerDay: 1.0,
      retentionRate: [
        93.46, 90.59, 88.25, 86.27, 84.49, 82.85, 81.34, 79.93, 78.6, 77.33,
        76.08, 74.88, 73.72, 72.6, 71.5, 70.44, 69.4, 68.38, 67.39, 66.41,
        65.43, 64.45, 63.47, 62.49, 61.51, 60.53, 59.55, 58.57, 57.59, 56.61,
        55.63, 54.65, 53.67, 52.69, 51.71, 50.73, 49.75, 48.77, 47.79, 46.81,
        45.83, 44.85, 43.87, 42.89, 41.91
      ]
    }
  ],
  startingAssumptionsForBatteries = {
    degradationForecastAverageCyclesPerDay: 1.25,
    batteryAvailability: 97,
    batteryDuration: 4
  }
) {
  /*liveCycle  ~~~  3.04 Degradation forecast selection*/

  const liveCycleData = [];
  const degradationPerCycleData = getDegradationPerCycle(initialCycleData);
  const years = degradationPerCycleData[0].degradationPerCycle.length;

  if (
    startingAssumptionsForBatteries.degradationForecastAverageCyclesPerDay >=
    degradationPerCycleData[1].averagePerCycle
  ) {
    const a =
      degradationPerCycleData[0].averagePerCycle -
      startingAssumptionsForBatteries.degradationForecastAverageCyclesPerDay;
    const b =
      startingAssumptionsForBatteries.degradationForecastAverageCyclesPerDay -
      degradationPerCycleData[1].averagePerCycle;

    for (let i = 0; i < years; i++) {
      for (let k = 0; k < 12; k++) {
        liveCycleData[i * 12 + k] =
          (b * degradationPerCycleData[0].degradationPerCycle[i] +
            a * degradationPerCycleData[1].degradationPerCycle[i]) /
          (a + b) /
          365 /
          100 /
          startingAssumptionsForBatteries.degradationForecastAverageCyclesPerDay;
      }
    }
  } else {
    const c =
      degradationPerCycleData[1].averagePerCycle -
      startingAssumptionsForBatteries.degradationForecastAverageCyclesPerDay;
    const d =
      startingAssumptionsForBatteries.degradationForecastAverageCyclesPerDay -
      degradationPerCycleData[2].averagePerCycle;
    for (let i = 0; i < years; i++) {
      for (let k = 0; k < 12; k++) {
        liveCycleData[i * 12 + k] =
          (d * degradationPerCycleData[1].degradationPerCycle[i] +
            c * degradationPerCycleData[2].degradationPerCycle[i]) /
          (c + d) /
          365 /
          100 /
          startingAssumptionsForBatteries.degradationForecastAverageCyclesPerDay;
      }
    }
  }
  /*liveCycleData  ~~~  3.04 Degradation per cycle*/

  return roundArray(liveCycleData, 10);
}

/*4Capex  ~~~  Battery Cubes Forecast*/
export function calcCapexForecast({
  model = 'Conservative',
  batteryDuration = 4,
  batteryCubes = {
    baseYear: 2023,
    data: [
      { duration: 2, value: 198.463 },
      { duration: 4, value: 396.925 }
    ]
  },
  batteryExCubes = {
    baseYear: 2023,
    data: [
      { duration: 2, value: 41.572 },
      { duration: 4, value: 83.144 }
    ]
  },
  inflationInputs = [
    {
      profile: 'No inflation',
      rate: [
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0
      ]
    },
    {
      profile: 'RPI',
      rate: [
        4.0, 11.6, 10.0, 5.1, 2.6, 2.5, 2.8, 2.9, 2.9, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0
      ]
    },
    {
      profile: 'CPI',
      rate: [
        2.6, 9.1, 7.4, 3.6, 1.8, 1.4, 1.7, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0
      ]
    },
    {
      profile: 'Tees rent high case',
      rate: [
        5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0,
        5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0,
        5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0,
        5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0
      ]
    },
    {
      profile: 'FES to 2050 then nil',
      rate: [
        0.23, 2.58, 4.59, 2.85, 1.7, 1.51, 1.85, 1.99, 2.15, 2.19, 2.18, 2.18,
        2.18, 2.18, 2.18, 2.19, 2.19, 2.19, 2.19, 2.19, 2.19, 2.18, 2.18, 2.18,
        2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0
      ]
    },
    {
      profile: 'FES constant from 2050',
      rate: [
        0.23, 2.58, 4.59, 2.85, 1.7, 1.51, 1.85, 1.99, 2.15, 2.19, 2.18, 2.18,
        2.18, 2.18, 2.18, 2.19, 2.19, 2.19, 2.19, 2.19, 2.19, 2.18, 2.18, 2.18,
        2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17,
        2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17,
        2.17, 2.17, 2.17, 2.17
      ]
    },
    {
      profile: 'CPI to 2050 then nil',
      rate: [
        2.6, 9.1, 7.4, 3.6, 1.8, 1.4, 1.7, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0
      ]
    },
    {
      profile: 'CPI with 2% collar and 5% cap',
      rate: [
        2.6, 5.0, 5.0, 3.6, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0
      ]
    },
    {
      profile: 'spare',
      rate: [
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0
      ]
    }
  ],
  bessCapexForecast = {
    inflationProfile: 'No inflation',
    baseYear: 2023
  },
  batterySensitivity = 0,
  operationYears = 40
}: {
  model?: string;
  batteryDuration?: number;
  batteryCubes?: IBatteryCubes;
  batteryExCubes?: IBatteryExcubes;
  inflationInputs?: IInflationForm[];
  bessCapexForecast?: IBessCapexForecast;
  batterySensitivity?: number;
  operationYears?: number;
}) {
  const inputData = [
    {
      model: 'Conservative',
      data: [
        {
          duration: 2,
          data: [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ]
        },
        {
          duration: 4,
          data: [
            1850.08, 1863.288, 1836.851, 1768.061, 1699.272, 1630.484, 1561.697,
            1492.911, 1482.69, 1472.468, 1462.246, 1452.025, 1441.803, 1431.581,
            1421.36, 1411.138, 1400.917, 1390.695, 1380.473, 1370.252, 1360.03,
            1349.808, 1339.587, 1329.365, 1319.143, 1308.922, 1289.7, 1288.478
          ]
        },
        {
          duration: 8,
          data: [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ]
        }
      ]
    },
    {
      model: 'Moderate',
      data: [
        {
          duration: 2,
          data: [
            1022, 980, 862, 839, 817, 794, 771, 749, 739, 728, 718, 708, 697,
            687, 677, 666, 656, 646, 635, 625, 615, 604, 594, 583, 573, 562,
            552, 541
          ]
        },
        {
          duration: 4,
          data: [
            1716, 1639, 1436, 1390, 1343, 1297, 1250, 1204, 1185, 1167, 1148,
            1130, 1111, 1092, 1074, 1055, 1037, 1018, 1000, 981, 963, 944, 925,
            907, 888, 870, 851, 833
          ]
        },
        {
          duration: 8,
          data: [
            3102, 2956, 2584, 2490, 2396, 2302, 2208, 2114, 2079, 2044, 2008,
            1973, 1938, 1903, 1868, 1833, 1798, 1763, 1728, 1693, 1658, 1624,
            1589, 1554, 1519, 1484, 1450, 1415
          ]
        }
      ]
    },
    {
      model: 'Advanced',
      data: [
        {
          duration: 2,
          data: [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ]
        },
        {
          duration: 4,
          data: [
            1283, 1211, 1150, 1101, 1052, 1003, 955, 906, 890, 874, 858, 842,
            826, 810, 795, 779, 763, 747, 731, 715, 699, 683, 668, 652, 636,
            620, 604, 588
          ]
        },
        {
          duration: 8,
          data: [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ]
        }
      ]
    }
  ];

  const selectedData = inputData.find((m) => m?.model == model);
  // if(mode == 'Live selection')
  //     return selectedData;
  // if(mode == 'Long-term profile - absolute'){
  //     // selectedData.map()
  //     return selectedData;
  // }

  let percentageData = selectedData;
  percentageData = {
    model: percentageData?.model as string,
    data: (percentageData?.data || []).map((d) => {
      return {
        duration: d.duration,
        data: d.data.map((dd, index, arr) => {
          if (index == 0) return 1;
          if (dd == null || arr[0] == null || arr[0] == 0) return 0;
          return parseFloat((dd / arr[0]).toFixed(4));
        })
      };
    })
  };
  const cubesBasePrice =
    batteryCubes.data.find((d) => d?.duration == batteryDuration)?.value || 0;
  const cubesExBasePrice =
    batteryExCubes.data.find((d) => d?.duration == batteryDuration)?.value || 0;
  const batteryCubesForecast = normalizeArray(
    percentageData.data.find((d) => d.duration == batteryDuration)?.data || [],
    operationYears + 5
  ).map((d) => {
    return d * cubesBasePrice;
  });
  const batteryExCubesForecast = normalizeArray(
    percentageData.data.find((d) => d.duration == batteryDuration)?.data || [],
    operationYears + 5
  ).map((d) => {
    return d * cubesExBasePrice;
  });

  const indexValue = inflationIndex({
    inflationInputs,
    baseYear: bessCapexForecast.baseYear,
    profile: bessCapexForecast.inflationProfile
  });

  const annualBatteriesCapexForecast = batteryCubesForecast.map((b, index) => {
    return (
      (b * 1 + 1 * batteryExCubesForecast[index]) *
      normalizeArray(indexValue, operationYears + 5)[index] *
      (1 + batterySensitivity)
    );
  });

  return [
    roundArray(batteryCubesForecast, 3),
    roundArray(batteryExCubesForecast, 3),
    roundArray(annualBatteriesCapexForecast, 3)
  ];
}

/**Calc 8 Cycles Cycles per month ~~~ Retrun the array of 540 elements*/

export function getCyclesPerMonth({
  revenueSetup = DEFAULT_REVENUE_SETUP,
  assumptionsData = DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  startingAssumptionsForBatteries = DEFAULT_STARTING_BATTERY_ASSUMPTION,
  detailedRevenueData = DEFAULT_DETAILED_REVENUE_DATA,
  modelStartDate = '2023-01-01',
  operationStartDate = '2028-01-01',
  decommissioningStartDate = '2068-01-01',
  decommissioningEndDate = '2068-06-30',
  operationYears = 40
}: {
  revenueSetup?: IRevenueSetup;
  assumptionsData?: IAssumptionData[];
  startingAssumptionsForBatteries?: IStartingBatteryAssumptions;
  detailedRevenueData?: IDetailedRevenueData[];
  modelStartDate?: string;
  operationStartDate?: string;
  operationYears?: number;
  decommissioningStartDate?: string;
  decommissioningEndDate?: string;
}) {
  const period =
    getMonthsNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;
  const numberOfDaysInMonth = calcDaysInMonth(
    modelStartDate,
    decommissioningEndDate
  );
  const data =
    getActiveScenarioRevenueItems({
      revenueSetup,
      assumptionsData,
      startingAssumptionsForBatteries,
      detailedRevenueData
    })?.find((d) => d?.item == 'Avg. Cycles per day')?.data || [];

  const cyclesPerDay = normalizeArrayBySeasonality(
    multiplyNumber(data, 1),
    period
  );
  const operationsAsAPercentOfPeriod = getAsAPercentOfPeriod(
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate
  );
  const averageCyclesPerMonth = cyclesPerDay.map((d, index, arr) =>
    parseFloat(
      (
        d *
        numberOfDaysInMonth[index + 1] *
        operationsAsAPercentOfPeriod[index]
      ).toFixed(3)
    )
  );
  return averageCyclesPerMonth;
}
/*15 Inflation   ~~~ 15.02 2021 real terms*/

export function getInflationIndex({
  inflationInputs = DEFAULT_INFLATION_INPUTS
}: {
  inflationInputs?: IInflationForm[];
}) {
  const inflationIndex = inflationInputs.map((d) => {
    return {
      profile: d.profile,
      rate: roundArray(cumulativeMultiply(d.rate), 10)
    };
  });
  return inflationIndex;
}

/*Calculating inflation index under the given base year and profile*/

export function inflationIndex({
  inflationInputs = [
    {
      profile: 'No inflation',
      rate: [
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0
      ]
    },
    {
      profile: 'RPI',
      rate: [
        4.0, 11.6, 10.0, 5.1, 2.6, 2.5, 2.8, 2.9, 2.9, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0
      ]
    },
    {
      profile: 'CPI',
      rate: [
        2.6, 9.1, 7.4, 3.6, 1.8, 1.4, 1.7, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0
      ]
    },
    {
      profile: 'Tees rent high case',
      rate: [
        5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0,
        5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0,
        5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0,
        5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0
      ]
    },
    {
      profile: 'FES to 2050 then nil',
      rate: [
        0.23, 2.58, 4.59, 2.85, 1.7, 1.51, 1.85, 1.99, 2.15, 2.19, 2.18, 2.18,
        2.18, 2.18, 2.18, 2.19, 2.19, 2.19, 2.19, 2.19, 2.19, 2.18, 2.18, 2.18,
        2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0
      ]
    },
    {
      profile: 'FES constant from 2050',
      rate: [
        0.23, 2.58, 4.59, 2.85, 1.7, 1.51, 1.85, 1.99, 2.15, 2.19, 2.18, 2.18,
        2.18, 2.18, 2.18, 2.19, 2.19, 2.19, 2.19, 2.19, 2.19, 2.18, 2.18, 2.18,
        2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17,
        2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17, 2.17,
        2.17, 2.17, 2.17, 2.17
      ]
    },
    {
      profile: 'CPI to 2050 then nil',
      rate: [
        2.6, 9.1, 7.4, 3.6, 1.8, 1.4, 1.7, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0
      ]
    },
    {
      profile: 'CPI with 2% collar and 5% cap',
      rate: [
        2.6, 5.0, 5.0, 3.6, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0
      ]
    },
    {
      profile: 'spare',
      rate: [
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0
      ]
    }
  ],
  baseYear = 2023,
  profile = 'CPI to 2050 then nil'
}: {
  inflationInputs?: IInflationForm[];
  baseYear?: number;
  profile?: string;
}) {
  const matchData =
    getInflationIndex({ inflationInputs }).find((d) => d?.profile == profile)
      ?.rate || [];
  const baseValue = matchData[baseYear - INFLATION_START_YEAR];
  return matchData.map((m) => m / baseValue);
}

/*calcs 3.03 Degradaion per cycle*/
export function getDegradationPerCycle(
  initialCycleData = [
    {
      averageCyclesPerDay: 2.0,
      retentionRate: [
        92.22, 88.58, 85.59, 83.04, 80.74, 78.63, 76.66, 74.82, 73.08, 71.41,
        69.79, 68.23, 66.71, 65.19, 63.67, 62.15, 60.63, 59.11, 57.59, 56.07,
        54.55, 53.03, 51.51, 49.99, 48.47, 46.95, 45.43, 43.91, 42.39, 40.87,
        39.35, 37.83, 36.31, 34.79, 33.27, 31.75, 30.23, 28.71, 27.19, 25.67,
        24.15, 22.63, 21.11, 19.59, 18.07
      ]
    },
    {
      averageCyclesPerDay: 1.5,
      retentionRate: [
        92.83, 89.56, 86.89, 84.61, 82.56, 80.68, 78.93, 77.29, 75.75, 74.27,
        72.83, 71.44, 70.09, 68.79, 67.52, 66.28, 65.08, 63.88, 62.68, 61.48,
        60.28, 59.08, 57.88, 56.68, 55.48, 54.28, 53.08, 51.88, 50.68, 49.48,
        48.28, 47.08, 45.88, 44.68, 43.48, 42.28, 41.08, 39.88, 38.68, 37.48,
        36.28, 35.08, 33.88, 32.68, 31.48
      ]
    },
    {
      averageCyclesPerDay: 1.0,
      retentionRate: [
        93.46, 90.59, 88.25, 86.27, 84.49, 82.85, 81.34, 79.93, 78.6, 77.33,
        76.08, 74.88, 73.72, 72.6, 71.5, 70.44, 69.4, 68.38, 67.39, 66.41,
        65.43, 64.45, 63.47, 62.49, 61.51, 60.53, 59.55, 58.57, 57.59, 56.61,
        55.63, 54.65, 53.67, 52.69, 51.71, 50.73, 49.75, 48.77, 47.79, 46.81,
        45.83, 44.85, 43.87, 42.89, 41.91
      ]
    }
  ]
) {
  /*initialCycleData  ~~~  calcs 3.01 Degradaion input curves*/
  const ceilingCycle = initialCycleData[0].averageCyclesPerDay;
  const middleCycle = initialCycleData[1].averageCyclesPerDay;
  const floorCycle = initialCycleData[2].averageCyclesPerDay;

  const ceilingRetentionRate = initialCycleData[0].retentionRate;
  const middleRetentionRate = initialCycleData[1].retentionRate;
  const floorRetentionRate = initialCycleData[2].retentionRate;

  const ceilingDegradationPerCycle = [];
  const middleDegradationPerCycle = [];
  const floorDegradationPerCycle = [];
  const years = ceilingRetentionRate.length;

  for (let i = 0; i < years; i++) {
    if (i == 0) {
      ceilingDegradationPerCycle[i] = 100 - ceilingRetentionRate[i];

      middleDegradationPerCycle[i] = 100 - middleRetentionRate[i];
      floorDegradationPerCycle[i] = 100 - floorRetentionRate[i];
    } else {
      ceilingDegradationPerCycle[i] =
        ceilingRetentionRate[i - 1] - ceilingRetentionRate[i];

      middleDegradationPerCycle[i] =
        middleRetentionRate[i - 1] - middleRetentionRate[i];
      floorDegradationPerCycle[i] =
        floorRetentionRate[i - 1] - floorRetentionRate[i];
    }
  }

  // const degradationPerCycleData = [
  // 	{
  // 		averagePerCycle: ceilingCycle,
  // 		degradationPerCycle: ceilingDegradationPerCycle,
  // 	},
  // 	{
  // 		averagePerCycle: middleCycle,
  // 		degradationPerCycle: middleDegradationPerCycle,
  // 	},
  // 	{
  // 		averagePerCycle: floorCycle,
  // 		degradationPerCycle: floorDegradationPerCycle,
  // 	},
  // ];
  const degradationPerCycleData = [
    {
      averagePerCycle: ceilingCycle,
      degradationPerCycle: ceilingDegradationPerCycle
    },
    {
      averagePerCycle: middleCycle,
      degradationPerCycle: middleDegradationPerCycle
    },
    {
      averagePerCycle: floorCycle,
      degradationPerCycle: floorDegradationPerCycle
    }
  ];

  return degradationPerCycleData;
}

export function calcVintages({
  revenueSetup = DEFAULT_REVENUE_SETUP,
  assumptionsData = DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  detailedRevenueData = DEFAULT_DETAILED_REVENUE_DATA,
  initialCycleData = DEFAULT_INITIAL_CYCLE_DATA,
  initialCapacity = 1000,
  startingAssumptionsForBatteries = DEFAULT_STARTING_BATTERY_ASSUMPTION,
  batteryDisposals = DEFAULT_BATTERY_DISPOSAL,
  batteryEfficiency = DEFAULT_BATTERY_EFFICIENCY,
  batteryAugmentation = DEFAULT_BATTERY_AUGMENTATION,
  model = 'Conservative',
  batteryDuration = 4,
  batteryCubes = DEFAULT_BATTERY_CUBES,
  batteryExCubes = DEFAULT_BATTERY_EXCUBES,
  inflationInputs = DEFAULT_INFLATION_INPUTS,
  capexPaymentsProfile = DEFAULT_CAPEX_PAYMENTS_PROFILE,
  capexPaymentMilestones = DEFAULT_CAPEX_PAYMENT_MILESTONES,
  capexUEL = DEFAULT_CAPEX_UEL,
  bessCapexForecast = DEFAULT_BESS_CAPEX_FORECAST,
  batterySensitivity = 0,
  operationYears = 40,
  modelStartDate = '2023-01-01',
  operationStartDate = '2028-01-01',
  decommissioningEndDate = '2068-06-30',
  decommissioningStartDate = '2068-01-01'
}: {
  revenueSetup?: IRevenueSetup;
  assumptionsData?: IAssumptionData[];
  detailedRevenueData?: IDetailedRevenueData[];
  initialCycleData?: ICycleData[];
  initialCapacity?: number;
  startingAssumptionsForBatteries?: IStartingBatteryAssumptions;
  batteryDisposals?: IBatteryDisposal;
  batteryEfficiency?: IBatteryEfficiency;
  batteryAugmentation?: IBatteryAugmentation;
  model?: string;
  batteryDuration?: number;
  batteryCubes?: IBatteryCubes;
  batteryExCubes?: IBatteryExcubes;
  inflationInputs?: IInflationForm[];
  capexPaymentsProfile?: ICapexPaymentForm[];
  capexPaymentMilestones?: ICapexPaymentMilestoneForm[];
  capexUEL?: ICapexUELForm[];
  bessCapexForecast?: IBessCapexForecast;
  batterySensitivity?: number;
  operationYears?: number;
  modelStartDate?: string;
  operationStartDate?: string;
  decommissioningEndDate?: string;
  decommissioningStartDate?: string;
}) {
  const period =
    getMonthsNumberFromModelStartDate(modelStartDate, decommissioningEndDate) -
    1;

  const diposalMonth = getMonthsNumberFromModelStartDate(
    modelStartDate,
    decommissioningStartDate
  );
  /** Creation of Vintage array composed of empty objects */
  const vintages = [];
  for (let i = 0; i < 40; i++)
    vintages.push({
      name: `Vintage${i + 1}`,
      data: {
        stagingMonthNumber: 0,
        stagingFlag: '',
        additionsCost: 0.0,
        paymentMilestones: new Array(period).fill(0),
        forecastAdditionsByMilestones: new Array(period).fill(0),
        grossCashPayments: '',
        forecastDepreciationChargeByPeriod: new Array(period).fill(0),
        startBalance: new Array(period).fill(0),
        endBalance: new Array(period).fill(0),
        disposalMonthNumber: 0,
        disposalFlag: 0,
        capacityPreAdjustmentForEfficiency: 0,
        capacityAddedAdjustedForEfficiency: 0.0,
        capacityPostEfficiencyAndDegradation: '',
        cumulativeDegradation: 0,
        degradationInPeriod: '',
        generationCapacityInPeriod: new Array(period).fill(0),
        forecastCapexPrice: '',
        forecastCapexAdditions: ''
      }
    });
  /**Degradation by Vintage: Calculation of 7.03 Technical specifications of Calcs Sheet*/
  const degradationPerCycle = getLiveDegradationPerCycle(
    initialCycleData,
    startingAssumptionsForBatteries
  );
  /**cyclesPerPeriod: Calculation of 7.04 Cycles per Period of Calcs Sheet  */
  const cyclesPerPeriod = getCyclesPerMonth({
    revenueSetup,
    assumptionsData,
    startingAssumptionsForBatteries,
    detailedRevenueData,
    modelStartDate,
    operationStartDate,
    decommissioningStartDate,
    decommissioningEndDate
  });
  // capexForecast is the annual forecast price of the batteries.
  const capexForecast = annualIndexToMonths(
    calcCapexForecast({
      model,
      batteryDuration,
      batteryCubes,
      batteryExCubes,
      inflationInputs,
      bessCapexForecast,
      batterySensitivity,
      operationYears
    })[2]
  );
  // bessPaymentProfile is the batteries payment profile
  const bessPaymentProfile =
    capexPaymentMilestones.find(
      (d) =>
        d.profileName ==
        capexPaymentsProfile.find((d) => d?.capexObject == 'Batteries')
          ?.paymentProfile
    )?.timing || [];

  const paymentProfileLength = bessPaymentProfile?.length || 0;
  const batteriesUEL =
    capexUEL.find((d) => d.capexObject == 'Batteries')?.usefulEconomicLife ||
    1.0;

  vintages[0].data.stagingMonthNumber = getMonthsNumberFromModelStartDate(
    modelStartDate,
    operationStartDate
  );
  vintages[0].data.capacityPreAdjustmentForEfficiency = initialCapacity;
  let realBatteryEfficiency: number[];
  if (batteryEfficiency.efficiencySwitch == 0)
    realBatteryEfficiency = new Array(period).fill(
      batteryEfficiency.fixedEfficiency
    );
  else
    realBatteryEfficiency = annualIndexToMonths(
      batteryEfficiency?.forecastEfficiency || []
    );
  vintages[0].data.capacityAddedAdjustedForEfficiency = parseFloat(
    (
      (vintages[0].data.capacityPreAdjustmentForEfficiency * 100) /
      realBatteryEfficiency[0]
    ).toFixed(6)
  );
  vintages[0].data.additionsCost =
    capexForecast[vintages[0].data.stagingMonthNumber - 1] *
    vintages[0].data.capacityAddedAdjustedForEfficiency;
  let totalGenerationCapacity: number[] = [];
  const decommissioningStartMonthNumber = getMonthsNumberFromModelStartDate(
    modelStartDate,
    decommissioningStartDate
  );

  for (let j = 0; j < period; j++) {
    totalGenerationCapacity[j] = 0;
  }

  for (let k = 0; k < 40; k++) {
    const degradationValue = [];
    const generationCapacity = [];
    let cumulativeDegradationValue = 0;
    const paymentSchedule = [];

    for (let i = 0; i < period; i++) {
      // calculation of additions of batteries monthly per vintage based on payments milestones.
      if (
        i >= vintages[k].data.stagingMonthNumber - paymentProfileLength &&
        i < vintages[k].data.stagingMonthNumber
      ) {
        paymentSchedule[i] =
          bessPaymentProfile[
            i + paymentProfileLength - vintages[k].data.stagingMonthNumber
          ];
      } else {
        paymentSchedule[i] = 0;
      }

      vintages[k].data.forecastAdditionsByMilestones[i] = roundNumber(
        paymentSchedule[i] * vintages[k].data.additionsCost,
        3
      );

      // calculation of degradation, generation capacity of batteries.
      if (
        vintages[k].data.stagingMonthNumber - 1 > i ||
        vintages[k].data.disposalFlag == 1 ||
        i >= diposalMonth - 1
      ) {
        degradationValue[i] = 0;
        generationCapacity[i] = 0;
        cumulativeDegradationValue =
          cumulativeDegradationValue + degradationValue[i];
      } else {
        if (i >= diposalMonth - 1) {
          degradationValue[i] = 0;
        } else {
          degradationValue[i] =
            degradationPerCycle[i - vintages[k].data.stagingMonthNumber + 1] *
            cyclesPerPeriod[i];
        }
        cumulativeDegradationValue =
          cumulativeDegradationValue + degradationValue[i];

        if (
          cumulativeDegradationValue >=
            (100 - batteryDisposals.disposedRetentionRate) / 100 &&
          i % 12 == 11
        ) {
          if (
            i <
            vintages[0].data.stagingMonthNumber +
              (operationYears -
                batteryAugmentation.batteryAugmentationStopYear -
                1) *
                12
          ) {
            vintages[k].data.disposalMonthNumber = i + 2;
            vintages[k].data.disposalFlag = 1;
          } else
            vintages[k].data.disposalMonthNumber =
              decommissioningStartMonthNumber;
          // vintages[k].data.cumulativeDegradation = 0;
        } else if (
          cumulativeDegradationValue <
            100 - batteryDisposals.disposedRetentionRate &&
          i >=
            vintages[0].data.stagingMonthNumber +
              (operationYears -
                batteryAugmentation.batteryAugmentationStopYear -
                1) *
                12
        ) {
          vintages[k].data.disposalMonthNumber =
            decommissioningStartMonthNumber;
        }
        generationCapacity[i] = parseFloat(
          (
            vintages[k].data.capacityPreAdjustmentForEfficiency *
            (1 - cumulativeDegradationValue)
          ).toFixed(6)
        );
      }
    }
    const monthlyDepreciationAmount =
      vintages[k].data.additionsCost / (12 * batteriesUEL);
    // calculation of depreciation monthly per vintage
    for (let j = 0; j < period; j++) {
      if (
        j >= vintages[k].data.stagingMonthNumber - 1 &&
        j < vintages[k].data.disposalMonthNumber - 1 &&
        j < vintages[k].data.stagingMonthNumber + 12 * batteriesUEL - 1
      ) {
        vintages[k].data.forecastDepreciationChargeByPeriod[j] =
          monthlyDepreciationAmount;
      } else vintages[k].data.forecastDepreciationChargeByPeriod[j] = 0;
      // calculation of ending balance of batteries.
      vintages[k].data.endBalance[j] =
        vintages[k].data.startBalance[j] +
        vintages[k].data.forecastAdditionsByMilestones[j] -
        vintages[k].data.forecastDepreciationChargeByPeriod[j];
      if (j < period - 1)
        vintages[k].data.startBalance[j + 1] = vintages[k].data.endBalance[j];
    }

    vintages[k].data.cumulativeDegradation = cumulativeDegradationValue;
    vintages[k].data.generationCapacityInPeriod = generationCapacity;
    totalGenerationCapacity = vintages[k].data.generationCapacityInPeriod.map(
      (d, index) => d + totalGenerationCapacity[index]
    );

    // vintages[k].data.additionsCost =
    //   capexForecast[vintages[k].data.stagingMonthNumber - 1] *
    //   vintages[k].data.capacityAddedAdjustedForEfficiency;
    vintages[k].data.paymentMilestones = paymentSchedule;

    if (
      vintages[k].data.stagingMonthNumber -
        vintages[0].data.stagingMonthNumber >=
      12 *
        (operationYears - batteryAugmentation.batteryAugmentationStopYear - 1)
    )
      break;
    if (k < 39) {
      vintages[k + 1].data.stagingMonthNumber =
        vintages[k].data.stagingMonthNumber + 12;
      vintages[k + 1].data.capacityPreAdjustmentForEfficiency = roundNumber(
        initialCapacity -
          totalGenerationCapacity[vintages[k + 1].data.stagingMonthNumber - 1],
        3
      );
      vintages[k + 1].data.capacityAddedAdjustedForEfficiency = parseFloat(
        (
          (vintages[k + 1].data.capacityPreAdjustmentForEfficiency * 100) /
          realBatteryEfficiency[vintages[k + 1].data.stagingMonthNumber - 1]
        ).toFixed(6)
      );
      vintages[k + 1].data.additionsCost =
        capexForecast[vintages[k + 1].data.stagingMonthNumber - 1] *
        vintages[k + 1].data.capacityAddedAdjustedForEfficiency;
    }
  }

  const electricity_sold = multiplyNumber(
    multiplyArrays([totalGenerationCapacity, cyclesPerPeriod]),
    (batteryDuration * startingAssumptionsForBatteries.batteryAvailability) /
      100
  );
  return {
    electricitySold: electricity_sold,
    vintages: vintages,
    totalGenerationCapacity: totalGenerationCapacity
  };
}

export function preProcessArray4Graph(arr: number[] | string[]) {
  return arr.map((a) =>
    Number.isNaN(a)
      ? 0
      : typeof a == 'number'
      ? a.toFixed(2)
      : parseFloat(a).toFixed(2)
  );
}

export const getFilterData = (
  data: number[],
  modelStartDate: string,
  active: string,
  dateRange: { from: string; to: string }
) => {
  if (!Array.isArray(data)) return [];
  const _sIndex = Math.max(
    moment(dateRange.from).diff(moment(modelStartDate), 'month'),
    0
  );
  const _lIndex = Math.min(
    data.length,
    moment(dateRange.to).diff(moment(modelStartDate), 'month') + 1
  );
  if (active == 'monthly') return roundArray(data.slice(_sIndex, _lIndex), 1);
  if (active == 'semi_annually') {
    const _mFrom = moment(dateRange.from).get('month');
    const _stIndex = Math.max(
      moment(dateRange.from)
        .set('quarter', _mFrom <= 6 ? 2 : 4)
        .endOf('quarter')
        .diff(modelStartDate, 'month'),
      _sIndex
    );
    const rlt = [];
    let tmp = 0;
    for (let i = _sIndex; i < _lIndex; i++) {
      tmp += data[i];
      if ((i - _stIndex) % 6 == 0) {
        rlt.push(tmp);
        tmp = 0;
      }
    }
    rlt.push(tmp);
    return roundArray(rlt, 1);
  }
  const _stIndex = Math.max(
    moment(dateRange.from)
      .set('quarter', 4)
      .endOf('quarter')
      .diff(modelStartDate, 'month'),
    _sIndex
  );
  const rlt = [];
  let tmp = 0;
  for (let i = _sIndex; i < _lIndex; i++) {
    tmp += data[i];
    if ((i - _stIndex) % 12 == 0) {
      rlt.push(tmp);
      tmp = 0;
    }
  }
  rlt.push(tmp);
  return roundArray(rlt, 1);
};

export const getHeaders = (
  modelStartDate: string,
  active: string,
  dateRange: { from: string; to: string },
  formater = 'YY-MMM-DD'
) => {
  const _sIndex = Math.max(
    moment(dateRange.from).diff(moment(modelStartDate), 'month'),
    0
  );
  const _lIndex =
    moment(dateRange.to).diff(moment(modelStartDate), 'month') + 1;
  const result = [];
  if (active == 'monthly') {
    result.push(['Period', 'Start date', 'End date']);
    for (let i = _sIndex; i < _lIndex; i++) {
      result.push([
        i + 1 - _sIndex,
        moment(modelStartDate)
          .add(i, 'month')
          .startOf('months')
          .format(formater),
        moment(modelStartDate).add(i, 'month').endOf('months').format(formater)
      ]);
    }
  } else if (active == 'semi_annually') {
    result.push(['Period', 'Start date', 'End date']);
    let ii = 1;
    const _mFrom = moment(dateRange.from).get('month');
    result.push([
      ii++,
      moment(dateRange.from).startOf('months').format(formater),
      moment(dateRange.from)
        .set('quarter', _mFrom < 7 ? 2 : 4)
        .endOf('quarter')
        .format(formater)
    ]);
    if (_mFrom < 7) {
      result.push([
        ii++,
        moment(dateRange.from)
          .set('quarter', 3)
          .startOf('quarter')
          .format(formater),
        moment(dateRange.from)
          .set('quarter', 4)
          .endOf('quarter')
          .format(formater)
      ]);
    }
    const _mSYear = moment(dateRange.from).get('year');
    const _mLYear = moment(dateRange.to).get('year');
    for (let i = _mSYear + 1; i < _mLYear; i++) {
      result.push([
        ii++,
        moment(dateRange.from)
          .add(i - _mSYear, 'year')
          .set('quarter', 1)
          .startOf('quarter')
          .format(formater),
        moment(dateRange.from)
          .add(i - _mSYear, 'year')
          .set('quarter', 2)
          .endOf('quarter')
          .format(formater)
      ]);
      result.push([
        ii++,
        moment(dateRange.from)
          .add(i - _mSYear, 'year')
          .set('quarter', 3)
          .startOf('quarter')
          .format(formater),
        moment(dateRange.from)
          .add(i - _mSYear, 'year')
          .set('quarter', 4)
          .endOf('quarter')
          .format(formater)
      ]);
    }

    const _mTo = moment(dateRange.to).get('month');
    if (_mTo > 6) {
      result.push([
        ii++,
        moment(dateRange.to)
          .set('quarter', 1)
          .startOf('quarter')
          .format(formater),
        moment(dateRange.to).set('quarter', 2).endOf('quarter').format(formater)
      ]);
    }
    result.push([
      ii++,
      moment(dateRange.to)
        .set('quarter', _mTo > 6 ? 2 : 4)
        .endOf('quarter')
        .format(formater),
      moment(dateRange.to).endOf('months').format(formater)
    ]);
  } else if (active == 'annualy') {
    result.push(['Period', 'Start date', 'End date']);
    let ii = 1;
    result.push([
      ii++,
      moment(dateRange.from).startOf('months').format(formater),
      moment(dateRange.from).endOf('year').format(formater)
    ]);
    const _mSYear = moment(dateRange.from).get('year');
    const _mLYear = moment(dateRange.to).get('year');
    for (let i = _mSYear + 1; i < _mLYear; i++) {
      result.push([
        ii++,
        moment(dateRange.from)
          .add(i - _mSYear, 'year')
          .startOf('year')
          .format(formater),
        moment(dateRange.from)
          .add(i - _mSYear, 'year')
          .endOf('year')
          .format(formater)
      ]);
    }
    result.push([
      ii,
      moment(dateRange.to).startOf('year').format(formater),
      moment(dateRange.to).endOf('month').format(formater)
    ]);
  }
  return result;
};
export function localeStringArray(arr: number[]) {
  const len: number = arr.length;
  const newArr: string[] = [];
  for (let i = 0; i < len; i++) {
    if (arr[i] < 0) newArr.push('(' + (-arr[i]).toLocaleString() + ')');
    else newArr.push(arr[i].toLocaleString());
  }
  return newArr;
}

export function redNumber(num: number) {
  let tempNum = '';
  if (num >= 0) tempNum = num.toLocaleString();
  else tempNum = '(' + (-num).toLocaleString() + ')';
  return tempNum;
}
