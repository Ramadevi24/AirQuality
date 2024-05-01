const baseUrl = "https://adairqualityapi.ead.ae/";
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
var hasAccessToLocation = false;

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
    Noise: "Noise"
}

const causeStationData = {
    'Hamdan Street': {
        'PM10': [
            { 'cause': 'Urban Traffic', 'image': 'urban_traffic.png' },
            { 'cause': 'Natural sources', 'image': 'natural_sources.png' }
        ],
        'NO2': [
            { 'cause': 'Urban Traffic', 'image': 'urban_traffic.png' }
        ],
        'SO2': [
            { 'cause': 'Urban Traffic', 'image': 'urban_traffic.png' }
        ],
        'CO': [
            { 'cause': 'Urban Traffic', 'image': 'urban_traffic.png' }
        ]
    },
    'Khadejah School': {
        'PM10': [
            { 'cause': 'Commercial Establishments', 'image': 'urban_traffic.png' },
            { 'cause': 'Transportation', 'image': 'traffic.png' },
            { 'cause': 'Natural sources', 'image': 'natural_sources.png' }
        ],
        'NO2': [
            { 'cause': 'Urban Traffic', 'image': 'urban_traffic.png' }
        ],
        'SO2': [
            { 'cause': 'Urban Traffic', 'image': 'urban_traffic.png' }
        ],
        'CO': [
            { 'cause': 'Secondary Pollutant', 'image': 'urban_traffic.png' }
        ]
    },
    'Al Ain Street': {
        'PM10': [
            { 'cause': 'Urban Traffic', 'image': 'urban_traffic.png' },
            { 'cause': 'Natural sources', 'image': 'natural_sources.png' }
        ],
        'NO2': [
            { 'cause': 'Urban Traffic', 'image': 'urban_traffic.png' }
        ],
        'SO2': [
            { 'cause': 'Urban Traffic', 'image': 'urban_traffic.png' }
        ],
        'CO': [
            { 'cause': 'Secondary Pollutant', 'image': 'urban_traffic.png' }
        ]
    },
    'Khalifa School': {
        'PM10': [
            { 'cause': 'Transportation', 'image': 'traffic.png' },
            { 'cause': 'Construction activities', 'image': 'construction_activities.png' },
            { 'cause': 'Natural sources', 'image': 'natural_sources.png' }
        ],
        'NO2': [
            { 'cause': 'Transportation', 'image': 'traffic.png' }
        ],
        'SO2': [
            { 'cause': 'Transportation', 'image': 'traffic.png' }
        ],
        'CO': [
            { 'cause': 'Secondary Pollutant', 'image': 'secondary_pollutant.png' }
        ]
    },
    'Mussafah': {
        'PM10': [
            { 'cause': 'Industrial Traffic', 'image': 'industrial_traffic.png' },
            { 'cause': 'Natural sources', 'image': 'natural_sources.png' }
        ],
        'NO2': [
            { 'cause': 'Industrial Traffic', 'image': 'industrial_traffic.png' },
            { 'cause': 'Industrial Emissions', 'image': 'industrial_emission.png' }
        ],
        'SO2': [
            { 'cause': 'Industrial Emissions', 'image': 'industrial_emission.png' }
        ]
    },
    'Baniyas School': {
        'PM10': [
            { 'cause': 'Transportation', 'image': 'traffic.png' },
            { 'cause': 'Natural sources', 'image': 'natural_sources.png' }
        ],
        'NO2': [
            { 'cause': 'Transportation', 'image': 'traffic.png' }
        ],
        'SO2': [
            { 'cause': 'Transportation', 'image': 'traffic.png' }
        ],
        'O3': [
            { 'cause': 'Secondary Pollutant', 'image': 'secondary_pollutant.png' }
        ]
    },
    'Al Maqta': {
        'PM10': [
            { 'cause': 'Transportation', 'image': 'traffic.png' },
            { 'cause': 'Natural sources', 'image': 'natural_sources.png' }
        ],
        'NO2': [
            { 'cause': 'Highway Traffic Emissions', 'image': 'highway_traffic.png' }
        ],
        'SO2': [
            { 'cause': 'Highway Traffic Emissions', 'image': 'highway_traffic.png' }
        ],
        'CO': [
            { 'cause': 'Highway Traffic Emissions', 'image': 'highway_traffic.png' }
        ]
    },
    'Khalifa City A': {
        'PM10': [
            { 'cause': 'Suburban traffic', 'image': 'suburban_traffic.png' },
            { 'cause': 'Construction activities', 'image': 'construction_activities.png' },
            { 'cause': 'Natural sources', 'image': 'natural_sources.png' }
        ],
        'NO2': [
            { 'cause': 'Suburban traffic', 'image': 'suburban_traffic.png' },
            { 'cause': 'Construction activities', 'image': 'construction_activities.png' }
        ],
        'SO2': [
            { 'cause': 'Suburban traffic', 'image': 'suburban_traffic.png' },
            { 'cause': 'Construction activities', 'image': 'construction_activities.png' }
        ],
        'O3': [
            { 'cause': 'Secondary Pollutant', 'image': 'secondary_pollutant.png' }
        ]
    },
    'Al Mafraq': {
        'PM10': [
            { 'cause': 'Highway Traffic Emissions', 'image': 'highway_traffic.png' },
            { 'cause': 'Industrial emissions', 'image': 'industrial_emission.png' },
            { 'cause': 'Natural sources', 'image': 'natural_sources.png' }
        ],
        'NO2': [
            { 'cause': 'Highway Traffic Emissions', 'image': 'highway_traffic.png' },
            { 'cause': 'Industrial emissions', 'image': 'industrial_emission.png' }
        ],
        'SO2': [
            { 'cause': 'Highway Traffic Emissions', 'image': 'highway_traffic.png' },
            { 'cause': 'Industrial emissions', 'image': 'industrial_emission.png' }
        ]
    },
    'Al Ain Islamic Institute': {
        'PM10': [
            { 'cause': 'Suburban residential traffic', 'image': 'residential_traffic.png' },
            { 'cause': 'Natural sources', 'image': 'natural_sources.png' }
        ],
        'NO2': [
            { 'cause': 'Suburban residential traffic', 'image': 'residential_traffic.png' }
        ],
        'SO2': [
            { 'cause': 'Suburban residential traffic', 'image': 'residential_traffic.png' }
        ],
        'O3': [
            { 'cause': 'Secondary Pollutant', 'image': 'secondary_pollutant.png' }
        ]
    },
    'Sweihan': {
        'PM10': [
            { 'cause': 'Suburban Traffic', 'image': 'suburban_traffic.png' },
            { 'cause': 'Natural sources', 'image': 'natural_sources.png' }
        ],
        'NO2': [
            { 'cause': 'Suburban Traffic', 'image': 'suburban_traffic.png' }
        ],
        'SO2': [
            { 'cause': 'Suburban Traffic', 'image': 'suburban_traffic.png' }
        ],
        'CO': [
            { 'cause': 'Suburban Traffic', 'image': 'suburban_traffic.png' }
        ],
        'O3': [
            { 'cause': 'Secondary Pollutant', 'image': 'secondary_pollutant.png' }
        ]
    },
    'Al Tawia': {
        'PM10': [
            { 'cause': 'Suburban Traffic', 'image': 'suburban_traffic.png' },
            { 'cause': 'Natural sources', 'image': 'natural_sources.png' }
        ],
        'NO2': [
            { 'cause': 'Suburban Traffic', 'image': 'suburban_traffic.png' }
        ],
        'SO2': [
            { 'cause': 'Suburban Traffic', 'image': 'suburban_traffic.png' }
        ],
        'O3': [
            { 'cause': 'Suburban Traffic', 'image': 'suburban_traffic.png' }
        ]
    },
    'Zakher': {
        'PM10': [
            { 'cause': 'Urban Traffic', 'image': 'urban_traffic.png' },
            { 'cause': 'Natural sources', 'image': 'natural_sources.png' }
        ],
        'NO2': [
            { 'cause': 'Urban Traffic', 'image': 'urban_traffic.png' }
        ],
        'SO2': [
            { 'cause': 'Urban Traffic', 'image': 'urban_traffic.png' }
        ],
        'O3': [
            { 'cause': 'Secondary Pollutant', 'image': 'secondary_pollutant.png' }
        ]
    },
    'Al Quaa': {
        'PM10': [
            { 'cause': 'Natural sources', 'image': 'natural_sources.png' }
        ],
        'NO2': [
            { 'cause': 'No identified sources in the vicinity', 'image': 'null.png' }
        ],
        'SO2': [
            { 'cause': 'No identified sources in the vicinity', 'image': 'null.png' }
        ],
        'CO': [
            { 'cause': 'No identified sources in the vicinity', 'image': 'null.png' }
        ],
        'O3': [
            { 'cause': 'Secondary Pollutant', 'image': 'secondary_pollutant.png' }
        ]
    },
    'Bida Zayed': {
        'PM10': [
            { 'cause': 'Suburban Traffic', 'image': 'suburban_traffic.png' },
            { 'cause': 'Natural sources', 'image': 'natural_sources.png' }
        ],
        'NO2': [
            { 'cause': 'Suburban Traffic', 'image': 'suburban_traffic.png' }
        ],
        'SO2': [
            { 'cause': 'Suburban Traffic', 'image': 'suburban_traffic.png' }
        ],
        'O3': [
            { 'cause': 'Secondary Pollutant', 'image': 'secondary_pollutant.png' }
        ]
    },
    'Gayathi School': {
        'PM10': [
            { 'cause': 'Suburban residential traffic', 'image': 'residential_traffic.png' },
            { 'cause': 'Natural sources', 'image': 'natural_sources.png' }
        ],
        'NO2': [
            { 'cause': 'Suburban residential traffic', 'image': 'residential_traffic.png' }
        ],
        'SO2': [
            { 'cause': 'Suburban residential traffic', 'image': 'residential_traffic.png' }
        ],
        'O3': [
            { 'cause': 'Secondary Pollutant', 'image': 'secondary_pollutant.png' }
        ]
    },
    'Liwa Oasis': {
        'PM10': [
            { 'cause': 'Rural Traffic', 'image': 'rural_traffic.png' },
            { 'cause': 'Natural sources', 'image': 'natural_sources.png' }
        ],
        'O3': [
            { 'cause': 'Secondary Pollutant', 'image': 'secondary_pollutant.png' }
        ]
    },
    'Ruwais': {
        'PM10': [
            { 'cause': 'Suburban Traffic', 'image': 'suburban_traffic.png' },
            { 'cause': 'Natural sources', 'image': 'natural_sources.png' }
        ],
        'NO2': [
            { 'cause': 'Suburban Traffic', 'image': 'suburban_traffic.png' }
        ],
        'SO2': [
            { 'cause': 'Suburban Traffic', 'image': 'suburban_traffic.png' }
        ],
        'CO': [
            { 'cause': 'Suburban Traffic', 'image': 'suburban_traffic.png' }
        ],
        'O3': [
            { 'cause': 'Secondary Pollutant', 'image': 'secondary_pollutant.png' }
        ]
    },
    'Habshan South': {
        'PM10': [
            { 'cause': 'Suburban Traffic', 'image': 'suburban_traffic.png' },
            { 'cause': 'Natural sources', 'image': 'natural_sources.png' }
        ],
        'NO2': [
            { 'cause': 'Suburban Traffic', 'image': 'suburban_traffic.png' }
        ],
        'SO2': [
            { 'cause': 'Suburban Traffic', 'image': 'suburban_traffic.png' }
        ],
        'O3': [
            { 'cause': 'Secondary Pollutant', 'image': 'secondary_pollutant.png' }
        ]
    },
    'E11 Road': {
        'PM10': [
            { 'cause': 'Highway Traffic Emissions', 'image': 'highway_traffic.png' },
            { 'cause': 'Natural sources', 'image': 'natural_sources.png' }
        ],
        'NO2': [
            { 'cause': 'Highway Traffic Emissions', 'image': 'highway_traffic.png' }
        ],
        'SO2': [
            { 'cause': 'Highway Traffic Emissions', 'image': 'highway_traffic.png' }
        ],
        'CO': [
            { 'cause': 'Highway Traffic Emissions', 'image': 'highway_traffic.png' }
        ]
    },
    'Abu Dhabi': {
        'PM10': [
            { 'cause': 'Suburban traffic', 'image': 'suburban_traffic.png' },
            { 'cause': 'Construction activities', 'image': 'construction_activities.png' },
            { 'cause': 'Natural sources', 'image': 'natural_sources.png' }
        ],
        'NO2': [
            { 'cause': 'Suburban traffic', 'image': 'suburban_traffic.png' },
            { 'cause': 'Construction activities', 'image': 'construction_activities.png' }
        ],
        'SO2': [
            { 'cause': 'Suburban traffic', 'image': 'suburban_traffic.png' },
            { 'cause': 'Construction activities', 'image': 'construction_activities.png' }
        ],
        'O3': [
            { 'cause': 'Secondary Pollutant', 'image': 'secondary_pollutant.png' }
        ]
    }
};
// start 22-April-24---------
const stationsWithLocations = [{
    stationId: "EAD_HamdanStreet",
    stationName: "Hamdan Street",
    regionName: "Abu Dhabi",
    latitude: 24.4889,
    longitude: 54.3637,
    stationLocation: "F9Q7+HFG - Al Danah - Zone 1 - Abu Dhabi, Urban Traffic",
    measuredPolluants: [pollutantAbbrevations.PM10, pollutantAbbrevations.PM25, pollutantAbbrevations.NO2, pollutantAbbrevations.SO2, pollutantAbbrevations.CO, pollutantAbbrevations.BTEX, pollutantAbbrevations.MET, pollutantAbbrevations.Noise]
}, {
    stationId: "EAD_KhadijaSchool",
    stationName: "Khadejah School",
    regionName: "Abu Dhabi",
    latitude: 24.4816,
    longitude: 54.3693,
    stationLocation: "F9J9+WJ4 - Sultan Bin Zayed The First St - Al Danah - Zone 1 - Abu Dhabi, Urban Background",
    measuredPolluants: [pollutantAbbrevations.PM10, pollutantAbbrevations.PM25, pollutantAbbrevations.NO2, pollutantAbbrevations.SO2, pollutantAbbrevations.H2S, pollutantAbbrevations.O3, pollutantAbbrevations.MET, pollutantAbbrevations.Noise]
}, {
    stationId: "EAD_KhalifaSchool",
    stationName: "Khalifa School",
    regionName: "Abu Dhabi",
    latitude: 24.4301,
    longitude: 54.4084,
    stationLocation: "25-11 Ar Raʹbi St - Al Mushrif - Abu Dhabi, Suburban Background",
    measuredPolluants: [pollutantAbbrevations.PM10, pollutantAbbrevations.PM25, pollutantAbbrevations.NO2, pollutantAbbrevations.SO2, pollutantAbbrevations.H2S, pollutantAbbrevations.O3, pollutantAbbrevations.MET, pollutantAbbrevations.Noise]
}, {
    stationId: "EAD_Mussafah",
    stationName: "Mussafah",
    regionName: "Abu Dhabi",
    latitude: 24.3472,
    longitude: 54.5029,
    stationLocation: "8GW3+H6J - Musaffah - Musaffah Industrial - Abu Dhabi, Suburban Industrial",
    measuredPolluants: [pollutantAbbrevations.PM10, pollutantAbbrevations.PM25, pollutantAbbrevations.NO2, pollutantAbbrevations.SO2, pollutantAbbrevations.H2S, pollutantAbbrevations.THC, pollutantAbbrevations.BTEX, pollutantAbbrevations.MET, pollutantAbbrevations.Noise]
}, {
    stationId: "EAD_Baniyas",
    stationName: "Baniyas School",
    regionName: "Abu Dhabi",
    latitude: 24.3213,
    longitude: 54.6359,
    stationLocation: "Bani Yas - East 4 - Abu Dhabi, Suburban Background",
    measuredPolluants: [pollutantAbbrevations.PM10, pollutantAbbrevations.PM25, pollutantAbbrevations.NO2, pollutantAbbrevations.SO2, pollutantAbbrevations.H2S, pollutantAbbrevations.O3, pollutantAbbrevations.MET, pollutantAbbrevations.Noise]
}, {
    stationId: "EAD_AlMaqta",
    stationName: "Al Maqta",
    regionName: "Abu Dhabi",
    latitude: 24.4035,
    longitude: 54.5161,
    stationLocation: "Rabdan - Abu Dhabi, Urban Background",
    measuredPolluants: [pollutantAbbrevations.PM10, pollutantAbbrevations.PM25, pollutantAbbrevations.NO2, pollutantAbbrevations.SO2, pollutantAbbrevations.H2S, pollutantAbbrevations.THC, pollutantAbbrevations.CO, pollutantAbbrevations.BTEX, pollutantAbbrevations.MET, pollutantAbbrevations.Noise]
}, {
    stationId: "EAD_KhalifaCity",
    stationName: "Khalifa City A",
    regionName: "Abu Dhabi",
    latitude: 24.4199,
    longitude: 54.5782,
    stationLocation: "5 ʻutbah Bin Ghazwan St - Khalifa City - Sector 12 - Abu Dhabi, Suburban Background",
    measuredPolluants: [pollutantAbbrevations.PM10, pollutantAbbrevations.PM25, pollutantAbbrevations.NO2, pollutantAbbrevations.SO2, pollutantAbbrevations.H2S, pollutantAbbrevations.O3, pollutantAbbrevations.MET, pollutantAbbrevations.Noise]
},
{
    stationId: "EAD_AlMafraq",
    stationName: "Al Mafraq",
    regionName: "Abu Dhabi",
    latitude: 24.2863,
    longitude: 54.5889,
    stationLocation: "Jarn Yafour - Abu Dhabi, Suburban Industrial",
    measuredPolluants: [pollutantAbbrevations.PM10, pollutantAbbrevations.PM25, pollutantAbbrevations.NO2, pollutantAbbrevations.SO2, pollutantAbbrevations.H2S, pollutantAbbrevations.THC, pollutantAbbrevations.MET, pollutantAbbrevations.Noise]
},
{
    stationId: "EAD_AlAinSchool",
    stationName: "Al Ain Islamic Institute",
    regionName: "Al Ain",
    latitude: 24.2191,
    longitude: 55.7349,
    stationLocation: "26-48 Al Makramah St - Al Mu'tarid - Abu Dhabi, Suburban Background",
    measuredPolluants: [pollutantAbbrevations.PM10, pollutantAbbrevations.PM25, pollutantAbbrevations.NO2, pollutantAbbrevations.SO2, pollutantAbbrevations.H2S, pollutantAbbrevations.O3, pollutantAbbrevations.MET, pollutantAbbrevations.Noise]
}, {
    stationId: "EAD_AlAinStreet",
    stationName: "Al Ain Street",
    regionName: "Al Ain",
    latitude: 24.2259,
    longitude: 55.7658,
    stationLocation: "Central District - Abu Dhabi, Urban Traffic",
    measuredPolluants: [pollutantAbbrevations.PM10, pollutantAbbrevations.PM25, pollutantAbbrevations.NO2, pollutantAbbrevations.SO2, pollutantAbbrevations.CO, pollutantAbbrevations.BTEX, pollutantAbbrevations.MET, pollutantAbbrevations.Noise]
}, {
    stationId: "EAD_Sweihan",
    stationName: "Sweihan",
    regionName: "Al Ain",
    latitude: 24.4667,
    longitude: 55.3429,
    stationLocation: "44th St - Sweihan - Abu Dhabi, Suburban Background",
    measuredPolluants: [pollutantAbbrevations.PM10, pollutantAbbrevations.PM25, pollutantAbbrevations.NO2, pollutantAbbrevations.SO2, pollutantAbbrevations.CO, pollutantAbbrevations.O3, pollutantAbbrevations.MET, pollutantAbbrevations.Noise]
}, {
    stationId: "EAD_AlTawia",
    stationName: "Al Tawia",
    regionName: "Al Ain",
    latitude: 24.2592,
    longitude: 55.7049,
    stationLocation: "Al Tiwayya - Abu Dhabi, Suburban Background",
    measuredPolluants: [pollutantAbbrevations.PM10, pollutantAbbrevations.PM25, pollutantAbbrevations.NO2, pollutantAbbrevations.SO2, pollutantAbbrevations.H2S, pollutantAbbrevations.O3, pollutantAbbrevations.MET, pollutantAbbrevations.Noise]
}, {
    stationId: "EAD_Zakher",
    stationName: "Zakher",
    regionName: "Al Ain",
    latitude: 24.1635,
    longitude: 55.7021,
    stationLocation: "Al-Zawahir St - Zakhir - Abu Dhabi, Urban Background",
    measuredPolluants: [pollutantAbbrevations.PM10, pollutantAbbrevations.PM25, pollutantAbbrevations.NO2, pollutantAbbrevations.SO2, pollutantAbbrevations.H2S, pollutantAbbrevations.O3, pollutantAbbrevations.MET, pollutantAbbrevations.Noise]
}, {
    stationId: "EAD_AlQuaa",
    stationName: "Al Quaa",
    regionName: "Al Ain",
    latitude: 23.5312,
    longitude: 55.486,
    stationLocation: "Al Wiqan - Abu Dhabi, Regional Rural",
    measuredPolluants: [pollutantAbbrevations.PM10, pollutantAbbrevations.PM25, pollutantAbbrevations.NO2, pollutantAbbrevations.SO2, pollutantAbbrevations.CO, pollutantAbbrevations.THC, pollutantAbbrevations.O3, pollutantAbbrevations.MET, pollutantAbbrevations.Noise]
}, {
    stationId: "EAD_BidaZayed",
    stationName: "Bida Zayed",
    regionName: "Al Dhafra",
    latitude: 23.6523,
    longitude: 53.7039,
    stationLocation: "Zayed City - Abu Dhabi, Suburban Background",
    measuredPolluants: [pollutantAbbrevations.PM10, pollutantAbbrevations.PM25, pollutantAbbrevations.NO2, pollutantAbbrevations.SO2, pollutantAbbrevations.H2S, pollutantAbbrevations.O3, pollutantAbbrevations.MET, pollutantAbbrevations.Noise]
}, {
    stationId: "EAD_Gayathi",
    stationName: "Gayathi School",
    regionName: "Al Dhafra",
    latitude: 23.8355,
    longitude: 52.8103,
    stationLocation: "Ghiyathi - Abu Dhabi, Suburban Background",
    measuredPolluants: [pollutantAbbrevations.PM10, pollutantAbbrevations.PM25, pollutantAbbrevations.NO2, pollutantAbbrevations.SO2, pollutantAbbrevations.H2S, pollutantAbbrevations.O3, pollutantAbbrevations.MET, pollutantAbbrevations.Noise]
}, {
    stationId: "EAD_Liwa",
    stationName: "Liwa Oasis",
    regionName: "Al Dhafra",
    latitude: 23.0958,
    longitude: 53.6064,
    stationLocation: "3JW4+8H7 Taraq, Abu Dhabi, Rural Background Regional",
    measuredPolluants: [pollutantAbbrevations.PM10, pollutantAbbrevations.PM25, pollutantAbbrevations.NO2, pollutantAbbrevations.SO2, pollutantAbbrevations.O3, pollutantAbbrevations.MET, pollutantAbbrevations.Noise]
}, {
    stationId: "EAD_RuwaisTransco",
    stationName: "Ruwais",
    regionName: "Al Dhafra",
    latitude: 24.0909,
    longitude: 52.7548,
    stationLocation: "Al Ruways Industrial City - Abu Dhabi, Suburban Industrial",
    measuredPolluants: [pollutantAbbrevations.PM10, pollutantAbbrevations.PM25, pollutantAbbrevations.NO2, pollutantAbbrevations.SO2, pollutantAbbrevations.H2S, pollutantAbbrevations.CO, pollutantAbbrevations.THC, pollutantAbbrevations.O3, pollutantAbbrevations.MET, pollutantAbbrevations.Noise]
}, {
    stationId: "EAD_Habshan",
    stationName: "Habshan South",
    regionName: "Al Dhafra",
    latitude: 23.7504,
    longitude: 53.7453,
    stationLocation: "QP2W+44W - Habshan - Abu Dhabi, Rural Industrial",
    measuredPolluants: [pollutantAbbrevations.PM10, pollutantAbbrevations.PM25, pollutantAbbrevations.NO2, pollutantAbbrevations.SO2, pollutantAbbrevations.H2S, pollutantAbbrevations.THC, pollutantAbbrevations.O3, pollutantAbbrevations.MET, pollutantAbbrevations.Noise]
}, {
    stationId: "EAD_E11Road",
    stationName: "E11 Road",
    regionName: "Al Dhafra",
    latitude: 24.0352,
    longitude: 53.8853,
    stationLocation: "Um Laylah - Abu Dhabi, Rural Traffic",
    measuredPolluants: [pollutantAbbrevations.PM10, pollutantAbbrevations.PM25, pollutantAbbrevations.NO2, pollutantAbbrevations.SO2, pollutantAbbrevations.CO, pollutantAbbrevations.BTEX, pollutantAbbrevations.MET, pollutantAbbrevations.Noise]
}, {
    stationId: "",
    stationName: "Abu Dhabi",
    latitude: 24.4539,
    longitude: 54.3773,
}];

