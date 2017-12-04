var args = arguments[0] || {};

//Ti.API.info('args=  '+JSON.stringify(args));

var argsData = args;



var navigatedCollectionId = "";
var gridListContainer = "";
var productPrice = null;
var shortlistData;
var gaProductSku = "";
var gaShortlistProduct = {};
if (!isNullVal(args.navigatedblockid)) {
    // Ti.API.info('in if');
    navigatedCollectionId = args.navigatedblockid;
}
var measurement = "";
measurement = require('alloy/measurement');
var argsData_block = "";
if (!isNullVal(argsData.block)) {
    argsData_block = argsData.block;
    if (argsData.block == "collection" || argsData.block == "look") {
        //$.ratingView.visible = false;
        $.availableDesigLbl.text = "AVAILABLE DESIGNS";
        $.similarProductLbl.text = "SIMILAR PRODUCTS";
        $.matchesBestWithLbl.text = "MATCHES BEST WITH";
        $.storeLocator.type = "collection";
        var text = "\ue90a FIND A D'DECOR STORE NEAR YOU";

        var attr = Ti.UI.createAttributedString({
            text : text,
            attributes : [{
                type : Ti.UI.ATTRIBUTE_FONT,
                value : {
                    fontSize : 10,
                    fontFamily : 'futura_medium_bt-webfont'
                },
                range : [text.indexOf("FIND A D'DECOR STORE NEAR YOU"), ("FIND A D'DECOR STORE NEAR YOU").length]
            }]
        });

    } else if (argsData.block == "blinds") {
        $.availableDesigLbl.text = "ALSO AVAILABLE IN TYPES";
        $.similarProductLbl.text = "SIMILAR PRODUCTS";
        $.matchesBestWithLbl.text = "PEOPLE ALSO VIEWED";
        $.storeLocator.type = "blinds";
        var text = Alloy.Globals.icon.requestSample + " REQUEST A FREE SAMPLE";

        var attr = Ti.UI.createAttributedString({
            text : text,
            attributes : [{
                type : Ti.UI.ATTRIBUTE_FONT,
                value : {
                    fontSize : 10,
                    fontFamily : 'futura_medium_bt-webfont'
                },
                range : [text.indexOf("REQUEST A FREE SAMPLE"), ("REQUEST A FREE SAMPLE").length]
            }]
        });
    }

    $.storeLocator.attributedString = attr;

    /*TODO Request Free Sample has been disabled to time begin as per discussion with Bhairav*/

    $.storeLocator.setTouchEnabled(false);
    $.storeLocator.setVisible(false);

} else {
    argsData_block = "collection";
}

// Ti.API.info('outer');
var selectedView = [];
var imageContainerArr = [];
var similarQdsData = "";
var matchBestWithData = "";
var fabricCalculator = "";
var productId,
    productName,
    colorView;
var matchBestWithDataCount = "",
    similarQdsDataCount = "";
var availabledesign_data_count = "";
var productAttributes = "";
var image_data;
var wishFlag;
var sharingProductUrl = "";
var previewImage = "";
$.header.init({
    title : "DETAILS",
    passWindow : $.collectionQdsDetails,
});
$.header.updateCartCount();

touchEffect.createTouchEffect($.estimateLbl, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.whereToByeLbl, "#a6ffffff", "#ffffff");

touchEffect.createTouchEffect($.closeLbl, "#a6333333", "#333333");

touchEffect.createTouchEffect($.shareIcon, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.upArrowLbl, "#a6000000", "#000000");
touchEffect.createTouchEffect($.storeLocator, "#a6ffffff", "#ffffff");

$.estimateLbl.width = Alloy.Globals.platformWidth / 2;
$.whereToByeLbl.width = Alloy.Globals.platformWidth / 2;

var designContainer = parseInt(Alloy.Globals.platformWidth - 50);
var designWidth = parseInt(designContainer / 4);

$.availableDesignScroll.height = parseInt(designWidth + 20);


/*
 * set dynamic height and width for rating
 */
$.subRatingContainer.width = parseInt(Alloy.Globals.platformWidth);
var ratingContainer = parseInt(Alloy.Globals.platformWidth - 120);
var ratingWidth = parseInt(ratingContainer / 5);

$.subRatingContainer.height = ratingWidth;

$.rate1.height = ratingWidth;
$.rate2.height = ratingWidth;
$.rate3.height = ratingWidth;
$.rate4.height = ratingWidth;
$.rate5.height = ratingWidth;

$.rate1.width = ratingWidth;
$.rate2.width = ratingWidth;
$.rate3.width = ratingWidth;
$.rate4.width = ratingWidth;
$.rate5.width = ratingWidth;


$.readMoreLbl.addEventListener('click', readMoreToggle);

$.whereToByeLbl.addEventListener('click', function() {
    Alloy.Globals.addWindowInNav("findStore");
});

function readMoreToggle(e) {
    //$.descriptionLbl.maxLines = 10;
    $.descriptionLbl.height = Ti.UI.SIZE;
    $.readMoreLbl.text = "";
}

// /*
// * set attributestring to store locator label
// */
// var text = "\ue90a FIND A D'DECOR STORE NEAR YOU";
// var attr = Ti.UI.createAttributedString({
// text : text,
// attributes : [{
// type : Ti.UI.ATTRIBUTE_FONT,
// value : {
// fontSize : 10,
// fontFamily : 'futura_medium_bt-webfont'
// },
// range : [text.indexOf("FIND A D'DECOR STORE NEAR YOU"), ("FIND A D'DECOR STORE NEAR YOU").length]
// }]
// });
//
// $.storeLocator.attributedString = attr;

$.upArrowLbl.removeEventListener('click', scrollToEffect);
$.upArrowLbl.addEventListener('click', scrollToEffect);

function scrollToEffect(e) {
    $.superScroll.scrollTo(0, 0);
}

// $.superScroll.addEventListener('touchend',function(e){
// Ti.API.info('scroll end');
// });
$.superScroll.addEventListener('touchend', upArrowEffect);

function upArrowEffect(e) {
    var ycordinates = $.superScroll.contentOffset.y;

    if (ycordinates >= 30) {
        $.upArrowLbl.visible = true;
        setTimeout(function() {
            $.upArrowLbl.visible = false;
        }, 5000);
    } else if (ycordinates == 0) {
        $.upArrowLbl.visible = false;
    }
}

