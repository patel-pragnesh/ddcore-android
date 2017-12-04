var args = arguments[0] || {};
var appointmentFlag = false;
//Alloy.Globals.tracker.startSession();
//Alloy.Globals.tracker.addScreenView('Dashboard');

 

// Ti.API.info('my Country :' + Titanium.Locale.currentCountry);
// Ti.API.info('======');
// Titanium.Geolocation.forwardGeocoder('goa',callback1);
// function callback1 (argument) {
  // Ti.API.info('argument = ='+JSON.stringify(argument));
// }

var bannerNavigation = require("bannerNavigation");
googleAnalyticsScreen('Home page');
var collectionAllData = "";
var flag = true;
var categoryName = "";
var subCategory = [];
var categoryData = [];
var eshopData = [];
var homePageData = [];
var beddingContainer = "";
var label = [];
var dImaginer = {visible:false};
var loginViewFlag = null;


var setImageRotationInterval;

//$.dashboard_homeLbl.text = '"' + "Home isn'" + "t just a place, its a feeling.." + '"';

Ti.App.removeEventListener("updateCartCountInDashBoard", updateCount);
Ti.App.addEventListener("updateCartCountInDashBoard", updateCount);

function updateCount() {
    Ti.API.info('dashboard window focus event ******');
    
    clearInterval(setImageRotationInterval);
    setHomeBannerInterval();
    
    Ti.App.removeEventListener("updateCartCountInDashBoard", updateCount);
    //Ti.API.info('************* update count into dashboard **************');
    Ti.API.info('Ti.App.Properties.getString("cartCount")) = '+Ti.App.Properties.getString("cartCount"));
    if (parseInt(Ti.App.Properties.getString("cartCount")) > 0) {
        var cartCount = "";
        cartCount = Ti.App.Properties.getString("cartCount");
        $.cartCountLbl.visible = true;
        $.cartCountLbl.setText(cartCount.toString());
    } else {
        $.cartCountLbl.visible = false;
        $.cartCountLbl.setText("");
    }

    if (!isNullVal(Ti.App.Properties.getString("access_token"))) {
       // $.appoinmantLbl.setHeight("40dp");
        $.customerService.setHeight("40dp");
        //$.terms_condition.setHeight("40dp");

        $.profileImage.setImage(Ti.App.Properties.getString("image"));
        $.profileImage.setDefaultImage("/images/default_user_picture.png");

    } else {
        $.profileImage.setImage("/images/default_user_picture.png");
       // $.appoinmantLbl.setHeight("0dp");
        $.customerService.setHeight("0dp");
        //$.terms_condition.setHeight("0dp");
    }
    Ti.App.addEventListener("updateCartCountInDashBoard", updateCount);
}


function setHomeBannerInterval(){
    
clearInterval(setImageRotationInterval);

setImageRotationInterval = setInterval(function(e) {

    //Ti.API.info('auto Scroll****************');

    var lastView = $.itemScrollableView.getViews();
    var currentPage = $.itemScrollableView.getCurrentPage() + 1;
    if (currentPage == lastView.length) {
        currentPage = 0;
    }

    $.itemScrollableView.scrollToView(currentPage);

}, 4000); 

}

touchEffect.createTouchEffect($.explore_lbl, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.storeLocator, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.menuButton, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.logoIcon, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.cartLbl, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.searchLbl, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.overFlowMenuLbl, "#a6ffffff", "#ffffff");

//touchEffect.createTouchEffect($.shopLbl, "#a6333333", "#333333");
touchEffect.createTouchEffect($.storeLocatorLbl, "#a6333333", "#333333");
touchEffect.createTouchEffect($.appoinment, "#a6333333", "#333333");
touchEffect.createTouchEffect($.logoutLbl, "#a6333333", "#333333");

$.searchLbl.addEventListener('click', function(e) {
    Alloy.Globals.addWindowInNav("searchListing");
});

$.storeLocatorLbl.addEventListener('click', function() {
    Alloy.Globals.addWindowInNav("findStore"); 
});


$.cartContainer.addEventListener('click', function(e) {
    if (Ti.App.Properties.getString("access_token")) {
        var quote_id = Ti.App.Properties.getString("quote_id");
        //Ti.API.info('quote_id = '+quote_id);
        Alloy.Globals.addWindowInNav("myBag", quote_id);

    } else {
        Alloy.Globals.addWindowInNav("signIn", "myBag");
    }

});

var platformWidth = Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor;
var sWidth = platformWidth * 80 / 100;

/*TODO need to make changes here*/

//$.collectionContainer.width = "0dp";
//$.collectionContainer.height = "0dp";
$.collectionContainer.width = Ti.UI.FILL;
$.collectionContainer.height = Titanium.UI.SIZE;

/*
 * set slider width
 */
var sliderWidth = parseInt(sWidth);
//Ti.API.info('sliderWidth=' + sliderWidth);
var viewwidth = platformWidth + sliderWidth;
$.fullView.setWidth(viewwidth);
$.mainView.setWidth(platformWidth);
$.fullView.setLeft(-sliderWidth);
$.sliderView.setWidth(sliderWidth);

var toggleStatus = false;

/* zoom-in zoom-out effect */
var animation = require('alloy/animation');
var matrix1 = Ti.UI.create2DMatrix();
matrix1 = matrix1.scale(1, 1);
var zoom = Ti.UI.createAnimation({
    transform : matrix1,
    duration : 400,
    anchorPoint : {
        x : 0,
        y : 0.5
    }
});
var matrix2 = Ti.UI.create2DMatrix();
matrix2 = matrix2.scale(1, 0.90);
//0.75
var zoomout = Ti.UI.createAnimation({
    transform : matrix2,
    duration : 400,
});
/* zoom-in zoom-out effect */

var sliderView = $.fullView;
function leftMove() {
    $.fadeView.setTouchEnabled(false);
    sliderView.animate({
        left : -sliderWidth,
        duration : 400
    });
    $.mainView.animate(zoom);
    animation.fadeOut($.fadeView, 400);
    toggleStatus = false;
}

function leftMoveForSlider() {
    $.fadeView.setTouchEnabled(false);
    sliderView.animate({
        left : -sliderWidth,
        duration : 300
    });
    $.mainView.animate(zoom);
    animation.fadeOut($.fadeView, 300);
    toggleStatus = false;
}

function rightMove(argument) {
    $.fadeView.setBackgroundColor("#b3000000");
    $.fadeView.setTouchEnabled(true);
    sliderView.animate({
        left : 0,
        duration : 400
    });
    $.fadeView.animate({
        backgroundColor : "#b3000000", //739e0100
        zIndex : 100,
        duration : 400
    });

    $.mainView.animate(zoomout);
    animation.fadeIn($.fadeView, 400);
    toggleStatus = true;
}

function toggleSlider(e) {
    if (toggleStatus) {
        leftMove();
    } else {
        rightMove();
    }
}

$.menuButton.removeEventListener('click', toggleSlider);
$.fadeView.removeEventListener('click', toggleSlider);
$.menuButton.addEventListener('click', toggleSlider);
$.fadeView.addEventListener('click', toggleSlider);
/*
 * as per device,set dynamic height to scrollable view
 */
