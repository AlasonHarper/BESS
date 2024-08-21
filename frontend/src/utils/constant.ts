import moment from 'moment';
import { paramGetAsync } from '../store/slices/parameterSlice';
import { IInputParameter } from './types';
import { title } from 'process';
import { number } from 'prop-types';

export const INPUT_TYPE_FIXED = 'I_FIXED';
export const INPUT_TYPE_TIMING = 'I_TIMING';
export const INPUT_TYPE_SETUP = 'SETUP';

export const INPUT_TYPES = {};
export const INFLATION_START_YEAR = 2021;
export const MODEL_START_YEAR = 2023;
export const TNUOS_DATA_START_YEAR = 2023;
// export const DNO_DATA = [{}]

export const LOCAL_CIRCUITS_ZONE: string[] = [
  `Aberarder`,
  `Aberdeen Bay`,
  `Achruach`,
  `Aigas`,
  `An Suidhe`,
  `Arecleoch`,
  `Arecleoch extension`,
  `Ayrshire grid collector`,
  `beaw field`,
  `Beinneun Wind Farm`,
  `Benbrack`,
  `Bhlaraidh Wind Farm`,
  `Black Hill`,
  `Black Law`,
  `BlackCraig Wind Farm`,
  `BlackLaw Extension`,
  `Blarghour`,
  `Branxton`,
  `Broken Cross`,
  `carrick`,
  `Chirmorie`,
  `Clash Gour`,
  `Clauchrie`,
  `Cloiche`,
  `Clyde (North)`,
  `Clyde (South)`,
  `Coalburn BESS`,
  `Coire Glas`,
  `Connagill`,
  `Corriegarth`,
  `Corriemoillie`,
  `Coryton`,
  `costa head`,
  `Craig Watch Wind Farm`,
  `CREAG RIABHACH`,
  `Cruachan`,
  `culham jet`,
  `Culligran`,
  `Cumberhead Collector`,
  `Cumberhead West`,
  `daer`,
  `Deanie`,
  `Dersalloch`,
  `Dinorwig`,
  `Dorenell`,
  `Douglas North`,
  `Dumnaglass`,
  `Dunhill`,
  `Dunlaw Extension`,
  `Edinbane`,
  `elchies`,
  `energy isles wind farm`,
  `Enoch Hill`,
  `euchanhead`,
  `Ewe Hill`,
  `Fallago`,
  `Farr`,
  `Faw Side`,
  `Fernoch`,
  `Ffestiniogg`,
  `Fife Grid Services`,
  `Finlarig`,
  `Foyers`,
  `Friston`,
  `Galawhistle`,
  `Gills Bay`,
  `Glen Kyllachy`,
  `Glen Ullinish`,
  `Glendoe`,
  `Glenglass`,
  `glenmuckloch hydro pumped storage`,
  `glenshimmeroch`,
  `Gordonbush`,
  `Greenburn`,
  `Griffin Wind`,
  `Hadyard Hill`,
  `Harestanes`,
  `Hartlepool`,
  `Heathland`,
  `hesta head`,
  `hopsrig collector`,
  `Invergarry`,
  `Kennoxhead`,
  `Kergord`,
  `Kilgallioch`,
  `Kilmarnock BESS`,
  `Kilmorack`,
  `Kings Lynn`,
  `kirkton`,
  `Kype Muir`,
  `Lairg`,
  `Langage`,
  `lethans`,
  `Limekilns`,
  `Lochay`,
  `Lorg`,
  `Luichart`,
  `Marchwood`,
  `Mark Hill`,
  `melvich`,
  `Middle Muir`,
  `Middleton`,
  `Millennium South`,
  `Millennium Wind `,
  `Mossford`,
  `mossy hill`,
  `Nant`,
  `Necton`,
  `north lowther energy initiative`,
  `old forest of ae`,
  `overhill`,
  `quantans hill`,
  `Rawhills`,
  `Rhigos`,
  `Rocksavage`,
  `ryhall`,
  `Saltend`,
  `Sandy Knowe`,
  `Sanquhar II`,
  `Scoop Hill`,
  `Shepherds rig`,
  `South Humber Bank`,
  `Spalding`,
  `stornoway wind`,
  `Stranoch`,
  `Strathbrora`,
  `Strathy`,
  `Strathy Wind`,
  `Strathy Wood`,
  `Stronelairg`,
  `teindland wind farm`,
  `troston`,
  `Wester Dod`,
  `Whitelee`,
  `Whitelee Extension`
];

export const TNUOS_ZONE_LIST: string[] = [
  `North Scotland`,
  `East Aberdeenshire`,
  `Western Highlands`,
  `Skye and Lochalsh`,
  `Eastern Grampian and Tayside`,
  `Central Grampian`,
  `Argyll`,
  `The Trossachs`,
  `Stirlingshire and Fife`,
  `South West Scotlands`,
  `Lothian and Borders`,
  `Solway and Cheviot`,
  `North East England`,
  `North Lancashire and The Lakes`,
  `South Lancashire, Yorkshire and Humber`,
  `North Midlands and North Wales`,
  `South Lincolnshire and North Norfolk`,
  `Mid Wales and The Midlands`,
  `Anglesey and Snowdon`,
  `Pembrokeshire`,
  `South Wales & Gloucester`,
  `Cotswold`,
  `Central London`,
  `Essex and Kent`,
  `Oxfordshire, Surrey and Sussex`,
  `Somerset and Wessex`,
  `West Devon and Cornwall`
];
export const LOCAL_SUBSTATION_TYPE: string[] = [
  `No redundancy & <1320 MW`,
  `Redundancy & <1320 MW`,
  `No redundancy & >=1320 MW`,
  `Redundancy & >=1320 MW`
];
export const VARIABLE_PROFILE_FOR_ATTRIBUTABLE_COSTS: string[] = [
  'Variable - Upsall central',
  'Variable - Tees',
  'Fixed profile'
];

export const INFLATION_LIST: string[] = [
  `No inflation`,
  `RPI`,
  `CPI`,
  `Tees rent high case`,
  `FES to 2050 then nil`,
  `FES constant from 2050`,
  `CPI to 2050 then nil`,
  `CPI with 2% collar and 5% cap`
];

export const REGION_LIST: string[] = [
  `Northern Scotland`,
  `Southern Scotland`,
  `Northern`,
  `North West`,
  `Yorkshire`,
  `N Wales & Mersey`,
  `East Midlands`,
  `Midlands`,
  `Eastern`,
  `South Wales`,
  `South East`,
  `London`,
  `Southern`,
  `South Western`
];

export const REGION_PARAMS: string[] = [
  'Avg. Cycles per day',
  'Capacity Market Revenues',
  'TNUoS Revenues',
  'Wholesale Day Ahead Revenues',
  'Wholesale Intraday Revenues',
  'Balancing Mechanism Revenues',
  'Frequency Response Revenues',
  'Total Revenues'
];

export const PAYMENT_PROFILE_LIST: string[] = [
  'BESS profile',
  'Tx profile',
  'Balance of Plant profile',
  'Bramley SSEN payment profile',
  'Development fee payment profile',
  'Fully consented 100% payment profile'
];

export const STRATEGY_LIST: string[] = [
  'Merchant and ancillaries',
  'Merchant only'
];

export const PARAM_TYPE = {
  TEXT: 'text',
  NUMBER: 'number',
  DATE: 'date',
  TABLE: 'table',
  GROUP: 'group',
  SWITCH: {
    EFFICIENCY: 'switch_efficiency',
    ONOFF: 'switch_onoff',
    YESNO: 'switch_yesno'
  },
  CHOICE: {
    TECH: 'choice_tech',
    CURRENCY: 'choice_currency',
    ASSET: 'choice_asset',
    REGION: 'choice_region',
    STRATEGY: 'choice_strategy',
    ACRES: 'choice_acres',
    DURATION: 'choice_duration',
    FORECAST_PROVIDER: 'choice_forecast_provider',
    INFLATION: 'choice_inflation',
    UPSIDE: 'choice_upside',
    DNO: 'choice_dno',
    // LOCALSUBSTATION: 'local_substation_type',
    SUBSTATION_TYPE: 'choice_substation_type',
    GRID_CONNECTION_VOLTAGE: 'choice_grid_connection_voltage',
    SECURITY: 'choice_security',
    ATTRIBUTABLE_SECURITY: 'choice_attributable_security',
    PAYMENT_PROFILE: 'choice_payment_profile',
    FORECAST: 'choice_forecast',
    TNUOS_ZONE_LIST: 'choice_tnuos_zone_list',
    LOCAL_CIRCUITS_ZONE: 'choice_local_circuits_zone'
  }
};

export const SWITCH_DATA = {
  [PARAM_TYPE.SWITCH.EFFICIENCY]: {
    FIXED: { id: 0, label: 'Fixed' },
    FORECAST: { id: 1, label: 'Forecaset' }
  },
  [PARAM_TYPE.SWITCH.ONOFF]: {
    OFF: { id: 0, label: 'Off' },
    ON: { id: 1, label: 'On' }
  },
  [PARAM_TYPE.SWITCH.YESNO]: {
    NO: { id: 0, label: 'No' },
    YES: { id: 1, label: 'Yes' }
  }
};

export const CHOICE_DATA: Record<
  string,
  { id: number; label: string | number; disabled?: boolean }[]
> = {
  [PARAM_TYPE.CHOICE.ASSET]: [
    { id: 1, label: 'EP1 - Upsall Central (Hag Lane) - base case' },
    { id: 2, label: '[spare] - base case' }
  ],
  [PARAM_TYPE.CHOICE.FORECAST]: [
    { id: 1, label: 'Conservative' },
    { id: 2, label: 'Moderate' },
    { id: 3, label: 'Advanced' }
  ],
  [PARAM_TYPE.CHOICE.TNUOS_ZONE_LIST]: TNUOS_ZONE_LIST.map((t, index) => ({
    id: index + 1,
    label: t
  })),
  [PARAM_TYPE.CHOICE.LOCAL_CIRCUITS_ZONE]: LOCAL_CIRCUITS_ZONE.map(
    (t, index) => ({
      id: index + 1,
      label: t
    })
  ),
  [PARAM_TYPE.CHOICE.SUBSTATION_TYPE]: LOCAL_SUBSTATION_TYPE.map(
    (t, index) => ({
      id: index + 1,
      label: t
    })
  ),

  [PARAM_TYPE.CHOICE.ATTRIBUTABLE_SECURITY]:
    VARIABLE_PROFILE_FOR_ATTRIBUTABLE_COSTS.map((pr, index) => ({
      id: index + 1,
      label: pr
    })),
  [PARAM_TYPE.CHOICE.SECURITY]: [
    { id: 1, label: 'Letter of credit' },
    { id: 2, label: 'Parent Company Guarnatee' },
    { id: 3, label: 'Bond' },
    { id: 4, label: 'Escrow account' }
  ],
  [PARAM_TYPE.CHOICE.PAYMENT_PROFILE]: [
    { id: 1, label: 'BESS profile' },
    { id: 2, label: 'Tx profile' },
    { id: 3, label: 'Balance of Plant profile' },
    { id: 4, label: 'Bramley SSEN payment profile' },
    { id: 5, label: 'Development fee payment profile' },
    { id: 6, label: 'Fully consented 100% payment profile' }
  ],
  [PARAM_TYPE.CHOICE.CURRENCY]: [
    { id: 1, label: 'GBP' },
    { id: 2, label: 'EUR' },
    { id: 3, label: 'USD' }
  ],
  [PARAM_TYPE.CHOICE.UPSIDE]: [
    { id: 1, label: 'Upside value at P90' },
    { id: 2, label: 'Upside value at P50' },
    { id: 3, label: 'Upside value at P25' },
    { id: 4, label: 'Upside value at P10' }
  ],
  [PARAM_TYPE.CHOICE.GRID_CONNECTION_VOLTAGE]: [
    { id: 1, label: '<132 kV' },
    { id: 2, label: '132 kV' },
    { id: 3, label: '275 kV' },
    { id: 4, label: '400 kV' }
  ],
  [PARAM_TYPE.CHOICE.UPSIDE]: [
    { id: 1, label: 'Upside value at P90' },
    { id: 2, label: 'Upside value at P50' },
    { id: 3, label: 'Upside value at P25' },
    { id: 4, label: 'Upside value at P10' }
  ],
  [PARAM_TYPE.CHOICE.DNO]: REGION_LIST.map((r, index) => ({
    id: index + 1,
    label: r
  })),
  [PARAM_TYPE.CHOICE.STRATEGY]: STRATEGY_LIST.map((r, index) => ({
    id: index + 1,
    label: r
  })),
  [PARAM_TYPE.CHOICE.TECH]: [
    { id: 1, label: 'BESS' },
    { id: 2, label: 'Substation', disabled: true },
    { id: 3, label: 'Solar', disabled: true },
    { id: 4, label: 'Onshore wind', disabled: true },
    { id: 5, label: 'Offshore wind', disabled: true },
    { id: 6, label: 'Ev charging', disabled: true }
  ],
  [PARAM_TYPE.CHOICE.REGION]: REGION_LIST.map((r, index) => ({
    id: index + 1,
    label: r
  })),
  [PARAM_TYPE.CHOICE.FORECAST_PROVIDER]: [
    { id: 1, label: 'Modo' },
    { id: 2, label: 'Afry' },
    { id: 3, label: 'Bringa' }
  ],
  [PARAM_TYPE.CHOICE.ACRES]: [{ id: 1, label: 75 }],
  [PARAM_TYPE.CHOICE.DURATION]: [
    { id: 1, label: 2 },
    { id: 2, label: 4 },
    { id: 3, label: 8 }
  ],
  [PARAM_TYPE.CHOICE.INFLATION]: INFLATION_LIST.map((i, index) => ({
    id: index + 1,
    label: i
  }))
};

export const PARAM_UNIT = {
  MW: {
    id: 'mw',
    label: 'MW'
  },
  DATE: {
    id: 'date',
    label: 'Date'
  },
  ACRES: {
    id: 'acres',
    label: 'Acres'
  },
  DAYS: {
    id: 'days',
    label: 'Days'
  },
  MONTH: {
    id: 'month',
    label: 'Month'
  },
  MONTHS: {
    id: 'months',
    label: 'Months'
  },
  YEAR: {
    id: 'year',
    label: 'Year'
  },
  YEARS: {
    id: 'years',
    label: 'Years'
  },
  HOUR: {
    id: 'hour',
    label: 'Hours'
  },
  PERCENTAGE: {
    id: 'percentage',
    label: '%'
  },
  PERCENTAGE_PA: {
    id: 'percentage_pa',
    label: '% p.a'
  },
  MWH: {
    id: 'mwh',
    label: 'MWh'
  },
  GBP_PER_MWH: {
    id: 'gbp_per_mwh',
    label: '£/MWh'
  },
  GBP_PER_KW_YEAR: {
    id: 'gbp_per_kwy',
    label: '£/kW/year'
  },
  GBP_PRO_1000: {
    id: 'gbp_pro_1000',
    label: "£'000"
  },
  GBP_PRO_1000_PER_MW: {
    id: 'gbp_pro_1000_per_mw',
    label: "£'000/MW"
  },
  GBP_PRO_1000_PER_KM: {
    id: 'gbp_pro_1000_per_km',
    label: "£'000/km"
  },
  KM: {
    id: 'km',
    label: 'km'
  },
  KW_PER_HOUR: {
    id: 'kw_per_hour',
    label: 'kW/hr'
  },
  EUR: {
    id: 'eur',
    label: '€'
  },
  GBP: {
    id: 'gbp',
    label: '£'
  },
  USD: {
    id: 'usd',
    label: '$'
  },
  GBP_PER_GBP: {
    id: 'gbp_per_gbp',
    label: '£/£'
  },
  EUR_PER_GBP: {
    id: 'eur_per_gbp',
    label: '€/£'
  },
  USD_PER_GBP: {
    id: 'usd_per_gbp',
    label: '$/£'
  }
};

export interface ICurrency {
  id: 'usd' | 'eur' | 'gbp';
  unit: { id: string; label: string };
  label: 'USD' | 'EUR' | 'GBP';
}

export const CURRENCY_LIST: ICurrency[] = [
  { id: 'usd', unit: PARAM_UNIT.USD, label: 'USD' },
  { id: 'eur', unit: PARAM_UNIT.EUR, label: 'EUR' },
  { id: 'gbp', unit: PARAM_UNIT.GBP, label: 'GBP' }
];

export const TABLE_SETTING = {};

export const defaultCurrency = CURRENCY_LIST[2];