// End 22-April-24---------

const colorClass = {
    GoodColorClass: "green",
    ModrateColorClass: "lightorange",
    Unhealthy4peopleColorClass: "darkorange",
    UnhealthyColorClass: "peach",
    VeryUnhealthyColorClass: "purple",
    HazardousClass: "hazar"
}

//If coolor codes changes in styles, need to make changes here as well
const colorCodes = {
    green: '#9CD84E',
    lightorange: '#FFB549',
    darkorange: '#F99049',
    peach: '#F65E5F',
    purple: '#A070B6',
    hazar: '#A06A7B'
};

// start 19-April-24--
const statusClass = {
    Good: "Good Days",
    Moderate: "Moderate Days",
    UnHealthlySensitiveGroups: "UnHealthy Sensitive Groups",
    UnHealthly: "UnHealthy Days",
    VeryUnHealthly: "Very UnHealthy Days",
    Hazardous: "Hazardous Days",
}
// end 19-April-24--

const statusClassNew1 = {
    Good: "Good",
    Moderate: "Moderate",
    UnHealthlySensitiveGroups: "UnHealthy Sensitive Groups",
    UnHealthly: "UnHealthy",
    VeryUnHealthly: "Very UnHealthy",
    Hazardous: "Hazardous",
}
const aqiContent = {
    Good: "Enjoy the Fresh Air",
    Moderate: "Enjoy Your Day Outdoors!",
    UnHealthlySensitiveGroups: "Babies And Sensitive Persons Should Stay Indoors",
    UnHealthly: "Best to Stay Indoors",
    VeryUnHealthly: "Not a Good Time to be Outdoors, Spend Your Day Indoors",
    Hazardous: "You should avoid outdoor activities",
}

const chartFilter = {
    Hourly: 'Hourly',
    Daily: 'Daily',
    Monthly: 'Monthly',
    Yearly: 'Yearly',
    Custom: 'Custom'
}

const pollutantNames = {
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
    NGO: "Non-Governmental Organization"
}

const pollutantThresholdLimits = {
    PM10Daily: 150,
    SO2Hourly: 350,
    SO2Daily: 150,
    SO2Yearly: 60,
    COHourly: 30,
    O3Hourly: 200,
    NO2Hourly: 400,
    NO2Daily: 150
}

var radarOptions = {
    scales: {
        r: {
            pointLabels: {
                fontSize: 14,
            },
            suggestedMin: 0.5,
            suggestedMax: 100,
        }
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
            displayColors: false, // Set this to false to hide the color box
            mode: 'nearest',
            intersect: false,
            callbacks: {
                label: function (context) {
                    var label = context.dataset.label || '';
                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.r !== null) {
                        label += context.parsed.r + ' ug/m³'; // Appending 'ug/m3' to the label
                    }
                    return label;
                }

            }
        },
    },
    maintainAspectRatio: false,
    animation: {
        duration: 2000,
    },
};

var aqiLineChartOptions1 = {
    series: [{
        name: '',
        data: []
    }],
    chart: {
        height: 300,
        width: '100%',
        type: 'area',
        toolbar: {
            show: false
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        fill: {
            type: "gradient",
            gradient: {
                type: "horizontal",
                colorStops: [
                    [
                        {
                            offset: 0,
                            color: "#9CD84E",
                            opacity: 1
                        },
                        {
                            offset: 50,
                            color: "yellow",
                            opacity: 1
                        },
                        {
                            offset: 80,
                            color: "#F99049",
                            opacity: 1
                        }
                    ]
                ]
            }
        }
    },
    xaxis: {
        // type: 'datetime',
        categories: [], //['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000', '7/11/2000', '8/11/2000', '9/11/2000', '10/11/2000', '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001', '3/11/2001','4/11/2001' ,'5/11/2001' ,'6/11/2001'],
        tickAmount: 10,
        labels: {
            rotateAlways: false,
            rotate: 0
        }
    },
    grid: {
        show: false, // hide grid
    },
    colors: ['#9CD84E', '#facf3978', '#F99049'],
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            type: "horizontal",
            colorStops: [
                [
                    {
                        offset: 0,
                        color: "#9cd84e6b",
                        opacity: 0.2
                    },
                    {
                        offset: 50,
                        color: "#facf3978",
                        opacity: 0.2
                    },
                    {
                        offset: 80,
                        color: "#f9904957",
                        opacity: 0.2
                    }
                ]
            ]
        }
    },
    yaxis: {
        min: 0,
        // max: 100
    },
    responsive: [
        {
            breakpoint: 1350,
            options: {
                chart: {
                    height: 250
                }
            },
            breakpoint: 1400,
            options: {
                chart: {
                    height: 250
                }
            },
        }
    ],
    tooltip: {
        shared: true,
        intersect: false,
        x: {
            show: false,
        },
        y: {
            formatter: function (value, options) {
                $("#lineChartAqiSo2Value").text(chartData[options.dataPointIndex].sO2);
                $("#lineChartAqiNo2Value").text(chartData[options.dataPointIndex].nO2);
                $("#lineChartAqiCoValue").text(chartData[options.dataPointIndex].co);
                $("#lineChartAqiPm10Value").text(chartData[options.dataPointIndex].pM10);
                $("#lineChartAqiO3Value").text(chartData[options.dataPointIndex].o3);
                return value;
            }
        }
    }
};

var pollutantLineChartOptions1 = {
    series: [],
    chart: {
        height: 300,
        width: '100%',
        type: 'line',
        toolbar: {
            show: false
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: [3, 3, 3, 3, 3, 3],
        curve: 'smooth'
    },
    xaxis: {
        categories: [],
        labels: {
            rotateAlways: false,
            rotate: 0
        }
        // tickAmount: 10,
    },
    grid: {
        show: false, // hide grid
    },

    yaxis: {
        min: 0,
        // max: 100
    },
    responsive: [
        {
            breakpoint: 767,
            options: {
                chart: {
                    width: 600
                }
            }
        }, {
            breakpoint: 1350,
            options: {
                chart: {
                    height: 250
                }
            }
        },
        {
            breakpoint: 1400,
            options: {
                chart: {
                    height: 250
                }
            }
        },
    ],
    tooltip: {
        enabled: true,
        shared: true,
        intersect: false,
        y: {
            formatter: function (value, options) {
                if (options.series.length > 0) {
                    options.series.forEach((item, index) => {
                        switch (index) {
                            case 0:
                                $("#lineChartPollutantPm10Value").text(item.length > 0 ? chartData[options.dataPointIndex].pM10 : '');
                                break;
                            case 1:
                                $("#lineChartPollutantSo2Value").text(item.length > 0 ? chartData[options.dataPointIndex].sO2 : '');
                                break;
                            case 2:
                                $("#lineChartPollutantCoValue").text(item.length > 0 ? chartData[options.dataPointIndex].co : '');
                                break;
                            case 3:
                                $("#lineChartPollutantO3Value").text(item.length > 0 ? chartData[options.dataPointIndex].o3 : '');
                                break;
                            case 4:
                                $("#lineChartPollutantNo2Value").text(item.length > 0 ? chartData[options.dataPointIndex].nO2 : '');
                                break;
                        }
                        return value;
                    });
                } else {
                    $("#lineChartPollutantSo2Value, #lineChartPollutantNo2Value, #lineChartPollutantCoValue, #lineChartPollutantPm10Value, #lineChartPollutantO3Value").text('');
                }
            }
        }
    }
};


$(window).on('load', function () {
    setTimeout(function () { // allowing 3 secs to fade out loader
        $('.page-loader').fadeOut('slow');
    }, 3500);
});

//  05-Feb-2024 Banner Arrrow animation script Start-------------- 
$('.down-arrow-bg').click(function () {
    let currentSectionIndex = 0;
    var nextSection = $(this).closest('.down-arrow').next('div');
    if (nextSection.length > 0) {
        nextSection[currentSectionIndex].scrollIntoView({ block: "start", behavior: "smooth" });
    }
});
// Banner Arrrow animation script End-------------- 
// Hiding Nav some page scroll
$(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 600) {
        $('header').addClass('fadeout');

    } else {
        $('header').removeClass('fadeout');
    }
});

//  05-Feb-2024 Map Search icon script Start--------------   
//$('.listSearch li').on("click", function () {
//    $(".listSearch li").css("background-color", "");
//    $(this).css("background-color", "rgb(213 213 213)");
//    var value = $(this).text();
//    //alert(value);
//    $(".show-mapSearchList").show();
//    $(".show-mapSearchList").html(value);
//    $('.Newsearch-box').hide();
//});

$('.show-mapSearchList').click(function () {
    $('.Newsearch-box').show();
    $(".show-mapSearchList").hide();
    $('#stationsDropdownMapSearch').val('');
});
// Map Search icon script Start--------------   

//  05-Feb-2024 Breath text heading animation script Start--------------

var TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
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

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

//// --Mobile Menu---------------------------
$('.navmobile-new').click(function () {
    $('#hamburger').toggleClass('open');
    $('#mobile-overlay').toggleClass('menu');
});

//// --Mobile Menu-------------------------
$('.mobile-menu a').click(function () {
    $('.mobile-menu a').removeClass("active");
    $(this).addClass("active");
    $('#hamburger').removeClass('open');
    $('#mobile-overlay').removeClass('menu');
});

// Project Section Slider &  modal start--------------