$.itemScrollableView.height = Ti.Platform.displayCaps.platformHeight / Ti.Platform.displayCaps.logicalDensityFactor - 58;
//61
$.dashboardImage.height = Ti.Platform.displayCaps.platformHeight / Ti.Platform.displayCaps.logicalDensityFactor - 58;
//61
$.opac.height = Ti.Platform.displayCaps.platformHeight / Ti.Platform.displayCaps.logicalDensityFactor - 58;
//61

/*
 * as per device,set dynamic height and width to categories container
 */
var buttonWidth,
    x,
    buttonHeight;
buttonWidth = parseInt((Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor) - 50);
x = buttonWidth - 15;
buttonHeight = parseInt(x / 2);
var height = parseInt(buttonWidth / 3);
$.categoriesContainer.width = buttonWidth;
$.categoriesContainer.height = height * 4;
$.upCategoryContainer.height = height;
$.downCategoryContainer.height = height;

$.beddingCategoryContainer.height = height;
$.rugsCategoryContainer.height = height;


$.collectionLbl.width = parseInt(buttonWidth / 3);
$.curtainsLbl.width = parseInt(buttonWidth / 3);
$.upholsteryLbl.width = parseInt(buttonWidth / 3);
$.beddingsLbl.width = parseInt(buttonWidth / 3);
$.wallpaperLbl.width = parseInt(buttonWidth / 3);
$.blindsLbl.width = parseInt(buttonWidth / 3);

$.rmcLbl.width = parseInt(buttonWidth / 3);
$.cushionLbl.width = parseInt(buttonWidth / 3);
$.towelLbl.width = parseInt(buttonWidth / 3);
$.rugsLbl.width = parseInt(buttonWidth / 3);


$.explore_lbl.removeEventListener('click', exploreScroll);
$.explore_lbl.addEventListener('click', exploreScroll);

function exploreScroll(e) {

    $.collectionContainer.width = Ti.UI.FILL;
    $.collectionContainer.height = Titanium.UI.SIZE;
    var abc = 235 + (height * 2);
    var val = reverseXhdpi();
    var b = parseInt(abc * val);
    //val=3
    var j = 1;
    var k = parseInt(b / 10);
    var interval = setInterval(function() {
        if (j == 10) {
            j = 1;
            clearInterval(interval);
        } else {
            $.dashboardScroll.scrollTo(0, k * j);
            // $.dashboardNavigation.backgroundColor="#737373";
            j++;
        }
    }, 25);
    $.explore_lbl.touchEnabled = false;

}

$.dashboardScroll.removeEventListener('scroll', headerEffect);
$.dashboardScroll.addEventListener('scroll', headerEffect);

function headerEffect(e) {
   // Ti.API.info('scroll event');
    var ycordinates = $.dashboardScroll.contentOffset.y;
    var xcordinates = $.dashboardScroll.contentOffset.x;
    if (ycordinates == 0 && xcordinates == 0) {
       // Ti.API.info('into this condtion');
        $.explore_lbl.touchEnabled = true;
        //$.collectionContainer.height = 0;
        //$.explore_lbl.fireEvent("click");
    }
    if (ycordinates >= 0 && ycordinates < 300) {
        $.dashboardNavigation.backgroundColor = "#00231f20";
    } else if (ycordinates > 620 && ycordinates < 640) {
        $.dashboardNavigation.backgroundColor = "#0D231f20";
    } else if (ycordinates > 640 && ycordinates < 660) {
        $.dashboardNavigation.backgroundColor = "#1a231f20";
    } else if (ycordinates > 660 && ycordinates < 680) {
        $.dashboardNavigation.backgroundColor = "#26231f20";
    } else if (ycordinates > 680 && ycordinates < 700) {
        $.dashboardNavigation.backgroundColor = "#33231f20";
    } else if (ycordinates > 700 && ycordinates < 720) {
        $.dashboardNavigation.backgroundColor = "#40231f20";
    } else if (ycordinates > 720 && ycordinates < 740) {
        $.dashboardNavigation.backgroundColor = "#4d231f20";
    } else if (ycordinates > 740 && ycordinates < 760) {
        $.dashboardNavigation.backgroundColor = "#59231f20";
    } else if (ycordinates > 760 && ycordinates < 780) {
        $.dashboardNavigation.backgroundColor = "#66231f20";
    } else if (ycordinates > 780 && ycordinates < 800) {
        $.dashboardNavigation.backgroundColor = "#73231f20";
    } else if (ycordinates > 800 && ycordinates < 820) {
        $.dashboardNavigation.backgroundColor = "#80231f20";
    } else if (ycordinates > 820 && ycordinates < 840) {
        $.dashboardNavigation.backgroundColor = "#8c231f20";
    } else if (ycordinates > 840 && ycordinates < 860) {
        $.dashboardNavigation.backgroundColor = "#99231f20";
    } else if (ycordinates > 860 && ycordinates < 880) {
        $.dashboardNavigation.backgroundColor = "#a6231f20";
    } else if (ycordinates > 880 && ycordinates < 900) {
        $.dashboardNavigation.backgroundColor = "#b3231f20";
    } else if (ycordinates > 900 && ycordinates < 920) {
        $.dashboardNavigation.backgroundColor = "#bf231f20";
    } else if (ycordinates > 920 && ycordinates < 940) {
        $.dashboardNavigation.backgroundColor = "#cc231f20";
    } else if (ycordinates > 940 && ycordinates < 960) {
        $.dashboardNavigation.backgroundColor = "#d9231f20";
    } else if (ycordinates > 960 && ycordinates < 980) {
        $.dashboardNavigation.backgroundColor = "#e6231f20";
    } else if (ycordinates > 980 && ycordinates < 1000) {
        $.dashboardNavigation.backgroundColor = "#f2231f20";
    } else if (ycordinates > 1000) {
        $.dashboardNavigation.backgroundColor = "#ff231f20";
    }
    //require("icon").setColor($.dashboardNavigation,ycordinates);
}

$.menuScroll.removeEventListener('singletap', categoryOption);
$.menuScroll.addEventListener('singletap', categoryOption);