export const FIXED_PARAMETERS = [
  {
    id: '1',
    category: 'Project inputs',
    sub_categories: [
      {
        id: '1.01',
        title: 'Asset selection',
        values: [
          {
            title: 'Asset number',
            type: PARAM_TYPE.CHOICE.ASSET,
            defaultValue: 1
          }
        ]
      },
      {
        id: '1.02',
        title: 'Technology, sizing and timing',
        values: [
          {
            title: 'Technology',
            type: PARAM_TYPE.CHOICE.TECH,
            defaultValue: CHOICE_DATA[PARAM_TYPE.CHOICE.TECH][0].id
          },
          {
            title: 'Grid connection capacity',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.MW,
            defaultValue: 1000
          },
          {
            title: 'Grid connection date',
            type: PARAM_TYPE.DATE,
            unit: PARAM_UNIT.DATE,
            defaultValue: '2028-1-1'
          },
          {
            title: 'Investor closing date',
            type: PARAM_TYPE.DATE,
            unit: PARAM_UNIT.DATE,
            defaultValue: '2024-1-1'
          },
          {
            title: 'Land secured date',
            type: PARAM_TYPE.DATE,
            unit: PARAM_UNIT.DATE,

            defaultValue: '2024-5-5'
          },
          {
            title: 'Grid secured date (offer accepted)',
            type: PARAM_TYPE.DATE,
            unit: PARAM_UNIT.DATE,

            defaultValue: '2024-1-2'
          },
          {
            title: 'Closing of debt agreement date',
            type: PARAM_TYPE.DATE,
            unit: PARAM_UNIT.DATE,
            defaultValue: '2024-9-1'
          },
          {
            title: 'Region',
            type: PARAM_TYPE.CHOICE.REGION,
            defaultValue: CHOICE_DATA[PARAM_TYPE.CHOICE.REGION][0].id
          },
          {
            title: 'Land size',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.ACRES,
            defaultValue: 75
          },
          {
            title: 'Development start date',
            type: PARAM_TYPE.DATE,
            unit: PARAM_UNIT.DATE,
            defaultValue: '2023-7-1'
          },
          {
            title:
              'Time between development start date and planning permission granted',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.MONTHS,
            defaultValue: 16
          },
          {
            title: 'Planning permission granted date',
            type: PARAM_TYPE.DATE,
            defaultValue: '2024-11-1'
          },
          {
            title: 'Fully consented',
            type: PARAM_TYPE.DATE,
            defaultValue: '2024-11-1'
          },
          {
            title: 'Time between planning permission granted and RtB',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.MONTH,
            defaultValue: 6
          },
          {
            title: 'RtB date',
            type: PARAM_TYPE.DATE,
            defaultValue: '2025-5-1'
          },
          {
            title: 'Construction start date',
            type: PARAM_TYPE.DATE,
            defaultValue: '2027-1-1'
          },
          {
            title: 'Length of construction',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.MONTH,
            defaultValue: 12
          },
          {
            title: 'COD and operating start date',
            type: PARAM_TYPE.DATE,
            defaultValue: '2028-1-1'
          },
          {
            title: 'Length of operations',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.MONTH,
            defaultValue: 480
          },
          {
            title: 'End of operations',
            type: PARAM_TYPE.DATE,
            defaultValue: '2067-12-31'
          },
          {
            title: 'Decommissioning start date',
            type: PARAM_TYPE.DATE,
            defaultValue: '2068-1-1'
          },
          {
            title: 'Length of decommissioning',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.MONTH,
            defaultValue: 6
          },
          {
            title: 'End of decommissioning',
            type: PARAM_TYPE.DATE,
            defaultValue: '2068-6-30'
          },
          {
            title: 'Alert if construction start before RtB',
            type: PARAM_TYPE.TEXT
          }
        ]
      }
    ]
  }
  // {
  //   id: '2',
  //   category: 'Battery assumptions',
  //   sub_categories: [
  //     {
  //       id: '2.01',
  //       title: 'Starting assumptions for batteries',
  //       values: [
  //         {
  //           title: 'Degradation forecast selection',
  //           type: PARAM_TYPE.NUMBER,
  //           defaultValue: 1.25,
  //           maxValue: 2,
  //           minValue: 1
  //         },
  //         {
  //           title: 'Battery availability',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE,
  //           defaultValue: 97,
  //           maxValue: 100,
  //           minValue: 0
  //         },
  //         {
  //           title: 'Battery duration',
  //           type: PARAM_TYPE.CHOICE.DURATION,
  //           unit: PARAM_UNIT.HOUR,
  //           defaultValue: CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][1].id
  //         },
  //         {
  //           title: 'Battery match',
  //           type: PARAM_TYPE.NUMBER,
  //           defaultValue: CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION][1].id
  //         }
  //       ]
  //     },
  //     {
  //       id: '2.02',
  //       title: 'Efficiency',
  //       values: [
  //         {
  //           title: 'Switch for fixed or forecast',
  //           type: PARAM_TYPE.SWITCH.EFFICIENCY,
  //           defaultValue: 1
  //         },
  //         {
  //           title: 'Fixed battery efficiency',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE,
  //           defaultValue: 0,
  //           minValue: 0,
  //           maxValue: 100
  //         }
  //       ]
  //     },
  //     {
  //       id: '2.03',
  //       title: 'Battery disposals',
  //       values: [
  //         {
  //           title: 'Battery disposals switch',
  //           type: PARAM_TYPE.SWITCH.ONOFF,
  //           defaultValue: 1
  //         },
  //         {
  //           title: 'Disposed of when energy retention reaches',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE,
  //           defaultValue: 70,
  //           minValue: 0,
  //           maxValue: 100
  //         },
  //         {
  //           title: 'Recycle price as a percent of new batteries',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE,
  //           defaultValue: 15,
  //           minValue: 0,
  //           maxValue: 100
  //         }
  //       ]
  //     },
  //     {
  //       id: '2.04',
  //       title: 'Battery augmentation',
  //       values: [
  //         {
  //           title: 'Battery augmentation switch',
  //           type: PARAM_TYPE.SWITCH.ONOFF,
  //           defaultValue: 1
  //         },
  //         {
  //           title:
  //             'Number of months before end of operations to stop augmentation and disposals',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.MONTH,
  //           defaultValue: 120
  //         }
  //       ]
  //     },
  //     {
  //       id: '2.05',
  //       title: 'BESS expansion',
  //       values: [
  //         {
  //           title: 'Stage 1',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE,
  //           defaultValue: 100,
  //           minValue: 0,
  //           maxValue: 100
  //         },
  //         {
  //           title: 'Stage 2',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE,
  //           defaultValue: 0,
  //           minValue: 0,
  //           maxValue: 100
  //         },
  //         {
  //           title: 'Stage 3',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE,
  //           defaultValue: 0,
  //           minValue: 0,
  //           maxValue: 100
  //         },
  //         {
  //           title: 'Stage 4',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE,
  //           defaultValue: 0,
  //           minValue: 0,
  //           maxValue: 100
  //         },
  //         {
  //           title: 'Stage 5',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE,
  //           defaultValue: 0,
  //           minValue: 0,
  //           maxValue: 100
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: '3',
  //   category: 'Revenue',
  //   sub_categories: [
  //     {
  //       id: '3.01',
  //       title: 'Setup',
  //       values: [
  //         {
  //           title: 'Forecast provider choice',
  //           type: PARAM_TYPE.CHOICE.FORECAST_PROVIDER,
  //           defaultValue: CHOICE_DATA[PARAM_TYPE.CHOICE.FORECAST_PROVIDER][0].id
  //         },
  //         {
  //           title: 'Match provider',
  //           type: PARAM_TYPE.NUMBER,
  //           defaultValue: 3
  //         },
  //         {
  //           title: 'Inflation',
  //           type: PARAM_TYPE.CHOICE.INFLATION,
  //           defaultValue: CHOICE_DATA[PARAM_TYPE.CHOICE.INFLATION][11].id
  //         },
  //         {
  //           title: 'Base year',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.MONTH,
  //           defaultValue: 0
  //         }
  //       ]
  //     },
  //     {
  //       id: '3.02',
  //       title: 'Modo',
  //       values: [
  //         {
  //           title: 'Efficiency',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Inflation',
  //           type: PARAM_TYPE.CHOICE.INFLATION
  //         },
  //         {
  //           title: 'Base year',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEAR
  //         },
  //         { title: 'Region', type: PARAM_TYPE.CHOICE.REGION },
  //         { title: 'Trading strategy', type: PARAM_TYPE.CHOICE.STRATEGY }
  //       ]
  //     },
  //     {
  //       id: '3.03',
  //       title: 'Afry',
  //       values: [
  //         {
  //           title: 'Efficiency',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Inflation',
  //           type: PARAM_TYPE.CHOICE.INFLATION
  //         },
  //         {
  //           title: 'Base year',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEAR
  //         },
  //         { title: 'Region', type: PARAM_TYPE.CHOICE.REGION },
  //         { title: 'Trading strategy', type: PARAM_TYPE.CHOICE.STRATEGY }
  //       ]
  //     },
  //     {
  //       id: '3.04',
  //       title: 'Baringa',
  //       values: [
  //         {
  //           title: 'Efficiency',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Inflation',
  //           type: PARAM_TYPE.CHOICE.INFLATION
  //         },
  //         {
  //           title: 'Base year',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEAR
  //         },
  //         { title: 'Region', type: PARAM_TYPE.CHOICE.REGION },
  //         { title: 'Trading strategy', type: PARAM_TYPE.CHOICE.STRATEGY }
  //       ]
  //     },
  //     {
  //       id: '3.05',
  //       title: 'PPA',
  //       values: [
  //         {
  //           title: 'No PPA',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Fixed PPA',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Floating PPA',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         }
  //       ]
  //     },
  //     {
  //       id: '3.05-1',
  //       title: 'PPA-Fixed',
  //       values: [
  //         {
  //           title: 'Fixed PPA start date 1',
  //           type: PARAM_TYPE.DATE
  //         },
  //         {
  //           title: 'Fixed PPA end date 1',
  //           type: PARAM_TYPE.DATE
  //         },
  //         {
  //           title: 'Fixed PPA start date 2',
  //           type: PARAM_TYPE.DATE
  //         },
  //         {
  //           title: 'Fixed PPA end date 2',
  //           type: PARAM_TYPE.DATE
  //         },
  //         {
  //           title: 'Fixed PPA price period 1',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PER_MWH
  //         },
  //         {
  //           title: 'Fixed PPA price period 2',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PER_MWH
  //         }
  //       ]
  //     },
  //     {
  //       id: '3.05-2',
  //       title: 'PPA-Floating',
  //       values: [
  //         {
  //           title: 'Floating PPA start date 1',
  //           type: PARAM_TYPE.DATE
  //         },
  //         {
  //           title: 'Floating PPA end date 1',
  //           type: PARAM_TYPE.DATE
  //         },
  //         {
  //           title: 'Floating PPA start date 2',
  //           type: PARAM_TYPE.DATE
  //         },
  //         {
  //           title: 'Floating PPA end date 2',
  //           type: PARAM_TYPE.DATE
  //         },
  //         {
  //           title: 'Floating Discount to wholesale price for margin',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         }
  //       ]
  //     },
  //     {
  //       id: '3.06-1',
  //       title: 'Revenue switches-Setup',
  //       values: [
  //         {
  //           title: 'PPA revenue at fixed price',
  //           type: PARAM_TYPE.SWITCH.ONOFF
  //         },
  //         {
  //           title: 'PPA revenue at floating price',
  //           type: PARAM_TYPE.SWITCH.ONOFF
  //         },
  //         {
  //           title: 'TNUoS - triads income',
  //           type: PARAM_TYPE.SWITCH.ONOFF
  //         },
  //         {
  //           title: 'REGO',
  //           type: PARAM_TYPE.SWITCH.ONOFF
  //         },
  //         {
  //           title: 'CfD',
  //           type: PARAM_TYPE.SWITCH.ONOFF
  //         },
  //         {
  //           title: 'Gain/(loss) on disposal of batteries',
  //           type: PARAM_TYPE.SWITCH.ONOFF
  //         }
  //       ]
  //     },
  //     {
  //       id: '3.06-2',
  //       title: 'Revenue switches-Switches',
  //       values: [
  //         {
  //           title: 'PPA revenue at fixed price',
  //           type: PARAM_TYPE.SWITCH.ONOFF
  //         },
  //         {
  //           title: 'PPA revenue at floating price',
  //           type: PARAM_TYPE.SWITCH.ONOFF
  //         },
  //         {
  //           title: 'TNUoS - triads income',
  //           type: PARAM_TYPE.SWITCH.ONOFF
  //         },
  //         {
  //           title: 'REGO',
  //           type: PARAM_TYPE.SWITCH.ONOFF
  //         },
  //         {
  //           title: 'CfD',
  //           type: PARAM_TYPE.SWITCH.ONOFF
  //         },
  //         {
  //           title: 'Gain/(loss) on disposal of batteries',
  //           type: PARAM_TYPE.SWITCH.ONOFF
  //         }
  //       ]
  //     },
  //     {
  //       id: '3.07',
  //       title: 'Residual value',
  //       values: [
  //         {
  //           title: 'Residual value',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: '4',
  //   category: 'Cost of sales',
  //   sub_categories: [
  //     {
  //       id: '4.01',
  //       title: 'Optmiser',
  //       values: [
  //         { title: 'Optimiser switch', type: PARAM_TYPE.SWITCH.ONOFF },
  //         {
  //           title: "Optimiser's commission of revenue",
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Floor start date',
  //           type: PARAM_TYPE.DATE
  //         },
  //         {
  //           title: 'Floor end date',
  //           type: PARAM_TYPE.DATE
  //         },
  //         {
  //           title: 'Floor price',
  //           type: PARAM_TYPE.DATE,
  //           unit: PARAM_UNIT.GBP_PER_KW_YEAR
  //         },
  //         {
  //           title: 'Upside value case',
  //           type: PARAM_TYPE.CHOICE.UPSIDE
  //         },
  //         {
  //           title: 'Upside value at P90',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Upside value at P50',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Upside value at P25',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Upside value at P10',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         }
  //       ]
  //     },
  //     {
  //       id: '4.02',
  //       title: 'PPA fees',
  //       values: [
  //         {
  //           title: 'PPA fee as a percent of revenue',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         }
  //       ]
  //     },
  //     {
  //       id: '4.03',
  //       title: 'Auxiliary losses',
  //       values: [
  //         {
  //           title: 'Battery duration match'
  //         },
  //         {
  //           title: 'Auxiliary loss factor - active',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.KW_PER_HOUR
  //         },
  //         {
  //           title: 'Auxiliary loss factor - 2 hour system',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.KW_PER_HOUR
  //         },
  //         {
  //           title: 'Auxiliary loss factor - 4 hour system',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.KW_PER_HOUR
  //         },
  //         {
  //           title: 'Auxiliary loss factor - 8 hour system',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.KW_PER_HOUR
  //         },
  //         {
  //           title: 'Auxiliary loesses inflation profile',
  //           type: PARAM_TYPE.CHOICE.INFLATION
  //         },
  //         {
  //           title: 'Auxiliary loesses base year',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEAR
  //         }
  //       ]
  //     },
  //     {
  //       id: '4.04',
  //       title: 'Metering',
  //       values: [
  //         {
  //           title: 'Battery duration match'
  //         },
  //         {
  //           title: 'Auxiliary loss factor - active',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.KW_PER_HOUR
  //         },
  //         {
  //           title: 'Auxiliary loss factor - 2 hour system',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.KW_PER_HOUR
  //         },
  //         {
  //           title: 'Auxiliary loss factor - 4 hour system',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.KW_PER_HOUR
  //         },
  //         {
  //           title: 'Auxiliary loss factor - 8 hour system',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.KW_PER_HOUR
  //         },
  //         {
  //           title: 'Auxiliary loesses inflation profile',
  //           type: PARAM_TYPE.CHOICE.INFLATION
  //         },
  //         {
  //           title: 'Auxiliary loesses base year',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEAR
  //         }
  //       ]
  //     },
  //     {
  //       id: '4.05',
  //       title: 'DUoS charges',
  //       values: [
  //         {
  //           title: 'Battery duration match'
  //         },
  //         {
  //           title: 'Distribution connection',
  //           type: PARAM_TYPE.SWITCH.YESNO
  //         },
  //         {
  //           title: 'DNO',
  //           type: PARAM_TYPE.CHOICE.DNO
  //         },
  //         {
  //           title: 'Number of metering points'
  //         },
  //         {
  //           title: 'DUoS inflation profile',
  //           type: PARAM_TYPE.CHOICE.INFLATION
  //         },
  //         {
  //           title: 'DUoS base year',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEAR
  //         }
  //       ]
  //     },
  //     {
  //       id: '4.06-1',
  //       title: 'TNUoS-Triad charges',
  //       values: [
  //         {
  //           title: 'TNUoS charges unavoidable switch',
  //           type: PARAM_TYPE.SWITCH.YESNO
  //         },
  //         {
  //           title: 'Anticipated export during triads as a % of grid connection',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Portion of triads expected November',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Portion of triads expected December',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Portion of triads expected January',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Portion of triads expected February',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         }
  //       ]
  //     },
  //     {
  //       id: '4.06-2',
  //       title: 'TNUoS-Export charges',
  //       values: [
  //         {
  //           title: 'Transmission connection',
  //           type: PARAM_TYPE.SWITCH.YESNO
  //         },
  //         {
  //           title: 'TNUoS zone'
  //         },
  //         {
  //           title: 'Local circuits'
  //         },
  //         {
  //           title: 'Local substration type',
  //           type: PARAM_TYPE.CHOICE.SUBSTRATION_TYPE
  //         },
  //         {
  //           title: 'Grid connection voltage',
  //           type: PARAM_TYPE.CHOICE.GRID_CONNECTION_VOLTAGE
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: '5',
  //   category: 'Administrative costs',
  //   sub_categories: [
  //     {
  //       id: '5.01-1',
  //       title: 'Switch',
  //       values: [{ title: 'Land rent switch', type: PARAM_TYPE.SWITCH.ONOFF }]
  //     },
  //     {
  //       id: '5.01-2',
  //       title: 'Annual land rent',
  //       values: [
  //         {
  //           title: 'Annual land rent per acre charge',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
  //         },
  //         {
  //           title: 'Portion payable during construction',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Portion payable during operations',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Portion payable during decommisioning',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         }
  //       ]
  //     },

  //     {
  //       id: '5.01-3',
  //       title: 'Bespoke cases - capacity charge',
  //       values: [
  //         {
  //           title: 'Annual land rent per MW charge',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
  //         },
  //         {
  //           title: 'Portion payable during construction',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Portion payable during operations',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Portion payable during decommisioning',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         }
  //       ]
  //     },
  //     {
  //       id: '5.01-4',
  //       title: 'Bespoke cases - land rent per acre and option charge',
  //       values: [
  //         {
  //           title: 'Annual land rent per acre charge',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
  //         },
  //         {
  //           title: 'Portion payable during construction',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Portion payable during operations',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Portion payable during decommisioning',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         }
  //       ]
  //     },
  //     {
  //       id: '5.01-5',
  //       title: 'Inflation',
  //       values: [
  //         {
  //           title: 'Inflation profile- Land rent',
  //           type: PARAM_TYPE.CHOICE.INFLATION
  //         },
  //         {
  //           title: 'Base year - Land rent',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEAR
  //         }
  //       ]
  //     },
  //     {
  //       id: '5.02-1',
  //       title: 'O&M - Fixed',
  //       values: [
  //         {
  //           title: 'Battery duration match'
  //         },
  //         {
  //           title: 'Annual Fixed O&M - live selection',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Annual Fixed O&M - 2 hour system',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Annual Fixed O&M - 4 hour system',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Annual Fixed O&M - 8 hour system',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Inflation profile - Fixed O&M',
  //           type: PARAM_TYPE.CHOICE.INFLATION
  //         },
  //         {
  //           title: 'Base year- Fixed O&M',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEAR
  //         }
  //       ]
  //     },
  //     {
  //       id: '5.02-2',
  //       title: 'O&M - Variable',
  //       values: [
  //         {
  //           title: 'Battery duration match'
  //         },
  //         {
  //           title: 'Variable Fixed O&M - live selection',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Variable Fixed O&M - 2 hour system',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Variable Fixed O&M - 4 hour system',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Variable Fixed O&M - 8 hour system',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Inflation profile - Variable O&M',
  //           type: PARAM_TYPE.CHOICE.INFLATION
  //         },
  //         {
  //           title: 'Base year- Variable O&M',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEAR
  //         }
  //       ]
  //     },
  //     {
  //       id: '5.03-1',
  //       title: 'Asset management - Inflation profile',
  //       values: [
  //         {
  //           title: 'Inflation profile-period 1',
  //           type: PARAM_TYPE.CHOICE.INFLATION
  //         },
  //         {
  //           title: 'Base year - period 1',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEAR
  //         },
  //         {
  //           title: 'Inflation profile-period 2',
  //           type: PARAM_TYPE.CHOICE.INFLATION
  //         },
  //         {
  //           title: 'Base year - period 2',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEAR
  //         }
  //       ]
  //     },
  //     {
  //       id: '5.03-2',
  //       title: 'Asset management - Duration',
  //       values: [
  //         {
  //           title: 'Start date - period 1',
  //           type: PARAM_TYPE.DATE
  //         },
  //         {
  //           title: 'End date - period 1',
  //           type: PARAM_TYPE.DATE
  //         },
  //         {
  //           title: 'Start date - period 2',
  //           type: PARAM_TYPE.DATE
  //         },
  //         {
  //           title: 'End date - period 2',
  //           type: PARAM_TYPE.DATE
  //         }
  //       ]
  //     },
  //     {
  //       id: '5.03-3',
  //       title: 'Asset management - Fees as a % of renenue',
  //       values: [
  //         {
  //           title: 'Real time management - period 1',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Maintenance - period 1',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Fees as a % of revenue - period 1',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Real time management - period 2',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Maintenance - period 2',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Fees as a % of revenue - period 2',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         }
  //       ]
  //     },
  //     {
  //       id: '5.03-4',
  //       title: 'Asset management - Fees per MW',
  //       values: [
  //         {
  //           title: 'Real time management - period 1',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Maintenance - period 1',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Fees per MW - period 1',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Real time management - period 2',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Maintenance - period 2',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Fees per MW - period 2',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
  //         }
  //       ]
  //     },
  //     {
  //       id: '5.04',
  //       title: 'Insurance',
  //       values: [
  //         {
  //           title: 'Inflation profile - operations',
  //           type: PARAM_TYPE.CHOICE.INFLATION
  //         },
  //         {
  //           title: 'Base year - operations',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEAR
  //         },
  //         {
  //           title: 'Annual fees per MW - operations',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
  //         }
  //       ]
  //     },
  //     {
  //       id: '5.05',
  //       title: 'Community benefit',
  //       values: [
  //         {
  //           title: 'Inflation profile - community benefit',
  //           type: PARAM_TYPE.CHOICE.INFLATION
  //         },
  //         {
  //           title: 'Base year - Community benefit',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEAR
  //         },
  //         {
  //           title: 'Annual fixed fund to community benefit',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Annual MWh to community benefit',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.MWH
  //         }
  //       ]
  //     },
  //     {
  //       id: '5.06',
  //       title: 'Water rates',
  //       values: [
  //         {
  //           title: 'Inflation profile - Water rates',
  //           type: PARAM_TYPE.CHOICE.INFLATION
  //         },
  //         {
  //           title: 'Base year - Water rates',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEAR
  //         },
  //         {
  //           title: 'Annual fees per MW',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
  //         }
  //       ]
  //     },
  //     {
  //       id: '5.08',
  //       title: 'Extended warranty',
  //       values: [
  //         {
  //           title: 'Extended warranty switch',
  //           type: PARAM_TYPE.SWITCH.ONOFF
  //         },
  //         {
  //           title: 'Inflation profile - Warranty',
  //           type: PARAM_TYPE.CHOICE.INFLATION
  //         },
  //         {
  //           title: 'Base year - Warranty',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEAR
  //         },
  //         {
  //           title: 'Length of warranty',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEARS
  //         },
  //         {
  //           title: 'Battery duration match'
  //         },
  //         {
  //           title: 'Annual fees per MW - live selection',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
  //         },
  //         {
  //           title: 'Annual fees per MW - 2 hour system',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
  //         },
  //         {
  //           title: 'Annual fees per MW - 4 hour system',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
  //         },
  //         {
  //           title: 'Annual fees per MW - 8 hour system',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
  //         }
  //       ]
  //     },
  //     {
  //       id: '5.09',
  //       title: 'Site security',
  //       values: [
  //         {
  //           title: 'Inflation profile - Site security',
  //           type: PARAM_TYPE.CHOICE.INFLATION
  //         },
  //         {
  //           title: 'Base year - Site security',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEAR
  //         },
  //         {
  //           title: 'Annual fees per MW',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
  //         }
  //       ]
  //     },
  //     {
  //       id: '5.10',
  //       title: 'Easement costs',
  //       values: [
  //         {
  //           title: 'Inflation profile - Easement costs',
  //           type: PARAM_TYPE.CHOICE.INFLATION
  //         },
  //         {
  //           title: 'Base year - Easement costs',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEAR
  //         },
  //         {
  //           title: 'Annual cost',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000_PER_KM
  //         },
  //         {
  //           title: 'Cable length',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.KM
  //         }
  //       ]
  //     },
  //     {
  //       id: '5.11',
  //       title: 'Legal costs',
  //       values: [
  //         {
  //           title: 'Inflation profile - Legal costs',
  //           type: PARAM_TYPE.CHOICE.INFLATION
  //         },
  //         {
  //           title: 'Base year - Legal costs',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEAR
  //         },
  //         {
  //           title: 'Annual cost',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         }
  //       ]
  //     },
  //     {
  //       id: '5.12',
  //       title: 'Other administrative costs',
  //       values: [
  //         {
  //           title: 'Inflation profile - Other administrative costs',
  //           type: PARAM_TYPE.CHOICE.INFLATION
  //         },
  //         {
  //           title: 'Base year - Other administrative costs',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEAR
  //         },
  //         {
  //           title: 'Annual accounting fees and audit',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Annual IT',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Annual other cost',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Total other cost',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         }
  //       ]
  //     },
  //     {
  //       id: '5.13',
  //       title: 'Intercompany expense',
  //       values: [
  //         {
  //           title: 'Inflation profile - intercompany expense',
  //           type: PARAM_TYPE.CHOICE.INFLATION
  //         },
  //         {
  //           title: 'Base year - intercompany expense',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEAR
  //         },
  //         {
  //           title: 'Annual cost',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: '6',
  //   category: 'Devex',
  //   sub_categories: [
  //     {
  //       id: '6.01',
  //       title: 'Devex',
  //       values: [
  //         { title: 'Devex profile' },
  //         { title: 'Devex switch', type: PARAM_TYPE.SWITCH.ONOFF }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: '7',
  //   category: 'Capex - cost of additions',
  //   sub_categories: [
  //     {
  //       id: '7.01',
  //       title: 'Currency',
  //       values: [
  //         { title: 'Land', type: PARAM_TYPE.CHOICE.CURRENCY },
  //         { title: 'Pooling substation', type: PARAM_TYPE.CHOICE.CURRENCY },
  //         { title: 'Transformers', type: PARAM_TYPE.CHOICE.CURRENCY },
  //         { title: 'Balance of Plant', type: PARAM_TYPE.CHOICE.CURRENCY },
  //         { title: '[Spare 1]', type: PARAM_TYPE.CHOICE.CURRENCY },
  //         { title: '[Spare 2]', type: PARAM_TYPE.CHOICE.CURRENCY },
  //         { title: '[Spare 3]', type: PARAM_TYPE.CHOICE.CURRENCY },
  //         { title: '[Spare 4]', type: PARAM_TYPE.CHOICE.CURRENCY },
  //         { title: '[Spare 5]', type: PARAM_TYPE.CHOICE.CURRENCY },
  //         { title: '[Spare 6]', type: PARAM_TYPE.CHOICE.CURRENCY },
  //         {
  //           title: 'Enterprise value - Development fee',
  //           type: PARAM_TYPE.CHOICE.CURRENCY
  //         }
  //       ]
  //     },
  //     {
  //       id: '7.02',
  //       title: 'Purchase cost in purchase currency',
  //       values: [
  //         {
  //           title: 'Land',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Pooling substation',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Transformers',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Balance of Plant',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: '[Spare 1]',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: '[Spare 2]',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: '[Spare 3]',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: '[Spare 4]',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: '[Spare 5]',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: '[Spare 6]',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Enterprise value - Development fee',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Vintage 1 capex',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'All vintage capex',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         }
  //       ]
  //     },
  //     {
  //       id: '7.03',
  //       title: 'Land',
  //       values: [
  //         {
  //           title: 'Land',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
  //         }
  //       ]
  //     },
  //     {
  //       id: '7.04',
  //       title: 'Pooling substation',
  //       values: [
  //         {
  //           title: 'Pooling substation',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
  //         }
  //       ]
  //     },
  //     {
  //       id: '7.05',
  //       title: 'Transformers',
  //       values: [
  //         {
  //           title: 'Transformers',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
  //         }
  //       ]
  //     },
  //     {
  //       id: '7.06',
  //       title: 'Balance of Plant - active',
  //       values: [
  //         {
  //           title: 'Battery duration match'
  //         },
  //         {
  //           title: 'Live selection',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: '2 hour system',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: '4 hour system',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: '8 hour system',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         }
  //       ]
  //     },
  //     {
  //       id: '7.07-1',
  //       title: 'Balance of Plant - 2 hour system - Balance of system',
  //       values: [
  //         {
  //           title: 'Aggregated cost',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Total',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         }
  //       ]
  //     },
  //     {
  //       id: '7.07-2',
  //       title:
  //         'Balance of Plant - 2 hour system - Electrical Infrastructure and Interconnection (excluding transformers)',
  //       values: [
  //         {
  //           title: 'Aggregated cost',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Grid connection',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Internal and control connections',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Power electronics',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Wiring and conduits',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'DC cabling',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Inverter',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Switch gear',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Energy management system',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Monitors, controls and communications',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Total',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         }
  //       ]
  //     },
  //     {
  //       id: '7.07-3',
  //       title:
  //         'Balance of Plant - 2 hour system - Generation Equipment and Infrastructure (excluding batteries - battery pack, battery container and battery management system)',
  //       values: [
  //         {
  //           title: 'Aggregated cost',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Plant construction',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Power plant equipment',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Thermal management system',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Fire supression system',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Battery racking',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Foundation for battery and inverters',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Inverter housing',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Total',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         }
  //       ]
  //     },
  //     {
  //       id: '7.07-4',
  //       title:
  //         "Balance of Plant - 2 hour system - Installation, indirect and owner's costs (excluding land lease, devex and financing)",
  //       values: [
  //         {
  //           title: 'Aggregated cost',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Enabling works',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Distributable labour and materials',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Engineering',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Start up and commisioning',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Legal costs',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Construction insurance',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Consulting and advisory',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Meters',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Power during construction(including generator hire)',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'IT, software and comms',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Water',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Total',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         }
  //       ]
  //     },
  //     {
  //       id: '7.07-5',
  //       title: 'Balance of Plant - 2 hour system - Contigency',
  //       values: [
  //         {
  //           title: 'Contigency',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         }
  //       ]
  //     },
  //     {
  //       id: '7.07-6',
  //       title: 'Balance of Plant - 2 hour system - Contigency',
  //       values: [
  //         {
  //           title: 'Contigency',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         }
  //       ]
  //     },
  //     {
  //       id: '7.07-7',
  //       title: 'Balance of Plant - 2 hour system - Total',
  //       values: [
  //         {
  //           title: 'Total',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         }
  //       ]
  //     },
  //     {
  //       id: '7.08-1',
  //       title: 'Balance of Plant - 4 hour system - Balance of system',
  //       values: [
  //         {
  //           title: 'Aggregated cost',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Total',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         }
  //       ]
  //     },
  //     {
  //       id: '7.08-2',
  //       title:
  //         'Balance of Plant - 4 hour system - Electrical Infrastructure and Interconnection (excluding transformers)',
  //       values: [
  //         {
  //           title: 'Aggregated cost',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Grid connection',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Internal and control connections',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Power electronics',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Wiring and conduits',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'DC cabling',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Inverter',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Switch gear',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Energy management system',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Monitors, controls and communications',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Total',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         }
  //       ]
  //     },
  //     {
  //       id: '7.08-3',
  //       title:
  //         'Balance of Plant - 4 hour system - Generation Equipment and Infrastructure (excluding batteries - battery pack, battery container and battery management system)',
  //       values: [
  //         {
  //           title: 'Aggregated cost',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Plant construction',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Power plant equipment',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Thermal management system',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Fire supression system',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Battery racking',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Foundation for battery and inverters',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Inverter housing',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Total',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         }
  //       ]
  //     },
  //     {
  //       id: '7.08-4',
  //       title:
  //         "Balance of Plant - 4 hour system - Installation, indirect and owner's costs (excluding land lease, devex and financing)",
  //       values: [
  //         {
  //           title: 'Aggregated cost',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Enabling works',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Distributable labour and materials',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Engineering',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Start up and commisioning',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Legal costs',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Construction insurance',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Consulting and advisory',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Meters',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Power during construction(including generator hire)',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'IT, software and comms',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Water',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Total',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         }
  //       ]
  //     },
  //     {
  //       id: '7.08-5',
  //       title: 'Balance of Plant - 4 hour system - Contigency',
  //       values: [
  //         {
  //           title: 'Contigency',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         }
  //       ]
  //     },
  //     {
  //       id: '7.08-6',
  //       title: 'Balance of Plant - 4 hour system - Contigency',
  //       values: [
  //         {
  //           title: 'Contigency',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         }
  //       ]
  //     },
  //     {
  //       id: '7.08-7',
  //       title: 'Balance of Plant - 4 hour system - Total',
  //       values: [
  //         {
  //           title: 'Total',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         }
  //       ]
  //     },
  //     {
  //       id: '7.09-1',
  //       title: 'Balance of Plant - 8 hour system - Balance of system',
  //       values: [
  //         {
  //           title: 'Aggregated cost',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Total',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         }
  //       ]
  //     },
  //     {
  //       id: '7.09-2',
  //       title:
  //         'Balance of Plant - 8 hour system - Electrical Infrastructure and Interconnection (excluding transformers)',
  //       values: [
  //         {
  //           title: 'Aggregated cost',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Grid connection',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Internal and control connections',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Power electronics',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Wiring and conduits',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'DC cabling',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Inverter',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Switch gear',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Energy management system',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Monitors, controls and communications',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Total',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         }
  //       ]
  //     },
  //     {
  //       id: '7.09-3',
  //       title:
  //         'Balance of Plant - 8 hour system - Generation Equipment and Infrastructure (excluding batteries - battery pack, battery container and battery management system)',
  //       values: [
  //         {
  //           title: 'Aggregated cost',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Plant construction',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Power plant equipment',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Thermal management system',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Fire supression system',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Battery racking',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Foundation for battery and inverters',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Inverter housing',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Total',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         }
  //       ]
  //     },
  //     {
  //       id: '7.09-4',
  //       title:
  //         "Balance of Plant - 8 hour system - Installation, indirect and owner's costs (excluding land lease, devex and financing)",
  //       values: [
  //         {
  //           title: 'Aggregated cost',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Enabling works',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Distributable labour and materials',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Engineering',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Start up and commisioning',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Legal costs',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Construction insurance',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Consulting and advisory',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Meters',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Power during construction(including generator hire)',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'IT, software and comms',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Water',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Total',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         }
  //       ]
  //     },
  //     {
  //       id: '7.09-5',
  //       title: 'Balance of Plant - 8 hour system - Contigency',
  //       values: [
  //         {
  //           title: 'Contigency',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         }
  //       ]
  //     },
  //     {
  //       id: '7.09-6',
  //       title: 'Balance of Plant - 8 hour system - Contigency',
  //       values: [
  //         {
  //           title: 'Contigency',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         }
  //       ]
  //     },
  //     {
  //       id: '7.09-7',
  //       title: 'Balance of Plant - 8 hour system - Total',
  //       values: [
  //         {
  //           title: 'Total',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: '8',
  //   category: 'Capex - other inputs',
  //   sub_categories: [
  //     {
  //       id: '8.01-1',
  //       title: 'Capex payments-Payment profile choice',
  //       values: [
  //         { title: 'Batteries', type: PARAM_TYPE.CHOICE.PAYMENT_PROFILE },
  //         { title: 'Land', type: PARAM_TYPE.CHOICE.PAYMENT_PROFILE },
  //         {
  //           title: 'Pooling substation',
  //           type: PARAM_TYPE.CHOICE.PAYMENT_PROFILE
  //         },
  //         { title: 'Transformers', type: PARAM_TYPE.CHOICE.PAYMENT_PROFILE },
  //         {
  //           title: 'Balance of Plant',
  //           type: PARAM_TYPE.CHOICE.PAYMENT_PROFILE
  //         },
  //         { title: '[Spare 1]', type: PARAM_TYPE.CHOICE.PAYMENT_PROFILE },
  //         { title: '[Spare 2]', type: PARAM_TYPE.CHOICE.PAYMENT_PROFILE },
  //         { title: '[Spare 3]', type: PARAM_TYPE.CHOICE.PAYMENT_PROFILE },
  //         { title: '[Spare 4]', type: PARAM_TYPE.CHOICE.PAYMENT_PROFILE },
  //         { title: '[Spare 5]', type: PARAM_TYPE.CHOICE.PAYMENT_PROFILE },
  //         { title: '[Spare 6]', type: PARAM_TYPE.CHOICE.PAYMENT_PROFILE },
  //         {
  //           title: 'Enterprise value - Development fee',
  //           type: PARAM_TYPE.CHOICE.PAYMENT_PROFILE
  //         }
  //       ]
  //     },
  //     {
  //       id: '8.01-2',
  //       title: 'Capex payments-Development fee payment profile',
  //       values: [
  //         {
  //           title: 'Payment % at investor closing date',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Payment % at land secured date',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Payment % at grid secured date (offer accepted)',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Payment % at closing of debt agreement date',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Payment % at fully consented',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Payment % at RtB',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Payment % at COD',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         }
  //       ]
  //     },
  //     {
  //       id: '8.02',
  //       title: 'Forecast prices',
  //       values: [{ title: 'Scenario choice', type: PARAM_TYPE.CHOICE.FORECAST }]
  //     },
  //     {
  //       id: '8.03',
  //       title: 'Useful economic life',
  //       values: [
  //         {
  //           title: 'Batteries',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEARS
  //         },
  //         { title: 'Devex', type: PARAM_TYPE.NUMBER, unit: PARAM_UNIT.YEARS },
  //         {
  //           title: 'Capitalised rent in construction',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEARS
  //         },
  //         {
  //           title: 'Pooling substation',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEARS
  //         },
  //         {
  //           title: 'Transformers',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEARS
  //         },
  //         {
  //           title: 'Balance of Plant',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEARS
  //         },
  //         {
  //           title: '[Spare 1]',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEARS
  //         },
  //         {
  //           title: '[Spare 2]',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEARS
  //         },
  //         {
  //           title: '[Spare 3]',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEARS
  //         },
  //         {
  //           title: '[Spare 4]',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEARS
  //         },
  //         {
  //           title: '[Spare 5]',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEARS
  //         },
  //         {
  //           title: '[Spare 6]',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEARS
  //         },
  //         {
  //           title: 'Enterprise value - Development fee',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEARS
  //         }
  //       ]
  //     },
  //     {
  //       id: '8.04',
  //       title: 'BESS capex forecast',
  //       values: [
  //         {
  //           title: 'Inflation profile - BESS capex forecast',
  //           type: PARAM_TYPE.CHOICE.INFLATION
  //         },
  //         {
  //           title: 'Base year - BESS capex forecast',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEAR
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: '9',
  //   category: 'Balance sheet',
  //   sub_categories: [
  //     {
  //       id: '9.01',
  //       title: 'Working capital',
  //       values: [
  //         {
  //           title: 'Devtor days',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.DAYS
  //         },
  //         {
  //           title: 'Creditor days',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.DAYS
  //         }
  //       ]
  //     },
  //     {
  //       id: '9.02',
  //       title: 'National grid securities',
  //       values: [
  //         {
  //           title: 'Security choice',
  //           type: PARAM_TYPE.CHOICE.SECURITY
  //         },
  //         {
  //           title: 'Attributable security choice',
  //           type: PARAM_TYPE.CHOICE.ATTRIBUTABLE_SECURITY
  //         },
  //         {
  //           title: 'Total attributable costs',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Annual wider cancellation costs',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Premium fee',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         }
  //       ]
  //     },
  //     {
  //       id: '9.03-1',
  //       title: 'Financing - Cash requirements',
  //       values: [
  //         {
  //           title: 'Minimum cash balance',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Cash requirement look-forward restriction',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.MONTHS
  //         }
  //       ]
  //     },
  //     {
  //       id: '9.03-2',
  //       title: 'Financing - Gearing by capex type',
  //       values: [
  //         {
  //           title: 'BESS augmentation',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'BESS Replacement 1',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'BESS Replacement 2',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Replacement 1',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEAR
  //         },
  //         {
  //           title: 'Replacement 2',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.YEAR
  //         },
  //         {
  //           title: 'Vintage 1',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Vintage 2',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Vintage 3',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Vintage 4',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Vintage 5',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Vintage 6',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Vintage 7',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Vintage 8',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Vintage 9',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Gearing (excluding batteries)',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         }
  //       ]
  //     },
  //     {
  //       id: '9.03-3',
  //       title: 'Financing - Senior devt',
  //       values: [
  //         {
  //           title: 'Senior devt interest',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE_PA
  //         },
  //         {
  //           title:
  //             'Cash sweep % of available cash (senior debt repayment profile)',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Minimum allowed DSCR (half-yearly)',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Minimum allowed DSCR (annual)',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         }
  //       ]
  //     },
  //     {
  //       id: '9.03-4',
  //       title: 'Financing - Equity',
  //       values: [
  //         {
  //           title: 'Equity split to shareholder loan',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Equity split to share capital',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Shareholder loan interest',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE_PA
  //         },
  //         {
  //           title: 'Shareholder loan cash sweep % of available cash',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Share capital cash sweep % of available cash',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         }
  //       ]
  //     },
  //     {
  //       id: '9.03-5',
  //       title: 'Financing - Dividends',
  //       values: [
  //         {
  //           title: 'Dividends cash sweep % of available cash',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         }
  //       ]
  //     },
  //     {
  //       id: '9.04',
  //       title: 'VAT',
  //       values: [
  //         {
  //           title: 'VAT rate',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Percentage of revenue subject to VAT',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Percentage of costs and capex subject to VAT',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Monthly payments on account',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         }
  //       ]
  //     },
  //     {
  //       id: '9.05',
  //       title: 'Corporation tax',
  //       values: [
  //         {
  //           title: 'Small profits tax rate',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Main rate of tax',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Profit threshold for small profits',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'AIA',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         },
  //         {
  //           title: 'Rate for capital allowances special pool',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Small pool allowance threshold',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         }
  //       ]
  //     },
  //     {
  //       id: '9.06',
  //       title: 'Capex provision',
  //       values: [
  //         {
  //           title: 'Batteries',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.MONTHS
  //         },
  //         {
  //           title: 'Devex',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.MONTHS
  //         },
  //         {
  //           title: 'Capitalised rent in construction',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.MONTHS
  //         },
  //         {
  //           title: 'Land',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.MONTHS
  //         },
  //         {
  //           title: 'Pooling substation',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.MONTHS
  //         },
  //         {
  //           title: 'Transformers',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.MONTHS
  //         },
  //         {
  //           title: 'Balance of Plant',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.MONTHS
  //         },
  //         {
  //           title: '[Spare 1]',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.MONTHS
  //         },
  //         {
  //           title: '[Spare 2]',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.MONTHS
  //         },
  //         {
  //           title: '[Spare 3]',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.MONTHS
  //         },
  //         {
  //           title: '[Spare 4]',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.MONTHS
  //         },
  //         {
  //           title: '[Spare 5]',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.MONTHS
  //         },
  //         {
  //           title: '[Spare 6]',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.MONTHS
  //         },
  //         {
  //           title: 'Enterprise value - Development fee',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.MONTHS
  //         }
  //       ]
  //     },
  //     {
  //       id: '9.07',
  //       title: 'Decommissioning total cost',
  //       values: [
  //         {
  //           title: 'Decommissioning total cost',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.GBP_PRO_1000
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: '10',
  //   category: 'Sensitivities',
  //   sub_categories: [
  //     {
  //       id: '10.01',
  //       title: 'Switches',
  //       values: [
  //         { title: 'Revenue', type: PARAM_TYPE.SWITCH.ONOFF },
  //         { title: 'Land rent', type: PARAM_TYPE.SWITCH.ONOFF },
  //         { title: 'Land purchase', type: PARAM_TYPE.SWITCH.ONOFF },
  //         { title: 'Opex', type: PARAM_TYPE.SWITCH.ONOFF },
  //         {
  //           title: 'Capex(excluding batteries)',
  //           type: PARAM_TYPE.SWITCH.ONOFF
  //         },
  //         { title: 'Batteries', type: PARAM_TYPE.SWITCH.ONOFF },
  //         { title: 'Sensitivites on alert', type: PARAM_TYPE.SWITCH.ONOFF }
  //       ]
  //     },
  //     {
  //       id: '10.02',
  //       title: 'Magnitude of sensitivity inputs',
  //       values: [
  //         {
  //           title: 'Revenue',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Land rent',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Land purchase',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Opex',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Capex(excluding batteries)',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Batteries',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: '11',
  //   category: 'Valuation',
  //   sub_categories: [
  //     {
  //       id: '11.01',
  //       title: 'Setting',
  //       values: [
  //         { title: 'Valuation date', type: PARAM_TYPE.DATE },
  //         {
  //           title: 'Cost of equity',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Discount rate per-tax and unlevered',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Discount rate post-tax and unlevered',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         },
  //         {
  //           title: 'Discount rate post-tax and levered',
  //           type: PARAM_TYPE.NUMBER,
  //           unit: PARAM_UNIT.PERCENTAGE
  //         }
  //       ]
  //     }
  //   ]
  // }
];

