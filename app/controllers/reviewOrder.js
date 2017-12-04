var args = arguments[0] || {};

$.header.getView("cartContainer").setVisible(false);
$.header.getView("searchLbl").setVisible(false);
$.header.getView("overFlowMenuLbl").setVisible(false);
$.header.init({
    title : "REVIEW ORDER",
    passWindow : $.reviewOrder,
});

var total_cart_price;

touchEffect.createTouchEffect($.changeAddressLbl, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.paymentLbl, "#a6ffffff", "#ffffff");

$.changeAddressLbl.width = (Alloy.Globals.platformWidth / 2);
$.paymentLbl.width = (Alloy.Globals.platformWidth / 2);

var address_text = "ADDRESS \ue925";

var attr = Ti.UI.createAttributedString({
    text : address_text,
    attributes : [{
        type : Ti.UI.ATTRIBUTE_FONT,
        value : {
            fontSize : 11,
            fontFamily : "futura_lt_bt_light-webfont",
        },
        range : [address_text.indexOf("ADDRESS"), ("ADDRESS").length]
    }]
});

$.addressLbl.attributedString = attr;

var listData = [];

$.reviewOrder.addEventListener('click', hideOverFlowMenu);

function hideOverFlowMenu(e) {
    if (Alloy.Globals.overFlowFlag && e.source.id != "overFlowMenuLbl") {
        $.header.hideOverFlow();
    };
}

function closeReviewOrder() {
    Alloy.Globals.popWindowInNav();
    $.reviewOrder.close();
}

//getReviewData();
// function getReviewData() {
// showLoader($.reviewOrder);
// var quote_id = Ti.App.Properties.getString("quote_id");
// Ti.API.info('quote_id = ' + quote_id);
// var url = Alloy.Globals.commonUrl.reviewOrder;
// var data = {
// quoteId : quote_id,
// billingAddressId : args.billing_address,
// shippingAddressId : args.shipping_address
// };
//
// var requestParams = JSON.stringify(data);
//
// Alloy.Globals.webServiceCall(url, requestParams, getReviewDataSuccessCallback, getReviewDataErrorCallback, "POST", $.reviewOrder);
// }
getReviewDataSuccessCallback(args);
function getReviewDataSuccessCallback(e) {
    try {
        //Ti.API.info('e = =' + JSON.stringify(e));
        total_cart_price = e.data.summary.total;
        var price1 = e.data.summary.total.split(".")[0];
        var price2 = e.data.summary.total.split(".")[1];
        var text = price1 + "." + price2;
        var attr = Ti.UI.createAttributedString({
            text : text,
            attributes : [{
                type : Ti.UI.ATTRIBUTE_FONT,
                value : {
                    fontSize : 18,
                    fontFamily : 'futura_lt_bt_light-webfont'
                },
                range : [text.indexOf(price2 + ""), (price2 + "").length]
            }]
        });

        $.amountLbl.attributedString = attr;

      //  $.taxLbl.setText("+" + e.data.summary.price_label);
        if(!isNullVal(e.data.summary.coupon_code)){
            
            $.clearCoupnLbl.setText(Alloy.Globals.icon.close);
            $.clearCoupnLbl.setVisible(true);
            $.clearCoupnLbl.setTouchEnabled(true);
            
            $.couponTxt.setEditable(false);
            $.couponTxt.setValue("Coupon Applied : " + e.data.summary.coupon_code);
            $.couponTxt.setColor("#64FF33");
        }
        
        
        looping_value(e.data.items);
        hideLoader($.reviewOrder);
    } catch(ex) {
        hideLoader($.reviewOrder);
        Ti.API.info('catch = ' + ex.message);
    }
}

function getReviewDataErrorCallback(e) {
    hideLoader($.reviewOrder);
    showAlert($.reviewOrder, e.message);
    goToBack();
}

function looping_value(data) {
    listData = [];
    $.mainSection.setItems(listData);
    var template = "reviewItemTemplate";

    _.each(data, function(value, k) {

        ///
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
                range : [text.indexOf(price2 + ""), (price2 + "").length]
            }]
        });

        listData.push({
            properties : {
                product_id : value.product_id
            },
            template : template,
            reviewImage : {
                image : encodeURI(value.thumbnail)
            },
            productName : {
                text : value.name.toUpperCase()
            },
            productSize : {
                text : value.size,
                font : {
                    fontSize : (value.size == "" ? "0" : "8")
                }
            },
            perSetprice : {
                text : Alloy.Globals.icon.currency + " " + value.price
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
        });
    });
    $.mainSection.appendItems(listData);

}

