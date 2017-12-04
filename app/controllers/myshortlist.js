var args = arguments[0] || {};

var cartData = null;
//Ti.API.info('into myshortlist');

// touchEffect.createTouchEffect($.allItem, Alloy.Globals.labelTitleColor, "#000000");
// touchEffect.createTouchEffect($.fabric, Alloy.Globals.labelTitleColor, "#000000");
// touchEffect.createTouchEffect($.curtain, Alloy.Globals.labelTitleColor, "#000000");
//touchEffect.createTouchEffect($.beddingCusion, Alloy.Globals.labelTitleColor, "#000000");
var firstLoad = true;
var pageCount = 10;
var currentPage = 1;
var shortlistSelection = "All";
var listData = [];
var size = 2;
//var gridDataArr = [];
var myDataArrCounter = 0;
var dataCount = 0;
var gaProductName = "";
var allCount = 0;
var fabricCount = 0;
var finishCount = 0;

var allListArr = [],
    fabricListArr = [],
    finishListArr = [];

var gaBagProduct = "";
init();

function init() {
    //Ti.API.info('init');
    //showLoader(args.container);
    //showFullLoader(args.container);

    getShortlistData();
}

$.curtainsListView.addEventListener("marker", function() {
    //Ti.API.info('marker called');

    // //Ti.API.info('Alloy.Globals.shortlistCount-->' + Alloy.Globals.shortlistCount);
    //Ti.API.info('product Count--->' + dataCount);
    //Ti.API.info('All count--->' + allCount);

    // if (Alloy.Globals.shortlistCount != dataCount) {
    if (allCount != dataCount) {
        $.activityInd.show();
        getShortlistData();
    }

});

function getShortlistData() {
    //Ti.API.info('ws call');

    // showLoader(args.container);
    var requestMethod = Alloy.Globals.commonUrl.getShortlist;

    var param = {
        page_size : pageCount,
        page_no : currentPage,
        filter : shortlistSelection // initiall has set to "All"
    };

    var requestParam = JSON.stringify(param);

    //Ti.API.info('shortlist request param --->' + requestParam);
    Alloy.Globals.webServiceCall(requestMethod, requestParam, getShortlistSuccessCallback, getShortlistErrorCallback, "POST", args.mainWindow);
}

