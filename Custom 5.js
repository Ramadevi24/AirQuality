const colorData = {
    GoodColor: "#9CD84E",
    ModrateColor: "#FACF39",
    Unhealthy4peopleColor: "#F99049",
    UnhealthyColor: "#F65E5F",
    VeryUnhealthyColor: "#A070B6",
    Hazardous: "#A06A7B"
};

const iconclass = {
    GoodIconClass: "icon-good",
    ModrateIconClass: "icon-moderate",
    Unhealthy4peopleIconClass: "icon-unhealthy4people",
    UnhealthyIconClass: "icon-unhealthy",
    VeryUnhealthyIconClass: "icon-face-mask-emoji",
    HazardousIconClass: "icon-gas-mask-emoji"
}

const colorClass = {
    GoodColorClass: "text-good",
    ModrateColorClass: "text-moderate",
    Unhealthy4peopleColorClass: "text-unhealthy4people",
    UnhealthyColorClass: "text-unhealthy",
    VeryUnhealthyColorClass: "text-very-unhealthy",
    HazardousClass: "text-hazardous"
}

var stationsNames =
{
    "EAD_HamdanStreet": "Hamdan Street",
    "EAD_KhadijaSchool": "Khadejah School",
    "EAD_KhalifaSchool": "Khalifa School",
    "EAD_Mussafah": "Mussafah",
    "EAD_Baniyas": "Baniyas School",
    "EAD_AlAinSchool": "Al Ain Islamic Institute",
    "EAD_AlAinStreet": "Al Ain Street",
    "EAD_BidaZayed": "Bida Zayed",
    "EAD_Gayathi": "Gayathi School",
    "EAD_Liwa": "Liwa",
    "EAD_RuwaisTransco": "Ruwais",
    "EAD_Habshan": "Habshan Air Quality Monitoring Station",
    "EAD_AlMaqta": "Al Maqtaa",
    "EAD_KhalifaCity": "Khalifa City A",
    "EAD_AlMafraq": "Al Mafraq",
    "EAD_Sweihan": "Sweihan",
    "EAD_AlTawia": "Al Tawia",
    "EAD_Zakher": "Zakher",
    "EAD_AlQuaa": "Al Quaa",
    "EAD_E11Road": "E11 Road",
    "EAD_AlMaqta": "Bain Al Jessrain",
    "EAD_Sweihan": "Sweihan Air Quality Monitoring Station",
    "EAD_Zakher": "Zakher Air Quality Monitoring Station"
}

var stationsWithLocations = [{
    stationId: "EAD_HamdanStreet",
    stationName: "Hamdan Street",
    latitude: 24.4889,
    longitude: 54.3637
},{
    stationId: "EAD_KhadijaSchool",
    stationName: "Khadejah School",
    latitude: 24.4816,
    longitude: 54.3693
},{
    stationId: "EAD_KhalifaSchool",
    stationName: "Khalifa School",
    latitude: 24.4301,
    longitude: 54.4084
},{
    stationId: "EAD_Mussafah",
    stationName: "Mussafah",
    latitude: 24.3472,
    longitude: 54.5029
},{
    stationId: "EAD_Baniyas",
    stationName: "Baniyas School",
    latitude: 24.3213,
    longitude: 54.6359
},{
    stationId: "EAD_AlMafraq",
    stationName: "Al Maqta",
    latitude: 24.4035,
    longitude: 54.5161
},{
    stationId: "EAD_KhalifaCity",
    stationName: "Khalifa City A",
    latitude: 24.4199,
    longitude: 54.5782
},{
    stationId: "EAD_AlMafraq",
    stationName: "Al Mafraq",
    latitude: 24.2863,
    longitude: 54.5889
},{
    stationId: "EAD_AlAinSchool",
    stationName: "Al Ain Islamic Institute",
    latitude: 24.2191,
    longitude: 55.7349
},{
    stationId: "EAD_AlAinStreet",
    stationName: "Al Ain Street",
    latitude: 24.2259,
    longitude: 55.7658
},{
    stationId: "EAD_Sweihan",
    stationName: "Sweihan",
    latitude: 24.4667,
    longitude: 55.3429
},{
    stationId: "EAD_AlTawia",
    stationName: "Al Tawia",
    latitude: 24.2592,
    longitude: 55.7049
},{
    stationId: "EAD_Zakher",
    stationName: "Zakher",
    latitude: 24.1635,
    longitude: 55.7021
},{
    stationId: "EAD_AlQuaa",
    stationName: "Al Quaa",
    latitude: 23.5312,
    longitude: 55.486
},{
    stationId: "EAD_BidaZayed",
    stationName: "Bida Zayed",
    latitude: 23.6523,
    longitude: 53.7039
},{
    stationId: "EAD_Gayathi",
    stationName: "Gayathi School",
    latitude: 23.8355,
    longitude: 52.8103
},{
    stationId: "EAD_Liwa",
    stationName: "Liwa Oasis",
    latitude: 23.0958,
    longitude: 53.6064
},{
    stationId: "EAD_RuwaisTransco",
    stationName: "Ruwais",
    latitude: 24.0909,
    longitude: 52.7548
},{
    stationId: "EAD_Habshan",
    stationName: "Habshan South",
    latitude: 23.7504,
    longitude: 53.7453
},{
    stationId: "EAD_E11Road",
    stationName: "E11 Road",
    latitude: 24.0352,
    longitude: 53.8853
}];

$(document).ready(function () {
    var stationId = getCurrentLocation();
    setTimeout(function () { // allowing 3 secs to fade out loader
        $('.page-loader').fadeOut('slow');
    }, 3500);

    $('.filter-nav').scrollTabs();

    // Check if the 'liked' cookie is set
    if ($.cookie('EnvironmentLike') === 'true') {
        $(".EnvironmentLike").children('i, span').addClass("press animated tada go")
        $(".EnvironmentLike").attr("clicked", true);
    }
    //if ($.cookie('IndividualLike') === 'true') {
    //    $(".IndividualLike").children('i, span').addClass("press animated tada go")
    //    $(".IndividualLike").attr("clicked", true);
    //}

    $('textarea').each(function () {
        $(this).val($(this).val().trim());
    });

    $('.items').slick({
        infinite: true,
        lazyLoad: 'ondemand',
        slidesToShow: 3,
        slidesToScroll: 3
    });

    $('.achievement-slick').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        arrows: false,
        autoplay: false,
    });

    $('.projects-slick').slick({
        infinite: false,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        arrows: true,
        autoplay: false
    });

    // LoadAbudhabiData();
    LoadStationData(stationId);
    LoadProgressBar(stationId);

    displayStationInfo(stationId);
    PopulateLiveCityRanking();

    // Call the function to initially populate and initialize the dropdown list
    //initializeDropdown(selectedCityButton);

    LoadPollutantsTrends("")
    // Add a flag to check if it's the initial load
    initialLoad = true;

    metroLogicalChart.render();
    lineChart.render();
    barChart.render();
    myRadarChart.render();
    newLineChart.render();
    newBarChart.render();
    //airAnalyticschart.render();
    // Add an event listener for window load
    window.addEventListener('load', loadExternalScript);
    //var $gallery = new SimpleLightbox('.gallery a', {});
});

const options = {
    series: [],
    chart: {
        height: 210,
        type: 'radialBar',
        toolbar: {
            show: false,
        }
    },
    plotOptions: {
        radialBar: {
            hollow: {
                size: '70%',
                margin: 8,
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
                    fontWeight: '400',
                    fontFamily: 'Cairo',
                },
                value: {
                    offsetY: -10,
                    formatter: val => percentToValue(val),
                    color: '#000',
                    fontSize: '40px',
                    fontWeight: '700',
                    show: true,
                }
            },
        },
    },
    colors: [],
    labels: ['AQI'],
};
const metroLogicalChart = new ApexCharts(document.querySelector("#AQI"), options);

const max = 500;
function valueToPercent(value) {
    return (value * 100) / max;
}

function percentToValue(value) {
    return (value * max) / 100;
}
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

// Map minimiz/maximize
$(".map-mini-max").click(() => {
    $(".air-map-container").toggleClass("full-screen");
});

