var options = {
  series: [70],
  chart: {
  height: 210,
  type: 'radialBar',
  toolbar: {
    show: false,
    // offsetX: 0,
    // offsetY: 0,
    tools: {
      download: false,
    }
  }
},
plotOptions: {
  radialBar: {
    hollow: {
      size: '70%',
      margin:8,
    },
    track: {
      background: '#9b9b9b',
      strokeWidth: '100%',
      margin: -2, 
    },
    dataLabels: {
      show: true,
      name: {
        offsetY: 28,
        show: true,
        color: '#000',
        fontSize: '17px',
        fontWeight:'400',
        fontFamily:'Cairo',
      },
      value: {
          offsetY: -10,
        formatter: function(val) {
          return parseInt(val);
        },
        color: '#facf39',
        fontSize: '40px',
        fontWeight:'700',
        show: true,
      }
    },
  },
},
colors: ['#facf39'],
stroke: {
  lineCap: "round",
},
labels: ['AQI'],
};


var chart = new ApexCharts(document.querySelector("#AQI"), options);
chart.render();

var hourlyChartData = [
  {
    "hour": "12 AM",
    "stationName": "EAD_AlAinSchool",
    "pM10": 116,
    "o3": 42,
    "sO2": 74,
    "nO2": 35,
    "co": 0,
    "aqi": 77,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "12 AM",
    "stationName": "EAD_AlAinStreet",
    "pM10": 81,
    "o3": 0,
    "sO2": 28,
    "nO2": 33,
    "co": 0,
    "aqi": 11,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "12 AM",
    "stationName": "EAD_AlMafraq",
    "pM10": 223,
    "o3": 0,
    "sO2": 4,
    "nO2": 67,
    "co": 0,
    "aqi": 149,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "12 AM",
    "stationName": "EAD_AlMaqta",
    "pM10": 122,
    "o3": 35,
    "sO2": 8,
    "nO2": 52,
    "co": 0,
    "aqi": 34,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "12 AM",
    "stationName": "EAD_AlQuaa",
    "pM10": 17,
    "o3": 94,
    "sO2": 39,
    "nO2": 7,
    "co": 0,
    "aqi": 80,
    "aqiIndex": "Good"
  },
  {
    "hour": "12 AM",
    "stationName": "EAD_AlTawia",
    "pM10": 103,
    "o3": 56,
    "sO2": 44,
    "nO2": 9,
    "co": 0,
    "aqi": 69,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "12 AM",
    "stationName": "EAD_Baniyas",
    "pM10": 60,
    "o3": 30,
    "sO2": 2,
    "nO2": 42,
    "co": 0,
    "aqi": 55,
    "aqiIndex": "Good"
  },
  {
    "hour": "12 AM",
    "stationName": "EAD_BidaZayed",
    "pM10": 15,
    "o3": 60,
    "sO2": 5,
    "nO2": 6,
    "co": 0,
    "aqi": 30,
    "aqiIndex": "Good"
  },
  {
    "hour": "12 AM",
    "stationName": "EAD_E11Road",
    "pM10": 0,
    "o3": 0,
    "sO2": 9,
    "nO2": 22,
    "co": 0,
    "aqi": 5,
    "aqiIndex": "Good"
  },
  {
    "hour": "12 AM",
    "stationName": "EAD_Gayathi",
    "pM10": 145,
    "o3": 49,
    "sO2": 7,
    "nO2": 24,
    "co": 0,
    "aqi": 97,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "12 AM",
    "stationName": "EAD_Habshan",
    "pM10": 28,
    "o3": 83,
    "sO2": 13,
    "nO2": 10,
    "co": 0,
    "aqi": 42,
    "aqiIndex": "Good"
  },
  {
    "hour": "12 AM",
    "stationName": "EAD_HamdanStreet",
    "pM10": 74,
    "o3": 0,
    "sO2": 3,
    "nO2": 36,
    "co": 0,
    "aqi": 49,
    "aqiIndex": "Good"
  },
  {
    "hour": "12 AM",
    "stationName": "EAD_KhadijaSchool",
    "pM10": 122,
    "o3": 62,
    "sO2": 11,
    "nO2": 16,
    "co": 0,
    "aqi": 81,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "12 AM",
    "stationName": "EAD_KhalifaSchool",
    "pM10": 120,
    "o3": 32,
    "sO2": 3,
    "nO2": 16,
    "co": 0,
    "aqi": 80,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "12 AM",
    "stationName": "EAD_Liwa",
    "pM10": 92,
    "o3": 63,
    "sO2": 15,
    "nO2": 9,
    "co": 0,
    "aqi": 61,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "12 AM",
    "stationName": "EAD_Mussafah",
    "pM10": 97,
    "o3": 0,
    "sO2": 11,
    "nO2": 23,
    "co": 0,
    "aqi": 64,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "12 AM",
    "stationName": "EAD_RuwaisTransco",
    "pM10": 0,
    "o3": 69,
    "sO2": 11,
    "nO2": 12,
    "co": 0,
    "aqi": 35,
    "aqiIndex": "Good"
  },
  {
    "hour": "12 AM",
    "stationName": "EAD_Sweihan",
    "pM10": 16,
    "o3": 52,
    "sO2": 35,
    "nO2": 23,
    "co": 0,
    "aqi": 26,
    "aqiIndex": "Good"
  },
  {
    "hour": "12 AM",
    "stationName": "EAD_Zakher",
    "pM10": 135,
    "o3": 0,
    "sO2": 55,
    "nO2": 20,
    "co": 0,
    "aqi": 90,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "12 AM",
    "stationName": "EAD_KhalifaCity",
    "pM10": 97,
    "o3": 57,
    "sO2": 13,
    "nO2": 15,
    "co": 0,
    "aqi": 65,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "01 AM",
    "stationName": "EAD_AlAinSchool",
    "pM10": 111,
    "o3": 57,
    "sO2": 56,
    "nO2": 25,
    "co": 0,
    "aqi": 74,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "01 AM",
    "stationName": "EAD_AlAinStreet",
    "pM10": 77,
    "o3": 0,
    "sO2": 28,
    "nO2": 27,
    "co": 0,
    "aqi": 51,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "01 AM",
    "stationName": "EAD_AlMafraq",
    "pM10": 230,
    "o3": 0,
    "sO2": 4,
    "nO2": 48,
    "co": 0,
    "aqi": 153,
    "aqiIndex": "UnHealthly"
  },
  {
    "hour": "01 AM",
    "stationName": "EAD_AlMaqta",
    "pM10": 115,
    "o3": 51,
    "sO2": 8,
    "nO2": 30,
    "co": 0,
    "aqi": 26,
    "aqiIndex": "Good"
  },
  {
    "hour": "01 AM",
    "stationName": "EAD_AlQuaa",
    "pM10": 14,
    "o3": 87,
    "sO2": 41,
    "nO2": 7,
    "co": 0,
    "aqi": 43,
    "aqiIndex": "Good"
  },
  {
    "hour": "01 AM",
    "stationName": "EAD_AlTawia",
    "pM10": 106,
    "o3": 53,
    "sO2": 32,
    "nO2": 10,
    "co": 0,
    "aqi": 71,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "01 AM",
    "stationName": "EAD_Baniyas",
    "pM10": 50,
    "o3": 30,
    "sO2": 3,
    "nO2": 39,
    "co": 0,
    "aqi": 15,
    "aqiIndex": "Good"
  },
  {
    "hour": "01 AM",
    "stationName": "EAD_BidaZayed",
    "pM10": 13,
    "o3": 62,
    "sO2": 6,
    "nO2": 6,
    "co": 0,
    "aqi": 31,
    "aqiIndex": "Good"
  },
  {
    "hour": "01 AM",
    "stationName": "EAD_E11Road",
    "pM10": 0,
    "o3": 0,
    "sO2": 10,
    "nO2": 18,
    "co": 0,
    "aqi": 4,
    "aqiIndex": "Good"
  },
  {
    "hour": "01 AM",
    "stationName": "EAD_Gayathi",
    "pM10": 145,
    "o3": 57,
    "sO2": 0,
    "nO2": 15,
    "co": 0,
    "aqi": 97,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "01 AM",
    "stationName": "EAD_Habshan",
    "pM10": 29,
    "o3": 85,
    "sO2": 13,
    "nO2": 9,
    "co": 0,
    "aqi": 43,
    "aqiIndex": "Good"
  },
  {
    "hour": "01 AM",
    "stationName": "EAD_HamdanStreet",
    "pM10": 76,
    "o3": 0,
    "sO2": 7,
    "nO2": 26,
    "co": 0,
    "aqi": 51,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "01 AM",
    "stationName": "EAD_KhadijaSchool",
    "pM10": 123,
    "o3": 71,
    "sO2": 8,
    "nO2": 12,
    "co": 0,
    "aqi": 82,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "01 AM",
    "stationName": "EAD_KhalifaSchool",
    "pM10": 120,
    "o3": 37,
    "sO2": 3,
    "nO2": 7,
    "co": 0,
    "aqi": 80,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "01 AM",
    "stationName": "EAD_Liwa",
    "pM10": 90,
    "o3": 59,
    "sO2": 17,
    "nO2": 8,
    "co": 0,
    "aqi": 60,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "01 AM",
    "stationName": "EAD_Mussafah",
    "pM10": 97,
    "o3": 0,
    "sO2": 11,
    "nO2": 17,
    "co": 0,
    "aqi": 65,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "01 AM",
    "stationName": "EAD_RuwaisTransco",
    "pM10": 0,
    "o3": 77,
    "sO2": 9,
    "nO2": 9,
    "co": 0,
    "aqi": 39,
    "aqiIndex": "Good"
  },
  {
    "hour": "01 AM",
    "stationName": "EAD_Sweihan",
    "pM10": 14,
    "o3": 34,
    "sO2": 24,
    "nO2": 18,
    "co": 0,
    "aqi": 17,
    "aqiIndex": "Good"
  },
  {
    "hour": "01 AM",
    "stationName": "EAD_Zakher",
    "pM10": 137,
    "o3": 0,
    "sO2": 36,
    "nO2": 18,
    "co": 0,
    "aqi": 91,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "01 AM",
    "stationName": "EAD_KhalifaCity",
    "pM10": 98,
    "o3": 65,
    "sO2": 12,
    "nO2": 10,
    "co": 0,
    "aqi": 65,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "02 AM",
    "stationName": "EAD_AlAinSchool",
    "pM10": 112,
    "o3": 69,
    "sO2": 45,
    "nO2": 19,
    "co": 0,
    "aqi": 75,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "02 AM",
    "stationName": "EAD_AlAinStreet",
    "pM10": 77,
    "o3": 0,
    "sO2": 25,
    "nO2": 28,
    "co": 0,
    "aqi": 52,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "02 AM",
    "stationName": "EAD_AlMafraq",
    "pM10": 227,
    "o3": 0,
    "sO2": 4,
    "nO2": 41,
    "co": 0,
    "aqi": 151,
    "aqiIndex": "UnHealthly"
  },
  {
    "hour": "02 AM",
    "stationName": "EAD_AlMaqta",
    "pM10": 109,
    "o3": 62,
    "sO2": 8,
    "nO2": 20,
    "co": 0,
    "aqi": 73,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "02 AM",
    "stationName": "EAD_AlQuaa",
    "pM10": 11,
    "o3": 86,
    "sO2": 40,
    "nO2": 7,
    "co": 0,
    "aqi": 43,
    "aqiIndex": "Good"
  },
  {
    "hour": "02 AM",
    "stationName": "EAD_AlTawia",
    "pM10": 109,
    "o3": 56,
    "sO2": 28,
    "nO2": 11,
    "co": 0,
    "aqi": 73,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "02 AM",
    "stationName": "EAD_Baniyas",
    "pM10": 43,
    "o3": 31,
    "sO2": 5,
    "nO2": 39,
    "co": 0,
    "aqi": 16,
    "aqiIndex": "Good"
  },
  {
    "hour": "02 AM",
    "stationName": "EAD_BidaZayed",
    "pM10": 11,
    "o3": 61,
    "sO2": 5,
    "nO2": 6,
    "co": 0,
    "aqi": 30,
    "aqiIndex": "Good"
  },
  {
    "hour": "02 AM",
    "stationName": "EAD_E11Road",
    "pM10": 0,
    "o3": 0,
    "sO2": 8,
    "nO2": 16,
    "co": 0,
    "aqi": 4,
    "aqiIndex": "Good"
  },
  {
    "hour": "02 AM",
    "stationName": "EAD_Gayathi",
    "pM10": 145,
    "o3": 65,
    "sO2": 9,
    "nO2": 11,
    "co": 0,
    "aqi": 97,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "02 AM",
    "stationName": "EAD_Habshan",
    "pM10": 32,
    "o3": 86,
    "sO2": 16,
    "nO2": 10,
    "co": 0,
    "aqi": 43,
    "aqiIndex": "Good"
  },
  {
    "hour": "02 AM",
    "stationName": "EAD_HamdanStreet",
    "pM10": 76,
    "o3": 0,
    "sO2": 15,
    "nO2": 22,
    "co": 0,
    "aqi": 51,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "02 AM",
    "stationName": "EAD_KhadijaSchool",
    "pM10": 124,
    "o3": 76,
    "sO2": 11,
    "nO2": 7,
    "co": 0,
    "aqi": 83,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "02 AM",
    "stationName": "EAD_KhalifaSchool",
    "pM10": 122,
    "o3": 40,
    "sO2": 3,
    "nO2": 6,
    "co": 0,
    "aqi": 81,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "02 AM",
    "stationName": "EAD_Liwa",
    "pM10": 93,
    "o3": 60,
    "sO2": 17,
    "nO2": 8,
    "co": 0,
    "aqi": 62,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "02 AM",
    "stationName": "EAD_Mussafah",
    "pM10": 97,
    "o3": 0,
    "sO2": 11,
    "nO2": 8,
    "co": 0,
    "aqi": 65,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "02 AM",
    "stationName": "EAD_RuwaisTransco",
    "pM10": 0,
    "o3": 76,
    "sO2": 10,
    "nO2": 8,
    "co": 0,
    "aqi": 38,
    "aqiIndex": "Good"
  },
  {
    "hour": "02 AM",
    "stationName": "EAD_Sweihan",
    "pM10": 12,
    "o3": 37,
    "sO2": 19,
    "nO2": 16,
    "co": 0,
    "aqi": 18,
    "aqiIndex": "Good"
  },
  {
    "hour": "02 AM",
    "stationName": "EAD_Zakher",
    "pM10": 140,
    "o3": 0,
    "sO2": 26,
    "nO2": 19,
    "co": 0,
    "aqi": 93,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "02 AM",
    "stationName": "EAD_KhalifaCity",
    "pM10": 99,
    "o3": 72,
    "sO2": 11,
    "nO2": 5,
    "co": 0,
    "aqi": 66,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "03 AM",
    "stationName": "EAD_AlAinSchool",
    "pM10": 115,
    "o3": 61,
    "sO2": 39,
    "nO2": 18,
    "co": 0,
    "aqi": 77,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "03 AM",
    "stationName": "EAD_AlAinStreet",
    "pM10": 79,
    "o3": 0,
    "sO2": 24,
    "nO2": 22,
    "co": 0,
    "aqi": 52,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "03 AM",
    "stationName": "EAD_AlMafraq",
    "pM10": 220,
    "o3": 0,
    "sO2": 4,
    "nO2": 31,
    "co": 0,
    "aqi": 147,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "03 AM",
    "stationName": "EAD_AlMaqta",
    "pM10": 107,
    "o3": 65,
    "sO2": 8,
    "nO2": 18,
    "co": 0,
    "aqi": 71,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "03 AM",
    "stationName": "EAD_AlQuaa",
    "pM10": 10,
    "o3": 80,
    "sO2": 34,
    "nO2": 6,
    "co": 0,
    "aqi": 40,
    "aqiIndex": "Good"
  },
  {
    "hour": "03 AM",
    "stationName": "EAD_AlTawia",
    "pM10": 109,
    "o3": 50,
    "sO2": 22,
    "nO2": 12,
    "co": 0,
    "aqi": 72,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "03 AM",
    "stationName": "EAD_Baniyas",
    "pM10": 38,
    "o3": 35,
    "sO2": 4,
    "nO2": 36,
    "co": 0,
    "aqi": 17,
    "aqiIndex": "Good"
  },
  {
    "hour": "03 AM",
    "stationName": "EAD_BidaZayed",
    "pM10": 10,
    "o3": 58,
    "sO2": 36,
    "nO2": 6,
    "co": 0,
    "aqi": 29,
    "aqiIndex": "Good"
  },
  {
    "hour": "03 AM",
    "stationName": "EAD_E11Road",
    "pM10": 0,
    "o3": 0,
    "sO2": 55,
    "nO2": 13,
    "co": 0,
    "aqi": 16,
    "aqiIndex": "Good"
  },
  {
    "hour": "03 AM",
    "stationName": "EAD_Gayathi",
    "pM10": 148,
    "o3": 59,
    "sO2": 8,
    "nO2": 11,
    "co": 0,
    "aqi": 99,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "03 AM",
    "stationName": "EAD_Habshan",
    "pM10": 34,
    "o3": 90,
    "sO2": 14,
    "nO2": 7,
    "co": 0,
    "aqi": 45,
    "aqiIndex": "Good"
  },
  {
    "hour": "03 AM",
    "stationName": "EAD_HamdanStreet",
    "pM10": 77,
    "o3": 0,
    "sO2": 13,
    "nO2": 20,
    "co": 0,
    "aqi": 52,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "03 AM",
    "stationName": "EAD_KhadijaSchool",
    "pM10": 126,
    "o3": 83,
    "sO2": 14,
    "nO2": 6,
    "co": 0,
    "aqi": 84,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "03 AM",
    "stationName": "EAD_KhalifaSchool",
    "pM10": 120,
    "o3": 42,
    "sO2": 8,
    "nO2": 6,
    "co": 0,
    "aqi": 80,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "03 AM",
    "stationName": "EAD_Liwa",
    "pM10": 98,
    "o3": 63,
    "sO2": 16,
    "nO2": 9,
    "co": 0,
    "aqi": 65,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "03 AM",
    "stationName": "EAD_Mussafah",
    "pM10": 97,
    "o3": 0,
    "sO2": 10,
    "nO2": 7,
    "co": 0,
    "aqi": 65,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "03 AM",
    "stationName": "EAD_RuwaisTransco",
    "pM10": 0,
    "o3": 74,
    "sO2": 11,
    "nO2": 9,
    "co": 0,
    "aqi": 37,
    "aqiIndex": "Good"
  },
  {
    "hour": "03 AM",
    "stationName": "EAD_Sweihan",
    "pM10": 11,
    "o3": 36,
    "sO2": 15,
    "nO2": 12,
    "co": 0,
    "aqi": 18,
    "aqiIndex": "Good"
  },
  {
    "hour": "03 AM",
    "stationName": "EAD_Zakher",
    "pM10": 141,
    "o3": 0,
    "sO2": 18,
    "nO2": 21,
    "co": 0,
    "aqi": 94,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "03 AM",
    "stationName": "EAD_KhalifaCity",
    "pM10": 100,
    "o3": 75,
    "sO2": 12,
    "nO2": 4,
    "co": 0,
    "aqi": 66,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "04 AM",
    "stationName": "EAD_AlAinSchool",
    "pM10": 117,
    "o3": 59,
    "sO2": 40,
    "nO2": 19,
    "co": 0,
    "aqi": 78,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "04 AM",
    "stationName": "EAD_AlAinStreet",
    "pM10": 79,
    "o3": 0,
    "sO2": 27,
    "nO2": 19,
    "co": 0,
    "aqi": 53,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "04 AM",
    "stationName": "EAD_AlMafraq",
    "pM10": 216,
    "o3": 0,
    "sO2": 6,
    "nO2": 33,
    "co": 0,
    "aqi": 144,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "04 AM",
    "stationName": "EAD_AlMaqta",
    "pM10": 106,
    "o3": 75,
    "sO2": 8,
    "nO2": 9,
    "co": 0,
    "aqi": 71,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "04 AM",
    "stationName": "EAD_AlQuaa",
    "pM10": 9,
    "o3": 74,
    "sO2": 26,
    "nO2": 6,
    "co": 0,
    "aqi": 37,
    "aqiIndex": "Good"
  },
  {
    "hour": "04 AM",
    "stationName": "EAD_AlTawia",
    "pM10": 108,
    "o3": 40,
    "sO2": 21,
    "nO2": 12,
    "co": 0,
    "aqi": 72,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "04 AM",
    "stationName": "EAD_Baniyas",
    "pM10": 34,
    "o3": 49,
    "sO2": 5,
    "nO2": 24,
    "co": 0,
    "aqi": 25,
    "aqiIndex": "Good"
  },
  {
    "hour": "04 AM",
    "stationName": "EAD_BidaZayed",
    "pM10": 9,
    "o3": 57,
    "sO2": 24,
    "nO2": 6,
    "co": 0,
    "aqi": 29,
    "aqiIndex": "Good"
  },
  {
    "hour": "04 AM",
    "stationName": "EAD_E11Road",
    "pM10": 0,
    "o3": 0,
    "sO2": 9,
    "nO2": 11,
    "co": 0,
    "aqi": 3,
    "aqiIndex": "Good"
  },
  {
    "hour": "04 AM",
    "stationName": "EAD_Gayathi",
    "pM10": 145,
    "o3": 66,
    "sO2": 8,
    "nO2": 9,
    "co": 0,
    "aqi": 97,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "04 AM",
    "stationName": "EAD_Habshan",
    "pM10": 39,
    "o3": 95,
    "sO2": 16,
    "nO2": 7,
    "co": 0,
    "aqi": 48,
    "aqiIndex": "Good"
  },
  {
    "hour": "04 AM",
    "stationName": "EAD_HamdanStreet",
    "pM10": 79,
    "o3": 0,
    "sO2": 1,
    "nO2": 15,
    "co": 0,
    "aqi": 52,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "04 AM",
    "stationName": "EAD_KhadijaSchool",
    "pM10": 128,
    "o3": 81,
    "sO2": 10,
    "nO2": 5,
    "co": 0,
    "aqi": 85,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "04 AM",
    "stationName": "EAD_KhalifaSchool",
    "pM10": 122,
    "o3": 42,
    "sO2": 4,
    "nO2": 5,
    "co": 0,
    "aqi": 82,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "04 AM",
    "stationName": "EAD_Liwa",
    "pM10": 101,
    "o3": 62,
    "sO2": 14,
    "nO2": 8,
    "co": 0,
    "aqi": 68,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "04 AM",
    "stationName": "EAD_Mussafah",
    "pM10": 98,
    "o3": 0,
    "sO2": 9,
    "nO2": 9,
    "co": 0,
    "aqi": 65,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "04 AM",
    "stationName": "EAD_RuwaisTransco",
    "pM10": 0,
    "o3": 69,
    "sO2": 12,
    "nO2": 12,
    "co": 0,
    "aqi": 35,
    "aqiIndex": "Good"
  },
  {
    "hour": "04 AM",
    "stationName": "EAD_Sweihan",
    "pM10": 0,
    "o3": 28,
    "sO2": 13,
    "nO2": 10,
    "co": 0,
    "aqi": 14,
    "aqiIndex": "Good"
  },
  {
    "hour": "04 AM",
    "stationName": "EAD_Zakher",
    "pM10": 142,
    "o3": 0,
    "sO2": 16,
    "nO2": 15,
    "co": 0,
    "aqi": 95,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "04 AM",
    "stationName": "EAD_KhalifaCity",
    "pM10": 100,
    "o3": 81,
    "sO2": 11,
    "nO2": 3,
    "co": 0,
    "aqi": 67,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "05 AM",
    "stationName": "EAD_AlAinSchool",
    "pM10": 120,
    "o3": 42,
    "sO2": 33,
    "nO2": 28,
    "co": 0,
    "aqi": 80,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "05 AM",
    "stationName": "EAD_AlAinStreet",
    "pM10": 80,
    "o3": 0,
    "sO2": 20,
    "nO2": 23,
    "co": 0,
    "aqi": 54,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "05 AM",
    "stationName": "EAD_AlMafraq",
    "pM10": 213,
    "o3": 0,
    "sO2": 5,
    "nO2": 26,
    "co": 0,
    "aqi": 142,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "05 AM",
    "stationName": "EAD_AlMaqta",
    "pM10": 104,
    "o3": 73,
    "sO2": 9,
    "nO2": 8,
    "co": 0,
    "aqi": 70,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "05 AM",
    "stationName": "EAD_AlQuaa",
    "pM10": 8,
    "o3": 80,
    "sO2": 28,
    "nO2": 6,
    "co": 0,
    "aqi": 40,
    "aqiIndex": "Good"
  },
  {
    "hour": "05 AM",
    "stationName": "EAD_AlTawia",
    "pM10": 110,
    "o3": 30,
    "sO2": 18,
    "nO2": 17,
    "co": 0,
    "aqi": 74,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "05 AM",
    "stationName": "EAD_Baniyas",
    "pM10": 30,
    "o3": 37,
    "sO2": 5,
    "nO2": 38,
    "co": 0,
    "aqi": 19,
    "aqiIndex": "Good"
  },
  {
    "hour": "05 AM",
    "stationName": "EAD_BidaZayed",
    "pM10": 9,
    "o3": 77,
    "sO2": 14,
    "nO2": 6,
    "co": 0,
    "aqi": 38,
    "aqiIndex": "Good"
  },
  {
    "hour": "05 AM",
    "stationName": "EAD_E11Road",
    "pM10": 0,
    "o3": 0,
    "sO2": 6,
    "nO2": 10,
    "co": 0,
    "aqi": 2,
    "aqiIndex": "Good"
  },
  {
    "hour": "05 AM",
    "stationName": "EAD_Gayathi",
    "pM10": 194,
    "o3": 64,
    "sO2": 10,
    "nO2": 9,
    "co": 0,
    "aqi": 129,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "05 AM",
    "stationName": "EAD_Habshan",
    "pM10": 40,
    "o3": 91,
    "sO2": 17,
    "nO2": 8,
    "co": 0,
    "aqi": 45,
    "aqiIndex": "Good"
  },
  {
    "hour": "05 AM",
    "stationName": "EAD_HamdanStreet",
    "pM10": 79,
    "o3": 0,
    "sO2": 1,
    "nO2": 17,
    "co": 0,
    "aqi": 53,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "05 AM",
    "stationName": "EAD_KhadijaSchool",
    "pM10": 128,
    "o3": 79,
    "sO2": 10,
    "nO2": 11,
    "co": 0,
    "aqi": 86,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "05 AM",
    "stationName": "EAD_KhalifaSchool",
    "pM10": 113,
    "o3": 41,
    "sO2": 4,
    "nO2": 6,
    "co": 0,
    "aqi": 75,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "05 AM",
    "stationName": "EAD_Liwa",
    "pM10": 102,
    "o3": 55,
    "sO2": 14,
    "nO2": 8,
    "co": 0,
    "aqi": 68,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "05 AM",
    "stationName": "EAD_Mussafah",
    "pM10": 97,
    "o3": 0,
    "sO2": 10,
    "nO2": 12,
    "co": 0,
    "aqi": 65,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "05 AM",
    "stationName": "EAD_RuwaisTransco",
    "pM10": 0,
    "o3": 72,
    "sO2": 14,
    "nO2": 12,
    "co": 0,
    "aqi": 36,
    "aqiIndex": "Good"
  },
  {
    "hour": "05 AM",
    "stationName": "EAD_Sweihan",
    "pM10": 0,
    "o3": 22,
    "sO2": 9,
    "nO2": 11,
    "co": 0,
    "aqi": 11,
    "aqiIndex": "Good"
  },
  {
    "hour": "05 AM",
    "stationName": "EAD_Zakher",
    "pM10": 143,
    "o3": 0,
    "sO2": 11,
    "nO2": 17,
    "co": 0,
    "aqi": 95,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "05 AM",
    "stationName": "EAD_KhalifaCity",
    "pM10": 101,
    "o3": 81,
    "sO2": 12,
    "nO2": 2,
    "co": 0,
    "aqi": 67,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "06 AM",
    "stationName": "EAD_AlAinSchool",
    "pM10": 122,
    "o3": 28,
    "sO2": 27,
    "nO2": 40,
    "co": 0,
    "aqi": 82,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "06 AM",
    "stationName": "EAD_AlAinStreet",
    "pM10": 81,
    "o3": 0,
    "sO2": 23,
    "nO2": 30,
    "co": 1,
    "aqi": 54,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "06 AM",
    "stationName": "EAD_AlMafraq",
    "pM10": 207,
    "o3": 0,
    "sO2": 5,
    "nO2": 37,
    "co": 0,
    "aqi": 138,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "06 AM",
    "stationName": "EAD_AlMaqta",
    "pM10": 105,
    "o3": 71,
    "sO2": 9,
    "nO2": 12,
    "co": 0,
    "aqi": 70,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "06 AM",
    "stationName": "EAD_AlQuaa",
    "pM10": 7,
    "o3": 74,
    "sO2": 21,
    "nO2": 6,
    "co": 0,
    "aqi": 37,
    "aqiIndex": "Good"
  },
  {
    "hour": "06 AM",
    "stationName": "EAD_AlTawia",
    "pM10": 111,
    "o3": 22,
    "sO2": 13,
    "nO2": 21,
    "co": 0,
    "aqi": 74,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "06 AM",
    "stationName": "EAD_Baniyas",
    "pM10": 27,
    "o3": 43,
    "sO2": 4,
    "nO2": 30,
    "co": 0,
    "aqi": 22,
    "aqiIndex": "Good"
  },
  {
    "hour": "06 AM",
    "stationName": "EAD_BidaZayed",
    "pM10": 8,
    "o3": 62,
    "sO2": 12,
    "nO2": 6,
    "co": 0,
    "aqi": 31,
    "aqiIndex": "Good"
  },
  {
    "hour": "06 AM",
    "stationName": "EAD_E11Road",
    "pM10": 0,
    "o3": 0,
    "sO2": 6,
    "nO2": 10,
    "co": 0,
    "aqi": 3,
    "aqiIndex": "Good"
  },
  {
    "hour": "06 AM",
    "stationName": "EAD_Gayathi",
    "pM10": 205,
    "o3": 63,
    "sO2": 10,
    "nO2": 14,
    "co": 0,
    "aqi": 136,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "06 AM",
    "stationName": "EAD_Habshan",
    "pM10": 46,
    "o3": 77,
    "sO2": 18,
    "nO2": 14,
    "co": 0,
    "aqi": 38,
    "aqiIndex": "Good"
  },
  {
    "hour": "06 AM",
    "stationName": "EAD_HamdanStreet",
    "pM10": 80,
    "o3": 0,
    "sO2": 3,
    "nO2": 32,
    "co": 0,
    "aqi": 53,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "06 AM",
    "stationName": "EAD_KhadijaSchool",
    "pM10": 129,
    "o3": 70,
    "sO2": 12,
    "nO2": 28,
    "co": 0,
    "aqi": 86,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "06 AM",
    "stationName": "EAD_KhalifaSchool",
    "pM10": 114,
    "o3": 41,
    "sO2": 5,
    "nO2": 11,
    "co": 0,
    "aqi": 76,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "06 AM",
    "stationName": "EAD_Liwa",
    "pM10": 98,
    "o3": 43,
    "sO2": 14,
    "nO2": 9,
    "co": 0,
    "aqi": 65,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "06 AM",
    "stationName": "EAD_Mussafah",
    "pM10": 97,
    "o3": 0,
    "sO2": 10,
    "nO2": 29,
    "co": 0,
    "aqi": 64,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "06 AM",
    "stationName": "EAD_RuwaisTransco",
    "pM10": 0,
    "o3": 64,
    "sO2": 16,
    "nO2": 16,
    "co": 0,
    "aqi": 32,
    "aqiIndex": "Good"
  },
  {
    "hour": "06 AM",
    "stationName": "EAD_Sweihan",
    "pM10": 0,
    "o3": 20,
    "sO2": 9,
    "nO2": 18,
    "co": 0,
    "aqi": 10,
    "aqiIndex": "Good"
  },
  {
    "hour": "06 AM",
    "stationName": "EAD_Zakher",
    "pM10": 144,
    "o3": 0,
    "sO2": 10,
    "nO2": 24,
    "co": 0,
    "aqi": 96,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "06 AM",
    "stationName": "EAD_KhalifaCity",
    "pM10": 101,
    "o3": 74,
    "sO2": 12,
    "nO2": 7,
    "co": 0,
    "aqi": 67,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "07 AM",
    "stationName": "EAD_AlAinSchool",
    "pM10": 124,
    "o3": 26,
    "sO2": 20,
    "nO2": 45,
    "co": 0,
    "aqi": 83,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "07 AM",
    "stationName": "EAD_AlAinStreet",
    "pM10": 81,
    "o3": 0,
    "sO2": 22,
    "nO2": 49,
    "co": 0,
    "aqi": 54,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "07 AM",
    "stationName": "EAD_AlMafraq",
    "pM10": 215,
    "o3": 0,
    "sO2": 5,
    "nO2": 56,
    "co": 0,
    "aqi": 144,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "07 AM",
    "stationName": "EAD_AlMaqta",
    "pM10": 107,
    "o3": 63,
    "sO2": 10,
    "nO2": 29,
    "co": 0,
    "aqi": 71,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "07 AM",
    "stationName": "EAD_AlQuaa",
    "pM10": 6,
    "o3": 66,
    "sO2": 17,
    "nO2": 7,
    "co": 0,
    "aqi": 33,
    "aqiIndex": "Good"
  },
  {
    "hour": "07 AM",
    "stationName": "EAD_AlTawia",
    "pM10": 111,
    "o3": 24,
    "sO2": 11,
    "nO2": 21,
    "co": 0,
    "aqi": 74,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "07 AM",
    "stationName": "EAD_Baniyas",
    "pM10": 25,
    "o3": 6,
    "sO2": 3,
    "nO2": 77,
    "co": 0,
    "aqi": 19,
    "aqiIndex": "Good"
  },
  {
    "hour": "07 AM",
    "stationName": "EAD_BidaZayed",
    "pM10": 7,
    "o3": 51,
    "sO2": 11,
    "nO2": 6,
    "co": 0,
    "aqi": 25,
    "aqiIndex": "Good"
  },
  {
    "hour": "07 AM",
    "stationName": "EAD_E11Road",
    "pM10": 0,
    "o3": 0,
    "sO2": 6,
    "nO2": 17,
    "co": 0,
    "aqi": 4,
    "aqiIndex": "Good"
  },
  {
    "hour": "07 AM",
    "stationName": "EAD_Gayathi",
    "pM10": 198,
    "o3": 49,
    "sO2": 11,
    "nO2": 30,
    "co": 0,
    "aqi": 132,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "07 AM",
    "stationName": "EAD_Habshan",
    "pM10": 46,
    "o3": 79,
    "sO2": 18,
    "nO2": 14,
    "co": 0,
    "aqi": 39,
    "aqiIndex": "Good"
  },
  {
    "hour": "07 AM",
    "stationName": "EAD_HamdanStreet",
    "pM10": 80,
    "o3": 0,
    "sO2": 8,
    "nO2": 65,
    "co": 0,
    "aqi": 53,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "07 AM",
    "stationName": "EAD_KhadijaSchool",
    "pM10": 130,
    "o3": 62,
    "sO2": 13,
    "nO2": 42,
    "co": 0,
    "aqi": 87,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "07 AM",
    "stationName": "EAD_KhalifaSchool",
    "pM10": 97,
    "o3": 40,
    "sO2": 4,
    "nO2": 26,
    "co": 0,
    "aqi": 64,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "07 AM",
    "stationName": "EAD_Liwa",
    "pM10": 105,
    "o3": 38,
    "sO2": 15,
    "nO2": 10,
    "co": 0,
    "aqi": 70,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "07 AM",
    "stationName": "EAD_Mussafah",
    "pM10": 96,
    "o3": 0,
    "sO2": 11,
    "nO2": 37,
    "co": 0,
    "aqi": 64,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "07 AM",
    "stationName": "EAD_RuwaisTransco",
    "pM10": 0,
    "o3": 68,
    "sO2": 15,
    "nO2": 14,
    "co": 0,
    "aqi": 34,
    "aqiIndex": "Good"
  },
  {
    "hour": "07 AM",
    "stationName": "EAD_Sweihan",
    "pM10": 0,
    "o3": 20,
    "sO2": 8,
    "nO2": 23,
    "co": 0,
    "aqi": 10,
    "aqiIndex": "Good"
  },
  {
    "hour": "07 AM",
    "stationName": "EAD_Zakher",
    "pM10": 145,
    "o3": 0,
    "sO2": 12,
    "nO2": 42,
    "co": 0,
    "aqi": 97,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "07 AM",
    "stationName": "EAD_KhalifaCity",
    "pM10": 102,
    "o3": 65,
    "sO2": 10,
    "nO2": 21,
    "co": 0,
    "aqi": 68,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "08 AM",
    "stationName": "EAD_AlAinSchool",
    "pM10": 125,
    "o3": 34,
    "sO2": 19,
    "nO2": 65,
    "co": 0,
    "aqi": 84,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "08 AM",
    "stationName": "EAD_AlAinStreet",
    "pM10": 83,
    "o3": 0,
    "sO2": 11,
    "nO2": 55,
    "co": 0,
    "aqi": 55,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "08 AM",
    "stationName": "EAD_AlMafraq",
    "pM10": 197,
    "o3": 0,
    "sO2": 5,
    "nO2": 67,
    "co": 0,
    "aqi": 131,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "08 AM",
    "stationName": "EAD_AlMaqta",
    "pM10": 109,
    "o3": 58,
    "sO2": 10,
    "nO2": 43,
    "co": 0,
    "aqi": 73,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "08 AM",
    "stationName": "EAD_AlQuaa",
    "pM10": 6,
    "o3": 60,
    "sO2": 13,
    "nO2": 8,
    "co": 0,
    "aqi": 30,
    "aqiIndex": "Good"
  },
  {
    "hour": "08 AM",
    "stationName": "EAD_AlTawia",
    "pM10": 111,
    "o3": 14,
    "sO2": 13,
    "nO2": 32,
    "co": 0,
    "aqi": 74,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "08 AM",
    "stationName": "EAD_Baniyas",
    "pM10": 23,
    "o3": 16,
    "sO2": 2,
    "nO2": 72,
    "co": 0,
    "aqi": 18,
    "aqiIndex": "Good"
  },
  {
    "hour": "08 AM",
    "stationName": "EAD_BidaZayed",
    "pM10": 7,
    "o3": 47,
    "sO2": 12,
    "nO2": 6,
    "co": 0,
    "aqi": 23,
    "aqiIndex": "Good"
  },
  {
    "hour": "08 AM",
    "stationName": "EAD_E11Road",
    "pM10": 0,
    "o3": 0,
    "sO2": 7,
    "nO2": 22,
    "co": 0,
    "aqi": 5,
    "aqiIndex": "Good"
  },
  {
    "hour": "08 AM",
    "stationName": "EAD_Gayathi",
    "pM10": 187,
    "o3": 47,
    "sO2": 11,
    "nO2": 26,
    "co": 0,
    "aqi": 125,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "08 AM",
    "stationName": "EAD_Habshan",
    "pM10": 48,
    "o3": 89,
    "sO2": 16,
    "nO2": 20,
    "co": 0,
    "aqi": 44,
    "aqiIndex": "Good"
  },
  {
    "hour": "08 AM",
    "stationName": "EAD_HamdanStreet",
    "pM10": 80,
    "o3": 0,
    "sO2": 14,
    "nO2": 76,
    "co": 1,
    "aqi": 53,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "08 AM",
    "stationName": "EAD_KhadijaSchool",
    "pM10": 130,
    "o3": 66,
    "sO2": 18,
    "nO2": 29,
    "co": 0,
    "aqi": 87,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "08 AM",
    "stationName": "EAD_KhalifaSchool",
    "pM10": 97,
    "o3": 37,
    "sO2": 7,
    "nO2": 21,
    "co": 0,
    "aqi": 65,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "08 AM",
    "stationName": "EAD_Liwa",
    "pM10": 108,
    "o3": 55,
    "sO2": 16,
    "nO2": 9,
    "co": 0,
    "aqi": 72,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "08 AM",
    "stationName": "EAD_Mussafah",
    "pM10": 96,
    "o3": 0,
    "sO2": 11,
    "nO2": 39,
    "co": 0,
    "aqi": 64,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "08 AM",
    "stationName": "EAD_RuwaisTransco",
    "pM10": 0,
    "o3": 76,
    "sO2": 11,
    "nO2": 13,
    "co": 0,
    "aqi": 38,
    "aqiIndex": "Good"
  },
  {
    "hour": "08 AM",
    "stationName": "EAD_Sweihan",
    "pM10": 0,
    "o3": 11,
    "sO2": 8,
    "nO2": 33,
    "co": 0,
    "aqi": 8,
    "aqiIndex": "Good"
  },
  {
    "hour": "08 AM",
    "stationName": "EAD_Zakher",
    "pM10": 147,
    "o3": 0,
    "sO2": 10,
    "nO2": 51,
    "co": 0,
    "aqi": 98,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "08 AM",
    "stationName": "EAD_KhalifaCity",
    "pM10": 104,
    "o3": 76,
    "sO2": 12,
    "nO2": 18,
    "co": 0,
    "aqi": 69,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "09 AM",
    "stationName": "EAD_AlAinSchool",
    "pM10": 126,
    "o3": 61,
    "sO2": 12,
    "nO2": 31,
    "co": 0,
    "aqi": 84,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "09 AM",
    "stationName": "EAD_AlAinStreet",
    "pM10": 82,
    "o3": 0,
    "sO2": 1,
    "nO2": 22,
    "co": 0,
    "aqi": 55,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "09 AM",
    "stationName": "EAD_AlMafraq",
    "pM10": 195,
    "o3": 0,
    "sO2": 4,
    "nO2": 38,
    "co": 0,
    "aqi": 130,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "09 AM",
    "stationName": "EAD_AlMaqta",
    "pM10": 111,
    "o3": 76,
    "sO2": 10,
    "nO2": 21,
    "co": 0,
    "aqi": 74,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "09 AM",
    "stationName": "EAD_AlQuaa",
    "pM10": 15,
    "o3": 62,
    "sO2": 11,
    "nO2": 8,
    "co": 0,
    "aqi": 31,
    "aqiIndex": "Good"
  },
  {
    "hour": "09 AM",
    "stationName": "EAD_AlTawia",
    "pM10": 111,
    "o3": 47,
    "sO2": 10,
    "nO2": 16,
    "co": 0,
    "aqi": 74,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "09 AM",
    "stationName": "EAD_Baniyas",
    "pM10": 22,
    "o3": 65,
    "sO2": 2,
    "nO2": 25,
    "co": 0,
    "aqi": 33,
    "aqiIndex": "Good"
  },
  {
    "hour": "09 AM",
    "stationName": "EAD_BidaZayed",
    "pM10": 1,
    "o3": 59,
    "sO2": 14,
    "nO2": 6,
    "co": 0,
    "aqi": 29,
    "aqiIndex": "Good"
  },
  {
    "hour": "09 AM",
    "stationName": "EAD_E11Road",
    "pM10": 0,
    "o3": 0,
    "sO2": 26,
    "nO2": 16,
    "co": 0,
    "aqi": 7,
    "aqiIndex": "Good"
  },
  {
    "hour": "09 AM",
    "stationName": "EAD_Gayathi",
    "pM10": 178,
    "o3": 65,
    "sO2": 11,
    "nO2": 21,
    "co": 0,
    "aqi": 119,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "09 AM",
    "stationName": "EAD_Habshan",
    "pM10": 48,
    "o3": 109,
    "sO2": 15,
    "nO2": 15,
    "co": 0,
    "aqi": 55,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "09 AM",
    "stationName": "EAD_HamdanStreet",
    "pM10": 80,
    "o3": 0,
    "sO2": 11,
    "nO2": 58,
    "co": 0,
    "aqi": 53,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "09 AM",
    "stationName": "EAD_KhadijaSchool",
    "pM10": 131,
    "o3": 78,
    "sO2": 13,
    "nO2": 20,
    "co": 0,
    "aqi": 87,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "09 AM",
    "stationName": "EAD_KhalifaSchool",
    "pM10": 87,
    "o3": 41,
    "sO2": 6,
    "nO2": 14,
    "co": 0,
    "aqi": 58,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "09 AM",
    "stationName": "EAD_Liwa",
    "pM10": 121,
    "o3": 64,
    "sO2": 16,
    "nO2": 10,
    "co": 0,
    "aqi": 80,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "09 AM",
    "stationName": "EAD_Mussafah",
    "pM10": 96,
    "o3": 0,
    "sO2": 10,
    "nO2": 27,
    "co": 0,
    "aqi": 64,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "09 AM",
    "stationName": "EAD_RuwaisTransco",
    "pM10": 0,
    "o3": 78,
    "sO2": 14,
    "nO2": 9,
    "co": 0,
    "aqi": 39,
    "aqiIndex": "Good"
  },
  {
    "hour": "09 AM",
    "stationName": "EAD_Sweihan",
    "pM10": 0,
    "o3": 38,
    "sO2": 8,
    "nO2": 33,
    "co": 0,
    "aqi": 19,
    "aqiIndex": "Good"
  },
  {
    "hour": "09 AM",
    "stationName": "EAD_Zakher",
    "pM10": 148,
    "o3": 0,
    "sO2": 9,
    "nO2": 34,
    "co": 0,
    "aqi": 99,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "09 AM",
    "stationName": "EAD_KhalifaCity",
    "pM10": 103,
    "o3": 84,
    "sO2": 11,
    "nO2": 10,
    "co": 0,
    "aqi": 69,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "10 AM",
    "stationName": "EAD_AlAinSchool",
    "pM10": 127,
    "o3": 87,
    "sO2": 9,
    "nO2": 12,
    "co": 0,
    "aqi": 84,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "10 AM",
    "stationName": "EAD_AlAinStreet",
    "pM10": 81,
    "o3": 0,
    "sO2": 1,
    "nO2": 12,
    "co": 0,
    "aqi": 54,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "10 AM",
    "stationName": "EAD_AlMafraq",
    "pM10": 221,
    "o3": 0,
    "sO2": 5,
    "nO2": 37,
    "co": 0,
    "aqi": 147,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "10 AM",
    "stationName": "EAD_AlMaqta",
    "pM10": 112,
    "o3": 82,
    "sO2": 10,
    "nO2": 15,
    "co": 0,
    "aqi": 75,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "10 AM",
    "stationName": "EAD_AlQuaa",
    "pM10": 5,
    "o3": 80,
    "sO2": 9,
    "nO2": 6,
    "co": 0,
    "aqi": 40,
    "aqiIndex": "Good"
  },
  {
    "hour": "10 AM",
    "stationName": "EAD_AlTawia",
    "pM10": 112,
    "o3": 79,
    "sO2": 8,
    "nO2": 8,
    "co": 0,
    "aqi": 75,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "10 AM",
    "stationName": "EAD_Baniyas",
    "pM10": 20,
    "o3": 76,
    "sO2": 2,
    "nO2": 15,
    "co": 0,
    "aqi": 38,
    "aqiIndex": "Good"
  },
  {
    "hour": "10 AM",
    "stationName": "EAD_BidaZayed",
    "pM10": 6,
    "o3": 77,
    "sO2": 18,
    "nO2": 6,
    "co": 0,
    "aqi": 39,
    "aqiIndex": "Good"
  },
  {
    "hour": "10 AM",
    "stationName": "EAD_E11Road",
    "pM10": 0,
    "o3": 0,
    "sO2": 68,
    "nO2": 15,
    "co": 0,
    "aqi": 20,
    "aqiIndex": "Good"
  },
  {
    "hour": "10 AM",
    "stationName": "EAD_Gayathi",
    "pM10": 171,
    "o3": 83,
    "sO2": 12,
    "nO2": 15,
    "co": 0,
    "aqi": 114,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "10 AM",
    "stationName": "EAD_Habshan",
    "pM10": 48,
    "o3": 99,
    "sO2": 15,
    "nO2": 9,
    "co": 0,
    "aqi": 49,
    "aqiIndex": "Good"
  },
  {
    "hour": "10 AM",
    "stationName": "EAD_HamdanStreet",
    "pM10": 80,
    "o3": 0,
    "sO2": 17,
    "nO2": 46,
    "co": 0,
    "aqi": 53,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "10 AM",
    "stationName": "EAD_KhadijaSchool",
    "pM10": 131,
    "o3": 79,
    "sO2": 12,
    "nO2": 24,
    "co": 0,
    "aqi": 87,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "10 AM",
    "stationName": "EAD_KhalifaSchool",
    "pM10": 88,
    "o3": 44,
    "sO2": 4,
    "nO2": 13,
    "co": 0,
    "aqi": 59,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "10 AM",
    "stationName": "EAD_Liwa",
    "pM10": 120,
    "o3": 76,
    "sO2": 16,
    "nO2": 8,
    "co": 0,
    "aqi": 80,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "10 AM",
    "stationName": "EAD_Mussafah",
    "pM10": 95,
    "o3": 0,
    "sO2": 8,
    "nO2": 22,
    "co": 0,
    "aqi": 64,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "10 AM",
    "stationName": "EAD_RuwaisTransco",
    "pM10": 0,
    "o3": 74,
    "sO2": 12,
    "nO2": 10,
    "co": 0,
    "aqi": 37,
    "aqiIndex": "Good"
  },
  {
    "hour": "10 AM",
    "stationName": "EAD_Sweihan",
    "pM10": 6,
    "o3": 83,
    "sO2": 7,
    "nO2": 13,
    "co": 0,
    "aqi": 41,
    "aqiIndex": "Good"
  },
  {
    "hour": "10 AM",
    "stationName": "EAD_Zakher",
    "pM10": 150,
    "o3": 0,
    "sO2": 11,
    "nO2": 16,
    "co": 0,
    "aqi": 100,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "10 AM",
    "stationName": "EAD_KhalifaCity",
    "pM10": 104,
    "o3": 94,
    "sO2": 15,
    "nO2": 5,
    "co": 0,
    "aqi": 69,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "11 AM",
    "stationName": "EAD_AlAinSchool",
    "pM10": 127,
    "o3": 97,
    "sO2": 7,
    "nO2": 11,
    "co": 0,
    "aqi": 85,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "11 AM",
    "stationName": "EAD_AlAinStreet",
    "pM10": 82,
    "o3": 0,
    "sO2": 1,
    "nO2": 12,
    "co": 0,
    "aqi": 55,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "11 AM",
    "stationName": "EAD_AlMafraq",
    "pM10": 221,
    "o3": 0,
    "sO2": 5,
    "nO2": 26,
    "co": 0,
    "aqi": 147,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "11 AM",
    "stationName": "EAD_AlMaqta",
    "pM10": 113,
    "o3": 89,
    "sO2": 10,
    "nO2": 12,
    "co": 0,
    "aqi": 75,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "11 AM",
    "stationName": "EAD_AlQuaa",
    "pM10": 13,
    "o3": 93,
    "sO2": 12,
    "nO2": 5,
    "co": 0,
    "aqi": 46,
    "aqiIndex": "Good"
  },
  {
    "hour": "11 AM",
    "stationName": "EAD_AlTawia",
    "pM10": 112,
    "o3": 89,
    "sO2": 8,
    "nO2": 6,
    "co": 0,
    "aqi": 75,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "11 AM",
    "stationName": "EAD_Baniyas",
    "pM10": 19,
    "o3": 85,
    "sO2": 2,
    "nO2": 11,
    "co": 0,
    "aqi": 43,
    "aqiIndex": "Good"
  },
  {
    "hour": "11 AM",
    "stationName": "EAD_BidaZayed",
    "pM10": 1,
    "o3": 86,
    "sO2": 20,
    "nO2": 6,
    "co": 0,
    "aqi": 43,
    "aqiIndex": "Good"
  },
  {
    "hour": "11 AM",
    "stationName": "EAD_E11Road",
    "pM10": 0,
    "o3": 0,
    "sO2": 49,
    "nO2": 13,
    "co": 0,
    "aqi": 14,
    "aqiIndex": "Good"
  },
  {
    "hour": "11 AM",
    "stationName": "EAD_Gayathi",
    "pM10": 167,
    "o3": 91,
    "sO2": 19,
    "nO2": 11,
    "co": 0,
    "aqi": 112,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "11 AM",
    "stationName": "EAD_Habshan",
    "pM10": 48,
    "o3": 101,
    "sO2": 17,
    "nO2": 8,
    "co": 0,
    "aqi": 51,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "11 AM",
    "stationName": "EAD_HamdanStreet",
    "pM10": 81,
    "o3": 0,
    "sO2": 21,
    "nO2": 42,
    "co": 0,
    "aqi": 54,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "11 AM",
    "stationName": "EAD_KhadijaSchool",
    "pM10": 130,
    "o3": 80,
    "sO2": 12,
    "nO2": 26,
    "co": 0,
    "aqi": 87,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "11 AM",
    "stationName": "EAD_KhalifaSchool",
    "pM10": 81,
    "o3": 43,
    "sO2": 3,
    "nO2": 12,
    "co": 0,
    "aqi": 54,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "11 AM",
    "stationName": "EAD_Liwa",
    "pM10": 125,
    "o3": 80,
    "sO2": 15,
    "nO2": 8,
    "co": 0,
    "aqi": 83,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "11 AM",
    "stationName": "EAD_Mussafah",
    "pM10": 94,
    "o3": 0,
    "sO2": 7,
    "nO2": 16,
    "co": 0,
    "aqi": 63,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "11 AM",
    "stationName": "EAD_RuwaisTransco",
    "pM10": 0,
    "o3": 74,
    "sO2": 9,
    "nO2": 17,
    "co": 0,
    "aqi": 37,
    "aqiIndex": "Good"
  },
  {
    "hour": "11 AM",
    "stationName": "EAD_Sweihan",
    "pM10": 6,
    "o3": 105,
    "sO2": 7,
    "nO2": 5,
    "co": 0,
    "aqi": 53,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "11 AM",
    "stationName": "EAD_Zakher",
    "pM10": 151,
    "o3": 0,
    "sO2": 10,
    "nO2": 8,
    "co": 0,
    "aqi": 100,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "11 AM",
    "stationName": "EAD_KhalifaCity",
    "pM10": 104,
    "o3": 100,
    "sO2": 16,
    "nO2": 2,
    "co": 0,
    "aqi": 70,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "12 PM",
    "stationName": "EAD_AlAinSchool",
    "pM10": 127,
    "o3": 88,
    "sO2": 7,
    "nO2": 11,
    "co": 0,
    "aqi": 85,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "12 PM",
    "stationName": "EAD_AlAinStreet",
    "pM10": 82,
    "o3": 0,
    "sO2": 1,
    "nO2": 13,
    "co": 0,
    "aqi": 55,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "12 PM",
    "stationName": "EAD_AlMafraq",
    "pM10": 220,
    "o3": 0,
    "sO2": 5,
    "nO2": 23,
    "co": 0,
    "aqi": 147,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "12 PM",
    "stationName": "EAD_AlMaqta",
    "pM10": 115,
    "o3": 93,
    "sO2": 11,
    "nO2": 11,
    "co": 0,
    "aqi": 76,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "12 PM",
    "stationName": "EAD_AlQuaa",
    "pM10": 12,
    "o3": 100,
    "sO2": 9,
    "nO2": 5,
    "co": 0,
    "aqi": 50,
    "aqiIndex": "Good"
  },
  {
    "hour": "12 PM",
    "stationName": "EAD_AlTawia",
    "pM10": 114,
    "o3": 94,
    "sO2": 7,
    "nO2": 5,
    "co": 0,
    "aqi": 76,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "12 PM",
    "stationName": "EAD_Baniyas",
    "pM10": 18,
    "o3": 91,
    "sO2": 2,
    "nO2": 10,
    "co": 0,
    "aqi": 46,
    "aqiIndex": "Good"
  },
  {
    "hour": "12 PM",
    "stationName": "EAD_BidaZayed",
    "pM10": 5,
    "o3": 89,
    "sO2": 26,
    "nO2": 6,
    "co": 0,
    "aqi": 44,
    "aqiIndex": "Good"
  },
  {
    "hour": "12 PM",
    "stationName": "EAD_E11Road",
    "pM10": 0,
    "o3": 0,
    "sO2": 42,
    "nO2": 12,
    "co": 0,
    "aqi": 12,
    "aqiIndex": "Good"
  },
  {
    "hour": "12 PM",
    "stationName": "EAD_Gayathi",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0,
    "aqiIndex": "Good"
  },
  {
    "hour": "12 PM",
    "stationName": "EAD_Habshan",
    "pM10": 48,
    "o3": 104,
    "sO2": 16,
    "nO2": 9,
    "co": 0,
    "aqi": 52,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "12 PM",
    "stationName": "EAD_HamdanStreet",
    "pM10": 80,
    "o3": 0,
    "sO2": 15,
    "nO2": 37,
    "co": 0,
    "aqi": 53,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "12 PM",
    "stationName": "EAD_KhadijaSchool",
    "pM10": 120,
    "o3": 85,
    "sO2": 12,
    "nO2": 18,
    "co": 0,
    "aqi": 80,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "12 PM",
    "stationName": "EAD_KhalifaSchool",
    "pM10": 82,
    "o3": 46,
    "sO2": 7,
    "nO2": 10,
    "co": 0,
    "aqi": 55,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "12 PM",
    "stationName": "EAD_Liwa",
    "pM10": 128,
    "o3": 83,
    "sO2": 13,
    "nO2": 10,
    "co": 0,
    "aqi": 86,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "12 PM",
    "stationName": "EAD_Mussafah",
    "pM10": 91,
    "o3": 0,
    "sO2": 6,
    "nO2": 13,
    "co": 0,
    "aqi": 61,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "12 PM",
    "stationName": "EAD_RuwaisTransco",
    "pM10": 0,
    "o3": 78,
    "sO2": 10,
    "nO2": 24,
    "co": 0,
    "aqi": 39,
    "aqiIndex": "Good"
  },
  {
    "hour": "12 PM",
    "stationName": "EAD_Sweihan",
    "pM10": 0,
    "o3": 110,
    "sO2": 7,
    "nO2": 3,
    "co": 0,
    "aqi": 55,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "12 PM",
    "stationName": "EAD_Zakher",
    "pM10": 150,
    "o3": 0,
    "sO2": 10,
    "nO2": 7,
    "co": 0,
    "aqi": 100,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "12 PM",
    "stationName": "EAD_KhalifaCity",
    "pM10": 101,
    "o3": 104,
    "sO2": 15,
    "nO2": 1,
    "co": 0,
    "aqi": 68,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "01 PM",
    "stationName": "EAD_AlAinSchool",
    "pM10": 129,
    "o3": 112,
    "sO2": 8,
    "nO2": 8,
    "co": 0,
    "aqi": 86,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "01 PM",
    "stationName": "EAD_AlAinStreet",
    "pM10": 82,
    "o3": 0,
    "sO2": 1,
    "nO2": 13,
    "co": 0,
    "aqi": 55,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "01 PM",
    "stationName": "EAD_AlMafraq",
    "pM10": 198,
    "o3": 0,
    "sO2": 4,
    "nO2": 22,
    "co": 0,
    "aqi": 132,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "01 PM",
    "stationName": "EAD_AlMaqta",
    "pM10": 115,
    "o3": 95,
    "sO2": 10,
    "nO2": 11,
    "co": 0,
    "aqi": 76,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "01 PM",
    "stationName": "EAD_AlQuaa",
    "pM10": 12,
    "o3": 100,
    "sO2": 8,
    "nO2": 5,
    "co": 0,
    "aqi": 50,
    "aqiIndex": "Good"
  },
  {
    "hour": "01 PM",
    "stationName": "EAD_AlTawia",
    "pM10": 115,
    "o3": 102,
    "sO2": 8,
    "nO2": 4,
    "co": 0,
    "aqi": 77,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "01 PM",
    "stationName": "EAD_Baniyas",
    "pM10": 17,
    "o3": 96,
    "sO2": 3,
    "nO2": 11,
    "co": 0,
    "aqi": 48,
    "aqiIndex": "Good"
  },
  {
    "hour": "01 PM",
    "stationName": "EAD_BidaZayed",
    "pM10": 5,
    "o3": 92,
    "sO2": 25,
    "nO2": 6,
    "co": 0,
    "aqi": 46,
    "aqiIndex": "Good"
  },
  {
    "hour": "01 PM",
    "stationName": "EAD_E11Road",
    "pM10": 0,
    "o3": 0,
    "sO2": 24,
    "nO2": 12,
    "co": 0,
    "aqi": 7,
    "aqiIndex": "Good"
  },
  {
    "hour": "01 PM",
    "stationName": "EAD_Gayathi",
    "pM10": 0,
    "o3": 112,
    "sO2": 33,
    "nO2": 11,
    "co": 0,
    "aqi": 56,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "01 PM",
    "stationName": "EAD_Habshan",
    "pM10": 49,
    "o3": 114,
    "sO2": 16,
    "nO2": 8,
    "co": 0,
    "aqi": 57,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "01 PM",
    "stationName": "EAD_HamdanStreet",
    "pM10": 75,
    "o3": 0,
    "sO2": 2,
    "nO2": 40,
    "co": 0,
    "aqi": 50,
    "aqiIndex": "Good"
  },
  {
    "hour": "01 PM",
    "stationName": "EAD_KhadijaSchool",
    "pM10": 102,
    "o3": 82,
    "sO2": 12,
    "nO2": 28,
    "co": 0,
    "aqi": 68,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "01 PM",
    "stationName": "EAD_KhalifaSchool",
    "pM10": 0,
    "o3": 45,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 23,
    "aqiIndex": "Good"
  },
  {
    "hour": "01 PM",
    "stationName": "EAD_Liwa",
    "pM10": 129,
    "o3": 85,
    "sO2": 12,
    "nO2": 9,
    "co": 0,
    "aqi": 86,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "01 PM",
    "stationName": "EAD_Mussafah",
    "pM10": 88,
    "o3": 0,
    "sO2": 6,
    "nO2": 12,
    "co": 0,
    "aqi": 58,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "01 PM",
    "stationName": "EAD_RuwaisTransco",
    "pM10": 0,
    "o3": 98,
    "sO2": 13,
    "nO2": 16,
    "co": 0,
    "aqi": 49,
    "aqiIndex": "Good"
  },
  {
    "hour": "01 PM",
    "stationName": "EAD_Sweihan",
    "pM10": 5,
    "o3": 112,
    "sO2": 7,
    "nO2": 4,
    "co": 0,
    "aqi": 56,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "01 PM",
    "stationName": "EAD_Zakher",
    "pM10": 150,
    "o3": 0,
    "sO2": 8,
    "nO2": 10,
    "co": 0,
    "aqi": 100,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "01 PM",
    "stationName": "EAD_KhalifaCity",
    "pM10": 97,
    "o3": 108,
    "sO2": 14,
    "nO2": 1,
    "co": 0,
    "aqi": 65,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "02 PM",
    "stationName": "EAD_AlAinSchool",
    "pM10": 130,
    "o3": 105,
    "sO2": 10,
    "nO2": 8,
    "co": 0,
    "aqi": 87,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "02 PM",
    "stationName": "EAD_AlAinStreet",
    "pM10": 83,
    "o3": 0,
    "sO2": 1,
    "nO2": 22,
    "co": 0,
    "aqi": 55,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "02 PM",
    "stationName": "EAD_AlMafraq",
    "pM10": 216,
    "o3": 0,
    "sO2": 4,
    "nO2": 23,
    "co": 0,
    "aqi": 144,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "02 PM",
    "stationName": "EAD_AlMaqta",
    "pM10": 115,
    "o3": 94,
    "sO2": 11,
    "nO2": 13,
    "co": 0,
    "aqi": 77,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "02 PM",
    "stationName": "EAD_AlQuaa",
    "pM10": 11,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 7,
    "aqiIndex": "Good"
  },
  {
    "hour": "02 PM",
    "stationName": "EAD_AlTawia",
    "pM10": 118,
    "o3": 106,
    "sO2": 9,
    "nO2": 4,
    "co": 0,
    "aqi": 79,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "02 PM",
    "stationName": "EAD_Baniyas",
    "pM10": 16,
    "o3": 96,
    "sO2": 5,
    "nO2": 11,
    "co": 0,
    "aqi": 48,
    "aqiIndex": "Good"
  },
  {
    "hour": "02 PM",
    "stationName": "EAD_BidaZayed",
    "pM10": 5,
    "o3": 101,
    "sO2": 13,
    "nO2": 6,
    "co": 0,
    "aqi": 51,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "02 PM",
    "stationName": "EAD_E11Road",
    "pM10": 0,
    "o3": 0,
    "sO2": 21,
    "nO2": 12,
    "co": 0,
    "aqi": 6,
    "aqiIndex": "Good"
  },
  {
    "hour": "02 PM",
    "stationName": "EAD_Gayathi",
    "pM10": 176,
    "o3": 119,
    "sO2": 21,
    "nO2": 11,
    "co": 0,
    "aqi": 117,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "02 PM",
    "stationName": "EAD_Habshan",
    "pM10": 53,
    "o3": 131,
    "sO2": 12,
    "nO2": 7,
    "co": 0,
    "aqi": 66,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "02 PM",
    "stationName": "EAD_HamdanStreet",
    "pM10": 72,
    "o3": 0,
    "sO2": 1,
    "nO2": 42,
    "co": 0,
    "aqi": 48,
    "aqiIndex": "Good"
  },
  {
    "hour": "02 PM",
    "stationName": "EAD_KhadijaSchool",
    "pM10": 91,
    "o3": 86,
    "sO2": 11,
    "nO2": 22,
    "co": 0,
    "aqi": 61,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "02 PM",
    "stationName": "EAD_KhalifaSchool",
    "pM10": 0,
    "o3": 48,
    "sO2": 4,
    "nO2": 0,
    "co": 0,
    "aqi": 24,
    "aqiIndex": "Good"
  },
  {
    "hour": "02 PM",
    "stationName": "EAD_Liwa",
    "pM10": 125,
    "o3": 89,
    "sO2": 8,
    "nO2": 9,
    "co": 0,
    "aqi": 83,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "02 PM",
    "stationName": "EAD_Mussafah",
    "pM10": 85,
    "o3": 0,
    "sO2": 5,
    "nO2": 14,
    "co": 0,
    "aqi": 57,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "02 PM",
    "stationName": "EAD_RuwaisTransco",
    "pM10": 70,
    "o3": 105,
    "sO2": 14,
    "nO2": 12,
    "co": 0,
    "aqi": 52,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "02 PM",
    "stationName": "EAD_Sweihan",
    "pM10": 0,
    "o3": 115,
    "sO2": 7,
    "nO2": 3,
    "co": 0,
    "aqi": 58,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "02 PM",
    "stationName": "EAD_Zakher",
    "pM10": 148,
    "o3": 0,
    "sO2": 9,
    "nO2": 11,
    "co": 0,
    "aqi": 99,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "02 PM",
    "stationName": "EAD_KhalifaCity",
    "pM10": 96,
    "o3": 106,
    "sO2": 13,
    "nO2": 1,
    "co": 0,
    "aqi": 64,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "03 PM",
    "stationName": "EAD_AlAinSchool",
    "pM10": 130,
    "o3": 96,
    "sO2": 17,
    "nO2": 10,
    "co": 0,
    "aqi": 87,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "03 PM",
    "stationName": "EAD_AlAinStreet",
    "pM10": 83,
    "o3": 0,
    "sO2": 1,
    "nO2": 34,
    "co": 0,
    "aqi": 56,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "03 PM",
    "stationName": "EAD_AlMafraq",
    "pM10": 198,
    "o3": 0,
    "sO2": 4,
    "nO2": 23,
    "co": 0,
    "aqi": 132,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "03 PM",
    "stationName": "EAD_AlMaqta",
    "pM10": 115,
    "o3": 94,
    "sO2": 11,
    "nO2": 13,
    "co": 0,
    "aqi": 76,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "03 PM",
    "stationName": "EAD_AlQuaa",
    "pM10": 0,
    "o3": 112,
    "sO2": 6,
    "nO2": 5,
    "co": 1,
    "aqi": 56,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "03 PM",
    "stationName": "EAD_AlTawia",
    "pM10": 119,
    "o3": 107,
    "sO2": 8,
    "nO2": 4,
    "co": 0,
    "aqi": 79,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "03 PM",
    "stationName": "EAD_Baniyas",
    "pM10": 15,
    "o3": 94,
    "sO2": 3,
    "nO2": 16,
    "co": 0,
    "aqi": 47,
    "aqiIndex": "Good"
  },
  {
    "hour": "03 PM",
    "stationName": "EAD_BidaZayed",
    "pM10": 5,
    "o3": 103,
    "sO2": 6,
    "nO2": 6,
    "co": 0,
    "aqi": 51,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "03 PM",
    "stationName": "EAD_E11Road",
    "pM10": 0,
    "o3": 0,
    "sO2": 27,
    "nO2": 12,
    "co": 0,
    "aqi": 8,
    "aqiIndex": "Good"
  },
  {
    "hour": "03 PM",
    "stationName": "EAD_Gayathi",
    "pM10": 180,
    "o3": 127,
    "sO2": 26,
    "nO2": 12,
    "co": 0,
    "aqi": 120,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "03 PM",
    "stationName": "EAD_Habshan",
    "pM10": 54,
    "o3": 106,
    "sO2": 9,
    "nO2": 8,
    "co": 0,
    "aqi": 53,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "03 PM",
    "stationName": "EAD_HamdanStreet",
    "pM10": 71,
    "o3": 0,
    "sO2": 1,
    "nO2": 46,
    "co": 0,
    "aqi": 47,
    "aqiIndex": "Good"
  },
  {
    "hour": "03 PM",
    "stationName": "EAD_KhadijaSchool",
    "pM10": 84,
    "o3": 86,
    "sO2": 11,
    "nO2": 23,
    "co": 0,
    "aqi": 56,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "03 PM",
    "stationName": "EAD_KhalifaSchool",
    "pM10": 0,
    "o3": 50,
    "sO2": 3,
    "nO2": 0,
    "co": 0,
    "aqi": 25,
    "aqiIndex": "Good"
  },
  {
    "hour": "03 PM",
    "stationName": "EAD_Liwa",
    "pM10": 121,
    "o3": 0,
    "sO2": 1,
    "nO2": 9,
    "co": 0,
    "aqi": 80,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "03 PM",
    "stationName": "EAD_Mussafah",
    "pM10": 82,
    "o3": 0,
    "sO2": 12,
    "nO2": 14,
    "co": 0,
    "aqi": 54,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "03 PM",
    "stationName": "EAD_RuwaisTransco",
    "pM10": 74,
    "o3": 101,
    "sO2": 10,
    "nO2": 14,
    "co": 0,
    "aqi": 51,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "03 PM",
    "stationName": "EAD_Sweihan",
    "pM10": 0,
    "o3": 120,
    "sO2": 8,
    "nO2": 4,
    "co": 0,
    "aqi": 60,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "03 PM",
    "stationName": "EAD_Zakher",
    "pM10": 146,
    "o3": 0,
    "sO2": 8,
    "nO2": 12,
    "co": 0,
    "aqi": 97,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "03 PM",
    "stationName": "EAD_KhalifaCity",
    "pM10": 92,
    "o3": 105,
    "sO2": 15,
    "nO2": 1,
    "co": 0,
    "aqi": 61,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "04 PM",
    "stationName": "EAD_AlAinSchool",
    "pM10": 129,
    "o3": 97,
    "sO2": 16,
    "nO2": 13,
    "co": 0,
    "aqi": 86,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "04 PM",
    "stationName": "EAD_AlAinStreet",
    "pM10": 83,
    "o3": 0,
    "sO2": 11,
    "nO2": 40,
    "co": 0,
    "aqi": 55,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "04 PM",
    "stationName": "EAD_AlMafraq",
    "pM10": 200,
    "o3": 0,
    "sO2": 4,
    "nO2": 22,
    "co": 0,
    "aqi": 134,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "04 PM",
    "stationName": "EAD_AlMaqta",
    "pM10": 113,
    "o3": 92,
    "sO2": 11,
    "nO2": 10,
    "co": 0,
    "aqi": 75,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "04 PM",
    "stationName": "EAD_AlQuaa",
    "pM10": 10,
    "o3": 118,
    "sO2": 7,
    "nO2": 5,
    "co": 1,
    "aqi": 59,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "04 PM",
    "stationName": "EAD_AlTawia",
    "pM10": 116,
    "o3": 107,
    "sO2": 10,
    "nO2": 2,
    "co": 0,
    "aqi": 78,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "04 PM",
    "stationName": "EAD_Baniyas",
    "pM10": 19,
    "o3": 88,
    "sO2": 4,
    "nO2": 18,
    "co": 0,
    "aqi": 44,
    "aqiIndex": "Good"
  },
  {
    "hour": "04 PM",
    "stationName": "EAD_BidaZayed",
    "pM10": 5,
    "o3": 98,
    "sO2": 4,
    "nO2": 6,
    "co": 0,
    "aqi": 49,
    "aqiIndex": "Good"
  },
  {
    "hour": "04 PM",
    "stationName": "EAD_E11Road",
    "pM10": 0,
    "o3": 0,
    "sO2": 47,
    "nO2": 13,
    "co": 0,
    "aqi": 13,
    "aqiIndex": "Good"
  },
  {
    "hour": "04 PM",
    "stationName": "EAD_Gayathi",
    "pM10": 187,
    "o3": 127,
    "sO2": 22,
    "nO2": 12,
    "co": 0,
    "aqi": 125,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "04 PM",
    "stationName": "EAD_Habshan",
    "pM10": 57,
    "o3": 116,
    "sO2": 11,
    "nO2": 9,
    "co": 0,
    "aqi": 58,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "04 PM",
    "stationName": "EAD_HamdanStreet",
    "pM10": 72,
    "o3": 0,
    "sO2": 6,
    "nO2": 59,
    "co": 0,
    "aqi": 48,
    "aqiIndex": "Good"
  },
  {
    "hour": "04 PM",
    "stationName": "EAD_KhadijaSchool",
    "pM10": 85,
    "o3": 85,
    "sO2": 12,
    "nO2": 23,
    "co": 0,
    "aqi": 57,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "04 PM",
    "stationName": "EAD_KhalifaSchool",
    "pM10": 0,
    "o3": 52,
    "sO2": 3,
    "nO2": 0,
    "co": 0,
    "aqi": 26,
    "aqiIndex": "Good"
  },
  {
    "hour": "04 PM",
    "stationName": "EAD_Liwa",
    "pM10": 113,
    "o3": 0,
    "sO2": 5,
    "nO2": 9,
    "co": 0,
    "aqi": 76,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "04 PM",
    "stationName": "EAD_Mussafah",
    "pM10": 80,
    "o3": 0,
    "sO2": 11,
    "nO2": 16,
    "co": 0,
    "aqi": 53,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "04 PM",
    "stationName": "EAD_RuwaisTransco",
    "pM10": 78,
    "o3": 109,
    "sO2": 8,
    "nO2": 13,
    "co": 0,
    "aqi": 54,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "04 PM",
    "stationName": "EAD_Sweihan",
    "pM10": 0,
    "o3": 124,
    "sO2": 9,
    "nO2": 6,
    "co": 0,
    "aqi": 62,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "04 PM",
    "stationName": "EAD_Zakher",
    "pM10": 146,
    "o3": 0,
    "sO2": 6,
    "nO2": 11,
    "co": 0,
    "aqi": 97,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "04 PM",
    "stationName": "EAD_KhalifaCity",
    "pM10": 90,
    "o3": 102,
    "sO2": 14,
    "nO2": 5,
    "co": 0,
    "aqi": 60,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "05 PM",
    "stationName": "EAD_AlAinSchool",
    "pM10": 128,
    "o3": 95,
    "sO2": 18,
    "nO2": 15,
    "co": 0,
    "aqi": 85,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "05 PM",
    "stationName": "EAD_AlAinStreet",
    "pM10": 82,
    "o3": 0,
    "sO2": 16,
    "nO2": 43,
    "co": 1,
    "aqi": 55,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "05 PM",
    "stationName": "EAD_AlMafraq",
    "pM10": 192,
    "o3": 0,
    "sO2": 4,
    "nO2": 27,
    "co": 0,
    "aqi": 128,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "05 PM",
    "stationName": "EAD_AlMaqta",
    "pM10": 109,
    "o3": 92,
    "sO2": 8,
    "nO2": 13,
    "co": 0,
    "aqi": 72,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "05 PM",
    "stationName": "EAD_AlQuaa",
    "pM10": 10,
    "o3": 125,
    "sO2": 7,
    "nO2": 9,
    "co": 1,
    "aqi": 63,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "05 PM",
    "stationName": "EAD_AlTawia",
    "pM10": 116,
    "o3": 109,
    "sO2": 10,
    "nO2": 4,
    "co": 0,
    "aqi": 77,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "05 PM",
    "stationName": "EAD_Baniyas",
    "pM10": 18,
    "o3": 84,
    "sO2": 3,
    "nO2": 17,
    "co": 0,
    "aqi": 42,
    "aqiIndex": "Good"
  },
  {
    "hour": "05 PM",
    "stationName": "EAD_BidaZayed",
    "pM10": 4,
    "o3": 93,
    "sO2": 5,
    "nO2": 6,
    "co": 0,
    "aqi": 47,
    "aqiIndex": "Good"
  },
  {
    "hour": "05 PM",
    "stationName": "EAD_E11Road",
    "pM10": 0,
    "o3": 0,
    "sO2": 98,
    "nO2": 17,
    "co": 0,
    "aqi": 28,
    "aqiIndex": "Good"
  },
  {
    "hour": "05 PM",
    "stationName": "EAD_Gayathi",
    "pM10": 181,
    "o3": 123,
    "sO2": 20,
    "nO2": 18,
    "co": 0,
    "aqi": 121,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "05 PM",
    "stationName": "EAD_Habshan",
    "pM10": 62,
    "o3": 109,
    "sO2": 15,
    "nO2": 8,
    "co": 0,
    "aqi": 55,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "05 PM",
    "stationName": "EAD_HamdanStreet",
    "pM10": 74,
    "o3": 0,
    "sO2": 13,
    "nO2": 61,
    "co": 0,
    "aqi": 50,
    "aqiIndex": "Good"
  },
  {
    "hour": "05 PM",
    "stationName": "EAD_KhadijaSchool",
    "pM10": 86,
    "o3": 85,
    "sO2": 11,
    "nO2": 25,
    "co": 0,
    "aqi": 57,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "05 PM",
    "stationName": "EAD_KhalifaSchool",
    "pM10": 0,
    "o3": 52,
    "sO2": 3,
    "nO2": 0,
    "co": 0,
    "aqi": 26,
    "aqiIndex": "Good"
  },
  {
    "hour": "05 PM",
    "stationName": "EAD_Liwa",
    "pM10": 109,
    "o3": 97,
    "sO2": 12,
    "nO2": 8,
    "co": 0,
    "aqi": 72,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "05 PM",
    "stationName": "EAD_Mussafah",
    "pM10": 79,
    "o3": 0,
    "sO2": 11,
    "nO2": 22,
    "co": 0,
    "aqi": 53,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "05 PM",
    "stationName": "EAD_RuwaisTransco",
    "pM10": 77,
    "o3": 103,
    "sO2": 10,
    "nO2": 15,
    "co": 0,
    "aqi": 52,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "05 PM",
    "stationName": "EAD_Sweihan",
    "pM10": 0,
    "o3": 118,
    "sO2": 9,
    "nO2": 7,
    "co": 0,
    "aqi": 59,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "05 PM",
    "stationName": "EAD_Zakher",
    "pM10": 146,
    "o3": 0,
    "sO2": 11,
    "nO2": 8,
    "co": 0,
    "aqi": 97,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "05 PM",
    "stationName": "EAD_KhalifaCity",
    "pM10": 89,
    "o3": 103,
    "sO2": 15,
    "nO2": 2,
    "co": 0,
    "aqi": 59,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "06 PM",
    "stationName": "EAD_AlAinSchool",
    "pM10": 127,
    "o3": 96,
    "sO2": 17,
    "nO2": 27,
    "co": 0,
    "aqi": 85,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "06 PM",
    "stationName": "EAD_AlAinStreet",
    "pM10": 82,
    "o3": 0,
    "sO2": 16,
    "nO2": 47,
    "co": 1,
    "aqi": 55,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "06 PM",
    "stationName": "EAD_AlMafraq",
    "pM10": 183,
    "o3": 0,
    "sO2": 3,
    "nO2": 42,
    "co": 0,
    "aqi": 122,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "06 PM",
    "stationName": "EAD_AlMaqta",
    "pM10": 98,
    "o3": 83,
    "sO2": 8,
    "nO2": 23,
    "co": 0,
    "aqi": 65,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "06 PM",
    "stationName": "EAD_AlQuaa",
    "pM10": 9,
    "o3": 132,
    "sO2": 7,
    "nO2": 8,
    "co": 1,
    "aqi": 66,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "06 PM",
    "stationName": "EAD_AlTawia",
    "pM10": 115,
    "o3": 114,
    "sO2": 9,
    "nO2": 4,
    "co": 0,
    "aqi": 77,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "06 PM",
    "stationName": "EAD_Baniyas",
    "pM10": 17,
    "o3": 78,
    "sO2": 3,
    "nO2": 24,
    "co": 0,
    "aqi": 39,
    "aqiIndex": "Good"
  },
  {
    "hour": "06 PM",
    "stationName": "EAD_BidaZayed",
    "pM10": 1,
    "o3": 91,
    "sO2": 8,
    "nO2": 6,
    "co": 0,
    "aqi": 46,
    "aqiIndex": "Good"
  },
  {
    "hour": "06 PM",
    "stationName": "EAD_E11Road",
    "pM10": 0,
    "o3": 0,
    "sO2": 52,
    "nO2": 17,
    "co": 0,
    "aqi": 15,
    "aqiIndex": "Good"
  },
  {
    "hour": "06 PM",
    "stationName": "EAD_Gayathi",
    "pM10": 175,
    "o3": 105,
    "sO2": 21,
    "nO2": 22,
    "co": 0,
    "aqi": 117,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "06 PM",
    "stationName": "EAD_Habshan",
    "pM10": 61,
    "o3": 111,
    "sO2": 16,
    "nO2": 9,
    "co": 0,
    "aqi": 56,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "06 PM",
    "stationName": "EAD_HamdanStreet",
    "pM10": 74,
    "o3": 0,
    "sO2": 12,
    "nO2": 60,
    "co": 1,
    "aqi": 49,
    "aqiIndex": "Good"
  },
  {
    "hour": "06 PM",
    "stationName": "EAD_KhadijaSchool",
    "pM10": 85,
    "o3": 83,
    "sO2": 13,
    "nO2": 24,
    "co": 0,
    "aqi": 57,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "06 PM",
    "stationName": "EAD_KhalifaSchool",
    "pM10": 0,
    "o3": 51,
    "sO2": 5,
    "nO2": 0,
    "co": 0,
    "aqi": 26,
    "aqiIndex": "Good"
  },
  {
    "hour": "06 PM",
    "stationName": "EAD_Liwa",
    "pM10": 106,
    "o3": 101,
    "sO2": 14,
    "nO2": 9,
    "co": 0,
    "aqi": 71,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "06 PM",
    "stationName": "EAD_Mussafah",
    "pM10": 79,
    "o3": 0,
    "sO2": 13,
    "nO2": 31,
    "co": 0,
    "aqi": 53,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "06 PM",
    "stationName": "EAD_RuwaisTransco",
    "pM10": 76,
    "o3": 87,
    "sO2": 10,
    "nO2": 13,
    "co": 0,
    "aqi": 51,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "06 PM",
    "stationName": "EAD_Sweihan",
    "pM10": 0,
    "o3": 108,
    "sO2": 13,
    "nO2": 12,
    "co": 0,
    "aqi": 54,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "06 PM",
    "stationName": "EAD_Zakher",
    "pM10": 146,
    "o3": 0,
    "sO2": 11,
    "nO2": 11,
    "co": 0,
    "aqi": 98,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "06 PM",
    "stationName": "EAD_KhalifaCity",
    "pM10": 88,
    "o3": 103,
    "sO2": 15,
    "nO2": 5,
    "co": 0,
    "aqi": 59,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "07 PM",
    "stationName": "EAD_AlAinSchool",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0,
    "aqiIndex": "Good"
  },
  {
    "hour": "07 PM",
    "stationName": "EAD_AlAinStreet",
    "pM10": 82,
    "o3": 0,
    "sO2": 15,
    "nO2": 46,
    "co": 0,
    "aqi": 54,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "07 PM",
    "stationName": "EAD_AlMafraq",
    "pM10": 177,
    "o3": 0,
    "sO2": 5,
    "nO2": 61,
    "co": 0,
    "aqi": 118,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "07 PM",
    "stationName": "EAD_AlMaqta",
    "pM10": 90,
    "o3": 70,
    "sO2": 8,
    "nO2": 36,
    "co": 0,
    "aqi": 60,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "07 PM",
    "stationName": "EAD_AlQuaa",
    "pM10": 9,
    "o3": 130,
    "sO2": 6,
    "nO2": 8,
    "co": 0,
    "aqi": 65,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "07 PM",
    "stationName": "EAD_AlTawia",
    "pM10": 115,
    "o3": 114,
    "sO2": 8,
    "nO2": 4,
    "co": 0,
    "aqi": 76,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "07 PM",
    "stationName": "EAD_Baniyas",
    "pM10": 16,
    "o3": 66,
    "sO2": 4,
    "nO2": 36,
    "co": 0,
    "aqi": 33,
    "aqiIndex": "Good"
  },
  {
    "hour": "07 PM",
    "stationName": "EAD_BidaZayed",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0,
    "aqiIndex": "Good"
  },
  {
    "hour": "07 PM",
    "stationName": "EAD_E11Road",
    "pM10": 0,
    "o3": 0,
    "sO2": 9,
    "nO2": 20,
    "co": 0,
    "aqi": 5,
    "aqiIndex": "Good"
  },
  {
    "hour": "07 PM",
    "stationName": "EAD_Gayathi",
    "pM10": 175,
    "o3": 80,
    "sO2": 10,
    "nO2": 27,
    "co": 0,
    "aqi": 116,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "07 PM",
    "stationName": "EAD_Habshan",
    "pM10": 60,
    "o3": 136,
    "sO2": 14,
    "nO2": 9,
    "co": 0,
    "aqi": 68,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "07 PM",
    "stationName": "EAD_HamdanStreet",
    "pM10": 73,
    "o3": 0,
    "sO2": 7,
    "nO2": 77,
    "co": 1,
    "aqi": 49,
    "aqiIndex": "Good"
  },
  {
    "hour": "07 PM",
    "stationName": "EAD_KhadijaSchool",
    "pM10": 84,
    "o3": 80,
    "sO2": 12,
    "nO2": 27,
    "co": 0,
    "aqi": 56,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "07 PM",
    "stationName": "EAD_KhalifaSchool",
    "pM10": 0,
    "o3": 49,
    "sO2": 6,
    "nO2": 0,
    "co": 0,
    "aqi": 24,
    "aqiIndex": "Good"
  },
  {
    "hour": "07 PM",
    "stationName": "EAD_Liwa",
    "pM10": 103,
    "o3": 97,
    "sO2": 15,
    "nO2": 8,
    "co": 0,
    "aqi": 69,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "07 PM",
    "stationName": "EAD_Mussafah",
    "pM10": 79,
    "o3": 0,
    "sO2": 15,
    "nO2": 35,
    "co": 0,
    "aqi": 52,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "07 PM",
    "stationName": "EAD_RuwaisTransco",
    "pM10": 76,
    "o3": 87,
    "sO2": 8,
    "nO2": 16,
    "co": 0,
    "aqi": 50,
    "aqiIndex": "Good"
  },
  {
    "hour": "07 PM",
    "stationName": "EAD_Sweihan",
    "pM10": 5,
    "o3": 100,
    "sO2": 15,
    "nO2": 13,
    "co": 0,
    "aqi": 50,
    "aqiIndex": "Good"
  },
  {
    "hour": "07 PM",
    "stationName": "EAD_Zakher",
    "pM10": 148,
    "o3": 0,
    "sO2": 10,
    "nO2": 12,
    "co": 0,
    "aqi": 99,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "07 PM",
    "stationName": "EAD_KhalifaCity",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0,
    "aqiIndex": "Good"
  },
  {
    "hour": "08 PM",
    "stationName": "EAD_AlAinSchool",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0,
    "aqiIndex": "Good"
  },
  {
    "hour": "08 PM",
    "stationName": "EAD_AlAinStreet",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0,
    "aqiIndex": "Good"
  },
  {
    "hour": "08 PM",
    "stationName": "EAD_AlMafraq",
    "pM10": 166,
    "o3": 0,
    "sO2": 6,
    "nO2": 65,
    "co": 0,
    "aqi": 110,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "08 PM",
    "stationName": "EAD_AlMaqta",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0,
    "aqiIndex": "Good"
  },
  {
    "hour": "08 PM",
    "stationName": "EAD_AlQuaa",
    "pM10": 6,
    "o3": 110,
    "sO2": 6,
    "nO2": 8,
    "co": 0,
    "aqi": 55,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "08 PM",
    "stationName": "EAD_AlTawia",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0,
    "aqiIndex": "Good"
  },
  {
    "hour": "08 PM",
    "stationName": "EAD_Baniyas",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0,
    "aqiIndex": "Good"
  },
  {
    "hour": "08 PM",
    "stationName": "EAD_BidaZayed",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0,
    "aqiIndex": "Good"
  },
  {
    "hour": "08 PM",
    "stationName": "EAD_E11Road",
    "pM10": 0,
    "o3": 0,
    "sO2": 8,
    "nO2": 21,
    "co": 0,
    "aqi": 5,
    "aqiIndex": "Good"
  },
  {
    "hour": "08 PM",
    "stationName": "EAD_Gayathi",
    "pM10": 175,
    "o3": 61,
    "sO2": 8,
    "nO2": 39,
    "co": 0,
    "aqi": 117,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "08 PM",
    "stationName": "EAD_Habshan",
    "pM10": 60,
    "o3": 149,
    "sO2": 15,
    "nO2": 14,
    "co": 0,
    "aqi": 74,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "08 PM",
    "stationName": "EAD_HamdanStreet",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0,
    "aqiIndex": "Good"
  },
  {
    "hour": "08 PM",
    "stationName": "EAD_KhadijaSchool",
    "pM10": 84,
    "o3": 85,
    "sO2": 15,
    "nO2": 26,
    "co": 0,
    "aqi": 56,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "08 PM",
    "stationName": "EAD_KhalifaSchool",
    "pM10": 0,
    "o3": 51,
    "sO2": 8,
    "nO2": 0,
    "co": 0,
    "aqi": 25,
    "aqiIndex": "Good"
  },
  {
    "hour": "08 PM",
    "stationName": "EAD_Liwa",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0,
    "aqiIndex": "Good"
  },
  {
    "hour": "08 PM",
    "stationName": "EAD_Mussafah",
    "pM10": 79,
    "o3": 0,
    "sO2": 16,
    "nO2": 39,
    "co": 0,
    "aqi": 53,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "08 PM",
    "stationName": "EAD_RuwaisTransco",
    "pM10": 75,
    "o3": 105,
    "sO2": 8,
    "nO2": 7,
    "co": 0,
    "aqi": 52,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "08 PM",
    "stationName": "EAD_Sweihan",
    "pM10": 5,
    "o3": 85,
    "sO2": 13,
    "nO2": 17,
    "co": 0,
    "aqi": 42,
    "aqiIndex": "Good"
  },
  {
    "hour": "08 PM",
    "stationName": "EAD_Zakher",
    "pM10": 148,
    "o3": 0,
    "sO2": 12,
    "nO2": 12,
    "co": 0,
    "aqi": 99,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "08 PM",
    "stationName": "EAD_KhalifaCity",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0,
    "aqiIndex": "Good"
  },
  {
    "hour": "09 PM",
    "stationName": "EAD_AlAinSchool",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0,
    "aqiIndex": "Good"
  },
  {
    "hour": "09 PM",
    "stationName": "EAD_AlAinStreet",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0,
    "aqiIndex": "Good"
  },
  {
    "hour": "09 PM",
    "stationName": "EAD_AlMafraq",
    "pM10": 152,
    "o3": 0,
    "sO2": 7,
    "nO2": 88,
    "co": 0,
    "aqi": 102,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "09 PM",
    "stationName": "EAD_AlMaqta",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0,
    "aqiIndex": "Good"
  },
  {
    "hour": "09 PM",
    "stationName": "EAD_AlQuaa",
    "pM10": 6,
    "o3": 106,
    "sO2": 7,
    "nO2": 7,
    "co": 0,
    "aqi": 53,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "09 PM",
    "stationName": "EAD_AlTawia",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0,
    "aqiIndex": "Good"
  },
  {
    "hour": "09 PM",
    "stationName": "EAD_Baniyas",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0,
    "aqiIndex": "Good"
  },
  {
    "hour": "09 PM",
    "stationName": "EAD_BidaZayed",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0,
    "aqiIndex": "Good"
  },
  {
    "hour": "09 PM",
    "stationName": "EAD_E11Road",
    "pM10": 0,
    "o3": 0,
    "sO2": 9,
    "nO2": 27,
    "co": 0,
    "aqi": 7,
    "aqiIndex": "Good"
  },
  {
    "hour": "09 PM",
    "stationName": "EAD_Gayathi",
    "pM10": 187,
    "o3": 61,
    "sO2": 9,
    "nO2": 32,
    "co": 0,
    "aqi": 125,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "09 PM",
    "stationName": "EAD_Habshan",
    "pM10": 61,
    "o3": 127,
    "sO2": 15,
    "nO2": 14,
    "co": 0,
    "aqi": 63,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "09 PM",
    "stationName": "EAD_HamdanStreet",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0,
    "aqiIndex": "Good"
  },
  {
    "hour": "09 PM",
    "stationName": "EAD_KhadijaSchool",
    "pM10": 84,
    "o3": 85,
    "sO2": 16,
    "nO2": 26,
    "co": 0,
    "aqi": 56,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "09 PM",
    "stationName": "EAD_KhalifaSchool",
    "pM10": 0,
    "o3": 50,
    "sO2": 8,
    "nO2": 0,
    "co": 0,
    "aqi": 25,
    "aqiIndex": "Good"
  },
  {
    "hour": "09 PM",
    "stationName": "EAD_Liwa",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0,
    "aqiIndex": "Good"
  },
  {
    "hour": "09 PM",
    "stationName": "EAD_Mussafah",
    "pM10": 79,
    "o3": 0,
    "sO2": 15,
    "nO2": 42,
    "co": 0,
    "aqi": 53,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "09 PM",
    "stationName": "EAD_RuwaisTransco",
    "pM10": 78,
    "o3": 95,
    "sO2": 9,
    "nO2": 8,
    "co": 0,
    "aqi": 52,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "09 PM",
    "stationName": "EAD_Sweihan",
    "pM10": 5,
    "o3": 71,
    "sO2": 11,
    "nO2": 21,
    "co": 0,
    "aqi": 35,
    "aqiIndex": "Good"
  },
  {
    "hour": "09 PM",
    "stationName": "EAD_Zakher",
    "pM10": 151,
    "o3": 0,
    "sO2": 12,
    "nO2": 14,
    "co": 0,
    "aqi": 100,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "09 PM",
    "stationName": "EAD_KhalifaCity",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0,
    "aqiIndex": "Good"
  },
  {
    "hour": "10 PM",
    "stationName": "EAD_AlAinSchool",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0,
    "aqiIndex": "Good"
  },
  {
    "hour": "10 PM",
    "stationName": "EAD_AlAinStreet",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0,
    "aqiIndex": "Good"
  },
  {
    "hour": "10 PM",
    "stationName": "EAD_AlMafraq",
    "pM10": 145,
    "o3": 0,
    "sO2": 7,
    "nO2": 98,
    "co": 0,
    "aqi": 97,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "10 PM",
    "stationName": "EAD_AlMaqta",
    "pM10": 71,
    "o3": 63,
    "sO2": 8,
    "nO2": 41,
    "co": 0,
    "aqi": 47,
    "aqiIndex": "Good"
  },
  {
    "hour": "10 PM",
    "stationName": "EAD_AlQuaa",
    "pM10": 6,
    "o3": 102,
    "sO2": 6,
    "nO2": 7,
    "co": 0,
    "aqi": 51,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "10 PM",
    "stationName": "EAD_AlTawia",
    "pM10": 119,
    "o3": 93,
    "sO2": 12,
    "nO2": 5,
    "co": 0,
    "aqi": 79,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "10 PM",
    "stationName": "EAD_Baniyas",
    "pM10": 11,
    "o3": 19,
    "sO2": 7,
    "nO2": 85,
    "co": 0,
    "aqi": 21,
    "aqiIndex": "Good"
  },
  {
    "hour": "10 PM",
    "stationName": "EAD_BidaZayed",
    "pM10": 7,
    "o3": 78,
    "sO2": 15,
    "nO2": 6,
    "co": 0,
    "aqi": 39,
    "aqiIndex": "Good"
  },
  {
    "hour": "10 PM",
    "stationName": "EAD_E11Road",
    "pM10": 0,
    "o3": 0,
    "sO2": 11,
    "nO2": 49,
    "co": 0,
    "aqi": 12,
    "aqiIndex": "Good"
  },
  {
    "hour": "10 PM",
    "stationName": "EAD_Gayathi",
    "pM10": 188,
    "o3": 48,
    "sO2": 10,
    "nO2": 43,
    "co": 0,
    "aqi": 125,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "10 PM",
    "stationName": "EAD_Habshan",
    "pM10": 61,
    "o3": 94,
    "sO2": 13,
    "nO2": 17,
    "co": 0,
    "aqi": 47,
    "aqiIndex": "Good"
  },
  {
    "hour": "10 PM",
    "stationName": "EAD_HamdanStreet",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0,
    "aqiIndex": "Good"
  },
  {
    "hour": "10 PM",
    "stationName": "EAD_KhadijaSchool",
    "pM10": 84,
    "o3": 90,
    "sO2": 17,
    "nO2": 21,
    "co": 0,
    "aqi": 56,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "10 PM",
    "stationName": "EAD_KhalifaSchool",
    "pM10": 0,
    "o3": 48,
    "sO2": 9,
    "nO2": 0,
    "co": 0,
    "aqi": 24,
    "aqiIndex": "Good"
  },
  {
    "hour": "10 PM",
    "stationName": "EAD_Liwa",
    "pM10": 112,
    "o3": 80,
    "sO2": 13,
    "nO2": 9,
    "co": 0,
    "aqi": 75,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "10 PM",
    "stationName": "EAD_Mussafah",
    "pM10": 80,
    "o3": 0,
    "sO2": 15,
    "nO2": 41,
    "co": 0,
    "aqi": 53,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "10 PM",
    "stationName": "EAD_RuwaisTransco",
    "pM10": 79,
    "o3": 86,
    "sO2": 12,
    "nO2": 8,
    "co": 0,
    "aqi": 53,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "10 PM",
    "stationName": "EAD_Sweihan",
    "pM10": 6,
    "o3": 35,
    "sO2": 9,
    "nO2": 26,
    "co": 0,
    "aqi": 18,
    "aqiIndex": "Good"
  },
  {
    "hour": "10 PM",
    "stationName": "EAD_Zakher",
    "pM10": 152,
    "o3": 0,
    "sO2": 9,
    "nO2": 15,
    "co": 0,
    "aqi": 101,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "10 PM",
    "stationName": "EAD_KhalifaCity",
    "pM10": 88,
    "o3": 71,
    "sO2": 6,
    "nO2": 30,
    "co": 0,
    "aqi": 59,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "11 PM",
    "stationName": "EAD_AlAinSchool",
    "pM10": 125,
    "o3": 66,
    "sO2": 12,
    "nO2": 30,
    "co": 0,
    "aqi": 84,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "11 PM",
    "stationName": "EAD_AlAinStreet",
    "pM10": 82,
    "o3": 0,
    "sO2": 16,
    "nO2": 41,
    "co": 0,
    "aqi": 54,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "11 PM",
    "stationName": "EAD_AlMafraq",
    "pM10": 139,
    "o3": 0,
    "sO2": 7,
    "nO2": 78,
    "co": 0,
    "aqi": 93,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "11 PM",
    "stationName": "EAD_AlMaqta",
    "pM10": 70,
    "o3": 22,
    "sO2": 8,
    "nO2": 81,
    "co": 0,
    "aqi": 47,
    "aqiIndex": "Good"
  },
  {
    "hour": "11 PM",
    "stationName": "EAD_AlQuaa",
    "pM10": 6,
    "o3": 100,
    "sO2": 6,
    "nO2": 6,
    "co": 0,
    "aqi": 50,
    "aqiIndex": "Good"
  },
  {
    "hour": "11 PM",
    "stationName": "EAD_AlTawia",
    "pM10": 120,
    "o3": 85,
    "sO2": 11,
    "nO2": 6,
    "co": 0,
    "aqi": 80,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "11 PM",
    "stationName": "EAD_Baniyas",
    "pM10": 8,
    "o3": 20,
    "sO2": 7,
    "nO2": 66,
    "co": 0,
    "aqi": 16,
    "aqiIndex": "Good"
  },
  {
    "hour": "11 PM",
    "stationName": "EAD_BidaZayed",
    "pM10": 8,
    "o3": 69,
    "sO2": 11,
    "nO2": 6,
    "co": 0,
    "aqi": 35,
    "aqiIndex": "Good"
  },
  {
    "hour": "11 PM",
    "stationName": "EAD_E11Road",
    "pM10": 0,
    "o3": 0,
    "sO2": 16,
    "nO2": 56,
    "co": 0,
    "aqi": 14,
    "aqiIndex": "Good"
  },
  {
    "hour": "11 PM",
    "stationName": "EAD_Gayathi",
    "pM10": 202,
    "o3": 51,
    "sO2": 10,
    "nO2": 37,
    "co": 0,
    "aqi": 135,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "11 PM",
    "stationName": "EAD_Habshan",
    "pM10": 60,
    "o3": 88,
    "sO2": 15,
    "nO2": 19,
    "co": 0,
    "aqi": 44,
    "aqiIndex": "Good"
  },
  {
    "hour": "11 PM",
    "stationName": "EAD_HamdanStreet",
    "pM10": 72,
    "o3": 0,
    "sO2": 10,
    "nO2": 68,
    "co": 1,
    "aqi": 48,
    "aqiIndex": "Good"
  },
  {
    "hour": "11 PM",
    "stationName": "EAD_KhadijaSchool",
    "pM10": 83,
    "o3": 91,
    "sO2": 17,
    "nO2": 13,
    "co": 0,
    "aqi": 55,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "11 PM",
    "stationName": "EAD_KhalifaSchool",
    "pM10": 83,
    "o3": 41,
    "sO2": 9,
    "nO2": 35,
    "co": 0,
    "aqi": 56,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "11 PM",
    "stationName": "EAD_Liwa",
    "pM10": 115,
    "o3": 79,
    "sO2": 13,
    "nO2": 10,
    "co": 0,
    "aqi": 77,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "11 PM",
    "stationName": "EAD_Mussafah",
    "pM10": 79,
    "o3": 0,
    "sO2": 15,
    "nO2": 40,
    "co": 0,
    "aqi": 53,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "11 PM",
    "stationName": "EAD_RuwaisTransco",
    "pM10": 81,
    "o3": 79,
    "sO2": 10,
    "nO2": 12,
    "co": 0,
    "aqi": 54,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "11 PM",
    "stationName": "EAD_Sweihan",
    "pM10": 6,
    "o3": 41,
    "sO2": 9,
    "nO2": 24,
    "co": 0,
    "aqi": 20,
    "aqiIndex": "Good"
  },
  {
    "hour": "11 PM",
    "stationName": "EAD_Zakher",
    "pM10": 153,
    "o3": 0,
    "sO2": 7,
    "nO2": 18,
    "co": 0,
    "aqi": 102,
    "aqiIndex": "UnHealthly Sensitive Groups"
  },
  {
    "hour": "11 PM",
    "stationName": "EAD_KhalifaCity",
    "pM10": 88,
    "o3": 62,
    "sO2": 7,
    "nO2": 32,
    "co": 0,
    "aqi": 59,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "12 AM",
    "stationName": "Abu Dhabi",
    "pM10": 83,
    "o3": 39,
    "sO2": 20,
    "nO2": 24,
    "co": 0,
    "aqi": 61,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "01 AM",
    "stationName": "Abu Dhabi",
    "pM10": 82,
    "o3": 41,
    "sO2": 16,
    "nO2": 18,
    "co": 0,
    "aqi": 90,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "02 AM",
    "stationName": "Abu Dhabi",
    "pM10": 82,
    "o3": 44,
    "sO2": 16,
    "nO2": 15,
    "co": 0,
    "aqi": 61,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "03 AM",
    "stationName": "Abu Dhabi",
    "pM10": 82,
    "o3": 44,
    "sO2": 18,
    "nO2": 14,
    "co": 0,
    "aqi": 61,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "04 AM",
    "stationName": "Abu Dhabi",
    "pM10": 82,
    "o3": 44,
    "sO2": 14,
    "nO2": 12,
    "co": 0,
    "aqi": 81,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "05 AM",
    "stationName": "Abu Dhabi",
    "pM10": 84,
    "o3": 42,
    "sO2": 13,
    "nO2": 14,
    "co": 0,
    "aqi": 62,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "06 AM",
    "stationName": "Abu Dhabi",
    "pM10": 84,
    "o3": 38,
    "sO2": 12,
    "nO2": 20,
    "co": 0,
    "aqi": 62,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "07 AM",
    "stationName": "Abu Dhabi",
    "pM10": 84,
    "o3": 33,
    "sO2": 12,
    "nO2": 32,
    "co": 0,
    "aqi": 61,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "08 AM",
    "stationName": "Abu Dhabi",
    "pM10": 83,
    "o3": 34,
    "sO2": 11,
    "nO2": 35,
    "co": 0,
    "aqi": 77,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "09 AM",
    "stationName": "Abu Dhabi",
    "pM10": 83,
    "o3": 46,
    "sO2": 11,
    "nO2": 22,
    "co": 0,
    "aqi": 63,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "10 AM",
    "stationName": "Abu Dhabi",
    "pM10": 84,
    "o3": 56,
    "sO2": 13,
    "nO2": 15,
    "co": 0,
    "aqi": 66,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "11 AM",
    "stationName": "Abu Dhabi",
    "pM10": 84,
    "o3": 61,
    "sO2": 13,
    "nO2": 13,
    "co": 0,
    "aqi": 67,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "12 PM",
    "stationName": "Abu Dhabi",
    "pM10": 75,
    "o3": 58,
    "sO2": 11,
    "nO2": 11,
    "co": 0,
    "aqi": 62,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "01 PM",
    "stationName": "Abu Dhabi",
    "pM10": 68,
    "o3": 68,
    "sO2": 11,
    "nO2": 12,
    "co": 0,
    "aqi": 62,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "02 PM",
    "stationName": "Abu Dhabi",
    "pM10": 81,
    "o3": 65,
    "sO2": 9,
    "nO2": 12,
    "co": 0,
    "aqi": 64,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "03 PM",
    "stationName": "Abu Dhabi",
    "pM10": 78,
    "o3": 65,
    "sO2": 9,
    "nO2": 13,
    "co": 0,
    "aqi": 65,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "04 PM",
    "stationName": "Abu Dhabi",
    "pM10": 79,
    "o3": 66,
    "sO2": 11,
    "nO2": 15,
    "co": 0,
    "aqi": 60,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "05 PM",
    "stationName": "Abu Dhabi",
    "pM10": 78,
    "o3": 69,
    "sO2": 15,
    "nO2": 16,
    "co": 0,
    "aqi": 65,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "06 PM",
    "stationName": "Abu Dhabi",
    "pM10": 76,
    "o3": 67,
    "sO2": 13,
    "nO2": 20,
    "co": 0,
    "aqi": 80,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "07 PM",
    "stationName": "Abu Dhabi",
    "pM10": 65,
    "o3": 50,
    "sO2": 8,
    "nO2": 22,
    "co": 0,
    "aqi": 52,
    "aqiIndex": "Moderate"
  },
  {
    "hour": "08 PM",
    "stationName": "Abu Dhabi",
    "pM10": 40,
    "o3": 32,
    "sO2": 6,
    "nO2": 12,
    "co": 0,
    "aqi": 34,
    "aqiIndex": "Good"
  },
  {
    "hour": "09 PM",
    "stationName": "Abu Dhabi",
    "pM10": 40,
    "o3": 30,
    "sO2": 6,
    "nO2": 14,
    "co": 0,
    "aqi": 34,
    "aqiIndex": "Good"
  },
  {
    "hour": "10 PM",
    "stationName": "Abu Dhabi",
    "pM10": 60,
    "o3": 45,
    "sO2": 9,
    "nO2": 25,
    "co": 0,
    "aqi": 20,
    "aqiIndex": "Good"
  },
  {
    "hour": "11 PM",
    "stationName": "Abu Dhabi",
    "pM10": 79,
    "o3": 45,
    "sO2": 11,
    "nO2": 34,
    "co": 0,
    "aqi": 59,
    "aqiIndex": "Moderate"
  }
]

