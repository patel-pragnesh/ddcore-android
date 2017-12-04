// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

//require globally icon file to access every where

Alloy.Globals.icon = require('icon');

var isNullVal = function(val) {
    if (val === undefined || val == null || val == "" || _.isEmpty(val))
        return true;
    else
        return false;
};

Alloy.Globals.platformWidth = Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor;

Alloy.Globals.listWidth = parseInt((Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor) - 30);

Alloy.Globals.imageWidth = parseInt((Alloy.Globals.listWidth / 2) - 5);
Alloy.Globals.bookAppoinmentWindow = false;
Alloy.Globals.isAppointmentOption = false;
Alloy.Globals.DimaginerVideo = "";
Alloy.Globals.fabricCalculatorImages={};

Alloy.Globals.labelTitleColor = "#e64e48";
var moment = require('alloy/moment');
_ = require("alloy/underscore")._;
Alloy.Globals.currentDate = new Date();
// = new Date();//(moment().format("YYYY,MM,DD")).toString();

/*
 * require mcache
 */
require('mCache');
//Ti.App.mCache.initCache(12);
//Ti.App.mCache.trunc();
var touchEffect = require('touchEffects'); 

Alloy.Globals.commonUrl = require('commonUrl');

//Alloy.Globals.url = "http://192.168.10.171/index.php/customapiv1/";
//Alloy.Globals.url = "https://ddcormage.php-dev.in/magento/index.php/customapi/";
//Alloy.Globals.url = "http://ddcormage.php-dev.in/index.php/customapi/";
//Alloy.Globals.url = "http://dev.ddecor.com/index.php/customapiv1/";

//Alloy.Globals.url = "http://eshop.ddecor.com/customapiv1/";
//Alloy.Globals.ddecorUrl = "http://ddecor.com/";

//Alloy.Globals.url = "http://dev.ddecor.com/customapiv1/";

// for version v2m
// //Alloy.Globals.ddecorPaymentUrl = "https://ww2.ddecor.com/customapiv2/";
 
//development
////Alloy.Globals.url ="http://dev.ddecor.com/customapiv2/";
// Alloy.Globals.url ="http://dev.ddecor.com/customapiv3/"; //was in use for devlopment
//Alloy.Globals.url ="https://ww2.ddecor.com/customapiv3/";
  
 Alloy.Globals.ddecorUrl = "http://ddecor.com/";
// Alloy.Globals.ddecorPaymentUrl = "http://dev.ddecor.com/"; //was in use for devlopment
 
//development=====================================================

//live production ==================================================

Alloy.Globals.url ="https://eshop.ddecor.com/customapiv3/"; 
//Alloy.Globals.ddecorUrl = "https://www.ddecor.com/";
Alloy.Globals.ddecorPaymentUrl = "https://eshop.ddecor.com/";

//live production==================================================

// ww2
// Alloy.Globals.url ="https://ww2.ddecor.com/customapiv3/";
// 
// Alloy.Globals.ddecorUrl = "https://ww2.ddecor.com/";
// Alloy.Globals.ddecorPaymentUrl = "https://ww2.ddecor.com/";

//ww2

// Alloy.Globals.url = "http://ww2.ddecor.com/customapiv1/";
// Alloy.Globals.ddecorUrl = "http://ddecor.com/";



// Alloy.Globals.url = "http://eshop.ddecor.com/customapiv1/";
// Alloy.Globals.ddecorUrl = "http://eshop.ddecor.com/";

// Alloy.Globals.url = "http://eshop1.ddecor.com/customapiv1/";
// Alloy.Globals.ddecorUrl = "http://eshop1.ddecor.com/";

// Alloy.Globals.url = "http://192.168.10.172/customapiv1/";
// Alloy.Globals.ddecorUrl = "http://192.168.10.172/";

//Alloy.Globals.url = "http://192.168.10.171/customapiv1/";
//Alloy.Globals.ddecorUrl = "http://192.168.10.171/";

var validators = require("validators").validators();
Alloy.Globals.accessToken = "";

