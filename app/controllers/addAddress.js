var args = arguments[0] || {};

//////Ti.API.info('edit parameters' + JSON.stringify(args));

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

function blurEffect(e) {
    if (e.source.type != "TextField") {
        $.fname.blur();
        $.lname.blur();
        $.phoneNo.blur();
        $.addressLine1.blur();
        $.addressLine2.blur();
        $.pinCode.blur();
        // $.cityDropDown.fireEvent('click');
        // $.stateDropDown.fireEvent('click');
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
    //var state = ['Maharashtra', 'Assam', 'Rajasthan', 'Goa'];

    //for (var i = 0; i < regionList.length; i++) {

    _.each(regionList, function(value, k) {
        var categoryLbl = Ti.UI.createLabel({

            width : Titanium.UI.FILL,
            left : "20dp",
            height : "40dp",
            color : "#ffffff",
            backgroundColor : "#595959",
            font : {
                fontSize : "11dp"
            },
            text : value.default_name.toUpperCase(),
            city : value.city,
            region_id : value.region_id,
            default_name : value.default_name

            // text : regionList[i].default_name,
            // city : regionList[i].city
            //text : state[i] //"sushant" + i,
            //touchEnabled:false
        });

        $.stateScroll.add(categoryLbl);
    });

}

function setCity(cityList) {

    //var city = ['Mumbai', 'Pune', 'Bangalore', 'Delhi', 'Nagpur', 'Indore'];

    var city = cityList.split(",");

    $.cityScroll.removeAllChildren();

    //////Ti.API.info('cityList-->' + city.length);

    //for (var i = 0; i < city.length; i++) {
    _.each(city, function(value, k) {
        var categoryLbl = Ti.UI.createLabel({

            width : Titanium.UI.FILL,
            left : "15dp",
            height : "40dp",
            color : "#ffffff",
            backgroundColor : "#595959",
            font : {
                fontSize : "11sp"
            },
            text : value.toUpperCase(),

            //text : city[i],//"sushant" + i,
            //touchEnabled:false
        });

        $.cityScroll.add(categoryLbl);
        // };
    });
}

//setCity();

var cityFlag = true;
var stateFlag = true;

$.cityDropDown.removeEventListener('click', selectCity);
$.cityDropDown.addEventListener('click', selectCity);

function selectCity(e) {
    Ti.UI.Android.hideSoftKeyboard();
    //$.transparentView.setTouchEnabled(true);

    //////Ti.API.info('e.source.text = ' + e.source.text);

    if ($.cityLbl.getText() === "CITY" && $.stateLbl.getText() === "STATE") {
        showAlert($.superView, "Please Select State");
    } else {
       
        if (cityFlag) {
            
            //$.cityDropDown.cardElevation="30";
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
            
            if (e.source.text) {
                //$.cityDropDown.cardElevation="0";
                $.cityLbl.text = e.source.text;
            }
            $.cityDropDownIcon.text = Alloy.Globals.icon.expandFill;
            $.cityDropDown.backgroundColor = "transparent";
            $.cityDropDown.height = "40dp";
            cityFlag = true;
        }

    }
}

$.stateDropDown.removeEventListener('click', selectState);
$.stateDropDown.addEventListener('click', selectState);

function selectState(e) {

    Ti.UI.Android.hideSoftKeyboard();
    //$.transparentView.setTouchEnabled(true);

    //////Ti.API.info('stateFlag--->' + stateFlag);
    // ////Ti.API.info('check state selection--- > ' + JSON.stringify(e.source));
    if (stateFlag) {
        //$.stateDropDown.cardElevation="30";
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
        ////Ti.API.info('e.source.text-->' + e.source.text);
        if (e.source.text) {
            //	$.stateDropDown.cardElevation="0";
            $.stateLbl.text = e.source.text;
            $.stateLbl.region_id = e.source.region_id;
            $.stateLbl.default_name = e.source.default_name;

            ////Ti.API.info('city-->' + e.source.city);

            setCity(e.source.city);
            $.cityLbl.setText("CITY");

        }
        $.stateDropDownIcon.text = Alloy.Globals.icon.expandFill;
        $.stateDropDown.backgroundColor = "transparent";
        $.stateDropDown.height = "40dp";
        stateFlag = true;
    }
}

$.addressCloseLbl.removeEventListener('click', closeAddress);
$.addressCloseLbl.addEventListener('click', closeAddress);

function closeAddress(e) {
    // $.superView.visible = false;
    
    $.fname.blur();
    $.lname.blur();
    $.phoneNo.blur();
    $.addressLine1.blur();
    $.addressLine2.blur();
    $.pinCode.blur();

    refreshAddress();

    if (args.isClose) {
        args.closeFunction();
    } else {
        hideShowView($.superView);
    }

    args.mainWindow.removeEventListener("android:back", closeAddress);
    args.closeAndroidBack();

}

/*New Method add below*/

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

    if (customerInfo.state != null) {

       // Ti.API.info('customerInfo.state--->' + customerInfo.state);

        var regionId = _.where(regionList, {
            "default_name" : ((customerInfo.state)).trim(),
        });

        //Ti.API.info('default_name--->' + JSON.stringify(regionId));

        if (regionId.length != 0) {
            //Ti.API.info('********** region_id *************' +regionId[0].region_id  +"\t " + JSON.stringify(regionId[0].region_id));
            
            $.stateLbl.region_id = ((regionId[0].region_id) || "");
            $.stateLbl.setText((regionId[0].default_name).toUpperCase());
            $.stateLbl.default_name = regionId[0].default_name;
        }

    }

    _.each(regionList, function(value, k) {
        if (value.default_name === customerInfo.state) {
            setCity(value.city);
        }
    });

}