// Abu DHabi Station AQI and Pllutants Trends -BAR GRAPH
var hourlyDataSeries = [];
var categoriesData = [];
var lineGraphData =[];
var customLegendData = [];
hourlyChartData.filter(t => t.stationName == 'Abu Dhabi').forEach(item => {
  if (hourlyDataSeries.length) {
    hourlyDataSeries[0].data.push(item.aqi);
  } else {
    hourlyDataSeries.push({ name: item.aqiIndex, data: [item.aqi] });
  }
  if (!customLegendData.includes(item.aqiIndex)) {
    customLegendData.push(item.aqiIndex);
  }
  var parts = item.hour.split(' ');
  categoriesData.push(parts);
  lineGraphData.push(item.aqi);
});

var options = {
  series:hourlyDataSeries,
  chart: {
  type: 'bar',
  height: 300,
  animations: {
    enabled: true,
    easing: 'linear',
  },
  toolbar: {
    show: false,
    // offsetX: 0,
    // offsetY: 0,
    tools: {
      download: false,
    }
  },
},

plotOptions: {
  bar: {
    horizontal: false,
    columnWidth: '60%',
    endingShape: 'rounded',
    // borderRadius: 4,
  },
},
dataLabels: {
  enabled: false
},
stroke: {
  show: true,
  width: 0,
  colors: ['transparent']
},
xaxis: {
  categories: categoriesData,
  radius: 12,
  labels: {
    rotateAlways: false,
   
  }
},
fill: {
  opacity: 0.8
},
legend: {
  show: false,
},
colors: [
  function({ value, seriesIndex, w }) {
   
    if (value > 70) {
      return '#9CD84E'
    } else if(value>60){
      return '#FFDE59'
    }
    else if(value>50){
     return '#F99049'
    } else if(value>40){
             return '#F65E5F';
    }else if(value>30){
      return '#A070B6'
    } else{
      return '#A06A7B'
    }
  }
],
tooltip: {
  enabled: true,
   x: {
      show: false,
  },
  y: {
    formatter: function(val) {
      return val;
    },
    title: {
      formatter: function (seriesName) {
        return ''
      }
    }
  }
}
};

