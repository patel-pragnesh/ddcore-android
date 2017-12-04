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
var shortlist_bind = "",
    shortlist_index = "",
    shortlist_itemSection = "";
var bind,
    index,
    itemSection;
var outOfStackBagList = false;
var gaShortlistProduct = {};
var gaBagProduct ="";
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
    title : "YOUR BAG",
    passWindow : $.myBag,
});

$.myBag.addEventListener("click", function(e) {
    if (e.source.type != "TextField") {
        $.pincodeTxt.blur();
    }
});

$.continueShoppingLbl.width = (Alloy.Globals.platformWidth / 2);
$.checkoutLbl.width = (Alloy.Globals.platformWidth / 2);

/*
 * styles
 */

var style1 = $.createStyle({
    font : {
        fontSize : "10",
        fontFamily : "futura_medium_bt-webfont"
    },
    color : "#e65e48"
});

var style = $.createStyle({
    font : {
        fontSize : "10sp",
        fontFamily : "futura_lt_bt_light-webfont"
    },
    color : "#ffffff",
});

var qtyStyle = $.createStyle({
    font : {
        fontWeight : 'bold',
        fontSize : "13dp"
    },
});
var qtyStyle1 = $.createStyle({
    font : {
        fontFamily : "futura_lt_bt_light-webfont",
        fontSize : "13dp"
    },
});

var val = reverseXhdpi();
var chkClicked = false;

$.cartScroll.addEventListener("scroll", scrollEffect);

function scrollEffect(e) {
    if (!isNaN(e.currentPageAsFloat * (Ti.Platform.displayCaps.platformWidth / 2 * val)) && chkClicked === false) {
        $.vwToAnimate.left = e.currentPageAsFloat * (Ti.Platform.displayCaps.platformWidth / (2 * val));
    }
    if ($.cartScroll.getCurrentPage() == 0) {
        $.shopingBagLbl.applyProperties(style1);
        $.reviewLbl.applyProperties(style);
    } else {
        $.reviewLbl.applyProperties(style1);
        $.shopingBagLbl.applyProperties(style);
    }
}

$.shopingBagLbl.addEventListener("click", toggleLabelEffect1);

function toggleLabelEffect1(e) {
    chkClicked = true;
    $.shopingBagLbl.applyProperties(style1);
    $.reviewLbl.applyProperties(style);
    $.cartScroll.scrollToView(0);
    $.vwToAnimate.animate({
        left : "0",
        duration : 200
    }, function() {
        chkClicked = false;
    });
}

$.reviewLbl.addEventListener("click", toggleLabelEffect2);

function toggleLabelEffect2(e) {
    chkClicked = true;
    $.reviewLbl.applyProperties(style1);
    $.shopingBagLbl.applyProperties(style);

    $.cartScroll.scrollToView(1);
    $.vwToAnimate.animate({
        left : "50%",
        duration : 200
    }, function() {
        chkClicked = false;
    });
}

$.estimateDeliveryLbl.addEventListener('click', estimateLblEffect);

function estimateLblEffect(e) {
    $.pincodeTxt.value = "";
    $.estimateDeliveryLbl.visible = false;
    $.pincodeContainer.visible = true;
}

$.checkBtn.addEventListener('click', function(e) {
    //$.pincodeContainer.visible = false;
    //$.estimateDateLbl.visible = true;

    if ($.pincodeTxt.value != "" && $.pincodeTxt.value.length == "6") {
        $.activityIndi.show();
        $.checkBtn.visible = false;
        $.checkBtn.touchEnabled = false;
        var url = Alloy.Globals.commonUrl.estimateDelivery;
        var data = {
            pincode : $.pincodeTxt.value,
        };

        var requestParams = JSON.stringify(data);

        Alloy.Globals.webServiceCall(url, requestParams, estimateDeliverySuccessCallback, estimateDeliveryErrorCallback, "POST", $.myBag);

    } else {
        showAlert($.myBag, "Please enter valid 6-digit pincode");
    }

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
        $.checkBtn.touchEnabled = true;
        $.checkBtn.visible = true;
        Ti.API.info('catch =' + (ex.message));
    }

}

function estimateDeliveryErrorCallback(e) {
    $.activityIndi.hide();
    $.checkBtn.touchEnabled = true;
    $.checkBtn.visible = true;
    $.pincodeContainer.visible = false;
    $.estimateDateLbl.visible = true;
    $.estimateDateLbl.text = $.pincodeTxt.value + " - " + e.message;
    Ti.API.info('error' + JSON.stringify(e));
}

$.estimateDateLbl.addEventListener('click', estimateDateEffect);

function estimateDateEffect(e) {
    $.estimateDateLbl.visible = false;
    $.estimateDeliveryLbl.visible = true;
}

// $.pincodeTxt.addEventListener('change', pincodeEffect);
//
// function pincodeEffect(e) {
// if ($.pincodeTxt.value.length == 6) {
// $.pincodeContainer.visible = false;
// $.estimateDateLbl.visible = true;
// $.pincodeTxt.value = "";
// $.pincodeTxt.blur();
// }
// }

$.checkoutLbl.addEventListener('click', function(e) {
    if (outOfStackBagList) {
        showAlert($.myBag, "Your cart contains out of stock product");
    } else {
        // myCart();
        validateCartData();
        // Alloy.Globals.addWindowInNav("addressListing");
    }
});
function validateCartData() {
    //Ti.API.info('inside validator');
    showLoader($.myBag);
    var url = Alloy.Globals.commonUrl.getCartInfo;
    var data = {
        quoteId : args
    };

    var requestParams = JSON.stringify(data);

    Alloy.Globals.webServiceCall(url, requestParams, validateCartDataSuccess, validateCartDataError, "POST", $.myBag);
}

