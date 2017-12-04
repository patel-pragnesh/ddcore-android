// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var styleOption = [];
var coord;
var Map = require('ti.map');
var mapview;
var storeLocatorResponseData = null;
var mapViewVisible = false;
var stateFlag = true;
var stateFlag1 = true;
var stateFlag2 = true;
var fabricListLocationData = [];
var blindListLocationData = [];
var openUrlDirection;

googleAnalyticsScreen("FIND A STORE");

function fetchGeolocation(value) {
    var url = "http://maps.google.com/maps/api/geocode/json?address=" + value;
    var client = Ti.Network.createHTTPClient({
        // function called when the response data is available
        onload : function(e) {
            Ti.API.info("Received text: " + this.responseText);
            var data = JSON.parse(this.responseText);
            //Ti.API.info('data = ' + data);
            //Ti.API.info('data json = ' + JSON.stringify(data));
            // Ti.API.info('lat = '+data.results[0].geometry.location.lat);
            //  Ti.API.info('lng = '+data.results[0].geometry.location.lng);
            //Ti.API.info('data.results = ' + data.results.length);
            if (data.results.length > 0) {

                var searchGeoLocation = {
                    latitude : data.results[0].geometry.location.lat,
                    longitude : data.results[0].geometry.location.lng
                };
                getLatLan(searchGeoLocation);
            } else {
                var searchGeoLocation = {
                    latitude : 0,
                    longitude : 0
                };
                getLatLan(searchGeoLocation);
            }
        },
        // function called when an error occurs, including a timeout
        onerror : function(e) {
            Ti.API.debug(e.error);
            //alert('error');
            var searchGeoLocation = {
                latitude : 0,
                longitude : 0
            };
            getLatLan(searchGeoLocation);
        },
        timeout : 5000 // in milliseconds
    });
    // Prepare the connection.
    client.open("GET", url);
    // Send the request.
    client.send();
}

//Ti.API.info('args-->' + JSON.stringify(args));
// if (args.inStore) {
// getDirectionforInStore();
// }

// $.ListPageImageOnMap.visible = false;
$.goToPop.visible = false;
$.ListPagePop.visible = false;

$.searchField.addEventListener('return', enableSearch);

/*Blind navigation */
if (!isNullVal(args.type)) {
    if (args.type == "blinds") {
        $.storeLocators.setCurrentPage(1);
    } else if (args.type == "bedding") {
        $.storeLocators.setCurrentPage(2);
    }
}

function enableSearch() {
    //Ti.API.info('enable search clicked');
    if (mapViewVisible) {
        $.searchField.focus();
        $.map_container.visible = false;
        // $.ListPageImageOnMap.visible = false;
        $.goToPop.visible = false;
        $.ListPagePop.visible = false;

        $.findStoreMailView.visible = true;
        mapViewVisible = false;
        // $.ListPageImageOnMap.visible = false;
        $.searchField.visible = true;
        $.screenLbl.visible = false;

    } else if (($.searchField.value).length != 0) {
        tempCall($.searchField.value);
    } else {
        $.searchField.focus();
        $.searchField.visible = true;
        $.screenLbl.visible = false;

    }

    $.searchField.focus();
}

/*
 * Function: getLocation
 * ----------------------------
 *   getting current location
 *      if location gets then
 *           call store locations web service
 *      else
 * '        display message for enable store location
 *   parameters:
 */

function getLocation() {
    coord = null;
    // coord = Alloy.Globals.getCurrentLocation();
    if (Ti.Geolocation.locationServicesEnabled) {
        Ti.Geolocation.purpose = "Receive User Location";
        Titanium.Geolocation.getCurrentPosition(function(e) {
            coord = e.coords;
            // coord = {
            // latitude : 19.0760,
            // longitude : 72.8777
            // };
            //Ti.API.info('current locations ' + JSON.stringify(coord));
            if (coord != null) {

                if (args.inStore) {
                    //Ti.API.info('do nthing');
                    getDirectionforInStore();
                } else {
                    ///

                    showLoader($.findStore);
                    //now calling store locator web service
                    var param = {
                        latitude : coord.latitude,
                        longitude : coord.longitude,
                        filter : "All",
                        storetype : "All"
                    };

                    var requestMethod = Alloy.Globals.commonUrl.storeList;
                    var requestParams = JSON.stringify(param);
                    //Ti.API.info('request Param--->' + requestParams);
                    Alloy.Globals.webServiceCall(requestMethod, requestParams, _getStoreListSuccessCallback, _getStoreListErrorCallback, "POST", $.findStore);
                    ////
                }
            } else {
                coord = null;
                //display message that location is not enabled
                setTimeout(function() {
                    geolocation();
                }, 1500);
                showAlert($.findStore, "Allow location access for D'Decor app by going to Settings");

            }

        });
    } else {
        coord = null;
        setTimeout(function() {
            geolocation();
        }, 1500);
        //display message that location is not enabled
        showAlert($.findStore, "Allow location access for D'Decor app by going to Settings");

    }

}

getLocation();

/*
 * Function: _getStoreListSuccessCallback
 * ----------------------------
 *   getting current location web service success callback

 *   parameters:
 *      response--> response from server
 */

function _getStoreListSuccessCallback(response) {
    Ti.API.info('response.data.store_list.length  =' + response.data.store_list.length);
    if (response.data.store_list.length != 0) {

        if (($.searchField.value).length != 0) {
            googleAnalyticsStoreSearch($.searchField.getValue());
        }

        storeLocatorResponseData = response;
        addFilters(response.data.filters);
        //Ti.API.info('addfielter is completed');
        setStoreList(response.data.store_list);
        hideLoader();
    } else {
        Ti.API.info('inside else');
        showAlert($.findStore, "No nearby stores found, try searching another location");

        var fabricListData = [];
        $.listSection1.setItems(fabricListData);
        $.listSection2.setItems(fabricListData);
        $.listSection3.setItems(fabricListData);
        storeLocatorResponseData = null;
        hideLoader();
    }
}

/*
 * Function: _getStoreListErrorCallback
 * ----------------------------
 *   getting current location web service error callback

 *   parameters:
 *      response--> response from server
 */
function _getStoreListErrorCallback(response) {
    Ti.API.info('getStoreListErrorCallback-->' + JSON.stringify(response));
    hideLoader();
    showAlert(args.mainWindow, response.message);
}

function setStoreList(response) {
    setStoreListFabric(response);
    setStoreListBlind(response);
    setBeddingList(response);
}

/*scrolling*/

/*
 * styles
 */

var style1 = $.createStyle({
    font : {
        fontSize : "10",
        fontFamily : "futura_medium_bt-webfont"
    },
    color : "#e65e48"
});

var style = $.createStyle({
    font : {
        fontSize : "10sp",
        fontFamily : "futura_lt_bt_light-webfont"
    },
    color : "#ffffff",
});