// var chart = new ApexCharts(document.querySelector("#ADstationAqiBarGraph"), options);
// chart.render();


// Abu DHabi Station AQI and Pllutants Trends -LINE GRAPH

var lineGraphHourlySeriesData = [{ name: 'AQI', data: lineGraphData }];

var lineGraphoptions = {
  series: lineGraphHourlySeriesData,
  chart: {
    height: 385,
  type: 'line',
  zoom: {
    enabled: false
  },
  toolbar: {
    show: false,
    // offsetX: 0,
    // offsetY: 0,
    tools: {
      download: false,
    }
  }
},

dataLabels: {
  enabled: false
},
stroke: {
  curve: 'straight'
},
title: {
  text: '',
  align: 'left',
},
grid: {
  row: {
    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
    opacity: 0.5
  },
},
xaxis: {
  categories: categoriesData,
  radius: 12,
  labels: {
      rotateAlways: true,
  }
},
tooltip: {
  enabled: true,
   x: {
      show: false,
  },
  y: {
    formatter: function(val) {
      return val;
    },
    title: {
      formatter: function (seriesName) {
        return ''
      }
    }
  }
}

};

var chart = new ApexCharts(document.querySelector("#ADstationqiLineGraph"), lineGraphoptions);
chart.render();


//   Air Analytics Graph
var options = {
  series: [{
//     name: 'Series 1',
//     data: [80, 50, 30, 40, 100, 20, 80, 50, 30, 40, 100, 20],
//   }, {
//     name: 'Series 2',
//     data: [20, 30, 40, 80, 20, 80],
//   }, {
  name: 'Series 3',
  data: [40, 20, 40, 25, 50, 70, 30, 80, 60, 40, 90, 30],
}],
  chart: {
  height: 305,
  type: 'radar',
  toolbar: {
    show: false,
    // offsetX: 0,
    // offsetY: 0,
    tools: {
      download: false,
    }
  },
  dropShadow: {
    enabled: true,
    blur: 1,
    left: 1,
    top: 1
  }
},
title: {
  text: '2023 Year Report'
},
stroke: {
  width: 2
},
fill: {
  "type": "gradient",
  "opacity": 0.1,
  "gradient": {
      "type": "gradient",
       "borderRadius":5,
      "colorStops": [
          {
              "opacity": 0.5,
              "offset": 0.1,
              "color": "#9CD84E"
          },
          {
              "opacity": 0.6,
              "offset": 100,
              "color": "#FACF39"
          },
          {
              "opacity": 0.37,
              "offset": 0.17,
              "color": "#F99049"
          },
          {
              "opacity": 0.74,
              "offset": 0.58,
              "color": "#F65E5F"
          },
          {
              "opacity": 0.79,
              "offset": 0.78,
              "color": "#A070B6"
          },
          {
              "opacity": 1,
              "offset": 1,
              "color": "#A06A7B"
          }
      ]
  },
},
markers: {
  size: 0
},
xaxis: {
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
},
title: {
  show:false
}
};