Alloy.Globals.fb = require('facebook');
Alloy.Globals.fb.readPermissions = ['read_stream', 'email','user_birthday','user_about_me'];
//Alloy.Globals.fb.appid = 723227414446543;
Alloy.Globals.fb.appid = 660703137429560;

/*
 * require google Analytics
 */
// var ga = require('ti.ga');
// ga.setOptOut(false);
// ga.setDebug(true);
// ga.setTrackUncaughtExceptions(true);
// ga.setDispatchInterval(10);
// 
// Alloy.Globals.tracker = ga.createTracker({
    // //trackingId : 'UA-75487166-1',
    // //trackingId : 'UA-78966879-1',
    // trackingId : 'UA-81914924-1',
    // useSecure : true,
    // debug : true,
    // //trackUncaughtExceptions : true,
// });


// Ti.API.info('ga method-->' + JSON.stringify(ga));
//var ecomGA = require("analytics.google");
// var ecomTracker = ecomGA.getTracker("UA-81914924-1"); 

// ecomTracker.trackTransaction({
    // transactionId: "123456",
    // affiliation: "Store",
    // revenue: 24.99 * 0.7,
    // tax: 0.6,
    // shipping: 0,
    // currency: "CAD"
// });

// new updated module ==============================
var GA = require('analytics.google');

GA.trackUncaughtExceptions = true; // ios only
// if you wanted to disable analytics across the entire app, you would set optOut to true
GA.optOut = false;
// set dryRun to true if you are debugging and don't want to capture data (default is true)
GA.dryRun = false;
// Data collected using the Google Analytics SDK for Android is stored locally before being
// dispatched on a separate thread to Google Analytics.
// By default, data is dispatched from the Google Analytics SDK for Android every 30 minutes.
GA.dispatchInterval = 15; // minutes

//Ti.API.info("USING TRACKING ID: " + Alloy.CFG.trackingId)
Alloy.Globals.tracker = GA.getTracker("UA-81914924-1");
GA.enableAdvertisingIdCollection = true;

// development tracker code : UA-87958715-1
// production tracker code : UA-81914924-1

var googleAnalyticsShortlist = function(productDetail,screenName) {
    
    Alloy.Globals.tracker.trackEvent({
        category: "Add to Shortlist",
        action: productDetail.name+"("+productDetail.sku+")",
        label: screenName,
        customMetric: {
            "3": 1,
            "4": ((productDetail.lostSale)?1:0)    
        },
        customDimension : {
            "5" : (!isNullVal(Ti.App.Properties.getString("GaCustomerId")))?Ti.App.Properties.getString("GaCustomerId"):"0",
        }
    });

};

var googleAnalyticsQdsShortlist = function(productDetail,screenName) { // for all collection qds & look qds
    //Ti.API.info('productDetail = '+productDetail+" screenname ="+screenName);
    
    Alloy.Globals.tracker.trackEvent({
        category: "Add to Shortlist",
        action: productDetail.name+"("+productDetail.sku+")",
        label: screenName,
        customMetric: {
            "3": 1,
            "4": 0    
        },
        customDimension : {
            "5" : (!isNullVal(Ti.App.Properties.getString("GaCustomerId")))?Ti.App.Properties.getString("GaCustomerId"):"0",
        }
    });

};
 

var googleAnalyticsSearch = function(searchName) {
    
    Alloy.Globals.tracker.trackEvent({
        category: "Search Term",
        action: searchName,
        label: "SEARCH LISTING",
        customDimension : {
            "5" : (!isNullVal(Ti.App.Properties.getString("GaCustomerId")))?Ti.App.Properties.getString("GaCustomerId"):"0",
        }
    });

};

var googleAnalyticsStoreSearch = function(searchName) {
    
    Alloy.Globals.tracker.trackEvent({
        category: "Nearest Store",
        action: searchName,
        customDimension : {
            "5" : (!isNullVal(Ti.App.Properties.getString("GaCustomerId")))?Ti.App.Properties.getString("GaCustomerId"):"0",
        }
    });

};

