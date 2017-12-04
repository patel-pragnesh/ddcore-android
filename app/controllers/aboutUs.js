var args = arguments[0] || {};

//touchEffect.createTouchEffect($.storeLocator, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.viewAllAwards, "#a6333333", "#333333");
$.header.getView("cartContainer").setVisible(false);
$.header.getView("searchLbl").setVisible(false);
$.header.getView("overFlowMenuLbl").setVisible(false);

$.header.init({
    title : "ABOUT US",
    passWindow : $.aboutUs
});


$.header.updateCartCount();

googleAnalyticsScreen("ABOUT US");

/*
 * set attributestring to store locator label
 */

// commented for time begin
/*
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
$.storeLocator.addEventListener('click', function() {
    Alloy.Globals.addWindowInNav("findStore");
});

*/

$.viewAllAwards.addEventListener("click", function(e) {
   // Titanium.Platform.openURL("http://dev.ddecor.com/about#about-awards");
    Titanium.Platform.openURL(Alloy.Globals.ddecorUrl+"about-us#about-awards");
});

$.infrastructure.addEventListener("click", function(e) {
    //Titanium.Platform.openURL("http://dev.ddecor.com/about#about-infrastructure");
    Titanium.Platform.openURL(Alloy.Globals.ddecorUrl+"about-us#about-infrastructure");
});

function openIntPage(e) {
    //Titanium.Platform.openURL("http://dev.ddecor.com/about#international-head");
    Titanium.Platform.openURL(Alloy.Globals.ddecorUrl+"about-us#international-head");
}

function updateCount() {
    $.header.updateCartCount();
}

function clearMemory() {
    Alloy.Globals.popWindowInNav();
    $.removeListener();
    $.aboutUs.remove($.superScroll);
    $.superScroll.removeAllChildren();
    $.destroy();

}
