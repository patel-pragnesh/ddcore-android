function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function scrollToEffect(e) {
        $.superScroll.scrollTo(0, 0);
    }
    function upArrowEffect(e) {
        var ycordinates = $.superScroll.contentOffset.y;
        if (ycordinates >= 30) {
            $.upArrowLbl.visible = true;
            setTimeout(function() {
                $.upArrowLbl.visible = false;
            }, 5e3);
        } else 0 == ycordinates && ($.upArrowLbl.visible = false);
    }
    function checkAvailability(e) {
        $.pincodeTxt.value = "";
        $.availabilityLbl.visible = false;
        $.pincodeContainer.visible = true;
    }
    function estimateDeliverySuccessCallback(e) {
        try {
            $.activityIndi.hide();
            $.checkBtn.visible = true;
            $.checkBtn.touchEnabled = true;
            $.pincodeContainer.visible = false;
            $.estimateDateLbl.visible = true;
            $.estimateDateLbl.text = $.pincodeTxt.value + " - " + e.data.deliveryDate;
        } catch (ex) {
            $.activityIndi.hide();
            $.checkBtn.visible = true;
            $.checkBtn.touchEnabled = true;
            Ti.API.info("catch =" + JSON.stringify(ex));
        }
    }
    function estimateDeliveryErrorCallback(e) {
        $.activityIndi.hide();
        $.checkBtn.visible = true;
        $.checkBtn.touchEnabled = true;
        $.pincodeContainer.visible = false;
        $.estimateDateLbl.visible = true;
        $.estimateDateLbl.text = $.pincodeTxt.value + " - " + e.message;
        Ti.API.info("error" + JSON.stringify(e));
    }
    function estimateDate(e) {
        $.estimateDateLbl.visible = false;
        $.availabilityLbl.visible = true;
    }
    function rating(e) {
        finalRating = "";
        if ("rate" == e.source.type) {
            for (var i = 0; i < e.source.count; i++) {
                $.subRatingContainer.children[i].text = Alloy.Globals.icon.rateFill;
                $.subRatingContainer.children[i].color = "#e65e48";
            }
            for (var i = e.source.count; 5 > i; i++) {
                $.subRatingContainer.children[i].text = Alloy.Globals.icon.rateOutline;
                $.subRatingContainer.children[i].color = "#737373";
            }
            finalRating = e.source.value;
        }
    }
    function sendRating() {
        $.done.touchEnabled = false;
        var url = Alloy.Globals.commonUrl.review;
        var data = {
            productID: productId,
            rating: finalRating
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
                $.ratingIcon.text = "    ";
                rateCountText = "";
            } else if (e.data.reviewpercentage > 20 && e.data.reviewpercentage <= 40) {
                $.ratingIcon.text = "    ";
                rateCountText = " ";
            } else if (e.data.reviewpercentage > 40 && e.data.reviewpercentage <= 60) {
                $.ratingIcon.text = "    ";
                rateCountText = "  ";
            } else if (e.data.reviewpercentage > 60 && e.data.reviewpercentage <= 80) {
                $.ratingIcon.text = "    ";
                rateCountText = "   ";
            } else {
                $.ratingIcon.text = "    ";
                rateCountText = "    ";
            }
            setTimeout(function() {
                hideShowView($.ratingContainer);
            }, 1500);
            setTimeout(function() {
                for (var i = 0; 5 > i; i++) {
                    $.subRatingContainer.children[i].text = Alloy.Globals.icon.rateOutline;
                    $.subRatingContainer.children[i].color = "#737373";
                }
            }, 2e3);
            setRateAttribute(rateCountText);
        } catch (ex) {
            Ti.API.info("catch  = " + JSON.stringify(ex));
        }
    }
    function sendRatingErrorCallback(e) {
        $.done.touchEnabled = true;
        showAlert($.ratingContainer, e.message);
        setTimeout(function() {
            hideShowView($.ratingContainer);
        }, 1500);
        setTimeout(function() {
            for (var i = 0; 5 > i; i++) {
                $.subRatingContainer.children[i].text = Alloy.Globals.icon.rateOutline;
                $.subRatingContainer.children[i].color = "#737373";
            }
        }, 2e3);
        Ti.API.info("erroe = " + JSON.stringify(e));
    }
    function hideOverFlowMenu(e) {
        Alloy.Globals.overFlowFlag && "overFlowMenuLbl" != e.source.id && $.header.hideOverFlow();
    }
    function getShopDetails(shopData) {
        showLoader($.estoreDetails);
        var shopData_productid = "", shopData_block = "";
        isNullVal(shopData.Productid) || (shopData_productid = shopData.Productid);
        shopData_block = isNullVal(shopData.block) ? "shop" : shopData.block;
        var url = Alloy.Globals.commonUrl.shopDetail;
        var data = {
            Productid: shopData_productid,
            block: shopData_block
        };
        var requestParams = JSON.stringify(data);
        Alloy.Globals.webServiceCall(url, requestParams, getShopDetailsSuccessCallback, getShopDetailsErrorCallback, "POST", $.estoreDetails);
    }
    function getShopDetailsSuccessCallback(e) {
        !isNullVal(args.type) && !isNullVal(args.category);
        try {
            similarProductsData = "";
            peopleAlsoViewData = "";
            availabledesign_data_count = "";
            $.moreDetailsContainer.design = "";
            $.imageOptionScroll.otherItems = "";
            $.colorOptionScroll.shades = "";
            $.superScroll.scrollTo(0, 0);
            if (isNullVal(e.data.image)) {
                $.blurImage.image = "";
                $.estoreImage.image = "";
                $.preview_image.image = "";
                wallpaperImage = [];
            } else {
                $.estoreImage.image = encodeURI(e.data.image);
                $.blurImage.image = encodeURI(e.data.blur_image);
                $.preview_image.image = encodeURI(e.data.image);
                wallpaperImage = [ encodeURI(e.data.image) ];
            }
            if (isNullVal(e.data.url)) $.shareIcon.shareUrl = ""; else {
                $.shareIcon.shareUrl = e.data.url;
                sharingProductUrl = e.data.url;
            }
            productId = isNullVal(e.data.product_id) ? "" : e.data.product_id;
            if (e.data.wishlistItem) {
                wishFlag = true;
                $.wishIcon.text = Alloy.Globals.icon.setShortlist;
                $.wishIcon.color = "#e65e48";
            } else {
                wishFlag = false;
                $.wishIcon.text = Alloy.Globals.icon.shortlist;
                $.wishIcon.color = "#ffffff";
            }
            addToCartFlag = !!e.data.cartItem;
            if (isNullVal(e.data.product_sku)) {
                $.wishIcon.product_sku = "";
                gaProductSku = "";
            } else {
                $.wishIcon.product_sku = e.data.product_sku;
                gaProductSku = e.data.product_sku;
            }
            if (!isNullVal(e.data.rating)) {
                var rateCountText = "";
                if (e.data.rating <= 20) {
                    $.ratingIcon.text = "    ";
                    rateCountText = "";
                } else if (e.data.rating > 20 && e.data.rating <= 40) {
                    $.ratingIcon.text = "    ";
                    rateCountText = " ";
                } else if (e.data.rating > 40 && e.data.rating <= 60) {
                    $.ratingIcon.text = "    ";
                    rateCountText = "  ";
                } else if (e.data.rating > 60 && e.data.rating <= 80) {
                    $.ratingIcon.text = "    ";
                    rateCountText = "   ";
                } else {
                    $.ratingIcon.text = "    ";
                    rateCountText = "    ";
                }
                setRateAttribute(rateCountText);
            }
            if (isNullVal(e.data.product_name)) $.skuNameLbl.text = ""; else {
                productName = e.data.product_name;
                $.skuNameLbl.text = e.data.product_name.toUpperCase();
            }
            isNullVal(e.data.small_attr_name) ? $.subSkuNameLbl.text = "" : $.subSkuNameLbl.text = e.data.small_attr_name.toUpperCase();
            if (isNullVal(e.data.stock)) $.stockStatus.text = ""; else {
                $.stockStatus.text = e.data.stock;
                if ("In Stock" == e.data.stock) {
                    if (e.data.is_wallpaper) {
                        $.whereToBuy.visible = true;
                        $.SuperSimilarCollection.bottom = "50dp";
                    } else {
                        $.availabilityLbl.visible = true;
                        $.addToBagLbl.visible = true;
                        $.SuperSimilarCollection.bottom = "50dp";
                    }
                    lost_sale = false;
                } else {
                    e.data.is_wallpaper ? $.SuperSimilarCollection.bottom = "50dp" : $.SuperSimilarCollection.bottom = "0dp";
                    $.availabilityLbl.visible = false;
                    $.addToBagLbl.visible = false;
                    lost_sale = true;
                }
            }
            if (isNullVal(e.data.product_price)) {
                $.priceLbl.text = "";
                $.taxLbl.text = "";
            } else {
                var text = " " + e.data.product_price;
                Ti.UI.createAttributedString({
                    text: text,
                    attributes: [ {
                        type: Ti.UI.ATTRIBUTE_FONT,
                        value: {
                            fontSize: 10,
                            fontFamily: "icomoon"
                        },
                        range: [ text.indexOf(" "), " ".length ]
                    } ]
                });
                $.priceLbl.text = Alloy.Globals.icon.currency + e.data.product_price;
                $.taxLbl.text = e.data.product_additional_price_text;
            }
            if (isNullVal(e.data.description)) {
                $.descriptionLbl.text = "";
                $.readMoreLbl.text = "";
                $.readMoreLbl.height = "0dp";
                $.descriptionLbl.top = "0dp";
            } else {
                $.descriptionLbl.text = e.data.description;
                "0dp" == $.descriptionLbl.getTop() && ($.descriptionLbl.top = "15dp");
            }
            if (isNullVal(e.data.washcare_image)) {
                $.ironImage.image = "";
                $.washCareContainer.top = "0dp";
                $.washCareContainer.height = "0dp";
            } else {
                $.ironImage.image = e.data.washcare_image;
                "0dp" == $.washCareContainer.getHeight() && ($.washCareContainer.height = "30dp");
                "0dp" == $.washCareContainer.getTop() && ($.washCareContainer.top = "15dp");
            }
            isNullVal(e.data.bluritems[0]) ? $.imageOptionScroll.blurImages = "" : $.imageOptionScroll.blurImages = e.data.bluritems;
            if (isNullVal(e.data.items[0])) {
                $.imageOptionScroll.otherItems = "";
                $.imageOptionScroll.height = "0dp";
                image_data = "";
            } else {
                "0dp" == $.imageOptionScroll.getHeight() && ($.imageOptionScroll.height = "50dp");
                image_data = e.data.items;
                $.imageOptionScroll.otherItems = e.data.items;
                displayImages();
            }
            if (isNullVal(e.data.availableShades.response[0])) {
                $.colorOptionScroll.shades = "";
                $.colorOptionScroll.height = "0dp";
            } else {
                "0dp" == $.colorOptionScroll.getHeight() && ($.colorOptionScroll.height = "60dp");
                $.colorOptionScroll.shades = e.data.availableShades.response;
                displayAvailableColors();
            }
            if (_.size(e.data.product_attributes) > 0) {
                "0dp" == $.viewMoreDetailsLbl.getHeight() && ($.viewMoreDetailsLbl.height = "35dp");
                $.moreDetailsContainer.design = e.data.product_attributes;
            } else {
                $.moreDetailsContainer.design = "";
                $.viewMoreDetailsLbl.top = "0dp";
                $.viewMoreDetailsLbl.height = "0dp";
            }
            if (e.data.is_wallpaper) {
                $.collectionDetail1.height = "0dp";
                $.collectionDetail1.top = "0dp";
            } else {
                if ((0 == _.size(e.data.tc_collection) || 0 == _.size(e.data.collection_attribute)) && "0dp" == $.collectionDetail1.getHeight()) {
                    $.collectionDetail1.height = Titanium.UI.SIZE;
                    $.collectionDetail1.top = "18dp";
                }
                if (_.size(e.data.collection_attribute) > 0) {
                    "0dp" == $.collectionSeperator.getWidth() && ($.collectionSeperator.width = "1dp");
                    false == $.collectionSubDetail.getVisible() && ($.collectionSubDetail.visible = true);
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
                    if ("0dp" == $.tcCollectionContainer.getWidth()) {
                        $.tcCollectionContainer.width = "35%";
                        $.collectionSeperator.width = "1dp";
                    }
                    $.collectionName.text = e.data.tc_collection.name;
                    $.collectionImage.image = e.data.tc_collection.tccollection_url;
                } else {
                    $.tcCollectionContainer.width = "0dp";
                    $.collectionSeperator.width = "0dp";
                    $.collectionName.text = "";
                    $.collectionImage.image = "";
                }
                if (_.size(e.data.collection_attribute) > 0 && _.size(e.data.tc_collection) > 0) {
                    $.collectionSubDetail.left = "10dp";
                    $.collectionSeperator.left = "10dp";
                }
                if (0 == _.size(e.data.tc_collection) && 0 == _.size(e.data.collection_attribute)) {
                    $.collectionDetail1.height = "0dp";
                    $.collectionDetail1.top = "0dp";
                }
            }
            if (isNullVal(e.data.alsoAvialableAs_data.response[0])) {
                availabledesign_data_count = "";
                $.availableDesignScroll.top = "0dp";
                $.availableDesigLbl.top = "0dp";
                $.availableDesigLbl.text = "";
                $.availableDesignScroll.height = "0dp";
                $.pageControlContainer.visible = false;
            } else {
                "wallpaper" == args.product ? $.availableDesigLbl.text = "AVAILABLE DESIGNS" : $.availableDesigLbl.text = "ALSO AVAILABLE AS";
                "0dp" == $.availableDesignScroll.getHeight() && ($.availableDesignScroll.height = parseInt(designWidth + 20));
                "false" == $.pageControlContainer.getVisible() && ($.pageControlContainer.visible = true);
                availabledesign_data_count = e.data.alsoAvialableAs_data.total_count;
                showAvailableDesign(e.data.alsoAvialableAs_data.response);
            }
            if (isNullVal(e.data.similarProducts_data.response[0])) {
                similarProductsData = "";
                similarProductsDataCount = "";
                $.similarCollectionContainer.height = "0dp";
                $.listSeperator.height = "0dp";
            } else {
                if ("0dp" == $.similarCollectionContainer.getHeight()) {
                    $.similarCollectionContainer.height = Titanium.UI.SIZE;
                    $.listSeperator.height = "1dp";
                }
                similarProductsData = e.data.similarProducts_data.response;
                similarProductsDataCount = e.data.similarProducts_data.total_count;
            }
            if (isNullVal(e.data.peopleAlsoViewed_data.response[0])) {
                peopleAlsoViewData = "";
                peopleAlsoViewDataCount = "";
                $.alsoViewCollectionContainer.height = "0dp";
                $.listSeperator.height = "0dp";
            } else {
                if ("0dp" == $.alsoViewCollectionContainer.getHeight()) {
                    $.alsoViewCollectionContainer.height = Titanium.UI.SIZE;
                    $.listSeperator.height = "1dp";
                }
                peopleAlsoViewData = e.data.peopleAlsoViewed_data.response;
                peopleAlsoViewDataCount = e.data.peopleAlsoViewed_data.total_count;
            }
            hideLoader($.estoreDetails);
            gaShortlistProduct = productName + "(" + gaProductSku + ")";
            gaAddToCartProduct = {};
            gaAddToCartProduct = {
                name: productName,
                sku: gaProductSku,
                shortlistFlag: wishFlag
            };
            gaShortlistProductArray = {
                name: productName,
                sku: gaProductSku,
                lostSale: lost_sale
            };
            googleAnalyticsDetail(gaShortlistProduct);
        } catch (ex) {
            hideLoader($.estoreDetails);
            Ti.API.info("ex= catch" + JSON.stringify(ex));
        }
    }
    function getShopDetailsErrorCallback(e) {
        hideLoader($.estoreDetails);
        Ti.API.info("error = " + e);
    }
    function displayAvailableColors() {
        var myCounter = 0;
        _.each($.colorOptionScroll.children, function(view, key) {
            $.colorOptionScroll.remove(view);
        });
        _.each($.colorOptionScroll.shades, function(value, k) {
            selectedView[value.product_id] = Ti.UI.createView({
                width: "44dp",
                height: "44dp",
                left: "8dp",
                id: value.product_id,
                productID: value.product_id,
                type: "fabricsColor",
                borderColor: "transparent"
            });
            colorView = Ti.UI.createImageView({
                width: "35dp",
                height: "35dp",
                id: k,
                touchEnabled: false,
                defaultImage: "/images/default_logo.png",
                image: encodeURI(value.color_image),
                backgroundColor: "#f4f4f4"
            });
            selectedView[value.product_id].add(colorView);
            $.colorOptionScroll.add(selectedView[value.product_id]);
            value.product_id == productId && (myCounter = k);
        });
        selectedView[productId].backgroundColor = "#cccccc";
        var pointDP = 49 * myCounter;
        var pointPX = measurement.dpToPX(pointDP);
        $.colorOptionScroll.scrollTo(pointPX, 0);
    }
    function displayImages() {
        var subImageContainer = [];
        var otherImage = [];
        _.each($.imageOptionScroll.children, function(view, key) {
            $.imageOptionScroll.remove(view);
        });
        _.each($.imageOptionScroll.otherItems, function(value, k) {
            selectedImage[k] = Ti.UI.createView({
                width: "59dp",
                height: "39dp",
                left: "5dp",
                id: k,
                type: "fabricsColor",
                borderColor: "transparent"
            });
            subImageContainer[k] = Ti.UI.createView({
                width: "55dp",
                height: "35dp",
                backgroundColor: "#e6e6e6",
                id: k,
                type: "fabricsColor"
            });
            otherImage[k] = Ti.UI.createImageView({
                id: k,
                touchEnabled: false,
                defaultImage: "/images/default_logo.png",
                image: encodeURI(value),
                backgroundColor: "#f4f4f4"
            });
            subImageContainer[k].add(otherImage[k]);
            selectedImage[k].add(subImageContainer[k]);
            $.imageOptionScroll.add(selectedImage[k]);
        });
        _.each($.imageOptionScroll.blurImages, function(value, k) {
            otherImage[k].blurImage = value;
        });
    }
    function collectionSubDetails(collection_attributes_data) {
        $.collectionSubDetail.removeAllChildren();
        var detailsContainer = Ti.UI.createView({
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE,
            layout: "vertical"
        });
        _.each(collection_attributes_data, function(value, k) {
            var headingLbl = Ti.UI.createLabel({
                left: "0dp",
                top: "0dp",
                bottom: "10dp",
                height: Ti.UI.SIZE,
                width: Ti.UI.SIZE,
                font: {
                    fontSize: "9dp",
                    fontFamily: "futura_lt_bt_light-webfont",
                    fontWeight: "bold"
                },
                color: "#333333",
                text: k.toUpperCase()
            });
            detailsContainer.add(headingLbl);
            _.each(value, function(v, key) {
                var subDetailsContainer = Ti.UI.createView({
                    height: Ti.UI.SIZE,
                    width: Ti.UI.FILL,
                    left: "0dp",
                    top: "7dp",
                    layout: "horizontal"
                });
                var label1 = Ti.UI.createLabel({
                    left: "0dp",
                    height: Ti.UI.SIZE,
                    width: "45%",
                    font: {
                        fontSize: "9dp",
                        fontFamily: "futura_lt_bt_light-webfont"
                    },
                    color: "#333333",
                    text: key.toUpperCase(),
                    top: "0dp"
                });
                subDetailsContainer.add(label1);
                var dotLabel = Ti.UI.createLabel({
                    left: "0dp",
                    height: Ti.UI.SIZE,
                    color: "#333333",
                    text: ":",
                    font: {
                        fontSize: "12dp",
                        fontFamily: "futura_medium_bt-webfont"
                    },
                    verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
                    top: "-2dp"
                });
                subDetailsContainer.add(dotLabel);
                var label2 = Ti.UI.createLabel({
                    left: "5dp",
                    height: Ti.UI.SIZE,
                    width: "50%",
                    font: {
                        fontSize: "9dp",
                        fontFamily: "futura_medium_bt-webfont"
                    },
                    color: "#333333",
                    text: false != v && null != v ? v.toUpperCase() : "NA",
                    top: "0dp"
                });
                subDetailsContainer.add(label2);
                detailsContainer.add(subDetailsContainer);
            });
        });
        $.collectionSubDetail.add(detailsContainer);
    }
    function moreDetailsEffect(e) {
        var detailsContainer = Ti.UI.createView({
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE,
            layout: "vertical"
        });
        _.each($.moreDetailsContainer.design, function(value, k) {
            var headingLbl = Ti.UI.createLabel({
                left: "0dp",
                top: "20dp",
                bottom: "10dp",
                height: Ti.UI.SIZE,
                width: Ti.UI.SIZE,
                font: {
                    fontSize: "11sp",
                    fontFamily: "futura_lt_bt_light-webfont",
                    fontWeight: "bold"
                },
                color: "#333333",
                text: k.toUpperCase()
            });
            detailsContainer.add(headingLbl);
            _.each(value, function(v, key) {
                var subDetailsContainer = Ti.UI.createView({
                    height: Ti.UI.SIZE,
                    width: Ti.UI.FILL,
                    left: "0dp",
                    top: "11dp",
                    layout: "horizontal"
                });
                var label1 = Ti.UI.createLabel({
                    left: "0dp",
                    height: Ti.UI.SIZE,
                    width: "40%",
                    font: {
                        fontSize: "11dp",
                        fontFamily: "futura_lt_bt_light-webfont"
                    },
                    color: "#333333",
                    text: key.toUpperCase(),
                    top: "0dp"
                });
                subDetailsContainer.add(label1);
                var dotLabel = Ti.UI.createLabel({
                    left: "0dp",
                    height: Ti.UI.SIZE,
                    color: "#333333",
                    text: ":",
                    font: {
                        fontSize: "12dp",
                        fontFamily: "futura_medium_bt-webfont"
                    },
                    verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
                    top: "-2dp"
                });
                subDetailsContainer.add(dotLabel);
                var label2 = Ti.UI.createLabel({
                    left: "5dp",
                    height: Ti.UI.SIZE,
                    width: "50%",
                    font: {
                        fontSize: "11dp",
                        fontFamily: "futura_medium_bt-webfont"
                    },
                    color: "#333333",
                    text: false != v && null != v ? v.toUpperCase() : "NA",
                    top: "0dp"
                });
                subDetailsContainer.add(label2);
                detailsContainer.add(subDetailsContainer);
            });
        });
        switch (e.source.id) {
          case "moreDetailsContainer":
            if (1 == e.source.children.length) {
                $.viewMoreDetailsLbl.text = "Hide details";
                e.source.add(detailsContainer);
            } else {
                $.viewMoreDetailsLbl.text = "View more details";
                e.source.remove(e.source.children[1]);
                e.source.children[1] = null;
            }
        }
    }
    function showAvailableDesign(availableProducts) {
        var image = [];
        var gradientView = [];
        var designContainer = [];
        var designLbl = [];
        var arrayViews = $.availableDesignScroll.getViews();
        $.availableDesignScroll.scrollToView(0);
        0 != arrayViews.length && _.each(arrayViews, function(view, key) {
            $.availableDesignScroll.removeView(view);
        });
        var data = "";
        var size = 4;
        var availableDesignDataArr = [];
        var myDataArrCounter = 0;
        for (var i = 0; i < availableProducts.length; i += size) {
            var smallPaginationArray = availableProducts.slice(i, i + size);
            availableDesignDataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallPaginationArray));
            myDataArrCounter++;
        }
        var subAvailableDesignData = "{" + availableDesignDataArr + "}";
        var finalAvailableDesignData = JSON.parse(subAvailableDesignData);
        data = finalAvailableDesignData;
        _.each(data, function(value, k) {
            imageContainerArr[k] = Ti.UI.createView({
                width: Titanium.UI.FILL,
                left: "0dp",
                height: Titanium.UI.FILL,
                backgroundColor: "#ffffff",
                layout: "horizontal"
            });
            _.each(data["" + k], function(value, i) {
                if (!isNullVal(args.product)) if ("wallpaper" == args.product) {
                    image[i] = Ti.UI.createImageView({
                        width: designWidth,
                        height: designWidth,
                        top: "10dp",
                        left: "10dp",
                        id: value.product_id,
                        type: "availableDesign",
                        defaultImage: "/images/default_logo.png",
                        image: encodeURI(value.image)
                    });
                    imageContainerArr[k].add(image[i]);
                } else {
                    designContainer[i] = Ti.UI.createView({
                        width: designWidth,
                        height: designWidth,
                        top: "10dp",
                        left: "10dp",
                        type: "availableDesign",
                        id: value.product_id
                    });
                    imageContainerArr[k].add(designContainer[i]);
                    image[i] = Ti.UI.createImageView({
                        width: designWidth,
                        height: designWidth,
                        defaultImage: "/images/default_logo.png",
                        image: encodeURI(value.image),
                        touchEnabled: false
                    });
                    designContainer[i].add(image[i]);
                    gradientView[i] = Ti.UI.createView({
                        width: Ti.UI.FILL,
                        touchEnabled: false,
                        height: Ti.UI.FILL,
                        backgroundGradient: {
                            type: "linear",
                            colors: [ {
                                color: "#cc000000",
                                position: 0
                            }, {
                                color: "transparent",
                                position: 1
                            } ],
                            startPoint: {
                                x: "0",
                                y: "100%"
                            },
                            endPoint: {
                                x: "0",
                                y: "70%"
                            },
                            backFillStart: false
                        }
                    });
                    designContainer[i].add(gradientView[i]);
                    var design_lbl = value.category_name;
                    designLbl[i] = Ti.UI.createLabel({
                        left: "5dp",
                        width: "90%",
                        font: {
                            fontSize: "8dp",
                            fontFamily: "futura_medium_bt-webfont"
                        },
                        color: "#ffffff",
                        text: design_lbl.toUpperCase(),
                        bottom: "5dp",
                        touchEnabled: false
                    });
                    designContainer[i].add(designLbl[i]);
                }
            });
            if (availabledesign_data_count > 11) {
                var viewAllOption = Ti.UI.createLabel({
                    width: designWidth,
                    height: designWidth,
                    top: "10dp",
                    left: "10dp",
                    color: "#e65e48",
                    textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                    font: {
                        fontSize: "10dp",
                        fontFamily: "futura_medium_bt-webfont"
                    },
                    text: "VIEW ALL",
                    product_id: productId,
                    backgroundColor: "#f4f4f4"
                });
                imageContainerArr[k].add(viewAllOption);
            }
            $.availableDesignScroll.addView(imageContainerArr[k]);
        });
        $.pageControlContainer.removeAllChildren();
        availabledesign_data_count > 4 && $.pageControlContainer.add(PagingControl($.availableDesignScroll));
    }
    function productToggleEffect(e) {
        switch (e.source.id) {
          case "similarCollectionContainer":
            if (1 == e.source.children.length) {
                setSimilarData(similarProductsData, "similarproducts", similarProductsDataCount);
                e.source.add(gridListContainer);
                e.source.children[0].children[1].text = Alloy.Globals.icon.dropDown;
                $.superScroll.scrollToBottom();
            } else {
                e.source.children[0].children[1].text = Alloy.Globals.icon.downArrow;
                e.source.remove(e.source.children[1]);
                e.source.children[1] = null;
                $.listSeperator.top = "0dp";
            }
            break;

          case "alsoViewCollectionContainer":
            if (1 == e.source.children.length) {
                setSimilarData(peopleAlsoViewData, "peoplealsoviewed", peopleAlsoViewDataCount);
                e.source.add(gridListContainer);
                e.source.children[0].children[1].text = Alloy.Globals.icon.dropDown;
                $.superScroll.scrollToBottom();
            } else {
                e.source.children[0].children[1].text = Alloy.Globals.icon.downArrow;
                e.source.remove(e.source.children[1]);
                e.source.children[1] = null;
            }
        }
        if ("wishLbl" == e.source.id) isNullVal(Ti.App.Properties.getString("access_token")) ? Alloy.Globals.addWindowInNav("signIn", {
            listObject: e.source,
            listViewReference: addToShortlist
        }) : "" == e.source.text ? removeWishlist(e.source) : addToShortlist(e.source); else if ("cart" == e.source.id) isNullVal(args.product) || "wallpaper" != args.product && (isNullVal(Ti.App.Properties.getString("access_token")) ? Alloy.Globals.addWindowInNav("signIn", {
            listObject: e.source,
            listViewReference: addToCart
        }) : addToCart(e.source)); else if ("shareLbl" == e.source.id) shareImage(e.source.shareUrl); else if (e.source.productId) {
            closeOtherViews();
            var data = {
                Productid: e.source.productId,
                block: "shop"
            };
            getShopDetails(data);
        }
    }
    function setSimilarData(similarCollectionData, slider, count) {
        gridListContainer = Ti.UI.createView({
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE,
            top: "40dp",
            layout: "vertical"
        });
        var mainContainer = Ti.UI.createView({
            width: parseInt(Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor - 20),
            borderColor: "transparent"
        });
        $.addClass(mainContainer, "mainContainer");
        gridListContainer.add(mainContainer);
        if (count > 2) {
            viewAll = Ti.UI.createLabel({
                top: "10dp",
                bottom: "10dp",
                width: parseInt(Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor - 10),
                height: "35dp",
                font: {
                    fontSize: "12sp"
                },
                color: "#333333",
                backgroundColor: "#f4f4f4",
                text: "VIEW ALL",
                block: "shop",
                slider: slider,
                productID: productId,
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
            });
            gridListContainer.add(viewAll);
            touchEffect.createTouchEffect(viewAll, "#a6333333", "#333333");
            viewAll.addEventListener("click", function(e) {
                if (!isNullVal(_args.product)) if ("wallpaper" == _args.product) var args_ = {
                    block: e.source.block,
                    slider: e.source.slider,
                    productID: e.source.productID,
                    navigatedblockid: "",
                    type: "wallpaper"
                }; else var args_ = {
                    block: e.source.block,
                    slider: e.source.slider,
                    productID: e.source.productID,
                    navigatedblockid: "",
                    type: "shop"
                };
                Alloy.Globals.addWindowInNav("otherListingPage", args_);
            });
        }
        _.each(similarCollectionData, function(value, k) {
            var product1 = Ti.UI.createView({
                left: "0dp",
                top: "0dp",
                productId: value.product_id,
                width: Alloy.Globals.imageWidth + 5
            });
            1 == k && (product1.left = "10dp");
            $.addClass(product1, "productContainer");
            mainContainer.add(product1);
            var imageContainer = Ti.UI.createView();
            $.addClass(imageContainer, "cartImageContainer");
            product1.add(imageContainer);
            var defaultImage = Ti.UI.createLabel({
                font: {
                    fontSize: "35dp",
                    fontFamily: "icomoon1"
                },
                color: "#000000",
                zIndex: "-1",
                text: Alloy.Globals.icon.logo
            });
            imageContainer.add(defaultImage);
            var image1 = Ti.UI.createImageView({
                defaultImage: "/images/default_logo.png",
                image: encodeURI(value.image),
                productId: value.product_id,
                productName: value.product_name
            });
            $.addClass(image1, "productImage");
            imageContainer.add(image1);
            var outOfStock = $.UI.create("Label", {
                classes: "fontLight",
                width: Titanium.UI.FILL,
                height: Alloy.Globals.imageWidth,
                top: "0dp",
                backgroundColor: "#BFffffff",
                text: "OUT OF STOCK",
                font: {
                    fontSize: "14dp"
                },
                touchEnabled: false,
                visible: false,
                color: "#000",
                textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
            });
            imageContainer.add(outOfStock);
            var cartIcon = Ti.UI.createLabel({
                font: {
                    fontSize: "20dp",
                    fontFamily: "icomoon"
                },
                width: "35dp",
                height: "35dp",
                backgroundColor: value.cartItem ? "#e65e48" : "#66000000",
                borderColor: value.cartItem ? "#e65e48" : "#66000000",
                borderRadius: 18,
                textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                bottom: "10dp",
                right: "10dp",
                id: "cart",
                text: "wallpaper" != args.product ? value.cartItem ? Alloy.Globals.icon.bag : Alloy.Globals.icon.bag : "",
                productId: value.product_id,
                productSku: value.product_sku,
                productName: value.product_name,
                shortlistFlag: value.wishlistItem,
                customId: k
            });
            imageContainer.add(cartIcon);
            if (!isNullVal(args.product)) if ("shop" == args.product || "shopProduct" == args.product) {
                if (!value.in_stock) {
                    outOfStock.setVisible(true);
                    cartIcon.setVisible(false);
                }
            } else cartIcon.setVisible(false);
            var shareContainer = Ti.UI.createView();
            $.addClass(shareContainer, "shareContainer");
            product1.add(shareContainer);
            var nameContainer = Ti.UI.createView();
            $.addClass(nameContainer, "nameContainer");
            shareContainer.add(nameContainer);
            var productName1 = Ti.UI.createLabel({
                text: value.product_name,
                productId: value.product_id,
                productName: value.product_name
            });
            $.addClass(productName1, "name");
            nameContainer.add(productName1);
            var productSize1 = Ti.UI.createLabel({
                text: "wallpaper" != args.product ? "NA" == value.product_size ? "" : value.product_size : "",
                productId: value.product_id,
                productName: value.product_name
            });
            $.addClass(productSize1, "productSizeClass");
            "wallpaper" != args.product && "NA" != value.product_size && nameContainer.add(productSize1);
            var wheretoBuy1 = Ti.UI.createLabel({
                text: Alloy.Globals.icon.currency + value.product_price,
                productId: value.product_id,
                productName: value.product_name,
                bottom: "10dp"
            });
            $.addClass(wheretoBuy1, "whereBye");
            nameContainer.add(wheretoBuy1);
            var shareIcon1 = Ti.UI.createLabel({
                right: "35dp",
                color: "#a6a6a6",
                font: {
                    fontSize: "18dp",
                    fontFamily: "icomoon"
                },
                top: "5dp",
                width: "35dp",
                height: "35dp",
                textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
                verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
                text: Alloy.Globals.icon.share,
                productId: value.product_id,
                productName: value.product_name,
                id: "shareLbl",
                shareUrl: value.url
            });
            shareContainer.add(shareIcon1);
            wishIcon1[k] = Ti.UI.createLabel({
                right: "3dp",
                color: value.wishlistItem ? "#e65e48" : "#a6a6a6",
                font: {
                    fontSize: "18dp",
                    fontFamily: "icomoon"
                },
                top: "5dp",
                width: "35dp",
                height: "35dp",
                value: value.wishlistItem,
                textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
                verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
                text: value.wishlistItem ? Alloy.Globals.icon.setShortlist : Alloy.Globals.icon.shortlist,
                productId: value.product_id,
                productSku: value.product_sku,
                lostSale: value.in_stock,
                productName: value.product_name,
                id: "wishLbl"
            });
            shareContainer.add(wishIcon1[k]);
        });
    }
    function closeOtherViews() {
        if (1 != $.similarCollectionContainer.children.length) {
            $.similarCollectionContainer.children[0].children[1].text = Alloy.Globals.icon.downArrow;
            $.similarCollectionContainer.remove($.similarCollectionContainer.children[1]);
            $.similarCollectionContainer.children[1] = null;
            $.listSeperator.top = "0dp";
        }
        if (1 != $.alsoViewCollectionContainer.children.length) {
            $.alsoViewCollectionContainer.children[0].children[1].text = Alloy.Globals.icon.downArrow;
            $.alsoViewCollectionContainer.remove($.alsoViewCollectionContainer.children[1]);
            $.alsoViewCollectionContainer.children[1] = null;
        }
        if (1 != $.moreDetailsContainer.children.length) {
            $.viewMoreDetailsLbl.text = "View more details";
            $.moreDetailsContainer.remove($.moreDetailsContainer.children[1]);
            $.moreDetailsContainer.children[1] = null;
        }
        $.ratingIcon.text = "    ";
    }
    function checkshortlistItem(e) {
        "" == e.source.text ? removeWishlist() : addToShortlist();
    }
    function addToShortlist(pId) {
        if (isNullVal(Ti.App.Properties.getString("access_token"))) {
            var wishProductData = {};
            wishProductData = {
                productId: product_id || productId
            };
            Alloy.Globals.addWindowInNav("signIn", {
                listObject: wishProductData,
                listViewReference: addToShortlist
            });
        } else {
            var product_id;
            shortlistData = "";
            if (pId) {
                pId.productId && (product_id = pId.productId);
                shortlistData = pId;
                Ti.API.info("pId == = = = = =" + JSON.stringify(pId));
                gaShortlistProductArray = {
                    name: shortlistData.productName,
                    sku: shortlistData.productSku,
                    lostSale: !(0 != shortlistData.lostSale)
                };
                if (!pId.id) {
                    $.wishIcon.text = Alloy.Globals.icon.setShortlist;
                    $.wishIcon.color = "#e65e48";
                }
            } else {
                product_id = productId;
                gaShortlistProductArray = {
                    name: productName,
                    sku: gaProductSku,
                    lostSale: lost_sale
                };
            }
            if (0 != _.size(shortlistData)) {
                Ti.API.info("inside if");
                shortlistData.text = Alloy.Globals.icon.setShortlist;
                shortlistData.color = "#e65e48";
            } else {
                $.wishIcon.text = Alloy.Globals.icon.setShortlist;
                $.wishIcon.color = "#e65e48";
            }
            var url = Alloy.Globals.commonUrl.addToShortlist;
            var data = {
                product_id: product_id
            };
            var requestParams = JSON.stringify(data);
            Alloy.Globals.webServiceCall(url, requestParams, addToShortlistSuccessCallback, addToShortlistErrorCallback, "POST", $.estoreDetails);
        }
    }
    function addToShortlistSuccessCallback(e) {
        try {
            showAlert($.estoreDetails, e.message);
            googleAnalyticsShortlist(gaShortlistProductArray, "ESTORE DETAIL PAGE");
            isNullVal(args.listObject) ? Ti.API.info("inside else") : args.listViewReference(args.listObject, "add");
        } catch (ex) {
            Ti.API.info("catch = " + ex.message);
        }
    }
    function addToShortlistErrorCallback(e) {
        showAlert($.estoreDetails, e.message);
        if (0 != _.size(shortlistData)) {
            shortlistData.text = Alloy.Globals.icon.shortlist;
            shortlistData.color = "#a6a6a6";
        } else {
            $.wishIcon.text = Alloy.Globals.icon.shortlist;
            $.wishIcon.color = "#ffffff";
        }
    }
    function removeWishlist(wishData) {
        if (wishData) {
            isNullVal(wishData.productId) || (product_id = wishData.productId);
            shortlistData = wishData;
        } else product_id = productId;
        if (isNullVal(wishData)) {
            $.wishIcon.text = Alloy.Globals.icon.shortlist;
            $.wishIcon.color = "#ffffff";
        } else {
            shortlistData.text = Alloy.Globals.icon.shortlist;
            shortlistData.color = "#a6a6a6";
        }
        var url = Alloy.Globals.commonUrl.removeShortlist;
        var data = {
            product_id: product_id
        };
        var requestParams = JSON.stringify(data);
        Alloy.Globals.webServiceCall(url, requestParams, removeShortlistProductSuccessCallback, removeShortlistProductErrorCallback, "POST", $.estoreDetails);
    }
    function removeShortlistProductSuccessCallback(e) {
        try {
            showAlert($.estoreDetails, e.message);
            isNullVal(args.listObject) || args.listViewReference(args.listObject, "remove");
        } catch (ex) {
            Ti.API.info("catch = " + ex.message);
        }
    }
    function removeShortlistProductErrorCallback(e) {
        showAlert($.estoreDetails, e.message);
        if (0 != _.size(shortlistData)) {
            shortlistData.text = Alloy.Globals.icon.setShortlist;
            shortlistData.color = "#e65e48";
        } else {
            $.wishIcon.text = Alloy.Globals.icon.setShortlist;
            $.wishIcon.color = "#e65e48";
        }
    }
    function addToCart(cartId) {
        if (isNullVal(Ti.App.Properties.getString("access_token"))) {
            var cartProductData = {};
            cartProductData = {
                productId: cart_product_id
            };
            Alloy.Globals.addWindowInNav("signIn", {
                listObject: cartProductData,
                listViewReference: addToCart
            });
        } else {
            var cart_product_id;
            cartData = "";
            if (isNullVal(cartId.productId)) {
                cart_product_id = productId;
                gaAddToCartProduct = {
                    name: productName,
                    sku: gaProductSku,
                    shortlistFlag: !("#e65e48" != $.wishIcon.color)
                };
            } else {
                cart_product_id = cartId.productId;
                cartData = cartId;
                gaAddToCartProduct = {
                    name: cartData.productName,
                    sku: cartData.productSku,
                    shortlistFlag: "0" == cartId.customId ? !("#e65e48" != wishIcon1[0].color) : !("#e65e48" != wishIcon1[1].color)
                };
            }
            var url = Alloy.Globals.commonUrl.addToCart;
            var data = {
                product_id: cart_product_id,
                qty: 1
            };
            var requestParams = JSON.stringify(data);
            Alloy.Globals.webServiceCall(url, requestParams, addToCartSuccessCallback, addToCartErrorCallback, "POST", $.estoreDetails);
        }
    }
    function addToCartSuccessCallback(e) {
        try {
            if (0 != _.size(cartData)) {
                cartData.setBackgroundColor("#e65e48");
                cartData.setBorderColor("#e65e48");
            }
            Ti.App.Properties.setString("quote_id", e.data[0].quote_id);
            Ti.App.Properties.setString("cartCount", e.data[0].count);
            var cartDataArray = [];
            cartDataArray = Titanium.App.Properties.getList("cartProductIdArray");
            Ti.API.info("cartDataArray = " + cartDataArray);
            -1 == cartDataArray.indexOf(e.data[0].product_id) && cartDataArray.push(e.data[0].product_id);
            Titanium.App.Properties.setList("cartProductIdArray", cartDataArray);
            Ti.API.info("Titanium.App.Properties.getObject() = " + Titanium.App.Properties.getList("cartProductIdArray"));
            googleAnalyticsBag(gaAddToCartProduct);
            $.header.updateCartCount();
            showAlert($.estoreDetails, e.message);
            if (!isNullVal(args.listObject)) {
                -1 != args.listObject.bindId.toString().lastIndexOf("1") ? args.listObject.bindId = "gridCart1" : -1 != args.listObject.bindId.toString().lastIndexOf("2") && (args.listObject.bindId = "gridCart2");
                args.listViewReference(args.listObject, e.data[0].product_id);
            }
        } catch (ex) {
            Ti.API.info("ex.message = " + ex.message);
        }
    }
    function addToCartErrorCallback(e) {
        showAlert($.estoreDetails, e.message);
    }
    function navigateToStoreLocater() {
        if (!isNullVal(args.product)) if ("wallpaper" == args.product) Alloy.Globals.addWindowInNav("findStore"); else {
            var obj = {};
            obj.type = "bedding";
            Alloy.Globals.addWindowInNav("findStore", obj);
        }
        generateLead(gaShortlistProductArray, "ESTORE DETAIL PAGE");
    }
    function goToBack() {
        if ($.ratingContainer.visible) hideShowView($.ratingContainer); else if ("imagePreview" == previewImage.type) {
            hideShowView(previewImage);
            previewImage = "";
        } else {
            $.estoreDetails.removeEventListener("click", hideOverFlowMenu);
            $.subRatingContainer.removeEventListener("click", rating);
            $.estimateDateLbl.removeEventListener("click", estimateDate);
            $.availabilityLbl.removeEventListener("click", checkAvailability);
            $.superScroll.removeEventListener("scroll", upArrowEffect);
            $.upArrowLbl.removeEventListener("click", scrollToEffect);
            $.moreDetailsContainer.removeEventListener("click", moreDetailsEffect);
            $.SuperSimilarCollection.removeEventListener("click", productToggleEffect);
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
    function setRateAttribute(rateCountText) {
        var text = $.ratingIcon.getText();
        var attr = Ti.UI.createAttributedString({
            text: text,
            attributes: [ {
                type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
                value: "#e65e48",
                range: [ text.indexOf(Alloy.Globals.icon.rateFill), rateCountText.length ]
            } ]
        });
        $.ratingIcon.attributedString = attr;
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "estoreDetails";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.estoreDetails = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_ADJUST_PAN,
        backgroundColor: "#ffffff",
        id: "estoreDetails"
    });
    $.__views.estoreDetails && $.addTopLevelView($.__views.estoreDetails);
    goToBack ? $.addListener($.__views.estoreDetails, "android:back", goToBack) : __defers["$.__views.estoreDetails!android:back!goToBack"] = true;
    updateCount ? $.addListener($.__views.estoreDetails, "focus", updateCount) : __defers["$.__views.estoreDetails!focus!updateCount"] = true;
    destroyWindow ? $.addListener($.__views.estoreDetails, "close", destroyWindow) : __defers["$.__views.estoreDetails!close!destroyWindow"] = true;
    $.__views.header = Alloy.createWidget("headerView", "widget", {
        id: "header",
        __parentSymbol: $.__views.estoreDetails
    });
    $.__views.header.setParent($.__views.estoreDetails);
    $.__views.superScroll = Ti.UI.createScrollView({
        top: "53dp",
        scrollType: "vertical",
        layout: "vertical",
        id: "superScroll"
    });
    $.__views.estoreDetails.add($.__views.superScroll);
    $.__views.__alloyId419 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        borderColor: "transparent",
        borderWidth: "0.0",
        id: "__alloyId419"
    });
    $.__views.superScroll.add($.__views.__alloyId419);
    $.__views.estoreImageScroll = Ti.UI.createScrollView({
        left: "0dp",
        top: "0dp",
        height: "200dp",
        id: "estoreImageScroll",
        touched: false
    });
    $.__views.__alloyId419.add($.__views.estoreImageScroll);
    $.__views.blurImage = Ti.UI.createImageView({
        defaultImage: "/images/default_logo.png",
        id: "blurImage",
        width: "100%",
        height: "200dp",
        zIndex: 2
    });
    $.__views.estoreImageScroll.add($.__views.blurImage);
    $.__views.estoreImage = Ti.UI.createImageView({
        top: "0dp",
        height: "200dp",
        zIndex: "8",
        id: "estoreImage"
    });
    $.__views.estoreImageScroll.add($.__views.estoreImage);
    $.__views.ratingView = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        bottom: "0dp",
        left: "0dp",
        layout: "vertical",
        borderColor: "transparent",
        borderWidth: "0.0",
        id: "ratingView",
        zIndex: 10
    });
    $.__views.__alloyId419.add($.__views.ratingView);
    $.__views.__alloyId420 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        layout: "vertical",
        bottom: 10,
        id: "__alloyId420"
    });
    $.__views.ratingView.add($.__views.__alloyId420);
    $.__views.ratingLbl = Ti.UI.createLabel({
        top: "0dp",
        left: "10dp",
        text: "RATINGS",
        color: "#ffffff",
        font: {
            fontSize: "10sp",
            fontFamily: "futura_medium_bt-webfont"
        },
        id: "ratingLbl"
    });
    $.__views.__alloyId420.add($.__views.ratingLbl);
    $.__views.ratingIcon = Ti.UI.createLabel({
        top: "6dp",
        left: "10dp",
        text: "    ",
        color: "#fff",
        font: {
            fontSize: "10sp",
            fontFamily: "icomoon"
        },
        id: "ratingIcon"
    });
    $.__views.__alloyId420.add($.__views.ratingIcon);
    $.__views.__alloyId421 = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        bottom: "0dp",
        right: "0dp",
        layout: "vertical",
        borderColor: "transparent",
        borderWidth: "0.0",
        zIndex: 10,
        id: "__alloyId421"
    });
    $.__views.__alloyId419.add($.__views.__alloyId421);
    $.__views.__alloyId422 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        bottom: 5,
        id: "__alloyId422"
    });
    $.__views.__alloyId421.add($.__views.__alloyId422);
    $.__views.wishIcon = Ti.UI.createLabel({
        font: {
            fontSize: "20dp",
            fontFamily: "icomoon"
        },
        top: "10dp",
        width: "35dp",
        height: "35dp",
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        right: "10dp",
        text: Alloy.Globals.icon.shortlist,
        id: "wishIcon"
    });
    $.__views.__alloyId422.add($.__views.wishIcon);
    $.__views.shareIcon = Ti.UI.createLabel({
        font: {
            fontSize: "20dp",
            fontFamily: "icomoon"
        },
        top: "10dp",
        width: "35dp",
        height: "35dp",
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        right: "50dp",
        text: Alloy.Globals.icon.share,
        id: "shareIcon"
    });
    $.__views.__alloyId422.add($.__views.shareIcon);
    $.__views.__alloyId423 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        backgroundGradient: {
            type: "linear",
            colors: [ {
                color: "#cc000000",
                position: 0
            }, {
                color: "transparent",
                position: 1
            } ],
            startPoint: {
                x: "0",
                y: "100%"
            },
            endPoint: {
                x: "0",
                y: "80%"
            },
            backFillStart: false
        },
        touchEnabled: false,
        height: "200dp",
        id: "__alloyId423"
    });
    $.__views.__alloyId419.add($.__views.__alloyId423);
    $.__views.imageOptionScroll = Ti.UI.createScrollView({
        width: Titanium.UI.FILL,
        height: "50dp",
        layout: "horizontal",
        scrollType: "horizontal",
        backgroundColor: "#333333",
        id: "imageOptionScroll"
    });
    $.__views.superScroll.add($.__views.imageOptionScroll);
    $.__views.colorOptionScroll = Ti.UI.createScrollView({
        width: Titanium.UI.FILL,
        height: "60dp",
        layout: "horizontal",
        scrollType: "horizontal",
        backgroundColor: "#a6f2f2f2",
        id: "colorOptionScroll"
    });
    $.__views.superScroll.add($.__views.colorOptionScroll);
    $.__views.__alloyId424 = Ti.UI.createView({
        height: "0.5dp",
        width: Titanium.UI.FILL,
        backgroundColor: "#999999",
        id: "__alloyId424"
    });
    $.__views.superScroll.add($.__views.__alloyId424);
    $.__views.__alloyId425 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        left: "10dp",
        right: "10dp",
        height: Titanium.UI.SIZE,
        top: "25dp",
        id: "__alloyId425"
    });
    $.__views.superScroll.add($.__views.__alloyId425);
    $.__views.__alloyId426 = Ti.UI.createView({
        left: "0dp",
        top: "0dp",
        width: "65%",
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId426"
    });
    $.__views.__alloyId425.add($.__views.__alloyId426);
    $.__views.skuNameLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "25dp"
        },
        color: "#000000",
        top: "0dp",
        left: "0dp",
        width: Titanium.UI.FILL,
        id: "skuNameLbl"
    });
    $.__views.__alloyId426.add($.__views.skuNameLbl);
    $.__views.subSkuNameLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "futura-hv-bt-heavy",
            fontSize: "10dp"
        },
        color: "#333333",
        left: "0dp",
        top: "8dp",
        id: "subSkuNameLbl"
    });
    $.__views.__alloyId426.add($.__views.subSkuNameLbl);
    $.__views.__alloyId427 = Ti.UI.createView({
        right: "0dp",
        top: "0dp",
        width: "38%",
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId427"
    });
    $.__views.__alloyId425.add($.__views.__alloyId427);
    $.__views.priceLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "futura-hv-bt-heavy",
            fontSize: "14dp"
        },
        color: "#e65e48",
        top: "0dp",
        right: "0dp",
        width: Titanium.UI.FILL,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        id: "priceLbl"
    });
    $.__views.__alloyId427.add($.__views.priceLbl);
    $.__views.taxLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "futura-hv-bt-heavy",
            fontSize: "7dp"
        },
        color: "#333333",
        right: "0dp",
        top: "4dp",
        text: "+TAX",
        id: "taxLbl"
    });
    $.__views.__alloyId427.add($.__views.taxLbl);
    $.__views.collectionDetail1 = Ti.UI.createScrollView({
        height: Ti.UI.SIZE,
        contentWidth: Ti.UI.FILL,
        top: "18dp",
        left: "10dp",
        right: "10dp",
        layout: "horizontal",
        id: "collectionDetail1",
        scrollType: "vertical",
        scrollingEnabled: false
    });
    $.__views.superScroll.add($.__views.collectionDetail1);
    $.__views.tcCollectionContainer = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        top: "0dp",
        left: "0dp",
        layout: "vertical",
        id: "tcCollectionContainer",
        width: "35%"
    });
    $.__views.collectionDetail1.add($.__views.tcCollectionContainer);
    $.__views.collectionName = Ti.UI.createLabel({
        left: "0dp",
        top: "0dp",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        font: {
            fontSize: "9dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        id: "collectionName"
    });
    $.__views.tcCollectionContainer.add($.__views.collectionName);
    $.__views.collectionImage = Ti.UI.createImageView({
        top: "10dp",
        width: Titanium.UI.FILL,
        height: "60dp",
        left: "0dp",
        id: "collectionImage"
    });
    $.__views.tcCollectionContainer.add($.__views.collectionImage);
    $.__views.collectionSeperator = Ti.UI.createView({
        left: "10dp",
        height: "80dp",
        width: "1dp",
        backgroundColor: "#cccccc",
        top: "0dp",
        id: "collectionSeperator"
    });
    $.__views.collectionDetail1.add($.__views.collectionSeperator);
    $.__views.collectionSubDetail = Ti.UI.createView({
        top: "0dp",
        left: "10dp",
        height: Titanium.UI.SIZE,
        width: "55%",
        id: "collectionSubDetail"
    });
    $.__views.collectionDetail1.add($.__views.collectionSubDetail);
    $.__views.moreDetailsContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "18dp",
        left: "10dp",
        right: "10dp",
        layout: "vertical",
        id: "moreDetailsContainer"
    });
    $.__views.superScroll.add($.__views.moreDetailsContainer);
    $.__views.viewMoreDetailsLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "15dp"
        },
        top: "0dp",
        left: "0dp",
        height: "35dp",
        width: Titanium.UI.FILL,
        color: "#e65e48",
        touchEnabled: false,
        text: "View more details",
        id: "viewMoreDetailsLbl"
    });
    $.__views.moreDetailsContainer.add($.__views.viewMoreDetailsLbl);
    $.__views.descriptionLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "12dp"
        },
        top: "15dp",
        color: "#555555",
        width: Titanium.UI.FILL,
        left: "10dp",
        right: "10dp",
        maxLines: "3",
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
        id: "descriptionLbl"
    });
    $.__views.superScroll.add($.__views.descriptionLbl);
    $.__views.readMoreLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            FontSize: "13sp"
        },
        color: "#e65e48",
        top: "0dp",
        right: "10dp",
        text: "Read more",
        id: "readMoreLbl"
    });
    $.__views.superScroll.add($.__views.readMoreLbl);
    $.__views.washCareContainer = Ti.UI.createScrollView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "washCareContainer",
        top: "15dp",
        left: "10dp",
        scrollType: "horizontal",
        right: "10dp"
    });
    $.__views.superScroll.add($.__views.washCareContainer);
    $.__views.ironImage = Ti.UI.createImageView({
        top: "0dp",
        left: "0dp",
        id: "ironImage"
    });
    $.__views.washCareContainer.add($.__views.ironImage);
    $.__views.stockSeperator_0 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        top: "15dp",
        backgroundColor: "#e6e6e6",
        height: "1dp",
        left: "10dp",
        right: "10dp",
        id: "stockSeperator_0"
    });
    $.__views.superScroll.add($.__views.stockSeperator_0);
    $.__views.instockSuperContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        left: "10dp",
        top: "5dp",
        right: "10dp",
        height: Titanium.UI.SIZE,
        id: "instockSuperContainer"
    });
    $.__views.superScroll.add($.__views.instockSuperContainer);
    $.__views.stockStatus = Ti.UI.createLabel({
        left: "0dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#1bb83c",
        id: "stockStatus"
    });
    $.__views.instockSuperContainer.add($.__views.stockStatus);
    $.__views.availabilityLbl = Ti.UI.createLabel({
        right: "0dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#555555",
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM,
        text: "Check estimated delivery",
        id: "availabilityLbl"
    });
    $.__views.instockSuperContainer.add($.__views.availabilityLbl);
    $.__views.pincodeContainer = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        right: "0dp",
        visible: false,
        id: "pincodeContainer"
    });
    $.__views.instockSuperContainer.add($.__views.pincodeContainer);
    $.__views.pincodeTxt = Ti.UI.createTextField({
        width: "100dp",
        height: Titanium.UI.FILL,
        left: "0dp",
        font: {
            fontSize: "10dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#333333",
        hintText: "Enter Pincode",
        hintTextColor: "#333333",
        maxLength: "6",
        keyboardType: Titanium.UI.KEYBOARD_PHONE_PAD,
        id: "pincodeTxt",
        type: "TextField"
    });
    $.__views.pincodeContainer.add($.__views.pincodeTxt);
    $.__views.checkBtn = Ti.UI.createLabel({
        width: "50dp",
        height: "20dp",
        left: "105dp",
        color: "#7F7F7F",
        text: "CHECK",
        font: {
            fontSize: "10sp",
            fontFamily: "futura_medium_bt-webfont"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "checkBtn"
    });
    $.__views.pincodeContainer.add($.__views.checkBtn);
    $.__views.activityIndi = Ti.UI.createActivityIndicator({
        font: {
            fontSize: "10sp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#7F7F7F",
        left: "105dp",
        style: Ti.UI.ActivityIndicatorStyle.PLAIN,
        message: "Checking...",
        id: "activityIndi"
    });
    $.__views.pincodeContainer.add($.__views.activityIndi);
    $.__views.estimateDateLbl = Ti.UI.createLabel({
        right: "0dp",
        font: {
            fontSize: "12sp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        visible: false,
        color: "#555555",
        id: "estimateDateLbl"
    });
    $.__views.instockSuperContainer.add($.__views.estimateDateLbl);
    $.__views.stockSeperator_1 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        top: "5dp",
        backgroundColor: "#e6e6e6",
        height: "1dp",
        left: "10dp",
        right: "10dp",
        id: "stockSeperator_1"
    });
    $.__views.superScroll.add($.__views.stockSeperator_1);
    $.__views.availableDesigLbl = Ti.UI.createLabel({
        font: {
            fontSize: "11dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        top: "30dp",
        left: "10dp",
        text: "ALSO AVAILABLE AS",
        id: "availableDesigLbl"
    });
    $.__views.superScroll.add($.__views.availableDesigLbl);
    var __alloyId428 = [];
    $.__views.availableDesignScroll = Ti.UI.createScrollableView({
        width: Titanium.UI.FILL,
        views: __alloyId428,
        id: "availableDesignScroll"
    });
    $.__views.superScroll.add($.__views.availableDesignScroll);
    $.__views.pageControlContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "pageControlContainer"
    });
    $.__views.superScroll.add($.__views.pageControlContainer);
    $.__views.storeLocator = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "12sp"
        },
        top: "15dp",
        color: "#FFFFFF",
        width: Titanium.UI.FILL,
        height: "40dp",
        backgroundColor: "#404040",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "storeLocator"
    });
    $.__views.superScroll.add($.__views.storeLocator);
    navigateToStoreLocater ? $.addListener($.__views.storeLocator, "click", navigateToStoreLocater) : __defers["$.__views.storeLocator!click!navigateToStoreLocater"] = true;
    $.__views.SuperSimilarCollection = Ti.UI.createView({
        top: "15dp",
        width: Titanium.UI.FILL,
        left: "10dp",
        right: "10dp",
        height: Titanium.UI.SIZE,
        layout: "vertical",
        bottom: "50dp",
        id: "SuperSimilarCollection"
    });
    $.__views.superScroll.add($.__views.SuperSimilarCollection);
    $.__views.similarCollectionContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "Vertical",
        id: "similarCollectionContainer"
    });
    $.__views.SuperSimilarCollection.add($.__views.similarCollectionContainer);
    $.__views.__alloyId429 = Ti.UI.createView({
        top: "0dp",
        width: Titanium.UI.FILL,
        height: "40dp",
        touchEnabled: false,
        id: "__alloyId429"
    });
    $.__views.similarCollectionContainer.add($.__views.__alloyId429);
    $.__views.__alloyId430 = Ti.UI.createLabel({
        font: {
            fontSize: "11dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        left: "0dp",
        touchEnabled: false,
        text: "SIMILAR PRODUCTS",
        id: "__alloyId430"
    });
    $.__views.__alloyId429.add($.__views.__alloyId430);
    $.__views.curtainsrightArrow = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "15dp"
        },
        color: "#7e7d7d",
        text: Alloy.Globals.icon.downArrow,
        height: Titanium.UI.FILL,
        right: "0dp",
        width: "20dp",
        touchEnabled: false,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        id: "curtainsrightArrow"
    });
    $.__views.__alloyId429.add($.__views.curtainsrightArrow);
    $.__views.listSeperator = Ti.UI.createView({
        width: Titanium.UI.FILL,
        bottom: "0dp",
        backgroundColor: "#e6e6e6",
        height: "1dp",
        id: "listSeperator"
    });
    $.__views.SuperSimilarCollection.add($.__views.listSeperator);
    $.__views.alsoViewCollectionContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "Vertical",
        id: "alsoViewCollectionContainer"
    });
    $.__views.SuperSimilarCollection.add($.__views.alsoViewCollectionContainer);
    $.__views.__alloyId431 = Ti.UI.createView({
        top: "0dp",
        width: Titanium.UI.FILL,
        height: "40dp",
        touchEnabled: false,
        id: "__alloyId431"
    });
    $.__views.alsoViewCollectionContainer.add($.__views.__alloyId431);
    $.__views.__alloyId432 = Ti.UI.createLabel({
        font: {
            fontSize: "11dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        left: "0dp",
        touchEnabled: false,
        text: "PEOPLE ALSO VIEWED",
        id: "__alloyId432"
    });
    $.__views.__alloyId431.add($.__views.__alloyId432);
    $.__views.curtainsrightArrow = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "15dp"
        },
        color: "#7e7d7d",
        text: Alloy.Globals.icon.downArrow,
        height: Titanium.UI.FILL,
        right: "0dp",
        width: "20dp",
        touchEnabled: false,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        id: "curtainsrightArrow"
    });
    $.__views.__alloyId431.add($.__views.curtainsrightArrow);
    $.__views.addToBagLbl = Ti.UI.createLabel({
        height: "40dp",
        bottom: "0dp",
        font: {
            fontSize: "10dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        right: "0dp",
        visible: false,
        backgroundColor: "#e65e48",
        text: "ADD TO BAG",
        id: "addToBagLbl"
    });
    $.__views.estoreDetails.add($.__views.addToBagLbl);
    $.__views.whereToBuy = Ti.UI.createLabel({
        height: "40dp",
        bottom: "0dp",
        font: {
            fontSize: "10dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        right: "0dp",
        visible: false,
        backgroundColor: "#e65e48",
        text: "WHERE TO BUY",
        id: "whereToBuy"
    });
    $.__views.estoreDetails.add($.__views.whereToBuy);
    navigateToStoreLocater ? $.addListener($.__views.whereToBuy, "click", navigateToStoreLocater) : __defers["$.__views.whereToBuy!click!navigateToStoreLocater"] = true;
    $.__views.upArrowLbl = Ti.UI.createLabel({
        height: "40dp",
        width: "40dp",
        borderRadius: "20dp",
        color: "#000000",
        bottom: "70dp",
        borderWidth: "0.1",
        right: "10dp",
        backgroundColor: "#e65e48",
        font: {
            fontSize: "20dp",
            fontFamily: "icomoon"
        },
        visible: false,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: Alloy.Globals.icon.top,
        id: "upArrowLbl"
    });
    $.__views.estoreDetails.add($.__views.upArrowLbl);
    $.__views.previewContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        visible: false,
        backgroundColor: "#e7e7e7",
        id: "previewContainer"
    });
    $.__views.estoreDetails.add($.__views.previewContainer);
    $.__views.__alloyId433 = Ti.UI.createView({
        bottom: 50,
        id: "__alloyId433"
    });
    $.__views.previewContainer.add($.__views.__alloyId433);
    $.__views.closeLbl = Ti.UI.createLabel({
        width: "40dp",
        height: "40dp",
        top: "15dp",
        right: "15dp",
        text: Alloy.Globals.icon.close,
        color: "#ffffff",
        font: {
            fontSize: "20dp",
            fontFamily: "icomoon"
        },
        zIndex: "10",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "closeLbl"
    });
    $.__views.__alloyId433.add($.__views.closeLbl);
    var __alloyId434 = [];
    $.__views.__alloyId435 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        image: "/images/bed1.jpg",
        id: "__alloyId435"
    });
    __alloyId434.push($.__views.__alloyId435);
    $.__views.imagePreviewContainer = Ti.UI.createScrollableView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        views: __alloyId434,
        id: "imagePreviewContainer"
    });
    $.__views.__alloyId433.add($.__views.imagePreviewContainer);
    $.__views.imagePreviewWishIcon = Ti.UI.createLabel({
        font: {
            fontSize: "18dp",
            fontFamily: "icomoon"
        },
        bottom: "15dp",
        width: "35dp",
        height: "35dp",
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        right: "10dp",
        text: Alloy.Globals.icon.shortlist,
        id: "imagePreviewWishIcon"
    });
    $.__views.__alloyId433.add($.__views.imagePreviewWishIcon);
    $.__views.imagePreviewShareIcon = Ti.UI.createLabel({
        font: {
            fontSize: "18dp",
            fontFamily: "icomoon"
        },
        bottom: "15dp",
        width: "35dp",
        height: "35dp",
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        right: "50dp",
        text: Alloy.Globals.icon.share,
        id: "imagePreviewShareIcon"
    });
    $.__views.__alloyId433.add($.__views.imagePreviewShareIcon);
    $.__views.subImageContainer = Ti.UI.createScrollView({
        width: Titanium.UI.FILL,
        height: "50dp",
        backgroundColor: "#333333",
        bottom: "0dp",
        id: "subImageContainer"
    });
    $.__views.previewContainer.add($.__views.subImageContainer);
    $.__views.__alloyId436 = Ti.UI.createImageView({
        width: 45,
        left: "10dp",
        height: 30,
        image: "/images/bed1.jpg",
        id: "__alloyId436"
    });
    $.__views.subImageContainer.add($.__views.__alloyId436);
    $.__views.ratingContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        visible: false,
        backgroundColor: "#231f20",
        id: "ratingContainer"
    });
    $.__views.estoreDetails.add($.__views.ratingContainer);
    $.__views.__alloyId437 = Ti.UI.createView({
        top: "0dp",
        width: Titanium.UI.FILL,
        height: "53dp",
        id: "__alloyId437"
    });
    $.__views.ratingContainer.add($.__views.__alloyId437);
    $.__views.__alloyId438 = Ti.UI.createLabel({
        left: "15dp",
        height: Titanium.UI.FILL,
        font: {
            fontSize: "15sp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        text: "RATE THIS ITEM",
        id: "__alloyId438"
    });
    $.__views.__alloyId437.add($.__views.__alloyId438);
    $.__views.ratingCloseLbl = Ti.UI.createLabel({
        right: "15dp",
        width: "40dp",
        height: "40dp",
        font: {
            fontSize: "20sp",
            fontFamily: "icomoon"
        },
        color: "#ffffff",
        text: Alloy.Globals.icon.close,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "ratingCloseLbl"
    });
    $.__views.__alloyId437.add($.__views.ratingCloseLbl);
    $.__views.subRatingContainer = Ti.UI.createView({
        layout: "horizontal",
        top: "83dp",
        id: "subRatingContainer"
    });
    $.__views.ratingContainer.add($.__views.subRatingContainer);
    $.__views.rate1 = Ti.UI.createLabel({
        left: "20dp",
        font: {
            fontSize: "30dp",
            fontFamily: "icomoon"
        },
        color: "#737373",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: Alloy.Globals.icon.rateOutline,
        id: "rate1",
        type: "rate",
        count: 1,
        value: 6
    });
    $.__views.subRatingContainer.add($.__views.rate1);
    $.__views.rate2 = Ti.UI.createLabel({
        left: "20dp",
        font: {
            fontSize: "30dp",
            fontFamily: "icomoon"
        },
        color: "#737373",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: Alloy.Globals.icon.rateOutline,
        id: "rate2",
        type: "rate",
        count: 2,
        value: 7
    });
    $.__views.subRatingContainer.add($.__views.rate2);
    $.__views.rate3 = Ti.UI.createLabel({
        left: "20dp",
        font: {
            fontSize: "30dp",
            fontFamily: "icomoon"
        },
        color: "#737373",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: Alloy.Globals.icon.rateOutline,
        id: "rate3",
        type: "rate",
        count: 3,
        value: 8
    });
    $.__views.subRatingContainer.add($.__views.rate3);
    $.__views.rate4 = Ti.UI.createLabel({
        left: "20dp",
        font: {
            fontSize: "30dp",
            fontFamily: "icomoon"
        },
        color: "#737373",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: Alloy.Globals.icon.rateOutline,
        id: "rate4",
        type: "rate",
        count: 4,
        value: 9
    });
    $.__views.subRatingContainer.add($.__views.rate4);
    $.__views.rate5 = Ti.UI.createLabel({
        left: "20dp",
        font: {
            fontSize: "30dp",
            fontFamily: "icomoon"
        },
        color: "#737373",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: Alloy.Globals.icon.rateOutline,
        id: "rate5",
        type: "rate",
        count: 5,
        value: 10
    });
    $.__views.subRatingContainer.add($.__views.rate5);
    $.__views.done = Ti.UI.createLabel({
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        bottom: "15dp",
        width: "80%",
        height: "40dp",
        color: "#ffffff",
        borderColor: "#80e7e7e7",
        borderWidth: "0.5",
        backgroundColor: "transparent",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "DONE",
        id: "done"
    });
    $.__views.ratingContainer.add($.__views.done);
    $.__views.previewImageScroll = Ti.UI.createScrollView({
        id: "previewImageScroll",
        scrollType: "horizontal",
        backgroundColor: "white",
        visible: false
    });
    $.__views.estoreDetails.add($.__views.previewImageScroll);
    $.__views.preview_image = Ti.UI.createImageView({
        id: "preview_image"
    });
    $.__views.previewImageScroll.add($.__views.preview_image);
    $.__views.previewCloseLbl = Ti.UI.createLabel({
        width: "40dp",
        height: "40dp",
        top: "15dp",
        right: "15dp",
        text: Alloy.Globals.icon.close,
        color: "#333333",
        font: {
            fontSize: "20dp",
            fontFamily: "icomoon"
        },
        zIndex: "10",
        visible: false,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "previewCloseLbl"
    });
    $.__views.estoreDetails.add($.__views.previewCloseLbl);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var _args = args;
    var wishIcon1 = [];
    var selectedView = [];
    var selectedImage = [];
    var imageContainerArr = [];
    var similarProductsData = "";
    var peopleAlsoViewData = "";
    var gridListContainer = "";
    var productId, productName, colorView, lost_sale, gaProductSku;
    var gaShortlistProduct = "";
    var gaAddToCartProduct = {};
    var gaShortlistProductArray = {};
    var finalRating = "";
    var peopleAlsoViewDataCount = "", similarProductsDataCount = "";
    var availabledesign_data_count = "";
    var previewImage = "";
    var image_data;
    var sharingProductUrl = "";
    var wishFlag;
    var wallpaperImage = [];
    var measurement = "", addToCartFlag = "";
    measurement = require("alloy/measurement");
    if (!isNullVal(args.product)) {
        if ("wallpaper" == args.product) {
            $.instockSuperContainer.visible = false;
            $.instockSuperContainer.height = "0dp";
            $.stockSeperator_0.backgroundColor = "transparent";
            $.stockSeperator_1.backgroundColor = "transparent";
            $.stockSeperator_0.top = "0dp";
            $.stockSeperator_1.top = "0dp";
            $.whereToBuy.visible = true;
            $.addToBagLbl.visible = false;
            $.availableDesigLbl.text = "AVAILABLE DESIGNS";
        }
        $.addToBagLbl.visible = false;
    }
    $.header.init({
        title: "DETAILS",
        passWindow: $.estoreDetails
    });
    $.header.updateCartCount();
    googleAnalyticsScreen("ESTORE DETAIL");
    var text = "Check estimated delivery ";
    var attr = Ti.UI.createAttributedString({
        text: text,
        attributes: [ {
            type: Ti.UI.ATTRIBUTE_FONT,
            value: {
                fontSize: "14dp",
                fontFamily: "icomoon"
            },
            range: [ text.indexOf(""), "".length ]
        } ]
    });
    $.availabilityLbl.attributedString = attr;
    touchEffect.createTouchEffect($.viewMoreDetailsLbl, "#a6e65e48", "#e65e48");
    touchEffect.createTouchEffect($.addToBagLbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.whereToBuy, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.checkBtn, "#a67F7F7F", "#7F7F7F");
    touchEffect.createTouchEffect($.done, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.ratingCloseLbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.shareIcon, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.upArrowLbl, "#a6000000", "#000000");
    touchEffect.createTouchEffect($.imagePreviewWishIcon, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.imagePreviewShareIcon, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.closeLbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.storeLocator, "#a6ffffff", "#ffffff");
    $.estoreDetails.addEventListener("click", function(e) {
        "TextField" != e.source.type && $.pincodeTxt.blur();
    });
    $.addToBagLbl.width = parseInt(Alloy.Globals.platformWidth);
    $.whereToBuy.width = parseInt(Alloy.Globals.platformWidth);
    var designContainer = parseInt(Alloy.Globals.platformWidth - 50);
    var designWidth = parseInt(designContainer / 4);
    $.availableDesignScroll.height = parseInt(designWidth + 20);
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
    $.readMoreLbl.addEventListener("click", function(e) {
        $.descriptionLbl.height = Ti.UI.SIZE;
        $.readMoreLbl.text = "";
    });
    var text = " FIND A D'DECOR STORE NEAR YOU";
    var attr = Ti.UI.createAttributedString({
        text: text,
        attributes: [ {
            type: Ti.UI.ATTRIBUTE_FONT,
            value: {
                fontSize: 10,
                fontFamily: "futura_medium_bt-webfont"
            },
            range: [ text.indexOf("FIND A D'DECOR STORE NEAR YOU"), "FIND A D'DECOR STORE NEAR YOU".length ]
        } ]
    });
    $.storeLocator.attributedString = attr;
    $.upArrowLbl.addEventListener("click", scrollToEffect);
    $.superScroll.addEventListener("touchend", upArrowEffect);
    $.upArrowLbl.visible = false;
    $.availabilityLbl.addEventListener("click", checkAvailability);
    $.checkBtn.addEventListener("click", function(e) {
        if ("" != $.pincodeTxt.value && "6" == $.pincodeTxt.value.length) {
            $.activityIndi.show();
            $.checkBtn.visible = false;
            $.checkBtn.touchEnabled = false;
            var url = Alloy.Globals.commonUrl.estimateDelivery;
            var data = {
                pincode: $.pincodeTxt.value
            };
            var requestParams = JSON.stringify(data);
            Alloy.Globals.webServiceCall(url, requestParams, estimateDeliverySuccessCallback, estimateDeliveryErrorCallback, "POST", $.estoreDetails);
        } else showAlert($.estoreDetails, "Please enter valid 6-digit pincode");
    });
    $.estimateDateLbl.addEventListener("click", estimateDate);
    $.ratingView.addEventListener("click", function(e) {
        isNullVal(Ti.App.Properties.getString("access_token")) ? Alloy.Globals.addWindowInNav("signIn", "estoreDetails") : hideShowView($.ratingContainer);
    });
    $.ratingCloseLbl.addEventListener("click", function(e) {
        hideShowView($.ratingContainer);
        setTimeout(function() {
            for (var i = 0; 5 > i; i++) {
                $.subRatingContainer.children[i].text = Alloy.Globals.icon.rateOutline;
                $.subRatingContainer.children[i].color = "#737373";
            }
        }, 1500);
    });
    $.subRatingContainer.addEventListener("click", rating);
    $.done.addEventListener("click", sendRating);
    $.estoreDetails.addEventListener("click", hideOverFlowMenu);
    getShopDetails(args);
    $.colorOptionScroll.addEventListener("click", function(e) {
        if ("fabricsColor" == e.source.type) {
            _.each($.colorOptionScroll.shades, function(value, k) {
                selectedView[value.product_id].backgroundColor = "transparent";
            });
            selectedView[e.source.id].backgroundColor = "#cccccc";
            closeOtherViews();
            var data = {
                Productid: e.source.productID,
                block: "shop"
            };
            getShopDetails(data);
        }
    });
    $.imageOptionScroll.addEventListener("click", function(e) {
        if ("fabricsColor" == e.source.type) {
            _.each($.imageOptionScroll.otherItems, function(value, k) {
                selectedImage[k].backgroundColor = "transparent";
            });
            selectedImage[e.source.id].backgroundColor = "#e65e48";
            $.blurImage.image = e.source.children[0].blurImage;
            $.estoreImage.image = e.source.children[0].image;
        }
    });
    $.moreDetailsContainer.addEventListener("click", moreDetailsEffect);
    $.availableDesignScroll.addEventListener("scrollend", function(e) {
        if (availabledesign_data_count > 4) {
            var numberOfPages = $.availableDesignScroll.getViews().length;
            for (var i = 0; numberOfPages > i; i++) $.pageControlContainer.children[0].children[i].setBackgroundColor("#e7e7e7");
            $.pageControlContainer.children[0].children[e.currentPage].setBackgroundColor("#e65e48");
        }
    });
    $.availableDesignScroll.addEventListener("click", function(e) {
        if ("availableDesign" == e.source.type) {
            closeOtherViews();
            var data = {
                Productid: e.source.id,
                block: "shop"
            };
            getShopDetails(data);
        } else if ("VIEW ALL" == e.source.text) {
            var args_ = {
                block: "shop",
                slider: "alsoavailableas",
                productID: e.source.product_id,
                navigatedblockid: "",
                type: "shop"
            };
            Alloy.Globals.addWindowInNav("otherListingPage", args_);
        }
    });
    $.SuperSimilarCollection.addEventListener("click", productToggleEffect);
    $.wishIcon.addEventListener("click", checkshortlistItem);
    var shortlistData;
    $.addToBagLbl.addEventListener("click", addToCart);
    var cartData;
    $.estoreImage.addEventListener("click", function(e) {
        var imageData = {};
        if (!isNullVal(args.product)) {
            imageData = "wallpaper" == args.product ? {
                product_id: productId,
                wish_flag: wishFlag,
                type: "shop",
                data: wallpaperImage,
                sharingProductUrl: sharingProductUrl
            } : {
                product_id: productId,
                wish_flag: wishFlag,
                type: "shop",
                sharingProductUrl: sharingProductUrl,
                data: image_data
            };
            previewImage = Alloy.createController("imagePreview", imageData).getView();
            $.estoreDetails.add(previewImage);
            hideShowView(previewImage);
        }
    });
    $.previewCloseLbl.addEventListener("click", function(e) {
        hideShowView($.previewImageScroll);
        $.previewCloseLbl.visible = false;
    });
    $.shareIcon.addEventListener("click", function(e) {
        shareImage(e.source.shareUrl);
    });
    __defers["$.__views.estoreDetails!android:back!goToBack"] && $.addListener($.__views.estoreDetails, "android:back", goToBack);
    __defers["$.__views.estoreDetails!focus!updateCount"] && $.addListener($.__views.estoreDetails, "focus", updateCount);
    __defers["$.__views.estoreDetails!close!destroyWindow"] && $.addListener($.__views.estoreDetails, "close", destroyWindow);
    __defers["$.__views.storeLocator!click!navigateToStoreLocater"] && $.addListener($.__views.storeLocator, "click", navigateToStoreLocater);
    __defers["$.__views.whereToBuy!click!navigateToStoreLocater"] && $.addListener($.__views.whereToBuy, "click", navigateToStoreLocater);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;