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
        args.mainWindow.addEventListener("android:back", closeReturnOrder);
        args.androidBack();
        $.qty.setText(parseInt(orderInfo.qty) + " QUANTITY");
        $.qty.qty = parseInt(orderInfo.qty);
        if (1 == parseInt(orderInfo.qty)) {
            $.changeQty.setTouchEnabled(false);
            $.changeQty.setVisible(false);
        }
        showTransparentLoader($.returnOrder);
        var requestMethod = Alloy.Globals.commonUrl.returnReasons;
        Alloy.Globals.webServiceCall(requestMethod, "", returnReasonsSuccess, returnReasonsError, "POST", $.returnOrder);
    }
    function returnReasonsSuccess(response) {
        setReason(response.data.reasons);
        hideTransparentLoader();
    }
    function returnReasonsError(response) {
        hideTransparentLoader();
        showAlert($.returnOrder, response.message);
    }
    function setReason(data) {
        var listData = [];
        _.each(data, function(value, k) {
            listData.push({
                reasonText: {
                    text: value,
                    key: k
                },
                reasonIcon: {
                    color: "#33ffffff",
                    reasonText: value
                }
            });
        });
        $.reasonListSection.setItems(listData);
    }
    function confirmOrderReturn() {
        if ("YES" === $.action1.text) {
            $.action1.text = "SUBMIT RETURN REQUEST";
            $.returnOrderMsgContainer.setVisible(false);
            $.returnReasonContainer.setVisible(true);
        } else submitReturnOrder();
    }
    function closeReturnOrder() {
        args.closeAndroidBack();
        args.mainWindow.removeEventListener("android:back", closeReturnOrder);
        $.removeListener();
        var _parent = $.returnOrder.parent;
        _parent.remove($.returnOrder);
        $.returnOrder.removeAllChildren();
        args = {};
        $.destroy();
    }
    function openCamera() {
        if ($.cameraBtn.getText() == Alloy.Globals.icon.deleteIcon) {
            var deleteConfirmation = $.UI.create("AlertDialog", {
                message: "Are you sure ?",
                title: "Delete Image",
                cancel: 1,
                buttonNames: [ "Yes", "No" ]
            });
            deleteConfirmation.addEventListener("click", function(ex) {
                if (0 === ex.index) {
                    $.cameraBtn.setText(Alloy.Globals.icon.camera);
                    $.returnOrderImg.setImage("");
                    deleteConfirmation = null;
                }
            });
            deleteConfirmation.show();
        } else {
            var cropping = require("cropping");
            cropping.callimagecrop($.returnOrderImg, args.mainWindow, {
                x: 4,
                y: 3
            }, changePhotoFunction);
        }
    }
    function changePhotoFunction() {
        $.cameraBtn.setText(Alloy.Globals.icon.deleteIcon);
    }
    function changeQtyPopup() {
        hideKeyboard();
        displayQty();
        hideShowView($.qtyContainer);
    }
    function displayQty() {
        for (var i = 1; i <= parseInt(orderInfo.qty); i++) {
            qtyContainer[i] = Ti.UI.createView({
                height: "35dp",
                top: "0dp",
                left: "0dp",
                width: Titanium.UI.FILL,
                layout: "vertical",
                id: i,
                type: "sortOption",
                qtyValue: i
            });
            qtyLbl[i] = Ti.UI.createLabel({
                id: "lbl" + i,
                font: {
                    fontSize: "13dp",
                    fontFamily: "futura_lt_bt_light-webfont"
                },
                color: "#e65e48",
                top: "0dp",
                left: "0dp",
                width: Titanium.UI.FILL,
                touchEnabled: false,
                text: i + " QUANTITY",
                value: i
            });
            qtyContainer[i].add(qtyLbl[i]);
            $.qtyDetails.add(qtyContainer[i]);
        }
    }
    function changeQty(e) {
        Ti.API.info("e.source.type: " + e.source.type);
        $.qty.setText(parseInt(e.source.qtyValue) + " QUANTITY");
        $.qty.qty = parseInt(e.source.qtyValue);
        hideQtyContainer();
    }
    function hideQtyContainer() {
        hideShowView($.qtyContainer);
        $.qtyDetails.removeAllChildren();
    }
    function selectReason(e) {
        try {
            hideKeyboard();
            var bindId = e.bindId;
            var index = e.itemIndex;
            var getAllReasonIcon = e.section.items;
            var currentItem, listItem;
            if (bindId) {
                var bind = bindId;
                currentItem = e.section.items[index];
                listItem = currentItem[bind];
            }
            var reasonIcon = currentItem["reasonIcon"];
            for (var i = 0; i < getAllReasonIcon.length; i++) if (i != index) {
                var _currentRow = getAllReasonIcon[i];
                var _reasonIcon = _currentRow["reasonIcon"];
                _reasonIcon.color = "#33ffffff";
                e.section.updateItemAt(i, _currentRow);
            }
            reasonIcon.color == Alloy.Globals.labelTitleColor ? reasonIcon.color = "#33ffffff" : reasonIcon.color = Alloy.Globals.labelTitleColor;
            e.section.updateItemAt(index, currentItem);
            reasonText = reasonIcon.reasonText;
        } catch (exp) {
            Ti.API.info("List View Expection-->" + exp.message);
        }
    }
    function noteTxtFocus() {
        if ("NOTES (OPTIONAL)" == $.note_txt.getValue()) {
            $.note_txt.setValue("");
            $.note_txt.setColor("#fff");
        }
    }
    function noteTxtBlur() {
        if ("" == $.note_txt.getValue().trim()) {
            $.note_txt.setValue("NOTES (OPTIONAL)");
            $.note_txt.setColor("#a0a0a0");
        }
    }
    function hideKeyboard() {
        Ti.App.keyboardVisible && $.note_txt.blur();
    }
    function submitReturnOrder() {
        if (null == reasonText || void 0 == reasonText) showAlert($.returnOrder, "Please Select Reason to Return Product "); else {
            var requestMethod = Alloy.Globals.commonUrl.returnProduct;
            var param = {
                orderId: orderInfo.order_id,
                itemno: orderInfo.itemno,
                itemid: orderInfo.item_id,
                reason: reasonText,
                quantity: $.qty.qty,
                note: "NOTES (OPTIONAL)" == $.note_txt.getValue() ? "" : $.note_txt.getValue()
            };
            var requestParam = JSON.stringify(param);
            Ti.API.info("submit Product Return request Param---> " + requestParam);
            Alloy.Globals.webServiceCall(requestMethod, requestParam, returnProductSuccess, returnProductError, "POST", $.returnOrder);
        }
    }
    function returnProductSuccess(response) {
        args.updateOrderStatus(args.returnProductParam);
        closeReturnOrder();
        showAlert(args.mainWindow, "Product Return Requested");
    }
    function returnProductError(response) {
        showAlert(args.mainWindow, response.message);
        closeReturnOrder();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "returnOrder";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.returnOrder = Ti.UI.createView({
        width: "100%",
        height: "100%",
        backgroundColor: "#231f20",
        zIndex: 11,
        id: "returnOrder"
    });
    $.__views.returnOrder && $.addTopLevelView($.__views.returnOrder);
    hideKeyboard ? $.addListener($.__views.returnOrder, "touchstart", hideKeyboard) : __defers["$.__views.returnOrder!touchstart!hideKeyboard"] = true;
    $.__views.screenName = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "18dp"
        },
        left: "5%",
        top: "30dp",
        color: "#fff",
        text: "RETURN PRODUCT",
        id: "screenName"
    });
    $.__views.returnOrder.add($.__views.screenName);
    $.__views.close_btn = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "20dp"
        },
        width: "40dp",
        height: "40dp",
        right: "5%",
        top: "20dp",
        text: Alloy.Globals.icon.close,
        color: "#fff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "close_btn"
    });
    $.__views.returnOrder.add($.__views.close_btn);
    $.__views.returnOrderMsgContainer = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_medium_bt-webfont"
        },
        width: "90%",
        height: Titanium.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        visible: true,
        id: "returnOrderMsgContainer"
    });
    $.__views.returnOrder.add($.__views.returnOrderMsgContainer);
    $.__views.returnReasonContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "70dp",
        layout: "vertical",
        borderColor: "transparent",
        visible: false,
        id: "returnReasonContainer"
    });
    $.__views.returnOrder.add($.__views.returnReasonContainer);
    $.__views.selectReasonTitle = Ti.UI.createLabel({
        font: {
            fontFamily: "futura-hv-bt-heavy",
            fontSize: "10dp"
        },
        top: "5dp",
        left: "5%",
        color: Alloy.Globals.labelTitleColor,
        text: "SELECT A REASON",
        id: "selectReasonTitle"
    });
    $.__views.returnReasonContainer.add($.__views.selectReasonTitle);
    var __alloyId1305 = {};
    var __alloyId1308 = [];
    var __alloyId1309 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId1310 = [];
            var __alloyId1311 = {
                type: "Ti.UI.Label",
                bindId: "reasonIcon",
                properties: {
                    font: {
                        fontFamily: "icomoon",
                        fontSize: "14dp"
                    },
                    text: Alloy.Globals.icon.radio,
                    color: "#33ffffff",
                    left: 0,
                    top: "12dp",
                    bindId: "reasonIcon",
                    reason: "reason1"
                }
            };
            __alloyId1310.push(__alloyId1311);
            var __alloyId1313 = {
                type: "Ti.UI.Label",
                bindId: "reasonText",
                properties: {
                    font: {
                        fontFamily: "futura_lt_bt_light-webfont",
                        fontSize: "14dp"
                    },
                    top: "10dp",
                    color: "#fff",
                    left: 5,
                    text: "REASON 1",
                    reason: "reason1",
                    bindId: "reasonText"
                }
            };
            __alloyId1310.push(__alloyId1313);
            return __alloyId1310;
        }(),
        properties: {
            width: Titanium.UI.SIZE,
            height: Titanium.UI.SIZE,
            reason: "reason1",
            layout: "horizontal",
            left: "5%",
            top: "5dp"
        }
    };
    __alloyId1308.push(__alloyId1309);
    var __alloyId1307 = {
        properties: {
            name: "reasonTemplate",
            backgroundColor: "transparent",
            selectedBackgroundColor: "#00000000",
            selectionStyle: "none"
        },
        childTemplates: __alloyId1308
    };
    __alloyId1305["reasonTemplate"] = __alloyId1307;
    $.__views.reasonListSection = Ti.UI.createListSection({
        id: "reasonListSection"
    });
    var __alloyId1315 = [];
    __alloyId1315.push($.__views.reasonListSection);
    $.__views.reasonList = Ti.UI.createListView({
        width: Titanium.UI.FILL,
        sections: __alloyId1315,
        templates: __alloyId1305,
        id: "reasonList",
        height: "180dp",
        top: 0,
        defaultItemTemplate: "reasonTemplate",
        separatorColor: "transparent",
        backgroundColor: "transparent"
    });
    $.__views.returnReasonContainer.add($.__views.reasonList);
    selectReason ? $.addListener($.__views.reasonList, "itemclick", selectReason) : __defers["$.__views.reasonList!itemclick!selectReason"] = true;
    $.__views.__alloyId1316 = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        layout: "horizontal",
        top: "5dp",
        left: "5%",
        bottom: "10dp",
        id: "__alloyId1316"
    });
    $.__views.returnReasonContainer.add($.__views.__alloyId1316);
    $.__views.qty = Ti.UI.createLabel({
        color: "#e64e48",
        font: {
            fontSize: "12dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        text: "1 QUANTITY",
        right: "10dp",
        id: "qty"
    });
    $.__views.__alloyId1316.add($.__views.qty);
    $.__views.changeQty = Ti.UI.createLabel({
        color: "#e64e48",
        font: {
            fontSize: "12dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        text: "Change",
        id: "changeQty"
    });
    $.__views.__alloyId1316.add($.__views.changeQty);
    changeQtyPopup ? $.addListener($.__views.changeQty, "click", changeQtyPopup) : __defers["$.__views.changeQty!click!changeQtyPopup"] = true;
    $.__views.__alloyId1317 = Ti.UI.createView({
        backgroundColor: Alloy.Globals.labelTitleColor,
        width: "90%",
        height: "2px",
        top: "2dp",
        id: "__alloyId1317"
    });
    $.__views.returnReasonContainer.add($.__views.__alloyId1317);
    $.__views.note_txt = Ti.UI.createTextArea({
        font: {
            fontFamily: "futura_lt_bt_light-webfont"
        },
        backgroundColor: "transparent",
        width: "90%",
        top: "2dp",
        color: "#a0a0a0",
        height: "70dp",
        id: "note_txt",
        value: "NOTES (OPTIONAL)"
    });
    $.__views.returnReasonContainer.add($.__views.note_txt);
    noteTxtFocus ? $.addListener($.__views.note_txt, "focus", noteTxtFocus) : __defers["$.__views.note_txt!focus!noteTxtFocus"] = true;
    noteTxtBlur ? $.addListener($.__views.note_txt, "blur", noteTxtBlur) : __defers["$.__views.note_txt!blur!noteTxtBlur"] = true;
    $.__views.__alloyId1318 = Ti.UI.createView({
        backgroundColor: Alloy.Globals.labelTitleColor,
        width: "90%",
        height: "2px",
        top: "2dp",
        id: "__alloyId1318"
    });
    $.__views.returnReasonContainer.add($.__views.__alloyId1318);
    $.__views.__alloyId1319 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: "100dp",
        top: "10dp",
        left: "5%",
        right: "5%",
        id: "__alloyId1319"
    });
    $.__views.returnReasonContainer.add($.__views.__alloyId1319);
    $.__views.returnOrderImg = Ti.UI.createImageView({
        width: "40dp",
        height: "40dp",
        right: "12%",
        top: "8dp",
        id: "returnOrderImg"
    });
    $.__views.__alloyId1319.add($.__views.returnOrderImg);
    $.__views.cameraBtn = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "18dp"
        },
        text: Alloy.Globals.icon.camera,
        color: Alloy.Globals.labelTitleColor,
        right: "0dp",
        top: "10dp",
        width: "40dp",
        height: "40dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "cameraBtn"
    });
    $.__views.__alloyId1319.add($.__views.cameraBtn);
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
    $.__views.returnOrder.add($.__views.action1);
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
    $.__views.returnOrder.add($.__views.action2);
    $.__views.qtyContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        visible: false,
        layout: "vertical",
        backgroundColor: "#231f20",
        id: "qtyContainer"
    });
    $.__views.returnOrder.add($.__views.qtyContainer);
    $.__views.__alloyId1320 = Ti.UI.createView({
        top: "20dp",
        width: Titanium.UI.FILL,
        height: "53dp",
        id: "__alloyId1320"
    });
    $.__views.qtyContainer.add($.__views.__alloyId1320);
    $.__views.__alloyId1321 = Ti.UI.createLabel({
        left: "15dp",
        height: Titanium.UI.FILL,
        font: {
            fontSize: "18dp",
            fontFamily: "Futura Lt BT"
        },
        color: "#ffffff",
        text: "SELECT QUANTITY",
        id: "__alloyId1321"
    });
    $.__views.__alloyId1320.add($.__views.__alloyId1321);
    $.__views.qtyCloseLbl = Ti.UI.createLabel({
        right: "15dp",
        width: "40dp",
        height: "40dp",
        font: {
            fontSize: "20dp",
            fontFamily: "icomoon"
        },
        color: "#ffffff",
        text: Alloy.Globals.icon.close,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "qtyCloseLbl"
    });
    $.__views.__alloyId1320.add($.__views.qtyCloseLbl);
    hideQtyContainer ? $.addListener($.__views.qtyCloseLbl, "click", hideQtyContainer) : __defers["$.__views.qtyCloseLbl!click!hideQtyContainer"] = true;
    $.__views.qtyDetails = Ti.UI.createScrollView({
        top: "15dp",
        width: Titanium.UI.FILL,
        right: "15dp",
        left: "15dp",
        height: Titanium.UI.FILL,
        layout: "vertical",
        bottom: "75dp",
        id: "qtyDetails"
    });
    $.__views.qtyContainer.add($.__views.qtyDetails);
    changeQty ? $.addListener($.__views.qtyDetails, "click", changeQty) : __defers["$.__views.qtyDetails!click!changeQty"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var orderInfo = args.orderInfo;
    var reasonText = null;
    var qtyContainer = new Array(), qtyLbl = new Array();
    var returnOrderTitle = "ARE YOU SURE?";
    var returnOrderMessage = "You have request for Return Product. Please confirm ?";
    var returnMessage = returnOrderTitle + "\n \n" + returnOrderMessage;
    $.returnOrderMsgContainer.text = returnMessage;
    var attr = Ti.UI.createAttributedString({
        text: returnMessage,
        attributes: [ {
            type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
            value: Alloy.Globals.labelTitleColor,
            range: [ returnMessage.indexOf(returnOrderTitle), returnOrderTitle.length ]
        }, {
            type: Ti.UI.ATTRIBUTE_FONT,
            value: {
                fontSize: "14dp"
            },
            range: [ returnMessage.indexOf(returnOrderTitle), returnOrderTitle.length ]
        }, {
            type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
            value: "#fff",
            range: [ returnMessage.indexOf(returnOrderMessage), returnOrderMessage.length ]
        }, {
            type: Ti.UI.ATTRIBUTE_FONT,
            value: {
                fontSize: "12dp"
            },
            range: [ returnMessage.indexOf(returnOrderMessage), returnOrderMessage.length ]
        } ]
    });
    $.returnOrderMsgContainer.attributedString = attr;
    init();
    $.close_btn.addEventListener("click", closeReturnOrder);
    $.cameraBtn.addEventListener("click", openCamera);
    $.action1.addEventListener("click", confirmOrderReturn);
    $.action2.addEventListener("click", closeReturnOrder);
    __defers["$.__views.returnOrder!touchstart!hideKeyboard"] && $.addListener($.__views.returnOrder, "touchstart", hideKeyboard);
    __defers["$.__views.reasonList!itemclick!selectReason"] && $.addListener($.__views.reasonList, "itemclick", selectReason);
    __defers["$.__views.changeQty!click!changeQtyPopup"] && $.addListener($.__views.changeQty, "click", changeQtyPopup);
    __defers["$.__views.note_txt!focus!noteTxtFocus"] && $.addListener($.__views.note_txt, "focus", noteTxtFocus);
    __defers["$.__views.note_txt!blur!noteTxtBlur"] && $.addListener($.__views.note_txt, "blur", noteTxtBlur);
    __defers["$.__views.qtyCloseLbl!click!hideQtyContainer"] && $.addListener($.__views.qtyCloseLbl, "click", hideQtyContainer);
    __defers["$.__views.qtyDetails!click!changeQty"] && $.addListener($.__views.qtyDetails, "click", changeQty);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;