var qtyStyle = $.createStyle({
    font : {
        fontWeight : 'bold',
        fontSize : "13dp"
    },
});
var qtyStyle1 = $.createStyle({
    font : {
        fontFamily : "futura_lt_bt_light-webfont",
        fontSize : "13dp"
    },
});

var val = reverseXhdpi();
var chkClicked = false;

$.storeLocators.addEventListener("scroll", scrollEffect);

function scrollEffect(e) {
    if (!isNaN(e.currentPageAsFloat * (Ti.Platform.displayCaps.platformWidth / 3 * val)) && chkClicked === false) {
        $.vwToAnimate.left = e.currentPageAsFloat * (Ti.Platform.displayCaps.platformWidth / (3 * val));
    }
    if ($.storeLocators.getCurrentPage() == 0) {
        $.shopingBagLbl.applyProperties(style1);
        $.reviewLbl.applyProperties(style);
        $.beddingLbl.applyProperties(style);
    } else if ($.storeLocators.getCurrentPage() == 1) {
        $.reviewLbl.applyProperties(style1);
        $.shopingBagLbl.applyProperties(style);
        $.beddingLbl.applyProperties(style);
    } else {
        $.beddingLbl.applyProperties(style1);
        $.shopingBagLbl.applyProperties(style);
        $.reviewLbl.applyProperties(style);
    }
}

/* FABRIC STORES tab selection*/

$.shopingBagLbl.addEventListener("click", toggleLabelEffect1);

function toggleLabelEffect1(e) {
    chkClicked = true;
    $.shopingBagLbl.applyProperties(style1);
    $.reviewLbl.applyProperties(style);
    $.storeLocators.scrollToView(0);
    $.vwToAnimate.animate({
        left : "0",
        duration : 200
    }, function() {
        chkClicked = false;
    });
}

/* BLIND STORES tab selection*/
$.reviewLbl.addEventListener("click", toggleLabelEffect2);

function toggleLabelEffect2(e) {
    chkClicked = true;
    $.reviewLbl.applyProperties(style1);
    $.shopingBagLbl.applyProperties(style);

    $.storeLocators.scrollToView(1);
    $.vwToAnimate.animate({
        left : "33%",
        duration : 200
    }, function() {
        chkClicked = false;
    });
}

/* bedding tab selection*/

$.beddingLbl.addEventListener("click", toggleLabelEffect3);

function toggleLabelEffect3(e) {
    chkClicked = true;
    $.beddingLbl.applyProperties(style1);
    $.shopingBagLbl.applyProperties(style);
    $.reviewLbl.applyProperties(style);

    $.storeLocators.scrollToView(2);
    $.vwToAnimate.animate({
        left : "66%",
        duration : 200
    }, function() {
        chkClicked = false;
    });
}

/* close current window */
$.closeStore.addEventListener('click', destroyWindow);

function destroyWindow(e) {
    //Ti.API.info('destroy window called');
    if (mapViewVisible) {
        if (args.inStore) {
            $.findStore.close();
        } else {

            $.map_container.visible = false;
            $.goToPop.visible = false;
            $.ListPagePop.visible = false;
            $.findStoreMailView.visible = true;
            mapViewVisible = false;
        }

    } else {
        Alloy.Globals.popWindowInNav();
        $.findStore.close();
    }
}

touchEffect.createTouchEffect($.closeStore, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.searchStore, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.ListPageIcon, "#a6877c7c", "#877c7c");
touchEffect.createTouchEffect($.goToMapIcon, "#a6877c7c", "#877c7c");

$.fabricFilterMainView.addEventListener('click', function(e) {
    //  $.sc1.setHeight("150dp");
    if (stateFlag) {
        //Ti.API.info('filter state flag true');
        $.styleDropDown.borderColor = "gray", $.styleDropDown.borderWidth = "0.6", $.styleDropDown.height = Titanium.UI.SIZE;
        $.fabricFilterMainView.height = Titanium.UI.FILL;
        $.sc1.height = Titanium.UI.SIZE;
        stateFlag = false;
    } else {
        //Ti.API.info('filter state flag false');
        //Ti.API.info('e.source.text-->' + e.source.text);
        if (e.source.text) {
            $.styleNameLbl.text = e.source.text;
            $.styleNameLbl.color = "#e65e48";
            selectedStyle = e.source.text;
            if (e.source.text == "ALL" && !isNullVal(storeLocatorResponseData)) {
                setStoreListFabric(storeLocatorResponseData.data.store_list);
            } else {
                applyFilter(e.source.id, 1);
            }
        }
        $.styleDropDown.borderColor = "transparent";
        $.styleDropDown.borderWidth = "0";
        $.styleDropDown.height = "35dp";
        $.fabricFilterMainView.height = "35dp";
        stateFlag = true;
    }
});

function goToBack() {
    //Ti.API.info('simon go back called :p');
    //Ti.API.info('current fabricFilterMainView height' + $.fabricFilterMainView.getHeight());
    if ($.fabricFilterMainView.getHeight() == "fill") {
        $.styleDropDown.borderColor = "transparent";
        $.styleDropDown.borderWidth = "0";
        $.styleDropDown.height = "35dp";
        $.fabricFilterMainView.height = "35dp";
        stateFlag = true;
    } else if ($.blindsFilterMainView.getHeight() == "fill") {
        $.styleDropDown1.borderColor = "transparent";
        $.styleDropDown1.borderWidth = "0";
        $.styleDropDown1.height = "35dp";
        $.blindsFilterMainView.height = "35dp";
        stateFlag1 = true;
    } else if (mapViewVisible) {
        //Ti.API.info('we are here');
        $.map_container.visible = false;
        $.goToPop.visible = false;
        $.ListPagePop.visible = false;
        $.findStoreMailView.visible = true;
        mapViewVisible = false;

    } else {
        Alloy.Globals.popWindowInNav();
        $.findStore.close();
    }
}

$.blindsFilterMainView.addEventListener('click', function(e) {
    // $.styleScroll.setHeight("150dp");
    if (stateFlag1) {
        //Ti.API.info('filter state flag true');
        $.styleDropDown1.borderColor = "gray", $.styleDropDown1.borderWidth = "0.6", $.styleDropDown1.height = Titanium.UI.SIZE;
        $.blindsFilterMainView.height = Titanium.UI.FILL;
        $.styleScroll.height = Titanium.UI.SIZE;
        stateFlag1 = false;
    } else {
        //Ti.API.info('filter state flag false');
        //Ti.API.info('e.source.text-->' + e.source.text);
        if (e.source.text) {
            $.styleNameLbl1.text = e.source.text;
            $.styleNameLbl1.color = "#e65e48";
            selectedStyle = e.source.text;
            if (e.source.text == "ALL" && !isNullVal(storeLocatorResponseData)) {
                setStoreListBlind(storeLocatorResponseData.data.store_list);
            } else {
                applyFilter(e.source.id, 2);
            }
        }
        $.styleDropDown1.borderColor = "transparent";
        $.styleDropDown1.borderWidth = "0";
        $.styleDropDown1.height = "35dp";
        $.blindsFilterMainView.height = "35dp";
        stateFlag1 = true;
    }
});

