function socialShare() {
    var fb = require("facebook");
    fb.setPermissions("email", "public_profile", "user_about_me", "basic_info");
    fb.appid = 723227414446543;
    fb.addEventListener("shareCompleted", function(e) {
        e.success;
    });
    fb.initialize();
    if (fb.loggedIn) if (fb.getCanPresentShareDialog()) fb.presentShareDialog({
        link: "http://dev.ddecor.com/collection/silky-satin"
    }); else {
        Ti.API.info("invoked share dialog 3");
        fb.presentWebShareDialog({
            link: "http://dev.ddecor.com/collection/silky-satin"
        });
    } else fb.authorize();
    fb.addEventListener("login", function(e) {
        e.success ? fb.getCanPresentShareDialog() ? fb.presentShareDialog({
            link: "http://dev.ddecor.com/collection/silky-satin"
        }) : fb.presentWebShareDialog({
            link: "http://dev.ddecor.com/collection/silky-satin"
        }) : e.cancelled && fb.loggedIn && Ti.API.info("already logged in");
    });
}

var Alloy = require("/alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.icon = require("icon");

var isNullVal = function(val) {
    return !(void 0 !== val && null != val && "" != val && !_.isEmpty(val));
};

Alloy.Globals.platformWidth = Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor;

Alloy.Globals.listWidth = parseInt(Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor - 30);

Alloy.Globals.imageWidth = parseInt(Alloy.Globals.listWidth / 2 - 5);

Alloy.Globals.bookAppoinmentWindow = false;

Alloy.Globals.isAppointmentOption = false;

Alloy.Globals.DimaginerVideo = "";

Alloy.Globals.fabricCalculatorImages = {};

Alloy.Globals.labelTitleColor = "#e64e48";

var moment = require("alloy/moment");

_ = require("alloy/underscore")._;

Alloy.Globals.currentDate = new Date();

require("mCache");

var touchEffect = require("touchEffects");

Alloy.Globals.commonUrl = require("commonUrl");

Alloy.Globals.ddecorUrl = "http://ddecor.com/";

Alloy.Globals.url = "https://eshop.ddecor.com/customapiv3/";

Alloy.Globals.ddecorPaymentUrl = "https://eshop.ddecor.com/";

var validators = require("validators").validators();

Alloy.Globals.accessToken = "";

Alloy.Globals.fb = require("facebook");

Alloy.Globals.fb.readPermissions = [ "read_stream", "email", "user_birthday", "user_about_me" ];

Alloy.Globals.fb.appid = 660703137429560;

var GA = require("analytics.google");

GA.trackUncaughtExceptions = true;

GA.optOut = false;

GA.dryRun = false;

GA.dispatchInterval = 15;

Alloy.Globals.tracker = GA.getTracker("UA-81914924-1");

GA.enableAdvertisingIdCollection = true;

var googleAnalyticsShortlist = function(productDetail, screenName) {
    Alloy.Globals.tracker.trackEvent({
        category: "Add to Shortlist",
        action: productDetail.name + "(" + productDetail.sku + ")",
        label: screenName,
        customMetric: {
            "3": 1,
            "4": productDetail.lostSale ? 1 : 0
        },
        customDimension: {
            "5": isNullVal(Ti.App.Properties.getString("GaCustomerId")) ? "0" : Ti.App.Properties.getString("GaCustomerId")
        }
    });
};

var googleAnalyticsQdsShortlist = function(productDetail, screenName) {
    Alloy.Globals.tracker.trackEvent({
        category: "Add to Shortlist",
        action: productDetail.name + "(" + productDetail.sku + ")",
        label: screenName,
        customMetric: {
            "3": 1,
            "4": 0
        },
        customDimension: {
            "5": isNullVal(Ti.App.Properties.getString("GaCustomerId")) ? "0" : Ti.App.Properties.getString("GaCustomerId")
        }
    });
};

var googleAnalyticsSearch = function(searchName) {
    Alloy.Globals.tracker.trackEvent({
        category: "Search Term",
        action: searchName,
        label: "SEARCH LISTING",
        customDimension: {
            "5": isNullVal(Ti.App.Properties.getString("GaCustomerId")) ? "0" : Ti.App.Properties.getString("GaCustomerId")
        }
    });
};

var googleAnalyticsStoreSearch = function(searchName) {
    Alloy.Globals.tracker.trackEvent({
        category: "Nearest Store",
        action: searchName,
        customDimension: {
            "5": isNullVal(Ti.App.Properties.getString("GaCustomerId")) ? "0" : Ti.App.Properties.getString("GaCustomerId")
        }
    });
};

var generateLead = function(productDetail, screenName) {
    Alloy.Globals.tracker.trackEvent({
        category: "Generate Lead",
        action: productDetail.name + "(" + productDetail.sku + ")",
        label: screenName,
        customDimension: {
            "5": isNullVal(Ti.App.Properties.getString("GaCustomerId")) ? "0" : Ti.App.Properties.getString("GaCustomerId")
        }
    });
};

var googleAnalyticsBag = function(productDetail) {
    Alloy.Globals.tracker.trackEvent({
        category: "Enhanced Ecommerce",
        action: productDetail.name + "(" + productDetail.sku + ")",
        label: "Add To Bag",
        customMetric: {
            "2": 1,
            "5": productDetail.shortlistFlag ? 1 : 0
        },
        customDimension: {
            "5": isNullVal(Ti.App.Properties.getString("GaCustomerId")) ? "0" : Ti.App.Properties.getString("GaCustomerId")
        }
    });
};

var googleAnalyticsDetail = function(productName) {
    Alloy.Globals.tracker.trackEvent({
        category: "Enhanced Ecommerce",
        action: productName,
        label: "Detail",
        customMetric: {
            "1": 1
        },
        customDimension: {
            "5": isNullVal(Ti.App.Properties.getString("GaCustomerId")) ? "0" : Ti.App.Properties.getString("GaCustomerId")
        }
    });
};

var googleAnalyticsScreen = function(screenName) {
    Alloy.Globals.tracker.trackScreen({
        screenName: screenName,
        customDimension: {
            "5": isNullVal(Ti.App.Properties.getString("GaCustomerId")) ? "0" : Ti.App.Properties.getString("GaCustomerId")
        }
    });
};

var actIndicator = null, vwActIndicator = null;

var PagingControl = function(scrollableView) {
    var dotContainer = Titanium.UI.createView({
        height: Ti.UI.SIZE,
        width: Titanium.UI.SIZE,
        layout: "horizontal"
    });
    var numberOfPages = scrollableView.getViews().length;
    var pages = [];
    for (var i = 0; numberOfPages > i; i++) {
        var page = Titanium.UI.createLabel({
            borderRadius: 3,
            width: 6,
            height: 6,
            left: 5,
            backgroundColor: "#80e7e7e7"
        });
        0 == i && (page.left = 0);
        pages.push(page);
        dotContainer.add(page);
    }
    pages[scrollableView.getCurrentPage()].backgroundColor = "#e65e48";
    return dotContainer;
};

var reverseXhdpi = function() {
    if (Ti.Platform.displayCaps.dpi < 121) return .75;
    if (Ti.Platform.displayCaps.dpi < 161) return 1;
    if (Ti.Platform.displayCaps.dpi < 241) return 1.5;
    if (Ti.Platform.displayCaps.dpi < 321) return 2;
    if (Ti.Platform.displayCaps.dpi < 481) return 3;
    if (Ti.Platform.displayCaps.dpi < 641) return 4;
};

var hideShowView = function(viewName) {
    viewName.visible ? viewName.hide({
        animated: true
    }) : viewName.show({
        animated: true
    });
};

Alloy.Globals.webServiceCall = function(url, strCallParams, successevent_name, errorevent_name, xhrMethod, currentWindowName, mcacheparam) {
    if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
        hideLoader();
        var connectionContainer = Titanium.UI.createView({
            height: Ti.UI.FILL,
            width: Ti.UI.FILL,
            backgroundColor: "white",
            zIndex: 11
        });
        currentWindowName.add(connectionContainer);
        var subContainer = Titanium.UI.createView({
            height: Ti.UI.SIZE,
            width: Ti.UI.SIZE,
            layout: "vertical"
        });
        connectionContainer.add(subContainer);
        var connectionIcon = Titanium.UI.createLabel({
            top: "0dp",
            font: {
                fontSize: "130dp",
                fontFamily: "icomoon"
            },
            color: "#a6333333",
            text: Alloy.Globals.icon.connection
        });
        subContainer.add(connectionIcon);
        var noConnectionLbl = Titanium.UI.createLabel({
            top: "10dp",
            font: {
                fontSize: "18dp",
                fontFamily: "futura_medium_bt-webfont"
            },
            color: "#333333",
            text: "No Connection"
        });
        subContainer.add(noConnectionLbl);
        var checkConnectionLbl = Titanium.UI.createLabel({
            top: "7dp",
            font: {
                fontSize: "18dp",
                fontFamily: "futura_lt_bt_light-webfont"
            },
            color: "#333333",
            text: "Please check your internet connection"
        });
        subContainer.add(checkConnectionLbl);
        var refreshLbl = Titanium.UI.createLabel({
            height: "40dp",
            width: "40%",
            color: "#ffffff",
            backgroundColor: "#4d000000",
            top: "10dp",
            font: {
                fontSize: "13dp",
                fontFamily: "futura_medium_bt-webfont"
            },
            textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
            text: "REFRESH"
        });
        subContainer.add(refreshLbl);
        touchEffect.createTouchEffect(refreshLbl, "#a6ffffff", "#ffffff");
        refreshLbl.addEventListener("click", function(e) {
            if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
                subContainer.visible = false;
                setTimeout(function(e) {
                    subContainer.visible = true;
                }, 100);
            } else {
                getWebserviceData(url, strCallParams, successevent_name, errorevent_name, xhrMethod, mcacheparam, currentWindowName);
                currentWindowName.remove(connectionContainer);
            }
        });
    } else getWebserviceData(url, strCallParams, successevent_name, errorevent_name, xhrMethod, mcacheparam, currentWindowName);
};