function validateCartDataSuccess(e) {
    outOfStackBagList = e.data.outofstock_flag;
    hideLoader($.myBag);
    if (!outOfStackBagList) {
        Alloy.Globals.addWindowInNav("addressListing");
    }

}

function validateCartDataError(e) {
    outOfStackBagList = false;
    hideLoader($.myBag);
}

$.myBag.addEventListener('click', hideOverFlowMenu);

function hideOverFlowMenu(e) {
    if (Alloy.Globals.overFlowFlag && e.source.id != "overFlowMenuLbl") {
        $.header.hideOverFlow();
    };
}

function displayQty() {
    for (var i = 1; i <= 10; i++) {

        qtyContainer[i] = Ti.UI.createView({
            height : "35dp",
            top : "0dp",
            left : "0dp",
            width : Titanium.UI.FILL,
            layout : "vertical",
            id : i,
            type : "sortOption"
        });

        $.qtyDetails.add(qtyContainer[i]);

        qtyLbl[i] = Ti.UI.createLabel({
            id : "lbl" + i,
            font : {
                fontSize : "13dp",
                fontFamily : 'futura_lt_bt_light-webfont'
            },
            color : "#e65e48",
            top : "0dp",
            left : "0dp",
            width : Titanium.UI.FILL,
            touchEnabled : false,
            //text : i + " SET",
            text : i + " QUANTITY",
            value : i
        });

        qtyContainer[i].add(qtyLbl[i]);

    };
}

displayQty();

$.qtyDetails.addEventListener('click', qtySelectedEffect);

function qtySelectedEffect(e) {

    if (e.source.type == "sortOption") {

        for (var i = 1; i <= 10; i++) {
            var qtyText = qtyLbl[i].text;
            qtyLbl[i].applyProperties(qtyStyle1);
            var attr = Ti.UI.createAttributedString({
                text : qtyText,
                attributes : [{
                    type : Titanium.UI.ATTRIBUTE_UNDERLINES_STYLE,
                    range : [0, 0]
                }]
            });
            qtyLbl[i].attributedString = attr;
        }

        e.source.children[0].applyProperties(qtyStyle);
        var text = e.source.children[0].text;
        selectedQty = text;
        var attr = Ti.UI.createAttributedString({
            text : text,
            attributes : [{
                type : Titanium.UI.ATTRIBUTE_UNDERLINES_STYLE,
                range : [0, text.toString().length]
            }]
        });
        e.source.children[0].attributedString = attr;

        var uBind = cartListData.bindId;
        var uIndex = cartListData.itemIndex;
        var uItemIndex = cartListData.section.items[uIndex];

        showLoader($.myBag);
        var url = Alloy.Globals.commonUrl.updateToCart;
        var quote_id = Ti.App.Properties.getString("quote_id");
        var data = {
            product_id : uItemIndex.properties.product_id,
            qty : e.source.id,
            quoteId : quote_id
        };
        var requestParams = JSON.stringify(data);
        Alloy.Globals.webServiceCall(url, requestParams, updateProductSuccessCallback, updateProductErrorCallback, "POST", $.myBag);

    }
}

function updateProductSuccessCallback(e) {
    try {
        if (e.data) {

            //$.shopingBagLbl.text = "SHOPPING BAG " + e.data.cart_total_qty;

            var _totalCartItem = (e.data.cart_total_qty.toString().length === 1 ? ("0" + e.data.cart_total_qty) : e.data.cart_total_qty);
            $.shopingBagLbl.text = "SHOPPING BAG " + _totalCartItem;

            var attr1 = updateStyleAttribute($.shopingBagLbl.text, _totalCartItem);
            $.shopingBagLbl.attributedString = attr1;

            //$.amountLbl.text = e.data.grandtotal;
            setTimeout(function() {
                setAttributeValue(e.data.grandtotal);
            }, 500);
            //setAttributeValue(e.data.grandtotal);
            var updateCartData = cartListData.section.getItemAt(cartListData.itemIndex);
            updateCartData.qtyLbl.text = e.data.qty + " Quantity";

            var price1 = e.data.product_price.split(".")[0];
            var price2 = e.data.product_price.split(".")[1];
            var text = price1 + "." + price2;
            var attr = Ti.UI.createAttributedString({
                text : text,
                attributes : [{
                    type : Ti.UI.ATTRIBUTE_FONT,
                    value : {
                        fontSize : 13,
                        fontFamily : 'futura_lt_bt_light-webfont'
                    },
                    range : [text.lastIndexOf(price2 + ""), (price2 + "").length]
                }]
            });

            //$.amountLbl.attributedString = attr;

            updateCartData.totalPrice.attributedString = attr;
            cartListData.section.updateItemAt(cartListData.itemIndex, updateCartData);

            setTimeout(function() {
                for (var i = 1; i <= 10; i++) {
                    var qtyText = qtyLbl[i].text;
                    qtyLbl[i].applyProperties(qtyStyle1);
                    var attr = Ti.UI.createAttributedString({
                        text : qtyText,
                        attributes : [{
                            type : Titanium.UI.ATTRIBUTE_UNDERLINES_STYLE,
                            range : [0, 0]
                        }]
                    });
                    qtyLbl[i].attributedString = attr;
                }
                hideShowView($.qtyContainer);
            }, 1000);
            hideLoader($.myBag);
            showAlert($.myBag, e.message);
            Ti.App.Properties.setString("cartCount", e.data.cart_total_qty);
            //Ti.App.fireEvent("updateCartCount");
            $.header.updateCartCount();
        }
    } catch(ex) {
        hideLoader($.myBag);
        Ti.API.info('catch = ' + e.message);
    }

}

function updateProductErrorCallback(e) {
    hideLoader($.myBag);
    showAlert($.myBag, e.message);
}

$.qtyCloseLbl.addEventListener('click', function(e) {
    hideShowView($.qtyContainer);
});

