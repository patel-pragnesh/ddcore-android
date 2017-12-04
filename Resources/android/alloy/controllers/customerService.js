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
        getCustomerServiceDetails();
    }
    function dial(e) {
        Ti.Platform.openURL("tel:" + e.source.getText());
    }
    function mailTo(e) {
        Ti.Platform.openURL("mailto:" + e.source.getText());
    }
    function setOrderStatus(data) {
        var x;
        for (x in data) {
            var orderTypeLbl = $.UI.create("Label", {
                classes: "fontLight inputText",
                width: Titanium.UI.FILL,
                text: data[x].toUpperCase(),
                orderType: x,
                touchEnabled: true
            });
            var orderTypeSeparator = $.UI.create("View", {
                classes: "horizontalSeparator",
                left: "10dp",
                right: "10dp",
                touchEnabled: false
            });
            $.orderTypeScroll.add(orderTypeLbl);
            $.orderTypeScroll.add(orderTypeSeparator);
        }
    }
    function setOrderNo(data) {
        try {
            $.orderNoScroll.removeAllChildren();
            _.each(data, function(value, k) {
                var orderNoLbl = $.UI.create("Label", {
                    classes: "fontLight inputText",
                    width: Titanium.UI.FILL,
                    text: value.increment_id,
                    orderId: value,
                    touchEnabled: true,
                    orderItems: value.order_items
                });
                var orderNoSeparator = $.UI.create("View", {
                    classes: "horizontalSeparator",
                    left: "10dp",
                    right: "10dp",
                    touchEnabled: false
                });
                $.orderNoScroll.add(orderNoLbl);
                $.orderNoScroll.add(orderNoSeparator);
            });
        } catch (exp) {
            Ti.API.info("order number expcetion--->" + exp.message);
        }
    }
    function setOrderItem(data) {
        try {
            $.orderItemScroll.removeAllChildren();
            var orderItemLbl = $.UI.create("Label", {
                classes: "fontLight inputText",
                width: Titanium.UI.FILL,
                text: "ALL PRODUCTS",
                touchEnabled: true,
                product_sku: "All Products"
            });
            var orderItemSeparator = $.UI.create("View", {
                classes: "horizontalSeparator",
                left: "10dp",
                right: "10dp",
                touchEnabled: false
            });
            $.orderItemScroll.add(orderItemLbl);
            $.orderItemScroll.add(orderItemSeparator);
            _.each(data, function(value, k) {
                var orderItemLbl = $.UI.create("Label", {
                    classes: "fontLight inputText",
                    width: Titanium.UI.FILL,
                    text: value.product_name.toUpperCase(),
                    touchEnabled: true,
                    product_sku: value.product_name + "(" + value.product_sku + ")"
                });
                var orderItemSeparator = $.UI.create("View", {
                    classes: "horizontalSeparator",
                    left: "10dp",
                    right: "10dp",
                    touchEnabled: false
                });
                $.orderItemScroll.add(orderItemLbl);
                $.orderItemScroll.add(orderItemSeparator);
            });
        } catch (exp) {
            Ti.API.info("order product expcetion--->" + exp.message);
        }
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
    function getCustomerServiceDetails() {
        showLoader($.customerService);
        var requestMethod = Alloy.Globals.commonUrl.getCustomerServiceDetails;
        Alloy.Globals.webServiceCall(requestMethod, {}, getCustomerServiceDetailsSuccessCallback, getCustomerServiceDetailsErrorCallback, "POST", $.customerService);
    }
    function getCustomerServiceDetailsSuccessCallback(response) {
        $.email.setText(response.data.write_to_us);
        $.phoneNo.setText(response.data.buzz_us);
        allOrder = response.data.all_orders;
        if (allOrder.length > 0) {
            setOrderStatus(response.data.order_status);
            setReasons(response.data.what_is_it_about);
            selectOrderInfo(response);
            hideLoader();
        } else {
            hideLoader();
            showAlert($.customerService, "No Orders");
        }
    }
    function getCustomerServiceDetailsErrorCallback(response) {
        hideLoader();
        showAlert($.customerService, response.message);
    }
    function openCamera(e) {
        if (e.source.text === Alloy.Globals.icon.camera) {
            var cropping = require("cropping");
            cropping.callimagecrop($.attachedImage, $.customerService, {
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
    function saveCustomerService() {
        if ("ORDER NUMBER" === $.orderNumber.getText()) showAlert($.customerService, "Please Select the Order No."); else if ("SELECT ORDER ITEM" === $.orderNumber.getText()) showAlert($.customerService, "Please Select the Order Item"); else if ("WHAT IS IT ABOUT?" === $.reasonSelect.getText()) showAlert($.customerService, "Please Select Question "); else {
            var base64String = "";
            $.camera.getText() === Alloy.Globals.icon.deleteIcon && (base64String = Ti.Utils.base64encode($.attachedImage.image).toString());
            showLoader($.customerService);
            var requestMethod = Alloy.Globals.commonUrl.saveCustomerService;
            var param = {
                order_number: $.orderNumber.getText(),
                quiz_about: $.reasonSelect.getText(),
                note: $.reason.getValue(),
                base_image: base64String,
                order_item: $.orderItem.product_sku
            };
            var requestParameter = JSON.stringify(param);
            Alloy.Globals.webServiceCall(requestMethod, requestParameter, saveCustomerServiceSuccessCallback, saveCustomerServiceErrorCallback, "POST", $.customerService);
        }
    }
    function saveCustomerServiceSuccessCallback(response) {
        hideLoader();
        showAlert($.customerService, response.message);
        setTimeout(function() {
            goToBack();
        }, 600);
    }
    function saveCustomerServiceErrorCallback(response) {
        Ti.API.info("save customer service error -->" + JSON.stringify(response));
        hideLoader();
        showAlert($.customerService, response.message);
    }
    function cleanUp() {
        $.customerService.remove($.superScroll);
        $.superScroll.removeAllChildren();
        $.removeListener();
        args = {};
        orderNoFlag = null, reasonFlag = null;
        $.destroy();
    }
    function hideKeyboard() {
        Ti.UI.Android.hideSoftKeyboard();
    }
    function goToBack() {
        Alloy.Globals.popWindowInNav();
        $.customerService.close();
    }
    function updateCount() {}
    function selectOrderInfo(response) {
        var data = response.data;
        if (null != orderInfo) {
            var orderStatus = data.order_status;
            var getOrderStatus = _.pick(orderStatus, orderInfo.order_status);
            var orderStatus0 = _.values(getOrderStatus).toString();
            var orderStatus1 = _.keys(getOrderStatus);
            $.orderType.setText(orderStatus0.toUpperCase());
            $.orderType.key = orderStatus1.toString();
            $.orderType.setColor("#a0a0a0");
            orderTypeFlag = true;
            var getAllOrder = allOrder;
            var filterData = _.where(getAllOrder, {
                status: $.orderType.key
            });
            setOrderNo(filterData);
            $.orderNumber.setText(orderInfo.order_id);
            $.orderNumber.setColor("#a0a0a0");
            orderNoFlag = true;
            var productData = _.findWhere(filterData, {
                increment_id: orderInfo.order_id
            });
            var productDetail = _.findWhere(productData.order_items, {
                product_id: orderInfo.product_id
            });
            if ("cancelation_requested" == $.orderType.key || "dispatched" == $.orderType.key) {
                $.orderItem.text = "ALL PRODUCTS";
                $.orderItem.product_sku = "All Products";
            } else {
                $.orderItem.text = productDetail.product_name.toUpperCase();
                $.orderItem.product_sku = productDetail.product_name + "(" + productDetail.product_sku + ")";
            }
            setOrderItem(productData.order_items);
            orderItemFlag = false;
        }
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "customerService";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.customerService = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        backgroundColor: "#ffffff",
        id: "customerService"
    });
    $.__views.customerService && $.addTopLevelView($.__views.customerService);
    cleanUp ? $.addListener($.__views.customerService, "close", cleanUp) : __defers["$.__views.customerService!close!cleanUp"] = true;
    goToBack ? $.addListener($.__views.customerService, "android:back", goToBack) : __defers["$.__views.customerService!android:back!goToBack"] = true;
    updateCount ? $.addListener($.__views.customerService, "focus", updateCount) : __defers["$.__views.customerService!focus!updateCount"] = true;
    hideKeyboard ? $.addListener($.__views.customerService, "touchstart", hideKeyboard) : __defers["$.__views.customerService!touchstart!hideKeyboard"] = true;
    $.__views.header = Alloy.createWidget("headerView", "widget", {
        id: "header",
        __parentSymbol: $.__views.customerService
    });
    $.__views.header.setParent($.__views.customerService);
    $.__views.superScroll = Ti.UI.createScrollView({
        top: "53dp",
        scrollType: "vertical",
        layout: "vertical",
        scrollingEnabled: true,
        id: "superScroll"
    });
    $.__views.customerService.add($.__views.superScroll);
    $.__views.__alloyId315 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId315"
    });
    $.__views.superScroll.add($.__views.__alloyId315);
    $.__views.__alloyId316 = Ti.UI.createView({
        left: "20dp",
        right: "20dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId316"
    });
    $.__views.__alloyId315.add($.__views.__alloyId316);
    $.__views.__alloyId317 = Ti.UI.createLabel({
        top: "22dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "10dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#333333",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "WRITE TO US",
        id: "__alloyId317"
    });
    $.__views.__alloyId316.add($.__views.__alloyId317);
    $.__views.email = Ti.UI.createLabel({
        top: "5dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#e65e48",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        id: "email"
    });
    $.__views.__alloyId316.add($.__views.email);
    mailTo ? $.addListener($.__views.email, "click", mailTo) : __defers["$.__views.email!click!mailTo"] = true;
    $.__views.__alloyId318 = Ti.UI.createLabel({
        top: "22dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "10dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#333333",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "BUZZ US",
        id: "__alloyId318"
    });
    $.__views.__alloyId316.add($.__views.__alloyId318);
    $.__views.phoneNo = Ti.UI.createLabel({
        top: "5dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#e65e48",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        id: "phoneNo"
    });
    $.__views.__alloyId316.add($.__views.phoneNo);
    dial ? $.addListener($.__views.phoneNo, "click", dial) : __defers["$.__views.phoneNo!click!dial"] = true;
    $.__views.__alloyId319 = Ti.UI.createView({
        bottom: 0,
        height: "1dp",
        width: Titanium.UI.FILL,
        backgroundColor: "#cccccc",
        top: "18dp",
        id: "__alloyId319"
    });
    $.__views.__alloyId315.add($.__views.__alloyId319);
    $.__views.__alloyId320 = Ti.UI.createView({
        left: "20dp",
        right: "20dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId320"
    });
    $.__views.__alloyId315.add($.__views.__alloyId320);
    $.__views.__alloyId321 = Ti.UI.createLabel({
        top: "25dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "10dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#333333",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "ORDER ENQUIRY",
        id: "__alloyId321"
    });
    $.__views.__alloyId320.add($.__views.__alloyId321);
    $.__views.orderTypeDropDown = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "orderTypeDropDown",
        top: "50dp",
        zIndex: 4
    });
    $.__views.__alloyId320.add($.__views.orderTypeDropDown);
    $.__views.orderType = Ti.UI.createLabel({
        top: 0,
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
        text: "ORDER TYPE",
        id: "orderType"
    });
    $.__views.orderTypeDropDown.add($.__views.orderType);
    $.__views.dropDown0 = Ti.UI.createLabel({
        top: 0,
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
        id: "dropDown0",
        type: "icon"
    });
    $.__views.orderTypeDropDown.add($.__views.dropDown0);
    $.__views.orderTypeScroll = Ti.UI.createScrollView({
        layout: "vertical",
        top: "35dp",
        backgroundColor: "#ffffff",
        height: 0,
        borderColor: "#cccccc",
        id: "orderTypeScroll",
        zIndex: 4
    });
    $.__views.orderTypeDropDown.add($.__views.orderTypeScroll);
    $.__views.__alloyId322 = Ti.UI.createView({
        bottom: 0,
        height: "1dp",
        width: Titanium.UI.FILL,
        backgroundColor: "#cccccc",
        top: "80dp",
        id: "__alloyId322"
    });
    $.__views.__alloyId320.add($.__views.__alloyId322);
    $.__views.orderNoDropDown = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "orderNoDropDown",
        top: "85dp",
        zIndex: 3
    });
    $.__views.__alloyId320.add($.__views.orderNoDropDown);
    $.__views.orderNumber = Ti.UI.createLabel({
        top: 0,
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
        text: "ORDER NUMBER",
        id: "orderNumber"
    });
    $.__views.orderNoDropDown.add($.__views.orderNumber);
    $.__views.dropDown1 = Ti.UI.createLabel({
        top: 0,
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
        id: "dropDown1",
        type: "icon"
    });
    $.__views.orderNoDropDown.add($.__views.dropDown1);
    $.__views.orderNoScroll = Ti.UI.createScrollView({
        layout: "vertical",
        top: "35dp",
        backgroundColor: "#ffffff",
        height: 0,
        borderColor: "#cccccc",
        id: "orderNoScroll",
        zIndex: 3
    });
    $.__views.orderNoDropDown.add($.__views.orderNoScroll);
    $.__views.__alloyId323 = Ti.UI.createView({
        bottom: 0,
        height: "1dp",
        width: Titanium.UI.FILL,
        backgroundColor: "#cccccc",
        top: "115dp",
        id: "__alloyId323"
    });
    $.__views.__alloyId320.add($.__views.__alloyId323);
    $.__views.orderItemDropDown = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "orderItemDropDown",
        top: "120dp",
        zIndex: 2
    });
    $.__views.__alloyId320.add($.__views.orderItemDropDown);
    $.__views.orderItem = Ti.UI.createLabel({
        top: 0,
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
        text: "SELECT ORDER ITEM",
        id: "orderItem"
    });
    $.__views.orderItemDropDown.add($.__views.orderItem);
    $.__views.dropDown3 = Ti.UI.createLabel({
        top: 0,
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
        id: "dropDown3",
        type: "icon"
    });
    $.__views.orderItemDropDown.add($.__views.dropDown3);
    $.__views.orderItemScroll = Ti.UI.createScrollView({
        layout: "vertical",
        top: "35dp",
        backgroundColor: "#ffffff",
        height: 0,
        borderColor: "#cccccc",
        id: "orderItemScroll",
        zIndex: 2
    });
    $.__views.orderItemDropDown.add($.__views.orderItemScroll);
    $.__views.__alloyId324 = Ti.UI.createView({
        bottom: 0,
        height: "1dp",
        width: Titanium.UI.FILL,
        backgroundColor: "#cccccc",
        top: "150dp",
        id: "__alloyId324"
    });
    $.__views.__alloyId320.add($.__views.__alloyId324);
    $.__views.reasonDropDown = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "reasonDropDown",
        top: "160dp",
        zIndex: 1
    });
    $.__views.__alloyId320.add($.__views.reasonDropDown);
    $.__views.reasonSelect = Ti.UI.createLabel({
        top: 0,
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
        id: "reasonSelect"
    });
    $.__views.reasonDropDown.add($.__views.reasonSelect);
    $.__views.dropDown2 = Ti.UI.createLabel({
        top: 0,
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
        id: "dropDown2",
        type: "icon"
    });
    $.__views.reasonDropDown.add($.__views.dropDown2);
    $.__views.reasonScroll = Ti.UI.createScrollView({
        layout: "vertical",
        top: "35dp",
        backgroundColor: "#ffffff",
        height: 0,
        borderColor: "#cccccc",
        id: "reasonScroll",
        zIndex: 2
    });
    $.__views.reasonDropDown.add($.__views.reasonScroll);
    $.__views.__alloyId325 = Ti.UI.createView({
        bottom: 0,
        height: "1dp",
        width: Titanium.UI.FILL,
        backgroundColor: "#cccccc",
        top: "190dp",
        id: "__alloyId325"
    });
    $.__views.__alloyId320.add($.__views.__alloyId325);
    $.__views.__alloyId326 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "200dp",
        layout: "vertical",
        id: "__alloyId326"
    });
    $.__views.__alloyId320.add($.__views.__alloyId326);
    $.__views.reason = Ti.UI.createTextArea({
        left: "5dp",
        right: "10dp",
        width: Titanium.UI.FILL,
        height: "38dp",
        color: "#a0a0a0",
        hintTextColor: "#a0a0a0",
        backgroundColor: "transparent",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "15dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        id: "reason",
        bottom: "10dp",
        hintText: "TELL US ABOUT IT.."
    });
    $.__views.__alloyId326.add($.__views.reason);
    $.__views.__alloyId327 = Ti.UI.createView({
        bottom: 0,
        height: "1dp",
        width: Titanium.UI.FILL,
        backgroundColor: "#cccccc",
        id: "__alloyId327"
    });
    $.__views.__alloyId326.add($.__views.__alloyId327);
    $.__views.__alloyId328 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "260dp",
        id: "__alloyId328"
    });
    $.__views.__alloyId320.add($.__views.__alloyId328);
    $.__views.camera = Ti.UI.createLabel({
        top: 0,
        right: "10dp",
        text: Alloy.Globals.icon.camera,
        width: Titanium.UI.SIZE,
        height: "35dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "#333333",
        font: {
            fontSize: "25dp",
            fontFamily: "icomoon"
        },
        zIndex: 1,
        isImageAttached: false,
        id: "camera"
    });
    $.__views.__alloyId328.add($.__views.camera);
    openCamera ? $.addListener($.__views.camera, "click", openCamera) : __defers["$.__views.camera!click!openCamera"] = true;
    $.__views.__alloyId329 = Ti.UI.createView({
        right: "60dp",
        width: "70dp",
        height: "70dp",
        id: "__alloyId329"
    });
    $.__views.__alloyId328.add($.__views.__alloyId329);
    $.__views.attachedImage = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        id: "attachedImage"
    });
    $.__views.__alloyId329.add($.__views.attachedImage);
    $.__views.__alloyId330 = Ti.UI.createView({
        left: "20dp",
        right: "20dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        top: "20dp",
        bottom: "20dp",
        id: "__alloyId330"
    });
    $.__views.__alloyId315.add($.__views.__alloyId330);
    $.__views.submit = Ti.UI.createLabel({
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
    $.__views.__alloyId330.add($.__views.submit);
    saveCustomerService ? $.addListener($.__views.submit, "click", saveCustomerService) : __defers["$.__views.submit!click!saveCustomerService"] = true;
    $.__views.cancel = Ti.UI.createLabel({
        top: "15dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#e65e48",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        left: "30dp",
        right: "30dp",
        text: "Cancel",
        id: "cancel"
    });
    $.__views.__alloyId330.add($.__views.cancel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var orderInfo = null;
    isNullVal(args.orderInfo) || (orderInfo = args.orderInfo);
    $.header.getView("cartContainer").setVisible(false);
    $.header.getView("searchLbl").setVisible(false);
    $.header.getView("overFlowMenuLbl").setVisible(false);
    var orderNoFlag = true, reasonFlag = true, orderTypeFlag = true, orderItemFlag = true;
    var allOrder = null;
    $.reason.blur();
    $.header.init({
        title: "CUSTOMER SERVICE",
        passWindow: $.customerService
    });
    googleAnalyticsScreen("CUSTOMER SERVICE");
    touchEffect.createTouchEffect($.phoneNo, "#a6e65e48", "#e65e48");
    touchEffect.createTouchEffect($.email, "#a6e65e48", "#e65e48");
    touchEffect.createTouchEffect($.orderNumber, "#a6a0a0a0", "#a0a0a0");
    touchEffect.createTouchEffect($.reasonSelect, "#a6a0a0a0", "#a0a0a0");
    touchEffect.createTouchEffect($.dropDown1, "#a6333333", "#333333");
    touchEffect.createTouchEffect($.dropDown2, "#a6333333", "#333333");
    touchEffect.createTouchEffect($.camera, "#a6333333", "#333333");
    touchEffect.createTouchEffect($.submit, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.cancel, "#a6e65e48", "#e65e48");
    init();
    $.orderTypeDropDown.addEventListener("click", function(e) {
        if (orderTypeFlag) {
            $.orderTypeDropDown.backgroundColor = "#cccccc";
            $.orderType.color = "#ffffff";
            $.orderTypeScroll.height = "150";
            orderTypeFlag = false;
        } else {
            if (e.source.text && "icon" != e.source.type && $.orderType.text != e.source.text) {
                $.orderNumber.setText("ORDER NUMBER");
                $.orderItem.setText("SELECT ORDER ITEM");
                $.orderType.text = e.source.text;
                $.orderType.key = e.source.orderType;
                var getAllOrder = allOrder;
                var filterData = _.where(getAllOrder, {
                    status: $.orderType.key
                });
                setOrderNo(filterData);
            }
            $.orderType.color = "#a0a0a0";
            $.orderTypeDropDown.backgroundColor = "transparent";
            $.orderTypeScroll.height = "0";
            orderTypeFlag = true;
        }
    });
    $.orderNoDropDown.addEventListener("click", function(e) {
        if (orderNoFlag) {
            $.orderNoDropDown.backgroundColor = "#cccccc";
            $.orderNumber.color = "#ffffff";
            $.orderNoScroll.height = "150";
            orderNoFlag = false;
        } else {
            if (e.source.text && "icon" != e.source.type) {
                $.orderNumber.text != e.source.text && $.orderItem.setText("SELECT ORDER ITEM");
                $.orderNumber.text = e.source.text;
                void 0 != e.source.orderItems && setOrderItem(e.source.orderItems);
            }
            $.orderNumber.color = "#a0a0a0";
            $.orderNoDropDown.backgroundColor = "transparent";
            $.orderNoScroll.height = "0";
            orderNoFlag = true;
        }
    });
    $.reasonDropDown.addEventListener("click", function(e) {
        if (reasonFlag) {
            $.reasonDropDown.backgroundColor = "#cccccc";
            $.reasonSelect.color = "#ffffff";
            $.reasonScroll.height = "150";
            reasonFlag = false;
        } else {
            e.source.text && "icon" != e.source.type && ($.reasonSelect.text = e.source.text);
            $.reasonSelect.color = "#a0a0a0";
            $.reasonDropDown.backgroundColor = "transparent";
            $.reasonScroll.height = "0";
            reasonFlag = true;
        }
    });
    $.orderItemDropDown.addEventListener("click", function(e) {
        if (orderItemFlag) {
            $.orderItemDropDown.backgroundColor = "#cccccc";
            $.orderItem.color = "#ffffff";
            $.orderItemScroll.height = "150";
            orderItemFlag = false;
        } else {
            if (e.source.text && "icon" != e.source.type) {
                $.orderItem.text = e.source.text;
                $.orderItem.product_sku = e.source.product_sku;
            }
            $.orderItem.color = "#a0a0a0";
            $.orderItemDropDown.backgroundColor = "transparent";
            $.orderItemScroll.height = "0";
            orderItemFlag = true;
        }
    });
    $.cancel.addEventListener("click", function() {
        goToBack();
    });
    hideKeyboard();
    __defers["$.__views.customerService!close!cleanUp"] && $.addListener($.__views.customerService, "close", cleanUp);
    __defers["$.__views.customerService!android:back!goToBack"] && $.addListener($.__views.customerService, "android:back", goToBack);
    __defers["$.__views.customerService!focus!updateCount"] && $.addListener($.__views.customerService, "focus", updateCount);
    __defers["$.__views.customerService!touchstart!hideKeyboard"] && $.addListener($.__views.customerService, "touchstart", hideKeyboard);
    __defers["$.__views.email!click!mailTo"] && $.addListener($.__views.email, "click", mailTo);
    __defers["$.__views.phoneNo!click!dial"] && $.addListener($.__views.phoneNo, "click", dial);
    __defers["$.__views.camera!click!openCamera"] && $.addListener($.__views.camera, "click", openCamera);
    __defers["$.__views.submit!click!saveCustomerService"] && $.addListener($.__views.submit, "click", saveCustomerService);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;