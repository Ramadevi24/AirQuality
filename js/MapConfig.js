var portalUrl = "https://maps.smartgeoapps.com/portal"
var TrustedDomains = ["enviroportal.ead.ae", "localhost", "atlas.smartgeoapps.com"];
var WebMapID = "753b0e40332946c5a16c5f97cb8317d4";
var MonitoringStationsAPI = "https://atlas.smartgeoapps.com/server/rest/services/AIrQuality/MonitoringStations/MapServer/0";
//var AirQualityService1 = "https://atlas.smartgeoapps.com/AirQualityWS/AQMS.asmx";
var AirQualityService = "https://adairqualityapi.ead.ae/";
var ImagesPath = "./images/new-images/";
var stationsIDs= [
    {
        "Hamdan Street": "EAD_HamdanStreet",
        "Khadejah School": "EAD_KhadijaSchool",
        "Khalifa School": "EAD_KhalifaSchool",  
        "Mussafah": "EAD_Mussafah",
        "Baniyas School": "EAD_Baniyas",
        "Al Ain Islamic Institute": "EAD_AlAinSchool",
        "Al Ain Street": "EAD_AlAinStreet",
        "Bida Zayed": "EAD_BidaZayed",
        "Gayathi School": "EAD_Gayathi",
        "Liwa": "EAD_Liwa",
        "Ruwais": "EAD_RuwaisTransco",
        "Habshan Air Quality Monitoring Station": "EAD_Habshan",
        "Habshan South": "EAD_Habshan",
        "Al Maqtaa": "EAD_AlMaqta",
        "Khalifa City A": "EAD_KhalifaCity",
        "Al Mafraq": "EAD_AlMafraq",
        "Sweihan Air Quality Monitoring Station": "EAD_Sweihan",
        "Sweihan": "EAD_Sweihan",
        "Al Tawia": "EAD_AlTawia",
        "Zakher": "EAD_Zakher",
        "Zakher Air Quality Monitoring Station": "EAD_Zakher",
        "Al Quaa": "EAD_AlQuaa",
        "E11 Road": "EAD_E11Road",
        "Bain Al Jessrain": "EAD_AlMaqta"
    }

]
var IndexRange = [
    {
        pollutantLevel: "Good",
        minVal: 0,
        maxVal: 50,
        //color: "#00ca00",
        ImageUrl:ImagesPath + "Animation -green.gif"
    },
    {
        pollutantLevel: "Moderate",
        minVal: 51,
        maxVal: 100,
        //color: "#fff200",
        ImageUrl: ImagesPath + "Animation - lightorange.gif"
    },
    {
        pollutantLevel: "Unhealthy for sensitive groups",
        minVal: 101,
        maxVal: 150,
        //color: "#f7901e",
        ImageUrl: ImagesPath + "Animation - darkorange.gif"
    },
    {
        pollutantLevel: "Unhealthy",
        minVal: 151,
        maxVal: 200,
        //color: "#e9373e",
        ImageUrl: ImagesPath + "Animation -red.gif"
    },
    {
        pollutantLevel: "Very unhealthy",
        minVal: 201,
        maxVal: 300,
        //color: "#ac225d",
        ImageUrl: ImagesPath + "Animation - purple.gif"
    },
    {
        pollutantLevel: "Hazardous",
        minVal: 301,
        maxVal: 500,
        //color: "#891a1c",
        ImageUrl: ImagesPath + "Animation - hazar.gif"
    }
]
var Indexunder50 = {
    type: "simple-marker",
    style: "circle",
    color: "#9CD84E",
    outline: {
        color: "#9CD84E",
        width: 0.5
    },
    size: "28px"
};
var Index51_100 = {
    type: "simple-marker",
    style: "circle",
    color: "#FACF39",
    outline: {
        color: "#FACF39",
        width: 0.5
    },
    size: "28px"
};
var Index101_150 = {
    type: "simple-marker",
    style: "circle",
    color: "#F99049",
    outline: {
        color: "#F99049",
        width: 0.5
    },
    size: "28px"
};
var Index151_200 = {
    type: "simple-marker",
    style: "circle",
    color: "#F65E5F",
    outline: {
        color: "#F65E5F",
        width: 0.5
    },
    size: "28px"
};
var Index201_300 = {
    type: "simple-marker",
    style: "circle",
    color: "#A070B6",
    outline: {
        color: "#A070B6",
        width: 0.5
    },
    size: "28px"
};
var Index301_500 = {
    type: "simple-marker",
    style: "circle",
    color: "#A06A7B",
    outline: {
        color: "#A06A7B",
        width: 0.5
    },
    size: "28px"
};
var AD_Long =54.3;
var AD_Lat = 24.4;
var AD_Regions = [
    {
        Region: "abudhabicapitalregion",
        Long: 54.520768,
        Lat: 24.394513
    },
    {
        Region: "alainregion",
        Long: 55.686692,
        Lat: 24.211781
    },
    {
        Region: "aldhafraregion", 
        Long: 53.402495,
        Lat: 23.536433
    }]
var shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
var Pollutants = ['AQI','NO2','SO2','CO','O3','PM10']