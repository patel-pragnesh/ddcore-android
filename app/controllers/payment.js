// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = arguments[0] || {};

var orderData = null,
    orderId = null,
    orderTotal = null;
var paymentContainer = [];

$.header.getView("cartContainer").setVisible(false);
$.header.getView("searchLbl").setVisible(false);
$.header.getView("overFlowMenuLbl").setVisible(false);
$.header.init({
    title : "PLACE ORDER",
    //passWindow : $.payment,
});

$.header.getView("menuButton").addEventListener("click", goToBack);
var paymentFlag = false;
var webViewFlag = false;
touchEffect.createTouchEffect($.placeOrder, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.confirmationCloseLbl, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.noLbl, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.yesLbl, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.moveToEshopLbl, "#a6ffffff", "#ffffff");

init();
function init() {
    getPaymentMethod();
}
 
var webview = Titanium.UI.createWebView({
    //url : e.data.payment_url_ccavenue,
    zIndex : "10",
    top : "53dp",
   // cacheMode:Ti.UI.Android.WEBVIEW_LOAD_NO_CACHE
}); 

if (!isNullVal(args.total_price)) {
    var price1 = args.total_price.split(".")[0];
    var price2 = args.total_price.split(".")[1];
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
   // $.taxLbl.setText("+ TAX");
}
var address_text = "ADDRESS \ue925";
var address_attr = Ti.UI.createAttributedString({
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

$.addressLbl.attributedString = address_attr;

var review_text = "REVIEW \ue925";
var review_attr = Ti.UI.createAttributedString({
    text : review_text,
    attributes : [{
        type : Ti.UI.ATTRIBUTE_FONT,
        value : {
            fontSize : 11,
            fontFamily : "futura_lt_bt_light-webfont",
        },
        range : [review_text.indexOf("REVIEW"), ("REVIEW").length]
    }]
});

$.reviewLbl.attributedString = review_attr;

// $.paymentOptionContainer.addEventListener('click', function(e) {
    // if (e.source.children[0].color == "#dfdfdf") {
        // paymentFlag = true;
        // e.source.children[0].color = "#e65e48";
        // selectPayment(e.source.children[1].code);
    // } else {
        // paymentFlag = false;
        // e.source.children[0].color = "#dfdfdf";
    // }
// });

/*TODO new event added*/

// $.noPaymentOption.addEventListener('click', function(e) {
    // if (e.source.children[0].color == "#dfdfdf") {
        // paymentFlag = true;
        // e.source.children[0].color = "#e65e48";
        // selectPayment(e.source.children[1].code);
    // } else {
        // paymentFlag = false;
        // e.source.children[0].color = "#dfdfdf";
    // }
// });

$.placeOrder.addEventListener('click', function(e) {
    if (paymentFlag) {
        var quote_id = Ti.App.Properties.getString("quote_id");
        var url = Alloy.Globals.commonUrl.createOrder;
        var data = {
            quoteId : quote_id,
        };
        var requestParams = JSON.stringify(data);

        Alloy.Globals.webServiceCall(url, requestParams, createOrderSuccessCallback, createOrderErrorCallback, "POST", $.payment);
        ///////

    }
    else {
        showAlert($.payment, "Please select payment option");
    }

});

function createOrderSuccessCallback(e) {
    try {

        /*
         $.header.getView("logoIcon").text = "PAYMENT PROCESSING";
         webview.setUrl(e.data.payment_url_ccavenue);
         $.payment.add(webview);
         webViewFlag = true;
         */

        orderData = e.data.product;
        orderId = e.data.order_id;
        orderTotal = e.data.total;

        $.header.getView("logoIcon").text = "PAYMENT PROCESSING";

        if (!isNullVal(e.data.payment_url_ccavenue)) {
            
            //var encodeURI1 = encodeURIComponent(e.data.payment_url_ccavenue);
            //Ti.API.info('encodeURI = '+encodeURI1);
            webview.setUrl(e.data.payment_url_ccavenue);
            $.payment.add(webview);
            webViewFlag = true;
        } else {

            //$.confirmationContainer.setVisible(true);
            hideShowView($.thankYouView);
            Ti.App.Properties.setString("cartCount", 0);

            Titanium.App.Properties.setList('removeCartProductIdArray', []);
            Titanium.App.Properties.setList('cartProductIdArray', []);
        }

    } catch(ex) {
        Ti.API.info('catch = ' + ex.message);
    }
}

function createOrderErrorCallback(e) {
    //  Ti.API.info('error = ' + JSON.stringify(e));
}

webview.addEventListener("beforeload", function(e) {
    Ti.API.info('beforeload webview.getUrl() =' + webview.getUrl());
});

webview.addEventListener("load", function(e) {

    //Ti.API.info('load webview.getUrl() =' + webview.getUrl());

    //http://dev.ddecor.com/custom/customindex/index

    //if(webview.getUrl() =="http://dev.ddecor.com/checkout/onepage/success"){

    //if (webview.getUrl() == "http://dev.ddecor.com/custom/customindex/appsuccess/") {
    //if (webview.getUrl() == (Alloy.Globals.ddecorPaymentUrl + "customindex/appsuccess/")) {
       // Ti.API.info('webview.getUrl().indexOf("customindex/appsuccess/") = '+webview.getUrl().indexOf("customindex/appsuccess/"));
       // Ti.API.info('webview.getUrl().indexOf("customindex/appfailure/") = '+webview.getUrl().indexOf("customindex/appfailure/"));
    if (webview.getUrl().indexOf("customindex/appsuccess/") > -1) {

        //alert("order placed");
        hideShowView($.thankYouView);
        Ti.App.Properties.setString("cartCount", 0);
        sendDataToGa();

    } else if (webview.getUrl().indexOf("customindex/appfailure/") > -1) {

        //alert("something wrong");

        $.questionLbl.setText("YOUR ORDER HAS BEEN CANCELLED");

        hideShowView($.thankYouView);
        Ti.App.Properties.setString("cartCount", 0);
        //showAler($.payment, "");
    }

});

function sendDataToGa() {
    Alloy.Globals.tracker.trackTransaction({
        transactionId : orderId,
        affiliation : "Estore",
        revenue : parseFloat(orderTotal),
        tax : 0,
        shipping : 0,
        currency : "INR" // optional
    });

    _.each(orderData, function(value, key) {

        Alloy.Globals.tracker.trackTransactionItem({
            transactionId : orderId, // reference to above transaction
            name : value.product_name,
            sku : value.product_sku,
            category : value.product_tcCollection, // optional
            price : parseFloat(value.product_price),
            quantity : parseFloat(value.product_qty),
            currency : "INR"
        });

    });
}

function selectPayment(paymentMethod) {
    $.placeOrder.touchEnabled = false;
    var quote_id = Ti.App.Properties.getString("quote_id");
    var url = Alloy.Globals.commonUrl.selectPayment;
    var data = {
        quoteId : quote_id,
        payment_method : paymentMethod
        //payment_method : "ccavenuepay"
    };

    var requestParams = JSON.stringify(data);

    Alloy.Globals.webServiceCall(url, requestParams, selectPaymentSuccessCallback, selectPaymentErrorCallback, "POST", $.payment);
}

function selectPaymentSuccessCallback(e) {
    try {
        $.placeOrder.touchEnabled = true;
    } catch(ex) {
        $.placeOrder.touchEnabled = false;
        Ti.API.info('catch = ' + ex.message);
    }
}

function selectPaymentErrorCallback(e) {
    $.placeOrder.touchEnabled = false;
}

$.confirmationCloseLbl.addEventListener('click', function(e) {
    hideShowView($.confirmationContainer);
});
$.noLbl.addEventListener('click', function(e) {
    hideShowView($.confirmationContainer);
});
$.yesLbl.addEventListener('click', function(e) {
    webViewFlag = false;
    closeAllWindow();
    Ti.App.Properties.setString("cartCount", 0);
    updateCount();
    /*TODO*/
});

$.moveToEshopLbl.addEventListener('click', function(e) {
    closeAllWindow();
});

function goToBack() {
    if (webViewFlag) {
        hideShowView($.confirmationContainer);
        //$.confirmationContainer.visible =true;
    } else {
        Alloy.Globals.popWindowInNav();
        //Alloy.Globals.destroyWindowInNav();
        $.payment.close();
        //Alloy.Globals.addWindowInNav("eshop");

    }
}

function closeAllWindow(e) {
    Alloy.Globals.popWindowInNav();
    Alloy.Globals.destroyWindowInNav();
    $.payment.close();
    Alloy.Globals.addWindowInNav("eshop");
}

function destroyWindow(e) {
    Ti.API.info('************** into clear Memory ***************');

    $.removeListener();

    $.payment.remove($.totalDisplayContainer);
    $.payment.remove($.addressLbl);
    $.payment.remove($.reviewLbl);
    $.payment.remove($.paymentLbl);
    $.payment.remove($.paymentContainer);
    $.payment.remove($.placeOrder);
    $.payment.remove($.confirmationContainer);
    $.payment.remove($.thankYouView);

    $.totalDisplayContainer.removeAllChildren();
    $.addressLbl.removeAllChildren();
    $.reviewLbl.removeAllChildren();
    $.paymentLbl.removeAllChildren();
    $.paymentContainer.removeAllChildren();
    $.placeOrder.removeAllChildren();
    $.confirmationContainer.removeAllChildren();
    $.thankYouView.removeAllChildren();

    args = {};
    paymentFlag = null;
    webViewFlag = null;

    $.destroy();
}

function updateCount() {
    $.header.updateCartCount();
}

/*TODO need to work here*/

function getPaymentMethod() {

    showTransparentLoader($.payment);

    var requestMethod = Alloy.Globals.commonUrl.getAvailablePaymentMethods;

    var param = {
        quoteId : Ti.App.Properties.getString("quote_id")

    };
    var requestParam = JSON.stringify(param);

    Alloy.Globals.webServiceCall(requestMethod, requestParam, getPaymentMethodSuccessCallback, getPaymentMethodErrorCallback, "POST", $.payment);

} 

function getPaymentMethodSuccessCallback(response) {
    hideTransparentLoader();

    try {

        // if (!isNullVal(response.data.summary.total)) {
// 
            // if (parseInt(response.data.summary.total) === 0) {
                // // display free payment option
// 
                // $.paymentContainer.remove($.paymentOptionContainer);
                // $.paymentOptionLbl2.setText(response.data.payment[0].title);
                // $.paymentOptionLbl2.code = response.data.payment[0].code;
                // $.noPaymentOption.setVisible(true);
            // } else {
                // // CC avenue option
                // $.paymentContainer.remove($.noPaymentOption);
                // $.paymentOptionLbl.setText(response.data.payment[0].title);
                // $.paymentOptionLbl.code = response.data.payment[0].code;
                // $.paymentOptionContainer.setVisible(true);
            // }
// 
        // } // temp 
        
       
        
        // dynamic payment option
        Ti.API.info('response.data.payment.length = ' + response.data.payment.length);
        if (response.data.payment.length > 0) {
            Ti.API.info('inside if');

            _.each(response.data.payment, function(value, key) {
                Ti.API.info('value =' + JSON.stringify(value) + "key =" + key);

                paymentContainer[key] = Ti.UI.createView({
                    layout : "horizontal",
                    top : "2dp",
                    height : "40dp",
                    width : Ti.UI.FILL,
                    id : key,
                    value : value.code
                });

                var radioLbl = Ti.UI.createLabel({
                    width : "40dp",
                    height : "40dp",
                    color : "#dfdfdf",
                    font : {
                        fontSize : "14dp",
                        fontFamily : "icomoon"
                    },
                    touchEnabled : false,
                    // bubbleParent:true,
                    textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
                    text : Alloy.Globals.icon.radio
                });
                paymentContainer[key].add(radioLbl);

                var paymentName = Ti.UI.createLabel({
                    height : "40dp",
                    font : {
                        fontSize : "14dp",
                        fontFamily : "Futura Lt BT"
                    },
                    color : "#333333",
                    touchEnabled : false,
                    // bubbleParent:true,
                    text : value.title
                });
                paymentContainer[key].add(paymentName);

                $.paymentContainer.add(paymentContainer[key]);
            });
        }
 
        //end
        

    } catch(exp) {
        Ti.API.info('exp--->' + exp.message);
        showAlert($.payment, "Something went wrong");
    }

}


$.paymentContainer.addEventListener('click', function(e) { //temp dynamic
     Ti.API.info('e = ='+e.source.id);
    //Ti.API.info('JSON.stringify(paymentContainer = '+JSON.stringify(paymentContainer));
    try {
        if (isNullVal(e.source.id)) {
            _.each(paymentContainer, function(value, key) {
                // Ti.API.info('value =' + JSON.stringify(value) + "key =" + key);
                paymentContainer[value.id].children[0].color = "#dfdfdf";
            });
            //Ti.API.info('paymentContainer = '+JSON.stringify(paymentContainer[e.source.id].children[0]));
            paymentContainer[e.source.id].children[0].color = "#e65e48";
            paymentFlag = true;
            Ti.API.info('value' + e.source.value);
            selectPayment(e.source.value);
        } else {
            Ti.API.info('inside else');
        }
    } catch(ex) {
        Ti.API.info('catch =' + ex.message);
    }
});

function getPaymentMethodErrorCallback(response) {
    showAlert($.payment, response.message);
}