$.collectionQdsDetails.removeEventListener('click', hideOverFlowMenu);
$.collectionQdsDetails.addEventListener('click', hideOverFlowMenu);

function hideOverFlowMenu(e) {
    if (Alloy.Globals.overFlowFlag && e.source.id != "overFlowMenuLbl") {
        $.header.hideOverFlow();
    };
}

function getCollectionQdsDetails(qdsData) {

    var _qdsData = qdsData;
    var _qdsData_productid = "",
        _qdsData_block = "",
        _qdsData_navigatedblockid = "";
    showLoader($.collectionQdsDetails);

    if (!isNullVal(_qdsData.Productid)) {
        _qdsData_productid = _qdsData.Productid;
    }
    if (!isNullVal(_qdsData.block)) {
        _qdsData_block = _qdsData.block;
    }
    if (!isNullVal(_qdsData.navigatedblockid)) {
        _qdsData_navigatedblockid = _qdsData.navigatedblockid;
    } else {
        _qdsData_navigatedblockid = "";
    }

    var url = Alloy.Globals.commonUrl.qdsDetail;

    var data = {
        Productid : _qdsData_productid,
        block : _qdsData_block,
        navigatedblockid : _qdsData_navigatedblockid
    };
    var requestParams = JSON.stringify(data);

    Alloy.Globals.webServiceCall(url, requestParams, getCollectionQdsDetailsSuccessCallback, getCollectionQdsDetailsErrorCallback, "POST", $.collectionQdsDetails);
}

getCollectionQdsDetails(args);

function getCollectionQdsDetailsSuccessCallback(e) {
    /*TODO*/
    /*
     Alloy.Globals.tracker.addEvent({
     category : "COLLECTION QDS",//(args.type).toUpperCase(),
     action : e.data.product_name,
     value : 1
     });
     */

    if (!isNullVal(args.type) && !isNullVal((args.category))) {
        //Ti.API.info('into collection GA 0');
        
        // temp comnt
        // Alloy.Globals.tracker.addEvent({
            // category : ((args.type).toUpperCase() || ""),
            // label : ((args.category).toUpperCase() || ""),
            // name : (e.data.product_name || ""),
            // action : (e.data.product_name || ""),
            // value : 1
        // });
        // end temp comnt
        
        //Ti.API.info('into collection GA 1');
    }

    try {
        similarQdsData = "";
        matchBestWithData = "";
        availabledesign_data_count = "";
        $.superScroll.scrollTo(0, 0);
        if (!isNullVal(e.data.image)) {
            $.collectionImage.image = encodeURI(e.data.image);
            $.blurImage.image = encodeURI(e.data.blur_image);
            $.preview_image.image = encodeURI(e.data.image);
            image_data = encodeURI(e.data.image);
        } else {
            $.collectionImage.image = "";
            $.blurImage.image = "";
            $.preview_image.image = "";
        }
        if (!isNullVal(e.data.url)) {

            $.shareIcon.shareUrl = e.data.url;
            sharingProductUrl = e.data.url;
            //Ti.API.info('collection url' + sharingProductUrl);
        } else {
            $.shareIcon.shareUrl = "";
        }
        if (!isNullVal(e.data.product_id)) {
            productId = e.data.product_id;
        }
        if (e.data.wishlistItem) {
            wishFlag = true;
            $.wishIcon.text = Alloy.Globals.icon.setShortlist;
            $.wishIcon.color = "#e65e48";

        } else {
            wishFlag = false;
            $.wishIcon.text = Alloy.Globals.icon.shortlist;
            $.wishIcon.color = "#FFFFFF";
        }

        if (!isNullVal(e.data.product_sku)) {
            $.wishIcon.product_sku = e.data.product_sku;
            gaProductSku = e.data.product_sku;
        } else {
            $.wishIcon.product_sku = "";
            gaProductSku = "";
        }
        
        
        /*New Rating added*/
        if (!isNullVal(e.data.rating)) {
            var rateCountText="";
            if (e.data.rating <= 20) {
                $.ratingIcon.text = "\ue919 \ue918 \ue918 \ue918 \ue918";
                rateCountText = "\ue919";
            } else if (e.data.rating > 20 && e.data.rating <= 40) {
                $.ratingIcon.text = "\ue919 \ue919 \ue918 \ue918 \ue918";
                rateCountText = "\ue919 \ue919";
            } else if (e.data.rating > 40 && e.data.rating <= 60) {
                $.ratingIcon.text = "\ue919 \ue919 \ue919 \ue918 \ue918";
                rateCountText = "\ue919 \ue919 \ue919";
            } else if (e.data.rating > 60 && e.data.rating <= 80) {
                $.ratingIcon.text = "\ue919 \ue919 \ue919 \ue919 \ue918";
                rateCountText = "\ue919 \ue919 \ue919 \ue919";
            } else {
                $.ratingIcon.text = "\ue919 \ue919 \ue919 \ue919 \ue919";
                rateCountText = "\ue919 \ue919 \ue919 \ue919 \ue919";
            }
            
            
            setRateAttribute(rateCountText);
            
           
        }
        
        /*New Rating added*/
        

        if (!isNullVal(e.data.product_name)) {
            productName = e.data.product_name;
            $.skuNameLbl.text = e.data.product_name.toUpperCase();
            //googleAnalyticsScreen(e.data.product_name+" DETAIL");
        } else {
            $.skuNameLbl.text = "";
        }
        
        if (!isNullVal(e.data.product_price)) {

            var text = "\ue90a " + e.data.product_price;
            var attr = Ti.UI.createAttributedString({
                text : text,
                attributes : [{
                    type : Ti.UI.ATTRIBUTE_FONT,
                    value : {
                        fontSize : 10,
                        fontFamily : 'icomoon'
                    },
                    range : [text.indexOf("\ue90a "), ("\ue90a ").length]
                }]
            });

            //$.priceLbl.attributedString = attr;
            $.priceLbl.text = Alloy.Globals.icon.currency + e.data.product_price;
            $.taxLbl.text = e.data.product_additional_price_text;
            
            productPrice = e.data.product_price.split("/")[0];

        } else {
            $.priceLbl.text = "";
            $.taxLbl.text = "";
            productPrice = "";
        }
        if (!isNullVal(e.data.description)) {
            $.descriptionLbl.text = e.data.description;
            if ($.descriptionLbl.getTop() == "0dp") {
                $.descriptionLbl.top = "15dp";
                //22
            }
        } else {
            $.descriptionLbl.text = "";
            $.readMoreLbl.text = "";
            $.readMoreLbl.height = "0dp";
            $.descriptionLbl.top = "0dp";
        }
        if (!isNullVal(e.data.washcare_image)) {
            $.ironImage.image = e.data.washcare_image;
            if ($.ironImage.getHeight() == "0dp") {
                $.ironImage.height = "30dp";
            }
            if ($.ironImage.getTop() == "0dp") {
                $.ironImage.top = "25dp";
            }
        } else {
            $.ironImage.image = "";
            $.ironImage.top = "0dp";
            $.ironImage.height = "0dp";
        }

        if (!isNullVal(e.data.availableShades[0])) {
            if ($.colorOptionScroll.getHeight() == "0dp") {
                $.colorOptionScroll.height = "55dp";
            }
            $.colorOptionScroll.shades = e.data.availableShades;
            displayAvailableColors();

        } else {
            $.colorOptionScroll.shades = "";
            $.colorOptionScroll.height = "0dp";
        }

        if (_.size(e.data.product_attributes) > 0) {
            if ($.viewMoreDetailsLbl.getHeight() == "0dp") {
                $.viewMoreDetailsLbl.height = "35dp";
            }
            $.moreDetailsContainer.design = e.data.product_attributes;

        } else {
            $.moreDetailsContainer.design = "";
            $.viewMoreDetailsLbl.top = "0dp";
            $.viewMoreDetailsLbl.height = "0dp";
        }

        if (_.size(e.data.calculator_values) > 0) {
            $.estimateLbl.calculatorValue = e.data.calculator_values;
            //Ti.API.info('estimate label');
            //Ti.API.info(JSON.stringify($.estimateLbl.calculatorValue));
        } else {
            $.estimateLbl.calculatorValue = "";
        }

        if (!isNullVal(e.data.availabledesign_data.response[0])) {
            if ($.availableDesignScroll.getHeight() == "0dp") {
                $.availableDesignScroll.height = parseInt(designWidth + 20);
            }
            if ($.pageControlContainer.getVisible() == "false") {
                $.pageControlContainer.visible = true;
            }
            availabledesign_data_count = e.data.availabledesign_data.total_count;
            showAvailableDesign(e.data.availabledesign_data.response);
        } else {
            availabledesign_data_count = "";
            $.availableDesignScroll.top = "0dp";
            $.availableDesigLbl.top = "0dp";
            $.availableDesigLbl.text = "";
            $.availableDesignScroll.height = "0dp";
            $.pageControlContainer.visible = false;

        }

        if (!isNullVal(e.data.similarproducts_data.response[0])) {
            if ($.similarCollectionContainer.getHeight() == "0dp") {
                $.similarCollectionContainer.height = Titanium.UI.SIZE;
                $.listSeperator.height = "1dp";
            }
            similarQdsData = e.data.similarproducts_data.response;
            similarQdsDataCount = e.data.similarproducts_data.total_count;
        } else {
            similarQdsData = "";
            similarQdsDataCount = "";
            $.similarCollectionContainer.height = "0dp";
            $.listSeperator.height = "0dp";
        }

        if (!isNullVal(e.data.matchesbestwith_data.response[0])) {
            if ($.alsoViewCollectionContainer.getHeight() == "0dp") {
                $.alsoViewCollectionContainer.height = Titanium.UI.SIZE;
                $.listSeperator.height = "1dp";
            }
            matchBestWithData = e.data.matchesbestwith_data.response;
            matchBestWithDataCount = e.data.matchesbestwith_data.total_count;
        } else {
            matchBestWithData = "";
            matchBestWithDataCount = "";
            $.alsoViewCollectionContainer.height = "0dp";
            $.listSeperator.height = "0dp";
        }
        hideLoader($.collectionQdsDetails);
        googleAnalyticsDetail(productName+"("+gaProductSku+")");
        googleAnalyticsScreen(productName+" DETAIL");
    } catch(ex) {
        hideLoader($.collectionQdsDetails);
        Ti.API.info('ex= catch' + ex.message);
        showAlert($.collectionQdsDetails, "Something went wrong...");
        setTimeout(function() {
            goToBack();
        }, 1000);
    }

}

