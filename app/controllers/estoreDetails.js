var args = arguments[0] || {};

//Ti.API.info('args.listObject =- ' + JSON.stringify(args)) ;

var _args = args;
var wishIcon1 = [];
var selectedView = [];
var selectedImage = [];
var imageContainerArr = [];
var similarProductsData = "";
var peopleAlsoViewData = "";
var gridListContainer = "";
var productId,
    productName,
    colorView,
    lost_sale,
    gaProductSku;
var gaShortlistProduct = "";
var gaAddToCartProduct = {};
var gaShortlistProductArray = {};
var finalRating = "";
var peopleAlsoViewDataCount = "",
    similarProductsDataCount = "";
var availabledesign_data_count = "";
var previewImage = "";
var image_data;
var sharingProductUrl = "";

var wishFlag;
var wallpaperImage = [];
var measurement = "",
    addToCartFlag = "";
measurement = require('alloy/measurement');
if (!isNullVal(args.product)) {
    if (args.product == "wallpaper") {

        // rating enabled
        //$.ratingView.visible = false;

        $.instockSuperContainer.visible = false;
        $.instockSuperContainer.height = "0dp";
        $.stockSeperator_0.backgroundColor = "transparent";
        $.stockSeperator_1.backgroundColor = "transparent";
        $.stockSeperator_0.top = "0dp";
        $.stockSeperator_1.top = "0dp";
        $.whereToBuy.visible = true;
        $.addToBagLbl.visible = false;
        $.availableDesigLbl.text = "AVAILABLE DESIGNS";
        //$.addToBagLbl.text = "Where To Buy";
    }

    $.addToBagLbl.visible = false;
}

$.header.init({
    title : "DETAILS",
    passWindow : $.estoreDetails,
});
$.header.updateCartCount();

googleAnalyticsScreen("ESTORE DETAIL");

var text = "Check estimated delivery \ue917";
var attr = Ti.UI.createAttributedString({
    text : text,
    attributes : [{
        type : Ti.UI.ATTRIBUTE_FONT,
        value : {
            fontSize : "14dp",
            fontFamily : 'icomoon'
        },
        range : [text.indexOf("\ue917"), ("\ue917").length]
    }]
});

$.availabilityLbl.attributedString = attr;

touchEffect.createTouchEffect($.viewMoreDetailsLbl, "#a6e65e48", "#e65e48");
touchEffect.createTouchEffect($.addToBagLbl, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.whereToBuy, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.checkBtn, "#a67F7F7F", "#7F7F7F");
touchEffect.createTouchEffect($.done, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.ratingCloseLbl, "#a6ffffff", "#ffffff");
//touchEffect.createTouchEffect($.wishIcon, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.shareIcon, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.upArrowLbl, "#a6000000", "#000000");
touchEffect.createTouchEffect($.imagePreviewWishIcon, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.imagePreviewShareIcon, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.closeLbl, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.storeLocator, "#a6ffffff", "#ffffff");

$.estoreDetails.addEventListener("click", function(e) {
    if (e.source.type != "TextField") {
        $.pincodeTxt.blur();
    }
});

//$.returnLbl.width = parseInt(Alloy.Globals.platformWidth / 2);
$.addToBagLbl.width = parseInt(Alloy.Globals.platformWidth);
$.whereToBuy.width = parseInt(Alloy.Globals.platformWidth);

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

$.readMoreLbl.addEventListener('click', function(e) {
    //$.descriptionLbl.maxLines = 10;
    $.descriptionLbl.height = Ti.UI.SIZE;
    $.readMoreLbl.text = "";
});

/*
 * set attributestring to store locator label
 */
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

$.storeLocator.attributedString = attr;

$.upArrowLbl.addEventListener('click', scrollToEffect);

function scrollToEffect(e) {
    $.superScroll.scrollTo(0, 0);
}

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

$.upArrowLbl.visible = false;

$.availabilityLbl.addEventListener('click', checkAvailability);

function checkAvailability(e) {
    $.pincodeTxt.value = "";
    $.availabilityLbl.visible = false;
    $.pincodeContainer.visible = true;
}

$.checkBtn.addEventListener('click', function(e) {
    ///
    if ($.pincodeTxt.value != "" && $.pincodeTxt.value.length == "6") {
        $.activityIndi.show();
        $.checkBtn.visible = false;
        $.checkBtn.touchEnabled = false;
        var url = Alloy.Globals.commonUrl.estimateDelivery;
        var data = {
            pincode : $.pincodeTxt.value,
        };

        var requestParams = JSON.stringify(data);

        Alloy.Globals.webServiceCall(url, requestParams, estimateDeliverySuccessCallback, estimateDeliveryErrorCallback, "POST", $.estoreDetails);

    } else {
        showAlert($.estoreDetails, "Please enter valid 6-digit pincode");
    }
    ////

});

function estimateDeliverySuccessCallback(e) {
    try {
        $.activityIndi.hide();
        $.checkBtn.visible = true;
        $.checkBtn.touchEnabled = true;
        $.pincodeContainer.visible = false;
        $.estimateDateLbl.visible = true;
        $.estimateDateLbl.text = $.pincodeTxt.value + " - " + e.data.deliveryDate;
    } catch(ex) {
        $.activityIndi.hide();
        $.checkBtn.visible = true;
        $.checkBtn.touchEnabled = true;
        Ti.API.info('catch =' + JSON.stringify(ex));
    }

}

function estimateDeliveryErrorCallback(e) {
    $.activityIndi.hide();
    $.checkBtn.visible = true;
    $.checkBtn.touchEnabled = true;
    $.pincodeContainer.visible = false;
    $.estimateDateLbl.visible = true;
    $.estimateDateLbl.text = $.pincodeTxt.value + " - " + e.message;
    Ti.API.info('error' + JSON.stringify(e));
}

$.estimateDateLbl.addEventListener('click', estimateDate);

function estimateDate(e) {
    $.estimateDateLbl.visible = false;
    $.availabilityLbl.visible = true;
}

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
            $.subRatingContainer.children[i].color = "#737373";
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
            $.subRatingContainer.children[i].color = "#737373";
        };
        finalRating = e.source.value;
    }
}