function saveAddress() {

    if (!validators.RegularExpressionName($.fname)) {
        showAlert($.superView, "Please enter a valid first name");
        $.fname.focus();
    } else if (!validators.RegularExpressionName($.lname)) {
        showAlert($.superView, "Please enter a valid last name");
        $.lname.focus();
    } else if (!validators.RegularExpressionMobileNumber($.phoneNo)) {
        showAlert($.superView, "Please enter a valid mobile number");
        $.phoneNo.focus();
    } else if ($.stateLbl.getText() === "STATE") {
        showAlert($.superView, "Please select a state");
    } else if ($.cityLbl.getText() === "CITY") {
        showAlert($.superView, "Please select a city");
    } else if ($.addressLine1.getValue().trim() == "") {
        showAlert($.superView, "Please enter a valid address 1");
        $.addressLine1.getValue();
    } else if (!validators.RegularExpressionNumberPin($.pinCode)) {
        showAlert($.superView, "Please enter a valid pincode");
        $.pinCode.getValue();
    } else {

        if (args.isEdit) {
            editAddress();
        } else {
            addNewAddress();
        }
    }

}

function addNewAddress() {
    var requestMethod = Alloy.Globals.commonUrl.addNewAddress;

    var param = {
        //id : "15", //customerAddress.customer.id, //"24",
        firstname : $.fname.getValue(), //"Uttara",
        lastname : $.lname.getValue(), //"Deshpande",
        mobile : ($.phoneNo.getValue()), //1234432196, // Integer
        dob : (Ti.App.Properties.getString("dob") || null), //"2016-03-08",
        gender : (Ti.App.Properties.getString("gender") || null), //"2",
        email : (Ti.App.Properties.getString("email") || null), //"rupali.pemare@gmail.com",
        street1 : $.addressLine1.getValue(), //"ksdbfkbsdkfsf ",
        street2 : $.addressLine2.getValue(), //" dfgfthgjghj",
        city : $.cityLbl.getText(), //"Dombivli",
        state : $.stateLbl.region_id, //"maharashatra",
        pincode : $.pinCode.getValue(), //"410021",
        country_id : "IN", // hardcode for time begin
        is_billing : "0", // hardcode for time begin
        is_shipping : "0"// hardcode for time begin
    };

    var requestParam = JSON.stringify(param);

    showLoader($.superView);
    Alloy.Globals.webServiceCall(requestMethod, requestParam, addNewAddressSuccessCallback, addNewAddressErrorCallback, "POST", $.superView);
}

function addNewAddressSuccessCallback(response) {

    hideLoader();
    showAlert($.superView, response.message);
    setTimeout(function() {
        if (args.isClose) {
            ////Ti.API.info('into close');
        }
        else {
            $.addressCloseLbl.fireEvent('click');
        }
        //e.data.addresses
        // e.data.telephone = e.data.mobile;
        var obj = {
            "data" : {
                "addresses" : [response.data]
            }
        };
        args.displayAddressFunction(obj);
    }, 500);
}

function addNewAddressErrorCallback(response) {
    hideLoader();
    showAlert($.superView, response.message);
}

var param = {};




function editAddress() {

    var requestMethod = Alloy.Globals.commonUrl.editAddress;

    ////Ti.API.info('customerAddress.addresses.entity_id--->' + customerAddress.addresses.entity_id);

    param = {
        entity_id : customerAddress.addresses.entity_id,
        id : customerAddress.addresses.entity_id, //"24",
        firstname : $.fname.getValue(), //"Uttara",
        lastname : $.lname.getValue(), //"Deshpande",
        mobile : ($.phoneNo.getValue()), //1234432196, // Integer
        dob : (Ti.App.Properties.getString("dob") || ""), //"2016-03-08",
        gender : (Ti.App.Properties.getString("gender") || ""), //"1", //customerAddress.customer.gender, //"2",
        email : (Ti.App.Properties.getString("email") || ""), //customerAddress.customer.email, //"rupali.pemare@gmail.com",
        street1 : $.addressLine1.getValue(), //"ksdbfkbsdkfsf ",
        street2 : $.addressLine2.getValue(), //" dfgfthgjghj",
        city : $.cityLbl.getText(), //"Dombivli",
        state : $.stateLbl.region_id, //"maharashatra",
        pincode : $.pinCode.getValue(), //"410021",
        country_id : "IN", // hardcode for time begin
        is_billing : "0", // hardcode for time begin
        is_shipping : "0"// hardcode for time begin
    };

    var requestParam = JSON.stringify(param);
    //Ti.API.info('edit Address param--> ' + requestParam);

    showLoader($.superView);
    Alloy.Globals.webServiceCall(requestMethod, requestParam, editAddressSuccessCallback, editAddressErrorCallback, "POST", $.superView);

}