function getCollectionQdsDetailsErrorCallback(e) {
    hideLoader($.collectionQdsDetails);
    Ti.API.info('error = ' + e);
    showAlert($.collectionQdsDetails, "Something went wrong...");
    setTimeout(function() {
        goToBack();
    }, 1000);
}

$.estimateLbl.addEventListener('click', function(e) {
    //Ti.API.info('e.calculatorValue = ' + e.calculatorValue);
    //Ti.API.info('e====' + JSON.stringify(e));
    fabricCalculator = "";
    //Ti.API.info('product name is' + productName);
    if (!isNullVal(argsData.block)) {
        if (argsData.block == "collection" || argsData.block == "look") {
            fabricCalculator = Alloy.createController('fabricCalculator',productPrice).getView();
            $.collectionQdsDetails.add(fabricCalculator);
            hideShowView(fabricCalculator);
        } else if (argsData.block == "blinds") {
            e.source.calculatorValue.productName = productName;

            //Ti.API.info('e.calculatorValue = ' + JSON.stringify(e.source.calculatorValue));
            Alloy.Globals.addWindowInNav("estimate", e.source.calculatorValue);
        }
    }
});

/*
 * set qds available shades
 */

function displayAvailableColors() {
    var myCounter = 0;
    _.each($.colorOptionScroll.children, function(view, key) {
        $.colorOptionScroll.remove(view);
    });

    _.each($.colorOptionScroll.shades, function(value, k) {

        //Ti.API.info('value.product_id = '+value.product_id);
        selectedView[value.product_id] = Ti.UI.createView({
            width : "39dp",
            height : "39dp",
            left : "10dp",
            id : value.product_id,
            productID : value.product_id,
            type : "fabricsColor",
            borderColor : "transparent",
            //touchEnabled : false,
        });

        colorView = Ti.UI.createImageView({
            width : "30dp",
            height : "30dp",
            id : k,
            touchEnabled : false,
            defaultImage : "/images/default_logo.png",
            image : encodeURI(value.color_image),
            backgroundColor : "#f4f4f4"
        });

        selectedView[value.product_id].add(colorView);
        $.colorOptionScroll.add(selectedView[value.product_id]);

        if (value.product_id == productId) {
            myCounter = k;
        }

    });

    if (!isNullVal(productId)) {
        selectedView[productId].backgroundColor = "#cccccc";
    }

    var pointDP = (myCounter * 49);
    var pointPX = measurement.dpToPX(pointDP);

    $.colorOptionScroll.scrollTo(pointPX, 0);
}

