var args = arguments[0] || {};

var orderType = args.orderType;
var orderList = args.orderList;
var orderDetails = args.orderDetail;
//var orderType = args.orderType;
var orderListDetails = [];
var orderStatus = 0;

var orderAction = "Enquiry";
var returnOrder = false;

//increment_id

$.cancelOrder.increment_id = orderDetails.increment_id;

var pdfFlag = false;
var openFlag = false;
if (!isNullVal(orderDetails.invoice_pdf)) {
    //  Ti.API.info('orderDetails.invoice_pdf= ' + orderDetails.invoice_pdf);
    pdfFlag = true;
    $.downloadPdfLbl.pdfUrl = orderDetails.invoice_pdf;
}

//Ti.API.info('orderDetails-->' + JSON.stringify(orderDetails));

//Ti.API.info('status-->' + orderDetails.status);

if (orderDetails.can_cancel) {
    $.cancelOrder.setVisible(true);
} else {
    $.cancelOrder.setVisible(false);
    $.cancelOrder.setTouchEnabled(false);
}

var downloadText = Alloy.Globals.icon.pdfIcon + " View Invoice";
var downloadAttr = Ti.UI.createAttributedString({
    text : downloadText,
    attributes : [{
        type : Ti.UI.ATTRIBUTE_FONT,
        value : {
            font : {
                fontFamily : "futura_lt_bt_light-webfont",
                fontSize : "13dp"
            }
        },
        range : [downloadText.indexOf("View Invoice"), ("View Invoice").length]
    }, {
        type : Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
        value : "#333333",
        range : [downloadText.indexOf("View Invoice"), ("View Invoice").length]
    }]
});

$.downloadPdfLbl.attributedString = downloadAttr;

function viewPdfViewer(e) {
    // var pddfViewer = require('pdfViewer').createPdfViewer(e.source.pdfUrl);
    //
    // args.mainWindow.add(pddfViewer);

    var appFile = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'invoice.pdf');
    var appfilepath = appFile.nativePath;
    var xhr = Ti.Network.createHTTPClient();
    xhr.onload = function() {
        appFile.write(this.responseData);
        try {
            Ti.Android.currentActivity.startActivity(Ti.Android.createIntent({
                action : Ti.Android.ACTION_VIEW,
                type : 'application/pdf',
                data : appfilepath
            }));
        } catch(e) {
            //Ti.API.info('error trying to launch activity, e = ' + e);
            showAlert(args.mainWindow, "No PDF apps installed!");
        }
    };
    xhr.onerror = function() {
        // alert("Cannot retrieve PDF from web site")
        showAlert(args.mainWindow, "Something went wrong...");
    };
    xhr.timeout = 30000;
    xhr.open("GET", e.source.pdfUrl);
    xhr.send();

}

