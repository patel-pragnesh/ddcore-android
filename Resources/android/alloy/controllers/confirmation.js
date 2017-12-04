function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function closeView() {
        $.removeListener();
        $.close_btn.removeEventListener("click", closeView);
        $.action1.removeEventListener("click", closeView);
        $.action2.removeEventListener("click", closeConfirmation);
        windowContainer.removeEventListener("android:back", closeView);
        hideShowView($.confirmation);
        setTimeout(function() {
            windowContainer.remove($.confirmation);
            $.confirmation.removeAllChildren();
            $.destroy();
        }, 500);
    }
    function closeConfirmation() {
        void 0 != _showLoader && showLoader(windowContainer);
        Alloy.Globals.webServiceCall(requestMethod, requestParam, successCallback, errorCallback, "POST", windowContainer);
    }
    function successCallback(response) {
        hideLoader();
        _successCallback(response);
        closeView();
    }
    function errorCallback(response) {
        hideLoader();
        _errorCallback(response);
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "confirmation";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.confirmation = Ti.UI.createView({
        width: "100%",
        height: "100%",
        backgroundColor: "#231f20",
        zIndex: 11,
        id: "confirmation"
    });
    $.__views.confirmation && $.addTopLevelView($.__views.confirmation);
    $.__views.screenName = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "15dp"
        },
        left: "15dp",
        top: "0dp",
        height: "53dp",
        color: "#ffffff",
        text: "CONFIRMATION",
        id: "screenName"
    });
    $.__views.confirmation.add($.__views.screenName);
    $.__views.close_btn = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "20dp"
        },
        right: "15dp",
        width: "40dp",
        height: "53dp",
        top: "0dp",
        text: Alloy.Globals.icon.close,
        color: "#fff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "close_btn"
    });
    $.__views.confirmation.add($.__views.close_btn);
    $.__views.__alloyId314 = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId314"
    });
    $.__views.confirmation.add($.__views.__alloyId314);
    $.__views.msgContainer = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "15dp"
        },
        width: "90%",
        height: Titanium.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "#fff",
        visible: true,
        id: "msgContainer"
    });
    $.__views.__alloyId314.add($.__views.msgContainer);
    $.__views.productName = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "16dp"
        },
        width: "90%",
        color: Alloy.Globals.labelTitleColor,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "productName",
        top: "10dp"
    });
    $.__views.__alloyId314.add($.__views.productName);
    $.__views.action1 = Ti.UI.createLabel({
        bottom: "30dp",
        width: "37%",
        height: "40dp",
        color: "#ffffff",
        borderColor: "#80e7e7e7",
        borderWidth: "0.5",
        backgroundColor: "transparent",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "futura_medium_bt-webfont"
        },
        left: "10%",
        text: "NO",
        id: "action1"
    });
    $.__views.confirmation.add($.__views.action1);
    $.__views.action2 = Ti.UI.createLabel({
        bottom: "30dp",
        width: "37%",
        height: "40dp",
        color: "#ffffff",
        borderColor: "#80e7e7e7",
        borderWidth: "0.5",
        backgroundColor: "transparent",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "futura_medium_bt-webfont"
        },
        right: "10%",
        text: "YES",
        id: "action2"
    });
    $.__views.confirmation.add($.__views.action2);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = $.args;
    var requestMethod = args.requestMethod;
    var requestParam = args.requestParam;
    var _successCallback = args.successCallback;
    var _errorCallback = args.errorCallback;
    var windowContainer = args.windowContainer;
    var _showLoader = args.showLoader || void 0;
    $.msgContainer.setText(args.message);
    $.productName.setText(isNullVal(args.productName) ? args.productName : args.productName.toUpperCase());
    touchEffect.createTouchEffect($.close_btn, "#a6ffffff", "#fff");
    touchEffect.createTouchEffect($.action1, "#a6ffffff", "#fff");
    touchEffect.createTouchEffect($.action2, "#a6ffffff", "#fff");
    $.close_btn.addEventListener("click", closeView);
    $.action1.addEventListener("click", closeView);
    $.action2.addEventListener("click", closeConfirmation);
    windowContainer.addEventListener("android:back", closeView);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;