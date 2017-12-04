var args = arguments[0] || {};

var isEmail = false,
    isMobile = false,
    isResendOTP = false,
    customer_id = null,
    isLoader = false,
    contact_number = null;




// $.header.getView("menuButton").text = Alloy.Globals.icon.back;

//$.header.getView("logoIcon").setText("REGISTER");
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
    title : "SIGN UP",
    //passWindow : $.signIn,
});


/******************/
var text = "SKIP";
var attr = Ti.UI.createAttributedString({
    text : text,
    attributes : [{
        type : Titanium.UI.ATTRIBUTE_UNDERLINES_STYLE,
        value : Titanium.UI.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
        range : [text.indexOf(text), (text).length]
    }]
});


// add new field for register


function selectGender(e) {
    var gender = e.source.gender;

    //$[gender].setColor(Alloy.Globals.labelTitleColor);

    if (gender === "male") {

        $.male.setColor(Alloy.Globals.labelTitleColor);
        $.female.setColor("#33000000");
        $.other.setColor("#33000000");
    }
    else if (gender === "female") {

        $.female.setColor(Alloy.Globals.labelTitleColor);
        $.male.setColor("#33000000");
        $.other.setColor("#33000000");

    } else {
        //female
        $.male.setColor("#33000000");
        $.female.setColor("#33000000");
        $.other.setColor(Alloy.Globals.labelTitleColor);
    }

}

 
function showDatePicker(e) {
    // Ti.API.info('e.dob ' + e.dob);
    // Ti.API.info('e.dob ' + e.source.dob);

    var obj = {};

    if (e.source.dob) {
        obj = {
            day : $.dob_date,
            month : $.dob_month,
            year : $.dob_year,
            setDate : true
        };

    }

    var picker = Alloy.createController('pickerTemplate', obj).getView();

    //$.myaccount_container.parent.parent.parent.parent.add(picker);
    $.register_container.add(picker);
}

//end


//$.cancel_lbl.attributedString = attr;
/******************/



$.header.getView("menuButton").addEventListener("click", GoToBack);

$.guest_cancel_lbl.addEventListener("click", navigatedToForgotPassword);

//$.reset_lbl.addEventListener("click", navigatedToSignUp);
$.register_signup_lbl.addEventListener("click", registerUser);

/* blur textfiels when first time window open*/

// var first = true;
// $.signin_email_txt.addEventListener('focus', function(e) {
// if (first) {
// first = false;
// $.signin_email_txt.blur();
// Ti.API.info('event called 1');
// } else {
// //$.signin_email_txt.removeEventListener('focus');
// this.removeEventListener('focus', arguments.callee, false);
// Ti.API.info('event remove');
// }
// });
 //$.signin_email_txt.blur();
var first = true;


/*
$.signin_email_txt.addEventListener('focus', function(e) {
    if (first) {
        first = false;
<<<<<<< HEAD
        Ti.API.info('text focus');
=======
<<<<<<< HEAD
       $.signin_email_txt.blur();
        Ti.API.info('event called 1');
    } else {
        //$.signin_email_txt.removeEventListener('focus', f);
        // this.removeEventListener('focus', arguments.callee, false);
       // $.signin_email_txt.focus();
        Ti.API.info('event remove');
=======
>>>>>>> f55b750797a7fd68959a2b3c936d93a0ce413f97
        $.signin_email_txt.blur();
        //Ti.API.info('event called 1');
    } else {
    	Ti.API.info('text els efocus');
        //$.signin_email_txt.removeEventListener('focus', f);
        // this.removeEventListener('focus', arguments.callee, false);
        //Ti.API.info('event remove');
>>>>>>> 63c351c1bb15b335611f0d851fbc4c378296d591
    }
    
});

*/

/* blur textfiels when first time window open*/

// $.signIn.removeEventListener("click", blurSignInTextField);
// $.signIn.addEventListener("click", blurSignInTextField);
//
// function blurSignInTextField() {
// // $.signin_email_txt.blur();
// $.signin_password_txt.blur();
// $.signin_forgot_txt.blur();
// $.signin_numbar_txt.blur();
// }

/*
 * change color of view when textfield focus
 */
touchEffect.createTextBlurEffect($.signin_email_txt, $.email_seperator, $.password_seperator, "#4d4f4a", "#A1A39E");
touchEffect.createTextBlurEffect($.signin_password_txt, $.email_seperator, $.password_seperator, "#A1A39E", "#4d4f4a");
touchEffect.createTextBlurEffect($.signin_forgot_txt, $.forgot_email_seperator, $.number_seperator, "#4d4f4a", "#A1A39E");
touchEffect.createTextBlurEffect($.signin_numbar_txt, $.forgot_email_seperator, $.number_seperator, "#A1A39E", "#4d4f4a");
touchEffect.createTextBlurEffect($.signin_resetpassword_txt, $.resetnew_seperator, $.resetconf_seperator, "#4d4f4a", "#A1A39E");
touchEffect.createTextBlurEffect($.signin_resetconfpassword_txt, $.resetnew_seperator, $.resetconf_seperator, "#A1A39E", "#4d4f4a");

