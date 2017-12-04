var args = arguments[0] || {};
//Ti.API.info('args' + JSON.stringify(args));
var sortBy = "";
var gridData,
    firstCount,
    secondCount,
    message;
var gaAddToCartData = {};
var stateFlag = true;
var page_no = 1;
var limit = 10;
var totalItem;
var shortlistData;
var listData = [];
var backupData = [];

var cartProductId = [];
//new var

var selectedCartItem = [];
var unSelectedCartItem = [];
var selectedStyle = "";
var filters = {};
var displayCount,
    sortTotalCount;
var sortLbl = [];
var sortSeperator = [];
var sortContainer = [];
var filterLbl = [];
var subFilterLbl = [];
var filterMainContainer = [];
var checkFilterLbl = [];
var subFilterContainer = [];
var filtersData = {};
var styleOption = [];
var lastOpenView;
var activeTemplate = "gridTemplate";

var product_sku1 = "",
    product_sku2 = "";
//var activeTemplate = "beddingGridTemplate";
var itemIndex_ = 0;
var toggleStatus = true;
var filterSend = {};
var filterSendJson = [];
var addtocartItem = [];
var addShortlist = "";
var cartData = "";

$.styleNameLbl.text = "ALL STYLES";
$.styleNameLbl.color = "#e65e48";
var collectionName1,
    collectionName2,
    collectionImage1,
    collectionImage2,
    collectionId1,
    gridWhereToBuy1,
    gridWhereToBuy2,
    gridProductname1,
    gridProductname2,
    productSize1,
    productSize2,
    productFontSize1,
    productFontSize2,
    gridShare1,
    gridShare2,
    gridWish1,
    gridWish2,
    gridCart1,
    gridCart2,
    collectionId2,
    imageContainer,
    logoText,
    isSelected_0,
    isSelected_1,
    wishIconColor_0 = "transparent",
    wishIconColor_1 = "transparent",
    cartIconColor_0 = "transparent",
    cartIconColor_1 = "transparent";
var shareUrl1,
    shareUrl2,
    outOfStock1,
    outOfStock2;
Titanium.App.Properties.setList('cartAllid', []);
var filterRawData;

$.gridIcon.color = "#e65e48";
$.gridLbl.color = "#e65e48";
touchEffect.createTouchEffect($.sortByLbl, "#a6e65e48", "#e65e48");
touchEffect.createTouchEffect($.filterByLbl, "#a6e65e48", "#e65e48");
touchEffect.createTouchEffect($.sortCloseLbl, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.refreshIcon, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.filterCloseLbl, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.filterApplyLbl, "#a6ffffff", "#ffffff");
var wTitle = "";
var subTitle = "";
var gaTitle = "";
var gaShortlistProduct = {};
var gaScreenName = "";

if (!isNullVal(args.type)) {

    switch(args.type) {
    case"shopByLook":

        wTitle = "SHOP BY LOOK";
        gaTitle = wTitle;

        $.styleFilterView.height = "35dp";
        $.listView.top = "70dp";
        if (!isNullVal(args.style)) {
            selectedStyle = args.style;

        }

        if (!isNullVal(args.windowNav)) {
            //$.styleFilterView.height = "0dp";
            $.styleDropDown.setTouchEnabled(false);
        }

        break;
    case"collection":
        //wTitle = "ALL " + args.categoryName.toUpperCase();
        if (!isNullVal(args.WindowName)) {
            wTitle = "ALL " + args.WindowName.toUpperCase();
            gaTitle = args.WindowName.toUpperCase();
        }

        break;
    case"C_Product":

        if (!isNullVal(args.categoryType)) {

            switch(args.categoryType) {
            case "shop":
                wTitle = args.subTitle.toUpperCase();
                subTitle = args.wName.toUpperCase() || "";
                gaTitle = args.subTitle.toUpperCase();
                break;
            case "blinds":
                wTitle = args.wName.toUpperCase() + " BLINDS";
                gaTitle = args.wName.toUpperCase();
                break;
            default:
                wTitle = "ALL " + args.wName.toUpperCase();
                gaTitle = args.wName.toUpperCase();
                break;
            }
        } else {
            wTitle = "ALL " + args.wName.toUpperCase();
            gaTitle = args.wName.toUpperCase();
        }

        break;
    }
}

$.header.init({
    title : wTitle,
    subTitle : subTitle || "",
    passWindow : $.productListing,
});

gaScreenName = wTitle || "Listing";
googleAnalyticsScreen(wTitle);
/*
 * set attributestring to view type option  label
 */

function setAttributeStr(type) {

    var text = "VIEW TYPE " + type;
    var attr = Ti.UI.createAttributedString({
        text : text,
        attributes : [{
            type : Ti.UI.ATTRIBUTE_FONT,
            value : {
                fontSize : 10,
                fontFamily : 'futura_medium_bt-webfont'
            },
            range : [text.indexOf(type + ""), (type + "").length]
        }]
    });

    $.listTypeLbl.attributedString = attr;
}

setAttributeStr("GRID");

$.listTypeContainer.addEventListener('click', toggleListType);

function toggleListType(e) {
    if (toggleStatus) {
        $.listTypeContainer.animate({
            bottom : 0,
            duration : 200
        });
        toggleStatus = false;
    } else {
        $.listTypeContainer.animate({
            bottom : -65, //-65
            duration : 200
        });
        toggleStatus = true;
    }
}

$.sortByLbl.addEventListener('click', function(e) {
    hideShowView($.sortView);
});
$.sortCloseLbl.addEventListener('click', function(e) {
    hideShowView($.sortView);
});
$.filterByLbl.addEventListener('click', function(e) {
    hideShowView($.filterView);
});
$.filterCloseLbl.addEventListener('click', function(e) {
    hideShowView($.filterView);
});

var style = $.createStyle({
    font : {
        fontWeight : 'bold',
        fontSize : "13dp"
    },
});
var style1 = $.createStyle({
    font : {
        fontFamily : "futura_lt_bt_light-webfont",
        fontSize : "13dp"
    },
});
//$.button.applyProperties(style);

$.listTypeSubContainer.addEventListener('click', function(e) {

    if (!isNullVal(e.source.id)) {
        switch(e.source.id) {
        case "gridContainer":
            $.gridIcon.color = "#e65e48";
            $.gridLbl.color = "#e65e48";
            $.listIcon.color = "#000000";
            $.listLbl.color = "#000000";
            $.blockIcon.color = "#000000";
            $.blockLbl.color = "#000000";
            setAttributeStr("GRID");
            activeTemplate = "gridTemplate";
            viewTypeLooping(backupData, activeTemplate);
            break;
        case "listContainer":
            $.listIcon.color = "#e65e48";
            $.listLbl.color = "#e65e48";
            $.gridIcon.color = "#000000";
            $.gridLbl.color = "#000000";
            $.blockIcon.color = "#000000";
            $.blockLbl.color = "#000000";
            setAttributeStr("LIST");
            activeTemplate = "listTypeTemplate";
            viewTypeLooping(backupData, activeTemplate);
            break;

        case "blockContainer":
            $.blockIcon.color = "#e65e48";
            $.blockLbl.color = "#e65e48";
            $.gridIcon.color = "#000000";
            $.gridLbl.color = "#000000";
            $.listIcon.color = "#000000";
            $.listLbl.color = "#000000";
            setAttributeStr("BLOCK");
            activeTemplate = "blockTypeTemplate";
            viewTypeLooping(backupData, activeTemplate);
            break;
        }
    }

});

$.listView.addEventListener('itemclick', function(e) {

    try {

        if (!isNullVal(e.bindId) && e.bindId != "message") {
            var _bind = e.bindId;
            var _index = e.itemIndex;
            var _a = e.section.items[_index];

            if (!isNullVal(_a[_bind].collectionId)) {

                //gaAddToCartData = _a[_bind].product_name_ga + "(" + _a[_bind].product_sku + ")";

                if (e.bindId == "gridWish1" || e.bindId == "gridWish2") {
                    if (!isNullVal(Ti.App.Properties.getString("access_token"))) {

                        switch(args.type) {
                        case "shopByLook":
                            var collectionData = {
                                collectionName : _a[_bind].collectionName,
                                collectionId : _a[_bind].collectionId,
                                type : "shopByLook"
                            };
                            addShortlist = Alloy.createController('addToShortlist', collectionData).getView();
                            $.productListing.add(addShortlist);
                            hideShowView(addShortlist);
                            break;
                        case "collection":
                            var collectionData = {
                                collectionName : _a[_bind].collectionName,
                                collectionId : _a[_bind].collectionId,
                                type : "collection"
                            };
                            addShortlist = Alloy.createController('addToShortlist', collectionData).getView();
                            $.productListing.add(addShortlist);
                            hideShowView(addShortlist);
                            break;
                        case "C_Product":
                            addToShortlist(e);
                            break;
                        }

                    } else {
                        //Alloy.Globals.addWindowInNav("signIn", "allCollections");
                        Alloy.Globals.addWindowInNav("signIn", {
                            listObject : e,
                            listViewReference : updateItemListClick,
                        });
                    }

                } else if (e.bindId == "gridCart1" || e.bindId == "gridCart2") {
                    if (args.categoryType === "shop") {
                        if (!isNullVal(Ti.App.Properties.getString("access_token"))) {

                            if (_a[e.bindId].visible) {

                                var shortlist_flag = null;
                                if (e.bindId == "gridCart1") {
                                    if (_a['gridWish1'].text == '\ue927') {
                                        shortlist_flag = true;
                                    } else {
                                        shortlist_flag = false;
                                    }
                                } else {
                                    if (_a['gridWish2'].text == '\ue927') {
                                        shortlist_flag = true;
                                    } else {
                                        shortlist_flag = false;
                                    }
                                }

                                //gaAddToCartData = _a[_bind].product_name_ga + "(" + _a[_bind].product_sku + ")";
                                gaAddToCartData = {};
                                gaAddToCartData = {
                                    name : _a[_bind].product_name_ga,
                                    sku : _a[_bind].product_sku,
                                    shortlistFlag : shortlist_flag
                                };

                                cartData = "";
                                cartData = e;
                                var url = Alloy.Globals.commonUrl.addToCart;
                                var data = {
                                    product_id : _a[_bind].collectionId,
                                    qty : 1
                                };

                                var requestParams = JSON.stringify(data);

                                Alloy.Globals.webServiceCall(url, requestParams, addToCartSuccessCallback, addToCartErrorCallback, "POST", $.productListing);
                            }

                        } else {
                            // var pData = {
                            // listObject : e,
                            // listViewReference : updateItemListClick,
                            // };
                            Alloy.Globals.addWindowInNav("signIn", {
                                listObject : e,
                                listViewReference : updateItemListClick,
                            });
                        }
                    }
                } else if ((e.bindId == "gridWhereToBuy1" || e.bindId == "gridWhereToBuy2") && _a[_bind].text == "Where to buy") {
                    // Ti.API.info('_a[_bind].collectionId = '+_a[_bind].collectionId);
                    // Ti.API.info('_a[_bind].collectionId = '+_a[_bind].product_name_ga);
                    if (!isNullVal(_a[_bind].collectionId)) {
                        var gaLeadProductArray = {};
                        gaLeadProductArray = {
                            name : _a[_bind].product_name_ga||"NA",
                            sku : _a[_bind].collectionId
                        };
                        generateLead(gaLeadProductArray, "Productlisting Page");
                    }

                    Alloy.Globals.addWindowInNav("findStore");
                } else if (e.bindId == "gridShare1" || e.bindId == "gridShare2") {

                    //Ti.API.info('sharing url is ' + _a[_bind].shareUrl);
                    // socialShare();

                    // var shareProductUrl='http://dev.ddecor.com/collection/silky-satin';
                    shareImage(_a[_bind].shareUrl);
                } else {
                    if (!isNullVal(_a[_bind].collectionId)) {
                        //if (!isNullVal(e.bindId)) {
                        var CollectionData = "";
                        if (!isNullVal(args.type)) {

                            switch(args.type) {

                            case "shopByLook":
                                CollectionData = {
                                    type : "shopByLook",
                                    category : gaTitle,
                                    id : _a[_bind].collectionId
                                };
                                Alloy.Globals.addWindowInNav("productDetails", CollectionData);
                                break;

                            case "collection":
                                CollectionData = {
                                    type : "collection",
                                    category : gaTitle,
                                    id : _a[_bind].collectionId
                                };
                                Alloy.Globals.addWindowInNav("productDetails", CollectionData);
                                break;

                            case "C_Product":
                                //Ti.API.info('inside c product');
                                if (!isNullVal(args.categoryType)) {

                                    if ((e.bindId).toString().lastIndexOf("1") != -1) {
                                        e.bindId = "gridWish1";
                                    } else if ((e.bindId).toString().lastIndexOf("2") != -1) {
                                        e.bindId = "gridWish2";
                                    }

                                    //Ti.API.info('args.categoryType = ' + args.categoryType);
                                    switch(args.categoryType) {
                                    case "shop":
                                        //Ti.API.info('shop');
                                        var pData = {
                                            Productid : _a[_bind].collectionId,
                                            block : "shop",
                                            product : "shopProduct",
                                            listObject : e,
                                            //listViewReference : updateItemListClick,
                                            listViewReference : addToCartCallback,

                                            category : "BED LINEN",
                                            type : "SHOP"
                                        };
                                        Alloy.Globals.addWindowInNav("estoreDetails", pData);
                                        break;
                                    case "wallpaper":
                                        //Ti.API.info('wallpaper');
                                        var pData = {
                                            Productid : _a[_bind].collectionId,
                                            block : "shop",
                                            product : "wallpaper",
                                            type : "shop",
                                            category : "wallpaper",
                                            listObject : e,
                                            //listViewReference : updateItemListClick,
                                            listViewReference : addToCartCallback,
                                        };
                                        Alloy.Globals.addWindowInNav("estoreDetails", pData);
                                        break;

                                    case "blinds":
                                        //Ti.API.info('blinds');
                                        var pData = {
                                            Productid : _a[_bind].collectionId,
                                            block : "blinds",
                                            navigatedblockid : "",
                                            type : "blinds",
                                            category : _a[_bind].category,
                                            listObject : e,
                                            //listViewReference : updateItemListClick,
                                            listViewReference : addToCartCallback,
                                        };

                                        Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
                                        break;

                                    case "Collectionfabrics":
                                        var pData = {
                                            Productid : _a[_bind].collectionId,
                                            block : "collection",
                                            navigatedblockid : "",
                                            type : "collection",
                                            category : _a[_bind].category,
                                            listObject : e,
                                            //listViewReference : updateItemListClick,
                                            listViewReference : addToCartCallback,
                                        };
                                        Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
                                        break;
                                    }
                                }

                                break;

                            }
                        }

                    }
                }
            }
        }
    } catch(ex) {
        Ti.API.info('catch item click = ' + ex.message);
    }
});

