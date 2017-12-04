// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

//Ti.API.info('args-->' + args.testArgs);

var response = args.response;
var pageNo = 1;
var myDataArrCounter = 0;

/*****************************/

var isSelected_0,
    isSelected_1,
    wishIconColor_0,
    wishIconColor_1,
    cartIconColor_1,
    cartIconColor_0,
    productFontSize1,
    productFontSize2,
    productSize1,
    productSize2;

/***************************/

init();

function init() {

    var data = response.product_data;
    var categoryName = (response.categoryName).toUpperCase();
    $.blinds1NameLbl.setText(categoryName);

    if (data.length == 0) {

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

        /*
         Commented for time begin

         for (var i = 0; i < blinds1.length; i += size) {

         var smallblinds1Array = blinds1.slice(i, i + size);
         blinds1DataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallblinds1Array) + "");

         var _data = [];
         var data0 = JSON.parse("{" + blinds1DataArr + "}");
         blinds1ToAdd = preprocessForListView(JSON.parse("{" + blinds1DataArr + "}"));
         _data.push(blinds1ToAdd);
         $.section.appendItems(_data);
         }

         */

        /* **********************************************************************/

        var _myDataArrCounter = 0;

        for (var i = 0; i < blinds1.length; i += size) {

            var smallblinds1Array = blinds1.slice(i, i + size);
            blinds1DataArr.push('"data' + _myDataArrCounter + '":' + JSON.stringify(smallblinds1Array) + "");

            _myDataArrCounter++;
        }

        blinds1ToAdd = preprocessForListView(JSON.parse("{" + blinds1DataArr + "}"));

        $.section.appendItems(blinds1ToAdd);

        /* **********************************************************************/

        var numberOfRow = $.section.getItems().length;
        var listViewHeight = (((Alloy.Globals.imageWidth + 63) * numberOfRow) + 66);
        $.blinds1ListView.setHeight(listViewHeight);

    }

}