var generateLead = function(productDetail,screenName) {
    
    Alloy.Globals.tracker.trackEvent({
        category: "Generate Lead",
        action: productDetail.name+"("+productDetail.sku+")",
        label: screenName,
        customDimension : {
            "5" : (!isNullVal(Ti.App.Properties.getString("GaCustomerId")))?Ti.App.Properties.getString("GaCustomerId"):"0",
        }
    });

};
 

var googleAnalyticsBag = function(productDetail) {
  //  Ti.API.info('productDetail = '+JSON.stringify(productDetail));
    Alloy.Globals.tracker.trackEvent({
        category : "Enhanced Ecommerce",
        action : productDetail.name+"("+productDetail.sku+")",
        label: "Add To Bag",
        customMetric: {
            "2": 1,
            "5": ((productDetail.shortlistFlag)?1:0)    
        },
        customDimension : {
            "5" : (!isNullVal(Ti.App.Properties.getString("GaCustomerId")))?Ti.App.Properties.getString("GaCustomerId"):"0",
        }
    });
};


var googleAnalyticsDetail = function(productName) {
    Alloy.Globals.tracker.trackEvent({
        category : "Enhanced Ecommerce",
        action : productName,
        label: "Detail",
        customMetric: {
            "1": 1
        },
        customDimension : {
            "5" : (!isNullVal(Ti.App.Properties.getString("GaCustomerId")))?Ti.App.Properties.getString("GaCustomerId"):"0",
        }
    });
};

var googleAnalyticsScreen = function(screenName){
    
    Alloy.Globals.tracker.trackScreen({
        screenName :  screenName,
        customDimension : {
            "5" : (!isNullVal(Ti.App.Properties.getString("GaCustomerId")))?Ti.App.Properties.getString("GaCustomerId"):"0",
        }
    });
};

var actIndicator = null,
    vwActIndicator = null;

/*
 * Manage and update paging control
 */
var PagingControl = function(scrollableView) {

    var dotContainer = Titanium.UI.createView({
        height : Ti.UI.SIZE,
        width : Titanium.UI.SIZE,
        layout : "horizontal"
    });

    var numberOfPages = scrollableView.getViews().length;

    var pages = [];

    for (var i = 0; i < numberOfPages; i++) {
        var page = Titanium.UI.createLabel({
            borderRadius : 3,
            width : 6,
            height : 6,
            left : 5,
            backgroundColor : "#80e7e7e7",
        });
        if (i == 0) {
            page.left = 0;
        }
        pages.push(page);
        dotContainer.add(page);
    }
    //$.pageControlContainer.add(dotContainer);
    pages[scrollableView.getCurrentPage()].backgroundColor = "#e65e48";

    return dotContainer;
};

var reverseXhdpi = function() {
    if (Ti.Platform.osname === "android") {
        if (Ti.Platform.displayCaps.dpi < 121) {
            return 0.75;
        }
        if (Ti.Platform.displayCaps.dpi < 161) {
            return 1;
        } else if (Ti.Platform.displayCaps.dpi < 241) {
            return 1.5;
        } else if (Ti.Platform.displayCaps.dpi < 321) {
            return 2;
        } else if (Ti.Platform.displayCaps.dpi < 481) {
            return 3;
        } else if (Ti.Platform.displayCaps.dpi < 641) {
            return 4;
        }
    } else {
        return 1;
    }

};

/*
 * Hide and show view
 */

var hideShowView = function(viewName) {
    if (viewName.visible) {
        viewName.hide({
            animated : true
        });

    } else {
        viewName.show({
            animated : true
        });
    }
};

/**
 * @name webServiceCall
 * @param string url
 * @param {Object} strCallParams
 * @param {Object} successevent_name
 * @param {Object} errorevent_name
 * @param string xhrMethod
 * @param {Object} currentWindowName
 * @description : HTTP POST request is sent from this function.
 */
