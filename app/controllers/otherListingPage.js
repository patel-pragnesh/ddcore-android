var args = arguments[0] || {};

//Ti.API.info('args = ' + JSON.stringify(args));
var gridData,
    firstCount,
    secondCount;
var gaAddToCartData ={};
var page_no = 1;
var limit = 10;
var totalItem;
var listData = [];
var backupData = [];

var cartProductId = [];

var selectedCartItem = [];
var unSelectedCartItem = [];
var addtocartItem = [];

var sortBy;
var lazyData,
    lazyUrl,
    message;

var displayCount;

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
    cartIconColor_1 = "transparent",
    outOfStock1,
    outOfStock2;
var cartData = "";
var shortlistData = "";
$.gridIcon.setColor("#e65e48");
$.gridLbl.setColor("#e65e48");
var activeTemplate = "gridTemplate";
Titanium.App.Properties.setList('cartAllid',[]);
var itemIndex_ = 0;
var toggleStatus = true;
var wTitle = "";
var shareUrl1,
    shareUrl2;
var gaShortlistProduct = {},
    product_sku1 = "",
    product_sku2 = "";

if (!isNullVal(args.block)) {
    switch(args.block) {
    case "similarcollection":
        wTitle = "SIMILAR COLLECTIONS";
        break;
    case "peoplealsoviewed":
        wTitle = "MOST VIEWED";
        break;
    case "availabledesign":
        wTitle = "AVAILABLE DESIGNS";
        break;
    }

}

if (!isNullVal(args.slider)) {
    switch(args.slider) {
    case "availabledesign":
        wTitle = "AVAILABLE DESIGNS";
        break;
    case "matchesbestwith":
        wTitle = "BEST MATCHES WITH";
        break;
    case "alsoavailableas":
        wTitle = "ALSO AVAILABLE AS";
        break;
    case "similarproducts":
        wTitle = "SIMILAR PRODUCTS";
        break;
    case "peoplealsoviewed":
        wTitle = "BEST MATCHES WITH";
        break;
    case "similarlook":
        wTitle = "SIMILAR LOOK";
        break;
    }
}

$.header.init({
    title : wTitle,
    passWindow : $.otherListingPage,
});

googleAnalyticsScreen(wTitle);

$.header.updateCartCount();

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
            bottom : -65,
            duration : 200
        });
        toggleStatus = true;
    }
}

//$.button.applyProperties(style);

$.listTypeSubContainer.addEventListener('click', function(e) {

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

});

