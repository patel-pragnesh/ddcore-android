var args = arguments[0] || {};
var touchEffect = require("touchEffects");
var myorderResponse;

// touchEffect.createTouchEffect($.openOr, Alloy.Globals.labelTitleColor, "#000000");
// touchEffect.createTouchEffect($.completedOr, Alloy.Globals.labelTitleColor, "#000000");
// touchEffect.createTouchEffect($.cancelledOr, Alloy.Globals.labelTitleColor, "#000000");
// touchEffect.createTouchEffect($.returnedOr, Alloy.Globals.labelTitleColor, "#000000");

init();

function init() {
    getMyOrders();

}

//loadOrderList();

function loadOrderList() {
    $.orderList_container.removeAllChildren();
    // if ($.openOrder_btn.orderId === "returnedOr") {
    // var getListView = Alloy.createController('orderListTemplate', {
    // orderType : $.openOrder_btn.orderId
    // }).getView();
    //
    // $.orderList_container.add(getListView);
    // } else {
    // Open Order My Default
    var orderList;
    var orderEmptyText;

    switch($.openOrder_btn.orderId) {
    case "openOr": {
        // Ti.API.info('into open order');
        orderList = myorderResponse.data.recent_orders.open_orders;
        //Ti.API.info('ordeReturn----open----->'+ JSON.stringify(orderList));

        orderEmptyText = "No Open Orders";
        break;
    }
    case "completedOr": {
        //Ti.API.info('into completed order');
        orderList = myorderResponse.data.recent_orders.completed_orders;
        
       // Ti.API.info('ordeReturn----completed----->'+ JSON.stringify(orderList));
        orderEmptyText = "No Completed Orders";
        break;
    }
    case "cancelledOr": {
        //Ti.API.info('into cancelled order');
        orderList = myorderResponse.data.recent_orders.canceled_orders;
        orderEmptyText = "No Cancelled Orders";
        break;
    }

    case "returnedOr":
        {
            //orderList = [];

            //
            // var getListView = Alloy.createController('orderListTemplate', {
            // orderType : $.openOrder_btn.orderId
            // }).getView();
            //
            // $.orderList_container.add(getListView);

            var testObj = [{
                "order_id" : "191",
                "increment_id" : "100000968",
                "invoice_pdf" : "",
                "grand_total" : "1.0000",
                "created_at" : "2016-08-24 05:28:28",
                "state" : "canceled",
                "status" : "canceled",
                "estimated_delivery_date" : "31 Aug 2016",
                "couponcode" : "zZxtvyN6",
                "order_items" : [{
                    "item_id" : "250",
                    "product_id" : "190",
                    "image" : "http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_35854.jpg",
                    "qty" : "1.0000",
                    "product_name" : "Frost",
                    "price" : "1.0000",
                    "short_description" : null,
                    "is_return_requested" : null,
                    "color_url" : "http://dev.ddecor.com/media/colors_watches/grey.jpg",
                    "size" : "LARGE BED SHEET SET",
                    "uom" : "Quantity"
                }],
                "can_return" : 0,
                "can_cancel" : 0,
                "can_enquiry" : 0,
                "in_process" : 0
            }];
        
        //myorderResponse.data.recent_orders.returned_orders = testObj;
        orderList = myorderResponse.data.recent_orders.returned_orders;
       // Ti.API.info('ordeReturn----return----->'+ JSON.stringify(orderList));
        
        
        orderEmptyText = "No Return Orders";
        break;
    }

};

if (orderList.length == 0) {
    $.noOrders.setText(orderEmptyText);
    $.noOrders.setVisible(true);
} else {
    $.noOrders.setVisible(false);

    //Ti.API.info('current order********* ' + $.openOrder_btn.orderId);

    try {

        _.each(orderList, function(value, k) {

            var orderContainer = $.UI.create("View", {
                top : "0dp",
                width : Ti.UI.FILL,
                height : Ti.UI.SIZE,
                layout : "vertical",
                id : "orderContainer" + i,
                isListView : false,
                backgroundColor : "transparent",
                order_items : value.order_items,
                order_details : value,
            });

            var orderBasicDetails = $.UI.create("View", {
                height : Ti.UI.SIZE, //"30dp",
                top : "5dp",
                width : Ti.UI.FILL,
                id : "orderBasicDetails" + i,
                bubbleParent : true,
                order_items : value.order_items,
                order_details : value,

            });

            orderBasicDetails.addEventListener("click", setOrderListView);

            var orderCount,
                itemTxt = " ITEM";
            if (orderContainer.order_items.length === 1) {
                orderCount = "0" + orderContainer.order_items.length;
                itemTxt = " ITEM";
            } else {
                orderCount = orderContainer.order_items.length;
                if (orderCount > 1 && orderCount < 10) {
                    orderCount = "0" + orderCount;
                }
                itemTxt = " ITEMS";
            }

            var orderCountText = "(" + orderCount + itemTxt + ")";

            var orderIdTxt = value.increment_id + "  " + orderCountText;

            var orderId = $.UI.create("Label", {
                // text : "1234567890  (06 ITEMS)",
                text : orderIdTxt, //orderList[i].increment_id,
                bubbleParent : false,
                left : "10dp",
                top : "10dp",
                classes : "labelTitleColor fontHeavy labelClass",
                touchEnabled : false
            });

            var attr = Ti.UI.createAttributedString({
                text : orderIdTxt,
                attributes : [{
                    type : Ti.UI.ATTRIBUTE_FONT,
                    value : {
                        font : {
                            fontFamily : "futura_lt_bt_light-webfont"
                        }
                    },
                    range : [orderIdTxt.indexOf(orderCountText), (orderCountText).length]
                }, {
                    type : Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
                    value : "#000", //"#a0a0a0",
                    range : [orderIdTxt.indexOf(orderCountText), (orderCountText).length]
                }]
            });
            orderId.attributedString = attr;

            orderBasicDetails.add(orderId);

            var price = Alloy.Globals.icon.currency + parseFloat(value.grand_total).toFixed(2);
            var orderPrice = $.UI.create("Label", {
                text : price,
                bubbleParent : false,
                touchEnabled : false,
                color : "#333333",
                font : {
                    fontSize : "12dp"
                },
                right : "10dp",
                top : "10dp",
                classes : "fontHeavy labelClass",
                grand_total : value.grand_total
            });

            orderBasicDetails.add(orderPrice);

            var attr = Ti.UI.createAttributedString({
                text : price,
                attributes : [{
                    type : Ti.UI.ATTRIBUTE_FONT,
                    value : {
                        font : {
                            fontFamily : "futura_lt_bt_light-webfont"
                        }
                    },
                    range : [price.indexOf("."), 3]
                }, {
                    type : Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
                    value : "#a0a0a0",
                    range : [price.indexOf("."), 3]
                }]
            });

            orderPrice.attributedString = attr;

            var date;

            if ($.openOrder_btn.orderId == "cancelledOr") {

                if (value.couponcode != "") {
                    date = value.couponcode;
                    //Ti.API.info('date--->' + date);
                } else {
                    date = (moment(value.created_at).format('DD MMMM, YYYY')).toUpperCase();
                }

            } else {
                date = (moment(value.created_at).format('DD MMMM, YYYY')).toUpperCase();
            }
            var orderDate = $.UI.create("Label", {
                text : date, //"20 NOVEMBER 2016", // "display Credit Note"
                color : "#333333",
                bubbleParent : false,
                touchEnabled : false,
                font : {
                    fontSize : "10dp"
                },
                left : "10dp",
                top : "30dp",
                classes : "fontMedium labelClass",
                bottom : "10dp"
            });
            //$.addClass(orderDate, 'fontMedium labelClass');
            orderBasicDetails.add(orderDate);

            var border = $.UI.create("View", {
                //classes:"border",
                top : "1dp",
                left : "10dp",
                width : "95%",
                height : "1dp",
                backgroundColor : "#b2b2b2",
                touchEnabled : false,
            });

            // var _bottomView =  $.UI.create("View", {
            // top : "5dp",
            // left : "10dp",
            // width : "95%",
            // height : "1dp",
            // backgroundColor : "tranparent",
            // touchEnabled:false,
            // });

            if (k != 0) {
                orderContainer.add(border);
                //orderContainer.add(_bottomView);
            }
            orderContainer.add(orderBasicDetails);
            $.orderList_container.add(orderContainer);

        });

    } catch(exp) {
        Ti.API.info('order listing expection--->******** \t ' + exp.message);
        //alert("Something went wrong");
    }

}
}