$(document).ready(function () {
    if (window.innerWidth < 1030) {
        // Open Sidebar
        $(".openSidebar").click(function () {
            $(".sidebar").css("width", "97%");
            $('.modal-background').addClass('project-modal');
            // $(".main-content").css("margin-right", "250px");
        });
    }
    else {
        // Open Sidebar
        $(".openSidebar").click(function () {
            $(".sidebar").css("width", "40%");
            $('.modal-background').addClass('project-modal');
            // $(".main-content").css("margin-right", "250px");
        });
    }

    // Close Sidebar
    $(".close-btn").click(function () {
        $(".sidebar").css("width", "0");
        //$(".main-content").css("margin-right", "0");
        $('.modal-background').removeClass('project-modal');
    });

    // 05-Feb-2024 Bannner text fadeout function start------

    var quotes = $(".quotes");
    var quoteIndex = -1;

    function showNextQuote() {
        ++quoteIndex;
        quotes.eq(quoteIndex % quotes.length)
            .fadeIn(2000)
            .delay(2000)
            .fadeOut(2000, showNextQuote);
    }

    setTimeout(function () {
        showNextQuote();
    }, 4000);
    // Bannner text fadeout function End--------

    // Do not remove below code starts---------------------------------
    $('#currentDate').html(getFormattedDate(new Date()));
    activePollutant = pollutantAbbrevations.AQI;
    currentStationDetails = stationsWithLocations.find(x => x.stationId == "");
    $('#aqiBasedSort').attr('checked', 'checked');
    bindYearsToDropDown(); // Do not call this function after load station data function
    getLiveCityRankingApi();

    $('.datepicker').on('change', function () {
        $('.datepicker').val($(this).val());
        $("#lineChartAqiSo2Value, #lineChartAqiNo2Value, #lineChartAqiCoValue, #lineChartAqiPm10Value, #lineChartAqiO3Value").text('');
        getStationChartApi(chartFilter.Custom);
    });

    // start 22-April-24 -----------
    // $('#stationsDropdownMapSearch').on('keyup', function () {
    //     var searchText = $(this).val().toLowerCase();
    //     $('.mapSearchlist-text').each(function () {
    //         var listItemText = $(this).text().toLowerCase();
    //         console.log('listItemText', listItemText);
    //         if (listItemText.indexOf(searchText) === -1) {
    //             $(this).hide();
    //         } else {
    //             $(this).show();
    //         }
    //     });
    // });

    document.getElementById('stationsDropdownMapSearch').addEventListener('input', function () {
        var searchText = this.value.toLowerCase();
        var listItems = document.querySelectorAll('.listSearch li');

        listItems.forEach(function (item) {
            var stationName = item.querySelector('.station-name').textContent.toLowerCase();
            var regionName = item.querySelector('.region-name').textContent.toLowerCase();

            if (stationName.includes(searchText) || regionName.includes(searchText)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
    // End 22-April-24 -----------

    // Do not remove below code ends---------------------------------
});

// Project Section modal End--------------

// Insight Section Script by Sachin---------
function showHideToggleDiv(tabId, pollutant) {
    if (pollutant === 'PM10' || pollutant === 'SO2' || pollutant === 'CO' || pollutant === 'O3' || pollutant === 'NO2') {
        document.getElementById('myTabs').classList.add('upperTop');
    } else {
        // Remove the class 'upperTop' from the ul if another tab is clicked
        document.getElementById('myTabs').classList.remove('upperTop');
    }
    document.querySelectorAll('.tab-content.mt-0').forEach(function (div) {
        div.style.display = 'none';
    });
    document.getElementById(tabId).style.display = 'block';
    activePollutant = pollutant;
    bindStationDataToBarChart($("#barChartFilter").text());
}

// // Map Search icon script Start--------------   
$(".dropdown-change li a").click(function () {
    var selText = $(this).text();
    $(this).parents('.btn-group').find('.quality-button-dropdown').html(selText);
    if (!$(this).hasClass("active")) {
        $('.dropdown-change li a').removeClass("active");
        $(this).addClass("active");
    }
});

// $("#myTabs").insertBefore(".bar_section .legend");
$(function () {
    $('#myTabs .nav-item .nav-link').click(function () {
        if (!$(this).hasClass("active")) {
            $('#myTabs .nav-item .nav-link').removeClass("active");
            $(this).addClass("active");
        }
    });
});

//  05-Feb-2024 Banner Arrrow animation script Start-------------- 
$('.down-arrow').on('click', function () {
    fullpage_api.moveTo('slide1');
});

$('.insight-btn').on('click', function () {
    fullpage_api.moveTo('slide2');
});

$('.insight-btn-tab').on('click', function () {
    $('html, body').animate({
        scrollTop: $('#section2').offset().top
    }, 700);
});

document.getElementById('expandTrigger').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('expanded');
});
$(document).ready(function () {
    var thirdSection = $('#section2');
    var classToAdd = 'highlight';

    $(window).scroll(function () {
        var scrollPosition = $(window).scrollTop();

        // Adjust the offset value as needed
        var thirdSectionOffset = thirdSection.offset().top;
        var thirdSectionHeight = thirdSection.height();

        // Check if the scroll position is within the range of the third section
        if (scrollPosition >= thirdSectionOffset && scrollPosition < thirdSectionOffset + thirdSectionHeight) {
            thirdSection.addClass(classToAdd);
        } else {
            thirdSection.removeClass(classToAdd);
        }

        // Check if the scroll position is beyond the start of section 3
        var section3Offset = $('#section3').offset().top;
        if (scrollPosition >= section3Offset) {
            thirdSection.removeClass(classToAdd);
        }
    });
});

$(document).ready(function () {
    $('#sidebar-btn').on('click', function () {
        $('#sidebar').toggleClass('visible');
    });


    $('.iconimg').on('click', function () {
        $('.info-popup').show();
    });
    $('.ic-top-position').on('click', function () {
        $('.info-topPosition').show();
    });

    $('.pollu-top-position').on('click', function () {
        $('.info-topPosition1').show();
    });
    $('.crossicon').on('click', function () {
        $('.info-popup').hide();
    });

    $('.quality-index-dropItem').click(function () {
        var el = $('.btn-group-filter');
        if ($(this).text() == chartFilter.Custom) {
            el.find('.date-box').removeClass('calen-box-hide');
            el.find('.quality-button-dropdown').hide();
            var datepickerEl = $(this).closest('.btn-group-filter').find('#datepicker');
            if (!datepickerEl.val()) {
                datepickerEl.focus();
            }
        } else {
            el.find('.date-box').addClass('calen-box-hide');
            el.find('.quality-button-dropdown').show();
        }
        updateCharts($(this).text());
    });

    $('.datePickImage').click(function () {
        var el = $('.btn-group-filter');
        el.find('.date-box').addClass('calen-box-hide');
        el.find('.quality-button-dropdown').show();
        $('.dropdown-change').addClass('show').css('top', '40px');
        $('.dropdown-change li a').removeClass("active");
        el.find('.quality-index-dropItem:first').addClass("active");
        $('.datepicker').val('');
        updateCharts(chartFilter.Hourly);
        // Remove show class when quality-index-dropItem is clicked
        $('.dropdown-change li a').click(function () {
            $('.dropdown-change').removeClass('show').css('top', '');
        });

        // Check if it's a small device
        if (window.innerWidth <= 767) {
            $('.dropdown-change').css('top', '52px').css('right', '22px'); // Adjust for small devices
        }
        //alert(window.innerWidth);
        // Check if it's a tablet device
        if (window.innerWidth >= 768 && window.innerWidth <= 1199) {
            $('.dropdown-change').css('top', '70px').css('right', '22px'); // Adjust for tablet devices
        }
    });
});

// Info Icon cross button script----------------------

// Project slider JS ---------------------------------
let items = document.querySelectorAll('.slide-carol .carol-item');
let prevButton = document.getElementById('prev');
let nextButton = document.getElementById('next');

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

// Function to check if last slide is active
//function isLastSlideActive() {
//    let activeSlide = document.querySelector('.carol-item.active');
//    let lastSlide = items[items.length - 1];
//    return activeSlide === lastSlide;
//}

//// Function to check if first slide is active
//function isFirstSlideActive() {
//    let activeSlide = document.querySelector('.carol-item.active');
//    let firstSlide = items[0];
//    return activeSlide === firstSlide;
//}

//// Add event listener to the carousel for slide change
//document.getElementById('recipeCarousel').addEventListener('slid.bs.carousel', function () {
//    // Check if last slide is active
//    if (isLastSlideActive()) {
//        // Add opacity to next button
//        nextButton.style.opacity = '0.5';
//        nextButton.disabled = true;
//    } else {
//        // Remove opacity from next button
//        nextButton.style.opacity = '1';
//        nextButton.disabled = false;
//    }

//    // Check if first slide is active
//    if (isFirstSlideActive()) {
//        // Add opacity to previous button
//        prevButton.style.opacity = '0.5';
//        prevButton.disabled = true;
//    } else {
//        // Remove opacity from previous button
//        prevButton.style.opacity = '1';
//        prevButton.disabled = false;
//    }
//});

// Do not remove below code starts---------------------------------
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
            status: statusClass.Good,
            color: colorCodes.green,
            Content: aqiContent.Good
        };
    } else if (value > 50 && value <= 100) {
        return {
            status: statusClass.Moderate,
            color: colorCodes.lightorange,
            Content: aqiContent.Moderate
        };
    } else if (value > 100 && value <= 150) {
        return {
            status: statusClass.UnHealthlySensitiveGroups,
            color: colorCodes.darkorange,
            Content: aqiContent.UnHealthlySensitiveGroups
        };
    } else if (value > 150 && value <= 200) {
        return {
            status: statusClass.UnHealthly,
            color: colorCodes.peach,
            Content: aqiContent.UnHealthly
        };
    } else if (value > 200 && value <= 300) {
        return {
            status: statusClass.VeryUnHealthly,
            color: colorCodes.purple,
            Content: aqiContent.VeryUnHealthly
        };
    } else {
        return {
            status: statusClass.Hazardous,
            color: colorCodes.hazar,
            Content: aqiContent.Hazardous
        };
    }
}
function getAqiStatusAndColorCodeNew(value) {
    if (value >= 0 && value <= 50) {
        return {
            status: statusClassNew1.Good,
            color: colorCodes.green,
            Content: aqiContent.Good
        };
    } else if (value > 50 && value <= 100) {
        return {
            status: statusClassNew1.Moderate,
            color: colorCodes.lightorange,
            Content: aqiContent.Moderate
        };
    } else if (value > 100 && value <= 150) {
        return {
            status: statusClassNew1.UnHealthlySensitiveGroups,
            color: colorCodes.darkorange,
            Content: aqiContent.UnHealthlySensitiveGroups
        };
    } else if (value > 150 && value <= 200) {
        return {
            status: statusClassNew1.UnHealthly,
            color: colorCodes.peach,
            Content: aqiContent.UnHealthly
        };
    } else if (value > 200 && value <= 300) {
        return {
            status: statusClassNew1.VeryUnHealthly,
            color: colorCodes.purple,
            Content: aqiContent.VeryUnHealthly
        };
    } else {
        return {
            status: statusClassNew1.Hazardous,
            color: colorCodes.hazar,
            Content: aqiContent.Hazardous
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
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Function to find the nearest station
function findNearestStation(currentLat, currentLong) {
    let nearestStation;
    let shortestDistance = Infinity;

    stationsWithLocations.forEach(station => {
        const distance = calculateDistance(currentLat, currentLong, station.latitude, station.longitude);
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
        datasets: [{
            label: '',
            //borderColor: 'rgba(250, 207, 57, 1)',
            // pointBackgroundColor: getColors(pollutantLevels),
            backgroundColor: function (context) {
                return createRadialGradient3(context);
            },
            pointBackgroundColor: 'rgba(250, 207, 57, 1)',
            lineTension: 0.2,
            data: pollutantLevels,
        }]
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

    // The pattern is 30 degrees of blend between quadrants
    // 60 degrees of pure color in the quadrant
    var gradientStop = colorCodesForAirAnalytics.length / 12 * 0.1;
    var colorGradient = 0
    colorCodesForAirAnalytics.forEach(item => {
        gradient.addColorStop(colorGradient, item);
        if (colorGradient + gradientStop < 1) {
            colorGradient += gradientStop;
        }
    });

    // Set the fill style and draw a rectangle
    ctx.fillStyle = gradient;
    ctx.fillRect(chartArea.left, chartArea.top, chartWidth, chartHeight);

    return gradient;
}

function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        currentStationDetails = findNearestStation(latitude, longitude);
        hasAccessToLocation = true;
        loadStationData();
    }, function error() {
        hasAccessToLocation = false;
    });
}

function sortStations(el) {
    var isCurrentElementChecked = el.checked;
    $(".sortIcon").each(function (index, item) {
        $(item).removeAttr('checked');
    });
    if (isCurrentElementChecked) {
        el.checked = true;
    }
    populateSort($(el).val());
}

function populateSort(sortBy) {
    if (liveCityData.length > 0) {
        var stationRankingListDiv = $('#stationRankingList');
        // Clear existing rows
        stationRankingListDiv.empty();
        if (sortBy === "name") {
            liveCityData.sort(function (a, b) {
                // Ensure both properties exist and are strings
                var nameA = a[sortBy] ? String(a[sortBy]) : '';
                var nameB = b[sortBy] ? String(b[sortBy]) : '';

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
            var stationDetails = stationsWithLocations.find(x => x.stationId == station.stationName);
            if (stationDetails) {
                var colorCode = colorCodes[getColorClassForAqi(station.aqi)];
                station.rank = index + 1;
                var row = `<label class="list-group-item">
                    <span class="numbers number" style="border-color:`+ colorCode + ` !important;">
                      <strong style="color:`+ colorCode + `;">` + station.rank + `</strong>
                    </span>
                    <div class="list-content">
                      <div class="inner_list-content text-left">
                        <p>`+ station.name + `</p>
                        <span style="color:`+ colorCode + `;">AQI ` + station.aqi + `</span>
                      </div>
                      <div class="dis-content">
                        <span>~ `+ station.distance + ` km</span>
                      </div>
                    </div>
                    <input type="radio" name="options" id="`+ stationDetails.stationId + `" value="` + stationDetails.stationId + `" autocomplete="off" class="float-end" onClick="selectedStation('` + stationDetails.stationId + `')">
                  </label>`;
                stationRankingListDiv.append(row);
            }
        });
        if (currentStationDetails.stationId) {
            $("#" + currentStationDetails.stationId).attr('checked', 'checked');
        }
    }
}

function loadStationData(initialRequest = false) {
    const apiUrl = baseUrl + 'GetAirQualityStation?input=' + currentStationDetails.stationId;
    $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            const aqi = Math.round(data.averageAQI);
            var aqiDetails = getAqiStatusAndColorCode(aqi);
            var aqiDetailsNew = getAqiStatusAndColorCodeNew(aqi);
            var currentYearOverview = new Date().getFullYear();
            $("#lineChartAqiValueStatus, #lineChartPollutantValueStatus").text(aqi + ' ' + aqiDetailsNew.status).css('color', aqiDetailsNew.color);
            $("#averageAqi, #airQualitySafetyLevelAqi, #insightsAqi, #sideBarAqi, #mobileAQILevelValue").text(aqi).css('color', aqiDetails.color);
            $("#averageAqiStatus, #insightsAqiStatus, #sideBarAqiStatus, #mobileAQIStatus").text(aqiDetailsNew.status).css('color', aqiDetailsNew.color); //23-April-24
            $("#airQualitySafetyLevelAqiStatus").text(aqiDetails.status).css('color', aqiDetails.color);
            //  $("#aqiNearestStation, #insightNearestStation, #sidebarNearestStation, #mobileNearestStation").text((hasAccessToLocation ? 'Nearest Station: ' : 'Station:') + currentStationDetails.stationName);
            $("#aqiNearestStation, #insightNearestStation, #sidebarNearestStation, #mobileNearestStation").text((hasAccessToLocation ? ' ' : ' ') + currentStationDetails.stationName + ' , ' + currentStationDetails.regionName); // 29-April-24
            $("#airQualitySafetyLevelStation").text('Station: ' + currentStationDetails.stationName);
            $("#yearlyAirQualityOverview").html(currentStationDetails.stationName + ', ' + currentStationDetails.regionName + ' Yearly Air Quality Overview for ' + currentYearOverview); // 29-April-24
            $("#SidebaryearlyAirQualityOverview").html(currentStationDetails.stationName + ' , ' + currentStationDetails.regionName + ' Yearly Air Quality Overview for ' + currentYearOverview);
            $("#airContent").text(aqiDetails.Content).css('color', aqiDetails.color);
            var mainPollutantNameContent;
            switch (data.pollutantName) {
                case "PM10":
                    mainPollutantNameContent = `Particulate Matter, PM<sub>10</sub>`;
                    break;
                case "SO2":
                    mainPollutantNameContent = `Sulphur Dioxide, SO<sub>2</sub>`;
                    break;
                case "O3":
                    mainPollutantNameContent = `Ozone, O<sub>3</sub>`;
                    break;
                case "NO2":
                    mainPollutantNameContent = `Nitrogen dioxide, O<sub>3</sub>`;
                    break;
                case "CO":
                    mainPollutantNameContent = `Carbon monoxide, CO`;
                    break;
            }

            updateCauses(currentStationDetails.stationName, data.pollutantName);
            updateLegendVisibility();
            updateActivities(aqi);
            updateHeathReccommendation(aqi);
            var pollutantColorClass = getColorClassForAqi(aqi);
            $("#mainPollutantName, #mainPollutantValue, #windSpeed, #windDirection, #relativeHumidity, #temperature,#mobileWindSpeed, #mobileWindDirection, #mobileRelativeHumidity, #mobileTemperature, #smallScreenwindSpeed, #smallScreenWindDirection, #smallScreenHumidity, #smallScreenTemperature").empty();
            $("#mainPollutantName").append(mainPollutantNameContent).css('background-color', colorCodes[pollutantColorClass]);
            $("#mainPollutantValue").append(aqi + `ug/m<sup>3</sup>`).css('color', colorCodes[pollutantColorClass]);
            $('#windSpeed').append(data.windSpeed + `<sub>km/h</sub>`);
            $('#windDirection').append(data.direction);
            $('#relativeHumidity').append(data.relativeHumidity + `<sub>%</sub>`);
            $('#temperature').append(data.temperature + `<sup>o</sup><sub>C</sub>`);
            $('#mobileWindSpeed').append(data.windSpeed + `<sub>km/h</sub>`);
            $('#mobileWindDirection').append(data.direction);
            $('#mobileRelativeHumidity').append(data.relativeHumidity + `<sub>%</sub>`);
            $('#mobileTemperature').append(data.temperature + `<sup>o</sup><sub>C</sub>`);
            $('#smallScreenwindSpeed').append(data.windSpeed + `<sub>km/h</sub>`);
            $('#smallScreenWindDirection').append(data.direction);
            $('#smallScreenHumidity').append(data.relativeHumidity + `<sub>%</sub>`);
            $('#smallScreenTemperature').append(data.temperature + `<sup>o</sup><sub>C</sub>`);
            $('.page-loader').fadeOut('slow');
            getYearlyStationPollutantsThreshold();
            getAirAnalytics($("#selectedyear").text());
            getAirQualitySafetyLevel();
            bindLiveCityRanking();
            if (!(initialRequest || currentStationDetails.measuredPolluants.includes(activePollutant))) {
                activePollutant = pollutantAbbrevations.AQI;
                showHideToggleDiv(activePollutant.toLowerCase() + 'Tab', activePollutant);
                $('#myTabs .nav-item .nav-link').removeClass("active");
                $('#aqiTabToggle').addClass('active')
            }

            getStationChartApi($('#barChartFilter').text(), initialRequest);
        },
        error: handleApiError
    });
    // LoadProgressBar(inputParam)
}
// start Arisha pending to complete the content values

function getAQILevel(value) {
    if (value >= 0 && value <= 50) return 'good';
    if (value >= 51 && value <= 100) return 'moderate';
    if (value >= 101 && value <= 150) return 'unhealthyForSensitiveGroups';
    if (value >= 151 && value <= 200) return 'unhealthy';
    if (value >= 201 && value <= 300) return 'veryUnhealthy';
    return 'hazardous';
}