/*TODO*/
$.beddingFilterMainView.addEventListener('click', function(e) {
    //Ti.API.info('click');
    //$.beddingstyleScroll.setHeight("150dp");
    if (stateFlag2) {
        Ti.API.info('filter state flag true');
        $.styleDropDown2.borderColor = "gray";
        $.styleDropDown2.borderWidth = "0.6";
        $.styleDropDown2.height = Titanium.UI.SIZE;
        $.beddingFilterMainView.height = Titanium.UI.FILL;
        $.beddingstyleScroll.height = Titanium.UI.SIZE;
        stateFlag2 = false;
    } else {
        //Ti.API.info('filter state flag false');
        //Ti.API.info('e.source.text-->' + e.source.text);
        if (e.source.text) {
            $.styleNameLbl2.text = e.source.text;
            $.styleNameLbl2.color = "#e65e48";
            selectedStyle = e.source.text;
            if (e.source.text == "ALL" && !isNullVal(storeLocatorResponseData)) {
                setBeddingList(storeLocatorResponseData.data.store_list);
            } else {
                applyFilter(e.source.id, 3);
            }
        }
        $.styleDropDown2.borderColor = "transparent";
        $.styleDropDown2.borderWidth = "0";
        $.styleDropDown2.height = "35dp";
        $.beddingFilterMainView.height = "35dp";
        stateFlag2 = true;
    }
});

function addFilters(filters) {

    var styleOption = [];
    $.sc1.removeAllChildren();
    $.styleScroll.removeAllChildren();
    $.beddingstyleScroll.removeAllChildren();
    _.each(filters, function(value, k) {
        if (k == 0) {
            $.styleNameLbl.text = value.toUpperCase();
        }
        styleOption[k] = Ti.UI.createLabel({
            width : Ti.UI.FILL,
            height : "35dp",
            left : "10dp",
            right : "10dp",
            color : "#333333",
            font : {
                fontSize : "10dp",
                fontFamily : "futura_medium_bt-webfont"
            },
            //text : value.toUpperCase(),
            text : value.toUpperCase(),
            id : value.toUpperCase(),
            backgroundColor : "#ffffff",
        });

        if (value == "EBO") {
            styleOption[k].setText(("Exclusive stores").toUpperCase());
        } else if (value == "MBO") {
            styleOption[k].setText(("Authorized dealers").toUpperCase());
        }

        $.sc1.add(styleOption[k]);

    });

    // now adding blind fabric stores filters
    var styleOption1 = [];
    _.each(filters, function(value, k) {
        if (k == 0) {
            $.styleNameLbl1.text = value.toUpperCase();
        }
        styleOption1[k] = Ti.UI.createLabel({
            width : Ti.UI.FILL,
            height : "35dp",
            left : "10dp",
            right : "10dp",
            color : "#333333",
            font : {
                fontSize : "10dp",
                fontFamily : "futura_medium_bt-webfont"
            },
            text : value.toUpperCase(),
            id : value.toUpperCase(),
            backgroundColor : "#ffffff",
        });

        if (value == "EBO") {
            styleOption1[k].setText(("Exclusive stores").toUpperCase());
        } else if (value == "MBO") {
            styleOption1[k].setText(("Authorized dealers").toUpperCase());
        }

        $.styleScroll.add(styleOption1[k]);

    });

    //bedding

    var styleOption2 = [];
    _.each(filters, function(value, k) {
        if (k == 0) {
            $.styleNameLbl2.text = value.toUpperCase();
        }
        styleOption2[k] = Ti.UI.createLabel({
            width : Ti.UI.FILL,
            height : "35dp",
            left : "10dp",
            right : "10dp",
            color : "#333333",
            font : {
                fontSize : "10dp",
                fontFamily : "Futura Md BT"
            },
            text : value.toUpperCase(),
            id : value.toUpperCase(),
            backgroundColor : "#ffffff",

        });

        if (value == "EBO") {
            styleOption2[k].setText(("Exclusive stores").toUpperCase());
        } else if (value == "MBO") {
            styleOption2[k].setText(("Authorized dealers").toUpperCase());
        }

        $.beddingstyleScroll.add(styleOption2[k]);

    });

}

/*----------fabric store list item selection ----------------*/
$.fabricListContainer.addEventListener('itemclick', pinCurrentPoint);
$.blindsListContainer.addEventListener('itemclick', pinCurrentPoint);
$.beddingListContainer.addEventListener('itemclick', pinCurrentPoint);

function pinCurrentPoint(e) {
    
    if (!isNullVal(e)) {
        //Ti.API.info('bindID' + e.bindId);
        var currentBindID = isNullVal(e.bindId) ? "" : (e.bindId).toLowerCase();
        //Ti.API.info('currentBindID' + currentBindID);
        if (currentBindID == "getdirection") {
            var a = e.section.items[e.itemIndex];
            //Ti.API.info('here we have to directly open direction' + "\t" + a.properties.latitude + "\t" + a.properties.longitude);
            Ti.Platform.openURL("http://maps.google.com/?q=" + a.properties.latitude + "," + a.properties.longitude + "");

        } else {
            var a = e.section.items[e.itemIndex];

            Ti.API.info('a.properties' + JSON.stringify(a.properties));

            // var inStoreAnnotation1 = Map.createAnnotation({
                // latitude : a.properties.latitude,
                // longitude : a.properties.longitude,
                // title : a.properties.title,
                // subtitle : a.properties.subtitle,
                // //rightButton : "/images/arrowIcon.png",
                // image : (a.properties.merchant_type == "EBO" ? '/images/ebo_pin.png' : '/images/mbo_pin.png'),
                // //pincolor : Map.ANNOTATION_RED, //ANNOTATION_GREEN
                // myid : 0 // Custom property to uniquely identify this annotation.
            // });
// 
            // mapview = Map.createView({
                // mapType : Map.NORMAL_TYPE,
                // region : {
                    // // latitude : coord.latitude, //33.74511,
                    // // longitude : coord.longitude, //-84.38993,
                    // latitude : a.properties.latitude, //33.74511,
                    // longitude : a.properties.longitude, //-84.38993,
                    // latitudeDelta : 0.01,
                    // longitudeDelta : 0.01
                // },
                // animate : true,
                // regionFit : true,
                // annotations : [inStoreAnnotation1],
            // });
            mapview.selectAnnotation(a.properties.title);
            //$.map_container.add(mapview);
            // mapview.addEventListener('complete', function() {
            // mapview.selectAnnotation(a.properties.title);
            // });

            mapview.setRegion({
                animate : true,
                latitude : a.properties.latitude, //33.74511,
                longitude : a.properties.longitude, //-84.38993,
                latitudeDelta : 0.01,
                longitudeDelta : 0.01

            });
            openUrlDirection = "http://maps.google.com/?q=" + a.properties.latitude + "," + a.properties.longitude + "";
            $.map_container.visible = true;
            // $.ListPageImageOnMap.visible = true;
            $.goToPop.visible = true;
            $.ListPagePop.visible = true;

            $.findStoreMailView.visible = false;
            mapViewVisible = true;
        }

    }
}