$.cartList.addEventListener('itemclick', function(e) {

    bind = "",
    index = "",
    itemSection = "";
    cartListData = e;
    if (!isNullVal(e.bindId)) {
        bind = e.bindId;
        index = e.itemIndex;
        itemSection = e.section.items[index];
    }

    switch(e.bindId) {
    case "qtyContainer":

        if (itemSection[bind].touchEnabled) {
            hideShowView($.qtyContainer);
        }
        break;

    case "cartDelete":
        /*
         showTransparentLoader($.cartScroll);
         var url = Alloy.Globals.commonUrl.removeFromCart;
         var quote_id = Ti.App.Properties.getString("quote_id");
         var data = {
         product_id : itemSection.properties.product_id,
         quoteId : quote_id
         };
         var requestParams = JSON.stringify(data);
         Alloy.Globals.webServiceCall(url, requestParams, removeProductSuccessCallback, removeProductErrorCallback, "POST", $.myBag);
         */

        $.header.init({
            title : "YOUR BAG",
            //passWindow : $.myBag,
        });
        $.myBag.removeEventListener("android:back", goToBack);

        var url = Alloy.Globals.commonUrl.removeFromCart;
        var quote_id = Ti.App.Properties.getString("quote_id");
        var data = {
            product_id : itemSection.properties.product_id,
            quoteId : quote_id
        };
        var requestParams = JSON.stringify(data);

        $.myBag.add(Alloy.createController("confirmation", {
            requestMethod : url,
            requestParam : requestParams,
            successCallback : removeProductSuccessCallback,
            errorCallback : removeProductErrorCallback,
            windowContainer : $.myBag,
            message : "Are you sure you want to delete the product ?",
            productName : itemSection.properties.product_name,
            showLoader : showTransparentLoader,
        }).getView());

        break;

    case "cartWish":
        showTransparentLoader($.cartScroll);
        var url = Alloy.Globals.commonUrl.AddtoShortlistFromCart;
        var quote_id = Ti.App.Properties.getString("quote_id");

        //gaShortlistProduct = itemSection.properties.product_name + "(" + itemSection.properties.product_sku + ")";
        
        gaShortlistProductArray ={
            name : itemSection.properties.product_name,
            sku : itemSection.properties.product_sku,
            lostSale : itemSection.properties.lost_sale,
        };
                
        var data = {
            product_id : itemSection.properties.product_id,
            quoteId : quote_id
        };
        var requestParams = JSON.stringify(data);

        //gaShortlistProduct = itemSection.properties.product_name;

        Alloy.Globals.webServiceCall(url, requestParams, removeProductSuccessCallback, removeProductErrorCallback, "POST", $.myBag);
        break;

    default:
        index = e.itemIndex;
        itemSection = e.section.items[index];

        if (itemSection.properties.checkBlinds) {
            var pData = {
                Productid : itemSection.properties.product_id,
                block : "blinds",
                navigatedblockid : "",
                type : "blinds",
                //category : itemSection[bind].category, // blind category
            };

            Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
        } else {
            var pData = {
                Productid : itemSection.properties.product_id,
                block : "shop",
                product : "shopProduct"
            };
            Alloy.Globals.addWindowInNav("estoreDetails", pData);
        }

        break;
    }

});
 
function removeProductSuccessCallback(e) {
    //hideLoader($.myBag);
   // Ti.API.info('gaShortlistProductArray.length = '+_.size(gaShortlistProductArray));
    if (_.size(gaShortlistProductArray) > 0) {       
        googleAnalyticsShortlist(gaShortlistProductArray, "CART PAGE");
        gaShortlistProductArray = {};
    }

    $.header.init({
        title : "YOUR BAG",
        passWindow : $.myBag,
    });
    $.myBag.addEventListener("android:back", goToBack);
    hideTransparentLoader($.cartScroll);
    try {

        if (e.data) {
            setAttributeValue(e.data.grandtotal);
            //	$.shopingBagLbl.text = "SHOPPING BAG " + e.data.cart_total_qty;
            //	$.mainSection.deleteItemsAt(index, 1);
            showAlert($.myBag, e.message);
            Ti.App.Properties.setString("cartCount", e.data.cart_total_qty);
            
            
            removeCartData.push(e.data.product_id);
            Titanium.App.Properties.setList('removeCartProductIdArray',removeCartData);
            
            //Ti.App.fireEvent("updateCartCount");
            $.header.updateCartCount();

            if (e.data.cart_total_qty == 0) {
                $.opacCartView.visible = true;
            }
            myCart();

        }
    } catch(ex) {
        hideTransparentLoader($.cartScroll);
        Ti.API.info('catch = ' + ex.message);
    }
}

function removeProductErrorCallback(e) {
    Ti.API.info('removeProductErrorCallback');

    $.header.init({
        title : "YOUR BAG",
        passWindow : $.myBag,
    });
    $.myBag.addEventListener("android:back", goToBack);

    hideTransparentLoader($.cartScroll);
    showAlert($.myBag, e.message);
}

function myCart() {
    showTransparentLoader($.cartScroll);
    var quote_id = Ti.App.Properties.getString("quote_id");
    var url = Alloy.Globals.commonUrl.getCartInfo;
    //var _quoteId = args;
    var data = {
        quoteId : quote_id
    };

    var requestParams = JSON.stringify(data);

    Alloy.Globals.webServiceCall(url, requestParams, myCartSuccessCallback, myCartErrorCallback, "POST", $.myBag);
}

/*TODO*/

// if (args.enableShortlist) {
// Ti.API.info('load shortlist ');
// //$.cartScroll.scrollToView($.shortlistPage);
// $.cartScroll.scrollToView(1);
// getShortlistData();
// } else {
// myCart();
//
// }