Alloy.Globals.webServiceCall = function(url, strCallParams, successevent_name, errorevent_name, xhrMethod, currentWindowName, mcacheparam) {

    //function webServiceCall(requestMethod, strCallParams, successevent_name, errorevent_name, xhrMethod) {
    //Ti.API.info('strCallParams= ' + strCallParams);
    //var method = xhrMethod || "POST";

    if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
        hideLoader();
        var connectionContainer = Titanium.UI.createView({
            height : Ti.UI.FILL,
            width : Ti.UI.FILL,
            backgroundColor : "white",
            zIndex : 11
        });
        currentWindowName.add(connectionContainer);
        var subContainer = Titanium.UI.createView({
            height : Ti.UI.SIZE,
            width : Ti.UI.SIZE,
            layout : "vertical"
        });
        connectionContainer.add(subContainer);
        var connectionIcon = Titanium.UI.createLabel({
            top : "0dp",
            font : {
                fontSize : "130dp",
                fontFamily : "icomoon"
            },
            color : "#a6333333",
            text : Alloy.Globals.icon.connection
        });
        subContainer.add(connectionIcon);
        var noConnectionLbl = Titanium.UI.createLabel({
            top : "10dp",
            font : {
                fontSize : "18dp",
                fontFamily : "futura_medium_bt-webfont"
            },
            color : "#333333",
            text : "No Connection"
        });
        subContainer.add(noConnectionLbl);
        var checkConnectionLbl = Titanium.UI.createLabel({
            top : "7dp",
            font : {
                fontSize : "18dp",
                fontFamily : "futura_lt_bt_light-webfont"
            },
            color : "#333333",
            text : "Please check your internet connection"
        });
        subContainer.add(checkConnectionLbl);
        var refreshLbl = Titanium.UI.createLabel({
            height : "40dp",
            width : "40%",
            color : "#ffffff",
            backgroundColor : "#4d000000",
            top : "10dp",
            font : {
                fontSize : "13dp",
                fontFamily : "futura_medium_bt-webfont"
            },
            textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
            text : "REFRESH"
        });
        subContainer.add(refreshLbl);

        touchEffect.createTouchEffect(refreshLbl, "#a6ffffff", "#ffffff");
        refreshLbl.addEventListener('click', function(e) {

            if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {

                subContainer.visible = false;
                setTimeout(function(e) {
                    subContainer.visible = true;
                }, 100);
            } else {

                getWebserviceData(url, strCallParams, successevent_name, errorevent_name, xhrMethod, mcacheparam, currentWindowName);
                currentWindowName.remove(connectionContainer);
                //  showLoader(currentWindowName);
            }

        });

    } else {

        getWebserviceData(url, strCallParams, successevent_name, errorevent_name, xhrMethod, mcacheparam, currentWindowName);

    }
};

