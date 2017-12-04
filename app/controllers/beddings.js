// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var beddingTypeContainer = [],
    beddingTypeLbl = [],
    forwardArrow = [],
    beddingCollection = [];
var beddingCollectionLbl = "";

googleAnalyticsScreen("BED LINEN DETAIL");

touchEffect.createTouchEffect($.beddingCloseLbl, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.beddingTypeCloseLbl, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.listAllLbl, "#a6ffffff", "#ffffff");

var beddingCollectionWidth = parseInt(Alloy.Globals.platformWidth - 10);

$.beddingTypeDetails.width = beddingCollectionWidth;
var beddingInnerContainer = parseInt(beddingCollectionWidth - 50);
var beddingWidthHeight = parseInt(beddingInnerContainer / 4);

$.beddingCloseLbl.addEventListener('click', function(e) {
    $.beddingDetails.removeEventListener('click', setBeddingCollection);
    //	hideShowView($.beddingView);
    $.beddingView.type = "";
    clearMemory();
});

$.beddingTypeCloseLbl.addEventListener('click', function(e) {
    $.beddingTypeView.setVisible(false);
});

function getBeddingdata() {
    showLoader($.beddingView);
    var url = Alloy.Globals.commonUrl.getBeddings;

    var data = {};

    var requestParams = JSON.stringify(data);

    Alloy.Globals.webServiceCall(url, requestParams, getBeddingdataSuccessCallback, getBeddingdataErrorCallback, "POST", $.beddingView);
}

getBeddingdata();

function getBeddingdataSuccessCallback(e) {
    try {
        //Ti.API.info('success = ' + JSON.stringify(e));
        //Ti.API.info('e.data.bedding = ' + JSON.stringify(e.data.bedding));
        if (e.data.bedding[0] != null) {
            setbeddingData(e.data.bedding);
        }
        if (e.data.listAll[0] != null) {
            $.listAllLbl.heading = e.data.listAll[0].heading;
            $.listAllLbl.categoryId = e.data.listAll[0].categoryId;
            $.listAllLbl.categoryName = e.data.listAll[0].categoryName;
        }

        hideLoader($.beddingView);
    } catch(ex) {
        hideLoader($.beddingView);
        Ti.API.info('catch = ' + ex.message);
    }
}

function getBeddingdataErrorCallback(e) {
    hideLoader($.beddingView);
    //Ti.API.info('e = ' + JSON.stringify(e));
}

function setbeddingData(beddingData) {
    _.each(beddingData, function(value, k) {
        //Ti.API.info('value = ' + JSON.stringify(value.category));

        beddingTypeContainer[k] = Ti.UI.createView({
            height : "40dp",
            top : "0dp",
            left : "0dp",
            width : Titanium.UI.FILL,
            layout : "vertical",
            id : k,
            layout : "horizontal",
            type : "beddingType",
            value : value.category,
            categoryId : value.categoryId,
            data : value.subcategories
        });

        beddingTypeLbl[k] = Ti.UI.createLabel({
            id : "lbl" + k,
            font : {
                fontSize : "13dp",
                fontFamily : "futura_medium_bt-webfont"
            },
            color : "#e65e48",
            top : "0dp",
            left : "0dp",
            height : "40dp",
            width : "80%",
            touchEnabled : false,
            text : value.category.toUpperCase(),
            value : value.category
        });

        forwardArrow[k] = Ti.UI.createLabel({
            id : "icon" + k,
            font : {
                fontSize : "14dp",
                fontFamily : "icomoon"
            },
            color : "#cccccc",
            top : "0dp",
            right : "0dp",
            height : "40dp",
            width : "18%",
            touchEnabled : false,
            textAlign : Titanium.UI.TEXT_ALIGNMENT_RIGHT,
            text : Alloy.Globals.icon.leftArrow,
            value : value.category,
            visible:false,
        });
        beddingTypeContainer[k].add(beddingTypeLbl[k]);
        //if (value.category != "For Kids") {
        if (!isNullVal(value.subcategories)) {
            beddingTypeContainer[k].add(forwardArrow[k]);

            beddingTypeContainer[k].addEventListener("touchstart", function(e) {
                beddingTypeContainer[k].children[0].color = "#a6e65e48";
                beddingTypeContainer[k].children[1].color = "#a6cccccc";
            });
            beddingTypeContainer[k].addEventListener("touchend", function(e) {
                beddingTypeContainer[k].children[0].color = "#e65e48";
                beddingTypeContainer[k].children[1].color = "#cccccc";
            });
            beddingTypeContainer[k].addEventListener("touchcancel", function(e) {
                beddingTypeContainer[k].children[0].color = "#e65e48";
                beddingTypeContainer[k].children[1].color = "#cccccc";
            });
        }
        $.beddingDetails.add(beddingTypeContainer[k]);

    });

}

$.beddingDetails.addEventListener('click', setBeddingCollection);

