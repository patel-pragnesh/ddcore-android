var args = arguments[0] || {};

var responseData = null;
var isAddress = false;
var _gender = "",
    deleteRow = null,
    _border = null,
    newCustomerInfoObj = {},
    addressCount = 0,
    editAccountInfo = null;

loadMyAccountInfo();

$.myaccount_container.remove($.myaccount_info_edit);

touchEffect.createTouchEffect($.editProfile_btn, "#000", "#e64e48");
// require("touchEffects").createTouchEffect($.changePassword_btn, "#000", "#e64e48");

/*WS calling Method*/

function loadMyAccountInfo() {
	var requestMethod = Alloy.Globals.commonUrl.myAccount;
	//showLoader($.myaccount_container);
	showFullLoader($.myaccount_container);

	Alloy.Globals.webServiceCall(requestMethod, {}, myAccountSuccessCallback, myAccountErrorCallback, "POST", args.mainWindow);
}

function myAccountSuccessCallback(e) {
	try {

		responseData = e.data;

		if (!isAddress) {


			$.number_value_lbl.setText(responseData.customer.mobile || "-");
			Ti.App.Properties.setString("password", responseData.customer.password);

			if (!isNullVal(responseData.customer.dob) ) {
				var formateDate = moment(responseData.customer.dob).format('DD MMMM, YYYY');
				$.dob_value_lbl.setText(formateDate.toUpperCase());
			} else {
				$.dob_value_lbl.setText("- - -");
			}

			if (!isNullVal(responseData.customer.anniversary_date)) {
				var formateDate = moment(responseData.customer.anniversary_date).format('DD MMMM, YYYY');
				$.anniversary_value_lbl.setText(formateDate.toUpperCase());
			} else {
				$.anniversary_value_lbl.setText("- - -");
			}

			args.updateFunction(responseData);
			editAccountInfo = responseData;
			setAccountInfo(responseData);

			if (responseData.addresses.length === 0) {
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
				classes : "left0 widthFill",
				height : Ti.UI.SIZE,

			});

			var addressValue = $.UI.create("Label", {
				classes : "fontLight",
				width : "74%",
				wordWrap : true,
				left : "5%",
				top : "10dp",
				bottom : "10dp",
				color : "#000000",
				font : {
					fontSize : "12dp"
				},
			});

			var _addressResponse = value;

			var addressStreet = ((_addressResponse.street1 || "") + ", "+ (_addressResponse.street2 || "")).toUpperCase();
			var addressCity = ((_addressResponse.city || "") + " - " + (_addressResponse.pincode || "")).toUpperCase();
			var addressState = (_addressResponse.state || "").toUpperCase();

			var addressText = addressStreet + "\n" + addressCity + "\n" + addressState;

			var attr = Ti.UI.createAttributedString({
				text : addressText,
				attributes : [{
					type : Ti.UI.ATTRIBUTE_FONT,
					value : {
						color : "#000",
						fontFamily : "futura_medium_bt-webfont"

					},
					range : [addressText.indexOf(addressCity), (addressCity).length]
				}, {
					type : Ti.UI.ATTRIBUTE_FONT,
					value : {
						color : "#000",
						fontFamily : "futura_medium_bt-webfont"

					},
					range : [addressText.indexOf(addressState), (addressState).length]
				}]
			});

			addressValue.attributedString = attr;
			addressValue.setText(addressText);

			addressView.add(addressValue);

			var addressEdit = $.UI.create("Label", {
				classes : "iconFont",
				text : Alloy.Globals.icon.edit, 
				addressResponse : {
					customer : responseData.customer,
					addresses : value 
				},
				addressLabel : addressValue,
				width : "25dp",
				height : "15dp",
				right : "12%",
				top : "10dp",
				color : "#7e7d7d",
				font : {
					fontSize : "14dp"
				},
			});

			addressView.add(addressEdit);
			

			touchEffect.createTouchEffect(addressEdit, "#000", "#7e7d7d");
			addressEdit.addEventListener("click", navigateToEditAddress);

			var addressDelete = $.UI.create("Label", {
				classes : "iconFont",
				text : Alloy.Globals.icon.deleteIcon, 
				addressResponse : {
					customer : responseData.customer,
					addresses : value
				},
				addressLabel : addressValue,
				width : "25dp",
				height : "15dp",
				right : "5%",
				top : "10dp",
				color : "#7e7d7d",
				font : {
					fontSize : "14dp"
				},
				
				id : value.entity_id,
				rowRef : addressView,
			});
			addressView.add(addressDelete);
			touchEffect.createTouchEffect(addressDelete, "#000", "#7e7d7d");
			addressDelete.addEventListener("click", _deleteAddress);

			var border = $.UI.create("View", {
				classes : "border",
				
			});
			addressDelete.borderRef = border;

		
			$.addressContainer.add(addressView);
			$.addressContainer.add(border);

			

		});

		
		

	} catch(exp) {
		//Ti.API.info('address listing exception--->' + exp.message);
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

/*WS calling Method*/

/*event listner functions*/
function openEditProfileScreen(e) {
	//Ti.API.info('edit profile');

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

	if (lblValue === "Cancel") {
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
		//$.changePassword_container.setHeight("80dp");

	}

}

function hideChangePassword() {
	$.changePassword_btn.setText("Change");
	$.changePassword_container.setHeight("0");
	$.changePassword_container.setVisible(false);
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

	} else {

		obj = {
			day : $.anniversary_date,
			month : $.anniversary_month,
			year : $.anniversary_year,
			setDate : true
		};
	}

	var picker = Alloy.createController('pickerTemplate', obj).getView();

	//$.myaccount_container.parent.parent.parent.parent.add(picker);
	args.mainWindow.add(picker);
}