var chart = new ApexCharts(document.querySelector("#AiAnalytics"), options);
chart.render();


//new chart added --- 16-JAN-2024-------------------------------------------STATION AQI AND POLLUTANTS TRENDS Graph
var yearlyDataForStationAqiAndPollutants = [
  {
    "year": 1900,
    "stationName": "EAD_AlAinSchool",
    "pM10": 22,
    "o3": 0,
    "sO2": 7,
    "nO2": 7,
    "co": 0,
    "aqi": 22
  },
  {
    "year": 1900,
    "stationName": "EAD_AlAinStreet",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 7,
    "co": 2,
    "aqi": 7
  },
  {
    "year": 1900,
    "stationName": "Abu Dhabi",
    "pM10": 11,
    "o3": 0,
    "sO2": 4,
    "nO2": 7,
    "co": 1,
    "aqi": 15
  },
  {
    "year": 2016,
    "stationName": "Abu Dhabi",
    "pM10": 55,
    "o3": 26,
    "sO2": 5,
    "nO2": 13,
    "co": 2,
    "aqi": 63
  },
  {
    "year": 2016,
    "stationName": "EAD_HamdanStreet",
    "pM10": 47,
    "o3": 0,
    "sO2": 7,
    "nO2": 23,
    "co": 6,
    "aqi": 49
  },
  {
    "year": 2016,
    "stationName": "EAD_Gayathi",
    "pM10": 118,
    "o3": 45,
    "sO2": 6,
    "nO2": 7,
    "co": 0,
    "aqi": 120
  },
  {
    "year": 2016,
    "stationName": "EAD_AlAinSchool",
    "pM10": 64,
    "o3": 18,
    "sO2": 4,
    "nO2": 19,
    "co": 0,
    "aqi": 65
  },
  {
    "year": 2016,
    "stationName": "EAD_AlMafraq",
    "pM10": 110,
    "o3": 0,
    "sO2": 4,
    "nO2": 20,
    "co": 0,
    "aqi": 110
  },
  {
    "year": 2016,
    "stationName": "EAD_Liwa",
    "pM10": 58,
    "o3": 40,
    "sO2": 10,
    "nO2": 2,
    "co": 0,
    "aqi": 59
  },
  {
    "year": 2016,
    "stationName": "ADWEA_Mirfa",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0
  },
  {
    "year": 2016,
    "stationName": "ADWEA_Shuweihat",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0
  },
  {
    "year": 2016,
    "stationName": "EAD_Mussafah",
    "pM10": 61,
    "o3": 0,
    "sO2": 5,
    "nO2": 27,
    "co": 0,
    "aqi": 62
  },
  {
    "year": 2016,
    "stationName": "EAD_KhalifaCity",
    "pM10": 78,
    "o3": 25,
    "sO2": 1,
    "nO2": 18,
    "co": 0,
    "aqi": 80
  },
  {
    "year": 2016,
    "stationName": "EAD_RuwaisTransco",
    "pM10": 57,
    "o3": 35,
    "sO2": 6,
    "nO2": 15,
    "co": 5,
    "aqi": 60
  },
  {
    "year": 2016,
    "stationName": "ADWEA_Samha",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0
  },
  {
    "year": 2016,
    "stationName": "EAD_AlMaqta",
    "pM10": 74,
    "o3": 29,
    "sO2": 4,
    "nO2": 21,
    "co": 13,
    "aqi": 75
  },
  {
    "year": 2016,
    "stationName": "EAD_AlTawia",
    "pM10": 82,
    "o3": 128,
    "sO2": 7,
    "nO2": 19,
    "co": 0,
    "aqi": 133
  },
  {
    "year": 2016,
    "stationName": "EAD_KhalifaSchool",
    "pM10": 69,
    "o3": 29,
    "sO2": 3,
    "nO2": 10,
    "co": 0,
    "aqi": 72
  },
  {
    "year": 2016,
    "stationName": "EAD_Sweihan",
    "pM10": 58,
    "o3": 38,
    "sO2": 7,
    "nO2": 11,
    "co": 4,
    "aqi": 70
  },
  {
    "year": 2016,
    "stationName": "EAD_BidaZayed",
    "pM10": 17,
    "o3": 71,
    "sO2": 15,
    "nO2": 8,
    "co": 0,
    "aqi": 77
  },
  {
    "year": 2016,
    "stationName": "EAD_AlAinStreet",
    "pM10": 50,
    "o3": 0,
    "sO2": 2,
    "nO2": 22,
    "co": 8,
    "aqi": 50
  },
  {
    "year": 2016,
    "stationName": "EAD_AlQuaa",
    "pM10": 47,
    "o3": 35,
    "sO2": 4,
    "nO2": 5,
    "co": 2,
    "aqi": 59
  },
  {
    "year": 2016,
    "stationName": "EAD_Baniyas",
    "pM10": 93,
    "o3": 25,
    "sO2": 4,
    "nO2": 15,
    "co": 0,
    "aqi": 100
  },
  {
    "year": 2016,
    "stationName": "EAD_E11Road",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0
  },
  {
    "year": 2016,
    "stationName": "EAD_KhadijaSchool",
    "pM10": 69,
    "o3": 28,
    "sO2": 7,
    "nO2": 16,
    "co": 0,
    "aqi": 70
  },
  {
    "year": 2016,
    "stationName": "EAD_Habshan",
    "pM10": 34,
    "o3": 54,
    "sO2": 11,
    "nO2": 10,
    "co": 0,
    "aqi": 59
  },
  {
    "year": 2016,
    "stationName": "EAD_Zakher",
    "pM10": 86,
    "o3": 0,
    "sO2": 7,
    "nO2": 23,
    "co": 0,
    "aqi": 88
  },
  {
    "year": 2017,
    "stationName": "EAD_Baniyas",
    "pM10": 80,
    "o3": 37,
    "sO2": 5,
    "nO2": 16,
    "co": 0,
    "aqi": 84
  },
  {
    "year": 2017,
    "stationName": "EAD_Gayathi",
    "pM10": 67,
    "o3": 49,
    "sO2": 7,
    "nO2": 7,
    "co": 0,
    "aqi": 77
  },
  {
    "year": 2017,
    "stationName": "EAD_KhadijaSchool",
    "pM10": 69,
    "o3": 57,
    "sO2": 7,
    "nO2": 16,
    "co": 0,
    "aqi": 88
  },
  {
    "year": 2017,
    "stationName": "EAD_AlTawia",
    "pM10": 73,
    "o3": 53,
    "sO2": 3,
    "nO2": 17,
    "co": 0,
    "aqi": 84
  },
  {
    "year": 2017,
    "stationName": "ADWEA_Samha",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0
  },
  {
    "year": 2017,
    "stationName": "EAD_Mussafah",
    "pM10": 83,
    "o3": 0,
    "sO2": 6,
    "nO2": 24,
    "co": 0,
    "aqi": 84
  },
  {
    "year": 2017,
    "stationName": "EAD_Liwa",
    "pM10": 81,
    "o3": 64,
    "sO2": 6,
    "nO2": 2,
    "co": 0,
    "aqi": 98
  },
  {
    "year": 2017,
    "stationName": "EAD_AlAinSchool",
    "pM10": 78,
    "o3": 36,
    "sO2": 3,
    "nO2": 15,
    "co": 0,
    "aqi": 82
  },
  {
    "year": 2017,
    "stationName": "EAD_KhalifaSchool",
    "pM10": 70,
    "o3": 54,
    "sO2": 5,
    "nO2": 16,
    "co": 0,
    "aqi": 84
  },
  {
    "year": 2017,
    "stationName": "ADWEA_Shuweihat",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0
  },
  {
    "year": 2017,
    "stationName": "ADWEA_Mirfa",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0
  },
  {
    "year": 2017,
    "stationName": "EAD_AlMafraq",
    "pM10": 102,
    "o3": 0,
    "sO2": 5,
    "nO2": 22,
    "co": 0,
    "aqi": 103
  },
  {
    "year": 2017,
    "stationName": "EAD_AlQuaa",
    "pM10": 82,
    "o3": 37,
    "sO2": 3,
    "nO2": 2,
    "co": 5,
    "aqi": 87
  },
  {
    "year": 2017,
    "stationName": "EAD_RuwaisTransco",
    "pM10": 64,
    "o3": 49,
    "sO2": 9,
    "nO2": 10,
    "co": 10,
    "aqi": 78
  },
  {
    "year": 2017,
    "stationName": "EAD_AlAinStreet",
    "pM10": 65,
    "o3": 0,
    "sO2": 3,
    "nO2": 20,
    "co": 5,
    "aqi": 66
  },
  {
    "year": 2017,
    "stationName": "EAD_BidaZayed",
    "pM10": 81,
    "o3": 49,
    "sO2": 6,
    "nO2": 8,
    "co": 0,
    "aqi": 92
  },
  {
    "year": 2017,
    "stationName": "EAD_HamdanStreet",
    "pM10": 74,
    "o3": 0,
    "sO2": 6,
    "nO2": 24,
    "co": 6,
    "aqi": 75
  },
  {
    "year": 2017,
    "stationName": "EAD_KhalifaCity",
    "pM10": 78,
    "o3": 47,
    "sO2": 3,
    "nO2": 15,
    "co": 0,
    "aqi": 88
  },
  {
    "year": 2017,
    "stationName": "EAD_Zakher",
    "pM10": 65,
    "o3": 0,
    "sO2": 4,
    "nO2": 13,
    "co": 0,
    "aqi": 67
  },
  {
    "year": 2017,
    "stationName": "EAD_Sweihan",
    "pM10": 67,
    "o3": 60,
    "sO2": 4,
    "nO2": 7,
    "co": 4,
    "aqi": 85
  },
  {
    "year": 2017,
    "stationName": "EAD_Habshan",
    "pM10": 79,
    "o3": 47,
    "sO2": 9,
    "nO2": 6,
    "co": 0,
    "aqi": 88
  },
  {
    "year": 2017,
    "stationName": "Abu Dhabi",
    "pM10": 62,
    "o3": 30,
    "sO2": 4,
    "nO2": 11,
    "co": 1,
    "aqi": 70
  },
  {
    "year": 2017,
    "stationName": "EAD_AlMaqta",
    "pM10": 74,
    "o3": 58,
    "sO2": 6,
    "nO2": 21,
    "co": 4,
    "aqi": 89
  },
  {
    "year": 2017,
    "stationName": "EAD_E11Road",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0
  },
  {
    "year": 2018,
    "stationName": "Abu Dhabi",
    "pM10": 72,
    "o3": 38,
    "sO2": 5,
    "nO2": 12,
    "co": 1,
    "aqi": 81
  },
  {
    "year": 2018,
    "stationName": "EAD_KhalifaSchool",
    "pM10": 85,
    "o3": 68,
    "sO2": 6,
    "nO2": 16,
    "co": 0,
    "aqi": 103
  },
  {
    "year": 2018,
    "stationName": "EAD_AlAinStreet",
    "pM10": 77,
    "o3": 0,
    "sO2": 3,
    "nO2": 20,
    "co": 3,
    "aqi": 78
  },
  {
    "year": 2018,
    "stationName": "EAD_AlQuaa",
    "pM10": 91,
    "o3": 36,
    "sO2": 3,
    "nO2": 3,
    "co": 4,
    "aqi": 95
  },
  {
    "year": 2018,
    "stationName": "ADWEA_Mirfa",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0
  },
  {
    "year": 2018,
    "stationName": "EAD_Sweihan",
    "pM10": 81,
    "o3": 56,
    "sO2": 5,
    "nO2": 8,
    "co": 3,
    "aqi": 94
  },
  {
    "year": 2018,
    "stationName": "EAD_AlAinSchool",
    "pM10": 82,
    "o3": 45,
    "sO2": 4,
    "nO2": 18,
    "co": 0,
    "aqi": 89
  },
  {
    "year": 2018,
    "stationName": "EAD_BidaZayed",
    "pM10": 91,
    "o3": 48,
    "sO2": 8,
    "nO2": 9,
    "co": 0,
    "aqi": 98
  },
  {
    "year": 2018,
    "stationName": "EAD_AlMafraq",
    "pM10": 108,
    "o3": 0,
    "sO2": 7,
    "nO2": 24,
    "co": 0,
    "aqi": 108
  },
  {
    "year": 2018,
    "stationName": "EAD_Gayathi",
    "pM10": 88,
    "o3": 61,
    "sO2": 7,
    "nO2": 7,
    "co": 0,
    "aqi": 99
  },
  {
    "year": 2018,
    "stationName": "ADWEA_Shuweihat",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0
  },
  {
    "year": 2018,
    "stationName": "EAD_Habshan",
    "pM10": 91,
    "o3": 75,
    "sO2": 9,
    "nO2": 10,
    "co": 0,
    "aqi": 112
  },
  {
    "year": 2018,
    "stationName": "EAD_KhadijaSchool",
    "pM10": 76,
    "o3": 84,
    "sO2": 8,
    "nO2": 18,
    "co": 0,
    "aqi": 108
  },
  {
    "year": 2018,
    "stationName": "EAD_Baniyas",
    "pM10": 79,
    "o3": 63,
    "sO2": 5,
    "nO2": 17,
    "co": 0,
    "aqi": 98
  },
  {
    "year": 2018,
    "stationName": "EAD_HamdanStreet",
    "pM10": 79,
    "o3": 0,
    "sO2": 8,
    "nO2": 26,
    "co": 4,
    "aqi": 81
  },
  {
    "year": 2018,
    "stationName": "EAD_KhalifaCity",
    "pM10": 96,
    "o3": 69,
    "sO2": 6,
    "nO2": 16,
    "co": 0,
    "aqi": 111
  },
  {
    "year": 2018,
    "stationName": "EAD_Zakher",
    "pM10": 87,
    "o3": 0,
    "sO2": 4,
    "nO2": 18,
    "co": 0,
    "aqi": 88
  },
  {
    "year": 2018,
    "stationName": "EAD_E11Road",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0
  },
  {
    "year": 2018,
    "stationName": "ADWEA_Samha",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0
  },
  {
    "year": 2018,
    "stationName": "EAD_Liwa",
    "pM10": 80,
    "o3": 82,
    "sO2": 6,
    "nO2": 6,
    "co": 0,
    "aqi": 107
  },
  {
    "year": 2018,
    "stationName": "EAD_RuwaisTransco",
    "pM10": 80,
    "o3": 56,
    "sO2": 9,
    "nO2": 10,
    "co": 3,
    "aqi": 93
  },
  {
    "year": 2018,
    "stationName": "EAD_AlTawia",
    "pM10": 87,
    "o3": 51,
    "sO2": 3,
    "nO2": 14,
    "co": 0,
    "aqi": 94
  },
  {
    "year": 2018,
    "stationName": "EAD_Mussafah",
    "pM10": 104,
    "o3": 0,
    "sO2": 7,
    "nO2": 25,
    "co": 0,
    "aqi": 105
  },
  {
    "year": 2018,
    "stationName": "EAD_AlMaqta",
    "pM10": 84,
    "o3": 79,
    "sO2": 6,
    "nO2": 21,
    "co": 6,
    "aqi": 106
  },
  {
    "year": 2019,
    "stationName": "EAD_AlAinStreet",
    "pM10": 47,
    "o3": 0,
    "sO2": 5,
    "nO2": 22,
    "co": 4,
    "aqi": 55
  },
  {
    "year": 2019,
    "stationName": "EAD_KhalifaSchool",
    "pM10": 58,
    "o3": 29,
    "sO2": 4,
    "nO2": 15,
    "co": 0,
    "aqi": 75
  },
  {
    "year": 2019,
    "stationName": "EAD_AlQuaa",
    "pM10": 70,
    "o3": 38,
    "sO2": 4,
    "nO2": 3,
    "co": 3,
    "aqi": 79
  },
  {
    "year": 2019,
    "stationName": "EAD_RuwaisTransco",
    "pM10": 67,
    "o3": 52,
    "sO2": 8,
    "nO2": 10,
    "co": 7,
    "aqi": 84
  },
  {
    "year": 2019,
    "stationName": "ADWEA_Mirfa",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0
  },
  {
    "year": 2019,
    "stationName": "EAD_HamdanStreet",
    "pM10": 58,
    "o3": 0,
    "sO2": 6,
    "nO2": 24,
    "co": 9,
    "aqi": 64
  },
  {
    "year": 2019,
    "stationName": "EAD_KhadijaSchool",
    "pM10": 58,
    "o3": 42,
    "sO2": 6,
    "nO2": 14,
    "co": 0,
    "aqi": 80
  },
  {
    "year": 2019,
    "stationName": "EAD_Sweihan",
    "pM10": 48,
    "o3": 50,
    "sO2": 5,
    "nO2": 8,
    "co": 5,
    "aqi": 76
  },
  {
    "year": 2019,
    "stationName": "EAD_BidaZayed",
    "pM10": 68,
    "o3": 41,
    "sO2": 9,
    "nO2": 8,
    "co": 0,
    "aqi": 81
  },
  {
    "year": 2019,
    "stationName": "EAD_Gayathi",
    "pM10": 64,
    "o3": 56,
    "sO2": 7,
    "nO2": 6,
    "co": 0,
    "aqi": 87
  },
  {
    "year": 2019,
    "stationName": "EAD_Baniyas",
    "pM10": 64,
    "o3": 29,
    "sO2": 5,
    "nO2": 11,
    "co": 0,
    "aqi": 80
  },
  {
    "year": 2019,
    "stationName": "EAD_AlTawia",
    "pM10": 58,
    "o3": 43,
    "sO2": 6,
    "nO2": 9,
    "co": 0,
    "aqi": 70
  },
  {
    "year": 2019,
    "stationName": "ADWEA_Samha",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0
  },
  {
    "year": 2019,
    "stationName": "EAD_Zakher",
    "pM10": 65,
    "o3": 0,
    "sO2": 6,
    "nO2": 12,
    "co": 0,
    "aqi": 70
  },
  {
    "year": 2019,
    "stationName": "EAD_Habshan",
    "pM10": 73,
    "o3": 62,
    "sO2": 8,
    "nO2": 8,
    "co": 0,
    "aqi": 96
  },
  {
    "year": 2019,
    "stationName": "EAD_E11Road",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0
  },
  {
    "year": 2019,
    "stationName": "ADWEA_Shuweihat",
    "pM10": 0,
    "o3": 0,
    "sO2": 0,
    "nO2": 0,
    "co": 0,
    "aqi": 0
  },
  {
    "year": 2019,
    "stationName": "EAD_AlMaqta",
    "pM10": 65,
    "o3": 41,
    "sO2": 5,
    "nO2": 14,
    "co": 7,
    "aqi": 78
  },
  {
    "year": 2019,
    "stationName": "EAD_AlMafraq",
    "pM10": 102,
    "o3": 0,
    "sO2": 5,
    "nO2": 20,
    "co": 0,
    "aqi": 110
  },
  {
    "year": 2019,
    "stationName": "EAD_Liwa",
    "pM10": 71,
    "o3": 66,
    "sO2": 8,
    "nO2": 5,
    "co": 0,
    "aqi": 103
  },
  {
    "year": 2019,
    "stationName": "EAD_AlAinSchool",
    "pM10": 51,
    "o3": 32,
    "sO2": 6,
    "nO2": 13,
    "co": 0,
    "aqi": 62
  },
  {
    "year": 2019,
    "stationName": "EAD_KhalifaCity",
    "pM10": 81,
    "o3": 35,
    "sO2": 6,
    "nO2": 16,
    "co": 0,
    "aqi": 91
  },
  {
    "year": 2019,
    "stationName": "EAD_Mussafah",
    "pM10": 72,
    "o3": 0,
    "sO2": 4,
    "nO2": 20,
    "co": 0,
    "aqi": 81
  },
  {
    "year": 2019,
    "stationName": "Abu Dhabi",
    "pM10": 54,
    "o3": 27,
    "sO2": 5,
    "nO2": 10,
    "co": 2,
    "aqi": 66
  },
  {
    "year": 2020,
    "stationName": "Abu Dhabi",
    "pM10": 71,
    "o3": 30,
    "sO2": 7,
    "nO2": 12,
    "co": 2,
    "aqi": 79
  },
  {
    "year": 2020,
    "stationName": "EAD_AlMaqta",
    "pM10": 83,
    "o3": 38,
    "sO2": 5,
    "nO2": 14,
    "co": 5,
    "aqi": 89
  },
  {
    "year": 2020,
    "stationName": "EAD_Sweihan",
    "pM10": 49,
    "o3": 46,
    "sO2": 5,
    "nO2": 7,
    "co": 5,
    "aqi": 63
  },
  {
    "year": 2020,
    "stationName": "EAD_AlAinStreet",
    "pM10": 59,
    "o3": 0,
    "sO2": 5,
    "nO2": 16,
    "co": 6,
    "aqi": 60
  },
  {
    "year": 2020,
    "stationName": "EAD_Zakher",
    "pM10": 65,
    "o3": 0,
    "sO2": 6,
    "nO2": 10,
    "co": 0,
    "aqi": 66
  },
  {
    "year": 2020,
    "stationName": "EAD_E11Road",
    "pM10": 58,
    "o3": 0,
    "sO2": 9,
    "nO2": 9,
    "co": 4,
    "aqi": 62
  },
  {
    "year": 2020,
    "stationName": "EAD_Habshan",
    "pM10": 76,
    "o3": 51,
    "sO2": 12,
    "nO2": 7,
    "co": 0,
    "aqi": 90
  },
  {
    "year": 2020,
    "stationName": "EAD_BidaZayed",
    "pM10": 72,
    "o3": 47,
    "sO2": 13,
    "nO2": 10,
    "co": 0,
    "aqi": 84
  },
  {
    "year": 2020,
    "stationName": "EAD_AlQuaa",
    "pM10": 66,
    "o3": 47,
    "sO2": 5,
    "nO2": 4,
    "co": 4,
    "aqi": 76
  },
  {
    "year": 2020,
    "stationName": "EAD_RuwaisTransco",
    "pM10": 66,
    "o3": 48,
    "sO2": 15,
    "nO2": 11,
    "co": 7,
    "aqi": 81
  },
  {
    "year": 2020,
    "stationName": "EAD_KhadijaSchool",
    "pM10": 64,
    "o3": 47,
    "sO2": 6,
    "nO2": 13,
    "co": 0,
    "aqi": 80
  },
  {
    "year": 2020,
    "stationName": "EAD_Mussafah",
    "pM10": 95,
    "o3": 0,
    "sO2": 6,
    "nO2": 23,
    "co": 0,
    "aqi": 100
  },
  {
    "year": 2020,
    "stationName": "EAD_KhalifaSchool",
    "pM10": 66,
    "o3": 29,
    "sO2": 6,
    "nO2": 13,
    "co": 0,
    "aqi": 74
  },
  {
    "year": 2020,
    "stationName": "EAD_Liwa",
    "pM10": 54,
    "o3": 54,
    "sO2": 10,
    "nO2": 5,
    "co": 0,
    "aqi": 72
  },
  {
    "year": 2020,
    "stationName": "EAD_AlMafraq",
    "pM10": 124,
    "o3": 0,
    "sO2": 5,
    "nO2": 22,
    "co": 0,
    "aqi": 131
  },
  {
    "year": 2020,
    "stationName": "EAD_HamdanStreet",
    "pM10": 65,
    "o3": 0,
    "sO2": 7,
    "nO2": 25,
    "co": 8,
    "aqi": 68
  },
  {
    "year": 2020,
    "stationName": "EAD_AlTawia",
    "pM10": 63,
    "o3": 47,
    "sO2": 6,
    "nO2": 10,
    "co": 0,
    "aqi": 73
  },
  {
    "year": 2020,
    "stationName": "EAD_AlAinSchool",
    "pM10": 52,
    "o3": 32,
    "sO2": 7,
    "nO2": 13,
    "co": 0,
    "aqi": 56
  },
  {
    "year": 2020,
    "stationName": "EAD_KhalifaCity",
    "pM10": 79,
    "o3": 39,
    "sO2": 4,
    "nO2": 12,
    "co": 0,
    "aqi": 85
  },
  {
    "year": 2020,
    "stationName": "EAD_Baniyas",
    "pM10": 81,
    "o3": 28,
    "sO2": 5,
    "nO2": 16,
    "co": 0,
    "aqi": 87
  },
  {
    "year": 2020,
    "stationName": "EAD_Gayathi",
    "pM10": 74,
    "o3": 46,
    "sO2": 11,
    "nO2": 8,
    "co": 0,
    "aqi": 82
  },
  {
    "year": 2021,
    "stationName": "EAD_AlMaqta",
    "pM10": 79,
    "o3": 36,
    "sO2": 6,
    "nO2": 18,
    "co": 7,
    "aqi": 90
  },
  {
    "year": 2021,
    "stationName": "EAD_AlTawia",
    "pM10": 70,
    "o3": 43,
    "sO2": 6,
    "nO2": 6,
    "co": 0,
    "aqi": 77
  },
  {
    "year": 2021,
    "stationName": "EAD_E11Road",
    "pM10": 72,
    "o3": 0,
    "sO2": 14,
    "nO2": 11,
    "co": 3,
    "aqi": 78
  },
  {
    "year": 2021,
    "stationName": "EAD_Zakher",
    "pM10": 66,
    "o3": 0,
    "sO2": 5,
    "nO2": 12,
    "co": 0,
    "aqi": 67
  },
  {
    "year": 2021,
    "stationName": "EAD_RuwaisTransco",
    "pM10": 59,
    "o3": 49,
    "sO2": 20,
    "nO2": 11,
    "co": 3,
    "aqi": 85
  },
  {
    "year": 2021,
    "stationName": "EAD_Mussafah",
    "pM10": 105,
    "o3": 0,
    "sO2": 5,
    "nO2": 29,
    "co": 0,
    "aqi": 112
  },
  {
    "year": 2021,
    "stationName": "EAD_KhalifaCity",
    "pM10": 76,
    "o3": 42,
    "sO2": 6,
    "nO2": 15,
    "co": 0,
    "aqi": 87
  },
  {
    "year": 2021,
    "stationName": "EAD_HamdanStreet",
    "pM10": 57,
    "o3": 0,
    "sO2": 4,
    "nO2": 26,
    "co": 5,
    "aqi": 64
  },
  {
    "year": 2021,
    "stationName": "EAD_KhadijaSchool",
    "pM10": 65,
    "o3": 43,
    "sO2": 7,
    "nO2": 13,
    "co": 0,
    "aqi": 79
  },
  {
    "year": 2021,
    "stationName": "EAD_Liwa",
    "pM10": 89,
    "o3": 52,
    "sO2": 10,
    "nO2": 4,
    "co": 0,
    "aqi": 105
  },
  {
    "year": 2021,
    "stationName": "EAD_Sweihan",
    "pM10": 57,
    "o3": 47,
    "sO2": 4,
    "nO2": 7,
    "co": 3,
    "aqi": 69
  },
  {
    "year": 2021,
    "stationName": "EAD_BidaZayed",
    "pM10": 64,
    "o3": 43,
    "sO2": 15,
    "nO2": 7,
    "co": 0,
    "aqi": 77
  },
  {
    "year": 2021,
    "stationName": "EAD_Gayathi",
    "pM10": 80,
    "o3": 52,
    "sO2": 9,
    "nO2": 7,
    "co": 0,
    "aqi": 94
  },
  {
    "year": 2021,
    "stationName": "EAD_AlAinSchool",
    "pM10": 78,
    "o3": 33,
    "sO2": 5,
    "nO2": 13,
    "co": 0,
    "aqi": 82
  },
  {
    "year": 2021,
    "stationName": "EAD_Habshan",
    "pM10": 80,
    "o3": 46,
    "sO2": 12,
    "nO2": 8,
    "co": 0,
    "aqi": 88
  },
  {
    "year": 2021,
    "stationName": "Abu Dhabi",
    "pM10": 76,
    "o3": 30,
    "sO2": 8,
    "nO2": 13,
    "co": 1,
    "aqi": 85
  },
  {
    "year": 2021,
    "stationName": "EAD_Baniyas",
    "pM10": 91,
    "o3": 32,
    "sO2": 5,
    "nO2": 14,
    "co": 0,
    "aqi": 98
  },
  {
    "year": 2021,
    "stationName": "EAD_AlAinStreet",
    "pM10": 74,
    "o3": 0,
    "sO2": 4,
    "nO2": 18,
    "co": 5,
    "aqi": 75
  },
  {
    "year": 2021,
    "stationName": "EAD_AlQuaa",
    "pM10": 78,
    "o3": 49,
    "sO2": 6,
    "nO2": 4,
    "co": 3,
    "aqi": 86
  },
  {
    "year": 2021,
    "stationName": "EAD_KhalifaSchool",
    "pM10": 70,
    "o3": 28,
    "sO2": 5,
    "nO2": 13,
    "co": 0,
    "aqi": 75
  },
  {
    "year": 2021,
    "stationName": "EAD_AlMafraq",
    "pM10": 106,
    "o3": 0,
    "sO2": 5,
    "nO2": 25,
    "co": 0,
    "aqi": 111
  },
  {
    "year": 2022,
    "stationName": "EAD_Mussafah",
    "pM10": 107,
    "o3": 0,
    "sO2": 7,
    "nO2": 27,
    "co": 0,
    "aqi": 113
  },
  {
    "year": 2022,
    "stationName": "Abu Dhabi",
    "pM10": 86,
    "o3": 34,
    "sO2": 8,
    "nO2": 13,
    "co": 2,
    "aqi": 99
  },
  {
    "year": 2022,
    "stationName": "EAD_AlTawia",
    "pM10": 78,
    "o3": 44,
    "sO2": 7,
    "nO2": 7,
    "co": 0,
    "aqi": 87
  },
  {
    "year": 2022,
    "stationName": "EAD_E11Road",
    "pM10": 87,
    "o3": 0,
    "sO2": 12,
    "nO2": 11,
    "co": 3,
    "aqi": 91
  },
  {
    "year": 2022,
    "stationName": "EAD_Liwa",
    "pM10": 82,
    "o3": 51,
    "sO2": 8,
    "nO2": 4,
    "co": 0,
    "aqi": 95
  },
  {
    "year": 2022,
    "stationName": "EAD_AlMaqta",
    "pM10": 78,
    "o3": 38,
    "sO2": 7,
    "nO2": 18,
    "co": 4,
    "aqi": 87
  },
  {
    "year": 2022,
    "stationName": "EAD_AlAinSchool",
    "pM10": 90,
    "o3": 38,
    "sO2": 6,
    "nO2": 15,
    "co": 0,
    "aqi": 97
  },
  {
    "year": 2022,
    "stationName": "EAD_Sweihan",
    "pM10": 65,
    "o3": 49,
    "sO2": 5,
    "nO2": 7,
    "co": 3,
    "aqi": 78
  },
  {
    "year": 2022,
    "stationName": "EAD_Zakher",
    "pM10": 84,
    "o3": 0,
    "sO2": 6,
    "nO2": 14,
    "co": 0,
    "aqi": 88
  },
  {
    "year": 2022,
    "stationName": "EAD_KhadijaSchool",
    "pM10": 71,
    "o3": 44,
    "sO2": 6,
    "nO2": 16,
    "co": 0,
    "aqi": 92
  },
  {
    "year": 2022,
    "stationName": "EAD_AlMafraq",
    "pM10": 108,
    "o3": 0,
    "sO2": 8,
    "nO2": 22,
    "co": 0,
    "aqi": 124
  },
  {
    "year": 2022,
    "stationName": "EAD_BidaZayed",
    "pM10": 69,
    "o3": 63,
    "sO2": 14,
    "nO2": 9,
    "co": 0,
    "aqi": 98
  },
  {
    "year": 2022,
    "stationName": "EAD_Habshan",
    "pM10": 89,
    "o3": 56,
    "sO2": 10,
    "nO2": 8,
    "co": 0,
    "aqi": 107
  },
  {
    "year": 2022,
    "stationName": "EAD_KhalifaCity",
    "pM10": 97,
    "o3": 43,
    "sO2": 8,
    "nO2": 13,
    "co": 0,
    "aqi": 112
  },
  {
    "year": 2022,
    "stationName": "EAD_HamdanStreet",
    "pM10": 73,
    "o3": 0,
    "sO2": 8,
    "nO2": 27,
    "co": 6,
    "aqi": 80
  },
  {
    "year": 2022,
    "stationName": "EAD_Baniyas",
    "pM10": 97,
    "o3": 35,
    "sO2": 9,
    "nO2": 15,
    "co": 0,
    "aqi": 118
  },
  {
    "year": 2022,
    "stationName": "EAD_Gayathi",
    "pM10": 104,
    "o3": 50,
    "sO2": 7,
    "nO2": 7,
    "co": 0,
    "aqi": 120
  },
  {
    "year": 2022,
    "stationName": "EAD_AlAinStreet",
    "pM10": 78,
    "o3": 0,
    "sO2": 6,
    "nO2": 20,
    "co": 6,
    "aqi": 82
  },
  {
    "year": 2022,
    "stationName": "EAD_AlQuaa",
    "pM10": 83,
    "o3": 55,
    "sO2": 4,
    "nO2": 3,
    "co": 4,
    "aqi": 94
  },
  {
    "year": 2022,
    "stationName": "EAD_KhalifaSchool",
    "pM10": 102,
    "o3": 57,
    "sO2": 7,
    "nO2": 14,
    "co": 0,
    "aqi": 117
  },
  {
    "year": 2022,
    "stationName": "EAD_RuwaisTransco",
    "pM10": 86,
    "o3": 49,
    "sO2": 16,
    "nO2": 12,
    "co": 4,
    "aqi": 103
  },
  {
    "year": 2023,
    "stationName": "EAD_HamdanStreet",
    "pM10": 54,
    "o3": 0,
    "sO2": 7,
    "nO2": 29,
    "co": 5,
    "aqi": 68
  },
  {
    "year": 2023,
    "stationName": "EAD_Baniyas",
    "pM10": 76,
    "o3": 51,
    "sO2": 6,
    "nO2": 17,
    "co": 0,
    "aqi": 91
  },
  {
    "year": 2023,
    "stationName": "EAD_Gayathi",
    "pM10": 67,
    "o3": 52,
    "sO2": 7,
    "nO2": 6,
    "co": 0,
    "aqi": 85
  },
  {
    "year": 2023,
    "stationName": "EAD_KhalifaCity",
    "pM10": 74,
    "o3": 59,
    "sO2": 7,
    "nO2": 14,
    "co": 0,
    "aqi": 104
  },
  {
    "year": 2023,
    "stationName": "EAD_Mussafah",
    "pM10": 77,
    "o3": 0,
    "sO2": 5,
    "nO2": 19,
    "co": 0,
    "aqi": 82
  },
  {
    "year": 2023,
    "stationName": "EAD_KhalifaSchool",
    "pM10": 80,
    "o3": 33,
    "sO2": 7,
    "nO2": 13,
    "co": 0,
    "aqi": 84
  },
  {
    "year": 2023,
    "stationName": "EAD_Liwa",
    "pM10": 58,
    "o3": 44,
    "sO2": 9,
    "nO2": 3,
    "co": 0,
    "aqi": 72
  },
  {
    "year": 2023,
    "stationName": "EAD_AlMafraq",
    "pM10": 130,
    "o3": 0,
    "sO2": 4,
    "nO2": 27,
    "co": 0,
    "aqi": 134
  },
  {
    "year": 2023,
    "stationName": "EAD_AlTawia",
    "pM10": 65,
    "o3": 43,
    "sO2": 5,
    "nO2": 5,
    "co": 0,
    "aqi": 76
  },
  {
    "year": 2023,
    "stationName": "EAD_AlMaqta",
    "pM10": 75,
    "o3": 41,
    "sO2": 6,
    "nO2": 16,
    "co": 4,
    "aqi": 87
  },
  {
    "year": 2023,
    "stationName": "EAD_Sweihan",
    "pM10": 54,
    "o3": 49,
    "sO2": 5,
    "nO2": 6,
    "co": 3,
    "aqi": 71
  },
  {
    "year": 2023,
    "stationName": "EAD_BidaZayed",
    "pM10": 39,
    "o3": 45,
    "sO2": 9,
    "nO2": 5,
    "co": 0,
    "aqi": 60
  },
  {
    "year": 2023,
    "stationName": "EAD_AlAinSchool",
    "pM10": 61,
    "o3": 39,
    "sO2": 7,
    "nO2": 14,
    "co": 0,
    "aqi": 69
  },
  {
    "year": 2023,
    "stationName": "EAD_Habshan",
    "pM10": 49,
    "o3": 50,
    "sO2": 7,
    "nO2": 7,
    "co": 0,
    "aqi": 67
  },
  {
    "year": 2023,
    "stationName": "EAD_KhadijaSchool",
    "pM10": 61,
    "o3": 47,
    "sO2": 6,
    "nO2": 16,
    "co": 0,
    "aqi": 88
  },
  {
    "year": 2023,
    "stationName": "EAD_AlQuaa",
    "pM10": 73,
    "o3": 52,
    "sO2": 4,
    "nO2": 3,
    "co": 3,
    "aqi": 84
  },
  {
    "year": 2023,
    "stationName": "EAD_AlAinStreet",
    "pM10": 65,
    "o3": 0,
    "sO2": 5,
    "nO2": 17,
    "co": 4,
    "aqi": 66
  },
  {
    "year": 2023,
    "stationName": "Abu Dhabi",
    "pM10": 66,
    "o3": 32,
    "sO2": 6,
    "nO2": 12,
    "co": 1,
    "aqi": 79
  },
  {
    "year": 2023,
    "stationName": "EAD_RuwaisTransco",
    "pM10": 51,
    "o3": 44,
    "sO2": 9,
    "nO2": 10,
    "co": 3,
    "aqi": 65
  },
  {
    "year": 2023,
    "stationName": "EAD_Zakher",
    "pM10": 64,
    "o3": 0,
    "sO2": 5,
    "nO2": 11,
    "co": 0,
    "aqi": 65
  },
  {
    "year": 2023,
    "stationName": "EAD_E11Road",
    "pM10": 56,
    "o3": 0,
    "sO2": 8,
    "nO2": 10,
    "co": 3,
    "aqi": 59
  }
];
var seriesData = [];
// var aqiData = [];
var pm10Data = [];
var so2Data = [];
var coData = []; 
var o3Data = [];
var no2Data = [];
var xCategories = [];
yearlyDataForStationAqiAndPollutants.filter(t=> t.stationName == 'Abu Dhabi').forEach(item => {
  // aqiData.push(item.aqi);
  pm10Data.push(item.pM10);
  so2Data.push(item.sO2);
  coData.push(item.co);
  o3Data.push(item.o3);
  no2Data.push(item.nO2);
  if (!xCategories.includes(item.year)) {
    xCategories.push(item.year);
  }
});
// seriesData.push({name: 'AQI', data: aqiData});
seriesData.push({name: 'PM10', data: pm10Data});
seriesData.push({name: 'SO2', data: so2Data});
seriesData.push({name: 'CO', data: coData});
seriesData.push({name: 'O3', data: o3Data});
seriesData.push({name: 'NO2', data: no2Data});
var filterSeriesData = seriesData;
var options = {
  series: seriesData,
  chart: {
  height: 350,
  type: 'line',
  animations: {
    enabled: true,
    easing: 'linear',
    dynamicAnimation: {
      speed: 1000
    }
  },
  toolbar: {
    show: false
  },
  zoom: {
    enabled: false
  }
},

// colors: ['#9cd84e', '#facf39', '#f99049', '#f65e5f', '#a070b6', '#a06a7b'],
colors: ['#004B87', '#6693B7', '#99B7CF', '#B3C9DB', '#E6EDF3'],
dataLabels: {
  enabled: false
},
stroke: {
  width: [3,3,3,3,3,3],
  curve: 'smooth'
},
title: {
  text: '',
  align: 'left'
},
markers: {
  size: 0
},
xaxis: {
  categories: xCategories,
  labels: {
    rotateAlways: false,
}
},
legend: {
  show: true,
  position: 'bottom'
},
tooltip: {
  enabled: true,
  shared: false,
   x: {
      show: false,
      
  },
  
  
  
},
grid: {
  show: false, // hide grid
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
]
};

