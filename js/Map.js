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
var pollutantGrpLyr_EmirateLvl; var FeatureCollectionlyr; var SelectedstationInfo; var selectedfeature
var view;
var zoom;
var featureLayer;
require(["esri/Map", "esri/config", "esri/renderers/ClassBreaksRenderer", "esri/views/MapView", "esri/rest/query",
    "esri/rest/support/Query", "esri/layers/GraphicsLayer", "esri/Graphic", "esri/layers/FeatureLayer", "esri/symbols/PictureMarkerSymbol",
    "esri/symbols/TextSymbol", "esri/widgets/BasemapToggle",
    "esri/widgets/Search", "esri/widgets/Expand", "esri/geometry/Extent", "esri/widgets/Popup", "esri/core/reactiveUtils", "esri/geometry/projection", "esri/geometry/SpatialReference",
    "esri/Basemap", "esri/layers/VectorTileLayer", "esri/layers/TileLayer",],

    (Map, esriConfig, ClassBreaksRenderer, MapView, query, Query,
        GraphicsLayer, Graphic, FeatureLayer, PictureMarkerSymbol, TextSymbol,
        BasemapToggle, Search, Expand, Extent, Popup, reactiveUtils, projection, SpatialReference, Basemap,
        VectorTileLayer, TileLayer,
    ) => {
        esriConfig.request.httpsDomains.push("enviroportal.ead.ae");
        //esriConfig.portalUrl = portalUrl;
        for (var i = 0; i < TrustedDomains.length; i++) {

            esriConfig.request.trustedServers.push(TrustedDomains[i]);
        }
        var uaeExtent = new Extent({
            xmin: 51.583328, // Westernmost longitude
            ymin: 22.633329, // Southernmost latitude
            xmax: 56.383329, // Easternmost longitude
            ymax: 26.083329, // Northernmost latitude
            spatialReference: { wkid: 4326 } // WGS84 spatial reference
        });


        var webmap = new Map({
            basemap: "dark-gray-vector",
            opacity: 0.5
        });


        view = new MapView({
            map: webmap,
            //center : [54.3773438,23.424076],// Centered on UAE
            extent: uaeExtent,
            zoom: 7,
            constraints: { minZoom: 7 },
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
        zoom = view.zoom
        const vtlLayer = new VectorTileLayer({
            // URL to the vector tile service
            url: "https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer"
        });
        var worldImageryLayer = new TileLayer({
            url: "https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer"
        });
        var toggleBaseMap;
        const customBasemap = new Basemap({
            baseLayers: [worldImageryLayer],
            title: "imagery",
            thumbnailUrl: "https://www.arcgis.com/sharing/rest/content/items/10df2279f9684e4a9f6a7f08febac2a9/info/thumbnail/thumbnail1584118328864.jpeg"
        });

        const toggle = new BasemapToggle({
            visibleElements: {
                title: false
            },
            view: view,
            nextBasemap: customBasemap
        });
        toggle.watch('activeBasemap', function (basemap) {
          
            if (FeatureCollectionlyr.visible === true) {
                view.zoom = view.zoom; // This effectively does nothing, might want to set a specific zoom level or remove this line
            }
            // Check if pollutantGrpLyr_RegionLvl is true
            else if (pollutantGrpLyr_RegionLvl.visible === true) {
                view.zoom = 8;
            }
            // Check if pollutantGrpLyr_EmirateLvl is visible
            else if (pollutantGrpLyr_EmirateLvl.visible === true) {
                view.zoom = 7;
            }
            
        });

        // Add widget to the top right corner of the view
        view.ui.add(toggle, "bottom-right");


        projection.load().then(function () {
            var uaeExtent3857 = projection.project(uaeExtent, new SpatialReference({ wkid: 3857 }));
            view.watch("extent", function (newValue) {
                //	if (!uaeExtent3857.contains(newValue)) {
                if (!uaeExtent3857.contains(newValue) && significantDifference(uaeExtent3857, newValue)) {
                    view.goTo({

                        target: uaeExtent3857,

                        center: uaeExtent3857.center,

                        duration: 500 // Duration of animation in milliseconds

                    }).catch(function (error) {

                        if (error.name != "AbortError") {

                            console.error(error);

                        }

                    });

                }
            });
        });
        function significantDifference(uaeExtent, newExtent) {

            // Example check: significant if the center of the new extent is outside the UAE extent

            var newCenter = newExtent.center;

            return !uaeExtent.contains(newCenter);

        }

        // Remove the default zoom buttons
        view.ui.components = [];

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
        webmap.layers.push(pollutantTextGrpLyr, pollutantGrpLyr_EmirateLvl, pollutantGrpLyr_RegionLvl, pollutantTextGrpLyr_Region);


        var previousZoomLevel = view.zoom;
        reactiveUtils.watch(
            () => [view.stationary, view.zoom],
            ([stationary, zoom]) => {
                // Only print the new zoom value when the view is stationary
                if (stationary) {
                    const newZoom = zoom
                    if (newZoom !== previousZoomLevel) {
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



                var dropdownMap = document.getElementById('stationsDropdownMap');
                var selectedCityButton = document.getElementById('selectedCity');


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

            var layer = webmap.findLayerById("AQI_1_7235");
            if (!layer.visible) {
                layer.visible = true;
            }
            else {
                layer.visible = false
            }

        });

        $("#wind").click(function (event) {
            var layer = webmap.findLayerById("18e0dd83703-layer-3");
            if (!layer.visible) {
                layer.visible = true;
            }
            else {
                layer.visible = false;
            }
        });
        $("#mapLocation").click(function (event) {
            ZoomToLocation(nearestStation);
        });

        // end changes

        let lastSelectedGraphic = null;  // This will store the last selected graphic

        $("#stationsDropdownMap").click(function (event) {
            if (!event.target.id.includes('Search')) {
                if (event.isTrigger) {
                    updateSelectedCity1('', currentStationDetails.stationName);
                    // $('.show-mapSearchList')[0].style.display = 'none'
                    // $('.Newsearch-box')[0].style.display = 'block'                
                    $(".show-mapSearchList").hide()
                    $('.Newsearch-box').show();

                } else {
                    updateSelectedCity1($(event.target).attr("data-key"), $(event.target).text());
                    currentStationDetails = stationsWithLocations.find(x => x.stationName == $(event.target).text());
                    $(".show-mapSearchList").show().html(currentStationDetails.stationName);
                    $('.Newsearch-box').hide();
                    boolrankingflag = true
                }

                var esriquery = FeatureCollectionlyr.createQuery();
                esriquery.where = "1=1";
                esriquery.returnGeometry = true;
                esriquery.outFields = ["*"];
                FeatureCollectionlyr.queryFeatures(esriquery).then(function (results) {
                    // if (lastSelectedGraphic) {
                    //     // Reset the outline of the last selected graphic symbol
                    //     lastSelectedGraphic.symbol.outline.color = [0, 0, 0, 0]; // Assuming the default outline color is transparent or matches the map
                    //     lastSelectedGraphic.symbol.outline.width = 0;
                    //     // Remove the label if it exists
                    //     view.graphics.remove(lastSelectedGraphic.labelGraphic);
                    // }
                    var classBreakInfos = [
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
                            maxValue: 1000,
                            symbol: Index301_500,
                            label: ">300"
                        }
                    ]

                    results.features.forEach(feature => {
                        // if ($(event.target).text() === feature.attributes['Name']) {
                        if (currentStationDetails.stationName === feature.attributes['Name']) {
                            view.graphics.removeAll()
                            const aqi = parseInt(feature.attributes['AQI']);
                            let selectedSymbol;
                            classBreakInfos.forEach(info => {
                                if (aqi >= info.minValue && aqi < info.maxValue) {
                                    selectedSymbol = info.symbol;
                                    selectedSymbol.outline.color = 'white';
                                    selectedSymbol.outline.width = 2;
                                }
                            });
                            // for (let i = 0; i < classBreakInfos.length; i++) {
                            //     if (parseInt(results.features[index].attributes['AQI']) > classBreakInfos[i].minValue && parseInt(results.features[index].attributes['AQI']) < classBreakInfos[i].maxValue) {
                            //         var selectedsymbol = classBreakInfos[i].symbol
                            //         selectedsymbol.outline.color = 'white'
                            //         selectedsymbol.outline.width = 2
                            //         }
                            //     }
                            const point = {
                                type: "point",
                                longitude: feature.geometry.longitude,
                                latitude: feature.geometry.latitude
                            };
                            const newGraphic = new Graphic({
                                geometry: point,
                                symbol: selectedSymbol
                            });
                            const textSymbol = {
                                type: "text",
                                color: "white",
                                haloColor: "#505050",
                                haloSize: "1px",
                                text: feature.attributes['Name'],
                                xoffset: 10,
                                yoffset: 10,
                                font: {
                                    size: 10,
                                    family: "roboto",
                                    weight: "bold"
                                }
                            };
                            const pointGraphic = new Graphic({
                                geometry: point,
                                symbol: textSymbol
                            });
                            // lastSelectedGraphic = newGraphic;
                            // lastSelectedGraphic.labelGraphic = pointGraphic;  // Store the label graphic for removal later

                            view.graphics.add(newGraphic);
                            view.graphics.add(pointGraphic);
                        }
                    });
                });

                if (!event.isTrigger) {
                    var radioButton = document.getElementById(currentStationDetails.stationId);
                    if (radioButton) {
                        boolrankingflag = false
                        radioButton.click();
                    }
                }
            }
        });

        function updateSelectedCity1(cityKey, Value) {
            ZoomToLocation(Value);           
        }

        function ZoomToLocation(searchValue) {

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
            else if (Math.round(scale) == 8) { //show graphic layers mid scale
                pollutantGrpLyr_RegionLvl.visible = true;
                pollutantTextGrpLyr_Region.visible = true;
                pollutantGrpLyr_EmirateLvl.visible = false;
                pollutantTextGrpLyr.visible = false;
                view.graphics.items.forEach(graphic => {
                    graphic.visible = false
                })
                if (typeof (FeatureCollectionlyr) != "undefined") {
                    FeatureCollectionlyr.visible = false;
                }
            }
            else if (Math.round(scale) > 8) {//show only stations infor mation at low scale level
                pollutantGrpLyr_EmirateLvl.visible = false;
                pollutantTextGrpLyr.visible = false;
                pollutantGrpLyr_RegionLvl.visible = false;
                pollutantTextGrpLyr_Region.visible = false;
                view.graphics.items.forEach(graphic => {
                    graphic.visible = true
                })
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
                    Createpollutants_EmirateLvl(aqi);
                    Createpollutants_RegionLvl();
                    Createpollutants();
                    $('.page-loader').fadeOut('slow');
                },
                error: handleApiError
            });
        }

        function Createpollutants_EmirateLvl(AQIValue) {
            // Display avaerage of lastest one hour AQI Index Value at Emirate Level
            var AbuDhabi_Point = {
                type: "point", // autocasts as new Point()
                longitude: AD_Long,
                latitude: AD_Lat
            };

            // var pointGraphic1 = CreateGraphicSymbol(AbuDhabi_Point, AQIValue, pollutantGrpLyr_EmirateLvl)
            var textSymbol = new TextSymbol({
                text: AQIValue,
                color: "#36454F",  // Choose color            

                xoffset: 0,  // Adjust as needed to center the text
                yoffset: -5,  // Adjust to shift text above the center if needed
                font: {
                    size: 10,  // Size of the font
                    family: "roboto",  // Font family
                    weight: "bold"  // Weight of the font
                }
            });
            var symbol = GetColourValue(AQIValue)
            var picSymbol = new PictureMarkerSymbol({ url: symbol.ImageUrl, width: 100, height: 100 });
            var picgraphic = new Graphic({ geometry: AbuDhabi_Point, symbol: picSymbol });
            var textgraphic = new Graphic({ geometry: AbuDhabi_Point, symbol: textSymbol });
            //Add Text symbol to graphic Layer
            pollutantTextGrpLyr.addMany([picgraphic, textgraphic]);


        }
        function Createpollutants_RegionLvl() { // Display avaerage of lastest one hour AQI Index Value at Emirate Level
            var AQData = StationsObject;
            var RegionArr = [];
            var AlAINData = [];
            var AbuDhabiData = [];
            var AlDhafraData = [];
            for (var i = 0; i < AQData.length; i++) {
                var region = AQData[i].attributes.Region.split(" ").join("").toLowerCase();
                var aqiValue = AQData[i].data[0] && AQData[i].data[0]["aqi"];

                if (aqiValue != null && aqiValue != undefined) {
                    if (region === "abudhabicapitalregion") {
                        AbuDhabiData.push(aqiValue);
                    } else if (region === "aldhafraregion") {
                        AlDhafraData.push(aqiValue);
                    } else {
                        AlAINData.push(aqiValue);
                    }
                } else {
                    console.warn(`Missing AQI data for region: ${AQData[i].attributes.Region}`);
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
                        text: RegionArr[j].AQI,
                        color: "#36454F",  // Choose color 
                        xoffset: 0,  // Adjust as needed to center the text
                        yoffset: -5,  // Adjust to shift text above the center if needed
                        font: {
                            size: 10,  // Size of the font
                            family: "roboto",  // Font family
                            weight: "bold"  // Weight of the font
                        }
                    });
                    var symbol = GetColourValue(RegionArr[j].AQI)
                    var picSymbol = new PictureMarkerSymbol({ url: symbol.ImageUrl, width: 100, height: 100 });
                    var picgraphic = new Graphic({ geometry: Region_Point, symbol: picSymbol });
                    var textgraphic = new Graphic({ geometry: Region_Point, symbol: textSymbol });
                    //Add Text symbol to graphic Layer
                    pollutantTextGrpLyr_Region.addMany([picgraphic, textgraphic]);
                }



            }

            pollutantGrpLyr_RegionLvl.visible = false;
            pollutantTextGrpLyr_Region.visible = false;
        }
        function CreateGraphicSymbol(Region_Loc, AQI, graphiclayer) {

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
                color: "#505050",
                text: "",
                xoffset: 0,
                yoffset: -5,
                font: {  // autocasts as new Font()
                    size: 10,
                    family: "roboto",
                    weight: "bold",
                    //style: "normal"
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
                if (attributesinfo.Name == "Al Qua’a") {
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

            if (response.results.length > 0) {
                var res = response.results;
                for (var j = 0; j < res.length; j++) {
                    if (res[j].layer.title == "Air Quality Index") {
                        var attrInfo = response.results[0].graphic.attributes;
                        selectedfeature = response.results[0];
                        for (var i = 0; i < StationsObject.length; i++) {
                            if (StationsObject[i].attributes.Name == attrInfo.Name) {
                                SelectedstationInfo = StationsObject[i];
                                view.graphics.removeAll()
                                currentStationDetails = stationsWithLocations.find(x => x.stationId == SelectedstationInfo.KeyName)

                                var radioButton = document.getElementById(currentStationDetails.stationId);

                                if (radioButton) {
                                    radioButton.click();  // Trigger the click event on the radio button
                                }
                                break
                            }
                        }

                        break;
                    }

                }
                var esriquery = FeatureCollectionlyr.createQuery()
                esriquery.where = "1=1";
                esriquery.returnGeometry = true;
                esriquery.outFields = ["*"];
                FeatureCollectionlyr.queryFeatures(esriquery).then(function (results) {

                    var classBreakInfos = [
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
                            maxValue: 1000,
                            symbol: Index301_500,
                            label: ">300"
                        }
                    ]
                    for (let index = 0; index < results.features.length; index++) {
                        if (selectedfeature.graphic.attributes['Name'] == results.features[index].attributes['Name']) {
                            for (let i = 0; i < classBreakInfos.length; i++) {
                                if (parseInt(results.features[index].attributes['AQI']) > classBreakInfos[i].minValue && parseInt(results.features[index].attributes['AQI']) < classBreakInfos[i].maxValue) {
                                    var selectedsymbol = classBreakInfos[i].symbol
                                    selectedsymbol.outline.color = 'white'
                                    selectedsymbol.outline.width = 2
                                    const points = {
                                        type: "point",  // autocasts as new Point()
                                        longitude: results.features[index].geometry.longitude,
                                        latitude: results.features[index].geometry.latitude
                                    };
                                    const newgraphic = new Graphic({
                                        geometry: points,
                                        symbol: selectedsymbol
                                    });
                                    const textSymbol = {
                                        type: "text",  // autocasts as new TextSymbol()
                                        color: "white",
                                        haloColor: "#505050",
                                        haloSize: "1px",
                                        text: results.features[index].attributes['Name'],
                                        xoffset: 10,
                                        yoffset: 10,
                                        font: {  // autocasts as new Font()
                                            size: 10,
                                            family: "roboto",
                                            weight: "bold"
                                        }
                                    };
                                    const point = {
                                        type: "point",  // autocasts as new Point()
                                        longitude: results.features[index].geometry.longitude,
                                        latitude: results.features[index].geometry.latitude
                                    };
                                    const pointGraphic = new Graphic({
                                        geometry: point,
                                        symbol: textSymbol
                                    });

                                    view.graphics.add(newgraphic)
                                    view.graphics.add(pointGraphic);
                                }
                            }
                        }

                    }
                })
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
                    color: "#505050",
                    yoffset: -20,
                    //haloColor : "dodgerblue",
                    font: {
                        // autocast as new Font()
                        family: "roboto",
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
                        maxValue: 1000,
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
                var attr = Featurecollection.features[i].attributes;
                var stationData = StationsObject[i].data;
                if (!stationData || stationData.length === 0) {
                    // Assign default values of 0 if stationData is null or empty
                    attr.AQI = 0;
                    attr.SO2 = 0;
                    attr.NO2 = 0;
                    attr.CO = 0;
                    attr.O3 = 0;
                    attr.PM10 = 0;
                } else {
                    attr.AQI = stationData[0].aqi;
                    attr.SO2 = stationData[0].sO2;
                    attr.NO2 = stationData[0].nO2;
                    attr.CO = stationData[0].co;
                    attr.O3 = stationData[0].o3;
                    attr.PM10 = stationData[0].pM10;
                }

            }
            FeatureCollectionlyr = new FeatureLayer({
                id: 'MonitoringStations',
                source: Featurecollection.features,
                title: "Air Quality Index",
                objectIdField: "OBJECTID",
                fields: Fieldsarr,
                popupEnabled: false,

                outFields: ["*"],
                labelingInfo: [labelClass],
                renderer: renderer
            });
            view.map.add(FeatureCollectionlyr);

            FeatureCollectionlyr.visible = false;
            view.on("click", function (evt) {
                var screenPoint = evt.screenPoint;
                var opts = {
                    include: FeatureCollectionlyr
                }
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

        function createsymbol(data) {
            var symbol = GetColourValue(data);
            return Symbol.ImageUrl;
            // var picSymbol = new PictureMarkerSymbol({ url: symbol.ImageUrl,width: 60, height: 60 });
            // var picgraphic=new Graphic({ geometry: Region_Point, symbol: picSymbol });
            // var textgraphic=new Graphic({ geometry: Region_Point, symbol: textSymbol });
            // //Add Text symbol to graphic Layer
            // pollutantTextGrpLyr_Region.addMany([picgraphic, textgraphic]);
        }
    });