function preprocessForListView(rawData) {
    // Ti.API.info('rawData****** 1 ******* ' + JSON.stringify(rawData));
    var categoryName = response.categoryName;

    //var item = rawData.data0; /*TODO commented for time begin*/

    // Ti.API.info('rawData****** 2 ******* ' + JSON.stringify(item[0]));
    // Ti.API.info('rawData******* 3 ****** ' + JSON.stringify(item[1]));

    /*
     isSelected_0 = Alloy.Globals.icon.shortlist;
     wishIconColor_0 = "#a6a6a6";
     isSelected_1 = Alloy.Globals.icon.shortlist;
     wishIconColor_1 = "#a6a6a6";
     */

    return _.map(rawData, function(item) {
        //Ti.API.info('map items --------->' + JSON.stringify(item));

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
        }

        if (item[0]) {
            product_sku1 = item[0].product_sku;
            gridProductname1 = item[0].product_name;
            collectionId1 = item[0].product_id;

            collectionImage1 = encodeURI(item[0].image);
            // Ti.API.info('image Url 1----> ' + collectionImage1);
            //
            // Ti.API.info('Catergory--->' + response.categoryName +'  gridProductname1  ---->' + gridProductname1 );
            //collectionImage1 = (item[0].image);

            //collectionImage1 = "/images/product1.jpg";
            gridWhereToBuy1 = Alloy.Globals.icon.currency + item[0].product_price;
            //gridCart1 = Alloy.Globals.icon.bag;
            gridShare1 = Alloy.Globals.icon.share;
            gridWish1 = isSelected_0;
            gridCart1 = "";
            shareUrl1 = item[0].product_url;
            //gridShare1 = "";
            //gridWish1 = "";
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
            // Ti.API.info('image Url 2---->' + collectionImage2);
            // Ti.API.info('Catergory--->' + response.categoryName +'  gridProductname2  ---->' + gridProductname2);
            //collectionImage2 =(item[1].image);

            //collectionImage2 = "/images/product2.jpg";
            gridWhereToBuy2 = Alloy.Globals.icon.currency + item[1].product_price;
            //gridCart2 = Alloy.Globals.icon.bag;
            gridShare2 = Alloy.Globals.icon.share;
            gridWish2 = isSelected_1;
            gridCart2 = "";
            imageContainer = "#eeece7";
            shareUrl2 = item[1].product_url;
            logoText = "\ue955";
            //\ue92a
            // gridShare2 = "";
            // gridWish2 = "";
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
                text : gridProductname1.toUpperCase(),
                collectionId : collectionId1,
                category : categoryName
            },
            gridProductname2 : {
                text : gridProductname2.toUpperCase(),
                collectionId : collectionId2,
                category : categoryName
            },
            gridCart1 : {
                text : gridCart1,
                collectionId : collectionId1,
                category : categoryName,
                visible : (gridCart1 == "" ? false : true)
            },
            gridCart2 : {
                text : gridCart2,
                collectionId : collectionId2,
                category : categoryName,
                visible : (gridCart2 == "" ? false : true)
            },
            gridShare1 : {
                collectionId : collectionId1,
                text : gridShare1,
                shareUrl : shareUrl1,
                category : categoryName
            },
            gridShare2 : {
                collectionId : collectionId2,
                text : gridShare2,
                shareUrl : shareUrl2,
                category : categoryName
            },
            gridWish1 : {
                collectionId : collectionId1,
                iconValue : "\ue60b",
                text : gridWish1,
                color : wishIconColor_0,
                collectionName : gridProductname1,
                category : categoryName,
                product_sku : product_sku1
            },
            gridWish2 : {
                //value : collectionId2,
                collectionId : collectionId2,
                iconValue : "\ue60b",
                text : gridWish2,
                color : wishIconColor_1,
                collectionName : gridProductname2,
                category : categoryName,
                product_sku : product_sku2
            },
            gridProductImage1 : {
                image : collectionImage1,
                collectionId : collectionId1,
                category : categoryName
                //image : "/images/product1.jpg"
            },
            gridProductImage2 : {
                image : collectionImage2,
                collectionId : collectionId2,
                category : categoryName
                //image : "/images/product2.jpg"
            },
            gridWhereToBuy1 : {
                text : gridWhereToBuy1,
                collectionId : collectionId1,
                category : categoryName
            },
            gridWhereToBuy2 : {
                text : gridWhereToBuy2,
                collectionId : collectionId2,
                category : categoryName
            },
            productSize1 : {
                collectionId : collectionId1,
                text : "",
                height : "0",
                category : categoryName

            },
            productSize2 : {
                collectionId : collectionId2,
                text : "",
                height : "0",
                category : categoryName
            },
            imageContainer : {
                backgroundColor : imageContainer,
                category : categoryName
            },
            gridLogo : {
                text : logoText,
                category : categoryName
            },
            outOfStock1:{
                visible:false,
                collectionId : collectionId1,
            },
            outOfStock2:{
                visible:false,
                collectionId : collectionId2,
            }
        };

    });

}

function loadMoreListItem() {
    var ListViewHeight = parseInt($.blinds1ListView.getHeight());
    var a = ((Alloy.Globals.imageWidth * 2) );
    $.blinds1ListView.setHeight((ListViewHeight + a) + 190 - 50);

    var testArr = [];
    testArr.push({}, {});
    $.section.appendItems(testArr);

}