function getShortlistSuccessCallback(response) {
    //Ti.API.info('shortList success result --> ' + JSON.stringify(response));
    if (response.data.new_count == 0) {
        //args.loadDefaultScreen("catalogue");
        showAlert(args.container, "No Product to Display");
        // need to empty the listview

    } else {
        allCount = response.data.new_count;
        //Ti.API.info('allCount in response' + allCount);

        if (allCount != Alloy.Globals.shortlistCount && shortlistSelection == "All") {

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
    //Ti.API.info('shortList error **********' + JSON.stringify(response));
    showAlert(args.container, response.message);
    //args.loadDefaultScreen("catalogue");
}

function filterData(response) {
    var shortList = response.data.product;
    dataCount = dataCount + shortList.length;
    var gridDataArr = [];

    for (var i = 0; i < shortList.length; i += size) {
        var smallPaginationArray = shortList.slice(i, i + size);
        gridDataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallPaginationArray) + "");
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

            var image1 = "",
                collectionId1 = "",
                collectionName1 = "",
                attributesetname1 = "",
                gridCart1 = "",
                gridWhereToBuy1 = "",
                gridWish1 = "",
                _opacity1 = 1,
                sku1 = "",
                notify1 = 0,
                gridShare1 = "",
                productSize1 = "",
                isBlind1 = false,
                isWallpaper1 = false,
                defaultImage1 = "",
                outofStock1 = {
                text : "",
                zIndex : 0,
                visible : false,
                color : "#000000"
            };

            var image2 = "",
                collectionId2 = "",
                collectionName2 = "",
                attributesetname2 = "",
                gridCart2 = "",
                gridWhereToBuy2 = "",
                gridWish2 = "",
                _opacity2 = 1,
                sku2,
                notify2 = 0,
                gridShare2 = "",
                productSize2 = "",
                isBlind2 = false,
                isWallpaper2 = false,
                defaultImage2 = "",
                outofStock2 = {
                text : "",
                zIndex : 0,
                visible : false,
                color : "#000000"

            };

            var shareUrl1,
                shareUrl2;

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

                if (value[0].attributesetname == "Shop") {
                    if (value[0].is_wallpaper) {
                        isWallpaper1 = true;
                        //Ti.API.info('is wallpaper');
                        gridCart1 = "";
                        gridWhereToBuy1 = "Where to buy";
                    } else {
                        if (value[0].is_in_stock) {
                            //Ti.API.info('cart is in stock');
                            gridCart1 = Alloy.Globals.icon.bag;
                            gridWhereToBuy1 = Alloy.Globals.icon.currency + value[0].price;

                            outofStock1 = {
                                text : "",
                                zIndex : 0,
                                visible : false,
                                color : "#000000",
                            };
                            _opacity1 = 1;

                        } else {
                            //Ti.API.info('out of stock');
                            gridCart1 = "";

                            outofStock1 = {
                                text : "OUT OF STOCK",
                                font : {
                                    fontSize : "20dp",
                                    fontFamily : "futura_lt_bt_light-webfont"
                                },
                                zIndex : 2,
                                visible : true,
                                color : "#000000",
                            };
                            _opacity1 = 0.75;

                            if (value[0].stock_notification == "Notify me when in stock") {
                                gridWhereToBuy1 = "Notify me when in stock";

                            } else if (value[0].stock_notification != "Notify me when in stock") {
                                gridWhereToBuy1 = Alloy.Globals.icon.notifyMe;
                                notify1 = 1;

                            }

                        }
                    }
                } else {
                    gridWhereToBuy1 = Alloy.Globals.icon.currency + value[0].price;
                }

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

                if (value[1].attributesetname == "Shop") {
                    if (value[1].is_wallpaper) {
                        isWallpaper2 = true;
                        //Ti.API.info('is wallpaper');
                        gridCart2 = "";
                        gridWhereToBuy2 = "Where to buy";
                    } else {
                        if (value[1].is_in_stock) {
                            //Ti.API.info('cart is in stock');
                            gridCart2 = Alloy.Globals.icon.bag;
                            gridWhereToBuy2 = Alloy.Globals.icon.currency + value[0].price;

                            outofStock2 = {
                                text : "",
                                zIndex : 0,
                                visible : false,
                                color : "#000000"

                            };
                            _opacity2 = 1;

                        } else {
                            //Ti.API.info('out of stock');
                            gridCart2 = "";

                            outofStock2 = {
                                text : "OUT OF STOCK",
                                font : {
                                    fontSize : "20dp",
                                    fontFamily : "futura_lt_bt_light-webfont"
                                },
                                zIndex : 2,
                                visible : true,
                                color : "#000000"
                            };
                            _opacity2 = 0.75;

                            if (value[1].stock_notification == "Notify me when in stock") {
                                gridWhereToBuy2 = "Notify me when in stock";

                            } else if (value[1].stock_notification != "Notify me when in stock") {
                                //gridWhereToBuy2 = value[1].stock_notification;
                                gridWhereToBuy2 = Alloy.Globals.icon.notifyMe;
                                notify2 = 1;

                            }

                        }
                    }
                } else {
                    gridWhereToBuy2 = Alloy.Globals.icon.currency + value[1].price;
                }
            }

            listData.push({
                properties : {

                },
                template : "gridTemplate",
                gridProductImage1 : {
                    image : encodeURI(image1),
                    collectionId : collectionId1,
                    collectionName : collectionName1,
                    attributesetname : attributesetname1,
                    opacity : _opacity1,
                    isWallpaper : isWallpaper1,
                    isBlind : isBlind1,
                    backgroundColor : imageContainer,
                    defaultImage : defaultImage1,

                },
                gridProductImage2 : {
                    image : encodeURI(image2),
                    collectionId : collectionId2,
                    collectionName : collectionName2,
                    attributesetname : attributesetname2,
                    opacity : _opacity2,
                    isWallpaper : isWallpaper2,
                    isBlind : isBlind2,
                    backgroundColor : imageContainer,
                    defaultImage : defaultImage2,

                },
                gridProductname1 : {
                    text : (!isNullVal(collectionName1)) ? collectionName1.toUpperCase() : collectionName1,
                   // text : collectionName1.toUpperCase(),
                    collectionId : collectionId1,
                    collectionName : collectionName1,
                    attributesetname : attributesetname1,
                    isWallpaper : isWallpaper1,
                    isBlind : isBlind1
                },
                gridProductname2 : {
                    text : (!isNullVal(collectionName2)) ? collectionName2.toUpperCase() : collectionName2,
                    //text : collectionName2.toUpperCase(),
                    collectionId : collectionId2,
                    collectionName : collectionName2,
                    attributesetname : attributesetname2,
                    isWallpaper : isWallpaper2,
                    isBlind : isBlind2

                },
                gridCart1 : {
                    text : gridCart1,
                    collectionId : collectionId1,
                    collectionName : collectionName1,
                    attributesetname : attributesetname1,
                    //color : "#a6000000",
                    color : "#fff",
                    backgroundColor : "#66000000",
                    isWallpaper : isWallpaper1,
                    isBlind : isBlind1,
                    visible : (gridCart1 == "" ? false : true) // commented for time begin
                    //visible : false

                },
                gridCart2 : {
                    text : gridCart2,
                    collectionId : collectionId2,
                    collectionName : collectionName2,
                    attributesetname : attributesetname2,
                    //	color : "#a6000000",
                    color : "#fff",
                    backgroundColor : "#66000000",
                    isWallpaper : isWallpaper2,
                    isBlind : isBlind2,
                    visible : (gridCart2 == "" ? false : true)
                    //visible : false

                },
                gridWhereToBuy1 : {
                    //text : value[0].price,
                    text : gridWhereToBuy1,
                    sku : sku1,
                    collectionName : collectionName1,
                    collectionId : collectionId1,
                    attributesetname : attributesetname1,
                    isWallpaper : isWallpaper1,
                    isBlind : isBlind1,
                    font : {
                        fontSize : "10dp",
                        //fontSize:(notify1==1 ? "12dp":"10dp"),
                        //fontFamily:(notify1==1 ? "futura_medium_bt-webfont":"icomoon")
                        fontFamily : "icomoon"
                    }

                },
                gridWhereToBuy2 : {
                    //text : value[1].price,
                    // text : ((value[1].availability = "1" ? Alloy.Globals.icon.currency + value[1].price : "Notify when in stock") || "")
                    text : gridWhereToBuy2,
                    sku : sku2,
                    collectionName : collectionName2,
                    collectionId : collectionId2,
                    attributesetname : attributesetname2,
                    isWallpaper : isWallpaper2,
                    isBlind : isBlind2,
                    font : {
                        fontSize : "10dp",
                        //fontSize:(notify2==1 ? "12dp":"10dp"),
                        //fontFamily:(notify2==1 ? "futura_medium_bt-webfont":"icomoon")
                        fontFamily : "icomoon"
                    }

                },
                gridWish1 : {
                    text : gridWish1,
                    collectionId : collectionId1,
                    collectionName : collectionName1,
                    isWallpaper : isWallpaper1,
                    isBlind : isBlind1
                },

                gridWish2 : {
                    text : gridWish2,
                    collectionId : collectionId2,
                    collectionName : collectionName2,
                    isWallpaper : isWallpaper2,
                    isBlind : isBlind2
                },

                gridShare1 : {
                    text : gridShare1,
                    shareUrl : shareUrl1,
                    isWallpaper : isWallpaper1,
                    isBlind : isBlind1

                },

                gridShare2 : {
                    text : gridShare2,
                    shareUrl : shareUrl2,
                    isWallpaper : isWallpaper2,
                    isBlind : isBlind2
                },

                gridLogo0 : outofStock1,
                gridLogo : outofStock2,

                productSize1 : {
                    text : (!isNullVal(productSize1)) ? productSize1.toUpperCase() : productSize1,
                    //text : productSize1.toUpperCase(),
                    collectionId : collectionId1,
                    height : ((productSize1 == "") ? "0" : "9"),
                    collectionName : collectionName1,
                    attributesetname : attributesetname1,
                    isWallpaper : isWallpaper1,
                    isBlind : isBlind1

                },
                productSize2 : {
                    text : (!isNullVal(productSize2)) ? productSize2.toUpperCase() : productSize2,
                   // text : productSize2.toUpperCase(),
                    collectionId : collectionId2,
                    height : ((productSize2 == "") ? "0" : "9"),
                    collectionName : collectionName2,
                    attributesetname : attributesetname2,
                    isWallpaper : isWallpaper2,
                    isBlind : isBlind2

                },
                outOfStock1 : {
                    visible : false,
                    collectionId : collectionId1,
                },
                outOfStock2 : {
                    visible : false,
                    collectionId : collectionId2,
                }

            });

        });
        currentPage++;

        $.curtainsShortlist.appendItems(listData);

        // Ti.API.info('get Items-->' + $.curtainsShortlist.getItems().length);

        $.curtainsListView.setMarker({
            sectionIndex : 0,
            itemIndex : ($.curtainsShortlist.getItems().length - 1)
        });

    } catch(exp) {
        Ti.API.info('expcetion-->' + exp.message);
    }

}

