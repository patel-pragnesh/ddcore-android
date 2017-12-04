function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.ddecor.pagingcontrol/" + s : s.substring(0, index) + "/com.ddecor.pagingcontrol/" + s.substring(index + 1);
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
    function getTabWidth(num) {
        var denominator, width, displayWidth = Ti.Platform.displayCaps.platformWidth, orientation = Ti.Gesture.orientation;
        displayWidth /= Ti.Platform.displayCaps.logicalDensityFactor;
        denominator = orientation == Ti.UI.LANDSCAPE_LEFT || orientation == Ti.UI.LANDSCAPE_RIGHT ? num || 7 : num || 4;
        width = Math.floor(displayWidth / denominator) - 1;
        width += 30;
        return width;
    }
    function init(args) {
        _.defaults(opts, args);
        "auto" === args.tabs.width && (opts.fitWidth = true);
        opts.fitWidth ? $.tabWidth = getTabWidth(args.titles.length) : $.tabWidth = args.tabs.width || getTabWidth();
        if (_.isString($.tabWidth) && $.tabWidth.indexOf("%") > 0) {
            var newWidth = parseInt($.tabWidth.slice(0, $.tabWidth.indexOf("%"))) / 100;
            newWidth /= Ti.Platform.displayCaps.logicalDensityFactor;
            $.tabWidth = newWidth * Ti.Platform.displayCaps.platformWidth;
        }
        $.tabs.applyProperties({
            left: 0,
            width: getWidth(),
            height: Ti.UI.FILL
        });
        for (var i = 0; i < args.titles.length; i++) {
            tabs[i] = Ti.UI.createView({
                width: $.tabWidth,
                height: Ti.UI.FILL
            });
            var label = Ti.UI.createLabel({
                color: 0 !== i || !args.tabs.activeColor ? args.tabs.color : args.tabs.activeColor,
                font: args.tabs.font,
                text: args.titles[i],
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
            });
            try {
                var count = label.text.split(" ");
                if (void 0 != count[1]) {
                    var textTitle = count[0] + " " + count[1];
                    var attr = Ti.UI.createAttributedString({
                        text: textTitle,
                        attributes: [ {
                            type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
                            value: "#fff",
                            range: [ textTitle.indexOf(count[1]), count[1].length ]
                        } ]
                    });
                    3 != i && (label.attributedString = attr);
                }
            } catch (Exp) {
                Ti.API.info("widget error -> " + Exp.message);
            }
            labels.push(label);
            tabs[i].add(label);
            !function(index) {
                tabs[i].addEventListener("click", function() {
                    var view = this;
                    $.trigger("select", {
                        tab: index,
                        view: view
                    });
                });
            }(i);
            $.tabs.add(tabs[i]);
            i < args.titles.length - 1 && $.tabs.add(Ti.UI.createView({
                backgroundColor: args.tabs.dividerColor,
                height: "14dp",
                width: "1dp"
            }));
        }
    }
    function selectColor(index) {
        if (!opts.tabs.activeColor) return;
        var fontLight = {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "12dp"
        };
        var fontMedium = {
            fontFamily: "futura_medium_bt-webfont",
            fontSize: "12dp"
        };
        for (var j = 0; j < labels.length; j++) if (j === index) {
            labels[j].color = opts.tabs.activeColor;
            labels[j].font = fontMedium;
        } else {
            labels[j].color = opts.tabs.color;
            labels[j].font = fontLight;
        }
    }
    function updateWidth() {
        $.tabs.setWidth(Ti.UI.FILL);
        if (opts.fitWidth) {
            $.tabWidth = getTabWidth(opts.titles.length);
            tabs.forEach(function(tab) {
                tab.setWidth($.tabWidth - 1);
            });
        }
    }
    function getWidth() {
        return $.tabWidth * opts.titles.length + opts.titles.length;
    }
    function updateTitle(index, title) {
        labels[index].text = title;
        var count = labels[index].text.split(" ");
        if (void 0 != count[1]) {
            var textTitle = count[0] + " " + count[1];
            var attr = Ti.UI.createAttributedString({
                text: textTitle,
                attributes: [ {
                    type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
                    value: "#fff",
                    range: [ textTitle.indexOf(count[1]), count[1].length ]
                } ]
            });
            labels[index].attributedString = attr;
        }
    }
    new (require("/alloy/widget"))("com.ddecor.pagingcontrol");
    this.__widgetId = "com.ddecor.pagingcontrol";
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tabs";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.tabs = Ti.UI.createView({
        layout: "horizontal",
        id: "tabs"
    });
    $.__views.tabs && $.addTopLevelView($.__views.tabs);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var tabs = [];
    var opts = {};
    var labels = [];
    init(arguments[0] || {});
    exports.getWidth = getWidth;
    exports.updateWidth = updateWidth;
    exports.selectColor = selectColor;
    exports.updateTitle = updateTitle;
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;