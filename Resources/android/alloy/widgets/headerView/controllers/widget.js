function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "headerView/" + s : s.substring(0, index) + "/headerView/" + s.substring(index + 1);
    return 0 !== path.indexOf("/") ? "/" + path : path;
}

function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function updateCartCount() {
        Ti.App.Properties.getString("access_token") ? $.customerService.setHeight("40dp") : $.customerService.setHeight("0dp");
        updateHeaderCartCount($.cartCountLbl);
    }
    function showOverFlow(e) {
        Alloy.Globals.overFlowFlag = true;
        $.openView.visible = true;
    }
    function hideOverFlow(e) {
        if (Alloy.Globals.overFlowFlag) {
            $.openView.visible = false;
            Alloy.Globals.overFlowFlag = false;
        }
    }
    function goToBack(e) {
        if ("" != windowName) {
            Alloy.Globals.popWindowInNav();
            windowName.close();
            setTimeout(function() {
                Ti.API.info("into header View remove*********");
                windowName.remove($.dashboardNavigation);
                windowName.remove($.openView);
            }, 500);
        } else "" != viewName ? viewName.visible = false : Ti.API.info("Check your controller's function");
    }
    new (require("/alloy/widget"))("headerView");
    this.__widgetId = "headerView";
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.dashboardNavigation = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: "53dp",
        backgroundColor: "#231f20",
        top: "0dp",
        id: "dashboardNavigation"
    });
    $.__views.dashboardNavigation && $.addTopLevelView($.__views.dashboardNavigation);
    $.__views.menuButton = Ti.UI.createLabel({
        left: "0dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "icomoon",
            fontSize: "22dp"
        },
        height: "45dp",
        width: "45dp",
        color: "#ffffff",
        id: "menuButton",
        text: Alloy.Globals.icon.backArrow
    });
    $.__views.dashboardNavigation.add($.__views.menuButton);
    $.__views.logoIcon = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "13dp"
        },
        height: "14dp",
        width: "40%",
        color: "#ffffff",
        id: "logoIcon",
        left: 45
    });
    $.__views.dashboardNavigation.add($.__views.logoIcon);
    $.__views.subLbl = Ti.UI.createLabel({
        left: "45dp",
        bottom: "5dp",
        height: "10dp",
        width: "40%",
        font: {
            fontSize: "9dp",
            fontFamily: "futura_lt_bt_light-webfont",
            fontWeight: "bold"
        },
        color: "#f0f0f0",
        id: "subLbl"
    });
    $.__views.dashboardNavigation.add($.__views.subLbl);
    $.__views.cartContainer = Ti.UI.createView({
        width: "45dp",
        height: "45dp",
        right: "90dp",
        id: "cartContainer"
    });
    $.__views.dashboardNavigation.add($.__views.cartContainer);
    $.__views.cartCountLbl = Ti.UI.createLabel({
        width: "18dp",
        height: "18dp",
        left: "5dp",
        top: "7dp",
        borderRadius: "9dp",
        borderColor: "#231f20",
        borderWidth: "0.7",
        color: "#000000",
        visible: false,
        zIndex: "10",
        font: {
            fontSize: "10dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#e65e48",
        touchEnabled: false,
        id: "cartCountLbl"
    });
    $.__views.cartContainer.add($.__views.cartCountLbl);
    $.__views.cartLbl = Ti.UI.createLabel({
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "icomoon",
            fontSize: "22dp"
        },
        height: "45dp",
        width: "45dp",
        color: "#ffffff",
        id: "cartLbl",
        text: Alloy.Globals.icon.bag
    });
    $.__views.cartContainer.add($.__views.cartLbl);
    $.__views.searchLbl = Ti.UI.createLabel({
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "icomoon",
            fontSize: "22dp"
        },
        height: "45dp",
        width: "45dp",
        color: "#ffffff",
        id: "searchLbl",
        text: Alloy.Globals.icon.search,
        right: "45dp"
    });
    $.__views.dashboardNavigation.add($.__views.searchLbl);
    $.__views.overFlowMenuLbl = Ti.UI.createLabel({
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "icomoon",
            fontSize: "22dp"
        },
        height: "45dp",
        width: "45dp",
        color: "#ffffff",
        id: "overFlowMenuLbl",
        text: Alloy.Globals.icon.dotsMenu,
        right: "0dp"
    });
    $.__views.dashboardNavigation.add($.__views.overFlowMenuLbl);
    $.__views.openView = Ti.UI.createView({
        zIndex: "1",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        top: "0dp",
        right: "5dp",
        visible: false,
        backgroundColor: "transparent",
        id: "openView"
    });
    $.__views.openView && $.addTopLevelView($.__views.openView);
    $.__views.overFlowView = Ti.UI.createView({
        zIndex: "10",
        width: "55%",
        top: "8dp",
        right: "5dp",
        height: Titanium.UI.SIZE,
        borderRadius: "3dp",
        borderColor: "gray",
        borderWidth: "0.6",
        backgroundColor: "#ffffff",
        layout: "vertical",
        id: "overFlowView"
    });
    $.__views.openView.add($.__views.overFlowView);
    $.__views.home = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: "40dp",
        left: "10dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        text: "HOME",
        id: "home"
    });
    $.__views.overFlowView.add($.__views.home);
    $.__views.aboutsUs = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: "40dp",
        left: "10dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        text: "ABOUT US",
        id: "aboutsUs"
    });
    $.__views.overFlowView.add($.__views.aboutsUs);
    $.__views.appoinmantLbl = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: "40dp",
        left: "10dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        text: "FEEDBACK",
        id: "appoinmantLbl"
    });
    $.__views.overFlowView.add($.__views.appoinmantLbl);
    $.__views.customerService = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: "40dp",
        left: "10dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        text: "CUSTOMER SERVICE",
        id: "customerService"
    });
    $.__views.overFlowView.add($.__views.customerService);
    $.__views.return_refund = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: "40dp",
        left: "10dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        text: "RETURNS / REFUND",
        id: "return_refund"
    });
    $.__views.overFlowView.add($.__views.return_refund);
    $.__views.faq = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: "40dp",
        left: "10dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        text: "FAQ",
        id: "faq"
    });
    $.__views.overFlowView.add($.__views.faq);
    $.__views.privacy = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: "40dp",
        left: "10dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        text: "PRIVACY POLICY",
        id: "privacy"
    });
    $.__views.overFlowView.add($.__views.privacy);
    $.__views.shortlist = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: "40dp",
        left: "10dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        text: "MY SHORTLIST",
        id: "shortlist"
    });
    $.__views.overFlowView.add($.__views.shortlist);
    try {
        $.addListener($.__views.shortlist, "click", Alloy.Globals.navigateToMyShorlistScreen);
    } catch (e) {
        __defers["$.__views.shortlist!click!Alloy.Globals.navigateToMyShorlistScreen"] = true;
    }
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var windowName = "";
    var viewName = "";
    Alloy.Globals.setCount = function() {
        updateCartCount();
    };
    Ti.App.removeEventListener("updateCartCount", updateCartCount);
    Ti.App.addEventListener("updateCartCount", updateCartCount);
    $.searchLbl.addEventListener("click", function(e) {
        Alloy.Globals.addWindowInNav("searchListing");
    });
    $.cartContainer.addEventListener("click", function(e) {
        if (Ti.App.Properties.getString("access_token")) {
            var quote_id = Ti.App.Properties.getString("quote_id");
            Ti.API.info("quote_id = " + quote_id);
            Alloy.Globals.addWindowInNav("myBag", quote_id);
        } else Alloy.Globals.addWindowInNav("signIn", "myBag");
    });
    touchEffect.createTouchEffect($.menuButton, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.logoIcon, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.cartLbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.searchLbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.overFlowMenuLbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.home, "#a6333333", "#333333");
    touchEffect.createTouchEffect($.appoinmantLbl, "#a6333333", "#333333");
    touchEffect.createTouchEffect($.aboutsUs, "#a6333333", "#333333");
    touchEffect.createTouchEffect($.customerService, "#a6333333", "#333333");
    touchEffect.createTouchEffect($.return_refund, "#a6333333", "#333333");
    touchEffect.createTouchEffect($.faq, "#a6333333", "#333333");
    $.overFlowMenuLbl.addEventListener("click", showOverFlow);
    $.overFlowView.addEventListener("click", hideOverFlow);
    $.openView.addEventListener("click", hideOverFlow);
    exports.hideOverFlow = hideOverFlow;
    var init = function(args) {
        if (void 0 != args.title) {
            $.addClass($.logoIcon, "pageTitle");
            $.logoIcon.text = args.title;
            $.subLbl.text = args.subTitle || "";
        } else $.logoIcon.text = "D'Decor'";
        void 0 != args.passWindow ? windowName = args.passWindow : void 0 != args.passView && (viewName = args.passView);
    };
    exports.init = init;
    $.menuButton.addEventListener("click", goToBack);
    $.customerService.addEventListener("click", function(e) {
        Alloy.Globals.addWindowInNav("customerService");
    });
    $.appoinmantLbl.addEventListener("click", function(e) {
        Ti.App.Properties.getString("access_token") ? Alloy.Globals.addWindowInNav("feedBack") : Alloy.Globals.addWindowInNav("signIn");
    });
    $.aboutsUs.addEventListener("click", function(e) {
        Alloy.Globals.addWindowInNav("aboutUs");
    });
    $.home.addEventListener("click", function(e) {
        Ti.API.info("viewName = " + viewName);
        if ("" != windowName) {
            Alloy.Globals.popWindowInNav();
            Alloy.Globals.destroyWindowInNav();
            windowName.close();
        } else "" != viewName ? viewName.visible = false : Ti.API.info("Check your controller's function");
    });
    $.return_refund.addEventListener("click", function(e) {
        Alloy.Globals.addWindowInNav("returnRefund");
    });
    $.faq.addEventListener("click", function(e) {
        Alloy.Globals.addWindowInNav("faq");
    });
    $.privacy.addEventListener("click", function(e) {
        try {
            Alloy.Globals.addWindowInNav("privacypolicy");
        } catch (ex) {
            Ti.API.info("privacy Policy-->" + JSON.stringify(ex.message));
        }
    });
    exports.updateCartCount = updateCartCount;
    __defers["$.__views.shortlist!click!Alloy.Globals.navigateToMyShorlistScreen"] && $.addListener($.__views.shortlist, "click", Alloy.Globals.navigateToMyShorlistScreen);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;