var getWebserviceData = function(url, strCallParams, successevent_name, errorevent_name, xhrMethod, mcacheparam, currentWindowName) {
    var getFromCache = null;
    mcacheparam && (getFromCache = Ti.App.mCache.get(Alloy.Globals.url + url + JSON.stringify(strCallParams)));
    void 0 == mcacheparam && (mcacheparam = false);
    if (null == getFromCache || false == mcacheparam) {
        var method = xhrMethod || "POST";
        var xhr = Titanium.Network.createHTTPClient({
            username: "ddecor",
            password: "P@ssw0rd"
        });
        xhr.onload = function() {
            try {
                var data = JSON.parse(this.responseText);
                if (data.status) {
                    mcacheparam && Ti.App.mCache.put(Alloy.Globals.url + url + JSON.stringify(strCallParams), data);
                    successevent_name(data);
                } else errorevent_name(data);
            } catch (ex) {
                hideLoader();
            }
        };
        xhr.onerror = function(e) {
            hideLoader();
            var connectionContainer = Titanium.UI.createView({
                height: Ti.UI.FILL,
                width: Ti.UI.FILL,
                backgroundColor: "white",
                zIndex: 11
            });
            currentWindowName.add(connectionContainer);
            var closeLbl = Titanium.UI.createLabel({
                top: "20dp",
                right: "20dp",
                font: {
                    fontSize: "20dp",
                    fontFamily: "icomoon"
                },
                color: "#333333",
                text: Alloy.Globals.icon.close
            });
            connectionContainer.add(closeLbl);
            var subContainer = Titanium.UI.createView({
                height: Ti.UI.SIZE,
                width: Ti.UI.SIZE,
                layout: "vertical"
            });
            connectionContainer.add(subContainer);
            var connectionIcon = Titanium.UI.createLabel({
                top: "0dp",
                font: {
                    fontSize: "120dp",
                    fontFamily: "icomoon"
                },
                color: "#a6333333",
                text: Alloy.Globals.icon.serverCon
            });
            subContainer.add(connectionIcon);
            var noConnectionLbl = Titanium.UI.createLabel({
                top: "10dp",
                font: {
                    fontSize: "18dp",
                    fontFamily: "futura_medium_bt-webfont"
                },
                color: "#333333",
                text: "Can't Connect"
            });
            subContainer.add(noConnectionLbl);
            var checkConnectionLbl = Titanium.UI.createLabel({
                top: "7dp",
                font: {
                    fontSize: "18dp",
                    fontFamily: "futura_lt_bt_light-webfont"
                },
                color: "#333333",
                text: "Server Error"
            });
            subContainer.add(checkConnectionLbl);
            var tryAgain = Titanium.UI.createLabel({
                height: "40dp",
                width: "40%",
                color: "#ffffff",
                backgroundColor: "#4d000000",
                top: "10dp",
                font: {
                    fontSize: "13dp",
                    fontFamily: "futura_medium_bt-webfont"
                },
                textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                text: "TRY AGAIN"
            });
            subContainer.add(tryAgain);
            touchEffect.createTouchEffect(closeLbl, "#a6333333", "#333333");
            touchEffect.createTouchEffect(tryAgain, "#a6ffffff", "#ffffff");
            tryAgain.addEventListener("click", function(e) {
                currentWindowName.remove(connectionContainer);
                Alloy.Globals.webServiceCall(url, strCallParams, successevent_name, errorevent_name, xhrMethod, currentWindowName, mcacheparam);
            });
            closeLbl.addEventListener("click", function(e) {
                currentWindowName.remove(connectionContainer);
            });
        };
        xhr.open(method, Alloy.Globals.url + url);
        xhr.setRequestHeader("Content-Type", "application/json");
        var access_token = Ti.App.Properties.getString("access_token") || "";
        xhr.setRequestHeader("Accesstoken", access_token);
        xhr.send(strCallParams);
    } else successevent_name(getFromCache);
};

