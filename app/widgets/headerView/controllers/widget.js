var args = arguments[0] || {};

var windowName = "";
var cartCount = "";
var viewName = "";
/*
Alloy.Globals.setCount = function(e) {
//exports.setCount = function(e) {
Ti.API.info('*************into header cart count*************');
Ti.App.removeEventListener("updateCartCount", updateCartCount);
$.cartCountLbl.text = "";

if (parseInt(Ti.App.Properties.getString("cartCount")) > 0 && Ti.App.Properties.getString("cartCount") != null) {
cartCount = Ti.App.Properties.getString("cartCount");
$.cartCountLbl.setVisible(true);
$.cartCountLbl.setText('');
$.cartCountLbl.setText(cartCount.toString());
Ti.API.info('cartCount.toString() =' + cartCount.toString());
Ti.API.info('$.cartCountLbl.get = ' + $.cartCountLbl.getText());
} else {
$.cartCountLbl.setVisible(false);
$.cartCountLbl.setText("");
}

if (Ti.App.Properties.getString("access_token")) {
$.appoinmantLbl.setHeight("40dp");
$.customerService.setHeight("40dp");
} else {
$.appoinmantLbl.setHeight("0dp");
$.customerService.setHeight("0dp");
}

Ti.App.addEventListener("updateCartCount", updateCartCount);

};

*/

//Alloy.Globals.setCount();
//Alloy.Globals.setCount = setCount();

Alloy.Globals.setCount = function() {
    updateCartCount();
};

Ti.App.removeEventListener("updateCartCount", updateCartCount);
Ti.App.addEventListener("updateCartCount", updateCartCount);

function updateCartCount() {
    //Ti.App.fireEvent("updateCartCountInDashBoard");

    //Alloy.Globals.setCount();
    
    if (Ti.App.Properties.getString("access_token")) {
        //$.appoinmantLbl.setHeight("40dp");
        $.customerService.setHeight("40dp");
    } else {
       // $.appoinmantLbl.setHeight("0dp");
        $.customerService.setHeight("0dp");
    }

    updateHeaderCartCount($.cartCountLbl);
}

$.searchLbl.addEventListener('click', function(e) {
    Alloy.Globals.addWindowInNav("searchListing");
});
$.cartContainer.addEventListener('click', function(e) {
    if (Ti.App.Properties.getString("access_token")) {
        var quote_id = Ti.App.Properties.getString("quote_id");
        Ti.API.info('quote_id = ' + quote_id);
        Alloy.Globals.addWindowInNav("myBag", quote_id);

    } else {
        Alloy.Globals.addWindowInNav("signIn", "myBag");
    }
    //Alloy.createController('myBag').getView().open();
});
touchEffect.createTouchEffect($.menuButton, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.logoIcon, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.cartLbl, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.searchLbl, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.overFlowMenuLbl, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.home, "#a6333333", "#333333");

// touchEffect.createTouchEffect($.homeLbl, "#a6333333", "#333333");
touchEffect.createTouchEffect($.appoinmantLbl, "#a6333333", "#333333");
touchEffect.createTouchEffect($.aboutsUs, "#a6333333", "#333333");
touchEffect.createTouchEffect($.customerService, "#a6333333", "#333333");

touchEffect.createTouchEffect($.return_refund, "#a6333333", "#333333");
touchEffect.createTouchEffect($.faq, "#a6333333", "#333333");

$.overFlowMenuLbl.addEventListener('click', showOverFlow);

function showOverFlow(e) {
    Alloy.Globals.overFlowFlag = true;
    $.openView.visible = true;
}

$.overFlowView.addEventListener('click', hideOverFlow);

$.openView.addEventListener('click', hideOverFlow);
function hideOverFlow(e) {
    if (Alloy.Globals.overFlowFlag) {
        //$.overFlowView.visible=false;
        $.openView.visible = false;
        //$.overFlowContainer.visible=false;
        Alloy.Globals.overFlowFlag = false;
    }
};
exports.hideOverFlow = hideOverFlow;

var init = function(args) {

    if (args.title != undefined) {
        $.addClass($.logoIcon, "pageTitle");
        $.logoIcon.text = args.title;
        $.subLbl.text = args.subTitle || "";
    } else {
        $.logoIcon.text = "D'Decor'";
    }

    if (args.passWindow != undefined) {
        windowName = args.passWindow;
    } else if (args.passView != undefined) {
        viewName = args.passView;
    }

};
exports.init = init;

$.menuButton.addEventListener('click', goToBack);

function goToBack(e) {
    if (windowName != "") {
        Alloy.Globals.popWindowInNav();
        windowName.close();

        setTimeout(function() {
            Ti.API.info('into header View remove*********');
            windowName.remove($.dashboardNavigation);
            windowName.remove($.openView);
        }, 500);

    } else if (viewName != "") {
        viewName.visible = false;

    } else {
        Ti.API.info("Check your controller's function");
    }
}

$.customerService.addEventListener('click', function(e) {
    Alloy.Globals.addWindowInNav('customerService');
});

$.appoinmantLbl.addEventListener('click', function(e) {
    if (Ti.App.Properties.getString("access_token")) {
        Alloy.Globals.addWindowInNav('feedBack');
    } else {
        Alloy.Globals.addWindowInNav("signIn");
    }
});

$.aboutsUs.addEventListener('click', function(e) {
    Alloy.Globals.addWindowInNav('aboutUs');
});

$.home.addEventListener('click', function(e) {

    // Alloy.Globals.popWindowInNav();
    // Alloy.Globals.destroyWindowInNav();
    // if (windowName != undefined) {
    // windowName.close();
    // }
    Ti.API.info('viewName = ' + viewName);

    if (windowName != "") {
        Alloy.Globals.popWindowInNav();
        Alloy.Globals.destroyWindowInNav();
        windowName.close();

    } else if (viewName != "") {
        viewName.visible = false;

    } else {
        Ti.API.info("Check your controller's function");
    }

});

$.return_refund.addEventListener('click', function(e) {
    Alloy.Globals.addWindowInNav('returnRefund');
});

$.faq.addEventListener('click', function(e) {
    Alloy.Globals.addWindowInNav('faq');
});

$.privacy.addEventListener('click', function(e) {
    try {

        Alloy.Globals.addWindowInNav('privacypolicy');
    } catch(ex) {
        Ti.API.info('privacy Policy-->' + JSON.stringify(ex.message));

    }
});

exports.updateCartCount = updateCartCount;