function showDropdownList() {
    //Ti.API.info('list');
    if ($.dropDownList.getVisible()) {
        //Ti.API.info('into true');
        var arrow = Ti.UI.create2DMatrix({
            rotate : 0
        });
        $.dropDownArrow.transform = arrow;

        //setTimeout(function() {
        $.dropDownList.setVisible(false);
        $.dropDownBg.setVisible(false);
        $.popContainer.setVisible(false);
        //}, 400);

    } else {
        //Ti.API.info('into false');
        var arrow = Ti.UI.create2DMatrix({
            rotate : 180
        });
        $.dropDownArrow.transform = arrow;

        //setTimeout(function() {
        $.dropDownList.setVisible(true);
        $.dropDownBg.setVisible(true);
        $.popContainer.setVisible(true);
        //}, 400);
    }
}

function orderSelection(e) {

    // Ti.API.info('refresh List--> ' + orderId);
    $.openOrder_btn.text = e.source.text;
    $.openOrder_btn.orderId = e.source.id;

    //showDropdownList();
    showLoader($.myaccount_order_container);

    hideDropDownList();
    loadOrderList();
    $.dropDownList.setVisible(false);
    $.dropDownBg.setVisible(false);
    $.popContainer.setVisible(false);

    hideLoader();
}

function hideDropDownList() {
    if ($.dropDownList.visible) {

        var arrow = Ti.UI.create2DMatrix({
            rotate : 0
        });
        $.dropDownArrow.transform = arrow;

        $.dropDownList.setVisible(false);
        $.dropDownBg.setVisible(false);
        $.popContainer.setVisible(false);
    }
}

