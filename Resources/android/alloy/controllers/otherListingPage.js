function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function setAttributeStr(type) {
        var text = "VIEW TYPE " + type;
        var attr = Ti.UI.createAttributedString({
            text: text,
            attributes: [ {
                type: Ti.UI.ATTRIBUTE_FONT,
                value: {
                    fontSize: 10,
                    fontFamily: "futura_medium_bt-webfont"
                },
                range: [ text.indexOf(type + ""), (type + "").length ]
            } ]
        });
        $.listTypeLbl.attributedString = attr;
    }
    function toggleListType(e) {
        if (toggleStatus) {
            $.listTypeContainer.animate({
                bottom: 0,
                duration: 200
            });
            toggleStatus = false;
        } else {
            $.listTypeContainer.animate({
                bottom: -65,
                duration: 200
            });
            toggleStatus = true;
        }
    }
    function addToCartCallback(e, productId) {
        try {
            Ti.API.info("else if" + e.bindId);
            var bind = e.bindId;
            var index = e.itemIndex;
            var a = e.section.items[index];
            if (!isNullVal(e.bindId) && "message" != e.bindId && !isNullVal(a[bind].collectionId)) if ("gridCart1" == e.bindId || "gridCart2" == e.bindId) {
                if ("gridTemplate" == activeTemplate && "#66000000" == a[bind].backgroundColor) {
                    a[bind].backgroundColor = "#e65e48";
                    e.section.updateItemAt(e.itemIndex, a);
                }
                if ("listTypeTemplate" == activeTemplate || "blockTypeTemplate" == activeTemplate) if ("#ffffff" == a[bind].color) {
                    a[bind].color = "#e65e48";
                    e.section.updateItemAt(e.itemIndex, a);
                } else if ("#a6a6a6" == a[bind].color) {
                    a[bind].color = "#e65e48";
                    e.section.updateItemAt(e.itemIndex, a);
                }
                addtocartItem.push(productId);
            } else if ("gridWish1" == e.bindId || "gridWish2" == e.bindId) if ("add" == productId) {
                a[bind].text = "";
                a[bind].color = "#e65e48";
                e.section.updateItemAt(index, a);
                selectedCartItem.push(a[bind].collectionId);
            } else {
                a[bind].text = "";
                a[bind].color = "#a6a6a6";
                selectedCartItem.splice(selectedCartItem.indexOf(a[bind].collectionId), 1);
                unSelectedCartItem.push(a[bind].collectionId);
                e.section.updateItemAt(index, a);
            }
        } catch (ex) {
            Ti.API.info("ex.message = " + ex.message);
        }
    }
    function addToCartSuccessCallback(e) {
        try {
            var bind = cartData.bindId;
            var index = cartData.itemIndex;
            var a = cartData.section.items[index];
            if ("gridTemplate" == activeTemplate && "#66000000" == a[bind].backgroundColor) {
                a[bind].backgroundColor = "#e65e48";
                cartData.section.updateItemAt(cartData.itemIndex, a);
            }
            if ("listTypeTemplate" == activeTemplate || "blockTypeTemplate" == activeTemplate) if ("#fff" == a[bind].color) {
                a[bind].color = "#e65e48";
                cartData.section.updateItemAt(cartData.itemIndex, a);
            } else if ("#a6a6a6" == a[bind].color) {
                a[bind].color = "#e65e48";
                cartData.section.updateItemAt(cartData.itemIndex, a);
            }
            addtocartItem.push(e.data[0].product_id);
            Ti.App.Properties.setString("quote_id", e.data[0].quote_id);
            Ti.App.Properties.setString("cartCount", e.data[0].count);
            $.header.updateCartCount();
            showAlert($.otherListingPage, e.message);
            var cartDataArray = [];
            cartDataArray = Titanium.App.Properties.getList("cartProductIdArray");
            -1 == cartDataArray.indexOf(e.data[0].product_id) && cartDataArray.push(e.data[0].product_id);
            Titanium.App.Properties.setList("cartProductIdArray", cartDataArray);
            googleAnalyticsBag(gaAddToCartData);
        } catch (ex) {
            Ti.API.info("ex.message = " + ex.message);
        }
    }
    function addToCartErrorCallback(e) {
        showAlert($.otherListingPage, e.message);
    }
    function addToShortlist(productData) {
        var shortListbind = "", shortListindex = "", shortListitemSection = "";
        if (isNullVal(Ti.App.Properties.getString("access_token"))) Alloy.Globals.addWindowInNav("signIn", "otherListingPage"); else {
            shortlistData = "";
            if (!isNullVal(productData.bindId)) {
                shortListbind = productData.bindId;
                shortListindex = productData.itemIndex;
                shortListitemSection = productData.section.items[shortListindex];
                shortlistData = productData;
                if ("" == shortListitemSection[shortListbind].text) {
                    gaShortlistProduct = {
                        name: shortListitemSection[shortListbind].collectionName,
                        sku: shortListitemSection[shortListbind].product_sku,
                        lostSale: shortListitemSection[shortListbind].lost_sale
                    };
                    shortListitemSection[shortListbind].text = "";
                    shortListitemSection[shortListbind].color = "#e65e48";
                    productData.section.updateItemAt(shortListindex, shortListitemSection);
                    selectedCartItem.push(shortListitemSection[shortListbind].collectionId);
                    var url = Alloy.Globals.commonUrl.addToShortlist;
                    var data = {
                        product_id: shortListitemSection[shortListbind].collectionId
                    };
                    var requestParams = JSON.stringify(data);
                    Alloy.Globals.webServiceCall(url, requestParams, addToShortlistSuccessCallback, addToShortlistErrorCallback, "POST", $.otherListingPage);
                } else {
                    shortListitemSection[shortListbind].text = "";
                    shortListitemSection[shortListbind].color = "#a6a6a6";
                    productData.section.updateItemAt(shortListindex, shortListitemSection);
                    selectedCartItem.splice(selectedCartItem.indexOf(shortListitemSection[shortListbind].collectionId), 1);
                    unSelectedCartItem.push(shortListitemSection[shortListbind].collectionId);
                    var url = Alloy.Globals.commonUrl.removeShortlist;
                    var data = {
                        product_id: shortListitemSection[shortListbind].collectionId
                    };
                    var requestParams = JSON.stringify(data);
                    Alloy.Globals.webServiceCall(url, requestParams, removeShortlistProductSuccessCallback, removeShortlistProductErrorCallback, "POST", $.otherListingPage);
                }
            }
        }
    }
    function addToShortlistSuccessCallback(e) {
        try {
            showAlert($.otherListingPage, e.message);
            googleAnalyticsShortlist(gaShortlistProduct, wTitle);
        } catch (ex) {
            Ti.API.info("catch = " + ex.message);
        }
    }
    function addToShortlistErrorCallback(e) {
        showAlert($.otherListingPage, e.message);
        var pbind = "", pindex = "", pitemSection = "";
        pbind = shortlistData.bindId;
        pindex = shortlistData.itemIndex;
        pitemSection = shortlistData.section.items[pindex];
        pitemSection[pbind].text = "";
        pitemSection[pbind].color = "#a6a6a6";
        selectedCartItem.splice(selectedCartItem.indexOf(pitemSection[pbind].collectionId), 1);
        unSelectedCartItem.push(pitemSection[pbind].collectionId);
        shortlistData.section.updateItemAt(shortlistData.itemIndex, pitemSection);
    }
    function removeShortlistProductSuccessCallback(e) {
        try {
            showAlert($.otherListingPage, e.message);
        } catch (ex) {
            Ti.API.info("catch = " + ex.message);
        }
    }
    function removeShortlistProductErrorCallback(e) {
        showAlert($.otherListingPage, e.message);
        var pbind_ = "", pindex_ = "", pitemSection_ = "";
        pbind_ = shortlistData.bindId;
        pindex_ = shortlistData.itemIndex;
        pitemSection_ = shortlistData.section.items[pindex_];
        pitemSection_[pbind_].text = "";
        pitemSection_[pbind_].color = "#e65e48";
        selectedCartItem.push(pitemSection_[pbind_].collectionId);
        shortlistData.section.updateItemAt(shortlistData.itemIndex, pitemSection_);
    }
    function hideOverFlowMenu(e) {
        Alloy.Globals.overFlowFlag && "overFlowMenuLbl" != e.source.id && $.header.hideOverFlow();
    }
    function getSliderViewAll() {
        showLoader($.otherListingPage);
        listData = [];
        $.mainSection.setItems(listData);
        if (!isNullVal(args.type)) {
            var _argsBlock = "", _argsProductId = "", _argsSlider = "", _argsNavigatedblockid = "", _argsCollectionId = "", _argsColor = "", _argsLookId = "";
            isNullVal(args.block) || (_argsBlock = args.block);
            isNullVal(args.productID) || (_argsProductId = args.productID);
            isNullVal(args.slider) || (_argsSlider = args.slider);
            isNullVal(args.navigatedblockid) || (_argsNavigatedblockid = args.navigatedblockid);
            isNullVal(args.collectionID) || (_argsCollectionId = args.collectionID);
            isNullVal(args.color) || (_argsColor = args.color);
            isNullVal(args.lookID) || (_argsLookId = args.lookID);
            if ("product" == args.type || "shop" == args.type || "wallpaper" == args.type) {
                var url = Alloy.Globals.commonUrl.productGetSliderViewAll;
                if (_.size(args)) {
                    var data = {
                        block: _argsBlock,
                        Productid: _argsProductId,
                        slider: _argsSlider,
                        navigatedblockid: _argsNavigatedblockid,
                        page_no: page_no,
                        page_size: limit
                    };
                    var requestParams = JSON.stringify(data);
                    Alloy.Globals.webServiceCall(url, requestParams, subCollectionSuccessCallback, subCollectionErrorCallback, "POST", $.otherListingPage);
                }
            } else if ("shopByLook" == args.type) {
                var url = Alloy.Globals.commonUrl.lookGetsliderviewall;
                if (_.size(args)) {
                    var data = {
                        block: _argsBlock,
                        lookID: _argsLookId,
                        page_no: page_no,
                        page_size: limit
                    };
                    var requestParams = JSON.stringify(data);
                    Alloy.Globals.webServiceCall(url, requestParams, subCollectionSuccessCallback, subCollectionErrorCallback, "POST", $.otherListingPage, true);
                }
            } else if ("collection" == args.type) {
                var url = Alloy.Globals.commonUrl.getsliderviewall;
                if (_.size(args)) {
                    var data = {
                        block: _argsBlock,
                        collectionID: _argsCollectionId,
                        page_no: page_no,
                        page_size: limit
                    };
                    var requestParams = JSON.stringify(data);
                    Alloy.Globals.webServiceCall(url, requestParams, subCollectionSuccessCallback, subCollectionErrorCallback, "POST", $.otherListingPage, true);
                }
            } else if ("collection_availabledesign" == args.type) {
                var url = Alloy.Globals.commonUrl.getsliderviewall;
                if (_.size(args)) {
                    var data = {
                        block: _argsBlock,
                        color: _argsColor,
                        collectionID: _argsCollectionId,
                        page_no: page_no,
                        page_size: limit
                    };
                    var requestParams = JSON.stringify(data);
                    Alloy.Globals.webServiceCall(url, requestParams, subCollectionSuccessCallback, subCollectionErrorCallback, "POST", $.otherListingPage);
                }
            }
        }
    }
    function subCollectionSuccessCallback(e) {
        try {
            hideLoader($.otherListingPage);
            totalItem = e.data.total_count;
            var toast_text = "Total " + totalItem;
            var toast_attr = Ti.UI.createAttributedString({
                text: toast_text,
                attributes: [ {
                    type: Ti.UI.ATTRIBUTE_FONT,
                    value: {
                        fontSize: "10dp",
                        fontFamily: "futura_medium_bt-webfont"
                    },
                    range: [ toast_text.indexOf(totalItem + ""), (totalItem + "").length ]
                } ]
            });
            $.total_toast_lbl.attributedString = toast_attr;
            displayCount = e.data.products.length;
            if (0 != displayCount) {
                gridData = e.data.products;
                looping_value(e.data.products, activeTemplate);
            } else {
                $.total_toast_lbl.setText("Total 00");
                if (!isNullVal(args.type)) switch (args.type) {
                  case "shopByLook":
                    message = "THERE ARE NO COLLECTIONS IN THIS CATEGORY.";
                    break;

                  case "collection":
                    message = "THERE ARE NO COLLECTIONS IN THIS CATEGORY.";
                    break;

                  default:
                    message = "THERE ARE NO PRODUCTS IN THIS CATEGORY.";
                }
                listData.push({
                    properties: {},
                    template: "emptyTemplate",
                    message: {
                        text: message
                    }
                });
                $.mainSection.appendItems(listData);
            }
        } catch (ex) {
            hideLoader($.otherListingPage);
            Ti.API.info("catch error" + JSON.stringify(ex));
            showAlert($.otherListingPage, "Something went wrong...");
            setTimeout(function() {
                goToBack();
            }, 1e3);
        }
    }
    function subCollectionErrorCallback(e) {
        hideLoader($.otherListingPage);
        showAlert($.otherListingPage, e.message);
        displayCount = 0;
        $.total_toast_lbl.setText("Total 00");
        if (!isNullVal(args.type)) switch (args.type) {
          case "shopByLook":
            message = "THERE ARE NO COLLECTIONS IN THIS CATEGORY.";
            break;

          case "collection":
            message = "THERE ARE NO COLLECTIONS IN THIS CATEGORY.";
            break;

          default:
            message = "THERE ARE NO PRODUCTS IN THIS CATEGORY.";
        }
        listData.push({
            properties: {},
            template: "emptyTemplate",
            message: {
                text: message
            }
        });
        $.mainSection.appendItems(listData);
    }
    function looping_value(data, templateName) {
        try {
            listData = [];
            var cartDataArray = [];
            var cartIdArray = [];
            switch (templateName) {
              case "gridTemplate":
                _.each(data, function(value, k) {
                    backupData.push(value);
                });
                var size = 2;
                var gridDataArr = [];
                var myDataArrCounter = 0;
                for (var i = 0; i < data.length; i += size) {
                    var smallPaginationArray = data.slice(i, i + size);
                    gridDataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallPaginationArray));
                    myDataArrCounter++;
                }
                var subGridData = "{" + gridDataArr + "}";
                var finalGridData = JSON.parse(subGridData);
                data = finalGridData;
            }
            _.each(data, function(value, k) {
                if (value) if (true == value.wishlistItem) {
                    isSelected_0 = Alloy.Globals.icon.setShortlist;
                    wishIconColor_0 = "#e65e48";
                } else {
                    isSelected_0 = Alloy.Globals.icon.shortlist;
                    wishIconColor_0 = "#a6a6a6";
                }
                if (value[0]) {
                    if (true == value[0].wishlistItem) {
                        isSelected_0 = Alloy.Globals.icon.setShortlist;
                        wishIconColor_0 = "#e65e48";
                    } else {
                        isSelected_0 = Alloy.Globals.icon.shortlist;
                        wishIconColor_0 = "#a6a6a6";
                    }
                    if (value[1]) if (true == value[1].wishlistItem) {
                        isSelected_1 = Alloy.Globals.icon.setShortlist;
                        wishIconColor_1 = "#e65e48";
                    } else {
                        isSelected_1 = Alloy.Globals.icon.shortlist;
                        wishIconColor_1 = "#a6a6a6";
                    } else wishIconColor_1 = "transparent", isSelected_1 = "";
                }
                try {
                    isNullVal(value[0].in_stock) ? 1 == value[0].in_stock ? outOfStock1 = false : 0 == value[0].in_stock && (outOfStock1 = true) : outOfStock1 = void 0;
                } catch (exp) {
                    outOfStock1 = void 0;
                }
                try {
                    isNullVal(value[1].in_stock) ? 1 == value[1].in_stock ? outOfStock2 = false : 0 == value[1].in_stock && (outOfStock2 = true) : outOfStock2 = void 0;
                } catch (exp1) {
                    outOfStock2 = void 0;
                }
                if (!isNullVal(args.type)) if ("product" == args.type || "shop" == args.type || "collection_availabledesign" == args.type || "wallpaper" == args.type) {
                    if ("shop" == args.type) {
                        gridCart1 = Alloy.Globals.icon.bag;
                        gridCart2 = Alloy.Globals.icon.bag;
                        if (value) {
                            if (true == value.cartItem) {
                                cartIconColor_0 = "#e65e48";
                                cartIdArray = Titanium.App.Properties.getList("cartProductIdArray");
                                -1 == cartIdArray.indexOf(value.product_id) && cartIdArray.push(value.product_id);
                                Titanium.App.Properties.setList("cartProductIdArray", cartIdArray);
                            } else cartIconColor_0 = "gridTemplate" == activeTemplate ? "#66000000" : "#a6a6a6";
                            if ("NA" == value.product_size) {
                                productSize1 = "";
                                productFontSize1 = "0";
                            } else {
                                productSize1 = value.product_size;
                                productFontSize1 = "9";
                            }
                            cartDataArray = Titanium.App.Properties.getList("cartAllid");
                            -1 == cartDataArray.indexOf(value.product_id) && cartDataArray.push(value.product_id);
                            Titanium.App.Properties.setList("cartAllid", cartDataArray);
                        }
                        if (value[0]) {
                            cartDataArray = Titanium.App.Properties.getList("cartAllid");
                            -1 == cartDataArray.indexOf(value[0].product_id) && cartDataArray.push(value[0].product_id);
                            Titanium.App.Properties.setList("cartAllid", cartDataArray);
                            if ("NA" == value[0].product_size) {
                                productSize1 = "";
                                productFontSize1 = "0";
                            } else {
                                productSize1 = value[0].product_size;
                                productFontSize1 = "9";
                            }
                            if (true == value[0].cartItem) {
                                cartIconColor_0 = "#e65e48";
                                cartIdArray = Titanium.App.Properties.getList("cartProductIdArray");
                                -1 == cartIdArray.indexOf(value[0].product_id) && cartIdArray.push(value[0].product_id);
                                Titanium.App.Properties.setList("cartProductIdArray", cartIdArray);
                            } else cartIconColor_0 = "gridTemplate" == activeTemplate ? "#66000000" : "#a6a6a6";
                            if (value[1]) {
                                cartDataArray = Titanium.App.Properties.getList("cartAllid");
                                -1 == cartDataArray.indexOf(value[1].product_id) && cartDataArray.push(value[1].product_id);
                                Titanium.App.Properties.setList("cartAllid", cartDataArray);
                                if ("NA" == value[1].product_size) {
                                    productSize2 = "";
                                    productFontSize2 = "0";
                                } else {
                                    productSize2 = value[1].product_size;
                                    productFontSize2 = "9";
                                }
                                if (true == value[1].cartItem) {
                                    cartIconColor_1 = "#e65e48";
                                    cartIdArray = Titanium.App.Properties.getList("cartProductIdArray");
                                    -1 == cartIdArray.indexOf(value[1].product_id) && cartIdArray.push(value[1].product_id);
                                    Titanium.App.Properties.setList("cartProductIdArray", cartIdArray);
                                } else cartIconColor_1 = "gridTemplate" == activeTemplate ? "#66000000" : "#a6a6a6";
                            }
                        }
                    } else {
                        gridCart1 = "";
                        gridCart2 = "";
                        productSize1 = "";
                        productSize2 = "";
                        productFontSize1 = "0";
                        productFontSize2 = "0";
                    }
                    "gridTemplate" != templateName && backupData.push(value);
                    if (value) {
                        gridProductname1 = value.product_name;
                        product_sku1 = value.product_sku;
                        collectionId1 = value.product_id;
                        collectionImage1 = encodeURI(value.image);
                        gridWhereToBuy1 = Alloy.Globals.icon.currency + value.product_price;
                        shareUrl1 = value.collection_url ? value.collection_url : value.product_url ? value.product_url : value.url ? value.url : "";
                        gridShare1 = Alloy.Globals.icon.share;
                        gridWish1 = isSelected_0;
                    }
                    if ("gridTemplate" == templateName) if (value[0]) {
                        product_sku1 = value[0].product_sku;
                        gridProductname1 = value[0].product_name;
                        collectionId1 = value[0].product_id;
                        collectionImage1 = encodeURI(value[0].image);
                        gridWhereToBuy1 = Alloy.Globals.icon.currency + value[0].product_price;
                        gridShare1 = Alloy.Globals.icon.share;
                        gridWish1 = isSelected_0;
                        shareUrl1 = value[0].collection_url ? value[0].collection_url : value[0].product_url ? value[0].product_url : value[0].url ? value[0].url : "";
                        if (value[1]) {
                            product_sku2 = value[1].product_sku;
                            gridProductname2 = value[1].product_name;
                            collectionId2 = value[1].product_id;
                            collectionImage2 = encodeURI(value[1].image);
                            gridWhereToBuy2 = Alloy.Globals.icon.currency + value[1].product_price;
                            gridShare2 = Alloy.Globals.icon.share;
                            gridWish2 = isSelected_1;
                            imageContainer = "#eeece7";
                            shareUrl2 = value[1].collection_url ? value[1].collection_url : value[1].product_url ? value[1].product_url : value[1].url ? value[1].url : "";
                            logoText = "";
                        } else {
                            product_sku2 = "";
                            gridProductname2 = "";
                            collectionId2 = "";
                            collectionImage2 = "";
                            gridWhereToBuy2 = "";
                            gridCart2 = "";
                            gridShare2 = "";
                            gridWish2 = "";
                            imageContainer = "#ffffff";
                            logoText = "";
                            productSize2 = "";
                            shareUrl2 = "";
                            productFontSize2 = "0";
                        }
                    } else {
                        product_sku1 = "";
                        gridProductname1 = "";
                        collectionId1 = "";
                        collectionImage1 = "";
                        gridWhereToBuy1 = "";
                        gridCart1 = "";
                        gridShare1 = "";
                        gridWish1 = "";
                        shareUrl1 = "";
                        productSize1 = "";
                        productFontSize1 = "0";
                    }
                } else if ("shopByLook" == args.type) {
                    "gridTemplate" != templateName && backupData.push(value);
                    if (value) {
                        gridProductname1 = value.looks_name;
                        collectionId1 = value.looks_id;
                        collectionImage1 = encodeURI(value.image);
                        gridWhereToBuy1 = "Where to buy";
                        gridShare1 = Alloy.Globals.icon.share;
                        gridWish1 = isSelected_0;
                        gridCart1 = "";
                        productSize1 = "";
                        shareUrl1 = value.collection_url ? value.collection_url : value.product_url ? value.product_url : value.url ? value.url : "";
                        productFontSize1 = "0";
                    }
                    if ("gridTemplate" == templateName) if (value[0]) {
                        gridProductname1 = value[0].looks_name;
                        collectionId1 = value[0].looks_id;
                        collectionImage1 = encodeURI(value[0].image);
                        gridWhereToBuy1 = "Where to buy";
                        gridShare1 = Alloy.Globals.icon.share;
                        gridWish1 = isSelected_0;
                        gridCart1 = "";
                        productSize1 = "";
                        productFontSize1 = "0";
                        shareUrl1 = value[0].collection_url ? value[0].collection_url : value[0].product_url ? value[0].product_url : value[0].url ? value[0].url : "";
                        if (value[1]) {
                            gridProductname2 = value[1].looks_name;
                            collectionId2 = value[1].looks_id;
                            collectionImage2 = encodeURI(value[1].image);
                            gridWhereToBuy2 = "Where to buy";
                            gridShare2 = Alloy.Globals.icon.share;
                            gridWish2 = isSelected_1;
                            gridCart2 = "";
                            imageContainer = "#eeece7";
                            logoText = "";
                            productSize2 = "";
                            productFontSize2 = "0";
                            shareUrl2 = value[1].collection_url ? value[1].collection_url : value[1].product_url ? value[1].product_url : value[1].url ? value[1].url : "";
                        } else {
                            gridProductname2 = "";
                            collectionId2 = "";
                            collectionImage2 = "";
                            gridWhereToBuy2 = "";
                            gridCart2 = "";
                            gridShare2 = "";
                            gridWish2 = "";
                            imageContainer = "#ffffff";
                            logoText = "";
                            productSize2 = "";
                            productFontSize2 = "0";
                            shareUrl2 = "";
                        }
                    } else {
                        gridProductname1 = "";
                        collectionId1 = "";
                        collectionImage1 = "";
                        gridWhereToBuy1 = "";
                        gridCart1 = "";
                        gridShare1 = "";
                        gridWish1 = "";
                        shareUrl1 = "";
                        productSize1 = "";
                        productFontSize1 = "0";
                    }
                } else if ("collection" == args.type) {
                    "gridTemplate" != templateName && backupData.push(value);
                    if (value) {
                        gridProductname1 = value.collection_name;
                        collectionId1 = value.collection_id;
                        collectionImage1 = encodeURI(value.image);
                        gridWhereToBuy1 = "Where to buy";
                        gridShare1 = Alloy.Globals.icon.share;
                        gridWish1 = isSelected_0;
                        gridCart1 = "";
                        productSize1 = "";
                        productFontSize1 = "0";
                        shareUrl1 = value.collection_url ? value.collection_url : value.product_url ? value.product_url : value.url ? value.url : "";
                    }
                    if ("gridTemplate" == templateName) if (value[0]) {
                        gridProductname1 = value[0].collection_name;
                        collectionId1 = value[0].collection_id;
                        collectionImage1 = encodeURI(value[0].image);
                        gridWhereToBuy1 = "Where to buy";
                        gridShare1 = Alloy.Globals.icon.share;
                        gridWish1 = isSelected_0;
                        gridCart1 = "";
                        productSize1 = "";
                        productFontSize1 = "0";
                        shareUrl1 = value[0].collection_url ? value[0].collection_url : value[0].product_url ? value[0].product_url : value[0].url ? value[0].url : "";
                        if (value[1]) {
                            gridProductname2 = value[1].collection_name;
                            collectionId2 = value[1].collection_id;
                            collectionImage2 = encodeURI(value[1].image);
                            gridWhereToBuy2 = "Where to buy";
                            gridShare2 = Alloy.Globals.icon.share;
                            gridWish2 = isSelected_1;
                            gridCart2 = "";
                            imageContainer = "#eeece7";
                            logoText = "";
                            productSize2 = "";
                            productFontSize2 = "0";
                            shareUrl2 = value[1].collection_url ? value[1].collection_url : value[1].product_url ? value[1].product_url : value[1].url ? value[1].url : "";
                        } else {
                            gridProductname2 = "";
                            collectionId2 = "";
                            collectionImage2 = "";
                            gridWhereToBuy2 = "";
                            gridCart2 = "";
                            gridShare2 = "";
                            gridWish2 = "";
                            imageContainer = "#ffffff";
                            logoText = "";
                            productSize2 = "";
                            productFontSize2 = "0";
                            shareUrl2 = "";
                        }
                    } else {
                        gridProductname1 = "";
                        collectionId1 = "";
                        collectionImage1 = "";
                        gridWhereToBuy1 = "";
                        gridCart1 = "";
                        gridShare1 = "";
                        gridWish1 = "";
                        productSize1 = "";
                        shareUrl1 = "";
                        productFontSize1 = "0";
                    }
                }
                var obj = {};
                obj = "gridTemplate" == templateName ? {
                    properties: {},
                    template: templateName,
                    gridProductname1: {
                        text: isNullVal(gridProductname1) ? gridProductname1 : gridProductname1.toUpperCase(),
                        collectionId: collectionId1
                    },
                    gridProductname2: {
                        text: isNullVal(gridProductname2) ? gridProductname2 : gridProductname2.toUpperCase(),
                        collectionId: collectionId2
                    },
                    gridCart1: {
                        text: gridCart1,
                        product_name_ga: isNullVal(gridProductname1) ? gridProductname1 : gridProductname1.toUpperCase(),
                        product_sku: product_sku1,
                        collectionId: collectionId1,
                        color: "gridTemplate" == templateName ? "#fff" : cartIconColor_0,
                        backgroundColor: "gridTemplate" == templateName ? cartIconColor_0 : "transparent",
                        visible: "" == gridCart1 ? false : !outOfStock1
                    },
                    gridCart2: {
                        text: gridCart2,
                        product_name_ga: isNullVal(gridProductname2) ? gridProductname2 : gridProductname2.toUpperCase(),
                        product_sku: product_sku2,
                        collectionId: collectionId2,
                        color: "gridTemplate" == templateName ? "#fff" : cartIconColor_1,
                        backgroundColor: "gridTemplate" == templateName ? cartIconColor_1 : "transparent",
                        visible: "" == gridCart2 ? false : !outOfStock2
                    },
                    gridShare1: {
                        collectionId: collectionId1,
                        text: gridShare1,
                        shareUrl: shareUrl1
                    },
                    gridShare2: {
                        collectionId: collectionId2,
                        text: gridShare2,
                        shareUrl: shareUrl2
                    },
                    gridWish1: {
                        collectionId: collectionId1,
                        iconValue: "",
                        text: gridWish1,
                        color: wishIconColor_0,
                        collectionName: gridProductname1,
                        product_sku: product_sku1,
                        lost_sale: !!outOfStock1
                    },
                    gridWish2: {
                        collectionId: collectionId2,
                        iconValue: "",
                        text: gridWish2,
                        color: wishIconColor_1,
                        collectionName: gridProductname2,
                        product_sku: product_sku2,
                        lost_sale: !!outOfStock2
                    },
                    gridProductImage1: {
                        image: collectionImage1,
                        collectionId: collectionId1
                    },
                    gridProductImage2: {
                        image: collectionImage2,
                        collectionId: collectionId2
                    },
                    gridWhereToBuy1: {
                        text: gridWhereToBuy1,
                        collectionId: collectionId1,
                        product_name_ga: isNullVal(gridProductname1) ? gridProductname1 : gridProductname1.toUpperCase()
                    },
                    gridWhereToBuy2: {
                        text: gridWhereToBuy2,
                        collectionId: collectionId2,
                        product_name_ga: isNullVal(gridProductname2) ? gridProductname2 : gridProductname2.toUpperCase()
                    },
                    listContainer: {
                        collectionId: collectionId1
                    },
                    productSize1: {
                        collectionId: collectionId1,
                        text: productSize1,
                        height: productFontSize1
                    },
                    productSize2: {
                        collectionId: collectionId1,
                        text: productSize2,
                        height: productFontSize2
                    },
                    imageContainer: {
                        backgroundColor: imageContainer
                    },
                    gridLogo: {
                        text: logoText
                    },
                    outOfStock1: {
                        visible: outOfStock1 || false,
                        collectionId: collectionId1
                    },
                    outOfStock2: {
                        visible: outOfStock2 || false,
                        collectionId: collectionId2
                    }
                } : {
                    properties: {},
                    template: templateName,
                    gridProductname1: {
                        text: isNullVal(gridProductname1) ? gridProductname1 : gridProductname1.toUpperCase(),
                        collectionId: collectionId1
                    },
                    gridProductname2: {
                        text: isNullVal(gridProductname2) ? gridProductname2 : gridProductname2.toUpperCase(),
                        collectionId: collectionId2
                    },
                    gridCart1: {
                        text: gridCart1,
                        product_name_ga: isNullVal(gridProductname1) ? gridProductname1 : gridProductname1.toUpperCase(),
                        product_sku: product_sku1,
                        collectionId: collectionId1,
                        color: "gridTemplate" == templateName ? "#fff" : cartIconColor_0,
                        backgroundColor: "gridTemplate" == templateName ? cartIconColor_0 : "transparent",
                        visible: "" == gridCart1 ? false : !outOfStock1
                    },
                    gridCart2: {
                        text: gridCart2,
                        product_name_ga: isNullVal(gridProductname2) ? gridProductname2 : gridProductname2.toUpperCase(),
                        product_sku: product_sku2,
                        collectionId: collectionId2,
                        color: "gridTemplate" == templateName ? "#fff" : cartIconColor_1,
                        backgroundColor: "gridTemplate" == templateName ? cartIconColor_1 : "transparent",
                        visible: "" == gridCart2 ? false : !outOfStock2
                    },
                    gridShare1: {
                        collectionId: collectionId1,
                        text: gridShare1,
                        shareUrl: shareUrl1
                    },
                    gridShare2: {
                        collectionId: collectionId2,
                        text: gridShare2,
                        shareUrl: shareUrl2
                    },
                    gridWish1: {
                        collectionId: collectionId1,
                        iconValue: "",
                        text: gridWish1,
                        color: wishIconColor_0,
                        collectionName: gridProductname1,
                        lost_sale: !!outOfStock1
                    },
                    gridWish2: {
                        collectionId: collectionId2,
                        iconValue: "",
                        text: gridWish2,
                        color: wishIconColor_1,
                        collectionName: gridProductname2,
                        lost_sale: !!outOfStock2
                    },
                    gridProductImage1: {
                        image: collectionImage1,
                        collectionId: collectionId1
                    },
                    gridProductImage2: {
                        image: collectionImage2,
                        collectionId: collectionId2
                    },
                    gridWhereToBuy1: {
                        text: gridWhereToBuy1,
                        collectionId: collectionId1,
                        product_name_ga: isNullVal(gridProductname1) ? gridProductname1 : gridProductname1.toUpperCase()
                    },
                    gridWhereToBuy2: {
                        text: gridWhereToBuy2,
                        collectionId: collectionId2,
                        product_name_ga: isNullVal(gridProductname2) ? gridProductname2 : gridProductname2.toUpperCase()
                    },
                    listContainer: {
                        collectionId: collectionId1
                    },
                    productSize1: {
                        collectionId: collectionId1,
                        text: productSize1,
                        height: productFontSize1
                    },
                    productSize2: {
                        collectionId: collectionId1,
                        text: productSize2,
                        height: productFontSize2
                    },
                    imageContainer: {
                        backgroundColor: imageContainer
                    },
                    gridLogo: {
                        text: logoText
                    }
                };
                listData.push(obj);
            });
            Titanium.App.Properties.setList("cartAllid", cartDataArray);
            $.mainSection.appendItems(listData);
            $.activityInd.hide();
            page_no++;
            if (page_no <= Math.ceil(totalItem / limit)) switch (templateName) {
              case "gridTemplate":
                $.listView.setMarker({
                    sectionIndex: 0,
                    itemIndex: 5 * (page_no - 1) - 1
                });
                break;

              default:
                $.listView.setMarker({
                    sectionIndex: 0,
                    itemIndex: 10 * (page_no - 1) - 1
                });
            }
        } catch (ex) {
            Ti.API.info("catch looping" + ex.message);
        }
    }
    function viewTypeLooping(data, templateName) {
        listData = [];
        cartProductId = [];
        var addFlag = null;
        var removeFlag = null;
        $.mainSection.setItems(listData);
        if (!isNullVal(args.type) && ("product" == args.type || "shop" == args.type || "collection_availabledesign" == args.type || "wallpaper" == args.type)) {
            addFlag = Titanium.App.Properties.getList("removeCartProductIdArray");
            removeFlag = Titanium.App.Properties.getList("cartProductIdArray");
            addFlag[0] == removeFlag[0] && 1 == addFlag.length && 1 == removeFlag.length && Titanium.App.Properties.setList("cartProductIdArray", []);
            _.each(Titanium.App.Properties.getList("cartAllid"), function(value, k) {
                var found = _.findWhere(data, {
                    product_id: value
                });
                isNullVal(found) || (found.cartItem = false);
            });
            Ti.API.info("Titanium.App.Properties.getList(removeCartProductIdArray) = " + Titanium.App.Properties.getList("removeCartProductIdArray"));
            _.each(Titanium.App.Properties.getList("removeCartProductIdArray"), function(k, v) {
                var found = _.findWhere(data, {
                    product_id: k
                });
                isNullVal(found) || (found.cartItem = false);
            });
            Ti.API.info("Titanium.App.Properties.getList(cartProductIdArray) = " + Titanium.App.Properties.getList("cartProductIdArray"));
            _.each(Titanium.App.Properties.getList("cartProductIdArray"), function(k, v) {
                var found = _.findWhere(data, {
                    product_id: k
                });
                isNullVal(found) || (found.cartItem = true);
            });
            _.each(unSelectedCartItem, function(value, k) {
                var found = _.findWhere(data, {
                    product_id: value
                });
                isNullVal(found) || (found.wishlistItem = false);
            });
            _.each(selectedCartItem, function(value, k) {
                var found = _.findWhere(data, {
                    product_id: value
                });
                isNullVal(found) || (found.wishlistItem = true);
            });
            if (addFlag[0] == removeFlag[0] && 1 == addFlag.length && 1 == removeFlag.length) {
                Titanium.App.Properties.setList("removeCartProductIdArray", []);
                Titanium.App.Properties.setList("cartProductIdArray", []);
            }
        }
        switch (templateName) {
          case "gridTemplate":
            var size = 2;
            var gridDataArr = [];
            var myDataArrCounter = 0;
            for (var i = 0; i < data.length; i += size) {
                var smallPaginationArray = data.slice(i, i + size);
                gridDataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallPaginationArray));
                myDataArrCounter++;
            }
            var subGridData = "{" + gridDataArr + "}";
            var finalGridData = JSON.parse(subGridData);
            data = finalGridData;
        }
        if (0 != displayCount) _.each(data, function(value, k) {
            if (!isNullVal(args.type)) if ("product" == args.type || "shop" == args.type || "collection_availabledesign" == args.type || "wallpaper" == args.type) {
                if (value) if (true == value.wishlistItem) {
                    isSelected_0 = Alloy.Globals.icon.setShortlist;
                    wishIconColor_0 = "#e65e48";
                } else {
                    isSelected_0 = Alloy.Globals.icon.shortlist;
                    wishIconColor_0 = "#a6a6a6";
                }
                if (value[0]) {
                    if (true == value[0].wishlistItem) {
                        isSelected_0 = Alloy.Globals.icon.setShortlist;
                        wishIconColor_0 = "#e65e48";
                    } else {
                        isSelected_0 = Alloy.Globals.icon.shortlist;
                        wishIconColor_0 = "#a6a6a6";
                    }
                    if (value[1]) if (true == value[1].wishlistItem) {
                        isSelected_1 = Alloy.Globals.icon.setShortlist;
                        wishIconColor_1 = "#e65e48";
                    } else {
                        isSelected_1 = Alloy.Globals.icon.shortlist;
                        wishIconColor_1 = "#a6a6a6";
                    } else wishIconColor_1 = "transparent", isSelected_1 = "";
                }
                if (value) {
                    gridProductname1 = value.product_name;
                    product_sku1 = value.product_sku;
                    collectionId1 = value.product_id;
                    collectionImage1 = encodeURI(value.image);
                    gridWhereToBuy1 = Alloy.Globals.icon.currency + value.product_price;
                    gridShare1 = Alloy.Globals.icon.share;
                    gridWish1 = isSelected_0;
                    shareUrl1 = value.collection_url ? value.collection_url : value.product_url ? value.product_url : value.url ? value.url : "";
                }
                if ("gridTemplate" == templateName) if (value[0]) {
                    product_sku1 = value[0].product_sku;
                    gridProductname1 = value[0].product_name;
                    collectionId1 = value[0].product_id;
                    collectionImage1 = encodeURI(value[0].image);
                    gridWhereToBuy1 = Alloy.Globals.icon.currency + value[0].product_price;
                    gridShare1 = Alloy.Globals.icon.share;
                    gridWish1 = isSelected_0;
                    shareUrl1 = value[0].collection_url ? value[0].collection_url : value[0].product_url ? value[0].product_url : value[0].url ? value.url : "";
                    if (value[1]) {
                        product_sku2 = value[1].product_sku;
                        gridProductname2 = value[1].product_name;
                        collectionId2 = value[1].product_id;
                        collectionImage2 = encodeURI(value[1].image);
                        gridWhereToBuy2 = Alloy.Globals.icon.currency + value[1].product_price;
                        gridShare2 = Alloy.Globals.icon.share;
                        gridWish2 = isSelected_1;
                        imageContainer = "#eeece7";
                        logoText = "";
                        shareUrl2 = value[1].collection_url ? value[1].collection_url : value[1].product_url ? value[1].product_url : value[1].url ? value[1].url : "";
                    } else {
                        product_sku2 = "";
                        gridProductname2 = "";
                        collectionId2 = "";
                        collectionImage2 = "";
                        gridWhereToBuy2 = "";
                        gridCart2 = "";
                        gridShare2 = "";
                        gridWish2 = "";
                        productSize2 = "";
                        productFontSize2 = "0";
                        imageContainer = "#ffffff";
                        logoText = "";
                        shareUrl2 = "";
                    }
                } else {
                    product_sku1 = "";
                    gridProductname1 = "";
                    collectionId1 = "";
                    collectionImage1 = "";
                    gridWhereToBuy1 = "";
                    gridCart1 = "";
                    gridShare1 = "";
                    gridWish1 = "";
                    productSize1 = "";
                    productFontSize1 = "0";
                    shareUrl1 = "";
                }
                if ("shop" == args.type) {
                    try {
                        isNullVal(value[0].in_stock) ? 1 == value[0].in_stock ? outOfStock1 = false : 0 == value[0].in_stock && (outOfStock1 = true) : outOfStock1 = void 0;
                    } catch (exp) {
                        outOfStock1 = void 0;
                    }
                    try {
                        isNullVal(value[1].in_stock) ? 1 == value[1].in_stock ? outOfStock2 = false : 0 == value[1].in_stock && (outOfStock2 = true) : outOfStock2 = void 0;
                    } catch (exp1) {
                        outOfStock2 = void 0;
                    }
                    try {
                        isNullVal(value.in_stock) ? 1 == value.in_stock ? outOfStock1 = false : 0 == value.in_stock && (outOfStock1 = true) : outOfStock1 = void 0;
                    } catch (exp1) {
                        outOfStock1 = void 0;
                    }
                    gridCart1 = Alloy.Globals.icon.bag;
                    gridCart2 = Alloy.Globals.icon.bag;
                    productFontSize1 = "9";
                    productFontSize2 = "9";
                    if (value) {
                        cartIconColor_0 = true == value.cartItem ? "#e65e48" : "gridTemplate" == activeTemplate ? "#66000000" : "#a6a6a6";
                        productSize1 = value.product_size;
                    }
                    if (value[0]) {
                        productSize1 = value[0].product_size;
                        cartIconColor_0 = true == value[0].cartItem ? "#e65e48" : "gridTemplate" == activeTemplate ? "#66000000" : "#a6a6a6";
                        if (value[1]) {
                            productSize2 = value[1].product_size;
                            cartIconColor_1 = true == value[1].cartItem ? "#e65e48" : "gridTemplate" == activeTemplate ? "#66000000" : "#a6a6a6";
                        } else {
                            gridCart2 = "";
                            productSize2 = "";
                            productFontSize2 = "0";
                        }
                    }
                } else {
                    gridCart1 = "";
                    gridCart2 = "";
                    productSize1 = "";
                    productSize2 = "";
                    productFontSize1 = "0";
                    productFontSize2 = "0";
                }
            } else if ("shopByLook" == args.type) {
                if (value) {
                    gridProductname1 = value.looks_name;
                    collectionId1 = value.looks_id;
                    collectionImage1 = encodeURI(value.image);
                    gridWhereToBuy1 = "Where to buy";
                    gridShare1 = Alloy.Globals.icon.share;
                    gridWish1 = isSelected_0;
                    gridCart1 = "";
                    productSize1 = "";
                    productFontSize1 = "0";
                    shareUrl1 = value.collection_url ? value.collection_url : value.product_url ? value.product_url : value.url ? value.url : "";
                }
                if ("gridTemplate" == templateName) if (value[0]) {
                    gridProductname1 = value[0].looks_name;
                    collectionId1 = value[0].looks_id;
                    collectionImage1 = encodeURI(value[0].image);
                    gridWhereToBuy1 = "Where to buy";
                    gridShare1 = Alloy.Globals.icon.share;
                    gridWish1 = isSelected_0;
                    gridCart1 = "";
                    productSize1 = "";
                    productFontSize1 = "0";
                    shareUrl1 = value[0].collection_url ? value[0].collection_url : value[0].product_url ? value[0].product_url : value[0].url ? value.url : "";
                    if (value[1]) {
                        gridProductname2 = value[1].looks_name;
                        collectionId2 = value[1].looks_id;
                        collectionImage2 = encodeURI(value[1].image);
                        gridWhereToBuy2 = "Where to buy";
                        gridShare2 = Alloy.Globals.icon.share;
                        gridWish2 = isSelected_1;
                        gridCart2 = "";
                        productSize2 = "";
                        productFontSize2 = "0";
                        imageContainer = "#eeece7";
                        logoText = "";
                        shareUrl2 = value[1].collection_url ? value[1].collection_url : value[1].product_url ? value[1].product_url : value[1].url ? value[1].url : "";
                    } else {
                        gridProductname2 = "";
                        collectionId2 = "";
                        collectionImage2 = "";
                        gridWhereToBuy2 = "";
                        gridCart2 = "";
                        gridShare2 = "";
                        gridWish2 = "";
                        productSize2 = "";
                        productFontSize2 = "0";
                        imageContainer = "#ffffff";
                        logoText = "";
                        shareUrl2 = "";
                    }
                } else {
                    gridProductname1 = "";
                    collectionId1 = "";
                    collectionImage1 = "";
                    gridWhereToBuy1 = "";
                    gridCart1 = "";
                    gridShare1 = "";
                    gridWish1 = "";
                    productSize1 = "";
                    shareUrl1 = "";
                    productFontSize1 = "0";
                }
            } else if ("collection" == args.type) {
                if (value) {
                    gridProductname1 = value.collection_name;
                    collectionId1 = value.collection_id;
                    collectionImage1 = encodeURI(value.image);
                    gridWhereToBuy1 = "Where to buy";
                    gridShare1 = Alloy.Globals.icon.share;
                    gridWish1 = isSelected_0;
                    gridCart1 = "";
                    productSize1 = "";
                    productFontSize1 = "0";
                    shareUrl1 = value.collection_url ? value.collection_url : value.product_url ? value.product_url : value.url ? value.url : "";
                }
                if ("gridTemplate" == templateName) if (value[0]) {
                    gridProductname1 = value[0].collection_name;
                    collectionId1 = value[0].collection_id;
                    collectionImage1 = encodeURI(value[0].image);
                    gridWhereToBuy1 = "Where to buy";
                    gridShare1 = Alloy.Globals.icon.share;
                    gridWish1 = isSelected_0;
                    gridCart1 = "";
                    productSize1 = "";
                    productFontSize1 = "0";
                    shareUrl1 = value[0].collection_url ? value[0].collection_url : value[0].product_url ? value[0].product_url : value[0].url ? value.url : "";
                    if (value[1]) {
                        gridProductname2 = value[1].collection_name;
                        collectionId2 = value[1].collection_id;
                        collectionImage2 = encodeURI(value[1].image);
                        gridWhereToBuy2 = "Where to buy";
                        gridShare2 = Alloy.Globals.icon.share;
                        gridWish2 = isSelected_1;
                        gridCart2 = "";
                        productSize2 = "";
                        shareUrl2 = value[1].collection_url ? value[1].collection_url : value[1].product_url ? value[1].product_url : value[1].url ? value[1].url : "";
                        productFontSize2 = "0";
                        imageContainer = "#eeece7";
                        logoText = "";
                    } else {
                        gridProductname2 = "";
                        collectionId2 = "";
                        collectionImage2 = "";
                        gridWhereToBuy2 = "";
                        gridCart2 = "";
                        gridShare2 = "";
                        gridWish2 = "";
                        shareUrl2 = "";
                        productSize2 = "";
                        productFontSize2 = "0";
                        imageContainer = "#ffffff";
                        logoText = "";
                    }
                } else {
                    gridProductname1 = "";
                    collectionId1 = "";
                    collectionImage1 = "";
                    gridWhereToBuy1 = "";
                    gridCart1 = "";
                    gridShare1 = "";
                    gridWish1 = "";
                    productSize1 = "";
                    productFontSize1 = "0";
                    shareUrl1 = "";
                }
            }
            listData.push({
                properties: {
                    collectionId: collectionId1
                },
                template: templateName,
                gridProductname1: {
                    text: isNullVal(gridProductname1) ? gridProductname1 : gridProductname1.toUpperCase(),
                    collectionId: collectionId1
                },
                gridProductname2: {
                    text: isNullVal(gridProductname2) ? gridProductname2 : gridProductname2.toUpperCase(),
                    collectionId: collectionId2
                },
                gridCart1: {
                    text: gridCart1,
                    product_name_ga: isNullVal(gridProductname1) ? gridProductname1 : gridProductname1.toUpperCase(),
                    product_sku: product_sku1,
                    collectionId: collectionId1,
                    color: "gridTemplate" == templateName ? "#fff" : cartIconColor_0,
                    backgroundColor: "gridTemplate" == templateName ? cartIconColor_0 : "transparent",
                    visible: "" == gridCart1 ? false : !outOfStock1
                },
                gridCart2: {
                    text: gridCart2,
                    product_name_ga: isNullVal(gridProductname2) ? gridProductname2 : gridProductname2.toUpperCase(),
                    product_sku: product_sku2,
                    collectionId: collectionId2,
                    color: "gridTemplate" == templateName ? "#fff" : cartIconColor_1,
                    backgroundColor: "gridTemplate" == templateName ? cartIconColor_1 : "transparent",
                    visible: "" == gridCart2 ? false : !outOfStock2
                },
                gridShare1: {
                    collectionId: collectionId1,
                    text: gridShare1,
                    shareUrl: shareUrl1
                },
                gridShare2: {
                    collectionId: collectionId2,
                    text: gridShare2,
                    shareUrl: shareUrl2
                },
                gridWish1: {
                    collectionId: collectionId1,
                    iconValue: "",
                    text: gridWish1,
                    color: wishIconColor_0,
                    collectionName: gridProductname1,
                    product_sku: product_sku1,
                    lost_sale: !!outOfStock1
                },
                gridWish2: {
                    collectionId: collectionId2,
                    iconValue: "",
                    text: gridWish2,
                    color: wishIconColor_1,
                    collectionName: gridProductname2,
                    product_sku: product_sku2,
                    lost_sale: !!outOfStock2
                },
                gridProductImage1: {
                    image: collectionImage1,
                    collectionId: collectionId1
                },
                gridProductImage2: {
                    image: collectionImage2,
                    collectionId: collectionId2
                },
                gridWhereToBuy1: {
                    text: gridWhereToBuy1,
                    collectionId: collectionId1,
                    product_name_ga: isNullVal(gridProductname1) ? gridProductname1 : gridProductname1.toUpperCase()
                },
                gridWhereToBuy2: {
                    text: gridWhereToBuy2,
                    collectionId: collectionId2,
                    product_name_ga: isNullVal(gridProductname2) ? gridProductname2 : gridProductname2.toUpperCase()
                },
                listContainer: {
                    collectionId: collectionId1
                },
                productSize1: {
                    collectionId: collectionId1,
                    text: productSize1,
                    font: {
                        fontSize: productFontSize1
                    }
                },
                productSize2: {
                    collectionId: collectionId1,
                    text: productSize2,
                    font: {
                        fontSize: productFontSize2
                    }
                },
                imageContainer: {
                    backgroundColor: imageContainer
                },
                gridLogo: {
                    text: logoText
                },
                outOfStock1: {
                    visible: outOfStock1 || false,
                    collectionId: collectionId1
                },
                outOfStock2: {
                    visible: outOfStock2 || false,
                    collectionId: collectionId2
                }
            });
        }); else {
            $.total_toast_lbl.setText("Total 00");
            if (!isNullVal(args.type)) switch (args.type) {
              case "shopByLook":
                message = "THERE ARE NO COLLECTIONS IN THIS CATEGORY.";
                break;

              case "collection":
                message = "THERE ARE NO COLLECTIONS IN THIS CATEGORY.";
                break;

              default:
                message = "THERE ARE NO PRODUCTS IN THIS CATEGORY.";
            }
            listData.push({
                properties: {},
                template: "emptyTemplate",
                message: {
                    text: message
                }
            });
        }
        $.mainSection.appendItems(listData);
        "gridTemplate" == templateName ? $.listView.scrollToItem(0, itemIndex_ / 2) : $.listView.scrollToItem(0, itemIndex_);
        if (page_no <= Math.ceil(totalItem / limit)) switch (templateName) {
          case "gridTemplate":
            $.listView.setMarker({
                sectionIndex: 0,
                itemIndex: page_no / 2 * 6 - 2
            });
        }
    }
    function getCollectionListOnLazy(page_no, limit) {
        $.activityInd.show();
        if (!isNullVal(args.type)) {
            var _argsBlock = "", _argsProductId = "", _argsSlider = "", _argsNavigatedblockid = "", _argsCollectionId = "", _argsColor = "", _argsLookId = "";
            isNullVal(args.block) || (_argsBlock = args.block);
            isNullVal(args.productID) || (_argsProductId = args.productID);
            isNullVal(args.slider) || (_argsSlider = args.slider);
            isNullVal(args.navigatedblockid) || (_argsNavigatedblockid = args.navigatedblockid);
            isNullVal(args.collectionID) || (_argsCollectionId = args.collectionID);
            isNullVal(args.color) || (_argsColor = args.color);
            isNullVal(args.lookID) || (_argsLookId = args.lookID);
            if ("product" == args.type || "shop" == args.type || "wallpaper" == args.type) {
                lazyUrl = Alloy.Globals.commonUrl.productGetSliderViewAll;
                lazyData = {
                    block: _argsBlock,
                    Productid: _argsProductId,
                    slider: _argsSlider,
                    navigatedblockid: _argsNavigatedblockid,
                    page_no: page_no,
                    page_size: limit
                };
                var requestParams = JSON.stringify(lazyData);
                Alloy.Globals.webServiceCall(lazyUrl, requestParams, subCollectionSuccessCallback, subCollectionErrorCallback, "POST", $.otherListingPage);
            } else if ("shopByLook" == args.type) {
                lazyUrl = Alloy.Globals.commonUrl.lookGetsliderviewall;
                lazyData = {
                    block: _argsBlock,
                    lookID: _argsLookId,
                    page_no: page_no,
                    page_size: limit
                };
                var requestParams = JSON.stringify(lazyData);
                Alloy.Globals.webServiceCall(lazyUrl, requestParams, subCollectionSuccessCallback, subCollectionErrorCallback, "POST", $.otherListingPage, true);
            } else if ("collection" == args.type) {
                lazyUrl = Alloy.Globals.commonUrl.getsliderviewall;
                lazyData = {
                    block: _argsBlock,
                    collectionID: _argsCollectionId,
                    page_no: page_no,
                    page_size: limit
                };
                var requestParams = JSON.stringify(lazyData);
                Alloy.Globals.webServiceCall(lazyUrl, requestParams, subCollectionSuccessCallback, subCollectionErrorCallback, "POST", $.otherListingPage, true);
            } else if ("collection_availabledesign" == args.type) {
                lazyUrl = Alloy.Globals.commonUrl.getsliderviewall;
                lazyData = {
                    block: _argsBlock,
                    color: _argsColor,
                    collectionID: _argsCollectionId,
                    page_no: page_no,
                    page_size: limit
                };
                var requestParams = JSON.stringify(lazyData);
                Alloy.Globals.webServiceCall(lazyUrl, requestParams, subCollectionSuccessCallback, subCollectionErrorCallback, "POST", $.otherListingPage);
            }
        }
    }
    function goToBack() {
        $.listTypeContainer.removeEventListener("click", toggleListType);
        $.otherListingPage.removeEventListener("click", hideOverFlowMenu);
        Alloy.Globals.popWindowInNav();
        $.otherListingPage.close();
    }
    function destroyWindow(e) {
        $.otherListingPage.removeAllChildren();
        $.destroy();
    }
    function updateCount() {
        $.header.updateCartCount();
        if (_.size(backupData) > 0) {
            addtocartItem = [];
            addtocartItem = Titanium.App.Properties.getList("cartProductIdArray");
            viewTypeLooping(backupData, activeTemplate);
        }
    }
    function updateItemListClick(e) {
        $.listView.fireEvent("itemclick", e);
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "otherListingPage";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.otherListingPage = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        backgroundColor: "#ffffff",
        id: "otherListingPage"
    });
    $.__views.otherListingPage && $.addTopLevelView($.__views.otherListingPage);
    goToBack ? $.addListener($.__views.otherListingPage, "android:back", goToBack) : __defers["$.__views.otherListingPage!android:back!goToBack"] = true;
    destroyWindow ? $.addListener($.__views.otherListingPage, "close", destroyWindow) : __defers["$.__views.otherListingPage!close!destroyWindow"] = true;
    updateCount ? $.addListener($.__views.otherListingPage, "focus", updateCount) : __defers["$.__views.otherListingPage!focus!updateCount"] = true;
    $.__views.header = Alloy.createWidget("headerView", "widget", {
        id: "header",
        __parentSymbol: $.__views.otherListingPage
    });
    $.__views.header.setParent($.__views.otherListingPage);
    $.__views.footerView = Ti.UI.createView({
        id: "footerView",
        height: "85dp"
    });
    $.__views.activityInd = Ti.UI.createActivityIndicator({
        id: "activityInd",
        top: 10
    });
    $.__views.footerView.add($.__views.activityInd);
    var __alloyId1129 = {};
    Alloy.createController("listTemplate", {
        __parentSymbol: __parentSymbol,
        __itemTemplate: __alloyId1129
    });
    $.__views.mainSection = Ti.UI.createListSection({
        id: "mainSection"
    });
    var __alloyId1132 = [];
    __alloyId1132.push($.__views.mainSection);
    $.__views.listView = Ti.UI.createListView({
        top: "53dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        sections: __alloyId1132,
        templates: __alloyId1129,
        footerView: $.__views.footerView,
        id: "listView",
        defaultItemTemplate: "listTypeTemplate"
    });
    $.__views.otherListingPage.add($.__views.listView);
    $.__views.listTypeContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: "127dp",
        bottom: "-65dp",
        layout: "vertical",
        id: "listTypeContainer"
    });
    $.__views.otherListingPage.add($.__views.listTypeContainer);
    $.__views.total_toast_lbl = Ti.UI.createLabel({
        backgroundColor: "#a6000000",
        color: "#ffffff",
        font: {
            fontSize: "10dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        height: "17dp",
        width: "80dp",
        borderRadius: "10",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        touchEnabled: false,
        id: "total_toast_lbl"
    });
    $.__views.listTypeContainer.add($.__views.total_toast_lbl);
    $.__views.__alloyId1133 = Ti.UI.createView({
        backgroundColor: "#ccffffff",
        top: "10dp",
        layout: "vertical",
        id: "__alloyId1133"
    });
    $.__views.listTypeContainer.add($.__views.__alloyId1133);
    $.__views.listTypeLbl = Ti.UI.createLabel({
        font: {
            fontSize: "10sp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#333333",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        height: "35dp",
        width: Titanium.UI.FILL,
        top: "0dp",
        id: "listTypeLbl"
    });
    $.__views.__alloyId1133.add($.__views.listTypeLbl);
    $.__views.listTypeSubContainer = Ti.UI.createView({
        width: "60%",
        height: "65dp",
        id: "listTypeSubContainer"
    });
    $.__views.__alloyId1133.add($.__views.listTypeSubContainer);
    $.__views.gridContainer = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: "0dp",
        layout: "vertical",
        id: "gridContainer"
    });
    $.__views.listTypeSubContainer.add($.__views.gridContainer);
    $.__views.gridIcon = Ti.UI.createLabel({
        font: {
            fontSize: "35dp",
            fontFamily: "icomoon"
        },
        color: "#000000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        touchEnabled: false,
        text: Alloy.Globals.icon.grid,
        id: "gridIcon"
    });
    $.__views.gridContainer.add($.__views.gridIcon);
    $.__views.gridLbl = Ti.UI.createLabel({
        font: {
            fontSize: "10sp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#000000",
        top: "5dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        touchEnabled: false,
        text: "GRID",
        id: "gridLbl"
    });
    $.__views.gridContainer.add($.__views.gridLbl);
    $.__views.listContainer = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "listContainer"
    });
    $.__views.listTypeSubContainer.add($.__views.listContainer);
    $.__views.listIcon = Ti.UI.createLabel({
        font: {
            fontSize: "35dp",
            fontFamily: "icomoon"
        },
        color: "#000000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        touchEnabled: false,
        text: Alloy.Globals.icon.list,
        id: "listIcon"
    });
    $.__views.listContainer.add($.__views.listIcon);
    $.__views.listLbl = Ti.UI.createLabel({
        font: {
            fontSize: "10sp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#000000",
        top: "5dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        touchEnabled: false,
        text: "LIST",
        id: "listLbl"
    });
    $.__views.listContainer.add($.__views.listLbl);
    $.__views.blockContainer = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        right: "0dp",
        layout: "vertical",
        id: "blockContainer"
    });
    $.__views.listTypeSubContainer.add($.__views.blockContainer);
    $.__views.blockIcon = Ti.UI.createLabel({
        font: {
            fontSize: "35dp",
            fontFamily: "icomoon"
        },
        color: "#000000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        touchEnabled: false,
        text: Alloy.Globals.icon.block,
        id: "blockIcon"
    });
    $.__views.blockContainer.add($.__views.blockIcon);
    $.__views.blockLbl = Ti.UI.createLabel({
        font: {
            fontSize: "10sp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#000000",
        top: "5dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        touchEnabled: false,
        text: "BLOCK",
        id: "blockLbl"
    });
    $.__views.blockContainer.add($.__views.blockLbl);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var gridData, firstCount, secondCount;
    var gaAddToCartData = {};
    var page_no = 1;
    var limit = 10;
    var totalItem;
    var listData = [];
    var backupData = [];
    var cartProductId = [];
    var selectedCartItem = [];
    var unSelectedCartItem = [];
    var addtocartItem = [];
    var lazyData, lazyUrl, message;
    var displayCount;
    var collectionImage1, collectionImage2, collectionId1, gridWhereToBuy1, gridWhereToBuy2, gridProductname1, gridProductname2, productSize1, productSize2, productFontSize1, productFontSize2, gridShare1, gridShare2, gridWish1, gridWish2, gridCart1, gridCart2, collectionId2, imageContainer, logoText, isSelected_0, isSelected_1, outOfStock1, outOfStock2, wishIconColor_0 = "transparent", wishIconColor_1 = "transparent", cartIconColor_0 = "transparent", cartIconColor_1 = "transparent";
    var cartData = "";
    var shortlistData = "";
    $.gridIcon.setColor("#e65e48");
    $.gridLbl.setColor("#e65e48");
    var activeTemplate = "gridTemplate";
    Titanium.App.Properties.setList("cartAllid", []);
    var itemIndex_ = 0;
    var toggleStatus = true;
    var wTitle = "";
    var shareUrl1, shareUrl2;
    var gaShortlistProduct = {}, product_sku1 = "", product_sku2 = "";
    if (!isNullVal(args.block)) switch (args.block) {
      case "similarcollection":
        wTitle = "SIMILAR COLLECTIONS";
        break;

      case "peoplealsoviewed":
        wTitle = "MOST VIEWED";
        break;

      case "availabledesign":
        wTitle = "AVAILABLE DESIGNS";
    }
    if (!isNullVal(args.slider)) switch (args.slider) {
      case "availabledesign":
        wTitle = "AVAILABLE DESIGNS";
        break;

      case "matchesbestwith":
        wTitle = "BEST MATCHES WITH";
        break;

      case "alsoavailableas":
        wTitle = "ALSO AVAILABLE AS";
        break;

      case "similarproducts":
        wTitle = "SIMILAR PRODUCTS";
        break;

      case "peoplealsoviewed":
        wTitle = "BEST MATCHES WITH";
        break;

      case "similarlook":
        wTitle = "SIMILAR LOOK";
    }
    $.header.init({
        title: wTitle,
        passWindow: $.otherListingPage
    });
    googleAnalyticsScreen(wTitle);
    $.header.updateCartCount();
    setAttributeStr("GRID");
    $.listTypeContainer.addEventListener("click", toggleListType);
    $.listTypeSubContainer.addEventListener("click", function(e) {
        switch (e.source.id) {
          case "gridContainer":
            $.gridIcon.color = "#e65e48";
            $.gridLbl.color = "#e65e48";
            $.listIcon.color = "#000000";
            $.listLbl.color = "#000000";
            $.blockIcon.color = "#000000";
            $.blockLbl.color = "#000000";
            setAttributeStr("GRID");
            activeTemplate = "gridTemplate";
            viewTypeLooping(backupData, activeTemplate);
            break;

          case "listContainer":
            $.listIcon.color = "#e65e48";
            $.listLbl.color = "#e65e48";
            $.gridIcon.color = "#000000";
            $.gridLbl.color = "#000000";
            $.blockIcon.color = "#000000";
            $.blockLbl.color = "#000000";
            setAttributeStr("LIST");
            activeTemplate = "listTypeTemplate";
            viewTypeLooping(backupData, activeTemplate);
            break;

          case "blockContainer":
            $.blockIcon.color = "#e65e48";
            $.blockLbl.color = "#e65e48";
            $.gridIcon.color = "#000000";
            $.gridLbl.color = "#000000";
            $.listIcon.color = "#000000";
            $.listLbl.color = "#000000";
            setAttributeStr("BLOCK");
            activeTemplate = "blockTypeTemplate";
            viewTypeLooping(backupData, activeTemplate);
        }
    });
    $.listView.addEventListener("itemclick", function(e) {
        try {
            if (!isNullVal(e.bindId) && "message" != e.bindId) {
                var bind = e.bindId;
                var index = e.itemIndex;
                var a = e.section.items[index];
                if (!isNullVal(a[bind].collectionId)) if ("gridWish1" == e.bindId || "gridWish2" == e.bindId) {
                    if (isNullVal(Ti.App.Properties.getString("access_token"))) Alloy.Globals.addWindowInNav("signIn", {
                        listObject: e,
                        listViewReference: updateItemListClick
                    }); else if (!isNullVal(args.type)) switch (args.type) {
                      case "product":
                        addToShortlist(e);
                        break;

                      case "collection_availabledesign":
                        addToShortlist(e);
                        break;

                      case "shop":
                        addToShortlist(e);
                        break;

                      case "wallpaper":
                        addToShortlist(e);
                        break;

                      case "shopByLook":
                        var collectionData = {
                            collectionName: a[bind].collectionName,
                            collectionId: a[bind].collectionId,
                            type: "shopByLook"
                        };
                        var addToShortlistCollection = Alloy.createController("addToShortlist", collectionData).getView();
                        $.otherListingPage.add(addToShortlistCollection);
                        hideShowView(addToShortlistCollection);
                        break;

                      case "collection":
                        var collectionData = {
                            collectionName: a[bind].collectionName,
                            collectionId: a[bind].collectionId,
                            type: "collection"
                        };
                        var addToShortlistCollection = Alloy.createController("addToShortlist", collectionData).getView();
                        $.otherListingPage.add(addToShortlistCollection);
                        hideShowView(addToShortlistCollection);
                    }
                } else if ("gridCart1" == e.bindId || "gridCart2" == e.bindId) {
                    if (isNullVal(Ti.App.Properties.getString("access_token"))) Alloy.Globals.addWindowInNav("signIn", {
                        listObject: e,
                        listViewReference: updateItemListClick
                    }); else if (!isNullVal(args.type) && a[e.bindId].visible && "shop" === args.type) {
                        var shortlist_flag = null;
                        shortlist_flag = "gridCart1" == e.bindId ? !("" != a["gridWish1"].text) : !("" != a["gridWish2"].text);
                        gaAddToCartData = {};
                        gaAddToCartData = {
                            name: a[bind].product_name_ga,
                            sku: a[bind].product_sku,
                            shortlistFlag: shortlist_flag
                        };
                        cartData = "";
                        cartData = e;
                        var url = Alloy.Globals.commonUrl.addToCart;
                        var data = {
                            product_id: a[bind].collectionId,
                            qty: 1
                        };
                        var requestParams = JSON.stringify(data);
                        Alloy.Globals.webServiceCall(url, requestParams, addToCartSuccessCallback, addToCartErrorCallback, "POST", $.otherListingPage);
                    }
                } else if ("gridWhereToBuy1" != e.bindId && "gridWhereToBuy2" != e.bindId || "Where to buy" != a[bind].text) {
                    if ("gridShare1" == e.bindId || "gridShare2" == e.bindId) shareImage(a[bind].shareUrl); else if (!isNullVal(a[bind].collectionId) && !isNullVal(args.type)) {
                        var args_block = "";
                        args_block = isNullVal(args.block) ? "collection" : args.block;
                        -1 != e.bindId.toString().lastIndexOf("1") ? e.bindId = "gridWish1" : -1 != e.bindId.toString().lastIndexOf("2") && (e.bindId = "gridWish2");
                        switch (args.type) {
                          case "product":
                            var pData = {
                                Productid: a[bind].collectionId,
                                block: args_block,
                                navigatedblockid: "",
                                listObject: e,
                                listViewReference: addToCartCallback
                            };
                            Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
                            break;

                          case "shop":
                            var sData = {
                                Productid: a[bind].collectionId,
                                block: "shop",
                                product: "shopProduct",
                                listObject: e,
                                listViewReference: addToCartCallback
                            };
                            Alloy.Globals.addWindowInNav("estoreDetails", sData);
                            break;

                          case "wallpaper":
                            var sData = {
                                Productid: a[bind].collectionId,
                                block: "shop",
                                product: "wallpaper",
                                listObject: e,
                                listViewReference: addToCartCallback
                            };
                            Alloy.Globals.addWindowInNav("estoreDetails", sData);
                            break;

                          case "shopByLook":
                            var lData = {
                                type: "shopByLook",
                                id: a[bind].collectionId
                            };
                            Alloy.Globals.addWindowInNav("productDetails", lData);
                            break;

                          case "look_availabledesign":
                            var pData = {
                                Productid: a[bind].collectionId,
                                block: "look",
                                navigatedblockid: "",
                                listObject: e,
                                listViewReference: addToCartCallback
                            };
                            Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
                            break;

                          case "collection":
                            var cData = {
                                type: "collection",
                                id: a[bind].collectionId
                            };
                            Alloy.Globals.addWindowInNav("productDetails", cData);
                            break;

                          case "collection_availabledesign":
                            var pData = {
                                Productid: a[bind].collectionId,
                                block: "collection",
                                navigatedblockid: "",
                                listObject: e,
                                listViewReference: addToCartCallback
                            };
                            Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
                        }
                    }
                } else {
                    if (!isNullVal(a[bind].collectionId)) {
                        var gaLeadProductArray = {};
                        gaLeadProductArray = {
                            name: a[bind].product_name_ga || "NA",
                            sku: a[bind].collectionId
                        };
                        generateLead(gaLeadProductArray, "Productlisting Page");
                    }
                    Alloy.Globals.addWindowInNav("findStore");
                }
            }
        } catch (ex) {
            Ti.API.info("catch item click = " + ex.message);
        }
    });
    $.otherListingPage.addEventListener("click", hideOverFlowMenu);
    getSliderViewAll();
    $.listView.addEventListener("marker", function() {
        page_no <= Math.ceil(totalItem / limit) && getCollectionListOnLazy(page_no, limit);
    });
    $.listView.addEventListener("scrollstart", function(e) {
        firstCount = e.firstVisibleItemIndex;
    });
    $.listView.addEventListener("scrollend", function(e) {
        itemIndex_ = "gridTemplate" == activeTemplate ? 2 * e.firstVisibleItemIndex : e.firstVisibleItemIndex;
        secondCount = e.firstVisibleItemIndex;
        secondCount > firstCount ? $.listTypeContainer.animate({
            bottom: "-65",
            duration: 500
        }) : firstCount > secondCount && $.listTypeContainer.animate({
            bottom: "-100",
            duration: 500
        });
    });
    __defers["$.__views.otherListingPage!android:back!goToBack"] && $.addListener($.__views.otherListingPage, "android:back", goToBack);
    __defers["$.__views.otherListingPage!close!destroyWindow"] && $.addListener($.__views.otherListingPage, "close", destroyWindow);
    __defers["$.__views.otherListingPage!focus!updateCount"] && $.addListener($.__views.otherListingPage, "focus", updateCount);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;