$.colorOptionScroll.addEventListener('click', function(e) {

    if (e.source.type == "fabricsColor") {

        _.each($.colorOptionScroll.shades, function(value, k) {
            selectedView[value.product_id].backgroundColor = "transparent";
        });
        selectedView[e.source.id].backgroundColor = "#cccccc";
        closeOtherViews();

        var data = {
            Productid : e.source.productID,
            block : argsData_block,
            navigatedblockid : ""
        };
        $.superScroll.scrollTo(0, 0);
        getCollectionQdsDetails(data);
    }
});

$.moreDetailsContainer.addEventListener('click', moreDetailsEffect);

function moreDetailsEffect(e) {
    var detailsContainer = Ti.UI.createView({
        width : Ti.UI.FILL,
        height : Ti.UI.SIZE,
        layout : "vertical",
    });

    _.each($.moreDetailsContainer.design, function(value, k) {
        var headingLbl = Ti.UI.createLabel({
            //height:Ti.UI.SIZE,
            left : "0dp",
            top : "20dp",
            bottom : "10dp",
            height : Ti.UI.SIZE,
            width : Ti.UI.SIZE,
            font : {
                fontSize : "11sp",
                fontFamily : "futura_lt_bt_light-webfont",
                fontWeight : "bold"
            },
            color : "#333333",
            text : k.toUpperCase(),
            //top : "0dp"
        });
        detailsContainer.add(headingLbl);
        _.each(value, function(v, key) {
            var subDetailsContainer = Ti.UI.createView({
                height : Ti.UI.SIZE,
                //height:"30",
                width : Ti.UI.FILL,
                left : "0dp",
                top : "11dp", //8
                layout : "horizontal"
            });

            var label1 = Ti.UI.createLabel({
                //height:Ti.UI.SIZE,
                left : "0dp",
                height : Ti.UI.SIZE,
                width : "40%",
                font : {
                    fontSize : "11dp",
                    fontFamily : "futura_lt_bt_light-webfont"
                },
                color : "#333333",
                text : key.toUpperCase(),
                top : "0dp"
            });
            subDetailsContainer.add(label1);

            var dotLabel = Ti.UI.createLabel({
                left : "0dp",
                height : Ti.UI.SIZE,
                color : "#333333",
                text : ":",
                font : {
                    fontSize : "12dp",
                    fontFamily : "futura_medium_bt-webfont"
                },
                verticalAlign : Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
                //borderColor:"red",
                top : "-2dp"
            });

            subDetailsContainer.add(dotLabel);

            var label2 = Ti.UI.createLabel({
                left : "5dp",
                height : Ti.UI.SIZE,
                width : "50%", //58
                font : {
                    fontSize : "11dp",
                    fontFamily : "futura_medium_bt-webfont"
                },
                color : "#333333",
                text : ((v != false) ? ((v != null) ? v.toUpperCase() : "NA") : "NA"),
                top : "0dp"
            });
            subDetailsContainer.add(label2);
            detailsContainer.add(subDetailsContainer);

        });
    });

    switch(e.source.id) {
    case "moreDetailsContainer":
        if (e.source.children.length == 1) {
            $.viewMoreDetailsLbl.text = "Hide details";
            e.source.add(detailsContainer);
        } else {
            $.viewMoreDetailsLbl.text = "View more details";
            e.source.remove(e.source.children[1]);
            e.source.children[1] = null;
        }
        break;
    }
}

/*
 * display available designs
 */
