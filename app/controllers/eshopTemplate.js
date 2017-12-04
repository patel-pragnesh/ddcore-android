// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

//Ti.API.info('args-->' + args.testArgs);

var response = args.response;
var pageNo = 1;
var myDataArrCounter = 0;
var gaShortlistProduct = {};
var gaShortlistProductArray = {};


/*****************************/

var isSelected_0 = null,
    isSelected_1 = null,
    wishIconColor_0 = null,
    wishIconColor_1 = null,
    cartIconColor_1 = null,
    cartIconColor_0 = null,
    productFontSize1 = null,
    productFontSize2 = null,
    productSize1 = null,
    productSize2 = null;

var cartData = null;

/***************************/

init();

function init() {
    var data = null;
    // var testData = [];
//     
    // //testData.push({});
    // $.section.appendItems(testData);
    
    data = response.product_data;
    var categoryName = (response.categoryName).toUpperCase();
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

    /*
     Commented for time begin

     for (var i = 0; i < estore1.length; i += size) {

     var smallestore1Array = estore1.slice(i, i + size);
     estore1DataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallestore1Array) + "");

     var _data = [];
     var data0 = JSON.parse("{" + estore1DataArr + "}");
     estore1ToAdd = preprocessForListView(JSON.parse("{" + estore1DataArr + "}"));
     _data.push(estore1ToAdd);
     $.section.appendItems(_data);
     }

     */

    /* **********************************************************************/

    var _myDataArrCounter = 0;

    for (var i = 0; i < estore1.length; i += size) {

        var smallestore1Array = estore1.slice(i, i + size);
        estore1DataArr.push('"data' + _myDataArrCounter + '":' + JSON.stringify(smallestore1Array) + "");

        _myDataArrCounter++;
    }

    estore1ToAdd = preprocessForListView(JSON.parse("{" + estore1DataArr + "}"));

    $.section.appendItems(estore1ToAdd);

    /* **********************************************************************/

    var numberOfRow = $.section.getItems().length;
    var listViewHeight = (((Alloy.Globals.imageWidth + 63) * numberOfRow) + 66);
    $.estore1ListView.setHeight(listViewHeight);

}

