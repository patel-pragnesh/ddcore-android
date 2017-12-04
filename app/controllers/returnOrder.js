var args = arguments[0] || {};

var orderInfo = args.orderInfo;
var reasonText = null;
//orderInfo.qty=2;

var qtyContainer = new Array(),
    qtyLbl = new Array();

var returnOrderTitle = "ARE YOU SURE?";
//var returnOrderMessage = "Test Message for Return Product . Please confirm you Product Status. Test Message";
var returnOrderMessage = "You have request for Return Product. Please confirm ?";

var returnMessage = returnOrderTitle + "\n \n" + returnOrderMessage;

$.returnOrderMsgContainer.text = returnMessage;

var attr = Ti.UI.createAttributedString({
    text : returnMessage,
    attributes : [{
        type : Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
        value : Alloy.Globals.labelTitleColor,
        range : [returnMessage.indexOf(returnOrderTitle), (returnOrderTitle).length]
    }, {
        type : Ti.UI.ATTRIBUTE_FONT,
        value : {
            fontSize : "14dp"
        },
        range : [returnMessage.indexOf(returnOrderTitle), (returnOrderTitle).length]
    }, {
        type : Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
        value : "#fff",
        range : [returnMessage.indexOf(returnOrderMessage), (returnOrderMessage).length]
    }, {
        type : Ti.UI.ATTRIBUTE_FONT,
        value : {
            fontSize : "12dp"
        },
        range : [returnMessage.indexOf(returnOrderMessage), (returnOrderMessage).length]
    }]
});

$.returnOrderMsgContainer.attributedString = attr;

var isAddress = false;

init();

function init() {

    (args.mainWindow).addEventListener("android:back", closeReturnOrder);
    args.androidBack();

    $.qty.setText(parseInt(orderInfo.qty) + " QUANTITY");
    $.qty.qty = parseInt(orderInfo.qty);

    if (parseInt(orderInfo.qty) == 1) {
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
            reasonText : {
                text : value,
                key : k
            },
            reasonIcon : {
                color : "#33ffffff",
                reasonText : value
            }
        });
    });
    $.reasonListSection.setItems(listData);

}

function confirmOrderReturn() {
    if ($.action1.text === "YES") {

        $.action1.text = "SUBMIT RETURN REQUEST";
        $.returnOrderMsgContainer.setVisible(false);
        $.returnReasonContainer.setVisible(true);
    } else {
        // SUBMIT RETURN REQUEST
        submitReturnOrder();
    }
}

function closeReturnOrder() {
    //hideShowView($.returnOrder);

    args.closeAndroidBack();
    (args.mainWindow).removeEventListener("android:back", closeReturnOrder);

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
            message : 'Are you sure ?',
            title : 'Delete Image',
            cancel : 1,
            buttonNames : ['Yes', 'No'],
        });

        deleteConfirmation.addEventListener('click', function(ex) {
            if (ex.index === 0) {
                $.cameraBtn.setText(Alloy.Globals.icon.camera);
                $.returnOrderImg.setImage("");
                deleteConfirmation = null;
            }
        });

        deleteConfirmation.show();

    } else {

        var cropping = require("cropping");
        //args.mainWindow
        //$.returnOrder

        cropping.callimagecrop($.returnOrderImg, args.mainWindow, {
            x : 4,
            y : 3
        }, changePhotoFunction);

    }

}

function changePhotoFunction() {

    $.cameraBtn.setText(Alloy.Globals.icon.deleteIcon);

}

$.close_btn.addEventListener('click', closeReturnOrder);

$.cameraBtn.addEventListener('click', openCamera);
$.action1.addEventListener('click', confirmOrderReturn);
$.action2.addEventListener('click', closeReturnOrder);

function changeQtyPopup() {
    hideKeyboard();
    displayQty();

    hideShowView($.qtyContainer);
}

function displayQty() {

    for (var i = 1; i <= parseInt(orderInfo.qty); i++) {

        qtyContainer[i] = Ti.UI.createView({
            height : "35dp",
            top : "0dp",
            left : "0dp",
            width : Titanium.UI.FILL,
            layout : "vertical",
            id : i,
            type : "sortOption",
            qtyValue : i
            //borderColor:"red"
        });

        qtyLbl[i] = Ti.UI.createLabel({
            id : "lbl" + i,
            font : {
                fontSize : "13dp",
                fontFamily : "futura_lt_bt_light-webfont"
            },
            color : "#e65e48",
            top : "0dp",
            left : "0dp",
            width : Titanium.UI.FILL,
            touchEnabled : false,
            //text : i + " SET",
            text : i + " QUANTITY",
            value : i,
            // borderColor:"yellow"
        });

        qtyContainer[i].add(qtyLbl[i]);

        $.qtyDetails.add(qtyContainer[i]);

    };

}

function changeQty(e) {
    Ti.API.info('e.source.type: ' + e.source.type);

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

        var currentItem,
            listItem;
        if (bindId) {
            var bind = bindId;
            currentItem = e.section.items[index];
            listItem = currentItem[bind];

        }

        var reasonIcon = currentItem["reasonIcon"];

        for (var i = 0; i < getAllReasonIcon.length; i++) {

            if (i != index) {

                var _currentRow = getAllReasonIcon[i];
                var _reasonIcon = _currentRow["reasonIcon"];
                _reasonIcon.color = "#33ffffff";

                e.section.updateItemAt(i, _currentRow);
            }
        }

        if (reasonIcon.color == Alloy.Globals.labelTitleColor) {
            reasonIcon.color = "#33ffffff";
        } else {
            reasonIcon.color = Alloy.Globals.labelTitleColor;
        }

        e.section.updateItemAt(index, currentItem);
        reasonText = reasonIcon.reasonText;

    } catch(exp) {
        Ti.API.info('List View Expection-->' + exp.message);
    }

}

function noteTxtFocus() {
    if ($.note_txt.getValue() == "NOTES (OPTIONAL)") {
        $.note_txt.setValue("");
        $.note_txt.setColor("#fff");
    }
}

function noteTxtBlur() {
    if (($.note_txt.getValue()).trim() == "") {
        $.note_txt.setValue("NOTES (OPTIONAL)");
        $.note_txt.setColor("#a0a0a0");
    }
}

function hideKeyboard() {
    if (Ti.App.keyboardVisible) {
        $.note_txt.blur();
    }
}

function submitReturnOrder() {

    if (reasonText == null || reasonText == undefined) {
        showAlert($.returnOrder, "Please Select Reason to Return Product ");
    } else {

        //showTransparentLoader($.returnOrder);

        var requestMethod = Alloy.Globals.commonUrl.returnProduct;
        var param = {
            orderId : orderInfo.order_id,
            itemno : orderInfo.itemno, //"1",
            itemid : orderInfo.item_id,
            reason : reasonText, //"Product is Damaged during transit",
            quantity : $.qty.qty,
            note : ($.note_txt.getValue() == "NOTES (OPTIONAL)" ? "" : $.note_txt.getValue()),

        };

        var requestParam = JSON.stringify(param);
        Ti.API.info('submit Product Return request Param---> ' + requestParam);

        // returnProductSuccess();

        Alloy.Globals.webServiceCall(requestMethod, requestParam, returnProductSuccess, returnProductError, "POST", $.returnOrder);

    }
}

function returnProductSuccess(response) {
    //$.close_btn.fireEvent("click");
    args.updateOrderStatus(args.returnProductParam);
    closeReturnOrder();
    showAlert(args.mainWindow, "Product Return Requested");
}

function returnProductError(response) {
    showAlert(args.mainWindow, response.message);

    closeReturnOrder();
}

