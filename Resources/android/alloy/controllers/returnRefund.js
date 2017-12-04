function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function goToBack() {
        Alloy.Globals.popWindowInNav();
        $.returnRefund.close();
    }
    function destroyWindow(e) {
        $.returnRefund.removeAllChildren();
        $.destroy();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "returnRefund";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.returnRefund = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        id: "returnRefund"
    });
    $.__views.returnRefund && $.addTopLevelView($.__views.returnRefund);
    goToBack ? $.addListener($.__views.returnRefund, "android:back", goToBack) : __defers["$.__views.returnRefund!android:back!goToBack"] = true;
    destroyWindow ? $.addListener($.__views.returnRefund, "close", destroyWindow) : __defers["$.__views.returnRefund!close!destroyWindow"] = true;
    $.__views.superView = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        backgroundColor: "#231f20",
        id: "superView"
    });
    $.__views.returnRefund.add($.__views.superView);
    $.__views.__alloyId1322 = Ti.UI.createView({
        top: "0dp",
        zIndex: "100",
        width: Titanium.UI.FILL,
        height: "40dp",
        id: "__alloyId1322"
    });
    $.__views.superView.add($.__views.__alloyId1322);
    $.__views.__alloyId1323 = Ti.UI.createLabel({
        left: "20dp",
        height: Titanium.UI.FILL,
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        text: "RETURNS / REFUND POLICY",
        id: "__alloyId1323"
    });
    $.__views.__alloyId1322.add($.__views.__alloyId1323);
    $.__views.refundCloseLbl = Ti.UI.createLabel({
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
        id: "refundCloseLbl"
    });
    $.__views.__alloyId1322.add($.__views.refundCloseLbl);
    $.__views.__alloyId1324 = Ti.UI.createScrollView({
        layout: "vertical",
        top: "40dp",
        id: "__alloyId1324"
    });
    $.__views.superView.add($.__views.__alloyId1324);
    $.__views.__alloyId1325 = Ti.UI.createView({
        left: "20dp",
        right: "20dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId1325"
    });
    $.__views.__alloyId1324.add($.__views.__alloyId1325);
    $.__views.__alloyId1326 = Ti.UI.createView({
        top: "20dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId1326"
    });
    $.__views.__alloyId1325.add($.__views.__alloyId1326);
    $.__views.__alloyId1327 = Ti.UI.createLabel({
        font: {
            fontSize: "13dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        text: "Thanks for shopping at D’decor. We appreciate the fact that you like to buy our products.",
        id: "__alloyId1327"
    });
    $.__views.__alloyId1326.add($.__views.__alloyId1327);
    $.__views.__alloyId1328 = Ti.UI.createView({
        top: "20dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId1328"
    });
    $.__views.__alloyId1325.add($.__views.__alloyId1328);
    $.__views.__alloyId1329 = Ti.UI.createLabel({
        font: {
            fontSize: "13dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        text: "We understand, however, that sometimes a product may not be what you expected it to be. In that unlikely event,\nwe invite you to review the following terms related to returning a product.",
        id: "__alloyId1329"
    });
    $.__views.__alloyId1328.add($.__views.__alloyId1329);
    $.__views.__alloyId1330 = Ti.UI.createView({
        top: "20dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId1330"
    });
    $.__views.__alloyId1325.add($.__views.__alloyId1330);
    $.__views.__alloyId1331 = Ti.UI.createLabel({
        font: {
            fontSize: "13dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        text: "As with any shopping experience, there are terms and conditions that apply to transactions at D’decor Store. The main thing to remember is that by placing an order or making a purchase at D’decor, you agree to the terms set forth as below.",
        id: "__alloyId1331"
    });
    $.__views.__alloyId1330.add($.__views.__alloyId1331);
    $.__views.__alloyId1332 = Ti.UI.createView({
        top: "30dp",
        height: "0.5dp",
        width: Titanium.UI.FILL,
        backgroundColor: "#999999",
        id: "__alloyId1332"
    });
    $.__views.__alloyId1324.add($.__views.__alloyId1332);
    $.__views.questions = Ti.UI.createView({
        left: "20dp",
        right: "20dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "questions"
    });
    $.__views.__alloyId1324.add($.__views.questions);
    $.__views.__alloyId1333 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId1333"
    });
    $.__views.questions.add($.__views.__alloyId1333);
    $.__views.__alloyId1334 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        top: "30dp",
        id: "__alloyId1334"
    });
    $.__views.__alloyId1333.add($.__views.__alloyId1334);
    $.__views.__alloyId1335 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: "ON WHAT BASIS CAN I RETURN THE PRODUCT?",
        type: "questionText",
        id: "__alloyId1335"
    });
    $.__views.__alloyId1334.add($.__views.__alloyId1335);
    $.__views.__alloyId1336 = Ti.UI.createLabel({
        right: 0,
        width: "10%",
        color: "#ffffff",
        font: {
            fontSize: "12dp",
            fontFamily: "icomoon"
        },
        text: Alloy.Globals.icon.downArrow,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        touchEnabled: false,
        type: "questionText",
        id: "__alloyId1336"
    });
    $.__views.__alloyId1334.add($.__views.__alloyId1336);
    $.__views.__alloyId1337 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId1337"
    });
    $.__views.__alloyId1333.add($.__views.__alloyId1337);
    $.__views.__alloyId1338 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Product can be returned if one of the below conditions is satisfied.",
        bottom: "8dp",
        id: "__alloyId1338"
    });
    $.__views.__alloyId1337.add($.__views.__alloyId1338);
    $.__views.__alloyId1339 = Ti.UI.createView({
        top: "8dp",
        bottom: "8dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId1339"
    });
    $.__views.__alloyId1337.add($.__views.__alloyId1339);
    $.__views.__alloyId1340 = Ti.UI.createView({
        left: 0,
        height: "5dp",
        width: "5dp",
        borderRadius: "2.5dp",
        backgroundColor: "#e65e48",
        id: "__alloyId1340"
    });
    $.__views.__alloyId1339.add($.__views.__alloyId1340);
    $.__views.__alloyId1341 = Ti.UI.createLabel({
        left: "20dp",
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Product is Damaged- during transit.",
        id: "__alloyId1341"
    });
    $.__views.__alloyId1339.add($.__views.__alloyId1341);
    $.__views.__alloyId1342 = Ti.UI.createView({
        top: "8dp",
        bottom: "8dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId1342"
    });
    $.__views.__alloyId1337.add($.__views.__alloyId1342);
    $.__views.__alloyId1343 = Ti.UI.createView({
        left: 0,
        height: "5dp",
        width: "5dp",
        borderRadius: "2.5dp",
        backgroundColor: "#e65e48",
        id: "__alloyId1343"
    });
    $.__views.__alloyId1342.add($.__views.__alloyId1343);
    $.__views.__alloyId1344 = Ti.UI.createLabel({
        left: "20dp",
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Product is Defective - during manufacturing process.",
        id: "__alloyId1344"
    });
    $.__views.__alloyId1342.add($.__views.__alloyId1344);
    $.__views.__alloyId1345 = Ti.UI.createView({
        top: "8dp",
        bottom: "8dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId1345"
    });
    $.__views.__alloyId1337.add($.__views.__alloyId1345);
    $.__views.__alloyId1346 = Ti.UI.createView({
        left: 0,
        height: "5dp",
        width: "5dp",
        borderRadius: "2.5dp",
        backgroundColor: "#e65e48",
        id: "__alloyId1346"
    });
    $.__views.__alloyId1345.add($.__views.__alloyId1346);
    $.__views.__alloyId1347 = Ti.UI.createLabel({
        left: "20dp",
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Product is Not as described on the website.",
        id: "__alloyId1347"
    });
    $.__views.__alloyId1345.add($.__views.__alloyId1347);
    $.__views.__alloyId1348 = Ti.UI.createView({
        top: "8dp",
        bottom: "8dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId1348"
    });
    $.__views.__alloyId1337.add($.__views.__alloyId1348);
    $.__views.__alloyId1349 = Ti.UI.createView({
        left: 0,
        height: "5dp",
        width: "5dp",
        borderRadius: "2.5dp",
        backgroundColor: "#e65e48",
        id: "__alloyId1349"
    });
    $.__views.__alloyId1348.add($.__views.__alloyId1349);
    $.__views.__alloyId1350 = Ti.UI.createLabel({
        left: "20dp",
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Order is Delayed for over 10 days.",
        id: "__alloyId1350"
    });
    $.__views.__alloyId1348.add($.__views.__alloyId1350);
    $.__views.__alloyId1351 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "IMPORTANT POINTS",
        top: "8dp",
        bottom: "8dp",
        id: "__alloyId1351"
    });
    $.__views.__alloyId1337.add($.__views.__alloyId1351);
    $.__views.__alloyId1352 = Ti.UI.createView({
        top: "8dp",
        bottom: "8dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId1352"
    });
    $.__views.__alloyId1337.add($.__views.__alloyId1352);
    $.__views.__alloyId1353 = Ti.UI.createView({
        left: 0,
        height: "5dp",
        width: "5dp",
        borderRadius: "2.5dp",
        backgroundColor: "#e65e48",
        id: "__alloyId1353"
    });
    $.__views.__alloyId1352.add($.__views.__alloyId1353);
    $.__views.__alloyId1354 = Ti.UI.createLabel({
        left: "20dp",
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Orders cannot be cancelled, once they are shipped.",
        id: "__alloyId1354"
    });
    $.__views.__alloyId1352.add($.__views.__alloyId1354);
    $.__views.__alloyId1355 = Ti.UI.createView({
        top: "8dp",
        bottom: "8dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId1355"
    });
    $.__views.__alloyId1337.add($.__views.__alloyId1355);
    $.__views.__alloyId1356 = Ti.UI.createView({
        left: 0,
        height: "5dp",
        width: "5dp",
        borderRadius: "2.5dp",
        backgroundColor: "#e65e48",
        id: "__alloyId1356"
    });
    $.__views.__alloyId1355.add($.__views.__alloyId1356);
    $.__views.__alloyId1357 = Ti.UI.createLabel({
        left: "20dp",
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Return process will be initiated once we receive the goods.",
        id: "__alloyId1357"
    });
    $.__views.__alloyId1355.add($.__views.__alloyId1357);
    $.__views.__alloyId1358 = Ti.UI.createView({
        top: "8dp",
        bottom: "8dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId1358"
    });
    $.__views.__alloyId1337.add($.__views.__alloyId1358);
    $.__views.__alloyId1359 = Ti.UI.createView({
        left: 0,
        height: "5dp",
        width: "5dp",
        borderRadius: "2.5dp",
        backgroundColor: "#e65e48",
        id: "__alloyId1359"
    });
    $.__views.__alloyId1358.add($.__views.__alloyId1359);
    $.__views.__alloyId1360 = Ti.UI.createLabel({
        left: "20dp",
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Return valid only for customers in India.",
        id: "__alloyId1360"
    });
    $.__views.__alloyId1358.add($.__views.__alloyId1360);
    $.__views.__alloyId1361 = Ti.UI.createView({
        top: "8dp",
        bottom: "18dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId1361"
    });
    $.__views.__alloyId1337.add($.__views.__alloyId1361);
    $.__views.__alloyId1362 = Ti.UI.createView({
        left: 0,
        height: "5dp",
        width: "5dp",
        borderRadius: "2.5dp",
        backgroundColor: "#e65e48",
        id: "__alloyId1362"
    });
    $.__views.__alloyId1361.add($.__views.__alloyId1362);
    $.__views.__alloyId1363 = Ti.UI.createLabel({
        left: "20dp",
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Please ensure that the product is unused, not damaged and all the tags and bar codes, invoice slips are intact at the time of return.Further, the damaged/defective Products must be returned in the original condition they were received in with all the accompanying accessories.",
        id: "__alloyId1363"
    });
    $.__views.__alloyId1361.add($.__views.__alloyId1363);
    $.__views.__alloyId1364 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId1364"
    });
    $.__views.questions.add($.__views.__alloyId1364);
    $.__views.__alloyId1365 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId1365"
    });
    $.__views.__alloyId1364.add($.__views.__alloyId1365);
    $.__views.__alloyId1366 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: "HOW DO I RETURN AN ITEM ?",
        type: "questionText",
        id: "__alloyId1366"
    });
    $.__views.__alloyId1365.add($.__views.__alloyId1366);
    $.__views.__alloyId1367 = Ti.UI.createLabel({
        right: 0,
        width: "10%",
        color: "#ffffff",
        font: {
            fontSize: "12dp",
            fontFamily: "icomoon"
        },
        text: Alloy.Globals.icon.downArrow,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        touchEnabled: false,
        type: "questionText",
        id: "__alloyId1367"
    });
    $.__views.__alloyId1365.add($.__views.__alloyId1367);
    $.__views.__alloyId1368 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId1368"
    });
    $.__views.__alloyId1364.add($.__views.__alloyId1368);
    $.__views.__alloyId1369 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "STEP 1",
        bottom: "8dp",
        id: "__alloyId1369"
    });
    $.__views.__alloyId1368.add($.__views.__alloyId1369);
    $.__views.__alloyId1370 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Download our Returns Form and email us the filled up form at enquiry@ddecor.com within 7 days after you have received the product. Alternately, you can click on the ‘Return” option on the website / app, and follow the directions.",
        bottom: "8dp",
        id: "__alloyId1370"
    });
    $.__views.__alloyId1368.add($.__views.__alloyId1370);
    $.__views.__alloyId1371 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "STEP 2",
        bottom: "8dp",
        id: "__alloyId1371"
    });
    $.__views.__alloyId1368.add($.__views.__alloyId1371);
    $.__views.__alloyId1372 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "We will arrange for a pick up from the same address to which the product was shipped.",
        bottom: "8dp",
        id: "__alloyId1372"
    });
    $.__views.__alloyId1368.add($.__views.__alloyId1372);
    $.__views.__alloyId1373 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Please put the Product in its original packaging and seal it well and send it across.",
        bottom: "8dp",
        id: "__alloyId1373"
    });
    $.__views.__alloyId1368.add($.__views.__alloyId1373);
    $.__views.__alloyId1374 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Please ensure that the product is unused, not damaged and all the tags and bar codes, invoice slips are intact at the time of return.",
        bottom: "8dp",
        id: "__alloyId1374"
    });
    $.__views.__alloyId1368.add($.__views.__alloyId1374);
    $.__views.__alloyId1375 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "STEP 3",
        bottom: "8dp",
        id: "__alloyId1375"
    });
    $.__views.__alloyId1368.add($.__views.__alloyId1375);
    $.__views.__alloyId1376 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Once the product reaches our warehouse, we will inspect the product and once our inspection team confirms that the product received is in acceptable condition, as dispatched from our warehouse, we will initiate the return.On the other hand, if the Product is not as per the aforementioned conditions, then the returned Product will not be accepted and would be returned back to the customer.",
        bottom: "18dp",
        id: "__alloyId1376"
    });
    $.__views.__alloyId1368.add($.__views.__alloyId1376);
    $.__views.__alloyId1377 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId1377"
    });
    $.__views.questions.add($.__views.__alloyId1377);
    $.__views.__alloyId1378 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId1378"
    });
    $.__views.__alloyId1377.add($.__views.__alloyId1378);
    $.__views.__alloyId1379 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: "CAN I GET A REFUND ?",
        type: "questionText",
        id: "__alloyId1379"
    });
    $.__views.__alloyId1378.add($.__views.__alloyId1379);
    $.__views.__alloyId1380 = Ti.UI.createLabel({
        right: 0,
        width: "10%",
        color: "#ffffff",
        font: {
            fontSize: "12dp",
            fontFamily: "icomoon"
        },
        text: Alloy.Globals.icon.downArrow,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        touchEnabled: false,
        type: "questionText",
        id: "__alloyId1380"
    });
    $.__views.__alloyId1378.add($.__views.__alloyId1380);
    $.__views.__alloyId1381 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId1381"
    });
    $.__views.__alloyId1377.add($.__views.__alloyId1381);
    $.__views.__alloyId1382 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "We will either replace your product or give you a gift voucher for the same amount.",
        bottom: "8dp",
        id: "__alloyId1382"
    });
    $.__views.__alloyId1381.add($.__views.__alloyId1382);
    $.__views.__alloyId1383 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "IN CASE YOU DO NOT WANT TO OPT FOR THE GIFT VOUCHER FOR THE AMOUNT OF REFUND OR THE EXCHANGE PRODUCT, SUCH AMOUNT SHALL THEN BE REFUNDED AS YOU PAID FOR THE PRODUCT. IF THE PAYMENT WAS MADE BY CREDIT CARD, DEBIT CARD OR NET BANKING, WE WILL REFUND THE MONEY TO YOUR CREDIT CARD, DEBIT CARD OR NET BANKING ACCOUNT RESPECTIVELY*. TBD",
        bottom: "18dp",
        id: "__alloyId1383"
    });
    $.__views.__alloyId1381.add($.__views.__alloyId1383);
    $.__views.__alloyId1384 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId1384"
    });
    $.__views.questions.add($.__views.__alloyId1384);
    $.__views.__alloyId1385 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId1385"
    });
    $.__views.__alloyId1384.add($.__views.__alloyId1385);
    $.__views.__alloyId1386 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: "CAN I RETURN A PART OF THE ORDER ?",
        type: "questionText",
        id: "__alloyId1386"
    });
    $.__views.__alloyId1385.add($.__views.__alloyId1386);
    $.__views.__alloyId1387 = Ti.UI.createLabel({
        right: 0,
        width: "10%",
        color: "#ffffff",
        font: {
            fontSize: "12dp",
            fontFamily: "icomoon"
        },
        text: Alloy.Globals.icon.downArrow,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        touchEnabled: false,
        type: "questionText",
        id: "__alloyId1387"
    });
    $.__views.__alloyId1385.add($.__views.__alloyId1387);
    $.__views.__alloyId1388 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId1388"
    });
    $.__views.__alloyId1384.add($.__views.__alloyId1388);
    $.__views.__alloyId1389 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Yes, a return can be created at item level and if you have ordered multiple items, you can initiate a return for a partial quantity.",
        bottom: "18dp",
        id: "__alloyId1389"
    });
    $.__views.__alloyId1388.add($.__views.__alloyId1389);
    $.__views.__alloyId1390 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId1390"
    });
    $.__views.questions.add($.__views.__alloyId1390);
    $.__views.__alloyId1391 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId1391"
    });
    $.__views.__alloyId1390.add($.__views.__alloyId1391);
    $.__views.__alloyId1392 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: 'WHAT IS "NOT AS DESCRIBED CONDITION FOR RETURN ?',
        type: "questionText",
        id: "__alloyId1392"
    });
    $.__views.__alloyId1391.add($.__views.__alloyId1392);
    $.__views.__alloyId1393 = Ti.UI.createLabel({
        right: 0,
        width: "10%",
        color: "#ffffff",
        font: {
            fontSize: "12dp",
            fontFamily: "icomoon"
        },
        text: Alloy.Globals.icon.downArrow,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        touchEnabled: false,
        type: "questionText",
        id: "__alloyId1393"
    });
    $.__views.__alloyId1391.add($.__views.__alloyId1393);
    $.__views.__alloyId1394 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId1394"
    });
    $.__views.__alloyId1390.add($.__views.__alloyId1394);
    $.__views.__alloyId1395 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "In case there is a mismatch between what is stated on the website and the order you received, you can return the order under ' Not as described'. This can include sizes, colors, designs and product description.",
        bottom: "18dp",
        id: "__alloyId1395"
    });
    $.__views.__alloyId1394.add($.__views.__alloyId1395);
    $.__views.__alloyId1396 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId1396"
    });
    $.__views.questions.add($.__views.__alloyId1396);
    $.__views.__alloyId1397 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId1397"
    });
    $.__views.__alloyId1396.add($.__views.__alloyId1397);
    $.__views.__alloyId1398 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: "WHAT ARE THE EXCEPTIONS TO THE RETURNS POLICY ?",
        type: "questionText",
        id: "__alloyId1398"
    });
    $.__views.__alloyId1397.add($.__views.__alloyId1398);
    $.__views.__alloyId1399 = Ti.UI.createLabel({
        right: 0,
        width: "10%",
        color: "#ffffff",
        font: {
            fontSize: "12dp",
            fontFamily: "icomoon"
        },
        text: Alloy.Globals.icon.downArrow,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        touchEnabled: false,
        type: "questionText",
        id: "__alloyId1399"
    });
    $.__views.__alloyId1397.add($.__views.__alloyId1399);
    $.__views.__alloyId1400 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId1400"
    });
    $.__views.__alloyId1396.add($.__views.__alloyId1400);
    $.__views.__alloyId1401 = Ti.UI.createView({
        top: "8dp",
        bottom: "8dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId1401"
    });
    $.__views.__alloyId1400.add($.__views.__alloyId1401);
    $.__views.__alloyId1402 = Ti.UI.createView({
        left: 0,
        height: "5dp",
        width: "5dp",
        borderRadius: "2.5dp",
        backgroundColor: "#e65e48",
        id: "__alloyId1402"
    });
    $.__views.__alloyId1401.add($.__views.__alloyId1402);
    $.__views.__alloyId1403 = Ti.UI.createLabel({
        left: "20dp",
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Products bought at D’decor store. Please refer to respective stores for their return policy.",
        id: "__alloyId1403"
    });
    $.__views.__alloyId1401.add($.__views.__alloyId1403);
    $.__views.__alloyId1404 = Ti.UI.createView({
        top: "8dp",
        bottom: "8dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId1404"
    });
    $.__views.__alloyId1400.add($.__views.__alloyId1404);
    $.__views.__alloyId1405 = Ti.UI.createView({
        left: 0,
        height: "5dp",
        width: "5dp",
        borderRadius: "2.5dp",
        backgroundColor: "#e65e48",
        id: "__alloyId1405"
    });
    $.__views.__alloyId1404.add($.__views.__alloyId1405);
    $.__views.__alloyId1406 = Ti.UI.createLabel({
        left: "20dp",
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Return request is made outside the specified time frame.",
        id: "__alloyId1406"
    });
    $.__views.__alloyId1404.add($.__views.__alloyId1406);
    $.__views.__alloyId1407 = Ti.UI.createView({
        top: "8dp",
        bottom: "8dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId1407"
    });
    $.__views.__alloyId1400.add($.__views.__alloyId1407);
    $.__views.__alloyId1408 = Ti.UI.createView({
        left: 0,
        height: "5dp",
        width: "5dp",
        borderRadius: "2.5dp",
        backgroundColor: "#e65e48",
        id: "__alloyId1408"
    });
    $.__views.__alloyId1407.add($.__views.__alloyId1408);
    $.__views.__alloyId1409 = Ti.UI.createLabel({
        left: "20dp",
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Anything missing from the package you've received including price tags, labels, original packing, freebies and accessories.",
        id: "__alloyId1409"
    });
    $.__views.__alloyId1407.add($.__views.__alloyId1409);
    $.__views.__alloyId1410 = Ti.UI.createView({
        top: "8dp",
        bottom: "8dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId1410"
    });
    $.__views.__alloyId1400.add($.__views.__alloyId1410);
    $.__views.__alloyId1411 = Ti.UI.createView({
        left: 0,
        height: "5dp",
        width: "5dp",
        borderRadius: "2.5dp",
        backgroundColor: "#e65e48",
        id: "__alloyId1411"
    });
    $.__views.__alloyId1410.add($.__views.__alloyId1411);
    $.__views.__alloyId1412 = Ti.UI.createLabel({
        left: "20dp",
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Defective/damaged products due to customer handling.",
        id: "__alloyId1412"
    });
    $.__views.__alloyId1410.add($.__views.__alloyId1412);
    $.__views.__alloyId1413 = Ti.UI.createView({
        top: "8dp",
        bottom: "8dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId1413"
    });
    $.__views.__alloyId1400.add($.__views.__alloyId1413);
    $.__views.__alloyId1414 = Ti.UI.createView({
        left: 0,
        height: "5dp",
        width: "5dp",
        borderRadius: "2.5dp",
        backgroundColor: "#e65e48",
        id: "__alloyId1414"
    });
    $.__views.__alloyId1413.add($.__views.__alloyId1414);
    $.__views.__alloyId1415 = Ti.UI.createLabel({
        left: "20dp",
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Used products.",
        id: "__alloyId1415"
    });
    $.__views.__alloyId1413.add($.__views.__alloyId1415);
    $.__views.__alloyId1416 = Ti.UI.createView({
        top: "8dp",
        bottom: "8dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId1416"
    });
    $.__views.__alloyId1400.add($.__views.__alloyId1416);
    $.__views.__alloyId1417 = Ti.UI.createView({
        left: 0,
        height: "5dp",
        width: "5dp",
        borderRadius: "2.5dp",
        backgroundColor: "#e65e48",
        id: "__alloyId1417"
    });
    $.__views.__alloyId1416.add($.__views.__alloyId1417);
    $.__views.__alloyId1418 = Ti.UI.createLabel({
        left: "20dp",
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Products with tampered or missing serial numbers.",
        id: "__alloyId1418"
    });
    $.__views.__alloyId1416.add($.__views.__alloyId1418);
    $.__views.__alloyId1419 = Ti.UI.createView({
        top: "8dp",
        bottom: "18dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId1419"
    });
    $.__views.__alloyId1400.add($.__views.__alloyId1419);
    $.__views.__alloyId1420 = Ti.UI.createView({
        left: 0,
        height: "5dp",
        width: "5dp",
        borderRadius: "2.5dp",
        backgroundColor: "#e65e48",
        id: "__alloyId1420"
    });
    $.__views.__alloyId1419.add($.__views.__alloyId1420);
    $.__views.__alloyId1421 = Ti.UI.createLabel({
        left: "20dp",
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Made-to-order products/ Custom-stitched.",
        id: "__alloyId1421"
    });
    $.__views.__alloyId1419.add($.__views.__alloyId1421);
    $.__views.__alloyId1422 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId1422"
    });
    $.__views.questions.add($.__views.__alloyId1422);
    $.__views.__alloyId1423 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId1423"
    });
    $.__views.__alloyId1422.add($.__views.__alloyId1423);
    $.__views.__alloyId1424 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: "WHO DO I CONTACT FOR QUERIES REGARDING REFUNDS AND RETURNS ?",
        type: "questionText",
        id: "__alloyId1424"
    });
    $.__views.__alloyId1423.add($.__views.__alloyId1424);
    $.__views.__alloyId1425 = Ti.UI.createLabel({
        right: 0,
        width: "10%",
        color: "#ffffff",
        font: {
            fontSize: "12dp",
            fontFamily: "icomoon"
        },
        text: Alloy.Globals.icon.downArrow,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        touchEnabled: false,
        type: "questionText",
        id: "__alloyId1425"
    });
    $.__views.__alloyId1423.add($.__views.__alloyId1425);
    $.__views.__alloyId1426 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId1426"
    });
    $.__views.__alloyId1422.add($.__views.__alloyId1426);
    $.__views.__alloyId1427 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "You can write to the",
        bottom: "8dp",
        id: "__alloyId1427"
    });
    $.__views.__alloyId1426.add($.__views.__alloyId1427);
    $.__views.__alloyId1428 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "GRIEVANCE OFFICER",
        bottom: "8dp",
        id: "__alloyId1428"
    });
    $.__views.__alloyId1426.add($.__views.__alloyId1428);
    $.__views.__alloyId1429 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "NAME: Jasmeet Setia",
        bottom: "8dp",
        id: "__alloyId1429"
    });
    $.__views.__alloyId1426.add($.__views.__alloyId1429);
    $.__views.__alloyId1430 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "1081/1082, Solitaire Corporate Park - 10 \n167, Guru Hargovindji Marg \nAndheri East, Mumbai 400093 \nINDIA",
        bottom: "8dp",
        id: "__alloyId1430"
    });
    $.__views.__alloyId1426.add($.__views.__alloyId1430);
    $.__views.__alloyId1431 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "EMAIL \nenquiry@ddecor.com",
        bottom: "18dp",
        id: "__alloyId1431"
    });
    $.__views.__alloyId1426.add($.__views.__alloyId1431);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    googleAnalyticsScreen("RETURNS / REFUND POLICY");
    touchEffect.createTouchEffect($.refundCloseLbl, "#a6ffffff", "#ffffff");
    $.questions.addEventListener("click", function(e) {
        switch (e.source.type) {
          case "question":
            _.each($.questions.getChildren(), function(value, key) {
                if (0 != value.children[1].height) {
                    value.children[1].height = 0;
                    value.children[0].children[1].text = Alloy.Globals.icon.downArrow;
                }
                value.children[0].type = "question";
            });
            e.source.parent.children[1].height = Titanium.UI.SIZE;
            e.source.children[1].text = Alloy.Globals.icon.upArrow;
            e.source.type = "expand";
            break;

          case "expand":
            _.each($.questions.getChildren(), function(value, key) {
                if (0 != value.children[1].height) {
                    value.children[1].height = 0;
                    value.children[0].children[1].text = Alloy.Globals.icon.downArrow;
                }
                value.children[0].type = "question";
            });
            e.source.type = "question";
        }
    });
    $.refundCloseLbl.addEventListener("click", goToBack);
    __defers["$.__views.returnRefund!android:back!goToBack"] && $.addListener($.__views.returnRefund, "android:back", goToBack);
    __defers["$.__views.returnRefund!close!destroyWindow"] && $.addListener($.__views.returnRefund, "close", destroyWindow);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;