var chart = new ApexCharts(document.querySelector("#newchartTrend"), options);
chart.render();

// ------------------ 4th chart

var seriesData = [];
var aqiData = [];
var pm10Data = [];
var so2Data = [];
var coData = []; 
var o3Data = [];
var no2Data = [];
var xCategories = [];

yearlyDataForStationAqiAndPollutants.filter(t=> t.stationName == 'Abu Dhabi').forEach(item => {
  aqiData.push(item.aqi);
  pm10Data.push(item.pM10);
  so2Data.push(item.sO2);
  coData.push(item.co);
  o3Data.push(item.o3);
  no2Data.push(item.nO2);
  if (!xCategories.includes(item.year)) {
    xCategories.push(item.year);
  }
});

seriesData.push({name: 'AQI', data: aqiData});
seriesData.push({name: 'PM10', data: pm10Data});
seriesData.push({name: 'SO2', data: so2Data});
seriesData.push({name: 'CO', data: coData});
seriesData.push({name: 'O3', data: o3Data});
seriesData.push({name: 'NO2', data: no2Data});
var options = {
  series: seriesData,
  chart: {
  type: 'bar',
  height: 350,
  toolbar: {
    show: false
  },
},
plotOptions: {
  bar: {
    horizontal: false,
    columnWidth: '85%',
    endingShape: 'rounded',
  },
},
colors: ['#9cd84e', '#facf39', '#f99049', '#f65e5f', '#a070b6', '#a06a7b'],
dataLabels: {
  enabled: false
},
stroke: {
  show: false,
  //width: [4,7,5,6,4,4],
  // colors: ['transparent']
},
xaxis: {
  categories: xCategories,
},
// yaxis: {
//   title: {
//     text: '$ (thousands)'
//   }
// },
fill: {
  opacity: 1
},
tooltip: {
  enabled: true,
   x: {
      show: false,
      
  },
}
};

