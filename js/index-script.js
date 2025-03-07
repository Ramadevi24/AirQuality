const baseUrl = "https://ead-airquality.azurewebsites.net/AQAPI/";
//const baseUrl = "https://eadairqualitytest.azurewebsites.net/API/";
var currentStationDetails;
var liveCityData = [];
var labelsData = [];
var pollutantLevels = [];
var colorCodesForAirAnalytics = [];
var chartData = [];
var aqiLineChart;
var pollutantLineChart;
var activePollutant;
var latitude;
var longitude;
var nearestStation;
var hasAccessToLocation = false;
var boolrankingflag = true;
var fianlItems;
var currentStatusClass;
// var currentLanguage;
var currentLanguage;

const pollutantAbbrevations = {
  AQI: "AQI",
  PM10: "PM10",
  PM25: "PM25",
  NO2: "NO2",
  SO2: "SO2",
  CO: "CO",
  BTEX: "BTEX",
  MET: "MET",
  H2S: "H2S",
  O3: "O3",
  THC: "THC",
  VOCs: "VOCs",
  NGO: "NGO",
  Noise: "Noise",
};

const causeStationData = {
  "Hamdan Street": {
    PM10: [
      { cause: "Urban traffic", image: "urban_traffic.png" },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    PM25: [
      { cause: "Urban traffic", image: "urban_traffic.png" },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    NO2: [{ cause: "Urban traffic", image: "urban_traffic.png" }],
    SO2: [{ cause: "Urban traffic", image: "urban_traffic.png" }],
    CO: [{ cause: "Urban traffic", image: "urban_traffic.png" }],
  },
  "Khadejah School": {
    PM10: [
      { cause: "Commercial establishments", image: "urban_traffic.png" },
      { cause: "Transportation", image: "traffic.png" },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    PM25: [
      { cause: "Commercial establishments", image: "urban_traffic.png" },
      { cause: "Transportation", image: "traffic.png" },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    NO2: [{ cause: "Urban traffic", image: "urban_traffic.png" }],
    SO2: [{ cause: "Urban traffic", image: "urban_traffic.png" }],
    O3: [{ cause: "Secondary pollutant", image: "urban_traffic.png" }],
  },
  "Al Ain Street": {
    PM10: [
      { cause: "Urban traffic", image: "urban_traffic.png" },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    PM25: [
      { cause: "Urban traffic", image: "urban_traffic.png" },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    NO2: [{ cause: "Urban traffic", image: "urban_traffic.png" }],
    SO2: [{ cause: "Urban traffic", image: "urban_traffic.png" }],
    CO: [{ cause: "Highway traffic emissions", image: "highway_traffic.png" }],
  },
  "Khalifa School": {
    PM10: [
      { cause: "Transportation", image: "traffic.png" },
      {
        cause: "Construction activities",
        image: "construction_activities.png",
      },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    PM25: [
      { cause: "Transportation", image: "traffic.png" },
      {
        cause: "Construction activities",
        image: "construction_activities.png",
      },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    NO2: [{ cause: "Transportation", image: "traffic.png" }],
    SO2: [{ cause: "Transportation", image: "traffic.png" }],
    O3: [{ cause: "Secondary pollutant", image: "secondary_pollutant.png" }],
  },
  Mussafah: {
    PM10: [
      { cause: "Industrial traffic", image: "industrial_traffic.png" },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    PM25: [
      { cause: "Industrial traffic", image: "industrial_traffic.png" },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    NO2: [
      { cause: "Industrial traffic", image: "industrial_traffic.png" },
      { cause: "Industrial emissions", image: "industrial_emission.png" },
    ],
    SO2: [{ cause: "Industrial emissions", image: "industrial_emission.png" }],
  },
  "Baniyas School": {
    PM10: [
      { cause: "Transportation", image: "traffic.png" },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    PM25: [
      { cause: "Transportation", image: "traffic.png" },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    NO2: [{ cause: "Transportation", image: "traffic.png" }],
    SO2: [{ cause: "Transportation", image: "traffic.png" }],
    O3: [{ cause: "Secondary pollutant", image: "secondary_pollutant.png" }],
  },
  "Al Maqta": {
    PM10: [
      { cause: "Transportation", image: "traffic.png" },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    PM25: [
      { cause: "Transportation", image: "traffic.png" },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    NO2: [{ cause: "Highway traffic emissions", image: "highway_traffic.png" }],
    SO2: [{ cause: "Highway traffic emissions", image: "highway_traffic.png" }],
    CO: [{ cause: "Highway traffic emissions", image: "highway_traffic.png" }],
    O3: [{ cause: "Secondary pollutant", image: "secondary_pollutant.png" }],
  },
  "Khalifa City A": {
    PM10: [
      { cause: "Suburban traffic", image: "suburban_traffic.png" },
      {
        cause: "Construction activities",
        image: "construction_activities.png",
      },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    PM25: [
      { cause: "Suburban traffic", image: "suburban_traffic.png" },
      {
        cause: "Construction activities",
        image: "construction_activities.png",
      },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    NO2: [
      { cause: "Suburban traffic", image: "suburban_traffic.png" },
      {
        cause: "Construction activities",
        image: "construction_activities.png",
      },
    ],
    SO2: [
      { cause: "Suburban traffic", image: "suburban_traffic.png" },
      {
        cause: "Construction activities",
        image: "construction_activities.png",
      },
    ],
    O3: [{ cause: "Secondary pollutant", image: "secondary_pollutant.png" }],
  },
  "Al Mafraq": {
    PM10: [
      { cause: "Highway traffic emissions", image: "highway_traffic.png" },
      { cause: "Industrial emissions", image: "industrial_emission.png" },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    PM25: [
      { cause: "Highway traffic emissions", image: "highway_traffic.png" },
      { cause: "Industrial emissions", image: "industrial_emission.png" },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    NO2: [
      { cause: "Highway traffic emissions", image: "highway_traffic.png" },
      { cause: "Industrial emissions", image: "industrial_emission.png" },
    ],
    SO2: [
      { cause: "Highway traffic emissions", image: "highway_traffic.png" },
      { cause: "Industrial emissions", image: "industrial_emission.png" },
    ],
  },
  "Al Ain Islamic Institute": {
    PM10: [
      {
        cause: "Suburban residential traffic",
        image: "residential_traffic.png",
      },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    PM25: [
      {
        cause: "Suburban residential traffic",
        image: "residential_traffic.png",
      },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    NO2: [
      {
        cause: "Suburban residential traffic",
        image: "residential_traffic.png",
      },
    ],
    SO2: [
      {
        cause: "Suburban residential traffic",
        image: "residential_traffic.png",
      },
    ],
    O3: [{ cause: "Secondary pollutant", image: "secondary_pollutant.png" }],
  },
  Sweihan: {
    PM10: [
      { cause: "Suburban traffic", image: "suburban_traffic.png" },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    PM25: [
      { cause: "Suburban traffic", image: "suburban_traffic.png" },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    NO2: [{ cause: "Suburban traffic", image: "suburban_traffic.png" }],
    SO2: [{ cause: "Suburban traffic", image: "suburban_traffic.png" }],
    CO: [{ cause: "Suburban traffic", image: "suburban_traffic.png" }],
    O3: [{ cause: "Secondary pollutant", image: "secondary_pollutant.png" }],
  },
  "Al Tawia": {
    PM10: [
      { cause: "Suburban traffic", image: "suburban_traffic.png" },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    PM25: [
      { cause: "Suburban traffic", image: "suburban_traffic.png" },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    NO2: [{ cause: "Suburban traffic", image: "suburban_traffic.png" }],
    SO2: [{ cause: "Suburban traffic", image: "suburban_traffic.png" }],
    O3: [{ cause: "Suburban traffic", image: "suburban_traffic.png" }],
  },
  Zakher: {
    PM10: [
      { cause: "Urban traffic", image: "urban_traffic.png" },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    PM25: [
      { cause: "Urban traffic", image: "urban_traffic.png" },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    NO2: [{ cause: "Urban traffic", image: "urban_traffic.png" }],
    SO2: [{ cause: "Urban traffic", image: "urban_traffic.png" }],
  },
  "Al Quaa": {
    PM10: [{ cause: "Natural sources", image: "natural_sources.png" }],
    PM25: [{ cause: "Natural sources", image: "natural_sources.png" }],
    NO2: [
      { cause: "No identified sources in the vicinity", image: "null.png" },
    ],
    SO2: [
      { cause: "No identified sources in the vicinity", image: "null.png" },
    ],
    CO: [{ cause: "No identified sources in the vicinity", image: "null.png" }],
    O3: [{ cause: "Secondary pollutant", image: "secondary_pollutant.png" }],
  },
  "Bida Zayed": {
    PM10: [
      { cause: "Suburban traffic", image: "suburban_traffic.png" },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    PM25: [
      { cause: "Suburban traffic", image: "suburban_traffic.png" },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    NO2: [{ cause: "Suburban traffic", image: "suburban_traffic.png" }],
    SO2: [{ cause: "Suburban traffic", image: "suburban_traffic.png" }],
    O3: [{ cause: "Secondary pollutant", image: "secondary_pollutant.png" }],
  },
  "Gayathi School": {
    PM10: [
      {
        cause: "Suburban residential traffic",
        image: "residential_traffic.png",
      },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    PM25: [
      {
        cause: "Suburban residential traffic",
        image: "residential_traffic.png",
      },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    NO2: [
      {
        cause: "Suburban residential traffic",
        image: "residential_traffic.png",
      },
    ],
    SO2: [
      {
        cause: "Suburban residential traffic",
        image: "residential_traffic.png",
      },
    ],
    O3: [{ cause: "Secondary pollutant", image: "secondary_pollutant.png" }],
  },
  Liwa: {
    PM10: [
      { cause: "Rural traffic", image: "rural_traffic.png" },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    PM25: [
      { cause: "Rural traffic", image: "rural_traffic.png" },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    SO2: [{ cause: "--", image: "null.png" }],
    NO2: [{ cause: "--", image: "null.png" }],
    O3: [{ cause: "Secondary pollutant", image: "secondary_pollutant.png" }],
  },
  Ruwais: {
    PM10: [
      { cause: "Suburban traffic", image: "suburban_traffic.png" },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    PM25: [
      { cause: "Suburban traffic", image: "suburban_traffic.png" },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    NO2: [{ cause: "Suburban traffic", image: "suburban_traffic.png" }],
    SO2: [{ cause: "Suburban traffic", image: "suburban_traffic.png" }],
    CO: [{ cause: "Suburban traffic", image: "suburban_traffic.png" }],
    O3: [{ cause: "Secondary pollutant", image: "secondary_pollutant.png" }],
  },
  "Habshan South": {
    PM10: [
      { cause: "Suburban traffic", image: "suburban_traffic.png" },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    PM25: [
      { cause: "Suburban traffic", image: "suburban_traffic.png" },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    NO2: [{ cause: "Suburban traffic", image: "suburban_traffic.png" }],
    SO2: [{ cause: "Suburban traffic", image: "suburban_traffic.png" }],
    O3: [{ cause: "Secondary pollutant", image: "secondary_pollutant.png" }],
  },
  "E11 Road": {
    PM10: [
      { cause: "Highway traffic emissions", image: "highway_traffic.png" },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    PM25: [
      { cause: "Highway traffic emissions", image: "highway_traffic.png" },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    NO2: [{ cause: "Highway traffic emissions", image: "highway_traffic.png" }],
    SO2: [{ cause: "Highway traffic emissions", image: "highway_traffic.png" }],
    CO: [{ cause: "Highway traffic emissions", image: "highway_traffic.png" }],
  },
  "Abu Dhabi": {
    PM10: [
      { cause: "Suburban traffic", image: "suburban_traffic.png" },
      {
        cause: "Construction activities",
        image: "construction_activities.png",
      },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    PM25: [
      { cause: "Suburban traffic", image: "suburban_traffic.png" },
      {
        cause: "Construction activities",
        image: "construction_activities.png",
      },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    NO2: [
      { cause: "Suburban traffic", image: "suburban_traffic.png" },
      {
        cause: "Construction activities",
        image: "construction_activities.png",
      },
    ],
    SO2: [
      { cause: "Suburban traffic", image: "suburban_traffic.png" },
      {
        cause: "Construction activities",
        image: "construction_activities.png",
      },
    ],
    O3: [{ cause: "Secondary pollutant", image: "secondary_pollutant.png" }],
  },
};

const stations = [
  {
    stationId: "EAD_HamdanStreet",
    en: "Hamdan Street",
    ar: "شارع حمدان",
    regionar: "أبو ظبي",
    aqi: 35,
  },
  {
    stationId: "EAD_KhadijaSchool",
    en: "Khadejah School",
    ar: "مدرسة خديجة",
    regionar: "أبو ظبي",
    aqi: 131,
  },
  {
    stationId: "EAD_KhalifaSchool",
    en: "Khalifa School",
    ar: "مدرسة خليفة",
    regionar: "العين",
    aqi: 64,
  },
  {
    stationId: "EAD_AlMaqta",
    en: "Al Maqta",
    ar: "المقطع",
    regionar: "أبوظبي",
    aqi: 59,
  },
  {
    stationId: "EAD_KhalifaCity",
    en: "Khalifa City A",
    ar: "مدينة خليفة أ",
    regionar: "أبوظبي",
    aqi: 63,
  },
  {
    stationId: "EAD_Baniyas",
    en: "Baniyas School",
    ar: "مدرسة بني ياس",
    regionar: "أبوظبي",
    aqi: 59,
  },
  {
    stationId: "EAD_Mussafah",
    en: "Mussafah",
    ar: "مصفح",
    regionar: "أبوظبي",
    aqi: 64,
  },
  {
    stationId: "EAD_AlMafraq",
    en: "Al Mafraq",
    ar: "المفرق",
    regionar: "أبوظبي",
    aqi: 129,
  },
  {
    stationId: "EAD_AlAinStreet",
    en: "Al Ain Street",
    ar: "شارع العين",
    regionar: "العين",
    aqi: 57,
  },
  {
    stationId: "EAD_AlAinSchool",
    en: "Al Ain Islamic Institute",
    ar: "المعهد الإسلامي العين",
    regionar: "العين",
    aqi: 40,
  },
  {
    stationId: "EAD_AlTawia",
    en: "Al Tawia",
    ar: "الطوية",
    regionar: "العين",
    aqi: 7,
  },
  {
    stationId: "EAD_Zakher",
    en: "Zakher",
    ar: "زاخر",
    regionar: "العين",
    aqi: 50,
  },
  {
    stationId: "EAD_Sweihan",
    en: "Sweihan",
    ar: "سويحان",
    regionar: "العين",
    aqi: 52,
  },
  {
    stationId: "EAD_AlQuaa",
    en: "Al Qua’a",
    ar: "القوع",
    regionar: "العين",
    aqi: 37,
  },
  {
    stationId: "EAD_E11Road",
    en: "E11 Road",
    ar: "شارع E11",
    regionar: "الظفرة",
    aqi: 59,
  },
  {
    stationId: "EAD_BidaZayed",
    en: "Bida Zayed",
    ar: "بدع زايد",
    regionar: "الظفرة",
    aqi: 19,
  },
  {
    stationId: "EAD_Habshan",
    en: "Habshan South",
    ar: "جنوب حبشان",
    regionar: "الظفرة",
    aqi: 47,
  },
  {
    stationId: "EAD_RuwaisTransco",
    en: "Ruwais",
    ar: "الرويس",
    regionar: "الظفرة",
    aqi: 47,
  },
  {
    stationId: "EAD_Gayathi",
    en: "Gayathi School",
    ar: "مدرسة غياثي",
    regionar: "الظفرة",
    aqi: 43,
  },
  {
    stationId: "EAD_Liwa",
    en: "Liwa",
    ar: "واحة ليوا",
    regionar: "الظفرة",
    aqi: 44,
  },
];

const causeStationArabicData = {
  "شارع حمدان": {
    PM10: [
      { cause: "حركة المرور في المناطق الحضرية", image: "urban_traffic.png" },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    PM25: [
      { cause: "حركة المرور في المناطق الحضرية", image: "urban_traffic.png" },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    NO2: [
      { cause: "حركة المرور في المناطق الحضرية", image: "urban_traffic.png" },
    ],
    SO2: [
      { cause: "حركة المرور في المناطق الحضرية", image: "urban_traffic.png" },
    ],
    CO: [
      { cause: "حركة المرور في المناطق الحضرية", image: "urban_traffic.png" },
    ],
  },
  "مدرسة خديجة": {
    PM10: [
      { cause: "المنشآت التجارية", image: "urban_traffic.png" },
      { cause: "النقل", image: "traffic.png" },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    PM25: [
      { cause: "المنشآت التجارية", image: "urban_traffic.png" },
      { cause: "النقل", image: "traffic.png" },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    NO2: [
      { cause: "حركة المرور في المناطق الحضرية", image: "urban_traffic.png" },
    ],
    SO2: [
      { cause: "حركة المرور في المناطق الحضرية", image: "urban_traffic.png" },
    ],
    O3: [{ cause: "الملوثات الثانوية", image: "urban_traffic.png" }],
  },
  "شارع العين": {
    PM10: [
      { cause: "حركة المرور في المناطق الحضرية", image: "urban_traffic.png" },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    PM25: [
      { cause: "حركة المرور في المناطق الحضرية", image: "urban_traffic.png" },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    NO2: [
      { cause: "حركة المرور في المناطق الحضرية", image: "urban_traffic.png" },
    ],
    SO2: [
      { cause: "حركة المرور في المناطق الحضرية", image: "urban_traffic.png" },
    ],
    CO: [
      {
        cause: "انبعاثات حركة المرور في الطرق السريعة",
        image: "highway_traffic.png",
      },
    ],
  },
  "مدرسة خليفة": {
    PM10: [
      { cause: "النقل", image: "traffic.png" },
      { cause: "أنشطة البناء", image: "construction_activities.png" },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    PM25: [
      { cause: "النقل", image: "traffic.png" },
      { cause: "أنشطة البناء", image: "construction_activities.png" },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    NO2: [{ cause: "النقل", image: "traffic.png" }],
    SO2: [{ cause: "النقل", image: "traffic.png" }],
    O3: [{ cause: "الملوثات الثانوية", image: "secondary_pollutant.png" }],
  },
  مصفح: {
    PM10: [
      {
        cause: "حركة المرور في المناطق الصناعية",
        image: "industrial_traffic.png",
      },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    PM25: [
      {
        cause: "حركة المرور في المناطق الصناعية",
        image: "industrial_traffic.png",
      },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    NO2: [
      {
        cause: "حركة المرور في المناطق الصناعية",
        image: "industrial_traffic.png",
      },
      {
        cause: "انبعاثات من الأنشطة الصناعية",
        image: "industrial_emission.png",
      },
    ],
    SO2: [
      {
        cause: "انبعاثات من الأنشطة الصناعية",
        image: "industrial_emission.png",
      },
    ],
  },
  "مدرسة بني ياس": {
    PM10: [
      { cause: "النقل", image: "traffic.png" },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    PM25: [
      { cause: "النقل", image: "traffic.png" },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    NO2: [{ cause: "النقل", image: "traffic.png" }],
    SO2: [{ cause: "النقل", image: "traffic.png" }],
    O3: [{ cause: "الملوثات الثانوية", image: "secondary_pollutant.png" }],
  },
  المقطع: {
    PM10: [
      { cause: "النقل", image: "traffic.png" },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    PM25: [
      { cause: "النقل", image: "traffic.png" },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    NO2: [
      {
        cause: "انبعاثات حركة المرور في الطرق السريعة",
        image: "highway_traffic.png",
      },
    ],
    SO2: [
      {
        cause: "انبعاثات حركة المرور في الطرق السريعة",
        image: "highway_traffic.png",
      },
    ],
    CO: [
      {
        cause: "انبعاثات حركة المرور في الطرق السريعة",
        image: "highway_traffic.png",
      },
    ],
    O3: [{ cause: "الملوثات الثانوية", image: "secondary_pollutant.png" }],
  },
  "مدينة خليفة أ": {
    PM10: [
      { cause: "حركة المرور في الضواحي", image: "suburban_traffic.png" },
      { cause: "أنشطة البناء", image: "construction_activities.png" },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    PM25: [
      { cause: "حركة المرور في الضواحي", image: "suburban_traffic.png" },
      { cause: "أنشطة البناء", image: "construction_activities.png" },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    NO2: [
      { cause: "حركة المرور في الضواحي", image: "suburban_traffic.png" },
      { cause: "أنشطة البناء", image: "construction_activities.png" },
    ],
    SO2: [
      { cause: "حركة المرور في الضواحي", image: "suburban_traffic.png" },
      { cause: "أنشطة البناء", image: "construction_activities.png" },
    ],
    O3: [{ cause: "الملوثات الثانوية", image: "secondary_pollutant.png" }],
  },
  المفرق: {
    PM10: [
      {
        cause: "انبعاثات حركة المرور في الطرق السريعة",
        image: "highway_traffic.png",
      },
      {
        cause: "انبعاثات من الأنشطة الصناعية",
        image: "industrial_emission.png",
      },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    PM25: [
      {
        cause: "انبعاثات حركة المرور في الطرق السريعة",
        image: "highway_traffic.png",
      },
      {
        cause: "انبعاثات من الأنشطة الصناعية",
        image: "industrial_emission.png",
      },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    NO2: [
      {
        cause: "انبعاثات حركة المرور في الطرق السريعة",
        image: "highway_traffic.png",
      },
      {
        cause: "انبعاثات من الأنشطة الصناعية",
        image: "industrial_emission.png",
      },
    ],
    SO2: [
      {
        cause: "انبعاثات حركة المرور في الطرق السريعة",
        image: "highway_traffic.png",
      },
      {
        cause: "انبعاثات من الأنشطة الصناعية",
        image: "industrial_emission.png",
      },
    ],
  },
  "المعهد الإسلامي العين": {
    PM10: [
      {
        cause: "حركة المرور في الضواحي السكنية",
        image: "residential_traffic.png",
      },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    PM25: [
      {
        cause: "حركة المرور في الضواحي السكنية",
        image: "residential_traffic.png",
      },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    NO2: [
      {
        cause: "حركة المرور في الضواحي السكنية",
        image: "residential_traffic.png",
      },
    ],
    SO2: [
      {
        cause: "حركة المرور في الضواحي السكنية",
        image: "residential_traffic.png",
      },
    ],
    O3: [{ cause: "الملوثات الثانوية", image: "secondary_pollutant.png" }],
  },
  سويحان: {
    PM10: [
      { cause: "حركة المرور في الضواحي", image: "suburban_traffic.png" },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    PM25: [
      { cause: "حركة المرور في الضواحي", image: "suburban_traffic.png" },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    NO2: [{ cause: "حركة المرور في الضواحي", image: "suburban_traffic.png" }],
    SO2: [{ cause: "حركة المرور في الضواحي", image: "suburban_traffic.png" }],
    CO: [{ cause: "حركة المرور في الضواحي", image: "suburban_traffic.png" }],
    O3: [{ cause: "الملوثات الثانوية", image: "secondary_pollutant.png" }],
  },
  الطوية: {
    PM10: [
      { cause: "حركة المرور في الضواحي", image: "suburban_traffic.png" },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    PM25: [
      { cause: "حركة المرور في الضواحي", image: "suburban_traffic.png" },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    NO2: [{ cause: "حركة المرور في الضواحي", image: "suburban_traffic.png" }],
    SO2: [{ cause: "حركة المرور في الضواحي", image: "suburban_traffic.png" }],
    O3: [{ cause: "حركة المرور في الضواحي", image: "suburban_traffic.png" }],
  },
  زاخر: {
    PM10: [
      { cause: "حركة المرور في المناطق الحضرية", image: "urban_traffic.png" },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    PM25: [
      { cause: "حركة المرور في المناطق الحضرية", image: "urban_traffic.png" },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    NO2: [
      { cause: "حركة المرور في المناطق الحضرية", image: "urban_traffic.png" },
    ],
    SO2: [
      { cause: "حركة المرور في المناطق الحضرية", image: "urban_traffic.png" },
    ],
  },
  القوع: {
    PM10: [{ cause: "المصادر الطبيعية", image: "natural_sources.png" }],
    PM25: [{ cause: "المصادر الطبيعية", image: "natural_sources.png" }],
    NO2: [
      { cause: "لا توجد مصادر محددة في المنطقة المجاورة", image: "null.png" },
    ],
    SO2: [
      { cause: "لا توجد مصادر محددة في المنطقة المجاورة", image: "null.png" },
    ],
    CO: [
      { cause: "لا توجد مصادر محددة في المنطقة المجاورة", image: "null.png" },
    ],
    O3: [{ cause: "الملوثات الثانوية", image: "secondary_pollutant.png" }],
  },
  "بدع زايد": {
    PM10: [
      { cause: "حركة المرور في الضواحي", image: "suburban_traffic.png" },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    PM25: [
      { cause: "حركة المرور في الضواحي", image: "suburban_traffic.png" },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    NO2: [{ cause: "حركة المرور في الضواحي", image: "suburban_traffic.png" }],
    SO2: [{ cause: "حركة المرور في الضواحي", image: "suburban_traffic.png" }],
    O3: [{ cause: "الملوثات الثانوية", image: "secondary_pollutant.png" }],
  },
  "مدرسة غياثي": {
    PM10: [
      {
        cause: "حركة المرور في الضواحي السكنية",
        image: "residential_traffic.png",
      },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    PM25: [
      {
        cause: "حركة المرور في الضواحي السكنية",
        image: "residential_traffic.png",
      },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    NO2: [
      {
        cause: "حركة المرور في الضواحي السكنية",
        image: "residential_traffic.png",
      },
    ],
    SO2: [
      {
        cause: "حركة المرور في الضواحي السكنية",
        image: "residential_traffic.png",
      },
    ],
    O3: [{ cause: "الملوثات الثانوية", image: "secondary_pollutant.png" }],
  },
  "واحة ليوا": {
    PM10: [
      { cause: "حركة المرور في المناطق النائية", image: "rural_traffic.png" },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    PM25: [
      { cause: "حركة المرور في المناطق النائية", image: "rural_traffic.png" },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    SO2: [{ cause: "--", image: "null.png" }],
    NO2: [{ cause: "--", image: "null.png" }],
    O3: [{ cause: "الملوثات الثانوية", image: "secondary_pollutant.png" }],
  },
  الرويس: {
    PM10: [
      { cause: "حركة المرور في الضواحي", image: "suburban_traffic.png" },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    PM25: [
      { cause: "حركة المرور في الضواحي", image: "suburban_traffic.png" },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    NO2: [{ cause: "حركة المرور في الضواحي", image: "suburban_traffic.png" }],
    SO2: [{ cause: "حركة المرور في الضواحي", image: "suburban_traffic.png" }],
    CO: [{ cause: "حركة المرور في الضواحي", image: "suburban_traffic.png" }],
    O3: [{ cause: "الملوثات الثانوية", image: "secondary_pollutant.png" }],
  },
  "جنوب حبشان": {
    PM10: [
      { cause: "حركة المرور في الضواحي", image: "suburban_traffic.png" },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    PM25: [
      { cause: "حركة المرور في الضواحي", image: "suburban_traffic.png" },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    NO2: [{ cause: "حركة المرور في الضواحي", image: "suburban_traffic.png" }],
    SO2: [{ cause: "حركة المرور في الضواحي", image: "suburban_traffic.png" }],
    O3: [{ cause: "الملوثات الثانوية", image: "secondary_pollutant.png" }],
  },
  "شارع E11": {
    PM10: [
      {
        cause: "انبعاثات حركة المرور في الطرق السريعة",
        image: "highway_traffic.png",
      },
      { cause: "Natural sources", image: "natural_sources.png" },
    ],
    PM25: [
      {
        cause: "انبعاثات حركة المرور في الطرق السريعة",
        image: "highway_traffic.png",
      },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    NO2: [
      {
        cause: "انبعاثات حركة المرور في الطرق السريعة",
        image: "highway_traffic.png",
      },
    ],
    SO2: [
      {
        cause: "انبعاثات حركة المرور في الطرق السريعة",
        image: "highway_traffic.png",
      },
    ],
    CO: [
      {
        cause: "انبعاثات حركة المرور في الطرق السريعة",
        image: "highway_traffic.png",
      },
    ],
  },
  أبوظبي: {
    PM10: [
      { cause: "حركة المرور في الضواحي", image: "suburban_traffic.png" },
      { cause: "أنشطة البناء", image: "construction_activities.png" },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    PM25: [
      { cause: "حركة المرور في الضواحي", image: "suburban_traffic.png" },
      { cause: "أنشطة البناء", image: "construction_activities.png" },
      { cause: "المصادر الطبيعية", image: "natural_sources.png" },
    ],
    NO2: [
      { cause: "حركة المرور في الضواحي", image: "suburban_traffic.png" },
      { cause: "أنشطة البناء", image: "construction_activities.png" },
    ],
    SO2: [
      { cause: "حركة المرور في الضواحي", image: "suburban_traffic.png" },
      { cause: "أنشطة البناء", image: "construction_activities.png" },
    ],
    O3: [{ cause: "الملوثات الثانوية", image: "secondary_pollutant.png" }],
  },
};

const stationIdforEDB = [
  { stationid: 6, stationName: "EAD_AlAinSchool" },
  { stationid: 7, stationName: "EAD_AlAinStreet" },
  { stationid: 16, stationName: "EAD_AlMafraq" },
  { stationid: 14, stationName: "EAD_AlMaqta" },
  { stationid: 20, stationName: "EAD_AlQuaa" },
  { stationid: 18, stationName: "EAD_AlTawia" },
  { stationid: 5, stationName: "EAD_Baniyas" },
  { stationid: 8, stationName: "EAD_BidaZayed" },
  { stationid: 13, stationName: "EAD_E11Road" },
  { stationid: 9, stationName: "EAD_Gayathi" },
  { stationid: 12, stationName: "EAD_Habshan" },
  { stationid: 1, stationName: "EAD_HamdanStreet" },
  { stationid: 2, stationName: "EAD_KhadijaSchool" },
  { stationid: 3, stationName: "EAD_KhalifaSchool" },
  { stationid: 10, stationName: "EAD_Liwa" },
  { stationid: 4, stationName: "EAD_Mussafah" },
  { stationid: 11, stationName: "EAD_RuwaisTransco" },
  { stationid: 17, stationName: "EAD_Sweihan" },
  { stationid: 19, stationName: "EAD_Zakher" },
  { stationid: 15, stationName: "EAD_KhalifaCity" },
];

const stationsWithLocations = [
  {
    stationId: "EAD_HamdanStreet",
    stationName: "Hamdan Street",
    regionName: "Abu Dhabi",
    latitude: 24.4889,
    longitude: 54.3637,
    stationLocation: "Hamdan Bin Zayed the First St - Abu Dhabi, Urban Traffic",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.CO,
      pollutantAbbrevations.BTEX,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.CO,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
    ],
  },
  {
    stationId: "EAD_KhadijaSchool",
    stationName: "Khadejah School",
    regionName: "Abu Dhabi",
    latitude: 24.4816,
    longitude: 54.3693,
    stationLocation:
      "Sultan Bin Zayed the First St- Al Danah - Abu Dhabi, Urban Background",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.H2S,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
    ],
  },
  {
    stationId: "EAD_KhalifaSchool",
    stationName: "Khalifa School",
    regionName: "Abu Dhabi",
    latitude: 24.4301,
    longitude: 54.4084,
    stationLocation:
      "Al Mushrif - Abu Dhabi, Suburban Background",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.H2S,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
    ],
  },
  {
    stationId: "EAD_Mussafah",
    stationName: "Mussafah",
    regionName: "Abu Dhabi",
    latitude: 24.3472,
    longitude: 54.5029,
    stationLocation:
      " Musaffah - Abu Dhabi, Suburban Industrial",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.H2S,
      pollutantAbbrevations.THC,
      // pollutantAbbrevations.BTEX,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
    ],
  },
  {
    stationId: "EAD_Baniyas",
    stationName: "Baniyas School",
    regionName: "Abu Dhabi",
    latitude: 24.3213,
    longitude: 54.6359,
    stationLocation: "Bani Yas - Abu Dhabi, Suburban Background",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.H2S,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.O3,
    ],
  },
  {
    stationId: "EAD_AlMaqta",
    stationName: "Al Maqta",
    regionName: "Abu Dhabi",
    latitude: 24.4035,
    longitude: 54.5161,
    stationLocation: "Rabdan - Abu Dhabi, Urban Background",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.H2S,
      pollutantAbbrevations.THC,
      pollutantAbbrevations.CO,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.BTEX,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.CO,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
    ],
  },
  {
    stationId: "EAD_KhalifaCity",
    stationName: "Khalifa City A",
    regionName: "Abu Dhabi",
    latitude: 24.4199,
    longitude: 54.5782,
    stationLocation:
      "Khalifa City - Abu Dhabi, Suburban Background",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.H2S,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.O3,
    ],
  },
  {
    stationId: "EAD_AlMafraq",
    stationName: "Al Mafraq",
    regionName: "Abu Dhabi",
    latitude: 24.2863,
    longitude: 54.5889,
    stationLocation: "Jarn Yafour - Abu Dhabi, Suburban Industrial",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.H2S,
      pollutantAbbrevations.THC,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
    ],
  },
  {
    stationId: "EAD_AlAinSchool",
    stationName: "Al Ain Islamic Institute",
    regionName: "Al Ain",
    latitude: 24.2191,
    longitude: 55.7349,
    stationLocation:
      "Al Makramah - Al Ain, Suburban Background",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.H2S,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.O3,
    ],
  },
  {
    stationId: "EAD_AlAinStreet",
    stationName: "Al Ain Street",
    regionName: "Al Ain",
    latitude: 24.2259,
    longitude: 55.7658,
    stationLocation: "Khalifa Bin Zayed St- Al Ain, Abu Dhabi, Urban Traffic",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.CO,
      pollutantAbbrevations.BTEX,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.CO,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
    ],
  },
  {
    stationId: "EAD_Sweihan",
    stationName: "Sweihan",
    regionName: "Al Ain",
    latitude: 24.4667,
    longitude: 55.3429,
    stationLocation: " Sweihan - Al Ain, Suburban Background",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.CO,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.CO,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.O3,
    ],
  },
  {
    stationId: "EAD_AlTawia",
    stationName: "Al Tawia",
    regionName: "Al Ain",
    latitude: 24.2592,
    longitude: 55.7049,
    stationLocation: "Al Tiwayya - Al Ain, Suburban Background",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.H2S,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.O3,
    ],
  },
  {
    stationId: "EAD_Zakher",
    stationName: "Zakher",
    regionName: "Al Ain",
    latitude: 24.1635,
    longitude: 55.7021,
    stationLocation: "Zakhir - Al Ain, Urban Background",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.H2S,
      // pollutantAbbrevations.O3,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      // pollutantAbbrevations.O3,
    ],
  },
  {
    stationId: "EAD_AlQuaa",
    stationName: "Al Qua’a",
    regionName: "Al Ain",
    latitude: 23.5312,
    longitude: 55.486,
    stationLocation: "Al Qua'a - Al Ain, Regional Rural",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.CO,
      pollutantAbbrevations.THC,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.CO,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.O3,
    ],
  },
  {
    stationId: "EAD_BidaZayed",
    stationName: "Bida Zayed",
    regionName: "Al Dhafra",
    latitude: 23.6523,
    longitude: 53.7039,
    stationLocation: "Bida Zayed - Al Dhafra, Suburban Background",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.H2S,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.O3,
    ],
  },
  {
    stationId: "EAD_Gayathi",
    stationName: "Gayathi School",
    regionName: "Al Dhafra",
    latitude: 23.8355,
    longitude: 52.8103,
    stationLocation: "Ghiyathi - Al Dhafra, Suburban Background",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.H2S,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.O3,
    ],
  },
  {
    stationId: "EAD_Liwa",
    stationName: "Liwa",
    regionName: "Al Dhafra",
    latitude: 23.0958,
    longitude: 53.6064,
    stationLocation: "Liwa - Al Dhafra, Rural Background Regional",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.O3,
    ],
  },
  {
    stationId: "EAD_RuwaisTransco",
    stationName: "Ruwais",
    regionName: "Al Dhafra",
    latitude: 24.0909,
    longitude: 52.7548,
    stationLocation:
      "Al Ruways Industrial City - Al Dhafra, Suburban Industrial",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.H2S,
      pollutantAbbrevations.CO,
      pollutantAbbrevations.THC,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.CO,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.O3,
    ],
  },
  {
    stationId: "EAD_Habshan",
    stationName: "Habshan South",
    regionName: "Al Dhafra",
    latitude: 23.7504,
    longitude: 53.7453,
    stationLocation: "Habshan - Al Dhafra, Rural Industrial",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.H2S,
      pollutantAbbrevations.THC,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.O3,
    ],
  },
  {
    stationId: "EAD_E11Road",
    stationName: "E11 Road",
    regionName: "Al Dhafra",
    latitude: 24.0352,
    longitude: 53.8853,
    stationLocation: "E11 - Al Dhafra, Rural Traffic",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.CO,
      pollutantAbbrevations.BTEX,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.CO,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
    ],
  },
  {
    stationId: "",
    stationName: "Abu Dhabi",
    latitude: 24.4539,
    longitude: 54.3773,
  },
];

const stationsWithLocationsArabic = [
  {
    stationId: "EAD_HamdanStreet",
    stationName: "شارع حمدان",
    regionName: "أبوظبي",
    latitude: 24.4889,
    longitude: 54.3637,
    stationLocation:
      "شارع سلطان بن زايد الأول - أبوظبي, حركة المرور في المناطق الحضرية",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.CO,
      pollutantAbbrevations.BTEX,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.CO,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
    ],
  },
  {
    stationId: "EAD_KhadijaSchool",
    stationName: "مدرسة خديجة",
    regionName: "أبوظبي",
    latitude: 24.4816,
    longitude: 54.3693,
    stationLocation:
      "شارع سلطان بن زايد الأول - الدانة - أبوظبي, الخلفية الحضرية",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.H2S,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
    ],
  },
  {
    stationId: "EAD_KhalifaSchool",
    stationName: "مدرسة خليفة",
    regionName: "أبوظبي",
    latitude: 24.4301,
    longitude: 54.4084,
    stationLocation: "المشرف - أبوظبي, خلفية الضواحي",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.H2S,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
    ],
  },
  {
    stationId: "EAD_Mussafah",
    stationName: "مصفح",
    regionName: "أبوظبي",
    latitude: 24.3472,
    longitude: 54.5029,
    stationLocation:
      "مصفح - أبوظبي, الصناعية في الضواحي",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.H2S,
      pollutantAbbrevations.THC,
      // pollutantAbbrevations.BTEX,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
    ],
  },
  {
    stationId: "EAD_Baniyas",
    stationName: "مدرسة بني ياس",
    regionName: "أبوظبي",
    latitude: 24.3213,
    longitude: 54.6359,
    stationLocation: "بني ياس - أبوظبي, خلفية الضواحي",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.H2S,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.O3,
    ],
  },
  {
    stationId: "EAD_AlMaqta",
    stationName: "المقطع",
    regionName: "أبوظبي",
    latitude: 24.4035,
    longitude: 54.5161,
    stationLocation: "ربدان - أبوظبي, الخلفية الحضرية",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.H2S,
      pollutantAbbrevations.THC,
      pollutantAbbrevations.CO,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.BTEX,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.CO,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
    ],
  },
  {
    stationId: "EAD_KhalifaCity",
    stationName: "مدينة خليفة أ",
    regionName: "أبوظبي",
    latitude: 24.4199,
    longitude: 54.5782,
    stationLocation:
      "مدينة خليفة - أبوظبي, خلفية الضواحي",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.H2S,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.O3,
    ],
  },
  {
    stationId: "EAD_AlMafraq",
    stationName: "المفرق",
    regionName: "أبوظبي",
    latitude: 24.2863,
    longitude: 54.5889,
    stationLocation: "جرن يافور - أبوظبي, الصناعية في الضواحي",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.H2S,
      pollutantAbbrevations.THC,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
    ],
  },
  {
    stationId: "EAD_AlAinSchool",
    stationName: "المعهد الإسلامي العين",
    regionName: "العين",
    latitude: 24.2191,
    longitude: 55.7349,
    stationLocation: "شارع المكرمة - العين, خلفية الضواحي",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.H2S,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.O3,
    ],
  },
  {
    stationId: "EAD_AlAinStreet",
    stationName: "شارع العين",
    regionName: "العين",
    latitude: 24.2259,
    longitude: 55.7658,
    stationLocation: "المنطقة الوسطى - العين, حركة المرور في المناطق الحضرية",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.CO,
      pollutantAbbrevations.BTEX,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.CO,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
    ],
  },
  {
    stationId: "EAD_Sweihan",
    stationName: "سويحان",
    regionName: "العين",
    latitude: 24.4667,
    longitude: 55.3429,
    stationLocation: "سويحان - العين, خلفية الضواحي.",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.CO,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.CO,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.O3,
    ],
  },
  {
    stationId: "EAD_AlTawia",
    stationName: "الطوية",
    regionName: "العين",
    latitude: 24.2592,
    longitude: 55.7049,
    stationLocation: "الطوية - العين, خلفية الضواحي",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.H2S,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.O3,
    ],
  },
  {
    stationId: "EAD_Zakher",
    stationName: "زاخر",
    regionName: "العين",
    latitude: 24.1635,
    longitude: 55.7021,
    stationLocation: "شارع الظواهر - العين, الخلفية الحضرية",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.H2S,
      // pollutantAbbrevations.O3,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      // pollutantAbbrevations.O3,
    ],
  },
  {
    stationId: "EAD_AlQuaa",
    stationName: "القوع",
    regionName: "العين",
    latitude: 23.5312,
    longitude: 55.486,
    stationLocation: "القوع - العين, الريف الإقليمي",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.CO,
      pollutantAbbrevations.THC,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.CO,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.O3,
    ],
  },
  {
    stationId: "EAD_BidaZayed",
    stationName: "بدع زايد",
    regionName: "الظفرة",
    latitude: 23.6523,
    longitude: 53.7039,
    stationLocation: "مدينة زايد - الظفرة, خلفية الضواحي",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.H2S,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.O3,
    ],
  },
  {
    stationId: "EAD_Gayathi",
    stationName: "مدرسة غياثي",
    regionName: "الظفرة",
    latitude: 23.8355,
    longitude: 52.8103,
    stationLocation: "غياثي - الظفرة, خلفية الضواحي",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.H2S,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.O3,
    ],
  },
  {
    stationId: "EAD_Liwa",
    stationName: "واحة ليوا",
    regionName: "الظفرة",
    latitude: 23.0958,
    longitude: 53.6064,
    stationLocation: "ليوا - الظفرة, الخلفية الريفية الإقليمية",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.O3,
    ],
  },
  {
    stationId: "EAD_RuwaisTransco",
    stationName: "الرويس",
    regionName: "الظفرة",
    latitude: 24.0909,
    longitude: 52.7548,
    stationLocation: "مدينة الرويس الصناعية - الظفرة, الصناعية في الضواحي",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.H2S,
      pollutantAbbrevations.CO,
      pollutantAbbrevations.THC,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.CO,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.O3,
    ],
  },
  {
    stationId: "EAD_Habshan",
    stationName: "جنوب حبشان",
    regionName: "الظفرة",
    latitude: 23.7504,
    longitude: 53.7453,
    stationLocation: "حبشان - الظفرة, الصناعية الريفية",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.H2S,
      pollutantAbbrevations.THC,
      pollutantAbbrevations.O3,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.O3,
    ],
  },
  {
    stationId: "EAD_E11Road",
    stationName: "شارع E11",
    regionName: "الظفرة",
    latitude: 24.0352,
    longitude: 53.8853,
    stationLocation: "الظفرة - E11, حركة المرور الريفية",
    measuredPolluants: [
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.CO,
      pollutantAbbrevations.BTEX,
      pollutantAbbrevations.MET,
      pollutantAbbrevations.Noise,
    ],
    AvailablePolluants: [
      pollutantAbbrevations.SO2,
      pollutantAbbrevations.NO2,
      pollutantAbbrevations.CO,
      pollutantAbbrevations.PM10,
      pollutantAbbrevations.PM25,
    ],
  },
  {
    stationId: "",
    stationName: "أبوظبي",
    latitude: 24.4539,
    longitude: 54.3773,
  },
];

const colorClass = {
  GoodColorClass: "green",
  ModrateColorClass: "lightorange",
  Unhealthy4peopleColorClass: "darkorange",
  UnhealthyColorClass: "peach",
  VeryUnhealthyColorClass: "purple",
  HazardousClass: "hazar",
};

//If coolor codes changes in styles, need to make changes here as well
const colorCodes = {
  green: "#9CD84E",
  lightorange: "#FFB549",
  darkorange: "#F99049",
  peach: "#F65E5F",
  purple: "#A070B6",
  hazar: "#A06A7B",
};

const statusClass = {
  Good: "Good Days",
  Moderate: "Moderate Days",
  UnHealthlySensitiveGroups: "Unhealthy For Sensitive Groups",
  UnHealthly: "Unhealthy Days",
  VeryUnHealthly: "Very Unhealthy Days",
  Hazardous: "Hazardous Days",
};

const statusClassNew1 = {
  Good: "Good",
  Moderate: "Moderate",
  UnHealthlySensitiveGroups: "Unhealthy For Sensitive Groups",
  UnHealthly: "Unhealthy",
  VeryUnHealthly: "Very Unhealthy",
  Hazardous: "Hazardous",
};

const statusClassArabic = {
  Good: "يوم جيد",
  Moderate: "يوم معتدل",
  UnHealthlySensitiveGroups: "يوم غير صحي  للفئة الحساسة",
  UnHealthly: "يوم غير صحي",
  VeryUnHealthly: "يوم غير صحي للغاية",
  Hazardous: "يوم خطر",
};

const statusClassNew1English = {
  Good: "Good",
  Moderate: "Moderate",
  UnHealthlySensitiveGroups: "Unhealthy For Sensitive Groups",
  UnHealthly: "Unhealthy",
  VeryUnHealthly: "Very Unhealthy",
  Hazardous: "Hazardous",
};

const statusClassNew1Arabic = {
  Good: "جيد",
  Moderate: "متوسط",
  UnHealthlySensitiveGroups: "غير صحي للفئة الحساسة",
  UnHealthly: "غير صحي",
  VeryUnHealthly: "غير صحي للغاية",
  Hazardous: "خطر",
};
const aqiContent = {
  Good: "Enjoy the fresh air",
  Moderate: "Enjoy your day outdoors!",
  UnHealthlySensitiveGroups: "Babies and sensitive persons should stay indoors",
  UnHealthly: "Best to stay indoors",
  VeryUnHealthly: "Not a good time to be outdoors, spend your day indoors",
  Hazardous: "You should avoid outdoor activities",
};

const aqiContentArabic = {
  Good: "استمتع بالهواء النقي",
  Moderate: "إستمتع بيومك في الهواء الطلق!",
  UnHealthlySensitiveGroups:
    "ينبغي على الأطفال والأشخاص ضمن الفئة الحساسة البقاء في داخل",
  UnHealthly: "من الأفضل البقاء في الداخل.",
  VeryUnHealthly: "ليس وقتاً مناسباً لقضاء الوقت في الخارج، اقضِ يومك داخل المنزل.",
  Hazardous: "يجب عليك تجنب الأنشطة الخارجية",
};
const chartFilter = {
  Hourly: "Hourly",
  Daily: "Daily",
  Monthly: "Monthly",
  Yearly: "Yearly",
  Custom: "Custom",
};

const chartFilterArabic = {
  Hourly: "كل ساعة",
  Daily: "يومي",
  Monthly: "شهري",
  Yearly: "سنوي",
  Custom: "تخصيص",
};

const pollutantNamesEnglish = {
  PM10: "Particulate Matter less than 10 microns",
  PM25: "Particulate Matter less than 2.5 microns",
  NO2: "Nitrogen Dioxide",
  SO2: "Sulphur Dioxide",
  CO: "Carbon Monoxide",
  BTEX: "Benzene, Toluene, Ethylbenzene and Xylene",
  MET: "Meteorology",
  H2S: "Hydrogen Sulphide",
  O3: "Ozone",
  THC: "Total Hydrocarbons",
  VOCs: "Volatile Organic Compounds",
  NGO: "Non-Governmental Organization",
  Noise: "Noise",
};

const pollutantNamesArabic = {
  PM10: "الجسيمات الدقيقة أصغر من 10 ميكرونات",
  PM25: "الجسيمات الدقيقة أصغر من 2.5 ميكرونات",
  NO2: "ثنائي أكسيد النيتروجين",
  SO2: "ثنائي أكسيد الكبريت",
  CO: "أحادي أكسيد الكربون",
  BTEX: "البنزين، التولوين، الإيثيل بنزين، والزيلين",
  MET: "الأرصاد الجوية",
  H2S: "كبريتيد الهيدروجين",
  O3: "الأوزون",
  THC: "الهيدروكربونات الكلية",
  VOCs: "المركبات العضوية المتطايرة",
  NGO: "منظمة غير حكومية",
  Noise: "الضوضاء",
};

const pollutantThresholdLimits = {
  PM10Daily: 150,
  SO2Hourly: 350,
  SO2Daily: 150,
  SO2Yearly: 60,
  COHourly: 30,
  O3Hourly: 200,
  NO2Hourly: 400,
  NO2Daily: 150,
};

var radarOptions = {
  scales: {
    r: {
      pointLabels: {
        fontSize: 14,
      },
      suggestedMin: 0.5,
      suggestedMax: 100,
    },
  },
  plugins: {
    filler: {
      propagate: false,
    },
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      displayColors: false,
      usePointStyle: false, // Do not use point style
      caretSize: 0,
      mode: "nearest",
      intersect: false,
      callbacks: {
        label: function (context) {
          var label = context.dataset.label || "";
          if (label) {
            label += ": ";
          }
          if (context.parsed.r !== null) {
            label += context.parsed.r; // Appending 'ug/m3' to the label
          }
          return label;
        },
      },
    },
  },
  maintainAspectRatio: false,
  animation: {
    duration: 2000,
  },
};

$(window).on("load", function () {
  setTimeout(function () {
    $(".page-loader").fadeOut("slow");
  }, 3500);
});

//const video = document.getElementById('myVideo');
//if (video) {
//    video.muted = false; // Ensure video is not muted
//    video.play();
//    video.addEventListener('click', function () {
//        video.play();
//    });
//}

$(".down-arrow-bg").click(function () {
  let currentSectionIndex = 0;
  var nextSection = $(this).closest(".down-arrow").next("div");
  if (nextSection.length > 0) {
    nextSection[currentSectionIndex].scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }
});

$(window).scroll(function () {
  var scroll = $(window).scrollTop();
  if (scroll >= 600) {
    $("header").addClass("fadeout");
    $(".toggle-text").css("display", "none");
  } else {
    $("header").removeClass("fadeout");
    $(".toggle-text").css("display", "block");
  }
});

$(".show-mapSearchList").click(function () {
  $(".Newsearch-box").show();
  $(".show-mapSearchList").hide();
  $("#stationsDropdownMapSearch").val("");
});

var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

//// --Mobile Menu---------------------------
$(".navmobile-new").click(function () {
  $("#hamburger").toggleClass("open");
  $("#mobile-overlay").toggleClass("menu");
  if ($("#mobile-overlay").hasClass("menu")) {
    $(".data-sort_sidebar").hide();
  } else {
    $(".data-sort_sidebar").show();
  }
});

//// --Mobile Menu-------------------------
$(".mobile-menu a").click(function () {
  $(".mobile-menu a").removeClass("active");
  $(this).addClass("active");
  $("#hamburger").removeClass("open");
  $("#mobile-overlay").removeClass("menu");
});

// Project Section Slider &  modal start--------------

$(document).ready(function () {
  if (window.innerWidth < 1030) {
    // Open Sidebar
    $(".openSidebar").click(function () {
      $(".sidebar").css("width", "97%");
      $(".modal-background").addClass("project-modal");
    });
  } else {
    // Open Sidebar
    $(".openSidebar").click(function () {
      $(".sidebar").css("width", "40%");
      $(".modal-background").addClass("project-modal");
      $("body").addClass("project-modal-header");
    });
  }

  // Close Sidebar
  $(".close-btn").click(function () {
    $(".sidebar").css("width", "0");
    $(".modal-background").removeClass("project-modal");
    $("body").removeClass("project-modal-header");
  });

  var quotes = $(".quotes");
  var quoteIndex = -1;
  var hasShown = false;

  function showNextQuote() {
    ++quoteIndex;
    quotes.eq(quoteIndex % quotes.length).fadeIn(2000, function () {
      $(this).css("display", "block");
    });
  }
  $(document).ready(function () {
    setTimeout(function () {
      showNextQuote();
    }, 4000);
  });

  $("#currentDate").html(getFormattedDate(new Date()));

  $("#last-updatedTime").html(getFormattedDate1(new Date()));
  $("#last-updatedTime-sm").html(getFormattedDate1(new Date()));
  activePollutant = pollutantAbbrevations.AQI;
  currentStationDetails = stationsWithLocations.find((x) => x.stationId == "");
  $("#aqiBasedSort").attr("checked", "checked");
  bindYearsToDropDown();
  getCurrentLocation();

  $(".datepicker").on("change", function () {
    $(".datepicker").val($(this).val());
    $(
      "#lineChartAqiSo2Value, #lineChartAqiNo2Value, #lineChartAqiCoValue, #lineChartAqiPm10Value,#lineChartAqiPm25Value, #lineChartAqiO3Value"
    ).text("");
    // getStationChartApi(chartFilter.Custom);
    getStationChartApi(
      currentLanguage === "arabic"
        ? chartFilterArabic.Custom
        : chartFilter.Custom
    );
  });

  document
    .getElementById("stationsDropdownMapSearch")
    .addEventListener("input", function () {
      var searchText = this.value.toLowerCase().replace(/\s+/g, ""); // Remove spaces from search text
      var listItems = document.querySelectorAll(".listSearch li");

      listItems.forEach(function (item) {
        var stationName = item
          .querySelector(".station-name")
          .textContent.toLowerCase()
          .replace(/\s+/g, ""); // Remove spaces from station name
        var regionName = item
          .querySelector(".region-name")
          .textContent.toLowerCase()
          .replace(/\s+/g, ""); // Remove spaces from region name

        if (
          stationName.includes(searchText) ||
          regionName.includes(searchText)
        ) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
});

function showHideToggleDiv(tabId, pollutant) {
  if (
    pollutant === "PM10" ||
    pollutant === "PM25" ||
    pollutant === "SO2" ||
    pollutant === "CO" ||
    pollutant === "O3" ||
    pollutant === "NO2"
  ) {
    document.getElementById("myTabs").classList.add("upperTop");
  } else {
    // Remove the class 'upperTop' from the ul if another tab is clicked
    document.getElementById("myTabs").classList.remove("upperTop");
  }
  document.querySelectorAll(".tab-content.mt-0").forEach(function (div) {
    div.style.display = "none";
  });
  document.getElementById(tabId).style.display = "block";
  activePollutant = pollutant;
  bindStationDataToBarChart($("#barChartFilter").text());

  updateThreshold(pollutant, $("#barChartFilter").text());
}

function updateThreshold(pollutant, timeFilter) {
  // Use regular expressions to replace whitespace and trim
  pollutant = pollutant.replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "");
  timeFilter = timeFilter.replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "");

  const thresholdKey = `${pollutant}${timeFilter}`;
  const thresholdValue = pollutantThresholdLimits[thresholdKey];
  // If the element exists, update its text content
  const thresholdElementId = `${pollutant.toLowerCase()}thresholdValue`;
  const thresholdElement = document.getElementById(thresholdElementId);
  if (pollutantThresholdLimits.hasOwnProperty(thresholdKey)) {
    //document.getElementById('pm10thresholdValue').textContent = thresholdValue || 'N/A';
    if (thresholdElement.id === "cothresholdValue") {
      thresholdElement.textContent = "(" + thresholdValue + " mg/m³)";
    } else {
      thresholdElement.textContent = "(" + thresholdValue + " ug/m³)";
    }
    //alert(thresholdElement);
  } else {
    if (thresholdElement != null) {
      thresholdElement.textContent = thresholdValue;
    }
  }
}

$(".dropdown-change li a").click(function () {
  var selText = $(this).text();
  $(this).parents(".btn-group").find(".quality-button-dropdown").text(selText);
  if (!$(this).hasClass("active")) {
    $(".dropdown-change li a").removeClass("active");
    $(this).addClass("active");
  }
  updateThreshold(activePollutant, selText);
});

$(function () {
  $("#myTabs .nav-item .nav-link").click(function () {
    if (!$(this).hasClass("active")) {
      $("#myTabs .nav-item .nav-link").removeClass("active");
      $(this).addClass("active");
    }
  });
});

$(".down-arrow").on("click", function () {
  fullpage_api.moveTo("slide1");
});

$(".insight-btn").on("click", function () {
  fullpage_api.moveTo("slide2");
});

$(".insight-btn-tab").on("click", function () {
  $("html, body").animate(
    {
      scrollTop: $("#section2").offset().top,
    },
    700
  );
});

document.getElementById("expandTrigger").addEventListener("click", function () {
  document.getElementById("sidebar").classList.toggle("expanded");
  document.body.classList.toggle("sidebar-expanded-position");
});
$(document).ready(function () {
  var thirdSection = $("#section2");
  var classToAdd = "highlight";

  $(window).scroll(function () {
    var scrollPosition = $(window).scrollTop();

    // Adjust the offset value as needed
    var thirdSectionOffset = thirdSection.offset().top;
    var thirdSectionHeight = thirdSection.height();

    // Check if the scroll position is within the range of the third section
    if (
      scrollPosition >= thirdSectionOffset &&
      scrollPosition < thirdSectionOffset + thirdSectionHeight
    ) {
      thirdSection.addClass(classToAdd);
    } else {
      thirdSection.removeClass(classToAdd);
    }

    // Check if the scroll position is beyond the start of section 3
    var section3Offset = $("#section3").offset().top;
    if (scrollPosition >= section3Offset) {
      thirdSection.removeClass(classToAdd);
    }
  });
});

$(document).ready(function () {
  $("#sidebar-btn").on("click", function () {
    $("#sidebar").toggleClass("visible");
  });

  $(".iconimg").on("click", function () {
    $(".info-popup").show();
  });
  $(".ic-top-position").on("click", function () {
    $(".info-topPosition").show();
  });
  $(".crossicon1").on("click", function () {
    $(".info-topPosition").hide();
  });

  $(".pollu-top-position").on("click", function () {
    $(".info-topPosition1").show();
  });
  $(".crossicon2").on("click", function () {
    $(".info-topPosition1").hide();
  });

  $(".crossicon").on("click", function () {
    $(".info-popup").hide();
  });

  $(".quality-index-dropItem").click(function () {
    var el = $(".btn-group-filter");
    if (
      $(this).text() == chartFilter.Custom ||
      $(this).text() == chartFilterArabic.Custom
    ) {
      el.find(".date-box").removeClass("calen-box-hide");
      el.find(".quality-button-dropdown").hide();
      var datepickerEl = $(this)
        .closest(".btn-group-filter")
        .find("#datepicker");
      if (!datepickerEl.val()) {
        datepickerEl.focus();
      }
    } else {
      el.find(".date-box").addClass("calen-box-hide");
      el.find(".quality-button-dropdown").show();
    }
    updateCharts($(this).text());
  });

  $(".datePickImage").click(function () {
    var el = $(".btn-group-filter");
    el.find(".date-box").addClass("calen-box-hide");
    el.find(".quality-button-dropdown").show();
    $(".dropdown-change").addClass("show").css("top", "40px");
    $(".dropdown-change li a").removeClass("active");
    el.find(".quality-index-dropItem:first").addClass("active");
    $(".datepicker").val("");
    updateCharts(chartFilter.Hourly);
    // Remove show class when quality-index-dropItem is clicked
    $(".dropdown-change li a").click(function () {
      $(".dropdown-change").removeClass("show").css("top", "");
    });

    // Check if it's a small device
    if (window.innerWidth <= 767) {
      $(".dropdown-change").css("top", "52px").css("right", "22px"); // Adjust for small devices
      $(".equal-station-box-height .metero-dropdown.show")
        .css("top", "40px")
        .css("right", "10px");
      $(".adjust-height-290 .scroll-yearlyDropdown")
        .css("top", "40px")
        .css("right", "0px");
    }

    if (window.innerWidth >= 768 && window.innerWidth <= 1199) {
      $(".dropdown-change").css("top", "70px").css("right", "22px");
      $(".equal-station-box-height .metero-dropdown.show")
        .css("top", "35px")
        .css("right", "13px");
      $(".adjust-height-290 .scroll-yearlyDropdown")
        .css("top", "40px")
        .css("right", "0px");
    }
    if (
      window.innerWidth >= 1355 &&
      window.innerWidth <= 1368 &&
      window.innerHeight >= 595 &&
      window.innerHeight <= 765
    ) {
      $(".dropdown-change").css("top", "43px").css("right", "16px");
      $(".adjust-height-290 .scroll-yearlyDropdown")
        .css("top", "40px")
        .css("right", "0px");
      $(".equal-station-box-height .metero-dropdown.show")
        .css("top", "16px")
        .css("right", "9px");
      $(".equal-station-box-height .st-aqi-dropdown.show")
        .css("top", "16px")
        .css("right", "16px");
    }
  });
});

let items = document.querySelectorAll(".slide-carol .carol-item");
let prevButton = document.getElementById("prev");
let nextButton = document.getElementById("next");

items.forEach((el, index) => {
  let minPerSlide = 5; // Default value for larger screens
  if (window.innerWidth < 768) {
    minPerSlide = 1;
  }
  let next = el.nextElementSibling;
  for (let i = 1; i < minPerSlide; i++) {
    if (!next) {
      // Wrap carousel by using first child
      next = items[0];
    }
    let cloneChild = next.cloneNode(true);
    el.appendChild(cloneChild.children[0]);
    next = next.nextElementSibling;
  }
});

function getAqiStatus(value) {
  if (value >= 0 && value <= 50) {
    return statusClass.Good;
  } else if (value > 50 && value <= 100) {
    return statusClass.Moderate;
  } else if (value > 100 && value <= 150) {
    return statusClass.UnHealthlySensitiveGroups;
  } else if (value > 150 && value <= 200) {
    return statusClass.UnHealthly;
  } else if (value > 200 && value <= 300) {
    return statusClass.VeryUnHealthly;
  } else {
    return statusClass.Hazardous;
  }
}

function getAqiStatusAndColorCode(value) {
  if (value >= 0 && value <= 50) {
    return {
      status:
        currentLanguage === "arabic"
          ? statusClassArabic.Good
          : statusClass.Good,
      color: colorCodes.green,
      Content:
        currentLanguage === "arabic" ? aqiContentArabic.Good : aqiContent.Good,
    };
  } else if (value > 50 && value <= 100) {
    return {
      status:
        currentLanguage === "arabic"
          ? statusClassArabic.Moderate
          : statusClass.Moderate,
      color: colorCodes.lightorange,
      Content:
        currentLanguage === "arabic"
          ? aqiContentArabic.Moderate
          : aqiContent.Moderate,
    };
  } else if (value > 100 && value <= 150) {
    return {
      status:
        currentLanguage === "arabic"
          ? statusClassArabic.UnHealthlySensitiveGroups
          : statusClass.UnHealthlySensitiveGroups,
      color: colorCodes.darkorange,
      Content:
        currentLanguage === "arabic"
          ? aqiContentArabic.UnHealthlySensitiveGroups
          : aqiContent.UnHealthlySensitiveGroups,
    };
  } else if (value > 150 && value <= 200) {
    return {
      status:
        currentLanguage === "arabic"
          ? statusClassArabic.UnHealthly
          : statusClass.UnHealthly,
      color: colorCodes.peach,
      Content:
        currentLanguage === "arabic"
          ? aqiContentArabic.UnHealthly
          : aqiContent.UnHealthly,
    };
  } else if (value > 200 && value <= 300) {
    return {
      status:
        currentLanguage === "arabic"
          ? statusClassArabic.VeryUnHealthly
          : statusClass.VeryUnHealthly,
      color: colorCodes.purple,
      Content:
        currentLanguage === "arabic"
          ? aqiContentArabic.VeryUnHealthly
          : aqiContent.VeryUnHealthly,
    };
  } else {
    return {
      status:
        currentLanguage === "arabic"
          ? statusClassArabic.Hazardous
          : statusClass.Hazardous,
      color: colorCodes.hazar,
      Content:
        currentLanguage === "arabic"
          ? aqiContentArabic.Hazardous
          : aqiContent.Hazardous,
    };
  }
}
function getAqiStatusAndColorCodeNew(value) {
  if (value >= 0 && value <= 50) {
    return {
      status:
        currentLanguage === "arabic"
          ? statusClassNew1Arabic.Good
          : statusClassNew1.Good,
      color: colorCodes.green,
      Content:
        currentLanguage === "arabic" ? aqiContentArabic.Good : aqiContent.Good,
    };
  } else if (value > 50 && value <= 100) {
    return {
      status:
        currentLanguage === "arabic"
          ? statusClassNew1Arabic.Moderate
          : statusClassNew1.Moderate,
      color: colorCodes.lightorange,
      Content:
        currentLanguage === "arabic"
          ? aqiContentArabic.Moderate
          : aqiContent.Moderate,
    };
  } else if (value > 100 && value <= 150) {
    return {
      status:
        currentLanguage === "arabic"
          ? statusClassNew1Arabic.UnHealthlySensitiveGroups
          : statusClassNew1.UnHealthlySensitiveGroups,
      color: colorCodes.darkorange,
      Content:
        currentLanguage === "arabic"
          ? aqiContentArabic.UnHealthlySensitiveGroups
          : aqiContent.UnHealthlySensitiveGroups,
    };
  } else if (value > 150 && value <= 200) {
    return {
      status:
        currentLanguage === "arabic"
          ? statusClassNew1Arabic.UnHealthly
          : statusClassNew1.UnHealthly,
      color: colorCodes.peach,
      Content:
        currentLanguage === "arabic"
          ? aqiContentArabic.UnHealthly
          : aqiContent.UnHealthly,
    };
  } else if (value > 200 && value <= 300) {
    return {
      status:
        currentLanguage === "arabic"
          ? statusClassNew1Arabic.VeryUnHealthly
          : statusClassNew1.VeryUnHealthly,
      color: colorCodes.purple,
      Content:
        currentLanguage === "arabic"
          ? aqiContentArabic.VeryUnHealthly
          : aqiContent.VeryUnHealthly,
    };
  } else {
    return {
      status:
        currentLanguage === "arabic"
          ? statusClassNew1Arabic.Hazardous
          : statusClassNew1.Hazardous,
      color: colorCodes.hazar,
      Content:
        currentLanguage === "arabic"
          ? aqiContentArabic.Hazardous
          : aqiContent.Hazardous,
    };
  }
}
function getColorClassForAqi(aqi) {
  if (aqi >= 0 && aqi <= 50) {
    return colorClass.GoodColorClass;
  } else if (aqi > 50 && aqi <= 100) {
    return colorClass.ModrateColorClass;
  } else if (aqi > 100 && aqi <= 150) {
    return colorClass.Unhealthy4peopleColorClass;
  } else if (aqi > 150 && aqi <= 200) {
    return colorClass.UnhealthyColorClass;
  } else if (aqi > 200 && aqi <= 300) {
    return colorClass.VeryUnhealthyColorClass;
  } else {
    return colorClass.HazardousClass;
  }
}

// Function to calculate distance between two points (in kilometers)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Function to find the nearest station
function findNearestStation(currentLat, currentLong) {
  //let nearestStation;
  let shortestDistance = Infinity;

  stationsWithLocations.forEach((station) => {
    const distance = calculateDistance(
      currentLat,
      currentLong,
      station.latitude,
      station.longitude
    );
    if (distance < shortestDistance) {
      shortestDistance = distance;
      nearestStation = station;
    }
  });

  return nearestStation;
}

function createRadarData() {
  return {
    labels: labelsData,
    fill: false,
    datasets: [
      {
        label: "",
        backgroundColor: function (context) {
          return createRadialGradient3(context);
        },
        pointBackgroundColor: "rgba(250, 207, 57, 1)",
        lineTension: 0.2,
        data: pollutantLevels,
      },
    ],
  };
}

function createRadialGradient3(context) {
  const chartArea = context.chart.chartArea;
  if (!chartArea) {
    // This case happens on initial chart load
    return;
  }
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;

  width = chartWidth;
  height = chartHeight;
  const centerX = (chartArea.left + chartArea.right) / 2;
  const centerY = (chartArea.top + chartArea.bottom) / 2;

  const ctx = context.chart.ctx;

  var gradient = ctx.createConicGradient(-1.479, centerX, centerY);

  var gradientStop = (colorCodesForAirAnalytics.length / 12) * 0.1;
  var colorGradient = 0;
  colorCodesForAirAnalytics.forEach((item) => {
    gradient.addColorStop(colorGradient, item);
    if (colorGradient + gradientStop < 1) {
      colorGradient += gradientStop;
    }
  });

  ctx.fillStyle = gradient;
  ctx.fillRect(chartArea.left, chartArea.top, chartWidth, chartHeight);

  return gradient;
}

//function getCurrentLocation() {
//    navigator.permissions.query({ name: 'geolocation' }).then(function (permissionStatus) {
//        console.log('Permission status:', permissionStatus.state);
//        if (permissionStatus.state === 'granted' || permissionStatus.state === 'prompt') {
//            navigator.geolocation.getCurrentPosition(function success(position) {
//                latitude = position.coords.latitude;
//                longitude = position.coords.longitude;
//                currentStationDetails = findNearestStation(latitude, longitude);
//                nearestStation = currentStationDetails;
//                hasAccessToLocation = true;
//                getLiveCityRankingApi(hasAccessToLocation);
//                loadStationData();
//            }, function error() {
//                hasAccessToLocation = false;
//                //loadStationData();
//                getLiveCityRankingApi(hasAccessToLocation);

//            });
//        }
//        else {
//            hasAccessToLocation = false;
//            //loadStationData();
//            getLiveCityRankingApi(hasAccessToLocation);
//        }
//    }).catch(function (error) {
//        hasAccessToLocation = false;
//        //loadStationData();
//        getLiveCityRankingApi(hasAccessToLocation);
//    });
//}
function getCurrentLocation() {
  if ("geolocation" in navigator) {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (permissionStatus) {
        if (
          permissionStatus.state === "granted" ||
          permissionStatus.state === "prompt"
        ) {
          navigator.geolocation.getCurrentPosition(
            function success(position) {
              latitude = position.coords.latitude;
              longitude = position.coords.longitude;
              currentStationDetails = findNearestStation(latitude, longitude);
              nearestStation = currentStationDetails;
              hasAccessToLocation = true;
              getLiveCityRankingApi(hasAccessToLocation, function () {
                // This function will be called once getLiveCityRankingApi is completed
                loadStationData();
              });
            },
            function error(err) {
              console.error("Error getting location:", err.message);
              handleGeolocationError(err);
            }
          );
        } else {
          console.warn("Geolocation permission denied.");
          handleGeolocationError({
            code: 1,
            message: "Geolocation permission denied",
          });
        }
      })
      .catch(function (error) {
        console.error("Error querying geolocation permission:", error);
        handleGeolocationError(error);
      });
  } else {
    console.error("Geolocation is not supported by this browser.");
    handleGeolocationError({ code: 0, message: "Geolocation not supported" });
  }
}

function handleGeolocationError(error) {
  const hasAccessToLocation = false;
  console.error("Geolocation error:", error);
  getLiveCityRankingApi(hasAccessToLocation, true);
  // Uncomment if needed: loadStationData();
}

function sortStations(el) {
  var isCurrentElementChecked = el.checked;
  $(".sortIcon").each(function (index, item) {
    $(item).removeAttr("checked");
  });
  if (isCurrentElementChecked) {
    el.checked = true;
  }
  populateSort($(el).val());
}

function populateSort(sortBy) {
  if (liveCityData.length > 0) {
    var stationRankingListDiv = $("#stationRankingList");
    // Clear existing rows
    stationRankingListDiv.empty();
    if (sortBy === "name") {
      liveCityData.sort(function (a, b) {
        // Ensure both properties exist and are strings
        var nameA = a[sortBy] ? String(a[sortBy]) : "";
        var nameB = b[sortBy] ? String(b[sortBy]) : "";

        // Descending order comparison
        return nameA.localeCompare(nameB);
      });
    } else {
      liveCityData.sort(function (a, b) {
        var aSortValue = a[sortBy] !== undefined ? a[sortBy] : 0;
        var bSortValue = b[sortBy] !== undefined ? b[sortBy] : 0;

        // Assuming you still want to support descending order for numerical values
        return aSortValue - bSortValue;
      });
    }

    $.each(liveCityData, function (index, station) {
      var stationDetails = stationsWithLocations.find(
        (x) => x.stationId == station.stationName
      );
      if (stationDetails) {
        var colorCode = colorCodes[getColorClassForAqi(station.aqi)];
        station.rank = index + 1;

        // Create elements dynamically
        var label = document.createElement("label");
        label.className = "list-group-item";

        var spanNumber = document.createElement("span");
        spanNumber.className = "numbers number";
        spanNumber.style.borderColor = colorCode; // Removed !important as it is not necessary here

        var strong = document.createElement("strong");
        strong.style.color = colorCode;
        strong.textContent = station.rank;
        spanNumber.appendChild(strong);

        var listContent = document.createElement("div");
        listContent.className = "list-content";

        var innerListContent = document.createElement("div");
        innerListContent.className = "inner_list-content text-left";

        var p = document.createElement("p");
        p.textContent = station.name;
        innerListContent.appendChild(p);

        var spanAQI = document.createElement("span");
        spanAQI.style.color = colorCode;
        spanAQI.className =
          currentLanguage === "arabic" ? "aqi-content-span" : "";
        spanAQI.textContent = "AQI " + station.aqi;
        innerListContent.appendChild(spanAQI);

        var disContent = document.createElement("div");
        disContent.className = "dis-content";

        var spanDistance = document.createElement("span");
        spanDistance.textContent =
          "~ " +
          station.distance +
          (currentLanguage === "arabic" ? "كم" : "km");
        disContent.appendChild(spanDistance);

        listContent.appendChild(innerListContent);
        listContent.appendChild(disContent);

        var input = document.createElement("input");
        input.type = "radio";
        input.name = "options";
        input.id = stationDetails.stationId;
        input.value = stationDetails.stationId;
        input.autocomplete = "off";
        input.className =
          "float-end" +
          (currentLanguage === "arabic" ? " rtl-stationsData" : "");
        input.onclick = function () {
          selectedStation(stationDetails.stationId);
        };

        label.appendChild(spanNumber);
        label.appendChild(listContent);
        label.appendChild(input);

        stationRankingListDiv.append(label);
      }
    });
    if (currentStationDetails.stationId) {
      $("#" + currentStationDetails.stationId).attr("checked", "checked");
    }
  }
}

function getStationNameInSelectedLanguage(stationName) {
  const station = stations.find((st) => st.en === stationName);
  if (!station) return currentStationDetails.stationName; // Fallback to original if not found

  return currentLanguage === "arabic"
    ? {
        stationName: station.ar,
        regionName: station.regionar,
        aqi: station.aqi,
      }
    : {
        stationName: currentStationDetails.stationName,
        regionName: currentStationDetails.regionName,
        aqi: station.aqi,
      };
}

function loadStationData(initialRequest = false) {
  const apiUrl =
    baseUrl +
    "GetAirQualityStation?input=" +
    encodeURIComponent(currentStationDetails.stationId);
  const { stationName, regionName } = getStationNameInSelectedLanguage(
    currentStationDetails.stationName
  );
  const updatedStationData =
    currentLanguage === "arabic"
      ? "المحطة:" + " " + stationName + "," + regionName
      : "Station:" + " " + stationName + ", " + regionName;
  $.ajax({
    url: apiUrl,
    method: "GET",
    dataType: "json",
    success: function (data) {
      try {
        if (!data || typeof data !== "object") {
          throw new Error("Invalid data received from API");
        }

        var aqi = Math.round(data.averageAQI);
        const aqiDetails = getAqiStatusAndColorCode(aqi);
        const aqiDetailsNew = getAqiStatusAndColorCodeNew(aqi);
        const currentYearOverview = new Date().getFullYear();
        const currentStationName = currentStationDetails.stationName;
        const updateyearlyAirQualityOverview =
          currentLanguage === "arabic"
            ? stationName +
              ", " +
              regionName +
              "نظرة عامة عن جودة الهواء لسنة" +
              currentYearOverview
            : stationName +
              ", " +
              regionName +
              " Yearly Air Quality Overview for " +
              currentYearOverview;
        // Set text content safely
        $("#lineChartAqiValueStatus, #lineChartPollutantValueStatus")
          .text(aqi + " " + aqiDetailsNew.status)
          .css("color", aqiDetailsNew.color);
        $(
          "#averageAqi, #airQualitySafetyLevelAqi, #insightsAqi, #sideBarAqi, #mobileAQILevelValue"
        )
          .text(aqi)
          .css("color", aqiDetails.color);
        $(
          "#averageAqiStatus, #insightsAqiStatus, #sideBarAqiStatus, #mobileAQIStatus"
        )
          .text(aqiDetailsNew.status)
          .css("color", aqiDetailsNew.color);
        $("#airQualitySafetyLevelAqiStatus")
          .text(aqiDetailsNew.status)
          .css("color", aqiDetailsNew.color);
        if (stationName && regionName) {
          $(
            "#aqiNearestStation, #insightNearestStation, #sidebarNearestStation, #mobileNearestStation"
          ).text(
            (hasAccessToLocation ? " " : " ") + stationName + ", " + regionName
          );
          $("#airQualitySafetyLevelStation").text(updatedStationData);
          $("#yearlyAirQualityOverview").text(updateyearlyAirQualityOverview);
          $("#SidebaryearlyAirQualityOverview").text(
            updateyearlyAirQualityOverview
          );
        }
        $("#airContent")
          .text(aqiDetails.Content)
          .css("color", aqiDetails.color);

        let mainPollutantNameContent;
        // switch (data.pollutantName) {
        //     case "PM10":
        //         mainPollutantNameContent = `Particulate Matter, PM<sub>10</sub>`;
        //         break;
        //     case "PM25":
        //         mainPollutantNameContent = `Particulate Matter, PM<sub>2.5</sub>`;
        //         break;
        //     case "SO2":
        //         mainPollutantNameContent = `Sulphur Dioxide, SO<sub>2</sub>`;
        //         break;
        //     case "O3":
        //         mainPollutantNameContent = `Ozone, O<sub>3</sub>`;
        //         break;
        //     case "NO2":
        //         mainPollutantNameContent = `Nitrogen dioxide, NO<sub>2</sub>`;
        //         break;
        //     case "CO":
        //         mainPollutantNameContent = `Carbon monoxide, CO`;
        //         break;
        //     default:
        //         mainPollutantNameContent = `Unknown pollutant`;
        // }

        switch (data.pollutantName) {
          case "PM10":
            mainPollutantNameContent =
              currentLanguage === "arabic"
                ? `الجسيمات الدقيقة ,PM<sub>10</sub>`
                : `Particulate Matter, PM<sub>10</sub>`;
            break;
          case "PM25":
            mainPollutantNameContent =
              currentLanguage === "arabic"
                ? `الجسيمات الدقيقة, PM<sub>2.5</sub>`
                : `Particulate Matter, PM<sub>2.5</sub>`;
            break;
          case "SO2":
            mainPollutantNameContent =
              currentLanguage === "arabic"
                ? `ثاني أكسيد الكبريت، SO<sub>2</sub>`
                : `Sulphur Dioxide, SO<sub>2</sub>`;
            break;
          case "O3":
            mainPollutantNameContent =
              currentLanguage === "arabic"
                ? `الأوزون، O<sub>3</sub>`
                : `Ozone, O<sub>3</sub>`;
            break;
          case "NO2":
            mainPollutantNameContent =
              currentLanguage === "arabic"
                ? `ثاني أكسيد النيتروجين، NO<sub>2</sub>`
                : `Nitrogen dioxide, NO<sub>2</sub>`;
            break;
          case "CO":
            mainPollutantNameContent =
              currentLanguage === "arabic"
                ? `أول أكسيد الكربون، CO`
                : `Carbon monoxide, CO`;
            break;
          default:
            mainPollutantNameContent =
              currentLanguage === "arabic"
                ? `ملوث غير معروف`
                : `Unknown pollutant`;
        }

        // Update the main pollutant name in the UI
        $("#mainPollutantName").html(mainPollutantNameContent).css({
          "background-color": "rgba(0, 75, 135, 1)",
          color: "white",
        });
        const currentPollutant = data.pollutantName;
        updateCauses(stationName, data.pollutantName);
        updateLegendVisibility();
        updateActivities(aqi);
        updateHeathReccommendation(aqi);
        bindStationInfo();

        const pollutantColorClass = getColorClassForAqi(aqi);
        $(
          "#mainPollutantName, #mainPollutantValue, #windSpeed, #windDirection, #relativeHumidity, #temperature, #mobileWindSpeed, #mobileWindDirection, #mobileRelativeHumidity, #mobileTemperature, #smallScreenwindSpeed, #smallScreenWindDirection, #smallScreenHumidity, #smallScreenTemperature"
        ).empty();
        $("#mainPollutantName").html(mainPollutantNameContent).css({
          "background-color": "rgba(0, 75, 135, 1)",
          color: "white",
        });
        $("#mainPollutantValue")
          .text(data.pollutantValue + "ug/m³")
          .css("color", "rgba(0, 75, 135, 1)");
        updateText("#windSpeed", data.windSpeed, "m/s");
        updateText("#windDirection", data.direction, "");
        updateText("#relativeHumidity", data.relativeHumidity, "%");
        updateText("#temperature", data.temperature, "°C");
        updateText("#mobileWindSpeed", data.windSpeed, "m/s");
        updateText("#mobileWindDirection", data.direction, "");
        updateText("#mobileRelativeHumidity", data.relativeHumidity, "%");
        updateText("#mobileTemperature", data.temperature, "°C");
        updateText("#smallScreenwindSpeed", data.windSpeed, "m/s");
        updateText("#smallScreenWindDirection", data.direction, "");
        updateText("#smallScreenHumidity", data.relativeHumidity, "%");
        updateText("#smallScreenTemperature", data.temperature, "°C");

        function updateText(selector, value, unit) {
          if (value === 0) {
            $(selector).text("--");
          } else {
            $(selector).text(value + " " + unit);
          }
        }

        $(".page-loader").fadeOut("slow");
        getYearlyStationPollutantsThreshold();
        getAirAnalytics($("#selectedyear").text());
        getAirQualitySafetyLevel();

        if (
          !(
            initialRequest ||
            currentStationDetails.measuredPolluants.includes(activePollutant)
          )
        ) {
          activePollutant = pollutantAbbrevations.AQI;
          showHideToggleDiv(
            activePollutant.toLowerCase() + "Tab",
            activePollutant
          );
          $("#myTabs .nav-item .nav-link").removeClass("active");
          $("#aqiTabToggle").addClass("active");
        }

        getStationChartApi($("#barChartFilter").text(), initialRequest);
      } catch (error) {
        console.error("Error processing data in loadStationData:", error);
        handleApiError(error);
        reject(error);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Error loading station data:", textStatus, errorThrown);
      handleApiError({ jqXHR, textStatus, errorThrown });
    },
  });
}

function getAQILevel(value) {
  if (value >= 0 && value <= 50) return "good";
  if (value >= 51 && value <= 100) return "moderate";
  if (value >= 101 && value <= 150) return "unhealthyForSensitiveGroups";
  if (value >= 151 && value <= 200) return "unhealthy";
  if (value >= 201 && value <= 300) return "veryUnhealthy";
  return "hazardous";
}

function getActivityContent(aqiLevel) {
  const activities = {
    good: [
      { img: "run_green.png", text: "Have fun outdoors" },
      { img: "cycle_green.png", text: "Enjoy outdoor cycling" },
      {
        img: "heart_green.png",
        text: "Babies & sensitive persons can have fun outdoor",
      },
      { img: "dinner_green.png", text: "Enjoy your meal outdoors" },
    ],
    moderate: [
      { img: "run_green.png", text: "Have fun outdoors" },
      { img: "cycle_green.png", text: "Enjoy outdoor cycling" },
      {
        img: "heart_orange.png",
        text: "Babies & sensitive individuals should be careful",
      },
      { img: "dinner_green.png", text: "Enjoy your meal outdoors" },
    ],
    unhealthyForSensitiveGroups: [
      { img: "run_orange.png", text: "Avoid prolonged exposure" },
      { img: "cycle_orange.png", text: "Avoid prolonged exposure" },
      {
        img: "heart_red.png",
        text: "Avoid prolonged exposure for babies and sensitive individuals",
      },
      { img: "dinner_orange.png", text: "Avoid prolonged exposure" },
    ],
    unhealthy: [
      { img: "run_red.png", text: "Enjoy some indoor fun" },
      { img: "cycle_red.png", text: "Try indoor cycling" },
      {
        img: "heart_hazar.png",
        text: "Being indoors is the best option for babies and sensitive individuals",
      },
      { img: "dinner_red.png", text: "Enjoy your meal indoors, if possible" },
    ],
    veryUnhealthy: [
      { img: "run_hazar.png", text: "Avoid outdoor activities" },
      { img: "cycle_hazar.png", text: "Avoid outdoor cycling" },
      {
        img: "heart_brown.png",
        text: "Avoid the outdoors for babies and sensitive individuals",
      },
      { img: "dinner_hazar.png", text: "Enjoy your meal indoors" },
    ],
    hazardous: [
      { img: "run_brown.png", text: "Avoid outdoor activities" },
      { img: "cycle_brown.png", text: "Avoid outdoor cycling" },
      {
        img: "heart_brown.png",
        text: "Avoid the outdoors for babies and sensitive individuals",
      },
      { img: "dinner_brown.png", text: "Enjoy your meal indoors" },
    ],
  };

  const activitiesArabic = {
    good: [
      { img: "run_green.png", text: "استمتع بوقتك في الهواء الطلق" },
      { img: "cycle_green.png", text: "استمتع بركوب الدراجات الهوائية في الخارج" },
      {
        img: "heart_green.png",
        text: "يمكن للأطفال والأشخاص ضمن الفئة الحساسة الاستمتاع في الهواء الطلق",
      },
      { img: "dinner_green.png", text: "استمتع بوجبتك في الهواء الطلق " },
    ],
    moderate: [
      { img: "run_green.png", text: "استمتع بوقتك في الهواء الطلق" },
      { img: "cycle_green.png", text: "استمتع بركوب الدراجات الهوائية في الخارج" },
      { img: "heart_orange.png", text: "على الفئة الحساسة توخي الحذر" },
      { img: "dinner_green.png", text: "استمتع بوجبتك في الهواء الطلق " },
    ],
    unhealthyForSensitiveGroups: [
      { img: "run_orange.png", text: "تجنب التعرض للملوثات لفترات طويلة" },
      { img: "cycle_orange.png", text: "تجنب التعرض للملوثات لفترات طويلة" },
      {
        img: "heart_red.png",
        text: "على الأشخاص ضمن الفئة الحساسة والأطفال تجنب التعرض لفترات طويلة",
      },
      { img: "dinner_orange.png", text: "تجنب التعرض للملوثات لفترات طويلة" },
    ],
    unhealthy: [
      { img: "run_red.png", text: "استمتع بالأنشطة في الأماكن المغلقة" },
      {
        img: "cycle_red.png",
        text: "استمتع بركوب الدراجات الهوائية في الأماكن المغلقة",
      },
      {
        img: "heart_hazar.png",
        text: "البقاء في الداخل هو الخيار الأفضل للأطفال الرضع والأفراد الحساسين",
      },
      { img: "dinner_red.png", text: "استمتع بوجبتك في الأماكن المغلقة" },
    ],
    veryUnhealthy: [
      { img: "run_hazar.png", text: "تجنب الأنشطة الخارجية" },
      { img: "cycle_hazar.png", text: "تجنب ركوب الدراجات الهوائية في الخارج" },
      {
        img: "heart_brown.png",
        text: "تجنب الأماكن الخارجية",
      },
      { img: "dinner_hazar.png", text: "استمتع بوجبتك في الأماكن المغلقة" },
    ],
    hazardous: [
      { img: "run_brown.png", text: "تجنب الأنشطة الخارجية" },
      { img: "cycle_brown.png", text: "تجنب ركوب الدراجات الهوائية في الخارج" },
      {
        img: "heart_brown.png",
        text: "تجنب الأماكن الخارجية",
      },
      { img: "dinner_brown.png", text: "استمتع بوجبتك في الأماكن المغلقة" },
    ],
  };

  const selectedActivities =
    currentLanguage === "arabic" ? activitiesArabic : activities;

  return selectedActivities[aqiLevel]
    .map(
      (activity) => `
        <div class="text-center">
            <img src="./images/new-images/${activity.img}" alt="">
            <p class="mt-2 enjoy-mb-8">${activity.text}</p>
        </div>
    `
    )
    .join("");
}

function getHealthRecommendationContent(aqiLevel) {
  const recommendations = {
    good: [
      {
        img: "mask1.png",
        title: "Mask usage",
        description:
          "Enjoy the fresh air! No need for masks when the air quality is good.",
      },
      {
        img: "health_kit2.png",
        title: "Indoor air quality maintenance",
        description:
          "An excellent time to open your windows for fresh air circulation.",
      },
      {
        img: "health_kit3.png",
        title: "Switching on your air purifier",
        description: "No need to switch on your air purifier.",
      },
    ],
    moderate: [
      {
        img: "mask1.png",
        title: "Mask usage",
        description: "Wearing a mask is recommended for sensitive groups.",
      },
      {
        img: "health_kit2.png",
        title: "Indoor air quality maintenance",
        description:
          "Exercise caution when circulating the air to ensure healthy indoor air quality.",
      },
      {
        img: "health_kit3.png",
        title: "Switching on your air purifier",
        description:
          "Keep the air purifier running when sensitive individuals are present.",
      },
    ],
    unhealthyForSensitiveGroups: [
      {
        img: "mask1.png",
        title: "Mask usage",
        description:
          "Wearing a mask is recommended for sensitive groups, along with limiting outdoor exposure.",
      },
      {
        img: "health_kit2.png",
        title: "Indoor air quality maintenance",
        description:
          "Exercise caution when circulating air, especially around sensitive groups.",
      },
      {
        img: "health_kit3.png",
        title: "Switching on your air purifier",
        description:
          "Keep the air purifier running when sensitive individuals are present.",
      },
    ],
    unhealthy: [
      {
        img: "mask1.png",
        title: "Mask usage",
        description:
          "Wearing a mask is recommended, along with limiting outdoor activity.",
      },
      {
        img: "health_kit2.png",
        title: "Indoor air quality maintenance",
        description:
          "Circulating air is not recommended, particularly in situations involving sensitive individuals.",
      },
      {
        img: "health_kit3.png",
        title: "Switching on your air purifier",
        description:
          "Switching on your air purifier is recommended for healthy indoor air quality.",
      },
    ],
    veryUnhealthy: [
      {
        img: "mask1.png",
        title: "Mask usage",
        description:
          "Wearing a mask is highly recommended, along with staying indoors. Stay safe!",
      },
      {
        img: "health_kit2.png",
        title: "Indoor air quality maintenance",
        description:
          "Circulating air is strongly discouraged due to potential risks.",
      },
      {
        img: "health_kit3.png",
        title: "Switching on your air purifier",
        description:
          "Switching on your air purifier is highly advised for healthy indoor air quality.",
      },
    ],
    hazardous: [
      {
        img: "mask1.png",
        title: "Mask usage",
        description:
          "Wearing a mask is highly recommended, along with staying indoors. Stay safe!",
      },
      {
        img: "health_kit2.png",
        title: "Indoor air quality maintenance",
        description:
          "Circulating air is strongly discouraged due to potential risks.",
      },
      {
        img: "health_kit3.png",
        title: "Switching on your air purifierr",
        description:
          "Switching on your air purifier is highly advised for healthy indoor air quality.",
      },
    ],
    // Add definitions for other AQI levels...
  };
  const recommendationsInArabic = {
    good: [
      {
        img: "mask1.png",
        title: "استخدام الكمامة",
        description:
          "استمتع بالهواء النقي! لا حاجة لارتداء الكمامات عندما تكون جودة الهواء جيدة.",
      },
      {
        img: "health_kit2.png",
        title: "تحسين جودة الهواء الداخلي",
        description: "فتح النوافذ في هذا الوقت يمنحك فرصة لتمرير الهواء النقي",
      },
      {
        img: "health_kit3.png",
        title: "تشغيل جهاز تنقية الهواء",
        description: "لا حاجة لتشغيل جهاز تنقية الهواء.",
      },
    ],
    moderate: [
      {
        img: "mask1.png",
        title: "استخدام الكمامة",
        description: "يوصى بارتداء الكمامة للفئة الحساسة.",
      },
      {
        img: "health_kit2.png",
        title: "تحسين جودة الهواء الداخلي",
        description: "كن حذرًا عند تهوية المكان لضمان جودة هواء صحية في الداخل",
      },
      {
        img: "health_kit3.png",
        title: "تشغيل جهاز تنقية الهواء",
        description: "استمر بتشغيل جهاز تنقية الهواء عند وجود الأشخاص ذوي الفئة الحساسية",
      },
    ],
    unhealthyForSensitiveGroups: [
      {
        img: "mask1.png",
        title: "استخدام الكمامة",
        description:
          "يوصى بارتداء الكمامة للفئة الحساسة، مع الحد من الأنشطة الخارجية.",
      },
      {
        img: "health_kit2.png",
        title: "تحسين جودة الهواء الداخلي",
        description:
          "كن حذرًا عند تهوية المكان، خاصةً بالقرب من الأشخاص ذوي الفيئة الحساسة.",
      },
      {
        img: "health_kit3.png",
        title: "تشغيل جهاز تنقية الهواء",
        description: "استمر بتشغيل جهاز تنقية الهواء عند وجود الأشخاص ذوي الفئة الحساسية",
      },
    ],
    unhealthy: [
      {
        img: "mask1.png",
        title: "استخدام الكمامة",
        description: "يوصى بارتداء الكمامة، مع الحد من الأنشطة الخارجية.",
      },
      {
        img: "health_kit2.png",
        title: "تحسين جودة الهواء الداخلي",
        description: "لا يُنصح بتهوية المكان، خاصة في الأماكن التي فيها أشخاص من ذوي الفئة الحساسة.",
      },
      {
        img: "health_kit3.png",
        title: "تشغيل جهاز تنقية الهواء",
        description:
          "يُنصح بتشغيل جهاز تنقية الهواء للحصول على جودة هواء صحية داخل المنزل.",
      },
    ],
    veryUnhealthy: [
      {
        img: "mask1.png",
        title: "استخدام الكمامة",
        description:
          "يوصى بشدة ارتداء الكمامة، مع البقاء في الداخل. حافظ على سلامتك!",
      },
      {
        img: "health_kit2.png",
        title: "تحسين جودة الهواء الداخلي",
        description: "يُنصح بشدة تجنب تهوية المكان نظرًا للمخاطر المحتملة.",
      },
      {
        img: "health_kit3.png",
        title: "تشغيل جهاز تنقية الهواء",
        description:
          "يُنصح بشدة تشغيل جهاز تنقية الهواء للحصول على جودة هواء صحية داخل المنزل.",
      },
    ],
    hazardous: [
      {
        img: "mask1.png",
        title: "استخدام الكمامة",
        description:
          "يوصى بشدة ارتداء الكمامة، مع البقاء في الداخل. حافظ على سلامتك!",
      },
      {
        img: "health_kit2.png",
        title: "تحسين جودة الهواء الداخلي",
        description: "يُنصح بشدة تجنب تهوية المكان نظرًا للمخاطر المحتملة.",
      },
      {
        img: "health_kit3.png",
        title: "تشغيل جهاز تنقية الهواء",
        description:
          "يُنصح بشدة تشغيل جهاز تنقية الهواء للحصول على جودة هواء صحية داخل المنزل.",
      },
    ],
  };
  const selectedRecommendations =
    currentLanguage === "arabic" ? recommendationsInArabic : recommendations;
  return selectedRecommendations[aqiLevel]
    .map(
      (recommendation) => `
        <li data-bs-toggle="modal" data-bs-target="#${recommendation.title.replace(
          /\s+/g,
          ""
        )}" data-backdrop="false">
            <div class="bg-gray">
                <img src="./images/new-images/${
                  recommendation.img
                }" alt="health-icon">
            </div>
            <p class="mask-hoverEffect">${recommendation.title}</p>
            <span>
                <img src="./images/new-images/Exclamation.png" alt="img">
            </span>
            <div class="modal fade" id="${recommendation.title.replace(
              /\s+/g,
              ""
            )}" tabindex="-1"
                aria-labelledby="exampleModalLabel" aria-hidden="true"
                data-mdb-backdrop="false" data-mdb-keyboard="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div>
                            <button type="button" class="btn-close ${
                              currentLanguage === "arabic"
                                ? "health-cross-icon"
                                : ""
                            } "
                                    data-bs-dismiss="modal"
                                    aria-label="Close">
                                <img src="./images/new-images/modal_close.png"
                                    alt="">
                            </button>
                        </div>
                        <div class="modal-body mask_body">
                            <img src="./images/new-images/Exaclamation-w.png"
                                alt="health-icon">
                            <p class="mask-use ${
                              currentLanguage === "arabic"
                                ? "mask_use_title"
                                : ""
                            } ">${recommendation.title}</p>
                            <p> ${recommendation.description}  </p>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    `
    )
    .join("");
}

function updateActivities(value) {
  const aqiLevel = getAQILevel(value);
  const content = getActivityContent(aqiLevel);
  $(".activities-imgs").empty().append(content);
  updateAQIImage(aqiLevel);
  updateInsightAQIImage(aqiLevel);
  updateSideBarAQIImage(aqiLevel);
}

function updateHeathReccommendation(value) {
  const aqiLevel = getAQILevel(value);
  const content = getHealthRecommendationContent(aqiLevel);
  $(".healthCommendation-content").empty().append(content);
}
function updateAQIImage(aqiLevel) {
  // Replace 'Circular-Shape.png' with appropriate image filenames
  var imageSrc = "./images/new-images/";
  switch (aqiLevel) {
    case "good":
      imageSrc += "AQ-pattern_green.png";
      break;
    case "moderate":
      imageSrc += "AQ-pattern_lightorange.png";
      break;
    case "unhealthyForSensitiveGroups":
      imageSrc += "AQ-pattern_orange.png";
      break;
    case "unhealthy":
      imageSrc += "AQ-pattern_red.png";
      break;
    case "veryUnhealthy":
      imageSrc += "AQ-pattern_hazar.png";
      break;
    case "hazardous":
      imageSrc += "AQ-pattern_brown.png";
      break;
    default:
      imagePath += "AQ-pattern_lightorange.png";
  }
  $("#aqiImage").attr("src", imageSrc);
}

function updateInsightAQIImage(aqiLevel) {
  // Replace 'Circular-Shape.png' with appropriate image filenames
  var imageSrc = "./images/new-images/map/";
  switch (aqiLevel) {
    case "good":
      imageSrc += "mapCircular_green.png";
      break;
    case "moderate":
      imageSrc += "mapCircular_lightorange.png";
      break;
    case "unhealthyForSensitiveGroups":
      imageSrc += "mapCircular_orange.png";
      break;
    case "unhealthy":
      imageSrc += "mapCircular_red.png";
      break;
    case "veryUnhealthy":
      imageSrc += "mapCircular_hazar.png";
      break;
    case "hazardous":
      imageSrc += "mapCircular_brown.png";
      break;
    default:
      imagePath += "mapCircular_lightorange.png";
  }
  $("#InsightaqiImage").attr("src", imageSrc);
}

function updateSideBarAQIImage(aqiLevel) {
  // Replace 'Circular-Shape.png' with appropriate image filenames
  var imageSrc = "./images/new-images/map/";
  switch (aqiLevel) {
    case "good":
      imageSrc += "mapCircular_green.png";
      break;
    case "moderate":
      imageSrc += "mapCircular_lightorange.png";
      break;
    case "unhealthyForSensitiveGroups":
      imageSrc += "mapCircular_orange.png";
      break;
    case "unhealthy":
      imageSrc += "mapCircular_red.png";
      break;
    case "veryUnhealthy":
      imageSrc += "mapCircular_hazar.png";
      break;
    case "hazardous":
      imageSrc += "mapCircular_brown.png";
      break;
    default:
      imagePath += "mapCircular_lightorange.png";
  }
  $("#sideBarAQIImage").attr("src", imageSrc);
}

function updateCauses(station, pollutant) {
  if (station === "Al Qua’a") {
    station = "Al Quaa";
  }
  const causeData =
    currentLanguage === "arabic" ? causeStationArabicData : causeStationData;
  const causesContainer = document.querySelector(".Causes-img");
  causesContainer.innerHTML = "";

  const causes = causeData[station][pollutant];

  causes?.forEach((cause) => {
    // Create new elements for the cause
    const causeDiv = document.createElement("div");
    causeDiv.className = "text-center";

    const image = document.createElement("img");
    if (station === "Liwa" && (pollutant === "SO2" || pollutant === "NO2")) {
      image.style.display = "none";
    } else {
      image.src = `./images/new-images/${cause.image}`;
    }
    //image.src = `./images/new-images/${cause.image}`;
    causeDiv.appendChild(image);

    const paragraph = document.createElement("p");

    if (station === "Liwa" && (pollutant === "SO2" || pollutant === "NO2")) {
      paragraph.classList.remove("mt-2");
    } else {
      paragraph.className = "mt-2";
    }
    paragraph.textContent = cause.cause;
    causeDiv.appendChild(paragraph);

    // Add the new cause to the container
    causesContainer.appendChild(causeDiv);
  });
}

function updateLegendVisibility() {
  const pollutants = ["PM10", "PM25", "NO2", "SO2", "CO", "O3"]; // All possible pollutants

  if (
    !currentStationDetails ||
    !Array.isArray(currentStationDetails.measuredPolluants)
  ) {
    console.error("Error to get data for currentStationDetails");
    return;
  }

  pollutants.forEach((pollutant) => {
    // Check if the selected station monitors this pollutant
    const legendDiv = document.getElementById(`legend-${pollutant}`);
    if (legendDiv) {
      legendDiv.style.display =
        currentStationDetails.measuredPolluants.includes(pollutant)
          ? ""
          : "none"; // Show if monitored, hide otherwise
    }
  });
}

function handleApiError(error) {
  $(".page-loader").fadeOut("slow");
  console.error("Error fetching data:", error);
}

function getFormattedDate(dateValue) {
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const arabicWeekDays = [
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];
  var day = dateValue.getDate();
  var month = dateValue.getMonth() + 1;
  var hours = dateValue.getHours();
  var hoursFormat =
    hours >= 12
      ? currentLanguage === "arabic"
        ? "م"
        : "PM"
      : currentLanguage === "arabic"
      ? "ص"
      : "AM";
  hours = hours % 12;
  // return (
  //   (currentLanguage === "arabic" ? arabicWeekDays[dateValue.getDay()] : weekDays[dateValue.getDay()]) +
  //   " " +
  //   (day >= 10 ? day : "0" + day) +
  //   "/" +
  //   (month >= 10 ? month : "0" + month) +
  //   "/" +
  //   dateValue.getFullYear().toString().substring(2) +
  //   ",<br>" +
  //   (hours ? hours : 12) +
  //   " " +
  //   hoursFormat
  // );
  if (currentLanguage === "arabic") {
    return (
      arabicWeekDays[dateValue.getDay()] +
      " " +
      (day >= 10 ? day : "0" + day) +
      "/" +
      (month >= 10 ? month : "0" + month) +
      "/" +
      dateValue.getFullYear().toString().substring(-2) +
      // " " +
      // arabicWeekDays[dateValue.getDay()] +
      " " +
      "<br>" +
      (hours ? hours : 12) +
      " " +
      hoursFormat
    );
  } else {
    return (
      (currentLanguage === "arabic"
        ? arabicWeekDays[dateValue.getDay()]
        : weekDays[dateValue.getDay()]) +
      " " +
      (day >= 10 ? day : "0" + day) +
      "/" +
      (month >= 10 ? month : "0" + month) +
      "/" +
      dateValue.getFullYear().toString().substring(-2) +
      ",<br>" +
      (hours ? hours : 12) +
      " " +
      hoursFormat
    );
  }
}
function getFormattedDate1(dateValue) {
  var day = dateValue.getDate();
  var month = dateValue.getMonth() + 1;
  var hours = dateValue.getHours();
  var minutes = dateValue.getMinutes();
  var hoursFormat =
    hours >= 12
      ? currentLanguage === "arabic"
        ? "م"
        : "PM"
      : currentLanguage === "arabic"
      ? "ص"
      : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // Convert hour '0' to '12'
  var formattedHours = hours < 10 ? "0" + hours : hours;
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  return (
    (day >= 10 ? day : "0" + day) +
    "/" +
    (month >= 10 ? month : "0" + month) +
    "/" +
    dateValue.getFullYear().toString().substring(-2) +
    ", " +
    formattedHours +
    ":" +
    formattedMinutes +
    " " +
    hoursFormat
  );
}
function getYearlyStationPollutantsThreshold() {
  $.ajax({
    url:
      baseUrl +
      "GetYearlyStationPollutantsThreshold?stationName=" +
      currentStationDetails.stationId,
    method: "GET",
    dataType: "json",
    success: function (data) {
      if (data[0]) {
        $("#numberOfHoursExceedsThresholdCO").text(data[0].co);
        $("#numberOfHoursExceedsThresholdSO2").text(data[0].sO2);
        // $("#numberOfHoursExceedsThresholdPM10").text(data[0].pM10);
        //$("#numberOfHoursExceedsThresholdPM25").text(data[0].pM10);
        $("#numberOfHoursExceedsThresholdNO2").text(data[0].nO2);
        $("#numberOfHoursExceedsThresholdO3").text(data[0].o3);
      } else {
        $(
          "#numberOfHoursExceedsThresholdCO, #numberOfHoursExceedsThresholdSO2,  #numberOfHoursExceedsThresholdNO2, #numberOfHoursExceedsThresholdO3"
        ).text("");
      }
    },
    error: handleApiError,
  });
}

function onClickYearOfAirAnalytics(year) {
  var selectedYearEl = $("#selectedyear");
  selectedYearEl.html(year);
  selectedYearEl.append(`<span>
    <i class="fa fa-sort-desc"
    aria-hidden="true"></i>
</span>`);
  getAirAnalytics(year);
}

function getAirAnalytics(year) {
  const apiUrl =
    baseUrl +
    "GetAirAnalytics?year=" +
    year +
    "&stationName=" +
    currentStationDetails.stationId;
  $.ajax({
    url: apiUrl,
    method: "GET",
    dataType: "json",
    success: function (data) {
      if (!data || data.length === 0) {
        $("#radarChart").hide();
        return;
      }
      $("#radarChart").show();
      labelsData = [];
      pollutantLevels = [];
      colorCodesForAirAnalytics = [];
      data.forEach((item) => {
        labelsData.push(item.month);
        pollutantLevels.push(item.aqi);
        colorCodesForAirAnalytics.push(item.colorCode);
      });

      let chartStatus = Chart.getChart("radarChart"); // <canvas> id
      if (chartStatus != undefined) {
        chartStatus.destroy();
      }
      var radarCtx = document.getElementById("radarChart").getContext("2d");
      var myRadarChart = new Chart(radarCtx, {
        type: "radar",
        data: createRadarData(),
        options: radarOptions,
      });
      myRadarChart.update();
    },
    error: handleApiError,
  });
}

function getLiveCityRankingApi(hasAccessToLocation, callback) {
  $.ajax({
    url: baseUrl + "GetStationRanking",
    method: "GET",
    dataType: "json",
    success: function (data) {
      liveCityData = data;
      if (!hasAccessToLocation) {
        currentStationDetails = stationsWithLocations.find(
          (x) => x.stationId == liveCityData[0].stationName
        );
        loadStationData();
      }
      if (currentStationDetails.stationName == "Abu Dhabi") {
        currentStationDetails = stationsWithLocations.find(
          (x) => x.stationId == liveCityData[0].stationName
        );
        loadStationData();
      }

      bindLiveCityRanking();
      if (typeof callback === "function") {
        callback(); // Execute the callback if it's a function
      }
    },
    error: handleApiError,
  });
}

function bindLiveCityRanking() {
  $("#stationRankingList, #stationsDropdownMap").empty();
  var stationRankingListDiv = $("#stationRankingList");
  var stationsDropdownMapEl = $("#stationsDropdownMap");
  var stationDetails;
  $.each(liveCityData, function (index, station) {
    var stationDetailsWithLocation =
      currentLanguage === "arabic"
        ? stationsWithLocationsArabic.find(
            (x) => x.stationId === station.stationName
          )
        : stationsWithLocations.find(
            (x) => x.stationId === station.stationName
          );
    var stationDetails = stations.find(
      (s) => s.stationId === station.stationName
    );

    if (stationDetailsWithLocation && stationDetails) {
      var colorCode = colorCodes[getColorClassForAqi(station.aqi)];

      var stationName =
        currentLanguage && currentLanguage == "arabic"
          ? stationDetails.ar
          : stationDetails.en;

      station.name = stationName;
      station.distance = Math.round(
        calculateDistance(
          currentStationDetails.latitude,
          currentStationDetails.longitude,
          stationDetailsWithLocation.latitude,
          stationDetailsWithLocation.longitude
        )
      );
      var row =
        `<label class="list-group-item">
                          <span class="numbers number" style="border-color:` +
        colorCode +
        ` !important;">
                            <strong style="color:` +
        colorCode +
        `;">` +
        station.rank +
        `</strong>
                          </span>
                          <div class="list-content">
                            <div class="inner_list-content">
                              <p>` +
        station.name +
        `</p>
                              <p style="display: none;">` +
        stationDetailsWithLocation.regionName +
        `</p> 
        <span class="${
          currentLanguage === "arabic" ? "aqi-content-span" : ""
        }" style="color:${colorCode};">AQI ${station.aqi}</span>
                            </div>
                            <div class="dis-content">
                              <span>~ ` +
        station.distance +
        (currentLanguage === "arabic" ? " كم" : " km") +
        `</span>
                            </div>
                          </div>
                          <input type="radio" name="options" class="${
                            currentLanguage === "arabic"
                              ? "rtl-stationsData"
                              : ""
                          }" id="${
          stationDetailsWithLocation.stationId
        }" value="${
          stationDetailsWithLocation.stationId
        }" autocomplete="off" class="float-end" onClick="selectedStation('${
          stationDetailsWithLocation.stationId
        }')">
                        </label>`;

      stationRankingListDiv.append(row);

      stationsDropdownMapEl.append(
        `<li>
                <span class="station-name">` +
          stationName +
          `</span> 
                <span class="region-name" style="display: none;">` +
          stationDetailsWithLocation.regionName +
          `</span>
            </li>`
      );
    }
  });

  if (currentStationDetails.stationId) {
    $("#" + currentStationDetails.stationId).attr("checked", "checked");
    stationDetails = currentStationDetails;
  }
  bindStationInfo();
}
function bindStationInfo() {
  const pollutantNames =
    currentLanguage === "arabic" ? pollutantNamesArabic : pollutantNamesEnglish;
  try {
    if (
      !currentStationDetails ||
      !Array.isArray(currentStationDetails.measuredPolluants)
    ) {
      throw new Error(
        "currentStationDetails or currentStationDetails.measuredPolluants is undefined or not an array."
      );
    }
    var stationDetails = currentStationDetails;
    var airQualityIndexTooltipPollutantContent = "";
    stationDetails.measuredPolluants.forEach((item) => {
      if (item !== pollutantAbbrevations.Noise) {
        airQualityIndexTooltipPollutantContent +=
          `<li>` +
          pollutantNames[item] +
          `<span class="blue-bold">
                        (` +
          getPollutantWithUnits(item) +
          `)
                    </span>
                </li>`;
      } else {
        airQualityIndexTooltipPollutantContent += `<li>` + item + `</li>`;
      }
    });

    const { stationName } = getStationNameInSelectedLanguage(
      stationDetails.stationName
    );
    var stationDetailsWithLocation =
      currentLanguage === "arabic"
        ? stationsWithLocationsArabic &&
          stationsWithLocationsArabic.find((x) => x.stationName === stationName)
        : stationsWithLocations &&
          stationsWithLocations.find((x) => x.stationName === stationName);
    $(".pollutantbar-title").text(stationName);
    $(".pollutantbar-address").text(
      stationDetailsWithLocation?.stationLocation
    );
    $(".pollutantbar-details")
      .empty()
      .html(airQualityIndexTooltipPollutantContent);

    // Ensure proper rendering of HTML elements
    $(".pollutantbar-details").html($(".pollutantbar-details").html());
  } catch (error) {
    console.error("Error binding station info:", error.message);
    // Optionally, you can display a user-friendly error message or perform other error handling here.
  }
}

$(".mapStationSearchScroll").on("click", "li", function () {
  var stationName = $(this).find(".station-name").text().replace(/\s+/g, ""); // Remove spaces
  $(".show-mapSearchList")
    .show()
    .css({
      display: "inline-block",
      padding: "4px",
      "margin-left": "8px",
    })
    .text(stationName); // Use text() instead of html()
  $(".Newsearch-box").hide();
});

function selectedStation(stationId) {
  currentStationDetails = stationsWithLocations.find(
    (x) => x.stationId == stationId
  ); // Remove the class 'expanded' from the sidebar after 4 seconds
  setTimeout(function () {
    document.getElementById("sidebar").classList.remove("expanded");
  }, 300);

  setTimeout(function () {
    document.getElementById("sidebar").classList.remove("visible");
  }, 300);
  // Clear the chart data
  // clearChartData();

  if (boolrankingflag) {
    $("#stationsDropdownMap").trigger("click");
  }

  // Load new station data
  loadStationData();

  boolrankingflag = true;
}

// function getAirQualitySafetyLevel() {
//     $.ajax({
//         url: baseUrl + 'GetDailyCountsAirQualityStation?input=' + currentStationDetails.stationId,
//         method: 'GET',
//         dataType: 'json',
//         success: function (data) {
//             var aqiStatusDiv = $("#aqiStatusDiv");
//             var aqiDailyCountsDiv = $("#aqiDailyCountsDiv");
//             var aqiSmallScreenDailyCounts = $("#aqiSmallScreenDailyCounts");
//             aqiStatusDiv.empty();
//             aqiDailyCountsDiv.empty();
//             aqiSmallScreenDailyCounts.empty();
//             aqiStatusDiv.append(airQualitySafetyLevelDivElements(data.averageGoodAQICount, statusClass.Good, colorClass.GoodColorClass));
//             aqiStatusDiv.append(airQualitySafetyLevelDivElements(data.averageModerateAQICount, statusClass.Moderate, colorClass.ModrateColorClass));
//             aqiStatusDiv.append(airQualitySafetyLevelDivElements(data.averageUnHealthlySensitiveGroupsAQICount, statusClass.UnHealthlySensitiveGroups, colorClass.Unhealthy4peopleColorClass));
//             aqiStatusDiv.append(airQualitySafetyLevelDivElements(data.averageUnHealthlyAQICount, statusClass.UnHealthly, colorClass.UnhealthyColorClass));
//             aqiStatusDiv.append(airQualitySafetyLevelDivElements(data.averageVeryUnHealthlyAQICount, statusClass.VeryUnHealthly, colorClass.VeryUnhealthyColorClass));
//             aqiStatusDiv.append(airQualitySafetyLevelDivElements(data.averageHazardousAQICount, statusClass.Hazardous, colorClass.HazardousClass));
//             aqiDailyCountsDiv.append(DailyCountsDataDivElements1(data.averageGoodAQICount, statusClass.Good, colorClass.GoodColorClass)); // start 19-April-24 changed function name due to counting animation
//             aqiDailyCountsDiv.append(DailyCountsDataDivElements1(data.averageModerateAQICount, statusClass.Moderate, colorClass.ModrateColorClass)); // start 19-April-24 changed function name due to counting animation
//             aqiDailyCountsDiv.append(DailyCountsDataDivElements1(data.averageUnHealthlySensitiveGroupsAQICount, statusClass.UnHealthlySensitiveGroups, colorClass.Unhealthy4peopleColorClass)); // start 19-April-24 changed function name due to counting animation
//             aqiDailyCountsDiv.append(DailyCountsDataDivElements1(data.averageUnHealthlyAQICount, statusClass.UnHealthly, colorClass.UnhealthyColorClass)); // start 19-April-24 changed function name due to counting animation
//             aqiDailyCountsDiv.append(DailyCountsDataDivElements1(data.averageVeryUnHealthlyAQICount, statusClass.VeryUnHealthly, colorClass.VeryUnhealthyColorClass)); // start 19-April-24 changed function name due to counting animation
//             aqiDailyCountsDiv.append(DailyCountsDataDivElements1(data.averageHazardousAQICount, statusClass.Hazardous, colorClass.HazardousClass)); // start 19-April-24 changed function name due to counting animation

//             // Append to aqiSmallScreenDailyCounts
//             aqiSmallScreenDailyCounts.append(DailyCountsDataDivElements(data.averageGoodAQICount, statusClass.Good, colorClass.GoodColorClass));
//             aqiSmallScreenDailyCounts.append(DailyCountsDataDivElements(data.averageModerateAQICount, statusClass.Moderate, colorClass.ModrateColorClass));
//             aqiSmallScreenDailyCounts.append(DailyCountsDataDivElements(data.averageUnHealthlySensitiveGroupsAQICount, statusClass.UnHealthlySensitiveGroups, colorClass.Unhealthy4peopleColorClass));
//             aqiSmallScreenDailyCounts.append(DailyCountsDataDivElements(data.averageUnHealthlyAQICount, statusClass.UnHealthly, colorClass.UnhealthyColorClass));
//             aqiSmallScreenDailyCounts.append(DailyCountsDataDivElements(data.averageVeryUnHealthlyAQICount, statusClass.VeryUnHealthly, colorClass.VeryUnhealthyColorClass));
//             aqiSmallScreenDailyCounts.append(DailyCountsDataDivElements(data.averageHazardousAQICount, statusClass.Hazardous, colorClass.HazardousClass));

//         },
//         error: handleApiError
//     });
// }

function getAirQualitySafetyLevel() {
  $.ajax({
    url:
      baseUrl +
      "GetDailyCountsAirQualityStation?input=" +
      currentStationDetails.stationId,
    method: "GET",
    dataType: "json",
    success: function (data) {
      var aqiStatusDiv = $("#aqiStatusDiv");
      var aqiDailyCountsDiv = $("#aqiDailyCountsDiv");
      var aqiSmallScreenDailyCounts = $("#aqiSmallScreenDailyCounts");

      // Empty the divs before appending the new content
      aqiStatusDiv.empty();
      aqiDailyCountsDiv.empty();
      aqiSmallScreenDailyCounts.empty();
      // Append the data in the selected language
      aqiStatusDiv.append(
        airQualitySafetyLevelDivElements(
          data.averageGoodAQICount,
          currentStatusClass.Good,
          colorClass.GoodColorClass
        )
      );
      aqiStatusDiv.append(
        airQualitySafetyLevelDivElements(
          data.averageModerateAQICount,
          currentStatusClass.Moderate,
          colorClass.ModrateColorClass
        )
      );
      aqiStatusDiv.append(
        airQualitySafetyLevelDivElements(
          data.averageUnHealthlySensitiveGroupsAQICount,
          currentStatusClass.UnHealthlySensitiveGroups,
          colorClass.Unhealthy4peopleColorClass
        )
      );
      aqiStatusDiv.append(
        airQualitySafetyLevelDivElements(
          data.averageUnHealthlyAQICount,
          currentStatusClass.UnHealthly,
          colorClass.UnhealthyColorClass
        )
      );
      aqiStatusDiv.append(
        airQualitySafetyLevelDivElements(
          data.averageVeryUnHealthlyAQICount,
          currentStatusClass.VeryUnHealthly,
          colorClass.VeryUnhealthyColorClass
        )
      );
      aqiStatusDiv.append(
        airQualitySafetyLevelDivElements(
          data.averageHazardousAQICount,
          currentStatusClass.Hazardous,
          colorClass.HazardousClass
        )
      );

      aqiDailyCountsDiv.append(
        DailyCountsDataDivElements1(
          data.averageGoodAQICount,
          currentStatusClass.Good,
          colorClass.GoodColorClass
        )
      );
      aqiDailyCountsDiv.append(
        DailyCountsDataDivElements1(
          data.averageModerateAQICount,
          currentStatusClass.Moderate,
          colorClass.ModrateColorClass
        )
      );
      aqiDailyCountsDiv.append(
        DailyCountsDataDivElements1(
          data.averageUnHealthlySensitiveGroupsAQICount,
          currentStatusClass.UnHealthlySensitiveGroups,
          colorClass.Unhealthy4peopleColorClass
        )
      );
      aqiDailyCountsDiv.append(
        DailyCountsDataDivElements1(
          data.averageUnHealthlyAQICount,
          currentStatusClass.UnHealthly,
          colorClass.UnhealthyColorClass
        )
      );
      aqiDailyCountsDiv.append(
        DailyCountsDataDivElements1(
          data.averageVeryUnHealthlyAQICount,
          currentStatusClass.VeryUnHealthly,
          colorClass.VeryUnhealthyColorClass
        )
      );
      aqiDailyCountsDiv.append(
        DailyCountsDataDivElements1(
          data.averageHazardousAQICount,
          currentStatusClass.Hazardous,
          colorClass.HazardousClass
        )
      );

      // Append to aqiSmallScreenDailyCounts for small screens
      aqiSmallScreenDailyCounts.append(
        DailyCountsDataDivElements(
          data.averageGoodAQICount,
          currentStatusClass.Good,
          colorClass.GoodColorClass
        )
      );
      aqiSmallScreenDailyCounts.append(
        DailyCountsDataDivElements(
          data.averageModerateAQICount,
          currentStatusClass.Moderate,
          colorClass.ModrateColorClass
        )
      );
      aqiSmallScreenDailyCounts.append(
        DailyCountsDataDivElements(
          data.averageUnHealthlySensitiveGroupsAQICount,
          currentStatusClass.UnHealthlySensitiveGroups,
          colorClass.Unhealthy4peopleColorClass
        )
      );
      aqiSmallScreenDailyCounts.append(
        DailyCountsDataDivElements(
          data.averageUnHealthlyAQICount,
          currentStatusClass.UnHealthly,
          colorClass.UnhealthyColorClass
        )
      );
      aqiSmallScreenDailyCounts.append(
        DailyCountsDataDivElements(
          data.averageVeryUnHealthlyAQICount,
          currentStatusClass.VeryUnHealthly,
          colorClass.VeryUnhealthyColorClass
        )
      );
      aqiSmallScreenDailyCounts.append(
        DailyCountsDataDivElements(
          data.averageHazardousAQICount,
          currentStatusClass.Hazardous,
          colorClass.HazardousClass
        )
      );
    },
    error: handleApiError,
  });
}

function airQualitySafetyLevelDivElements(aqiValue, aqiStatus, aqiColorStatus) {
  // Sanitize class name to avoid injection
  function sanitizeClassName(className) {
    return className.replace(/[^a-z0-9-_]/gi, "");
  }

  // Create container with sanitized class name
  var container = $("<div></div>", {
    class: "list-item " + sanitizeClassName(aqiColorStatus),
  });

  // Create a span element for the count
  var countSpan = $("<p></p>");

  // Append the count span to the container
  container.append(countSpan);

  // Append the status span to the container with sanitized text
  container.append($("<span></span>").text(aqiStatus));

  // Append the container to the parent
  $("#aqiStatusDiv").append(container);

  // Use jQuery animate() function to animate the count
  $({ countNum: 0 }).animate(
    { countNum: aqiValue },
    {
      duration: 4000,
      easing: "linear",
      step: function () {
        // Update the count value
        countSpan.text(Math.floor(this.countNum));
      },
      complete: function () {
        // Update the count value when animation is complete
        countSpan.text(this.countNum);
      },
    }
  );
}

function DailyCountsDataDivElements(aqiValue, aqiStatus, aqiColorStatus) {
  // Sanitize class name to avoid injection
  function sanitizeClassName(className) {
    return className.replace(/[^a-z0-9-_]/gi, "");
  }

  // Create container with sanitized class name
  var container = $("<div></div>", {
    class:
      "col-4 col-sm-4 col-md-4 column " + sanitizeClassName(aqiColorStatus),
  });

  // Create a span element for the count
  var countSpan = $("<p></p>");

  // Append the count span to the container
  container.append(countSpan);

  // Append the status span to the container with sanitized text
  container.append($("<span></span>").text(aqiStatus));

  // Append the container to the parent
  $("#aqiSmallScreenDailyCounts").append(container);

  // Use jQuery animate() function to animate the count
  $({ countNum: 0 }).animate(
    { countNum: aqiValue },
    {
      duration: 4000,
      easing: "linear",
      step: function () {
        // Update the count value
        countSpan.text(Math.floor(this.countNum));
      },
      complete: function () {
        // Update the count value when animation is complete
        countSpan.text(this.countNum);
      },
    }
  );
}

function DailyCountsDataDivElements1(aqiValue, aqiStatus, aqiColorStatus) {
  var container = $(
    '<div class="col-4 col-sm-4 col-md-4 column ' + aqiColorStatus + '"></div>'
  );

  // Create a span element for the count
  var countSpan = $("<p></p>");

  // Append the count span to the container
  container.append(countSpan);

  // Append the status span to the container
  container.append("<span>" + aqiStatus + "</span>");

  // Append the container to the parent
  $("#aqiDailyCountsDiv").append(container);

  // Use jQuery animate() function to animate the count
  $({ countNum: container.find(".count").text() }).animate(
    { countNum: aqiValue },
    {
      duration: 4000,
      easing: "linear",
      step: function () {
        // Update the count value
        countSpan.text(Math.floor(this.countNum));
      },
      complete: function () {
        // Update the count value when animation is complete
        countSpan.text(this.countNum);
      },
    }
  );
}

function getStationChartApi(filter, initialRequest = false) {
  var url;
  var station;

  // Arabic-to-English dictionary for reverse lookup
  const chartFilterEnglish = {
    "كل ساعة": "Hourly",
    يوميا: "Daily",
    شهريا: "Monthly",
    سنويا: "Yearly",
    " إنشاء مخصص": "Custom",
  };

  const selectedFilter =
    currentLanguage === "arabic"
      ? chartFilterEnglish[filter] || "Hourly" // Fallback to 'Hourly' if filter is undefined
      : filter;

  switch (selectedFilter) {
    case "Daily":
      url =
        baseUrl +
        "GetDailyStationChart?stationName=" +
        currentStationDetails.stationId;
      break;

    case "Monthly":
      var airQualityStationid = currentStationDetails.stationId;
      station = stationIdforEDB.find(
        (station) => station.stationName === currentStationDetails.stationId
      );
      if (station) {
        currentStationDetails.stationId = station.stationid;
      }
      var edbStationid = currentStationDetails.stationId;
      url =
        baseUrl +
        "GetMonthlyStationChart?airQualityStationid=" +
        airQualityStationid +
        "&edbStationid=" +
        edbStationid;
      break;

    case "Yearly":
      station = stationIdforEDB.find(
        (station) => station.stationName === currentStationDetails.stationId
      );
      if (station) {
        currentStationDetails.stationId = station.stationid;
      }
      url =
        baseUrl +
        "GetYearlyStationChart?stationId=" +
        currentStationDetails.stationId;
      break;

    case "Custom":
      var selectedDate = $(".datepicker").val();
      var splitDateArray = selectedDate.split("-");
      var formatedDate =
        splitDateArray[1] + "/" + splitDateArray[0] + "/" + splitDateArray[2];
      url =
        baseUrl +
        "GetSelectedDateStationChart?selectedDate=" +
        formatedDate +
        "&stationName=" +
        currentStationDetails.stationId;
      break;

    default:
      url =
        baseUrl +
        "GetHourlyStationChart?stationName=" +
        currentStationDetails.stationId;
      break;
  }

  // Make AJAX request
  $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    success: function (data) {
      chartData = data;
      bindStationDataToBarChart(selectedFilter);
      bindStationDataToLineChart(selectedFilter);
    },
    error: handleApiError,
  });

  // Restore original station name after data is fetched
  let updatedStation = stationIdforEDB.find(
    (station) => station.stationid === currentStationDetails.stationId
  );
  if (updatedStation) {
    currentStationDetails.stationId = updatedStation.stationName;
  }
}

function bindStationDataToLineChart(filter) {
  var aqiData = [];
  var pm10Data = [];
  var pm25Data = [];
  var so2Data = [];
  var coData = [];
  var o3Data = [];
  var no2Data = [];
  chartData.forEach((item) => {
    aqiData.push(item.aqi);
    pm10Data.push(item.pM10);
    pm25Data.push(item.pM25);
    so2Data.push(item.sO2);
    coData.push(item.co);
    o3Data.push(item.o3);
    no2Data.push(item.nO2);
  });
  var categoriesData = [];
  $("#lineChartPollutantSo2Value").addClass("bold-black-text");
  $("#lineChartPollutantNo2Value").addClass("bold-black-text");
  $("#lineChartPollutantPm10Value").addClass("bold-black-text");
  $("#lineChartPollutantPm25Value").addClass("bold-black-text");
  $("#lineChartPollutantO3Value").addClass("bold-black-text");
  $("#lineChartPollutantCoValue").addClass("bold-black-text");
  $(
    "#aqiHourlyLineChartDates, #pollutantHourlyLineChartDates,#pollutantHourlyBarChartDates"
  ).empty();
  const dataArray = [
    {
      label: "SO2",
      data: so2Data,
      backgroundColor: "rgba(24, 145, 195, 1)",
      borderColor: "rgba(24, 145, 195, 1)",
      pointRadius: 0,
      pointHoverRadius: 8,
      tension: 0.4,
      borderWidth: 3,
    },
    {
      label: "NO2",
      data: no2Data,
      backgroundColor: "rgba(58, 192, 218, 1)",
      borderColor: "rgba(58, 192, 218, 1)",
      pointRadius: 0,
      pointHoverRadius: 8,
      tension: 0.4,
      borderWidth: 3,
    },
    {
      label: "CO",
      data: coData,
      backgroundColor: "rgba(61, 198, 195, 1)",
      borderColor: "rgba(61, 198, 195, 1)",
      pointRadius: 0,
      pointHoverRadius: 8,
      tension: 0.4,
      borderWidth: 3,
    },
    {
      label: "PM10",
      data: pm10Data,
      backgroundColor: "rgba(1, 111, 196, 1)",
      borderColor: "rgba(1, 111, 196, 1)",
      pointRadius: 0,
      pointHoverRadius: 8,
      tension: 0.4,
      borderWidth: 3,
    },
    {
      label: "PM25",
      data: pm25Data,
      backgroundColor: "rgba(0, 88, 156, 1.0)",
      borderColor: "rgba(0, 88, 156, 1.0)",
      pointRadius: 0,
      pointHoverRadius: 8,
      tension: 0.4,
      borderWidth: 3,
    },
    {
      label: "O3",
      data: o3Data,
      backgroundColor: "rgba(80, 227, 194, 1)",
      borderColor: "rgba(80, 227, 194, 1)",
      pointRadius: 0,
      pointHoverRadius: 8,
      tension: 0.4,
      borderWidth: 3,
    },
  ];
  const labelsToFind = currentStationDetails?.AvailablePolluants; // Array containing labels you want to find
  fianlItems = dataArray.filter((item) => labelsToFind.includes(item.label));

  // switch (filter) {
  //     case currentLanguage === 'arabic' ? chartFilterArabic.Daily : chartFilter.Daily:
  //         //categoriesData = chartData.map(t => { return t.day.split(' '); });
  //         chartData.forEach(item => {
  //             categoriesData.push(item.day.split(' '));
  //         });
  //         break;
  //         case currentLanguage === 'arabic' ? chartFilterArabic.Monthly : chartFilter.Monthly:
  //         chartData.forEach(item => {
  //             categoriesData.push(item.month);
  //         });
  //         //categoriesData = chartData.map(t => { return t.month; });
  //         break;
  //         case currentLanguage === 'arabic' ? chartFilterArabic.Yearly :  chartFilter.Yearly:
  //         //categoriesData = chartData.map(t => { return t.year; });
  //         chartData.forEach(item => {
  //             categoriesData.push(item.year);
  //         });
  //         break;
  //         case currentLanguage === 'arabic' ? chartFilterArabic.Custom :  chartFilter.Custom:
  //         //categoriesData = chartData.map(t => { return t.hour.split(' '); });
  //         chartData.map(item => {
  //             const dateParts = item.recordedDate.split('/');
  //             const formattedDate = `${dateParts[2]}-${dateParts[0].padStart(2, '0')}-${dateParts[1].padStart(2, '0')}`;

  //             // Combine the formatted date with the hour, separated by a semicolon
  //             const formattedString = `${formattedDate};${item.hour}`;
  //             categoriesData.push(formattedString);
  //         });
  //         break;
  //     default:
  //         //categoriesData = chartData.map(t => { return t.hour.split(' '); });
  //         chartData.map(item => {
  //             const dateParts = item.recordedDate.split('/');
  //             const formattedDate = `${dateParts[2]}-${dateParts[0].padStart(2, '0')}-${dateParts[1].padStart(2, '0')}`;

  //             // Combine the formatted date with the hour, separated by a semicolon
  //             const formattedString = `${formattedDate};${item.hour}`;
  //             categoriesData.push(formattedString);
  //         });
  //         break;

  // }

  const selectedFilter =
    currentLanguage === "arabic"
      ? chartFilterArabic[filter]
      : chartFilter[filter];
  switch (selectedFilter) {
    case chartFilterArabic.Daily:
    case chartFilter.Daily:
      chartData.forEach((item) => {
        categoriesData.push(item.day.split(" "));
      });
      break;

    case chartFilterArabic.Monthly:
    case chartFilter.Monthly:
      chartData.forEach((item) => {
        categoriesData.push(item.month);
      });
      break;

    case chartFilterArabic.Yearly:
    case chartFilter.Yearly:
      chartData.forEach((item) => {
        categoriesData.push(item.year);
      });
      break;

    case chartFilterArabic.Custom:
    case chartFilter.Custom:
      chartData.forEach((item) => {
        const dateParts = item.recordedDate.split("/");
        const formattedDate = `${dateParts[2]}-${dateParts[0].padStart(
          2,
          "0"
        )}-${dateParts[1].padStart(2, "0")}`;
        const formattedString = `${formattedDate};${item.hour}`;
        categoriesData.push(formattedString);
      });
      break;

    default:
      chartData.forEach((item) => {
        const dateParts = item.recordedDate.split("/");
        const formattedDate = `${dateParts[2]}-${dateParts[0].padStart(
          2,
          "0"
        )}-${dateParts[1].padStart(2, "0")}`;
        const formattedString = `${formattedDate};${item.hour}`;
        categoriesData.push(formattedString);
      });
      break;
  }
  var pollutantLineChartId = "aqiLineChart";
  var chartStatus = Chart.getChart(pollutantLineChartId); // <canvas> id
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }
  var lineChart = document
    .getElementById(pollutantLineChartId)
    .getContext("2d");
  var gradientFill = lineChart.createLinearGradient(0, 0, 0, 300);
  gradientFill.addColorStop(0, "rgba(156, 216, 78, 0.2)");
  gradientFill.addColorStop(0.5, "rgba(250, 207, 57, 0.2)");
  gradientFill.addColorStop(1, "rgba(249, 144, 73, 0.2)");

  let minDate = new Date();
  let maxDate = new Date();
  //for vertical line strat
  Chart.registry.plugins.register({
    id: "drawVerticalLine",
    afterDraw: function (chart) {
      if (
        chart.tooltip._active &&
        chart.tooltip._active.length &&
        chart.canvas.id == "aqiLineChart"
      ) {
        var activePoint = chart.tooltip._active[0],
          ctx = chart.ctx,
          y_axis = chart.scales["y"],
          x = activePoint.element.x,
          topY = y_axis.top,
          bottomY = y_axis.bottom;

        var gradientStroke = ctx.createLinearGradient(0, bottomY, 0, topY);
        gradientStroke.addColorStop(0, "#9CD84E");
        gradientStroke.addColorStop(0.5, "yellow");
        gradientStroke.addColorStop(1, "#F99049");
        // Draw line
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = 2;
        ctx.strokeStyle = gradientStroke;
        ctx.stroke();
        ctx.restore();
      }
    },
  });
  //for vertical line end
  if (filter !== "Monthly" && filter !== "Daily" && filter !== "Yearly") {
    const iso8601Dates = convertToISO8601(categoriesData);
    const dateTimes = iso8601Dates.map((entry) => new Date(entry));

    if (dateTimes.length > 0) {
      if (filter !== "Custom") {
        let lastrefreshdate = dateTimes[dateTimes.length - 1].toLocaleString(
          "en-US",
          {
            hour12: true,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }
        );
        var lastArabicrefreshdate = lastrefreshdate.replace(
          /AM|PM/g,
          function (match) {
            return match === "AM" ? "ص" : "م";
          }
        );
        var lastEnglishrefreshdate = lastrefreshdate;
        $("#StAQIlastrefreshtime").text(
          currentLanguage === "arabic"
            ? lastArabicrefreshdate
            : lastEnglishrefreshdate
        );
      }
      minDate = new Date(Math.min(...dateTimes));
      maxDate = new Date(Math.max(...dateTimes));
    }
    minDateString = minDate.toISOString().split("T")[0];
    maxDateString = maxDate.toISOString().split("T")[0];
    var myChart = new Chart(lineChart, {
      type: "line",
      data: {
        labels: iso8601Dates, // Add your labels here
        datasets: [
          {
            label: "", // Optional: add your series name
            data: aqiData, // Add your data points here
            backgroundColor: gradientFill,
            borderColor: function (context) {
              const chart = context.chart;
              const { ctx, chartArea } = chart;

              if (!chartArea) {
                // This case happens on initial chart load
                return null;
              }
              var gradientStroke = ctx.createLinearGradient(
                0,
                chartArea.bottom,
                0,
                chartArea.top
              );
              gradientStroke.addColorStop(0, "#9CD84E");
              gradientStroke.addColorStop(0.5, "yellow");
              gradientStroke.addColorStop(1, "#F99049");

              return gradientStroke;
            },
            pointBackgroundColor: "white",
            fill: false,
            tension: 0.4,
            pointRadius: 0,
            hoverRadius: 8,
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
        toolbar: {
          show: false,
          tools: {
            download: false,
          },
        },
        plugins: {
          legend: {
            display: false, // This hides the legend
          },
          title: {
            display: true,
            // text: 'Chart.js Bar Chart - Stacked'
          },
          tooltip: {
            //id: "single",
            enabled: true,
            ltr: true, // Enables Right-to-Left direction
            textDirection: "ltr",
            displayColors: false,
            usePointStyle: false, // Do not use point style
            caretSize: 0,
            callbacks: {
              title: function (tooltipItems) {
                if (tooltipItems && tooltipItems.length > 0) {
                  // Get the label of the first tooltip item, which is the date string
                  let fullTimestamp = tooltipItems[0].label;
                  //console.log("Full Timestamp: ", fullTimestamp);  // Debug log

                  // Manually parse the hour from the timestamp
                  let hourMatch = fullTimestamp.match(/\b(\d{1,2}):/);
                  // Improved regex to match AM/PM more robustly
                  let meridiemMatch = fullTimestamp.match(
                    /\b(?:AM|PM|am|pm|a\.m\.|p\.m\.)\b/i
                  );
                  // console.log("Hour Match: ", hourMatch);  // Debug log
                  //console.log("Meridiem Match: ", meridiemMatch);  // Debug log

                  if (hourMatch && meridiemMatch) {
                    let hour = parseInt(hourMatch[1], 10);
                    let meridiem = meridiemMatch[0]
                      .toUpperCase()
                      .replace(/\./g, "");

                    //console.log("Parsed Hour: ", hour);  // Debug log
                    // console.log("Parsed Meridiem: ", meridiem);  // Debug log

                    // Ensure the hour is converted to 12-hour format correctly
                    if (meridiem === "PM" && hour !== 12) {
                      hour = (hour % 12) + 12;
                    } else if (meridiem === "AM" && hour === 12) {
                      hour = 0;
                    }

                    // Convert back to 12-hour format and adjust meridiem
                    let displayHour = hour % 12;
                    displayHour = displayHour ? displayHour : 12; // the hour '0' should be '12'
                    let localizedMeridiem =
                      currentLanguage === "arabic"
                        ? meridiem === "AM"
                          ? "ص"
                          : "م"
                        : meridiem;
                    // Return the formatted string without leading zeros
                    return `${displayHour} ${localizedMeridiem}`;
                  } else if (hourMatch) {
                    let hour = parseInt(hourMatch[1], 10);

                    // Convert to 12-hour format based on 24-hour format assumption
                    let displayMeridiem = hour >= 12 ? "PM" : "AM";
                    let displayHour = hour % 12;
                    displayHour = displayHour ? displayHour : 12; // the hour '0' should be '12'
                    let localizedMeridiem =
                      currentLanguage === "arabic"
                        ? displayMeridiem === "AM"
                          ? "ص"
                          : "م"
                        : displayMeridiem;
                    return `${displayHour} ${localizedMeridiem}`;
                  } else {
                    // Fallback for any unexpected format
                    return fullTimestamp;
                  }
                }
                return "";
              },

              label: function (context) {
                // Return the value for the tooltip
                let value = context.parsed.y;

                // if (pollutantLineChartId == "aqiLineChart")
                if (value == 0) {
                  return "0";
                } else return value;
              },
            },
            external: function (context) {
              // Check if the tooltip is active (hovering)
              if (context.tooltip.opacity === 0) {
                updatePollutantValues();
              } else {
                // Call the custom function to update the values
                updatePollutantValues(context.tooltip.dataPoints);
              }
            },
          },
        },
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            type: "time",
            time: {
              unit: "hour",
              // Format for tooltip display
              tooltipFormat: "hh:mm a",
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 20,
            },
            grid: {
              display: false,
            },
            // reverse: true
          },
          x2: {
            type: "time",
            time: {
              unit: "day",
              // Format for tooltip and tick display
              tooltipFormat: "MMM d",
              displayFormats: {
                day: "MMM d",
              },
            },
            position: "bottom",
            ticks: {
              // Auto-skip prevents label overlapping.
              autoSkip: true,
              // Max 20 ticks, adjust as needed.
              maxTicksLimit: 20,
            },
            grid: {
              drawOnChartArea: false,
            },
            //  reverse: true,
            min: minDateString,
            max: maxDateString,
          },
          y: {
            stacked: true,
            grid: {
              display: false,
            },
          },
        },
      },
    });
  } else {
    var myChart = new Chart(lineChart, {
      type: "line",
      data: {
        labels: categoriesData,
        datasets: [
          {
            label: "",
            data: aqiData,
            pointHoverRadius: 8,
            backgroundColor: gradientFill,
            borderColor: function (context) {
              const chart = context.chart;
              const { ctx, chartArea } = chart;

              if (!chartArea) {
                return null;
              }
              var gradientStroke = ctx.createLinearGradient(
                0,
                chartArea.bottom,
                0,
                chartArea.top
              );
              gradientStroke.addColorStop(0, "#9CD84E");
              gradientStroke.addColorStop(0.5, "yellow");
              gradientStroke.addColorStop(1, "#F99049");

              return gradientStroke;
            },
            pointBackgroundColor: "white",
            fill: false,
            tension: 0.4,
            pointRadius: 0,
            hoverRadius: 8,
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
        toolbar: {
          show: false,
          tools: {
            download: false,
          },
        },
        plugins: {
          legend: {
            display: false, // This hides the legend
          },
          title: {
            display: true,
          },
          tooltip: {
            enabled: true,
            displayColors: false,
            usePointStyle: false, // Do not use point style
            caretSize: 0,
            callbacks: {
              title: function (tooltipItems) {
                if (tooltipItems && tooltipItems.length > 0) {
                  return "";
                }
              },
              label: function (context) {
                // Return the value for the tooltip
                let value = context.parsed.y;

                // if (pollutantLineChartId == "aqiLineChart")
                if (value == 0) {
                  return "0";
                } else return value;
              },
            },
            external: function (context) {
              // Check if the tooltip is active (hovering)
              if (context.tooltip.opacity === 0) {
                updatePollutantValues();
              } else {
                // Call the custom function to update the values
                updatePollutantValues(context.tooltip.dataPoints);
              }
            },
          },
        },
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            ticks: {
              maxRotation: 0,
              minRotation: 0,
            },
            grid: {
              display: false, // This will remove the Y-axis grid lines
              drawBorder: false, // Optional: if you also want to remove the axis border
            },
            stacked: true,
          },
          y: {
            // Corrected from 'yAxes' to 'y' for Chart.js version 3.x syntax
            stacked: true,
            grid: {
              display: false, // This will remove the Y-axis grid lines
              drawBorder: false, // Optional: if you also want to remove the axis border
            }, // Assuming you want the Y-axis stacked as well
          },
        },
      },
    });
  }

  updatePollutantValues();
  myChart.update();
  var pollutantsLineChartId = "pollutantLineChart";
  var chartStatus = Chart.getChart(pollutantsLineChartId); // <canvas> id
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }
  const pollutantLineChart = document
    .getElementById(pollutantsLineChartId)
    .getContext("2d");
  //for vertical line start
  Chart.registry.plugins.register({
    id: "drawVerticalLine1",
    afterDraw: function (chart) {
      if (
        chart.tooltip._active &&
        chart.tooltip._active.length &&
        chart.canvas.id == "pollutantLineChart"
      ) {
        var activePoint = chart.tooltip._active[0],
          ctx = chart.ctx,
          y_axis = chart.scales["y"],
          x = activePoint.element.x,
          topY = y_axis.top,
          bottomY = y_axis.bottom;
        // Draw line

        var gradientStroke = ctx.createLinearGradient(0, bottomY, 0, topY);
        gradientStroke.addColorStop(0, "#3AC0DA");
        gradientStroke.addColorStop(0.5, "#1891C3");
        gradientStroke.addColorStop(1, "#016FC4");

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = 2;
        ctx.strokeStyle = gradientStroke;
        ctx.stroke();
        ctx.restore();
      }
    },
  });
  //for vertical line end

  const y1AxisConfig = {
    position: "right",
    grid: {
      display: false,
    },
    title: {
      display: true,
      text: "CO (mg/m³)",
      position: "top",
    },
    beginAtZero: true,
    display: fianlItems.some((item) => item.label === "CO"),
  };

  if (filter !== "Monthly" && filter !== "Daily" && filter !== "Yearly") {
    const iso8601Dates = convertToISO8601(categoriesData);
    const dateTimes = iso8601Dates.map((entry) => new Date(entry));
    if (dateTimes.length > 0) {
      if (filter !== "Custom") {
        let lastrefreshdate = dateTimes[dateTimes.length - 1].toLocaleString(
          "en-US",
          {
            hour12: true,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }
        );
        var lastArabicrefreshdate = lastrefreshdate.replace(
          /AM|PM/g,
          function (match) {
            return match === "AM" ? "ص" : "م";
          }
        );
        var lastEnglishrefreshdate = lastrefreshdate;
        $("#StAQIlastrefreshtime").text(
          currentLanguage === "arabic"
            ? lastArabicrefreshdate
            : lastEnglishrefreshdate
        );
      }
      minDate = new Date(Math.min(...dateTimes));
      maxDate = new Date(Math.max(...dateTimes));
    }
    minDateString = minDate.toISOString().split("T")[0];
    maxDateString = maxDate.toISOString().split("T")[0];

    const scales = {
      x: {
        type: "time",
        time: {
          unit: "hour",
          tooltipFormat: "HH:mm a",
          displayFormats: {
            hour: "hh a",
          },
        },
        ticks: {
          autoSkip: false,
          maxTicksLimit: 20,
          stepSize: 1,
        },
        grid: {
          display: false,
        },
      },
      x1: {
        id: "x1",
        type: "time",
        position: "bottom",
        time: {
          unit: "day",
          tooltipFormat: "MMM d",
          displayFormats: {
            day: "MMM d",
          },
        },
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 20,
        },
        min: minDateString,
        max: maxDateString,
      },
      y: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "ug/m³",
          position: "top",
        },
        beginAtZero: true,
      },
    };

    if (fianlItems.some((item) => item.label === "CO")) {
      scales.y1 = y1AxisConfig;
    }

    let legendVisibility = {};

    const myPollutantChart = new Chart(pollutantLineChart, {
      type: "line",
      data: {
        labels: iso8601Dates,
        datasets: fianlItems,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            labels: {
              usePointStyle: true,
              padding: 40,
              boxWidth: 8,
              boxHeight: 8,
              borderWidth: 0,
              color: "#666",
              generateLabels: function (chart) {
                const labelMap = {
                  PM25: "PM2.5",
                  CO: "CO",
                  O3: "O3",
                  NO2: "NO2",
                  SO2: "SO2",
                  PM10: "PM10",
                };
                const labelArabicMap = {
                  PM10: "PM10",
                  SO2: "SO2",
                  NO2: "NO2",
                  O3: "O3",
                  CO: "CO",
                  PM25: "PM2.5",
                };
                let items = fianlItems.map((dataset, i) => {
                  const label = dataset.label || `Dataset ${i + 1}`;
                  const customLabel =
                    currentLanguage === "arabic"
                      ? labelArabicMap[label]
                      : labelMap[label] || label;

                  if (legendVisibility[i] === undefined) {
                    legendVisibility[i] = !chart.isDatasetVisible(i);
                  }
                  return {
                    text: customLabel,
                    fillStyle: dataset.backgroundColor,
                    // hidden: !chart.isDatasetVisible(i),
                    hidden: legendVisibility[i],
                    lineCap: dataset.borderCapStyle,
                    lineDash: dataset.borderDash,
                    lineDashOffset: dataset.borderDashOffset,
                    lineJoin: dataset.borderJoinStyle,
                    lineWidth: dataset.borderWidth,
                    strokeStyle: dataset.borderColor,
                    pointStyle: dataset.pointStyle || "circle", // Default pointStyle
                    datasetIndex: i,
                    displayOrder:
                      currentLanguage === "arabic"
                        ? fianlItems.length - 1 - i
                        : i,
                  };
                });
                items.sort((a, b) => a.displayOrder - b.displayOrder);
                return items;
              },
            },
            onClick: function (e, legendItem, legend) {
              const index = legendItem.datasetIndex;
              const chart = legend.chart;
              const meta = chart.getDatasetMeta(index);
              meta.hidden = !meta.hidden;
              legendVisibility[index] = meta.hidden;
              legendItem.hidden = meta.hidden;
              // meta.hidden =
              //   meta.hidden === null
              //     ? !chart.data.datasets[index].hidden
              //     : null;
              // chart.update();
              updateYAxis(chart);
              updateAllPollutantValues(null, chart);
              var legendItems = chart.legend.legendItems;
              // for (var i = 0; i < legendItems.length; i++) {
              //   if (i === index) {
              //     if (meta.hidden) {
              //       legend.legendItems[i].hidden = true;
              //     } else {
              //       legend.legendItems[i].hidden = false;
              //     }
              //   }
              // }
              for (let i = 0; i < legendItems.length; i++) {
                if (legendItems[i].datasetIndex === index) {
                  legendItems[i].hidden = meta.hidden;
                }
              }
              // chart.legend.draw();
            },
          },
          tooltip: {
            enabled: true,
            displayColors: false,
            usePointStyle: false, // Do not use point style
            caretSize: 0,
            ltr: true, // Enables Right-to-Left direction
            textDirection: "ltr",
            callbacks: {
              title: function (tooltipItems) {
                if (tooltipItems && tooltipItems.length > 0) {
                  // Get the label of the first tooltip item, which is the date string
                  let fullTimestamp = tooltipItems[0].label;
                  //console.log("Full Timestamp: ", fullTimestamp);  // Debug log

                  // Manually parse the hour from the timestamp
                  let hourMatch = fullTimestamp.match(/\b(\d{1,2}):/);
                  // Improved regex to match AM/PM more robustly
                  let meridiemMatch = fullTimestamp.match(
                    /\b(?:AM|PM|am|pm|a\.m\.|p\.m\.)\b/i
                  );

                  if (hourMatch) {
                    let hour = parseInt(hourMatch[1], 10);
                    let meridiem = meridiemMatch
                      ? meridiemMatch[0].toUpperCase().replace(/\./g, "")
                      : "";

                    // Check if the hour is in 24-hour format and adjust accordingly
                    if (hour >= 12) {
                      meridiem = currentLanguage === "arabic" ? "م" : "PM";
                    } else {
                      meridiem = currentLanguage === "arabic" ? "ص" : "AM";
                    }

                    // Convert to 12-hour format
                    let displayHour = hour % 12;
                    displayHour = displayHour ? displayHour : 12; // the hour '0' should be '12'

                    // Return the formatted string without leading zeros
                    return `${displayHour} ${meridiem}`;
                  } else {
                    // Fallback for any unexpected format
                    return fullTimestamp;
                  }
                }
                return "";
              },

              label: function (context) {
                // Return the value for the tooltip
                let value = context.parsed.y;
                return "";

                //if (pollutantBarChartId == "ADstationAqiBarGraph")
                //    return value;
                //else if (pollutantBarChartId == "ADstationCoBarGraph")
                //    return value + ' mg/m³';
                //else
                //    return value + ' ug/m³';
              },
            },
            external: function (context) {
              if (context.tooltip.opacity === 0) {
                updateAllPollutantValues(null, context.chart);
                return;
              } else {
                updateAllPollutantValues(
                  context.tooltip.dataPoints,
                  context.chart
                );
              }
            },
          },
        },
        interaction: {
          mode: "nearest", // The mode 'nearest' makes sure the point closest to the mouse gets highlighted
          axis: "x", // You can set 'y' if you want the hover effect when close to the y-axis instead
          intersect: false, // This allows for showing the hover effect even if not directly over a point
        },

        scales: scales,
      },
    });
    if (fianlItems.some((item) => item.label === "CO")) {
      myPollutantChart.data.datasets.forEach((dataset) => {
        if (dataset.label === "CO") {
          dataset.yAxisID = "y1";
        }
      });
    } else {
      myPollutantChart.data.datasets.forEach((dataset) => {
        dataset.yAxisID = "y";
      });
    }
    updateAllPollutantValues(null, null);
    myPollutantChart.update();
  } else {
    const scales = {
      x: {
        ticks: {
          maxRotation: 0,
          minRotation: 0,
        },
        grid: {
          display: false, // This will remove the Y-axis grid lines
          drawBorder: false, // Optional: if you also want to remove the axis border
        },
      },
      y: {
        // Corrected from 'yAxes' to 'y' for Chart.js version 3.x syntax

        grid: {
          display: false, // This will remove the Y-axis grid lines
          drawBorder: false, // Optional: if you also want to remove the axis border
        },
        title: {
          display: true,
          text: "ug/m³",
          position: "top",
        },
        beginAtZero: true,
      },
    };

    if (fianlItems.some((item) => item.label === "CO")) {
      scales.y1 = y1AxisConfig;
    } else {
      delete scales.y1;
    }
    const myPollutantChart = new Chart(pollutantLineChart, {
      type: "line", // Specify the chart type
      data: {
        labels: categoriesData, // X-axis categories go here
        datasets: fianlItems,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            labels: {
              usePointStyle: true,
              padding: 40,
              boxWidth: 8,
              boxHeight: 8,
              borderWidth: 0,
              color: "#666",
              generateLabels: function (chart) {
                const labelMap = {
                  PM25: "PM2.5",
                  CO: "CO",
                  O3: "O3",
                  NO2: "NO2",
                  SO2: "SO2",
                  PM10: "PM10",
                  // Add more mappings if needed
                };
                return chart.data.datasets.map((dataset, i) => {
                  const label = dataset.label || `Dataset ${i + 1}`;
                  const customLabel = labelMap[label] || label;
                  return {
                    text: customLabel,
                    fillStyle: dataset.backgroundColor,
                    hidden: !chart.isDatasetVisible(i),
                    lineCap: dataset.borderCapStyle,
                    lineDash: dataset.borderDash,
                    lineDashOffset: dataset.borderDashOffset,
                    lineJoin: dataset.borderJoinStyle,
                    lineWidth: dataset.borderWidth,
                    strokeStyle: dataset.borderColor,
                    pointStyle: dataset.pointStyle || "circle", // Default pointStyle
                    datasetIndex: i,
                  };
                });
              },
            },
            onClick: function (e, legendItem, legend) {
              const index = legendItem.datasetIndex;
              const chart = legend.chart;
              const meta = chart.getDatasetMeta(index);
              meta.hidden =
                meta.hidden === null
                  ? !chart.data.datasets[index].hidden
                  : null;
              chart.update();
              updateYAxis(chart);
              updateAllPollutantValues(null, chart);
              var legendItems = chart.legend.legendItems;
              for (var i = 0; i < legendItems.length; i++) {
                if (i === index) {
                  if (meta.hidden) {
                    legend.legendItems[i].hidden = true;
                  } else {
                    legend.legendItems[i].hidden = false;
                  }
                }
              }
            },
          },
          tooltip: {
            enabled: false,
            displayColors: false,
            usePointStyle: false, // Do not use point style
            caretSize: 0,
            external: function (context) {
              if (context.tooltip.opacity === 0) {
                updateAllPollutantValues(null, context.chart);
                return;
              } else {
                updateAllPollutantValues(
                  context.tooltip.dataPoints,
                  context.chart
                );
              }
            },
            callbacks: {
              label: function () {
                return null;
              },
            },
          },
        },
        interaction: {
          mode: "nearest", // The mode 'nearest' makes sure the point closest to the mouse gets highlighted
          axis: "x", // You can set 'y' if you want the hover effect when close to the y-axis instead
          intersect: false, // This allows for showing the hover effect even if not directly over a point
        },
        scales: scales,
      },
    });

    if (fianlItems.some((item) => item.label === "CO")) {
      myPollutantChart.data.datasets[2].yAxisID = "y1";
    }
    updateAllPollutantValues(null, null);
    myPollutantChart.update();
  }
}

function updateYAxis(chart) {
  const activeDatasets = chart.data.datasets.filter((dataset, index) =>
    chart.isDatasetVisible(index)
  );
  const isCOVisible = activeDatasets.some((dataset) => dataset.label === "CO");
  const hasY1Axis = !!chart.options.scales.y1;

  if (!isCOVisible && hasY1Axis) {
    chart.options.scales.y1.display = false;
    chart.data.datasets.forEach((dataset) => {
      if (dataset.label === "CO") {
        dataset.yAxisID = "y";
      }
    });
    chart.update();
    return;
  }
  if (activeDatasets.length === 1 && isCOVisible) {
    chart.options.scales.y.title.text = "CO (mg/m³)";
    chart.options.scales.y.ticks = {
      callback: (value) => value.toFixed(1),
    };
    chart.options.scales.y1.display = false; // Hide y1 axis
    chart.data.datasets.forEach((dataset) => {
      if (dataset.label === "CO") {
        dataset.yAxisID = "y";
      }
    });
  } else if (hasY1Axis) {
    chart.options.scales.y.title.text = "Concentration (µg/m³)";
    chart.options.scales.y.ticks = {};
    chart.options.scales.y1.title.text = "CO (mg/m³)";
    chart.options.scales.y1.ticks = {};
    chart.options.scales.y1.display = true; // Show y1 axis
    chart.data.datasets.forEach((dataset) => {
      if (dataset.label === "CO") {
        dataset.yAxisID = "y1";
      }
    });
  }
  chart.update();
}

function updatePollutantValues(tooltipItems) {
  var index = chartData.length - 1;
  if (tooltipItems != undefined) {
    index = tooltipItems[0].dataIndex;
  }

  // Retrieve data for all pollutants
  var so2 = chartData[index].sO2;
  var no2 = chartData[index].nO2;
  var co = chartData[index].co;
  var pm10 = chartData[index].pM10;
  var pm25 = chartData[index].pM25;
  var o3 = chartData[index].o3;

  // Update the text of the corresponding DOM elements with the pollutant values
  $("#lineChartAqiSo2Value").text(so2);
  $("#lineChartAqiNo2Value").text(no2);
  $("#lineChartAqiCoValue").text(co);
  $("#lineChartAqiPm10Value").text(pm10);
  $("#lineChartAqiPm25Value").text(pm25);
  $("#lineChartAqiO3Value").text(o3);

  if (fianlItems.some((item) => item.label === "CO")) {
    $("#lineChartAqiCoValue").show();
    $("#coaqipollutant").show();
    $(".mg-m3").show();
    $(".line-co-pollutant").show();
  } else {
    $("#lineChartAqiCoValue").hide();
    $("#coaqipollutant").hide();
    $(".mg-m3").hide();
    $(".line-co-pollutant").hide();
  }

  if (fianlItems.some((item) => item.label === "O3")) {
    //$("#lineChartpollutantO3Value").show();
    $("#o3aqipollutant").show();
  } else {
    // $("#lineChartpollutantO3Value").hide();
    $("#o3aqipollutant").hide();
  }
  const aqi = Math.round(chartData[index].aqi);
  var aqiDetails = getAqiStatusAndColorCode(aqi);
  var aqiDetailsNew = getAqiStatusAndColorCodeNew(aqi);
  var currentYearOverview = new Date().getFullYear();
  $("#lineChartAqiValueStatus")
    .text(aqi + " " + aqiDetailsNew.status)
    .css("color", aqiDetailsNew.color);
}
function updateYAxisTitle(chart, newTitle) {
  if (chart.options.scales.y.title.text !== newTitle) {
    chart.options.scales.y.title.text = newTitle;
    chart.update();
  }
}

function updateAllPollutantValues(tooltipItems, chart) {
  var index = chartData.length - 1;
  if (tooltipItems && tooltipItems.length > 0) {
    index = tooltipItems[0].dataIndex;
  }

  // Retrieve data for all pollutants
  var so2 = chartData[index].sO2;
  var no2 = chartData[index].nO2;
  var pm10 = chartData[index].pM10;
  var pm25 = chartData[index].pM25;
  var o3 = chartData[index].o3;
  var co = chartData[index].co;

  if (chart) {
    var datasetLabels = chart.data.datasets.map((ds) => ds.label);
    let otherVisible = false;
    let coVisible = false;
    let coInDataset = datasetLabels.includes("CO");
    // console.log('Chart datasets:', datasetLabels);
    if (
      datasetLabels.includes("SO2") &&
      !chart.isDatasetVisible(datasetLabels.indexOf("SO2"))
    ) {
      $("#lineChartPollutantSo2Value").text(so2).removeClass("bold-black-text");
    } else {
      otherVisible = true;
      $("#lineChartPollutantSo2Value").text(so2).addClass("bold-black-text");
    }

    // Update text and class for NO2
    if (
      datasetLabels.includes("NO2") &&
      !chart.isDatasetVisible(datasetLabels.indexOf("NO2"))
    ) {
      $("#lineChartPollutantNo2Value").text(no2).removeClass("bold-black-text");
    } else {
      otherVisible = true;
      $("#lineChartPollutantNo2Value").text(no2).addClass("bold-black-text");
    }

    // Update text and class for PM10
    if (
      datasetLabels.includes("PM10") &&
      !chart.isDatasetVisible(datasetLabels.indexOf("PM10"))
    ) {
      $("#lineChartPollutantPm10Value")
        .text(pm10)
        .removeClass("bold-black-text");
    } else {
      otherVisible = true;
      $("#lineChartPollutantPm10Value").text(pm10).addClass("bold-black-text");
    }
    if (
      datasetLabels.includes("PM25") &&
      !chart.isDatasetVisible(datasetLabels.indexOf("PM25"))
    ) {
      $("#lineChartPollutantPm25Value")
        .text(pm25)
        .removeClass("bold-black-text");
    } else {
      otherVisible = true;
      $("#lineChartPollutantPm25Value").text(pm25).addClass("bold-black-text");
    }

    // Update text and class for O3
    if (
      datasetLabels.includes("O3") &&
      !chart.isDatasetVisible(datasetLabels.indexOf("O3"))
    ) {
      $("#lineChartPollutantO3Value").text(o3).removeClass("bold-black-text");
    } else if (datasetLabels.includes("O3")) {
      otherVisible = true;
      $("#lineChartPollutantO3Value").text(o3).addClass("bold-black-text");
    }

    // Update text and class for CO
    if (coInDataset && !chart.isDatasetVisible(datasetLabels.indexOf("CO"))) {
      $("#lineChartPollutantCoValue").text(co).removeClass("bold-black-text");
    } else if (coInDataset) {
      coVisible = true;
      $("#lineChartPollutantCoValue").text(co).addClass("bold-black-text");
    }

    // Update y-axis title based on visibility
    if (coVisible && !otherVisible) {
      updateYAxisTitle(chart, "mg/m³");
    } else {
      updateYAxisTitle(chart, "ug/m³");
    }

    // console.log('Pollutant values after visibility check:', { so2, no2, pm10, o3, co });
  }

  if (fianlItems.some((item) => item.label === "SO2")) {
    $("#lineChartPollutantSo2Value").show();
  } else {
    $("#lineChartPollutantSo2Value").hide();
  }

  if (fianlItems.some((item) => item.label === "NO2")) {
    $("#lineChartPollutantNo2Value").show();
    $("#no2pollutant").show();
  } else {
    $("#lineChartPollutantNo2Value").hide();
    $("#no2pollutant").hide();
  }

  if (fianlItems.some((item) => item.label === "PM10")) {
    $("#lineChartPollutantPm10Value").show();
  } else {
    $("#lineChartPollutantPm10Value").hide();
  }
  if (fianlItems.some((item) => item.label === "PM25")) {
    $("#lineChartPollutantPm25Value").show();
  } else {
    $("#lineChartPollutantPm25Value").hide();
  }

  if (fianlItems.some((item) => item.label === "O3")) {
    $("#lineChartPollutantO3Value").show();
    $("#o3pollutant").show();
  } else {
    $("#lineChartPollutantO3Value").hide();
    $("#o3pollutant").hide();
  }

  if (fianlItems.some((item) => item.label === "CO")) {
    $("#lineChartPollutantCoValue").show();
    $("#copollutant").show();
    $(".mg-m3").show();
    $(".line-co-pollutant").show();
  } else {
    $("#lineChartPollutantCoValue").hide();
    $("#copollutant").hide();
    $(".mg-m3").hide();
    $(".line-co-pollutant").hide();
  }

  // Update AQI
  const aqi = Math.round(chartData[index].aqi);
  var aqiDetails = getAqiStatusAndColorCode(aqi);
  var aqiDetailsNew = getAqiStatusAndColorCodeNew(aqi);
  var currentYearOverview = new Date().getFullYear();
  $("#lineChartPollutantValueStatus")
    .text(aqi + " " + aqiDetailsNew.status)
    .css("color", aqiDetailsNew.color);
}

function getThresholdValue(pollutant, filter) {
  switch (pollutant) {
    case pollutantAbbrevations.PM10:
      if (filter.trim() === "Daily") return pollutantThresholdLimits.PM10Daily;
      break;
    case pollutantAbbrevations.SO2:
      if (filter.trim() === "Hourly" || filter.trim() === "Custom") {
        return pollutantThresholdLimits.SO2Hourly;
      } else if (filter.trim() === "Daily") {
        return pollutantThresholdLimits.SO2Daily;
      } else if (filter.trim() === "Yearly") {
        return pollutantThresholdLimits.SO2Yearly;
      }
      break;
    case pollutantAbbrevations.CO:
      if (filter.trim() === "Hourly" || filter.trim() === "Custom")
        return pollutantThresholdLimits.COHourly;
      break;
    case pollutantAbbrevations.O3:
      if (filter.trim() === "Hourly" || filter.trim() === "Custom")
        return pollutantThresholdLimits.O3Hourly;
      break;
    case pollutantAbbrevations.NO2:
      if (filter.trim() === "Hourly" || filter.trim() === "Custom") {
        return pollutantThresholdLimits.NO2Hourly;
      } else if (filter.trim() === "Daily") {
        return pollutantThresholdLimits.NO2Daily;
      }
      break;
  }
  return null;
}

function bindStationDataToBarChart(filter) {
  var barChartData = [];
  var thresholdData = [];
  var categoriesData = [];
  var backgroundColors = [];
  var pollutantBarChartId;
  var pollutantBarChartId1;
  var barChartDataSet = [];
  var boxid, boxid1, boxid2;
  var lastrefreshtime;
  var exceedsThreshold = false;
  let backgroundColor, borderColor;
  const customPlugins = [];
  const customBarColors = {
    id: "customBarColors",
    beforeInit: function (chart) {
      chart.customAnimation = {
        startTime: null,
        duration: 500, // Animation duration in milliseconds
        progress: 0,
      };
    },
    afterDraw: (chart) => {
      var ctx = chart.ctx;
      var cornerRadius = 3;
      var currentTime = Date.now();
      var animation = chart.customAnimation;

      if (!animation.startTime) {
        animation.startTime = currentTime;
      }

      var elapsedTime = currentTime - animation.startTime;
      animation.progress = Math.min(elapsedTime / animation.duration, 1);

      var elapsedTime = currentTime - animation.startTime;
      animation.progress = Math.min(elapsedTime / animation.duration, 1);

      chart.data.datasets.forEach((dataset, datasetIndex) => {
        var meta = chart.getDatasetMeta(datasetIndex);
        meta.data.forEach((bar, index) => {
          var value = dataset.data[index];
          if (value === 0) return;

          var yScale = chart.scales.y;
          var base = yScale.getPixelForValue(0);
          var yPos = yScale.getPixelForValue(value);
          var thresholdY = yScale.getPixelForValue(thresholdValue);
          var barWidth = bar.width;
          var xPos = bar.x - barWidth / 2;

          ctx.save();

          if (value > thresholdValue) {
            // Draw the lower part of the bar (below the threshold)
            ctx.fillStyle = "rgba(0, 75, 135, 1)";
            var animatedHeight = (base - yPos) * animation.progress;
            var animatedYPos = base - animatedHeight;
            drawRoundedRect(
              ctx,
              xPos,
              animatedYPos,
              barWidth,
              animatedHeight,
              cornerRadius,
              true
            );
            ctx.fill();

            // Draw the upper part of the bar (above the threshold)
            ctx.fillStyle = "rgba(246, 94, 95, 1)";
            var upperHeight = (thresholdY - yPos) * animation.progress;
            drawRoundedRect(
              ctx,
              xPos,
              thresholdY - upperHeight,
              barWidth,
              upperHeight,
              cornerRadius,
              true
            );
            ctx.fill();
          } else {
            // Draw the whole bar
            ctx.fillStyle = "rgba(0, 75, 135, 1)";
            var animatedHeight = (base - yPos) * animation.progress;
            var animatedYPos = base - animatedHeight;
            drawRoundedRect(
              ctx,
              xPos,
              animatedYPos,
              barWidth,
              animatedHeight,
              cornerRadius,
              true
            );
            ctx.fill();
          }

          ctx.restore();
        });
      });

      if (animation.progress < 1) {
        requestAnimationFrame(() => chart.update());
      }
    },
  };

  function drawRoundedRect(ctx, x, y, width, height, radius, topRounded) {
    ctx.beginPath();
    if (topRounded) {
      ctx.moveTo(x, y + radius);
      ctx.lineTo(x, y + height - radius);
      ctx.arcTo(x, y + height, x + radius, y + height, radius);
      ctx.lineTo(x + width - radius, y + height);
      ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
      ctx.lineTo(x + width, y + radius);
      ctx.arcTo(x + width, y, x + width - radius, y, radius);
      ctx.lineTo(x + radius, y);
      ctx.arcTo(x, y, x, y + radius, radius);
    } else {
      ctx.moveTo(x, y);
      ctx.lineTo(x + width, y);
      ctx.lineTo(x + width, y + height);
      ctx.lineTo(x, y + height);
      ctx.lineTo(x, y);
    }
    ctx.closePath();
  }

  switch (activePollutant) {
    case pollutantAbbrevations.PM10:
      switch (filter) {
        case "Daily":
          chartData.forEach((item) => {
            barChartData.push(item.pM10);
            categoriesData.push(item.day.split(" "));
            if (item.pM10 > pollutantThresholdLimits.PM10Daily) {
              exceedsThreshold = true;
            }
            backgroundColor = barChartData.map((value) =>
              value > pollutantThresholdLimits.PM10Daily
                ? "rgba(246, 94, 95, 1)"
                : "rgba(0, 75, 135, 1)"
            );
            borderColor = barChartData.map((value) =>
              value > pollutantThresholdLimits.PM10Daily
                ? "rgba(246, 94, 95, 1)"
                : "rgba(0, 75, 135, 1)"
            );
            customPlugins.push(customBarColors);
          });
          break;
        case "Monthly":
          chartData.forEach((item) => {
            barChartData.push(item.pM10);
            categoriesData.push(item.month);
          });
          backgroundColor = "rgba(0, 75, 135, 1)";
          borderColor = "rgba(0, 75, 135, 1)";
          break;
        case "Yearly":
          chartData.forEach((item) => {
            barChartData.push(item.pM10);
            categoriesData.push(item.year);
          });
          backgroundColor = "rgba(0, 75, 135, 1)";
          borderColor = "rgba(0, 75, 135, 1)";
          break;
        default:
          chartData.forEach((item) => {
            barChartData.push(item.pM10);
            const dateParts = item.recordedDate.split("/");
            const formattedDate = `${dateParts[2]}-${dateParts[0].padStart(
              2,
              "0"
            )}-${dateParts[1].padStart(2, "0")}`;

            // Combine the formatted date with the hour, separated by a semicolon
            const formattedString = `${formattedDate};${item.hour}`;
            categoriesData.push(formattedString);
            backgroundColor = "rgba(0, 75, 135, 1)";
            borderColor = "rgba(0, 75, 135, 1)";
          });
          break;
      }
      barChartDataSet.push({
        label: "",
        data: barChartData,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
        lineTension: 0.2,
        borderRadius: 3,
      });
      pollutantBarChartId = "ADstationPm10BarGraph";
      pollutantBarChartId1 = "ADstationPm10BarGraph1";
      boxid = "pm10Barchart1";
      boxid1 = "pm10Barchart";
      boxid2 = "pm10Barchartinner";
      lastrefreshtime = "pm10lastrefreshtime";
      break;
    case pollutantAbbrevations.PM25:
      switch (filter) {
        case "Daily":
          chartData.forEach((item) => {
            barChartData.push(item.pM25);
            categoriesData.push(item.day.split(" "));
            backgroundColor = "rgba(0, 75, 135, 1)";
            borderColor = "rgba(0, 75, 135, 1)";
          });
          break;
        case "Monthly":
          chartData.forEach((item) => {
            barChartData.push(item.pM25);
            categoriesData.push(item.month);
          });
          backgroundColor = "rgba(0, 75, 135, 1)";
          borderColor = "rgba(0, 75, 135, 1)";
          break;
        case "Yearly":
          chartData.forEach((item) => {
            barChartData.push(item.pM25);
            categoriesData.push(item.year);
          });
          backgroundColor = "rgba(0, 75, 135, 1)";
          borderColor = "rgba(0, 75, 135, 1)";
          break;
        default:
          chartData.forEach((item) => {
            barChartData.push(item.pM25);
            const dateParts = item.recordedDate.split("/");
            const formattedDate = `${dateParts[2]}-${dateParts[0].padStart(
              2,
              "0"
            )}-${dateParts[1].padStart(2, "0")}`;

            // Combine the formatted date with the hour, separated by a semicolon
            const formattedString = `${formattedDate};${item.hour}`;
            categoriesData.push(formattedString);
            backgroundColor = "rgba(0, 75, 135, 1)";
            borderColor = "rgba(0, 75, 135, 1)";
          });
          break;
      }
      barChartDataSet.push({
        label: "",
        data: barChartData,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
        lineTension: 0.2,
        borderRadius: 3,
      });
      pollutantBarChartId = "ADstationPm25BarGraph";
      pollutantBarChartId1 = "ADstationPm25BarGraph1";
      boxid = "pm25Barchart1";
      boxid1 = "pm25Barchart";
      boxid2 = "pm25Barchartinner";
      lastrefreshtime = "pm25lastrefreshtime";
      break;
    case pollutantAbbrevations.SO2:
      switch (filter) {
        case "Daily":
          chartData.forEach((item) => {
            barChartData.push(item.sO2);
            categoriesData.push(item.day.split(" "));
            if (item.sO2 > pollutantThresholdLimits.SO2Daily) {
              exceedsThreshold = true;
            }
            backgroundColor = barChartData.map((value) =>
              value > pollutantThresholdLimits.SO2Daily
                ? "rgba(246, 94, 95, 1)"
                : "rgba(0, 75, 135, 1)"
            );
            borderColor = barChartData.map((value) =>
              value > pollutantThresholdLimits.SO2Daily
                ? "rgba(246, 94, 95, 1)"
                : "rgba(0, 75, 135, 1)"
            );
            customPlugins.push(customBarColors);
          });
          break;
        case "Monthly":
          chartData.forEach((item) => {
            barChartData.push(item.sO2);
            categoriesData.push(item.month);
          });
          backgroundColor = barChartData.map(() => "rgba(0, 75, 135, 1)");
          borderColor = barChartData.map(() => "rgba(0, 75, 135, 1)");
          break;
        case "Yearly":
          chartData.forEach((item) => {
            barChartData.push(item.sO2);
            categoriesData.push(item.year);
            if (item.sO2 > pollutantThresholdLimits.SO2Yearly) {
              exceedsThreshold = true;
            }
          });
          backgroundColor = barChartData.map((value) =>
            value > pollutantThresholdLimits.SO2Yearly
              ? "rgba(246, 94, 95, 1)"
              : "rgba(0, 75, 135, 1)"
          );
          borderColor = barChartData.map((value) =>
            value > pollutantThresholdLimits.SO2Yearly
              ? "rgba(246, 94, 95, 1)"
              : "rgba(0, 75, 135, 1)"
          );
          customPlugins.push(customBarColors);
          break;
        default:
          chartData.forEach((item) => {
            barChartData.push(item.sO2);
            const dateParts = item.recordedDate.split("/");
            const formattedDate = `${dateParts[2]}-${dateParts[0].padStart(
              2,
              "0"
            )}-${dateParts[1].padStart(2, "0")}`;

            // Combine the formatted date with the hour, separated by a semicolon
            const formattedString = `${formattedDate};${item.hour}`;
            categoriesData.push(formattedString);
            backgroundColor = barChartData.map((value) =>
              value > pollutantThresholdLimits.SO2Hourly
                ? "rgba(246, 94, 95, 1)"
                : "rgba(0, 75, 135, 1)"
            );
            borderColor = barChartData.map((value) =>
              value > pollutantThresholdLimits.SO2Hourly
                ? "rgba(246, 94, 95, 1)"
                : "rgba(0, 75, 135, 1)"
            );
            customPlugins.push(customBarColors);
          });
          break;
      }

      barChartDataSet.push({
        label: "",
        data: barChartData,
        backgroundColor: backgroundColor,
        // borderColor: borderColor,
        borderWidth: 1,
        lineTension: 0.2,
        borderRadius: 3,
      });
      pollutantBarChartId = "ADstationSo2BarGraph";
      pollutantBarChartId1 = "ADstationSo2BarGraph1";
      boxid = "so2Barchart1";
      boxid1 = "so2Barchart";
      boxid2 = "so2Barchartinner";
      lastrefreshtime = "so2lastrefreshtime";
      break;
    case pollutantAbbrevations.CO:
      switch (filter) {
        case "Daily":
          chartData.forEach((item) => {
            barChartData.push(item.co);
            categoriesData.push(item.day.split(" "));
          });
          backgroundColor = barChartData.map(() => "rgba(0, 75, 135, 1)");
          borderColor = barChartData.map(() => "rgba(0, 75, 135, 1)");
          break;
        case "Monthly":
          chartData.forEach((item) => {
            barChartData.push(item.co);
            categoriesData.push(item.month);
          });
          backgroundColor = barChartData.map(() => "rgba(0, 75, 135, 1)");
          borderColor = barChartData.map(() => "rgba(0, 75, 135, 1)");
          break;
        case "Yearly":
          chartData.forEach((item) => {
            barChartData.push(item.co);
            categoriesData.push(item.year);
          });
          backgroundColor = barChartData.map(() => "rgba(0, 75, 135, 1)");
          borderColor = barChartData.map(() => "rgba(0, 75, 135, 1)");
          break;
        default:
          chartData.forEach((item) => {
            barChartData.push(item.co);
            const dateParts = item.recordedDate.split("/");
            const formattedDate = `${dateParts[2]}-${dateParts[0].padStart(
              2,
              "0"
            )}-${dateParts[1].padStart(2, "0")}`;

            // Combine the formatted date with the hour, separated by a semicolon
            const formattedString = `${formattedDate};${item.hour}`;
            categoriesData.push(formattedString);
            if (item.co > pollutantThresholdLimits.COHourly) {
              exceedsThreshold = true;
            }
          });
          backgroundColor = barChartData.map((value) =>
            value > pollutantThresholdLimits.COHourly
              ? "rgba(246, 94, 95, 1)"
              : "rgba(0, 75, 135, 1)"
          );
          borderColor = barChartData.map((value) =>
            value > pollutantThresholdLimits.COHourly
              ? "rgba(246, 94, 95, 1)"
              : "rgba(0, 75, 135, 1)"
          );
          customPlugins.push(customBarColors);
          break;
      }

      barChartDataSet.push({
        label: "",
        data: barChartData,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
        lineTension: 0.2,
        borderRadius: 3,
      });
      pollutantBarChartId = "ADstationCoBarGraph";
      pollutantBarChartId1 = "ADstationCoBarGraph1";
      boxid = "coBarchart1";
      boxid1 = "coBarchart";
      boxid2 = "coBarchartinner";
      lastrefreshtime = "colastrefreshtime";
      break;
    case pollutantAbbrevations.O3:
      switch (filter) {
        case "Daily":
          chartData.forEach((item) => {
            barChartData.push(item.o3);
            categoriesData.push(item.day.split(" "));
          });
          backgroundColor = barChartData.map(() => "rgba(0, 75, 135, 1)");
          borderColor = barChartData.map(() => "rgba(0, 75, 135, 1)");
          break;
        case "Monthly":
          chartData.forEach((item) => {
            barChartData.push(item.o3);
            categoriesData.push(item.month);
          });
          backgroundColor = barChartData.map(() => "rgba(0, 75, 135, 1)");
          borderColor = barChartData.map(() => "rgba(0, 75, 135, 1)");
          break;
        case "Yearly":
          chartData.forEach((item) => {
            barChartData.push(item.o3);
            categoriesData.push(item.year);
          });
          backgroundColor = barChartData.map(() => "rgba(0, 75, 135, 1)");
          borderColor = barChartData.map(() => "rgba(0, 75, 135, 1)");
          break;
        default:
          chartData.forEach((item) => {
            barChartData.push(item.o3);
            const dateParts = item.recordedDate.split("/");
            const formattedDate = `${dateParts[2]}-${dateParts[0].padStart(
              2,
              "0"
            )}-${dateParts[1].padStart(2, "0")}`;

            // Combine the formatted date with the hour, separated by a semicolon
            const formattedString = `${formattedDate};${item.hour}`;
            categoriesData.push(formattedString);
            if (item.o3 > pollutantThresholdLimits.O3Hourly) {
              exceedsThreshold = true;
            }
          });
          backgroundColor = barChartData.map((value) =>
            value > pollutantThresholdLimits.O3Hourly
              ? "rgba(246, 94, 95, 1)"
              : "rgba(0, 75, 135, 1)"
          );
          borderColor = barChartData.map((value) =>
            value > pollutantThresholdLimits.O3Hourly
              ? "rgba(246, 94, 95, 1)"
              : "rgba(0, 75, 135, 1)"
          );
          customPlugins.push(customBarColors);
          break;
      }

      barChartDataSet.push({
        label: "",
        data: barChartData,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
        lineTension: 0.2,
        borderRadius: 3,
      });
      pollutantBarChartId = "ADstationO3BarGraph";
      pollutantBarChartId1 = "ADstationO3BarGraph1";
      boxid = "o3Barchart1";
      boxid1 = "o3Barchart";
      boxid2 = "o3Barchartinner";
      lastrefreshtime = "o3lastrefreshtime";
      break;
    case pollutantAbbrevations.NO2:
      switch (filter) {
        case "Daily":
          chartData.forEach((item) => {
            barChartData.push(item.nO2);
            categoriesData.push(item.day.split(" "));
            if (item.nO2 > pollutantThresholdLimits.NO2Daily) {
              exceedsThreshold = true;
            }
          });
          backgroundColor = barChartData.map((value) =>
            value > pollutantThresholdLimits.NO2Daily
              ? "rgba(246, 94, 95, 1)"
              : "rgba(0, 75, 135, 1)"
          );
          (borderColor = barChartData.map((value) =>
            value > pollutantThresholdLimits.NO2Daily
              ? "rgba(246, 94, 95, 1)"
              : "rgba(0, 75, 135, 1)"
          )),
            customPlugins.push(customBarColors);
          break;
        case "Monthly":
          chartData.forEach((item) => {
            barChartData.push(item.nO2);
            categoriesData.push(item.month);
          });
          backgroundColor = barChartData.map(() => "rgba(0, 75, 135, 1)");
          borderColor = barChartData.map(() => "rgba(0, 75, 135, 1)");
          break;
        case "Yearly":
          chartData.forEach((item) => {
            barChartData.push(item.nO2);
            categoriesData.push(item.year);
          });
          backgroundColor = barChartData.map(() => "rgba(0, 75, 135, 1)");
          borderColor = barChartData.map(() => "rgba(0, 75, 135, 1)");
          break;
        default:
          chartData.forEach((item) => {
            barChartData.push(item.nO2);
            const dateParts = item.recordedDate.split("/");
            const formattedDate = `${dateParts[2]}-${dateParts[0].padStart(
              2,
              "0"
            )}-${dateParts[1].padStart(2, "0")}`;

            // Combine the formatted date with the hour, separated by a semicolon
            const formattedString = `${formattedDate};${item.hour}`;
            categoriesData.push(formattedString);
            if (item.nO2 > pollutantThresholdLimits.NO2Hourly) {
              exceedsThreshold = true;
            }
          });
          backgroundColor = barChartData.map((value) =>
            value > pollutantThresholdLimits.NO2Hourly
              ? "rgba(246, 94, 95, 1)"
              : "rgba(0, 75, 135, 1)"
          );
          borderColor = barChartData.map((value) =>
            value > pollutantThresholdLimits.NO2Hourly
              ? "rgba(246, 94, 95, 1)"
              : "rgba(0, 75, 135, 1)"
          );
          customPlugins.push(customBarColors);

          break;
      }
      barChartDataSet.push({
        label: "",
        data: barChartData,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
        lineTension: 0.2,
        borderRadius: 3,
      });
      pollutantBarChartId = "ADstationNo2BarGraph";
      pollutantBarChartId1 = "ADstationNo2BarGraph1";
      boxid = "no2Barchart1";
      boxid1 = "no2Barchart";
      boxid2 = "no2Barchartinner";
      lastrefreshtime = "no2lastrefreshtime";
      break;
    default:
      switch (filter) {
        case "Daily":
          chartData.forEach((item) => {
            barChartData.push(item.aqi);
            categoriesData.push(item.day.split(" "));
            backgroundColors.push(colorCodes[getColorClassForAqi(item.aqi)]);
          });
          break;
        case "Monthly":
          chartData.forEach((item) => {
            barChartData.push(item.aqi);
            categoriesData.push(item.month);
            backgroundColors.push(colorCodes[getColorClassForAqi(item.aqi)]);
          });
          break;
        case "Yearly":
          chartData.forEach((item) => {
            barChartData.push(item.aqi);
            categoriesData.push(item.year);
            backgroundColors.push(colorCodes[getColorClassForAqi(item.aqi)]);
          });
          break;
        default:
          chartData.forEach((item) => {
            // Convert "MM/DD/YYYY" to "YYYY-MM-DD"
            const dateParts = item.recordedDate.split("/");
            const formattedDate = `${dateParts[2]}-${dateParts[0].padStart(
              2,
              "0"
            )}-${dateParts[1].padStart(2, "0")}`;

            // Combine the formatted date with the hour, separated by a semicolon
            const formattedString = `${formattedDate};${item.hour}`;
            barChartData.push(item.aqi);
            categoriesData.push(formattedString);
            backgroundColors.push(colorCodes[getColorClassForAqi(item.aqi)]);
          });
          break;
      }
      barChartDataSet = [
        {
          label: "",
          backgroundColor: backgroundColors,
          lineTension: 0.2,
          data: barChartData,
          borderRadius: 3,
        },
      ];
      pollutantBarChartId = "ADstationAqiBarGraph";
      pollutantBarChartId1 = "ADstationAqiBarGraph1";
      boxid = "AqiBarchart1";
      boxid1 = "AqiBarchart";
      boxid2 = "AqiBarchartinner";
      lastrefreshtime = "aqilastrefreshtime";
      break;
  }
  var chartStatus = Chart.getChart(pollutantBarChartId); // <canvas> id
  var chartStatus1 = Chart.getChart(pollutantBarChartId1);
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }
  if (chartStatus1 != undefined) {
    chartStatus1.destroy();
  }
  var barChart = document.getElementById(pollutantBarChartId).getContext("2d");
  var barChart1 = document
    .getElementById(pollutantBarChartId1)
    .getContext("2d");
  var thresholdValue = getThresholdValue(activePollutant, filter);

  const box = document.getElementById(boxid);
  const box1 = document.getElementById(boxid1);
  const box3 = document.getElementById(boxid2);

  var mediaQuery = "(min-width: 768px) and (max-width: 1199px)";
  // Test the media query
  var mql = window.matchMedia(mediaQuery);
  let minDate = new Date();
  let maxDate = new Date();

  var mediaQuery1 = "(min-width: 320px) and (max-width: 767px)";
  // Test the media query
  var mql1 = window.matchMedia(mediaQuery1);
  var mediaQuery2 = "(min-width: 320px) and (max-width: 365px)";
  var mql2 = window.matchMedia(mediaQuery2);
  var mediaQuery3 = "(min-width: 1355px) and (max-width: 1368px)";
  var mql3 = window.matchMedia(mediaQuery3);
  if (filter !== "Monthly" && filter !== "Daily" && filter !== "Yearly") {
    const iso8601Dates = convertToISO8601(categoriesData);
    const dateTimes = iso8601Dates.map((entry) => new Date(entry));
    if (dateTimes.length > 0) {
      if (filter !== "Custom") {
        let lastrefreshdate = dateTimes[dateTimes.length - 1].toLocaleString(
          "en-US",
          {
            hour12: true,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }
        );
        var lastArabicrefreshdate = lastrefreshdate.replace(
          /AM|PM/g,
          function (match) {
            return match === "AM" ? "ص" : "م";
          }
        );
        var lastEnglishrefreshdate = lastrefreshdate;
        $("#" + lastrefreshtime).text(
          currentLanguage == "arabic"
            ? lastArabicrefreshdate
            : lastEnglishrefreshdate
        );
        $("#colastrefreshtime").text(
          currentLanguage == "arabic"
            ? lastArabicrefreshdate
            : lastEnglishrefreshdate
        );
        $("#o3lastrefreshtime").text(
          currentLanguage == "arabic"
            ? lastArabicrefreshdate
            : lastEnglishrefreshdate
        );
      }
      minDate = new Date(Math.min(...dateTimes));
      maxDate = new Date(Math.max(...dateTimes));
    }
    minDateString = minDate.toISOString().split("T")[0];
    maxDateString = maxDate.toISOString().split("T")[0];

    box.style.height = "298px";
    box.style.marginTop = "-0.4rem";
    box3.style.width = "300%";
    if (mql.matches) {
      if (boxid == "AqiBarchart1") {
        box.style.height = "308px";
        box.style.marginTop = "1.1rem";
      } else {
        box.style.height = "318px";
        box.style.marginTop = "-0.4rem";
      }
      box1.style.marginLeft = "-7px";
    }
    if (mql1.matches) {
      if (boxid == "AqiBarchart1") {
        box.style.height = "284px";
        box.style.marginTop = "1.4rem";
      } else {
        box.style.height = "298px";
        box.style.marginTop = "-0.4rem";
      }
      box1.style.marginLeft = "0px";
    }
    if (mql2.matches) {
      if (boxid == "AqiBarchart1") {
        box.style.height = "269px";
        box.style.marginTop = "1.4rem";
      } else {
        box.style.height = "282px";
        box.style.marginTop = "-0.4rem";
      }
      box1.style.marginLeft = "0px";
    }
    if (mql3.matches) {
      if (boxid == "AqiBarchart1") {
        box.style.setProperty("height", "240px", "important");
        box.style.marginTop = "-1.0rem";
      } else if (boxid == "pm25Barchart1") {
        box.style.setProperty("height", "240px", "important");
        box.style.marginTop = "0rem";
      } else if (boxid == "o3Barchart1") {
        box.style.setProperty("height", "240px", "important");
        box.style.marginTop = "-0.1rem";
      } else if (boxid == "no2Barchart1") {
        box.style.setProperty("height", "240px", "important");
        box.style.marginTop = "-0.2rem";
      } else {
        box.style.setProperty("height", "238px", "important");
        box.style.marginTop = "0.2rem";
      }
      box1.style.marginLeft = "-10px";
    }

    var constructBarChart = new Chart(barChart, {
      type: "bar",
      data: {
        labels: iso8601Dates,
        fill: false,
        //datasets: barChartDataSet
        datasets: barChartDataSet.map((dataset) => ({
          ...dataset,
          offset: 5,
          clip: { left: 0, top: 0, right: 0, bottom: 0 },
        })),
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
        toolbar: {
          show: false,
          tools: {
            download: false,
          },
        },
        plugins: {
          legend: {
            display: false, // This hides the legend
          },
          title: {
            display: true,
            // text: 'Chart.js Bar Chart - Stacked'
          },
          annotation: {
            annotations:
              thresholdValue !== null
                ? {
                    thresholdLine: {
                      type: "line",
                      yMin: thresholdValue,
                      yMax: thresholdValue,
                      borderColor: "#808080",
                      borderWidth: 2,
                      borderDash: [5, 5],
                      label: {
                        content: `Threshold: ${thresholdValue} µg/m³`,
                        enabled: true,
                        position: "center",
                        backgroundColor: "rgba(0,0,0,0.7)", // optional: label background color
                        color: "#fff", // optional: label text color
                        font: {
                          style: "bold",
                          size: 12, // optional: label text size
                        },
                      },
                    },
                  }
                : {},
          },
          tooltip: {
            enabled: false,
            zIndex: 9999,
            callbacks: {
              title: function (tooltipItems) {
                if (tooltipItems && tooltipItems.length > 0) {
                  // Get the label of the first tooltip item, which is the date string
                  let fullTimestamp = tooltipItems[0].label;
                  // Manually parse the hour from the timestamp
                  let hourMatch = fullTimestamp.match(/\b(\d+):/);
                  let meridiemMatch = fullTimestamp.match(/(a\.m\.|p\.m\.)/i);
                  let hour = hourMatch ? parseInt(hourMatch[1], 10) : 0;
                  let meridiem = meridiemMatch
                    ? meridiemMatch[0].toUpperCase().replace(/\./g, "")
                    : "AM";
                  // Convert to 12-hour format if needed
                  hour = hour === 0 ? 12 : hour; // Convert 0 hours to 12 AM
                  hour = hour < 10 ? "0" + hour : hour; // Pad single digit hours with a zero
                  // Return the formatted string
                  return `${hour} ${meridiem}`;
                }
              },
              label: function (context) {
                // Return the value for the tooltip
                let value = context.raw;
                if (value === null) {
                  value = 0;
                }
                if (pollutantBarChartId == "ADstationAqiBarGraph") {
                  return value === 0 ? "0" : value;
                } else if (pollutantBarChartId == "ADstationCoBarGraph") {
                  return value + " mg/m³";
                } else {
                  return value + " ug/m³";
                }
              },
            },
            external: function (context) {
              // Tooltip Element
              var tooltipEl = document.getElementById("chartjs-tooltip");

              // Create element on first render
              if (!tooltipEl) {
                tooltipEl = document.createElement("div");
                tooltipEl.id = "chartjs-tooltip";
                tooltipEl.classList.add("chartjs-tooltip");
                document.body.appendChild(tooltipEl);
              }

              // Hide if no tooltip
              var tooltipModel = context.tooltip;
              if (tooltipModel.opacity === 0) {
                tooltipEl.style.opacity = 0;
                return;
              }

              // Set caret position
              tooltipEl.classList.remove("above", "below", "no-transform");
              if (tooltipModel.yAlign) {
                tooltipEl.classList.add(tooltipModel.yAlign);
              } else {
                tooltipEl.classList.add("no-transform");
              }

              // Set Text
              if (tooltipModel.body) {
                var bodyLines = tooltipModel.body.map(function (bodyItem) {
                  return bodyItem.lines;
                });

                var innerHtml = "<tbody>";

                bodyLines.forEach(function (body) {
                  innerHtml += "<tr><td>" + body + "</td></tr>";
                });
                innerHtml += "</tbody>";

                var tableRoot = tooltipEl.querySelector("table");
                if (!tableRoot) {
                  var table = document.createElement("table");
                  tooltipEl.appendChild(table);
                  tableRoot = table;
                }

                tableRoot.innerHTML = innerHtml;
              }

              var position = context.chart.canvas.getBoundingClientRect();

              // Display, position, and set styles for font
              tooltipEl.style.opacity = 1;
              tooltipEl.style.position = "absolute";
              tooltipEl.style.left =
                position.left + window.pageXOffset + tooltipModel.caretX + "px";
              const tooltipOffset = 10;
              tooltipEl.style.top =
                position.top +
                window.pageYOffset +
                tooltipModel.caretY -
                tooltipOffset +
                "px";
              tooltipEl.style.font = tooltipModel.options.bodyFont.string;
              tooltipEl.style.padding =
                tooltipModel.options.padding +
                "px " +
                tooltipModel.options.padding +
                "px";
              tooltipEl.style.pointerEvents = "none";
            },
          },
        },
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            type: "time",
            time: {
              unit: "hour",
              tooltipfirmat: "HH:mm a",
              displayFormats: {
                hour: "hh a",
              },
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 20,
            },
            grid: {
              display: false,
            },
            //reverse: true,
            stacked: true,
          },
          x1: {
            id: "x1",
            type: "time",
            position: "bottom",
            time: {
              unit: "day",
              tooltipFormat: "MMM d",
              displayFormats: {
                day: "MMM d",
              },
            },
            grid: {
              //display: false,
              drawOnChartArea: false,
            },
            // reverse: true,
            ticks: {
              // Auto-skip prevents label overlapping.
              autoSkip: true,
              // Max 20 ticks, adjust as needed.
              maxTicksLimit: 20,
            },

            min: minDateString,
            max: maxDateString,
          },
          y: exceedsThreshold
            ? {
                display: false,
                ticks: {
                  display: false,
                },
                grid: {
                  display: false,
                },
                gridLines: {
                  drawBorder: false,
                },
                afterFit: (ctx) => {
                  //console.log(ctx);
                  ctx.width = 0.3;
                },
                stacked: true,
                //beginAtZero: true
              }
            : {
                display: false,
                min: 0,
                max: thresholdValue,
                ticks: {
                  display: false,
                },
                grid: {
                  display: false,
                },
                gridLines: {
                  drawBorder: false,
                },
                afterFit: (ctx) => {
                  //console.log(ctx);
                  ctx.width = 0.3;
                },
                stacked: true,
                //beginAtZero: true
              },

          y1: exceedsThreshold
            ? {
                display: false,
                ticks: {
                  beginAtZero: true,
                  callback: function (value) {
                    return value;
                  },
                },
                grid: {
                  drawOnChartArea: false,
                },
                stacked: true,
                type: "linear",
                position: "left",
              }
            : {
                display: false,
                min: 0,
                max: thresholdValue,
                type: "linear",
                position: "left",
                stacked: true,
                ticks: {
                  beginAtZero: true,
                  callback: function (value) {
                    return value;
                  },
                },
                grid: {
                  drawOnChartArea: false,
                },
              },
        },

        animations: {
          tension: {
            duration: 2000,
            easing: "easeInCubic",
          },
        },
      },
      plugins: customPlugins,
    });

    var constructBarChart1 = new Chart(barChart1, {
      type: "bar",
      data: {
        labels: iso8601Dates,
        fill: false,
        //datasets: barChartDataSet
        datasets: barChartDataSet.map((dataset) => ({
          ...dataset,
          // barThickness: 10,
          //barWidth:20,
          //barPercentage: 0.5,
          //offset: 5
        })),
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 40,
            bottom: 25,
          },
        },
        scales: {
          x: {
            ticks: {
              display: false,
            },
            grid: {
              display: false,
            },
            stacked: true,
          },
          y: exceedsThreshold
            ? {
                grid: {
                  display: false,
                },
                afterFit: (ctx) => {
                  ctx.width = 40;
                },
                stacked: true,
              }
            : {
                min: 0,
                max: thresholdValue,
                grid: {
                  display: false,
                },
                afterFit: (ctx) => {
                  ctx.width = 40;
                },
                stacked: true,
              },
        },
        plugins: {
          legend: {
            display: false,
          },
          annotation: {
            annotations:
              thresholdValue !== null
                ? {
                    thresholdLine: {
                      type: "line",
                      yMin: thresholdValue,
                      yMax: thresholdValue,
                      borderColor: "#808080",
                      borderWidth: 2,
                      borderDash: [5, 5],
                      label: {
                        content: "test",
                        enabled: true,
                        position: "center",
                        yAdjust: -10,
                        backgroundColor: "rgba(0,0,0,0.7)", // optional: label background color
                        color: "#fff", // optional: label text color
                        font: {
                          style: "bold",
                          size: 12, // optional: label text size
                        },
                      },
                    },
                  }
                : {},
          },
        },
      },

      animations: {
        tension: {
          duration: 2000,
          easing: "easeInCubic",
        },
      },
    });
  } else {
    if (filter !== "Daily") {
      box.style.height = "315px";
      box3.style.width = "100%";
    } else {
      box.style.height = "308px";
      box.style.marginTop = "-0.4rem";
      box3.style.width = "150%";
    }
    if (mql.matches) {
      if (boxid == "AqiBarchart1") {
        box.style.height = "318px";
        box.style.marginTop = "1.1rem";
      } else {
        box.style.height = "328px";
        box.style.marginTop = "-0.4rem";
      }
    }
    if (mql1.matches) {
      if (filter !== "Daily") {
        box.style.height = "300px";
        box1.style.marginLeft = "-10px";
      } else {
        if (boxid == "AqiBarchart1") {
          box.style.height = "292px";
          box.style.marginTop = "1.5rem";
        } else {
          box.style.height = "307px";
          box.style.marginTop = "-0.4rem";
        }
        box1.style.marginLeft = "0px";
      }
    }
    if (mql3.matches) {
      if (filter !== "Daily") {
        box.style.height = "300px";
        box1.style.marginLeft = "0px";
      } else {
        if (boxid == "AqiBarchart1") {
          box.style.setProperty("height", "250px", "important");
          box.style.marginTop = "-1rem";
        } else if (boxid == "pm25Barchart1") {
          box.style.setProperty("height", "257px", "important");
          box.style.marginTop = "0.3rem";
        } else {
          box.style.setProperty("height", "257px", "important");
          box.style.marginTop = "-0.5rem";
        }
        box1.style.marginLeft = "0px";
      }
    }
    var constructBarChart = new Chart(barChart, {
      type: "bar",
      data: {
        labels: categoriesData,
        fill: false,
        datasets: barChartDataSet,
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
        toolbar: {
          show: false,
          tools: {
            download: false,
          },
        },
        plugins: {
          legend: {
            display: false, // This hides the legend
          },
          title: {
            display: true,
            // text: 'Chart.js Bar Chart - Stacked'
          },
          annotation: {
            annotations: thresholdValue
              ? {
                  thresholdLine: {
                    type: "line",
                    yMin: thresholdValue,
                    yMax: thresholdValue,
                    borderColor: "#808080",
                    borderWidth: 2,
                    borderDash: [5, 5],
                    label: {
                      content: "Threshold: ${thresholdValue} µg/m³",
                      enabled: true,
                      position: "end",
                    },
                  },
                }
              : {},
          },
          tooltip: {
            enabled: false, // Enable the default tooltip
            zIndex: 9999, // Ensures tooltip is above other elements

            callbacks: {
              title: function () {
                return ""; // No title
              },
              label: function (context) {
                // Return the value for the tooltip
                let value = context.raw;
                if (value === null) {
                  value = 0;
                }
                if (pollutantBarChartId == "ADstationAqiBarGraph")
                  if (value == 0) {
                    return "0";
                  } else return value;
                else if (pollutantBarChartId == "ADstationCoBarGraph")
                  return value + " mg/m³";
                else return value + " ug/m³";
              },
            },
            external: function (context) {
              // Tooltip Element
              var tooltipEl = document.getElementById("chartjs-tooltip");

              // Create element on first render
              if (!tooltipEl) {
                tooltipEl = document.createElement("div");
                tooltipEl.id = "chartjs-tooltip";
                tooltipEl.classList.add("chartjs-tooltip");
                document.body.appendChild(tooltipEl);
              }

              // Hide if no tooltip
              var tooltipModel = context.tooltip;
              if (tooltipModel.opacity === 0) {
                tooltipEl.style.opacity = 0;
                return;
              }

              // Set caret position
              tooltipEl.classList.remove("above", "below", "no-transform");
              if (tooltipModel.yAlign) {
                tooltipEl.classList.add(tooltipModel.yAlign);
              } else {
                tooltipEl.classList.add("no-transform");
              }

              // Set Text
              if (tooltipModel.body) {
                var bodyLines = tooltipModel.body.map(function (bodyItem) {
                  return bodyItem.lines;
                });

                var innerHtml = "<tbody>";

                bodyLines.forEach(function (body) {
                  innerHtml += "<tr><td>" + body + "</td></tr>";
                });
                innerHtml += "</tbody>";

                var tableRoot = tooltipEl.querySelector("table");
                if (!tableRoot) {
                  var table = document.createElement("table");
                  tooltipEl.appendChild(table);
                  tableRoot = table;
                }

                tableRoot.innerHTML = innerHtml;
              }

              var position = context.chart.canvas.getBoundingClientRect();

              // Display, position, and set styles for font
              tooltipEl.style.opacity = 1;
              tooltipEl.style.position = "absolute";
              tooltipEl.style.left =
                position.left + window.pageXOffset + tooltipModel.caretX + "px";
              const tooltipOffset = 10;
              tooltipEl.style.top =
                position.top +
                window.pageYOffset +
                tooltipModel.caretY -
                tooltipOffset +
                "px";
              tooltipEl.style.font = tooltipModel.options.bodyFont.string;
              tooltipEl.style.padding =
                tooltipModel.options.padding +
                "px " +
                tooltipModel.options.padding +
                "px";
              tooltipEl.style.pointerEvents = "none";
            },
          },
        },
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            ticks: {
              maxRotation: 0,
              minRotation: 0,
            },
            grid: {
              display: false, // This will remove the Y-axis grid lines
              drawBorder: false, // Optional: if you also want to remove the axis border
            },
            stacked: true,
          },
          //y: {
          //    //  beginAtZero: true,
          //    display: false,
          //    ticks: {
          //        display: false
          //    },
          //    grid: {
          //        display: false
          //    },
          //    gridLines: {
          //        drawBorder: false,
          //    },
          //    stacked: true
          //},
          y: exceedsThreshold
            ? {
                display: false,
                ticks: {
                  display: false,
                },
                grid: {
                  display: false,
                },
                gridLines: {
                  drawBorder: false,
                },
                stacked: true,
                afterFit: (ctx) => {
                  ctx.width = 0.3;
                },
              }
            : {
                min: 0,
                max: thresholdValue,
                display: false,
                ticks: {
                  display: false,
                },
                grid: {
                  display: false,
                },
                gridLines: {
                  drawBorder: false,
                },
                stacked: true,
                afterFit: (ctx) => {
                  ctx.width = 0.3;
                },
              },
        },
        //plugins,
        animations: {
          tension: {
            duration: 2000,
            easing: "easeInCubic",
          },
        },
      },
      plugins: customPlugins,
    });

    var constructBarChart1 = new Chart(barChart1, {
      type: "bar",
      data: {
        labels: categoriesData,
        fill: false,
        datasets: barChartDataSet,
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
        toolbar: {
          show: false,
          tools: {
            download: false,
          },
        },
        layout: {
          padding: {
            top: 40,
            bottom: 20,
          },
        },
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            ticks: {
              display: false,
            },
            grid: {
              display: false,
            },
            stacked: true,
          },
          y: exceedsThreshold
            ? {
                grid: {
                  display: false,
                },
                afterFit: (ctx) => {
                  ctx.width = 40;
                },
                stacked: true,
              }
            : {
                min: 0,
                max: thresholdValue,
                grid: {
                  display: false,
                },
                afterFit: (ctx) => {
                  ctx.width = 40;
                },
                stacked: true,
              },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },

      animations: {
        tension: {
          duration: 2000,
          easing: "easeInCubic",
        },
      },
    });
  }
  constructBarChart1.update();
  constructBarChart.update();
  const legendSeriesElements = document.querySelectorAll(".Exceeds");
  legendSeriesElements.forEach((element) => {
    if (exceedsThreshold) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
  var $barchart = $("#" + boxid1);
  var maxScroll = $barchart.prop("scrollWidth") - $barchart.outerWidth();
  $barchart.animate(
    {
      scrollLeft: maxScroll,
    },
    10
  );
}

function findMinMaxDates(dataset) {
  const dateTimes = dataset.map((entry) => {
    // Splitting the entry into date and time parts
    const [datePart, timePart] = entry.split(";");
    // Parsing the date and time into a Date object
    return new Date(`${datePart} ${timePart}`);
  });

  // Finding the minimum and maximum dates
  const minDate = new Date(Math.min(...dateTimes));
  const maxDate = new Date(Math.max(...dateTimes));

  // Formatting dates back to the required string format, if necessary
  // For this example, we're assuming the Chart.js needs the input in 'YYYY-MM-DD' format
  const minDateString = minDate.toISOString().split("T")[0];
  const maxDateString = maxDate.toISOString().split("T")[0];

  return { minDateString, maxDateString };
}

function convertToISO8601(dateTimeStrings) {
  return dateTimeStrings.map((dateTime) => {
    const [date, timePart] = dateTime.split(";");
    let [time, ampm] = timePart.split(" ");
    let [hours, minutes] = time.split(":");

    // Adding minutes if they are missing (for whole hours)
    minutes = minutes || "00";

    // Convert hours to 24-hour format
    if (ampm === "PM" && hours !== "12") {
      hours = (parseInt(hours, 10) + 12).toString();
    } else if (ampm === "AM" && hours === "12") {
      hours = "00";
    }

    // Construct ISO8601 format
    return `${date}T${hours}:${minutes}:00`;
  });
}

function updateCharts(selectedFilter) {
  // Do not remove below code starts---------------------------------
  $(
    "#lineChartAqiSo2Value, #lineChartAqiNo2Value, #lineChartAqiCoValue, #lineChartAqiPm10Value, #lineChartAqiPm25Value, #lineChartAqiO3Value"
  ).text("");
  $("button.quality-button-dropdown").text(selectedFilter);
  const filterData =
    currentLanguage === "arabic"
      ? chartFilterArabic.Custom
      : chartFilter.Custom;
  if (selectedFilter != filterData) {
    getStationChartApi(selectedFilter);
  }
  // Do not remove below code ends---------------------------------
}

function bindYearsToDropDown() {
  var startYear = 2016;
  var currentYear = new Date().getFullYear();
  var yearDropDownEl = $("#yearDropDown");
  while (startYear <= currentYear) {
    yearDropDownEl.append(
      `<li>
            <a class="dropdown-item" href="javascript: void(0)"
            onclick="onClickYearOfAirAnalytics(` +
        startYear +
        `)">` +
        startYear +
        `</a>
        </li>`
    );
    ++startYear;
  }
  var selectedYearEl = $("#selectedyear");
  selectedYearEl.html(currentYear);
  selectedYearEl.append(`<span>
        <i class="fa fa-sort-desc"
        aria-hidden="true"></i>
    </span>`);
}

function getPollutantWithUnits(value) {
  var el;
  switch (value) {
    case pollutantAbbrevations.PM10:
      el = `PM<sub>10</sub>`;
      break;
    case pollutantAbbrevations.PM25:
      el = `PM<sub>2.5</sub>`;
      break;
    case pollutantAbbrevations.NO2:
      el = `NO<sub>2</sub>`;
      break;
    case pollutantAbbrevations.SO2:
      el = `SO<sub>2</sub>`;
      break;
    case pollutantAbbrevations.H2S:
      el = `H<sub>2</sub>S`;
      break;
    case pollutantAbbrevations.O3:
      el = `O<sub>3</sub>`;
      break;
    default:
      el = value;
      break;
  }
  return el;
}

var imageData = [
  {
    imageUrl: "./images/new-images/e_linking.jpg",
    content: "E- linking for Continuous Emission Monitoring System",
    description:
      "E- linking for Continuous Emission Monitoring System project is an Abu Dhabi Government initiative to support improvement of the quality of the environment and protect public health.  This project involves the collection of emission data from continuous emission monitoring systems (CEMS), from industrial facilities, to centralized databased system in EAD as well as establishing manual reporting mechanisms for facilities without CEMS.  E-linking project will enable EAD to develop a comprehensive database based on real time data. The project is also including a portal that is designed and implemented to enable visualization of data in near real time. This will help EAD to develop best practice approach to emissions monitoring and ensure quality data is available. This dashboard provides features such as GIS, dispersion modelling, emission exceedance alerts, producing required reports and manage data workflow. Also, the portal will ensure quality of the received data (automated and manual data) and enable communication with facilities regarding data discrepancies.",
  },
  {
    imageUrl: "./images/new-images/Monitoring_network.jpg",
    content: "Abu Dhabi Air Quality Monitoring Program",
    description:
      "The Environment Agency – Abu Dhabi (EAD) started monitoring air quality in 2007. The monitoring network consist of 20 stations and 2 mobile stations. The stations collect readings on concentrations of Sulphur Dioxide (SO2), Nitrogen Dioxide (NO2), Ozone (O3), Hydrogen Sulphide (H2S), Carbon Monoxide (CO), Particulate Matter (PM10, PM2.5), Methan (CH4), BTEX. BTEX is an acronym or expression for a group of volatile organic compounds that include Benzene, Toluene, Ethylbenzene, and Xylenes. These compounds are air pollutants commonly found in emissions from industrial activities, oil refining processes, and vehicle exhaust. All EAD air quality monitoring stations are equipped with sensors to record meteorological parameters, which are essential to understand the ambient air quality patterns and local meteorological conditions. The meteorological parameters measured are wind speed, wind direction, temperature, relative humidity, net radiation and barometric pressure. EAD simplifies the Ambient Air Quality State by calculating the AQI Range based on Air Quality National Standards for the major five parameters; Particulate matter, Ground level ozone, Sulphur dioxide, Nitrogen dioxide and Carbon monoxide.",
  },
  {
    imageUrl: "./images/new-images/quality-monitoring.jpg",
    content: "Abu Dhabi Air Quality Modelling",
    description:
      "To enhance its air quality monitoring system, the Environment Agency – Abu Dhabi (EAD) has developed and implemented a sophisticated, multi-theme air quality modelling system for Abu Dhabi. The system will support regulation via the assessment of cumulative air quality impacts expected from new facilities and urban development projects, reduce public exposure to air pollution and support the improvement in air quality across Abu Dhabi, while helping to assess the effectiveness of future action plans and policies. It will also provide expert technical support, training and capacity building to enable the identification of pollution hotspots where elevated pollutant concentrations occur, and the development of detailed emirate-wide annual air quality maps.",
  },
  {
    imageUrl: "./images/new-images/inventory-img.png",
    content: "Abu Dhabi Air Emissions Inventory",
    description:
      "The Environment Agency – Abu Dhabi (EAD) is focused on creating an update to the inventory of air emissions within Abu Dhabi focusing on some specific parameters: SO, NOx, CO, PM10, PM2.5, NMVOC, NH3, CO2, and BC.The project emphasizes the significant contributors to Abu Dhabi's air emissions. These sectors encompass electricity production, oil and gas production, industrial processing, and road transport, which takes into account both exhaust and non-exhaust emissions. Additionally, shipping, aviation, railways, agriculture and livestock, waste, and construction are integral parts of this investigative endeavour. This comprehensive database aims to systematically recognize the primary sectors contributing the most to air emissions, thus offering clarity on areas of focus. An integral goal is to boost public understanding and interest in the significance of air quality, encouraging communal responsibility and involvement. The data will lay a foundation for precise air quality modelling, facilitating both predictive and preventive measures. By establishing a detailed baseline, the inventory will become essential for future environmental strategies, policy-making, and planning. It will also provide guidance for setting clear emission limits and formulating targeted reduction goals. Furthermore, the inventory will enable consistent monitoring of the environmental performance of individual sectors and entities, fostering a culture of accountability. Based on the insights garnered, effective mitigation measures tailored to specific challenges and sectors can be designed, ensuring a holistic approach to preserving and enhancing Abu Dhabi's environment",
  }, //13-May-24
  {
    imageUrl: "./images/new-images/GHG1.jpg",
    content: "Greenhouse Gas Inventory and Forecasting",
    description:
      "In line with its strategic priority to secure the resilience of Abu Dhabi through mitigation and adaptation to climate change, and protection of air and marine water, the Environment Agency - Abu Dhabi (EAD) was pro-active in commencing biennial GHG inventories as part of its comprehensive plan for monitoring atmospheric emissions in the emirate. Those inventories were instrumental in laying a foundation of knowledge regarding the baseline emissions and projections in the emirate, and also in strengthening the capacity of local entities for efficiently tracking and reporting their sectors’ emissions.Abu Dhabi GHG inventory implies quantifying GHG emissions and removals by gas and by source or sink. The inventory targets all anthropogenic sources and sinks; namely energy, industrial processes, land-use change and forestry, agriculture, and waste. Following the IPCC Guidelines for National GHG Inventories, the inventory project focuses on the primary gases that directly contribute to global warming such as (CO2, CH4, N2O, HFCs, PFCs, SF6).The GHG project also assesses the potential of future emission reductions by the existing sustainable development plans and mitigation strategies in the Emirate.",
  },
  {
    imageUrl: "./images/new-images/Odor.jpg",
    content: "Abu Dhabi Odorous Gases Monitoring Network",
    description:
      "Abu Dhabi Odorous Gases Monitoring Network is a five-year project that encompass a variety of activities across all type of industry do not adversely impact the environment and local community and will serve as a valuable tool for early detection and response for odorous gases, which cause a public nuisance.  By operating 50 fixed and 2 mobile detecting devices to establish odour monitoring and management framework. Currently, EAD responds to odour complaints by deploying a portable odour monitoring device to check real-time concentrations of odorous gases, as well as locates a mobile air quality monitoring station to measure real-time concentrations of air pollutants, windspeed and wind direction. Both sets of measuring technologies provide valuable insights into the identity of odorous gases, their concentration in ambient air, sources, and dispersion.",
  },
  {
    imageUrl: "./images/new-images/Freepik1.png",
    content: "Mapping Ambient Noise in Abu Dhabi",
    description:
      "The noise project seeks to address significant noise sources pinpointing affected residential districts, rating their impact, and translating findings into a visual map. The project involves data gathering from government entities, utilizing EAD data, conducting additional noise monitoring, and proposing mitigation measures. The aim of this project is to map the Abu Dhabi districts most affected by noise sources.",
  }, // 13-May-24
  {
    imageUrl: "./images/new-images/Remote_sensing.jpg",
    content: "Remote Sensing of Real-World Emissions",
    description:
      "The remote sensing of real-world emissions will improve the understanding of the air quality in Abu Dhabi Emirate and UAE. The development of a remote sensing measurement campaign of road transport is a fundamental component of the air quality management program in Abu Dhabi.The outputs of the project will provide essential information for designing effective measures to reduce emissions from road transport with science-based information that will support the General Secretariat of the Executive Council, Environment Agency – Abu Dhabi, Ministry of Climate Change and Environment, Abu Dhabi Police, Health Authority – Abu Dhabi, Department of Transport and other public and private stakeholders.",
  },
  {
    imageUrl: "./images/new-images/EAD_Research.jpg",
    content: "Abu Dhabi Atmospheric Research Expedition",
    description:
      "The Agency was the first organisation in the world to conduct atmospheric research from Spain to Abu Dhabi, which covered 25 countries and eight seas and oceans on a journey of more than 10,000 km. The pioneering Atmospheric Research Expedition in the Arabian Gulf undertook a comprehensive examination of the transportation and the subsequent transformation of hydrocarbons and nitrogen oxides. The campaign also sought to assess how pollution from the Arabian Gulf is transported to other regions and to evaluate its contribution to the formation of ozone in the United Arab Emirates.",
  },
  {
    imageUrl: "./images/new-images/EAD_Smog-Free Tower_web.jpg",
    content: "Smog-Free Tower",
    description:
      "The Environment Agency – Abu Dhabi (EAD) and Modon Properties inaugurated the region’s first smog-free tower at Surf Abu Dhabi, the world’s most advanced artificial wave facility that is taking shape on Hudayriyat Island. The new air purification tower is an urban innovation designed to enhance air quality in the area and provide an inspirational experience of a clean and green future. The seven-meter aluminium tower uses environmentally friendly positive ionization technology to purify surrounding air, cleaning 30,000 m3 of air per hour. The ionization technology produces smog-free air in public spaces, allowing people to breathe and experience clean air, using only 1,170 watts of electricity, comparable to a kettle.",
  },
];

var imageDataArabic = [
  {
    imageUrl: "./images/new-images/e_linking.jpg",
    // content: "الربط الإلكتروني لأنظمة المراقبة المستمرة لمداخن المنشآت الصناعية",
    content:
      "الربط الإلكتروني لأنظمة المراقبة المستمرة لمداخن المنشآت الصناعية",
    // description:"مشروع الربط الإلكتروني لأنظمة مراقبة الانبعاثات المستمرة هو مبادرة من حكومة ابوظبي لدعم تحسين جودة البيئة وحماية الصحة العامة في الامارة. يقوم المشروع بجمع بيانات أنظمة مراقبة الانبعاثات المستمرة (CEMS)  لمداخن المنشآت الصناعية وحفظها في قاعدة بيانات مركزية في هيئة البيئة - أبوظبي، بالإضافة إلى إنشاء آلية لرفع  تقارير الانبعاثات للمنشآت التي لا تمتلك أنظمة مراقبة مستمرة بشكل يدوي. كما سيمكن مشروع الربط الإلكتروني الهيئة من تطوير قاعدة بيانات دقيقة ومتكاملة وفي الوقت الفعلي للانبعاثات الصناعية ويتضمن  بوابة إلكترونية مصممة لعرض هذه البيانات بشكل شامل ودقيق يساهم في تطوير ممارسات أفضل للمراقبة  تضمن توفير بيانات عالية الجودة من القطاع الصناعي في امارة ابوظبي. وتوفر المنصة مجموعة من الميزات الفنية المساعدة مثل نظم المعلومات الجغرافية (GIS) ونماذج تشتت الانبعاثات ونظام للتنبيهات عن تجاوز الانبعاثات الحدود الوطنية، بلاضافةالى ميزة إصدار التقارير الفنية وإدارة تدفق البيانات وغيرها. كما ستعنى المنصة بجودة البيانات المستلمة (الآلية و اليدوية) وتمكين  التواصل المستمر والمباشر مع المنشآت الصناعية حول كافة البيانات والمعلومات الفنية."
    description:
      "مشروع الربط الإلكتروني لأنظمة مراقبة الانبعاثات المستمرة هو مبادرة من حكومة ابوظبي لدعم تحسين جودة البيئة وحماية الصحة العامة في الامارة. يقوم المشروع بجمع بيانات أنظمة مراقبة الانبعاثات المستمرة (CEMS)  لمداخن المنشآت الصناعية وحفظها في قاعدة بيانات مركزية في هيئة البيئة - أبوظبي، بالإضافة إلى إنشاء آلية لرفع  تقارير الانبعاثات للمنشآت التي لا تمتلك أنظمة مراقبة مستمرة بشكل يدوي. كما سيمكن مشروع الربط الإلكتروني الهيئة من تطوير قاعدة بيانات دقيقة ومتكاملة وفي الوقت الفعلي للانبعاثات الصناعية ويتضمن  بوابة إلكترونية مصممة لعرض هذه البيانات بشكل شامل ودقيق يساهم في تطوير ممارسات أفضل للمراقبة  تضمن توفير بيانات عالية الجودة من القطاع الصناعي في امارة ابوظبي. وتوفر المنصة مجموعة من الميزات الفنية المساعدة مثل نظم المعلومات الجغرافية (GIS) ونماذج تشتت الانبعاثات ونظام للتنبيهات عن تجاوز الانبعاثات الحدود الوطنية، بلاضافةالى ميزة إصدار التقارير الفنية وإدارة تدفق البيانات وغيرها. كما ستعنى المنصة بجودة البيانات المستلمة (الآلية و اليدوية) وتمكين  التواصل المستمر والمباشر مع المنشآت الصناعية حول كافة البيانات والمعلومات الفنية.",
  },
  {
    imageUrl: "./images/new-images/Monitoring_network.jpg",
    // content: "برنامج مراقبة جودة الهواء في امارة ابوظبي",
    content: "برنامج مراقبة جودة الهواء في امارة ابوظبي",
    // description:
    //  "بدأ برنامج مراقبة جودة الهواء في امارة أبوظبي في عام 2007 من خلال بناء شبكة مكونة من 20 محطة ثابتة ومحطتين متنقلتين لرصد تراكيز الملوثات الرئيسية مثل ثاني  أكسيد الكبريت (SO2) وثاني أكسيد النيتروجين (NO2) والأوزون الارضي (O3) وكبريتيد الهيدروجين (H2S) وأول أكسيد الكربون (CO) والمواد العالقة بنوعيها (PM10و PM2.5) والميثان (CH4) والمواد العطرية المتطايرة مثل BTEX وغيرها. كما ان جميع محطات المراقبة مزودة بأجهزة لقياس الارصاد الجوية وذلك لأهميتها في فهم الأنماط المختلفة لملوثات الهواء المحيط بالنظر الى الظروف الجوية المحيطة بها. حيث ترصد كل محطة سرعة الرياح واتجاه الرياح ودرجة الحرارة والرطوبة وإشعاع الشمس والضغط الجوي بشكل مستمر. ولتبسيط حالة جودة الهواء المحيط في الامارة للجمهور تقوم الهيئة بحساب مؤشر جودة الهواء (AQI) بشكل آلي واعطاء كل درجة للمؤشر  لون مختلف استنادًا إلى المعايير الوطنية ووفق مستوى تراكيز الملوثات الخمسة الرئيسية المرصودة  في الشبكة وهي المواد العالقة والأوزون الارضي وثاني أكسيد الكبريت وثاني أكسيد النيتروجين وأول أكسيد الكربون."
    description:
      "بدأ برنامج مراقبة جودة الهواء في امارة أبوظبي في عام 2007 من خلال بناء شبكة مكونة من 20 محطة ثابتة ومحطتين متنقلتين لرصد تراكيز الملوثات الرئيسية مثل ثاني  أكسيد الكبريت (SO2) وثاني أكسيد النيتروجين (NO2) والأوزون الارضي (O3) وكبريتيد الهيدروجين (H2S) وأول أكسيد الكربون (CO) والمواد العالقة بنوعيها (PM10و PM2.5) والميثان (CH4) والمواد العطرية المتطايرة مثل BTEX وغيرها. كما ان جميع محطات المراقبة مزودة بأجهزة لقياس الارصاد الجوية وذلك لأهميتها في فهم الأنماط المختلفة لملوثات الهواء المحيط بالنظر الى الظروف الجوية المحيطة بها. حيث ترصد كل محطة سرعة الرياح واتجاه الرياح ودرجة الحرارة والرطوبة وإشعاع الشمس والضغط الجوي بشكل مستمر. ولتبسيط حالة جودة الهواء المحيط في الامارة للجمهور تقوم الهيئة بحساب مؤشر جودة الهواء (AQI) بشكل آلي واعطاء كل درجة للمؤشر  لون مختلف استنادًا إلى المعايير الوطنية ووفق مستوى تراكيز الملوثات الخمسة الرئيسية المرصودة  في الشبكة وهي المواد العالقة والأوزون الارضي وثاني أكسيد الكبريت وثاني أكسيد النيتروجين وأول أكسيد الكربون.",
  },
  {
    imageUrl: "./images/new-images/quality-monitoring.jpg",
    // content: "نظام أبوظبي لنمذجة جودة الهواء",
    content: "نظام أبوظبي لنمذجة جودة الهواء",
    // description:
    //   "لتعزيز نظام مراقبة جودة الهواء، قامت هيئة البيئة – أبوظبي بتطوير نظام نمذجة جودة هواء متقدم متعدد المجالات لأبوظبي. سيسهم هذا النظام في دعم التنظيم من خلال تقييم التأثيرات التراكمية لجودة الهواء المتوقعة من المنشآت الجديدة ومشاريع التنمية الحضرية، والحد من تعرض الجمهور لتلوث الهواء، ودعم تحسين جودة الهواء في جميع أنحاء إمارة أبوظبي، بالإضافة إلى المساعدة في تقييم فعالية الخطط والسياسات المستقبلية. كما سيقدم الدعم الفني المتخصص والتدريب وبناء القدرات لتمكين تحديد النقاط الساخنة للتلوث حيث تحدث تركيزات ملوثة مرتفعة، وتطوير خرائط سنوية مفصلة لجودة الهواء على مستوى الاقليمي والمحلي."
    description:
      "  قامت هيئة البيئة – أبوظبي بتطوير نظام متقدم لتعزيز نظام مراقبة جودة الهواء في الإمارة. يهدف هذا النظام إلى دعم ومراقبة جودة الهواء من خلال تقييم التأثيرات البيئية التراكمية الناجمة عن المنشآت ,والمشاريع التطويرية الحالية والجديدة ، مما يسهم في تقليل تعرض السكان لتلوث الهواء وتحسين جودته في مختلف مناطق أبوظبي. كما يساعد النظام في تقييم فعالية الخطط والسياسات البيئية المستقبلية، من خلال توفير بيانات دقيقة تدعم صناع القرار في وضع استراتيجيات مستدامة. بالإضافة إلى ذلك، يوفر النظام دعمًا فنيًا متخصصًا، وبرامج تدريبية، وبناء القدرات لتعزيز الكفاءة في رصد وتحليل جودة الهواء. ومن خلال هذا النظام، سيتم تحديد المناطق ذات التلوث المرتفع وتطوير خرائط سنوية مفصلة لجودة الهواء على المستويين الإقليمي والمحلي، مما يساهم في توجيه الجهود نحو تحسين بيئة الهواء في أبوظبي بشكل أكثر كفاءة.",
  },
  {
    imageUrl: "./images/new-images/inventory-img.png",
    // content: "جرد انبعاثات الهواء في أبوظبي",
    content: "جرد إنبعاثات الهواء في أبوظبي",
    // description:
    //   "تركز هيئة البيئة - أبوظبي (EAD) على إنشاء تحديث لاحصاء انبعاثات الهواء داخل أبوظبي مع التركيز على بعض الملوثات: SO، NOx، CO، PM10، PM2.5، NMVOC، NH3، CO2، وBC. يسلط المشروع الضوء على المساهمين الرئيسيين في انبعاثات الهواء في أبوظبي. تشمل هذه القطاعات توليد الكهرباء، وإنتاج النفط والغاز، والأنشطة الصناعية، والنقل البري، مع الأخذ في الاعتبار كل من الانبعاثات الناتجة عن العوادم والانبعاثات غير الناتجة عن العوادم. بالإضافة إلى ذلك، قطاع الشحن والطيران، والسكك الحديدية، والزراعة والمزارع الحيوانية، والنفايات،، والبناء جزءًا لا يتجزأ من هذا المسعى الاستقصائي. تهدف هذه القاعدة البيانية الشاملة إلى التعرف النظامي على القطاعات الرئيسية التي تساهم بأكبر قدر من الانبعاثات الهوائية، مما يوفر وضوحًا حول مجالات التركيز. الهدف أساسي هو تعزيز الفهم العام والاهتمام بأهمية جودة الهواء، مما يشجع على المسؤولية المجتمعية والمشاركة. ستضع البيانات أساسًا لنمذجة جودة الهواء بدقة، مما يسهل كل من التدابير التنبؤية والوقائية. من خلال إنشاء خط أساس مفصل، سيصبح الجرد ضروريًا لاستراتيجيات البيئة المستقبلية، وصنع السياسات، والتخطيط. كما ستوفر إرشادات لوضع حدود انبعاثات واضحة  وتحديد أهداف للتقليل مستهدفة. علاوة على ذلك، سيمكن الجرد من رصد مستمر للأداء البيئي للقطاعات والكيانات الفردية، مما يعزز ثقافة المساءلة. بناءً على الرؤى المستخلصة، يمكن تصميم تدابير تخفيف فعالة مصممة خصيصًا للتحديات والقطاعات المحددة، مما يضمن نهجًا شاملًا للحفاظ على بيئة أبوظبي وتحسينها."
    description:
      "تركز هيئة البيئة – أبوظبي (EAD) على تحديث إحصائيات انبعاثات الهواء  في أبوظبي، من خلال التركيز على الملوثات الرئيسية مثل أول أكسيد الكبريت (SO)، أكاسيد النيتروجين (NOₓ)، أول أكسيد الكربون (CO)، الجسيمات الدقيقة أصغر من 10 ميكرونات و الجسيمات الدقيقة أصغر من 2.5 ميكرونات (PM10 وPM2.5)، المركبات العضوية المتطايرة غير الميثانية (NMVOC)، الأمونيا (NH₃)، ثاني أكسيد الكربون (CO₂)، والكربون الأسود (BC). يهدف هذا المشروع إلى تحديد المصادر الرئيسية لانبعاثات الهواء في أبوظبي، والتي تشمل هذه القطاعات توليد الكهرباء، وإنتاج النفط والغاز، والأنشطة الصناعية، والنقل البري، مع الأخذ في الاعتبار كل من الانبعاثات الناتجة عن العوادم والانبعاثات غير الناتجة عن العوادم. بالإضافة إلى ذلك، قطاع الشحن والطيران، والسكك الحديدية، والزراعة والمزارع الحيوانية، والنفايات، وقطاع البناء، مما يساهم في تقديم رؤية شاملة حول توزيع الانبعاثات وتأثيرها وكيفية التركيز عليها .يهدف المشروع بشكل أساسي إلى رفع مستوى الوعي حول أهمية جودة الهواء وتعزيز المسؤولية المجتمعية. كما ستوفر البيانات التي يتم جمعها أساسًا دقيقًا لنمذجة جودة الهواء واتخاذ تدابير استباقية للحد من التلوث. ومن خلال إنشاء قاعدة بيانات تفصيلية، ستُستخدم هذه الإحصائيات لدعم استراتيجيات البيئة المستقبلية، ووضع السياسات، والتخطيط المستدام.بالإضافة إلى ذلك، سيساعد المشروع في تحديد ووضع حدود للانبعاثات ووضع أهداف للحد منها، مما سيمكن الجهات المعنية من متابعة الأداء البيئي للقطاعات المختلفة وتعزيز الثقافة والشفافية. وبناءً على البيانات والتحليلات المستخلصة، سيتم تطوير استراتيجيات فعالة لتقليل الانبعاثات بما يتناسب مع احتياجات كل قطاع، لضمان بيئة أنظف وأكثر استدامة في أبوظبي.",
  },
  {
    imageUrl: "./images/new-images/GHG1.jpg",
    // content: "جرد غازات الدفيئة وتوقعاتها",
    content: "جرد انبعاثات الغازات الدفيئة وتوقعاتها",
    //     description: `تماشيًا مع أولوياتها الاستراتيجية لضمان مرونة أبوظبي من خلال التخفيف والتكيف مع تغير المناخ، وحماية الهواء والمياه البحرية، كانت هيئة البيئة - أبوظبي (EAD) نشطة في بدء جرد انبعاثات غازات الدفيئة كل عامين كجزء من خطتها الشاملة لرصد الانبعاثات الجوية في الإمارة. كانت هذه الاحصاءات فعالة في وضع أساس للمعرفة بشأن الانبعاثات الأساسية والتوقعات في الإمارة، وكذلك في تعزيز قدرة الكيانات المحلية على التتبع والإبلاغ بكفاءة عن انبعاثاتها في القطاعات.
    // يشير جرد غازات الدفيئة في أبوظبي إلى تقدير انبعاثات غازات الدفيئة وإزالتها حسب الغاز وحسب المصدر أو المصب. يستهدف الجرد جميع المصادر والمصبات البشرية المنشأ؛ وهي الطاقة، العمليات الصناعية، تغيير استخدام الأراضي والغابات، الزراعة، والنفايات. وفقًا لإرشادات الهيئة الحكومية الدولية المعنية بتغير المناخ للجرد الوطني للغازات الدفيئة، يركز مشروع الجرد على غازات الرئيسية التي تساهم بشكل مباشر في الاحتباس الحراري مثل (CO2، CH4، N2O، HFCs، PFCs، SF6).
    // كما يقيم مشروع غازات الدفيئة إمكانية تخفيض الانبعاثات المستقبلية من خلال الخطط الحالية للتنمية المستدامة واستراتيجيات التخفيف في الإمارة.`,
    description: `تماشيًا مع الأولوية الاستراتيجية لضمان مرونة أبوظبي في مواجهة تغير المناخ، وضمان حماية الهواء والمياه البحرية، تواصل هيئة البيئة - أبوظبي (EAD) جهودها  في تقليل الانبعاثات وتعزيز القدرة على  تتبعها والتحكم بها. وكانت واحدة من هذه المبادرات الأساسية في هذا المجال هي البدء في مشروع "جرد الغازات الدفيئة" كل عامين .وتعتبر هذه المبادرة جزء من خطة الهيئة الشاملة لرصد الانبعاثات في الإمارة، والتي تهدف إلى تعزيز فهمنا للانبعاثات وأثرها على البيئة. من خلال هذا الجرد، يتم تحديد انبعاثات الغازات الدفيئة وفقًا لكل نوع من الغازات والمصادر أو المصبات المختلفة. يشمل الجرد جميع الأنشطة البشرية مثل الطاقة، والصناعات، وتغيير استخدام الأراضي، والزراعة، والنفايات. كانت هذه الاحصائيات فعالة لمعرفة  الانبعاثات الأساسية والتوقعات في الإمارة، وكذلك في تعزيز قدرة الكيانات المحلية على التتبع والإبلاغ  عن الإنبعاثات في القطاعات. 
يركز جرد غازات الدفيئة على الغازات التي تساهم بشكل رئيسي في الاحتباس الحراري مثل ثاني أكسيد الكربون (CO2)، والميثان (CH4)، وأكسيد النيتروز (N2O)، بالإضافة إلى الغازات الصناعية مثل الهيدروفلوروكربونات (HFCs)، والبيروفلوروكربونات (PFCs)، وغاز سادس فلوريد الكبريت (SF6). كما يساهم هذا الجرد في تخطيط استراتيجيات مستقبلية للتخفيف من الانبعاثات، من خلال مراعاة خطط التنمية المستدامة والتوجهات البيئية في الإمارة.`,
  },
  {
    imageUrl: "./images/new-images/Odor.jpg",
    // content: "شبكة مراقبة الروائح في إمارة أبوظبي ",
    content: "شبكة مراقبة الروائح في إمارة أبوظبي",
    // description: "شبكة مراقبة الغازات المزعجة في إمارة أبوظبي هو مشروع مدته خمس سنوات يضم مجموعة متنوعة من الأنشطة عبر جميع أنواع الصناعات التي قد تؤثر سلبًا على البيئة والمجتمع، وستكون هذه الشبكة أداة قيمة للكشف المبكر والاستجابة للغازات ذات الروائح المزعجة، والتي تسبب إزعاجًا عامًا، وذلك من خلال تشغيل 50 جهاز استشعار ثابت ومحطتين متنقلين لإنشاء إطار عمل لمراقبة وإدارة الروائح. حاليًا، تستجيب هيئة البيئة - أبوظبي  لشكاوى الروائح من خلال تركيب جهاز مراقبة الروائح المحمول للتحقق من تركيزات الغازات ذات الروائح المزعجة في الوقت الفعلي، بالإضافة إلى الإعتماد على محطات مراقبة جودة الهواء المتنقلة لقياس تركيزات ملوثات الهواء في الوقت الفعلي، وسرعة واتجاه الرياح. توفر كلا التقنيتين رؤى قيمة حول خصائص الغازات ذات الروائح، وتركيزها في الهواء المحيط، ومصادرها، وتشتتها."
    description:
      "شبكة مراقبة الروائح المزعجة في إمارة أبوظبي هو مشروع مدته خمس سنوات، يهدف إلى مراقبة الأنشطة من جميع أنواع الصناعات التي قد تؤثر بشكل سلبي على البيئة والمجتمع. يركز المشروع على الكشف المبكر والإستجابة للغازات ذات الروائح المزعجة والتي تسبب ازعاجاً عاماً . وذلك عن طريق تشغيل 50 جهاز استشعار ثابت ومحطتين متنقلتين للمساعدة في رصد هذه الروائح، والقدرة على التعامل معها. حاليًا، تستجيب هيئة البيئة - أبوظبي  لشكاوى الروائح من خلال تركيب أجهزة مراقبة محمولة لقياس تركيز الغازات المزعجة بشكل مباشر. كما تعتمد الهيئة على محطات مراقبة جودة الهواء المتنقلة التي تقيس تركيزات الملوثات في الهواء وتحدد سرعة واتجاه الرياح. هذه التقنيات تقدم قيم واضحة حول تركيز الغازات ذات الروائح المزعجة في الهواء، مصادرها، وكيفية انتشارها، مما يساعد على اتخاذ إجراءات سريعة وفعالة للحفاظ على بيئة أبوظبي.",
  },
  {
    imageUrl: "./images/new-images/Freepik1.png",
    content: "رسم خريطة الضوضاء المحيطة في أبوظبي",
    // content:"الاستشعار عن بعد لقياس الانبعاثات الحقيقية للمركبات",
    // description: "يهدف مشروع الضوضاء إلى تحديد مصادر الضوضاء الكبيرة من خلال تحديد المناطق السكنية المتأثرة، وتقييم تأثيرها، وترجمة النتائج إلى خريطة بصرية. يتضمن المشروع جمع البيانات من الجهات الحكومية، واستخدام بيانات هيئة البيئة - أبوظبي، وإجراء مراقبة إضافية للضوضاء، واقتراح تدابير للتخفيف. الهدف من هذا المشروع هو رسم خريطة للمناطق اللأكثر  تأثرًا بمصادر الضوضاء في أبوظبي."
    description:
      "يهدف مشروع الضوضاء إلى تحديد أماكن الضوضاء الرئيسية في أبوظبي ومعرفة تأثيرها على المناطق السكنية يتم عرضها من خلال خرائط . يتضمن المشروع جمع البيانات من الجهات الحكومية، واستخدام بيانات هيئة البيئة - أبوظبي، وإجراء مراقبة إضافية للضوضاء، واقتراح طرق للتخفيف منها. الهدف من هذا المشروع هو رسم خريطة للمناطق الأكثر  تأثرًا بمصادر الضوضاء في أبوظبي.",
  },
  {
    imageUrl: "./images/new-images/Remote_sensing.jpg",
    // content: "الاستشعار عن بعد لقياس الانبعاثات الحقيقية للمركبات",
    content: "الاستشعار عن بعد لقياس الانبعاثات الحقيقية للمركبات",
    //     description: `سيؤدي الاستشعار عن بعد لقياس الانبعاثات الحقيقية للمركبات إلى تحسين فهم جودة الهواء في إمارة أبوظبي والإمارات العربية المتحدة. يعد تطوير حملة قياس انبعاثات النقل البري عن طريق  الاستشعار عن بعد مكونا أساسيا لبرنامج إدارة جودة الهواء في أبوظبي.
    // وستوفر مخرجات المشروع معلومات أساسية لتصميم تدابير فعالة للحد من الانبعاثات الناتجة عن النقل البري مع معلومات علمية قيمة ستدعم الأمانة العامة للمجلس التنفيذي، وهيئة البيئة - أبوظبي، ووزارة التغير المناخي والبيئة، وشرطة أبوظبي، وهيئة الصحة - أبوظبي، ودائرة النقل، وغيرهم من الجهات من القطاعين العام والخاص.`,
    description: `يساهم استخدام الاستشعار عن بعد لقياس الانبعاثات الحقيقية للمركبات  إلى زيادة المعرفة حول جودة الهواء في إمارة أبوظبي والإمارات العربية المتحدة. ويعد تطوير حملة قياس انبعاثات النقل البري عن طريق  الاستشعار عن بعد جزء مهم لبرنامج إدارة جودة الهواء في أبوظبي.
وسيوفر هذا المشروع معلومات أساسية تساعد في وضع حلول فعّالة للحد من انبعاثات المركبات الناتجة عن النقل البري مع معلومات علمية قيمة ستدعم كلا من الأمانة العامة للمجلس التنفيذي، وهيئة البيئة - أبوظبي، ووزارة التغير المناخي والبيئة، وشرطة أبوظبي، وهيئة الصحة - أبوظبي، ودائرة النقل، وغيرهم من الجهات من القطاعين العام والخاص.`,
  },
  {
    imageUrl: "./images/new-images/EAD_Research.jpg",
    // content: "سفينة الأبحاث البحرية",
    content: "سفينة الأبحاث البحرية",
    // description:
    //   "كانت الهيئة الأولى في العالم إجراء أبحاثًا جوية تمتد من إسبانيا إلى أبوظبي، حيث غطت 25 دولة وثمانية بحار ومحيطات في رحلة تجاوزت 10,000 كم. وقامت البعثة الرائدة للبحث الجوي في الخليج العربي بإجراء فحص شامل لنقل وتحويل الهيدروكربونات وأكاسيد النيتروجين. كما سعت الحملة إلى تقييم كيفية تنقل التلوث من الخليج العربي إلى مناطق أخرى، وتقدير مساهمته في تكون الأوزون في دولة الإمارات العربية المتحدة.",
    description:
      "كانت الهيئة الأولى في العالم التي أجرت أبحاثًا جوية تمتد من إسبانيا إلى أبوظبي، حيث شملت 25 دولة وثمانية بحار ومحيطات، وغطت مسافة تزيد عن 10,000 كم. قامت البعثة بإجراء دراسة شاملة حول كيفية انتقال الهيدروكربونات وأكاسيد النيتروجين في الهواء. كما هدفت الحملة إلى فهم كيف ينتقل التلوث من الخليج العربي إلى مناطق أخرى، ودراسة تأثيره على تكوّن الأوزون في دولة الإمارات.",
  },
  {
    imageUrl: "./images/new-images/EAD_Smog-Free Tower_web.jpg",
    // content: "برج تنقية الهواء",
    content: "برج تنقية الهواء ",
    // description: `افتتحت هيئة البيئة - أبوظبي بالتعاون مع مجموعة مدن أول برج خالٍ من الضباب الدخاني في المنطقة في سيرف أبوظبي، وهي أحدث منشأة لركوب الأمواج الاصطناعية في العالم، وتتشكل على جزيرة الحديريات. يعد البرج الجديد لتنقية الهواء ابتكارًا حضاريًا مصممًا لتحسين جودة الهواء في المنطقة ويوفير تجربة ملهمة لمستقبل نظيف وخالٍ من التلوث. يستخدم البرج المصنوع من الألمنيوم والذي يبلغ ارتفاعه سبعة أمتار تقنية التأين الإيجابي الصديقة للبيئة لتنقية الهواء المحيط، حيث يقوم بتنظيف 30,000 متر مكعب من الهواء في الساعة. تنتج تقنية التأين هواءً خاليًا من الضباب الدخاني في الأماكن العامة، مما يسمح للناس بتنفس هواء نقي، باستخدام 1,170 واط فقط من الكهرباء، وهو ما يعادل استهلاك غلاية الماء.`,
    description: `
افتتحت هيئة البيئة - أبوظبي بالتعاون مع مجموعة مدن أول برج لتنقية الهواء في المنطقة في سيرف أبوظبي، اللذي يقع في جزيرة الحديريات. يعتبر البرج الجديد لتنقية الهواء ابتكارًا حضاريًا يهدف إلى تحسين جودة الهواء في المنطقة وتوفير تجربة ملهمة لمستقبل نظيف وخالٍ من التلوث. مصنوع البرج  من الألمنيوم، ويبلغ ارتفاعه سبعة أمتار، يعتمد على تقنية التأين الإيجابي الصديقة للبيئة لتنقية الهواء المحيط، حيث يقوم بتنظيف 30,000 متر مكعب من الهواء في الساعة. تساهم هذه التقنية في إنتاج هواء خالٍ من الضباب الدخاني في الأماكن العامة، مما يسمح للناس تنفس هواءً نقيًا، باستخدام 1,170 واط فقط من الكهرباء، وهو ما يعادل استهلاك غلاية ماء.`,
  },
];

var items1 = document.querySelectorAll(".slide-carol .carol-item");

// if (window.innerWidth < 765) {
//     var itemsPerPage = 1;
//     $.each(imageData, function (index, item) {
//         if (index % itemsPerPage === 0) {
//             var carouselItem = $('<div>').addClass('carousel-item carol-item');
//             if (index === 0) {
//                 carouselItem.addClass('active');
//             }

//             // Loop through each item per slide
//             for (let i = 0; i < itemsPerPage; i++) {
//                 var dataIndex = index + i;
//                 if (dataIndex >= imageData.length) {
//                     // If dataIndex exceeds imageData length, wrap around to the beginning
//                     dataIndex = dataIndex % imageData.length;
//                 }

//                 var content = $('<div>').addClass('col-md-3');
//                 var mainContent = $('<div>').addClass('position-relative main-content openSidebar');
//                 var imageDiv = $('<div>');
//                 var imageId = 'image_' + dataIndex;
//                 var imageUrl = imageData[dataIndex].imageUrl;

//                 // Sanitize the image URL
//                 //if (!isValidUrl(imageUrl)) {
//                 //    console.error('Invalid image URL:', imageUrl);
//                 //    continue; // Skip this item if the URL is not valid
//                 //}

//                 var image = $('<img>').addClass('item').attr('src', imageUrl).attr('id', imageId);
//                 var projectContent = $('<div>').addClass('project-slide-content').text(imageData[dataIndex].content);
//                 var projectItemDescription = $('<div>').addClass('project-slide-description').text(imageData[dataIndex].description);

//                 // Assemble elements
//                 imageDiv.append(image);
//                 mainContent.append(imageDiv, projectContent, projectItemDescription);
//                 content.append(mainContent);
//                 carouselItem.append(content);
//             }

//             $('#recipeCarousel .carousel-inner').append(carouselItem);
//         }
//     });
// } else {

//     var itemsPerPage = 5; // Number of items per slide
//     // Check window width and adjust itemsPerPage if necessary
//     if (window.innerWidth < 1099) {
//         itemsPerPage = 2;
//     }
//     $.each(imageData, function (index, item) {
//         if (index % itemsPerPage === 0) {
//             var carouselItem = $('<div>').addClass('carousel-item carol-item');
//             if (index === 0) {
//                 carouselItem.addClass('active');
//             }

//             // Loop through each item per slide
//             for (let i = 0; i < itemsPerPage; i++) {
//                 var dataIndex = index + i;
//                 if (dataIndex >= imageData.length) {
//                     // If dataIndex exceeds imageData length, wrap around to the beginning
//                     dataIndex = dataIndex % imageData.length;
//                 }

//                 var content = $('<div>').addClass('col-md-3');
//                 var mainContent = $('<div>').addClass('position-relative main-content openSidebar');
//                 var imageDiv = $('<div>');
//                 var imageId = 'image_' + dataIndex;
//                 var imageUrl = imageData[dataIndex].imageUrl;

//                 // Sanitize the image URL
//                 //if (!isValidUrl(imageUrl)) {
//                 //    console.error('Invalid image URL:', imageUrl);
//                 //    continue; // Skip this item if the URL is not valid
//                 //}

//                 var image = $('<img>').addClass('item').attr('src', imageUrl).attr('id', imageId);
//                 var projectContent = $('<div>').addClass('project-slide-content').text(imageData[dataIndex].content);
//                 var projectItemDescription = $('<div>').addClass('project-slide-description').text(imageData[dataIndex].description);

//                 // Assemble elements
//                 imageDiv.append(image);
//                 mainContent.append(imageDiv, projectContent, projectItemDescription);
//                 content.append(mainContent);
//                 carouselItem.append(content);
//             }

//             $('#recipeCarousel .carousel-inner').append(carouselItem);
//         }
//     });

// }

function loadCarousel(data) {
  var itemsPerPage =
    window.innerWidth < 765 ? 1 : window.innerWidth < 1099 ? 2 : 5;
  $("#recipeCarousel .carousel-inner").empty();
  $.each(data, function (index, item) {
    if (index % itemsPerPage === 0) {
      var carouselItem = $("<div>").addClass("carousel-item carol-item");
      if (index === 0) {
        carouselItem.addClass("active");
      }

      for (let i = 0; i < itemsPerPage; i++) {
        var dataIndex = index + i;
        if (dataIndex >= data.length) {
          dataIndex = dataIndex % data.length; // Wrap around if needed
        }

        var content = $("<div>").addClass("col-md-3");
        var mainContent = $("<div>")
          .addClass("position-relative main-content openSidebar")
          .attr("data-index", dataIndex);
        var imageDiv = $("<div>");
        var imageUrl = data[dataIndex].imageUrl;

        var image = $("<img>")
          .addClass("item")
          .attr("src", imageUrl)
          .attr("alt", "Image");
        var projectContent = $("<div>")
          .addClass("project-slide-content")
          .text(data[dataIndex].content);
        var projectItemDescription = $("<div>")
          .addClass("project-slide-description")
          .text(data[dataIndex].description);

        // Append elements
        imageDiv.append(image);
        mainContent.append(imageDiv, projectContent, projectItemDescription);
        content.append(mainContent);
        carouselItem.append(content);
      }

      $("#recipeCarousel .carousel-inner").append(carouselItem);
    }
  });

  // Re-bind click events after carousel reload
  $(".openSidebar")
    .off("click")
    .on("click", function () {
      var dataIndex = $(this).attr("data-index");
      showDescription(data[dataIndex]); // Show description in modal/sidebar
    });
}

function showDescription(item) {
  $(".sidebar img").attr("src", item.imageUrl);
  $(".projectItemContent").text(item.content);
  $(".projectItemDescription").text(item.description);

  if (window.innerWidth < 1030) {
    $(".sidebar").css("width", "97%");
  } else {
    $(".sidebar").css("width", "40%");
  }

  $(".modal-background").addClass("project-modal");
  $("body").addClass("project-modal-header");

  // Close Sidebar
  $(".close-btn")
    .off("click")
    .on("click", function () {
      // $(".sidebar").css("width", "0");
      // $('.modal-background').removeClass('project-modal');
      // $('body').removeClass('project-modal-header');
      closeSidebar();
    });
}

function closeSidebar() {
  // Reset the sidebar width to 0
  $(".sidebar").css("width", "0");

  // Remove modal-related classes
  $(".modal-background").removeClass("project-modal");
  $("body").removeClass("project-modal-header");

  // Clear the sidebar content to prevent showing old data
  $(".sidebar img").attr("src", "");
  $(".projectItemContent").text("");
  $(".projectItemDescription").text("");
}

$(".close-btn").on("click", function () {
  $(".modal-background").removeClass("open");
});

function isValidUrl(url) {
  try {
    const parsedUrl = new URL(url);
    return ["http:", "https:"].includes(parsedUrl.protocol);
  } catch (e) {
    return false;
  }
}

$(".main-content").on("click", function () {
  var imageSrc = $(this).find(".item").attr("src");
  var projectContent = $(this).find(".project-slide-content").text();
  var projectItemDescription = $(this)
    .find(".project-slide-description")
    .text();
  $(".modal-background .img-fluid").attr("src", imageSrc);
  $(".modal-background .projectItemContent").text(projectContent);
  $(".modal-background .projectItemDescription").text(projectItemDescription);
});

let prevButton1 = document.getElementById("prev");

// Check if first slide is active on page load
if (isFirstSlideActive()) {
  // Add opacity to previous button
  prevButton1.style.opacity = "0.5";
  prevButton1.style.pointerEvents = "none";
  prevButton1.disabled = true;
} else {
  // Remove opacity from previous button
  prevButton1.style.opacity = "1";
  prevButton1.style.pointerEvents = "auto";
  prevButton1.disabled = false;
}

document
  .getElementById("recipeCarousel")
  .addEventListener("slid.bs.carousel", function () {
    let prevButton = document.getElementById("prev");
    let nextButton = document.getElementById("next");
    // Check if last slide is active
    if (isLastSlideActive()) {
      // Add opacity to next button
      nextButton.style.opacity = "0.5";
      nextButton.style.pointerEvents = "none";
      nextButton.disabled = true;
    } else {
      // Remove opacity from next button
      nextButton.style.opacity = "1";
      nextButton.style.pointerEvents = "auto";
      nextButton.disabled = false;
    }

    // Check if first slide is active
    if (isFirstSlideActive()) {
      // Add opacity to previous button
      prevButton.style.opacity = "0.5";
      prevButton.style.pointerEvents = "none";
      prevButton.disabled = true;
    } else {
      // Remove opacity from previous button
      prevButton.style.opacity = "1";
      prevButton.style.pointerEvents = "auto";
      prevButton.disabled = false;
    }
  });

function isLastSlideActive() {
  var items1 = document.querySelectorAll(".slide-carol .carol-item");
  let activeSlide = document.querySelector(".carol-item.active");
  let lastSlide = items1[items1.length - 1];
  return activeSlide === lastSlide;
}

// Function to check if first slide is active
function isFirstSlideActive() {
  var items1 = document.querySelectorAll(".slide-carol .carol-item");
  let activeSlide = document.querySelector(".carol-item.active");
  let firstSlide = items1[0];
  return activeSlide === firstSlide;
}
// $('#myForm').submit(function (e) {
//     e.preventDefault();
//     var name = $('#inputField').val();
//     var email = $('#emailField').val();
//     var phone = $('#phoneField').val();

//     // Regular expressions for validation
//     var nameRegex = /^[a-zA-Z\s]*$/;
//     var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     var phoneRegex = /^((971[0-9]{9})|(0[0-9]{9}))$/;

//     // Function to trim spaces without using the trim() method
//     function trimSpaces(str) {
//         return str.replace(/^\s+|\s+$/g, '');
//     }

//     var isValidForm = true;
//     // Name validation
//     if (trimSpaces(name) === '') {
//         $('#nameError').text('Name is required');
//         isValidForm = false;
//     } else if (!nameRegex.test(name)) {
//         $('#nameError').text('Please enter a valid name');
//         isValidForm = false;
//     } else {
//         $('#nameError').text('');
//     }

//     // Email validation
//     if (trimSpaces(email) === '') {
//         $('#emailError').text('Email is required');
//         isValidForm = false;
//     } else if (!emailRegex.test(email)) {
//         $('#emailError').text('Please enter a valid email address');
//         isValidForm = false;
//     } else {
//         $('#emailError').text('');
//     }

//     // Phone validation
//     if (trimSpaces(phone) === '') {
//         $('#phoneError').text('Phone is required');
//         isValidForm = false;
//     } else if (!phoneRegex.test(phone)) {
//         $('#phoneError').text('Please enter a valid 10-digit phone number');
//         isValidForm = false;
//     } else {
//         $('#phoneError').text('');
//     }

//     if (isValidForm) {
//         var inputData = {};
//         $(this).find('input, textarea').each(function (index, item) {
//             inputData[item.name] = item.value;
//         });

//         $.ajax({
//             url: baseUrl + 'Submit',
//             method: 'POST',
//             dataType: 'json',
//             contentType: "application/json; charset=utf-8",
//             data: JSON.stringify(inputData),
//             success: function (result) {
//                 if (result.mailSent) {
//                     $(this).find('input, textarea').val('');
//                     $('#submitStatus').html('Submitted Successfully.').removeClass('error-message').addClass('success-message');
//                     document.querySelector(".contact-form").style.display = "none";
//                     document.querySelector(".thankyou-form").style.display = "block";
//                 } else {
//                     $('#submitStatus').html('Please try after sometime.').removeClass('success-message').addClass('error-message');
//                 }
//             },
//             error: function () {
//                 $('#submitStatus').html('Please try after sometime.').removeClass('success-message').addClass('error-message');
//             }
//         });
//     }
// });

// // Add event listeners to input fields for real-time validation
// $('#inputField').on('input', function () {
//     var name = $(this).val();
//     var nameRegex = /^[a-zA-Z\s'-]+$/;
//     var trimmedName = name.replace(/^\s+|\s+$/g, ''); // Remove leading and trailing spaces using regex
//     if (trimmedName !== name) {
//         $('#nameError').text('No leading or trailing spaces are allowed');
//     } else if (!nameRegex.test(name)) {
//         $('#nameError').text('Please enter a valid name');
//     } else {
//         $('#nameError').text('');
//     }
// });

// $('#emailField').on('input', function () {
//     var email = $(this).val();
//     var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     var specialCharRegex = /^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/;
//     var parts = email.split('@');
//     if (!emailRegex.test(email)) {
//         $('#emailError').text('Please enter a valid email address');
//     } else if (specialCharRegex.test(email)) {
//         $('#emailError').text('Email cannot start or end with a special character');
//     } else if (/([^a-zA-Z0-9])\1{1,}/.test(email)) {
//         $('#emailError').text('Email cannot contain consecutive repeating special characters');
//     } else if (email.indexOf('@gmail.com@gmail.com') !== -1) {
//         $('#emailError').text('Invalid email address');
//     } else if (parts.length === 2 && parts[0] === parts[1]) {
//         $('#emailError').text('Please enter a valid email address');
//     } else if (parts[0].includes(parts[1])) {
//         $('#emailError').text('Invalid email address');
//     } else {
//         $('#emailError').text('');
//     }
// });
// $('#phoneField').on('input', function () {
//     var phone = $(this).val();
//     // Remove any non-digit characters from the phone number
//     var cleanedPhone = phone.replace(/\D/g, '');
//     var phoneRegex = /^((971[0-9]{9})|(0[0-9]{9}))$/;
//     var undesiredFormatRegex = /^(1234567890|0{10,12}|9710{9}|0123456789)$/;

//     if (!phoneRegex.test(cleanedPhone) || undesiredFormatRegex.test(cleanedPhone)) {
//         $('#phoneError').text('Please enter a valid phone number. For UAE, use 971 followed by 9 digits or 0 followed by 9 digits.');
//     } else {
//         $('#phoneError').text('');
//     }
// });

// $('#myForm').submit(function (e) {
//     e.preventDefault();
//     var name = $('#inputField').val();
//     var email = $('#emailField').val();
//     var phone = $('#phoneField').val();

//     // Regular expressions for validation
//     var nameRegex = /^[a-zA-Z\s]*$/;
//     var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     var phoneRegex = /^((971[0-9]{9})|(0[0-9]{9}))$/;

//     // Function to trim spaces without using the trim() method
//     function trimSpaces(str) {
//         return str.replace(/^\s+|\s+$/g, '');
//     }

//     var isValidForm = true;

//     // Name validation
//     if (trimSpaces(name) === '') {
//         $('#nameError').text('الاسم مطلوب');
//         isValidForm = false;
//     } else if (!nameRegex.test(name)) {
//         $('#nameError').text('يرجى إدخال اسم صالح');
//         isValidForm = false;
//     } else {
//         $('#nameError').text('');
//     }

//     // Email validation
//     if (trimSpaces(email) === '') {
//         $('#emailError').text('البريد الإلكتروني مطلوب');
//         isValidForm = false;
//     } else if (!emailRegex.test(email)) {
//         $('#emailError').text('يرجى إدخال بريد إلكتروني صالح');
//         isValidForm = false;
//     } else {
//         $('#emailError').text('');
//     }

//     // Phone validation
//     if (trimSpaces(phone) === '') {
//         $('#phoneError').text('الهاتف مطلوب');
//         isValidForm = false;
//     } else if (!phoneRegex.test(phone)) {
//         $('#phoneError').text('يرجى إدخال رقم هاتف صالح مكون من 10 أرقام');
//         isValidForm = false;
//     } else {
//         $('#phoneError').text('');
//     }

//     if (isValidForm) {
//         var inputData = {};
//         $(this).find('input, textarea').each(function (index, item) {
//             inputData[item.name] = item.value;
//         });

//         $.ajax({
//             url: baseUrl + 'Submit',
//             method: 'POST',
//             dataType: 'json',
//             contentType: "application/json; charset=utf-8",
//             data: JSON.stringify(inputData),
//             success: function (result) {
//                 if (result.mailSent) {
//                     $(this).find('input, textarea').val('');
//                     $('#submitStatus').html('تم الإرسال بنجاح').removeClass('error-message').addClass('success-message');
//                     document.querySelector(".contact-form").style.display = "none";
//                     document.querySelector(".thankyou-form").style.display = "block";
//                 } else {
//                     $('#submitStatus').html('يرجى المحاولة مرة أخرى').removeClass('success-message').addClass('error-message');
//                 }
//             },
//             error: function () {
//                 $('#submitStatus').html('يرجى المحاولة مرة أخرى').removeClass('success-message').addClass('error-message');
//             }
//         });
//     }
// });

// // Real-time validation in Arabic
// $('#inputField').on('input', function () {
//     var name = $(this).val();
//     var nameRegex = /^[a-zA-Z\s'-]+$/;
//     var trimmedName = name.replace(/^\s+|\s+$/g, '');
//     if (trimmedName !== name) {
//         $('#nameError').text('لا يُسمح بوجود مسافات في البداية أو النهاية');
//     } else if (!nameRegex.test(name)) {
//         $('#nameError').text('يرجى إدخال اسم صالح');
//     } else {
//         $('#nameError').text('');
//     }
// });

// $('#emailField').on('input', function () {
//     var email = $(this).val();
//     var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     var specialCharRegex = /^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/;
//     var parts = email.split('@');
//     if (!emailRegex.test(email)) {
//         $('#emailError').text('يرجى إدخال بريد إلكتروني صالح');
//     } else if (specialCharRegex.test(email)) {
//         $('#emailError').text('لا يمكن أن يبدأ البريد الإلكتروني أو ينتهي بحرف خاص');
//     } else if (/([^a-zA-Z0-9])\1{1,}/.test(email)) {
//         $('#emailError').text('لا يمكن أن يحتوي البريد الإلكتروني على حروف خاصة متتالية');
//     } else if (email.indexOf('@gmail.com@gmail.com') !== -1) {
//         $('#emailError').text('عنوان بريد إلكتروني غير صالح');
//     } else if (parts.length === 2 && parts[0] === parts[1]) {
//         $('#emailError').text('يرجى إدخال بريد إلكتروني صالح');
//     } else if (parts[0].includes(parts[1])) {
//         $('#emailError').text('عنوان بريد إلكتروني غير صالح');
//     } else {
//         $('#emailError').text('');
//     }
// });

// $('#phoneField').on('input', function () {
//     var phone = $(this).val();
//     var cleanedPhone = phone.replace(/\D/g, '');
//     var phoneRegex = /^((971[0-9]{9})|(0[0-9]{9}))$/;
//     var undesiredFormatRegex = /^(1234567890|0{10,12}|9710{9}|0123456789)$/;

//     if (!phoneRegex.test(cleanedPhone) || undesiredFormatRegex.test(cleanedPhone)) {
//         $('#phoneError').text('يرجى إدخال رقم هاتف صالح. لاستخدام الإمارات، استخدم 971 متبوعًا بـ 9 أرقام أو 0 متبوعًا بـ 9 أرقام.');
//     } else {
//         $('#phoneError').text('');
//     }
// });

//  var currentLanguage = "english";

// function toggleLanguage() {
//   if (currentLanguage === "english") {
//     currentLanguage = "arabic";
//     document.body.setAttribute("dir", "rtl");
//   } else {
//     currentLanguage = "english";
//     document.body.setAttribute("dir", "ltr");
//   }
// }

$("#myForm").submit(function (e) {
  e.preventDefault();
  var name = $("#inputField").val();
  var email = $("#emailField").val();
  var phone = $("#phoneField").val();

  // Regular expressions for validation
  var nameRegex = /^[a-zA-Z\s'-]+$/;
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  var phoneRegex = /^((971[0-9]{9})|(0[0-9]{9}))$/;

  function trimSpaces(str) {
    return str.replace(/^\s+|\s+$/g, "");
  }

  var isValidForm = true;

  // Define error messages in both languages
  var messages = {
    nameRequired:
      currentLanguage === "english" ? "Name is required" : "الاسم مطلوب",
    invalidName:
      currentLanguage === "english"
        ? "Please enter a valid name"
        : "يرجى إدخال اسم صالح",
    emailRequired:
      currentLanguage === "english"
        ? "Email is required"
        : "البريد الإلكتروني مطلوب",
    invalidEmail:
      currentLanguage === "english"
        ? "Please enter a valid email address"
        : "يرجى إدخال بريد إلكتروني صالح",
    phoneRequired:
      currentLanguage === "english" ? "Phone is required" : "الهاتف مطلوب",
    invalidPhone:
      currentLanguage === "english"
        ? "Please enter a valid phone number"
        : "يرجى إدخال رقم هاتف صالح",
  };

  // Name validation
  if (trimSpaces(name) === "") {
    $("#nameError").text(messages.nameRequired);
    isValidForm = false;
  } else if (!nameRegex.test(name)) {
    $("#nameError").text(messages.invalidName);
    isValidForm = false;
  } else {
    $("#nameError").text("");
  }

  // Email validation
  if (trimSpaces(email) === "") {
    $("#emailError").text(messages.emailRequired);
    isValidForm = false;
  } else if (!emailRegex.test(email)) {
    $("#emailError").text(messages.invalidEmail);
    isValidForm = false;
  } else {
    $("#emailError").text("");
  }

  // Phone validation
  if (trimSpaces(phone) === "") {
    $("#phoneError").text(messages.phoneRequired);
    isValidForm = false;
  } else if (!phoneRegex.test(phone)) {
    $("#phoneError").text(messages.invalidPhone);
    isValidForm = false;
  } else {
    $("#phoneError").text("");
  }

  if (isValidForm) {
    var inputData = {};
    $(this)
      .find("input, textarea")
      .each(function (index, item) {
        inputData[item.name] = item.value;
      });

    $.ajax({
      url: baseUrl + "Submit",
      method: "POST",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(inputData),
      success: function (result) {
        if (result.mailSent) {
          $(this).find("input, textarea").val("");
          $("#submitStatus")
            .html(
              currentLanguage === "english"
                ? "Submitted Successfully."
                : "تم الإرسال بنجاح"
            )
            .removeClass("error-message")
            .addClass("success-message");
          document.querySelector(".contact-form").style.display = "none";
          document.querySelector(".thankyou-form").style.display = "block";
        } else {
          $("#submitStatus")
            .html(
              currentLanguage === "english"
                ? "Please try after sometime."
                : "يرجى المحاولة مرة أخرى"
            )
            .removeClass("success-message")
            .addClass("error-message");
        }
      },
      error: function () {
        $("#submitStatus")
          .html(
            currentLanguage === "english"
              ? "Please try after sometime."
              : "يرجى المحاولة مرة أخرى"
          )
          .removeClass("success-message")
          .addClass("error-message");
      },
    });
  }
});

// Real-time validation for name field
$("#inputField").on("input", function () {
  var name = $(this).val();
  var nameRegex = /^[a-zA-Z\s'-]+$/;
  var trimmedName = name.replace(/^\s+|\s+$/g, "");

  if (trimmedName !== name) {
    $("#nameError").text(
      currentLanguage === "english"
        ? "No leading or trailing spaces are allowed"
        : "لا يُسمح بوجود مسافات في البداية أو النهاية"
    );
  } else if (!nameRegex.test(name)) {
    $("#nameError").text(
      currentLanguage === "english"
        ? "Please enter a valid name"
        : "يرجى إدخال اسم صالح"
    );
  } else {
    $("#nameError").text("");
  }
});

// Real-time validation for email field
$("#emailField").on("input", function () {
  var email = $(this).val();
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  var specialCharRegex = /^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/;
  var parts = email.split("@");

  if (!emailRegex.test(email)) {
    $("#emailError").text(
      currentLanguage === "english"
        ? "Please enter a valid email address"
        : "يرجى إدخال بريد إلكتروني صالح"
    );
  } else if (specialCharRegex.test(email)) {
    $("#emailError").text(
      currentLanguage === "english"
        ? "Email cannot start or end with a special character"
        : "لا يمكن أن يبدأ البريد الإلكتروني أو ينتهي بحرف خاص"
    );
  } else if (/([^a-zA-Z0-9])\1{1,}/.test(email)) {
    $("#emailError").text(
      currentLanguage === "english"
        ? "Email cannot contain consecutive repeating special characters"
        : "لا يمكن أن يحتوي البريد الإلكتروني على حروف خاصة متتالية"
    );
  } else {
    $("#emailError").text("");
  }
});

// Real-time validation for phone field
$("#phoneField").on("input", function () {
  var phone = $(this).val();
  var cleanedPhone = phone.replace(/\D/g, "");
  var phoneRegex = /^((971[0-9]{9})|(0[0-9]{9}))$/;
  var undesiredFormatRegex = /^(1234567890|0{10,12}|9710{9}|0123456789)$/;

  if (
    !phoneRegex.test(cleanedPhone) ||
    undesiredFormatRegex.test(cleanedPhone)
  ) {
    $("#phoneError").text(
      currentLanguage === "english"
        ? "Please enter a valid phone number. For UAE, use 971 followed by 9 digits or 0 followed by 9 digits."
        : "يرجى إدخال رقم هاتف صالح. لاستخدام الإمارات، استخدم 971 متبوعًا بـ 9 أرقام أو 0 متبوعًا بـ 9 أرقام."
    );
  } else {
    $("#phoneError").text("");
  }
});

var accordionContent = [
  {
    question: "What does ‘Air Quality’ refer to?",
    answer:
      "Air quality refers to the condition of the air in our environment, specifically the presence of pollutants that can impact human health and the environment.",
  },
  {
    question: "What are common air pollutants present in the environment?",
    answer:
      "Common air pollutants include particulate matter (PM), nitrogen dioxide (NO2), sulfur dioxide (SO2), ozone (O3), and carbon monoxide (CO).",
  },
  {
    question: "How does air quality influence weather patterns?",
    answer:
      "Air quality is seen to influence weather patterns. For example, certain pollutants can affect cloud formation and precipitation.",
  },
  {
    question:
      "What is the number of air quality monitoring stations currently operational in Abu Dhabi?",
    answer:
      "The Environment Agency – Abu Dhabi oversees a network of 20 fixed air quality monitoring stations situated across the Emirate of Abu Dhabi, complemented by an additional 2 mobile air quality monitoring stations.",
  },
  {
    question: "Who is considered in a sensitive group?",
    answer:
      "High-risk groups, including children under 18, the elderly, individuals with chronic heart or lung disease, pregnant individuals, people with diabetes, and active outdoor adults, require focused attention. These individuals are more likely to experience the adverse impacts of poor air quality, necessitating proactive measures. To protect these vulnerable populations, it is crucial to monitor air quality, limit outdoor activities during peak pollution hours, ensure well-ventilated indoor spaces, and adhere to medical advice, particularly for those with pre-existing conditions. By collectively taking these steps, we can foster a healthier and more resilient community, prioritizing the well-being of those most at risk from air pollution.",
  },
  {
    question: "How can I check the air quality in my area?",
    answer:
      "You can check the air quality in your area by choosing the nearest monitoring station or searching your area from the search menu in the map.",
  },
  {
    question: "Does air quality play a role in climate change? ",
    answer:
      "Air quality does indeed play a significant role in climate change. Air pollutants classified as greenhouse gases such as methane and carbon dioxide contribute to climate change by intensifying the greenhouse effect and altering the Earth’s energy balance.",
  },
  {
    question: "How does climate change affect air quality? ",
    answer:
      "Climate change can alter weather patterns, leading to more frequent and severe heatwaves, droughts, and wildfires. This can worsen air quality by increasing pollution levels, such as particulate matter and ground-level ozone. Additionally, rising temperatures can accelerate the formation of ozone and increase the volatility of pollutants. Changes in atmospheric circulation can further impact regional air quality, while shifts in ecosystems can alter the composition of atmospheric pollutants.",
  },
  {
    question: "How can individuals contribute to reducing air pollution?",
    answer:
      "<ul><li>Opt for Sustainable Transportation.</li> <li>Use energy-efficient appliances and turn off electronics when not in use.</li> <li>Choose clean energy sources like solar or wind power.</li> <li>Avoid unnecessary vehicle usage to decrease traffic emissions. </li> <li>Consume local produce. </li> </ul>",
  },
  {
    question: "What are the different sources of air pollution?",
    answer:
      "Air pollution sources can be categorized into two main types: anthropogenic and natural sources. Anthropogenic sources are emissions that are released from human activities. Examples of human activities are industrial emissions, transportation, agricultural practices, and residential activities. Natural sources are those naturally occurring processes that release pollutants into the atmosphere such as volcanic eruptions, wildfires, dust and pollen from wind erosion and vegetation, and biogenic emissions from plants and trees.",
  },
  {
    question: "What are the health risks associated with air pollution?",
    answer:
      "Air pollution at high levels and prolonged exposure can cause respiratory problems, aggravate existing health conditions, and contribute to cardiovascular issues.",
  },
  {
    question: "What are the different types of  particulate matter?",
    answer:
      "Particulate matter (PM) refers to tiny particles or droplets in the air that can be inhaled into the lungs. These particles vary in size, and they are categorized based on their diameter. The two main types of particulate matter are: PM10 and PM2.5.",
  },
  {
    question: "What is ozone (O3)?",
    answer:
      "Ozone (O3) is a molecule composed of three oxygen atoms. It is a pale blue gas with a distinct, sharp smell. Ozone is present both in the Earth's upper atmosphere (stratosphere) and at ground level (troposphere), forming the ozone layer and contributing to air quality, respectively.",
  },
  {
    question: "What are nitrogen oxides (NOx)?",
    answer:
      "<p>Nitrogen oxides (NOx) refer to a group of reactive gases that consist of nitrogen and oxygen molecules. The two primary nitrogen oxides of environmental concern are nitrogen monoxide (NO) and nitrogen dioxide (NO2). The chemical formulas for these gases are NO and NO2, respectively.</p> <p>Nitrogen oxides are produced during combustion processes, such as those occurring in vehicles, power plants, and industrial facilities. The main sources of NOx emissions include the burning of fossil fuels, particularly in internal combustion engines and industrial boilers. </p>",
  },
  {
    question: "What is sulfur dioxide (SO2)?",
    answer:
      "Sulfur dioxide (SO2) is a colorless gas with a pungent odor. It is composed of one sulfur atom and two oxygen atoms, and its chemical formula is SO2. Sulfur dioxide is produced mainly by burning fossil fuels containing sulfur, such as coal and oil, in power plants and by certain industrial processes. It is also released during volcanic eruptions.",
  },
  {
    question: "What is carbon monoxide (CO)?",
    answer:
      "Carbon monoxide (CO) is a colorless, odorless, and tasteless gas. It is composed of one carbon atom and one oxygen atom, and its chemical formula is CO. Carbon monoxide is produced by incomplete combustion of carbon-containing fuels, such as gasoline, natural gas, and wood. It can be emitted from vehicles, industrial processes, and household appliances. Carbon monoxide is known for its potential danger, as high concentrations can be toxic to humans and animals. In indoor environments, it is important to ensure proper ventilation and the correct functioning of combustion appliances to prevent the buildup of carbon monoxide. ",
  },
];

var accordionArabicContent = [
  {
    question: 'ماذا يعني مصطلح "جودة الهواء"؟',
    answer:
      " جودة الهواء تشير إلى حالة الهواء المحيط ونقائه. وبشكل خاص إلى وجود الملوثات التي يمكن أن تؤثر على صحة الإنسان والبيئة.",
  },
  {
    question: "ما هي ملوثات الهواء الرئيسية الموجودة في البيئة؟",
    answer:
      "تشمل ملوثات الهواء الرئيسية الجسيمات العالقة (PM) وثاني أكسيد النيتروجين (NO2) وثاني أكسيد الكبريت (SO2) والأوزون (O3) وأول أكسيد الكربون (CO).",
  },
  {
    question: "كيف تؤثر جودة الهواء على أنماط الطقس؟ ",
    answer:
      "نعم، جودة الهواء تؤثر على أنماط الطقس. على سبيل المثال، يمكن أن تؤثر بعض الملوثات على تكوين السحب والهطول.",
  },
  {
    question: "ما هو عدد محطات مراقبة جودة الهواء التي تعمل حاليًا في أبوظبي؟",
    answer:
      "تشرف هيئة البيئة – أبوظبي على شبكة تضم 20 محطة ثابتة لمراقبة جودة الهواء موزعة في جميع أنحاء إمارة أبوظبي، بالإضافة إلى محطتان متنقلتان لمراقبة جودة الهواء.",
  },
  {
    question: "من هم الأشخاص ضمن الفئة الحساسة؟",
    answer: `
الفئة الحساسة (أو فئة ذوي الحساسية)
 تتضمن الأفراد الأكثر عرضة للتأثيرات السلبية لجودة الهواء الغير جيدة، مما يستلزم اتخاذ تدابير استباقية، وتشمل هذه الفئات الأطفال تحت 18 عامًا، وكبار السن، والأفراد المصابين بأمراض القلب أو الرئة المزمنة، والحوامل، والأشخاص المصابين بالسكري، والذين يمارسون الأنشطة الخارجية بشكل دائم. لحماية هذه المجموعات، من الضروري مراقبة جودة الهواء، وتقييد الأنشطة الخارجية خلال ساعات الذروة للتلوث، وضمان وجود مساحات داخلية جيدة التهوية، والالتزام بالنصائح الطبية، خاصة للفئات الذين يعانون من حالات صحية مسبقة. من خلال اتخاذ هذه الخطوات معًا، يمكننا تعزيز مجتمع أكثر صحة ومرونة، من خلال  إعطاء الأولوية للأفراد الأكثر عرضة لخطر التلوث الهوائي.`,
  },
  {
    question: "كيف يمكنني التحقق من جودة الهواء في منطقتي؟",
    answer:
      "يمكنك التحقق جودة الهواء في منطقتك عن طريق اختيار أقرب محطة مراقبة أو البحث عن منطقتك باستخدام البحث في الخريطة.",
  },
  {
    question: "هل لجودة الهواء دور في تغير المناخ؟",
    answer:
      "نعم، لجودة الهواء دور في تغير المناخ. تساهم الملوثات الهوائية المصنفة كغازات دفيئة، مثل الميثان وثاني أكسيد الكربون، في تغير المناخ من خلال زيادة تأثير الاحتباس الحراري وتغيير توازن الطاقة على الأرض.",
  },
  {
    question: "كيف يؤثر تغير المناخ على جودة الهواء؟",
    answer:
      "يمكن أن يؤثر تغير المناخ على أنماط الطقس، مما يسبب موجات حر أكثر تكرارًا وشدة، جفاف، وحرائق الغابات. ويمكن أن يؤدي ذلك إلى تقليل جودة الهواء من خلال زيادة مستويات التلوث، مثل الجسيمات الدقيقة والأوزون على سطح الأرض. كما أن درجات الحرارة المرتفعة قد تسرع من تكوين الأوزون وتزيد من تقلب الملوثات. يمكن أن تؤثر التغيرات في حركة الغلاف الجوي على جودة الهواء في المناطق المختلفة، وقد تؤدي التغيرات في الأنظمة البيئية إلى تغيير في تركيبة الملوثات الجوية.",
  },
  {
    question: "كيف يمكن للأفراد المساهمة في تقليل تلوث الهواء؟",
    answer:
      "<ul><li>استخدام وسائل النقل المستدامة.</li> <li>.استخدام الأجهزة الموفرة للطاقة وإيقاف الأجهزة الإلكترونية عند عدم الاستخدام.</li> <li> .اختيار مصادر الطاقة النظيفة مثل الطاقة الشمسية أو طاقة الرياح. </li> <li>تجنب استخدام المركبات إلا عند الضرورة، لتقليل انبعاثات الإزدحام المروري.</li> <li>استهلاك المنتجات المحلية.</li> </ul>",
  },
  {
    question: "ما هي المصادر المختلفة لتلوث الهواء؟",
    answer:
      "مصادر تلوث الهواء تنقسم إلى نوعين رئيسيين: المصادر البشرية والمصادر الطبيعية. تشمل الانبعاثات الناتجة عن الأنشطة البشرية مثل المصانع، وسائل النقل، الزراعة، والأنشطة السكنية. أما المصادر الطبيعية فهي العمليات التي تحدث بشكل طبيعي وتطلق ملوثات في الهواء، مثل الثورات البركانية، حرائق الغابات، الغبار وحبوب اللقاح من الرياح والنباتات، والانبعاثات البيولوجية الناتجة من النباتات والأشجار.",
  },
  {
    question: "ما هي المخاطر الصحية المرتبطة بتلوث الهواء؟",
    answer:
      "يمكن أن يؤدي التعرض لمستويات عالية من التلوث الهوائي ولفترات طويلة، إلى مشاكل في الجهاز التنفسي، ويزيد من تفاقم الأمراض الصحية الحالية، ويسهم في حدوث اضرار للقلب والأوعية الدموية.",
  },
  {
    question: "ما هي أنواع الجسيمات الدقيقة المختلفة؟",
    answer:
      "تشير الجسيمات الدقيقة (PM) إلى جزيئات أو قطرات صغيرة في الهواء يمكن استنشاقها عبر الرئتين. وتختلف هذه الجسيمات في الحجم، وتصنف بناءً على قطرها. النوعان الرئيسيان من الجسيمات الدقيقة هما: الجسيمات الدقيقة أصغر من 2.5 ميكرونات (PM2.5) والجسيمات الدقيقة أصغر من 10 ميكرونات (PM10).",
  },
  {
    question: "ما هو الأوزون (O3)؟",
    answer:
      "الأوزون (O3) هو غاز أزرق باهت ذو رائحة مميزة وحادة، ويتكون من ثلاثة ذرات أكسجين. يوجد الأوزون في الغلاف الجوي العلوي للأرض (الستراتوسفير) وأيضًا على مستوى سطح الأرض (التروبوسفير)، حيث يشكل طبقة الأوزون ويساعد في تحسين جودة الهواء.",
  },
  {
    question: "ما هي أكاسيد النيتروجين (NOx)؟",
    answer:
      "<p>أكاسيد النيتروجين (NOx) هي مجموعة من الغازات التفاعلية التي تتكون من جزيئات النيتروجين والأكسجين. الأكسيدان الرئيسيان من أكاسيد النيتروجين التي تثير القلق البيئي هما أحادي أكسيد النيتروجين (NO) وثنائي أكسيد النيتروجين (NO2).</p> <p>تنتج أكاسيد النيتروجين أثناء عمليات الاحتراق، مثل المركبات ومحطات الطاقة والمنشآت الصناعية. المصدر الرئيسي لانبعاثات أكاسيد النيتروجين (NOx) هو احتراق الوقود الأحفوري، غالباً في محركات الاحتراق الداخلي والمراجل الصناعية.</p>.",
  },
  {
    question: "ما هو ثنائي أكسيد الكبريت (SO2)؟",
    answer:
      "ثنائي أكسيد الكبريت (SO2) هو غاز عديم اللون ذو رائحة لاذعة. يتكون من ذرة واحدة من الكبريت وذرتين من الأكسجين، وصيغته الكيميائية هي SO2. ينتج ثاني أكسيد الكبريت بشكل رئيسي من حرق الوقود الأحفوري الذي يحتوي على الكبريت، مثل الفحم والنفط، في محطات الطاقة ومن خلال بعض العمليات الصناعية و الثورات البركانية.",
  },
  {
    question: "ما هو أول أكسيد الكربون (CO)؟",
    answer:
      "أول أكسيد الكربون (CO) هو غاز عديم اللون وبدون رائحة وطعم. يتكون من ذرة واحدة من الكربون وذرة واحدة من الأكسجين، وصيغته الكيميائية هي CO. يتم إنتاج أول أكسيد الكربون نتيجة الاحتراق غير الكامل للوقود الذي يحتوي على الكربون، مثل البنزين والغاز الطبيعي والخشب، ويمكن أن ينبعث من المركبات، والعمليات الصناعية، والأجهزة المنزلية. يعرف أول أكسيد الكربون بخطره المحتمل، حيث إن التركيزات العالية يمكن أن تكون سامة للبشر والحيوانات. في البيئات الداخلية، من المهم ضمان التهوية الجيدة وعمل أجهزة الإحتراق بكفاءة وشكل صحيح لمنع تراكم أول أكسيد الكربون.",
  },
];

$.each(accordionContent, function (index, item) {
  // Create accordion item HTML
  var accordionItem =
    '<div class="accordion-item">' +
    '<h2 class="accordion-header" id="heading' +
    (index + 1) +
    '">' +
    '<button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapse' +
    (index + 1) +
    '">' +
    item.question +
    "</button>" +
    "</h2>" +
    '<div id="collapse' +
    (index + 1) +
    '" class="accordion-collapse collapse" data-bs-parent="#myAccordion">' +
    '<div class="accordion-body pt-1 pb-2 text-justify">' +
    "<p>" +
    item.answer +
    "</p>" +
    "</div>" +
    "</div>" +
    "</div>";

  // Append the accordion item HTML to the accordion container
  $("#myAccordion").append(accordionItem);
});

// function renderAccordionContent(content) {
//     $('#myAccordion').empty(); // Clear existing content
//     $.each(content, function (index, item) {
//         var accordionItem = '<div class="accordion-item">' +
//             '<h2 class="accordion-header" id="heading' + (index + 1) + '">' +
//             '<button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapse' + (index + 1) + '">' +
//             item.question +
//             '</button>' +
//             '</h2>' +
//             '<div id="collapse' + (index + 1) + '" class="accordion-collapse collapse" data-bs-parent="#myAccordion">' +
//             '<div class="accordion-body pt-1 pb-2 text-justify">' +
//             '<p>' +
//             item.answer +
//             '</p>' +
//             '</div>' +
//             '</div>' +
//             '</div>';

//         $('#myAccordion').append(accordionItem);
//     });
// }

function renderAccordionContent(content) {
  $("#myAccordion").empty(); // Clear existing content
  $.each(content, function (index, item) {
    var isOpen = index === 0 ? "show" : ""; // Open only the first item by default
    var isCollapsed = index === 0 ? "" : "collapsed"; // Remove 'collapsed' from the first button

    var accordionItem =
      '<div class="accordion-item">' +
      '<h2 class="accordion-header" id="heading' +
      (index + 1) +
      '">' +
      '<button type="button" class="accordion-button ' +
      isCollapsed +
      '" data-bs-toggle="collapse" data-bs-target="#collapse' +
      (index + 1) +
      '">' +
      item.question +
      "</button>" +
      "</h2>" +
      '<div id="collapse' +
      (index + 1) +
      '" class="accordion-collapse collapse ' +
      isOpen +
      '" data-bs-parent="#myAccordion">' +
      '<div class="accordion-body pt-1 pb-2 text-justify">' +
      "<p>" +
      item.answer +
      "</p>" +
      "</div>" +
      "</div>" +
      "</div>";

    $("#myAccordion").append(accordionItem);
  });
}

$("#collapse1").addClass("show");
$("#heading1 button").toggleClass("collapsed");
$(".select-pils").on("click", function () {
  var tabText = $(this).text();
  if (tabText === " AQI ") {
    $(".changeHeading-pollutant").text("Station AQI Trends");
  } else if (tabText === " Pollutant ") {
    $(".changeHeading-pollutant").text("Station Pollutants Trends");
  }
});

// function toggleChangeLanguage(element) {
//     const isChecked = element.checked;

//     document.getElementById('language-toggle').checked = isChecked;
//     document.getElementById('language-toggle1').checked = isChecked;
//     document.getElementById('language-toggle1-btn').checked = isChecked;
//     if (isChecked) {
//         console.log("Switched to Arabic");
//     } else {
//         console.log("Switched to English");
//     }
// }

// function toggleChangeLanguage() {
//   const button1 = document.getElementById("language-toggle");
//   const button2 = document.getElementById("language-toggle1");
//   const button3 = document.getElementById("llanguage-toggle");

//   // Determine the current language based on one button's text
//   const isArabic = button1.innerText === "عربي";

//   // Toggle the text for all buttons
//   button1.innerText = isArabic ? "English" : "عربي";
//   button2.innerText = isArabic ? "English" : "عربي";
//   button3.innerText = isArabic ? "English" : "عربي";

//   // Toggle the class based on the language
//   if (!isArabic) {
//     // If switched to Arabic, remove the 'english-mode' class
//     button1.classList.remove("english-mode");
//     button2.classList.remove("english-mode1");
//     button3.classList.remove("english-mode1");
//   } else {
//     // If switched to English, add the 'english-mode' class
//     button1.classList.add("english-mode");
//     button2.classList.add("english-mode1");
//     button3.classList.add("english-mode");
//   }
// }
// Function to initialize button text based on localStorage
// function initializeLanguageButton() {
//     const button1= document.getElementById("language-toggle");
//     const button2= document.getElementById("language-toggle1");
//  const button3 = document.getElementById("llanguage-toggle");
//     const currentLanguage = localStorage.getItem("language") || "english";
// const arabictext="عربي" ;

//     // Set button text based on the language
//     button1.innerText = currentLanguage === "english" ?arabictext : "English";
//     button2.innerText = currentLanguage === "english" ? arabictext : "English";
//     button3.innerText = currentLanguage === "english" ? arabictext : "English";
// }

function initializeLanguageButton() {
  const button1 = document.getElementById("language-toggle");
  const button2 = document.getElementById("language-toggle1");
  const button3 = document.getElementById("llanguage-toggle");
  const currentLanguage = localStorage.getItem("language") || "english";
  const arabicText = "عربي";
  const arabicFontFamily = "'Cairo', sans-serif";
  const englishFontfamily = "Gothamlight"; // Specify the Arabic font family here

  // Set button text and font based on the language
  if (currentLanguage === "english") {
    button1.innerText = arabicText;
    button2.innerText = arabicText;
    button3.innerText = arabicText;

    // Apply Arabic font family
    button1.style.fontFamily = arabicFontFamily;
    button2.style.fontFamily = arabicFontFamily;
    button3.style.fontFamily = arabicFontFamily;
  } else {
    button1.innerText = "English";
    button2.innerText = "English";
    button3.innerText = "English";

    // Reset to default font family (optional)
    button1.style.fontFamily = englishFontfamily;
    button2.style.fontFamily = englishFontfamily;
    button3.style.fontFamily = englishFontfamily;
  }
}

// Function to toggle the language and update localStorage
// function toggleChangeLanguage() {
//     const button1 = document.getElementById("language-toggle");
//     const button2= document.getElementById("language-toggle1");
//     const button3 = document.getElementById("llanguage-toggle");

//     const currentLanguage = localStorage.getItem("language") || "english";

//     // Toggle the language
//     const newLanguage = currentLanguage === "english" ? "arabic" : "english";

//     // Update button text
//     button1.innerText = newLanguage === "english" ? "عربي" : "English";
//     button2.innerText = newLanguage === "english" ? "عربي" : "English";
//     button3.innerText = newLanguage === "english" ? "عربي" : "English";

//     // Update the language in localStorage
//     localStorage.setItem("language", newLanguage);
// }
function toggleChangeLanguage() {
  const button1 = document.getElementById("language-toggle");
  const button2 = document.getElementById("language-toggle1");
  const button3 = document.getElementById("llanguage-toggle");

  const currentLanguage = localStorage.getItem("language") || "english";

  // Toggle the language
  const newLanguage = currentLanguage === "english" ? "arabic" : "english";
  const arabicFontFamily = "'Cairo', sans-serif"; // Specify the Arabic font family here

  // Update button text and font family based on the language
  if (newLanguage === "english") {
    button1.innerText = "عربي";
    button2.innerText = "عربي";
    button3.innerText = "عربي";

    // Apply Arabic font family
    button1.style.fontFamily = arabicFontFamily;
    button2.style.fontFamily = arabicFontFamily;
    button3.style.fontFamily = arabicFontFamily;
  } else {
    button1.innerText = "English";
    button2.innerText = "English";
    button3.innerText = "English";

    // Reset font family to default (optional)
    button1.style.fontFamily = "";
    button2.style.fontFamily = "";
    button3.style.fontFamily = "";
  }

  // Update the language in localStorage
  localStorage.setItem("language", newLanguage);
  //updateSliderDirection();
  location.reload();
}

// Function to get current translateX value
function getTranslateX(transformValue) {
  const match = transformValue.match(/translate3d\((-?\d+)px, 0px, 0px\)/);
  return match ? parseInt(match[1], 10) : 0;
}

// Function to update the slider direction
function updateSliderDirection() {
  const slidesContainer = document.querySelector(".fp-slidesContainer"); // Update the selector
  const language = localStorage.getItem("language"); // Get current language
  const isArabic = language === "arabic";
  const directionMultiplier = isArabic ? 1 : -1;

  const currentTransform = slidesContainer.style.transform; // Get the current transform
  const currentX = getTranslateX(currentTransform); // Extract the X translation value

  // Calculate the new transform
  const newX = directionMultiplier * Math.abs(currentX);
  slidesContainer.style.transform = `translate3d(${newX}px, 0px, 0px)`;
}

// Initialize button text on page load
document.addEventListener("DOMContentLoaded", initializeLanguageButton);

var slideIndexS = localStorage.getItem("slideIndexS") || 0;

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtns = document.getElementsByClassName("toggleLanguageBtn");
  const faqSection = document.getElementById("faq-section");
  const questionHeader = document.getElementById("questionHeader");
  const questionHeaderAlt = document.getElementById("questionHeaderAlt");
  const monitoringHeading = document.getElementById("monitoringHeading");
  const initiativeHeadingContentLg = document.getElementById(
    "initiativeHeadingContentLg"
  );
  const initiativeHeadingContentSm = document.getElementById(
    "initiativeHeadingContentSm"
  );
  const navLinkAirQuality = document.getElementById("navLinkAirQuality");
  const contactHead = document.getElementById("contactus");
  const heading = document.getElementById("heading");
  const cnctAddress = document.getElementById("cotact-address");
  const cnctAddressmobile = document.getElementById("cotact-address-mobile");
  const agenda = document.getElementById("agenda");
  const agendamobile = document.getElementById("agenda-mobile");
  const nameLabel = document.getElementById("yourname");
  const emailLabel = document.getElementById("youremail");
  const phoneLabel = document.getElementById("yourphone");
  const submitBtn = document.getElementById("sumbitbtn");
  const contactSection = document.getElementById("section5");
  const Message = document.getElementById("message");
  const closeButton = document.querySelector(".newcutom-btn");
  const mobileMenu = document.getElementById("mobile-overlay");
  const dropMenuMobile = document.getElementsByClassName(".dropdown-item");
  const prev = document.querySelector(".previous");
  const next = document.querySelector(".next");
  const airQualityAssessments = document.querySelectorAll(".chart-f-content p");
  const dropdownLists = document.querySelectorAll(
    ".dropdown-menu.metero-dropdown"
  );
  const iaqmElement = document.getElementById("iaqm");
  const switchingElement = document.getElementById("switching-air-purifier");
  const $inputElements = $(".insight .data-list label.list-group-item input");
  currentLanguage = localStorage.getItem("language") || "english";
  const skipButtonImg = document.querySelector("#skipButton img");
  currentStatusClass = statusClass;

  // Initial setup
  getAirQualitySafetyLevel();
  loadCarousel(imageData);
  bindLiveCityRanking();
  loadStationData();
  setLanguageContent(currentLanguage); // Set content based on the current language

  // Add event listeners for toggle buttons
  for (let i = 0; i < toggleBtns.length; i++) {
    toggleBtns[i].addEventListener("click", toggleLanguage);
  }

  function toggleLanguage() {
    currentLanguage = currentLanguage === "english" ? "arabic" : "english";
    localStorage.setItem("language", currentLanguage);
    setLanguageContent(currentLanguage);
  }

  function setLanguageContent(language) {
    if (language === "arabic") {
      document.body.setAttribute("dir", "rtl");
      toggleBtns[0].textContent = "English";
      $inputElements.addClass("rtl-stationsData");
      updateToArabic();
      bindLiveCityRanking();
      bindStationInfo();
      updateNavLinksToArabic();
      updateFooterLinksToArabic();
      loadStationData();
      updateAqitoArabic();
      updateCharts(chartFilterArabic.Hourly);
      $("#currentDate").html(getFormattedDate(new Date()));
      $("#last-updatedTime").html(getFormattedDate1(new Date()));
      $("#last-updatedTime-sm").html(getFormattedDate1(new Date()));
      skipButtonImg.src = "./images/new-images/skip-icon-arabic.svg";
    } else {
      document.body.setAttribute("dir", "ltr");
      toggleBtns[0].textContent = "عربي";
      $inputElements.removeClass("rtl-stationsData");
      updateToEnglish();
      bindLiveCityRanking();
      bindStationInfo();
      updateNavLinksToEnglish();
      updateFooterLinksToEnglish();
      loadStationData();
      updateAqitoEnglish();
      updateCharts(chartFilter.Hourly);
      $("#currentDate").html(getFormattedDate(new Date()));
      $("#last-updatedTime").html(getFormattedDate1(new Date()));
      $("#last-updatedTime-sm").html(getFormattedDate1(new Date()));
      skipButtonImg.src = "./images/new-images/skip-icon.svg";
    }
  }
  function updateToArabic() {
    let indexdes = localStorage.getItem("destinationIndex");

    renderAccordionContent(accordionArabicContent);
    loadCarousel(imageDataArabic);
    currentStatusClass = statusClassArabic;
    // document.querySelector('#language-toggle').removeClass('arabic-mode');
    document.body.classList.toggle("arabic-mode");
    //for insights animation buttons
    if (indexdes == 3) {
      $(".fp-prev").addClass("disabled").removeClass("animate-blinking");
      $(".fp-next").removeClass("disabled").addClass("animate-blinking");
    } else if (indexdes == 1 || indexdes == 2) {
      $(".fp-prev").removeClass("disabled").addClass("animate-blinking");
      $(".fp-next").removeClass("disabled").removeClass("animate-blinking");
    } else {
      $(".fp-prev").removeClass("disabled").addClass("animate-blinking");
      $(".fp-next").addClass("disabled").removeClass("animate-blinking");
    }
    $(".accordion-button").addClass("rtl-accordion");
    $(".accordion-button").addClass("accordion-align-content");
    $(".faqscrolling").addClass("rtl-faqscrolling");
    $(".contact-info-content").addClass("contact-info-data");
    $inputElements.addClass("rtl-stationsData");
    $(".insight .sorttoggle button.btn-close").addClass("sort-toggle");
    $(".insight #sidebar-btn").addClass("ipad-expand-panel");
    $(".switch1 > span.on").addClass("arabic-switch1");
    $(".form-direction").css({
      "text-align": "right",
      direction: "rtl",
    });
    $(".insight #sidebar-btn").addClass("expandpanelipad");
    // $('.insight .coll-icon').addClass('expandpanelairpro')
    $(".iconimg").addClass("infoiconmobile");
    $(".equal-station-box-height ").addClass("pollutent-graph");
    $(".insight .silde-dv").addClass("slide-dv-position");
    $("#fp-nav").addClass("fp-left");
    $("#fp-nav").removeClass("fp-right");
    $(".insight ul.dropdown-menu.sorttoggle.show").addClass("left-zero");
    // $('.insight ul.dropdown-menu.sorttoggle.show').removeClass('left-minus-twelve')
    $(".footer-change-col").removeClass("col-xl-3").addClass("col-xl-2");
    // $('.open').addClass('hamberger-cross-icon');
    $(".faq-section h4").addClass("questions-heading-ipad");
    $(".insight ul.nav.twobar-tabs").addClass("graph-tabs-arabic");

    // $('.col-lg-4').removeClass('col-lg-4').addClass('col-lg-2');
    // $('.col-xl-8').removeClass('col-xl-8').addClass('col-xl-9');
    // $('.me-4').removeClass('me-4').addClass('ms-4');
    closeSidebar();
    getAirQualitySafetyLevel();

    // document.querySelector('').classList.add('');
    // $('.fp-next').addClass('next-buttons');
    $(".fp-next").addClass("animation-next-buttons");
    $(".fp-prev")
      .removeClass(".silde-dv .fp-arrow.fp-controlArrow.fp-prev")
      .addClass("fa-move-next-arrow");
    //   document.querySelectorAll('.fp-prev.animate-blinking,.fp-next.animate-blinking').forEach(element => {
    //     console.log(element);
    //     element.classList.add('arabic-animate-blinking');
    // });

    // document.querySelectorAll('.fp-prev.animate-blinking, .fp-next.animate-blinking').forEach(element => {
    //   element.classList.add('arabic-animate-blinking')});
    document.querySelectorAll(".fp-prev, .fp-next").forEach((element) => {
      element.classList.add("arabic-animate");
    });

    $(".monitoring-heading").addClass("arabic-monitoring-heading");
    $(".footer-logo").addClass("footer-logo-arabic");
    $(".footer-social-icons").addClass("social-media-icons");
    $(".copy-right-para").addClass("copy-right-para-footer");
    $(".Newsearch-box ul").css("right", "38px");
    $(".reset-button").css({ left: "10px", right: "" });
    // $('.insight .date-box .cal-div input').css('padding-left', '0');
    $(".prev-btn").addClass("previous-btn");
    $(".next-btn").addClass("next-button");

    $(".sidebar-nav").addClass("sidebar-nav-arabic");
    $("#page-content-wrapper").addClass("page-content-wrapper-arabic");

    $(".search-station-sidebar").addClass("sidebar-search-station");
    $(".insight .ug_content ").addClass("ug_content-arabic");
    document.getElementById("mainPollutantName").style.textAlign = "right";
    // document.querySelector('.insight .ug_content ').style.left='-130px'
    $(".insight .chart-f-content p").addClass("aqi-content-arabic");
    $(".station-aqi-trends-disclaimers").addClass(
      "station-aqi-desclimer-mobile"
    );
    $(".exceeded-box .contact-content p ").addClass(
      "hours-exceedance-disclaimer-mobile"
    );
    // $('#sidebar-btn').addClass('expand-panel-arabic');;
    //   document.querySelectorAll('.insight #sidebar.visible #sidebar-btn').forEach((element) => {
    //     element.classList.add('expand-panel-arabic');
    //     console.log("classsssssisaddedd")
    // });

    $(".circular-width").addClass("circular-width-arabic");

    questionHeader.textContent = "الأسئلة الشائعة! ";
    questionHeaderAlt.innerHTML = "الأسئلة الشائعة! ";
    monitoringHeading.innerText = "مبادراتنا لمراقبة جودة الهواء";
    initiativeHeadingContentLg.innerHTML =
      "انضموا إلينا في مهمتنا من أجل سماء أنظف ومجتمعات أكثر صحة. وكونوا معنا في المحافظة على غلافنا الجوي وحماية مستقبلنا.";
    initiativeHeadingContentSm.innerText =
      "انضموا إلينا في مهمتنا من أجل سماء أنظف ومجتمعات أكثر صحة. وكونوا معنا في المحافظة على غلافنا الجوي وحماية مستقبلنا.";
    navLinkAirQuality.innerText = "جودة الهواء";

    //03-11
    document.addEventListener("DOMContentLoaded", function () {
      document.querySelector(".thankyou-submit-msg").innerText =
        "شكرا لتواصلك معنا!";
    });
    document.addEventListener("DOMContentLoaded", function () {
      document.querySelector(".getback-msg").innerText =
        "لقد تم استلام رسالتك. سوف نعود اليكم قريبا";
    });
    document.querySelector(".welcome-text").innerText =
      "مرحبًـــا بكـــم فـــي";
    document.querySelector(".quotes").innerText = "مراقبـــة جـــودة الهـــواء";
    document.querySelector(".emirates-text").innerText = "فـــي أبوظبـــي";
    document.querySelector("#AQI-mb-0").innerText = "مؤشر جودة الهواء";
    document.querySelector("#AQI-mb-1").innerText = "AQI";
    document.querySelector(".copy-right-para").innerText =
      "© 2021 حكومة أبوظبي جميع الحقوق محفوظة.";
    document.querySelectorAll(".AQI-mb-2").forEach((element) => {
      element.innerText = "AQI";
    });
    document.querySelector(".sort-label").textContent = "ترتيب";
    document.querySelector(".nearest-label").textContent = "الأقرب إلي";
    document.querySelector(".aqi-label").textContent = "مؤشر جودة الهواء";
    document.querySelector(".order-label").textContent = "أبجدي";
    document.querySelectorAll(".windSpeedHeading").forEach((element) => {
      element.textContent = "سرعة الرياح";
    });
    document.querySelectorAll(".windDirectionHeading").forEach((element) => {
      element.textContent = "اتجاه الرياح";
    });
    document.querySelectorAll(".humidityHeading").forEach((element) => {
      element.textContent = "الرطوبة";
    });
    document.querySelectorAll(".temperatureHeading").forEach((element) => {
      element.textContent = "درجة الحرارة";
    });
    (document.querySelector(".map-disclaimer-content").innerText =
      "بياناتنا في الوقت الحالي، بينما يتم تحديثها باستمرار، تخضع للتحقق الدوري، وبالتالي قد لا تكون دقيقة تمامًا."),
      (document.querySelector(".sm-map-disclaimer").innerText =
        "بياناتنا في الوقت الحالي، بينما يتم تحديثها باستمرار، تخضع للتحقق الدوري، وبالتالي قد لا تكون دقيقة تمامًا.");
    document.querySelector(".map-disclaimer-air").innerText =
      "مؤشر جودة الهواء";
    document.querySelector(".insight-btn").innerText = "المزيد من المعلومات";
    document.querySelector(".insight-btn-tab").innerText = "المزيد من المعلومات";
    // document.querySelector('.fp-next').style.right='auto';
    contactHead.textContent = "تواصل معنا";
    heading.textContent = "أخبرنا برأيك";
    // cnctAddress.innerHTML = `المقر الرئيسي، المعمورة، المبنى A، المبنى 62، <br /> شارع المعمورة، ال نهيان، أبوظبي، الإمارات العربية المتحدة، <br /> الرمز البريدي: 22221، صندوق بريد: 4553`;
    cnctAddress.innerHTML = `المقر الرئيسي: المعمورة، المبنى A، المبنى 62،<br/> شارع المعمورة، آل نهيّان، أبوظبي، الإمارات العربية المتحدة،<br/> الرمز البريدي: 22221، صندوق البريد: 4553`;
    // cnctAddressmobile.innerHTML = `المقر الرئيسي، المعمورة، المبنى A، المبنى 62، شارع المعمورة، ال نهيان، أبوظبي، الإمارات العربية المتحدة، الرمز البريدي: 22221، صندوق بريد: 4553`;
    cnctAddressmobile.innerHTML = `المقر الرئيسي: المعمورة، المبنى A، المبنى 62،<br/> شارع المعمورة، آل نهيّان، أبوظبي، الإمارات العربية المتحدة،<br/> الرمز البريدي: 22221، صندوق البريد: 4553`;
    // agenda.textContent = 'تأسست في عام 1996، وتلتزم هيئة البيئة – أبوظبي (EAD) بحماية وتعزيز جودة الهواء، والمياه الجوفية، بالإضافة إلى التنوع البيولوجي في نظامنا البيئي الصحراوي والبحري. من خلال الشراكة مع جهات حكومية أخرى، والقطاع الخاص، والمنظمات غير الحكومية، والوكالات البيئية العالمية، نتبنى أفضل الممارسات الدولية، والابتكار، والعمل الجاد لوضع تدابير سياسية فعالة. نسعى لزيادة الوعي البيئي، وتسهيل التنمية المستدامة، وضمان أن تظل القضايا البيئية من أولويات جدول أعمالنا الوطني.';
    agenda.textContent =
      "تقوم هيئة البيئة – أبوظبي، التي تأسست في عام 1996، بحماية وتعزيز جودة الهواء، والمياه الجوفية بالإضافة إلى حماية التنوع البيولوجي في النظم البيئية الصحراوية والبحرية في إمارة أبوظبي. ومن خلال الشراكة مع جهات حكومية أخرى، والقطاع الخاص والمنظمات غير الحكومية، والمنظمات البيئية العالمية، تعمل الهيئة على تبني أفضل الممارسات العالمية، وتشجيع الابتكار والعمل الجاد لاتخاذ تدابير، وسياسات فعالة. كما تسعى لتعزيز الوعي البيئي، والتنمية المستدامة، وضمان استمرار إدراج القضايا البيئية ضمن أهم الأولويات في الأجندة الوطنية.";
    // agendamobile.textContent = 'تأسست في عام 1996، وتلتزم هيئة البيئة – أبوظبي (EAD) بحماية وتعزيز جودة الهواء، والمياه الجوفية، بالإضافة إلى التنوع البيولوجي في نظامنا البيئي الصحراوي والبحري. من خلال الشراكة مع جهات حكومية أخرى، والقطاع الخاص، والمنظمات غير الحكومية، والوكالات البيئية العالمية، نتبنى أفضل الممارسات الدولية، والابتكار، والعمل الجاد لوضع تدابير سياسية فعالة. نسعى لزيادة الوعي البيئي، وتسهيل التنمية المستدامة، وضمان أن تظل القضايا البيئية من أولويات جدول أعمالنا الوطني.';
    agendamobile.textContent =
      "تقوم هيئة البيئة – أبوظبي، التي تأسست في عام 1996، بحماية وتعزيز جودة الهواء، والمياه الجوفية بالإضافة إلى حماية التنوع البيولوجي في النظم البيئية الصحراوية والبحرية في إمارة أبوظبي. ومن خلال الشراكة مع جهات حكومية أخرى، والقطاع الخاص والمنظمات غير الحكومية، والمنظمات البيئية العالمية، تعمل الهيئة على تبني أفضل الممارسات العالمية، وتشجيع الابتكار والعمل الجاد لاتخاذ تدابير، وسياسات فعالة. كما تسعى لتعزيز الوعي البيئي، والتنمية المستدامة، وضمان استمرار إدراج القضايا البيئية ضمن أهم الأولويات في الأجندة الوطنية.";
    nameLabel.textContent = "الاسم";
    emailLabel.textContent = "البريد الإلكتروني";
    phoneLabel.textContent = "الهاتف";
    submitBtn.textContent = "إرسال";
    Message.placeholder = "الرسالة";
    Message.style.direction = "ltr";
    document.getElementById("searchInput").placeholder = "البحث عن المحطة";
    document.getElementById("stationsDropdownMapSearch").placeholder =
      "البحث عن المحطة";
    document
      .getElementById("headerSearchInput")
      .setAttribute("placeholder", "بحث");

    document
      .querySelectorAll(".datepicker")
      .forEach((element) => (element.placeholder = " إنشاء مخصص"));

    document.querySelector(".search-result p").innerText = "نتائج البحث";
    document.querySelector(".newcutom-btn").innerText = "إغلاق";
    document.querySelector(
      "header .search-block .search-collapse .card-body .container-fluid .close"
    ).style.float = "left";
    document.querySelector(
      "header .search-block .search-collapse .search-result"
    ).style.paddingRight = "50px";
    closeButton.style.textTransform = "none";
    document.querySelector(".paratab").innerText =
      "عندما يصل مؤشر جودة الهواء (AQI) إلى اللون البرتقالي أو الأحمر أو الأرجواني أو العنابي، فمن المهم اتخاذ خطوات وقائية للحفاظ على صحتك. اتبع هذه الإرشادات لتقليل تأثير التلوث المرتفع على صحتك.";
    document.querySelector(".mask-hoverEffect").innerText = "استخدام الكمامات";
    if (window.matchMedia("(max-width: 767px)").matches) {
      $(".insight .search-box .p-input span").css({
        right: "auto",
        left: "12px",
      });
    } else if (window.matchMedia("(min-width: 768px)").matches) {
      $(".insight .search-box .p-input span").css({
        right: "auto",
        left: "12px",
      });
    }
    $(".air-quality-pill").addClass("air-quality-btn");
    $(".dropdown-menu.sorttoggle").removeClass("showText");
    $("#language-toggle1").addClass("btn-name-english");

    $(".footer-social-icons").addClass("social-media-icons");
    $(".copy-right-para").addClass("copy-right-para-footer");
    $(".copy-right-contents").addClass("copy-right-contents-footer");
    $(".contact-us-alignment").addClass("contact-us-alignment-style");
    $(".footer-our-airquality").addClass("footer-our-airquality-alignment");
    $(".next-btn-arb").addClass("next-btn-arb-alignment");
    $(".main-box").addClass("main-box-arabic");
    $(".tab_shado").addClass("main-box-arabic-box");
    $(".responsive-align").removeClass("pad_r");
    $(".contact-section .contact-info-item .contact-info-content a").addClass(
      "footer-content"
    );
    $(".insight .main-box").addClass("insightbox-tabmini");
    $(".equal-station-box-height").addClass("pollutant-graph-ipad");

    // document.querySelector('.cal-div').style.direction='rtl';
    // document.querySelectorAll('.insight .silde-dv').forEach(item => {
    //     item.style.removeProperty('margin','1rem','1rem','importent');
    // });

    $(".insight .polutenat_bar .tab_shado .graph-duration-filters").removeClass(
      "filter-arabic"
    );

    if (window.matchMedia("(max-width: 767px)").matches) {
      document.querySelectorAll(".insight .silde-dv").forEach((item) => {
        item.style.setProperty("margin", "1rem", "important");
      });
    }

    const calenderarabic = document.querySelectorAll(".cal-div");
    calenderarabic.forEach((item) => {
      item.style.setProperty("direction", "rtl");
    });

    $(
      ".pollutant-toggleBar .info-popup, .pollutant-toggleBar:first-of-type  .info-topPosition, .pollutant-toggleBar .info-topPosition1"
    ).addClass("mobileinfocnt");

    // $('#airQualitySafetyLevelStation').addClass('station-arabic');

    $(".icon-circle-xmark-regular").addClass("cross-icon");

    const stationnamearabic = document.querySelectorAll(".insightStation h3");
    stationnamearabic.forEach((item) => {
      item.style.setProperty("padding", "0 14px");
    });

    const searchstation = document.querySelectorAll(
      ".insight .inner_list-content span"
    );
    searchstation.forEach((item) => {
      item.style.setProperty("float", "right", "important");
    });

    document.querySelectorAll(".date-time").forEach((element) => {
      element.innerText = "التاريخ والوقت";
    });
    document.querySelector(".nearest-heading").innerHTML =
      "أقرب محطة: مدينة خليفة";

    const multivaluetab = document.querySelectorAll(".mult-value-tab");
    multivaluetab.forEach((item) => {
      item.style.setProperty("right", "23%");
      item.style.setProperty("left", "auto");
      item.style.setProperty("direction", "ltr");
    });

    const responsiveCross = document.querySelector(".responsive-cross");
    responsiveCross.classList.add("responsive-cross-css");
    responsiveCross.classList.remove("responsive-cross-css-english");

    const modalBackgroundImg = document.querySelector(".modal-background img");
    modalBackgroundImg.classList.add("modal-padding");
    modalBackgroundImg.classList.remove("modal-padding-english");

    const projectModalItemContent = document.querySelector(
      ".projectItemContent"
    );
    projectModalItemContent.classList.add("modal-padding");
    projectModalItemContent.classList.remove("modal-padding-english");

    const projectModalItemDescription = document.querySelector(
      ".projectItemDescription"
    );
    projectModalItemDescription.classList.add("modal-padding");
    projectModalItemDescription.classList.remove("modal-padding-english");

    $(".sidebar button").addClass("close-modal-button");
    // document.querySelector('.mask-usage').innerText = 'استخدام الكمامة';
    document.addEventListener("DOMContentLoaded", function () {
      document.querySelector(".mask-usage").innerText = "استخدام الكمامات";
    });
    iaqmElement && (iaqmElement.innerText = "تحسين جودة الهواء الداخلي");
    switchingElement &&
      (switchingElement.innerText = "تشغيل جهاز تنقية الهواء");
    document.getElementById("maskusage-model") &&
      (document.getElementById("maskusage-model").innerText =
        "استخدام الكمامات");

    document.querySelector(".quality-index-wrapper-h2 .levelmb25").innerText =
      "مؤشر جودة الهواء";
    document.querySelectorAll(".pollutant-graph-title").forEach((element) => {
      element.innerText = "اتجاهات التلوث";
    });
    // document.querySelector('.pollutant-graph-title').innerText = 'اتجاهات التلوث';
    document.getElementById("health-recommendations").innerText =
      "التوصيات الصحية";
    document.querySelector(".main-contributing-pollutant").innerText =
      "الملوث الرئيسي";
    document.querySelector(".Causes-wrapper h3").innerText = "الأسباب المحتملة";
    // 25/10
    // document.getElementById('enjoy-some-indoor-fun').innerText = 'استمتع ببعض المرح في الأماكن المغلقة';
    document.addEventListener("DOMContentLoaded", function () {
      document.getElementById("enjoy-some-indoor-fun").innerText =
        "استمتع بوقتك في الأماكن المغلقة";
    });

    // document.querySelector('.imagetext1').innerText = 'التواجد في الأماكن المغلقة هو الخيار الأفضل';
    document.addEventListener("DOMContentLoaded", function () {
      document.querySelector(".imagetext1").innerText =
        "التواجد في الأماكن المغلقة هو الخيار الأفضل";
    });
    // document.querySelector('.imagetext2').innerText = 'التواجد في الأماكن المغلقة هو الخيار الأفضل';
    document.addEventListener("DOMContentLoaded", function () {
      document.querySelector(".imagetext2").innerText =
        "التواجد في الأماكن المغلقة هو الخيار الأفضل";
    });
    // document.querySelector('.imagetext3').innerText = 'التواجد في الأماكن المغلقة هو الخيار الأفضل';
    document.addEventListener("DOMContentLoaded", function () {
      document.querySelector(".imagetext3").innerText =
        "التواجد في الأماكن المغلقة هو الخيار الأفضل";
    });
    // document.querySelector('.imagetext1').innerText = 'التواجد في الأماكن المغلقة هو الخيار الأفضل';
    // document.querySelector('.imagetext2').innerText = 'التواجد في الأماكن المغلقة هو الخيار الأفضل';
    // document.querySelector('.imagetext3').innerText = 'التواجد في الأماكن المغلقة هو الخيار الأفضل';
    document.querySelector(".station-aqi-trends-disclaimers").innerText =
      "تابع جودة الهواء في أبوظبي بشكل مستمر من خلال نظرة سريعة: رسوم بيانية واضحة تتبع مستويات مؤشر جودة الهواء (AQI) والملوثات مع مرور الوقت، موضحة جودة الهواء من الجيد إلى الخطير.";
    document.getElementById("air-quality-index").innerText = "مؤشر جودة الهواء";
    document.querySelector(
      ".refreshed-time-aqip"
    ).innerHTML = `<b class="refreshed-time-aqi"> آخر تحديث :</b> <span id="aqilastrefreshtime"></span>`;
    document.querySelector(
      ".refreshed-time-pm10-para"
    ).innerHTML = `<b class="refreshed-time-pm10">آخر تحديث :</b> <span id="pm10lastrefreshtime"></span>`;
    document.querySelector(
      ".refreshed-time-pm25-para"
    ).innerHTML = `<b class="refreshed-time-pm25">آخر تحديث :</b> <span id="pm25lastrefreshtime"></span>`;
    document.querySelector(
      ".refreshed-time-s02-para"
    ).innerHTML = `<b class="refreshed-time-s02">آخر تحديث :</b> <span id="so2lastrefreshtime"></span>`;
    document.querySelector(
      ".refreshed-time-co-para"
    ).innerHTML = `<b class="refreshed-time-co">آخر تحديث :</b> <span id="colastrefreshtime"></span>`;
    document.querySelector(
      ".refreshed-time-03-para"
    ).innerHTML = `<b class="refreshed-time-03">آخر تحديث :</b> <span id="o3lastrefreshtime"></span>`;
    document.querySelector(
      ".refreshed-time-no2-para"
    ).innerHTML = `<b class="refreshed-time-no2">آخر تحديث :</b> <span id="no2lastrefreshtime"></span>`;
    document.querySelector(
      ".refreshed-time-staqi-para"
    ).innerHTML = `<b class="refreshed-time-staqi">آخر تحديث :</b> <span id="StAQIlastrefreshtime"></span>`;
    // document.querySelector('.station-aqi-legend').style.direction='rtl';
    // document.getElementById('barChartFilter').innerText='كل ساعة';
    // -------23/10/2024-----
    document
      .querySelectorAll(".hours-exceedance-peryear-desclimer")
      .forEach((element) => {
        // element.innerText = `قم بإلقاء نظرة سريعة على مخطط جودة الهواء السنوي لمدينة أبوظبي الذي يُظهر عدد الساعات التي تجاوز فيها كل ملوث المستويات الآمنة. وابقَ على اطلاع على اتجاهات جودة الهواء بكل سهولة.`;
        element.innerText = `قم بإلقاء نظرة سريعة على مخطط جودة الهواء السنوي لمدينة أبوظبي الذي يظهر عدد الساعات التي يتجاوز فيها كل ملوث المستويات الآمنة. كن دائمًا على اطلاع بإتجاهات جودة الهواء بكل سهولة.`;
      });
    document
      .querySelectorAll(".our-air-analytics-desclimer")
      .forEach((element) => {
        element.innerText = `تابع جودة الهواء في مدينة أبوظبي على مدار العام من خلال مخطط الرادار لدينا. كل جزء ملون يوضح تكرار حالة جودة الهواء المختلفة، من "جيد" إلى "خطير".`;
      });
    document.querySelector(
      ".hours-exceed-heading"
    ).innerHTML = `<h2 class="mb-0 exceed-height tab-top-pd40 tabexceed-pb0">عدد الساعات التي تجاوزت الحد المسموح به سنوياً</h2>`;
    document.querySelector(".changeHeading-pollutant").innerText =
      "اتجاهات مؤشر جودة الهواء للمحطة";
    $(".select-pils").on("click", function () {
      var tabText = $(".select-pils.active").text().trim();
      if (tabText === "AQI" || tabText === "مؤشر جودة الهواء") {
        document.querySelector(".changeHeading-pollutant").innerText =
          "اتجاهات مؤشر جودة الهواء للمحطة";
      }
      if (tabText === "Pollutant" || tabText === "الملوثات") {
        document.querySelector(".changeHeading-pollutant").innerText =
          "اتجاهات ملوثات المحطة";
      }
    });
    document.getElementById("pills-aqi_lin-tab").innerText = "مؤشر جودة الهواء";
    document.getElementById("pills-profile-tab").innerHTML = "الملوثات";
    // document.querySelector('.equal-station-box-height').style.direction = 'ltr';
    document.querySelector(
      ".contact-content-mobile"
    ).innerText = `قم بإلقاء نظرة سريعة على مخطط جودة الهواء السنوي لمدينة أبوظبي الذي يظهر عدد الساعات التي يتجاوز فيها كل ملوث المستويات الآمنة. كن دائمًا على اطلاع بإتجاهات جودة الهواء بكل سهولة.`;
    document.querySelector(".air-analytics-mobile").innerText =
      'تابع جودة الهواء في مدينة أبوظبي على مدار العام من خلال مخطط الرادار لدينا. كل جزء ملون يوضح تكرار حالة جودة الهواء المختلفة، من "جيد" إلى "خطير".';
    document.querySelector(".activity_heading").innerText = "الأنشطة";
    airQualityAssessments.forEach((element) => {
      element.innerText =
        'يمكنك تقييم جودة الهواء بكفاءة من خلال رمز تصنيف الألوان، والتي تتراوح من "جيد" إلى "خطير"، ويتم تحديثها كل ساعة، إضافة إلى التحديثات اليومية والشهرية والسنوية.';
    });
    // document.getElementById('sand-storm').innerText='العاصفة الرملية';
    document.addEventListener("DOMContentLoaded", function () {
      document.getElementById("sand-storm").innerText = "العاصفة الرملية";
    });
    // document.querySelector('.high-traffic').innerText='ارتفاع حركة المرور';
    document.addEventListener("DOMContentLoaded", function () {
      document.querySelector(".high-traffic").innerText = "ارتفاع حركة المرور";
    });
    // document.querySelector('.indor-aq-maintenance').innerText='صيانة جودة الهواء الداخلية';
    document.addEventListener("DOMContentLoaded", function () {
      document.querySelector(".indor-aq-maintenance").innerText =
        "تحسين جودة الهواء الداخلي";
    });
    // document.querySelector('.switch-on-air-purifier').innerText='تشغيل جهاز تنقية الهواء الخاص بك';
    document.addEventListener("DOMContentLoaded", function () {
      document.querySelector(".switch-on-air-purifier").innerText =
        "تشغيل جهاز تنقية الهواء";
    });
    document.querySelectorAll(".measure-pollut").forEach((element) => {
      element.innerText = "الملوثات التي يتم قياسها";
    });
    document.querySelector(".Expand-Panel-mobile").innerText =
      "قم بتوسيع اللوحة";
    document.querySelector(".Expand-Panel-tab").innerText = "قم بتوسيع اللوحة";
    // document.querySelector('.material-symbols-outlined').innerText='إغلاق';
    document.querySelector(".good-label-graph").innerText = "جيد";

    document
      .querySelectorAll(".material-style label")
      .forEach(function (label) {
        label.style.left = ""; // Clear the left style
        label.style.right = "0px"; // Set to right alignment
      });

    // Also adjust the input placeholder alignment for Arabic
    document.querySelector("#message").style.textAlign = "right";

    const iicon = document.querySelectorAll(
      ".insight .pollutant-toggleBar .iconimg"
    );
    iicon.forEach((item) => {
      // item.style.setProperty("right", "auto", "important"); // Set 'right: auto !important'
      item.style.setProperty("left", "7px");
      item.style.setProperty("right", "auto");
      item.style.setProperty("margin-left", "20px");
      item.style.setProperty("margin-right", "auto");
    });
    const pollutantinfoIcon = document.querySelectorAll(
      ".pollutant-toggleBar .pollu-top-position"
    );
    pollutantinfoIcon.forEach((item) => {
      item.style.setProperty("right", "auto", "important"); // Set 'right: auto !important'
      item.style.setProperty("left", "0", "important");
    });
    const infocontent = document.querySelectorAll(
      ".pollutant-toggleBar .info-popup, .pollutant-toggleBar .info-topPosition, .pollutant-toggleBar .info-topPosition1 "
    );
    infocontent.forEach((item) => {
      item.style.setProperty("right", "auto", "important"); // Set 'right: auto !important'
      item.style.setProperty("left", "0");
    });

    $(".insight .slide-content ul .modal.fade button.btn-close").addClass(
      "health-cross-icon"
    );
    const infocontentAlign = document.querySelectorAll(".ps-0");
    infocontentAlign.forEach((item) => {
      item.classList.add("pollutant-align-right");
    });

    const stationiicon = document.querySelectorAll(
      ".insight .pollutant-toggleBar .ic-top-position"
    );
    stationiicon.forEach((item) => {
      item.style.setProperty("right", "auto", "important"); // Set 'right: auto !important'
      item.style.setProperty("left", "0", "important");
    });

    const iinfo = document.querySelectorAll(".bar-section-info");
    iinfo.forEach((item) => {
      item.style.setProperty("text-align", "right"); // Correct property and value
    });
    //today
    $(".fp-prev").addClass("direction-arabic");
    const stationNameinsights = document.querySelectorAll(".insightStation h3");
    stationNameinsights.forEach((item) => {
      item.style.setProperty("text-align", "right");
    });

    const graphsheading = document.querySelectorAll(
      ".insight .quality-index-wrapper-h2 h2"
    );
    graphsheading.forEach((item) => {
      item.style.setProperty("text-align", "right");
    });

    const refresheddate = document.querySelectorAll(
      ".insight .last-refersh-color"
    );
    refresheddate.forEach((item) => {
      item.style.setProperty("text-align", "right");
    });

    const pollutantgridvalues = document.querySelectorAll(
      ".insight .grid-value"
    );
    pollutantgridvalues.forEach((item) => {
      item.style.setProperty("direction", "rtl");
    });

    const antgridvaluesmg3 = document.querySelectorAll(
      ".insight .grid-upper .mg-m3"
    );
    antgridvaluesmg3.forEach((item) => {
      item.style.setProperty("margin-right", "59px");
    });

    document
      .querySelector(".pollutants-legend-heading")
      .style.setProperty("direction", "rtl", "important");
    const graphNextButton = document.querySelectorAll(".fp-next");
    graphNextButton.forEach((item) => {
      item.classList.add("arabic-fp-next");
    });

    document
      .querySelector(".footer-2-sec")
      .style.setProperty("padding-left", "20px");

    document
      .querySelector(".pollutants-legend-heading")
      .style.setProperty("direction", "rtl", "important");
    $(".nearest-section .station-details .legend-value").addClass(
      "aqi-legend-value"
    );

    // $('.fp-next').classList.add('arabic-fp-next')

    // document.querySelectorAll('.good-label-graph').forEach((element) => { element.innerText = 'جيد'});
    // document.querySelectorAll('.moderate-label-graph').forEach((element) => {element.innerText = 'معتدل' });
    // document.querySelectorAll('.sensitive-label-graph').forEach((element) => {element.innerText = 'غير صحي للمجموعات الحساسة' });
    // document.querySelectorAll('.unhealthy-label-graph').forEach((element) => { element.innerText = 'غير صحي' });
    // document.querySelectorAll('.veryunhealthy-label-graph').forEach((element) => { element.innerText = 'غير صحي للغاية'});
    // document.querySelectorAll('.hazardous-label-graph').forEach((element) => { element.innerText = 'خطرة' });
    dropdownLists.forEach((dropdownList) => {
      // Inside each <ul>, get the dropdown items
      const dropdownItems = dropdownList.querySelectorAll(
        ".quality-index-dropItem"
      );

      dropdownItems.forEach((item, index) => {
        switch (index) {
          case 0:
            item.innerText = "كل ساعة"; // Hourly
            break;
          case 1:
            item.innerText = "يوميا"; // Daily
            break;
          case 2:
            item.innerText = "شهريا"; // Monthly
            break;
          case 3:
            item.innerText = "سنويا"; // Yearly
            break;
          case 4:
            item.innerText = " إنشاء مخصص"; //custom
            break;
        }
      });
    });
    const navMobileNew = document.querySelector(".navmobile-new");
    navMobileNew.style.left = "10px";
    navMobileNew.style.right = "auto";

    const blueHideIcons = document.querySelectorAll(".blue-hide");
    blueHideIcons.forEach((icon) => {
      icon.style.setProperty("left", "37px", "important");
      icon.style.setProperty("right", "auto", "important");
    });

    const playPauseButtons = document.querySelectorAll(".play-pause-btn");
    playPauseButtons.forEach((button) => {
      button.style.right = "10px";
      button.style.left = "auto";
    });

    const skipButton = document.querySelectorAll(".skip-btn");
    skipButton.forEach((button) => {
      button.style.right = "40px";
      button.style.left = "auto";
    });

    const audioButton = document.querySelectorAll(".audio-btn");
    audioButton.forEach((button) => {
      button.style.right = "80px";
      button.style.left = "auto";
    });

    const rightsidebar = document.querySelector(".sidebar");
    rightsidebar.style.setProperty("right", "auto", "important"); // Remove the right property with !important
    rightsidebar.style.setProperty("left", "0px", "important"); // Set the left property to 0px with !important
    // rightsidebar.style.setProperty("padding-right", "16px", "important");
    rightsidebar.style.setProperty("padding", "10px", "important");

    $(".text-right").addClass("text-left-arabic");
    const dropdownItems = document.querySelectorAll(".dropdown-item");
    dropdownItems.forEach((item) => {
      item.style.textAlign = "right";
    });

    const filterButtons = document.querySelectorAll(
      ".insight .graph-duration-filters .btn"
    );

    filterButtons.forEach((button) => {
      button.style.setProperty(
        "background-position",
        "left 6px center",
        "important"
      );
      button.style.setProperty("text-align", "right", "important");
    });

    const durationfilters = document.querySelectorAll(
      ".insight #aiq_line .row.pollutant-dropdown-show.graph-duration-filters"
    );
    durationfilters.forEach((item) => {
      item.style.setProperty("right", "auto");
      item.style.setProperty("left", "0");
    });

    const AirIndexFilter = document.querySelectorAll(
      ".insight .polutenat_bar .tab_shado .graph-duration-filters"
    );
    AirIndexFilter.forEach((item) => {
      item.style.setProperty("float", "left");
    });

    document.querySelector(".station-aqi-pill").style.padding = "0";

    document.querySelector(".navbar-brand.white img").src =
      "./images/ead-logo.png"; //  logo
    document.querySelector(".navbar-brand.black img").src =
      "./images/ead-logo-b.svg"; // black logo
    document.querySelector(".dropdown-menu .dropdown-item");
    prev.querySelector("svg").style.transform = "rotate(180deg)"; // Flip the previous arrow
    next.querySelector("svg").style.transform = "rotate(-180deg)";

    const event = new CustomEvent("languageChange", {
      detail: { language: currentLanguage },
    });
    document.dispatchEvent(event);
  }

  function updateToEnglish() {
    document.getElementById("mainPollutantName").style.textAlign = "left";
    $(".faq-section h4").removeClass("questions-heading-ipad");
    document.body.classList.remove("arabic-mode");
    let indexdes = localStorage.getItem("destinationIndex");

    if (indexdes == 3) {
      $(".fp-next").addClass("disabled").removeClass("animate-blinking");
      $(".fp-prev").removeClass("disabled").addClass("animate-blinking");
    } else if (indexdes == 1 || indexdes == 2) {
      $(".fp-prev").removeClass("disabled").removeClass("animate-blinking");
      $(".fp-next").removeClass("disabled").addClass("animate-blinking  ");
    } else {
      $(".fp-next").removeClass("disabled").addClass("animate-blinking");
      $(".fp-prev").addClass("disabled").removeClass("animate-blinking");
    }

    renderAccordionContent(accordionContent);
    loadCarousel(imageData);
    currentStatusClass = statusClass;
    $(".iconimg").removeClass("infoiconmobile");
    $(".icon-circle-xmark-regular").removeClass("cross-icon");
    $(".text-right").removeClass("text-left-arabic");
    $(".accordion-button").removeClass("rtl-accordion");
    $(".accordion-button").removeClass("accordion-align-content");
    $(".faqscrolling").removeClass("rtl-faqscrolling");
    $inputElements.removeClass("rtl-stationsData");
    // $('.insight .date-box .cal-div input').css('padding-left', '10px');
    $(".contact-info-content").removeClass("contact-info-data");
    if (window.matchMedia("(max-width: 767px)").matches) {
      $(".insight .search-box .p-input span").css({
        right: "15px",
        left: "auto",
      });
    } else if (window.matchMedia("(min-width: 768px)").matches) {
      $(".insight .search-box .p-input span").css({
        right: "15px",
        left: "auto",
      });
    }
    // $('#sidebar-btn').removeClass('expand-panel-arabic');
    //   document.querySelectorAll('.insight #sidebar.visible #sidebar-btn').forEach((element) => {
    //     element.classList.remove('expand-panel-arabic');
    // });

    $(".insight .sorttoggle button.btn-close").removeClass("sort-toggle");
    $(".insight #sidebar-btn").removeClass("ipad-expand-panel");
    $(".insight .silde-dv").removeClass("slide-dv-position");
    $("#fp-nav").removeClass("fp-left");
    $("#fp-nav").addClass("fp-right");
    $(".fp-prev").removeClass("fa-move-next-arrow");
    //   document.querySelectorAll('.fp-prev').forEach(element => {
    //     element.classList.remove('arabic-animate-blinking');
    // });
    document.querySelectorAll(".fp-prev, .fp-next").forEach((element) => {
      element.classList.remove("arabic-animate");
    });

    $(".insight ul.dropdown-menu.sorttoggle.show").removeClass("left-zero");
    $(".monitoring-heading").removeClass("arabic-monitoring-heading");
    $(".footer-our-airquality").removeClass("footer-our-airquality-alignment");
    $(".footer-change-col").removeClass("col-xl-2").addClass("col-xl-3");
    $(".dropdown-menu.sorttoggle").addClass("showText");
    $(".responsive-align").addClass("pad_r");
    $(".fp-next").removeClass("animation-next-buttons");
    $(".switch1 > span.on").removeClass("arabic-switch1");
    $(".footer-logo").removeClass("footer-logo-arabic");
    $(".footer-social-icons").removeClass("social-media-icons");
    $(".copy-right-para").removeClass("copy-right-para-footer");
    // $(".Newsearch-box ul").css("left", "2px");
    if (window.matchMedia("(max-width: 767px)").matches) {
      $(".Newsearch-box ul").css("left", "35px");
    } else {
      $(".Newsearch-box ul").css("left", "2px");
    }
    $(".reset-button").css({ left: "", right: "10px" });
    $(".copy-right-contents").removeClass("copy-right-contents-footer");
    $(".contact-us-alignment").removeClass("contact-us-alignment-style");
    $(".next-btn-arb").removeClass("next-btn-arb-alignment");
    $(".air-quality-pill").removeClass("air-quality-btn");
    $(".prev-btn").removeClass("previous-btn");
    $(".next-btn").removeClass("next-button");
    $(".sidebar-nav").removeClass("sidebar-nav-arabic");
    $("#page-content-wrapper").removeClass("page-content-wrapper-arabic");
    $(".main-box").removeClass("main-box-arabic");
    $(".tab_shado").removeClass("main-box-arabic-box");
    $(".insight .ug_content ").removeClass("ug_content-arabic");
    $(".nearest-section .station-details .legend-value").removeClass(
      "aqi-legend-value"
    );
    $("#language-toggle1").removeClass("btn-name-english");
    $(".insight ul.nav.twobar-tabs").removeClass("graph-tabs-arabic");
    $(
      ".contact-section .contact-info-item .contact-info-content a"
    ).removeClass("footer-content");
    $(".insight .chart-f-content p").removeClass("aqi-content-arabic");
    $(".station-aqi-trends-disclaimers").removeClass(
      "station-aqi-desclimer-mobile"
    );
    $(".exceeded-box .contact-content p ").removeClass(
      "hours-exceedance-disclaimer-mobile"
    );
    $(".insight .main-box").removeClass("insightbox-tabmini");
    $(".equal-station-box-height").removeClass("pollutant-graph-ipad");
    $(".insight .polutenat_bar .tab_shado .graph-duration-filters").addClass(
      "filter-arabic"
    );

    $(".circular-width").removeClass("circular-width-arabic");
    // document.querySelector('.cal-div').style.direction='ltr';
    const calenderarabic = document.querySelectorAll(".cal-div");
    calenderarabic.forEach((item) => {
      item.style.setProperty("direction", "ltr");
    });
    //   document.querySelectorAll('.insight .silde-dv').forEach(item => {
    //     item.style.removeProperty('margin', '1rem', 'important');

    // });

    if (window.matchMedia("(max-width: 767px)").matches) {
      document.querySelectorAll(".insight .silde-dv").forEach((item) => {
        item.style.removeProperty("margin", "1rem", "important");
      });
    }

    const multivaluetab = document.querySelectorAll(".mult-value-tab");
    multivaluetab.forEach((item) => {
      item.style.setProperty("right", "", "important");
      item.style.setProperty("left", "", "important");
    });
    $(".form-direction").css({
      "text-align": "left",
      direction: "ltr",
    });

    const filterButtons = document.querySelectorAll(
      ".insight .graph-duration-filters .btn"
    );
    document
      .querySelector(".footer-2-sec")
      .style.removeProperty("padding-left");

    const stationnamearabic = document.querySelectorAll(".insightStation h3");
    stationnamearabic.forEach((item) => {
      item.style.removeProperty("padding", "0 40px");
    });

    // Apply Arabic styles dynamically
    filterButtons.forEach((button) => {
      button.style.setProperty(
        "background-position",
        "right 6px center",
        "important"
      ); // Move background image to the left
      button.style.setProperty("text-align", "left", "important"); // Align text to the right
    });

    // document.getElementById('language-toggle1-btn').innerHTML ='English';
    closeSidebar();
    getAirQualitySafetyLevel();
    questionHeader.textContent = "Your Questions, Answered.";
    questionHeaderAlt.innerHTML = "Your Questions, <br> Answered.";
    monitoringHeading.innerText = "Our Air Quality Monitoring Initiatives";
    initiativeHeadingContentLg.innerHTML =
      "Join us in the our mission for cleaner skies and healthier communities. <br> Become a guardian of our atmosphere and safeguard our future.";
    initiativeHeadingContentSm.innerText =
      "Join us in the our mission for cleaner skies and healthier communities. <br> Become a guardian of our atmosphere and safeguard our future.";
    navLinkAirQuality.innerText = "Air Quality";
    document.addEventListener("DOMContentLoaded", function () {
      document.querySelector(".thankyou-submit-msg").innerText =
        "Thank you for reaching out!";
    });
    document.addEventListener("DOMContentLoaded", function () {
      document.querySelector(".getback-msg").innerText =
        "Your message has been received. We'll get back to you shortly.";
    });

    document.querySelectorAll(".date-time").forEach((element) => {
      element.innerText = "Date & Time :";
    });
    document.querySelector(".nearest-heading").innerHTML =
      "Nearest Station: Khalifa City";
    document.querySelector("#message").style.textAlign = "left";
    document.querySelector(".welcome-text").innerText = "WELCOME TO";
    document.querySelector(".quotes").innerText = "Air Quality Monitoring";
    document.querySelector(".emirates-text").innerText = "In Abu Dhabi";
    document.querySelector(".copy-right-para").innerText =
      "© Abu Dhabi All Rights Reserved 2024";
    document.querySelector("#AQI-mb-0").innerText = "AQI";
    document.querySelector("#AQI-mb-1").innerText = "AQI";
    document.querySelectorAll(".AQI-mb-2").forEach((element) => {
      element.textContent = "AQI";
    });

    document
      .querySelectorAll(".datepicker")
      .forEach((element) => (element.placeholder = "Custom"));
    document.getElementById("searchInput").placeholder = "Search Station";
    document.getElementById("stationsDropdownMapSearch").placeholder =
      "Search Station";
    document.querySelectorAll(".windSpeedHeading").forEach((element) => {
      element.textContent = "Wind Speed";
    });
    document.querySelectorAll(".windDirectionHeading").forEach((element) => {
      element.textContent = "Wind Direction";
    });
    document.querySelectorAll(".humidityHeading").forEach((element) => {
      element.textContent = "Humidity";
    });
    document.querySelectorAll(".temperatureHeading").forEach((element) => {
      element.textContent = "Temperature";
    });
    document.querySelector(".sort-label").textContent = "Sort";
    document.querySelector(".nearest-label").textContent = "Nearest Station";
    document.querySelector(".aqi-label").textContent = "AQI Ranking";
    document.querySelector(".order-label").textContent = "Alphabetical Order";
    document.querySelector(".map-disclaimer-content").innerText =
      " Our real-time data, while continuously updated, is subject to ongoing validation, and therefore may not be entirely accurate.";
    document.querySelector(".sm-map-disclaimer").innerText =
      "Our real-time data, while continuously updated, is subject to ongoing validation, and therefore may not be entirely accurate.";
    document.querySelector(".map-disclaimer-air").innerText =
      "Air Quality Index";
    document.querySelector(".insight-btn").innerText = "More Insights";
    document.querySelector(".insight-btn-tab").innerText = "More Insights";

    contactHead.textContent = "Contact Us";
    heading.textContent = "Let us know what’s on your mind";
    cnctAddress.innerHTML =
      "Headquarters Al Mamoura, Building A, Building 62,<br /> Al Mamoura St, Al Nayhan, Abu Dhabi, United Arab<br /> Emirates, Postal Code: 22221, P.O Box: 4553";
    cnctAddressmobile.innerText =
      "Headquarters Al Mamoura, Building A, Building 62,Al Mamoura St, Al Nayhan, Abu Dhabi, United Arab Emirates, Postal Code: 22221, P.O Box: 4553";
    agenda.textContent =
      "Established in 1996, the Environment Agency – Abu Dhabi (EAD) is committed to protecting and enhancing air quality, groundwater as well as the biodiversity of our desert and marine ecosystem. By partnering with other government entities, the private sector, NGOs, and global environmental agencies, we embrace international best practice, innovation, and hard work to institute effective policy measures. We seek to raise environmental awareness, facilitate sustainable development, and ensure environmental issues remain one of the top priorities of our national agenda.";
    agendamobile.textContent =
      "Established in 1996, the Environment Agency – Abu Dhabi (EAD) is committed to protecting and enhancing air quality, groundwater as well as the biodiversity of our desert and marine ecosystem. By partnering with other government entities, the private sector, NGOs, and global environmental agencies, we embrace international best practice, innovation, and hard work to institute effective policy measures. We seek to raise environmental awareness, facilitate sustainable development, and ensure environmental issues remain one of the top priorities of our national agenda.";
    nameLabel.textContent = "Your Name";
    emailLabel.textContent = "Email";
    phoneLabel.textContent = "Phone";
    submitBtn.textContent = "Submit";
    Message.placeholder = "Message";
    prev.querySelector("svg").style.transform = "rotate(360deg)"; // Flip the previous arrow
    next.querySelector("svg").style.transform = "rotate(0)";
    document
      .getElementById("headerSearchInput")
      .setAttribute("placeholder", "Search");
    document.querySelector(".search-result p").innerText = "Search Results";
    document.querySelector(".newcutom-btn").innerText = "Close";
    document.querySelector(
      "header .search-block .search-collapse .card-body .container-fluid .close"
    ).style.float = "right";
    document.querySelector(
      "header .search-block .search-collapse .search-result"
    ).style.paddingLeft = "50px";
    document.querySelector(".paratab").innerText =
      "When the air quality index (AQI) hits orange, red, purple, or maroon levels, it's essential to take proactive measures to safeguard your well-being. Follow these guidelines to minimize the impact of elevated air pollution levels on your health.";
    // document.querySelector('.mask-usage').innerText = 'Mask Usage';
    document.addEventListener("DOMContentLoaded", function () {
      document.querySelector(".mask-usage").innerText = "Mask Usage";
    });
    iaqmElement && (iaqmElement.innerText = "Indoor Air Quality Maintenance");
    switchingElement &&
      (switchingElement.innerText = "Switching on your Air Purifier");
    document.getElementById("maskusage-model") &&
      (document.getElementById("maskusage-model").innerText = "Mask Usage");
    // document.querySelectorAll('.good-label-graph').forEach((element) => { element.innerText = 'Good'});
    // document.querySelectorAll('.moderate-label-graph').forEach((element) => {element.innerText = 'Moderate' });
    // document.querySelectorAll('.sensitive-label-graph').forEach((element) => {element.innerText = 'Unhealthy for Sensitive Groups' });
    // document.querySelectorAll('.unhealthy-label-graph').forEach((element) => { element.innerText = 'Unhealthy' });
    // document.querySelectorAll('.veryunhealthy-label-graph').forEach((element) => { element.innerText = 'Very Unhealthy'});
    // document.querySelectorAll('.hazardous-label-graph').forEach((element) => { element.innerText = 'Hazardous' });
    document.querySelector(".good-label-graph").innerText = "Good";
    document.querySelector(".quality-index-wrapper-h2 .levelmb25").innerText =
      "AIR QUALITY SAFETY LEVEL";
    // document.querySelector('.pollutant-graph-title').innerText = 'POLLUTANT TRENDS';
    document.querySelectorAll(".pollutant-graph-title").forEach((element) => {
      element.innerText = "POLLUTANT TRENDS";
    });
    document.getElementById("health-recommendations").innerText =
      "HEALTH RECOMMENDATIONS";
    document.querySelector(".main-contributing-pollutant").innerText =
      "Main Contributing Pollutant";
    document.querySelector(".Causes-wrapper h3").innerText = "Possible Causes";
    //25-10
    // document.getElementById('enjoy-some-indoor-fun').innerText = 'Enjoy Some Indoor Fun';
    document.addEventListener("DOMContentLoaded", function () {
      document.getElementById("enjoy-some-indoor-fun").innerText =
        "Enjoy Some Indoor Fun";
    });
    // ----->mark1
    // document.querySelector('.imagetext1').innerText = 'Being indoors is the best option';
    document.addEventListener("DOMContentLoaded", function () {
      document.querySelector(".imagetext1").innerText =
        "Being indoors is the best option";
    });

    // document.querySelector('.imagetext2').innerText = 'Being indoors is the best option';
    document.addEventListener("DOMContentLoaded", function () {
      document.querySelector(".imagetext2").innerText =
        "Being indoors is the best option";
    });
    // document.querySelector('.imagetext3').innerText = 'Being indoors is the best option';
    document.addEventListener("DOMContentLoaded", function () {
      document.querySelector(".imagetext3").innerText =
        "Being indoors is the best option";
    });
    // document.querySelector('.imagetext1').innerText = 'Being indoors is the best option';
    // document.querySelector('.imagetext2').innerText = 'Being indoors is the best option';
    // document.querySelector('.imagetext3').innerText = 'Being indoors is the best option';
    document.getElementById("air-quality-index").innerText =
      "AIR QUALITY INDEX";
    document.querySelector(
      ".refreshed-time-aqip"
    ).innerHTML = `<b class="refreshed-time-aqi">Last refreshed :</b> <span id="aqilastrefreshtime"></span>`;
    document.querySelector(
      ".refreshed-time-pm10-para"
    ).innerHTML = `<b class="refreshed-time-pm10">Last refreshed :</b> <span id="pm10lastrefreshtime"></span>`;
    document.querySelector(
      ".refreshed-time-pm25-para"
    ).innerHTML = `<b class="refreshed-time-pm25">Last refreshed :</b> <span id="pm25lastrefreshtime"></span>`;
    document.querySelector(
      ".refreshed-time-s02-para"
    ).innerHTML = `<b class="refreshed-time-s02">Last refreshed :</b> <span id="so2lastrefreshtime"></span>`;
    document.querySelector(
      ".refreshed-time-co-para"
    ).innerHTML = `<b class="refreshed-time-co">Last refreshed :</b> <span id="colastrefreshtime"></span>`;
    document.querySelector(
      ".refreshed-time-03-para"
    ).innerHTML = `<b class="refreshed-time-03">Last refreshed :</b> <span id="o3lastrefreshtime"></span>`;
    document.querySelector(
      ".refreshed-time-no2-para"
    ).innerHTML = `<b class="refreshed-time-no2">Last refreshed :</b> <span id="no2lastrefreshtime"></span>`;
    document.querySelector(
      ".refreshed-time-staqi-para"
    ).innerHTML = `<b class="refreshed-time-staqi">Last refreshed :</b> <span id="StAQIlastrefreshtime"></span>`;
    // document.getElementById('barChartFilter').innerText='Hourly';
    // -------23/10/2024---------
    document.getElementById("pills-aqi_lin-tab").innerText = "AQI";
    document.getElementById("pills-profile-tab").innerHTML = "Pollutant";
    document.querySelector(".activity_heading").innerText = "Activities";
    // document.getElementById('sand-storm').innerText='Sand Storm';
    document.addEventListener("DOMContentLoaded", function () {
      document.getElementById("sand-storm").innerText = "Sand Storm";
    });
    // document.querySelector('.high-traffic').innerText='High Traffic';
    document.addEventListener("DOMContentLoaded", function () {
      document.querySelector(".high-traffic").innerText = "High Traffic";
    });
    // document.querySelector('.indor-aq-maintenance').innerText='Indoor Air Quality Maintenance';
    document.addEventListener("DOMContentLoaded", function () {
      document.querySelector(".indor-aq-maintenance").innerText =
        "Indoor Air Quality Maintenance";
    });
    // document.querySelector('.switch-on-air-purifier').innerText='Switching on your Air Purifier ';
    document.addEventListener("DOMContentLoaded", function () {
      document.querySelector(".switch-on-air-purifier").innerText =
        "Switching on your Air Purifier ";
    });
    document.querySelectorAll(".measure-pollut").forEach((element) => {
      element.innerText = "Measured pollutants";
    });
    //  document.querySelector('.material-symbols-outlined').innerText='Close';
    document
      .querySelectorAll(".hours-exceedance-peryear-desclimer")
      .forEach((element) => {
        element.innerText = `Take a swift look at Abu Dhabi City's yearly air quality chart. It shows the number of hours each pollutant was above safe levels. Stay informed on Air quality trends, effortlessly.`;
      });
    document
      .querySelectorAll(".our-air-analytics-desclimer")
      .forEach((element) => {
        element.innerText = `Track Abu Dhabi City's air quality throughout the year with our radar chart. Each colored segment illustrates the frequency of different air conditions, spanning from 'Good' to 'Hazardous'.`;
      });
    document.querySelector(".changeHeading-pollutant").innerText =
      "Station AQI TRENDS";
    $(".select-pils").on("click", function () {
      var tabText = $(".select-pils.active").text().trim();
      if (tabText === "AQI" || tabText === "مؤشر جودة الهواء") {
        document.querySelector(".changeHeading-pollutant").innerText =
          "Station AQI TRENDS";
      } else if (tabText === "Pollutant" || tabText === "الملوثات") {
        document.querySelector(".changeHeading-pollutant").innerText =
          "STATION POLLUTANT TRENDS";
      }
    });

    const responsiveCross = document.querySelector(".responsive-cross");
    responsiveCross.classList.remove("responsive-cross-css");
    responsiveCross.classList.add("responsive-cross-css-english");

    const modalBackgroundImg = document.querySelector(".modal-background img");
    modalBackgroundImg.classList.remove("modal-padding");
    modalBackgroundImg.classList.add("modal-padding-english");

    const projectModalItemContent = document.querySelector(
      ".projectItemContent"
    );
    projectModalItemContent.classList.remove("modal-padding");
    projectModalItemContent.classList.add("modal-padding-english");

    const projectModalItemDescription = document.querySelector(
      ".projectItemDescription"
    );
    projectModalItemDescription.classList.remove("modal-padding");
    projectModalItemDescription.classList.add("modal-padding-english");

    // $('.modal-background img').removeClass('modal-padding');
    // $('.projectItemContent').removeClass('modal-padding');
    // $('.projectItemDescription').removeClass('modal-padding');
    $(".sidebar button").removeClass("close-modal-button");
    document.querySelector(
      ".hours-exceed-heading"
    ).innerHTML = `<h2 class="mb-0 exceed-height tab-top-pd40 tabexceed-pb0">NUMBER OF HOURS<br>EXCEEDANCE PER YEAR</h2>`;
    document.querySelector(
      ".contact-content-mobile"
    ).innerText = `Take a swift look at Abu Dhabi City's yearly air quality chart. It shows the number of hours each pollutant was above safe levels. Stay informed on Air quality trends, effortlessly.`;
    document.querySelector(
      ".air-analytics-mobile"
    ).innerText = `Track Abu Dhabi City's air quality throughout the year with our radar chart. Each colored segment illustrates the frequency of different air conditions, spanning from 'Good' to 'Hazardous'.`;
    document.querySelector(".station-aqi-trends-disclaimers").innerText =
      "Stay informed about air quality in Abu Dhabi with a quick overview: easily comprehensible graphs track AQI and pollutant levels over time, presenting air safety conditions from good to hazardous.";
    document.querySelector(".Expand-Panel-mobile").innerText = "Expand Panel";

    document.querySelector(".Expand-Panel-tab").innerText = "Expand Panel";
    const rightsidebar = document.querySelector(".sidebar");
    rightsidebar.style.setProperty("right", "0", "important"); // Remove the right property with !important
    rightsidebar.style.setProperty("left", "auto", "important");
    airQualityAssessments.forEach((element) => {
      element.innerText =
        "Efficiently assess air quality with our color-coded bars, ranging from 'Good' to 'Hazardous', delivering hourly, daily, monthly, and yearly updates.";
    });
    const dropdownItems = document.querySelectorAll(".dropdown-item");
    dropdownItems.forEach((item) => {
      item.style.textAlign = "left";
    });

    const durationfilters = document.querySelectorAll(
      ".insight #aiq_line .row.pollutant-dropdown-show.graph-duration-filters"
    );
    durationfilters.forEach((item) => {
      item.style.setProperty("left", "auto");
      item.style.setProperty("right", "0");
    });

    const AirIndexFilter = document.querySelectorAll(
      ".insight .polutenat_bar .tab_shado .graph-duration-filters"
    );
    AirIndexFilter.forEach((item) => {
      item.style.setProperty("float", "");
    });

    const iicon = document.querySelectorAll(
      ".insight .pollutant-toggleBar .iconimg"
    );
    iicon.forEach((item) => {
      item.style.setProperty("left", "auto");
      item.style.setProperty("right", "7px", "important");
      item.style.setProperty("margin-left", "auto");
      item.style.setProperty("margin-right", "20px");
    });
    const pollutantinfoIcon = document.querySelectorAll(
      ".pollutant-toggleBar .pollu-top-position"
    );
    pollutantinfoIcon.forEach((item) => {
      item.style.setProperty("right", "0", "important");
      item.style.setProperty("left", "auto", "important");
    });

    const infocontent = document.querySelectorAll(
      ".pollutant-toggleBar .info-popup, .pollutant-toggleBar .info-topPosition, .pollutant-toggleBar .info-topPosition1 "
    );
    infocontent.forEach((item) => {
      item.style.setProperty("left", "auto", "important");
      item.style.setProperty("right", "0", "important");
    });

    $(".insight .slide-content ul .modal.fade button.btn-close").removeClass(
      "health-cross-icon"
    );

    const infocontentAlign = document.querySelectorAll(".ps-0");
    infocontentAlign.forEach((item) => {
      item.classList.remove("pollutant-align-right");
    });

    const stationiicon = document.querySelectorAll(
      ".insight .pollutant-toggleBar .ic-top-position"
    );
    stationiicon.forEach((item) => {
      item.style.setProperty("left", "auto", "important");
      item.style.setProperty("right", "0", "important");
    });
    const iinfo = document.querySelectorAll(".bar-section-info");
    iinfo.forEach((item) => {
      item.style.setProperty("text-align", "left"); // Correct property and value
    });

    $(".fp-prev").removeClass("direction-arabic");
    const stationNameinsights = document.querySelectorAll(".insightStation h3");
    stationNameinsights.forEach((item) => {
      item.style.setProperty("text-align", "left");
    });
    const graphsheading = document.querySelectorAll(
      ".insight .quality-index-wrapper-h2 h2"
    );
    graphsheading.forEach((item) => {
      item.style.setProperty("text-align", "left");
    });

    const refresheddate = document.querySelectorAll(
      ".insight .last-refersh-color"
    );
    refresheddate.forEach((item) => {
      item.style.setProperty("text-align", "left");
    });
    const pollutantgridvalues = document.querySelectorAll(
      ".insight .grid-value"
    );
    pollutantgridvalues.forEach((item) => {
      item.style.setProperty("direction", "ltr");
    });
    const antgridvaluesmg3 = document.querySelectorAll(
      ".insight .grid-upper .mg-m3"
    );
    antgridvaluesmg3.forEach((item) => {
      item.style.setProperty("margin-right", "");
    });
    document
      .querySelector(".pollutants-legend-heading")
      .style.setProperty("direction", "ltr", "important");

    const graphNextButton = document.querySelectorAll(".fp-next");
    graphNextButton.forEach((item) => {
      item.classList.remove("arabic-fp-next");
    });

    $(".fp-next").removeClass("arabic-fp-next");

    document.querySelector(".station-aqi-pill").style.padding = "0";

    dropdownLists.forEach((dropdownList) => {
      // Inside each <ul>, get the dropdown items
      const dropdownItems = dropdownList.querySelectorAll(
        ".quality-index-dropItem"
      );

      dropdownItems.forEach((item, index) => {
        switch (index) {
          case 0:
            item.innerText = "Hourly"; // Hourly
            break;
          case 1:
            item.innerText = "Daily"; // Daily
            break;
          case 2:
            item.innerText = "Monthly"; // Monthly
            break;
          case 3:
            item.innerText = "Yearly"; // Yearly
            break;
          case 4:
            item.innerText = "Custom";
            break;
        }
      });
    });
    const navMobileNew = document.querySelector(".navmobile-new");
    navMobileNew.style.right = "10px";
    navMobileNew.style.left = "auto";
    // navMobileNew.style.marginRight = '10px';

    const blueHideIcons = document.querySelectorAll(".blue-hide");
    blueHideIcons.forEach((icon) => {
      icon.style.setProperty("left", "auto", "important");
      icon.style.setProperty("right", "10px", "important");
    });

    const skipButton = document.querySelectorAll(".skip-btn");
    skipButton.forEach((button) => {
      button.style.right = "";
      button.style.left = "";
    });

    const audioButton = document.querySelectorAll(".audio-btn");
    audioButton.forEach((button) => {
      button.style.right = "";
      button.style.left = "";
    });

    const playPauseButtons = document.querySelectorAll(".play-pause-btn");
    playPauseButtons.forEach((button) => {
      button.style.right = "";
      button.style.left = "";
    });
    document.querySelector(".navbar-brand.white img").src =
      "./images/ead-logo.png"; //  logo
    document.querySelector(".navbar-brand.black img").src =
      "./images/ead-logo-b.svg"; //  black logo
    document.querySelector(".dropdown-menu .dropdown-item");
    $(".footer-insights-alignment").addClass("col-xl-3");
    $(".footer-insights-alignment").removeClass("col-xl-4");
    const event = new CustomEvent("languageChange", {
      detail: { language: currentLanguage },
    });
    document.dispatchEvent(event);
  }

  function updateAqitoArabic() {
    document
      .querySelectorAll(
        ".good-label-graph, .moderate-label-graph, .sensitive-label-graph, .unhealthy-label-graph, .veryunhealthy-label-graph, .hazardous-label-graph"
      )
      .forEach((item) => {
        switch (item.textContent.trim()) {
          case "Good":
            item.textContent = "جيد";
            break;
          case "Moderate":
            item.textContent = "معتدل";
            break;
          case "Unhealthy for Sensitive Groups":
          case "Unhealthy for sensitive groups": // Handle both cases
            item.textContent = "غير صحي للمجموعات الحساسة";
            break;
          case "Unhealthy":
            item.textContent = "غير صحي";
            break;
          case "Very Unhealthy":
            item.textContent = "غير صحي للغاية";
            break;
          case "Hazardous":
            item.textContent = "خطرة";
            break;
        }
      });
  }

  function updateAqitoEnglish() {
    document
      .querySelectorAll(
        ".good-label-graph, .moderate-label-graph, .sensitive-label-graph, .unhealthy-label-graph, .veryunhealthy-label-graph, .hazardous-label-graph"
      )
      .forEach((item) => {
        switch (item.textContent.trim()) {
          case "جيد":
            item.textContent = "Good";
            break;
          case "معتدل":
            item.textContent = "Moderate";
            break;
          case "غير صحي للمجموعات الحساسة":
            item.textContent = "Unhealthy for sensitive groups";
            break;
          case "غير صحي":
            item.textContent = "Unhealthy";
            break;
          case "غير صحي للغاية":
            item.textContent = "Very Unhealthy";
            break;
          case "خطرة":
            item.textContent = "Hazardous";
            break;
        }
      });
  }

  function updateFooterLinksToArabic() {
    document
      .querySelectorAll(
        "footer h6, footer a, .dropdown button, .dropdown-menu .dropdown-item, .air-analytics-heading h2,#barChartFilter"
      )
      .forEach((link) => {
        switch (link.textContent.trim()) {
          case "Our Air Quality":
            link.textContent = "جودة الهواء";
            break;
          case "Insights":
            link.innerHTML =
              'رؤيتنا <img src="./images/new-images/drop-arrow.png" class="ms-2 hide-large-img-footer" alt="Dropdown Arrow">';
            break;
          case "Projects":
            link.textContent = "المشاريع";
            break;
          case "FAQ":
            link.textContent = "الأسئلة الشائعة";
            break;
          case "Contact Us":
            link.innerHTML =
              'تواصل معنا <img src="./images/new-images/drop-arrow.png " class="ms-2 hide-large-img-footer" alt="Dropdown Arrow">';
            break;
          case "Privacy Policy":
            link.textContent = "سياسة الخصوصية";
            break;
          case "Terms of Use":
            link.textContent = "شروط الاستخدام";
            break;
          case "Copyrights":
            link.textContent = "حقوق النشر";
            break;
          case "Health Recommendation":
            link.textContent = "التوصيات الصحية";
            break;
          case "AQI and Pollutant Trends":
            link.textContent = "مؤشر جودة الهواء (AQI) واتجاهات الملوثات";
            break;
          case "Our Air Analytics":
            link.textContent = "تحليلنا لجودة الهواء";
            break;
          case "Station AQI and Pollutants Trends":
            link.textContent = "محطة AQI واتجاهات الملوثات";
            break;
          case "Hourly":
            link.textContent = "كل ساعة";
            break;
        }
      });
  }

  function updateFooterLinksToEnglish() {
    document
      .querySelectorAll(
        "footer h6, footer a, .dropdown button, .dropdown-menu .dropdown-item, .air-analytics-heading h2,#barChartFilter"
      )
      .forEach((link) => {
        switch (link.textContent.trim()) {
          case "جودة الهواء":
            link.textContent = "Our Air Quality";
            break;
          case "رؤيتنا":
            link.innerHTML =
              'Insights <img src="./images/new-images/drop-arrow.png" class="ms-2 hide-large-img-footer" alt="Dropdown Arrow">';
            break;
          case "المشاريع":
            link.textContent = "Projects";
            break;
          case "الأسئلة الشائعة":
            link.textContent = "FAQ";
            break;
          case "تواصل معنا":
            link.innerHTML =
              'Contact Us <img src="./images/new-images/drop-arrow.png" class="ms-2 hide-large-img-footer" alt="Dropdown Arrow">';
            break;
          case "سياسة الخصوصية":
            link.textContent = "Privacy Policy";
            break;
          case "شروط الاستخدام":
            link.textContent = "Terms of Use";
            break;
          case "حقوق النشر":
            link.textContent = "Copyrights";
            break;
          case "التوصيات الصحية":
            link.textContent = "Health Recommendation";
            break;

          case "مؤشر جودة الهواء (AQI) واتجاهات الملوثات":
            link.textContent = "AQI and Pollutant Trends";
            break;

          case "تحليلنا لجودة الهواء":
            link.textContent = "Our Air Analytics";
            break;

          case "محطة AQI واتجاهات الملوثات":
            link.textContent = "Station AQI and Pollutants Trends";
            break;
          case "كل ساعة":
            link.textContent = "Hourly";
            break;
        }
      });
  }

  function updateNavLinksToArabic() {
    document.querySelectorAll(".nav-link").forEach((link) => {
      switch (link.textContent.trim()) {
        case "Our Air Quality":
          link.textContent = "جودة الهواء";
          break;
        case "Insights":
          link.textContent = "رؤيتنا";
          break;
        case "Projects":
          link.textContent = "المشاريع";
          break;
        case "FAQ":
          link.textContent = "الأسئلة الشائعة";
          break;
        case "Contact Us":
          link.textContent = "تواصل معنا";
          break;
        case "LANGUAGE":
          link.textContent = "لغة";
      }
    });
    // addArabicLinkActiveClass();
  }

  function updateNavLinksToEnglish() {
    document.querySelectorAll(".nav-link").forEach((link) => {
      switch (link.textContent.trim()) {
        case "جودة الهواء":
          link.textContent = "Our Air Quality";
          break;
        case "رؤيتنا":
          link.textContent = "Insights";
          break;
        case "المشاريع":
          link.textContent = "Projects";
          break;
        case "الأسئلة الشائعة":
          link.textContent = "FAQ";
          break;
        case "تواصل معنا":
          link.textContent = "Contact Us";
          break;
        case "لغة":
          link.textContent = "LANGUAGE";
      }
    });

    // document
    //   .querySelectorAll(".nav-item")
    //   .forEach((link) => link.classList.remove("active-arabic"));
  }
});

// function addArabicLinkActiveClass() {
//   document.querySelectorAll(".nav-item").forEach((link) => {
//     link.addEventListener("click", function () {
//       // Remove active class from other links
//       document
//         .querySelectorAll(".nav-item")
//         .forEach((item) => item.classList.remove("active-arabic"));
//       // Add active class to the clicked link
//       if (currentLanguage === "arabic") {
//         link.classList.add("active-arabic");
//       }
//     });
//   });
// }
