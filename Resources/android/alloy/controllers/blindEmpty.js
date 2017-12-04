function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "blindEmpty";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.mainContainer = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        top: "0dp",
        layout: "vertical",
        id: "mainContainer"
    });
    $.__views.mainContainer && $.addTopLevelView($.__views.mainContainer);
    $.__views.blinds1Container = Ti.UI.createView({
        top: "0dp",
        width: Titanium.UI.FILL,
        height: "20dp",
        id: "blinds1Container"
    });
    $.__views.mainContainer.add($.__views.blinds1Container);
    $.__views.blinds1NameLbl = Ti.UI.createLabel({
        font: {
            fontSize: "11dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#333333",
        left: "0dp",
        id: "blinds1NameLbl"
    });
    $.__views.blinds1Container.add($.__views.blinds1NameLbl);
    $.__views.__alloyId269 = Ti.UI.createLabel({
        top: "5dp",
        font: {
            fontSize: "11dp",
            fontFamily: "Futura Md BT"
        },
        height: "15dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "#a6000000",
        text: "THERE ARE NO PRODUCTS IN THIS CATEGORY.",
        bindId: "message",
        id: "__alloyId269"
    });
    $.__views.mainContainer.add($.__views.__alloyId269);
    $.__views.__alloyId270 = Ti.UI.createView({
        width: "96%",
        backgroundColor: "#e6e6e6",
        height: "1dp",
        top: "20dp",
        id: "__alloyId270"
    });
    $.__views.mainContainer.add($.__views.__alloyId270);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = $.args;
    var response = args.response;
    var categoryName = response.categoryName.toUpperCase();
    $.blinds1NameLbl.setText(categoryName);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;