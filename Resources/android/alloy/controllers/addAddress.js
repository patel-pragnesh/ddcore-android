function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function blurEffect(e) {
        if ("TextField" != e.source.type) {
            $.fname.blur();
            $.lname.blur();
            $.phoneNo.blur();
            $.addressLine1.blur();
            $.addressLine2.blur();
            $.pinCode.blur();
        }
        $.stateDropDownIcon.text = Alloy.Globals.icon.expandFill;
        $.stateDropDown.backgroundColor = "transparent";
        $.stateDropDown.height = "40dp";
        stateFlag = true;
        $.cityDropDownIcon.text = Alloy.Globals.icon.expandFill;
        $.cityDropDown.backgroundColor = "transparent";
        $.cityDropDown.height = "40dp";
        cityFlag = true;
    }
    function setState() {
        _.each(regionList, function(value, k) {
            var categoryLbl = Ti.UI.createLabel({
                width: Titanium.UI.FILL,
                left: "20dp",
                height: "40dp",
                color: "#ffffff",
                backgroundColor: "#595959",
                font: {
                    fontSize: "11dp"
                },
                text: value.default_name.toUpperCase(),
                city: value.city,
                region_id: value.region_id,
                default_name: value.default_name
            });
            $.stateScroll.add(categoryLbl);
        });
    }
    function setCity(cityList) {
        var city = cityList.split(",");
        $.cityScroll.removeAllChildren();
        _.each(city, function(value, k) {
            var categoryLbl = Ti.UI.createLabel({
                width: Titanium.UI.FILL,
                left: "15dp",
                height: "40dp",
                color: "#ffffff",
                backgroundColor: "#595959",
                font: {
                    fontSize: "11sp"
                },
                text: value.toUpperCase()
            });
            $.cityScroll.add(categoryLbl);
        });
    }
    function selectCity(e) {
        Ti.UI.Android.hideSoftKeyboard();
        if ("CITY" === $.cityLbl.getText() && "STATE" === $.stateLbl.getText()) showAlert($.superView, "Please Select State"); else if (cityFlag) {
            $.cityDropDownIcon.text = Alloy.Globals.icon.expand;
            $.cityDropDown.height = Titanium.UI.SIZE;
            $.cityDropDown.backgroundColor = "#404040";
            $.cityScroll.height = "150";
            cityFlag = false;
            $.stateDropDownIcon.text = Alloy.Globals.icon.expandFill;
            $.stateDropDown.backgroundColor = "transparent";
            $.stateScroll.height = "0dp";
            stateFlag = true;
        } else {
            e.source.text && ($.cityLbl.text = e.source.text);
            $.cityDropDownIcon.text = Alloy.Globals.icon.expandFill;
            $.cityDropDown.backgroundColor = "transparent";
            $.cityDropDown.height = "40dp";
            cityFlag = true;
        }
    }
    function selectState(e) {
        Ti.UI.Android.hideSoftKeyboard();
        if (stateFlag) {
            $.stateDropDownIcon.text = Alloy.Globals.icon.expand;
            $.stateDropDown.height = Titanium.UI.SIZE;
            $.stateDropDown.backgroundColor = "#404040";
            $.stateScroll.height = "150";
            $.cityDropDownIcon.text = Alloy.Globals.icon.expandFill;
            $.cityDropDown.backgroundColor = "transparent";
            $.cityScroll.height = "0dp";
            cityFlag = true;
            stateFlag = false;
        } else {
            if (e.source.text) {
                $.stateLbl.text = e.source.text;
                $.stateLbl.region_id = e.source.region_id;
                $.stateLbl.default_name = e.source.default_name;
                setCity(e.source.city);
                $.cityLbl.setText("CITY");
            }
            $.stateDropDownIcon.text = Alloy.Globals.icon.expandFill;
            $.stateDropDown.backgroundColor = "transparent";
            $.stateDropDown.height = "40dp";
            stateFlag = true;
        }
    }
    function closeAddress(e) {
        $.fname.blur();
        $.lname.blur();
        $.phoneNo.blur();
        $.addressLine1.blur();
        $.addressLine2.blur();
        $.pinCode.blur();
        refreshAddress();
        args.isClose ? args.closeFunction() : hideShowView($.superView);
        args.mainWindow.removeEventListener("android:back", closeAddress);
        args.closeAndroidBack();
    }
    function loadAsEditAddress() {
        var customerInfo = customerAddress.addresses;
        $.addressLbl.setText("EDIT ADDRESS");
        $.fname.setValue(customerInfo.firstname || "");
        $.lname.setValue(customerInfo.lastname || "");
        $.phoneNo.setValue(customerInfo.mobile || "");
        $.stateLbl.setText(customerInfo.state || "");
        $.cityLbl.setText(customerInfo.city || "");
        $.addressLine1.setValue(customerInfo.street1 || "");
        $.addressLine2.setValue(customerInfo.street2 || "");
        $.pinCode.setValue(customerInfo.pincode || "");
        $.stateLbl.region_id = "";
        if (null != customerInfo.state) {
            var regionId = _.where(regionList, {
                default_name: customerInfo.state.trim()
            });
            if (0 != regionId.length) {
                $.stateLbl.region_id = regionId[0].region_id || "";
                $.stateLbl.setText(regionId[0].default_name.toUpperCase());
                $.stateLbl.default_name = regionId[0].default_name;
            }
        }
        _.each(regionList, function(value, k) {
            value.default_name === customerInfo.state && setCity(value.city);
        });
    }
    function saveAddress() {
        if (validators.RegularExpressionName($.fname)) if (validators.RegularExpressionName($.lname)) if (validators.RegularExpressionMobileNumber($.phoneNo)) if ("STATE" === $.stateLbl.getText()) showAlert($.superView, "Please select a state"); else if ("CITY" === $.cityLbl.getText()) showAlert($.superView, "Please select a city"); else if ("" == $.addressLine1.getValue().trim()) {
            showAlert($.superView, "Please enter a valid address 1");
            $.addressLine1.getValue();
        } else if (validators.RegularExpressionNumberPin($.pinCode)) args.isEdit ? editAddress() : addNewAddress(); else {
            showAlert($.superView, "Please enter a valid pincode");
            $.pinCode.getValue();
        } else {
            showAlert($.superView, "Please enter a valid mobile number");
            $.phoneNo.focus();
        } else {
            showAlert($.superView, "Please enter a valid last name");
            $.lname.focus();
        } else {
            showAlert($.superView, "Please enter a valid first name");
            $.fname.focus();
        }
    }
    function addNewAddress() {
        var requestMethod = Alloy.Globals.commonUrl.addNewAddress;
        var param = {
            firstname: $.fname.getValue(),
            lastname: $.lname.getValue(),
            mobile: $.phoneNo.getValue(),
            dob: Ti.App.Properties.getString("dob") || null,
            gender: Ti.App.Properties.getString("gender") || null,
            email: Ti.App.Properties.getString("email") || null,
            street1: $.addressLine1.getValue(),
            street2: $.addressLine2.getValue(),
            city: $.cityLbl.getText(),
            state: $.stateLbl.region_id,
            pincode: $.pinCode.getValue(),
            country_id: "IN",
            is_billing: "0",
            is_shipping: "0"
        };
        var requestParam = JSON.stringify(param);
        showLoader($.superView);
        Alloy.Globals.webServiceCall(requestMethod, requestParam, addNewAddressSuccessCallback, addNewAddressErrorCallback, "POST", $.superView);
    }
    function addNewAddressSuccessCallback(response) {
        hideLoader();
        showAlert($.superView, response.message);
        setTimeout(function() {
            args.isClose || $.addressCloseLbl.fireEvent("click");
            var obj = {
                data: {
                    addresses: [ response.data ]
                }
            };
            args.displayAddressFunction(obj);
        }, 500);
    }
    function addNewAddressErrorCallback(response) {
        hideLoader();
        showAlert($.superView, response.message);
    }
    function editAddress() {
        var requestMethod = Alloy.Globals.commonUrl.editAddress;
        param = {
            entity_id: customerAddress.addresses.entity_id,
            id: customerAddress.addresses.entity_id,
            firstname: $.fname.getValue(),
            lastname: $.lname.getValue(),
            mobile: $.phoneNo.getValue(),
            dob: Ti.App.Properties.getString("dob") || "",
            gender: Ti.App.Properties.getString("gender") || "",
            email: Ti.App.Properties.getString("email") || "",
            street1: $.addressLine1.getValue(),
            street2: $.addressLine2.getValue(),
            city: $.cityLbl.getText(),
            state: $.stateLbl.region_id,
            pincode: $.pinCode.getValue(),
            country_id: "IN",
            is_billing: "0",
            is_shipping: "0"
        };
        var requestParam = JSON.stringify(param);
        showLoader($.superView);
        Alloy.Globals.webServiceCall(requestMethod, requestParam, editAddressSuccessCallback, editAddressErrorCallback, "POST", $.superView);
    }
    function editAddressSuccessCallback(response) {
        param.state = $.stateLbl.default_name;
        args.customerAddress.addresses = param;
        customerAddress = args.customerAddress;
        hideLoader();
        setAttributeString();
        try {
            setTimeout(function() {
                var _parent = $.superView.parent;
                _parent.remove($.superView);
            }, 500);
        } catch (exp) {}
    }
    function editAddressErrorCallback(response) {
        hideLoader();
        showAlert($.superView, response.message);
    }
    function setAttributeString() {
        try {
            var addressStreet = (($.addressLine1.getValue() || "") + ", " + ($.addressLine2.getValue() || "")).toUpperCase();
            var addressCity = ($.cityLbl.getText() || "") + " - " + ($.pinCode.getValue() || "");
            var addressState = $.stateLbl.getText() || "";
            var addressText = "";
            if (args.isFormat) {
                addressText = addressStreet + "\n" + addressCity + "\n" + addressState;
                args.addressLabel.setText(addressText);
                var attr = Ti.UI.createAttributedString({
                    text: addressText,
                    attributes: [ {
                        type: Ti.UI.ATTRIBUTE_FONT,
                        value: {
                            color: "#000",
                            font: {
                                fontFamily: "futura_medium_bt-webfont"
                            }
                        },
                        range: [ addressText.indexOf(addressCity), addressCity.length ]
                    }, {
                        type: Ti.UI.ATTRIBUTE_FONT,
                        value: {
                            color: "#000",
                            font: {
                                fontFamily: "futura_medium_bt-webfont"
                            }
                        },
                        range: [ addressText.indexOf(addressState), addressState.length ]
                    } ]
                });
                args.addressLabel.attributedString = attr;
            } else {
                addressStreet = ($.addressLine1.getValue() || "") + ", " + ($.addressLine2.getValue() || "");
                addressText = addressStreet + ", " + addressCity + ". " + $.stateLbl.default_name;
                args.editIcon.nameLabel.setText($.fname.getValue().capitalize() + " " + $.lname.getValue().capitalize());
                args.editIcon.mobileLabel.setText($.phoneNo.getValue());
                args.addressLabel.setText(addressText);
            }
        } catch (ex) {}
    }
    function getRegionListing() {
        var requestMethod = Alloy.Globals.commonUrl.getRegionListing;
        var param = {
            country_id: "IN"
        };
        var requestParam = JSON.stringify(param);
        showLoader($.superView);
        Alloy.Globals.webServiceCall(requestMethod, requestParam, getRegionListingSuccessCallback, getRegionListingErrorCallback, "POST", $.superView, true);
    }
    function getRegionListingSuccessCallback(response) {
        regionList = response.data;
        setState();
        args.isEdit && loadAsEditAddress();
        hideLoader();
    }
    function getRegionListingErrorCallback(response) {
        hideLoader();
        showAlert($.superView, response.message);
    }
    function refreshAddress() {
        if (args.isEdit) loadAsEditAddress(); else {
            $.fname.setValue("");
            $.lname.setValue("");
            $.phoneNo.setValue("");
            $.stateLbl.setText("");
            $.cityLbl.setText("");
            $.addressLine1.setValue("");
            $.addressLine2.setValue("");
            $.pinCode.setValue("");
            $.cityLbl.setText("CITY");
            $.stateLbl.setText("STATE");
        }
    }
    function navigateToNextTextfield(e) {
        switch (e.source.id) {
          case "fname":
            $.lname.focus();
            break;

          case "lname":
            $.phoneNo.focus();
            break;

          case "phoneNo":
            $.phoneNo.blur();
            Ti.UI.Android.hideSoftKeyboard();
            break;

          case "addressLine1":
            $.addressLine2.focus();
            break;

          case "addressLine2":
            $.pinCode.focus();
            break;

          case "pinCode":
            $.pinCode.blur();
            Ti.UI.Android.hideSoftKeyboard();
        }
    }
    function hideKeyboard() {
        Ti.UI.Android.hideSoftKeyboard();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "addAddress";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.superView = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        backgroundColor: "#231f20",
        visible: false,
        id: "superView"
    });
    $.__views.superView && $.addTopLevelView($.__views.superView);
    hideKeyboard ? $.addListener($.__views.superView, "swipe", hideKeyboard) : __defers["$.__views.superView!swipe!hideKeyboard"] = true;
    $.__views.__alloyId74 = Ti.UI.createView({
        top: "0dp",
        zIndex: "100",
        width: Titanium.UI.FILL,
        height: "53dp",
        id: "__alloyId74"
    });
    $.__views.superView.add($.__views.__alloyId74);
    $.__views.addressLbl = Ti.UI.createLabel({
        left: "15dp",
        height: Titanium.UI.FILL,
        font: {
            fontSize: "17dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        text: "ADD NEW ADDRESS",
        id: "addressLbl"
    });
    $.__views.__alloyId74.add($.__views.addressLbl);
    $.__views.refreshIcon = Ti.UI.createLabel({
        right: "60dp",
        width: "40dp",
        height: "40dp",
        font: {
            fontSize: "20sp",
            fontFamily: "icomoon"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: Alloy.Globals.icon.refresh,
        id: "refreshIcon"
    });
    $.__views.__alloyId74.add($.__views.refreshIcon);
    refreshAddress ? $.addListener($.__views.refreshIcon, "click", refreshAddress) : __defers["$.__views.refreshIcon!click!refreshAddress"] = true;
    $.__views.addressCloseLbl = Ti.UI.createLabel({
        right: "15dp",
        width: "40dp",
        height: "40dp",
        font: {
            fontSize: "20sp",
            fontFamily: "icomoon"
        },
        color: "#ffffff",
        text: Alloy.Globals.icon.close,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "addressCloseLbl"
    });
    $.__views.__alloyId74.add($.__views.addressCloseLbl);
    $.__views.__alloyId75 = Ti.UI.createScrollView({
        top: "53dp",
        scrollType: "vertical",
        id: "__alloyId75"
    });
    $.__views.superView.add($.__views.__alloyId75);
    $.__views.__alloyId76 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        top: "0dp",
        height: 205,
        id: "__alloyId76"
    });
    $.__views.__alloyId75.add($.__views.__alloyId76);
    $.__views.__alloyId77 = Ti.UI.createView({
        top: "0dp",
        layout: "vertical",
        id: "__alloyId77"
    });
    $.__views.__alloyId76.add($.__views.__alloyId77);
    $.__views.fname = Ti.UI.createTextField({
        height: "40dp",
        width: "88%",
        backgroundColor: "transparent",
        color: "#ffffff",
        hintTextColor: "#a0a0a0",
        font: {
            fontSize: "15dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        top: "20dp",
        hintText: "*FIRST NAME",
        id: "fname",
        type: "TextField"
    });
    $.__views.__alloyId77.add($.__views.fname);
    navigateToNextTextfield ? $.addListener($.__views.fname, "return", navigateToNextTextfield) : __defers["$.__views.fname!return!navigateToNextTextfield"] = true;
    $.__views.fname_seperator = Ti.UI.createView({
        top: "0dp",
        height: "0.5dp",
        width: "88%",
        backgroundColor: "#e65e48",
        id: "fname_seperator"
    });
    $.__views.__alloyId77.add($.__views.fname_seperator);
    $.__views.lname = Ti.UI.createTextField({
        height: "40dp",
        width: "88%",
        backgroundColor: "transparent",
        color: "#ffffff",
        hintTextColor: "#a0a0a0",
        font: {
            fontSize: "15dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        top: "10dp",
        hintText: "*LAST NAME",
        id: "lname",
        type: "TextField"
    });
    $.__views.__alloyId77.add($.__views.lname);
    navigateToNextTextfield ? $.addListener($.__views.lname, "return", navigateToNextTextfield) : __defers["$.__views.lname!return!navigateToNextTextfield"] = true;
    $.__views.lname_seperator = Ti.UI.createView({
        top: "0dp",
        height: "0.5dp",
        width: "88%",
        backgroundColor: "#e65e48",
        id: "lname_seperator"
    });
    $.__views.__alloyId77.add($.__views.lname_seperator);
    $.__views.phoneNo = Ti.UI.createTextField({
        keyboardType: Titanium.UI.KEYBOARD_PHONE_PAD,
        height: "40dp",
        width: "88%",
        backgroundColor: "transparent",
        color: "#ffffff",
        hintTextColor: "#a0a0a0",
        font: {
            fontSize: "15dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        top: "10dp",
        hintText: "*NUMBER",
        maxLength: 10,
        id: "phoneNo",
        type: "TextField"
    });
    $.__views.__alloyId77.add($.__views.phoneNo);
    navigateToNextTextfield ? $.addListener($.__views.phoneNo, "return", navigateToNextTextfield) : __defers["$.__views.phoneNo!return!navigateToNextTextfield"] = true;
    $.__views.phoneNo_seperator = Ti.UI.createView({
        top: "0dp",
        height: "0.5dp",
        width: "88%",
        backgroundColor: "#e65e48",
        id: "phoneNo_seperator"
    });
    $.__views.__alloyId77.add($.__views.phoneNo_seperator);
    $.__views.__alloyId78 = Ti.UI.createView({
        top: "20dp",
        height: "0.5dp",
        width: Titanium.UI.FILL,
        backgroundColor: "#A1A39E",
        id: "__alloyId78"
    });
    $.__views.__alloyId77.add($.__views.__alloyId78);
    $.__views.stateDropDown = Ti.UI.createView({
        layout: "vertical",
        top: "185dp",
        left: "0",
        width: "48%",
        zIndex: "100",
        height: "40dp",
        id: "stateDropDown",
        bubbleParent: false
    });
    $.__views.__alloyId75.add($.__views.stateDropDown);
    $.__views.__alloyId79 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "0dp",
        layout: "horizontal",
        touchEnabled: false,
        id: "__alloyId79"
    });
    $.__views.stateDropDown.add($.__views.__alloyId79);
    $.__views.stateLbl = Ti.UI.createLabel({
        left: "20dp",
        top: "0dp",
        width: "65%",
        height: "40dp",
        font: {
            fontSize: "12sp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        color: "#e65e48",
        touchEnabled: false,
        text: "STATE",
        id: "stateLbl"
    });
    $.__views.__alloyId79.add($.__views.stateLbl);
    $.__views.stateDropDownIcon = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "12sp"
        },
        rigth: "0dp",
        width: "19%",
        height: "40dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "#a6ffffff",
        touchEnabled: false,
        text: Alloy.Globals.icon.expandFill,
        id: "stateDropDownIcon"
    });
    $.__views.__alloyId79.add($.__views.stateDropDownIcon);
    $.__views.stateScroll = Ti.UI.createScrollView({
        layout: "vertical",
        backgroundColor: "#595959",
        height: "0",
        id: "stateScroll",
        zIndex: 12
    });
    $.__views.stateDropDown.add($.__views.stateScroll);
    $.__views.__alloyId80 = Ti.UI.createView({
        top: "185dp",
        left: "50%",
        backgroundColor: "#a6ffffff",
        height: "35dp",
        width: "1dp",
        id: "__alloyId80"
    });
    $.__views.__alloyId75.add($.__views.__alloyId80);
    $.__views.cityDropDown = Ti.UI.createView({
        layout: "vertical",
        top: "185dp",
        right: "0",
        width: "48%",
        zIndex: "100",
        height: "40dp",
        id: "cityDropDown",
        bubbleParent: false
    });
    $.__views.__alloyId75.add($.__views.cityDropDown);
    $.__views.__alloyId81 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "0dp",
        layout: "horizontal",
        touchEnabled: false,
        id: "__alloyId81"
    });
    $.__views.cityDropDown.add($.__views.__alloyId81);
    $.__views.cityLbl = Ti.UI.createLabel({
        left: "15dp",
        top: "0dp",
        width: "65%",
        height: "40dp",
        font: {
            fontSize: "12sp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        color: "#e65e48",
        touchEnabled: false,
        text: "CITY",
        id: "cityLbl"
    });
    $.__views.__alloyId81.add($.__views.cityLbl);
    $.__views.cityDropDownIcon = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "12sp"
        },
        rigth: "0dp",
        width: "19%",
        height: "40dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "#a6ffffff",
        touchEnabled: false,
        text: Alloy.Globals.icon.expandFill,
        id: "cityDropDownIcon"
    });
    $.__views.__alloyId81.add($.__views.cityDropDownIcon);
    $.__views.cityScroll = Ti.UI.createScrollView({
        layout: "vertical",
        backgroundColor: "#595959",
        height: "0",
        id: "cityScroll",
        zIndex: 12
    });
    $.__views.cityDropDown.add($.__views.cityScroll);
    $.__views.__alloyId82 = Ti.UI.createView({
        top: "225dp",
        height: "0.5dp",
        width: Titanium.UI.FILL,
        backgroundColor: "#A1A39E",
        id: "__alloyId82"
    });
    $.__views.__alloyId75.add($.__views.__alloyId82);
    $.__views.__alloyId83 = Ti.UI.createView({
        layout: "vertical",
        top: "228dp",
        id: "__alloyId83"
    });
    $.__views.__alloyId75.add($.__views.__alloyId83);
    $.__views.addressLine1 = Ti.UI.createTextField({
        height: "40dp",
        width: "88%",
        backgroundColor: "transparent",
        color: "#ffffff",
        hintTextColor: "#a0a0a0",
        font: {
            fontSize: "15dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        top: "0dp",
        hintText: "*ADDRESS LINE 1",
        id: "addressLine1",
        type: "TextField"
    });
    $.__views.__alloyId83.add($.__views.addressLine1);
    navigateToNextTextfield ? $.addListener($.__views.addressLine1, "return", navigateToNextTextfield) : __defers["$.__views.addressLine1!return!navigateToNextTextfield"] = true;
    $.__views.addressLine1_seperator = Ti.UI.createView({
        top: "0dp",
        height: "0.5dp",
        width: "88%",
        backgroundColor: "#e65e48",
        id: "addressLine1_seperator"
    });
    $.__views.__alloyId83.add($.__views.addressLine1_seperator);
    $.__views.addressLine2 = Ti.UI.createTextField({
        height: "40dp",
        width: "88%",
        backgroundColor: "transparent",
        color: "#ffffff",
        hintTextColor: "#a0a0a0",
        font: {
            fontSize: "15dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        top: "10dp",
        hintText: "ADDRESS LINE 2",
        id: "addressLine2",
        type: "TextField"
    });
    $.__views.__alloyId83.add($.__views.addressLine2);
    navigateToNextTextfield ? $.addListener($.__views.addressLine2, "return", navigateToNextTextfield) : __defers["$.__views.addressLine2!return!navigateToNextTextfield"] = true;
    $.__views.addressLine1_seperator = Ti.UI.createView({
        top: "0dp",
        height: "0.5dp",
        width: "88%",
        backgroundColor: "#e65e48",
        id: "addressLine1_seperator"
    });
    $.__views.__alloyId83.add($.__views.addressLine1_seperator);
    $.__views.pinCode = Ti.UI.createTextField({
        keyboardType: Titanium.UI.KEYBOARD_PHONE_PAD,
        height: "40dp",
        width: "88%",
        backgroundColor: "transparent",
        color: "#ffffff",
        hintTextColor: "#a0a0a0",
        font: {
            fontSize: "15dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        top: "10dp",
        hintText: "*PIN CODE",
        maxLength: 6,
        id: "pinCode",
        type: "TextField"
    });
    $.__views.__alloyId83.add($.__views.pinCode);
    navigateToNextTextfield ? $.addListener($.__views.pinCode, "return", navigateToNextTextfield) : __defers["$.__views.pinCode!return!navigateToNextTextfield"] = true;
    $.__views.addressLine1_seperator = Ti.UI.createView({
        top: "0dp",
        height: "0.5dp",
        width: "88%",
        backgroundColor: "#e65e48",
        id: "addressLine1_seperator"
    });
    $.__views.__alloyId83.add($.__views.addressLine1_seperator);
    $.__views.saveAddress = Ti.UI.createLabel({
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        top: "30dp",
        width: "80%",
        height: "40dp",
        color: "#ffffff",
        borderColor: "#80e7e7e7",
        borderWidth: "0.5",
        backgroundColor: "transparent",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        bottom: "50dp",
        text: "SAVE ADDRESS",
        id: "saveAddress"
    });
    $.__views.__alloyId83.add($.__views.saveAddress);
    saveAddress ? $.addListener($.__views.saveAddress, "click", saveAddress) : __defers["$.__views.saveAddress!click!saveAddress"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.mainWindow.removeEventListener("android:back", closeAddress);
    args.mainWindow.addEventListener("android:back", closeAddress);
    var regionList = null;
    var customerAddress = args.customerAddress;
    getRegionListing();
    touchEffect.createTouchEffect($.saveAddress, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.refreshIcon, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.addressCloseLbl, "#a6ffffff", "#ffffff");
    $.superView.removeEventListener("click", blurEffect);
    $.superView.addEventListener("click", blurEffect);
    var cityFlag = true;
    var stateFlag = true;
    $.cityDropDown.removeEventListener("click", selectCity);
    $.cityDropDown.addEventListener("click", selectCity);
    $.stateDropDown.removeEventListener("click", selectState);
    $.stateDropDown.addEventListener("click", selectState);
    $.addressCloseLbl.removeEventListener("click", closeAddress);
    $.addressCloseLbl.addEventListener("click", closeAddress);
    var param = {};
    __defers["$.__views.superView!swipe!hideKeyboard"] && $.addListener($.__views.superView, "swipe", hideKeyboard);
    __defers["$.__views.refreshIcon!click!refreshAddress"] && $.addListener($.__views.refreshIcon, "click", refreshAddress);
    __defers["$.__views.fname!return!navigateToNextTextfield"] && $.addListener($.__views.fname, "return", navigateToNextTextfield);
    __defers["$.__views.lname!return!navigateToNextTextfield"] && $.addListener($.__views.lname, "return", navigateToNextTextfield);
    __defers["$.__views.phoneNo!return!navigateToNextTextfield"] && $.addListener($.__views.phoneNo, "return", navigateToNextTextfield);
    __defers["$.__views.addressLine1!return!navigateToNextTextfield"] && $.addListener($.__views.addressLine1, "return", navigateToNextTextfield);
    __defers["$.__views.addressLine2!return!navigateToNextTextfield"] && $.addListener($.__views.addressLine2, "return", navigateToNextTextfield);
    __defers["$.__views.pinCode!return!navigateToNextTextfield"] && $.addListener($.__views.pinCode, "return", navigateToNextTextfield);
    __defers["$.__views.saveAddress!click!saveAddress"] && $.addListener($.__views.saveAddress, "click", saveAddress);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;