$.listView.addEventListener('itemclick', function(e) {

    try {
        if (!isNullVal(e.bindId) && e.bindId != "message") {
            var bind = e.bindId;
            var index = e.itemIndex;
            var a = e.section.items[index];
            //Ti.API.info('a = ' + a[bind].collectionId);
            if (!isNullVal(a[bind].collectionId)) {

                //gaAddToCartData = a[bind].collectionName + "(" + a[bind].product_sku + ")";
               // gaAddToCartData = a[bind].product_name_ga + "(" + a[bind].product_sku + ")";
                if (e.bindId == "gridWish1" || e.bindId == "gridWish2") {
                    if (!isNullVal(Ti.App.Properties.getString("access_token"))) {
                        if (!isNullVal(args.type)) {

                            switch(args.type) {
                            case "product":
                                addToShortlist(e);
                                break;
                            case "collection_availabledesign":
                                addToShortlist(e);
                                break;
                            case "shop":
                                addToShortlist(e);
                                break;
                            case "wallpaper":
                                addToShortlist(e);
                                break;
                            case "shopByLook":
                                var collectionData = {
                                    collectionName : a[bind].collectionName,
                                    collectionId : a[bind].collectionId,
                                    type : "shopByLook"
                                };
                                var addToShortlistCollection = Alloy.createController('addToShortlist', collectionData).getView();
                                $.otherListingPage.add(addToShortlistCollection);
                                hideShowView(addToShortlistCollection);
                                break;
                            case "collection":
                                var collectionData = {
                                    collectionName : a[bind].collectionName,
                                    collectionId : a[bind].collectionId,
                                    type : "collection"
                                };
                                var addToShortlistCollection = Alloy.createController('addToShortlist', collectionData).getView();
                                $.otherListingPage.add(addToShortlistCollection);
                                hideShowView(addToShortlistCollection);
                                break;
                            }
                        }

                    } else {
                        // Alloy.Globals.addWindowInNav("signIn", "allCollections");
                        Alloy.Globals.addWindowInNav("signIn", {
                            listObject : e,
                            listViewReference : updateItemListClick,
                        });
                    }

                } else if (e.bindId == "gridCart1" || e.bindId == "gridCart2") {
                    if (!isNullVal(Ti.App.Properties.getString("access_token"))) {
                        if (!isNullVal(args.type)) {

                            if (a[e.bindId].visible) {

                                if (args.type === "shop") {
                                    
                                var shortlist_flag = null;
                                if(e.bindId == "gridCart1"){
                                    if(a['gridWish1'].text == '\ue927'){                                      
                                        shortlist_flag = true;
                                    }else{                                       
                                        shortlist_flag = false;
                                    }
                                }else{
                                    if(a['gridWish2'].text == '\ue927'){                                       
                                        shortlist_flag = true;
                                    }else{
                                        shortlist_flag = false;
                                    }
                                }
                                
                               // gaAddToCartData = a[bind].product_name_ga + "(" + a[bind].product_sku + ")";
                                gaAddToCartData = {};
                                gaAddToCartData ={
                                  name : a[bind].product_name_ga,
                                  sku :  a[bind].product_sku,
                                  shortlistFlag :  shortlist_flag 
                                }; 
                                
                                    cartData = "";
                                    cartData = e;
                                    var url = Alloy.Globals.commonUrl.addToCart;
                                    var data = {
                                        product_id : a[bind].collectionId,
                                        qty : 1
                                    };

                                    var requestParams = JSON.stringify(data);

                                    Alloy.Globals.webServiceCall(url, requestParams, addToCartSuccessCallback, addToCartErrorCallback, "POST", $.otherListingPage);
                                }
                            }

                        }

                    } else {
                        //Alloy.Globals.addWindowInNav("signIn", "allCollections");
                        Alloy.Globals.addWindowInNav("signIn", {
                            listObject : e,
                            listViewReference : updateItemListClick,
                        });
                    }
                } else if ((e.bindId == "gridWhereToBuy1" || e.bindId == "gridWhereToBuy2") && a[bind].text == "Where to buy") {
                    
                    if (!isNullVal(a[bind].collectionId)) {
                        var gaLeadProductArray = {};
                        gaLeadProductArray = {
                            name : a[bind].product_name_ga||"NA",
                            sku : a[bind].collectionId
                        };
                        generateLead(gaLeadProductArray, "Productlisting Page");
                    }
                    
                    Alloy.Globals.addWindowInNav("findStore");
                } else if (e.bindId == "gridShare1" || e.bindId == "gridShare2") {

                    //Ti.API.info('sharing url is ' + a[bind].shareUrl);
                    // socialShare();
                    // var shareProductUrl='http://dev.ddecor.com/collection/silky-satin';
                    shareImage(a[bind].shareUrl);
                } else {
                    if (!isNullVal(a[bind].collectionId)) {

                        if (!isNullVal(args.type)) {

                            var args_block = "";
                            if (!isNullVal(args.block)) {
                                args_block = args.block;
                            } else {
                                args_block = "collection";
                            }

                            if ((e.bindId).toString().lastIndexOf("1") != -1) {
                                e.bindId = "gridWish1";
                            } else if ((e.bindId).toString().lastIndexOf("2") != -1) {
                                e.bindId = "gridWish2";
                            }

                            switch(args.type) {
                            case "product":
                                var pData = {
                                    Productid : a[bind].collectionId,
                                    block : args_block,
                                    navigatedblockid : "",
                                    listObject : e,
                                    listViewReference : addToCartCallback,
                                };
                                Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
                                break;
                            case "shop":
                                var sData = {
                                    Productid : a[bind].collectionId, //9425//11814//11837
                                    block : "shop",
                                    product : "shopProduct",
                                    listObject : e,
                                    listViewReference : addToCartCallback,
                                };
                                Alloy.Globals.addWindowInNav("estoreDetails", sData);
                                break;
                            case "wallpaper":
                                var sData = {
                                    Productid : a[bind].collectionId, //9425//11814//11837
                                    block : "shop",
                                    product : "wallpaper",
                                    listObject : e,
                                    listViewReference : addToCartCallback,
                                };
                                Alloy.Globals.addWindowInNav("estoreDetails", sData);
                                break;
                            case "shopByLook":
                                var lData = {
                                    type : "shopByLook",
                                    id : a[bind].collectionId
                                };
                                Alloy.Globals.addWindowInNav("productDetails", lData);
                                break;
                            case "look_availabledesign":
                                var pData = {
                                    Productid : a[bind].collectionId,
                                    block : "look",
                                    navigatedblockid : "",
                                    listObject : e,
                                    listViewReference : addToCartCallback,
                                };
                                Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
                                break;
                            case "collection":
                                var cData = {
                                    type : "collection",
                                    id : a[bind].collectionId
                                };
                                Alloy.Globals.addWindowInNav("productDetails", cData);
                                break;
                            case "collection_availabledesign":
                                var pData = {
                                    Productid : a[bind].collectionId,
                                    block : "collection",
                                    navigatedblockid : "",
                                    listObject : e,
                                    listViewReference : addToCartCallback,
                                };
                                Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
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
        Ti.API.info('else if' + e.bindId);
        var bind = e.bindId;
        var index = e.itemIndex;
        var a = e.section.items[index];

        if (!isNullVal(e.bindId) && e.bindId != "message") {

            if (!isNullVal(a[bind].collectionId)) {

                if (e.bindId == "gridCart1" || e.bindId == "gridCart2") {

                    if (activeTemplate == "gridTemplate") {
                        if (a[bind].backgroundColor == "#66000000") {
                            a[bind].backgroundColor = "#e65e48";
                         //   a[bind].borderColor = "transparent";
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

        if (activeTemplate == "gridTemplate") {
            if (a[bind].backgroundColor == "#66000000") {
                a[bind].backgroundColor = "#e65e48";
            //    a[bind].borderColor = "#e65e48";
                cartData.section.updateItemAt(cartData.itemIndex, a);
            }
        }

        if (activeTemplate == "listTypeTemplate" || activeTemplate == "blockTypeTemplate") {
            if (a[bind].color == "#fff") {
                a[bind].color = "#e65e48";
                cartData.section.updateItemAt(cartData.itemIndex, a);
            } else {
                if (a[bind].color == "#a6a6a6") {
                    a[bind].color = "#e65e48";
                    cartData.section.updateItemAt(cartData.itemIndex, a);
                }
            }

        }

        addtocartItem.push(e.data[0].product_id);
        Ti.App.Properties.setString("quote_id", e.data[0].quote_id);
        Ti.App.Properties.setString("cartCount", e.data[0].count);
        //Alloy.Globals.setCount();
        //Ti.App.fireEvent("updateCartCount");
        $.header.updateCartCount();
        showAlert($.otherListingPage, e.message);
        
        
        var cartDataArray = [];
        cartDataArray = Titanium.App.Properties.getList('cartProductIdArray');      
        if(cartDataArray.indexOf(e.data[0].product_id) == -1){
            cartDataArray.push(e.data[0].product_id);
        }        
        Titanium.App.Properties.setList('cartProductIdArray',cartDataArray);
        
        googleAnalyticsBag(gaAddToCartData);
    } catch(ex) {
        Ti.API.info('ex.message = ' + ex.message);
    }
}

function addToCartErrorCallback(e) {
    showAlert($.otherListingPage, e.message);
}

function addToShortlist(productData) {
    var shortListbind = "",
        shortListindex = "",
        shortListitemSection = "";
    if (!isNullVal(Ti.App.Properties.getString("access_token"))) {
        shortlistData = "";
        if (!isNullVal(productData.bindId)) {
            shortListbind = productData.bindId;
            shortListindex = productData.itemIndex;
            shortListitemSection = productData.section.items[shortListindex];

            shortlistData = productData;

            if (shortListitemSection[shortListbind].text == "\ue60b") {

                /*display product as shortlisted before hit api
                 */
               // gaShortlistProduct = shortListitemSection[shortListbind].collectionName + "(" + shortListitemSection[shortListbind].product_sku + ")";
                gaShortlistProduct ={
                    name : shortListitemSection[shortListbind].collectionName,
                    sku : shortListitemSection[shortListbind].product_sku,
                    lostSale : shortListitemSection[shortListbind].lost_sale,
                };
                shortListitemSection[shortListbind].text = "\ue927";
                shortListitemSection[shortListbind].color = "#e65e48";
                productData.section.updateItemAt(shortListindex, shortListitemSection);
                selectedCartItem.push(shortListitemSection[shortListbind].collectionId);

                var url = Alloy.Globals.commonUrl.addToShortlist;
                var data = {
                    product_id : shortListitemSection[shortListbind].collectionId
                };

                var requestParams = JSON.stringify(data);

                Alloy.Globals.webServiceCall(url, requestParams, addToShortlistSuccessCallback, addToShortlistErrorCallback, "POST", $.otherListingPage);
            } else {
                /*remove product as shortlisted before hit api
                 */

                shortListitemSection[shortListbind].text = "\ue60b";
                shortListitemSection[shortListbind].color = "#a6a6a6";
                productData.section.updateItemAt(shortListindex, shortListitemSection);
                selectedCartItem.splice(selectedCartItem.indexOf(shortListitemSection[shortListbind].collectionId), 1);
                unSelectedCartItem.push(shortListitemSection[shortListbind].collectionId);

                var url = Alloy.Globals.commonUrl.removeShortlist;
                var data = {
                    product_id : shortListitemSection[shortListbind].collectionId
                };
                var requestParams = JSON.stringify(data);
                Alloy.Globals.webServiceCall(url, requestParams, removeShortlistProductSuccessCallback, removeShortlistProductErrorCallback, "POST", $.otherListingPage);
            }
        }
    } else {
        Alloy.Globals.addWindowInNav("signIn", "otherListingPage");
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
        // pitemSection[pbind].text = "\ue927";
        // pitemSection[pbind].color = "#e65e48";
        // shortlistData.section.updateItemAt(shortlistData.itemIndex, pitemSection);
        // selectedCartItem.push(pitemSection[pbind].collectionId);
        showAlert($.otherListingPage, e.message);
        googleAnalyticsShortlist(gaShortlistProduct, wTitle);
    } catch(ex) {
        Ti.API.info('catch = ' + (ex.message));

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
    showAlert($.otherListingPage, e.message);
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
}

function removeShortlistProductSuccessCallback(e) {
    try {
        // var pbind = "",
        // pindex = "",
        // pitemSection = "";
        //
        // pbind = shortlistData.bindId;
        // pindex = shortlistData.itemIndex;
        // pitemSection = shortlistData.section.items[pindex];
        // pitemSection[pbind].text = "\ue60b";
        // pitemSection[pbind].color = "#a6a6a6";
        //
        // selectedCartItem.splice(selectedCartItem.indexOf(e.data), 1);
        // unSelectedCartItem.push(e.data);
        // shortlistData.section.updateItemAt(shortlistData.itemIndex, pitemSection);
        showAlert($.otherListingPage, e.message);
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
    showAlert($.otherListingPage, e.message);
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

$.otherListingPage.addEventListener('click', hideOverFlowMenu);

function hideOverFlowMenu(e) {
    if (Alloy.Globals.overFlowFlag && e.source.id != "overFlowMenuLbl") {
        $.header.hideOverFlow();
    };
}

/*
 * Fetch All sub collection data
 */

function getSliderViewAll() {
    showLoader($.otherListingPage);
    listData = [];
    $.mainSection.setItems(listData);
    if (!isNullVal(args.type)) {

        var _argsBlock = "",
            _argsProductId = "",
            _argsSlider = "",
            _argsNavigatedblockid = "",
            _argsCollectionId = "",
            _argsColor = "",
            _argsLookId = "";
        if (!isNullVal(args.block)) {
            _argsBlock = args.block;
        }
        if (!isNullVal(args.productID)) {
            _argsProductId = args.productID;
        }
        if (!isNullVal(args.slider)) {
            _argsSlider = args.slider;
        }
        if (!isNullVal(args.navigatedblockid)) {
            _argsNavigatedblockid = args.navigatedblockid;
        }
        if (!isNullVal(args.collectionID)) {
            _argsCollectionId = args.collectionID;
        }
        if (!isNullVal(args.color)) {
            _argsColor = args.color;
        }
        if (!isNullVal(args.lookID)) {
            _argsLookId = args.lookID;
        }

        if (args.type == "product" || args.type == "shop" || args.type == "wallpaper") {
            var url = Alloy.Globals.commonUrl.productGetSliderViewAll;
            if (_.size(args)) {
                var data = {
                    "block" : _argsBlock,
                    "Productid" : _argsProductId,
                    "slider" : _argsSlider,
                    "navigatedblockid" : _argsNavigatedblockid,
                    "page_no" : page_no,
                    "page_size" : limit
                };

                var requestParams = JSON.stringify(data);

                Alloy.Globals.webServiceCall(url, requestParams, subCollectionSuccessCallback, subCollectionErrorCallback, "POST", $.otherListingPage);
            }
        } else if (args.type == "shopByLook") {
            var url = Alloy.Globals.commonUrl.lookGetsliderviewall;
            if (_.size(args)) {
                var data = {
                    "block" : _argsBlock,
                    //"color" : args.color || "",
                    "lookID" : _argsLookId,
                    "page_no" : page_no,
                    "page_size" : limit
                };

                var requestParams = JSON.stringify(data);

                Alloy.Globals.webServiceCall(url, requestParams, subCollectionSuccessCallback, subCollectionErrorCallback, "POST", $.otherListingPage, true);
            }
        } else if (args.type == "collection") {
            var url = Alloy.Globals.commonUrl.getsliderviewall;
            if (_.size(args)) {
                var data = {
                    "block" : _argsBlock,
                    "collectionID" : _argsCollectionId,
                    "page_no" : page_no,
                    "page_size" : limit
                };

                var requestParams = JSON.stringify(data);

                Alloy.Globals.webServiceCall(url, requestParams, subCollectionSuccessCallback, subCollectionErrorCallback, "POST", $.otherListingPage, true);
            }
        } else if (args.type == "collection_availabledesign") {
            var url = Alloy.Globals.commonUrl.getsliderviewall;
            if (_.size(args)) {
                var data = {
                    "block" : _argsBlock,
                    "color" : _argsColor,
                    "collectionID" : _argsCollectionId,
                    "page_no" : page_no,
                    "page_size" : limit
                };

                var requestParams = JSON.stringify(data);

                Alloy.Globals.webServiceCall(url, requestParams, subCollectionSuccessCallback, subCollectionErrorCallback, "POST", $.otherListingPage);
            }
        }
    }
}

getSliderViewAll();

function subCollectionSuccessCallback(e) {
    try {
        hideLoader($.otherListingPage);
        totalItem = e.data.total_count;

        var toast_text = "Total " + totalItem;

        var toast_attr = Ti.UI.createAttributedString({
            text : toast_text,
            attributes : [{
                type : Ti.UI.ATTRIBUTE_FONT,
                value : {
                    fontSize : "10dp",
                    fontFamily : "futura_medium_bt-webfont"
                },
                range : [toast_text.indexOf(totalItem + ""), (totalItem + "").length]
            }]
        });

        $.total_toast_lbl.attributedString = toast_attr;

        displayCount = e.data.products.length;
        if (displayCount != 0) {
            gridData = e.data.products;
            looping_value(e.data.products, activeTemplate);
        } else {
            $.total_toast_lbl.setText("Total 00");
            if (!isNullVal(args.type)) {
                switch(args.type) {
                case "shopByLook":
                    message = "THERE ARE NO COLLECTIONS IN THIS CATEGORY.";
                    break;
                case "collection":
                    message = "THERE ARE NO COLLECTIONS IN THIS CATEGORY.";
                    break;
                default:
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
        hideLoader($.otherListingPage);
        Ti.API.info('catch error' + JSON.stringify(ex));
        showAlert($.otherListingPage, "Something went wrong...");
        setTimeout(function() {
            goToBack();
        }, 1000);
    }

}

function subCollectionErrorCallback(e) {
    hideLoader($.otherListingPage);
    showAlert($.otherListingPage, e.message);
    displayCount = 0;
    $.total_toast_lbl.setText("Total 00");
    if (!isNullVal(args.type)) {
        switch(args.type) {
        case "shopByLook":
            message = "THERE ARE NO COLLECTIONS IN THIS CATEGORY.";
            break;
        case "collection":
            message = "THERE ARE NO COLLECTIONS IN THIS CATEGORY.";
            break;
        default :
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

function looping_value(data, templateName) {

    try {
        listData = [];
        var cartDataArray = [];
        var cartIdArray = [];
        //	backupData = [];

        switch(templateName) {
        case "gridTemplate":
            _.each(data, function(value, k) {
                backupData.push(value);

                // if(!isNullVal(value.product_id) && !value.cartItem && !value.is_wallpaper){
                // Ti.API.info('if 1 ='+value.product_id);
                // cartProductId.push(value.product_id);
                // }
            });
            var size = 2;
            var gridDataArr = [];
            var myDataArrCounter = 0;
            for (var i = 0; i < data.length; i += size) {
                var smallPaginationArray = data.slice(i, i + size);
                gridDataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallPaginationArray) + "");
                myDataArrCounter++;
            }
            var subGridData = "{" + gridDataArr + "}";
            var finalGridData = JSON.parse(subGridData);
            data = finalGridData;
            break;

        }

        _.each(data, function(value, k) {

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
                    wishIconColor_1 = "transparent",
                    isSelected_1 = "";
                }
            }

            /*New condition for OUT OF STOCK */

            //Ti.API.info('isNullVal(value[0].in_stock) '+isNullVal(value[0].in_stock));
            //Ti.API.info('isNullVal(value[1].in_stock) '+isNullVal(value[1].in_stock));

            try {

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

            /*New condition for OUT OF STOCK */

            if (!isNullVal(args.type)) {
                if (args.type == "product" || args.type == "shop" || args.type == "collection_availabledesign" || args.type == "wallpaper") {

                    if (args.type == "shop") {
                        //Ti.API.info('inside shop');
                        gridCart1 = Alloy.Globals.icon.bag;
                        gridCart2 = Alloy.Globals.icon.bag;

                        //productFontSize1 = "9";
                        //productFontSize2 = "9";
                        //// 
 
                        if (value) {
                            if (value.cartItem == true) {

                                cartIconColor_0 = "#e65e48";
                                
                                // cartDataArray = Titanium.App.Properties.getList('cartProductIdArray');      
                                    // if(cartDataArray.indexOf(value.product_id) == -1){
                                        // cartDataArray.push(value.product_id);
                                    // }        
                                    // Titanium.App.Properties.setList('cartProductIdArray',cartDataArray);
                                   cartIdArray = Titanium.App.Properties.getList('cartProductIdArray');      
                                    if(cartIdArray.indexOf(value.product_id) == -1){
                                        cartIdArray.push(value.product_id);
                                    }        
                                    Titanium.App.Properties.setList('cartProductIdArray',cartIdArray);
                            } else {

                                if (activeTemplate == "gridTemplate") {
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
                            if(cartDataArray.indexOf(value.product_id) == -1){
                                        cartDataArray.push(value.product_id);
                                    }        
                                    Titanium.App.Properties.setList('cartAllid',cartDataArray);
                                    
                        }
                        if (value[0]) {
                            
                            cartDataArray = Titanium.App.Properties.getList('cartAllid');      
                                    if(cartDataArray.indexOf(value[0].product_id) == -1){
                                        cartDataArray.push(value[0].product_id);
                                    }  
                                    Titanium.App.Properties.setList('cartAllid',cartDataArray);
                                    
                            if (value[0].product_size == "NA") {
                                productSize1 = "";
                                productFontSize1 = "0";
                            } else {
                                productSize1 = value[0].product_size;
                                productFontSize1 = "9";
                            }

                            if (value[0].cartItem == true) {

                                cartIconColor_0 = "#e65e48";
                                // cartDataArray = Titanium.App.Properties.getList('cartProductIdArray');      
                                    // if(cartDataArray.indexOf(value[0].product_id) == -1){
                                        // cartDataArray.push(value[0].product_id);
                                    // }        
                                // Titanium.App.Properties.setList('cartProductIdArray',cartDataArray);
                                cartIdArray = Titanium.App.Properties.getList('cartProductIdArray');      
                                    if(cartIdArray.indexOf(value[0].product_id) == -1){
                                        cartIdArray.push(value[0].product_id);
                                    }        
                                Titanium.App.Properties.setList('cartProductIdArray',cartIdArray);
                            } else {

                                if (activeTemplate == "gridTemplate") {
                                    cartIconColor_0 = "#66000000";
                                } else {
                                    cartIconColor_0 = "#a6a6a6";
                                }
                            }
                            if (value[1]) {
                                
                                cartDataArray = Titanium.App.Properties.getList('cartAllid');      
                                    if(cartDataArray.indexOf(value[1].product_id) == -1){
                                        cartDataArray.push(value[1].product_id);
                                    }  
                                    Titanium.App.Properties.setList('cartAllid',cartDataArray);
                                    
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
                                    if(cartIdArray.indexOf(value[1].product_id) == -1){
                                        cartIdArray.push(value[1].product_id);
                                    }        
                                    Titanium.App.Properties.setList('cartProductIdArray',cartIdArray);
                                    

                                } else {

                                    if (activeTemplate == "gridTemplate") {
                                        cartIconColor_1 = "#66000000";
                                    } else {
                                        cartIconColor_1 = "#a6a6a6";
                                    }
                                }
                            }
                        }

                        ///

                    }
                    else {
                        gridCart1 = "";
                        gridCart2 = "";
                        productSize1 = "";
                        productSize2 = "";
                        productFontSize1 = "0";
                        productFontSize2 = "0";
                    }
                    //Ti.API.info('productSize11 =' + productSize1 + "productSize2 = " + productSize2);
                    if (templateName != "gridTemplate") {
                        backupData.push(value);
                        // if(!isNullVal(value.product_id) && !value.cartItem && !value.is_wallpaper){
                        // Ti.API.info('if 2 ='+value.product_id);
                        // cartProductId.push(value.product_id);
                        // }
                    }
                    if (value) {

                        gridProductname1 = value.product_name;
                        product_sku1 = value.product_sku;
                        collectionId1 = value.product_id;
                        collectionImage1 = encodeURI(value.image);
                        //collectionImage1 = "/images/product1.jpg";
                        gridWhereToBuy1 = Alloy.Globals.icon.currency + value.product_price;
                        //"Where to buy"
                        //gridCart1 = Alloy.Globals.icon.bag;
                        shareUrl1 = value.collection_url ? value.collection_url : (value.product_url ? value.product_url : (value.url ? value.url : ""));
                        gridShare1 = Alloy.Globals.icon.share;
                        gridWish1 = isSelected_0;
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
                                productSize2 = "";
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
                            gridShare1 = "";
                            gridWish1 = "";
                            shareUrl1 = "";
                            productSize1 = "";
                            productFontSize1 = "0";
                        }
                    }
                } else if (args.type == "shopByLook") {
                    if (templateName != "gridTemplate") {
                        backupData.push(value);

                        // if(!isNullVal(value.product_id) && !value.cartItem && !value.is_wallpaper){
                        // Ti.API.info('if 3 ='+value.product_id);
                        // cartProductId.push(value.product_id);
                        // }
                    }
                    if (value) {

                        gridProductname1 = value.looks_name;
                        collectionId1 = value.looks_id;
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

                            gridProductname1 = value[0].looks_name;
                            collectionId1 = value[0].looks_id;
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

                                gridProductname2 = value[1].looks_name;
                                collectionId2 = value[1].looks_id;
                                collectionImage2 = encodeURI(value[1].image);
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
                            shareUrl1 = "";
                            productSize1 = "";
                            productFontSize1 = "0";
                        }
                    }
                } else if (args.type == "collection") {
                    //Ti.API.info('collection');
                    if (templateName != "gridTemplate") {
                        backupData.push(value);

                        // if(!isNullVal(value.product_id) && !value.cartItem && !value.is_wallpaper){
                        // Ti.API.info('if 4 ='+value.product_id);
                        // cartProductId.push(value.product_id);
                        // }
                    }
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
                        productFontSize1 = "0";
                        shareUrl1 = value.collection_url ? value.collection_url : (value.product_url ? value.product_url : (value.url ? value.url : ""));
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
                    //Ti.API.info('productSize1 = ' + productSize1 + "productFontSize1 = " + productFontSize1);
                }
            }
            //Ti.API.info('productSize1 =' + productSize1 + "productSize2 = " + productSize2);
            var obj = {};

            if (templateName == "gridTemplate") {
                obj = {
                    properties : {
                        //collectionId1 : collectionId1,
                        //collectionId2 : collectionId2
                    },
                    template : templateName,
                    gridProductname1 : {
                        // text : gridProductname1.toUpperCase(),
                        text : (!isNullVal(gridProductname1)) ? gridProductname1.toUpperCase() : gridProductname1,
                        collectionId : collectionId1
                    },
                    gridProductname2 : {
                        //text : gridProductname2.toUpperCase(),
                        text : (!isNullVal(gridProductname2)) ? gridProductname2.toUpperCase() : gridProductname2,
                        collectionId : collectionId2
                    },
                    gridCart1 : {
                        text : gridCart1,
                        product_name_ga : (!isNullVal(gridProductname1)) ? gridProductname1.toUpperCase() : gridProductname1,
                        product_sku : product_sku1,
                        //color : cartIconColor_0,
                    //    backgroundColor : cartIconColor_0,
                   //     borderColor : cartIconColor_0,
                        // color : "#fff",
                        collectionId : collectionId1,
                      //  borderColor : (templateName == "gridTemplate" ? cartIconColor_0 : "#fff"),
                        color : (templateName == "gridTemplate" ? "#fff" : cartIconColor_0),
                        backgroundColor : (templateName == "gridTemplate" ? cartIconColor_0 : "transparent"),
                        visible : (gridCart1 == "" ? false : ((outOfStock1) ? false : true)),
                        // visible : false // commented for time begin
                    },
                    gridCart2 : {
                        text : gridCart2,
                        product_name_ga : (!isNullVal(gridProductname2)) ? gridProductname2.toUpperCase() : gridProductname2,
                        product_sku : product_sku2,
                        // color : cartIconColor_1,
                   //     backgroundColor : cartIconColor_1,
                   //     borderColor : cartIconColor_1,
                        // color : "#fff",
                        collectionId : collectionId2,
                      //  borderColor : (templateName == "gridTemplate" ? cartIconColor_1 : "#fff"),
                        color : (templateName == "gridTemplate" ? "#fff" : cartIconColor_1),
                        backgroundColor : (templateName == "gridTemplate" ? cartIconColor_1 : "transparent"),
                        visible : (gridCart2 == "" ? false : ((outOfStock2) ? false : true)),
                        // visible : false // commented for time begin

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
                        lost_sale : (outOfStock1)?true:false, 
                    },
                    gridWish2 : {
                        collectionId : collectionId2,
                        iconValue : "\ue60b",
                        text : gridWish2,
                        color : wishIconColor_1,
                        collectionName : gridProductname2,
                        product_sku : product_sku2,
                        lost_sale : (outOfStock2)?true:false, 
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
                        collectionId : collectionId1,
                        product_name_ga : (!isNullVal(gridProductname1)) ? gridProductname1.toUpperCase() : gridProductname1,
                    },
                    gridWhereToBuy2 : {
                        text : gridWhereToBuy2,
                        collectionId : collectionId2,
                        product_name_ga : (!isNullVal(gridProductname2)) ? gridProductname2.toUpperCase() : gridProductname2,
                    },
                    listContainer : {
                        collectionId : collectionId1
                    },
                    productSize1 : {
                        collectionId : collectionId1,
                        text : productSize1,
                        height : productFontSize1,
                    },
                    productSize2 : {
                        collectionId : collectionId1,
                        text : productSize2,
                        height : productFontSize2,
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
                };
            } else {
                obj = {
                    properties : {
                        //collectionId1 : collectionId1,
                        //collectionId2 : collectionId2
                    },
                    template : templateName,
                    gridProductname1 : {
                        // text : gridProductname1.toUpperCase(),
                        text : (!isNullVal(gridProductname1)) ? gridProductname1.toUpperCase() : gridProductname1,
                        collectionId : collectionId1
                    },
                    gridProductname2 : {
                        //text : gridProductname2.toUpperCase(),
                        text : (!isNullVal(gridProductname2)) ? gridProductname2.toUpperCase() : gridProductname2,
                        collectionId : collectionId2
                    },
                    gridCart1 : {
                        text : gridCart1,
                        product_name_ga : (!isNullVal(gridProductname1)) ? gridProductname1.toUpperCase() : gridProductname1,
                        product_sku : product_sku1,
                        //color : cartIconColor_0,
                        //backgroundColor : cartIconColor_0,
                        //borderColor : cartIconColor_0,
                        // color : "#fff",
                        collectionId : collectionId1,
                        // visible : (gridCart1 == "" ? false : ((outOfStock1) ? false : true)),
                     //   borderColor : (templateName == "gridTemplate" ? cartIconColor_0 : "#fff"),
                        color : (templateName == "gridTemplate" ? "#fff" : cartIconColor_0),
                        backgroundColor : (templateName == "gridTemplate" ? cartIconColor_0 : "transparent"),
                        visible : (gridCart1 == "" ? false : ((outOfStock1) ? false : true)),

                        //visible:
                    },
                    gridCart2 : {
                        text : gridCart2,
                        product_name_ga : (!isNullVal(gridProductname2)) ? gridProductname2.toUpperCase() : gridProductname2,
                        product_sku : product_sku2,
                        // color : cartIconColor_1,
                        //  backgroundColor : cartIconColor_1,
                        //  borderColor : cartIconColor_1,
                        //  color : "#fff",
                        collectionId : collectionId2,
                        //  visible : (gridCart2 == "" ? false : ((outOfStock2) ? false : true)),

                     //   borderColor : (templateName == "gridTemplate" ? cartIconColor_1 : "#fff"),
                        color : (templateName == "gridTemplate" ? "#fff" : cartIconColor_1),
                        backgroundColor : (templateName == "gridTemplate" ? cartIconColor_1 : "transparent"),
                        visible : (gridCart2 == "" ? false : ((outOfStock2) ? false : true)),

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
                        lost_sale : (outOfStock1)?true:false, 
                    },
                    gridWish2 : {
                        collectionId : collectionId2,
                        iconValue : "\ue60b",
                        text : gridWish2,
                        color : wishIconColor_1,
                        collectionName : gridProductname2,
                        lost_sale : (outOfStock2)?true:false, 
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
                        collectionId : collectionId1,
                        product_name_ga : (!isNullVal(gridProductname1)) ? gridProductname1.toUpperCase() : gridProductname1,
                    },
                    gridWhereToBuy2 : {
                        text : gridWhereToBuy2,
                        collectionId : collectionId2,
                        product_name_ga : (!isNullVal(gridProductname2)) ? gridProductname2.toUpperCase() : gridProductname2,
                    },
                    listContainer : {
                        collectionId : collectionId1
                    },
                    productSize1 : {
                        collectionId : collectionId1,
                        text : productSize1,
                        height : productFontSize1,
                    },
                    productSize2 : {
                        collectionId : collectionId1,
                        text : productSize2,
                        height : productFontSize2,
                    },
                    imageContainer : {
                        backgroundColor : imageContainer
                    },
                    gridLogo : {
                        text : logoText
                    }
                };
            }

            listData.push(obj);

            /*
             listData.push({
             properties : {
             //collectionId1 : collectionId1,
             //collectionId2 : collectionId2
             },
             template : templateName,
             gridProductname1 : {
             text : gridProductname1.toUpperCase(),
             collectionId : collectionId1
             },
             gridProductname2 : {
             text : gridProductname2.toUpperCase(),
             collectionId : collectionId2
             },
             gridCart1 : {
             text : gridCart1,
             color : cartIconColor_0,
             collectionId : collectionId1
             },
             gridCart2 : {
             text : gridCart2,
             color : cartIconColor_1,
             collectionId : collectionId2
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
             collectionName : gridProductname1
             },
             gridWish2 : {
             collectionId : collectionId2,
             iconValue : "\ue60b",
             text : gridWish2,
             color : wishIconColor_1,
             collectionName : gridProductname2
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
             collectionId : collectionId1
             },
             gridWhereToBuy2 : {
             text : gridWhereToBuy2,
             collectionId : collectionId2
             },
             listContainer : {
             collectionId : collectionId1
             },
             productSize1 : {
             collectionId : collectionId1,
             text : productSize1,
             font : {
             fontSize : productFontSize1
             }
             },
             productSize2 : {
             collectionId : collectionId1,
             text : productSize2,
             font : {
             fontSize : productFontSize2
             }
             },
             imageContainer : {
             backgroundColor : imageContainer
             },
             gridLogo : {
             text : logoText
             }

             });
             */

        });
        
        // Titanium.App.Properties.setList('cartProductIdArray',cartDataArray);
        Titanium.App.Properties.setList('cartAllid',cartDataArray);

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
    } catch(ex) {
        Ti.API.info('catch looping' + (ex.message));
    }
}

function viewTypeLooping(data, templateName) {

    listData = [];
    cartProductId = [];
    var addFlag = null;
    var removeFlag = null;
    $.mainSection.setItems(listData);
    if (!isNullVal(args.type)) {
        if (args.type == "product" || args.type == "shop" || args.type == "collection_availabledesign" || args.type == "wallpaper") {

            addFlag = Titanium.App.Properties.getList('removeCartProductIdArray');
            removeFlag = Titanium.App.Properties.getList('cartProductIdArray');
           
            if(addFlag[0] == removeFlag[0] && addFlag.length==1 && removeFlag.length == 1){                
               // addtocartItem.splice(addtocartItem.indexOf(Titanium.App.Properties.getList('removeCartProductIdArray')), 1);
               Titanium.App.Properties.setList('cartProductIdArray',[]);
            }
            
           // Ti.API.info('Titanium.App.Properties.getList(cartAllid) = '+Titanium.App.Properties.getList('cartAllid'));
            _.each(Titanium.App.Properties.getList('cartAllid'), function(value, k) {
           // Ti.API.info('inside addtocartItem'+value);
            //if(Titanium.App.Properties.getList('removeCartProductIdArray').indexOf(value) == -1){
                var found = _.findWhere(data, {
                    product_id : value
                });
                if (!isNullVal(found)) {
                    found.cartItem = false;
                }
           // }
        });
        
         Ti.API.info('Titanium.App.Properties.getList(removeCartProductIdArray) = '+Titanium.App.Properties.getList('removeCartProductIdArray'));
          // Ti.API.info('cartProductId after = '+cartProductId);
           _.each(Titanium.App.Properties.getList('removeCartProductIdArray'), function(k, v) {
              //  cartProductId.splice(cartProductId.indexOf(k), 1);
                
                var found = _.findWhere(data, {
                    product_id : k
                });
                if (!isNullVal(found)) {
                    found.cartItem = false;
                }
                
            });
           
             Ti.API.info('Titanium.App.Properties.getList(cartProductIdArray) = '+Titanium.App.Properties.getList('cartProductIdArray'));
           _.each(Titanium.App.Properties.getList('cartProductIdArray'), function(k, v) {
            
                var found = _.findWhere(data, {
                    product_id : k
                });
                if (!isNullVal(found)) {
                    found.cartItem = true;
                }
                
            });

            // _.each(data, function(value, k) {
              // //  Ti.API.info('value = '+value.product_id  +" value.cartItem = "+value.cartItem);
                // if (!isNullVal(value.product_id) && !value.cartItem && !value.is_wallpaper) {                  
                    // cartProductId.push(value.product_id);
                // }
            // });
           // Ti.API.info('cartProductId = '+cartProductId);
            

            // _.each(cartProductId, function(value, k) {
               // // Ti.API.info('value  = ' + value);
                // var found = _.findWhere(data, {
                    // product_id : value
                // });
                // if (!isNullVal(found)) {
                    // found.cartItem = false;
                // }
            // });
// 
            // _.each(addtocartItem, function(value, k) {
              // //  Ti.API.info('value addtocartItem  = ' + value);
                // var found = _.findWhere(data, {
                    // product_id : value
                // });
                // if (!isNullVal(found)) {
                    // found.cartItem = true;
                // }
            // });

            _.each(unSelectedCartItem, function(value, k) {
                var found = _.findWhere(data, {
                    product_id : value
                });
                if (!isNullVal(found)) {
                    found.wishlistItem = false;
                }
            });
            _.each(selectedCartItem, function(value, k) {
                var found = _.findWhere(data, {
                    product_id : value
                });
                if (!isNullVal(found)) {
                    found.wishlistItem = true;
                }
            });
            
            if(addFlag[0] == removeFlag[0] && addFlag.length==1 && removeFlag.length == 1){       
                Titanium.App.Properties.setList('removeCartProductIdArray',[]);
                Titanium.App.Properties.setList('cartProductIdArray',[]);
            }
        
        }
    }
    switch(templateName) {
    case "gridTemplate":

        var size = 2;
        var gridDataArr = [];
        var myDataArrCounter = 0;
        for (var i = 0; i < data.length; i += size) {
            var smallPaginationArray = data.slice(i, i + size);
            gridDataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallPaginationArray) + "");
            myDataArrCounter++;
        }
        var subGridData = "{" + gridDataArr + "}";
        var finalGridData = JSON.parse(subGridData);
        data = finalGridData;
        break;

    }
    if (displayCount != 0) {
        _.each(data, function(value, k) {
            if (!isNullVal(args.type)) {
                if (args.type == "product" || args.type == "shop" || args.type == "collection_availabledesign" || args.type == "wallpaper") {

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
                            wishIconColor_1 = "transparent",
                            isSelected_1 = "";
                        }
                    }

                    if (value) {

                        gridProductname1 = value.product_name;
                        product_sku1 = value.product_sku;
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
                            shareUrl1 = value[0].collection_url ? value[0].collection_url : (value[0].product_url ? value[0].product_url : (value[0].url ? value.url : ""));
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

                                imageContainer = "#eeece7";
                                logoText = "\ue955";
                                shareUrl2 = value[1].collection_url ? value[1].collection_url : (value[1].product_url ? value[1].product_url : (value[1].url ? value[1].url : ""));
                                //gridCart2 = "";
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
                                productFontSize2 = "0";
                                imageContainer = "#ffffff";
                                logoText = "";
                                shareUrl2 = "";

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
                            productSize1 = "";
                            productFontSize1 = "0";
                            shareUrl1 = "";
                        }
                    }

                    if (args.type == "shop") {

                        /*New condition for OUT OF STOCK */

                        // Ti.API.info('value--->'+ JSON.stringify(value));
                        // Ti.API.info('value[0].in_stock--->'+ value[0].in_stock);
                        // Ti.API.info('value[1].in_stock--->'+ value[1].in_stock);

                        try {

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

                        gridCart1 = Alloy.Globals.icon.bag;
                        gridCart2 = Alloy.Globals.icon.bag;

                        productFontSize1 = "9";
                        productFontSize2 = "9";

                        if (value) {
                            if (value.cartItem == true) {

                                cartIconColor_0 = "#e65e48";
                            } else {

                                if (activeTemplate == "gridTemplate") {
                                    cartIconColor_0 = "#66000000";
                                } else {
                                    cartIconColor_0 = "#a6a6a6";
                                }

                            }
                            productSize1 = value.product_size;
                        }

                        if (value[0]) {
                            productSize1 = value[0].product_size;
                            if (value[0].cartItem == true) {

                                cartIconColor_0 = "#e65e48";
                            } else {

                                if (activeTemplate == "gridTemplate") {
                                    cartIconColor_0 = "#66000000";
                                } else {
                                    cartIconColor_0 = "#a6a6a6";
                                }
                            }
                            if (value[1]) {
                                productSize2 = value[1].product_size;
                                if (value[1].cartItem == true) {

                                    cartIconColor_1 = "#e65e48";

                                } else {

                                    if (activeTemplate == "gridTemplate") {
                                        cartIconColor_1 = "#66000000";
                                    } else {
                                        cartIconColor_1 = "#a6a6a6";
                                    }
                                }
                            }else{                               
                                gridCart2 = "";                              
                                productSize2 = "";                               
                                productFontSize2 = "0";
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

                } else if (args.type == "shopByLook") {
                    if (value) {

                        gridProductname1 = value.looks_name;
                        collectionId1 = value.looks_id;
                        collectionImage1 = encodeURI(value.image);
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
                            collectionImage1 = encodeURI(value[0].image);
                            //collectionImage1 = "/images/product1.jpg";
                            gridWhereToBuy1 = "Where to buy";
                            //gridCart1 = Alloy.Globals.icon.bag;
                            gridShare1 = Alloy.Globals.icon.share;
                            gridWish1 = isSelected_0;
                            gridCart1 = "";
                            productSize1 = "";
                            productFontSize1 = "0";
                            shareUrl1 = value[0].collection_url ? value[0].collection_url : (value[0].product_url ? value[0].product_url : (value[0].url ? value.url : ""));

                            if (value[1]) {

                                gridProductname2 = value[1].looks_name;
                                collectionId2 = value[1].looks_id;
                                collectionImage2 = encodeURI(value[1].image);
                                //collectionImage2 = "/images/product2.jpg";
                                gridWhereToBuy2 = "Where to buy";
                                //gridCart2 = Alloy.Globals.icon.bag;
                                gridShare2 = Alloy.Globals.icon.share;
                                gridWish2 = isSelected_1;
                                gridCart2 = "";
                                productSize2 = "";
                                productFontSize2 = "0";
                                imageContainer = "#eeece7";
                                logoText = "\ue955";
                                shareUrl2 = value[1].collection_url ? value[1].collection_url : (value[1].product_url ? value[1].product_url : (value[1].url ? value[1].url : ""));
                            } else {
                                gridProductname2 = "";
                                collectionId2 = "";
                                collectionImage2 = "";
                                gridWhereToBuy2 = "";
                                gridCart2 = "";
                                gridShare2 = "";
                                gridWish2 = "";
                                productSize2 = "";
                                productFontSize2 = "0";
                                imageContainer = "#ffffff";
                                logoText = "";
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
                } else if (args.type == "collection") {

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
                        productFontSize1 = "0";
                        shareUrl1 = value.collection_url ? value.collection_url : (value.product_url ? value.product_url : (value.url ? value.url : ""));
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
                            shareUrl1 = value[0].collection_url ? value[0].collection_url : (value[0].product_url ? value[0].product_url : (value[0].url ? value.url : ""));
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
                                productSize2 = "";
                                shareUrl2 = value[1].collection_url ? value[1].collection_url : (value[1].product_url ? value[1].product_url : (value[1].url ? value[1].url : ""));
                                productFontSize2 = "0";
                                imageContainer = "#eeece7";
                                logoText = "\ue955";
                            } else {
                                gridProductname2 = "";
                                collectionId2 = "";
                                collectionImage2 = "";
                                gridWhereToBuy2 = "";
                                gridCart2 = "";
                                gridShare2 = "";
                                gridWish2 = "";
                                shareUrl2 = "";
                                productSize2 = "";
                                productFontSize2 = "0";
                                imageContainer = "#ffffff";
                                logoText = "";
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
                }

            }

            listData.push({
                properties : {
                    collectionId : collectionId1
                },
                template : templateName,
                gridProductname1 : {
                    // text : gridProductname1.toUpperCase(),
                    text : (!isNullVal(gridProductname1)) ? gridProductname1.toUpperCase() : gridProductname1,
                    collectionId : collectionId1
                },
                gridProductname2 : {
                    // text : gridProductname2.toUpperCase(),
                    text : (!isNullVal(gridProductname2)) ? gridProductname2.toUpperCase() : gridProductname2,
                    collectionId : collectionId2
                },
                gridCart1 : {
                    text : gridCart1,
                    product_name_ga : (!isNullVal(gridProductname1)) ? gridProductname1.toUpperCase() : gridProductname1,
                    product_sku : product_sku1,
                    //color : cartIconColor_0,
                    collectionId : collectionId1,
                  //  borderColor : (templateName == "gridTemplate" ? cartIconColor_0 : "#fff"),
                    color : (templateName == "gridTemplate" ? "#fff" : cartIconColor_0),
                    backgroundColor : (templateName == "gridTemplate" ? cartIconColor_0 : "transparent"),
                    visible : (gridCart1 == "" ? false : ((outOfStock1) ? false : true)),
                    //visible : false // added for time begin
                },
                gridCart2 : {
                    text : gridCart2,
                    product_name_ga : (!isNullVal(gridProductname2)) ? gridProductname2.toUpperCase() : gridProductname2,
                    product_sku : product_sku2,
                    //color : cartIconColor_1,
                    collectionId : collectionId2,
                 //   borderColor : (templateName == "gridTemplate" ? cartIconColor_1 : "#fff"),
                    color : (templateName == "gridTemplate" ? "#fff" : cartIconColor_1),
                    backgroundColor : (templateName == "gridTemplate" ? cartIconColor_1 : "transparent"),
                    visible : (gridCart2 == "" ? false : ((outOfStock2) ? false : true)),
                    //visible : false // added for time begin
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
                    lost_sale : (outOfStock1)?true:false, 
                },
                gridWish2 : {
                    collectionId : collectionId2,
                    iconValue : "\ue60b",
                    text : gridWish2,
                    color : wishIconColor_1,
                    collectionName : gridProductname2,
                    product_sku : product_sku2,
                    lost_sale : (outOfStock2)?true:false, 
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
                    collectionId : collectionId1,
                    product_name_ga : (!isNullVal(gridProductname1)) ? gridProductname1.toUpperCase() : gridProductname1,
                },
                gridWhereToBuy2 : {
                    text : gridWhereToBuy2,
                    collectionId : collectionId2,
                    product_name_ga : (!isNullVal(gridProductname2)) ? gridProductname2.toUpperCase() : gridProductname2,
                },
                listContainer : {
                    collectionId : collectionId1
                },
                productSize1 : {
                    collectionId : collectionId1,
                    text : productSize1,
                    font : {
                        fontSize : productFontSize1
                    }
                },
                productSize2 : {
                    collectionId : collectionId1,
                    text : productSize2,
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
        if (!isNullVal(args.type)) {
            switch(args.type) {
            case "shopByLook":
                message = "THERE ARE NO COLLECTIONS IN THIS CATEGORY.";
                break;
            case "collection":
                message = "THERE ARE NO COLLECTIONS IN THIS CATEGORY.";
                break;
            default :
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
    if (!isNullVal(args.type)) {

        var _argsBlock = "",
            _argsProductId = "",
            _argsSlider = "",
            _argsNavigatedblockid = "",
            _argsCollectionId = "",
            _argsColor = "",
            _argsLookId = "";
        if (!isNullVal(args.block)) {
            _argsBlock = args.block;
        }
        if (!isNullVal(args.productID)) {
            _argsProductId = args.productID;
        }
        if (!isNullVal(args.slider)) {
            _argsSlider = args.slider;
        }
        if (!isNullVal(args.navigatedblockid)) {
            _argsNavigatedblockid = args.navigatedblockid;
        }
        if (!isNullVal(args.collectionID)) {
            _argsCollectionId = args.collectionID;
        }
        if (!isNullVal(args.color)) {
            _argsColor = args.color;
        }
        if (!isNullVal(args.lookID)) {
            _argsLookId = args.lookID;
        }

        if (args.type == "product" || args.type == "shop" || args.type == "wallpaper") {
            lazyUrl = Alloy.Globals.commonUrl.productGetSliderViewAll;
            lazyData = {
                "block" : _argsBlock,
                "Productid" : _argsProductId,
                "slider" : _argsSlider,
                "navigatedblockid" : _argsNavigatedblockid,
                "page_no" : page_no,
                "page_size" : limit
            };

            var requestParams = JSON.stringify(lazyData);

            Alloy.Globals.webServiceCall(lazyUrl, requestParams, subCollectionSuccessCallback, subCollectionErrorCallback, "POST", $.otherListingPage);

        } else if (args.type == "shopByLook") {
            lazyUrl = Alloy.Globals.commonUrl.lookGetsliderviewall;
            lazyData = {
                "block" : _argsBlock,
                "lookID" : _argsLookId,
                "page_no" : page_no,
                "page_size" : limit
            };

            var requestParams = JSON.stringify(lazyData);

            Alloy.Globals.webServiceCall(lazyUrl, requestParams, subCollectionSuccessCallback, subCollectionErrorCallback, "POST", $.otherListingPage, true);

        } else if (args.type == "collection") {
            lazyUrl = Alloy.Globals.commonUrl.getsliderviewall;
            lazyData = {
                "block" : _argsBlock,
                "collectionID" : _argsCollectionId,
                "page_no" : page_no,
                "page_size" : limit
            };

            var requestParams = JSON.stringify(lazyData);

            Alloy.Globals.webServiceCall(lazyUrl, requestParams, subCollectionSuccessCallback, subCollectionErrorCallback, "POST", $.otherListingPage, true);
        } else if (args.type == "collection_availabledesign") {
            lazyUrl = Alloy.Globals.commonUrl.getsliderviewall;
            lazyData = {
                "block" : _argsBlock,
                "color" : _argsColor,
                "collectionID" : _argsCollectionId,
                "page_no" : page_no,
                "page_size" : limit
            };

            var requestParams = JSON.stringify(lazyData);

            Alloy.Globals.webServiceCall(lazyUrl, requestParams, subCollectionSuccessCallback, subCollectionErrorCallback, "POST", $.otherListingPage);
        }
    }

}

$.listView.addEventListener("marker", function() {
    if (page_no <= (Math.ceil(totalItem / limit))) {
        getCollectionListOnLazy(page_no, limit);
    }
});

$.listView.addEventListener('scrollstart', function(e) {
    firstCount = e.firstVisibleItemIndex;
});

$.listView.addEventListener("scrollend", function(e) {
    //Ti.API.info('scroll end = '+JSON.stringify(e.firstVisibleItemIndex));
    if (activeTemplate == "gridTemplate") {
        itemIndex_ = (e.firstVisibleItemIndex * 2);
    } else {
        itemIndex_ = e.firstVisibleItemIndex;
    }

    //hide show effect

    secondCount = e.firstVisibleItemIndex;
    if (firstCount < secondCount) {

        $.listTypeContainer.animate({
            bottom : "-65",
            duration : 500
        });

    } else if (firstCount > secondCount) {

        $.listTypeContainer.animate({
            bottom : "-100",
            duration : 500
        });
    }
});

function goToBack() {

    $.listTypeContainer.removeEventListener('click', toggleListType);
    $.otherListingPage.removeEventListener('click', hideOverFlowMenu);

   // Titanium.App.Properties.setList('removeCartProductIdArray', []);
   // Titanium.App.Properties.setList('cartProductIdArray', []);

    //args = {};
    Alloy.Globals.popWindowInNav();
    $.otherListingPage.close();
}

function destroyWindow(e) {
    $.otherListingPage.removeAllChildren();
    $.destroy();
}

function updateCount() {
    $.header.updateCartCount();

    //Ti.API.info('testObject = ' + Titanium.App.Properties.getList('cartProductIdArray'));
    
    // Ti.API.info('remove cart = '+Titanium.App.Properties.getList('removeCartProductIdArray'));

    //if (_.size(backupData) > 0 && !isNullVal(Titanium.App.Properties.getList('cartProductIdArray'))) {
    if (_.size(backupData) > 0) {
        //Ti.API.info('view type looping call' + page_no);
        addtocartItem = [];

        addtocartItem = Titanium.App.Properties.getList('cartProductIdArray');
        viewTypeLooping(backupData, activeTemplate);
    }

}

function updateItemListClick(e) {

    $.listView.fireEvent("itemclick", e);
}