function LoadProgressBar(inputParam = "") {
    const apiUrl = 'https://adairqualityapi.ead.ae/GetDailyCountsAirQualityStation?input=' + inputParam;
    $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            const selectedStationAverageAQIObj = {
                averageGoodAQICount: data.averageGoodAQICount,
                averageModerateAQICount: data.averageModerateAQICount,
                averageUnHealthlySensitiveGroupsAQICount: data.averageUnHealthlySensitiveGroupsAQICount,
                averageUnHealthlyAQICount: data.averageUnHealthlyAQICount,
                averageVeryUnHealthlyAQICount: data.averageVeryUnHealthlyAQICount,
                averageHazardousAQICount: data.averageHazardousAQICount,
                goodAQIPercentage: data.averageGoodAQIPercentage,
                moderateAQIPercentage: data.averageModerateAQIPercentage,
                unHealthlySensitiveGroupsAQIPercentage: data.averageUnHealthlySensitiveGroupsAQIPercentage,
                unHealthlyAQIPercentage: data.averageUnHealthlyAQIPercentage,
                veryUnHealthlyAQIPercentage: data.averageVeryUnHealthlyAQIPercentage,
                hazardousAQIPercentage: data.averageHazardousAQIPercentage
            };
            if (selectedStationAverageAQIObj.averageGoodAQICount > 0) {
                $('#GoodProgressBar').show();
                $("#GoodProgressBar").css("width", selectedStationAverageAQIObj.goodAQIPercentage + '%');
                $('#GoodProgressBar .value').text(selectedStationAverageAQIObj.averageGoodAQICount);
            } else {
                $("#GoodProgressBar").hide();
            }

            if (selectedStationAverageAQIObj.averageModerateAQICount > 0) {
                $('#ModerateProgressBar').show();
                $("#ModerateProgressBar").css("width", selectedStationAverageAQIObj.moderateAQIPercentage + '%');
                $('#ModerateProgressBar .value').text(selectedStationAverageAQIObj.averageModerateAQICount);
            } else {
                $("#ModerateProgressBar").hide();
            }
            if (selectedStationAverageAQIObj.averageUnHealthlySensitiveGroupsAQICount > 0) {
                $('#UnhealthyForPeopleProgressBar').show();
                $("#UnhealthyForPeopleProgressBar").css("width", selectedStationAverageAQIObj.unHealthlySensitiveGroupsAQIPercentage + '%');
                $('#UnhealthyForPeopleProgressBar .value').text(selectedStationAverageAQIObj.averageUnHealthlySensitiveGroupsAQICount);
            } else {
                $("#UnhealthyForPeopleProgressBar").hide();
            }

            if (selectedStationAverageAQIObj.averageUnHealthlyAQICount > 0) {
                $('#UnhealthyProgressBar').show();
                $("#UnhealthyProgressBar").css("width", selectedStationAverageAQIObj.unHealthlyAQIPercentage + '%');
                $('#UnhealthyProgressBar .value').text(selectedStationAverageAQIObj.averageUnHealthlyAQICount);
            } else {
                $("#UnhealthyProgressBar").hide();
            }
            if (selectedStationAverageAQIObj.averageVeryUnHealthlyAQICount > 0) {
                $('#VeryUnhealthyProgressBar').show();
                $("#VeryUnhealthyProgressBar").css("width", selectedStationAverageAQIObj.veryUnHealthlyAQIPercentage + '%');
                $('#VeryUnhealthyProgressBar .value').text(selectedStationAverageAQIObj.averageVeryUnHealthlyAQICount);
            } else {
                $("#VeryUnhealthyProgressBar").hide();
            }

            if (selectedStationAverageAQIObj.averageHazardousAQICount > 0) {
                $('#HazardousProgressBar').show();
                $("#HazardousProgressBar").css("width", selectedStationAverageAQIObj.hazardousAQIPercentage + '%');
                $('#HazardousProgressBar .value').text(selectedStationAverageAQIObj.averageHazardousAQICount);
            } else {
                $("#HazardousProgressBar").hide();
            }
            $('.page-loader').fadeOut('slow');
        },
        error: handleApiError
    });
}

var stationNameforChart = "";
function LoadStationData(inputParam) {
    const apiUrl = AirQualityService + 'GetAirQualityStation?input=' + inputParam;
    stationNameforChart = inputParam;
    var data = $("#datafield").val();
    var category = $.parseJSON(data);
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
            clearClass();
            const { aqiCategory, aqiMessage, typeClass, textClass, WearMaskmessage, StayindoorMessage, UsePurifierMessage, OutdoorActivitiesMessage, CyclingMessage, BabiesSensitivePersonsMessage, EatingOutdoorsMessage } = getAqiCategoryInfo(aqi);

            $("#SafetyLevelsEnvironmentType, #SMLEnvironmentType").text(aqiCategory);
            $("#SafetyLevelsEnvironmentMessage").text(aqiMessage);
            $(".safety-section, .health-rec-section").addClass(typeClass);
            $("#SMLEnvironmentType").addClass(textClass);

            $("#PM10Station").text(selectedStationObj.pollutantValue);
            setmessages(WearMaskmessage, StayindoorMessage, UsePurifierMessage, OutdoorActivitiesMessage, CyclingMessage, BabiesSensitivePersonsMessage, EatingOutdoorsMessage);

            var stationName = stationsNames[inputParam] + ", " + $('#abudhabi').val() + ", " + $('#uae').val(); $("#stationName").text(stationName);
            $("#pollutionStation").text(stationName);
            $("#pollutionStation1").text(stationName);
            $("#analiticsStation").text(stationName);
            $("#stationAQI").text(stationName);
            $("#sefetyLevelStation").text(stationName);
            $("#pollution_title").text(stationsNames[inputParam]);
            $("#pollution_title1").text(stationsNames[inputParam]);

            $("#pollutantName").empty();
            $("#mainpollutants").empty();
            $("#mainpollutantsText").empty();
            if (selectedStationObj.pollutantName == "PM10") {
                var text = "PM<sub>10</sub>"
                var mainpollutant = "<strong>PM<sub>10</sub></strong>"
                $("#pollutantName").append(text);
                $("#mainpollutants").append(selectedStationObj.pollutantValue);
                $("#mainpollutantsText").html(category.main.fullforms.PM10);
            } else if (selectedStationObj.pollutantName == "SO2") {
                var text = "SO<sub>2</sub>"
                var mainpollutant = "<strong>SO<sub>2</sub></strong>"
                $("#pollutantName").append(text);
                $("#mainpollutants").append(mainpollutant);
                $("#mainpollutantsText").html(category.main.fullforms.SO2);
            } else if (selectedStationObj.pollutantName == "CO") {
                var text = "CO"
                var mainpollutant = "<strong>CO</strong>"
                $("#pollutantName").append(text);
                $("#mainpollutants").append(mainpollutant);
                $("#mainpollutantsText").html(category.main.fullforms.CO);
            } else if (selectedStationObj.pollutantName == "O3") {
                var text = "O<sub>3</sub>"
                var mainpollutant = "<strong>O<sub>3</sub></strong>"
                $("#pollutantName").append(text);
                $("#mainpollutants").append(mainpollutant);
                $("#mainpollutantsText").html(category.main.fullforms.O3);
            } else if (selectedStationObj.pollutantName == "NO2") {
                var text = "NO<sub>2</sub>"
                var mainpollutant = "<strong>NO<sub>2</sub></strong>"
                $("#pollutantName").append(text);
                $("#mainpollutants").append(mainpollutant);
                $("#mainpollutantsText").html(category.main.fullforms.NO2);
            }

            var selectedCityButton = document.getElementById('selectedCity');
            selectedCityButton.innerText = stationsNames[inputParam];
            //reloadMetroLogicalChart(selectedStationObj);
            GenrateStationMetroLogicalChart(selectedStationObj);
            GetHourlyStationChart(stationNameforChart);
            GetMonthlyNewLineChart(stationNameforChart);
            $('.page-loader').fadeOut('slow');
        },
        error: handleApiError
    });
    LoadProgressBar(inputParam)
}

function clearClass() {
    $(".safety-section, .health-rec-section").removeClass("good-level");
    $(".safety-section, .health-rec-section").removeClass("moderate-level");
    $(".safety-section, .health-rec-section").removeClass("unhealthy4people-level");
    $(".safety-section, .health-rec-section").removeClass("unhealthy-level");
    $(".safety-section, .health-rec-section").removeClass("very-unhealthy-level");
    $(".safety-section, .health-rec-section").removeClass("hazardous-update-level");

    $("#SMLEnvironmentType").removeClass("text-good");
    $("#SMLEnvironmentType").removeClass("text-moderate");
    $("#SMLEnvironmentType").removeClass("text-unhealthy4people");
    $("#SMLEnvironmentType").removeClass("text-unhealthy");
    $("#SMLEnvironmentType").removeClass("text-very-unhealthy");
    $("#SMLEnvironmentType").removeClass("text-hazardous");
}

