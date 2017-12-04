function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function loadMyAccountInfo() {
        var requestMethod = Alloy.Globals.commonUrl.myAccount;
        showFullLoader($.myaccount_container);
        Alloy.Globals.webServiceCall(requestMethod, {}, myAccountSuccessCallback, myAccountErrorCallback, "POST", args.mainWindow);
    }
    function myAccountSuccessCallback(e) {
        try {
            responseData = e.data;
            if (!isAddress) {
                $.number_value_lbl.setText(responseData.customer.mobile || "-");
                Ti.App.Properties.setString("password", responseData.customer.password);
                if (isNullVal(responseData.customer.dob)) $.dob_value_lbl.setText("- - -"); else {
                    var formateDate = moment(responseData.customer.dob).format("DD MMMM, YYYY");
                    $.dob_value_lbl.setText(formateDate.toUpperCase());
                }
                if (isNullVal(responseData.customer.anniversary_date)) $.anniversary_value_lbl.setText("- - -"); else {
                    var formateDate = moment(responseData.customer.anniversary_date).format("DD MMMM, YYYY");
                    $.anniversary_value_lbl.setText(formateDate.toUpperCase());
                }
                args.updateFunction(responseData);
                editAccountInfo = responseData;
                setAccountInfo(responseData);
                if (0 === responseData.addresses.length) {
                    $.address_lbl.setVisible(false);
                    addressCount = 0;
                } else {
                    addressCount = responseData.addresses.length;
                    $.address_lbl.setVisible(true);
                }
            }
            if (isAddress) {
                $.address_lbl.setVisible(true);
                addressCount++;
            }
            _.each(responseData.addresses, function(value, k) {
                var addressView = $.UI.create("View", {
                    classes: "left0 widthFill",
                    height: Ti.UI.SIZE
                });
                var addressValue = $.UI.create("Label", {
                    classes: "fontLight",
                    width: "74%",
                    wordWrap: true,
                    left: "5%",
                    top: "10dp",
                    bottom: "10dp",
                    color: "#000000",
                    font: {
                        fontSize: "12dp"
                    }
                });
                var _addressResponse = value;
                var addressStreet = ((_addressResponse.street1 || "") + ", " + (_addressResponse.street2 || "")).toUpperCase();
                var addressCity = ((_addressResponse.city || "") + " - " + (_addressResponse.pincode || "")).toUpperCase();
                var addressState = (_addressResponse.state || "").toUpperCase();
                var addressText = addressStreet + "\n" + addressCity + "\n" + addressState;
                var attr = Ti.UI.createAttributedString({
                    text: addressText,
                    attributes: [ {
                        type: Ti.UI.ATTRIBUTE_FONT,
                        value: {
                            color: "#000",
                            fontFamily: "futura_medium_bt-webfont"
                        },
                        range: [ addressText.indexOf(addressCity), addressCity.length ]
                    }, {
                        type: Ti.UI.ATTRIBUTE_FONT,
                        value: {
                            color: "#000",
                            fontFamily: "futura_medium_bt-webfont"
                        },
                        range: [ addressText.indexOf(addressState), addressState.length ]
                    } ]
                });
                addressValue.attributedString = attr;
                addressValue.setText(addressText);
                addressView.add(addressValue);
                var addressEdit = $.UI.create("Label", {
                    classes: "iconFont",
                    text: Alloy.Globals.icon.edit,
                    addressResponse: {
                        customer: responseData.customer,
                        addresses: value
                    },
                    addressLabel: addressValue,
                    width: "25dp",
                    height: "15dp",
                    right: "12%",
                    top: "10dp",
                    color: "#7e7d7d",
                    font: {
                        fontSize: "14dp"
                    }
                });
                addressView.add(addressEdit);
                touchEffect.createTouchEffect(addressEdit, "#000", "#7e7d7d");
                addressEdit.addEventListener("click", navigateToEditAddress);
                var addressDelete = $.UI.create("Label", {
                    classes: "iconFont",
                    text: Alloy.Globals.icon.deleteIcon,
                    addressResponse: {
                        customer: responseData.customer,
                        addresses: value
                    },
                    addressLabel: addressValue,
                    width: "25dp",
                    height: "15dp",
                    right: "5%",
                    top: "10dp",
                    color: "#7e7d7d",
                    font: {
                        fontSize: "14dp"
                    },
                    id: value.entity_id,
                    rowRef: addressView
                });
                addressView.add(addressDelete);
                touchEffect.createTouchEffect(addressDelete, "#000", "#7e7d7d");
                addressDelete.addEventListener("click", _deleteAddress);
                var border = $.UI.create("View", {
                    classes: "border"
                });
                addressDelete.borderRef = border;
                $.addressContainer.add(addressView);
                $.addressContainer.add(border);
            });
        } catch (exp) {
            alert("Something went wrong");
        }
        hideLoader();
        hideFullLoader();
    }
    function myAccountErrorCallback(e) {
        hideLoader();
        hideFullLoader();
        showAlert($.myaccount_container, e.message);
    }
    function openEditProfileScreen(e) {
        $.myaccount_container.add($.myaccount_info_edit);
        $.myaccount_container.remove($.myaccount_info);
    }
    function cancelAccountEdit(e) {
        setAccountInfo(editAccountInfo);
        hideChangePassword();
        $.myaccount_container.add($.myaccount_info);
        $.myaccount_info_edit.scrollTo(0, 0);
        $.myaccount_container.remove($.myaccount_info_edit);
    }
    function showChangePassword(e) {
        var lblValue = $.changePassword_btn.getText();
        if ("Cancel" === lblValue) {
            hideChangePassword();
            $.change_password_txt.setValue("");
            $.change_password_txt.setPasswordMask(true);
            $.previewPassword.setVisible(false);
            $.previewPassword.setColor("#000");
            $.confirm_password_txt.setValue("");
            $.confirm_password_txt.setPasswordMask(true);
            $.previewConfirmPassword.setVisible(false);
            $.previewConfirmPassword.setColor("#000");
        } else {
            $.changePassword_btn.setText("Cancel");
            $.changePassword_container.setVisible(true);
            $.changePassword_container.setHeight("120dp");
        }
    }
    function hideChangePassword() {
        $.changePassword_btn.setText("Change");
        $.changePassword_container.setHeight("0");
        $.changePassword_container.setVisible(false);
    }
    function showDatePicker(e) {
        var obj = {};
        obj = e.source.dob ? {
            day: $.dob_date,
            month: $.dob_month,
            year: $.dob_year,
            setDate: true
        } : {
            day: $.anniversary_date,
            month: $.anniversary_month,
            year: $.anniversary_year,
            setDate: true
        };
        var picker = Alloy.createController("pickerTemplate", obj).getView();
        args.mainWindow.add(picker);
    }
    function navigateToEditAddress(e) {
        var addAddress = Alloy.createController("addAddress", {
            isEdit: true,
            customerAddress: e.source.addressResponse,
            addressLabel: e.source.addressLabel,
            isFormat: true,
            closeAndroidBack: args.closeAndroidBack,
            mainWindow: args.mainWindow
        }).getView();
        addAddress.zIndex = 12;
        args.mainWindow.add(addAddress);
        addAddress.show();
        args.androidBack();
    }
    function showBorder(e) {
        var _id = e.source.id;
        $[_id + "_border"].visible = true;
    }
    function hideBorder(e) {
        var _id = e.source.id;
        $[_id + "_border"].visible = false;
    }
    function selectGender(e) {
        var gender = e.source.gender;
        if ("male" === gender) {
            $.male.setColor(Alloy.Globals.labelTitleColor);
            $.female.setColor("#33000000");
            $.other.setColor("#33000000");
        } else if ("female" === gender) {
            $.female.setColor(Alloy.Globals.labelTitleColor);
            $.male.setColor("#33000000");
            $.other.setColor("#33000000");
        } else {
            $.male.setColor("#33000000");
            $.female.setColor("#33000000");
            $.other.setColor(Alloy.Globals.labelTitleColor);
        }
    }
    function showPassword(e) {
        if ("previewPassword" == e.source.id) if ("#000" === $.previewPassword.getColor()) {
            $.previewPassword.setColor("#33000000");
            $.change_password_txt.setPasswordMask(false);
        } else {
            $.previewPassword.setColor("#000");
            $.change_password_txt.setPasswordMask(true);
        } else if ("previewConfirmPassword" == e.source.id) if ("#000" === $.previewConfirmPassword.getColor()) {
            $.previewConfirmPassword.setColor("#33000000");
            $.confirm_password_txt.setPasswordMask(false);
        } else {
            $.previewConfirmPassword.setColor("#000");
            $.confirm_password_txt.setPasswordMask(true);
        }
    }
    function displayPasswordPreview(e) {
        if ("change_password_txt" == e.source.id) {
            var changePasswordTxt = $.change_password_txt.getValue();
            if (0 != changePasswordTxt.length) {
                $.previewPassword.setVisible(true);
                $.change_password_txt.getPasswordMask() ? $.previewPassword.setColor("#000") : $.previewPassword.setColor("#33000000");
            } else $.previewPassword.setVisible(false);
        } else if ("confirm_password_txt" == e.source.id) {
            var confirmPasswordTxt = $.confirm_password_txt.getValue();
            if (0 != confirmPasswordTxt.length) {
                $.previewConfirmPassword.setVisible(true);
                $.confirm_password_txt.getPasswordMask() ? $.previewConfirmPassword.setColor("#000") : $.previewConfirmPassword.setColor("#33000000");
            } else $.previewConfirmPassword.setVisible(false);
        }
    }
    function updateAccountInfo() {
        hideKeyboard();
        var correctPassword = true;
        if ("#33000000" === $.male.getColor() && "#33000000" === $.female.getColor() && "#33000000" === $.other.getColor()) {
            showAlert(args.mainWindow, "Please select gender");
            $.myaccount_info_edit.scrollTo(0, 0);
        } else if (validators.RegularExpressionName($.fname_txt)) if (validators.RegularExpressionName($.lname_txt)) if (validators.RegularExpressionEmail($.email_txt)) if (void 0 == $.dob_date.date || "DD" == $.dob_date.text) showAlert(args.mainWindow, "Please select DOB"); else if ("Cancel" !== $.changePassword_btn.getText() || validators.RegularExpressionPassword($.change_password_txt)) if (correctPassword && "Cancel" === $.changePassword_btn.getText() && $.change_password_txt.getValue() != $.confirm_password_txt.getValue()) showAlert(args.mainWindow, "Confirm Password does not Match"); else {
            var requestMethod = Alloy.Globals.commonUrl.editAccount;
            $.male.getColor() === Alloy.Globals.labelTitleColor ? _gender = "1" : $.female.getColor() === Alloy.Globals.labelTitleColor ? _gender = "2" : $.other.getColor() === Alloy.Globals.labelTitleColor && (_gender = "3");
            var param = {
                firstname: $.fname_txt.getValue(),
                lastname: $.lname_txt.getValue(),
                email: $.email_txt.getValue(),
                gender: _gender,
                mobile: $.number_txt.getValue(),
                dob: "" == $.dob_date.date ? "" : moment($.dob_date.date).format("YYYY-MM-DD"),
                password: Ti.App.Properties.getString("password"),
                new_password: $.change_password_txt.getValue(),
                anniversary_date: "" == $.anniversary_date.date ? "" : moment($.anniversary_date.date).format("YYYY-MM-DD"),
                image: Ti.App.Properties.getString("image")
            };
            newCustomerInfoObj = {
                customer: param
            };
            var requestParam = JSON.stringify(param);
            showFullLoader($.myaccount_container);
            Alloy.Globals.webServiceCall(requestMethod, requestParam, editAccountSuccessCallback, editAccountErrorCallback, "POST", args.mainWindow);
        } else {
            showAlert(args.mainWindow, "Please enter password minimum 7 characters including atleast 1 number");
            correctPassword = false;
            setTimeout(function() {
                $.change_password_txt.focus();
            }, 1e3);
        } else {
            showAlert(args.mainWindow, "Please enter a valid email");
            $.myaccount_info_edit.scrollTo(0, 0);
            setTimeout(function() {
                $.email_txt.focus();
            }, 1e3);
        } else {
            showAlert(args.mainWindow, "Please enter a valid last name");
            $.myaccount_info_edit.scrollTo(0, 0);
            setTimeout(function() {
                $.lname_txt.focus();
            }, 1e3);
        } else {
            showAlert(args.mainWindow, "Please enter a valid first name");
            $.myaccount_info_edit.scrollTo(0, 0);
            setTimeout(function() {
                $.fname_txt.focus();
            }, 1e3);
        }
    }
    function editAccountSuccessCallback(e) {
        try {
            Ti.App.Properties.setString("firstname", $.fname_txt.getValue());
            Ti.App.Properties.setString("lastname", $.lname_txt.getValue());
            Ti.App.Properties.setString("contact_number", $.number_txt.getValue());
            Ti.App.Properties.setString("gender", _gender);
            args.updateFunction(newCustomerInfoObj, true);
            $.number_value_lbl.setText(newCustomerInfoObj.customer.mobile || "-");
            if ("" != newCustomerInfoObj.customer.dob) {
                var formateDate = moment(newCustomerInfoObj.customer.dob).format("DD MMMM, YYYY");
                $.dob_value_lbl.setText(formateDate.toUpperCase());
            } else $.dob_value_lbl.setText("- - -");
            if ("" != newCustomerInfoObj.customer.anniversary_date) {
                var formateDate = moment(newCustomerInfoObj.customer.anniversary_date).format("DD MMMM, YYYY");
                $.anniversary_value_lbl.setText(formateDate.toUpperCase());
            } else $.anniversary_value_lbl.setText("- - -");
            editAccountInfo = newCustomerInfoObj;
            setAccountInfo(newCustomerInfoObj);
            $.changePassword_btn.fireEvent("click");
            hideLoader();
            hideFullLoader();
            $.cancel_btn.fireEvent("click");
        } catch (exp) {
            alert("Something went wrong");
        }
    }
    function editAccountErrorCallback(e) {
        hideLoader();
        hideFullLoader();
        showAlert(args.mainWindow, e.message);
    }
    function setAccountInfo(response) {
        var customerInfo = response.customer;
        "1" === customerInfo.gender ? $.male.fireEvent("touchstart") : "2" === customerInfo.gender ? $.female.fireEvent("touchstart") : "3" === customerInfo.gender ? $.other.fireEvent("touchstart") : $.female.fireEvent("touchstart");
        $.fname_txt.setValue(customerInfo.firstname || "");
        $.lname_txt.setValue(customerInfo.lastname || "");
        $.email_txt.setValue(customerInfo.email || "");
        if ("" != $.email_txt.getValue()) {
            $.email_txt.setEditable(false);
            $.email_txt.setTouchEnabled(false);
            $.email_txt.setColor("#33000000");
        }
        $.number_txt.setValue(customerInfo.mobile || "");
        if ("" != customerInfo.dob) {
            var _dob = moment(customerInfo.dob).format("YYYY-MM-DD");
            var getDob = _dob.split("-");
            $.dob_date.setText(getDob[2]);
            $.dob_month.setText(getDob[1]);
            $.dob_year.setText(getDob[0]);
            $.dob_date.date = _dob;
        } else {
            $.dob_date.date = "";
            $.dob_date.setText("DD");
            $.dob_month.setText("MM");
            $.dob_year.setText("YYYY");
        }
        if ("" != customerInfo.anniversary_date) {
            var _anniversary = moment(customerInfo.anniversary_date).format("YYYY-MM-DD");
            var getAnniversary = _anniversary.split("-");
            $.anniversary_date.setText(getAnniversary[2]);
            $.anniversary_month.setText(getAnniversary[1]);
            $.anniversary_year.setText(getAnniversary[0]);
            $.anniversary_date.date = _anniversary;
        } else {
            $.anniversary_date.date = "";
            $.anniversary_date.setText("DD");
            $.anniversary_month.setText("MM");
            $.anniversary_year.setText("YYYY");
        }
    }
    function _deleteAddress(e) {
        args.androidBack();
        deleteRow = e.source.rowRef;
        _border = e.source.borderRef;
        var requestMethod = Alloy.Globals.commonUrl.deleteAddress;
        var param = {
            id: e.source.id
        };
        var requestParam = JSON.stringify(param);
        args.mainWindow.add(Alloy.createController("confirmation", {
            requestMethod: requestMethod,
            requestParam: requestParam,
            successCallback: _deleteAddressSuccessCallback,
            errorCallback: _deleteAddressErrorCallback,
            windowContainer: args.mainWindow,
            message: "Are you sure you want to delete the address ?",
            productName: "",
            showLoader: showTransparentLoader
        }).getView());
    }
    function _deleteAddressSuccessCallback(e) {
        $.myaccount_info.remove(deleteRow);
        $.myaccount_info.remove(_border);
        addressCount--;
        0 == addressCount && $.address_lbl.setVisible(false);
        deleteRow = null;
        _border = null;
        hideLoader();
        hideFullLoader();
        hideTransparentLoader();
        args.closeAndroidBack();
    }
    function _deleteAddressErrorCallback(e) {
        args.closeAndroidBack();
        hideLoader();
        hideFullLoader();
        showAlert(args.mainWindow, e.message);
    }
    function navigateToAddAddress() {
        isAddress = true;
        var addAddress = Alloy.createController("addAddress", {
            isEdit: false,
            displayAddressFunction: myAccountSuccessCallback,
            closeAndroidBack: args.closeAndroidBack,
            mainWindow: args.mainWindow
        }).getView();
        args.mainWindow.add(addAddress);
        addAddress.zIndex = 12;
        addAddress.show();
        args.androidBack();
    }
    function hideKeyboard(e) {
        Ti.UI.Android.hideSoftKeyboard();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "myaccount_info";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.myaccount_container = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        id: "myaccount_container"
    });
    $.__views.myaccount_container && $.addTopLevelView($.__views.myaccount_container);
    hideKeyboard ? $.addListener($.__views.myaccount_container, "dblclick", hideKeyboard) : __defers["$.__views.myaccount_container!dblclick!hideKeyboard"] = true;
    $.__views.myaccount_info = Ti.UI.createScrollView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        layout: "vertical",
        visible: true,
        id: "myaccount_info",
        scrollType: "vertical"
    });
    $.__views.myaccount_container.add($.__views.myaccount_info);
    $.__views.editProfile_btn = Ti.UI.createLabel({
        color: Alloy.Globals.labelTitleColor,
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "12dp"
        },
        right: "5%",
        top: 20,
        text: "Edit profile",
        id: "editProfile_btn"
    });
    $.__views.myaccount_info.add($.__views.editProfile_btn);
    openEditProfileScreen ? $.addListener($.__views.editProfile_btn, "click", openEditProfileScreen) : __defers["$.__views.editProfile_btn!click!openEditProfileScreen"] = true;
    $.__views.number_lbl = Ti.UI.createLabel({
        left: "5%",
        color: Alloy.Globals.labelTitleColor,
        top: 10,
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        text: "NUMBER",
        id: "number_lbl"
    });
    $.__views.myaccount_info.add($.__views.number_lbl);
    $.__views.number_value_lbl = Ti.UI.createLabel({
        left: "5%",
        color: "#000",
        top: 2,
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        text: "-",
        id: "number_value_lbl"
    });
    $.__views.myaccount_info.add($.__views.number_value_lbl);
    $.__views.dob_lbl = Ti.UI.createLabel({
        left: "5%",
        color: Alloy.Globals.labelTitleColor,
        top: 20,
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        text: "DATE OF BIRTH",
        id: "dob_lbl"
    });
    $.__views.myaccount_info.add($.__views.dob_lbl);
    $.__views.dob_value_lbl = Ti.UI.createLabel({
        left: "5%",
        color: "#000",
        top: 2,
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        text: "- - -",
        id: "dob_value_lbl"
    });
    $.__views.myaccount_info.add($.__views.dob_value_lbl);
    $.__views.anniversary_lbl = Ti.UI.createLabel({
        left: "5%",
        color: Alloy.Globals.labelTitleColor,
        top: 20,
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        text: "ANNIVERSARY",
        id: "anniversary_lbl"
    });
    $.__views.myaccount_info.add($.__views.anniversary_lbl);
    $.__views.anniversary_value_lbl = Ti.UI.createLabel({
        left: "5%",
        color: "#000",
        top: 2,
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        text: "- - -",
        id: "anniversary_value_lbl"
    });
    $.__views.myaccount_info.add($.__views.anniversary_value_lbl);
    $.__views.address_lbl = Ti.UI.createLabel({
        left: "5%",
        color: Alloy.Globals.labelTitleColor,
        top: 20,
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        text: "ADDRESS",
        id: "address_lbl"
    });
    $.__views.myaccount_info.add($.__views.address_lbl);
    $.__views.addressContainer = Ti.UI.createScrollView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "addressContainer",
        scrollType: "vertical",
        layout: "vertical",
        top: 1
    });
    $.__views.myaccount_info.add($.__views.addressContainer);
    $.__views.addnewAdderss_btn = Ti.UI.createLabel({
        left: "5%",
        color: Alloy.Globals.labelTitleColor,
        top: "2dp",
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        bottom: "40dp",
        text: "Add new address",
        id: "addnewAdderss_btn"
    });
    $.__views.myaccount_info.add($.__views.addnewAdderss_btn);
    navigateToAddAddress ? $.addListener($.__views.addnewAdderss_btn, "click", navigateToAddAddress) : __defers["$.__views.addnewAdderss_btn!click!navigateToAddAddress"] = true;
    $.__views.myaccount_info_edit = Ti.UI.createScrollView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        layout: "vertical",
        scrollType: "vertical",
        id: "myaccount_info_edit"
    });
    $.__views.myaccount_container.add($.__views.myaccount_info_edit);
    $.__views.__alloyId978 = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: "5%",
        top: 10,
        layout: "horizontal",
        id: "__alloyId978"
    });
    $.__views.myaccount_info_edit.add($.__views.__alloyId978);
    $.__views.__alloyId979 = Ti.UI.createLabel({
        top: 20,
        left: "0%",
        color: Alloy.Globals.labelTitleColor,
        font: {
            fontSize: "10dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        text: "Note :",
        id: "__alloyId979"
    });
    $.__views.__alloyId978.add($.__views.__alloyId979);
    $.__views.__alloyId980 = Ti.UI.createLabel({
        top: 20,
        left: "2%",
        font: {
            fontSize: "10dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#333333",
        text: "Tap the fields to edit",
        id: "__alloyId980"
    });
    $.__views.__alloyId978.add($.__views.__alloyId980);
    $.__views.gender_lbl = Ti.UI.createLabel({
        left: "5%",
        top: 20,
        color: Alloy.Globals.labelTitleColor,
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        text: "I AM",
        id: "gender_lbl"
    });
    $.__views.myaccount_info_edit.add($.__views.gender_lbl);
    $.__views.__alloyId981 = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: "5%",
        top: 5,
        layout: "horizontal",
        id: "__alloyId981"
    });
    $.__views.myaccount_info_edit.add($.__views.__alloyId981);
    $.__views.male = Ti.UI.createLabel({
        left: "0%",
        font: {
            fontFamily: "icomoon",
            fontSize: "14dp"
        },
        color: "#dfdfdf",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        right: "5dp",
        bubbleParent: true,
        text: Alloy.Globals.icon.radio,
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        gender: "male",
        id: "male"
    });
    $.__views.__alloyId981.add($.__views.male);
    selectGender ? $.addListener($.__views.male, "touchstart", selectGender) : __defers["$.__views.male!touchstart!selectGender"] = true;
    $.__views.radioText1 = Ti.UI.createLabel({
        color: "#000",
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        right: "5dp",
        bubbleParent: true,
        text: "MALE",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        gender: "male",
        id: "radioText1"
    });
    $.__views.__alloyId981.add($.__views.radioText1);
    selectGender ? $.addListener($.__views.radioText1, "touchstart", selectGender) : __defers["$.__views.radioText1!touchstart!selectGender"] = true;
    $.__views.female = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "14dp"
        },
        color: "#dfdfdf",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        right: "5dp",
        bubbleParent: true,
        text: Alloy.Globals.icon.radio,
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        gender: "female",
        id: "female",
        left: "14dp"
    });
    $.__views.__alloyId981.add($.__views.female);
    selectGender ? $.addListener($.__views.female, "touchstart", selectGender) : __defers["$.__views.female!touchstart!selectGender"] = true;
    $.__views.radioText2 = Ti.UI.createLabel({
        color: "#000",
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        right: "5dp",
        bubbleParent: true,
        text: "FEMALE",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        gender: "female",
        id: "radioText2"
    });
    $.__views.__alloyId981.add($.__views.radioText2);
    selectGender ? $.addListener($.__views.radioText2, "touchstart", selectGender) : __defers["$.__views.radioText2!touchstart!selectGender"] = true;
    $.__views.other = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "14dp"
        },
        color: "#dfdfdf",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        right: "5dp",
        bubbleParent: true,
        text: Alloy.Globals.icon.radio,
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        gender: "other",
        id: "other",
        left: "14dp"
    });
    $.__views.__alloyId981.add($.__views.other);
    selectGender ? $.addListener($.__views.other, "touchstart", selectGender) : __defers["$.__views.other!touchstart!selectGender"] = true;
    $.__views.radioText3 = Ti.UI.createLabel({
        color: "#000",
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        right: "5dp",
        bubbleParent: true,
        text: "OTHER",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        gender: "other",
        id: "radioText3"
    });
    $.__views.__alloyId981.add($.__views.radioText3);
    selectGender ? $.addListener($.__views.radioText3, "touchstart", selectGender) : __defers["$.__views.radioText3!touchstart!selectGender"] = true;
    $.__views.__alloyId982 = Ti.UI.createLabel({
        left: "5%",
        top: 20,
        color: Alloy.Globals.labelTitleColor,
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        text: "FIRST NAME",
        id: "__alloyId982"
    });
    $.__views.myaccount_info_edit.add($.__views.__alloyId982);
    $.__views.__alloyId983 = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: -8,
        left: "2%",
        layout: "horizontal",
        id: "__alloyId983"
    });
    $.__views.myaccount_info_edit.add($.__views.__alloyId983);
    $.__views.__alloyId984 = Ti.UI.createLabel({
        left: "0%",
        color: "#000",
        top: "12dp",
        font: {
            fontSize: "18dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        text: "*",
        id: "__alloyId984"
    });
    $.__views.__alloyId983.add($.__views.__alloyId984);
    $.__views.fname_txt = Ti.UI.createTextField({
        height: "40dp",
        width: "78%",
        backgroundColor: "transparent",
        color: "#000",
        hintTextColor: "#a0a0a0",
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        top: 0,
        left: 0,
        id: "fname_txt",
        hintText: "Enter Firstname"
    });
    $.__views.__alloyId983.add($.__views.fname_txt);
    showBorder ? $.addListener($.__views.fname_txt, "focus", showBorder) : __defers["$.__views.fname_txt!focus!showBorder"] = true;
    hideBorder ? $.addListener($.__views.fname_txt, "blur", hideBorder) : __defers["$.__views.fname_txt!blur!hideBorder"] = true;
    $.__views.fname_txt_border = Ti.UI.createView({
        left: "5%",
        backgroundColor: "#a0a0a0",
        height: "2px",
        width: "78%",
        right: "5%",
        id: "fname_txt_border",
        top: 0,
        visible: false
    });
    $.__views.myaccount_info_edit.add($.__views.fname_txt_border);
    $.__views.__alloyId985 = Ti.UI.createLabel({
        left: "5%",
        top: 20,
        color: Alloy.Globals.labelTitleColor,
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        text: "LAST NAME",
        id: "__alloyId985"
    });
    $.__views.myaccount_info_edit.add($.__views.__alloyId985);
    $.__views.__alloyId986 = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: -8,
        left: "2%",
        layout: "horizontal",
        id: "__alloyId986"
    });
    $.__views.myaccount_info_edit.add($.__views.__alloyId986);
    $.__views.__alloyId987 = Ti.UI.createLabel({
        left: "0%",
        color: "#000",
        top: "12dp",
        font: {
            fontSize: "18dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        text: "*",
        id: "__alloyId987"
    });
    $.__views.__alloyId986.add($.__views.__alloyId987);
    $.__views.lname_txt = Ti.UI.createTextField({
        height: "40dp",
        width: "78%",
        backgroundColor: "transparent",
        color: "#000",
        hintTextColor: "#a0a0a0",
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        top: "0dp",
        left: 0,
        id: "lname_txt",
        hintText: "Enter Lastname"
    });
    $.__views.__alloyId986.add($.__views.lname_txt);
    showBorder ? $.addListener($.__views.lname_txt, "focus", showBorder) : __defers["$.__views.lname_txt!focus!showBorder"] = true;
    hideBorder ? $.addListener($.__views.lname_txt, "blur", hideBorder) : __defers["$.__views.lname_txt!blur!hideBorder"] = true;
    $.__views.lname_txt_border = Ti.UI.createView({
        left: "5%",
        backgroundColor: "#a0a0a0",
        height: "2px",
        width: "78%",
        right: "5%",
        id: "lname_txt_border",
        top: 0,
        visible: false
    });
    $.__views.myaccount_info_edit.add($.__views.lname_txt_border);
    $.__views.__alloyId988 = Ti.UI.createLabel({
        left: "5%",
        top: 20,
        color: Alloy.Globals.labelTitleColor,
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        text: "EMAIL",
        id: "__alloyId988"
    });
    $.__views.myaccount_info_edit.add($.__views.__alloyId988);
    $.__views.__alloyId989 = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: -8,
        left: "2%",
        layout: "horizontal",
        id: "__alloyId989"
    });
    $.__views.myaccount_info_edit.add($.__views.__alloyId989);
    $.__views.__alloyId990 = Ti.UI.createLabel({
        left: "0%",
        color: "#000",
        top: "12dp",
        font: {
            fontSize: "18dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        text: "*",
        id: "__alloyId990"
    });
    $.__views.__alloyId989.add($.__views.__alloyId990);
    $.__views.email_txt = Ti.UI.createTextField({
        height: "40dp",
        width: "78%",
        backgroundColor: "transparent",
        color: "#000",
        hintTextColor: "#a0a0a0",
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        top: "0dp",
        left: 0,
        id: "email_txt",
        hintText: "Enter Email ID"
    });
    $.__views.__alloyId989.add($.__views.email_txt);
    showBorder ? $.addListener($.__views.email_txt, "focus", showBorder) : __defers["$.__views.email_txt!focus!showBorder"] = true;
    hideBorder ? $.addListener($.__views.email_txt, "blur", hideBorder) : __defers["$.__views.email_txt!blur!hideBorder"] = true;
    $.__views.email_txt_border = Ti.UI.createView({
        left: "5%",
        backgroundColor: "#a0a0a0",
        height: "2px",
        width: "78%",
        right: "5%",
        id: "email_txt_border",
        top: 0,
        visible: false
    });
    $.__views.myaccount_info_edit.add($.__views.email_txt_border);
    $.__views.__alloyId991 = Ti.UI.createLabel({
        left: "5%",
        top: 20,
        color: Alloy.Globals.labelTitleColor,
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        text: "NUMBER",
        id: "__alloyId991"
    });
    $.__views.myaccount_info_edit.add($.__views.__alloyId991);
    $.__views.__alloyId992 = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: -8,
        left: "2%",
        layout: "horizontal",
        id: "__alloyId992"
    });
    $.__views.myaccount_info_edit.add($.__views.__alloyId992);
    $.__views.__alloyId993 = Ti.UI.createLabel({
        left: "0%",
        color: "#000",
        top: "12dp",
        font: {
            fontSize: "18dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        text: "*",
        visible: false,
        id: "__alloyId993"
    });
    $.__views.__alloyId992.add($.__views.__alloyId993);
    $.__views.number_txt = Ti.UI.createTextField({
        keyboardType: Ti.UI.NUMBER_PAD,
        height: "40dp",
        width: "78%",
        backgroundColor: "transparent",
        color: "#000",
        hintTextColor: "#a0a0a0",
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        top: "0dp",
        left: 0,
        maxLength: 10,
        id: "number_txt",
        hintText: "Enter Mobile No"
    });
    $.__views.__alloyId992.add($.__views.number_txt);
    showBorder ? $.addListener($.__views.number_txt, "focus", showBorder) : __defers["$.__views.number_txt!focus!showBorder"] = true;
    hideBorder ? $.addListener($.__views.number_txt, "blur", hideBorder) : __defers["$.__views.number_txt!blur!hideBorder"] = true;
    $.__views.number_txt_border = Ti.UI.createView({
        left: "5%",
        backgroundColor: "#a0a0a0",
        height: "2px",
        width: "78%",
        right: "5%",
        id: "number_txt_border",
        top: 0,
        visible: false
    });
    $.__views.myaccount_info_edit.add($.__views.number_txt_border);
    $.__views.__alloyId994 = Ti.UI.createLabel({
        left: "5%",
        top: 20,
        color: Alloy.Globals.labelTitleColor,
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        text: "PASSWORD",
        id: "__alloyId994"
    });
    $.__views.myaccount_info_edit.add($.__views.__alloyId994);
    $.__views.__alloyId995 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: -8,
        left: "2%",
        id: "__alloyId995"
    });
    $.__views.myaccount_info_edit.add($.__views.__alloyId995);
    $.__views.password_txt = Ti.UI.createTextField({
        height: "40dp",
        width: "78%",
        backgroundColor: "transparent",
        color: "#b2b2b2",
        hintTextColor: "#a0a0a0",
        font: {
            fontSize: "25dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        left: "2%",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        top: 5,
        touchEnabled: false,
        id: "password_txt",
        passwordMask: true,
        hintText: "Enter Password",
        value: 12345678
    });
    $.__views.__alloyId995.add($.__views.password_txt);
    $.__views.changePassword_btn = Ti.UI.createLabel({
        right: "5%",
        color: Alloy.Globals.labelTitleColor,
        top: 7,
        font: {
            fontSize: "10dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        text: "Change",
        id: "changePassword_btn"
    });
    $.__views.__alloyId995.add($.__views.changePassword_btn);
    showChangePassword ? $.addListener($.__views.changePassword_btn, "click", showChangePassword) : __defers["$.__views.changePassword_btn!click!showChangePassword"] = true;
    $.__views.changePassword_container = Ti.UI.createView({
        width: Titanium.UI.FILL,
        left: "0%",
        top: 10,
        backgroundColor: "#f5f5f5",
        height: "0",
        visible: false,
        id: "changePassword_container",
        layout: "vertical"
    });
    $.__views.myaccount_info_edit.add($.__views.changePassword_container);
    $.__views.__alloyId996 = Ti.UI.createLabel({
        top: 20,
        left: "5%",
        color: Alloy.Globals.labelTitleColor,
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        text: "CHANGE PASSWORD",
        id: "__alloyId996"
    });
    $.__views.changePassword_container.add($.__views.__alloyId996);
    $.__views.__alloyId997 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        left: "0%",
        top: -8,
        id: "__alloyId997"
    });
    $.__views.changePassword_container.add($.__views.__alloyId997);
    $.__views.change_password_txt = Ti.UI.createTextField({
        top: "0dp",
        height: "40dp",
        width: "78%",
        backgroundColor: "transparent",
        color: "#b2b2b2",
        hintTextColor: "#a0a0a0",
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        left: "4%",
        id: "change_password_txt",
        passwordMask: true,
        hintText: "NEW PASSWORD"
    });
    $.__views.__alloyId997.add($.__views.change_password_txt);
    displayPasswordPreview ? $.addListener($.__views.change_password_txt, "change", displayPasswordPreview) : __defers["$.__views.change_password_txt!change!displayPasswordPreview"] = true;
    $.__views.previewPassword = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "16dp"
        },
        right: "5%",
        top: 20,
        color: "#000",
        text: Alloy.Globals.icon.password,
        width: "22dp",
        height: "22dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "previewPassword",
        visible: false
    });
    $.__views.__alloyId997.add($.__views.previewPassword);
    showPassword ? $.addListener($.__views.previewPassword, "click", showPassword) : __defers["$.__views.previewPassword!click!showPassword"] = true;
    $.__views.change_password_txt_border = Ti.UI.createView({
        left: "5%",
        backgroundColor: "#a0a0a0",
        height: "2px",
        width: "78%",
        right: "5%",
        id: "change_password_txt_border",
        top: 0,
        visible: true
    });
    $.__views.changePassword_container.add($.__views.change_password_txt_border);
    $.__views.__alloyId998 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        left: "0%",
        top: 5,
        id: "__alloyId998"
    });
    $.__views.changePassword_container.add($.__views.__alloyId998);
    $.__views.confirm_password_txt = Ti.UI.createTextField({
        top: "0dp",
        height: "40dp",
        width: "78%",
        backgroundColor: "transparent",
        color: "#b2b2b2",
        hintTextColor: "#a0a0a0",
        font: {
            fontSize: "18dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        left: "4%",
        id: "confirm_password_txt",
        passwordMask: true,
        hintText: "CONFIRM PASSWORD"
    });
    $.__views.__alloyId998.add($.__views.confirm_password_txt);
    displayPasswordPreview ? $.addListener($.__views.confirm_password_txt, "change", displayPasswordPreview) : __defers["$.__views.confirm_password_txt!change!displayPasswordPreview"] = true;
    $.__views.previewConfirmPassword = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "16dp"
        },
        right: "5%",
        top: 20,
        color: "#000",
        text: Alloy.Globals.icon.password,
        width: "22dp",
        height: "22dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "previewConfirmPassword",
        visible: false
    });
    $.__views.__alloyId998.add($.__views.previewConfirmPassword);
    showPassword ? $.addListener($.__views.previewConfirmPassword, "click", showPassword) : __defers["$.__views.previewConfirmPassword!click!showPassword"] = true;
    $.__views.confirm_password_txt_border = Ti.UI.createView({
        left: "5%",
        backgroundColor: "#a0a0a0",
        height: "2px",
        width: "78%",
        right: "5%",
        id: "confirm_password_txt_border",
        top: 0,
        visible: true
    });
    $.__views.changePassword_container.add($.__views.confirm_password_txt_border);
    $.__views.dob_lbl = Ti.UI.createLabel({
        left: "5%",
        top: 20,
        color: Alloy.Globals.labelTitleColor,
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        text: "DATE OF BIRTH",
        id: "dob_lbl"
    });
    $.__views.myaccount_info_edit.add($.__views.dob_lbl);
    $.__views.__alloyId999 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        top: 0,
        left: "5%",
        height: 40,
        layout: "horizontal",
        id: "__alloyId999"
    });
    $.__views.myaccount_info_edit.add($.__views.__alloyId999);
    $.__views.__alloyId1000 = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        left: "0%",
        dob: true,
        id: "__alloyId1000"
    });
    $.__views.__alloyId999.add($.__views.__alloyId1000);
    showDatePicker ? $.addListener($.__views.__alloyId1000, "click", showDatePicker) : __defers["$.__views.__alloyId1000!click!showDatePicker"] = true;
    $.__views.dob_date = Ti.UI.createLabel({
        top: 10,
        left: "0%",
        color: "#b2b2b2",
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        text: "DD",
        id: "dob_date"
    });
    $.__views.__alloyId1000.add($.__views.dob_date);
    $.__views.__alloyId1001 = Ti.UI.createLabel({
        top: 16,
        font: {
            fontFamily: "icomoon",
            fontSize: "6dp"
        },
        color: "#000",
        text: Alloy.Globals.icon.dropdownArrow,
        left: 70,
        id: "__alloyId1001"
    });
    $.__views.__alloyId1000.add($.__views.__alloyId1001);
    $.__views.__alloyId1002 = Ti.UI.createView({
        backgroundColor: "#a0a0a0",
        height: "2px",
        width: "28%",
        left: -12,
        right: "5%",
        top: 30,
        id: "__alloyId1002"
    });
    $.__views.__alloyId1000.add($.__views.__alloyId1002);
    $.__views.__alloyId1003 = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        left: "5%",
        dob: true,
        id: "__alloyId1003"
    });
    $.__views.__alloyId999.add($.__views.__alloyId1003);
    showDatePicker ? $.addListener($.__views.__alloyId1003, "click", showDatePicker) : __defers["$.__views.__alloyId1003!click!showDatePicker"] = true;
    $.__views.dob_month = Ti.UI.createLabel({
        top: 10,
        left: "0%",
        color: "#b2b2b2",
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        text: "MM",
        id: "dob_month"
    });
    $.__views.__alloyId1003.add($.__views.dob_month);
    $.__views.__alloyId1004 = Ti.UI.createLabel({
        top: 16,
        font: {
            fontFamily: "icomoon",
            fontSize: "6dp"
        },
        color: "#000",
        text: Alloy.Globals.icon.dropdownArrow,
        left: 70,
        id: "__alloyId1004"
    });
    $.__views.__alloyId1003.add($.__views.__alloyId1004);
    $.__views.__alloyId1005 = Ti.UI.createView({
        backgroundColor: "#a0a0a0",
        height: "2px",
        width: "28%",
        left: -12,
        right: "5%",
        top: 30,
        id: "__alloyId1005"
    });
    $.__views.__alloyId1003.add($.__views.__alloyId1005);
    $.__views.__alloyId1006 = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        left: "5%",
        dob: true,
        id: "__alloyId1006"
    });
    $.__views.__alloyId999.add($.__views.__alloyId1006);
    showDatePicker ? $.addListener($.__views.__alloyId1006, "click", showDatePicker) : __defers["$.__views.__alloyId1006!click!showDatePicker"] = true;
    $.__views.dob_year = Ti.UI.createLabel({
        top: 10,
        left: "0%",
        color: "#b2b2b2",
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        text: "YYYY",
        id: "dob_year"
    });
    $.__views.__alloyId1006.add($.__views.dob_year);
    $.__views.__alloyId1007 = Ti.UI.createLabel({
        top: 16,
        font: {
            fontFamily: "icomoon",
            fontSize: "6dp"
        },
        color: "#000",
        text: Alloy.Globals.icon.dropdownArrow,
        left: 70,
        id: "__alloyId1007"
    });
    $.__views.__alloyId1006.add($.__views.__alloyId1007);
    $.__views.__alloyId1008 = Ti.UI.createView({
        backgroundColor: "#a0a0a0",
        height: "2px",
        width: "28%",
        left: -12,
        right: "5%",
        top: 30,
        id: "__alloyId1008"
    });
    $.__views.__alloyId1006.add($.__views.__alloyId1008);
    $.__views.anniversary_lbl = Ti.UI.createLabel({
        left: "5%",
        top: 20,
        color: Alloy.Globals.labelTitleColor,
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        text: "ANNIVERSARY",
        id: "anniversary_lbl"
    });
    $.__views.myaccount_info_edit.add($.__views.anniversary_lbl);
    $.__views.__alloyId1009 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        top: 0,
        left: "5%",
        height: 40,
        layout: "horizontal",
        id: "__alloyId1009"
    });
    $.__views.myaccount_info_edit.add($.__views.__alloyId1009);
    $.__views.__alloyId1010 = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        left: "0%",
        id: "__alloyId1010"
    });
    $.__views.__alloyId1009.add($.__views.__alloyId1010);
    showDatePicker ? $.addListener($.__views.__alloyId1010, "click", showDatePicker) : __defers["$.__views.__alloyId1010!click!showDatePicker"] = true;
    $.__views.anniversary_date = Ti.UI.createLabel({
        top: 10,
        left: "0%",
        color: "#b2b2b2",
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        text: "DD",
        id: "anniversary_date"
    });
    $.__views.__alloyId1010.add($.__views.anniversary_date);
    $.__views.__alloyId1011 = Ti.UI.createLabel({
        top: 16,
        font: {
            fontFamily: "icomoon",
            fontSize: "6dp"
        },
        color: "#000",
        text: Alloy.Globals.icon.dropdownArrow,
        left: 70,
        id: "__alloyId1011"
    });
    $.__views.__alloyId1010.add($.__views.__alloyId1011);
    $.__views.__alloyId1012 = Ti.UI.createView({
        backgroundColor: "#a0a0a0",
        height: "2px",
        width: "28%",
        left: -12,
        right: "5%",
        top: 30,
        id: "__alloyId1012"
    });
    $.__views.__alloyId1010.add($.__views.__alloyId1012);
    $.__views.__alloyId1013 = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        left: "5%",
        id: "__alloyId1013"
    });
    $.__views.__alloyId1009.add($.__views.__alloyId1013);
    showDatePicker ? $.addListener($.__views.__alloyId1013, "click", showDatePicker) : __defers["$.__views.__alloyId1013!click!showDatePicker"] = true;
    $.__views.anniversary_month = Ti.UI.createLabel({
        top: 10,
        left: "0%",
        color: "#b2b2b2",
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        text: "MM",
        id: "anniversary_month"
    });
    $.__views.__alloyId1013.add($.__views.anniversary_month);
    $.__views.__alloyId1014 = Ti.UI.createLabel({
        top: 16,
        font: {
            fontFamily: "icomoon",
            fontSize: "6dp"
        },
        color: "#000",
        text: Alloy.Globals.icon.dropdownArrow,
        left: 70,
        id: "__alloyId1014"
    });
    $.__views.__alloyId1013.add($.__views.__alloyId1014);
    $.__views.__alloyId1015 = Ti.UI.createView({
        backgroundColor: "#a0a0a0",
        height: "2px",
        width: "28%",
        left: -12,
        right: "5%",
        top: 30,
        id: "__alloyId1015"
    });
    $.__views.__alloyId1013.add($.__views.__alloyId1015);
    $.__views.__alloyId1016 = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        left: "5%",
        id: "__alloyId1016"
    });
    $.__views.__alloyId1009.add($.__views.__alloyId1016);
    showDatePicker ? $.addListener($.__views.__alloyId1016, "click", showDatePicker) : __defers["$.__views.__alloyId1016!click!showDatePicker"] = true;
    $.__views.anniversary_year = Ti.UI.createLabel({
        top: 10,
        left: "0%",
        color: "#b2b2b2",
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        text: "YYYY",
        id: "anniversary_year"
    });
    $.__views.__alloyId1016.add($.__views.anniversary_year);
    $.__views.__alloyId1017 = Ti.UI.createLabel({
        top: 16,
        font: {
            fontFamily: "icomoon",
            fontSize: "6dp"
        },
        color: "#000",
        text: Alloy.Globals.icon.dropdownArrow,
        left: 70,
        id: "__alloyId1017"
    });
    $.__views.__alloyId1016.add($.__views.__alloyId1017);
    $.__views.__alloyId1018 = Ti.UI.createView({
        backgroundColor: "#a0a0a0",
        height: "2px",
        width: "28%",
        left: -12,
        right: "5%",
        top: 30,
        id: "__alloyId1018"
    });
    $.__views.__alloyId1016.add($.__views.__alloyId1018);
    $.__views.update_btn = Ti.UI.createLabel({
        top: 30,
        font: {
            fontFamily: "futura_medium_bt-webfont",
            fontSize: "16dp"
        },
        backgroundColor: "#231f20",
        color: "#fff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        width: 280,
        height: 50,
        text: "UPDATE",
        id: "update_btn"
    });
    $.__views.myaccount_info_edit.add($.__views.update_btn);
    updateAccountInfo ? $.addListener($.__views.update_btn, "click", updateAccountInfo) : __defers["$.__views.update_btn!click!updateAccountInfo"] = true;
    $.__views.cancel_btn = Ti.UI.createLabel({
        top: 5,
        color: Alloy.Globals.labelTitleColor,
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        height: 40,
        bottom: 20,
        text: "Cancel",
        id: "cancel_btn"
    });
    $.__views.myaccount_info_edit.add($.__views.cancel_btn);
    cancelAccountEdit ? $.addListener($.__views.cancel_btn, "click", cancelAccountEdit) : __defers["$.__views.cancel_btn!click!cancelAccountEdit"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var responseData = null;
    var isAddress = false;
    var _gender = "", deleteRow = null, _border = null, newCustomerInfoObj = {}, addressCount = 0, editAccountInfo = null;
    loadMyAccountInfo();
    $.myaccount_container.remove($.myaccount_info_edit);
    touchEffect.createTouchEffect($.editProfile_btn, "#000", "#e64e48");
    __defers["$.__views.myaccount_container!dblclick!hideKeyboard"] && $.addListener($.__views.myaccount_container, "dblclick", hideKeyboard);
    __defers["$.__views.editProfile_btn!click!openEditProfileScreen"] && $.addListener($.__views.editProfile_btn, "click", openEditProfileScreen);
    __defers["$.__views.addnewAdderss_btn!click!navigateToAddAddress"] && $.addListener($.__views.addnewAdderss_btn, "click", navigateToAddAddress);
    __defers["$.__views.male!touchstart!selectGender"] && $.addListener($.__views.male, "touchstart", selectGender);
    __defers["$.__views.radioText1!touchstart!selectGender"] && $.addListener($.__views.radioText1, "touchstart", selectGender);
    __defers["$.__views.female!touchstart!selectGender"] && $.addListener($.__views.female, "touchstart", selectGender);
    __defers["$.__views.radioText2!touchstart!selectGender"] && $.addListener($.__views.radioText2, "touchstart", selectGender);
    __defers["$.__views.other!touchstart!selectGender"] && $.addListener($.__views.other, "touchstart", selectGender);
    __defers["$.__views.radioText3!touchstart!selectGender"] && $.addListener($.__views.radioText3, "touchstart", selectGender);
    __defers["$.__views.fname_txt!focus!showBorder"] && $.addListener($.__views.fname_txt, "focus", showBorder);
    __defers["$.__views.fname_txt!blur!hideBorder"] && $.addListener($.__views.fname_txt, "blur", hideBorder);
    __defers["$.__views.lname_txt!focus!showBorder"] && $.addListener($.__views.lname_txt, "focus", showBorder);
    __defers["$.__views.lname_txt!blur!hideBorder"] && $.addListener($.__views.lname_txt, "blur", hideBorder);
    __defers["$.__views.email_txt!focus!showBorder"] && $.addListener($.__views.email_txt, "focus", showBorder);
    __defers["$.__views.email_txt!blur!hideBorder"] && $.addListener($.__views.email_txt, "blur", hideBorder);
    __defers["$.__views.number_txt!focus!showBorder"] && $.addListener($.__views.number_txt, "focus", showBorder);
    __defers["$.__views.number_txt!blur!hideBorder"] && $.addListener($.__views.number_txt, "blur", hideBorder);
    __defers["$.__views.changePassword_btn!click!showChangePassword"] && $.addListener($.__views.changePassword_btn, "click", showChangePassword);
    __defers["$.__views.change_password_txt!change!displayPasswordPreview"] && $.addListener($.__views.change_password_txt, "change", displayPasswordPreview);
    __defers["$.__views.previewPassword!click!showPassword"] && $.addListener($.__views.previewPassword, "click", showPassword);
    __defers["$.__views.confirm_password_txt!change!displayPasswordPreview"] && $.addListener($.__views.confirm_password_txt, "change", displayPasswordPreview);
    __defers["$.__views.previewConfirmPassword!click!showPassword"] && $.addListener($.__views.previewConfirmPassword, "click", showPassword);
    __defers["$.__views.__alloyId1000!click!showDatePicker"] && $.addListener($.__views.__alloyId1000, "click", showDatePicker);
    __defers["$.__views.__alloyId1003!click!showDatePicker"] && $.addListener($.__views.__alloyId1003, "click", showDatePicker);
    __defers["$.__views.__alloyId1006!click!showDatePicker"] && $.addListener($.__views.__alloyId1006, "click", showDatePicker);
    __defers["$.__views.__alloyId1010!click!showDatePicker"] && $.addListener($.__views.__alloyId1010, "click", showDatePicker);
    __defers["$.__views.__alloyId1013!click!showDatePicker"] && $.addListener($.__views.__alloyId1013, "click", showDatePicker);
    __defers["$.__views.__alloyId1016!click!showDatePicker"] && $.addListener($.__views.__alloyId1016, "click", showDatePicker);
    __defers["$.__views.update_btn!click!updateAccountInfo"] && $.addListener($.__views.update_btn, "click", updateAccountInfo);
    __defers["$.__views.cancel_btn!click!cancelAccountEdit"] && $.addListener($.__views.cancel_btn, "click", cancelAccountEdit);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;