function categoryOption(e) {
    //Ti.API.info('e=e'+JSON.stringify(e.source));
    try {
        var view = Ti.UI.createView({
            width : Ti.UI.FILL,
            height : Ti.UI.SIZE,
            layout : "vertical",
            top : "5dp"
        });
        var seperator = Ti.UI.createView({
            height : "1dp",
            width : Titanium.UI.FILL,
            backgroundColor : "#4d000000",
            top : "10dp"
        });

        switch(e.source.id) {
        case "ourrangeContainer":
            subCategory = [];
            for (var i = 0; i < categoryData.length; i++) {
                subCategory.push(categoryData[i].name.toUpperCase());
            }
            _.each(subCategory, function(value, k) {
                label[k] = Ti.UI.createLabel({
                    text : value,
                    id : categoryData[k].categoryId
                });
                view.add(label[k]);
                $.addClass(label[k], "subCategories");
                touchEffect.createTouchEffect(label[k], "#a6333333", "#333333");
            });
            view.add(seperator);
            break;
        case "inspiredContainer":
            subCategory = [];
            subCategory = ["STYLE DISCOVERY", "SHOP BY LOOK", "D'IMAGINER"];
            _.each(subCategory, function(value, k) {
                label[k] = Ti.UI.createLabel({
                    text : value,
                    id : categoryData[k].categoryId
                });
                view.add(label[k]);
                $.addClass(label[k], "subCategories");
                touchEffect.createTouchEffect(label[k], "#a6333333", "#333333");
            });
            view.add(seperator);
            break;
         case "eshopContainer":
            subCategory = [];
            for (var i = 0; i < eshopData.length; i++) {
                subCategory.push(eshopData[i].name.toUpperCase());
            }
            _.each(subCategory, function(value, k) {
                label[k] = Ti.UI.createLabel({
                    text : value,
                    id : eshopData[k].categoryId
                });
                view.add(label[k]);
                $.addClass(label[k], "subCategories");
                touchEffect.createTouchEffect(label[k], "#a6333333", "#333333");
            });
            view.add(seperator);
            break;
        };
        var data = ["ourrangeContainer", "inspiredContainer","eshopContainer"];

        if (data.indexOf(e.source.id) > -1 && e.source.children.length == 1 && e.source.type == "scroll") {

            if (e.source.category == 1 && e.source.children.length == 1) {
                e.source.children[0].children[0].color = "#e65e48";
                e.source.children[0].children[1].text = Alloy.Globals.icon.dropDown;
                e.source.add(view);
                flag = false;

                if (!isNullVal($.inspiredContainer.children[1])) {
                    Ti.API.info('inside if 1');
                    $.inspiredContainer.children[0].children[0].color = "#333333";
                    $.inspiredContainer.children[0].children[1].text = Alloy.Globals.icon.downArrow;
                    $.inspiredContainer.remove($.inspiredContainer.children[1]);
                    $.inspiredContainer.children[1] = null;
                }

                if (!isNullVal($.eshopContainer.children[1])) {
                    Ti.API.info('inside if 3');
                    $.eshopContainer.children[0].children[0].color = "#333333";
                    $.eshopContainer.children[0].children[1].text = Alloy.Globals.icon.downArrow;
                    $.eshopContainer.remove($.eshopContainer.children[1]);
                    $.eshopContainer.children[1] = null;

                }
            } else if (e.source.category == 2 && e.source.children.length == 1) {

                e.source.children[0].children[0].color = "#e65e48";
                e.source.children[0].children[1].text = Alloy.Globals.icon.dropDown;
                e.source.add(view);
                flag = false;

                if (!isNullVal($.ourrangeContainer.children[1])) {
                    Ti.API.info('inside if 2');
                    $.ourrangeContainer.children[0].children[0].color = "#333333";
                    $.ourrangeContainer.children[0].children[1].text = Alloy.Globals.icon.downArrow;
                    $.ourrangeContainer.remove($.ourrangeContainer.children[1]);
                    $.ourrangeContainer.children[1] = null;

                }
                
                if (!isNullVal($.eshopContainer.children[1])) {
                    Ti.API.info('inside if 3');
                    $.eshopContainer.children[0].children[0].color = "#333333";
                    $.eshopContainer.children[0].children[1].text = Alloy.Globals.icon.downArrow;
                    $.eshopContainer.remove($.eshopContainer.children[1]);
                    $.eshopContainer.children[1] = null;

                }

            }else if (e.source.category == 3 && e.source.children.length == 1) {

                e.source.children[0].children[0].color = "#e65e48";
                e.source.children[0].children[1].text = Alloy.Globals.icon.dropDown;
                e.source.add(view);
                flag = false;

                if (!isNullVal($.inspiredContainer.children[1])) {
                    Ti.API.info('inside if 1');
                    $.inspiredContainer.children[0].children[0].color = "#333333";
                    $.inspiredContainer.children[0].children[1].text = Alloy.Globals.icon.downArrow;
                    $.inspiredContainer.remove($.inspiredContainer.children[1]);
                    $.inspiredContainer.children[1] = null;
                }
                
                if (!isNullVal($.ourrangeContainer.children[1])) {
                    Ti.API.info('inside if 2');
                    $.ourrangeContainer.children[0].children[0].color = "#333333";
                    $.ourrangeContainer.children[0].children[1].text = Alloy.Globals.icon.downArrow;
                    $.ourrangeContainer.remove($.ourrangeContainer.children[1]);
                    $.ourrangeContainer.children[1] = null;

                }

            }

        } else if (data.indexOf(e.source.id) > -1 && e.source.children[1]) {

            e.source.children[0].children[0].color = "#333333";
            e.source.children[0].children[1].text = Alloy.Globals.icon.downArrow;
            e.source.remove(e.source.children[1]);
            e.source.children[1] = null;
            flag = true;

        } else {

            if (e.source.text) {
                //Ti.API.info('e.source.text = ' + e.source.text);
                leftMoveForSlider();

                switch(e.source.text) {
                case "SHOP BY LOOK":
                    var shopByLookData = "";
                    shopByLookData = {
                        type : "shopByLook"
                    };
                    setTimeout(function() {
                        Alloy.Globals.addWindowInNav("productListing", shopByLookData);
                    }, 50);
                    break;

                case "COLLECTION":
                    setTimeout(function() {
                        collectionAllData = {
                            //wName : "COLLECTION",
                            categoryId : e.source.id,
                            categoryName : "COLLECTION",
                            WindowName : "COLLECTIONS",
                            type : "collection",
                            block : "Allcollection"
                        };

                        Alloy.Globals.addWindowInNav("productListing", collectionAllData);
                    }, 50);
                    break;

                case "STYLE DISCOVERY":

                    // if (Ti.App.Properties.getString("access_token")){
                    setTimeout(function() {
                        Alloy.Globals.addWindowInNav("styleDiscovery");
                    }, 50);

                    // }
                    // else{
                    // Alloy.Globals.addWindowInNav("signIn");
                    // }

                    break;

                case "SHOP":
                    setTimeout(function() {
                        Alloy.Globals.addWindowInNav("eshop"); // commented for time begin
                    }, 50);
                    break;
                case "CURTAINS":
                Ti.API.info('e.source.id = '+e.source.id);
                    setTimeout(function() {
                        collectionAllData = {
                            wName : "CURTAINS",
                            categoryId : e.source.id,
                            type : "C_Product",
                            categoryType : "Collectionfabrics",
                            categoryName:"CURTAINS"
                        };

                        Alloy.Globals.addWindowInNav("productListing", collectionAllData);
                    }, 50);
                    break;

                case "WALLPAPER":
                    setTimeout(function() {
                        collectionAllData = {
                            wName : "WALLPAPERS",
                            categoryId : e.source.id,
                            type : "C_Product",
                            categoryType : "wallpaper",
                            categoryName:"WALLPAPERS"
                        };

                        Alloy.Globals.addWindowInNav("productListing", collectionAllData);
                    }, 50);
                    break;
                case "UPHOLSTERY":
                    setTimeout(function() {
                        collectionAllData = {
                            wName : "UPHOLSTERY",
                            categoryId : e.source.id,
                            type : "C_Product",
                            categoryType : "Collectionfabrics",
                            categoryName:"UPHOLSTERY"
                        };

                        Alloy.Globals.addWindowInNav("productListing", collectionAllData);
                    }, 50);
                    break;
                case "D'IMAGINER":
                    setTimeout(function() {
                        // dImaginer = Alloy.createController('dImaginer').getView();
                        // $.dashboard.add(dImaginer);
                        // dImaginer.visible = true;
                        Alloy.Globals.addWindowInNav("dImaginer");
                    }, 50);
                    break;

                case "BED LINEN":
                    setTimeout(function() {
                        // beddingContainer = Alloy.createController('beddings').getView();
                        // $.dashboard.add(beddingContainer);
                        // hideShowView(beddingContainer);
                         Alloy.Globals.addWindowInNav("beddings");
                    }, 50);
                    break;

                case "BLINDS":
                    setTimeout(function() {
                        //Alloy.Globals.addWindowInNav("allBlinds");
                        Alloy.Globals.addWindowInNav("blinds");
                    }, 50);
                    break;
                    
                case "READY MADE CURTAINS":
                 setTimeout(function() {
                     var collectionAllData = {
                        wName : "",
                        categoryId : e.source.id,
                        type : "C_Product",
                        categoryType : "shop",
                        subTitle : "READY MADE CURTAINS",
                        categoryName : "BED LINEN",
                        category : "BED LINEN",
                    };
    
                    Alloy.Globals.addWindowInNav("productListing", collectionAllData);
                }, 50);
                    break;
                
                case "CUSHION":
                    setTimeout(function() {
                         var collectionAllData = {
                            wName : "",
                            categoryId : e.source.id,
                            type : "C_Product",
                            categoryType : "shop",
                            subTitle : "CUSHION",
                            categoryName : "BED LINEN",
                            category : "BED LINEN",
                        };
    
                    Alloy.Globals.addWindowInNav("productListing", collectionAllData);
                }, 50);
                    break;
                
                case "TOWEL":
                    setTimeout(function() {
                         var collectionAllData = {
                            wName : "",
                            categoryId : e.source.id,
                            type : "C_Product",
                            categoryType : "shop",
                            subTitle : "TOWEL",
                            categoryName : "BED LINEN",
                            category : "BED LINEN",
                        };
    
                    Alloy.Globals.addWindowInNav("productListing", collectionAllData);
                }, 50);
                    break;    
                    
                     case "RUGS":
                    setTimeout(function() {
                         var collectionAllData = {
                            wName : "",
                            categoryId : e.source.id,
                            type : "C_Product",
                            categoryType : "shop",
                            subTitle : "RUGS",
                            categoryName : "RUGS",
                            category : "RUGS",
                        };
    
                    Alloy.Globals.addWindowInNav("productListing", collectionAllData);
                }, 50);
                    break;  

                };

            }

            //}
            else {
                //Ti.API.info('else');
            }

        }
    } catch(ex) {
        Ti.API.info('catch = e' +(ex.message));
    }
}

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