function preprocessForListView(rawData) {
    // Ti.API.info('rawData****** 1 ******* ' + JSON.stringify(rawData));
    Ti.API.info('into preprocessForListView*** function');
    var product_sku1 = "",
        product_sku2 = "";
    return _.map(rawData, function(item) {

        if (item[0]) {
            if (item[0].wishlistItem == true) {
                isSelected_0 = Alloy.Globals.icon.setShortlist;
                wishIconColor_0 = "#e65e48";
            } else {
                isSelected_0 = Alloy.Globals.icon.shortlist;
                wishIconColor_0 = "#a6a6a6";
            }
            if (item[1]) {
                if (item[1].wishlistItem == true) {
                    isSelected_1 = Alloy.Globals.icon.setShortlist;
                    wishIconColor_1 = "#e65e48";

                } else {
                    isSelected_1 = Alloy.Globals.icon.shortlist;
                    wishIconColor_1 = "#a6a6a6";
                }
            } else {
                isSelected_1 = "";
            }

            /*New condition for OUT OF STOCK */

            // if(!isNullVal(item[0].in_stock)){
            if (item[0].in_stock) {
                outOfStock1 = false;
            } else {
                outOfStock1 = true;
            }
            //}

        }

        if (item[0]) {
            if (item[0].cartItem == true) {

                cartIconColor_0 = "#e65e48";

            } else {

                //cartIconColor_0 = "#ffffff";
                cartIconColor_0 = "#66000000";
            }

            if (item[1]) {
                if (item[1].cartItem == true) {

                    cartIconColor_1 = "#e65e48";

                } else {

                    // cartIconColor_1 = "#ffffff";
                    cartIconColor_1 = "#66000000";
                }
            }

        }

        if (item[0]) {
            product_sku1 = item[0].product_sku;
            gridProductname1 = item[0].product_name;
            collectionId1 = item[0].product_id;
            collectionImage1 = encodeURI(item[0].image);
            //collectionImage1 = "/images/product1.jpg";
            gridWhereToBuy1 = Alloy.Globals.icon.currency + item[0].product_price;
            gridCart1 = Alloy.Globals.icon.bag;
            gridShare1 = Alloy.Globals.icon.share;
            gridWish1 = isSelected_0;
            productFontSize1 = "9";
            productSize1 = item[0].product_size;
            shareUrl1 = item[0].product_url;
            //gridShare1 = "";
            //gridWish1 = "";
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
            //collectionImage2 = "/images/product2.jpg";
            gridWhereToBuy2 = Alloy.Globals.icon.currency + item[1].product_price;
            gridCart2 = Alloy.Globals.icon.bag;
            gridShare2 = Alloy.Globals.icon.share;
            gridWish2 = isSelected_1;
            productSize2 = item[1].product_size;
            productFontSize2 = "9";
            imageContainer = "#f4f4f4";
            logoText = "\ue955";
            shareUrl2 = item[1].product_url;

            /*New condition for OUT OF STOCK */

            // if(!isNullVal(item[1].in_stock)){
            if (item[1].in_stock) {
                outOfStock2 = false;
            } else {
                outOfStock2 = true;
            }
            // }

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
            //f4f4f4
            logoText = "";
            shareUrl2 = "";
            //\ue92a
        }
        return {
            properties : {

                //collectionId: collectionId1
            },
            template : 'gridTemplate',
            gridProductname1 : {
                text : (!isNullVal(gridProductname1)) ? gridProductname1.toUpperCase() : gridProductname1,
                
                collectionId : collectionId1,
            },
            gridProductname2 : {
                text : (!isNullVal(gridProductname2)) ? gridProductname2.toUpperCase() : gridProductname2,
                collectionId : collectionId2,
            },
            gridCart1 : {
                //color : cartIconColor_0,
                backgroundColor : cartIconColor_0,
                color : "#fff",
                text : gridCart1,
                collectionId : collectionId1,
                visible : (gridCart1 == "" ? false : true), // commented for time begin @Darshana
                visible : ((outOfStock1) ? false : true), // commented for time begin @Darshana
                collectionName : gridProductname1,
                product_sku : product_sku1,
                //visible:false,

            },
            gridCart2 : {
                text : gridCart2,
                //color : cartIconColor_1,
                color : "#fff",
                backgroundColor : cartIconColor_1,
                collectionId : collectionId2,
                visible : (gridCart2 == "" ? false : true), // commented for time begin @Darshana
                visible : ((outOfStock2) ? false : true), // commented for time begin @Darshana
                collectionName : gridProductname2,
                product_sku : product_sku2,
                //visible:false,

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
                //value : collectionId2,
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
                collectionId : collectionId1,
                //image : "/images/product1.jpg"
            },
            gridProductImage2 : {
                image : collectionImage2,
                collectionId : collectionId2,
                //image : "/images/product2.jpg"
            },
            gridWhereToBuy1 : {
                text : gridWhereToBuy1,
                collectionId : collectionId1,
            },
            gridWhereToBuy2 : {
                text : gridWhereToBuy2,
                collectionId : collectionId2,
            },
            productSize1 : {
                collectionId : collectionId1,
                text : ((productSize1 == "NA") ? "" : productSize1.toUpperCase()),
                height : ((productSize1 == "NA") ? "0" : "9"),
            },
            productSize2 : {
                collectionId : collectionId2,
                text : ((productSize2 == "NA") ? "" : productSize2.toUpperCase()),
                height : ((productSize2 == "NA") ? "0" : "9"),

            },
            imageContainer : {
                backgroundColor : imageContainer
            },
            outOfStock1 : {
                visible : outOfStock1,
                collectionId : collectionId1,
            },
            outOfStock2 : {
                visible : outOfStock2,
                collectionId : collectionId2,
            }

        };

    });

}

function loadMoreListItem() {
    var ListViewHeight = parseInt($.estore1ListView.getHeight());
    var a = ((Alloy.Globals.imageWidth * 2) );
    $.estore1ListView.setHeight((ListViewHeight + a) + 190 - 50);

    var testArr = [];
    testArr.push({}, {});
    $.section.appendItems(testArr);

}

function loadMoreEshopCategory() {
    if ($.estore1LoadMoreLbl.getText() == "VIEW ALL") {

        navigateToEstoreViewAll();

    } else {

        Ti.API.info('$.estore1LoadMoreLbl.categoryName= ' + $.estore1LoadMoreLbl.categoryName);

        Ti.API.info('$.estore1LoadMoreLbl.categoryId = ' + $.estore1LoadMoreLbl.categoryId);

        $.estore1LoadMoreLbl.hide();
        $.estore1ActivityIndicator.show();

        var url = Alloy.Globals.commonUrl.ourrange;

        var data = {
            "category" : $.estore1LoadMoreLbl.categoryName,
            "categoryId" : $.estore1LoadMoreLbl.categoryId,
            //"sortby" : "latest",
            "sortby" : "",
            "pagination" : {
                "page_no" : pageNo + 1,
                "page_size" : 6
            }
        };

        var requestParams = JSON.stringify(data);

        Alloy.Globals.webServiceCall(url, requestParams, _loadMoreSuccessCallback, _loadmoreErrorCallback, "POST", args.mainWindow);

    }

}

