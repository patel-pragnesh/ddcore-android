var args = arguments[0] || {};

var deleteRow,
    isAndroidBack = true,addressFlag = null,shippingId = null;
$.header.getView("cartContainer").setVisible(false);
$.header.getView("searchLbl").setVisible(false);
$.header.getView("overFlowMenuLbl").setVisible(false);
$.header.init({
	title : "SELECT ADDRESS",
	passWindow : $.addressListing,
});
$.header.updateCartCount();

touchEffect.createTouchEffect($.backToBagLbl, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.reviewLbl, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.addAddressLbl, "#a6000000", "#000000");

$.backToBagLbl.width = (Alloy.Globals.platformWidth / 2);
$.reviewLbl.width = (Alloy.Globals.platformWidth / 2);
var quote_id = "";
quote_id = Ti.App.Properties.getString("quote_id");
var addressMainContainer = [],
    checkLbl = [],
    innerView = null,
    name = null,
    phoneNo = null,
    addressDetails = null,
    subContainer = null,
    seperator = null,
    deleteIcon = null,
    shippingAddress_Id = "",
    billingAddress_Id = "",
    editIcon = null;

var scrView = Ti.UI.createScrollView({
	width : Ti.UI.FILL,
	height : Ti.UI.FILL,
	layout : "vertical",
	scrollType : "vertical",
});

viewAddress();

function displayAddress(e) {
	////Ti.API.info('view Address response --> ' + JSON.stringify(e));
	
	
	
	// for (var i = 0; i < checkLbl.length; i++) {
            // checkLbl[i].color = "#ffffff";
    // }
    

	var responseData = e.data.addresses;
	if (!isNullVal(responseData)) {
		$.emptyAddressLbl.visible = false;
	} else {
		$.emptyAddressLbl.visible = true;
	}

	_.each(responseData, function(value, i) {
		//for (var i = 0; i < responseData.length; i++) {

		addressMainContainer[i] = Ti.UI.createView({
			width : Ti.UI.FILL,
			height : Ti.UI.SIZE,
			layout : "vertical",
			//	borderColor:"red",
			top : "0dp",
			type : "row",
			address_id : value.entity_id
		});

		subContainer = Ti.UI.createView({
			width : Ti.UI.FILL,
			height : Ti.UI.SIZE, //100
			top : "0dp",
			touchEnabled : false
		});

		addressMainContainer[i].add(subContainer);
		seperator = Ti.UI.createView({
			width : Ti.UI.FILL,
			right : "20dp",
			left : "20dp",
			height : "1dp",
			top : "10dp",
			backgroundColor : "#e7e7e7",
			touchEnabled : false

		});
		addressMainContainer[i].add(seperator);

		checkLbl[i] = Ti.UI.createLabel({
			width : "15dp",
			height : "15dp",
			top : "10dp",
			left : "20dp",
			id : i,
			text : Alloy.Globals.icon.tick,
			font : {
				fontSize : "14dp",
				fontFamily : "icomoon"
			},
			color : "#ffffff",
			//borderColor : "red",
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
			touchEnabled : false
		});
		subContainer.add(checkLbl[i]);

		innerView = Ti.UI.createView({
			width : Ti.UI.FILL,
			right : "20dp",
			height : Ti.UI.FILL,
			left : "45dp",
			top : "10dp",
			borderColor : "transparent",
			borderWidth : "0.0",
			touchEnabled : false
		});
		subContainer.add(innerView);

		name = Ti.UI.createLabel({
			left : "0dp",
			top : "0dp",
			width : "60%",
			height : "15dp",
			font : {
				fontSize : "13dp",
				fontFamily : "futura-hv-bt-heavy"
			},
			text : (value.firstname || ""), //"SUSHANT INDULKAR",
			color : "#e65e48",
			//borderColor : "red",
			touchEnabled : false
		});
		innerView.add(name);
		phoneNo = Ti.UI.createLabel({
			left : "0dp",
			top : "20dp",
			width : "60%",
			height : "15dp",
			font : {
				fontSize : "11dp",
				fontFamily : "futura_medium_bt-webfont"
			},
			color : "#333333",
			text : (value.mobile || ""), //"9845675125",
			//borderColor : "red",
			touchEnabled : false
		});
		innerView.add(phoneNo);

		var addressText = (value.street1 || "") + " " + (value.street2 || "") + " " + ((value.city || "") + " - " + (value.pincode || "")) + " " + (value.state || "");

		addressDetails = Ti.UI.createLabel({
			left : "0dp",
			top : "40dp",
			width : "90%",
			height : Ti.UI.SIZE,
			font : {
				fontSize : "12dp",
				fontFamily : "futura_lt_bt_light-webfont"
			},
			color : "#7e7d7d",
			text : addressText, //"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
			//borderColor : "red",
			touchEnabled : false
		});
		innerView.add(addressDetails);

		editIcon = Ti.UI.createLabel({
			width : "25dp",
			height : "25dp",
			// right : "30dp",
			right : "5dp",
			top : "0dp",
			text : Alloy.Globals.icon.edit,
			font : {
				fontSize : "15dp",
				fontFamily : "icomoon"
			},
			color : "#7e7d7d",
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
			//touchEnabled : false,
			addressResponse : {
				//customer : responseData.customer,
				addresses : value
			},
			addressLabel : addressDetails,
			nameLabel : name,
			mobileLabel : phoneNo,
			type : "edit",
		});
		innerView.add(editIcon);

		scrView.add(addressMainContainer[i]);

	});
	$.addressContainer.add(scrView);
	
	if(addressFlag){
       checkLbl[responseData.length-1].color = "#e65e48";
       var currentId= ((responseData.length)-1);
       //shippingAddress_Id = addressMainContainer[currentId].address_id;
        
      // checkLbl[shippingId].color = "#e65e48";
       
       if (billingFlag) {
            $.billingContainer.visible = false;
            billingAddress_Id = addressMainContainer[currentId].address_id;
        }else{
             shippingId =  checkLbl[responseData.length-1].id;
             shippingAddress_Id = addressMainContainer[currentId].address_id;
             billingAddress_Id = addressMainContainer[currentId].address_id;
             $.billingContainer.visible = true;
        }
    }
    
    Ti.API.info('shippingAddress_Id = ' + shippingAddress_Id + "billingAddress_Id = " + billingAddress_Id);
}

