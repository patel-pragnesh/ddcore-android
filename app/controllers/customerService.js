var args = arguments[0] || {};

var orderInfo = null;

if (!isNullVal(args.orderInfo)) {
	orderInfo = args.orderInfo;
	// Ti.API.info('orderInfo****'+ orderInfo.order_id);
	// Ti.API.info('productInfo****'+ orderInfo.product_id);

}

$.header.getView("cartContainer").setVisible(false);
$.header.getView("searchLbl").setVisible(false);
$.header.getView("overFlowMenuLbl").setVisible(false);

var orderNoFlag = true,
    reasonFlag = true,
    orderTypeFlag = true,
    orderItemFlag = true;

var allOrder = null;

$.reason.blur();

$.header.init({
	title : "CUSTOMER SERVICE",
	passWindow : $.customerService,
});

googleAnalyticsScreen("CUSTOMER SERVICE");

touchEffect.createTouchEffect($.phoneNo, "#a6e65e48", "#e65e48");
touchEffect.createTouchEffect($.email, "#a6e65e48", "#e65e48");

touchEffect.createTouchEffect($.orderNumber, "#a6a0a0a0", "#a0a0a0");
touchEffect.createTouchEffect($.reasonSelect, "#a6a0a0a0", "#a0a0a0");

touchEffect.createTouchEffect($.dropDown1, "#a6333333", "#333333");
touchEffect.createTouchEffect($.dropDown2, "#a6333333", "#333333");
touchEffect.createTouchEffect($.camera, "#a6333333", "#333333");

touchEffect.createTouchEffect($.submit, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.cancel, "#a6e65e48", "#e65e48");

init();

function init() {
	getCustomerServiceDetails();
}

function dial(e) {
	Ti.Platform.openURL("tel:" + e.source.getText());
}

function mailTo(e) {
	Ti.Platform.openURL("mailto:" + e.source.getText());
}

function setOrderStatus(data) {

	//_.each(data, function(value, k) {
	var x;
	for (x in data) {

		var orderTypeLbl = $.UI.create("Label", {
			classes : 'fontLight inputText',
			width : Titanium.UI.FILL,
			// text : "bhupendra : " + i,
			text : data[x].toUpperCase(),
			orderType : x,
			touchEnabled : true
		});

		//Ti.API.info('orderType******--> '+ x);

		var orderTypeSeparator = $.UI.create("View", {
			classes : 'horizontalSeparator',
			left : "10dp",
			right : "10dp",
			touchEnabled : false
		});
		$.orderTypeScroll.add(orderTypeLbl);
		$.orderTypeScroll.add(orderTypeSeparator);
		//});
	}
}

function setOrderNo(data) {
	try {
		//Ti.API.info('orderNo-->' + JSON.stringify(data));
		//for (var i = 0; i < data.length; i++) {
		$.orderNoScroll.removeAllChildren();

		_.each(data, function(value, k) {
			//Ti.API.info('value--->' + value.increment_id);
			var orderNoLbl = $.UI.create("Label", {
				classes : 'fontLight inputText',
				width : Titanium.UI.FILL,
				// text : "bhupendra : " + i,
				text : value.increment_id,
				orderId : value,
				touchEnabled : true,
				orderItems : value.order_items
			});

			var orderNoSeparator = $.UI.create("View", {
				classes : 'horizontalSeparator',
				left : "10dp",
				right : "10dp",
				touchEnabled : false
			});
			$.orderNoScroll.add(orderNoLbl);
			$.orderNoScroll.add(orderNoSeparator);
		});
		//};
	} catch(exp) {
		Ti.API.info('order number expcetion--->' + exp.message);
	}
}