function handleApiError(error) {
    $('.page-loader').fadeOut('slow');
    console.error('Error fetching data:', error);
}
var rankingdata;
//function populateTable(selectedStationObj) {
//    var tableBody = $('#LiveCityTable tbody');
//    rankingdata = selectedStationObj;
//    // Clear existing rows
//    tableBody.empty();

//    // Sort the data based on station ID
//    selectedStationObj.stationsList.sort(function (a, b) {
//        return a.stationID - b.stationID;
//    });

//    $.each(selectedStationObj.stationsList, function (index, station) {
//        var colorClass = getColorClassForAqi(station.aqi);
//        var mappedStationName = stationsNames[station.stationName] || station.stationName;
//        var row = '<tr>' +
//            '<td>' + station.stationID + '</td>' +
//            '<td>' + mappedStationName + '</td>' +
//            '<td class="text-center"><strong class="' + colorClass + '">' + station.aqi + '</strong></td>' +
//            '</tr>';

//        tableBody.append(row);
//    });
//}

var liveCityData;
function PopulateLiveCityRanking() {
    var tableBody = $('#LiveCityTable tbody');
    const apiUrl = AirQualityService + "GetStationRanking";
    $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            liveCityData = data;
            // Clear existing rows
            tableBody.empty();
            // Sort the data based on station ID
            liveCityData.sort(function (a, b) {
                return a.stationID - b.stationID;
            });
            $.each(liveCityData, function (index, station) {
                var colorClass = getColorClassForAqi(station.aqi);
                var mappedStationName = stationsNames[station.stationName] || station.stationName;
                var row = '<tr>' +
                    '<td>' + station.rank + '</td>' +
                    '<td>' + mappedStationName + '</td>' +
                    '<td class="text-center"><strong class="' + colorClass + '">' + station.aqi + '</strong></td>' +
                    '</tr>';

                tableBody.append(row);
            });
        },
        error: handleApiError
    });
}



var sortingOrder = 'asc'; // Initial sorting order

// Attach click event to the <i> element
$('#sortIcon').on('click', function () {
    sortingOrder = sortingOrder === 'asc' ? 'desc' : 'asc'; // Toggle sorting order
    populateSort(rankingdata, sortingOrder);

    // Toggle sorting icon class
    var sortIcon = $('#sortIcon');
    sortIcon.toggleClass('icon-sort5-asc', sortingOrder === 'asc');
    sortIcon.toggleClass('icon-sort5-des', sortingOrder === 'desc');
});

function populateSort(selectedStationObj, sortingOrder) {
    var tableBody = $('#LiveCityTable tbody');
    rankingdata = selectedStationObj;
    // Clear existing rows
    tableBody.empty();

    // Sort the data based on station ID
    selectedStationObj.stationsList.sort(function (a, b) {
        var aqiA = a.aqi;
        var aqiB = b.aqi;
        if (sortingOrder === 'asc') {
            return aqiA - aqiB;
        } else {
            return aqiB - aqiA;
        }
    });

    $.each(selectedStationObj.stationsList, function (index, station) {
        var colorClass = getColorClassForAqi(station.aqi);
        var mappedStationName = stationsNames[station.stationName] || station.stationName;
        var row = '<tr>' +
            '<td>' + station.stationID + '</td>' +
            '<td>' + mappedStationName + '</td>' +
            '<td class="text-center"><strong class="' + colorClass + '">' + station.aqi + '</strong></td>' +
            '</tr>';

        tableBody.append(row);
    });
}



function setmessages(WearMaskmessage, StayindoorMessage, UsePurifierMessage, OutdoorActivitiesMessage, CyclingMessage, BabiesSensitivePersonsMessage, EatingOutdoorsMessage) {
    var healthRecSection = document.querySelector('.health-rec-section');
    if (healthRecSection) {
        var listItems = healthRecSection.querySelectorAll('li');
        listItems.forEach(function (li) {
            var dataId = li.getAttribute('data-id');
            var spanElement = li.querySelector('span');
            if (spanElement) {
                if (spanElement) {
                    switch (dataId) {
                        case '1':
                            spanElement.textContent = WearMaskmessage;
                            break;
                        case '2':
                            spanElement.textContent = StayindoorMessage;
                            break;
                        case '3':
                            spanElement.textContent = UsePurifierMessage;
                            break;
                        default:
                            // Set default text or handle other cases if needed
                            spanElement.textContent = '';
                            break;
                    }
                }
            }
        });
    }
    // Update tab content based on the Safety level data content
    document.getElementById('runningText').innerText = OutdoorActivitiesMessage;
    document.getElementById('cyclingText').innerText = CyclingMessage;
    document.getElementById('kidsSensePeople').innerText = BabiesSensitivePersonsMessage;
    document.getElementById('EatOutdoor').innerText = EatingOutdoorsMessage;

}
function updateActiveClass(element) {

    var links = document.querySelectorAll('.nav-link');
    links.forEach(function (link) {
        link.classList.remove('active');
    });

    element.classList.add('active');
}
function getAqiCategoryInfo(aqi) {
    let aqiCategory, aqiMessage, typeClass, textClass, WearMaskmessage, StayindoorMessage, UsePurifierMessage, OutdoorActivitiesMessage, CyclingMessage, BabiesSensitivePersonsMessage, EatingOutdoorsMessage;
    var data = $("#datafield").val();
    var category = $.parseJSON(data);


    if (aqi >= 0 && aqi <= 50) {
        aqiCategory = category.main.Good.aqiCategory;
        aqiMessage = category.main.Good.aqiMessage;
        typeClass = category.main.Good.typeClass;
        textClass = category.main.Good.textClass;
        WearMaskmessage = category.main.Good.WearMaskmessage;
        StayindoorMessage = category.main.Good.StayindoorMessage;
        UsePurifierMessage = category.main.Good.UsePurifierMessage,
            OutdoorActivitiesMessage = category.main.Good.OutdoorActivitiesMessage
        CyclingMessage = category.main.Good.CyclingMessage,
            BabiesSensitivePersonsMessage = category.main.Good.BabiesSensitivePersonsMessage,
            EatingOutdoorsMessage = category.main.Good.EatingOutdoorsMessage
    } else if (aqi > 50 && aqi <= 100) {
        aqiCategory = category.main.Moderate.aqiCategory;
        aqiMessage = category.main.Moderate.aqiMessage;
        typeClass = category.main.Moderate.typeClass;
        textClass = category.main.Moderate.textClass;
        WearMaskmessage = category.main.Moderate.WearMaskmessage;
        StayindoorMessage = category.main.Moderate.StayindoorMessage;
        UsePurifierMessage = category.main.Moderate.UsePurifierMessage,
            OutdoorActivitiesMessage = category.main.Moderate.OutdoorActivitiesMessage
        CyclingMessage = category.main.Moderate.CyclingMessage,
            BabiesSensitivePersonsMessage = category.main.Moderate.BabiesSensitivePersonsMessage,
            EatingOutdoorsMessage = category.main.Moderate.EatingOutdoorsMessage
    } else if (aqi > 100 && aqi <= 150) {
        aqiCategory = category.main.UnhealthyforSensitiveGroups.aqiCategory;
        aqiMessage = category.main.UnhealthyforSensitiveGroups.aqiMessage;
        typeClass = category.main.UnhealthyforSensitiveGroups.typeClass;
        textClass = category.main.UnhealthyforSensitiveGroups.textClass;
        WearMaskmessage = category.main.UnhealthyforSensitiveGroups.WearMaskmessage;
        StayindoorMessage = category.main.UnhealthyforSensitiveGroups.StayindoorMessage;
        UsePurifierMessage = category.main.UnhealthyforSensitiveGroups.UsePurifierMessage,
            OutdoorActivitiesMessage = category.main.UnhealthyforSensitiveGroups.OutdoorActivitiesMessage
        CyclingMessage = category.main.UnhealthyforSensitiveGroups.CyclingMessage,
            BabiesSensitivePersonsMessage = category.main.UnhealthyforSensitiveGroups.BabiesSensitivePersonsMessage,
            EatingOutdoorsMessage = category.main.UnhealthyforSensitiveGroups.EatingOutdoorsMessage
    } else if (aqi > 150 && aqi <= 200) {
        aqiCategory = category.main.Unhealthy.aqiCategory;
        aqiMessage = category.main.Unhealthy.aqiMessage;
        typeClass = category.main.Unhealthy.typeClass;
        textClass = category.main.Unhealthy.textClass;
        WearMaskmessage = category.main.Unhealthy.WearMaskmessage;
        StayindoorMessage = category.main.Unhealthy.StayindoorMessage;
        UsePurifierMessage = category.main.Unhealthy.UsePurifierMessage,
            OutdoorActivitiesMessage = category.main.Unhealthy.OutdoorActivitiesMessage
        CyclingMessage = category.main.Unhealthy.CyclingMessage,
            BabiesSensitivePersonsMessage = category.main.Unhealthy.BabiesSensitivePersonsMessage,
            EatingOutdoorsMessage = category.main.Unhealthy.EatingOutdoorsMessage
    } else if (aqi > 200 && aqi <= 300) {
        aqiCategory = category.main.VeryUnhealthy.aqiCategory;
        aqiMessage = category.main.VeryUnhealthy.aqiMessage;
        typeClass = category.main.VeryUnhealthy.typeClass;
        textClass = category.main.VeryUnhealthy.textClass;
        WearMaskmessage = category.main.VeryUnhealthy.WearMaskmessage;
        StayindoorMessage = category.main.VeryUnhealthy.StayindoorMessage;
        UsePurifierMessage = category.main.VeryUnhealthy.UsePurifierMessage,
            OutdoorActivitiesMessage = category.main.VeryUnhealthy.OutdoorActivitiesMessage
        CyclingMessage = category.main.VeryUnhealthy.CyclingMessage,
            BabiesSensitivePersonsMessage = category.main.VeryUnhealthy.BabiesSensitivePersonsMessage,
            EatingOutdoorsMessage = category.main.VeryUnhealthy.EatingOutdoorsMessage
    } else {
        aqiCategory = category.main.Hazardous.aqiCategory;
        aqiMessage = category.main.Hazardous.aqiMessage;
        typeClass = category.main.Hazardous.typeClass;
        textClass = category.main.Hazardous.textClass;
        WearMaskmessage = category.main.Hazardous.WearMaskmessage;
        StayindoorMessage = category.main.Hazardous.StayindoorMessage;
        UsePurifierMessage = category.main.Hazardous.UsePurifierMessage,
            OutdoorActivitiesMessage = category.main.Hazardous.OutdoorActivitiesMessage
        CyclingMessage = category.main.Hazardous.CyclingMessage,
            BabiesSensitivePersonsMessage = category.main.Hazardous.BabiesSensitivePersonsMessage,
            EatingOutdoorsMessage = category.main.Hazardous.EatingOutdoorsMessage
    }
    return { aqiCategory, aqiMessage, typeClass, textClass, WearMaskmessage, StayindoorMessage, UsePurifierMessage, OutdoorActivitiesMessage, CyclingMessage, BabiesSensitivePersonsMessage, EatingOutdoorsMessage };
}