function addToCartCallback(e, productId) {
    try {
        //   Ti.API.info('else if'+e.bindId);
        var bind = e.bindId;
        var index = e.itemIndex;
        var a = e.section.items[index];

        if (!isNullVal(e.bindId) && e.bindId != "message") {

            if (!isNullVal(a[bind].collectionId)) {

                if (e.bindId == "gridCart1" || e.bindId == "gridCart2") {

                    if (activeTemplate == "gridTemplate") {
                        if (a[bind].backgroundColor == "#66000000") {
                            a[bind].backgroundColor = "#e65e48";
                            //a[bind].borderColor = "transparent";
                            e.section.updateItemAt(e.itemIndex, a);
                        }
                    }

                    if (activeTemplate == "listTypeTemplate" || activeTemplate == "blockTypeTemplate") {
                        if (a[bind].color == "#ffffff") {
                            a[bind].color = "#e65e48";
                            e.section.updateItemAt(e.itemIndex, a);
                        } else {
                            if (a[bind].color == "#a6a6a6") {
                                a[bind].color = "#e65e48";
                                e.section.updateItemAt(e.itemIndex, a);
                            }
                        }

                    }

                    addtocartItem.push(productId);

                } else if (e.bindId == "gridWish1" || e.bindId == "gridWish2") {
                    if (productId == "add") {
                        a[bind].text = "\ue927";
                        a[bind].color = "#e65e48";
                        e.section.updateItemAt(index, a);
                        selectedCartItem.push(a[bind].collectionId);
                    } else {
                        a[bind].text = "\ue60b";
                        a[bind].color = "#a6a6a6";
                        selectedCartItem.splice(selectedCartItem.indexOf(a[bind].collectionId), 1);
                        unSelectedCartItem.push(a[bind].collectionId);
                        e.section.updateItemAt(index, a);
                    }

                }

            }
        }
    } catch(ex) {
        Ti.API.info('ex.message = ' + ex.message);
    }

}

function addToCartSuccessCallback(e) {
    try {
        var bind = cartData.bindId;
        var index = cartData.itemIndex;
        var a = cartData.section.items[index];
        /*
        if (activeTemplate == "gridTemplate") {
        if (a[bind].color == "#ffffff") {
        a[bind].color = "#e65e48";
        cartData.section.updateItemAt(cartData.itemIndex, a);
        }
        } else {
        if (a[bind].color == "#a6a6a6") {
        a[bind].color = "#e65e48";
        cartData.section.updateItemAt(cartData.itemIndex, a);
        }
        }
        */
        //  Ti.API.info('a[bind].backgroundColor = '+a[bind].backgroundColor +" a[bind] ="+JSON.stringify(a[bind])+" activeTemplate ="+activeTemplate);
        if (activeTemplate == "gridTemplate") {
            //  Ti.API.info('inside if');
            if (a[bind].backgroundColor == "#66000000") {
                // Ti.API.info('inside color');
                a[bind].backgroundColor = "#e65e48";
                //a[bind].borderColor = "transparent";
                cartData.section.updateItemAt(cartData.itemIndex, a);
            }
        }

        if (activeTemplate == "listTypeTemplate" || activeTemplate == "blockTypeTemplate") {
            if (a[bind].color == "#ffffff") {
                a[bind].color = "#e65e48";
                cartData.section.updateItemAt(cartData.itemIndex, a);
            } else {
                if (a[bind].color == "#a6a6a6") {
                    a[bind].color = "#e65e48";
                    cartData.section.updateItemAt(cartData.itemIndex, a);
                }
            }

        }

        //addtocartItem = addtocartItem;
        addtocartItem.push(e.data[0].product_id);
        // if(addtocartItem.indexOf(e.data[0].product_id) == -1){
        // cartDataArray.push(e.data[0].product_id);
        // }

        Ti.App.Properties.setString("quote_id", e.data[0].quote_id);
        Ti.App.Properties.setString("cartCount", e.data[0].count);

        $.header.updateCartCount();
        showAlert($.productListing, e.message);

        var cartDataArray = [];
        cartDataArray = Titanium.App.Properties.getList('cartProductIdArray');
        if (cartDataArray.indexOf(e.data[0].product_id) == -1) {
            cartDataArray.push(e.data[0].product_id);
        }
        Titanium.App.Properties.setList('cartProductIdArray', cartDataArray);

        //Ti.API.info('Titanium.App.Properties.getObject() = '+Titanium.App.Properties.getList('cartProductIdArray'));

        googleAnalyticsBag(gaAddToCartData);

    } catch(ex) {
        Ti.API.info('ex.message = ' + ex.message);
    }
}

function addToCartErrorCallback(e) {
    showAlert($.productListing, e.message);

}

function addToShortlist(productData) {

    var bind_ = "",
        index_ = "",
        itemSection_ = "";
    if (!isNullVal(Ti.App.Properties.getString("access_token"))) {
        shortlistData = "";
        if (!isNullVal(productData.bindId)) {
            bind_ = productData.bindId;
            index_ = productData.itemIndex;
            itemSection_ = productData.section.items[index_];
            shortlistData = productData;

            if (itemSection_[bind_].text == "\ue60b") {
                /*display product as shortlisted before hit api
                */
                // Ti.API.info('itemSection_[bind_] = '+itemSection_[bind_]);
                Ti.API.info('itemSection_[bind_] = = ' + JSON.stringify(itemSection_[bind_]));

                //gaShortlistProduct = itemSection_[bind_].collectionName + "(" + itemSection_[bind_].product_sku + ")";
                gaShortlistProduct = {
                    name : itemSection_[bind_].collectionName,
                    sku : itemSection_[bind_].product_sku,
                    lostSale : itemSection_[bind_].lost_sale,
                };

                itemSection_[bind_].text = "\ue927";
                itemSection_[bind_].color = "#e65e48";
                productData.section.updateItemAt(index_, itemSection_);
                selectedCartItem.push(itemSection_[bind_].collectionId);
                ///end
                var url = Alloy.Globals.commonUrl.addToShortlist;
                var data = {
                    product_id : itemSection_[bind_].collectionId
                };
                var requestParams = JSON.stringify(data);

                Alloy.Globals.webServiceCall(url, requestParams, addToShortlistSuccessCallback, addToShortlistErrorCallback, "POST", $.productListing);
            } else {

                /*remove product as shortlisted before hit api
                 */

                itemSection_[bind_].text = "\ue60b";
                itemSection_[bind_].color = "#a6a6a6";
                productData.section.updateItemAt(index_, itemSection_);
                selectedCartItem.splice(selectedCartItem.indexOf(itemSection_[bind_].collectionId), 1);
                unSelectedCartItem.push(itemSection_[bind_].collectionId);

                var url = Alloy.Globals.commonUrl.removeShortlist;
                var data = {
                    product_id : itemSection_[bind_].collectionId,
                };
                var requestParams = JSON.stringify(data);
                Alloy.Globals.webServiceCall(url, requestParams, removeShortlistProductSuccessCallback, removeShortlistProductErrorCallback, "POST", $.productListing);

            }
        }
    } else {
        Alloy.Globals.addWindowInNav("signIn", "productListing");
    }
}

function addToShortlistSuccessCallback(e) {
    try {
        // var pbind = "",
        // pindex = "",
        // pitemSection = "";
        //
        // pbind = shortlistData.bindId;
        // pindex = shortlistData.itemIndex;
        // pitemSection = shortlistData.section.items[pindex];
        //pitemSection[pbind].text = "\ue927";
        //pitemSection[pbind].color = "#e65e48";
        //shortlistData.section.updateItemAt(shortlistData.itemIndex, pitemSection);
        //selectedCartItem.push(pitemSection[pbind].collectionId);

        showAlert($.productListing, e.message);

        googleAnalyticsShortlist(gaShortlistProduct, gaScreenName);

    } catch(e) {
        Ti.API.info('catch = ' + ex.message);
        // var pbind = "",
        // pindex = "",
        // pitemSection = "";
        //
        // pbind = shortlistData.bindId;
        // pindex = shortlistData.itemIndex;
        // pitemSection = shortlistData.section.items[pindex];
        // pitemSection[pbind].text = "\ue60b";
        // pitemSection[pbind].color = "#a6a6a6";
        // selectedCartItem.splice(selectedCartItem.indexOf(pitemSection[pbind].collectionId), 1);
        // unSelectedCartItem.push(pitemSection[pbind].collectionId);
        // shortlistData.section.updateItemAt(shortlistData.itemIndex, pitemSection);
    }
}

function addToShortlistErrorCallback(e) {
    var pbind = "",
        pindex = "",
        pitemSection = "";

    pbind = shortlistData.bindId;
    pindex = shortlistData.itemIndex;
    pitemSection = shortlistData.section.items[pindex];
    pitemSection[pbind].text = "\ue60b";
    pitemSection[pbind].color = "#a6a6a6";
    selectedCartItem.splice(selectedCartItem.indexOf(pitemSection[pbind].collectionId), 1);
    unSelectedCartItem.push(pitemSection[pbind].collectionId);
    shortlistData.section.updateItemAt(shortlistData.itemIndex, pitemSection);
    showAlert($.productListing, e.message);
}

function removeShortlistProductSuccessCallback(e) {
    try {
        // var pbind_ = "",
        // pindex_ = "",
        // pitemSection_ = "";
        //
        // pbind_ = shortlistData.bindId;
        // pindex_ = shortlistData.itemIndex;
        // pitemSection_ = shortlistData.section.items[pindex_];
        // pitemSection_[pbind_].text = "\ue60b";
        // pitemSection_[pbind_].color = "#a6a6a6";
        // selectedCartItem.splice(selectedCartItem.indexOf(e.data), 1);
        // unSelectedCartItem.push(e.data);
        // shortlistData.section.updateItemAt(shortlistData.itemIndex, pitemSection_);
        showAlert($.productListing, e.message);
    } catch(ex) {
        Ti.API.info('catch = ' + (ex.message));

        // var pbind_ = "",
        // pindex_ = "",
        // pitemSection_ = "";
        //
        // pbind_ = shortlistData.bindId;
        // pindex_ = shortlistData.itemIndex;
        // pitemSection_ = shortlistData.section.items[pindex_];
        // pitemSection_[pbind_].text = "\ue60b";
        // pitemSection_[pbind_].color = "#a6a6a6";
        // selectedCartItem.splice(selectedCartItem.indexOf(pitemSection_[pbind_].collectionId), 1);
        // unSelectedCartItem.push(pitemSection_[pbind_].collectionId);
        // shortlistData.section.updateItemAt(shortlistData.itemIndex, pitemSection_);

    }
}

function removeShortlistProductErrorCallback(e) {
    showAlert($.productListing, e.message);
    var pbind_ = "",
        pindex_ = "",
        pitemSection_ = "";

    pbind_ = shortlistData.bindId;
    pindex_ = shortlistData.itemIndex;
    pitemSection_ = shortlistData.section.items[pindex_];
    pitemSection_[pbind_].text = "\ue927";
    pitemSection_[pbind_].color = "#e65e48";
    selectedCartItem.push(pitemSection_[pbind_].collectionId);
    shortlistData.section.updateItemAt(shortlistData.itemIndex, pitemSection_);
}

$.productListing.addEventListener('click', hideOverFlowMenu);

function hideOverFlowMenu(e) {
    if (Alloy.Globals.overFlowFlag && e.source.id != "overFlowMenuLbl") {
        $.header.hideOverFlow();
    };
}

