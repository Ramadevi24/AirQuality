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
$('.listSearch li').on("click", function () {
  $(".listSearch li").css("background-color", "");
  $(this).css("background-color", "rgb(57 56 56)");
  var value = $(this).text();
  //alert(value);
  $(".show-mapSearchList").show();
  $(".show-mapSearchList").html(value);
  $('.Newsearch-box').hide();
});

$('.show-mapSearchList').click(function () {
  $('.Newsearch-box').show();
  $(".show-mapSearchList").hide();
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

window.onload = function () {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.05em solid #fff }";
  document.body.appendChild(css);
};
// Breath text heading animation script End--------------
// Project Section Slider &  modal start--------------

const gap = 10;

const carousel = document.getElementById("carousel"),
  content = document.getElementById("content"),
  next = document.getElementById("next"),
  prev = document.getElementById("prev");

next.addEventListener("click", e => {
  carousel.scrollBy(width + gap, 0);
  if (carousel.scrollWidth !== 0) {
    prev.style.opacity = 0.8;
  }
  if (content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
    next.style.display = "inline-block";
    next.style.opacity = 0.3
  }
});
prev.addEventListener("click", e => {
  carousel.scrollBy(-(width + gap), 0);
  if (carousel.scrollLeft - width - gap <= 0) {
    prev.style.display = "inline-block";
  }
  if (!content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
    next.style.display = "inline-block";
    next.style.opacity = 0.8;
  }
});

let width = carousel.offsetWidth;
window.addEventListener("resize", e => (width = carousel.offsetWidth));

const stationsWithLocations = [{
  stationId: "EAD_HamdanStreet",
  stationName: "Hamdan Street",
  latitude: 24.4889,
  longitude: 54.3637
}, {
  stationId: "EAD_KhadijaSchool",
  stationName: "Khadejah School",
  latitude: 24.4816,
  longitude: 54.3693
}, {
  stationId: "EAD_KhalifaSchool",
  stationName: "Khalifa School",
  latitude: 24.4301,
  longitude: 54.4084
}, {
  stationId: "EAD_Mussafah",
  stationName: "Mussafah",
  latitude: 24.3472,
  longitude: 54.5029
}, {
  stationId: "EAD_Baniyas",
  stationName: "Baniyas School",
  latitude: 24.3213,
  longitude: 54.6359
}, {
  stationId: "EAD_AlMafraq",
  stationName: "Al Maqta",
  latitude: 24.4035,
  longitude: 54.5161
}, {
  stationId: "EAD_KhalifaCity",
  stationName: "Khalifa City A",
  latitude: 24.4199,
  longitude: 54.5782
}, {
  stationId: "EAD_AlMafraq",
  stationName: "Al Mafraq",
  latitude: 24.2863,
  longitude: 54.5889
}, {
  stationId: "EAD_AlAinSchool",
  stationName: "Al Ain Islamic Institute",
  latitude: 24.2191,
  longitude: 55.7349
}, {
  stationId: "EAD_AlAinStreet",
  stationName: "Al Ain Street",
  latitude: 24.2259,
  longitude: 55.7658
}, {
  stationId: "EAD_Sweihan",
  stationName: "Sweihan",
  latitude: 24.4667,
  longitude: 55.3429
}, {
  stationId: "EAD_AlTawia",
  stationName: "Al Tawia",
  latitude: 24.2592,
  longitude: 55.7049
}, {
  stationId: "EAD_Zakher",
  stationName: "Zakher",
  latitude: 24.1635,
  longitude: 55.7021
}, {
  stationId: "EAD_AlQuaa",
  stationName: "Al Quaa",
  latitude: 23.5312,
  longitude: 55.486
}, {
  stationId: "EAD_BidaZayed",
  stationName: "Bida Zayed",
  latitude: 23.6523,
  longitude: 53.7039
}, {
  stationId: "EAD_Gayathi",
  stationName: "Gayathi School",
  latitude: 23.8355,
  longitude: 52.8103
}, {
  stationId: "EAD_Liwa",
  stationName: "Liwa Oasis",
  latitude: 23.0958,
  longitude: 53.6064
}, {
  stationId: "EAD_RuwaisTransco",
  stationName: "Ruwais",
  latitude: 24.0909,
  longitude: 52.7548
}, {
  stationId: "EAD_Habshan",
  stationName: "Habshan South",
  latitude: 23.7504,
  longitude: 53.7453
}, {
  stationId: "EAD_E11Road",
  stationName: "E11 Road",
  latitude: 24.0352,
  longitude: 53.8853
}, {
  stationId: "",
  stationName: "Abu Dhabi",
  latitude: 24.4539,
  longitude: 54.3773
}];

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

const statusClass = {
  Good: "Good",
  Moderate: "Moderate",
  UnHealthlySensitiveGroups: "UnHealthly Sensitive Groups",
  UnHealthly: "UnHealthly",
  VeryUnHealthly: "Very UnHealthly",
  Hazardous: "Hazardous",
}

var currentStationDetails;
var liveCityData = [];
var labelsData = [];
var pollutantLevels = [];
var colorCodesForYearlyStationChartData = [];
var sortingOrder = 'asc'; // Initial sorting order
var seriesData = [];
// var aqiData = [];
var pm10Data = [];
var so2Data = [];
var coData = [];
var o3Data = [];
var no2Data = [];
var xCategories = [];
var yearlyStationChartData = [];
var aqiLineChart;
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
  },
  maintainAspectRatio: false, // Disable aspect ratio maintenance
  animation: {
    duration: 2000, // Animation duration in milliseconds
  },
};

