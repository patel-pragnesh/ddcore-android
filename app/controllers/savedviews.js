var args = arguments[0] || {};

var itemIndex = null,
    firstLoad = true,
    currentPage = 1,
    currentFilter = "All";

init();

function init() {
    showSavedlooks();
}

function showDropdownList() {
    if ($.dropDownList.visible) {
        var arrow = Ti.UI.create2DMatrix({
            rotate : 0
        });
        $.allrooms_arrow.transform = arrow;

        //setTimeout(function() {
        $.dropDownList.setVisible(false);
        $.dropDownBg.setVisible(false);
        $.popContainer.setVisible(false);
        //}, 400);

    } else {

        var arrow = Ti.UI.create2DMatrix({
            rotate : 180
        });
        $.allrooms_arrow.transform = arrow;

        //setTimeout(function() {
        $.dropDownList.setVisible(true);
        $.dropDownBg.setVisible(true);
        
        $.popContainer.setVisible(true);
        //}, 400);
    }
}

function dropDownListSelection(e) {
    $.allrooms_btn.text = e.source.text;
    currentFilter = e.source.id;
    //Ti.API.info('currentFilter-->' + currentFilter);
    showDropdownList();
    currentPage = 1;
    //showLoader(args.container);
    showFullLoader(args.container);
    $.saveViewSection.setItems([]);
    init();
}

function showSavedlooks() {
    if (firstLoad) {
        //showLoader(args.container);
        showFullLoader(args.container);
    } else {
        $.loader.show();
    }

    var requestMethod = Alloy.Globals.commonUrl.showSavedlooks;
    var param = {
        page_size : 1,
        page_no : currentPage,
        filter : currentFilter
    };
    if (currentFilter == "All") {
        param.page_size = -1;
    }

    var requestParams = JSON.stringify(param);
    //Ti.API.info('requestParam-->' + requestParams);

    Alloy.Globals.webServiceCall(requestMethod, requestParams, showSavedlooksSuccessCallback, showSavedlooksErrorCallback, "POST", args.mainWindow);
}

function showSavedlooksSuccessCallback(response) {
    //Ti.API.info('savedlooks success response-->' + JSON.stringify(response));

    if (response.data.look_info.length === 0) {
        if (firstLoad) {
            args.container.removeAllChildren();
            args.loadDefaultScreen("savedviews");

        } else {

            //$.noProduct.setVisible(true);
            //$.noProduct.setHeight("20dp");

            $.loadMore.setVisible(false);

            showAlert($.savedviews, "No More Saved View to Load");
        }
    } else {
        // load looks
        //Ti.API.info('response [0] -->' + response.data.look_info);
        // var data = JSON.parse(response.data[0].dimaginer_jsons);
        if (firstLoad) {
            setFilters(response);
            firstLoad = false;
        }
        setLooks(response.data.look_info);
        
        if(response.data.look_info.length ===1){
            $.loadMore.setVisible(false);
        }
        else{
            
            $.loadMore.setVisible(true);
        }
        
        if (currentFilter == "All") {
            //Ti.API.info('into if');
            $.loadMore.setVisible(false);
            // $.loadMore.setTouchEnabled(false);
        }
    }
    hideLoader();
    hideFullLoader();
    $.loader.hide();

}

function showSavedlooksErrorCallback(response) {
    hideLoader();
    hideFullLoader();
    $.loader.hide();
    showAlert(args.mainWindow, response.message);
}

function setLooks(data) {
    //Ti.API.info('data' + JSON.stringify(data));
    var lookList = data;
    var listData = [];
    _.each(lookList, function(value, k) {

        listData.push({
            layoutName : {
                text : (value.layout_name || "").toUpperCase(),

            },
            layoutImage : {
                image : (encodeURI(value.magento_image_path) || "") //empty
            },
            roomType : {
                text : (value.layout_name || "").toUpperCase()
            },
            layoutDate : {
                text : (moment(value.last_modified).format('DD MMMM, YYYY')).toUpperCase(),
            },
            share : {
                shareImage : (value.magento_image_path || ""),
            },
            download : {
                downloadImage : (value.magento_image_path || ""),
            },
            deleteView : {
                layoutId : value.layout_id
            }
        });
    });

    $.saveViewSection.appendItems(listData);

}

