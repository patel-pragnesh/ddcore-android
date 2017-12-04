var args = arguments[0] || {};

var db = Titanium.Database.open('Ddecor');

//db.execute('CREATE TABLE IF NOT EXISTS searchList (id INTEGER PRIMARY KEY, search TEXT NOT NULL,created_at timestamp NOT NULL DEFAULT current_timestamp,UNIQUE(search))');
var gaAddToCartData = {};
var searchText = "";
var filterRawData = "";
var shareUrl1,
    shareUrl2;
var product_sku1 = "",
    product_sku2 = "";

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

Titanium.App.Properties.setList('cartAllid', []);

$.supportLinkLbl.addEventListener('click', function(e) {
    Ti.Platform.openURL("mailto:" + e.source.getText());
});

if (Ti.App.Properties.getString("access_token")) {
    // $.appoinmantLbl.setHeight("40dp");
    $.customerService.setHeight("40dp");
} else {
    // $.appoinmantLbl.setHeight("0dp");
    $.customerService.setHeight("0dp");
}

//Ti.App.removeEventListener("updateCartCountInDashBoard", updateCount);
//Ti.App.addEventListener("updateCartCountInDashBoard", updateCount);

function checkblurEfect(e) {
    Ti.API.info('blur window');
    focusFlag = false;
}

function updateCount() {

    // Ti.App.removeEventListener("updateCartCountInDashBoard", updateCount);
    //Ti.API.info('************* update count into dashboard **************');
    if (parseInt(Ti.App.Properties.getString("cartCount")) > 0) {
        var cartCount = "";
        cartCount = Ti.App.Properties.getString("cartCount");
        $.cartCountLbl.visible = true;
        $.cartCountLbl.setText(cartCount.toString());
    } else {
        $.cartCountLbl.visible = false;
        $.cartCountLbl.setText("");
    }

    // Ti.API.info('testObject = ' + Titanium.App.Properties.getList('cartProductIdArray'));

    // Ti.API.info('remove cart = '+Titanium.App.Properties.getList('removeCartProductIdArray'));
    //  Ti.API.info('_.size(backupData) = '+_.size(backupData));

    if (!focusFlag) {
        //           if (_.size(backupData) > 0 && !isNullVal(Titanium.App.Properties.getList('cartProductIdArray'))) {
        if (_.size(backupData) > 0) {
            //   Ti.API.info('view type looping call' + page_no);
            addtocartItem = [];

            addtocartItem = Titanium.App.Properties.getList('cartProductIdArray');
            viewTypeLooping(backupData, activeTemplate);
            focusFlag = false;
        }
    }

}

