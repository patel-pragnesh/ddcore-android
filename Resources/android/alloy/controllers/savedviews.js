function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function init() {
        showSavedlooks();
    }
    function showDropdownList() {
        if ($.dropDownList.visible) {
            var arrow = Ti.UI.create2DMatrix({
                rotate: 0
            });
            $.allrooms_arrow.transform = arrow;
            $.dropDownList.setVisible(false);
            $.dropDownBg.setVisible(false);
            $.popContainer.setVisible(false);
        } else {
            var arrow = Ti.UI.create2DMatrix({
                rotate: 180
            });
            $.allrooms_arrow.transform = arrow;
            $.dropDownList.setVisible(true);
            $.dropDownBg.setVisible(true);
            $.popContainer.setVisible(true);
        }
    }
    function dropDownListSelection(e) {
        $.allrooms_btn.text = e.source.text;
        currentFilter = e.source.id;
        showDropdownList();
        currentPage = 1;
        showFullLoader(args.container);
        $.saveViewSection.setItems([]);
        init();
    }
    function showSavedlooks() {
        firstLoad ? showFullLoader(args.container) : $.loader.show();
        var requestMethod = Alloy.Globals.commonUrl.showSavedlooks;
        var param = {
            page_size: 1,
            page_no: currentPage,
            filter: currentFilter
        };
        "All" == currentFilter && (param.page_size = -1);
        var requestParams = JSON.stringify(param);
        Alloy.Globals.webServiceCall(requestMethod, requestParams, showSavedlooksSuccessCallback, showSavedlooksErrorCallback, "POST", args.mainWindow);
    }
    function showSavedlooksSuccessCallback(response) {
        if (0 === response.data.look_info.length) if (firstLoad) {
            args.container.removeAllChildren();
            args.loadDefaultScreen("savedviews");
        } else {
            $.loadMore.setVisible(false);
            showAlert($.savedviews, "No More Saved View to Load");
        } else {
            if (firstLoad) {
                setFilters(response);
                firstLoad = false;
            }
            setLooks(response.data.look_info);
            1 === response.data.look_info.length ? $.loadMore.setVisible(false) : $.loadMore.setVisible(true);
            "All" == currentFilter && $.loadMore.setVisible(false);
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
        var lookList = data;
        var listData = [];
        _.each(lookList, function(value, k) {
            listData.push({
                layoutName: {
                    text: (value.layout_name || "").toUpperCase()
                },
                layoutImage: {
                    image: encodeURI(value.magento_image_path) || ""
                },
                roomType: {
                    text: (value.layout_name || "").toUpperCase()
                },
                layoutDate: {
                    text: moment(value.last_modified).format("DD MMMM, YYYY").toUpperCase()
                },
                share: {
                    shareImage: value.magento_image_path || ""
                },
                download: {
                    downloadImage: value.magento_image_path || ""
                },
                deleteView: {
                    layoutId: value.layout_id
                }
            });
        });
        $.saveViewSection.appendItems(listData);
    }
    function saveViewListItemClick(e) {
        var bindId = e.bindId;
        var index = e.itemIndex;
        itemIndex = index;
        var currentItem, listItem;
        if (bindId) {
            var bind = bindId;
            currentItem = e.section.items[index];
            listItem = currentItem[bind];
        }
        if ("share" == bindId) shareImage(currentItem.share.shareImage); else if ("download" == bindId) {
            showAlert($.savedviews, "Started downloading...");
            downloadImage(listItem.downloadImage);
        } else "deleteView" == bindId && deleteSaveView(listItem.layoutId);
    }
    function deleteSaveView(id) {
        args.androidBack();
        var requestMethod = Alloy.Globals.commonUrl.deleteSaveView;
        var param = {
            id: id
        };
        var requestParams = JSON.stringify(param);
        args.mainWindow.add(Alloy.createController("confirmation", {
            requestMethod: requestMethod,
            requestParam: requestParams,
            successCallback: deleteSaveViewSuccessCallback,
            errorCallback: deleteSaveViewErrorCallback,
            windowContainer: args.mainWindow,
            message: "Are you sure you want to delete this saved view ?",
            productName: "",
            showLoader: showTransparentLoader
        }).getView());
    }
    function deleteSaveViewSuccessCallback(response) {
        args.closeAndroidBack();
        hideLoader();
        hideFullLoader();
        hideTransparentLoader();
        $.saveViewSection.deleteItemsAt(itemIndex, 1, {
            animated: true
        });
        if (0 == $.saveViewSection.getItems().length) {
            $.noProduct.setVisible(true);
            $.noProduct.setHeight("20dp");
            $.loadMore.setVisible(false);
        }
    }
    function deleteSaveViewErrorCallback(response) {
        hideLoader();
        hideFullLoader();
        hideTransparentLoader();
        args.closeAndroidBack();
    }
    function setFilters(response) {
        var _createLabel = function(lblTxt, lblId) {
            var lbl = $.UI.create("Label", {
                id: lblId,
                text: lblTxt.toUpperCase(),
                classes: "dropDownLbl fontMedium",
                right: "20dp",
                wordWrap: true,
                width: "120dp",
                textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT
            });
            if (0 === $.dropDownList.getChildren()) {
                lbl.setTop("5dp");
                $.allitem_lbl.setText(lblTxt.toUpperCase());
            }
            touchEffect.createTouchEffect(lbl, Alloy.Globals.labelTitleColor, "#000000");
            lbl.addEventListener("click", dropDownListSelection);
            return lbl;
        };
        var filterList = response.data.filters;
        for (var i = 0; i < filterList.length; i++) $.dropDownList.add(_createLabel(filterList[i], filterList[i]));
    }
    function downloadImage(image) {
        var _image = $.UI.create("ImageView", {
            image: image,
            width: "100dp",
            height: "100dp"
        });
        var blob = _image.toBlob();
        Ti.Media.saveToPhotoGallery(blob);
    }
    function loadMore() {
        currentPage++;
        init();
    }
    function hideDropdownList() {
        if ($.dropDownList.getVisible()) {
            var arrow = Ti.UI.create2DMatrix({
                rotate: 0
            });
            $.allrooms_arrow.transform = arrow;
            $.dropDownList.setVisible(false);
            $.dropDownBg.setVisible(false);
            $.popContainer.setVisible(false);
        }
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "savedviews";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.savedviews = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        id: "savedviews"
    });
    $.__views.savedviews && $.addTopLevelView($.__views.savedviews);
    hideDropdownList ? $.addListener($.__views.savedviews, "click", hideDropdownList) : __defers["$.__views.savedviews!click!hideDropdownList"] = true;
    $.__views.__alloyId1449 = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        right: 10,
        top: 10,
        bubbleParent: false,
        layout: "horizontal",
        id: "__alloyId1449"
    });
    $.__views.savedviews.add($.__views.__alloyId1449);
    $.__views.allrooms_btn = Ti.UI.createLabel({
        color: Alloy.Globals.labelTitleColor,
        font: {
            fontFamily: "futura-hv-bt-heavy",
            fontSize: "10dp"
        },
        right: "5dp",
        width: "100dp",
        ellipsize: true,
        wordWrap: false,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        text: "ALL ROOMS",
        id: "allrooms_btn",
        top: 0
    });
    $.__views.__alloyId1449.add($.__views.allrooms_btn);
    showDropdownList ? $.addListener($.__views.allrooms_btn, "touchstart", showDropdownList) : __defers["$.__views.allrooms_btn!touchstart!showDropdownList"] = true;
    $.__views.allrooms_arrow = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "5dp"
        },
        color: "#000",
        text: Alloy.Globals.icon.dropdownArrow,
        id: "allrooms_arrow",
        top: 4,
        right: "5dp"
    });
    $.__views.__alloyId1449.add($.__views.allrooms_arrow);
    showDropdownList ? $.addListener($.__views.allrooms_arrow, "touchstart", showDropdownList) : __defers["$.__views.allrooms_arrow!touchstart!showDropdownList"] = true;
    $.__views.footerView = Ti.UI.createView({
        id: "footerView",
        height: "20dp"
    });
    $.__views.loader = Ti.UI.createActivityIndicator({
        id: "loader",
        top: 5
    });
    $.__views.footerView.add($.__views.loader);
    $.__views.noProduct = Ti.UI.createLabel({
        top: "10dp",
        height: "0dp",
        visible: false,
        color: "#4d000000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "YOU HAVE NO SAVED VIEWED",
        id: "noProduct"
    });
    $.__views.loadMore = Ti.UI.createLabel({
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        bottom: "10dp",
        width: "90%",
        height: "35dp",
        font: {
            fontSize: "12dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        backgroundColor: "#4d000000",
        text: "LOAD MORE",
        id: "loadMore",
        top: "10dp"
    });
    loadMore ? $.addListener($.__views.loadMore, "click", loadMore) : __defers["$.__views.loadMore!click!loadMore"] = true;
    var __alloyId1451 = {};
    var __alloyId1454 = [];
    var __alloyId1455 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId1456 = [];
            var __alloyId1458 = {
                type: "Ti.UI.Label",
                bindId: "layoutName",
                properties: {
                    color: "#000",
                    font: {
                        fontSize: "12dp",
                        fontFamily: "futura-hv-bt-heavy"
                    },
                    top: 0,
                    left: "5%",
                    text: "VISHAL'S STUDY",
                    bindId: "layoutName"
                }
            };
            __alloyId1456.push(__alloyId1458);
            var __alloyId1460 = {
                type: "Ti.UI.ImageView",
                bindId: "layoutImage",
                properties: {
                    backgroundColor: "#6E6E6E",
                    width: "60dp",
                    height: "60dp",
                    left: "5%",
                    top: "20%",
                    bindId: "layoutImage"
                }
            };
            __alloyId1456.push(__alloyId1460);
            var __alloyId1462 = {
                type: "Ti.UI.Label",
                bindId: "roomType",
                properties: {
                    color: Alloy.Globals.labelTitleColor,
                    font: {
                        fontSize: "10dp",
                        fontFamily: "futura-hv-bt-heavy"
                    },
                    top: "20%",
                    left: "90dp",
                    text: "VISHAL'S STUDY 02",
                    bindId: "roomType"
                }
            };
            __alloyId1456.push(__alloyId1462);
            var __alloyId1464 = {
                type: "Ti.UI.Label",
                bindId: "layoutDate",
                properties: {
                    top: "36%",
                    color: "#000",
                    font: {
                        fontSize: "8dp",
                        fontFamily: "futura_medium_bt-webfont"
                    },
                    left: "90dp",
                    text: "20 NOVEMEBER 2015",
                    bindId: "layoutDate"
                }
            };
            __alloyId1456.push(__alloyId1464);
            var __alloyId1466 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId1467 = [];
                    var __alloyId1469 = {
                        type: "Ti.UI.Label",
                        bindId: "share",
                        properties: {
                            font: {
                                fontFamily: "icomoon",
                                fontSize: "16dp"
                            },
                            text: Alloy.Globals.icon.share,
                            color: "#a6a6a6",
                            right: 14,
                            textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                            width: "20dp",
                            height: "20dp",
                            bindId: "share"
                        }
                    };
                    __alloyId1467.push(__alloyId1469);
                    var __alloyId1471 = {
                        type: "Ti.UI.Label",
                        bindId: "download",
                        properties: {
                            font: {
                                fontFamily: "icomoon",
                                fontSize: "16dp"
                            },
                            text: Alloy.Globals.icon.download,
                            color: "#a6a6a6",
                            right: 14,
                            textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                            width: "20dp",
                            height: "20dp",
                            bindId: "download"
                        }
                    };
                    __alloyId1467.push(__alloyId1471);
                    var __alloyId1473 = {
                        type: "Ti.UI.Label",
                        bindId: "deleteView",
                        properties: {
                            font: {
                                fontFamily: "icomoon",
                                fontSize: "16dp"
                            },
                            text: Alloy.Globals.icon.deleteIcon,
                            color: "#a6a6a6",
                            right: 14,
                            textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                            width: "20dp",
                            height: "20dp",
                            bindId: "deleteView"
                        }
                    };
                    __alloyId1467.push(__alloyId1473);
                    return __alloyId1467;
                }(),
                properties: {
                    width: Titanium.UI.SIZE,
                    height: Titanium.UI.SIZE,
                    right: "5dp",
                    top: "20%",
                    layout: "horizontal"
                }
            };
            __alloyId1456.push(__alloyId1466);
            return __alloyId1456;
        }(),
        properties: {
            width: Titanium.UI.FILL,
            top: "2%",
            height: "100dp"
        }
    };
    __alloyId1454.push(__alloyId1455);
    var __alloyId1453 = {
        properties: {
            height: Ti.UI.SIZE,
            backgroundColor: "transparent",
            width: Ti.UI.FILL,
            layout: "vertical",
            name: "saveViewTemplate",
            selectionStyle: "none"
        },
        childTemplates: __alloyId1454
    };
    __alloyId1451["saveViewTemplate"] = __alloyId1453;
    $.__views.saveViewSection = Ti.UI.createListSection({
        id: "saveViewSection"
    });
    var __alloyId1475 = [];
    __alloyId1475.push($.__views.saveViewSection);
    $.__views.viewLists = Ti.UI.createListView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        sections: __alloyId1475,
        templates: __alloyId1451,
        footerView: $.__views.loadMore,
        id: "viewLists",
        top: 40,
        defaultItemTemplate: "saveViewTemplate"
    });
    $.__views.savedviews.add($.__views.viewLists);
    saveViewListItemClick ? $.addListener($.__views.viewLists, "itemclick", saveViewListItemClick) : __defers["$.__views.viewLists!itemclick!saveViewListItemClick"] = true;
    $.__views.popContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        id: "popContainer",
        top: 0,
        left: 0,
        zIndex: 30,
        visible: false
    });
    $.__views.savedviews.add($.__views.popContainer);
    hideDropdownList ? $.addListener($.__views.popContainer, "touchstart", hideDropdownList) : __defers["$.__views.popContainer!touchstart!hideDropdownList"] = true;
    $.__views.dropDownList = Ti.UI.createScrollView({
        visible: false,
        layout: "vertical",
        height: "138dp",
        width: "130dp",
        top: "7%",
        zIndex: 2,
        right: "3%",
        backgroundColor: "#fff",
        scrollType: "vertical",
        id: "dropDownList"
    });
    $.__views.popContainer.add($.__views.dropDownList);
    $.__views.All = Ti.UI.createLabel({
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#000",
        top: "5dp",
        left: "5dp",
        right: "20dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        text: "ALL ROOMS",
        id: "All"
    });
    $.__views.dropDownList.add($.__views.All);
    dropDownListSelection ? $.addListener($.__views.All, "click", dropDownListSelection) : __defers["$.__views.All!click!dropDownListSelection"] = true;
    $.__views.dropDownBg = Ti.UI.createView({
        backgroundColor: "transparent",
        borderColor: "#a0a0a0",
        borderWidth: .5,
        height: "160dp",
        width: "130dp",
        zIndex: 3,
        top: 8,
        right: "3%",
        visible: false,
        touchEnabled: false,
        id: "dropDownBg"
    });
    $.__views.popContainer.add($.__views.dropDownBg);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var itemIndex = null, firstLoad = true, currentPage = 1, currentFilter = "All";
    init();
    __defers["$.__views.savedviews!click!hideDropdownList"] && $.addListener($.__views.savedviews, "click", hideDropdownList);
    __defers["$.__views.allrooms_btn!touchstart!showDropdownList"] && $.addListener($.__views.allrooms_btn, "touchstart", showDropdownList);
    __defers["$.__views.allrooms_arrow!touchstart!showDropdownList"] && $.addListener($.__views.allrooms_arrow, "touchstart", showDropdownList);
    __defers["$.__views.loadMore!click!loadMore"] && $.addListener($.__views.loadMore, "click", loadMore);
    __defers["$.__views.viewLists!itemclick!saveViewListItemClick"] && $.addListener($.__views.viewLists, "itemclick", saveViewListItemClick);
    __defers["$.__views.popContainer!touchstart!hideDropdownList"] && $.addListener($.__views.popContainer, "touchstart", hideDropdownList);
    __defers["$.__views.All!click!dropDownListSelection"] && $.addListener($.__views.All, "click", dropDownListSelection);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;