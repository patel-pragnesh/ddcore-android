function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function looping_value(templateName) {
        try {
            listData = [];
            _.each(data, function(value, k) {
                listData.push({
                    properties: {},
                    template: "gridTemplate",
                    gridProductImage1: {
                        image: value[0].profile_image,
                        collectionId: value[0].looks_id,
                        collectionName: value[0].looks_name
                    },
                    gridProductImage2: {
                        image: value[1].profile_image,
                        collectionId: value[1].looks_id,
                        collectionName: value[1].looks_name
                    },
                    gridProductname1: {
                        text: value[0].looks_name,
                        collectionId: value[0].looks_id,
                        collectionName: value[0].looks_name
                    },
                    gridProductname2: {
                        text: value[1].looks_name,
                        collectionId: value[1].looks_id,
                        collectionName: value[1].looks_name
                    },
                    gridCart1: {
                        text: "",
                        visible: false
                    },
                    gridCart2: {
                        text: "",
                        visible: false
                    },
                    gridWhereToBuy1: {
                        text: "Where to buy"
                    },
                    gridWhereToBuy2: {
                        text: "Where to buy"
                    },
                    gridWish1: {
                        collectionId: value[0].looks_id,
                        collectionName: value[0].looks_name
                    },
                    gridWish2: {
                        collectionId: value[1].looks_id,
                        collectionName: value[1].looks_name
                    },
                    gridShare1: {
                        shareUrl: value[0].url
                    },
                    gridShare2: {
                        shareUrl: value[1].url
                    },
                    productSize1: {
                        text: "",
                        font: {
                            fontSize: 0
                        }
                    },
                    productSize2: {
                        text: "",
                        font: {
                            fontSize: 0
                        }
                    },
                    outOfStock1: {
                        visible: false,
                        collectionId: value[0].looks_id
                    },
                    outOfStock2: {
                        visible: false,
                        collectionId: value[1].looks_id
                    }
                });
            });
            $.mainSection.appendItems(listData);
            if (pageCount === lookCount) {
                $.curtainsLoadMore.text = "VIEW ALL";
                $.curtainsLoadMore.color = Alloy.Globals.labelTitleColor;
            } else if (3 == pageinationCount) {
                $.curtainsLoadMore.text = "VIEW ALL";
                $.curtainsLoadMore.color = Alloy.Globals.labelTitleColor;
            }
            if (0 != $.mainSection.getItems().length) {
                var numberOfRow = $.mainSection.getItems().length;
                var listViewHeight = (Alloy.Globals.imageWidth + 63) * numberOfRow + 66;
                $.listView.setHeight(listViewHeight);
            }
        } catch (exp) {
            Ti.API.info("expcetion-->" + exp.message);
        }
    }
    function loadMoreStyle() {
        if ("LOAD MORE" == $.curtainsLoadMore.text) {
            $.loader.show();
            $.curtainsLoadMore.text = "";
            var requestMethod = Alloy.Globals.commonUrl.allStyles;
            var param = {
                style: currentStyle,
                current_page: currentPage,
                page_size: 2
            };
            var requestParam = JSON.stringify(param);
            Alloy.Globals.webServiceCall(requestMethod, requestParam, loadMoreStyleSuccessCallback, loadMoreStyleErrorCallback, "POST", $.quizResults);
        } else viewAllStyle();
    }
    function loadMoreStyleSuccessCallback(response) {
        pageinationCount++;
        $.loader.hide();
        hideLoader();
        if (0 != response.data.looks.length) {
            lookCount += response.data.looks.length;
            pageCount = response.data.looks_count;
            currentPage++;
            addMore(response);
        } else showAlert($.quizResults, "No More Looks");
    }
    function loadMoreStyleErrorCallback(response) {
        $.loader.hide();
        $.curtainsLoadMore.text = "LOAD MORE";
        hideLoader();
        showAlert($.quizResults, response.message);
    }
    function addMore(response) {
        var _looksList = response.data.looks;
        var size = 2;
        var gridDataArr = [];
        var myDataArrCounter = 0;
        for (var i = 0; i < _looksList.length; i += size) {
            var smallPaginationArray = _looksList.slice(i, i + size);
            gridDataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallPaginationArray));
            myDataArrCounter++;
        }
        subGridData = "{" + gridDataArr + "}";
        var finalGridData = JSON.parse(subGridData);
        data = finalGridData;
        looping_value();
    }
    function goToBack() {
        Alloy.Globals.popWindowInNav();
        $.quizResults.close();
    }
    function cleanUp() {
        $.removeListener();
        $.quizResults.remove($.superScroll);
        $.superScroll.removeAllChildren();
        args = {};
        response = null;
        _looksList = null;
        pageCount = null;
        lookCount = null;
        currentPage = null;
        currentStyle = null;
        size = null;
        gridDataArr = [];
        myDataArrCounter = null;
        subGridData = null;
        finalGridData = null;
        data = null;
        listData = [];
        $.destroy();
    }
    function looksListEvent(e) {
        if (e.bindId) {
            var bind = e.bindId;
            var index = e.itemIndex;
            var a = e.section.items[index];
        }
        if ("gridWish1" == e.bindId || "gridWish2" == e.bindId) if (Ti.App.Properties.getString("access_token")) {
            var collectionData = {
                collectionName: a[bind].collectionName,
                collectionId: a[bind].collectionId,
                type: "shopByLook"
            };
            addShortlist = Alloy.createController("addToShortlist", collectionData).getView();
            addShortlist.zIndex = 11;
            $.quizResults.add(addShortlist);
            hideShowView(addShortlist);
        } else Alloy.Globals.addWindowInNav("signIn", "quizResults"); else if ("gridProductImage1" == e.bindId || "gridProductImage2" == e.bindId) {
            var CollectionData = {
                type: "shopByLook",
                id: a[bind].collectionId
            };
            Alloy.Globals.addWindowInNav("productDetails", CollectionData);
        } else "gridWhereToBuy1" == e.bindId || "gridWhereToBuy2" == e.bindId ? Alloy.Globals.addWindowInNav("findStore") : ("gridShare1" == e.bindId || "gridShare2" == e.bindId) && shareImage(a[bind].shareUrl);
    }
    function viewAllStyle() {
        var shopByLookData = {
            type: "shopByLook",
            style: $.collectionNameLbl.getText(),
            windowNav: "myAccount"
        };
        Alloy.Globals.addWindowInNav("productListing", shopByLookData);
    }
    function updateCount() {
        $.header.updateCartCount();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "quizResults";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.quizResults = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        backgroundColor: "#ffffff",
        id: "quizResults"
    });
    $.__views.quizResults && $.addTopLevelView($.__views.quizResults);
    cleanUp ? $.addListener($.__views.quizResults, "close", cleanUp) : __defers["$.__views.quizResults!close!cleanUp"] = true;
    updateCount ? $.addListener($.__views.quizResults, "focus", updateCount) : __defers["$.__views.quizResults!focus!updateCount"] = true;
    $.__views.header = Alloy.createWidget("headerView", "widget", {
        id: "header",
        __parentSymbol: $.__views.quizResults
    });
    $.__views.header.setParent($.__views.quizResults);
    $.__views.superScroll = Ti.UI.createScrollView({
        top: "53dp",
        scrollType: "vertical",
        layout: "vertical",
        contentHeight: "auto",
        id: "superScroll"
    });
    $.__views.quizResults.add($.__views.superScroll);
    $.__views.__alloyId1281 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        id: "__alloyId1281"
    });
    $.__views.superScroll.add($.__views.__alloyId1281);
    $.__views.quizImage = Ti.UI.createImageView({
        left: "0dp",
        top: "0dp",
        width: Titanium.UI.FILL,
        height: "250dp",
        image: "/images/bed.jpg",
        id: "quizImage"
    });
    $.__views.__alloyId1281.add($.__views.quizImage);
    $.__views.__alloyId1282 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        bottom: "0dp",
        backgroundGradient: {
            type: "linear",
            colors: [ {
                color: "#00000000",
                position: 0
            }, {
                color: "#000000",
                position: 1
            } ],
            startPoint: {
                x: 0,
                y: 0
            },
            endPoint: {
                x: 0,
                y: "100%"
            },
            backFillStart: false
        },
        id: "__alloyId1282"
    });
    $.__views.__alloyId1281.add($.__views.__alloyId1282);
    $.__views.__alloyId1283 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        layout: "vertical",
        bottom: "20dp",
        id: "__alloyId1283"
    });
    $.__views.__alloyId1282.add($.__views.__alloyId1283);
    $.__views.__alloyId1284 = Ti.UI.createLabel({
        top: "30dp",
        font: {
            fontSize: "9dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        text: "YOUR STYLE",
        id: "__alloyId1284"
    });
    $.__views.__alloyId1283.add($.__views.__alloyId1284);
    $.__views.collectionNameLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "25dp"
        },
        color: "#ffffff",
        width: "90%",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "CLASSICAL",
        id: "collectionNameLbl"
    });
    $.__views.__alloyId1283.add($.__views.collectionNameLbl);
    $.__views.__alloyId1285 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        bottom: "10dp",
        id: "__alloyId1285"
    });
    $.__views.__alloyId1282.add($.__views.__alloyId1285);
    $.__views.shareIcon = Ti.UI.createLabel({
        font: {
            fontSize: "16dp",
            fontFamily: "icomoon"
        },
        width: "20dp",
        height: "20dp",
        color: "#FFFFFF",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        right: "10dp",
        text: Alloy.Globals.icon.share,
        id: "shareIcon",
        visible: false
    });
    $.__views.__alloyId1285.add($.__views.shareIcon);
    $.__views.__alloyId1286 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId1286"
    });
    $.__views.superScroll.add($.__views.__alloyId1286);
    $.__views.quizDescription = Ti.UI.createLabel({
        top: "25dp",
        width: "88%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "11.5dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#999999",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut.",
        id: "quizDescription"
    });
    $.__views.__alloyId1286.add($.__views.quizDescription);
    $.__views.tourDeQuiz = Ti.UI.createLabel({
        font: {
            fontSize: "11dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        top: "15dp",
        bottom: "25dp",
        width: "70%",
        height: "40dp",
        color: "#ffffff",
        backgroundColor: "#ee777777",
        borderColor: "#ee777777",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "TAKE QUIZ AGAIN",
        id: "tourDeQuiz"
    });
    $.__views.__alloyId1286.add($.__views.tourDeQuiz);
    $.__views.__alloyId1287 = Ti.UI.createView({
        left: "15dp",
        right: "15dp",
        height: "2px",
        width: Titanium.UI.FILL,
        backgroundColor: "#999999",
        id: "__alloyId1287"
    });
    $.__views.superScroll.add($.__views.__alloyId1287);
    $.__views.lookContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        left: "15dp",
        right: "15dp",
        id: "lookContainer"
    });
    $.__views.superScroll.add($.__views.lookContainer);
    $.__views.__alloyId1288 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: "40dp",
        id: "__alloyId1288"
    });
    $.__views.lookContainer.add($.__views.__alloyId1288);
    $.__views.__alloyId1289 = Ti.UI.createLabel({
        font: {
            fontSize: "10dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#333333",
        left: "0dp",
        text: "LOOKS IN YOUR STYLE",
        id: "__alloyId1289"
    });
    $.__views.__alloyId1288.add($.__views.__alloyId1289);
    $.__views.__alloyId1290 = Ti.UI.createLabel({
        font: {
            fontSize: "9dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        right: "20dp",
        text: "VIEW ALL",
        height: Titanium.UI.FILL,
        id: "__alloyId1290"
    });
    $.__views.__alloyId1288.add($.__views.__alloyId1290);
    viewAllStyle ? $.addListener($.__views.__alloyId1290, "click", viewAllStyle) : __defers["$.__views.__alloyId1290!click!viewAllStyle"] = true;
    $.__views.__alloyId1291 = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "12dp"
        },
        color: "#e65e48",
        text: "",
        height: Titanium.UI.FILL,
        right: "0dp",
        width: "20dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        id: "__alloyId1291"
    });
    $.__views.__alloyId1288.add($.__views.__alloyId1291);
    viewAllStyle ? $.addListener($.__views.__alloyId1291, "click", viewAllStyle) : __defers["$.__views.__alloyId1291!click!viewAllStyle"] = true;
    $.__views.__alloyId1293 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "1dp",
        id: "__alloyId1293"
    });
    $.__views.curtainsLoadMore = Ti.UI.createLabel({
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        top: "20dp",
        bottom: "20dp",
        width: Titanium.UI.FILL,
        height: "35dp",
        font: {
            fontSize: "12dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        backgroundColor: "#f4f4f4",
        text: "LOAD MORE",
        id: "curtainsLoadMore"
    });
    $.__views.__alloyId1293.add($.__views.curtainsLoadMore);
    loadMoreStyle ? $.addListener($.__views.curtainsLoadMore, "click", loadMoreStyle) : __defers["$.__views.curtainsLoadMore!click!loadMoreStyle"] = true;
    $.__views.loader = Ti.UI.createActivityIndicator({
        style: Ti.UI.ActivityIndicatorStyle.PLAIN,
        color: "#333333",
        top: "20dp",
        bottom: "20dp",
        width: Titanium.UI.FILL,
        height: "35dp",
        font: {
            fontSize: "12dp"
        },
        id: "loader",
        message: " Loading..."
    });
    $.__views.__alloyId1293.add($.__views.loader);
    var __alloyId1301 = {};
    Alloy.createController("listTemplate", {
        __parentSymbol: __parentSymbol,
        __itemTemplate: __alloyId1301
    });
    $.__views.mainSection = Ti.UI.createListSection({
        id: "mainSection"
    });
    var __alloyId1304 = [];
    __alloyId1304.push($.__views.mainSection);
    $.__views.listView = Ti.UI.createListView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        sections: __alloyId1304,
        templates: __alloyId1301,
        footerView: $.__views.__alloyId1293,
        id: "listView",
        defaultItemTemplate: "listTypeTemplate"
    });
    $.__views.lookContainer.add($.__views.listView);
    looksListEvent ? $.addListener($.__views.listView, "itemclick", looksListEvent) : __defers["$.__views.listView!itemclick!looksListEvent"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.header.init({
        title: "QUIZ RESULT"
    });
    $.header.getView("menuButton").addEventListener("click", goToBack);
    var response = args.response;
    $.quizImage.setImage(response.data.style_image);
    $.collectionNameLbl.setText(response.data.style.toUpperCase());
    $.quizDescription.setText(response.data.style_description);
    var _looksList = response.data.looks;
    var pageCount = response.data.looks_count;
    var lookCount = _looksList.length;
    pageinationCount = 1;
    var currentPage = 2, currentStyle = response.data.style;
    var size = 2;
    var gridDataArr = [];
    var myDataArrCounter = 0;
    for (var i = 0; i < _looksList.length; i += size) {
        var smallPaginationArray = _looksList.slice(i, i + size);
        gridDataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallPaginationArray));
        myDataArrCounter++;
    }
    var subGridData = "{" + gridDataArr + "}";
    var finalGridData = JSON.parse(subGridData);
    var data = finalGridData;
    var listData = [];
    if (0 === _looksList.length) {
        $.lookContainer.removeAllChildren();
        $.quizResults.remove($.lookContainer);
        setTimeout(function() {
            $.superScroll.scrollTo(0, 0);
        }, 500);
    } else {
        looping_value();
        setTimeout(function() {
            $.superScroll.scrollTo(0, 0);
        }, 500);
    }
    touchEffect.createTouchEffect($.tourDeQuiz, "#a6ffffff", "#ffffff");
    $.tourDeQuiz.addEventListener("click", function(e) {
        Alloy.Globals.popWindowInNav();
        Alloy.Globals.addWindowInNav("styleDiscovery");
        $.quizResults.close();
    });
    __defers["$.__views.quizResults!close!cleanUp"] && $.addListener($.__views.quizResults, "close", cleanUp);
    __defers["$.__views.quizResults!focus!updateCount"] && $.addListener($.__views.quizResults, "focus", updateCount);
    __defers["$.__views.__alloyId1290!click!viewAllStyle"] && $.addListener($.__views.__alloyId1290, "click", viewAllStyle);
    __defers["$.__views.__alloyId1291!click!viewAllStyle"] && $.addListener($.__views.__alloyId1291, "click", viewAllStyle);
    __defers["$.__views.curtainsLoadMore!click!loadMoreStyle"] && $.addListener($.__views.curtainsLoadMore, "click", loadMoreStyle);
    __defers["$.__views.listView!itemclick!looksListEvent"] && $.addListener($.__views.listView, "itemclick", looksListEvent);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;