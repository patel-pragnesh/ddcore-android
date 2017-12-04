var args = arguments[0] || {};

$.header.init({
    title : "QUIZ RESULT",
    //passWindow : $.quizResults,
});

$.header.getView("menuButton").addEventListener("click", goToBack);

var response = args.response;

$.quizImage.setImage(response.data.style_image);
$.collectionNameLbl.setText(response.data.style.toUpperCase());
$.quizDescription.setText(response.data.style_description);

var _looksList = response.data.looks;
var pageCount = response.data.looks_count;
var lookCount = _looksList.length;
 pageinationCount=1;
 
 
//Ti.API.info('look Count 1-->' + lookCount);
var currentPage = 2,
    currentStyle = response.data.style;

var size = 2;
var gridDataArr = [];
var myDataArrCounter = 0;

for (var i = 0; i < _looksList.length; i += size) {
    var smallPaginationArray = _looksList.slice(i, i + size);
    gridDataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallPaginationArray) + "");
    myDataArrCounter++;
}

var subGridData = "{" + gridDataArr + "}";
var finalGridData = JSON.parse(subGridData);
var data = finalGridData;
var listData = [];


if (_looksList.length === 0) {
    // Ti.API.info('into function 1-->');
    $.lookContainer.removeAllChildren();
    $.quizResults.remove($.lookContainer);
    
    setTimeout(function(){
        
        $.superScroll.scrollTo(0, 0);
    },500);
    
} else {
    // Ti.API.info('into function 2-->');
    looping_value();
    setTimeout(function(){
        
        $.superScroll.scrollTo(0, 0);
    },500);
}

touchEffect.createTouchEffect($.tourDeQuiz, "#a6ffffff", "#ffffff");

$.tourDeQuiz.addEventListener('click', function(e) {
    Alloy.Globals.popWindowInNav();
    Alloy.Globals.addWindowInNav("styleDiscovery");
    $.quizResults.close();

});

function looping_value(templateName) {

    try {

        listData = [];

        var template = templateName;

        _.each(data, function(value, k) {
            listData.push({
                properties : {},
                template : "gridTemplate",

                gridProductImage1 : {
                    image : value[0].profile_image,
                    collectionId : value[0].looks_id,
                    collectionName : value[0].looks_name,
                },
                gridProductImage2 : {
                    image : value[1].profile_image,
                    collectionId : value[1].looks_id,
                    collectionName : value[1].looks_name,
                },
                gridProductname1 : {
                    text : value[0].looks_name,
                    collectionId : value[0].looks_id,
                    collectionName : value[0].looks_name,
                },
                gridProductname2 : {
                    text : value[1].looks_name,
                    collectionId : value[1].looks_id,
                    collectionName : value[1].looks_name,
                },
                gridCart1 : {
                    text : "",
                    visible:false
                },
                gridCart2 : {
                    text : "",
                    visible:false
                },
                gridWhereToBuy1 : {
                    text : "Where to buy"
                },
                gridWhereToBuy2 : {
                    text : "Where to buy"
                },
                gridWish1 : {
                    collectionId : value[0].looks_id,
                    collectionName : value[0].looks_name,
                },
                gridWish2 : {
                    collectionId : value[1].looks_id,
                    collectionName : value[1].looks_name,
                },
                gridShare1 : {
                    shareUrl : value[0].url
                },
                gridShare2 : {
                    shareUrl : value[1].url
                },
                productSize1 : {
                    text : "",
                    font : {
                        fontSize : 0
                    }
                },
                productSize2 : {
                    text : "",
                    font : {
                        fontSize : 0
                    }
                },
                
                outOfStock1 : {
                    visible : false,
                    collectionId : value[0].looks_id,
                },
                outOfStock2 : {
                    visible :  false,
                    collectionId : value[1].looks_id,
                },


            });

        });

        $.mainSection.appendItems(listData);

       

       if (pageCount === lookCount) {
         $.curtainsLoadMore.text = "VIEW ALL";
            $.curtainsLoadMore.color = Alloy.Globals.labelTitleColor;
        }
        else if(pageinationCount==3){
          $.curtainsLoadMore.text = "VIEW ALL";
            $.curtainsLoadMore.color = Alloy.Globals.labelTitleColor;
        }
         
            
     
        
        if($.mainSection.getItems().length !=0){
            
            var numberOfRow = $.mainSection.getItems().length;
            var listViewHeight = (((Alloy.Globals.imageWidth + 63) * numberOfRow) + 66);
            $.listView.setHeight(listViewHeight);
        }
        
        
        

    } catch(exp) {
        Ti.API.info('expcetion-->' + exp.message);
    }

}