function updateData() {
   // Ti.API.info('call updatedata');
    if (args.enableShortlist) {
       // Ti.API.info('load shortlist ');
        //$.cartScroll.scrollToView($.shortlistPage);
        $.cartScroll.scrollToView(1);
        getShortlistData();
    } else {
        myCart();

    }
}

function myCartSuccessCallback(e) {
    try {
        hideTransparentLoader($.cartScroll);
        outOfStackBagList = e.data.outofstock_flag;

        Alloy.Globals.shortlistCount = e.data.summary.shortlist_item_count;

        if (e.data.summary.cart_item_count != 0) {
            $.opacCartView.visible = false;

            //totalCartItem = e.data.summary.cart_item_count;
            totalCartItem = (e.data.summary.cart_item_count.toString().length === 1 ? ("0" + e.data.summary.cart_item_count) : e.data.summary.cart_item_count);
            var shortlistCount = (e.data.summary.shortlist_item_count.toString().length === 1 ? ("0" + e.data.summary.shortlist_item_count) : e.data.summary.shortlist_item_count);

            setAttributeValue(e.data.summary.total);

            $.shopingBagLbl.text = "SHOPPING BAG " + totalCartItem;

            //$.reviewLbl.text = "SHORTLIST " + e.data.summary.shortlist_item_count;
            $.reviewLbl.text = "SHORTLIST " + shortlistCount;
           // $.taxLbl.text = "+" + e.data.summary.price_label;

            var attr1 = updateStyleAttribute($.shopingBagLbl.text, totalCartItem);
            $.shopingBagLbl.attributedString = attr1;

            var attr2 = updateStyleAttribute($.reviewLbl.text, shortlistCount);
            $.reviewLbl.setAttributedString(attr2);

            looping_value(e.data.items);
        } else {
                Titanium.App.Properties.setList('removeCartProductIdArray',[]);
                Titanium.App.Properties.setList('cartProductIdArray',[]);
          
            //$.shopingBagLbl.text = "SHOPPING BAG " + e.data.summary.cart_item_count;
            //$.reviewLbl.text = "SHORTLIST " + e.data.summary.shortlist_item_count;
            var _totalCartItem = (e.data.summary.cart_item_count.toString().length === 1 ? ("0" + e.data.summary.cart_item_count) : e.data.summary.cart_item_count);
            var shortlistCount = (e.data.summary.shortlist_item_count.toString().length === 1 ? ("0" + e.data.summary.shortlist_item_count) : e.data.summary.shortlist_item_count);

            $.shopingBagLbl.text = "SHOPPING BAG " + _totalCartItem;
            $.reviewLbl.text = "SHORTLIST " + shortlistCount;

            var attr1 = updateStyleAttribute($.shopingBagLbl.text, _totalCartItem);
            $.shopingBagLbl.attributedString = attr1;

            var attr2 = updateStyleAttribute($.reviewLbl.text, shortlistCount);
            $.reviewLbl.setAttributedString(attr2);
            $.opacCartView.visible = true;
            
            
        }

    } catch(ex) {
        Ti.API.info('catch= ' + ex.message);
        hideTransparentLoader($.cartScroll);
    }

}

function myCartErrorCallback(e) {
    hideTransparentLoader($.cartScroll);
    $.opacCartView.visible = true;
}

function setAttributeValue(text_) {
    Ti.API.info('call attribute');
    var price1 = text_.split(".")[0];
    var price2 = text_.split(".")[1];
    var text = price1 + "." + price2;
    var attr = Ti.UI.createAttributedString({
        text : text,
        attributes : [{
            type : Ti.UI.ATTRIBUTE_FONT,
            value : {
                fontSize : 18,
                fontFamily : 'futura_lt_bt_light-webfont'
            },
            range : [text.lastIndexOf(price2 + ""), (price2 + "").length]
        }]
    });

    $.amountLbl.attributedString = attr;
}

function looping_value(data) {
    listData = [];
    $.mainSection.setItems(listData);
    var template = "cartTemplate";
    var cartProductId = [];
    _.each(data, function(value, k) {

        ///
       cartProductId.push(value.product_id);
        var price1 = value.total_price.split(".")[0];
        var price2 = value.total_price.split(".")[1];
        var text = price1 + "." + price2;
        var attr = Ti.UI.createAttributedString({
            text : text,
            attributes : [{
                type : Ti.UI.ATTRIBUTE_FONT,
                value : {
                    fontSize : 13, //18
                    fontFamily : 'futura_lt_bt_light-webfont'
                },
                range : [text.lastIndexOf(price2 + ""), (price2 + "").length]
            }]
        });

        listData.push({
            properties : {
                product_sku : value.product_sku,
                product_id : value.product_id,
                product_name : value.name,
                checkBlinds : value.blindsFlag,
                lost_sale : (!value.is_instock),
            },
            template : template,
            cartImage : {
                image : encodeURI(value.thumbnail)
            },
            productName : {
                //text : value.name.toUpperCase()
                text : (!isNullVal(value.name)) ? value.name.toUpperCase() : value.name,
            },
            productSize : {
                text : value.size,
                font : {
                    fontSize : (value.size == "" ? "0" : "8")
                }
            },
            price : {
                //text : Alloy.Globals.icon.currency + " " + value.price
                text : value.price
                //	attributedString : attr
            },
            colorImage : {
                image : encodeURI(value.color)
            },
            qtyLbl : {
                text : value.qty
            },
            totalPrice : {
                //text : value.total_price
                attributedString : attr
            },
            notifyLbl : {
                text : ""
            },
            opacBlurLbl : {
                backgroundColor : ((!value.is_instock) ? "#a6ffffff" : "transparent"),
            },
            opacLbl : {
                backgroundColor : ((!value.is_instock ) ? "#a6000000" : "transparent"),
                text : ((!value.is_instock) ? "OUT OF STOCK" : ""),
            },
            qtyContainer : {
                touchEnabled : ((value.blindsFlag) ? false : true)
            },
            dropDownIcon : {
                text : ((value.blindsFlag) ? "" : Alloy.Globals.icon.expandFill)
            }

        });
    });
    $.mainSection.appendItems(listData);
    
    Titanium.App.Properties.setList('cartProductIdArray',cartProductId);
}