function setFilters(response) {

    if (firstLoad) {
        var _createLabel = function(lblTxt, lblId) {
            var lbl = $.UI.create("Label", {
                id : lblId,
                text : lblTxt.toUpperCase(),
                classes : "dropDownLbl fontMedium",
                right : "15dp",
                wordWrap : true,
                width : "100dp",
                textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT
                //right:"5%"
            });
            if ($.dropDownList.getChildren() === 0) {
                lbl.setTop("5dp");
                $.allitem_lbl.setText(lblTxt.toUpperCase());
            }
            touchEffect.createTouchEffect(lbl, Alloy.Globals.labelTitleColor, "#000000");
            lbl.addEventListener("click", dropDownListSelection);

            return lbl;
        };
        var filterList = response.data.filters;

        for (var i = 0; i < filterList.length; i++) {
            $.dropDownList.add(_createLabel(filterList[i], filterList[i]));
        }

        firstLoad = false;
    }

}

function removeShortlist(productId, productName) {

    /*
     showFullLoader(args.container);

     var requestMethod = Alloy.Globals.commonUrl.removeShortlist;
     var param = {
     product_id : productId
     };

     var requestParam = JSON.stringify(param);

     Ti.API.info('remove Shortlist param-->' + requestParam);

     Alloy.Globals.webServiceCall(requestMethod, requestParam, removeShortlistSuccessCallback, removeShortlistErrorCallback, "POST", args.mainWindow);
     */

    args.androidBack();

    var requestMethod = Alloy.Globals.commonUrl.removeShortlist;
    var param = {
        product_id : productId
    };

    var requestParam = JSON.stringify(param);

    args.mainWindow.add(Alloy.createController("confirmation", {
        requestMethod : requestMethod,
        requestParam : requestParam,
        successCallback : removeShortlistSuccessCallback,
        errorCallback : removeShortlistErrorCallback,
        windowContainer : args.mainWindow,
        message : "Are you sure you want to delete the product ?",
        productName : productName,
        showLoader : showTransparentLoader,
    }).getView());

}

