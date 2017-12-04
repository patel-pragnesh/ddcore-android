function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function confirmOrderCancel() {
        showFullLoader(args.mainWindow);
        var requestMethod = Alloy.Globals.commonUrl.cancelOrder;
        var param = {
            order_id: args.orderId
        };
        var requestParam = JSON.stringify(param);
        Alloy.Globals.webServiceCall(requestMethod, requestParam, confirmOrderCancelSuccessCallback, confirmOrderCancelErrorCallback, "POST", args.mainWindow);
    }
    function confirmOrderCancelSuccessCallback(response) {
        hideFullLoader();
        showAlert(args.mainWindow, "Cancellation Requested Successfully");
        hideShowView($.cancelOrder);
        args.returnCancelSuccess(response);
        setTimeout(function() {
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
        if ("close_btn" === id || "BACK" === e.source.text || "myaccount" === id) {
            args.closeAndroidBack();
            args.mainWindow.removeEventListener("android:back", closeCancelOrder);
            hideShowView($.cancelOrder);
            setTimeout(function() {
                var _parent = $.cancelOrder.parent;
                _parent.remove($.cancelOrder);
                $.cancelOrder.removeAllChildren();
            }, 1500);
            $.removeListener();
            $.destroy();
        }
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "cancelOrder";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.cancelOrder = Ti.UI.createView({
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        zIndex: 11,
        id: "cancelOrder"
    });
    $.__views.cancelOrder && $.addTopLevelView($.__views.cancelOrder);
    $.__views.screenName = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "18dp"
        },
        left: "5%",
        top: "10dp",
        color: "#fff",
        text: "CANCEL ORDER",
        id: "screenName"
    });
    $.__views.cancelOrder.add($.__views.screenName);
    $.__views.close_btn = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "20dp"
        },
        right: "5%",
        width: "20dp",
        height: "20dp",
        top: "10dp",
        color: "#fff",
        text: Alloy.Globals.icon.close,
        id: "close_btn"
    });
    $.__views.cancelOrder.add($.__views.close_btn);
    closeCancelOrder ? $.addListener($.__views.close_btn, "click", closeCancelOrder) : __defers["$.__views.close_btn!click!closeCancelOrder"] = true;
    $.__views.cancelOrderMsgContainer = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "18dp"
        },
        width: "90%",
        height: Titanium.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "cancelOrderMsgContainer"
    });
    $.__views.cancelOrder.add($.__views.cancelOrderMsgContainer);
    $.__views.action1 = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_medium_bt-webfont",
            fontSize: "14dp"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        width: "70%",
        height: "50dp",
        borderColor: "#7b7979",
        borderWidth: 1,
        bottom: "60dp",
        color: "#fff",
        text: "YES",
        id: "action1"
    });
    $.__views.cancelOrder.add($.__views.action1);
    confirmOrderCancel ? $.addListener($.__views.action1, "click", confirmOrderCancel) : __defers["$.__views.action1!click!confirmOrderCancel"] = true;
    $.__views.action2 = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "11dp"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        width: "70%",
        height: "50dp",
        color: Alloy.Globals.labelTitleColor,
        bottom: "10dp",
        text: "BACK",
        id: "action2"
    });
    $.__views.cancelOrder.add($.__views.action2);
    closeCancelOrder ? $.addListener($.__views.action2, "click", closeCancelOrder) : __defers["$.__views.action2!click!closeCancelOrder"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    touchEffect.createTouchEffect($.close_btn, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.action1, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.action2, "#a6e64e48", Alloy.Globals.labelTitleColor);
    args.mainWindow.addEventListener("android:back", closeCancelOrder);
    args.androidBack();
    var cancelMessage = "You have opted to cancel this product.\n Are you sure you want to proceed?";
    $.cancelOrderMsgContainer.text = cancelMessage;
    $.cancelOrderMsgContainer.color = Alloy.Globals.labelTitleColor;
    __defers["$.__views.close_btn!click!closeCancelOrder"] && $.addListener($.__views.close_btn, "click", closeCancelOrder);
    __defers["$.__views.action1!click!confirmOrderCancel"] && $.addListener($.__views.action1, "click", confirmOrderCancel);
    __defers["$.__views.action2!click!closeCancelOrder"] && $.addListener($.__views.action2, "click", closeCancelOrder);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;