$.cartScroll.addEventListener("scrollend", getShortlistData);

function getShortlistData() {
    page_no = 1;
    if ($.cartScroll.getCurrentPage() == "1") {
        showTransparentLoader($.cartScroll);
        var url = Alloy.Globals.commonUrl.getShortlist;
        var data = {
            page_size : page_size,
            page_no : page_no,
            filter : "All"
        };

        var requestParams = JSON.stringify(data);

        Alloy.Globals.webServiceCall(url, requestParams, getShortlistDataSuccessCallback, getShortlistDataErrorCallback, "POST", $.myBag);
    } else {
        myCart();
    }
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

            //$.reviewLbl.setText("SHORTLIST " + totalItem.toString());
            //$.shopingBagLbl.text = "SHOPPING BAG " + e.data.cart_count;

            var shortlistCount = (totalItem.toString().length === 1 ? ("0" + totalItem) : totalItem);
            var _totalCartItem = (e.data.cart_count.toString().length === 1 ? ("0" + e.data.cart_count) : e.data.cart_count);

            $.shopingBagLbl.text = "SHOPPING BAG " + _totalCartItem;
            $.reviewLbl.text = "SHORTLIST " + shortlistCount;

            var attr1 = updateStyleAttribute($.shopingBagLbl.text, _totalCartItem);
            $.shopingBagLbl.attributedString = attr1;

            var attr2 = updateStyleAttribute($.reviewLbl.text, shortlistCount);
            $.reviewLbl.setAttributedString(attr2);

            shortlistLooping(e.data.product);
        } else {
            //$.shopingBagLbl.text = "SHOPPING BAG " + e.data.cart_count;
            //$.reviewLbl.text = "SHORTLIST " + e.data.new_count;

            var _totalCartItem = (e.data.cart_count.toString().length === 1 ? ("0" + e.data.cart_count) : e.data.cart_count);
            var shortlistCount = (e.data.new_count.toString().length === 1 ? ("0" + e.data.new_count) : e.data.new_count);

            $.shopingBagLbl.text = "SHOPPING BAG " + _totalCartItem;
            $.reviewLbl.text = "SHORTLIST " + shortlistCount;

            var attr1 = updateStyleAttribute($.shopingBagLbl.text, _totalCartItem);
            $.shopingBagLbl.attributedString = attr1;

            var attr2 = updateStyleAttribute($.reviewLbl.text, shortlistCount);
            $.reviewLbl.setAttributedString(attr2);

            $.shortlistOpacCartView.visible = true;

        }

    } catch(ex) {
        hideTransparentLoader($.cartScroll);
        Ti.API.info('catch = ' + ex.message);
    }
}

function getShortlistDataErrorCallback(e) {
    hideTransparentLoader($.cartScroll);
    showAlert($.myBag, e.message);
    $.shortlistOpacCartView.visible = true;
}