function GenrateStationMetroLogicalChart(selectedStationObj) {
    const aqi = selectedStationObj.averageAQI;
    const color = getColorForAqi(aqi);
    metroLogicalChart.updateSeries([valueToPercent(Math.round(selectedStationObj.averageAQI))]);
    metroLogicalChart.updateOptions({
        colors: [color],
        plotOptions: {
            radialBar: {
                dataLabels: {
                    value: {
                        color: color
                    }
                }
            }
        }
    });
}
function getpollutantsName(inputparam) {
    const pollutantsMapping = {
        "PM10": "PM<sub>10</sub>",
        "SO2": "SO<sub>2</sub>",
        "CO": "CO",
        "O3": "O<sub>3</sub>",
        "NO2": "NO<sub>2</sub>"
    };

    return pollutantsMapping[inputparam] || inputparam;
}
function LoadPollutantsTrends(inputParam) {
    const apiUrl = 'https://adairqualityapi.ead.ae/GetWeeklyStationAQIAndPollutants?stationName=' + inputParam;
    $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            // Check if data is an array and not empty
            if (Array.isArray(data) && data.length > 0) {
                // Clear existing table data
                $('#stationAQITbody').empty();

                // Loop through the data and append rows to the table
                data.forEach(function (entry) {
                    var colorclass = getColorClassForAqi(entry.aqi);
                    var iconclass = geticonclassforaqi(entry.aqi);
                    var PollutantsName = getpollutantsName(entry.mainPollution);
                    // Display only "Abu Dhabi" data during the initial load
                    if (initialLoad && entry.stationName === $('#abudhabi').val()) {
                        var row = $('<tr>');
                        // Append data to the row
                        row.append('<td>' + entry.day + '</td>');
                        row.append('<td><strong class="' + colorclass + '"><i class="' + iconclass + ' me-1"></i> ' + entry.pollutionLevel + '</strong></td>');
                        row.append('<td><strong class="' + colorclass + '">' + entry.aqi + '</strong></td>');
                        row.append('<td class="text-center">' + PollutantsName + '</td>');
                        var windIcon = '<i class="icon-arrow transform-' + entry.windDirection + '"></i>';
                        var windSpeedText = entry.windSpeed + ' km/h'; // Corrected the concatenation here
                        row.append('<td>' + windSpeedText + ' ' + windIcon + '</td>');
                        // Append the row to the table
                        $('#stationAQITbody').append(row);
                    } else if (!initialLoad && !entry.stationName.includes($('#abudhabi').val())) {
                        // Exclude "Abu Dhabi" data for subsequent loads
                        var row = $('<tr>');
                        // Append data to the row
                        row.append('<td>' + entry.day + '</td>');
                        row.append('<td><strong class="' + colorclass + '"><i class="' + iconclass + ' me-1"></i> ' + entry.pollutionLevel + '</strong></td>');
                        row.append('<td><strong class="' + colorclass + '">' + entry.aqi + '</strong></td>');
                        row.append('<td class="text-center">' + PollutantsName + '</td>');
                        var windIcon = '<i class="icon-arrow transform-' + entry.windDirection + '"></i>';
                        var windSpeedText = entry.windSpeed + ' km/h'; // Corrected the concatenation here
                        row.append('<td>' + windSpeedText + ' ' + windIcon + '</td>');
                        // Append the row to the table
                        $('#stationAQITbody').append(row);
                    }
                });

                // Update the flag after the initial load
                initialLoad = false;
            } else {
                console.error('No data or invalid data structure returned from the API.');
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            // Handle error
            console.error('Error loading data. Status:', textStatus, 'Error:', errorThrown);
        }
    });
}

function geticonclassforaqi(aqi) {
    if (aqi >= 0 && aqi <= 50) {
        return iconclass.GoodIconClass;
    } else if (aqi > 50 && aqi <= 100) {
        return iconclass.ModrateIconClass;
    } else if (aqi > 100 && aqi <= 150) {
        return iconclass.Unhealthy4peopleIconClass;
    } else if (aqi > 150 && aqi <= 200) {
        return iconclass.UnhealthyIconClass;
    } else if (aqi > 200 && aqi <= 300) {
        return iconclass.VeryUnhealthyIconClass;
    } else {
        return iconclass.HazardousIconClass;
    }
}