function getDirectionforInStore() {
    /*TODO*/

    var inStoreAnnotation = Map.createAnnotation({
        latitude : args.storeInfo.latitude,
        longitude : args.storeInfo.longitude,
        title : args.storeInfo.title,
        subtitle : args.storeInfo.subtitle,
        rightButton : "/images/arrowIcon.png",
        image : (args.storeInfo.merchant_type == "EBO" ? '/images/ebo_pin.png' : '/images/mbo_pin.png'),
        //pincolor : Map.ANNOTATION_RED, //ANNOTATION_GREEN
        myid : 0 // Custom property to uniquely identify this annotation.
    });
    //Ti.API.info('inStoreAnnotation-->' + JSON.stringify(inStoreAnnotation));

    mapview = Map.createView({
        mapType : Map.NORMAL_TYPE,
        region : {
            // latitude : coord.latitude, //33.74511,
            // longitude : coord.longitude, //-84.38993,
            latitude : args.storeInfo.latitude, //33.74511,
            longitude : args.storeInfo.longitude, //-84.38993,
            latitudeDelta : 0.01,
            longitudeDelta : 0.01
        },
        animate : true,
        regionFit : true,
        annotations : [inStoreAnnotation],
    });

    $.map_container.add(mapview);
    mapview.selectAnnotation(args.storeInfo.title);

    //mapview.selectAnnotation(a.properties.title);
    mapview.setRegion({
        animate : true,
        latitude : args.storeInfo.latitude, //33.74511,
        longitude : args.storeInfo.longitude, //-84.38993,
        latitudeDelta : 0.01,
        longitudeDelta : 0.01

    });

    //mapview.fireEvent("click");
    mapview.addEventListener('click', function(e) {
        //Ti.API.info('mapView called');
        if (!isNullVal(e)) {
            // Ti.API.info('current e data is' + JSON.stringify(e));
            //Ti.API.info('e click source' + e.clicksource);
        }
        if (e.clicksource != 'pin') {
            Ti.Platform.openURL("http://maps.google.com/?q=" + e.annotation.latitude + "," + e.annotation.longitude + "");
        }
        openUrlDirection = "http://maps.google.com/?q=" + e.annotation.latitude + "," + e.annotation.longitude + "";
    });
    $.map_container.visible = true;
    // $.ListPageImageOnMap.visible = false;
    $.goToPop.visible = false;
    $.ListPagePop.visible = false;

    $.findStoreMailView.visible = false;
    mapViewVisible = true;

}

/*
 * Function: applyFilter
 * ----------------------------
 *  applying filter to store data
 */

function applyFilter(filter, type) {
    //Ti.API.info('apply filter to' + JSON.stringify(storeLocatorResponseData.data.store_list));
    if (!isNullVal(storeLocatorResponseData)) {
        var newData = _.where(storeLocatorResponseData.data.store_list, {
            'merchant_type' : filter
        });
        if (type == 1) {
            setStoreListFabric(newData);
        } else if (type == 2) {
            setStoreListBlind(newData);
        } else {
            setBeddingList(newData);
        }
    }
}

/*
 * Function: setStoreListFabric
 * ----------------------------
 * parameters :
 *      response --> fabric list data
 *  display fabric store list data
 */
function setStoreListFabric(response) {
    var storeList = response;
    var fabricListData = [];
    fabricListLocationData = [];
    var emptyFabricList = true;

    $.listSection1.setItems(fabricListData);

    _.each(storeList, function(value, k) {
        //add data in perspective stores
        if (value.store_type == "FABRIC") {
            emptyFabricList = false;
            if (!isNaN(value.latitude) && !isNaN(value.longitude)) {
                fabricListData.push({
                    properties : {
                        latitude : value.latitude,
                        longitude : value.longitude,
                        title : value.store_name,
                        subtitle : value.store_address,
                       // merchant_type : value.merchant_type,//add on 26/04/2017
                    },
                    headerTitle : {
                        text : (value.store_name).toUpperCase(),
                    },
                    locationKm : {
                        // text : (value.distance_in_km).toFixed(2) + " km",

                        // text : (value.distance_in_km)

                        text : value.distance_in_km,

                    },
                    subTitle : {
                        text : (value.merchant_type == "EBO" ? "EXCLUSIVE" : "")
                    },
                    address : {
                        text : (value.store_address || "").capitalize()
                    },
                    getDirection : {
                        latitude : value.latitude,
                        longitude : value.longitude
                    }
                });
                fabricListLocationData.push(Map.createAnnotation({
                    // rightView : Titanium.UI.createImageView({
                    // image : "/images/arrowIcon.png",
                    // height : 25,
                    // width : 40
                    // }),
                    latitude : value.latitude,
                    longitude : value.longitude,
                    title : value.store_name,
                    subtitle : value.store_address,
                    image : (value.merchant_type == "EBO" ? '/images/ebo_pin.png' : '/images/mbo_pin.png'),
                    myid : k,
                    rightView : Titanium.UI.createImageView({
                        image : "/images/arrowIcon.png",
                        height : 25,
                        width : 40
                    }),
                    height : 100,
                    width : 50,
                    borderColor : 'red',
                    overflow : 'hidden',

                }));
            }

        }
    });
    if (emptyFabricList) {
        fabricListData.push({
            properties : {

            },
            template : 'emptyTemplate1',
            message : {
                text : "There is no store available for your location"
            }
        });
    }
    $.listSection1.appendItems(fabricListData);

    //add elements to map
    //Ti.API.info('fabricListLocationData' + JSON.stringify(fabricListLocationData));
    createMapAnnotations();

    /* -- main MAP container add the coordinate of current locations*/

    // var concatenatedMapLocations = fabricListLocationData.concat(blindListLocationData);
    // mapview = Map.createView({
    // mapType : Map.NORMAL_TYPE,
    // region : {
    // latitude : coord.latitude, //33.74511,
    // longitude : coord.longitude, //-84.38993,
    // latitudeDelta : 0.01,
    // longitudeDelta : 0.01
    // },
    // animate : true,
    // regionFit : true,
    // annotations : concatenatedMapLocations,
    // });

    $.map_container.add(mapview);
}

