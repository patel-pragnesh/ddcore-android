function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function updateCount() {
        $.header.updateCartCount();
    }
    function goToBack() {
        Alloy.Globals.popWindowInNav();
        $.dImaginer.close();
    }
    function destroyWindow(e) {
        $.superScroll.removeAllChildren();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "dImaginer";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.dImaginer = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        backgroundColor: "#231f20",
        id: "dImaginer"
    });
    $.__views.dImaginer && $.addTopLevelView($.__views.dImaginer);
    updateCount ? $.addListener($.__views.dImaginer, "focus", updateCount) : __defers["$.__views.dImaginer!focus!updateCount"] = true;
    goToBack ? $.addListener($.__views.dImaginer, "android:back", goToBack) : __defers["$.__views.dImaginer!android:back!goToBack"] = true;
    destroyWindow ? $.addListener($.__views.dImaginer, "close", destroyWindow) : __defers["$.__views.dImaginer!close!destroyWindow"] = true;
    $.__views.header = Alloy.createWidget("headerView", "widget", {
        id: "header",
        __parentSymbol: $.__views.dImaginer
    });
    $.__views.header.setParent($.__views.dImaginer);
    $.__views.__alloyId331 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        left: "0dp",
        right: "0dp",
        top: "53dp",
        image: "/images/Dimaginer.jpg",
        id: "__alloyId331"
    });
    $.__views.dImaginer.add($.__views.__alloyId331);
    $.__views.superScroll = Ti.UI.createScrollView({
        top: "53dp",
        scrollType: "vertical",
        id: "superScroll"
    });
    $.__views.dImaginer.add($.__views.superScroll);
    $.__views.containerForPage = Ti.UI.createView({
        left: "0dp",
        right: "0dp",
        top: "0dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "containerForPage"
    });
    $.__views.superScroll.add($.__views.containerForPage);
    $.__views.__alloyId332 = Ti.UI.createView({
        top: "20dp",
        width: "45dp",
        height: "1dp",
        backgroundColor: "#333333",
        id: "__alloyId332"
    });
    $.__views.containerForPage.add($.__views.__alloyId332);
    $.__views.__alloyId333 = Ti.UI.createLabel({
        top: "15dp",
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#e65e48",
        text: "STYLE UP YOUR",
        id: "__alloyId333"
    });
    $.__views.containerForPage.add($.__views.__alloyId333);
    $.__views.__alloyId334 = Ti.UI.createLabel({
        font: {
            fontSize: "25dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#FFFFFF",
        text: "DREAM ROOM",
        id: "__alloyId334"
    });
    $.__views.containerForPage.add($.__views.__alloyId334);
    $.__views.storeLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_medium_bt-webfont",
            fontSize: "13dp"
        },
        width: "88%",
        top: "13dp",
        color: "#E65E48",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "storeLbl"
    });
    $.__views.containerForPage.add($.__views.storeLbl);
    $.__views.videoContainer = Ti.UI.createView({
        left: "0dp",
        right: "0dp",
        top: "125dp",
        width: Titanium.UI.FILL,
        layout: "vertical",
        id: "videoContainer"
    });
    $.__views.superScroll.add($.__views.videoContainer);
    $.__views.videoPlayer = Ti.Media.createVideoPlayer({
        width: Titanium.UI.FILL,
        backgroundColor: "#231f20",
        top: "0dp",
        autoplay: false,
        visible: false,
        id: "videoPlayer"
    });
    $.__views.videoContainer.add($.__views.videoPlayer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.args;
    Alloy.Globals.dimaginer = null;
    Alloy.Globals.dimaginer = $;
    $.videoPlayer.setUrl(Alloy.Globals.DimaginerVideo);
    $.videoContainer.addEventListener("click", function(e) {
        $.videoContainer.top = "0dp";
        $.videoPlayer.visible = true;
        $.videoPlayer.fullscreen = true;
        $.videoPlayer.play();
    });
    $.videoPlayer.addEventListener("fullscreen", function(e) {
        if (false === e.entering) {
            $.videoPlayer.stop();
            $.videoPlayer.visible = false;
            $.videoContainer.top = "125dp";
        }
    });
    $.videoPlayer.addEventListener("complete", function(e) {
        if ("complete" == e.type) {
            $.videoPlayer.stop();
            $.videoPlayer.fullscreen = false;
            $.videoPlayer.visible = false;
            $.videoContainer.top = "125dp";
        }
    });
    $.header.init({
        title: "D'IMAGINER",
        passWindow: $.dImaginer
    });
    googleAnalyticsScreen("D'IMAGINER");
    var text = "GO GET THE EXPERIENCE ON OUR DESKTOP WEBSITE OR A STORE NEAR YOU";
    var attr = Ti.UI.createAttributedString({
        text: text,
        attributes: [ {
            type: Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
            value: "#999999",
            range: [ text.indexOf("STORE NEAR YOU"), "STORE NEAR YOU".length ]
        }, {
            type: Ti.UI.ATTRIBUTE_UNDERLINES_STYLE,
            value: Ti.UI.ATTRIBUTE_UNDERLINE_STYLE_DOUBLE,
            range: [ text.indexOf("STORE NEAR YOU"), "STORE NEAR YOU".length ]
        } ]
    });
    $.storeLbl.attributedString = attr;
    $.storeLbl.addEventListener("click", function(e) {
        Alloy.Globals.addWindowInNav("findStore");
    });
    __defers["$.__views.dImaginer!focus!updateCount"] && $.addListener($.__views.dImaginer, "focus", updateCount);
    __defers["$.__views.dImaginer!android:back!goToBack"] && $.addListener($.__views.dImaginer, "android:back", goToBack);
    __defers["$.__views.dImaginer!close!destroyWindow"] && $.addListener($.__views.dImaginer, "close", destroyWindow);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;