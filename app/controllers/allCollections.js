var args = arguments[0] || {};
var upholsteryPage = 1;
var beddingPage = 1;
var curtainPage = 1;
var beddingTotalCount,
    upholsteryTotalCount,
    curtainTotalCount,
    beddingLoaddedCount,
    upholsteryLoaddedCount,
    curtainLoaddedCount,
    imageContainer,
    logoText;
var addShortlist = "";

var shareUrl1,
    shareUrl2;
$.header.init({
    title : "ALL COLLECTIONS",
    passWindow : $.allCollections,
});

/*
* set listview height
*/
//$.curtainsListView.height=parseInt(Alloy.Globals.imageWidth+50);

touchEffect.createTouchEffect($.curtainsLoadMore, "#a6333333", "#333333");
touchEffect.createTouchEffect($.curtainsViewAllLbl, "#a6e65e48", "#e65e48");
touchEffect.createTouchEffect($.curtainsrightArrow, "#a6e65e48", "#e65e48");

touchEffect.createTouchEffect($.upholsteryLoadMore, "#a6333333", "#333333");
touchEffect.createTouchEffect($.upholsteryViewAllLbl, "#a6e65e48", "#e65e48");
touchEffect.createTouchEffect($.upholsteryrightArrow, "#a6e65e48", "#e65e48");

$.collectionScroll.addEventListener('click', hideOverFlowMenu);

function hideOverFlowMenu(e) {
    if (Alloy.Globals.overFlowFlag) {
        $.header.hideOverFlow();
    };
}

var curtainsSection;

/*
 * Fetch All collections
 */

function getAllCollection() {
    showLoader($.allCollections);
    var url = Alloy.Globals.commonUrl.getAllCollection;

    var data = {
        "pagination" : {
            "UPHOLSTERY" : {
                "page_no" : upholsteryPage,
                "page_size" : 6
            },
            "CURTAIN" : {
                "page_no" : curtainPage,
                "page_size" : 6
            }
        },
        "sortby" : ""
        //"sortby" : "latest"
    };

    var requestParams = JSON.stringify(data);

    Alloy.Globals.webServiceCall(url, requestParams, allCollectionSuccessCallback, allCollectionErrorCallback, "POST", $.allCollections, true);
}

