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

var stationNameforChart = "";
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
      var stationData = data.find(x=> x.stationName == (inputParam ? inputParam : 'Abu Dhabi'));
      $("#numberOfHoursExceedsThresholdCO").text(stationData.co);
      $("#numberOfHoursExceedsThresholdSO2").text(stationData.sO2);
      $("#numberOfHoursExceedsThresholdPM10").text(stationData.pM10);
      $("#numberOfHoursExceedsThresholdNO2").text(stationData.nO2);
      $("#numberOfHoursExceedsThresholdO3").text(stationData.o3);
    },
    error: handleApiError
  });
}