function loadMoreStyle() {
    //showLoader($.quizResults);
    if ($.curtainsLoadMore.text == "LOAD MORE") {

       

            $.loader.show();
            $.curtainsLoadMore.text = "";
            var requestMethod = Alloy.Globals.commonUrl.allStyles;
            var param = {
                style : currentStyle,
                current_page : currentPage,
                page_size : 2
            };

            var requestParam = JSON.stringify(param);

            // Ti.API.info('all styles-->' + requestParam);

            Alloy.Globals.webServiceCall(requestMethod, requestParam, loadMoreStyleSuccessCallback, loadMoreStyleErrorCallback, "POST", $.quizResults);

       
        
    } else {
        viewAllStyle();
    }
}

function loadMoreStyleSuccessCallback(response) {
    //Ti.API.info('looks result-->' + JSON.stringify(response));
    pageinationCount++;
    $.loader.hide();
   
    hideLoader();
    if (response.data.looks.length != 0) {
       
        lookCount = lookCount + response.data.looks.length;
        pageCount = response.data.looks_count;
       
        currentPage++;
        addMore(response);
        
    } else {
        showAlert($.quizResults, "No More Looks");
    }
}

function loadMoreStyleErrorCallback(response) {
    $.loader.hide();
    $.curtainsLoadMore.text = "LOAD MORE";
    hideLoader();
    showAlert($.quizResults, response.message);
}

function addMore(response) {
    var _looksList = response.data.looks;
    var size = 2;
    var gridDataArr = [];
    var myDataArrCounter = 0;

    for (var i = 0; i < _looksList.length; i += size) {
        var smallPaginationArray = _looksList.slice(i, i + size);
        gridDataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallPaginationArray) + "");
        myDataArrCounter++;
    }

    subGridData = "{" + gridDataArr + "}";
    var finalGridData = JSON.parse(subGridData);
    data = finalGridData;
    //Ti.API.info('data 1--->' + JSON.stringify(data));

    looping_value();
}

function goToBack() {
    Alloy.Globals.popWindowInNav();
    $.quizResults.close();
}

function cleanUp() {
   

    $.removeListener();

    $.quizResults.remove($.superScroll);
    $.superScroll.removeAllChildren();
    
    args = {};
    response = null;
    _looksList = null;
    pageCount = null;
    lookCount = null;
    currentPage = null;
    currentStyle = null;
    size = null;
    gridDataArr = [];
    myDataArrCounter = null;
    subGridData = null;
    finalGridData = null;
    data = null;
    listData = [];

    $.destroy();
}

function looksListEvent(e) {

    if (e.bindId) {
        var bind = e.bindId;

        var index = e.itemIndex;
        var a = e.section.items[index];
        //Ti.API.info('a = ' + a[bind].collectionId);
    }

    if (e.bindId == "gridWish1" || e.bindId == "gridWish2") {
        if (Ti.App.Properties.getString("access_token")) {

            var collectionData = {
                collectionName : a[bind].collectionName,
                collectionId : a[bind].collectionId,
                type : "shopByLook"
            };

            addShortlist = Alloy.createController('addToShortlist', collectionData).getView();
            //addShortlist.getView("collectionFabricController").zIndex= 5;
            addShortlist.zIndex = 11;

            //$.productListing.add(addShortlist);
            $.quizResults.add(addShortlist);
            hideShowView(addShortlist);

        } else {
            Alloy.Globals.addWindowInNav("signIn", "quizResults");
        }

    } else if (e.bindId == "gridProductImage1" || e.bindId == "gridProductImage2") {
        var CollectionData = {
            type : "shopByLook",
            id : a[bind].collectionId
        };
        Alloy.Globals.addWindowInNav("productDetails", CollectionData);
    } else if (e.bindId == "gridWhereToBuy1" || e.bindId == "gridWhereToBuy2") {
        Alloy.Globals.addWindowInNav("findStore");
    } else if (e.bindId == "gridShare1" || e.bindId == "gridShare2") {
        //socialShare();

        shareImage(a[bind].shareUrl);
    }

}

function viewAllStyle() {
    var shopByLookData = {
        type : "shopByLook",
        style : $.collectionNameLbl.getText(),
        windowNav : "myAccount"
    };
    Alloy.Globals.addWindowInNav("productListing", shopByLookData);
}

function updateCount() {
    $.header.updateCartCount();
}