var preprocessForListView = function(rawData, categoryType) {
    Ti.API.info('categoryType-->' + categoryType);

    return _.map(rawData, function(item) {

        if (item[0]) {
            gridProductname1 = item[0].collection_name;
            collectionId1 = item[0].collection_id;
            collectionImage1 = encodeURI(item[0].image);
            //collectionImage1 = "/images/product1.jpg";
            gridWhereToBuy1 = "Where to buy";
            //gridCart1 = Alloy.Globals.icon.bag;
            gridShare1 = Alloy.Globals.icon.share;
            gridWish1 = Alloy.Globals.icon.shortlist;
            gridCart1 = "";
            shareUrl1 = item[0].collection_url;
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
            shareUrl1 = "";
        }
        if (item[1]) {
            gridProductname2 = item[1].collection_name;
            collectionId2 = item[1].collection_id;
            collectionImage2 = encodeURI(item[1].image);
            //collectionImage2 = "/images/product2.jpg";
            gridWhereToBuy2 = "Where to buy";
            //gridCart2 = Alloy.Globals.icon.bag;
            gridShare2 = Alloy.Globals.icon.share;
            gridWish2 = Alloy.Globals.icon.shortlist;
            gridCart2 = "";
            imageContainer = "#eeece7";
            shareUrl2 = item[1].collection_url;
            //f4f4f4
            logoText = "\ue955";
            //\ue92a
            // gridShare2 = "";
            // gridWish2 = "";
        } else {
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
                text : (!isNullVal(gridProductname1)) ? gridProductname1.toUpperCase() : gridProductname1,
                //text : gridProductname1.toUpperCase(),
                collectionId : collectionId1,
                category : categoryType

            },
            gridProductname2 : {
                //text : gridProductname2.toUpperCase(),
                text : (!isNullVal(gridProductname2)) ? gridProductname2.toUpperCase() : gridProductname2,
                collectionId : collectionId2,
                category : categoryType

            },
            gridCart1 : {
                text : gridCart1,
                collectionId : collectionId1,
                category : categoryType,
                visible : (gridCart1 == "" ? false : true)
            },
            gridCart2 : {
                text : gridCart2,
                collectionId : collectionId2,
                category : categoryType,
                visible : (gridCart2 == "" ? false : true)

            },
            gridShare1 : {
                collectionId : collectionId1,
                text : gridShare1,
                shareUrl : shareUrl1,
                category : categoryType

            },
            gridShare2 : {
                collectionId : collectionId2,
                text : gridShare2,
                shareUrl : shareUrl2,
                category : categoryType

            },
            gridWish1 : {
                collectionId : collectionId1,
                iconValue : "\ue60b",
                text : gridWish1,
                collectionName : gridProductname1,
                category : categoryType

            },
            gridWish2 : {
                value : collectionId2,
                collectionId : collectionId2,
                iconValue : "\ue60b",
                text : gridWish2,
                collectionName : gridProductname2,
                category : categoryType

            },
            gridProductImage1 : {
                image : collectionImage1,
                collectionId : collectionId1,
                category : categoryType
                //image : "/images/product1.jpg"
            },
            gridProductImage2 : {
                image : collectionImage2,
                collectionId : collectionId2,
                category : categoryType
                //image : "/images/product2.jpg"
            },
            gridWhereToBuy1 : {
                text : gridWhereToBuy1,
                collectionId : collectionId1,
                category : categoryType,
                product_name_ga : (!isNullVal(gridProductname1)) ? gridProductname1.toUpperCase() : gridProductname1,
            },
            gridWhereToBuy2 : {
                text : gridWhereToBuy2,
                collectionId : collectionId2,
                category : categoryType,
                product_name_ga : (!isNullVal(gridProductname2)) ? gridProductname2.toUpperCase() : gridProductname2,
            },
            productSize1 : {
                collectionId : collectionId1,
                text : "",
                height : "0",
                category : categoryType

            },
            productSize2 : {
                collectionId : collectionId2,
                text : "",
                height : "0",
                category : categoryType
            },
            imageContainer : {
                backgroundColor : imageContainer,
                category : categoryType
            },
            gridLogo : {
                text : logoText,
                category : categoryType
            },
            outOfStock1 : {
                visible : false,
                collectionId : collectionId1,
            },
            outOfStock2 : {
                visible : false,
                collectionId : collectionId2,
            }

        };

    });
};

function emptyData() {

    return [{
        properties : {

        },
        template : 'emptyTemplate',
        message : {
            text : "THERE ARE NO COLLECTIONS IN THIS CATEGORY."
        }
    }];
}

