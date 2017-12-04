function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function getBeddingdata() {
        showLoader($.beddingView);
        var url = Alloy.Globals.commonUrl.getBeddings;
        var data = {};
        var requestParams = JSON.stringify(data);
        Alloy.Globals.webServiceCall(url, requestParams, getBeddingdataSuccessCallback, getBeddingdataErrorCallback, "POST", $.beddingView);
    }
    function getBeddingdataSuccessCallback(e) {
        try {
            null != e.data.bedding[0] && setbeddingData(e.data.bedding);
            if (null != e.data.listAll[0]) {
                $.listAllLbl.heading = e.data.listAll[0].heading;
                $.listAllLbl.categoryId = e.data.listAll[0].categoryId;
                $.listAllLbl.categoryName = e.data.listAll[0].categoryName;
            }
            hideLoader($.beddingView);
        } catch (ex) {
            hideLoader($.beddingView);
            Ti.API.info("catch = " + ex.message);
        }
    }
    function getBeddingdataErrorCallback(e) {
        hideLoader($.beddingView);
    }
    function setbeddingData(beddingData) {
        _.each(beddingData, function(value, k) {
            beddingTypeContainer[k] = Ti.UI.createView({
                height: "40dp",
                top: "0dp",
                left: "0dp",
                width: Titanium.UI.FILL,
                layout: "vertical",
                id: k,
                layout: "horizontal",
                type: "beddingType",
                value: value.category,
                categoryId: value.categoryId,
                data: value.subcategories
            });
            beddingTypeLbl[k] = Ti.UI.createLabel({
                id: "lbl" + k,
                font: {
                    fontSize: "13dp",
                    fontFamily: "futura_medium_bt-webfont"
                },
                color: "#e65e48",
                top: "0dp",
                left: "0dp",
                height: "40dp",
                width: "80%",
                touchEnabled: false,
                text: value.category.toUpperCase(),
                value: value.category
            });
            forwardArrow[k] = Ti.UI.createLabel({
                id: "icon" + k,
                font: {
                    fontSize: "14dp",
                    fontFamily: "icomoon"
                },
                color: "#cccccc",
                top: "0dp",
                right: "0dp",
                height: "40dp",
                width: "18%",
                touchEnabled: false,
                textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
                text: Alloy.Globals.icon.leftArrow,
                value: value.category,
                visible: false
            });
            beddingTypeContainer[k].add(beddingTypeLbl[k]);
            if (!isNullVal(value.subcategories)) {
                beddingTypeContainer[k].add(forwardArrow[k]);
                beddingTypeContainer[k].addEventListener("touchstart", function(e) {
                    beddingTypeContainer[k].children[0].color = "#a6e65e48";
                    beddingTypeContainer[k].children[1].color = "#a6cccccc";
                });
                beddingTypeContainer[k].addEventListener("touchend", function(e) {
                    beddingTypeContainer[k].children[0].color = "#e65e48";
                    beddingTypeContainer[k].children[1].color = "#cccccc";
                });
                beddingTypeContainer[k].addEventListener("touchcancel", function(e) {
                    beddingTypeContainer[k].children[0].color = "#e65e48";
                    beddingTypeContainer[k].children[1].color = "#cccccc";
                });
            }
            $.beddingDetails.add(beddingTypeContainer[k]);
        });
    }
    function setBeddingCollection(e) {
        beddingCollection = [];
        try {
            if (!isNullVal(e.source.value)) {
                var collectionAllData = {
                    wName: "",
                    categoryId: e.source.categoryId,
                    type: "C_Product",
                    categoryType: "shop",
                    subTitle: e.source.value,
                    categoryName: "BED LINEN",
                    category: "BED LINEN"
                };
                Alloy.Globals.addWindowInNav("productListing", collectionAllData);
            }
        } catch (ex) {
            Ti.API.info("catch excepection--> " + ex.message);
        }
    }
    function getCollectionDetails(e) {
        if ("beddingCollection" == e.source.type) {
            var collectionAllData = {
                wName: e.source.value,
                categoryId: e.source.categoryId,
                type: "C_Product",
                categoryType: "shop",
                subTitle: e.source.subTitle,
                categoryName: "BED LINEN",
                category: "BED LINEN"
            };
            Alloy.Globals.addWindowInNav("productListing", collectionAllData);
        }
    }
    function clearMemory() {
        if ($.beddingView.children[3].getVisible()) $.beddingView.children[3].setVisible(false); else {
            $.removeListener();
            beddingContainer = "";
            beddingTypeContainer = [];
            beddingTypeLbl = [];
            forwardArrow = [];
            beddingCollection = [];
            beddingCollectionLbl = null;
            beddingCollectionWidth = null;
            beddingInnerContainer = null;
            beddingWidthHeight = null;
            Alloy.Globals.popWindowInNav();
            $.beddingView.close();
        }
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "beddings";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.beddingView = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        type: "beddingVIEW",
        backgroundColor: "#231f20",
        id: "beddingView"
    });
    $.__views.beddingView && $.addTopLevelView($.__views.beddingView);
    clearMemory ? $.addListener($.__views.beddingView, "android:back", clearMemory) : __defers["$.__views.beddingView!android:back!clearMemory"] = true;
    $.__views.__alloyId265 = Ti.UI.createView({
        top: "0dp",
        width: Titanium.UI.FILL,
        height: "53dp",
        id: "__alloyId265"
    });
    $.__views.beddingView.add($.__views.__alloyId265);
    $.__views.__alloyId266 = Ti.UI.createLabel({
        left: "15dp",
        height: Titanium.UI.FILL,
        font: {
            fontSize: "15dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        text: "BED LINEN TYPES",
        id: "__alloyId266"
    });
    $.__views.__alloyId265.add($.__views.__alloyId266);
    $.__views.beddingCloseLbl = Ti.UI.createLabel({
        right: "15dp",
        width: "40dp",
        height: "40dp",
        font: {
            fontSize: "20dp",
            fontFamily: "icomoon"
        },
        color: "#ffffff",
        text: Alloy.Globals.icon.close,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "beddingCloseLbl"
    });
    $.__views.__alloyId265.add($.__views.beddingCloseLbl);
    $.__views.beddingDetails = Ti.UI.createScrollView({
        top: "68dp",
        width: Titanium.UI.FILL,
        right: "15dp",
        left: "15dp",
        height: Titanium.UI.FILL,
        layout: "vertical",
        bottom: "80dp",
        id: "beddingDetails"
    });
    $.__views.beddingView.add($.__views.beddingDetails);
    $.__views.listAllLbl = Ti.UI.createLabel({
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        bottom: "30dp",
        width: "80%",
        height: "40dp",
        color: "#ffffff",
        borderColor: "#80e7e7e7",
        borderWidth: "0.5",
        backgroundColor: "transparent",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "LIST ALL",
        id: "listAllLbl"
    });
    $.__views.beddingView.add($.__views.listAllLbl);
    $.__views.beddingTypeView = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        visible: false,
        layout: "vertical",
        backgroundColor: "#231f20",
        id: "beddingTypeView"
    });
    $.__views.beddingView.add($.__views.beddingTypeView);
    $.__views.__alloyId267 = Ti.UI.createView({
        top: "0dp",
        width: Titanium.UI.FILL,
        height: "53dp",
        id: "__alloyId267"
    });
    $.__views.beddingTypeView.add($.__views.__alloyId267);
    $.__views.beddingTypeLbl = Ti.UI.createLabel({
        left: "15dp",
        height: Titanium.UI.FILL,
        font: {
            fontSize: "15dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        id: "beddingTypeLbl"
    });
    $.__views.__alloyId267.add($.__views.beddingTypeLbl);
    $.__views.beddingTypeCloseLbl = Ti.UI.createLabel({
        right: "15dp",
        width: "40dp",
        height: "40dp",
        font: {
            fontSize: "20dp",
            fontFamily: "icomoon"
        },
        color: "#ffffff",
        text: Alloy.Globals.icon.close,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "beddingTypeCloseLbl"
    });
    $.__views.__alloyId267.add($.__views.beddingTypeCloseLbl);
    $.__views.__alloyId268 = Ti.UI.createScrollView({
        id: "__alloyId268"
    });
    $.__views.beddingTypeView.add($.__views.__alloyId268);
    $.__views.beddingTypeDetails = Ti.UI.createView({
        layout: "horizontal",
        id: "beddingTypeDetails"
    });
    $.__views.__alloyId268.add($.__views.beddingTypeDetails);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.args;
    var beddingTypeContainer = [], beddingTypeLbl = [], forwardArrow = [], beddingCollection = [];
    var beddingCollectionLbl = "";
    googleAnalyticsScreen("BED LINEN DETAIL");
    touchEffect.createTouchEffect($.beddingCloseLbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.beddingTypeCloseLbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.listAllLbl, "#a6ffffff", "#ffffff");
    var beddingCollectionWidth = parseInt(Alloy.Globals.platformWidth - 10);
    $.beddingTypeDetails.width = beddingCollectionWidth;
    var beddingInnerContainer = parseInt(beddingCollectionWidth - 50);
    var beddingWidthHeight = parseInt(beddingInnerContainer / 4);
    $.beddingCloseLbl.addEventListener("click", function(e) {
        $.beddingDetails.removeEventListener("click", setBeddingCollection);
        $.beddingView.type = "";
        clearMemory();
    });
    $.beddingTypeCloseLbl.addEventListener("click", function(e) {
        $.beddingTypeView.setVisible(false);
    });
    getBeddingdata();
    $.beddingDetails.addEventListener("click", setBeddingCollection);
    $.listAllLbl.addEventListener("click", function(e) {
        var collectionAllData = {
            wName: "",
            categoryId: e.source.categoryId,
            type: "C_Product",
            categoryType: "shop",
            subTitle: e.source.heading,
            categoryName: "BED LINEN",
            category: "BED LINEN"
        };
        Alloy.Globals.addWindowInNav("productListing", collectionAllData);
    });
    $.beddingTypeDetails.addEventListener("click", getCollectionDetails);
    __defers["$.__views.beddingView!android:back!clearMemory"] && $.addListener($.__views.beddingView, "android:back", clearMemory);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;