$.paymentLbl.addEventListener('click', function(e) {
    var paymentData = {
        total_price : total_cart_price
    };
    Alloy.Globals.addWindowInNav("payment", paymentData);
});

function goToBack() {
    $.reviewOrder.removeEventListener('click', hideOverFlowMenu);
    //args = {};
    //Ti.API.info('before');
    Alloy.Globals.popWindowInNav();
    $.reviewOrder.close();
}

function destroyWindow(e) {
    //Ti.API.info('after');
    $.reviewOrder.removeAllChildren();
    $.destroy();
}

function updateCount() {
    $.header.updateCartCount();
}

function hideKeyboard() {
    Ti.UI.Android.hideSoftKeyboard();
}

function applyDiscountCoupon(e) {
    if (e.source.text == Alloy.Globals.icon.tick) {
        addCoupon();
    } else {
        removeCoupon();
    }

}

function applyCoupon(e) {

    if ((e.value).trim() == "") {
        $.clearCoupnLbl.setVisible(false);
        $.clearCoupnLbl.setTouchEnabled(false);
    } else {
        $.clearCoupnLbl.setVisible(true);
        $.clearCoupnLbl.setTouchEnabled(true);
    }
}

function addCoupon() {

    showTransparentLoader($.reviewOrder);

    var requestMethod = Alloy.Globals.commonUrl.addCoupon;

    var param = {
        quoteId : Ti.App.Properties.getString("quote_id"),
        couponCode : $.couponTxt.getValue()
    };
    var requestParam = JSON.stringify(param);

    Alloy.Globals.webServiceCall(requestMethod, requestParam, addCouponSuccessCallback, addCouponErrorCallback, "POST", $.reviewOrder);
}

function addCouponSuccessCallback(response) {
    hideTransparentLoader();

    total_cart_price = response.data.summary.total;
    var price1 = response.data.summary.total.split(".")[0];
    var price2 = response.data.summary.total.split(".")[1];
    var text = price1 + "." + price2;
    var attr = Ti.UI.createAttributedString({
        text : text,
        attributes : [{
            type : Ti.UI.ATTRIBUTE_FONT,
            value : {
                fontSize : 18,
                fontFamily : 'futura_lt_bt_light-webfont'
            },
            range : [text.indexOf(price2 + ""), (price2 + "").length]
        }]
    });

    $.amountLbl.attributedString = attr;

  //  $.taxLbl.setText("+" + response.data.summary.price_label);
    $.clearCoupnLbl.setText(Alloy.Globals.icon.close);
    $.couponTxt.setEditable(false);
    
    $.couponTxt.setValue("Coupon Applied : " + $.couponTxt.getValue());
    $.couponTxt.setColor("#64FF33");
    showAlert($.reviewOrder, " Coupon Applied Successfully ");

}

function addCouponErrorCallback(response) {
    
    hideTransparentLoader();
    showAlert($.reviewOrder,response.message);

}

function removeCoupon() {
    showTransparentLoader($.reviewOrder);

    var requestMethod = Alloy.Globals.commonUrl.removeCoupon;

    var param = {
        quoteId : Ti.App.Properties.getString("quote_id")

    };
    var requestParam = JSON.stringify(param);

    Alloy.Globals.webServiceCall(requestMethod, requestParam, removeCouponSuccessCallback, removeCouponErrorCallback, "POST", $.reviewOrder);
}

function removeCouponSuccessCallback(response) {
    hideTransparentLoader();

    total_cart_price = response.data.summary.total;
    var price1 = response.data.summary.total.split(".")[0];
    var price2 = response.data.summary.total.split(".")[1];
    var text = price1 + "." + price2;
    var attr = Ti.UI.createAttributedString({
        text : text,
        attributes : [{
            type : Ti.UI.ATTRIBUTE_FONT,
            value : {
                fontSize : 18,
                fontFamily : 'futura_lt_bt_light-webfont'
            },
            range : [text.indexOf(price2 + ""), (price2 + "").length]
        }]
    });

    $.amountLbl.attributedString = attr;

    //$.taxLbl.setText("+" + response.data.summary.price_label);
    
    $.clearCoupnLbl.setText(Alloy.Globals.icon.tick);
    $.clearCoupnLbl.setVisible(false);
    $.clearCoupnLbl.setTouchEnabled(false);
    
    $.couponTxt.setValue("");
    $.couponTxt.setEditable(true);
    $.couponTxt.setColor("#000000");
    
   showAlert($.reviewOrder, " Coupon Removed Successfully ");

}

function removeCouponErrorCallback(response) {
    hideTransparentLoader();
    showAlert($.reviewOrder, response.message);

}