/*
 * Fetch All sub collection data
 */

function getSubCollection() {
    showLoader($.productListing);
    var url = "";
    listData = [];
    backupData = [];
    cartProductId = [];
    var data = {};
    $.mainSection.setItems(listData);
    if (!isNullVal(sortBy) || _.size(filters) > 0 || !isNullVal(selectedStyle)) {
        page_no = 1;
        limit = 10;
    }
    filtersData = {};

    if (_.size(filters) > 0) {
        _.each(filters, function(value, key) {
            if (value.length > 0) {
                filtersData[key] = value.join(",");
            }
        });
    }

    if (!isNullVal(args.type)) {
        switch(args.type) {
        case "shopByLook":
            url = Alloy.Globals.commonUrl.allLooks;
            data = {
                //"sortby" : sortBy || "latest",
                "sortby" : sortBy || "",
                "style" : selectedStyle || "ALL STYLES",
                //"pagination" : {}
            };

            data.pagination = {
                "page_no" : page_no,
                "page_size" : limit
            };

            if (_.size(filtersData) > 0) {
                data['filter_applied'] = filtersData;
            } else {
                data['filter_applied'] = "";
            }
            var requestParams = JSON.stringify(data);

            Alloy.Globals.webServiceCall(url, requestParams, subCollectionSuccessCallback, subCollectionErrorCallback, "POST", $.productListing, true);

            break;
        case "collection":
            if (!isNullVal(args.block)) {
                switch(args.block) {
                case "Allcollection":
                    url = Alloy.Globals.commonUrl.ourrange;
                    data = {
                        "category" : args.categoryName,
                        "categoryId" : args.categoryId,
                        //"sortby" : sortBy || "latest",
                        "sortby" : sortBy || "",
                        "pagination" : {}
                    };

                    data.pagination = {
                        "page_no" : page_no,
                        "page_size" : limit
                    };
                    if (_.size(filtersData) > 0) {
                        data['filters'] = filtersData;
                    } else {
                        data['filters'] = "";
                    }
                    break;
                case "collection":
                    url = Alloy.Globals.commonUrl.getSubCollection;
                    data = {
                        "collection_enduse" : args.categoryName,
                        //"sortby" : sortBy || "latest",
                        "sortby" : sortBy || "",
                        "pagination" : {}
                    };

                    data.pagination[args.categoryName] = {
                        "page_no" : page_no,
                        "page_size" : limit
                    };
                    if (_.size(filtersData) > 0) {
                        data['filters'] = filtersData;
                    } else {
                        data['filters'] = "";
                    }
                    break;
                }

                var requestParams = JSON.stringify(data);

                Alloy.Globals.webServiceCall(url, requestParams, subCollectionSuccessCallback, subCollectionErrorCallback, "POST", $.productListing, true);
            }
            break;
        case "C_Product":

            url = Alloy.Globals.commonUrl.ourrange;
            data = {
                "category" : args.wName,
                "categoryId" : args.categoryId,
                "sortby" : sortBy || "",
                "pagination" : {}
            };

            data.pagination = {
                "page_no" : page_no,
                "page_size" : limit
            };
            if (_.size(filtersData) > 0) {
                data['filters'] = filtersData;
            } else {
                data['filters'] = "";
            }

            var requestParams = JSON.stringify(data);

            Ti.API.info('requestParam---->>> ' + requestParams);

            Alloy.Globals.webServiceCall(url, requestParams, subCollectionSuccessCallback, subCollectionErrorCallback, "POST", $.productListing);

            break;

        default:

            break;
        }
    } else {
        Ti.API.info('in else');
    }
}

//getSubCollection();

function subCollectionSuccessCallback(e) {
    try {

        hideLoader($.productListing);
        if (!isNullVal(args.type)) {
            switch(args.type) {
            case "shopByLook":
                totalItem = e.data.looks_data.total_count;

                var text = "Total " + totalItem;

                if ($.styleScroll.children.length == 0) {
                    _.each(e.data.styles, function(value, k) {

                        styleOption[k] = Ti.UI.createLabel({
                            width : Ti.UI.FILL,
                            height : "35dp",
                            left : "10dp",
                            right : "10dp",
                            color : "#333333",
                            font : {
                                fontSize : "10dp",
                                fontFamily : "futura_medium_bt-webfont"
                            },
                            text : (!isNullVal(value)) ? value.toUpperCase() : value,
                            //text : value.toUpperCase(),
                            backgroundColor : "#ffffff",
                            //touchEnabled:false
                        });
                        $.styleScroll.add(styleOption[k]);

                    });
                }
                if (!isNullVal(e.data.looks_data.looks_list)) {
                    displayCount = e.data.looks_data.looks_list.length;
                    gridData = e.data.looks_data.looks_list;
                    looping_value(e.data.looks_data.looks_list, activeTemplate);
                } else {
                    displayCount = "";
                    gridData = "";
                    $.total_toast_lbl.setText("Total 00");
                }

                if (!isNullVal(args.style)) {
                    $.styleNameLbl.setText(args.style);
                }

                break;
            case "collection":
                if (!isNullVal(args.block)) {
                    switch(args.block) {
                    case "Allcollection":
                        totalItem = e.data.collection_data.total_count;
                        var text = "Total " + totalItem;

                        if (!isNullVal(e.data.collection_data.product_data)) {
                            displayCount = e.data.collection_data.product_data.length;
                            gridData = e.data.collection_data.product_data;
                            looping_value(e.data.collection_data.product_data, activeTemplate);
                        } else {
                            displayCount = "";
                            gridData = "";
                            $.total_toast_lbl.setText("Total 00");
                        }
                        break;
                    case "collection":
                        totalItem = e.data.collection_data[0].total_count;
                        var text = "Total " + totalItem;

                        if (!isNullVal(e.data.collection_data[0].product_data)) {
                            displayCount = e.data.collection_data[0].product_data.length;
                            gridData = e.data.collection_data[0].product_data;
                            looping_value(e.data.collection_data[0].product_data, activeTemplate);
                        } else {
                            displayCount = "";
                            gridData = "";
                            $.total_toast_lbl.setText("Total 00");
                        }
                        break;
                    }
                }

                break;

            case "C_Product":
                totalItem = e.data.product_data.total_count;
                var text = "Total " + totalItem;

                if (!isNullVal(e.data.product_data.product_listing)) {
                    displayCount = e.data.product_data.product_listing.length;
                    gridData = e.data.product_data.product_listing;
                    looping_value(e.data.product_data.product_listing, activeTemplate);
                } else {
                    displayCount = "";
                    gridData = "";
                    $.total_toast_lbl.setText("Total 00");
                }
                break;
            default:

                break;
            }

            var toast_attr = Ti.UI.createAttributedString({
                text : text,
                attributes : [{
                    type : Ti.UI.ATTRIBUTE_FONT,
                    value : {
                        fontSize : "10dp",
                        fontFamily : "futura_medium_bt-webfont"
                    },
                    range : [text.indexOf(totalItem + ""), (totalItem + "").length]
                }]
            });

            $.total_toast_lbl.attributedString = toast_attr;

        }
        filterRawData = e;
        addFilterByRows(filterRawData);

        if (displayCount == 0) {
            $.total_toast_lbl.setText("Total 00");
            $.filterContainer.visible = false;
            $.styleFilterView.visible = false;
            // $.optionContainer.visible=false;

            if (!isNullVal(args.type)) {
                switch(args.type) {
                case "shopByLook":
                    message = "THERE ARE NO COLLECTIONS IN THIS CATEGORY.";
                    break;
                case "collection":
                    message = "THERE ARE NO COLLECTIONS IN THIS CATEGORY.";
                    break;
                case "C_Product":
                    message = "THERE ARE NO PRODUCTS IN THIS CATEGORY.";
                    break;
                }
            }
            listData.push({
                properties : {

                },
                template : 'emptyTemplate',
                message : {
                    text : message
                }
            });
            $.mainSection.appendItems(listData);

        }
    } catch(ex) {
        Ti.API.info('catch error' + ex.message);
        showAlert($.productListing, "Something went wrong...");
        setTimeout(function() {
            goToBack();
        }, 1000);
    }

}

function addFilterByRows(e) {
    if (!isNullVal(e.data.filter_attributes)) {
        //Ti.API.info('e.data.filter_attributes = ' + e.data.filter_attributes.length);
        //Ti.API.info('e.data.filter_attributes[0] = ' + e.data.filter_attributes[0]);
        if (e.data.filter_attributes.length > 0) {
            sortTotalCount = e.data.sort_attributes.length;

            //Ti.API.info('e.data.filter_attributes.length = ' + e.data.filter_attributes.length);
            //Ti.API.info('filterByContainer = ' + $.filterByContainer.children.length);

            if ($.filterByContainer.children.length == 0) {
                _.each(e.data.filter_attributes, function(value, k) {

                    //Ti.API.info('value = ' + JSON.stringify(value));
                    //Ti.API.info('e.data.filter_attributes.options = ' + e.data.filter_attributes[0].options);
                    var code = value.code;
                    var title = value.title;
                    filterMainContainer[k] = Ti.UI.createView({
                        height : "35dp",
                        top : "0dp",
                        left : "0dp",
                        width : Titanium.UI.FILL,
                        layout : "vertical",
                        id : k,
                        type : "filterOption"
                    });

                    filterLbl[k] = Ti.UI.createLabel({
                        id : "lbl" + k,
                        font : {
                            fontSize : "13dp",
                            fontFamily : 'futura_lt_bt_light-webfont'
                        },
                        color : "#e65e48",
                        top : "0dp",
                        left : "0dp",
                        height : "35dp",
                        //borderColor : "green",
                        width : Titanium.UI.FILL,
                        touchEnabled : false,
                        text : value.title.toUpperCase(),
                        code : value.code
                    });
                    filterMainContainer[k].add(filterLbl[k]);

                    _.each(e.data.filter_attributes[k].options, function(value, l) {

                        //  Ti.API.info('value = ' + JSON.stringify(value));
                        // if(value.selected ==true ){
                        // text=tick;
                        // }else{
                        // text=untick;
                        // }
                        subFilterContainer[l] = Ti.UI.createView({
                            height : "35dp",
                            top : "0dp",
                            left : "0dp",
                            width : Titanium.UI.FILL,
                            id : l,
                            type : "filterSubOption",
                            value : value.value,
                            code : code,
                            title : title
                        });

                        checkFilterLbl[l] = Ti.UI.createLabel({
                            id : "lbl" + l,
                            font : {
                                fontSize : "14dp",
                                fontFamily : 'icomoon'
                            },
                            color : "#e65e48",
                            top : "0dp",
                            left : "0dp",
                            height : "35dp",
                            width : "30dp",
                            //borderColor : "green",
                            //  width:Titanium.UI.FILL,
                            touchEnabled : false,
                            text : "",
                        });
                        subFilterContainer[l].add(checkFilterLbl[l]);
                        subFilterLbl[l] = Ti.UI.createLabel({
                            id : "lbl" + l,
                            font : {
                                fontSize : "13dp",
                                fontFamily : 'futura_lt_bt_light-webfont'
                            },
                            color : "#ffffff",
                            top : "0dp",
                            left : "30dp",
                            height : "35dp",
                            //borderColor : "yellow",
                            width : Titanium.UI.FILL,
                            touchEnabled : false,
                            text : (!isNullVal(value.label)) ? value.label.toUpperCase() : value.label,
                            //text : value.label.toUpperCase()

                        });
                        subFilterContainer[l].add(subFilterLbl[l]);
                        filterMainContainer[k].add(subFilterContainer[l]);

                    });

                    $.filterByContainer.add(filterMainContainer[k]);
                });
            }
            if ($.sortDetails.children.length == 0) {
                _.each(e.data.sort_attributes, function(value, k) {

                    sortContainer[k] = Ti.UI.createView({
                        height : "35dp",
                        top : "0dp",
                        left : "0dp",
                        width : Titanium.UI.FILL,
                        layout : "vertical",
                        id : k,
                        type : "sortOption"
                    });

                    $.sortDetails.add(sortContainer[k]);

                    sortLbl[k] = Ti.UI.createLabel({
                        id : "lbl" + k,
                        font : {
                            fontSize : "13dp",
                            fontFamily : 'futura_lt_bt_light-webfont'
                        },
                        color : "#e65e48",
                        top : "0dp",
                        left : "0dp",
                        width : Titanium.UI.FILL,
                        touchEnabled : false,
                        // value.label
                        text : value.name.toUpperCase(),
                        value : value.value
                    });

                    sortContainer[k].add(sortLbl[k]);

                });
            }
        }
    }
}

