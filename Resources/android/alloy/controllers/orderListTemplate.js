function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function viewPdfViewer(e) {
        var appFile = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, "invoice.pdf");
        var appfilepath = appFile.nativePath;
        var xhr = Ti.Network.createHTTPClient();
        xhr.onload = function() {
            appFile.write(this.responseData);
            try {
                Ti.Android.currentActivity.startActivity(Ti.Android.createIntent({
                    action: Ti.Android.ACTION_VIEW,
                    type: "application/pdf",
                    data: appfilepath
                }));
            } catch (e) {
                showAlert(args.mainWindow, "No PDF apps installed!");
            }
        };
        xhr.onerror = function() {
            showAlert(args.mainWindow, "Something went wrong...");
        };
        xhr.timeout = 3e4;
        xhr.open("GET", e.source.pdfUrl);
        xhr.send();
    }
    function cancelOrder(e) {
        var cancelOrder = Alloy.createController("cancelOrder", {
            orderId: e.source.increment_id,
            mainWindow: args.mainWindow,
            returnCancelSuccess: cancelSuccess,
            androidBack: args.androidBack,
            closeAndroidBack: args.closeAndroidBack
        }).getView();
        args.mainWindow.add(cancelOrder);
    }
    function cancelSuccess(response) {
        orderDetails.status = response.data;
        $.cancelOrder.setText("Cancellation Requested");
        $.cancelOrder.setTouchEnabled(false);
        $.orderProgressContainer.setVisible(false);
        args.updateOrderStatus();
    }
    function selectOrderItem(e) {
        switch (e.bindId) {
          case "orderReturn":
            break;

          case "orderAction":
            var property = e.section.items[e.itemIndex].properties;
            if ("Enquiry" == property.order_action) {
                property.order_status = orderDetails.status;
                Alloy.Globals.addWindowInNav("customerService", {
                    orderInfo: property
                });
            } else if ("Return" == property.order_action) {
                var returnOrder = Alloy.createController("returnOrder", {
                    orderInfo: property,
                    returnProductParam: e,
                    updateOrderStatus: updateReturnProductStatus,
                    mainWindow: args.mainWindow,
                    androidBack: args.androidBack,
                    closeAndroidBack: args.closeAndroidBack
                }).getView();
                args.mainWindow.add(returnOrder);
            }
        }
    }
    function updateReturnProductStatus(param) {
        var e = param;
        var bindId = e.bindId;
        var index = e.itemIndex;
        var currentItem;
        if (bindId) {
            var bind = bindId;
            currentItem = e.section.items[index];
            listItem = currentItem[bind];
        }
        var orderAction = currentItem["orderAction"];
        orderAction.text = "Return Requested";
        e.section.updateItemAt(index, currentItem);
        Alloy.Globals.returnOrderItemId = {
            item_id: currentItem.properties.item_id,
            increament_id: currentItem.properties.order_id
        };
        args.updateOrderStatus();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "orderListTemplate";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.__alloyId1078 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId1078"
    });
    $.__views.orderDetail_container = Ti.UI.createView({
        width: Titanium.UI.FILL,
        top: 10,
        layout: "vertical",
        id: "orderDetail_container",
        height: "70dp"
    });
    $.__views.__alloyId1078.add($.__views.orderDetail_container);
    $.__views.orderProgressContainer = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: "0%",
        layout: "vertical",
        id: "orderProgressContainer"
    });
    $.__views.orderDetail_container.add($.__views.orderProgressContainer);
    $.__views.orderStatus = Ti.UI.createLabel({
        top: 0,
        left: "10dp",
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "12dp"
        },
        color: "#000",
        text: "In Process",
        id: "orderStatus"
    });
    $.__views.orderProgressContainer.add($.__views.orderStatus);
    $.__views.__alloyId1079 = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: "10dp",
        id: "__alloyId1079"
    });
    $.__views.orderProgressContainer.add($.__views.__alloyId1079);
    $.__views.orderProgressStatus = Ti.UI.createLabel({
        top: 0,
        backgroundColor: "#04B404",
        height: "2px",
        left: "0%",
        right: "5%",
        zIndex: 1,
        id: "orderProgressStatus",
        width: "30%"
    });
    $.__views.__alloyId1079.add($.__views.orderProgressStatus);
    $.__views.__alloyId1080 = Ti.UI.createView({
        top: 0,
        backgroundColor: "#6E6E6E",
        height: "2px",
        width: "95%",
        left: "0%",
        right: "0%",
        zIndex: 0,
        id: "__alloyId1080"
    });
    $.__views.__alloyId1079.add($.__views.__alloyId1080);
    $.__views.orderStatusDate = Ti.UI.createLabel({
        left: "10dp",
        font: {
            fontSize: "12dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#000",
        text: "Est Delivery : 26 July - 28 July 2016",
        bindId: "orderStatusDate",
        id: "orderStatusDate"
    });
    $.__views.orderProgressContainer.add($.__views.orderStatusDate);
    $.__views.cancelOrder = Ti.UI.createLabel({
        left: "10dp",
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: Alloy.Globals.labelTitleColor,
        text: "Cancel Order",
        id: "cancelOrder"
    });
    $.__views.orderDetail_container.add($.__views.cancelOrder);
    cancelOrder ? $.addListener($.__views.cancelOrder, "click", cancelOrder) : __defers["$.__views.cancelOrder!click!cancelOrder"] = true;
    $.__views.downloadPdfLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "11dp"
        },
        color: "#e65e48",
        height: "0dp",
        top: "5dp",
        id: "downloadPdfLbl",
        visible: false,
        bindId: "downloadPpdf",
        left: "5%"
    });
    $.__views.__alloyId1078.add($.__views.downloadPdfLbl);
    viewPdfViewer ? $.addListener($.__views.downloadPdfLbl, "click", viewPdfViewer) : __defers["$.__views.downloadPdfLbl!click!viewPdfViewer"] = true;
    var __alloyId1082 = {};
    Alloy.createController("orderTemplate", {
        __parentSymbol: __parentSymbol,
        __itemTemplate: __alloyId1082
    });
    Alloy.createController("orderReturnTemplate", {
        __parentSymbol: __parentSymbol,
        __itemTemplate: __alloyId1082
    });
    $.__views.listSection = Ti.UI.createListSection({
        backgroundColor: "transparent",
        id: "listSection",
        height: Ti.UI.FILL
    });
    var __alloyId1089 = [];
    __alloyId1089.push($.__views.listSection);
    $.__views.orderListView = Ti.UI.createListView({
        backgroundColor: "transparent",
        left: "0",
        right: "0",
        height: Titanium.UI.FILL,
        top: "0dp",
        separatorColor: "transparent",
        separatorHeight: 3,
        zIndex: 10,
        sections: __alloyId1089,
        templates: __alloyId1082,
        footerView: $.__views.__alloyId1078,
        id: "orderListView",
        defaultItemTemplate: "orderTemplate"
    });
    $.__views.orderListView && $.addTopLevelView($.__views.orderListView);
    selectOrderItem ? $.addListener($.__views.orderListView, "itemclick", selectOrderItem) : __defers["$.__views.orderListView!itemclick!selectOrderItem"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var orderType = args.orderType;
    var orderList = args.orderList;
    var orderDetails = args.orderDetail;
    var orderListDetails = [];
    var orderStatus = 0;
    var orderAction = "Enquiry";
    var returnOrder = false;
    $.cancelOrder.increment_id = orderDetails.increment_id;
    var pdfFlag = false;
    var openFlag = false;
    if (!isNullVal(orderDetails.invoice_pdf)) {
        pdfFlag = true;
        $.downloadPdfLbl.pdfUrl = orderDetails.invoice_pdf;
    }
    if (orderDetails.can_cancel) $.cancelOrder.setVisible(true); else {
        $.cancelOrder.setVisible(false);
        $.cancelOrder.setTouchEnabled(false);
    }
    var downloadText = Alloy.Globals.icon.pdfIcon + " View Invoice";
    var downloadAttr = Ti.UI.createAttributedString({
        text: downloadText,
        attributes: [ {
            type: Ti.UI.ATTRIBUTE_FONT,
            value: {
                font: {
                    fontFamily: "futura_lt_bt_light-webfont",
                    fontSize: "13dp"
                }
            },
            range: [ downloadText.indexOf("View Invoice"), "View Invoice".length ]
        }, {
            type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
            value: "#333333",
            range: [ downloadText.indexOf("View Invoice"), "View Invoice".length ]
        } ]
    });
    $.downloadPdfLbl.attributedString = downloadAttr;
    switch (orderDetails.status) {
      case "picked_into_staging":
        orderStatus = 20;
        $.orderProgressStatus.setWidth("20%");
        $.orderStatus.setText("Under Process");
        $.cancelOrder.setVisible(true);
        $.cancelOrder.setTouchEnabled(true);
        break;

      case "order_punched":
        orderStatus = 20;
        $.orderProgressStatus.setWidth("20%");
        $.orderStatus.setText("Under Process");
        $.cancelOrder.setVisible(true);
        $.cancelOrder.setTouchEnabled(true);
        break;

      case "no_stock":
        orderStatus = 20;
        $.orderProgressStatus.setWidth("20%");
        $.orderStatus.setText("Under Process");
        $.cancelOrder.setVisible(true);
        $.cancelOrder.setTouchEnabled(true);
        break;

      case "under_process":
        orderStatus = 20;
        $.orderProgressStatus.setWidth("20%");
        $.orderStatus.setText("Under Process");
        $.cancelOrder.setVisible(true);
        $.cancelOrder.setTouchEnabled(true);
        break;

      case "ready_for_packaging":
        orderStatus = 40;
        $.orderProgressStatus.setWidth("40%");
        $.orderStatus.setText("In Process");
        $.cancelOrder.setVisible(true);
        $.cancelOrder.setTouchEnabled(true);
        break;

      case "ready_for_dispatch":
        orderStatus = 60;
        $.orderProgressStatus.setWidth("60%");
        $.orderStatus.setText("In Process");
        $.cancelOrder.setVisible(true);
        $.cancelOrder.setTouchEnabled(true);
        break;

      case "dispatched":
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

      case "cancelation_requested":
        $.cancelOrder.setText("Cancellation Requested");
        $.cancelOrder.setTouchEnabled(false);
        $.cancelOrder.setVisible(true);
        $.orderProgressContainer.setVisible(false);
    }
    switch (orderType) {
      case "openOr":
        $.orderStatusDate.setText("Est Delivery :" + (orderDetails.estimated_delivery_date || "Not Known"));
        if (openFlag) {
            $.downloadPdfLbl.setVisible(true);
            $.downloadPdfLbl.setHeight("20dp");
            openFlag = false;
        } else {
            $.downloadPdfLbl.setVisible(false);
            $.downloadPdfLbl.setHeight("0dp");
        }
        break;

      case "completedOr":
        $.orderListView.defaultItemTemplate = "orderReturnTemplate";
        $.orderListView.separatorColor = "#a0a0a0";
        $.orderListView.separatorHeight = 1;
        $.orderDetail_container.setHeight("0dp");
        $.orderDetail_container.setVisible(false);
        $.downloadPdfLbl.setVisible(true);
        $.downloadPdfLbl.setHeight("20dp");
        orderAction = "Return";
        break;

      case "cancelledOr":
        $.cancelOrder.setVisible(false);
        $.orderDetail_container.setHeight("0dp");
        $.downloadPdfLbl.setVisible(false);
        $.downloadPdfLbl.setHeight("0dp");
        break;

      case "returnedOr":
        $.orderListView.separatorColor = "#a0a0a0";
        $.orderListView.separatorHeight = 1;
        $.orderDetail_container.setHeight("0dp");
        $.orderDetail_container.setVisible(false);
        $.downloadPdfLbl.setVisible(false);
        $.downloadPdfLbl.setHeight("0dp");
        returnOrder = true;
        var paymentMode = orderDetails.paymentMode;
        orderAction = paymentMode;
    }
    var a = 50;
    _.each(orderList, function(value, k) {
        a += 50;
        var price = Alloy.Globals.icon.currency + parseFloat(value.price).toFixed(2);
        var attr = Ti.UI.createAttributedString({
            text: price,
            attributes: [ {
                type: Ti.UI.ATTRIBUTE_FONT,
                value: {
                    font: {
                        fontFamily: "futura_lt_bt_light-webfont"
                    }
                },
                range: [ price.lastIndexOf("."), 3 ]
            }, {
                type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
                value: "#a0a0a0",
                range: [ price.lastIndexOf("."), 3 ]
            } ]
        });
        var downloadText = Alloy.Globals.icon.pdf + " View Invoice";
        var downloadAttr = Ti.UI.createAttributedString({
            text: downloadText,
            attributes: [ {
                type: Ti.UI.ATTRIBUTE_FONT,
                value: {
                    font: {
                        fontFamily: "futura_lt_bt_light-webfont"
                    }
                },
                range: [ downloadText.indexOf("View Invoice"), "View Invoice".length ]
            }, {
                type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
                value: "#333333",
                range: [ downloadText.indexOf("View Invoice"), "View Invoice".length ]
            } ]
        });
        "completedOr" === orderType && (orderAction = "1" == value.is_return_requested ? "Return Requested" : "2" == value.is_return_requested ? "Return Approved" : "3" == value.is_return_requested ? "Return Rejected" : "Return");
        var data = {
            properties: {
                product_id: value.product_id,
                order_id: orderDetails.increment_id,
                order_status: orderDetails.status,
                order_action: orderAction,
                order_action: orderAction,
                item_id: value.item_id,
                qty: value.qty,
                itemno: k + 1
            },
            orderImage: {
                image: encodeURI(value.image) || ""
            },
            orderTitle: {
                text: value.product_name || ""
            },
            orderPrice: {
                attributedString: attr
            },
            downloadPpdf: {
                attributedString: downloadAttr
            },
            orderCatergory: {
                text: value.size ? value.size : ""
            },
            orderColor: {
                image: encodeURI(value.color_url) || ""
            },
            orderUOM: {
                text: parseInt(value.qty) + " " + value.uom
            },
            orderAction: {
                text: orderAction,
                product_id: value.product_id,
                color: returnOrder ? "#a0a0a0" : Alloy.Globals.labelTitleColor
            },
            returnOrderDate: {
                text: "" != value.returnedDate ? "Returned on : " + value.returnedDate : "",
                height: returnOrder ? Ti.UI.SIZE : 0,
                visible: returnOrder
            }
        };
        "completedOr" == orderType && (data.orderStatusDate = {
            text: "Delivered On :" + (orderDetails.estimated_delivery_date || "Not Known")
        });
        orderListDetails.push(data);
        $.listSection.setItems(orderListDetails);
        $.orderListView.setHeight(Ti.UI.SIZE);
        if (0 != orderListDetails.length && orderListDetails.length >= 4) {
            Ti.API.info("into ****** 1 *****");
            $.orderListView.setHeight(200);
            var ListViewHeight = parseInt($.orderListView.getHeight());
            $.orderListView.setHeight(ListViewHeight + a);
        } else if ("cancelation_requested" == orderDetails.status && 4 == orderListDetails.length) {
            $.orderListView.setHeight(100);
            var ListViewHeight = parseInt($.orderListView.getHeight());
            $.orderListView.setHeight(Ti.UI.SIZE);
        }
    });
    __defers["$.__views.cancelOrder!click!cancelOrder"] && $.addListener($.__views.cancelOrder, "click", cancelOrder);
    __defers["$.__views.downloadPdfLbl!click!viewPdfViewer"] && $.addListener($.__views.downloadPdfLbl, "click", viewPdfViewer);
    __defers["$.__views.orderListView!itemclick!selectOrderItem"] && $.addListener($.__views.orderListView, "itemclick", selectOrderItem);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;