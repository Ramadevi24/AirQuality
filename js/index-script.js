var currentStationDetails;
var liveCityData = [];
var labelsData = [];
var pollutantLevels = [];
var colorCodesForAirAnalytics = [];
var sortingOrder = 'asc'; // Initial sorting order
var chartData = [];
var aqiLineChart;
var pollutantLineChart;
var activePollutant;

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

const chartFilter = {
  Hourly: 'Hourly',
  Daily: 'Daily',
  Monthly: 'Monthly',
  Yearly: 'Yearly',
}

const pollutantNames = {
  AQI: "AQI",
  PM10: "PM10",
  SO2: "SO2",
  CO: "CO",
  O3: "O3",
  NO2: "NO2"
}

const pollutantThresholdLimits = {
  PM10Hourly: 100,
  PM10Daily: 150,
  PM10Monthly: 100,
  PM10Yearly: 150,
  SO2Hourly: 350,
  SO2Daily: 150,
  SO2Monthly: 100,
  SO2Yearly: 60,
  COHourly: 30,
  CODaily: 8,
  COMonthly: 15,
  COYearly: 5,
  O3Hourly: 200,
  O3Daily: 120,
  O3Monthly: 100,
  O3Yearly: 150,
  NO2Hourly: 400,
  NO2Daily: 100,
  NO2Monthly: 100,
  NO2Yearly: 150,
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
  },
  maintainAspectRatio: false, // Disable aspect ratio maintenance
  animation: {
    duration: 2000, // Animation duration in milliseconds
  },
};

