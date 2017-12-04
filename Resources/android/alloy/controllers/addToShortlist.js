function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function displayFabric(e) {
        fabrics = [];
        ckeckLbl = [];
        _.each(e, function(value, k) {
            fabricsContainer = Ti.UI.createView({
                width: fabricsWidthHeight,
                height: fabricsWidthHeight,
                top: "10dp",
                left: "10dp",
                id: value.entity_id,
                name: value.name,
                type: "fabricsCont"
            });
            fabrics = Ti.UI.createImageView({
                width: Ti.UI.FILL,
                height: Ti.UI.FILL,
                image: value.image,
                defaultImage: "/images/default_logo.png",
                top: "0dp",
                left: "0dp",
                borderColor: "#e65e48",
                borderWidth: "2",
                touchEnabled: false
            });
            fabricsContainer.add(fabrics);
            fabrics = null, ckeckLbl = Ti.UI.createLabel({
                width: "15dp",
                height: "15dp",
                right: "0dp",
                bottom: "0dp",
                text: Alloy.Globals.icon.tick,
                backgroundColor: "#e65e48",
                font: {
                    fontSize: "10dp",
                    fontFamily: "icomoon"
                },
                textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                color: "#ffffff",
                touchEnabled: false
            });
            fabricsContainer.add(ckeckLbl);
            ckeckLbl = null;
            $.fabricSelectedContainer.add(fabricsContainer);
            selectedFabrics.push(value.entity_id);
            gaSelectedFabrics.push(value.name + "(" + value.entity_id + ")");
            !isNullVal(value.product_sku);
        });
        hideLoader($.collectionFabricController);
    }
    function fabricsSelectedEffect(e) {
        if ("fabricsCont" == e.source.type) if ("2" == e.source.children[0].borderWidth) {
            e.source.children[0].borderWidth = "0";
            e.source.children[1].backgroundColor = "transparent";
            e.source.children[1].text = "";
            selectedFabrics.splice(selectedFabrics.indexOf(e.source.id), 1);
            gaSelectedFabrics.splice(gaSelectedFabrics.indexOf(e.source.name + "(" + e.source.id + ")"), 1);
            setAttributeStr(selectedFabrics.length);
        } else {
            e.source.children[0].borderWidth = "2";
            e.source.children[1].backgroundColor = "#e65e48";
            e.source.children[1].text = Alloy.Globals.icon.tick;
            selectedFabrics.push(e.source.id);
            gaSelectedFabrics.push(e.source.name + "(" + e.source.id + ")");
            setAttributeStr(selectedFabrics.length);
        }
    }
    function getCollectionProduct(e) {
        showLoader($.collectionFabricController);
        var url = "";
        var data = {};
        if ("collection" == args.type) {
            url = Alloy.Globals.commonUrl.getCollectionProducts;
            data["collection_id"] = args.collectionId;
        } else if ("shopByLook" == args.type) {
            url = Alloy.Globals.commonUrl.getLookProducts;
            data["look_id"] = args.collectionId;
        }
        var requestParams = JSON.stringify(data);
        Alloy.Globals.webServiceCall(url, requestParams, getCollectionProductSuccessCallback, getCollectionProductErrorCallback, "POST", $.collectionFabricController, true);
    }
    function getCollectionProductSuccessCallback(e) {
        try {
            if (e.data.count > 0) {
                $.shortlistContainer.visible = true;
                selectedCount = e.data.count + " Selected";
                setAttributeStr(e.data.count);
                displayFabric(e.data.products);
            } else {
                showAlert($.collectionFabricController, "There are no products in this collection");
                setTimeout(function() {
                    hideShowView($.collectionFabricController);
                }, 2e3);
            }
        } catch (e) {
            Ti.API.info("catch = " + JSON.stringify(e));
        }
    }
    function getCollectionProductErrorCallback(e) {
        hideLoader($.collectionFabricController);
        showAlert($.collectionFabricController, e.message);
        setTimeout(function() {
            $.collectionFabricController.type = "";
            hideShowView($.collectionFabricController);
        }, 2e3);
    }
    function setAttributeStr(count) {
        selectedCount = count + " Selected";
        var attr = Ti.UI.createAttributedString({
            text: selectedCount,
            attributes: [ {
                type: Ti.UI.ATTRIBUTE_FONT,
                value: {
                    color: "#e65e48",
                    font: {
                        fontFamily: "futura_medium_bt-webfont"
                    }
                },
                range: [ selectedCount.indexOf(count + ""), (count + "").length ]
            } ]
        });
        $.selectedCountLbl.attributedString = attr;
    }
    function addToShortlist(e) {
        if (selectedFabrics.length <= 0) showAlert($.collectionFabricController, "Please select the products you wish to shortlist"); else {
            showAlert($.collectionFabricController, "Processing...", true);
            $.shortlistSelectedLbl.touchEnabled = false;
            $.fabricCloseLbl.touchEnabled = false;
            var url = Alloy.Globals.commonUrl.addToShortlist;
            var data = {};
            data["product_id"] = selectedFabrics.join(",");
            var requestParams = JSON.stringify(data);
            Alloy.Globals.webServiceCall(url, requestParams, addToShortlistSuccessCallback, addToShortlistErrorCallback, "POST", $.collectionFabricController);
        }
    }
    function addToShortlistSuccessCallback(e) {
        try {
            Alloy.Globals.shortlistCount = e.count;
            if (!isNullVal(args.mainWindow)) {
                Ti.API.info("into focus function ****************");
                args.mainWindow.fireEvent("focus");
            }
            $.shortlistSelectedLbl.touchEnabled = true;
            showAlert($.collectionFabricController, e.message);
            setTimeout(function() {
                $.collectionFabricController.type = "";
                $.fabricCloseLbl.touchEnabled = true;
                hideShowView($.collectionFabricController);
            }, 500);
            _.each(gaSelectedFabrics, function(value, k) {
                googleAnalyticsQdsShortlist(value, args.type + " page");
            });
        } catch (ex) {
            $.shortlistSelectedLbl.touchEnabled = true;
            Ti.API.info("catch = " + ex.message);
        }
        $.collectionFabricController.remove(Alloy.Globals.toast);
    }
    function addToShortlistErrorCallback(e) {
        $.shortlistSelectedLbl.touchEnabled = true;
        showAlert($.collectionFabricController, e.message);
        setTimeout(function() {
            $.collectionFabricController.type = "";
            $.fabricCloseLbl.touchEnabled = true;
            hideShowView($.collectionFabricController);
        }, 500);
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "addToShortlist";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.collectionFabricController = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        visible: false,
        backgroundColor: "#231f20",
        type: "shortlist",
        id: "collectionFabricController"
    });
    $.__views.collectionFabricController && $.addTopLevelView($.__views.collectionFabricController);
    $.__views.__alloyId84 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        layout: "vertical",
        id: "__alloyId84"
    });
    $.__views.collectionFabricController.add($.__views.__alloyId84);
    $.__views.__alloyId85 = Ti.UI.createView({
        top: "0dp",
        width: Titanium.UI.FILL,
        height: "53dp",
        id: "__alloyId85"
    });
    $.__views.__alloyId84.add($.__views.__alloyId85);
    $.__views.collectionFabricTitle = Ti.UI.createLabel({
        left: "15dp",
        height: Titanium.UI.FILL,
        font: {
            fontSize: "15sp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        id: "collectionFabricTitle"
    });
    $.__views.__alloyId85.add($.__views.collectionFabricTitle);
    $.__views.fabricCloseLbl = Ti.UI.createLabel({
        right: "15dp",
        width: "40dp",
        height: "40dp",
        font: {
            fontSize: "20dp",
            fontFamily: "icomoon"
        },
        color: "#ffffff",
        text: Alloy.Globals.icon.close,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "fabricCloseLbl"
    });
    $.__views.__alloyId85.add($.__views.fabricCloseLbl);
    $.__views.fabricScroll = Ti.UI.createScrollView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        layout: "vertical",
        id: "fabricScroll"
    });
    $.__views.__alloyId84.add($.__views.fabricScroll);
    $.__views.collectionTitle = Ti.UI.createLabel({
        top: "40dp",
        font: {
            fontSize: "11dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#e65e48",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "collectionTitle"
    });
    $.__views.fabricScroll.add($.__views.collectionTitle);
    $.__views.fabricDescription = Ti.UI.createLabel({
        width: "90%",
        height: Titanium.UI.SIZE,
        top: "10dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "fabricDescription"
    });
    $.__views.fabricScroll.add($.__views.fabricDescription);
    $.__views.__alloyId86 = Ti.UI.createLabel({
        top: "7dp",
        font: {
            fontSize: "9dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#a6ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "PLEASE SELECT THE PRODUCTS YOU WISH TO SHORTLIST",
        id: "__alloyId86"
    });
    $.__views.fabricScroll.add($.__views.__alloyId86);
    $.__views.selectedCountLbl = Ti.UI.createLabel({
        top: "30dp",
        font: {
            fontSize: "13sp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#e65e48",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "selectedCountLbl"
    });
    $.__views.fabricScroll.add($.__views.selectedCountLbl);
    $.__views.fabricSelectedContainer = Ti.UI.createView({
        top: "25dp",
        bottom: "80dp",
        layout: "horizontal",
        height: Titanium.UI.SIZE,
        horizontalWrap: true,
        id: "fabricSelectedContainer"
    });
    $.__views.fabricScroll.add($.__views.fabricSelectedContainer);
    $.__views.shortlistContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: "80dp",
        bottom: "0dp",
        visible: false,
        backgroundColor: "#231f20",
        id: "shortlistContainer"
    });
    $.__views.collectionFabricController.add($.__views.shortlistContainer);
    $.__views.shortlistSelectedLbl = Ti.UI.createLabel({
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        bottom: "30dp",
        width: "80%",
        height: "40dp",
        color: "#ffffff",
        borderColor: "#80e7e7e7",
        borderWidth: "0.5",
        backgroundColor: "transparent",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "SHORTLIST SELECTED",
        id: "shortlistSelectedLbl"
    });
    $.__views.shortlistContainer.add($.__views.shortlistSelectedLbl);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var selectedCount;
    touchEffect.createTouchEffect($.shortlistSelectedLbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.fabricCloseLbl, "#a6ffffff", "#ffffff");
    var fabricsCollectionWidth = parseInt(Alloy.Globals.platformWidth - 20);
    $.fabricSelectedContainer.width = fabricsCollectionWidth;
    var fabricsInnerContainer = parseInt(fabricsCollectionWidth - 50);
    var fabricsWidthHeight = parseInt(fabricsInnerContainer / 4);
    if ("collection" == args.type) {
        $.collectionFabricTitle.text = "COLLECTION FABRICS";
        $.collectionTitle.text = "COLLECTION";
    } else if ("shopByLook" == args.type) {
        $.collectionFabricTitle.text = "LOOK FABRICS";
        $.collectionTitle.text = "LOOK";
    }
    fabricsContainer = [];
    var selectedFabrics = [];
    var gaSelectedFabrics = [];
    var fabricsContainer = null, fabrics = null, ckeckLbl = null;
    $.fabricSelectedContainer.removeEventListener("click", fabricsSelectedEffect);
    $.fabricSelectedContainer.addEventListener("click", fabricsSelectedEffect);
    $.fabricCloseLbl.addEventListener("click", function(e) {
        hideShowView($.collectionFabricController);
        $.collectionFabricController.type = "";
    });
    $.fabricDescription.text = args.collectionName;
    getCollectionProduct();
    $.shortlistSelectedLbl.removeEventListener("click", addToShortlist);
    $.shortlistSelectedLbl.addEventListener("click", addToShortlist);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;