function loadMoreBlindCategory() {
    if ($.blinds1LoadMoreLbl.getText() == "VIEW ALL") {

        navigateToBlindViewAll();

    } else {

        $.blinds1LoadMoreLbl.hide();
        $.blinds1ActivityIndicator.show();

        var url = Alloy.Globals.commonUrl.ourrange;

        var data = {
            "category" : $.blinds1LoadMoreLbl.categoryName,
            "categoryId" : $.blinds1LoadMoreLbl.categoryId,
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
        $.blinds1LoadMoreLbl.setColor("#e65e48");
        $.blinds1LoadMoreLbl.setText("VIEW ALL");
    } else if (data.length > 0) {

        var blinds1 = data;
        var size = 2;
        var blinds1DataArr = [];

        $.blinds1LoadMoreLbl.listItemCount = $.blinds1LoadMoreLbl.listItemCount + data.length;

        var numberOfRow = parseInt(data.length / 2);

        if (data.length % 2) {
            numberOfRow = numberOfRow + 1;
        }

        //var numberOfRow = ((data.length % 2) ? (data.length+1): data.length);

        var ListViewHeight = parseInt($.blinds1ListView.getHeight());
        var a = ((Alloy.Globals.imageWidth * numberOfRow) );
        $.blinds1ListView.setHeight((ListViewHeight + a) + 190 - 30);

        /* **********************************************************************/

        var _myDataArrCounter = 0;

        for (var i = 0; i < blinds1.length; i += size) {

            var smallblinds1Array = blinds1.slice(i, i + size);
            blinds1DataArr.push('"data' + _myDataArrCounter + '":' + JSON.stringify(smallblinds1Array) + "");

            _myDataArrCounter++;
        }

        blinds1ToAdd = preprocessForListView(JSON.parse("{" + blinds1DataArr + "}"));

        $.section.appendItems(blinds1ToAdd);

        /* **********************************************************************/

        if (($.blinds1LoadMoreLbl.listItemCount == $.blinds1LoadMoreLbl.total_count ) || (pageNo == 3)) {
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
        wName : $.blinds1LoadMoreLbl.categoryName,
        categoryId : $.blinds1LoadMoreLbl.categoryId,
        type : "C_Product",
        categoryType : "blinds",
        categoryName : $.blinds1LoadMoreLbl.categoryName,
    };

    Alloy.Globals.addWindowInNav("productListing", collectionAllData);
}

function blindsItemClick(productData) {
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
                            //gaShortlistProduct = itemSection[bind].collectionName+"("+itemSection[bind].product_sku+")";
                            gaShortlistProduct = {
                                name : itemSection[bind].collectionName,
                                sku : itemSection[bind].product_sku,
                                lostSale : false,
                            };
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
                    //Alloy.Globals.addWindowInNav("signIn", "allBlinds");
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

                    var pData = {
                        Productid : itemSection[bind].collectionId,
                        block : "blinds",
                        navigatedblockid : "",
                        type : "blinds",
                        listObject : productData,
                        listViewReference : addToShortlistCallback,
                        category : itemSection[bind].category, // blind category
                    };
                    Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
                }
            }

        }
    }
   }catch(ex){
        Ti.API.info('catch item click = '+ex.message);
    }
}



function addToShortlistCallback(e, productId) {
    try {
                Ti.API.info('else if'+e.bindId);
                var bind = e.bindId;
                var index = e.itemIndex;
                var a = e.section.items[index];

        if (!isNullVal(e.bindId) && e.bindId != "message") {
            

            if (!isNullVal(a[bind].collectionId)) {
                
             if (e.bindId == "gridWish1" || e.bindId == "gridWish2") {
                        if(productId=="add"){
                            a[bind].text = "\ue927";
                            a[bind].color = "#e65e48";
                            e.section.updateItemAt(index, a);                           
                        }else{
                            a[bind].text = "\ue60b";
                            a[bind].color = "#a6a6a6";                            
                            e.section.updateItemAt(index, a);
                        }
                       
                        
                    }

            }
        }
    } catch(ex) {
        Ti.API.info('ex.message = ' + ex.message);
    }

}


function addToShortlistSuccessCallback(response) {
    try {

        showAlert(args.mainWindow, response.message);
        googleAnalyticsShortlist(gaShortlistProduct,"ALL BLINDS");
    } catch(e) {
        Ti.API.info('catch = ' + (ex.message));

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
    showAlert($.allBlinds, e.message);
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
    $.blinds1ListView.fireEvent("itemclick", e);
}