function allCollectionSuccessCallback(e) {
    //Ti.API.info('data in controller = ' +JSON.stringify(e));

    try {
        var UPHOLSTERY = e.data.collection_data[0].product_data;
        var CURTAIN = e.data.collection_data[1].product_data;
        $.upholsteryNameLbl.text = e.data.collection_data[0].enduseName;
        $.curtainNameLbl.text = e.data.collection_data[1].enduseName;

        if (UPHOLSTERY.length > 0) {
            $.upholsteryListView.height = (((Alloy.Globals.imageWidth + 63) * 3) + 56);
            //$.upholsteryListView.height = (Alloy.Globals.imageWidth + 133);
            //$.upholsteryListView.height = (Alloy.Globals.imageWidth);
            upholsteryTotalCount = e.data.collection_data[0].total_count;
            upholsteryLoaddedCount = UPHOLSTERY.length;
            $.upholsteryLoadMoreLbl.categoryName = e.data.collection_data[0].enduseName;
            $.upholsteryViewAllLbl.categoryName = e.data.collection_data[0].enduseName;
            $.upholsteryViewAllContainer.categoryName = e.data.collection_data[0].enduseName;
            $.upholsteryrightArrow.categoryName = e.data.collection_data[0].enduseName;
        }

        if (upholsteryTotalCount <= 6) {
            $.upholsteryLoadMoreLbl.color = "#e65e48";
            $.upholsteryLoadMoreLbl.text = "VIEW ALL";
        }

        if (CURTAIN.length > 0) {
            //	$.curtainsListView.height = (Alloy.Globals.imageWidth + 133);
            $.curtainsListView.height = (((Alloy.Globals.imageWidth + 63) * 3) + 56);
            curtainTotalCount = e.data.collection_data[1].total_count;
            curtainLoaddedCount = CURTAIN.length;
            $.curtainsLoadMoreLbl.categoryName = e.data.collection_data[1].enduseName;
            $.curtainsViewAllLbl.categoryName = e.data.collection_data[1].enduseName;
            $.curtainViewAllContainer.categoryName = e.data.collection_data[1].enduseName;
            $.curtainsrightArrow.categoryName = e.data.collection_data[1].enduseName;
        }

        if (curtainTotalCount <= 6) {
            $.curtainsLoadMoreLbl.color = "#e65e48";
            $.curtainsLoadMoreLbl.text = "VIEW ALL";
        }

        var size = 2;

        var upholsteryDataArr = [];
        var curtainDataArr = [];
        var myDataArrCounter = 0;

        for (var i = 0; i < 6; i += size) {

            if (UPHOLSTERY.length > 0) {
                var smallUpholsteryArray = UPHOLSTERY.slice(i, i + size);
                upholsteryDataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallUpholsteryArray) + "");
            }
            if (CURTAIN.length > 0) {
                var smallCurtainArray = CURTAIN.slice(i, i + size);
                curtainDataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallCurtainArray) + "");
            }
            myDataArrCounter++;
        }

        upholsteryData = "{" + upholsteryDataArr + "}";
        curtainData = "{" + curtainDataArr + "}";

        var finalUpholsteryData = JSON.parse(upholsteryData);
        var finalCurtainData = JSON.parse(curtainData);

        if (UPHOLSTERY.length > 0) {
            var upholsteryToAdd = preprocessForListView(finalUpholsteryData, "UPHOLSTERY");
            //UPHOLSTERY//finalUpholsteryData
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
    } catch(ex) {
        hideLoader($.allCollections);
        Ti.API.info('catch ex = ' + ex.message);
        showAlert($.allCollections, "Something went wrong...");
        setTimeout(function() {
            goToBack();
        }, 1000);
    }
}

function allCollectionErrorCallback(e) {
    hideLoader($.allCollections);
    showAlert($.allCollections, e.message);
    goToBack();
}

getAllCollection();

$.upholsteryLoadMore.addEventListener('click', upholsteryDataFn);

function upholsteryDataFn(e) {
    if (upholsteryLoaddedCount != upholsteryTotalCount && e.source.categoryName && upholsteryLoaddedCount != "18") {
        $.upholsteryLoadMoreLbl.text = "";
        $.upholsteryActivityIndicator.show();
        $.upholsteryLoadMore.touchEnabled = false;
        $.upholsteryLoadMoreLbl.touchEnabled = false;

        loadMoreData(e.source.categoryName, upholsteryPage, 6);
    } else if ($.upholsteryLoadMoreLbl.text == "VIEW ALL") {
        $.upholsteryLoadMoreLbl.color = "#e65e48";

        collectionAllData = "";
        collectionAllData = {
            categoryName : e.source.categoryName,
            WindowName : e.source.categoryName,
            type : "collection",
            block : "collection"
        };

        Alloy.Globals.addWindowInNav("productListing", collectionAllData);

    } else {
        $.upholsteryLoadMoreLbl.color = "#e65e48";
        $.upholsteryLoadMoreLbl.text = "VIEW ALL";
    }
}

$.curtainsLoadMore.addEventListener('click', curtainsDataFn);

