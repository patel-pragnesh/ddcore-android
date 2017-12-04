function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function filterData(_looksList) {
        size = 2;
        gridDataArr = [];
        var myDataArrCounter = 0;
        for (var i = 0; i < _looksList.length; i += size) {
            var smallPaginationArray = _looksList.slice(i, i + size);
            gridDataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallPaginationArray));
            myDataArrCounter++;
        }
        var subGridData = "{" + gridDataArr + "}";
        var finalGridData = JSON.parse(subGridData);
        data = finalGridData;
        setLooks(data);
    }
    function init() {
        isLazyLoad = false;
        pageCount = 0, lookCount = 0;
        pageinationCount++;
        size = 2;
        gridDataArr = [];
        myDataArrCounter = 0;
        data = null;
        listData = [];
        $.curtainsSection.setItems([]);
        getQuizResult();
    }
    function getQuizResult() {
        showFullLoader(container);
        var requestMethod = Alloy.Globals.commonUrl.quizResult;
        Alloy.Globals.webServiceCall(requestMethod, {}, _getQuizResultSuccessCallback, _getQuizResultErrorCallback, "POST", container);
    }
    function _getQuizResultSuccessCallback(response) {
        updateStyle(response);
        hideLoader();
        hideFullLoader();
    }
    function _getQuizResultErrorCallback(response) {
        hideLoader();
        hideFullLoader();
    }
    function updateStyle(response) {
        try {
            var data = response.data;
            pageCount = response.data.looks_count;
            lookCount = response.data.looks.length;
            if (null === data.style) {
                $.mystyle.remove($.collectionContainer);
                $.take_quiz_btn.setTop("50%");
            } else {
                $.mystyle.add($.collectionContainer);
                $.take_quiz_btn.setTop("5%");
                $.take_quiz_btn.setText("TAKE QUIZ AGAIN");
                args.styleBgContainer.setImage(encodeURI(data.style_image));
                args.styleBgContainer.styleBg = data.style_image;
                $.styleHeader_lbl.setText("Your style based on your last Quiz Result");
                $.styleName_lbl.setText(data.style.toUpperCase());
                $.styleValue_lbl.setText(data.style_content);
                if (0 != data.looks.length) {
                    $.loadMore.setVisible(true);
                    $.loadMore.setTouchEnabled(true);
                    filterData(data.looks);
                } else $.mystyle.remove($.collectionContainer);
            }
            hideLoader();
            hideFullLoader();
        } catch (exp) {
            Ti.API.info("styles exception-->" + exp.message);
        }
    }
    function setLooks(_data) {
        try {
            listData = [];
            _.each(_data, function(value, k) {
                var image1 = "", collectionId1 = "", collectionName1 = "", gridCart1 = "", gridWhereToBuy1 = "", gridWish1 = "";
                gridShare1 = "", productSize1 = "", shareUrl1 = "";
                var image2 = "", collectionId2 = "", collectionName2 = "", gridCart2 = "", gridWhereToBuy2 = "", gridWish2 = "";
                gridShare2 = "", productSize2 = "", shareUrl2 = "";
                var imageContainer1 = "#ffffff";
                var logoText1 = "";
                var imageContainer2 = "#ffffff";
                var logoText2 = "";
                if (value[0]) {
                    imageContainer1 = "#eeece7";
                    image1 = value[0].profile_image;
                    logoText1 = isNullVal(image1) ? Alloy.Globals.icon.logo : "";
                    collectionId1 = value[0].looks_id;
                    collectionName1 = value[0].looks_name;
                    gridCart1 = "";
                    gridWhereToBuy1 = "Where to buy";
                    gridWish1 = Alloy.Globals.icon.shortlist;
                    gridShare1 = Alloy.Globals.icon.share;
                    shareUrl1 = value[0].url;
                }
                if (value[1]) {
                    imageContainer2 = "#eeece7";
                    image2 = value[1].profile_image;
                    logoText2 = isNullVal(image2) ? Alloy.Globals.icon.logo : "";
                    collectionId2 = value[1].looks_id;
                    collectionName2 = value[1].looks_name;
                    gridCart2 = "";
                    gridWhereToBuy2 = "Where to buy";
                    gridWish2 = Alloy.Globals.icon.shortlist;
                    gridShare2 = Alloy.Globals.icon.share;
                    shareUrl2 = value[1].url;
                }
                listData.push({
                    properties: {},
                    template: "gridTemplate",
                    gridProductImage1: {
                        image: encodeURI(image1),
                        collectionId: collectionId1,
                        collectionName: collectionName1,
                        backgroundColor: imageContainer1
                    },
                    gridProductImage2: {
                        image: encodeURI(image2),
                        collectionId: collectionId2,
                        collectionName: collectionName2,
                        backgroundColor: imageContainer2
                    },
                    gridProductname1: {
                        text: collectionName1,
                        collectionId: collectionId1,
                        collectionName: collectionName1
                    },
                    gridProductname2: {
                        text: collectionName2,
                        collectionId: collectionId2,
                        collectionName: collectionName2
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
                        text: gridWhereToBuy1
                    },
                    gridWhereToBuy2: {
                        text: gridWhereToBuy2
                    },
                    gridWish1: {
                        text: gridWish1,
                        collectionId: collectionId1,
                        collectionName: collectionName1
                    },
                    gridWish2: {
                        text: gridWish2,
                        collectionId: collectionId2,
                        collectionName: collectionName2
                    },
                    gridShare1: {
                        text: gridShare1,
                        shareUrl: shareUrl1
                    },
                    gridShare2: {
                        text: gridShare2,
                        shareUrl: shareUrl2
                    },
                    productSize1: {
                        text: productSize1.toUpperCase(),
                        font: {
                            fontSize: 0
                        }
                    },
                    productSize2: {
                        text: productSize2.toUpperCase(),
                        font: {
                            fontSize: 0
                        }
                    },
                    gridLogo0: {
                        text: logoText1,
                        zIndex: 10
                    },
                    gridLogo: {
                        text: logoText2,
                        zIndex: 10
                    },
                    outOfStock1: {
                        visible: false,
                        collectionId: collectionId1
                    },
                    outOfStock2: {
                        visible: false,
                        collectionId: collectionId2
                    }
                });
            });
            $.curtainsSection.appendItems(listData);
            currentPage++;
            if (pageCount === lookCount) {
                $.loadMore.text = "VIEW ALL";
                $.loadMore.color = Alloy.Globals.labelTitleColor;
            } else if (3 == pageinationCount) {
                $.loadMore.text = "VIEW ALL";
                $.loadMore.color = Alloy.Globals.labelTitleColor;
            }
            if (0 != listData.length) {
                var numberOfRow = $.curtainsSection.getItems().length;
                var listViewHeight = (Alloy.Globals.imageWidth + 63) * numberOfRow + 66;
                $.curtainsListView.setHeight(listViewHeight);
            }
        } catch (exp) {
            Ti.API.info("expcetion-->" + exp.message);
        }
    }
    function takeQuiz() {
        var obj = {
            init: init,
            myStyle: true,
            container: $.mystyle
        };
        Alloy.Globals.addWindowInNav("styleDiscovery", obj);
        $.mystyle.scrollTo(0, 0);
    }
    function looksListEvent(e) {
        if (e.bindId) {
            var bind = e.bindId;
            var index = e.itemIndex;
            var a = e.section.items[index];
            if ("gridWish1" == e.bindId || "gridWish2" == e.bindId) {
                if ("" != a[bind].collectionId) {
                    var collectionData = {
                        collectionName: a[bind].collectionName,
                        collectionId: a[bind].collectionId,
                        type: "shopByLook",
                        mainWindow: mainWindow
                    };
                    addShortlist = Alloy.createController("addToShortlist", collectionData).getView();
                    addShortlist.zIndex = 11;
                    mainWindow.add(addShortlist);
                    hideShowView(addShortlist);
                }
            } else if ("gridProductImage1" == e.bindId || "gridProductImage2" == e.bindId) {
                if ("" != a[bind].collectionId) {
                    var CollectionData = {
                        type: "shopByLook",
                        id: a[bind].collectionId
                    };
                    Alloy.Globals.addWindowInNav("productDetails", CollectionData);
                }
            } else "gridWhereToBuy1" == e.bindId || "gridWhereToBuy2" == e.bindId ? "" != a[bind].text && Alloy.Globals.addWindowInNav("findStore") : ("gridShare1" == e.bindId || "gridShare2" == e.bindId) && "" != a[bind].text && "" != e.bindId && shareImage(a[bind].shareUrl);
        }
    }
    function viewAllStyle() {
        var shopByLookData = {
            type: "shopByLook",
            style: $.styleName_lbl.getText(),
            windowNav: "myAccount"
        };
        Alloy.Globals.addWindowInNav("productListing", shopByLookData);
    }
    function loadMoreStyle() {
        if ("LOAD MORE" == $.loadMore.getText()) {
            $.loader.show();
            $.loadMore.setVisible(false);
            var requestMethod = Alloy.Globals.commonUrl.allStyles;
            var param = {
                style: $.styleName_lbl.getText(),
                current_page: currentPage,
                page_size: 6
            };
            var requestParam = JSON.stringify(param);
            Alloy.Globals.webServiceCall(requestMethod, requestParam, _loadMoreStyleSuccessCallback, _loadMoreStyleErrorCallback, "POST", args.container);
        } else viewAllStyle();
    }
    function _loadMoreStyleSuccessCallback(response) {
        pageinationCount++;
        hideLoader();
        hideFullLoader();
        $.loader.hide();
        $.loadMore.setVisible(true);
        if (0 != response.data.looks.length) {
            lookCount += response.data.looks.length;
            pageCount = response.data.looks_count;
            filterData(response.data.looks);
        } else showAlert(args.container, "No More Looks");
    }
    function _loadMoreStyleErrorCallback(response) {
        $.loader.hide();
        $.loadMore.setVisible(true);
        hideLoader();
        hideFullLoader();
        showAlert(args.container, response.message);
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "mystyle";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.mystyle = Ti.UI.createScrollView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        top: "0",
        left: "0",
        scrollType: "vertical",
        layout: "vertical",
        id: "mystyle"
    });
    $.__views.mystyle && $.addTopLevelView($.__views.mystyle);
    $.__views.__alloyId1060 = Ti.UI.createView({
        top: "50dp",
        width: 50,
        height: "1dp",
        backgroundColor: "#dcdcdc",
        id: "__alloyId1060"
    });
    $.__views.mystyle.add($.__views.__alloyId1060);
    $.__views.styleHeader_lbl = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_medium_bt-webfont",
            fontSize: "12dp"
        },
        top: "15dp",
        color: Alloy.Globals.labelTitleColor,
        text: "DISCOVER YOUR",
        id: "styleHeader_lbl"
    });
    $.__views.mystyle.add($.__views.styleHeader_lbl);
    $.__views.styleName_lbl = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "18dp"
        },
        top: "5dp",
        color: "#000",
        text: "STYLE",
        id: "styleName_lbl"
    });
    $.__views.mystyle.add($.__views.styleName_lbl);
    $.__views.shareStyle = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "16dp"
        },
        text: Alloy.Globals.icon.share,
        color: "#a6a6a6",
        top: "-16dp",
        right: "10%",
        id: "shareStyle",
        visible: false
    });
    $.__views.mystyle.add($.__views.shareStyle);
    $.__views.styleValue_lbl = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "12dp"
        },
        top: "5dp",
        left: "5%",
        right: "5%",
        color: "#a0a0a0",
        width: Titanium.UI.FILL,
        text: "Make shopping more fun by exploring designs that truly fit your taste",
        id: "styleValue_lbl"
    });
    $.__views.mystyle.add($.__views.styleValue_lbl);
    $.__views.take_quiz_btn = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_medium_bt-webfont",
            fontSize: "12dp"
        },
        top: "5dp",
        width: "70%",
        height: "40dp",
        backgroundColor: "#7b7979",
        color: "#fff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "TAKE THE QUIZ",
        id: "take_quiz_btn"
    });
    $.__views.mystyle.add($.__views.take_quiz_btn);
    takeQuiz ? $.addListener($.__views.take_quiz_btn, "click", takeQuiz) : __defers["$.__views.take_quiz_btn!click!takeQuiz"] = true;
    $.__views.collectionContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "collectionContainer"
    });
    $.__views.mystyle.add($.__views.collectionContainer);
    $.__views.__alloyId1061 = Ti.UI.createView({
        top: "50dp",
        width: "90%",
        height: "1dp",
        backgroundColor: "#dcdcdc",
        id: "__alloyId1061"
    });
    $.__views.collectionContainer.add($.__views.__alloyId1061);
    $.__views.__alloyId1062 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "5dp",
        id: "__alloyId1062"
    });
    $.__views.collectionContainer.add($.__views.__alloyId1062);
    $.__views.style_lbl = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_medium_bt-webfont",
            fontSize: "10dp"
        },
        color: "#000",
        left: "5%",
        top: "5dp",
        text: "LOOKS IN YOUR STYLE",
        id: "style_lbl"
    });
    $.__views.__alloyId1062.add($.__views.style_lbl);
    $.__views.viewall_btn = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "10dp"
        },
        right: "5%",
        color: Alloy.Globals.labelTitleColor,
        top: "5dp",
        text: "VIEW ALL ",
        id: "viewall_btn"
    });
    $.__views.__alloyId1062.add($.__views.viewall_btn);
    viewAllStyle ? $.addListener($.__views.viewall_btn, "click", viewAllStyle) : __defers["$.__views.viewall_btn!click!viewAllStyle"] = true;
    $.__views.__alloyId1064 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: 5,
        id: "__alloyId1064"
    });
    $.__views.loadMore = Ti.UI.createLabel({
        top: "5dp",
        backgroundColor: "#f4f4f4",
        color: "#333333",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        width: "90%",
        bottom: "10dp",
        height: "40dp",
        font: {
            fontSize: "12dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        text: "LOAD MORE",
        id: "loadMore"
    });
    $.__views.__alloyId1064.add($.__views.loadMore);
    loadMoreStyle ? $.addListener($.__views.loadMore, "click", loadMoreStyle) : __defers["$.__views.loadMore!click!loadMoreStyle"] = true;
    $.__views.loader = Ti.UI.createActivityIndicator({
        style: Ti.UI.ActivityIndicatorStyle.PLAIN,
        color: "#333333",
        top: "5dp",
        bottom: "10dp",
        width: Titanium.UI.FILL,
        height: "35dp",
        font: {
            fontSize: "12dp"
        },
        id: "loader",
        message: " Loading..."
    });
    $.__views.__alloyId1064.add($.__views.loader);
    var __alloyId1072 = {};
    Alloy.createController("listTemplate", {
        __parentSymbol: __parentSymbol,
        __itemTemplate: __alloyId1072
    });
    $.__views.curtainsSection = Ti.UI.createListSection({
        id: "curtainsSection"
    });
    var __alloyId1075 = [];
    __alloyId1075.push($.__views.curtainsSection);
    $.__views.curtainsListView = Ti.UI.createListView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        sections: __alloyId1075,
        templates: __alloyId1072,
        footerView: $.__views.__alloyId1064,
        top: "5dp",
        id: "curtainsListView",
        defaultItemTemplate: "gridTemplate"
    });
    $.__views.collectionContainer.add($.__views.curtainsListView);
    looksListEvent ? $.addListener($.__views.curtainsListView, "itemclick", looksListEvent) : __defers["$.__views.curtainsListView!itemclick!looksListEvent"] = true;
    $.__views.__alloyId1076 = Ti.UI.createLabel({
        height: 10,
        id: "__alloyId1076"
    });
    $.__views.collectionContainer.add($.__views.__alloyId1076);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var isLazyLoad = false;
    var container = args.container;
    var mainWindow = args.mainWindow;
    var pageCount = 0, lookCount = 0;
    pageinationCount = 0;
    currentPage = 1;
    var size = 2;
    var gridDataArr = [];
    var myDataArrCounter = 0;
    var data = null;
    var listData = [];
    touchEffect.createTouchEffect($.viewall_btn, "#a6ffffff", Alloy.Globals.labelTitleColor);
    init();
    __defers["$.__views.take_quiz_btn!click!takeQuiz"] && $.addListener($.__views.take_quiz_btn, "click", takeQuiz);
    __defers["$.__views.viewall_btn!click!viewAllStyle"] && $.addListener($.__views.viewall_btn, "click", viewAllStyle);
    __defers["$.__views.loadMore!click!loadMoreStyle"] && $.addListener($.__views.loadMore, "click", loadMoreStyle);
    __defers["$.__views.curtainsListView!itemclick!looksListEvent"] && $.addListener($.__views.curtainsListView, "itemclick", looksListEvent);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;