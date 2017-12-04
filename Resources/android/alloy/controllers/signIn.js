function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
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
    function showDatePicker(e) {
        var obj = {};
        e.source.dob && (obj = {
            day: $.dob_date,
            month: $.dob_month,
            year: $.dob_year,
            setDate: true
        });
        var picker = Alloy.createController("pickerTemplate", obj).getView();
        $.register_container.add(picker);
    }
    function toggleEffect(e) {
        $.seperator1.backgroundColor = "#A1A39E";
        $.seperator2.backgroundColor = "#A1A39E";
        $.seperator3.backgroundColor = "#A1A39E";
        $.seperator4.backgroundColor = "#A1A39E";
        switch (e.source.id) {
          case "otp_no1":
            $.seperator1.backgroundColor = "#4d4f4a";
            break;

          case "otp_no2":
            $.seperator2.backgroundColor = "#4d4f4a";
            break;

          case "otp_no3":
            $.seperator3.backgroundColor = "#4d4f4a";
            break;

          case "otp_no4":
            $.seperator4.backgroundColor = "#4d4f4a";
        }
    }
    function showForgotPasswordScreen(e) {
        $.main_login_container.visible = false;
        $.forgot_password_container.visible = true;
        emptyTextFieldValues();
    }
    function toggelTextField(e) {
        $.register_first_seperator.backgroundColor = "transparent";
        $.register_last_seperator.backgroundColor = "transparent";
        $.register_email_seperator.backgroundColor = "transparent";
        $.register_phone_seperator.backgroundColor = "transparent";
        $.register_password_seperator.backgroundColor = "transparent";
        switch (e.source.id) {
          case "register_password_txt":
            $.register_password_seperator.backgroundColor = "#A1A39E";
            break;

          case "register_phone_txt":
            $.register_phone_seperator.backgroundColor = "#A1A39E";
            break;

          case "register_email_txt":
            $.register_email_seperator.backgroundColor = "#A1A39E";
            break;

          case "register_last_txt":
            $.register_last_seperator.backgroundColor = "#A1A39E";
            break;

          case "register_first_txt":
            $.register_first_seperator.backgroundColor = "#A1A39E";
        }
    }
    function GoToBack() {
        if (!isLoader) {
            emptyTextFieldValues();
            if ($.forgot_password_container.getVisible()) {
                $.main_login_container.setVisible(true);
                $.forgot_password_container.setVisible(false);
            } else if ($.guest_container.getVisible()) {
                $.forgot_password_container.setVisible(true);
                $.guest_container.setVisible(false);
            } else {
                if ($.otp_container.getVisible()) return;
                if ($.reset_password_container.getVisible()) {
                    $.forgot_password_container.setVisible(true);
                    $.reset_password_container.setVisible(false);
                } else if ($.register_container.getVisible()) {
                    $.main_login_container.setVisible(true);
                    $.register_container.setVisible(false);
                } else $.main_login_container.getVisible();
            }
        }
    }
    function navigatedToForgotPassword() {
        $.forgot_password_container.setVisible(true);
        $.guest_container.setVisible(false);
    }
    function registerUser() {
        var email = {
            value: $.register_email_txt.getValue().toLowerCase()
        };
        if (validators.RegularExpressionName($.register_first_txt)) if (validators.RegularExpressionName($.register_last_txt)) if (validators.RegularExpressionEmail(email)) if ("#33000000" === $.male.getColor() && "#33000000" === $.female.getColor() && "#33000000" === $.other.getColor()) showAlert($.register_container, "Please select gender"); else if (void 0 == $.dob_date.date || "DD" == $.dob_date.text) showAlert($.register_container, "Please select DOB"); else if (validators.RegularExpressionPassword($.register_password_txt)) {
            var _gender = null;
            $.male.getColor() === Alloy.Globals.labelTitleColor ? _gender = "1" : $.female.getColor() === Alloy.Globals.labelTitleColor ? _gender = "2" : $.other.getColor() === Alloy.Globals.labelTitleColor && (_gender = "3");
            var url = Alloy.Globals.commonUrl.register;
            var params = {
                firstname: $.register_first_txt.getValue(),
                lastname: $.register_last_txt.getValue(),
                email: $.register_email_txt.getValue(),
                password: $.register_password_txt.getValue(),
                confirm_password: $.register_password_txt.getValue(),
                contact_number: $.register_phone_txt.getValue(),
                dob: void 0 == $.dob_date.date ? "" : moment($.dob_date.date).format("YYYY-MM-DD"),
                gender: _gender
            };
            var requestParams = JSON.stringify(params);
            showFullLoader($.register_container);
            isLoader = true;
            Alloy.Globals.webServiceCall(url, requestParams, registerUserSuccessCallback, registerUserErrorCallback, "POST", $.signIn);
        } else {
            showAlert($.register_container, "Enter a vaild Password");
            $.register_password_txt.focus();
        } else {
            showAlert($.register_container, "Enter a vaild email id");
            $.register_email_txt.focus();
        } else {
            showAlert($.register_container, "Enter a vaild last name");
            $.register_last_txt.focus();
        } else {
            showAlert($.register_container, "Enter a valid first name");
            $.register_first_txt.focus();
        }
    }
    function registerUserSuccessCallback(e) {
        hideFullLoader();
        isLoader = false;
        try {
            var responseData = e;
            showAlert($.register_container, responseData.message);
            Ti.App.Properties.setString("email", responseData.data.email);
            $.signin_email_txt.setValue(responseData.data.email);
            $.signin_password_txt.setValue("");
            setTimeout(function() {
                $.signin_email_txt.setValue($.register_email_txt.getValue());
                $.signin_password_txt.setValue($.register_password_txt.getValue());
                loginUser();
            }, 500);
        } catch (ex) {
            Ti.API.info(ex.message);
        }
    }
    function registerUserErrorCallback(e) {
        hideFullLoader();
        isLoader = false;
        showAlert($.register_container, e.message);
    }
    function loginUser() {
        var pwd = $.signin_password_txt.getValue().toString();
        var email = {
            value: $.signin_email_txt.getValue().toLowerCase()
        };
        if (validators.RegularExpressionEmail_Mobile(email)) if ("" === pwd.trim()) {
            showAlert($.main_login_container, "Please enter a password");
            $.signin_password_txt.focus();
        } else {
            var url = Alloy.Globals.commonUrl.login;
            var params = {
                email: $.signin_email_txt.getValue(),
                password: $.signin_password_txt.getValue()
            };
            var requestParams = JSON.stringify(params);
            showFullLoader($.main_login_container);
            isLoader = true;
            Alloy.Globals.webServiceCall(url, requestParams, loginUserSuccessCallback, loginUserErrorCallback, "POST", $.signIn);
        } else {
            showAlert($.main_login_container, "Please enter a valid email Id / mobile number");
            $.signin_email_txt.focus();
        }
    }
    function loginUserSuccessCallback(e) {
        isLoader = false;
        try {
            var responseData = e;
            Ti.App.Properties.setString("firstname", responseData.data.firstname);
            Ti.App.Properties.setString("lastname", responseData.data.lastname);
            Ti.App.Properties.setString("email", responseData.data.email);
            Ti.App.Properties.setString("contact_number", responseData.data.contact_number);
            Ti.App.Properties.setString("gender", responseData.data.gender);
            Ti.App.Properties.setString("image", responseData.data.image);
            Ti.App.Properties.setString("access_token", responseData.data.accesstoken);
            Ti.App.Properties.setString("dob", responseData.data.dob);
            Ti.App.Properties.setString("quote_id", responseData.data.quoteId);
            Ti.App.Properties.setString("cartCount", responseData.data.cart_count);
            Ti.App.Properties.setString("shortListCount", responseData.data.shortlist_count);
            Ti.App.Properties.setString("GaCustomerId", responseData.data.entity_id);
            Alloy.Globals.popWindowInNav();
            emptyTextFieldValues();
            $.signIn.close();
            Alloy.Globals.checkLogin();
            if (!isNullVal(args.listObject)) {
                Ti.API.info("call add to cart");
                args.listViewReference(args.listObject);
            }
        } catch (ex) {
            Ti.API.info("login error---->" + ex.message);
        }
        hideFullLoader();
    }
    function loginUserErrorCallback(e) {
        Alloy.Globals.fb.logout();
        Alloy.Globals.googleAuth.deAuthorize(function(e) {}, $.signIn);
        hideFullLoader();
        showAlert($.signIn, e.message);
        isLoader = false;
    }
    function showPassword() {
        if ($.register_password_txt.getPasswordMask()) {
            $.register_password_txt.setPasswordMask(false);
            $.showpassword_lbl.setColor("#4A4A4A");
        } else {
            $.register_password_txt.setPasswordMask(true);
            $.showpassword_lbl.setColor("#000");
        }
    }
    function forgetPassword() {
        var requestMethod = Alloy.Globals.commonUrl.forgetPassword;
        var param = {};
        if (isResendOTP) {
            param = {
                contact_number: contact_number
            };
            isEmail = false;
            isMobile = true;
            showFullLoader($.signIn);
            isLoader = true;
            var requestParams = JSON.stringify(param);
            Alloy.Globals.webServiceCall(requestMethod, requestParams, forgetPasswordSuccessCallback, forgetPasswordErrorCallback, "POST", $.signIn);
        } else if ("" === $.signin_forgot_txt.getValue().trim() && "" === $.signin_numbar_txt.getValue().trim()) {
            showAlert($.signIn, "Please enter a valid email id or mobile number");
            $.signin_forgot_txt.setValue("");
            $.signin_numbar_txt.setValue("");
        } else {
            if ("" != $.signin_forgot_txt.getValue()) if (validators.RegularExpressionEmail($.signin_forgot_txt)) {
                param = {
                    email: $.signin_forgot_txt.getValue()
                };
                isEmail = true;
                isMobile = false;
            } else {
                showAlert($.signIn, "Please enter a valid email id or mobile number");
                $.signin_forgot_txt.focus();
            }
            if ("" != $.signin_numbar_txt.getValue()) if (validators.RegularExpressionMobileNumber($.signin_numbar_txt)) {
                param = {
                    contact_number: $.signin_numbar_txt.getValue()
                };
                isEmail = false;
                isMobile = true;
                contact_number = $.signin_numbar_txt.getValue();
            } else {
                showAlert($.signIn, "Please enter a valid email id or mobile number");
                $.signin_numbar_txt.focus();
            }
            showFullLoader($.signIn);
            isLoader = true;
            var requestParams = JSON.stringify(param);
            Alloy.Globals.webServiceCall(requestMethod, requestParams, forgetPasswordSuccessCallback, forgetPasswordErrorCallback, "POST", $.signIn);
        }
    }
    function forgetPasswordSuccessCallback(response) {
        hideFullLoader();
        isLoader = false;
        emptyTextFieldValues();
        if (isEmail && !isMobile) {
            Ti.API.info("into isEmail condition");
            $.restMessageId1.show();
            setTimeout(function() {
                $.restMessageId1.hide();
            }, 5e3);
        } else if (!isEmail && isMobile) {
            customer_id = response.data.customer_id;
            if (isResendOTP) {
                isResendOTP = false;
                $.otp_no1.focus();
                setTimeout(function() {
                    $.otpMessageId.hide();
                }, 5e3);
            } else {
                $.otp_container.setVisible(true);
                $.otp_no1.focus();
                setTimeout(function() {
                    $.otpMessageId.hide();
                }, 5e3);
                $.forgot_password_container.setVisible(false);
            }
        }
    }
    function forgetPasswordErrorCallback(response) {
        isLoader = false;
        Ti.API.info("forgetPassword error Response-->" + JSON.stringify(response));
        hideFullLoader();
        showAlert($.signIn, response.message);
    }
    function otpConfirmation() {
        if (0 === $.otp_no1.getValue().length) {
            showAlert($.signIn, "Please enter a OTP");
            $.otp_no1.focus();
        } else if (0 === $.otp_no2.getValue().length) {
            showAlert($.signIn, "Please enter a OTP");
            $.otp_no1.focus();
        } else if (0 === $.otp_no3.getValue().length) {
            showAlert($.signIn, "Please enter a OTP");
            $.otp_no3.focus();
        } else if (0 === $.otp_no4.getValue().length) {
            showAlert($.signIn, "Please enter a OTP");
            $.otp_no4.focus();
        } else {
            var otpValue = $.otp_no1.getValue() + $.otp_no2.getValue() + $.otp_no3.getValue() + $.otp_no4.getValue();
            var param = {
                otp: otpValue,
                customer_id: customer_id
            };
            var requestMethod = Alloy.Globals.commonUrl.otpConfirmation;
            var requestParams = JSON.stringify(param);
            showFullLoader($.signIn);
            isLoader = true;
            Alloy.Globals.webServiceCall(requestMethod, requestParams, otpConfirmationSuccessCallback, otpConfirmationErrorCallback, "POST", $.signIn);
        }
    }
    function otpConfirmationSuccessCallback(response) {
        hideFullLoader();
        isLoader = false;
        if ("true" === response.data.otp_success) {
            emptyTextFieldValues();
            $.otp_container.setVisible(false);
            $.reset_password_container.setVisible(true);
        } else showAlert($.signIn, response.message);
    }
    function otpConfirmationErrorCallback(response) {
        hideFullLoader();
        isLoader = false;
        showAlert($.signIn, response.message);
    }
    function setNewPassword() {
        if (validators.RegularExpressionPassword($.signin_resetpassword_txt)) if ($.signin_resetconfpassword_txt.getValue() != $.signin_resetpassword_txt.getValue()) {
            showAlert($.signIn, "Password mismatch.Please enter the same password both the fields");
            $.signin_resetconfpassword_txt.focus();
        } else {
            var requestMethod = Alloy.Globals.commonUrl.setNewPassword;
            var param = {
                new_password: $.signin_resetpassword_txt.getValue(),
                confirm_password: $.signin_resetconfpassword_txt.getValue(),
                customer_id: customer_id
            };
            var requestParams = JSON.stringify(param);
            showFullLoader($.signIn);
            isLoader = true;
            Alloy.Globals.webServiceCall(requestMethod, requestParams, setNewPasswordSuccessCallback, setNewPasswordErrorCallback, "POST", $.signIn);
        } else {
            showAlert($.signIn, "Please enter password minimum 7 characters including atleast 1 number");
            $.signin_resetpassword_txt.focus();
        }
    }
    function setNewPasswordSuccessCallback(response) {
        hideFullLoader();
        isLoader = false;
        showAlert($.signIn, response.message);
        emptyTextFieldValues();
        $.reset_password_container.setVisible(false);
        $.main_login_container.setVisible(true);
    }
    function setNewPasswordErrorCallback(response) {
        hideFullLoader();
        isLoader = false;
        showAlert($.signIn, response.message);
    }
    function resendOTP() {
        isResendOTP = true;
        $.otp_no1.focus();
        forgetPassword();
    }
    function emptyTextFieldValues() {
        $.signin_email_txt.setValue("");
        $.signin_password_txt.setValue("");
        $.signin_forgot_txt.setValue("");
        $.signin_numbar_txt.setValue("");
        $.otp_no1.setValue("");
        $.otp_no2.setValue("");
        $.otp_no3.setValue("");
        $.otp_no4.setValue("");
        $.signin_resetpassword_txt.setValue("");
        $.signin_resetconfpassword_txt.setValue("");
        $.register_first_txt.setValue("");
        $.register_last_txt.setValue("");
        $.register_email_txt.setValue("");
        $.register_phone_txt.setValue("");
        $.register_password_txt.setValue("");
        $.otpMessageId.show();
        $.restMessageId.show();
        $.male.color = "#33000000";
        $.female.color = "#33000000";
        $.other.color = "#33000000";
        $.dob_date.setText("DD");
        $.dob_month.setText("MM");
        $.dob_year.setText("YYYY");
    }
    function blurAllTxtField() {
        $.signin_email_txt.blur();
        $.signin_password_txt.blur();
        $.signin_forgot_txt.blur();
        $.signin_numbar_txt.blur();
        $.otp_no1.blur();
        $.otp_no2.blur();
        $.otp_no3.blur();
        $.otp_no4.blur();
        $.signin_resetpassword_txt.blur();
        $.signin_resetconfpassword_txt.blur();
        $.register_first_txt.blur();
        $.register_last_txt.blur();
        $.register_email_txt.blur();
        $.register_phone_txt.blur();
        $.register_password_txt.blur();
    }
    function hideKeyboard() {
        Ti.UI.Android.hideSoftKeyboard();
    }
    function facebookLogin() {
        Alloy.Globals.fb.setPermissions("email", "user_about_me", "public_profile", "user_birthday");
        Alloy.Globals.fb.initialize();
        if (Alloy.Globals.fb.loggedIn) Alloy.Globals.fb.requestWithGraphPath("/me/", {
            fields: "email,first_name,last_name,birthday,gender,age_range "
        }, "GET", function(e) {
            if (e.success) Ti.API.info("user get successfully facebook login" + JSON.stringify(e)); else if (e.error) {
                Ti.API.info("fb request cancel");
                alert(e.error);
            } else Ti.API.info("fb request cancel");
        }); else {
            Ti.API.info("please invoke login");
            Alloy.Globals.fb.authorize();
        }
    }
    function facebookLoginSuccessCallback(result) {
        var parsedData = JSON.parse(result);
        var requestMethod = Alloy.Globals.commonUrl.social_login;
        var fbgender = "";
        isNullVal(parsedData.gender) || (fbgender = "male" == parsedData.gender ? 1 : "female" == parsedData.gender ? 2 : 3);
        var param = {
            email: parsedData.email,
            social_type: "fb",
            social_login_id: parsedData.id,
            firstname: parsedData.first_name,
            lastname: parsedData.last_name,
            birthday: parsedData.birthday || "",
            gender: fbgender
        };
        var requestParams = JSON.stringify(param);
        Alloy.Globals.webServiceCall(requestMethod, requestParams, loginUserSuccessCallback, loginUserErrorCallback, "POST", $.signIn);
    }
    function googleGetEmail() {
        var xhrList = Ti.Network.createHTTPClient({
            onload: function(e) {
                try {
                    var resp = JSON.parse(this.responseText);
                    Ti.API.info("resp = " + JSON.stringify(resp));
                    var requestMethod = Alloy.Globals.commonUrl.social_login;
                    var gender = "";
                    isNullVal(resp.gender) || (gender = "male" == resp.gender ? 1 : "female" == resp.gender ? 2 : 3);
                    var param = {
                        email: resp.email,
                        social_type: "g",
                        social_login_id: resp.id,
                        firstname: resp.given_name,
                        lastname: resp.family_name,
                        birthday: "",
                        gender: gender
                    };
                    var requestParams = JSON.stringify(param);
                    Alloy.Globals.webServiceCall(requestMethod, requestParams, loginUserSuccessCallback, loginUserErrorCallback, "POST", $.signIn);
                } catch (e) {
                    Titanium.UI.createAlertDialog({
                        title: "Error",
                        message: "Can't load tasks for list"
                    });
                    Ti.API.error("RESPONSE: " + JSON.stringify(e));
                }
            },
            onerror: function(e) {
                Titanium.UI.createAlertDialog({
                    title: "Error",
                    message: "Can't load tasklists"
                });
                Ti.API.error("HTTP: " + JSON.stringify(e));
            },
            timeout: 5e3
        });
        showFullLoader($.signIn);
        xhrList.open("GET", "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" + googleAuth.getAccessToken());
        xhrList.send();
    }
    function updateCount() {
        blurAllTxtField();
    }
    function clearMemory() {
        $.removeListener();
        $.signIn.remove($.main_login_container);
        $.signIn.remove($.forgot_password_container);
        $.signIn.remove($.guest_container);
        $.signIn.remove($.otp_container);
        $.signIn.remove($.reset_password_container);
        $.signIn.remove($.register_container);
        $.main_login_container.removeAllChildren();
        $.forgot_password_container.removeAllChildren();
        $.guest_container.removeAllChildren();
        $.otp_container.removeAllChildren();
        $.reset_password_container.removeAllChildren();
        $.register_container.removeAllChildren();
        isEmail = null;
        isMobile = null;
        isResendOTP = null;
        customer_id = null;
        isLoader = null;
        contact_number = null;
        first = null;
        excellent = null;
        NameRegEx = null;
        name_number = null;
        $.destroy();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "signIn";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.signIn = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        id: "signIn"
    });
    $.__views.signIn && $.addTopLevelView($.__views.signIn);
    GoToBack ? $.addListener($.__views.signIn, "android:back", GoToBack) : __defers["$.__views.signIn!android:back!GoToBack"] = true;
    hideKeyboard ? $.addListener($.__views.signIn, "touchstart", hideKeyboard) : __defers["$.__views.signIn!touchstart!hideKeyboard"] = true;
    updateCount ? $.addListener($.__views.signIn, "open", updateCount) : __defers["$.__views.signIn!open!updateCount"] = true;
    clearMemory ? $.addListener($.__views.signIn, "close", clearMemory) : __defers["$.__views.signIn!close!clearMemory"] = true;
    $.__views.__alloyId1504 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        image: "/images/MainBG.png",
        id: "__alloyId1504"
    });
    $.__views.signIn.add($.__views.__alloyId1504);
    $.__views.main_login_container = Ti.UI.createScrollView({
        scrollType: "vertical",
        id: "main_login_container"
    });
    $.__views.signIn.add($.__views.main_login_container);
    $.__views.super_signin_container = Ti.UI.createView({
        width: "88%",
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "super_signin_container",
        borderColor: "transparent",
        bottom: 5
    });
    $.__views.main_login_container.add($.__views.super_signin_container);
    $.__views.__alloyId1505 = Ti.UI.createImageView({
        width: "150dp",
        height: "50dp",
        image: "/images/DDecorLogo.png",
        top: "55dp",
        id: "__alloyId1505"
    });
    $.__views.super_signin_container.add($.__views.__alloyId1505);
    $.__views.signin_email_txt = Ti.UI.createTextField({
        keyboardType: Ti.UI.KEYBOARD_EMAIL,
        height: "40dp",
        width: "98%",
        backgroundColor: "transparent",
        color: "#4d4f4a",
        hintTextColor: "#a0a0a0",
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        top: "50dp",
        hintText: "MOBILE / EMAIL",
        id: "signin_email_txt",
        type: "TextField",
        value: ""
    });
    $.__views.super_signin_container.add($.__views.signin_email_txt);
    $.__views.email_seperator = Ti.UI.createView({
        top: 0,
        height: "0.5dp",
        width: Titanium.UI.FILL,
        backgroundColor: "#A1A39E",
        id: "email_seperator"
    });
    $.__views.super_signin_container.add($.__views.email_seperator);
    $.__views.signin_password_txt = Ti.UI.createTextField({
        height: "40dp",
        width: "98%",
        backgroundColor: "transparent",
        color: "#4d4f4a",
        hintTextColor: "#a0a0a0",
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        top: "10dp",
        hintText: "PASSWORD",
        passwordMask: true,
        id: "signin_password_txt",
        type: "TextField",
        value: ""
    });
    $.__views.super_signin_container.add($.__views.signin_password_txt);
    $.__views.password_seperator = Ti.UI.createView({
        top: 0,
        height: "0.5dp",
        width: Titanium.UI.FILL,
        backgroundColor: "#A1A39E",
        id: "password_seperator"
    });
    $.__views.super_signin_container.add($.__views.password_seperator);
    $.__views.signin_forgot_lbl = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "12sp"
        },
        text: "FORGOT PASSWORD?",
        color: "#000000",
        right: "1%",
        top: "15dp",
        id: "signin_forgot_lbl"
    });
    $.__views.super_signin_container.add($.__views.signin_forgot_lbl);
    $.__views.signin_login_lbl = Ti.UI.createLabel({
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        top: "30dp",
        width: "80%",
        height: "40dp",
        color: "#ffffff",
        backgroundColor: "#4d000000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "signin_login_lbl",
        text: "LOGIN"
    });
    $.__views.super_signin_container.add($.__views.signin_login_lbl);
    $.__views.signin_register_lbl = Ti.UI.createLabel({
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        top: "12dp",
        width: "80%",
        height: "40dp",
        color: "#8b8b8c",
        backgroundColor: "transparent",
        borderColor: "#99000000",
        borderWidth: "0.5dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "signin_register_lbl",
        text: "SIGN UP"
    });
    $.__views.super_signin_container.add($.__views.signin_register_lbl);
    $.__views.social_login_container = Ti.UI.createView({
        top: "80dp",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        id: "social_login_container",
        bottom: "10dp"
    });
    $.__views.super_signin_container.add($.__views.social_login_container);
    $.__views.__alloyId1506 = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.FILL,
        layout: "horizontal",
        id: "__alloyId1506"
    });
    $.__views.social_login_container.add($.__views.__alloyId1506);
    $.__views.signin_or_lbl = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "11sp"
        },
        text: "OR LOGIN VIA ",
        color: "#000000",
        id: "signin_or_lbl"
    });
    $.__views.__alloyId1506.add($.__views.signin_or_lbl);
    $.__views.signin_facebook_lbl = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "20dp"
        },
        left: "5dp",
        height: "36dp",
        width: "36dp",
        borderWidth: .5,
        borderRadius: "18dp",
        backgroundColor: "#4765ac",
        text: Alloy.Globals.icon.facebookIcon,
        color: "white",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "signin_facebook_lbl"
    });
    $.__views.__alloyId1506.add($.__views.signin_facebook_lbl);
    $.__views.signin_google_lbl = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "19dp"
        },
        left: "5dp",
        height: "36dp",
        width: "36dp",
        borderRadius: "18dp",
        borderWidth: .5,
        backgroundColor: "#e04a31",
        text: Alloy.Globals.icon.googleIcon,
        color: "white",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "signin_google_lbl"
    });
    $.__views.__alloyId1506.add($.__views.signin_google_lbl);
    $.__views.forgot_password_container = Ti.UI.createView({
        layout: "vertical",
        zIndex: "100",
        visible: false,
        id: "forgot_password_container"
    });
    $.__views.signIn.add($.__views.forgot_password_container);
    $.__views.__alloyId1507 = Ti.UI.createScrollView({
        scrollType: "vertical",
        id: "__alloyId1507"
    });
    $.__views.forgot_password_container.add($.__views.__alloyId1507);
    $.__views.restMessageId1 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: "25dp",
        backgroundColor: "#000000",
        color: "#e65e48",
        font: {
            fontSize: "12dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "A LINK HAS BEEN SENT TO YOUR EMAIL TO RESET PASSWORD",
        id: "restMessageId1",
        top: 0,
        visible: false
    });
    $.__views.__alloyId1507.add($.__views.restMessageId1);
    $.__views.sub_forgot_container = Ti.UI.createView({
        width: "88%",
        height: Titanium.UI.SIZE,
        layout: "vertical",
        top: "60dp",
        id: "sub_forgot_container"
    });
    $.__views.__alloyId1507.add($.__views.sub_forgot_container);
    $.__views.__alloyId1508 = Ti.UI.createImageView({
        width: "150dp",
        height: "50dp",
        image: "/images/DDecorLogo.png",
        top: "10dp",
        id: "__alloyId1508"
    });
    $.__views.sub_forgot_container.add($.__views.__alloyId1508);
    $.__views.signin_forgot_txt = Ti.UI.createTextField({
        keyboardType: Ti.UI.KEYBOARD_EMAIL,
        height: "40dp",
        width: "98%",
        backgroundColor: "transparent",
        color: "#4d4f4a",
        hintTextColor: "#a0a0a0",
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        top: "50dp",
        hintText: "EMAIL",
        id: "signin_forgot_txt",
        type: "TextField"
    });
    $.__views.sub_forgot_container.add($.__views.signin_forgot_txt);
    $.__views.forgot_email_seperator = Ti.UI.createView({
        top: 0,
        height: "0.5dp",
        width: Titanium.UI.FILL,
        backgroundColor: "#A1A39E",
        id: "forgot_email_seperator"
    });
    $.__views.sub_forgot_container.add($.__views.forgot_email_seperator);
    $.__views.__alloyId1509 = Ti.UI.createLabel({
        top: "28dp",
        text: "OR",
        font: {
            fontSize: "12sp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#000000",
        id: "__alloyId1509"
    });
    $.__views.sub_forgot_container.add($.__views.__alloyId1509);
    $.__views.signin_numbar_txt = Ti.UI.createTextField({
        keyboardType: Titanium.UI.KEYBOARD_PHONE_PAD,
        height: "40dp",
        width: "98%",
        backgroundColor: "transparent",
        color: "#4d4f4a",
        hintTextColor: "#a0a0a0",
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        top: "12dp",
        hintText: "NUMBER",
        maxLength: 10,
        id: "signin_numbar_txt",
        type: "TextField"
    });
    $.__views.sub_forgot_container.add($.__views.signin_numbar_txt);
    $.__views.number_seperator = Ti.UI.createView({
        top: 0,
        height: "0.5dp",
        width: Titanium.UI.FILL,
        backgroundColor: "#A1A39E",
        id: "number_seperator"
    });
    $.__views.sub_forgot_container.add($.__views.number_seperator);
    $.__views.forgot_submit_lbl = Ti.UI.createLabel({
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        top: "30dp",
        width: "80%",
        height: "40dp",
        color: "#ffffff",
        backgroundColor: "#4d000000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "forgot_submit_lbl",
        text: "SUBMIT"
    });
    $.__views.sub_forgot_container.add($.__views.forgot_submit_lbl);
    forgetPassword ? $.addListener($.__views.forgot_submit_lbl, "click", forgetPassword) : __defers["$.__views.forgot_submit_lbl!click!forgetPassword"] = true;
    $.__views.forgot_cancel_lbl = Ti.UI.createLabel({
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        top: "12dp",
        width: "80%",
        height: "40dp",
        color: "#8b8b8c",
        backgroundColor: "transparent",
        borderColor: "#99000000",
        borderWidth: "0.5dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "forgot_cancel_lbl",
        text: "CANCEL",
        bottom: "10dp"
    });
    $.__views.sub_forgot_container.add($.__views.forgot_cancel_lbl);
    $.__views.guest_container = Ti.UI.createView({
        layout: "vertical",
        zIndex: "110",
        visible: false,
        id: "guest_container"
    });
    $.__views.signIn.add($.__views.guest_container);
    $.__views.__alloyId1510 = Ti.UI.createScrollView({
        scrollType: "vertical",
        id: "__alloyId1510"
    });
    $.__views.guest_container.add($.__views.__alloyId1510);
    $.__views.restMessageId = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        top: 0,
        height: "25dp",
        backgroundColor: "#000000",
        color: "#e65e48",
        font: {
            fontSize: "12dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "A LINK HAS BEEN SENT TO YOUR EMAIL TO RESET PASSWORD",
        id: "restMessageId"
    });
    $.__views.__alloyId1510.add($.__views.restMessageId);
    $.__views.sub_forgot_container = Ti.UI.createView({
        width: "88%",
        height: Titanium.UI.SIZE,
        layout: "vertical",
        top: "70dp",
        id: "sub_forgot_container"
    });
    $.__views.__alloyId1510.add($.__views.sub_forgot_container);
    $.__views.__alloyId1511 = Ti.UI.createImageView({
        width: "150dp",
        height: "50dp",
        image: "/images/DDecorLogo.png",
        id: "__alloyId1511"
    });
    $.__views.sub_forgot_container.add($.__views.__alloyId1511);
    $.__views.__alloyId1512 = Ti.UI.createLabel({
        top: "100dp",
        font: {
            fontSize: "12sp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#000000",
        text: "MEANWHILE YOU CAN",
        id: "__alloyId1512"
    });
    $.__views.sub_forgot_container.add($.__views.__alloyId1512);
    $.__views.continue_guest_lbl = Ti.UI.createLabel({
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        top: "20dp",
        width: "80%",
        height: "40dp",
        color: "white",
        backgroundColor: "#4d000000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "continue_guest_lbl",
        text: "CONTINUE AS GUEST"
    });
    $.__views.sub_forgot_container.add($.__views.continue_guest_lbl);
    $.__views.guest_cancel_lbl = Ti.UI.createLabel({
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        top: "12dp",
        width: "80%",
        height: "40dp",
        color: "#8b8b8c",
        backgroundColor: "transparent",
        borderColor: "#99000000",
        borderWidth: "0.5dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "guest_cancel_lbl",
        text: "CANCEL"
    });
    $.__views.sub_forgot_container.add($.__views.guest_cancel_lbl);
    $.__views.otp_container = Ti.UI.createView({
        layout: "vertical",
        zIndex: "120",
        visible: false,
        id: "otp_container"
    });
    $.__views.signIn.add($.__views.otp_container);
    $.__views.__alloyId1513 = Ti.UI.createScrollView({
        scrollType: "vertical",
        id: "__alloyId1513"
    });
    $.__views.otp_container.add($.__views.__alloyId1513);
    $.__views.otpMessageId = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        top: 0,
        height: "25dp",
        backgroundColor: "#000000",
        color: "#e65e48",
        font: {
            fontSize: "12dp"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "WE HAVE SENT AN OTP TO YOUR REGISTERED MOBILE NUMBER",
        id: "otpMessageId"
    });
    $.__views.__alloyId1513.add($.__views.otpMessageId);
    $.__views.sub_forgot_container = Ti.UI.createView({
        width: "88%",
        height: Titanium.UI.SIZE,
        layout: "vertical",
        top: "70dp",
        id: "sub_forgot_container"
    });
    $.__views.__alloyId1513.add($.__views.sub_forgot_container);
    $.__views.__alloyId1514 = Ti.UI.createImageView({
        width: "150dp",
        height: "50dp",
        image: "/images/DDecorLogo.png",
        id: "__alloyId1514"
    });
    $.__views.sub_forgot_container.add($.__views.__alloyId1514);
    $.__views.__alloyId1515 = Ti.UI.createLabel({
        top: "50dp",
        font: {
            fontSize: "12sp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#000000",
        text: "PLEASE ENTER OTP",
        id: "__alloyId1515"
    });
    $.__views.sub_forgot_container.add($.__views.__alloyId1515);
    $.__views.__alloyId1516 = Ti.UI.createView({
        layout: "horizontal",
        top: "40dp",
        height: "50dp",
        id: "__alloyId1516"
    });
    $.__views.sub_forgot_container.add($.__views.__alloyId1516);
    $.__views.__alloyId1517 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        layout: "vertical",
        width: "20%",
        left: "4%",
        id: "__alloyId1517"
    });
    $.__views.__alloyId1516.add($.__views.__alloyId1517);
    $.__views.otp_no1 = Ti.UI.createTextField({
        width: Titanium.UI.FILL,
        keyboardType: Titanium.UI.KEYBOARD_PHONE_PAD,
        backgroundColor: "transparent",
        height: "48dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "#4d4f4a",
        maxLength: "1",
        passwordMask: true,
        font: {
            fontSize: "15sp"
        },
        id: "otp_no1"
    });
    $.__views.__alloyId1517.add($.__views.otp_no1);
    $.__views.seperator1 = Ti.UI.createView({
        top: 0,
        height: "1dp",
        width: Titanium.UI.FILL,
        backgroundColor: "#A1A39E",
        id: "seperator1"
    });
    $.__views.__alloyId1517.add($.__views.seperator1);
    $.__views.__alloyId1518 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        layout: "vertical",
        width: "20%",
        left: "4%",
        id: "__alloyId1518"
    });
    $.__views.__alloyId1516.add($.__views.__alloyId1518);
    $.__views.otp_no2 = Ti.UI.createTextField({
        width: Titanium.UI.FILL,
        keyboardType: Titanium.UI.KEYBOARD_PHONE_PAD,
        backgroundColor: "transparent",
        height: "48dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "#4d4f4a",
        maxLength: "1",
        passwordMask: true,
        font: {
            fontSize: "15sp"
        },
        id: "otp_no2"
    });
    $.__views.__alloyId1518.add($.__views.otp_no2);
    $.__views.seperator2 = Ti.UI.createView({
        top: 0,
        height: "1dp",
        width: Titanium.UI.FILL,
        backgroundColor: "#A1A39E",
        id: "seperator2"
    });
    $.__views.__alloyId1518.add($.__views.seperator2);
    $.__views.__alloyId1519 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        layout: "vertical",
        width: "20%",
        left: "4%",
        id: "__alloyId1519"
    });
    $.__views.__alloyId1516.add($.__views.__alloyId1519);
    $.__views.otp_no3 = Ti.UI.createTextField({
        width: Titanium.UI.FILL,
        keyboardType: Titanium.UI.KEYBOARD_PHONE_PAD,
        backgroundColor: "transparent",
        height: "48dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "#4d4f4a",
        maxLength: "1",
        passwordMask: true,
        font: {
            fontSize: "15sp"
        },
        id: "otp_no3"
    });
    $.__views.__alloyId1519.add($.__views.otp_no3);
    $.__views.seperator3 = Ti.UI.createView({
        top: 0,
        height: "1dp",
        width: Titanium.UI.FILL,
        backgroundColor: "#A1A39E",
        id: "seperator3"
    });
    $.__views.__alloyId1519.add($.__views.seperator3);
    $.__views.__alloyId1520 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        layout: "vertical",
        width: "20%",
        left: "4%",
        id: "__alloyId1520"
    });
    $.__views.__alloyId1516.add($.__views.__alloyId1520);
    $.__views.otp_no4 = Ti.UI.createTextField({
        width: Titanium.UI.FILL,
        keyboardType: Titanium.UI.KEYBOARD_PHONE_PAD,
        backgroundColor: "transparent",
        height: "48dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "#4d4f4a",
        maxLength: "1",
        passwordMask: true,
        font: {
            fontSize: "15sp"
        },
        id: "otp_no4"
    });
    $.__views.__alloyId1520.add($.__views.otp_no4);
    $.__views.seperator4 = Ti.UI.createView({
        top: 0,
        height: "1dp",
        width: Titanium.UI.FILL,
        backgroundColor: "#A1A39E",
        id: "seperator4"
    });
    $.__views.__alloyId1520.add($.__views.seperator4);
    $.__views.otp_resend_lbl = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_lt_bt_light-webfont"
        },
        top: "12dp",
        width: "80%",
        height: "40dp",
        color: "#e65e48",
        backgroundColor: "transparent",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "otp_resend_lbl",
        text: "Resend OTP"
    });
    $.__views.sub_forgot_container.add($.__views.otp_resend_lbl);
    resendOTP ? $.addListener($.__views.otp_resend_lbl, "click", resendOTP) : __defers["$.__views.otp_resend_lbl!click!resendOTP"] = true;
    $.__views.otp_submit_lbl = Ti.UI.createLabel({
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        top: "12dp",
        width: "80%",
        height: "40dp",
        color: "white",
        backgroundColor: "#4d000000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "otp_submit_lbl",
        text: "SUBMIT"
    });
    $.__views.sub_forgot_container.add($.__views.otp_submit_lbl);
    otpConfirmation ? $.addListener($.__views.otp_submit_lbl, "click", otpConfirmation) : __defers["$.__views.otp_submit_lbl!click!otpConfirmation"] = true;
    $.__views.otp_cancel_lbl = Ti.UI.createLabel({
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        top: "12dp",
        width: "80%",
        height: "40dp",
        color: "#8b8b8c",
        backgroundColor: "transparent",
        borderColor: "#99000000",
        borderWidth: "0.5dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "otp_cancel_lbl",
        text: "CANCEL"
    });
    $.__views.sub_forgot_container.add($.__views.otp_cancel_lbl);
    $.__views.reset_password_container = Ti.UI.createView({
        layout: "vertical",
        zIndex: "130",
        visible: false,
        id: "reset_password_container"
    });
    $.__views.signIn.add($.__views.reset_password_container);
    $.__views.__alloyId1521 = Ti.UI.createScrollView({
        scrollType: "vertical",
        id: "__alloyId1521"
    });
    $.__views.reset_password_container.add($.__views.__alloyId1521);
    $.__views.sub_forgot_container = Ti.UI.createView({
        width: "88%",
        height: Titanium.UI.SIZE,
        layout: "vertical",
        top: "60dp",
        id: "sub_forgot_container"
    });
    $.__views.__alloyId1521.add($.__views.sub_forgot_container);
    $.__views.__alloyId1522 = Ti.UI.createImageView({
        width: "150dp",
        height: "50dp",
        image: "/images/DDecorLogo.png",
        top: "10dp",
        id: "__alloyId1522"
    });
    $.__views.sub_forgot_container.add($.__views.__alloyId1522);
    $.__views.signin_resetpassword_txt = Ti.UI.createTextField({
        height: "40dp",
        width: "98%",
        backgroundColor: "transparent",
        color: "#4d4f4a",
        hintTextColor: "#a0a0a0",
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        top: "50dp",
        hintText: "NEW PASSWORD",
        passwordMask: true,
        id: "signin_resetpassword_txt",
        type: "TextField"
    });
    $.__views.sub_forgot_container.add($.__views.signin_resetpassword_txt);
    $.__views.resetnew_seperator = Ti.UI.createView({
        top: 0,
        height: "0.5dp",
        width: Titanium.UI.FILL,
        backgroundColor: "#A1A39E",
        id: "resetnew_seperator"
    });
    $.__views.sub_forgot_container.add($.__views.resetnew_seperator);
    $.__views.signin_resetconfpassword_txt = Ti.UI.createTextField({
        height: "40dp",
        width: "98%",
        backgroundColor: "transparent",
        color: "#4d4f4a",
        hintTextColor: "#a0a0a0",
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        top: "12dp",
        hintText: "CONFIRM PASSWORD",
        passwordMask: true,
        id: "signin_resetconfpassword_txt",
        type: "TextField"
    });
    $.__views.sub_forgot_container.add($.__views.signin_resetconfpassword_txt);
    $.__views.resetconf_seperator = Ti.UI.createView({
        top: 0,
        height: "0.5dp",
        width: Titanium.UI.FILL,
        backgroundColor: "#A1A39E",
        id: "resetconf_seperator"
    });
    $.__views.sub_forgot_container.add($.__views.resetconf_seperator);
    $.__views.reset_lbl = Ti.UI.createLabel({
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        top: "30dp",
        width: "80%",
        height: "40dp",
        color: "#ffffff",
        backgroundColor: "#4d000000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "reset_lbl",
        text: "RESET"
    });
    $.__views.sub_forgot_container.add($.__views.reset_lbl);
    setNewPassword ? $.addListener($.__views.reset_lbl, "click", setNewPassword) : __defers["$.__views.reset_lbl!click!setNewPassword"] = true;
    $.__views.reset_cancel_lbl = Ti.UI.createLabel({
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        top: "12dp",
        width: "80%",
        height: "40dp",
        color: "#8b8b8c",
        backgroundColor: "transparent",
        borderColor: "#99000000",
        borderWidth: "0.5dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "reset_cancel_lbl",
        text: "CANCEL",
        bottom: "10dp"
    });
    $.__views.sub_forgot_container.add($.__views.reset_cancel_lbl);
    $.__views.register_container = Ti.UI.createView({
        zIndex: "140",
        backgroundColor: "#ffffff",
        visible: false,
        id: "register_container"
    });
    $.__views.signIn.add($.__views.register_container);
    $.__views.header = Alloy.createWidget("headerView", "widget", {
        id: "header",
        __parentSymbol: $.__views.register_container
    });
    $.__views.header.setParent($.__views.register_container);
    $.__views.__alloyId1523 = Ti.UI.createScrollView({
        layout: "vertical",
        top: 53,
        scrollType: "vertical",
        id: "__alloyId1523"
    });
    $.__views.register_container.add($.__views.__alloyId1523);
    $.__views.noteLabel = Ti.UI.createLabel({
        top: "10dp",
        font: {
            fontSize: "12sp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#000000",
        left: "20dp",
        id: "noteLabel",
        visible: false
    });
    $.__views.__alloyId1523.add($.__views.noteLabel);
    $.__views.super_register_container = Ti.UI.createView({
        width: "88%",
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "super_register_container"
    });
    $.__views.__alloyId1523.add($.__views.super_register_container);
    $.__views.register_first_txt = Ti.UI.createTextField({
        height: "40dp",
        width: "98%",
        backgroundColor: "transparent",
        color: "#4d4f4a",
        hintTextColor: "#a0a0a0",
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        top: "10dp",
        id: "register_first_txt",
        hintText: "FIRST NAME",
        maxLength: 30,
        type: "TextField"
    });
    $.__views.super_register_container.add($.__views.register_first_txt);
    $.__views.register_first_seperator = Ti.UI.createView({
        top: 0,
        height: "0.5dp",
        width: Titanium.UI.FILL,
        backgroundColor: "transparent",
        id: "register_first_seperator"
    });
    $.__views.super_register_container.add($.__views.register_first_seperator);
    $.__views.register_last_txt = Ti.UI.createTextField({
        height: "40dp",
        width: "98%",
        backgroundColor: "transparent",
        color: "#4d4f4a",
        hintTextColor: "#a0a0a0",
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        top: "10dp",
        id: "register_last_txt",
        hintText: "LAST NAME",
        type: "TextField",
        maxLength: 30
    });
    $.__views.super_register_container.add($.__views.register_last_txt);
    $.__views.register_last_seperator = Ti.UI.createView({
        top: 0,
        height: "0.5dp",
        width: Titanium.UI.FILL,
        backgroundColor: "transparent",
        id: "register_last_seperator"
    });
    $.__views.super_register_container.add($.__views.register_last_seperator);
    $.__views.register_email_txt = Ti.UI.createTextField({
        keyboardType: Ti.UI.KEYBOARD_EMAIL,
        height: "40dp",
        width: "98%",
        backgroundColor: "transparent",
        color: "#4d4f4a",
        hintTextColor: "#a0a0a0",
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        top: "10dp",
        id: "register_email_txt",
        hintText: "EMAIL",
        type: "TextField"
    });
    $.__views.super_register_container.add($.__views.register_email_txt);
    $.__views.register_email_seperator = Ti.UI.createView({
        top: 0,
        height: "0.5dp",
        width: Titanium.UI.FILL,
        backgroundColor: "transparent",
        id: "register_email_seperator"
    });
    $.__views.super_register_container.add($.__views.register_email_seperator);
    $.__views.register_phone_txt = Ti.UI.createTextField({
        keyboardType: Titanium.UI.KEYBOARD_PHONE_PAD,
        height: "40dp",
        width: "98%",
        backgroundColor: "transparent",
        color: "#4d4f4a",
        hintTextColor: "#a0a0a0",
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        top: "10dp",
        id: "register_phone_txt",
        maxLength: 10,
        hintText: "PHONE",
        type: "TextField"
    });
    $.__views.super_register_container.add($.__views.register_phone_txt);
    $.__views.register_phone_seperator = Ti.UI.createView({
        top: 0,
        height: "0.5dp",
        width: Titanium.UI.FILL,
        backgroundColor: "transparent",
        id: "register_phone_seperator"
    });
    $.__views.super_register_container.add($.__views.register_phone_seperator);
    $.__views.__alloyId1524 = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        left: "0%",
        top: 10,
        height: "40dp",
        layout: "horizontal",
        id: "__alloyId1524"
    });
    $.__views.super_register_container.add($.__views.__alloyId1524);
    $.__views.__alloyId1525 = Ti.UI.createLabel({
        color: "#a0a0a0",
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        text: "GENDER",
        left: "5dp",
        id: "__alloyId1525"
    });
    $.__views.__alloyId1524.add($.__views.__alloyId1525);
    $.__views.male = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "14dp"
        },
        color: "#33000000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        right: "5dp",
        bubbleParent: true,
        text: Alloy.Globals.icon.radio,
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        gender: "male",
        id: "male",
        left: "15dp"
    });
    $.__views.__alloyId1524.add($.__views.male);
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
    $.__views.__alloyId1524.add($.__views.radioText1);
    selectGender ? $.addListener($.__views.radioText1, "touchstart", selectGender) : __defers["$.__views.radioText1!touchstart!selectGender"] = true;
    $.__views.female = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "14dp"
        },
        color: "#33000000",
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
    $.__views.__alloyId1524.add($.__views.female);
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
    $.__views.__alloyId1524.add($.__views.radioText2);
    selectGender ? $.addListener($.__views.radioText2, "touchstart", selectGender) : __defers["$.__views.radioText2!touchstart!selectGender"] = true;
    $.__views.other = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "14dp"
        },
        color: "#33000000",
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
    $.__views.__alloyId1524.add($.__views.other);
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
    $.__views.__alloyId1524.add($.__views.radioText3);
    selectGender ? $.addListener($.__views.radioText3, "touchstart", selectGender) : __defers["$.__views.radioText3!touchstart!selectGender"] = true;
    $.__views.dob = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        color: "#a0a0a0",
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        text: "DOB",
        id: "dob",
        top: "3dp",
        left: "5dp"
    });
    $.__views.super_register_container.add($.__views.dob);
    $.__views.__alloyId1526 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        top: "5dp",
        left: "5dp",
        height: 40,
        layout: "horizontal",
        id: "__alloyId1526"
    });
    $.__views.super_register_container.add($.__views.__alloyId1526);
    $.__views.__alloyId1527 = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        left: "0%",
        dob: true,
        id: "__alloyId1527"
    });
    $.__views.__alloyId1526.add($.__views.__alloyId1527);
    showDatePicker ? $.addListener($.__views.__alloyId1527, "click", showDatePicker) : __defers["$.__views.__alloyId1527!click!showDatePicker"] = true;
    $.__views.dob_date = Ti.UI.createLabel({
        top: 10,
        left: "0%",
        color: "#000",
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        text: "DD",
        touchEnabled: false,
        id: "dob_date"
    });
    $.__views.__alloyId1527.add($.__views.dob_date);
    $.__views.__alloyId1528 = Ti.UI.createLabel({
        top: 16,
        font: {
            fontFamily: "icomoon",
            fontSize: "6dp"
        },
        color: "#000",
        text: Alloy.Globals.icon.dropdownArrow,
        touchEnabled: false,
        left: 70,
        id: "__alloyId1528"
    });
    $.__views.__alloyId1527.add($.__views.__alloyId1528);
    $.__views.__alloyId1529 = Ti.UI.createView({
        backgroundColor: "#a0a0a0",
        height: "2px",
        width: "28%",
        left: -12,
        right: "5%",
        top: 30,
        id: "__alloyId1529"
    });
    $.__views.__alloyId1527.add($.__views.__alloyId1529);
    $.__views.__alloyId1530 = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        left: "5%",
        dob: true,
        id: "__alloyId1530"
    });
    $.__views.__alloyId1526.add($.__views.__alloyId1530);
    showDatePicker ? $.addListener($.__views.__alloyId1530, "click", showDatePicker) : __defers["$.__views.__alloyId1530!click!showDatePicker"] = true;
    $.__views.dob_month = Ti.UI.createLabel({
        top: 10,
        left: "0%",
        color: "#000",
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        text: "MM",
        touchEnabled: false,
        id: "dob_month"
    });
    $.__views.__alloyId1530.add($.__views.dob_month);
    $.__views.__alloyId1531 = Ti.UI.createLabel({
        top: 16,
        font: {
            fontFamily: "icomoon",
            fontSize: "6dp"
        },
        color: "#000",
        text: Alloy.Globals.icon.dropdownArrow,
        touchEnabled: false,
        left: 70,
        id: "__alloyId1531"
    });
    $.__views.__alloyId1530.add($.__views.__alloyId1531);
    $.__views.__alloyId1532 = Ti.UI.createView({
        backgroundColor: "#a0a0a0",
        height: "2px",
        width: "28%",
        left: -12,
        right: "5%",
        top: 30,
        id: "__alloyId1532"
    });
    $.__views.__alloyId1530.add($.__views.__alloyId1532);
    $.__views.__alloyId1533 = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        left: "5%",
        dob: true,
        id: "__alloyId1533"
    });
    $.__views.__alloyId1526.add($.__views.__alloyId1533);
    showDatePicker ? $.addListener($.__views.__alloyId1533, "click", showDatePicker) : __defers["$.__views.__alloyId1533!click!showDatePicker"] = true;
    $.__views.dob_year = Ti.UI.createLabel({
        top: 10,
        left: "0%",
        color: "#000",
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        text: "YYYY",
        touchEnabled: false,
        id: "dob_year"
    });
    $.__views.__alloyId1533.add($.__views.dob_year);
    $.__views.__alloyId1534 = Ti.UI.createLabel({
        top: 16,
        font: {
            fontFamily: "icomoon",
            fontSize: "6dp"
        },
        color: "#000",
        text: Alloy.Globals.icon.dropdownArrow,
        touchEnabled: false,
        left: 70,
        id: "__alloyId1534"
    });
    $.__views.__alloyId1533.add($.__views.__alloyId1534);
    $.__views.__alloyId1535 = Ti.UI.createView({
        backgroundColor: "#a0a0a0",
        height: "2px",
        width: "28%",
        left: -12,
        right: "5%",
        top: 30,
        id: "__alloyId1535"
    });
    $.__views.__alloyId1533.add($.__views.__alloyId1535);
    $.__views.__alloyId1536 = Ti.UI.createView({
        width: "98%",
        height: "41dp",
        top: "7dp",
        id: "__alloyId1536"
    });
    $.__views.super_register_container.add($.__views.__alloyId1536);
    $.__views.register_password_txt = Ti.UI.createTextField({
        passwordMask: true,
        height: "40dp",
        width: Titanium.UI.FILL,
        right: "15dp",
        backgroundColor: "transparent",
        color: "#4d4f4a",
        hintTextColor: "#a0a0a0",
        font: {
            fontSize: "14sp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        id: "register_password_txt",
        hintText: "PASSWORD",
        type: "TextField"
    });
    $.__views.__alloyId1536.add($.__views.register_password_txt);
    $.__views.register_password_seperator = Ti.UI.createView({
        height: "0.5dp",
        width: Titanium.UI.FILL,
        backgroundColor: "transparent",
        bottom: "0.5dp",
        id: "register_password_seperator"
    });
    $.__views.__alloyId1536.add($.__views.register_password_seperator);
    $.__views.showpassword_lbl = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon"
        },
        width: "15dp",
        right: "0dp",
        color: "black",
        text: Alloy.Globals.icon.password,
        visible: false,
        id: "showpassword_lbl"
    });
    $.__views.__alloyId1536.add($.__views.showpassword_lbl);
    showPassword ? $.addListener($.__views.showpassword_lbl, "click", showPassword) : __defers["$.__views.showpassword_lbl!click!showPassword"] = true;
    $.__views.__alloyId1537 = Ti.UI.createLabel({
        top: "10dp",
        left: "25dp",
        color: "#000000",
        font: {
            fontSize: "10dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        text: "Minimum 7 characters including atleast 1 number",
        id: "__alloyId1537"
    });
    $.__views.__alloyId1523.add($.__views.__alloyId1537);
    $.__views.__alloyId1538 = Ti.UI.createLabel({
        top: "20dp",
        left: "25dp",
        color: "#000000",
        font: {
            fontSize: "12sp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        text: "Password strength",
        visible: false,
        id: "__alloyId1538"
    });
    $.__views.__alloyId1523.add($.__views.__alloyId1538);
    $.__views.sliderContainer = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        left: "25dp",
        right: "25dp",
        top: "10dp",
        id: "sliderContainer",
        visible: false
    });
    $.__views.__alloyId1523.add($.__views.sliderContainer);
    $.__views.slider = Ti.UI.createView({
        height: "4dp",
        left: "0dp",
        id: "slider"
    });
    $.__views.sliderContainer.add($.__views.slider);
    $.__views.strengthStatus = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_medium_bt-webfont",
            fontSize: "12sp"
        },
        top: "10dp",
        left: "25dp",
        color: "#000000",
        id: "strengthStatus",
        visible: false
    });
    $.__views.__alloyId1523.add($.__views.strengthStatus);
    $.__views.register_signup_lbl = Ti.UI.createLabel({
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        top: "12dp",
        width: "60%",
        height: "34dp",
        color: "#ffffff",
        backgroundColor: "#000000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "register_signup_lbl",
        text: "SIGN UP"
    });
    $.__views.__alloyId1523.add($.__views.register_signup_lbl);
    $.__views.register_cancel_lbl = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_lt_bt_light-webfont"
        },
        top: "12dp",
        width: "60%",
        height: "34dp",
        color: "orange",
        backgroundColor: "transparent",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "register_cancel_lbl",
        text: "Cancel"
    });
    $.__views.__alloyId1523.add($.__views.register_cancel_lbl);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var isEmail = false, isMobile = false, isResendOTP = false, customer_id = null, isLoader = false, contact_number = null;
    $.header.getView("home").setVisible(false);
    $.header.getView("home").setHeight(0);
    $.header.getView("appoinmantLbl").setHeight(0);
    $.header.getView("cartContainer").setVisible(false);
    $.header.getView("searchLbl").setVisible(false);
    $.header.getView("customerService").setVisible(false);
    $.header.getView("return_refund").setVisible(false);
    $.header.getView("faq").setVisible(false);
    $.header.getView("customerService").setHeight(0);
    $.header.getView("return_refund").setHeight(0);
    $.header.getView("faq").setHeight(0);
    $.header.getView("shortlist").setHeight(0);
    $.header.getView("shortlist").setVisible(false);
    $.header.init({
        title: "SIGN UP"
    });
    var text = "SKIP";
    var attr = Ti.UI.createAttributedString({
        text: text,
        attributes: [ {
            type: Titanium.UI.ATTRIBUTE_UNDERLINES_STYLE,
            value: Titanium.UI.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
            range: [ text.indexOf(text), text.length ]
        } ]
    });
    $.header.getView("menuButton").addEventListener("click", GoToBack);
    $.guest_cancel_lbl.addEventListener("click", navigatedToForgotPassword);
    $.register_signup_lbl.addEventListener("click", registerUser);
    var first = true;
    touchEffect.createTextBlurEffect($.signin_email_txt, $.email_seperator, $.password_seperator, "#4d4f4a", "#A1A39E");
    touchEffect.createTextBlurEffect($.signin_password_txt, $.email_seperator, $.password_seperator, "#A1A39E", "#4d4f4a");
    touchEffect.createTextBlurEffect($.signin_forgot_txt, $.forgot_email_seperator, $.number_seperator, "#4d4f4a", "#A1A39E");
    touchEffect.createTextBlurEffect($.signin_numbar_txt, $.forgot_email_seperator, $.number_seperator, "#A1A39E", "#4d4f4a");
    touchEffect.createTextBlurEffect($.signin_resetpassword_txt, $.resetnew_seperator, $.resetconf_seperator, "#4d4f4a", "#A1A39E");
    touchEffect.createTextBlurEffect($.signin_resetconfpassword_txt, $.resetnew_seperator, $.resetconf_seperator, "#A1A39E", "#4d4f4a");
    $.otp_no1.removeEventListener("focus", toggleEffect);
    $.otp_no2.removeEventListener("focus", toggleEffect);
    $.otp_no3.removeEventListener("focus", toggleEffect);
    $.otp_no4.removeEventListener("focus", toggleEffect);
    $.otp_no1.addEventListener("focus", toggleEffect);
    $.otp_no2.addEventListener("focus", toggleEffect);
    $.otp_no3.addEventListener("focus", toggleEffect);
    $.otp_no4.addEventListener("focus", toggleEffect);
    $.signin_forgot_lbl.removeEventListener("click", showForgotPasswordScreen);
    $.signin_forgot_lbl.addEventListener("click", showForgotPasswordScreen);
    touchEffect.createTouchEffect($.signin_forgot_lbl, "#a6000000", "#000000");
    touchEffect.createTouchEffect($.signin_login_lbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.signin_register_lbl, "#a68b8b8c", "#8b8b8c");
    touchEffect.createTouchEffect($.signin_facebook_lbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.signin_google_lbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.forgot_submit_lbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.forgot_cancel_lbl, "#a68b8b8c", "#8b8b8c");
    $.forgot_cancel_lbl.addEventListener("click", function(e) {
        $.forgot_password_container.visible = false;
        $.main_login_container.visible = true;
        emptyTextFieldValues();
    });
    touchEffect.createTouchEffect($.continue_guest_lbl, "#a6ffffff", "#ffffff");
    $.continue_guest_lbl.addEventListener("click", function(e) {
        $.guest_container.visible = false;
        emptyTextFieldValues();
        Alloy.Globals.popWindowInNav();
        $.signIn.close();
    });
    touchEffect.createTouchEffect($.otp_resend_lbl, "#a6e65e48", "#e65e48");
    touchEffect.createTouchEffect($.otp_submit_lbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.otp_cancel_lbl, "#a68b8b8c", "#8b8b8c");
    $.otp_no1.addEventListener("focus", function(e) {
        $.otp_no1.focus();
    });
    $.otp_no1.addEventListener("change", function(e) {
        1 == $.otp_no1.value.length ? $.otp_no2.focus() : 0 == $.otp_no1.value.length && $.otp_no1.focus();
    });
    $.otp_no2.addEventListener("change", function(e) {
        1 == $.otp_no2.value.length ? $.otp_no3.focus() : 0 == $.otp_no2.value.length && $.otp_no1.focus();
    });
    $.otp_no3.addEventListener("change", function(e) {
        1 == $.otp_no3.value.length ? $.otp_no4.focus() : 0 == $.otp_no3.value.length && $.otp_no2.focus();
    });
    $.otp_no4.addEventListener("change", function(e) {
        if (0 === $.otp_no4.value.length) $.otp_no3.focus(); else {
            $.otp_no4.blur();
            $.seperator4.backgroundColor = "#A1A39E";
        }
    });
    $.otp_cancel_lbl.addEventListener("click", function(e) {
        $.otp_container.visible = false;
        $.forgot_password_container.visible = true;
        emptyTextFieldValues();
    });
    touchEffect.createTouchEffect($.reset_lbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.reset_cancel_lbl, "#a68b8b8c", "#8b8b8c");
    $.reset_cancel_lbl.addEventListener("click", function(e) {
        $.reset_password_container.visible = false;
        $.forgot_password_container.setVisible(true);
        emptyTextFieldValues();
    });
    $.signin_register_lbl.addEventListener("click", function(e) {
        $.main_login_container.visible = false;
        $.register_container.visible = true;
        emptyTextFieldValues();
    });
    var text = "Note: All the following fields are mandatory";
    var attr = Ti.UI.createAttributedString({
        text: text,
        attributes: [ {
            type: Ti.UI.ATTRIBUTE_FONT,
            value: {
                fontSize: 12,
                fontFamily: "futura_lt_bt_light-webfont",
                fontWeight: "bold"
            },
            range: [ text.indexOf("Note:"), "Note:".length ]
        }, {
            type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
            value: "#e64e48",
            range: [ text.indexOf("Note:"), "Note:".length ]
        } ]
    });
    $.noteLabel.attributedString = attr;
    $.register_password_txt.removeEventListener("focus", toggelTextField);
    $.register_phone_txt.removeEventListener("focus", toggelTextField);
    $.register_email_txt.removeEventListener("focus", toggelTextField);
    $.register_last_txt.removeEventListener("focus", toggelTextField);
    $.register_first_txt.removeEventListener("focus", toggelTextField);
    $.register_password_txt.addEventListener("focus", toggelTextField);
    $.register_phone_txt.addEventListener("focus", toggelTextField);
    $.register_email_txt.addEventListener("focus", toggelTextField);
    $.register_last_txt.addEventListener("focus", toggelTextField);
    $.register_first_txt.addEventListener("focus", toggelTextField);
    var excellent = /^[A-Za-z0-9-]+[ 0-9A-Za-z#$%=@!{},`~&*()'<>?.:;_|^\/+\t\r\n\[\]"-]*$/;
    var NameRegEx = /^[a-zA-Z ]*$/;
    var name_number = /^([A-Za-z0-9_\-\.])*$/;
    $.register_password_txt.addEventListener("blur", function(e) {
        $.slider.width = $.slider.getWidth();
    });
    $.register_password_txt.addEventListener("change", function(e) {
        0 == $.register_password_txt.value.length ? $.showpassword_lbl.setVisible(false) : $.showpassword_lbl.setVisible(true);
        if ("" == $.register_password_txt.value || null == $.register_password_txt.value) {
            $.slider.width = "";
            $.strengthStatus.text = "";
            $.sliderContainer.backgroundColor = "transparent";
        }
        if (NameRegEx.test($.register_password_txt.value) && 3 == $.register_password_txt.value.length) {
            $.slider.width = "25%";
            $.sliderContainer.backgroundColor = "#f2f2f2";
            $.slider.backgroundColor = "#660000";
            $.strengthStatus.text = "Too short";
        } else if (NameRegEx.test($.register_password_txt.value) && $.register_password_txt.value.length >= 5) {
            $.slider.width = "50%";
            $.slider.backgroundColor = "#660000";
            $.strengthStatus.text = "Weak";
        } else if (name_number.test($.register_password_txt.value) && $.register_password_txt.value.length > 7) {
            $.slider.width = "75%";
            $.slider.backgroundColor = "#006699";
            $.strengthStatus.text = "Good";
        } else if (excellent.test($.register_password_txt.value) && $.register_password_txt.value.length > 7) {
            $.slider.width = "100%";
            $.slider.backgroundColor = "#99cc00";
            $.strengthStatus.text = "Strong";
        } else $.slider.width = $.slider.getWidth();
    });
    touchEffect.createTouchEffect($.register_signup_lbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.register_cancel_lbl, "#a6ffa500", "#ffa500");
    $.register_cancel_lbl.addEventListener("click", function(e) {
        $.register_container.visible = false;
        $.main_login_container.visible = true;
        emptyTextFieldValues();
    });
    $.signin_login_lbl.addEventListener("click", loginUser);
    Ti.Platform.Android && ($.signIn.fbProxy = Alloy.Globals.fb.createActivityWorker({
        lifecycleContainer: $.signIn
    }));
    $.signin_facebook_lbl.addEventListener("click", facebookLogin);
    Alloy.Globals.fb.addEventListener("login", function(e) {
        if (e.success) {
            Alloy.Globals.fb.setPermissions("email", "user_about_me", "public_profile", "user_birthday");
            Ti.API.info("Alloy.Globals.fb.getAccessToken() = " + Alloy.Globals.fb.getAccessToken());
            Ti.API.info("getUid == " + Alloy.Globals.fb.getUid());
            Alloy.Globals.fb.requestWithGraphPath("/me", {
                fields: "email,first_name,last_name,birthday,gender,age_range"
            }, "GET", function(e) {
                if (e.success) {
                    Ti.API.info("user get successfully facebook login==" + JSON.stringify(e));
                    facebookLoginSuccessCallback(e.result);
                } else e.error || alert("Something went wrong Please try again");
            });
        } else e.cancelled ? Alloy.Globals.fb.loggedIn : Ti.API.info("user has got unexpected err");
    });
    var googleAuth = Alloy.Globals.googleAuth;
    $.signin_google_lbl.addEventListener("click", function(e) {
        googleAuth.isAuthorized(googleGetEmail, function() {
            googleAuth.authorize(googleGetEmail);
        });
    });
    __defers["$.__views.signIn!android:back!GoToBack"] && $.addListener($.__views.signIn, "android:back", GoToBack);
    __defers["$.__views.signIn!touchstart!hideKeyboard"] && $.addListener($.__views.signIn, "touchstart", hideKeyboard);
    __defers["$.__views.signIn!open!updateCount"] && $.addListener($.__views.signIn, "open", updateCount);
    __defers["$.__views.signIn!close!clearMemory"] && $.addListener($.__views.signIn, "close", clearMemory);
    __defers["$.__views.forgot_submit_lbl!click!forgetPassword"] && $.addListener($.__views.forgot_submit_lbl, "click", forgetPassword);
    __defers["$.__views.otp_resend_lbl!click!resendOTP"] && $.addListener($.__views.otp_resend_lbl, "click", resendOTP);
    __defers["$.__views.otp_submit_lbl!click!otpConfirmation"] && $.addListener($.__views.otp_submit_lbl, "click", otpConfirmation);
    __defers["$.__views.reset_lbl!click!setNewPassword"] && $.addListener($.__views.reset_lbl, "click", setNewPassword);
    __defers["$.__views.male!touchstart!selectGender"] && $.addListener($.__views.male, "touchstart", selectGender);
    __defers["$.__views.radioText1!touchstart!selectGender"] && $.addListener($.__views.radioText1, "touchstart", selectGender);
    __defers["$.__views.female!touchstart!selectGender"] && $.addListener($.__views.female, "touchstart", selectGender);
    __defers["$.__views.radioText2!touchstart!selectGender"] && $.addListener($.__views.radioText2, "touchstart", selectGender);
    __defers["$.__views.other!touchstart!selectGender"] && $.addListener($.__views.other, "touchstart", selectGender);
    __defers["$.__views.radioText3!touchstart!selectGender"] && $.addListener($.__views.radioText3, "touchstart", selectGender);
    __defers["$.__views.__alloyId1527!click!showDatePicker"] && $.addListener($.__views.__alloyId1527, "click", showDatePicker);
    __defers["$.__views.__alloyId1530!click!showDatePicker"] && $.addListener($.__views.__alloyId1530, "click", showDatePicker);
    __defers["$.__views.__alloyId1533!click!showDatePicker"] && $.addListener($.__views.__alloyId1533, "click", showDatePicker);
    __defers["$.__views.showpassword_lbl!click!showPassword"] && $.addListener($.__views.showpassword_lbl, "click", showPassword);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;