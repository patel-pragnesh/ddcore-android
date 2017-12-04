var args = arguments[0] || {};
//Ti.API.info('args = ' + JSON.stringify(args));
var selectedView = [];
var imageContainerArr = [];
var colorView = "";
var similarCData = "";
var alsoViewCData = "";
var addShortlist = "";
var gridListContainer = "";
var viewAll = "";
var designColor = "";
var collectionId = "",
    collectionName = "",
    alsoViewCData_count = "",
    similarCData_count = "";
var available_design_Count = "";
var look_collectionID,
    look_collectionNAME,
    temp;
var previewImage = "";
var lookImage = "";
var sharingProductUrl = "";
var gaLeadProductArray = {};

$.header.init({
    title : "DETAILS",
    passWindow : $.productDetails,
});

$.header.updateCartCount();

$.collectionImageScroll.height = Alloy.Globals.platformWidth + 30;
$.opac.height = Alloy.Globals.platformWidth + 30;

var fabricsCollectionWidth = parseInt(Alloy.Globals.platformWidth - 20);
var fabricsInnerContainer = parseInt(fabricsCollectionWidth - 50);
var fabricsWidthHeight = parseInt(fabricsInnerContainer / 4);
var designContainer = parseInt(Alloy.Globals.platformWidth - 50);
var designWidth = parseInt(designContainer / 4);
$.availableDesignScroll.height = parseInt(designWidth + 20);

touchEffect.createTouchEffect($.storeLocator, "#a6ffffff", "#ffffff");

if (!isNullVal(args.type)) {
    if (args.type == "shopByLook") {
        $.collectionTitleLbl.text = "LOOK";
        $.similarCollectionLbl.text = "LOOKS BY THE SAME DESIGNER";
        $.peopleAlsoViewLbl.text = "PEOPLE ALSO VIEWED";
        $.availableDesigLbl.text = "PRODUCTS IN THIS LOOK";
        googleAnalyticsScreen("LOOK DETAIL");
    } else if (args.type == "collection") {
        $.collectionTitleLbl.text = "COLLECTION";
        $.similarCollectionLbl.text = "SIMILAR COLLECTIONS";
        $.peopleAlsoViewLbl.text = "PEOPLE ALSO VIEWED";
        $.availableDesigLbl.text = "AVAILABLE DESIGNS";
        googleAnalyticsScreen("COLLECTION DETAIL");
    }
}

$.readMoreLbl.addEventListener('click', readMoreToggle);

function readMoreToggle(e) {
    $.descriptionLbl.maxLines = 50;
    //$.descriptionLbl.height = Ti.UI.SIZE;
    $.readMoreLbl.text = "";
}

//var x = parseInt((Alloy.Globals.platformWidth * 1.7) * 3);
var x = (Alloy.Globals.platformWidth * 1.5) * 3;
var j = 1;
//var k = parseInt(x / 100);
var k = x / 100;

