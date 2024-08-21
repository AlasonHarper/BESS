import { ICostOfAdditions } from './type';

export const DEFAULT_COST_OF_ADDITIONS = {
  land: 0,
  poolingSubstation: 37.5,
  transformers: 19.167,
  balanceOfPlant: [
    {
      duration: 8,
      value: 0
    },
    {
      duration: 2,
      value: 156698
    },
    {
      duration: 4,
      value: 298689
    }
  ],
  enterPriseValue: 150
} as ICostOfAdditions;

export const DEFAULT_BALANCE_OF_PLANT_DEPRECIATION = new Array(600).fill(0);
export const DEFAULT_TRANSFORMERSDEPRECIATION = new Array(600).fill(0);
export const DEFAULT_EV_DEPRECIATION = new Array(600).fill(0);
export const DEFAULT_VINTAGES_DEPRECIATION = new Array(600).fill(0);
export const DEFAULT_POOLING_SUBSTATION_DEPRECIATION = new Array(600).fill(0);
export const DEFAULT_CAPITALIZED_RENT_IN_CONSTRUCTION = new Array(600).fill(0);
