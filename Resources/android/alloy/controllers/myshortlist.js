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
        getShortlistData();
    }
    function getShortlistData() {
        var requestMethod = Alloy.Globals.commonUrl.getShortlist;
        var param = {
            page_size: pageCount,
            page_no: currentPage,
            filter: shortlistSelection
        };
        var requestParam = JSON.stringify(param);
        Alloy.Globals.webServiceCall(requestMethod, requestParam, getShortlistSuccessCallback, getShortlistErrorCallback, "POST", args.mainWindow);
    }
    function getShortlistSuccessCallback(response) {
        if (0 == response.data.new_count) showAlert(args.container, "No Product to Display"); else {
            allCount = response.data.new_count;
            if (allCount != Alloy.Globals.shortlistCount && "All" == shortlistSelection) {
                Alloy.Globals.shortlistCount = allCount;
                args.refreshCount(2);
            }
            setFilters(response);
            filterData(response);
        }
        hideLoader();
        hideFullLoader();
        $.activityInd.hide();
    }
    function getShortlistErrorCallback(response) {
        hideLoader();
        hideFullLoader();
        $.activityInd.hide();
        showAlert(args.container, response.message);
    }
    function filterData(response) {
        var shortList = response.data.product;
        dataCount += shortList.length;
        var gridDataArr = [];
        for (var i = 0; i < shortList.length; i += size) {
            var smallPaginationArray = shortList.slice(i, i + size);
            gridDataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallPaginationArray));
            myDataArrCounter++;
        }
        var subGridData = "{" + gridDataArr + "}";
        var finalGridData = JSON.parse(subGridData);
        var data = finalGridData;
        setShortlist(data);
    }
    function setShortlist(data) {
        try {
            listData = [];
            _.each(data, function(value, k) {
                var image1 = "", collectionId1 = "", collectionName1 = "", attributesetname1 = "", gridCart1 = "", gridWhereToBuy1 = "", gridWish1 = "", _opacity1 = 1, sku1 = "", notify1 = 0, gridShare1 = "", productSize1 = "", isBlind1 = false, isWallpaper1 = false, defaultImage1 = "", outofStock1 = {
                    text: "",
                    zIndex: 0,
                    visible: false,
                    color: "#000000"
                };
                var sku2, image2 = "", collectionId2 = "", collectionName2 = "", attributesetname2 = "", gridCart2 = "", gridWhereToBuy2 = "", gridWish2 = "", _opacity2 = 1, notify2 = 0, gridShare2 = "", productSize2 = "", isBlind2 = false, isWallpaper2 = false, defaultImage2 = "", outofStock2 = {
                    text: "",
                    zIndex: 0,
                    visible: false,
                    color: "#000000"
                };
                var shareUrl1, shareUrl2;
                var imageContainer = "#ffffff";
                if (value[0]) {
                    isBlind1 = value[0].is_blind;
                    gridShare1 = Alloy.Globals.icon.share;
                    productSize1 = value[0].size;
                    image1 = value[0].image;
                    collectionId1 = value[0].product_id;
                    collectionName1 = value[0].name;
                    attributesetname1 = value[0].attributesetname;
                    gridWish1 = Alloy.Globals.icon.deleteIcon;
                    sku1 = value[0].sku;
                    shareUrl1 = value[0].url;
                    defaultImage1 = "/images/default_logo.png";
                    if ("Shop" == value[0].attributesetname) if (value[0].is_wallpaper) {
                        isWallpaper1 = true;
                        gridCart1 = "";
                        gridWhereToBuy1 = "Where to buy";
                    } else if (value[0].is_in_stock) {
                        gridCart1 = Alloy.Globals.icon.bag;
                        gridWhereToBuy1 = Alloy.Globals.icon.currency + value[0].price;
                        outofStock1 = {
                            text: "",
                            zIndex: 0,
                            visible: false,
                            color: "#000000"
                        };
                        _opacity1 = 1;
                    } else {
                        gridCart1 = "";
                        outofStock1 = {
                            text: "OUT OF STOCK",
                            font: {
                                fontSize: "20dp",
                                fontFamily: "futura_lt_bt_light-webfont"
                            },
                            zIndex: 2,
                            visible: true,
                            color: "#000000"
                        };
                        _opacity1 = .75;
                        if ("Notify me when in stock" == value[0].stock_notification) gridWhereToBuy1 = "Notify me when in stock"; else if ("Notify me when in stock" != value[0].stock_notification) {
                            gridWhereToBuy1 = Alloy.Globals.icon.notifyMe;
                            notify1 = 1;
                        }
                    } else gridWhereToBuy1 = Alloy.Globals.icon.currency + value[0].price;
                }
                if (value[1]) {
                    isBlind2 = value[1].is_blind;
                    gridShare2 = Alloy.Globals.icon.share;
                    productSize2 = value[1].size;
                    image2 = value[1].image;
                    collectionId2 = value[1].product_id;
                    collectionName2 = value[1].name;
                    attributesetname2 = value[1].attributesetname;
                    gridWish2 = Alloy.Globals.icon.deleteIcon;
                    sku2 = value[1].sku;
                    shareUrl2 = value[1].url;
                    defaultImage2 = "/images/default_logo.png";
                    if ("Shop" == value[1].attributesetname) if (value[1].is_wallpaper) {
                        isWallpaper2 = true;
                        gridCart2 = "";
                        gridWhereToBuy2 = "Where to buy";
                    } else if (value[1].is_in_stock) {
                        gridCart2 = Alloy.Globals.icon.bag;
                        gridWhereToBuy2 = Alloy.Globals.icon.currency + value[0].price;
                        outofStock2 = {
                            text: "",
                            zIndex: 0,
                            visible: false,
                            color: "#000000"
                        };
                        _opacity2 = 1;
                    } else {
                        gridCart2 = "";
                        outofStock2 = {
                            text: "OUT OF STOCK",
                            font: {
                                fontSize: "20dp",
                                fontFamily: "futura_lt_bt_light-webfont"
                            },
                            zIndex: 2,
                            visible: true,
                            color: "#000000"
                        };
                        _opacity2 = .75;
                        if ("Notify me when in stock" == value[1].stock_notification) gridWhereToBuy2 = "Notify me when in stock"; else if ("Notify me when in stock" != value[1].stock_notification) {
                            gridWhereToBuy2 = Alloy.Globals.icon.notifyMe;
                            notify2 = 1;
                        }
                    } else gridWhereToBuy2 = Alloy.Globals.icon.currency + value[1].price;
                }
                listData.push({
                    properties: {},
                    template: "gridTemplate",
                    gridProductImage1: {
                        image: encodeURI(image1),
                        collectionId: collectionId1,
                        collectionName: collectionName1,
                        attributesetname: attributesetname1,
                        opacity: _opacity1,
                        isWallpaper: isWallpaper1,
                        isBlind: isBlind1,
                        backgroundColor: imageContainer,
                        defaultImage: defaultImage1
                    },
                    gridProductImage2: {
                        image: encodeURI(image2),
                        collectionId: collectionId2,
                        collectionName: collectionName2,
                        attributesetname: attributesetname2,
                        opacity: _opacity2,
                        isWallpaper: isWallpaper2,
                        isBlind: isBlind2,
                        backgroundColor: imageContainer,
                        defaultImage: defaultImage2
                    },
                    gridProductname1: {
                        text: isNullVal(collectionName1) ? collectionName1 : collectionName1.toUpperCase(),
                        collectionId: collectionId1,
                        collectionName: collectionName1,
                        attributesetname: attributesetname1,
                        isWallpaper: isWallpaper1,
                        isBlind: isBlind1
                    },
                    gridProductname2: {
                        text: isNullVal(collectionName2) ? collectionName2 : collectionName2.toUpperCase(),
                        collectionId: collectionId2,
                        collectionName: collectionName2,
                        attributesetname: attributesetname2,
                        isWallpaper: isWallpaper2,
                        isBlind: isBlind2
                    },
                    gridCart1: {
                        text: gridCart1,
                        collectionId: collectionId1,
                        collectionName: collectionName1,
                        attributesetname: attributesetname1,
                        color: "#fff",
                        backgroundColor: "#66000000",
                        isWallpaper: isWallpaper1,
                        isBlind: isBlind1,
                        visible: "" != gridCart1
                    },
                    gridCart2: {
                        text: gridCart2,
                        collectionId: collectionId2,
                        collectionName: collectionName2,
                        attributesetname: attributesetname2,
                        color: "#fff",
                        backgroundColor: "#66000000",
                        isWallpaper: isWallpaper2,
                        isBlind: isBlind2,
                        visible: "" != gridCart2
                    },
                    gridWhereToBuy1: {
                        text: gridWhereToBuy1,
                        sku: sku1,
                        collectionName: collectionName1,
                        collectionId: collectionId1,
                        attributesetname: attributesetname1,
                        isWallpaper: isWallpaper1,
                        isBlind: isBlind1,
                        font: {
                            fontSize: "10dp",
                            fontFamily: "icomoon"
                        }
                    },
                    gridWhereToBuy2: {
                        text: gridWhereToBuy2,
                        sku: sku2,
                        collectionName: collectionName2,
                        collectionId: collectionId2,
                        attributesetname: attributesetname2,
                        isWallpaper: isWallpaper2,
                        isBlind: isBlind2,
                        font: {
                            fontSize: "10dp",
                            fontFamily: "icomoon"
                        }
                    },
                    gridWish1: {
                        text: gridWish1,
                        collectionId: collectionId1,
                        collectionName: collectionName1,
                        isWallpaper: isWallpaper1,
                        isBlind: isBlind1
                    },
                    gridWish2: {
                        text: gridWish2,
                        collectionId: collectionId2,
                        collectionName: collectionName2,
                        isWallpaper: isWallpaper2,
                        isBlind: isBlind2
                    },
                    gridShare1: {
                        text: gridShare1,
                        shareUrl: shareUrl1,
                        isWallpaper: isWallpaper1,
                        isBlind: isBlind1
                    },
                    gridShare2: {
                        text: gridShare2,
                        shareUrl: shareUrl2,
                        isWallpaper: isWallpaper2,
                        isBlind: isBlind2
                    },
                    gridLogo0: outofStock1,
                    gridLogo: outofStock2,
                    productSize1: {
                        text: isNullVal(productSize1) ? productSize1 : productSize1.toUpperCase(),
                        collectionId: collectionId1,
                        height: "" == productSize1 ? "0" : "9",
                        collectionName: collectionName1,
                        attributesetname: attributesetname1,
                        isWallpaper: isWallpaper1,
                        isBlind: isBlind1
                    },
                    productSize2: {
                        text: isNullVal(productSize2) ? productSize2 : productSize2.toUpperCase(),
                        collectionId: collectionId2,
                        height: "" == productSize2 ? "0" : "9",
                        collectionName: collectionName2,
                        attributesetname: attributesetname2,
                        isWallpaper: isWallpaper2,
                        isBlind: isBlind2
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
            currentPage++;
            $.curtainsShortlist.appendItems(listData);
            $.curtainsListView.setMarker({
                sectionIndex: 0,
                itemIndex: $.curtainsShortlist.getItems().length - 1
            });
        } catch (exp) {
            Ti.API.info("expcetion-->" + exp.message);
        }
    }
    function setFilters(response) {
        if (firstLoad) {
            var _createLabel = function(lblTxt, lblId) {
                var lbl = $.UI.create("Label", {
                    id: lblId,
                    text: lblTxt.toUpperCase(),
                    classes: "dropDownLbl fontMedium",
                    right: "15dp",
                    wordWrap: true,
                    width: "100dp",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT
                });
                if (0 === $.dropDownList.getChildren()) {
                    lbl.setTop("5dp");
                    $.allitem_lbl.setText(lblTxt.toUpperCase());
                }
                touchEffect.createTouchEffect(lbl, Alloy.Globals.labelTitleColor, "#000000");
                lbl.addEventListener("click", dropDownListSelection);
                return lbl;
            };
            var filterList = response.data.filters;
            for (var i = 0; i < filterList.length; i++) $.dropDownList.add(_createLabel(filterList[i], filterList[i]));
            firstLoad = false;
        }
    }
    function removeShortlist(productId, productName) {
        args.androidBack();
        var requestMethod = Alloy.Globals.commonUrl.removeShortlist;
        var param = {
            product_id: productId
        };
        var requestParam = JSON.stringify(param);
        args.mainWindow.add(Alloy.createController("confirmation", {
            requestMethod: requestMethod,
            requestParam: requestParam,
            successCallback: removeShortlistSuccessCallback,
            errorCallback: removeShortlistErrorCallback,
            windowContainer: args.mainWindow,
            message: "Are you sure you want to delete the product ?",
            productName: productName,
            showLoader: showTransparentLoader
        }).getView());
    }
    function removeShortlistSuccessCallback(response) {
        args.closeAndroidBack();
        Alloy.Globals.shortlistCount = Alloy.Globals.shortlistCount - 1;
        args.refreshCount(2);
        gridDataArr = [];
        $.curtainsShortlist.setItems([]);
        loadPerviousShortlistData();
        dataCount = 0;
        hideLoader();
        hideFullLoader();
        hideTransparentLoader();
        0 == Alloy.Globals.shortlistCount && args.loadDefaultScreen("catalogue");
    }
    function removeShortlistErrorCallback(response) {
        args.closeAndroidBack();
        hideLoader();
        hideFullLoader();
        hideTransparentLoader();
        showAlert(args.mainWindow, response.message);
    }
    function loadPerviousShortlistData() {
        var requestMethod = Alloy.Globals.commonUrl.getShortlist;
        currentPage = 1;
        var param = {
            page_size: dataCount,
            page_no: currentPage,
            filter: shortlistSelection
        };
        var requestParam = JSON.stringify(param);
        Alloy.Globals.webServiceCall(requestMethod, requestParam, getShortlistSuccessCallback, getShortlistErrorCallback, "POST", args.mainWindow);
    }
    function showDropdownList() {
        if ($.dropDownList.visible) {
            var arrow = Ti.UI.create2DMatrix({
                rotate: 0
            });
            $.allitems_btn.transform = arrow;
            $.dropDownList.setVisible(false);
            $.dropDownBg.setVisible(false);
            $.popContainer.setVisible(false);
        } else {
            var arrow = Ti.UI.create2DMatrix({
                rotate: 180
            });
            $.allitems_btn.transform = arrow;
            $.dropDownList.setVisible(true);
            $.dropDownBg.setVisible(true);
            $.popContainer.setVisible(true);
        }
    }
    function dropDownListSelection(e) {
        $.allitem_lbl.text = e.source.text;
        shortlistSelection = e.source.id;
        hideDropdownList();
        currentPage = 1;
        dataCount = 0;
        gridDataArr = [];
        $.curtainsShortlist.setItems([]);
        init();
    }
    function shortlistEvent(e) {
        hideDropdownList();
        var bind, a, index;
        if (e.bindId) {
            bind = e.bindId;
            index = e.itemIndex;
            a = e.section.items[index];
        }
        if ("gridProductImage1" == e.bindId || "gridProductImage2" == e.bindId || "gridProductname1" == e.bindId || "gridProductname2" == e.bindId || "productSize1" == e.bindId || "productSize2" == e.bindId) {
            gaProductName = a[bind].collectionName;
            if ("Qds" == a[bind].attributesetname) {
                var pData = {
                    Productid: a[bind].collectionId,
                    block: "collection",
                    navigatedblockid: ""
                };
                Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
            } else if ("Shop" == a[bind].attributesetname) {
                var CollectionData = {
                    Productid: a[bind].collectionId,
                    block: "shop",
                    product: "shopProduct"
                };
                a[bind].isWallpaper && (CollectionData.product = "wallpaper");
                Alloy.Globals.addWindowInNav("estoreDetails", CollectionData);
            } else if ("Blinds" == a[bind].attributesetname) {
                var pData = {
                    Productid: a[bind].collectionId,
                    block: "blinds",
                    navigatedblockid: ""
                };
                Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
            }
        } else if ("gridWish1" == e.bindId || "gridWish2" == e.bindId) "" != a[bind].text && removeShortlist(a[bind].collectionId, a[bind].collectionName); else if ("gridCart1" == e.bindId || "gridCart2" == e.bindId) {
            if (a[bind].visible && "Shop" == a[bind].attributesetname) {
                cartData = e;
                _addToCart(a[bind].collectionId);
            }
        } else if ("gridWhereToBuy1" == e.bindId || "gridWhereToBuy2" == e.bindId) {
            if ("Where to buy" == a[bind].text) Alloy.Globals.addWindowInNav("findStore"); else if ("Notify me when in stock" == a[bind].text) {
                showFullLoader($.myshortlist);
                var url = Alloy.Globals.commonUrl.notifyMeProductInStock;
                Ti.App.Properties.getString("quote_id");
                var data = {
                    product_name: a[bind].collectionName,
                    sku: a[bind].sku
                };
                var requestParams = JSON.stringify(data);
                Alloy.Globals.webServiceCall(url, requestParams, removeShortlistSuccessCallback, _notifyErrorCallback, "POST", $.myshortlist);
            } else if ("Qds" == a[bind].attributesetname) {
                var pData = {
                    Productid: a[bind].collectionId,
                    block: "collection",
                    navigatedblockid: ""
                };
                Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
            } else if ("Shop" == a[bind].attributesetname) {
                var CollectionData = {
                    Productid: a[bind].collectionId,
                    block: "shop",
                    product: "shopProduct"
                };
                a[bind].isWallpaper && (CollectionData.product = "wallpaper");
                Alloy.Globals.addWindowInNav("estoreDetails", CollectionData);
            } else if ("Blinds" == a[bind].attributesetname) {
                var pData = {
                    Productid: a[bind].collectionId,
                    block: "blinds",
                    navigatedblockid: ""
                };
                Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
            }
        } else ("gridShare1" == e.bindId || "gridShare2" == e.bindId) && "" != a[bind].text && shareImage(a[bind].shareUrl);
    }
    function hideDropdownList() {
        if ($.dropDownList.visible) {
            var arrow = Ti.UI.create2DMatrix({
                rotate: 0
            });
            $.allitems_btn.transform = arrow;
            $.dropDownList.setVisible(false);
            $.dropDownBg.setVisible(false);
            $.popContainer.setVisible(false);
        }
    }
    function _addToCart(productId) {
        gaBagProduct = productId;
        var requestMethod = Alloy.Globals.commonUrl.addToCartfromShortlist;
        var quote_id = Ti.App.Properties.getString("quote_id");
        var param = {
            product_id: productId,
            qty: 1,
            quoteId: quote_id
        };
        var requestParams = JSON.stringify(param);
        Alloy.Globals.webServiceCall(requestMethod, requestParams, _addToCartSuccessCallback, _addToCartErrorCallback, "POST", $.myshortlist);
    }
    function _addToCartSuccessCallback(response) {
        try {
            Alloy.Globals.shortlistCount = Alloy.Globals.shortlistCount - 1;
            args.refreshCount(2);
            gridDataArr = [];
            $.curtainsShortlist.setItems([]);
            loadPerviousShortlistData();
            dataCount = 0;
            hideLoader();
            hideFullLoader();
            Ti.App.Properties.setString("cartCount", response.data[0].cart_count);
            args.updateCount();
            showAlert($.myshortlist, response.message);
            var gaDetail = {};
            gaDetail = {
                name: gaProductName,
                sku: gaBagProduct,
                shortlistFlag: true
            };
            googleAnalyticsBag(gaDetail);
        } catch (ex) {
            Ti.API.info("ex.message = " + ex.message);
        }
    }
    function _addToCartErrorCallback(response) {
        showAlert($.myshortlist, response.message);
    }
    function _notifyErrorCallback(response) {
        hideFullLoader();
        showAlert($.myshortlist, response.message);
    }
    function removeAllShortlist() {
        var requestMethod = Alloy.Globals.commonUrl.removeAllShortlist;
        args.mainWindow.add(Alloy.createController("confirmation", {
            requestMethod: requestMethod,
            requestParam: {},
            successCallback: removeShortlistAllSuccessCallback,
            errorCallback: removeShortlistAllErrorCallback,
            windowContainer: args.mainWindow,
            message: "Are you sure you want to delete all shortlisted products ?",
            productName: "",
            showLoader: showLoader
        }).getView());
    }
    function removeShortlistAllSuccessCallback(response) {
        Alloy.Globals.shortlistCount = 0;
        args.refreshCount(2);
        gridDataArr = [];
        $.curtainsShortlist.setItems([]);
        args.loadDefaultScreen("catalogue");
        hideLoader();
    }
    function removeShortlistAllErrorCallback(response) {
        hideLoader();
        showAlert($.myshortlist, response.message);
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "myshortlist";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.myshortlist = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        id: "myshortlist"
    });
    $.__views.myshortlist && $.addTopLevelView($.__views.myshortlist);
    $.__views.__alloyId1047 = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        right: "10dp",
        top: 10,
        bubbleParent: false,
        layout: "horizontal",
        id: "__alloyId1047"
    });
    $.__views.myshortlist.add($.__views.__alloyId1047);
    showDropdownList ? $.addListener($.__views.__alloyId1047, "touchstart", showDropdownList) : __defers["$.__views.__alloyId1047!touchstart!showDropdownList"] = true;
    $.__views.allitem_lbl = Ti.UI.createLabel({
        color: Alloy.Globals.labelTitleColor,
        font: {
            fontFamily: "futura-hv-bt-heavy",
            fontSize: "10dp"
        },
        right: "5dp",
        bubbleParent: false,
        width: "100dp",
        ellipsize: true,
        wordWrap: false,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        text: "ALL",
        id: "allitem_lbl",
        top: 0
    });
    $.__views.__alloyId1047.add($.__views.allitem_lbl);
    showDropdownList ? $.addListener($.__views.allitem_lbl, "touchstart", showDropdownList) : __defers["$.__views.allitem_lbl!touchstart!showDropdownList"] = true;
    $.__views.allitems_btn = Ti.UI.createLabel({
        left: "0dp",
        font: {
            fontFamily: "icomoon",
            fontSize: "5dp"
        },
        color: "#000",
        text: Alloy.Globals.icon.dropdownArrow,
        id: "allitems_btn",
        bubbleParent: false,
        top: 4,
        right: "5dp"
    });
    $.__views.__alloyId1047.add($.__views.allitems_btn);
    showDropdownList ? $.addListener($.__views.allitems_btn, "touchstart", showDropdownList) : __defers["$.__views.allitems_btn!touchstart!showDropdownList"] = true;
    $.__views.footerView = Ti.UI.createView({
        id: "footerView",
        height: "85dp"
    });
    $.__views.activityInd = Ti.UI.createActivityIndicator({
        id: "activityInd",
        top: 10
    });
    $.__views.footerView.add($.__views.activityInd);
    var __alloyId1056 = {};
    Alloy.createController("listTemplate", {
        __parentSymbol: __parentSymbol,
        __itemTemplate: __alloyId1056
    });
    $.__views.curtainsShortlist = Ti.UI.createListSection({
        id: "curtainsShortlist"
    });
    var __alloyId1059 = [];
    __alloyId1059.push($.__views.curtainsShortlist);
    $.__views.curtainsListView = Ti.UI.createListView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        sections: __alloyId1059,
        templates: __alloyId1056,
        footerView: $.__views.footerView,
        top: "30dp",
        id: "curtainsListView",
        defaultItemTemplate: "gridTemplate",
        separatorColor: "transparent"
    });
    $.__views.myshortlist.add($.__views.curtainsListView);
    shortlistEvent ? $.addListener($.__views.curtainsListView, "itemclick", shortlistEvent) : __defers["$.__views.curtainsListView!itemclick!shortlistEvent"] = true;
    hideDropdownList ? $.addListener($.__views.curtainsListView, "scrollstart", hideDropdownList) : __defers["$.__views.curtainsListView!scrollstart!hideDropdownList"] = true;
    $.__views.popContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        id: "popContainer",
        top: 0,
        left: 0,
        zIndex: 30,
        visible: false
    });
    $.__views.myshortlist.add($.__views.popContainer);
    hideDropdownList ? $.addListener($.__views.popContainer, "touchstart", hideDropdownList) : __defers["$.__views.popContainer!touchstart!hideDropdownList"] = true;
    $.__views.dropDownList = Ti.UI.createScrollView({
        visible: false,
        layout: "vertical",
        backgroundColor: "#fff",
        height: "98dp",
        width: "136dp",
        top: "7%",
        zIndex: 2,
        right: "3%",
        scrollType: "vertical",
        id: "dropDownList"
    });
    $.__views.popContainer.add($.__views.dropDownList);
    $.__views.dropDownBg = Ti.UI.createView({
        backgroundColor: "transparent",
        borderColor: "#a0a0a0",
        borderWidth: .5,
        height: "120dp",
        width: "136dp",
        zIndex: 3,
        top: 7,
        right: "3%",
        visible: false,
        touchEnabled: false,
        id: "dropDownBg"
    });
    $.__views.popContainer.add($.__views.dropDownBg);
    $.__views.removeAll = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: "45dp",
        text: "REMOVE ALL",
        bottom: "0",
        zIndex: "10",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "#000",
        backgroundColor: "#66ffffff",
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        id: "removeAll"
    });
    $.__views.myshortlist.add($.__views.removeAll);
    removeAllShortlist ? $.addListener($.__views.removeAll, "click", removeAllShortlist) : __defers["$.__views.removeAll!click!removeAllShortlist"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var cartData = null;
    var firstLoad = true;
    var pageCount = 10;
    var currentPage = 1;
    var shortlistSelection = "All";
    var listData = [];
    var size = 2;
    var myDataArrCounter = 0;
    var dataCount = 0;
    var gaProductName = "";
    var allCount = 0;
    var gaBagProduct = "";
    init();
    $.curtainsListView.addEventListener("marker", function() {
        if (allCount != dataCount) {
            $.activityInd.show();
            getShortlistData();
        }
    });
    __defers["$.__views.__alloyId1047!touchstart!showDropdownList"] && $.addListener($.__views.__alloyId1047, "touchstart", showDropdownList);
    __defers["$.__views.allitem_lbl!touchstart!showDropdownList"] && $.addListener($.__views.allitem_lbl, "touchstart", showDropdownList);
    __defers["$.__views.allitems_btn!touchstart!showDropdownList"] && $.addListener($.__views.allitems_btn, "touchstart", showDropdownList);
    __defers["$.__views.curtainsListView!itemclick!shortlistEvent"] && $.addListener($.__views.curtainsListView, "itemclick", shortlistEvent);
    __defers["$.__views.curtainsListView!scrollstart!hideDropdownList"] && $.addListener($.__views.curtainsListView, "scrollstart", hideDropdownList);
    __defers["$.__views.popContainer!touchstart!hideDropdownList"] && $.addListener($.__views.popContainer, "touchstart", hideDropdownList);
    __defers["$.__views.removeAll!click!removeAllShortlist"] && $.addListener($.__views.removeAll, "click", removeAllShortlist);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;