switch(orderDetails.status) {

case "picked_into_staging": {
    //orderStatus = 25;
    //$.orderProgressStatus.setWidth("25%");
    //$.orderStatus.setText("In Process");

    orderStatus = 20;
    $.orderProgressStatus.setWidth("20%");

    $.orderStatus.setText("Under Process");
    $.cancelOrder.setVisible(true);
    $.cancelOrder.setTouchEnabled(true);

    break;
}
case "order_punched": {
    //orderStatus = 25;
    //$.orderProgressStatus.setWidth("25%");
    //$.orderStatus.setText("In Process");

    orderStatus = 20;
    $.orderProgressStatus.setWidth("20%");

    $.orderStatus.setText("Under Process");
    $.cancelOrder.setVisible(true);
    $.cancelOrder.setTouchEnabled(true);

    break;
}

case "no_stock": {
    //orderStatus = 25;
    //$.orderProgressStatus.setWidth("25%");
    //$.orderStatus.setText("In Process");

    orderStatus = 20;
    $.orderProgressStatus.setWidth("20%");

    $.orderStatus.setText("Under Process");
    $.cancelOrder.setVisible(true);
    $.cancelOrder.setTouchEnabled(true);

    break;
}

case "under_process": {
    //orderStatus = 25;
    //$.orderProgressStatus.setWidth("25%");
    //$.orderStatus.setText("In Process");

    orderStatus = 20;
    $.orderProgressStatus.setWidth("20%");

    $.orderStatus.setText("Under Process");
    $.cancelOrder.setVisible(true);
    $.cancelOrder.setTouchEnabled(true);

    break;
}

case "ready_for_packaging": {
    //orderStatus = 25;
    //$.orderProgressStatus.setWidth("25%");
    //$.orderStatus.setText("In Process");

    orderStatus = 40;
    $.orderProgressStatus.setWidth("40%");

    $.orderStatus.setText("In Process");
    $.cancelOrder.setVisible(true);
    $.cancelOrder.setTouchEnabled(true);

    break;
}
case "ready_for_dispatch": {
    //orderStatus = 25;
    //$.orderProgressStatus.setWidth("25%");
    //$.orderStatus.setText("In Process");

    orderStatus = 60;
    $.orderProgressStatus.setWidth("60%");
    $.orderStatus.setText("In Process");
    $.cancelOrder.setVisible(true);
    $.cancelOrder.setTouchEnabled(true);

    break;
}

/*
 case "erp_order_created": {
 orderStatus = 25;
 $.orderProgressStatus.setWidth("25%");
 $.orderStatus.setText("In Process");
 $.cancelOrder.setVisible(true);
 $.cancelOrder.setTouchEnabled(true);
 break;
 }

 case "inprocess": {
 orderStatus = 50;
 $.orderProgressStatus.setWidth("50%");
 $.orderStatus.setText("In Transit");
 $.cancelOrder.setVisible(false);
 $.cancelOrder.setTouchEnabled(false);
 break;
 }
 */
case "dispatched": {
    orderStatus = 80;
    $.orderProgressStatus.setWidth("80%");

    if (pdfFlag) {
        $.downloadPdfLbl.setVisible(true);
        $.downloadPdfLbl.setHeight("20dp");
        openFlag = true;
    } else {
        $.downloadPdfLbl.setVisible(false);
        $.downloadPdfLbl.setHeight("0dp");
    }

    $.orderStatus.setText("In Transit");
    $.cancelOrder.setVisible(false);
    $.cancelOrder.setTouchEnabled(false);
    break;
}

case "cancelation_requested": {
    $.cancelOrder.setText("Cancellation Requested");
    $.cancelOrder.setTouchEnabled(false);
    $.cancelOrder.setVisible(true);
    $.orderProgressContainer.setVisible(false);
}

};

/*
switch(orderDetails.status) {

case "picked_into_staging": {
orderStatus = 25;
$.orderProgressStatus.setWidth("25%");
$.orderStatus.setText("In Process");
$.cancelOrder.setVisible(true);
$.cancelOrder.setTouchEnabled(true);

break;
}
case "erp_order_created": {
orderStatus = 25;
$.orderProgressStatus.setWidth("25%");
$.orderStatus.setText("In Process");
$.cancelOrder.setVisible(true);
$.cancelOrder.setTouchEnabled(true);
break;
}
case "inprocess": {
orderStatus = 50;
$.orderProgressStatus.setWidth("50%");
$.orderStatus.setText("In Transit");
$.cancelOrder.setVisible(false);
$.cancelOrder.setTouchEnabled(false);
break;
}
case "dispatched": {
orderStatus = 75;
$.orderProgressStatus.setWidth("75%");
$.orderStatus.setText("In Transit");
$.cancelOrder.setVisible(false);
$.cancelOrder.setTouchEnabled(false);
break;
}

case "cancelation_requested": {
$.cancelOrder.setVisible(true);
$.cancelOrder.setText("Cancellation Requested");
$.cancelOrder.setTouchEnabled(false);
$.orderProgressContainer.setVisible(false);
}

};
*/

//$.orderStatus.setText("Dispatched");

