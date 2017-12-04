var args = arguments[0] || {};

//$.loader.show();

var isLazyLoad = false;
var container = args.container;
var mainWindow = args.mainWindow;
var pageCount = 0,
    lookCount = 0;
     pageinationCount=0;
     currentPage=1;
var size = 2;
var gridDataArr = [];
var myDataArrCounter = 0;
var data = null;

var listData = [];

touchEffect.createTouchEffect($.viewall_btn, "#a6ffffff", Alloy.Globals.labelTitleColor);

init();

function filterData(_looksList) {
    //pageCount = pageCount + _looksList.length;
    size = 2;
    gridDataArr = [];
    var myDataArrCounter = 0;

    for (var i = 0; i < _looksList.length; i += size) {
        var smallPaginationArray = _looksList.slice(i, i + size);
        gridDataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallPaginationArray) + "");
        myDataArrCounter++;
    }
    var subGridData = "{" + gridDataArr + "}";
    var finalGridData = JSON.parse(subGridData);
    data = finalGridData;

    setLooks(data);
}

function init() {
    isLazyLoad = false;
    pageCount = 0,
    lookCount = 0;
    pageinationCount++;
    
    size = 2;
    gridDataArr = [];
    myDataArrCounter = 0;
    data = null;

    listData = [];

    //Ti.API.info('into init-->');
    $.curtainsSection.setItems([]);
    getQuizResult();
}

function getQuizResult() {
    //showLoader(container);
    //showLoader()

    showFullLoader(container);

    var requestMethod = Alloy.Globals.commonUrl.quizResult;
    Alloy.Globals.webServiceCall(requestMethod, {}, _getQuizResultSuccessCallback, _getQuizResultErrorCallback, "POST", container);
}

function _getQuizResultSuccessCallback(response) {
    //Ti.API.info('quiz success--->' + JSON.stringify(response));

    updateStyle(response);
    hideLoader();
    hideFullLoader();

}

function _getQuizResultErrorCallback(response) {
    hideLoader();
    hideFullLoader();
    //Ti.API.info('quiz error--->' + JSON.stringify(response));
}

function updateStyle(response) {
    try {

        var data = response.data;
        pageCount = response.data.looks_count;
        lookCount = response.data.looks.length;

        if (data.style === null) {
            //$.collectionContainer.setVisible(false);
            $.mystyle.remove($.collectionContainer);
            $.take_quiz_btn.setTop("50%");
            //$.take_quiz_btn.setBottom("10dp");

        } else {
            $.mystyle.add($.collectionContainer);
            $.take_quiz_btn.setTop("5%");
            $.take_quiz_btn.setText("TAKE QUIZ AGAIN");
            args.styleBgContainer.setImage(encodeURI(data.style_image));
            args.styleBgContainer.styleBg = data.style_image;
            $.styleHeader_lbl.setText("Your style based on your last Quiz Result");
            $.styleName_lbl.setText(data.style.toUpperCase());

            $.styleValue_lbl.setText(data.style_content);
            //var html = "<p style='text-align:justify'>" +data.style_content+"</p>";
            // $.styleValue_lbl.setHtml(html);

            if (data.looks.length != 0) {
                $.loadMore.setVisible(true);
                $.loadMore.setTouchEnabled(true);
                //$.collectionContainer.add($.loadMore);
                filterData(data.looks);
            } else {
                $.mystyle.remove($.collectionContainer);
            }

        }

        hideLoader();
        hideFullLoader();

    } catch(exp) {
        Ti.API.info('styles exception-->' + exp.message);
    }
}