// $.wallpaperLbl.addEventListener('click',function(e){
// Alloy.createController('customerService').getView().open();
// });

function navigateToMyAccount() {
    //Alloy.createController('myaccount').getView().open();
    //$.dashboard.close();
    leftMoveForSlider();
    setTimeout(function() {
        Alloy.Globals.addWindowInNav("myaccount");
    }, 50);
    //Alloy.Globals.addWindowInNav('myaccount');

}

touchEffect.createTouchEffect($.homeLbl, "#a6333333", "#333333");
touchEffect.createTouchEffect($.appoinmantLbl, "#a6333333", "#333333");
// touchEffect.createTouchEffect($.terms_condition, "#a6333333", "#333333");
touchEffect.createTouchEffect($.customerService, "#a6333333", "#333333");

touchEffect.createTouchEffect($.return_refund, "#a6333333", "#333333");
touchEffect.createTouchEffect($.faq, "#a6333333", "#333333");

$.overFlowMenuLbl.removeEventListener('click', showOverFlow);
$.overFlowMenuLbl.addEventListener('click', showOverFlow);

function showOverFlow(e) {
    //$.overFlowView.visible=true;
    $.openView.visible = true;
    Alloy.Globals.overFlowFlag = true;
}

$.overFlowView.removeEventListener('click', hideOverFlow);
$.overFlowView.addEventListener('click', hideOverFlow);
$.openView.addEventListener('click', hideOverFlow);
function hideOverFlow(e) {

    if (Alloy.Globals.overFlowFlag) {
        //$.overFlowView.visible=false;
        $.openView.visible = false;

        Alloy.Globals.overFlowFlag = false;
    }
};

$.dashboardScroll.removeEventListener('click', hideOverFlow);
$.dashboardScroll.addEventListener('click', hideOverFlow);

//setTimeout(function(){ geolocation(); }, 1000);

function geolocation() {

    Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS, function(e) {
        if (e.success) {
            //Ti.Media.requestCameraPermissions();
            Ti.Media.requestCameraPermissions(function(e) {
                if (e.success) {
                    setDashboardData(homePageData);
                }
            });
        } else {
            Ti.Media.requestCameraPermissions();
        }
    });

    Ti.Media.requestCameraPermissions(function(e) {
        if (e.success) {
            setDashboardData(homePageData);
        }
    });
}

/*
 * set dashboard data
 */