function removeShortlistSuccessCallback(response) {
    //hideLoader();
    // listData=[];

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

    if (Alloy.Globals.shortlistCount == 0) {
        args.loadDefaultScreen("catalogue");
    }
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
        page_size : dataCount,
        page_no : currentPage,
        filter : shortlistSelection // initiall has set to "All"
    };

    var requestParam = JSON.stringify(param);

    //Ti.API.info('shortlist after remove shortlist param --->' + requestParam);
    Alloy.Globals.webServiceCall(requestMethod, requestParam, getShortlistSuccessCallback, getShortlistErrorCallback, "POST", args.mainWindow);
}

function showDropdownList() {
    //Ti.API.info('list');
    if ($.dropDownList.visible) {
        var arrow = Ti.UI.create2DMatrix({
            rotate : 0
        });
        $.allitems_btn.transform = arrow;

        //setTimeout(function() {
        $.dropDownList.setVisible(false);
        $.dropDownBg.setVisible(false);
        $.popContainer.setVisible(false);
        //}, 400);

    } else {

        var arrow = Ti.UI.create2DMatrix({
            rotate : 180
        });
        $.allitems_btn.transform = arrow;

        //setTimeout(function() {
        $.dropDownList.setVisible(true);
        $.dropDownBg.setVisible(true);
        $.popContainer.setVisible(true);
        //}, 400);
    }
}

