function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function displayAddress(e) {
        var responseData = e.data.addresses;
        isNullVal(responseData) ? $.emptyAddressLbl.visible = true : $.emptyAddressLbl.visible = false;
        _.each(responseData, function(value, i) {
            addressMainContainer[i] = Ti.UI.createView({
                width: Ti.UI.FILL,
                height: Ti.UI.SIZE,
                layout: "vertical",
                top: "0dp",
                type: "row",
                address_id: value.entity_id
            });
            subContainer = Ti.UI.createView({
                width: Ti.UI.FILL,
                height: Ti.UI.SIZE,
                top: "0dp",
                touchEnabled: false
            });
            addressMainContainer[i].add(subContainer);
            seperator = Ti.UI.createView({
                width: Ti.UI.FILL,
                right: "20dp",
                left: "20dp",
                height: "1dp",
                top: "10dp",
                backgroundColor: "#e7e7e7",
                touchEnabled: false
            });
            addressMainContainer[i].add(seperator);
            checkLbl[i] = Ti.UI.createLabel({
                width: "15dp",
                height: "15dp",
                top: "10dp",
                left: "20dp",
                id: i,
                text: Alloy.Globals.icon.tick,
                font: {
                    fontSize: "14dp",
                    fontFamily: "icomoon"
                },
                color: "#ffffff",
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                touchEnabled: false
            });
            subContainer.add(checkLbl[i]);
            innerView = Ti.UI.createView({
                width: Ti.UI.FILL,
                right: "20dp",
                height: Ti.UI.FILL,
                left: "45dp",
                top: "10dp",
                borderColor: "transparent",
                borderWidth: "0.0",
                touchEnabled: false
            });
            subContainer.add(innerView);
            name = Ti.UI.createLabel({
                left: "0dp",
                top: "0dp",
                width: "60%",
                height: "15dp",
                font: {
                    fontSize: "13dp",
                    fontFamily: "futura-hv-bt-heavy"
                },
                text: value.firstname || "",
                color: "#e65e48",
                touchEnabled: false
            });
            innerView.add(name);
            phoneNo = Ti.UI.createLabel({
                left: "0dp",
                top: "20dp",
                width: "60%",
                height: "15dp",
                font: {
                    fontSize: "11dp",
                    fontFamily: "futura_medium_bt-webfont"
                },
                color: "#333333",
                text: value.mobile || "",
                touchEnabled: false
            });
            innerView.add(phoneNo);
            var addressText = (value.street1 || "") + " " + (value.street2 || "") + " " + ((value.city || "") + " - " + (value.pincode || "")) + " " + (value.state || "");
            addressDetails = Ti.UI.createLabel({
                left: "0dp",
                top: "40dp",
                width: "90%",
                height: Ti.UI.SIZE,
                font: {
                    fontSize: "12dp",
                    fontFamily: "futura_lt_bt_light-webfont"
                },
                color: "#7e7d7d",
                text: addressText,
                touchEnabled: false
            });
            innerView.add(addressDetails);
            editIcon = Ti.UI.createLabel({
                width: "25dp",
                height: "25dp",
                right: "5dp",
                top: "0dp",
                text: Alloy.Globals.icon.edit,
                font: {
                    fontSize: "15dp",
                    fontFamily: "icomoon"
                },
                color: "#7e7d7d",
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                addressResponse: {
                    addresses: value
                },
                addressLabel: addressDetails,
                nameLabel: name,
                mobileLabel: phoneNo,
                type: "edit"
            });
            innerView.add(editIcon);
            scrView.add(addressMainContainer[i]);
        });
        $.addressContainer.add(scrView);
        if (addressFlag) {
            checkLbl[responseData.length - 1].color = "#e65e48";
            var currentId = responseData.length - 1;
            if (billingFlag) {
                $.billingContainer.visible = false;
                billingAddress_Id = addressMainContainer[currentId].address_id;
            } else {
                shippingId = checkLbl[responseData.length - 1].id;
                shippingAddress_Id = addressMainContainer[currentId].address_id;
                billingAddress_Id = addressMainContainer[currentId].address_id;
                $.billingContainer.visible = true;
            }
        }
        Ti.API.info("shippingAddress_Id = " + shippingAddress_Id + "billingAddress_Id = " + billingAddress_Id);
    }
    function addressSelectionEffect(e) {
        if ("row" === e.source.type) {
            for (var i = 0; i < checkLbl.length; i++) checkLbl[i].color = "#ffffff";
            checkLbl[e.source.children[0].children[0].id].color = "#e65e48";
            if ("BACK TO BAG" == $.backToBagLbl.getText()) {
                shippingId = e.source.children[0].children[0].id;
                shippingAddress_Id = e.source.address_id;
                billingAddress_Id = e.source.address_id;
            } else billingAddress_Id = e.source.address_id;
            billingFlag ? $.header.init({
                title: "BILLING ADDRESS"
            }) : $.header.init({
                title: "SHIPPING ADDRESS"
            });
            billingFlag || ($.billingContainer.visible = true);
        } else if ("edit" === e.source.type) navigateToEditAddress(e); else if ("delete" === e.source.type) {
            deleteRow = e.source.rowRef;
            deleteAddress(e);
        }
    }
    function billingHideShowEffect(e) {
        if ("check" == e.source.children[0].type || "check" == e.source.children[1].type) if ("#e65e48" == e.source.children[0].color) {
            billingFlag = true;
            $.backToBagLbl.text = "SHIPPING ADDRESS";
            $.header.init({
                title: "BILLING ADDRESS"
            });
            for (var i = 0; i < checkLbl.length; i++) checkLbl[i].color = "#ffffff";
            $.billingContainer.visible = false;
            billingAddress_Id = "";
        } else e.source.children[0].color = "#e65e48";
    }
    function backToBag(e) {
        if (billingFlag) {
            for (var i = 0; i < checkLbl.length; i++) checkLbl[i].color = "#ffffff";
            $.billingContainer.visible = false;
            $.backToBagLbl.text = "BACK TO BAG";
            billingFlag = false;
            checkLbl[shippingId].color = "#e65e48";
            $.header.init({
                title: "SHIPPING ADDRESS"
            });
        } else {
            Alloy.Globals.popWindowInNav();
            $.addressListing.close();
        }
    }
    function getReviewData() {
        showLoader($.addressListing);
        var quote_id = Ti.App.Properties.getString("quote_id");
        var url = Alloy.Globals.commonUrl.reviewOrder;
        var data = {
            quoteId: quote_id,
            billingAddressId: billingAddress_Id,
            shippingAddressId: shippingAddress_Id
        };
        var requestParams = JSON.stringify(data);
        Alloy.Globals.webServiceCall(url, requestParams, getReviewDataSuccessCallback, getReviewDataErrorCallback, "POST", $.addressListing);
    }
    function getReviewDataSuccessCallback(e) {
        try {
            hideLoader($.addressListing);
            Alloy.Globals.addWindowInNav("reviewOrder", e);
        } catch (ex) {
            hideLoader($.addressListing);
        }
    }
    function getReviewDataErrorCallback(e) {
        hideLoader($.addressListing);
        showAlert($.addressListing, e.message);
    }
    function hideOverFlowMenu(e) {
        Alloy.Globals.overFlowFlag && "overFlowMenuLbl" != e.source.id && $.header.hideOverFlow();
    }
    function viewAddress(data) {
        addressFlag = !isNullVal(data);
        showLoader($.addressListing);
        var requestMethod = Alloy.Globals.commonUrl.proceedToCheckout;
        var data = {
            quoteId: quote_id
        };
        var requestParams = JSON.stringify(data);
        Alloy.Globals.webServiceCall(requestMethod, requestParams, viewAddressSuccessCallback, viewAddressErrorCallback, "POST", $.addressListing);
    }
    function viewAddressSuccessCallback(e) {
        var price1 = e.data.grand_total.split(".")[0];
        var price2 = e.data.grand_total.split(".")[1];
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
        if (isNullVal(e.data.addresses)) $.emptyAddressLbl.visible = true; else {
            scrView.removeAllChildren();
            displayAddress(e);
        }
        hideLoader();
    }
    function viewAddressErrorCallback(e) {
        hideLoader();
        showAlert($.superView, e.message);
    }
    function navigateToEditAddress(e) {
        var addAddress = Alloy.createController("addAddress", {
            isEdit: true,
            customerAddress: e.source.addressResponse,
            addressLabel: e.source.addressLabel,
            editIcon: e.source,
            isFormat: false,
            closeAndroidBack: closeAndroidBack,
            mainWindow: $.addressListing
        }).getView();
        $.addressListing.add(addAddress);
        addAddress.show();
        isAndroidBack = false;
    }
    function deleteAddress(e) {
        showLoader($.addressListing);
        var requestMethod = Alloy.Globals.commonUrl.deleteAddress;
        var param = {
            id: e.source.id
        };
        var requestParam = JSON.stringify(param);
        Alloy.Globals.webServiceCall(requestMethod, requestParam, deleteAddressSuccessCallback, deleteAddressErrorCallback, "POST", $.addressListing);
    }
    function deleteAddressSuccessCallback(e) {
        hideLoader();
        scrView.remove(deleteRow);
        deleteRow = null;
    }
    function deleteAddressErrorCallback(e) {
        hideLoader();
        showAlert($.addressListing, e.message);
    }
    function goToBack() {
        if (isAndroidBack) {
            scrView.removeEventListener("click", addressSelectionEffect);
            $.billingContainer.removeEventListener("click", billingHideShowEffect);
            $.backToBagLbl.removeEventListener("click", backToBag);
            $.addressListing.removeEventListener("click", hideOverFlowMenu);
            args = {};
            Alloy.Globals.popWindowInNav();
            $.addressListing.close();
        }
    }
    function updateCount() {
        $.header.updateCartCount();
    }
    function closeAndroidBack() {
        isAndroidBack = false;
    }
    function clearMemory() {
        $.removeListener();
        $.addressListing.remove($.totalDisplayContainer);
        $.totalDisplayContainer.removeAllChildren();
        $.addressListing.remove($.addressContainer);
        $.addressContainer.removeAllChildren();
        $.addressListing.remove($.reviewContainer);
        $.reviewContainer.removeAllChildren();
        $.addressListing.remove($.addAddressLbl);
        $.destroy();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "addressListing";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.addressListing = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        backgroundColor: "#ffffff",
        id: "addressListing"
    });
    $.__views.addressListing && $.addTopLevelView($.__views.addressListing);
    goToBack ? $.addListener($.__views.addressListing, "android:back", goToBack) : __defers["$.__views.addressListing!android:back!goToBack"] = true;
    updateCount ? $.addListener($.__views.addressListing, "focus", updateCount) : __defers["$.__views.addressListing!focus!updateCount"] = true;
    clearMemory ? $.addListener($.__views.addressListing, "close", clearMemory) : __defers["$.__views.addressListing!close!clearMemory"] = true;
    $.__views.header = Alloy.createWidget("headerView", "widget", {
        id: "header",
        __parentSymbol: $.__views.addressListing
    });
    $.__views.header.setParent($.__views.addressListing);
    $.__views.totalDisplayContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: "50dp",
        top: "53dp",
        backgroundColor: "#ffffff",
        id: "totalDisplayContainer"
    });
    $.__views.addressListing.add($.__views.totalDisplayContainer);
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
    $.__views.__alloyId87 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        right: 20,
        id: "__alloyId87"
    });
    $.__views.totalDisplayContainer.add($.__views.__alloyId87);
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
    $.__views.__alloyId87.add($.__views.rupies);
    $.__views.amountLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "futura-hv-bt-heavy",
            fontSize: "18dp"
        },
        color: "#e65e48",
        left: "10dp",
        id: "amountLbl"
    });
    $.__views.__alloyId87.add($.__views.amountLbl);
    $.__views.__alloyId88 = Ti.UI.createView({
        height: "1dp",
        width: "33%",
        left: "0dp",
        top: "103dp",
        backgroundColor: "#e65e48",
        id: "__alloyId88"
    });
    $.__views.addressListing.add($.__views.__alloyId88);
    $.__views.__alloyId89 = Ti.UI.createView({
        height: "1dp",
        left: "33%",
        width: Titanium.UI.FILL,
        top: "103dp",
        backgroundColor: "#e7e7e7",
        id: "__alloyId89"
    });
    $.__views.addressListing.add($.__views.__alloyId89);
    $.__views.__alloyId90 = Ti.UI.createLabel({
        top: "108",
        left: "10%",
        font: {
            fontSize: "11dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#000000",
        text: "ADDRESS",
        id: "__alloyId90"
    });
    $.__views.addressListing.add($.__views.__alloyId90);
    $.__views.addressContainer = Ti.UI.createView({
        top: "130dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        bottom: "70dp",
        id: "addressContainer"
    });
    $.__views.addressListing.add($.__views.addressContainer);
    $.__views.emptyAddressLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_medium_bt-webfont",
            fontSize: "12dp"
        },
        visible: false,
        color: "#a0a0a0",
        text: "NO ADDRESS",
        id: "emptyAddressLbl"
    });
    $.__views.addressListing.add($.__views.emptyAddressLbl);
    $.__views.reviewContainer = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        bottom: "0dp",
        layout: "vertical",
        borderColor: "transparent",
        borderWidth: "0.0",
        backgroundColor: "#ffffff",
        id: "reviewContainer"
    });
    $.__views.addressListing.add($.__views.reviewContainer);
    $.__views.billingContainer = Ti.UI.createView({
        visible: false,
        id: "billingContainer",
        bottom: 10
    });
    $.__views.reviewContainer.add($.__views.billingContainer);
    $.__views.checkIcon = Ti.UI.createLabel({
        left: "20dp",
        width: "15dp",
        height: "15dp",
        top: "10dp",
        text: Alloy.Globals.icon.tick,
        font: {
            fontSize: "15dp",
            fontFamily: "icomoon"
        },
        color: "#e65e48",
        type: "check",
        touchEnabled: false,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "checkIcon"
    });
    $.__views.billingContainer.add($.__views.checkIcon);
    $.__views.billingAddressLbl = Ti.UI.createLabel({
        top: "10dp",
        left: "45dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        type: "check",
        color: "#7e7d7d",
        text: "Use the same for Billing Address",
        touchEnabled: false,
        id: "billingAddressLbl"
    });
    $.__views.billingContainer.add($.__views.billingAddressLbl);
    $.__views.__alloyId91 = Ti.UI.createView({
        id: "__alloyId91"
    });
    $.__views.reviewContainer.add($.__views.__alloyId91);
    $.__views.backToBagLbl = Ti.UI.createLabel({
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
        text: "BACK TO BAG",
        id: "backToBagLbl"
    });
    $.__views.__alloyId91.add($.__views.backToBagLbl);
    $.__views.reviewLbl = Ti.UI.createLabel({
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
        text: "REVIEW ORDER",
        id: "reviewLbl"
    });
    $.__views.__alloyId91.add($.__views.reviewLbl);
    $.__views.addAddressLbl = Ti.UI.createLabel({
        height: "40dp",
        width: "40dp",
        borderRadius: "20dp",
        color: "#000000",
        borderWidth: "0.1",
        bottom: "70dp",
        right: "10dp",
        backgroundColor: "#e65e48",
        font: {
            fontSize: "20dp",
            fontFamily: "icomoon"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: Alloy.Globals.icon.add,
        id: "addAddressLbl"
    });
    $.__views.addressListing.add($.__views.addAddressLbl);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var deleteRow, isAndroidBack = true, addressFlag = null, shippingId = null;
    $.header.getView("cartContainer").setVisible(false);
    $.header.getView("searchLbl").setVisible(false);
    $.header.getView("overFlowMenuLbl").setVisible(false);
    $.header.init({
        title: "SELECT ADDRESS",
        passWindow: $.addressListing
    });
    $.header.updateCartCount();
    touchEffect.createTouchEffect($.backToBagLbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.reviewLbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.addAddressLbl, "#a6000000", "#000000");
    $.backToBagLbl.width = Alloy.Globals.platformWidth / 2;
    $.reviewLbl.width = Alloy.Globals.platformWidth / 2;
    var quote_id = "";
    quote_id = Ti.App.Properties.getString("quote_id");
    var addressMainContainer = [], checkLbl = [], innerView = null, name = null, phoneNo = null, addressDetails = null, subContainer = null, seperator = null, shippingAddress_Id = "", billingAddress_Id = "", editIcon = null;
    var scrView = Ti.UI.createScrollView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        scrollType: "vertical"
    });
    viewAddress();
    scrView.addEventListener("click", addressSelectionEffect);
    var billingFlag;
    $.billingContainer.addEventListener("click", billingHideShowEffect);
    $.backToBagLbl.addEventListener("click", backToBag);
    $.reviewLbl.addEventListener("click", function(e) {
        Ti.API.info("shippingAddress_Id = " + shippingAddress_Id + "billingAddress_Id = " + billingAddress_Id);
        "" == shippingAddress_Id || null == shippingAddress_Id ? showAlert($.addressListing, "Please select Shipping address") : "" == billingAddress_Id || null == billingAddress_Id ? showAlert($.addressListing, "Please select Billing address") : getReviewData();
    });
    $.addAddressLbl.addEventListener("click", function(e) {
        var addAddress = Alloy.createController("addAddress", {
            isEdit: false,
            displayAddressFunction: viewAddress,
            closeAndroidBack: closeAndroidBack,
            mainWindow: $.addressListing
        }).getView();
        $.addressListing.add(addAddress);
        hideShowView(addAddress);
        isAndroidBack = false;
    });
    $.addressListing.addEventListener("click", hideOverFlowMenu);
    __defers["$.__views.addressListing!android:back!goToBack"] && $.addListener($.__views.addressListing, "android:back", goToBack);
    __defers["$.__views.addressListing!focus!updateCount"] && $.addListener($.__views.addressListing, "focus", updateCount);
    __defers["$.__views.addressListing!close!clearMemory"] && $.addListener($.__views.addressListing, "close", clearMemory);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;