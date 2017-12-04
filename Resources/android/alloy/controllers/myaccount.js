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
        setTimeout(function() {
            $.myaccount.addEventListener("focus", updateCount);
        }, 2e3);
        updateCount();
    }
    function updateCount() {
        $.header.updateCartCount();
        updateMyAccountCurrentPage($.scrollableView.currentPage);
    }
    function backToDashboard() {
        isAndroidBack && $.myaccount.close();
    }
    function updateBGImage() {
        try {
            if (4 != $.scrollableView.getCurrentPage() && $.profile_bg_img.hasStyle) {
                var blob = $.profile_img.toImage();
                var _image = blob.imageAsResized(10, 10);
                $.profile_bg_img.setImage(_image);
                $.profile_bg_img.hasStyle = false;
            }
        } catch (exp) {
            Ti.API.info("change background image exception-->" + exp.message);
        }
    }
    function changeScreen(e) {
        try {
            if (void 0 != e.view || null != e.view || void 0 != e.view.id || null != e.view.id) switch (e.view.id) {
              case "info":
                if (!$.info.hasChild) try {
                    $.info.add(Alloy.createController("myaccount_info", {
                        updateFunction: updateMyAccountInfo,
                        mainWindow: $.myaccount,
                        androidBack: androidBack,
                        closeAndroidBack: windowBack
                    }).getView());
                    $.info.hasChild = true;
                    $.scrollableView.addEventListener("scrollend", changeScreen);
                    $.myaccount.addEventListener("focus", updateCount);
                    $.removeListener($.scrollableView, "scroll", changeScreen);
                    googleAnalyticsScreen("MY ACCOUNT INFO");
                } catch (exp) {
                    Ti.API.info("myaccount_info : " + exp.message);
                }
                break;

              case "orders":
                if (!$.orders.hasChild) {
                    0 != $.orders.getChildren().length && $.orders.removeAllChildren();
                    $.orders.add(Alloy.createController("myaccount_orders", {
                        loadDefaultScreen: loadDefault,
                        mainWindow: $.myaccount,
                        container: $.orders,
                        androidBack: androidBack,
                        closeAndroidBack: windowBack
                    }).getView());
                    $.orders.hasChild = true;
                    googleAnalyticsScreen("MY ACCOUNT ORDER");
                }
                break;

              case "shortlist":
                if (!$.shortlist.hasChild) {
                    0 != $.shortlist.getChildren().length && $.shortlist.removeAllChildren();
                    if (0 != Alloy.Globals.shortlistCount) {
                        $.shortlist.add(Alloy.createController("myshortlist", {
                            loadDefaultScreen: loadDefault,
                            mainWindow: $.myaccount,
                            container: $.shortlist,
                            refreshCount: refreshAccountCount,
                            androidBack: androidBack,
                            closeAndroidBack: windowBack,
                            updateCount: updateCount
                        }).getView());
                        googleAnalyticsScreen("MY ACCOUNT SHORTLIST");
                    } else loadDefault("catalogue");
                }
                $.shortlist.hasChild = true;
                break;

              case "savedviews":
                if (!$.savedviews.hasChild) {
                    0 != $.savedviews.getChildren().length && $.savedviews.removeAllChildren();
                    $.savedviews.add(Alloy.createController("savedviews", {
                        loadDefaultScreen: loadDefault,
                        mainWindow: $.myaccount,
                        container: $.savedviews,
                        androidBack: androidBack,
                        closeAndroidBack: windowBack
                    }).getView());
                    $.savedviews.hasChild = true;
                    googleAnalyticsScreen("MY ACCOUNT SAVED VIEWS");
                }
                break;

              case "style":
                if ($.style.hasChild) {
                    $.profile_bg_img.setImage($.profile_bg_img.styleBg || $.profile_img.getImage());
                    $.profile_bg_img.hasStyle = true;
                } else {
                    0 != $.style.getChildren().length && $.savedviews.removeAllChildren();
                    $.style.add(Alloy.createController("mystyle", {
                        mainWindow: $.myaccount,
                        container: $.style,
                        styleBgContainer: $.profile_bg_img
                    }).getView());
                    $.style.hasChild = true;
                    googleAnalyticsScreen("MY ACCOUNT MY STYLE");
                }
                break;

              case "appointment":
                if (!$.appoinments.hasChild) {
                    0 != $.appoinments.getChildren().length && $.appoinments.removeAllChildren();
                    try {
                        $.appoinments.add(Alloy.createController("myappoinments", {
                            loadDefaultScreen: loadDefault,
                            mainWindow: $.myaccount,
                            container: $.appoinments,
                            refreshCount: refreshAccountCount,
                            androidBack: androidBack,
                            closeAndroidBack: windowBack
                        }).getView());
                        googleAnalyticsScreen("MY ACCOUNT APPOINMENT");
                    } catch (exp) {
                        Ti.API.info("my appointment exp-->" + exp.message);
                    }
                    $.appoinments.hasChild = true;
                }
            }
            updateBGImage();
        } catch (ex) {
            return;
        }
    }
    function navigateToBookAppoinment() {
        $.myaccount.add(Alloy.createController("bookappoinment", {
            mainWindow: $.myaccount,
            androidBack: androidBack,
            closeAndroidBack: windowBack,
            refreshCount: refreshAccountCount
        }).getView());
    }
    function updateProfileImage() {
        $.profile_img.setTouchEnabled(false);
        previousImage = $.profile_img.image;
        var cropping = require("cropping");
        cropping.callimagecrop($.profile_img, $.myaccount, {
            x: 5,
            y: 6
        }, changePhotoFunction, true, removePhoto);
        $.profile_img.setTouchEnabled(true);
    }
    function changePhotoFunction() {
        imageUpload($.profile_img);
        if (4 != $.scrollableView.getCurrentPage()) {
            $.profile_bg_img.image = $.profile_img.image;
            $.profile_bg_img.bgImage = $.profile_img.image;
        }
    }
    function removePhoto() {
        imageUpload("", true);
        if (4 != $.scrollableView.getCurrentPage()) {
            $.profile_bg_img.image = $.profile_img.image;
            $.profile_bg_img.bgImage = $.profile_img.image;
        }
    }
    function imageUpload(img, removeFlag) {
        var imageB64 = "";
        imageB64 = removeFlag ? "" : Ti.Utils.base64encode(img.image).toString();
        var requestMethod = Alloy.Globals.commonUrl.imageUpload;
        var param = {
            image: imageB64
        };
        var requestParam = JSON.stringify(param);
        showTransparentLoader($.myaccount_photo_container);
        Alloy.Globals.webServiceCall(requestMethod, requestParam, imageUploadSuccessCallback, imageUploadErrorCallback, "POST", $.myaccount);
    }
    function imageUploadSuccessCallback(e) {
        try {
            if (null == e.data) {
                $.profile_img.setImage("");
                Ti.App.Properties.setString("image", "");
            } else {
                $.profile_img.setImage(e.data.image);
                Ti.App.Properties.setString("image", e.data.image);
            }
            $.profile_img.setBackgroundColor("" == $.profile_img.getImage() ? "#80000000" : "#000");
            if (4 != $.scrollableView.getCurrentPage() && null != e.data) {
                var tempBgImage = Ti.UI.createImageView({
                    image: $.profile_img.getImage()
                });
                var blob = tempBgImage.toBlob();
                var _image = blob.imageAsResized(10, 10);
                $.profile_bg_img.setImage(_image);
            }
            previousImage = $.profile_img.getImage();
            hideTransparentLoader();
        } catch (exp) {
            Ti.API.info("image upload exception--->" + exp.message);
        }
    }
    function imageUploadErrorCallback(e) {
        hideTransparentLoader();
        showAlert($.myaccount, e.message);
        $.profile_img.setImage(previousImage);
        $.profile_img.setBackgroundColor("" == $.profile_img.getImage() ? "#80000000" : "#000");
    }
    function updateMyAccountInfo(data, flag) {
        try {
            var response = data.customer;
            if (flag) ; else {
                Alloy.Globals.shortlistCount = response.shortlist_count;
                Alloy.Globals.orderCount = response.order_count;
                Alloy.Globals.appointmentCount = response.myappointment_count;
                Alloy.Globals.categoryId = response.categoryId;
                Alloy.Globals.customerCareNo = response.customer_care_number;
                $.orders.title = "ORDERS " + (1 === response.order_count.toString().length ? "0" + response.order_count : response.order_count);
                $.shortlist.title = "SHORTLIST " + (1 === response.shortlist_count.toString().length ? "0" + response.shortlist_count : response.shortlist_count);
                $.appointment.title = "APPOINTMENTS " + (1 === response.myappointment_count.toString().length ? "0" + response.myappointment_count : response.myappointment_count);
                setTimeout(function() {
                    $.paging.refresh();
                }, 300);
            }
            $.useremail_lbl.setText(response.email || "");
            $.profile_img.setImage(encodeURI(response.image) || "");
            $.profile_img.setBackgroundColor("" == $.profile_img.getImage() ? "#80000000" : "#000");
            Ti.App.Properties.setString("image", response.image || "");
            if ("" != $.profile_img.getImage()) {
                var tempBgImage = Ti.UI.createImageView({
                    image: $.profile_img.getImage()
                });
                var blob = tempBgImage.toBlob();
                var _image = blob.imageAsResized(10, 10);
                $.profile_bg_img.setImage(_image);
            }
            var gender = Alloy.Globals.icon.female;
            "1" === response.gender ? gender = Alloy.Globals.icon.male : "2" === response.gender ? gender = Alloy.Globals.icon.female : "3" === response.gender && (gender = Alloy.Globals.icon.other);
            var username = ((response.firstname || "") + " " + (response.lastname || "")).capitalize();
            var usernameText = gender.toString() + " " + username;
            $.username_lbl.setText(usernameText);
            var attr = Ti.UI.createAttributedString({
                text: usernameText,
                attributes: [ {
                    type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
                    value: Alloy.Globals.labelTitleColor,
                    range: [ usernameText.indexOf(gender), gender.length ]
                }, {
                    type: Ti.UI.ATTRIBUTE_FONT,
                    value: {
                        font: {
                            fontFamily: "futura_medium_bt-webfont"
                        }
                    },
                    range: [ usernameText.indexOf(username), username.length ]
                } ]
            });
            $.username_lbl.attributedString = attr;
        } catch (ex) {
            Ti.API.info("my account info error--->" + ex.message);
        }
    }
    function loadDefault(_screenName) {
        var emptyScreen = Alloy.createController("emptyMyAccount", {
            screenName: _screenName,
            mainWindow: $.myaccount,
            androidBack: androidBack,
            closeAndroidBack: windowBack,
            isMainWindow: true,
            loadFirstAppointment: enableAppointment,
            refreshCount: refreshAccountCount
        }).getView();
        switch (_screenName) {
          case "estore":
            $.orders.removeAllChildren();
            $.orders.add(emptyScreen);
            $.orders.hasChild = true;
            break;

          case "catalogue":
            $.shortlist.removeAllChildren();
            $.shortlist.add(emptyScreen);
            break;

          case "appointment":
            $.appoinments.add(emptyScreen);
            $.appoinments.hasChild = true;
            $.addAppoinment.setVisible(false);
            break;

          case "savedviews":
            $.savedviews.add(emptyScreen);
            $.savedviews.hasChild = true;
            $.savedviews.setVisible(true);
        }
    }
    function refreshAccountCount(index) {
        var orderCount = Alloy.Globals.orderCount || 0;
        var shortlistCount = Alloy.Globals.shortlistCount || 0;
        var appointmentCount = Alloy.Globals.appointmentCount || 0;
        $.orders.title = "ORDERS " + (1 === orderCount.toString().length ? "0" + orderCount : orderCount);
        $.shortlist.title = "SHORTLIST " + (1 === shortlistCount.toString().length ? "0" + shortlistCount : shortlistCount);
        $.appointment.title = "APPOINTMENTS " + (1 === appointmentCount.toString().length ? "0" + appointmentCount : appointmentCount);
        Ti.API.info("calling widget function ******* index : " + index);
        setTimeout(function() {
            2 == index ? $.paging.updateLabelTitle(index, $.shortlist.title) : 1 == index ? $.paging.updateLabelTitle(index, $.orders.title) : 5 == index && $.paging.updateLabelTitle(index, $.appointment.title);
        }, 800);
    }
    function androidBack() {
        $.header.init({
            title: "MY ACCOUNT"
        });
        isAndroidBack = false;
    }
    function windowBack() {
        $.header.init({
            title: "MY ACCOUNT",
            passWindow: $.myaccount
        });
        isAndroidBack = true;
    }
    function enableAppointment() {
        $.addAppoinment.setVisible(true);
        $.appoinments.removeAllChildren();
        0 != $.appoinments.getChildren().length && $.appoinments.removeAllChildren();
        try {
            $.appoinments.add(Alloy.createController("myappoinments", {
                loadDefaultScreen: loadDefault,
                mainWindow: $.myaccount,
                container: $.appoinments,
                refreshCount: refreshAccountCount
            }).getView());
        } catch (exp) {
            Ti.API.info("my appointment exp-->" + exp.message);
        }
        $.appoinments.hasChild = true;
    }
    function updateMyAccountCurrentPage(currentPage) {
        try {
            var obj = {
                view: {
                    id: ""
                }
            };
            switch (currentPage) {
              case 0:
                refreshAccountCount(2);
                $.shortlist.hasChild = false;
                obj.view.id = "shortlist";
                break;

              case 1:
                refreshAccountCount(2);
                $.shortlist.hasChild = false;
                obj.view.id = "shortlist";
                break;

              case 2:
                refreshAccountCount(2);
                $.shortlist.hasChild = false;
                obj.view.id = "shortlist";
                break;

              case 3:
                refreshAccountCount(2);
                $.shortlist.hasChild = false;
                obj.view.id = "shortlist";
                break;

              case 4:
                refreshAccountCount(2);
                $.shortlist.hasChild = false;
                obj.view.id = "shortlist";
                break;

              case 5:
                refreshAccountCount(2);
                $.shortlist.hasChild = false;
                obj.view.id = "shortlist";
            }
            changeScreen(obj);
        } catch (exp) {
            Ti.API.info("expection--->" + exp.message);
        }
    }
    function cleanUp() {
        var f = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, "invoice.pdf");
        if (f.exists()) {
            f.deleteFile();
        }
        Alloy.Globals.navWindowObject.pop();
        Alloy.Globals.popWindowInNav();
        $.myaccount.remove($.myaccount_photo_container);
        $.myaccount.remove($.myaccount_detail_container);
        $.myaccount_photo_container.removeAllChildren();
        $.info.removeAllChildren();
        $.shortlist.removeAllChildren();
        $.savedviews.removeAllChildren();
        $.style.removeAllChildren();
        $.appointment.removeAllChildren();
        $.scrollableView.removeAllChildren();
        $.myaccount_detail_container.removeAllChildren();
        $.removeListener();
        args = {};
        $.destroy();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "myaccount";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.myaccount = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_ADJUST_PAN,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        id: "myaccount",
        backgroundColor: "#fff"
    });
    $.__views.myaccount && $.addTopLevelView($.__views.myaccount);
    backToDashboard ? $.addListener($.__views.myaccount, "android:back", backToDashboard) : __defers["$.__views.myaccount!android:back!backToDashboard"] = true;
    cleanUp ? $.addListener($.__views.myaccount, "close", cleanUp) : __defers["$.__views.myaccount!close!cleanUp"] = true;
    $.__views.header = Alloy.createWidget("headerView", "widget", {
        id: "header",
        __parentSymbol: $.__views.myaccount
    });
    $.__views.header.setParent($.__views.myaccount);
    $.__views.myaccount_photo_container = Ti.UI.createView({
        width: Titanium.UI.FILL,
        top: "0dp",
        height: "36.5%",
        borderColor: "#000",
        borderWidth: 1,
        backgroundColor: "#000000",
        id: "myaccount_photo_container"
    });
    $.__views.myaccount.add($.__views.myaccount_photo_container);
    $.__views.profile_bg_img = Ti.UI.createImageView({
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        backgroundColor: "#231f20",
        opacity: .4,
        id: "profile_bg_img",
        hasStyle: false
    });
    $.__views.myaccount_photo_container.add($.__views.profile_bg_img);
    $.__views.profile_img = Ti.UI.createImageView({
        width: "100dp",
        height: "100dp",
        borderRadius: 50,
        left: 35,
        backgroundColor: "#80000000",
        id: "profile_img"
    });
    $.__views.myaccount_photo_container.add($.__views.profile_img);
    updateProfileImage ? $.addListener($.__views.profile_img, "touchend", updateProfileImage) : __defers["$.__views.profile_img!touchend!updateProfileImage"] = true;
    $.__views.addPhoto = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_medium_bt-webfont",
            fontSize: "14dp"
        },
        width: "94dp",
        height: "94dp",
        borderRadius: 50,
        left: 37,
        borderColor: Alloy.Globals.labelTitleColor,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        zIndex: -1,
        color: Alloy.Globals.labelTitleColor,
        text: "Add Photo",
        id: "addPhoto"
    });
    $.__views.myaccount_photo_container.add($.__views.addPhoto);
    $.__views.username_lbl = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "14dp"
        },
        color: "#fff",
        left: "170dp",
        id: "username_lbl"
    });
    $.__views.myaccount_photo_container.add($.__views.username_lbl);
    $.__views.useremail_lbl = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "14dp"
        },
        color: "#999999",
        left: "170dp",
        top: "56%",
        id: "useremail_lbl"
    });
    $.__views.myaccount_photo_container.add($.__views.useremail_lbl);
    $.__views.myaccount_detail_container = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        top: "29.6%",
        layout: "vertical",
        id: "myaccount_detail_container"
    });
    $.__views.myaccount.add($.__views.myaccount_detail_container);
    $.__views.paging = Alloy.createWidget("com.ddecor.pagingcontrol", "widget", {
        top: 0,
        indicatorColor: "#e64e48",
        tabs: true,
        backgroundColor: "transparent",
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        id: "paging",
        __parentSymbol: $.__views.myaccount_detail_container
    });
    $.__views.paging.setParent($.__views.myaccount_detail_container);
    var __alloyId977 = [];
    $.__views.info = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        title: "INFO",
        id: "info",
        hasChild: false,
        backgroundColor: "#fff"
    });
    __alloyId977.push($.__views.info);
    $.__views.orders = Ti.UI.createView({
        title: "ORDERS 00",
        id: "orders",
        count: "00",
        backgroundColor: "#fff",
        hasChild: false
    });
    __alloyId977.push($.__views.orders);
    $.__views.shortlist = Ti.UI.createView({
        title: "SHORTLIST 00",
        id: "shortlist",
        count: "00",
        backgroundColor: "#fff",
        hasChild: false
    });
    __alloyId977.push($.__views.shortlist);
    $.__views.savedviews = Ti.UI.createView({
        title: "SAVED VIEWS",
        id: "savedviews",
        count: "00",
        hasChild: false,
        backgroundColor: "#fff"
    });
    __alloyId977.push($.__views.savedviews);
    $.__views.style = Ti.UI.createView({
        title: "STYLE",
        id: "style",
        backgroundColor: "#fff",
        hasChild: false
    });
    __alloyId977.push($.__views.style);
    $.__views.appointment = Ti.UI.createView({
        title: "APPOINTMENTS 00",
        id: "appointment",
        count: "00",
        backgroundColor: "#fff"
    });
    __alloyId977.push($.__views.appointment);
    $.__views.appoinments = Ti.UI.createView({
        id: "appoinments",
        hasChild: false,
        top: "0dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL
    });
    $.__views.appointment.add($.__views.appoinments);
    $.__views.addAppoinment = Ti.UI.createLabel({
        backgroundColor: Alloy.Globals.labelTitleColor,
        borderRadius: 20,
        borderWidth: .5,
        borderColor: Alloy.Globals.labelTitleColor,
        width: "40dp",
        height: "40dp",
        text: Alloy.Globals.icon.add,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        bottom: "50dp",
        zIndex: 10,
        right: "5%",
        font: {
            fontSize: "16dp",
            fontFamily: "icomoon"
        },
        color: "#000",
        id: "addAppoinment",
        visible: true
    });
    $.__views.appointment.add($.__views.addAppoinment);
    navigateToBookAppoinment ? $.addListener($.__views.addAppoinment, "click", navigateToBookAppoinment) : __defers["$.__views.addAppoinment!click!navigateToBookAppoinment"] = true;
    $.__views.scrollableView = Ti.UI.createScrollableView({
        backgroundColor: "#fff",
        views: __alloyId977,
        id: "scrollableView"
    });
    $.__views.myaccount_detail_container.add($.__views.scrollableView);
    changeScreen ? $.addListener($.__views.scrollableView, "scroll", changeScreen) : __defers["$.__views.scrollableView!scroll!changeScreen"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var isAndroidBack = true;
    var previousImage = $.profile_img.getImage();
    $.paging.setScrollableView($.scrollableView);
    $.header.getView().backgroundColor = "transparent";
    $.header.getView("openView").zIndex = 11;
    $.header.getView().zIndex = 10;
    $.header.init({
        title: "MY ACCOUNT",
        passWindow: $.myaccount
    });
    googleAnalyticsScreen("MY ACCOUNT");
    init();
    Ti.Platform.Android && ($.myaccount.fbProxy = Alloy.Globals.fb.createActivityWorker({
        lifecycleContainer: $.myaccount
    }));
    exports.enableAppointment = enableAppointment;
    __defers["$.__views.myaccount!android:back!backToDashboard"] && $.addListener($.__views.myaccount, "android:back", backToDashboard);
    __defers["$.__views.myaccount!close!cleanUp"] && $.addListener($.__views.myaccount, "close", cleanUp);
    __defers["$.__views.profile_img!touchend!updateProfileImage"] && $.addListener($.__views.profile_img, "touchend", updateProfileImage);
    __defers["$.__views.addAppoinment!click!navigateToBookAppoinment"] && $.addListener($.__views.addAppoinment, "click", navigateToBookAppoinment);
    __defers["$.__views.scrollableView!scroll!changeScreen"] && $.addListener($.__views.scrollableView, "scroll", changeScreen);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;