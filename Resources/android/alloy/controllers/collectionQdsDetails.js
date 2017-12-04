function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function readMoreToggle(e) {
        $.descriptionLbl.height = Ti.UI.SIZE;
        $.readMoreLbl.text = "";
    }
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
    function hideOverFlowMenu(e) {
        Alloy.Globals.overFlowFlag && "overFlowMenuLbl" != e.source.id && $.header.hideOverFlow();
    }
    function getCollectionQdsDetails(qdsData) {
        var _qdsData = qdsData;
        var _qdsData_productid = "", _qdsData_block = "", _qdsData_navigatedblockid = "";
        showLoader($.collectionQdsDetails);
        isNullVal(_qdsData.Productid) || (_qdsData_productid = _qdsData.Productid);
        isNullVal(_qdsData.block) || (_qdsData_block = _qdsData.block);
        _qdsData_navigatedblockid = isNullVal(_qdsData.navigatedblockid) ? "" : _qdsData.navigatedblockid;
        var url = Alloy.Globals.commonUrl.qdsDetail;
        var data = {
            Productid: _qdsData_productid,
            block: _qdsData_block,
            navigatedblockid: _qdsData_navigatedblockid
        };
        var requestParams = JSON.stringify(data);
        Alloy.Globals.webServiceCall(url, requestParams, getCollectionQdsDetailsSuccessCallback, getCollectionQdsDetailsErrorCallback, "POST", $.collectionQdsDetails);
    }
    function getCollectionQdsDetailsSuccessCallback(e) {
        !isNullVal(args.type) && !isNullVal(args.category);
        try {
            similarQdsData = "";
            matchBestWithData = "";
            availabledesign_data_count = "";
            $.superScroll.scrollTo(0, 0);
            if (isNullVal(e.data.image)) {
                $.collectionImage.image = "";
                $.blurImage.image = "";
                $.preview_image.image = "";
            } else {
                $.collectionImage.image = encodeURI(e.data.image);
                $.blurImage.image = encodeURI(e.data.blur_image);
                $.preview_image.image = encodeURI(e.data.image);
                image_data = encodeURI(e.data.image);
            }
            if (isNullVal(e.data.url)) $.shareIcon.shareUrl = ""; else {
                $.shareIcon.shareUrl = e.data.url;
                sharingProductUrl = e.data.url;
            }
            isNullVal(e.data.product_id) || (productId = e.data.product_id);
            if (e.data.wishlistItem) {
                wishFlag = true;
                $.wishIcon.text = Alloy.Globals.icon.setShortlist;
                $.wishIcon.color = "#e65e48";
            } else {
                wishFlag = false;
                $.wishIcon.text = Alloy.Globals.icon.shortlist;
                $.wishIcon.color = "#FFFFFF";
            }
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
            if (isNullVal(e.data.product_price)) {
                $.priceLbl.text = "";
                $.taxLbl.text = "";
                productPrice = "";
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
                productPrice = e.data.product_price.split("/")[0];
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
                $.ironImage.top = "0dp";
                $.ironImage.height = "0dp";
            } else {
                $.ironImage.image = e.data.washcare_image;
                "0dp" == $.ironImage.getHeight() && ($.ironImage.height = "30dp");
                "0dp" == $.ironImage.getTop() && ($.ironImage.top = "25dp");
            }
            if (isNullVal(e.data.availableShades[0])) {
                $.colorOptionScroll.shades = "";
                $.colorOptionScroll.height = "0dp";
            } else {
                "0dp" == $.colorOptionScroll.getHeight() && ($.colorOptionScroll.height = "55dp");
                $.colorOptionScroll.shades = e.data.availableShades;
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
            _.size(e.data.calculator_values) > 0 ? $.estimateLbl.calculatorValue = e.data.calculator_values : $.estimateLbl.calculatorValue = "";
            if (isNullVal(e.data.availabledesign_data.response[0])) {
                availabledesign_data_count = "";
                $.availableDesignScroll.top = "0dp";
                $.availableDesigLbl.top = "0dp";
                $.availableDesigLbl.text = "";
                $.availableDesignScroll.height = "0dp";
                $.pageControlContainer.visible = false;
            } else {
                "0dp" == $.availableDesignScroll.getHeight() && ($.availableDesignScroll.height = parseInt(designWidth + 20));
                "false" == $.pageControlContainer.getVisible() && ($.pageControlContainer.visible = true);
                availabledesign_data_count = e.data.availabledesign_data.total_count;
                showAvailableDesign(e.data.availabledesign_data.response);
            }
            if (isNullVal(e.data.similarproducts_data.response[0])) {
                similarQdsData = "";
                similarQdsDataCount = "";
                $.similarCollectionContainer.height = "0dp";
                $.listSeperator.height = "0dp";
            } else {
                if ("0dp" == $.similarCollectionContainer.getHeight()) {
                    $.similarCollectionContainer.height = Titanium.UI.SIZE;
                    $.listSeperator.height = "1dp";
                }
                similarQdsData = e.data.similarproducts_data.response;
                similarQdsDataCount = e.data.similarproducts_data.total_count;
            }
            if (isNullVal(e.data.matchesbestwith_data.response[0])) {
                matchBestWithData = "";
                matchBestWithDataCount = "";
                $.alsoViewCollectionContainer.height = "0dp";
                $.listSeperator.height = "0dp";
            } else {
                if ("0dp" == $.alsoViewCollectionContainer.getHeight()) {
                    $.alsoViewCollectionContainer.height = Titanium.UI.SIZE;
                    $.listSeperator.height = "1dp";
                }
                matchBestWithData = e.data.matchesbestwith_data.response;
                matchBestWithDataCount = e.data.matchesbestwith_data.total_count;
            }
            hideLoader($.collectionQdsDetails);
            googleAnalyticsDetail(productName + "(" + gaProductSku + ")");
            googleAnalyticsScreen(productName + " DETAIL");
        } catch (ex) {
            hideLoader($.collectionQdsDetails);
            Ti.API.info("ex= catch" + ex.message);
            showAlert($.collectionQdsDetails, "Something went wrong...");
            setTimeout(function() {
                goToBack();
            }, 1e3);
        }
    }
    function getCollectionQdsDetailsErrorCallback(e) {
        hideLoader($.collectionQdsDetails);
        Ti.API.info("error = " + e);
        showAlert($.collectionQdsDetails, "Something went wrong...");
        setTimeout(function() {
            goToBack();
        }, 1e3);
    }
    function displayAvailableColors() {
        var myCounter = 0;
        _.each($.colorOptionScroll.children, function(view, key) {
            $.colorOptionScroll.remove(view);
        });
        _.each($.colorOptionScroll.shades, function(value, k) {
            selectedView[value.product_id] = Ti.UI.createView({
                width: "39dp",
                height: "39dp",
                left: "10dp",
                id: value.product_id,
                productID: value.product_id,
                type: "fabricsColor",
                borderColor: "transparent"
            });
            colorView = Ti.UI.createImageView({
                width: "30dp",
                height: "30dp",
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
        isNullVal(productId) || (selectedView[productId].backgroundColor = "#cccccc");
        var pointDP = 49 * myCounter;
        var pointPX = measurement.dpToPX(pointDP);
        $.colorOptionScroll.scrollTo(pointPX, 0);
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
                if ("blinds" == argsData.block) {
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
                        ellipsize: true,
                        wordWrap: false,
                        text: design_lbl.toUpperCase(),
                        bottom: "5dp",
                        touchEnabled: false
                    });
                    designContainer[i].add(designLbl[i]);
                } else {
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
                }
            });
            if (availabledesign_data_count >= 11) {
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
                setSimilarData(similarQdsData, "similarproducts", similarQdsDataCount);
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
            if (1 == e.source.children.length) {
                setSimilarData(matchBestWithData, "matchesbestwith", matchBestWithDataCount);
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
        }) : "" == e.source.text ? removeWishlist(e.source) : addToShortlist(e.source); else if ("shareLbl" == e.source.id) shareImage(e.source.shareUrl); else if (!isNullVal(e.source.productId)) {
            closeOtherViews();
            var data = {
                Productid: e.source.productId,
                block: argsData_block,
                navigatedblockid: ""
            };
            $.superScroll.scrollTo(0, 0);
            getCollectionQdsDetails(data);
        }
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
            var viewAll = Ti.UI.createLabel({
                top: "15dp",
                width: parseInt(Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor - 10),
                height: "35dp",
                font: {
                    fontSize: "12sp"
                },
                color: "#333333",
                backgroundColor: "#f4f4f4",
                text: "VIEW ALL",
                block: argsData_block,
                slider: slider,
                productID: productId,
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
            });
            gridListContainer.add(viewAll);
            touchEffect.createTouchEffect(viewAll, "#a6333333", "#333333");
            viewAll.addEventListener("click", function(e) {
                var _args = {
                    block: e.source.block,
                    slider: e.source.slider,
                    productID: e.source.productID,
                    navigatedblockid: navigatedCollectionId || "",
                    type: "product"
                };
                Alloy.Globals.addWindowInNav("otherListingPage", _args);
            });
        }
        _.each(similarCollectionData, function(value, k) {
            var product1 = Ti.UI.createView({
                left: "0dp",
                collectionId: value.collection_id,
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
            var wheretoBuy1 = Ti.UI.createLabel({
                text: Alloy.Globals.icon.currency + value.product_price,
                productId: value.product_id,
                productName: value.product_name
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
                top: "0dp",
                width: "35dp",
                height: "35dp",
                textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
                text: Alloy.Globals.icon.share,
                productId: value.product_id,
                productName: value.product_name,
                id: "shareLbl",
                shareUrl: value.collection_url ? value.collection_url : value.product_url ? value.product_url : value.url ? value.url : ""
            });
            shareContainer.add(shareIcon1);
            var wishIcon1 = Ti.UI.createLabel({
                right: "3dp",
                color: value.wishlistItem ? "#e65e48" : "#a6a6a6",
                font: {
                    fontSize: "18dp",
                    fontFamily: "icomoon"
                },
                top: "0dp",
                width: "35dp",
                height: "35dp",
                textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
                text: value.wishlistItem ? Alloy.Globals.icon.setShortlist : Alloy.Globals.icon.shortlist,
                productId: value.product_id,
                productSku: value.product_sku,
                productName: value.product_name,
                id: "wishLbl"
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
            gaShortlistProduct = {};
            if (isNullVal(pId)) {
                product_id = productId;
                gaShortlistProduct = {
                    name: productName,
                    sku: gaProductSku,
                    lostSale: false
                };
            } else {
                isNullVal(pId.productId) || (product_id = pId.productId);
                shortlistData = pId;
                Ti.API.info("shortlistData = " + JSON.stringify(shortlistData));
                if (!pId.id) {
                    $.wishIcon.text = Alloy.Globals.icon.setShortlist;
                    $.wishIcon.color = "#e65e48";
                }
                gaShortlistProduct = {
                    name: shortlistData.productName,
                    sku: shortlistData.productSku,
                    lostSale: false
                };
            }
            if (0 != _.size(shortlistData)) {
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
            Alloy.Globals.webServiceCall(url, requestParams, addToShortlistSuccessCallback, addToShortlistErrorCallback, "POST", $.collectionQdsDetails);
        }
    }
    function addToShortlistSuccessCallback(e) {
        try {
            showAlert($.collectionQdsDetails, e.message);
            var gaScreenName = argsData.category + "DETAIL PAGE";
            googleAnalyticsShortlist(gaShortlistProduct, gaScreenName);
            isNullVal(args.listObject) || args.listViewReference(args.listObject, "add");
        } catch (ex) {
            Ti.API.info("catch = " + ex.message);
        }
    }
    function addToShortlistErrorCallback(e) {
        showAlert($.collectionQdsDetails, e.message);
        if (0 != _.size(shortlistData)) {
            shortlistData.text = Alloy.Globals.icon.shortlist;
            shortlistData.color = "#a6a6a6";
        } else {
            $.wishIcon.text = Alloy.Globals.icon.shortlist;
            $.wishIcon.color = "#ffffff";
        }
    }
    function removeWishlist(wishData) {
        if (isNullVal(wishData)) product_id = productId; else {
            isNullVal(wishData.productId) || (product_id = wishData.productId);
            shortlistData = wishData;
        }
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
        Alloy.Globals.webServiceCall(url, requestParams, removeShortlistProductSuccessCallback, removeShortlistProductErrorCallback, "POST", $.collectionQdsDetails);
    }
    function removeShortlistProductSuccessCallback(e) {
        try {
            showAlert($.collectionQdsDetails, e.message);
            isNullVal(args.listObject) || args.listViewReference(args.listObject, "remove");
        } catch (ex) {
            Ti.API.info("catch = " + ex.message);
        }
    }
    function removeShortlistProductErrorCallback(e) {
        showAlert($.collectionQdsDetails, e.message);
        if (0 != _.size(shortlistData)) {
            shortlistData.text = Alloy.Globals.icon.setShortlist;
            shortlistData.color = "#e65e48";
        } else {
            $.wishIcon.text = Alloy.Globals.icon.setShortlist;
            $.wishIcon.color = "#e65e48";
        }
    }
    function navigateToStoreLocater(e) {
        if ("collection" == args.type) Alloy.Globals.addWindowInNav("findStore"); else if ("blinds" == args.type) {
            var obj = {
                type: "blinds"
            };
            Alloy.Globals.addWindowInNav("findStore", obj);
        }
        var gaShortlistProductArray = {
            name: productName,
            sku: gaProductSku
        };
        generateLead(gaShortlistProductArray, productName + "DETAIL");
    }
    function goToBack() {
        if ("fabricCalc" == fabricCalculator.type) {
            hideShowView(fabricCalculator);
            fabricCalculator = "";
        } else if ("imagePreview" == previewImage.type) {
            hideShowView(previewImage);
            previewImage = "";
        } else {
            $.superScroll.removeEventListener("scroll", upArrowEffect);
            $.SuperSimilarCollection.removeEventListener("click", productToggleEffect);
            $.moreDetailsContainer.removeEventListener("click", moreDetailsEffect);
            $.readMoreLbl.removeEventListener("click", readMoreToggle);
            $.collectionQdsDetails.removeEventListener("click", hideOverFlowMenu);
            Alloy.Globals.popWindowInNav();
            $.collectionQdsDetails.close();
        }
    }
    function destroyWindow(e) {
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
    function rating(e) {
        finalRating = "";
        if ("rate" == e.source.type) {
            for (var i = 0; i < e.source.count; i++) {
                $.subRatingContainer.children[i].text = Alloy.Globals.icon.rateFill;
                $.subRatingContainer.children[i].color = "#e65e48";
            }
            for (var i = e.source.count; 5 > i; i++) {
                $.subRatingContainer.children[i].text = Alloy.Globals.icon.rateOutline;
                $.subRatingContainer.children[i].color = "#fff";
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
            setRateAttribute(rateCountText);
            hideShowView($.ratingContainer);
            setTimeout(function() {
                for (var i = 0; 5 > i; i++) {
                    $.subRatingContainer.children[i].text = Alloy.Globals.icon.rateOutline;
                    $.subRatingContainer.children[i].color = "#fff";
                }
            }, 2e3);
            showAlert($.estoreDetails, e.message);
        } catch (ex) {}
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
                $.subRatingContainer.children[i].color = "#fff";
            }
        }, 2e3);
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
    this.__controllerPath = "collectionQdsDetails";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.collectionQdsDetails = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        backgroundColor: "#ffffff",
        id: "collectionQdsDetails"
    });
    $.__views.collectionQdsDetails && $.addTopLevelView($.__views.collectionQdsDetails);
    goToBack ? $.addListener($.__views.collectionQdsDetails, "android:back", goToBack) : __defers["$.__views.collectionQdsDetails!android:back!goToBack"] = true;
    updateCount ? $.addListener($.__views.collectionQdsDetails, "focus", updateCount) : __defers["$.__views.collectionQdsDetails!focus!updateCount"] = true;
    destroyWindow ? $.addListener($.__views.collectionQdsDetails, "close", destroyWindow) : __defers["$.__views.collectionQdsDetails!close!destroyWindow"] = true;
    $.__views.header = Alloy.createWidget("headerView", "widget", {
        id: "header",
        __parentSymbol: $.__views.collectionQdsDetails
    });
    $.__views.header.setParent($.__views.collectionQdsDetails);
    $.__views.superScroll = Ti.UI.createScrollView({
        top: "53dp",
        scrollType: "vertical",
        layout: "vertical",
        id: "superScroll"
    });
    $.__views.collectionQdsDetails.add($.__views.superScroll);
    $.__views.__alloyId299 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        id: "__alloyId299"
    });
    $.__views.superScroll.add($.__views.__alloyId299);
    $.__views.estoreImageScroll = Ti.UI.createScrollView({
        left: "0dp",
        top: "0dp",
        height: "200dp",
        id: "estoreImageScroll",
        touched: false
    });
    $.__views.__alloyId299.add($.__views.estoreImageScroll);
    $.__views.blurImage = Ti.UI.createImageView({
        defaultImage: "/images/default_logo.png",
        id: "blurImage",
        width: "100%",
        height: "200dp",
        zIndex: 2
    });
    $.__views.estoreImageScroll.add($.__views.blurImage);
    $.__views.collectionImage = Ti.UI.createImageView({
        top: "0dp",
        height: "200dp",
        zIndex: "8",
        id: "collectionImage"
    });
    $.__views.estoreImageScroll.add($.__views.collectionImage);
    $.__views.ratingView = Ti.UI.createView({
        width: "50%",
        height: Titanium.UI.SIZE,
        bottom: "0dp",
        left: "0dp",
        layout: "vertical",
        borderColor: "red",
        borderWidth: "0.0",
        id: "ratingView",
        zIndex: 10
    });
    $.__views.__alloyId299.add($.__views.ratingView);
    $.__views.__alloyId300 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        layout: "vertical",
        bottom: 10,
        id: "__alloyId300"
    });
    $.__views.ratingView.add($.__views.__alloyId300);
    $.__views.ratingLbl = Ti.UI.createLabel({
        top: "0dp",
        left: "10dp",
        text: "RATINGS",
        color: "#ffffff",
        font: {
            fontSize: "10dp",
            fontFamily: "Futura Md BT"
        },
        id: "ratingLbl"
    });
    $.__views.__alloyId300.add($.__views.ratingLbl);
    $.__views.ratingIcon = Ti.UI.createLabel({
        top: "6dp",
        left: "10dp",
        text: "    ",
        color: "#fff",
        font: {
            fontSize: "10dp",
            fontFamily: "icomoon"
        },
        id: "ratingIcon"
    });
    $.__views.__alloyId300.add($.__views.ratingIcon);
    $.__views.__alloyId301 = Ti.UI.createView({
        width: "50%",
        height: Titanium.UI.SIZE,
        bottom: "0dp",
        right: "0dp",
        layout: "vertical",
        borderColor: "transparent",
        borderWidth: "0.0",
        zIndex: 10,
        id: "__alloyId301"
    });
    $.__views.__alloyId299.add($.__views.__alloyId301);
    $.__views.__alloyId302 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        bottom: 10,
        id: "__alloyId302"
    });
    $.__views.__alloyId301.add($.__views.__alloyId302);
    $.__views.wishIcon = Ti.UI.createLabel({
        font: {
            fontSize: "20dp",
            fontFamily: "icomoon"
        },
        top: "5dp",
        width: "35dp",
        height: "35dp",
        color: "#FFFFFF",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        right: "10dp",
        text: Alloy.Globals.icon.shortlist,
        id: "wishIcon"
    });
    $.__views.__alloyId302.add($.__views.wishIcon);
    $.__views.shareIcon = Ti.UI.createLabel({
        font: {
            fontSize: "20dp",
            fontFamily: "icomoon"
        },
        top: "5dp",
        width: "35dp",
        height: "35dp",
        color: "#FFFFFF",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        right: "50dp",
        text: Alloy.Globals.icon.share,
        id: "shareIcon"
    });
    $.__views.__alloyId302.add($.__views.shareIcon);
    $.__views.__alloyId303 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        backgroundGradient: {
            type: "linear",
            colors: [ {
                color: "#99000000",
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
        },
        touchEnabled: false,
        height: "200dp",
        id: "__alloyId303"
    });
    $.__views.__alloyId299.add($.__views.__alloyId303);
    $.__views.colorOptionScroll = Ti.UI.createScrollView({
        width: Titanium.UI.FILL,
        height: "55dp",
        layout: "horizontal",
        scrollType: "horizontal",
        backgroundColor: "#a6f2f2f2",
        id: "colorOptionScroll"
    });
    $.__views.superScroll.add($.__views.colorOptionScroll);
    $.__views.__alloyId304 = Ti.UI.createView({
        height: "0.5dp",
        width: Titanium.UI.FILL,
        backgroundColor: "#999999",
        id: "__alloyId304"
    });
    $.__views.superScroll.add($.__views.__alloyId304);
    $.__views.__alloyId305 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        left: "10dp",
        right: "10dp",
        height: Titanium.UI.SIZE,
        top: "25dp",
        id: "__alloyId305"
    });
    $.__views.superScroll.add($.__views.__alloyId305);
    $.__views.__alloyId306 = Ti.UI.createView({
        left: "0dp",
        top: "0dp",
        width: "65%",
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId306"
    });
    $.__views.__alloyId305.add($.__views.__alloyId306);
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
    $.__views.__alloyId306.add($.__views.skuNameLbl);
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
    $.__views.__alloyId306.add($.__views.subSkuNameLbl);
    $.__views.__alloyId307 = Ti.UI.createView({
        right: "0dp",
        top: "0dp",
        width: "38%",
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId307"
    });
    $.__views.__alloyId305.add($.__views.__alloyId307);
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
    $.__views.__alloyId307.add($.__views.priceLbl);
    $.__views.taxLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "futura-hv-bt-heavy",
            fontSize: "7dp"
        },
        color: "#333333",
        right: "0dp",
        top: "4dp",
        id: "taxLbl"
    });
    $.__views.__alloyId307.add($.__views.taxLbl);
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
            FontSize: "13dp"
        },
        color: "#e65e48",
        top: "0dp",
        right: "10dp",
        text: "Read more",
        id: "readMoreLbl"
    });
    $.__views.superScroll.add($.__views.readMoreLbl);
    $.__views.ironImage = Ti.UI.createImageView({
        top: "25dp",
        left: "10dp",
        id: "ironImage"
    });
    $.__views.superScroll.add($.__views.ironImage);
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
    $.__views.availableDesigLbl = Ti.UI.createLabel({
        font: {
            fontSize: "11dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        top: "30dp",
        left: "10dp",
        id: "availableDesigLbl"
    });
    $.__views.superScroll.add($.__views.availableDesigLbl);
    var __alloyId308 = [];
    $.__views.availableDesignScroll = Ti.UI.createScrollableView({
        width: Titanium.UI.FILL,
        views: __alloyId308,
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
    $.__views.__alloyId309 = Ti.UI.createView({
        top: "0dp",
        width: Titanium.UI.FILL,
        height: "40dp",
        touchEnabled: false,
        id: "__alloyId309"
    });
    $.__views.similarCollectionContainer.add($.__views.__alloyId309);
    $.__views.similarProductLbl = Ti.UI.createLabel({
        font: {
            fontSize: "11dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        left: "0dp",
        touchEnabled: false,
        id: "similarProductLbl"
    });
    $.__views.__alloyId309.add($.__views.similarProductLbl);
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
    $.__views.__alloyId309.add($.__views.curtainsrightArrow);
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
    $.__views.__alloyId310 = Ti.UI.createView({
        top: "0dp",
        width: Titanium.UI.FILL,
        height: "40dp",
        touchEnabled: false,
        id: "__alloyId310"
    });
    $.__views.alsoViewCollectionContainer.add($.__views.__alloyId310);
    $.__views.matchesBestWithLbl = Ti.UI.createLabel({
        font: {
            fontSize: "11dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        left: "0dp",
        touchEnabled: false,
        id: "matchesBestWithLbl"
    });
    $.__views.__alloyId310.add($.__views.matchesBestWithLbl);
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
    $.__views.__alloyId310.add($.__views.curtainsrightArrow);
    $.__views.estimateLbl = Ti.UI.createLabel({
        height: "40dp",
        bottom: "0dp",
        font: {
            fontSize: "10dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        left: "0dp",
        backgroundColor: "#b0b0b0",
        text: "ESTIMATE",
        id: "estimateLbl"
    });
    $.__views.collectionQdsDetails.add($.__views.estimateLbl);
    $.__views.whereToByeLbl = Ti.UI.createLabel({
        height: "40dp",
        bottom: "0dp",
        font: {
            fontSize: "10dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        right: "0dp",
        backgroundColor: "#e65e48",
        text: "WHERE TO BUY",
        id: "whereToByeLbl"
    });
    $.__views.collectionQdsDetails.add($.__views.whereToByeLbl);
    navigateToStoreLocater ? $.addListener($.__views.whereToByeLbl, "click", navigateToStoreLocater) : __defers["$.__views.whereToByeLbl!click!navigateToStoreLocater"] = true;
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
    $.__views.collectionQdsDetails.add($.__views.upArrowLbl);
    $.__views.previewImageScroll = Ti.UI.createScrollView({
        id: "previewImageScroll",
        scrollType: "horizontal",
        backgroundColor: "white",
        visible: false
    });
    $.__views.collectionQdsDetails.add($.__views.previewImageScroll);
    $.__views.preview_image = Ti.UI.createImageView({
        id: "preview_image"
    });
    $.__views.previewImageScroll.add($.__views.preview_image);
    $.__views.closeLbl = Ti.UI.createLabel({
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
        id: "closeLbl"
    });
    $.__views.collectionQdsDetails.add($.__views.closeLbl);
    $.__views.ratingContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        visible: false,
        backgroundColor: "#231f20",
        id: "ratingContainer"
    });
    $.__views.collectionQdsDetails.add($.__views.ratingContainer);
    $.__views.__alloyId311 = Ti.UI.createView({
        top: "0dp",
        width: Titanium.UI.FILL,
        height: "73dp",
        id: "__alloyId311"
    });
    $.__views.ratingContainer.add($.__views.__alloyId311);
    $.__views.__alloyId312 = Ti.UI.createView({
        top: "20dp",
        id: "__alloyId312"
    });
    $.__views.__alloyId311.add($.__views.__alloyId312);
    $.__views.__alloyId313 = Ti.UI.createLabel({
        left: "15dp",
        height: Titanium.UI.FILL,
        font: {
            fontSize: "15dp",
            fontFamily: "Futura Lt BT"
        },
        color: "#ffffff",
        text: "RATE THIS ITEM",
        id: "__alloyId313"
    });
    $.__views.__alloyId312.add($.__views.__alloyId313);
    $.__views.ratingCloseLbl = Ti.UI.createLabel({
        right: "15dp",
        width: "40dp",
        height: "40dp",
        font: {
            fontSize: "20dp",
            fontFamily: "icomoon"
        },
        color: "#ffffff",
        text: Alloy.Globals.icon.close,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "ratingCloseLbl"
    });
    $.__views.__alloyId312.add($.__views.ratingCloseLbl);
    $.__views.subRatingContainer = Ti.UI.createView({
        layout: "horizontal",
        top: "93dp",
        id: "subRatingContainer"
    });
    $.__views.ratingContainer.add($.__views.subRatingContainer);
    $.__views.rate1 = Ti.UI.createLabel({
        left: "20dp",
        font: {
            fontSize: "30dp",
            fontFamily: "icomoon"
        },
        color: "#fff",
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
        color: "#fff",
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
        color: "#fff",
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
        color: "#fff",
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
        color: "#fff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: Alloy.Globals.icon.rateOutline,
        id: "rate5",
        type: "rate",
        count: 5,
        value: 10
    });
    $.__views.subRatingContainer.add($.__views.rate5);
    $.__views.done = Ti.UI.createLabel({
        bottom: "15dp",
        width: "80%",
        height: "40dp",
        color: "#ffffff",
        borderColor: "#80e7e7e7",
        borderWidth: "0.5",
        backgroundColor: "transparent",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: "15dp"
        },
        text: "DONE",
        id: "done"
    });
    $.__views.ratingContainer.add($.__views.done);
    sendRating ? $.addListener($.__views.done, "click", sendRating) : __defers["$.__views.done!click!sendRating"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var argsData = args;
    var navigatedCollectionId = "";
    var gridListContainer = "";
    var productPrice = null;
    var shortlistData;
    var gaProductSku = "";
    var gaShortlistProduct = {};
    isNullVal(args.navigatedblockid) || (navigatedCollectionId = args.navigatedblockid);
    var measurement = "";
    measurement = require("alloy/measurement");
    var argsData_block = "";
    if (isNullVal(argsData.block)) argsData_block = "collection"; else {
        argsData_block = argsData.block;
        if ("collection" == argsData.block || "look" == argsData.block) {
            $.availableDesigLbl.text = "AVAILABLE DESIGNS";
            $.similarProductLbl.text = "SIMILAR PRODUCTS";
            $.matchesBestWithLbl.text = "MATCHES BEST WITH";
            $.storeLocator.type = "collection";
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
        } else if ("blinds" == argsData.block) {
            $.availableDesigLbl.text = "ALSO AVAILABLE IN TYPES";
            $.similarProductLbl.text = "SIMILAR PRODUCTS";
            $.matchesBestWithLbl.text = "PEOPLE ALSO VIEWED";
            $.storeLocator.type = "blinds";
            var text = Alloy.Globals.icon.requestSample + " REQUEST A FREE SAMPLE";
            var attr = Ti.UI.createAttributedString({
                text: text,
                attributes: [ {
                    type: Ti.UI.ATTRIBUTE_FONT,
                    value: {
                        fontSize: 10,
                        fontFamily: "futura_medium_bt-webfont"
                    },
                    range: [ text.indexOf("REQUEST A FREE SAMPLE"), "REQUEST A FREE SAMPLE".length ]
                } ]
            });
        }
        $.storeLocator.attributedString = attr;
        $.storeLocator.setTouchEnabled(false);
        $.storeLocator.setVisible(false);
    }
    var selectedView = [];
    var imageContainerArr = [];
    var similarQdsData = "";
    var matchBestWithData = "";
    var fabricCalculator = "";
    var productId, productName, colorView;
    var matchBestWithDataCount = "", similarQdsDataCount = "";
    var availabledesign_data_count = "";
    var image_data;
    var wishFlag;
    var sharingProductUrl = "";
    var previewImage = "";
    $.header.init({
        title: "DETAILS",
        passWindow: $.collectionQdsDetails
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
    $.readMoreLbl.addEventListener("click", readMoreToggle);
    $.whereToByeLbl.addEventListener("click", function() {
        Alloy.Globals.addWindowInNav("findStore");
    });
    $.upArrowLbl.removeEventListener("click", scrollToEffect);
    $.upArrowLbl.addEventListener("click", scrollToEffect);
    $.superScroll.addEventListener("touchend", upArrowEffect);
    $.collectionQdsDetails.removeEventListener("click", hideOverFlowMenu);
    $.collectionQdsDetails.addEventListener("click", hideOverFlowMenu);
    getCollectionQdsDetails(args);
    $.estimateLbl.addEventListener("click", function(e) {
        fabricCalculator = "";
        if (!isNullVal(argsData.block)) if ("collection" == argsData.block || "look" == argsData.block) {
            fabricCalculator = Alloy.createController("fabricCalculator", productPrice).getView();
            $.collectionQdsDetails.add(fabricCalculator);
            hideShowView(fabricCalculator);
        } else if ("blinds" == argsData.block) {
            e.source.calculatorValue.productName = productName;
            Alloy.Globals.addWindowInNav("estimate", e.source.calculatorValue);
        }
    });
    $.colorOptionScroll.addEventListener("click", function(e) {
        if ("fabricsColor" == e.source.type) {
            _.each($.colorOptionScroll.shades, function(value, k) {
                selectedView[value.product_id].backgroundColor = "transparent";
            });
            selectedView[e.source.id].backgroundColor = "#cccccc";
            closeOtherViews();
            var data = {
                Productid: e.source.productID,
                block: argsData_block,
                navigatedblockid: ""
            };
            $.superScroll.scrollTo(0, 0);
            getCollectionQdsDetails(data);
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
                block: argsData_block,
                navigatedblockid: ""
            };
            $.superScroll.scrollTo(0, 0);
            getCollectionQdsDetails(data);
        } else if ("VIEW ALL" == e.source.text) {
            var args_ = {
                block: argsData_block,
                slider: "availabledesign",
                productID: productId,
                navigatedblockid: navigatedCollectionId || "",
                type: "product"
            };
            Alloy.Globals.addWindowInNav("otherListingPage", args_);
        }
    });
    $.SuperSimilarCollection.addEventListener("click", productToggleEffect);
    $.wishIcon.addEventListener("click", checkshortlistItem);
    $.collectionImage.addEventListener("click", function(e) {
        var imageData = {
            product_id: productId,
            wish_flag: wishFlag,
            type: "shop",
            sharingProductUrl: sharingProductUrl,
            data: [ image_data ]
        };
        previewImage = Alloy.createController("imagePreview", imageData).getView();
        $.collectionQdsDetails.add(previewImage);
        hideShowView(previewImage);
    });
    $.closeLbl.addEventListener("click", function(e) {
        $.closeLbl.visible = false;
    });
    $.shareIcon.addEventListener("click", function(e) {
        shareImage(e.source.shareUrl);
    });
    $.ratingView.addEventListener("click", function(e) {
        isNullVal(Ti.App.Properties.getString("access_token")) ? Alloy.Globals.addWindowInNav("signIn", "estoreDetails") : hideShowView($.ratingContainer);
    });
    $.ratingCloseLbl.addEventListener("click", function(e) {
        hideShowView($.ratingContainer);
        setTimeout(function() {
            for (var i = 0; 5 > i; i++) {
                $.subRatingContainer.children[i].text = Alloy.Globals.icon.rateOutline;
                $.subRatingContainer.children[i].color = "#fff";
            }
        }, 1500);
    });
    $.subRatingContainer.addEventListener("click", rating);
    __defers["$.__views.collectionQdsDetails!android:back!goToBack"] && $.addListener($.__views.collectionQdsDetails, "android:back", goToBack);
    __defers["$.__views.collectionQdsDetails!focus!updateCount"] && $.addListener($.__views.collectionQdsDetails, "focus", updateCount);
    __defers["$.__views.collectionQdsDetails!close!destroyWindow"] && $.addListener($.__views.collectionQdsDetails, "close", destroyWindow);
    __defers["$.__views.storeLocator!click!navigateToStoreLocater"] && $.addListener($.__views.storeLocator, "click", navigateToStoreLocater);
    __defers["$.__views.whereToByeLbl!click!navigateToStoreLocater"] && $.addListener($.__views.whereToByeLbl, "click", navigateToStoreLocater);
    __defers["$.__views.done!click!sendRating"] && $.addListener($.__views.done, "click", sendRating);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;