var aqiLineChartOptions = {
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
    tickAmount: 10,
    // labels: {
    //   format: function(value, opts) {
    //     console.log(value);
    //     console.log(opts);
    //     // return opts.dateFormatter(new Date(timestamp), 'MMM')
    //   }
    // }
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

var pollutantLineChartOptions = {
  series: [],
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
    categories: [],
    // tickAmount: 10,
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
    // max: 100
  },
  responsive: [
    {
      // breakpoint: 1350,
      options: {
        chart: {
          height: 250
        }
      },
      // breakpoint: 1400,
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

function initializeDropdown(dropdownMenu) {
  if (dropdownMenu.id = "stationsDropdownMap") {
    //Added these 4 lines in this method to add search textbox in the stations dropdown -- prasanna
    var inputTextBox = document.createElement('input');
    inputTextBox.setAttribute('id', dropdownMenu.id + "Search");
    inputTextBox.setAttribute('onkeyup', "selectedCity(" + dropdownMenu.id + "," + dropdownMenu.id + "Search" + ")");
    dropdownMenu.appendChild(inputTextBox);
    // end changes
  }
  var defaultListItem = document.createElement('li');
  var defaultLink = document.createElement('a');
  defaultLink.className = 'dropdown-item abudhabiitem';
  defaultLink.href = 'javascript:void(0);';
  defaultLink.textContent = $('#abudhabi').val();
  defaultListItem.appendChild(defaultLink);
  dropdownMenu.appendChild(defaultListItem);
}

function toggleDiv(tabId, pollutant) {
  document.querySelectorAll('.tab-content.mt-0').forEach(function (div) {
    div.style.display = 'none';
  });
  document.getElementById(tabId).style.display = 'block';
  activePollutant = pollutant;
  bindStationDataToBarChart($("#barChartFilter").text());
}

// Map Search icon script Start--------------   
$(".dropdown-change li a").click(function () {
  var selText = $(this).text();
  $(this).parents('.btn-group').find('.dropdown-toggle').html(selText);
});

// $("#myTabs").insertBefore(".bar_section .legend");

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
$('.sortIcon').on('click', function () {
  sortingOrder = sortingOrder === 'asc' ? 'desc' : 'asc'; // Toggle sorting order
  populateSort(sortingOrder);

  // Toggle sorting icon class
  var sortIcon = $('#sortIcon');
  sortIcon.toggleClass('icon-sort5-asc', sortingOrder === 'asc');
  sortIcon.toggleClass('icon-sort5-des', sortingOrder === 'desc');
});

function populateSort(sortingOrder) {
  if (liveCityData.length > 0) {
    var stationRankingListDiv = $('#stationRankingList');
    // Clear existing rows
    stationRankingListDiv.empty();

    // Sort the data based on station ID
    liveCityData.sort(function (a, b) {
      var aqiA = a.aqi;
      var aqiB = b.aqi;
      if (sortingOrder === 'asc') {
        return aqiA - aqiB;
      } else {
        return aqiB - aqiA;
      }
    });

    $.each(liveCityData, function (index, station) {
      var colorClass = getColorClassForAqi(station.aqi);
      var stationDetails = stationsWithLocations.find(x => x.stationId == station.stationName);
      if (stationDetails) {
        station.rank = index + 1;
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
                  <input type="radio" name="options" id="option`+ station.rank + `" value="` + stationDetails.stationId + `" autocomplete="off" class="float-end" onClick="selectedStation('` + stationDetails.stationId + `')">
                </label>`;
        stationRankingListDiv.append(row);
      }
    });
    if (currentStationDetails.stationId) {
      $("#" + currentStationDetails.stationId).attr('checked', 'checked');
    }
  }
}

let width = carousel.offsetWidth;
window.addEventListener("resize", e => (width = carousel.offsetWidth));

$(document).ready(function () {
  aqiLineChart = new ApexCharts(document.querySelector("#aqiLineChart"), aqiLineChartOptions);
  pollutantLineChart = new ApexCharts(document.querySelector("#pollutantLineChart"), pollutantLineChartOptions);
  aqiLineChart.render();
  pollutantLineChart.render();
  activePollutant = pollutantNames.AQI;
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

  $('#myTabs .nav-item .nav-link').click(function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
    } else {
      $('#myTabs .nav-item .nav-link').removeClass("active");
      $(this).addClass("active");
    }
  });

  $(".lineChartAqiFilterClass").on('click', function () {
    $("#lineChartPollutantFilter").text(this.innerText);
    updateBarChartFilter(this.innerText);
    getStationChartApi(this.innerText);
    $("#lineChartAqiValueStatus, #lineChartPollutantValueStatus, #lineChartAqiSo2Value, #lineChartAqiNo2Value, #lineChartAqiCoValue, #lineChartAqiPm10Value, #lineChartAqiO3Value").text('');
  });

  $(".lineChartPollutantFilterClass").on('click', function () {
    $("#lineChartAqiFilter").text(this.innerText);
    updateBarChartFilter(this.innerText);
    getStationChartApi(this.innerText);
    $("#lineChartAqiValueStatus, #lineChartPollutantValueStatus, #lineChartAqiSo2Value, #lineChartAqiNo2Value, #lineChartAqiCoValue, #lineChartAqiPm10Value, #lineChartAqiO3Value").text('');
  });

  $(".barChartFilterClass").on('click', function () {
    updateBarChartFilter(this.innerText);
    $("#lineChartPollutantFilter, #lineChartAqiFilter").text(this.innerText);
    getStationChartApi(this.innerText);
  });
});

function updateBarChartFilter(filter) {
  $("button#barChartFilter").each(function (index, item) {
    item.innerText = filter;
  });
}

// Project Section modal End--------------

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(function success(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    currentStationDetails = findNearestStation(latitude, longitude);
    if (currentStationDetails) {
      loadStationData();
    }
  }, function error() {
    currentStationDetails = stationsWithLocations.find(x => x.stationId == "");
    loadStationData();
  });
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

function getAqiStatusAndColorCode(value) {
  if (value >= 0 && value <= 50) {
    return {
      status: statusClass.Good,
      color: colorCodes.green
    };
  } else if (value >= 51 && value <= 100) {
    return {
      status: statusClass.Moderate,
      color: colorCodes.lightorange
    };
  } else if (value >= 101 && value <= 150) {
    return {
      status: statusClass.UnHealthlySensitiveGroups,
      color: colorCodes.darkorange
    };
  } else if (value >= 151 && value <= 200) {
    return {
      status: statusClass.UnHealthly,
      color: colorCodes.peach
    };
  } else if (value >= 201 && value <= 300) {
    return {
      status: statusClass.VeryUnHealthly,
      color: colorCodes.purple
    };
  } else {
    return {
      status: statusClass.Hazardous,
      color: colorCodes.hazar
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
      var aqiStatusAndColor = getAqiStatusAndColorCode(aqi);
      $("#lineChartAqiValueStatus, #lineChartPollutantValueStatus").text(aqi + ' ' + aqiStatusAndColor.status).css('color', aqiStatusAndColor.color);
      $("#averageAqi, #airQualitySafetyLevelAqi, #insightsAqi").text(aqi).css('color', aqiStatusAndColor.color);
      $("#averageAqiStatus, #airQualitySafetyLevelAqiStatus, #insightsAqiStatus").text(aqiStatusAndColor.status).css('color', aqiStatusAndColor.color);
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
      getAirQualitySafetyLevel();
      getStationChartApi($('#lineChartPollutantFilter').text());
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
      colorCodesForAirAnalytics = [];
      data.filter(t => t.stationName == currentStationDetails.stationId).forEach(item => {
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
  if (currentStationDetails.stationId) {
    $("#" + currentStationDetails.stationId).attr('checked', 'checked');
  }
}

function selectedStation(stationId) {
  currentStationDetails = stationsWithLocations.find(x => x.stationId == stationId);
  loadStationData();
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

function getStationChartApi(filter) {
  var url;
  switch (filter) {
    case chartFilter.Daily:
      url = 'https://adairqualityapi.ead.ae/GetDailyStationChart?stationName=' + currentStationDetails.stationId;
      break;
    case chartFilter.Monthly:
      url = 'https://adairqualityapi.ead.ae/GetMonthlyStationChart?stationName=' + currentStationDetails.stationId;
      break;
    case chartFilter.Yearly:
      url = 'https://adairqualityapi.ead.ae/GetYearlyStationChart?stationName=' + currentStationDetails.stationId;
      break;
    default:
      url = 'https://adairqualityapi.ead.ae/GetHourlyStationChart?stationName=' + currentStationDetails.stationId;
      break;
  }
  $.ajax({
    url: url,
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      chartData = data.filter(t => t.stationName == currentStationDetails.stationId);
      bindStationDataToBarChart(filter);
      bindStationDataToLineChart(filter);
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
  var categoriesData;
  switch (filter) {
    case "Daily":
      categoriesData = chartData.map(t => { return t.day.split(' '); });
      break;
    case "Monthly":
      categoriesData = chartData.map(t => { return t.month; });
      break;
    case "Yearly":
      categoriesData = chartData.map(t => { return t.year; });
      break;
    default:
      categoriesData = chartData.map(t => { return t.hour.split(' '); });
      break;
  }
  aqiLineChart.updateOptions({
    series: [{
      name: 'AQI',
      data: aqiData
    }],
    xaxis: {
      categories: categoriesData,
      tickAmount: 10,
    }
  });
  pollutantLineChart.updateOptions({
    series: [{
      name: 'PM10',
      data: pm10Data
    },
    {
      name: 'SO2',
      data: so2Data
    },
    {
      name: 'CO',
      data: coData
    },
    {
      name: 'O3',
      data: o3Data
    },
    {
      name: 'NO2',
      data: no2Data
    }],
    xaxis: {
      categories: categoriesData,
      tickAmount: 10,
    }
  });
}

function bindStationDataToBarChart(filter) {
  var barChartData = [];
  var thresholdData = [];
  var categoriesData = [];
  var backgroundColors = [];
  var pollutantBarChartId;
  var barChartDataSet = [];
  switch (activePollutant) {
    case pollutantNames.PM10:
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
          break;
        case "Monthly":
          chartData.forEach(item => {
            if (item.pM10 > pollutantThresholdLimits.PM10Monthly) {
              barChartData.push(item.pM10 - pollutantThresholdLimits.PM10Monthly);
              thresholdData.push(pollutantThresholdLimits.PM10Monthly);
            } else {
              barChartData.push(0);
              thresholdData.push(item.pM10);
            }
            categoriesData.push(item.month);
          });
          break;
        case "Yearly":
          chartData.forEach(item => {
            if (item.pM10 > pollutantThresholdLimits.PM10Yearly) {
              barChartData.push(item.pM10 - pollutantThresholdLimits.PM10Yearly);
              thresholdData.push(pollutantThresholdLimits.PM10Yearly);
            } else {
              barChartData.push(0);
              thresholdData.push(item.pM10);
            }
            categoriesData.push(item.year);
          });
          break;
        default:
          chartData.forEach(item => {
            if (item.pM10 > pollutantThresholdLimits.PM10Hourly) {
              barChartData.push(item.pM10 - pollutantThresholdLimits.PM10Hourly);
              thresholdData.push(pollutantThresholdLimits.PM10Hourly);
            } else {
              barChartData.push(0);
              thresholdData.push(item.pM10);
            }
            categoriesData.push(item.hour.split(' '));
          });
          break;
      }
      barChartDataSet = [{
        label: '',
        backgroundColor: '#004B87',
        lineTension: 0.2,
        data: thresholdData,
      },
      {
        label: '',
        backgroundColor: '#F65E5F',
        lineTension: 0.2,
        data: barChartData,
      }];
      pollutantBarChartId = "ADstationPm10BarGraph";
      break;
    case pollutantNames.SO2:
      switch (filter) {
        case "Daily":
          chartData.forEach(item => {
            if (item.sO2 > pollutantThresholdLimits.SO2Daily) {
              barChartData.push(item.sO2 - pollutantThresholdLimits.SO2Daily);
              thresholdData.push(pollutantThresholdLimits.SO2Daily);
            } else {
              barChartData.push(0);
              thresholdData.push(item.sO2);
            }
            categoriesData.push(item.day.split(' '));
          });
          break;
        case "Monthly":
          chartData.forEach(item => {
            if (item.sO2 > pollutantThresholdLimits.SO2Monthly) {
              barChartData.push(item.sO2 - pollutantThresholdLimits.SO2Monthly);
              thresholdData.push(pollutantThresholdLimits.SO2Monthly);
            } else {
              barChartData.push(0);
              thresholdData.push(item.sO2);
            }
            categoriesData.push(item.month);
          });
          break;
        case "Yearly":
          chartData.forEach(item => {
            if (item.sO2 > pollutantThresholdLimits.SO2Yearly) {
              barChartData.push(item.sO2 - pollutantThresholdLimits.SO2Yearly);
              thresholdData.push(pollutantThresholdLimits.SO2Yearly);
            } else {
              barChartData.push(0);
              thresholdData.push(item.sO2);
            }
            categoriesData.push(item.year);
          });
          break;
        default:
          chartData.forEach(item => {
            if (item.sO2 > pollutantThresholdLimits.SO2Hourly) {
              barChartData.push(item.sO2 - pollutantThresholdLimits.SO2Hourly);
              thresholdData.push(pollutantThresholdLimits.SO2Hourly);
            } else {
              barChartData.push(0);
              thresholdData.push(item.sO2);
            }
            categoriesData.push(item.hour.split(' '));
          });
          break;
      }
      barChartDataSet = [{
        label: '',
        backgroundColor: '#004B87',
        lineTension: 0.2,
        data: thresholdData,
      },
      {
        label: '',
        backgroundColor: '#F65E5F',
        lineTension: 0.2,
        data: barChartData,
      }];
      pollutantBarChartId = "ADstationSo2BarGraph";
      break;
    case pollutantNames.CO:
      switch (filter) {
        case "Daily":
          chartData.forEach(item => {
            if (item.co > pollutantThresholdLimits.CODaily) {
              barChartData.push(item.co - pollutantThresholdLimits.CODaily);
              thresholdData.push(pollutantThresholdLimits.CODaily);
            } else {
              barChartData.push(0);
              thresholdData.push(item.co);
            }
            categoriesData.push(item.day.split(' '));
          });
          break;
        case "Monthly":
          chartData.forEach(item => {
            if (item.co > pollutantThresholdLimits.COMonthly) {
              barChartData.push(item.co - pollutantThresholdLimits.COMonthly);
              thresholdData.push(pollutantThresholdLimits.COMonthly);
            } else {
              barChartData.push(0);
              thresholdData.push(item.co);
            }
            categoriesData.push(item.month);
          });
          break;
        case "Yearly":
          chartData.forEach(item => {
            if (item.co > pollutantThresholdLimits.COYearly) {
              barChartData.push(item.co - pollutantThresholdLimits.COYearly);
              thresholdData.push(pollutantThresholdLimits.COYearly);
            } else {
              barChartData.push(0);
              thresholdData.push(item.co);
            }
            categoriesData.push(item.year);
          });
          break;
        default:
          chartData.forEach(item => {
            if (item.co > pollutantThresholdLimits.COHourly) {
              barChartData.push(item.co - pollutantThresholdLimits.COHourly);
              thresholdData.push(pollutantThresholdLimits.COHourly);
            } else {
              barChartData.push(0);
              thresholdData.push(item.co);
            }
            categoriesData.push(item.hour.split(' '));
          });
          break;
      }
      barChartDataSet = [{
        label: '',
        backgroundColor: '#004B87',
        lineTension: 0.2,
        data: thresholdData,
      },
      {
        label: '',
        backgroundColor: '#F65E5F',
        lineTension: 0.2,
        data: barChartData,
      }];
      pollutantBarChartId = "ADstationCoBarGraph";
      break;
    case pollutantNames.O3:
      switch (filter) {
        case "Daily":
          chartData.forEach(item => {
            if (item.o3 > pollutantThresholdLimits.O3Daily) {
              barChartData.push(item.o3 - pollutantThresholdLimits.O3Daily);
              thresholdData.push(pollutantThresholdLimits.O3Daily);
            } else {
              barChartData.push(0);
              thresholdData.push(item.o3);
            }
            categoriesData.push(item.day.split(' '));
          });
          break;
        case "Monthly":
          chartData.forEach(item => {
            if (item.o3 > pollutantThresholdLimits.O3Monthly) {
              barChartData.push(item.o3 - pollutantThresholdLimits.O3Monthly);
              thresholdData.push(pollutantThresholdLimits.O3Monthly);
            } else {
              barChartData.push(0);
              thresholdData.push(item.o3);
            }
            categoriesData.push(item.month);
          });
          break;
        case "Yearly":
          chartData.forEach(item => {
            if (item.o3 > pollutantThresholdLimits.O3Yearly) {
              barChartData.push(item.o3 - pollutantThresholdLimits.O3Yearly);
              thresholdData.push(pollutantThresholdLimits.O3Yearly);
            } else {
              barChartData.push(0);
              thresholdData.push(item.o3);
            }
            categoriesData.push(item.year);
          });
          break;
        default:
          chartData.forEach(item => {
            if (item.o3 > pollutantThresholdLimits.O3Hourly) {
              barChartData.push(item.o3 - pollutantThresholdLimits.O3Hourly);
              thresholdData.push(pollutantThresholdLimits.O3Hourly);
            } else {
              barChartData.push(0);
              thresholdData.push(item.o3);
            }
            categoriesData.push(item.hour.split(' '));
          });
          break;
      }
      barChartDataSet = [{
        label: '',
        backgroundColor: '#004B87',
        lineTension: 0.2,
        data: thresholdData,
      },
      {
        label: '',
        backgroundColor: '#F65E5F',
        lineTension: 0.2,
        data: barChartData,
      }];
      pollutantBarChartId = "ADstationO3BarGraph";
      break;
    case pollutantNames.NO2:
      switch (filter) {
        case "Daily":
          chartData.forEach(item => {
            if (item.nO2 > pollutantThresholdLimits.NO2Daily) {
              barChartData.push(item.nO2 - pollutantThresholdLimits.NO2Daily);
              thresholdData.push(pollutantThresholdLimits.NO2Daily);
            } else {
              barChartData.push(0);
              thresholdData.push(item.nO2);
            }
            categoriesData.push(item.day.split(' '));
          });
          break;
        case "Monthly":
          chartData.forEach(item => {
            if (item.nO2 > pollutantThresholdLimits.NO2Monthly) {
              barChartData.push(item.nO2 - pollutantThresholdLimits.NO2Monthly);
              thresholdData.push(pollutantThresholdLimits.NO2Monthly);
            } else {
              barChartData.push(0);
              thresholdData.push(item.nO2);
            }
            categoriesData.push(item.month);
          });
          break;
        case "Yearly":
          chartData.forEach(item => {
            if (item.nO2 > pollutantThresholdLimits.NO2Yearly) {
              barChartData.push(item.nO2 - pollutantThresholdLimits.NO2Yearly);
              thresholdData.push(pollutantThresholdLimits.NO2Yearly);
            } else {
              barChartData.push(0);
              thresholdData.push(item.nO2);
            }
            categoriesData.push(item.year);
          });
          break;
        default:
          chartData.forEach(item => {
            if (item.nO2 > pollutantThresholdLimits.NO2Hourly) {
              barChartData.push(item.nO2 - pollutantThresholdLimits.NO2Hourly);
              thresholdData.push(pollutantThresholdLimits.NO2Hourly);
            } else {
              barChartData.push(0);
              thresholdData.push(item.nO2);
            }
            categoriesData.push(item.hour.split(' '));
          });
          break;
      }
      barChartDataSet = [{
        label: '',
        backgroundColor: '#004B87',
        lineTension: 0.2,
        data: thresholdData,
      },
      {
        label: '',
        backgroundColor: '#F65E5F',
        lineTension: 0.2,
        data: barChartData,
      }];
      pollutantBarChartId = "ADstationNo2BarGraph";
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
            barChartData.push(item.aqi);
            categoriesData.push(item.hour.split(' '));
            backgroundColors.push(colorCodes[getColorClassForAqi(item.aqi)]);
          });
          break;
      }
      barChartDataSet = [{
        label: 'AQI',
        backgroundColor: backgroundColors,
        lineTension: 0.2,
        data: barChartData,
      }];
      pollutantBarChartId = "ADstationAqiBarGraph";
      break;
  }
  var chartStatus = Chart.getChart(pollutantBarChartId); // <canvas> id
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }
  var barChart = document.getElementById(pollutantBarChartId).getContext('2d');
  var constructBarChart = new Chart(barChart, {
    type: 'bar',
    data: {
      labels: categoriesData,
      fill: false,
      datasets: barChartDataSet
    },
    options: {
      plugins: {
        legend: {
          display: false // This hides the legend
        },
        title: {
          display: true,
          // text: 'Chart.js Bar Chart - Stacked'
        },
      },
      responsive: true,
      interaction: {
        intersect: false,
      },
      scales: {
        x: {
          grid: {
            display: false, // This will remove the Y-axis grid lines
            drawBorder: false, // Optional: if you also want to remove the axis border
          },
          stacked: true,
        },
        y: { // Corrected from 'yAxes' to 'y' for Chart.js version 3.x syntax
          stacked: true, // Assuming you want the Y-axis stacked as well
        }
      }
    }
  });
  constructBarChart.update();
}