function curtainsDataFn(e) {
    if (curtainLoaddedCount != curtainTotalCount && e.source.categoryName && curtainLoaddedCount != "18") {
        $.curtainsLoadMoreLbl.text = "";
        $.curtainsActivityIndicator.show();
        $.curtainsLoadMore.touchEnabled = false;
        loadMoreData(e.source.categoryName, curtainPage, 6);
    } else if ($.curtainsLoadMoreLbl.text == "VIEW ALL") {
        $.curtainsLoadMoreLbl.color = "#e65e48";
        collectionAllData = "";
        collectionAllData = {
            categoryName : e.source.categoryName,
            WindowName : e.source.categoryName,
            type : "collection",
            block : "collection"
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
    switch(name) {

    case "UPHOLSTERY" :
        data = {
            "collection_enduse" : name,
            "pagination" : {
                "UPHOLSTERY" : {
                    "page_no" : pageNo,
                    "page_size" : limit
                }
            }
        };
        break;

    case "CURTAIN" :
        data = {
            "collection_enduse" : name,
            "pagination" : {
                "CURTAIN" : {
                    "page_no" : pageNo,
                    "page_size" : limit
                }
            }
        };
        break;
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
            paginationDataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallPaginationArray) + "");

            myDataArrCounter++;
        }

        loadMorePaginationData = "{" + paginationDataArr + "}";

        var finalPaginationData = JSON.parse(loadMorePaginationData);
        if (!isNullVal(finalPaginationData)) {

            switch(enduseName) {

            case "UPHOLSTERY" :
                $.upholsteryLoadMoreLbl.text = "LOAD MORE";
                $.upholsteryActivityIndicator.hide();
                $.upholsteryLoadMore.touchEnabled = true;
                $.upholsteryLoadMoreLbl.touchEnabled = true;
                upholsteryLoaddedCount = (upholsteryLoaddedCount + paginationData.length);

                if (paginationData.length < 6) {
                    $.upholsteryLoadMoreLbl.color = "#e65e48";
                    $.upholsteryLoadMoreLbl.text = "VIEW ALL";
                } else if (upholsteryLoaddedCount == 18) {
                    $.upholsteryLoadMoreLbl.color = "#e65e48";
                    $.upholsteryLoadMoreLbl.text = "VIEW ALL";
                }

                var ListViewHeight = parseInt($.upholsteryListView.getHeight());
                //var a = (216*(BEDDING.length/2));
                //var a = (Alloy.Globals.imageWidth + 56);
                var a = ((Alloy.Globals.imageWidth * 3) + 175);
                //216//432

                $.upholsteryListView.height = (ListViewHeight + a);
                var dataToAdd = preprocessForListView(finalPaginationData, "UPHOLSTERY");
                $.upholsteryListView.sections[0].appendItems(dataToAdd);
                upholsteryPage++;
                break;

            case "CURTAIN" :
                $.curtainsLoadMoreLbl.text = "LOAD MORE";
                $.curtainsActivityIndicator.hide();
                $.curtainsLoadMore.touchEnabled = true;
                curtainLoaddedCount = (curtainLoaddedCount + paginationData.length);

                if (paginationData.length < 6) {
                    $.curtainsLoadMoreLbl.color = "#e65e48";
                    $.curtainsLoadMoreLbl.text = "VIEW ALL";
                } else if (curtainLoaddedCount == 18) {
                    $.curtainsLoadMoreLbl.color = "#e65e48";
                    $.curtainsLoadMoreLbl.text = "VIEW ALL";
                }

                var ListViewHeight = parseInt($.curtainsListView.getHeight());
                //var a = (216*(BEDDING.length/2));
                //var a = (Alloy.Globals.imageWidth + 56);
                var a = ((Alloy.Globals.imageWidth * 3) + 175);
                //216//432

                $.curtainsListView.height = (ListViewHeight + a);
                var dataToAdd = preprocessForListView(finalPaginationData, "CURTAIN");
                $.curtainsListView.sections[0].appendItems(dataToAdd);
                curtainPage++;
                break;
            }

        }
    } catch(e) {
        Ti.API.info('catch error = ' + e.message);
    }
}