function updateCartData() {
    // Ti.App.removeEventListener("updateCartCountInDashBoard", updateCount);
    //Ti.API.info('************* update count into dashboard **************');
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

/**************Search listing ****************/

var db = Titanium.Database.open('Ddecor');
db.execute('CREATE TABLE IF NOT EXISTS searchList (id INTEGER PRIMARY KEY, search TEXT NOT NULL,created_at timestamp NOT NULL DEFAULT current_timestamp,UNIQUE(search))');
//Alloy.createController('dashboard').getView().open();

Ti.API.info('Ti.App.Properties.getString("firstTime") = ' + Ti.App.Properties.getString("firstTime"));
if (Ti.App.Properties.getString("firstTime") == null) {
    setSearchData();
}

function setSearchData() {
    var searchData = ['Curtains', 'Upholstery', 'Bedsheet', 'Wallpaper', 'Blinds'];
    _.each(searchData, function(val, key) {

        try {
            // var excuteQuery = db.execute('INSERT INTO searchList (search) VALUES (?)', val);

            var _value = crypto.AES.encrypt(val, ckey, {
                iv : iv
            });

            //Ti.API.info('_value--->' + _value);

            var excuteQuery = db.execute('INSERT INTO searchList (search) VALUES (?)', (_value).toString());

        } catch(ex) {
            try {
                //var executeQuery = db.execute('update searchList set created_at=CURRENT_TIMESTAMP where search=?', val);
                var _value = crypto.AES.encrypt(val, ckey, {
                    iv : iv
                });

                var executeQuery = db.execute('update searchList set created_at=CURRENT_TIMESTAMP where search=?', val);

            } catch(ex2) {
                Ti.API.info('into search expection--->' + ex2.messaae);
            }
        }

    });
    Ti.App.Properties.setString("firstTime", true);
}

/***************************************/

$.headerCloseLbl.addEventListener('click', function(e) {
    $.searchContainer.visible = false;
});

$.searchLbl.addEventListener('click', hideSearchView);
$.headerSearchLbl.addEventListener('click', hideHeaderSearchView);

$.SearchTxt.addEventListener('return', hideSearchView);
$.headerSearchTxt.addEventListener('return', hideHeaderSearchView);

function hideHeaderSearchView(e) {
    Ti.API.info('return');
    if ($.headerSearchTxt.getValue() != "") {
        //Ti.API.info('search word in hideheader' + $.headerSearchTxt.getValue());
        $.SearchTxt.focus();

        setTimeout(function(e) {
            $.searchContainer.visible = false;
        }, 100);
        try {

            //var excuteQuery = db.execute('INSERT INTO searchList (search) VALUES (?)', $.headerSearchTxt.getValue());
            //var excuteQuery = db.execute('INSERT INTO searchList (search) VALUES (?)', Ti.Utils.base64encode($.headerSearchTxt.getValue()));

            var _value = crypto.AES.encrypt($.headerSearchTxt.getValue(), ckey, {
                iv : iv
            });

            //Ti.API.info('_value--->' + _value);

            var excuteQuery = db.execute('INSERT INTO searchList (search) VALUES (?)', (_value).toString());

        } catch(ex) {
            //Ti.API.info('catch in hide header = ' + ex.message);
            try {

                var _value = crypto.AES.encrypt($.headerSearchTxt.getValue(), ckey, {
                    iv : iv
                });

                //var executeQuery = db.execute('update searchList set created_at=CURRENT_TIMESTAMP where search=?', Ti.Utils.base64encode($.headerSearchTxt.getValue()));
                var executeQuery = db.execute('update searchList set created_at=CURRENT_TIMESTAMP where search=?', (_value).toString());

            } catch(ex2) {
                Ti.API.info('ex in hideheader' + ex2.message);
            }
        }

        searchText = $.headerSearchTxt.getValue();
        $.headerSearchTxt.blur();
        $.filterByContainer.removeAllChildren();
        $.sortDetails.removeAllChildren();
        sortBy = "";
        filters = {};
        getSearchData(searchText);
    } else {
        showAlert($.searchListing, "Please enter a search keyword");
    }
}


if(args.action == "bannerClick"){
    $.SearchTxt.value = args.searchText;
    hideSearchView();   
}

function hideSearchView(e) {
    if ($.SearchTxt.getValue() != "") {

        $.SearchTxt.blur();
        //Ti.API.info('search word in hide ' + $.SearchTxt.getValue());

        try {
            //var excuteQuery = db.execute('INSERT INTO searchList (search) VALUES (?)', Ti.Utils.base64encode($.SearchTxt.getValue()));

            var _value = crypto.AES.encrypt($.SearchTxt.getValue(), ckey, {
                iv : iv
            });

            Ti.API.info('_value--->' + _value);

            var excuteQuery = db.execute('INSERT INTO searchList (search) VALUES (?)', (_value).toString());

        } catch(ex) {
            Ti.API.info('catch in hide  = ' + ex.message);
            try {

                //var executeQuery = db.execute('update searchList set created_at=CURRENT_TIMESTAMP where search=?', Ti.Utils.base64encode($.SearchTxt.getValue()));

                var _value = crypto.AES.encrypt($.SearchTxt.getValue(), ckey, {
                    iv : iv
                });

                var executeQuery = db.execute('update searchList set created_at=CURRENT_TIMESTAMP where search=?', (_value).toString());

            } catch(ex2) {
                Ti.API.info('ex is ' + ex2.message);
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
    } else {
        showAlert($.searchListing, "Please enter a search keyword");
    }
}

$.SearchTxt.addEventListener('focus', autoSearch);
$.headerSearchTxt.addEventListener('click', displaySearchView);

$.headerSearchTxt.addEventListener('focus', function() {
    Ti.API.info('focus headerSearchTxt');
    displaySearchView();
    focusFlag = true;
});

$.headerSearchTxt.addEventListener('blur', function() {
    Ti.API.info('blur headerSearchTxt');
    focusFlag = false;
});

function displaySearchView(e) {

    Ti.API.info('this click headerSearchTxt' + $.searchContainer.getVisible());
    $.searchRecentContainer.removeAllChildren();
    setTimeout(function(e) {
        $.searchContainer.setVisible(true);
        $.searchRecentlbl.setVisible(true);
    }, 100);

    var deleteQry = db.execute('DELETE  from searchList WHERE created_at < datetime("now","-1 day")');

    if (deleteQry == null) {

        var data = db.execute('SELECT * FROM searchList ORDER BY created_at DESC LIMIT 5');
        $.recentlbl.visible = true;
        while (data.isValidRow()) {
            //var searchDbText = Ti.Utils.base64decode(data.fieldByName('search'));

            var _data = data.fieldByName('search');

            var decrypted = crypto.AES.decrypt(_data, ckey, {
                iv : iv
            });

            var searchDbText = decrypted.toString(crypto.enc.Utf8);

            var lbl_ = Ti.UI.createLabel({
                top : "5dp",
                left : "15dp",
                height : "25dp",
                color : "#ffffff",
                width : Titanium.UI.FILL,
                text : searchDbText,
                font : {
                    fontSize : "14dp",
                    fontFamily : "futura_lt_bt_light-webfont"
                },
                type : "searchText"
            });
            $.searchRecentContainer.add(lbl_);
            data.next();
        }
    }

}

$.searchRecentContainer.addEventListener('click', headerRecentSearch);

function headerRecentSearch(e) {

    Ti.API.info('headerRecentSearch--->' + e.source.type);

    Ti.API.info('headerRecentSearch--->' + JSON.stringify(e.source.text));

    if (e.source.type == "searchText") {

        $.headerSearchTxt.value = e.source.text;
        $.searchContainer.visible = false;
        searchText = e.source.text;
        try {
            //db.execute('update searchList set created_at=CURRENT_TIMESTAMP where search=?', Ti.Utils.base64encode(e.source.text.text));

            var _key = crypto.AES.encrypt(searchText, ckey, {
                iv : iv
            });

            db.execute('update searchList set created_at=CURRENT_TIMESTAMP where search=?', (_key).toString());

        } catch(ex_) {
            //Ti.API.info('catch = = ' + ex_.message);
        }
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

    if (deleteQry == null) {

        var data = db.execute('SELECT * FROM searchList ORDER BY created_at DESC LIMIT 5');
        $.recentlbl.visible = true;
        while (data.isValidRow()) {
            //var searchDbText =Ti.Utils.base64decode( data.fieldByName('search'));

            var _data = data.fieldByName('search');

            var decrypted = crypto.AES.decrypt(_data, ckey, {
                iv : iv
            });

            var searchDbText = decrypted.toString(crypto.enc.Utf8);

            var lbl = Ti.UI.createLabel({
                top : "5dp",
                left : "15dp",
                height : "25dp",
                width : Titanium.UI.FILL,
                color : "#ffffff",
                text : searchDbText,
                font : {
                    fontSize : "14dp",
                    fontFamily : "futura_lt_bt_light-webfont"
                },
                type : "searchText"
            });
            $.recentContainer.add(lbl);
            data.next();
        }
    }
}

$.recentContainer.addEventListener('click', recentSearch);

function recentSearch(e) {
    Ti.API.info('recentSearch--->' + e.source.type);

    Ti.API.info('recentSearch--->' + JSON.stringify(e.source.text));

    if (e.source.type == "searchText") {
        $.headerSearchTxt.value = e.source.text;
        $.searchView.visible = false;
        searchText = e.source.text;

        try {
            //db.execute('update searchList set created_at=CURRENT_TIMESTAMP where search=?', Ti.Utils.base64encode(e.source.text.text));

            var _key = crypto.AES.encrypt(searchText, ckey, {
                iv : iv
            });

            db.execute('update searchList set created_at=CURRENT_TIMESTAMP where search=?', (_key).toString());

        } catch(ex_) {
            Ti.API.info('catch = = ' + ex_.message);
        }
        $.filterByContainer.removeAllChildren();
        $.sortDetails.removeAllChildren();
        sortBy = "";
        filters = {};
        getSearchData(e.source.text);
    }
}

$.menuButton.addEventListener('click', goToBack);
$.closeLbl.addEventListener('click', goToBack);

$.searchListing.addEventListener("click", function(e) {
    if (e.source.type != "TextField") {
        $.headerSearchTxt.blur();
        $.SearchTxt.blur();
    }
});

//
// $.overFlowMenuLbl.addEventListener('click', showOverFlow);
//
// function showOverFlow(e) {
// Alloy.Globals.overFlowFlag = true;
// $.overFlowView.visible = true;
// $.overFlowView.width = Ti.UI.SIZE;
// $.overFlowView.height = Ti.UI.SIZE;
// $.overFlowView.top = "8dp";
// $.overFlowView.right = "5dp";
// }
//
// $.overFlowView.addEventListener('click', hideOverFlow);
//
// function hideOverFlow(e) {
//
// if (Alloy.Globals.overFlowFlag && e.source.id != "overFlowMenuLbl") {
// $.overFlowView.visible = false;
// Alloy.Globals.overFlowFlag = false;
// }
// };
//
// $.searchListing.addEventListener('click', hideOverFlow);

// function getSearchData() {
// var url = "";
// listData = [];
// backupData = [];
// var data = {};
// $.mainSection.setItems(listData);
//
// if (!isNullVal(sortBy) || _.size(filters) > 0 || !isNullVal(selectedStyle)) {
// page_no = 1;
// limit = 10;
// }
// filtersData = {};
//
// _.each(filters, function(value, key) {
// if (value.length > 0) {
// filtersData[key] = value.join(",");
// }
// });
//
// var url = Alloy.Globals.commonUrl.search;
// data = {
// "collection_enduse" : $.SearchTxt.getvalue(),
// "sortby" : sortBy || "latest",
// "pagination" : {}
// };
//
// data.pagination = {
// "page_no" : page_no,
// "page_size" : limit
// };
// if (_.size(filtersData) > 0) {
// data['filters'] = filtersData;
// } else {
// data['filters'] = "";
// }
//
// var requestParams = JSON.stringify(data);
//
// Alloy.Globals.webServiceCall(url, requestParams, subCollectionSuccessCallback, subCollectionErrorCallback, "POST", $.searchListing, true);
// }

var sortBy = "";
var gridData,
    firstCount,
    secondCount,
    message;
var stateFlag = true;
var page_no = 1;
var limit = 10;
var totalItem;
var listData = [];
var backupData = [];
var selectedCartItem = [];
var unSelectedCartItem = [];
var selectedStyle = "";
var filters = {};
var displayCount = "",
    sortTotalCount = "";
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

var activeTemplate = "gridTemplate";
var itemIndex_ = 0;
var toggleStatus = true;
var filterSend = {};
var filterSendJson = [];
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
var wTitle = "";
var subTitle = "";

/*
 * set attributestring to view type option  label
 */

function setAttributeStr(type) {

    var text = "VIEW TYPE " + type;
    var attr = Ti.UI.createAttributedString({
        text : text,
        attributes : [{
            type : Ti.UI.ATTRIBUTE_FONT,
            value : {
                fontSize : 10,
                fontFamily : 'futura_medium_bt-webfont'
            },
            range : [text.indexOf(type + ""), (type + "").length]
        }]
    });

    $.listTypeLbl.attributedString = attr;
}

setAttributeStr("GRID");

$.listTypeContainer.addEventListener('click', toggleListType);

function toggleListType(e) {
    if (toggleStatus) {
        $.listTypeContainer.animate({
            bottom : 0,
            duration : 200
        });
        toggleStatus = false;
    } else {
        $.listTypeContainer.animate({
            bottom : -65,
            duration : 200
        });
        toggleStatus = true;
    }
}

$.sortByLbl.addEventListener('click', function(e) {
    hideShowView($.sortView);
});
$.sortCloseLbl.addEventListener('click', function(e) {
    hideShowView($.sortView);
});
$.filterByLbl.addEventListener('click', function(e) {
    hideShowView($.filterView);
});
$.filterCloseLbl.addEventListener('click', function(e) {
    hideShowView($.filterView);
});

var style = $.createStyle({
    font : {
        fontWeight : 'bold',
        fontSize : "13dp"
    },
});
var style1 = $.createStyle({
    font : {
        fontFamily : "futura_lt_bt_light-webfont",
        fontSize : "13dp"
    },
});
//$.button.applyProperties(style);

$.listTypeSubContainer.addEventListener('click', function(e) {
    Ti.API.info('call 1');
    if (!isNullVal(e.source.id)) {
        //Ti.API.info('call 2');
        Ti.API.info('call 2 =' + e.source.id);
        switch(e.source.id) {

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
            //looping_value(backupData, activeTemplate);
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
            break;
        }
    }

});

$.listView.addEventListener('itemclick', function(e) {

    // Ti.API.info('blindId--->' + e.bindId);
    try {
        if (!isNullVal(e.bindId)) {

            var _bind = e.bindId;
            var _index = e.itemIndex;
            var _a = e.section.items[_index];
            if (!isNullVal(_a[_bind].collectionId)) {

                //gaAddToCartData = _a[_bind].collectionName + "(" + _a[_bind].product_sku + ")";
                //gaAddToCartData = _a[_bind].product_name_ga + "(" + _a[_bind].product_sku + ")";
                //Ti.API.info('gaAddToCartData = '+gaAddToCartData);
                if (_bind == "gridWish1" || _bind == "gridWish2") {
                    if (Ti.App.Properties.getString("access_token")) {
                        switch(_a[_bind].productType) {
                        case "collection":
                            var collectionData = {
                                collectionName : _a[_bind].collectionName,
                                collectionId : _a[_bind].collectionId,
                                type : "collection"
                            };
                            addShortlist = Alloy.createController('addToShortlist', collectionData).getView();
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
                            break;
                        }
                    } else {
                        // Alloy.Globals.addWindowInNav("signIn", "searchListing");
                        Alloy.Globals.addWindowInNav("signIn", {
                            listObject : e,
                            listViewReference : updateItemListClick,
                        });
                    }
                } else if (_bind == "gridCart1" || _bind == "gridCart2") {

                    if (_a[e.bindId].visible) {

                        switch(_a[_bind].productType) {

                        case "Shop":
                            if (!_a[_bind].wallpaper) {
                                if (Ti.App.Properties.getString("access_token")) {

                                    var shortlist_flag = null;
                                    if (e.bindId == "gridCart1") {
                                        if (_a['gridWish1'].text == '\ue927') {
                                            shortlist_flag = true;
                                        } else {
                                            shortlist_flag = false;
                                        }
                                    } else {
                                        if (_a['gridWish2'].text == '\ue927') {
                                            shortlist_flag = true;
                                        } else {
                                            shortlist_flag = false;
                                        }
                                    }

                                    //gaAddToCartData = _a[_bind].product_name_ga + "(" + _a[_bind].product_sku + ")";
                                    gaAddToCartData = {};
                                    gaAddToCartData = {
                                        name : _a[_bind].product_name_ga,
                                        sku : _a[_bind].product_sku,
                                        shortlistFlag : shortlist_flag
                                    };

                                    cartData = "";
                                    cartData = e;
                                    var url = Alloy.Globals.commonUrl.addToCart;
                                    var data = {
                                        product_id : _a[_bind].collectionId,
                                        qty : 1
                                    };

                                    var requestParams = JSON.stringify(data);

                                    Alloy.Globals.webServiceCall(url, requestParams, addToCartSuccessCallback, addToCartErrorCallback, "POST", $.searchListing);

                                } else {
                                    //Alloy.Globals.addWindowInNav("signIn", "searchListing");
                                    Alloy.Globals.addWindowInNav("signIn", {
                                        listObject : e,
                                        listViewReference : updateItemListClick,
                                    });
                                }
                            }
                            break;

                        }
                    }

                } else if ((_bind == "gridWhereToBuy1" || _bind == "gridWhereToBuy2") && _a[_bind].text == "Where to buy") {

                    if (!isNullVal(_a[_bind].collectionId)) {
                        var gaLeadProductArray = {};
                        gaLeadProductArray = {
                            name : _a[_bind].product_name_ga || "NA",
                            sku : _a[_bind].collectionId
                        };
                        generateLead(gaLeadProductArray, "All Collection Page");
                    }

                    Alloy.Globals.addWindowInNav("findStore");
                } else if (_bind == "gridShare1" || _bind == "gridShare2") {
                    //Ti.API.info('e is ' + _a[_bind].shareUrl);
                    // socialShare();
                    // var shareProductUrl='http://dev.ddecor.com/collection/silky-satin';
                    shareImage(_a[_bind].shareUrl);
                } else {

                    if (!isNullVal(_bind)) {
                        var CollectionData = "";

                        if ((e.bindId).toString().lastIndexOf("1") != -1) {
                            e.bindId = "gridWish1";
                        } else if ((e.bindId).toString().lastIndexOf("2") != -1) {
                            e.bindId = "gridWish2";
                        }
                        //Ti.API.info('e.bindId------>' + e.bindId);

                        switch(_a[_bind].productType) {
                        case "collection":
                            CollectionData = {
                                type : "collection",
                                id : _a[_bind].collectionId
                            };
                            Alloy.Globals.addWindowInNav("productDetails", CollectionData);
                            break;
                        case "Shop":

                            if (_a[_bind].wallpaper) {
                                var pData = {
                                    Productid : _a[_bind].collectionId,
                                    block : "shop",
                                    product : "wallpaper",
                                    listObject : e,
                                    //listViewReference : updateItemListClick,
                                    listViewReference : addToCartCallback,

                                };
                                Alloy.Globals.addWindowInNav("estoreDetails", pData);
                            } else {
                                var pData = {
                                    Productid : _a[_bind].collectionId,
                                    block : "shop",
                                    product : "shopProduct",
                                    listObject : e,
                                    //listViewReference : updateItemListClick,
                                    listViewReference : addToCartCallback,
                                };
                                Alloy.Globals.addWindowInNav("estoreDetails", pData);
                            }

                            break;
                        case "Qds":
                            var pData = {
                                Productid : _a[_bind].collectionId,
                                block : "collection",
                                navigatedblockid : "",
                                listObject : e,
                                //listViewReference : updateItemListClick,
                                listViewReference : addToCartCallback,
                            };
                            Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
                            break;
                        case "Blinds":
                            var pData = {
                                Productid : _a[_bind].collectionId,
                                block : "blinds",
                                navigatedblockid : "",
                                listObject : e,
                                //listViewReference : updateItemListClick,
                                listViewReference : addToCartCallback,
                            };
                            Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
                            break;
                        }
                    }
                }
            }
        }
    } catch(ex) {
        Ti.API.info('catch item click = ' + ex.message);
    }

});

function addToCartCallback(e, productId) {
    try {
        Ti.API.info('else if' + e.bindId);
        var bind = e.bindId;
        var index = e.itemIndex;
        var a = e.section.items[index];

        if (!isNullVal(e.bindId) && e.bindId != "message") {

            if (!isNullVal(a[bind].collectionId)) {

                if (e.bindId == "gridCart1" || e.bindId == "gridCart2") {

                    if (activeTemplate == "gridTemplate") {
                        if (a[bind].backgroundColor == "#66000000") {
                            a[bind].backgroundColor = "#e65e48";
                            // a[bind].borderColor = "transparent";
                            e.section.updateItemAt(e.itemIndex, a);
                        }
                    }

                    if (activeTemplate == "listTypeTemplate" || activeTemplate == "blockTypeTemplate") {
                        if (a[bind].color == "#ffffff") {
                            a[bind].color = "#e65e48";
                            e.section.updateItemAt(e.itemIndex, a);
                        } else {
                            if (a[bind].color == "#a6a6a6") {
                                a[bind].color = "#e65e48";
                                e.section.updateItemAt(e.itemIndex, a);
                            }
                        }

                    }

                    addtocartItem.push(productId);

                } else if (e.bindId == "gridWish1" || e.bindId == "gridWish2") {
                    if (productId == "add") {
                        a[bind].text = "\ue927";
                        a[bind].color = "#e65e48";
                        e.section.updateItemAt(index, a);
                        selectedCartItem.push(a[bind].collectionId);
                    } else {
                        a[bind].text = "\ue60b";
                        a[bind].color = "#a6a6a6";
                        selectedCartItem.splice(selectedCartItem.indexOf(a[bind].collectionId), 1);
                        unSelectedCartItem.push(a[bind].collectionId);
                        e.section.updateItemAt(index, a);
                    }

                }

            }
        }
    } catch(ex) {
        Ti.API.info('ex.message = ' + ex.message);
    }

}

function addToCartSuccessCallback(e) {
    try {
        var bind = cartData.bindId;
        var index = cartData.itemIndex;
        var a = cartData.section.items[index];

        // if (activeTemplate == "gridTemplate") {
        // if (a[bind].color == "#ffffff") {
        // a[bind].color = "#e65e48";
        // cartData.section.updateItemAt(cartData.itemIndex, a);
        // }
        // } else {
        // if (a[bind].color == "#a6a6a6") {
        // a[bind].color = "#e65e48";
        // cartData.section.updateItemAt(cartData.itemIndex, a);
        // }
        // }

        // Ti.API.info('a[bind].backgroundColor --> ' + a[bind].backgroundColor);
        // Ti.API.info('activeTemplate --> ' + activeTemplate);
        // Ti.API.info('a[bind].color --> ' + a[bind].color);

        if (activeTemplate == "gridTemplate") {
            if (a[bind].backgroundColor == "#66000000") {
                a[bind].backgroundColor = "#e65e48";
                //  a[bind].borderColor = "transparent";
                cartData.section.updateItemAt(cartData.itemIndex, a);
            }
        }

        if (activeTemplate == "listTypeTemplate" || activeTemplate == "blockTypeTemplate") {
            if (a[bind].color == "#a6a6a6") {
                a[bind].color = "#e65e48";
                cartData.section.updateItemAt(cartData.itemIndex, a);

            }

        }

        addtocartItem.push(e.data[0].product_id);
        Ti.App.Properties.setString("quote_id", e.data[0].quote_id);
        Ti.App.Properties.setString("cartCount", e.data[0].count);
        //Alloy.Globals.setCount();
        //Ti.App.fireEvent("updateCartCount");
        //$.header.updateCartCount();
        //Ti.API.info('e = ' + JSON.stringify(e));
        showAlert($.searchListing, e.message);
        //updateCount();
        updateCartData();

        var cartDataArray = [];
        cartDataArray = Titanium.App.Properties.getList('cartProductIdArray');
        if (cartDataArray.indexOf(e.data[0].product_id) == -1) {
            cartDataArray.push(e.data[0].product_id);
        }
        Titanium.App.Properties.setList('cartProductIdArray', cartDataArray);

        googleAnalyticsBag(gaAddToCartData);
    } catch(ex) {
        Ti.API.info('ex.message = ' + ex.message);
    }
}

function addToCartErrorCallback(e) {
    showAlert($.searchListing, e.message);
}

var shortlistData;
var bind = "",
    index = "",
    itemSection = "";
function addToShortlist(productData) {

    if (!isNullVal(Ti.App.Properties.getString("access_token"))) {
        shortlistData = "";
        if (!isNullVal(productData.bindId)) {
            bind = productData.bindId;
            index = productData.itemIndex;
            itemSection = productData.section.items[index];
            shortlistData = productData;

            if (itemSection[bind].text == "\ue60b") {

                /*display product as shortlisted before hit api
                */
                //gaShortlistProduct = itemSection[bind].collectionName + "(" + itemSection[bind].product_sku + ")";
                gaShortlistProduct = {
                    name : itemSection[bind].collectionName,
                    sku : itemSection[bind].product_sku,
                    lostSale : itemSection[bind].lost_sale,
                };

                itemSection[bind].text = "\ue927";
                itemSection[bind].color = "#e65e48";
                productData.section.updateItemAt(index, itemSection);
                selectedCartItem.push(itemSection[bind].collectionId);

                var url = Alloy.Globals.commonUrl.addToShortlist;
                var data = {
                    product_id : itemSection[bind].collectionId
                };
                var requestParams = JSON.stringify(data);
                Alloy.Globals.webServiceCall(url, requestParams, addToShortlistSuccessCallback, addToShortlistErrorCallback, "POST", $.searchListing);
            } else {

                /*remove product as shortlisted before hit api
                 */

                itemSection[bind].text = "\ue60b";
                itemSection[bind].color = "#a6a6a6";
                productData.section.updateItemAt(index, itemSection);
                selectedCartItem.splice(selectedCartItem.indexOf(itemSection[bind].collectionId), 1);
                unSelectedCartItem.push(itemSection[bind].collectionId);

                var url = Alloy.Globals.commonUrl.removeShortlist;
                var data = {
                    product_id : itemSection[bind].collectionId,
                };
                var requestParams = JSON.stringify(data);
                Alloy.Globals.webServiceCall(url, requestParams, removeShortlistProductSuccessCallback, removeShortlistProductErrorCallback, "POST", $.searchListing);

            }
        }
    } else {
        Alloy.Globals.addWindowInNav("signIn", "searchListing");
    }
}

function addToShortlistSuccessCallback(e) {
    try {
        // var pbind = "",
        // pindex = "",
        // pitemSection = "";
        //
        // pbind = shortlistData.bindId;
        // pindex = shortlistData.itemIndex;
        // pitemSection = shortlistData.section.items[index];
        // pitemSection[bind].text = "\ue927";
        // pitemSection[bind].color = "#e65e48";
        // shortlistData.section.updateItemAt(shortlistData.itemIndex, pitemSection);
        // selectedCartItem.push(pitemSection[pbind].collectionId);
        showAlert($.searchListing, e.message);
        googleAnalyticsShortlist(gaShortlistProduct, "SEARCH LISTING");
    } catch(e) {
        Ti.API.info('catch = ' + ex.message);
    }
}

function addToShortlistErrorCallback(e) {
    showAlert($.searchListing, e.message);
    var pbind = "",
        pindex = "",
        pitemSection = "";

    pbind = shortlistData.bindId;
    pindex = shortlistData.itemIndex;
    pitemSection = shortlistData.section.items[pindex];
    pitemSection[pbind].text = "\ue60b";
    pitemSection[pbind].color = "#a6a6a6";
    selectedCartItem.splice(selectedCartItem.indexOf(pitemSection[pbind].collectionId), 1);
    unSelectedCartItem.push(pitemSection[pbind].collectionId);
    shortlistData.section.updateItemAt(shortlistData.itemIndex, pitemSection);

}

function removeShortlistProductSuccessCallback(e) {

    try {
        // var pbind = "",
        // pindex = "",
        // pitemSection = "";
        //
        // pbind = shortlistData.bindId;
        // pindex = shortlistData.itemIndex;
        // pitemSection = shortlistData.section.items[pindex];
        // pitemSection[pbind].text = "\ue60b";
        // pitemSection[pbind].color = "#a6a6a6";
        // selectedCartItem.splice(selectedCartItem.indexOf(e.data), 1);
        // unSelectedCartItem.push(e.data);
        // shortlistData.section.updateItemAt(shortlistData.itemIndex, pitemSection);
        showAlert($.searchListing, e.message);
    } catch(e) {
        Ti.API.info('catch = ' + JSON.stringify(e));
    }

}

function removeShortlistProductErrorCallback(e) {
    showAlert($.searchListing, e.message);
    var pbind_ = "",
        pindex_ = "",
        pitemSection_ = "";

    pbind_ = shortlistData.bindId;
    pindex_ = shortlistData.itemIndex;
    pitemSection_ = shortlistData.section.items[pindex_];
    pitemSection_[pbind_].text = "\ue927";
    pitemSection_[pbind_].color = "#e65e48";
    selectedCartItem.push(pitemSection_[pbind_].collectionId);
    shortlistData.section.updateItemAt(shortlistData.itemIndex, pitemSection_);
}

/*
 * Fetch All sub collection data
 */

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
    //if (!isNullVal(sortBy) || _.size(filters) > 0 || !isNullVal(selectedStyle)) {
    page_no = 1;
    limit = 10;
    //}
    filtersData = {};

    _.each(filters, function(value, key) {
        if (value.length > 0) {
            filtersData[key] = value.join(",");
        }
    });

    url = Alloy.Globals.commonUrl.search;
    data = {
        "q" : search_text, //$.SearchTxt.getValue()
        "sortby" : sortBy || "",
        "pagination" : {}
    };

    data.pagination = {
        "page_no" : page_no,
        "page_size" : limit
    };
    if (_.size(filtersData) > 0) {
        data['filters'] = filtersData;
    } else {
        data['filters'] = "";
    }

    var requestParams = JSON.stringify(data);

    Alloy.Globals.webServiceCall(url, requestParams, subCollectionSuccessCallback, subCollectionErrorCallback, "POST", $.searchListing);

}

//getSearchData();

function subCollectionSuccessCallback(e) {
    try {

        hideLoader($.searchListing);

        totalItem = e.data.product_data.total_count;
        var toast_text = "Total " + totalItem;

        var toast_attr = Ti.UI.createAttributedString({
            text : toast_text,
            attributes : [{
                type : Ti.UI.ATTRIBUTE_FONT,
                value : {
                    fontSize : "10dp",
                    fontFamily : "futura_medium_bt-webfont"
                },
                range : [toast_text.indexOf(totalItem + ""), (totalItem + "").length]
            }]
        });

        $.total_toast_lbl.attributedString = toast_attr;

        var text = totalItem + " SEARCH RESULTS";
        var attr = Ti.UI.createAttributedString({
            text : text,
            attributes : [{
                type : Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
                value : "#333333",
                range : [text.indexOf(" SEARCH RESULTS"), (" SEARCH RESULTS").length]
            }, {
                type : Ti.UI.ATTRIBUTE_FONT,
                value : {
                    fontSize : "12dp",
                    fontFamily : "futura_lt_bt_light-webfont"
                },
                range : [text.indexOf(" SEARCH RESULTS"), (" SEARCH RESULTS").length]
            }]
        });

        $.searchCount.attributedString = attr;

        if (!isNullVal(e.data.product_data.product_listing)) {
            //Ti.API.info('inside if');
            displayCount = e.data.product_data.product_listing.length;
            gridData = e.data.product_data.product_listing;
            looping_value(e.data.product_data.product_listing, activeTemplate);
        } else {
            displayCount = "";
            gridData = "";
        }
        filterRawData = e;
        addFilterByRows(filterRawData);

        // if (!isNullVal(e.data.filter_attributes)) {
        // if (e.data.filter_attributes.length > 0) {
        // sortTotalCount = e.data.sort_attributes.length;
        // if ($.filterByContainer.children.length == 0) {
        // _.each(e.data.filter_attributes, function(value, k) {
        //
        // var code = value.code;
        // var title = value.title;
        // filterMainContainer[k] = Ti.UI.createView({
        // height : "35dp",
        // top : "0dp",
        // left : "0dp",
        // width : Titanium.UI.FILL,
        // layout : "vertical",
        // id : k,
        // type : "filterOption"
        // });
        //
        // filterLbl[k] = Ti.UI.createLabel({
        // id : "lbl" + k,
        // font : {
        // fontSize : "13dp",
        // fontFamily : 'futura_lt_bt_light-webfont'
        // },
        // color : "#e65e48",
        // top : "0dp",
        // left : "0dp",
        // height : "35dp",
        // //borderColor : "green",
        // width : Titanium.UI.FILL,
        // touchEnabled : false,
        // text : value.title.toUpperCase(),
        // code : value.code
        // });
        // filterMainContainer[k].add(filterLbl[k]);
        //
        // _.each(e.data.filter_attributes[k].options, function(value, l) {
        //
        // subFilterContainer[l] = Ti.UI.createView({
        // height : "35dp",
        // top : "0dp",
        // left : "0dp",
        // width : Titanium.UI.FILL,
        // id : l,
        // type : "filterSubOption",
        // value : value.value,
        // code : code,
        // title : title
        // });
        //
        // checkFilterLbl[l] = Ti.UI.createLabel({
        // id : "lbl" + l,
        // font : {
        // fontSize : "14dp",
        // fontFamily : 'icomoon'
        // },
        // color : "#e65e48",
        // top : "0dp",
        // left : "0dp",
        // height : "35dp",
        // width : "30dp",
        // touchEnabled : false,
        // text : "",
        // });
        // subFilterContainer[l].add(checkFilterLbl[l]);
        // subFilterLbl[l] = Ti.UI.createLabel({
        // id : "lbl" + l,
        // font : {
        // fontSize : "13dp",
        // fontFamily : 'futura_lt_bt_light-webfont'
        // },
        // color : "#ffffff",
        // top : "0dp",
        // left : "30dp",
        // height : "35dp",
        // //borderColor : "yellow",
        // width : Titanium.UI.FILL,
        // touchEnabled : false,
        // text : value.label.toUpperCase()
        //
        // });
        // subFilterContainer[l].add(subFilterLbl[l]);
        // filterMainContainer[k].add(subFilterContainer[l]);
        //
        // });
        //
        // $.filterByContainer.add(filterMainContainer[k]);
        // });
        // }
        // if ($.sortDetails.children.length == 0) {
        // _.each(e.data.sort_attributes, function(value, k) {
        //
        // sortContainer[k] = Ti.UI.createView({
        // height : "35dp",
        // top : "0dp",
        // left : "0dp",
        // width : Titanium.UI.FILL,
        // layout : "vertical",
        // id : k,
        // type : "sortOption"
        // });
        //
        // $.sortDetails.add(sortContainer[k]);
        //
        // sortLbl[k] = Ti.UI.createLabel({
        // id : "lbl" + k,
        // font : {
        // fontSize : "13dp",
        // fontFamily : 'futura_lt_bt_light-webfont'
        // },
        // color : "#e65e48",
        // top : "0dp",
        // left : "0dp",
        // width : Titanium.UI.FILL,
        // touchEnabled : false,
        // text : value.name.toUpperCase(),
        // value : value.value
        // });
        //
        // sortContainer[k].add(sortLbl[k]);
        // });
        // }
        // }
        // }
        //Ti.API.info('displayCount = ' + displayCount);

        googleAnalyticsSearch(searchText);

        if (displayCount == 0) {

            // listData.push({
            // properties : {
            //
            // },
            // template : 'emptyTemplate',
            // message : {
            // text : "YOUR SEARCH RETURNS NO RESULTS."
            // }
            // });
            // $.mainSection.appendItems(listData);

            $.emptySearchContainer.visible = true;

            $.filterByContainer.removeAllChildren();
            filters = {};
            setTimeout(function(e) {
                addFilterByRows(filterRawData);
            }, 300);

        } else {
            $.emptySearchContainer.visible = false;
        }
    } catch(ex) {
        Ti.API.info('catch error' + ex.message);
        showAlert($.searchListing, "Something went wrong...");
        setTimeout(function() {
            goToBack();
        }, 1000);
    }

}

function addFilterByRows(e) {
    if (!isNullVal(e.data.filter_attributes)) {
        if (e.data.filter_attributes.length > 0) {
            sortTotalCount = e.data.sort_attributes.length;
            if ($.filterByContainer.children.length == 0) {
                _.each(e.data.filter_attributes, function(value, k) {

                    var code = value.code;
                    var title = value.title;
                    filterMainContainer[k] = Ti.UI.createView({
                        height : "35dp",
                        top : "0dp",
                        left : "0dp",
                        width : Titanium.UI.FILL,
                        layout : "vertical",
                        id : k,
                        type : "filterOption"
                    });

                    filterLbl[k] = Ti.UI.createLabel({
                        id : "lbl" + k,
                        font : {
                            fontSize : "13dp",
                            fontFamily : 'futura_lt_bt_light-webfont'
                        },
                        color : "#e65e48",
                        top : "0dp",
                        left : "0dp",
                        height : "35dp",
                        //borderColor : "green",
                        width : Titanium.UI.FILL,
                        touchEnabled : false,
                        text : value.title.toUpperCase(),
                        code : value.code
                    });
                    filterMainContainer[k].add(filterLbl[k]);

                    _.each(e.data.filter_attributes[k].options, function(value, l) {

                        subFilterContainer[l] = Ti.UI.createView({
                            height : "35dp",
                            top : "0dp",
                            left : "0dp",
                            width : Titanium.UI.FILL,
                            id : l,
                            type : "filterSubOption",
                            value : value.value,
                            code : code,
                            title : title
                        });

                        checkFilterLbl[l] = Ti.UI.createLabel({
                            id : "lbl" + l,
                            font : {
                                fontSize : "14dp",
                                fontFamily : 'icomoon'
                            },
                            color : "#e65e48",
                            top : "0dp",
                            left : "0dp",
                            height : "35dp",
                            width : "30dp",
                            touchEnabled : false,
                            text : "",
                        });
                        subFilterContainer[l].add(checkFilterLbl[l]);
                        subFilterLbl[l] = Ti.UI.createLabel({
                            id : "lbl" + l,
                            font : {
                                fontSize : "13dp",
                                fontFamily : 'futura_lt_bt_light-webfont'
                            },
                            color : "#ffffff",
                            top : "0dp",
                            left : "30dp",
                            height : "35dp",
                            //borderColor : "yellow",
                            width : Titanium.UI.FILL,
                            touchEnabled : false,
                            text : value.label.toUpperCase()

                        });
                        subFilterContainer[l].add(subFilterLbl[l]);
                        filterMainContainer[k].add(subFilterContainer[l]);

                    });

                    $.filterByContainer.add(filterMainContainer[k]);
                });
            }
            if ($.sortDetails.children.length == 0) {
                _.each(e.data.sort_attributes, function(value, k) {

                    sortContainer[k] = Ti.UI.createView({
                        height : "35dp",
                        top : "0dp",
                        left : "0dp",
                        width : Titanium.UI.FILL,
                        layout : "vertical",
                        id : k,
                        type : "sortOption"
                    });

                    $.sortDetails.add(sortContainer[k]);

                    sortLbl[k] = Ti.UI.createLabel({
                        id : "lbl" + k,
                        font : {
                            fontSize : "13dp",
                            fontFamily : 'futura_lt_bt_light-webfont'
                        },
                        color : "#e65e48",
                        top : "0dp",
                        left : "0dp",
                        width : Titanium.UI.FILL,
                        touchEnabled : false,
                        text : value.name.toUpperCase(),
                        value : value.value
                    });

                    sortContainer[k].add(sortLbl[k]);
                });
            }
        }
    }
}

function subCollectionErrorCallback(e) {
    Ti.API.info('error = ' + JSON.stringify(e));
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

$.sortDetails.removeEventListener('click', sortBySelectedEffect);
$.sortDetails.addEventListener('click', sortBySelectedEffect);

function sortBySelectedEffect(e) {
    if (e.source.type == "sortOption") {

        for (var i = 0; i < sortTotalCount; i++) {
            var sortText = sortLbl[i].text;
            sortLbl[i].applyProperties(style1);
            var attr = Ti.UI.createAttributedString({
                text : sortText,
                attributes : [{
                    type : Titanium.UI.ATTRIBUTE_UNDERLINES_STYLE,
                    range : [0, 0]
                }]
            });
            sortLbl[i].attributedString = attr;
        }

        e.source.children[0].applyProperties(style);
        var text = e.source.children[0].text;
        var attr = Ti.UI.createAttributedString({
            text : text,
            attributes : [{
                type : Titanium.UI.ATTRIBUTE_UNDERLINES_STYLE,
                range : [0, text.length]
            }]
        });
        e.source.children[0].attributedString = attr;
        sortBy = e.source.children[0].value;
        //getFilterData();
        getSearchData(searchText);
        hideShowView($.sortView);
        // setTimeout(function() {
        // hideShowView($.sortView);
        // }, 1500);

    }
}

var lastOpenView;
$.filterByContainer.addEventListener('click', function(e) {

    if (e.source.height == "35dp" && e.source.type == "filterOption") {
        _.each($.filterByContainer.children, function(value, k) {
            $.filterByContainer.children[k].children[0].applyProperties(style1);
            $.filterByContainer.children[k].height = "35dp";
        });

        e.source.height = Titanium.UI.SIZE;
        e.source.children[0].applyProperties(style);
    } else if (e.source.type == "filterOption" && e.source.height == "size") {
        e.source.height = "35dp";

        if ( typeof filters[e.source.children[0].code] != "undefined") {
            if (filters[e.source.children[0].code].length != 0) {
                e.source.children[0].applyProperties(style);
            } else {
                e.source.children[0].applyProperties(style1);
            }

        }
    }

    if (e.source.type == "filterOption") {
        lastOpenView = e.source.id;

        //e.source.children[0].applyProperties(style);
        if ( typeof filters[e.source.children[0].code] == "undefined") {

            filters[e.source.children[0].code] = [];
        }
    }

    if (e.source.type == "filterSubOption" && e.source.children[0].text == "") {

        e.source.children[0].text = "\ue925";
        filters[e.source.code].push(e.source.value);
        e.source.parent.children[0].text = e.source.title.toUpperCase() + " (" + filters[e.source.code].length + ")".toUpperCase();
    } else if (e.source.type == "filterSubOption" && e.source.children[0].text == "\ue925") {
        e.source.children[0].text = "";
        filters[e.source.code].splice(filters[e.source.code].indexOf(e.source.value), 1);

        if (filters[e.source.code].length == 0) {
            e.source.parent.height = "35dp";
            e.source.parent.children[0].applyProperties(style1);
            e.source.parent.children[0].text = e.source.title.toUpperCase();
        } else {
            e.source.parent.children[0].applyProperties(style);
            e.source.parent.children[0].text = e.source.title.toUpperCase() + " (" + filters[e.source.code].length + ")".toUpperCase();
        }
    }
});

var collectionName1,
    collectionName2,
    collectionImage1,
    collectionImage2,
    collectionId1,
    collectionId2,
    imageContainer,
    logoText,
    isSelected_0,
    isSelected_1,
    wishIconColor_0,
    wishIconColor_1,
    cartIconColor_0 = "transparent",
    cartIconColor_1 = "transparent",
    isWhereToBuy_0,
    isWhereToBuy_1,
    productType_0,
    productType_1,
    wallpaperFlag_0,
    wallpaperFlag_1,
    gridProductname1,
    gridProductname2,
    gridCart1,
    gridCart1,
    gridShare1,
    gridShare2,
    gridWhereToBuy1,
    gridWhereToBuy2,
    productSize1,
    productFontSize1,
    productSize2,
    productFontSize2,
    outOfStock1,
    outOfStock2;

function looping_value(data, templateName) {

    outOfStock1 = "",
    outOfStock2 = "";
    try {
        var cartDataArray = [];
        var cartIdArray = [];
        //Ti.API.info('inside loop');

        listData = [];
        // $.mainSection.setItems([]);
        //	backupData = [];
        switch(templateName) {
        case "gridTemplate":
            _.each(data, function(value, k) {
                backupData.push(value);

                if (!isNullVal(value.id) && !value.cartItem && !value.is_wallpaper && value.type == "Shop") {
                    cartProductId.push(value.id);
                }

                ///new
                cartDataArray = Titanium.App.Properties.getList('cartAllid');
                if (cartDataArray.indexOf(value.id) == -1) {
                    cartDataArray.push(value.id);
                }
                Titanium.App.Properties.setList('cartAllid', cartDataArray);

                //end

            });
            var size = 2;
            var gridDataArr = [];
            var myDataArrCounter = 0;
            for (var i = 0; i < data.length; i += size) {
                var smallPaginationArray = data.slice(i, i + size);
                gridDataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallPaginationArray) + "");
                myDataArrCounter++;
            }
            var subGridData = "{" + gridDataArr + "}";
            var finalGridData = JSON.parse(subGridData);
            data = finalGridData;
            break;

        }

        _.each(data, function(value, k) {
            if (templateName != "gridTemplate") {
                backupData.push(value);
                if (!isNullVal(value.id) && !value.cartItem && !value.is_wallpaper && value.type == "Shop") {
                    cartProductId.push(value.id);
                }

                ///new
                cartDataArray = Titanium.App.Properties.getList('cartAllid');
                if (cartDataArray.indexOf(value.id) == -1) {
                    cartDataArray.push(value.id);
                }
                Titanium.App.Properties.setList('cartAllid', cartDataArray);

                //end

            }

            //if (value) {

            //for collection
            if (value) {
                gridProductname1 = value.name;
                collectionId1 = value.id;
                collectionImage1 = encodeURI(value.profile_image);
                gridCart1 = ((value.type == "Shop" && value.isWallpaper == false) ? Alloy.Globals.icon.bag : "");
                isSelected_0 = ((value.type != "collection") ? ((value.wishlistItem) ? Alloy.Globals.icon.setShortlist : Alloy.Globals.icon.shortlist) : Alloy.Globals.icon.shortlist);
                gridShare1 = Alloy.Globals.icon.share;
                wishIconColor_0 = ((value.type != "collection") ? ((value.wishlistItem) ? "#e65e48" : "#a6a6a6") : "#a6a6a6");
                cartIconColor_0 = ((value.type == "Shop" && value.isWallpaper == false) ? ((value.cartItem) ? "#e65e48" : ((activeTemplate == "gridTemplate") ? "#66000000" : "#a6a6a6")) : "transparent");
                productSize1 = ((value.type == "Shop" && value.isWallpaper == false && value.product_size != "NA") ? value.product_size : "");
                productFontSize1 = ((value.type == "Shop" && value.isWallpaper == false && value.product_size != "NA") ? "9" : "0");
                gridWhereToBuy1 = ((value.type != "collection") ? Alloy.Globals.icon.currency + value.price : "Where to buy");
                imageContainer = "#f4f4f4";
                logoText = "\ue955";
                productType_0 = value.type;
                shareUrl1 = value.url;
                wallpaperFlag_0 = value.isWallpaper;

                /* add to cart product*/
                if (value.type == "Shop" && value.isWallpaper == false && value.cartItem) {
                    cartIdArray = Titanium.App.Properties.getList('cartProductIdArray');
                    if (cartIdArray.indexOf(value.id) == -1) {
                        cartIdArray.push(value.id);
                    }
                    Titanium.App.Properties.setList('cartProductIdArray', cartIdArray);
                }

                ////end

                /*New condition for OUT OF STOCK */

                try
                {

                    if (value.type == "Shop" && value.isWallpaper == false) {
                        if (value.in_stock == 1) {

                            outOfStock1 = false;
                            // outOfStock2 = false;
                        } else if (value.in_stock == 0) {
                            outOfStock1 = true;
                            //outOfStock2 = false;
                        }
                    } else {
                        outOfStock1 = undefined;
                        //outOfStock2 = false;
                    }
                } catch(exp1) {
                    outOfStock1 = undefined;
                    //outOfStock2 = false;
                }

                /*New condition for OUT OF STOCK */

            }
            if (value[0]) {

                product_sku1 = value[0].sku;
                gridProductname1 = value[0].name;
                collectionId1 = value[0].id;
                collectionImage1 = encodeURI(value[0].profile_image);
                gridCart1 = ((value[0].type == "Shop" && value[0].isWallpaper == false) ? Alloy.Globals.icon.bag : "");

                isSelected_0 = ((value[0].type != "collection") ? ((value[0].wishlistItem) ? Alloy.Globals.icon.setShortlist : Alloy.Globals.icon.shortlist) : Alloy.Globals.icon.shortlist);
                gridShare1 = Alloy.Globals.icon.share;
                wishIconColor_0 = ((value[0].type != "collection") ? ((value[0].wishlistItem) ? "#e65e48" : "#a6a6a6") : "#a6a6a6");
                cartIconColor_0 = ((value[0].type == "Shop" && value[0].isWallpaper == false) ? ((value[0].cartItem) ? "#e65e48" : ((activeTemplate == "gridTemplate") ? "#66000000" : "#a6a6a6")) : "transparent");
                productSize1 = ((value[0].type == "Shop" && value[0].isWallpaper == false && value[0].product_size != "NA") ? value[0].product_size : "");
                productFontSize1 = ((value[0].type == "Shop" && value[0].isWallpaper == false && value[0].product_size != "NA") ? "9" : "0");
                gridWhereToBuy1 = ((value[0].type != "collection") ? Alloy.Globals.icon.currency + value[0].price : "Where to buy");
                imageContainer = "#f4f4f4";
                logoText = "\ue955";
                productType_0 = value[0].type;
                wallpaperFlag_0 = value[0].isWallpaper;
                shareUrl1 = value[0].url;

                /* add to cart product*/
                if (value[0].type == "Shop" && value[0].isWallpaper == false && value[0].cartItem) {
                    cartIdArray = Titanium.App.Properties.getList('cartProductIdArray');
                    if (cartIdArray.indexOf(value[0].id) == -1) {
                        cartIdArray.push(value[0].id);
                    }
                    Titanium.App.Properties.setList('cartProductIdArray', cartIdArray);
                }

                ////end

                /*New condition for OUT OF STOCK */
                // Ti.API.info('value[0].in_stock-->'+ value[0].in_stock);
                try
                {
                    if (value[0].type == "Shop" && value[0].isWallpaper == false) {
                        // Ti.API.info('if1');
                        if (value[0].in_stock == 1) {
                            //   Ti.API.info('if2');
                            outOfStock1 = false;
                        } else if (value[0].in_stock == 0) {
                            //  Ti.API.info('if3');
                            outOfStock1 = true;
                        }
                    } else {
                        //       Ti.API.info('if4');
                        outOfStock1 = undefined;
                    }
                } catch(exp1) {
                    //Ti.API.info('if5');
                    outOfStock1 = undefined;
                    //outOfStock2 = false;
                }
                // Ti.API.info('outOfStock1 = '+outOfStock1);
            }

            if (value[1]) {
                product_sku2 = value[1].sku;
                gridProductname2 = value[1].name;
                collectionId2 = value[1].id;
                collectionImage2 = encodeURI(value[1].profile_image);
                gridShare2 = Alloy.Globals.icon.share;
                gridCart2 = ((value[1].type == "Shop" && value[1].isWallpaper == false) ? Alloy.Globals.icon.bag : "");
                isSelected_1 = ((value[1].type != "collection") ? ((value[1].wishlistItem) ? Alloy.Globals.icon.setShortlist : Alloy.Globals.icon.shortlist) : Alloy.Globals.icon.shortlist);
                wishIconColor_1 = ((value[1].type != "collection") ? ((value[1].wishlistItem) ? "#e65e48" : "#a6a6a6") : "#a6a6a6");
                cartIconColor_1 = ((value[1].type == "Shop" && value[1].isWallpaper == false) ? ((value[1].cartItem) ? "#e65e48" : ((activeTemplate == "gridTemplate") ? "#66000000" : "#a6a6a6")) : "transparent");
                productSize2 = ((value[1].type == "Shop" && value[1].isWallpaper == false && value[1].product_size != "NA") ? value[1].product_size : "");
                productFontSize2 = ((value[1].type == "Shop" && value[1].isWallpaper == false && value[1].product_size != "NA") ? "9" : "0");
                gridWhereToBuy2 = ((value[1].type != "collection") ? Alloy.Globals.icon.currency + value[1].price : "Where to buy");
                imageContainer = "#f4f4f4";
                logoText = "\ue955";
                productType_1 = value[1].type;
                wallpaperFlag_1 = value[1].isWallpaper;
                shareUrl2 = value[1].url;

                /* add to cart product*/
                if (value[1].type == "Shop" && value[1].isWallpaper == false && value[1].cartItem) {
                    cartIdArray = Titanium.App.Properties.getList('cartProductIdArray');
                    if (cartIdArray.indexOf(value[1].id) == -1) {
                        cartIdArray.push(value[1].id);
                    }
                    Titanium.App.Properties.setList('cartProductIdArray', cartIdArray);
                }

                ////end

                /*New condition for OUT OF STOCK */
                // Ti.API.info('value[1].in_stock-->'+ value[1].in_stock);
                try
                {
                    //  if (!isNullVal(value[1].in_stock)) {
                    if (value[1].type == "Shop" && value[1].isWallpaper == false) {
                        if (value[1].in_stock == 1) {
                            outOfStock2 = false;
                        } else if (value[1].in_stock == 0) {
                            outOfStock2 = true;
                        }
                    } else {

                        outOfStock2 = undefined;
                    }
                } catch(ex) {
                    outOfStock2 = undefined;
                }

                // Ti.API.info('outOfStock2 = '+outOfStock2);

            } else {
                //Ti.API.info('inside else');

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
                outOfStock2 = undefined;
            }

            // Ti.API.info('gridCart1---->'+ outOfStock1);
            // Ti.API.info('gridCart2---->'+ outOfStock2);

            listData.push({
                properties : {

                },
                template : templateName,
                gridProductname1 : {
                    text : gridProductname1,
                    collectionId : collectionId1,
                    productType : productType_0,
                    wallpaper : wallpaperFlag_0,
                },
                gridProductname2 : {
                    text : gridProductname2,
                    collectionId : collectionId2,
                    productType : productType_1,
                    wallpaper : wallpaperFlag_1,
                },
                gridCart1 : {
                    text : gridCart1,
                    product_name_ga : (!isNullVal(gridProductname1)) ? gridProductname1.toUpperCase() : gridProductname1,
                    product_sku : product_sku1,
                    // color : cartIconColor_0,
                    //color : "#fff",
                    backgroundColor : (templateName == "gridTemplate" ? cartIconColor_0 : "transparent"),
                    // borderColor : (templateName == "gridTemplate" ? cartIconColor_0 : "transparent"),
                    collectionId : collectionId1,
                    productType : productType_0,
                    wallpaper : wallpaperFlag_0,
                    color : (templateName == "gridTemplate" ? "#fff" : cartIconColor_0),
                    visible : (gridCart1 == "" ? false : ((outOfStock1) ? false : true)), // commented for time begin
                    // visible : false

                },
                gridCart2 : {
                    text : gridCart2,
                    product_name_ga : (!isNullVal(gridProductname2)) ? gridProductname2.toUpperCase() : gridProductname2,
                    product_sku : product_sku2,
                    //color : cartIconColor_1,
                    //color : "#fff",
                    collectionId : collectionId2,
                    productType : productType_1,
                    wallpaper : wallpaperFlag_1,
                    backgroundColor : (templateName == "gridTemplate" ? cartIconColor_1 : "transparent"),
                    // borderColor : (templateName == "gridTemplate" ? cartIconColor_1 : "transparent"),
                    color : (templateName == "gridTemplate" ? "#fff" : cartIconColor_1),
                    visible : (gridCart2 == "" ? false : ((outOfStock2) ? false : true)),
                    // visible : false
                },
                gridShare1 : {
                    collectionId : collectionId1,
                    text : gridShare1,
                    productType : productType_0,
                    wallpaper : wallpaperFlag_0,
                    shareUrl : shareUrl1,
                },
                gridShare2 : {
                    collectionId : collectionId2,
                    text : gridShare2,
                    productType : productType_1,
                    wallpaper : wallpaperFlag_1,
                    shareUrl : shareUrl2,
                },
                gridWish1 : {
                    collectionId : collectionId1,
                    iconValue : "\ue60b",
                    text : isSelected_0,
                    color : wishIconColor_0,
                    collectionName : gridProductname1,
                    productType : productType_0,
                    wallpaper : wallpaperFlag_0,
                    product_sku : product_sku1,
                    lost_sale : (outOfStock1) ? true : false,
                },
                gridWish2 : {
                    collectionId : collectionId2,
                    iconValue : "\ue60b",
                    text : isSelected_1,
                    color : wishIconColor_1,
                    collectionName : gridProductname2,
                    productType : productType_1,
                    wallpaper : wallpaperFlag_1,
                    product_sku : product_sku2,
                    lost_sale : (outOfStock2) ? true : false,
                },
                gridProductImage1 : {
                    image : collectionImage1,
                    collectionId : collectionId1,
                    productType : productType_0,
                    wallpaper : wallpaperFlag_0,
                },
                gridProductImage2 : {
                    image : collectionImage2,
                    collectionId : collectionId2,
                    productType : productType_1,
                    wallpaper : wallpaperFlag_1,
                },
                gridWhereToBuy1 : {
                    text : gridWhereToBuy1,
                    collectionId : collectionId1,
                    productType : productType_0,
                    wallpaper : wallpaperFlag_0,
                    product_name_ga : (!isNullVal(gridProductname1)) ? gridProductname1.toUpperCase() : gridProductname1,
                },
                gridWhereToBuy2 : {
                    text : gridWhereToBuy2,
                    collectionId : collectionId2,
                    productType : productType_1,
                    wallpaper : wallpaperFlag_1,
                    product_name_ga : (!isNullVal(gridProductname2)) ? gridProductname2.toUpperCase() : gridProductname2,
                },
                listContainer : {
                    collectionId : collectionId1,
                    productType : productType_0,
                    wallpaper : wallpaperFlag_0,
                },
                productSize1 : {
                    collectionId : collectionId1,
                    text : productSize1,
                    font : {
                        fontSize : productFontSize1
                    }
                },
                productSize2 : {
                    collectionId : collectionId2,
                    text : productSize2,
                    font : {
                        fontSize : productFontSize2
                    }
                },
                imageContainer : {
                    backgroundColor : imageContainer,
                },
                gridLogo : {
                    text : logoText
                },
                outOfStock1 : {
                    visible : (outOfStock1 || false),
                    collectionId : collectionId1,
                },
                outOfStock2 : {
                    visible : (outOfStock2 || false),
                    collectionId : collectionId2,
                }

            });
        });
        Titanium.App.Properties.setList('cartAllid', cartDataArray);
        //Ti.API.info('Titanium.App.Properties.get(cartAllid) =' + Titanium.App.Properties.getList('cartAllid'));
        $.mainSection.appendItems(listData);
        $.activityInd.hide();
        page_no++;
        if (page_no <= (Math.ceil(totalItem / limit))) {
            switch(templateName) {
            case "gridTemplate":
                $.listView.setMarker({
                    sectionIndex : 0,
                    itemIndex : ((page_no - 1) * 5) - 1,
                });
                //Ti.API.info('markerset on ' + (((page_no - 1) * 5) - 1));
                break;
            default:
                $.listView.setMarker({
                    sectionIndex : 0,
                    itemIndex : ((page_no - 1) * 10) - 1,
                });
            //Ti.API.info('markerset on ' + (((page_no - 1) * 10) - 1));
            }

            //page_no++;
        }
    } catch(e) {
        Ti.API.info('catch looping' + e.message);
    }
}

function viewTypeLooping(data, templateName) {

    //Ti.API.info('inside view type loop' + JSON.stringify(data));
    listData = [];
    var addFlag = null;
    var removeFlag = null;
    $.mainSection.setItems(listData);

    addFlag = Titanium.App.Properties.getList('removeCartProductIdArray');
    removeFlag = Titanium.App.Properties.getList('cartProductIdArray');

    if (addFlag[0] == removeFlag[0] && addFlag.length == 1 && removeFlag.length == 1) {
        //addtocartItem.splice(addtocartItem.indexOf(Titanium.App.Properties.getList('removeCartProductIdArray')), 1);
        Titanium.App.Properties.setList('cartProductIdArray', []);
    }
   // Ti.API.info('Titanium.App.Properties.get(cartAllid) =' + Titanium.App.Properties.getList('cartAllid'));
    _.each(Titanium.App.Properties.getList('cartAllid'), function(value, k) {
        // Ti.API.info('inside addtocartItem'+value);
        //if(Titanium.App.Properties.getList('removeCartProductIdArray').indexOf(value) == -1){
        var found = _.findWhere(data, {
            id : value
        });
        if (!isNullVal(found)) {
            found.cartItem = false;
        }
        // }
    });
   // Ti.API.info('Titanium.App.Properties.get(removeCartProductIdArray) =' + Titanium.App.Properties.getList('removeCartProductIdArray'));

    _.each(Titanium.App.Properties.getList('removeCartProductIdArray'), function(k, v) {
        cartProductId.splice(cartProductId.indexOf(k), 1);

        var found = _.findWhere(data, {
            id : k
        });
        if (!isNullVal(found)) {
            found.cartItem = false;
        }

    });

    // _.each(data, function(value, k) {
    // Ti.API.info('value = ' + value.product_id + " value.cartItem = " + value.cartItem);
    // if (!isNullVal(value.product_id) && !value.cartItem && !value.is_wallpaper) {
    // cartProductId.push(value.product_id);
    // }
    // });
    Ti.API.info('cartProductId = ' + cartProductId);

    // _.each(cartProductId, function(value, k) {
    //
    // var found = _.findWhere(data, {
    // id : value
    // });
    // if (!isNullVal(found)) {
    // found.cartItem = false;
    // }
    // });
    //
    // if (!isNullVal(addtocartItem)) {
    // _.each(addtocartItem, function(value, k) {
    // var found = _.findWhere(data, {
    // id : value
    // });
    // if (!isNullVal(found)) {
    // found.cartItem = true;
    // }
    // });
    // }
    Ti.API.info('Titanium.App.Properties.get(cartProductIdArray) ===' + Titanium.App.Properties.getList('cartProductIdArray'));
    _.each(Titanium.App.Properties.getList('cartProductIdArray'), function(k, v) {

        var found = _.findWhere(data, {
            id : k
        });
        if (!isNullVal(found)) {
            found.cartItem = true;
        }

    });

    if (!isNullVal(unSelectedCartItem)) {
        _.each(unSelectedCartItem, function(value, k) {
            var found = _.findWhere(data, {
                id : value
            });
            if (!isNullVal(found)) {
                found.wishlistItem = false;
            }
        });
    }

    if (!isNullVal(selectedCartItem)) {
        _.each(selectedCartItem, function(value, k) {
            var found = _.findWhere(data, {
                id : value
            });
            if (!isNullVal(found)) {
                found.wishlistItem = true;
            }
        });
    }

    if (addFlag[0] == removeFlag[0] && addFlag.length == 1 && removeFlag.length == 1) {
        Titanium.App.Properties.setList('removeCartProductIdArray', []);
        Titanium.App.Properties.setList('cartProductIdArray', []);
    }

    switch(templateName) {
    case "gridTemplate":

        var size = 2;
        var gridDataArr = [];
        var myDataArrCounter = 0;
        for (var i = 0; i < data.length; i += size) {
            var smallPaginationArray = data.slice(i, i + size);
            gridDataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallPaginationArray) + "");
            myDataArrCounter++;
        }
        var subGridData = "{" + gridDataArr + "}";
        var finalGridData = JSON.parse(subGridData);
        data = finalGridData;
        break;

    }
    if (displayCount != 0) {
        _.each(data, function(value, k) {

            if (value) {
                gridProductname1 = value.name;
                collectionId1 = value.id;
                collectionImage1 = encodeURI(value.profile_image);
                gridCart1 = ((value.type == "Shop" && value.isWallpaper == false) ? Alloy.Globals.icon.bag : "");
                isSelected_0 = ((value.type != "collection") ? ((value.wishlistItem) ? Alloy.Globals.icon.setShortlist : Alloy.Globals.icon.shortlist) : Alloy.Globals.icon.shortlist);
                gridShare1 = Alloy.Globals.icon.share;
                wishIconColor_0 = ((value.type != "collection") ? ((value.wishlistItem) ? "#e65e48" : "#a6a6a6") : "#a6a6a6");
                cartIconColor_0 = ((value.type == "Shop" && value.isWallpaper == false) ? ((value.cartItem) ? "#e65e48" : ((activeTemplate == "gridTemplate") ? "#66000000" : "#a6a6a6")) : "transparent");
                productSize1 = ((value.type == "Shop" && value.isWallpaper == false && value.product_size != "NA") ? value.product_size : "");
                productFontSize1 = ((value.type == "Shop" && value.isWallpaper == false && value.product_size != "NA") ? "9" : "0");
                gridWhereToBuy1 = ((value.type != "collection") ? Alloy.Globals.icon.currency + value.price : "Where to buy");
                imageContainer = "#f4f4f4";
                logoText = "\ue955";
                productType_0 = value.type;
                wallpaperFlag_0 = value.isWallpaper;
                shareUrl1 = value.url;

                /*New condition for OUT OF STOCK */
                try {
                    if (value.type == "Shop" && value.isWallpaper == false) {
                        if (value.in_stock == 1) {

                            outOfStock1 = false;
                            // outOfStock2 = false;
                        } else if (value.in_stock == 0) {
                            outOfStock1 = true;
                            //  outOfStock2 = false;
                        }
                    } else {
                        outOfStock1 = undefined;
                        // outOfStock2 = false;
                    }
                } catch(ex) {
                    outOfStock1 = undefined;
                }
            }

            if (value[0]) {
                Ti.API.info('value[0].cartItem = ' + value[0].cartItem);
                product_sku1 = value[0].sku;
                gridProductname1 = value[0].name;
                collectionId1 = value[0].id;
                collectionImage1 = encodeURI(value[0].profile_image);
                gridCart1 = ((value[0].type == "Shop" && value[0].isWallpaper == false) ? Alloy.Globals.icon.bag : "");
                isSelected_0 = ((value[0].type != "collection") ? ((value[0].wishlistItem) ? Alloy.Globals.icon.setShortlist : Alloy.Globals.icon.shortlist) : Alloy.Globals.icon.shortlist);
                gridShare1 = Alloy.Globals.icon.share;
                wishIconColor_0 = ((value[0].type != "collection") ? ((value[0].wishlistItem) ? "#e65e48" : "#a6a6a6") : "#a6a6a6");
                cartIconColor_0 = ((value[0].type == "Shop" && value[0].isWallpaper == false) ? ((value[0].cartItem) ? "#e65e48" : ((activeTemplate == "gridTemplate") ? "#66000000" : "#a6a6a6")) : "transparent");
                productSize1 = ((value[0].type == "Shop" && value[0].isWallpaper == false && value[0].product_size != "NA") ? value[0].product_size : "");
                productFontSize1 = ((value[0].type == "Shop" && value[0].isWallpaper == false && value[0].product_size != "NA") ? "9" : "0");
                gridWhereToBuy1 = ((value[0].type != "collection") ? Alloy.Globals.icon.currency + value[0].price : "Where to buy");
                imageContainer = "#f4f4f4";
                logoText = "\ue955";
                productType_0 = value[0].type;
                wallpaperFlag_0 = value[0].isWallpaper;
                shareUrl1 = value[0].url;

                /*New condition for OUT OF STOCK */
                try {
                    if (value[0].type == "Shop" && value[0].isWallpaper == false) {
                        if (value[0].in_stock == 1) {

                            outOfStock1 = false;
                        } else if (value[0].in_stock == 0) {
                            outOfStock1 = true;
                        }
                    } else {
                        outOfStock1 = undefined;
                    }
                } catch(ex) {
                    outOfStock1 = undefined;
                }

                // Ti.API.info('view type loop outOfStock1 = '+outOfStock1);

            }

            if (value[1]) {
                Ti.API.info('value[1].cartItem = ' + value[1].cartItem);
                product_sku2 = value[1].sku;
                gridProductname2 = value[1].name;
                collectionId2 = value[1].id;
                collectionImage2 = encodeURI(value[1].profile_image);
                gridShare2 = Alloy.Globals.icon.share;
                gridCart2 = ((value[1].type == "Shop" && value[1].isWallpaper == false) ? Alloy.Globals.icon.bag : "");
                isSelected_1 = ((value[1].type != "collection") ? ((value[1].wishlistItem) ? Alloy.Globals.icon.setShortlist : Alloy.Globals.icon.shortlist) : Alloy.Globals.icon.shortlist);
                wishIconColor_1 = ((value[1].type != "collection") ? ((value[1].wishlistItem) ? "#e65e48" : "#a6a6a6") : "#a6a6a6");
                cartIconColor_1 = ((value[1].type == "Shop" && value[1].isWallpaper == false) ? ((value[1].cartItem) ? "#e65e48" : ((activeTemplate == "gridTemplate") ? "#66000000" : "#a6a6a6")) : "transparent");
                productSize2 = ((value[1].type == "Shop" && value[1].isWallpaper == false && value[1].product_size != "NA") ? value[1].product_size : "");
                productFontSize2 = ((value[1].type == "Shop" && value[1].isWallpaper == false && value[1].product_size != "NA") ? "9" : "0");
                gridWhereToBuy2 = ((value[1].type != "collection") ? Alloy.Globals.icon.currency + value[1].price : "Where to buy");
                imageContainer = "#f4f4f4";
                logoText = "\ue955";
                productType_1 = value[1].type;
                wallpaperFlag_1 = value[1].isWallpaper;
                shareUrl2 = value[1].url;

                /*New condition for OUT OF STOCK */

                try {
                    if (value[1].type == "Shop" && value[1].isWallpaper == false) {
                        if (value[1].in_stock == 1) {
                            outOfStock2 = false;
                        } else if (value[1].in_stock == 0) {
                            outOfStock2 = true;
                        }
                    } else {
                        // outOfStock2 = false;
                        outOfStock2 = undefined;
                    }
                } catch(ex) {
                    outOfStock2 = undefined;
                }

                //  Ti.API.info('view type loop outOfStock1 = '+outOfStock1);
                Ti.API.info('value[0].type = ' + value[0].cartItem + " value[1].cartItem =" + value[1].cartItem);
                Ti.API.info('cartIconColor_0 = ' + cartIconColor_0 + "cartIconColor_1 =" + cartIconColor_1);
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
                outOfStock2 = undefined;
                // outOfStock2 = undefined;
                // outOfStock1 = undefined;

            }

            listData.push({
                properties : {
                    //collectionId : collectionId1
                },
                template : templateName,
                gridProductname1 : {
                    text : gridProductname1,
                    collectionId : collectionId1,
                    productType : productType_0,
                    wallpaper : wallpaperFlag_0,
                },
                gridProductname2 : {
                    text : gridProductname2,
                    collectionId : collectionId2,
                    productType : productType_1,
                    wallpaper : wallpaperFlag_1,
                },
                gridCart1 : {
                    text : gridCart1,
                    product_name_ga : (!isNullVal(gridProductname1)) ? gridProductname1.toUpperCase() : gridProductname1,
                    product_sku : product_sku1,
                    // color : cartIconColor_0,
                    collectionId : collectionId1,
                    productType : productType_0,
                    wallpaper : wallpaperFlag_0,
                    backgroundColor : (templateName == "gridTemplate" ? cartIconColor_0 : "transparent"),
                    color : (templateName == "gridTemplate" ? "#fff" : cartIconColor_0),
                    //    borderColor : (templateName == "gridTemplate" ? cartIconColor_0 : "transparent"),
                    // borderColor : "transparent",
                    visible : (gridCart1 == "" ? false : ((outOfStock1) ? false : true)),
                    // visible : false // added for time begin
                },
                gridCart2 : {
                    text : gridCart2,
                    product_name_ga : (!isNullVal(gridProductname2)) ? gridProductname2.toUpperCase() : gridProductname2,
                    product_sku : product_sku2,
                    //color : cartIconColor_1,
                    collectionId : collectionId2,
                    productType : productType_1,
                    wallpaper : wallpaperFlag_1,
                    backgroundColor : (templateName == "gridTemplate" ? cartIconColor_1 : "transparent"),
                    //     borderColor : (templateName == "gridTemplate" ? cartIconColor_1 : "transparent"),
                    //  borderColor : "transparent",
                    color : (templateName == "gridTemplate" ? "#fff" : cartIconColor_1),
                    visible : (gridCart2 == "" ? false : ((outOfStock2) ? false : true)),
                    //visible : false // added for time begin
                },
                gridShare1 : {
                    collectionId : collectionId1,
                    text : gridShare1,
                    productType : productType_0,
                    wallpaper : wallpaperFlag_0,
                    shareUrl : shareUrl1,
                },
                gridShare2 : {
                    collectionId : collectionId2,
                    text : gridShare2,
                    productType : productType_1,
                    wallpaper : wallpaperFlag_1,
                    shareUrl : shareUrl2,
                },
                gridWish1 : {
                    collectionId : collectionId1,
                    iconValue : "\ue60b",
                    text : isSelected_0,
                    color : wishIconColor_0,
                    collectionName : gridProductname1,
                    productType : productType_0,
                    wallpaper : wallpaperFlag_0,
                    product_sku : product_sku1,
                    lost_sale : (outOfStock1) ? true : false,
                },
                gridWish2 : {
                    collectionId : collectionId2,
                    iconValue : "\ue60b",
                    text : isSelected_1,
                    color : wishIconColor_1,
                    collectionName : gridProductname2,
                    productType : productType_1,
                    wallpaper : wallpaperFlag_1,
                    product_sku : product_sku2,
                    lost_sale : (outOfStock2) ? true : false,
                },
                gridProductImage1 : {
                    image : collectionImage1,
                    collectionId : collectionId1,
                    productType : productType_0,
                    wallpaper : wallpaperFlag_0,
                },
                gridProductImage2 : {
                    image : collectionImage2,
                    collectionId : collectionId2,
                    productType : productType_1,
                    wallpaper : wallpaperFlag_1,
                },
                gridWhereToBuy1 : {
                    text : gridWhereToBuy1,
                    collectionId : collectionId1,
                    productType : productType_0,
                    wallpaper : wallpaperFlag_0,
                    product_name_ga : (!isNullVal(gridProductname1)) ? gridProductname1.toUpperCase() : gridProductname1,
                },
                gridWhereToBuy2 : {
                    text : gridWhereToBuy2,
                    collectionId : collectionId2,
                    productType : productType_1,
                    wallpaper : wallpaperFlag_1,
                    product_name_ga : (!isNullVal(gridProductname2)) ? gridProductname2.toUpperCase() : gridProductname2,
                },
                productSize1 : {
                    collectionId : collectionId1,
                    text : productSize1,
                    font : {
                        fontSize : productFontSize1
                    }
                },
                productSize2 : {
                    collectionId : collectionId2,
                    text : productSize2,
                    font : {
                        fontSize : productFontSize2
                    }
                },
                listContainer : {
                    collectionId : collectionId1,
                    productType : productType_0,
                    wallpaper : wallpaperFlag_0,
                },
                imageContainer : {
                    backgroundColor : imageContainer
                },
                gridLogo : {
                    text : logoText
                },
                outOfStock1 : {
                    visible : (outOfStock1 || false),
                    collectionId : collectionId1,
                },
                outOfStock2 : {
                    visible : (outOfStock2 || false),
                    collectionId : collectionId2,
                }

            });
        });

    } else {

        // listData.push({
        // properties : {
        //
        // },
        // template : 'emptyTemplate',
        // message : {
        // text : "YOUR SEARCH RETURNS NO RESULTS."
        // }
        // });
    }

    $.mainSection.appendItems(listData);

    if (templateName == "gridTemplate") {
        $.listView.scrollToItem(0, (itemIndex_ / 2));
    } else {
        $.listView.scrollToItem(0, itemIndex_);
    }

    if (page_no <= (Math.ceil(totalItem / limit))) {
        switch(templateName) {
        case "gridTemplate":
            $.listView.setMarker({
                sectionIndex : 0,
                itemIndex : ((page_no / 2) * 6) - 2,//itemIndex : ((page_no / 2) * 6) - 1(07-12-2016)old,
            });
            //Ti.API.info('markerset grid on ' + (((page_no / 2) * 6) - 1));
            break;

        }
        //page_no++;
    }

}