$.done.addEventListener('click', sendRating);

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
        showAlert($.ratingContainer, e.message);

        var rateCountText = "";
        if (e.data.reviewpercentage <= 20) {
            $.ratingIcon.text = "\ue919 \ue918 \ue918 \ue918 \ue918";
            rateCountText = "\ue919";
        } else if (e.data.reviewpercentage > 20 && e.data.reviewpercentage <= 40) {
            $.ratingIcon.text = "\ue919 \ue919 \ue918 \ue918 \ue918";
            rateCountText = "\ue919 \ue919";
        } else if (e.data.reviewpercentage > 40 && e.data.reviewpercentage <= 60) {
            $.ratingIcon.text = "\ue919 \ue919 \ue919 \ue918 \ue918";
            rateCountText = "\ue919 \ue919 \ue919";
        } else if (e.data.reviewpercentage > 60 && e.data.reviewpercentage <= 80) {
            $.ratingIcon.text = "\ue919 \ue919 \ue919 \ue919 \ue918";
            rateCountText = "\ue919 \ue919 \ue919 \ue919";
        } else {
            $.ratingIcon.text = "\ue919 \ue919 \ue919 \ue919 \ue919";
            rateCountText = "\ue919 \ue919 \ue919 \ue919 \ue919";
        }

        setTimeout(function() {
            hideShowView($.ratingContainer);
        }, 1500);

        setTimeout(function() {
            for (var i = 0; i < 5; i++) {
                $.subRatingContainer.children[i].text = Alloy.Globals.icon.rateOutline;
                $.subRatingContainer.children[i].color = "#737373";
            };
        }, 2000);

        /*new Attribute string added */
        setRateAttribute(rateCountText);
        /*new Attribute string added */

    } catch(ex) {
        Ti.API.info('catch  = ' + JSON.stringify(ex));
    }
    //Ti.API.info('success = ' + JSON.stringify(e));
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
            $.subRatingContainer.children[i].color = "#737373";
        };
    }, 2000);
    Ti.API.info('erroe = ' + JSON.stringify(e));
}

$.estoreDetails.addEventListener('click', hideOverFlowMenu);

function hideOverFlowMenu(e) {
    if (Alloy.Globals.overFlowFlag && e.source.id != "overFlowMenuLbl") {
        $.header.hideOverFlow();
    };
}

// var temp = {
// Productid : 11814, //9425//11814//11837
// block : "shop",
// };
function getShopDetails(shopData) {
    showLoader($.estoreDetails);
    var shopData_productid = "",
        shopData_block = "";
    if (!isNullVal(shopData.Productid)) {
        shopData_productid = shopData.Productid;
    }
    if (!isNullVal(shopData.block)) {
        shopData_block = shopData.block;
    } else {
        shopData_block = "shop";
    }

    var url = Alloy.Globals.commonUrl.shopDetail;
    var data = {
        Productid : shopData_productid, //9425
        block : shopData_block,
    };

    var requestParams = JSON.stringify(data);

    Alloy.Globals.webServiceCall(url, requestParams, getShopDetailsSuccessCallback, getShopDetailsErrorCallback, "POST", $.estoreDetails);
}

getShopDetails(args);