$.collectionImageScroll.addEventListener('touchstart', function(e) {
    $.collectionImageScroll.touched = true;
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

$.availableDesignScroll.addEventListener('click', function(e) {

    if (e.source.type == "availableDesign") {
        if (!isNullVal(args.type)) {
            if (args.type == "shopByLook") {
                var _args = {
                    Productid : e.source.id,
                    block : "look",
                    navigatedblockid : collectionId
                };
            } else if (args.type == "collection") {
                var _args = {
                    Productid : e.source.id,
                    block : "collection",
                    navigatedblockid : collectionId
                };
            }
        }
        Alloy.Globals.addWindowInNav("collectionQdsDetails", _args);
    } else if (e.source.text == "VIEW ALL") {

        if (!isNullVal(args.type)) {
            if (args.type == "shopByLook") {
                temp = {
                    block : "availabledesign",
                    //color : designColor || "",
                    lookID : collectionId,
                    type : "look_availabledesign",
                };
            } else if (args.type == "collection") {
                temp = {
                    block : "availabledesign",
                    color : designColor || "",
                    collectionID : collectionId,
                    type : "collection_availabledesign",
                };
            }
        }

        Alloy.Globals.addWindowInNav("otherListingPage", temp);
    }
});

$.wishIcon.addEventListener('click', function(e) {
    var collectionData = "";
    if (!isNullVal(Ti.App.Properties.getString("access_token"))) {
        if (!isNullVal(args.type)) {
            if (args.type == "shopByLook") {
                collectionData = {
                    collectionName : collectionName,
                    collectionId : collectionId,
                    type : "shopByLook"
                };

            } else if (args.type == "collection") {

                collectionData = {
                    collectionName : collectionName,
                    collectionId : collectionId,
                    type : "collection"
                };

            }
        }
        addShortlist = Alloy.createController('addToShortlist', collectionData).getView();
        $.productDetails.add(addShortlist);
        hideShowView(addShortlist);
    } else {
        //Alloy.Globals.addWindowInNav("signIn", "productDetails");
        Alloy.Globals.addWindowInNav("signIn", {
            listObject : e,
            listViewReference : updateItemListClick,
        });
    }

});

function updateItemListClick(e) {
    //Ti.API.info('into updateItemList-->' + JSON.stringify(e));
    $.wishIcon.fireEvent("click", e);
}

$.productDetails.addEventListener('click', hideOverFlowMenu);

function hideOverFlowMenu(e) {
    if (Alloy.Globals.overFlowFlag && e.source.id != "overFlowMenuLbl") {
        $.header.hideOverFlow();
    };
}

function getCollectionDetails(collectionData) {
    showLoader($.productDetails);
    if (!isNullVal(collectionData.type)) {
        if (collectionData.type == "shopByLook") {
            var url = Alloy.Globals.commonUrl.getlookDetail;

            var data = {
                lookID : collectionData.id //706
            };
        } else if (collectionData.type == "collection") {
            var url = Alloy.Globals.commonUrl.getCollectionDetail;

            var data = {
                collectionID : collectionData.id //706
            };
        }
    }
    var requestParams = JSON.stringify(data);

    Alloy.Globals.webServiceCall(url, requestParams, getCollectionDetailsSuccessCallback, getCollectionDetailsErrorCallback, "POST", $.productDetails, true);
}

getCollectionDetails(args);
var available_design_Count = "";
function getCollectionDetailsSuccessCallback(e) {
    //Ti.API.info('details success = ' + JSON.stringify(e));
    /*TODO*/

    if (!isNullVal(args.type) && !isNullVal((args.category))) {
        // temp comnt
        // Alloy.Globals.tracker.addEvent({
        // category : ((args.type).toUpperCase() || ""),
        // label : ((args.category).toUpperCase() || ""),
        // name : (e.data.name || ""),
        // action : (e.data.name || ""),
        // value : 1
        // });
        // end temp comnt
    }

    //  Ti.API.info('google anaytics ************ -->' + args.type + " \t " + args.category + "\t" + e.data.name);

    try {
        similarCData = "";
        alsoViewCData = "";
        $.superScroll.scrollTo(0, 0);
        if (!isNullVal(e.data.image)) {
            $.blurImage.image = encodeURI(e.data.image);
            $.collectionImage.image = encodeURI(e.data.image);
            //$.collectionImage.image ="http://dev.ddecor.com/media/store/00_01_ZBG_1.jpg";
            lookImage = e.data.image;
        } else {
            $.collectionImage.image = "";
            lookImage = "";
        }
        if (!isNullVal(e.data.collection_url)) {
            sharingProductUrl = e.data.collection_url;
            $.shareIcon.shareUrl = e.data.collection_url;
        } else {
            $.shareIcon.shareUrl = "";
        }

        if (args.type == "collection") {
            if (!isNullVal(e.data.description)) {
                $.descriptionLbl.maxLines = 3;
                $.readMoreLbl.text = "Read more";
                $.descriptionLbl.text = e.data.description;
                $.descriptionLbl.top = "15dp";
            } else {
                $.descriptionLbl.text = "";
                $.readMoreLbl.text = "";
                $.descriptionLbl.top = "0dp";
            }
        }

        if (!isNullVal(args.type)) {
            if (args.type == "shopByLook") {
                collectionId = e.data.look_id;
                $.availableDesignScroll.collectionID = e.data.look_id;
            } else if (args.type == "collection") {
                collectionId = e.data.collection_id;
                $.availableDesignScroll.collectionID = e.data.collection_id;
            }
        }

        if (!isNullVal(e.data.collection_id)) {
            collectionId = e.data.collection_id;
            $.availableDesignScroll.collectionID = e.data.collection_id;
        }
        if (!isNullVal(e.data.name)) {
            collectionName = e.data.name;
            $.collectionNameLbl.text = e.data.name.toUpperCase();
        } else {
            $.collectionNameLbl.text = "";
        }

        if (_.size(e.data.availableColors) > 0) {
            if ($.colorOptionScroll.getHeight() == "0dp") {
                $.colorOptionScroll.height = "55dp";
            }
            $.colorOptionScroll.colorData = e.data.availableColors;
            displayAvailableColors();

        } else {
            $.colorOptionScroll.colorData = "";
            $.colorOptionScroll.height = "0dp";
        }

        if (!isNullVal(e.data.availabledesign_data.response[0])) {

            if (args.type == "shopByLook") {
                $.availableDesigLbl.text = "PRODUCTS IN THIS LOOK";
            } else if (args.type == "collection") {
                $.availableDesigLbl.text = "AVAILABLE DESIGNS";
            }
            //Ti.API.info('in if');
            if ($.availableDesignScroll.getHeight() == "0dp") {
                $.availableDesignScroll.height = parseInt(designWidth + 20);
            }
            if ($.pageControlContainer.getVisible() == "false") {
                $.pageControlContainer.visible = true;
            }
            //Ti.API.info('available_design_Count = ' + available_design_Count);
            available_design_Count = e.data.availabledesign_data.total_count;
            //Ti.API.info('available_design_Count = ' + available_design_Count);
            showAvailableDesign(e.data.availabledesign_data.response);
        } else {
            //Ti.API.info('in else');
            available_design_Count = "";
            $.availableDesigLbl.text = "";
            $.availableDesignScroll.height = "0dp";
            $.pageControlContainer.visible = false;

        }

        if (!isNullVal(args.type)) {
            if (args.type == "shopByLook") {
                if (!isNullVal(e.data.similarlook_data.response[0])) {
                    if ($.similarCollectionContainer.getHeight() == "0dp") {
                        $.similarCollectionContainer.height = Titanium.UI.SIZE;
                        $.listSeperator.height = "1dp";
                    }
                    similarCData_count = e.data.similarlook_data.total_count;
                    similarCData = e.data.similarlook_data.response;
                } else {
                    similarCData_count = "";
                    similarCData = "";
                    $.similarCollectionContainer.height = "0dp";
                    $.listSeperator.height = "0dp";
                }

            } else if (args.type == "collection") {
                if (!isNullVal(e.data.similarcollection_data.response[0])) {
                    if ($.similarCollectionContainer.getHeight() == "0dp") {
                        $.similarCollectionContainer.height = Titanium.UI.SIZE;
                        $.listSeperator.height = "1dp";
                    }
                    similarCData_count = e.data.similarcollection_data.total_count;
                    similarCData = e.data.similarcollection_data.response;
                } else {
                    similarCData_count = "";
                    similarCData = "";
                    $.similarCollectionContainer.height = "0dp";
                    $.listSeperator.height = "0dp";
                }

            }
        }

        if (!isNullVal(e.data.peoplealsoviewed_data.response[0])) {
            if ($.alsoViewCollectionContainer.getHeight() == "0dp") {
                $.alsoViewCollectionContainer.height = Titanium.UI.SIZE;
                $.listSeperator.height = "1dp";
            }
            alsoViewCData_count = e.data.peoplealsoviewed_data.total_count;
            alsoViewCData = e.data.peoplealsoviewed_data.response;
        } else {
            alsoViewCData_count = "";
            alsoViewCData = "";
            $.alsoViewCollectionContainer.height = "0dp";
            $.listSeperator.height = "0dp";
        }

        hideLoader($.productDetails);

        googleAnalyticsDetail(collectionName + "(" + collectionId + ")");

        gaLeadProductArray = {
            name : collectionName,
            sku : collectionId
        };

    } catch(ex) {
        hideLoader($.productDetails);
        Ti.API.info('ex= catch' + (ex.message));
    }

}

function getCollectionDetailsErrorCallback(e) {
    hideLoader($.productDetails);
    Ti.API.info('error = ' + e);
}

/*
 * set collection available color
 */

function displayAvailableColors() {

    _.each($.colorOptionScroll.children, function(view, key) {
        $.colorOptionScroll.remove(view);
    });

    _.each($.colorOptionScroll.colorData, function(value, k) {

        selectedView[k] = Ti.UI.createView({
            width : "39dp",
            height : "39dp",
            left : "10dp",
            id : k,
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
            image : encodeURI(value),
            backgroundColor : "#f4f4f4"
        });

        selectedView[k].add(colorView);
        $.colorOptionScroll.add(selectedView[k]);
    });
}

$.colorOptionScroll.addEventListener('click', function(e) {
    var url = "",
        data = "";
    if (e.source.type == "fabricsColor") {

        _.each($.colorOptionScroll.colorData, function(value, k) {
            selectedView[k].backgroundColor = "transparent";
        });
        selectedView[e.source.id].backgroundColor = "#cccccc";

        /*
        * CALL COLOR OPTION API TO GET AVAILABLE DESIGN
        */

        //showLoader($.productDetails);
        showSliderLoader($.availableDesignContainer);
        if (!isNullVal(args.type)) {
            if (args.type == "shopByLook") {
                url = Alloy.Globals.commonUrl.lookFetchdesigns;

                data = {
                    lookID : collectionId, //706
                    color : e.source.id
                };
            } else if (args.type == "collection") {
                designColor = e.source.id;
                url = Alloy.Globals.commonUrl.fetchdesigns;

                data = {
                    collectionID : collectionId, //706
                    color : e.source.id
                };
            }
        }
        var requestParams = JSON.stringify(data);

        Alloy.Globals.webServiceCall(url, requestParams, getAvailableDesignSuccessCallback, getAvailableDesignErrorCallback, "POST", $.productDetails, true);
    }
});

function getAvailableDesignSuccessCallback(successData) {

    try {
        if (!isNullVal(successData.data.product_data[0])) {

            if ($.availableDesignScroll.getHeight() == "0dp") {
                if (!isNullVal(args.type)) {
                    if (args.type == "shopByLook") {
                        $.availableDesigLbl.text = "PRODUCTS IN THIS LOOK";
                    } else if (args.type == "collection") {
                        $.availableDesigLbl.text = "AVAILABLE DESIGNS";
                    }
                }
                $.availableDesignScroll.height = parseInt(designWidth + 20);
                $.pageControlContainer.visible = true;
            }
            available_design_Count = successData.data.total_count;
            showAvailableDesign(successData.data.product_data);
        } else {
            $.availableDesigLbl.text = "";
            $.availableDesignScroll.height = "0dp";
            $.pageControlContainer.visible = false;
        }
        hideSliderLoader($.availableDesignContainer);
    } catch(ex) {
        Ti.API.info('catch ex = ' + JSON.stringify(ex));
    }
}

function getAvailableDesignErrorCallback(erroeData) {
    hideLoader($.productDetails);
    Ti.API.info('erroeData = ' + JSON.stringify(erroeData));
}

function showAvailableDesign(availableProducts) {

    image = [];
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

            image[i] = Ti.UI.createImageView({
                width : designWidth,
                height : designWidth,
                top : "10dp",
                left : "10dp",
                text : i,
                id : value.product_id,
                type : "availableDesign",
                defaultImage : "/images/default_logo.png",
                image : encodeURI(value.image),
            });
            imageContainerArr[k].add(image[i]);

        });

        if (available_design_Count > 11) {
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
    if (available_design_Count > 4) {
        //Ti.API.info('inside if...' + available_design_Count);
        $.pageControlContainer.add(PagingControl($.availableDesignScroll));
    }

}

$.availableDesignScroll.addEventListener("scrollend", function(e) {
    var numberOfPages = $.availableDesignScroll.getViews().length;
    if (numberOfPages > 1) {
        //var numberOfPages = $.availableDesignScroll.getViews().length;
        for (var i = 0; i < numberOfPages; i++) {
            $.pageControlContainer.children[0].children[i].setBackgroundColor("#e7e7e7");
        }
        $.pageControlContainer.children[0].children[e.currentPage].setBackgroundColor("#e65e48");
    }
});

/*
 * set similar product data
 */

$.SuperSimilarCollection.addEventListener('click', productToggleEffect);

function productToggleEffect(e) {
    switch(e.source.id) {
    case "similarCollectionContainer":
        if (e.source.children.length == 1) {
            if (!isNullVal(args.type)) {
                if (args.type == "shopByLook") {
                    setSimilarData(similarCData, "similarlook", similarCData_count);
                } else if (args.type == "collection") {
                    setSimilarData(similarCData, "similarcollection", similarCData_count);
                }
            }

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
            if (!isNullVal(args.type)) {
                if (args.type == "shopByLook") {
                    setSimilarData(alsoViewCData, "peoplealsoviewed", alsoViewCData_count);
                } else if (args.type == "collection") {
                    setSimilarData(alsoViewCData, "peoplealsoviewed", alsoViewCData_count);
                }
            }
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
        var collectionData = "";
        if (!isNullVal(Ti.App.Properties.getString("access_token"))) {
            if (!isNullVal(args.type)) {
                if (args.type == "shopByLook") {
                    collectionData = {
                        collectionName : e.source.collectionName,
                        collectionId : e.source.collectionId,
                        type : "shopByLook"
                    };
                } else if (args.type == "collection") {
                    collectionData = {
                        collectionName : e.source.collectionName,
                        collectionId : e.source.collectionId,
                        type : "collection"
                    };
                }
            }

            addShortlist = Alloy.createController('addToShortlist', collectionData).getView();
            $.productDetails.add(addShortlist);
            hideShowView(addShortlist);
        } else {
            //  Alloy.Globals.addWindowInNav("signIn", "productDetails");

            Alloy.Globals.addWindowInNav("signIn", {
                listObject : e,
                listViewReference : productToggleEffect,
            });

        }

    } else if (e.source.id == "whereToBuy") {
        gaLeadProductArray = {};
        gaLeadProductArray = {
            name : e.source.collectionName,
            sku : e.source.collectionId
        };
        navigateToStoreLocater();
    } else if (e.source.id == "shareLbl") {
        //Ti.API.info('sharing url is '+e.source.shareUrl);
        // socialShare();
        // var shareProductUrl='http://dev.ddecor.com/collection/silky-satin';
        shareImage(e.source.shareUrl);
    } else {
        if (!isNullVal(e.source.collectionId)) {

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
            $.superScroll.scrollTo(0, 0);
            if (!isNullVal(args.type)) {
                if (args.type == "shopByLook") {
                    var tempArgs = {
                        id : e.source.collectionId,
                        type : "shopByLook"
                    };
                } else if (args.type == "collection") {
                    var tempArgs = {
                        id : e.source.collectionId,
                        type : "collection"
                    };
                }
            }

            getCollectionDetails(tempArgs);
        }
    }

}

function setSimilarData(similarCollectionData, block, count) {

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
            top : "20dp",
            width : parseInt((Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor) - 10),
            height : "35dp",
            font : {
                fontSize : "12sp",
            },
            color : "#333333",
            backgroundColor : "#f4f4f4",
            text : "VIEW ALL",
            block : block,
            collectionID : collectionId,
            textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
            bottom : "10dp"
        });
        gridListContainer.add(viewAll);

        touchEffect.createTouchEffect(viewAll, "#a6333333", "#333333");
        viewAll.addEventListener('click', function(e) {

            if (!isNullVal(args.type)) {
                if (args.type == "shopByLook") {
                    temp = {
                        block : e.source.block,
                        slider : e.source.block,
                        lookID : e.source.collectionID,
                        type : "shopByLook",
                    };
                } else if (args.type == "collection") {
                    temp = {
                        block : e.source.block,
                        slider : e.source.block,
                        collectionID : e.source.collectionID,
                        type : "collection",
                    };
                }
            }

            Alloy.Globals.addWindowInNav("otherListingPage", temp);
        });

    }
    _.each(similarCollectionData, function(value, k) {
        if (!isNullVal(args.type)) {
            if (args.type == "shopByLook") {
                look_collectionID = value.looks_id;
                look_collectionNAME = value.looks_name;
            } else if (args.type == "collection") {
                look_collectionID = value.collection_id;
                look_collectionNAME = value.collection_name;
            }
        }
        var product1 = Ti.UI.createView({
            left : "0dp",
            collectionId : look_collectionID,
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
            collectionId : look_collectionID,
            collectionName : look_collectionNAME,
        });
        $.addClass(image1, "productImage");
        imageContainer.add(image1);

        // var cart1 = Ti.UI.createLabel();
        // $.addClass(cart1, "cartIcon");
        // imageContainer.add(cart1);

        var shareContainer = Ti.UI.createView();
        $.addClass(shareContainer, "shareContainer");
        product1.add(shareContainer);

        var nameContainer = Ti.UI.createView();
        $.addClass(nameContainer, "nameContainer");
        shareContainer.add(nameContainer);

        var productName1 = Ti.UI.createLabel({
            text : look_collectionNAME,
            collectionId : look_collectionID,
            collectionName : look_collectionNAME,
        });
        $.addClass(productName1, "name");
        nameContainer.add(productName1);

        var wheretoBuy1 = Ti.UI.createLabel({
            text : "Where to buy",
            id : "whereToBuy",
            collectionId : look_collectionID,
            collectionName : look_collectionNAME,
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
            collectionId : look_collectionID,
            collectionName : look_collectionNAME,
            id : "shareLbl",
            shareUrl : value.collection_url,
        });
        //	$.addClass(shareIcon1, "share_wish_icon");

        shareContainer.add(shareIcon1);

        var wishIcon1 = Ti.UI.createLabel({
            right : "3dp",
            color : "#a6a6a6",
            font : {
                fontSize : "18dp",
                fontFamily : "icomoon"
            },
            top : "0dp",
            width : "35dp",
            height : "35dp",
            textAlign : Titanium.UI.TEXT_ALIGNMENT_RIGHT,
            text : Alloy.Globals.icon.shortlist,
            collectionId : look_collectionID,
            collectionName : look_collectionNAME,
            id : "wishLbl"
        });
        //$.addClass(wishIcon1, "share_wish_icon");
        shareContainer.add(wishIcon1);

    });

}