//displayAddress();

/* Commented for time begin*/

scrView.addEventListener("click", addressSelectionEffect);

function addressSelectionEffect(e) {
	//////Ti.API.info('e===' + JSON.stringify(e.source.children[0].children[0]));

	//////Ti.API.info('value-->' + e.source.type);

	if (e.source.type === "row") {
		for (var i = 0; i < checkLbl.length; i++) {
			checkLbl[i].color = "#ffffff";
		}
		checkLbl[e.source.children[0].children[0].id].color = "#e65e48";

		if ($.backToBagLbl.getText() == "BACK TO BAG") {
		    shippingId = e.source.children[0].children[0].id;
			shippingAddress_Id = e.source.address_id;
			billingAddress_Id = e.source.address_id;
		} else {
			billingAddress_Id = e.source.address_id;
		}
    
        if(billingFlag){
            $.header.init({
            title : "BILLING ADDRESS",
            // passWindow : $.addressListing,
        });
        }else{
           // checkLbl[shippingId].color = "#e65e48";
            $.header.init({
            title : "SHIPPING ADDRESS",
            // passWindow : $.addressListing,
        });
        }
		

		if (!billingFlag) {
			$.billingContainer.visible = true;
		}
	} else if (e.source.type === "edit") {
		//Ti.API.info('into edit');
		navigateToEditAddress(e);
	} else if (e.source.type === "delete") {
		//Ti.API.info('into delete');
		// confirmation from message to user.

		deleteRow = e.source.rowRef;
		deleteAddress(e);
	}
}

var billingFlag;

$.billingContainer.addEventListener('click', billingHideShowEffect);

function billingHideShowEffect(e) {
	//Ti.API.info('e====' + JSON.stringify(e));
	if (e.source.children[0].type == "check" || e.source.children[1].type == "check") {
		if (e.source.children[0].color == "#e65e48") {
			billingFlag = true;
			$.backToBagLbl.text = "SHIPPING ADDRESS";
			$.header.init({
				title : "BILLING ADDRESS",
			});

			for (var i = 0; i < checkLbl.length; i++) {
				checkLbl[i].color = "#ffffff";
			}
			$.billingContainer.visible = false;
			billingAddress_Id = "";
		} else {
			e.source.children[0].color = "#e65e48";
		}
	};
}

$.backToBagLbl.addEventListener('click', backToBag);

function backToBag(e) {
	if (billingFlag) {
		for (var i = 0; i < checkLbl.length; i++) {
			checkLbl[i].color = "#ffffff";
		}
		$.billingContainer.visible = false;
		$.backToBagLbl.text = "BACK TO BAG";
		billingFlag = false;
        
        
        checkLbl[shippingId].color = "#e65e48";
        
		$.header.init({
			title : "SHIPPING ADDRESS",
		});
		//shippingAddress_Id = "";
		//billingAddress_Id = "";

	} else {
		Alloy.Globals.popWindowInNav();
		$.addressListing.close();
	}
}

$.reviewLbl.addEventListener('click', function(e) {

	Ti.API.info('shippingAddress_Id = ' + shippingAddress_Id + "billingAddress_Id = " + billingAddress_Id);
	if (shippingAddress_Id == "" || shippingAddress_Id == null) {
		showAlert($.addressListing, "Please select Shipping address");
	} else if (billingAddress_Id == "" || billingAddress_Id == null) {
		showAlert($.addressListing, "Please select Billing address");
	} else {
		// var reviewData = {
		// shipping_address : shippingAddress_Id,
		// billing_address : billingAddress_Id
		// };
		// Alloy.Globals.addWindowInNav("reviewOrder", reviewData);
		getReviewData();
	}
});

