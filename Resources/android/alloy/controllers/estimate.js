function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function setMeasurements() {
        _.each(measurement, function(value, key) {
            var categoryLbl = $.UI.create("Label", {
                classes: [ "fontMedium", "dropDownLbl" ],
                width: Titanium.UI.FILL,
                text: value,
                touchEnabled: true
            });
            $.measurementScroll.add(categoryLbl);
        });
    }
    function setFitting() {
        _.each(operations, function(value, key) {
            var categoryLbl = $.UI.create("Label", {
                classes: [ "fontMedium", "dropDownLbl" ],
                width: Titanium.UI.FILL,
                text: value,
                touchEnabled: true
            });
            $.fittingScroll.add(categoryLbl);
        });
    }
    function setClothing() {
        _.each(cassetteObj, function(value, key) {
            var categoryLbl = $.UI.create("Label", {
                classes: [ "fontMedium", "dropDownLbl" ],
                width: Titanium.UI.FILL,
                text: value,
                touchEnabled: true
            });
            $.clothScroll.add(categoryLbl);
        });
    }
    function onMeasurementChange(unit) {
        switch (unit) {
          case "MILLIMETER":
            $.maxwidth.text = "MAX " + args.MAX_WIDTH + " MM";
            $.maxHeight.text = "MAX " + args.MAX_DROP + " MM";
            var textWidth = conversion($.textForWidth.getValue(), $.textForWidth.unit, "MILLIMETER");
            var textHeight = conversion($.textForHeight.getValue(), $.textForHeight.unit, "MILLIMETER");
            $.textForWidth.value = Math.round(100 * parseFloat(textWidth)) / 100;
            $.textForHeight.value = Math.round(100 * parseFloat(textHeight)) / 100;
            $.textForWidth.unit = "MILLIMETER";
            $.textForHeight.unit = "MILLIMETER";
            break;

          case "CENTIMETER":
            $.maxwidth.text = "MAX " + Math.round(100 * parseFloat(mmToCM(args.MAX_WIDTH))) / 100 + " CM";
            $.maxHeight.text = "MAX " + Math.round(100 * parseFloat(mmToCM(args.MAX_DROP))) / 100 + " CM";
            var textWidth = conversion($.textForWidth.getValue(), $.textForWidth.unit, "CENTIMETER");
            var textHeight = conversion($.textForHeight.getValue(), $.textForHeight.unit, "CENTIMETER");
            $.textForWidth.value = Math.round(100 * parseFloat(textWidth)) / 100;
            $.textForHeight.value = Math.round(100 * parseFloat(textHeight)) / 100;
            $.textForWidth.unit = "CENTIMETER";
            $.textForHeight.unit = "CENTIMETER";
            break;

          case "INCH":
            $.maxwidth.text = "MAX " + Math.round(100 * parseFloat(mmToInch(args.MAX_WIDTH))) / 100 + " IN";
            $.maxHeight.text = "MAX " + Math.round(100 * parseFloat(mmToInch(args.MAX_DROP))) / 100 + " IN";
            var textWidth = conversion($.textForWidth.getValue(), $.textForWidth.unit, "INCH");
            var textHeight = conversion($.textForHeight.getValue(), $.textForHeight.unit, "INCH");
            $.textForWidth.value = Math.round(100 * parseFloat(textWidth)) / 100;
            $.textForHeight.value = Math.round(100 * parseFloat(textHeight)) / 100;
            $.textForWidth.unit = "INCH";
            $.textForHeight.unit = "INCH";
            break;

          case "FEET":
            $.maxwidth.text = "MAX " + Math.round(100 * parseFloat(mmToFeet(args.MAX_WIDTH))) / 100 + " FT";
            $.maxHeight.text = "MAX " + Math.round(100 * parseFloat(mmToFeet(args.MAX_DROP))) / 100 + " FT";
            var textWidth = conversion($.textForWidth.getValue(), $.textForWidth.unit, "FEET");
            var textHeight = conversion($.textForHeight.getValue(), $.textForHeight.unit, "FEET");
            $.textForWidth.value = Math.round(100 * parseFloat(textWidth)) / 100;
            $.textForHeight.value = Math.round(100 * parseFloat(textHeight)) / 100;
            $.textForWidth.unit = "FEET";
            $.textForHeight.unit = "FEET";
        }
        if (parseFloat($.textForWidth.getValue()) > conversion(args.MAX_WIDTH, "", $.textForWidth.unit) || parseFloat($.textForWidth.getValue()) < conversion(250, "", $.textForWidth.unit)) {
            showAlert($.estimate, "Width cannot be less than " + conversion(250, "", $.textForWidth.unit) + " and more than " + conversion(args.MAX_WIDTH, "", $.textForWidth.unit) + " " + $.textForWidth.unit + ".");
            return;
        }
        if (parseFloat($.textForHeight.getValue()) > conversion(args.MAX_DROP, "", $.textForHeight.unit) || parseFloat($.textForHeight.getValue()) < conversion(250, "", $.textForHeight.unit)) {
            showAlert($.estimate, "Height cannot be less than " + conversion(250, "", $.textForHeight.unit) + " and more than " + conversion(args.MAX_DROP, "", $.textForHeight.unit) + " " + $.textForWidth.unit + ".");
            return;
        }
    }
    function conversion(value, fromUnit, toUnit) {
        switch (fromUnit) {
          case "MILLIMETER":
            Ti.API.info("millimeter1");
            value = value;
            break;

          case "CENTIMETER":
            value = cmToMM(value);
            break;

          case "INCH":
            value = inchToMM(value);
            break;

          case "FEET":
            value = feetToMM(value);
        }
        switch (toUnit) {
          case "MILLIMETER":
            Ti.API.info("millimeter");
            return value;

          case "CENTIMETER":
            return mmToCM(value);

          case "INCH":
            return mmToInch(value);

          case "FEET":
            return mmToFeet(value);
        }
    }
    function inchToMM(value) {
        return parseInt(Math.round(25.4 * value));
    }
    function cmToMM(value) {
        return parseInt(Math.round(10 * value));
    }
    function feetToMM(value) {
        return parseInt(Math.round(304.8 * value));
    }
    function mmToInch(value) {
        return Math.round(100 * parseFloat(value / 25.4)) / 100;
    }
    function mmToCM(value) {
        return value / 10;
    }
    function mmToFeet(value) {
        return Math.round(100 * parseFloat(value / 304.8)) / 100;
    }
    function getBlindsEstimateSuccessCallback(e) {
        try {
            if (isNullVal(e.data)) {
                $.rupies.visible = false;
                $.amountLbl.text = "";
            } else {
                $.rupies.visible = true;
                $.amountLbl.text = e.data;
            }
        } catch (ex) {
            Ti.API.info("catch = " + ex.message);
        }
    }
    function getBlindsEstimateErrorCallback(e) {
        $.rupies.visible = false;
        $.amountLbl.text = "";
    }
    function goToBack() {
        if ($.superView.children[2].getVisible()) {
            $.superView.children[2].setVisible(false);
            $.superView.children[1].setVisible(true);
        } else {
            Alloy.Globals.popWindowInNav();
            $.estimate.close();
        }
    }
    function refresh() {
        $.textForWidth.setValue(250);
        $.textForHeight.setValue(250);
        $.textForWidth.unit = "MILLIMETER";
        $.textForHeight.unit = "MILLIMETER";
        $.measurementLbl.setText("MILLIMETER");
        $.fittingLbl.setText("SELECT OPERATION");
        args.IS_EVO && args.IS_CLASSIC ? $.clothLbl.text = "EVO" : args.IS_EVO ? $.clothLbl.text = "EVO" : args.IS_CLASSIC ? $.clothLbl.text = "CLASSIC" : $.clothLbl.text = "";
        $.maxwidth.text = "MAX " + args.MAX_WIDTH + " MM";
        $.maxHeight.text = "MAX " + args.MAX_DROP + " MM";
        $.productNameLabel.text = args.productName;
        $.amountLbl.text = "";
        $.rupies.visible = false;
    }
    function navigateToAppointment() {
        if (Ti.App.Properties.getString("access_token")) {
            $.estimate.add(Alloy.createController("bookappoinment", {
                mainWindow: $.estimate,
                isEstimate: true,
                androidBack: updateAndroidEvent
            }).getView());
            isAppointment = true;
            $.removeListener($.estimate, "android:back", goToBack);
        } else Alloy.Globals.addWindowInNav("signIn");
    }
    function updateAndroidEvent() {
        $.addListener($.estimate, "android:back", goToBack);
    }
    function clearMemory() {
        $.removeListener();
        $.estimate.remove($.superView);
        $.superView.removeAllChildren();
        $.destroy();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "estimate";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.estimate = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_ADJUST_PAN,
        id: "estimate"
    });
    $.__views.estimate && $.addTopLevelView($.__views.estimate);
    goToBack ? $.addListener($.__views.estimate, "android:back", goToBack) : __defers["$.__views.estimate!android:back!goToBack"] = true;
    refresh ? $.addListener($.__views.estimate, "open", refresh) : __defers["$.__views.estimate!open!refresh"] = true;
    clearMemory ? $.addListener($.__views.estimate, "close", clearMemory) : __defers["$.__views.estimate!close!clearMemory"] = true;
    $.__views.superView = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        backgroundColor: "#231f20",
        id: "superView"
    });
    $.__views.estimate.add($.__views.superView);
    $.__views.__alloyId379 = Ti.UI.createView({
        top: "0dp",
        zIndex: "100",
        width: Titanium.UI.FILL,
        height: "40dp",
        id: "__alloyId379"
    });
    $.__views.superView.add($.__views.__alloyId379);
    $.__views.__alloyId380 = Ti.UI.createLabel({
        left: "15dp",
        height: Titanium.UI.FILL,
        font: {
            fontSize: "15dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        text: "ESTIMATE",
        id: "__alloyId380"
    });
    $.__views.__alloyId379.add($.__views.__alloyId380);
    $.__views.__alloyId381 = Ti.UI.createLabel({
        left: "15dp",
        top: "30dp",
        height: Titanium.UI.FILL,
        font: {
            fontSize: "8dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        visible: false,
        text: "120CM * 150CM (RECESS) STANDARD LINING",
        id: "__alloyId381"
    });
    $.__views.__alloyId379.add($.__views.__alloyId381);
    $.__views.refreshIcon = Ti.UI.createLabel({
        right: "60dp",
        width: "40dp",
        height: "40dp",
        font: {
            fontSize: "20dp",
            fontFamily: "icomoon"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: Alloy.Globals.icon.refresh,
        id: "refreshIcon"
    });
    $.__views.__alloyId379.add($.__views.refreshIcon);
    refresh ? $.addListener($.__views.refreshIcon, "click", refresh) : __defers["$.__views.refreshIcon!click!refresh"] = true;
    $.__views.estimateCloseLbl = Ti.UI.createLabel({
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
        id: "estimateCloseLbl"
    });
    $.__views.__alloyId379.add($.__views.estimateCloseLbl);
    goToBack ? $.addListener($.__views.estimateCloseLbl, "click", goToBack) : __defers["$.__views.estimateCloseLbl!click!goToBack"] = true;
    $.__views.__alloyId382 = Ti.UI.createScrollView({
        visible: true,
        top: "40dp",
        id: "__alloyId382"
    });
    $.__views.superView.add($.__views.__alloyId382);
    $.__views.__alloyId383 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        top: "0dp",
        id: "__alloyId383"
    });
    $.__views.__alloyId382.add($.__views.__alloyId383);
    $.__views.__alloyId384 = Ti.UI.createView({
        top: "0dp",
        left: "20dp",
        right: "20dp",
        height: Titanium.UI.SIZE,
        zIndex: 1,
        id: "__alloyId384"
    });
    $.__views.__alloyId383.add($.__views.__alloyId384);
    $.__views.productNameLabel = Ti.UI.createLabel({
        top: "32dp",
        left: "15dp",
        right: "15dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "productNameLabel"
    });
    $.__views.__alloyId384.add($.__views.productNameLabel);
    $.__views.inputBox = Ti.UI.createView({
        top: "80dp",
        left: 0,
        width: "31%",
        height: "70dp",
        layout: "vertical",
        id: "inputBox"
    });
    $.__views.__alloyId384.add($.__views.inputBox);
    $.__views.textForWidth = Ti.UI.createTextField({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        backgroundColor: "transparent",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        color: "#ffffff",
        font: {
            fontSize: "20dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        id: "textForWidth",
        unit: "MILLIMETER",
        type: "TextField",
        hintText: "WIDTH",
        value: 250
    });
    $.__views.inputBox.add($.__views.textForWidth);
    $.__views.__alloyId385 = Ti.UI.createView({
        height: "1px",
        width: Titanium.UI.FILL,
        backgroundColor: "#e65e48",
        id: "__alloyId385"
    });
    $.__views.inputBox.add($.__views.__alloyId385);
    $.__views.maxwidth = Ti.UI.createLabel({
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        backgroundColor: "transparent",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        color: "#aaaaaa",
        font: {
            fontSize: "10dp"
        },
        id: "maxwidth"
    });
    $.__views.inputBox.add($.__views.maxwidth);
    $.__views.labelBox = Ti.UI.createView({
        top: "80dp",
        width: "31%",
        height: "70dp",
        layout: "vertical",
        id: "labelBox"
    });
    $.__views.__alloyId384.add($.__views.labelBox);
    $.__views.textForHeight = Ti.UI.createTextField({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        backgroundColor: "transparent",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        color: "#ffffff",
        font: {
            fontSize: "20dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        id: "textForHeight",
        unit: "MILLIMETER",
        type: "TextField",
        hintText: "HEIGHT",
        value: 250
    });
    $.__views.labelBox.add($.__views.textForHeight);
    $.__views.__alloyId386 = Ti.UI.createView({
        height: "1px",
        width: Titanium.UI.FILL,
        backgroundColor: "#e65e48",
        id: "__alloyId386"
    });
    $.__views.labelBox.add($.__views.__alloyId386);
    $.__views.maxHeight = Ti.UI.createLabel({
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        backgroundColor: "transparent",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        color: "#aaaaaa",
        font: {
            fontSize: "10dp"
        },
        id: "maxHeight"
    });
    $.__views.labelBox.add($.__views.maxHeight);
    $.__views.measurementDropDown = Ti.UI.createView({
        layout: "vertical",
        top: "80dp",
        right: 0,
        width: "29%",
        zIndex: "100",
        height: "40dp",
        id: "measurementDropDown"
    });
    $.__views.__alloyId384.add($.__views.measurementDropDown);
    $.__views.__alloyId387 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "0dp",
        layout: "horizontal",
        touchEnabled: false,
        id: "__alloyId387"
    });
    $.__views.measurementDropDown.add($.__views.__alloyId387);
    $.__views.measurementLbl = Ti.UI.createLabel({
        left: "5%",
        top: "0dp",
        width: "75%",
        height: "40dp",
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        color: "#e65e48",
        touchEnabled: false,
        text: "MILLIMETER",
        id: "measurementLbl"
    });
    $.__views.__alloyId387.add($.__views.measurementLbl);
    $.__views.__alloyId388 = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "10dp"
        },
        rigth: "0dp",
        width: "18%",
        height: "40dp",
        text: Alloy.Globals.icon.expandFill,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "#a6ffffff",
        touchEnabled: false,
        id: "__alloyId388"
    });
    $.__views.__alloyId387.add($.__views.__alloyId388);
    $.__views.measurementScroll = Ti.UI.createScrollView({
        layout: "vertical",
        backgroundColor: "#595959",
        height: 0,
        id: "measurementScroll",
        zIndex: 2
    });
    $.__views.measurementDropDown.add($.__views.measurementScroll);
    $.__views.fittingDropDown = Ti.UI.createView({
        layout: "vertical",
        top: "175dp",
        left: 0,
        width: "49%",
        zIndex: "99",
        height: "40dp",
        id: "fittingDropDown"
    });
    $.__views.__alloyId384.add($.__views.fittingDropDown);
    $.__views.__alloyId389 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "0dp",
        layout: "horizontal",
        touchEnabled: false,
        id: "__alloyId389"
    });
    $.__views.fittingDropDown.add($.__views.__alloyId389);
    $.__views.fittingLbl = Ti.UI.createLabel({
        left: "5%",
        top: "0dp",
        width: "75%",
        height: "40dp",
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        color: "#e65e48",
        touchEnabled: false,
        text: "SELECT OPERATION",
        id: "fittingLbl"
    });
    $.__views.__alloyId389.add($.__views.fittingLbl);
    $.__views.__alloyId390 = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "10dp"
        },
        rigth: "0dp",
        width: "18%",
        height: "40dp",
        text: Alloy.Globals.icon.expandFill,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "#a6ffffff",
        touchEnabled: false,
        id: "__alloyId390"
    });
    $.__views.__alloyId389.add($.__views.__alloyId390);
    $.__views.fittingScroll = Ti.UI.createScrollView({
        layout: "vertical",
        backgroundColor: "#595959",
        height: 0,
        id: "fittingScroll"
    });
    $.__views.fittingDropDown.add($.__views.fittingScroll);
    $.__views.__alloyId391 = Ti.UI.createView({
        top: "175dp",
        width: "0.5dp",
        height: "40dp",
        backgroundColor: "#666666",
        id: "__alloyId391"
    });
    $.__views.__alloyId384.add($.__views.__alloyId391);
    $.__views.clothDropDown = Ti.UI.createView({
        layout: "vertical",
        top: "175dp",
        right: 0,
        width: "49%",
        zIndex: "99",
        height: "40dp",
        id: "clothDropDown"
    });
    $.__views.__alloyId384.add($.__views.clothDropDown);
    $.__views.__alloyId392 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "0dp",
        layout: "horizontal",
        touchEnabled: false,
        zIndex: 0,
        id: "__alloyId392"
    });
    $.__views.clothDropDown.add($.__views.__alloyId392);
    $.__views.clothLbl = Ti.UI.createLabel({
        left: "5%",
        top: "0dp",
        width: "75%",
        height: "40dp",
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        color: "#e65e48",
        touchEnabled: false,
        text: "CASSETTE",
        id: "clothLbl"
    });
    $.__views.__alloyId392.add($.__views.clothLbl);
    $.__views.__alloyId393 = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "10dp"
        },
        rigth: "0dp",
        width: "18%",
        height: "40dp",
        text: Alloy.Globals.icon.expandFill,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "#a6ffffff",
        touchEnabled: false,
        id: "__alloyId393"
    });
    $.__views.__alloyId392.add($.__views.__alloyId393);
    $.__views.clothScroll = Ti.UI.createScrollView({
        layout: "vertical",
        backgroundColor: "#595959",
        height: 0,
        id: "clothScroll"
    });
    $.__views.clothDropDown.add($.__views.clothScroll);
    $.__views.__alloyId394 = Ti.UI.createView({
        height: "0.5dp",
        width: Titanium.UI.FILL,
        backgroundColor: "#666666",
        top: "170dp",
        zIndex: 0,
        id: "__alloyId394"
    });
    $.__views.__alloyId383.add($.__views.__alloyId394);
    $.__views.__alloyId395 = Ti.UI.createView({
        height: "0.5dp",
        width: Titanium.UI.FILL,
        backgroundColor: "#666666",
        top: "220dp",
        zIndex: 0,
        id: "__alloyId395"
    });
    $.__views.__alloyId383.add($.__views.__alloyId395);
    $.__views.__alloyId396 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        top: 280,
        width: Titanium.UI.SIZE,
        id: "__alloyId396"
    });
    $.__views.__alloyId383.add($.__views.__alloyId396);
    $.__views.rupies = Ti.UI.createLabel({
        font: {
            fontSize: "11dp",
            fontFamily: "icomoon"
        },
        color: "#e65e48",
        text: Alloy.Globals.icon.currency,
        left: "0dp",
        top: "2dp",
        visible: false,
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
        id: "rupies"
    });
    $.__views.__alloyId396.add($.__views.rupies);
    $.__views.amountLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "futura-hv-bt-heavy",
            fontSize: "18dp"
        },
        color: "#e65e48",
        left: "10dp",
        id: "amountLbl"
    });
    $.__views.__alloyId396.add($.__views.amountLbl);
    $.__views.getQuote = Ti.UI.createLabel({
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        width: "80%",
        height: "40dp",
        color: "#ffffff",
        borderColor: "#e7e7e7",
        borderWidth: "0.5",
        backgroundColor: "transparent",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        bottom: "120dp",
        text: "GET QUOTE",
        id: "getQuote"
    });
    $.__views.__alloyId383.add($.__views.getQuote);
    $.__views.whr2Buy1 = Ti.UI.createLabel({
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        width: "80%",
        height: "40dp",
        color: "#ffffff",
        borderColor: "#e7e7e7",
        borderWidth: "0.5",
        backgroundColor: "transparent",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        bottom: "60dp",
        text: "WHERE TO BUY",
        id: "whr2Buy1"
    });
    $.__views.__alloyId383.add($.__views.whr2Buy1);
    $.__views.freeHomeConsultation1 = Ti.UI.createLabel({
        width: "80%",
        height: "40dp",
        color: "#e65e48",
        backgroundColor: "transparent",
        font: {
            fontSize: "10dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "freeHomeConsultation1",
        text: "FREE HOME CONSULTATION",
        bottom: "10dp"
    });
    $.__views.__alloyId383.add($.__views.freeHomeConsultation1);
    navigateToAppointment ? $.addListener($.__views.freeHomeConsultation1, "click", navigateToAppointment) : __defers["$.__views.freeHomeConsultation1!click!navigateToAppointment"] = true;
    $.__views.__alloyId397 = Ti.UI.createView({
        visible: false,
        top: "40dp",
        layout: "vertical",
        id: "__alloyId397"
    });
    $.__views.superView.add($.__views.__alloyId397);
    $.__views.estimatesTab = Ti.UI.createView({
        top: "0",
        backgroundColor: "#231f20",
        width: Titanium.UI.FILL,
        height: "35dp",
        id: "estimatesTab"
    });
    $.__views.__alloyId397.add($.__views.estimatesTab);
    $.__views.cusion_lbl = Ti.UI.createLabel({
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: Alloy.Globals.labelTitleColor,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        height: Titanium.UI.FILL,
        width: "48%",
        left: "0dp",
        text: "MANUAL",
        id: "cusion_lbl"
    });
    $.__views.estimatesTab.add($.__views.cusion_lbl);
    $.__views.sliderSelection = Ti.UI.createView({
        backgroundColor: Alloy.Globals.labelTitleColor,
        height: "2dp",
        width: "48%",
        bottom: "1dp",
        left: "0dp",
        id: "sliderSelection"
    });
    $.__views.estimatesTab.add($.__views.sliderSelection);
    $.__views.__alloyId398 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp"
        },
        color: "#a6ffffff",
        text: "|",
        id: "__alloyId398"
    });
    $.__views.estimatesTab.add($.__views.__alloyId398);
    $.__views.curtains_lbl = Ti.UI.createLabel({
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: Alloy.Globals.labelTitleColor,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        height: Titanium.UI.FILL,
        width: "48%",
        right: "0dp",
        text: "AUTOMATIC",
        id: "curtains_lbl"
    });
    $.__views.estimatesTab.add($.__views.curtains_lbl);
    var __alloyId399 = [];
    $.__views.manual = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        id: "manual",
        title: "MANUAL"
    });
    __alloyId399.push($.__views.manual);
    $.__views.__alloyId400 = Ti.UI.createView({
        top: "0",
        height: "100dp",
        id: "__alloyId400"
    });
    $.__views.manual.add($.__views.__alloyId400);
    $.__views.__alloyId401 = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId401"
    });
    $.__views.__alloyId400.add($.__views.__alloyId401);
    $.__views.cost = Ti.UI.createLabel({
        font: {
            fontSize: "22dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        width: "80%",
        height: "40dp",
        color: "#ffffff",
        backgroundColor: "transparent",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "12,000 APX",
        id: "cost"
    });
    $.__views.__alloyId401.add($.__views.cost);
    $.__views.__alloyId402 = Ti.UI.createLabel({
        font: {
            fontSize: "8dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        width: "80%",
        height: "15dp",
        color: "#ffffff",
        backgroundColor: "transparent",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "MINIMUM CHARGES APPLICABLE",
        id: "__alloyId402"
    });
    $.__views.__alloyId401.add($.__views.__alloyId402);
    $.__views.controlDropDown = Ti.UI.createView({
        layout: "vertical",
        top: "105dp",
        left: 0,
        width: "49%",
        zIndex: "99",
        height: "40dp",
        id: "controlDropDown"
    });
    $.__views.manual.add($.__views.controlDropDown);
    $.__views.__alloyId403 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "0dp",
        layout: "horizontal",
        touchEnabled: false,
        id: "__alloyId403"
    });
    $.__views.controlDropDown.add($.__views.__alloyId403);
    $.__views.controlLbl = Ti.UI.createLabel({
        left: "5%",
        top: "0dp",
        width: "75%",
        height: "40dp",
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        color: "#e65e48",
        touchEnabled: false,
        text: "CONTROL LOCATION",
        id: "controlLbl"
    });
    $.__views.__alloyId403.add($.__views.controlLbl);
    $.__views.__alloyId404 = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "10dp"
        },
        rigth: "0dp",
        width: "18%",
        height: "40dp",
        text: Alloy.Globals.icon.expandFill,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "#a6ffffff",
        touchEnabled: false,
        id: "__alloyId404"
    });
    $.__views.__alloyId403.add($.__views.__alloyId404);
    $.__views.controlScroll = Ti.UI.createScrollView({
        layout: "vertical",
        backgroundColor: "#595959",
        height: 0,
        id: "controlScroll"
    });
    $.__views.controlDropDown.add($.__views.controlScroll);
    $.__views.__alloyId405 = Ti.UI.createView({
        top: "102.5dp",
        width: "0.5dp",
        height: "40dp",
        backgroundColor: "#666666",
        id: "__alloyId405"
    });
    $.__views.manual.add($.__views.__alloyId405);
    $.__views.headRailDropDown = Ti.UI.createView({
        layout: "vertical",
        top: "105dp",
        right: 0,
        width: "49%",
        zIndex: "99",
        height: "40dp",
        id: "headRailDropDown"
    });
    $.__views.manual.add($.__views.headRailDropDown);
    $.__views.__alloyId406 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "0dp",
        layout: "horizontal",
        touchEnabled: false,
        zIndex: 0,
        id: "__alloyId406"
    });
    $.__views.headRailDropDown.add($.__views.__alloyId406);
    $.__views.headrailLbl = Ti.UI.createLabel({
        left: "5%",
        top: "0dp",
        width: "75%",
        height: "40dp",
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        color: "#e65e48",
        touchEnabled: false,
        text: "HEADRAIL TYPE",
        id: "headrailLbl"
    });
    $.__views.__alloyId406.add($.__views.headrailLbl);
    $.__views.__alloyId407 = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "10dp"
        },
        rigth: "0dp",
        width: "18%",
        height: "40dp",
        text: Alloy.Globals.icon.expandFill,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "#a6ffffff",
        touchEnabled: false,
        id: "__alloyId407"
    });
    $.__views.__alloyId406.add($.__views.__alloyId407);
    $.__views.headRailScroll = Ti.UI.createScrollView({
        layout: "vertical",
        backgroundColor: "#595959",
        height: 0,
        id: "headRailScroll"
    });
    $.__views.headRailDropDown.add($.__views.headRailScroll);
    $.__views.__alloyId408 = Ti.UI.createView({
        height: "0.5dp",
        width: Titanium.UI.FILL,
        backgroundColor: "#666666",
        top: "100dp",
        zIndex: 0,
        id: "__alloyId408"
    });
    $.__views.manual.add($.__views.__alloyId408);
    $.__views.__alloyId409 = Ti.UI.createView({
        height: "0.5dp",
        width: Titanium.UI.FILL,
        backgroundColor: "#666666",
        top: "145dp",
        zIndex: 0,
        id: "__alloyId409"
    });
    $.__views.manual.add($.__views.__alloyId409);
    $.__views.automatic = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        id: "automatic",
        title: "AUTOMATIC"
    });
    __alloyId399.push($.__views.automatic);
    $.__views.__alloyId410 = Ti.UI.createView({
        layout: "vertical",
        top: "0",
        height: "100dp",
        id: "__alloyId410"
    });
    $.__views.automatic.add($.__views.__alloyId410);
    $.__views.cost1 = Ti.UI.createLabel({
        font: {
            fontSize: "22dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        width: "80%",
        height: "40dp",
        color: "#ffffff",
        backgroundColor: "transparent",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "12,000 APX",
        id: "cost1"
    });
    $.__views.__alloyId410.add($.__views.cost1);
    $.__views.__alloyId411 = Ti.UI.createLabel({
        font: {
            fontSize: "8dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        width: "80%",
        height: "15dp",
        color: "#ffffff",
        backgroundColor: "transparent",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "MINIMUM CHARGES APPLICABLE",
        id: "__alloyId411"
    });
    $.__views.__alloyId410.add($.__views.__alloyId411);
    $.__views.controlDropDown1 = Ti.UI.createView({
        layout: "vertical",
        top: "105dp",
        left: 0,
        width: "49%",
        zIndex: "99",
        height: "40dp",
        id: "controlDropDown1"
    });
    $.__views.automatic.add($.__views.controlDropDown1);
    $.__views.__alloyId412 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "0dp",
        layout: "horizontal",
        touchEnabled: false,
        id: "__alloyId412"
    });
    $.__views.controlDropDown1.add($.__views.__alloyId412);
    $.__views.controlLbl1 = Ti.UI.createLabel({
        left: "5%",
        top: "0dp",
        width: "75%",
        height: "40dp",
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        color: "#e65e48",
        touchEnabled: false,
        text: "CONTROL LOCATION",
        id: "controlLbl1"
    });
    $.__views.__alloyId412.add($.__views.controlLbl1);
    $.__views.__alloyId413 = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "10dp"
        },
        rigth: "0dp",
        width: "18%",
        height: "40dp",
        text: Alloy.Globals.icon.expandFill,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "#a6ffffff",
        touchEnabled: false,
        id: "__alloyId413"
    });
    $.__views.__alloyId412.add($.__views.__alloyId413);
    $.__views.controlScroll1 = Ti.UI.createScrollView({
        layout: "vertical",
        backgroundColor: "#595959",
        height: 0,
        id: "controlScroll1"
    });
    $.__views.controlDropDown1.add($.__views.controlScroll1);
    $.__views.__alloyId414 = Ti.UI.createView({
        top: "102.5dp",
        width: "0.5dp",
        height: "40dp",
        backgroundColor: "#666666",
        id: "__alloyId414"
    });
    $.__views.automatic.add($.__views.__alloyId414);
    $.__views.headRailDropDown1 = Ti.UI.createView({
        layout: "vertical",
        top: "105dp",
        right: 0,
        width: "49%",
        zIndex: "99",
        height: "40dp",
        id: "headRailDropDown1"
    });
    $.__views.automatic.add($.__views.headRailDropDown1);
    $.__views.__alloyId415 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "0dp",
        layout: "horizontal",
        touchEnabled: false,
        zIndex: 0,
        id: "__alloyId415"
    });
    $.__views.headRailDropDown1.add($.__views.__alloyId415);
    $.__views.headrailLbl1 = Ti.UI.createLabel({
        left: "5%",
        top: "0dp",
        width: "75%",
        height: "40dp",
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        color: "#e65e48",
        touchEnabled: false,
        text: "HEADRAIL TYPE",
        id: "headrailLbl1"
    });
    $.__views.__alloyId415.add($.__views.headrailLbl1);
    $.__views.__alloyId416 = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "10dp"
        },
        rigth: "0dp",
        width: "18%",
        height: "40dp",
        text: Alloy.Globals.icon.expandFill,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "#a6ffffff",
        touchEnabled: false,
        id: "__alloyId416"
    });
    $.__views.__alloyId415.add($.__views.__alloyId416);
    $.__views.headRailScroll1 = Ti.UI.createScrollView({
        layout: "vertical",
        backgroundColor: "#595959",
        height: 0,
        id: "headRailScroll1"
    });
    $.__views.headRailDropDown1.add($.__views.headRailScroll1);
    $.__views.__alloyId417 = Ti.UI.createView({
        height: "0.5dp",
        width: Titanium.UI.FILL,
        backgroundColor: "#666666",
        top: "100dp",
        zIndex: 0,
        id: "__alloyId417"
    });
    $.__views.automatic.add($.__views.__alloyId417);
    $.__views.__alloyId418 = Ti.UI.createView({
        height: "0.5dp",
        width: Titanium.UI.FILL,
        backgroundColor: "#666666",
        top: "145dp",
        zIndex: 0,
        id: "__alloyId418"
    });
    $.__views.automatic.add($.__views.__alloyId418);
    $.__views.scrollableView = Ti.UI.createScrollableView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        top: 0,
        views: __alloyId399,
        id: "scrollableView"
    });
    $.__views.__alloyId397.add($.__views.scrollableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    googleAnalyticsScreen("ESTIMATE CALCULATOR");
    isAppointment = false;
    touchEffect.createTouchEffect($.getQuote, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.refreshIcon, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.estimateCloseLbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.whr2Buy1, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.freeHomeConsultation1, "#a6e65e48", "#e65e48");
    $.superView.addEventListener("click", function(e) {
        if ("TextField" != e.source.type) {
            $.textForWidth.blur();
            $.textForHeight.blur();
        }
    });
    var measurement = [ "MILLIMETER", "CENTIMETER", "INCH", "FEET" ];
    var operations = [ "MANUAL", "MOTORISED" ];
    if (args.IS_EVO && args.IS_CLASSIC) {
        var cassetteObj = [ "EVO", "CLASSIC" ];
        $.clothLbl.text = "EVO";
    } else if (args.IS_EVO) {
        var cassetteObj = [ "EVO" ];
        $.clothLbl.text = "EVO";
    } else if (args.IS_CLASSIC) {
        var cassetteObj = [ "CLASSIC" ];
        $.clothLbl.text = "CLASSIC";
    } else {
        var cassetteObj = [];
        $.clothLbl.text = "";
    }
    setMeasurements();
    setFitting();
    setClothing();
    var measurementFlag = true;
    var fittingFlag = true;
    var clothFlag = true;
    $.measurementDropDown.addEventListener("click", function(e) {
        if (measurementFlag) {
            $.measurementDropDown.height = Titanium.UI.SIZE;
            $.measurementDropDown.backgroundColor = "#404040";
            $.measurementLbl.parent.children[1].text = Alloy.Globals.icon.expand;
            $.measurementScroll.height = "150";
            measurementFlag = false;
        } else {
            if (e.source.text) {
                $.measurementLbl.text = e.source.text;
                onMeasurementChange(e.source.text);
            }
            $.measurementLbl.parent.children[1].text = Alloy.Globals.icon.expandFill;
            $.measurementDropDown.backgroundColor = "transparent";
            $.measurementDropDown.height = "40dp";
            measurementFlag = true;
        }
    });
    $.fittingDropDown.addEventListener("click", function(e) {
        if (fittingFlag) {
            $.fittingDropDown.height = Titanium.UI.SIZE;
            $.fittingDropDown.backgroundColor = "#404040";
            $.fittingScroll.height = Titanium.UI.SIZE;
            $.fittingLbl.parent.children[1].text = Alloy.Globals.icon.expand;
            fittingFlag = false;
        } else {
            e.source.text && ($.fittingLbl.text = e.source.text);
            $.fittingLbl.parent.children[1].text = Alloy.Globals.icon.expandFill;
            $.fittingDropDown.backgroundColor = "transparent";
            $.fittingDropDown.height = "40dp";
            fittingFlag = true;
        }
    });
    $.clothDropDown.addEventListener("click", function(e) {
        if (clothFlag) {
            $.clothDropDown.height = Titanium.UI.SIZE;
            $.clothDropDown.backgroundColor = "#404040";
            $.clothScroll.height = Titanium.UI.SIZE;
            $.clothLbl.parent.children[1].text = Alloy.Globals.icon.expand;
            clothFlag = false;
        } else {
            e.source.text && ($.clothLbl.text = e.source.text);
            $.clothLbl.parent.children[1].text = Alloy.Globals.icon.expandFill;
            $.clothDropDown.backgroundColor = "transparent";
            $.clothDropDown.height = "40dp";
            clothFlag = true;
        }
    });
    $.getQuote.addEventListener("click", function(e) {
        if ("SELECT OPERATION" == $.fittingLbl.text) {
            showAlert($.estimate, "Please select a operation.");
            return;
        }
        if ("CASSETTE" == $.clothLbl.text) {
            showAlert($.estimate, "Please select a cassette.");
            return;
        }
        if (parseFloat($.textForWidth.getValue()) > conversion(args.MAX_WIDTH, "", $.textForWidth.unit) || parseFloat($.textForWidth.getValue()) < conversion(250, "", $.textForWidth.unit)) {
            showAlert($.estimate, "Width cannot be less than " + conversion(250, "", $.textForWidth.unit) + " and more than " + conversion(args.MAX_WIDTH, "", $.textForWidth.unit) + " " + $.textForWidth.unit + ".");
            return;
        }
        if (parseFloat($.textForHeight.getValue()) > conversion(args.MAX_DROP, "", $.textForHeight.unit) || parseFloat($.textForHeight.getValue()) < conversion(250, "", $.textForHeight.unit)) {
            showAlert($.estimate, "Height cannot be less than " + conversion(250, "", $.textForHeight.unit) + " and more than " + conversion(args.MAX_DROP, "", $.textForHeight.unit) + " " + $.textForWidth.unit + ".");
            return;
        }
        switch ($.measurementLbl.getText()) {
          case "MILLIMETER":
            var widthInM = $.textForWidth.getValue() / 1e3;
            var dropInM = $.textForHeight.getValue() / 1e3;
            var valueInMM = $.textForWidth.getValue();
            break;

          case "CENTIMETER":
            var widthInM = $.textForWidth.getValue() / 100;
            var dropInM = $.textForHeight.getValue() / 100;
            var valueInMM = cmToMM($.textForWidth.getValue());
            break;

          case "INCH":
            var widthInM = $.textForWidth.getValue() / 39.37;
            var dropInM = $.textForHeight.getValue() / 39.37;
            var valueInMM = inchToMM($.textForWidth.getValue());
            break;

          case "FEET":
            var widthInM = $.textForWidth.getValue() / 3.28084;
            var dropInM = $.textForHeight.getValue() / 3.28084;
            var valueInMM = feetToMM($.textForWidth.getValue());
        }
        var calculatedSize = widthInM * dropInM;
        var url = Alloy.Globals.commonUrl.blindsCalculator;
        var data = {
            calculatedSize: calculatedSize,
            blind_type_id: args.BLIND_TYPE_ID,
            blind_fabric_group_id: args.BLIND_FABRIC_GROUP_ID,
            blinds_operation: $.fittingLbl.getText(),
            blinds_category: args.BLIND_CATEGORY,
            blinds_category_id: args.BLIND_CATEGORY_ID,
            blinds_cassette: $.clothLbl.getText(),
            widthInM: parseFloat(valueInMM) / 1e3
        };
        var requestParams = JSON.stringify(data);
        Alloy.Globals.webServiceCall(url, requestParams, getBlindsEstimateSuccessCallback, getBlindsEstimateErrorCallback, "POST", $.estimate);
    });
    $.whr2Buy1.addEventListener("click", function(e) {
        Alloy.Globals.addWindowInNav("findStore");
    });
    __defers["$.__views.estimate!android:back!goToBack"] && $.addListener($.__views.estimate, "android:back", goToBack);
    __defers["$.__views.estimate!open!refresh"] && $.addListener($.__views.estimate, "open", refresh);
    __defers["$.__views.estimate!close!clearMemory"] && $.addListener($.__views.estimate, "close", clearMemory);
    __defers["$.__views.refreshIcon!click!refresh"] && $.addListener($.__views.refreshIcon, "click", refresh);
    __defers["$.__views.estimateCloseLbl!click!goToBack"] && $.addListener($.__views.estimateCloseLbl, "click", goToBack);
    __defers["$.__views.freeHomeConsultation1!click!navigateToAppointment"] && $.addListener($.__views.freeHomeConsultation1, "click", navigateToAppointment);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;