function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function scrollEffect(e) {
        isNaN(e.currentPageAsFloat * (Ti.Platform.displayCaps.platformWidth / 2 * val)) || false !== chkClicked || ($.vwToAnimate.left = e.currentPageAsFloat * (Ti.Platform.displayCaps.platformWidth / (2 * val)));
        if (0 == $.cartScroll.getCurrentPage()) {
            $.shopingBagLbl.applyProperties(style1);
            $.reviewLbl.applyProperties(style);
        } else {
            $.reviewLbl.applyProperties(style1);
            $.shopingBagLbl.applyProperties(style);
        }
    }
    function toggleLabelEffect1(e) {
        chkClicked = true;
        $.shopingBagLbl.applyProperties(style1);
        $.reviewLbl.applyProperties(style);
        $.cartScroll.scrollToView(0);
        $.vwToAnimate.animate({
            left: "0",
            duration: 200
        }, function() {
            chkClicked = false;
        });
    }
    function toggleLabelEffect2(e) {
        chkClicked = true;
        $.reviewLbl.applyProperties(style1);
        $.shopingBagLbl.applyProperties(style);
        $.cartScroll.scrollToView(1);
        $.vwToAnimate.animate({
            left: "50%",
            duration: 200
        }, function() {
            chkClicked = false;
        });
    }
    function estimateLblEffect(e) {
        $.pincodeTxt.value = "";
        $.estimateDeliveryLbl.visible = false;
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
            $.checkBtn.touchEnabled = true;
            $.checkBtn.visible = true;
            Ti.API.info("catch =" + ex.message);
        }
    }
    function estimateDeliveryErrorCallback(e) {
        $.activityIndi.hide();
        $.checkBtn.touchEnabled = true;
        $.checkBtn.visible = true;
        $.pincodeContainer.visible = false;
        $.estimateDateLbl.visible = true;
        $.estimateDateLbl.text = $.pincodeTxt.value + " - " + e.message;
        Ti.API.info("error" + JSON.stringify(e));
    }
    function estimateDateEffect(e) {
        $.estimateDateLbl.visible = false;
        $.estimateDeliveryLbl.visible = true;
    }
    function validateCartData() {
        showLoader($.myBag);
        var url = Alloy.Globals.commonUrl.getCartInfo;
        var data = {
            quoteId: args
        };
        var requestParams = JSON.stringify(data);
        Alloy.Globals.webServiceCall(url, requestParams, validateCartDataSuccess, validateCartDataError, "POST", $.myBag);
    }
    function validateCartDataSuccess(e) {
        outOfStackBagList = e.data.outofstock_flag;
        hideLoader($.myBag);
        outOfStackBagList || Alloy.Globals.addWindowInNav("addressListing");
    }
    function validateCartDataError(e) {
        outOfStackBagList = false;
        hideLoader($.myBag);
    }
    function hideOverFlowMenu(e) {
        Alloy.Globals.overFlowFlag && "overFlowMenuLbl" != e.source.id && $.header.hideOverFlow();
    }
    function displayQty() {
        for (var i = 1; 10 >= i; i++) {
            qtyContainer[i] = Ti.UI.createView({
                height: "35dp",
                top: "0dp",
                left: "0dp",
                width: Titanium.UI.FILL,
                layout: "vertical",
                id: i,
                type: "sortOption"
            });
            $.qtyDetails.add(qtyContainer[i]);
            qtyLbl[i] = Ti.UI.createLabel({
                id: "lbl" + i,
                font: {
                    fontSize: "13dp",
                    fontFamily: "futura_lt_bt_light-webfont"
                },
                color: "#e65e48",
                top: "0dp",
                left: "0dp",
                width: Titanium.UI.FILL,
                touchEnabled: false,
                text: i + " QUANTITY",
                value: i
            });
            qtyContainer[i].add(qtyLbl[i]);
        }
    }
    function qtySelectedEffect(e) {
        if ("sortOption" == e.source.type) {
            for (var i = 1; 10 >= i; i++) {
                var qtyText = qtyLbl[i].text;
                qtyLbl[i].applyProperties(qtyStyle1);
                var attr = Ti.UI.createAttributedString({
                    text: qtyText,
                    attributes: [ {
                        type: Titanium.UI.ATTRIBUTE_UNDERLINES_STYLE,
                        range: [ 0, 0 ]
                    } ]
                });
                qtyLbl[i].attributedString = attr;
            }
            e.source.children[0].applyProperties(qtyStyle);
            var text = e.source.children[0].text;
            selectedQty = text;
            var attr = Ti.UI.createAttributedString({
                text: text,
                attributes: [ {
                    type: Titanium.UI.ATTRIBUTE_UNDERLINES_STYLE,
                    range: [ 0, text.toString().length ]
                } ]
            });
            e.source.children[0].attributedString = attr;
            cartListData.bindId;
            var uIndex = cartListData.itemIndex;
            var uItemIndex = cartListData.section.items[uIndex];
            showLoader($.myBag);
            var url = Alloy.Globals.commonUrl.updateToCart;
            var quote_id = Ti.App.Properties.getString("quote_id");
            var data = {
                product_id: uItemIndex.properties.product_id,
                qty: e.source.id,
                quoteId: quote_id
            };
            var requestParams = JSON.stringify(data);
            Alloy.Globals.webServiceCall(url, requestParams, updateProductSuccessCallback, updateProductErrorCallback, "POST", $.myBag);
        }
    }
    function updateProductSuccessCallback(e) {
        try {
            if (e.data) {
                var _totalCartItem = 1 === e.data.cart_total_qty.toString().length ? "0" + e.data.cart_total_qty : e.data.cart_total_qty;
                $.shopingBagLbl.text = "SHOPPING BAG " + _totalCartItem;
                var attr1 = updateStyleAttribute($.shopingBagLbl.text, _totalCartItem);
                $.shopingBagLbl.attributedString = attr1;
                setTimeout(function() {
                    setAttributeValue(e.data.grandtotal);
                }, 500);
                var updateCartData = cartListData.section.getItemAt(cartListData.itemIndex);
                updateCartData.qtyLbl.text = e.data.qty + " Quantity";
                var price1 = e.data.product_price.split(".")[0];
                var price2 = e.data.product_price.split(".")[1];
                var text = price1 + "." + price2;
                var attr = Ti.UI.createAttributedString({
                    text: text,
                    attributes: [ {
                        type: Ti.UI.ATTRIBUTE_FONT,
                        value: {
                            fontSize: 13,
                            fontFamily: "futura_lt_bt_light-webfont"
                        },
                        range: [ text.lastIndexOf(price2 + ""), (price2 + "").length ]
                    } ]
                });
                updateCartData.totalPrice.attributedString = attr;
                cartListData.section.updateItemAt(cartListData.itemIndex, updateCartData);
                setTimeout(function() {
                    for (var i = 1; 10 >= i; i++) {
                        var qtyText = qtyLbl[i].text;
                        qtyLbl[i].applyProperties(qtyStyle1);
                        var attr = Ti.UI.createAttributedString({
                            text: qtyText,
                            attributes: [ {
                                type: Titanium.UI.ATTRIBUTE_UNDERLINES_STYLE,
                                range: [ 0, 0 ]
                            } ]
                        });
                        qtyLbl[i].attributedString = attr;
                    }
                    hideShowView($.qtyContainer);
                }, 1e3);
                hideLoader($.myBag);
                showAlert($.myBag, e.message);
                Ti.App.Properties.setString("cartCount", e.data.cart_total_qty);
                $.header.updateCartCount();
            }
        } catch (ex) {
            hideLoader($.myBag);
            Ti.API.info("catch = " + e.message);
        }
    }
    function updateProductErrorCallback(e) {
        hideLoader($.myBag);
        showAlert($.myBag, e.message);
    }
    function removeProductSuccessCallback(e) {
        if (_.size(gaShortlistProductArray) > 0) {
            googleAnalyticsShortlist(gaShortlistProductArray, "CART PAGE");
            gaShortlistProductArray = {};
        }
        $.header.init({
            title: "YOUR BAG",
            passWindow: $.myBag
        });
        $.myBag.addEventListener("android:back", goToBack);
        hideTransparentLoader($.cartScroll);
        try {
            if (e.data) {
                setAttributeValue(e.data.grandtotal);
                showAlert($.myBag, e.message);
                Ti.App.Properties.setString("cartCount", e.data.cart_total_qty);
                removeCartData.push(e.data.product_id);
                Titanium.App.Properties.setList("removeCartProductIdArray", removeCartData);
                $.header.updateCartCount();
                0 == e.data.cart_total_qty && ($.opacCartView.visible = true);
                myCart();
            }
        } catch (ex) {
            hideTransparentLoader($.cartScroll);
            Ti.API.info("catch = " + ex.message);
        }
    }
    function removeProductErrorCallback(e) {
        Ti.API.info("removeProductErrorCallback");
        $.header.init({
            title: "YOUR BAG",
            passWindow: $.myBag
        });
        $.myBag.addEventListener("android:back", goToBack);
        hideTransparentLoader($.cartScroll);
        showAlert($.myBag, e.message);
    }
    function myCart() {
        showTransparentLoader($.cartScroll);
        var quote_id = Ti.App.Properties.getString("quote_id");
        var url = Alloy.Globals.commonUrl.getCartInfo;
        var data = {
            quoteId: quote_id
        };
        var requestParams = JSON.stringify(data);
        Alloy.Globals.webServiceCall(url, requestParams, myCartSuccessCallback, myCartErrorCallback, "POST", $.myBag);
    }
    function updateData() {
        if (args.enableShortlist) {
            $.cartScroll.scrollToView(1);
            getShortlistData();
        } else myCart();
    }
    function myCartSuccessCallback(e) {
        try {
            hideTransparentLoader($.cartScroll);
            outOfStackBagList = e.data.outofstock_flag;
            Alloy.Globals.shortlistCount = e.data.summary.shortlist_item_count;
            if (0 != e.data.summary.cart_item_count) {
                $.opacCartView.visible = false;
                totalCartItem = 1 === e.data.summary.cart_item_count.toString().length ? "0" + e.data.summary.cart_item_count : e.data.summary.cart_item_count;
                var shortlistCount = 1 === e.data.summary.shortlist_item_count.toString().length ? "0" + e.data.summary.shortlist_item_count : e.data.summary.shortlist_item_count;
                setAttributeValue(e.data.summary.total);
                $.shopingBagLbl.text = "SHOPPING BAG " + totalCartItem;
                $.reviewLbl.text = "SHORTLIST " + shortlistCount;
                var attr1 = updateStyleAttribute($.shopingBagLbl.text, totalCartItem);
                $.shopingBagLbl.attributedString = attr1;
                var attr2 = updateStyleAttribute($.reviewLbl.text, shortlistCount);
                $.reviewLbl.setAttributedString(attr2);
                looping_value(e.data.items);
            } else {
                Titanium.App.Properties.setList("removeCartProductIdArray", []);
                Titanium.App.Properties.setList("cartProductIdArray", []);
                var _totalCartItem = 1 === e.data.summary.cart_item_count.toString().length ? "0" + e.data.summary.cart_item_count : e.data.summary.cart_item_count;
                var shortlistCount = 1 === e.data.summary.shortlist_item_count.toString().length ? "0" + e.data.summary.shortlist_item_count : e.data.summary.shortlist_item_count;
                $.shopingBagLbl.text = "SHOPPING BAG " + _totalCartItem;
                $.reviewLbl.text = "SHORTLIST " + shortlistCount;
                var attr1 = updateStyleAttribute($.shopingBagLbl.text, _totalCartItem);
                $.shopingBagLbl.attributedString = attr1;
                var attr2 = updateStyleAttribute($.reviewLbl.text, shortlistCount);
                $.reviewLbl.setAttributedString(attr2);
                $.opacCartView.visible = true;
            }
        } catch (ex) {
            Ti.API.info("catch= " + ex.message);
            hideTransparentLoader($.cartScroll);
        }
    }
    function myCartErrorCallback(e) {
        hideTransparentLoader($.cartScroll);
        $.opacCartView.visible = true;
    }
    function setAttributeValue(text_) {
        Ti.API.info("call attribute");
        var price1 = text_.split(".")[0];
        var price2 = text_.split(".")[1];
        var text = price1 + "." + price2;
        var attr = Ti.UI.createAttributedString({
            text: text,
            attributes: [ {
                type: Ti.UI.ATTRIBUTE_FONT,
                value: {
                    fontSize: 18,
                    fontFamily: "futura_lt_bt_light-webfont"
                },
                range: [ text.lastIndexOf(price2 + ""), (price2 + "").length ]
            } ]
        });
        $.amountLbl.attributedString = attr;
    }
    function looping_value(data) {
        listData = [];
        $.mainSection.setItems(listData);
        var template = "cartTemplate";
        var cartProductId = [];
        _.each(data, function(value, k) {
            cartProductId.push(value.product_id);
            var price1 = value.total_price.split(".")[0];
            var price2 = value.total_price.split(".")[1];
            var text = price1 + "." + price2;
            var attr = Ti.UI.createAttributedString({
                text: text,
                attributes: [ {
                    type: Ti.UI.ATTRIBUTE_FONT,
                    value: {
                        fontSize: 13,
                        fontFamily: "futura_lt_bt_light-webfont"
                    },
                    range: [ text.lastIndexOf(price2 + ""), (price2 + "").length ]
                } ]
            });
            listData.push({
                properties: {
                    product_sku: value.product_sku,
                    product_id: value.product_id,
                    product_name: value.name,
                    checkBlinds: value.blindsFlag,
                    lost_sale: !value.is_instock
                },
                template: template,
                cartImage: {
                    image: encodeURI(value.thumbnail)
                },
                productName: {
                    text: isNullVal(value.name) ? value.name : value.name.toUpperCase()
                },
                productSize: {
                    text: value.size,
                    font: {
                        fontSize: "" == value.size ? "0" : "8"
                    }
                },
                price: {
                    text: value.price
                },
                colorImage: {
                    image: encodeURI(value.color)
                },
                qtyLbl: {
                    text: value.qty
                },
                totalPrice: {
                    attributedString: attr
                },
                notifyLbl: {
                    text: ""
                },
                opacBlurLbl: {
                    backgroundColor: value.is_instock ? "transparent" : "#a6ffffff"
                },
                opacLbl: {
                    backgroundColor: value.is_instock ? "transparent" : "#a6000000",
                    text: value.is_instock ? "" : "OUT OF STOCK"
                },
                qtyContainer: {
                    touchEnabled: !value.blindsFlag
                },
                dropDownIcon: {
                    text: value.blindsFlag ? "" : Alloy.Globals.icon.expandFill
                }
            });
        });
        $.mainSection.appendItems(listData);
        Titanium.App.Properties.setList("cartProductIdArray", cartProductId);
    }
    function getShortlistData() {
        page_no = 1;
        if ("1" == $.cartScroll.getCurrentPage()) {
            showTransparentLoader($.cartScroll);
            var url = Alloy.Globals.commonUrl.getShortlist;
            var data = {
                page_size: page_size,
                page_no: page_no,
                filter: "All"
            };
            var requestParams = JSON.stringify(data);
            Alloy.Globals.webServiceCall(url, requestParams, getShortlistDataSuccessCallback, getShortlistDataErrorCallback, "POST", $.myBag);
        } else myCart();
    }
    function getShortlistDataSuccessCallback(e) {
        try {
            Alloy.Globals.shortlistCount = e.data.new_count;
            hideTransparentLoader($.cartScroll);
            listData = [];
            $.shortListSection.setItems(listData);
            if (e.data.new_count > 0) {
                $.shortlistOpacCartView.visible = false;
                totalItem = e.data.new_count;
                var shortlistCount = 1 === totalItem.toString().length ? "0" + totalItem : totalItem;
                var _totalCartItem = 1 === e.data.cart_count.toString().length ? "0" + e.data.cart_count : e.data.cart_count;
                $.shopingBagLbl.text = "SHOPPING BAG " + _totalCartItem;
                $.reviewLbl.text = "SHORTLIST " + shortlistCount;
                var attr1 = updateStyleAttribute($.shopingBagLbl.text, _totalCartItem);
                $.shopingBagLbl.attributedString = attr1;
                var attr2 = updateStyleAttribute($.reviewLbl.text, shortlistCount);
                $.reviewLbl.setAttributedString(attr2);
                shortlistLooping(e.data.product);
            } else {
                var _totalCartItem = 1 === e.data.cart_count.toString().length ? "0" + e.data.cart_count : e.data.cart_count;
                var shortlistCount = 1 === e.data.new_count.toString().length ? "0" + e.data.new_count : e.data.new_count;
                $.shopingBagLbl.text = "SHOPPING BAG " + _totalCartItem;
                $.reviewLbl.text = "SHORTLIST " + shortlistCount;
                var attr1 = updateStyleAttribute($.shopingBagLbl.text, _totalCartItem);
                $.shopingBagLbl.attributedString = attr1;
                var attr2 = updateStyleAttribute($.reviewLbl.text, shortlistCount);
                $.reviewLbl.setAttributedString(attr2);
                $.shortlistOpacCartView.visible = true;
            }
        } catch (ex) {
            hideTransparentLoader($.cartScroll);
            Ti.API.info("catch = " + ex.message);
        }
    }
    function getShortlistDataErrorCallback(e) {
        hideTransparentLoader($.cartScroll);
        showAlert($.myBag, e.message);
        $.shortlistOpacCartView.visible = true;
    }
    function shortlistLooping(data) {
        listData = [];
        var template = "shortlistTemplate";
        _.each(data, function(value, k) {
            var splitValue = value.price.split(".");
            switch (splitValue.length) {
              case 1:
                var text = value.price;
                var attr = Ti.UI.createAttributedString({
                    text: text,
                    attributes: [ {
                        type: Ti.UI.ATTRIBUTE_FONT,
                        value: {
                            fontSize: 13,
                            fontFamily: "futura_lt_bt_light-webfont"
                        },
                        range: [ text.lastIndexOf(price1 + ""), (price1 + "").length ]
                    } ]
                });
                break;

              case 2:
                var price1 = splitValue[0];
                var price2 = splitValue[1];
                var text = price1 + "." + price2;
                var attr = Ti.UI.createAttributedString({
                    text: text,
                    attributes: [ {
                        type: Ti.UI.ATTRIBUTE_FONT,
                        value: {
                            fontSize: 13,
                            fontFamily: "futura_lt_bt_light-webfont"
                        },
                        range: [ text.lastIndexOf(price2 + ""), (price2 + "").length ]
                    } ]
                });
                break;

              case 3:
                var price1 = "" + splitValue[0];
                var price2 = "" + splitValue[1];
                var price3 = "" + splitValue[2];
                var text = price1 + "." + price2 + "." + price3;
                var text2 = "" + price2 + "." + price3;
                var attr = Ti.UI.createAttributedString({
                    text: text,
                    attributes: [ {
                        type: Ti.UI.ATTRIBUTE_FONT,
                        value: {
                            fontSize: 13,
                            fontFamily: "futura_lt_bt_light-webfont"
                        },
                        range: [ text.indexOf(text2 + ""), (text2 + "").length ]
                    } ]
                });
                break;

              case 4:
                var price1 = "" + splitValue[0];
                var price2 = "" + splitValue[1];
                var price3 = "" + splitValue[2];
                var price4 = "" + splitValue[3];
                var text = price1 + "." + price2 + "." + price3 + "." + price4;
                var text2 = "" + price2 + "." + price3 + "." + price4;
                var attr = Ti.UI.createAttributedString({
                    text: text,
                    attributes: [ {
                        type: Ti.UI.ATTRIBUTE_FONT,
                        value: {
                            fontSize: 13,
                            fontFamily: "futura_lt_bt_light-webfont"
                        },
                        range: [ text.indexOf(text2 + ""), (text2 + "").length ]
                    } ]
                });
            }
            listData.push({
                properties: {
                    product_id: value.product_id,
                    product_name: value.name,
                    product_sku: value.sku,
                    attributeName: value.attributesetname,
                    checkWallpaper: value.is_wallpaper
                },
                template: template,
                cartImage: {
                    image: encodeURI(value.image)
                },
                productName: {
                    text: isNullVal(value.name) ? value.name : value.name.toUpperCase()
                },
                productSize: {
                    text: value.size,
                    font: {
                        fontSize: "" == value.size ? "0" : "8"
                    }
                },
                colorImage: {
                    image: encodeURI(value.color_url)
                },
                qtyLbl: {
                    text: ""
                },
                totalPrice: {
                    attributedString: attr
                },
                cartWish: {
                    text: "Shop" === value.attributesetname ? value.is_wallpaper ? Alloy.Globals.icon.storeLocator : value.is_in_stock ? Alloy.Globals.icon.bag : "" : Alloy.Globals.icon.storeLocator,
                    touchEnabled: "Shop" === value.attributesetname ? !!value.is_in_stock : true,
                    value: "Shop" === value.attributesetname ? "shop" : "qds",
                    status: "Shop" === value.attributesetname ? value.is_in_stock ? "inStock" : "outOfStock" : ""
                },
                notifyLbl: {
                    text: value.is_in_stock || "Shop" !== value.attributesetname ? "" : "You will be notified when product is back in stock" == value.stock_notification ? Alloy.Globals.icon.notifyMe : "Notify me when in stock",
                    font: {
                        fontFamily: value.is_in_stock || "Shop" !== value.attributesetname ? "" : "You will be notified when product is back in stock" == value.stock_notification ? "icomoon" : "futura_lt_bt_light-webfont"
                    },
                    value: "Shop" === value.attributesetname ? "shop" : "qds",
                    status: "Shop" === value.attributesetname ? value.is_in_stock ? "inStock" : "outOfStock" : ""
                },
                opacBlurLbl: {
                    backgroundColor: value.is_in_stock || "Shop" !== value.attributesetname ? "transparent" : "#a6ffffff"
                },
                opacLbl: {
                    backgroundColor: value.is_in_stock || "Shop" !== value.attributesetname ? "transparent" : "#a6000000",
                    text: value.is_in_stock || "Shop" !== value.attributesetname ? "" : "OUT OF STOCK"
                }
            });
        });
        page_no++;
        if (page_no <= Math.ceil(totalItem / page_size + 1)) {
            $.shortListSection.appendItems(listData);
            $.activityInd.hide();
        }
        page_no <= Math.ceil(totalItem / page_size) && $.shortList.setMarker({
            sectionIndex: 0,
            itemIndex: 10 * (page_no - 1) - 1
        });
    }
    function getshortListOnLazy(page_no, page_size) {
        $.activityInd.show();
        var url = Alloy.Globals.commonUrl.getShortlist;
        var data = {
            page_size: page_size,
            page_no: page_no,
            filter: "All"
        };
        var requestParams = JSON.stringify(data);
        Alloy.Globals.webServiceCall(url, requestParams, getShortlistLazyDataSuccessCallback, getShortlistDataErrorCallback, "POST", $.myBag);
    }
    function getShortlistLazyDataSuccessCallback(e) {
        try {
            hideTransparentLoader($.cartScroll);
            if (e.data.new_count > 0) {
                $.shortlistOpacCartView.visible = false;
                totalItem = e.data.new_count;
                var _totalCartItem = 1 === e.data.cart_count.toString().length ? "0" + e.data.cart_count : e.data.cart_count;
                var shortlistCount = 1 === totalItem.toString().length ? "0" + totalItem : totalItem;
                $.shopingBagLbl.text = "SHOPPING BAG " + _totalCartItem;
                $.reviewLbl.text = "SHORTLIST " + shortlistCount;
                var attr1 = updateStyleAttribute($.shopingBagLbl.text, _totalCartItem);
                $.shopingBagLbl.attributedString = attr1;
                var attr2 = updateStyleAttribute($.reviewLbl.text, shortlistCount);
                $.reviewLbl.setAttributedString(attr2);
                shortlistLooping(e.data.product);
            } else {
                var _totalCartItem = 1 === e.data.cart_count.toString().length ? "0" + e.data.cart_count : e.data.cart_count;
                var shortlistCount = 1 === e.data.new_count.toString().length ? "0" + e.data.new_count : e.data.new_count;
                $.shopingBagLbl.text = "SHOPPING BAG " + _totalCartItem;
                $.reviewLbl.text = "SHORTLIST " + shortlistCount;
                var attr1 = updateStyleAttribute($.shopingBagLbl.text, _totalCartItem);
                $.shopingBagLbl.attributedString = attr1;
                var attr2 = updateStyleAttribute($.reviewLbl.text, shortlistCount);
                $.reviewLbl.setAttributedString(attr2);
                $.shortlistOpacCartView.visible = true;
            }
        } catch (ex) {
            hideTransparentLoader($.cartScroll);
            Ti.API.info("catch = " + ex.message);
        }
    }
    function navigateToProductDetails(shortlist_index, shortlist_itemSection) {
        switch (shortlist_itemSection.properties.attributeName) {
          case "Shop":
            var shopData = {
                Productid: shortlist_itemSection.properties.product_id,
                block: "shop",
                product: "shopProduct"
            };
            shortlist_itemSection.properties.checkWallpaper && (shopData.product = "wallpaper");
            Alloy.Globals.addWindowInNav("estoreDetails", shopData);
            break;

          case "Qds":
            var pData = {
                Productid: shortlist_itemSection.properties.product_id,
                block: "collection",
                navigatedblockid: ""
            };
            Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
            break;

          case "Blinds":
            var pData = {
                Productid: shortlist_itemSection.properties.product_id,
                block: "blinds",
                navigatedblockid: "",
                type: "blinds"
            };
            Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
        }
    }
    function notifySuccessCallback(e) {
        try {
            hideTransparentLoader($.cartScroll);
            getShortlistData();
        } catch (ex) {
            hideTransparentLoader($.cartScroll);
            Ti.API.info("catch = " + ex.message);
        }
    }
    function notifyErrorCallback(e) {
        hideTransparentLoader($.cartScroll);
    }
    function removeShortlistProductSuccessCallback(e) {
        $.header.init({
            title: "YOUR BAG",
            passWindow: $.myBag
        });
        $.myBag.addEventListener("android:back", goToBack);
        try {
            if (!isNullVal(e.data)) {
                page_no = "1";
                if (0 == e.data.new_count) {
                    $.shortlistOpacCartView.visible = true;
                    Alloy.Globals.shortlistCount = 0;
                }
                getShortlistData();
                showAlert($.myBag, e.message);
                Ti.App.Properties.setString("cartCount", e.data[0].cart_count);
                $.header.updateCartCount();
                var cartDataArray = [];
                cartDataArray = Titanium.App.Properties.getList("cartProductIdArray");
                -1 == cartDataArray.indexOf(e.data[0].product_id) && cartDataArray.push(e.data[0].product_id);
                Titanium.App.Properties.setList("cartProductIdArray", cartDataArray);
            }
            void 0 != gaBagProduct && googleAnalyticsBag(gaShortlistProduct);
        } catch (ex) {
            Ti.API.info("catch = " + ex.message);
        }
        hideTransparentLoader();
        hideLoader();
        hideFullLoader();
    }
    function removeShortlistProductErrorCallback(e) {
        showAlert($.myBag, e.message);
        $.shortlistOpacCartView.visible = true;
        $.header.init({
            title: "YOUR BAG",
            passWindow: $.myBag
        });
        $.myBag.addEventListener("android:back", goToBack);
        hideTransparentLoader();
        hideLoader();
        hideFullLoader();
    }
    function navigateToAllCollection() {
        Alloy.Globals.addWindowInNav("allCollections");
    }
    function navigateToshop(e) {
        Alloy.Globals.addWindowInNav("eshop");
    }
    function goToBack() {
        $.cartScroll.removeEventListener("scrollend", getShortlistData);
        $.reviewLbl.removeEventListener("click", toggleLabelEffect2);
        $.cartScroll.removeEventListener("scroll", scrollEffect);
        $.shopingBagLbl.removeEventListener("click", toggleLabelEffect1);
        $.estimateDeliveryLbl.removeEventListener("click", estimateLblEffect);
        $.estimateDateLbl.removeEventListener("click", estimateDateEffect);
        $.myBag.removeEventListener("click", hideOverFlowMenu);
        $.qtyDetails.removeEventListener("click", qtySelectedEffect);
        $.continueShoppingLbl.removeEventListener("click", navigateToshop);
        $.visitOurStore.removeEventListener("click", navigateToshop);
        $.shortListContinueShoppingLbl.removeEventListener("click", navigateToshop);
        Alloy.Globals.popWindowInNav();
        $.myBag.close();
    }
    function destroyWindow(e) {
        Alloy.Globals.popWindowInNav();
        $.removeListener();
        $.myBag.remove($.filterContainer);
        $.myBag.remove($.vwToAnimate);
        $.myBag.remove($.cartScroll);
        $.myBag.remove($.qtyContainer);
        $.filterContainer.removeAllChildren();
        $.vwToAnimate.removeAllChildren();
        $.cartScroll.removeAllChildren();
        $.qtyContainer.removeAllChildren();
        args = {};
        page_size = null;
        page_no = null;
        totalItem = null;
        qtyContainer = [];
        qtyLbl = [];
        selectedQty = null;
        cartListData = null;
        listData = [];
        totalCartItem = null;
        shortlist_bind = null;
        shortlist_index = null;
        shortlist_itemSection = null;
        bind = null;
        index = null;
        itemSection = null;
        outOfStackBagList = null;
        gaShortlistProduct = {};
        $.destroy();
    }
    function updateStyleAttribute(textTitle, count) {
        var count = count.toString();
        var attr = Ti.UI.createAttributedString({
            text: textTitle,
            attributes: [ {
                type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
                value: "#fff",
                range: [ textTitle.indexOf(count), count.length ]
            } ]
        });
        return attr;
    }
    function removeAllShortlist() {
        var requestMethod = Alloy.Globals.commonUrl.removeAllShortlist;
        $.myBag.add(Alloy.createController("confirmation", {
            requestMethod: requestMethod,
            requestParam: {},
            successCallback: removeShortlistAllSuccessCallback,
            errorCallback: removeShortlistAllErrorCallback,
            windowContainer: $.myBag,
            message: "Are you sure you want to delete all shortlisted products ?",
            productName: "",
            showLoader: showTransparentLoader
        }).getView());
    }
    function removeShortlistAllSuccessCallback(response) {
        Alloy.Globals.shortlistCount = 0;
        getShortlistData();
        showAlert($.myBag, response.message);
        $.header.updateCartCount();
        hideTransparentLoader();
    }
    function removeShortlistAllErrorCallback(response) {
        hideTransparentLoader();
        showAlert($.myBag, response.message);
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "myBag";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.myBag = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        backgroundColor: "#ffffff",
        id: "myBag"
    });
    $.__views.myBag && $.addTopLevelView($.__views.myBag);
    updateData ? $.addListener($.__views.myBag, "focus", updateData) : __defers["$.__views.myBag!focus!updateData"] = true;
    goToBack ? $.addListener($.__views.myBag, "android:back", goToBack) : __defers["$.__views.myBag!android:back!goToBack"] = true;
    destroyWindow ? $.addListener($.__views.myBag, "close", destroyWindow) : __defers["$.__views.myBag!close!destroyWindow"] = true;
    $.__views.header = Alloy.createWidget("headerView", "widget", {
        id: "header",
        __parentSymbol: $.__views.myBag
    });
    $.__views.header.setParent($.__views.myBag);
    $.__views.filterContainer = Ti.UI.createView({
        top: "53dp",
        backgroundColor: "#231f20",
        width: Titanium.UI.FILL,
        height: "40dp",
        id: "filterContainer"
    });
    $.__views.myBag.add($.__views.filterContainer);
    $.__views.shopingBagLbl = Ti.UI.createLabel({
        font: {
            fontSize: "10sp"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        height: Titanium.UI.FILL,
        width: "48%",
        left: "0dp",
        text: "SHOPPING BAG",
        id: "shopingBagLbl"
    });
    $.__views.filterContainer.add($.__views.shopingBagLbl);
    $.__views.__alloyId941 = Ti.UI.createLabel({
        font: {
            fontSize: "12sp"
        },
        color: "#a6ffffff",
        text: "|",
        id: "__alloyId941"
    });
    $.__views.filterContainer.add($.__views.__alloyId941);
    $.__views.reviewLbl = Ti.UI.createLabel({
        font: {
            fontSize: "10sp"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        height: Titanium.UI.FILL,
        width: "48%",
        right: "0dp",
        text: "SHORTLIST",
        id: "reviewLbl"
    });
    $.__views.filterContainer.add($.__views.reviewLbl);
    $.__views.vwToAnimate = Ti.UI.createView({
        top: "90dp",
        width: "50%",
        height: "2dp",
        left: "0dp",
        backgroundColor: "#e65e48",
        id: "vwToAnimate"
    });
    $.__views.myBag.add($.__views.vwToAnimate);
    var __alloyId942 = [];
    $.__views.cartPage = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        id: "cartPage"
    });
    __alloyId942.push($.__views.cartPage);
    $.__views.opacCartView = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        top: "0dp",
        zIndex: "100",
        visible: false,
        backgroundColor: "#FFFFFF",
        id: "opacCartView"
    });
    $.__views.cartPage.add($.__views.opacCartView);
    $.__views.__alloyId943 = Ti.UI.createLabel({
        font: {
            fontSize: "15dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#4d000000",
        text: "YOUR BAG IS EMPTY",
        id: "__alloyId943"
    });
    $.__views.opacCartView.add($.__views.__alloyId943);
    $.__views.visitOurStore = Ti.UI.createLabel({
        bottom: "30dp",
        width: "80%",
        height: "40dp",
        color: "#ffffff",
        backgroundColor: "#4d000000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "VISIT OUR ESTORE",
        id: "visitOurStore"
    });
    $.__views.opacCartView.add($.__views.visitOurStore);
    var __alloyId951 = {};
    Alloy.createController("listTemplate", {
        __parentSymbol: __parentSymbol,
        __itemTemplate: __alloyId951
    });
    $.__views.mainSection = Ti.UI.createListSection({
        id: "mainSection"
    });
    var __alloyId954 = [];
    __alloyId954.push($.__views.mainSection);
    $.__views.cartList = Ti.UI.createListView({
        top: "0dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        bottom: "150dp",
        sections: __alloyId954,
        templates: __alloyId951,
        id: "cartList"
    });
    $.__views.cartPage.add($.__views.cartList);
    $.__views.__alloyId955 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        bottom: "0dp",
        layout: "vertical",
        borderColor: "transparent",
        borderWidth: "0.0",
        backgroundColor: "#ffffff",
        id: "__alloyId955"
    });
    $.__views.cartPage.add($.__views.__alloyId955);
    $.__views.__alloyId956 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        bottom: "0dp",
        backgroundColor: "#e6e6e6",
        height: "1dp",
        id: "__alloyId956"
    });
    $.__views.__alloyId955.add($.__views.__alloyId956);
    $.__views.__alloyId957 = Ti.UI.createView({
        left: "15dp",
        bottom: "0dp",
        height: Titanium.UI.SIZE,
        id: "__alloyId957"
    });
    $.__views.__alloyId955.add($.__views.__alloyId957);
    $.__views.estimateDeliveryLbl = Ti.UI.createLabel({
        left: "0dp",
        font: {
            fontSize: "12sp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#e65e48",
        text: "Estimated delivery",
        id: "estimateDeliveryLbl"
    });
    $.__views.__alloyId957.add($.__views.estimateDeliveryLbl);
    $.__views.pincodeContainer = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: "0dp",
        visible: false,
        id: "pincodeContainer"
    });
    $.__views.__alloyId957.add($.__views.pincodeContainer);
    $.__views.pincodeTxt = Ti.UI.createTextField({
        width: "100dp",
        height: Titanium.UI.FILL,
        left: "0dp",
        font: {
            fontSize: "10sp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#333333",
        hintText: "Enter Pincode",
        hintTextColor: "#333333",
        keyboardType: Titanium.UI.KEYBOARD_PHONE_PAD,
        id: "pincodeTxt",
        type: "TextField"
    });
    $.__views.pincodeContainer.add($.__views.pincodeTxt);
    $.__views.checkBtn = Ti.UI.createLabel({
        width: "55dp",
        height: "25dp",
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
        left: "0dp",
        font: {
            fontSize: "12sp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        visible: false,
        text: "400077 - 12 Jan,2016",
        color: "#555555",
        id: "estimateDateLbl"
    });
    $.__views.__alloyId957.add($.__views.estimateDateLbl);
    $.__views.__alloyId958 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        bottom: "0dp",
        backgroundColor: "#e6e6e6",
        height: "1dp",
        id: "__alloyId958"
    });
    $.__views.__alloyId955.add($.__views.__alloyId958);
    $.__views.totalDisplayContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: "50dp",
        bottom: "0dp",
        backgroundColor: "#ffffff",
        id: "totalDisplayContainer"
    });
    $.__views.__alloyId955.add($.__views.totalDisplayContainer);
    $.__views.totalLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "18sp"
        },
        color: "#7e7d7d",
        left: "20dp",
        text: "TOTAL",
        id: "totalLbl"
    });
    $.__views.totalDisplayContainer.add($.__views.totalLbl);
    $.__views.__alloyId959 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        right: 20,
        id: "__alloyId959"
    });
    $.__views.totalDisplayContainer.add($.__views.__alloyId959);
    $.__views.rupies = Ti.UI.createLabel({
        font: {
            fontSize: "11dp",
            fontFamily: "icomoon"
        },
        color: "#e65e48",
        text: Alloy.Globals.icon.currency,
        left: "0dp",
        top: "2dp",
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
        id: "rupies"
    });
    $.__views.__alloyId959.add($.__views.rupies);
    $.__views.amountLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "futura-hv-bt-heavy",
            fontSize: "18dp"
        },
        color: "#e65e48",
        left: "10dp",
        id: "amountLbl"
    });
    $.__views.__alloyId959.add($.__views.amountLbl);
    $.__views.__alloyId960 = Ti.UI.createView({
        id: "__alloyId960"
    });
    $.__views.__alloyId955.add($.__views.__alloyId960);
    $.__views.continueShoppingLbl = Ti.UI.createLabel({
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
        text: "CONTINUE SHOPPING",
        id: "continueShoppingLbl"
    });
    $.__views.__alloyId960.add($.__views.continueShoppingLbl);
    $.__views.checkoutLbl = Ti.UI.createLabel({
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
        text: "CHECKOUT",
        id: "checkoutLbl"
    });
    $.__views.__alloyId960.add($.__views.checkoutLbl);
    $.__views.shortlistPage = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        id: "shortlistPage"
    });
    __alloyId942.push($.__views.shortlistPage);
    $.__views.shortlistOpacCartView = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        top: "0dp",
        zIndex: "100",
        visible: false,
        backgroundColor: "#FFFFFF",
        id: "shortlistOpacCartView"
    });
    $.__views.shortlistPage.add($.__views.shortlistOpacCartView);
    $.__views.__alloyId961 = Ti.UI.createLabel({
        font: {
            fontSize: "15dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#4d000000",
        text: "YOU HAVE NO SHORTLISTED PRODUCTS",
        id: "__alloyId961"
    });
    $.__views.shortlistOpacCartView.add($.__views.__alloyId961);
    $.__views.shortlist_visitOurStore = Ti.UI.createLabel({
        bottom: "30dp",
        width: "80%",
        height: "40dp",
        color: "#ffffff",
        backgroundColor: "#4d000000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "VISIT OUR RANGE",
        id: "shortlist_visitOurStore"
    });
    $.__views.shortlistOpacCartView.add($.__views.shortlist_visitOurStore);
    $.__views.footerView = Ti.UI.createView({
        id: "footerView",
        height: "40dp"
    });
    $.__views.activityInd = Ti.UI.createActivityIndicator({
        id: "activityInd"
    });
    $.__views.footerView.add($.__views.activityInd);
    var __alloyId970 = {};
    Alloy.createController("listTemplate", {
        __parentSymbol: __parentSymbol,
        __itemTemplate: __alloyId970
    });
    $.__views.shortListSection = Ti.UI.createListSection({
        id: "shortListSection"
    });
    var __alloyId973 = [];
    __alloyId973.push($.__views.shortListSection);
    $.__views.shortList = Ti.UI.createListView({
        top: "0dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        bottom: "50dp",
        sections: __alloyId973,
        templates: __alloyId970,
        footerView: $.__views.footerView,
        id: "shortList"
    });
    $.__views.shortlistPage.add($.__views.shortList);
    $.__views.__alloyId974 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        bottom: 0,
        id: "__alloyId974"
    });
    $.__views.shortlistPage.add($.__views.__alloyId974);
    $.__views.shortListContinueShoppingLbl = Ti.UI.createLabel({
        height: "40dp",
        bottom: "0dp",
        font: {
            fontSize: "10dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#b0b0b0",
        left: "0",
        width: "50%",
        text: "CONTINUE SHOPPING",
        id: "shortListContinueShoppingLbl"
    });
    $.__views.__alloyId974.add($.__views.shortListContinueShoppingLbl);
    $.__views.shortListRemoveAll = Ti.UI.createLabel({
        height: "40dp",
        bottom: "0dp",
        font: {
            fontSize: "10dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#e65e48",
        right: "0",
        width: "50%",
        text: "REMOVE ALL",
        id: "shortListRemoveAll"
    });
    $.__views.__alloyId974.add($.__views.shortListRemoveAll);
    removeAllShortlist ? $.addListener($.__views.shortListRemoveAll, "click", removeAllShortlist) : __defers["$.__views.shortListRemoveAll!click!removeAllShortlist"] = true;
    $.__views.cartScroll = Ti.UI.createScrollableView({
        top: "93dp",
        views: __alloyId942,
        id: "cartScroll",
        scrollingEnabled: false
    });
    $.__views.myBag.add($.__views.cartScroll);
    $.__views.qtyContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        visible: false,
        layout: "vertical",
        backgroundColor: "#231f20",
        id: "qtyContainer"
    });
    $.__views.myBag.add($.__views.qtyContainer);
    $.__views.__alloyId975 = Ti.UI.createView({
        top: "0dp",
        width: Titanium.UI.FILL,
        height: "53dp",
        id: "__alloyId975"
    });
    $.__views.qtyContainer.add($.__views.__alloyId975);
    $.__views.__alloyId976 = Ti.UI.createLabel({
        left: "15dp",
        height: Titanium.UI.FILL,
        font: {
            fontSize: "15dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        text: "SELECT QUANTITY",
        id: "__alloyId976"
    });
    $.__views.__alloyId975.add($.__views.__alloyId976);
    $.__views.qtyCloseLbl = Ti.UI.createLabel({
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
        id: "qtyCloseLbl"
    });
    $.__views.__alloyId975.add($.__views.qtyCloseLbl);
    $.__views.qtyDetails = Ti.UI.createScrollView({
        top: "15dp",
        width: Titanium.UI.FILL,
        right: "15dp",
        left: "15dp",
        height: Titanium.UI.FILL,
        layout: "vertical",
        bottom: "75dp",
        id: "qtyDetails"
    });
    $.__views.qtyContainer.add($.__views.qtyDetails);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var page_size = 10;
    var page_no = 1;
    var totalItem = "";
    $.header.getView("cartContainer").setVisible(false);
    $.header.getView("searchLbl").setVisible(false);
    $.header.getView("overFlowMenuLbl").setVisible(false);
    var qtyContainer = [];
    var removeCartData = [];
    var qtyLbl = [];
    var selectedQty = "";
    var cartListData = "";
    var listData = [];
    var totalCartItem = "";
    var shortlist_bind = "", shortlist_index = "", shortlist_itemSection = "";
    var bind, index, itemSection;
    var outOfStackBagList = false;
    var gaShortlistProduct = {};
    var gaBagProduct = "";
    var gaShortlistProductArray = {};
    touchEffect.createTouchEffect($.shopingBagLbl, "#a6e65e48", "#e65e48");
    touchEffect.createTouchEffect($.reviewLbl, "#a6e65e48", "#e65e48");
    touchEffect.createTouchEffect($.continueShoppingLbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.checkoutLbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.shortListContinueShoppingLbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.qtyCloseLbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.checkBtn, "#a67F7F7F", "#7F7F7F");
    touchEffect.createTouchEffect($.visitOurStore, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.shortlist_visitOurStore, "#a6ffffff", "#ffffff");
    $.header.init({
        title: "YOUR BAG",
        passWindow: $.myBag
    });
    $.myBag.addEventListener("click", function(e) {
        "TextField" != e.source.type && $.pincodeTxt.blur();
    });
    $.continueShoppingLbl.width = Alloy.Globals.platformWidth / 2;
    $.checkoutLbl.width = Alloy.Globals.platformWidth / 2;
    var style1 = $.createStyle({
        font: {
            fontSize: "10",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#e65e48"
    });
    var style = $.createStyle({
        font: {
            fontSize: "10sp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff"
    });
    var qtyStyle = $.createStyle({
        font: {
            fontWeight: "bold",
            fontSize: "13dp"
        }
    });
    var qtyStyle1 = $.createStyle({
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "13dp"
        }
    });
    var val = reverseXhdpi();
    var chkClicked = false;
    $.cartScroll.addEventListener("scroll", scrollEffect);
    $.shopingBagLbl.addEventListener("click", toggleLabelEffect1);
    $.reviewLbl.addEventListener("click", toggleLabelEffect2);
    $.estimateDeliveryLbl.addEventListener("click", estimateLblEffect);
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
            Alloy.Globals.webServiceCall(url, requestParams, estimateDeliverySuccessCallback, estimateDeliveryErrorCallback, "POST", $.myBag);
        } else showAlert($.myBag, "Please enter valid 6-digit pincode");
    });
    $.estimateDateLbl.addEventListener("click", estimateDateEffect);
    $.checkoutLbl.addEventListener("click", function(e) {
        outOfStackBagList ? showAlert($.myBag, "Your cart contains out of stock product") : validateCartData();
    });
    $.myBag.addEventListener("click", hideOverFlowMenu);
    displayQty();
    $.qtyDetails.addEventListener("click", qtySelectedEffect);
    $.qtyCloseLbl.addEventListener("click", function(e) {
        hideShowView($.qtyContainer);
    });
    $.cartList.addEventListener("itemclick", function(e) {
        bind = "", index = "", itemSection = "";
        cartListData = e;
        if (!isNullVal(e.bindId)) {
            bind = e.bindId;
            index = e.itemIndex;
            itemSection = e.section.items[index];
        }
        switch (e.bindId) {
          case "qtyContainer":
            itemSection[bind].touchEnabled && hideShowView($.qtyContainer);
            break;

          case "cartDelete":
            $.header.init({
                title: "YOUR BAG"
            });
            $.myBag.removeEventListener("android:back", goToBack);
            var url = Alloy.Globals.commonUrl.removeFromCart;
            var quote_id = Ti.App.Properties.getString("quote_id");
            var data = {
                product_id: itemSection.properties.product_id,
                quoteId: quote_id
            };
            var requestParams = JSON.stringify(data);
            $.myBag.add(Alloy.createController("confirmation", {
                requestMethod: url,
                requestParam: requestParams,
                successCallback: removeProductSuccessCallback,
                errorCallback: removeProductErrorCallback,
                windowContainer: $.myBag,
                message: "Are you sure you want to delete the product ?",
                productName: itemSection.properties.product_name,
                showLoader: showTransparentLoader
            }).getView());
            break;

          case "cartWish":
            showTransparentLoader($.cartScroll);
            var url = Alloy.Globals.commonUrl.AddtoShortlistFromCart;
            var quote_id = Ti.App.Properties.getString("quote_id");
            gaShortlistProductArray = {
                name: itemSection.properties.product_name,
                sku: itemSection.properties.product_sku,
                lostSale: itemSection.properties.lost_sale
            };
            var data = {
                product_id: itemSection.properties.product_id,
                quoteId: quote_id
            };
            var requestParams = JSON.stringify(data);
            Alloy.Globals.webServiceCall(url, requestParams, removeProductSuccessCallback, removeProductErrorCallback, "POST", $.myBag);
            break;

          default:
            index = e.itemIndex;
            itemSection = e.section.items[index];
            if (itemSection.properties.checkBlinds) {
                var pData = {
                    Productid: itemSection.properties.product_id,
                    block: "blinds",
                    navigatedblockid: "",
                    type: "blinds"
                };
                Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
            } else {
                var pData = {
                    Productid: itemSection.properties.product_id,
                    block: "shop",
                    product: "shopProduct"
                };
                Alloy.Globals.addWindowInNav("estoreDetails", pData);
            }
        }
    });
    $.cartScroll.addEventListener("scrollend", getShortlistData);
    $.shortList.addEventListener("marker", function() {
        getshortListOnLazy(page_no, page_size);
    });
    $.shortList.addEventListener("itemclick", function(e) {
        shortlist_bind = "", shortlist_index = "", shortlist_itemSection = "";
        if (!isNullVal(e.bindId)) {
            shortlist_bind = e.bindId;
            shortlist_index = e.itemIndex;
            shortlist_itemSection = e.section.items[shortlist_index];
        }
        switch (e.bindId) {
          case "cartDelete":
            $.header.init({
                title: "YOUR BAG"
            });
            $.myBag.removeEventListener("android:back", goToBack);
            var url = Alloy.Globals.commonUrl.removeShortlist;
            var data = {
                product_id: shortlist_itemSection.properties.product_id
            };
            var requestParams = JSON.stringify(data);
            $.myBag.add(Alloy.createController("confirmation", {
                requestMethod: url,
                requestParam: requestParams,
                successCallback: removeShortlistProductSuccessCallback,
                errorCallback: removeShortlistProductErrorCallback,
                windowContainer: $.myBag,
                message: "Are you sure you want to delete the product ?",
                productName: shortlist_itemSection.properties.product_name
            }).getView());
            break;

          case "cartWish":
            if ("shop" == shortlist_itemSection[shortlist_bind].value) if ("inStock" != shortlist_itemSection[shortlist_bind].status || shortlist_itemSection.properties.checkWallpaper) shortlist_itemSection.properties.checkWallpaper && Alloy.Globals.addWindowInNav("findStore"); else {
                var url = Alloy.Globals.commonUrl.addToCartfromShortlist;
                var quote_id = Ti.App.Properties.getString("quote_id");
                var data = {
                    product_id: shortlist_itemSection.properties.product_id,
                    qty: 1,
                    quoteId: quote_id
                };
                var requestParams = JSON.stringify(data);
                gaShortlistProduct = {};
                gaShortlistProduct = {
                    name: shortlist_itemSection.properties.product_name,
                    sku: shortlist_itemSection.properties.product_sku,
                    shortlistFlag: true
                };
                gaBagProduct = shortlist_itemSection.properties.product_name;
                Alloy.Globals.webServiceCall(url, requestParams, removeShortlistProductSuccessCallback, removeShortlistProductErrorCallback, "POST", $.myBag);
            } else Alloy.Globals.addWindowInNav("findStore");
            break;

          case "notifyLbl":
            if ("shop" == shortlist_itemSection[shortlist_bind].value) if ("outOfStock" == shortlist_itemSection[shortlist_bind].status && "Notify me when in stock" == shortlist_itemSection[shortlist_bind].text) {
                showTransparentLoader($.cartScroll);
                var url = Alloy.Globals.commonUrl.notifyMeProductInStock;
                var quote_id = Ti.App.Properties.getString("quote_id");
                var data = {
                    product_name: shortlist_itemSection.properties.product_name,
                    sku: shortlist_itemSection.properties.product_sku
                };
                var requestParams = JSON.stringify(data);
                Alloy.Globals.webServiceCall(url, requestParams, notifySuccessCallback, notifyErrorCallback, "POST", $.myBag);
            } else {
                shortlist_index = e.itemIndex;
                shortlist_itemSection = e.section.items[shortlist_index];
                navigateToProductDetails(shortlist_index, shortlist_itemSection);
            } else {
                shortlist_index = e.itemIndex;
                shortlist_itemSection = e.section.items[shortlist_index];
                navigateToProductDetails(shortlist_index, shortlist_itemSection);
            }
            break;

          default:
            shortlist_index = e.itemIndex;
            shortlist_itemSection = e.section.items[shortlist_index];
            navigateToProductDetails(shortlist_index, shortlist_itemSection);
        }
    });
    $.continueShoppingLbl.addEventListener("click", navigateToshop);
    $.visitOurStore.addEventListener("click", navigateToshop);
    $.shortListContinueShoppingLbl.addEventListener("click", navigateToshop);
    $.shortlist_visitOurStore.addEventListener("click", navigateToAllCollection);
    __defers["$.__views.myBag!focus!updateData"] && $.addListener($.__views.myBag, "focus", updateData);
    __defers["$.__views.myBag!android:back!goToBack"] && $.addListener($.__views.myBag, "android:back", goToBack);
    __defers["$.__views.myBag!close!destroyWindow"] && $.addListener($.__views.myBag, "close", destroyWindow);
    __defers["$.__views.shortListRemoveAll!click!removeAllShortlist"] && $.addListener($.__views.shortListRemoveAll, "click", removeAllShortlist);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;