function setDashboardData(e){

   // geolocation();
   
    categoryData = e.data.banner_category.category;
    eshopData = e.data.banner_category.shop;
    
    setTimeout(function(){ geolocation(); }, 1500);
 
    try{
        var banner = e.data.home_page_banner;
        loadedViews = []; 
        imageview = [];
        imageViewContainer = [];
        vwlbl = [];
        lbl1 = [];
       
        $.estoreImage.setImage(e.data.banner_category.store_image);
        $.styleImg.setImage(e.data.banner_category.store_image3);
        $.exploreImg.setImage(e.data.banner_category.store_image2);
        $.itemScrollableView.cacheSize = e.data.home_page_banner.length;
        
         
        _.each(e.data.home_page_banner, function(value, k) {
        	         
            imageViewContainer[k] = Ti.UI.createView({ 
               width : Ti.UI.FILL,
                height:Ti.UI.FILL,
            });  
            
            vwlbl[k] = Ti.UI.createView({ 
        		top:"130dp", 
        		left:"10dp",
        		 right:"10dp",
        		 zIndex:"12",
        		 //backgroundColor : 'red',
        		 height:Titanium.UI.SIZE
        		
        	});
        	
        	lbl1[k] = Ti.UI.createLabel({
					top : "0dp",
					left : "0dp",
					text : value.banner_title,
					font : {
						fontFamily : "futura_lt_bt_light-webfont",
						fontSize : "23dp"
					},
					color : "#c0bebc"
				});
            							 
				 	vwlbl[k].add(lbl1[k]);								 
           imageViewContainer[k].add(vwlbl[k]);
            
            
            imageview[k] = Ti.UI.createImageView({ 
                image : encodeURI(value.banner_image),
                callAction : encodeURI(value.banner_click),
                data : value,
                //image : "/images/landingPage.jpg",
                width : Ti.UI.FILL,
                height:Ti.UI.FILL,
                //height : ((Ti.Platform.displayCaps.platformHeight / Ti.Platform.displayCaps.logicalDensityFactor - 58)*52/100),               
               // bottom:"25dp",
            });
            
            imageViewContainer[k].add(imageview[k]);
            
            //imageViewContainer[k]= (imageview[k]);
            
            loadedViews.push(imageViewContainer[k]);
        });
        
         $.itemScrollableView.views = loadedViews;
         
        if(e.data.home_page_banner.length){
            $.scrollControllContainer.add(PagingControl($.itemScrollableView));
        }
        
        
        /*Auto Scrolling method added*/
        
                 
            try {
                
                /*
                setInterval(function(e) {
            
                    //Ti.API.info('auto Scroll****************');
            
                    var lastView = $.itemScrollableView.getViews();
                    var currentPage = $.itemScrollableView.getCurrentPage() + 1;
                    if (currentPage == lastView.length) {
                        currentPage = 0;
                    }
            
                    $.itemScrollableView.scrollToView(currentPage);
            
                }, 5000);
                */
               
               setHomeBannerInterval();
            
            } catch(exp) {
                Ti.API.info('exp--->' + exp.message);
            }
            


        /*Auto Scrolling method added */
         
        var categoryIds = e.data.banner_category.category;
        
        for (var i = 0; i < e.data.banner_category.category.length; i++) {
        
                switch(categoryIds[i].name){
                
                    case "Collection":
                        $.collectionView.typeId=categoryIds[i].categoryId;
                    
                    break;
                    
                    case "Curtains":
                         $.curtainsView.typeId=categoryIds[i].categoryId;
                    
                    break;
                    
                    case "Upholstery":
                        $.upholsteryView.typeId=categoryIds[i].categoryId;
                    
                    break;
                    
                    case "Bed Linen":
                         $.beddingsView.typeId=categoryIds[i].categoryId;
                    
                    break;
                    
                    case "Wallpaper":
                         $.wallpaperView.typeId=categoryIds[i].categoryId;
                    
                    break;
                    
                    case "Blinds":
                         $.blindsView.typeId=categoryIds[i].categoryId;
                    
                    break; 
                    
                    case "Ready Made Curtains":
                         $.rmcView.typeId=categoryIds[i].categoryId;
                    
                    break; 
                    
                    case "Cushion":
                        $.cushionView.typeId=categoryIds[i].categoryId;        
                    break; 
                    case "Towel":
                        $.towelView.typeId=categoryIds[i].categoryId;        
                    break;   
                    case "Rugs":
                   $.rugsView.typeId=categoryIds[i].categoryId;        
                    break; 
                };
        }
        
        
        
        
    }
    catch(ex){
        Ti.API.info('catch e= ' +(ex.message));
    }
    
}  

$.itemScrollableView.addEventListener('click',function(e){
    if(!isNullVal(e.source.data.action)){
        if(e.source.data.action == "App Page"){
            if(e.source.data.product_id){          
                bannerNavigation.bannerNavigation(e.source.data.category_name,e.source.data.category_id,e.source.data.product_id);            
            }else{ 
                if(e.source.data.category_name == "Appoinment"){
                    navigateToAppointment();
                }else if(e.source.data.category_name == "Search"){
                    bannerNavigation.bannerSearchNavigation(e.source.data.category_name,e.source.data.search_term);    
                }else{
                    bannerNavigation.bannerNavigation(e.source.data.category_name,e.source.data.category_id);    
                }     
            }
             
         }else if(e.source.data.action == "Web"){
             bannerNavigation.bannerWebNavigation(e.source.data.web_url);
         }else{
             Ti.API.info('no hits');
         }
     }
   
    //Ti.API.info('e scrollview = '+JSON.stringify(e)); 
});


$.itemScrollableView.addEventListener("scrollend", function(e) {
    try{
    var numberOfPages = $.itemScrollableView.getViews().length;
    for (var i = 0; i < numberOfPages; i++) {
        $.scrollControllContainer.children[0].children[i].setBackgroundColor("#80e7e7e7");
    }
    $.scrollControllContainer.children[0].children[e.currentPage].setBackgroundColor("#e65e48");
    }
    catch(exp){
        //Ti.API.info('scrollend expection--->'+ exp.message);
    }
    
});

Alloy.Globals.checkLogin = function(e) {

    if (Ti.App.Properties.getString("access_token")) {

        $.nameLabel.text = (Ti.App.Properties.getString("firstname").capitalize() + " " + Ti.App.Properties.getString("lastname").capitalize());
        $.emailLabel.text = Ti.App.Properties.getString("email");
        $.editProfile.visible = true;
        $.logoutLbl.visible = true;
    } else {

        $.nameLabel.text = "Welcome Guest!";
        $.emailLabel.text = "Login/Register";
        $.editProfile.visible = false;
        $.logoutLbl.visible = false;
    }
};

//checkLogin();
Alloy.Globals.checkLogin();

$.upCategoryContainer.removeEventListener('click', firstCategoryContainer);
$.upCategoryContainer.removeEventListener('touchstart', touchStartView);
$.upCategoryContainer.removeEventListener('touchcancel', touchCancelView);
$.upCategoryContainer.removeEventListener('touchend', touchCancelView);

$.upCategoryContainer.addEventListener('click', firstCategoryContainer);
$.upCategoryContainer.addEventListener('touchstart', touchStartView);
$.upCategoryContainer.addEventListener('touchcancel', touchCancelView);
$.upCategoryContainer.addEventListener('touchend', touchCancelView);





function firstCategoryContainer(e) {

    switch(e.source.id) {
    case "collectionView":
        //touchStartView(e);
        Alloy.Globals.addWindowInNav("allCollections");
        break;

    case "curtainsView":
        // collectionAllData = {
            // categoryName : "CURTAIN",
            // WindowName : "CURTAINS",
            // type : "collection",
            // block : "collection"
        // };
// 
        // Alloy.Globals.addWindowInNav("productListing", collectionAllData);
        
        collectionAllData = {
            wName : "CURTAINS",
            categoryId : e.source.typeId,
            type : "C_Product",
            categoryType : "Collectionfabrics",
            categoryName : "CURTAINS",
         };

         Alloy.Globals.addWindowInNav("productListing", collectionAllData);

        break;

    case "upholsteryView":
    
        // collectionAllData = {
            // categoryName : "UPHOLSTERY",
            // WindowName : "UPHOLSTERY",
            // type : "collection",
            // block : "collection"
        // };
// 
        // Alloy.Globals.addWindowInNav("productListing", collectionAllData);
        
         collectionAllData = {
            wName : "UPHOLSTERY",
            categoryId : e.source.typeId,
            type : "C_Product",
            categoryType : "Collectionfabrics",
            categoryName : "UPHOLSTERY",
          };

          Alloy.Globals.addWindowInNav("productListing", collectionAllData);

        break;
    }
}

function touchStartView(e) {
    e.source.children[0].color = "#a6000000";
    e.source.children[1].color = "#a6000000";
}

function touchCancelView(e) {
    e.source.children[0].color = "#000000";
    e.source.children[1].color = "#000000";
}

$.downCategoryContainer.removeEventListener('click', secondCategoryContainer);
$.downCategoryContainer.removeEventListener('touchstart', touchStartView);
$.downCategoryContainer.removeEventListener('touchcancel', touchCancelView);
$.downCategoryContainer.removeEventListener('touchend', touchCancelView);