// $.upArrowLbl.addEventListener('click',scrollToEffect);
//
// function scrollToEffect(e){
// $.superScroll.scrollTo(0, 0);
// }
//
// $.superScroll.addEventListener('scroll',upArrowEffect);
//
// function upArrowEffect(e){
// var ycordinates = $.superScroll.contentOffset.y;
//
// if (ycordinates >= 30) {
// $.upArrowLbl.visible = true;
// setTimeout(function(){
// $.upArrowLbl.visible = false; }, 3000);
// } else if (ycordinates == 0) {
// $.upArrowLbl.visible = false;
// }
// }

// $.collectionImage.addEventListener('click', function(e) {
// $.collectionImageScroll.touched = true;
// Ti.API.info('image e = ' + JSON.stringify(e));
// });

$.collectionImage.addEventListener('click', function(e) {
    var imageData = "";
    var image_data = [];
    image_data = [lookImage];
    if (!isNullVal(args.type)) {
        if (args.type == "shopByLook") {
            imageData = {
                collectionId : collectionId,
                type : "shopByLook",
                collectionName : collectionName,
                sharingProductUrl : sharingProductUrl,
                data : image_data
            };
            previewImage = Alloy.createController('imagePreview', imageData).getView();
            $.productDetails.add(previewImage);
            hideShowView(previewImage);
        } else if (args.type == "collection") {
            imageData = {
                collectionId : collectionId,
                type : "collection",
                sharingProductUrl : sharingProductUrl,
                collectionName : collectionName,

            };
            previewImage = Alloy.createController('imagePreview', imageData).getView();
            $.productDetails.add(previewImage);
            hideShowView(previewImage);
        }
    }

});