var chart = new ApexCharts(document.querySelector("#newchartTrendBar"), options);
chart.render();

function updateChart(interval) {
  // Define your logic to fetch data according to the selected interval
  // For demonstration purposes, let's assume we have predefined data for each interval
  var newData = [];
  switch (interval) {
      case 'hourly':
          newData = hourlyData; // Assuming hourlyData is defined elsewhere
          break;
      case 'daily':
          newData = dailyData; // Assuming dailyData is defined elsewhere
          break;
      case 'weekly':
          newData = weeklyData; // Assuming weeklyData is defined elsewhere
          break;
      case 'monthly':
          newData = monthlyData; // Assuming monthlyData is defined elsewhere
          break;
      case 'yearly':
          newData = yearlyData; // Assuming yearlyData is defined elsewhere
          break;
      default:
          break;
  }

  // Update the chart data
  chart.updateSeries([{
      data: newData
  }]);
}

// =====================================Chart By Sachin========================

      
var options_polutent = {
  series: [{
      name: 'Acceptable value',
      data: [44, 55, 41, 67, 22, 43,11,44, 55, 41, 67, 22, 43,11,55, 41, 67, 22, 43,11,22,45,56,78]
    }, {
      name: 'Above acceptable value ',
      data: [0, 23, 20, 8, 0, 27,22,0, 23, 0, 8, 13, 0,22,23, 0, 8, 13, 0,22,76,34,23,11]
    }],
  chart: {
  type: 'bar',
  height: 300,
  stacked: true,
},
plotOptions: {
  bar: {
    horizontal: false,
    borderRadius: 0,
    borderRadiusApplication: 'around',
    borderRadiusWhenStacked: 'last',
    dataLabels: {
      total: {
        enabled: false,
        offsetX: 0,
        style: {
          fontSize: '13px',
          fontWeight: 900
        }
      }
    }
  },
},
stroke: {
  width: 1,
  colors: ['#fff']
},

colors: ['#004B87','#F65E5F'],
xaxis: {
  categories: categoriesData,
},
yaxis: {
  title: {
    text: undefined
  },
},
tooltip: {
  y: {
    formatter: function (val) {
      return val + "K"
    }
  }
},
fill: {
  opacity: 1
},
legend: {
  show:false,
  position: 'bottom',
  horizontalAlign: 'center',
  offsetX: 40
}
};
var chart = new ApexCharts(document.querySelector("#chart_polutent"), options_polutent);
chart.render();