// setInterval(function(e){
// Ti.App.mCache.trunc();
// },300000);//600000
var getWebserviceData = function(url, strCallParams, successevent_name, errorevent_name, xhrMethod, mcacheparam, currentWindowName) {
    //function getWebserviceData(url, strCallParams, successevent_name, errorevent_name, xhrMethod,mcacheparam,currentWindowName){

    var getFromCache = null;

    if (mcacheparam) {
        getFromCache = Ti.App.mCache.get(Alloy.Globals.url + url + JSON.stringify(strCallParams));
    }

    //getFromCache = Ti.App.mCache.get(Alloy.Globals.url + url);

    //Ti.API.info('getFromCache =' + JSON.stringify(getFromCache));

    //Ti.API.info('mcacheparam ' + mcacheparam);
    if (mcacheparam == undefined)
        mcacheparam = false;
    if (getFromCache == null || mcacheparam == false) {
        var method = xhrMethod || "POST";
        var xhr = Titanium.Network.createHTTPClient({
            username : "ddecor",
            password : "P@ssw0rd" // for eshop
            
            //password : "P@ss123!@#" // for dev
            
            //live 
            
            
            
        });
        xhr.onload = function() {
            try {

               //Ti.API.info('WS response---->' + this.responseText);
                var data = JSON.parse(this.responseText);

                if (data.status) {
                    if (mcacheparam) {
                        Ti.App.mCache.put(Alloy.Globals.url + url + JSON.stringify(strCallParams), data);
                        //Ti.App.mCache.put(Alloy.Globals.url + url, data);

                    }
                    successevent_name(data);
                    //successevent_name(getFromCache);
                } else {
                    errorevent_name(data);
                }

            } catch(ex) {
                hideLoader();

                // Ti.API.info('ex===' + JSON.stringify(ex.message));
            }

        };

        xhr.onerror = function(e) {
            //Ti.API.info('into WS error');
            // Ti.API.info('on error' + JSON.stringify(e));
            hideLoader();

            var connectionContainer = Titanium.UI.createView({
                height : Ti.UI.FILL,
                width : Ti.UI.FILL,
                backgroundColor : "white",
                zIndex : 11
            });
            currentWindowName.add(connectionContainer);
            var closeLbl = Titanium.UI.createLabel({
                top : "20dp",
                right : "20dp",
                font : {
                    fontSize : "20dp",
                    fontFamily : "icomoon"
                },
                color : "#333333",
                text : Alloy.Globals.icon.close,
            });
            connectionContainer.add(closeLbl);
            var subContainer = Titanium.UI.createView({
                height : Ti.UI.SIZE,
                width : Ti.UI.SIZE,
                layout : "vertical"
            });
            connectionContainer.add(subContainer);
            var connectionIcon = Titanium.UI.createLabel({
                top : "0dp",
                font : {
                    fontSize : "120dp",
                    fontFamily : "icomoon"
                },
                color : "#a6333333",
                text : Alloy.Globals.icon.serverCon
            });
            subContainer.add(connectionIcon);
            var noConnectionLbl = Titanium.UI.createLabel({
                top : "10dp",
                font : {
                    fontSize : "18dp",
                    fontFamily : "futura_medium_bt-webfont"
                },
                color : "#333333",
                text : "Can't Connect"
            });
            subContainer.add(noConnectionLbl);
            var checkConnectionLbl = Titanium.UI.createLabel({
                top : "7dp",
                font : {
                    fontSize : "18dp",
                    fontFamily : "futura_lt_bt_light-webfont"
                },
                color : "#333333",
                text : "Server Error"
            });
            subContainer.add(checkConnectionLbl);
            var tryAgain = Titanium.UI.createLabel({
                height : "40dp",
                width : "40%",
                color : "#ffffff",
                backgroundColor : "#4d000000",
                top : "10dp",
                font : {
                    fontSize : "13dp",
                    fontFamily : "futura_medium_bt-webfont"
                },
                textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
                text : "TRY AGAIN"
            });
            subContainer.add(tryAgain);
            touchEffect.createTouchEffect(closeLbl, "#a6333333", "#333333");
            touchEffect.createTouchEffect(tryAgain, "#a6ffffff", "#ffffff");

            tryAgain.addEventListener('click', function(e) {

                currentWindowName.remove(connectionContainer);
                //showLoader(currentWindowName);
                Alloy.Globals.webServiceCall(url, strCallParams, successevent_name, errorevent_name, xhrMethod, currentWindowName, mcacheparam);

            });
            closeLbl.addEventListener('click', function(e) {
                currentWindowName.remove(connectionContainer);
            });

        };

        xhr.open(method, Alloy.Globals.url + url);

       // Ti.API.info('send data =' +strCallParams);
      //  Ti.API.info('url = ' + Alloy.Globals.url + url);

        xhr.setRequestHeader('Content-Type', 'application/json');
        // xhr.setRequestHeader('Authorization', 'Basic YWRtaW46YWRtaW4xMjM=');

        //var access_token = Ti.App.Properties.getString("access_token") || "";
        var access_token = Ti.App.Properties.getString("access_token") || "";
        // Ti.API.info('Ti.App.Properties.getString("access_token") = ' + Ti.App.Properties.getString("access_token"));

       //  Ti.API.info('access token-->' + access_token);

        xhr.setRequestHeader("Accesstoken", access_token);
        xhr.send(strCallParams);
    } else {
        // Ti.API.info('**************Getting from cache ***********');

        successevent_name(getFromCache);

    }
};

