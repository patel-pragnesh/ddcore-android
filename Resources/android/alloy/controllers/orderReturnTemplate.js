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
    this.__controllerPath = "orderReturnTemplate";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        var __itemTemplate = __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __alloyId1090 = [];
    var __alloyId1091 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId1092 = [];
            var __alloyId1093 = {
                type: "Ti.UI.ImageView",
                bindId: "orderImage",
                properties: {
                    top: 5,
                    left: "5%",
                    width: "50dp",
                    height: "50dp",
                    bindId: "orderImage"
                }
            };
            __alloyId1092.push(__alloyId1093);
            var __alloyId1094 = {
                type: "Ti.UI.Label",
                bindId: "orderTitle",
                properties: {
                    top: 5,
                    font: {
                        fontSize: "10dp",
                        fontFamily: "futura-hv-bt-heavy"
                    },
                    color: "#333333",
                    left: "80dp",
                    bindId: "orderTitle"
                }
            };
            __alloyId1092.push(__alloyId1094);
            var __alloyId1095 = {
                type: "Ti.UI.Label",
                bindId: "orderPrice",
                properties: {
                    top: 5,
                    right: "5%",
                    font: {
                        fontSize: "12dp",
                        fontFamily: "futura-hv-bt-heavy"
                    },
                    color: "#333333",
                    bindId: "orderPrice"
                }
            };
            __alloyId1092.push(__alloyId1095);
            var __alloyId1096 = {
                type: "Ti.UI.Label",
                bindId: "orderCatergory",
                properties: {
                    font: {
                        fontSize: "10dp",
                        fontFamily: "futura_medium_bt-webfont"
                    },
                    color: "#6E6E6E",
                    top: 22,
                    left: "80dp",
                    bindId: "orderCatergory"
                }
            };
            __alloyId1092.push(__alloyId1096);
            var __alloyId1097 = {
                type: "Ti.UI.Label",
                bindId: "orderColor",
                properties: {
                    width: "18dp",
                    height: "16dp",
                    left: "80dp",
                    top: 40,
                    backgroundColor: "#58D3F7",
                    bindId: "orderColor"
                }
            };
            __alloyId1092.push(__alloyId1097);
            var __alloyId1098 = {
                type: "Ti.UI.Label",
                bindId: "orderUOM",
                properties: {
                    font: {
                        fontFamily: "futura-hv-bt-heavy",
                        fontSize: "10dp"
                    },
                    top: 42,
                    left: "120dp",
                    color: Alloy.Globals.labelTitleColor,
                    bindId: "orderUOM"
                }
            };
            __alloyId1092.push(__alloyId1098);
            return __alloyId1092;
        }(),
        properties: {
            width: Titanium.UI.FILL,
            height: Titanium.UI.SIZE,
            top: 0
        }
    };
    __alloyId1090.push(__alloyId1091);
    var __alloyId1100 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId1101 = [];
            var __alloyId1103 = {
                type: "Ti.UI.Label",
                bindId: "orderStatusDate",
                properties: {
                    left: "5%",
                    color: "#000",
                    font: {
                        fontSize: "12dp",
                        fontFamily: "futura_lt_bt_light-webfont"
                    },
                    textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
                    bindId: "orderStatusDate"
                }
            };
            __alloyId1101.push(__alloyId1103);
            var __alloyId1105 = {
                type: "Ti.UI.Label",
                bindId: "orderAction",
                properties: {
                    right: "5%",
                    color: Alloy.Globals.labelTitleColor,
                    font: {
                        fontSize: "12dp",
                        fontFamily: "futura_lt_bt_light-webfont"
                    },
                    textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
                    bindId: "orderAction"
                }
            };
            __alloyId1101.push(__alloyId1105);
            return __alloyId1101;
        }(),
        properties: {
            width: Titanium.UI.FILL,
            height: Titanium.UI.SIZE,
            top: 5,
            bottom: 5
        }
    };
    __alloyId1090.push(__alloyId1100);
    $.__views.orderReturnTemplate = {
        properties: {
            name: "orderReturnTemplate",
            selectionStyle: "none",
            backgroundColor: "transparent",
            height: Ti.UI.SIZE,
            top: "5%",
            layout: "vertical",
            id: "orderReturnTemplate"
        },
        childTemplates: __alloyId1090
    };
    __itemTemplate["orderReturnTemplate"] = $.__views.orderReturnTemplate;
    $.__views.orderReturnTemplate && $.addTopLevelView($.__views.orderReturnTemplate);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;