$.downCategoryContainer.addEventListener('click', secondCategoryContainer);
$.downCategoryContainer.addEventListener('touchstart', touchStartView);
$.downCategoryContainer.addEventListener('touchcancel', touchCancelView);
$.downCategoryContainer.addEventListener('touchend', touchCancelView);

function secondCategoryContainer(e) {

    switch(e.source.id) {

    case "beddingsView":
        // beddingContainer = Alloy.createController('beddings').getView();
        // $.dashboard.add(beddingContainer);
        // hideShowView(beddingContainer);
        
        Alloy.Globals.addWindowInNav("beddings");

        break;

    case "wallpaperView":
        collectionAllData = {
            wName : "WALLPAPERS",
            categoryId : e.source.typeId,
            type : "C_Product",
            categoryType : "wallpaper",
            categoryName : "wallpaper"
        };

        Alloy.Globals.addWindowInNav("productListing", collectionAllData);

        break;

    case "blindsView":

        //touchStartView(e);
        //Alloy.Globals.addWindowInNav("allBlinds");

        Alloy.Globals.addWindowInNav("blinds");
        break;

    }
}


$.beddingCategoryContainer.removeEventListener('click', thirdCategoryContainer);
$.beddingCategoryContainer.removeEventListener('touchstart', touchStartView);
$.beddingCategoryContainer.removeEventListener('touchcancel', touchCancelView);
$.beddingCategoryContainer.removeEventListener('touchend', touchCancelView);

$.beddingCategoryContainer.addEventListener('click', thirdCategoryContainer);
$.beddingCategoryContainer.addEventListener('touchstart', touchStartView);
$.beddingCategoryContainer.addEventListener('touchcancel', touchCancelView);
$.beddingCategoryContainer.addEventListener('touchend', touchCancelView);


function thirdCategoryContainer(e) {

    switch(e.source.id) {

    case "rmcView":
        var collectionAllData = {
            wName : "",
            categoryId : e.source.typeId,
            type : "C_Product",
            categoryType : "shop",
            subTitle : "READY MADE CURTAINS",
            categoryName : "BED LINEN",
            category : "BED LINEN",
        };
    
        Alloy.Globals.addWindowInNav("productListing", collectionAllData);
           
    break;
    
    case "cushionView":
        var collectionAllData = {
            wName : "",
            categoryId : e.source.typeId,
            type : "C_Product",
            categoryType : "shop",
            subTitle : "CUSHION",
            categoryName : "BED LINEN",
            category : "BED LINEN",
        };
    
        Alloy.Globals.addWindowInNav("productListing", collectionAllData);
           
    break;
    
    
    case "towelView":
        var collectionAllData = {
            wName : "",
            categoryId : e.source.typeId,
            type : "C_Product",
            categoryType : "shop",
            subTitle : "TOWEL",
            categoryName : "BED LINEN",
            category : "BED LINEN",
        };
    
        Alloy.Globals.addWindowInNav("productListing", collectionAllData);
           
    break;


    }
}

$.rugsCategoryContainer.removeEventListener('click', fourthCategoryContainer);
$.rugsCategoryContainer.removeEventListener('touchstart', touchStartView);
$.rugsCategoryContainer.removeEventListener('touchcancel', touchCancelView);
$.rugsCategoryContainer.removeEventListener('touchend', touchCancelView);

$.rugsCategoryContainer.addEventListener('click', fourthCategoryContainer);
$.rugsCategoryContainer.addEventListener('touchstart', touchStartView);
$.rugsCategoryContainer.addEventListener('touchcancel', touchCancelView);
$.rugsCategoryContainer.addEventListener('touchend', touchCancelView);

function fourthCategoryContainer(e) {

    switch(e.source.id) {

    case "rugsView":
        var collectionAllData = {
             wName : "",
            categoryId : e.source.typeId,
            type : "C_Product",
            categoryType : "shop",
            subTitle : "RUGS",
            categoryName : "RUGS",
            category : "RUGS",
        };
    
        Alloy.Globals.addWindowInNav("productListing", collectionAllData);
           
    break;

    }
}



function navigateToStoreLocater() {

    Alloy.Globals.addWindowInNav("findStore");
}

$.sliderProfileContainer.removeEventListener('click', navigateToLoginAccount);
$.sliderProfileContainer.addEventListener('click', navigateToLoginAccount);

function navigateToLoginAccount(e) {

    if (isNullVal(Ti.App.Properties.getString("access_token"))) {
        if ((e.source.text == "Welcome Guest!" || e.source.text == "Login/Register")) {
            Alloy.Globals.addWindowInNav("signIn", "dashboard");
            if (toggleStatus) {
                leftMove();
            } else {
                rightMove();
            }
        }
    } else {
        if ((e.source.text != "Welcome Guest!" || e.source.text != "Login/Register") || e.source.type == "user_image") {
            navigateToMyAccount();
        }
    }
}

$.logoutLbl.removeEventListener('click', logout);
$.logoutLbl.addEventListener('click', logout);

function logout(e) {
    Alloy.Globals.fb.logout();

    Alloy.Globals.googleAuth.deAuthorize(function(e) {
        //Ti.API.info('google logout');
    }, $.dashboard);

    Ti.App.Properties.setString("firstname", "");
    Ti.App.Properties.setString("lastname", "");
    Ti.App.Properties.setString("email", "");
    Ti.App.Properties.setString("contact_number", "");
    Ti.App.Properties.setString("gender", "");
    Ti.App.Properties.setString("image", "");
    Ti.App.Properties.setString("access_token", "");
    Ti.App.Properties.setString("GaCustomerId", "");
    Ti.App.Properties.setString("quote_id", "");
    Ti.App.Properties.setString("cartCount", "");
    Ti.App.Properties.setString("shortListCount", "");

    if (toggleStatus) {
        leftMove();
    } else {
        rightMove();
    }

    updateCount();

    Alloy.Globals.checkLogin();
    //Alloy.createController('signIn').getView().open();
    //Alloy.Globals.popWindowInNav();
    //$.dashboard.close();
    
}

var toast = Ti.UI.createNotification({
    message : "Press Again To Exit",
    duration : Titanium.UI.NOTIFICATION_DURATION_SHORT
});

$.dashboard.add(toast);

$.dashboard.addEventListener("focus", function() {
    closeFlag = false;
});

$.dashboard.addEventListener('android:back', function(e) {

    if (appointmentFlag) {
        appointmentFlag = false;
    } else if (beddingContainer.type == "beddingVIEW") {
        if (beddingContainer.children[3].getVisible()) {
            beddingContainer.children[3].setVisible(false);
        } else {
            hideShowView(beddingContainer);
            beddingContainer = "";
        }
    }else if(dImaginer.visible){
        Alloy.Globals.dimaginer.gotoback();
        dImaginer.visible = false;
    }
    else {

        if (!Alloy.Globals.bookAppoinmentWindow) {
            if (!closeFlag) {
                toast.show();
                closeFlag = true;
                setTimeout(function() {
                    closeFlag = false;
                }, 2000);
            } else {

                $.dashboard.close();
                clearMemory();

               // Alloy.Globals.tracker.endSession();
                Alloy.Globals.destroyWindowInNav();
            }
        }

    }

});

