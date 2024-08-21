export interface ICostOfAdditions {
  land: number;
  poolingSubstation: number;
  transformers: number;
  balanceOfPlant: {
    duration: number;
    value: number;
  }[];
  enterPriseValue: number;
}