Alloy.Globals.toast = Ti.UI.createLabel({
    width: "200dp",
    height: "50dp",
    text: "Test Toast",
    borderRadius: 5,
    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
    font: {
        fontFamily: "futura_medium_bt-webfont",
        fontSize: "14dp"
    },
    zIndex: 100,
    color: "#ffffff",
    backgroundColor: "#BF000000",
    top: "60%"
});

var showAlert = function(currentWindow, msg, timeoutFlag) {
    Alloy.Globals.toast.setText(msg);
    currentWindow.add(Alloy.Globals.toast);
    timeoutFlag || setTimeout(function() {
        currentWindow.remove(Alloy.Globals.toast);
    }, 4e3);
};

var sliderImage = [];

for (var i = 1; 12 >= i; i++) sliderImage.push("/images/spinner" + i + ".png");

var sliderImageView = Titanium.UI.createImageView({
    images: sliderImage,
    width: "40",
    height: "40dp",
    repeatCount: 0,
    duration: 50,
    zIndex: 100
});

var vwLoaderContainer = Ti.UI.createView({
    zIndex: 200,
    backgroundColor: "transparent",
    top: "0dp",
    left: "0dp",
    width: Ti.UI.FILL,
    height: Ti.UI.FILL
});

var transparentContainer = Ti.UI.createView({
    backgroundColor: "#ffffff",
    top: "53dp",
    left: "0dp",
    width: Ti.UI.FILL,
    height: Ti.UI.FILL
});