function dashboardData(deviceToken) {
    showFullLoader($.menuScrollContainer);
    
    var userDeviceToken = deviceToken||"";
    Ti.API.info('Titanium.Platform.getId(); = '+Titanium.Platform.getId());
    var deviceId = Titanium.Platform.getId();
    var osName = Titanium.Platform.osname;
    Ti.API.info('osName = '+osName);
      var url = Alloy.Globals.commonUrl.getBanners;
  
     var data = {
        device_type : osName,
        push_id : userDeviceToken,
        unique_id : deviceId
    };
    var requestParams = JSON.stringify(data);
    
    
   // var requestParams={};

    Alloy.Globals.webServiceCall(url, requestParams, dashboardSuccessCallback, dashboardErrorCallback, "POST", $.dashboard, true);
}

function dashboardSuccessCallback(e) {
    Ti.API.info('inside success');
    
    hideFullLoader($.menuScrollContainer);
    try {
        homePageData = e;
        Ti.API.info('param:' + JSON.stringify(homePageData));
       // if (!isNullVal(e.data.other_info.cart_count)) {
           
            Ti.App.Properties.setString("quote_id", e.data.other_info.quote_id);
            Ti.App.Properties.setString("cartCount", e.data.other_info.cart_count);

       // }
       
       if(e.data.other_info.cart_count==0){
            Titanium.App.Properties.setList('removeCartProductIdArray',[]);
            Titanium.App.Properties.setList('cartProductIdArray',[]);
       }
       
        if (!isNullVal(e.data.customer_info.image)) {
            //Ti.API.info('***** image condition****');
            Ti.App.Properties.setString("image", e.data.customer_info.image);

        }

        if (!isNullVal(e.data.other_info.dimaginer_video_url)) {

            Alloy.Globals.DimaginerVideo = e.data.other_info.dimaginer_video_url;

        }
        
        if(!isNullVal(e.data.fabricCalculatorImages)) {
            Alloy.Globals.fabricCalculatorImages = e.data.fabricCalculatorImages;
        }  
     
        setDashboardData(e);
        //Ti.App.fireEvent("updateCartCount");
        //Ti.App.fireEvent("updateCartCountInDashBoard");
        loginViewFlag = e.data.login_view;
        updateCount();
          
        if(Titanium.App.version<e.data.version){
            setTimeout(function(){                
                updateVersion();                
            },3000);
        }else{ 
            if((isNullVal(Ti.App.Properties.getString("access_token")) == true) && e.data.login_view == true) {
                setTimeout(function(){                
                    Alloy.Globals.addWindowInNav("signIn");
                },2000);
                
            }else{
                Ti.API.info('else...');
            }
        }
        
    } catch(e) {
        hideFullLoader($.menuScrollContainer);
        alert("Something went wrong");
    }
}
 
function dashboardErrorCallback(e) {
    hideFullLoader($.menuScrollContainer);
    //Ti.API.info('dashboard error e = ' + JSON.stringify(e));
}

//dashboardData();

function navigateToCustomerService() {

    Alloy.Globals.addWindowInNav('customerService');
}

function navigateToAboutUs() {
    var aboutUs = Alloy.Globals.addWindowInNav('aboutUs');
}

function navigateToFeedback() {

}

function navigateToEstore() {
    Alloy.Globals.addWindowInNav("eshop");
}


$.customerService.addEventListener('click', function(e) {
    Alloy.Globals.addWindowInNav('customerService');
});

$.return_refund.addEventListener('click', function(e) {
    Alloy.Globals.addWindowInNav('returnRefund');
});

$.faq.addEventListener('click', function(e) {
    Alloy.Globals.addWindowInNav('faq');
});

$.privacy.addEventListener('click', function(e) {
    Alloy.Globals.addWindowInNav('privacypolicy');
});

$.appoinmantLbl.addEventListener('click', function(e) {
    if (Ti.App.Properties.getString("access_token")) {
        Alloy.Globals.addWindowInNav('feedBack');
    }else{
        Alloy.Globals.addWindowInNav("signIn");
    }
});

function navigateToAppointment() {

    if (Ti.App.Properties.getString("access_token")) {
        Alloy.Globals.bookAppoinmentWindow = true;

        $.dashboard.add(Alloy.createController("bookappoinment", {
            mainWindow : $.dashboard,
            isDashboard : true
        }).getView());
        appointmentFlag = true;

    } else {
        Alloy.Globals.addWindowInNav("signIn");

    }

}

function clearMemory() {

    Ti.API.info('************** into clear Memory ***************');

    $.removeListener();
    $.dashboard.remove($.fullView);
    $.fullView.removeAllChildren();

    args = {};
    appointmentFlag = null;
    collectionAllData = null;
    flag = null;
    categoryName = null;
    subCategory = [];
    categoryData = [];
    eshopData = [];
    homePageData = [];
    beddingContainer = null;
    label = [];

    $.destroy();

}

function stopImageRotation(){
    Ti.API.info('dashboard window focus lost **************');
    
    clearInterval(setImageRotationInterval);
}


function getPushId(){
    var hostURL = "http://YOUR_HOST_URL/register?";
    
    var gcm = require('com.activate.gcm');
    Ti.API.info('module gcm is => ' + gcm);
    
    Ti.API.info('Registering...');
    
    gcm.registerC2dm
    ( 
        {
            success:function(e)
            {
                
                Ti.API.info('e = = ='+JSON.stringify(e));
                Ti.API.info('JS registration success event: ' + e.registrationId);
                
                
                 dashboardData(e.registrationId);
                
                // Ti.API.info('JS registration success event: ' + e.deviceToken);
                // alert('Yeah JS registration success event: ' + e.registrationId);
                // alert('Sender ID:' + gcm.getSenderId());
                // alert('Registration ID:' + gcm.getRegistrationId());
//                 
                // var appName = Ti.App.name; 
                // var appVersion = Ti.App.version;
//                 
                // var deviceUUID = Ti.Platform.macaddress; // Ti.Network.remoteDeviceUUID;
                // var deviceName = Ti.Platform.username;
                // var deviceModel = Ti.Platform.model;
                // var deviceSystemVersion = Ti.Platform.version;
                // var deviceToken = e.deviceToken;
                // var regId = e.registrationId;
                
                //deviceUUID = deviceUUID.replace(/-/ig,'');
                //deviceToken = deviceToken.replace(/<>/ig, '');

                
                
                /*urlString += "&appname=" + appName;
                urlString += "&appversion=" + appVersion;
                urlString += "&deviceuid=" + deviceUUID;
                urlString += "&devicetoken=" + deviceToken;
                urlString += "&devicename=" + deviceName;
                urlString += "&devicemodel=" + deviceModel;
                urlString += "&deviceversion=" + deviceSystemVersion;*/
               // urlString += "regId=" + regId;
                
               // var loader = Ti.Network.createHTTPClient();
               // loader.setTimeout(60000);
                
                // loader.onload = function(evt)
                // {
                    // alert(evt);
                // }
                
               // loader.open('GET', urlString, false);
               // loader.send();
                
               // alert(urlString);
               
              //  Ti.API.info('JS device token: ' + e.deviceToken);
                
            },
            error:function(e)
            {
                Ti.API.info('error ==============');
                
                dashboardData();
                
              // //  Ti.API.error("Error during registration : " + e.error);
            // //    alert("Error during registration : " + e.error);
//                 
                // var message;
                // if(e.error == "ACCOUNT_MISSING")
                // {
                    // message = "No Google account found; you will need to add on in order to activate notifications";
                // }
// 
                // Titanium.UI.createAlertDialog
                // (
                    // {
                        // title:'Push Notification Setup',
                        // message:message,
                        // buttonNames:['OK']
                    // }
                // ).show(); 
            },
            callback:function(e) // called when a push notification is received
            {
                Ti.API.info('JS message event: ' + JSON.stringify(e.data));
                //alert('JS message event: ' + JSON.stringify(e.data));

                //same as e.data
                //var data = Ti.App.Properties.getString("com.activate.gcm.last_data","");
                //data = JSON.parse(data);
                //Ti.App.Properties.removeProperty("com.activate.gcm.last_data");
                //Ti.App.Properties.hasProperty("com.activate.gcm.last_data");
                //Ti.Android.NotificationManager.cancelAll();

            }
        }
    );


 
}