export interface ITABLE_PARAMETER {
  title: string;
  type: string;
  unit: { id: string; label: string } | null;
  stickyCols:
    | {
        type: string;
        params: string[];
        fn: any;
      }
    | undefined
    | null;
  stickyRows:
    | {
        type: string;
        params: string[];
        fn: any;
      }
    | undefined
    | null;
}
export interface ITIMING_PARAMETER_SUBCATEGORY {
  id: string;
  title: string;
  values: ITABLE_PARAMETER[];
}
export interface ITIMEING_PARAMETER {
  id: string;
  category: string;
  sub_categories: ITIMING_PARAMETER_SUBCATEGORY[];
}

export const TIMING_PARAMETERS: ITIMEING_PARAMETER[] = [
  {
    id: '1',
    category: 'FX',
    sub_categories: [
      {
        id: '1.01',
        title: 'Exchange rates',
        values: [
          {
            title: 'ExchangeRates',
            type: PARAM_TYPE.TABLE,
            unit: null,
            stickyCols: {
              type: 'function',
              params: ['defaultCurrency'],
              fn: ({ defaultCurrency }: { defaultCurrency: ICurrency }) =>
                CURRENCY_LIST.map((c) => ({
                  id: `${c.id}_per_${defaultCurrency.id}`,
                  label: `${c.label}(${c.unit.label}/${defaultCurrency.unit.label})`,
                  unit: Object.values(PARAM_UNIT).find(
                    (u) => u?.id == `${c.id}_per_${defaultCurrency.id}`
                  )
                }))
            },
            stickyRows: {
              type: 'function',
              params: ['modelStartDate', 'calculationPeriod'],
              fn: ({ modelStartDate, calculationPeriod }: any) => {
                const result = [];
                result.push(['Period', 'Start date', 'End date']);
                for (let i = 0; i < calculationPeriod; i++) {
                  result.push([
                    i + 1,
                    moment(modelStartDate)
                      .add(i, 'month')
                      .startOf('months')
                      .format('YY-MMM-DD'),
                    moment(modelStartDate)
                      .add(i, 'month')
                      .endOf('months')
                      .format('YY-MMM-DD')
                  ]);
                }
                return result;
              }
            }
          }
        ]
      }
    ]
  },
  {
    id: '2',
    category: 'Technical inputs',
    sub_categories: [
      {
        id: '2.01',
        title: 'Degradation input curves',
        values: [
          {
            title: 'Degradation input curves',
            type: PARAM_TYPE.TABLE,
            unit: null,
            stickyCols: {
              type: 'function',
              params: ['cyclesPerDay'],
              fn: ({ cyclesPerDay }: { cyclesPerDay: [] }) => cyclesPerDay
            },
            stickyRows: {
              type: 'function',
              params: ['calculationPeriod'],
              fn: ({ calculationPeriod }: any) => {
                const result = [];
                result.push(['', 'Avg cycles per day']);
                for (let i = 0; i < calculationPeriod; i++) {
                  result.push(['Year', i + 1]);
                }
                return result;
              }
            }
          }
        ]
      }
    ]
  },
  {
    id: '3',
    category: 'Inflation',
    sub_categories: []
  },
  {
    id: '4',
    category: 'Devex',
    sub_categories: []
  },
  {
    id: '5',
    category: 'Capex',
    sub_categories: [
      {
        id: '5.01',
        title: 'NREL Capex forecasts',
        values: []
      }
    ]
  },
  {
    id: '6',
    category: 'Revenue Summary',
    sub_categories: []
  },
  {
    id: '7',
    category: 'Modo revenue setup and summary',
    sub_categories: []
  },

  {
    id: '8',
    category: 'Modo revenue - 2 hour system',
    sub_categories: []
  },
  {
    id: '9',
    category: 'Modo revenue - 4 hour system',
    sub_categories: []
  },
  {
    id: '10',
    category: 'Modo revenue - 8 hour system',
    sub_categories: []
  },
  {
    id: '11',
    category: 'Afry overview',
    sub_categories: []
  },
  {
    id: '12',
    category: 'Other revenue',
    sub_categories: []
  },
  {
    id: '13',
    category: 'TNUoS',
    sub_categories: []
  },
  {
    id: '14',
    category: 'DUoS',
    sub_categories: []
  },
  {
    id: '15',
    category: 'National grid securities',
    sub_categories: []
  }
];