//$.cancelOrder.setText("Cancel Order");
// $.addressTitle.setText("Dispatched");
// $.address.setText("Dispatched");

//Ti.API.info('orderType-->' + orderType);

// if(orderDetails.can_enquiry){
// orderAction ="Enquiry";
// }
//
// if(orderDetails.can_return){
// orderAction ="Return";
// }

switch(orderType) {

case "openOr": {

    /*TODO
     check two process
     1. In Process
     2. In Transit
     * */
    $.orderStatusDate.setText("Est Delivery :" + (orderDetails.estimated_delivery_date || "Not Known"));

    if (openFlag) {
        $.downloadPdfLbl.setVisible(true);
        $.downloadPdfLbl.setHeight("20dp");
        openFlag = false;
    } else {
        $.downloadPdfLbl.setVisible(false);
        $.downloadPdfLbl.setHeight("0dp");
    }

    //orderAction = "Return";

    break;
}

case "completedOr": {
    /*TODO
     Order Can Return Only
     * */

    $.orderListView.defaultItemTemplate = "orderReturnTemplate";
    $.orderListView.separatorColor = "#a0a0a0";
    $.orderListView.separatorHeight = 1;
    $.orderDetail_container.setHeight("0dp");
    $.orderDetail_container.setVisible(false);

    $.downloadPdfLbl.setVisible(true);
    $.downloadPdfLbl.setHeight("20dp");

    //$.orderStatusDate.setText("Delivered On :" + (orderDetails.estimated_delivery_date || "Not Known"));
    orderAction = "Return";

    break;
}

case "cancelledOr": {

    $.cancelOrder.setVisible(false);
    $.orderDetail_container.setHeight("0dp");
    $.downloadPdfLbl.setVisible(false);
    $.downloadPdfLbl.setHeight("0dp");
    break;
}

case "returnedOr": {

    /*TODO
    1.display seperate order List
    2. No Footer
    * */

    // $.orderListView.defaultItemTemplate = "orderReturnTemplate";
    $.orderListView.separatorColor = "#a0a0a0";
    $.orderListView.separatorHeight = 1;
    $.orderDetail_container.setHeight("0dp");
    $.orderDetail_container.setVisible(false);
    $.downloadPdfLbl.setVisible(false);
    $.downloadPdfLbl.setHeight("0dp");

    returnOrder = true;

    var paymentMode = orderDetails.paymentMode;
    //"Credit Card";

    orderAction = paymentMode;

    break;
}
};

/*TODO in completed state order hide footer*/
// $.orderDetail_container.setHeight("0dp");
// $.orderDetail_container.setVisible(false);

// if (orderDetails.can_cancel == 1) {
// $.cancelOrder.setVisible(true);
// } else {
// $.cancelOrder.setVisible(false);
// }

function cancelOrder(e) {
    //Ti.API.info('clicked');
    //Ti.API.info('increment_id--->' + e.source.increment_id);
    var cancelOrder = Alloy.createController('cancelOrder', {
        orderId : e.source.increment_id,
        mainWindow : args.mainWindow,
        returnCancelSuccess : cancelSuccess,
        androidBack : args.androidBack,
        closeAndroidBack : args.closeAndroidBack,
    }).getView();

    //$.orderListView.parent.parent.parent.parent.parent.parent.parent.add(cancelOrder);
    args.mainWindow.add(cancelOrder);

}

function cancelSuccess(response) {
    ////Ti.API.info('***********cancelSuccess*************');
    //orderDetails.status = "cancelation_requested";
    orderDetails.status = response.data;
    $.cancelOrder.setText("Cancellation Requested");
    $.cancelOrder.setTouchEnabled(false);
    $.orderProgressContainer.setVisible(false);
    args.updateOrderStatus();
}