//getPushId(); 
dashboardData();

/*
 * update version popup
 */

function updateVersion () {
        
    var now = new Date().getTime();
    var remindToRate = Ti.App.Properties.getString('RemindToRate');
    if (!remindToRate) {       
        Ti.App.Properties.setString('RemindToRate', now);
    }
    else if (remindToRate < now) {
       

        var alertDialog = Titanium.UI.createAlertDialog({
            title: 'New version available',
            message: 'Please,update app to new version to continue shopping',
            buttonNames: ['UPDATE', 'REMIND ME LATER', 'NEVER'],
            cancel: 2
        });
        alertDialog.addEventListener('click', function(evt) {
            
            switch (evt.index) {
                case 0: 
                 
                    Ti.App.Properties.setString('RemindToRate', Number.MAX_VALUE);
                    // NOTE: replace this with your own iTunes link; also, this won't WON'T WORK IN THE SIMULATOR!
                    if (Ti.Android) {
                        try{
                             Ti.Android.currentActivity.startActivity(Ti.Android.createIntent({
                                    action : Ti.Android.ACTION_VIEW, 
                                    //type : 'application/pdf',
                                    data : "market://details?id=com.ddecor.digitalEstore"
                                }));
                        }catch(ex){
                            Ti.Android.currentActivity.startActivity(Ti.Android.createIntent({
                                    action : Ti.Android.ACTION_VIEW,
                                    //type : 'application/pdf',
                                    data : "https://play.google.com/store/apps/details?id=com.ddecor.digitalEstore"
                                }));
                         } 
                    } 
                    else { 
                        // Ti.Platform.openURL('https://itunes.apple.com/us/app/ddecor-live-beautiful/id1156973206?ls=1&mt=8');
                    } 
                    break;
                case 1:
                    // "Remind Me Later"? Ok, we'll remind them tomorrow when they launch the app.
                    Ti.App.Properties.setString('RemindToRate', now + (1000 * 60 * 60 * 24));
                    
                    if((isNullVal(Ti.App.Properties.getString("access_token")) == true) && loginViewFlag == true) {
                        setTimeout(function(){                
                             Alloy.Globals.addWindowInNav("signIn");
                        },2000);
                    }
                    break;
                case 2:
                    if(evt.button){
                      Ti.App.Properties.setString('RemindToRate', Number.MAX_VALUE);
                      
                      if((isNullVal(Ti.App.Properties.getString("access_token")) == true) && loginViewFlag == true) {
                            setTimeout(function(){                
                                Alloy.Globals.addWindowInNav("signIn");
                            },2000);               
                        }
                    }
                    
                    break;
            }
        });
        alertDialog.show();
    }else{
        Ti.API.info('close');
        
        if((isNullVal(Ti.App.Properties.getString("access_token")) == true) && loginViewFlag == true) {
            setTimeout(function(){                
                Alloy.Globals.addWindowInNav("signIn");
            },1200);               
         }
                           
    }

} 
 

// var abc = "";
// ////////////////////// camp
// 
// var InstallReferrer = require('net.pixelfactor.installreferrer');
// var utmSource = InstallReferrer.getUtmSource();
// if (utmSource != null) {
    // var view = Ti.UI.createView({
        // height: Ti.UI.SIZE,
        // layout: 'vertical',
        // width: Ti.UI.SIZE,
        // color : "black"
    // });
    // //$.index.add(view);
//     
    // var label = Ti.UI.createLabel({
        // text: 'UTM Source Data:',
        // color : "black"
    // });
   // // view.add(label);
// 
    // utmSource = decodeURIComponent(utmSource);
//     
    // Ti.API.info('utmSource = '+utmSource);
//     
    // var utmParts = utmSource.split('&');
    // var utmObject = {};
    // utmParts.map(function(part) {
        // var currPart = part.split('=');
        // utmObject[currPart[0]] = currPart[1];
//         
        // var label = Ti.UI.createLabel({
            // left: 10,
            // text: currPart[0] + ': ' + currPart[1],
            // color : "black"
        // });
       // // view.add(label);
    // });
//     
    // Ti.API.info('UTM Object is:');
    // Ti.API.info(JSON.stringify(utmObject));
    // abc  = "success";
// } else {
    // var label = Ti.UI.createLabel({
        // text: 'No install referrer was received',
        // color : "black"
    // });
    // abc  = "down";
   // // $.index.add(label);
// }
// 
// var bc = Ti.Android.createBroadcastReceiver({
    // onReceived : function(e) {
        // console.log('GOT INSTALL_REFERRER URL');
        // Ti.API.info('GOT INSTALL_REFERRER URL');
        // setTimeout(function(){
            // alert ('GOT INSTALL_REFERRER URL');
        // },5000);
        // abc  = "INSTALL_REFERRER";
        // alert ('GOT INSTALL_REFERRER URL');
//         
        // console.log(e.intent.getStringExtra('referrer'));
        // Ti.API.info('e.intent.getStringExtra(referrer) =  '+e.intent.getStringExtra('referrer'));
    // }
// });
// 
// Ti.Android.registerBroadcastReceiver(bc, ['com.android.vending.INSTALL_REFERRER']);
// 
// 
// setTimeout(function(){
            // Ti.API.info('abc = '+abc);
            // alert(abc);
        // },10000);

function navigateToStyleDiscovery(){
    Alloy.Globals.addWindowInNav("styleDiscovery");
   
}

function navigateToLooks(){

var shopByLookData = {
    type : "shopByLook"
};

Alloy.Globals.addWindowInNav("productListing", shopByLookData);
            
}
 
// var abc ={};
// var pqr = [];
// for (var i=0; i < 2; i++) {
    // Ti.API.info('i'+i); 
  // abc ={};
  // abc.name ="sushant"+i;
  // abc.id =i;
  // abc.abcd = {
      // 10:(i+1)
  // }
  // pqr.push(abc);
// };
// // abc ={
    // // name:"sushant",
    // // id :101,
// // };
// // 
// // abc.abcd={
    // // 10:1};
    // // var pqr = [];
    // // pqr.push(abc);
// Ti.API.info('abc = '+JSON.stringify(pqr));
