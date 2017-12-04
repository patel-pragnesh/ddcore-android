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
    function postLayout(callback, oc) {
        !oc && $.pagingcontrol.size.width ? callback() : $.pagingcontrol.addEventListener("postlayout", function onPostLayout(evt) {
            callback();
            evt.source.removeEventListener("postlayout", onPostLayout);
        });
    }
    function init() {
        if (args.tabs) {
            $.tabsCtrl = Widget.createController("tabs", {
                tabs: args.tabs,
                titles: _.map($.scrollableView.getViews(), function(v) {
                    return v.title;
                })
            });
            $.pagingcontrol.add($.tabsCtrl.getView());
            $.pagingcontrol.add(Ti.UI.createView({
                width: Ti.UI.FILL,
                height: 2,
                bottom: 0,
                backgroundColor: "transparent"
            }));
            $.tabsCtrl.on("select", function(e) {
                $.trigger("select", {
                    tab: e.tab,
                    view: e.view
                });
                $.scrollableView.currentPage = e.tab;
                $.indicator.setLeft(e.tab * $.iWidth);
            });
        }
        $.indicator = Ti.UI.createView({
            backgroundColor: args.indicatorColor,
            height: args.indicatorHeight,
            width: Ti.UI.SIZE,
            bottom: 3,
            left: 0,
            zIndex: 2
        });
        adjustePositions();
        $.pagingcontrol.add($.indicator);
        $.scrollableView.removeEventListener("scroll", onScroll);
        $.scrollableView.removeEventListener("scrollend", onScrollEnd);
        Ti.Gesture.removeEventListener("orientationchange", onOrientationChange);
        $.scrollableView.addEventListener("scroll", onScroll);
        $.scrollableView.addEventListener("scrollend", onScrollEnd);
        Ti.Gesture.addEventListener("orientationchange", onOrientationChange);
    }
    function onScroll(e) {
        if (e.source !== $.scrollableView) return;
        $.indicator.setLeft(e.currentPageAsFloat * $.iWidth);
        args.tabs && updateOffset(e.currentPageAsFloat);
    }
    function onScrollEnd(e) {
        if (previousPage !== e.currentPage) {
            $.tabsCtrl.selectColor(e.currentPage);
            previousPage = e.currentPage;
        }
    }
    function updateOffset(index) {
        if ("auto" === args.tabWidth) return;
        var width = $.pagingcontrol.size.width, tabsWidth = $.tabsCtrl.getWidth(), maxOffset = tabsWidth - width, tabSpace = tabsWidth * index / $.scrollableView.views.length, measurement = require("alloy/measurement");
        if (tabsWidth > width) {
            var offset = tabSpace - args.scrollOffset, offsetDp = maxOffset > offset ? offset : maxOffset, newOffset = measurement.dpToPX(offsetDp);
            $.pagingcontrol.setContentOffset({
                x: newOffset,
                y: 0
            }, {
                animated: false
            });
        }
    }
    function onOrientationChange(e) {
        postLayout(function() {
            $.tabsCtrl.updateWidth();
            adjustePositions();
        }, true);
    }
    function adjustePositions() {
        var totalWidth = args.tabs ? $.tabsCtrl.getWidth() : $.pagingcontrol.size.width;
        $.iWidth = Math.floor(totalWidth / $.scrollableView.views.length);
        $.indicator.setWidth($.iWidth);
        $.indicator.setLeft($.scrollableView.getCurrentPage() * $.iWidth);
    }
    var Widget = new (require("/alloy/widget"))("com.ddecor.pagingcontrol");
    this.__widgetId = "com.ddecor.pagingcontrol";
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
    $.__views.pagingcontrol = Ti.UI.createScrollView({
        scrollType: "horizontal",
        width: Ti.UI.FILL,
        contentWidth: "auto",
        contentHeight: Ti.UI.FILL,
        showHorizontalScrollIndicator: false,
        showVerticalScrollIndicator: false,
        id: "pagingcontrol"
    });
    $.__views.pagingcontrol && $.addTopLevelView($.__views.pagingcontrol);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    _.each([ "tabs", "findScrollableView" ], function(key) {
        if (!_.has(args, key)) return;
        try {
            args[key] = JSON.parse(args[key]);
        } catch (e) {
            delete args[key];
            Ti.API.error("Unable to set argument '" + key + "'. It must be boolean.");
        }
    });
    _.defaults(args, {
        dividerColor: "#a0a0a0",
        indicatorColor: "#e64e48",
        indicatorHeight: "6px",
        tabs: false,
        scrollOffset: 40,
        height: args.tabs ? 42 : 5,
        width: Ti.UI.FILL,
        findScrollableView: true,
        color: "#a0a0a0",
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        }
    });
    args.tabs && (args.tabs = {
        dividerColor: args.dividerColor,
        width: args.tabWidth,
        backgroundColor: args.backgroundColor,
        activeColor: "#e64e48",
        color: args.color,
        font: args.font
    });
    [ "backgroundColor", "backgroundImage", "backgroundLeftCap", "backgroundRepeat", "backgroundTopCap", "borderRadius", "borderWidth", "bottom", "height", "horizontalWrap", "left", "opacity", "right", "top", "visible", "width", "zIndex" ].forEach(function(prop) {
        _.has(args, prop) && ($.pagingcontrol[prop] = args[prop]);
    });
    args.__parentSymbol && args.findScrollableView && args.__parentSymbol.children.length > 0 && ($.scrollableView = _.find(args.__parentSymbol.children, function(child) {
        return "Ti.UI.ScrollableView" === child.apiName;
    }));
    _.has(args, "scrollableView") && ($.scrollableView = args.scrollableView);
    $.scrollableView && postLayout(init);
    var previousPage = null;
    exports.setScrollableView = function(_sv) {
        if ($.scrollableView) {
            Ti.API.error("Already initialized");
            return;
        }
        $.scrollableView = _sv;
        postLayout(init);
    };
    exports.cleanup = function() {
        Ti.Gesture.removeEventListener("orientationchange", onOrientationChange);
        args.tabs && $.tabsCtrl && $.tabsCtrl.off();
    };
    exports.refresh = function() {
        Ti.API.info("into refresh");
        $.pagingcontrol.removeAllChildren();
        exports.cleanup();
        init();
    };
    exports.updateLabelTitle = function(index, title) {
        if (void 0 != $.tabsCtrl) $.tabsCtrl.updateTitle(index, title); else {
            Ti.API.info("into widget else condition");
            exports.refresh();
        }
    };
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;