export const INPUT_PARAMS: IInputParameter[] = [
  {
    id: 'basic_project_inputs',
    title: 'Basic Project Inputs',
    datum: [
      {
        id: 'technology',
        title: 'Technology',
        type: PARAM_TYPE.CHOICE.TECH,
        defaultValue: CHOICE_DATA[PARAM_TYPE.CHOICE.TECH][0].id
      },
      {
        id: 'grid_connection_capacity',
        title: 'Grid connection capacity',
        type: PARAM_TYPE.NUMBER,
        unit: PARAM_UNIT.MW,
        defaultValue: 1000
      },
      {
        id: 'grid_connection_date',
        title: 'Grid connection date',
        type: PARAM_TYPE.DATE,
        unit: PARAM_UNIT.DATE,
        defaultValue: '2028-1-1'
      },
      {
        id: 'investor_closing_date',
        title: 'Investor closing date',
        type: PARAM_TYPE.DATE,
        unit: PARAM_UNIT.DATE,
        defaultValue: '2024-1-1'
      },
      {
        id: 'land_secured_date',
        title: 'Land secured date',
        type: PARAM_TYPE.DATE,
        unit: PARAM_UNIT.DATE,
        defaultValue: '2024-5-5'
      },
      {
        id: 'grid_secured_date_offer_accepted',
        title: 'Grid secured date (offer accepted)',
        type: PARAM_TYPE.DATE,
        unit: PARAM_UNIT.DATE,
        defaultValue: '2024-1-2'
      },
      {
        id: 'closing_of_dbt_agreement_date',
        title: 'Closing of debt agreement date',
        type: PARAM_TYPE.DATE,
        unit: PARAM_UNIT.DATE,
        defaultValue: '2024-9-1'
      },
      {
        id: 'region',
        title: 'Region',
        type: PARAM_TYPE.CHOICE.REGION,
        defaultValue: CHOICE_DATA[PARAM_TYPE.CHOICE.REGION][0].id
      },
      {
        id: 'land_size',
        title: 'Land size',
        type: PARAM_TYPE.NUMBER,
        unit: PARAM_UNIT.ACRES,
        defaultValue: 75
      },
      {
        id: 'development_start_date',
        title: 'Development start date',
        type: PARAM_TYPE.DATE,
        unit: PARAM_UNIT.DATE,
        defaultValue: '2023-7-1'
      },
      {
        id: 'time_between_development_start_date_and_planning_permission_granted',
        title:
          'Time between development start date and planning permission granted',
        type: PARAM_TYPE.NUMBER,
        unit: PARAM_UNIT.MONTHS,
        defaultValue: 16
      },
      {
        id: 'time_between_planning_permission_granted_and_rtb',
        title: 'Time between planning permission granted and RtB',
        type: PARAM_TYPE.NUMBER,
        unit: PARAM_UNIT.MONTH,
        defaultValue: 6
      },
      {
        id: 'length_of_construction',
        title: 'Length of construction',
        type: PARAM_TYPE.NUMBER,
        unit: PARAM_UNIT.MONTH,
        defaultValue: 12
      },
      {
        id: 'length_of_operations',
        title: 'Length of operations',
        type: PARAM_TYPE.NUMBER,
        unit: PARAM_UNIT.MONTH,
        defaultValue: 480
      },
      {
        id: 'length_of_decommissioning',
        title: 'Length of decommissioning',
        type: PARAM_TYPE.NUMBER,
        unit: PARAM_UNIT.MONTH,
        defaultValue: 6
      }
    ],
    children: []
  },
  {
    id: 'battery_assumption',
    title: 'Battery Assumption',
    datum: [],
    children: [
      {
        id: 'starting_assumption',
        title: 'Starting Assumptions',
        datum: [
          {
            id: 'battery_duration',
            title: 'Battery Duration',
            type: PARAM_TYPE.CHOICE.DURATION
          },
          {
            id: 'degradation_forecast',
            title: 'Degradation forecast',
            type: PARAM_TYPE.NUMBER,
            maxValue: 2,
            minValue: 1
          },
          {
            id: 'degradation_forecast_retention_rate_data',
            title: 'Degradation forecast retention rate data',
            type: PARAM_TYPE.TABLE,
            //  Timing 2.01 Degradation input curvess
            stickyCols: {
              type: 'function',
              params: [''],
              fn: () => [
                'Avg cycles per day(2.0)',
                'Avg cycles per day(1.5)',
                'Avg cycles per day(1.0)'
              ]
            },
            stickyRows: {
              type: 'function',
              params: ['lengthOfOperations'],
              fn: ({ lengthOfOperations }: { lengthOfOperations: number }) => {
                const result = [];
                result.push(['', '']);
                for (let i = 0; i < lengthOfOperations / 12; i++)
                  result.push(['Year', i + 1]);
                return result;
              }
            }
          },
          {
            id: 'battery_availablity',
            title: 'Battery Availablilty',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE
          }
        ]
      },
      {
        id: 'efficiency',
        title: 'Efficiency',
        datum: [
          {
            id: 'forecast_switch',
            title: 'Switch for fixed or forecast',
            type: PARAM_TYPE.SWITCH.EFFICIENCY,
            defaultValue: SWITCH_DATA[PARAM_TYPE.SWITCH.EFFICIENCY].FORECAST?.id
          },
          {
            id: 'fixed_battery_efficiency',
            title: 'Fixed battery efficiency',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            isShow: {
              params: {
                global: [],
                local: ['forecast_switch']
              },
              fn: ({ forecast_switch }: { forecast_switch: number }) =>
                forecast_switch ==
                SWITCH_DATA[PARAM_TYPE.SWITCH.EFFICIENCY].FIXED?.id
            }
          },
          {
            id: 'forecast_battery_efficiency',
            title: 'Forecast battery efficiency',
            type: PARAM_TYPE.TABLE,
            unit: null,
            stickyCols: {
              type: 'function',
              params: ['cyclesPerDay'],
              fn: ({ cyclesPerDay }: { cyclesPerDay: [] }) => cyclesPerDay
            },
            stickyRows: {
              type: 'function',
              params: ['calculationPeriod'],
              fn: ({ operationYears }: any) => {
                const result = [];
                result.push(['', 'Avg cycles per day']);
                for (let i = 0; i < 50; i++) {
                  result.push(['Year', i + 1]);
                }
                return result;
              }
            },
            isShow: {
              params: {
                global: [],
                local: ['forecast_switch']
              },
              fn: ({ forecast_switch }: { forecast_switch: number }) =>
                forecast_switch ==
                SWITCH_DATA[PARAM_TYPE.SWITCH.EFFICIENCY].FORECAST?.id
            }
          }
        ]
      },
      {
        id: 'disposal',
        title: 'Disposal',
        datum: [
          {
            id: 'disposal_switch',
            title: 'Disposal switch',
            type: PARAM_TYPE.SWITCH.ONOFF,
            defaultValue: SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
          },
          {
            id: 'recycle_percentage',
            title: 'Recycle price as a percentage of new batteries',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            isShow: {
              params: {
                global: [],
                local: ['disposal_switch']
              },
              fn: ({ disposal_switch }: { disposal_switch: number }) =>
                disposal_switch == SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
            }
          },
          {
            id: 'diposal_percentage',
            title: 'Disposed of when energy retention reaches',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            isShow: {
              params: {
                global: [],
                local: ['disposal_switch']
              },
              fn: ({ disposal_switch }: { disposal_switch: number }) =>
                disposal_switch == SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
            }
          }
        ]
      },
      {
        id: 'augmentation',
        title: 'Augmentation',
        datum: [
          {
            id: 'augmentation_switch',
            title: 'Augmentation switch',
            type: PARAM_TYPE.SWITCH.ONOFF,
            defaultValue: SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
          },
          {
            id: 'number_of_months_before_end_of_operations_to_stop_augmentation_and_disposals',
            title:
              'Number of months before end of operations to stop augmentation and disposals',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.MONTHS,
            isShow: {
              params: {
                global: [],
                local: ['augmentation_switch']
              },
              fn: ({ augmentation_switch }: { augmentation_switch: number }) =>
                augmentation_switch ==
                SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
            }
          }
        ]
      }
    ]
  },
  {
    id: 'capex',
    title: 'Capex',
    datum: [],
    children: [
      {
        id: 'batteries',
        title: 'Batteries',
        datum: [
          {
            id: 'battery_sensitivity',
            title: 'Battery sensitivity',
            type: PARAM_TYPE.SWITCH.ONOFF
          },
          {
            id: 'battery_sensitivity_magnitude',
            title: 'Battery sensitivity magnitude',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            isShow: {
              params: {
                global: [],
                local: ['battery_sensitivity']
              },
              fn: ({ battery_sensitivity }: { battery_sensitivity: number }) =>
                battery_sensitivity ==
                SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
            }
          },
          {
            id: 'capex_forecast_scenario_choice',
            title: 'Capex forecast scenario choice',
            type: PARAM_TYPE.CHOICE.FORECAST
          },
          ...[...new Array(3)].map((d, index) => ({
            id:
              index == 0
                ? 'capex_forecast_scenario_data'
                : 'capex_forecast_scenario_data1',
            title: 'Capex forecast scenario data',
            type: PARAM_TYPE.TABLE,
            isShow: {
              params: {
                global: [],
                local: ['capex_forecast_scenario_choice']
              },
              fn: ({
                capex_forecast_scenario_choice
              }: {
                capex_forecast_scenario_choice: number;
              }) => capex_forecast_scenario_choice == index + 1
            },
            stickyCols: {
              type: 'function',
              params: [],
              fn: () =>
                CHOICE_DATA[PARAM_TYPE.CHOICE.DURATION].map(
                  (c) => `${c?.label}hour system`
                )
            },
            stickyRows: {
              type: 'function',
              params: [],
              fn: () => {
                const result = [];
                result.push('');
                for (let i = 0; i < 50; i++) {
                  result.push([INFLATION_START_YEAR + i]);
                }
                return result;
              }
            }
          })),
          {
            id: 'capex_forecast_base_year',
            title: 'Capex forecast base year',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.YEAR,
            defaultValue: 2023
          },
          {
            id: 'capex_forecast_battery_cubes_base_price',
            title: 'Capex forecast battery cubes base price of 2hour system',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
          },
          {
            id: 'capex_forecast_battery_excluding_cubes_base_price',
            title:
              'Capex forecast battery excluding cubes base price of 2hour system',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
          },
          {
            id: 'capex_forecast_inflation_profile',
            title: 'Capex forecast inflation profile',
            type: PARAM_TYPE.CHOICE.INFLATION
          },
          {
            id: 'capex_forecast_inflation_base_year',
            title: 'Capex forecast inflation base year',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.YEAR,
            defaultValue: 2023
          },
          {
            id: 'payment_profile',
            title: 'Payment profile',
            type: PARAM_TYPE.CHOICE.PAYMENT_PROFILE
          },

          {
            id: 'useful_economic_life',
            title: 'Useful economic life',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.YEARS,
            defaultValue: 15
          },
          {
            id: 'capex_provision_months',
            title: 'Capex provision months',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.MONTHS,
            defaultValue: 3
          }
        ]
      },
      {
        id: 'excluding_batteries',
        title: 'Excluding batteries',
        datum: [
          {
            id: 'excluding_battery_sensitivity',
            title: 'Excluding battery sensitivity',
            type: PARAM_TYPE.SWITCH.ONOFF
          },
          {
            id: 'excluding_battery_sensitivity_magnitude',
            title: 'Excluding battery sensitivity magnitude',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            isShow: {
              params: {
                global: [],
                local: ['excluding_battery_sensitivity']
              },
              fn: ({
                excluding_battery_sensitivity
              }: {
                excluding_battery_sensitivity: number;
              }) =>
                excluding_battery_sensitivity ==
                SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
            }
          }
        ],
        children: [
          {
            id: 'land',
            title: 'Land',
            datum: [
              // {
              //   id: 'currency',
              //   title: 'Currency',
              //   type: PARAM_TYPE.CHOICE.CURRENCY
              // },
              {
                id: 'land_cost',
                title: 'Land cost',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
              },
              {
                id: 'payment_profile',
                title: 'Payment profile',
                type: PARAM_TYPE.CHOICE.PAYMENT_PROFILE
              },
              {
                id: 'useful_economic_life',
                title: 'Useful economic life',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.YEARS,
                defaultValue: 40
              },

              {
                id: 'capex_provision_months',
                title: 'Capex provision months',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.MONTHS,
                defaultValue: 0
              }
            ]
          },
          {
            id: 'pooling_substation',
            title: 'Pooling substation',
            datum: [
              // {
              //   id: 'currency',
              //   title: 'Currency',
              //   type: PARAM_TYPE.CHOICE.CURRENCY
              // },
              {
                id: 'pooling_substation_cost',
                title: 'Pooling substation cost',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
              },
              {
                id: 'payment_profile',
                title: 'Payment profile',
                type: PARAM_TYPE.CHOICE.PAYMENT_PROFILE
              },
              {
                id: 'useful_economic_life',
                title: 'Useful economic life',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.YEARS,
                defaultValue: 40
              },

              {
                id: 'capex_provision_months',
                title: 'Capex provision months',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.MONTHS,
                defaultValue: 3
              }
            ]
          },
          {
            id: 'transformers',
            title: 'Transformers',
            datum: [
              // {
              //   id: 'currency',
              //   title: 'Currency',
              //   type: PARAM_TYPE.CHOICE.CURRENCY
              // },
              {
                id: 'transformers_cost',
                title: 'Transformers cost',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
              },
              {
                id: 'payment_profile',
                title: 'Payment profile',
                type: PARAM_TYPE.CHOICE.PAYMENT_PROFILE
              },
              {
                id: 'useful_economic_life',
                title: 'Useful economic life',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.YEARS,
                defaultValue: 40
              },

              {
                id: 'capex_provision_months',
                title: 'Capex provision months',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.MONTHS,
                defaultValue: 3
              }
            ]
          },
          {
            id: 'balance_of_plant',
            title: 'Balance of plant',
            datum: [
              // {
              //   id: 'currency',
              //   title: 'Currency',
              //   type: PARAM_TYPE.CHOICE.CURRENCY
              // },
              {
                id: 'balance_of_plant_cost',
                title: 'Balance of plant cost',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000
              },
              {
                id: 'payment_profile',
                title: 'Payment profile',
                type: PARAM_TYPE.CHOICE.PAYMENT_PROFILE
              },
              {
                id: 'useful_economic_life',
                title: 'Useful economic life',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.YEARS,
                defaultValue: 40
              },

              {
                id: 'capex_provision_months',
                title: 'Capex provision months',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.MONTHS,
                defaultValue: 3
              }
            ]
          },
          {
            id: 'enterprise_value',
            title: 'Enterprise value - development fee',
            datum: [
              {
                id: 'enterprise_value_switch',
                title: 'Switch',
                type: PARAM_TYPE.SWITCH.ONOFF,
                defaultValue: SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
              },
              // {
              //   id: 'currency',
              //   title: 'Currency',
              //   type: PARAM_TYPE.CHOICE.CURRENCY,
              //   isShow: {
              //     params: {
              //       global: [],
              //       local: ['enterprise_value_switch']
              //     },
              //     fn: ({
              //       enterprise_value_switch
              //     }: {
              //       enterprise_value_switch: number;
              //     }) =>
              //       enterprise_value_switch ==
              //       SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
              //   }
              // },
              {
                id: 'enterprise_value_data',
                title: 'Enterprise value data',
                type: PARAM_TYPE.GROUP,
                children: [
                  {
                    id: 'development_fee_hour_1',
                    title: 'Development fee hour 1',
                    type: PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
                  },
                  {
                    id: 'development_fee_hour_2',
                    title: 'Development fee hour 2',
                    type: PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
                  },
                  {
                    id: 'development_fee_hour_3',
                    title: 'Development fee hour 3',
                    type: PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
                  },
                  {
                    id: 'development_fee_hour_4',
                    title: 'Development fee hour 4',
                    type: PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
                  },
                  {
                    id: 'development_fee_hour_5',
                    title: 'Development fee hour 5',
                    type: PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
                  },
                  {
                    id: 'development_fee_hour_6',
                    title: 'Development fee hour 6',
                    type: PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
                  },
                  {
                    id: 'development_fee_hour_7',
                    title: 'Development fee hour 7',
                    type: PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
                  },
                  {
                    id: 'development_fee_hour_8',
                    title: 'Development fee hour 8',
                    type: PARAM_TYPE.NUMBER,
                    unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
                  }
                ],
                isShow: {
                  params: {
                    global: [],
                    local: ['enterprise_value_switch']
                  },
                  fn: ({
                    enterprise_value_switch
                  }: {
                    enterprise_value_switch: number;
                  }) =>
                    enterprise_value_switch ==
                    SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
                }
              },
              {
                id: 'payment_profile',
                title: 'Payment profile',
                type: PARAM_TYPE.CHOICE.PAYMENT_PROFILE,
                isShow: {
                  params: {
                    global: [],
                    local: ['enterprise_value_switch']
                  },
                  fn: ({
                    enterprise_value_switch
                  }: {
                    enterprise_value_switch: number;
                  }) =>
                    enterprise_value_switch ==
                    SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
                }
              },
              {
                id: 'useful_economic_life',
                title: 'Useful economic life',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.YEARS,
                defaultValue: 40,
                isShow: {
                  params: {
                    global: [],
                    local: ['enterprise_value_switch']
                  },
                  fn: ({
                    enterprise_value_switch
                  }: {
                    enterprise_value_switch: number;
                  }) =>
                    enterprise_value_switch ==
                    SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
                }
              },
              {
                id: 'capex_provision_months',
                title: 'Capex provision months',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.MONTHS,
                defaultValue: 3,
                isShow: {
                  params: {
                    global: [],
                    local: ['enterprise_value_switch']
                  },
                  fn: ({
                    enterprise_value_switch
                  }: {
                    enterprise_value_switch: number;
                  }) =>
                    enterprise_value_switch ==
                    SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
                }
              }
            ]
          }
        ]
      },
      {
        id: 'capex_payment_profile_data',
        title: 'Capex payment profile data',
        datum: [
          // {
          //   id: 'operation_start_date',
          //   title: 'COD and operation start date',
          //   type: PARAM_TYPE.DATE
          //   //  this date comes from operation start date.
          //   // only visible, not changeable
          // },
          {
            id: 'capex_payment_profiles',
            title: 'Capex payment profiles',
            type: PARAM_TYPE.TABLE,
            stickyRows: {
              type: 'function',
              params: ['operationStartDate'],
              fn: ({
                operationStartDate = '2028-01-01'
              }: {
                operationStartDate: string;
              }) => {
                const result = [];
                result.push([
                  'CapexMilestonePaymentList',
                  moment(operationStartDate).format('DD-MMM-YY')
                ]);
                for (let i = 0; i < 30; i++) {
                  result.push([
                    i + 1 - 30,
                    `COD ${i + 1 - 30}`,
                    moment(operationStartDate)
                      .add('month', i)
                      .endOf('month')
                      .format('DD-MMM-YY')
                  ]);
                }
                return result;
              }
            },
            stickyCols: {
              type: 'function',
              params: ['cyclesPerDay'],

              //

              fn: () =>
                CHOICE_DATA[PARAM_TYPE.CHOICE.PAYMENT_PROFILE].map(
                  (c) => c?.label
                )
            }
          }
        ]
      }
    ]
  },
  {
    id: 'revenue',
    title: 'Revenue',
    datum: [],
    children: [
      {
        id: 'setup',
        title: 'Setup',
        datum: [
          {
            id: 'revenue_sensitivity',
            title: 'Revenue sensitivity',
            type: PARAM_TYPE.SWITCH.YESNO
          },
          {
            id: 'revenue_sensitivity_magnitude',
            title: 'Revenue sensitivity magnitude',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            isShow: {
              params: {
                global: [],
                local: ['revenue_sensitivity']
              },
              fn: ({ revenue_sensitivity }: { revenue_sensitivity: number }) =>
                revenue_sensitivity ==
                SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
            }
          },
          {
            id: 'forecast_provider',
            title: 'Forecast Provider',
            type: PARAM_TYPE.CHOICE.FORECAST_PROVIDER
          },
          {
            id: 'revenue_inflation',
            title: 'Inflation',
            type: PARAM_TYPE.CHOICE.INFLATION
          },
          {
            id: 'revenue_inflation_base_year',
            title: 'Inflaion base year',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.YEAR
          }
        ]
      },
      {
        id: 'forecast_provider',
        title: 'Forecast Provider',
        children: [
          {
            id: 'modo',
            title: 'Modo',
            datum: [
              {
                id: 'model_efficiency',
                title: 'Efficiency',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                defaultValue: 88
              },
              {
                id: 'model_inflation_profile',
                title: 'Inflation profile',
                type: PARAM_TYPE.CHOICE.INFLATION
              },
              {
                id: 'model_inflation_base_year',
                title: 'Inflation base year',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.YEAR,
                defaultValue: 2023
              },
              {
                id: 'model_region',
                title: 'Region',
                type: PARAM_TYPE.CHOICE.REGION
              },
              {
                id: 'model_trading_strategy',
                title: 'Trading strategy',
                type: PARAM_TYPE.CHOICE.STRATEGY
              },
              {
                id: 'average_wholesale_day_ahead_price',
                title: 'Wholesale day ahead price',
                type: PARAM_TYPE.TABLE,
                unit: null,
                stickyCols: {
                  type: 'function',
                  params: [''],
                  fn: () => {
                    const data = ['Avg wholesale day ahead price'];
                    return data;
                  }
                },
                stickyRows: {
                  type: 'function',
                  params: ['calculationPeriod', 'modelStartDate'],
                  fn: ({
                    modelStartDate,
                    calculationPeriod
                  }: {
                    calculationPeriod: number;
                    modelStartDate: string;
                  }) => [
                    ['Period', 'Start date', 'End data'],
                    ...[...new Array(calculationPeriod)].map((d, index) => [
                      index + 1,
                      moment(modelStartDate)
                        .add(index, 'month')
                        .format('D-MMM-YY'),
                      moment(modelStartDate)
                        .add(index, 'month')
                        .endOf('month')
                        .format('D-MMM-YY')
                    ])
                  ]
                }
              },
              {
                id: 'reserve_margin',
                title: 'Reserve margin',
                type: PARAM_TYPE.TABLE,
                unit: null,
                stickyCols: {
                  type: 'function',
                  params: [''],
                  fn: () => {
                    const data = ['Reserve margin'];
                    return data;
                  }
                },
                stickyRows: {
                  type: 'function',
                  params: ['calculationPeriod', 'modelStartDate'],
                  fn: ({
                    modelStartDate,
                    calculationPeriod
                  }: {
                    calculationPeriod: number;
                    modelStartDate: string;
                  }) => [
                    ['Period', 'Start date', 'End data'],
                    ...[...new Array(calculationPeriod)].map((d, index) => [
                      index + 1,
                      moment(modelStartDate)
                        .add(index, 'month')
                        .format('D-MMM-YY'),
                      moment(modelStartDate)
                        .add(index, 'month')
                        .endOf('month')
                        .format('D-MMM-YY')
                    ])
                  ]
                }
              }
            ],
            children: [
              {
                id: '2_hour_system',
                title: '2 Hour',
                children: [
                  {
                    id: 'merchant_only',
                    parentId: '2_system',
                    title: 'Merchant Only',
                    datum: REGION_LIST.map((r) => ({
                      id: r,
                      title: r,
                      type: PARAM_TYPE.TABLE,
                      unit: null,
                      stickyCols: {
                        type: 'function',
                        params: [''],
                        fn: () => REGION_PARAMS
                      },
                      stickyRows: {
                        type: 'function',
                        params: ['calculationPeriod', 'modelStartDate'],
                        fn: ({
                          modelStartDate,
                          calculationPeriod
                        }: {
                          calculationPeriod: number;
                          modelStartDate: string;
                        }) => [
                          ['Period', 'Start date', 'End data'],
                          ...[...new Array(calculationPeriod)].map(
                            (d, index) => [
                              index + 1,
                              moment(modelStartDate)
                                .add(index, 'month')
                                .format('D-MMM-YY'),
                              moment(modelStartDate)
                                .add(index, 'month')
                                .endOf('month')
                                .format('D-MMM-YY')
                            ]
                          )
                        ]
                      }
                    }))
                  },
                  {
                    id: 'merchant_and_ancillaries',
                    parentId: '2_system',
                    title: 'Merchant and Ancillaries',
                    datum: REGION_LIST.map((r) => ({
                      id: r,
                      title: r,
                      type: PARAM_TYPE.TABLE,
                      unit: null,
                      stickyCols: {
                        type: 'function',
                        params: [''],
                        fn: () => REGION_PARAMS
                      },
                      stickyRows: {
                        type: 'function',
                        params: ['calculationPeriod', 'modelStartDate'],
                        fn: ({
                          modelStartDate,
                          calculationPeriod
                        }: {
                          calculationPeriod: number;
                          modelStartDate: string;
                        }) => [
                          ['Period', 'Start date', 'End data'],
                          ...[...new Array(calculationPeriod)].map(
                            (d, index) => [
                              index + 1,
                              moment(modelStartDate)
                                .add(index, 'month')
                                .format('D-MMM-YY'),
                              moment(modelStartDate)
                                .add(index, 'month')
                                .endOf('month')
                                .format('D-MMM-YY')
                            ]
                          )
                        ]
                      }
                    }))
                  }
                ]
              },
              {
                id: '4_hour_system',
                title: '4 Hour',
                children: [
                  {
                    id: 'merchant_only',
                    parentId: '4_system',
                    title: 'Merchant Only',
                    datum: REGION_LIST.map((r) => ({
                      id: r,
                      title: r,
                      type: PARAM_TYPE.TABLE,
                      unit: null,
                      stickyCols: {
                        type: 'function',
                        params: [''],
                        fn: () => REGION_PARAMS
                      },
                      stickyRows: {
                        type: 'function',
                        params: ['calculationPeriod', 'modelStartDate'],
                        fn: ({
                          modelStartDate,
                          calculationPeriod
                        }: {
                          calculationPeriod: number;
                          modelStartDate: string;
                        }) => [
                          ['Period', 'Start date', 'End data'],
                          ...[...new Array(calculationPeriod)].map(
                            (d, index) => [
                              index + 1,
                              moment(modelStartDate)
                                .add(index, 'month')
                                .format('D-MMM-YY'),
                              moment(modelStartDate)
                                .add(index, 'month')
                                .endOf('month')
                                .format('D-MMM-YY')
                            ]
                          )
                        ]
                      }
                    }))
                  },
                  {
                    id: 'merchant_and_ancillaries',
                    parentId: '4_system',
                    title: 'Merchant and Ancillaries',
                    datum: REGION_LIST.map((r) => ({
                      id: r,
                      title: r,
                      type: PARAM_TYPE.TABLE,
                      unit: null,
                      stickyCols: {
                        type: 'function',
                        params: [''],
                        fn: () => REGION_PARAMS
                      },
                      stickyRows: {
                        type: 'function',
                        params: ['calculationPeriod', 'modelStartDate'],
                        fn: ({
                          modelStartDate,
                          calculationPeriod
                        }: {
                          calculationPeriod: number;
                          modelStartDate: string;
                        }) => [
                          ['Period', 'Start date', 'End data'],
                          ...[...new Array(calculationPeriod)].map(
                            (d, index) => [
                              index + 1,
                              moment(modelStartDate)
                                .add(index, 'month')
                                .format('D-MMM-YY'),
                              moment(modelStartDate)
                                .add(index, 'month')
                                .endOf('month')
                                .format('D-MMM-YY')
                            ]
                          )
                        ]
                      }
                    }))
                  }
                ]
              },
              {
                id: '8_hour_system',
                title: '8 Hour',
                children: [
                  {
                    id: 'merchant_only',
                    parentId: '8_system',
                    title: 'Merchant Only',
                    datum: REGION_LIST.map((r) => ({
                      id: r,
                      title: r,
                      type: PARAM_TYPE.TABLE,
                      unit: null,
                      stickyCols: {
                        type: 'function',
                        params: [''],
                        fn: () => REGION_PARAMS
                      },
                      stickyRows: {
                        type: 'function',
                        params: ['calculationPeriod', 'modelStartDate'],
                        fn: ({
                          modelStartDate,
                          calculationPeriod
                        }: {
                          calculationPeriod: number;
                          modelStartDate: string;
                        }) => [
                          ['Period', 'Start date', 'End data'],
                          ...[...new Array(calculationPeriod)].map(
                            (d, index) => [
                              index + 1,
                              moment(modelStartDate)
                                .add(index, 'month')
                                .format('D-MMM-YY'),
                              moment(modelStartDate)
                                .add(index, 'month')
                                .endOf('month')
                                .format('D-MMM-YY')
                            ]
                          )
                        ]
                      }
                    }))
                  },
                  {
                    id: 'merchant_and_ancillaries',
                    parentId: '8_system',
                    title: 'Merchant and Ancillaries',
                    datum: REGION_LIST.map((r) => ({
                      id: r,
                      title: r,
                      type: PARAM_TYPE.TABLE,
                      unit: null,
                      stickyCols: {
                        type: 'function',
                        params: [''],
                        fn: () => REGION_PARAMS
                      },
                      stickyRows: {
                        type: 'function',
                        params: ['calculationPeriod', 'modelStartDate'],
                        fn: ({
                          modelStartDate,
                          calculationPeriod
                        }: {
                          calculationPeriod: number;
                          modelStartDate: string;
                        }) => [
                          ['Period', 'Start date', 'End data'],
                          ...[...new Array(calculationPeriod)].map(
                            (d, index) => [
                              index + 1,
                              moment(modelStartDate)
                                .add(index, 'month')
                                .format('D-MMM-YY'),
                              moment(modelStartDate)
                                .add(index, 'month')
                                .endOf('month')
                                .format('D-MMM-YY')
                            ]
                          )
                        ]
                      }
                    }))
                  }
                ]
              }
            ]
          },
          {
            id: 'afry',
            title: 'Afry',
            datum: [
              {
                id: 'afry_model_efficiency',
                title: 'Efficiency',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE
              },
              {
                id: 'afry_model_inflation_profile',
                title: 'Inflation profile',
                type: PARAM_TYPE.CHOICE.INFLATION
              },
              {
                id: 'afry_model_inflation_base_year',
                title: 'Inflation base year',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.YEAR
              },
              {
                id: 'model_region',
                title: 'Region',
                type: PARAM_TYPE.CHOICE.REGION
              },
              {
                id: 'model_trading_strategy',
                title: 'Trading strategy',
                type: PARAM_TYPE.CHOICE.STRATEGY
              }
            ],
            children: [
              {
                id: '2_hour_system',
                title: '2 Hour',
                children: [
                  {
                    id: 'merchant_only',
                    parentId: '2_system',
                    title: 'Merchant Only',
                    datum: REGION_LIST.map((r) => ({
                      id: r,
                      title: r,
                      type: PARAM_TYPE.TABLE,
                      unit: null,
                      stickyCols: {
                        type: 'function',
                        params: [''],
                        fn: () => REGION_PARAMS
                      },
                      stickyRows: {
                        type: 'function',
                        params: ['calculationPeriod', 'modelStartDate'],
                        fn: ({
                          modelStartDate,
                          calculationPeriod
                        }: {
                          calculationPeriod: number;
                          modelStartDate: string;
                        }) => [
                          ['Period', 'Start date', 'End data'],
                          ...[...new Array(calculationPeriod)].map(
                            (d, index) => [
                              index + 1,
                              moment(modelStartDate)
                                .add(index, 'month')
                                .format('D-MMM-YY'),
                              moment(modelStartDate)
                                .add(index, 'month')
                                .endOf('month')
                                .format('D-MMM-YY')
                            ]
                          )
                        ]
                      }
                    }))
                  },
                  {
                    id: 'merchant_and_ancillaries',
                    parentId: '2_system',
                    title: 'Merchant and Ancillaries',
                    datum: REGION_LIST.map((r) => ({
                      id: r,
                      title: r,
                      type: PARAM_TYPE.TABLE,
                      unit: null,
                      stickyCols: {
                        type: 'function',
                        params: [''],
                        fn: () => REGION_PARAMS
                      },
                      stickyRows: {
                        type: 'function',
                        params: ['calculationPeriod', 'modelStartDate'],
                        fn: ({
                          modelStartDate,
                          calculationPeriod
                        }: {
                          calculationPeriod: number;
                          modelStartDate: string;
                        }) => [
                          ['Period', 'Start date', 'End data'],
                          ...[...new Array(calculationPeriod)].map(
                            (d, index) => [
                              index + 1,
                              moment(modelStartDate)
                                .add(index, 'month')
                                .format('D-MMM-YY'),
                              moment(modelStartDate)
                                .add(index, 'month')
                                .endOf('month')
                                .format('D-MMM-YY')
                            ]
                          )
                        ]
                      }
                    }))
                  }
                ]
              },
              {
                id: '4_hour_system',
                title: '4 Hour',
                children: [
                  {
                    id: 'merchant_only',
                    parentId: '4_system',
                    title: 'Merchant Only',
                    datum: REGION_LIST.map((r) => ({
                      id: r,
                      title: r,
                      type: PARAM_TYPE.TABLE,
                      unit: null,
                      stickyCols: {
                        type: 'function',
                        params: [''],
                        fn: () => REGION_PARAMS
                      },
                      stickyRows: {
                        type: 'function',
                        params: ['calculationPeriod', 'modelStartDate'],
                        fn: ({
                          modelStartDate,
                          calculationPeriod
                        }: {
                          calculationPeriod: number;
                          modelStartDate: string;
                        }) => [
                          ['Period', 'Start date', 'End data'],
                          ...[...new Array(calculationPeriod)].map(
                            (d, index) => [
                              index + 1,
                              moment(modelStartDate)
                                .add(index, 'month')
                                .format('D-MMM-YY'),
                              moment(modelStartDate)
                                .add(index, 'month')
                                .endOf('month')
                                .format('D-MMM-YY')
                            ]
                          )
                        ]
                      }
                    }))
                  },
                  {
                    id: 'merchant_and_ancillaries',
                    parentId: '4_system',
                    title: 'Merchant and Ancillaries',
                    datum: REGION_LIST.map((r) => ({
                      id: r,
                      title: r,
                      type: PARAM_TYPE.TABLE,
                      unit: null,
                      stickyCols: {
                        type: 'function',
                        params: [''],
                        fn: () => REGION_PARAMS
                      },
                      stickyRows: {
                        type: 'function',
                        params: ['calculationPeriod', 'modelStartDate'],
                        fn: ({
                          modelStartDate,
                          calculationPeriod
                        }: {
                          calculationPeriod: number;
                          modelStartDate: string;
                        }) => [
                          ['Period', 'Start date', 'End data'],
                          ...[...new Array(calculationPeriod)].map(
                            (d, index) => [
                              index + 1,
                              moment(modelStartDate)
                                .add(index, 'month')
                                .format('D-MMM-YY'),
                              moment(modelStartDate)
                                .add(index, 'month')
                                .endOf('month')
                                .format('D-MMM-YY')
                            ]
                          )
                        ]
                      }
                    }))
                  }
                ]
              },
              {
                id: '8_hour_system',
                title: '8 Hour',
                children: [
                  {
                    id: 'merchant_only',
                    parentId: '8_system',
                    title: 'Merchant Only',
                    datum: REGION_LIST.map((r) => ({
                      id: r,
                      title: r,
                      type: PARAM_TYPE.TABLE,
                      unit: null,
                      stickyCols: {
                        type: 'function',
                        params: [''],
                        fn: () => REGION_PARAMS
                      },
                      stickyRows: {
                        type: 'function',
                        params: ['calculationPeriod', 'modelStartDate'],
                        fn: ({
                          modelStartDate,
                          calculationPeriod
                        }: {
                          calculationPeriod: number;
                          modelStartDate: string;
                        }) => [
                          ['Period', 'Start date', 'End data'],
                          ...[...new Array(calculationPeriod)].map(
                            (d, index) => [
                              index + 1,
                              moment(modelStartDate)
                                .add(index, 'month')
                                .format('D-MMM-YY'),
                              moment(modelStartDate)
                                .add(index, 'month')
                                .endOf('month')
                                .format('D-MMM-YY')
                            ]
                          )
                        ]
                      }
                    }))
                  },
                  {
                    id: 'merchant_and_ancillaries',
                    parentId: '8_system',
                    title: 'Merchant and Ancillaries',
                    datum: REGION_LIST.map((r) => ({
                      id: r,
                      title: r,
                      type: PARAM_TYPE.TABLE,
                      unit: null,
                      stickyCols: {
                        type: 'function',
                        params: [''],
                        fn: () => REGION_PARAMS
                      },
                      stickyRows: {
                        type: 'function',
                        params: ['calculationPeriod', 'modelStartDate'],
                        fn: ({
                          modelStartDate,
                          calculationPeriod
                        }: {
                          calculationPeriod: number;
                          modelStartDate: string;
                        }) => [
                          ['Period', 'Start date', 'End data'],
                          ...[...new Array(calculationPeriod)].map(
                            (d, index) => [
                              index + 1,
                              moment(modelStartDate)
                                .add(index, 'month')
                                .format('D-MMM-YY'),
                              moment(modelStartDate)
                                .add(index, 'month')
                                .endOf('month')
                                .format('D-MMM-YY')
                            ]
                          )
                        ]
                      }
                    }))
                  }
                ]
              }
            ]
          },
          {
            id: 'baringa',
            title: 'Baringa',
            datum: [
              {
                id: 'baringa_model_efficiency',
                title: 'Efficiency',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE
              },
              {
                id: 'baringa_model_inflation_profile',
                title: 'Inflation profile',
                type: PARAM_TYPE.CHOICE.INFLATION
              },
              {
                id: 'baringa_model_inflation_base_year',
                title: 'Inflation base year',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.YEAR
              },
              {
                id: 'model_region',
                title: 'Region',
                type: PARAM_TYPE.CHOICE.REGION
              },
              {
                id: 'model_trading_strategy',
                title: 'Trading strategy',
                type: PARAM_TYPE.CHOICE.STRATEGY
              }
            ],
            children: [
              {
                id: '2_hour_system',
                title: '2 Hour',
                children: [
                  {
                    id: 'merchant_only',
                    parentId: '2_system',
                    title: 'Merchant Only',
                    datum: REGION_LIST.map((r) => ({
                      id: r,
                      title: r,
                      type: PARAM_TYPE.TABLE,
                      unit: null,
                      stickyCols: {
                        type: 'function',
                        params: [''],
                        fn: () => REGION_PARAMS
                      },
                      stickyRows: {
                        type: 'function',
                        params: ['calculationPeriod', 'modelStartDate'],
                        fn: ({
                          modelStartDate,
                          calculationPeriod
                        }: {
                          calculationPeriod: number;
                          modelStartDate: string;
                        }) => [
                          ['Period', 'Start date', 'End data'],
                          ...[...new Array(calculationPeriod)].map(
                            (d, index) => [
                              index + 1,
                              moment(modelStartDate)
                                .add(index, 'month')
                                .format('D-MMM-YY'),
                              moment(modelStartDate)
                                .add(index, 'month')
                                .endOf('month')
                                .format('D-MMM-YY')
                            ]
                          )
                        ]
                      }
                    }))
                  },
                  {
                    id: 'merchant_and_ancillaries',
                    parentId: '2_system',
                    title: 'Merchant and Ancillaries',
                    datum: REGION_LIST.map((r) => ({
                      id: r,
                      title: r,
                      type: PARAM_TYPE.TABLE,
                      unit: null,
                      stickyCols: {
                        type: 'function',
                        params: [''],
                        fn: () => REGION_PARAMS
                      },
                      stickyRows: {
                        type: 'function',
                        params: ['calculationPeriod', 'modelStartDate'],
                        fn: ({
                          modelStartDate,
                          calculationPeriod
                        }: {
                          calculationPeriod: number;
                          modelStartDate: string;
                        }) => [
                          ['Period', 'Start date', 'End data'],
                          ...[...new Array(calculationPeriod)].map(
                            (d, index) => [
                              index + 1,
                              moment(modelStartDate)
                                .add(index, 'month')
                                .format('D-MMM-YY'),
                              moment(modelStartDate)
                                .add(index, 'month')
                                .endOf('month')
                                .format('D-MMM-YY')
                            ]
                          )
                        ]
                      }
                    }))
                  }
                ]
              },
              {
                id: '4_hour_system',
                title: '4 Hour',
                children: [
                  {
                    id: 'merchant_only',
                    parentId: '4_system',
                    title: 'Merchant Only',
                    datum: REGION_LIST.map((r) => ({
                      id: r,
                      title: r,
                      type: PARAM_TYPE.TABLE,
                      unit: null,
                      stickyCols: {
                        type: 'function',
                        params: [''],
                        fn: () => REGION_PARAMS
                      },
                      stickyRows: {
                        type: 'function',
                        params: ['calculationPeriod', 'modelStartDate'],
                        fn: ({
                          modelStartDate,
                          calculationPeriod
                        }: {
                          calculationPeriod: number;
                          modelStartDate: string;
                        }) => [
                          ['Period', 'Start date', 'End data'],
                          ...[...new Array(calculationPeriod)].map(
                            (d, index) => [
                              index + 1,
                              moment(modelStartDate)
                                .add(index, 'month')
                                .format('D-MMM-YY'),
                              moment(modelStartDate)
                                .add(index, 'month')
                                .endOf('month')
                                .format('D-MMM-YY')
                            ]
                          )
                        ]
                      }
                    }))
                  },
                  {
                    id: 'merchant_and_ancillaries',
                    parentId: '4_system',
                    title: 'Merchant and Ancillaries',
                    datum: REGION_LIST.map((r) => ({
                      id: r,
                      title: r,
                      type: PARAM_TYPE.TABLE,
                      unit: null,
                      stickyCols: {
                        type: 'function',
                        params: [''],
                        fn: () => REGION_PARAMS
                      },
                      stickyRows: {
                        type: 'function',
                        params: ['calculationPeriod', 'modelStartDate'],
                        fn: ({
                          modelStartDate,
                          calculationPeriod
                        }: {
                          calculationPeriod: number;
                          modelStartDate: string;
                        }) => [
                          ['Period', 'Start date', 'End data'],
                          ...[...new Array(calculationPeriod)].map(
                            (d, index) => [
                              index + 1,
                              moment(modelStartDate)
                                .add(index, 'month')
                                .format('D-MMM-YY'),
                              moment(modelStartDate)
                                .add(index, 'month')
                                .endOf('month')
                                .format('D-MMM-YY')
                            ]
                          )
                        ]
                      }
                    }))
                  }
                ]
              },
              {
                id: '8_hour_system',
                title: '8 Hour',
                children: [
                  {
                    id: 'merchant_only',
                    parentId: '8_system',
                    title: 'Merchant Only',
                    datum: REGION_LIST.map((r) => ({
                      id: r,
                      title: r,
                      type: PARAM_TYPE.TABLE,
                      unit: null,
                      stickyCols: {
                        type: 'function',
                        params: [''],
                        fn: () => REGION_PARAMS
                      },
                      stickyRows: {
                        type: 'function',
                        params: ['calculationPeriod', 'modelStartDate'],
                        fn: ({
                          modelStartDate,
                          calculationPeriod
                        }: {
                          calculationPeriod: number;
                          modelStartDate: string;
                        }) => [
                          ['Period', 'Start date', 'End data'],
                          ...[...new Array(calculationPeriod)].map(
                            (d, index) => [
                              index + 1,
                              moment(modelStartDate)
                                .add(index, 'month')
                                .format('D-MMM-YY'),
                              moment(modelStartDate)
                                .add(index, 'month')
                                .endOf('month')
                                .format('D-MMM-YY')
                            ]
                          )
                        ]
                      }
                    }))
                  },
                  {
                    id: 'merchant_and_ancillaries',
                    parentId: '8_system',
                    title: 'Merchant and Ancillaries',
                    datum: REGION_LIST.map((r) => ({
                      id: r,
                      title: r,
                      type: PARAM_TYPE.TABLE,
                      unit: null,
                      stickyCols: {
                        type: 'function',
                        params: [''],
                        fn: () => REGION_PARAMS
                      },
                      stickyRows: {
                        type: 'function',
                        params: ['calculationPeriod', 'modelStartDate'],
                        fn: ({
                          modelStartDate,
                          calculationPeriod
                        }: {
                          calculationPeriod: number;
                          modelStartDate: string;
                        }) => [
                          ['Period', 'Start date', 'End data'],
                          ...[...new Array(calculationPeriod)].map(
                            (d, index) => [
                              index + 1,
                              moment(modelStartDate)
                                .add(index, 'month')
                                .format('D-MMM-YY'),
                              moment(modelStartDate)
                                .add(index, 'month')
                                .endOf('month')
                                .format('D-MMM-YY')
                            ]
                          )
                        ]
                      }
                    }))
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'ppa',
        title: 'PPA',
        datum: [],
        children: [
          {
            id: 'fixed_ppa',
            title: 'Fixed PPA',
            datum: [
              {
                id: 'fixed_ppa_switch',
                title: 'Switch',
                type: PARAM_TYPE.SWITCH.ONOFF
              },
              {
                id: 'fixed_ppa_percentage',
                title: 'Fixed PPA percentage',
                type: PARAM_TYPE.NUMBER,
                isShow: {
                  params: {
                    global: [],
                    local: ['fixed_ppa_switch']
                  },
                  fn: ({ fixed_ppa_switch }: { fixed_ppa_switch: number }) =>
                    fixed_ppa_switch ==
                    SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
                }
              },
              {
                id: 'ppa_start_date_1',
                title: 'PPA start date 1',
                type: PARAM_TYPE.DATE,
                isShow: {
                  params: {
                    global: [],
                    local: ['fixed_ppa_switch']
                  },
                  fn: ({ fixed_ppa_switch }: { fixed_ppa_switch: number }) =>
                    fixed_ppa_switch ==
                    SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
                }
              },
              {
                id: 'ppa_end_date_1',
                title: 'PPA end date 1',
                type: PARAM_TYPE.DATE,
                isShow: {
                  params: {
                    global: [],
                    local: ['fixed_ppa_switch']
                  },
                  fn: ({ fixed_ppa_switch }: { fixed_ppa_switch: number }) =>
                    fixed_ppa_switch ==
                    SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
                }
              },
              {
                id: 'ppa_start_date_2',
                title: 'PPA start date 2',
                type: PARAM_TYPE.DATE,
                isShow: {
                  params: {
                    global: [],
                    local: ['fixed_ppa_switch']
                  },
                  fn: ({ fixed_ppa_switch }: { fixed_ppa_switch: number }) =>
                    fixed_ppa_switch ==
                    SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
                }
              },
              {
                id: 'ppa_end_date_2',
                title: 'PPA end date 2',
                type: PARAM_TYPE.DATE,
                isShow: {
                  params: {
                    global: [],
                    local: ['fixed_ppa_switch']
                  },
                  fn: ({ fixed_ppa_switch }: { fixed_ppa_switch: number }) =>
                    fixed_ppa_switch ==
                    SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
                }
              },
              {
                id: 'ppa_price_period_1',
                title: 'PPA price period 1',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PER_MWH,
                isShow: {
                  params: {
                    global: [],
                    local: ['fixed_ppa_switch']
                  },
                  fn: ({ fixed_ppa_switch }: { fixed_ppa_switch: number }) =>
                    fixed_ppa_switch ==
                    SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
                }
              },
              {
                id: 'ppa_price_period_2',
                title: 'PPA price period 2',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PER_MWH,
                isShow: {
                  params: {
                    global: [],
                    local: ['fixed_ppa_switch']
                  },
                  fn: ({ fixed_ppa_switch }: { fixed_ppa_switch: number }) =>
                    fixed_ppa_switch ==
                    SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
                }
              }
            ]
          },

          {
            id: 'floating_ppa',
            title: 'Floating PPA',
            datum: [
              {
                id: 'floating_ppa_switch',
                title: 'Switch',
                type: PARAM_TYPE.SWITCH.ONOFF
              },
              {
                id: 'flaoting_ppa_percentage',
                title: 'Floating PPA percentage',
                type: PARAM_TYPE.NUMBER,
                isShow: {
                  params: {
                    global: [],
                    local: ['floating_ppa_switch']
                  },
                  fn: ({
                    floating_ppa_switch
                  }: {
                    floating_ppa_switch: number;
                  }) =>
                    floating_ppa_switch ==
                    SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
                }
              },
              {
                id: 'ppa_start_date_1',
                title: 'PPA start date 1',
                type: PARAM_TYPE.DATE,
                isShow: {
                  params: {
                    global: [],
                    local: ['floating_ppa_switch']
                  },
                  fn: ({
                    floating_ppa_switch
                  }: {
                    floating_ppa_switch: number;
                  }) =>
                    floating_ppa_switch ==
                    SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
                }
              },
              {
                id: 'ppa_end_date_1',
                title: 'PPA end date 1',
                type: PARAM_TYPE.DATE,
                isShow: {
                  params: {
                    global: [],
                    local: ['floating_ppa_switch']
                  },
                  fn: ({
                    floating_ppa_switch
                  }: {
                    floating_ppa_switch: number;
                  }) =>
                    floating_ppa_switch ==
                    SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
                }
              },
              {
                id: 'ppa_start_date_2',
                title: 'PPA start date 2',
                type: PARAM_TYPE.DATE,
                isShow: {
                  params: {
                    global: [],
                    local: ['floating_ppa_switch']
                  },
                  fn: ({
                    floating_ppa_switch
                  }: {
                    floating_ppa_switch: number;
                  }) =>
                    floating_ppa_switch ==
                    SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
                }
              },
              {
                id: 'ppa_end_date_2',
                title: 'PPA end date 2',
                type: PARAM_TYPE.DATE,
                isShow: {
                  params: {
                    global: [],
                    local: ['floating_ppa_switch']
                  },
                  fn: ({
                    floating_ppa_switch
                  }: {
                    floating_ppa_switch: number;
                  }) =>
                    floating_ppa_switch ==
                    SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
                }
              },
              {
                id: 'discount_to_wholesale_price_for_margin',
                title: 'Discount to wholesale price for margin',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                isShow: {
                  params: {
                    global: [],
                    local: ['floating_ppa_switch']
                  },
                  fn: ({
                    floating_ppa_switch
                  }: {
                    floating_ppa_switch: number;
                  }) =>
                    floating_ppa_switch ==
                    SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
                }
              }
            ]
          }
        ]
      },
      {
        id: 'residual_value',
        title: 'Residual value',
        datum: [
          {
            id: 'residual_value',
            title: 'Residual value',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000
          }
        ]
      },
      // {
      //   id: 'other_revenue',
      //   title: 'Other revenue',
      //   datum: [
      //     {
      //       id: 'tnuos_triads_income',
      //       title: 'TNUos -triads income',
      //       type: PARAM_TYPE.SWITCH.ONOFF,
      //       defaultValue: SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
      //     },
      //     {
      //       id: 'rego',
      //       title: 'REGO',
      //       type: PARAM_TYPE.SWITCH.ONOFF,
      //       defaultValue: SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].OFF?.id
      //     },
      //     {
      //       id: 'cfd',
      //       title: 'CfD',
      //       type: PARAM_TYPE.SWITCH.ONOFF,
      //       defaultValue: SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].OFF?.id
      //     },
      //     {
      //       id: 'gain_or_loss_on_diposal_of_batteries',
      //       title: 'Gain or loss on disposal of batteries',
      //       type: PARAM_TYPE.SWITCH.ONOFF,
      //       defaultValue: SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
      //     }
      //   ]
      // }
      {
        id: 'triads',
        title: 'Triads',
        datum: [
          {
            id: 'triads_income_switch',
            title: 'Triads income switch',
            type: PARAM_TYPE.SWITCH.ONOFF
          },
          {
            id: 'triads_embedded_export_tariffs',
            title: 'Triads(embedded export tariffs)',
            type: PARAM_TYPE.TABLE,
            unit: null,
            stickyRows: {
              type: 'function',
              params: ['calculationPeriod', 'modelStartDate'],
              fn: ({
                modelStartDate,
                calculationPeriod
              }: {
                calculationPeriod: number;
                modelStartDate: string;
              }) => [
                ['Period', 'Start date', 'End data'],
                ...[...new Array(calculationPeriod)].map((d, index) => [
                  index + 1,
                  moment(modelStartDate).add(index, 'month').format('D-MMM-YY'),
                  moment(modelStartDate)
                    .add(index, 'month')
                    .endOf('month')
                    .format('D-MMM-YY')
                ])
              ]
            },
            stickyCols: {
              type: 'function',
              params: [],
              fn: () => {
                const result = [];
                const len = CHOICE_DATA[PARAM_TYPE.CHOICE.DNO].length;
                for (let i = 0; i < len; i++) {
                  result.push(CHOICE_DATA[PARAM_TYPE.CHOICE.DNO][i].label);
                }
                return result;
              }
            },
            isShow: {
              params: {
                global: [],
                local: ['triads_income_switch']
              },
              fn: ({
                triads_income_switch
              }: {
                triads_income_switch: number;
              }) =>
                triads_income_switch ==
                SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
            }
          }
        ]
      }
    ]
  },
  {
    id: 'cost_of_sales',
    title: 'Cost of sales',
    datum: [],
    children: [
      {
        id: 'optimiser',
        title: 'Optimiser',
        datum: [
          {
            id: 'optimiser_switch',
            title: 'Optimiser switch',
            type: PARAM_TYPE.SWITCH.ONOFF
          },
          {
            id: 'optimiser_commission',
            title: 'Optimiser commission of revenue',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            isShow: {
              params: {
                global: [],
                local: ['optimiser_switch']
              },
              fn: ({ optimiser_switch }: { optimiser_switch: number }) =>
                optimiser_switch == SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
            }
          },

          {
            id: 'optimiser_upside_value',
            title: 'Optimiser upside value',
            type: PARAM_TYPE.CHOICE.UPSIDE,
            isShow: {
              params: {
                global: [],
                local: ['optimiser_switch']
              },
              fn: ({ optimiser_switch }: { optimiser_switch: number }) =>
                optimiser_switch == SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
            }
          },

          {
            id: 'optimiser_floor',
            title: 'Floor',
            type: PARAM_TYPE.GROUP,
            children: [
              {
                id: 'start_date',
                title: 'Start date',
                type: PARAM_TYPE.DATE
              },
              {
                id: 'end_date',
                title: 'End date',
                type: PARAM_TYPE.DATE
              },
              {
                id: 'floor_price',
                title: 'Floor price',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PER_KW_YEAR
              }
            ],
            isShow: {
              params: {
                global: [],
                local: ['optimiser_switch']
              },
              fn: ({ optimiser_switch }: { optimiser_switch: number }) =>
                optimiser_switch == SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
            }
          }
        ]
      },
      {
        id: 'ppa_fees',
        title: 'PPA fee',
        datum: [
          {
            id: 'ppa_fee_as_a_percent_of_revenue',
            title: 'PPA fee as a percent of revenue',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE
          }
        ]
      },

      {
        id: 'auxilliary_losses',
        title: 'Auxilliary losses',
        datum: [
          {
            id: 'auxilliary_losses_inflation_profile',
            title: 'Auxilliary losses inflation profile',
            type: PARAM_TYPE.CHOICE.INFLATION
          },
          {
            id: 'auxilliary_losses_inflation_base_year',
            title: 'Auxilliary losses inflation base year',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.YEAR
          },
          {
            id: 'auxilliary_losses_factor_2',
            title: 'Auxilliary losses factor - 2hour system',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.KW_PER_HOUR
          },
          {
            id: 'auxilliary_losses_factor_4',
            title: 'Auxilliary losses factor - 4hour system',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.KW_PER_HOUR
          },
          {
            id: 'auxilliary_losses_factor_8',
            title: 'Auxilliary losses factor - 8hour system',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.KW_PER_HOUR
          }
        ]
      },
      {
        id: 'metering',
        title: 'Metering',
        datum: [
          {
            id: 'metering_inflation_profile',
            title: 'Metering inflation profile',
            type: PARAM_TYPE.CHOICE.INFLATION
          },
          {
            id: 'metering_inflation_base_year',
            title: 'Metering inflation base year',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.YEAR
          },
          {
            id: 'annual_cost_per_MW_2',
            title: 'Annual cost per MW - 2hour system',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
          },
          {
            id: 'annual_cost_per_MW_4',
            title: 'Annual cost per MW - 4hour system',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
          },
          {
            id: 'annual_cost_per_MW_8',
            title: 'Annual cost per MW - 8hour system',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
          }
        ]
      },

      {
        id: 'duos_charges',
        title: 'DUoS charges',
        datum: [
          {
            id: 'distribution_connection',
            title: 'Distribution connection',
            type: PARAM_TYPE.SWITCH.YESNO
          },
          {
            id: 'dno',
            title: 'DNO',
            type: PARAM_TYPE.CHOICE.DNO
          },
          {
            id: 'number_of_metering_points',
            title: 'Number of metering points',
            type: PARAM_TYPE.NUMBER
          },
          {
            id: 'duos_inflation_profile',
            title: 'DUoS inflation profile',
            type: PARAM_TYPE.CHOICE.INFLATION
          },
          {
            id: 'duos_inflation_base_year',
            title: 'DUoS inflation base year',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.YEAR
          },
          {
            id: 'dnuos_data',
            title: 'DUoS data',
            type: PARAM_TYPE.TABLE,
            unit: null,

            stickyCols: {
              type: 'function',
              params: [],
              fn: () => {
                const dnoDataList = [
                  'Import Fixed Charge',
                  'Import Super Red Unit Charge',
                  'Import Capacity Charge',
                  'Export Fixed Charge',
                  'GDUoS Generation Red',
                  'Export Exceeded Capacity Charge'
                ];
                return dnoDataList;
              }
            },
            stickyRows: {
              type: 'function',
              params: [],
              fn: () => {
                const result = [];
                result.push('');
                const len = CHOICE_DATA[PARAM_TYPE.CHOICE.DNO].length;
                for (let i = 0; i < len; i++) {
                  result.push(CHOICE_DATA[PARAM_TYPE.CHOICE.DNO][i].label);
                }
                return result;
              }
            }
          }
        ]
      },
      {
        id: 'tnuos',
        title: 'TNUoS',

        children: [
          {
            id: 'triad_charges',
            title: 'Triad charges',
            datum: [
              {
                id: 'tnuos_charges_unavoidable_switch',
                title: 'TNUoS charges unavoidable switch',
                type: PARAM_TYPE.SWITCH.YESNO
              },
              {
                id: 'anticipated_export_during_triads_as_a_percent_of_grid_connection',
                title:
                  'Anticipated export during triads as a percent of grid connection',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE
              },
              {
                id: 'portion_of_triads_expected_november',
                title: 'Portion of triads expected November',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE
              },
              {
                id: 'portion_of_triads_expected_december',
                title: 'Portion of triads expected December',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE
              },
              {
                id: 'portion_of_triads_expected_january',
                title: 'Portion of triads expected January',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE
              },
              {
                id: 'portion_of_triads_expected_february',
                title: 'Portion of triads expected February',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE
              }
            ]
          },
          {
            id: 'export_charges',
            title: 'Export charges',
            datum: [
              {
                id: 'transmission_connection_switch',
                title: 'Transmission connection switch',
                type: PARAM_TYPE.SWITCH.YESNO
              },
              {
                id: 'tnuos_zone',
                title: 'TNUoS zone',
                type: PARAM_TYPE.CHOICE.TNUOS_ZONE_LIST
              },
              {
                id: 'local_circuits',
                title: 'Local circuits',
                type: PARAM_TYPE.CHOICE.LOCAL_CIRCUITS_ZONE
              },
              {
                id: 'local_circuits_data',
                title: 'Local circuits data',
                type: PARAM_TYPE.TABLE,
                stickyCols: {
                  type: 'function',
                  params: [],
                  fn: () =>
                    CHOICE_DATA[PARAM_TYPE.CHOICE.LOCAL_CIRCUITS_ZONE].map(
                      (c) => c?.label
                    )
                },
                stickyRows: {
                  type: 'function',
                  params: [],
                  fn: () => {
                    const result = [];
                    result.push('');
                    for (let i = 0; i < 51; i++) {
                      result.push([TNUOS_DATA_START_YEAR + i]);
                    }
                    return result;
                  }
                }
              },
              {
                id: 'local_substation_type',
                title: 'Local substaion type',
                type: PARAM_TYPE.CHOICE.SUBSTATION_TYPE
              },
              {
                id: 'grid_connection_voltage',
                title: 'Grid connection voltage',
                type: PARAM_TYPE.CHOICE.GRID_CONNECTION_VOLTAGE
              },
              {
                id: 'local_substation_type_by_voltage_data',
                title: 'Local substation type by voltage',
                type: PARAM_TYPE.TABLE,
                stickyCols: {
                  type: 'function',
                  params: [],
                  fn: () => LOCAL_SUBSTATION_TYPE
                },
                stickyRows: {
                  type: 'function',
                  params: [],
                  fn: () => {
                    const result = [];
                    result.push('');

                    CHOICE_DATA[PARAM_TYPE.CHOICE.GRID_CONNECTION_VOLTAGE].map(
                      (d) => result.push(d.label)
                    );
                    return result;
                  }
                }
              },

              {
                id: 'annual_load_factor',
                title: 'Annual load factor',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE
              }
            ]
          },
          {
            id: 'wider_tariff',
            title: 'Wider tariff',
            datum: [
              {
                id: 'system_peak_tariff_data',
                title: 'System peak tariff data',
                type: PARAM_TYPE.TABLE,
                stickyCols: {
                  type: 'function',
                  params: [],
                  fn: () =>
                    CHOICE_DATA[PARAM_TYPE.CHOICE.TNUOS_ZONE_LIST].map(
                      (c) => c?.label
                    )
                },
                stickyRows: {
                  type: 'function',
                  params: [],
                  fn: () => {
                    const result = [];
                    result.push('');
                    for (let i = 0; i < 50; i++) {
                      result.push([TNUOS_DATA_START_YEAR + i]);
                    }
                    return result;
                  }
                }
              },
              {
                id: 'not_shared_round_tariff',
                title: 'Not shared round tariff',
                type: PARAM_TYPE.TABLE,
                stickyCols: {
                  type: 'function',
                  params: [],
                  fn: () =>
                    CHOICE_DATA[PARAM_TYPE.CHOICE.TNUOS_ZONE_LIST].map(
                      (c) => c?.label
                    )
                },
                stickyRows: {
                  type: 'function',
                  params: [],
                  fn: () => {
                    const result = [];
                    result.push('');
                    for (let i = 0; i < 50; i++) {
                      result.push([TNUOS_DATA_START_YEAR + i]);
                    }
                    return result;
                  }
                }
              },
              {
                id: 'shared_year_round_tariff',
                title: 'Shared year round tariff',
                type: PARAM_TYPE.TABLE,
                stickyCols: {
                  type: 'function',
                  params: [],
                  fn: () =>
                    CHOICE_DATA[PARAM_TYPE.CHOICE.TNUOS_ZONE_LIST].map(
                      (c) => c?.label
                    )
                },
                stickyRows: {
                  type: 'function',
                  params: [],
                  fn: () => {
                    const result = [];
                    result.push('');
                    for (let i = 0; i < 50; i++) {
                      result.push([TNUOS_DATA_START_YEAR + i]);
                    }
                    return result;
                  }
                }
              },
              {
                id: 'adjustment_tariff',
                title: 'Adjustment tarifff',
                type: PARAM_TYPE.TABLE,
                stickyCols: {
                  type: 'function',
                  params: [],
                  fn: () =>
                    CHOICE_DATA[PARAM_TYPE.CHOICE.TNUOS_ZONE_LIST].map(
                      (c) => c?.label
                    )
                },
                stickyRows: {
                  type: 'function',
                  params: [],
                  fn: () => {
                    const result = [];
                    result.push('');
                    for (let i = 0; i < 50; i++) {
                      result.push([TNUOS_DATA_START_YEAR + i]);
                    }
                    return result;
                  }
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'administrative_costs',
    title: 'Administrative costs',
    datum: [
      // {
      //   id: 'opex_sensitivity',
      //   title: 'Opex sensitivity',
      //   type: PARAM_TYPE.SWITCH.ONOFF
      // },
      // {
      //   id: 'opex_sensitivity_magnitude',
      //   title: 'Opex sensitivity magnitude',
      //   type: PARAM_TYPE.NUMBER,
      //   unit: PARAM_UNIT.PERCENTAGE,
      //   isShow: {
      //     params: {
      //       global: [],
      //       local: ['opex_sensitivity']
      //     },
      //     fn: ({ opex_sensitivity }: { opex_sensitivity: number }) =>
      //       opex_sensitivity == SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
      //   }
      // }
    ],
    children: [
      {
        id: 'land_rent',
        title: 'Land rent',
        datum: [
          {
            id: 'land_rent_switch',
            title: 'Land rent switch',
            type: PARAM_TYPE.SWITCH.ONOFF
          },
          {
            id: 'land_rent_sensitivity',
            title: 'Land rent sensitivity',
            type: PARAM_TYPE.SWITCH.ONOFF,
            isShow: {
              params: {
                global: [],
                local: ['land_rent_switch']
              },
              fn: ({ land_rent_switch }: { land_rent_switch: number }) =>
                land_rent_switch == SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
            }
          },
          {
            id: 'land_rent_sensitivity_magnitude',
            title: 'Land rent sensitivity_magnitude',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            isShow: {
              params: {
                global: [],
                local: ['land_rent_sensitivity', 'land_rent_switch']
              },
              fn: ({
                land_rent_sensitivity,
                land_rent_switch
              }: {
                land_rent_sensitivity: number;
                land_rent_switch: number;
              }) =>
                land_rent_sensitivity * land_rent_switch ==
                SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
            }
          },
          {
            id: 'land_rent_inflation_profile',
            title: 'Land rent inflation profile',
            type: PARAM_TYPE.CHOICE.INFLATION,
            isShow: {
              params: {
                global: [],
                local: ['land_rent_switch']
              },
              fn: ({ land_rent_switch }: { land_rent_switch: number }) =>
                land_rent_switch == SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
            }
          },
          {
            id: 'land_rent_inflation_base_year',
            title: 'Land rent inflation base year',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.YEAR,
            defaultValue: 2024,
            isShow: {
              params: {
                global: [],
                local: ['land_rent_switch']
              },
              fn: ({ land_rent_switch }: { land_rent_switch: number }) =>
                land_rent_switch == SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
            }
          },
          {
            id: 'land_rent_provision_months',
            title: 'Land rent provision months',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.MONTHS,
            defaultValue: 0,
            isShow: {
              params: {
                global: [],
                local: ['land_rent_switch']
              },
              fn: ({ land_rent_switch }: { land_rent_switch: number }) =>
                land_rent_switch == SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
            }
          }
        ],
        children: [
          {
            id: 'annual_land_rent',
            title: 'Annual land rent',
            datum: [
              {
                id: 'annual_land_rent_per_acre_charge',
                title: 'Annual land rent per acre charge',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP
              },
              {
                id: 'portion_payable_during_construction',
                title: 'Portion payable during construction',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                defaultValue: 50
              },
              {
                id: 'portion_payable_during_operations',
                title: 'Portion payable during operations',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                defaultValue: 100
              },
              {
                id: 'portion_payable_during_decommissioning',
                title: 'Portion payable during decommissioning',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                defaultValue: 50
              }
            ]
          },
          {
            id: 'bespoke_cases_capacity_charge',
            title: 'Bespoke cases - capacity charge',
            datum: [
              {
                id: 'annual_land_rent_per_mw_charge',
                title: 'Annual land rent per MW charge',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
              },
              {
                id: 'portion_payable_during_construction',
                title: 'Portion payable during construction',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE
              },
              {
                id: 'portion_payable_during_operations',
                title: 'Portion payable during operations',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE
              },
              {
                id: 'portion_payable_during_decommissioning',
                title: 'Portion payable during decommissioning',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE
              }
            ]
          },
          {
            id: 'bespoke_cases_land_rent_per_acre_and_option_charge',
            title: 'Bespoke cases - land rent per acre and option charge',
            datum: [
              {
                id: 'annual_land_option_rent_per_acre_charge',
                title: 'Annual land option rent per acre charge',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP
              },
              {
                id: 'option_rent_start_date',
                title: 'Option rent start date',
                type: PARAM_TYPE.DATE
              },
              {
                id: 'option_rent_end_date',
                title: 'Option rent end date',
                type: PARAM_TYPE.DATE
              },
              {
                id: 'annual_land_post_option_rent_per_acre_charge',
                title: 'Annual land post-option rent per acre charge',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP
              },
              {
                id: 'post_option_rent_start_date',
                title: 'Post-option rent start date',
                type: PARAM_TYPE.DATE
              },
              {
                id: 'post_option_rent_end_date',
                title: 'Post-option rent end date',
                type: PARAM_TYPE.DATE
              }
            ]
          }
        ]
      },
      {
        id: 'o_and_m',
        title: 'O&M',
        children: [
          {
            id: 'fixed',
            title: 'Fixed',
            datum: [
              {
                id: 'annual_fixed_o_and_m_2',
                title: 'Annual fixed O&M - 2 hour system',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP
              },
              {
                id: 'annual_fixed_o_and_m_4',
                title: 'Annual fixed O&M - 4 hour system',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP
              },
              {
                id: 'annual_fixed_o_and_m_8',
                title: 'Annual fixed O&M - 8 hour system',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP
              },
              {
                id: 'inflation_profile',
                title: 'Inflation profile',
                type: PARAM_TYPE.CHOICE.INFLATION
              },
              {
                id: 'inflation_base_year',
                title: 'Inflation base year',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.YEAR
              }
            ]
          },
          {
            id: 'variable',
            title: 'Variable',
            datum: [
              {
                id: 'variable_o_and_m_2',
                title: 'Variable O&M - 2 hour system',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
              },
              {
                id: 'variable_o_and_m_4',
                title: 'Variable O&M - 4 hour system',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
              },
              {
                id: 'variable_o_and_m_8',
                title: 'Variable O&M - 8 hour system',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
              },
              {
                id: 'inflation_profile',
                title: 'Inflation profile',
                type: PARAM_TYPE.CHOICE.INFLATION
              },
              {
                id: 'inflation_base_year',
                title: 'Inflation base year',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.YEAR
              }
            ]
          }
        ]
      },
      {
        id: 'asset_management',
        title: 'Asset management',
        datum: [
          {
            id: 'inflation',
            title: 'Inflation',
            type: PARAM_TYPE.GROUP,
            children: [
              {
                id: 'inflation_profile_1',
                title: 'Inflation profile - period 1',
                type: PARAM_TYPE.CHOICE.INFLATION
              },
              {
                id: 'inflation_base_year_1',
                title: 'Inflation base year - period 1',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.YEAR,
                defaultValue: 2024
              },
              {
                id: 'inflation_profile_2',
                title: 'Inflation profile - period 2',
                type: PARAM_TYPE.CHOICE.INFLATION
              },
              {
                id: 'inflation_base_year_2',
                title: 'Inflation base year - period 2',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.YEAR
              }
            ]
          },
          {
            id: 'duration',
            title: 'Duration',
            type: PARAM_TYPE.GROUP,
            children: [
              {
                id: 'start_date_period_1',
                title: 'Start date - period 1',
                type: PARAM_TYPE.DATE
              },
              {
                id: 'end_date_period_1',
                title: 'End date - period 1',
                type: PARAM_TYPE.DATE
              },
              {
                id: 'start_date_period_2',
                title: 'Start date - period 2',
                type: PARAM_TYPE.DATE
              },
              {
                id: 'end_date_period_2',
                title: 'End date - period 2',
                type: PARAM_TYPE.DATE
              }
            ]
          },
          {
            id: 'real_time_management_percentage_period_1',
            title: 'Real time management - period 1',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE
          },
          {
            id: 'maintenance_percentage_period_1',
            title: 'Maintenance - period 1',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE
          },
          {
            id: 'real_time_management_percentage_period_2',
            title: 'Real time management - period 2',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE
          },
          {
            id: 'maintenance_percentage_period_2',
            title: 'Maintenance - period 2',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE
          },
          {
            id: 'real_time_management_period_1',
            title: 'Real time management - period 1',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
            defaultValue: 1.0
          },
          {
            id: 'maintenance_period_1',
            title: 'Maintenance - period 1',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
            defaultValue: 2.0
          },
          {
            id: 'real_time_management_period_2',
            title: 'Real time management - period 2',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
          },
          {
            id: 'maintenance_period_2',
            title: 'Maintenance - period 2',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
          }
        ]
      },
      {
        id: 'insurance',
        title: 'Insurance',
        datum: [
          {
            id: 'inflation_profile',
            title: 'Inflation profile',
            type: PARAM_TYPE.CHOICE.INFLATION
          },
          {
            id: 'inflation_base_year_operations',
            title: 'Inflation base year - operations',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.YEAR,
            defaultValue: 2024
          },
          {
            id: 'annual_fees_per_mw_operations',
            title: 'Annual fees per MW - operations',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
          }
        ]
      },
      {
        id: 'community_benefit',
        title: 'Community benefit',
        datum: [
          {
            id: 'inflation_profile',
            title: 'Inflation profile',
            type: PARAM_TYPE.CHOICE.INFLATION
          },
          {
            id: 'inflation_base_year',
            title: 'Inflation base year',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.YEAR,
            defaultValue: 2024
          },
          {
            id: 'annual_fixed_fund_to_community_benefit',
            title: 'Annual fixed fund to community benefit',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000,
            defaultValue: 1000
          },
          {
            id: 'annual_mwh_to_community_benefit',
            title: 'Annual MWh to community benefit',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.MWH,
            defaultValue: 0
          }
        ]
      },
      {
        id: 'water_rates',
        title: 'Water rates',
        datum: [
          {
            id: 'inflation_profile',
            title: 'Inflation profile',
            type: PARAM_TYPE.CHOICE.INFLATION
          },
          {
            id: 'inflation_base_year',
            title: 'Inflation base year',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.YEAR
          },
          {
            id: 'annual_fees_per_mw',
            title: 'Annual fees per MW',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
          }
        ]
      },
      {
        id: 'business_rates',
        title: 'Business rates',
        datum: [
          {
            id: 'inflation_profile',
            title: 'Inflation profile',
            type: PARAM_TYPE.CHOICE.INFLATION
          },
          {
            id: 'inflation_base_year',
            title: 'Inflation base year',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.YEAR
          },
          {
            id: 'annual_fees_per_mw',
            title: 'Annual fees per MW',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000_PER_MW
          }
        ]
      },
      {
        id: 'extended_warranty',
        title: 'Extended warranty',
        datum: [
          {
            id: 'extended_warranty_switch',
            title: 'Extended warranty switch',
            type: PARAM_TYPE.SWITCH.ONOFF
          },
          {
            id: 'inflation_profile',
            title: 'Inflation profile',
            type: PARAM_TYPE.CHOICE.INFLATION,
            isShow: {
              params: {
                global: [],
                local: ['extended_warranty_switch']
              },
              fn: ({
                extended_warranty_switch
              }: {
                extended_warranty_switch: number;
              }) =>
                extended_warranty_switch ==
                SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
            }
          },
          {
            id: 'inflation_base_year',
            title: 'Inflation base year',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.YEAR,
            isShow: {
              params: {
                global: [],
                local: ['extended_warranty_switch']
              },
              fn: ({
                extended_warranty_switch
              }: {
                extended_warranty_switch: number;
              }) =>
                extended_warranty_switch ==
                SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
            }
          },
          {
            id: 'length_of_warranty',
            title: 'Length of warranty',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.YEARS,
            defaultValue: 13,
            isShow: {
              params: {
                global: [],
                local: ['extended_warranty_switch']
              },
              fn: ({
                extended_warranty_switch
              }: {
                extended_warranty_switch: number;
              }) =>
                extended_warranty_switch ==
                SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
            }
          },
          {
            id: 'annual_fees_per_mw_2',
            title: 'Annual fees per MW - 2 hour system',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
            defaultValue: 4.077,
            isShow: {
              params: {
                global: [],
                local: ['extended_warranty_switch']
              },
              fn: ({
                extended_warranty_switch
              }: {
                extended_warranty_switch: number;
              }) =>
                extended_warranty_switch ==
                SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
            }
          },
          {
            id: 'annual_fees_per_mw_4',
            title: 'Annual fees per MW - 4 hour system',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
            defaultValue: 8.153,
            isShow: {
              params: {
                global: [],
                local: ['extended_warranty_switch']
              },
              fn: ({
                extended_warranty_switch
              }: {
                extended_warranty_switch: number;
              }) =>
                extended_warranty_switch ==
                SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
            }
          },
          {
            id: 'annual_fees_per_mw_8',
            title: 'Annual fees per MW - 8 hour system',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
            defaultValue: 16.307,
            isShow: {
              params: {
                global: [],
                local: ['extended_warranty_switch']
              },
              fn: ({
                extended_warranty_switch
              }: {
                extended_warranty_switch: number;
              }) =>
                extended_warranty_switch ==
                SWITCH_DATA[PARAM_TYPE.SWITCH.ONOFF].ON?.id
            }
          }
        ]
      },
      {
        id: 'site_security',
        title: 'Site secuirty',
        datum: [
          {
            id: 'inflation_profile',
            title: 'Inflation profile',
            type: PARAM_TYPE.CHOICE.INFLATION
          },
          {
            id: 'inflation_base_year',
            title: 'Inflation base year',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.YEAR,
            defaultValue: 2024
          },
          {
            id: 'annual_fees_per_mw',
            title: 'Annual fees per MW',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000_PER_MW,
            defaultValue: 0.03
          }
        ]
      },
      {
        id: 'easement_costs',
        title: 'Easement costs',
        datum: [
          {
            id: 'inflation_profile',
            title: 'Inflation profile',
            type: PARAM_TYPE.CHOICE.INFLATION
          },
          {
            id: 'inflation_base_year',
            title: 'Inflation base year',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.YEAR,
            defaultValue: 2024
          },
          {
            id: 'annual_cost',
            title: 'Annual cost',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000_PER_KM
          },
          {
            id: 'cable_length',
            title: 'Cable length',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.KM
          }
        ]
      },
      {
        id: 'legal_costs',
        title: 'Legal costs',
        datum: [
          {
            id: 'inflation_profile',
            title: 'Inflation profile',
            type: PARAM_TYPE.CHOICE.INFLATION
          },
          {
            id: 'inflation_base_year',
            title: 'Inflation base year',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.YEAR,
            defaultValue: 2024
          },
          {
            id: 'annual_cost',
            title: 'Annual cost',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000,
            defaultValue: 30
          }
        ]
      },
      {
        id: 'other_administrative_costs',
        title: 'Other administrative costs',
        datum: [
          {
            id: 'inflation_profile',
            title: 'Inflation profile',
            type: PARAM_TYPE.CHOICE.INFLATION
          },
          {
            id: 'inflation_base_year',
            title: 'Inflation base year',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.YEAR,
            defaultValue: 2024
          },
          {
            id: 'annual_accounting_fees_and_audit',
            title: 'Annual accounting fees and audit',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000,
            defaultValue: 7.5
          },
          {
            id: 'annual_it',
            title: 'Annual IT',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000,
            defaultValue: 7.5
          },
          {
            id: 'annual_other_cost',
            title: 'Annual other cost',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000,
            defaultValue: 7.5
          },
          {
            id: 'total_costs',
            title: 'Total Costs',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000,
            renderValue: {
              params: {
                local: [
                  'annual_accounting_fees_and_audit',
                  'annual_it',
                  'annual_other_cost'
                ],
                global: []
              },
              fn: ({
                annual_accounting_fees_and_audit = '0',
                annual_it = '0',
                annual_other_cost = '0'
              }: {
                annual_accounting_fees_and_audit: string;
                annual_it: string;
                annual_other_cost: string;
              }) => {
                let val = parseFloat(annual_accounting_fees_and_audit) || 0;
                val += parseFloat(annual_it);
                val += parseFloat(annual_other_cost);
                return val;
              }
            }
          }
        ]
      },
      {
        id: 'intercompany_expense',
        title: 'Intercompany expense',
        datum: [
          {
            id: 'inflation_profile',
            title: 'Inflation profile',
            type: PARAM_TYPE.CHOICE.INFLATION
          },
          {
            id: 'inflation_base_year',
            title: 'Inflation base year',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.YEAR
          },
          {
            id: 'annual_cost',
            title: 'Annual cost',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000
          }
        ]
      }
    ]
  },
  {
    id: 'other_inputs',
    title: 'Other inputs',
    datum: [],
    children: [
      {
        id: 'working_capital',
        title: 'Working capital',
        datum: [
          {
            id: 'debtor_days',
            title: 'Debtor days',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.DAYS,
            defaultValue: 90
          },
          {
            id: 'creditor_days',
            title: 'Creditor days',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.DAYS,
            defaultValue: 90
          }
        ]
      },
      {
        id: 'national_grid_securities',
        title: 'National grid securities',
        datum: [
          {
            id: 'security_choice',
            title: 'Security choice',
            type: PARAM_TYPE.CHOICE.SECURITY
          },
          {
            id: 'attributable_security_choice',
            title: 'Attributable security choice',
            type: PARAM_TYPE.CHOICE.ATTRIBUTABLE_SECURITY
          },
          {
            id: 'attributable_security_choice_data',
            title: 'Attributable security choice data',
            type: PARAM_TYPE.TABLE,
            unit: null,
            stickyCols: {
              type: 'function',
              params: ['securityChoice'],
              fn: () =>
                CHOICE_DATA[PARAM_TYPE.CHOICE.ATTRIBUTABLE_SECURITY].map(
                  (c) => c?.label
                )
            },

            stickyRows: {
              type: 'function',
              params: [],
              fn: () => {
                const result = [];
                result.push(['']);
                for (let i = 8; i > 0; i--) {
                  result.push([`COD - ${i * 6}`]);
                }
                return result;
              }
            }
          },
          {
            id: 'total_attributable_costs',
            title: 'Total attributable costs',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000,
            defaultValue: 4800
          },
          {
            id: 'annual_wider_cancellation_costs',
            title: 'Annual wider cancellation costs',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000,
            defaultValue: 401
          },
          {
            id: 'premium_fee',
            title: 'Premium fee',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            defaultValue: 1.5
          }
        ]
      },
      {
        id: 'financing',
        title: 'Financing',
        datum: [],
        children: [
          {
            id: 'cash_requirements',
            title: 'Cash requirements',
            datum: [
              {
                id: 'minimum_cash_balance',
                title: 'Minimum cash balance',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.GBP_PRO_1000,
                defaultValue: 10
              },
              {
                id: 'cash_requirement_look_forward_restriction',
                title: 'Cash requirement look-forward restriction',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.MONTHS,
                defaultValue: 12
              }
            ]
          },
          {
            id: 'gearing_by_capex_type',
            title: 'Gearing by capex type',
            datum: [
              {
                id: 'bess_augmentation',
                title: 'BESS augmentation',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                defaultValue: 0
              },
              {
                id: 'bess_replacement_1',
                title: 'BESS replacement1',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                defaultValue: 70
              },
              {
                id: 'bess_replacement_2',
                title: 'BESS replacement2',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                defaultValue: 70
              },
              {
                id: 'gearing_excluding_batteries',
                title: 'Gearing excluding batteries',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                defaultValue: 0
              }
            ]
          },
          {
            id: 'senior_debt',
            title: 'Senior debt',
            datum: [
              {
                id: 'senior_debt_interest',
                title: 'Senior debt interest',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE_PA,
                defaultValue: 8.25
              },
              {
                id: 'cash_sweep_percentage_of_available_cash',
                title:
                  'Cash sweep % of available cash (senior debt repayment profile)',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                defaultValue: 100
              },
              {
                id: 'minimum_allowed_dscr_half_yearly',
                title: 'Minimum allowed DSCR (half-yearly)',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                defaultValue: 0
              },
              {
                id: 'minimum_allowed_dscr_annual',
                title: 'Minimum allowed DSCR (annual)',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                defaultValue: 0
              }
            ]
          },
          {
            id: 'equity',
            title: 'Equity',
            datum: [
              {
                id: 'equity_split_to_sharholder_loan',
                title: 'Equity split to shareholder loan',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                defaultValue: 100
              },
              {
                id: 'equity_split_to_share_capital',
                title: 'Equity split to share capital',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                renderValue: {
                  params: {
                    global: [],
                    local: ['equity_split_to_sharholder_loan']
                  },
                  fn: ({
                    equity_split_to_sharholder_loan
                  }: {
                    equity_split_to_sharholder_loan: number;
                  }) => 100 - equity_split_to_sharholder_loan
                }
              },
              {
                id: 'shareholder_loan_interest',
                title: 'Shareholder loan interest',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE_PA,
                defaultValue: 8
              },
              {
                id: 'shareholder_loan_cash_sweep_percentage_of_available_cash',
                title: 'Shareholder loan cash sweep % of available cash',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                defaultValue: 100
              },
              {
                id: 'share_capital_cash_sweep_percentage_of_available_cash',
                title: 'Share capital cash sweep % of available cash',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE
              },
              {
                id: 'dividends_cash_sweep_percentage_of_available_cash',
                title: 'Dividends cash sweep % of available cash',
                type: PARAM_TYPE.NUMBER,
                unit: PARAM_UNIT.PERCENTAGE,
                defaultValue: 0
              }
            ]
          }
        ]
      },

      {
        id: 'vat',
        title: 'VAT',
        datum: [
          {
            id: 'vat_rate',
            title: 'VAT rate',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            defaultValue: 20
          },
          {
            id: 'percentage_of_revenue_subject_to_vat',
            title: 'Percentage of revenue subject to VAT',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            defaultValue: 100
          },
          {
            id: 'percentage_of_costs_and_capex_subject_to_vat',
            title: 'Percentage of costs and capex subject to VAT',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            defaultValue: 100
          },
          {
            id: 'monthly_payments_on_account',
            title: 'Monthly payments on account',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000,
            defaultValue: 35
          }
        ]
      },
      {
        id: 'corporation_tax',
        title: 'Corporation tax',
        datum: [
          {
            id: 'small_profits_tax_rate',
            title: 'Small profits tax rate',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            defaultValue: 19
          },
          {
            id: 'main_rate_of_tax',
            title: 'Main rate of tax',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            defaultValue: 25
          },
          {
            id: 'profit_threshold_for_small_profits',
            title: 'Profit threshold for small profits',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000,
            defaultValue: 50
          },
          {
            id: 'aia',
            title: 'AIA',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000,
            defaultValue: 1000
          },
          {
            id: 'rate_for_capital_allowances_capital_pool',
            title: 'Rate for capital allowances special pool',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.PERCENTAGE,
            defaultValue: 6
          },
          {
            id: 'small_pool_allowances_threshold',
            title: 'Small pool allowance threshold',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000,
            defaultValue: 1
          }
        ]
      },
      {
        id: 'decommissioning_provision',
        title: 'Decommissioning provision',
        datum: [
          {
            id: 'decommissioning_total_cost',
            title: 'Decommissioning total cost',
            type: PARAM_TYPE.NUMBER,
            unit: PARAM_UNIT.GBP_PRO_1000,
            defaultValue: 150
          }
        ]
      },
      {
        id: 'inflation_rate_data',
        title: 'Inflation rate data',
        datum: [
          {
            id: 'inflation_start_year',
            title: 'Inflation start year',
            type: PARAM_TYPE.NUMBER,
            defaultValue: 2021
          },
          {
            id: 'inflation_index_table',
            title: 'Inflation index table',
            type: PARAM_TYPE.TABLE,
            stickyCols: {
              type: 'function',
              params: ['cyclesPerDay'],
              fn: () =>
                CHOICE_DATA[PARAM_TYPE.CHOICE.INFLATION].map((c) => c?.label)
            },
            stickyRows: {
              type: 'function',
              params: [],
              fn: () => {
                const result = [];
                result.push('');
                for (let i = 0; i < 50; i++) {
                  result.push([INFLATION_START_YEAR + i]);
                }
                return result;
              }
            }
          }
        ]
      }
    ]
  },
  {
    // {
    //   id: 'basic_project_inputs',
    //   title: 'Basic Project Inputs',
    //   datum: [
    //     {
    //       title: 'Technology',
    //       type: PARAM_TYPE.CHOICE.TECH,
    //       defaultValue: CHOICE_DATA[PARAM_TYPE.CHOICE.TECH][0].id
    //     },
    id: 'valuation_inputs',
    title: 'Valuation inputs',
    datum: [
      {
        id: 'valuation_date',
        title: 'Valuation date',
        type: PARAM_TYPE.DATE
      },
      {
        id: 'cost_of_equity',
        title: 'Cost of equity',
        type: PARAM_TYPE.NUMBER,
        unit: PARAM_UNIT.PERCENTAGE,
        defaultValue: 10
      }
      // {
      //   id: 'discount_rate_pre_tax_and_unlevered',
      //   title: 'Discount rate pre-tax and unlevered',
      //   type: PARAM_TYPE.NUMBER,
      //   unit: PARAM_UNIT.PERCENTAGE,
      //   defaultValue: 10
      // },
      // {
      //   id: 'discount_rate_post_tax_and_unlevered',
      //   title: 'Discount rate post-tax and unlevered',
      //   type: PARAM_TYPE.NUMBER,
      //   unit: PARAM_UNIT.PERCENTAGE,
      //   defaultValue: 7.5
      // },
      // {
      //   id: 'discount_rate_post_tax_and_levered',
      //   title: 'Discount rate post-tax and levered',
      //   type: PARAM_TYPE.NUMBER,
      //   unit: PARAM_UNIT.PERCENTAGE,
      //   defaultValue: 10
      // }
    ],
    children: []
  }
];