function showAvailableDesign(availableProducts) {

    var image = [];
    var gradientView = [];
    var designContainer = [];
    var designLbl = [];

    var arrayViews = $.availableDesignScroll.getViews();
    $.availableDesignScroll.scrollToView(0);

    if (arrayViews.length != 0) {
        _.each(arrayViews, function(view, key) {
            $.availableDesignScroll.removeView(view);
        });
    }
    //e.source.remove(e.source.children[1]);
    var data = "";
    var size = 4;
    var availableDesignDataArr = [];
    var myDataArrCounter = 0;
    for (var i = 0; i < availableProducts.length; i += size) {
        var smallPaginationArray = availableProducts.slice(i, i + size);
        availableDesignDataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallPaginationArray) + "");
        myDataArrCounter++;
    }
    var subAvailableDesignData = "{" + availableDesignDataArr + "}";
    var finalAvailableDesignData = JSON.parse(subAvailableDesignData);
    data = finalAvailableDesignData;

    _.each(data, function(value, k) {
        imageContainerArr[k] = Ti.UI.createView({
            width : Titanium.UI.FILL,
            left : "0dp",
            height : Titanium.UI.FILL,
            backgroundColor : "#ffffff",
            layout : "horizontal"
        });
        _.each(data["" + k], function(value, i) {
            if (argsData.block == "blinds") {
                designContainer[i] = Ti.UI.createView({
                    width : designWidth,
                    height : designWidth,
                    top : "10dp",
                    left : "10dp",
                    type : "availableDesign",
                    id : value.product_id,
                });

                imageContainerArr[k].add(designContainer[i]);

                image[i] = Ti.UI.createImageView({
                    width : designWidth,
                    height : designWidth,
                    defaultImage : "/images/default_logo.png",
                    image : encodeURI(value.image),
                    touchEnabled : false
                });
                designContainer[i].add(image[i]);
                gradientView[i] = Ti.UI.createView({
                    width : Ti.UI.FILL,
                    touchEnabled : false,
                    height : Ti.UI.FILL,
                    backgroundGradient : {
                        type : 'linear',
                        colors : [{
                            color : '#cc000000',
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
                });
                designContainer[i].add(gradientView[i]);
                var design_lbl = value.category_name;
                designLbl[i] = Ti.UI.createLabel({
                    left : "5dp",
                    width : "90%",
                    font : {
                        fontSize : "8dp",
                        fontFamily : "futura_medium_bt-webfont"
                    },
                    color : "#ffffff",
                    ellipsize : true,
                    wordWrap : false,
                    text : design_lbl.toUpperCase(),
                    bottom : "5dp",
                    touchEnabled : false
                });
                designContainer[i].add(designLbl[i]);
            } else {
                image[i] = Ti.UI.createImageView({
                    width : designWidth,
                    height : designWidth,
                    top : "10dp",
                    left : "10dp",
                    id : value.product_id,
                    type : "availableDesign",
                    defaultImage : "/images/default_logo.png",
                    image : encodeURI(value.image),
                });
                imageContainerArr[k].add(image[i]);
            }

        });

        if (availabledesign_data_count >= 11) {
            var viewAllOption = Ti.UI.createLabel({
                width : designWidth,
                height : designWidth,
                top : "10dp",
                left : "10dp",
                color : "#e65e48",
                textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
                font : {
                    fontSize : "10dp",
                    fontFamily : "futura_medium_bt-webfont"
                },
                text : "VIEW ALL",
                backgroundColor : "#f4f4f4"
            });
            imageContainerArr[k].add(viewAllOption);
        }
        $.availableDesignScroll.addView(imageContainerArr[k]);
    });

    $.pageControlContainer.removeAllChildren();
    if (availabledesign_data_count > 4) {
        $.pageControlContainer.add(PagingControl($.availableDesignScroll));
    }

}

$.availableDesignScroll.addEventListener("scrollend", function(e) {
    if (availabledesign_data_count > 4) {
        var numberOfPages = $.availableDesignScroll.getViews().length;
        for (var i = 0; i < numberOfPages; i++) {
            $.pageControlContainer.children[0].children[i].setBackgroundColor("#e7e7e7");
        }
        $.pageControlContainer.children[0].children[e.currentPage].setBackgroundColor("#e65e48");
    }
});

$.availableDesignScroll.addEventListener('click', function(e) {

    if (e.source.type == "availableDesign") {
        closeOtherViews();
        var data = {
            Productid : e.source.id,
            block : argsData_block,
            navigatedblockid : ""
        };
        $.superScroll.scrollTo(0, 0);
        getCollectionQdsDetails(data);
    } else if (e.source.text == "VIEW ALL") {

        var args_ = {
            block : argsData_block,
            slider : "availabledesign",
            productID : productId,
            navigatedblockid : navigatedCollectionId || "",
            type : "product",
        };
        //Alloy.createController('otherListingPage',a[bind].collectionId).getView().open();
        Alloy.Globals.addWindowInNav("otherListingPage", args_);
    }
});

$.SuperSimilarCollection.addEventListener('click', productToggleEffect);
/*
 *  display similar and match best with data
 */

function productToggleEffect(e) {

    switch(e.source.id) {
    case "similarCollectionContainer":
        if (e.source.children.length == 1) {
            setSimilarData(similarQdsData, "similarproducts", similarQdsDataCount);
            //similarQdsDataCount = "";
            e.source.add(gridListContainer);
            e.source.children[0].children[1].text = Alloy.Globals.icon.dropDown;

            $.listSeperator.top = "15dp";
            $.superScroll.scrollToBottom();
        } else {
            e.source.children[0].children[1].text = Alloy.Globals.icon.downArrow;
            e.source.remove(e.source.children[1]);
            e.source.children[1] = null;
            $.listSeperator.top = "0dp";
        }
        break;
    case "alsoViewCollectionContainer":
        if (e.source.children.length == 1) {
            setSimilarData(matchBestWithData, "matchesbestwith", matchBestWithDataCount);
            e.source.add(gridListContainer);
            e.source.children[0].children[1].text = Alloy.Globals.icon.dropDown;
            $.superScroll.scrollToBottom();
        } else {
            e.source.children[0].children[1].text = Alloy.Globals.icon.downArrow;
            e.source.remove(e.source.children[1]);
            e.source.children[1] = null;
        }
        break;
    }

    if (e.source.id == "wishLbl") {
        if (!isNullVal(Ti.App.Properties.getString("access_token"))) {

            if (e.source.text == "\ue927") {
                removeWishlist(e.source);
            } else {
                addToShortlist(e.source);
            }

        } else {
            //Alloy.Globals.addWindowInNav("signIn", "productDetails");
            Alloy.Globals.addWindowInNav("signIn", {
                listObject : e.source,
                listViewReference : addToShortlist,
            });
        }

    } else if (e.source.id == "shareLbl") {
        //Ti.API.info('sharing url is ' + e.source.shareUrl);
        shareImage(e.source.shareUrl);
    } else {
        if (!isNullVal(e.source.productId)) {

            closeOtherViews();
            var data = {
                Productid : e.source.productId, // qdsData.Productid,
                block : argsData_block,
                navigatedblockid : "" //qdsData.navigatedblockid || ""
            };
            $.superScroll.scrollTo(0, 0);
            getCollectionQdsDetails(data);
        }
    }

}

function closeOtherViews() {

    if ($.similarCollectionContainer.children.length != 1) {
        $.similarCollectionContainer.children[0].children[1].text = Alloy.Globals.icon.downArrow;
        $.similarCollectionContainer.remove($.similarCollectionContainer.children[1]);
        $.similarCollectionContainer.children[1] = null;
        $.listSeperator.top = "0dp";
    }

    if ($.alsoViewCollectionContainer.children.length != 1) {
        $.alsoViewCollectionContainer.children[0].children[1].text = Alloy.Globals.icon.downArrow;
        $.alsoViewCollectionContainer.remove($.alsoViewCollectionContainer.children[1]);
        $.alsoViewCollectionContainer.children[1] = null;
    }

    if ($.moreDetailsContainer.children.length != 1) {
        $.viewMoreDetailsLbl.text = "View more details";
        $.moreDetailsContainer.remove($.moreDetailsContainer.children[1]);
        $.moreDetailsContainer.children[1] = null;
    }
}

function setSimilarData(similarCollectionData, slider, count) {

    gridListContainer = Ti.UI.createView({
        width : Ti.UI.SIZE,
        height : Ti.UI.SIZE,
        top : "40dp",
        layout : "vertical",
    });

    var mainContainer = Ti.UI.createView({
        width : parseInt((Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor) - 20),
        borderColor : "transparent"
    });
    $.addClass(mainContainer, "mainContainer");
    gridListContainer.add(mainContainer);
    if (count > 2) {
        var viewAll = Ti.UI.createLabel({
            top : "15dp", //20
            width : parseInt((Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor) - 10),
            height : "35dp",
            font : {
                fontSize : "12sp",
            },
            color : "#333333",
            backgroundColor : "#f4f4f4",
            text : "VIEW ALL",
            block : argsData_block,
            slider : slider,
            productID : productId,
            //collectionID : collectionId,
            textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
        });
        gridListContainer.add(viewAll);

        touchEffect.createTouchEffect(viewAll, "#a6333333", "#333333");
        viewAll.addEventListener('click', function(e) {
            var _args = {
                block : e.source.block,
                slider : e.source.slider,
                productID : e.source.productID,
                navigatedblockid : navigatedCollectionId || "",
                type : "product"
            };
            //Alloy.createController('otherListingPage',a[bind].collectionId).getView().open();
            Alloy.Globals.addWindowInNav("otherListingPage", _args);
        });

    }
    _.each(similarCollectionData, function(value, k) {

        var product1 = Ti.UI.createView({
            left : "0dp",
            collectionId : value.collection_id,
            width : Alloy.Globals.imageWidth + 5,
        });
        if (k == 1) {
            product1.left = "10dp";
        }
        $.addClass(product1, "productContainer");
        mainContainer.add(product1);

        var imageContainer = Ti.UI.createView();
        $.addClass(imageContainer, "cartImageContainer");
        product1.add(imageContainer);

        var defaultImage = Ti.UI.createLabel({
            font : {
                fontSize : "35dp",
                fontFamily : "icomoon1"
            },
            color : "#000000",
            zIndex : '-1',
            text : Alloy.Globals.icon.logo
        });
        imageContainer.add(defaultImage);
        var image1 = Ti.UI.createImageView({
            defaultImage : "/images/default_logo.png",
            image : encodeURI(value.image),
            productId : value.product_id,
            productName : value.product_name,
        });
        $.addClass(image1, "productImage");
        imageContainer.add(image1);

        var shareContainer = Ti.UI.createView();
        $.addClass(shareContainer, "shareContainer");
        product1.add(shareContainer);

        var nameContainer = Ti.UI.createView();
        $.addClass(nameContainer, "nameContainer");
        shareContainer.add(nameContainer);

        var productName1 = Ti.UI.createLabel({
            text : value.product_name,
            productId : value.product_id,
            productName : value.product_name,
        });
        $.addClass(productName1, "name");
        nameContainer.add(productName1);

        var wheretoBuy1 = Ti.UI.createLabel({
            text : Alloy.Globals.icon.currency + value.product_price,
            productId : value.product_id,
            productName : value.product_name,
        });
        $.addClass(wheretoBuy1, "whereBye");
        nameContainer.add(wheretoBuy1);

        var shareIcon1 = Ti.UI.createLabel({
            right : "35dp",
            color : "#a6a6a6",
            font : {
                fontSize : "18dp",
                fontFamily : "icomoon"
            },
            top : "0dp",
            width : "35dp",
            height : "35dp",
            textAlign : Titanium.UI.TEXT_ALIGNMENT_RIGHT,
            text : Alloy.Globals.icon.share,
            productId : value.product_id,
            productName : value.product_name,
            id : "shareLbl",
            shareUrl : value.collection_url ? value.collection_url : (value.product_url ? value.product_url : (value.url ? value.url : "")),
        });

        shareContainer.add(shareIcon1);
        //shareIcon1.addEventListener("click",socialShare);

        var wishIcon1 = Ti.UI.createLabel({
            right : "3dp",
            color : ((value.wishlistItem) ? "#e65e48" : "#a6a6a6"),
            font : {
                fontSize : "18dp",
                fontFamily : "icomoon"
            },
            top : "0dp",
            width : "35dp",
            height : "35dp",
            textAlign : Titanium.UI.TEXT_ALIGNMENT_RIGHT,
            text : ((value.wishlistItem) ? Alloy.Globals.icon.setShortlist : Alloy.Globals.icon.shortlist),
            productId : value.product_id,
            productSku : value.product_sku,
            productName : value.product_name,
            id : "wishLbl"
        });

        if (value.wishlistItem) {
            wishIcon1.text = Alloy.Globals.icon.setShortlist;
            wishIcon1.color = "#e65e48";
        } else {
            wishIcon1.text = Alloy.Globals.icon.shortlist;
            wishIcon1.color = "#a6a6a6";
        }

        shareContainer.add(wishIcon1);

    });

}

$.wishIcon.addEventListener('click', checkshortlistItem);

function checkshortlistItem(e) {
    if (e.source.text == "\ue927") {
        removeWishlist();
    } else {
        addToShortlist();
    }
}

function addToShortlist(pId) {

    if (!isNullVal(Ti.App.Properties.getString("access_token"))) {
        var product_id;
        shortlistData = "";
        gaShortlistProduct = {};
        if (!isNullVal(pId)) {
            if (!isNullVal(pId.productId))
                product_id = pId.productId;
            shortlistData = pId;
            Ti.API.info('shortlistData = '+JSON.stringify(shortlistData));
            if(!(pId.id)){
                $.wishIcon.text = Alloy.Globals.icon.setShortlist;
                $.wishIcon.color = "#e65e48";
            }
            
            
            gaShortlistProduct ={
                name : shortlistData.productName,
                sku :  shortlistData.productSku,
                lostSale : false,
            };
            
        } else {
            product_id = productId;
            
            gaShortlistProduct = {
                name : productName,
                sku : gaProductSku,
                lostSale : false
            };
        }

        /*display product as shortlisted before hit api */

        if (_.size(shortlistData) != 0) {
            shortlistData.text = Alloy.Globals.icon.setShortlist;
            shortlistData.color = "#e65e48";
        } else {
            $.wishIcon.text = Alloy.Globals.icon.setShortlist;
            $.wishIcon.color = "#e65e48";
        }

        //showLoader($.collectionQdsDetails);
        var url = Alloy.Globals.commonUrl.addToShortlist;
        var data = {
            product_id : product_id
        };

        var requestParams = JSON.stringify(data);

        Alloy.Globals.webServiceCall(url, requestParams, addToShortlistSuccessCallback, addToShortlistErrorCallback, "POST", $.collectionQdsDetails);
    } else {
       // Alloy.Globals.addWindowInNav("signIn", "collectionQdsDetails");
       var wishProductData = {};
        wishProductData = {
            productId : product_id || productId
        };
        Alloy.Globals.addWindowInNav("signIn", {
            listObject : wishProductData,
            listViewReference : addToShortlist,
        });
    }
}

function addToShortlistSuccessCallback(e) {
    try {
        // if (_.size(shortlistData) != 0) {
        // shortlistData.text = Alloy.Globals.icon.setShortlist;
        // shortlistData.color = "#e65e48";
        // } else {
        // $.wishIcon.text = Alloy.Globals.icon.setShortlist;
        // $.wishIcon.color = "#e65e48";
        // }

        showAlert($.collectionQdsDetails, e.message);

        //gaShortlistProduct($.wishIcon.product_sku);
       // var gaShortlistProduct =productName+"("+gaProductSku+")";
        var gaScreenName = argsData.category+"DETAIL PAGE";
        // gaShortlistProduct = {
            // name : productName,
            // sku : gaProductSku,
            // lostSale : false
        // };
        googleAnalyticsShortlist(gaShortlistProduct,gaScreenName);
        if (!isNullVal(args.listObject)) {
           // args.listViewReference(args.listObject);         
            args.listViewReference(args.listObject,"add");
        }

    } catch(ex) {
        Ti.API.info('catch = ' + (ex.message));
    }
}

function addToShortlistErrorCallback(e) {
    showAlert($.collectionQdsDetails, e.message);
    if (_.size(shortlistData) != 0) {
        shortlistData.text = Alloy.Globals.icon.shortlist;
        shortlistData.color = "#a6a6a6";
    } else {
        $.wishIcon.text = Alloy.Globals.icon.shortlist;
        $.wishIcon.color = "#ffffff";
    }
}

function removeWishlist(wishData) {

    if (!isNullVal(wishData)) {
        if (!isNullVal(wishData.productId))
            product_id = wishData.productId;
        shortlistData = wishData;
    } else {
        product_id = productId;
    }

    /*remove product as shortlisted before hit api */

    // if (_.size(shortlistData) != 0) {
        // shortlistData.text = Alloy.Globals.icon.shortlist;
        // shortlistData.color = "#a6a6a6";
    // } else {
        // $.wishIcon.text = Alloy.Globals.icon.shortlist;
        // $.wishIcon.color = "#ffffff";
    // }
    
    if (!isNullVal(wishData)) {
        shortlistData.text = Alloy.Globals.icon.shortlist;
        shortlistData.color = "#a6a6a6";
    } else {
        $.wishIcon.text = Alloy.Globals.icon.shortlist;
        $.wishIcon.color = "#ffffff";
    }

    var url = Alloy.Globals.commonUrl.removeShortlist;
    var data = {
        product_id : product_id
    };
    var requestParams = JSON.stringify(data);
    Alloy.Globals.webServiceCall(url, requestParams, removeShortlistProductSuccessCallback, removeShortlistProductErrorCallback, "POST", $.collectionQdsDetails);
}

function removeShortlistProductSuccessCallback(e) {
    try {
        // if (_.size(shortlistData) != 0) {
        // shortlistData.text = Alloy.Globals.icon.shortlist;
        // shortlistData.color = "#a6a6a6";
        // } else {
        // $.wishIcon.text = Alloy.Globals.icon.shortlist;
        // $.wishIcon.color = "#ffffff";
        // }
        showAlert($.collectionQdsDetails, e.message);

        if (!isNullVal(args.listObject)) {
           // args.listViewReference(args.listObject);
            args.listViewReference(args.listObject,"remove");
        }

    } catch(ex) {
        Ti.API.info('catch = ' + (ex.message));
    }
}

function removeShortlistProductErrorCallback(e) {
    showAlert($.collectionQdsDetails, e.message);
    if (_.size(shortlistData) != 0) {
        shortlistData.text = Alloy.Globals.icon.setShortlist;
        shortlistData.color = "#e65e48";
    } else {
        $.wishIcon.text = Alloy.Globals.icon.setShortlist;
        $.wishIcon.color = "#e65e48";
    }
}

function navigateToStoreLocater(e) {
    // Ti.API.info('navigation clicked');
    // Ti.API.info('e.source.type--->' + e.source.type);
    // Ti.API.info('args.type-->1' + args.type);

    if (args.type == "collection") {
        Alloy.Globals.addWindowInNav("findStore");
    } else if (args.type == "blinds") {
          var obj={
            type : "blinds"
          };
              
        Alloy.Globals.addWindowInNav("findStore",obj);

        /*
         if (!isNullVal(Ti.App.Properties.getString("access_token"))) {
         var url = Alloy.Globals.commonUrl.addToCart;
         var data = {
         product_id : productId,
         qty : 1
         };

         var requestParams = JSON.stringify(data);

         Alloy.Globals.webServiceCall(url, requestParams, addToCartSuccessCallback, addToCartErrorCallback, "POST", $.collectionQdsDetails);
         } else {
         Alloy.Globals.addWindowInNav("signIn", "collectionQdsDetails");
         }
         */

    }
    
    var gaShortlistProductArray = {
        name:productName,
        sku :gaProductSku
    };
    generateLead(gaShortlistProductArray, productName+"DETAIL");
}

function addToCartSuccessCallback(e) {
    try {
        Ti.App.Properties.setString("quote_id", e.data[0].quote_id);
        Ti.App.Properties.setString("cartCount", e.data[0].count);
        $.header.updateCartCount();
        showAlert($.collectionQdsDetails, e.message);
    } catch(ex) {
        Ti.API.info('catch = ' + ex.message);
    }
}

function addToCartErrorCallback(e) {
    showAlert($.collectionQdsDetails, e.message);
}

$.collectionImage.addEventListener('click', function(e) {
    // hideShowView($.previewImageScroll);
    // $.closeLbl.visible = true;
    //Ti.API.info('we are here to check');
    //Ti.API.info('productId ' + productId);
    //Ti.API.info('wishFlag ' + wishFlag);

    var imageData = {
        product_id : productId,
        wish_flag : wishFlag,
        type : "shop",
        sharingProductUrl : sharingProductUrl,
        data : [image_data]
    };
    previewImage = Alloy.createController('imagePreview', imageData).getView();
    $.collectionQdsDetails.add(previewImage);
    hideShowView(previewImage);

});

$.closeLbl.addEventListener('click', function(e) {
    //hideShowView($.previewImageScroll);
    $.closeLbl.visible = false;
});

function goToBack() {

    if (fabricCalculator.type == "fabricCalc") {
        hideShowView(fabricCalculator);
        fabricCalculator = "";
    } else if (previewImage.type == "imagePreview") {
        hideShowView(previewImage);
        previewImage = "";
    } else {
        $.superScroll.removeEventListener('scroll', upArrowEffect);
        $.SuperSimilarCollection.removeEventListener('click', productToggleEffect);
        $.moreDetailsContainer.removeEventListener('click', moreDetailsEffect);
        $.readMoreLbl.removeEventListener('click', readMoreToggle);
        $.collectionQdsDetails.removeEventListener('click', hideOverFlowMenu);

        Alloy.Globals.popWindowInNav();
        $.collectionQdsDetails.close();
    }
}

function destroyWindow(e) {
    //$.collectionQdsDetails.removeAllChildren();

    $.removeListener();

    $.collectionQdsDetails.remove($.superScroll);
    $.superScroll.removeAllChildren();

    $.collectionQdsDetails.remove($.estimateLbl);
    $.collectionQdsDetails.remove($.whereToByeLbl);
    $.collectionQdsDetails.remove($.upArrowLbl);

    $.collectionQdsDetails.remove($.previewImageScroll);
    $.previewImageScroll.removeAllChildren();
    $.collectionQdsDetails.remove($.closeLbl);

    $.destroy();
}

function updateCount() {

    $.header.updateCartCount();
}

$.shareIcon.addEventListener('click', function(e) {
    //Ti.API.info('sharing url is ' + e.source.shareUrl);
    shareImage(e.source.shareUrl);
});




/*New Rating related method added*/

$.ratingView.addEventListener('click', function(e) {

    if (!isNullVal(Ti.App.Properties.getString("access_token"))) {
        hideShowView($.ratingContainer);
    } else {
        Alloy.Globals.addWindowInNav("signIn", "estoreDetails");
    }

});

$.ratingCloseLbl.addEventListener('click', function(e) {
    hideShowView($.ratingContainer);
    setTimeout(function() {
        for (var i = 0; i < 5; i++) {
            $.subRatingContainer.children[i].text = Alloy.Globals.icon.rateOutline;
            $.subRatingContainer.children[i].color = "#fff";
            //$.subRatingContainer.children[i].color = "#737373";
        };
    }, 1500);
});

$.subRatingContainer.addEventListener('click', rating);

function rating(e) {
    finalRating = "";
    if (e.source.type == 'rate') {

        for (var i = 0; i < e.source.count; i++) {
            $.subRatingContainer.children[i].text = Alloy.Globals.icon.rateFill;
            $.subRatingContainer.children[i].color = "#e65e48";
        };
        for (var i = e.source.count; i < 5; i++) {
            $.subRatingContainer.children[i].text = Alloy.Globals.icon.rateOutline;
            //$.subRatingContainer.children[i].color = "#737373";
            $.subRatingContainer.children[i].color = "#fff";
        };
        finalRating = e.source.value;
        //Ti.API.info('e.source.count = ' + e.source.count);
    }
}



function sendRating() {
    $.done.touchEnabled = false;
    var url = Alloy.Globals.commonUrl.review;
    var data = {
        productID : productId,
        rating : finalRating
    };

    var requestParams = JSON.stringify(data);

    Alloy.Globals.webServiceCall(url, requestParams, sendRatingSuccessCallback, sendRatingErrorCallback, "POST", $.estoreDetails);
}

function sendRatingSuccessCallback(e) {
    try {

        $.done.touchEnabled = true;
        //showAlert($.ratingContainer, e.message);
            var rateCountText="";
        if (e.data.reviewpercentage <= 20) {
            $.ratingIcon.text = "\ue919 \ue918 \ue918 \ue918 \ue918";
            rateCountText="\ue919";
        } else if (e.data.reviewpercentage > 20 && e.data.reviewpercentage <= 40) {
            $.ratingIcon.text = "\ue919 \ue919 \ue918 \ue918 \ue918";
            rateCountText="\ue919 \ue919";
        } else if (e.data.reviewpercentage > 40 && e.data.reviewpercentage <= 60) {
            $.ratingIcon.text = "\ue919 \ue919 \ue919 \ue918 \ue918";
            rateCountText="\ue919 \ue919 \ue919";
        } else if (e.data.reviewpercentage > 60 && e.data.reviewpercentage <= 80) {
            $.ratingIcon.text = "\ue919 \ue919 \ue919 \ue919 \ue918";
            rateCountText="\ue919 \ue919 \ue919 \ue919";
        } else {
            $.ratingIcon.text = "\ue919 \ue919 \ue919 \ue919 \ue919";
            rateCountText="\ue919 \ue919 \ue919 \ue919 \ue919";
        }

        /*new Attribute string added */
            setRateAttribute(rateCountText);
        /*new Attribute string added */

        // setTimeout(function() {
        // hideShowView($.ratingContainer);
        // }, 1500);
        hideShowView($.ratingContainer);
        setTimeout(function() {
            for (var i = 0; i < 5; i++) {
                $.subRatingContainer.children[i].text = Alloy.Globals.icon.rateOutline;
                //$.subRatingContainer.children[i].color = "#737373";
                $.subRatingContainer.children[i].color = "#fff";
            };
        }, 2000);

        showAlert($.estoreDetails, e.message);

    } catch(ex) {
        //Ti.API.info('catch  = ' + JSON.stringify(ex));
    }
    

}

function sendRatingErrorCallback(e) {

    $.done.touchEnabled = true;
    showAlert($.ratingContainer, e.message);
    setTimeout(function() {
        //$.collectionFabricController.type = "";
        hideShowView($.ratingContainer);
    }, 1500);
    setTimeout(function() {
        for (var i = 0; i < 5; i++) {
            $.subRatingContainer.children[i].text = Alloy.Globals.icon.rateOutline;
            //$.subRatingContainer.children[i].color = "#737373";
            $.subRatingContainer.children[i].color = "#fff";
        };
    }, 2000);
    //Ti.API.info('erroe = ' + JSON.stringify(e));
}

function setRateAttribute(rateCountText){
            /*new Attribute string added */

        var text = $.ratingIcon.getText();
        var attr = Ti.UI.createAttributedString({
            text : text,
            attributes : [
            {
                type : Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
                value : '#e65e48',
                range : [text.indexOf(Alloy.Globals.icon.rateFill), (rateCountText).length]
            }
            /*,
            {
                type : Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
                value : '#fff',
                range : [text.indexOf(Alloy.Globals.icon.rateOutline), (text).length]
            }
            */
            
            ]
        });

        $.ratingIcon.attributedString = attr;

        /*new Attribute string added */
}