var options_aiq_line = {
  series: [{
  name: 'AQI',
  data: [0,10,20,30,40,50,30,28,20,10,20,46,23,78,80,100]
}],
  chart: {
  height: 300,
  width: '90%',
  type: 'area',
  toolbar: {
    show: false
  },
},
dataLabels: {
  enabled: false
},
stroke: {
  curve: 'smooth'
},
xaxis: {
  type: 'datetime',
  categories: ['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000', '7/11/2000', '8/11/2000', '9/11/2000', '10/11/2000', '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001', '3/11/2001','4/11/2001' ,'5/11/2001' ,'6/11/2001'],
  tickAmount: 10,
  labels: {
    formatter: function(value, timestamp, opts) {
      return opts.dateFormatter(new Date(timestamp), 'MMM')
    }
  }
  
},
grid: {
  show: false, // hide grid
},
fill: {
  type: 'gradient',
  gradient: {
    shade: 'dark',
    gradientToColors: [ '#FACF39','#F99049'],
    shadeIntensity: 1,
    type: 'horizontal',
    opacityFrom: .3,
    opacityTo: .3,
    stops: [0, 100, 100, 100]
  },
},
yaxis: {
  min: 0,
  max: 100
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
]
};

// var chart = new ApexCharts(document.querySelector("#options_aiq_line"), options_aiq_line);
// chart.render();