function setOrderItem(data) {
	//var data= JSON.parse(_data);
	//Ti.API.info('data-->' + JSON.stringify(data));
	try {

		$.orderItemScroll.removeAllChildren();

		var orderItemLbl = $.UI.create("Label", {
			classes : 'fontLight inputText',
			width : Titanium.UI.FILL,

			text : "ALL PRODUCTS",

			touchEnabled : true,
			product_sku : "All Products"
		});

		var orderItemSeparator = $.UI.create("View", {
			classes : 'horizontalSeparator',
			left : "10dp",
			right : "10dp",
			touchEnabled : false
		});
		$.orderItemScroll.add(orderItemLbl);
		$.orderItemScroll.add(orderItemSeparator);

		_.each(data, function(value, k) {
			//Ti.API.info('k-->'+ k);

			var orderItemLbl = $.UI.create("Label", {
				classes : 'fontLight inputText',
				width : Titanium.UI.FILL,
				text : (value.product_name).toUpperCase(),
				touchEnabled : true,
				product_sku : (value.product_name + "(" + value.product_sku + ")")
			});

			var orderItemSeparator = $.UI.create("View", {
				classes : 'horizontalSeparator',
				left : "10dp",
				right : "10dp",
				touchEnabled : false
			});
			$.orderItemScroll.add(orderItemLbl);
			$.orderItemScroll.add(orderItemSeparator);

		});

	} catch(exp) {
		Ti.API.info('order product expcetion--->' + exp.message);
	}

}

function setReasons(data) {
	try {

		//for (var i = 0; i < 5; i++) {
		_.each(data, function(value, k) {

			var reasonsLbl = $.UI.create("Label", {
				classes : ['fontLight', 'inputText'],
				width : Titanium.UI.FILL,
				//text : "bhupendra : " + i,
				text : value,
				touchEnabled : true
			});

			var reasonsSeparator = $.UI.create("View", {
				classes : ['horizontalSeparator'],
				left : "10dp",
				right : "10dp",
				touchEnabled : false
			});
			$.reasonScroll.add(reasonsLbl);
			$.reasonScroll.add(reasonsSeparator);
		});
		//};
	} catch(exp) {
		Ti.API.info('resons expection-->' + exp.message);
	}

}

$.orderTypeDropDown.addEventListener('click', function(e) {
	if (orderTypeFlag) {
		$.orderTypeDropDown.backgroundColor = "#cccccc";
		$.orderType.color = "#ffffff";
		$.orderTypeScroll.height = "150";
		orderTypeFlag = false;
	} else {
		if (e.source.text && e.source.type != 'icon') {
			if ($.orderType.text != e.source.text) {
				$.orderNumber.setText("ORDER NUMBER");
				$.orderItem.setText("SELECT ORDER ITEM");

				$.orderType.text = e.source.text;
				$.orderType.key = e.source.orderType;

				var getAllOrder = allOrder;

				var filterData = _.where(getAllOrder, {
					"status" : $.orderType.key,

				});

				setOrderNo(filterData);
			}

		}
		$.orderType.color = "#a0a0a0";
		$.orderTypeDropDown.backgroundColor = "transparent";
		$.orderTypeScroll.height = "0";
		orderTypeFlag = true;
	}
});

$.orderNoDropDown.addEventListener('click', function(e) {
	if (orderNoFlag) {
		$.orderNoDropDown.backgroundColor = "#cccccc";
		$.orderNumber.color = "#ffffff";
		$.orderNoScroll.height = "150";
		orderNoFlag = false;
	} else {
		if (e.source.text && e.source.type != 'icon') {

			if ($.orderNumber.text != e.source.text) {

				$.orderItem.setText("SELECT ORDER ITEM");
			}

			$.orderNumber.text = e.source.text;

			//Ti.API.info('setOrderItem-->' + JSON.stringify(e.source.orderItems));
			if (e.source.orderItems != undefined) {
				setOrderItem(e.source.orderItems);
			}
		}
		$.orderNumber.color = "#a0a0a0";
		$.orderNoDropDown.backgroundColor = "transparent";
		$.orderNoScroll.height = "0";
		orderNoFlag = true;
	}
});

