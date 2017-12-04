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
        $.descriptionLbl.maxLines = 50;
        $.readMoreLbl.text = "";
    }
    function updateItemListClick(e) {
        $.wishIcon.fireEvent("click", e);
    }
    function hideOverFlowMenu(e) {
        Alloy.Globals.overFlowFlag && "overFlowMenuLbl" != e.source.id && $.header.hideOverFlow();
    }
    function getCollectionDetails(collectionData) {
        showLoader($.productDetails);
        if (!isNullVal(collectionData.type)) if ("shopByLook" == collectionData.type) {
            var url = Alloy.Globals.commonUrl.getlookDetail;
            var data = {
                lookID: collectionData.id
            };
        } else if ("collection" == collectionData.type) {
            var url = Alloy.Globals.commonUrl.getCollectionDetail;
            var data = {
                collectionID: collectionData.id
            };
        }
        var requestParams = JSON.stringify(data);
        Alloy.Globals.webServiceCall(url, requestParams, getCollectionDetailsSuccessCallback, getCollectionDetailsErrorCallback, "POST", $.productDetails, true);
    }
    function getCollectionDetailsSuccessCallback(e) {
        !isNullVal(args.type) && !isNullVal(args.category);
        try {
            similarCData = "";
            alsoViewCData = "";
            $.superScroll.scrollTo(0, 0);
            if (isNullVal(e.data.image)) {
                $.collectionImage.image = "";
                lookImage = "";
            } else {
                $.blurImage.image = encodeURI(e.data.image);
                $.collectionImage.image = encodeURI(e.data.image);
                lookImage = e.data.image;
            }
            if (isNullVal(e.data.collection_url)) $.shareIcon.shareUrl = ""; else {
                sharingProductUrl = e.data.collection_url;
                $.shareIcon.shareUrl = e.data.collection_url;
            }
            if ("collection" == args.type) if (isNullVal(e.data.description)) {
                $.descriptionLbl.text = "";
                $.readMoreLbl.text = "";
                $.descriptionLbl.top = "0dp";
            } else {
                $.descriptionLbl.maxLines = 3;
                $.readMoreLbl.text = "Read more";
                $.descriptionLbl.text = e.data.description;
                $.descriptionLbl.top = "15dp";
            }
            if (!isNullVal(args.type)) if ("shopByLook" == args.type) {
                collectionId = e.data.look_id;
                $.availableDesignScroll.collectionID = e.data.look_id;
            } else if ("collection" == args.type) {
                collectionId = e.data.collection_id;
                $.availableDesignScroll.collectionID = e.data.collection_id;
            }
            if (!isNullVal(e.data.collection_id)) {
                collectionId = e.data.collection_id;
                $.availableDesignScroll.collectionID = e.data.collection_id;
            }
            if (isNullVal(e.data.name)) $.collectionNameLbl.text = ""; else {
                collectionName = e.data.name;
                $.collectionNameLbl.text = e.data.name.toUpperCase();
            }
            if (_.size(e.data.availableColors) > 0) {
                "0dp" == $.colorOptionScroll.getHeight() && ($.colorOptionScroll.height = "55dp");
                $.colorOptionScroll.colorData = e.data.availableColors;
                displayAvailableColors();
            } else {
                $.colorOptionScroll.colorData = "";
                $.colorOptionScroll.height = "0dp";
            }
            if (isNullVal(e.data.availabledesign_data.response[0])) {
                available_design_Count = "";
                $.availableDesigLbl.text = "";
                $.availableDesignScroll.height = "0dp";
                $.pageControlContainer.visible = false;
            } else {
                "shopByLook" == args.type ? $.availableDesigLbl.text = "PRODUCTS IN THIS LOOK" : "collection" == args.type && ($.availableDesigLbl.text = "AVAILABLE DESIGNS");
                "0dp" == $.availableDesignScroll.getHeight() && ($.availableDesignScroll.height = parseInt(designWidth + 20));
                "false" == $.pageControlContainer.getVisible() && ($.pageControlContainer.visible = true);
                available_design_Count = e.data.availabledesign_data.total_count;
                showAvailableDesign(e.data.availabledesign_data.response);
            }
            if (!isNullVal(args.type)) if ("shopByLook" == args.type) if (isNullVal(e.data.similarlook_data.response[0])) {
                similarCData_count = "";
                similarCData = "";
                $.similarCollectionContainer.height = "0dp";
                $.listSeperator.height = "0dp";
            } else {
                if ("0dp" == $.similarCollectionContainer.getHeight()) {
                    $.similarCollectionContainer.height = Titanium.UI.SIZE;
                    $.listSeperator.height = "1dp";
                }
                similarCData_count = e.data.similarlook_data.total_count;
                similarCData = e.data.similarlook_data.response;
            } else if ("collection" == args.type) if (isNullVal(e.data.similarcollection_data.response[0])) {
                similarCData_count = "";
                similarCData = "";
                $.similarCollectionContainer.height = "0dp";
                $.listSeperator.height = "0dp";
            } else {
                if ("0dp" == $.similarCollectionContainer.getHeight()) {
                    $.similarCollectionContainer.height = Titanium.UI.SIZE;
                    $.listSeperator.height = "1dp";
                }
                similarCData_count = e.data.similarcollection_data.total_count;
                similarCData = e.data.similarcollection_data.response;
            }
            if (isNullVal(e.data.peoplealsoviewed_data.response[0])) {
                alsoViewCData_count = "";
                alsoViewCData = "";
                $.alsoViewCollectionContainer.height = "0dp";
                $.listSeperator.height = "0dp";
            } else {
                if ("0dp" == $.alsoViewCollectionContainer.getHeight()) {
                    $.alsoViewCollectionContainer.height = Titanium.UI.SIZE;
                    $.listSeperator.height = "1dp";
                }
                alsoViewCData_count = e.data.peoplealsoviewed_data.total_count;
                alsoViewCData = e.data.peoplealsoviewed_data.response;
            }
            hideLoader($.productDetails);
            googleAnalyticsDetail(collectionName + "(" + collectionId + ")");
            gaLeadProductArray = {
                name: collectionName,
                sku: collectionId
            };
        } catch (ex) {
            hideLoader($.productDetails);
            Ti.API.info("ex= catch" + ex.message);
        }
    }
    function getCollectionDetailsErrorCallback(e) {
        hideLoader($.productDetails);
        Ti.API.info("error = " + e);
    }
    function displayAvailableColors() {
        _.each($.colorOptionScroll.children, function(view, key) {
            $.colorOptionScroll.remove(view);
        });
        _.each($.colorOptionScroll.colorData, function(value, k) {
            selectedView[k] = Ti.UI.createView({
                width: "39dp",
                height: "39dp",
                left: "10dp",
                id: k,
                type: "fabricsColor",
                borderColor: "transparent"
            });
            colorView = Ti.UI.createImageView({
                width: "30dp",
                height: "30dp",
                id: k,
                touchEnabled: false,
                defaultImage: "/images/default_logo.png",
                image: encodeURI(value),
                backgroundColor: "#f4f4f4"
            });
            selectedView[k].add(colorView);
            $.colorOptionScroll.add(selectedView[k]);
        });
    }
    function getAvailableDesignSuccessCallback(successData) {
        try {
            if (isNullVal(successData.data.product_data[0])) {
                $.availableDesigLbl.text = "";
                $.availableDesignScroll.height = "0dp";
                $.pageControlContainer.visible = false;
            } else {
                if ("0dp" == $.availableDesignScroll.getHeight()) {
                    isNullVal(args.type) || ("shopByLook" == args.type ? $.availableDesigLbl.text = "PRODUCTS IN THIS LOOK" : "collection" == args.type && ($.availableDesigLbl.text = "AVAILABLE DESIGNS"));
                    $.availableDesignScroll.height = parseInt(designWidth + 20);
                    $.pageControlContainer.visible = true;
                }
                available_design_Count = successData.data.total_count;
                showAvailableDesign(successData.data.product_data);
            }
            hideSliderLoader($.availableDesignContainer);
        } catch (ex) {
            Ti.API.info("catch ex = " + JSON.stringify(ex));
        }
    }
    function getAvailableDesignErrorCallback(erroeData) {
        hideLoader($.productDetails);
        Ti.API.info("erroeData = " + JSON.stringify(erroeData));
    }
    function showAvailableDesign(availableProducts) {
        image = [];
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
                image[i] = Ti.UI.createImageView({
                    width: designWidth,
                    height: designWidth,
                    top: "10dp",
                    left: "10dp",
                    text: i,
                    id: value.product_id,
                    type: "availableDesign",
                    defaultImage: "/images/default_logo.png",
                    image: encodeURI(value.image)
                });
                imageContainerArr[k].add(image[i]);
            });
            if (available_design_Count > 11) {
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
        available_design_Count > 4 && $.pageControlContainer.add(PagingControl($.availableDesignScroll));
    }
    function productToggleEffect(e) {
        switch (e.source.id) {
          case "similarCollectionContainer":
            if (1 == e.source.children.length) {
                isNullVal(args.type) || ("shopByLook" == args.type ? setSimilarData(similarCData, "similarlook", similarCData_count) : "collection" == args.type && setSimilarData(similarCData, "similarcollection", similarCData_count));
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
                isNullVal(args.type) || ("shopByLook" == args.type ? setSimilarData(alsoViewCData, "peoplealsoviewed", alsoViewCData_count) : "collection" == args.type && setSimilarData(alsoViewCData, "peoplealsoviewed", alsoViewCData_count));
                e.source.add(gridListContainer);
                e.source.children[0].children[1].text = Alloy.Globals.icon.dropDown;
                $.superScroll.scrollToBottom();
            } else {
                e.source.children[0].children[1].text = Alloy.Globals.icon.downArrow;
                e.source.remove(e.source.children[1]);
                e.source.children[1] = null;
            }
        }
        if ("wishLbl" == e.source.id) {
            var collectionData = "";
            if (isNullVal(Ti.App.Properties.getString("access_token"))) Alloy.Globals.addWindowInNav("signIn", {
                listObject: e,
                listViewReference: productToggleEffect
            }); else {
                isNullVal(args.type) || ("shopByLook" == args.type ? collectionData = {
                    collectionName: e.source.collectionName,
                    collectionId: e.source.collectionId,
                    type: "shopByLook"
                } : "collection" == args.type && (collectionData = {
                    collectionName: e.source.collectionName,
                    collectionId: e.source.collectionId,
                    type: "collection"
                }));
                addShortlist = Alloy.createController("addToShortlist", collectionData).getView();
                $.productDetails.add(addShortlist);
                hideShowView(addShortlist);
            }
        } else if ("whereToBuy" == e.source.id) {
            gaLeadProductArray = {};
            gaLeadProductArray = {
                name: e.source.collectionName,
                sku: e.source.collectionId
            };
            navigateToStoreLocater();
        } else if ("shareLbl" == e.source.id) shareImage(e.source.shareUrl); else if (!isNullVal(e.source.collectionId)) {
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
            $.superScroll.scrollTo(0, 0);
            if (!isNullVal(args.type)) if ("shopByLook" == args.type) var tempArgs = {
                id: e.source.collectionId,
                type: "shopByLook"
            }; else if ("collection" == args.type) var tempArgs = {
                id: e.source.collectionId,
                type: "collection"
            };
            getCollectionDetails(tempArgs);
        }
    }
    function setSimilarData(similarCollectionData, block, count) {
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
                top: "20dp",
                width: parseInt(Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor - 10),
                height: "35dp",
                font: {
                    fontSize: "12sp"
                },
                color: "#333333",
                backgroundColor: "#f4f4f4",
                text: "VIEW ALL",
                block: block,
                collectionID: collectionId,
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                bottom: "10dp"
            });
            gridListContainer.add(viewAll);
            touchEffect.createTouchEffect(viewAll, "#a6333333", "#333333");
            viewAll.addEventListener("click", function(e) {
                isNullVal(args.type) || ("shopByLook" == args.type ? temp = {
                    block: e.source.block,
                    slider: e.source.block,
                    lookID: e.source.collectionID,
                    type: "shopByLook"
                } : "collection" == args.type && (temp = {
                    block: e.source.block,
                    slider: e.source.block,
                    collectionID: e.source.collectionID,
                    type: "collection"
                }));
                Alloy.Globals.addWindowInNav("otherListingPage", temp);
            });
        }
        _.each(similarCollectionData, function(value, k) {
            if (!isNullVal(args.type)) if ("shopByLook" == args.type) {
                look_collectionID = value.looks_id;
                look_collectionNAME = value.looks_name;
            } else if ("collection" == args.type) {
                look_collectionID = value.collection_id;
                look_collectionNAME = value.collection_name;
            }
            var product1 = Ti.UI.createView({
                left: "0dp",
                collectionId: look_collectionID,
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
                collectionId: look_collectionID,
                collectionName: look_collectionNAME
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
                text: look_collectionNAME,
                collectionId: look_collectionID,
                collectionName: look_collectionNAME
            });
            $.addClass(productName1, "name");
            nameContainer.add(productName1);
            var wheretoBuy1 = Ti.UI.createLabel({
                text: "Where to buy",
                id: "whereToBuy",
                collectionId: look_collectionID,
                collectionName: look_collectionNAME
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
                collectionId: look_collectionID,
                collectionName: look_collectionNAME,
                id: "shareLbl",
                shareUrl: value.collection_url
            });
            shareContainer.add(shareIcon1);
            var wishIcon1 = Ti.UI.createLabel({
                right: "3dp",
                color: "#a6a6a6",
                font: {
                    fontSize: "18dp",
                    fontFamily: "icomoon"
                },
                top: "0dp",
                width: "35dp",
                height: "35dp",
                textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
                text: Alloy.Globals.icon.shortlist,
                collectionId: look_collectionID,
                collectionName: look_collectionNAME,
                id: "wishLbl"
            });
            shareContainer.add(wishIcon1);
        });
    }
    function navigateToStoreLocater() {
        Alloy.Globals.addWindowInNav("findStore");
        generateLead(gaLeadProductArray, collectionName + "DETAIL");
    }
    function goToBack() {
        if ("shortlist" == addShortlist.type) {
            hideShowView(addShortlist);
            addShortlist = "";
        } else if ("imagePreview" == previewImage.type) {
            hideShowView(previewImage);
            previewImage = "";
        } else {
            $.productDetails.removeEventListener("click", hideOverFlowMenu);
            $.SuperSimilarCollection.removeEventListener("click", productToggleEffect);
            Alloy.Globals.popWindowInNav();
            $.productDetails.close();
        }
    }
    function destroyWindow(e) {
        $.removeListener();
        $.productDetails.remove($.superScroll);
        $.superScroll.removeAllChildren();
        args = {};
        selectedView = [];
        imageContainerArr = [];
        colorView = null;
        similarCData = null;
        alsoViewCData = null;
        addShortlist = null;
        gridListContainer = null;
        viewAll = null;
        designColor = null;
        collectionId = null;
        collectionName = null;
        alsoViewCData_count = null;
        similarCData_count = null;
        available_design_Count = null;
        look_collectionID = null;
        look_collectionNAME = null;
        temp = null;
        previewImage = null;
        lookImage = null;
        sharingProductUrl = null;
        $.destroy();
    }
    function updateCount() {
        $.header.updateCartCount();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "productDetails";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.productDetails = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        backgroundColor: "#ffffff",
        id: "productDetails"
    });
    $.__views.productDetails && $.addTopLevelView($.__views.productDetails);
    goToBack ? $.addListener($.__views.productDetails, "android:back", goToBack) : __defers["$.__views.productDetails!android:back!goToBack"] = true;
    updateCount ? $.addListener($.__views.productDetails, "focus", updateCount) : __defers["$.__views.productDetails!focus!updateCount"] = true;
    destroyWindow ? $.addListener($.__views.productDetails, "close", destroyWindow) : __defers["$.__views.productDetails!close!destroyWindow"] = true;
    $.__views.header = Alloy.createWidget("headerView", "widget", {
        id: "header",
        __parentSymbol: $.__views.productDetails
    });
    $.__views.header.setParent($.__views.productDetails);
    $.__views.superScroll = Ti.UI.createScrollView({
        top: "53dp",
        scrollType: "vertical",
        layout: "vertical",
        id: "superScroll"
    });
    $.__views.productDetails.add($.__views.superScroll);
    $.__views.collectionImageContainer = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        id: "collectionImageContainer"
    });
    $.__views.superScroll.add($.__views.collectionImageContainer);
    $.__views.collectionImageScroll = Ti.UI.createScrollView({
        left: "0dp",
        top: "0dp",
        contentWidth: "100%",
        scrollType: "horizontal",
        id: "collectionImageScroll",
        touched: false
    });
    $.__views.collectionImageContainer.add($.__views.collectionImageScroll);
    $.__views.blurImage = Ti.UI.createImageView({
        height: Titanium.UI.FILL,
        defaultImage: "/images/default_logo.png",
        id: "blurImage",
        width: "100%",
        zIndex: 2
    });
    $.__views.collectionImageScroll.add($.__views.blurImage);
    $.__views.collectionImage = Ti.UI.createImageView({
        zIndex: 8,
        defaultImage: "/images/default_logo.png",
        id: "collectionImage",
        height: Titanium.UI.FILL,
        type: "image"
    });
    $.__views.collectionImageScroll.add($.__views.collectionImage);
    $.__views.__alloyId1253 = Ti.UI.createView({
        height: Titanium.UI.FILL,
        backgroundColor: "#d9231f20",
        width: "100%",
        zIndex: 4,
        id: "__alloyId1253"
    });
    $.__views.collectionImageScroll.add($.__views.__alloyId1253);
    $.__views.__alloyId1254 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        bottom: "0dp",
        layout: "vertical",
        zIndex: 100,
        id: "__alloyId1254"
    });
    $.__views.collectionImageContainer.add($.__views.__alloyId1254);
    $.__views.collectionTitleLbl = Ti.UI.createLabel({
        font: {
            fontSize: "10dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        top: "0dp",
        height: "20dp",
        id: "collectionTitleLbl"
    });
    $.__views.__alloyId1254.add($.__views.collectionTitleLbl);
    $.__views.collectionNameLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "25sp"
        },
        color: "#ffffff",
        top: "5dp",
        width: "90%",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "collectionNameLbl"
    });
    $.__views.__alloyId1254.add($.__views.collectionNameLbl);
    $.__views.__alloyId1255 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        bottom: 10,
        id: "__alloyId1255"
    });
    $.__views.__alloyId1254.add($.__views.__alloyId1255);
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
    $.__views.__alloyId1255.add($.__views.wishIcon);
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
    $.__views.__alloyId1255.add($.__views.shareIcon);
    $.__views.opac = Ti.UI.createView({
        width: Titanium.UI.FILL,
        backgroundGradient: {
            type: "linear",
            colors: [ {
                color: "#000000",
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
                y: "55%"
            },
            backFillStart: false
        },
        touchEnabled: false,
        id: "opac"
    });
    $.__views.collectionImageContainer.add($.__views.opac);
    $.__views.colorOptionScroll = Ti.UI.createScrollView({
        width: Titanium.UI.FILL,
        height: "55dp",
        layout: "horizontal",
        scrollType: "horizontal",
        backgroundColor: "#a6f2f2f2",
        id: "colorOptionScroll"
    });
    $.__views.superScroll.add($.__views.colorOptionScroll);
    $.__views.__alloyId1256 = Ti.UI.createView({
        height: "0.5dp",
        width: Titanium.UI.FILL,
        backgroundColor: "#999999",
        id: "__alloyId1256"
    });
    $.__views.superScroll.add($.__views.__alloyId1256);
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
        id: "readMoreLbl"
    });
    $.__views.superScroll.add($.__views.readMoreLbl);
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
    $.__views.availableDesignContainer = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        id: "availableDesignContainer"
    });
    $.__views.superScroll.add($.__views.availableDesignContainer);
    var __alloyId1257 = [];
    $.__views.availableDesignScroll = Ti.UI.createScrollableView({
        width: Titanium.UI.FILL,
        views: __alloyId1257,
        id: "availableDesignScroll"
    });
    $.__views.availableDesignContainer.add($.__views.availableDesignScroll);
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
    $.__views.__alloyId1258 = Ti.UI.createView({
        top: "0dp",
        width: Titanium.UI.FILL,
        height: "40dp",
        touchEnabled: false,
        id: "__alloyId1258"
    });
    $.__views.similarCollectionContainer.add($.__views.__alloyId1258);
    $.__views.similarCollectionLbl = Ti.UI.createLabel({
        font: {
            fontSize: "11dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        left: "0dp",
        touchEnabled: false,
        id: "similarCollectionLbl"
    });
    $.__views.__alloyId1258.add($.__views.similarCollectionLbl);
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
    $.__views.__alloyId1258.add($.__views.curtainsrightArrow);
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
    $.__views.__alloyId1259 = Ti.UI.createView({
        top: "0dp",
        width: Titanium.UI.FILL,
        height: "40dp",
        touchEnabled: false,
        id: "__alloyId1259"
    });
    $.__views.alsoViewCollectionContainer.add($.__views.__alloyId1259);
    $.__views.peopleAlsoViewLbl = Ti.UI.createLabel({
        font: {
            fontSize: "11dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        left: "0dp",
        touchEnabled: false,
        id: "peopleAlsoViewLbl"
    });
    $.__views.__alloyId1259.add($.__views.peopleAlsoViewLbl);
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
    $.__views.__alloyId1259.add($.__views.curtainsrightArrow);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var selectedView = [];
    var imageContainerArr = [];
    var colorView = "";
    var similarCData = "";
    var alsoViewCData = "";
    var addShortlist = "";
    var gridListContainer = "";
    var viewAll = "";
    var designColor = "";
    var collectionId = "", collectionName = "", alsoViewCData_count = "", similarCData_count = "";
    var available_design_Count = "";
    var look_collectionID, look_collectionNAME, temp;
    var previewImage = "";
    var lookImage = "";
    var sharingProductUrl = "";
    var gaLeadProductArray = {};
    $.header.init({
        title: "DETAILS",
        passWindow: $.productDetails
    });
    $.header.updateCartCount();
    $.collectionImageScroll.height = Alloy.Globals.platformWidth + 30;
    $.opac.height = Alloy.Globals.platformWidth + 30;
    var fabricsCollectionWidth = parseInt(Alloy.Globals.platformWidth - 20);
    var fabricsInnerContainer = parseInt(fabricsCollectionWidth - 50);
    parseInt(fabricsInnerContainer / 4);
    var designContainer = parseInt(Alloy.Globals.platformWidth - 50);
    var designWidth = parseInt(designContainer / 4);
    $.availableDesignScroll.height = parseInt(designWidth + 20);
    touchEffect.createTouchEffect($.storeLocator, "#a6ffffff", "#ffffff");
    if (!isNullVal(args.type)) if ("shopByLook" == args.type) {
        $.collectionTitleLbl.text = "LOOK";
        $.similarCollectionLbl.text = "LOOKS BY THE SAME DESIGNER";
        $.peopleAlsoViewLbl.text = "PEOPLE ALSO VIEWED";
        $.availableDesigLbl.text = "PRODUCTS IN THIS LOOK";
        googleAnalyticsScreen("LOOK DETAIL");
    } else if ("collection" == args.type) {
        $.collectionTitleLbl.text = "COLLECTION";
        $.similarCollectionLbl.text = "SIMILAR COLLECTIONS";
        $.peopleAlsoViewLbl.text = "PEOPLE ALSO VIEWED";
        $.availableDesigLbl.text = "AVAILABLE DESIGNS";
        googleAnalyticsScreen("COLLECTION DETAIL");
    }
    $.readMoreLbl.addEventListener("click", readMoreToggle);
    var x = 1.5 * Alloy.Globals.platformWidth * 3;
    $.collectionImageScroll.addEventListener("touchstart", function(e) {
        $.collectionImageScroll.touched = true;
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
    $.availableDesignScroll.addEventListener("click", function(e) {
        if ("availableDesign" == e.source.type) {
            if (!isNullVal(args.type)) if ("shopByLook" == args.type) var _args = {
                Productid: e.source.id,
                block: "look",
                navigatedblockid: collectionId
            }; else if ("collection" == args.type) var _args = {
                Productid: e.source.id,
                block: "collection",
                navigatedblockid: collectionId
            };
            Alloy.Globals.addWindowInNav("collectionQdsDetails", _args);
        } else if ("VIEW ALL" == e.source.text) {
            isNullVal(args.type) || ("shopByLook" == args.type ? temp = {
                block: "availabledesign",
                lookID: collectionId,
                type: "look_availabledesign"
            } : "collection" == args.type && (temp = {
                block: "availabledesign",
                color: designColor || "",
                collectionID: collectionId,
                type: "collection_availabledesign"
            }));
            Alloy.Globals.addWindowInNav("otherListingPage", temp);
        }
    });
    $.wishIcon.addEventListener("click", function(e) {
        var collectionData = "";
        if (isNullVal(Ti.App.Properties.getString("access_token"))) Alloy.Globals.addWindowInNav("signIn", {
            listObject: e,
            listViewReference: updateItemListClick
        }); else {
            isNullVal(args.type) || ("shopByLook" == args.type ? collectionData = {
                collectionName: collectionName,
                collectionId: collectionId,
                type: "shopByLook"
            } : "collection" == args.type && (collectionData = {
                collectionName: collectionName,
                collectionId: collectionId,
                type: "collection"
            }));
            addShortlist = Alloy.createController("addToShortlist", collectionData).getView();
            $.productDetails.add(addShortlist);
            hideShowView(addShortlist);
        }
    });
    $.productDetails.addEventListener("click", hideOverFlowMenu);
    getCollectionDetails(args);
    var available_design_Count = "";
    $.colorOptionScroll.addEventListener("click", function(e) {
        var url = "", data = "";
        if ("fabricsColor" == e.source.type) {
            _.each($.colorOptionScroll.colorData, function(value, k) {
                selectedView[k].backgroundColor = "transparent";
            });
            selectedView[e.source.id].backgroundColor = "#cccccc";
            showSliderLoader($.availableDesignContainer);
            if (!isNullVal(args.type)) if ("shopByLook" == args.type) {
                url = Alloy.Globals.commonUrl.lookFetchdesigns;
                data = {
                    lookID: collectionId,
                    color: e.source.id
                };
            } else if ("collection" == args.type) {
                designColor = e.source.id;
                url = Alloy.Globals.commonUrl.fetchdesigns;
                data = {
                    collectionID: collectionId,
                    color: e.source.id
                };
            }
            var requestParams = JSON.stringify(data);
            Alloy.Globals.webServiceCall(url, requestParams, getAvailableDesignSuccessCallback, getAvailableDesignErrorCallback, "POST", $.productDetails, true);
        }
    });
    $.availableDesignScroll.addEventListener("scrollend", function(e) {
        var numberOfPages = $.availableDesignScroll.getViews().length;
        if (numberOfPages > 1) {
            for (var i = 0; numberOfPages > i; i++) $.pageControlContainer.children[0].children[i].setBackgroundColor("#e7e7e7");
            $.pageControlContainer.children[0].children[e.currentPage].setBackgroundColor("#e65e48");
        }
    });
    $.SuperSimilarCollection.addEventListener("click", productToggleEffect);
    $.collectionImage.addEventListener("click", function(e) {
        var imageData = "";
        var image_data = [];
        image_data = [ lookImage ];
        if (!isNullVal(args.type)) if ("shopByLook" == args.type) {
            imageData = {
                collectionId: collectionId,
                type: "shopByLook",
                collectionName: collectionName,
                sharingProductUrl: sharingProductUrl,
                data: image_data
            };
            previewImage = Alloy.createController("imagePreview", imageData).getView();
            $.productDetails.add(previewImage);
            hideShowView(previewImage);
        } else if ("collection" == args.type) {
            imageData = {
                collectionId: collectionId,
                type: "collection",
                sharingProductUrl: sharingProductUrl,
                collectionName: collectionName
            };
            previewImage = Alloy.createController("imagePreview", imageData).getView();
            $.productDetails.add(previewImage);
            hideShowView(previewImage);
        }
    });
    $.shareIcon.addEventListener("click", function(e) {
        shareImage(e.source.shareUrl);
    });
    __defers["$.__views.productDetails!android:back!goToBack"] && $.addListener($.__views.productDetails, "android:back", goToBack);
    __defers["$.__views.productDetails!focus!updateCount"] && $.addListener($.__views.productDetails, "focus", updateCount);
    __defers["$.__views.productDetails!close!destroyWindow"] && $.addListener($.__views.productDetails, "close", destroyWindow);
    __defers["$.__views.storeLocator!click!navigateToStoreLocater"] && $.addListener($.__views.storeLocator, "click", navigateToStoreLocater);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;