function getActivityContent(aqiLevel) {
    const activities = {
        good: [
            { img: "run_green.png", text: "Have Fun Outdoors" },
            { img: "cycle_green.png", text: "Enjoy Outdoor Cycling" },
            { img: "heart_green.png", text: "Babies & Sensitive Persons can have fun outdoor" },
            { img: "dinner_green.png", text: "Enjoy Your Meal Outdoors" },
        ],
        moderate: [
            { img: "run_green.png", text: "Have Fun Outdoors" },
            { img: "cycle_green.png", text: "Enjoy Outdoor Cycling" },
            { img: "heart_orange.png", text: "Babies & Sensitive individuals Should be careful" },
            { img: "dinner_green.png", text: "Enjoy Your Meal Outdoors" },
        ],
        unhealthyForSensitiveGroups: [
            { img: "run_orange.png", text: "Avoid Prolonged Exposure" },
            { img: "cycle_orange.png", text: "Avoid Prolonged Exposure" },
            { img: "heart_red.png", text: "Avoid prolonged exposure for babies and sensitive individuals" },
            { img: "dinner_orange.png", text: "Avoid Prolonged Exposure" },
        ],
        unhealthy: [
            { img: "run_red.png", text: "Enjoy Some Indoor Fun" },
            { img: "cycle_red.png", text: "Try Indoor Cycling" },
            { img: "heart_hazar.png", text: "Being Indoors is the Best Option for babies and sensitive individuals" },
            { img: "dinner_red.png", text: "Enjoy Your Meal Indoors, if Possible" },
        ],
        veryUnhealthy: [
            { img: "run_hazar.png", text: "Avoid Outdoor Activities" },
            { img: "cycle_hazar.png", text: "Avoid Outdoor Cycling" },
            { img: "heart_brown.png", text: "Avoid the Outdoors for babies and sensitive individuals" },
            { img: "dinner_hazar.png", text: "Enjoy Your Meal Indoors" },
        ],
        hazardous: [
            { img: "run_brown.png", text: "Avoid Outdoor Activities" },
            { img: "cycle_brown.png", text: "Avoid Outdoor Cycling" },
            { img: "heart_brown.png", text: "Avoid the Outdoors for babies and sensitive individuals" },
            { img: "dinner_brown.png", text: "Enjoy Your Meal Indoors" },
        ],
    };

    return activities[aqiLevel].map(activity => `
        <div class="text-center">
            <img src="./images/new-images/${activity.img}" alt="">
            <p class="mt-2 enjoy-mb-8">${activity.text}</p>
        </div>
    `).join('');
}
// start 19-April-24-------------
function getHealthRecommendationContent(aqiLevel) {
    const recommendations = {
        good: [
            { img: "mask1.png", title: "Mask Usage", description: "If outdoor exposure is unavoidable, consider wearing a mask. Note that not all masks provide equal protection against particle pollution. Cloth or dust masks may fall short, but  well-fittedN95 or KN95 masks offer  better filtration capabilities and can be beneficial onhigh AQI days." },
            { img: "health_kit2.png", title: "Indoor Air Quality Maintenance", description: "Ensure healthy indoor air quality by keeping windows and doors closed. Opt for the recirculate setting on your air conditioning unit, use a portable HEPA air cleaner, or, in severe circumstances, create a clean room environment." },
            { img: "health_kit3.png", title: "Switching on your Air Purifier", description: "Reduce outdoor time to under 30 minutes during high AQI days and lower the intensity of outdoor activities. The longer and more strenuous the activity, the higher the risk of exposure to unhealthy air pollution levels, according to the EPA." },
        ],
        moderate: [
            { img: "mask1.png", title: "Mask Usage", description: "If outdoor exposure is unavoidable, consider wearing a mask. Note that not all masks provide equal protection against particle pollution. Cloth or dust masks may fall short, but  well-fittedN95 or KN95 masks offer  better filtration capabilities and can be beneficial onhigh AQI days." },
            { img: "health_kit2.png", title: "Indoor Air Quality Maintenance", description: "Ensure healthy indoor air quality by keeping windows and doors closed. Opt for the recirculate setting on your air conditioning unit, use a portable HEPA air cleaner, or, in severe circumstances, create a clean room environment." },
            { img: "health_kit3.png", title: "Switching on your Air Purifier", description: "Reduce outdoor time to under 30 minutes during high AQI days and lower the intensity of outdoor activities. The longer and more strenuous the activity, the higher the risk of exposure to unhealthy air pollution levels, according to the EPA." },
        ],
        unhealthyForSensitiveGroups: [
            { img: "mask1.png", title: "Wear a Mask if possible", description: "If outdoor exposure is unavoidable, consider wearing a mask. Note that not all masks provide equal protection against particle pollution. Cloth or dust masks may fall short, but  well-fittedN95 or KN95 masks offer  better filtration capabilities and can be beneficial onhigh AQI days." },
            { img: "health_kit2.png", title: "Its best to keep your windows closed", description: "Ensure healthy indoor air quality by keeping windows and doors closed. Opt for the recirculate setting on your air conditioning unit, use a portable HEPA air cleaner, or, in severe circumstances, create a clean room environment." },
            { img: "health_kit3.png", title: "Time to switch on your air purifiers", description: "Reduce outdoor time to under 30 minutes during high AQI days and lower the intensity of outdoor activities. The longer and more strenuous the activity, the higher the risk of exposure to unhealthy air pollution levels, according to the EPA." },
        ],
        unhealthy: [
            { img: "mask1.png", title: "Wearing a Mask is Advised", description: "If outdoor exposure is unavoidable, consider wearing a mask. Note that not all masks provide equal protection against particle pollution. Cloth or dust masks may fall short, but  well-fittedN95 or KN95 masks offer  better filtration capabilities and can be beneficial onhigh AQI days." },
            { img: "health_kit2.png", title: "Windows Should be Closed", description: "Ensure healthy indoor air quality by keeping windows and doors closed. Opt for the recirculate setting on your air conditioning unit, use a portable HEPA air cleaner, or, in severe circumstances, create a clean room environment." },
            { img: "health_kit3.png", title: "Best to Use an Air Purifier", description: "Reduce outdoor time to under 30 minutes during high AQI days and lower the intensity of outdoor activities. The longer and more strenuous the activity, the higher the risk of exposure to unhealthy air pollution levels, according to the EPA." },
        ],
        veryUnhealthy: [
            { img: "mask1.png", title: "Best to Wear a Mask", description: "If outdoor exposure is unavoidable, consider wearing a mask. Note that not all masks provide equal protection against particle pollution. Cloth or dust masks may fall short, but  well-fittedN95 or KN95 masks offer  better filtration capabilities and can be beneficial onhigh AQI days." },
            { img: "health_kit2.png", title: "Best to Keep Your Windows Closed", description: "Ensure healthy indoor air quality by keeping windows and doors closed. Opt for the recirculate setting on your air conditioning unit, use a portable HEPA air cleaner, or, in severe circumstances, create a clean room environment." },
            { img: "health_kit3.png", title: "Best to Use an Air Purifier", description: "Reduce outdoor time to under 30 minutes during high AQI days and lower the intensity of outdoor activities. The longer and more strenuous the activity, the higher the risk of exposure to unhealthy air pollution levels, according to the EPA." },
        ],
        hazardous: [
            { img: "mask1.png", title: "Best to Wear a Mask", description: "If outdoor exposure is unavoidable, consider wearing a mask. Note that not all masks provide equal protection against particle pollution. Cloth or dust masks may fall short, but  well-fittedN95 or KN95 masks offer  better filtration capabilities and can be beneficial onhigh AQI days." },
            { img: "health_kit2.png", title: "Best to Keep Your Windows Closed", description: "Ensure healthy indoor air quality by keeping windows and doors closed. Opt for the recirculate setting on your air conditioning unit, use a portable HEPA air cleaner, or, in severe circumstances, create a clean room environment." },
            { img: "health_kit3.png", title: "Best to Use an Air Purifier", description: "Reduce outdoor time to under 30 minutes during high AQI days and lower the intensity of outdoor activities. The longer and more strenuous the activity, the higher the risk of exposure to unhealthy air pollution levels, according to the EPA." },
        ],
        // Add definitions for other AQI levels...
    };
    return recommendations[aqiLevel].map(recommendation => `
        <li data-bs-toggle="modal" data-bs-target="#${recommendation.title.replace(/\s+/g, '')}" data-backdrop="false">
            <div class="bg-gray">
                <img src="./images/new-images/${recommendation.img}" alt="health-icon">
            </div>
            <p class="mask-hoverEffect">${recommendation.title}</p>
            <span>
                <img src="./images/new-images/Exclamation.png" alt="img">
            </span>
            <div class="modal fade" id="${recommendation.title.replace(/\s+/g, '')}" tabindex="-1"
                aria-labelledby="exampleModalLabel" aria-hidden="true"
                data-mdb-backdrop="false" data-mdb-keyboard="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div>
                            <button type="button" class="btn-close "
                                    data-bs-dismiss="modal"
                                    aria-label="Close">
                                <img src="./images/new-images/modal_close.png"
                                    alt="">
                            </button>
                        </div>
                        <div class="modal-body">
                            <img src="./images/new-images/Exaclamation-w.png"
                                alt="health-icon">
                            <p class="mask-use">${recommendation.title}</p>
                            <p> ${recommendation.description}  </p>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    `).join('');
}
// End 19-April-24-------------
function updateActivities(value) {
    const aqiLevel = getAQILevel(value);
    const content = getActivityContent(aqiLevel);
    $('.activities-imgs').empty().append(content);
    updateAQIImage(aqiLevel);
    updateInsightAQIImage(aqiLevel);
    updateSideBarAQIImage(aqiLevel)
}

function updateHeathReccommendation(value) {
    const aqiLevel = getAQILevel(value);
    const content = getHealthRecommendationContent(aqiLevel);
    $('.healthCommendation-content').empty().append(content);
}
function updateAQIImage(aqiLevel) {
    // Replace 'Circular-Shape.png' with appropriate image filenames
    var imageSrc = './images/new-images/';
    switch (aqiLevel) {
        case 'good':
            imageSrc += 'AQ-pattern_green.png';
            break;
        case 'moderate':
            imageSrc += 'AQ-pattern_lightorange.png';
            break;
        case 'unhealthyForSensitiveGroups':
            imageSrc += 'AQ-pattern_orange.png';
            break;
        case 'unhealthy':
            imageSrc += 'AQ-pattern_red.png';
            break;
        case 'veryUnhealthy':
            imageSrc += 'AQ-pattern_hazar.png';
            break;
        case 'hazardous':
            imageSrc += 'AQ-pattern_brown.png';
            break;
        default:
            imagePath += 'AQ-pattern_lightorange.png';
    }
    $('#aqiImage').attr('src', imageSrc);
}

function updateInsightAQIImage(aqiLevel) {
    // Replace 'Circular-Shape.png' with appropriate image filenames
    var imageSrc = './images/new-images/map/';
    switch (aqiLevel) {
        case 'good':
            imageSrc += 'mapCircular_green.png';
            break;
        case 'moderate':
            imageSrc += 'mapCircular_lightorange.png';
            break;
        case 'unhealthyForSensitiveGroups':
            imageSrc += 'mapCircular_orange.png';
            break;
        case 'unhealthy':
            imageSrc += 'mapCircular_red.png';
            break;
        case 'veryUnhealthy':
            imageSrc += 'mapCircular_hazar.png';
            break;
        case 'hazardous':
            imageSrc += 'mapCircular_brown.png';
            break;
        default:
            imagePath += 'mapCircular_lightorange.png';
    }
    $('#InsightaqiImage').attr('src', imageSrc);
}

function updateSideBarAQIImage(aqiLevel) {
    // Replace 'Circular-Shape.png' with appropriate image filenames
    var imageSrc = './images/new-images/map/';
    switch (aqiLevel) {
        case 'good':
            imageSrc += 'mapCircular_green.png';
            break;
        case 'moderate':
            imageSrc += 'mapCircular_lightorange.png';
            break;
        case 'unhealthyForSensitiveGroups':
            imageSrc += 'mapCircular_orange.png';
            break;
        case 'unhealthy':
            imageSrc += 'mapCircular_red.png';
            break;
        case 'veryUnhealthy':
            imageSrc += 'mapCircular_hazar.png';
            break;
        case 'hazardous':
            imageSrc += 'mapCircular_brown.png';
            break;
        default:
            imagePath += 'mapCircular_lightorange.png';
    }
    $('#sideBarAQIImage').attr('src', imageSrc);
}

// End Arisha pending to complete the content values
function updateCauses(station, pollutant) {
    const causesContainer = document.querySelector('.Causes-img');
    causesContainer.innerHTML = ''; // Clear existing causes

    const causes = causeStationData[station][pollutant];

    causes.forEach(cause => {
        // Create new elements for the cause
        const causeDiv = document.createElement('div');
        causeDiv.className = 'text-center';

        const image = document.createElement('img');
        image.src = `./images/new-images/${cause.image}`;
        causeDiv.appendChild(image);

        const paragraph = document.createElement('p');
        paragraph.className = 'mt-2';
        paragraph.textContent = cause.cause;
        causeDiv.appendChild(paragraph);

        // Add the new cause to the container
        causesContainer.appendChild(causeDiv);
    });
}

function updateLegendVisibility() {
    const pollutants = ['PM10', 'NO2', 'SO2', 'CO', 'O3']; // All possible pollutants
    pollutants.forEach(pollutant => {
        // Check if the selected station monitors this pollutant
        const legendDiv = document.getElementById(`legend-${pollutant}`);
        if (legendDiv) {
            legendDiv.style.display = currentStationDetails.measuredPolluants.includes(pollutant) ? '' : 'none'; // Show if monitored, hide otherwise
        }
    });
}

function handleApiError(error) {
    $('.page-loader').fadeOut('slow');
    console.error('Error fetching data:', error);
}

function getFormattedDate(dateValue) {
    const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    var day = dateValue.getDate();
    var month = dateValue.getMonth() + 1;
    var hours = dateValue.getHours();
    var hoursFormat = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    return weekDays[dateValue.getDay()] + ' ' + (day > 10 ? day : '0' + day) + '/' + (month > 10 ? month : '0' + month) + '/' + dateValue.getFullYear().toString().substring(-2) + ',<br>' + (hours = hours ? hours : 12) + ' ' + hoursFormat;
}

function getYearlyStationPollutantsThreshold() {
    $.ajax({
        url: baseUrl + 'GetYearlyStationPollutantsThreshold?input=' + currentStationDetails.stationId,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data[0]) {
                $("#numberOfHoursExceedsThresholdCO").text(data[0].co);
                $("#numberOfHoursExceedsThresholdSO2").text(data[0].sO2);
                $("#numberOfHoursExceedsThresholdPM10").text(data[0].pM10);
                $("#numberOfHoursExceedsThresholdNO2").text(data[0].nO2);
                $("#numberOfHoursExceedsThresholdO3").text(data[0].o3);
            } else {
                $("#numberOfHoursExceedsThresholdCO, #numberOfHoursExceedsThresholdSO2, #numberOfHoursExceedsThresholdPM10, #numberOfHoursExceedsThresholdNO2, #numberOfHoursExceedsThresholdO3").text('');
            }
        },
        error: handleApiError
    });
}

function onClickYearOfAirAnalytics(year) {
    var selectedYearEl = $('#selectedyear');
    selectedYearEl.html(year);
    selectedYearEl.append(`<span>
    <i class="fa fa-sort-desc"
    aria-hidden="true"></i>
</span>`);
    getAirAnalytics(year);
}

function getAirAnalytics(year) {
    const apiUrl = baseUrl + 'GetAirAnalytics?year=' + year + '&stationName=' + currentStationDetails.stationId;
    $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            if (!data || data.length === 0) {
                $('#radarChart').hide();
                return;
            }
            $('#radarChart').show();
            labelsData = [];
            pollutantLevels = [];
            colorCodesForAirAnalytics = [];
            data.forEach(item => {
                labelsData.push(item.month);
                pollutantLevels.push(item.aqi);
                colorCodesForAirAnalytics.push(item.colorCode);
            });

            let chartStatus = Chart.getChart("radarChart"); // <canvas> id
            if (chartStatus != undefined) {
                chartStatus.destroy();
            }
            var radarCtx = document.getElementById('radarChart').getContext('2d');
            var myRadarChart = new Chart(radarCtx, {
                type: 'radar',
                data: createRadarData(),
                options: radarOptions,
            });
            myRadarChart.update();
        },
        error: handleApiError
    });
}

function getLiveCityRankingApi() {
    $.ajax({
        url: baseUrl + 'GetStationRanking',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            liveCityData = data;
            currentStationDetails = stationsWithLocations.find(x => x.stationId == liveCityData[0].stationName);
            loadStationData(true);
        },
        error: handleApiError
    });
}
// Start 22-April-24 -------------
function bindLiveCityRanking() {
    // Clear existing rows
    $('#stationRankingList, #stationsDropdownMap').empty();
    var stationRankingListDiv = $('#stationRankingList');
    var stationsDropdownMapEl = $('#stationsDropdownMap');
    var stationDetails;
    $.each(liveCityData, function (index, station) {
        stationDetails = stationsWithLocations.find(x => x.stationId == station.stationName);
        if (stationDetails) {
            var colorCode = colorCodes[getColorClassForAqi(station.aqi)];
            station.name = stationDetails.stationName;
            station.distance = Math.round(calculateDistance(currentStationDetails.latitude, currentStationDetails.longitude, stationDetails.latitude, stationDetails.longitude));
            var row = `<label class="list-group-item">
                      <span class="numbers number" style="border-color:`+ colorCode + ` !important;">
                        <strong style="color:`+ colorCode + `;">` + station.rank + `</strong>
                      </span>
                      <div class="list-content">
                        <div class="inner_list-content">
                          <p>`+ station.name + `</p>
                          <p style="display: none;">`+ stationDetails.regionName + `</p> 
                          <span style="color:`+ colorCode + `;">AQI ` + station.aqi + `</span>
                        </div>
                        <div class="dis-content">
                          <span>~ `+ station.distance + ` km</span>
                        </div>
                      </div>
                      <input type="radio" name="options" id="`+ stationDetails.stationId + `" value="` + stationDetails.stationId + `" autocomplete="off" class="float-end" onClick="selectedStation('` + stationDetails.stationId + `')">
                    </label>`;
            stationRankingListDiv.append(row);
            stationsDropdownMapEl.append(`<li>
                <span class="station-name">`+ stationDetails.stationName + `</span> 
                <span class="region-name" style="display: none;">`+ stationDetails.regionName + `</span>
            </li>`);
        }
        // end 22-April-24 -------------
    });

    if (currentStationDetails.stationId) {
        $("#" + currentStationDetails.stationId).attr('checked', 'checked');
        stationDetails = currentStationDetails;
    }

    var airQualityIndexTooltipPollutantContent = '';
    stationDetails.measuredPolluants.forEach(item => {
        if (item != pollutantAbbrevations.Noise) {
            airQualityIndexTooltipPollutantContent += `<li>` + pollutantNames[item] + `<span class="blue-bold">
                    (`+ getPollutantWithUnits(item) + `)
                </span>
            </li>`;
        } else {
            airQualityIndexTooltipPollutantContent += `<li>` + item + `</li>`;
        }
    });

    $('.pollutantbar-title').text(stationDetails.stationName);
    $('.pollutantbar-address').text(stationDetails.stationLocation);
    $('.pollutantbar-details').empty();
    $('.pollutantbar-details').append(airQualityIndexTooltipPollutantContent);
}

// start 22-April-24 -----
$('.mapStationSearchScroll').on('click', 'li', function () {
    var stationName = $(this).find('.station-name').text();
    $(".show-mapSearchList").show().html(stationName);
    $('.Newsearch-box').hide();
});
// End 22-April-24 -----


function selectedStation(stationId) {
    currentStationDetails = stationsWithLocations.find(x => x.stationId == stationId);
    loadStationData();
}