$.reasonDropDown.addEventListener('click', function(e) {
	if (reasonFlag) {
		$.reasonDropDown.backgroundColor = "#cccccc";
		$.reasonSelect.color = "#ffffff";
		$.reasonScroll.height = "150";
		reasonFlag = false;
	} else {
		if (e.source.text && e.source.type != 'icon') {
			$.reasonSelect.text = e.source.text;
		}
		$.reasonSelect.color = "#a0a0a0";
		$.reasonDropDown.backgroundColor = "transparent";
		$.reasonScroll.height = "0";
		reasonFlag = true;
	}
});

$.orderItemDropDown.addEventListener('click', function(e) {
	if (orderItemFlag) {
		$.orderItemDropDown.backgroundColor = "#cccccc";
		$.orderItem.color = "#ffffff";
		$.orderItemScroll.height = "150";
		orderItemFlag = false;
	} else {
		if (e.source.text && e.source.type != 'icon') {
			$.orderItem.text = e.source.text;
			$.orderItem.product_sku = e.source.product_sku;

		}
		$.orderItem.color = "#a0a0a0";
		$.orderItemDropDown.backgroundColor = "transparent";
		$.orderItemScroll.height = "0";
		orderItemFlag = true;
	}
});

/*****/

$.cancel.addEventListener('click', function() {
	goToBack();
});

function getCustomerServiceDetails() {

	showLoader($.customerService);
	var requestMethod = Alloy.Globals.commonUrl.getCustomerServiceDetails;
	Alloy.Globals.webServiceCall(requestMethod, {}, getCustomerServiceDetailsSuccessCallback, getCustomerServiceDetailsErrorCallback, "POST", $.customerService);

}

function getCustomerServiceDetailsSuccessCallback(response) {
	//Ti.API.info('customer service success -->' + JSON.stringify(response));

	$.email.setText(response.data.write_to_us);
	$.phoneNo.setText(response.data.buzz_us);

	//setOrderNo(response.data.open_orders);
	allOrder = response.data.all_orders;
	
	if(allOrder.length >0){
	    
	
	setOrderStatus(response.data.order_status);
	setReasons(response.data.what_is_it_about);

	selectOrderInfo(response);

	hideLoader();
	}
	else{
	     hideLoader();
        showAlert($.customerService, "No Orders");
	}
	
}

function getCustomerServiceDetailsErrorCallback(response) {
	//Ti.API.info('customer service error -->' + JSON.stringify(response));
	hideLoader();
	showAlert($.customerService, response.message);
}

function openCamera(e) {
	if (e.source.text === Alloy.Globals.icon.camera) {

		var cropping = require("cropping");
		cropping.callimagecrop($.attachedImage, $.customerService, {
			x : 5,
			y : 6
		}, changePhotoFunction);
	} else {
		// delete Image
		var deleteConfirmation = $.UI.create("AlertDialog", {
			message : 'Are you sure ?',
			title : 'Delete Image',
			cancel : 1,
			buttonNames : ['Yes', 'No'],
		});

		deleteConfirmation.addEventListener('click', function(ex) {
			if (ex.index === 0) {
				$.attachedImage.image = "";
				$.camera.setText(Alloy.Globals.icon.camera);
				deleteConfirmation = null;
			}
		});

		deleteConfirmation.show();
	}
}

function changePhotoFunction() {
	$.camera.setText(Alloy.Globals.icon.deleteIcon);
}