function subCollectionErrorCallback(e) {
    // Ti.API.info('error = ' + JSON.stringify(e));
    hideLoader($.productListing);
    showAlert($.productListing, e.message);
    displayCount = 0;
    $.total_toast_lbl.setText("Total 00");
    $.filterContainer.visible = false;
    $.styleFilterView.visible = false;
    // $.optionContainer.visible=false;

    message = "";
    if (!isNullVal(args.type)) {
        switch(args.type) {
        case "shopByLook":
            message = "THERE ARE NO COLLECTIONS IN THIS CATEGORY.";
            break;
        case "collection":
            message = "THERE ARE NO COLLECTIONS IN THIS CATEGORY.";
            break;
        case "C_Product":
            message = "THERE ARE NO PRODUCTS IN THIS CATEGORY.";
            break;
        }
    }

    listData.push({
        properties : {

        },
        template : 'emptyTemplate',
        message : {
            text : message
        }
    });
    $.mainSection.appendItems(listData);
}

$.sortDetails.removeEventListener('click', sortBySelectedEffect);
$.sortDetails.addEventListener('click', sortBySelectedEffect);

function sortBySelectedEffect(e) {
    if (e.source.type == "sortOption") {

        for (var i = 0; i < sortTotalCount; i++) {
            var sortText = sortLbl[i].text;
            sortLbl[i].applyProperties(style1);
            var attr = Ti.UI.createAttributedString({
                text : sortText,
                attributes : [{
                    type : Titanium.UI.ATTRIBUTE_UNDERLINES_STYLE,
                    range : [0, 0]
                }]
            });
            sortLbl[i].attributedString = attr;
        }

        e.source.children[0].applyProperties(style);
        var text = e.source.children[0].text;
        var attr = Ti.UI.createAttributedString({
            text : text,
            attributes : [{
                type : Titanium.UI.ATTRIBUTE_UNDERLINES_STYLE,
                range : [0, text.length]
            }]
        });
        e.source.children[0].attributedString = attr;
        sortBy = e.source.children[0].value;
        //getFilterData();
        getSubCollection();
        hideShowView($.sortView);
        // setTimeout(function() {
        // hideShowView($.sortView);
        // }, 1500);

    }
}

$.filterByContainer.addEventListener('click', function(e) {

    if (e.source.height == "35dp" && e.source.type == "filterOption") {
        _.each($.filterByContainer.children, function(value, k) {
            $.filterByContainer.children[k].children[0].applyProperties(style1);
            $.filterByContainer.children[k].height = "35dp";
        });

        e.source.height = Titanium.UI.SIZE;
        e.source.children[0].applyProperties(style);
    } else if (e.source.type == "filterOption" && e.source.height == "size") {
        e.source.height = "35dp";

        if ( typeof filters[e.source.children[0].code] != "undefined") {
            if (filters[e.source.children[0].code].length != 0) {
                e.source.children[0].applyProperties(style);
            } else {
                e.source.children[0].applyProperties(style1);
            }

        }
    }

    if (e.source.type == "filterOption") {
        lastOpenView = e.source.id;

        //e.source.children[0].applyProperties(style);
        if ( typeof filters[e.source.children[0].code] == "undefined") {

            filters[e.source.children[0].code] = [];
        }
    }

    if (e.source.type == "filterSubOption" && e.source.children[0].text == "") {

        e.source.children[0].text = "\ue925";
        filters[e.source.code].push(e.source.value);
        e.source.parent.children[0].text = e.source.title.toUpperCase() + " (" + filters[e.source.code].length + ")".toUpperCase();
    } else if (e.source.type == "filterSubOption" && e.source.children[0].text == "\ue925") {
        e.source.children[0].text = "";
        filters[e.source.code].splice(filters[e.source.code].indexOf(e.source.value), 1);

        if (filters[e.source.code].length == 0) {
            e.source.parent.height = "35dp";
            e.source.parent.children[0].applyProperties(style1);
            e.source.parent.children[0].text = e.source.title.toUpperCase();
        } else {
            e.source.parent.children[0].applyProperties(style);
            e.source.parent.children[0].text = e.source.title.toUpperCase() + " (" + filters[e.source.code].length + ")".toUpperCase();
        }
    }
});