function getCollectionListOnLazy(page_no, limit) {
    $.activityInd.show();
    var data = {};

    _.each(filters, function(value, key) {
        if (value.length > 0) {
            filtersData[key] = value.join(",");
        }
    });

    url = Alloy.Globals.commonUrl.search;
    data = {
        "q" : searchText, //$.SearchTxt.getValue()
        "sortby" : sortBy || "",
        "pagination" : {}
    };

    data.pagination = {
        "page_no" : page_no,
        "page_size" : limit
    };
    if (_.size(filtersData) > 0) {
        data['filters'] = filtersData;
    } else {
        data['filters'] = "";
    }

    var requestParams = JSON.stringify(data);

    Alloy.Globals.webServiceCall(url, requestParams, subCollectionSuccessCallback, subCollectionErrorCallback, "POST", $.searchListing);

}

$.listView.addEventListener("marker", function() {
    //Ti.API.info('marker = page_no = ' + page_no + "(Math.ceil(totalItem / limit)) =" + (Math.ceil(totalItem / limit)) + "limit = " + limit);
    if (page_no <= (Math.ceil(totalItem / limit))) {
        getCollectionListOnLazy(page_no, limit);
    }
});

$.listView.addEventListener('scrollstart', function(e) {
    firstCount = e.firstVisibleItemIndex;
});