function saveViewListItemClick(e) {
    var bindId = e.bindId;
    var index = e.itemIndex;
    itemIndex = index;
    var currentItem,
        listItem;
    if (bindId) {
        var bind = bindId;
        currentItem = e.section.items[index];
        listItem = currentItem[bind];
        // Ti.API.info('a = ' + currentItem[bind].collectionId);
    }

    if (bindId == "share") {
        //Ti.API.info('e is ' +JSON.stringify(e));
        //Ti.API.info('chaks'+JSON.stringify(currentItem.share.shareImage));
        // socialShare();
        // var shareProductUrl='http://dev.ddecor.com/collection/silky-satin';
        shareImage(currentItem.share.shareImage);
        // //Ti.API.info('into share');
        // socialShare();
    } else if (bindId == "download") {
        //Ti.API.info('into download');
        showAlert($.savedviews, "Started downloading...");
        downloadImage(listItem.downloadImage);

    } else if (bindId == "deleteView") {

        // Ti.API.info('layoutId--->\t' + listItem.layoutId);
        // Ti.API.info('into deleted');
        /*
         =======
         //Ti.API.info('layoutId--->\t' + listItem.layoutId);
         //Ti.API.info('into deleted');

         >>>>>>> 63c351c1bb15b335611f0d851fbc4c378296d591
         var deleteConfirmation = $.UI.create("AlertDialog", {
         message : 'Are you sure ?',
         title : 'Delete Save Views',
         cancel : 1,
         buttonNames : ['Yes', 'No'],
         });

         deleteConfirmation.addEventListener('click', function(ex) {
         if (ex.index === 0) {
         deleteSaveView(listItem.layoutId);
         } else {
         deleteConfirmation = null;
         this.removeEventListener('click', arguments.callee, false);
         }
         });

         deleteConfirmation.show();
         */

        deleteSaveView(listItem.layoutId);
    }

}

function deleteSaveView(id) {
    //showLoader(args.container);
    /*
     showFullLoader(args.container);

     var requestMethod = Alloy.Globals.commonUrl.deleteSaveView;
     var param = {
     id : id
     };

     var requestParams = JSON.stringify(param);
     //Ti.API.info('requestParam-->' + requestParams);

     Alloy.Globals.webServiceCall(requestMethod, requestParams, deleteSaveViewSuccessCallback, deleteSaveViewErrorCallback, "POST", args.mainWindow);
     */
    args.androidBack();
    var requestMethod = Alloy.Globals.commonUrl.deleteSaveView;
    var param = {
        id : id
    };

    var requestParams = JSON.stringify(param);

    args.mainWindow.add(Alloy.createController("confirmation", {
        requestMethod : requestMethod,
        requestParam : requestParams,
        successCallback : deleteSaveViewSuccessCallback,
        errorCallback : deleteSaveViewErrorCallback,
        windowContainer : args.mainWindow,
        message : "Are you sure you want to delete this saved view ?",
        productName : "",
        showLoader : showTransparentLoader,
    }).getView());

}

function deleteSaveViewSuccessCallback(response) {
    //Ti.API.info('into delete view -->' + JSON.stringify(response));

    args.closeAndroidBack();

    hideLoader();
    hideFullLoader();
    hideTransparentLoader();

    $.saveViewSection.deleteItemsAt(itemIndex, 1, {
        animated : true
    });

    if ($.saveViewSection.getItems().length == 0) {
        $.noProduct.setVisible(true);
        $.noProduct.setHeight("20dp");
        $.loadMore.setVisible(false);
    }

}

function deleteSaveViewErrorCallback(response) {
    //Ti.API.info('into delete view -->' + JSON.stringify(response));
    hideLoader();
    hideFullLoader();
    hideTransparentLoader();
    args.closeAndroidBack();
}

function setFilters(response) {
    //<Label id="allItem" class="dropDownLbl fontMedium" top="5dp" onClick="dropDownListSelection">ALL ROOMS</Label>

    var _createLabel = function(lblTxt, lblId) {
        var lbl = $.UI.create("Label", {
            id : lblId,
            text : lblTxt.toUpperCase(),
            //left:"40dp",
            classes : "dropDownLbl fontMedium",
            right : "20dp",
            wordWrap : true,
            width : "120dp",
            textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT
        });
        if ($.dropDownList.getChildren() === 0) {
            lbl.setTop("5dp");
            $.allitem_lbl.setText(lblTxt.toUpperCase());
        }
        touchEffect.createTouchEffect(lbl, Alloy.Globals.labelTitleColor, "#000000");
        lbl.addEventListener("click", dropDownListSelection);

        return lbl;
    };
    var filterList = response.data.filters;

    for (var i = 0; i < filterList.length; i++) {
        $.dropDownList.add(_createLabel(filterList[i], filterList[i]));
    }

}

function downloadImage(image) {
    var _image = $.UI.create("ImageView", {
        image : image,
        width : "100dp",
        height : "100dp"
    });
    var blob = _image.toBlob();

    Ti.Media.saveToPhotoGallery(blob);
    //Ti.API.info('save to photo gallery');
}

function loadMore() {
    currentPage++;
    init();
}

function hideDropdownList() {
    if ($.dropDownList.getVisible()) {

        var arrow = Ti.UI.create2DMatrix({
            rotate : 0
        });
        $.allrooms_arrow.transform = arrow;

        //setTimeout(function() {
        $.dropDownList.setVisible(false);
        $.dropDownBg.setVisible(false);
        $.popContainer.setVisible(false);
    }
}