function shortlistLooping(data) {
    listData = [];
    //$.shortListSection.setItems(listData);
    var template = "shortlistTemplate";

    _.each(data, function(value, k) {

        // var price1 = value.price.split(".")[0];
        // var price2 = value.price.split(".")[1];
        // Ti.API.info('price1 = '+price1 + "price2 = "+price2);
        // var text = price1 + "." + price2;
        // var attr = Ti.UI.createAttributedString({
        // text : text,
        // attributes : [{
        // type : Ti.UI.ATTRIBUTE_FONT,
        // value : {
        // fontSize : 18,
        // fontFamily : 'futura_lt_bt_light-webfont'
        // },
        // range : [text.lastIndexOf(price2 + ""), (price2 + "").length]
        // }]
        // });
        var splitValue = value.price.split(".");
        switch(splitValue.length) {
        case 1:

            var text = value.price;
            var attr = Ti.UI.createAttributedString({
                text : text,
                attributes : [{
                    type : Ti.UI.ATTRIBUTE_FONT,
                    value : {
                        fontSize : 13, //18
                        fontFamily : 'futura_lt_bt_light-webfont'
                    },
                    range : [text.lastIndexOf(price1 + ""), (price1 + "").length]
                }]
            });

            break;
        case 2:

            var price1 = splitValue[0];
            var price2 = splitValue[1];
            //Ti.API.info('after current product price in looping value : ' + price1 + "\t" + price2);
            var text = price1 + "." + price2;
            var attr = Ti.UI.createAttributedString({
                text : text,
                attributes : [{
                    type : Ti.UI.ATTRIBUTE_FONT,
                    value : {
                        fontSize : 13, //18
                        fontFamily : 'futura_lt_bt_light-webfont'
                    },
                    range : [text.lastIndexOf(price2 + ""), (price2 + "").length]
                }]
            });

            break;
        case 3:

            var price1 = "" + splitValue[0];
            var price2 = "" + splitValue[1];
            var price3 = "" + splitValue[2];
            //Ti.API.info('after current product price in looping value : ' + price1 + "\t" + price2 + "\t" + price3);
            var text = price1 + "." + price2 + "." + price3;
            var text2 = "" + price2 + "." + price3;
            var attr = Ti.UI.createAttributedString({
                text : text,
                attributes : [{
                    type : Ti.UI.ATTRIBUTE_FONT,
                    value : {
                        fontSize : 13, //18
                        fontFamily : 'futura_lt_bt_light-webfont'
                    },
                    range : [text.indexOf(text2 + ""), (text2 + "").length]
                }]
            });

            break;

        case 4:

            var price1 = "" + splitValue[0];
            var price2 = "" + splitValue[1];
            var price3 = "" + splitValue[2];
            var price4 = "" + splitValue[3];
            //Ti.API.info('after current product price in looping value : ' + price1 + "\t" + price2 + "\t" + price3);
            var text = price1 + "." + price2 + "." + price3 + "." + price4;
            var text2 = "" + price2 + "." + price3 + "." + price4;

            var attr = Ti.UI.createAttributedString({
                text : text,
                attributes : [{
                    type : Ti.UI.ATTRIBUTE_FONT,
                    value : {
                        fontSize : 13, //18
                        fontFamily : 'futura_lt_bt_light-webfont'
                    },
                    range : [text.indexOf(text2 + ""), (text2 + "").length]
                }]
            });

            break;

        default:

        }

        listData.push({
            properties : {
                product_id : value.product_id,
                product_name : value.name,
                product_sku : value.sku,
                attributeName : value.attributesetname,
                checkWallpaper : value.is_wallpaper,
            },
            template : template,
            cartImage : {
                image : encodeURI(value.image)
            },
            productName : {
                text : (!isNullVal(value.name)) ? value.name.toUpperCase() : value.name,
                //text : value.name.toUpperCase()
            },
            productSize : {
                text : value.size,
                font : {
                    fontSize : (value.size == "" ? "0" : "8")
                }
            },
            colorImage : {
                image : encodeURI(value.color_url)
            },
            qtyLbl : {
                text : ""
            },
            totalPrice : {
                //text : value.price
                attributedString : attr
            },
            cartWish : {
                text : ((value.attributesetname === "Shop") ? ((value.is_wallpaper) ? Alloy.Globals.icon.storeLocator : ((!value.is_in_stock) ? "" : Alloy.Globals.icon.bag)) : Alloy.Globals.icon.storeLocator),
                touchEnabled : ((value.attributesetname === "Shop") ? ((!value.is_in_stock) ? false : true) : true),
                value : ((value.attributesetname === "Shop") ? "shop" : "qds"),
                status : ((value.attributesetname === "Shop") ? ((!value.is_in_stock) ? "outOfStock" : "inStock") : ""),
            },
            notifyLbl : {
                //	text : ((!value.is_in_stock && value.attributesetname === "Shop") ? value.stock_notification : ""),
                text : ((!value.is_in_stock && value.attributesetname === "Shop") ? ((value.stock_notification == "You will be notified when product is back in stock") ? Alloy.Globals.icon.notifyMe : "Notify me when in stock" ) : ""),
                font : {
                    fontFamily : ((!value.is_in_stock && value.attributesetname === "Shop") ? ((value.stock_notification == "You will be notified when product is back in stock") ? "icomoon" : "futura_lt_bt_light-webfont" ) : "")
                },
                value : ((value.attributesetname === "Shop") ? "shop" : "qds"),
                status : ((value.attributesetname === "Shop") ? ((!value.is_in_stock) ? "outOfStock" : "inStock") : ""),
            },
            opacBlurLbl : {
                backgroundColor : ((!value.is_in_stock && value.attributesetname === "Shop") ? "#a6ffffff" : "transparent"),
            },
            opacLbl : {
                backgroundColor : ((!value.is_in_stock && value.attributesetname === "Shop") ? "#a6000000" : "transparent"),
                text : ((!value.is_in_stock && value.attributesetname === "Shop") ? "OUT OF STOCK" : ""),
            }

        });
    });

    page_no++;
    if (page_no <= (Math.ceil((totalItem / page_size) + 1))) {
        $.shortListSection.appendItems(listData);
        $.activityInd.hide();
    }
    //Ti.API.info('page_no = ' + page_no + "(Math.ceil(totalItem / page_size)) = " + (Math.ceil((totalItem / page_size) + 1)));
    if (page_no <= (Math.ceil(totalItem / page_size))) {
        //$.shortListSection.appendItems(listData);
        $.shortList.setMarker({
            sectionIndex : 0,
            itemIndex : ((page_no - 1) * 10) - 1,
        });
        //Ti.API.info('markerset on ' + (((page_no - 1) * 10) - 1));

    }

}

$.shortList.addEventListener("marker", function() {
    getshortListOnLazy(page_no, page_size);
});

function getshortListOnLazy(page_no, page_size) {
    $.activityInd.show();
    var url = Alloy.Globals.commonUrl.getShortlist;
    var data = {
        page_size : page_size,
        page_no : page_no,
        filter : "All"
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
            //$.reviewLbl.setText("SHORTLIST " + totalItem.toString());
            //$.shopingBagLbl.text = "SHOPPING BAG " + e.data.cart_count;

            var _totalCartItem = (e.data.cart_count.toString().length === 1 ? ("0" + e.data.cart_count) : e.data.cart_count);
            var shortlistCount = (totalItem.toString().length === 1 ? ("0" + totalItem) : totalItem);

            $.shopingBagLbl.text = "SHOPPING BAG " + _totalCartItem;
            $.reviewLbl.text = "SHORTLIST " + shortlistCount;

            var attr1 = updateStyleAttribute($.shopingBagLbl.text, _totalCartItem);
            $.shopingBagLbl.attributedString = attr1;

            var attr2 = updateStyleAttribute($.reviewLbl.text, shortlistCount);
            $.reviewLbl.setAttributedString(attr2);

            shortlistLooping(e.data.product);
        } else {
            //$.shopingBagLbl.text = "SHOPPING BAG " + e.data.cart_count;
            //$.reviewLbl.text = "SHORTLIST " + e.data.new_count;

            var _totalCartItem = (e.data.cart_count.toString().length === 1 ? ("0" + e.data.cart_count) : e.data.cart_count);
            var shortlistCount = (e.data.new_count.toString().length === 1 ? ("0" + e.data.new_count) : e.data.new_count);

            $.shopingBagLbl.text = "SHOPPING BAG " + _totalCartItem;
            $.reviewLbl.text = "SHORTLIST " + shortlistCount;

            var attr1 = updateStyleAttribute($.shopingBagLbl.text, _totalCartItem);
            $.shopingBagLbl.attributedString = attr1;

            var attr2 = updateStyleAttribute($.reviewLbl.text, shortlistCount);
            $.reviewLbl.setAttributedString(attr2);

            $.shortlistOpacCartView.visible = true;

        }

    } catch(ex) {
        hideTransparentLoader($.cartScroll);
        Ti.API.info('catch = ' + ex.message);
    }
}