function createMapAnnotations() {

    var concatenatedMapLocations = fabricListLocationData.concat(blindListLocationData);
    mapview = Map.createView({
        mapType : Map.NORMAL_TYPE,
        showsTraffic : true,
        showsCompass : true,
        showsBuildings : true,
        region : {
            latitude : coord.latitude, //33.74511,
            longitude : coord.longitude, //-84.38993,
            latitudeDelta : 0.01,
            longitudeDelta : 0.01
        },
        animate : true,
        regionFit : true,
        annotations : concatenatedMapLocations,
    });

    mapview.addEventListener('click', function(e) {
        //Ti.API.info('mapView called');
        if (!isNullVal(e)) {
            // Ti.API.info('current e data is' + JSON.stringify(e));
            //Ti.API.info('e click source' + e.clicksource);
        }
        if (e.clicksource != 'pin') {
            Ti.Platform.openURL("http://maps.google.com/?q=" + e.annotation.latitude + "," + e.annotation.longitude + "");
        }
        openUrlDirection = "http://maps.google.com/?q=" + e.annotation.latitude + "," + e.annotation.longitude + "";
    });

}

/*
 * Function: setStoreListBlind
 * ----------------------------
 * parameters :
 *      response --> blind list data
 *  display blind store list data
 */

function setStoreListBlind(response) {
    // Ti.API.info('set stringlist blind'+JSON.stringify(response));
    var storeList = response;
    var blindListData = [];
    blindListLocationData = [];
    var emptyBlindList = true;

    $.listSection2.setItems(blindListData);
    _.each(storeList, function(value, k) {
        //add data in perspective stores
        //Ti.API.info('in k' + k);
        if (!isNaN(value.latitude) && !isNaN(value.longitude)) {

            // if (value.store_type != "FABRIC") {
            if (value.store_type == "BLIND") {
                emptyBlindList = false;
                blindListData.push({
                    properties : {
                        latitude : value.latitude,
                        title : value.store_name,
                        subtitle : value.store_address,
                        longitude : value.longitude,
                       // merchant_type : value.merchant_type,//add on 26/04/2017
                    },
                    headerTitle : {
                        text : (value.store_name).toUpperCase(),
                    },
                    locationKm : {
                        // text : (value.distance_in_km).toFixed(2) + " km",
                        text : value.distance_in_km,
                    },
                    subTitle : {
                        text : (value.merchant_type == "EBO" ? "EXCLUSIVE" : "")
                    },
                    address : {
                        text : (value.store_address || "").capitalize()
                    },
                    getDirection : {
                        latitude : value.latitude,
                        longitude : value.longitude
                    }
                });
                blindListLocationData.push(Map.createAnnotation({
                    latitude : value.latitude, //33.74511,
                    longitude : value.longitude, //-84.38993,
                    title : value.store_name,
                    subtitle : value.store_address,
                    image : (value.merchant_type == "EBO" ? '/images/ebo_pin.png' : '/images/mbo_pin.png'),
                    // rightButton : "/images/arrowIcon.png",
                    myid : k // Custom property to uniquely identify this annotation.
                }));
            }
        }
    });
    if (emptyBlindList) {
        blindListData.push({
            properties : {
            },
            template : 'emptyTemplate',
            message : {
                text : "There is no store available for your location"
            }
        });
    }
    $.listSection2.appendItems(blindListData);
    createMapAnnotations();

    //add elements to map
    // var concatenatedMapLocations = fabricListLocationData.concat(blindListLocationData);
    // mapview = Map.createView({
    // mapType : Map.NORMAL_TYPE,
    // region : {
    // latitude : coord.latitude, //33.74511,
    // longitude : coord.longitude, //-84.38993,
    // latitudeDelta : 0.01,
    // longitudeDelta : 0.01
    // },
    // animate : true,
    // regionFit : true,
    // //userLocation : true,
    // annotations : concatenatedMapLocations,
    // });
    $.map_container.add(mapview);
}

/*TODO*/
/*new bedding list added*/
function setBeddingList(response) {

    Ti.API.info('**********into bedding list function');

    var storeList = response;

    // var blindListData = [];
    // blindListLocationData = [];

    var beddingListData = [];
    beddingListLocationData = [];

    var emptyBlindList = true;

    $.listSection3.setItems(beddingListData);
    _.each(storeList, function(value, k) {
        //add data in perspective stores
        if (value.store_type == "BEDDING") {
            emptyBlindList = false;
            beddingListData.push({
                properties : {
                    latitude : value.latitude,
                    title : value.store_name,
                    subtitle : value.store_address,
                    longitude : value.longitude,
                   // merchant_type : value.merchant_type,//add on 26/04/2017
                },
                headerTitle : {
                    text : (value.store_name).toUpperCase(),
                },
                locationKm : {
                    //  text : (value.distance_in_km).toFixed(2) + " km",
                    text : value.distance_in_km,
                },
                subTitle : {
                    text : (value.merchant_type == "EBO" ? "EXCLUSIVE" : "")
                },
                address : {
                    text : (value.store_address || "").capitalize()
                },
                getDirection : {
                    latitude : value.latitude,
                    longitude : value.longitude
                }
            });
            beddingListLocationData.push(Map.createAnnotation({
                latitude : value.latitude, //33.74511,
                longitude : value.longitude, //-84.38993,
                title : value.store_name,
                subtitle : value.store_address,
                image : (args.merchant_type == "EBO" ? '/images/ebo_pin.png' : '/images/mbo_pin.png'),

                // pincolor : Map.ANNOTATION_GREEN,
                rightButton : "images/arrowIcon.png",
                myid : k // Custom property to uniquely identify this annotation.
            }));
        }
    });
    if (emptyBlindList) {
        beddingListData.push({
            properties : {
            },
            template : 'emptyTemplate',
            message : {
                text : "There is no store available for your location"
            }
        });
    }
    $.listSection3.appendItems(beddingListData);

    //add elements to map
    createMapAnnotations();
    $.map_container.add(mapview);
}

/****/

