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
    this.__controllerPath = "dropdown";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.dropdown = Ti.UI.createView({
        width: "100dp",
        height: "80dp",
        borderColor: "green",
        zIndex: 10,
        id: "dropdown"
    });
    $.__views.dropdown && $.addTopLevelView($.__views.dropdown);
    $.__views.dropdownList = Ti.UI.createScrollView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        top: 0,
        left: 0,
        id: "dropdownList",
        layout: "vertical"
    });
    $.__views.dropdown.add($.__views.dropdownList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var state = [ "Maharastra", "Assam", "Goa", "Tamil Nadu", "Maharastra", "Assam", "Goa", "Tamil Nadu", "Maharastra", "Assam", "Goa", "Tamil Nadu" ];
    for (var i = 0; i < state.length; i++) {
        var listName = $.UI.create("Label", {
            classes: "fontLight",
            font: {
                fontSize: "12sp"
            },
            color: "black",
            top: "5dp",
            text: state[i],
            textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
        });
        $.dropdownList.add(listName);
    }
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;