function showAddressPicker() {
	var picker = Alloy.createController('pickerTemplate', {
		isAddress : true
	}).getView();

	//$.myaccount_container.parent.parent.parent.parent.add(picker);
	args.mainWindow.add(picker);
}

/*below 3 functions are test function*/
function openDropdown() {
	var dropdown = Alloy.createController('dropdown', {
		mainContainer : $.myaccount_info_edit
	}).getView();
	//    $.myaccount_container.add(dropdown);
	//var dropDownContainer = Alloy.createController('dropdown').getView("dropdown");

	dropdown.top = "31";
	dropdown.left = "-12";
	dropdown.backgroundColor = "grey";
	dropdown.width = "44%";

	//dropdown.addEventListener("touchstart", dropDownScrollFunction);

	$.testContainer1.height = "140dp";
	$.testContainer2.add(dropdown);

	$.myaccount_info_edit.setScrollingEnabled(false);

}

function dropDownScrollFunction(e) {
	//Ti.API.info('into dropdown touchstart');
	$.myaccount_info_edit.setScrollingEnabled(false);
	//$.myaccount_info_edit.touchEnable=false;

}

function mainContainerScrollFunction(e) {
	$.myaccount_info_edit.setScrollingEnabled(true);
	//Ti.API.info('.');
	// Ti.API.info('into maincontainer touchstart');
	// Ti.API.info('e.source -->'+ e.source.id);
}

