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
        Alloy.Globals.overFlowFlag && "overFlowMenuLbl" != e.source.id && $.header.hideOverFlow();
    }
    function closeReviewOrder() {
        Alloy.Globals.popWindowInNav();
        $.reviewOrder.close();
    }
    function getReviewDataSuccessCallback(e) {
        try {
            total_cart_price = e.data.summary.total;
            var price1 = e.data.summary.total.split(".")[0];
            var price2 = e.data.summary.total.split(".")[1];
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
            if (!isNullVal(e.data.summary.coupon_code)) {
                $.clearCoupnLbl.setText(Alloy.Globals.icon.close);
                $.clearCoupnLbl.setVisible(true);
                $.clearCoupnLbl.setTouchEnabled(true);
                $.couponTxt.setEditable(false);
                $.couponTxt.setValue("Coupon Applied : " + e.data.summary.coupon_code);
                $.couponTxt.setColor("#64FF33");
            }
            looping_value(e.data.items);
            hideLoader($.reviewOrder);
        } catch (ex) {
            hideLoader($.reviewOrder);
            Ti.API.info("catch = " + ex.message);
        }
    }
    function looping_value(data) {
        listData = [];
        $.mainSection.setItems(listData);
        var template = "reviewItemTemplate";
        _.each(data, function(value, k) {
            var price1 = value.total_price.split(".")[0];
            var price2 = value.total_price.split(".")[1];
            var text = price1 + "." + price2;
            var attr = Ti.UI.createAttributedString({
                text: text,
                attributes: [ {
                    type: Ti.UI.ATTRIBUTE_FONT,
                    value: {
                        fontSize: 13,
                        fontFamily: "futura_lt_bt_light-webfont"
                    },
                    range: [ text.indexOf(price2 + ""), (price2 + "").length ]
                } ]
            });
            listData.push({
                properties: {
                    product_id: value.product_id
                },
                template: template,
                reviewImage: {
                    image: encodeURI(value.thumbnail)
                },
                productName: {
                    text: value.name.toUpperCase()
                },
                productSize: {
                    text: value.size,
                    font: {
                        fontSize: "" == value.size ? "0" : "8"
                    }
                },
                perSetprice: {
                    text: Alloy.Globals.icon.currency + " " + value.price
                },
                colorImage: {
                    image: encodeURI(value.color)
                },
                qtyLbl: {
                    text: value.qty
                },
                totalPrice: {
                    attributedString: attr
                }
            });
        });
        $.mainSection.appendItems(listData);
    }
    function goToBack() {
        $.reviewOrder.removeEventListener("click", hideOverFlowMenu);
        Alloy.Globals.popWindowInNav();
        $.reviewOrder.close();
    }
    function destroyWindow(e) {
        $.reviewOrder.removeAllChildren();
        $.destroy();
    }
    function updateCount() {
        $.header.updateCartCount();
    }
    function hideKeyboard() {
        Ti.UI.Android.hideSoftKeyboard();
    }
    function applyDiscountCoupon(e) {
        e.source.text == Alloy.Globals.icon.tick ? addCoupon() : removeCoupon();
    }
    function applyCoupon(e) {
        if ("" == e.value.trim()) {
            $.clearCoupnLbl.setVisible(false);
            $.clearCoupnLbl.setTouchEnabled(false);
        } else {
            $.clearCoupnLbl.setVisible(true);
            $.clearCoupnLbl.setTouchEnabled(true);
        }
    }
    function addCoupon() {
        showTransparentLoader($.reviewOrder);
        var requestMethod = Alloy.Globals.commonUrl.addCoupon;
        var param = {
            quoteId: Ti.App.Properties.getString("quote_id"),
            couponCode: $.couponTxt.getValue()
        };
        var requestParam = JSON.stringify(param);
        Alloy.Globals.webServiceCall(requestMethod, requestParam, addCouponSuccessCallback, addCouponErrorCallback, "POST", $.reviewOrder);
    }
    function addCouponSuccessCallback(response) {
        hideTransparentLoader();
        total_cart_price = response.data.summary.total;
        var price1 = response.data.summary.total.split(".")[0];
        var price2 = response.data.summary.total.split(".")[1];
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
        $.clearCoupnLbl.setText(Alloy.Globals.icon.close);
        $.couponTxt.setEditable(false);
        $.couponTxt.setValue("Coupon Applied : " + $.couponTxt.getValue());
        $.couponTxt.setColor("#64FF33");
        showAlert($.reviewOrder, " Coupon Applied Successfully ");
    }
    function addCouponErrorCallback(response) {
        hideTransparentLoader();
        showAlert($.reviewOrder, response.message);
    }
    function removeCoupon() {
        showTransparentLoader($.reviewOrder);
        var requestMethod = Alloy.Globals.commonUrl.removeCoupon;
        var param = {
            quoteId: Ti.App.Properties.getString("quote_id")
        };
        var requestParam = JSON.stringify(param);
        Alloy.Globals.webServiceCall(requestMethod, requestParam, removeCouponSuccessCallback, removeCouponErrorCallback, "POST", $.reviewOrder);
    }
    function removeCouponSuccessCallback(response) {
        hideTransparentLoader();
        total_cart_price = response.data.summary.total;
        var price1 = response.data.summary.total.split(".")[0];
        var price2 = response.data.summary.total.split(".")[1];
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
        $.clearCoupnLbl.setText(Alloy.Globals.icon.tick);
        $.clearCoupnLbl.setVisible(false);
        $.clearCoupnLbl.setTouchEnabled(false);
        $.couponTxt.setValue("");
        $.couponTxt.setEditable(true);
        $.couponTxt.setColor("#000000");
        showAlert($.reviewOrder, " Coupon Removed Successfully ");
    }
    function removeCouponErrorCallback(response) {
        hideTransparentLoader();
        showAlert($.reviewOrder, response.message);
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "reviewOrder";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.reviewOrder = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        backgroundColor: "#ffffff",
        id: "reviewOrder"
    });
    $.__views.reviewOrder && $.addTopLevelView($.__views.reviewOrder);
    goToBack ? $.addListener($.__views.reviewOrder, "android:back", goToBack) : __defers["$.__views.reviewOrder!android:back!goToBack"] = true;
    destroyWindow ? $.addListener($.__views.reviewOrder, "close", destroyWindow) : __defers["$.__views.reviewOrder!close!destroyWindow"] = true;
    updateCount ? $.addListener($.__views.reviewOrder, "focus", updateCount) : __defers["$.__views.reviewOrder!focus!updateCount"] = true;
    hideKeyboard ? $.addListener($.__views.reviewOrder, "touchstart", hideKeyboard) : __defers["$.__views.reviewOrder!touchstart!hideKeyboard"] = true;
    $.__views.header = Alloy.createWidget("headerView", "widget", {
        id: "header",
        __parentSymbol: $.__views.reviewOrder
    });
    $.__views.header.setParent($.__views.reviewOrder);
    $.__views.totalDisplayContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: "50dp",
        top: "53dp",
        backgroundColor: "#ffffff",
        id: "totalDisplayContainer"
    });
    $.__views.reviewOrder.add($.__views.totalDisplayContainer);
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
    $.__views.__alloyId1432 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        right: 20,
        id: "__alloyId1432"
    });
    $.__views.totalDisplayContainer.add($.__views.__alloyId1432);
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
    $.__views.__alloyId1432.add($.__views.rupies);
    $.__views.amountLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "futura-hv-bt-heavy",
            fontSize: "18dp"
        },
        color: "#e65e48",
        left: "10dp",
        id: "amountLbl"
    });
    $.__views.__alloyId1432.add($.__views.amountLbl);
    $.__views.__alloyId1433 = Ti.UI.createView({
        height: "1dp",
        width: "33%",
        left: "0dp",
        top: "103dp",
        zIndex: "2",
        backgroundColor: "#333333",
        id: "__alloyId1433"
    });
    $.__views.reviewOrder.add($.__views.__alloyId1433);
    $.__views.__alloyId1434 = Ti.UI.createView({
        height: "1dp",
        left: "34%",
        width: "33%",
        top: "103dp",
        zIndex: "2",
        backgroundColor: "#e65e48",
        id: "__alloyId1434"
    });
    $.__views.reviewOrder.add($.__views.__alloyId1434);
    $.__views.__alloyId1435 = Ti.UI.createView({
        height: "1dp",
        left: "0",
        width: Titanium.UI.FILL,
        top: "103dp",
        zIndex: "0",
        backgroundColor: "#e7e7e7",
        id: "__alloyId1435"
    });
    $.__views.reviewOrder.add($.__views.__alloyId1435);
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
    $.__views.reviewOrder.add($.__views.addressLbl);
    $.__views.__alloyId1436 = Ti.UI.createLabel({
        left: "45%",
        top: "108",
        width: "33%",
        font: {
            fontSize: "11dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#000000",
        text: "REVIEW",
        id: "__alloyId1436"
    });
    $.__views.reviewOrder.add($.__views.__alloyId1436);
    var __alloyId1444 = {};
    Alloy.createController("listTemplate", {
        __parentSymbol: __parentSymbol,
        __itemTemplate: __alloyId1444
    });
    $.__views.mainSection = Ti.UI.createListSection({
        id: "mainSection"
    });
    var __alloyId1447 = [];
    __alloyId1447.push($.__views.mainSection);
    $.__views.cartList = Ti.UI.createListView({
        top: "120dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        bottom: "80dp",
        sections: __alloyId1447,
        templates: __alloyId1444,
        id: "cartList"
    });
    $.__views.reviewOrder.add($.__views.cartList);
    hideKeyboard ? $.addListener($.__views.cartList, "itemclick", hideKeyboard) : __defers["$.__views.cartList!itemclick!hideKeyboard"] = true;
    $.__views.__alloyId1448 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        bottom: "40dp",
        left: 0,
        backgroundColor: "#fff",
        id: "__alloyId1448"
    });
    $.__views.reviewOrder.add($.__views.__alloyId1448);
    $.__views.couponTxt = Ti.UI.createTextField({
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "12dp"
        },
        top: "0dp",
        left: "10dp",
        height: "60dp",
        width: Titanium.UI.FILL,
        zIndex: 1,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        hintText: "COUPON CODE",
        color: "#000000",
        hintTextColor: "#a0a0a0",
        id: "couponTxt"
    });
    $.__views.__alloyId1448.add($.__views.couponTxt);
    applyCoupon ? $.addListener($.__views.couponTxt, "change", applyCoupon) : __defers["$.__views.couponTxt!change!applyCoupon"] = true;
    $.__views.clearCoupnLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "12dp"
        },
        top: "0dp",
        right: "0dp",
        zIndex: 2,
        color: Alloy.Globals.labelTitleColor,
        width: "40dp",
        height: "40dp",
        text: Alloy.Globals.icon.tick,
        touchEnabled: false,
        visible: false,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "clearCoupnLbl"
    });
    $.__views.__alloyId1448.add($.__views.clearCoupnLbl);
    applyDiscountCoupon ? $.addListener($.__views.clearCoupnLbl, "click", applyDiscountCoupon) : __defers["$.__views.clearCoupnLbl!click!applyDiscountCoupon"] = true;
    $.__views.changeAddressLbl = Ti.UI.createLabel({
        height: "40dp",
        bottom: "0dp",
        font: {
            fontSize: "10dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        left: "0dp",
        backgroundColor: "#b0b0b0",
        text: "CHANGE ADDRESS",
        id: "changeAddressLbl"
    });
    $.__views.reviewOrder.add($.__views.changeAddressLbl);
    closeReviewOrder ? $.addListener($.__views.changeAddressLbl, "click", closeReviewOrder) : __defers["$.__views.changeAddressLbl!click!closeReviewOrder"] = true;
    $.__views.paymentLbl = Ti.UI.createLabel({
        height: "40dp",
        bottom: "0dp",
        font: {
            fontSize: "10dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        right: "0dp",
        backgroundColor: "#e65e48",
        text: "PAYMENT OPTIONS",
        id: "paymentLbl"
    });
    $.__views.reviewOrder.add($.__views.paymentLbl);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.header.getView("cartContainer").setVisible(false);
    $.header.getView("searchLbl").setVisible(false);
    $.header.getView("overFlowMenuLbl").setVisible(false);
    $.header.init({
        title: "REVIEW ORDER",
        passWindow: $.reviewOrder
    });
    var total_cart_price;
    touchEffect.createTouchEffect($.changeAddressLbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.paymentLbl, "#a6ffffff", "#ffffff");
    $.changeAddressLbl.width = Alloy.Globals.platformWidth / 2;
    $.paymentLbl.width = Alloy.Globals.platformWidth / 2;
    var address_text = "ADDRESS ";
    var attr = Ti.UI.createAttributedString({
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
    $.addressLbl.attributedString = attr;
    var listData = [];
    $.reviewOrder.addEventListener("click", hideOverFlowMenu);
    getReviewDataSuccessCallback(args);
    $.paymentLbl.addEventListener("click", function(e) {
        var paymentData = {
            total_price: total_cart_price
        };
        Alloy.Globals.addWindowInNav("payment", paymentData);
    });
    __defers["$.__views.reviewOrder!android:back!goToBack"] && $.addListener($.__views.reviewOrder, "android:back", goToBack);
    __defers["$.__views.reviewOrder!close!destroyWindow"] && $.addListener($.__views.reviewOrder, "close", destroyWindow);
    __defers["$.__views.reviewOrder!focus!updateCount"] && $.addListener($.__views.reviewOrder, "focus", updateCount);
    __defers["$.__views.reviewOrder!touchstart!hideKeyboard"] && $.addListener($.__views.reviewOrder, "touchstart", hideKeyboard);
    __defers["$.__views.cartList!itemclick!hideKeyboard"] && $.addListener($.__views.cartList, "itemclick", hideKeyboard);
    __defers["$.__views.couponTxt!change!applyCoupon"] && $.addListener($.__views.couponTxt, "change", applyCoupon);
    __defers["$.__views.clearCoupnLbl!click!applyDiscountCoupon"] && $.addListener($.__views.clearCoupnLbl, "click", applyDiscountCoupon);
    __defers["$.__views.changeAddressLbl!click!closeReviewOrder"] && $.addListener($.__views.changeAddressLbl, "click", closeReviewOrder);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;