/*-----------search functionality started-------------*/
$.searchField.addEventListener('change', searchStore);
function searchStore(e) {
    //Ti.API.info('enable search clicked');
    if (mapViewVisible) {
        $.map_container.visible = false;
        // $.ListPageImageOnMap.visible = false;
        $.goToPop.visible = false;
        $.ListPagePop.visible = false;

        $.findStoreMailView.visible = true;
        mapViewVisible = false;
        $.searchField.visible = true;
        $.screenLbl.visible = false;
        $.searchField.focus();
    } else {
        var state_array = "Andhra Pradesh|Arunachal Pradesh|Assam|Bihar|Chhattisgarh|Goa|Gujarat|Haryana|Himachal Pradesh|Jammu and Kashmir|Jharkhand|Karnataka|Kerala|Madhya Pradesh|Maharashtra|Manipur|Meghalaya|Mizoram|Nagaland|Odisha(Orissa)|Punjab|Rajasthan|Sikkim|Tamil Nadu|Tripura|Uttar Pradesh|Uttarakhand|West Bengal|Bhandup|Mumbai|Visakhapatnam|Coimbatore|Delhi|Bangalore|Pune|Nagpur|Lucknow|Vadodara|Indore|Jalalpur|Bhopal|Kolkata|Kanpur|New Delhi|Faridabad|Rajkot|Ghaziabad|Chennai|Meerut|Agra|Jaipur|Jabalpur|Varanasi|Allahabad|Hyderabad|Noida|Howrah|Thane|Patiala|Chakan|Ahmedabad|Manipala|Mangalore|Panvel|Udupi|Rishikesh|Gurgaon|Mathura|Shahjahanpur|Bagpat|Sriperumbudur|Chandigarh|Ludhiana|Palakkad|Kalyan|Valsad|Ulhasnagar|Bhiwani|Shimla|Dehradun|Patna|Unnao|Tiruvallur|Kanchipuram|Jamshedpur|Gwalior|Karur|Erode|Gorakhpur|Ooty|Haldwani|Bikaner|Puducherry|Nalbari|Bellary|Vellore|Naraina|Mandi|Rupnagar|Jodhpur|Roorkee|Aligarh|Indraprast|Karnal|Tanda|Amritsar|Raipur|Pilani|Bilaspur|Srinagar|Guntur|Kakinada|Warangal|Tirumala - Tirupati|Nizamabad|Kadapa|Kuppam|Anantpur|Nalgonda|Potti|Nellore|Rajahmundry|Bagalkot|Kurnool|Secunderabad|Mahatma|Bharuch|Miraj|Nanded|Anand|Gandhinagar|Bhavnagar|Morvi|Aurangabad|Modasa|Patan|Solapur|Kolhapur|Junagadh|Akola|Bhuj|Karad|Jalgaon Jamod|Chandrapur|Maharaj|Dhule|Ponda|Dahod|Navsari|Panjim|Patel|Nashik|Amravati|Somnath|Ganpat|Karwar|Davangere|Raichur|Nagara|Kushalnagar|Hassan|Hubli|Bidar|Belgaum|Mysore|Dharwad|Kolar|TumkÅ«r|Tiruchi|Thiruvananthapuram|Kozhikode|Thrissur|Madurai|Thalassery|Kannur|Karaikudi|Thanjavur|Manor|Idukki|Thiruvarur|Alappuzha|Gandhigram|Kochi|Annamalainagar|Amet|Kottarakara|Kottayam|Tirunelveli|Mohan|Salem|Attingal|Chitra|Chengannur|Guwahati|Kalam|Ranchi|Shillong|Gangtok|Srikakulam|Tezpur|Bhubaneswar|Imphal|Sundargarh|Arunachal|Manipur|Bihar Sharif|Mandal|Dibrugarh|Darbhanga|Gaya|Bhagalpur|Kunwar|Barddhaman|Jadabpur|Kalyani|Cuttack|Barpeta|Jorhat|Kharagpur|Medinipur|Agartala|Saranga|Machilipatnam|Dhanbad|Silchar|Dumka|Kokrajhar|Bankura|Jalpaiguri|Durgapur|Kalinga|Palampur|Jammu|Dwarka|Faridkot|Udaipur|Raigarh|Hisar|Solan|Ajmer|Lala|Gurdaspur|Sultanpur|Jhansi|Vidisha|Jagdalpur|Dipas|Sawi|Etawah|Saharanpur|Ujjain|Kangra|Bhilai|Rohtak|Haryana|Ambala|Bareilly|Bhoj|Kapurthala Town|Sangrur|Pusa|Sagar|Rewa|Bhawan|Rampur|Bhadohi|Cuddalore|Khopoli|Bali|Bhiwandi|Vasai|Badlapur|Sambalpur|Raurkela|Brahmapur|Visnagar|Surendranagar|Ankleshwar|Dahanu|Silvassa|Jamnagar|Dhansura|Muzaffarpur|Wardha|Bodhan|Parappanangadi|Malappuram|Vizianagaram|Mavelikara|Pathanamthitta|Satara|Janjgir|Gold|Himatnagar|Bodinayakkanur|Gandhidham|Mahabalipuram|Nadiad|Virar|Bahadurgarh|Kaithal|Siliguri|Tiruppur|Ernakulam|Jalandhar|Barakpur|Kavaratti|Ratnagiri|Moga|Hansi|Sonipat|Bandra|Aizawl|Itanagar|Nagar|Ghatkopar|Chen|Powai|Bhimavaram|Bhongir|Medak|Karimnagar|Narsapur|Vijayawada|Markapur|Mancherial|Sangli|Moradabad|Alipur|Ichalkaranji|Devgarh|Yavatmal|Hinganghat|Madgaon|Verna|Katra|Bilaspur|Uttarkashi|Muktsar|Bhatinda|Pathankot|Khatauli|Vikasnagar|Kollam|Kovilpatti|Kovvur|Paloncha|Vasco|Alwar|Bijapur|Tinsukia|Ratlam|Kalka|Ladwa|Rajpura|Batala|Hoshiarpur|Katni|Bhilwara|Jhajjar|Lohaghat|Mohali|Dhuri|Thoothukudi|Sivakasi|Coonoor|Shimoga|Kayamkulam|Namakkal|Dharmapuri|Aluva|Antapur|Tanuku|Eluru|Balasore|Hingoli|Quepem|Assagao|Betim|Cuncolim|Ahmednagar|Goa|Caranzalem|Chopda|Petlad|Raipur|Villupuram|Shoranur|Dasua|Gonda|Yadgir|Palladam|Nuzvid|Kasaragod|Paonta Sahib|Sarangi|Anantapur|Kumar|Kaul|Panipat|Uppal|Teri|Tiruvalla|Jamal|Chakra|Narasaraopet|Dharamsala|Ranjan|Garhshankar|Haridwar|Chinchvad|Narela|Aurangabad|Sion|Kalamboli|Chittoor|Wellington|Nagapattinam|Karaikal|Pollachi|Thenkasi|Aranmula|Koni|Ariyalur|Ranippettai|Kundan|Lamba Harisingh|Surana|Ghana|Lanka|Kataria|Kotian|Khan|Salt Lake City|Bala|Vazhakulam|Paravur|Nabha|Ongole|Kaladi|Jajpur|Thenali|Mohala|Mylapore|Bank|Khammam|Ring|Maldah|Kavali|Andheri|Baddi|Mahesana|Nila|Gannavaram|Cumbum|Belapur|Phagwara|Rander|Siuri|Bulandshahr|Bilimora|Guindy|Pitampura|Baharampur|Dadri|Boisar|Shiv|Multi|Bhadath|Ulubari|Palghar|Puras|Sikka|Saha|Godhra|Dam Dam|Ekkattuthangal|Sahibabad|Kalol|Bardoli|Wai|Shirgaon|Nehra|Mangalagiri|Latur|Kottakkal|Rewari|Ponnani|Narayangaon|Hapur|Kalpetta|Khurja|Ramnagar|Neral|Sendhwa|Talegaon Dabhade|Kargil|Manali|Jalalabad|Palani|Sirkazhi|Krishnagiri|Hiriyur|Muzaffarnagar|Kashipur|Gampalagudem|Siruseri|Manjeri|Raniganj|Mahim|Bhusawal|Tirur|Sattur|Angul|Puri|Khurda|Dharavi|Ambur|Vashi|Arch|Colaba|Hosur|Kota|Hugli|Anantnag|Murshidabad|Jharsuguda|Jind|Neyveli|Vaniyambadi|Srikalahasti|Liluah|Pali|Bokaro|Sidhi|Asansol|Darjeeling|Kohima|Shahdara|Chandannagar|Nadgaon|Haripad|Sitapur|Vapi|Bambolim|Baidyabati|Connaught Place|Singtam|Shyamnagar|Sikar|Choolai|Mayapur|Puruliya|Habra|Kanchrapara|Goregaon|Tiptur|Kalpakkam|Serampore|Konnagar|Port Blair|Canning|Mahad|Alibag|Pimpri|Panchgani|Karjat|Vaikam|Mhow|Lakhimpur|Madhoganj|Kheri|Gudivada|Avanigadda|Nayagarh|Bemetara|Bhatapara|Ramgarh|Dhubri|Goshaingaon|Bellare|Puttur|Narnaul|Porbandar|Keshod|Dhrol|Kailaras|Morena|Deolali|Banda|Orai|Fatehpur|Mirzapur|Adilabad|Pithapuram|Ramavaram|Amalapuram|Champa|Ambikapur|Korba|Pehowa|Yamunanagar|Shahabad|Hamirpur|Gulbarga|Sagar|Bhadravati|Sirsi|Honavar|Siruguppa|Koppal|Gargoti|Kankauli|Jalna|Parbhani|Koraput|Barpali|Jaypur|Banswara|Tindivanam|Mettur|Srirangam|Deoria|Basti|Padrauna|Budaun|Bolpur|Gujrat|Balurghat|Binnaguri|Guruvayur|Chandauli|Madikeri|Piduguralla|Vinukonda|Berasia|Sultans Battery|Ramanagaram|Angadipuram|Mattanur|Gobichettipalayam|Banga|Sibsagar|Namrup|North Lakhimpur|Dhenkanal|Karanja|Cheyyar|Vandavasi|Arakkonam|Tiruvannamalai|Akividu|Tadepallegudem|Madanapalle|Puttur|Edavanna|Kodungallur|Marmagao|Sanquelim|Sakri|Shahdol|Satna|Thasra|Bundi|Kishangarh|Firozpur|Kot Isa Khan|Barnala|Sunam|Pithoragarh|Jaspur|Jhargram|Dimapur|Churachandpur|Raxaul|Motihari|Munger|Purnea|Mannargudi|Kumbakonam|Eral|Nagercoil|Kanniyakumari|Ramanathapuram|Sivaganga|Rajapalaiyam|Srivilliputhur|Suratgarh|Gohana|Sirsa|Fatehabad|Nurpur|Chamba|Khergam|Dindigul|Pudukkottai|Kaimganj|Tarn Taran|Khanna|Irinjalakuda|Sehore|Parra|Dicholi|Chicalim|Saligao|Changanacheri|Igatpuri|Sangamner|Ganganagar|Kanhangad|Chidambaram|Chittur|Nilambur|Arvi|Jalesar|Kasganj|Chandausi|Beawar|Bharatpur|Kathua|Chalisgaon|Karamsad|Peranampattu|Arani|Payyanur|Pattambi|Pattukkottai|Pakala|Vikarabad|Bhatkal|Rupnarayanpur|Kulti|Koch Bihar|Nongstoin|Budbud|Balangir|Kharar|Mukerian|Mansa|Punalur|Mandya|Nandyal|Dhone|Candolim|Aldona|Solim|Daman|Koothanallur|Sojat|Alanallur|Kagal|Jhunjhunun|Sirhind|Kurali|Khinwara|Machhiwara|Talwandi Sabo|Malpur|Dhar|Medarametla|Pileru|Yercaud|Ottappalam|Alangulam|Palus|Chiplun|Durg|Damoh|Ambarnath|Haveri|Mundgod|Mandvi|Behala|Fort|Bela|Balana|Odhan|Mawana|Firozabad|Bichpuri|Almora|Pauri|Azamgarh|Phaphamau|Nongpoh|Gangrar|Jhalawar|Nathdwara|Jaisalmer|Pushkar|Sirohi|Baroda|Ambah|Ambejogai|Ambad|Osmanabad|Betalbatim|Gangapur|Dindori|Yeola|Pandharpur|Neri|Umred|Patelguda|Patancheru|Singarayakonda|Peddapuram|Gadag|ChikmagalÅ«r|Chikodi|Amer|Chintamani|Tambaram|Palayam|Karamadai|Omalur|Kuzhithurai|Faizabad|Thirumangalam|Kodaikanal|Devipattinam|Dharapuram|Rudrapur|Talcher|Haldia|Karsiyang|Sandur|Bapatla|Shamsabad|Kandi|Ramapuram|Anchal|Trimbak|Calangute|Arpora|Khargone|Mandla|Kalan|Pachmarhi|Dhamtari|Kumhari|Aundh|Tala|Tuljapur|Botad|Sidhpur|Sanand|Nagwa|Mussoorie|Vadamadurai|Sholavandan|Pochampalli|Perundurai|Lalgudi|Ponneri|Mount Abu|Vadner|Shanti Grama|Nalagarh|Pahalgam|Dinanagar|Jatani|Ganga|Barmer|Hoshangabad|Khajuraho Group of Monuments|Betul|Sangola|Tirumala|Mirza Murad|Attur|Budha|Pala|Tonk|Koni|Rajpur|Shrigonda|Hazaribagh|Nagaur|Mandapeta|Nabadwip|Nandurbar|Nazira|Kasia|Bargarh|Kollegal|Shahkot|Jagraon|Channapatna|Madurantakam|Kamalpur|Ranaghat|Mundra|Mashobra|Rama|Chirala|Bawana|Dhaka|Mahal|Chitradurga|Mandsaur|Dewas|Sachin|Andra|Kalkaji Devi|Pilkhuwa|Mehra|Chhachhrauli|Samastipur|Bangaon|Ghatal|Jayanti|Belgharia|Kamat|Dhariwal|Morinda|Kottagudem|Suriapet|Mahesh|Sirwani|Kanakpura|Mahajan|Sodhi|Chand|Nagal|Hong|Raju|Tikamgarh|Parel|Jaynagar|Mill|Khambhat|Ballabgarh|Begusarai|Shahapur|Banka|Golaghat|Palwal|Kalra|Chandan|Maru|Nanda|Chopra|Kasal|Rana|Chetan|Charu|Arora|Chhabra|Bishnupur|Manu|Karimganj|Ellora Caves|Adwani|Amreli|Soni|Sarwar|Balu|Rawal|Darsi|Nandigama|Mathan|Panchal|Jha Jha|Hira|Manna|Amal|Kheda|Abdul|Roshan|Bhandari|Binavas|Hari|Nandi|Rajapur|Suman|Sakri|Khalapur|Dangi|Thiruthani|Bawan|Basu|Kosamba|Medchal|Kakdwip|Kamalpura|Dogadda|Charan|Basirhat|Nagari|Kangayam|Sopara|Nadia|Mahulia|Alipur|Hamirpur|Fatehgarh|Bagh|Naini|Karari|Ajabpur|Jaunpur|Iglas|Pantnagar|Dwarahat|Dasna|Mithapur|Bali|Nilokheri|Kolayat|Haripur|Dang|Chhota Udepur|Matar|Sukma|Guna|Dona Paula|Navelim|Vainguinim|Curchorem|Balaghat|Bhagwan|Vijapur|Sinnar|Mangaon|Hadadi|Bobbili|Yanam|Udaigiri|Balanagar|Kanigiri|Muddanuru|Panruti|Proddatur|Puliyur|Perambalur|Turaiyur|Tiruchchendur|Shadnagar|Markal|Sultan|Rayagada|Kaniyambadi|Vandalur|Sangam|Katoya|Gudur|Farakka|Baramati|Tohana";
        state_array = state_array.split("|");

        //remove same cities
        var newState_array = state_array.filter(function(item, pos) {
            return state_array.indexOf(item) == pos;
        });

        if (e.value.length > 2) {
            var searchListData = [];
            $.searchStoreListSection.setItems(searchListData);
            searchString = firstToUpperCase(e.value);
            var matches = _.filter(newState_array, function(s) {
                return s.indexOf(searchString) !== -1;
            });
            _.each(matches, function(value, k) {
                searchListData.push({
                    properties : {
                        word : value,

                    },
                    searchListItemBindID : {
                        text : value,
                    },
                });
            });
            $.searchStoreMainViewContainer.visible = true;
            $.searchStoreListSection.appendItems(searchListData);

        } else {
            var searchListData = [];
            $.searchStoreListSection.setItems(searchListData);
            $.searchStoreMainViewContainer.visible = false;
        }
    }

}