function navigateToEditAddress(e) {
	//Ti.API.info('e--->'+JSON.stringify(e.source.addressResponse));

	var addAddress = Alloy.createController("addAddress", {
		isEdit : true,
		customerAddress : e.source.addressResponse,
		addressLabel : e.source.addressLabel,
		isFormat : true,
		closeAndroidBack : args.closeAndroidBack,
		mainWindow : args.mainWindow,
	}).getView();

	//$.myaccount_container.parent.parent.parent.parent.parent.add(addAddress);

	addAddress.zIndex = 12;

	args.mainWindow.add(addAddress);

	addAddress.show();

	//Ti.API.info("navigateToEditAddress");
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

function showPassword(e) {
/*	
	
	if ($.previewPassword.getColor() === "#000") {
		//$.change_password_txt.setPasswordMask(true);
		$.previewPassword.setColor("#33000000");
		$.change_password_txt.setPasswordMask(false);
	} else {
		$.previewPassword.setColor("#000");
		$.change_password_txt.setPasswordMask(true);
	}
*/

if (e.source.id == "previewPassword") {

		if ($.previewPassword.getColor() === "#000") {
			//$.change_password_txt.setPasswordMask(true);
			$.previewPassword.setColor("#33000000");
			$.change_password_txt.setPasswordMask(false);
		} else {
			$.previewPassword.setColor("#000");
			$.change_password_txt.setPasswordMask(true);
		}
	} else if (e.source.id == "previewConfirmPassword") {
		
		if ($.previewConfirmPassword.getColor() === "#000") {
			//$.change_password_txt.setPasswordMask(true);
			$.previewConfirmPassword.setColor("#33000000");
			$.confirm_password_txt.setPasswordMask(false);
		} else {
			$.previewConfirmPassword.setColor("#000");
			$.confirm_password_txt.setPasswordMask(true);
		}
		
	}


}

function displayPasswordPreview(e) {
	
	/*
	var changePasswordTxt = $.change_password_txt.getValue();

	if (changePasswordTxt.length != 0) {
		$.previewPassword.setVisible(true);
		if ($.change_password_txt.getPasswordMask()) {
			$.previewPassword.setColor("#000");
		} else {
			$.previewPassword.setColor("#33000000");
		}
	} else {
		$.previewPassword.setVisible(false);
		//$.change_password_txt.setPasswordMask(true);
	}
	*/
	
	if (e.source.id == "change_password_txt") {

		var changePasswordTxt = $.change_password_txt.getValue();

		if (changePasswordTxt.length != 0) {
			$.previewPassword.setVisible(true);
			if ($.change_password_txt.getPasswordMask()) {
				$.previewPassword.setColor("#000");
			} else {
				$.previewPassword.setColor("#33000000");
			}
		} else {
			$.previewPassword.setVisible(false);
			//$.change_password_txt.setPasswordMask(true);
		}
	} else if (e.source.id == "confirm_password_txt") {

		var confirmPasswordTxt = $.confirm_password_txt.getValue();

		if (confirmPasswordTxt.length != 0) {
			$.previewConfirmPassword.setVisible(true);
			if ($.confirm_password_txt.getPasswordMask()) {
				$.previewConfirmPassword.setColor("#000");
			} else {
				$.previewConfirmPassword.setColor("#33000000");
			}
		} else {
			$.previewConfirmPassword.setVisible(false);
			//$.change_password_txt.setPasswordMask(true);
		}

	}

	
}

function updateAccountInfo() {
    hideKeyboard();
    
var correctPassword = true;
	if ($.male.getColor() === "#33000000" && $.female.getColor() === "#33000000" && $.other.getColor() === "#33000000") {
		showAlert(args.mainWindow, "Please select gender");
		//setTimeout(function(){
          $.myaccount_info_edit.scrollTo(0, 0);
        //},1000);
		
	} else if (!validators.RegularExpressionName($.fname_txt)) {
		showAlert(args.mainWindow, "Please enter a valid first name");
		 $.myaccount_info_edit.scrollTo(0, 0);
		setTimeout(function(){
          $.fname_txt.focus();
        },1000);
	} else if (!validators.RegularExpressionName($.lname_txt)) {
		showAlert(args.mainWindow, "Please enter a valid last name");
		 $.myaccount_info_edit.scrollTo(0, 0);
		setTimeout(function(){
         $.lname_txt.focus();
        },1000);
	} else if (!validators.RegularExpressionEmail($.email_txt)) {
		showAlert(args.mainWindow, "Please enter a valid email");
		 $.myaccount_info_edit.scrollTo(0, 0);
		setTimeout(function(){
         $.email_txt.focus();
        },1000);
	}else if ($.dob_date.date == undefined || $.dob_date.text == "DD"){
        showAlert(args.mainWindow, "Please select DOB");
    }

	
	/* else if (!validators.RegularExpressionMobileNumber($.number_txt)) {
		showAlert(args.mainWindow, "Please enter a valid mobile number");
		 $.myaccount_info_edit.scrollTo(0, 0);
		setTimeout(function(){
         $.number_txt.focus();
        },1000);
	}
	*/
	
	 else if (($.changePassword_btn.getText() === "Cancel") && (!validators.RegularExpressionPassword($.change_password_txt))) {
		showAlert(args.mainWindow, "Please enter password minimum 7 characters including atleast 1 number");
		correctPassword = false;
		setTimeout(function(){
         $.change_password_txt.focus();
        },1000);
	} 
	 else if ((correctPassword) && ($.changePassword_btn.getText() === "Cancel") && $.change_password_txt.getValue() != $.confirm_password_txt.getValue()) {
		//confirm_password_txt
		showAlert(args.mainWindow, "Confirm Password does not Match");
		

	}
	
	
	else {

		var requestMethod = Alloy.Globals.commonUrl.editAccount;

		if ($.male.getColor() === Alloy.Globals.labelTitleColor) {
			_gender = "1";
		} else if ($.female.getColor() === Alloy.Globals.labelTitleColor) {
			_gender = "2";
		}else if ($.other.getColor() === Alloy.Globals.labelTitleColor) {
            _gender = "3";
        }

		var param = {
			firstname : $.fname_txt.getValue(),
			lastname : $.lname_txt.getValue(),
			email : $.email_txt.getValue(),
			gender : _gender,
			mobile : $.number_txt.getValue(),
			//dob : (moment($.dob_date.date).format('YYYY-MM-DD') || ""),
			dob : ($.dob_date.date == "" ? "" : moment($.dob_date.date).format('YYYY-MM-DD')),
			password : Ti.App.Properties.getString("password"),
			new_password : $.change_password_txt.getValue(),
			//anniversary_date : (moment($.anniversary_date.date).format('YYYY-MM-DD') || "")
			anniversary_date : ($.anniversary_date.date == "" ? "" : moment($.anniversary_date.date).format('YYYY-MM-DD')),
			image : Ti.App.Properties.getString("image"),
		};

		newCustomerInfoObj = {
			customer : param
		};
		//Ti.API.info('dob date-->' + $.dob_date.date);
		//Ti.API.info('annivrsary date-->' + $.anniversary_date.date);

		var requestParam = JSON.stringify(param);

		//Ti.API.info('editAccount requestParam-->' + requestParam);

		//showLoader(args.mainWindow);
		showFullLoader($.myaccount_container);
		Alloy.Globals.webServiceCall(requestMethod, requestParam, editAccountSuccessCallback, editAccountErrorCallback, "POST", args.mainWindow);
	}
}

/*event listner functions*/

function editAccountSuccessCallback(e) {
	try {

		//Ti.API.info('editAccount Success-->' + JSON.stringify(e));

		Ti.App.Properties.setString("firstname", $.fname_txt.getValue());
		Ti.App.Properties.setString("lastname", $.lname_txt.getValue());
		Ti.App.Properties.setString("contact_number", $.number_txt.getValue());
		Ti.App.Properties.setString("gender", _gender);
		// var dob = moment($.dob_value_lbl.getText()).format('YYYY-MM-DD');
		// Ti.App.Properties.setString("dob", dob);

		args.updateFunction(newCustomerInfoObj, true);

		$.number_value_lbl.setText(newCustomerInfoObj.customer.mobile || "-");

		if (newCustomerInfoObj.customer.dob != "") {
			var formateDate = moment(newCustomerInfoObj.customer.dob).format('DD MMMM, YYYY');
			$.dob_value_lbl.setText(formateDate.toUpperCase());
		} else {
			$.dob_value_lbl.setText("- - -");
		}

		if (newCustomerInfoObj.customer.anniversary_date != "") {
			var formateDate = moment(newCustomerInfoObj.customer.anniversary_date).format('DD MMMM, YYYY');
			$.anniversary_value_lbl.setText(formateDate.toUpperCase());
		} else {
			$.anniversary_value_lbl.setText("- - -");
		}

		editAccountInfo = newCustomerInfoObj;
		setAccountInfo(newCustomerInfoObj);
		$.changePassword_btn.fireEvent("click");
		

		hideLoader();
		hideFullLoader();
		$.cancel_btn.fireEvent("click");
	} catch(exp) {
		//Ti.API.info('expection --->' + exp.message);
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

	if (customerInfo.gender === "1") {
		$.male.fireEvent("touchstart");
	} else if (customerInfo.gender === "2") {
		$.female.fireEvent("touchstart");
	}else if (customerInfo.gender === "3") {
        $.other.fireEvent("touchstart");
    } else {
		$.female.fireEvent("touchstart");
	}

	$.fname_txt.setValue(customerInfo.firstname || "");
	$.lname_txt.setValue(customerInfo.lastname || "");

	$.email_txt.setValue(customerInfo.email || "");

	if ($.email_txt.getValue() != "") {
		$.email_txt.setEditable(false);
		$.email_txt.setTouchEnabled(false);
		$.email_txt.setColor("#33000000");
	}

	$.number_txt.setValue(customerInfo.mobile || "");

	if (customerInfo.dob != "") {
		var _dob = moment(customerInfo.dob).format('YYYY-MM-DD');
		var getDob = _dob.split("-");
		$.dob_date.setText(getDob[2]);
		$.dob_month.setText(getDob[1]);
		$.dob_year.setText(getDob[0]);
		
		//$.dob_date.date = customerInfo.dob;
		$.dob_date.date = _dob;

	} else {
		$.dob_date.date = "";
		$.dob_date.setText("DD");
		$.dob_month.setText("MM");
		$.dob_year.setText("YYYY");
	}

	if (customerInfo.anniversary_date != "") {
		var _anniversary = moment(customerInfo.anniversary_date).format('YYYY-MM-DD');
		var getAnniversary = _anniversary.split("-");

		//Ti.API.info('getAnniversary[0]' + getAnniversary[0]);
		//Ti.API.info('getAnniversary[1]' + getAnniversary[1]);
		//Ti.API.info('getAnniversary[2]' + getAnniversary[2]);
		$.anniversary_date.setText(getAnniversary[2]);
		$.anniversary_month.setText(getAnniversary[1]);
		$.anniversary_year.setText(getAnniversary[0]);

		//$.anniversary_date.date = customerInfo.anniversary_date;
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
		id : e.source.id
	};

	var requestParam = JSON.stringify(param);

	args.mainWindow.add(Alloy.createController("confirmation", {
		requestMethod : requestMethod,
		requestParam : requestParam,
		successCallback : _deleteAddressSuccessCallback,
		errorCallback : _deleteAddressErrorCallback,
		windowContainer : args.mainWindow,
		message : "Are you sure you want to delete the address ?",
		productName : "",
		showLoader: showTransparentLoader,
	}).getView());
	
	
	/* commented for time begin
	deleteRow = e.source.rowRef;
	_border = e.source.borderRef;
	
	showFullLoader($.myaccount_container);
	var requestMethod = Alloy.Globals.commonUrl.deleteAddress;

	var param = {
		id : e.source.id
	};

	var requestParam = JSON.stringify(param);

	Alloy.Globals.webServiceCall(requestMethod, requestParam, _deleteAddressSuccessCallback, _deleteAddressErrorCallback, "POST", args.mainWindow);
	*/
	
}

function _deleteAddressSuccessCallback(e) {
	//Ti.API.info('into delete response---> ' + JSON.stringify(e));
	// scrView.remove(deleteRow);

	$.myaccount_info.remove(deleteRow);
	$.myaccount_info.remove(_border);

	addressCount--;
	if (addressCount == 0) {
		$.address_lbl.setVisible(false);
	}

	deleteRow = null;
	_border = null;
	// on success delete address row
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
	var addAddress = Alloy.createController('addAddress', {
		isEdit : false,
		displayAddressFunction : myAccountSuccessCallback,
		closeAndroidBack : args.closeAndroidBack,
		mainWindow : args.mainWindow,

	}).getView();

	args.mainWindow.add(addAddress);

	addAddress.zIndex = 12;
	addAddress.show();

	args.androidBack();

}

function hideKeyboard(e) {
	//if (Ti.Platform.osname === "android") {
	//if (e.source.type != "TextField") {

		Ti.UI.Android.hideSoftKeyboard();
	//}
	//}
}