function looping_value(loopData, templateName) {
    // Ti.API.info('catergoryName -->' + args.categoryName);

    try {
        listData = [];
        var cartDataArray = [];
        var cartIdArray = [];
        //  backupData = [];
        switch(templateName) {
        case "gridTemplate":
            _.each(loopData, function(value, k) {
                backupData.push(value);

                if (!isNullVal(value.product_id) && !value.cartItem) {
                    cartProductId.push(value.product_id);
                }

            });
            var size = 2;
            var gridDataArr = [];
            var myDataArrCounter = 0;
            for (var i = 0; i < loopData.length; i += size) {
                var smallPaginationArray = loopData.slice(i, i + size);
                gridDataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallPaginationArray) + "");
                myDataArrCounter++;
            }
            var subGridData = "{" + gridDataArr + "}";
            var finalGridData = JSON.parse(subGridData);
            loopData = finalGridData;
            break;

        }

        _.each(loopData, function(value, k) {

            // Ti.API.info('value = '+JSON.stringify(value));

            if (templateName != "gridTemplate") {
                backupData.push(value);
                if (!isNullVal(value.product_id) && !value.cartItem) {
                    cartProductId.push(value.product_id);
                }
            }

            if (value) {
                if (value.wishlistItem == true) {
                    isSelected_0 = Alloy.Globals.icon.setShortlist;
                    wishIconColor_0 = "#e65e48";
                } else {
                    isSelected_0 = Alloy.Globals.icon.shortlist;
                    wishIconColor_0 = "#a6a6a6";
                }

                if (isNullVal(value.in_stock)) {

                    if (value.in_stock == 1) {

                        outOfStock1 = false;
                    } else if (value.in_stock == 0) {
                        outOfStock1 = true;
                    }
                } else {
                    outOfStock1 = undefined;
                }

            }
            if (value[0]) {
                //  Ti.API.info('value[0]');
                if (value[0].wishlistItem == true) {
                    isSelected_0 = Alloy.Globals.icon.setShortlist;
                    wishIconColor_0 = "#e65e48";
                } else {
                    isSelected_0 = Alloy.Globals.icon.shortlist;
                    wishIconColor_0 = "#a6a6a6";
                }
                if (value[1]) {
                    if (value[1].wishlistItem == true) {
                        isSelected_1 = Alloy.Globals.icon.setShortlist;
                        wishIconColor_1 = "#e65e48";

                    } else {
                        isSelected_1 = Alloy.Globals.icon.shortlist;
                        wishIconColor_1 = "#a6a6a6";
                    }
                } else {
                    wishIconColor_1 = "transparent";
                    isSelected_1 = "";
                }

                /*New condition for OUT OF STOCK */
                //  Ti.API.info('value[0].in_stock = '+value[0].in_stock);
                if (isNullVal(value[0].in_stock)) {
                    //Ti.API.info('value[0] \t' + value[0].in_stock);
                    // Ti.API.info('value[1] \t' + value[1].in_stock);

                    if (value[0].in_stock == 1) {

                        outOfStock1 = false;
                    } else if (value[0].in_stock == 0) {
                        outOfStock1 = true;
                    }
                } else {
                    outOfStock1 = undefined;
                }

                //  Ti.API.info('outOfStock1 = '+outOfStock1);

            }

            if (value[1]) {
                /*New condition for OUT OF STOCK */
                // Ti.API.info('value[0].in_stock = '+value[0].in_stock);
                if (isNullVal(value[1].in_stock)) {
                    if (value[1].in_stock == 1) {
                        outOfStock2 = false;
                    } else if (value[1].in_stock == 0) {
                        outOfStock2 = true;
                    }
                } else {
                    outOfStock2 = undefined;
                }

                // Ti.API.info('outOfStock2 = '+outOfStock2);
            } else {

                outOfStock2 = false;
            }

            // else {
            // isSelected_0 = "";
            // }
            if (!isNullVal(args.type)) {
                switch(args.type) {
                case "shopByLook":
                    if (value) {

                        gridProductname1 = value.looks_name;
                        collectionId1 = value.looks_id;
                        collectionImage1 = encodeURI(value.profile_image);
                        //collectionImage1 = "/images/product1.jpg";
                        gridWhereToBuy1 = "Where to buy";
                        //gridCart1 = Alloy.Globals.icon.bag;
                        gridShare1 = Alloy.Globals.icon.share;
                        gridWish1 = isSelected_0;
                        gridCart1 = "";
                        productSize1 = "";
                        productFontSize1 = "0";
                        shareUrl1 = value.collection_url ? value.collection_url : (value.product_url ? value.product_url : (value.url ? value.url : ""));
                    }
                    if (templateName == "gridTemplate") {
                        if (value[0]) {

                            gridProductname1 = value[0].looks_name;
                            collectionId1 = value[0].looks_id;
                            collectionImage1 = encodeURI(value[0].profile_image);
                            //collectionImage1 = "/images/product1.jpg";
                            gridWhereToBuy1 = "Where to buy";
                            //gridCart1 = Alloy.Globals.icon.bag;
                            gridShare1 = Alloy.Globals.icon.share;
                            gridWish1 = isSelected_0;
                            gridCart1 = "";
                            productSize1 = "";
                            productFontSize1 = "0";
                            shareUrl1 = value[0].collection_url ? value[0].collection_url : (value[0].product_url ? value[0].product_url : (value[0].url ? value[0].url : ""));
                            if (value[1]) {

                                gridProductname2 = value[1].looks_name;
                                collectionId2 = value[1].looks_id;
                                collectionImage2 = encodeURI(value[1].profile_image);
                                //collectionImage2 = "/images/product2.jpg";
                                gridWhereToBuy2 = "Where to buy";
                                //gridCart2 = Alloy.Globals.icon.bag;
                                gridShare2 = Alloy.Globals.icon.share;
                                gridWish2 = isSelected_1;
                                gridCart2 = "";
                                productSize2 = "";
                                imageContainer = "#eeece7";
                                productFontSize2 = "0";
                                //f4f4f4
                                logoText = "\ue955";
                                shareUrl2 = value[1].collection_url ? value[1].collection_url : (value[1].product_url ? value[1].product_url : (value[1].url ? value[1].url : ""));
                                //\ue92a
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
                                productSize2 = "";
                                productFontSize2 = "0";
                                shareUrl2 = "";
                            }
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
                    }
                    break;
                case "collection":
                    if (value) {

                        gridProductname1 = value.collection_name;
                        collectionId1 = value.collection_id;
                        collectionImage1 = encodeURI(value.image);
                        //collectionImage1 = "/images/product1.jpg";
                        gridWhereToBuy1 = "Where to buy";
                        //gridCart1 = Alloy.Globals.icon.bag;
                        gridShare1 = Alloy.Globals.icon.share;
                        gridWish1 = isSelected_0;
                        gridCart1 = "";
                        productSize1 = "";
                        shareUrl1 = value.collection_url ? value.collection_url : (value.product_url ? value.product_url : (value.url ? value.url : ""));

                        productFontSize1 = "0";
                    }
                    if (templateName == "gridTemplate") {
                        if (value[0]) {

                            gridProductname1 = value[0].collection_name;
                            collectionId1 = value[0].collection_id;
                            collectionImage1 = encodeURI(value[0].image);
                            //collectionImage1 = "/images/product1.jpg";
                            gridWhereToBuy1 = "Where to buy";
                            //gridCart1 = Alloy.Globals.icon.bag;
                            gridShare1 = Alloy.Globals.icon.share;
                            gridWish1 = isSelected_0;
                            gridCart1 = "";
                            productSize1 = "";
                            productFontSize1 = "0";
                            shareUrl1 = value[0].collection_url ? value[0].collection_url : (value[0].product_url ? value[0].product_url : (value[0].url ? value[0].url : ""));

                            if (value[1]) {
                                gridProductname2 = value[1].collection_name;
                                collectionId2 = value[1].collection_id;
                                collectionImage2 = encodeURI(value[1].image);
                                //collectionImage2 = "/images/product2.jpg";
                                gridWhereToBuy2 = "Where to buy";
                                //gridCart2 = Alloy.Globals.icon.bag;
                                gridShare2 = Alloy.Globals.icon.share;
                                gridWish2 = isSelected_1;
                                gridCart2 = "";
                                imageContainer = "#eeece7";
                                //f4f4f4
                                shareUrl2 = value[1].collection_url ? value[1].collection_url : (value[1].product_url ? value[1].product_url : (value[1].url ? value[1].url : ""));
                                logoText = "\ue955";
                                productSize2 = "";
                                productFontSize2 = "0";
                                //\ue92a
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
                                productSize2 = "";
                                productFontSize2 = "0";
                            }
                        } else {
                            gridProductname1 = "";
                            collectionId1 = "";
                            collectionImage1 = "";
                            gridWhereToBuy1 = "";
                            gridCart1 = "";
                            gridShare1 = "";
                            gridWish1 = "";
                            productSize1 = "";
                            productFontSize1 = "0";
                            shareUrl1 = "";
                        }
                    }
                    break;
                case "C_Product":

                    //Ti.API.info('value.product_name = ' + value.product_name.toUpperCase());

                    if (value) {
                        gridProductname1 = value.product_name;
                        collectionId1 = value.product_id;
                        collectionImage1 = encodeURI(value.image);
                        //collectionImage1 = "/images/product1.jpg";
                        gridWhereToBuy1 = Alloy.Globals.icon.currency + value.product_price;
                        gridCart1 = Alloy.Globals.icon.bag;
                        gridShare1 = Alloy.Globals.icon.share;
                        gridWish1 = isSelected_0;
                        shareUrl1 = value.collection_url ? value.collection_url : (value.product_url ? value.product_url : (value.url ? value.url : ""));
                        // productSize1 = value.product_size;
                        // productFontSize1 = "9";
                        //gridCart1 = "";
                    }
                    if (templateName == "gridTemplate") {
                        if (value[0]) {
                            product_sku1 = value[0].product_sku;
                            gridProductname1 = value[0].product_name;
                            collectionId1 = value[0].product_id;
                            collectionImage1 = encodeURI(value[0].image);
                            //collectionImage1 = "/images/product1.jpg";
                            gridWhereToBuy1 = Alloy.Globals.icon.currency + value[0].product_price;
                            gridCart1 = Alloy.Globals.icon.bag;
                            gridShare1 = Alloy.Globals.icon.share;
                            gridWish1 = isSelected_0;
                            shareUrl1 = value[0].collection_url ? value[0].collection_url : (value[0].product_url ? value[0].product_url : (value[0].url ? value[0].url : ""));
                            // productSize1 = value[0].product_size;
                            // productFontSize1 = "9";
                            //  gridCart1 = "";

                            if (value[1]) {
                                product_sku2 = value[1].product_sku;
                                gridProductname2 = value[1].product_name;
                                collectionId2 = value[1].product_id;
                                collectionImage2 = encodeURI(value[1].image);
                                //collectionImage2 = "/images/product2.jpg";
                                gridWhereToBuy2 = Alloy.Globals.icon.currency + value[1].product_price;
                                gridCart2 = Alloy.Globals.icon.bag;
                                gridShare2 = Alloy.Globals.icon.share;
                                gridWish2 = isSelected_1;
                                shareUrl2 = value[1].collection_url ? value[1].collection_url : (value[1].product_url ? value[1].product_url : (value[1].url ? value[1].url : ""));
                                // productSize2 = value[1].product_size;
                                // productFontSize2 = "9";
                                /// gridCart2 = "";
                                imageContainer = "#eeece7";
                                //f4f4f4
                                logoText = "\ue955";
                                //\ue92a
                            } else {
                                product_sku2 = "";
                                gridProductname2 = "";
                                collectionId2 = "";
                                collectionImage2 = "";
                                gridWhereToBuy2 = "";
                                gridCart2 = "";
                                gridShare2 = "";
                                gridWish2 = "";
                                productSize2 = "";
                                imageContainer = "#ffffff";
                                logoText = "";
                                shareUrl2 = "";
                                productFontSize2 = "0";
                            }
                        } else {
                            product_sku1 = "";
                            gridProductname1 = "";
                            collectionId1 = "";
                            collectionImage1 = "";
                            gridWhereToBuy1 = "";
                            gridCart1 = "";
                            shareUrl1 = "";
                            productSize1 = "";
                            gridShare1 = "";
                            gridWish1 = "";
                            productFontSize1 = "0";
                        }
                    }

                    if (args.categoryType == "shop") {
                        gridCart1 = Alloy.Globals.icon.bag;
                        gridCart2 = Alloy.Globals.icon.bag;

                        //productFontSize1 = "9";
                        //productFontSize2 = "9";

                        ////

                        if (value) {
                            if (value.cartItem == true) {

                                cartIconColor_0 = "#e65e48";

                                cartIdArray = Titanium.App.Properties.getList('cartProductIdArray');
                                if (cartIdArray.indexOf(collectionId1) == -1) {
                                    cartIdArray.push(collectionId1);
                                }
                                Titanium.App.Properties.setList('cartProductIdArray', cartIdArray);

                            } else {
                                if (activeTemplate == "gridTemplate") {
                                    //cartIconColor_0 = "#ffffff";
                                    cartIconColor_0 = "#66000000";
                                } else {
                                    cartIconColor_0 = "#a6a6a6";
                                }
                            }

                            if (value.product_size == "NA") {
                                productSize1 = "";
                                productFontSize1 = "0";
                            } else {
                                productSize1 = value.product_size;
                                productFontSize1 = "9";
                            }
                            cartDataArray = Titanium.App.Properties.getList('cartAllid');
                            if (cartDataArray.indexOf(collectionId1) == -1) {
                                cartDataArray.push(collectionId1);
                            }
                            Titanium.App.Properties.setList('cartAllid', cartDataArray);

                        }

                        if (value[0]) {
                            //productSize1 = value[0].product_size;
                            cartDataArray = Titanium.App.Properties.getList('cartAllid');
                            if (cartDataArray.indexOf(collectionId1) == -1) {
                                cartDataArray.push(collectionId1);
                            }
                            Titanium.App.Properties.setList('cartAllid', cartDataArray);
                            // Ti.API.info('cartDataArray ='+cartDataArray);
                            if (value[0].product_size == "NA") {
                                productSize1 = "";
                                productFontSize1 = "0";
                            } else {
                                productSize1 = value[0].product_size;
                                productFontSize1 = "9";
                            }

                            if (value[0].cartItem == true) {

                                cartIconColor_0 = "#e65e48";

                                cartIdArray = Titanium.App.Properties.getList('cartProductIdArray');
                                if (cartIdArray.indexOf(collectionId1) == -1) {
                                    cartIdArray.push(collectionId1);
                                }
                                Titanium.App.Properties.setList('cartProductIdArray', cartIdArray);

                                // cartDataArray = Titanium.App.Properties.getList('cartAllid');
                                // if(cartDataArray.indexOf(collectionId1) == -1){
                                // cartDataArray.push(collectionId1);
                                // }
                                // Titanium.App.Properties.setList('cartAllid',cartDataArray);
                                // Ti.API.info('cartDataArray ='+cartDataArray);
                            } else {

                                if (activeTemplate == "gridTemplate") {
                                    // cartIconColor_0 = "#ffffff";
                                    cartIconColor_0 = "#66000000";
                                } else {
                                    cartIconColor_0 = "#a6a6a6";
                                }
                            }
                            if (value[1]) {

                                cartDataArray = Titanium.App.Properties.getList('cartAllid');
                                if (cartDataArray.indexOf(collectionId2) == -1) {
                                    cartDataArray.push(collectionId2);
                                }
                                Titanium.App.Properties.setList('cartAllid', cartDataArray);
                                //  Ti.API.info('cartDataArray ='+cartDataArray);

                                if (value[1].product_size == "NA") {
                                    productSize2 = "";
                                    productFontSize2 = "0";
                                } else {
                                    productSize2 = value[1].product_size;
                                    productFontSize2 = "9";
                                }
                                if (value[1].cartItem == true) {

                                    cartIconColor_1 = "#e65e48";

                                    cartIdArray = Titanium.App.Properties.getList('cartProductIdArray');
                                    if (cartIdArray.indexOf(collectionId2) == -1) {
                                        cartIdArray.push(collectionId2);
                                    }
                                    Titanium.App.Properties.setList('cartProductIdArray', cartIdArray);

                                    // cartDataArray = Titanium.App.Properties.getList('cartAllid');
                                    // if(cartDataArray.indexOf(collectionId2) == -1){
                                    // cartDataArray.push(collectionId2);
                                    // }
                                    // Titanium.App.Properties.setList('cartAllid',cartDataArray);
                                    // Ti.API.info('cartDataArray ='+cartDataArray);

                                } else {

                                    if (activeTemplate == "gridTemplate") {
                                        // cartIconColor_1 = "#ffffff";
                                        cartIconColor_1 = "#66000000";
                                    } else {
                                        cartIconColor_1 = "#a6a6a6";
                                    }
                                }
                            } else {
                                gridCart2 = "";
                                productSize2 = "";
                                productFontSize2 = 0;
                            }
                        }
                    } else {
                        gridCart1 = "";
                        gridCart2 = "";
                        productSize1 = "";
                        productSize2 = "";
                        productFontSize1 = "0";
                        productFontSize2 = "0";
                    }

                    break;
                default:

                    break;
                }
            }
            //Ti.API.info('cartDataArray ='+cartDataArray);
            listData.push({
                properties : {
                    collectionId1 : collectionId1,

                    //collectionId2 : collectionId2
                },
                template : templateName,
                gridProductname1 : {
                    text : (!isNullVal(gridProductname1)) ? gridProductname1.toUpperCase() : gridProductname1,
                    // text : gridProductname1.toUpperCase(),
                    collectionId : collectionId1,
                    category : (args.categoryName || "")
                },
                gridProductname2 : {
                    text : (!isNullVal(gridProductname2)) ? gridProductname2.toUpperCase() : gridProductname2,
                    // text : gridProductname2.toUpperCase(),
                    collectionId : collectionId2,
                    category : (args.categoryName || "")
                },
                gridCart1 : {
                    text : gridCart1,
                    product_name_ga : (!isNullVal(gridProductname1)) ? gridProductname1.toUpperCase() : gridProductname1,
                    product_sku : product_sku1,
                    // color : cartIconColor_0,
                    // color : "#fff",
                    //   backgroundColor : cartIconColor_0,
                    // borderColor : cartIconColor_0,
                    // borderColor:"transparent",
                    collectionId : collectionId1,
                    category : (args.categoryName || ""),
                    //    borderColor : (templateName == "gridTemplate" ? cartIconColor_0 : "#fff"),
                    color : (templateName == "gridTemplate" ? "#fff" : cartIconColor_0),
                    backgroundColor : (templateName == "gridTemplate" ? cartIconColor_0 : "transparent"),
                    visible : (gridCart1 == "" ? false : ((outOfStock1) ? false : true)), // comment for time begin @Darshana
                    // visible : false
                },
                gridCart2 : {
                    text : gridCart2,
                    product_name_ga : (!isNullVal(gridProductname2)) ? gridProductname2.toUpperCase() : gridProductname2,
                    product_sku : product_sku2,
                    // color : cartIconColor_1,
                    // color : "#fff",
                    //  backgroundColor : cartIconColor_1,
                    //  borderColor : cartIconColor_1,
                    //  borderColor:"transparent",
                    collectionId : collectionId2,
                    category : (args.categoryName || ""),
                    // borderColor : (templateName == "gridTemplate" ? cartIconColor_1 : "#fff"),
                    color : (templateName == "gridTemplate" ? "#fff" : cartIconColor_1),
                    backgroundColor : (templateName == "gridTemplate" ? cartIconColor_1 : "transparent"),
                    visible : (gridCart2 == "" ? false : ((outOfStock2) ? false : true)),
                    // visible : false
                },
                gridShare1 : {
                    collectionId : collectionId1,
                    text : gridShare1,
                    shareUrl : shareUrl1,
                    category : (args.categoryName || "")
                },
                gridShare2 : {
                    collectionId : collectionId2,
                    text : gridShare2,
                    shareUrl : shareUrl2,
                    category : (args.categoryName || "")
                },
                gridWish1 : {
                    collectionId : collectionId1,
                    iconValue : "\ue60b",
                    text : gridWish1,
                    color : wishIconColor_0,
                    collectionName : gridProductname1,
                    category : (args.categoryName || ""),
                    product_sku : product_sku1,
                    lost_sale : (outOfStock1) ? true : false,
                },
                gridWish2 : {
                    collectionId : collectionId2,
                    iconValue : "\ue60b",
                    text : gridWish2,
                    color : wishIconColor_1,
                    collectionName : gridProductname2,
                    category : (args.categoryName || ""),
                    product_sku : product_sku2,
                    lost_sale : (outOfStock2) ? true : false,
                },
                gridProductImage1 : {
                    image : collectionImage1,
                    collectionId : collectionId1,
                    category : (args.categoryName || ""),
                    //image : "/images/product1.jpg"
                },
                gridProductImage2 : {
                    image : collectionImage2,
                    collectionId : collectionId2,
                    category : (args.categoryName || "")
                    //image : "/images/product2.jpg"
                },
                gridWhereToBuy1 : {
                    text : gridWhereToBuy1,
                    product_name_ga : (!isNullVal(gridProductname1)) ? gridProductname1.toUpperCase() : gridProductname1,
                    collectionId : collectionId1,
                    category : (args.categoryName || "")
                },
                gridWhereToBuy2 : {
                    text : gridWhereToBuy2,
                    product_name_ga : (!isNullVal(gridProductname2)) ? gridProductname2.toUpperCase() : gridProductname2,
                    collectionId : collectionId2,
                    category : (args.categoryName || "")
                },
                listContainer : {
                    collectionId : collectionId1,
                    category : (args.categoryName || "")
                },
                productSize1 : {
                    collectionId : collectionId1,
                    text : (!isNullVal(productSize1)) ? productSize1.toUpperCase() : productSize1,
                    font : {
                        fontSize : productFontSize1
                    },
                    category : (args.categoryName || "")
                },
                productSize2 : {
                    collectionId : collectionId2,
                    text : (!isNullVal(productSize2)) ? productSize2.toUpperCase() : productSize2,
                    font : {
                        fontSize : productFontSize2
                    },
                    category : (args.categoryName || "")
                },
                imageContainer : {
                    backgroundColor : imageContainer,
                    category : (args.categoryName || "")
                },
                gridLogo : {
                    text : logoText,
                    category : (args.categoryName || "")
                },

                outOfStock1 : {
                    visible : (outOfStock1 || false),
                    collectionId : collectionId1,
                },
                outOfStock2 : {
                    visible : (outOfStock2 || false),
                    collectionId : collectionId2,
                }

            });
        });

        Titanium.App.Properties.setList('cartAllid', cartDataArray);

        //      Ti.API.info('Titanium.App.Properties.cartAllid() = '+Titanium.App.Properties.getList('cartAllid'));

        $.mainSection.appendItems(listData);
        $.activityInd.hide();
        page_no++;
        if (page_no <= (Math.ceil(totalItem / limit))) {
            switch(templateName) {
            case "gridTemplate":
                $.listView.setMarker({
                    sectionIndex : 0,
                    itemIndex : ((page_no - 1) * 5) - 1,
                });
                //Ti.API.info('markerset on ' + (((page_no - 1) * 5) - 1));
                break;
            default:
                $.listView.setMarker({
                    sectionIndex : 0,
                    itemIndex : ((page_no - 1) * 10) - 1,
                });
            //Ti.API.info('markerset on ' + (((page_no - 1) * 10) - 1));
            }

            //page_no++;
        }
    } catch(e) {
        Ti.API.info('catch looping' + (e.message));
    }
}