function getAirQualitySafetyLevel() {
    $.ajax({
        url: baseUrl + 'GetDailyCountsAirQualityStation?input=' + currentStationDetails.stationId,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            var aqiStatusDiv = $("#aqiStatusDiv");
            var aqiDailyCountsDiv = $("#aqiDailyCountsDiv");
            var aqiSmallScreenDailyCounts = $("#aqiSmallScreenDailyCounts");
            aqiStatusDiv.empty();
            aqiDailyCountsDiv.empty();
            aqiSmallScreenDailyCounts.empty();
            aqiStatusDiv.append(airQualitySafetyLevelDivElements(data.averageGoodAQICount, statusClass.Good, colorClass.GoodColorClass));
            aqiStatusDiv.append(airQualitySafetyLevelDivElements(data.averageModerateAQICount, statusClass.Moderate, colorClass.ModrateColorClass));
            aqiStatusDiv.append(airQualitySafetyLevelDivElements(data.averageUnHealthlySensitiveGroupsAQICount, statusClass.UnHealthlySensitiveGroups, colorClass.Unhealthy4peopleColorClass));
            aqiStatusDiv.append(airQualitySafetyLevelDivElements(data.averageUnHealthlyAQICount, statusClass.UnHealthly, colorClass.UnhealthyColorClass));
            aqiStatusDiv.append(airQualitySafetyLevelDivElements(data.averageVeryUnHealthlyAQICount, statusClass.VeryUnHealthly, colorClass.VeryUnhealthyColorClass));
            aqiStatusDiv.append(airQualitySafetyLevelDivElements(data.averageHazardousAQICount, statusClass.Hazardous, colorClass.HazardousClass));
            aqiDailyCountsDiv.append(DailyCountsDataDivElements1(data.averageGoodAQICount, statusClass.Good, colorClass.GoodColorClass)); // start 19-April-24 changed function name due to counting animation
            aqiDailyCountsDiv.append(DailyCountsDataDivElements1(data.averageModerateAQICount, statusClass.Moderate, colorClass.ModrateColorClass)); // start 19-April-24 changed function name due to counting animation
            aqiDailyCountsDiv.append(DailyCountsDataDivElements1(data.averageUnHealthlySensitiveGroupsAQICount, statusClass.UnHealthlySensitiveGroups, colorClass.Unhealthy4peopleColorClass)); // start 19-April-24 changed function name due to counting animation
            aqiDailyCountsDiv.append(DailyCountsDataDivElements1(data.averageUnHealthlyAQICount, statusClass.UnHealthly, colorClass.UnhealthyColorClass)); // start 19-April-24 changed function name due to counting animation
            aqiDailyCountsDiv.append(DailyCountsDataDivElements1(data.averageVeryUnHealthlyAQICount, statusClass.VeryUnHealthly, colorClass.VeryUnhealthyColorClass)); // start 19-April-24 changed function name due to counting animation
            aqiDailyCountsDiv.append(DailyCountsDataDivElements1(data.averageHazardousAQICount, statusClass.Hazardous, colorClass.HazardousClass)); // start 19-April-24 changed function name due to counting animation

            // Append to aqiSmallScreenDailyCounts
            aqiSmallScreenDailyCounts.append(DailyCountsDataDivElements(data.averageGoodAQICount, statusClass.Good, colorClass.GoodColorClass));
            aqiSmallScreenDailyCounts.append(DailyCountsDataDivElements(data.averageModerateAQICount, statusClass.Moderate, colorClass.ModrateColorClass));
            aqiSmallScreenDailyCounts.append(DailyCountsDataDivElements(data.averageUnHealthlySensitiveGroupsAQICount, statusClass.UnHealthlySensitiveGroups, colorClass.Unhealthy4peopleColorClass));
            aqiSmallScreenDailyCounts.append(DailyCountsDataDivElements(data.averageUnHealthlyAQICount, statusClass.UnHealthly, colorClass.UnhealthyColorClass));
            aqiSmallScreenDailyCounts.append(DailyCountsDataDivElements(data.averageVeryUnHealthlyAQICount, statusClass.VeryUnHealthly, colorClass.VeryUnhealthyColorClass));
            aqiSmallScreenDailyCounts.append(DailyCountsDataDivElements(data.averageHazardousAQICount, statusClass.Hazardous, colorClass.HazardousClass));

        },
        error: handleApiError
    });
}
// start 19-April-24 ---------
function airQualitySafetyLevelDivElements(aqiValue, aqiStatus, aqiColorStatus) {
    // return `<div class="list-item ` + aqiColorStatus + `">
    //           <p>` + aqiValue + `</p>
    //           <span>` + aqiStatus + `</span>
    //  

    // Create a container for the count and status
    var container = $('<div class="list-item ' + aqiColorStatus + '"></div>');

    // Create a span element for the count
    var countSpan = $('<p></p>');

    // Append the count span to the container
    container.append(countSpan);

    // Append the status span to the container
    container.append('<span>' + aqiStatus + '</span>');

    // Append the container to the parent
    $("#aqiStatusDiv").append(container);

    // Use jQuery animate() function to animate the count
    $({ countNum: container.find('.count').text() }).animate({ countNum: aqiValue }, {
        duration: 4000,
        easing: 'linear',
        step: function () {
            // Update the count value
            countSpan.text(Math.floor(this.countNum));
        },
        complete: function () {
            // Update the count value when animation is complete
            countSpan.text(this.countNum);
        }
    });

}

function DailyCountsDataDivElements(aqiValue, aqiStatus, aqiColorStatus) {
    // return `<div class="col-4 col-sm-4 col-md-4 column ` + aqiColorStatus + `">
    //           <p>` + aqiValue + `</p>
    //           <span>` + aqiStatus + `</span>
    //         </div>`;


    // Create a container for the count and status
    var container = $('<div class="col-4 col-sm-4 col-md-4 column ' + aqiColorStatus + '"></div>');

    // Create a span element for the count
    var countSpan = $('<p></p>');

    // Append the count span to the container
    container.append(countSpan);

    // Append the status span to the container
    container.append('<span>' + aqiStatus + '</span>');

    // Append the container to the parent
    $("#aqiSmallScreenDailyCounts").append(container);

    // Use jQuery animate() function to animate the count
    $({ countNum: container.find('.count').text() }).animate({ countNum: aqiValue }, {
        duration: 4000,
        easing: 'linear',
        step: function () {
            // Update the count value
            countSpan.text(Math.floor(this.countNum));
        },
        complete: function () {
            // Update the count value when animation is complete
            countSpan.text(this.countNum);
        }
    });

}
function DailyCountsDataDivElements1(aqiValue, aqiStatus, aqiColorStatus) {
    return `<div class="col-4 col-sm-4 col-md-4 column ` + aqiColorStatus + `">
              <p>` + aqiValue + `</p>
              <span>` + aqiStatus + `</span>
            </div>`;

}
// End 19-April-24 ---------




function getStationChartApi(filter, initialRequest = false) {
    var url;
    switch (filter) {
        case chartFilter.Daily:
            url = baseUrl + 'GetDailyStationChart?stationName=' + currentStationDetails.stationId;
            break;
        case chartFilter.Monthly:
            url = baseUrl + 'GetMonthlyStationChart?stationName=' + currentStationDetails.stationId;
            break;
        case chartFilter.Yearly:
            url = baseUrl + 'GetYearlyStationChart?stationName=' + currentStationDetails.stationId;
            break;
        case chartFilter.Custom:
            var selectedDate = $('.datepicker').val();
            var splitDateArray = selectedDate.split('-');
            var formatedDate = splitDateArray[1] + '/' + splitDateArray[0] + '/' + splitDateArray[2];
            url = baseUrl + 'GetSelectedDateStationChart?selectedDate=' + formatedDate + '&stationName=' + currentStationDetails.stationId;
            break;
        default:
            url = baseUrl + 'GetHourlyStationChart?stationName=' + currentStationDetails.stationId;
            break;
    }
    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            chartData = data;
            bindStationDataToBarChart(filter);
            bindStationDataToLineChart(filter);
            if (initialRequest) {
                getCurrentLocation();
            }
        },
        error: handleApiError
    });
}

