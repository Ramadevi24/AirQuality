$('.sidepanel').css('margin-left', -500);
$('.circle').animate({
    left: 500
}, function () {
    $('.fa-chevron-left').toggleClass('hide');
    $('.fa-chevron-right').toggleClass('hide');
});

var MonitoringStationInfo;
var StationsObject = [];
var stationsData = [];
var pollutantGrpLyr_EmirateLvl; var FeatureCollectionlyr; var SelectedstationInfo;
var view;
var featureLayer;
require(["esri/config", "esri/renderers/ClassBreaksRenderer", "esri/core/lang", "esri/views/MapView", "esri/WebMap", "esri/rest/query","esri/layers/MapImageLayer",
    "esri/rest/support/Query", "esri/layers/GraphicsLayer", "esri/Graphic", "esri/layers/FeatureLayer", "esri/symbols/SimpleMarkerSymbol","esri/symbols/PictureMarkerSymbol",
      "esri/symbols/TextSymbol","esri/widgets/Zoom", "esri/widgets/Fullscreen", "esri/widgets/BasemapToggle", "esri/widgets/Locate", "esri/widgets/Home",
    "esri/widgets/Search", "esri/widgets/Expand", "esri/geometry/Extent","esri/widgets/Popup","esri/core/reactiveUtils",
],

    (esriConfig, ClassBreaksRenderer, esriLang, MapView, WebMap, query, MapImageLayer, Query,
        GraphicsLayer, Graphic, FeatureLayer, SimpleMarkerSymbol,PictureMarkerSymbol,TextSymbol, 
		Zoom, Fullscreen, BasemapToggle, Locate, Home, Search, Expand, Extent,Popup,reactiveUtils
    ) => {
        esriConfig.request.httpsDomains.push("enviroportal.ead.ae");
        esriConfig.portalUrl = portalUrl;
        for (var i = 0; i < TrustedDomains.length; i++) {

            esriConfig.request.trustedServers.push(TrustedDomains[i]);
        }
        const webmap = new WebMap({
            portalItem: {
                id: WebMapID
            }
        });
		console.log(webmap);
		var dynamicMapServiceLayer = new MapImageLayer({
                url: "https://maps.smartgeoapps.com/server/rest/services/AQI_UAE/ImageServer",
				opacity:0.5				
            });
        webmap.basemap = "streets-navigation-vector"//"oceans"//"topo"//"streets-vector"; 

        view = new MapView({
            map: webmap,
            container: "mapBlock",
			popup: new Popup({
            dockEnabled: true,
            dockOptions: {
              // Disables the dock button from the popup
              buttonEnabled: true,
              // Ignore the default sizes that trigger responsive docking
              breakpoint: true
            }
			})
        });

        // Remove the default zoom buttons
        view.ui.components = [];
		view.on("mouse-wheel", (event) => {
		  event.stopPropagation();
		});
        //console.log(view.ui.components);
        LoadDefaultWidgets();

        featureLayer = new FeatureLayer({
            url: MonitoringStationsAPI
        });

        //Add Graphic Layers to map
        pollutantGrpLyr_EmirateLvl = new GraphicsLayer({
            id: "pollutantGrpLyr_EmirateLvl",
            title: "AQI_EmirateLvl"
        });
        pollutantTextGrpLyr = new GraphicsLayer({
            id: "pollutantTextGrpLyr",
            title: "Label"
        });
        pollutantGrpLyr_RegionLvl = new GraphicsLayer({
            id: "pollutantGrpLyr_RegionLvl",
            title: "AQI_RegionLvl"
        });
        pollutantTextGrpLyr_Region = new GraphicsLayer({
            id: "pollutantTextGrpLyr_Region",
            title: "Label_Region"
        });
        //webmap.addMany([dynamicMapServiceLayer, pollutantGrpLyr_EmirateLvl, pollutantTextGrpLyr, pollutantGrpLyr_RegionLvl, pollutantTextGrpLyr_Region]);
		webmap.layers.push(pollutantTextGrpLyr,pollutantGrpLyr_EmirateLvl,pollutantGrpLyr_RegionLvl,pollutantTextGrpLyr_Region);
        // view.watch('extent', function () {// Scale change Event
            // //  console.log("Watch for the current scale: ", view.scale);
            // OnScaleChange(view.scale);
        // // });
		
		var previousZoomLevel = view.zoom;
	reactiveUtils.watch(
        () => [view.stationary, view.zoom],
        ([stationary, zoom]) => {
          // Only print the new zoom value when the view is stationary
          if(stationary){
            const newZoom = zoom
            if (newZoom !== previousZoomLevel) {
              console.log(`Zoom level changed to: ${newZoom}`);
			  previousZoomLevel = newZoom;
			  OnScaleChange(newZoom);
            }
          }
        }
 );
        function LoadDefaultWidgets() {
            view.when(function () {
				

                //Initialize Search Widget
                const featureLayerDistricts = new FeatureLayer({
                    url: MonitoringStationsAPI,
                    //popupTemplate: {
                    //    // autocasts as new PopupTemplate()
                    //    title: "{Name} </br>{Location}, ({Region})",
                    //    overwriteActions: true
                    //},
                    popupTemplate: {
                        // autocasts as new PopupTemplate()
                        title: "Station:" + "{Name}",
                        content: [
                            {
                                type: "fields",
                                fieldInfos: [
                                    {
                                        fieldName: "Location",
                                        label: "Location"
                                    },
                                    {
                                        fieldName: "StationID",
                                        label: "StationID"
                                    },
                                    {
                                        fieldName: "Status",
                                        label: "Status"
                                    },
                                    {
                                        fieldName: "Region",
                                        label: "Region"
                                    }
                                ]
                            }
                        ]
                    },
                });

                const searchWidget = new Search({
                    view: view,
                    allPlaceholder: "StationName:Hamdan Street",
                    minSuggestCharacters: 1,
                    includeDefaultSources: false,
                    sources: [
                        {
                            layer: featureLayerDistricts,
                            searchFields: ["Name"],
                            zoomScale: 500000,
                            suggestionTemplate: "{Name},{Region}",
                            displayField: "Name",
                            exactMatch: false,
                            outFields: ["*"],
                            name: "AirQuality Stations",
                            placeholder: "Example: Hamdan Street"
                        }
                    ]
                });

                const bgExpand = new Expand({
                    view: view,
                    content: searchWidget,
                    expandIcon: "search",
                    expandTooltip: "Expand Search",
                    collapseTooltip: "Minimize Search"
                });
				

                //view.ui.add(searchWidget, "top-right");	


                // const zoom = new Zoom({
                    // view: view
                // });

                // // Add the Zoom widget to the UI with a custom position
                // view.ui.add(zoom, {
                     // position: {
						// top: 184,
						// right: 40
					  // } // Change to the desired position
                // // });
				var toggleBaseMap;
                //Initiate the Basemap Toggle Widget
                toggleBaseMap = new BasemapToggle({
                    view: view,
                    nextBasemap: "satellite"
                });
				 toggleBaseMap.watch('activeBasemap', function (basemap) {
            console.log("current basemap title: ", basemap.title);
            //if (basemap.title != "BaseMapEng_LightGray_WM") {
            //    toggleBaseMap.nextBasemap.thumbnailUrl = "https://www.arcgis.com/sharing/rest/content/items/8b3b470883a744aeb60e5fff0a319ce7/info/thumbnail/light_gray_canvas.jpg"
            //}
        });
                view.ui.add(toggleBaseMap, "bottom-left");
				
                var dropdownMenu = document.getElementById('stationsDropdown');
                var dropdownMap = document.getElementById('stationsDropdownMap');
                var selectedCityButton = document.getElementById('selectedCity');
                // Set the default city
                selectedCityButton.innerText = $('#abudhabi').val();

                initializeDropdown(dropdownMenu);
                initializeDropdown(dropdownMap);
				
				//view.ui.add (document.getElementById('stationsDropdownMap'), "bottom-right");

            });
        }
		// added for mp zoom controls --prasanna
		$("#zoomplus").click(function (event) {			
			let zm = view.zoom + 1;
			view.goTo({
			target: view.center,
			zoom: zm
			});
		});
		$("#zoomMinus").click(function (event) {
			let zm = view.zoom - 1;
			  view.goTo({
				target: view.center,
				zoom: zm
			  });
		});
		
		$("#airPurifier").click(function (event) {	
			
			var layer = webmap.findLayerById("18d30ddfba7-layer-3");
			if(!layer.visible)
			{
				layer.visible = true;
			}
			else{
				layer.visible = false;
			}
			
		});
		
		$("#wind").click(function (event) {			
			var layer = webmap.findLayerById("18c9125f8e5-layer-2");
			if(!layer.visible)
			{
				layer.visible = true;
			}
			else{
				layer.visible = false;
			}
		});
		// end changes

        $("#stationsDropdownMap").click(function (event) {
			if(!event.target.id.includes('Search')){
				if (event.target.classList.contains("abudhabiitem")) {
					LoadAirQualityData();
					var stationName = $('#abudhabi').val();
					$("#selectedCity").text(stationName);
					LoadProgressBar();
					displayStationInfo("EAD_HamdanStreet");
					LoadPollutantsTrends("EAD_HamdanStreet");
					var year = selectedyearButton.innerText;
					GetAirAnalytics(year, "");
					$("#stationsDropdown").val("");
				} else {
					// Call your JavaScript function for dynamically created elements
					updateSelectedCity1($(event.target).attr("data-key"), $(event.target).text());
				}
			}
        });
        $("#stationsDropdown").click(function (event) {
            if (event.target.classList.contains("abudhabiitem")) {
                LoadAirQualityData();
                var stationName = $('#abudhabi').val();
                $("#selectedCity").text(stationName);
                LoadProgressBar();
                displayStationInfo("EAD_HamdanStreet");
                LoadPollutantsTrends("EAD_HamdanStreet");
                var year = selectedyearButton.innerText;
                GetAirAnalytics(year, "");
                $("#stationsDropdown").val("");
            }
            if (event.target.classList.contains("dropdown-item")) {
                // Call your JavaScript function for dynamically created elements
                //updateSelectedCity1($(event.target).attr("data-key"),$(event.target).text());
                ZoomToLocation($(event.target).text());
            }

        });

        $("#Refreshbtn").click(function (event) {
            if ($("#selectedCity").text() == $('#abudhabi').val()) {
                LoadAirQualityData();
                var stationName = $('#abudhabi').val();
                $("#selectedCity").text(stationName);
                LoadProgressBar();
                displayStationInfo("EAD_HamdanStreet");
                LoadPollutantsTrends("EAD_HamdanStreet");
                var year = selectedyearButton.innerText;
                GetAirAnalytics(year, "");
                $("#stationsDropdown").val("");
            } else {
                var station = $("#stationsDropdown").val();
                LoadStationData(station)
                    ;
            }
            var currentDate = new Date();
            var formattedDate = moment(currentDate).format("h:mm A, MMM DD");
            $("#LastUpdatedDateTime").html("<strong>Last Update at</strong> " + formattedDate);
        });

        function updateSelectedCity1(cityKey, Value) {
            ZoomToLocation(Value);
            //updateSelectedCity(cityKey);
        }

        function ZoomToLocation(searchValue) {
            // Create a Query object
            var query = new Query({
                where: "Name LIKE '%" + searchValue + "%'", // Replace with your field name
                returnGeometry: true,
                outFields: ["*"] // Retrieve all fields
            });

            // Perform the query on the FeatureLayer
            featureLayer.queryFeatures(query).then(function (result) {
                // Access the features in the result
                var features = result.features;

                // Do something with the queried features, e.g., highlight on the map
                if (features.length > 0) {

                    view.goTo({
                        center: [features[0].geometry.longitude, features[0].geometry.latitude],
                        zoom: 15
                    });



                } else {
                    console.log("No features found.");
                }
            }).catch(function (error) {
                console.error("Query failed:", error);
            });

        }

        $(".stationSearch").click(function () {

            if ($(".searchdropdown").hasClass("show"))
                $(".searchdropdown").removeClass("show").addClass("hide");
            else
                $(".searchdropdown").addClass("show").removeClass("hide");

        });

        function search() {
            if ($(".searchdropdown").hasClass("show"))
                $(".searchdropdown").removeClass("show").addClass("hide");
            else
                $(".searchdropdown").addClass("show").removeClass("hide");
        }

        //Toggle Layers on scale change
        function OnScaleChange(scale) {
            if (Math.round(scale) <= 7) { //show graphic layers at high level 4524387.743089159
                pollutantGrpLyr_EmirateLvl.visible = true;
                pollutantTextGrpLyr.visible = true;
                pollutantGrpLyr_RegionLvl.visible = false;
                pollutantTextGrpLyr_Region.visible = false;
                if (typeof (FeatureCollectionlyr) != "undefined") {
                    FeatureCollectionlyr.visible = false;
                }
            }
            else if (Math.round(scale) == 8 ) { //show graphic layers mid scale
                pollutantGrpLyr_RegionLvl.visible = true;
                pollutantTextGrpLyr_Region.visible = true;
                pollutantGrpLyr_EmirateLvl.visible = false;
                pollutantTextGrpLyr.visible = false;
                if (typeof (FeatureCollectionlyr) != "undefined") {
                    FeatureCollectionlyr.visible = false;
                }
            }
            else if (Math.round(scale) > 8 ){//show only stations infor mation at low scale level
                pollutantGrpLyr_EmirateLvl.visible = false;
                pollutantTextGrpLyr.visible = false;
                pollutantGrpLyr_RegionLvl.visible = false;
                pollutantTextGrpLyr_Region.visible = false;
                if (typeof (FeatureCollectionlyr) != "undefined") {
                    FeatureCollectionlyr.visible = true;
                }
            }
        }

        // Set up a click event handler and retrieve the screen point
        let queryUrl = MonitoringStationsAPI;
        let queryObject = new Query();
        queryObject.where = "1=1";
        queryObject.outSpatialReference = { wkid: 4269 };
        queryObject.returnGeometry = true;
        queryObject.outFields = ["*"];

        function LoadAirQualityData() {
            const apiUrl = AirQualityService + "GetAirQualityStation";

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
                    for (var x = 0; x < StationsObject.length; x++) {
                        var stationobj = data.stationsList.filter(item => item.stationName == StationsObject[x].KeyName);
                        if (stationobj != null) {
                            StationsObject[x].data = stationobj;
                        }
                    }
                    const aqi = Math.round(selectedStationObj.averageAQI);
                    $("#BannerAverageAQI, #SafetyLevelsAQI").text(aqi);
                    var data = $("#datafield").val();
                    var category = $.parseJSON(data);
                    const { aqiCategory, aqiMessage, typeClass, textClass, WearMaskmessage, StayindoorMessage, UsePurifierMessage, OutdoorActivitiesMessage, CyclingMessage, BabiesSensitivePersonsMessage, EatingOutdoorsMessage } = getAqiCategoryInfo(aqi);
                    $("#BannerEnvironmentType, #SafetyLevelsEnvironmentType, #SMLEnvironmentType").text(aqiCategory);
                    $("#BannerEnvironmentMessage, #SafetyLevelsEnvironmentMessage").text(aqiMessage);
                    $(".live-update, .safety-section, .health-rec-section").addClass(typeClass);
                    $("#SMLEnvironmentType").addClass(textClass)
                    $("#PM10Station").text(selectedStationObj.pollutantValue);
                    setmessages(WearMaskmessage, StayindoorMessage, UsePurifierMessage, OutdoorActivitiesMessage, CyclingMessage, BabiesSensitivePersonsMessage, EatingOutdoorsMessage);
                    var stationName = $('#abudhabi').val() + ", " + $('#uae').val();
                    $("#stationName").text(stationName);
                    $("#pollutionStation").text(stationName);
                    $("#analiticsStation").text(stationName);
                    $("#stationAQI").text(stationName);
                    $("#sefetyLevelStation").text(stationName);
                    $("#pollution_title").text($('#abudhabi').val());

                    $("#pollutantName").empty();
                    $("#mainpollutants").empty();
                    $("#mainpollutantsText").empty();
                    if (selectedStationObj.pollutantName == "PM10") {
                        var text = "PM<sub>10</sub>"
                        var mainpollutant = "<strong>PM<sub>10</sub></strong>"
                        $("#pollutantName").append(text);
                        $("#mainpollutants").append(mainpollutant);
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

                    GenrateStationMetroLogicalChart(selectedStationObj);
                    //populateTable(selectedStationObj);
                    Createpollutants_EmirateLvl(aqi);
                    Createpollutants_RegionLvl();
                    Createpollutants();
                    GetAirAnalytics(new Date().getFullYear());
                    GetHourlyStationChart();
					GetMonthlyNewLineChart();
					PopulateLiveCityRanking();
                    $('.page-loader').fadeOut('slow');
                },
                error: handleApiError
            });
        }

        function Createpollutants_EmirateLvl(AQIValue) { // Display avaerage of lastest one hour AQI Index Value at Emirate Level
            var AbuDhabi_Point = {
                type: "point", // autocasts as new Point()
                longitude: AD_Long,
                latitude: AD_Lat
            };

           // var pointGraphic1 = CreateGraphicSymbol(AbuDhabi_Point, AQIValue, pollutantGrpLyr_EmirateLvl)
		   var textSymbol = new TextSymbol({
                    text: AQIValue
                });				
				var symbol = GetColourValue(AQIValue)
				  var picSymbol = new PictureMarkerSymbol({ url: symbol.ImageUrl,width: 100, height: 100});
				var picgraphic=new Graphic({ geometry: AbuDhabi_Point, symbol: picSymbol });
                var textgraphic=new Graphic({ geometry: AbuDhabi_Point, symbol: textSymbol });
            //Add Text symbol to graphic Layer
			pollutantTextGrpLyr.addMany([picgraphic, textgraphic]);

            //Add Text symbol to graphic Layer
           // pollutantTextGrpLyr.add(pointGraphic1);

        }
        function Createpollutants_RegionLvl() { // Display avaerage of lastest one hour AQI Index Value at Emirate Level
            var AQData = StationsObject;
            var RegionArr = [];
            var AlAINData = [];
            var AbuDhabiData = [];
            var AlDhafraData = [];
            for (var i = 0; i < AQData.length; i++) {

                if (AQData[i].attributes.Region.split(" ").join("").toLowerCase() == "abudhabicapitalregion") {
                    AbuDhabiData.push(AQData[i].data[0]["aqi"])
                }
                else if (AQData[i].attributes.Region.split(" ").join("").toLowerCase() == "aldhafraregion") {
                    AlDhafraData.push(AQData[i].data[0]["aqi"])
                }
                else {
                    AlAINData.push(AQData[i].data[0]["aqi"])
                }

            }
            RegionArr.push({ "AQI": GetAverage(AlAINData), "Region": "alainregion" })
            RegionArr.push({ "AQI": GetAverage(AbuDhabiData), "Region": "abudhabicapitalregion" })
            RegionArr.push({ "AQI": GetAverage(AlDhafraData), "Region": "aldhafraregion" })

            for (var j = 0; j < RegionArr.length; j++) {
                var locCoordinates = AD_Regions.filter(x => x.Region == RegionArr[j].Region);
                if (locCoordinates != null) {
                    var Region_Loc = {
                        type: "point"
                    };
                    Region_Loc.latitude = locCoordinates[0].Lat;
                    Region_Loc.longitude = locCoordinates[0].Long
					 var Region_Point = {
						type: "point", // autocasts as new Point()
						longitude: Region_Loc.longitude,
						latitude: Region_Loc.latitude
					};	
                   // var pointGraphic1 = CreateGraphicSymbol(Region_Loc, RegionArr[j].AQI, pollutantGrpLyr_RegionLvl);
				    var textSymbol = new TextSymbol({
                    text: RegionArr[j].AQI
                });
					var symbol = GetColourValue(RegionArr[j].AQI)
				   var picSymbol = new PictureMarkerSymbol({ url: symbol.ImageUrl,width: 60, height: 60 });
					var picgraphic=new Graphic({ geometry: Region_Point, symbol: picSymbol });
					var textgraphic=new Graphic({ geometry: Region_Point, symbol: textSymbol });
					//Add Text symbol to graphic Layer
					pollutantTextGrpLyr_Region.addMany([picgraphic, textgraphic]);
                    //pollutantTextGrpLyr_Region.add(pointGraphic1);
                }

                //CreateGraphic_Region(RegionArr[j]);

            }

            pollutantGrpLyr_RegionLvl.visible = false;
            pollutantTextGrpLyr_Region.visible = false;
        }
        function CreateGraphicSymbol(Region_Loc, AQI, graphiclayer) {
			 // symbol: {
					// type: "picture-marker",
					// url: 'CoSchools.svg'
				  // }
            let symbol = {
                type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                style: "circle",
                color: "blue",
                size: "28px",  // pixels
                outline: {  // autocasts as new SimpleLineSymbol()
                    color: [255, 255, 0],
                    width: 3  // points
                }
            };
            let textSymbol = {
                type: "text",  // autocasts as new TextSymbol()
                color: "black",
                text: "",
                xoffset: 0,
                yoffset: -5,
                font: {  // autocasts as new Font()
                    size: 10,
                    family: "roboto",
                    weight: "normal",
                    style: "normal"
                }
            };

            //Prepare Geometry Region Wise
            var pollutantparams = GetColourValue(AQI);
            var PollutantValue = AQI;

            let graphic = new Graphic();
            graphic.attributes = {};
            graphic.geometry = Region_Loc;
            //PictureMarkerSymbol.url = pollutantparams.ImageUrl;
            symbol.color = pollutantparams.color;
            graphic.symbol = symbol;

            //Add graphic to graphic Layer
            graphiclayer.add(graphic);

            if (PollutantValue > 0) {
                textSymbol.text = parseFloat(PollutantValue).toFixed().toString();
            }
            else { textSymbol.text = "N/A"; }
            const pointGraphic1 = new Graphic({
                geometry: Region_Loc,
                symbol: textSymbol
            });

            return pointGraphic1;

        }
        //get the pollutant colour and level based on the pollutant value
        function GetColourValue(PollutantValue) {
            var rangeParams = {};
            for (var i = 0; i < IndexRange.length; i++) {
                if (IndexRange[i].minVal <= PollutantValue && IndexRange[i].maxVal > PollutantValue) {
                    //rangeParams.color = IndexRange[i].color;
                    rangeParams.pollutantLevel = IndexRange[i].pollutantLevel;
                    rangeParams.ImageUrl = IndexRange[i].ImageUrl
                    break;
                }
            }
            return rangeParams;
        }

        query.executeQueryJSON(queryUrl, queryObject).then(function (results) {
            // results.graphics contains the graphics returned from query
            MonitoringStationInfo = results;
            var MonitoringFeatures = MonitoringStationInfo.features;
            var ObjectIDList = [];
            for (var i = 0; i < MonitoringFeatures.length; i++) {
                var attributesinfo = MonitoringFeatures[i].attributes;
                ObjectIDList.push(attributesinfo.OBJECTID);
                var stationObj;
                if (attributesinfo.Name == 'Al Qua’a') {
                    stationObj = { "Name": attributesinfo.Name, "KeyName": "EAD_AlQuaa", "attributes": attributesinfo, "geometry": MonitoringFeatures[i].geometry }
                }
                else {
                    stationObj = { "Name": attributesinfo.Name, "KeyName": stationsIDs[0][attributesinfo.Name], "attributes": attributesinfo, "geometry": MonitoringFeatures[i].geometry }
                }
                StationsObject.push(stationObj);
            }

            LoadAirQualityData();
        });

        function GetStationAttachments(AttachmentInfo) {
            var count = -1;
            Object.keys(AttachmentInfo).forEach(function (objectId) {
                count++;
                const attachmentUrl = AttachmentInfo[objectId][0].url;
                StationsObject[count].ImageUrl = attachmentUrl;
            });
        }

        function SelectedStation(response) {
            // console.log(response);
            if (response.results.length > 0) {
                var res = response.results;
                for (var j = 0; j < res.length; j++) {
                    if (res[j].layer.title == "Air Quality Index") {
                        var attrInfo = response.results[0].graphic.attributes;
                        for (var i = 0; i < StationsObject.length; i++) {
                            if (StationsObject[i].attributes.Name == attrInfo.Name) {
                                SelectedstationInfo = StationsObject[i];
                                LoadStationData(SelectedstationInfo.KeyName);
                                break
                            }
                        }
                        PreparePollutantSeriesData();
                        break;
                    }

                }


                //PreparePollutantData(SelectedstationInfo);
            }


        }

        function GetLast24HoursData() {

            try {
                $.ajax({
                    method: "GET",
                    cors: false,
                    async: false,
                    url: AirQualityService + "GetAirQualityStation",

                    success: function (r) {
                        console.log(r);
                    },
                    error: function (err) {
                        console.log(err)
                    }
                });


            } catch (e) {
                console.log(e);

            }
        }

        function PreparePollutantSeriesData() {
            var selectedStationObj;
            var SeriesArray = [];
            var dateseries = [];
            if (typeof (SelectedstationInfo) == "undefined") {
                selectedStationObj = StationsObject[0];
            }
            else {
                selectedStationObj = SelectedstationInfo;
            }
            var CoisZero = true;
            for (var i = 0; i < Pollutants.length; i++) {

                var Pollutant = Pollutants[i];
                var Pollutantdata = [];
                var data = selectedStationObj.data;
                for (let j = data.length - 1; j >= 0; j--) {

                    var PollutantValue = data[j][Pollutant];
                    Pollutantdata.push(PollutantValue)
                    if (Pollutant == "CO") {
                        if (PollutantValue > 0)
                            CoisZero = false;
                    }

                    var dateObj = moment(data[j].datetime1, 'MM/DD/YYYY h:mm:ss a').toDate();
                    dateObj = (dateObj.getTime());
                    if (dateseries.indexOf(dateObj) == -1) {
                        dateseries.push(dateObj);

                    }
                }
                if (Pollutant == "CO" && !CoisZero) {
                    SeriesArray.push({ name: Pollutant, data: Pollutantdata })
                }
                else {
                    SeriesArray.push({ name: Pollutant, data: Pollutantdata })
                }

            }
            GenerateCharts(SeriesArray, dateseries, selectedStationObj);
        }

        function GenerateCharts(SeriesArray, dateseries, selectedStationObj) {
            //Render Radial CHarts
            AQI_RadialChart(selectedStationObj);
            Pollutant_ColumnChart(SeriesArray, dateseries);
        }

        function Createpollutants() {

            const labelClass = {
                // autocasts as new LabelClass()
                symbol: {
                    type: "text", // autocasts as new TextSymbol()
                    color: "black",
                    yoffset: -20,
                    //haloColor : "dodgerblue",
                    font: {
                        // autocast as new Font()
                        family: "Cairo",
                        size: 10,
                        weight: "bold"	
                    }
                },
                labelPlacement: "above-center",
                labelExpressionInfo: {
                    expression: "$feature.AQI"
                }
            };
            var renderer = new ClassBreaksRenderer({
                field: "AQI",
				sizeOptimizationEnabled: true,
                classBreakInfos: [
                    {
                        minValue: 1,
                        maxValue: 50,
                        symbol: Indexunder50,
                        label: "< 50"
                    }, {
                        minValue: 51,
                        maxValue: 100,
                        symbol: Index51_100,
                        label: "51 - 100"
                    }, {
                        minValue: 101,
                        maxValue: 150,
                        symbol: Index101_150,
                        label: "101 - 150"
                    }, {
                        minValue: 151,
                        maxValue: 200,
                        symbol: Index151_200,
                        label: "151 - 200"
                    }, {
                        minValue: 201,
                        maxValue: 300,
                        symbol: Index201_300,
                        label: "201 - 300"
                    }, {
                        minValue: 301,
                        maxValue: 500,
                        symbol: Index301_500,
                        label: ">300"
                    }
                ]
            });

            var Featurecollection = MonitoringStationInfo;
            var pollutants =
                [{
                    name: "AQI",
                    type: "string"
                },
                {
                    name: "SO2",
                    type: "string"
                },
                {
                    name: "NO2",
                    type: "string"
                },
                {
                    name: "CO",
                    type: "string"
                },
                {
                    name: "O3",
                    type: "string"
                },
                {
                    name: "PM10",
                    type: "string"
                }
                ];

            var Fieldsarr = Featurecollection.fields.concat(pollutants);
            for (var i = 0; i < Featurecollection.features.length; i++) {
                var attr = Featurecollection.features[i].attributes
                attr.AQI = StationsObject[i].data[0].aqi;
                attr.SO2 = StationsObject[i].data[0].sO2;
                attr.NO2 = StationsObject[i].data[0].nO2;
                attr.CO = StationsObject[i].data[0].co;
                attr.O3 = StationsObject[i].data[0].o3;
                attr.PM10 = StationsObject[i].data[0].pM10;

            }
            FeatureCollectionlyr = new FeatureLayer({
                id: 'MonitoringStations',
                source: Featurecollection.features,
                title: "Air Quality Index",
                objectIdField: "OBJECTID",
                fields: Fieldsarr,
                popupTemplate: {
                    // autocasts as new PopupTemplate()
                    title: "Station:" + "{Name}",
                    content: [
                        {
                            type: "fields",
                            fieldInfos: [
                                {
                                    fieldName: "AQI",
                                    label: "AQI"
                                },
                                {
                                    fieldName: "SO2",
                                    label: "SO<sub>2</sub>"
                                },
                                {
                                    fieldName: "NO2",
                                    label: "NO<sub>2</sub>"
                                },
                                {
                                    fieldName: "CO",
                                    label: "CO"
                                },
                                {
                                    fieldName: "O3",
                                    label: "O<sub>3</sub>"
                                },
                                {
                                    fieldName: "PM10",
                                    label: "PM<sub>10</sub>"
                                }
                            ]
                        }
                    ]
                },
                outFields: ["*"],
                labelingInfo: [labelClass],
                renderer: renderer
            });
            view.map.add(FeatureCollectionlyr);
			view.popup.set("dockOptions", {
              breakpoint: false,
              buttonEnabled: false,
              position: "top-left"
            });
            FeatureCollectionlyr.visible = false;
            view.on("click", function (evt) {
                var screenPoint = evt.screenPoint;
                var opts = {
                    include: FeatureCollectionlyr
                }
                // the hitTest() checks to see if any graphics in the view
                // intersect the given screen point
                if (FeatureCollectionlyr.visible) {
                    view.hitTest(screenPoint, opts)
                        .then(SelectedStation);
                }

            });
        }

        function GetAverage(pollutantsarr) {
            var total = 0;
            var count = 0;

            jQuery.each(pollutantsarr, function (index, value) {
                total += value;
                count++;
            });
            var AvgAQI = Math.round(total / count);
            return AvgAQI;
        }

        function CreateGraphic_Region(data) {
            var Region_Loc = {
                type: "point"
            };
            for (var i = 0; i < AD_Regions.length; i++) {
                if (AD_Regions[i].Region == data.Region) {
                    Region_Loc.latitude = AD_Regions[i].Lat;
                    Region_Loc.longitude = AD_Regions[i].Long;
                    break;
                }
            }



            var pointGraphic1 = CreateGraphicSymbol(Region_Loc, data.AQI, pollutantGrpLyr_RegionLvl);


            //Add Text symbol to graphic Layer
            pollutantTextGrpLyr_Region.add(pointGraphic1);
        }
		
		function createsymbol(data)
		{
			var symbol = GetColourValue(data);
			return Symbol.ImageUrl;
			// var picSymbol = new PictureMarkerSymbol({ url: symbol.ImageUrl,width: 60, height: 60 });
			// var picgraphic=new Graphic({ geometry: Region_Point, symbol: picSymbol });
			// var textgraphic=new Graphic({ geometry: Region_Point, symbol: textSymbol });
			// //Add Text symbol to graphic Layer
			// pollutantTextGrpLyr_Region.addMany([picgraphic, textgraphic]);
		}
    });