Alloy.Globals.toast = Ti.UI.createLabel({
    width : "200dp",
    height : "50dp",
    text : "Test Toast",
    borderRadius : 5,
    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
    font : {
        fontFamily : "futura_medium_bt-webfont", //"futura_lt_bt_light-webfont",
        fontSize : "14dp"
    },
    zIndex : 100,
    color : "#ffffff",
    backgroundColor : "#BF000000", //"#73000000",
    top : "60%"//"70%",
});

var showAlert = function(currentWindow, msg, timeoutFlag) {

    //var timeOut=4000;

    Alloy.Globals.toast.setText(msg);

    currentWindow.add(Alloy.Globals.toast);

    if (!timeoutFlag) {
        setTimeout(function() {
            currentWindow.remove(Alloy.Globals.toast);
        }, 4000);
    }

};

//slider loader
var sliderImage = [];
for (var i = 1; i <= 12; i++) {
    sliderImage.push('/images/spinner' + i + '.png');
}

var sliderImageView = Titanium.UI.createImageView({
    images : sliderImage,
    width : '40',
    height : "40dp",
    repeatCount : 0,
    duration : 50,
    zIndex : 100
});

var vwLoaderContainer = Ti.UI.createView({
    zIndex : 200,
    backgroundColor : "transparent",
    // top:"53dp",
    top : "0dp",
    left : "0dp",
    width : Ti.UI.FILL,
    height : Ti.UI.FILL
});

var transparentContainer = Ti.UI.createView({
    backgroundColor : "#ffffff",
    top : "53dp",
    left : "0dp",
    width : Ti.UI.FILL,
    height : Ti.UI.FILL
});
vwLoaderContainer.add(transparentContainer);

var vwFullLoaderContainer = Ti.UI.createView({
    zIndex : 200,
    backgroundColor : "#ffffff",
    top : "0dp",
    left : "0dp",
    width : Ti.UI.FILL,
    height : Ti.UI.FILL
});

var vwFullTransparentLoaderContainer = Ti.UI.createView({
    zIndex : 200,
    backgroundColor : "transparent",
    top : "0dp",
    left : "0dp",
    width : Ti.UI.FILL,
    height : Ti.UI.FILL
});
vwFullTransparentLoaderContainer.add(sliderImageView);
transparentContainer.add(sliderImageView);
vwFullLoaderContainer.add(sliderImageView);

var showLoader = function(currentWindow) {
    currentWindow.add(vwLoaderContainer);
    sliderImageView.start();
};

var hideLoader = function(currentWindow) {
    var _parent = vwLoaderContainer.parent;
    if (_parent != null)
        _parent.remove(vwLoaderContainer);
};

var showFullLoader = function(currentWindow) {
    currentWindow.add(vwFullLoaderContainer);
    sliderImageView.start();
};
var hideFullLoader = function(currentWindow) {
    var _parent = vwFullLoaderContainer.parent;
    if (_parent != null)
        _parent.remove(vwFullLoaderContainer);
};

var showTransparentLoader = function(currentWindow) {
    currentWindow.add(vwFullTransparentLoaderContainer);
    sliderImageView.start();
};
var hideTransparentLoader = function(currentWindow) {
    var _parent = vwFullTransparentLoaderContainer.parent;
    if (_parent != null)
        _parent.remove(vwFullTransparentLoaderContainer);
};

///slider loader
var subSliderContainer = parseInt(Alloy.Globals.platformWidth - 50);
var blockWidth = parseInt(subSliderContainer / 4);

var sliderLoaderContainer = Ti.UI.createView({
    zIndex : 200,
    backgroundColor : "#ffffff",
    left : "0dp",
    width : Ti.UI.FILL,
    height : parseInt(blockWidth + 20)
});
sliderLoaderContainer.add(sliderImageView);