$.otp_no1.removeEventListener('focus', toggleEffect);
$.otp_no2.removeEventListener('focus', toggleEffect);
$.otp_no3.removeEventListener('focus', toggleEffect);
$.otp_no4.removeEventListener('focus', toggleEffect);

$.otp_no1.addEventListener('focus', toggleEffect);
$.otp_no2.addEventListener('focus', toggleEffect);
$.otp_no3.addEventListener('focus', toggleEffect);
$.otp_no4.addEventListener('focus', toggleEffect);

function toggleEffect(e) {
    $.seperator1.backgroundColor = "#A1A39E";
    $.seperator2.backgroundColor = "#A1A39E";
    $.seperator3.backgroundColor = "#A1A39E";
    $.seperator4.backgroundColor = "#A1A39E";
    switch(e.source.id) {
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
        break;
    }

}

// $.signin_forgot_lbl.addEventListener('click', function(e) {
// $.main_login_container.visible = false;
// $.forgot_password_container.visible = true;
// });

$.signin_forgot_lbl.removeEventListener("click", showForgotPasswordScreen);
$.signin_forgot_lbl.addEventListener("click", showForgotPasswordScreen);

//$.signin_forgot_lbl.fireEvent("click",{test:"value"});

function showForgotPasswordScreen(e) {
    // Ti.API.info('values--->'+JSON.stringify(e.source));
    // Ti.API.info('values1 -->'+ JSON.stringify(this));
    $.main_login_container.visible = false;
    $.forgot_password_container.visible = true;

    emptyTextFieldValues();
}

/*
 * forgot label touch effect
 */
touchEffect.createTouchEffect($.signin_forgot_lbl, "#a6000000", "#000000");
/*
 * login label touch effect
 */
touchEffect.createTouchEffect($.signin_login_lbl, "#a6ffffff", "#ffffff");
/*
 * register label touch effect
 */
touchEffect.createTouchEffect($.signin_register_lbl, "#a68b8b8c", "#8b8b8c");
/*
 * facebook and google+ label touch effect
 */
touchEffect.createTouchEffect($.signin_facebook_lbl, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.signin_google_lbl, "#a6ffffff", "#ffffff");
/*
 * forgot password and cancel label touch effect
 */
touchEffect.createTouchEffect($.forgot_submit_lbl, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.forgot_cancel_lbl, "#a68b8b8c", "#8b8b8c");

// touchEffect.createTouchEffect($.cancel_lbl, "#a68b8b8c", "#8b8b8c");

$.forgot_cancel_lbl.addEventListener('click', function(e) {
    $.forgot_password_container.visible = false;
    $.main_login_container.visible = true;
    // $.signin_numbar_txt.setValue("");
    // $.signin_forgot_txt.setValue("");
    emptyTextFieldValues();
});


// $.cancel_lbl.addEventListener('click', function(e) {
	// Alloy.Globals.popWindowInNav();
	// $.signIn.close();
// });


// commented for time begin
// $.forgot_submit_lbl.addEventListener('click', function(e) {
// $.forgot_password_container.visible = false;
// $.guest_container.visible = true;
// });

// $.guest_cancel_lbl.addEventListener('click', function(e) {
// $.forgot_password_container.visible = true;
// $.guest_container.visible = false;
// });

/*
 * guest and cancel label touch effect
 */
touchEffect.createTouchEffect($.continue_guest_lbl, "#a6ffffff", "#ffffff");
//touchEffect.createTouchEffect($.guest_cancel_lbl, "#a68b8b8c","#8b8b8c");

//setTimeout(function(){ $.messageId.visible=false; }, 3000);

$.continue_guest_lbl.addEventListener('click', function(e) {
    $.guest_container.visible = false;
    emptyTextFieldValues();
    //$.otp_container.visible = true;
    Alloy.Globals.popWindowInNav();
    $.signIn.close();
    //Ti.API.info('args--->' + args);
    //Alloy.Globals.addWindowInNav(args);

});

/*
 * otp and cancel label touch effect
 */

touchEffect.createTouchEffect($.otp_resend_lbl, "#a6e65e48", "#e65e48");
touchEffect.createTouchEffect($.otp_submit_lbl, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.otp_cancel_lbl, "#a68b8b8c", "#8b8b8c");
/*
 * autofocus next textfield for entering otp number
 */

$.otp_no1.addEventListener('focus', function(e) {
    $.otp_no1.focus();
});