function firstToUpperCase(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}

$.searchStoreList.addEventListener('itemclick', getLocationFromString);
function getLocationFromString(e) {
    //Ti.API.info('getLocationFromString ' + JSON.stringify(e));
    var a = e.section.items[e.itemIndex];
    //Ti.API.info('a is ' + JSON.stringify(a));

    $.searchField.blur();
    $.searchField.value = a.properties.word;
    showLoader($.findStore);

    // Titanium.Geolocation.forwardGeocoder(a.properties.word, getLatLan);
    fetchGeolocation(a.properties.word);

}

$.findStore.addEventListener('click', function(e) {
    if (e.source.type != "textField") {
        $.searchField.blur();
    }
});

function getLatLan(e) {
    $.searchStoreMainViewContainer.visible = false;
    //Ti.API.info('getting data in latLanFunction ' + JSON.stringify(e));
    var currentLatitude = "" + e.latitude;
    var currentLongitude = "" + e.longitude;
    //Ti.API.info('current lat and log' + currentLatitude + "\t" + currentLongitude);
    var param = {
        latitude : currentLatitude,
        longitude : currentLongitude,
        filter : "All",
        storetype : "All"
    };

    var requestMethod = Alloy.Globals.commonUrl.storeList;
    var requestParams = JSON.stringify(param);
    //Ti.API.info('request Param--->' + requestParams);
    Alloy.Globals.webServiceCall(requestMethod, requestParams, _getStoreListSuccessCallback, _getStoreListErrorCallback, "POST", $.findStore);

}