function getColorForAqi(aqi) {
    if (aqi >= 0 && aqi <= 50) {
        return colorData.GoodColor;
    } else if (aqi > 50 && aqi <= 100) {
        return colorData.ModrateColor;
    } else if (aqi > 100 && aqi <= 150) {
        return colorData.Unhealthy4peopleColor;
    } else if (aqi > 150 && aqi <= 200) {
        return colorData.UnhealthyColor;
    } else if (aqi > 200 && aqi <= 300) {
        return colorData.VeryUnhealthyColor;
    } else {
        return colorData.Hazardous;
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

function initializeDropdown(dropdownMenu) {
    // Set the default city
    // selectedCityButton.innerText = $('#abudhabi').val();

    // Clear existing dropdown items
    dropdownMenu.innerHTML = '';

    // Get an array of objects with keys and values for sorting
    var sortedItems = Object.entries(stationsNames)
        .sort((a, b) => a[1].localeCompare(b[1]));

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
    // Loop through the sorted array and create list items dynamically
    sortedItems.forEach(function ([key, value]) {
        var listItem = document.createElement('li');
        var link = document.createElement('a');
        link.className = 'dropdown-item';
        link.href = 'javascript:void(0);';
        link.setAttribute('onclick', "updateSelectedCity('" + key + "')");
        link.textContent = value;
        listItem.appendChild(link)
            ;
        dropdownMenu.appendChild(listItem);
    });
}
// Add this method for search the station list -- prasanna
function selectedCity(dropDownMenu, searchInput) {
    var searchText = $("#" + searchInput.id).val();
    if (searchText) {
        searchText = searchText.toLowerCase();
        $("#" + dropDownMenu.id + " li").each(function () {
            $(this).css("display", $(this).text().toLowerCase().includes(searchText) ? "" : "none");
        });
    } else {
        $("#" + dropDownMenu.id + " li").each(function () {
            $(this).css("display", "");
        });
    }
}
// end changes
function updateSelectedCity(cityKey) {
    $("#selectedCity").text(stationsNames[cityKey]);
    //selectedCityButton.innerText = stationsNames[cityKey];
    LoadStationData(cityKey);
    displayStationInfo(cityKey);
    LoadPollutantsTrends(cityKey);
    var year = selectedyearButton.innerText;
    GetAirAnalytics(year, cityKey);
    $("#stationsDropdown").val(cityKey);
}

var selectedyearButton = document.getElementById('selectedyear');
function getanalytics(year) {
    selectedyearButton.innerText = year;
    var city = $("#stationsDropdown").val()
    GetAirAnalytics(year, city);
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
// updated this entire method tho get our air anlytics data --prasanna
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

var radarCtx = document.getElementById('radarChart').getContext('2d');
var myRadarChart = new Chart(radarCtx, {
    type: 'radar',
    data: createRadarData(),
    options: radarOptions,
});
function GetAirAnalytics(year, stationName) {
    if (stationName == undefined) {
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
// end changes

function displayStationInfo(selectedCity) {
    var displaycity = selectedCity
    var stationInfoElements = document.getElementsByClassName('stationInfo');
    for (var i = 0; i < stationInfoElements.length; i++) {
        stationInfoElements[i].style.display = 'none';
    }
    // Show the selected stationInfo element
    var selectedStationInfo = document.querySelector('.stationInfo[data-city="' + displaycity + '"]');
    if (selectedStationInfo) {
        selectedStationInfo.style.display = 'flex';
    }
}

var linkContainers = document.querySelectorAll('.links');
linkContainers.forEach(function (container) {
    container.addEventListener('click', function (event) {
        var isIconClick = event.target.classList.contains('downloadIcon');

        if (isIconClick) {
            event.preventDefault(); // Prevent the link from navigating

            var linkUrl = container.getAttribute('data-url');
            var linkName = container.getAttribute('data-name');

            var downloadAnchor = document.createElement('a');
            downloadAnchor.href = linkUrl;
            downloadAnchor.download = linkName;
            downloadAnchor.click();
        }
        // For a regular link click, let the default behavior occur
    });
});

$("#resetbtn").click(function () {
    $("#SearchInput").val('');
    $("#SearchResult").html("")
});

$("#CloseButton").click(function () {
    $("#SearchInput").val('');
    $("#SearchResult").html("")
});
$('.header-close-icon').click(function () {
    $('.navbar-collapse').hide();
});
$('.header-navi-open').click(function () {
    $('#mainMenu').show();
    $('.navbar-toggler-icon').toggleClass('crossIcon');
});
$(".map-mini-max").click(function () {
    $(".air-map-container").toggleClass("full-screen");
    $("body").toggleClass("map-viwer-enabled");
    $('.level-legends').toggleClass('web-top-legend-up');
    $('.level-legends').toggleClass('web-top-legends');
});

// Station Data on Map Fullscreen
$(".station-data-col .close").click(function () {
    $(".station-data-col").toggleClass("off");
});
function Search() {
    var term = $("#SearchInput").val();
    if (term.length >= 3) {
        $.ajax({
            url: "/api/sitecore/Search/Search?term=" + term,
            method: 'Get',
            dataType: 'json',
            success: function (data) {
                var dropdownHtml = "";
                if (data.length > 0) {
                    $.each(data, function (index, item) {
                        dropdownHtml += '<li><i class="icon-long-right-arrow"></i><a class="uppercase" href="#' + item.ComponentId + '">' + item.ComponentTitle + '</a></li>';
                    });
                    $("#SearchResult").html(dropdownHtml);
                }
                else {
                    dropdownHtml += '<li><i class="icon-long-right-arrow"></i>No Data Found</li>';
                    $("#SearchResult").html(dropdownHtml);
                }
            },
            error: function (data) {
                console.log("Error", data.error)
            }
        });
    }
}

//  <!-- Like button Animation -->
$(function () {
    $(".like").click(function () {
        $(this).children('i, span').toggleClass("press animated tada go", 1000);
    });
});
// Map minimiz/maximize
$(".map-mini-max").click(function () {
    $(".air-map-container").toggleClass("full-screen");
});
$(".share").click(function () {
    $(this).addClass('active go animated tada').delay(3000).queue(function (n) {
        $(this).removeClass('active go animated tada');
        n();
    });
});


// Hiding Nav some page scroll
$(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 600) {
        $('header').addClass('fadeout');

    } else {
        $('header').removeClass('fadeout');


    }
});

$(".dropdown-change li a").click(function () {
    var selText = $(this).text();
    $(this).parents('.btn-group').find('.dropdown-toggle').html(selText);
});

$(".esri-icon-zoom-in-fixed").on('click', function () {
    $("#mapBlock").css({ "width": "100%", "height": "100%" });
});

$('.tog-pollutant').click(function () {
    $('.bottom-graph-filter').removeClass('d-graph-bottom');
});

$('.tog-pollutant-active').click(function () {
    $('.bottom-graph-filter').addClass('d-graph-bottom');
});

// Boostrap Product Carousel
// -------------------------
let items = document.querySelectorAll('.carousel.pro-carousel .carousel-item')
items.forEach((el) => {
    const minPerSlide = 3
    let next = el.nextElementSibling
    for (var i = 1; i < minPerSlide; i++) {
        if (!next) {
            // wrap carousel by using first child
            next = items[0]
        }
        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
    }
})

//  <!-- Like button Animation -->
$(function () {
    $(".EnvironmentLike").click(function () {
        if ($(this).children('i').hasClass("press animated tada go")) {
            $.cookie('EnvironmentLike', 'true', { expires: 365, path: '/' });
        } else {
            $.removeCookie('EnvironmentLike', { path: '/' });
        }
    });
});
$('.like').on('click', function () {

    if ($(this).attr("clicked") == "false") {
        $(this).children('i, span').toggleClass("press animate__animated animate__tada", 1000);
    }

    var IsLike = true;
    // Store a reference to the clicked element
    if ($(this).attr("clicked") == "true") {
        if ($(this).children('i, span').hasClass("press")) {
            IsLike = false;
            $(this).attr("clicked", false);
        }
    }

    var $clickedElement = $(this);
    var Id = $clickedElement.attr("Id");
    $clickedElement.attr("clicked", true);

    $.ajax({
        type: 'POST',
        url: '/api/sitecore/LikeButton/UpdateLikeCount',
        data: { itemId: Id, IsLike: IsLike },
        success: function (data) {
            if (data.success) {
                // Update the like count on the page using the stored reference
                $clickedElement.find('.tot').text(data.newLikeCount);
                $clickedElement.attr("clicked", true);
            } else {
                console.error('Failed to update like count');
            }
        },
        error: function () {
            console.error('Failed to update like count');
        }
    });
});

var stationChartData;
var timeArray;

let LineChartOptions = {
    series: [{
        name: "Desktops",
        data: []
    }],
    chart: {
        height: 385,
        type: 'line',
        zoom: {
            enabled: false
        },
        toolbar: {
            show: false,
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
    // Changed this for x axix allignment - Prasanna
    xaxis: {
        categories: [],
        radius: 12,
        labels: {
            rotateAlways: true,
        }
        //end changes
    }
};

let lineChart = new ApexCharts(document.querySelector("#ADstationqiLineGraph"), LineChartOptions);

var barChartOptions = {
    series: [],
    chart: {
        type: 'bar',
        height: 385,
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
        bar: {
            horizontal: false,
            columnWidth: '60%',
            endingShape: 'rounded'
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
        categories: [],
        radius: 12,
        labels: {
            rotateAlways: true,
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

            if (value >= 0 && value <= 50) {
                return '#9CD84E'
            } else if (value >= 51 && value <= 100) {
                return '#FACF39'
            } else if (value >= 101 && value <= 150) {
                return '#F99049'
            } else if (value >= 151 && value <= 200) {
                return '#F65E5F'
            } else if (value >= 201 && value <= 300) {
                return '#A070B6'
            } else {
                return '#A06A7B';
            }
        }
    ],
    // changed this tool tip -- prasanna
    tooltip: {
        custom: function (opts) {
            const desc =
                opts.ctx.w.config.series[opts.seriesIndex].data[
                    opts.dataPointIndex
                ].description

            const value = opts.series[opts.seriesIndex][opts.dataPointIndex]

            return value
        }
    }
    // end changes

};

// var barChart = new ApexCharts(document.querySelector("#ADstationAqiBarGraph"), barChartOptions);



var newLineChartOption = {
    series: [],
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
    colors: ['#9cd84e', '#facf39', '#f99049', '#f65e5f', '#a070b6', '#a06a7b'],
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: [3, 3, 3, 3, 3, 3],
        curve: 'straight'
    },
    title: {
        text: '',
        align: 'left'
    },
    markers: {
        size: 0
    },
    xaxis: {
        categories: [],
        labels: {
            rotateAlways: false,
        }
    },
    legend: {
        show: true
        // tooltipHoverFormatter: function(val, opts) {
        //   return val + ' - <strong>' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + '</strong>'
        // }
    },
    tooltip: {
        enabled: true,
        shared: false
        //  x: {
        //     show: false,
        // },



    }
};

var newLineChart = new ApexCharts(document.querySelector("#newchartTrend"), newLineChartOption);

var newBarChartOption = {
    series: [],
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
            endingShape: 'rounded'
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
        categories: [],
    },
    // yaxis: {
    //   title: {
    //     text: '$ (thousands)'
    //   }
    // },
    fill: {
        opacity: 1
    },
    legend: {
        show: true
    },
    tooltip: {
        enabled: true,
        //  x: {
        //     show: false,

        // },
    }
};

var newBarChart = new ApexCharts(document.querySelector("#ADstationAqiBarGraph1"), newBarChartOption);

function GetMonthlyNewLineChart(stationNameforChart = "") {
    const apiUrl = 'https://adairqualityapi.ead.ae/GetMonthlyStationAQIAndPollutants?stationName=' + stationNameforChart;
    console.log(apiUrl);
    $("#Monthly1").prop('checked', true);
    $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            const extractedData = data.map(item => ({
                month: item.month,
                stationName: item.stationName,
                pM10: item.pM10,
                o3: item.o3,
                sO2: item.sO2,
                nO2: item.nO2,
                co: item.co,
                aqi: item.aqi
            }));
            if (stationNameforChart != "") {
                stationChartData = extractedData.filter(item => item.stationName === stationNameforChart);
            }
            else {
                stationChartData = extractedData.filter(item => item.stationName === $('#abudhabi').val());
            }
            const uniqueYears = [...new Set(stationChartData.map(item => item.month))];
            timeArray = uniqueYears.map(month => `${month}`);
            var seriesData = [];
            var aqiData = [];
            var pm10Data = [];
            var so2Data = [];
            var coData = [];
            var o3Data = [];
            var no2Data = [];
            var xCategories = [];
            if (stationNameforChart == "") {
                extractedData.filter(t => t.stationName == 'Abu Dhabi').forEach(item => {
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
            }
            else {
                extractedData.filter(t => t.stationName == stationNameforChart).forEach(item => {
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
            }

            seriesData.push({ name: 'AQI', data: aqiData });
            seriesData.push({ name: 'PM10', data: pm10Data });
            seriesData.push({ name: 'SO2', data: so2Data });
            seriesData.push({ name: 'CO', data: coData });
            seriesData.push({ name: 'O3', data: o3Data });
            seriesData.push({ name: 'NO2', data: no2Data });

            console.log("LineChart", seriesData)
            LoadNewLineChart(seriesData, timeArray);
            LoadNewBarchart(seriesData, timeArray);
        },
        error: handleApiError
    });
}

function GetYearlyNewLineChart(stationNameforChart = "") {
    const apiUrl = 'https://adairqualityapi.ead.ae/GetYearlyStationAQIAndPollutants?stationName=' + stationNameforChart;
    $("#Yearly1").prop('checked', true);
    $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            const extractedData = data.map(item => ({
                year: item.year,
                stationName: item.stationName,
                pM10: item.pM10,
                o3: item.o3,
                sO2: item.sO2,
                nO2: item.nO2,
                co: item.co,
                aqi: item.aqi
            }));
            if (stationNameforChart != "") {
                stationChartData = extractedData.filter(item => item.stationName === stationNameforChart);
            }
            else {
                stationChartData = extractedData.filter(item => item.stationName === $('#abudhabi').val());
            }
            const uniqueYears = [...new Set(stationChartData.map(item => item.year))];
            timeArray = uniqueYears.map(year => `${year}`);
            var seriesData = [];
            var aqiData = [];
            var pm10Data = [];
            var so2Data = [];
            var coData = [];
            var o3Data = [];
            var no2Data = [];
            var xCategories = [];
            if (stationNameforChart == "") {
                extractedData.filter(t => t.stationName == 'Abu Dhabi').forEach(item => {
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
            }
            else {
                extractedData.filter(t => t.stationName == stationNameforChart).forEach(item => {
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
            }

            seriesData.push({ name: 'AQI', data: aqiData });
            seriesData.push({ name: 'PM10', data: pm10Data });
            seriesData.push({ name: 'SO2', data: so2Data });
            seriesData.push({ name: 'CO', data: coData });
            seriesData.push({ name: 'O3', data: o3Data });
            seriesData.push({ name: 'NO2', data: no2Data });

            console.log("LineChart", seriesData)
            LoadNewLineChart(seriesData, timeArray);
            LoadNewBarchart(seriesData, timeArray);
        },
        error: handleApiError
    });
}

function LoadNewLineChart(seriesData, timeArray, pollutant = "") {
    //newLineChart.updateSeries([{
    //    data: seriesData
    //}]);
    newLineChart.updateOptions({
        series: seriesData,
        xaxis: {
            categories: timeArray,
        }
    });
}

function LoadNewBarchart(seriesData, timeArray, pollutant = "") {
    //newLineChart.updateSeries([{
    //    data: seriesData
    //}]);
    newBarChart.updateOptions({
        series: seriesData,
        xaxis: {
            categories: timeArray,
        }
    });
}

function GetHourlyStationChart(stationNameforChart = "") {
    $("#PollutantsChartDate").val('')
    $("#AQI1").prop('checked', true);
    $("#hourly").prop('checked', true);
    const apiUrl = 'https://adairqualityapi.ead.ae/GetHourlyStationChart?stationName=' + stationNameforChart;
    $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            const extractedData = data.map(item => ({
                hour: item.hour,
                stationName: item.stationName,
                pM10: item.pM10,
                o3: item.o3,
                sO2: item.sO2,
                nO2: item.nO2,
                co: item.co,
                aqi: item.aqi
            }));
            if (stationNameforChart != "") {
                stationChartData = extractedData.filter(item => item.stationName === stationNameforChart);
            }
            else {
                stationChartData = extractedData.filter(item => item.stationName === $('#abudhabi').val());
            }
            const uniqueYears = [...new Set(stationChartData.map(item => item.hour))];
            timeArray = uniqueYears.map(hour => `${hour}`);
            const pointerData = stationChartData.map(item => item.aqi);
            $("#AQI1").click()
            LoadLineChart(pointerData, timeArray);
            LoadBarChart(pointerData, timeArray);
        },
        error: handleApiError
    });
}

function GetDailyStationChart(stationNameforChart = "") {
    $("#PollutantsChartDate").val('')
    $("#AQI1").prop('checked', true);
    const apiUrl = 'https://adairqualityapi.ead.ae/GetDailyStationChart?stationName=' + stationNameforChart;
    $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            const extractedData = data.map(item => ({
                year: item.day,
                stationName: item.stationName,
                pM10: item.pM10,
                o3: item.o3,
                sO2: item.sO2,
                nO2: item.nO2,
                co: item.co,
                aqi: item.aqi
            }));
            if (stationNameforChart != "") {
                stationChartData = extractedData.filter(item => item.stationName === stationNameforChart);
            }
            else {
                stationChartData = extractedData.filter(item => item.stationName === $('#abudhabi').val());
            }
            const uniqueYears = [...new Set(stationChartData.map(item => item.year))];
            timeArray = uniqueYears.map(year => `${year}`);
            const pointerData = stationChartData.map(item => item.aqi);
            $("#AQI1").click()
            LoadLineChart(pointerData, timeArray);
            LoadBarChart(pointerData, timeArray);
        },
        error: handleApiError
    });
}

