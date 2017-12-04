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
    this.__controllerPath = "orderTemplate";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        var __itemTemplate = __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __alloyId1106 = [];
    var __alloyId1107 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId1108 = [];
            var __alloyId1109 = {
                type: "Ti.UI.ImageView",
                bindId: "orderImage",
                properties: {
                    top: 5,
                    left: "10dp",
                    width: "50dp",
                    height: "50dp",
                    backgroundColor: "#a0a0a0",
                    bindId: "orderImage"
                }
            };
            __alloyId1108.push(__alloyId1109);
            var __alloyId1110 = {
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
                    width: "50%",
                    wordWrap: false,
                    ellipsize: true,
                    bindId: "orderTitle"
                }
            };
            __alloyId1108.push(__alloyId1110);
            var __alloyId1111 = {
                type: "Ti.UI.Label",
                bindId: "orderPrice",
                properties: {
                    top: 5,
                    font: {
                        fontSize: "12dp",
                        fontFamily: "futura-hv-bt-heavy"
                    },
                    color: "#333333",
                    bindId: "orderPrice",
                    right: "10dp"
                }
            };
            __alloyId1108.push(__alloyId1111);
            var __alloyId1112 = {
                type: "Ti.UI.Label",
                bindId: "orderCatergory",
                properties: {
                    font: {
                        fontSize: "10dp",
                        fontFamily: "futura_medium_bt-webfont"
                    },
                    color: "#a0a0a0",
                    top: 22,
                    left: "80dp",
                    bindId: "orderCatergory"
                }
            };
            __alloyId1108.push(__alloyId1112);
            var __alloyId1113 = {
                type: "Ti.UI.ImageView",
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
            __alloyId1108.push(__alloyId1113);
            var __alloyId1114 = {
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
            __alloyId1108.push(__alloyId1114);
            var __alloyId1116 = {
                type: "Ti.UI.Label",
                bindId: "returnOrderDate",
                properties: {
                    left: "10dp",
                    color: "#000",
                    top: 64,
                    height: 0,
                    font: {
                        fontSize: "12dp",
                        fontFamily: "futura_lt_bt_light-webfont"
                    },
                    text: "Returned on : 28 July 2016",
                    bindId: "returnOrderDate"
                }
            };
            __alloyId1108.push(__alloyId1116);
            var __alloyId1117 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId1118 = [];
                    var __alloyId1120 = {
                        type: "Ti.UI.Label",
                        bindId: "orderAction",
                        properties: {
                            color: Alloy.Globals.labelTitleColor,
                            font: {
                                fontSize: "12dp",
                                fontFamily: "futura_lt_bt_light-webfont"
                            },
                            textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
                            text: "Enquiry",
                            bindId: "orderAction",
                            right: "10dp"
                        }
                    };
                    __alloyId1118.push(__alloyId1120);
                    return __alloyId1118;
                }(),
                properties: {
                    right: "5%",
                    height: "20dp",
                    width: Titanium.UI.SIZE,
                    top: 40
                }
            };
            __alloyId1108.push(__alloyId1117);
            return __alloyId1108;
        }(),
        properties: {
            width: Titanium.UI.FILL,
            height: Titanium.UI.SIZE,
            top: 0
        }
    };
    __alloyId1106.push(__alloyId1107);
    $.__views.orderTemplate = {
        properties: {
            name: "orderTemplate",
            selectionStyle: "none",
            backgroundColor: "transparent",
            height: Ti.UI.SIZE,
            top: "5%",
            layout: "vertical",
            id: "orderTemplate"
        },
        childTemplates: __alloyId1106
    };
    __itemTemplate["orderTemplate"] = $.__views.orderTemplate;
    $.__views.orderTemplate && $.addTopLevelView($.__views.orderTemplate);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;