var showSliderLoader = function(view) {
    sliderImageView.start();
    view.add(sliderLoaderContainer);
};

var hideSliderLoader = function(view) {
    var _parent = sliderLoaderContainer.parent;

    if (_parent != null)
        _parent.remove(sliderLoaderContainer);
};

Alloy.Globals.navWindowObject = new Array();
Alloy.Globals.navWindowObjectId = new Array();
/**
 * @name : Alloy.Globals.addWindowInNav
 * @description : Adding windows in object
 */
Alloy.Globals.addWindowInNav = function(windowId, data) {

    //var win = Alloy.createController(windowId, data).getView().open();

    //Ti.API.info('Alloy.Globals.navWindowObject: ' + windowId + " : " + (Alloy.Globals.navWindowObjectId).toString());

    if (Alloy.Globals.navWindowObjectId[(Alloy.Globals.navWindowObjectId.length - 1)] != windowId || Alloy.Globals.navWindowObjectId.length == 0) {
        var win = Alloy.createController(windowId, data).getView();
        Alloy.Globals.navWindowObjectId.push(windowId);
        Alloy.Globals.navWindowObject.push(win);
        win.open();
        win.focus();
        //Ti.App.fireEvent("updateCartCount");
        /*TODO*/
        //Ti.API.info('windowId-->' + windowId);
        //Alloy.Globals.tracker.addScreenView(windowId);

    }

    Ti.API.info(Alloy.Globals.navWindowObject.length + ' addWindowInNav');

};

/**
 * @name : Alloy.Globals.destroyWindowInNav
 */
Alloy.Globals.destroyWindowInNav = function() {

    //Ti.API.info('Alloy.Globals.navWindowObject[0] = ' + Alloy.Globals.navWindowObject[0]);
    try {

        for (var i = Alloy.Globals.navWindowObject.length - 1; i >= 0; i--) {
            //Ti.API.info('Alloy.Globals.navWindowObject[' + i + '] = ' + Alloy.Globals.navWindowObject[i]);
            Alloy.Globals.navWindowObject[i].close();
            Alloy.Globals.navWindowObjectId.pop();
            Alloy.Globals.navWindowObject.pop();
        }
    } catch(exp) {
        //Ti.API.info('exp--->' + exp.message);
    }
    

    //GA.dispatch();
};

/**
 * @name : Alloy.Globals.popWindowInNav
 */
Alloy.Globals.popWindowInNav = function() {
    Alloy.Globals.navWindowObjectId.pop();
    Alloy.Globals.navWindowObject.pop();

};

/**
 Captalized all 1st letter's of String
 @how to use : string.capitalize()
 **/

// String.prototype.capitalize = function() {
// return this.charAt(0).toUpperCase() + this.slice(1);
// };

String.prototype.capitalize = function() {
    return this.toLowerCase().replace(/\b\w/g, function(m) {
        return m.toUpperCase();
    });
};

Alloy.Globals.getCurrentLocation = function() {
    var coord = null;
    //Ti.API.info('getting current geo location');
    if (Ti.Geolocation.locationServicesEnabled) {

        if (Ti.Platform.osname === "android") {
            // Ti.API.info('into android');

            Ti.Geolocation.purpose = "Receive User Location";
            Titanium.Geolocation.getCurrentPosition(function(e) {

                if (!e.success || e.error) {
                    return;
                }

                coord = e.coords;
                var longitude = e.coords.longitude;
                var latitude = e.coords.latitude;

                //  Ti.API.info("latitude: " + latitude + "longitude: " + longitude);

                return coord;

            });

        } else {
            //ios

        }
    } else {
        //  alert("Please enable location service");
    }
    return coord;
};



