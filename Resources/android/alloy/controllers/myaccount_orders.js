function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function init() {
        getMyOrders();
    }
    function loadOrderList() {
        $.orderList_container.removeAllChildren();
        var orderList;
        var orderEmptyText;
        switch ($.openOrder_btn.orderId) {
          case "openOr":
            orderList = myorderResponse.data.recent_orders.open_orders;
            orderEmptyText = "No Open Orders";
            break;

          case "completedOr":
            orderList = myorderResponse.data.recent_orders.completed_orders;
            orderEmptyText = "No Completed Orders";
            break;

          case "cancelledOr":
            orderList = myorderResponse.data.recent_orders.canceled_orders;
            orderEmptyText = "No Cancelled Orders";
            break;

          case "returnedOr":
            ;
            orderList = myorderResponse.data.recent_orders.returned_orders;
            orderEmptyText = "No Return Orders";
        }
        if (0 == orderList.length) {
            $.noOrders.setText(orderEmptyText);
            $.noOrders.setVisible(true);
        } else {
            $.noOrders.setVisible(false);
            try {
                _.each(orderList, function(value, k) {
                    var orderContainer = $.UI.create("View", {
                        top: "0dp",
                        width: Ti.UI.FILL,
                        height: Ti.UI.SIZE,
                        layout: "vertical",
                        id: "orderContainer" + i,
                        isListView: false,
                        backgroundColor: "transparent",
                        order_items: value.order_items,
                        order_details: value
                    });
                    var orderBasicDetails = $.UI.create("View", {
                        height: Ti.UI.SIZE,
                        top: "5dp",
                        width: Ti.UI.FILL,
                        id: "orderBasicDetails" + i,
                        bubbleParent: true,
                        order_items: value.order_items,
                        order_details: value
                    });
                    orderBasicDetails.addEventListener("click", setOrderListView);
                    var orderCount, itemTxt = " ITEM";
                    if (1 === orderContainer.order_items.length) {
                        orderCount = "0" + orderContainer.order_items.length;
                        itemTxt = " ITEM";
                    } else {
                        orderCount = orderContainer.order_items.length;
                        orderCount > 1 && 10 > orderCount && (orderCount = "0" + orderCount);
                        itemTxt = " ITEMS";
                    }
                    var orderCountText = "(" + orderCount + itemTxt + ")";
                    var orderIdTxt = value.increment_id + "  " + orderCountText;
                    var orderId = $.UI.create("Label", {
                        text: orderIdTxt,
                        bubbleParent: false,
                        left: "10dp",
                        top: "10dp",
                        classes: "labelTitleColor fontHeavy labelClass",
                        touchEnabled: false
                    });
                    var attr = Ti.UI.createAttributedString({
                        text: orderIdTxt,
                        attributes: [ {
                            type: Ti.UI.ATTRIBUTE_FONT,
                            value: {
                                font: {
                                    fontFamily: "futura_lt_bt_light-webfont"
                                }
                            },
                            range: [ orderIdTxt.indexOf(orderCountText), orderCountText.length ]
                        }, {
                            type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
                            value: "#000",
                            range: [ orderIdTxt.indexOf(orderCountText), orderCountText.length ]
                        } ]
                    });
                    orderId.attributedString = attr;
                    orderBasicDetails.add(orderId);
                    var price = Alloy.Globals.icon.currency + parseFloat(value.grand_total).toFixed(2);
                    var orderPrice = $.UI.create("Label", {
                        text: price,
                        bubbleParent: false,
                        touchEnabled: false,
                        color: "#333333",
                        font: {
                            fontSize: "12dp"
                        },
                        right: "10dp",
                        top: "10dp",
                        classes: "fontHeavy labelClass",
                        grand_total: value.grand_total
                    });
                    orderBasicDetails.add(orderPrice);
                    var attr = Ti.UI.createAttributedString({
                        text: price,
                        attributes: [ {
                            type: Ti.UI.ATTRIBUTE_FONT,
                            value: {
                                font: {
                                    fontFamily: "futura_lt_bt_light-webfont"
                                }
                            },
                            range: [ price.indexOf("."), 3 ]
                        }, {
                            type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
                            value: "#a0a0a0",
                            range: [ price.indexOf("."), 3 ]
                        } ]
                    });
                    orderPrice.attributedString = attr;
                    var date;
                    date = "cancelledOr" == $.openOrder_btn.orderId && "" != value.couponcode ? value.couponcode : moment(value.created_at).format("DD MMMM, YYYY").toUpperCase();
                    var orderDate = $.UI.create("Label", {
                        text: date,
                        color: "#333333",
                        bubbleParent: false,
                        touchEnabled: false,
                        font: {
                            fontSize: "10dp"
                        },
                        left: "10dp",
                        top: "30dp",
                        classes: "fontMedium labelClass",
                        bottom: "10dp"
                    });
                    orderBasicDetails.add(orderDate);
                    var border = $.UI.create("View", {
                        top: "1dp",
                        left: "10dp",
                        width: "95%",
                        height: "1dp",
                        backgroundColor: "#b2b2b2",
                        touchEnabled: false
                    });
                    0 != k && orderContainer.add(border);
                    orderContainer.add(orderBasicDetails);
                    $.orderList_container.add(orderContainer);
                });
            } catch (exp) {
                Ti.API.info("order listing expection--->******** 	 " + exp.message);
            }
        }
    }
    function showDropdownList() {
        if ($.dropDownList.getVisible()) {
            var arrow = Ti.UI.create2DMatrix({
                rotate: 0
            });
            $.dropDownArrow.transform = arrow;
            $.dropDownList.setVisible(false);
            $.dropDownBg.setVisible(false);
            $.popContainer.setVisible(false);
        } else {
            var arrow = Ti.UI.create2DMatrix({
                rotate: 180
            });
            $.dropDownArrow.transform = arrow;
            $.dropDownList.setVisible(true);
            $.dropDownBg.setVisible(true);
            $.popContainer.setVisible(true);
        }
    }
    function orderSelection(e) {
        $.openOrder_btn.text = e.source.text;
        $.openOrder_btn.orderId = e.source.id;
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
                rotate: 0
            });
            $.dropDownArrow.transform = arrow;
            $.dropDownList.setVisible(false);
            $.dropDownBg.setVisible(false);
            $.popContainer.setVisible(false);
        }
    }
    function setOrderListView(e) {
        if (e.source.parent.isListView) {
            e.source.parent.remove(e.source.parent.listView);
            e.source.parent.backgroundColor = "transparent";
            e.source.parent.isListView = false;
        } else {
            var getListView = Alloy.createController("orderListTemplate", {
                orderType: $.openOrder_btn.orderId,
                orderList: e.source.order_items,
                orderDetail: e.source.order_details,
                mainWindow: args.mainWindow,
                updateOrderStatus: updateOrderStatus,
                androidBack: args.androidBack,
                closeAndroidBack: args.closeAndroidBack
            }).getView();
            currentOrderDetail = e.source;
            e.source.parent.isListView = true;
            e.source.parent.backgroundColor = "#f5f5f5";
            e.source.parent.add(getListView);
            e.source.parent.listView = getListView;
        }
    }
    function disableScroll(e) {
        $.orderList_container.scrollingEnabled = false;
    }
    function enableScroll() {
        $.orderList_container.scrollingEnabled = true;
    }
    function getMyOrders() {
        var requestMethod = Alloy.Globals.commonUrl.myOrders;
        showFullLoader(args.container);
        Alloy.Globals.webServiceCall(requestMethod, {}, getMyOrdersSuccessCallback, getMyOrdersErrorCallback, "POST", args.mainWindow);
    }
    function getMyOrdersSuccessCallback(response) {
        if (0 === response.data.count) args.loadDefaultScreen("estore"); else {
            myorderResponse = response;
            try {
                setFilterList();
                loadOrderList();
            } catch (ex) {
                alert("Something went wrong");
            }
        }
        hideLoader();
        hideFullLoader();
    }
    function getMyOrdersErrorCallback(response) {
        hideLoader();
        showAlert(args.mainWindow, response.message);
    }
    function setFilterList() {
        myorderResponse.data.recent_orders;
        var _createLabel = function(lblTxt, lblId) {
            var lbl = $.UI.create("Label", {
                id: lblId,
                text: lblTxt,
                classes: "dropDownLbl fontMedium",
                right: "20dp"
            });
            0 === $.dropDownList.getChildren() && lbl.setTop("5dp");
            touchEffect.createTouchEffect(lbl, Alloy.Globals.labelTitleColor, "#000000");
            lbl.addEventListener("click", orderSelection);
            return lbl;
        };
        var openOr = _createLabel("OPEN ORDERS", "openOr");
        $.dropDownList.add(openOr);
        var completedOr = _createLabel("COMPLETED ORDERS", "completedOr");
        $.dropDownList.add(completedOr);
        var cancelledOr = _createLabel("CANCELLED ORDERS", "cancelledOr");
        $.dropDownList.add(cancelledOr);
        var returnOr = _createLabel("RETURNED ORDERS", "returnedOr");
        $.dropDownList.add(returnOr);
    }
    function updateOrderStatus() {
        if (null != currentOrderDetail) {
            var order = [];
            switch ($.openOrder_btn.orderId) {
              case "openOr":
                currentOrderDetail.order_details.status = "cancelation_requested";
                order = myorderResponse.data.recent_orders.open_orders;
                var getOrders = _.where(order, {
                    increment_id: currentOrderDetail.order_details.increment_id
                });
                getOrders[0].status = "cancelation_requested";
                _.map(myorderResponse.data.recent_orders.open_orders, function(obj) {
                    obj.increment_id == currentOrderDetail.order_details.increment_id && (obj.status = "cancelation_requested");
                });
                break;

              case "completedOr":
                updateReturnStatus();
                break;

              case "cancelledOr":
                order = myorderResponse.data.recent_orders.canceled_orders;
                var getOrders = _.where(order, {
                    increment_id: currentOrderDetail.order_details.increment_id
                });
                getOrders[0].status = "cancelation_requested";
                _.map(myorderResponse.data.recent_orders.canceled_orders, function(obj) {
                    obj.increment_id == currentOrderDetail.order_details.increment_id && (obj.status = "cancelation_requested");
                });
                break;

              case "returnedOr":
                order = myorderResponse.data.recent_orders.returned_orders;
                var getOrders = _.where(order, {
                    increment_id: currentOrderDetail.order_details.increment_id
                });
                getOrders[0].status = "cancelation_requested";
                _.map(myorderResponse.data.recent_orders.returned_orders, function(obj) {
                    obj.increment_id == currentOrderDetail.order_details.increment_id && (obj.status = "cancelation_requested");
                });
            }
        }
    }
    function updateReturnStatus() {
        _.map(myorderResponse.data.recent_orders.completed_orders, function(obj) {
            if (obj.increment_id == Alloy.Globals.returnOrderItemId.increament_id) {
                obj.can_return = 0;
                _.map(obj.order_items, function(obj1) {
                    obj1.item_id == Alloy.Globals.returnOrderItemId.item_id && (obj1.is_return_requested = 1);
                });
            }
        });
        _.map(currentOrderDetail.order_details.order_items, function(obj, key) {
            if (obj.item_id == Alloy.Globals.returnOrderItemId.item_id) {
                obj.is_return_requested = 1;
                currentOrderDetail.order_items[key].price = 1;
                currentOrderDetail.order_details.order_items[key].is_return_requested = 1;
                currentOrderDetail.order_items = currentOrderDetail.order_details.order_items;
            }
        });
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "myaccount_orders";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.myaccount_order_container = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        backgroundColor: "#fff",
        left: 0,
        top: 0,
        id: "myaccount_order_container"
    });
    $.__views.myaccount_order_container && $.addTopLevelView($.__views.myaccount_order_container);
    $.__views.dropdown = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        right: "10dp",
        top: 10,
        id: "dropdown",
        layout: "horizontal",
        bubbleParent: false
    });
    $.__views.myaccount_order_container.add($.__views.dropdown);
    $.__views.openOrder_btn = Ti.UI.createLabel({
        top: 0,
        color: Alloy.Globals.labelTitleColor,
        font: {
            fontFamily: "futura-hv-bt-heavy",
            fontSize: "10dp"
        },
        text: "OPEN ORDERS",
        id: "openOrder_btn",
        left: "0dp",
        right: "5dp",
        orderId: "openOr"
    });
    $.__views.dropdown.add($.__views.openOrder_btn);
    showDropdownList ? $.addListener($.__views.openOrder_btn, "touchstart", showDropdownList) : __defers["$.__views.openOrder_btn!touchstart!showDropdownList"] = true;
    $.__views.dropDownArrow = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "5dp"
        },
        color: "#000",
        text: Alloy.Globals.icon.dropdownArrow,
        width: "16dp",
        height: "10dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "dropDownArrow",
        left: "0dp"
    });
    $.__views.dropdown.add($.__views.dropDownArrow);
    showDropdownList ? $.addListener($.__views.dropDownArrow, "touchstart", showDropdownList) : __defers["$.__views.dropDownArrow!touchstart!showDropdownList"] = true;
    $.__views.orderList_container = Ti.UI.createScrollView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        left: "0%",
        right: "0%",
        id: "orderList_container",
        top: "40dp",
        layout: "vertical"
    });
    $.__views.myaccount_order_container.add($.__views.orderList_container);
    $.__views.noOrders = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "18dp"
        },
        text: "No Order",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "#a0a0a0",
        visible: false,
        id: "noOrders"
    });
    $.__views.myaccount_order_container.add($.__views.noOrders);
    $.__views.popContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        id: "popContainer",
        top: 0,
        left: 0,
        zIndex: 30,
        visible: false
    });
    $.__views.myaccount_order_container.add($.__views.popContainer);
    hideDropDownList ? $.addListener($.__views.popContainer, "touchstart", hideDropDownList) : __defers["$.__views.popContainer!touchstart!hideDropDownList"] = true;
    $.__views.dropDownList = Ti.UI.createScrollView({
        scrollType: "vertical",
        layout: "vertical",
        backgroundColor: "#ffff",
        width: "129dp",
        height: "100dp",
        top: "24dp",
        zIndex: 31,
        right: "5dp",
        visible: false,
        id: "dropDownList"
    });
    $.__views.popContainer.add($.__views.dropDownList);
    $.__views.dropDownBg = Ti.UI.createView({
        backgroundColor: "transparent",
        borderColor: "#a0a0a0",
        borderWidth: .5,
        height: "120dp",
        width: "130dp",
        zIndex: 34,
        top: "5dp",
        right: "5dp",
        visible: false,
        touchEnabled: false,
        id: "dropDownBg"
    });
    $.__views.popContainer.add($.__views.dropDownBg);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var touchEffect = require("touchEffects");
    var myorderResponse;
    init();
    Ti.App.removeEventListener("disableScroll", disableScroll);
    Ti.App.addEventListener("disableScroll", disableScroll);
    Ti.App.removeEventListener("enableScroll", enableScroll);
    Ti.App.addEventListener("enableScroll", enableScroll);
    __defers["$.__views.openOrder_btn!touchstart!showDropdownList"] && $.addListener($.__views.openOrder_btn, "touchstart", showDropdownList);
    __defers["$.__views.dropDownArrow!touchstart!showDropdownList"] && $.addListener($.__views.dropDownArrow, "touchstart", showDropdownList);
    __defers["$.__views.popContainer!touchstart!hideDropDownList"] && $.addListener($.__views.popContainer, "touchstart", hideDropDownList);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;