function dropDownListSelection(e) {

    $.allitem_lbl.text = e.source.text;
    shortlistSelection = e.source.id;
    //showDropdownList();
    hideDropdownList();
    currentPage = 1;
    dataCount = 0;
    // listData=[];
    gridDataArr = [];
    $.curtainsShortlist.setItems([]);

    init();

}

function shortlistEvent(e) {
    hideDropdownList();
    var bind,
        a,
        index;

    if (e.bindId) {
        bind = e.bindId;
        index = e.itemIndex;
        a = e.section.items[index];
    }

    //Ti.API.info('bindId-->' +bind);

    if (e.bindId == "gridProductImage1" || e.bindId == "gridProductImage2" || e.bindId == "gridProductname1" || e.bindId == "gridProductname2" || e.bindId == "productSize1" || e.bindId == "productSize2") {
        
        gaProductName = a[bind].collectionName;
        
        if (a[bind].attributesetname == "Qds") {
            var pData = {
                Productid : a[bind].collectionId,
                block : "collection",
                navigatedblockid : ""
            };

            Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
        } else if (a[bind].attributesetname == "Shop") {

            var CollectionData = {
                Productid : a[bind].collectionId,
                block : "shop",
                product : "shopProduct"
            };

            if (a[bind].isWallpaper) {
                CollectionData.product = "wallpaper";
            }

            Alloy.Globals.addWindowInNav("estoreDetails", CollectionData);
        } else if (a[bind].attributesetname == "Blinds") {
            var pData = {
                Productid : a[bind].collectionId,
                block : "blinds",
                navigatedblockid : ""
            };

            Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
        }

    } else if (e.bindId == "gridWish1" || e.bindId == "gridWish2") {

        if (a[bind].text != "") {
            removeShortlist(a[bind].collectionId, a[bind].collectionName);
        }

    } else if (e.bindId == "gridCart1" || e.bindId == "gridCart2") {

        if (a[bind].visible) {

            if (a[bind].attributesetname == "Shop") {
                cartData = e;
                _addToCart(a[bind].collectionId);
            }

        }

    } else if (e.bindId == "gridWhereToBuy1" || e.bindId == "gridWhereToBuy2") {

        if (a[bind].text == "Where to buy") {
            Alloy.Globals.addWindowInNav("findStore");
        } else if (a[bind].text == "Notify me when in stock") {
            showFullLoader($.myshortlist);
            var url = Alloy.Globals.commonUrl.notifyMeProductInStock;
            var quote_id = Ti.App.Properties.getString("quote_id");
            var data = {
                product_name : a[bind].collectionName,
                sku : a[bind].sku
            };
            var requestParams = JSON.stringify(data);
            Alloy.Globals.webServiceCall(url, requestParams, removeShortlistSuccessCallback, _notifyErrorCallback, "POST", $.myshortlist);
        } else {
            if (a[bind].attributesetname == "Qds") {
                var pData = {
                    Productid : a[bind].collectionId,
                    block : "collection",
                    navigatedblockid : ""
                };

                Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
            } else if (a[bind].attributesetname == "Shop") {

                var CollectionData = {
                    Productid : a[bind].collectionId,
                    block : "shop",
                    product : "shopProduct"
                };

                if (a[bind].isWallpaper) {
                    CollectionData.product = "wallpaper";
                }

                Alloy.Globals.addWindowInNav("estoreDetails", CollectionData);
            } else if (a[bind].attributesetname == "Blinds") {
                var pData = {
                    Productid : a[bind].collectionId,
                    block : "blinds",
                    navigatedblockid : ""
                };

                Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
            }

        }

    } else if (e.bindId == "gridShare1" || e.bindId == "gridShare2") {

        if (a[bind].text != "") {
            //			socialShare();
            shareImage(a[bind].shareUrl);
        }

    }

}