$.listView.addEventListener("scrollend", function(e) {
    //Ti.API.info('scroll end = '+JSON.stringify(e.firstVisibleItemIndex));

    if (totalItem <= 6 && activeTemplate == "gridTemplate") {
        $.filterContainer.animate({
            top : "0",
            duration : 500
        });

        $.styleFilterView.animate({
            top : "35",
            duration : 500
        });

        $.listView.animate({
            top : "70",
            duration : 500
        });

        $.listTypeContainer.animate({
            bottom : "-65", //-65
            duration : 500
        });
    } else {

        if (activeTemplate == "gridTemplate") {
            itemIndex_ = (e.firstVisibleItemIndex * 2);
        } else {
            itemIndex_ = e.firstVisibleItemIndex;
        }

        //hide show effect

        secondCount = e.firstVisibleItemIndex;

        if (firstCount < secondCount) {

            $.filterContainer.animate({
                top : "-35",
                duration : 500
            });

            $.styleFilterView.animate({
                top : "0",
                duration : 500
            });

            $.listView.animate({
                top : "35",
                duration : 500
            });

            $.listTypeContainer.animate({
                bottom : "-65",
                duration : 500
            });

        } else if (firstCount > secondCount) {

            $.filterContainer.animate({
                top : "0",
                duration : 500
            });
            $.styleFilterView.animate({
                top : "35",
                duration : 500
            });

            $.listView.animate({
                top : "70",
                duration : 500
            });

            $.listTypeContainer.animate({
                bottom : "-100",
                duration : 500
            });
        }
    }
});

