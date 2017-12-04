function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function hideOverFlowMenu(e) {
        Alloy.Globals.overFlowFlag && $.header.hideOverFlow();
    }
    function getAllCollection() {
        showLoader($.allCollections);
        var url = Alloy.Globals.commonUrl.getAllCollection;
        var data = {
            pagination: {
                UPHOLSTERY: {
                    page_no: upholsteryPage,
                    page_size: 6
                },
                CURTAIN: {
                    page_no: curtainPage,
                    page_size: 6
                }
            },
            sortby: ""
        };
        var requestParams = JSON.stringify(data);
        Alloy.Globals.webServiceCall(url, requestParams, allCollectionSuccessCallback, allCollectionErrorCallback, "POST", $.allCollections, true);
    }
    function emptyData() {
        return [ {
            properties: {},
            template: "emptyTemplate",
            message: {
                text: "THERE ARE NO COLLECTIONS IN THIS CATEGORY."
            }
        } ];
    }
    function allCollectionSuccessCallback(e) {
        try {
            var UPHOLSTERY = e.data.collection_data[0].product_data;
            var CURTAIN = e.data.collection_data[1].product_data;
            $.upholsteryNameLbl.text = e.data.collection_data[0].enduseName;
            $.curtainNameLbl.text = e.data.collection_data[1].enduseName;
            if (UPHOLSTERY.length > 0) {
                $.upholsteryListView.height = 3 * (Alloy.Globals.imageWidth + 63) + 56;
                upholsteryTotalCount = e.data.collection_data[0].total_count;
                upholsteryLoaddedCount = UPHOLSTERY.length;
                $.upholsteryLoadMoreLbl.categoryName = e.data.collection_data[0].enduseName;
                $.upholsteryViewAllLbl.categoryName = e.data.collection_data[0].enduseName;
                $.upholsteryViewAllContainer.categoryName = e.data.collection_data[0].enduseName;
                $.upholsteryrightArrow.categoryName = e.data.collection_data[0].enduseName;
            }
            if (6 >= upholsteryTotalCount) {
                $.upholsteryLoadMoreLbl.color = "#e65e48";
                $.upholsteryLoadMoreLbl.text = "VIEW ALL";
            }
            if (CURTAIN.length > 0) {
                $.curtainsListView.height = 3 * (Alloy.Globals.imageWidth + 63) + 56;
                curtainTotalCount = e.data.collection_data[1].total_count;
                curtainLoaddedCount = CURTAIN.length;
                $.curtainsLoadMoreLbl.categoryName = e.data.collection_data[1].enduseName;
                $.curtainsViewAllLbl.categoryName = e.data.collection_data[1].enduseName;
                $.curtainViewAllContainer.categoryName = e.data.collection_data[1].enduseName;
                $.curtainsrightArrow.categoryName = e.data.collection_data[1].enduseName;
            }
            if (6 >= curtainTotalCount) {
                $.curtainsLoadMoreLbl.color = "#e65e48";
                $.curtainsLoadMoreLbl.text = "VIEW ALL";
            }
            var size = 2;
            var upholsteryDataArr = [];
            var curtainDataArr = [];
            var myDataArrCounter = 0;
            for (var i = 0; 6 > i; i += size) {
                if (UPHOLSTERY.length > 0) {
                    var smallUpholsteryArray = UPHOLSTERY.slice(i, i + size);
                    upholsteryDataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallUpholsteryArray));
                }
                if (CURTAIN.length > 0) {
                    var smallCurtainArray = CURTAIN.slice(i, i + size);
                    curtainDataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallCurtainArray));
                }
                myDataArrCounter++;
            }
            upholsteryData = "{" + upholsteryDataArr + "}";
            curtainData = "{" + curtainDataArr + "}";
            var finalUpholsteryData = JSON.parse(upholsteryData);
            var finalCurtainData = JSON.parse(curtainData);
            if (UPHOLSTERY.length > 0) {
                var upholsteryToAdd = preprocessForListView(finalUpholsteryData, "UPHOLSTERY");
                $.upholsteryListView.sections[0].appendItems(upholsteryToAdd);
                upholsteryPage++;
            } else {
                var upholsteryToAdd = emptyData();
                $.upholsteryListView.sections[0].appendItems(upholsteryToAdd);
                $.upholsteryViewAllContainer.visible = false;
                $.upholsteryLoadMore.top = "0dp";
                $.upholsteryLoadMore.height = "0dp";
            }
            if (CURTAIN.length > 0) {
                var curtainToAdd = preprocessForListView(finalCurtainData, "CURTAIN");
                $.curtainsListView.sections[0].appendItems(curtainToAdd);
                curtainPage++;
            } else {
                var curtainToAdd = emptyData();
                $.curtainsListView.sections[0].appendItems(curtainToAdd);
                $.curtainViewAllContainer.visible = false;
                $.curtainsLoadMore.top = "0dp";
                $.curtainsLoadMore.height = "0dp";
            }
            hideLoader($.allCollections);
        } catch (ex) {
            hideLoader($.allCollections);
            Ti.API.info("catch ex = " + ex.message);
            showAlert($.allCollections, "Something went wrong...");
            setTimeout(function() {
                goToBack();
            }, 1e3);
        }
    }
    function allCollectionErrorCallback(e) {
        hideLoader($.allCollections);
        showAlert($.allCollections, e.message);
        goToBack();
    }
    function upholsteryDataFn(e) {
        if (upholsteryLoaddedCount != upholsteryTotalCount && e.source.categoryName && "18" != upholsteryLoaddedCount) {
            $.upholsteryLoadMoreLbl.text = "";
            $.upholsteryActivityIndicator.show();
            $.upholsteryLoadMore.touchEnabled = false;
            $.upholsteryLoadMoreLbl.touchEnabled = false;
            loadMoreData(e.source.categoryName, upholsteryPage, 6);
        } else if ("VIEW ALL" == $.upholsteryLoadMoreLbl.text) {
            $.upholsteryLoadMoreLbl.color = "#e65e48";
            collectionAllData = "";
            collectionAllData = {
                categoryName: e.source.categoryName,
                WindowName: e.source.categoryName,
                type: "collection",
                block: "collection"
            };
            Alloy.Globals.addWindowInNav("productListing", collectionAllData);
        } else {
            $.upholsteryLoadMoreLbl.color = "#e65e48";
            $.upholsteryLoadMoreLbl.text = "VIEW ALL";
        }
    }
    function curtainsDataFn(e) {
        if (curtainLoaddedCount != curtainTotalCount && e.source.categoryName && "18" != curtainLoaddedCount) {
            $.curtainsLoadMoreLbl.text = "";
            $.curtainsActivityIndicator.show();
            $.curtainsLoadMore.touchEnabled = false;
            loadMoreData(e.source.categoryName, curtainPage, 6);
        } else if ("VIEW ALL" == $.curtainsLoadMoreLbl.text) {
            $.curtainsLoadMoreLbl.color = "#e65e48";
            collectionAllData = "";
            collectionAllData = {
                categoryName: e.source.categoryName,
                WindowName: e.source.categoryName,
                type: "collection",
                block: "collection"
            };
            Alloy.Globals.addWindowInNav("productListing", collectionAllData);
        } else {
            $.curtainsLoadMoreLbl.color = "#e65e48";
            $.curtainsLoadMoreLbl.text = "VIEW ALL";
        }
    }
    function loadMoreData(name, pageNo, limit) {
        var url = Alloy.Globals.commonUrl.allCollectionPagination;
        var data = "";
        switch (name) {
          case "UPHOLSTERY":
            data = {
                collection_enduse: name,
                pagination: {
                    UPHOLSTERY: {
                        page_no: pageNo,
                        page_size: limit
                    }
                }
            };
            break;

          case "CURTAIN":
            data = {
                collection_enduse: name,
                pagination: {
                    CURTAIN: {
                        page_no: pageNo,
                        page_size: limit
                    }
                }
            };
        }
        var requestParams = JSON.stringify(data);
        Alloy.Globals.webServiceCall(url, requestParams, loadMoreSuccessCallback, loadmoreErrorCallback, "POST", $.allCollections, true);
    }
    function loadMoreSuccessCallback(e) {
        try {
            var enduseName = e.data.collection_data[0].enduseName;
            var paginationData = e.data.collection_data[0].product_data;
            var size = 2;
            var paginationDataArr = [];
            var myDataArrCounter = 0;
            for (var i = 0; i < paginationData.length; i += size) {
                var smallPaginationArray = paginationData.slice(i, i + size);
                paginationDataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallPaginationArray));
                myDataArrCounter++;
            }
            loadMorePaginationData = "{" + paginationDataArr + "}";
            var finalPaginationData = JSON.parse(loadMorePaginationData);
            if (!isNullVal(finalPaginationData)) switch (enduseName) {
              case "UPHOLSTERY":
                $.upholsteryLoadMoreLbl.text = "LOAD MORE";
                $.upholsteryActivityIndicator.hide();
                $.upholsteryLoadMore.touchEnabled = true;
                $.upholsteryLoadMoreLbl.touchEnabled = true;
                upholsteryLoaddedCount += paginationData.length;
                if (paginationData.length < 6) {
                    $.upholsteryLoadMoreLbl.color = "#e65e48";
                    $.upholsteryLoadMoreLbl.text = "VIEW ALL";
                } else if (18 == upholsteryLoaddedCount) {
                    $.upholsteryLoadMoreLbl.color = "#e65e48";
                    $.upholsteryLoadMoreLbl.text = "VIEW ALL";
                }
                var ListViewHeight = parseInt($.upholsteryListView.getHeight());
                var a = 3 * Alloy.Globals.imageWidth + 175;
                $.upholsteryListView.height = ListViewHeight + a;
                var dataToAdd = preprocessForListView(finalPaginationData, "UPHOLSTERY");
                $.upholsteryListView.sections[0].appendItems(dataToAdd);
                upholsteryPage++;
                break;

              case "CURTAIN":
                $.curtainsLoadMoreLbl.text = "LOAD MORE";
                $.curtainsActivityIndicator.hide();
                $.curtainsLoadMore.touchEnabled = true;
                curtainLoaddedCount += paginationData.length;
                if (paginationData.length < 6) {
                    $.curtainsLoadMoreLbl.color = "#e65e48";
                    $.curtainsLoadMoreLbl.text = "VIEW ALL";
                } else if (18 == curtainLoaddedCount) {
                    $.curtainsLoadMoreLbl.color = "#e65e48";
                    $.curtainsLoadMoreLbl.text = "VIEW ALL";
                }
                var ListViewHeight = parseInt($.curtainsListView.getHeight());
                var a = 3 * Alloy.Globals.imageWidth + 175;
                $.curtainsListView.height = ListViewHeight + a;
                var dataToAdd = preprocessForListView(finalPaginationData, "CURTAIN");
                $.curtainsListView.sections[0].appendItems(dataToAdd);
                curtainPage++;
            }
        } catch (e) {
            Ti.API.info("catch error = " + e.message);
        }
    }
    function loadmoreErrorCallback(e) {
        showAlert($.allCollections, e.message);
    }
    function categoryViewAll(e) {
        collectionAllData = "";
        if (!isNullVal(e.source.categoryName)) {
            collectionAllData = {
                categoryName: e.source.categoryName,
                WindowName: e.source.categoryName,
                type: "collection",
                block: "collection"
            };
            Alloy.Globals.addWindowInNav("productListing", collectionAllData);
        }
    }
    function addToShortlist(e) {
        try {
            if (!isNullVal(e.bindId) && "message" != e.bindId) {
                var bind = e.bindId;
                var index = e.itemIndex;
                var a = e.section.items[index];
                if ("gridWish1" == e.bindId || "gridWish2" == e.bindId) if (Ti.App.Properties.getString("access_token")) {
                    var collectionData = {
                        collectionName: a[bind].collectionName,
                        collectionId: a[bind].collectionId,
                        type: "collection"
                    };
                    addShortlist = Alloy.createController("addToShortlist", collectionData).getView();
                    $.allCollections.add(addShortlist);
                    hideShowView(addShortlist);
                } else Alloy.Globals.addWindowInNav("signIn", {
                    listObject: e,
                    listViewReference: addToShortlist
                }); else if ("gridWhereToBuy1" == e.bindId || "gridWhereToBuy2" == e.bindId) {
                    if (!isNullVal(a[bind].collectionId)) {
                        var gaLeadProductArray = {};
                        gaLeadProductArray = {
                            name: a[bind].product_name_ga || "NA",
                            sku: a[bind].collectionId
                        };
                        generateLead(gaLeadProductArray, "All Collection Page");
                    }
                    Alloy.Globals.addWindowInNav("findStore");
                } else if ("gridShare1" == e.bindId || "gridShare2" == e.bindId) shareImage(a[bind].shareUrl); else if ("message" != e.bindId) {
                    var CollectionData = {
                        type: "collection",
                        category: a[bind].category,
                        id: a[bind].collectionId
                    };
                    Alloy.Globals.addWindowInNav("productDetails", CollectionData);
                }
            }
        } catch (ex) {
            Ti.API.info("catch item click = " + ex.message);
        }
    }
    function goToBack() {
        if ("shortlist" == addShortlist.type) {
            hideShowView(addShortlist);
            addShortlist = "";
        } else {
            $.curtainsListView.removeEventListener("itemclick", addToShortlist);
            $.upholsteryListView.removeEventListener("itemclick", addToShortlist);
            $.collectionScroll.removeEventListener("click", hideOverFlowMenu);
            $.upholsteryLoadMore.removeEventListener("click", upholsteryDataFn);
            $.curtainsLoadMore.removeEventListener("click", curtainsDataFn);
            $.upholsteryViewAllContainer.removeEventListener("click", categoryViewAll);
            $.curtainViewAllContainer.removeEventListener("click", categoryViewAll);
            Alloy.Globals.popWindowInNav();
            $.allCollections.close();
        }
    }
    function destroyWindow(e) {
        $.removeListener();
        $.allCollections.remove($.collectionScroll);
        $.collectionScroll.removeAllChildren();
        $.destroy();
    }
    function updateCount() {
        $.header.updateCartCount();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "allCollections";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.allCollections = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        backgroundColor: "#ffffff",
        id: "allCollections"
    });
    $.__views.allCollections && $.addTopLevelView($.__views.allCollections);
    goToBack ? $.addListener($.__views.allCollections, "android:back", goToBack) : __defers["$.__views.allCollections!android:back!goToBack"] = true;
    updateCount ? $.addListener($.__views.allCollections, "focus", updateCount) : __defers["$.__views.allCollections!focus!updateCount"] = true;
    destroyWindow ? $.addListener($.__views.allCollections, "close", destroyWindow) : __defers["$.__views.allCollections!close!destroyWindow"] = true;
    $.__views.header = Alloy.createWidget("headerView", "widget", {
        id: "header",
        __parentSymbol: $.__views.allCollections
    });
    $.__views.header.setParent($.__views.allCollections);
    $.__views.collectionScroll = Ti.UI.createScrollView({
        width: Titanium.UI.FILL,
        left: "15dp",
        right: "15dp",
        layout: "vertical",
        top: "53",
        scrollType: "vertical",
        height: Titanium.UI.FILL,
        id: "collectionScroll"
    });
    $.__views.allCollections.add($.__views.collectionScroll);
    $.__views.__alloyId220 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        top: "0dp",
        layout: "vertical",
        id: "__alloyId220"
    });
    $.__views.collectionScroll.add($.__views.__alloyId220);
    $.__views.upholsteryContainer = Ti.UI.createView({
        top: "10dp",
        width: Titanium.UI.FILL,
        height: "20dp",
        id: "upholsteryContainer"
    });
    $.__views.__alloyId220.add($.__views.upholsteryContainer);
    $.__views.upholsteryNameLbl = Ti.UI.createLabel({
        font: {
            fontSize: "11dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#333333",
        left: "0dp",
        id: "upholsteryNameLbl"
    });
    $.__views.upholsteryContainer.add($.__views.upholsteryNameLbl);
    $.__views.upholsteryViewAllContainer = Ti.UI.createView({
        height: Titanium.UI.FILL,
        right: "0dp",
        width: "40%",
        id: "upholsteryViewAllContainer"
    });
    $.__views.upholsteryContainer.add($.__views.upholsteryViewAllContainer);
    $.__views.upholsteryViewAllLbl = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        font: {
            fontSize: "9dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        right: "20dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        text: "VIEW ALL",
        height: Titanium.UI.FILL,
        id: "upholsteryViewAllLbl"
    });
    $.__views.upholsteryViewAllContainer.add($.__views.upholsteryViewAllLbl);
    $.__views.upholsteryrightArrow = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "15dp"
        },
        color: "#e65e48",
        text: Alloy.Globals.icon.leftArrow,
        height: Titanium.UI.FILL,
        right: "0dp",
        width: "20dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        id: "upholsteryrightArrow"
    });
    $.__views.upholsteryViewAllContainer.add($.__views.upholsteryrightArrow);
    $.__views.__alloyId222 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId222"
    });
    $.__views.upholsteryLoadMore = Ti.UI.createView({
        top: "13dp",
        width: Titanium.UI.FILL,
        height: "35dp",
        backgroundColor: "#f4f4f4",
        id: "upholsteryLoadMore"
    });
    $.__views.__alloyId222.add($.__views.upholsteryLoadMore);
    $.__views.upholsteryLoadMoreLbl = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "LOAD MORE",
        id: "upholsteryLoadMoreLbl"
    });
    $.__views.upholsteryLoadMore.add($.__views.upholsteryLoadMoreLbl);
    $.__views.upholsteryActivityIndicator = Ti.UI.createActivityIndicator({
        style: Ti.UI.ActivityIndicatorStyle.PLAIN,
        color: "#333333",
        id: "upholsteryActivityIndicator",
        message: " Loading..."
    });
    $.__views.upholsteryLoadMore.add($.__views.upholsteryActivityIndicator);
    $.__views.__alloyId223 = Ti.UI.createView({
        width: "96%",
        backgroundColor: "#e6e6e6",
        height: "1dp",
        top: "20dp",
        id: "__alloyId223"
    });
    $.__views.__alloyId222.add($.__views.__alloyId223);
    var __alloyId231 = {};
    Alloy.createController("listTemplate", {
        __parentSymbol: __parentSymbol,
        __itemTemplate: __alloyId231
    });
    $.__views.upholsterySection = Ti.UI.createListSection({
        id: "upholsterySection"
    });
    var __alloyId234 = [];
    __alloyId234.push($.__views.upholsterySection);
    $.__views.upholsteryListView = Ti.UI.createListView({
        sections: __alloyId234,
        templates: __alloyId231,
        footerView: $.__views.__alloyId222,
        id: "upholsteryListView",
        defaultItemTemplate: "gridTemplate"
    });
    $.__views.__alloyId220.add($.__views.upholsteryListView);
    $.__views.__alloyId235 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        top: "0dp",
        layout: "vertical",
        id: "__alloyId235"
    });
    $.__views.collectionScroll.add($.__views.__alloyId235);
    $.__views.curtainsContainer = Ti.UI.createView({
        top: "10dp",
        width: Titanium.UI.FILL,
        height: "20dp",
        id: "curtainsContainer"
    });
    $.__views.__alloyId235.add($.__views.curtainsContainer);
    $.__views.curtainNameLbl = Ti.UI.createLabel({
        font: {
            fontSize: "11dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#333333",
        left: "0dp",
        id: "curtainNameLbl"
    });
    $.__views.curtainsContainer.add($.__views.curtainNameLbl);
    $.__views.curtainViewAllContainer = Ti.UI.createView({
        height: Titanium.UI.FILL,
        right: "0dp",
        width: "40%",
        id: "curtainViewAllContainer"
    });
    $.__views.curtainsContainer.add($.__views.curtainViewAllContainer);
    $.__views.curtainsViewAllLbl = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        font: {
            fontSize: "9dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        right: "20dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        text: "VIEW ALL",
        height: Titanium.UI.FILL,
        id: "curtainsViewAllLbl"
    });
    $.__views.curtainViewAllContainer.add($.__views.curtainsViewAllLbl);
    $.__views.curtainsrightArrow = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "15dp"
        },
        color: "#e65e48",
        text: Alloy.Globals.icon.leftArrow,
        height: Titanium.UI.FILL,
        right: "0dp",
        width: "20dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        id: "curtainsrightArrow"
    });
    $.__views.curtainViewAllContainer.add($.__views.curtainsrightArrow);
    $.__views.__alloyId237 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId237"
    });
    $.__views.curtainsLoadMore = Ti.UI.createView({
        top: "13dp",
        width: Titanium.UI.FILL,
        height: "35dp",
        backgroundColor: "#f4f4f4",
        id: "curtainsLoadMore"
    });
    $.__views.__alloyId237.add($.__views.curtainsLoadMore);
    $.__views.curtainsLoadMoreLbl = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "LOAD MORE",
        id: "curtainsLoadMoreLbl"
    });
    $.__views.curtainsLoadMore.add($.__views.curtainsLoadMoreLbl);
    $.__views.curtainsActivityIndicator = Ti.UI.createActivityIndicator({
        style: Ti.UI.ActivityIndicatorStyle.PLAIN,
        color: "#333333",
        id: "curtainsActivityIndicator",
        message: " Loading..."
    });
    $.__views.curtainsLoadMore.add($.__views.curtainsActivityIndicator);
    $.__views.__alloyId238 = Ti.UI.createView({
        width: "96%",
        backgroundColor: "#e6e6e6",
        height: "1dp",
        top: "20dp",
        id: "__alloyId238"
    });
    $.__views.__alloyId237.add($.__views.__alloyId238);
    var __alloyId246 = {};
    Alloy.createController("listTemplate", {
        __parentSymbol: __parentSymbol,
        __itemTemplate: __alloyId246
    });
    $.__views.curtainsSection = Ti.UI.createListSection({
        id: "curtainsSection"
    });
    var __alloyId249 = [];
    __alloyId249.push($.__views.curtainsSection);
    $.__views.curtainsListView = Ti.UI.createListView({
        sections: __alloyId249,
        templates: __alloyId246,
        footerView: $.__views.__alloyId237,
        id: "curtainsListView",
        defaultItemTemplate: "gridTemplate"
    });
    $.__views.__alloyId235.add($.__views.curtainsListView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var upholsteryPage = 1;
    var curtainPage = 1;
    var upholsteryTotalCount, curtainTotalCount, upholsteryLoaddedCount, curtainLoaddedCount, imageContainer, logoText;
    var addShortlist = "";
    var shareUrl1, shareUrl2;
    $.header.init({
        title: "ALL COLLECTIONS",
        passWindow: $.allCollections
    });
    touchEffect.createTouchEffect($.curtainsLoadMore, "#a6333333", "#333333");
    touchEffect.createTouchEffect($.curtainsViewAllLbl, "#a6e65e48", "#e65e48");
    touchEffect.createTouchEffect($.curtainsrightArrow, "#a6e65e48", "#e65e48");
    touchEffect.createTouchEffect($.upholsteryLoadMore, "#a6333333", "#333333");
    touchEffect.createTouchEffect($.upholsteryViewAllLbl, "#a6e65e48", "#e65e48");
    touchEffect.createTouchEffect($.upholsteryrightArrow, "#a6e65e48", "#e65e48");
    $.collectionScroll.addEventListener("click", hideOverFlowMenu);
    var preprocessForListView = function(rawData, categoryType) {
        Ti.API.info("categoryType-->" + categoryType);
        return _.map(rawData, function(item) {
            if (item[0]) {
                gridProductname1 = item[0].collection_name;
                collectionId1 = item[0].collection_id;
                collectionImage1 = encodeURI(item[0].image);
                gridWhereToBuy1 = "Where to buy";
                gridShare1 = Alloy.Globals.icon.share;
                gridWish1 = Alloy.Globals.icon.shortlist;
                gridCart1 = "";
                shareUrl1 = item[0].collection_url;
            } else {
                gridProductname1 = "";
                collectionId1 = "";
                collectionImage1 = "";
                gridWhereToBuy1 = "";
                gridCart1 = "";
                gridShare1 = "";
                gridWish1 = "";
                shareUrl1 = "";
            }
            if (item[1]) {
                gridProductname2 = item[1].collection_name;
                collectionId2 = item[1].collection_id;
                collectionImage2 = encodeURI(item[1].image);
                gridWhereToBuy2 = "Where to buy";
                gridShare2 = Alloy.Globals.icon.share;
                gridWish2 = Alloy.Globals.icon.shortlist;
                gridCart2 = "";
                imageContainer = "#eeece7";
                shareUrl2 = item[1].collection_url;
                logoText = "";
            } else {
                gridProductname2 = "";
                collectionId2 = "";
                collectionImage2 = "";
                gridWhereToBuy2 = "";
                gridCart2 = "";
                gridShare2 = "";
                gridWish2 = "";
                imageContainer = "#ffffff";
                logoText = "";
                shareUrl2 = "";
            }
            return {
                properties: {},
                template: "gridTemplate",
                gridProductname1: {
                    text: isNullVal(gridProductname1) ? gridProductname1 : gridProductname1.toUpperCase(),
                    collectionId: collectionId1,
                    category: categoryType
                },
                gridProductname2: {
                    text: isNullVal(gridProductname2) ? gridProductname2 : gridProductname2.toUpperCase(),
                    collectionId: collectionId2,
                    category: categoryType
                },
                gridCart1: {
                    text: gridCart1,
                    collectionId: collectionId1,
                    category: categoryType,
                    visible: "" != gridCart1
                },
                gridCart2: {
                    text: gridCart2,
                    collectionId: collectionId2,
                    category: categoryType,
                    visible: "" != gridCart2
                },
                gridShare1: {
                    collectionId: collectionId1,
                    text: gridShare1,
                    shareUrl: shareUrl1,
                    category: categoryType
                },
                gridShare2: {
                    collectionId: collectionId2,
                    text: gridShare2,
                    shareUrl: shareUrl2,
                    category: categoryType
                },
                gridWish1: {
                    collectionId: collectionId1,
                    iconValue: "",
                    text: gridWish1,
                    collectionName: gridProductname1,
                    category: categoryType
                },
                gridWish2: {
                    value: collectionId2,
                    collectionId: collectionId2,
                    iconValue: "",
                    text: gridWish2,
                    collectionName: gridProductname2,
                    category: categoryType
                },
                gridProductImage1: {
                    image: collectionImage1,
                    collectionId: collectionId1,
                    category: categoryType
                },
                gridProductImage2: {
                    image: collectionImage2,
                    collectionId: collectionId2,
                    category: categoryType
                },
                gridWhereToBuy1: {
                    text: gridWhereToBuy1,
                    collectionId: collectionId1,
                    category: categoryType,
                    product_name_ga: isNullVal(gridProductname1) ? gridProductname1 : gridProductname1.toUpperCase()
                },
                gridWhereToBuy2: {
                    text: gridWhereToBuy2,
                    collectionId: collectionId2,
                    category: categoryType,
                    product_name_ga: isNullVal(gridProductname2) ? gridProductname2 : gridProductname2.toUpperCase()
                },
                productSize1: {
                    collectionId: collectionId1,
                    text: "",
                    height: "0",
                    category: categoryType
                },
                productSize2: {
                    collectionId: collectionId2,
                    text: "",
                    height: "0",
                    category: categoryType
                },
                imageContainer: {
                    backgroundColor: imageContainer,
                    category: categoryType
                },
                gridLogo: {
                    text: logoText,
                    category: categoryType
                },
                outOfStock1: {
                    visible: false,
                    collectionId: collectionId1
                },
                outOfStock2: {
                    visible: false,
                    collectionId: collectionId2
                }
            };
        });
    };
    getAllCollection();
    $.upholsteryLoadMore.addEventListener("click", upholsteryDataFn);
    $.curtainsLoadMore.addEventListener("click", curtainsDataFn);
    $.upholsteryViewAllContainer.addEventListener("click", categoryViewAll);
    $.curtainViewAllContainer.addEventListener("click", categoryViewAll);
    $.upholsteryListView.addEventListener("itemclick", addToShortlist);
    $.curtainsListView.addEventListener("itemclick", addToShortlist);
    __defers["$.__views.allCollections!android:back!goToBack"] && $.addListener($.__views.allCollections, "android:back", goToBack);
    __defers["$.__views.allCollections!focus!updateCount"] && $.addListener($.__views.allCollections, "focus", updateCount);
    __defers["$.__views.allCollections!close!destroyWindow"] && $.addListener($.__views.allCollections, "close", destroyWindow);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;