vwLoaderContainer.add(transparentContainer);

var vwFullLoaderContainer = Ti.UI.createView({
    zIndex: 200,
    backgroundColor: "#ffffff",
    top: "0dp",
    left: "0dp",
    width: Ti.UI.FILL,
    height: Ti.UI.FILL
});

var vwFullTransparentLoaderContainer = Ti.UI.createView({
    zIndex: 200,
    backgroundColor: "transparent",
    top: "0dp",
    left: "0dp",
    width: Ti.UI.FILL,
    height: Ti.UI.FILL
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
    null != _parent && _parent.remove(vwLoaderContainer);
};

var showFullLoader = function(currentWindow) {
    currentWindow.add(vwFullLoaderContainer);
    sliderImageView.start();
};

var hideFullLoader = function(currentWindow) {
    var _parent = vwFullLoaderContainer.parent;
    null != _parent && _parent.remove(vwFullLoaderContainer);
};

var showTransparentLoader = function(currentWindow) {
    currentWindow.add(vwFullTransparentLoaderContainer);
    sliderImageView.start();
};

var hideTransparentLoader = function(currentWindow) {
    var _parent = vwFullTransparentLoaderContainer.parent;
    null != _parent && _parent.remove(vwFullTransparentLoaderContainer);
};

var subSliderContainer = parseInt(Alloy.Globals.platformWidth - 50);

var blockWidth = parseInt(subSliderContainer / 4);

var sliderLoaderContainer = Ti.UI.createView({
    zIndex: 200,
    backgroundColor: "#ffffff",
    left: "0dp",
    width: Ti.UI.FILL,
    height: parseInt(blockWidth + 20)
});

sliderLoaderContainer.add(sliderImageView);

var showSliderLoader = function(view) {
    sliderImageView.start();
    view.add(sliderLoaderContainer);
};

var hideSliderLoader = function(view) {
    var _parent = sliderLoaderContainer.parent;
    null != _parent && _parent.remove(sliderLoaderContainer);
};

Alloy.Globals.navWindowObject = new Array();

Alloy.Globals.navWindowObjectId = new Array();

Alloy.Globals.addWindowInNav = function(windowId, data) {
    if (Alloy.Globals.navWindowObjectId[Alloy.Globals.navWindowObjectId.length - 1] != windowId || 0 == Alloy.Globals.navWindowObjectId.length) {
        var win = Alloy.createController(windowId, data).getView();
        Alloy.Globals.navWindowObjectId.push(windowId);
        Alloy.Globals.navWindowObject.push(win);
        win.open();
        win.focus();
    }
    Ti.API.info(Alloy.Globals.navWindowObject.length + " addWindowInNav");
};

Alloy.Globals.destroyWindowInNav = function() {
    try {
        for (var i = Alloy.Globals.navWindowObject.length - 1; i >= 0; i--) {
            Alloy.Globals.navWindowObject[i].close();
            Alloy.Globals.navWindowObjectId.pop();
            Alloy.Globals.navWindowObject.pop();
        }
    } catch (exp) {}
};

Alloy.Globals.popWindowInNav = function() {
    Alloy.Globals.navWindowObjectId.pop();
    Alloy.Globals.navWindowObject.pop();
};

String.prototype.capitalize = function() {
    return this.toLowerCase().replace(/\b\w/g, function(m) {
        return m.toUpperCase();
    });
};

Alloy.Globals.getCurrentLocation = function() {
    var coord = null;
    if (Ti.Geolocation.locationServicesEnabled) {
        Ti.Geolocation.purpose = "Receive User Location";
        Titanium.Geolocation.getCurrentPosition(function(e) {
            if (!e.success || e.error) return;
            coord = e.coords;
            e.coords.longitude;
            e.coords.latitude;
            return coord;
        });
    }
    return coord;
};

var updateHeaderCartCount = function(cartCountLbl) {
    cartCountLbl.text = "";
    if (parseInt(Ti.App.Properties.getString("cartCount")) > 0 && null != Ti.App.Properties.getString("cartCount")) {
        cartCount = Ti.App.Properties.getString("cartCount");
        cartCountLbl.setVisible(true);
        cartCountLbl.setText("");
        cartCountLbl.setText(cartCount.toString());
    } else {
        cartCountLbl.setVisible(false);
        cartCountLbl.setText("");
    }
};

Alloy.Globals.GoogleAuth_module = require("googleAuth");

Alloy.Globals.googleAuth = new Alloy.Globals.GoogleAuth_module({
    clientId: "45461191390-kpt04rb432jvo8j6knrmblam3aguumc1.apps.googleusercontent.com",
    clientSecret: "Kho2IH7Z2iGMzQgLyv77scaS",
    propertyName: "googleToken",
    quiet: false,
    scope: [ "https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/user.birthday.read" ]
});

var shareImage = function(val) {
    isNullVal(Ti.App.Properties.getString("access_token")) ? Alloy.Globals.addWindowInNav("signIn") : require("com.alcoapps.socialshare").share({
        status: val,
        androidDialogTitle: "Share"
    });
};

Alloy.Globals.navigateToMyShorlistScreen = function() {
    if (Ti.App.Properties.getString("access_token")) {
        var menuOpenFlag = true;
        Alloy.Globals.addWindowInNav("myBag", {
            enableShortlist: menuOpenFlag
        });
        menuOpenFlag = null;
    } else Alloy.Globals.addWindowInNav("signIn", "myBag");
};

Alloy.createController("index");