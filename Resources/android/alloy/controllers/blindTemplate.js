function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function init() {
        var data = response.product_data;
        var categoryName = response.categoryName.toUpperCase();
        $.blinds1NameLbl.setText(categoryName);
        if (0 == data.length) {
            blinds1ToAdd = emptyData();
            $.section.appendItems(blinds1ToAdd);
            $.blinds1ViewAllContainer.visible = false;
            $.blinds1LoadMore.top = "0dp";
            $.blinds1LoadMore.height = "0dp";
        } else if (data.length > 0) {
            var blinds1 = data;
            var size = 2;
            var blinds1DataArr = [];
            $.blinds1LoadMoreLbl.categoryName = categoryName;
            $.blinds1LoadMoreLbl.total_count = response.total_count;
            $.blinds1LoadMoreLbl.categoryId = response.categoryId;
            $.blinds1LoadMoreLbl.listItemCount = data.length;
            if (data.length == response.total_count) {
                $.blinds1LoadMoreLbl.setColor("#e65e48");
                $.blinds1LoadMoreLbl.setText("VIEW ALL");
            }
            var _myDataArrCounter = 0;
            for (var i = 0; i < blinds1.length; i += size) {
                var smallblinds1Array = blinds1.slice(i, i + size);
                blinds1DataArr.push('"data' + _myDataArrCounter + '":' + JSON.stringify(smallblinds1Array));
                _myDataArrCounter++;
            }
            blinds1ToAdd = preprocessForListView(JSON.parse("{" + blinds1DataArr + "}"));
            $.section.appendItems(blinds1ToAdd);
            var numberOfRow = $.section.getItems().length;
            var listViewHeight = (Alloy.Globals.imageWidth + 63) * numberOfRow + 66;
            $.blinds1ListView.setHeight(listViewHeight);
        }
    }
    function preprocessForListView(rawData) {
        var categoryName = response.categoryName;
        return _.map(rawData, function(item) {
            if (item[0]) {
                if (true == item[0].wishlistItem) {
                    isSelected_0 = Alloy.Globals.icon.setShortlist;
                    wishIconColor_0 = "#e65e48";
                } else {
                    isSelected_0 = Alloy.Globals.icon.shortlist;
                    wishIconColor_0 = "#a6a6a6";
                }
                if (item[1]) if (true == item[1].wishlistItem) {
                    isSelected_1 = Alloy.Globals.icon.setShortlist;
                    wishIconColor_1 = "#e65e48";
                } else {
                    isSelected_1 = Alloy.Globals.icon.shortlist;
                    wishIconColor_1 = "#a6a6a6";
                } else isSelected_1 = "";
            }
            if (item[0]) {
                product_sku1 = item[0].product_sku;
                gridProductname1 = item[0].product_name;
                collectionId1 = item[0].product_id;
                collectionImage1 = encodeURI(item[0].image);
                gridWhereToBuy1 = Alloy.Globals.icon.currency + item[0].product_price;
                gridShare1 = Alloy.Globals.icon.share;
                gridWish1 = isSelected_0;
                gridCart1 = "";
                shareUrl1 = item[0].product_url;
            } else {
                product_sku1 = "";
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
                product_sku2 = item[1].product_sku;
                gridProductname2 = item[1].product_name;
                collectionId2 = item[1].product_id;
                collectionImage2 = encodeURI(item[1].image);
                gridWhereToBuy2 = Alloy.Globals.icon.currency + item[1].product_price;
                gridShare2 = Alloy.Globals.icon.share;
                gridWish2 = isSelected_1;
                gridCart2 = "";
                imageContainer = "#eeece7";
                shareUrl2 = item[1].product_url;
                logoText = "";
            } else {
                product_sku2 = "";
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
                    text: gridProductname1.toUpperCase(),
                    collectionId: collectionId1,
                    category: categoryName
                },
                gridProductname2: {
                    text: gridProductname2.toUpperCase(),
                    collectionId: collectionId2,
                    category: categoryName
                },
                gridCart1: {
                    text: gridCart1,
                    collectionId: collectionId1,
                    category: categoryName,
                    visible: "" != gridCart1
                },
                gridCart2: {
                    text: gridCart2,
                    collectionId: collectionId2,
                    category: categoryName,
                    visible: "" != gridCart2
                },
                gridShare1: {
                    collectionId: collectionId1,
                    text: gridShare1,
                    shareUrl: shareUrl1,
                    category: categoryName
                },
                gridShare2: {
                    collectionId: collectionId2,
                    text: gridShare2,
                    shareUrl: shareUrl2,
                    category: categoryName
                },
                gridWish1: {
                    collectionId: collectionId1,
                    iconValue: "",
                    text: gridWish1,
                    color: wishIconColor_0,
                    collectionName: gridProductname1,
                    category: categoryName,
                    product_sku: product_sku1
                },
                gridWish2: {
                    collectionId: collectionId2,
                    iconValue: "",
                    text: gridWish2,
                    color: wishIconColor_1,
                    collectionName: gridProductname2,
                    category: categoryName,
                    product_sku: product_sku2
                },
                gridProductImage1: {
                    image: collectionImage1,
                    collectionId: collectionId1,
                    category: categoryName
                },
                gridProductImage2: {
                    image: collectionImage2,
                    collectionId: collectionId2,
                    category: categoryName
                },
                gridWhereToBuy1: {
                    text: gridWhereToBuy1,
                    collectionId: collectionId1,
                    category: categoryName
                },
                gridWhereToBuy2: {
                    text: gridWhereToBuy2,
                    collectionId: collectionId2,
                    category: categoryName
                },
                productSize1: {
                    collectionId: collectionId1,
                    text: "",
                    height: "0",
                    category: categoryName
                },
                productSize2: {
                    collectionId: collectionId2,
                    text: "",
                    height: "0",
                    category: categoryName
                },
                imageContainer: {
                    backgroundColor: imageContainer,
                    category: categoryName
                },
                gridLogo: {
                    text: logoText,
                    category: categoryName
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
    }
    function loadMoreBlindCategory() {
        if ("VIEW ALL" == $.blinds1LoadMoreLbl.getText()) navigateToBlindViewAll(); else {
            $.blinds1LoadMoreLbl.hide();
            $.blinds1ActivityIndicator.show();
            var url = Alloy.Globals.commonUrl.ourrange;
            var data = {
                category: $.blinds1LoadMoreLbl.categoryName,
                categoryId: $.blinds1LoadMoreLbl.categoryId,
                sortby: "",
                pagination: {
                    page_no: pageNo + 1,
                    page_size: 6
                }
            };
            var requestParams = JSON.stringify(data);
            Alloy.Globals.webServiceCall(url, requestParams, _loadMoreSuccessCallback, _loadmoreErrorCallback, "POST", args.mainWindow);
        }
    }
    function _loadMoreSuccessCallback(response) {
        pageNo += 1;
        var data = response.data.product_data.product_listing;
        if (0 == data.length) {
            $.blinds1LoadMoreLbl.setColor("#e65e48");
            $.blinds1LoadMoreLbl.setText("VIEW ALL");
        } else if (data.length > 0) {
            var blinds1 = data;
            var size = 2;
            var blinds1DataArr = [];
            $.blinds1LoadMoreLbl.listItemCount = $.blinds1LoadMoreLbl.listItemCount + data.length;
            var numberOfRow = parseInt(data.length / 2);
            data.length % 2 && (numberOfRow += 1);
            var ListViewHeight = parseInt($.blinds1ListView.getHeight());
            var a = Alloy.Globals.imageWidth * numberOfRow;
            $.blinds1ListView.setHeight(ListViewHeight + a + 190 - 30);
            var _myDataArrCounter = 0;
            for (var i = 0; i < blinds1.length; i += size) {
                var smallblinds1Array = blinds1.slice(i, i + size);
                blinds1DataArr.push('"data' + _myDataArrCounter + '":' + JSON.stringify(smallblinds1Array));
                _myDataArrCounter++;
            }
            blinds1ToAdd = preprocessForListView(JSON.parse("{" + blinds1DataArr + "}"));
            $.section.appendItems(blinds1ToAdd);
            if ($.blinds1LoadMoreLbl.listItemCount == $.blinds1LoadMoreLbl.total_count || 3 == pageNo) {
                $.blinds1LoadMoreLbl.setColor("#e65e48");
                $.blinds1LoadMoreLbl.setText("VIEW ALL");
            }
        }
        $.blinds1LoadMoreLbl.show();
        $.blinds1ActivityIndicator.hide();
    }
    function _loadmoreErrorCallback(response) {
        $.blinds1LoadMoreLbl.show();
        $.blinds1ActivityIndicator.hide();
    }
    function navigateToBlindViewAll() {
        var collectionAllData = {
            wName: $.blinds1LoadMoreLbl.categoryName,
            categoryId: $.blinds1LoadMoreLbl.categoryId,
            type: "C_Product",
            categoryType: "blinds",
            categoryName: $.blinds1LoadMoreLbl.categoryName
        };
        Alloy.Globals.addWindowInNav("productListing", collectionAllData);
    }
    function blindsItemClick(productData) {
        try {
            if (!isNullVal(productData.bindId) && "message" != productData.bindId) {
                bind = productData.bindId;
                index = productData.itemIndex;
                itemSection = productData.section.items[index];
                if (!isNullVal(itemSection[bind].collectionId)) if ("gridWish1" == productData.bindId || "gridWish2" == productData.bindId) if (isNullVal(Ti.App.Properties.getString("access_token"))) Alloy.Globals.addWindowInNav("signIn", {
                    listObject: productData,
                    listViewReference: updateItemListClick
                }); else {
                    shortlistData = "";
                    if (!isNullVal(productData.bindId)) {
                        shortlistData = productData;
                        if ("" == itemSection[bind].text) {
                            gaShortlistProduct = {
                                name: itemSection[bind].collectionName,
                                sku: itemSection[bind].product_sku,
                                lostSale: false
                            };
                            itemSection[bind].text = "";
                            itemSection[bind].color = "#e65e48";
                            productData.section.updateItemAt(index, itemSection);
                            var url = Alloy.Globals.commonUrl.addToShortlist;
                            var data = {
                                product_id: itemSection[bind].collectionId
                            };
                            var requestParams = JSON.stringify(data);
                            Alloy.Globals.webServiceCall(url, requestParams, addToShortlistSuccessCallback, addToShortlistErrorCallback, "POST", args.mainWindow);
                        } else {
                            itemSection[bind].text = "";
                            itemSection[bind].color = "#a6a6a6";
                            productData.section.updateItemAt(index, itemSection);
                            var url = Alloy.Globals.commonUrl.removeShortlist;
                            var data = {
                                product_id: itemSection[bind].collectionId
                            };
                            var requestParams = JSON.stringify(data);
                            Alloy.Globals.webServiceCall(url, requestParams, removeShortlistProductSuccessCallback, removeShortlistProductErrorCallback, "POST", args.mainWindow);
                        }
                    }
                } else if ("gridShare1" == productData.bindId || "gridShare2" == productData.bindId) shareImage(itemSection[bind].shareUrl); else if ("message" != productData.bindId && !isNullVal(itemSection[bind].collectionId)) {
                    -1 != productData.bindId.toString().lastIndexOf("1") ? productData.bindId = "gridWish1" : -1 != productData.bindId.toString().lastIndexOf("2") && (productData.bindId = "gridWish2");
                    var pData = {
                        Productid: itemSection[bind].collectionId,
                        block: "blinds",
                        navigatedblockid: "",
                        type: "blinds",
                        listObject: productData,
                        listViewReference: addToShortlistCallback,
                        category: itemSection[bind].category
                    };
                    Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
                }
            }
        } catch (ex) {
            Ti.API.info("catch item click = " + ex.message);
        }
    }
    function addToShortlistCallback(e, productId) {
        try {
            Ti.API.info("else if" + e.bindId);
            var bind = e.bindId;
            var index = e.itemIndex;
            var a = e.section.items[index];
            if (!(isNullVal(e.bindId) || "message" == e.bindId || isNullVal(a[bind].collectionId) || "gridWish1" != e.bindId && "gridWish2" != e.bindId)) if ("add" == productId) {
                a[bind].text = "";
                a[bind].color = "#e65e48";
                e.section.updateItemAt(index, a);
            } else {
                a[bind].text = "";
                a[bind].color = "#a6a6a6";
                e.section.updateItemAt(index, a);
            }
        } catch (ex) {
            Ti.API.info("ex.message = " + ex.message);
        }
    }
    function addToShortlistSuccessCallback(response) {
        try {
            showAlert(args.mainWindow, response.message);
            googleAnalyticsShortlist(gaShortlistProduct, "ALL BLINDS");
        } catch (e) {
            Ti.API.info("catch = " + ex.message);
        }
    }
    function addToShortlistErrorCallback(response) {
        showAlert(args.mainWindow, response.message);
        var pbind = "", pindex = "", pitemSection = "";
        pbind = shortlistData.bindId;
        pindex = shortlistData.itemIndex;
        pitemSection = shortlistData.section.items[index];
        pitemSection[bind].text = "";
        pitemSection[bind].color = "#a6a6a6";
        shortlistData.section.updateItemAt(shortlistData.itemIndex, pitemSection);
    }
    function removeShortlistProductSuccessCallback(response) {
        try {
            showAlert(args.mainWindow, response.message);
        } catch (e) {
            Ti.API.info("catch = " + e.message);
        }
    }
    function removeShortlistProductErrorCallback(e) {
        showAlert($.allBlinds, e.message);
        var pbind = "", pindex = "", pitemSection = "";
        pbind = shortlistData.bindId;
        pindex = shortlistData.itemIndex;
        pitemSection = shortlistData.section.items[pindex];
        pitemSection[pbind].text = "";
        pitemSection[pbind].color = "#e65e48";
        shortlistData.section.updateItemAt(shortlistData.itemIndex, pitemSection);
    }
    function emptyData() {
        return [ {
            properties: {},
            template: "emptyTemplate",
            message: {
                text: "THERE ARE NO PRODUCTS IN THIS CATEGORY."
            }
        } ];
    }
    function updateItemListClick(e) {
        $.blinds1ListView.fireEvent("itemclick", e);
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "blindTemplate";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.mainContainer = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        top: "0dp",
        layout: "vertical",
        id: "mainContainer"
    });
    $.__views.mainContainer && $.addTopLevelView($.__views.mainContainer);
    $.__views.blinds1Container = Ti.UI.createView({
        top: "10dp",
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
    $.__views.blinds1ViewAllContainer = Ti.UI.createView({
        height: Titanium.UI.FILL,
        right: "0dp",
        width: "40%",
        id: "blinds1ViewAllContainer"
    });
    $.__views.blinds1Container.add($.__views.blinds1ViewAllContainer);
    navigateToBlindViewAll ? $.addListener($.__views.blinds1ViewAllContainer, "click", navigateToBlindViewAll) : __defers["$.__views.blinds1ViewAllContainer!click!navigateToBlindViewAll"] = true;
    $.__views.blinds1ViewAllLbl = Ti.UI.createLabel({
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
        id: "blinds1ViewAllLbl"
    });
    $.__views.blinds1ViewAllContainer.add($.__views.blinds1ViewAllLbl);
    $.__views.blinds1rightArrow = Ti.UI.createLabel({
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
        id: "blinds1rightArrow"
    });
    $.__views.blinds1ViewAllContainer.add($.__views.blinds1rightArrow);
    $.__views.__alloyId272 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId272"
    });
    $.__views.blinds1LoadMore = Ti.UI.createView({
        top: "13dp",
        width: Titanium.UI.FILL,
        height: "35dp",
        backgroundColor: "#f4f4f4",
        id: "blinds1LoadMore"
    });
    $.__views.__alloyId272.add($.__views.blinds1LoadMore);
    loadMoreBlindCategory ? $.addListener($.__views.blinds1LoadMore, "click", loadMoreBlindCategory) : __defers["$.__views.blinds1LoadMore!click!loadMoreBlindCategory"] = true;
    $.__views.blinds1LoadMoreLbl = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "LOAD MORE",
        id: "blinds1LoadMoreLbl"
    });
    $.__views.blinds1LoadMore.add($.__views.blinds1LoadMoreLbl);
    $.__views.blinds1ActivityIndicator = Ti.UI.createActivityIndicator({
        style: Ti.UI.ActivityIndicatorStyle.PLAIN,
        color: "#333333",
        id: "blinds1ActivityIndicator",
        message: " Loading..."
    });
    $.__views.blinds1LoadMore.add($.__views.blinds1ActivityIndicator);
    $.__views.__alloyId273 = Ti.UI.createView({
        width: "96%",
        backgroundColor: "#e6e6e6",
        height: "1dp",
        top: "20dp",
        id: "__alloyId273"
    });
    $.__views.__alloyId272.add($.__views.__alloyId273);
    var __alloyId281 = {};
    Alloy.createController("listTemplate", {
        __parentSymbol: __parentSymbol,
        __itemTemplate: __alloyId281
    });
    $.__views.section = Ti.UI.createListSection({
        id: "section"
    });
    var __alloyId284 = [];
    __alloyId284.push($.__views.section);
    $.__views.blinds1ListView = Ti.UI.createListView({
        sections: __alloyId284,
        templates: __alloyId281,
        footerView: $.__views.__alloyId272,
        id: "blinds1ListView",
        defaultItemTemplate: "gridTemplate"
    });
    $.__views.mainContainer.add($.__views.blinds1ListView);
    blindsItemClick ? $.addListener($.__views.blinds1ListView, "itemclick", blindsItemClick) : __defers["$.__views.blinds1ListView!itemclick!blindsItemClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = $.args;
    var response = args.response;
    var pageNo = 1;
    var isSelected_0, isSelected_1, wishIconColor_0, wishIconColor_1;
    init();
    __defers["$.__views.blinds1ViewAllContainer!click!navigateToBlindViewAll"] && $.addListener($.__views.blinds1ViewAllContainer, "click", navigateToBlindViewAll);
    __defers["$.__views.blinds1LoadMore!click!loadMoreBlindCategory"] && $.addListener($.__views.blinds1LoadMore, "click", loadMoreBlindCategory);
    __defers["$.__views.blinds1ListView!itemclick!blindsItemClick"] && $.addListener($.__views.blinds1ListView, "itemclick", blindsItemClick);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;