function loadmoreErrorCallback(e) {
    //Ti.API.info('e= ' + JSON.stringify(e));
    showAlert($.allCollections, e.message);
}

$.upholsteryViewAllContainer.addEventListener('click', categoryViewAll);
$.curtainViewAllContainer.addEventListener('click', categoryViewAll);

function categoryViewAll(e) {
    collectionAllData = "";
    //Ti.API.info('categoryName-->' + e.source.categoryName);
    if (!isNullVal(e.source.categoryName)) {
        collectionAllData = {
            categoryName : e.source.categoryName,
            WindowName : e.source.categoryName,
            type : "collection",
            block : "collection"
        };

        Alloy.Globals.addWindowInNav("productListing", collectionAllData);
    }
}

$.upholsteryListView.addEventListener('itemclick', addToShortlist);

$.curtainsListView.addEventListener('itemclick', addToShortlist);

function addToShortlist(e) {
    try {
        if (!isNullVal(e.bindId) && e.bindId != "message") {
            var bind = e.bindId;
            var index = e.itemIndex;
            var a = e.section.items[index];

            if (e.bindId == "gridWish1" || e.bindId == "gridWish2") {

                if (Ti.App.Properties.getString("access_token")) {
                    var collectionData = {
                        collectionName : a[bind].collectionName,
                        collectionId : a[bind].collectionId,
                        type : "collection"
                    };
                    addShortlist = Alloy.createController('addToShortlist', collectionData).getView();
                    $.allCollections.add(addShortlist);
                    hideShowView(addShortlist);

                } else {
                    //Alloy.Globals.addWindowInNav("signIn", "allCollections");

                    Alloy.Globals.addWindowInNav("signIn", {
                        listObject : e,
                        listViewReference : addToShortlist,
                    });

                }

            } else if (e.bindId == "gridWhereToBuy1" || e.bindId == "gridWhereToBuy2") {
                if (!isNullVal(a[bind].collectionId)) {
                    var gaLeadProductArray = {};
                    gaLeadProductArray = {
                        name : a[bind].product_name_ga || "NA",
                        sku : a[bind].collectionId
                    };
                    generateLead(gaLeadProductArray, "All Collection Page");
                }

                Alloy.Globals.addWindowInNav("findStore");
            } else if (e.bindId == "gridShare1" || e.bindId == "gridShare2") {
                // socialShare();
                //Ti.API.info('shareUrl is'+a[bind].shareUrl);
                // var shareProductUrl='http://dev.ddecor.com/collection/silky-satin';
                shareImage(a[bind].shareUrl);
            } else {
                if (e.bindId != "message") {
                    var CollectionData = {
                        type : "collection",
                        category : a[bind].category,
                        id : a[bind].collectionId,//722

                    };
                    Alloy.Globals.addWindowInNav("productDetails", CollectionData);
                }
            }
        }
    } catch(ex) {
        Ti.API.info('catch item click = ' + ex.message);
    }
}

//Alloy.Globals.setCount();

function goToBack() {

    if (addShortlist.type == "shortlist") {
        hideShowView(addShortlist);
        addShortlist = "";
    } else {
        $.curtainsListView.removeEventListener('itemclick', addToShortlist);
        $.upholsteryListView.removeEventListener('itemclick', addToShortlist);
        $.collectionScroll.removeEventListener('click', hideOverFlowMenu);
        $.upholsteryLoadMore.removeEventListener('click', upholsteryDataFn);
        $.curtainsLoadMore.removeEventListener('click', curtainsDataFn);
        $.upholsteryViewAllContainer.removeEventListener('click', categoryViewAll);
        $.curtainViewAllContainer.removeEventListener('click', categoryViewAll);
        //	args = {};
        Alloy.Globals.popWindowInNav();
        $.allCollections.close();
    }
}

function destroyWindow(e) {
    //$.allCollections.removeAllChildren();

    $.removeListener();
    $.allCollections.remove($.collectionScroll);
    $.collectionScroll.removeAllChildren();
    $.destroy();
}

function updateCount() {
    $.header.updateCartCount();
}