function selectOrderItem(e) {

    //bindId="orderAction"
    //Ti.API.info('bindId---> ' + e.bindId);

    switch(e.bindId) {
    case "orderReturn" : {
        //	var returnOrder = Alloy.createController('returnOrder').getView();
        //	$.orderListView.parent.parent.parent.parent.parent.parent.parent.add(returnOrder);
        break;
    }
    case "orderAction": {
        var property = e.section.items[e.itemIndex].properties;
        //Ti.API.info('properties-->'+ JSON.stringify(property));

        // Alloy.Globals.addWindowInNav("customerService",{orderInfo:property});
        if (property.order_action == "Enquiry") {

            property.order_status = orderDetails.status;

            Alloy.Globals.addWindowInNav("customerService", {
                orderInfo : property
            });
        } else if (property.order_action == "Return") {
            // navigate to Order Return Journey
            var returnOrder = Alloy.createController("returnOrder", {
                orderInfo : property,
                returnProductParam : e,
                updateOrderStatus : updateReturnProductStatus,
                mainWindow : args.mainWindow,
                androidBack : args.androidBack,
                closeAndroidBack : args.closeAndroidBack,
                //androidBack : windowAndroidBack,
                //closeAndroidBack : windowCloseAndroidBack,
            }).getView();
            args.mainWindow.add(returnOrder);

        }

        break;
    }

    };

}

//Ti.API.info('orderList length-->' + orderList.length);
/*
 for (var i = 0; i < orderList.length; i++) {
 //$.listSection

 var data = {
 orderImage : {
 image : (orderList[i].image || "")
 },
 orderTitle : {
 text : (orderList[i].product_name || "") //'THE BENEATH BED'
 },
 orderPrice : {
 //           text : '₹ 3,00,00.00'
 text : Alloy.Globals.icon.currency + parseFloat(orderList[i].price).toFixed(2)
 },
 orderCatergory : {
 text : ((!orderList[i].size) ? "" : orderList[i].size)//'DOUBLE BEDSHEET SET'
 },
 orderColor : {
 image : (orderList[i].color_url || "")
 },
 orderUOM : {
 text : (parseInt(orderList[i].qty) + " " + orderList[i].uom)
 }
 //,
 //orderAction : {
 //  text : (orderStatus == 25 ? '' : 'Inquire')
 //}
 };

 orderListDetails.push(data);

 //Ti.API.info('json data-->' + JSON.stringify(orderListDetails));

 $.listSection.setItems(orderListDetails);
 }
 */