function toggelOrderList() {
    /*
    $.candidateListView.animate({
    //visible:true,
    height:"200dp",
    duration:1000,
    });

    //$.candidateListView.setVisible(true);
    $.candidateListView.setHeight("200dp");
    */

    //setOrderListView();

}

function setOrderListView(e) {

    if (!e.source.parent.isListView) {
        var getListView = Alloy.createController('orderListTemplate', {
            orderType : $.openOrder_btn.orderId,
            orderList : e.source.order_items,
            orderDetail : e.source.order_details,
            mainWindow : args.mainWindow,
            updateOrderStatus : updateOrderStatus,
            androidBack : args.androidBack,
            closeAndroidBack : args.closeAndroidBack,
        }).getView();

        currentOrderDetail = e.source;

        e.source.parent.isListView = true;
        e.source.parent.backgroundColor = "#f5f5f5";
        e.source.parent.add(getListView);
        e.source.parent.listView = getListView;

        //$.orderList_container.setScrollingEnabled(false);
        //e.source.parent.height =Ti.UI.FILL;

    } else {

        e.source.parent.remove(e.source.parent.listView);
        e.source.parent.backgroundColor = "transparent";
        e.source.parent.isListView = false;
        //$.orderList_container.setScrollingEnabled(true);
        //e.source.parent.height = Ti.UI.SIZE;
    }

}

Ti.App.removeEventListener("disableScroll", disableScroll);
Ti.App.addEventListener("disableScroll", disableScroll);

Ti.App.removeEventListener("enableScroll", enableScroll);
Ti.App.addEventListener("enableScroll", enableScroll);

function disableScroll(e) {
    //Ti.API.info('scroll--> '+e.source.id);
    $.orderList_container.scrollingEnabled = false;
}

function enableScroll() {
    $.orderList_container.scrollingEnabled = true;
}

function _enableScroll(e) {
    if (e.source.id == "orderList_container") {
        $.orderList_container.setScrollingEnabled(true);
    }
}

function getMyOrders() {
    var requestMethod = Alloy.Globals.commonUrl.myOrders;
    //showLoader(args.container);
    showFullLoader(args.container);

    Alloy.Globals.webServiceCall(requestMethod, {}, getMyOrdersSuccessCallback, getMyOrdersErrorCallback, "POST", args.mainWindow);

}

function getMyOrdersSuccessCallback(response) {
    //Ti.API.info('my order success response--->' + JSON.stringify(response));
    if (response.data.count === 0) {
        args.loadDefaultScreen("estore");
    } else {

        myorderResponse = response;
        try {
            setFilterList();
            loadOrderList();
        } catch(ex) {
            alert("Something went wrong");
        }
    }

    hideLoader();
    hideFullLoader();
}

function getMyOrdersErrorCallback(response) {
    //Ti.API.info('my order error response--->' + JSON.stringify(response));
    hideLoader();
    showAlert(args.mainWindow, response.message);
}

function setFilterList() {
    var filterList = myorderResponse.data.recent_orders;

    var _createLabel = function(lblTxt, lblId) {
        var lbl = $.UI.create("Label", {
            id : lblId,
            text : lblTxt,
            //bottom:"5dp",
            //left : "7dp",
            classes : "dropDownLbl fontMedium",
            right : "20dp",
        });
        if ($.dropDownList.getChildren() === 0) {
            lbl.setTop("5dp");
        }
        touchEffect.createTouchEffect(lbl, Alloy.Globals.labelTitleColor, "#000000");
        lbl.addEventListener("click", orderSelection);

        return lbl;
    };

    //if (filterList.open_orders.length != 0) {
    var openOr = _createLabel("OPEN ORDERS", "openOr");
    $.dropDownList.add(openOr);
    //}

    //if (filterList.completed_orders.length != 0) {
    var completedOr = _createLabel("COMPLETED ORDERS", "completedOr");
    $.dropDownList.add(completedOr);
    //}

    //	if (filterList.canceled_orders.length != 0) {
    var cancelledOr = _createLabel("CANCELLED ORDERS", "cancelledOr");
    $.dropDownList.add(cancelledOr);
    //}

    //if (filterList.returned_orders.length != 0) {
    var returnOr = _createLabel("RETURNED ORDERS", "returnedOr");
    $.dropDownList.add(returnOr);
    //}

}