function GetWeeklyStationChart(stationNameforChart = "") {
    $("#PollutantsChartDate").val('')
    $("#AQI1").prop('checked', true);
    const apiUrl = 'https://adairqualityapi.ead.ae/GetWeeklyStationChart?stationName=' + stationNameforChart;
    $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            const extractedData = data.map(item => ({
                week: item.week,
                stationName: item.stationName,
                pM10: item.pM10,
                o3: item.o3,
                sO2: item.sO2,
                nO2: item.nO2,
                co: item.co,
                aqi: item.aqi
            }));
            if (stationNameforChart != "") {
                stationChartData = extractedData.filter(item => item.stationName === stationNameforChart);
            }
            else {
                stationChartData = extractedData.filter(item => item.stationName === $('#abudhabi').val());
            }
            const uniqueYears = [...new Set(stationChartData.map(item => item.week))];
            timeArray = uniqueYears.map(week => `${week}`);
            const pointerData = stationChartData.map(item => item.aqi);
            $("#AQI1").click()
            // Print the resulting object for Abu Dhabi
            LoadLineChart(pointerData, timeArray);
            LoadBarChart(pointerData, timeArray);
        },
        error: handleApiError
    });
}

function GetMonthlyStationChart(stationNameforChart = "") {
    $("#PollutantsChartDate").val('')
    $("#AQI1").prop('checked', true);
    const apiUrl = 'https://adairqualityapi.ead.ae/GetMonthlyStationChart?stationName=' + stationNameforChart;
    $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            const extractedData = data.map(item => ({
                month: item.month,
                stationName: item.stationName,
                pM10: item.pM10,
                o3: item.o3,
                sO2: item.sO2,
                nO2: item.nO2,
                co: item.co,
                aqi: item.aqi
            }));
            if (stationNameforChart != "") {
                stationChartData = extractedData.filter(item => item.stationName === stationNameforChart);
            }
            else {
                stationChartData = extractedData.filter(item => item.stationName === $('#abudhabi').val());
            }
            const uniqueYears = [...new Set(stationChartData.map(item => item.month))];
            timeArray = uniqueYears.map(month => `${month}`);
            const pointerData = stationChartData.map(item => item.aqi);
            $("#AQI1").click()
            LoadLineChart(pointerData, timeArray);
            LoadBarChart(pointerData, timeArray);
        },
        error: handleApiError
    });
}