function hideDropdownList() {
    //Ti.API.info('into page click');
    if ($.dropDownList.visible) {
        var arrow = Ti.UI.create2DMatrix({
            rotate : 0
        });
        $.allitems_btn.transform = arrow;

        $.dropDownList.setVisible(false);
        $.dropDownBg.setVisible(false);
        $.popContainer.setVisible(false);
        //}, 400);

    }
}

function _addToCart(productId) {
    /*
     var requestMethod = Alloy.Globals.commonUrl.addToCart;
     var param = {
     product_id : productId,
     qty : 1
     };

     var requestParams = JSON.stringify(param);
     Ti.API.info('addToCart -->' + JSON.stringify(requestParams));

     Alloy.Globals.webServiceCall(requestMethod, requestParams, _addToCartSuccessCallback, _addToCartErrorCallback, "POST", $.myshortlist);
     */

    gaBagProduct = productId;
    var requestMethod = Alloy.Globals.commonUrl.addToCartfromShortlist;
    var quote_id = Ti.App.Properties.getString("quote_id");
    var param = {
        product_id : productId,
        qty : 1,
        quoteId : quote_id
    };
    var requestParams = JSON.stringify(param);
    //Ti.API.info('addToCart -->' + JSON.stringify(requestParams));
    Alloy.Globals.webServiceCall(requestMethod, requestParams, _addToCartSuccessCallback, _addToCartErrorCallback, "POST", $.myshortlist);

}

function _addToCartSuccessCallback(response) {

    try {
        //Ti.API.info('into success');

        Alloy.Globals.shortlistCount = Alloy.Globals.shortlistCount - 1;
        args.refreshCount(2);

        gridDataArr = [];
        $.curtainsShortlist.setItems([]);
        loadPerviousShortlistData();
        dataCount = 0;
        hideLoader();
        hideFullLoader();
        //Ti.API.info(' cartcount -->' + response.data[0].cart_count);
        Ti.App.Properties.setString("cartCount", response.data[0].cart_count);
        //Ti.App.fireEvent("updateCartCount");
        //args.mainWindow.focus();
        args.updateCount();

        showAlert($.myshortlist, response.message);
//gaProductName
        var gaDetail = {};
        gaDetail ={
          name : gaProductName,
          sku :  gaBagProduct,
          shortlistFlag : true 
        };
         //gaProductName+"("+gaBagProduct+")";
        googleAnalyticsBag(gaDetail);

    } catch(ex) {
        Ti.API.info('ex.message = ' + ex.message);
    }

}

function _addToCartErrorCallback(response) {
    //hideFullLoader();
    showAlert($.myshortlist, response.message);
}

function _notifySuccessCallback(response) {
    hideFullLoader();
}

function _notifyErrorCallback(response) {
    hideFullLoader();
    showAlert($.myshortlist, response.message);
}



/*Remove All Shortlist from my account */


function removeAllShortlist(){
    var requestMethod = Alloy.Globals.commonUrl.removeAllShortlist;
    

    

    args.mainWindow.add(Alloy.createController("confirmation", {
        requestMethod : requestMethod,
        requestParam : {},
        successCallback : removeShortlistAllSuccessCallback,
        errorCallback : removeShortlistAllErrorCallback,
        windowContainer : args.mainWindow,
        message : "Are you sure you want to delete all shortlisted products ?",
        productName : "",
        showLoader : showLoader,
    }).getView());
}

function removeShortlistAllSuccessCallback(response){
   // Ti.API.info('remove All success');
    //args.mainWindow.focus();
    
     Alloy.Globals.shortlistCount = 0;
     args.refreshCount(2);

     gridDataArr = [];
     $.curtainsShortlist.setItems([]);
     
     args.loadDefaultScreen("catalogue");
     
    // loadPerviousShortlistData();
    // dataCount = 0;
    hideLoader();
}

function removeShortlistAllErrorCallback(response){
  //  Ti.API.info('remove All error');
    
    hideLoader();
    showAlert($.myshortlist, response.message);
}

/*Remove All Shortlist from my account */
