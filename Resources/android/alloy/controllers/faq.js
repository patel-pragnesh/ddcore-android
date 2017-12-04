function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function setCategories() {
        _.each(catArray, function(value, key) {
            var categoryLbl = $.UI.create("Label", {
                classes: [ "fontMedium", "dropDownLbl" ],
                width: Titanium.UI.FILL,
                text: value,
                touchEnabled: true
            });
            $.faqDropDownScroll.add(categoryLbl);
        });
    }
    function manageAccordion(e, view) {
        switch (e.source.type) {
          case "question":
            _.each(view.getChildren(), function(value, key) {
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
            _.each(view.getChildren(), function(value, key) {
                if (0 != value.children[1].height) {
                    value.children[1].height = 0;
                    value.children[0].children[1].text = Alloy.Globals.icon.downArrow;
                }
                value.children[0].type = "question";
            });
            e.source.type = "question";
        }
    }
    function goToBack() {
        Alloy.Globals.popWindowInNav();
        $.faq.close();
    }
    function destroyWindow(e) {
        Ti.API.info("************** into clear Memory ***************");
        $.removeListener();
        $.faq.remove($.superView);
        $.superView.removeAllChildren();
        $.destroy();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "faq";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.faq = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        id: "faq"
    });
    $.__views.faq && $.addTopLevelView($.__views.faq);
    goToBack ? $.addListener($.__views.faq, "android:back", goToBack) : __defers["$.__views.faq!android:back!goToBack"] = true;
    destroyWindow ? $.addListener($.__views.faq, "close", destroyWindow) : __defers["$.__views.faq!close!destroyWindow"] = true;
    $.__views.superView = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        backgroundColor: "#231f20",
        id: "superView"
    });
    $.__views.faq.add($.__views.superView);
    $.__views.__alloyId474 = Ti.UI.createView({
        top: "0dp",
        zIndex: "100",
        width: Titanium.UI.FILL,
        height: "40dp",
        id: "__alloyId474"
    });
    $.__views.superView.add($.__views.__alloyId474);
    $.__views.__alloyId475 = Ti.UI.createLabel({
        left: "20dp",
        height: Titanium.UI.FILL,
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        text: "FAQ",
        id: "__alloyId475"
    });
    $.__views.__alloyId474.add($.__views.__alloyId475);
    $.__views.faqCloseLbl = Ti.UI.createLabel({
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
        id: "faqCloseLbl"
    });
    $.__views.__alloyId474.add($.__views.faqCloseLbl);
    $.__views.faqDropDown = Ti.UI.createView({
        layout: "vertical",
        top: "40dp",
        right: "15dp",
        width: "29%",
        zIndex: "100",
        height: "40dp",
        id: "faqDropDown"
    });
    $.__views.superView.add($.__views.faqDropDown);
    $.__views.__alloyId476 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "0dp",
        layout: "horizontal",
        touchEnabled: false,
        id: "__alloyId476"
    });
    $.__views.faqDropDown.add($.__views.__alloyId476);
    $.__views.faqLbl = Ti.UI.createLabel({
        left: "3%",
        top: "0dp",
        width: "75%",
        height: "40dp",
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        color: "#ffffff",
        touchEnabled: false,
        text: "GENERAL",
        id: "faqLbl"
    });
    $.__views.__alloyId476.add($.__views.faqLbl);
    $.__views.__alloyId477 = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "5dp"
        },
        rigth: "0dp",
        width: "18%",
        height: "40dp",
        text: Alloy.Globals.icon.dropdownArrow,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        color: "#e65e48",
        touchEnabled: false,
        id: "__alloyId477"
    });
    $.__views.__alloyId476.add($.__views.__alloyId477);
    $.__views.faqDropDownScroll = Ti.UI.createScrollView({
        layout: "vertical",
        backgroundColor: "#595959",
        height: 0,
        id: "faqDropDownScroll",
        zIndex: 2
    });
    $.__views.faqDropDown.add($.__views.faqDropDownScroll);
    $.__views.__alloyId478 = Ti.UI.createScrollView({
        top: "80dp",
        id: "__alloyId478"
    });
    $.__views.superView.add($.__views.__alloyId478);
    $.__views.generalQuestions = Ti.UI.createView({
        top: "20dp",
        left: "20dp",
        right: "20dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "generalQuestions"
    });
    $.__views.__alloyId478.add($.__views.generalQuestions);
    $.__views.__alloyId479 = Ti.UI.createView({
        top: "10dp",
        bottom: "10dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId479"
    });
    $.__views.generalQuestions.add($.__views.__alloyId479);
    $.__views.__alloyId480 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId480"
    });
    $.__views.__alloyId479.add($.__views.__alloyId480);
    $.__views.__alloyId481 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: "HOW DO I CONTACT CUSTOMER SERVICE?",
        type: "questionText",
        id: "__alloyId481"
    });
    $.__views.__alloyId480.add($.__views.__alloyId481);
    $.__views.__alloyId482 = Ti.UI.createLabel({
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
        id: "__alloyId482"
    });
    $.__views.__alloyId480.add($.__views.__alloyId482);
    $.__views.__alloyId483 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId483"
    });
    $.__views.__alloyId479.add($.__views.__alloyId483);
    $.__views.answerContact = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "answerContact",
        bottom: "8dp"
    });
    $.__views.__alloyId483.add($.__views.answerContact);
    $.__views.__alloyId484 = Ti.UI.createView({
        top: "10dp",
        bottom: "10dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId484"
    });
    $.__views.generalQuestions.add($.__views.__alloyId484);
    $.__views.__alloyId485 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId485"
    });
    $.__views.__alloyId484.add($.__views.__alloyId485);
    $.__views.__alloyId486 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: "HOW DO I REMOVE MY NAME FROM YOUR MAILING LIST?",
        type: "questionText",
        id: "__alloyId486"
    });
    $.__views.__alloyId485.add($.__views.__alloyId486);
    $.__views.__alloyId487 = Ti.UI.createLabel({
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
        id: "__alloyId487"
    });
    $.__views.__alloyId485.add($.__views.__alloyId487);
    $.__views.__alloyId488 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId488"
    });
    $.__views.__alloyId484.add($.__views.__alloyId488);
    $.__views.__alloyId489 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Please select the 'Unsubscribe' option that comes with every email or newsletter that is sent from D'decor.",
        bottom: "8dp",
        id: "__alloyId489"
    });
    $.__views.__alloyId488.add($.__views.__alloyId489);
    $.__views.__alloyId490 = Ti.UI.createView({
        top: "10dp",
        bottom: "10dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId490"
    });
    $.__views.generalQuestions.add($.__views.__alloyId490);
    $.__views.__alloyId491 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId491"
    });
    $.__views.__alloyId490.add($.__views.__alloyId491);
    $.__views.__alloyId492 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: "WILL YOU SHARE MY INFORMATION WITH OTHERS?",
        type: "questionText",
        id: "__alloyId492"
    });
    $.__views.__alloyId491.add($.__views.__alloyId492);
    $.__views.__alloyId493 = Ti.UI.createLabel({
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
        id: "__alloyId493"
    });
    $.__views.__alloyId491.add($.__views.__alloyId493);
    $.__views.__alloyId494 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId494"
    });
    $.__views.__alloyId490.add($.__views.__alloyId494);
    $.__views.__alloyId495 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "We do not share your information with anyone. Please read our Privacy Policy for more details.",
        bottom: "8dp",
        id: "__alloyId495"
    });
    $.__views.__alloyId494.add($.__views.__alloyId495);
    $.__views.orderQuestions = Ti.UI.createView({
        top: "20dp",
        left: "20dp",
        right: "20dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "orderQuestions"
    });
    $.__views.__alloyId478.add($.__views.orderQuestions);
    $.__views.__alloyId496 = Ti.UI.createView({
        top: "10dp",
        bottom: "10dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId496"
    });
    $.__views.orderQuestions.add($.__views.__alloyId496);
    $.__views.__alloyId497 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId497"
    });
    $.__views.__alloyId496.add($.__views.__alloyId497);
    $.__views.__alloyId498 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: "HOW WILL I KNOW THAT MY ORDER IS CONFIRMED?",
        type: "questionText",
        id: "__alloyId498"
    });
    $.__views.__alloyId497.add($.__views.__alloyId498);
    $.__views.__alloyId499 = Ti.UI.createLabel({
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
        id: "__alloyId499"
    });
    $.__views.__alloyId497.add($.__views.__alloyId499);
    $.__views.__alloyId500 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId500"
    });
    $.__views.__alloyId496.add($.__views.__alloyId500);
    $.__views.__alloyId501 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "After you make your selection and complete the payment process successfully, an automatic order confirmation email will be sent to you with an order confirmation number from D’decor.",
        bottom: "8dp",
        id: "__alloyId501"
    });
    $.__views.__alloyId500.add($.__views.__alloyId501);
    $.__views.__alloyId502 = Ti.UI.createView({
        top: "10dp",
        bottom: "10dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId502"
    });
    $.__views.orderQuestions.add($.__views.__alloyId502);
    $.__views.__alloyId503 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId503"
    });
    $.__views.__alloyId502.add($.__views.__alloyId503);
    $.__views.__alloyId504 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: "HOW DO I CHECK MY ORDER STATUS?",
        type: "questionText",
        id: "__alloyId504"
    });
    $.__views.__alloyId503.add($.__views.__alloyId504);
    $.__views.__alloyId505 = Ti.UI.createLabel({
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
        id: "__alloyId505"
    });
    $.__views.__alloyId503.add($.__views.__alloyId505);
    $.__views.__alloyId506 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId506"
    });
    $.__views.__alloyId502.add($.__views.__alloyId506);
    $.__views.answerTextSupp = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "answerTextSupp",
        bottom: "8dp"
    });
    $.__views.__alloyId506.add($.__views.answerTextSupp);
    $.__views.__alloyId507 = Ti.UI.createView({
        top: "10dp",
        bottom: "10dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId507"
    });
    $.__views.orderQuestions.add($.__views.__alloyId507);
    $.__views.__alloyId508 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId508"
    });
    $.__views.__alloyId507.add($.__views.__alloyId508);
    $.__views.__alloyId509 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: "WHAT IF THE ITEM I HAVE ORDERED IS OUT OF STOCK?",
        type: "questionText",
        id: "__alloyId509"
    });
    $.__views.__alloyId508.add($.__views.__alloyId509);
    $.__views.__alloyId510 = Ti.UI.createLabel({
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
        id: "__alloyId510"
    });
    $.__views.__alloyId508.add($.__views.__alloyId510);
    $.__views.__alloyId511 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId511"
    });
    $.__views.__alloyId507.add($.__views.__alloyId511);
    $.__views.__alloyId512 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "In the rare case that your selection is out of stock, you will be intimated about the next available date. If the date is not suitable, you have the option of changing the selection or canceling your order.",
        bottom: "8dp",
        id: "__alloyId512"
    });
    $.__views.__alloyId511.add($.__views.__alloyId512);
    $.__views.__alloyId513 = Ti.UI.createView({
        top: "10dp",
        bottom: "10dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId513"
    });
    $.__views.orderQuestions.add($.__views.__alloyId513);
    $.__views.__alloyId514 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId514"
    });
    $.__views.__alloyId513.add($.__views.__alloyId514);
    $.__views.__alloyId515 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: "HOW LONG WILL IT TAKE TO RECEIVE MY ORDER?",
        type: "questionText",
        id: "__alloyId515"
    });
    $.__views.__alloyId514.add($.__views.__alloyId515);
    $.__views.__alloyId516 = Ti.UI.createLabel({
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
        id: "__alloyId516"
    });
    $.__views.__alloyId514.add($.__views.__alloyId516);
    $.__views.__alloyId517 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId517"
    });
    $.__views.__alloyId513.add($.__views.__alloyId517);
    $.__views.__alloyId518 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Subject to goods being in stock and geographic condition of the city, shipping across India typically takes 4-5 working days.",
        bottom: "8dp",
        id: "__alloyId518"
    });
    $.__views.__alloyId517.add($.__views.__alloyId518);
    $.__views.__alloyId519 = Ti.UI.createView({
        top: "10dp",
        bottom: "10dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId519"
    });
    $.__views.orderQuestions.add($.__views.__alloyId519);
    $.__views.__alloyId520 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId520"
    });
    $.__views.__alloyId519.add($.__views.__alloyId520);
    $.__views.__alloyId521 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: "HOW CAN I MODIFY MY ORDER?",
        type: "questionText",
        id: "__alloyId521"
    });
    $.__views.__alloyId520.add($.__views.__alloyId521);
    $.__views.__alloyId522 = Ti.UI.createLabel({
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
        id: "__alloyId522"
    });
    $.__views.__alloyId520.add($.__views.__alloyId522);
    $.__views.__alloyId523 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId523"
    });
    $.__views.__alloyId519.add($.__views.__alloyId523);
    $.__views.__alloyId524 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "You can modify your order during the shopping process by editing your shopping cart. Once you confirm payment, the only way to change your order would be to cancel before the order is shipped and place a new order.",
        bottom: "8dp",
        id: "__alloyId524"
    });
    $.__views.__alloyId523.add($.__views.__alloyId524);
    $.__views.__alloyId525 = Ti.UI.createView({
        top: "10dp",
        bottom: "10dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId525"
    });
    $.__views.orderQuestions.add($.__views.__alloyId525);
    $.__views.__alloyId526 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId526"
    });
    $.__views.__alloyId525.add($.__views.__alloyId526);
    $.__views.__alloyId527 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: "CAN I CANCEL MY ORDER?",
        type: "questionText",
        id: "__alloyId527"
    });
    $.__views.__alloyId526.add($.__views.__alloyId527);
    $.__views.__alloyId528 = Ti.UI.createLabel({
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
        id: "__alloyId528"
    });
    $.__views.__alloyId526.add($.__views.__alloyId528);
    $.__views.__alloyId529 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId529"
    });
    $.__views.__alloyId525.add($.__views.__alloyId529);
    $.__views.__alloyId530 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Subject to goods being in stock and geographic condition of the city, shipping across India typically takes 4-5 working daysAll orders can be cancelled before the order is processed from our warehouse. Once the order is processed, a cancellation cannot be accepted. Any order requiring special production cannot be cancelled.",
        bottom: "8dp",
        id: "__alloyId530"
    });
    $.__views.__alloyId529.add($.__views.__alloyId530);
    $.__views.__alloyId531 = Ti.UI.createView({
        top: "10dp",
        bottom: "10dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId531"
    });
    $.__views.orderQuestions.add($.__views.__alloyId531);
    $.__views.__alloyId532 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId532"
    });
    $.__views.__alloyId531.add($.__views.__alloyId532);
    $.__views.__alloyId533 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: "WHOM SHOULD I CONTACT IF I HAVE PROBLEMS WITH MY ORDER?",
        type: "questionText",
        id: "__alloyId533"
    });
    $.__views.__alloyId532.add($.__views.__alloyId533);
    $.__views.__alloyId534 = Ti.UI.createLabel({
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
        id: "__alloyId534"
    });
    $.__views.__alloyId532.add($.__views.__alloyId534);
    $.__views.__alloyId535 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId535"
    });
    $.__views.__alloyId531.add($.__views.__alloyId535);
    $.__views.answerTextSupp1 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "answerTextSupp1",
        bottom: "8dp"
    });
    $.__views.__alloyId535.add($.__views.answerTextSupp1);
    $.__views.paymentQuestions = Ti.UI.createView({
        top: "20dp",
        left: "20dp",
        right: "20dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "paymentQuestions"
    });
    $.__views.__alloyId478.add($.__views.paymentQuestions);
    $.__views.__alloyId536 = Ti.UI.createView({
        top: "10dp",
        bottom: "10dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId536"
    });
    $.__views.paymentQuestions.add($.__views.__alloyId536);
    $.__views.__alloyId537 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId537"
    });
    $.__views.__alloyId536.add($.__views.__alloyId537);
    $.__views.__alloyId538 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: "WHAT PAYMENT METHODS DO YOU ACCEPT?",
        type: "questionText",
        id: "__alloyId538"
    });
    $.__views.__alloyId537.add($.__views.__alloyId538);
    $.__views.__alloyId539 = Ti.UI.createLabel({
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
        id: "__alloyId539"
    });
    $.__views.__alloyId537.add($.__views.__alloyId539);
    $.__views.__alloyId540 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId540"
    });
    $.__views.__alloyId536.add($.__views.__alloyId540);
    $.__views.__alloyId541 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "CREDIT CARDS:",
        bottom: "8dp",
        id: "__alloyId541"
    });
    $.__views.__alloyId540.add($.__views.__alloyId541);
    $.__views.__alloyId542 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "MasterCard \nVISA \nAmerican Express",
        bottom: "8dp",
        id: "__alloyId542"
    });
    $.__views.__alloyId540.add($.__views.__alloyId542);
    $.__views.__alloyId543 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "DEBIT CARDS:",
        bottom: "8dp",
        id: "__alloyId543"
    });
    $.__views.__alloyId540.add($.__views.__alloyId543);
    $.__views.__alloyId544 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Maestro \nElectron",
        bottom: "8dp",
        id: "__alloyId544"
    });
    $.__views.__alloyId540.add($.__views.__alloyId544);
    $.__views.__alloyId545 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "NET BANKING:",
        bottom: "8dp",
        id: "__alloyId545"
    });
    $.__views.__alloyId540.add($.__views.__alloyId545);
    $.__views.__alloyId546 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "For all major Indian banks",
        bottom: "8dp",
        id: "__alloyId546"
    });
    $.__views.__alloyId540.add($.__views.__alloyId546);
    $.__views.__alloyId547 = Ti.UI.createView({
        top: "10dp",
        bottom: "10dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId547"
    });
    $.__views.paymentQuestions.add($.__views.__alloyId547);
    $.__views.__alloyId548 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId548"
    });
    $.__views.__alloyId547.add($.__views.__alloyId548);
    $.__views.__alloyId549 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: "WHEN WILL MY CREDIT CARD BE CHARGED?",
        type: "questionText",
        id: "__alloyId549"
    });
    $.__views.__alloyId548.add($.__views.__alloyId549);
    $.__views.__alloyId550 = Ti.UI.createLabel({
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
        id: "__alloyId550"
    });
    $.__views.__alloyId548.add($.__views.__alloyId550);
    $.__views.__alloyId551 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId551"
    });
    $.__views.__alloyId547.add($.__views.__alloyId551);
    $.__views.__alloyId552 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Your credit card will be charged at the time of placing your order through our secured payment gateway, CC Avenue. An online real–time authorization is done through the payment gateway.",
        bottom: "8dp",
        id: "__alloyId552"
    });
    $.__views.__alloyId551.add($.__views.__alloyId552);
    $.__views.__alloyId553 = Ti.UI.createView({
        top: "10dp",
        bottom: "10dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId553"
    });
    $.__views.paymentQuestions.add($.__views.__alloyId553);
    $.__views.__alloyId554 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId554"
    });
    $.__views.__alloyId553.add($.__views.__alloyId554);
    $.__views.__alloyId555 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: "IS THERE A CASH-ON-DELIVERY OPTION?",
        type: "questionText",
        id: "__alloyId555"
    });
    $.__views.__alloyId554.add($.__views.__alloyId555);
    $.__views.__alloyId556 = Ti.UI.createLabel({
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
        id: "__alloyId556"
    });
    $.__views.__alloyId554.add($.__views.__alloyId556);
    $.__views.__alloyId557 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId557"
    });
    $.__views.__alloyId553.add($.__views.__alloyId557);
    $.__views.__alloyId558 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Currently, we do not provide an option for COD. We will be introducing it soon.",
        bottom: "8dp",
        id: "__alloyId558"
    });
    $.__views.__alloyId557.add($.__views.__alloyId558);
    $.__views.__alloyId559 = Ti.UI.createView({
        top: "10dp",
        bottom: "10dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId559"
    });
    $.__views.paymentQuestions.add($.__views.__alloyId559);
    $.__views.__alloyId560 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId560"
    });
    $.__views.__alloyId559.add($.__views.__alloyId560);
    $.__views.__alloyId561 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: "WHAT CURRENCY WILL MY ORDER BE BILLED IN?",
        type: "questionText",
        id: "__alloyId561"
    });
    $.__views.__alloyId560.add($.__views.__alloyId561);
    $.__views.__alloyId562 = Ti.UI.createLabel({
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
        id: "__alloyId562"
    });
    $.__views.__alloyId560.add($.__views.__alloyId562);
    $.__views.__alloyId563 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId563"
    });
    $.__views.__alloyId559.add($.__views.__alloyId563);
    $.__views.__alloyId564 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "All domestic orders are billed in Indian Rupees (INR).",
        bottom: "8dp",
        id: "__alloyId564"
    });
    $.__views.__alloyId563.add($.__views.__alloyId564);
    $.__views.__alloyId565 = Ti.UI.createView({
        top: "10dp",
        bottom: "10dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId565"
    });
    $.__views.paymentQuestions.add($.__views.__alloyId565);
    $.__views.__alloyId566 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId566"
    });
    $.__views.__alloyId565.add($.__views.__alloyId566);
    $.__views.__alloyId567 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: "WILL I BE CHARGED FOR OCTROI OR ENTRY TAXES IN CASE OF DOMESTIC SHIPPING IN INDIA?",
        type: "questionText",
        id: "__alloyId567"
    });
    $.__views.__alloyId566.add($.__views.__alloyId567);
    $.__views.__alloyId568 = Ti.UI.createLabel({
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
        id: "__alloyId568"
    });
    $.__views.__alloyId566.add($.__views.__alloyId568);
    $.__views.__alloyId569 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId569"
    });
    $.__views.__alloyId565.add($.__views.__alloyId569);
    $.__views.__alloyId570 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Our prices are inclusive of all applicable taxes. You will not be charged more than the price mentioned on the website.",
        bottom: "8dp",
        id: "__alloyId570"
    });
    $.__views.__alloyId569.add($.__views.__alloyId570);
    $.__views.shippingQuestions = Ti.UI.createView({
        top: "20dp",
        left: "20dp",
        right: "20dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "shippingQuestions"
    });
    $.__views.__alloyId478.add($.__views.shippingQuestions);
    $.__views.__alloyId571 = Ti.UI.createView({
        top: "10dp",
        bottom: "10dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId571"
    });
    $.__views.shippingQuestions.add($.__views.__alloyId571);
    $.__views.__alloyId572 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId572"
    });
    $.__views.__alloyId571.add($.__views.__alloyId572);
    $.__views.__alloyId573 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: "WHICH COUNTRIES DO YOU SHIP TO?",
        type: "questionText",
        id: "__alloyId573"
    });
    $.__views.__alloyId572.add($.__views.__alloyId573);
    $.__views.__alloyId574 = Ti.UI.createLabel({
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
        id: "__alloyId574"
    });
    $.__views.__alloyId572.add($.__views.__alloyId574);
    $.__views.__alloyId575 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId575"
    });
    $.__views.__alloyId571.add($.__views.__alloyId575);
    $.__views.answerTextSupp2 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "answerTextSupp2",
        bottom: "8dp"
    });
    $.__views.__alloyId575.add($.__views.answerTextSupp2);
    $.__views.__alloyId576 = Ti.UI.createView({
        top: "10dp",
        bottom: "10dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId576"
    });
    $.__views.shippingQuestions.add($.__views.__alloyId576);
    $.__views.__alloyId577 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId577"
    });
    $.__views.__alloyId576.add($.__views.__alloyId577);
    $.__views.__alloyId578 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: "HOW IS MY ORDER SHIPPED?",
        type: "questionText",
        id: "__alloyId578"
    });
    $.__views.__alloyId577.add($.__views.__alloyId578);
    $.__views.__alloyId579 = Ti.UI.createLabel({
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
        id: "__alloyId579"
    });
    $.__views.__alloyId577.add($.__views.__alloyId579);
    $.__views.__alloyId580 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId580"
    });
    $.__views.__alloyId576.add($.__views.__alloyId580);
    $.__views.__alloyId581 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "We have partnered with Blue Dart to provide the best and quickest shipping option.",
        bottom: "8dp",
        id: "__alloyId581"
    });
    $.__views.__alloyId580.add($.__views.__alloyId581);
    $.__views.__alloyId582 = Ti.UI.createView({
        top: "10dp",
        bottom: "10dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId582"
    });
    $.__views.shippingQuestions.add($.__views.__alloyId582);
    $.__views.__alloyId583 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId583"
    });
    $.__views.__alloyId582.add($.__views.__alloyId583);
    $.__views.__alloyId584 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: "CAN I SHIP DIFFERENT ITEMS IN MY ORDER TO DIFFERENT SHIPPING ADDRESSES?",
        type: "questionText",
        id: "__alloyId584"
    });
    $.__views.__alloyId583.add($.__views.__alloyId584);
    $.__views.__alloyId585 = Ti.UI.createLabel({
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
        id: "__alloyId585"
    });
    $.__views.__alloyId583.add($.__views.__alloyId585);
    $.__views.__alloyId586 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId586"
    });
    $.__views.__alloyId582.add($.__views.__alloyId586);
    $.__views.__alloyId587 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "We can only process one shipping address per order. So, if you would like to order several items and ship to different addresses, please treat these as separate orders.",
        bottom: "8dp",
        id: "__alloyId587"
    });
    $.__views.__alloyId586.add($.__views.__alloyId587);
    $.__views.__alloyId588 = Ti.UI.createView({
        top: "10dp",
        bottom: "10dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId588"
    });
    $.__views.shippingQuestions.add($.__views.__alloyId588);
    $.__views.__alloyId589 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId589"
    });
    $.__views.__alloyId588.add($.__views.__alloyId589);
    $.__views.__alloyId590 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: "CAN MY ORDER SHIP TO A P.O. BOX?",
        type: "questionText",
        id: "__alloyId590"
    });
    $.__views.__alloyId589.add($.__views.__alloyId590);
    $.__views.__alloyId591 = Ti.UI.createLabel({
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
        id: "__alloyId591"
    });
    $.__views.__alloyId589.add($.__views.__alloyId591);
    $.__views.__alloyId592 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId592"
    });
    $.__views.__alloyId588.add($.__views.__alloyId592);
    $.__views.answerTextSupp3 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "answerTextSupp3",
        bottom: "8dp"
    });
    $.__views.__alloyId592.add($.__views.answerTextSupp3);
    $.__views.__alloyId593 = Ti.UI.createView({
        top: "10dp",
        bottom: "10dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId593"
    });
    $.__views.shippingQuestions.add($.__views.__alloyId593);
    $.__views.__alloyId594 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId594"
    });
    $.__views.__alloyId593.add($.__views.__alloyId594);
    $.__views.__alloyId595 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: "CAN I CHANGE MY SHIPPING ADDRESS AFTER AN ORDER HAS BEEN PLACED?",
        type: "questionText",
        id: "__alloyId595"
    });
    $.__views.__alloyId594.add($.__views.__alloyId595);
    $.__views.__alloyId596 = Ti.UI.createLabel({
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
        id: "__alloyId596"
    });
    $.__views.__alloyId594.add($.__views.__alloyId596);
    $.__views.__alloyId597 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId597"
    });
    $.__views.__alloyId593.add($.__views.__alloyId597);
    $.__views.__alloyId598 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Please ensure that you type the correct and complete shipping address while ordering as this cannot be changed after confirming your order.",
        bottom: "8dp",
        id: "__alloyId598"
    });
    $.__views.__alloyId597.add($.__views.__alloyId598);
    $.__views.__alloyId599 = Ti.UI.createView({
        top: "10dp",
        bottom: "10dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId599"
    });
    $.__views.shippingQuestions.add($.__views.__alloyId599);
    $.__views.__alloyId600 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId600"
    });
    $.__views.__alloyId599.add($.__views.__alloyId600);
    $.__views.__alloyId601 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: "WHO DO I CONTACT IN CASE MY ORDER HAS NOT BEEN DELIVERED WITHIN THE STIPULATED TIME?",
        type: "questionText",
        id: "__alloyId601"
    });
    $.__views.__alloyId600.add($.__views.__alloyId601);
    $.__views.__alloyId602 = Ti.UI.createLabel({
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
        id: "__alloyId602"
    });
    $.__views.__alloyId600.add($.__views.__alloyId602);
    $.__views.__alloyId603 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId603"
    });
    $.__views.__alloyId599.add($.__views.__alloyId603);
    $.__views.answerTextSupp4 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "answerTextSupp4",
        bottom: "8dp"
    });
    $.__views.__alloyId603.add($.__views.answerTextSupp4);
    $.__views.__alloyId604 = Ti.UI.createView({
        top: "10dp",
        bottom: "10dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId604"
    });
    $.__views.shippingQuestions.add($.__views.__alloyId604);
    $.__views.__alloyId605 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId605"
    });
    $.__views.__alloyId604.add($.__views.__alloyId605);
    $.__views.__alloyId606 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: "CAN I CHANGE MY BILLING ADDRESS?",
        type: "questionText",
        id: "__alloyId606"
    });
    $.__views.__alloyId605.add($.__views.__alloyId606);
    $.__views.__alloyId607 = Ti.UI.createLabel({
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
        id: "__alloyId607"
    });
    $.__views.__alloyId605.add($.__views.__alloyId607);
    $.__views.__alloyId608 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId608"
    });
    $.__views.__alloyId604.add($.__views.__alloyId608);
    $.__views.__alloyId609 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Please provide the billing address as per the address on your credit card for successful payment processing.",
        bottom: "8dp",
        id: "__alloyId609"
    });
    $.__views.__alloyId608.add($.__views.__alloyId609);
    $.__views.__alloyId610 = Ti.UI.createView({
        top: "10dp",
        bottom: "10dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId610"
    });
    $.__views.shippingQuestions.add($.__views.__alloyId610);
    $.__views.__alloyId611 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId611"
    });
    $.__views.__alloyId610.add($.__views.__alloyId611);
    $.__views.__alloyId612 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: "HOW LONG WILL IT TAKE TO RECEIVE MY ORDER?",
        type: "questionText",
        id: "__alloyId612"
    });
    $.__views.__alloyId611.add($.__views.__alloyId612);
    $.__views.__alloyId613 = Ti.UI.createLabel({
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
        id: "__alloyId613"
    });
    $.__views.__alloyId611.add($.__views.__alloyId613);
    $.__views.__alloyId614 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId614"
    });
    $.__views.__alloyId610.add($.__views.__alloyId614);
    $.__views.__alloyId615 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Subject to goods being in stock, domestic shipment across India typically takes 4-5 working days.",
        bottom: "8dp",
        id: "__alloyId615"
    });
    $.__views.__alloyId614.add($.__views.__alloyId615);
    $.__views.returnsQuestions = Ti.UI.createView({
        top: "20dp",
        left: "20dp",
        right: "20dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "returnsQuestions"
    });
    $.__views.__alloyId478.add($.__views.returnsQuestions);
    $.__views.__alloyId616 = Ti.UI.createView({
        top: "10dp",
        bottom: "10dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId616"
    });
    $.__views.returnsQuestions.add($.__views.__alloyId616);
    $.__views.__alloyId617 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId617"
    });
    $.__views.__alloyId616.add($.__views.__alloyId617);
    $.__views.__alloyId618 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: "WHAT IS YOUR RETURN POLICY?",
        type: "questionText",
        id: "__alloyId618"
    });
    $.__views.__alloyId617.add($.__views.__alloyId618);
    $.__views.__alloyId619 = Ti.UI.createLabel({
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
        id: "__alloyId619"
    });
    $.__views.__alloyId617.add($.__views.__alloyId619);
    $.__views.__alloyId620 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId620"
    });
    $.__views.__alloyId616.add($.__views.__alloyId620);
    $.__views.__alloyId621 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "We accept returns only for defective goods or those which are damaged in transit when ordered through our online store. You can also return an item if the order has taken more than 10 days to be delivered from the promised date of delivery.",
        bottom: "8dp",
        id: "__alloyId621"
    });
    $.__views.__alloyId620.add($.__views.__alloyId621);
    $.__views.__alloyId622 = Ti.UI.createView({
        top: "10dp",
        bottom: "10dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId622"
    });
    $.__views.returnsQuestions.add($.__views.__alloyId622);
    $.__views.__alloyId623 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId623"
    });
    $.__views.__alloyId622.add($.__views.__alloyId623);
    $.__views.__alloyId624 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: "CAN I RETURN THE PRODUCT AT A D'DECOR STORE?",
        type: "questionText",
        id: "__alloyId624"
    });
    $.__views.__alloyId623.add($.__views.__alloyId624);
    $.__views.__alloyId625 = Ti.UI.createLabel({
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
        id: "__alloyId625"
    });
    $.__views.__alloyId623.add($.__views.__alloyId625);
    $.__views.__alloyId626 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId626"
    });
    $.__views.__alloyId622.add($.__views.__alloyId626);
    $.__views.__alloyId627 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Products bought online cannot be exchanged or returned at any of our retail stores.",
        bottom: "8dp",
        id: "__alloyId627"
    });
    $.__views.__alloyId626.add($.__views.__alloyId627);
    $.__views.__alloyId628 = Ti.UI.createView({
        top: "10dp",
        bottom: "10dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId628"
    });
    $.__views.returnsQuestions.add($.__views.__alloyId628);
    $.__views.__alloyId629 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId629"
    });
    $.__views.__alloyId628.add($.__views.__alloyId629);
    $.__views.__alloyId630 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: "WHEN WILL I RECEIVE A REFUND FOR MY RETURNED PRODUCTS?",
        type: "questionText",
        id: "__alloyId630"
    });
    $.__views.__alloyId629.add($.__views.__alloyId630);
    $.__views.__alloyId631 = Ti.UI.createLabel({
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
        id: "__alloyId631"
    });
    $.__views.__alloyId629.add($.__views.__alloyId631);
    $.__views.__alloyId632 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId632"
    });
    $.__views.__alloyId628.add($.__views.__alloyId632);
    $.__views.__alloyId633 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "When a return is approved, a refund will be credited to your D’decor account in form of a credit note. A refund confirmation will be sent to your email address.",
        bottom: "8dp",
        id: "__alloyId633"
    });
    $.__views.__alloyId632.add($.__views.__alloyId633);
    $.__views.__alloyId634 = Ti.UI.createView({
        top: "10dp",
        bottom: "10dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId634"
    });
    $.__views.returnsQuestions.add($.__views.__alloyId634);
    $.__views.__alloyId635 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId635"
    });
    $.__views.__alloyId634.add($.__views.__alloyId635);
    $.__views.__alloyId636 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        touchEnabled: false,
        text: "I HAVE RECEIVED A CREDIT NOTE. HOW CAN I REDEEM IT?",
        type: "questionText",
        id: "__alloyId636"
    });
    $.__views.__alloyId635.add($.__views.__alloyId636);
    $.__views.__alloyId637 = Ti.UI.createLabel({
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
        id: "__alloyId637"
    });
    $.__views.__alloyId635.add($.__views.__alloyId637);
    $.__views.__alloyId638 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId638"
    });
    $.__views.__alloyId634.add($.__views.__alloyId638);
    $.__views.__alloyId639 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "To redeem your credit note, key in the code at check out. If the value of your purchase is higher than the value of the credit note, you can pay the difference with any of our payment methods. You will need to use the full amount of the credit note in a single purchase. Please note that you cannot redeem the credit note at any retail outlets.",
        bottom: "8dp",
        id: "__alloyId639"
    });
    $.__views.__alloyId638.add($.__views.__alloyId639);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    googleAnalyticsScreen("FAQ");
    touchEffect.createTouchEffect($.faqCloseLbl, "#a6ffffff", "#ffffff");
    var text = "Call 1800 103 9008 from 10.30 AM to 07.00 PM or email enquiry@ddecor.com";
    $.answerContact.attributedString = Titanium.UI.createAttributedString({
        text: text,
        attributes: [ {
            type: Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
            value: "#e65e48",
            range: [ text.indexOf("enquiry@ddecor.com"), "enquiry@ddecor.com".length ]
        } ]
    });
    $.answerTextSupp.attributedString = Titanium.UI.createAttributedString({
        text: "You can track your order by keying in your order number in the 'Track Order' option. Or, simply send an email to enquiry@ddecor.com.",
        attributes: [ {
            type: Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
            value: "#e65e48",
            range: [ "You can track your order by keying in your order number in the 'Track Order' option. Or, simply send an email to enquiry@ddecor.com.".indexOf("enquiry@ddecor.com"), "enquiry@ddecor.com".length ]
        } ]
    });
    $.answerTextSupp1.attributedString = Titanium.UI.createAttributedString({
        text: "Please write to our Support Executive at enquiry@ddecor.com. We will be happy to help you with your order.",
        attributes: [ {
            type: Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
            value: "#e65e48",
            range: [ "Please write to our Support Executive at enquiry@ddecor.com. We will be happy to help you with your order.".indexOf("enquiry@ddecor.com"), "enquiry@ddecor.com".length ]
        } ]
    });
    $.answerTextSupp2.attributedString = Titanium.UI.createAttributedString({
        text: "Currently, D’decor only ships domestic orders. We will be starting International shipping soon. If you have a specific request, please write to enquiry@ddecor.com for further information.",
        attributes: [ {
            type: Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
            value: "#e65e48",
            range: [ "Currently, D’decor only ships domestic orders. We will be starting International shipping soon. If you have a specific request, please write to enquiry@ddecor.com for further information.".indexOf("enquiry@ddecor.com"), "enquiry@ddecor.com".length ]
        } ]
    });
    $.answerTextSupp3.attributedString = Titanium.UI.createAttributedString({
        text: "Sorry, we do not ship to Post Office Boxes. If you have a specific request, please write to enquiry@ddecor.com for further information.",
        attributes: [ {
            type: Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
            value: "#e65e48",
            range: [ "Sorry, we do not ship to Post Office Boxes. If you have a specific request, please write to enquiry@ddecor.com for further information.".indexOf("enquiry@ddecor.com"), "enquiry@ddecor.com".length ]
        } ]
    });
    $.answerTextSupp4.attributedString = Titanium.UI.createAttributedString({
        text: "Call 1800 103 9008 anytime between 10.30 AM to 7.00 PM or you could send us an email on enquiry@ddecor.com for further information.",
        attributes: [ {
            type: Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
            value: "#e65e48",
            range: [ "Call 1800 103 9008 anytime between 10.30 AM to 7.00 PM or you could send us an email on enquiry@ddecor.com for further information.".indexOf("enquiry@ddecor.com"), "enquiry@ddecor.com".length ]
        } ]
    });
    var catArray = [ "GENERAL", "ORDERS", "PAYMENT", "SHIPPING", "RETURNS" ];
    setCategories();
    var faqFlag = true;
    $.faqDropDown.addEventListener("click", function(e) {
        if (faqFlag) {
            $.faqDropDown.height = Titanium.UI.SIZE;
            $.faqDropDownScroll.height = "150";
            faqFlag = false;
        } else {
            if (e.source.text) {
                $.faqLbl.text = e.source.text;
                switch (e.source.text) {
                  case "GENERAL":
                    $.generalQuestions.visible = true;
                    $.orderQuestions.visible = false;
                    $.paymentQuestions.visible = false;
                    $.shippingQuestions.visible = false;
                    $.returnsQuestions.visible = false;
                    break;

                  case "ORDERS":
                    $.generalQuestions.visible = false;
                    $.orderQuestions.visible = true;
                    $.paymentQuestions.visible = false;
                    $.shippingQuestions.visible = false;
                    $.returnsQuestions.visible = false;
                    break;

                  case "PAYMENT":
                    $.generalQuestions.visible = false;
                    $.orderQuestions.visible = false;
                    $.paymentQuestions.visible = true;
                    $.shippingQuestions.visible = false;
                    $.returnsQuestions.visible = false;
                    break;

                  case "SHIPPING":
                    $.generalQuestions.visible = false;
                    $.orderQuestions.visible = false;
                    $.paymentQuestions.visible = false;
                    $.shippingQuestions.visible = true;
                    $.returnsQuestions.visible = false;
                    break;

                  case "RETURNS":
                    $.generalQuestions.visible = false;
                    $.orderQuestions.visible = false;
                    $.paymentQuestions.visible = false;
                    $.shippingQuestions.visible = false;
                    $.returnsQuestions.visible = true;
                }
            }
            $.faqDropDown.height = "40dp";
            faqFlag = true;
        }
    });
    $.generalQuestions.visible = true;
    $.orderQuestions.visible = false;
    $.paymentQuestions.visible = false;
    $.shippingQuestions.visible = false;
    $.returnsQuestions.visible = false;
    $.generalQuestions.addEventListener("click", function(e) {
        manageAccordion(e, $.generalQuestions);
    });
    $.orderQuestions.addEventListener("click", function(e) {
        manageAccordion(e, $.orderQuestions);
    });
    $.paymentQuestions.addEventListener("click", function(e) {
        manageAccordion(e, $.paymentQuestions);
    });
    $.shippingQuestions.addEventListener("click", function(e) {
        manageAccordion(e, $.shippingQuestions);
    });
    $.returnsQuestions.addEventListener("click", function(e) {
        manageAccordion(e, $.returnsQuestions);
    });
    $.faqCloseLbl.addEventListener("click", goToBack);
    __defers["$.__views.faq!android:back!goToBack"] && $.addListener($.__views.faq, "android:back", goToBack);
    __defers["$.__views.faq!close!destroyWindow"] && $.addListener($.__views.faq, "close", destroyWindow);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;