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
        var data = null;
        data = response.product_data;
        var categoryName = response.categoryName.toUpperCase();
        $.estore1NameLbl.setText(categoryName);
        $.estore1ViewAllContainer.visible = true;
        $.estore1LoadMore.setTop("13dp");
        $.estore1LoadMore.setHeight("35dp");
        var estore1 = data;
        var size = 2;
        var estore1DataArr = [];
        $.estore1LoadMoreLbl.categoryName = categoryName;
        $.estore1LoadMoreLbl.total_count = response.total_count;
        $.estore1LoadMoreLbl.categoryId = response.categoryId;
        $.estore1LoadMoreLbl.listItemCount = data.length;
        if (data.length == response.total_count) {
            $.estore1LoadMoreLbl.setColor("#e65e48");
            $.estore1LoadMoreLbl.setText("VIEW ALL");
        }
        var _myDataArrCounter = 0;
        for (var i = 0; i < estore1.length; i += size) {
            var smallestore1Array = estore1.slice(i, i + size);
            estore1DataArr.push('"data' + _myDataArrCounter + '":' + JSON.stringify(smallestore1Array));
            _myDataArrCounter++;
        }
        estore1ToAdd = preprocessForListView(JSON.parse("{" + estore1DataArr + "}"));
        $.section.appendItems(estore1ToAdd);
        var numberOfRow = $.section.getItems().length;
        var listViewHeight = (Alloy.Globals.imageWidth + 63) * numberOfRow + 66;
        $.estore1ListView.setHeight(listViewHeight);
    }
    function preprocessForListView(rawData) {
        Ti.API.info("into preprocessForListView*** function");
        var product_sku1 = "", product_sku2 = "";
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
                item[0].in_stock ? outOfStock1 = false : outOfStock1 = true;
            }
            if (item[0]) {
                cartIconColor_0 = true == item[0].cartItem ? "#e65e48" : "#66000000";
                item[1] && (cartIconColor_1 = true == item[1].cartItem ? "#e65e48" : "#66000000");
            }
            if (item[0]) {
                product_sku1 = item[0].product_sku;
                gridProductname1 = item[0].product_name;
                collectionId1 = item[0].product_id;
                collectionImage1 = encodeURI(item[0].image);
                gridWhereToBuy1 = Alloy.Globals.icon.currency + item[0].product_price;
                gridCart1 = Alloy.Globals.icon.bag;
                gridShare1 = Alloy.Globals.icon.share;
                gridWish1 = isSelected_0;
                productFontSize1 = "9";
                productSize1 = item[0].product_size;
                shareUrl1 = item[0].product_url;
            } else {
                gridProductname1 = "";
                collectionId1 = "";
                collectionImage1 = "";
                gridWhereToBuy1 = "";
                gridCart1 = "";
                gridShare1 = "";
                gridWish1 = "";
                productSize1 = "";
                shareUrl1 = "";
                productFontSize1 = "0";
            }
            if (item[1]) {
                product_sku2 = item[1].product_sku;
                gridProductname2 = item[1].product_name;
                collectionId2 = item[1].product_id;
                collectionImage2 = encodeURI(item[1].image);
                gridWhereToBuy2 = Alloy.Globals.icon.currency + item[1].product_price;
                gridCart2 = Alloy.Globals.icon.bag;
                gridShare2 = Alloy.Globals.icon.share;
                gridWish2 = isSelected_1;
                productSize2 = item[1].product_size;
                productFontSize2 = "9";
                imageContainer = "#f4f4f4";
                logoText = "";
                shareUrl2 = item[1].product_url;
                item[1].in_stock ? outOfStock2 = false : outOfStock2 = true;
            } else {
                gridProductname2 = "";
                collectionId2 = "";
                collectionImage2 = "";
                gridWhereToBuy2 = "";
                gridCart2 = "";
                gridShare2 = "";
                gridWish2 = "";
                productFontSize1 = "0";
                productSize2 = "";
                imageContainer = "#ffffff";
                logoText = "";
                shareUrl2 = "";
            }
            return {
                properties: {},
                template: "gridTemplate",
                gridProductname1: {
                    text: isNullVal(gridProductname1) ? gridProductname1 : gridProductname1.toUpperCase(),
                    collectionId: collectionId1
                },
                gridProductname2: {
                    text: isNullVal(gridProductname2) ? gridProductname2 : gridProductname2.toUpperCase(),
                    collectionId: collectionId2
                },
                gridCart1: {
                    backgroundColor: cartIconColor_0,
                    color: "#fff",
                    text: gridCart1,
                    collectionId: collectionId1,
                    visible: "" != gridCart1,
                    visible: !outOfStock1,
                    collectionName: gridProductname1,
                    product_sku: product_sku1
                },
                gridCart2: {
                    text: gridCart2,
                    color: "#fff",
                    backgroundColor: cartIconColor_1,
                    collectionId: collectionId2,
                    visible: "" != gridCart2,
                    visible: !outOfStock2,
                    collectionName: gridProductname2,
                    product_sku: product_sku2
                },
                gridShare1: {
                    collectionId: collectionId1,
                    text: gridShare1,
                    shareUrl: shareUrl1
                },
                gridShare2: {
                    collectionId: collectionId2,
                    text: gridShare2,
                    shareUrl: shareUrl2
                },
                gridWish1: {
                    collectionId: collectionId1,
                    iconValue: "",
                    text: gridWish1,
                    color: wishIconColor_0,
                    collectionName: gridProductname1,
                    product_sku: product_sku1,
                    lost_sale: !!outOfStock1
                },
                gridWish2: {
                    collectionId: collectionId2,
                    iconValue: "",
                    text: gridWish2,
                    color: wishIconColor_1,
                    collectionName: gridProductname2,
                    product_sku: product_sku2,
                    lost_sale: !!outOfStock2
                },
                gridProductImage1: {
                    image: collectionImage1,
                    collectionId: collectionId1
                },
                gridProductImage2: {
                    image: collectionImage2,
                    collectionId: collectionId2
                },
                gridWhereToBuy1: {
                    text: gridWhereToBuy1,
                    collectionId: collectionId1
                },
                gridWhereToBuy2: {
                    text: gridWhereToBuy2,
                    collectionId: collectionId2
                },
                productSize1: {
                    collectionId: collectionId1,
                    text: "NA" == productSize1 ? "" : productSize1.toUpperCase(),
                    height: "NA" == productSize1 ? "0" : "9"
                },
                productSize2: {
                    collectionId: collectionId2,
                    text: "NA" == productSize2 ? "" : productSize2.toUpperCase(),
                    height: "NA" == productSize2 ? "0" : "9"
                },
                imageContainer: {
                    backgroundColor: imageContainer
                },
                outOfStock1: {
                    visible: outOfStock1,
                    collectionId: collectionId1
                },
                outOfStock2: {
                    visible: outOfStock2,
                    collectionId: collectionId2
                }
            };
        });
    }
    function loadMoreEshopCategory() {
        if ("VIEW ALL" == $.estore1LoadMoreLbl.getText()) navigateToEstoreViewAll(); else {
            Ti.API.info("$.estore1LoadMoreLbl.categoryName= " + $.estore1LoadMoreLbl.categoryName);
            Ti.API.info("$.estore1LoadMoreLbl.categoryId = " + $.estore1LoadMoreLbl.categoryId);
            $.estore1LoadMoreLbl.hide();
            $.estore1ActivityIndicator.show();
            var url = Alloy.Globals.commonUrl.ourrange;
            var data = {
                category: $.estore1LoadMoreLbl.categoryName,
                categoryId: $.estore1LoadMoreLbl.categoryId,
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
            $.estore1LoadMoreLbl.setColor("#e65e48");
            $.estore1LoadMoreLbl.setText("VIEW ALL");
        } else if (data.length > 0) {
            var estore1 = data;
            var size = 2;
            var estore1DataArr = [];
            $.estore1LoadMoreLbl.listItemCount = $.estore1LoadMoreLbl.listItemCount + data.length;
            var numberOfRow = parseInt(data.length / 2);
            data.length % 2 && (numberOfRow += 1);
            var ListViewHeight = parseInt($.estore1ListView.getHeight());
            var ListViewHeight = parseInt($.estore1ListView.getHeight());
            var a = 3 * (Alloy.Globals.imageWidth + 4) + 172;
            $.estore1ListView.height = ListViewHeight + a;
            var _myDataArrCounter = 0;
            for (var i = 0; i < estore1.length; i += size) {
                var smallestore1Array = estore1.slice(i, i + size);
                estore1DataArr.push('"data' + _myDataArrCounter + '":' + JSON.stringify(smallestore1Array));
                _myDataArrCounter++;
            }
            estore1ToAdd = preprocessForListView(JSON.parse("{" + estore1DataArr + "}"));
            $.section.appendItems(estore1ToAdd);
            if ($.estore1LoadMoreLbl.listItemCount == $.estore1LoadMoreLbl.total_count || 3 == pageNo) {
                $.estore1LoadMoreLbl.setColor("#e65e48");
                $.estore1LoadMoreLbl.setText("VIEW ALL");
            }
        }
        $.estore1LoadMoreLbl.show();
        $.estore1ActivityIndicator.hide();
    }
    function _loadmoreErrorCallback(response) {
        $.estore1LoadMoreLbl.show();
        $.estore1ActivityIndicator.hide();
    }
    function navigateToEstoreViewAll() {
        var collectionAllData = {
            wName: "",
            categoryId: $.estore1LoadMoreLbl.categoryId,
            type: "C_Product",
            categoryType: "shop",
            subTitle: "BED LINEN PRODUCTS",
            categoryName: "BED LINEN",
            category: "BED LINEN"
        };
        Alloy.Globals.addWindowInNav("productListing", collectionAllData);
    }
    function estoreItemClick(productData) {
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
                            gaShortlistProductArray = {
                                name: itemSection[bind].collectionName,
                                sku: itemSection[bind].product_sku,
                                lostSale: itemSection[bind].lost_sale
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
                } else if ("gridCart1" == productData.bindId || "gridCart2" == productData.bindId) if (Ti.App.Properties.getString("access_token")) {
                    if (itemSection[productData.bindId].visible) {
                        var shortlist_flag = null;
                        shortlist_flag = "gridCart1" == productData.bindId ? !("" != itemSection["gridWish1"].text) : !("" != itemSection["gridWish2"].text);
                        gaShortlistProduct = {};
                        gaShortlistProduct = {
                            name: itemSection[bind].collectionName,
                            sku: itemSection[bind].product_sku,
                            shortlistFlag: shortlist_flag
                        };
                        cartData = null;
                        cartData = productData;
                        var url = Alloy.Globals.commonUrl.addToCart;
                        var data = {
                            product_id: itemSection[bind].collectionId,
                            qty: 1
                        };
                        var requestParams = JSON.stringify(data);
                        Alloy.Globals.webServiceCall(url, requestParams, addToCartSuccessCallback, addToCartErrorCallback, "POST", $.eshop);
                    }
                } else Alloy.Globals.addWindowInNav("signIn", {
                    listObject: productData,
                    listViewReference: updateItemListClick
                }); else if ("gridShare1" == productData.bindId || "gridShare2" == productData.bindId) shareImage(itemSection[bind].shareUrl); else if ("message" != productData.bindId && !isNullVal(itemSection[bind].collectionId)) {
                    -1 != productData.bindId.toString().lastIndexOf("1") ? productData.bindId = "gridWish1" : -1 != productData.bindId.toString().lastIndexOf("2") && (productData.bindId = "gridWish2");
                    var pData = {
                        Productid: itemSection[bind].collectionId,
                        block: "shop",
                        product: "shopProduct",
                        listObject: productData,
                        listViewReference: addToCartCallback
                    };
                    Alloy.Globals.addWindowInNav("estoreDetails", pData);
                }
            }
        } catch (ex) {
            Ti.API.info("catch item click = " + ex.message);
        }
    }
    function addToCartCallback(e, productId) {
        try {
            Ti.API.info("else if" + e.bindId);
            var bind = e.bindId;
            var index = e.itemIndex;
            var a = e.section.items[index];
            if (!isNullVal(e.bindId) && "message" != e.bindId && !isNullVal(a[bind].collectionId)) if ("gridCart1" == e.bindId || "gridCart2" == e.bindId) {
                if ("gridTemplate" == activeTemplate && "#66000000" == a[bind].backgroundColor) {
                    a[bind].backgroundColor = "#e65e48";
                    a[bind].borderColor = "transparent";
                    e.section.updateItemAt(e.itemIndex, a);
                }
                if ("listTypeTemplate" == activeTemplate || "blockTypeTemplate" == activeTemplate) if ("#ffffff" == a[bind].color) {
                    a[bind].color = "#e65e48";
                    e.section.updateItemAt(e.itemIndex, a);
                } else if ("#a6a6a6" == a[bind].color) {
                    a[bind].color = "#e65e48";
                    e.section.updateItemAt(e.itemIndex, a);
                }
            } else if ("gridWish1" == e.bindId || "gridWish2" == e.bindId) if ("add" == productId) {
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
    function addToCartSuccessCallback(e) {
        try {
            var bind = cartData.bindId;
            var index = cartData.itemIndex;
            var a = cartData.section.items[index];
            googleAnalyticsBag(gaShortlistProduct);
            if ("#66000000" == a[bind].backgroundColor) {
                a[bind].backgroundColor = "#e65e48";
                cartData.section.updateItemAt(cartData.itemIndex, a);
            }
            Ti.App.Properties.setString("cartCount", e.data[0].cart_count);
            Ti.App.Properties.setString("quote_id", e.data[0].quote_id);
            args.updateCountFn("addTocart");
            showAlert(args.mainWindow, e.message);
        } catch (ex) {}
    }
    function addToCartErrorCallback(e) {
        showAlert(args.mainWindow, e.message);
    }
    function addToShortlistSuccessCallback(response) {
        try {
            showAlert(args.mainWindow, response.message);
            googleAnalyticsShortlist(gaShortlistProductArray, "ESTORE");
        } catch (e) {
            Ti.API.info("catch = " + e.message);
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
        showAlert(args.mainWindow, e.message);
        var pbind = "", pindex = "", pitemSection = "";
        pbind = shortlistData.bindId;
        pindex = shortlistData.itemIndex;
        pitemSection = shortlistData.section.items[pindex];
        pitemSection[pbind].text = "";
        pitemSection[pbind].color = "#e65e48";
        shortlistData.section.updateItemAt(shortlistData.itemIndex, pitemSection);
    }
    function updateItemListClick(e) {
        $.estore1ListView.fireEvent("itemclick", e);
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "eshopTemplate";
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
    $.__views.estore1Container = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: "40dp",
        id: "estore1Container"
    });
    $.__views.mainContainer.add($.__views.estore1Container);
    $.__views.estore1NameLbl = Ti.UI.createLabel({
        font: {
            fontSize: "11dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#333333",
        left: "0dp",
        id: "estore1NameLbl"
    });
    $.__views.estore1Container.add($.__views.estore1NameLbl);
    $.__views.estore1ViewAllContainer = Ti.UI.createView({
        height: Titanium.UI.FILL,
        right: "0dp",
        id: "estore1ViewAllContainer"
    });
    $.__views.estore1Container.add($.__views.estore1ViewAllContainer);
    navigateToEstoreViewAll ? $.addListener($.__views.estore1ViewAllContainer, "click", navigateToEstoreViewAll) : __defers["$.__views.estore1ViewAllContainer!click!navigateToEstoreViewAll"] = true;
    $.__views.estore1ViewAllLbl = Ti.UI.createLabel({
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
        id: "estore1ViewAllLbl"
    });
    $.__views.estore1ViewAllContainer.add($.__views.estore1ViewAllLbl);
    $.__views.estore1rightArrow = Ti.UI.createLabel({
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
        id: "estore1rightArrow"
    });
    $.__views.estore1ViewAllContainer.add($.__views.estore1rightArrow);
    $.__views.__alloyId366 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId366"
    });
    $.__views.estore1LoadMore = Ti.UI.createView({
        top: "20dp",
        width: Titanium.UI.FILL,
        height: "35dp",
        backgroundColor: "#f4f4f4",
        id: "estore1LoadMore"
    });
    $.__views.__alloyId366.add($.__views.estore1LoadMore);
    loadMoreEshopCategory ? $.addListener($.__views.estore1LoadMore, "click", loadMoreEshopCategory) : __defers["$.__views.estore1LoadMore!click!loadMoreEshopCategory"] = true;
    $.__views.estore1LoadMoreLbl = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "Futura Md BT"
        },
        color: "#333333",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "LOAD MORE",
        id: "estore1LoadMoreLbl"
    });
    $.__views.estore1LoadMore.add($.__views.estore1LoadMoreLbl);
    $.__views.estore1ActivityIndicator = Ti.UI.createActivityIndicator({
        font: {
            fontSize: "12dp",
            fontFamily: "Futura Md BT"
        },
        style: Titanium.UI.ActivityIndicatorStyle.DARK,
        color: "#333333",
        id: "estore1ActivityIndicator",
        message: " Loading..."
    });
    $.__views.estore1LoadMore.add($.__views.estore1ActivityIndicator);
    $.__views.__alloyId367 = Ti.UI.createView({
        width: "96%",
        backgroundColor: "#e6e6e6",
        height: "1dp",
        top: "20dp",
        id: "__alloyId367"
    });
    $.__views.__alloyId366.add($.__views.__alloyId367);
    var __alloyId375 = {};
    Alloy.createController("listTemplate", {
        __parentSymbol: __parentSymbol,
        __itemTemplate: __alloyId375
    });
    $.__views.section = Ti.UI.createListSection({
        id: "section"
    });
    var __alloyId378 = [];
    __alloyId378.push($.__views.section);
    $.__views.estore1ListView = Ti.UI.createListView({
        height: Titanium.UI.SIZE,
        canScroll: "false",
        separatorColor: "transparent",
        sections: __alloyId378,
        templates: __alloyId375,
        footerView: $.__views.__alloyId366,
        id: "estore1ListView",
        defaultItemTemplate: "gridTemplate"
    });
    $.__views.mainContainer.add($.__views.estore1ListView);
    estoreItemClick ? $.addListener($.__views.estore1ListView, "itemclick", estoreItemClick) : __defers["$.__views.estore1ListView!itemclick!estoreItemClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = $.args;
    var response = args.response;
    var pageNo = 1;
    var gaShortlistProduct = {};
    var gaShortlistProductArray = {};
    var isSelected_0 = null, isSelected_1 = null, wishIconColor_0 = null, wishIconColor_1 = null, cartIconColor_1 = null, cartIconColor_0 = null, productFontSize1 = null, productFontSize2 = null, productSize1 = null, productSize2 = null;
    var cartData = null;
    init();
    __defers["$.__views.estore1ViewAllContainer!click!navigateToEstoreViewAll"] && $.addListener($.__views.estore1ViewAllContainer, "click", navigateToEstoreViewAll);
    __defers["$.__views.estore1LoadMore!click!loadMoreEshopCategory"] && $.addListener($.__views.estore1LoadMore, "click", loadMoreEshopCategory);
    __defers["$.__views.estore1ListView!itemclick!estoreItemClick"] && $.addListener($.__views.estore1ListView, "itemclick", estoreItemClick);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;