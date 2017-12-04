function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function init() {
        _getAllCollection();
    }
    function _getAllCollection() {
        showLoader($.allBlinds);
        var url = Alloy.Globals.commonUrl.allblinds;
        var data = {};
        var requestParams = JSON.stringify(data);
        Alloy.Globals.webServiceCall(url, requestParams, _allCollectionSuccessCallback, _allCollectionErrorCallback, "POST", $.allBlinds);
    }
    function _allCollectionSuccessCallback(response) {
        _.each(response.data.product_data, function(value, k) {
            if (0 == value.product_data.length) {
                var blindEmpty = Alloy.createController("blindEmpty", {
                    response: value,
                    mainWindow: $.allBlinds
                }).getView();
                $.collectionScroll.add(blindEmpty);
                blindEmpty = null;
            } else {
                var blindTemplate = Alloy.createController("blindTemplate", {
                    response: value,
                    mainWindow: $.allBlinds
                }).getView();
                $.collectionScroll.add(blindTemplate);
                blindTemplate = null;
            }
        });
        setTimeout(function() {
            hideLoader();
        }, 300);
    }
    function _allCollectionErrorCallback(response) {
        hideLoader();
        showAlert($.allBlinds, response.message);
    }
    function goToBack() {
        Alloy.Globals.popWindowInNav();
        $.allBlinds.close();
    }
    function destroyWindow(e) {
        $.allBlinds.remove($.collectionScroll);
        $.collectionScroll.removeAllChildren();
        $.removeListener();
        $.destroy();
    }
    function updateCount() {
        $.header.updateCartCount();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "blinds";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.allBlinds = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        backgroundColor: "#ffffff",
        id: "allBlinds"
    });
    $.__views.allBlinds && $.addTopLevelView($.__views.allBlinds);
    goToBack ? $.addListener($.__views.allBlinds, "android:back", goToBack) : __defers["$.__views.allBlinds!android:back!goToBack"] = true;
    updateCount ? $.addListener($.__views.allBlinds, "focus", updateCount) : __defers["$.__views.allBlinds!focus!updateCount"] = true;
    destroyWindow ? $.addListener($.__views.allBlinds, "close", destroyWindow) : __defers["$.__views.allBlinds!close!destroyWindow"] = true;
    $.__views.header = Alloy.createWidget("headerView", "widget", {
        id: "header",
        __parentSymbol: $.__views.allBlinds
    });
    $.__views.header.setParent($.__views.allBlinds);
    $.__views.collectionScroll = Ti.UI.createScrollView({
        width: Titanium.UI.FILL,
        left: "15dp",
        right: "15dp",
        layout: "vertical",
        top: "53",
        scrollType: "vertical",
        height: Titanium.UI.FILL,
        id: "collectionScroll"
    });
    $.__views.allBlinds.add($.__views.collectionScroll);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.args;
    $.header.init({
        title: "ALL BLINDS",
        passWindow: $.allBlinds
    });
    init();
    __defers["$.__views.allBlinds!android:back!goToBack"] && $.addListener($.__views.allBlinds, "android:back", goToBack);
    __defers["$.__views.allBlinds!focus!updateCount"] && $.addListener($.__views.allBlinds, "focus", updateCount);
    __defers["$.__views.allBlinds!close!destroyWindow"] && $.addListener($.__views.allBlinds, "close", destroyWindow);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;