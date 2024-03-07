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
		// var dynamicMapServiceLayer = new MapImageLayer({
        //         url: "https://maps.smartgeoapps.com/server/rest/services/AQI_UAE/ImageServer",
		// 		opacity:0.5				
        //     });
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
    });
