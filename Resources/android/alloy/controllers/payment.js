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
        getPaymentMethod();
    }
    function createOrderSuccessCallback(e) {
        try {
            orderData = e.data.product;
            orderId = e.data.order_id;
            orderTotal = e.data.total;
            $.header.getView("logoIcon").text = "PAYMENT PROCESSING";
            if (isNullVal(e.data.payment_url_ccavenue)) {
                hideShowView($.thankYouView);
                Ti.App.Properties.setString("cartCount", 0);
                Titanium.App.Properties.setList("removeCartProductIdArray", []);
                Titanium.App.Properties.setList("cartProductIdArray", []);
            } else {
                webview.setUrl(e.data.payment_url_ccavenue);
                $.payment.add(webview);
                webViewFlag = true;
            }
        } catch (ex) {
            Ti.API.info("catch = " + ex.message);
        }
    }
    function createOrderErrorCallback(e) {}
    function sendDataToGa() {
        Alloy.Globals.tracker.trackTransaction({
            transactionId: orderId,
            affiliation: "Estore",
            revenue: parseFloat(orderTotal),
            tax: 0,
            shipping: 0,
            currency: "INR"
        });
        _.each(orderData, function(value, key) {
            Alloy.Globals.tracker.trackTransactionItem({
                transactionId: orderId,
                name: value.product_name,
                sku: value.product_sku,
                category: value.product_tcCollection,
                price: parseFloat(value.product_price),
                quantity: parseFloat(value.product_qty),
                currency: "INR"
            });
        });
    }
    function selectPayment(paymentMethod) {
        $.placeOrder.touchEnabled = false;
        var quote_id = Ti.App.Properties.getString("quote_id");
        var url = Alloy.Globals.commonUrl.selectPayment;
        var data = {
            quoteId: quote_id,
            payment_method: paymentMethod
        };
        var requestParams = JSON.stringify(data);
        Alloy.Globals.webServiceCall(url, requestParams, selectPaymentSuccessCallback, selectPaymentErrorCallback, "POST", $.payment);
    }
    function selectPaymentSuccessCallback(e) {
        try {
            $.placeOrder.touchEnabled = true;
        } catch (ex) {
            $.placeOrder.touchEnabled = false;
            Ti.API.info("catch = " + ex.message);
        }
    }
    function selectPaymentErrorCallback(e) {
        $.placeOrder.touchEnabled = false;
    }
    function goToBack() {
        if (webViewFlag) hideShowView($.confirmationContainer); else {
            Alloy.Globals.popWindowInNav();
            $.payment.close();
        }
    }
    function closeAllWindow(e) {
        Alloy.Globals.popWindowInNav();
        Alloy.Globals.destroyWindowInNav();
        $.payment.close();
        Alloy.Globals.addWindowInNav("eshop");
    }
    function destroyWindow(e) {
        Ti.API.info("************** into clear Memory ***************");
        $.removeListener();
        $.payment.remove($.totalDisplayContainer);
        $.payment.remove($.addressLbl);
        $.payment.remove($.reviewLbl);
        $.payment.remove($.paymentLbl);
        $.payment.remove($.paymentContainer);
        $.payment.remove($.placeOrder);
        $.payment.remove($.confirmationContainer);
        $.payment.remove($.thankYouView);
        $.totalDisplayContainer.removeAllChildren();
        $.addressLbl.removeAllChildren();
        $.reviewLbl.removeAllChildren();
        $.paymentLbl.removeAllChildren();
        $.paymentContainer.removeAllChildren();
        $.placeOrder.removeAllChildren();
        $.confirmationContainer.removeAllChildren();
        $.thankYouView.removeAllChildren();
        args = {};
        paymentFlag = null;
        webViewFlag = null;
        $.destroy();
    }
    function updateCount() {
        $.header.updateCartCount();
    }
    function getPaymentMethod() {
        showTransparentLoader($.payment);
        var requestMethod = Alloy.Globals.commonUrl.getAvailablePaymentMethods;
        var param = {
            quoteId: Ti.App.Properties.getString("quote_id")
        };
        var requestParam = JSON.stringify(param);
        Alloy.Globals.webServiceCall(requestMethod, requestParam, getPaymentMethodSuccessCallback, getPaymentMethodErrorCallback, "POST", $.payment);
    }
    function getPaymentMethodSuccessCallback(response) {
        hideTransparentLoader();
        try {
            Ti.API.info("response.data.payment.length = " + response.data.payment.length);
            if (response.data.payment.length > 0) {
                Ti.API.info("inside if");
                _.each(response.data.payment, function(value, key) {
                    Ti.API.info("value =" + JSON.stringify(value) + "key =" + key);
                    paymentContainer[key] = Ti.UI.createView({
                        layout: "horizontal",
                        top: "2dp",
                        height: "40dp",
                        width: Ti.UI.FILL,
                        id: key,
                        value: value.code
                    });
                    var radioLbl = Ti.UI.createLabel({
                        width: "40dp",
                        height: "40dp",
                        color: "#dfdfdf",
                        font: {
                            fontSize: "14dp",
                            fontFamily: "icomoon"
                        },
                        touchEnabled: false,
                        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                        text: Alloy.Globals.icon.radio
                    });
                    paymentContainer[key].add(radioLbl);
                    var paymentName = Ti.UI.createLabel({
                        height: "40dp",
                        font: {
                            fontSize: "14dp",
                            fontFamily: "Futura Lt BT"
                        },
                        color: "#333333",
                        touchEnabled: false,
                        text: value.title
                    });
                    paymentContainer[key].add(paymentName);
                    $.paymentContainer.add(paymentContainer[key]);
                });
            }
        } catch (exp) {
            Ti.API.info("exp--->" + exp.message);
            showAlert($.payment, "Something went wrong");
        }
    }
    function getPaymentMethodErrorCallback(response) {
        showAlert($.payment, response.message);
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "payment";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.payment = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        backgroundColor: "#ffffff",
        id: "payment"
    });
    $.__views.payment && $.addTopLevelView($.__views.payment);
    goToBack ? $.addListener($.__views.payment, "android:back", goToBack) : __defers["$.__views.payment!android:back!goToBack"] = true;
    destroyWindow ? $.addListener($.__views.payment, "close", destroyWindow) : __defers["$.__views.payment!close!destroyWindow"] = true;
    updateCount ? $.addListener($.__views.payment, "focus", updateCount) : __defers["$.__views.payment!focus!updateCount"] = true;
    $.__views.header = Alloy.createWidget("headerView", "widget", {
        id: "header",
        __parentSymbol: $.__views.payment
    });
    $.__views.header.setParent($.__views.payment);
    $.__views.totalDisplayContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: "50dp",
        top: "53dp",
        backgroundColor: "#ffffff",
        id: "totalDisplayContainer"
    });
    $.__views.payment.add($.__views.totalDisplayContainer);
    $.__views.totalLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "18dp"
        },
        color: "#7e7d7d",
        left: "20dp",
        text: "TOTAL",
        id: "totalLbl"
    });
    $.__views.totalDisplayContainer.add($.__views.totalLbl);
    $.__views.__alloyId1134 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        right: 20,
        id: "__alloyId1134"
    });
    $.__views.totalDisplayContainer.add($.__views.__alloyId1134);
    $.__views.rupies = Ti.UI.createLabel({
        font: {
            fontSize: "11dp",
            fontFamily: "icomoon"
        },
        color: "#e65e48",
        text: Alloy.Globals.icon.currency,
        left: "0dp",
        top: "3dp",
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
        id: "rupies"
    });
    $.__views.__alloyId1134.add($.__views.rupies);
    $.__views.amountLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "futura-hv-bt-heavy",
            fontSize: "18dp"
        },
        color: "#e65e48",
        left: "10dp",
        id: "amountLbl"
    });
    $.__views.__alloyId1134.add($.__views.amountLbl);
    $.__views.__alloyId1135 = Ti.UI.createView({
        height: "1dp",
        width: "33%",
        left: "0dp",
        top: "103dp",
        zIndex: "2",
        backgroundColor: "#333333",
        id: "__alloyId1135"
    });
    $.__views.payment.add($.__views.__alloyId1135);
    $.__views.__alloyId1136 = Ti.UI.createView({
        height: "1dp",
        left: "34%",
        width: "33%",
        top: "103dp",
        zIndex: "2",
        backgroundColor: "#333333",
        id: "__alloyId1136"
    });
    $.__views.payment.add($.__views.__alloyId1136);
    $.__views.__alloyId1137 = Ti.UI.createView({
        height: "1dp",
        left: "68%",
        width: "33%",
        top: "103dp",
        zIndex: "2",
        backgroundColor: "#e65e48",
        id: "__alloyId1137"
    });
    $.__views.payment.add($.__views.__alloyId1137);
    $.__views.__alloyId1138 = Ti.UI.createView({
        height: "1dp",
        left: "0",
        width: Titanium.UI.FILL,
        top: "103dp",
        zIndex: "0",
        backgroundColor: "#e7e7e7",
        id: "__alloyId1138"
    });
    $.__views.payment.add($.__views.__alloyId1138);
    $.__views.addressLbl = Ti.UI.createLabel({
        top: "108",
        left: "10%",
        width: "33%",
        font: {
            fontSize: "10dp",
            fontFamily: "icomoon"
        },
        color: "#000000",
        id: "addressLbl"
    });
    $.__views.payment.add($.__views.addressLbl);
    $.__views.reviewLbl = Ti.UI.createLabel({
        left: "45%",
        top: "108",
        width: "33%",
        font: {
            fontSize: "11dp",
            fontFamily: "icomoon"
        },
        color: "#000000",
        id: "reviewLbl"
    });
    $.__views.payment.add($.__views.reviewLbl);
    $.__views.paymentLbl = Ti.UI.createLabel({
        left: "78%",
        top: "108",
        width: "33%",
        font: {
            fontSize: "11dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#000000",
        text: "PAYMENT",
        id: "paymentLbl"
    });
    $.__views.payment.add($.__views.paymentLbl);
    $.__views.paymentContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "paymentContainer",
        layout: "vertical",
        left: 0,
        top: "150dp"
    });
    $.__views.payment.add($.__views.paymentContainer);
    $.__views.placeOrder = Ti.UI.createLabel({
        height: "40dp",
        bottom: "0dp",
        font: {
            fontSize: "10dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        width: Titanium.UI.FILL,
        backgroundColor: "#e65e48",
        text: "PLACE ORDER",
        id: "placeOrder"
    });
    $.__views.payment.add($.__views.placeOrder);
    $.__views.confirmationContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        visible: false,
        zIndex: "15",
        backgroundColor: "#231f20",
        id: "confirmationContainer"
    });
    $.__views.payment.add($.__views.confirmationContainer);
    $.__views.__alloyId1139 = Ti.UI.createView({
        top: "0dp",
        width: Titanium.UI.FILL,
        height: "53dp",
        id: "__alloyId1139"
    });
    $.__views.confirmationContainer.add($.__views.__alloyId1139);
    $.__views.confirmationlbl = Ti.UI.createLabel({
        left: "15dp",
        height: Titanium.UI.FILL,
        font: {
            fontSize: "15dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        text: "CONFIRMATION",
        id: "confirmationlbl"
    });
    $.__views.__alloyId1139.add($.__views.confirmationlbl);
    $.__views.confirmationCloseLbl = Ti.UI.createLabel({
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
        id: "confirmationCloseLbl"
    });
    $.__views.__alloyId1139.add($.__views.confirmationCloseLbl);
    $.__views.__alloyId1140 = Ti.UI.createLabel({
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "Are you sure you want to close transaction?",
        id: "__alloyId1140"
    });
    $.__views.confirmationContainer.add($.__views.__alloyId1140);
    $.__views.noLbl = Ti.UI.createLabel({
        bottom: "30dp",
        width: "37%",
        height: "40dp",
        color: "#ffffff",
        borderColor: "#80e7e7e7",
        borderWidth: "0.5",
        backgroundColor: "transparent",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        left: "10%",
        text: "NO",
        id: "noLbl"
    });
    $.__views.confirmationContainer.add($.__views.noLbl);
    $.__views.yesLbl = Ti.UI.createLabel({
        bottom: "30dp",
        width: "37%",
        height: "40dp",
        color: "#ffffff",
        borderColor: "#80e7e7e7",
        borderWidth: "0.5",
        backgroundColor: "transparent",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        right: "10%",
        text: "YES",
        id: "yesLbl"
    });
    $.__views.confirmationContainer.add($.__views.yesLbl);
    $.__views.thankYouView = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        visible: false,
        zIndex: "15",
        backgroundColor: "#231f20",
        id: "thankYouView"
    });
    $.__views.payment.add($.__views.thankYouView);
    $.__views.questionLbl = Ti.UI.createLabel({
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "YOUR ORDER HAS BEEN PLACED \n THANK YOU !!!",
        id: "questionLbl"
    });
    $.__views.thankYouView.add($.__views.questionLbl);
    $.__views.moveToEshopLbl = Ti.UI.createLabel({
        bottom: "30dp",
        width: "80%",
        height: "40dp",
        color: "#ffffff",
        borderColor: "#80e7e7e7",
        borderWidth: "0.5",
        backgroundColor: "transparent",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "VISIT OUR ESTORE",
        id: "moveToEshopLbl"
    });
    $.__views.thankYouView.add($.__views.moveToEshopLbl);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var orderData = null, orderId = null, orderTotal = null;
    var paymentContainer = [];
    $.header.getView("cartContainer").setVisible(false);
    $.header.getView("searchLbl").setVisible(false);
    $.header.getView("overFlowMenuLbl").setVisible(false);
    $.header.init({
        title: "PLACE ORDER"
    });
    $.header.getView("menuButton").addEventListener("click", goToBack);
    var paymentFlag = false;
    var webViewFlag = false;
    touchEffect.createTouchEffect($.placeOrder, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.confirmationCloseLbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.noLbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.yesLbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.moveToEshopLbl, "#a6ffffff", "#ffffff");
    init();
    var webview = Titanium.UI.createWebView({
        zIndex: "10",
        top: "53dp"
    });
    if (!isNullVal(args.total_price)) {
        var price1 = args.total_price.split(".")[0];
        var price2 = args.total_price.split(".")[1];
        var text = price1 + "." + price2;
        var attr = Ti.UI.createAttributedString({
            text: text,
            attributes: [ {
                type: Ti.UI.ATTRIBUTE_FONT,
                value: {
                    fontSize: 18,
                    fontFamily: "futura_lt_bt_light-webfont"
                },
                range: [ text.indexOf(price2 + ""), (price2 + "").length ]
            } ]
        });
        $.amountLbl.attributedString = attr;
    }
    var address_text = "ADDRESS ";
    var address_attr = Ti.UI.createAttributedString({
        text: address_text,
        attributes: [ {
            type: Ti.UI.ATTRIBUTE_FONT,
            value: {
                fontSize: 11,
                fontFamily: "futura_lt_bt_light-webfont"
            },
            range: [ address_text.indexOf("ADDRESS"), "ADDRESS".length ]
        } ]
    });
    $.addressLbl.attributedString = address_attr;
    var review_text = "REVIEW ";
    var review_attr = Ti.UI.createAttributedString({
        text: review_text,
        attributes: [ {
            type: Ti.UI.ATTRIBUTE_FONT,
            value: {
                fontSize: 11,
                fontFamily: "futura_lt_bt_light-webfont"
            },
            range: [ review_text.indexOf("REVIEW"), "REVIEW".length ]
        } ]
    });
    $.reviewLbl.attributedString = review_attr;
    $.placeOrder.addEventListener("click", function(e) {
        if (paymentFlag) {
            var quote_id = Ti.App.Properties.getString("quote_id");
            var url = Alloy.Globals.commonUrl.createOrder;
            var data = {
                quoteId: quote_id
            };
            var requestParams = JSON.stringify(data);
            Alloy.Globals.webServiceCall(url, requestParams, createOrderSuccessCallback, createOrderErrorCallback, "POST", $.payment);
        } else showAlert($.payment, "Please select payment option");
    });
    webview.addEventListener("beforeload", function(e) {
        Ti.API.info("beforeload webview.getUrl() =" + webview.getUrl());
    });
    webview.addEventListener("load", function(e) {
        if (webview.getUrl().indexOf("customindex/appsuccess/") > -1) {
            hideShowView($.thankYouView);
            Ti.App.Properties.setString("cartCount", 0);
            sendDataToGa();
        } else if (webview.getUrl().indexOf("customindex/appfailure/") > -1) {
            $.questionLbl.setText("YOUR ORDER HAS BEEN CANCELLED");
            hideShowView($.thankYouView);
            Ti.App.Properties.setString("cartCount", 0);
        }
    });
    $.confirmationCloseLbl.addEventListener("click", function(e) {
        hideShowView($.confirmationContainer);
    });
    $.noLbl.addEventListener("click", function(e) {
        hideShowView($.confirmationContainer);
    });
    $.yesLbl.addEventListener("click", function(e) {
        webViewFlag = false;
        closeAllWindow();
        Ti.App.Properties.setString("cartCount", 0);
        updateCount();
    });
    $.moveToEshopLbl.addEventListener("click", function(e) {
        closeAllWindow();
    });
    $.paymentContainer.addEventListener("click", function(e) {
        Ti.API.info("e = =" + e.source.id);
        try {
            if (isNullVal(e.source.id)) {
                _.each(paymentContainer, function(value, key) {
                    paymentContainer[value.id].children[0].color = "#dfdfdf";
                });
                paymentContainer[e.source.id].children[0].color = "#e65e48";
                paymentFlag = true;
                Ti.API.info("value" + e.source.value);
                selectPayment(e.source.value);
            } else Ti.API.info("inside else");
        } catch (ex) {
            Ti.API.info("catch =" + ex.message);
        }
    });
    __defers["$.__views.payment!android:back!goToBack"] && $.addListener($.__views.payment, "android:back", goToBack);
    __defers["$.__views.payment!close!destroyWindow"] && $.addListener($.__views.payment, "close", destroyWindow);
    __defers["$.__views.payment!focus!updateCount"] && $.addListener($.__views.payment, "focus", updateCount);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;