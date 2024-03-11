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

var stationsWithLocations = [{
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
}];

const colorClass = {
  GoodColorClass: "text-good",
  ModrateColorClass: "text-moderate",
  Unhealthy4peopleColorClass: "text-unhealthy4people",
  UnhealthyColorClass: "text-unhealthy",
  VeryUnhealthyColorClass: "text-very-unhealthy",
  HazardousClass: "text-hazardous"
}

var stationNameforChart = "";

$(document).ready(function () {
  var stationId = getCurrentLocation();
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

function getCurrentLocation() {
  var stationId;
  navigator.geolocation.getCurrentPosition(function success(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var stationIndex = stationsWithLocations.findIndex(x => x.latitude == latitude && x.longitude == longitude);
    if (stationIndex > -1) {
      stationId = stationsWithLocations[stationIndex].stationId;
      LoadStationData(stationId);
    } else {
      stationId = "";
      LoadStationData("");
    }
  }, function error() {
    stationId = "";
    LoadStationData("");
  }, options);
  return stationId;
}

function LoadStationData(inputParam) {
  const apiUrl = 'https://adairqualityapi.ead.ae/GetAirQualityStation?input=' + inputParam;
  stationNameforChart = inputParam;
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
        stationsList: data.stationsList,
        pollutantName: data.pollutantName
      };

      const aqi = Math.round(selectedStationObj.averageAQI);
      $("#averageAqi").text(aqi);
      var averageAqiStatus = $("#averageAqiStatus");
      if (aqi >= 0 && aqi <= 50) {
        averageAqiStatus.text('Good');
      } else if (aqi >= 51 && aqi <= 100) {
        averageAqiStatus.text('Moderate');
      } else if (aqi >= 101 && aqi <= 150) {
        averageAqiStatus.text('UnHealthly Sensitive Groups');
      } else if (aqi >= 151 && aqi <= 200) {
        averageAqiStatus.text('UnHealthly');
      } else if (aqi >= 201 && aqi <= 300) {
        averageAqiStatus.text('Very UnHealthly');
      } else {
        averageAqiStatus.text('Hazardous');
      }
      $('.page-loader').fadeOut('slow');
      getYearlyStationPollutantsThreshold(inputParam);
      getAirAnalytics($("#selectedyear").text(), inputParam);
      PopulateLiveCityRanking();
      getYearlyStationChartApi();
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

function getYearlyStationPollutantsThreshold(inputParam) {
  $.ajax({
    url: 'https://adairqualityapi.ead.ae/GetYearlyStationPollutantsThreshold?input=' + inputParam,
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      var stationData = data.find(x => x.stationName == (inputParam ? inputParam : 'Abu Dhabi'));
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
  getAirAnalytics(year, stationNameforChart);
}

var labelsData = [];
var pollutantLevels = [];
var colorCodes = [];

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

var radarCtx = document.getElementById('radarChart').getContext('2d');
var myRadarChart = new Chart(radarCtx, {
  type: 'radar',
  data: createRadarData(),
  options: radarOptions,
});

function getAirAnalytics(year, stationName) {
  if (!stationName) {
    stationName = "";
  }
  const apiUrl = 'https://adairqualityapi.ead.ae/GetAirAnalytics?year=' + year + '&stationName=' + stationName;
  $.ajax({
    url: apiUrl,
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      labelsData = [];
      pollutantLevels = [];
      colorCodes = [];
      data.filter(t => t.stationName == (stationName ? stationName : 'Abu Dhabi')).forEach(item => {
        labelsData.push(item.month);
        pollutantLevels.push(item.aqi);
        colorCodes.push(item.colorCode);
      });
      //console.log(colorCodes);
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
  var gradientStop = colorCodes.length / 12 * 0.1;
  var colorGradient = 0
  colorCodes.forEach(item => {
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

var liveCityData;
function PopulateLiveCityRanking() {
  const apiUrl = "https://adairqualityapi.ead.ae/GetStationRanking";
  $.ajax({
    url: apiUrl,
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      liveCityData = data;
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
                              <span>~ `+ 10 + ` km</span>
                            </div>
                          </div>
                          <input type="radio" name="options" id="option`+ station.rank + `" autocomplete="off" class="float-end" onClick="selectedStation('` + (stationDetails ? stationDetails.stationId : "") + `')">
                        </label>`;

        stationRankingListDiv.append(row);
      });
    },
    error: handleApiError
  });
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

var sortingOrder = 'asc'; // Initial sorting order

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
                  <input type="radio" name="options" id="option`+ station.rank + `" value="` + (stationDetails ? stationDetails.stationId : "") + `" autocomplete="off" class="float-end" onClick="selectedStation('` + station.rank +`')">
                </label>`;

    stationRankingListDiv.append(row);
  });
}

var seriesData = [];
// var aqiData = [];
var pm10Data = [];
var so2Data = [];
var coData = [];
var o3Data = [];
var no2Data = [];
var xCategories = [];
var yearlyStationChartData = [];

function getYearlyStationChartApi(stationName){
  const apiUrl = 'https://adairqualityapi.ead.ae/GetYearlyStationChart?stationName=' + (stationName ? stationName : "");
  $.ajax({
    url: apiUrl,
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      stationName = stationName ? stationName : "Abu Dhabi";
      yearlyStationChartData = data;
      getYearlyStationChart(stationName);
    },
    error: handleApiError
  });
}

function getYearlyStationChart(stationName) {
  yearlyStationChartData.filter(t => t.stationName == stationName).forEach(item => {
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

function selectedStation(stationName){
  getYearlyStationChart(stationName);
  getAirAnalytics($("#selectedyear").text(), stationName);
}