$.shortList.addEventListener('itemclick', function(e) {

    shortlist_bind = "",
    shortlist_index = "",
    shortlist_itemSection = "";
    //cartListData = e;
    if (!isNullVal(e.bindId)) {
        shortlist_bind = e.bindId;
        shortlist_index = e.itemIndex;
        shortlist_itemSection = e.section.items[shortlist_index];
    }
    //Ti.API.info('shortlist_itemSection = ' + JSON.stringify(shortlist_itemSection));
    switch(e.bindId) {

    case "cartDelete":
        //showFullLoader($.cartScroll);

        /*
         var url = Alloy.Globals.commonUrl.removeShortlist;
         var data = {
         product_id : shortlist_itemSection.properties.product_id,
         };
         var requestParams = JSON.stringify(data);
         Alloy.Globals.webServiceCall(url, requestParams, removeShortlistProductSuccessCallback, removeShortlistProductErrorCallback, "POST", $.myBag);
         */

        $.header.init({
            title : "YOUR BAG",
            //passWindow : $.myBag,
        });
        $.myBag.removeEventListener("android:back", goToBack);

        var url = Alloy.Globals.commonUrl.removeShortlist;
        var data = {
            product_id : shortlist_itemSection.properties.product_id,
        };
        var requestParams = JSON.stringify(data);

        $.myBag.add(Alloy.createController("confirmation", {
            requestMethod : url,
            requestParam : requestParams,
            successCallback : removeShortlistProductSuccessCallback,
            errorCallback : removeShortlistProductErrorCallback,
            windowContainer : $.myBag,
            message : "Are you sure you want to delete the product ?",
            productName : shortlist_itemSection.properties.product_name,
            //showLoader:showFullLoader,
            //showLoader : showTransparentLoader,

        }).getView());

        break;

    case "cartWish":
        if (shortlist_itemSection[shortlist_bind].value == "shop") {
            if (shortlist_itemSection[shortlist_bind].status == "inStock" && !shortlist_itemSection.properties.checkWallpaper) {

                var url = Alloy.Globals.commonUrl.addToCartfromShortlist;
                var quote_id = Ti.App.Properties.getString("quote_id");
                var data = {
                    product_id : shortlist_itemSection.properties.product_id,
                    qty : 1,
                    quoteId : quote_id
                };
                var requestParams = JSON.stringify(data);
                //gaShortlistProduct = shortlist_itemSection.properties.product_name + "(" + shortlist_itemSection.properties.product_sku + ")";
                gaShortlistProduct = {};
                gaShortlistProduct = {
                    name : shortlist_itemSection.properties.product_name,
                    sku :  shortlist_itemSection.properties.product_sku,
                    shortlistFlag : true 
                };
                gaBagProduct = shortlist_itemSection.properties.product_name;

                Alloy.Globals.webServiceCall(url, requestParams, removeShortlistProductSuccessCallback, removeShortlistProductErrorCallback, "POST", $.myBag);
            } else if (shortlist_itemSection.properties.checkWallpaper) {
                Alloy.Globals.addWindowInNav("findStore");
            }
        } else {
            Alloy.Globals.addWindowInNav("findStore");
        }
        break;

    case "notifyLbl":
        if (shortlist_itemSection[shortlist_bind].value == "shop") {
            if (shortlist_itemSection[shortlist_bind].status == "outOfStock" && shortlist_itemSection[shortlist_bind].text == "Notify me when in stock") {
                showTransparentLoader($.cartScroll);
                var url = Alloy.Globals.commonUrl.notifyMeProductInStock;
                var quote_id = Ti.App.Properties.getString("quote_id");
                var data = {
                    product_name : shortlist_itemSection.properties.product_name,
                    sku : shortlist_itemSection.properties.product_sku
                };
                var requestParams = JSON.stringify(data);
                Alloy.Globals.webServiceCall(url, requestParams, notifySuccessCallback, notifyErrorCallback, "POST", $.myBag);
            } else {
                shortlist_index = e.itemIndex;
                shortlist_itemSection = e.section.items[shortlist_index];
                navigateToProductDetails(shortlist_index, shortlist_itemSection);
            }
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
        // switch(shortlist_itemSection.properties.attributeName) {
        // case "Shop":
        //
        // var shopData = {
        // Productid : shortlist_itemSection.properties.product_id,
        // block : "shop",
        // product : "shopProduct"
        // };
        //
        // if (shortlist_itemSection.properties.checkWallpaper) {
        // shopData.product = "wallpaper";
        // }
        //
        // Alloy.Globals.addWindowInNav("estoreDetails", shopData);
        //
        // break;
        // case "Qds":
        // var pData = {
        // Productid : shortlist_itemSection.properties.product_id,
        // block : "collection",
        // navigatedblockid : ""
        // };
        //
        // Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
        // break;
        // case "Blinds":
        // var pData = {
        // Productid : shortlist_itemSection.properties.product_id,
        // block : "blinds",
        // navigatedblockid : ""
        // };
        //
        // Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
        // break;
        // }

        break;

    }

});

function navigateToProductDetails(shortlist_index, shortlist_itemSection) {
    switch(shortlist_itemSection.properties.attributeName) {
    case "Shop":

        var shopData = {
            Productid : shortlist_itemSection.properties.product_id,
            block : "shop",
            product : "shopProduct"
        };

        if (shortlist_itemSection.properties.checkWallpaper) {
            shopData.product = "wallpaper";
        }

        Alloy.Globals.addWindowInNav("estoreDetails", shopData);

        break;
    case "Qds":
        var pData = {
            Productid : shortlist_itemSection.properties.product_id,
            block : "collection",
            navigatedblockid : ""
        };

        Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
        break;
    case "Blinds":
        var pData = {
            Productid : shortlist_itemSection.properties.product_id,
            block : "blinds",
            navigatedblockid : "",
            type : "blinds",
            //category : itemSection[bind].category, // blind category
        };

        Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
        break;
    }
}

function notifySuccessCallback(e) {
    try {
        hideTransparentLoader($.cartScroll);
        getShortlistData();
    } catch(ex) {
        hideTransparentLoader($.cartScroll);
        Ti.API.info('catch = ' + ex.message);
    }
}

function notifyErrorCallback(e) {
    hideTransparentLoader($.cartScroll);
    // Ti.API.info('erroe = ' + JSON.stringify(e));
}

function removeShortlistProductSuccessCallback(e) {
    //hideFullLoader($.cartScroll);

    $.header.init({
        title : "YOUR BAG",
        passWindow : $.myBag,
    });
    $.myBag.addEventListener("android:back", goToBack);

    try {

        if (!isNullVal(e.data)) {

            //Ti.API.info('e = ' + JSON.stringify(e));
            page_no = "1";
            if (e.data.new_count == 0) {
                $.shortlistOpacCartView.visible = true;
                Alloy.Globals.shortlistCount = 0;

            }
            getShortlistData();
            //	$.shortListSection.deleteItemsAt(shortlist_index, 1);
            showAlert($.myBag, e.message);
            Ti.App.Properties.setString("cartCount", e.data[0].cart_count);

            //Ti.App.fireEvent("updateCartCount");
            $.header.updateCartCount();
            
            var cartDataArray = [];
            cartDataArray = Titanium.App.Properties.getList('cartProductIdArray');
            //Ti.API.info('cartDataArray = '+cartDataArray);
            if(cartDataArray.indexOf(e.data[0].product_id) == -1){
                cartDataArray.push(e.data[0].product_id);
            }
            Titanium.App.Properties.setList('cartProductIdArray',cartDataArray);
            
           // Ti.API.info('Titanium.App.Properties.getObject() = '+Titanium.App.Properties.getList('cartProductIdArray'));
        

        }
        /*TODO*/

        if (gaBagProduct != undefined) {

            googleAnalyticsBag(gaShortlistProduct);
        }

    } catch(ex) {
        Ti.API.info('catch = ' + ex.message);
    }
    hideTransparentLoader();
    hideLoader();
    hideFullLoader();
}

function removeShortlistProductErrorCallback(e) {
    //Ti.API.info('e = ' + JSON.stringify(e));
    showAlert($.myBag, e.message);
    $.shortlistOpacCartView.visible = true;
    $.header.init({
        title : "YOUR BAG",
        passWindow : $.myBag,
    });
    $.myBag.addEventListener("android:back", goToBack);
    hideTransparentLoader();
    hideLoader();
    hideFullLoader();
}

$.continueShoppingLbl.addEventListener('click', navigateToshop);
$.visitOurStore.addEventListener('click', navigateToshop);
$.shortListContinueShoppingLbl.addEventListener('click', navigateToshop);

$.shortlist_visitOurStore.addEventListener('click', navigateToAllCollection);

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
    $.estimateDeliveryLbl.removeEventListener('click', estimateLblEffect);
    $.estimateDateLbl.removeEventListener('click', estimateDateEffect);
    $.myBag.removeEventListener('click', hideOverFlowMenu);
    $.qtyDetails.removeEventListener('click', qtySelectedEffect);
    $.continueShoppingLbl.removeEventListener('click', navigateToshop);
    $.visitOurStore.removeEventListener('click', navigateToshop);
    $.shortListContinueShoppingLbl.removeEventListener('click', navigateToshop);
    //args = {};
    Alloy.Globals.popWindowInNav();
    //Alloy.Globals.popWindowInNav();
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
    //
    // Ti.API.info('text title-->' + textTitle);
    // Ti.API.info('text count-->' + count);
    // Ti.API.info('index of -->' + textTitle.indexOf(count));
    // Ti.API.info('length of -->' + (count).length);

    var count = count.toString();

    var attr = Ti.UI.createAttributedString({
        text : textTitle,
        attributes : [{
            type : Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
            value : "#fff",
            range : [textTitle.indexOf(count), (count).length]
        }]
    });

    return attr;

}

/*Remove All Shortlist from my account */

function removeAllShortlist() {
    var requestMethod = Alloy.Globals.commonUrl.removeAllShortlist;

    $.myBag.add(Alloy.createController("confirmation", {
        requestMethod : requestMethod,
        requestParam : {},
        successCallback : removeShortlistAllSuccessCallback,
        errorCallback : removeShortlistAllErrorCallback,
        windowContainer : $.myBag,
        message : "Are you sure you want to delete all shortlisted products ?",
        productName : "",
        showLoader : showTransparentLoader,
    }).getView());
}

function removeShortlistAllSuccessCallback(response) {
    // Ti.API.info('remove All success');

    Alloy.Globals.shortlistCount = 0;

    getShortlistData();
    showAlert($.myBag, response.message);
    //Ti.App.Properties.setString("cartCount", Alloy.Globals.shortlistCount);
    //Ti.App.fireEvent("updateCartCount");
    $.header.updateCartCount();

    hideTransparentLoader();
}

function removeShortlistAllErrorCallback(response) {
    //Ti.API.info('remove All error');

    hideTransparentLoader();
    showAlert($.myBag, response.message);
}

/*Remove All Shortlist from my account */