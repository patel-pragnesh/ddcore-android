function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function hideOverFlowMenu(e) {
        Alloy.Globals.overFlowFlag && $.header.hideOverFlow();
    }
    function getAllEshop() {
        showLoader($.eshop);
        $.collectionScroll.children.length > 0 && $.collectionScroll.removeAllChildren();
        var url = Alloy.Globals.commonUrl.eshop;
        var data = {};
        var requestParams = JSON.stringify(data);
        Alloy.Globals.webServiceCall(url, requestParams, allEshopSuccessCallback, allEshopErrorCallback, "POST", $.eshop);
    }
    function allEshopSuccessCallback(response) {
        try {
            _.each(response.data.eshop, function(value, k) {
                if (0 == value.product_data.length) {
                    var blindEmpty = null;
                    blindEmpty = Alloy.createController("blindEmpty", {
                        response: value,
                        mainWindow: $.eshop
                    }).getView();
                    $.collectionScroll.add(blindEmpty);
                    blindEmpty = null;
                } else {
                    var blindTemplate = Alloy.createController("eshopTemplate", {
                        response: value,
                        mainWindow: $.eshop,
                        updateCountFn: updateCount
                    }).getView();
                    $.collectionScroll.add(blindTemplate);
                    blindTemplate = null;
                }
            });
            hideLoader($.eshop);
        } catch (ex) {
            hideLoader($.eshop);
            Ti.API.info("ex = " + ex.message);
            showAlert($.eshop, "Something went wrong...");
            setTimeout(function() {
                goToBack();
            }, 1e3);
        }
    }
    function allEshopErrorCallback(e) {
        hideLoader($.eshop);
        showAlert($.eshop, e.message);
        setTimeout(function() {
            goToBack();
        }, 1e3);
    }
    function goToBack() {
        Alloy.Globals.popWindowInNav();
        $.eshop.close();
    }
    function destroyWindow(e) {
        $.removeListener();
        $.eshop.remove($.collectionScroll);
        $.collectionScroll.removeAllChildren();
        $.destroy();
    }
    function updateCount(cartFlag) {
        $.header.updateCartCount();
        isNullVal(cartFlag) || "addTocart" == cartFlag || getAllEshop();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "eshop";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.eshop = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        backgroundColor: "#ffffff",
        id: "eshop"
    });
    $.__views.eshop && $.addTopLevelView($.__views.eshop);
    goToBack ? $.addListener($.__views.eshop, "android:back", goToBack) : __defers["$.__views.eshop!android:back!goToBack"] = true;
    updateCount ? $.addListener($.__views.eshop, "focus", updateCount) : __defers["$.__views.eshop!focus!updateCount"] = true;
    destroyWindow ? $.addListener($.__views.eshop, "close", destroyWindow) : __defers["$.__views.eshop!close!destroyWindow"] = true;
    $.__views.header = Alloy.createWidget("headerView", "widget", {
        id: "header",
        __parentSymbol: $.__views.eshop
    });
    $.__views.header.setParent($.__views.eshop);
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
    $.__views.eshop.add($.__views.collectionScroll);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.header.init({
        title: "ESTORE",
        passWindow: $.eshop
    });
    $.collectionScroll.addEventListener("click", hideOverFlowMenu);
    __defers["$.__views.eshop!android:back!goToBack"] && $.addListener($.__views.eshop, "android:back", goToBack);
    __defers["$.__views.eshop!focus!updateCount"] && $.addListener($.__views.eshop, "focus", updateCount);
    __defers["$.__views.eshop!close!destroyWindow"] && $.addListener($.__views.eshop, "close", destroyWindow);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;