function saveCustomerService() {

	if ($.orderNumber.getText() === "ORDER NUMBER") {
		showAlert($.customerService, "Please Select the Order No.");
	} else if ($.orderNumber.getText() === "SELECT ORDER ITEM") {
		showAlert($.customerService, "Please Select the Order Item");
	} else if ($.reasonSelect.getText() === "WHAT IS IT ABOUT?") {
		showAlert($.customerService, "Please Select Question ");
	} else {

		var base64String = "";

		if ($.camera.getText() === Alloy.Globals.icon.deleteIcon) {
			base64String = Ti.Utils.base64encode($.attachedImage.image).toString();
		}

		showLoader($.customerService);
		var requestMethod = Alloy.Globals.commonUrl.saveCustomerService;

		var param = {
			order_number : $.orderNumber.getText(),
			quiz_about : $.reasonSelect.getText(),
			note : $.reason.getValue(),
			base_image : base64String,
			order_item : $.orderItem.product_sku
		};

		var requestParameter = JSON.stringify(param);
		//Ti.API.info('request paramter--->' + requestParameter);
		Alloy.Globals.webServiceCall(requestMethod, requestParameter, saveCustomerServiceSuccessCallback, saveCustomerServiceErrorCallback, "POST", $.customerService);
	}
}

function saveCustomerServiceSuccessCallback(response) {
	hideLoader();
	showAlert($.customerService, response.message);

	setTimeout(function() {
		goToBack();
	}, 600);

}

function saveCustomerServiceErrorCallback(response) {
	Ti.API.info('save customer service error -->' + JSON.stringify(response));
	hideLoader();
	showAlert($.customerService, response.message);
}

function cleanUp() {
	//Ti.API.info('into clean Up');
	 
	$.customerService.remove($.superScroll);
	
	$.superScroll.removeAllChildren();
	$.removeListener();
	args = {};
	orderNoFlag = null,
	reasonFlag = null;
	 $.destroy();
	
}

function hideKeyboard() {

	if (Ti.Platform.osname === "android") {
		Ti.UI.Android.hideSoftKeyboard();
	} else {
		if (Ti.App.keyboardVisible) {
			$.reason.blur();
		}
	}

}

function goToBack() {
	Alloy.Globals.popWindowInNav();
	$.customerService.close();
}

function updateCount() {
	//$.header.updateCartCount();
}

function selectOrderInfo(response) {
	var data = response.data;
	if (orderInfo != null) {

		var orderStatus = data.order_status;
		var getOrderStatus = _.pick(orderStatus, orderInfo.order_status);
		var orderStatus0 = (_.values(getOrderStatus)).toString();
		var orderStatus1 = _.keys(getOrderStatus);
		$.orderType.setText((orderStatus0).toUpperCase());
		$.orderType.key = orderStatus1.toString();
		$.orderType.setColor("#a0a0a0");
		orderTypeFlag = true;

		var getAllOrder = allOrder;
		var filterData = _.where(getAllOrder, {
			"status" : $.orderType.key,
		});
		//$.orderTypeDropDown.fireEvent("click");
		setOrderNo(filterData);

		$.orderNumber.setText(orderInfo.order_id);
		$.orderNumber.setColor("#a0a0a0");
		orderNoFlag = true;

		var productData = _.findWhere(filterData, {
			"increment_id" : orderInfo.order_id
		});

		//Ti.API.info('product_id--->'+ orderInfo.product_id);

		var productDetail = _.findWhere(productData.order_items, {
			product_id : orderInfo.product_id,
		});
		
		
		// $.orderItem.text = (productDetail.product_name).toUpperCase();
		// $.orderItem.product_sku = (productDetail.product_name + "(" + productDetail.product_sku + ")");
		
		if ($.orderType.key == "cancelation_requested" || $.orderType.key == "dispatched") {
			$.orderItem.text = "ALL PRODUCTS";
			$.orderItem.product_sku = "All Products";
		} else {

			$.orderItem.text = (productDetail.product_name).toUpperCase();
			$.orderItem.product_sku = (productDetail.product_name + "(" + productDetail.product_sku + ")");
		}
		
		
		setOrderItem(productData.order_items);

		orderItemFlag = false;

	}
}

//$.reason.blur();
hideKeyboard();