function setLooks(_data) {
    try {

        listData = [];

        _.each(_data, function(value, k) {

            var image1 = "",
                collectionId1 = "",
                collectionName1 = "",
                attributesetname1 = "",
                gridCart1 = "",
                gridWhereToBuy1 = "",
                gridWish1 = "";
            gridShare1 = "",
            productSize1 = "",
            shareUrl1 = "";
            var image2 = "",
                collectionId2 = "",
                collectionName2 = "",
                attributesetname2 = "",
                gridCart2 = "",
                gridWhereToBuy2 = "",
                gridWish2 = "";
            gridShare2 = "",
            productSize2 = "",
            shareUrl2 = "";
            var imageContainer = "#ffffff";

            var imageContainer1 = "#ffffff";
            var logoText1 = "";

            var imageContainer2 = "#ffffff";
            var logoText2 = "";

            if (value[0]) {
                imageContainer1 = "#eeece7";

                image1 = value[0].profile_image;

                if (!isNullVal(image1)) {
                    logoText1 = "";
                } else {
                    logoText1 = Alloy.Globals.icon.logo;
                }

                collectionId1 = value[0].looks_id;
                collectionName1 = value[0].looks_name;
                //attributesetname1 = value[0].attributesetname;
                gridCart1 = "";
                gridWhereToBuy1 = "Where to buy";
                gridWish1 = Alloy.Globals.icon.shortlist;
                gridShare1 = Alloy.Globals.icon.share;
                shareUrl1 = value[0].url;

            }

            if (value[1]) {
                imageContainer2 = "#eeece7";

                image2 = value[1].profile_image;

                //logoText2 = Alloy.Globals.icon.logo;

                if (!isNullVal(image2)) {
                    logoText2 = "";
                } else {
                    logoText2 = Alloy.Globals.icon.logo;
                }

                collectionId2 = value[1].looks_id;
                collectionName2 = value[1].looks_name;
                // attributesetname2 = value[1].attributesetname;
                gridCart2 = "";
                gridWhereToBuy2 = "Where to buy";
                gridWish2 = Alloy.Globals.icon.shortlist;
                gridShare2 = Alloy.Globals.icon.share;
                shareUrl2 = value[1].url;

            }

            listData.push({
                properties : {

                },
                template : "gridTemplate",

                gridProductImage1 : {
                    image : encodeURI(image1),
                    collectionId : collectionId1,
                    collectionName : collectionName1,
                    backgroundColor : imageContainer1,
                },
                gridProductImage2 : {
                    image : encodeURI(image2),
                    collectionId : collectionId2,
                    collectionName : collectionName2,
                    backgroundColor : imageContainer2,
                },
                gridProductname1 : {
                    text : collectionName1,
                    collectionId : collectionId1,
                    collectionName : collectionName1,
                },
                gridProductname2 : {
                    text : collectionName2,
                    collectionId : collectionId2,
                    collectionName : collectionName2,
                },
                gridCart1 : {
                    text : "",
                    visible:false,
                },
                gridCart2 : {
                    text : "",
                    visible:false,
                },
                gridWhereToBuy1 : {
                    text : gridWhereToBuy1
                },
                gridWhereToBuy2 : {
                    text : gridWhereToBuy2
                },
                gridWish1 : {
                    text:gridWish1,
                    collectionId : collectionId1,
                    collectionName : collectionName1,
                },
                gridWish2 : {
                     text:gridWish2,
                    collectionId : collectionId2,
                    collectionName : collectionName2,
                },
                gridShare1 : {
                    text : gridShare1,
                    shareUrl : shareUrl1
                },
                gridShare2 : {
                    text : gridShare2,
                    shareUrl : shareUrl2
                },

                productSize1 : {
                    text : productSize1.toUpperCase(),
                    font : {
                        fontSize : 0
                    }
                },
                productSize2 : {
                    text : productSize2.toUpperCase(),
                    font : {
                        fontSize : 0
                    }
                },
                gridLogo0 : {
                    text : logoText1,
                    zIndex : 10
                },
                gridLogo : {
                    text : logoText2,
                    zIndex : 10
                },
                   outOfStock1 : {
                    visible : false,
                    collectionId : collectionId1,
                },
                outOfStock2 : {
                    visible :  false,
                    collectionId : collectionId2,
                }

            });

        });

        $.curtainsSection.appendItems(listData);
        
        currentPage++;

        if (pageCount === lookCount) {
            $.loadMore.text = "VIEW ALL";
            $.loadMore.color = Alloy.Globals.labelTitleColor;
        }
        else if(pageinationCount==3){
            $.loadMore.text = "VIEW ALL";
            $.loadMore.color = Alloy.Globals.labelTitleColor;
        }

        if (listData.length != 0) {

            var numberOfRow = $.curtainsSection.getItems().length;
            var listViewHeight = (((Alloy.Globals.imageWidth + 63) * numberOfRow) + 66);
            $.curtainsListView.setHeight(listViewHeight);

        }

      

    } catch(exp) {
        Ti.API.info('expcetion-->' + exp.message);
    }

}