// var options_line_polutent = {
//   series: [
//   {
//     name: "High - 2013",
//     data: [28, 29, 33, 36, 32, 32, 33]
//   },
//   {
//     name: "Low - 2013",
//     data: [12, 11, 14, 18, 17, 13, 13]
//   }
// ],

//   chart: {
//   height: 300,
//   type: 'line',
//   dropShadow: {
//     enabled: false,
//     color: '#000',
//     top: 18,
//     left: 7,
//     blur: 10,
//     opacity: 0.2
//   },
//   toolbar: {
//     show: false
//   }
// },
// colors: ['#77B6EA', '#545454'],
// dataLabels: {
//   enabled: false,
// },
// stroke: {
//   curve: 'smooth'
// },
// grid: {
//   row: {
//     colors: ['#f3f3f3', 'transparent'],
//     opacity: 0.5
//   },
// },
// markers: {
//   size: 1
// },
// xaxis: {
//   categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//   lines: {
//     show: false,
//   }
// },

// yaxis: {
//   min: 0,
//   max: 100,
//   lines: {
//     show: false,
//   }
// },
//  legend: {
//   show:true,
//     position: 'top',
//     horizontalAlign: 'right',
//     floating: true,
//     offsetY: -25,
//     offsetX: -5
//   }
// };

// var chart = new ApexCharts(document.querySelector("#options_line_polutent"), options_line_polutent);
// chart.render();



