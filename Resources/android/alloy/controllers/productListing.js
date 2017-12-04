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
            if ("listTypeTemplate" == activeTemplate || "blockTypeTemplate" == activeTemplate) if ("#ffffff" == a[bind].color) {
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
            showAlert($.productListing, e.message);
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
        showAlert($.productListing, e.message);
    }
    function addToShortlist(productData) {
        var bind_ = "", index_ = "", itemSection_ = "";
        if (isNullVal(Ti.App.Properties.getString("access_token"))) Alloy.Globals.addWindowInNav("signIn", "productListing"); else {
            shortlistData = "";
            if (!isNullVal(productData.bindId)) {
                bind_ = productData.bindId;
                index_ = productData.itemIndex;
                itemSection_ = productData.section.items[index_];
                shortlistData = productData;
                if ("" == itemSection_[bind_].text) {
                    Ti.API.info("itemSection_[bind_] = = " + JSON.stringify(itemSection_[bind_]));
                    gaShortlistProduct = {
                        name: itemSection_[bind_].collectionName,
                        sku: itemSection_[bind_].product_sku,
                        lostSale: itemSection_[bind_].lost_sale
                    };
                    itemSection_[bind_].text = "";
                    itemSection_[bind_].color = "#e65e48";
                    productData.section.updateItemAt(index_, itemSection_);
                    selectedCartItem.push(itemSection_[bind_].collectionId);
                    var url = Alloy.Globals.commonUrl.addToShortlist;
                    var data = {
                        product_id: itemSection_[bind_].collectionId
                    };
                    var requestParams = JSON.stringify(data);
                    Alloy.Globals.webServiceCall(url, requestParams, addToShortlistSuccessCallback, addToShortlistErrorCallback, "POST", $.productListing);
                } else {
                    itemSection_[bind_].text = "";
                    itemSection_[bind_].color = "#a6a6a6";
                    productData.section.updateItemAt(index_, itemSection_);
                    selectedCartItem.splice(selectedCartItem.indexOf(itemSection_[bind_].collectionId), 1);
                    unSelectedCartItem.push(itemSection_[bind_].collectionId);
                    var url = Alloy.Globals.commonUrl.removeShortlist;
                    var data = {
                        product_id: itemSection_[bind_].collectionId
                    };
                    var requestParams = JSON.stringify(data);
                    Alloy.Globals.webServiceCall(url, requestParams, removeShortlistProductSuccessCallback, removeShortlistProductErrorCallback, "POST", $.productListing);
                }
            }
        }
    }
    function addToShortlistSuccessCallback(e) {
        try {
            showAlert($.productListing, e.message);
            googleAnalyticsShortlist(gaShortlistProduct, gaScreenName);
        } catch (e) {
            Ti.API.info("catch = " + ex.message);
        }
    }
    function addToShortlistErrorCallback(e) {
        var pbind = "", pindex = "", pitemSection = "";
        pbind = shortlistData.bindId;
        pindex = shortlistData.itemIndex;
        pitemSection = shortlistData.section.items[pindex];
        pitemSection[pbind].text = "";
        pitemSection[pbind].color = "#a6a6a6";
        selectedCartItem.splice(selectedCartItem.indexOf(pitemSection[pbind].collectionId), 1);
        unSelectedCartItem.push(pitemSection[pbind].collectionId);
        shortlistData.section.updateItemAt(shortlistData.itemIndex, pitemSection);
        showAlert($.productListing, e.message);
    }
    function removeShortlistProductSuccessCallback(e) {
        try {
            showAlert($.productListing, e.message);
        } catch (ex) {
            Ti.API.info("catch = " + ex.message);
        }
    }
    function removeShortlistProductErrorCallback(e) {
        showAlert($.productListing, e.message);
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
    function getSubCollection() {
        showLoader($.productListing);
        var url = "";
        listData = [];
        backupData = [];
        cartProductId = [];
        var data = {};
        $.mainSection.setItems(listData);
        if (!isNullVal(sortBy) || _.size(filters) > 0 || !isNullVal(selectedStyle)) {
            page_no = 1;
            limit = 10;
        }
        filtersData = {};
        _.size(filters) > 0 && _.each(filters, function(value, key) {
            value.length > 0 && (filtersData[key] = value.join(","));
        });
        if (isNullVal(args.type)) Ti.API.info("in else"); else switch (args.type) {
          case "shopByLook":
            url = Alloy.Globals.commonUrl.allLooks;
            data = {
                sortby: sortBy || "",
                style: selectedStyle || "ALL STYLES"
            };
            data.pagination = {
                page_no: page_no,
                page_size: limit
            };
            _.size(filtersData) > 0 ? data["filter_applied"] = filtersData : data["filter_applied"] = "";
            var requestParams = JSON.stringify(data);
            Alloy.Globals.webServiceCall(url, requestParams, subCollectionSuccessCallback, subCollectionErrorCallback, "POST", $.productListing, true);
            break;

          case "collection":
            if (!isNullVal(args.block)) {
                switch (args.block) {
                  case "Allcollection":
                    url = Alloy.Globals.commonUrl.ourrange;
                    data = {
                        category: args.categoryName,
                        categoryId: args.categoryId,
                        sortby: sortBy || "",
                        pagination: {}
                    };
                    data.pagination = {
                        page_no: page_no,
                        page_size: limit
                    };
                    _.size(filtersData) > 0 ? data["filters"] = filtersData : data["filters"] = "";
                    break;

                  case "collection":
                    url = Alloy.Globals.commonUrl.getSubCollection;
                    data = {
                        collection_enduse: args.categoryName,
                        sortby: sortBy || "",
                        pagination: {}
                    };
                    data.pagination[args.categoryName] = {
                        page_no: page_no,
                        page_size: limit
                    };
                    _.size(filtersData) > 0 ? data["filters"] = filtersData : data["filters"] = "";
                }
                var requestParams = JSON.stringify(data);
                Alloy.Globals.webServiceCall(url, requestParams, subCollectionSuccessCallback, subCollectionErrorCallback, "POST", $.productListing, true);
            }
            break;

          case "C_Product":
            url = Alloy.Globals.commonUrl.ourrange;
            data = {
                category: args.wName,
                categoryId: args.categoryId,
                sortby: sortBy || "",
                pagination: {}
            };
            data.pagination = {
                page_no: page_no,
                page_size: limit
            };
            _.size(filtersData) > 0 ? data["filters"] = filtersData : data["filters"] = "";
            var requestParams = JSON.stringify(data);
            Ti.API.info("requestParam---->>> " + requestParams);
            Alloy.Globals.webServiceCall(url, requestParams, subCollectionSuccessCallback, subCollectionErrorCallback, "POST", $.productListing);
        }
    }
    function subCollectionSuccessCallback(e) {
        try {
            hideLoader($.productListing);
            if (!isNullVal(args.type)) {
                switch (args.type) {
                  case "shopByLook":
                    totalItem = e.data.looks_data.total_count;
                    var text = "Total " + totalItem;
                    0 == $.styleScroll.children.length && _.each(e.data.styles, function(value, k) {
                        styleOption[k] = Ti.UI.createLabel({
                            width: Ti.UI.FILL,
                            height: "35dp",
                            left: "10dp",
                            right: "10dp",
                            color: "#333333",
                            font: {
                                fontSize: "10dp",
                                fontFamily: "futura_medium_bt-webfont"
                            },
                            text: isNullVal(value) ? value : value.toUpperCase(),
                            backgroundColor: "#ffffff"
                        });
                        $.styleScroll.add(styleOption[k]);
                    });
                    if (isNullVal(e.data.looks_data.looks_list)) {
                        displayCount = "";
                        gridData = "";
                        $.total_toast_lbl.setText("Total 00");
                    } else {
                        displayCount = e.data.looks_data.looks_list.length;
                        gridData = e.data.looks_data.looks_list;
                        looping_value(e.data.looks_data.looks_list, activeTemplate);
                    }
                    isNullVal(args.style) || $.styleNameLbl.setText(args.style);
                    break;

                  case "collection":
                    if (!isNullVal(args.block)) switch (args.block) {
                      case "Allcollection":
                        totalItem = e.data.collection_data.total_count;
                        var text = "Total " + totalItem;
                        if (isNullVal(e.data.collection_data.product_data)) {
                            displayCount = "";
                            gridData = "";
                            $.total_toast_lbl.setText("Total 00");
                        } else {
                            displayCount = e.data.collection_data.product_data.length;
                            gridData = e.data.collection_data.product_data;
                            looping_value(e.data.collection_data.product_data, activeTemplate);
                        }
                        break;

                      case "collection":
                        totalItem = e.data.collection_data[0].total_count;
                        var text = "Total " + totalItem;
                        if (isNullVal(e.data.collection_data[0].product_data)) {
                            displayCount = "";
                            gridData = "";
                            $.total_toast_lbl.setText("Total 00");
                        } else {
                            displayCount = e.data.collection_data[0].product_data.length;
                            gridData = e.data.collection_data[0].product_data;
                            looping_value(e.data.collection_data[0].product_data, activeTemplate);
                        }
                    }
                    break;

                  case "C_Product":
                    totalItem = e.data.product_data.total_count;
                    var text = "Total " + totalItem;
                    if (isNullVal(e.data.product_data.product_listing)) {
                        displayCount = "";
                        gridData = "";
                        $.total_toast_lbl.setText("Total 00");
                    } else {
                        displayCount = e.data.product_data.product_listing.length;
                        gridData = e.data.product_data.product_listing;
                        looping_value(e.data.product_data.product_listing, activeTemplate);
                    }
                }
                var toast_attr = Ti.UI.createAttributedString({
                    text: text,
                    attributes: [ {
                        type: Ti.UI.ATTRIBUTE_FONT,
                        value: {
                            fontSize: "10dp",
                            fontFamily: "futura_medium_bt-webfont"
                        },
                        range: [ text.indexOf(totalItem + ""), (totalItem + "").length ]
                    } ]
                });
                $.total_toast_lbl.attributedString = toast_attr;
            }
            filterRawData = e;
            addFilterByRows(filterRawData);
            if (0 == displayCount) {
                $.total_toast_lbl.setText("Total 00");
                $.filterContainer.visible = false;
                $.styleFilterView.visible = false;
                if (!isNullVal(args.type)) switch (args.type) {
                  case "shopByLook":
                    message = "THERE ARE NO COLLECTIONS IN THIS CATEGORY.";
                    break;

                  case "collection":
                    message = "THERE ARE NO COLLECTIONS IN THIS CATEGORY.";
                    break;

                  case "C_Product":
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
            Ti.API.info("catch error" + ex.message);
            showAlert($.productListing, "Something went wrong...");
            setTimeout(function() {
                goToBack();
            }, 1e3);
        }
    }
    function addFilterByRows(e) {
        if (!isNullVal(e.data.filter_attributes) && e.data.filter_attributes.length > 0) {
            sortTotalCount = e.data.sort_attributes.length;
            0 == $.filterByContainer.children.length && _.each(e.data.filter_attributes, function(value, k) {
                var code = value.code;
                var title = value.title;
                filterMainContainer[k] = Ti.UI.createView({
                    height: "35dp",
                    top: "0dp",
                    left: "0dp",
                    width: Titanium.UI.FILL,
                    layout: "vertical",
                    id: k,
                    type: "filterOption"
                });
                filterLbl[k] = Ti.UI.createLabel({
                    id: "lbl" + k,
                    font: {
                        fontSize: "13dp",
                        fontFamily: "futura_lt_bt_light-webfont"
                    },
                    color: "#e65e48",
                    top: "0dp",
                    left: "0dp",
                    height: "35dp",
                    width: Titanium.UI.FILL,
                    touchEnabled: false,
                    text: value.title.toUpperCase(),
                    code: value.code
                });
                filterMainContainer[k].add(filterLbl[k]);
                _.each(e.data.filter_attributes[k].options, function(value, l) {
                    subFilterContainer[l] = Ti.UI.createView({
                        height: "35dp",
                        top: "0dp",
                        left: "0dp",
                        width: Titanium.UI.FILL,
                        id: l,
                        type: "filterSubOption",
                        value: value.value,
                        code: code,
                        title: title
                    });
                    checkFilterLbl[l] = Ti.UI.createLabel({
                        id: "lbl" + l,
                        font: {
                            fontSize: "14dp",
                            fontFamily: "icomoon"
                        },
                        color: "#e65e48",
                        top: "0dp",
                        left: "0dp",
                        height: "35dp",
                        width: "30dp",
                        touchEnabled: false,
                        text: ""
                    });
                    subFilterContainer[l].add(checkFilterLbl[l]);
                    subFilterLbl[l] = Ti.UI.createLabel({
                        id: "lbl" + l,
                        font: {
                            fontSize: "13dp",
                            fontFamily: "futura_lt_bt_light-webfont"
                        },
                        color: "#ffffff",
                        top: "0dp",
                        left: "30dp",
                        height: "35dp",
                        width: Titanium.UI.FILL,
                        touchEnabled: false,
                        text: isNullVal(value.label) ? value.label : value.label.toUpperCase()
                    });
                    subFilterContainer[l].add(subFilterLbl[l]);
                    filterMainContainer[k].add(subFilterContainer[l]);
                });
                $.filterByContainer.add(filterMainContainer[k]);
            });
            0 == $.sortDetails.children.length && _.each(e.data.sort_attributes, function(value, k) {
                sortContainer[k] = Ti.UI.createView({
                    height: "35dp",
                    top: "0dp",
                    left: "0dp",
                    width: Titanium.UI.FILL,
                    layout: "vertical",
                    id: k,
                    type: "sortOption"
                });
                $.sortDetails.add(sortContainer[k]);
                sortLbl[k] = Ti.UI.createLabel({
                    id: "lbl" + k,
                    font: {
                        fontSize: "13dp",
                        fontFamily: "futura_lt_bt_light-webfont"
                    },
                    color: "#e65e48",
                    top: "0dp",
                    left: "0dp",
                    width: Titanium.UI.FILL,
                    touchEnabled: false,
                    text: value.name.toUpperCase(),
                    value: value.value
                });
                sortContainer[k].add(sortLbl[k]);
            });
        }
    }
    function subCollectionErrorCallback(e) {
        hideLoader($.productListing);
        showAlert($.productListing, e.message);
        displayCount = 0;
        $.total_toast_lbl.setText("Total 00");
        $.filterContainer.visible = false;
        $.styleFilterView.visible = false;
        message = "";
        if (!isNullVal(args.type)) switch (args.type) {
          case "shopByLook":
            message = "THERE ARE NO COLLECTIONS IN THIS CATEGORY.";
            break;

          case "collection":
            message = "THERE ARE NO COLLECTIONS IN THIS CATEGORY.";
            break;

          case "C_Product":
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
    function sortBySelectedEffect(e) {
        if ("sortOption" == e.source.type) {
            for (var i = 0; sortTotalCount > i; i++) {
                var sortText = sortLbl[i].text;
                sortLbl[i].applyProperties(style1);
                var attr = Ti.UI.createAttributedString({
                    text: sortText,
                    attributes: [ {
                        type: Titanium.UI.ATTRIBUTE_UNDERLINES_STYLE,
                        range: [ 0, 0 ]
                    } ]
                });
                sortLbl[i].attributedString = attr;
            }
            e.source.children[0].applyProperties(style);
            var text = e.source.children[0].text;
            var attr = Ti.UI.createAttributedString({
                text: text,
                attributes: [ {
                    type: Titanium.UI.ATTRIBUTE_UNDERLINES_STYLE,
                    range: [ 0, text.length ]
                } ]
            });
            e.source.children[0].attributedString = attr;
            sortBy = e.source.children[0].value;
            getSubCollection();
            hideShowView($.sortView);
        }
    }
    function looping_value(loopData, templateName) {
        try {
            listData = [];
            var cartDataArray = [];
            var cartIdArray = [];
            switch (templateName) {
              case "gridTemplate":
                _.each(loopData, function(value, k) {
                    backupData.push(value);
                    isNullVal(value.product_id) || value.cartItem || cartProductId.push(value.product_id);
                });
                var size = 2;
                var gridDataArr = [];
                var myDataArrCounter = 0;
                for (var i = 0; i < loopData.length; i += size) {
                    var smallPaginationArray = loopData.slice(i, i + size);
                    gridDataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallPaginationArray));
                    myDataArrCounter++;
                }
                var subGridData = "{" + gridDataArr + "}";
                var finalGridData = JSON.parse(subGridData);
                loopData = finalGridData;
            }
            _.each(loopData, function(value, k) {
                if ("gridTemplate" != templateName) {
                    backupData.push(value);
                    isNullVal(value.product_id) || value.cartItem || cartProductId.push(value.product_id);
                }
                if (value) {
                    if (true == value.wishlistItem) {
                        isSelected_0 = Alloy.Globals.icon.setShortlist;
                        wishIconColor_0 = "#e65e48";
                    } else {
                        isSelected_0 = Alloy.Globals.icon.shortlist;
                        wishIconColor_0 = "#a6a6a6";
                    }
                    isNullVal(value.in_stock) ? 1 == value.in_stock ? outOfStock1 = false : 0 == value.in_stock && (outOfStock1 = true) : outOfStock1 = void 0;
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
                    } else {
                        wishIconColor_1 = "transparent";
                        isSelected_1 = "";
                    }
                    isNullVal(value[0].in_stock) ? 1 == value[0].in_stock ? outOfStock1 = false : 0 == value[0].in_stock && (outOfStock1 = true) : outOfStock1 = void 0;
                }
                value[1] ? isNullVal(value[1].in_stock) ? 1 == value[1].in_stock ? outOfStock2 = false : 0 == value[1].in_stock && (outOfStock2 = true) : outOfStock2 = void 0 : outOfStock2 = false;
                if (!isNullVal(args.type)) switch (args.type) {
                  case "shopByLook":
                    if (value) {
                        gridProductname1 = value.looks_name;
                        collectionId1 = value.looks_id;
                        collectionImage1 = encodeURI(value.profile_image);
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
                        collectionImage1 = encodeURI(value[0].profile_image);
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
                            collectionImage2 = encodeURI(value[1].profile_image);
                            gridWhereToBuy2 = "Where to buy";
                            gridShare2 = Alloy.Globals.icon.share;
                            gridWish2 = isSelected_1;
                            gridCart2 = "";
                            productSize2 = "";
                            imageContainer = "#eeece7";
                            productFontSize2 = "0";
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
                    break;

                  case "collection":
                    if (value) {
                        gridProductname1 = value.collection_name;
                        collectionId1 = value.collection_id;
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
                            shareUrl2 = value[1].collection_url ? value[1].collection_url : value[1].product_url ? value[1].product_url : value[1].url ? value[1].url : "";
                            logoText = "";
                            productSize2 = "";
                            productFontSize2 = "0";
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
                            shareUrl2 = "";
                            productSize2 = "";
                            productFontSize2 = "0";
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
                    break;

                  case "C_Product":
                    if (value) {
                        gridProductname1 = value.product_name;
                        collectionId1 = value.product_id;
                        collectionImage1 = encodeURI(value.image);
                        gridWhereToBuy1 = Alloy.Globals.icon.currency + value.product_price;
                        gridCart1 = Alloy.Globals.icon.bag;
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
                        gridCart1 = Alloy.Globals.icon.bag;
                        gridShare1 = Alloy.Globals.icon.share;
                        gridWish1 = isSelected_0;
                        shareUrl1 = value[0].collection_url ? value[0].collection_url : value[0].product_url ? value[0].product_url : value[0].url ? value[0].url : "";
                        if (value[1]) {
                            product_sku2 = value[1].product_sku;
                            gridProductname2 = value[1].product_name;
                            collectionId2 = value[1].product_id;
                            collectionImage2 = encodeURI(value[1].image);
                            gridWhereToBuy2 = Alloy.Globals.icon.currency + value[1].product_price;
                            gridCart2 = Alloy.Globals.icon.bag;
                            gridShare2 = Alloy.Globals.icon.share;
                            gridWish2 = isSelected_1;
                            shareUrl2 = value[1].collection_url ? value[1].collection_url : value[1].product_url ? value[1].product_url : value[1].url ? value[1].url : "";
                            imageContainer = "#eeece7";
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
                            productSize2 = "";
                            imageContainer = "#ffffff";
                            logoText = "";
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
                        shareUrl1 = "";
                        productSize1 = "";
                        gridShare1 = "";
                        gridWish1 = "";
                        productFontSize1 = "0";
                    }
                    if ("shop" == args.categoryType) {
                        gridCart1 = Alloy.Globals.icon.bag;
                        gridCart2 = Alloy.Globals.icon.bag;
                        if (value) {
                            if (true == value.cartItem) {
                                cartIconColor_0 = "#e65e48";
                                cartIdArray = Titanium.App.Properties.getList("cartProductIdArray");
                                -1 == cartIdArray.indexOf(collectionId1) && cartIdArray.push(collectionId1);
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
                            -1 == cartDataArray.indexOf(collectionId1) && cartDataArray.push(collectionId1);
                            Titanium.App.Properties.setList("cartAllid", cartDataArray);
                        }
                        if (value[0]) {
                            cartDataArray = Titanium.App.Properties.getList("cartAllid");
                            -1 == cartDataArray.indexOf(collectionId1) && cartDataArray.push(collectionId1);
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
                                -1 == cartIdArray.indexOf(collectionId1) && cartIdArray.push(collectionId1);
                                Titanium.App.Properties.setList("cartProductIdArray", cartIdArray);
                            } else cartIconColor_0 = "gridTemplate" == activeTemplate ? "#66000000" : "#a6a6a6";
                            if (value[1]) {
                                cartDataArray = Titanium.App.Properties.getList("cartAllid");
                                -1 == cartDataArray.indexOf(collectionId2) && cartDataArray.push(collectionId2);
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
                                    -1 == cartIdArray.indexOf(collectionId2) && cartIdArray.push(collectionId2);
                                    Titanium.App.Properties.setList("cartProductIdArray", cartIdArray);
                                } else cartIconColor_1 = "gridTemplate" == activeTemplate ? "#66000000" : "#a6a6a6";
                            } else {
                                gridCart2 = "";
                                productSize2 = "";
                                productFontSize2 = 0;
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
                }
                listData.push({
                    properties: {
                        collectionId1: collectionId1
                    },
                    template: templateName,
                    gridProductname1: {
                        text: isNullVal(gridProductname1) ? gridProductname1 : gridProductname1.toUpperCase(),
                        collectionId: collectionId1,
                        category: args.categoryName || ""
                    },
                    gridProductname2: {
                        text: isNullVal(gridProductname2) ? gridProductname2 : gridProductname2.toUpperCase(),
                        collectionId: collectionId2,
                        category: args.categoryName || ""
                    },
                    gridCart1: {
                        text: gridCart1,
                        product_name_ga: isNullVal(gridProductname1) ? gridProductname1 : gridProductname1.toUpperCase(),
                        product_sku: product_sku1,
                        collectionId: collectionId1,
                        category: args.categoryName || "",
                        color: "gridTemplate" == templateName ? "#fff" : cartIconColor_0,
                        backgroundColor: "gridTemplate" == templateName ? cartIconColor_0 : "transparent",
                        visible: "" == gridCart1 ? false : !outOfStock1
                    },
                    gridCart2: {
                        text: gridCart2,
                        product_name_ga: isNullVal(gridProductname2) ? gridProductname2 : gridProductname2.toUpperCase(),
                        product_sku: product_sku2,
                        collectionId: collectionId2,
                        category: args.categoryName || "",
                        color: "gridTemplate" == templateName ? "#fff" : cartIconColor_1,
                        backgroundColor: "gridTemplate" == templateName ? cartIconColor_1 : "transparent",
                        visible: "" == gridCart2 ? false : !outOfStock2
                    },
                    gridShare1: {
                        collectionId: collectionId1,
                        text: gridShare1,
                        shareUrl: shareUrl1,
                        category: args.categoryName || ""
                    },
                    gridShare2: {
                        collectionId: collectionId2,
                        text: gridShare2,
                        shareUrl: shareUrl2,
                        category: args.categoryName || ""
                    },
                    gridWish1: {
                        collectionId: collectionId1,
                        iconValue: "",
                        text: gridWish1,
                        color: wishIconColor_0,
                        collectionName: gridProductname1,
                        category: args.categoryName || "",
                        product_sku: product_sku1,
                        lost_sale: !!outOfStock1
                    },
                    gridWish2: {
                        collectionId: collectionId2,
                        iconValue: "",
                        text: gridWish2,
                        color: wishIconColor_1,
                        collectionName: gridProductname2,
                        category: args.categoryName || "",
                        product_sku: product_sku2,
                        lost_sale: !!outOfStock2
                    },
                    gridProductImage1: {
                        image: collectionImage1,
                        collectionId: collectionId1,
                        category: args.categoryName || ""
                    },
                    gridProductImage2: {
                        image: collectionImage2,
                        collectionId: collectionId2,
                        category: args.categoryName || ""
                    },
                    gridWhereToBuy1: {
                        text: gridWhereToBuy1,
                        product_name_ga: isNullVal(gridProductname1) ? gridProductname1 : gridProductname1.toUpperCase(),
                        collectionId: collectionId1,
                        category: args.categoryName || ""
                    },
                    gridWhereToBuy2: {
                        text: gridWhereToBuy2,
                        product_name_ga: isNullVal(gridProductname2) ? gridProductname2 : gridProductname2.toUpperCase(),
                        collectionId: collectionId2,
                        category: args.categoryName || ""
                    },
                    listContainer: {
                        collectionId: collectionId1,
                        category: args.categoryName || ""
                    },
                    productSize1: {
                        collectionId: collectionId1,
                        text: isNullVal(productSize1) ? productSize1 : productSize1.toUpperCase(),
                        font: {
                            fontSize: productFontSize1
                        },
                        category: args.categoryName || ""
                    },
                    productSize2: {
                        collectionId: collectionId2,
                        text: isNullVal(productSize2) ? productSize2 : productSize2.toUpperCase(),
                        font: {
                            fontSize: productFontSize2
                        },
                        category: args.categoryName || ""
                    },
                    imageContainer: {
                        backgroundColor: imageContainer,
                        category: args.categoryName || ""
                    },
                    gridLogo: {
                        text: logoText,
                        category: args.categoryName || ""
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
        } catch (e) {
            Ti.API.info("catch looping" + e.message);
        }
    }
    function viewTypeLooping(viewTypeData, templateName) {
        listData = [];
        var addFlag = null;
        var removeFlag = null;
        $.mainSection.setItems(listData);
        if ("C_Product" == args.type) {
            addFlag = Titanium.App.Properties.getList("removeCartProductIdArray");
            removeFlag = Titanium.App.Properties.getList("cartProductIdArray");
            addFlag[0] == removeFlag[0] && 1 == addFlag.length && 1 == removeFlag.length && Titanium.App.Properties.setList("cartProductIdArray", []);
            _.each(Titanium.App.Properties.getList("cartAllid"), function(value, k) {
                var found = _.findWhere(viewTypeData, {
                    product_id: value
                });
                isNullVal(found) || (found.cartItem = false);
            });
            _.each(Titanium.App.Properties.getList("removeCartProductIdArray"), function(k, v) {
                var found = _.findWhere(viewTypeData, {
                    product_id: k
                });
                isNullVal(found) || (found.cartItem = false);
            });
            _.each(Titanium.App.Properties.getList("cartProductIdArray"), function(k, v) {
                var found = _.findWhere(viewTypeData, {
                    product_id: k
                });
                isNullVal(found) || (found.cartItem = true);
            });
            _.each(unSelectedCartItem, function(value, k) {
                var found = _.findWhere(viewTypeData, {
                    product_id: value
                });
                isNullVal(found) || (found.wishlistItem = false);
            });
            _.each(selectedCartItem, function(value, k) {
                var found = _.findWhere(viewTypeData, {
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
            for (var i = 0; i < viewTypeData.length; i += size) {
                var smallPaginationArray = viewTypeData.slice(i, i + size);
                gridDataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallPaginationArray));
                myDataArrCounter++;
            }
            var subGridData = "{" + gridDataArr + "}";
            var finalGridData = JSON.parse(subGridData);
            viewTypeData = finalGridData;
        }
        if (0 != displayCount) _.each(viewTypeData, function(value, k) {
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
                } else {
                    wishIconColor_1 = "transparent";
                    isSelected_1 = "";
                }
            }
            if (!isNullVal(args.type)) switch (args.type) {
              case "shopByLook":
                if (value) {
                    gridProductname1 = value.looks_name;
                    collectionId1 = value.looks_id;
                    collectionImage1 = encodeURI(value.profile_image);
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
                    collectionImage1 = encodeURI(value[0].profile_image);
                    gridWhereToBuy1 = "Where to buy";
                    gridShare1 = Alloy.Globals.icon.share;
                    gridWish1 = isSelected_0;
                    gridCart1 = "";
                    shareUrl1 = value[0].collection_url ? value[0].collection_url : value[0].product_url ? value[0].product_url : value[0].url ? value[0].url : "";
                    productSize1 = "";
                    productFontSize1 = "0";
                    if (value[1]) {
                        gridProductname2 = value[1].looks_name;
                        collectionId2 = value[1].looks_id;
                        collectionImage2 = encodeURI(value[1].profile_image);
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
                        shareUrl2 = "";
                        productFontSize2 = "0";
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
                break;

              case "collection":
                if (value) {
                    gridProductname1 = value.collection_name;
                    collectionId1 = value.collection_id;
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
                    gridProductname1 = value[0].collection_name;
                    collectionId1 = value[0].collection_id;
                    collectionImage1 = encodeURI(value[0].image);
                    gridWhereToBuy1 = "Where to buy";
                    gridShare1 = Alloy.Globals.icon.share;
                    gridWish1 = isSelected_0;
                    gridCart1 = "";
                    productSize1 = "";
                    shareUrl1 = value[0].collection_url ? value[0].collection_url : value[0].product_url ? value[0].product_url : value[0].url ? value[0].url : "";
                    productFontSize1 = "0";
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
                        shareUrl2 = value[1].collection_url ? value[1].collection_url : value[1].product_url ? value[1].product_url : value[1].url ? value[1].url : "";
                        productSize2 = "";
                        productFontSize2 = "0";
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
                        shareUrl2 = "";
                        productFontSize2 = "0";
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
                break;

              case "C_Product":
                if ("shop" == args.categoryType) {
                    gridCart1 = Alloy.Globals.icon.bag;
                    gridCart2 = Alloy.Globals.icon.bag;
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
                    if (value) {
                        if ("NA" == value.product_size) {
                            productSize1 = "";
                            productFontSize1 = "0";
                        } else {
                            productSize1 = value.product_size;
                            productFontSize1 = "9";
                        }
                        cartIconColor_0 = true == value.cartItem ? "#e65e48" : "gridTemplate" == activeTemplate ? "#66000000" : "#a6a6a6";
                    }
                    if (value[0]) {
                        if ("NA" == value[0].product_size) {
                            productSize1 = "";
                            productFontSize1 = "0";
                        } else {
                            productSize1 = value[0].product_size;
                            productFontSize1 = "9";
                        }
                        true == value[0].cartItem ? cartIconColor_0 = "#e65e48" : "gridTemplate" == activeTemplate && (cartIconColor_0 = "#66000000");
                        if (value[1]) {
                            if ("NA" == value[1].product_size) {
                                productSize2 = "";
                                productFontSize2 = "0";
                            } else {
                                productSize2 = value[1].product_size;
                                productFontSize2 = "9";
                            }
                            true == value[1].cartItem ? cartIconColor_1 = "#e65e48" : "gridTemplate" == activeTemplate && (cartIconColor_1 = "#66000000");
                        }
                    }
                }
                if (value) {
                    gridProductname1 = value.product_name;
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
                        productSize1 = "";
                        shareUrl2 = "";
                        productFontSize1 = "0";
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
                    productSize2 = "";
                    productFontSize2 = "0";
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
                    product_name_ga: isNullVal(gridProductname1) ? gridProductname1 : gridProductname1.toUpperCase(),
                    collectionId: collectionId1
                },
                gridWhereToBuy2: {
                    text: gridWhereToBuy2,
                    product_name_ga: isNullVal(gridProductname2) ? gridProductname2 : gridProductname2.toUpperCase(),
                    collectionId: collectionId2
                },
                listContainer: {
                    collectionId: collectionId1
                },
                productSize1: {
                    collectionId: collectionId1,
                    text: isNullVal(productSize1) ? productSize1 : productSize1.toUpperCase(),
                    font: {
                        fontSize: productFontSize1
                    }
                },
                productSize2: {
                    collectionId: collectionId2,
                    text: isNullVal(productSize2) ? productSize2 : productSize2.toUpperCase(),
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
            $.filterContainer.visible = false;
            $.styleFilterView.visible = false;
            if (!isNullVal(args.type)) switch (args.type) {
              case "shopByLook":
                message = "THERE ARE NO COLLECTIONS IN THIS CATEGORY.";
                break;

              case "collection":
                message = "THERE ARE NO COLLECTIONS IN THIS CATEGORY.";
                break;

              case "C_Product":
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
        var data = {};
        var url = "";
        _.each(filters, function(value, key) {
            value.length > 0 && (filtersData[key] = value.join(","));
        });
        if (!isNullVal(args.type)) switch (args.type) {
          case "shopByLook":
            url = Alloy.Globals.commonUrl.allLooks;
            data = {
                sortby: sortBy || "",
                style: selectedStyle || "ALL STYLES"
            };
            data.pagination = {
                page_no: page_no,
                page_size: limit
            };
            _.size(filtersData) > 0 ? data["filter_applied"] = filtersData : data["filter_applied"] = "";
            var requestParams = JSON.stringify(data);
            Alloy.Globals.webServiceCall(url, requestParams, subCollectionSuccessCallback, subCollectionErrorCallback, "POST", $.productListing, true);
            break;

          case "collection":
            if (!isNullVal(args.block)) switch (args.block) {
              case "Allcollection":
                url = Alloy.Globals.commonUrl.ourrange;
                data = {
                    category: args.categoryName,
                    categoryId: args.categoryId,
                    sortby: sortBy || "",
                    pagination: {}
                };
                data.pagination = {
                    page_no: page_no,
                    page_size: limit
                };
                _.size(filtersData) > 0 ? data["filters"] = filtersData : data["filters"] = "";
                break;

              case "collection":
                url = Alloy.Globals.commonUrl.getSubCollection;
                data = {
                    collection_enduse: args.categoryName,
                    sortby: sortBy || "",
                    pagination: {}
                };
                data.pagination[args.categoryName] = {
                    page_no: page_no,
                    page_size: limit
                };
                _.size(filtersData) > 0 ? data["filters"] = filtersData : data["filters"] = "";
            }
            var requestParams = JSON.stringify(data);
            Alloy.Globals.webServiceCall(url, requestParams, subCollectionSuccessCallback, subCollectionErrorCallback, "POST", $.productListing, true);
            break;

          case "C_Product":
            url = Alloy.Globals.commonUrl.ourrange;
            data = {
                category: args.wName,
                categoryId: args.categoryId,
                sortby: sortBy || "",
                pagination: {}
            };
            data.pagination = {
                page_no: page_no,
                page_size: limit
            };
            _.size(filtersData) > 0 ? data["filters"] = filtersData : data["filters"] = "";
            var requestParams = JSON.stringify(data);
            Alloy.Globals.webServiceCall(url, requestParams, subCollectionSuccessCallback, subCollectionErrorCallback, "POST", $.productListing);
        }
    }
    function goToBack() {
        if ("shortlist" == addShortlist.type) {
            hideShowView(addShortlist);
            addShortlist = "";
        } else if ("fill" == $.styleFilterView.getHeight()) {
            $.styleDropDown.borderColor = "transparent";
            $.styleDropDown.borderWidth = "0";
            $.styleDropDown.height = "35dp";
            $.styleFilterView.height = "35dp";
            stateFlag = true;
        } else if ($.sortView.getVisible()) hideShowView($.sortView); else if ($.filterView.getVisible()) hideShowView($.filterView); else {
            $.filterApplyLbl.removeEventListener("click", getSubCollection);
            $.listTypeContainer.removeEventListener("click", toggleListType);
            $.productListing.removeEventListener("click", hideOverFlowMenu);
            Alloy.Globals.popWindowInNav();
            $.productListing.close();
        }
    }
    function destroyWindow(e) {
        $.removeListener();
        $.productListing.remove($.listScrollView);
        $.productListing.remove($.listTypeContainer);
        $.productListing.remove($.sortView);
        $.productListing.remove($.filterView);
        $.listScrollView.removeAllChildren();
        $.listTypeContainer.removeAllChildren();
        $.sortView.removeAllChildren();
        $.filterView.removeAllChildren();
        args = {};
        sortBy = null;
        gridData = null;
        firstCount = null;
        secondCount = null;
        message = null;
        stateFlag = null;
        page_no = null;
        limit = null;
        totalItem = null;
        shortlistData = null;
        listData = [];
        backupData = [];
        selectedCartItem = [];
        unSelectedCartItem = [];
        selectedStyle = null;
        filters = {};
        displayCount = null;
        sortTotalCount = null;
        sortLbl = [];
        sortSeperator = [];
        sortContainer = [];
        filterLbl = [];
        subFilterLbl = [];
        filterMainContainer = [];
        checkFilterLbl = [];
        subFilterContainer = [];
        filtersData = {};
        styleOption = [];
        lastOpenView = null;
        activeTemplate = null;
        itemIndex_ = null;
        toggleStatus = null;
        filterSend = {};
        filterSendJson = [];
        addtocartItem = [];
        addShortlist = null;
        cartData = null;
        collectionName1 = null;
        collectionName2 = null;
        collectionImage1 = null;
        collectionImage2 = null;
        collectionId1 = null;
        gridWhereToBuy1 = null;
        gridWhereToBuy2 = null;
        gridProductname1 = null;
        gridProductname2 = null;
        productSize1 = null;
        productSize2 = null;
        productFontSize1 = null;
        productFontSize2 = null;
        gridShare1 = null;
        gridShare2 = null;
        gridWish1 = null;
        gridWish2 = null;
        gridCart1 = null;
        gridCart2 = null;
        collectionId2 = null;
        imageContainer = null;
        logoText = null;
        isSelected_0 = null;
        isSelected_1 = null;
        wishIconColor_0 = null;
        wishIconColor_1 = null;
        cartIconColor_0 = null;
        cartIconColor_1 = null;
        shareUrl1 = null;
        shareUrl2 = null;
        filterRawData = null;
        Titanium.App.Properties.setList("removeCartProductIdArray", []);
        Titanium.App.Properties.setList("cartProductIdArray", []);
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
    this.__controllerPath = "productListing";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.productListing = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        backgroundColor: "#ffffff",
        id: "productListing"
    });
    $.__views.productListing && $.addTopLevelView($.__views.productListing);
    goToBack ? $.addListener($.__views.productListing, "android:back", goToBack) : __defers["$.__views.productListing!android:back!goToBack"] = true;
    updateCount ? $.addListener($.__views.productListing, "focus", updateCount) : __defers["$.__views.productListing!focus!updateCount"] = true;
    destroyWindow ? $.addListener($.__views.productListing, "close", destroyWindow) : __defers["$.__views.productListing!close!destroyWindow"] = true;
    $.__views.header = Alloy.createWidget("headerView", "widget", {
        id: "header",
        __parentSymbol: $.__views.productListing
    });
    $.__views.header.setParent($.__views.productListing);
    $.__views.listScrollView = Ti.UI.createView({
        top: "53dp",
        id: "listScrollView"
    });
    $.__views.productListing.add($.__views.listScrollView);
    $.__views.filterContainer = Ti.UI.createView({
        top: "0dp",
        backgroundColor: "#231f20",
        width: Titanium.UI.FILL,
        height: "35dp",
        id: "filterContainer"
    });
    $.__views.listScrollView.add($.__views.filterContainer);
    $.__views.sortByLbl = Ti.UI.createLabel({
        font: {
            fontSize: "11dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#e65e48",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        height: Titanium.UI.FILL,
        width: "48%",
        left: "0dp",
        text: "SORT BY",
        id: "sortByLbl"
    });
    $.__views.filterContainer.add($.__views.sortByLbl);
    $.__views.__alloyId1260 = Ti.UI.createLabel({
        font: {
            fontSize: "12sp"
        },
        color: "#a6ffffff",
        text: "|",
        id: "__alloyId1260"
    });
    $.__views.filterContainer.add($.__views.__alloyId1260);
    $.__views.filterByLbl = Ti.UI.createLabel({
        font: {
            fontSize: "11dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#e65e48",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        height: Titanium.UI.FILL,
        width: "48%",
        right: "0dp",
        text: "FILTER BY",
        id: "filterByLbl"
    });
    $.__views.filterContainer.add($.__views.filterByLbl);
    $.__views.styleFilterView = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: "0dp",
        zIndex: "5",
        top: "35dp",
        type: "outerView",
        id: "styleFilterView"
    });
    $.__views.listScrollView.add($.__views.styleFilterView);
    $.__views.styleDropDown = Ti.UI.createView({
        layout: "vertical",
        width: "150dp",
        right: "5dp",
        height: "35dp",
        top: "5dp",
        backgroundColor: "#ffffff",
        id: "styleDropDown"
    });
    $.__views.styleFilterView.add($.__views.styleDropDown);
    $.__views.__alloyId1261 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "0dp",
        layout: "horizontal",
        touchEnabled: false,
        id: "__alloyId1261"
    });
    $.__views.styleDropDown.add($.__views.__alloyId1261);
    $.__views.styleNameLbl = Ti.UI.createLabel({
        left: "10dp",
        top: "0dp",
        width: "105",
        height: "35dp",
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        color: "#333333",
        touchEnabled: false,
        id: "styleNameLbl"
    });
    $.__views.__alloyId1261.add($.__views.styleNameLbl);
    $.__views.styleDropDownIcon = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "12sp"
        },
        rigth: "0dp",
        width: "35dp",
        height: "35dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: "#333333",
        touchEnabled: false,
        text: Alloy.Globals.icon.expandFill,
        id: "styleDropDownIcon"
    });
    $.__views.__alloyId1261.add($.__views.styleDropDownIcon);
    $.__views.styleScroll = Ti.UI.createScrollView({
        layout: "vertical",
        backgroundColor: "#ffffff",
        height: "0",
        id: "styleScroll"
    });
    $.__views.styleDropDown.add($.__views.styleScroll);
    $.__views.footerView = Ti.UI.createView({
        id: "footerView",
        height: "85dp"
    });
    $.__views.activityInd = Ti.UI.createActivityIndicator({
        id: "activityInd",
        top: 10
    });
    $.__views.footerView.add($.__views.activityInd);
    var __alloyId1270 = {};
    Alloy.createController("listTemplate", {
        __parentSymbol: __parentSymbol,
        __itemTemplate: __alloyId1270
    });
    $.__views.mainSection = Ti.UI.createListSection({
        id: "mainSection"
    });
    var __alloyId1273 = [];
    __alloyId1273.push($.__views.mainSection);
    $.__views.listView = Ti.UI.createListView({
        top: "35dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        sections: __alloyId1273,
        templates: __alloyId1270,
        footerView: $.__views.footerView,
        id: "listView",
        defaultItemTemplate: "listTypeTemplate"
    });
    $.__views.listScrollView.add($.__views.listView);
    $.__views.listTypeContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: "127dp",
        bottom: "-65dp",
        layout: "vertical",
        id: "listTypeContainer"
    });
    $.__views.productListing.add($.__views.listTypeContainer);
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
    $.__views.optionContainer = Ti.UI.createView({
        id: "optionContainer",
        backgroundColor: "#ccffffff",
        top: "10dp",
        layout: "vertical"
    });
    $.__views.listTypeContainer.add($.__views.optionContainer);
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
    $.__views.optionContainer.add($.__views.listTypeLbl);
    $.__views.listTypeSubContainer = Ti.UI.createView({
        width: "60%",
        height: "65dp",
        id: "listTypeSubContainer"
    });
    $.__views.optionContainer.add($.__views.listTypeSubContainer);
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
    $.__views.sortView = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        visible: false,
        layout: "vertical",
        backgroundColor: "#231f20",
        id: "sortView"
    });
    $.__views.productListing.add($.__views.sortView);
    $.__views.__alloyId1274 = Ti.UI.createView({
        top: "0dp",
        width: Titanium.UI.FILL,
        height: "53dp",
        id: "__alloyId1274"
    });
    $.__views.sortView.add($.__views.__alloyId1274);
    $.__views.__alloyId1275 = Ti.UI.createLabel({
        left: "15dp",
        height: Titanium.UI.FILL,
        font: {
            fontSize: "15dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        text: "SORT BY",
        id: "__alloyId1275"
    });
    $.__views.__alloyId1274.add($.__views.__alloyId1275);
    $.__views.sortCloseLbl = Ti.UI.createLabel({
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
        id: "sortCloseLbl"
    });
    $.__views.__alloyId1274.add($.__views.sortCloseLbl);
    $.__views.sortDetails = Ti.UI.createView({
        top: "15dp",
        width: Titanium.UI.FILL,
        right: "15dp",
        left: "15dp",
        height: Titanium.UI.FILL,
        layout: "vertical",
        bottom: "75dp",
        id: "sortDetails"
    });
    $.__views.sortView.add($.__views.sortDetails);
    $.__views.filterView = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        visible: false,
        backgroundColor: "#231f20",
        id: "filterView"
    });
    $.__views.productListing.add($.__views.filterView);
    $.__views.__alloyId1276 = Ti.UI.createView({
        top: "0dp",
        width: Titanium.UI.FILL,
        height: "53dp",
        id: "__alloyId1276"
    });
    $.__views.filterView.add($.__views.__alloyId1276);
    $.__views.__alloyId1277 = Ti.UI.createLabel({
        left: "15dp",
        height: Titanium.UI.FILL,
        font: {
            fontSize: "15dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        text: "FILTER BY",
        id: "__alloyId1277"
    });
    $.__views.__alloyId1276.add($.__views.__alloyId1277);
    $.__views.refreshIcon = Ti.UI.createLabel({
        right: "60dp",
        width: "40dp",
        height: "40dp",
        font: {
            fontSize: "20dp",
            fontFamily: "icomoon"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: Alloy.Globals.icon.refresh,
        id: "refreshIcon"
    });
    $.__views.__alloyId1276.add($.__views.refreshIcon);
    $.__views.filterCloseLbl = Ti.UI.createLabel({
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
        id: "filterCloseLbl"
    });
    $.__views.__alloyId1276.add($.__views.filterCloseLbl);
    $.__views.filterByContainer = Ti.UI.createScrollView({
        top: "68dp",
        width: Titanium.UI.FILL,
        right: "15dp",
        left: "15dp",
        height: Titanium.UI.FILL,
        layout: "vertical",
        bottom: "75dp",
        id: "filterByContainer"
    });
    $.__views.filterView.add($.__views.filterByContainer);
    $.__views.filterApplyLbl = Ti.UI.createLabel({
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        bottom: "30dp",
        width: "80%",
        height: "40dp",
        color: "#ffffff",
        borderColor: "#80e7e7e7",
        borderWidth: "0.5",
        backgroundColor: "transparent",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "APPLY",
        id: "filterApplyLbl"
    });
    $.__views.filterView.add($.__views.filterApplyLbl);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var sortBy = "";
    var gridData, firstCount, secondCount, message;
    var gaAddToCartData = {};
    var stateFlag = true;
    var page_no = 1;
    var limit = 10;
    var totalItem;
    var shortlistData;
    var listData = [];
    var backupData = [];
    var cartProductId = [];
    var selectedCartItem = [];
    var unSelectedCartItem = [];
    var selectedStyle = "";
    var filters = {};
    var displayCount, sortTotalCount;
    var sortLbl = [];
    var sortSeperator = [];
    var sortContainer = [];
    var filterLbl = [];
    var subFilterLbl = [];
    var filterMainContainer = [];
    var checkFilterLbl = [];
    var subFilterContainer = [];
    var filtersData = {};
    var styleOption = [];
    var lastOpenView;
    var activeTemplate = "gridTemplate";
    var product_sku1 = "", product_sku2 = "";
    var itemIndex_ = 0;
    var toggleStatus = true;
    var filterSend = {};
    var filterSendJson = [];
    var addtocartItem = [];
    var addShortlist = "";
    var cartData = "";
    $.styleNameLbl.text = "ALL STYLES";
    $.styleNameLbl.color = "#e65e48";
    var collectionName1, collectionName2, collectionImage1, collectionImage2, collectionId1, gridWhereToBuy1, gridWhereToBuy2, gridProductname1, gridProductname2, productSize1, productSize2, productFontSize1, productFontSize2, gridShare1, gridShare2, gridWish1, gridWish2, gridCart1, gridCart2, collectionId2, imageContainer, logoText, isSelected_0, isSelected_1, wishIconColor_0 = "transparent", wishIconColor_1 = "transparent", cartIconColor_0 = "transparent", cartIconColor_1 = "transparent";
    var shareUrl1, shareUrl2, outOfStock1, outOfStock2;
    Titanium.App.Properties.setList("cartAllid", []);
    var filterRawData;
    $.gridIcon.color = "#e65e48";
    $.gridLbl.color = "#e65e48";
    touchEffect.createTouchEffect($.sortByLbl, "#a6e65e48", "#e65e48");
    touchEffect.createTouchEffect($.filterByLbl, "#a6e65e48", "#e65e48");
    touchEffect.createTouchEffect($.sortCloseLbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.refreshIcon, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.filterCloseLbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.filterApplyLbl, "#a6ffffff", "#ffffff");
    var wTitle = "";
    var subTitle = "";
    var gaTitle = "";
    var gaShortlistProduct = {};
    var gaScreenName = "";
    if (!isNullVal(args.type)) switch (args.type) {
      case "shopByLook":
        wTitle = "SHOP BY LOOK";
        gaTitle = wTitle;
        $.styleFilterView.height = "35dp";
        $.listView.top = "70dp";
        isNullVal(args.style) || (selectedStyle = args.style);
        isNullVal(args.windowNav) || $.styleDropDown.setTouchEnabled(false);
        break;

      case "collection":
        if (!isNullVal(args.WindowName)) {
            wTitle = "ALL " + args.WindowName.toUpperCase();
            gaTitle = args.WindowName.toUpperCase();
        }
        break;

      case "C_Product":
        if (isNullVal(args.categoryType)) {
            wTitle = "ALL " + args.wName.toUpperCase();
            gaTitle = args.wName.toUpperCase();
        } else switch (args.categoryType) {
          case "shop":
            wTitle = args.subTitle.toUpperCase();
            subTitle = args.wName.toUpperCase() || "";
            gaTitle = args.subTitle.toUpperCase();
            break;

          case "blinds":
            wTitle = args.wName.toUpperCase() + " BLINDS";
            gaTitle = args.wName.toUpperCase();
            break;

          default:
            wTitle = "ALL " + args.wName.toUpperCase();
            gaTitle = args.wName.toUpperCase();
        }
    }
    $.header.init({
        title: wTitle,
        subTitle: subTitle || "",
        passWindow: $.productListing
    });
    gaScreenName = wTitle || "Listing";
    googleAnalyticsScreen(wTitle);
    setAttributeStr("GRID");
    $.listTypeContainer.addEventListener("click", toggleListType);
    $.sortByLbl.addEventListener("click", function(e) {
        hideShowView($.sortView);
    });
    $.sortCloseLbl.addEventListener("click", function(e) {
        hideShowView($.sortView);
    });
    $.filterByLbl.addEventListener("click", function(e) {
        hideShowView($.filterView);
    });
    $.filterCloseLbl.addEventListener("click", function(e) {
        hideShowView($.filterView);
    });
    var style = $.createStyle({
        font: {
            fontWeight: "bold",
            fontSize: "13dp"
        }
    });
    var style1 = $.createStyle({
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "13dp"
        }
    });
    $.listTypeSubContainer.addEventListener("click", function(e) {
        if (!isNullVal(e.source.id)) switch (e.source.id) {
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
                var _bind = e.bindId;
                var _index = e.itemIndex;
                var _a = e.section.items[_index];
                if (!isNullVal(_a[_bind].collectionId)) if ("gridWish1" == e.bindId || "gridWish2" == e.bindId) if (isNullVal(Ti.App.Properties.getString("access_token"))) Alloy.Globals.addWindowInNav("signIn", {
                    listObject: e,
                    listViewReference: updateItemListClick
                }); else switch (args.type) {
                  case "shopByLook":
                    var collectionData = {
                        collectionName: _a[_bind].collectionName,
                        collectionId: _a[_bind].collectionId,
                        type: "shopByLook"
                    };
                    addShortlist = Alloy.createController("addToShortlist", collectionData).getView();
                    $.productListing.add(addShortlist);
                    hideShowView(addShortlist);
                    break;

                  case "collection":
                    var collectionData = {
                        collectionName: _a[_bind].collectionName,
                        collectionId: _a[_bind].collectionId,
                        type: "collection"
                    };
                    addShortlist = Alloy.createController("addToShortlist", collectionData).getView();
                    $.productListing.add(addShortlist);
                    hideShowView(addShortlist);
                    break;

                  case "C_Product":
                    addToShortlist(e);
                } else if ("gridCart1" == e.bindId || "gridCart2" == e.bindId) {
                    if ("shop" === args.categoryType) if (isNullVal(Ti.App.Properties.getString("access_token"))) Alloy.Globals.addWindowInNav("signIn", {
                        listObject: e,
                        listViewReference: updateItemListClick
                    }); else if (_a[e.bindId].visible) {
                        var shortlist_flag = null;
                        shortlist_flag = "gridCart1" == e.bindId ? !("" != _a["gridWish1"].text) : !("" != _a["gridWish2"].text);
                        gaAddToCartData = {};
                        gaAddToCartData = {
                            name: _a[_bind].product_name_ga,
                            sku: _a[_bind].product_sku,
                            shortlistFlag: shortlist_flag
                        };
                        cartData = "";
                        cartData = e;
                        var url = Alloy.Globals.commonUrl.addToCart;
                        var data = {
                            product_id: _a[_bind].collectionId,
                            qty: 1
                        };
                        var requestParams = JSON.stringify(data);
                        Alloy.Globals.webServiceCall(url, requestParams, addToCartSuccessCallback, addToCartErrorCallback, "POST", $.productListing);
                    }
                } else if ("gridWhereToBuy1" != e.bindId && "gridWhereToBuy2" != e.bindId || "Where to buy" != _a[_bind].text) {
                    if ("gridShare1" == e.bindId || "gridShare2" == e.bindId) shareImage(_a[_bind].shareUrl); else if (!isNullVal(_a[_bind].collectionId)) {
                        var CollectionData = "";
                        if (!isNullVal(args.type)) switch (args.type) {
                          case "shopByLook":
                            CollectionData = {
                                type: "shopByLook",
                                category: gaTitle,
                                id: _a[_bind].collectionId
                            };
                            Alloy.Globals.addWindowInNav("productDetails", CollectionData);
                            break;

                          case "collection":
                            CollectionData = {
                                type: "collection",
                                category: gaTitle,
                                id: _a[_bind].collectionId
                            };
                            Alloy.Globals.addWindowInNav("productDetails", CollectionData);
                            break;

                          case "C_Product":
                            if (!isNullVal(args.categoryType)) {
                                -1 != e.bindId.toString().lastIndexOf("1") ? e.bindId = "gridWish1" : -1 != e.bindId.toString().lastIndexOf("2") && (e.bindId = "gridWish2");
                                switch (args.categoryType) {
                                  case "shop":
                                    var pData = {
                                        Productid: _a[_bind].collectionId,
                                        block: "shop",
                                        product: "shopProduct",
                                        listObject: e,
                                        listViewReference: addToCartCallback,
                                        category: "BED LINEN",
                                        type: "SHOP"
                                    };
                                    Alloy.Globals.addWindowInNav("estoreDetails", pData);
                                    break;

                                  case "wallpaper":
                                    var pData = {
                                        Productid: _a[_bind].collectionId,
                                        block: "shop",
                                        product: "wallpaper",
                                        type: "shop",
                                        category: "wallpaper",
                                        listObject: e,
                                        listViewReference: addToCartCallback
                                    };
                                    Alloy.Globals.addWindowInNav("estoreDetails", pData);
                                    break;

                                  case "blinds":
                                    var pData = {
                                        Productid: _a[_bind].collectionId,
                                        block: "blinds",
                                        navigatedblockid: "",
                                        type: "blinds",
                                        category: _a[_bind].category,
                                        listObject: e,
                                        listViewReference: addToCartCallback
                                    };
                                    Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
                                    break;

                                  case "Collectionfabrics":
                                    var pData = {
                                        Productid: _a[_bind].collectionId,
                                        block: "collection",
                                        navigatedblockid: "",
                                        type: "collection",
                                        category: _a[_bind].category,
                                        listObject: e,
                                        listViewReference: addToCartCallback
                                    };
                                    Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
                                }
                            }
                        }
                    }
                } else {
                    if (!isNullVal(_a[_bind].collectionId)) {
                        var gaLeadProductArray = {};
                        gaLeadProductArray = {
                            name: _a[_bind].product_name_ga || "NA",
                            sku: _a[_bind].collectionId
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
    $.productListing.addEventListener("click", hideOverFlowMenu);
    $.sortDetails.removeEventListener("click", sortBySelectedEffect);
    $.sortDetails.addEventListener("click", sortBySelectedEffect);
    $.filterByContainer.addEventListener("click", function(e) {
        if ("35dp" == e.source.height && "filterOption" == e.source.type) {
            _.each($.filterByContainer.children, function(value, k) {
                $.filterByContainer.children[k].children[0].applyProperties(style1);
                $.filterByContainer.children[k].height = "35dp";
            });
            e.source.height = Titanium.UI.SIZE;
            e.source.children[0].applyProperties(style);
        } else if ("filterOption" == e.source.type && "size" == e.source.height) {
            e.source.height = "35dp";
            "undefined" != typeof filters[e.source.children[0].code] && (0 != filters[e.source.children[0].code].length ? e.source.children[0].applyProperties(style) : e.source.children[0].applyProperties(style1));
        }
        if ("filterOption" == e.source.type) {
            lastOpenView = e.source.id;
            "undefined" == typeof filters[e.source.children[0].code] && (filters[e.source.children[0].code] = []);
        }
        if ("filterSubOption" == e.source.type && "" == e.source.children[0].text) {
            e.source.children[0].text = "";
            filters[e.source.code].push(e.source.value);
            e.source.parent.children[0].text = e.source.title.toUpperCase() + " (" + filters[e.source.code].length + ")".toUpperCase();
        } else if ("filterSubOption" == e.source.type && "" == e.source.children[0].text) {
            e.source.children[0].text = "";
            filters[e.source.code].splice(filters[e.source.code].indexOf(e.source.value), 1);
            if (0 == filters[e.source.code].length) {
                e.source.parent.height = "35dp";
                e.source.parent.children[0].applyProperties(style1);
                e.source.parent.children[0].text = e.source.title.toUpperCase();
            } else {
                e.source.parent.children[0].applyProperties(style);
                e.source.parent.children[0].text = e.source.title.toUpperCase() + " (" + filters[e.source.code].length + ")".toUpperCase();
            }
        }
    });
    $.listView.addEventListener("marker", function() {
        page_no <= Math.ceil(totalItem / limit) && getCollectionListOnLazy(page_no, limit);
    });
    $.listView.addEventListener("scrollstart", function(e) {
        firstCount = e.firstVisibleItemIndex;
    });
    $.listView.addEventListener("scrollend", function(e) {
        if (6 >= totalItem && "gridTemplate" == activeTemplate) {
            if (!isNullVal(args.type)) switch (args.type) {
              case "shopByLook":
                $.filterContainer.animate({
                    top: "0",
                    duration: 500
                });
                $.styleFilterView.animate({
                    top: "35",
                    duration: 500
                });
                $.listView.animate({
                    top: "70",
                    duration: 500
                });
                $.listTypeContainer.animate({
                    bottom: "-65",
                    duration: 500
                });
                break;

              case "collection":
                $.filterContainer.animate({
                    top: "0",
                    duration: 500
                });
                $.listView.animate({
                    top: "35",
                    duration: 500
                });
                $.listTypeContainer.animate({
                    bottom: "-65",
                    duration: 500
                });
                break;

              default:
                $.filterContainer.animate({
                    top: "0",
                    duration: 500
                });
                $.listView.animate({
                    top: "35",
                    duration: 500
                });
                $.listTypeContainer.animate({
                    bottom: "-65",
                    duration: 500
                });
            }
        } else {
            itemIndex_ = "gridTemplate" == activeTemplate ? 2 * e.firstVisibleItemIndex : e.firstVisibleItemIndex;
            secondCount = e.firstVisibleItemIndex;
            if (secondCount > firstCount) {
                if (!isNullVal(args.type)) switch (args.type) {
                  case "shopByLook":
                    $.filterContainer.animate({
                        top: "-35",
                        duration: 500
                    });
                    $.styleFilterView.animate({
                        top: "0",
                        duration: 500
                    });
                    $.listView.animate({
                        top: "35",
                        duration: 500
                    });
                    $.listTypeContainer.animate({
                        bottom: "-65",
                        duration: 500
                    });
                    break;

                  case "collection":
                    $.filterContainer.animate({
                        top: "-35",
                        duration: 500
                    });
                    $.listView.animate({
                        top: "0",
                        duration: 500
                    });
                    $.listTypeContainer.animate({
                        bottom: "-65",
                        duration: 500
                    });
                    break;

                  default:
                    $.filterContainer.animate({
                        top: "-35",
                        duration: 500
                    });
                    $.listView.animate({
                        top: "0",
                        duration: 500
                    });
                    $.listTypeContainer.animate({
                        bottom: "-65",
                        duration: 500
                    });
                }
            } else if (firstCount > secondCount && !isNullVal(args.type)) switch (args.type) {
              case "shopByLook":
                $.filterContainer.animate({
                    top: "0",
                    duration: 500
                });
                $.styleFilterView.animate({
                    top: "35",
                    duration: 500
                });
                $.listView.animate({
                    top: "70",
                    duration: 500
                });
                $.listTypeContainer.animate({
                    bottom: "-100",
                    duration: 500
                });
                break;

              case "collection":
                $.filterContainer.animate({
                    top: "0",
                    duration: 500
                });
                $.listView.animate({
                    top: "35",
                    duration: 500
                });
                $.listTypeContainer.animate({
                    bottom: "-100",
                    duration: 500
                });
                break;

              default:
                $.filterContainer.animate({
                    top: "0",
                    duration: 500
                });
                $.listView.animate({
                    top: "35",
                    duration: 500
                });
                $.listTypeContainer.animate({
                    bottom: "-100",
                    duration: 500
                });
            }
        }
    });
    $.filterApplyLbl.addEventListener("click", function(e) {
        hideShowView($.filterView);
        getSubCollection();
    });
    $.styleDropDown.addEventListener("click", function(e) {
        if (stateFlag) {
            $.styleDropDown.borderColor = "gray", $.styleDropDown.borderWidth = "0.6", $.styleDropDown.height = Titanium.UI.SIZE;
            $.styleDropDownIcon.text = Alloy.Globals.icon.expand;
            $.styleFilterView.height = Titanium.UI.FILL;
            $.styleScroll.height = Titanium.UI.SIZE;
            stateFlag = false;
        } else {
            if (e.source.text) {
                $.styleNameLbl.text = e.source.text;
                $.styleNameLbl.color = "#e65e48";
                selectedStyle = e.source.text;
                getSubCollection();
            }
            $.styleDropDownIcon.text = Alloy.Globals.icon.expandFill;
            $.styleDropDown.borderColor = "transparent";
            $.styleDropDown.borderWidth = "0";
            $.styleDropDown.height = "35dp";
            $.styleFilterView.height = "35dp";
            stateFlag = true;
        }
    });
    $.styleFilterView.addEventListener("click", function(e) {
        if ("outerView" == e.source.type) {
            $.styleDropDownIcon.text = Alloy.Globals.icon.expandFill;
            $.styleDropDown.borderColor = "transparent";
            $.styleDropDown.borderWidth = "0";
            $.styleDropDown.height = "35dp";
            $.styleFilterView.height = "35dp";
            stateFlag = true;
        }
    });
    $.refreshIcon.addEventListener("click", function(e) {
        $.filterByContainer.removeAllChildren();
        filters = {};
        setTimeout(function(e) {
            addFilterByRows(filterRawData);
        }, 300);
    });
    getSubCollection();
    Ti.API.info("Alloy.Globals.platformWidth = " + Alloy.Globals.platformWidth);
    Ti.Gesture.addEventListener("orientationchange", function(e) {});
    __defers["$.__views.productListing!android:back!goToBack"] && $.addListener($.__views.productListing, "android:back", goToBack);
    __defers["$.__views.productListing!focus!updateCount"] && $.addListener($.__views.productListing, "focus", updateCount);
    __defers["$.__views.productListing!close!destroyWindow"] && $.addListener($.__views.productListing, "close", destroyWindow);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;