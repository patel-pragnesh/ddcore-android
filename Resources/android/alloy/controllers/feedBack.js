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
        loadQuestion();
    }
    function loadQuestion() {
        showLoader($.feedBack);
        var requestMethod = Alloy.Globals.commonUrl.getCustomerServiceDetails;
        Alloy.Globals.webServiceCall(requestMethod, {}, loadQuestionSuccessCallback, loadQuestionErrorCallback, "POST", $.feedBack);
    }
    function loadQuestionSuccessCallback(response) {
        hideLoader();
        setReasons(response.data.what_is_it_about);
    }
    function loadQuestionErrorCallback(response) {
        hideLoader();
    }
    function setReasons(data) {
        try {
            _.each(data, function(value, k) {
                var reasonsLbl = $.UI.create("Label", {
                    classes: [ "fontLight", "inputText" ],
                    width: Titanium.UI.FILL,
                    text: value,
                    touchEnabled: true
                });
                var reasonsSeparator = $.UI.create("View", {
                    classes: [ "horizontalSeparator" ],
                    left: "10dp",
                    right: "10dp",
                    touchEnabled: false
                });
                $.reasonScroll.add(reasonsLbl);
                $.reasonScroll.add(reasonsSeparator);
            });
        } catch (exp) {
            Ti.API.info("resons expection-->" + exp.message);
        }
    }
    function submitFeedback() {
        if ("" == $.reason.getValue().trim()) showAlert($.feedBack, "Please enter your feedback comments"); else {
            var base64String = "";
            if ($.camera.getText() === Alloy.Globals.icon.deleteIcon) {
                var blob = $.attachedImage.toBlob();
                var _image = blob.imageAsResized(400, 400);
                base64String = Ti.Utils.base64encode(_image).toString();
            }
            showLoader($.feedBack);
            var requestMethod = Alloy.Globals.commonUrl.submitFeeback;
            var param = {
                quiz_about: $.reasonPicker.getText(),
                note: $.reason.getValue(),
                base_image: base64String
            };
            var requestParam = JSON.stringify(param);
            Alloy.Globals.webServiceCall(requestMethod, requestParam, submitFeebackSuccessCallback, submitFeebackErrorCallback, "POST", $.feedBack);
        }
    }
    function submitFeebackSuccessCallback(response) {
        hideLoader();
        $.reason.setValue("");
        showAlert($.feedBack, response.message);
        setTimeout(function() {
            closeFeedback();
        }, 1e3);
    }
    function submitFeebackErrorCallback(response) {
        hideLoader();
        showAlert($.feedBack, response.message);
    }
    function closeFeedback() {
        Alloy.Globals.popWindowInNav();
        $.feedBack.close();
    }
    function cleanUp() {
        Ti.API.info("************** into clear Memory ***************");
        $.removeListener();
        $.feedBack.remove($.containerForPage);
        $.containerForPage.removeAllChildren();
        $.destroy();
    }
    function updateCount() {
        $.header.updateCartCount();
    }
    function openCamera(e) {
        if (e.source.text === Alloy.Globals.icon.camera) {
            var cropping = require("cropping");
            cropping.callimagecrop($.attachedImage, $.feedBack, {
                x: 5,
                y: 6
            }, changePhotoFunction);
        } else {
            var deleteConfirmation = $.UI.create("AlertDialog", {
                message: "Are you sure ?",
                title: "Delete Image",
                cancel: 1,
                buttonNames: [ "Yes", "No" ]
            });
            deleteConfirmation.addEventListener("click", function(ex) {
                if (0 === ex.index) {
                    $.attachedImage.image = "";
                    $.camera.setText(Alloy.Globals.icon.camera);
                    deleteConfirmation = null;
                }
            });
            deleteConfirmation.show();
        }
    }
    function changePhotoFunction() {
        $.camera.setText(Alloy.Globals.icon.deleteIcon);
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "feedBack";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.feedBack = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        backgroundColor: "#ffffff",
        id: "feedBack"
    });
    $.__views.feedBack && $.addTopLevelView($.__views.feedBack);
    cleanUp ? $.addListener($.__views.feedBack, "close", cleanUp) : __defers["$.__views.feedBack!close!cleanUp"] = true;
    closeFeedback ? $.addListener($.__views.feedBack, "android:back", closeFeedback) : __defers["$.__views.feedBack!android:back!closeFeedback"] = true;
    updateCount ? $.addListener($.__views.feedBack, "focus", updateCount) : __defers["$.__views.feedBack!focus!updateCount"] = true;
    $.__views.header = Alloy.createWidget("headerView", "widget", {
        id: "header",
        __parentSymbol: $.__views.feedBack
    });
    $.__views.header.setParent($.__views.feedBack);
    $.__views.containerForPage = Ti.UI.createView({
        top: "53dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        layout: "vertical",
        id: "containerForPage"
    });
    $.__views.feedBack.add($.__views.containerForPage);
    $.__views.__alloyId640 = Ti.UI.createView({
        left: "20dp",
        right: "20dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        borderColor: "#ffffff",
        id: "__alloyId640"
    });
    $.__views.containerForPage.add($.__views.__alloyId640);
    $.__views.__alloyId641 = Ti.UI.createLabel({
        top: "26dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "10dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#333333",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "PLEASE SHARE YOUR VIEW",
        id: "__alloyId641"
    });
    $.__views.__alloyId640.add($.__views.__alloyId641);
    $.__views.reasonDropDown = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        touchEnabled: false,
        id: "reasonDropDown",
        top: "61dp",
        zIndex: 1,
        visible: false
    });
    $.__views.__alloyId640.add($.__views.reasonDropDown);
    $.__views.reasonPicker = Ti.UI.createLabel({
        left: "10dp",
        right: "10dp",
        color: "#a0a0a0",
        width: Titanium.UI.FILL,
        height: "35dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        text: "WHAT IS IT ABOUT?",
        id: "reasonPicker",
        top: "1dp"
    });
    $.__views.reasonDropDown.add($.__views.reasonPicker);
    $.__views.dropDown = Ti.UI.createLabel({
        right: "10dp",
        text: Alloy.Globals.icon.dropdownArrow,
        width: Titanium.UI.SIZE,
        height: "35dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "#333333",
        font: {
            fontSize: "5dp",
            fontFamily: "icomoon"
        },
        zIndex: 1,
        id: "dropDown",
        type: "icon"
    });
    $.__views.reasonDropDown.add($.__views.dropDown);
    $.__views.reasonScroll = Ti.UI.createScrollView({
        layout: "vertical",
        top: "35dp",
        backgroundColor: "#ffffff",
        height: 0,
        borderColor: "#cccccc",
        left: "1dp",
        right: "1dp",
        bottom: "1dp",
        id: "reasonScroll",
        zIndex: 2
    });
    $.__views.reasonDropDown.add($.__views.reasonScroll);
    $.__views.__alloyId642 = Ti.UI.createView({
        bottom: 0,
        height: "1dp",
        width: Titanium.UI.FILL,
        backgroundColor: "#cccccc",
        top: "96dp",
        visible: false,
        id: "__alloyId642"
    });
    $.__views.__alloyId640.add($.__views.__alloyId642);
    $.__views.__alloyId643 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "126dp",
        id: "__alloyId643"
    });
    $.__views.__alloyId640.add($.__views.__alloyId643);
    $.__views.__alloyId644 = Ti.UI.createLabel({
        left: "10dp",
        right: "10dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#a0a0a0",
        hintTextColor: "#a0a0a0",
        tintColor: "transparent",
        backgroundColor: "transparent",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        id: "__alloyId644"
    });
    $.__views.__alloyId643.add($.__views.__alloyId644);
    $.__views.__alloyId645 = Ti.UI.createView({
        bottom: 0,
        height: "1dp",
        width: Titanium.UI.FILL,
        backgroundColor: "#cccccc",
        top: "60dp",
        id: "__alloyId645"
    });
    $.__views.__alloyId640.add($.__views.__alloyId645);
    $.__views.reason = Ti.UI.createTextArea({
        left: "10dp",
        right: "10dp",
        width: Titanium.UI.FILL,
        height: "140dp",
        color: "#a0a0a0",
        hintTextColor: "#a0a0a0",
        tintColor: "transparent",
        backgroundColor: "transparent",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        id: "reason",
        type: "TextField",
        hintText: "YOUR COMMENTS",
        top: "70dp"
    });
    $.__views.__alloyId640.add($.__views.reason);
    $.__views.__alloyId646 = Ti.UI.createView({
        top: "15dp",
        left: "20dp",
        right: "20dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        id: "__alloyId646"
    });
    $.__views.containerForPage.add($.__views.__alloyId646);
    $.__views.__alloyId647 = Ti.UI.createView({
        bottom: 0,
        height: "1dp",
        width: Titanium.UI.FILL,
        backgroundColor: "#cccccc",
        top: 0,
        id: "__alloyId647"
    });
    $.__views.__alloyId646.add($.__views.__alloyId647);
    $.__views.__alloyId648 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: "80dp",
        top: "10dp",
        borderColor: "transparent",
        id: "__alloyId648"
    });
    $.__views.__alloyId646.add($.__views.__alloyId648);
    $.__views.camera = Ti.UI.createLabel({
        top: 2,
        right: "10dp",
        text: Alloy.Globals.icon.camera,
        width: "50dp",
        height: "50dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "#333333",
        font: {
            fontSize: "20dp",
            fontFamily: "icomoon"
        },
        zIndex: 1,
        id: "camera"
    });
    $.__views.__alloyId648.add($.__views.camera);
    openCamera ? $.addListener($.__views.camera, "click", openCamera) : __defers["$.__views.camera!click!openCamera"] = true;
    $.__views.attachedImage = Ti.UI.createImageView({
        id: "attachedImage",
        width: "50dp",
        height: "50dp",
        top: "2dp",
        right: "70dp",
        borderColor: "transparent"
    });
    $.__views.__alloyId648.add($.__views.attachedImage);
    $.__views.submit = Ti.UI.createLabel({
        bottom: "58dp",
        left: "30dp",
        right: "30dp",
        width: Titanium.UI.FILL,
        height: "40dp",
        color: "#ffffff",
        backgroundColor: "#231f20",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: "16dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        text: "SUBMIT",
        id: "submit"
    });
    $.__views.__alloyId646.add($.__views.submit);
    submitFeedback ? $.addListener($.__views.submit, "click", submitFeedback) : __defers["$.__views.submit!click!submitFeedback"] = true;
    $.__views.cancel = Ti.UI.createLabel({
        bottom: "25dp",
        left: "30dp",
        right: "30dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#e65e48",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "Cancel",
        id: "cancel"
    });
    $.__views.__alloyId646.add($.__views.cancel);
    closeFeedback ? $.addListener($.__views.cancel, "click", closeFeedback) : __defers["$.__views.cancel!click!closeFeedback"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var reasonFlag = true;
    $.header.init({
        title: "FEEDBACK",
        passWindow: $.feedBack
    });
    $.feedBack.addEventListener("click", function(e) {
        "TextField" != e.source.type && $.reason.blur();
    });
    googleAnalyticsScreen("FEEDBACK");
    $.header.getView("cartContainer").setVisible(false);
    $.header.getView("searchLbl").setVisible(false);
    $.header.getView("overFlowMenuLbl").setVisible(false);
    init();
    $.reason.blur();
    $.reasonDropDown.addEventListener("click", function(e) {
        if (reasonFlag) {
            $.reasonDropDown.backgroundColor = "#cccccc";
            $.reasonPicker.color = "#ffffff";
            $.reasonScroll.height = "140";
            reasonFlag = false;
        } else {
            e.source.text && "icon" != e.source.type && ($.reasonPicker.text = e.source.text);
            $.reasonPicker.color = "#a0a0a0";
            $.reasonDropDown.backgroundColor = "transparent";
            $.reasonScroll.height = "0";
            reasonFlag = true;
        }
    });
    __defers["$.__views.feedBack!close!cleanUp"] && $.addListener($.__views.feedBack, "close", cleanUp);
    __defers["$.__views.feedBack!android:back!closeFeedback"] && $.addListener($.__views.feedBack, "android:back", closeFeedback);
    __defers["$.__views.feedBack!focus!updateCount"] && $.addListener($.__views.feedBack, "focus", updateCount);
    __defers["$.__views.camera!click!openCamera"] && $.addListener($.__views.camera, "click", openCamera);
    __defers["$.__views.submit!click!submitFeedback"] && $.addListener($.__views.submit, "click", submitFeedback);
    __defers["$.__views.cancel!click!closeFeedback"] && $.addListener($.__views.cancel, "click", closeFeedback);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;