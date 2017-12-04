function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function sendSourceData() {
        var actionLabel, mediumLabel, campaignLabel = "";
        var InstallReferrer = require("net.pixelfactor.installreferrer");
        var utmSource = InstallReferrer.getUtmSource();
        if (null != utmSource) {
            utmSource = decodeURIComponent(utmSource);
            var utmParts = utmSource.split("&");
            var utmObject = {};
            utmParts.map(function(part) {
                var currPart = part.split("=");
                utmObject[currPart[0]] = currPart[1];
                "utm_source" == currPart[0] && (actionLabel = currPart[1]);
                "utm_medium" == currPart[0] && (mediumLabel = currPart[1]);
                "utm_campaign" == currPart[0] && (campaignLabel = currPart[1]);
            });
            Ti.App.Properties.setString("actionLabel", actionLabel);
            Alloy.Globals.tracker.trackEvent({
                category: "referrer",
                action: actionLabel,
                label: mediumLabel,
                customDimension: {
                    "2": actionLabel,
                    "3": mediumLabel,
                    "4": campaignLabel
                }
            });
            Ti.App.Properties.setString("checkSource", true);
        }
        var bc = Ti.Android.createBroadcastReceiver({
            onReceived: function(e) {}
        });
        Ti.Android.registerBroadcastReceiver(bc, [ "com.android.vending.INSTALL_REFERRER" ]);
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.addWindowInNav("dashboard");
    Ti.Platform.Android && ($.index.fbProxy = Alloy.Globals.fb.createActivityWorker({
        lifecycleContainer: $.index
    }));
    null == Ti.App.Properties.getString("checkSource") && sendSourceData();
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;