function viewTypeLooping(viewTypeData, templateName) {

    listData = [];
    var addFlag = null;
    var removeFlag = null;
    $.mainSection.setItems(listData);
    if (args.type == "C_Product") {

        //  Titanium.App.Properties.getList('removeCartProductIdArray');
        addFlag = Titanium.App.Properties.getList('removeCartProductIdArray');
        removeFlag = Titanium.App.Properties.getList('cartProductIdArray');
        //   Ti.API.info('Titanium.App.Properties.getList(cartProductIdArray) before = '+Titanium.App.Properties.getList('cartProductIdArray'));
        if (addFlag[0] == removeFlag[0] && addFlag.length == 1 && removeFlag.length == 1) {
            //  Ti.API.info('if view type loop');
            //Titanium.App.Properties.setList('cartProductIdArray').splice(Titanium.App.Properties.getList('cartProductIdArray').indexOf(Titanium.App.Properties.getList('removeCartProductIdArray')), 1);
            Titanium.App.Properties.setList('cartProductIdArray', []);
        }
        //    Ti.API.info('addFlag = '+addFlag);
        //     Ti.API.info('removeFlag = '+removeFlag);
        // _.each(Titanium.App.Properties.getList('removeCartProductIdArray'), function(k, v) {
        //
        // cartProductId.splice(cartProductId.indexOf(k), 1);
        // // if(Titanium.App.Properties.getList('removeCartProductIdArray').indexOf(e.data[0].product_id) != -1){
        // // addtocartItem.splice(cartProductId.indexOf(k), 1);
        // // }
        // var found = _.findWhere(viewTypeData, {
        // product_id : k
        // });
        // if (!isNullVal(found)) {
        // found.cartItem = false;
        // }
        //
        // });

        //        Ti.API.info('cartProductId = '+cartProductId);
        //         Ti.API.info('addtocartItem = '+addtocartItem);

        // _.each(Titanium.App.Properties.getList('removeCartProductIdArray'),function(k,v){
        // // Ti.API.info('k='+k);
        // cartProductId.splice(cartProductId.indexOf(k), 1);
        // });

        //  Ti.API.info('Titanium.App.Properties.getList(cartAllid) = '+Titanium.App.Properties.getList('cartAllid'));
        //Titanium.App.Properties.getList('cartAllid');

        _.each(Titanium.App.Properties.getList('cartAllid'), function(value, k) {
            // Ti.API.info('inside addtocartItem'+value);
            //if(Titanium.App.Properties.getList('removeCartProductIdArray').indexOf(value) == -1){
            var found = _.findWhere(viewTypeData, {
                product_id : value
            });
            if (!isNullVal(found)) {
                found.cartItem = false;
            }
            // }
        });

        _.each(Titanium.App.Properties.getList('removeCartProductIdArray'), function(k, v) {

            //cartProductId.splice(cartProductId.indexOf(k), 1);
            // if(Titanium.App.Properties.getList('removeCartProductIdArray').indexOf(e.data[0].product_id) != -1){
            // addtocartItem.splice(cartProductId.indexOf(k), 1);
            // }
            var found = _.findWhere(viewTypeData, {
                product_id : k
            });
            if (!isNullVal(found)) {
                found.cartItem = false;
            }

        });

        //  Ti.API.info('Titanium.App.Properties.getList(cartProductIdArray) = '+Titanium.App.Properties.getList('cartProductIdArray'));
        _.each(Titanium.App.Properties.getList('cartProductIdArray'), function(k, v) {

            var found = _.findWhere(viewTypeData, {
                product_id : k
            });
            if (!isNullVal(found)) {
                found.cartItem = true;
            }

        });

        // Titanium.App.Properties.getList('cartProductIdArray');

        // _.each(addtocartItem, function(value, k) {
        // // Ti.API.info('inside addtocartItem'+value);
        // //if(Titanium.App.Properties.getList('removeCartProductIdArray').indexOf(value) == -1){
        // var found = _.findWhere(viewTypeData, {
        // product_id : value
        // });
        // if (!isNullVal(found)) {
        // found.cartItem = true;
        // }
        // // }
        // });

        // _.each(cartProductId, function(value, k) {
        // // Ti.API.info('inside cartProductId'+value);
        // var found = _.findWhere(viewTypeData, {
        // product_id : value
        // });
        // if (!isNullVal(found)) {
        // found.cartItem = false;
        // }
        // });

        _.each(unSelectedCartItem, function(value, k) {
            var found = _.findWhere(viewTypeData, {
                product_id : value
            });
            if (!isNullVal(found)) {
                found.wishlistItem = false;
            }

        });

        _.each(selectedCartItem, function(value, k) {
            var found = _.findWhere(viewTypeData, {
                product_id : value
            });
            if (!isNullVal(found)) {
                found.wishlistItem = true;
            }

        });

        if (addFlag[0] == removeFlag[0] && addFlag.length == 1 && removeFlag.length == 1) {
            Titanium.App.Properties.setList('removeCartProductIdArray', []);
            Titanium.App.Properties.setList('cartProductIdArray', []);
        }

    }
    switch(templateName) {
    case "gridTemplate":

        var size = 2;
        var gridDataArr = [];
        var myDataArrCounter = 0;
        for (var i = 0; i < viewTypeData.length; i += size) {
            var smallPaginationArray = viewTypeData.slice(i, i + size);
            gridDataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallPaginationArray) + "");
            myDataArrCounter++;
        }
        var subGridData = "{" + gridDataArr + "}";
        var finalGridData = JSON.parse(subGridData);
        viewTypeData = finalGridData;
        break;

    }
    if (displayCount != 0) {
        _.each(viewTypeData, function(value, k) {

            if (value) {
                if (value.wishlistItem == true) {
                    isSelected_0 = Alloy.Globals.icon.setShortlist;
                    wishIconColor_0 = "#e65e48";
                } else {
                    isSelected_0 = Alloy.Globals.icon.shortlist;
                    wishIconColor_0 = "#a6a6a6";
                }
            }
            if (value[0]) {
                if (value[0].wishlistItem == true) {
                    isSelected_0 = Alloy.Globals.icon.setShortlist;
                    wishIconColor_0 = "#e65e48";
                } else {
                    isSelected_0 = Alloy.Globals.icon.shortlist;
                    wishIconColor_0 = "#a6a6a6";
                }
                if (value[1]) {
                    if (value[1].wishlistItem == true) {
                        isSelected_1 = Alloy.Globals.icon.setShortlist;
                        wishIconColor_1 = "#e65e48";

                    } else {
                        isSelected_1 = Alloy.Globals.icon.shortlist;
                        wishIconColor_1 = "#a6a6a6";
                    }
                } else {
                    wishIconColor_1 = "transparent";
                    isSelected_1 = "";
                }
            }
            // else {
            // isSelected_0 = "";
            // }
            if (!isNullVal(args.type)) {
                switch(args.type) {
                case "shopByLook":
                    if (value) {

                        gridProductname1 = value.looks_name;
                        collectionId1 = value.looks_id;
                        collectionImage1 = encodeURI(value.profile_image);
                        //collectionImage1 = "/images/product1.jpg";
                        gridWhereToBuy1 = "Where to buy";
                        //gridCart1 = Alloy.Globals.icon.bag;
                        gridShare1 = Alloy.Globals.icon.share;
                        gridWish1 = isSelected_0;
                        gridCart1 = "";
                        productSize1 = "";
                        productFontSize1 = "0";
                        shareUrl1 = value.collection_url ? value.collection_url : (value.product_url ? value.product_url : (value.url ? value.url : ""));
                    }
                    if (templateName == "gridTemplate") {
                        if (value[0]) {

                            gridProductname1 = value[0].looks_name;
                            collectionId1 = value[0].looks_id;
                            collectionImage1 = encodeURI(value[0].profile_image);
                            //collectionImage1 = "/images/product1.jpg";
                            gridWhereToBuy1 = "Where to buy";
                            //gridCart1 = Alloy.Globals.icon.bag;
                            gridShare1 = Alloy.Globals.icon.share;
                            gridWish1 = isSelected_0;
                            gridCart1 = "";
                            shareUrl1 = value[0].collection_url ? value[0].collection_url : (value[0].product_url ? value[0].product_url : (value[0].url ? value[0].url : ""));

                            productSize1 = "";
                            productFontSize1 = "0";

                            if (value[1]) {

                                gridProductname2 = value[1].looks_name;
                                collectionId2 = value[1].looks_id;
                                collectionImage2 = encodeURI(value[1].profile_image);
                                //collectionImage2 = "/images/product2.jpg";
                                gridWhereToBuy2 = "Where to buy";
                                //gridCart2 = Alloy.Globals.icon.bag;
                                gridShare2 = Alloy.Globals.icon.share;
                                gridWish2 = isSelected_1;
                                gridCart2 = "";
                                imageContainer = "#eeece7";
                                logoText = "\ue955";
                                productSize2 = "";
                                productFontSize2 = "0";
                                shareUrl2 = value[1].collection_url ? value[1].collection_url : (value[1].product_url ? value[1].product_url : (value[1].url ? value[1].url : ""));
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
                                productSize2 = "";
                                shareUrl2 = "";
                                productFontSize2 = "0";
                            }
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
                    }
                    break;
                case "collection":
                    if (value) {

                        gridProductname1 = value.collection_name;
                        collectionId1 = value.collection_id;
                        collectionImage1 = encodeURI(value.image);
                        //collectionImage1 = "/images/product1.jpg";
                        gridWhereToBuy1 = "Where to buy";
                        //gridCart1 = Alloy.Globals.icon.bag;
                        gridShare1 = Alloy.Globals.icon.share;
                        gridWish1 = isSelected_0;
                        gridCart1 = "";
                        productSize1 = "";
                        shareUrl1 = value.collection_url ? value.collection_url : (value.product_url ? value.product_url : (value.url ? value.url : ""));
                        productFontSize1 = "0";
                    }
                    if (templateName == "gridTemplate") {
                        if (value[0]) {

                            gridProductname1 = value[0].collection_name;
                            collectionId1 = value[0].collection_id;
                            collectionImage1 = encodeURI(value[0].image);
                            //collectionImage1 = "/images/product1.jpg";
                            gridWhereToBuy1 = "Where to buy";
                            //gridCart1 = Alloy.Globals.icon.bag;
                            gridShare1 = Alloy.Globals.icon.share;
                            gridWish1 = isSelected_0;
                            gridCart1 = "";
                            productSize1 = "";
                            shareUrl1 = value[0].collection_url ? value[0].collection_url : (value[0].product_url ? value[0].product_url : (value[0].url ? value[0].url : ""));
                            productFontSize1 = "0";

                            if (value[1]) {

                                gridProductname2 = value[1].collection_name;
                                collectionId2 = value[1].collection_id;
                                collectionImage2 = encodeURI(value[1].image);
                                //collectionImage2 = "/images/product2.jpg";
                                gridWhereToBuy2 = "Where to buy";
                                //gridCart2 = Alloy.Globals.icon.bag;
                                gridShare2 = Alloy.Globals.icon.share;
                                gridWish2 = isSelected_1;
                                gridCart2 = "";
                                imageContainer = "#eeece7";
                                logoText = "\ue955";
                                shareUrl2 = value[1].collection_url ? value[1].collection_url : (value[1].product_url ? value[1].product_url : (value[1].url ? value[1].url : ""));
                                productSize2 = "";
                                productFontSize2 = "0";
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
                                productSize2 = "";
                                shareUrl2 = "";
                                productFontSize2 = "0";
                            }
                        } else {
                            gridProductname1 = "";
                            collectionId1 = "";
                            collectionImage1 = "";
                            gridWhereToBuy1 = "";
                            gridCart1 = "";
                            gridShare1 = "";
                            gridWish1 = "";
                            shareUrl1 = "";
                            productSize1 = "";
                            productFontSize1 = "0";
                        }
                    }
                    break;
                case "C_Product":

                    if (args.categoryType == "shop") {
                        gridCart1 = Alloy.Globals.icon.bag;
                        gridCart2 = Alloy.Globals.icon.bag;

                        //productFontSize1 = "9";
                        //productFontSize2 = "9";
                        ////

                        /*New condition for OUT OF STOCK */

                        try
                        {

                            if (isNullVal(value[0].in_stock)) {
                                if (value[0].in_stock == 1) {
                                    outOfStock1 = false;
                                } else if (value[0].in_stock == 0) {
                                    outOfStock1 = true;
                                }
                            } else {
                                outOfStock1 = undefined;
                            }

                        } catch(exp) {
                            outOfStock1 = undefined;
                        }

                        try {

                            if (isNullVal(value[1].in_stock)) {
                                if (value[1].in_stock == 1) {
                                    outOfStock2 = false;
                                } else if (value[1].in_stock == 0) {
                                    outOfStock2 = true;
                                }
                            } else {
                                outOfStock2 = undefined;
                            }
                        } catch(exp1) {
                            outOfStock2 = undefined;
                        }

                        try {

                            if (isNullVal(value.in_stock)) {
                                if (value.in_stock == 1) {
                                    outOfStock1 = false;
                                } else if (value.in_stock == 0) {
                                    outOfStock1 = true;
                                }
                            } else {
                                outOfStock1 = undefined;
                            }
                        } catch(exp1) {
                            outOfStock1 = undefined;
                        }

                        /*New condition for OUT OF STOCK */

                        if (value) {

                            if (value.product_size == "NA") {
                                productSize1 = "";
                                productFontSize1 = "0";
                            } else {
                                productSize1 = value.product_size;
                                productFontSize1 = "9";
                            }

                            if (value.cartItem == true) {

                                cartIconColor_0 = "#e65e48";
                            } else {

                                if (activeTemplate == "gridTemplate") {
                                    cartIconColor_0 = "#66000000";
                                } else {
                                    cartIconColor_0 = "#a6a6a6";
                                }

                            }
                        }
                        if (value[0]) {
                            if (value[0].product_size == "NA") {
                                productSize1 = "";
                                productFontSize1 = "0";
                            } else {
                                productSize1 = value[0].product_size;
                                productFontSize1 = "9";
                            }
                            if (value[0].cartItem == true) {

                                cartIconColor_0 = "#e65e48";
                            } else {

                                if (activeTemplate == "gridTemplate") {
                                    cartIconColor_0 = "#66000000";
                                }
                            }
                            if (value[1]) {
                                if (value[1].product_size == "NA") {
                                    productSize2 = "";
                                    productFontSize2 = "0";
                                } else {
                                    productSize2 = value[1].product_size;
                                    productFontSize2 = "9";
                                }
                                if (value[1].cartItem == true) {

                                    cartIconColor_1 = "#e65e48";

                                } else {

                                    if (activeTemplate == "gridTemplate") {
                                        cartIconColor_1 = "#66000000";
                                    }
                                }
                            }
                        }

                        //Ti.API.info('value[0].cartItem = '+value[0].cartItem+" value[1].cartItem = "+value[1].cartItem);
                        // Ti.API.info('cartIconColor_0 = '+cartIconColor_0+" cartIconColor_1 = "+cartIconColor_1);
                        ///

                    }

                    if (value) {

                        gridProductname1 = value.product_name;
                        collectionId1 = value.product_id;
                        collectionImage1 = encodeURI(value.image);
                        //collectionImage1 = "/images/product1.jpg";
                        gridWhereToBuy1 = Alloy.Globals.icon.currency + value.product_price;
                        //gridCart1 = Alloy.Globals.icon.bag;
                        gridShare1 = Alloy.Globals.icon.share;
                        gridWish1 = isSelected_0;
                        shareUrl1 = value.collection_url ? value.collection_url : (value.product_url ? value.product_url : (value.url ? value.url : ""));
                        //gridCart1 = "";
                    }
                    if (templateName == "gridTemplate") {
                        if (value[0]) {
                            product_sku1 = value[0].product_sku;
                            gridProductname1 = value[0].product_name;
                            collectionId1 = value[0].product_id;
                            collectionImage1 = encodeURI(value[0].image);
                            //collectionImage1 = "/images/product1.jpg";
                            gridWhereToBuy1 = Alloy.Globals.icon.currency + value[0].product_price;
                            //gridCart1 = Alloy.Globals.icon.bag;
                            gridShare1 = Alloy.Globals.icon.share;
                            gridWish1 = isSelected_0;
                            shareUrl1 = value[0].collection_url ? value[0].collection_url : (value[0].product_url ? value[0].product_url : (value[0].url ? value[0].url : ""));
                            //gridCart1 = "";

                            if (value[1]) {
                                product_sku2 = value[1].product_sku;
                                gridProductname2 = value[1].product_name;
                                collectionId2 = value[1].product_id;
                                collectionImage2 = encodeURI(value[1].image);
                                //collectionImage2 = "/images/product2.jpg";
                                gridWhereToBuy2 = Alloy.Globals.icon.currency + value[1].product_price;
                                //gridCart2 = Alloy.Globals.icon.bag;
                                gridShare2 = Alloy.Globals.icon.share;
                                gridWish2 = isSelected_1;
                                //gridCart2 = "";
                                imageContainer = "#eeece7";
                                shareUrl2 = value[1].collection_url ? value[1].collection_url : (value[1].product_url ? value[1].product_url : (value[1].url ? value[1].url : ""));
                                logoText = "\ue955";
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
                                productSize1 = "";
                                shareUrl2 = "";
                                productFontSize1 = "0";
                            }
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
                            productSize2 = "";
                            productFontSize2 = "0";
                        }
                    }
                    break;
                default:

                    break;
                }
            }
            //Ti.API.info('cartIconColor_0 after = '+cartIconColor_0+" cartIconColor_1 after = "+cartIconColor_1);
            listData.push({
                properties : {
                    collectionId : collectionId1
                },
                template : templateName,
                gridProductname1 : {
                    text : (!isNullVal(gridProductname1)) ? gridProductname1.toUpperCase() : gridProductname1,
                    //text : gridProductname1.toUpperCase(),
                    collectionId : collectionId1
                },
                gridProductname2 : {
                    text : (!isNullVal(gridProductname2)) ? gridProductname2.toUpperCase() : gridProductname2,
                    //text : gridProductname2.toUpperCase(),
                    collectionId : collectionId2
                },
                gridCart1 : {
                    text : gridCart1,
                    product_name_ga : (!isNullVal(gridProductname1)) ? gridProductname1.toUpperCase() : gridProductname1,
                    product_sku : product_sku1,
                    //color : cartIconColor_0,
                    collectionId : collectionId1,
                    //    borderColor:cartIconColor_0,
                    // borderColor : (templateName == "gridTemplate" ? cartIconColor_0 : "red"),
                    // borderColor : (templateName == "gridTemplate" ? cartIconColor_0 : "transparent"),
                    color : (templateName == "gridTemplate" ? "#fff" : cartIconColor_0),
                    backgroundColor : (templateName == "gridTemplate" ? cartIconColor_0 : "transparent"),
                    visible : (gridCart1 == "" ? false : ((outOfStock1) ? false : true)), // commented for time begin @darshanna
                },
                gridCart2 : {
                    text : gridCart2,
                    product_name_ga : (!isNullVal(gridProductname2)) ? gridProductname2.toUpperCase() : gridProductname2,
                    product_sku : product_sku2,
                    //  color : cartIconColor_1,
                    collectionId : collectionId2,
                    //   borderColor:cartIconColor_1,
                    //   borderColor:"transparent",
                    // borderColor : (templateName == "gridTemplate" ? "transparent":""),
                    // borderColor : (templateName == "gridTemplate" ? cartIconColor_1 : "transparent"),
                    color : (templateName == "gridTemplate" ? "#fff" : cartIconColor_1),
                    backgroundColor : (templateName == "gridTemplate" ? cartIconColor_1 : "transparent"),
                    visible : (gridCart2 == "" ? false : ((outOfStock2) ? false : true)), // commented for time begin @darshanna
                },
                gridShare1 : {
                    collectionId : collectionId1,
                    text : gridShare1,
                    shareUrl : shareUrl1,
                },
                gridShare2 : {
                    collectionId : collectionId2,
                    text : gridShare2,
                    shareUrl : shareUrl2,
                },
                gridWish1 : {
                    collectionId : collectionId1,
                    iconValue : "\ue60b",
                    text : gridWish1,
                    color : wishIconColor_0,
                    collectionName : gridProductname1,
                    product_sku : product_sku1,
                    lost_sale : (outOfStock1) ? true : false,
                },
                gridWish2 : {
                    collectionId : collectionId2,
                    iconValue : "\ue60b",
                    text : gridWish2,
                    color : wishIconColor_1,
                    collectionName : gridProductname2,
                    product_sku : product_sku2,
                    lost_sale : (outOfStock2) ? true : false,
                },
                gridProductImage1 : {
                    image : collectionImage1,
                    collectionId : collectionId1
                    //image : "/images/product1.jpg"
                },
                gridProductImage2 : {
                    image : collectionImage2,
                    collectionId : collectionId2
                    //image : "/images/product2.jpg"
                },
                gridWhereToBuy1 : {
                    text : gridWhereToBuy1,
                    product_name_ga : (!isNullVal(gridProductname1)) ? gridProductname1.toUpperCase() : gridProductname1,
                    collectionId : collectionId1
                },
                gridWhereToBuy2 : {
                    text : gridWhereToBuy2,
                    product_name_ga : (!isNullVal(gridProductname2)) ? gridProductname2.toUpperCase() : gridProductname2,
                    collectionId : collectionId2
                },
                listContainer : {
                    collectionId : collectionId1
                },
                productSize1 : {
                    collectionId : collectionId1,
                    text : (!isNullVal(productSize1)) ? productSize1.toUpperCase() : productSize1,
                    font : {
                        fontSize : productFontSize1
                    }
                },
                productSize2 : {
                    collectionId : collectionId2,
                    text : (!isNullVal(productSize2)) ? productSize2.toUpperCase() : productSize2,
                    font : {
                        fontSize : productFontSize2
                    }
                },
                imageContainer : {
                    backgroundColor : imageContainer
                },
                gridLogo : {
                    text : logoText
                },
                outOfStock1 : {
                    visible : (outOfStock1 || false),
                    collectionId : collectionId1,
                },
                outOfStock2 : {
                    visible : (outOfStock2 || false),
                    collectionId : collectionId2,
                }

            });
        });

    } else {
        $.total_toast_lbl.setText("Total 00");
        $.filterContainer.visible = false;
        $.styleFilterView.visible = false;
        // $.optionContainer.visible=false;

        if (!isNullVal(args.type)) {
            switch(args.type) {
            case "shopByLook":
                message = "THERE ARE NO COLLECTIONS IN THIS CATEGORY.";
                break;
            case "collection":
                message = "THERE ARE NO COLLECTIONS IN THIS CATEGORY.";
                break;
            case "C_Product":
                message = "THERE ARE NO PRODUCTS IN THIS CATEGORY.";
                break;
            }
        }
        listData.push({
            properties : {

            },
            template : 'emptyTemplate',
            message : {
                text : message
            }
        });
    }

    $.mainSection.appendItems(listData);

    if (templateName == "gridTemplate") {
        $.listView.scrollToItem(0, (itemIndex_ / 2));
    } else {
        $.listView.scrollToItem(0, itemIndex_);
    }

    if (page_no <= (Math.ceil(totalItem / limit))) {
        switch(templateName) {
        case "gridTemplate":
            $.listView.setMarker({
                sectionIndex : 0,
                itemIndex : ((page_no / 2) * 6) - 2,//itemIndex : ((page_no / 2) * 6) - 1(07-12-2016)old,
            });
            //Ti.API.info('markerset grid on ' + (((page_no / 2) * 6) - 1));
            break;

        }
        //page_no++;
    }

}