$.otp_no1.addEventListener('change', function(e) {

    if ($.otp_no1.value.length == 1) {
        $.otp_no2.focus();
    } else if ($.otp_no1.value.length == 0) {
        $.otp_no1.focus();
    }

});
$.otp_no2.addEventListener('change', function(e) {
    if ($.otp_no2.value.length == 1) {
        $.otp_no3.focus();
    } else if ($.otp_no2.value.length == 0) {
        $.otp_no1.focus();
    }
});
$.otp_no3.addEventListener('change', function(e) {

    if ($.otp_no3.value.length == 1) {
        $.otp_no4.focus();
    } else if ($.otp_no3.value.length == 0) {
        $.otp_no2.focus();
    }
});
$.otp_no4.addEventListener('change', function(e) {

    if ($.otp_no4.value.length === 0) {
        $.otp_no3.focus();
    } else {
        $.otp_no4.blur();
        $.seperator4.backgroundColor = "#A1A39E";

    }
});

$.otp_cancel_lbl.addEventListener('click', function(e) {
    $.otp_container.visible = false;
    $.forgot_password_container.visible = true;
    emptyTextFieldValues();
    //$.guest_container.visible = true;
});

// $.otp_submit_lbl.addEventListener('click', function(e) {
// $.otp_container.visible = false;
// $.reset_password_container.visible = true;
// });

/*
 * reset password and cancel label touch effect
 */

touchEffect.createTouchEffect($.reset_lbl, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.reset_cancel_lbl, "#a68b8b8c", "#8b8b8c");

$.reset_cancel_lbl.addEventListener('click', function(e) {
    $.reset_password_container.visible = false;
    //$.otp_container.visible = true;
    $.forgot_password_container.setVisible(true);
    emptyTextFieldValues();
});

/*
 * register form =======================================================================================================
 */
$.signin_register_lbl.addEventListener('click', function(e) {
    $.main_login_container.visible = false;
    $.register_container.visible = true;
    emptyTextFieldValues();
});

/*
 * set attributestring to validation note label
 */

var text = "Note: All the following fields are mandatory";
var attr = Ti.UI.createAttributedString({
    text : text,
    attributes : [{
        type : Ti.UI.ATTRIBUTE_FONT,
        value : {
            fontSize : 12,
            fontFamily : 'futura_lt_bt_light-webfont',
            fontWeight : 'bold'
        },
        range : [text.indexOf('Note:'), ('Note:').length]
    }, {
        type : Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
        value : '#e64e48',
        range : [text.indexOf('Note:'), ('Note:').length]
    }]
});

$.noteLabel.attributedString = attr;

/*
 * set attributestring to terms & condition label
 */
/*
var terms = "By signing up, I agree to Terms & Condition";
var termsAttr = Ti.UI.createAttributedString({
    text : terms,
    attributes : [{
        type : Titanium.UI.ATTRIBUTE_LINK,
        value : "https://github.com/appcelerator/hyperloop",
        range : [terms.indexOf('Terms & Condition'), ('Terms & Condition').length]
    }, {
        type : Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
        value : 'orange',
        range : [terms.indexOf('Terms & Condition'), ('Terms & Condition').length]
    }]
});

$.terms_lbl.attributedString = termsAttr;
*/

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

function toggelTextField(e) {
    //Ti.API.info('focus');
    $.register_first_seperator.backgroundColor = "transparent";
    $.register_last_seperator.backgroundColor = "transparent";
    $.register_email_seperator.backgroundColor = "transparent";
    $.register_phone_seperator.backgroundColor = "transparent";
    $.register_password_seperator.backgroundColor = "transparent";

    switch(e.source.id) {
    case "register_password_txt": {
        $.register_password_seperator.backgroundColor = "#A1A39E";
        break;
    }
    case "register_phone_txt": {
        $.register_phone_seperator.backgroundColor = "#A1A39E";
        break;
    }
    case "register_email_txt": {
        $.register_email_seperator.backgroundColor = "#A1A39E";
        break;
    }
    case "register_last_txt": {
        $.register_last_seperator.backgroundColor = "#A1A39E";
        break;
    }
    case "register_first_txt": {
        $.register_first_seperator.backgroundColor = "#A1A39E";
        break;
    }

    };

}

