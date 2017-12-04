function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function checkblurEfect(e) {
        Ti.API.info("blur window");
        focusFlag = false;
    }
    function updateCount() {
        if (parseInt(Ti.App.Properties.getString("cartCount")) > 0) {
            var cartCount = "";
            cartCount = Ti.App.Properties.getString("cartCount");
            $.cartCountLbl.visible = true;
            $.cartCountLbl.setText(cartCount.toString());
        } else {
            $.cartCountLbl.visible = false;
            $.cartCountLbl.setText("");
        }
        if (!focusFlag && _.size(backupData) > 0) {
            addtocartItem = [];
            addtocartItem = Titanium.App.Properties.getList("cartProductIdArray");
            viewTypeLooping(backupData, activeTemplate);
            focusFlag = false;
        }
    }
    function updateCartData() {
        if (parseInt(Ti.App.Properties.getString("cartCount")) > 0) {
            var cartCount = "";
            cartCount = Ti.App.Properties.getString("cartCount");
            $.cartCountLbl.visible = true;
            $.cartCountLbl.setText(cartCount.toString());
        } else {
            $.cartCountLbl.visible = false;
            $.cartCountLbl.setText("");
        }
    }
    function setSearchData() {
        var searchData = [ "Curtains", "Upholstery", "Bedsheet", "Wallpaper", "Blinds" ];
        _.each(searchData, function(val, key) {
            try {
                var _value = crypto.AES.encrypt(val, ckey, {
                    iv: iv
                });
                db.execute("INSERT INTO searchList (search) VALUES (?)", _value.toString());
            } catch (ex) {
                try {
                    var _value = crypto.AES.encrypt(val, ckey, {
                        iv: iv
                    });
                    db.execute("update searchList set created_at=CURRENT_TIMESTAMP where search=?", val);
                } catch (ex2) {
                    Ti.API.info("into search expection--->" + ex2.messaae);
                }
            }
        });
        Ti.App.Properties.setString("firstTime", true);
    }
    function hideHeaderSearchView(e) {
        Ti.API.info("return");
        if ("" != $.headerSearchTxt.getValue()) {
            $.SearchTxt.focus();
            setTimeout(function(e) {
                $.searchContainer.visible = false;
            }, 100);
            try {
                var _value = crypto.AES.encrypt($.headerSearchTxt.getValue(), ckey, {
                    iv: iv
                });
                db.execute("INSERT INTO searchList (search) VALUES (?)", _value.toString());
            } catch (ex) {
                try {
                    var _value = crypto.AES.encrypt($.headerSearchTxt.getValue(), ckey, {
                        iv: iv
                    });
                    db.execute("update searchList set created_at=CURRENT_TIMESTAMP where search=?", _value.toString());
                } catch (ex2) {
                    Ti.API.info("ex in hideheader" + ex2.message);
                }
            }
            searchText = $.headerSearchTxt.getValue();
            $.headerSearchTxt.blur();
            $.filterByContainer.removeAllChildren();
            $.sortDetails.removeAllChildren();
            sortBy = "";
            filters = {};
            getSearchData(searchText);
        } else showAlert($.searchListing, "Please enter a search keyword");
    }
    function hideSearchView(e) {
        if ("" != $.SearchTxt.getValue()) {
            $.SearchTxt.blur();
            try {
                var _value = crypto.AES.encrypt($.SearchTxt.getValue(), ckey, {
                    iv: iv
                });
                Ti.API.info("_value--->" + _value);
                db.execute("INSERT INTO searchList (search) VALUES (?)", _value.toString());
            } catch (ex) {
                Ti.API.info("catch in hide  = " + ex.message);
                try {
                    var _value = crypto.AES.encrypt($.SearchTxt.getValue(), ckey, {
                        iv: iv
                    });
                    db.execute("update searchList set created_at=CURRENT_TIMESTAMP where search=?", _value.toString());
                } catch (ex2) {
                    Ti.API.info("ex is " + ex2.message);
                }
            }
            $.headerSearchTxt.value = $.SearchTxt.getValue();
            $.searchView.visible = false;
            searchText = $.SearchTxt.getValue();
            $.filterByContainer.removeAllChildren();
            $.sortDetails.removeAllChildren();
            sortBy = "";
            filters = {};
            getSearchData(searchText);
        } else showAlert($.searchListing, "Please enter a search keyword");
    }
    function displaySearchView(e) {
        Ti.API.info("this click headerSearchTxt" + $.searchContainer.getVisible());
        $.searchRecentContainer.removeAllChildren();
        setTimeout(function(e) {
            $.searchContainer.setVisible(true);
            $.searchRecentlbl.setVisible(true);
        }, 100);
        var deleteQry = db.execute('DELETE  from searchList WHERE created_at < datetime("now","-1 day")');
        if (null == deleteQry) {
            var data = db.execute("SELECT * FROM searchList ORDER BY created_at DESC LIMIT 5");
            $.recentlbl.visible = true;
            while (data.isValidRow()) {
                var _data = data.fieldByName("search");
                var decrypted = crypto.AES.decrypt(_data, ckey, {
                    iv: iv
                });
                var searchDbText = decrypted.toString(crypto.enc.Utf8);
                var lbl_ = Ti.UI.createLabel({
                    top: "5dp",
                    left: "15dp",
                    height: "25dp",
                    color: "#ffffff",
                    width: Titanium.UI.FILL,
                    text: searchDbText,
                    font: {
                        fontSize: "14dp",
                        fontFamily: "futura_lt_bt_light-webfont"
                    },
                    type: "searchText"
                });
                $.searchRecentContainer.add(lbl_);
                data.next();
            }
        }
    }
    function headerRecentSearch(e) {
        Ti.API.info("headerRecentSearch--->" + e.source.type);
        Ti.API.info("headerRecentSearch--->" + JSON.stringify(e.source.text));
        if ("searchText" == e.source.type) {
            $.headerSearchTxt.value = e.source.text;
            $.searchContainer.visible = false;
            searchText = e.source.text;
            try {
                var _key = crypto.AES.encrypt(searchText, ckey, {
                    iv: iv
                });
                db.execute("update searchList set created_at=CURRENT_TIMESTAMP where search=?", _key.toString());
            } catch (ex_) {}
            $.filterByContainer.removeAllChildren();
            $.sortDetails.removeAllChildren();
            sortBy = "";
            filters = {};
            getSearchData(e.source.text);
        }
    }
    function autoSearch(e) {
        $.recentContainer.removeAllChildren();
        var deleteQry = db.execute('DELETE  from searchList WHERE created_at < datetime("now","-1 day")');
        if (null == deleteQry) {
            var data = db.execute("SELECT * FROM searchList ORDER BY created_at DESC LIMIT 5");
            $.recentlbl.visible = true;
            while (data.isValidRow()) {
                var _data = data.fieldByName("search");
                var decrypted = crypto.AES.decrypt(_data, ckey, {
                    iv: iv
                });
                var searchDbText = decrypted.toString(crypto.enc.Utf8);
                var lbl = Ti.UI.createLabel({
                    top: "5dp",
                    left: "15dp",
                    height: "25dp",
                    width: Titanium.UI.FILL,
                    color: "#ffffff",
                    text: searchDbText,
                    font: {
                        fontSize: "14dp",
                        fontFamily: "futura_lt_bt_light-webfont"
                    },
                    type: "searchText"
                });
                $.recentContainer.add(lbl);
                data.next();
            }
        }
    }
    function recentSearch(e) {
        Ti.API.info("recentSearch--->" + e.source.type);
        Ti.API.info("recentSearch--->" + JSON.stringify(e.source.text));
        if ("searchText" == e.source.type) {
            $.headerSearchTxt.value = e.source.text;
            $.searchView.visible = false;
            searchText = e.source.text;
            try {
                var _key = crypto.AES.encrypt(searchText, ckey, {
                    iv: iv
                });
                db.execute("update searchList set created_at=CURRENT_TIMESTAMP where search=?", _key.toString());
            } catch (ex_) {
                Ti.API.info("catch = = " + ex_.message);
            }
            $.filterByContainer.removeAllChildren();
            $.sortDetails.removeAllChildren();
            sortBy = "";
            filters = {};
            getSearchData(e.source.text);
        }
    }
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
            if (("listTypeTemplate" == activeTemplate || "blockTypeTemplate" == activeTemplate) && "#a6a6a6" == a[bind].color) {
                a[bind].color = "#e65e48";
                cartData.section.updateItemAt(cartData.itemIndex, a);
            }
            addtocartItem.push(e.data[0].product_id);
            Ti.App.Properties.setString("quote_id", e.data[0].quote_id);
            Ti.App.Properties.setString("cartCount", e.data[0].count);
            showAlert($.searchListing, e.message);
            updateCartData();
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
        showAlert($.searchListing, e.message);
    }
    function addToShortlist(productData) {
        if (isNullVal(Ti.App.Properties.getString("access_token"))) Alloy.Globals.addWindowInNav("signIn", "searchListing"); else {
            shortlistData = "";
            if (!isNullVal(productData.bindId)) {
                bind = productData.bindId;
                index = productData.itemIndex;
                itemSection = productData.section.items[index];
                shortlistData = productData;
                if ("" == itemSection[bind].text) {
                    gaShortlistProduct = {
                        name: itemSection[bind].collectionName,
                        sku: itemSection[bind].product_sku,
                        lostSale: itemSection[bind].lost_sale
                    };
                    itemSection[bind].text = "";
                    itemSection[bind].color = "#e65e48";
                    productData.section.updateItemAt(index, itemSection);
                    selectedCartItem.push(itemSection[bind].collectionId);
                    var url = Alloy.Globals.commonUrl.addToShortlist;
                    var data = {
                        product_id: itemSection[bind].collectionId
                    };
                    var requestParams = JSON.stringify(data);
                    Alloy.Globals.webServiceCall(url, requestParams, addToShortlistSuccessCallback, addToShortlistErrorCallback, "POST", $.searchListing);
                } else {
                    itemSection[bind].text = "";
                    itemSection[bind].color = "#a6a6a6";
                    productData.section.updateItemAt(index, itemSection);
                    selectedCartItem.splice(selectedCartItem.indexOf(itemSection[bind].collectionId), 1);
                    unSelectedCartItem.push(itemSection[bind].collectionId);
                    var url = Alloy.Globals.commonUrl.removeShortlist;
                    var data = {
                        product_id: itemSection[bind].collectionId
                    };
                    var requestParams = JSON.stringify(data);
                    Alloy.Globals.webServiceCall(url, requestParams, removeShortlistProductSuccessCallback, removeShortlistProductErrorCallback, "POST", $.searchListing);
                }
            }
        }
    }
    function addToShortlistSuccessCallback(e) {
        try {
            showAlert($.searchListing, e.message);
            googleAnalyticsShortlist(gaShortlistProduct, "SEARCH LISTING");
        } catch (e) {
            Ti.API.info("catch = " + ex.message);
        }
    }
    function addToShortlistErrorCallback(e) {
        showAlert($.searchListing, e.message);
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
            showAlert($.searchListing, e.message);
        } catch (e) {
            Ti.API.info("catch = " + JSON.stringify(e));
        }
    }
    function removeShortlistProductErrorCallback(e) {
        showAlert($.searchListing, e.message);
        var pbind_ = "", pindex_ = "", pitemSection_ = "";
        pbind_ = shortlistData.bindId;
        pindex_ = shortlistData.itemIndex;
        pitemSection_ = shortlistData.section.items[pindex_];
        pitemSection_[pbind_].text = "";
        pitemSection_[pbind_].color = "#e65e48";
        selectedCartItem.push(pitemSection_[pbind_].collectionId);
        shortlistData.section.updateItemAt(shortlistData.itemIndex, pitemSection_);
    }
    function getSearchData(search_text) {
        $.headerSearchTxt.visible = true;
        $.headerSearchTxt.blur();
        $.searchContainer.setVisible(false);
        showLoader($.searchListing);
        var url = "";
        listData = [];
        backupData = [];
        var data = {};
        $.mainSection.setItems(listData);
        page_no = 1;
        limit = 10;
        filtersData = {};
        _.each(filters, function(value, key) {
            value.length > 0 && (filtersData[key] = value.join(","));
        });
        url = Alloy.Globals.commonUrl.search;
        data = {
            q: search_text,
            sortby: sortBy || "",
            pagination: {}
        };
        data.pagination = {
            page_no: page_no,
            page_size: limit
        };
        _.size(filtersData) > 0 ? data["filters"] = filtersData : data["filters"] = "";
        var requestParams = JSON.stringify(data);
        Alloy.Globals.webServiceCall(url, requestParams, subCollectionSuccessCallback, subCollectionErrorCallback, "POST", $.searchListing);
    }
    function subCollectionSuccessCallback(e) {
        try {
            hideLoader($.searchListing);
            totalItem = e.data.product_data.total_count;
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
            var text = totalItem + " SEARCH RESULTS";
            var attr = Ti.UI.createAttributedString({
                text: text,
                attributes: [ {
                    type: Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
                    value: "#333333",
                    range: [ text.indexOf(" SEARCH RESULTS"), " SEARCH RESULTS".length ]
                }, {
                    type: Ti.UI.ATTRIBUTE_FONT,
                    value: {
                        fontSize: "12dp",
                        fontFamily: "futura_lt_bt_light-webfont"
                    },
                    range: [ text.indexOf(" SEARCH RESULTS"), " SEARCH RESULTS".length ]
                } ]
            });
            $.searchCount.attributedString = attr;
            if (isNullVal(e.data.product_data.product_listing)) {
                displayCount = "";
                gridData = "";
            } else {
                displayCount = e.data.product_data.product_listing.length;
                gridData = e.data.product_data.product_listing;
                looping_value(e.data.product_data.product_listing, activeTemplate);
            }
            filterRawData = e;
            addFilterByRows(filterRawData);
            googleAnalyticsSearch(searchText);
            if (0 == displayCount) {
                $.emptySearchContainer.visible = true;
                $.filterByContainer.removeAllChildren();
                filters = {};
                setTimeout(function(e) {
                    addFilterByRows(filterRawData);
                }, 300);
            } else $.emptySearchContainer.visible = false;
        } catch (ex) {
            Ti.API.info("catch error" + ex.message);
            showAlert($.searchListing, "Something went wrong...");
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
                        text: value.label.toUpperCase()
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
        Ti.API.info("error = " + JSON.stringify(e));
        hideLoader($.searchListing);
        showAlert($.searchListing, e.message);
        displayCount = 0;
        $.emptySearchContainer.visible = true;
        $.filterByContainer.removeAllChildren();
        filters = {};
        setTimeout(function(e) {
            addFilterByRows(filterRawData);
        }, 300);
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
            getSearchData(searchText);
            hideShowView($.sortView);
        }
    }
    function looping_value(data, templateName) {
        outOfStock1 = "", outOfStock2 = "";
        try {
            var cartDataArray = [];
            var cartIdArray = [];
            listData = [];
            switch (templateName) {
              case "gridTemplate":
                _.each(data, function(value, k) {
                    backupData.push(value);
                    isNullVal(value.id) || value.cartItem || value.is_wallpaper || "Shop" != value.type || cartProductId.push(value.id);
                    cartDataArray = Titanium.App.Properties.getList("cartAllid");
                    -1 == cartDataArray.indexOf(value.id) && cartDataArray.push(value.id);
                    Titanium.App.Properties.setList("cartAllid", cartDataArray);
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
                if ("gridTemplate" != templateName) {
                    backupData.push(value);
                    isNullVal(value.id) || value.cartItem || value.is_wallpaper || "Shop" != value.type || cartProductId.push(value.id);
                    cartDataArray = Titanium.App.Properties.getList("cartAllid");
                    -1 == cartDataArray.indexOf(value.id) && cartDataArray.push(value.id);
                    Titanium.App.Properties.setList("cartAllid", cartDataArray);
                }
                if (value) {
                    gridProductname1 = value.name;
                    collectionId1 = value.id;
                    collectionImage1 = encodeURI(value.profile_image);
                    gridCart1 = "Shop" == value.type && false == value.isWallpaper ? Alloy.Globals.icon.bag : "";
                    isSelected_0 = "collection" != value.type && value.wishlistItem ? Alloy.Globals.icon.setShortlist : Alloy.Globals.icon.shortlist;
                    gridShare1 = Alloy.Globals.icon.share;
                    wishIconColor_0 = "collection" != value.type && value.wishlistItem ? "#e65e48" : "#a6a6a6";
                    cartIconColor_0 = "Shop" == value.type && false == value.isWallpaper ? value.cartItem ? "#e65e48" : "gridTemplate" == activeTemplate ? "#66000000" : "#a6a6a6" : "transparent";
                    productSize1 = "Shop" == value.type && false == value.isWallpaper && "NA" != value.product_size ? value.product_size : "";
                    productFontSize1 = "Shop" == value.type && false == value.isWallpaper && "NA" != value.product_size ? "9" : "0";
                    gridWhereToBuy1 = "collection" != value.type ? Alloy.Globals.icon.currency + value.price : "Where to buy";
                    imageContainer = "#f4f4f4";
                    logoText = "";
                    productType_0 = value.type;
                    shareUrl1 = value.url;
                    wallpaperFlag_0 = value.isWallpaper;
                    if ("Shop" == value.type && false == value.isWallpaper && value.cartItem) {
                        cartIdArray = Titanium.App.Properties.getList("cartProductIdArray");
                        -1 == cartIdArray.indexOf(value.id) && cartIdArray.push(value.id);
                        Titanium.App.Properties.setList("cartProductIdArray", cartIdArray);
                    }
                    try {
                        "Shop" == value.type && false == value.isWallpaper ? 1 == value.in_stock ? outOfStock1 = false : 0 == value.in_stock && (outOfStock1 = true) : outOfStock1 = void 0;
                    } catch (exp1) {
                        outOfStock1 = void 0;
                    }
                }
                if (value[0]) {
                    product_sku1 = value[0].sku;
                    gridProductname1 = value[0].name;
                    collectionId1 = value[0].id;
                    collectionImage1 = encodeURI(value[0].profile_image);
                    gridCart1 = "Shop" == value[0].type && false == value[0].isWallpaper ? Alloy.Globals.icon.bag : "";
                    isSelected_0 = "collection" != value[0].type && value[0].wishlistItem ? Alloy.Globals.icon.setShortlist : Alloy.Globals.icon.shortlist;
                    gridShare1 = Alloy.Globals.icon.share;
                    wishIconColor_0 = "collection" != value[0].type && value[0].wishlistItem ? "#e65e48" : "#a6a6a6";
                    cartIconColor_0 = "Shop" == value[0].type && false == value[0].isWallpaper ? value[0].cartItem ? "#e65e48" : "gridTemplate" == activeTemplate ? "#66000000" : "#a6a6a6" : "transparent";
                    productSize1 = "Shop" == value[0].type && false == value[0].isWallpaper && "NA" != value[0].product_size ? value[0].product_size : "";
                    productFontSize1 = "Shop" == value[0].type && false == value[0].isWallpaper && "NA" != value[0].product_size ? "9" : "0";
                    gridWhereToBuy1 = "collection" != value[0].type ? Alloy.Globals.icon.currency + value[0].price : "Where to buy";
                    imageContainer = "#f4f4f4";
                    logoText = "";
                    productType_0 = value[0].type;
                    wallpaperFlag_0 = value[0].isWallpaper;
                    shareUrl1 = value[0].url;
                    if ("Shop" == value[0].type && false == value[0].isWallpaper && value[0].cartItem) {
                        cartIdArray = Titanium.App.Properties.getList("cartProductIdArray");
                        -1 == cartIdArray.indexOf(value[0].id) && cartIdArray.push(value[0].id);
                        Titanium.App.Properties.setList("cartProductIdArray", cartIdArray);
                    }
                    try {
                        "Shop" == value[0].type && false == value[0].isWallpaper ? 1 == value[0].in_stock ? outOfStock1 = false : 0 == value[0].in_stock && (outOfStock1 = true) : outOfStock1 = void 0;
                    } catch (exp1) {
                        outOfStock1 = void 0;
                    }
                }
                if (value[1]) {
                    product_sku2 = value[1].sku;
                    gridProductname2 = value[1].name;
                    collectionId2 = value[1].id;
                    collectionImage2 = encodeURI(value[1].profile_image);
                    gridShare2 = Alloy.Globals.icon.share;
                    gridCart2 = "Shop" == value[1].type && false == value[1].isWallpaper ? Alloy.Globals.icon.bag : "";
                    isSelected_1 = "collection" != value[1].type && value[1].wishlistItem ? Alloy.Globals.icon.setShortlist : Alloy.Globals.icon.shortlist;
                    wishIconColor_1 = "collection" != value[1].type && value[1].wishlistItem ? "#e65e48" : "#a6a6a6";
                    cartIconColor_1 = "Shop" == value[1].type && false == value[1].isWallpaper ? value[1].cartItem ? "#e65e48" : "gridTemplate" == activeTemplate ? "#66000000" : "#a6a6a6" : "transparent";
                    productSize2 = "Shop" == value[1].type && false == value[1].isWallpaper && "NA" != value[1].product_size ? value[1].product_size : "";
                    productFontSize2 = "Shop" == value[1].type && false == value[1].isWallpaper && "NA" != value[1].product_size ? "9" : "0";
                    gridWhereToBuy2 = "collection" != value[1].type ? Alloy.Globals.icon.currency + value[1].price : "Where to buy";
                    imageContainer = "#f4f4f4";
                    logoText = "";
                    productType_1 = value[1].type;
                    wallpaperFlag_1 = value[1].isWallpaper;
                    shareUrl2 = value[1].url;
                    if ("Shop" == value[1].type && false == value[1].isWallpaper && value[1].cartItem) {
                        cartIdArray = Titanium.App.Properties.getList("cartProductIdArray");
                        -1 == cartIdArray.indexOf(value[1].id) && cartIdArray.push(value[1].id);
                        Titanium.App.Properties.setList("cartProductIdArray", cartIdArray);
                    }
                    try {
                        "Shop" == value[1].type && false == value[1].isWallpaper ? 1 == value[1].in_stock ? outOfStock2 = false : 0 == value[1].in_stock && (outOfStock2 = true) : outOfStock2 = void 0;
                    } catch (ex) {
                        outOfStock2 = void 0;
                    }
                } else {
                    imageContainer = "#ffffff";
                    product_sku2 = "";
                    gridProductname2 = "";
                    collectionId2 = "";
                    collectionImage2 = "";
                    gridShare2 = "";
                    gridCart2 = "";
                    isSelected_1 = "";
                    wishIconColor_1 = "transparent";
                    cartIconColor_1 = "transparent";
                    gridWhereToBuy2 = "";
                    logoText = "";
                    productType_1 = "";
                    wallpaperFlag_1 = "";
                    productSize2 = "";
                    productFontSize2 = "0";
                    shareUrl2 = "";
                    outOfStock2 = void 0;
                }
                listData.push({
                    properties: {},
                    template: templateName,
                    gridProductname1: {
                        text: gridProductname1,
                        collectionId: collectionId1,
                        productType: productType_0,
                        wallpaper: wallpaperFlag_0
                    },
                    gridProductname2: {
                        text: gridProductname2,
                        collectionId: collectionId2,
                        productType: productType_1,
                        wallpaper: wallpaperFlag_1
                    },
                    gridCart1: {
                        text: gridCart1,
                        product_name_ga: isNullVal(gridProductname1) ? gridProductname1 : gridProductname1.toUpperCase(),
                        product_sku: product_sku1,
                        backgroundColor: "gridTemplate" == templateName ? cartIconColor_0 : "transparent",
                        collectionId: collectionId1,
                        productType: productType_0,
                        wallpaper: wallpaperFlag_0,
                        color: "gridTemplate" == templateName ? "#fff" : cartIconColor_0,
                        visible: "" == gridCart1 ? false : !outOfStock1
                    },
                    gridCart2: {
                        text: gridCart2,
                        product_name_ga: isNullVal(gridProductname2) ? gridProductname2 : gridProductname2.toUpperCase(),
                        product_sku: product_sku2,
                        collectionId: collectionId2,
                        productType: productType_1,
                        wallpaper: wallpaperFlag_1,
                        backgroundColor: "gridTemplate" == templateName ? cartIconColor_1 : "transparent",
                        color: "gridTemplate" == templateName ? "#fff" : cartIconColor_1,
                        visible: "" == gridCart2 ? false : !outOfStock2
                    },
                    gridShare1: {
                        collectionId: collectionId1,
                        text: gridShare1,
                        productType: productType_0,
                        wallpaper: wallpaperFlag_0,
                        shareUrl: shareUrl1
                    },
                    gridShare2: {
                        collectionId: collectionId2,
                        text: gridShare2,
                        productType: productType_1,
                        wallpaper: wallpaperFlag_1,
                        shareUrl: shareUrl2
                    },
                    gridWish1: {
                        collectionId: collectionId1,
                        iconValue: "",
                        text: isSelected_0,
                        color: wishIconColor_0,
                        collectionName: gridProductname1,
                        productType: productType_0,
                        wallpaper: wallpaperFlag_0,
                        product_sku: product_sku1,
                        lost_sale: !!outOfStock1
                    },
                    gridWish2: {
                        collectionId: collectionId2,
                        iconValue: "",
                        text: isSelected_1,
                        color: wishIconColor_1,
                        collectionName: gridProductname2,
                        productType: productType_1,
                        wallpaper: wallpaperFlag_1,
                        product_sku: product_sku2,
                        lost_sale: !!outOfStock2
                    },
                    gridProductImage1: {
                        image: collectionImage1,
                        collectionId: collectionId1,
                        productType: productType_0,
                        wallpaper: wallpaperFlag_0
                    },
                    gridProductImage2: {
                        image: collectionImage2,
                        collectionId: collectionId2,
                        productType: productType_1,
                        wallpaper: wallpaperFlag_1
                    },
                    gridWhereToBuy1: {
                        text: gridWhereToBuy1,
                        collectionId: collectionId1,
                        productType: productType_0,
                        wallpaper: wallpaperFlag_0,
                        product_name_ga: isNullVal(gridProductname1) ? gridProductname1 : gridProductname1.toUpperCase()
                    },
                    gridWhereToBuy2: {
                        text: gridWhereToBuy2,
                        collectionId: collectionId2,
                        productType: productType_1,
                        wallpaper: wallpaperFlag_1,
                        product_name_ga: isNullVal(gridProductname2) ? gridProductname2 : gridProductname2.toUpperCase()
                    },
                    listContainer: {
                        collectionId: collectionId1,
                        productType: productType_0,
                        wallpaper: wallpaperFlag_0
                    },
                    productSize1: {
                        collectionId: collectionId1,
                        text: productSize1,
                        font: {
                            fontSize: productFontSize1
                        }
                    },
                    productSize2: {
                        collectionId: collectionId2,
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
    function viewTypeLooping(data, templateName) {
        listData = [];
        var addFlag = null;
        var removeFlag = null;
        $.mainSection.setItems(listData);
        addFlag = Titanium.App.Properties.getList("removeCartProductIdArray");
        removeFlag = Titanium.App.Properties.getList("cartProductIdArray");
        addFlag[0] == removeFlag[0] && 1 == addFlag.length && 1 == removeFlag.length && Titanium.App.Properties.setList("cartProductIdArray", []);
        _.each(Titanium.App.Properties.getList("cartAllid"), function(value, k) {
            var found = _.findWhere(data, {
                id: value
            });
            isNullVal(found) || (found.cartItem = false);
        });
        _.each(Titanium.App.Properties.getList("removeCartProductIdArray"), function(k, v) {
            cartProductId.splice(cartProductId.indexOf(k), 1);
            var found = _.findWhere(data, {
                id: k
            });
            isNullVal(found) || (found.cartItem = false);
        });
        Ti.API.info("cartProductId = " + cartProductId);
        Ti.API.info("Titanium.App.Properties.get(cartProductIdArray) ===" + Titanium.App.Properties.getList("cartProductIdArray"));
        _.each(Titanium.App.Properties.getList("cartProductIdArray"), function(k, v) {
            var found = _.findWhere(data, {
                id: k
            });
            isNullVal(found) || (found.cartItem = true);
        });
        isNullVal(unSelectedCartItem) || _.each(unSelectedCartItem, function(value, k) {
            var found = _.findWhere(data, {
                id: value
            });
            isNullVal(found) || (found.wishlistItem = false);
        });
        isNullVal(selectedCartItem) || _.each(selectedCartItem, function(value, k) {
            var found = _.findWhere(data, {
                id: value
            });
            isNullVal(found) || (found.wishlistItem = true);
        });
        if (addFlag[0] == removeFlag[0] && 1 == addFlag.length && 1 == removeFlag.length) {
            Titanium.App.Properties.setList("removeCartProductIdArray", []);
            Titanium.App.Properties.setList("cartProductIdArray", []);
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
        0 != displayCount && _.each(data, function(value, k) {
            if (value) {
                gridProductname1 = value.name;
                collectionId1 = value.id;
                collectionImage1 = encodeURI(value.profile_image);
                gridCart1 = "Shop" == value.type && false == value.isWallpaper ? Alloy.Globals.icon.bag : "";
                isSelected_0 = "collection" != value.type && value.wishlistItem ? Alloy.Globals.icon.setShortlist : Alloy.Globals.icon.shortlist;
                gridShare1 = Alloy.Globals.icon.share;
                wishIconColor_0 = "collection" != value.type && value.wishlistItem ? "#e65e48" : "#a6a6a6";
                cartIconColor_0 = "Shop" == value.type && false == value.isWallpaper ? value.cartItem ? "#e65e48" : "gridTemplate" == activeTemplate ? "#66000000" : "#a6a6a6" : "transparent";
                productSize1 = "Shop" == value.type && false == value.isWallpaper && "NA" != value.product_size ? value.product_size : "";
                productFontSize1 = "Shop" == value.type && false == value.isWallpaper && "NA" != value.product_size ? "9" : "0";
                gridWhereToBuy1 = "collection" != value.type ? Alloy.Globals.icon.currency + value.price : "Where to buy";
                imageContainer = "#f4f4f4";
                logoText = "";
                productType_0 = value.type;
                wallpaperFlag_0 = value.isWallpaper;
                shareUrl1 = value.url;
                try {
                    "Shop" == value.type && false == value.isWallpaper ? 1 == value.in_stock ? outOfStock1 = false : 0 == value.in_stock && (outOfStock1 = true) : outOfStock1 = void 0;
                } catch (ex) {
                    outOfStock1 = void 0;
                }
            }
            if (value[0]) {
                Ti.API.info("value[0].cartItem = " + value[0].cartItem);
                product_sku1 = value[0].sku;
                gridProductname1 = value[0].name;
                collectionId1 = value[0].id;
                collectionImage1 = encodeURI(value[0].profile_image);
                gridCart1 = "Shop" == value[0].type && false == value[0].isWallpaper ? Alloy.Globals.icon.bag : "";
                isSelected_0 = "collection" != value[0].type && value[0].wishlistItem ? Alloy.Globals.icon.setShortlist : Alloy.Globals.icon.shortlist;
                gridShare1 = Alloy.Globals.icon.share;
                wishIconColor_0 = "collection" != value[0].type && value[0].wishlistItem ? "#e65e48" : "#a6a6a6";
                cartIconColor_0 = "Shop" == value[0].type && false == value[0].isWallpaper ? value[0].cartItem ? "#e65e48" : "gridTemplate" == activeTemplate ? "#66000000" : "#a6a6a6" : "transparent";
                productSize1 = "Shop" == value[0].type && false == value[0].isWallpaper && "NA" != value[0].product_size ? value[0].product_size : "";
                productFontSize1 = "Shop" == value[0].type && false == value[0].isWallpaper && "NA" != value[0].product_size ? "9" : "0";
                gridWhereToBuy1 = "collection" != value[0].type ? Alloy.Globals.icon.currency + value[0].price : "Where to buy";
                imageContainer = "#f4f4f4";
                logoText = "";
                productType_0 = value[0].type;
                wallpaperFlag_0 = value[0].isWallpaper;
                shareUrl1 = value[0].url;
                try {
                    "Shop" == value[0].type && false == value[0].isWallpaper ? 1 == value[0].in_stock ? outOfStock1 = false : 0 == value[0].in_stock && (outOfStock1 = true) : outOfStock1 = void 0;
                } catch (ex) {
                    outOfStock1 = void 0;
                }
            }
            if (value[1]) {
                Ti.API.info("value[1].cartItem = " + value[1].cartItem);
                product_sku2 = value[1].sku;
                gridProductname2 = value[1].name;
                collectionId2 = value[1].id;
                collectionImage2 = encodeURI(value[1].profile_image);
                gridShare2 = Alloy.Globals.icon.share;
                gridCart2 = "Shop" == value[1].type && false == value[1].isWallpaper ? Alloy.Globals.icon.bag : "";
                isSelected_1 = "collection" != value[1].type && value[1].wishlistItem ? Alloy.Globals.icon.setShortlist : Alloy.Globals.icon.shortlist;
                wishIconColor_1 = "collection" != value[1].type && value[1].wishlistItem ? "#e65e48" : "#a6a6a6";
                cartIconColor_1 = "Shop" == value[1].type && false == value[1].isWallpaper ? value[1].cartItem ? "#e65e48" : "gridTemplate" == activeTemplate ? "#66000000" : "#a6a6a6" : "transparent";
                productSize2 = "Shop" == value[1].type && false == value[1].isWallpaper && "NA" != value[1].product_size ? value[1].product_size : "";
                productFontSize2 = "Shop" == value[1].type && false == value[1].isWallpaper && "NA" != value[1].product_size ? "9" : "0";
                gridWhereToBuy2 = "collection" != value[1].type ? Alloy.Globals.icon.currency + value[1].price : "Where to buy";
                imageContainer = "#f4f4f4";
                logoText = "";
                productType_1 = value[1].type;
                wallpaperFlag_1 = value[1].isWallpaper;
                shareUrl2 = value[1].url;
                try {
                    "Shop" == value[1].type && false == value[1].isWallpaper ? 1 == value[1].in_stock ? outOfStock2 = false : 0 == value[1].in_stock && (outOfStock2 = true) : outOfStock2 = void 0;
                } catch (ex) {
                    outOfStock2 = void 0;
                }
                Ti.API.info("value[0].type = " + value[0].cartItem + " value[1].cartItem =" + value[1].cartItem);
                Ti.API.info("cartIconColor_0 = " + cartIconColor_0 + "cartIconColor_1 =" + cartIconColor_1);
            } else {
                imageContainer = "#ffffff";
                product_sku2 = "";
                gridProductname2 = "";
                collectionId2 = "";
                collectionImage2 = "";
                gridShare2 = "";
                gridCart2 = "";
                isSelected_1 = "";
                wishIconColor_1 = "transparent";
                cartIconColor_1 = "transparent";
                gridWhereToBuy2 = "";
                logoText = "";
                productType_1 = "";
                wallpaperFlag_1 = "";
                productSize2 = "";
                productFontSize2 = "0";
                shareUrl2 = "";
                outOfStock2 = void 0;
            }
            listData.push({
                properties: {},
                template: templateName,
                gridProductname1: {
                    text: gridProductname1,
                    collectionId: collectionId1,
                    productType: productType_0,
                    wallpaper: wallpaperFlag_0
                },
                gridProductname2: {
                    text: gridProductname2,
                    collectionId: collectionId2,
                    productType: productType_1,
                    wallpaper: wallpaperFlag_1
                },
                gridCart1: {
                    text: gridCart1,
                    product_name_ga: isNullVal(gridProductname1) ? gridProductname1 : gridProductname1.toUpperCase(),
                    product_sku: product_sku1,
                    collectionId: collectionId1,
                    productType: productType_0,
                    wallpaper: wallpaperFlag_0,
                    backgroundColor: "gridTemplate" == templateName ? cartIconColor_0 : "transparent",
                    color: "gridTemplate" == templateName ? "#fff" : cartIconColor_0,
                    visible: "" == gridCart1 ? false : !outOfStock1
                },
                gridCart2: {
                    text: gridCart2,
                    product_name_ga: isNullVal(gridProductname2) ? gridProductname2 : gridProductname2.toUpperCase(),
                    product_sku: product_sku2,
                    collectionId: collectionId2,
                    productType: productType_1,
                    wallpaper: wallpaperFlag_1,
                    backgroundColor: "gridTemplate" == templateName ? cartIconColor_1 : "transparent",
                    color: "gridTemplate" == templateName ? "#fff" : cartIconColor_1,
                    visible: "" == gridCart2 ? false : !outOfStock2
                },
                gridShare1: {
                    collectionId: collectionId1,
                    text: gridShare1,
                    productType: productType_0,
                    wallpaper: wallpaperFlag_0,
                    shareUrl: shareUrl1
                },
                gridShare2: {
                    collectionId: collectionId2,
                    text: gridShare2,
                    productType: productType_1,
                    wallpaper: wallpaperFlag_1,
                    shareUrl: shareUrl2
                },
                gridWish1: {
                    collectionId: collectionId1,
                    iconValue: "",
                    text: isSelected_0,
                    color: wishIconColor_0,
                    collectionName: gridProductname1,
                    productType: productType_0,
                    wallpaper: wallpaperFlag_0,
                    product_sku: product_sku1,
                    lost_sale: !!outOfStock1
                },
                gridWish2: {
                    collectionId: collectionId2,
                    iconValue: "",
                    text: isSelected_1,
                    color: wishIconColor_1,
                    collectionName: gridProductname2,
                    productType: productType_1,
                    wallpaper: wallpaperFlag_1,
                    product_sku: product_sku2,
                    lost_sale: !!outOfStock2
                },
                gridProductImage1: {
                    image: collectionImage1,
                    collectionId: collectionId1,
                    productType: productType_0,
                    wallpaper: wallpaperFlag_0
                },
                gridProductImage2: {
                    image: collectionImage2,
                    collectionId: collectionId2,
                    productType: productType_1,
                    wallpaper: wallpaperFlag_1
                },
                gridWhereToBuy1: {
                    text: gridWhereToBuy1,
                    collectionId: collectionId1,
                    productType: productType_0,
                    wallpaper: wallpaperFlag_0,
                    product_name_ga: isNullVal(gridProductname1) ? gridProductname1 : gridProductname1.toUpperCase()
                },
                gridWhereToBuy2: {
                    text: gridWhereToBuy2,
                    collectionId: collectionId2,
                    productType: productType_1,
                    wallpaper: wallpaperFlag_1,
                    product_name_ga: isNullVal(gridProductname2) ? gridProductname2 : gridProductname2.toUpperCase()
                },
                productSize1: {
                    collectionId: collectionId1,
                    text: productSize1,
                    font: {
                        fontSize: productFontSize1
                    }
                },
                productSize2: {
                    collectionId: collectionId2,
                    text: productSize2,
                    font: {
                        fontSize: productFontSize2
                    }
                },
                listContainer: {
                    collectionId: collectionId1,
                    productType: productType_0,
                    wallpaper: wallpaperFlag_0
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
        });
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
        _.each(filters, function(value, key) {
            value.length > 0 && (filtersData[key] = value.join(","));
        });
        url = Alloy.Globals.commonUrl.search;
        data = {
            q: searchText,
            sortby: sortBy || "",
            pagination: {}
        };
        data.pagination = {
            page_no: page_no,
            page_size: limit
        };
        _.size(filtersData) > 0 ? data["filters"] = filtersData : data["filters"] = "";
        var requestParams = JSON.stringify(data);
        Alloy.Globals.webServiceCall(url, requestParams, subCollectionSuccessCallback, subCollectionErrorCallback, "POST", $.searchListing);
    }
    function showOverFlow(e) {
        $.openView.visible = true;
        Alloy.Globals.overFlowFlag = true;
    }
    function hideOverFlow(e) {
        if (Alloy.Globals.overFlowFlag) {
            $.openView.visible = false;
            Alloy.Globals.overFlowFlag = false;
        }
    }
    function goToBack() {
        if ("shortlist" == addShortlist.type) {
            hideShowView(addShortlist);
            addShortlist = "";
        } else if ($.sortView.getVisible()) hideShowView($.sortView); else if ($.filterView.getVisible()) hideShowView($.filterView); else {
            db.close();
            Alloy.Globals.popWindowInNav();
            $.searchListing.close();
        }
    }
    function destroyWindow(e) {
        $.removeListener();
        $.searchListing.remove($.dashboardNavigation);
        $.searchListing.remove($.listScrollView);
        $.searchListing.remove($.listTypeContainer);
        $.searchListing.remove($.sortView);
        $.searchListing.remove($.filterView);
        $.searchListing.remove($.emptySearchContainer);
        $.searchListing.remove($.searchView);
        $.searchListing.remove($.openView);
        $.dashboardNavigation.removeAllChildren();
        $.listScrollView.removeAllChildren();
        $.listTypeContainer.removeAllChildren();
        $.sortView.removeAllChildren();
        $.filterView.removeAllChildren();
        $.emptySearchContainer.removeAllChildren();
        $.searchView.removeAllChildren();
        $.searchContainer.removeAllChildren();
        $.openView.removeAllChildren();
        args = {};
        db = null;
        searchText = null;
        filterRawData = null;
        shareUrl1 = null;
        shareUrl2 = null;
        gaShortlistProduct = null;
        crypto = null;
        ckey = null;
        iv = null;
        $.destroy();
    }
    function blurText() {
        Ti.API.info("blur");
        $.headerSearchTxt.blur();
        $.SearchTxt.blur();
    }
    function updateItemListClick(e) {
        Ti.API.info("fireEvent");
        $.listView.fireEvent("itemclick", e);
    }
    function navigateToPrivacy() {
        $.openView.visible = false;
        Alloy.Globals.overFlowFlag = false;
        Alloy.Globals.addWindowInNav("privacypolicy");
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "searchListing";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.searchListing = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        backgroundColor: "#ffffff",
        id: "searchListing"
    });
    $.__views.searchListing && $.addTopLevelView($.__views.searchListing);
    checkblurEfect ? $.addListener($.__views.searchListing, "blur", checkblurEfect) : __defers["$.__views.searchListing!blur!checkblurEfect"] = true;
    updateCount ? $.addListener($.__views.searchListing, "focus", updateCount) : __defers["$.__views.searchListing!focus!updateCount"] = true;
    goToBack ? $.addListener($.__views.searchListing, "android:back", goToBack) : __defers["$.__views.searchListing!android:back!goToBack"] = true;
    blurText ? $.addListener($.__views.searchListing, "open", blurText) : __defers["$.__views.searchListing!open!blurText"] = true;
    destroyWindow ? $.addListener($.__views.searchListing, "close", destroyWindow) : __defers["$.__views.searchListing!close!destroyWindow"] = true;
    $.__views.listScrollView = Ti.UI.createView({
        top: "53dp",
        id: "listScrollView"
    });
    $.__views.searchListing.add($.__views.listScrollView);
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
    $.__views.__alloyId1476 = Ti.UI.createLabel({
        font: {
            fontSize: "12sp"
        },
        color: "#a6ffffff",
        text: "|",
        id: "__alloyId1476"
    });
    $.__views.filterContainer.add($.__views.__alloyId1476);
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
        height: "35dp",
        zIndex: "5",
        top: "35dp",
        type: "outerView",
        backgroundColor: "#ffffff",
        id: "styleFilterView"
    });
    $.__views.listScrollView.add($.__views.styleFilterView);
    $.__views.searchCount = Ti.UI.createLabel({
        height: "35dp",
        backgroundColor: "#ffffff",
        left: "15dp",
        font: {
            fontSize: "12dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#e65e48",
        id: "searchCount"
    });
    $.__views.styleFilterView.add($.__views.searchCount);
    $.__views.footerView = Ti.UI.createView({
        id: "footerView",
        height: "85dp"
    });
    $.__views.activityInd = Ti.UI.createActivityIndicator({
        id: "activityInd",
        top: 10
    });
    $.__views.footerView.add($.__views.activityInd);
    var __alloyId1485 = {};
    Alloy.createController("listTemplate", {
        __parentSymbol: __parentSymbol,
        __itemTemplate: __alloyId1485
    });
    $.__views.mainSection = Ti.UI.createListSection({
        id: "mainSection"
    });
    var __alloyId1488 = [];
    __alloyId1488.push($.__views.mainSection);
    $.__views.listView = Ti.UI.createListView({
        top: "70dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        sections: __alloyId1488,
        templates: __alloyId1485,
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
    $.__views.searchListing.add($.__views.listTypeContainer);
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
    $.__views.__alloyId1489 = Ti.UI.createView({
        backgroundColor: "#ccffffff",
        top: "10dp",
        layout: "vertical",
        id: "__alloyId1489"
    });
    $.__views.listTypeContainer.add($.__views.__alloyId1489);
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
    $.__views.__alloyId1489.add($.__views.listTypeLbl);
    $.__views.listTypeSubContainer = Ti.UI.createView({
        width: "60%",
        height: "65dp",
        id: "listTypeSubContainer"
    });
    $.__views.__alloyId1489.add($.__views.listTypeSubContainer);
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
        id: "sortView",
        zIndex: 1e3
    });
    $.__views.searchListing.add($.__views.sortView);
    $.__views.__alloyId1490 = Ti.UI.createView({
        top: "0dp",
        width: Titanium.UI.FILL,
        height: "53dp",
        id: "__alloyId1490"
    });
    $.__views.sortView.add($.__views.__alloyId1490);
    $.__views.__alloyId1491 = Ti.UI.createLabel({
        left: "15dp",
        height: Titanium.UI.FILL,
        font: {
            fontSize: "15dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        text: "SORT BY",
        id: "__alloyId1491"
    });
    $.__views.__alloyId1490.add($.__views.__alloyId1491);
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
    $.__views.__alloyId1490.add($.__views.sortCloseLbl);
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
        id: "filterView",
        zIndex: 1e3
    });
    $.__views.searchListing.add($.__views.filterView);
    $.__views.__alloyId1492 = Ti.UI.createView({
        top: "0dp",
        width: Titanium.UI.FILL,
        height: "53dp",
        id: "__alloyId1492"
    });
    $.__views.filterView.add($.__views.__alloyId1492);
    $.__views.__alloyId1493 = Ti.UI.createLabel({
        left: "15dp",
        height: Titanium.UI.FILL,
        font: {
            fontSize: "15dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        text: "FILTER BY",
        id: "__alloyId1493"
    });
    $.__views.__alloyId1492.add($.__views.__alloyId1493);
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
    $.__views.__alloyId1492.add($.__views.refreshIcon);
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
    $.__views.__alloyId1492.add($.__views.filterCloseLbl);
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
    $.__views.emptySearchContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        backgroundColor: "#ffffff",
        left: "0dp",
        top: "53dp",
        visible: false,
        id: "emptySearchContainer"
    });
    $.__views.searchListing.add($.__views.emptySearchContainer);
    $.__views.__alloyId1494 = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId1494"
    });
    $.__views.emptySearchContainer.add($.__views.__alloyId1494);
    $.__views.__alloyId1495 = Ti.UI.createLabel({
        font: {
            fontSize: "36dp",
            fontFamily: "icomoon"
        },
        color: "gray",
        top: "0dp",
        text: Alloy.Globals.icon.noSearchResult,
        id: "__alloyId1495"
    });
    $.__views.__alloyId1494.add($.__views.__alloyId1495);
    $.__views.__alloyId1496 = Ti.UI.createLabel({
        top: "10dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#333333",
        text: "YOUR SEARCH RETURNS NO RESULTS",
        id: "__alloyId1496"
    });
    $.__views.__alloyId1494.add($.__views.__alloyId1496);
    $.__views.__alloyId1497 = Ti.UI.createView({
        width: "50dp",
        height: "1dp",
        top: "7dp",
        backgroundColor: "#cccccc",
        id: "__alloyId1497"
    });
    $.__views.__alloyId1494.add($.__views.__alloyId1497);
    $.__views.__alloyId1498 = Ti.UI.createLabel({
        top: "10dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#555555",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "Try a more general keyword\n\nCheck the keyword for spelling mistakes\n\nTry a different keyword",
        id: "__alloyId1498"
    });
    $.__views.__alloyId1494.add($.__views.__alloyId1498);
    $.__views.__alloyId1499 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        layout: "vertical",
        bottom: "30dp",
        id: "__alloyId1499"
    });
    $.__views.emptySearchContainer.add($.__views.__alloyId1499);
    $.__views.__alloyId1500 = Ti.UI.createLabel({
        top: "0dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#555555",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "if you are looking for something specific,please write to us at",
        id: "__alloyId1500"
    });
    $.__views.__alloyId1499.add($.__views.__alloyId1500);
    $.__views.__alloyId1501 = Ti.UI.createView({
        layout: "vertical",
        top: "7dp",
        height: "20dp",
        id: "__alloyId1501"
    });
    $.__views.__alloyId1499.add($.__views.__alloyId1501);
    $.__views.supportLinkLbl = Ti.UI.createLabel({
        top: "0dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont",
            fontWeight: "bold"
        },
        color: "#e65e48",
        text: "enquiry@ddecor.com",
        id: "supportLinkLbl"
    });
    $.__views.__alloyId1501.add($.__views.supportLinkLbl);
    $.__views.__alloyId1502 = Ti.UI.createView({
        backgroundColor: "#e65e48",
        top: "2dp",
        width: "120dp",
        height: "1.5dp",
        id: "__alloyId1502"
    });
    $.__views.__alloyId1501.add($.__views.__alloyId1502);
    $.__views.searchView = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        zIndex: "100",
        backgroundColor: "#231f20",
        id: "searchView"
    });
    $.__views.searchListing.add($.__views.searchView);
    $.__views.__alloyId1503 = Ti.UI.createView({
        top: "0dp",
        width: Titanium.UI.FILL,
        height: "53dp",
        id: "__alloyId1503"
    });
    $.__views.searchView.add($.__views.__alloyId1503);
    $.__views.SearchTxt = Ti.UI.createTextField({
        left: "15dp",
        width: "200dp",
        backgroundColor: "transparent",
        hintText: "Enter keywords",
        color: "#ffffff",
        font: {
            fontSize: "12sp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        returnKeyType: Titanium.UI.RETURNKEY_SEARCH,
        id: "SearchTxt",
        type: "TextField"
    });
    $.__views.__alloyId1503.add($.__views.SearchTxt);
    $.__views.searchSeperator = Ti.UI.createView({
        left: "15dp",
        height: "1dp",
        width: "200dp",
        backgroundColor: "#A1A39E",
        bottom: "10dp",
        id: "searchSeperator"
    });
    $.__views.__alloyId1503.add($.__views.searchSeperator);
    $.__views.searchLbl = Ti.UI.createLabel({
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "icomoon",
            fontSize: "22dp"
        },
        height: "45dp",
        width: "45dp",
        color: "#ffffff",
        id: "searchLbl",
        text: Alloy.Globals.icon.search,
        right: "60dp"
    });
    $.__views.__alloyId1503.add($.__views.searchLbl);
    $.__views.closeLbl = Ti.UI.createLabel({
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "icomoon",
            fontSize: "22dp"
        },
        height: "45dp",
        width: "45dp",
        color: "#ffffff",
        id: "closeLbl",
        text: Alloy.Globals.icon.close,
        right: "15dp"
    });
    $.__views.__alloyId1503.add($.__views.closeLbl);
    $.__views.view1 = Ti.UI.createScrollView({
        id: "view1",
        top: "53dp",
        layout: "vertical",
        width: Titanium.UI.FILL,
        scrollType: "vertical",
        height: Titanium.UI.SIZE
    });
    $.__views.searchView.add($.__views.view1);
    $.__views.recentlbl = Ti.UI.createLabel({
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#e65e48",
        left: "15dp",
        top: "0dp",
        height: "20dp",
        visible: false,
        text: "RECENT",
        id: "recentlbl"
    });
    $.__views.view1.add($.__views.recentlbl);
    $.__views.recentContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "0dp",
        layout: "vertical",
        id: "recentContainer"
    });
    $.__views.view1.add($.__views.recentContainer);
    $.__views.searchContainer = Ti.UI.createScrollView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        backgroundColor: "#231f20",
        id: "searchContainer",
        type: "searchView",
        visible: false,
        top: "53dp",
        scrollType: "vertical"
    });
    $.__views.searchListing.add($.__views.searchContainer);
    $.__views.searchRecentlbl = Ti.UI.createLabel({
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#e65e48",
        left: "15dp",
        top: "0dp",
        height: "20dp",
        visible: false,
        text: "RECENT",
        id: "searchRecentlbl"
    });
    $.__views.searchContainer.add($.__views.searchRecentlbl);
    $.__views.headerCloseLbl = Ti.UI.createLabel({
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "icomoon",
            fontSize: "15dp"
        },
        height: "20dp",
        width: "20dp",
        right: "15dp",
        top: "0dp",
        color: "#e65e48",
        id: "headerCloseLbl",
        text: Alloy.Globals.icon.close
    });
    $.__views.searchContainer.add($.__views.headerCloseLbl);
    $.__views.searchRecentContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "searchRecentContainer",
        top: "20dp",
        bottom: "10dp"
    });
    $.__views.searchContainer.add($.__views.searchRecentContainer);
    $.__views.openView = Ti.UI.createView({
        zIndex: "1",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        top: "0dp",
        right: "5dp",
        visible: false,
        backgroundColor: "transparent",
        id: "openView"
    });
    $.__views.searchListing.add($.__views.openView);
    $.__views.overFlowView = Ti.UI.createView({
        zIndex: "10",
        width: "55%",
        top: "8dp",
        right: "5dp",
        height: Titanium.UI.SIZE,
        borderRadius: "3dp",
        borderColor: "gray",
        borderWidth: "0.6",
        backgroundColor: "#ffffff",
        layout: "vertical",
        id: "overFlowView"
    });
    $.__views.openView.add($.__views.overFlowView);
    $.__views.home = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: "40dp",
        left: "10dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        text: "HOME",
        id: "home"
    });
    $.__views.overFlowView.add($.__views.home);
    $.__views.homeLbl = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: "40dp",
        left: "10dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        text: "ABOUT US",
        id: "homeLbl"
    });
    $.__views.overFlowView.add($.__views.homeLbl);
    $.__views.appoinmantLbl = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: "40dp",
        left: "10dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        text: "FEEDBACK",
        id: "appoinmantLbl"
    });
    $.__views.overFlowView.add($.__views.appoinmantLbl);
    $.__views.customerService = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: "40dp",
        left: "10dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        text: "CUSTOMER SERVICE",
        id: "customerService"
    });
    $.__views.overFlowView.add($.__views.customerService);
    $.__views.return_refund = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: "40dp",
        left: "10dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        text: "RETURNS / REFUND",
        id: "return_refund"
    });
    $.__views.overFlowView.add($.__views.return_refund);
    $.__views.faq = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: "40dp",
        left: "10dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        text: "FAQ",
        id: "faq"
    });
    $.__views.overFlowView.add($.__views.faq);
    $.__views.privacy = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: "40dp",
        left: "10dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        text: "PRIVACY POLICY",
        id: "privacy"
    });
    $.__views.overFlowView.add($.__views.privacy);
    navigateToPrivacy ? $.addListener($.__views.privacy, "click", navigateToPrivacy) : __defers["$.__views.privacy!click!navigateToPrivacy"] = true;
    $.__views.shortlist = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: "40dp",
        left: "10dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        text: "MY SHORTLIST",
        id: "shortlist"
    });
    $.__views.overFlowView.add($.__views.shortlist);
    try {
        $.addListener($.__views.shortlist, "click", Alloy.Globals.navigateToMyShorlistScreen);
    } catch (e) {
        __defers["$.__views.shortlist!click!Alloy.Globals.navigateToMyShorlistScreen"] = true;
    }
    $.__views.dashboardNavigation = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: "53dp",
        backgroundColor: "#231f20",
        top: "0dp",
        id: "dashboardNavigation"
    });
    $.__views.searchListing.add($.__views.dashboardNavigation);
    $.__views.menuButton = Ti.UI.createLabel({
        left: "0dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "icomoon",
            fontSize: "22dp"
        },
        height: "45dp",
        width: "45dp",
        color: "#ffffff",
        id: "menuButton",
        text: Alloy.Globals.icon.backArrow
    });
    $.__views.dashboardNavigation.add($.__views.menuButton);
    $.__views.headerSearchTxt = Ti.UI.createTextField({
        left: "50dp",
        width: "150dp",
        backgroundColor: "transparent",
        hintText: "Enter keywords",
        color: "#ffffff",
        font: {
            fontSize: "12sp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        returnKeyType: Titanium.UI.RETURNKEY_SEARCH,
        id: "headerSearchTxt",
        visible: false,
        type: "TextField"
    });
    $.__views.dashboardNavigation.add($.__views.headerSearchTxt);
    $.__views.textFieldSeperator = Ti.UI.createView({
        left: "55dp",
        height: "1dp",
        width: "150dp",
        backgroundColor: "#A1A39E",
        bottom: "15dp",
        id: "textFieldSeperator"
    });
    $.__views.dashboardNavigation.add($.__views.textFieldSeperator);
    $.__views.cartContainer = Ti.UI.createView({
        width: "45dp",
        height: "45dp",
        right: "90dp",
        id: "cartContainer"
    });
    $.__views.dashboardNavigation.add($.__views.cartContainer);
    $.__views.cartCountLbl = Ti.UI.createLabel({
        width: "18dp",
        height: "18dp",
        left: "5dp",
        top: "7dp",
        borderRadius: "9dp",
        borderColor: "#231f20",
        borderWidth: "0.7",
        color: "#000000",
        visible: false,
        zIndex: "10",
        font: {
            fontSize: "10dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#e65e48",
        touchEnabled: false,
        id: "cartCountLbl"
    });
    $.__views.cartContainer.add($.__views.cartCountLbl);
    $.__views.cartLbl = Ti.UI.createLabel({
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "icomoon",
            fontSize: "22dp"
        },
        height: "45dp",
        width: "45dp",
        color: "#ffffff",
        id: "cartLbl",
        text: Alloy.Globals.icon.bag
    });
    $.__views.cartContainer.add($.__views.cartLbl);
    $.__views.headerSearchLbl = Ti.UI.createLabel({
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "icomoon",
            fontSize: "22dp"
        },
        height: "45dp",
        width: "45dp",
        color: "#ffffff",
        id: "headerSearchLbl",
        text: Alloy.Globals.icon.search,
        right: "45dp"
    });
    $.__views.dashboardNavigation.add($.__views.headerSearchLbl);
    $.__views.overFlowMenuLbl = Ti.UI.createLabel({
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "icomoon",
            fontSize: "22dp"
        },
        height: "45dp",
        width: "45dp",
        color: "#ffffff",
        id: "overFlowMenuLbl",
        text: Alloy.Globals.icon.dotsMenu,
        right: "0dp"
    });
    $.__views.dashboardNavigation.add($.__views.overFlowMenuLbl);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var db = Titanium.Database.open("Ddecor");
    var gaAddToCartData = {};
    var searchText = "";
    var filterRawData = "";
    var shareUrl1, shareUrl2;
    var product_sku1 = "", product_sku2 = "";
    var cartProductId = [];
    var focusFlag = false;
    var gaShortlistProduct = {};
    var crypto = require("crypto");
    var ckey = crypto.enc.Base64.parse("#base64Key#");
    var iv = crypto.enc.Base64.parse("#base64IV#");
    touchEffect.createTouchEffect($.menuButton, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.headerSearchLbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.overFlowMenuLbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.searchLbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.closeLbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.headerCloseLbl, "#a6e65e48", "#e65e48");
    touchEffect.createTouchEffect($.home, "#a6333333", "#333333");
    touchEffect.createTouchEffect($.homeLbl, "#a6333333", "#333333");
    touchEffect.createTouchEffect($.appoinmantLbl, "#a6333333", "#333333");
    touchEffect.createTouchEffect($.return_refund, "#a6333333", "#333333");
    touchEffect.createTouchEffect($.faq, "#a6333333", "#333333");
    Titanium.App.Properties.setList("cartAllid", []);
    $.supportLinkLbl.addEventListener("click", function(e) {
        Ti.Platform.openURL("mailto:" + e.source.getText());
    });
    Ti.App.Properties.getString("access_token") ? $.customerService.setHeight("40dp") : $.customerService.setHeight("0dp");
    var db = Titanium.Database.open("Ddecor");
    db.execute("CREATE TABLE IF NOT EXISTS searchList (id INTEGER PRIMARY KEY, search TEXT NOT NULL,created_at timestamp NOT NULL DEFAULT current_timestamp,UNIQUE(search))");
    Ti.API.info('Ti.App.Properties.getString("firstTime") = ' + Ti.App.Properties.getString("firstTime"));
    null == Ti.App.Properties.getString("firstTime") && setSearchData();
    $.headerCloseLbl.addEventListener("click", function(e) {
        $.searchContainer.visible = false;
    });
    $.searchLbl.addEventListener("click", hideSearchView);
    $.headerSearchLbl.addEventListener("click", hideHeaderSearchView);
    $.SearchTxt.addEventListener("return", hideSearchView);
    $.headerSearchTxt.addEventListener("return", hideHeaderSearchView);
    if ("bannerClick" == args.action) {
        $.SearchTxt.value = args.searchText;
        hideSearchView();
    }
    $.SearchTxt.addEventListener("focus", autoSearch);
    $.headerSearchTxt.addEventListener("click", displaySearchView);
    $.headerSearchTxt.addEventListener("focus", function() {
        Ti.API.info("focus headerSearchTxt");
        displaySearchView();
        focusFlag = true;
    });
    $.headerSearchTxt.addEventListener("blur", function() {
        Ti.API.info("blur headerSearchTxt");
        focusFlag = false;
    });
    $.searchRecentContainer.addEventListener("click", headerRecentSearch);
    $.recentContainer.addEventListener("click", recentSearch);
    $.menuButton.addEventListener("click", goToBack);
    $.closeLbl.addEventListener("click", goToBack);
    $.searchListing.addEventListener("click", function(e) {
        if ("TextField" != e.source.type) {
            $.headerSearchTxt.blur();
            $.SearchTxt.blur();
        }
    });
    var sortBy = "";
    var gridData, firstCount, secondCount;
    var page_no = 1;
    var limit = 10;
    var totalItem;
    var listData = [];
    var backupData = [];
    var selectedCartItem = [];
    var unSelectedCartItem = [];
    var filters = {};
    var displayCount = "", sortTotalCount = "";
    var sortLbl = [];
    var sortContainer = [];
    var filterLbl = [];
    var subFilterLbl = [];
    var filterMainContainer = [];
    var checkFilterLbl = [];
    var subFilterContainer = [];
    var filtersData = {};
    var activeTemplate = "gridTemplate";
    var itemIndex_ = 0;
    var toggleStatus = true;
    var addtocartItem = [];
    var addShortlist = "";
    var cartData = "";
    $.gridIcon.color = "#e65e48";
    $.gridLbl.color = "#e65e48";
    touchEffect.createTouchEffect($.sortByLbl, "#a6e65e48", "#e65e48");
    touchEffect.createTouchEffect($.filterByLbl, "#a6e65e48", "#e65e48");
    touchEffect.createTouchEffect($.sortCloseLbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.refreshIcon, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.filterCloseLbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.filterApplyLbl, "#a6ffffff", "#ffffff");
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
        Ti.API.info("call 1");
        if (!isNullVal(e.source.id)) {
            Ti.API.info("call 2 =" + e.source.id);
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
        }
    });
    $.listView.addEventListener("itemclick", function(e) {
        try {
            if (!isNullVal(e.bindId)) {
                var _bind = e.bindId;
                var _index = e.itemIndex;
                var _a = e.section.items[_index];
                if (!isNullVal(_a[_bind].collectionId)) if ("gridWish1" == _bind || "gridWish2" == _bind) if (Ti.App.Properties.getString("access_token")) switch (_a[_bind].productType) {
                  case "collection":
                    var collectionData = {
                        collectionName: _a[_bind].collectionName,
                        collectionId: _a[_bind].collectionId,
                        type: "collection"
                    };
                    addShortlist = Alloy.createController("addToShortlist", collectionData).getView();
                    $.searchListing.add(addShortlist);
                    hideShowView(addShortlist);
                    break;

                  case "Shop":
                    addToShortlist(e);
                    break;

                  case "Qds":
                    addToShortlist(e);
                    break;

                  case "Blinds":
                    addToShortlist(e);
                } else Alloy.Globals.addWindowInNav("signIn", {
                    listObject: e,
                    listViewReference: updateItemListClick
                }); else if ("gridCart1" == _bind || "gridCart2" == _bind) {
                    if (_a[e.bindId].visible) switch (_a[_bind].productType) {
                      case "Shop":
                        if (!_a[_bind].wallpaper) if (Ti.App.Properties.getString("access_token")) {
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
                            Alloy.Globals.webServiceCall(url, requestParams, addToCartSuccessCallback, addToCartErrorCallback, "POST", $.searchListing);
                        } else Alloy.Globals.addWindowInNav("signIn", {
                            listObject: e,
                            listViewReference: updateItemListClick
                        });
                    }
                } else if ("gridWhereToBuy1" != _bind && "gridWhereToBuy2" != _bind || "Where to buy" != _a[_bind].text) {
                    if ("gridShare1" == _bind || "gridShare2" == _bind) shareImage(_a[_bind].shareUrl); else if (!isNullVal(_bind)) {
                        var CollectionData = "";
                        -1 != e.bindId.toString().lastIndexOf("1") ? e.bindId = "gridWish1" : -1 != e.bindId.toString().lastIndexOf("2") && (e.bindId = "gridWish2");
                        switch (_a[_bind].productType) {
                          case "collection":
                            CollectionData = {
                                type: "collection",
                                id: _a[_bind].collectionId
                            };
                            Alloy.Globals.addWindowInNav("productDetails", CollectionData);
                            break;

                          case "Shop":
                            if (_a[_bind].wallpaper) {
                                var pData = {
                                    Productid: _a[_bind].collectionId,
                                    block: "shop",
                                    product: "wallpaper",
                                    listObject: e,
                                    listViewReference: addToCartCallback
                                };
                                Alloy.Globals.addWindowInNav("estoreDetails", pData);
                            } else {
                                var pData = {
                                    Productid: _a[_bind].collectionId,
                                    block: "shop",
                                    product: "shopProduct",
                                    listObject: e,
                                    listViewReference: addToCartCallback
                                };
                                Alloy.Globals.addWindowInNav("estoreDetails", pData);
                            }
                            break;

                          case "Qds":
                            var pData = {
                                Productid: _a[_bind].collectionId,
                                block: "collection",
                                navigatedblockid: "",
                                listObject: e,
                                listViewReference: addToCartCallback
                            };
                            Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
                            break;

                          case "Blinds":
                            var pData = {
                                Productid: _a[_bind].collectionId,
                                block: "blinds",
                                navigatedblockid: "",
                                listObject: e,
                                listViewReference: addToCartCallback
                            };
                            Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
                        }
                    }
                } else {
                    if (!isNullVal(_a[_bind].collectionId)) {
                        var gaLeadProductArray = {};
                        gaLeadProductArray = {
                            name: _a[_bind].product_name_ga || "NA",
                            sku: _a[_bind].collectionId
                        };
                        generateLead(gaLeadProductArray, "All Collection Page");
                    }
                    Alloy.Globals.addWindowInNav("findStore");
                }
            }
        } catch (ex) {
            Ti.API.info("catch item click = " + ex.message);
        }
    });
    var shortlistData;
    var bind = "", index = "", itemSection = "";
    $.sortDetails.removeEventListener("click", sortBySelectedEffect);
    $.sortDetails.addEventListener("click", sortBySelectedEffect);
    var lastOpenView;
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
    var collectionImage1, collectionImage2, collectionId1, collectionId2, imageContainer, logoText, isSelected_0, isSelected_1, wishIconColor_0, wishIconColor_1, productType_0, productType_1, wallpaperFlag_0, wallpaperFlag_1, gridProductname1, gridProductname2, gridCart1, gridCart1, gridShare1, gridShare2, gridWhereToBuy1, gridWhereToBuy2, productSize1, productFontSize1, productSize2, productFontSize2, outOfStock1, outOfStock2, cartIconColor_0 = "transparent", cartIconColor_1 = "transparent";
    $.listView.addEventListener("marker", function() {
        page_no <= Math.ceil(totalItem / limit) && getCollectionListOnLazy(page_no, limit);
    });
    $.listView.addEventListener("scrollstart", function(e) {
        firstCount = e.firstVisibleItemIndex;
    });
    $.listView.addEventListener("scrollend", function(e) {
        if (6 >= totalItem && "gridTemplate" == activeTemplate) {
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
        } else {
            itemIndex_ = "gridTemplate" == activeTemplate ? 2 * e.firstVisibleItemIndex : e.firstVisibleItemIndex;
            secondCount = e.firstVisibleItemIndex;
            if (secondCount > firstCount) {
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
            } else if (firstCount > secondCount) {
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
            }
        }
    });
    $.filterApplyLbl.addEventListener("click", function(e) {
        hideShowView($.filterView);
        getSearchData(searchText);
    });
    $.overFlowMenuLbl.addEventListener("click", showOverFlow);
    $.overFlowView.removeEventListener("click", hideOverFlow);
    $.overFlowView.addEventListener("click", hideOverFlow);
    $.openView.addEventListener("click", hideOverFlow);
    $.refreshIcon.addEventListener("click", function(e) {
        $.filterByContainer.removeAllChildren();
        filters = {};
        setTimeout(function(e) {
            addFilterByRows(filterRawData);
        }, 300);
    });
    $.homeLbl.addEventListener("click", function() {
        Alloy.Globals.addWindowInNav("aboutUs");
    });
    $.home.addEventListener("click", function(e) {
        Alloy.Globals.popWindowInNav();
        Alloy.Globals.destroyWindowInNav();
        $.searchListing.close();
    });
    $.customerService.addEventListener("click", function(e) {
        Alloy.Globals.addWindowInNav("customerService");
    });
    $.appoinmantLbl.addEventListener("click", function(e) {
        Ti.App.Properties.getString("access_token") ? Alloy.Globals.addWindowInNav("feedBack") : Alloy.Globals.addWindowInNav("signIn");
    });
    $.return_refund.addEventListener("click", function(e) {
        Alloy.Globals.addWindowInNav("returnRefund");
    });
    $.faq.addEventListener("click", function(e) {
        Alloy.Globals.addWindowInNav("privacypolicy");
    });
    $.cartContainer.addEventListener("click", function(e) {
        if (Ti.App.Properties.getString("access_token")) {
            var quote_id = Ti.App.Properties.getString("quote_id");
            Ti.API.info("quote_id = " + quote_id);
            Alloy.Globals.addWindowInNav("myBag", quote_id);
        } else Alloy.Globals.addWindowInNav("signIn", "myBag");
    });
    __defers["$.__views.searchListing!blur!checkblurEfect"] && $.addListener($.__views.searchListing, "blur", checkblurEfect);
    __defers["$.__views.searchListing!focus!updateCount"] && $.addListener($.__views.searchListing, "focus", updateCount);
    __defers["$.__views.searchListing!android:back!goToBack"] && $.addListener($.__views.searchListing, "android:back", goToBack);
    __defers["$.__views.searchListing!open!blurText"] && $.addListener($.__views.searchListing, "open", blurText);
    __defers["$.__views.searchListing!close!destroyWindow"] && $.addListener($.__views.searchListing, "close", destroyWindow);
    __defers["$.__views.privacy!click!navigateToPrivacy"] && $.addListener($.__views.privacy, "click", navigateToPrivacy);
    __defers["$.__views.shortlist!click!Alloy.Globals.navigateToMyShorlistScreen"] && $.addListener($.__views.shortlist, "click", Alloy.Globals.navigateToMyShorlistScreen);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;