function editAddressSuccessCallback(response) {

    param.state = $.stateLbl.default_name;

    args.customerAddress.addresses = param;

    customerAddress = args.customerAddress;

    ////Ti.API.info('editAddress response-->' + JSON.stringify(response));
    hideLoader();
    //showAlert($.superView, response.message);

    setAttributeString();

    try {
        setTimeout(function() {
            // $.addressCloseLbl.fireEvent('click');
            var _parent = $.superView.parent;
            _parent.remove($.superView);
        }, 500);

    } catch(exp) {
        ////Ti.API.info('expection--->' + exp.message);
    }

}

function editAddressErrorCallback(response) {
    hideLoader();
    showAlert($.superView, response.message);
}

function setAttributeString() {
    try {

        var addressStreet = (($.addressLine1.getValue() || "") + ", " + ($.addressLine2.getValue() || "")).toUpperCase();
        var addressCity = (($.cityLbl.getText() || "") + " - " + ($.pinCode.getValue() || ""));
        var addressState = ($.stateLbl.getText() || "");
        var addressText = "";

        if (args.isFormat) {
            addressText = addressStreet + "\n" + addressCity + "\n" + addressState;

            args.addressLabel.setText(addressText);

            var attr = Ti.UI.createAttributedString({
                text : addressText,
                attributes : [{
                    type : Ti.UI.ATTRIBUTE_FONT,
                    value : {
                        color : "#000",
                        font : {
                            fontFamily : "futura_medium_bt-webfont"
                        }
                    },
                    range : [addressText.indexOf(addressCity), (addressCity).length]
                }, {
                    type : Ti.UI.ATTRIBUTE_FONT,
                    value : {
                        color : "#000",
                        font : {
                            fontFamily : "futura_medium_bt-webfont"
                        }
                    },
                    range : [addressText.indexOf(addressState), (addressState).length]
                }]
            });

            args.addressLabel.attributedString = attr;

        } else {
            addressStreet=  (($.addressLine1.getValue() || "") + ", " + ($.addressLine2.getValue() || ""));
            addressText = addressStreet + ", " + addressCity + ". " + $.stateLbl.default_name;
            args.editIcon.nameLabel.setText(($.fname.getValue()).capitalize() + " " + ($.lname.getValue()).capitalize());
            args.editIcon.mobileLabel.setText($.phoneNo.getValue());

            args.addressLabel.setText(addressText);
        }

    } catch(ex) {
        ////Ti.API.info('attribute String expection-->' + JSON.stringify(ex));
    }
}

function getRegionListing() {
    var requestMethod = Alloy.Globals.commonUrl.getRegionListing;
    var param = {
        country_id : "IN"
    };

    var requestParam = JSON.stringify(param);

    showLoader($.superView);

    Alloy.Globals.webServiceCall(requestMethod, requestParam, getRegionListingSuccessCallback, getRegionListingErrorCallback, "POST", $.superView, true);
}

function getRegionListingSuccessCallback(response) {
    regionList = response.data;

    setState();

    if (args.isEdit) {
        loadAsEditAddress();
    }

    hideLoader();
}

function getRegionListingErrorCallback(response) {
    hideLoader();
    showAlert($.superView, response.message);
}

function refreshAddress() {
    if (args.isEdit) {
        loadAsEditAddress();
    } else {
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

    switch(e.source.id) {

    case "fname": {
        $.lname.focus();
        break;
    }
    case "lname": {
        $.phoneNo.focus();
        break;
    }
    case "phoneNo": {
        $.phoneNo.blur();
        Ti.UI.Android.hideSoftKeyboard();

        break;
    }

    case "addressLine1": {
        $.addressLine2.focus();
        break;
    }
    case "addressLine2": {
        $.pinCode.focus();
        break;
    }
    case "pinCode": {
        $.pinCode.blur();
        Ti.UI.Android.hideSoftKeyboard();
        break;
    }

    }
}

function hideTransparentView(e) {
    //Ti.API.info('id--------->' + e.source.id);
    if (e.source.id === "transparentView") {

        //$.transparentView.setTouchEnabled(false);

        $.cityDropDownIcon.text = Alloy.Globals.icon.expandFill;
        $.cityDropDown.backgroundColor = "transparent";
        $.cityDropDown.height = "40dp";
        cityFlag = true;

        $.stateDropDownIcon.text = Alloy.Globals.icon.expandFill;
        $.stateDropDown.backgroundColor = "transparent";
        $.stateDropDown.height = "40dp";
        stateFlag = true;
    }
}


function hideKeyboard(){
    // $.fname.blur();
    // $.lname.blur();
    // $.phoneNo.blur();
    // $.addressLine1.blur();
    // $.addressLine2.blur();
    // $.pinCode.blur();
    
    Ti.UI.Android.hideSoftKeyboard();
}