var lineChartOptions = {
  series: [{
    name: 'AQI',
    data: []
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
    // type: 'datetime',
    categories: [], //['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000', '7/11/2000', '8/11/2000', '9/11/2000', '10/11/2000', '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001', '3/11/2001','4/11/2001' ,'5/11/2001' ,'6/11/2001'],
    // tickAmount: 10,
    labels: {
      // formatter: function(value, timestamp, opts) {
      //   return opts.dateFormatter(new Date(timestamp), 'MMM')
      // }
    }
  },
  grid: {
    show: false, // hide grid
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      gradientToColors: ['#FACF39', '#F99049'],
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

$(document).ready(function () {
  aqiLineChart = new ApexCharts(document.querySelector("#aqiLineChart"), lineChartOptions);
  aqiLineChart.render();
  getCurrentLocation();
  $('#currentDate').text(getFormattedDate(new Date()));
  // Open Sidebar
  $(".openSidebar").click(function () {
    $(".sidebar").css("width", "40%");
    $('.modal-background').addClass('project-modal');
    // $(".main-content").css("margin-right", "250px");
  });

  // Close Sidebar
  $(".close-btn").click(function () {
    $(".sidebar").css("width", "0");
    $(".main-content").css("margin-right", "0");
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
});

// Project Section modal End--------------

// Insight Section Script by Sachin---------
// var myCarousel = document.querySelector('#carouselExampleControls1')
// 		var carousel = new bootstrap.Carousel(myCarousel, {
// 			interval: 2000000000,
// 			wrap: false
// 		})
function toggleDiv(tabId) {
  document.querySelectorAll('.tab-content.mt-0').forEach(function (div) {
    div.style.display = 'none';
  });
  document.getElementById(tabId).style.display = 'block';
}

// Map Search icon script Start--------------   
$(".dropdown-change li a").click(function () {
  var selText = $(this).text();
  $(this).parents('.btn-group').find('.dropdown-toggle').html(selText);
});

function createChartButtonClickHandler(chartType) {
  return function () {
    switch (chartType) {
      case "Hourly":
        GetHourlyStationChart(stationNameforChart);
        break;
      case "Daily":
        GetDailyStationChart(stationNameforChart);
        break;
      case "Weekly":
        GetWeeklyStationChart(stationNameforChart);
        break;
      case "Monthly":
        GetMonthlyStationChart(stationNameforChart);
        break;
      case "Yearly":
        GetYearlyStationChart(stationNameforChart);
        break;
      case "Yearly1":
        GetYearlyNewLineChart(stationNameforChart);
        break;
      case "Monthly1":
        GetMonthlyNewLineChart(stationNameforChart);
        break;
      case "AQI1":
        LoadAQIChart();
        break;
      case "PM10":
        LoadPM10Chart();
        break;
      case "SO2":
        LoadSO2Chart();
        break;
      case "CO":
        LoadCOChart();
        break;
      case "O3":
        LoadO3Chart();
        break;
      case "NO2":
        LoadNO2Chart();
        break;
      default:
        // Handle unknown chart types if needed
        break;
    }
  };
}

$("#hourly").click(createChartButtonClickHandler("Hourly"));
$("#Daily").click(createChartButtonClickHandler("Daily"));
$("#Weekly").click(createChartButtonClickHandler("Weekly"));
$("#Monthly").click(createChartButtonClickHandler("Monthly"));
$("#Yearly").click(createChartButtonClickHandler("Yearly"));
$("#AQI1").click(createChartButtonClickHandler("AQI1"));
$("#PM10").click(createChartButtonClickHandler("PM10"));
$("#SO2").click(createChartButtonClickHandler("SO2"));
$("#CO").click(createChartButtonClickHandler("CO"));
$("#03").click(createChartButtonClickHandler("O3"));
$("#NO2").click(createChartButtonClickHandler("NO2"));
$("#NO2").click(createChartButtonClickHandler("NO2"));
$("#Monthly1").click(createChartButtonClickHandler("Monthly1"));
$("#Yearly1").click(createChartButtonClickHandler("Yearly1"));


$("#myTabs").insertBefore(".bar_section .legend");
$(function () {
  $('#myTabs .nav-item .nav-link').click(function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
    } else {
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
// Banner Arrrow animation script End-------------- 

// Carousel Insight Section by Sachin-------------------
document.addEventListener('DOMContentLoaded', function () {
  var carousel = new bootstrap.Carousel(document.getElementById('carouselExampleControls'));
  var totalItems = 4;
  var currentIndex = 0;
  document.querySelector('.carousel-control-prev').setAttribute('disabled', true);

  document.getElementById('carouselExampleControls').addEventListener('slide.bs.carousel', function (event) {
    currentIndex = event.to;
    if (currentIndex === 0) {
      document.querySelector('.carousel-control-prev').setAttribute('disabled', true);
    } else {
      document.querySelector('.carousel-control-prev').removeAttribute('disabled');
    }
    if (currentIndex === totalItems - 1) {
      document.querySelector('.carousel-control-next').setAttribute('disabled', true);
    } else {
      document.querySelector('.carousel-control-next').removeAttribute('disabled');
    }
  });
  document.querySelector('.carousel-control-next').addEventListener('click', function () {
    if (currentIndex === totalItems - 2) {
      document.querySelector('.carousel-control-prev').removeAttribute('disabled');
    }
  });
});
// End Carousel Insight Section by Sachin-------------------

// Attach click event to the <i> element
$('#sortIcon').on('click', function () {
  sortingOrder = sortingOrder === 'asc' ? 'desc' : 'asc'; // Toggle sorting order
  populateSort(liveCityData, sortingOrder);

  // Toggle sorting icon class
  var sortIcon = $('#sortIcon');
  sortIcon.toggleClass('icon-sort5-asc', sortingOrder === 'asc');
  sortIcon.toggleClass('icon-sort5-des', sortingOrder === 'desc');
});

function populateSort(stationData, sortingOrder) {
  var stationRankingListDiv = $('#stationRankingList');
  // Clear existing rows
  stationRankingListDiv.empty();

  // Sort the data based on station ID
  stationData.sort(function (a, b) {
    var aqiA = a.aqi;
    var aqiB = b.aqi;
    if (sortingOrder === 'asc') {
      return aqiA - aqiB;
    } else {
      return aqiB - aqiA;
    }
  });

  liveCityData = stationData;

  $.each(liveCityData, function (index, station) {
    var colorClass = getColorClassForAqi(station.aqi);
    var stationDetails = stationsWithLocations.find(x => x.stationId == station.stationName);
    var row = `<label class="list-group-item">
                  <span class="numbers number">
                    <strong>`+ station.rank + `</strong>
                  </span>
                  <div class="list-content">
                    <div class="inner_list-content">
                      <p>`+ station.stationName + `</p>
                      <span>AQI `+ station.aqi + `</span>
                    </div>
                    <div class="dis-content">
                      <span>~ `+ station.wind + ` km</span>
                    </div>
                  </div>
                  <input type="radio" name="options" id="option`+ station.rank + `" value="` + stationDetails.stationId + `" autocomplete="off" class="float-end" onClick="selectedStation('` + stationDetails.stationId + `')">
                </label>`;

    stationRankingListDiv.append(row);
  });
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(function success(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    currentStationDetails = findNearestStation(latitude, longitude);
    if (currentStationDetails) {
      loadStationData(currentStationDetails.stationId, currentStationDetails.stationName);
    }
  }, function error() {
    currentStationDetails = stationsWithLocations.find(x => x.stationId == "");
    loadStationData(currentStationDetails.stationId, currentStationDetails.stationName);
  }, options);
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

function getAqiStatus(value) {
  if (value >= 0 && value <= 50) {
    return statusClass.Good;
  } else if (value >= 51 && value <= 100) {
    return statusClass.Moderate;
  } else if (value >= 101 && value <= 150) {
    return statusClass.UnHealthlySensitiveGroups;
  } else if (value >= 151 && value <= 200) {
    return statusClass.UnHealthly;
  } else if (value >= 201 && value <= 300) {
    return statusClass.VeryUnHealthly;
  } else {
    return statusClass.Hazardous;
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

function loadStationData() {
  const apiUrl = 'https://adairqualityapi.ead.ae/GetAirQualityStation?input=' + currentStationDetails.stationId;
  var data = $("#datafield").val();
  // var category = $.parseJSON(data);
  $.ajax({
    url: apiUrl,
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      const selectedStationObj = {
        averageAQI: data.averageAQI,
        pollutantName: data.pollutantName,
        pollutantValue: data.pollutantValue,
        stationsList: data.stationsList
      };
      const aqi = Math.round(selectedStationObj.averageAQI);
      var aqiColorClass = getColorClassForAqi(aqi);
      $("#averageAqi, #airQualitySafetyLevelAqi, #insightsAqi").text(aqi).css('color', colorCodes[aqiColorClass]);
      $("#averageAqiStatus, #airQualitySafetyLevelAqiStatus, #insightsAqiStatus").text(getAqiStatus(aqi)).css('color', colorCodes[aqiColorClass]);
      $("#aqiNearestStation, #insightNearestStation").text('Nearest Station: ' + currentStationDetails.stationName);
      $("#airQualitySafetyLevelStation").text('Station: ' + currentStationDetails.stationName);
      $("#yearlyAirQualityOverview").text(currentStationDetails.stationName + ' Yearly Air Quality Overview for ' + new Date().getFullYear());
      var mainPollutantNameContent;
      switch (selectedStationObj.pollutantName) {
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
      var pollutantColorClass = getColorClassForAqi(selectedStationObj.pollutantValue);
      $("#mainPollutantName, #mainPollutantValue").empty();
      $("#mainPollutantName").append(mainPollutantNameContent).css('background-color', colorCodes[pollutantColorClass]);
      $("#mainPollutantValue").append(selectedStationObj.pollutantValue + `ug/m<sup>3</sup>`).css('color', colorCodes[pollutantColorClass]);
      $('.page-loader').fadeOut('slow');
      getYearlyStationPollutantsThreshold();
      getAirAnalytics($("#selectedyear").text());
      getLiveCityRankingApi();
      getYearlyStationChartApi();
      getAirQualitySafetyLevel();
      airQualityIndexBarChartApi();
    },
    error: handleApiError
  });
  // LoadProgressBar(inputParam)
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
  return weekDays[dateValue.getDay()] + ' ' + (day > 10 ? day : '0' + day) + '/' + (month > 10 ? month : '0' + month) + '/' + dateValue.getFullYear().toString().substring(-2) + ', ' + (hours = hours ? hours : 12) + ' ' + hoursFormat;
}

function getYearlyStationPollutantsThreshold() {
  $.ajax({
    url: 'https://adairqualityapi.ead.ae/GetYearlyStationPollutantsThreshold?input=' + currentStationDetails.stationId,
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      var stationData = data.find(x => x.stationName == currentStationDetails.stationId);
      $("#numberOfHoursExceedsThresholdCO").text(stationData.co);
      $("#numberOfHoursExceedsThresholdSO2").text(stationData.sO2);
      $("#numberOfHoursExceedsThresholdPM10").text(stationData.pM10);
      $("#numberOfHoursExceedsThresholdNO2").text(stationData.nO2);
      $("#numberOfHoursExceedsThresholdO3").text(stationData.o3);
    },
    error: handleApiError
  });
}

function onClickYearOfAirAnalytics(year) {
  getAirAnalytics(year);
}

function getAirAnalytics(year) {
  const apiUrl = 'https://adairqualityapi.ead.ae/GetAirAnalytics?year=' + year + '&stationName=' + currentStationDetails.stationId;
  $.ajax({
    url: apiUrl,
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      labelsData = [];
      pollutantLevels = [];
      colorCodesForYearlyStationChartData = [];
      data.filter(t => t.stationName == currentStationDetails.stationId).forEach(item => {
        labelsData.push(item.month);
        pollutantLevels.push(item.aqi);
        colorCodesForYearlyStationChartData.push(item.colorCode);
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
      myRadarChart.data = createRadarData();
      myRadarChart.update();
      // Print the resulting object for EAD_AlMaqta
    },
    error: handleApiError
  });
}

function createRadarData() {
  return {
    labels: labelsData,
    fill: false,
    datasets: [{
      label: '',
      //borderColor: 'rgba(250, 207, 57, 1)',
      //pointBackgroundColor: getColors(pollutantLevels),
      backgroundColor: function (context) {
        return createRadialGradient3(context);
      },
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
  var gradientStop = colorCodesForYearlyStationChartData.length / 12 * 0.1;
  var colorGradient = 0
  colorCodesForYearlyStationChartData.forEach(item => {
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

function getLiveCityRankingApi() {
  if (liveCityData.length == 0) {
    $.ajax({
      url: "https://adairqualityapi.ead.ae/GetStationRanking",
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        liveCityData = data;
        bindLiveCityRanking();
      },
      error: handleApiError
    });
  } else {
    bindLiveCityRanking();
  }
}

function bindLiveCityRanking() {
  // Clear existing rows
  var stationRankingListDiv = $('#stationRankingList');
  stationRankingListDiv.empty();
  // Sort the data based on station ID
  liveCityData.sort(function (a, b) {
    return a.stationID - b.stationID;
  });
  $.each(liveCityData, function (index, station) {
    var colorClass = getColorClassForAqi(station.aqi);
    var stationDetails = stationsWithLocations.find(x => x.stationId == station.stationName);
    if (stationDetails) {
      station.distance = Math.round(calculateDistance(currentStationDetails.latitude, currentStationDetails.longitude, stationDetails.latitude, stationDetails.longitude));
      var row = `<label class="list-group-item">
                    <span class="numbers number">
                      <strong>`+ station.rank + `</strong>
                    </span>
                    <div class="list-content">
                      <div class="inner_list-content">
                        <p>`+ station.stationName + `</p>
                        <span>AQI `+ station.aqi + `</span>
                      </div>
                      <div class="dis-content">
                        <span>~ `+ station.distance + ` km</span>
                      </div>
                    </div>
                    <input type="radio" name="options" id="`+ stationDetails.stationId + `" value="` + stationDetails.stationId + `" autocomplete="off" class="float-end" onClick="selectedStation('` + stationDetails.stationId + `', '` + stationDetails.stationName + `')">
                  </label>`;
      stationRankingListDiv.append(row);
    }
  });
}

function getYearlyStationChartApi() {
  $.ajax({
    url: 'https://adairqualityapi.ead.ae/GetYearlyStationChart?stationName=' + currentStationDetails.stationId,
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      yearlyStationChartData = data;
      bindYearlyStationChart();
    },
    error: handleApiError
  });
}

function bindYearlyStationChart() {
  yearlyStationChartData.filter(t => t.stationName == currentStationDetails.stationId).forEach(item => {
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
  seriesData.push({ name: 'PM10', data: pm10Data });
  seriesData.push({ name: 'SO2', data: so2Data });
  seriesData.push({ name: 'CO', data: coData });
  seriesData.push({ name: 'O3', data: o3Data });
  seriesData.push({ name: 'NO2', data: no2Data });

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
      width: [3, 3, 3, 3, 3, 3],
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
}

function selectedStation(stationId, stationName) {
  currentStationDetails = stationsWithLocations.find(x => x.stationId == stationId);
  loadStationData(stationId, stationName);
}

function getAirQualitySafetyLevel() {
  $.ajax({
    url: 'https://adairqualityapi.ead.ae/GetDailyCountsAirQualityStation?input=' + currentStationDetails.stationId,
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      var aqiStatusDiv = $("#aqiStatusDiv");
      aqiStatusDiv.empty();
      aqiStatusDiv.append(airQualitySafetyLevelDivElements(data.averageGoodAQICount, statusClass.Good, colorClass.GoodColorClass));
      aqiStatusDiv.append(airQualitySafetyLevelDivElements(data.averageModerateAQICount, statusClass.Moderate, colorClass.ModrateColorClass));
      aqiStatusDiv.append(airQualitySafetyLevelDivElements(data.averageUnHealthlySensitiveGroupsAQICount, statusClass.UnHealthlySensitiveGroups, colorClass.Unhealthy4peopleColorClass));
      aqiStatusDiv.append(airQualitySafetyLevelDivElements(data.averageUnHealthlyAQICount, statusClass.UnHealthly, colorClass.UnhealthyColorClass));
      aqiStatusDiv.append(airQualitySafetyLevelDivElements(data.averageVeryUnHealthlyAQICount, statusClass.VeryUnHealthly, colorClass.VeryUnhealthyColorClass));
      aqiStatusDiv.append(airQualitySafetyLevelDivElements(data.averageHazardousAQICount, statusClass.Hazardous, colorClass.HazardousClass));
    },
    error: handleApiError
  });
}

function airQualitySafetyLevelDivElements(aqiValue, aqiStatus, aqiColorStatus) {
  return `<div class="list-item ` + aqiColorStatus + `">
            <p>` + aqiValue + `</p>
            <span>` + aqiStatus + `</span>
          </div>`;
}

function airQualityIndexBarChartApi() {
  $.ajax({
    url: 'https://adairqualityapi.ead.ae/GetHourlyStationChart?stationName=' + currentStationDetails.stationId,
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      var hourlyAqiBarDataSeries = [];
      var categoriesData = [];
      var hourlyAqiLineData = [];
      data.filter(t => t.stationName == currentStationDetails.stationId).forEach(item => {
        if (hourlyAqiBarDataSeries.length) {
          hourlyAqiBarDataSeries[0].data.push(item.aqi);
        } else {
          hourlyAqiBarDataSeries.push({ name: item.aqiIndex, data: [item.aqi] });
        }
        hourlyAqiLineData.push(item.aqi);
        var parts = item.hour.split(' ');
        categoriesData.push(parts);
      });
      $("#ADstationAqiBarGraph").empty();
      var barChartOptions = {
        series: hourlyAqiBarDataSeries,
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
          function ({ value, seriesIndex, w }) {
            return colorCodes[getColorClassForAqi(value)];
          }
        ],
        tooltip: {
          enabled: true,
          x: {
            show: false,
          },
          y: {
            formatter: function (val) {
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
      var barChart = new ApexCharts(document.querySelector("#ADstationAqiBarGraph"), barChartOptions);
      barChart.render();
      aqiLineChart.updateSeries(
        [{
          name: 'AQI',
          data: hourlyAqiLineData
        }],);
      aqiLineChart.updateOptions({
        xaxis: {
          categories: categoriesData,
        }
      });
    },
    error: handleApiError
  });
}