function setBeddingCollection(e) {
    beddingCollection = [];
    
    try{
        
    
    if (!isNullVal(e.source.value)) {
            var collectionAllData = {
                wName : "",
                categoryId : e.source.categoryId,
                type : "C_Product",
                categoryType : "shop",
                subTitle : e.source.value,
                categoryName : "BED LINEN",
                category : "BED LINEN",
            };

            Alloy.Globals.addWindowInNav("productListing", collectionAllData);
            
        }
    
    }
    catch(ex){
        Ti.API.info('catch excepection--> '+ex.message); 
    }
    

    //if (e.source.value != "For Kids") {
        /*
    if (!isNullVal(e.source.data)) {

        $.beddingTypeDetails.removeAllChildren();
        $.beddingTypeLbl.text = e.source.value.toUpperCase() + " COLLECTIONS";
        if (e.source.data[0] != null) {
            _.each(e.source.data, function(value, k) {

                var beddingContainer = Ti.UI.createView({
                    width : beddingWidthHeight,
                    height : beddingWidthHeight,
                    top : "10dp",
                    left : "10dp",
                    backgroundColor : "#595959",
                    backgroundGradient : {
                        type : 'linear',
                        colors : [{
                            color : '#80000000', //40000000
                            position : 0
                        }, {
                            color : 'transparent',
                            position : 1.0
                        }],
                        startPoint : {
                            x : "0",
                            y : "100%"
                        },
                        endPoint : {
                            x : "0",
                            y : "70%"
                        },
                        backFillStart : false
                    },
                    categoryId : value.categoryId,
                    type : "beddingCollection",
                    value : value.name,
                    subTitle : e.source.value,
                });

                beddingCollection = Ti.UI.createImageView({
                    image : value.image,
                    backgroundGradient : {
                        type : 'linear',
                        colors : [{
                            color : '#80000000', //40000000
                            position : 0
                        }, {
                            color : 'transparent',
                            position : 1.0
                        }],
                        startPoint : {
                            x : "0",
                            y : "100%"
                        },
                        endPoint : {
                            x : "0",
                            y : "70%"
                        },
                        backFillStart : false
                    },
                    value : value.name,
                    subTitle : e.source.value,
                    backgroundColor : "#595959",
                    categoryId : value.categoryId,
                    type : "beddingCollection",
                });
                beddingCollectionLbl = Ti.UI.createLabel({
                    id : "lbl" + k,
                    font : {
                        fontSize : "8dp",
                        fontFamily : "futura_medium_bt-webfont"
                    },
                    color : "#ffffff",
                    textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
                    touchEnabled : false,
                    text : value.name.toUpperCase(),
                    zIndex : "-1"
                });
                beddingContainer.add(beddingCollection);
                beddingContainer.add(beddingCollectionLbl);
                $.beddingTypeDetails.add(beddingContainer);
                //$.beddingTypeDetails.add(beddingCollectionLbl);
            });
        }
        $.beddingTypeView.setVisible(true);
    } else {
        //else if (e.source.value == "For Kids") {
        if (!isNullVal(e.source.value)) {
            var collectionAllData = {
                wName : "",
                categoryId : e.source.categoryId,
                type : "C_Product",
                categoryType : "shop",
                subTitle : e.source.value,
                categoryName : "BED LINEN",
                category : "BED LINEN",
            };

            Alloy.Globals.addWindowInNav("productListing", collectionAllData);
            
        }
    }
    
    */
}

$.listAllLbl.addEventListener('click', function(e) {
    var collectionAllData = {
        wName : "",
        categoryId : e.source.categoryId,
        type : "C_Product",
        categoryType : "shop",
        subTitle : e.source.heading,
        categoryName : "BED LINEN",
        category : "BED LINEN",
    };

    Alloy.Globals.addWindowInNav("productListing", collectionAllData);
});

$.beddingTypeDetails.addEventListener('click', getCollectionDetails);

function getCollectionDetails(e) {
    //Ti.API.info('e.source.type = ' + e.source.type);

    if (e.source.type == "beddingCollection") {
        var collectionAllData = {
            wName : e.source.value,
            categoryId : e.source.categoryId,
            type : "C_Product",
            categoryType : "shop",
            subTitle : e.source.subTitle,
            categoryName : "BED LINEN",
            category : "BED LINEN",
        };

        Alloy.Globals.addWindowInNav("productListing", collectionAllData);
    }
}

function clearMemory() {
   
    // $.beddingView.removeAllChildren();

    if ($.beddingView.children[3].getVisible()) {
        $.beddingView.children[3].setVisible(false);
    } else {
         $.removeListener();
        //hideShowView(beddingContainer);
        beddingContainer = "";

        var args = {};
        beddingTypeContainer = [];
        beddingTypeLbl = [];
        forwardArrow = [];
        beddingCollection = [];
        beddingCollectionLbl = null;

        beddingCollectionWidth = null;

        beddingInnerContainer = null;
        beddingWidthHeight = null;

        Alloy.Globals.popWindowInNav();
        //Alloy.Globals.destroyWindowInNav();

        $.beddingView.close();
    }
    //$.destroy();
}