var a = 50;
_.each(orderList, function(value, k) {
    a = a + 50;
    var price = Alloy.Globals.icon.currency + parseFloat(value.price).toFixed(2);

    var attr = Ti.UI.createAttributedString({
        text : price,
        attributes : [{
            type : Ti.UI.ATTRIBUTE_FONT,
            value : {
                font : {
                    fontFamily : "futura_lt_bt_light-webfont"
                }
            },
            range : [price.lastIndexOf("."), 3]
        }, {
            type : Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
            value : "#a0a0a0",
            range : [price.lastIndexOf("."), 3]
        }]
    });

    var downloadText = Alloy.Globals.icon.pdf + " View Invoice";
    var downloadAttr = Ti.UI.createAttributedString({
        text : downloadText,
        attributes : [{
            type : Ti.UI.ATTRIBUTE_FONT,
            value : {
                font : {
                    fontFamily : "futura_lt_bt_light-webfont"
                }
            },
            range : [downloadText.indexOf("View Invoice"), ("View Invoice").length]
        }, {
            type : Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
            value : "#333333",
            range : [downloadText.indexOf("View Invoice"), ("View Invoice").length]
        }]
    });

    /*TODO*/
    if (orderType === "completedOr") {

        if (value.is_return_requested == "1") {
            orderAction = "Return Requested";
        } else if (value.is_return_requested == "2") {
            orderAction = "Return Approved";
        } else if (value.is_return_requested == "3") {
            orderAction = "Return Rejected";
        }
        // else if((orderDetails.can_return) && (value.is_return_requested == null) ){
        // orderAction = "Return";
        // }
        else {
            orderAction = "Return";
        }

    }

    var data = {
        properties : {
            product_id : value.product_id,
            order_id : orderDetails.increment_id,
            order_status : orderDetails.status,
            order_action : orderAction,
            //order_action : ((value.is_return_requested) ? "Return Requested" : orderAction),
            //order_action : ((value.is_return_requested) ? actionOrder : orderAction),
            order_action : orderAction,
            item_id : value.item_id,
            qty : value.qty,
            itemno : (k + 1)
        },
        orderImage : {
            image : (encodeURI(value.image) || "")
        },
        orderTitle : {
            text : (value.product_name || "") //'THE BENEATH BED'
        },
        orderPrice : {
            //           text : '₹ 3,00,00.00'
            //text : price,
            attributedString : attr,
        },
        downloadPpdf : {
            attributedString : downloadAttr,
        },
        orderCatergory : {
            text : ((!value.size) ? "" : value.size)//'DOUBLE BEDSHEET SET'
        },
        orderColor : {
            image : (encodeURI(value.color_url) || "")
        },
        orderUOM : {
            text : (parseInt(value.qty) + " " + value.uom)
        },
        orderAction : {
            //text : orderAction,
            //  text : ((value.is_return_requested) ? "Return Requested" : orderAction),
            //text : ((value.is_return_requested) ? actionOrder : orderAction),
            text : orderAction,
            product_id : value.product_id,
            color : ( returnOrder ? "#a0a0a0" : Alloy.Globals.labelTitleColor)
            //visible : ((orderDetails.can_enquiry ) ? true : false),
            // touchEnabled:((orderDetails.can_enquiry ) ? true : false),
        },
        returnOrderDate : {
            text : (value.returnedDate != "" ? "Returned on : " + value.returnedDate : ""),
            height : ( returnOrder ? Ti.UI.SIZE : 0),
            visible : returnOrder
        }

    };

    if (orderType == "completedOr") {
        data.orderStatusDate = {
            text : "Delivered On :" + (orderDetails.estimated_delivery_date || "Not Known")
        };
    }

    orderListDetails.push(data);

    $.listSection.setItems(orderListDetails);
    $.orderListView.setHeight(Ti.UI.SIZE);

    // $.orderListView.setHeight((200));
    // var ListViewHeight = parseInt($.orderListView.getHeight());
    // $.orderListView.setHeight((ListViewHeight + a));
    


// condition changes made later on do not delete the *else if condition
// Known *else if condition will not excute 

    if (orderListDetails.length != 0 && orderListDetails.length >= 4) {
        Ti.API.info('into ****** 1 *****');
        $.orderListView.setHeight((200));

        //orderCount = orderCount +orderListDetails.length;

        var ListViewHeight = parseInt($.orderListView.getHeight());

        $.orderListView.setHeight((ListViewHeight + a));
        // $.orderListView.setHeight(Ti.UI.SIZE);
        //  Ti.API.info('getHeight---->'+ $.orderListView.getHeight());

    } else if (orderDetails.status == "cancelation_requested" && orderListDetails.length == 4) {
        //  Ti.API.info('into ****** 2 *****');
        $.orderListView.setHeight((100));

        var ListViewHeight = parseInt($.orderListView.getHeight());

        //$.orderListView.setHeight((ListViewHeight + a));
        $.orderListView.setHeight(Ti.UI.SIZE);
    }

});

function updateReturnProductStatus(param) {
    var e = param;
    var bindId = e.bindId;
    var index = e.itemIndex;

    var currentItem;

    if (bindId) {
        var bind = bindId;
        currentItem = e.section.items[index];
        listItem = currentItem[bind];

        // e.section.items[e.itemIndex].properties;

    }

    var orderAction = currentItem["orderAction"];

    orderAction.text = "Return Requested";

    e.section.updateItemAt(index, currentItem);

    //is_return_requested
    // Ti.API.info('currentItem.properties.item_id; ' + currentItem.properties.item_id);
    Alloy.Globals.returnOrderItemId = {
        item_id : currentItem.properties.item_id,
        increament_id : currentItem.properties.order_id
    };

    args.updateOrderStatus();

}