function getCollectionListOnLazy(page_no, limit) {
    $.activityInd.show();
    var data = {};
    var url = "";
    _.each(filters, function(value, key) {
        if (value.length > 0) {
            filtersData[key] = value.join(",");
        }
    });
    if (!isNullVal(args.type)) {
        switch(args.type) {
        case "shopByLook":
            url = Alloy.Globals.commonUrl.allLooks;
            data = {
                //"sortby" : sortBy || "latest",
                "sortby" : sortBy || "",
                "style" : selectedStyle || "ALL STYLES",
            };

            data.pagination = {
                "page_no" : page_no,
                "page_size" : limit
            };

            if (_.size(filtersData) > 0) {
                data['filter_applied'] = filtersData;
            } else {
                data['filter_applied'] = "";
            }
            var requestParams = JSON.stringify(data);

            Alloy.Globals.webServiceCall(url, requestParams, subCollectionSuccessCallback, subCollectionErrorCallback, "POST", $.productListing, true);
            break;
        case "collection":

            /////
            if (!isNullVal(args.block)) {
                switch(args.block) {
                case "Allcollection":
                    url = Alloy.Globals.commonUrl.ourrange;
                    data = {
                        "category" : args.categoryName,
                        "categoryId" : args.categoryId,
                        //"sortby" : sortBy || "latest",
                        "sortby" : sortBy || "",
                        "pagination" : {}
                    };

                    data.pagination = {
                        "page_no" : page_no,
                        "page_size" : limit
                    };
                    if (_.size(filtersData) > 0) {
                        data['filters'] = filtersData;
                    } else {
                        data['filters'] = "";
                    }
                    break;
                case "collection":
                    url = Alloy.Globals.commonUrl.getSubCollection;
                    data = {
                        "collection_enduse" : args.categoryName,
                        //"sortby" : sortBy || "latest",
                        "sortby" : sortBy || "",
                        "pagination" : {}
                    };

                    data.pagination[args.categoryName] = {
                        "page_no" : page_no,
                        "page_size" : limit
                    };
                    if (_.size(filtersData) > 0) {
                        data['filters'] = filtersData;
                    } else {
                        data['filters'] = "";
                    }
                    break;
                }
            }
            var requestParams = JSON.stringify(data);

            Alloy.Globals.webServiceCall(url, requestParams, subCollectionSuccessCallback, subCollectionErrorCallback, "POST", $.productListing, true);
            break;
        case "C_Product":
            url = Alloy.Globals.commonUrl.ourrange;
            data = {
                "category" : args.wName,
                "categoryId" : args.categoryId,
                "sortby" : sortBy || "",
                "pagination" : {}
            };

            data.pagination = {
                "page_no" : page_no,
                "page_size" : limit
            };
            if (_.size(filtersData) > 0) {
                data['filters'] = filtersData;
            } else {
                data['filters'] = "";
            }
            var requestParams = JSON.stringify(data);

            Alloy.Globals.webServiceCall(url, requestParams, subCollectionSuccessCallback, subCollectionErrorCallback, "POST", $.productListing);
            break;
        default:

            break;
        }
    }
}

