import {
  addZeros,
  calcVintages,
  getMonthsNumberFromModelStartDate,
  multiplyNumber,
  roundArray,
  sumArray,
  sumArrays
} from '../utils';
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
  DEFAULT_STARTING_BATTERY_ASSUMPTION,
  DEFAULT_VINTAGE
} from '../constant';
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
  IStartingBatteryAssumptions,
  IVintage
} from '../Revenue/type';
import { getActiveScenarioRevenueItems } from '../Revenue/wholesale_day_ahead';
import {
  DEFAULT_BALANCE_OF_PLANT_DEPRECIATION,
  DEFAULT_CAPITALIZED_RENT_IN_CONSTRUCTION,
  DEFAULT_COST_OF_ADDITIONS,
  DEFAULT_EV_DEPRECIATION,
  DEFAULT_POOLING_SUBSTATION_DEPRECIATION,
  DEFAULT_TRANSFORMERSDEPRECIATION,
  DEFAULT_VINTAGES_DEPRECIATION
} from './constant';
import { ICostOfAdditions } from './type';
import { calcBalanceOfPlant } from './balance_of_plant';
import { calcTransformers } from './transformers';
import { calcEnterpriseValue } from './enterprise_value';
import { calcVintagesDepreciation } from './vintages_depreciation';
import { calcPoolingSubstation } from './pooling_substation';
import { calcCapitalizedRentInConstruction } from './capitalised_rent_in_construction';
import { ILandRent } from '../Administrative costs/type';
import { DEFAULT_LAND_RENT } from '../Administrative costs/constant';