function _loadMoreSuccessCallback(response) {
    pageNo = pageNo + 1;

    var data = response.data.product_data.product_listing;

    if (data.length == 0) {
        $.estore1LoadMoreLbl.setColor("#e65e48");
        $.estore1LoadMoreLbl.setText("VIEW ALL");
    } else if (data.length > 0) {

        var estore1 = data;
        var size = 2;
        var estore1DataArr = [];

        $.estore1LoadMoreLbl.listItemCount = $.estore1LoadMoreLbl.listItemCount + data.length;

        var numberOfRow = parseInt(data.length / 2);

        if (data.length % 2) {
            numberOfRow = numberOfRow + 1;
        }

        //var numberOfRow = ((data.length % 2) ? (data.length+1): data.length);

        var ListViewHeight = parseInt($.estore1ListView.getHeight());
        // var a = ((Alloy.Globals.imageWidth * numberOfRow) );
        //  $.estore1ListView.setHeight((ListViewHeight + a) + 190 - 30);

        var ListViewHeight = parseInt($.estore1ListView.getHeight());
        //var a = (216*(BEDDING.length/2));
        //var a = (Alloy.Globals.imageWidth + 62);
        var a = (((Alloy.Globals.imageWidth + 4) * 3) + 172);
        //216//432

        $.estore1ListView.height = (ListViewHeight + a);

        /*
         for (var i = 0; i < estore1.length; i += size) {
         //numberOfRow ++;

         var smallestore1Array = estore1.slice(i, i + size);
         estore1DataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallestore1Array) + "");

         var _data = [];
         var data0 = JSON.parse("{" + estore1DataArr + "}");
         estore1ToAdd = preprocessForListView(JSON.parse("{" + estore1DataArr + "}"));
         _data.push(estore1ToAdd);
         $.section.appendItems(_data);
         }
         */

        /* **********************************************************************/

        var _myDataArrCounter = 0;

        for (var i = 0; i < estore1.length; i += size) {

            var smallestore1Array = estore1.slice(i, i + size);
            estore1DataArr.push('"data' + _myDataArrCounter + '":' + JSON.stringify(smallestore1Array) + "");

            // var _data = [];
            // var data0 = JSON.parse("{" + estore1DataArr + "}");
            // estore1ToAdd = preprocessForListView(JSON.parse("{" + estore1DataArr + "}"));
            // _data.push(estore1ToAdd);
            // $.section.appendItems(_data);
            _myDataArrCounter++;
        }

        estore1ToAdd = preprocessForListView(JSON.parse("{" + estore1DataArr + "}"));
        // _data.push(estore1ToAdd);
        //Ti.API.info('type of *******' + typeof estore1ToAdd);
        $.section.appendItems(estore1ToAdd);

        /* **********************************************************************/

        if (($.estore1LoadMoreLbl.listItemCount == $.estore1LoadMoreLbl.total_count ) || (pageNo == 3)) {
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
    // var collectionAllData = {
    // wName : $.estore1LoadMoreLbl.categoryName,
    // categoryId : $.estore1LoadMoreLbl.categoryId,
    // type : "C_Product",
    // categoryType : "shop",
    // // categoryName : $.estore1LoadMoreLbl.categoryName,
    // };

    var collectionAllData = {
        wName : "",
        categoryId : $.estore1LoadMoreLbl.categoryId,
        type : "C_Product",
        categoryType : "shop",
        subTitle : "BED LINEN PRODUCTS",
        categoryName : "BED LINEN",
        category : "BED LINEN",
    };

    Alloy.Globals.addWindowInNav("productListing", collectionAllData);
}

function estoreItemClick(productData) {
    
    try{
    
    if (!isNullVal(productData.bindId) && productData.bindId != "message") {

        bind = productData.bindId;
        index = productData.itemIndex;
        itemSection = productData.section.items[index];

        if (!isNullVal(itemSection[bind].collectionId)) {
            if (productData.bindId == "gridWish1" || productData.bindId == "gridWish2") {
                if (!isNullVal(Ti.App.Properties.getString("access_token"))) {
                    shortlistData = "";
                    if (!isNullVal(productData.bindId)) {

                        shortlistData = productData;

                        if (itemSection[bind].text == "\ue60b") {

                            /*display product as shortlisted before hit api */
                          //  gaShortlistProduct = itemSection[bind].collectionName+"("+itemSection[bind].product_sku+")";
                            gaShortlistProductArray = {
                                name : itemSection[bind].collectionName,
                                sku : itemSection[bind].product_sku,
                                lostSale : itemSection[bind].lost_sale,
                            };
                           // Ti.API.info('gaShortlistProduct ='+gaShortlistProduct);
                            itemSection[bind].text = "\ue927";
                            itemSection[bind].color = "#e65e48";
                            productData.section.updateItemAt(index, itemSection);

                            var url = Alloy.Globals.commonUrl.addToShortlist;
                            var data = {
                                product_id : itemSection[bind].collectionId
                            };
                            var requestParams = JSON.stringify(data);
                            Alloy.Globals.webServiceCall(url, requestParams, addToShortlistSuccessCallback, addToShortlistErrorCallback, "POST", args.mainWindow);
                        } else {
                            /*remove product as shortlisted before hit api */

                            itemSection[bind].text = "\ue60b";
                            itemSection[bind].color = "#a6a6a6";
                            productData.section.updateItemAt(index, itemSection);

                            var url = Alloy.Globals.commonUrl.removeShortlist;
                            var data = {
                                product_id : itemSection[bind].collectionId,
                            };
                            var requestParams = JSON.stringify(data);
                            Alloy.Globals.webServiceCall(url, requestParams, removeShortlistProductSuccessCallback, removeShortlistProductErrorCallback, "POST", args.mainWindow);

                        }
                    }
                } else {
                   // Alloy.Globals.addWindowInNav("signIn", "allBlinds");
                    Alloy.Globals.addWindowInNav("signIn",{
                                listObject : productData,
                                listViewReference : updateItemListClick,
                        });
                }
            } else if (productData.bindId == "gridCart1" || productData.bindId == "gridCart2") {

                if (Ti.App.Properties.getString("access_token")) {

                    if (itemSection[productData.bindId].visible) {
                       // gaShortlistProduct = itemSection[bind].collectionName+"("+itemSection[bind].product_sku+")";
                        
                        var shortlist_flag = null;
                        if(productData.bindId == "gridCart1"){
                            if(itemSection['gridWish1'].text == '\ue927'){                                      
                                shortlist_flag = true;
                            }else{                                       
                                shortlist_flag = false;
                            }
                        }else{
                            if(itemSection['gridWish2'].text == '\ue927'){                                       
                                shortlist_flag = true;
                            }else{
                                shortlist_flag = false;
                            }
                        }
                        
                        gaShortlistProduct = {};
                        gaShortlistProduct ={
                          name : itemSection[bind].collectionName,
                          sku :  itemSection[bind].product_sku,
                          shortlistFlag :  shortlist_flag 
                        }; 
                                
                        
                        //Ti.API.info('gaShortlistProduct ='+gaShortlistProduct);
                        cartData = null;
                        cartData = productData;
                        var url = Alloy.Globals.commonUrl.addToCart;
                        var data = {
                            product_id : itemSection[bind].collectionId,
                            qty : 1
                        };

                        var requestParams = JSON.stringify(data);

                        Alloy.Globals.webServiceCall(url, requestParams, addToCartSuccessCallback, addToCartErrorCallback, "POST", $.eshop);
                    }

                } else {
                    //Alloy.Globals.addWindowInNav("signIn", "eshop");
                    Alloy.Globals.addWindowInNav("signIn",{
                                listObject : productData,
                                listViewReference : updateItemListClick,
                    });
                }
            } else if (productData.bindId == "gridShare1" || productData.bindId == "gridShare2") {

                shareImage(itemSection[bind].shareUrl);
            } else {

                if (productData.bindId != "message" && !isNullVal(itemSection[bind].collectionId)) {

                    if ((productData.bindId).toString().lastIndexOf("1") != -1) {
                        productData.bindId = "gridWish1";
                    } else if ((productData.bindId).toString().lastIndexOf("2") != -1) {
                        productData.bindId = "gridWish2";
                    }

                    // var pData = {
                    // Productid : itemSection[bind].collectionId,
                    // block : "estore",
                    // navigatedblockid : "",
                    // type : "estore",
                    // listObject : productData,
                    // listViewReference : updateItemListClick,
                    // category : itemSection[bind].category, // blind category
                    // };
                    // Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);

                    var pData = {
                        Productid : itemSection[bind].collectionId,
                        block : "shop",
                        product : "shopProduct",
                        listObject : productData,
                        //listViewReference : updateItemListClick,
                        listViewReference : addToCartCallback,
                        

                    };
                    Alloy.Globals.addWindowInNav("estoreDetails", pData);

                }
            }

        }
    }
    }catch(ex){
        Ti.API.info('catch item click = '+ex.message);
    }
}

function addToCartCallback(e, productId) {
    try {
                Ti.API.info('else if'+e.bindId);
                var bind = e.bindId;
                var index = e.itemIndex;
                var a = e.section.items[index];

        if (!isNullVal(e.bindId) && e.bindId != "message") {
            

            if (!isNullVal(a[bind].collectionId)) {
                
                if (e.bindId == "gridCart1" || e.bindId == "gridCart2") {
    
                        if (activeTemplate == "gridTemplate") {
                            if (a[bind].backgroundColor == "#66000000") {
                                a[bind].backgroundColor = "#e65e48";
                                a[bind].borderColor = "transparent";
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
        
                       // addtocartItem.push(productId);
                    
                    }else if (e.bindId == "gridWish1" || e.bindId == "gridWish2") {
                        if(productId=="add"){
                            a[bind].text = "\ue927";
                            a[bind].color = "#e65e48";
                            e.section.updateItemAt(index, a);
                           // selectedCartItem.push(a[bind].collectionId);
                        }else{
                            a[bind].text = "\ue60b";
                            a[bind].color = "#a6a6a6";
                            //selectedCartItem.splice(selectedCartItem.indexOf(a[bind].collectionId), 1);
                           // unSelectedCartItem.push(a[bind].collectionId);
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

        // Ti.API.info('cartData************* ------> ' + JSON.stringify(cartData));

        /*
         if (a[bind].color == "#ffffff") {
         a[bind].color = "#e65e48";
         cartData.section.updateItemAt(cartData.itemIndex, a);
         }
         */
        
        googleAnalyticsBag(gaShortlistProduct);
        
        if (a[bind].backgroundColor == "#66000000") {
            a[bind].backgroundColor = "#e65e48";
            cartData.section.updateItemAt(cartData.itemIndex, a);
        }

        Ti.App.Properties.setString("cartCount", e.data[0].cart_count);
        Ti.App.Properties.setString("quote_id", e.data[0].quote_id);
        args.updateCountFn("addTocart");
        //Alloy.Globals.setCount();
        //Ti.App.fireEvent("updateCartCount");
       // $.header.updateCartCount();

        showAlert(args.mainWindow, e.message);
    } catch(ex) {
        //Ti.API.info('ex.message = ' + ex.message);
    }
}

function addToCartErrorCallback(e) {    
    showAlert(args.mainWindow, e.message);
}

function addToShortlistSuccessCallback(response) {
    try {

        showAlert(args.mainWindow, response.message);
        googleAnalyticsShortlist(gaShortlistProductArray,"ESTORE");
    } catch(e) {
        Ti.API.info('catch = ' + (e.message));

    }
}

function addToShortlistErrorCallback(response) {
    showAlert(args.mainWindow, response.message);
    var pbind = "",
        pindex = "",
        pitemSection = "";

    pbind = shortlistData.bindId;
    pindex = shortlistData.itemIndex;
    pitemSection = shortlistData.section.items[index];
    pitemSection[bind].text = "\ue60b";
    pitemSection[bind].color = "#a6a6a6";

    shortlistData.section.updateItemAt(shortlistData.itemIndex, pitemSection);
}

function removeShortlistProductSuccessCallback(response) {
    try {

        showAlert(args.mainWindow, response.message);
    } catch(e) {
        Ti.API.info('catch = ' + (e.message));

    }
}

function removeShortlistProductErrorCallback(e) {
    showAlert(args.mainWindow, e.message);
    var pbind = "",
        pindex = "",
        pitemSection = "";

    pbind = shortlistData.bindId;
    pindex = shortlistData.itemIndex;
    pitemSection = shortlistData.section.items[pindex];
    pitemSection[pbind].text = "\ue927";
    pitemSection[pbind].color = "#e65e48";
    shortlistData.section.updateItemAt(shortlistData.itemIndex, pitemSection);

}

function emptyData() {

    return [{
        properties : {

        },
        template : 'emptyTemplate',
        message : {
            text : "THERE ARE NO PRODUCTS IN THIS CATEGORY."
        }
    }];
}

function updateItemListClick(e) {
    //Ti.API.info('into updateItemList-->' + JSON.stringify(e));
    $.estore1ListView.fireEvent("itemclick", e);
}