function takeQuiz() {
    var obj = {
        init : init,
        myStyle : true,
        container : $.mystyle
    };
    Alloy.Globals.addWindowInNav("styleDiscovery", obj);
    $.mystyle.scrollTo(0, 0);
}

function looksListEvent(e) {

    if (e.bindId) {
        var bind = e.bindId;

        var index = e.itemIndex;
        var a = e.section.items[index];
        //Ti.API.info('a = ' + a[bind].collectionId);

        if (e.bindId == "gridWish1" || e.bindId == "gridWish2") {
            if (a[bind].collectionId != "") {

                var collectionData = {
                    collectionName : a[bind].collectionName,
                    collectionId : a[bind].collectionId,
                    type : "shopByLook",
                    mainWindow:mainWindow,
                };

                addShortlist = Alloy.createController('addToShortlist', collectionData).getView();
                addShortlist.zIndex = 11;
                mainWindow.add(addShortlist);
                hideShowView(addShortlist);
            }
        } else if (e.bindId == "gridProductImage1" || e.bindId == "gridProductImage2") {
            if (a[bind].collectionId != "") {

                var CollectionData = {
                    type : "shopByLook",
                    id : a[bind].collectionId
                };
                Alloy.Globals.addWindowInNav("productDetails", CollectionData);
            }
        } else if (e.bindId == "gridWhereToBuy1" || e.bindId == "gridWhereToBuy2") {
            if (a[bind].text != "") {

                Alloy.Globals.addWindowInNav("findStore");
            }

        } else if (e.bindId == "gridShare1" || e.bindId == "gridShare2") {
            //socialShare();
            if (a[bind].text != "") {

                if (e.bindId != "") {
                    shareImage(a[bind].shareUrl);
                }
            }
        }
    }

}

function viewAllStyle() {
    var shopByLookData = {
        type : "shopByLook",
        style : $.styleName_lbl.getText(),
        windowNav : "myAccount"
    };
    Alloy.Globals.addWindowInNav("productListing", shopByLookData);
}

/*lazy loading methods *****************/
/*
 $.curtainsListView.addEventListener("marker", function() {
 Ti.API.info('marker called');

 if (!isLazyLoad) {
 isLazyLoad = true;
 loadMoreStyle();
 }

 });
 */

function loadMoreStyle() {
    if ($.loadMore.getText() == "LOAD MORE") {


        //showLoader($.quizResults);
        //Ti.API.info('into load more');
        //if (isLazyLoad) {
        $.loader.show();
        $.loadMore.setVisible(false);

        var requestMethod = Alloy.Globals.commonUrl.allStyles;
        var param = {
            style : $.styleName_lbl.getText(),
            current_page :  currentPage,
            page_size : 6
        };

        var requestParam = JSON.stringify(param);
        //Ti.API.info('load more-->' + requestParam);

        Alloy.Globals.webServiceCall(requestMethod, requestParam, _loadMoreStyleSuccessCallback, _loadMoreStyleErrorCallback, "POST", args.container);
        //isLazyLoad = false;
        //}
    } else {
        viewAllStyle();
    }

}

function _loadMoreStyleSuccessCallback(response) {
    //Ti.API.info('looks result-->' + JSON.stringify(response));
    pageinationCount++;
    
    hideLoader();
    hideFullLoader();
    $.loader.hide();
    $.loadMore.setVisible(true);
    if (response.data.looks.length != 0) {
        
        //$.curtainsListView.height = (Alloy.Globals.imageWidth + 200);
        
        lookCount = lookCount + response.data.looks.length;
        pageCount = response.data.looks_count;

/*
        var ListViewHeight = parseInt($.curtainsListView.getHeight());
        var a = Alloy.Globals.imageWidth;
        $.curtainsListView.height = (ListViewHeight + a);
        */
        
        filterData(response.data.looks);

        

    } else {
        showAlert(args.container, "No More Looks");
    }
}

function _loadMoreStyleErrorCallback(response) {
    $.loader.hide();
    $.loadMore.setVisible(true);
    hideLoader();
    hideFullLoader();
    showAlert(args.container, response.message);
}