export function calcTotalDepreciation({
  // landRent = DEFAULT_LAND_RENT,
  // landSize = 75,
  // operationEndDate = '2067-12-31',
  // constructionStartDate = '2027-01-01',
  // // costOfAdditions comes from fixed~~ 7 Capex~~~7.03~7.10
  // costOfAdditions = DEFAULT_COST_OF_ADDITIONS,
  // revenueSetup = DEFAULT_REVENUE_SETUP,
  // assumptionsData = DEFAULT_REVENUE_ASSUMPTIONS_DATA,
  // detailedRevenueData = DEFAULT_DETAILED_REVENUE_DATA,
  // initialCycleData = DEFAULT_INITIAL_CYCLE_DATA,
  // initialCapacity = 1000,
  // startingAssumptionsForBatteries = DEFAULT_STARTING_BATTERY_ASSUMPTION,
  // batteryDisposals = DEFAULT_BATTERY_DISPOSAL,
  // batteryEfficiency = DEFAULT_BATTERY_EFFICIENCY,
  // batteryAugmentation = DEFAULT_BATTERY_AUGMENTATION,
  // model = 'Conservative',
  // batteryDuration = 4,
  // batteryCubes = DEFAULT_BATTERY_CUBES,
  // batteryExCubes = DEFAULT_BATTERY_EXCUBES,
  // inflationInputs = DEFAULT_INFLATION_INPUTS,
  // capexPaymentsProfile = DEFAULT_CAPEX_PAYMENTS_PROFILE,
  // capexPaymentMilestones = DEFAULT_CAPEX_PAYMENT_MILESTONES,
  // capexUEL = DEFAULT_CAPEX_UEL,
  // bessCapexForecast = DEFAULT_BESS_CAPEX_FORECAST,
  // batterySensitivity = 0,
  // operationYears = 40,
  // capexSensitivity = 0,
  // modelStartDate = '2023-01-01',
  // operationStartDate = '2028-01-01',
  // decommissioningEndDate = '2068-06-30',
  // decommissioningStartDate = '2068-01-01',
  // vintage = DEFAULT_VINTAGE,
  balanceOfPlantDepreciation = DEFAULT_BALANCE_OF_PLANT_DEPRECIATION,
  transformersDepreciation = DEFAULT_TRANSFORMERSDEPRECIATION,
  evDepreciation = DEFAULT_EV_DEPRECIATION,
  vintagesDepreciation = DEFAULT_VINTAGES_DEPRECIATION,
  poolingSubstationDepreciation = DEFAULT_POOLING_SUBSTATION_DEPRECIATION,
  capitalizedRentInConstruction = DEFAULT_CAPITALIZED_RENT_IN_CONSTRUCTION
}: {
  // costOfAdditions?: ICostOfAdditions;
  // revenueSetup?: IRevenueSetup;
  // assumptionsData?: IAssumptionData[];
  // detailedRevenueData?: IDetailedRevenueData[];
  // initialCycleData?: ICycleData[];
  // initialCapacity?: number;
  // startingAssumptionsForBatteries?: IStartingBatteryAssumptions;
  // batteryDisposals?: IBatteryDisposal;
  // batteryEfficiency?: IBatteryEfficiency;
  // batteryAugmentation?: IBatteryAugmentation;
  // model?: string;
  // batteryDuration?: number;
  // batteryCubes?: IBatteryCubes;
  // batteryExCubes?: IBatteryExcubes;
  // inflationInputs?: IInflationForm[];
  // capexPaymentsProfile?: ICapexPaymentForm[];
  // capexPaymentMilestones?: ICapexPaymentMilestoneForm[];
  // capexUEL?: ICapexUELForm[];
  // bessCapexForecast?: IBessCapexForecast;
  // batterySensitivity?: number;
  // capexSensitivity?: number;
  // operationYears?: number;
  // modelStartDate?: string;
  // operationStartDate?: string;
  // landRent?: ILandRent;
  // landSize?: number;
  // operationEndDate?: string;
  // constructionStartDate?: string;
  // decommissioningEndDate?: string;
  // decommissioningStartDate?: string;
  // vintage?: IVintage;
  balanceOfPlantDepreciation?: number[];
  transformersDepreciation?: number[];
  evDepreciation?: number[];
  vintagesDepreciation?: number[];
  poolingSubstationDepreciation?: number[];
  capitalizedRentInConstruction?: number[];
}) {
  // const depForBalanceOfPlant = calcBalanceOfPlant({
  //   capexUEL,
  //   // costOfAdditions comes from fixed~~ 7 Capex~~~7.03~7.10
  //   costOfAdditions,
  //   batteryDuration,
  //   capexSensitivity,
  //   operationStartDate,
  //   modelStartDate,
  //   decommissioningEndDate
  // });
  // const depForTransformers = calcTransformers({
  //   capexUEL,
  //   // costOfAdditions comes from fixed~~ 7 Capex~~~7.03~7.10
  //   costOfAdditions,
  //   batteryDuration,
  //   capexSensitivity,
  //   operationStartDate,
  //   modelStartDate,
  //   decommissioningEndDate
  // });
  // const depForEnterpriseValue = calcEnterpriseValue({
  //   capexUEL,
  //   // costOfAdditions comes from fixed~~ 7 Capex~~~7.03~7.10
  //   costOfAdditions,
  //   batteryDuration,
  //   capexSensitivity,
  //   operationStartDate,
  //   modelStartDate,
  //   decommissioningEndDate
  // });
  // const depForVintages = calcVintagesDepreciation({
  //   modelStartDate,
  //   decommissioningEndDate,
  //   vintage
  // });
  // const depForPoolingSubstation = calcPoolingSubstation({
  //   capexUEL,
  //   // costOfAdditions comes from fixed~~ 7 Capex~~~7.03~7.10
  //   costOfAdditions,
  //   batteryDuration,
  //   capexSensitivity,
  //   operationStartDate,
  //   modelStartDate,
  //   decommissioningEndDate
  // });
  // const depForCapitalizedRent = calcCapitalizedRentInConstruction({
  //   capexUEL,
  //   operationStartDate,
  //   modelStartDate,
  //   landRent,
  //   landSize,
  //   initialCapacity,
  //   inflationInputs,
  //   operationEndDate,
  //   decommissioningStartDate,
  //   decommissioningEndDate,
  //   constructionStartDate
  // });

  const totalDepreciation: number[] = sumArrays(
    balanceOfPlantDepreciation,
    evDepreciation,
    poolingSubstationDepreciation,
    transformersDepreciation,
    capitalizedRentInConstruction,
    multiplyNumber(vintagesDepreciation, -1)
  );
  return roundArray(totalDepreciation, 3);
}