function socialShare() {

    var fb = require('facebook');

    fb.setPermissions('email', 'public_profile', 'user_about_me', 'basic_info');
    fb.appid = 723227414446543;

    fb.addEventListener('shareCompleted', function(e) {
        if (e.success) {
            //Ti.API.info('request succeeded.');
        } else {
            //Ti.API.warn('Failed to share.');
        }
    });

    fb.initialize();

    //    Ti.API.info('facebook --->' + fb.loggedIn);

    if (fb.loggedIn) {
        // Ti.API.info('invoked share dialog 1');
        if (fb.getCanPresentShareDialog()) {
            // Ti.API.info('invoked share dialog 2');

            fb.presentShareDialog({
                link : 'http://dev.ddecor.com/collection/silky-satin',
            });
        } else {
            Ti.API.info('invoked share dialog 3');
            fb.presentWebShareDialog({
                link : 'http://dev.ddecor.com/collection/silky-satin',

            });
        }
        // Ti.API.info('********** logged in already');
    } else {
        //Ti.API.info('******* please invoke login');

        fb.authorize();
    }

    // Ti.API.info('share******');

    fb.addEventListener('login', function(e) {
        //Ti.API.info('into fb login');
        if (e.success) {
            //Ti.API.info('into fb success');
            if (fb.getCanPresentShareDialog()) {
                fb.presentShareDialog({
                    link : 'http://dev.ddecor.com/collection/silky-satin',
                });
            } else {
                fb.presentWebShareDialog({
                    link : 'http://dev.ddecor.com/collection/silky-satin',

                });
            }

        } else if (e.cancelled) {
            if (fb.loggedIn) {

                Ti.API.info('already logged in');
            }

        } else {
            //   Ti.API.info('user has got unexpected err');

        }
    });

}

/**********/

var updateHeaderCartCount = function(cartCountLbl) {
    //function updateHeaderCartCount(cartCountLbl){
    // Ti.API.info('alloy *********** header count update*********');
    cartCountLbl.text = "";

    if (parseInt(Ti.App.Properties.getString("cartCount")) > 0 && Ti.App.Properties.getString("cartCount") != null) {
        cartCount = Ti.App.Properties.getString("cartCount");
        cartCountLbl.setVisible(true);
        cartCountLbl.setText('');
        cartCountLbl.setText(cartCount.toString());
        // Ti.API.info('cartCount.toString() =' + cartCount.toString());
        // Ti.API.info('$.cartCountLbl.get = ' + $.cartCountLbl.getText());
    } else {
        cartCountLbl.setVisible(false);
        cartCountLbl.setText("");
    }

};

////Google login

Alloy.Globals.GoogleAuth_module = require('googleAuth');

Alloy.Globals.googleAuth = new Alloy.Globals.GoogleAuth_module({
    //clientId : '219575370718-u3vb42f04899h02es4mj4uh34otgr5pe.apps.googleusercontent.com',
    clientId : '45461191390-kpt04rb432jvo8j6knrmblam3aguumc1.apps.googleusercontent.com',
    clientSecret : 'Kho2IH7Z2iGMzQgLyv77scaS',
    propertyName : 'googleToken',
    quiet : false,
    scope : ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/user.birthday.read']
});

/*-----------sharing with intent----------------*/

var shareImage = function(val) {

    if (!isNullVal(Ti.App.Properties.getString("access_token"))) {
        require('com.alcoapps.socialshare').share({
            status : val,
            androidDialogTitle : 'Share',
        });
    } else {
        Alloy.Globals.addWindowInNav("signIn");
    }

};

//@ Android Keystore Password: 123456
// Live appid: com.ddecor.digitalEstore
//Alias : ddecor

Alloy.Globals.navigateToMyShorlistScreen = function() {
    if (Ti.App.Properties.getString("access_token")) {

        var menuOpenFlag = true;
        Alloy.Globals.addWindowInNav("myBag", {
            enableShortlist : menuOpenFlag
        });
        menuOpenFlag = null;

    } else {
        Alloy.Globals.addWindowInNav("signIn", "myBag");
    }
}; 


//@ Android Keystore Password: 123456
// Live appid: com.ddecor.digitalEstore
//Alias Name :ddecor