function getReviewData() {
	showLoader($.addressListing);
	var quote_id = Ti.App.Properties.getString("quote_id");
	var url = Alloy.Globals.commonUrl.reviewOrder;
	var data = {
		quoteId : quote_id,
		billingAddressId : billingAddress_Id,
		shippingAddressId : shippingAddress_Id
	};

	var requestParams = JSON.stringify(data);

	Alloy.Globals.webServiceCall(url, requestParams, getReviewDataSuccessCallback, getReviewDataErrorCallback, "POST", $.addressListing);
}

function getReviewDataSuccessCallback(e) {
	try {
		hideLoader($.addressListing);
		Alloy.Globals.addWindowInNav("reviewOrder", e);

	} catch(ex) {
		hideLoader($.addressListing);
		//Ti.API.info('catch = ' + ex.message);
	}
}



function getReviewDataErrorCallback(e) {
	hideLoader($.addressListing);
	showAlert($.addressListing, e.message);
	//goToBack();
}

$.addAddressLbl.addEventListener('click', function(e) {
	var addAddress = Alloy.createController('addAddress', {
		isEdit : false,
	//	displayAddressFunction : displayAddress,
	displayAddressFunction:viewAddress,
		closeAndroidBack : closeAndroidBack,
		mainWindow : $.addressListing,

		//customerAddress : e.source.addressResponse,
		//lbl : e.source.lbl
	}).getView();

	$.addressListing.add(addAddress);
	hideShowView(addAddress);
	isAndroidBack=false;
});

$.addressListing.addEventListener('click', hideOverFlowMenu);

function hideOverFlowMenu(e) {
	if (Alloy.Globals.overFlowFlag && e.source.id != "overFlowMenuLbl") {
		$.header.hideOverFlow();
	};
}

/*new method added here*/

function viewAddress(data) {
	//$.addressListing
    
    
    if (!isNullVal(data)) {
       addressFlag = true;
   }else{
        addressFlag = false;
   }
   
	showLoader($.addressListing);
	var requestMethod = Alloy.Globals.commonUrl.proceedToCheckout;

	var data = {
		quoteId : quote_id
	};
	var requestParams = JSON.stringify(data);
	Alloy.Globals.webServiceCall(requestMethod, requestParams, viewAddressSuccessCallback, viewAddressErrorCallback, "POST", $.addressListing);
	//viewAddressSuccessCallback();

}

function viewAddressSuccessCallback(e) {
	
	//$.amountLbl.setText(e.data.grand_total);
	var price1 = e.data.grand_total.split(".")[0];
	var price2 = e.data.grand_total.split(".")[1];
	var text = price1 + "." + price2;
	var attr = Ti.UI.createAttributedString({
		text : text,
		attributes : [{
			type : Ti.UI.ATTRIBUTE_FONT,
			value : {
				fontSize : 18,
				fontFamily : 'futura_lt_bt_light-webfont'
			},
			range : [text.indexOf(price2 + ""), (price2 + "").length]
		}]
	});

	$.amountLbl.attributedString = attr;

	//$.taxLbl.setText("+" + e.data.summary.price_label);
	if (!isNullVal(e.data.addresses)) {
	    
	    //$.addressContainer.remove(scrView);
	    scrView.removeAllChildren();
	    
		displayAddress(e);
	} else {
		$.emptyAddressLbl.visible = true;
	}
	
	hideLoader();
}

function viewAddressErrorCallback(e) {
	hideLoader();
	showAlert($.superView, e.message);
}

function navigateToEditAddress(e) {

	var addAddress = Alloy.createController("addAddress", {
		isEdit : true,
		customerAddress : e.source.addressResponse,
		addressLabel : e.source.addressLabel,
		editIcon : e.source,
		isFormat : false,
		closeAndroidBack : closeAndroidBack,
		mainWindow : $.addressListing,
	}).getView();

	//addAddress.zIndex = 12;

	$.addressListing.add(addAddress);
	addAddress.show();
	isAndroidBack=false;
}

function deleteAddress(e) {
	showLoader($.addressListing);
	var requestMethod = Alloy.Globals.commonUrl.deleteAddress;

	var param = {
		id : e.source.id
	};

	var requestParam = JSON.stringify(param);

	Alloy.Globals.webServiceCall(requestMethod, requestParam, deleteAddressSuccessCallback, deleteAddressErrorCallback, "POST", $.addressListing);
}

function deleteAddressSuccessCallback(e) {
	//Ti.API.info('into delete response---> ' + JSON.stringify(e));
	hideLoader();
	scrView.remove(deleteRow);
	deleteRow = null;
	// on success delete address row
}

function deleteAddressErrorCallback(e) {
	hideLoader();
	showAlert($.addressListing, e.message);
}

function goToBack() {
	if (isAndroidBack) {

		scrView.removeEventListener("click", addressSelectionEffect);
		$.billingContainer.removeEventListener('click', billingHideShowEffect);
		$.backToBagLbl.removeEventListener('click', backToBag);
		$.addressListing.removeEventListener('click', hideOverFlowMenu);
		args = {};
		Alloy.Globals.popWindowInNav();
		$.addressListing.close();
	}
}

function destroyWindow(e) {
	$.destroy();
}

function updateCount() {
	$.header.updateCartCount();
}

function closeAndroidBack() {
	isAndroidBack = false;
}

function clearMemory(){
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