function GetYearlyStationChart(stationNameforChart = "") {
    $("#PollutantsChartDate").val('')
    $("#AQI1").prop('checked', true);
    const apiUrl = 'https://adairqualityapi.ead.ae/GetYearlyStationChart?stationName=' + stationNameforChart;
    $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            const extractedData = data.map(item => ({
                year: item.year,
                stationName: item.stationName,
                pM10: item.pM10,
                o3: item.o3,
                sO2: item.sO2,
                nO2: item.nO2,
                co: item.co,
                aqi: item.aqi
            }));
            if (stationNameforChart != "") {
                stationChartData = extractedData.filter(item => item.stationName === stationNameforChart);
            }
            else {
                stationChartData = extractedData.filter(item => item.stationName === $('#abudhabi').val());
            }
            const uniqueYears = [...new Set(stationChartData.map(item => item.year))];
            timeArray = uniqueYears.map(year => `${year}`);
            const pointerData = stationChartData.map(item => item.aqi);
            $("#AQI1").click()
            LoadLineChart(pointerData, timeArray);
            LoadBarChart(pointerData, timeArray);
        },
        error: handleApiError
    });
}

function GetSelectedDateStationChart(date, stationNameforChart = "") {
    let apiUrl;
    if (stationNameforChart != "") {
        apiUrl = 'https://adairqualityapi.ead.ae/GetSelectedDateStationChart?selectedDate=' + date + '?stationName=' + stationNameforChart;
    }
    else {
        apiUrl = 'https://adairqualityapi.ead.ae/GetSelectedDateStationChart?selectedDate=' + date;
    }
    $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            const extractedData = data.map(item => ({
                hour: item.hour,
                stationName: item.stationName,
                pM10: item.pM10,
                o3: item.o3,
                sO2: item.sO2,
                nO2: item.nO2,
                co: item.co,
                aqi: item.aqi
            }));
            if (stationNameforChart != "") {
                stationChartData = extractedData.filter(item => item.stationName === stationNameforChart);
            }
            else {
                stationChartData = extractedData.filter(item => item.stationName === $('#abudhabi').val());
            }
            const uniqueYears = [...new Set(stationChartData.map(item => item.hour))];
            timeArray = uniqueYears.map(hour => `${hour}`);
            const pointerData = stationChartData.map(item => item.aqi);
            $("#AQI1").click()
            LoadLineChart(pointerData, timeArray);
            LoadBarChart(pointerData, timeArray);
        },
        error: handleApiError
    });
}