function updateOrderStatus() {
    //currentOrderDetail
    if (currentOrderDetail != null) {
        //currentOrderDetail = e.source.order_details;

        //Ti.API.info('************************** current order detail');

        //var test = myorderResponse.data.recent_orders.open_orders;
        var order = [];

        switch($.openOrder_btn.orderId) {
        case "openOr": {
            currentOrderDetail.order_details.status = "cancelation_requested";
            order = myorderResponse.data.recent_orders.open_orders;
            var getOrders = _.where(order, {
                "increment_id" : currentOrderDetail.order_details.increment_id
            });

            getOrders[0].status = "cancelation_requested";

            _.map(myorderResponse.data.recent_orders.open_orders, function(obj) {
                if (obj.increment_id == currentOrderDetail.order_details.increment_id) {
                    obj.status = "cancelation_requested";
                }
            });

            break;
        }

        case "completedOr": {
            /*
             order = myorderResponse.data.recent_orders.completed_orders;

             var getOrders = _.where(order, {
             "increment_id" : currentOrderDetail.order_details.increment_id
             });

             getOrders[0].status = "cancelation_requested";

             _.map(myorderResponse.data.recent_orders.completed_orders, function(obj) {
             if (obj.increment_id == currentOrderDetail.order_details.increment_id) {
             obj.status = "cancelation_requested";
             }
             });

             */

            updateReturnStatus();

            break;
        }

        case "cancelledOr": {
            order = myorderResponse.data.recent_orders.canceled_orders;

            var getOrders = _.where(order, {
                "increment_id" : currentOrderDetail.order_details.increment_id
            });

            getOrders[0].status = "cancelation_requested";

            _.map(myorderResponse.data.recent_orders.canceled_orders, function(obj) {
                if (obj.increment_id == currentOrderDetail.order_details.increment_id) {
                    obj.status = "cancelation_requested";
                }
            });

            break;
        }

        case "returnedOr": {
            order = myorderResponse.data.recent_orders.returned_orders;

            var getOrders = _.where(order, {
                "increment_id" : currentOrderDetail.order_details.increment_id
            });

            getOrders[0].status = "cancelation_requested";

            _.map(myorderResponse.data.recent_orders.returned_orders, function(obj) {
                if (obj.increment_id == currentOrderDetail.order_details.increment_id) {
                    obj.status = "cancelation_requested";
                }
            });

            break;
        }
        };

    }
}

function updateReturnStatus() {

    _.map(myorderResponse.data.recent_orders.completed_orders, function(obj) {
        if (obj.increment_id == Alloy.Globals.returnOrderItemId.increament_id) {

            obj.can_return = 0;

            _.map(obj.order_items, function(obj1) {
                if (obj1.item_id == Alloy.Globals.returnOrderItemId.item_id) {
                    obj1.is_return_requested = 1;
                }
            });
        }
    });

    // Ti.API.info('currentOrderDetail-----1---->' + JSON.stringify(currentOrderDetail.order_items[0]));
    // Ti.API.info('currentOrderDetail-----1.1---->' + JSON.stringify(currentOrderDetail.order_details.order_items[0]));

    /*TODO*/

    _.map(currentOrderDetail.order_details.order_items, function(obj, key) {
        if (obj.item_id == Alloy.Globals.returnOrderItemId.item_id) {

            obj.is_return_requested = 1;

            // Ti.API.info('_key-----> ' + JSON.stringify(currentOrderDetail.order_items[key].price));

            currentOrderDetail.order_items[key].price = 1;

            //Ti.API.info('_key-----> ' + JSON.stringify(currentOrderDetail.order_items[key].price));
            currentOrderDetail.order_details.order_items[key].is_return_requested = 1;

            currentOrderDetail.order_items = currentOrderDetail.order_details.order_items;

        }
    });

    //Ti.API.info('currentOrderDetail-----2---->' + JSON.stringify(currentOrderDetail.order_items[0]));
    //Ti.API.info('currentOrderDetail-----2.1---->' + JSON.stringify(currentOrderDetail.order_details.order_items[0]));

}