var args = arguments[0] || {};

$.header.init({
    title : "ESTORE",
    passWindow : $.eshop,
});


$.collectionScroll.addEventListener('click', hideOverFlowMenu);

function hideOverFlowMenu(e) {
    if (Alloy.Globals.overFlowFlag) {
        $.header.hideOverFlow();
    };
}

var curtainsSection;

/*
 * Fetch All collections
 */

function getAllEshop() {
    showLoader($.eshop);
    if($.collectionScroll.children.length>0){
        $.collectionScroll.removeAllChildren();
    }
    
   
    var url = Alloy.Globals.commonUrl.eshop;

    var data = {};

    var requestParams = JSON.stringify(data);

    Alloy.Globals.webServiceCall(url, requestParams, allEshopSuccessCallback, allEshopErrorCallback, "POST", $.eshop);
}


function allEshopSuccessCallback(response) {
    //Ti.API.info('data in controller = ' +JSON.stringify(e));

    try {

        
        
        _.each(response.data.eshop, function(value, k) {
        
       // Ti.API.info('value--->' + value.product_data.length);
        
        if (value.product_data.length == 0) {
           // $.blinds1NameLbl.setText((value.categoryName).toUpperCase());
           var blindEmpty= null;
                      
           blindEmpty = Alloy.createController("blindEmpty", {
                //response : response.data.product_data[i],
                response : value,
                mainWindow : $.eshop
            }).getView();
            $.collectionScroll.add(blindEmpty);
            blindEmpty= null;
           
        } else {

            //$.collectionScroll.remove($.mainContainer);

            var blindTemplate = Alloy.createController("eshopTemplate", {
                //response : response.data.product_data[i],
                response : value,
                mainWindow : $.eshop,
                updateCountFn : updateCount 
            }).getView();
            $.collectionScroll.add(blindTemplate);
            blindTemplate = null;
        }

    });


        hideLoader($.eshop);
    } catch(ex) {
        hideLoader($.eshop);
        Ti.API.info('ex = ' + ex.message);
        showAlert($.eshop, "Something went wrong...");
        setTimeout(function() {
            goToBack();
        }, 1000);
    }
}

function allEshopErrorCallback(e) {
    hideLoader($.eshop);
    //Ti.API.info('collection error e = ' + JSON.stringify(e));
    showAlert($.eshop, e.message);
    setTimeout(function() {
        goToBack();
    }, 1000);
}


//getAllEshop();

function goToBack() {
        Alloy.Globals.popWindowInNav();
        $.eshop.close();
}

function destroyWindow(e) {

    $.removeListener();
    $.eshop.remove($.collectionScroll);
    $.collectionScroll.removeAllChildren();
    $.destroy();
}

// if (Ti.Platform.Android) {
//
// $.eshop.fbProxy = Alloy.Globals.fb.createActivityWorker({
// lifecycleContainer : $.eshop
// });
// }

function updateCount(cartFlag) {
    $.header.updateCartCount();
    
    if(!isNullVal(cartFlag) && cartFlag!="addTocart"){
        getAllEshop();
    }
    
}