function getShopDetailsSuccessCallback(e) {
    /*TODO*/

    if (!isNullVal(args.type) && !isNullVal((args.category))) {

        // temp comnt
        // Alloy.Globals.tracker.addEvent({
        // category : ((args.type).toUpperCase() || ""),
        // label : ((args.category).toUpperCase() || ""),
        // name : (e.data.product_name || ""),
        // action : (e.data.product_name || ""),
        // value : 1
        // });
        // end temp comnt
    }

    try {
        similarProductsData = "";
        peopleAlsoViewData = "";
        availabledesign_data_count = "";
        $.moreDetailsContainer.design = "";
        $.imageOptionScroll.otherItems = "";
        $.colorOptionScroll.shades = "";
        $.superScroll.scrollTo(0, 0);
        if (!isNullVal(e.data.image)) {

            $.estoreImage.image = encodeURI(e.data.image);
            $.blurImage.image = encodeURI(e.data.blur_image);
            $.preview_image.image = encodeURI(e.data.image);
            wallpaperImage = [encodeURI(e.data.image)];
        } else {
            $.blurImage.image = "";
            $.estoreImage.image = "";
            $.preview_image.image = "";
            wallpaperImage = [];
        }
        if (!isNullVal(e.data.url)) {
            $.shareIcon.shareUrl = e.data.url;
            sharingProductUrl = e.data.url;
        } else {
            $.shareIcon.shareUrl = "";
        }
        if (!isNullVal(e.data.product_id)) {

            productId = e.data.product_id;
        } else {

            productId = "";
        }

        if (e.data.wishlistItem) {
            wishFlag = true;
            $.wishIcon.text = Alloy.Globals.icon.setShortlist;
            $.wishIcon.color = "#e65e48";
        } else {
            wishFlag = false;
            $.wishIcon.text = Alloy.Globals.icon.shortlist;
            $.wishIcon.color = "#ffffff";
        }

        if (e.data.cartItem) {
            addToCartFlag = true;
        } else {
            addToCartFlag = false;
        }

        if (!isNullVal(e.data.product_sku)) {
            $.wishIcon.product_sku = e.data.product_sku;
            gaProductSku = e.data.product_sku;
        } else {
            $.wishIcon.product_sku = "";
            gaProductSku = "";
        }

        if (!isNullVal(e.data.rating)) {
            var rateCountText = "";
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

            /*new Attribute string added */
            setRateAttribute(rateCountText);
            /*new Attribute string added */

        }

        if (!isNullVal(e.data.product_name)) {

            productName = e.data.product_name;
            $.skuNameLbl.text = e.data.product_name.toUpperCase();
        } else {

            $.skuNameLbl.text = "";
        }
        if (!isNullVal(e.data.small_attr_name)) {

            $.subSkuNameLbl.text = e.data.small_attr_name.toUpperCase();
        } else {
            $.subSkuNameLbl.text = "";

        }
        if (!isNullVal(e.data.stock)) {
            $.stockStatus.text = e.data.stock;
            if (e.data.stock == "In Stock") {

                if (e.data.is_wallpaper) {
                    $.whereToBuy.visible = true;
                    $.SuperSimilarCollection.bottom = "50dp";
                } else {
                    $.availabilityLbl.visible = true;
                    $.addToBagLbl.visible = true;
                    // $.addToBagLbl.visible = false;
                    // commented for time begin

                    $.SuperSimilarCollection.bottom = "50dp";
                }
                lost_sale = false;
               
            } else {
                if (e.data.is_wallpaper) {
                    $.SuperSimilarCollection.bottom = "50dp";
                } else {
                    $.SuperSimilarCollection.bottom = "0dp";
                }
                $.availabilityLbl.visible = false;
                $.addToBagLbl.visible = false;
                lost_sale = true;
            }
        } else {
            $.stockStatus.text = "";
            //$.availabilityLbl.visible = false;
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
        } else {
            $.priceLbl.text = "";
            $.taxLbl.text = "";
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
            // if ($.ironImage.getHeight() == "0dp") {
            // $.ironImage.height = "30dp";
            // }
            // if ($.ironImage.getTop() == "0dp") {
            // $.ironImage.top = "25dp";
            // }

            if ($.washCareContainer.getHeight() == "0dp") {
                $.washCareContainer.height = "30dp";
            }
            if ($.washCareContainer.getTop() == "0dp") {
                $.washCareContainer.top = "15dp";
            }

        } else {
            $.ironImage.image = "";
            //$.ironImage.top = "0dp";
            $.washCareContainer.top = "0dp";
            $.washCareContainer.height = "0dp";
            //$.ironImage.height = "0dp";
        }

        if (!isNullVal(e.data.bluritems[0])) {
            $.imageOptionScroll.blurImages = e.data.bluritems;

        } else {
            $.imageOptionScroll.blurImages = "";
        }

        if (!isNullVal(e.data.items[0])) {
            if ($.imageOptionScroll.getHeight() == "0dp") {
                $.imageOptionScroll.height = "50dp";
            }
            image_data = e.data.items;
            $.imageOptionScroll.otherItems = e.data.items;
            displayImages();

        } else {
            $.imageOptionScroll.otherItems = "";
            $.imageOptionScroll.height = "0dp";
            image_data = "";
        }

        if (!isNullVal(e.data.availableShades.response[0])) {
            if ($.colorOptionScroll.getHeight() == "0dp") {
                $.colorOptionScroll.height = "60dp";
            }
            $.colorOptionScroll.shades = e.data.availableShades.response;
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

        if (!e.data.is_wallpaper) {

            if (_.size(e.data.tc_collection) == 0 || _.size(e.data.collection_attribute) == 0) {

                if ($.collectionDetail1.getHeight() == "0dp") {
                    $.collectionDetail1.height = Titanium.UI.SIZE;
                    $.collectionDetail1.top = "18dp";
                }
            }
            
           

            if (_.size(e.data.collection_attribute) > 0) {

                if ($.collectionSeperator.getWidth() == "0dp") {
                    $.collectionSeperator.width = "1dp";
                }
                
                if($.collectionSubDetail.getVisible() == false){                   
                     $.collectionSubDetail.visible = true;
                }
                
                $.collectionSubDetail.left = "0dp";
                $.collectionSeperator.left = "0dp";
                collection_attributes_data = e.data.collection_attribute;
                collectionSubDetails(collection_attributes_data);

            } else {
                collection_attributes_data = null;
                $.collectionSubDetail.visible = false;
                $.collectionSeperator.width = "0dp";
            }

            if (_.size(e.data.tc_collection) > 0) {
                if ($.tcCollectionContainer.getWidth() == "0dp") {
                    $.tcCollectionContainer.width = "35%";
                    $.collectionSeperator.width = "1dp";
                }

                $.collectionName.text = e.data.tc_collection.name;
                $.collectionImage.image = e.data.tc_collection.tccollection_url;

            } else {
                // $.collectionSubDetail.left = "0dp",
                $.tcCollectionContainer.width = "0dp";
                $.collectionSeperator.width = "0dp";
                $.collectionName.text = "";
                $.collectionImage.image = "";
            }
            
            if(_.size(e.data.collection_attribute) > 0 && _.size(e.data.tc_collection) > 0){
                $.collectionSubDetail.left = "10dp";
                $.collectionSeperator.left = "10dp";
            }
            
            if (_.size(e.data.tc_collection) == 0 && _.size(e.data.collection_attribute) == 0) {
                $.collectionDetail1.height = "0dp";
                $.collectionDetail1.top = "0dp";
            }
        } else {
            $.collectionDetail1.height = "0dp";
            $.collectionDetail1.top = "0dp";
        }

        if (!isNullVal(e.data.alsoAvialableAs_data.response[0])) {

            if (args.product == "wallpaper") {
                $.availableDesigLbl.text = "AVAILABLE DESIGNS";
            } else {
                $.availableDesigLbl.text = "ALSO AVAILABLE AS";
            }
            if ($.availableDesignScroll.getHeight() == "0dp") {
                $.availableDesignScroll.height = parseInt(designWidth + 20);
            }
            if ($.pageControlContainer.getVisible() == "false") {
                $.pageControlContainer.visible = true;
            }
            availabledesign_data_count = e.data.alsoAvialableAs_data.total_count;
            showAvailableDesign(e.data.alsoAvialableAs_data.response);
        } else {
            availabledesign_data_count = "";
            $.availableDesignScroll.top = "0dp";
            $.availableDesigLbl.top = "0dp";
            $.availableDesigLbl.text = "";
            $.availableDesignScroll.height = "0dp";
            $.pageControlContainer.visible = false;
        }

        if (!isNullVal(e.data.similarProducts_data.response[0])) {
            if ($.similarCollectionContainer.getHeight() == "0dp") {
                $.similarCollectionContainer.height = Titanium.UI.SIZE;
                $.listSeperator.height = "1dp";
            }
            similarProductsData = e.data.similarProducts_data.response;
            similarProductsDataCount = e.data.similarProducts_data.total_count;
        } else {
            similarProductsData = "";
            similarProductsDataCount = "";
            $.similarCollectionContainer.height = "0dp";
            $.listSeperator.height = "0dp";
        }

        if (!isNullVal(e.data.peopleAlsoViewed_data.response[0])) {
            if ($.alsoViewCollectionContainer.getHeight() == "0dp") {
                $.alsoViewCollectionContainer.height = Titanium.UI.SIZE;
                $.listSeperator.height = "1dp";
            }
            peopleAlsoViewData = e.data.peopleAlsoViewed_data.response;
            peopleAlsoViewDataCount = e.data.peopleAlsoViewed_data.total_count;
        } else {
            peopleAlsoViewData = "";
            peopleAlsoViewDataCount = "";
            $.alsoViewCollectionContainer.height = "0dp";
            $.listSeperator.height = "0dp";
        }
        hideLoader($.estoreDetails);
        gaShortlistProduct = productName + "(" + gaProductSku + ")";
        gaAddToCartProduct = {};
        gaAddToCartProduct = {
            name : productName,
            sku : gaProductSku,
            shortlistFlag : wishFlag
        };
         
        gaShortlistProductArray ={
            name : productName,
            sku : gaProductSku,
            lostSale : lost_sale,
        };
        googleAnalyticsDetail(gaShortlistProduct);
    } catch(ex) {
        hideLoader($.estoreDetails);
        Ti.API.info('ex= catch' + JSON.stringify(ex));
    }
    // =======
    //
    // } else {
    // $.ironImage.image = "";
    // //$.ironImage.top = "0dp";
    // $.washCareContainer.top = "0dp";
    // $.washCareContainer.height = "0dp";
    // //$.ironImage.height = "0dp";
    // }
    //
    // if (!isNullVal(e.data.bluritems[0])) {
    // $.imageOptionScroll.blurImages = e.data.bluritems;
    //
    // } else {
    // $.imageOptionScroll.blurImages = "";
    // }
    //
    // if (!isNullVal(e.data.items[0])) {
    // if ($.imageOptionScroll.getHeight() == "0dp") {
    // $.imageOptionScroll.height = "50dp";
    // }
    // image_data = e.data.items;
    // $.imageOptionScroll.otherItems = e.data.items;
    // displayImages();
    //
    // } else {
    // $.imageOptionScroll.otherItems = "";
    // $.imageOptionScroll.height = "0dp";
    // image_data = "";
    // }
    //
    // if (!isNullVal(e.data.availableShades.response[0])) {
    // if ($.colorOptionScroll.getHeight() == "0dp") {
    // $.colorOptionScroll.height = "60dp";
    // }
    // $.colorOptionScroll.shades = e.data.availableShades.response;
    // displayAvailableColors();
    //
    // } else {
    // $.colorOptionScroll.shades = "";
    // $.colorOptionScroll.height = "0dp";
    // }
    //
    // if (_.size(e.data.product_attributes) > 0) {
    // if ($.viewMoreDetailsLbl.getHeight() == "0dp") {
    // $.viewMoreDetailsLbl.height = "35dp";
    // }
    // $.moreDetailsContainer.design = e.data.product_attributes;
    //
    // } else {
    // $.moreDetailsContainer.design = "";
    // $.viewMoreDetailsLbl.top = "0dp";
    // $.viewMoreDetailsLbl.height = "0dp";
    // }
    // if (!isNullVal(e.data.alsoAvialableAs_data.response[0])) {
    //
    // if ($.availableDesignScroll.getHeight() == "0dp") {
    // $.availableDesignScroll.height = parseInt(designWidth + 20);
    // }
    // if ($.pageControlContainer.getVisible() == "false") {
    // $.pageControlContainer.visible = true;
    // }
    // availabledesign_data_count = e.data.alsoAvialableAs_data.total_count;
    // showAvailableDesign(e.data.alsoAvialableAs_data.response);
    // } else {
    // availabledesign_data_count = "";
    // $.availableDesignScroll.top = "0dp";
    // $.availableDesigLbl.top = "0dp";
    // $.availableDesigLbl.text = "";
    // $.availableDesignScroll.height = "0dp";
    // $.pageControlContainer.visible = false;
    // }
    //
    // if (!isNullVal(e.data.similarProducts_data.response[0])) {
    // if ($.similarCollectionContainer.getHeight() == "0dp") {
    // $.similarCollectionContainer.height = Titanium.UI.SIZE;
    // $.listSeperator.height = "1dp";
    // }
    // similarProductsData = e.data.similarProducts_data.response;
    // similarProductsDataCount = e.data.similarProducts_data.total_count;
    // } else {
    // similarProductsData = "";
    // similarProductsDataCount = "";
    // $.similarCollectionContainer.height = "0dp";
    // $.listSeperator.height = "0dp";
    // }
    //
    // if (!isNullVal(e.data.peopleAlsoViewed_data.response[0])) {
    // if ($.alsoViewCollectionContainer.getHeight() == "0dp") {
    // $.alsoViewCollectionContainer.height = Titanium.UI.SIZE;
    // $.listSeperator.height = "1dp";
    // }
    // peopleAlsoViewData = e.data.peopleAlsoViewed_data.response;
    // peopleAlsoViewDataCount = e.data.peopleAlsoViewed_data.total_count;
    // } else {
    // peopleAlsoViewData = "";
    // peopleAlsoViewDataCount = "";
    // $.alsoViewCollectionContainer.height = "0dp";
    // $.listSeperator.height = "0dp";
    // }
    // hideLoader($.estoreDetails);
    //
    // } catch(ex) {
    // hideLoader($.estoreDetails);
    // Ti.API.info('ex= catch' + JSON.stringify(ex));
    // }
    // >>>>>>> df8f4a6b2afce1917612e3af75d69ec9d626a689

}

function getShopDetailsErrorCallback(e) {
    hideLoader($.estoreDetails);
    Ti.API.info('error = ' + e);
}

/*
 * set qds available shades
 */

function displayAvailableColors() {
    var myCounter = 0;
    _.each($.colorOptionScroll.children, function(view, key) {
        $.colorOptionScroll.remove(view);
    });

    _.each($.colorOptionScroll.shades, function(value, k) {

        selectedView[value.product_id] = Ti.UI.createView({
            width : "44dp",
            height : "44dp",
            left : "8dp",
            id : value.product_id,
            productID : value.product_id,
            type : "fabricsColor",
            borderColor : "transparent",
            //touchEnabled : false,
        });

        colorView = Ti.UI.createImageView({
            width : "35dp",
            height : "35dp",
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

    selectedView[productId].backgroundColor = "#cccccc";

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
            block : "shop",
        };
        getShopDetails(data);
    }
});

function displayImages() {
    var subImageContainer = [];
    var otherImage = [];

    _.each($.imageOptionScroll.children, function(view, key) {
        $.imageOptionScroll.remove(view);
    });

    _.each($.imageOptionScroll.otherItems, function(value, k) {

        selectedImage[k] = Ti.UI.createView({
            width : "59dp",
            height : "39dp",
            left : "5dp",
            id : k,
            //	productID : value.product_id,
            type : "fabricsColor",
            borderColor : "transparent",
            //touchEnabled : false,
        });

        subImageContainer[k] = Ti.UI.createView({
            width : "55dp",
            height : "35dp",
            backgroundColor : "#e6e6e6",
            id : k,
            type : "fabricsColor",
        });

        otherImage[k] = Ti.UI.createImageView({
            //width : "55dp",
            //height : "35dp",
            id : k,
            touchEnabled : false,
            defaultImage : "/images/default_logo.png",
            image : encodeURI(value),
            backgroundColor : "#f4f4f4"
        });
        subImageContainer[k].add(otherImage[k]);
        selectedImage[k].add(subImageContainer[k]);
        $.imageOptionScroll.add(selectedImage[k]);
    });

    _.each($.imageOptionScroll.blurImages, function(value, k) {
        otherImage[k].blurImage = value;
    });

}

$.imageOptionScroll.addEventListener('click', function(e) {

    if (e.source.type == "fabricsColor") {
        _.each($.imageOptionScroll.otherItems, function(value, k) {
            selectedImage[k].backgroundColor = "transparent";
        });
        selectedImage[e.source.id].backgroundColor = "#e65e48";
        $.blurImage.image = e.source.children[0].blurImage;
        $.estoreImage.image = e.source.children[0].image;
    }
});

function collectionSubDetails(collection_attributes_data) {

    $.collectionSubDetail.removeAllChildren();

    var detailsContainer = Ti.UI.createView({
        width : Ti.UI.FILL,
        height : Ti.UI.SIZE,
        layout : "vertical",
    });

    _.each(collection_attributes_data, function(value, k) {
        var headingLbl = Ti.UI.createLabel({
            //height:Ti.UI.SIZE,
            left : "0dp",
            top : "0dp",
            bottom : "10dp",
            height : Ti.UI.SIZE,
            width : Ti.UI.SIZE,
            font : {
                fontSize : "9dp",
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
                top : "7dp", //8
                layout : "horizontal"
            });

            var label1 = Ti.UI.createLabel({
                //height:Ti.UI.SIZE,
                left : "0dp",
                height : Ti.UI.SIZE,
                width : "45%",
                font : {
                    fontSize : "9dp",
                    fontFamily : "futura_lt_bt_light-webfont"
                },
                color : "#333333",
                text : key.toUpperCase(),
                top : "0dp",

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
                width : "50%",
                font : {
                    fontSize : "9dp",
                    fontFamily : "futura_medium_bt-webfont"
                },
                color : "#333333",
                //text : ":  " + ((v != false) ? ((v != null) ? v.toUpperCase() : "NA") : "NA"),
                text : ((v != false) ? ((v != null) ? v.toUpperCase() : "NA") : "NA"),
                top : "0dp",

            });
            subDetailsContainer.add(label2);
            detailsContainer.add(subDetailsContainer);

        });
    });

    $.collectionSubDetail.add(detailsContainer);

}

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
                top : "0dp",

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
                width : "50%",
                font : {
                    fontSize : "11dp",
                    fontFamily : "futura_medium_bt-webfont"
                },
                color : "#333333",
                //text : ":  " + ((v != false) ? ((v != null) ? v.toUpperCase() : "NA") : "NA"),
                text : ((v != false) ? ((v != null) ? v.toUpperCase() : "NA") : "NA"),
                top : "0dp",

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
            if (!isNullVal(args.product)) {
                if (args.product == "wallpaper") {
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
                } else {
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
                        //ellipsize : true,
                        //wordWrap : false,
                        text : design_lbl.toUpperCase(),
                        bottom : "5dp",
                        touchEnabled : false
                    });
                    designContainer[i].add(designLbl[i]);
                }
            }
        });
        if (availabledesign_data_count > 11) {
            //Ti.API.info('value.product_id = ' + productId);
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
                product_id : productId,
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
    //Ti.API.info('available = ' + JSON.stringify(e));
    if (e.source.type == "availableDesign") {
        closeOtherViews();
        var data = {
            Productid : e.source.id,
            block : "shop",
        };
        getShopDetails(data);

    } else if (e.source.text == "VIEW ALL") {
        var args_ = {
            block : "shop",
            slider : "alsoavailableas",
            productID : e.source.product_id,
            navigatedblockid : "",
            type : "shop"
        };
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
            setSimilarData(similarProductsData, "similarproducts", similarProductsDataCount);
            e.source.add(gridListContainer);
            e.source.children[0].children[1].text = Alloy.Globals.icon.dropDown;

            //$.listSeperator.top = "15dp";
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
            setSimilarData(peopleAlsoViewData, "peoplealsoviewed", peopleAlsoViewDataCount);
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

    } else if (e.source.id == "cart") {
        if (!isNullVal(args.product)) {
            if (args.product != "wallpaper") {
                if (!isNullVal(Ti.App.Properties.getString("access_token"))) {
                    //Ti.API.info('if2');
                    addToCart(e.source);
                } else {
                    //Alloy.Globals.addWindowInNav("signIn", "productDetails");
                    Alloy.Globals.addWindowInNav("signIn", {
                        listObject : e.source,
                        listViewReference : addToCart,
                    });
                }
            }
        }

    } else if (e.source.id == "shareLbl") {
        // socialShare();
        //Ti.API.info('source id' + JSON.stringify(e.source));
        //Ti.API.info('sharing url is ' + e.source.shareUrl);
        shareImage(e.source.shareUrl);

    } else {
        if (e.source.productId) {
            closeOtherViews();
            var data = {
                Productid : e.source.productId,
                block : "shop",
            };
            getShopDetails(data);
        }
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
        viewAll = Ti.UI.createLabel({
            top : "10dp",
            bottom : "10dp",
            width : parseInt((Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor) - 10),
            height : "35dp",
            font : {
                fontSize : "12sp",
            },
            color : "#333333",
            backgroundColor : "#f4f4f4",
            text : "VIEW ALL",
            block : "shop",
            slider : slider,
            productID : productId,
            textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
        });
        gridListContainer.add(viewAll);

        touchEffect.createTouchEffect(viewAll, "#a6333333", "#333333");
        viewAll.addEventListener('click', function(e) {
            //Ti.API.info('args =' + JSON.stringify(_args));
            if (!isNullVal(_args.product)) {
                if (_args.product == "wallpaper") {
                    var args_ = {
                        block : e.source.block,
                        slider : e.source.slider,
                        productID : e.source.productID,
                        navigatedblockid : "",
                        type : "wallpaper"
                    };
                } else {
                    var args_ = {
                        block : e.source.block,
                        slider : e.source.slider,
                        productID : e.source.productID,
                        navigatedblockid : "",
                        type : "shop"
                    };
                }
            }

            Alloy.Globals.addWindowInNav("otherListingPage", args_);

        });

    }
    _.each(similarCollectionData, function(value, k) {

        var product1 = Ti.UI.createView({
            left : "0dp",
            top : "0dp",
            productId : value.product_id,
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

        /*New UI added for Out Of Stock*/
        var outOfStock = $.UI.create("Label", {
            classes : "fontLight",
            width : Titanium.UI.FILL,
            height : Alloy.Globals.imageWidth,
            top : "0dp",
            backgroundColor : "#BFffffff",
            text : "OUT OF STOCK",
            font : {
                fontSize : "14dp"
            },
            touchEnabled : false,
            visible : false,
            color : "#000",
            textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
        });

        imageContainer.add(outOfStock);

        var cartIcon = Ti.UI.createLabel({
            font : {
                fontSize : "20dp", //23
                fontFamily : "icomoon"
            },
            width : "35dp",
            height : "35dp",
            //color : ((value.cartItem) ? "#e65e48" : "#ffffff"),
            backgroundColor : ((value.cartItem) ? "#e65e48" : "#66000000"),
            borderColor : ((value.cartItem) ? "#e65e48" : "#66000000"),
            borderRadius : 18,
            textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
            bottom : "10dp", //"0dp",
            right : "10dp", //"0dp",
            id : "cart",
            text : ((args.product != "wallpaper") ? ((value.cartItem) ? Alloy.Globals.icon.bag : Alloy.Globals.icon.bag) : ""),
            //text : Alloy.Globals.icon.bag,
            productId : value.product_id,
            productSku : value.product_sku,
            productName : value.product_name,
            shortlistFlag : value.wishlistItem,
            customId : k,
        });

        imageContainer.add(cartIcon);

        if (!isNullVal(args.product)) {
            // args.product = shop indicates this is shop products
            // which will have option for add to cart

            if (args.product == "shop" || args.product == "shopProduct") {

                if ((!value.in_stock)) {
                    outOfStock.setVisible(true);
                    cartIcon.setVisible(false);
                }
            } else {
                cartIcon.setVisible(false);

            }
        }

        // cartIcon.setVisible(false);
        // added for time beign

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

        var productSize1 = Ti.UI.createLabel({
            //text : value.product_size,
            text : ((args.product != "wallpaper") ? ((value.product_size == "NA") ? "" : value.product_size) : ""),
            productId : value.product_id,
            productName : value.product_name,
        });

        $.addClass(productSize1, "productSizeClass");
        if (args.product != "wallpaper" && value.product_size != "NA") {
            nameContainer.add(productSize1);
        }

        var wheretoBuy1 = Ti.UI.createLabel({
            text : Alloy.Globals.icon.currency + value.product_price,
            productId : value.product_id,
            productName : value.product_name,
            bottom : "10dp"
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
            top : "5dp",
            width : "35dp",
            height : "35dp",
            textAlign : Titanium.UI.TEXT_ALIGNMENT_RIGHT,
            verticalAlign : Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
            text : Alloy.Globals.icon.share,
            productId : value.product_id,
            productName : value.product_name,
            id : "shareLbl",
            shareUrl : value.url,
        });
        //shareIcon1.addEventListener("click",socialShare);
        shareContainer.add(shareIcon1);

        wishIcon1[k] = Ti.UI.createLabel({
            right : "3dp",
            color : ((value.wishlistItem) ? "#e65e48" : "#a6a6a6"),
            font : {
                fontSize : "18dp",
                fontFamily : "icomoon"
            },
            top : "5dp",
            width : "35dp",
            height : "35dp",
            value : value.wishlistItem,
            textAlign : Titanium.UI.TEXT_ALIGNMENT_RIGHT,
            verticalAlign : Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
            text : ((value.wishlistItem) ? Alloy.Globals.icon.setShortlist : Alloy.Globals.icon.shortlist),
            productId : value.product_id,
            productSku : value.product_sku,
            lostSale : value.in_stock,
            productName : value.product_name,
            id : "wishLbl"
        });
        shareContainer.add(wishIcon1[k]);

    });
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
    $.ratingIcon.text = "\ue918 \ue918 \ue918 \ue918 \ue918";
}

$.wishIcon.addEventListener('click', checkshortlistItem);

function checkshortlistItem(e) {
    if (e.source.text == "\ue927") {
        removeWishlist();
    } else {
        addToShortlist();
    }
}

var shortlistData;
function addToShortlist(pId) {

    if (!isNullVal(Ti.App.Properties.getString("access_token"))) {
        var product_id;
        shortlistData = "";
        if (pId) {
            if (pId.productId)
                product_id = pId.productId;

            shortlistData = pId;
            Ti.API.info('pId == = = = = ='+JSON.stringify(pId));
            gaShortlistProductArray ={
                name : shortlistData.productName,
                sku :  shortlistData.productSku,
                lostSale :  (shortlistData.lostSale==0)?true:false,
            };
            
            if(!(pId.id)){
                $.wishIcon.text = Alloy.Globals.icon.setShortlist;
                $.wishIcon.color = "#e65e48";
            }
            
        } else {
            product_id = productId;
            gaShortlistProductArray ={
                name : productName,
                sku : gaProductSku,
                lostSale : lost_sale,
            };
        }

        /*display product as shortlisted before hit api */
        if (_.size(shortlistData) != 0) {
            Ti.API.info('inside if');
            shortlistData.text = Alloy.Globals.icon.setShortlist;
            shortlistData.color = "#e65e48";
        } else {
            $.wishIcon.text = Alloy.Globals.icon.setShortlist;
            $.wishIcon.color = "#e65e48";
        }

        //showLoader($.estoreDetails);
        var url = Alloy.Globals.commonUrl.addToShortlist;
        var data = {
            product_id : product_id
        };

        var requestParams = JSON.stringify(data);

        Alloy.Globals.webServiceCall(url, requestParams, addToShortlistSuccessCallback, addToShortlistErrorCallback, "POST", $.estoreDetails);
    } else {
        //Alloy.Globals.addWindowInNav("signIn", "estoreDetails");
        
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
        showAlert($.estoreDetails, e.message);
        //gaShortlistProduct($.wishIcon.product_sku);

        googleAnalyticsShortlist(gaShortlistProductArray, "ESTORE DETAIL PAGE");

         if (!isNullVal(args.listObject)) {
            args.listViewReference(args.listObject, "add");
        }else{
            Ti.API.info('inside else');
        }

    } catch(ex) {
        Ti.API.info('catch = ' + (ex.message));
    }
}

function addToShortlistErrorCallback(e) {
    //hideLoader($.estoreDetails);
    showAlert($.estoreDetails, e.message);
    if (_.size(shortlistData) != 0) {
        shortlistData.text = Alloy.Globals.icon.shortlist;
        shortlistData.color = "#a6a6a6";
    } else {
        $.wishIcon.text = Alloy.Globals.icon.shortlist;
        $.wishIcon.color = "#ffffff";
    }
}

function removeWishlist(wishData) {

    if (wishData) {
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
    Alloy.Globals.webServiceCall(url, requestParams, removeShortlistProductSuccessCallback, removeShortlistProductErrorCallback, "POST", $.estoreDetails);
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
        showAlert($.estoreDetails, e.message);

        if (!isNullVal(args.listObject)) {
            args.listViewReference(args.listObject, "remove");
        }

    } catch(ex) {
        Ti.API.info('catch = ' + (ex.message));
    }
}

function removeShortlistProductErrorCallback(e) {
    showAlert($.estoreDetails, e.message);
    if (_.size(shortlistData) != 0) {
        shortlistData.text = Alloy.Globals.icon.setShortlist;
        shortlistData.color = "#e65e48";
    } else {
        $.wishIcon.text = Alloy.Globals.icon.setShortlist;
        $.wishIcon.color = "#e65e48";
    }
}

$.addToBagLbl.addEventListener('click', addToCart);
var cartData;
function addToCart(cartId) {
   
    if (!isNullVal(Ti.App.Properties.getString("access_token"))) {
 
        var cart_product_id;
        cartData = "";
        if (!isNullVal(cartId.productId)) {
            
            cart_product_id = cartId.productId;
            cartData = cartId;
            
            
            gaAddToCartProduct = {
                name : cartData.productName,
                sku : cartData.productSku,
                shortlistFlag : ((cartId.customId =="0")?((wishIcon1[0].color == "#e65e48")?true:false):((wishIcon1[1].color == "#e65e48")?true:false))
            };
            // var url = Alloy.Globals.commonUrl.addToCart;
            // var data = {
            // product_id : cart_product_id,
            // qty : 1
            // };
            //
            // var requestParams = JSON.stringify(data);
            //
            // Alloy.Globals.webServiceCall(url, requestParams, addToCartSuccessCallback, addToCartErrorCallback, "POST", $.estoreDetails);

        } else {
            cart_product_id = productId;
            gaAddToCartProduct = {
                name : productName,
                sku : gaProductSku,
                shortlistFlag : (($.wishIcon.color == "#e65e48")?true:false)
            };
            // if(addToCartFlag){
            // var url = Alloy.Globals.commonUrl.addToCart;
            // var data = {
            // product_id : cart_product_id,
            // qty : 1
            // };
            //
            // var requestParams = JSON.stringify(data);
            //
            // Alloy.Globals.webServiceCall(url, requestParams, addToCartSuccessCallback, addToCartErrorCallback, "POST", $.estoreDetails);
            // }else{
            //
            // if (!isNullVal(args.listObject)) {
            //
            // if ((args.listObject.bindId).toString().lastIndexOf("1") != -1) {
            // args.listObject.bindId = "gridCart1";
            // } else if ((args.listObject.bindId).toString().lastIndexOf("2") != -1) {
            // args.listObject.bindId = "gridCart2";
            // }
            //
            // Ti.API.info('addToCartFlag = '+addToCartFlag);
            //
            // // var callListingFn = args.listViewReference(args.listObject);
            // //Ti.API.info('callListingFn = '+callListingFn);
            //
            // var callListingFn = args.listViewReference(args.listObject);
            //
            // //showAlert($.estoreDetails,callListingFn);
            //
            // }
            //
            //
            // }
        }

        var url = Alloy.Globals.commonUrl.addToCart;
        var data = {
            product_id : cart_product_id,
            qty : 1
        };

        var requestParams = JSON.stringify(data);

        Alloy.Globals.webServiceCall(url, requestParams, addToCartSuccessCallback, addToCartErrorCallback, "POST", $.estoreDetails);
    } else {
        //.Globals.addWindowInNav("signIn", "estoreDetails");
       
        var cartProductData = {};
        cartProductData = {
            productId : cart_product_id
        };
        Alloy.Globals.addWindowInNav("signIn", {
            listObject : cartProductData,
            listViewReference : addToCart,
        });
    }
}

function addToCartFromLogin(e) {
    addToCart(e);
}

function addToCartSuccessCallback(e) {
    try {
        if (_.size(cartData) != 0) {
            //cartData.color = "#e65e48";
            cartData.setBackgroundColor("#e65e48");
            cartData.setBorderColor("#e65e48");
        }
        Ti.App.Properties.setString("quote_id", e.data[0].quote_id);
        Ti.App.Properties.setString("cartCount", e.data[0].count);
        
        var cartDataArray = [];
        cartDataArray = Titanium.App.Properties.getList('cartProductIdArray');
        Ti.API.info('cartDataArray = '+cartDataArray);
        if(cartDataArray.indexOf(e.data[0].product_id) == -1){
            cartDataArray.push(e.data[0].product_id);
        }
        Titanium.App.Properties.setList('cartProductIdArray',cartDataArray);
        
        Ti.API.info('Titanium.App.Properties.getObject() = '+Titanium.App.Properties.getList('cartProductIdArray'));
        
        googleAnalyticsBag(gaAddToCartProduct);
        
        //Alloy.Globals.setCount();
        //Ti.App.fireEvent("updateCartCount");
        $.header.updateCartCount();
        //Ti.API.info('e = ' + JSON.stringify(e));
        showAlert($.estoreDetails, e.message);

        if (!isNullVal(args.listObject)) {

            if ((args.listObject.bindId).toString().lastIndexOf("1") != -1) {
                args.listObject.bindId = "gridCart1";
            } else if ((args.listObject.bindId).toString().lastIndexOf("2") != -1) {
                args.listObject.bindId = "gridCart2";
            }

           
            //if(addToCartFlag==false){
            args.listViewReference(args.listObject, e.data[0].product_id);
            //}

        }

    } catch(ex) {
        Ti.API.info('ex.message = ' + ex.message);
    }
}

function addToCartErrorCallback(e) {
    showAlert($.estoreDetails, e.message);
}

function navigateToStoreLocater() {
    // Alloy.Globals.addWindowInNav("findStore");
    if (!isNullVal(args.product)) {
        if (args.product == "wallpaper") {
            Alloy.Globals.addWindowInNav("findStore");
        } else {
            var obj = {};
            obj.type = "bedding";
            Alloy.Globals.addWindowInNav("findStore", obj);
        }
    }
    
    generateLead(gaShortlistProductArray,"ESTORE DETAIL PAGE");
}

$.estoreImage.addEventListener('click', function(e) {
    //hideShowView($.previewImageScroll);
    //$.previewCloseLbl.visible = true;

    var imageData = {};
    if (!isNullVal(args.product)) {

        if (args.product == "wallpaper") {
            imageData = {
                product_id : productId,
                wish_flag : wishFlag,
                type : "shop",
                data : wallpaperImage,
                sharingProductUrl : sharingProductUrl,
            };
        } else {
            imageData = {
                product_id : productId,
                wish_flag : wishFlag,
                type : "shop",
                sharingProductUrl : sharingProductUrl,
                data : image_data
            };
        }
        //Ti.API.info('imnage' + JSON.stringify(imageData));
        previewImage = Alloy.createController('imagePreview', imageData).getView();
        $.estoreDetails.add(previewImage);
        hideShowView(previewImage);
    }

});

$.previewCloseLbl.addEventListener('click', function(e) {
    hideShowView($.previewImageScroll);
    $.previewCloseLbl.visible = false;
});

function goToBack() {

    if ($.ratingContainer.visible) {
        hideShowView($.ratingContainer);
    } else if (previewImage.type == "imagePreview") {
        hideShowView(previewImage);
        previewImage = "";
    } else {
        $.estoreDetails.removeEventListener('click', hideOverFlowMenu);
        $.subRatingContainer.removeEventListener('click', rating);
        $.estimateDateLbl.removeEventListener('click', estimateDate);
        $.availabilityLbl.removeEventListener('click', checkAvailability);
        $.superScroll.removeEventListener('scroll', upArrowEffect);
        $.upArrowLbl.removeEventListener('click', scrollToEffect);
        $.moreDetailsContainer.removeEventListener('click', moreDetailsEffect);
        $.SuperSimilarCollection.removeEventListener('click', productToggleEffect);
        //args = {};

        //$.estoreDetails.removeAllChildren();
        Alloy.Globals.popWindowInNav();
        $.estoreDetails.close();
    }

}

function destroyWindow(e) {

    $.removeListener();
    $.estoreDetails.remove($.superScroll);
    $.superScroll.removeAllChildren();

    $.estoreDetails.remove($.addToBagLbl);
    $.estoreDetails.remove($.whereToBuy);

    $.estoreDetails.remove($.upArrowLbl);

    $.estoreDetails.remove($.previewContainer);
    $.previewContainer.removeAllChildren();

    $.estoreDetails.remove($.ratingContainer);
    $.ratingContainer.removeAllChildren();

    $.estoreDetails.remove($.previewImageScroll);
    $.previewImageScroll.removeAllChildren();

    $.estoreDetails.remove($.previewCloseLbl);

    $.destroy();
}

function updateCount() {

    $.header.updateCartCount();
}

$.shareIcon.addEventListener('click', function(e) {
    shareImage(e.source.shareUrl);
});

function setRateAttribute(rateCountText) {
    /*new Attribute string added */

    var text = $.ratingIcon.getText();
    var attr = Ti.UI.createAttributedString({
        text : text,
        attributes : [{
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