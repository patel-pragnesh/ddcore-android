function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function getAllImages() {
        if ("collection" == args.type) {
            var url = Alloy.Globals.commonUrl.hotspotGallery;
            var data = {
                collectionID: args.collectionId
            };
        }
        var requestParams = JSON.stringify(data);
        Alloy.Globals.webServiceCall(url, requestParams, getAllImagesSuccessCallback, getAllImagesErrorCallback, "POST", $.imagePreview, true);
    }
    function getAllImagesSuccessCallback(e) {
        try {
            $.subImageContainer.otherItems = "";
            $.subImageContainer.otherItems = e.data;
            _.each($.subImageContainer.children, function(view, key) {
                $.subImageContainer.remove(view);
            });
            var loadedViews = [];
            var imageview = [];
            var imageviewContainer = [];
            var imageviewlist = [];
            _.each(e.data, function(value, k) {
                imageviewlist.push(encodeURI(value));
                imageviewContainer[k] = Ti.UI.createView({
                    image: value,
                    width: Ti.UI.FILL,
                    height: Ti.UI.FILL,
                    backgroundColor: "#ffffff"
                });
                imageview[k] = Ti.UI.createImageView({
                    image: encodeURI(value),
                    defaultImage: "/images/default_logo.png"
                });
                imageviewContainer[k].add(imageview[k]);
                loadedViews.push(imageviewContainer[k]);
                selectedImage[k] = Ti.UI.createView({
                    width: "64dp",
                    height: "48dp",
                    left: "5dp",
                    id: k,
                    type: "imagePreView",
                    borderColor: "transparent"
                });
                imageSubContainer = Ti.UI.createView({
                    width: "60dp",
                    height: "44dp",
                    id: k,
                    touchEnabled: false,
                    image: value,
                    backgroundColor: "#f4f4f4"
                });
                selectedImage[k].add(imageSubContainer);
                otherImage = Ti.UI.createImageView({
                    id: k,
                    touchEnabled: false,
                    image: encodeURI(value),
                    defaultImage: "/images/default_logo.png",
                    backgroundColor: "#f4f4f4"
                });
                imageSubContainer.add(otherImage);
                $.subImageContainer.add(selectedImage[k]);
            });
            proxy.setImages(imageviewlist);
            proxy.addEventListener("scroll", function(e) {
                Ti.API.debug("Scroll event fired: " + JSON.stringify(e));
                _.each($.subImageContainer.otherItems, function(value, k) {
                    selectedImage[k].backgroundColor = "transparent";
                });
                selectedImage[e.source.currentPage].backgroundColor = "#e65e48";
                if (e.source.currentPage > currentIndex[1]) {
                    currentIndex[1] = currentIndex[1] + 1;
                    currentIndex[0] = currentIndex[0] + 1;
                    $.subImageContainer.scrollTo(69 * e.source.currentPage, 0);
                } else if (e.source.currentPage < currentIndex[0]) {
                    currentIndex[1] = currentIndex[1] - 1;
                    currentIndex[0] = currentIndex[0] - 1;
                    $.subImageContainer.scrollTo(69 * e.source.currentPage, 0);
                }
            });
            $.imagePreviewContainer.add(proxy);
            selectedImage[0].backgroundColor = "#e65e48";
        } catch (ex) {
            Ti.API.info("catch= " + ex.message);
        }
    }
    function getAllImagesErrorCallback(e) {
        Ti.API.info("e= " + JSON.stringify(e));
    }
    function addToShortlistSuccessCallback(e) {
        try {
            showAlert($.imagePreview, e.message);
        } catch (e) {
            Ti.API.info("catch = " + JSON.stringify(e));
        }
    }
    function addToShortlistErrorCallback(e) {
        showAlert($.imagePreview, e.message);
        $.imagePreviewWishIcon.text = Alloy.Globals.icon.shortlist;
        $.imagePreviewWishIcon.color = "#333333";
    }
    function removeShortlistProductSuccessCallback(e) {
        try {
            showAlert($.imagePreview, e.message);
        } catch (ex) {
            Ti.API.info("catch = " + JSON.stringify(ex.message));
        }
    }
    function removeShortlistProductErrorCallback(e) {
        showAlert($.imagePreview, e.message);
        $.imagePreviewWishIcon.text = Alloy.Globals.icon.setShortlist;
        $.imagePreviewWishIcon.color = "#e65e48";
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "imagePreview";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.imagePreview = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        visible: false,
        backgroundColor: "#e7e7e7",
        type: "imagePreview",
        id: "imagePreview"
    });
    $.__views.imagePreview && $.addTopLevelView($.__views.imagePreview);
    $.__views.__alloyId722 = Ti.UI.createView({
        bottom: 60,
        id: "__alloyId722"
    });
    $.__views.imagePreview.add($.__views.__alloyId722);
    $.__views.closeLbl = Ti.UI.createLabel({
        width: "40dp",
        height: "40dp",
        top: "15dp",
        right: "15dp",
        text: Alloy.Globals.icon.close,
        color: "#333333",
        font: {
            fontSize: "20dp",
            fontFamily: "icomoon"
        },
        zIndex: "10",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "closeLbl"
    });
    $.__views.__alloyId722.add($.__views.closeLbl);
    $.__views.imagePreviewContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        id: "imagePreviewContainer"
    });
    $.__views.__alloyId722.add($.__views.imagePreviewContainer);
    $.__views.imagePreviewWishIcon = Ti.UI.createLabel({
        font: {
            fontSize: "18dp",
            fontFamily: "icomoon"
        },
        bottom: "15dp",
        width: "35dp",
        height: "35dp",
        color: "#333333",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        right: "10dp",
        text: Alloy.Globals.icon.shortlist,
        id: "imagePreviewWishIcon"
    });
    $.__views.__alloyId722.add($.__views.imagePreviewWishIcon);
    $.__views.imagePreviewShareIcon = Ti.UI.createLabel({
        font: {
            fontSize: "18dp",
            fontFamily: "icomoon"
        },
        bottom: "15dp",
        width: "35dp",
        height: "35dp",
        color: "#333333",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        right: "50dp",
        text: Alloy.Globals.icon.share,
        id: "imagePreviewShareIcon"
    });
    $.__views.__alloyId722.add($.__views.imagePreviewShareIcon);
    $.__views.subImageContainer = Ti.UI.createScrollView({
        width: Titanium.UI.FILL,
        height: "60dp",
        layout: "horizontal",
        scrollType: "horizontal",
        backgroundColor: "#333333",
        bottom: "0dp",
        id: "subImageContainer"
    });
    $.__views.imagePreview.add($.__views.subImageContainer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    touchEffect.createTouchEffect($.closeLbl, "#a6333333", "#333333");
    touchEffect.createTouchEffect($.imagePreviewShareIcon, "#a6333333", "#333333");
    var titouchgallery = require("com.gbaldera.titouchgallery");
    proxy = titouchgallery.createTouchGallery();
    var selectedImage = [];
    var currentIndex = [ 0, parseInt(Alloy.Globals.platformWidth / 69) - 1 ];
    if (!isNullVal(args.type)) switch (args.type) {
      case "shopByLook":
        getAllImagesSuccessCallback(args);
        break;

      case "collection":
        getAllImages();
        break;

      case "shop":
        if (args.wish_flag) {
            $.imagePreviewWishIcon.text = Alloy.Globals.icon.setShortlist;
            $.imagePreviewWishIcon.color = "#e65e48";
        } else {
            $.imagePreviewWishIcon.text = Alloy.Globals.icon.shortlist;
            $.imagePreviewWishIcon.color = "#333333";
        }
        getAllImagesSuccessCallback(args);
    }
    $.closeLbl.addEventListener("click", function(e) {
        hideShowView($.imagePreview);
        $.imagePreview.type = "";
    });
    $.imagePreviewWishIcon.addEventListener("click", function(e) {
        if (!isNullVal(args.type)) switch (args.type) {
          case "shopByLook":
            var collectionData = {
                collectionName: args.collectionName,
                collectionId: args.collectionId,
                type: "shopByLook"
            };
            var addShortlist = Alloy.createController("addToShortlist", collectionData).getView();
            $.imagePreview.add(addShortlist);
            hideShowView(addShortlist);
            break;

          case "collection":
            var collectionData = {
                collectionName: args.collectionName,
                collectionId: args.collectionId,
                type: "collection"
            };
            var addShortlist = Alloy.createController("addToShortlist", collectionData).getView();
            $.imagePreview.add(addShortlist);
            hideShowView(addShortlist);
            break;

          case "shop":
            if (isNullVal(Ti.App.Properties.getString("access_token"))) Alloy.Globals.addWindowInNav("signIn", "imagePreview"); else if ("" == e.source.text) {
                $.imagePreviewWishIcon.text = Alloy.Globals.icon.shortlist;
                $.imagePreviewWishIcon.color = "#333333";
                var url = Alloy.Globals.commonUrl.removeShortlist;
                var data = {
                    product_id: args.product_id
                };
                var requestParams = JSON.stringify(data);
                Alloy.Globals.webServiceCall(url, requestParams, removeShortlistProductSuccessCallback, removeShortlistProductErrorCallback, "POST", $.imagePreview);
            } else {
                $.imagePreviewWishIcon.text = Alloy.Globals.icon.setShortlist;
                $.imagePreviewWishIcon.color = "#e65e48";
                var url = Alloy.Globals.commonUrl.addToShortlist;
                var data = {
                    product_id: args.product_id
                };
                var requestParams = JSON.stringify(data);
                Alloy.Globals.webServiceCall(url, requestParams, addToShortlistSuccessCallback, addToShortlistErrorCallback, "POST", $.imagePreview);
            }
        }
    });
    $.imagePreviewContainer.addEventListener("scrollend", function(e) {
        Ti.API.info("e.currentPage = " + e.currentPage);
        _.each($.subImageContainer.otherItems, function(value, k) {
            selectedImage[k].backgroundColor = "transparent";
        });
        selectedImage[e.currentPage].backgroundColor = "#e65e48";
        if (e.currentPage > currentIndex[1]) {
            currentIndex[1] = currentIndex[1] + 1;
            currentIndex[0] = currentIndex[0] + 1;
            $.subImageContainer.scrollTo(69 * e.currentPage, 0);
        } else if (e.currentPage < currentIndex[0]) {
            currentIndex[1] = currentIndex[1] - 1;
            currentIndex[0] = currentIndex[0] - 1;
            $.subImageContainer.scrollTo(69 * e.currentPage, 0);
        }
    });
    $.imagePreviewShareIcon.addEventListener("click", function() {
        shareImage(args.sharingProductUrl);
    });
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;