var excellent = /^[A-Za-z0-9-]+[ 0-9A-Za-z#$%=@!{},`~&*()'<>?.:;_|^/+\t\r\n\[\]"-]*$/;
var NameRegEx = /^[a-zA-Z ]*$/;
var name_number = /^([A-Za-z0-9_\-\.])*$/;

$.register_password_txt.addEventListener('blur', function(e) {
    $.slider.width = $.slider.getWidth();
});

$.register_password_txt.addEventListener('change', function(e) {

    if ($.register_password_txt.value.length == 0) {
        $.showpassword_lbl.setVisible(false);

    } else {
        $.showpassword_lbl.setVisible(true);
    }

    if ($.register_password_txt.value == "" || $.register_password_txt.value == null) {
        $.slider.width = "";
        $.strengthStatus.text = "";
        $.sliderContainer.backgroundColor = "transparent";

    }

    if (NameRegEx.test($.register_password_txt.value) && $.register_password_txt.value.length == 3) {
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
    } else {
        $.slider.width = $.slider.getWidth();
    }
});

/*
 * register and cancel label touch effect
 */
touchEffect.createTouchEffect($.register_signup_lbl, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.register_cancel_lbl, "#a6ffa500", "#ffa500");

$.register_cancel_lbl.addEventListener('click', function(e) {
    $.register_container.visible = false;
    $.main_login_container.visible = true;
    emptyTextFieldValues();
});

/***************************************************************************New Method added below*/

function GoToBack() {

    if (!isLoader) {

        emptyTextFieldValues();

        //Ti.API.info('android back event trigger');

        if ($.forgot_password_container.getVisible()) {
            $.main_login_container.setVisible(true);
            $.forgot_password_container.setVisible(false);

        } else if ($.guest_container.getVisible()) {
            $.forgot_password_container.setVisible(true);
            $.guest_container.setVisible(false);

        } else if ($.otp_container.getVisible()) {
            return;
        } else if ($.reset_password_container.getVisible()) {
            //$.otp_container.setVisible(true);
            $.forgot_password_container.setVisible(true);
            $.reset_password_container.setVisible(false);

        } else if ($.register_container.getVisible()) {
            $.main_login_container.setVisible(true);
            $.register_container.setVisible(false);
        } else if ($.main_login_container.getVisible()) {
            //$.main_login_container.setVisible(false);
           // Alloy.Globals.popWindowInNav();
          //  $.signIn.close();
          //  Alloy.Globals.destroyWindowInNav();
        }
    }

}

function navigatedToSignUp() {
    $.main_login_container.setVisible(true);
    //    $.guest_container.setVisible(false);
    $.reset_password_container.setVisible(false);
}

function navigatedToForgotPassword() {
    $.forgot_password_container.setVisible(true);
    $.guest_container.setVisible(false);
}

function registerUser() {
    //Ti.API.info('check--> ' + $.check.getText());
    
    var email= {
        value:$.register_email_txt.getValue().toLowerCase(),
    };

    if (!validators.RegularExpressionName($.register_first_txt)) {
        showAlert($.register_container, "Enter a valid first name");
        $.register_first_txt.focus();
    } else if (!validators.RegularExpressionName($.register_last_txt)) {
        showAlert($.register_container, "Enter a vaild last name");
        $.register_last_txt.focus();
    } else if (!validators.RegularExpressionEmail(email)) {
        showAlert($.register_container, "Enter a vaild email id");
        $.register_email_txt.focus();
    } else if ($.male.getColor() === "#33000000" && $.female.getColor() === "#33000000" && $.other.getColor() === "#33000000") {
        showAlert($.register_container, "Please select gender");     
    }else if ($.dob_date.date == undefined || $.dob_date.text == "DD"){
        showAlert($.register_container, "Please select DOB");
    }
    /*
    else if (!validators.RegularExpressionMobileNumber($.register_phone_txt)) {
        showAlert($.register_container, "Enter a vaild mobile number");
        $.register_phone_txt.focus();
    }
    */
     else if (!validators.RegularExpressionPassword($.register_password_txt)) {
        showAlert($.register_container, "Enter a vaild Password");
        $.register_password_txt.focus();
    }
    
     // else if ($.check.getText() == "") {
        // showAlert($.register_container, "Please accept the Term and Condition");
    // }
    
     else {
         
        
        var _gender=null;
        if ($.male.getColor() === Alloy.Globals.labelTitleColor) {
            _gender = "1";
        } else if ($.female.getColor() === Alloy.Globals.labelTitleColor) {
            _gender = "2";
        }else if ($.other.getColor() === Alloy.Globals.labelTitleColor) {
            _gender = "3";
        }
        
        var url = Alloy.Globals.commonUrl.register;

        var params = {
            firstname : $.register_first_txt.getValue(),
            lastname : $.register_last_txt.getValue(), 
            email : $.register_email_txt.getValue(),
            password : $.register_password_txt.getValue(),
            confirm_password : $.register_password_txt.getValue(),
            contact_number : $.register_phone_txt.getValue(),
            dob : ($.dob_date.date == undefined ? "" : moment($.dob_date.date).format('YYYY-MM-DD')),
            gender : _gender,
            
        };

        var requestParams = JSON.stringify(params);
     
        showFullLoader($.register_container);
        isLoader = true;
        Alloy.Globals.webServiceCall(url, requestParams, registerUserSuccessCallback, registerUserErrorCallback, "POST", $.signIn);

    }
}

function registerUserSuccessCallback(e) {
    //Ti.API.info('into register success');
    hideFullLoader();
    isLoader = false;
    try {
        // response processing here
        var responseData = e;
        //Ti.API.info('registerUser response--->' + JSON.stringify(e));
        showAlert($.register_container, responseData.message);

        Ti.App.Properties.setString("email", responseData.data.email);

        $.signin_email_txt.setValue(responseData.data.email);
        $.signin_password_txt.setValue("");

        setTimeout(function() {
                $.signin_email_txt.setValue($.register_email_txt.getValue()); 
                $.signin_password_txt.setValue($.register_password_txt.getValue()); 
                loginUser();
            
            //$.signIn.fireEvent("android:back");
        }, 500);

        // navigate to Login Screen

    } catch(ex) {
        Ti.API.info(ex.message);
    }
}

function registerUserErrorCallback(e) {
    //alert("Response Error");
    //Ti.API.info('into register error-->');
    hideFullLoader();
    isLoader = false;
    showAlert($.register_container, e.message);
}

$.signin_login_lbl.addEventListener('click', loginUser);

function loginUser() {

    var pwd = ($.signin_password_txt.getValue()).toString();
    
    
     var email = {
        value:($.signin_email_txt.getValue()).toLowerCase(),
    };
    

    if ((!validators.RegularExpressionEmail_Mobile(email))) {
        showAlert($.main_login_container, "Please enter a valid email Id / mobile number");
        $.signin_email_txt.focus();
    } else if (pwd.trim() === "") {
        showAlert($.main_login_container, "Please enter a password");
        $.signin_password_txt.focus();
    } else {

        var url = Alloy.Globals.commonUrl.login;

        var params = {
            email : $.signin_email_txt.getValue(), //"test1@wwindia.com",
            password : $.signin_password_txt.getValue() //"123456"
        };

        var requestParams = JSON.stringify(params);

        //Ti.API.info('login requestParam--->' + requestParams);

        showFullLoader($.main_login_container);
        isLoader = true;
        Alloy.Globals.webServiceCall(url, requestParams, loginUserSuccessCallback, loginUserErrorCallback, "POST", $.signIn);

    }

}

function loginUserSuccessCallback(e) {
  
    isLoader = false;

    try {
        var responseData = e;
        //Ti.API.info('login response--->' + JSON.stringify(e));

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

        //Ti.API.info('fname-->' + Ti.App.Properties.getString("firstname"));
        //Ti.API.info('lastname-->' + Ti.App.Properties.getString("lastname"));
        //Ti.API.info('email-->' + Ti.App.Properties.getString("email"));
        //Ti.API.info('contact_number-->' + Ti.App.Properties.getString("contact_number"));
        //Ti.API.info('gender-->' + Ti.App.Properties.getString("gender"));
        //Ti.API.info('image-->' + Ti.App.Properties.getString("image"));
        //Ti.API.info('access_token-->' + Ti.App.Properties.getString("access_token"));
        //Ti.API.info('dob-->' + Ti.App.Properties.getString("dob"));
        //Ti.API.info('quote id = ' + Ti.App.Properties.getString("quote_id"));

       //Alloy.Globals.addWindowInNav("dashboard");
       Alloy.Globals.popWindowInNav();
       emptyTextFieldValues();
       $.signIn.close();
       Alloy.Globals.checkLogin();
        
        if (!isNullVal(args.listObject)) {

            // if ((args.listObject.bindId).toString().lastIndexOf("1") != -1) {
                // args.listObject.bindId = "gridCart1";
            // } else if ((args.listObject.bindId).toString().lastIndexOf("2") != -1) {
                // args.listObject.bindId = "gridCart2";
            // }
            
           
            //if(addToCartFlag==false){
                Ti.API.info('call add to cart');
                args.listViewReference(args.listObject);    
            //}
            
            

        }
        

        //Alloy.Globals.addWindowInNav(args);

    } catch(ex) {
        //alert("Something went wrong");
        Ti.API.info('login error---->' + ex.message);
    }
  hideFullLoader();
}

function loginUserErrorCallback(e) {
	Alloy.Globals.fb.logout();

    Alloy.Globals.googleAuth.deAuthorize(function(e) {
    }, $.signIn);
    
    
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

function selectTermNCondition() {
    /*
    if ($.check.getText() == Alloy.Globals.icon.tick) {
        $.check.setText("");
    } else {
        $.check.setText(Alloy.Globals.icon.tick);
    }
    */

}

function forgetPassword() {

    var requestMethod = Alloy.Globals.commonUrl.forgetPassword;

    var param = {};

    if (isResendOTP) {
        param = {
            contact_number : contact_number //$.signin_numbar_txt.getValue()
        };
        isEmail = false;
        isMobile = true;

        showFullLoader($.signIn);
        isLoader = true;
        var requestParams = JSON.stringify(param);
        //Ti.API.info('forget request Param--->' + requestParams);
        Alloy.Globals.webServiceCall(requestMethod, requestParams, forgetPasswordSuccessCallback, forgetPasswordErrorCallback, "POST", $.signIn);

    } else {
        // Ti.API.info('email value-->' + $.signin_forgot_txt.getValue().trim());
        // Ti.API.info('mobile value-->' + $.signin_numbar_txt.getValue().trim());

        //Ti.API.info('condition--->' + (($.signin_forgot_txt.getValue().trim() === "") && ($.signin_numbar_txt.getValue().trim() === "")));

        if (($.signin_forgot_txt.getValue().trim() === "") && ($.signin_numbar_txt.getValue().trim() === "")) {
            showAlert($.signIn, "Please enter a valid email id or mobile number");
            $.signin_forgot_txt.setValue("");
            $.signin_numbar_txt.setValue("");
        } else {

            if ($.signin_forgot_txt.getValue() != "") {
                if (!validators.RegularExpressionEmail($.signin_forgot_txt)) {
                    showAlert($.signIn, "Please enter a valid email id or mobile number");
                    $.signin_forgot_txt.focus();
                } else {
                    param = {
                        email : $.signin_forgot_txt.getValue()
                    };

                    isEmail = true;
                    isMobile = false;
                }

            }

            if ($.signin_numbar_txt.getValue() != "") {
                if (!validators.RegularExpressionMobileNumber($.signin_numbar_txt)) {
                    showAlert($.signIn, "Please enter a valid email id or mobile number");
                    $.signin_numbar_txt.focus();
                } else {
                    param = {
                        contact_number : $.signin_numbar_txt.getValue()
                    };
                    isEmail = false;
                    isMobile = true;
                    contact_number = $.signin_numbar_txt.getValue();

                }
            }

            showFullLoader($.signIn);
            isLoader = true;
            var requestParams = JSON.stringify(param);
            //Ti.API.info('forget request Param--->' + requestParams);
            Alloy.Globals.webServiceCall(requestMethod, requestParams, forgetPasswordSuccessCallback, forgetPasswordErrorCallback, "POST", $.signIn);

        }

    }

}

function forgetPasswordSuccessCallback(response) {
    /* TODO forget Password navigation */

    //Ti.API.info('forgetPassword success Response-->' + JSON.stringify(response));
    hideFullLoader();
    isLoader = false;

    emptyTextFieldValues();

    if (isEmail && !isMobile) {
        Ti.API.info('into isEmail condition');
        // display Guest Screen
        //$.guest_container.setVisible(true);
        // setTimeout(function() {
            // $.restMessageId.hide();
        // }, 5000);
        // $.forgot_password_container.setVisible(false);
        
        
      
        $.restMessageId1.show();
        
        setTimeout(function() {
          $.restMessageId1.hide();
        }, 5000);
        
        
       
        
        

    } else if (!isEmail && isMobile) {
        // OTP screen
        customer_id = response.data.customer_id;
        if (isResendOTP) {
            isResendOTP = false;
            $.otp_no1.focus();
            setTimeout(function() {
                $.otpMessageId.hide();
            }, 5000);

        } else {

            $.otp_container.setVisible(true);
            $.otp_no1.focus();
            setTimeout(function() {
                $.otpMessageId.hide();
            }, 5000);
            $.forgot_password_container.setVisible(false);
        }
    }

    // $.signin_numbar_txt.setValue("");
    // $.signin_forgot_txt.setValue("");

    //showAlert();

}

function forgetPasswordErrorCallback(response) {
    isLoader = false;
    Ti.API.info('forgetPassword error Response-->' + JSON.stringify(response));
    hideFullLoader();
    showAlert($.signIn, response.message);
}

function otpConfirmation() {

    // validation
    //otp_no1

    if ($.otp_no1.getValue().length === 0) {
        showAlert($.signIn, "Please enter a OTP");
        $.otp_no1.focus();
    } else if ($.otp_no2.getValue().length === 0) {
        showAlert($.signIn, "Please enter a OTP");
        $.otp_no1.focus();
    } else if ($.otp_no3.getValue().length === 0) {
        showAlert($.signIn, "Please enter a OTP");
        $.otp_no3.focus();
    } else if ($.otp_no4.getValue().length === 0) {
        showAlert($.signIn, "Please enter a OTP");
        $.otp_no4.focus();
    } else {

        var otpValue = $.otp_no1.getValue() + $.otp_no2.getValue() + $.otp_no3.getValue() + $.otp_no4.getValue();

        var param = {
            otp : otpValue,
            customer_id : customer_id
        };

        var requestMethod = Alloy.Globals.commonUrl.otpConfirmation;
        var requestParams = JSON.stringify(param);

        showFullLoader($.signIn);
        isLoader = true;
        //Ti.API.info('otp confirmation param---> ' + requestParams);
        Alloy.Globals.webServiceCall(requestMethod, requestParams, otpConfirmationSuccessCallback, otpConfirmationErrorCallback, "POST", $.signIn);
    }
}

function otpConfirmationSuccessCallback(response) {
    hideFullLoader();
    isLoader = false;
    if (response.data.otp_success === "true") {
        emptyTextFieldValues();
        $.otp_container.setVisible(false);
        $.reset_password_container.setVisible(true);

    } else {
        showAlert($.signIn, response.message);
    }

}

function otpConfirmationErrorCallback(response) {
    hideFullLoader();
    isLoader = false;
    showAlert($.signIn, response.message);
}

function setNewPassword() {

    if (!validators.RegularExpressionPassword($.signin_resetpassword_txt)) {
        showAlert($.signIn, "Please enter password minimum 7 characters including atleast 1 number");
        $.signin_resetpassword_txt.focus();
    } else if ($.signin_resetconfpassword_txt.getValue() != $.signin_resetpassword_txt.getValue()) {
        showAlert($.signIn, "Password mismatch.Please enter the same password both the fields");
        $.signin_resetconfpassword_txt.focus();
    } else {

        var requestMethod = Alloy.Globals.commonUrl.setNewPassword;

        var param = {
            new_password : $.signin_resetpassword_txt.getValue(),
            confirm_password : $.signin_resetconfpassword_txt.getValue(),
            customer_id : customer_id
        };
        var requestParams = JSON.stringify(param);

        showFullLoader($.signIn);
        isLoader = true;
        //Ti.API.info('resetPassword-->' + requestParams);

        Alloy.Globals.webServiceCall(requestMethod, requestParams, setNewPasswordSuccessCallback, setNewPasswordErrorCallback, "POST", $.signIn);
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
//    $.check.text = Alloy.Globals.icon.tick;

    $.otpMessageId.show();
    $.restMessageId.show();
    
    
    //NEW FIELD
    
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

    if (Ti.Platform.osname === "android") {
        Ti.UI.Android.hideSoftKeyboard();
    } else {
        if (Ti.App.keyboardVisible) {
            blurAllTxtField();
        }
    }

}

//$.check.setText(Alloy.Globals.icon.tick);
//$.check.fireEvent("click");

/* --------------facebook login  --------------*/

if (Ti.Platform.Android) {
    $.signIn.fbProxy = Alloy.Globals.fb.createActivityWorker({
        lifecycleContainer : $.signIn
    });
}

$.signin_facebook_lbl.addEventListener('click', facebookLogin);
 
/* call when user clicks on fb button */
function facebookLogin() {
    //Ti.API.info('started fb login');
    Alloy.Globals.fb.setPermissions('email', 'user_about_me', 'public_profile', 'user_birthday');
    Alloy.Globals.fb.initialize();
    if (Alloy.Globals.fb.loggedIn) {
        //Ti.API.info('logged in already');
        Alloy.Globals.fb.requestWithGraphPath('/me/', {
            "fields" : "email,first_name,last_name,birthday,gender,age_range "
        }, 'GET', function(e) {
            //Ti.API.info('e in graph ' + JSON.stringify(e));
            if (e.success) {
                //alert(e.result);
                Ti.API.info('user get successfully facebook login'+JSON.stringify(e));
               // facebookLoginSuccessCallback(e.result);
            } else if (e.error) {
                Ti.API.info('fb request cancel');
                alert(e.error);
            } else {
                Ti.API.info('fb request cancel');
                // alert('Unknown response');
            }
        });

    } else {
        Ti.API.info('please invoke login');
        Alloy.Globals.fb.authorize();
    }

    // Alloy.Globals.fb.authorize();

}

/* calls when user get successfully logged in  */
Alloy.Globals.fb.addEventListener('login', function(e) {
    //Ti.API.info('we are reached here');
    if (e.success) {
        //Ti.API.info('fb permissions ' + JSON.stringify(Alloy.Globals.fbpermissions));
        Alloy.Globals.fb.setPermissions('email', 'user_about_me', 'public_profile', 'user_birthday');
        
        Ti.API.info('Alloy.Globals.fb.getAccessToken() = '+Alloy.Globals.fb.getAccessToken());
        Ti.API.info('getUid == '+Alloy.Globals.fb.getUid());
        // Ti.API.info('presentShareDialog = ='+Alloy.Globals.fb.presentShareDialog({
            // link:"google.com",
            // title:"test",
            // description:"description1",
            // picture:"http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-check-icon.png"
        // }));
        Alloy.Globals.fb.requestWithGraphPath('/me', {
            "fields" : "email,first_name,last_name,birthday,gender,age_range"
        }, 'GET', function(e) {

            //Ti.API.info('e in graph ' + JSON.stringify(e));
            if (e.success) {
                //Ti.API.info('user get successfully facebook login when user not logged in');
               Ti.API.info('user get successfully facebook login=='+JSON.stringify(e));
                facebookLoginSuccessCallback(e.result);

            } else if (e.error) {
                //alert(e.error);
            } else {
                alert('Something went wrong Please try again');
            }
        });

    } else if (e.cancelled) {
        // user cancelled
        //Ti.API.info('user has cancelled');
        if (Alloy.Globals.fb.loggedIn) {
            //alert("logged in");
        }

    } else {
        Ti.API.info('user has got unexpected err');

        //alert(e.error);
    }
});
 
/* ---- calls after getting user data from facebook ----*/
function facebookLoginSuccessCallback(result) {
//Ti.API.info('user get successfully facebook login'+JSON.stringify(result));
    var parsedData = JSON.parse(result);
    //Ti.API.info('email id' + parsedData.email);
    //here we get all fb user details
    //calling login api
    var requestMethod = Alloy.Globals.commonUrl.social_login;
    var fbgender = "";
    if(!isNullVal(parsedData.gender)){
        if(parsedData.gender == "male"){
            fbgender = 1;
        }else if(parsedData.gender == "female"){
            fbgender = 2;
        }else{
            fbgender = 3;
        }
    }
                    
    var param = {
        email : parsedData.email,
        social_type : "fb",
        social_login_id : parsedData.id,
        firstname : parsedData.first_name,
        lastname : parsedData.last_name,
        birthday : parsedData.birthday||"",
        gender :fbgender,

    };
    var requestParams = JSON.stringify(param);

    //showLoader($.signIn);
    //isLoader = true;
    //Ti.API.info('fb sign up-->' + requestParams);

    Alloy.Globals.webServiceCall(requestMethod, requestParams, loginUserSuccessCallback, loginUserErrorCallback, "POST", $.signIn);

}

var googleAuth = Alloy.Globals.googleAuth;

$.signin_google_lbl.addEventListener('click', function(e) {

    //Ti.API.info('Authorized: ' + googleAuth.isAuthorized());
    googleAuth.isAuthorized(googleGetEmail, function() {
        //showFullLoader($.signIn);
        //Ti.API.info('Authorize google account...');
        googleAuth.authorize(googleGetEmail);
       // $.signin_google_lbl.fireEvent('click');
    });
});
 
function googleGetEmail()
{ 
    var xhrList = Ti.Network.createHTTPClient({
            // function called when the response data is available
            onload : function(e) {
                try {
                    //Ti.API.info(this.responseText);
                    var resp = JSON.parse(this.responseText);
                    Ti.API.info('resp = '+JSON.stringify(resp));
                    
                    var requestMethod = Alloy.Globals.commonUrl.social_login;
                    var gender = "";
                    if(!isNullVal(resp.gender)){
                        if(resp.gender == "male"){
                            gender = 1;
                        }else if(resp.gender == "female"){
                            gender = 2;
                        }else{
                            gender = 3;
                        }
                    }
                    
                    var param = {
                        email : resp.email,
                        social_type : "g",
                        social_login_id : resp.id,
                        firstname : resp.given_name,
                        lastname : resp.family_name,
                        birthday : "",
                        gender : gender,

                    };
                    var requestParams = JSON.stringify(param);

                    //showLoader($.signIn);
                    //isLoader = true;
                    //Ti.API.info('fb sign up-->' + requestParams);

                    Alloy.Globals.webServiceCall(requestMethod, requestParams, loginUserSuccessCallback, loginUserErrorCallback, "POST", $.signIn);

                } catch(e) {
                    Titanium.UI.createAlertDialog({
                        title : 'Error',
                        message : 'Can\'t load tasks for list'
                    });
                    Ti.API.error('RESPONSE: ' + JSON.stringify(e));
                }
               // hideFullLoader($.signIn);
            },
            // function called when an error occurs, including a timeout
            onerror : function(e) {
               // hideFullLoader($.signIn);
                Titanium.UI.createAlertDialog({
                    title : 'Error',
                    message : 'Can\'t load tasklists'
                });
                Ti.API.error('HTTP: ' + JSON.stringify(e));

            },
            timeout : 5000
        });
        showFullLoader($.signIn);
        xhrList.open("GET", 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + googleAuth.getAccessToken());
        xhrList.send();
}

function updateCount() {

	blurAllTxtField();
	
	//Ti.UI.Android.hideSoftKeyboard();
	
//	$.signin_email_txt.focus();
}

function clearMemory(){
    
    
    
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