$("#PollutantsChartDate").on("change", function () {
    $('input[name="durationFilter"]').prop('checked', false);
    var inputDate = $("#PollutantsChartDate").val();
    var convertedDate = new Date(inputDate);
    var formattedDate = ('0' + (convertedDate.getMonth() + 1)).slice(-2) + '/' + ('0' + convertedDate.getDate()).slice(-2) + '/' + convertedDate.getFullYear();
    GetSelectedDateStationChart(formattedDate)
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


function LoadAQIChart() {
    $("#AQI1").prop('checked', true);
    const pointerData = stationChartData.map(item => item.aqi);
    LoadLineChart(pointerData, timeArray, "AQI");
    LoadBarChart(pointerData, timeArray, "AQI");
}

function LoadPM10Chart() {
    const pointerData = stationChartData.map(item => item.pM10);
    LoadLineChart(pointerData, timeArray, "PM10");
    LoadBarChart(pointerData, timeArray, "PM10");
}

function LoadSO2Chart() {
    const pointerData = stationChartData.map(item => item.sO2);
    LoadLineChart(pointerData, timeArray, "SO2");
    LoadBarChart(pointerData, timeArray, "SO2");
}

function LoadCOChart() {
    const pointerData = stationChartData.map(item => item.co);
    LoadLineChart(pointerData, timeArray, "CO");
    LoadBarChart(pointerData, timeArray, "CO");
}

function LoadO3Chart() {
    const pointerData = stationChartData.map(item => item.o3);
    LoadLineChart(pointerData, timeArray, "O3");
    LoadBarChart(pointerData, timeArray, "O3");
}

function LoadNO2Chart() {
    const pointerData = stationChartData.map(item => item.nO2);
    LoadLineChart(pointerData, timeArray, "NO2");
    LoadBarChart(pointerData, timeArray, "NO2");
}

function LoadLineChart(pointerData, timeArray, pollutant = "") {
    if (pollutant == "PM10") {
        pollutant = "PM<sub>10</sub>"
    }
    else if (pollutant == "SO2") {
        pollutant = "SO<sub>2</sub>"
    }
    else if (pollutant == "CO") {
        pollutant == "CO"
    }
    else if (pollutant == "O3") {
        pollutant = "O<sub>3</sub>"
    }
    else if (pollutant == "NO2") {
        pollutant = "NO<sub>2</sub>"
    }
    else {
        pollutant = "AQI"
    }
    lineChart.updateSeries(
        [{
            name: pollutant,
            data: pointerData
        }],);
    lineChart.updateOptions({
        xaxis: {
            categories: timeArray,
        }
    });
}

$(".share").on("click", function () {
    // Get the link text (current URL)
    var linkText = window.location.href;

    // Create a temporary input element
    var tempInput = $("<input>");
    $("body").append(tempInput);

    // Set the input value to the link text
    tempInput.val(linkText).select();

    // Copy the text to the clipboard
    document.execCommand("copy");

    // Remove the temporary input element
    tempInput.remove();

});

$("#fxb_2f59b7e2-0b56-42bd-95ac-9933516e90ec_0b984e44-e66b-4fee-b6ba-95c90fc63ff7").on("submit", function () {
    if ($("#fxb_2f59b7e2-0b56-42bd-95ac-9933516e90ec_Fields_01a2043c-a4c0-436d-a639-23468550e269__Value").val() == '') {
        return false;
    }
    if ($("#fxb_2f59b7e2-0b56-42bd-95ac-9933516e90ec_Fields_dbb1f19c-3532-4e3b-ab4d-06f127407a2f__Value").val() == '') {
        return false;
    }
    if ($("#fxb_2f59b7e2-0b56-42bd-95ac-9933516e90ec_Fields_09e72a99-6b1b-4e38-ad4c-2751422c4904__Value").val() == '') {
        return false;
    }
    setTimeout(function () {
        $("#fxb_2f59b7e2-0b56-42bd-95ac-9933516e90ec_0b984e44-e66b-4fee-b6ba-95c90fc63ff7").find('.msg-sent').html('<i class="icon-circle-check-solid me-2"></i> Message Sent Successfully');
    }, 500)
});

$(".notifyme").click(function (e) {
    $(".subject-dropdown").val('Notification');
});

$(".dropdown-change li a").click(function () {
    var selText = $(this).text();
    $(this).parents('.btn-group').find('.dropdown-toggle').html(selText);
});

$('.acco-tabs ul li .accordion-button').on('click', function () {
    $(this).parent().siblings().toggle();
})

//Side Nav
$(".circle-nav li a").click(function () {
    $(".circle-nav li a").removeClass("active");
    $(this).addClass("active");
})

window.location.replace(
    "#header",
);

// Page Loader
//$(window).on('load', function () {
//    setTimeout(function () { // allowing 3 secs to fade out loader
//        $('.page-loader').fadeOut('slow');
//    }, 3500);

//     $('.filter-nav').scrollTabs();

//    // Check if the 'liked' cookie is set
//    if ($.cookie('EnvironmentLike') === 'true') {
//        $(".EnvironmentLike").children('i, span').addClass("press animated tada go")
//        $(".EnvironmentLike").attr("clicked", true);
//    }
//    if ($.cookie('IndividualLike') === 'true') {
//        $(".IndividualLike").children('i, span').addClass("press animated tada go")
//        $(".IndividualLike").attr("clicked", true);
//    }

//    $(".know-more-btn").click(function () {
//        $(this).parent().siblings('.content-scroll').toggleClass("scroll");
//        $(this).text($(this).text() == $("#knowmore").val() ? $("#back").val() : $("#knowmore").val());
//    });
//    // Read More button with Scroll
//    $(".read-more-btn").click(function () {
//        $(this).parent().siblings('.content-scroll').toggleClass("scroll");
//        $(this).text($(this).text() == $("#readmore").val() ? $("#back").val() : $("#readmore").val());
//    });

//    $('textarea').each(function () {
//        $(this).val($(this).val().trim());
//    });

//    $('.items').slick({
//        infinite: true,
//        lazyLoad: 'ondemand',
//        slidesToShow: 3,
//        slidesToScroll: 3
//    });

//    $('.achievement-slick').slick({
//        infinite: false,
//        slidesToShow: 3,
//        slidesToScroll: 1,
//        autoplaySpeed: 2000,
//        arrows: false,
//        autoplay: false,
//    });

//    $('.projects-slick').slick({
//        infinite: false,
//        slidesToShow: 6,
//        slidesToScroll: 1,
//        autoplaySpeed: 2000,
//        arrows: true,
//        autoplay: false
//    });

//   // LoadAbudhabiData();
//    LoadProgressBar();

//    displayStationInfo("EAD_HamdanStreet");

//    // Call the function to initially populate and initialize the dropdown list
//    //initializeDropdown(selectedCityButton);

//    LoadPollutantsTrends("EAD_HamdanStreet")
//    // Add a flag to check if it's the initial load
//    initialLoad = true;

//    metroLogicalChart.render();
//    lineChart.render();
//    barChart.render();
//    airAnalyticschart.render();
//    // Add an event listener for window load
//    window.addEventListener('load', loadExternalScript);
//    var $gallery = new SimpleLightbox('.gallery a', {});
//});

$(".know-more-btn").click(function () {
    $(this).parent().siblings('.content-scroll').toggleClass("scroll");
    $(this).text($(this).text() == $("#knowmore").val() ? $("#back").val() : $("#knowmore").val());
});
// Read More button with Scroll
$(".read-more-btn").click(function () {
    $(this).parent().siblings('.content-scroll').toggleClass("scroll");
    $(this).text($(this).text() == $("#readmore").val() ? $("#back").val() : $("#readmore").val());
});



window.addEventListener('scroll', (e) => {
    const sections = document.querySelectorAll('.banner-section.about-division, .banner-section.contact-division');
    const isInViewport = (section) => {
        const { top } = section.getBoundingClientRect();
        section.classList.toggle('active', top >= 0 && top <= 0);
    }
    const toggleActiveClass = () => {
        sections.forEach(isInViewport);
        if ($(sections).hasClass("active")) {
            $("header").addClass('nav-on-banner');
            //console.log(sections);

        }
        else {
            $("header").removeClass('nav-on-banner');
            //console.log("sds");
        }
    }
    document.addEventListener('scroll', toggleActiveClass);
});

$('.map-mini-max').click(function () {
    //alert('fullscreen');
    if ($(window).width() < 992) {
        //console.log('width 992');
        $('.air-map-col .map-block iframe').toggleClass('add-height');
        $('.level-legends').toggleClass('top-legend-up');
        $('.level-legends').toggleClass('web-top-legends');
        // $('header').toggleClass('fadeout')
    }
});

$(".projects-slick .img-box .read-popup-btn").click(function (e) {
    currentImg = $(this).parent().parent();
    $('.about-division .projects-box').addClass("full-view");
    currentImg.addClass("show");
    currentImg.addClass("add-opacity");
});

// Hiding Image content
$(".projects-slick .img-box .close").click(function (even) {
    even.stopPropagation();
    $(this).parent('.img-box').removeClass("add-opacity");
    $('.about-division .projects-box').removeClass("full-view");
    setTimeout(function () {
        $(".projects-slick .img-box").removeClass("show");
    }, 0);
});


function loadExternalScript() {
    if (window.innerWidth > 990) {
        var newscriptTag = document.createElement('script');
        newscriptTag.src = './assets/AQI/Scripts/custom-scrollify.min.js';
        document.body.appendChild(newscriptTag);
    }
}

function AirQualityFunction(elem, i) {
    var CurrentID = $(elem).attr("id");
    var parentSection = $(elem).attr("data-value");
    //alert(CurrentID);
    $('#' + CurrentID).closest('#' + parentSection).addClass('highlight-content');
    var contentDetails = elem.closest('.content-details');

    var achieveFieldValue = contentDetails.querySelector('#achievefield').value;
    var achieveSubTitleValue = contentDetails.querySelector('#achieveSubTitle').value;
    var achieveFieldImgValue = contentDetails.querySelector('#achievefieldimg').value;

    $("#project_Description_" + i).text(achieveFieldValue)
    $("#project_Title_" + i).text(achieveSubTitleValue)
    $('#project_image_' + i).attr('src', achieveFieldImgValue);
}

$('.ground-close').click(function () {
    $('#quality2a').removeClass('highlight-content');
    $('#quality2b').removeClass('highlight-content');
    $('#quality2c').removeClass('highlight-content');
    $('#quality2d').removeClass('highlight-content');
});

$('.montimg').click(function () {
    $('#quality2a').removeClass('highlight-content');
    $('#quality2b').removeClass('highlight-content');
    $('#quality2c').removeClass('highlight-content');
    $('#quality2d').removeClass('highlight-content');
});

$('.mont-carousel .carousel-item').each(function () {
    var minPerSlide = 6;
    var next = $(this).next();
    if (!next.length) {
        next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));

    for (var i = 0; i < minPerSlide; i++) {
        next = next.next(); if (!next.length) {
            next = $(this).siblings(':first');
        } next.children(':first-child').clone().appendTo($(this));
    }
});

function sortRankingTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("ranking-sorting");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {

            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;

            switchcount++;
        } else {

            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

$('.navmobile-new').click(function () {
    $('#hamburger').toggleClass('open');
    $('#overlay').toggleClass('menu');
});

//// 08-JAN-2024-----------------------------
$('.mobile-menu a').click(function () {
    $('.mobile-menu a').removeClass("active");
    $(this).addClass("active");
    $('#hamburger').removeClass('open');
    $('#overlay').removeClass('menu');
});

function LoadBarChart(pointerData, timeArray, pollutant = "") {
    barChart.updateSeries([{
        data: pointerData
    }]);
    barChart.updateOptions({
        xaxis: {
            categories: timeArray,
        }
    });
    if (pollutant != "" && pollutant != undefined) {
        barChart.updateOptions({
            colors: [
                function ({ value, seriesIndex, w }) {
                    if (pollutant == "AQI") {
                        if (value >= 0 && value <= 50) {
                            return '#9CD84E'
                        } else if (value >= 51 && value <= 100) {
                            return '#FACF39'
                        } else if (value >= 101 && value <= 150) {
                            return '#F99049'
                        } else if (value >= 151 && value <= 200) {
                            return '#F65E5F'
                        } else if (value >= 201 && value <= 300) {
                            return '#A070B6'
                        } else {
                            return '#A06A7B';
                        }
                    }

                    else {
                        return "#5AB2E3";
                    }
                }
            ],
        })
    }
}
if (performance.getEntriesByType('navigation')[0].type === 'reload') {
    // Remove the fragment identifier on page load or refresh
    window.location.href = window.location.href.split('#')[0];
}

function getCurrentLocation() {
    var stationId;
    navigator.geolocation.getCurrentPosition(function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var stationIndex = stationsWithLocations.findIndex(x => x.latitude == latitude && x.longitude == longitude);
        if (stationIndex > -1) {
            stationId = stationsWithLocations[stationIndex].stationId;
        } else {
            stationId = "";
        }
    }, function error(ex) {
        stationId = "";
    }, options);
    return stationId;
}