$.filterApplyLbl.addEventListener('click', function(e) {
    // setTimeout(function() {
    // hideShowView($.filterView);
    // }, 1500);
    hideShowView($.filterView);
    getSearchData(searchText);
});

$.overFlowMenuLbl.addEventListener('click', showOverFlow);

function showOverFlow(e) {
    $.openView.visible = true;
    Alloy.Globals.overFlowFlag = true;
}

$.overFlowView.removeEventListener('click', hideOverFlow);
$.overFlowView.addEventListener('click', hideOverFlow);

function hideOverFlow(e) {

    if (Alloy.Globals.overFlowFlag) {
        $.openView.visible = false;
        Alloy.Globals.overFlowFlag = false;
    }
};
$.openView.addEventListener('click', hideOverFlow);

////////////////////////////////////////////////////////////////////////////////////////////////////
function goToBack() {
    if (addShortlist.type == "shortlist") {
        hideShowView(addShortlist);
        addShortlist = "";
    } else if ($.sortView.getVisible()) {
        hideShowView($.sortView);
    } else if ($.filterView.getVisible()) {
        hideShowView($.filterView);
    } else {
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

$.refreshIcon.addEventListener('click', function(e) {
    $.filterByContainer.removeAllChildren();
    filters = {};
    setTimeout(function(e) {
        addFilterByRows(filterRawData);
    }, 300);
});

$.homeLbl.addEventListener('click', function() {
    Alloy.Globals.addWindowInNav("aboutUs");

});

$.home.addEventListener('click', function(e) {

    Alloy.Globals.popWindowInNav();
    Alloy.Globals.destroyWindowInNav();
    $.searchListing.close();

});

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

$.return_refund.addEventListener('click', function(e) {
    Alloy.Globals.addWindowInNav('returnRefund');
});

$.faq.addEventListener('click', function(e) {
    //Alloy.Globals.addWindowInNav('faq');
    Alloy.Globals.addWindowInNav('privacypolicy');
    //privacypolicy
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

function blurText() {
    Ti.API.info('blur');
    $.headerSearchTxt.blur();
    $.SearchTxt.blur();
}

function updateItemListClick(e) {
    Ti.API.info('fireEvent');
    $.listView.fireEvent("itemclick", e);
}

function navigateToPrivacy() {
    $.openView.visible = false;
    Alloy.Globals.overFlowFlag = false;
    Alloy.Globals.addWindowInNav('privacypolicy');
}