function navigateToStoreLocater() {
    Alloy.Globals.addWindowInNav("findStore");

    generateLead(gaLeadProductArray, collectionName + "DETAIL");
}

function goToBack() {
    //Ti.API.info('addShortlist = ' + JSON.stringify(addShortlist));

    if (addShortlist.type == "shortlist") {
        //Ti.API.info('if 1');
        hideShowView(addShortlist);
        addShortlist = "";
    } else if (previewImage.type == "imagePreview") {
        //Ti.API.info('if 2');
        //Ti.API.info('previewImagafeDAta');
        //Ti.API.info(JSON.stringify(previewImage.type));
        hideShowView(previewImage);
        previewImage = "";
    } else {
        $.productDetails.removeEventListener('click', hideOverFlowMenu);
        $.SuperSimilarCollection.removeEventListener('click', productToggleEffect);

        //args = {};
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
    //Ti.API.info('product Details focus');
    $.header.updateCartCount();
}

$.shareIcon.addEventListener('click', function(e) {
    //Ti.API.info(JSON.stringify(e.source));
    //Ti.API.info('sharing url is '+e.source.shareUrl);
    // socialShare();
    // var shareProductUrl='http://dev.ddecor.com/collection/silky-satin';
    shareImage(e.source.shareUrl);

});