function bindStationDataToLineChart(filter) {
    var aqiData = [];
    var pm10Data = [];
    var so2Data = [];
    var coData = [];
    var o3Data = [];
    var no2Data = [];
    chartData.forEach(item => {
        aqiData.push(item.aqi);
        pm10Data.push(item.pM10);
        so2Data.push(item.sO2);
        coData.push(item.co);
        o3Data.push(item.o3);
        no2Data.push(item.nO2);
    });
    var categoriesData = [];
    $("#aqiHourlyLineChartDates, #pollutantHourlyLineChartDates,#pollutantHourlyBarChartDates").empty();
    switch (filter) {
        case chartFilter.Daily:
            //categoriesData = chartData.map(t => { return t.day.split(' '); });
            chartData.forEach(item => {
                categoriesData.push(item.day.split(' '));
            });
            break;
        case chartFilter.Monthly:
            chartData.forEach(item => {
                categoriesData.push(item.month);
            });
            //categoriesData = chartData.map(t => { return t.month; });
            break;
        case chartFilter.Yearly:
            //categoriesData = chartData.map(t => { return t.year; });
            chartData.forEach(item => {
                categoriesData.push(item.year);
            });
            break;
        case chartFilter.Custom:
            //categoriesData = chartData.map(t => { return t.hour.split(' '); });
            chartData.map(item => {
                const dateParts = item.recordedDate.split('/');
                const formattedDate = `${dateParts[2]}-${dateParts[0].padStart(2, '0')}-${dateParts[1].padStart(2, '0')}`;

                // Combine the formatted date with the hour, separated by a semicolon
                const formattedString = `${formattedDate};${item.hour}`;
                categoriesData.push(formattedString);
            });
            break;
        default:
            //categoriesData = chartData.map(t => { return t.hour.split(' '); });
            chartData.map(item => {
                const dateParts = item.recordedDate.split('/');
                const formattedDate = `${dateParts[2]}-${dateParts[0].padStart(2, '0')}-${dateParts[1].padStart(2, '0')}`;

                // Combine the formatted date with the hour, separated by a semicolon
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
    var lineChart = document.getElementById(pollutantLineChartId).getContext('2d');
    var gradientFill = lineChart.createLinearGradient(0, 0, 0, 300);
    gradientFill.addColorStop(0, 'rgba(156, 216, 78, 0.2)');
    gradientFill.addColorStop(0.5, 'rgba(250, 207, 57, 0.2)');
    gradientFill.addColorStop(1, 'rgba(249, 144, 73, 0.2)');

    let minDate = new Date();
    let maxDate = new Date();

    if (filter !== 'Monthly' && filter !== 'Daily' && filter !== 'Yearly') {
        const iso8601Dates = convertToISO8601(categoriesData);
        const dateTimes = iso8601Dates.map(entry => new Date(entry));
        if (dateTimes.length > 0) {
            let lastrefreshdate = dateTimes[dateTimes.length - 1].toLocaleString('en-US', { hour12: true, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
            $("#StAQIlastrefreshtime").text(lastrefreshdate)
            minDate = new Date(Math.min(...dateTimes));
            maxDate = new Date(Math.max(...dateTimes));

        }
        minDateString = minDate.toISOString().split('T')[0];
        maxDateString = maxDate.toISOString().split('T')[0];
        var myChart = new Chart(lineChart, {
            type: 'line',
            data: {
                labels: iso8601Dates, // Add your labels here
                datasets: [{
                    label: '', // Optional: add your series name
                    data: aqiData, // Add your data points here
                    backgroundColor: gradientFill,
                    borderColor: function (context) {
                        const chart = context.chart;
                        const { ctx, chartArea } = chart;

                        if (!chartArea) {
                            // This case happens on initial chart load
                            return null;
                        }
                        var gradientStroke = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                        gradientStroke.addColorStop(0, '#9CD84E');
                        gradientStroke.addColorStop(0.5, 'yellow');
                        gradientStroke.addColorStop(1, '#F99049');

                        return gradientStroke;
                    },
                    pointBackgroundColor: 'white',
                    fill: false,
                    tension: 0.4,
                    pointRadius: 0
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,
                toolbar: {
                    show: false,
                    tools: {
                        download: false,
                    }
                },
                plugins: {
                    legend: {
                        display: false // This hides the legend
                    },
                    title: {
                        display: true,
                        // text: 'Chart.js Bar Chart - Stacked'
                    },
                    tooltip: {
                        enabled: false,
                        external: function (context) {
                            // Check if the tooltip is active (hovering)
                            if (context.tooltip.opacity === 0) {
                                /*$("#lineChartAqiSo2Value, #lineChartAqiNo2Value, #lineChartAqiCoValue, #lineChartAqiPm10Value, #lineChartAqiO3Value").text('');	*/
                                updatePollutantValues();
                            } else {
                                // Call the custom function to update the values
                                updatePollutantValues(context.tooltip.dataPoints);
                            }
                        }
                    },
                },
                interaction: {
                    intersect: false,
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'hour',
                            // Format for tooltip display
                            tooltipFormat: 'hh:mm a'
                        },
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 20
                        },
                        grid: {
                            display: false
                        },
                        //reverse: true
                    },
                    x2: {
                        type: 'time',
                        time: {
                            unit: 'day',
                            // Format for tooltip and tick display
                            tooltipFormat: 'MMM d',
                            displayFormats: {
                                day: 'MMM d'
                            }
                        },
                        position: 'bottom',
                        ticks: {
                            // Auto-skip prevents label overlapping.
                            autoSkip: true,
                            // Max 20 ticks, adjust as needed.
                            maxTicksLimit: 20
                        },
                        grid: {
                            drawOnChartArea: false
                        },
                        //  reverse: true,
                        min: minDateString,
                        max: maxDateString
                    },
                    y: {
                        stacked: true,
                        grid: {
                            display: false
                        }
                    },
                },
            },

        });
    }
    else {
        var myChart = new Chart(lineChart, {
            type: 'line',
            data: {
                labels: categoriesData,
                datasets: [{
                    label: '',
                    data: aqiData,
                    pointHoverRadius: 5,
                    backgroundColor: gradientFill,
                    borderColor: function (context) {
                        const chart = context.chart;
                        const { ctx, chartArea } = chart;

                        if (!chartArea) {
                            return null;
                        }
                        var gradientStroke = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                        gradientStroke.addColorStop(0, '#9CD84E');
                        gradientStroke.addColorStop(0.5, 'yellow');
                        gradientStroke.addColorStop(1, '#F99049');

                        return gradientStroke;
                    },
                    pointBackgroundColor: 'white',
                    fill: false,
                    tension: 0.4,
                    pointRadius: 0,
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,
                toolbar: {
                    show: false,
                    tools: {
                        download: false,
                    }
                },
                plugins: {
                    legend: {
                        display: false // This hides the legend
                    },
                    title: {
                        display: true,
                    },
                    tooltip: {
                        enabled: false,
                        external: function (context) {
                            // Check if the tooltip is active (hovering)
                            if (context.tooltip.opacity === 0) {
                                // Clear the values when not hovering
                                /* $("#lineChartAqiSo2Value, #lineChartAqiNo2Value, #lineChartAqiCoValue, #lineChartAqiPm10Value, #lineChartAqiO3Value").text('');*/
                                updatePollutantValues();
                            } else {
                                // Call the custom function to update the values
                                updatePollutantValues(context.tooltip.dataPoints);
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                },
                scales: {
                    x: {
                        ticks: {
                            maxRotation: 0,
                            minRotation: 0
                        },
                        grid: {
                            display: false, // This will remove the Y-axis grid lines
                            drawBorder: false, // Optional: if you also want to remove the axis border
                        },
                        stacked: true,
                    },
                    y: { // Corrected from 'yAxes' to 'y' for Chart.js version 3.x syntax
                        stacked: true,
                        grid: {
                            display: false, // This will remove the Y-axis grid lines
                            drawBorder: false, // Optional: if you also want to remove the axis border
                        },// Assuming you want the Y-axis stacked as well
                    },

                },
            }

        });
    }
    updatePollutantValues();
    myChart.update();
    var pollutantsLineChartId = "pollutantLineChart";
    var chartStatus = Chart.getChart(pollutantsLineChartId); // <canvas> id
    if (chartStatus != undefined) {
        chartStatus.destroy();
    }
    const pollutantLineChart = document.getElementById(pollutantsLineChartId).getContext('2d');


    if (filter !== 'Monthly' && filter !== 'Daily' && filter !== 'Yearly') {
        const iso8601Dates = convertToISO8601(categoriesData);
        const dateTimes = iso8601Dates.map(entry => new Date(entry));
        if (dateTimes.length > 0) {
            let lastrefreshdate = dateTimes[dateTimes.length - 1].toLocaleString('en-US', { hour12: true, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
            $("#StAQIlastrefreshtime").text(lastrefreshdate)
            minDate = new Date(Math.min(...dateTimes));
            maxDate = new Date(Math.max(...dateTimes));

        }
        minDateString = minDate.toISOString().split('T')[0];
        maxDateString = maxDate.toISOString().split('T')[0];
        const myPollutantChart = new Chart(pollutantLineChart, {
            type: 'line',
            data: {
                labels: iso8601Dates,
                datasets: [
                    {
                        label: 'PM₁₀',
                        data: pm10Data,
                        backgroundColor: 'rgba(0, 75, 135, 1)',
                        borderColor: 'rgba(0, 75, 135, 1)',
                        pointRadius: 0,
                        pointHoverRadius: 5,
                        tension: 0.4,
                        borderWidth: 3
                    },
                    {
                        label: 'SO₂',
                        data: so2Data,
                        backgroundColor: 'rgba(0, 75, 135, 0.8)',
                        borderColor: 'rgba(0, 75, 135, 0.8)',
                        pointRadius: 0,
                        pointHoverRadius: 5,
                        tension: 0.4,
                        borderWidth: 3
                    },
                    {
                        label: 'CO',
                        data: coData,
                        backgroundColor: 'rgba(0, 75, 135, 0.6)',
                        borderColor: 'rgba(0, 75, 135, 0.6)',
                        pointRadius: 0,
                        pointHoverRadius: 5,
                        tension: 0.4,
                        borderWidth: 3
                    },
                    {
                        label: 'O₃',
                        data: o3Data,
                        backgroundColor: 'rgba(0, 75, 135, 0.4)',
                        borderColor: 'rgba(0, 75, 135, 0.4)',
                        pointRadius: 0,
                        pointHoverRadius: 5,
                        tension: 0.4,
                        borderWidth: 3
                    },
                    {
                        label: 'NO₂',
                        data: no2Data,
                        backgroundColor: 'rgba(0, 75, 135, 0.2)',
                        borderColor: 'rgba(0, 75, 135, 0.2)',
                        pointRadius: 0,
                        pointHoverRadius: 5,
                        tension: 0.4,
                        borderWidth: 3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 40,
                            boxWidth: 8,
                            boxHeight: 8,
                            borderWidth: 0,
                            color: '#666',
                            //generateLabels: function (chart) {
                            //    const labels = Chart.defaults.plugins.legend.labels.generateLabels(chart);
                            //    return labels.map(label => {
                            //        const isHidden = chart.getDatasetMeta(label.datasetIndex).hidden;
                            //        label.textStyle = isHidden ? 'disabled' : 'normal';
                            //        return label;
                            //    });
                            //}
                        },
                        onClick: function (e, legendItem, legend) {
                            const index = legendItem.datasetIndex;
                            const chart = legend.chart;
                            const meta = chart.getDatasetMeta(index);
                            meta.hidden = meta.hidden === null ? !chart.data.datasets[index].hidden : null;

                            chart.update();

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
                        external: function (context) {

                            if (context.tooltip.opacity === 0) {
                                /*$("#lineChartPollutantSo2Value, #lineChartPollutantNo2Value, #lineChartPollutantCoValue, #lineChartPollutantPm10Value, #lineChartPollutantO3Value").text('');
                                return;*/
                                updateAllPollutantValues();
                                return;
                            }

                            context.tooltip.dataPoints.forEach(function (tooltipItem) {
                                const dataIndex = tooltipItem.dataIndex;
                                const datasetIndex = tooltipItem.datasetIndex;
                                const dataPoint = context.chart.data.datasets[datasetIndex].data[dataIndex];
                                //console.log(dataPoint); // This should show you the actual data structure of a point
                                //.log(dataPoint.pM10); 
                                switch (datasetIndex) {
                                    case 0:
                                        // console.log(context.chart.data.datasets[0].data[0].pm10);
                                        $("#lineChartPollutantPm10Value").text(dataPoint);
                                        break;
                                    case 1:
                                        $("#lineChartPollutantSo2Value").text(dataPoint);
                                        break;
                                    case 2:
                                        $("#lineChartPollutantCoValue").text(dataPoint);
                                        break;
                                    case 3:
                                        $("#lineChartPollutantO3Value").text(dataPoint);
                                        break;
                                    case 4:
                                        $("#lineChartPollutantNo2Value").text(dataPoint);
                                        break;
                                }
                            });
                        },
                        callbacks: {
                            //title: function (tooltipItems) {                               
                            //    //let fullTimestamp = tooltipItems[0].label;
                            //    //let hourMatch = fullTimestamp.match(/\b(\d+):/);
                            //    //let meridiemMatch = fullTimestamp.match(/(a\.m\.|p\.m\.)/i);
                            //    //let hour = hourMatch ? parseInt(hourMatch[1], 10) : 0;
                            //    //let meridiem = meridiemMatch ? meridiemMatch[0].toUpperCase().replace(/\./g, '') : 'AM';
                            //    //hour = hour === 0 ? 12 : hour;
                            //    //hour = hour < 10 ? '0' + hour : hour;
                            //    //return `${hour} ${meridiem}`;
                            //    return '';
                            //},
                            label: function () {
                                return null;
                            }

                        }
                    },
                },
                interaction: {
                    mode: 'nearest', // The mode 'nearest' makes sure the point closest to the mouse gets highlighted
                    axis: 'x', // You can set 'y' if you want the hover effect when close to the y-axis instead
                    intersect: false // This allows for showing the hover effect even if not directly over a point
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'hour',
                            tooltipfirmat: 'HH:mm a',
                            displayFormats: {
                                hour: 'hh a'
                            }
                        },
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 20

                        },
                        grid: {
                            display: false
                        },
                        //reverse: true,

                    },
                    x1: {
                        id: 'x1',
                        type: 'time',
                        position: 'bottom',
                        time: {
                            unit: 'day',
                            tooltipFormat: 'MMM d',
                            displayFormats: {
                                day: 'MMM d'
                            }
                        },
                        grid: {
                            display: false
                        },
                        ticks: {
                            // Auto-skip prevents label overlapping.
                            autoSkip: true,
                            // Max 20 ticks, adjust as needed.
                            maxTicksLimit: 20
                        },
                        //reverse: true,
                        min: minDateString,
                        max: maxDateString
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        beginAtZero: true
                    },
                },
            },
        });
        updateAllPollutantValues();
        myPollutantChart.update();
    }
    else {
        const myPollutantChart = new Chart(pollutantLineChart, {
            type: 'line', // Specify the chart type
            data: {
                labels: categoriesData, // X-axis categories go here
                datasets: [
                    {
                        label: 'PM₁₀',
                        data: pm10Data,
                        backgroundColor: 'rgba(0, 75, 135, 1)',
                        borderColor: 'rgba(0, 75, 135, 1)',
                        pointRadius: 0,
                        pointHoverRadius: 5,
                        borderWidth: 2,
                    },
                    {
                        label: 'SO₂',
                        data: so2Data,
                        backgroundColor: 'rgba(0, 75, 135, 0.8)',
                        borderColor: 'rgba(0, 75, 135, 0.8)',
                        pointRadius: 0,
                        pointHoverRadius: 5,
                        borderWidth: 2
                    },
                    {
                        label: 'CO',
                        data: coData,
                        backgroundColor: 'rgba(0, 75, 135, 0.6)',
                        borderColor: 'rgba(0, 75, 135, 0.6)',
                        pointRadius: 0,
                        pointHoverRadius: 5,
                        borderWidth: 2
                    },
                    {
                        label: 'O₃',
                        data: o3Data,
                        backgroundColor: 'rgba(0, 75, 135, 0.4)',
                        borderColor: 'rgba(0, 75, 135, 0.4)',
                        pointRadius: 0,
                        pointHoverRadius: 5,
                        borderWidth: 2
                    },
                    {
                        label: 'NO₂',
                        data: no2Data,
                        backgroundColor: 'rgba(0, 75, 135, 0.2)',
                        borderColor: 'rgba(0, 75, 135, 0.2)',
                        pointRadius: 0,
                        pointHoverRadius: 5,
                        borderWidth: 2
                    }
                ]

            },
            options: {

                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 60,
                            boxWidth: 8,
                            boxHeight: 8,
                            color: '#666',

                            //generateLabels: function (chart) {
                            //    const labels = Chart.defaults.plugins.legend.labels.generateLabels(chart);
                            //    return labels.map(label => {                                   
                            //        const isHidden = chart.getDatasetMeta(label.datasetIndex).hidden;                                   
                            //        label.textStyle = isHidden ? 'disabled' : 'normal';
                            //        return label;
                            //    });
                            //}
                        },
                        onClick: function (e, legendItem, legend) {
                            const index = legendItem.datasetIndex;
                            const chart = legend.chart;
                            const meta = chart.getDatasetMeta(index);

                            // Toggle the visibility of the dataset
                            meta.hidden = !meta.hidden;

                            // Trigger an update to show/hide the data and adjust legend appearance
                            chart.update();
                        },
                    },
                    tooltip: {
                        enabled: false,
                        external: function (context) {

                            if (context.tooltip.opacity === 0) {
                                /*$("#lineChartPollutantSo2Value, #lineChartPollutantNo2Value, #lineChartPollutantCoValue, #lineChartPollutantPm10Value, #lineChartPollutantO3Value").text('');
                                return;*/
                                updateAllPollutantValues();
                                return;
                            }

                            context.tooltip.dataPoints.forEach(function (tooltipItem) {
                                const dataIndex = tooltipItem.dataIndex;
                                const datasetIndex = tooltipItem.datasetIndex;
                                const dataPoint = context.chart.data.datasets[datasetIndex].data[dataIndex];
                                //console.log(dataPoint); // This should show you the actual data structure of a point
                                //.log(dataPoint.pM10); 
                                switch (datasetIndex) {
                                    case 0:
                                        // console.log(context.chart.data.datasets[0].data[0].pm10);
                                        $("#lineChartPollutantPm10Value").text(dataPoint);
                                        break;
                                    case 1:
                                        $("#lineChartPollutantSo2Value").text(dataPoint);
                                        break;
                                    case 2:
                                        $("#lineChartPollutantCoValue").text(dataPoint);
                                        break;
                                    case 3:
                                        $("#lineChartPollutantO3Value").text(dataPoint);
                                        break;
                                    case 4:
                                        $("#lineChartPollutantNo2Value").text(dataPoint);
                                        break;
                                }
                            });
                        },
                        callbacks: {
                            //title: function (tooltipItems) {                               
                            //    //let fullTimestamp = tooltipItems[0].label;
                            //    //let hourMatch = fullTimestamp.match(/\b(\d+):/);
                            //    //let meridiemMatch = fullTimestamp.match(/(a\.m\.|p\.m\.)/i);
                            //    //let hour = hourMatch ? parseInt(hourMatch[1], 10) : 0;
                            //    //let meridiem = meridiemMatch ? meridiemMatch[0].toUpperCase().replace(/\./g, '') : 'AM';
                            //    //hour = hour === 0 ? 12 : hour;
                            //    //hour = hour < 10 ? '0' + hour : hour;
                            //    //return `${hour} ${meridiem}`;
                            //    return '';
                            //},
                            label: function () {
                                return null;
                            }

                        }
                    },
                },
                interaction: {
                    mode: 'nearest', // The mode 'nearest' makes sure the point closest to the mouse gets highlighted
                    axis: 'x', // You can set 'y' if you want the hover effect when close to the y-axis instead
                    intersect: false // This allows for showing the hover effect even if not directly over a point
                },
                scales: {
                    x: {
                        ticks: {
                            maxRotation: 0,
                            minRotation: 0
                        },
                        grid: {
                            display: false, // This will remove the Y-axis grid lines
                            drawBorder: false, // Optional: if you also want to remove the axis border
                        },
                        stacked: true,
                    },
                    y: { // Corrected from 'yAxes' to 'y' for Chart.js version 3.x syntax
                        stacked: true,
                        grid: {
                            display: false, // This will remove the Y-axis grid lines
                            drawBorder: false, // Optional: if you also want to remove the axis border
                        },// Assuming you want the Y-axis stacked as well
                    },

                },
            }
        });
        updateAllPollutantValues();
        myPollutantChart.update();
    }

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
    var o3 = chartData[index].o3;

    // Update the text of the corresponding DOM elements with the pollutant values
    $("#lineChartAqiSo2Value").text(so2);
    $("#lineChartAqiNo2Value").text(no2);
    $("#lineChartAqiCoValue").text(co);
    $("#lineChartAqiPm10Value").text(pm10);
    $("#lineChartAqiO3Value").text(o3);
}

function updateAllPollutantValues(tooltipItems) {
    var index = chartData.length - 1;
    if (tooltipItems != undefined) {
        index = tooltipItems[0].dataIndex;
    }

    // Retrieve data for all pollutants
    var so2 = chartData[index].sO2;
    var no2 = chartData[index].nO2;
    var co = chartData[index].co;
    var pm10 = chartData[index].pM10;
    var o3 = chartData[index].o3;
    // Update the text of the corresponding DOM elements with the pollutant values
    $("#lineChartPollutantSo2Value").text(so2);
    $("#lineChartPollutantNo2Value").text(no2);
    $("#lineChartPollutantCoValue").text(co);
    $("#lineChartPollutantPm10Value").text(pm10);
    $("#lineChartPollutantO3Value").text(o3);
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
    switch (activePollutant) {
        case pollutantAbbrevations.PM10:
            switch (filter) {
                case "Daily":
                    chartData.forEach(item => {
                        if (item.pM10 > pollutantThresholdLimits.PM10Daily) {
                            barChartData.push(item.pM10 - pollutantThresholdLimits.PM10Daily);
                            thresholdData.push(pollutantThresholdLimits.PM10Daily);
                        } else {
                            barChartData.push(0);
                            thresholdData.push(item.pM10);
                        }
                        categoriesData.push(item.day.split(' '));

                    });
                    backgroundColors.push('#F65E5F');
                    barChartDataSet.push({
                        label: '',
                        backgroundColor: '#004B87',
                        lineTension: 0.2,
                        data: thresholdData,
                        borderRadius: 3
                    });
                    break;
                case "Monthly":
                    chartData.forEach(item => {
                        barChartData.push(item.pM10);
                        categoriesData.push(item.month);
                    });
                    backgroundColors.push('#004B87');
                    break;
                case "Yearly":
                    chartData.forEach(item => {
                        barChartData.push(item.pM10);
                        categoriesData.push(item.year);
                    });
                    backgroundColors.push('#004B87');
                    break;
                default:
                    chartData.forEach(item => {
                        barChartData.push(item.pM10);
                        const dateParts = item.recordedDate.split('/');
                        const formattedDate = `${dateParts[2]}-${dateParts[0].padStart(2, '0')}-${dateParts[1].padStart(2, '0')}`;

                        // Combine the formatted date with the hour, separated by a semicolon
                        const formattedString = `${formattedDate};${item.hour}`;
                        categoriesData.push(formattedString);
                    });
                    backgroundColors.push('#004B87');
                    break;
            }
            barChartDataSet.push({
                label: '',
                backgroundColor: backgroundColors,
                lineTension: 0.2,
                data: barChartData,
                borderRadius: 3
            });
            pollutantBarChartId = "ADstationPm10BarGraph";
            pollutantBarChartId1 = "ADstationPm10BarGraph1";
            boxid = "pm10Barchart1";
            boxid1 = "pm10Barchart";
            boxid2 = "pm10Barchartinner";
            lastrefreshtime = "pm10lastrefreshtime";
            break;
        case pollutantAbbrevations.SO2:
            switch (filter) {
                case "Daily":
                    chartData.forEach(item => {
                        if (item.sO2 > pollutantThresholdLimits.SO2Daily) {
                            barChartData.push(item.sO2 - pollutantThresholdLimits.SO2Daily);
                            thresholdData.push(pollutantThresholdLimits.SO2Daily);
                        } else {
                            //barChartData.push(0);
                            thresholdData.push(item.sO2);
                        }
                        categoriesData.push(item.day.split(' '));
                    });
                    backgroundColors.push('#F65E5F');
                    barChartDataSet.push({
                        label: '',
                        backgroundColor: '#004B87',
                        lineTension: 0.2,
                        data: thresholdData,
                        borderRadius: 3
                    });
                    break;
                case "Monthly":
                    chartData.forEach(item => {
                        barChartData.push(item.sO2);
                        categoriesData.push(item.month);
                    });
                    backgroundColors.push('#004B87');
                    break;
                case "Yearly":
                    chartData.forEach(item => {
                        if (item.sO2 > pollutantThresholdLimits.SO2Yearly) {
                            barChartData.push(item.sO2 - pollutantThresholdLimits.SO2Yearly);
                            thresholdData.push(pollutantThresholdLimits.SO2Yearly);
                        } else {
                            //barChartData.push(0);
                            thresholdData.push(item.sO2);
                        }
                        categoriesData.push(item.year);
                    });
                    backgroundColors = ['#F65E5F'];
                    barChartDataSet.push({
                        label: '',
                        backgroundColor: '#004B87',
                        lineTension: 0.2,
                        data: thresholdData,
                        borderRadius: 3
                    });
                    break;
                default:
                    chartData.forEach(item => {
                        if (item.sO2 > pollutantThresholdLimits.SO2Hourly) {
                            barChartData.push(item.sO2 - pollutantThresholdLimits.SO2Hourly);
                            thresholdData.push(pollutantThresholdLimits.SO2Hourly);
                        } else {
                            // barChartData.push();
                            thresholdData.push(item.sO2);
                        }
                        const dateParts = item.recordedDate.split('/');
                        const formattedDate = `${dateParts[2]}-${dateParts[0].padStart(2, '0')}-${dateParts[1].padStart(2, '0')}`;

                        // Combine the formatted date with the hour, separated by a semicolon
                        const formattedString = `${formattedDate};${item.hour}`;
                        categoriesData.push(formattedString);
                    });
                    backgroundColors.push('#F65E5F');
                    barChartDataSet.push({
                        label: '',
                        backgroundColor: '#004B87',
                        lineTension: 0.2,
                        data: thresholdData,
                        borderRadius: 3
                    });
                    break;
            }
            barChartDataSet.push({
                label: '',
                backgroundColor: backgroundColors,
                lineTension: 0.2,
                data: barChartData,
                borderRadius: 3
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
                    chartData.forEach(item => {
                        barChartData.push(item.co);
                        categoriesData.push(item.day.split(' '));
                    });
                    backgroundColors.push('#004B87');
                    break;
                case "Monthly":
                    chartData.forEach(item => {
                        barChartData.push(item.co);
                        categoriesData.push(item.month);
                    });
                    backgroundColors.push('#004B87');
                    break;
                case "Yearly":
                    chartData.forEach(item => {
                        barChartData.push(item.co);
                        categoriesData.push(item.year);
                    });
                    backgroundColors.push('#004B87');
                    break;
                default:
                    chartData.forEach(item => {
                        if (item.co > pollutantThresholdLimits.COHourly) {
                            barChartData.push(item.co - pollutantThresholdLimits.COHourly);
                            thresholdData.push(pollutantThresholdLimits.COHourly);
                        } else {
                            //barChartData.push(0);
                            thresholdData.push(item.co);
                        }
                        const dateParts = item.recordedDate.split('/');
                        const formattedDate = `${dateParts[2]}-${dateParts[0].padStart(2, '0')}-${dateParts[1].padStart(2, '0')}`;

                        // Combine the formatted date with the hour, separated by a semicolon
                        const formattedString = `${formattedDate};${item.hour}`;
                        categoriesData.push(formattedString);
                    });
                    backgroundColors.push('#F65E5F');
                    barChartDataSet.push({
                        label: '',
                        backgroundColor: '#004B87',
                        lineTension: 0.2,
                        data: thresholdData,
                        borderRadius: 3
                    });
                    break;
            }
            barChartDataSet.push({
                label: '',
                backgroundColor: backgroundColors,
                lineTension: 0.2,
                data: barChartData,
                borderRadius: 3
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
                    chartData.forEach(item => {
                        barChartData.push(item.o3);
                        categoriesData.push(item.day.split(' '));
                    });
                    backgroundColors.push('#004B87');
                    break;
                case "Monthly":
                    chartData.forEach(item => {
                        barChartData.push(item.o3);
                        categoriesData.push(item.month);
                    });
                    backgroundColors.push('#004B87');
                    break;
                case "Yearly":
                    chartData.forEach(item => {
                        barChartData.push(item.o3);
                        categoriesData.push(item.year);
                    });
                    backgroundColors.push('#004B87');
                    break;
                default:
                    chartData.forEach(item => {
                        if (item.o3 > pollutantThresholdLimits.O3Hourly) {
                            barChartData.push(item.o3 - pollutantThresholdLimits.O3Hourly);
                            thresholdData.push(pollutantThresholdLimits.O3Hourly);
                        } else {
                            // barChartData.push(0);
                            thresholdData.push(item.o3);
                        }
                        const dateParts = item.recordedDate.split('/');
                        const formattedDate = `${dateParts[2]}-${dateParts[0].padStart(2, '0')}-${dateParts[1].padStart(2, '0')}`;

                        // Combine the formatted date with the hour, separated by a semicolon
                        const formattedString = `${formattedDate};${item.hour}`;
                        categoriesData.push(formattedString);
                    });
                    backgroundColors = ['#F65E5F'];
                    barChartDataSet.push({
                        label: '',
                        backgroundColor: '#004B87',
                        lineTension: 0.2,
                        data: thresholdData,
                        borderRadius: 3
                    });
                    break;
            }
            barChartDataSet.push({
                label: '',
                backgroundColor: backgroundColors,
                lineTension: 0.2,
                data: barChartData,
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
                    chartData.forEach(item => {
                        if (item.nO2 > pollutantThresholdLimits.NO2Daily) {
                            barChartData.push(item.nO2 - pollutantThresholdLimits.NO2Daily);
                            thresholdData.push(pollutantThresholdLimits.NO2Daily);
                        } else {
                            //  barChartData.push(0);
                            thresholdData.push(item.nO2);
                        }
                        categoriesData.push(item.day.split(' '));
                    });
                    backgroundColors.push('#F65E5F');
                    barChartDataSet.push({
                        label: '',
                        backgroundColor: '#004B87',
                        lineTension: 0.2,
                        data: thresholdData,
                        borderRadius: 3
                    });
                    break;
                case "Monthly":
                    chartData.forEach(item => {
                        barChartData.push(item.nO2);
                        categoriesData.push(item.month);
                    });
                    backgroundColors.push('#004B87');
                    break;
                case "Yearly":
                    chartData.forEach(item => {
                        barChartData.push(item.nO2);
                        categoriesData.push(item.year);
                    });
                    backgroundColors.push('#004B87');
                    break;
                default:
                    chartData.forEach(item => {
                        if (item.nO2 > pollutantThresholdLimits.NO2Hourly) {
                            barChartData.push(item.nO2 - pollutantThresholdLimits.NO2Hourly);
                            thresholdData.push(pollutantThresholdLimits.NO2Hourly);
                        } else {
                            // barChartData.push(0);
                            thresholdData.push(item.nO2);
                        }
                        const dateParts = item.recordedDate.split('/');
                        const formattedDate = `${dateParts[2]}-${dateParts[0].padStart(2, '0')}-${dateParts[1].padStart(2, '0')}`;

                        // Combine the formatted date with the hour, separated by a semicolon
                        const formattedString = `${formattedDate};${item.hour}`;
                        categoriesData.push(formattedString);
                    });
                    backgroundColors = ['#F65E5F'];
                    barChartDataSet.push({
                        label: '',
                        backgroundColor: '#004B87',
                        lineTension: 0.2,
                        data: thresholdData,
                        borderRadius: 3
                    });
                    break;
            }
            barChartDataSet.push({
                label: '',
                backgroundColor: backgroundColors,
                lineTension: 0.2,
                data: barChartData,
                borderRadius: 3
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
                    chartData.forEach(item => {
                        barChartData.push(item.aqi);
                        categoriesData.push(item.day.split(' '));
                        backgroundColors.push(colorCodes[getColorClassForAqi(item.aqi)]);
                    });
                    break;
                case "Monthly":
                    chartData.forEach(item => {
                        barChartData.push(item.aqi);
                        categoriesData.push(item.month);
                        backgroundColors.push(colorCodes[getColorClassForAqi(item.aqi)]);
                    });
                    break;
                case "Yearly":
                    chartData.forEach(item => {
                        barChartData.push(item.aqi);
                        categoriesData.push(item.year);
                        backgroundColors.push(colorCodes[getColorClassForAqi(item.aqi)]);
                    });
                    break;
                default:
                    chartData.forEach(item => {
                        // Convert "MM/DD/YYYY" to "YYYY-MM-DD"
                        const dateParts = item.recordedDate.split('/');
                        const formattedDate = `${dateParts[2]}-${dateParts[0].padStart(2, '0')}-${dateParts[1].padStart(2, '0')}`;

                        // Combine the formatted date with the hour, separated by a semicolon
                        const formattedString = `${formattedDate};${item.hour}`;
                        barChartData.push(item.aqi);
                        categoriesData.push(formattedString);
                        backgroundColors.push(colorCodes[getColorClassForAqi(item.aqi)]);
                    });
                    break;
            }
            barChartDataSet = [{
                label: '',
                backgroundColor: backgroundColors,
                lineTension: 0.2,
                data: barChartData,
                borderRadius: 3
            }];
            pollutantBarChartId = "ADstationAqiBarGraph";
            pollutantBarChartId1 = "ADstationAqiBarGraph1"
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
    } if (chartStatus1 != undefined) {
        chartStatus1.destroy();
    }
    var barChart = document.getElementById(pollutantBarChartId).getContext('2d');
    var barChart1 = document.getElementById(pollutantBarChartId1).getContext('2d');
    /* const box = document.querySelector('.canvas-graphs-barchart1');
    const box1 = document.querySelector('.canvas-graphs-barchart');
    const box3 = document.querySelector('.canvas-graphs-Innerdiv'); */

    const box = document.getElementById(boxid);
    const box1 = document.getElementById(boxid1);
    const box3 = document.getElementById(boxid2);
    // Getting min and max dates from the dataset
    // Define the media query string
    var mediaQuery = "(min-width: 768px) and (max-width: 1199px)";
    // Test the media query
    var mql = window.matchMedia(mediaQuery);
    let minDate = new Date();
    let maxDate = new Date();

    var mediaQuery1 = "(min-width: 320px) and (max-width: 767px)";
    // Test the media query
    var mql1 = window.matchMedia(mediaQuery1);
    if (filter !== 'Monthly' && filter !== 'Daily' && filter !== 'Yearly') {
        const iso8601Dates = convertToISO8601(categoriesData);
        const dateTimes = iso8601Dates.map(entry => new Date(entry));
        if (dateTimes.length > 0) {
            let lastrefreshdate = dateTimes[dateTimes.length - 1].toLocaleString('en-US', { hour12: true, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
            $("#" + lastrefreshtime).text(lastrefreshdate);
            minDate = new Date(Math.min(...dateTimes));
            maxDate = new Date(Math.max(...dateTimes));

        }
        minDateString = minDate.toISOString().split('T')[0];
        maxDateString = maxDate.toISOString().split('T')[0];



        box.style.height = "290px";
        box3.style.width = "300%";
        if (mql.matches) {
            box.style.height = "300px";
            box1.style.marginLeft = "-7px";
        }
        if (mql1.matches) {
            box.style.height = "275px";
            box1.style.marginLeft = "-10px";
        }
        var constructBarChart = new Chart(barChart, {
            type: 'bar',
            data: {
                labels: iso8601Dates,
                fill: false,
                //datasets: barChartDataSet
                datasets: barChartDataSet.map(dataset => ({
                    ...dataset,
                    // barThickness: 10,
                    // offset: 5

                })),

            },

            options: {
                responsive: true,
                maintainAspectRatio: false,
                toolbar: {
                    show: false,
                    tools: {
                        download: false,
                    }
                },
                plugins: {
                    legend: {
                        display: false // This hides the legend
                    },
                    title: {
                        display: true,
                        // text: 'Chart.js Bar Chart - Stacked'
                    },
                    tooltip: {
                        callbacks: {
                            title: function (tooltipItems) {
                                if (tooltipItems && tooltipItems.length > 0) {
                                    // Get the label of the first tooltip item, which is the date string
                                    let fullTimestamp = tooltipItems[0].label;
                                    // Manually parse the hour from the timestamp
                                    let hourMatch = fullTimestamp.match(/\b(\d+):/);
                                    let meridiemMatch = fullTimestamp.match(/(a\.m\.|p\.m\.)/i);
                                    let hour = hourMatch ? parseInt(hourMatch[1], 10) : 0;
                                    let meridiem = meridiemMatch ? meridiemMatch[0].toUpperCase().replace(/\./g, '') : 'AM';
                                    // Convert to 12-hour format if needed
                                    hour = hour === 0 ? 12 : hour; // Convert 0 hours to 12 AM
                                    hour = hour < 10 ? '0' + hour : hour; // Pad single digit hours with a zero
                                    // Return the formatted string
                                    return `${hour} ${meridiem}`;
                                }
                            },
                            label: function (context) {
                                // Return the value for the tooltip
                                let value = context.parsed.y;
                                return value + ' ug/m³';

                            }
                        },
                        filter: function (tooltipItem, data) {
                            //console.log(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
                            // Hide tooltip if the value is zero
                            return tooltipItem.raw !== 0;
                        }
                    }
                },
                interaction: {
                    intersect: false,
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'hour',
                            tooltipfirmat: 'HH:mm a',
                            displayFormats: {
                                hour: 'hh a'
                            }
                        },
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 20

                        },
                        grid: {
                            display: false
                        },
                        //reverse: true,
                        stacked: true,
                    },
                    x1: {
                        id: 'x1',
                        type: 'time',
                        position: 'bottom',
                        time: {
                            unit: 'day',
                            tooltipFormat: 'MMM d',
                            displayFormats: {
                                day: 'MMM d'
                            }
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
                            maxTicksLimit: 20
                        },

                        min: minDateString,
                        max: maxDateString
                    },
                    y: {
                        //  beginAtZero: true,
                        display: false,
                        ticks: {
                            display: false
                        },
                        grid: {
                            display: false,
                        },
                        gridLines: {
                            drawBorder: false,
                        },
                        stacked: true
                    }
                },
            },

            animations: {
                tension: {
                    duration: 2000,
                    easing: 'easeInCubic'
                }
            }

        });

        var constructBarChart1 = new Chart(barChart1, {
            type: 'bar',
            data: {
                labels: iso8601Dates,
                fill: false,
                //datasets: barChartDataSet
                datasets: barChartDataSet.map(dataset => ({
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
                        bottom: 25
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            display: false
                        },
                        grid: {
                            display: false
                        },
                        stacked: true,

                    },
                    y: {
                        grid: {
                            display: false,
                        },
                        afterFit: (ctx) => {
                            //console.log(ctx);
                            ctx.width = 40;
                        },
                        stacked: true
                        //beginAtZero: true
                    },
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            },

            animations: {
                tension: {
                    duration: 2000,
                    easing: 'easeInCubic'
                }
            }

        });
    }
    else {
        if (filter !== 'Daily') {
            box.style.height = "315px";
            box3.style.width = "100%";
        } else {
            box.style.height = "300px";
            box3.style.width = "150%";
        }
        if (mql.matches) {
            if (filter !== 'Daily') {
                box.style.height = "325px";
            } else {
                box.style.height = "310px";
            }
        }
        if (mql1.matches) {
            if (filter !== 'Daily') {
                box.style.height = "300px";
                box1.style.marginLeft = "-10px";
            } else {
                box.style.height = "285px";
                box1.style.marginLeft = "0px";
            }
        }
        var constructBarChart = new Chart(barChart, {
            type: 'bar',
            data: {
                labels: categoriesData,
                fill: false,
                datasets: barChartDataSet
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,
                toolbar: {
                    show: false,
                    tools: {
                        download: false,
                    }
                },
                plugins: {
                    legend: {
                        display: false // This hides the legend
                    },
                    title: {
                        display: true,
                        // text: 'Chart.js Bar Chart - Stacked'
                    },
                    tooltip: {
                        callbacks: {
                            title: function (tooltipItems) {
                                if (tooltipItems && tooltipItems.length > 0) {

                                    return '';
                                }
                            },
                            label: function (context) {
                                // Return the value for the tooltip
                                let value = context.parsed.y;
                                return value + ' ug/m³';
                            },
                        },
                        filter: function (tooltipItem, data) {
                            //console.log(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
                            // Hide tooltip if the value is zero
                            return tooltipItem.raw !== 0;
                        }
                    }
                },
                interaction: {
                    intersect: false,
                },
                scales: {
                    x: {
                        ticks: {
                            maxRotation: 0,
                            minRotation: 0
                        },
                        grid: {
                            display: false, // This will remove the Y-axis grid lines
                            drawBorder: false, // Optional: if you also want to remove the axis border
                        },
                        stacked: true,
                    },
                    y: {
                        //  beginAtZero: true,
                        display: false,
                        ticks: {
                            display: false
                        },
                        grid: {
                            display: false,
                        },
                        gridLines: {
                            drawBorder: false,
                        },
                        stacked: true
                    },

                },

                animations: {
                    tension: {
                        duration: 2000,
                        easing: 'easeInCubic'
                    }
                }
            }

        });

        var constructBarChart1 = new Chart(barChart1, {
            type: 'bar',
            data: {
                labels: categoriesData,
                fill: false,
                datasets: barChartDataSet
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,
                toolbar: {
                    show: false,
                    tools: {
                        download: false,
                    }
                },
                layout: {
                    padding: {
                        top: 40,
                        bottom: 20
                    }
                },
                interaction: {
                    intersect: false,
                },
                scales: {
                    x: {
                        ticks: {
                            display: false
                        },
                        grid: {
                            display: false
                        },
                        stacked: true,

                    },
                    y: {
                        stacked: true,
                        grid: {
                            display: false,
                        },
                        afterFit: (ctx) => {
                            //console.log(ctx);
                            ctx.width = 40;
                        }
                    },
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            },

            animations: {
                tension: {
                    duration: 2000,
                    easing: 'easeInCubic'
                }
            }

        });
    }
    constructBarChart1.update();
    constructBarChart.update();
    var $barchart = $('#' + boxid1);
    var maxScroll = $barchart.prop('scrollWidth') - $barchart.outerWidth();
    $barchart.animate({
        scrollLeft: maxScroll
    }, 10);

}

function findMinMaxDates(dataset) {
    const dateTimes = dataset.map(entry => {
        // Splitting the entry into date and time parts
        const [datePart, timePart] = entry.split(';');
        // Parsing the date and time into a Date object
        return new Date(`${datePart} ${timePart}`);
    });

    // Finding the minimum and maximum dates
    const minDate = new Date(Math.min(...dateTimes));
    const maxDate = new Date(Math.max(...dateTimes));

    // Formatting dates back to the required string format, if necessary
    // For this example, we're assuming the Chart.js needs the input in 'YYYY-MM-DD' format
    const minDateString = minDate.toISOString().split('T')[0];
    const maxDateString = maxDate.toISOString().split('T')[0];

    return { minDateString, maxDateString };
}

function convertToISO8601(dateTimeStrings) {
    return dateTimeStrings.map(dateTime => {
        const [date, timePart] = dateTime.split(';');
        let [time, ampm] = timePart.split(' ');
        let [hours, minutes] = time.split(':');

        // Adding minutes if they are missing (for whole hours)
        minutes = minutes || '00';

        // Convert hours to 24-hour format
        if (ampm === 'PM' && hours !== '12') {
            hours = (parseInt(hours, 10) + 12).toString();
        } else if (ampm === 'AM' && hours === '12') {
            hours = '00';
        }

        // Construct ISO8601 format
        return `${date}T${hours}:${minutes}:00`;
    });
}

function updateCharts(selectedFilter) {
    // Do not remove below code starts---------------------------------
    $("#lineChartAqiSo2Value, #lineChartAqiNo2Value, #lineChartAqiCoValue, #lineChartAqiPm10Value, #lineChartAqiO3Value").text('');
    $('button.quality-button-dropdown').text(selectedFilter);
    if (selectedFilter != chartFilter.Custom) {
        getStationChartApi(selectedFilter);
    }
    // Do not remove below code ends---------------------------------
}

function bindYearsToDropDown() {
    var startYear = 2016;
    var currentYear = new Date().getFullYear();
    var yearDropDownEl = $('#yearDropDown');
    while (startYear <= currentYear) {
        yearDropDownEl.append(`<li>
            <a class="dropdown-item" href="javascript: void(0)"
            onclick="onClickYearOfAirAnalytics(`+ startYear + `)">` + startYear + `</a>
        </li>`);
        ++startYear;
    }
    var selectedYearEl = $('#selectedyear');
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

// Do not remove below code ends---------------------------------
var imageData = [
    { imageUrl: "./images/new-images/e_linking.jpg", content: "E-linking for Continuous Emission Monitoring System ", description: "E- linking for Continuous Emission Monitoring System project is an Abu Dhabi Government initiative to support improvement of the quality of the environment and protect public health.  This project involves the collection of emission data from continuous emission monitoring systems (CEMS), from industrial facilities, to centralized databased system in EAD as well as establishing manual reporting mechanisms for facilities without CEMS.  E-linking project will enable EAD to develop a comprehensive database based on real time data. The project is also including a portal that is designed and implemented to enable visualization of data in near real time. This will help EAD to develop best practice approach to emissions monitoring and ensure quality data is available. This dashboard provides features such as GIS, dispersion modelling, emission exceedance alerts, producing required reports and manage data workflow. Also, the portal will ensure quality of the received data (automated and manual data) and enable communication with facilities regarding data discrepancies." },
    { imageUrl: "./images/new-images/Monitoring_network.jpg", content: "Abu Dhabi Air Quality Monitoring Program", description: "The Environment Agency – Abu Dhabi (EAD) started monitoring air quality in 2007. The monitoring network consist of 20 stations and 2 mobile stations. The stations collect readings on concentrations of Sulphur Dioxide (SO2), Nitrogen Dioxide (NO2), Ozone (O3), Hydrogen Sulphide (H2S), Carbon Monoxide (CO), Particulate Matter (PM10, PM2.5), Methan (CH4), BTEX. All EAD air quality monitoring stations are equipped with sensors to record meteorological parameters, which are essential to understand the ambient air quality patterns and local meteorological conditions. The meteorological parameters measured are wind speed, wind direction, temperature, relative humidity, net radiation and barometric pressure. EAD simplifies the Ambient Air Quality State by calculating the AQI Range based on Air Quality National Standards for the major five parameters; Particulate matter, Ground level ozone, Sulphur dioxide, Nitrogen dioxide and Carbon monoxide." },
    { imageUrl: "./images/new-images/Freepik2.png", content: "Abu Dhabi Air Quality Modelling", description: "To enhance its air quality monitoring system, the Environment Agency – Abu Dhabi (EAD) has developed and implemented a sophisticated, multi-theme air quality modelling system for Abu Dhabi. The system will support regulation via the assessment of cumulative air quality impacts expected from new facilities and urban development projects, reduce public exposure to air pollution and support the improvement in air quality across Abu Dhabi, while helping to assess the effectiveness of future action plans and policies. It will also provide expert technical support, training and capacity building to enable the identification of pollution hotspots where elevated pollutant concentrations occur, and the development of detailed emirate-wide annual air quality maps." },
    { imageUrl: "./images/new-images/Freepik3.png", content: "Abu Dhabi Air Emissions Inventory", description: "The Environment Agency – Abu Dhabi (EAD) is focused on creating an update to the inventory of air emissions within Abu Dhabi focusing on some specific parameters: SO, NOx, CO, PM10, PM2.5, NMVOC, NH3, CO2, and BC.The project emphasizes the significant contributors to Abu Dhabi's air emissions. These sectors encompass electricity production, oil and gas production, industrial processing, and road transport, which takes into account both exhaust and non-exhaust emissions. Additionally, shipping, aviation, railways, agriculture and livestock, waste, and construction are integral parts of this investigative endeavour. This comprehensive database aims to systematically recognize the primary sectors contributing the most to air emissions, thus offering clarity on areas of focus. An integral goal is to boost public understanding and interest in the significance of air quality, encouraging communal responsibility and involvement. The data will lay a foundation for precise air quality modelling, facilitating both predictive and preventive measures. By establishing a detailed baseline, the inventory will become essential for future environmental strategies, policy-making, and planning. It will also provide guidance for setting clear emission limits and formulating targeted reduction goals. Furthermore, the inventory will enable consistent monitoring of the environmental performance of individual sectors and entities, fostering a culture of accountability. Based on the insights garnered, effective mitigation measures tailored to specific challenges and sectors can be designed, ensuring a holistic approach to preserving and enhancing Abu Dhabi's environment" },
    { imageUrl: "./images/new-images/GHG1.jpg", content: "Greenhouse Gas Inventory and Forecasting", description: "In line with its strategic priority to secure the resilience of Abu Dhabi through mitigation and adaptation to climate change, and protection of air and marine water, the Environment Agency - Abu Dhabi (EAD) was pro-active in commencing biennial GHG inventories as part of its comprehensive plan for monitoring atmospheric emissions in the emirate. Those inventories were instrumental in laying a foundation of knowledge regarding the baseline emissions and projections in the emirate, and also in strengthening the capacity of local entities for efficiently tracking and reporting their sectors emissions.Abu Dhabi GHG inventory implies quantifying GHG emissions and removals by gas and by source or sink. The inventory targets all anthropogenic sources and sinks; namely energy, industrial processes, land-use change and forestry, agriculture, and waste. Following the IPCC Guidelines for National GHG Inventories, the inventory project focuses on the primary gases that directly contribute to global warming such as (CO2, CH4, N2O, HFCs, PFCs, SF6).The GHG project also assesses the potential of future emission reductions by the existing sustainable development plans and mitigation strategies in the Emirate." },
    { imageUrl: "./images/new-images/Odor.jpg", content: "Abu Dhabi Odorous Gases Monitoring Network", description: "Abu Dhabi Odorous Gases Monitoring Network is a five-year project that encompass a variety of activities across all type of industry do not adversely impact the environment and local community and will serve as a valuable tool for early detection and response for odorous gases, which cause a public nuisance.  By operating 50 fixed and 2 mobile detecting devices to establish odour monitoring and management framework. Currently, EAD responds to odour complaints by deploying a portable odour monitoring device to check real-time concentrations of odorous gases, as well as locates a mobile air quality monitoring station to measure real-time concentrations of air pollutants, windspeed and wind direction. Both sets of measuring technologies provide valuable insights into the identity of odorous gases, their concentration in ambient air, sources, and dispersion." },
    { imageUrl: "./images/new-images/Freepik1.png", content: "Mapping Ambient Noise in Abu Dhabi", description: "The noise project seeks to address significant noise sources pinpointing affected residential districts, rating their impact, and translating findings into a visual map. The project involves data gathering from government entities, utilizing EAD data, conducting additional noise monitoring, and proposing mitigation measures. The aim of this project is to map the Abu Dhabi districts most affected by noise sources." },
    { imageUrl: "./images/new-images/Remote_sensing.jpg", content: "Remote Sensing of Real-World Emissions", description: "The remote sensing of real-world emissions will improve the understanding of the air quality in Abu Dhabi Emirate and UAE. The development of a remote sensing measurement campaign of road transport is a fundamental component of the air quality management program in Abu Dhabi.The outputs of the project will provide essential information for designing effective measures to reduce emissions from road transport with science-based information that will support the General Secretariat of the Executive Council, Environment Agency – Abu Dhabi, Ministry of Climate Change and Environment, Abu Dhabi Police, Health Authority – Abu Dhabi, Department of Transport and other public and private stakeholders" },
    { imageUrl: "./images/new-images/EAD_Research.jpg", content: "Abu Dhabi Atmospheric Research Expedition", description: "The Agency was the first organisation in the world to conduct atmospheric research from Spain to Abu Dhabi, which covered 25 countries and eight seas and oceans on a journey of more than 10,000 km. The pioneering Atmospheric Research Expedition in the Arabian Gulf undertook a comprehensive examination of the transportation and the subsequent transformation of hydrocarbons and nitrogen oxides. The campaign also sought to assess how pollution from the Arabian Gulf is transported to other regions and to evaluate its contribution to the formation of ozone in the United Arab Emirates. " },
    { imageUrl: "./images/new-images/EAD_Smog-Free Tower_web.jpg", content: "Smog-Free Tower", description: "The Environment Agency – Abu Dhabi (EAD) and Modon Properties inaugurated the region's first smog-free tower at Surf Abu Dhabi, the world's most advanced artificial wave facility that is taking shape on Hudayriyat Island. The new air purification tower is an urban innovation designed to enhance air quality in the area and provide an inspirational experience of a clean and green future. The seven-meter aluminium tower uses environmentally friendly positive ionization technology to purify surrounding air, cleaning 30,000 m3 of air per hour. The ionization technology produces smog-free air in public spaces, allowing people to breathe and experience clean air, using only 1,170 watts of electricity, comparable to a kettle." },
];

var items1 = document.querySelectorAll('.slide-carol .carol-item');
// start 22-April-24--------------
if (window.innerWidth < 990) {
    $.each(imageData, function (index, item) {
        var carouselItem = $('<div>').addClass('carousel-item carol-item');
        if (index === 0) {
            carouselItem.addClass('active');
        }


        let minPerSlide = 6;
        // alert(window.innerWidth);
        if (window.innerWidth < 768) {
            minPerSlide = 2;
        }
        for (let i = 1; i < minPerSlide; i++) {
            var content = $('<div>').addClass('col-md-3');
            var mainContent = $('<div>').addClass('position-relative main-content openSidebar');
            var imageDiv = $('<div>');
            var imageId = 'image_' + ((index * minPerSlide) + i);
            // var image = $('<img>').addClass('item').attr('src', imageData[(index + i) % imageData.length].imageUrl);
            var image = $('<img>').addClass('item').attr('src', imageData[(index + i) % imageData.length].imageUrl).attr('id', imageId); // Add ID to image       
            var projectContent = $('<div>').addClass('project-slide-content').text(imageData[(index + i) % imageData.length].content);
            var projectItemDescription = $('<div>').addClass('project-slide-description').text(imageData[(index + i) % imageData.length].description);


            // Assemble elements
            imageDiv.append(image);
            mainContent.append(imageDiv, projectContent, projectItemDescription);
            content.append(mainContent);
            carouselItem.append(content);
        }


        $('#recipeCarousel .carousel-inner').append(carouselItem);
    });
} else {
    var itemsPerPage = 5; // Number of items per slide

    $.each(imageData, function (index, item) {
        if (index % itemsPerPage === 0) {
            var carouselItem = $('<div>').addClass('carousel-item carol-item');
            if (index === 0) {
                carouselItem.addClass('active');
            }

            // Loop through each item per slide
            for (let i = 0; i < itemsPerPage; i++) {
                var dataIndex = index + i;
                if (dataIndex >= imageData.length) {
                    // If dataIndex exceeds imageData length, wrap around to the beginning
                    dataIndex = dataIndex % imageData.length;
                }

                var content = $('<div>').addClass('col-md-3');
                var mainContent = $('<div>').addClass('position-relative main-content openSidebar');
                var imageDiv = $('<div>');
                var imageId = 'image_' + dataIndex;
                var image = $('<img>').addClass('item').attr('src', imageData[dataIndex].imageUrl).attr('id', imageId);
                var projectContent = $('<div>').addClass('project-slide-content').text(imageData[dataIndex].content);
                var projectItemDescription = $('<div>').addClass('project-slide-description').text(imageData[dataIndex].description);

                // Assemble elements
                imageDiv.append(image);
                mainContent.append(imageDiv, projectContent, projectItemDescription);
                content.append(mainContent);
                carouselItem.append(content);
            }

            $('#recipeCarousel .carousel-inner').append(carouselItem);
        }
    });
}
// End 22-April-24--------------

$('.main-content').on('click', function () {

    var imageSrc = $(this).find('.item').attr('src');
    //console.log(imageSrc);
    var projectContent = $(this).find('.project-slide-content').text();
    var projectItemDescription = $(this).find('.project-slide-description').text();
    //console.log(projectContent);
    $('.modal-background .img-fluid').attr('src', imageSrc);
    $('.modal-background .projectItemContent').text(projectContent);
    $('.modal-background .projectItemDescription').text(projectItemDescription);
});


let prevButton1 = document.getElementById('prev');


// Check if first slide is active on page load
if (isFirstSlideActive()) {
    // Add opacity to previous button
    prevButton1.style.opacity = '0.5';
    prevButton1.disabled = true;
} else {
    // Remove opacity from previous button
    prevButton1.style.opacity = '1';
    prevButton1.disabled = false;
}

document.getElementById('recipeCarousel').addEventListener('slid.bs.carousel', function () {
    let prevButton = document.getElementById('prev');
    let nextButton = document.getElementById('next');
    // Check if last slide is active
    if (isLastSlideActive()) {
        // Add opacity to next button
        nextButton.style.opacity = '0.5';
        nextButton.disabled = true;
    } else {
        // Remove opacity from next button
        nextButton.style.opacity = '1';
        nextButton.disabled = false;
    }

    // Check if first slide is active
    if (isFirstSlideActive()) {
        // Add opacity to previous button
        prevButton.style.opacity = '0.5';
        prevButton.disabled = true;
    } else {
        // Remove opacity from previous button
        prevButton.style.opacity = '1';
        prevButton.disabled = false;
    }
});

function isLastSlideActive() {

    var items1 = document.querySelectorAll('.slide-carol .carol-item');
    let activeSlide = document.querySelector('.carol-item.active');
    let lastSlide = items1[items1.length - 1];
    return activeSlide === lastSlide;
}

// Function to check if first slide is active
function isFirstSlideActive() {
    var items1 = document.querySelectorAll('.slide-carol .carol-item');
    let activeSlide = document.querySelector('.carol-item.active');
    let firstSlide = items1[0];
    return activeSlide === firstSlide;
}
$('#myForm').submit(function (e) {
    e.preventDefault();
    var name = $('#inputField').val();
    var email = $('#emailField').val();
    var phone = $('#phoneField').val();

    // Regular expressions for validation
    var nameRegex = /^[a-zA-Z\s]*$/;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var phoneRegex = /^\d{10}$/;

    var isValidForm = true;
    // Name validation
    if (name.trim() === '') {
        $('#nameError').text('Name is required');
        isValidForm = false;
    } else if (!nameRegex.test(name)) {
        $('#nameError').text('Please enter a valid name (only letters and spaces)');
        isValidForm = false;
    } else {
        $('#nameError').text('');
    }

    // Email validation
    if (email.trim() === '') {
        $('#emailError').text('Email is required');
        isValidForm = false;
    } else if (!emailRegex.test(email)) {
        $('#emailError').text('Please enter a valid email address');
        isValidForm = false;
    } else {
        $('#emailError').text('');
    }

    // Phone validation
    if (phone.trim() === '') {
        $('#phoneError').text('Phone is required');
        isValidForm = false;
    } else if (!phoneRegex.test(phone)) {
        $('#phoneError').text('Please enter a valid 10-digit phone number');
        isValidForm = false;
    } else {
        $('#phoneError').text('');
    }

    if (isValidForm) {
        var inputData = {};
        $(this).find('input, textarea').each(function (index, item) {
            inputData[item.name] = item.value;
        });

        $.ajax({
            url: baseUrl + 'Submit',
            method: 'POST',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(inputData),
            success: function (result) {
                if (result.mailSent) {
                    $(this).find('input, textarea').val('');
                    $('#submitStatus').html('Submitted Successfully.').removeClass('error-message').addClass('success-message');
                    document.querySelector(".contact-form").style.display = "none";
                    document.querySelector(".thankyou-form").style.display = "block";
                } else {
                    $('#submitStatus').html('Please try after sometime.').removeClass('success-message').addClass('error-message');
                }
            },
            error: function () {
                $('#submitStatus').html('Please try after sometime.').removeClass('success-message').addClass('error-message');
            }
        });
    }
});

// Add event listeners to input fields for real-time validation
$('#inputField').on('input', function () {
    var name = $(this).val();
    var nameRegex = /^[a-zA-Z\s'-]+$/;
    if (name.trim() !== name) {
        $('#nameError').text('No leading or trailing spaces are allowed');
    } else if (!nameRegex.test(name)) {
        $('#nameError').text('Please enter a valid name (only letters, spaces, hyphens, and apostrophes)');
    } else {
        $('#nameError').text('');
    }
});

// $('#inputField').on('keypress', function (e) {
//     var name = $(this).val();
//     var spaceCount = (name.match(/\s/g) || []).length;
//     if (spaceCount >= 4 && e.keyCode === 32) {
//         e.preventDefault();
//     }
// });

$('#emailField').on('input', function () {
    var email = $(this).val();
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    var specialCharRegex = /^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/;
    var parts = email.split('@');
    if (!emailRegex.test(email)) {
        $('#emailError').text('Please enter a valid email address');
    } else if (specialCharRegex.test(email)) {
        $('#emailError').text('Email cannot start or end with a special character');
    } else if (/([^a-zA-Z0-9])\1{1,}/.test(email)) {
        $('#emailError').text('Email cannot contain consecutive repeating special characters');
    } else if (email.indexOf('@gmail.com@gmail.com') !== -1) {
        $('#emailError').text('Invalid email address');
    } else if (parts.length === 2 && parts[0] === parts[1]) {
        $('#emailError').text('Please enter a valid email address');
    } else if (parts[0].includes(parts[1])) {
        $('#emailError').text('Invalid email address');
    } else {
        $('#emailError').text('');
    }
});
$('#phoneField').on('input', function () {
    var phone = $(this).val();
    // Remove any non-digit characters from the phone number
    var cleanedPhone = phone.replace(/\D/g, '');
    var phoneRegex = /^(?!.*(?:0{10}|1{10}|2{10}|3{10}|4{10}|5{10}|6{10}|7{10}|8{10}|9{10}))[0-9]{10}$/;
    var undesiredFormatRegex = /^1234567890$/;
    if (!phoneRegex.test(cleanedPhone) || undesiredFormatRegex.test(cleanedPhone)) {
        $('#phoneError').text('Please enter a valid 10-digit phone number');
    } else {
        $('#phoneError').text('');
    }
});
var accordionContent = [
    {
        question: "What does ‘Air Quality’ refer to?",
        answer: "Air quality refers to the condition of the air in our environment, specifically the presence of pollutants that can impact human health and the environment."
    },
    {
        question: "What are common air pollutants present in the environment?",
        answer: "Common air pollutants include particulate matter (PM), nitrogen dioxide (NO2), sulfur dioxide (SO2), ozone (O3), and carbon monoxide (CO)."
    },
    {
        question: "How does air quality influence weather patterns?",
        answer: "Yes, air quality is seen to influence weather patterns. For example, certain pollutants can affect cloud formation and precipitation."
    },
    {
        question: "What is the number of air quality monitoring stations currently operational in Abu Dhabi?",
        answer: "The Environment Agency – Abu Dhabi oversees a network of 20 fixed air quality monitoring stations situated across the Emirate of Abu Dhabi, complemented by an additional 2 mobile air quality monitoring stations."
    },
    {
        question: "Who is considered in a sensitive group?",
        answer: "High-risk groups, including children under 18, the elderly, individuals with chronic heart or lung disease, pregnant individuals, people with diabetes, and active outdoor adults, require focused attention. These individuals are more likely to experience the adverse impacts of poor air quality, necessitating proactive measures. To protect these vulnerable populations, it is crucial to monitor air quality, limit outdoor activities during peak pollution hours, ensure well-ventilated indoor spaces, and adhere to medical advice, particularly for those with pre-existing conditions. By collectively taking these steps, we can foster a healthier and more resilient community, prioritizing the well-being of those most at risk from air pollution."
    },
    {
        question: "How can I check the air quality in my area?",
        answer: "You can check the air quality in your area by choosing the nearest monitoring station or searching your area from the search menu in the map."
    },
    {
        question: "Does air quality play a role in climate change? ",
        answer: "Air quality does indeed play a significant role in climate change. Air pollutants classified as greenhouse gases such as methane and carbon dioxide contribute to climate change by intensifying the greenhouse effect and altering the Earth’s energy balance."
    },
    {
        question: "How does climate change affect air quality? ",
        answer: "Climate change can alter weather patterns, leading to more frequent and severe heatwaves, droughts, and wildfires. This can worsen air quality by increasing pollution levels, such as particulate matter and ground-level ozone. Additionally, rising temperatures can accelerate the formation of ozone and increase the volatility of pollutants. Changes in atmospheric circulation can further impact regional air quality, while shifts in ecosystems can alter the composition of atmospheric pollutants."
    },
    {
        question: "How can individuals contribute to reducing air pollution?",
        answer: "<ul><li>Opt for Sustainable Transportation.</li> <li>Use energy-efficient appliances and turn off electronics when not in use.</li> <li>Choose clean energy sources like solar or wind power.</li> <li>Avoid unnecessary vehicle usage to decrease traffic emissions. </li> <li>  Consume local produce </li> </ul>"
    },
    {
        question: "What are the different sources of air pollution?",
        answer: "Air pollution sources can be categorized into two main types: anthropogenic and natural sources. Anthropogenic sources are emissions that are released from human activities. Examples of human activities are industrial emissions, transportation, agricultural practices, and residential activities. Natural sources are those naturally occurring processes that release pollutants into the atmosphere such as volcanic eruptions, wildfires, dust and pollen from wind erosion and vegetation, and biogenic emissions from plants and trees."
    },
    {
        question: "What are the health risks associated with air pollution?",
        answer: "Air pollution at high levels and prolonged exposure can cause respiratory problems, aggravate existing health conditions, and contribute to cardiovascular issues."
    },
    {
        question: "What are the different types of  particulate matter?",
        answer: "Particulate matter (PM) refers to tiny particles or droplets in the air that can be inhaled into the lungs. These particles vary in size, and they are categorized based on their diameter. The two main types of particulate matter are: PM10 and PM2.5."
    },
    {
        question: "What is ozone (O3)?",
        answer: "Ozone (O3) is a molecule composed of three oxygen atoms. It is a pale blue gas with a distinct, sharp smell. Ozone is present both in the Earth's upper atmosphere (stratosphere) and at ground level (troposphere), forming the ozone layer and contributing to air quality, respectively."
    },
    {
        question: "What are nitrogen oxides (NO2)?",
        answer: "Nitrogen oxides (NOx) refer to a group of reactive gases that consist of nitrogen and oxygen molecules. The two primary nitrogen oxides of environmental concern are nitrogen monoxide (NO) and nitrogen dioxide (NO2). The chemical formulas for these gases are NO and NO2, respectively. Nitrogen oxides are produced during combustion processes, such as those occurring in vehicles, power plants, and industrial facilities. The main sources of NOx emissions include the burning of fossil fuels, particularly in internal combustion engines and industrial boilers"
    },
    {
        question: "What is sulfur dioxide (SO2)?",
        answer: "Sulfur dioxide (SO2) is a colorless gas with a pungent odor. It is composed of one sulfur atom and two oxygen atoms, and its chemical formula is SO2. Sulfur dioxide is produced mainly by burning fossil fuels containing sulfur, such as coal and oil, in power plants and by certain industrial processes. It is also released during volcanic eruptions."
    },
    {
        question: "What is carbon monoxide (CO)?",
        answer: "Carbon monoxide (CO) is a colorless, odorless, and tasteless gas. It is composed of one carbon atom and one oxygen atom, and its chemical formula is CO. Carbon monoxide is produced by incomplete combustion of carbon-containing fuels, such as gasoline, natural gas, and wood. It can be emitted from vehicles, industrial processes, and household appliances. Carbon monoxide is known for its potential danger, as high concentrations can be toxic to humans and animals. In indoor environments, it is important to ensure proper ventilation and the correct functioning of combustion appliances to prevent the buildup of carbon monoxide. "
    },
];


$.each(accordionContent, function (index, item) {
    // Create accordion item HTML
    var accordionItem = '<div class="accordion-item">' +
        '<h2 class="accordion-header" id="heading' + (index + 1) + '">' +
        '<button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapse' + (index + 1) + '">' +
        item.question +
        '</button>' +
        '</h2>' +
        '<div id="collapse' + (index + 1) + '" class="accordion-collapse collapse" data-bs-parent="#myAccordion">' +
        '<div class="accordion-body pt-1 pb-2 text-justify">' +
        '<p>' +
        item.answer +
        '</p>' +
        '</div>' +
        '</div>' +
        '</div>';

    // Append the accordion item HTML to the accordion container
    $('#myAccordion').append(accordionItem);
});

// Show the first accordion item by default
$('#collapse1').addClass('show');
$('#heading1 button').toggleClass('collapsed');