function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function myaccountNavigation(e) {
        var id = e.source.myAccountPage;
        switch (id) {
          case "estore":
            Alloy.Globals.addWindowInNav("eshop");
            break;

          case "catalogue":
            var collectionAllData = {
                categoryId: Alloy.Globals.categoryId,
                categoryName: "COLLECTION",
                WindowName: "COLLECTIONS",
                type: "collection",
                block: "Allcollection"
            };
            Alloy.Globals.addWindowInNav("productListing", collectionAllData);
            break;

          case "appointment":
            args.mainWindow.add(Alloy.createController("bookappoinment", {
                mainWindow: args.mainWindow,
                androidBack: args.androidBack,
                closeAndroidBack: args.closeAndroidBack,
                isMainWindow: true,
                loadFirstAppointment: args.loadFirstAppointment,
                refreshCount: args.refreshCount
            }).getView());
            break;

          case "savedviews":        }
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "emptyMyAccount";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.emptyMyAccount = Ti.UI.createView({
        width: Titanium.UI.FILL,
        id: "emptyMyAccount",
        height: "100%",
        borderColor: "transparent"
    });
    $.__views.emptyMyAccount && $.addTopLevelView($.__views.emptyMyAccount);
    $.__views.myaccountEmptylbl = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_medium_bt-webfont",
            fontSize: "12dp"
        },
        width: "80%",
        top: "30%",
        color: "#555555",
        wordWrap: true,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "YOU HAVE NO ORDERS",
        id: "myaccountEmptylbl"
    });
    $.__views.emptyMyAccount.add($.__views.myaccountEmptylbl);
    $.__views.myAccountActionBtn = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_medium_bt-webfont",
            fontSize: "12dp"
        },
        color: "#fff",
        backgroundColor: "#a0a0a0",
        width: "70%",
        height: "40dp",
        bottom: "20dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "VISIT OUR ESTORE",
        id: "myAccountActionBtn",
        myAccountPage: "estore"
    });
    $.__views.emptyMyAccount.add($.__views.myAccountActionBtn);
    myaccountNavigation ? $.addListener($.__views.myAccountActionBtn, "click", myaccountNavigation) : __defers["$.__views.myAccountActionBtn!click!myaccountNavigation"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    touchEffect.createTouchEffect($.myAccountActionBtn, "#a6ffffff", "#ffffff");
    $.myAccountActionBtn.myAccountPage = args.screenName;
    switch (args.screenName) {
      case "estore":
        $.myaccountEmptylbl.setText("YOU HAVE NO ORDERS");
        break;

      case "catalogue":
        $.myaccountEmptylbl.setText("YOU HAVE NO SHORTLISTED PRODUCTS");
        $.myAccountActionBtn.setText("VIEW OUR CATALOGUE");
        break;

      case "appointment":
        $.myaccountEmptylbl.setText("YOU HAVE NOT REQUESTED FOR ANY APPOINTMENT SO FAR");
        $.myAccountActionBtn.setText("REQUEST AN APPOINMENT");
        break;

      case "savedviews":
        $.myaccountEmptylbl.setText("YOU HAVE NO SAVED VIEWED");
        $.myAccountActionBtn.setVisible(false);
    }
    __defers["$.__views.myAccountActionBtn!click!myaccountNavigation"] && $.addListener($.__views.myAccountActionBtn, "click", myaccountNavigation);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;