$.ListPagePop.addEventListener('click', function() {
    $.map_container.visible = false;
    // $.ListPageImageOnMap.visible = false;
    $.goToPop.visible = false;
    $.ListPagePop.visible = false;

    $.findStoreMailView.visible = true;
    mapViewVisible = false;
});

$.goToPop.addEventListener('click', function() {
    // here we have to get lat and long from selected annotation from map
    //Ti.API.info('get lat and long');
    Ti.Platform.openURL(openUrlDirection);
});

function geolocation() {

    Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS, function(e) {
        if (e.success) {
            //Ti.Media.requestCameraPermissions();
            Ti.Media.requestCameraPermissions(function(e) {
                if (e.success) {
                    // setDashboardData(homePageData);
                    getLocation();
                }
            });
        } else {
            Ti.Media.requestCameraPermissions();
        }
    });

    Ti.Media.requestCameraPermissions(function(e) {
        if (e.success) {
            getLocation();
            // setDashboardData(homePageData);
        }
    });
}

//setTimeout(function(){ geolocation(); }, 2000);

// var hasLocationPermissions = Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS);
// Ti.API.info('hasLocationPermissions = '+hasLocationPermissions);
//
// if (!hasLocationPermissions) {
// Ti.API.info('in if');
// Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS, function(e) {
// if (e.success) {
// //Ti.Media.requestCameraPermissions();
// Ti.Media.requestCameraPermissions(function(e) {
// if (e.success) {
// // setDashboardData(homePageData);
// getLocation();
// }
// });
// } else {
// Ti.Media.requestCameraPermissions();
// }
// });
// // return alert('You already have permission.');
// }

function tempCall(value) {
    Ti.API.info('we are here ' + value);
    var searchString = firstToUpperCase(value);
    //Titanium.Geolocation.forwardGeocoder(searchString, getLatLan);
    fetchGeolocation(searchString);
    $.searchField.value = value;
    $.searchStoreMainViewContainer.visible = false;
    $.searchField.blur();
    showLoader($.findStore);

}

function clearMemory() {
    storeLocatorResponseData = null;
    $.removeListener();

    $.findStore.remove($.header);
    $.findStore.remove($.map_container);
    $.findStore.remove($.findStoreMailView);
    $.findStore.remove($.searchStoreMainViewContainer);
    $.findStore.remove($.ListPagePop);
    $.findStore.remove($.goToPop);

    $.header.removeAllChildren();
    $.map_container.removeAllChildren();
    $.findStoreMailView.removeAllChildren();
    $.searchStoreMainViewContainer.removeAllChildren();
    $.ListPagePop.removeAllChildren();
    $.goToPop.removeAllChildren();

    $.destroy();

}