$.listView.addEventListener("marker", function() {
    // Ti.API.info('marker = page_no = ' + page_no + "(Math.ceil(totalItem / limit)) =" + (Math.ceil(totalItem / limit)) + "limit = " + limit);
    if (page_no <= (Math.ceil(totalItem / limit))) {
        getCollectionListOnLazy(page_no, limit);
    }
});

$.listView.addEventListener('scrollstart', function(e) {
    firstCount = e.firstVisibleItemIndex;
});

$.listView.addEventListener("scrollend", function(e) {
    //Ti.API.info('scroll end = '+JSON.stringify(e.firstVisibleItemIndex));

    if (totalItem <= 6 && activeTemplate == "gridTemplate") {

        if (!isNullVal(args.type)) {
            switch(args.type) {
            case "shopByLook":
                $.filterContainer.animate({
                    top : "0",
                    duration : 500
                });

                $.styleFilterView.animate({
                    top : "35",
                    duration : 500
                });

                $.listView.animate({
                    top : "70",
                    duration : 500
                });

                $.listTypeContainer.animate({
                    bottom : "-65", //-65
                    duration : 500
                });

                break;

            case "collection":
                $.filterContainer.animate({
                    top : "0",
                    duration : 500
                });

                $.listView.animate({
                    top : "35",
                    duration : 500
                });

                $.listTypeContainer.animate({
                    bottom : "-65", //-65
                    duration : 500
                });
                break;

            default:

                $.filterContainer.animate({
                    top : "0",
                    duration : 500
                });

                $.listView.animate({
                    top : "35",
                    duration : 500
                });

                $.listTypeContainer.animate({
                    bottom : "-65", //-65
                    duration : 500
                });
                break;

            }
        }

    } else {

        if (activeTemplate == "gridTemplate") {
            itemIndex_ = (e.firstVisibleItemIndex * 2);
        } else {
            itemIndex_ = e.firstVisibleItemIndex;
        }

        //hide show effect

        secondCount = e.firstVisibleItemIndex;

        if (firstCount < secondCount) {
            ///
            if (!isNullVal(args.type)) {
                switch(args.type) {
                case "shopByLook":
                    $.filterContainer.animate({
                        top : "-35",
                        duration : 500
                    });

                    $.styleFilterView.animate({
                        top : "0",
                        duration : 500
                    });

                    $.listView.animate({
                        top : "35",
                        duration : 500
                    });

                    $.listTypeContainer.animate({
                        bottom : "-65", //-65
                        duration : 500
                    });
                    break;

                case "collection":
                    $.filterContainer.animate({
                        top : "-35",
                        duration : 500
                    });

                    $.listView.animate({
                        top : "0",
                        duration : 500
                    });

                    $.listTypeContainer.animate({
                        bottom : "-65", //-65
                        duration : 500
                    });
                    break;
                default:
                    $.filterContainer.animate({
                        top : "-35",
                        duration : 500
                    });

                    $.listView.animate({
                        top : "0",
                        duration : 500
                    });

                    $.listTypeContainer.animate({
                        bottom : "-65",
                        duration : 500
                    });
                    break;
                }
            }

        } else if (firstCount > secondCount) {
            if (!isNullVal(args.type)) {
                switch(args.type) {
                case "shopByLook":
                    $.filterContainer.animate({
                        top : "0",
                        duration : 500
                    });
                    $.styleFilterView.animate({
                        top : "35",
                        duration : 500
                    });

                    $.listView.animate({
                        top : "70",
                        duration : 500
                    });

                    $.listTypeContainer.animate({
                        bottom : "-100",
                        duration : 500
                    });
                    break;

                case "collection":
                    $.filterContainer.animate({
                        top : "0",
                        duration : 500
                    });
                    $.listView.animate({
                        top : "35",
                        duration : 500
                    });

                    $.listTypeContainer.animate({
                        bottom : "-100", //-100
                        duration : 500
                    });
                    break;
                default:
                    $.filterContainer.animate({
                        top : "0",
                        duration : 500
                    });
                    $.listView.animate({
                        top : "35",
                        duration : 500
                    });

                    $.listTypeContainer.animate({
                        bottom : "-100",
                        duration : 500
                    });
                    break;
                }
            }
        }
    }
});

$.filterApplyLbl.addEventListener('click', function(e) {
    // setTimeout(function() {
    // hideShowView($.filterView);
    // }, 1500);
    hideShowView($.filterView);
    getSubCollection();
});

$.styleDropDown.addEventListener('click', function(e) {
    if (stateFlag) {
        $.styleDropDown.borderColor = "gray", $.styleDropDown.borderWidth = "0.6", $.styleDropDown.height = Titanium.UI.SIZE;
        $.styleDropDownIcon.text = Alloy.Globals.icon.expand;
        $.styleFilterView.height = Titanium.UI.FILL;
        $.styleScroll.height = Titanium.UI.SIZE;
        stateFlag = false;
    } else {

        //Ti.API.info('e.source.text-->' + e.source.text);
        if (e.source.text) {
            $.styleNameLbl.text = e.source.text;
            $.styleNameLbl.color = "#e65e48";
            selectedStyle = e.source.text;
            getSubCollection();
        }
        $.styleDropDownIcon.text = Alloy.Globals.icon.expandFill;

        $.styleDropDown.borderColor = "transparent";
        $.styleDropDown.borderWidth = "0";
        $.styleDropDown.height = "35dp";
        $.styleFilterView.height = "35dp";
        stateFlag = true;
    }
});

$.styleFilterView.addEventListener('click', function(e) {
    if (e.source.type == "outerView") {
        $.styleDropDownIcon.text = Alloy.Globals.icon.expandFill;
        $.styleDropDown.borderColor = "transparent";
        $.styleDropDown.borderWidth = "0";
        $.styleDropDown.height = "35dp";
        $.styleFilterView.height = "35dp";
        stateFlag = true;
    }
});
function goToBack() {

    if (addShortlist.type == "shortlist") {
        hideShowView(addShortlist);
        addShortlist = "";
    } else if ($.styleFilterView.getHeight() == "fill") {
        $.styleDropDown.borderColor = "transparent";
        $.styleDropDown.borderWidth = "0";
        $.styleDropDown.height = "35dp";
        $.styleFilterView.height = "35dp";
        stateFlag = true;
    } else if ($.sortView.getVisible()) {
        hideShowView($.sortView);
    } else if ($.filterView.getVisible()) {
        hideShowView($.filterView);
    } else {
        $.filterApplyLbl.removeEventListener('click', getSubCollection);
        $.listTypeContainer.removeEventListener('click', toggleListType);
        $.productListing.removeEventListener('click', hideOverFlowMenu);
        //backupData = [];
        //args = {};
        Alloy.Globals.popWindowInNav();
        $.productListing.close();
    }
}

function destroyWindow(e) {

    $.removeListener();

    $.productListing.remove($.listScrollView);
    $.productListing.remove($.listTypeContainer);
    $.productListing.remove($.sortView);
    $.productListing.remove($.filterView);

    $.listScrollView.removeAllChildren();
    $.listTypeContainer.removeAllChildren();
    $.sortView.removeAllChildren();
    $.filterView.removeAllChildren();

    args = {};
    sortBy = null;
    gridData = null;
    firstCount = null;
    secondCount = null;
    message = null;
    stateFlag = null;
    page_no = null;
    limit = null;
    totalItem = null;
    shortlistData = null;
    listData = [];
    backupData = [];
    selectedCartItem = [];
    unSelectedCartItem = [];
    selectedStyle = null;
    filters = {};
    displayCount = null;
    sortTotalCount = null;
    sortLbl = [];
    sortSeperator = [];
    sortContainer = [];
    filterLbl = [];
    subFilterLbl = [];
    filterMainContainer = [];
    checkFilterLbl = [];
    subFilterContainer = [];
    filtersData = {};
    styleOption = [];
    lastOpenView = null;
    activeTemplate = null;
    itemIndex_ = null;
    toggleStatus = null;
    filterSend = {};
    filterSendJson = [];
    addtocartItem = [];
    addShortlist = null;
    cartData = null;
    collectionName1 = null;
    collectionName2 = null;
    collectionImage1 = null;
    collectionImage2 = null;
    collectionId1 = null;
    gridWhereToBuy1 = null;
    gridWhereToBuy2 = null;
    gridProductname1 = null;
    gridProductname2 = null;
    productSize1 = null;
    productSize2 = null;
    productFontSize1 = null;
    productFontSize2 = null;
    gridShare1 = null;
    gridShare2 = null;
    gridWish1 = null;
    gridWish2 = null;
    gridCart1 = null;
    gridCart2 = null;
    collectionId2 = null;
    imageContainer = null;
    logoText = null;
    isSelected_0 = null;
    isSelected_1 = null;
    wishIconColor_0 = null;
    wishIconColor_1 = null;
    cartIconColor_0 = null;
    cartIconColor_1 = null;
    shareUrl1 = null;
    shareUrl2 = null;

    filterRawData = null;

    Titanium.App.Properties.setList('removeCartProductIdArray', []);
    Titanium.App.Properties.setList('cartProductIdArray', []);

    $.destroy();
}

$.refreshIcon.addEventListener('click', function(e) {
    $.filterByContainer.removeAllChildren();
    filters = {};
    setTimeout(function(e) {
        addFilterByRows(filterRawData);
    }, 300);
});

function updateCartCount() {
    updateCount();

}

// if (Ti.Platform.Android) {
// Ti.API.info('into condition');
// $.productListing.fbProxy = Alloy.Globals.fb.createActivityWorker({
// lifecycleContainer : $.productListing
// });
// }

function updateCount() {
    $.header.updateCartCount();
    // sortBy = "",filters={},selectedStyle="";
    // page_no = 1;

    //Ti.API.info('_.size(filters) = = '+_.size(backupData));
    //Ti.API.info('backupData = '+backupData.length);

    //   Ti.API.info('testObject = '+Titanium.App.Properties.getList('cartProductIdArray'));

    //   Ti.API.info('remove cart = '+Titanium.App.Properties.getList('removeCartProductIdArray'));

    //if(_.size(backupData) > 0 && !isNullVal(Titanium.App.Properties.getList('cartProductIdArray'))){
    if (_.size(backupData) > 0) {
        //  Ti.API.info('view type looping call'+page_no);

        addtocartItem = [];

        addtocartItem = Titanium.App.Properties.getList('cartProductIdArray');
        //     Ti.API.info('addtocartItem = '+addtocartItem);
        viewTypeLooping(backupData, activeTemplate);
    }

}

getSubCollection();

function updateItemListClick(e) {
    //Ti.API.info('into updateItemList-->' + JSON.stringify(e));
    $.listView.fireEvent("itemclick", e);
}

Ti.API.info('Alloy.Globals.platformWidth = ' + Alloy.Globals.platformWidth);

Ti.Gesture.addEventListener('orientationchange', function(e) {
    // get current device orientation from
    // Titanium.Gesture.orientation
    // get orientation from event object
    // from e.orientation
    // Ti.Gesture.orientation should match e.orientation
    // but iOS and Android will report different values
    // two helper methods return a Boolean
    // e.source.isPortrait()
    // e.source.isLandscape()

    // Ti.API.info('e =  =' + JSON.stringify(e));
});
