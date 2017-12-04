var args = arguments[0] || {};


touchEffect.createTouchEffect($.close_btn, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.action1, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.action2,"#a6e64e48", Alloy.Globals.labelTitleColor);

(args.mainWindow).addEventListener("android:back", closeCancelOrder);
args.androidBack();


//Ti.API.info('orderId*******************--->' + args.orderId);

// Below code commented for time beign
/*
var cancelOrderTitle = "ARE YOU SURE?";
var cancelOrderMessage = "Test Message for Order Cancelled. Please confirm you Order Status. Test Message";

var cancelMessage = cancelOrderTitle + "\n \n" + cancelOrderMessage;

$.cancelOrderMsgContainer.text = cancelMessage;

var attr = Ti.UI.createAttributedString({
text : cancelMessage,
attributes : [{
type : Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
value : Alloy.Globals.labelTitleColor,
range : [cancelMessage.indexOf(cancelOrderTitle), (cancelOrderTitle).length]
}, {
type : Ti.UI.ATTRIBUTE_FONT,
value : {
fontSize : "14sp"
},
range : [cancelMessage.indexOf(cancelOrderTitle), (cancelOrderTitle).length]
}, {
type : Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
value : "#fff",
range : [cancelMessage.indexOf(cancelOrderMessage), (cancelOrderMessage).length]
}, {
type : Ti.UI.ATTRIBUTE_FONT,
value : {
fontSize : "12sp"
},
range : [cancelMessage.indexOf(cancelOrderMessage), (cancelOrderMessage).length]
}]
});

$.cancelOrderMsgContainer.attributedString = attr;
*/

// New Message added
var cancelMessage = "You have opted to cancel this product.\n Are you sure you want to proceed?";
$.cancelOrderMsgContainer.text = cancelMessage;
$.cancelOrderMsgContainer.color = Alloy.Globals.labelTitleColor;

function updateAttributeString() {
	// Commented for time begin

	/*
	 var cancelOrderTitle = "ORDER SUCCESSFULLY CANCELLED";
	 var cancelOrderMessage = "Test Message for Order Cancelled. Please confirm you Order Status. Test Message";
	 var cancelOrderNumber = "XXXX XXXX 5678";
	 */

	var cancelOrderTitle = "ORDER SUCCESSFULLY CANCELLED";
	var cancelOrderMessage = "";
	var cancelOrderNumber = "XXXX XXXX 5678";

	//var cancelMessage = cancelOrderTitle + "\n \n" + cancelOrderMessage + "\n \n \n" + cancelOrderNumber;
	var cancelMessage = cancelOrderTitle + "\n \n" + cancelOrderMessage + "\n \n" + cancelOrderNumber;

	$.cancelOrderMsgContainer.text = cancelMessage;

	var attr = Ti.UI.createAttributedString({
		text : cancelMessage,
		attributes : [{
			type : Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
			value : Alloy.Globals.labelTitleColor,
			range : [cancelMessage.indexOf(cancelOrderTitle), (cancelOrderTitle).length]
		}, {
			type : Ti.UI.ATTRIBUTE_FONT,
			value : {
				fontSize : "14dp"
			},
			range : [cancelMessage.indexOf(cancelOrderTitle), (cancelOrderTitle).length]
		}, {
			type : Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
			value : "#fff",
			range : [cancelMessage.indexOf(cancelOrderMessage), (cancelOrderMessage).length]
		}, {
			type : Ti.UI.ATTRIBUTE_FONT,
			value : {
				fontSize : "12dp"
			},
			range : [cancelMessage.indexOf(cancelOrderMessage), (cancelOrderMessage).length]
		}, {
			type : Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
			value : "#fff",
			range : [cancelMessage.indexOf(cancelOrderNumber), (cancelOrderNumber).length]
		}, {
			type : Ti.UI.ATTRIBUTE_FONT,
			value : {
				fontSize : "22dp"
			},
			range : [cancelMessage.indexOf(cancelOrderNumber), (cancelOrderNumber).length]
		}]
	});

	$.cancelOrderMsgContainer.attributedString = attr;

}

function confirmOrderCancel() {
	// $.action1.text = "CONTIUNE SHOPPING";
	// $.action2.text = "MY ORDERS";
	// updateAttributeString();

	showFullLoader(args.mainWindow);
	var requestMethod = Alloy.Globals.commonUrl.cancelOrder;
	var param = {
		order_id : args.orderId
	};

	var requestParam = JSON.stringify(param);

	//Ti.API.info('cancel order param-->' + requestParam);
	Alloy.Globals.webServiceCall(requestMethod, requestParam, confirmOrderCancelSuccessCallback, confirmOrderCancelErrorCallback, "POST", args.mainWindow);
}

function confirmOrderCancelSuccessCallback(response) {
	hideFullLoader();
	showAlert(args.mainWindow, "Cancellation Requested Successfully");

	hideShowView($.cancelOrder);
	args.returnCancelSuccess(response);

	setTimeout(function() {
		// args.mainWindow.remove($.cancelOrder);
		// $.cancelOrder.removeAllChildren();
		var _parent = $.cancelOrder.parent;
		_parent.remove($.cancelOrder);
		$.cancelOrder.removeAllChildren();
	}, 1500);

}

function confirmOrderCancelErrorCallback(response) {
	hideFullLoader();
	showAlert(args.mainWindow, response.message);
	
	   setTimeout(function() {
      
        var _parent = $.cancelOrder.parent;
        _parent.remove($.cancelOrder);
        $.cancelOrder.removeAllChildren();
         $.removeListener();
            $.destroy();
    }, 500);
}

function closeCancelOrder(e) {
     
    
     
	var id = e.source.id;
	//Ti.API.info('id---->'+ id);
	//Ti.API.info('text-->' + e.source.text);

	if (id === "close_btn" || (e.source.text === "BACK") || id=== "myaccount") {
	    args.closeAndroidBack();
	    (args.mainWindow).removeEventListener("android:back", closeCancelOrder);
		hideShowView($.cancelOrder);

		setTimeout(function() {
			// args.mainWindow.remove($.cancelOrder);
			// $.cancelOrder.removeAllChildren();
			var _parent = $.cancelOrder.parent;
			_parent.remove($.cancelOrder);
			$.cancelOrder.removeAllChildren();
		}, 1500);
		
		$.removeListener();
        $.destroy();
	}
}

