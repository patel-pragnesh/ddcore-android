function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function updateCount() {
        Ti.API.info("dashboard window focus event ******");
        clearInterval(setImageRotationInterval);
        setHomeBannerInterval();
        Ti.App.removeEventListener("updateCartCountInDashBoard", updateCount);
        Ti.API.info('Ti.App.Properties.getString("cartCount")) = ' + Ti.App.Properties.getString("cartCount"));
        if (parseInt(Ti.App.Properties.getString("cartCount")) > 0) {
            var cartCount = "";
            cartCount = Ti.App.Properties.getString("cartCount");
            $.cartCountLbl.visible = true;
            $.cartCountLbl.setText(cartCount.toString());
        } else {
            $.cartCountLbl.visible = false;
            $.cartCountLbl.setText("");
        }
        if (isNullVal(Ti.App.Properties.getString("access_token"))) {
            $.profileImage.setImage("/images/default_user_picture.png");
            $.customerService.setHeight("0dp");
        } else {
            $.customerService.setHeight("40dp");
            $.profileImage.setImage(Ti.App.Properties.getString("image"));
            $.profileImage.setDefaultImage("/images/default_user_picture.png");
        }
        Ti.App.addEventListener("updateCartCountInDashBoard", updateCount);
    }
    function setHomeBannerInterval() {
        clearInterval(setImageRotationInterval);
        setImageRotationInterval = setInterval(function(e) {
            var lastView = $.itemScrollableView.getViews();
            var currentPage = $.itemScrollableView.getCurrentPage() + 1;
            currentPage == lastView.length && (currentPage = 0);
            $.itemScrollableView.scrollToView(currentPage);
        }, 4e3);
    }
    function leftMove() {
        $.fadeView.setTouchEnabled(false);
        sliderView.animate({
            left: -sliderWidth,
            duration: 400
        });
        $.mainView.animate(zoom);
        animation.fadeOut($.fadeView, 400);
        toggleStatus = false;
    }
    function leftMoveForSlider() {
        $.fadeView.setTouchEnabled(false);
        sliderView.animate({
            left: -sliderWidth,
            duration: 300
        });
        $.mainView.animate(zoom);
        animation.fadeOut($.fadeView, 300);
        toggleStatus = false;
    }
    function rightMove(argument) {
        $.fadeView.setBackgroundColor("#b3000000");
        $.fadeView.setTouchEnabled(true);
        sliderView.animate({
            left: 0,
            duration: 400
        });
        $.fadeView.animate({
            backgroundColor: "#b3000000",
            zIndex: 100,
            duration: 400
        });
        $.mainView.animate(zoomout);
        animation.fadeIn($.fadeView, 400);
        toggleStatus = true;
    }
    function toggleSlider(e) {
        toggleStatus ? leftMove() : rightMove();
    }
    function exploreScroll(e) {
        $.collectionContainer.width = Ti.UI.FILL;
        $.collectionContainer.height = Titanium.UI.SIZE;
        var abc = 235 + 2 * height;
        var val = reverseXhdpi();
        var b = parseInt(abc * val);
        var j = 1;
        var k = parseInt(b / 10);
        var interval = setInterval(function() {
            if (10 == j) {
                j = 1;
                clearInterval(interval);
            } else {
                $.dashboardScroll.scrollTo(0, k * j);
                j++;
            }
        }, 25);
        $.explore_lbl.touchEnabled = false;
    }
    function headerEffect(e) {
        var ycordinates = $.dashboardScroll.contentOffset.y;
        var xcordinates = $.dashboardScroll.contentOffset.x;
        0 == ycordinates && 0 == xcordinates && ($.explore_lbl.touchEnabled = true);
        ycordinates >= 0 && 300 > ycordinates ? $.dashboardNavigation.backgroundColor = "#00231f20" : ycordinates > 620 && 640 > ycordinates ? $.dashboardNavigation.backgroundColor = "#0D231f20" : ycordinates > 640 && 660 > ycordinates ? $.dashboardNavigation.backgroundColor = "#1a231f20" : ycordinates > 660 && 680 > ycordinates ? $.dashboardNavigation.backgroundColor = "#26231f20" : ycordinates > 680 && 700 > ycordinates ? $.dashboardNavigation.backgroundColor = "#33231f20" : ycordinates > 700 && 720 > ycordinates ? $.dashboardNavigation.backgroundColor = "#40231f20" : ycordinates > 720 && 740 > ycordinates ? $.dashboardNavigation.backgroundColor = "#4d231f20" : ycordinates > 740 && 760 > ycordinates ? $.dashboardNavigation.backgroundColor = "#59231f20" : ycordinates > 760 && 780 > ycordinates ? $.dashboardNavigation.backgroundColor = "#66231f20" : ycordinates > 780 && 800 > ycordinates ? $.dashboardNavigation.backgroundColor = "#73231f20" : ycordinates > 800 && 820 > ycordinates ? $.dashboardNavigation.backgroundColor = "#80231f20" : ycordinates > 820 && 840 > ycordinates ? $.dashboardNavigation.backgroundColor = "#8c231f20" : ycordinates > 840 && 860 > ycordinates ? $.dashboardNavigation.backgroundColor = "#99231f20" : ycordinates > 860 && 880 > ycordinates ? $.dashboardNavigation.backgroundColor = "#a6231f20" : ycordinates > 880 && 900 > ycordinates ? $.dashboardNavigation.backgroundColor = "#b3231f20" : ycordinates > 900 && 920 > ycordinates ? $.dashboardNavigation.backgroundColor = "#bf231f20" : ycordinates > 920 && 940 > ycordinates ? $.dashboardNavigation.backgroundColor = "#cc231f20" : ycordinates > 940 && 960 > ycordinates ? $.dashboardNavigation.backgroundColor = "#d9231f20" : ycordinates > 960 && 980 > ycordinates ? $.dashboardNavigation.backgroundColor = "#e6231f20" : ycordinates > 980 && 1e3 > ycordinates ? $.dashboardNavigation.backgroundColor = "#f2231f20" : ycordinates > 1e3 && ($.dashboardNavigation.backgroundColor = "#ff231f20");
    }
    function categoryOption(e) {
        try {
            var view = Ti.UI.createView({
                width: Ti.UI.FILL,
                height: Ti.UI.SIZE,
                layout: "vertical",
                top: "5dp"
            });
            var seperator = Ti.UI.createView({
                height: "1dp",
                width: Titanium.UI.FILL,
                backgroundColor: "#4d000000",
                top: "10dp"
            });
            switch (e.source.id) {
              case "ourrangeContainer":
                subCategory = [];
                for (var i = 0; i < categoryData.length; i++) subCategory.push(categoryData[i].name.toUpperCase());
                _.each(subCategory, function(value, k) {
                    label[k] = Ti.UI.createLabel({
                        text: value,
                        id: categoryData[k].categoryId
                    });
                    view.add(label[k]);
                    $.addClass(label[k], "subCategories");
                    touchEffect.createTouchEffect(label[k], "#a6333333", "#333333");
                });
                view.add(seperator);
                break;

              case "inspiredContainer":
                subCategory = [];
                subCategory = [ "STYLE DISCOVERY", "SHOP BY LOOK", "D'IMAGINER" ];
                _.each(subCategory, function(value, k) {
                    label[k] = Ti.UI.createLabel({
                        text: value,
                        id: categoryData[k].categoryId
                    });
                    view.add(label[k]);
                    $.addClass(label[k], "subCategories");
                    touchEffect.createTouchEffect(label[k], "#a6333333", "#333333");
                });
                view.add(seperator);
                break;

              case "eshopContainer":
                subCategory = [];
                for (var i = 0; i < eshopData.length; i++) subCategory.push(eshopData[i].name.toUpperCase());
                _.each(subCategory, function(value, k) {
                    label[k] = Ti.UI.createLabel({
                        text: value,
                        id: eshopData[k].categoryId
                    });
                    view.add(label[k]);
                    $.addClass(label[k], "subCategories");
                    touchEffect.createTouchEffect(label[k], "#a6333333", "#333333");
                });
                view.add(seperator);
            }
            var data = [ "ourrangeContainer", "inspiredContainer", "eshopContainer" ];
            if (data.indexOf(e.source.id) > -1 && 1 == e.source.children.length && "scroll" == e.source.type) {
                if (1 == e.source.category && 1 == e.source.children.length) {
                    e.source.children[0].children[0].color = "#e65e48";
                    e.source.children[0].children[1].text = Alloy.Globals.icon.dropDown;
                    e.source.add(view);
                    flag = false;
                    if (!isNullVal($.inspiredContainer.children[1])) {
                        Ti.API.info("inside if 1");
                        $.inspiredContainer.children[0].children[0].color = "#333333";
                        $.inspiredContainer.children[0].children[1].text = Alloy.Globals.icon.downArrow;
                        $.inspiredContainer.remove($.inspiredContainer.children[1]);
                        $.inspiredContainer.children[1] = null;
                    }
                    if (!isNullVal($.eshopContainer.children[1])) {
                        Ti.API.info("inside if 3");
                        $.eshopContainer.children[0].children[0].color = "#333333";
                        $.eshopContainer.children[0].children[1].text = Alloy.Globals.icon.downArrow;
                        $.eshopContainer.remove($.eshopContainer.children[1]);
                        $.eshopContainer.children[1] = null;
                    }
                } else if (2 == e.source.category && 1 == e.source.children.length) {
                    e.source.children[0].children[0].color = "#e65e48";
                    e.source.children[0].children[1].text = Alloy.Globals.icon.dropDown;
                    e.source.add(view);
                    flag = false;
                    if (!isNullVal($.ourrangeContainer.children[1])) {
                        Ti.API.info("inside if 2");
                        $.ourrangeContainer.children[0].children[0].color = "#333333";
                        $.ourrangeContainer.children[0].children[1].text = Alloy.Globals.icon.downArrow;
                        $.ourrangeContainer.remove($.ourrangeContainer.children[1]);
                        $.ourrangeContainer.children[1] = null;
                    }
                    if (!isNullVal($.eshopContainer.children[1])) {
                        Ti.API.info("inside if 3");
                        $.eshopContainer.children[0].children[0].color = "#333333";
                        $.eshopContainer.children[0].children[1].text = Alloy.Globals.icon.downArrow;
                        $.eshopContainer.remove($.eshopContainer.children[1]);
                        $.eshopContainer.children[1] = null;
                    }
                } else if (3 == e.source.category && 1 == e.source.children.length) {
                    e.source.children[0].children[0].color = "#e65e48";
                    e.source.children[0].children[1].text = Alloy.Globals.icon.dropDown;
                    e.source.add(view);
                    flag = false;
                    if (!isNullVal($.inspiredContainer.children[1])) {
                        Ti.API.info("inside if 1");
                        $.inspiredContainer.children[0].children[0].color = "#333333";
                        $.inspiredContainer.children[0].children[1].text = Alloy.Globals.icon.downArrow;
                        $.inspiredContainer.remove($.inspiredContainer.children[1]);
                        $.inspiredContainer.children[1] = null;
                    }
                    if (!isNullVal($.ourrangeContainer.children[1])) {
                        Ti.API.info("inside if 2");
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
            } else if (e.source.text) {
                leftMoveForSlider();
                switch (e.source.text) {
                  case "SHOP BY LOOK":
                    var shopByLookData = "";
                    shopByLookData = {
                        type: "shopByLook"
                    };
                    setTimeout(function() {
                        Alloy.Globals.addWindowInNav("productListing", shopByLookData);
                    }, 50);
                    break;

                  case "COLLECTION":
                    setTimeout(function() {
                        collectionAllData = {
                            categoryId: e.source.id,
                            categoryName: "COLLECTION",
                            WindowName: "COLLECTIONS",
                            type: "collection",
                            block: "Allcollection"
                        };
                        Alloy.Globals.addWindowInNav("productListing", collectionAllData);
                    }, 50);
                    break;

                  case "STYLE DISCOVERY":
                    setTimeout(function() {
                        Alloy.Globals.addWindowInNav("styleDiscovery");
                    }, 50);
                    break;

                  case "SHOP":
                    setTimeout(function() {
                        Alloy.Globals.addWindowInNav("eshop");
                    }, 50);
                    break;

                  case "CURTAINS":
                    Ti.API.info("e.source.id = " + e.source.id);
                    setTimeout(function() {
                        collectionAllData = {
                            wName: "CURTAINS",
                            categoryId: e.source.id,
                            type: "C_Product",
                            categoryType: "Collectionfabrics",
                            categoryName: "CURTAINS"
                        };
                        Alloy.Globals.addWindowInNav("productListing", collectionAllData);
                    }, 50);
                    break;

                  case "WALLPAPER":
                    setTimeout(function() {
                        collectionAllData = {
                            wName: "WALLPAPERS",
                            categoryId: e.source.id,
                            type: "C_Product",
                            categoryType: "wallpaper",
                            categoryName: "WALLPAPERS"
                        };
                        Alloy.Globals.addWindowInNav("productListing", collectionAllData);
                    }, 50);
                    break;

                  case "UPHOLSTERY":
                    setTimeout(function() {
                        collectionAllData = {
                            wName: "UPHOLSTERY",
                            categoryId: e.source.id,
                            type: "C_Product",
                            categoryType: "Collectionfabrics",
                            categoryName: "UPHOLSTERY"
                        };
                        Alloy.Globals.addWindowInNav("productListing", collectionAllData);
                    }, 50);
                    break;

                  case "D'IMAGINER":
                    setTimeout(function() {
                        Alloy.Globals.addWindowInNav("dImaginer");
                    }, 50);
                    break;

                  case "BED LINEN":
                    setTimeout(function() {
                        Alloy.Globals.addWindowInNav("beddings");
                    }, 50);
                    break;

                  case "BLINDS":
                    setTimeout(function() {
                        Alloy.Globals.addWindowInNav("blinds");
                    }, 50);
                    break;

                  case "READY MADE CURTAINS":
                    setTimeout(function() {
                        var collectionAllData = {
                            wName: "",
                            categoryId: e.source.id,
                            type: "C_Product",
                            categoryType: "shop",
                            subTitle: "READY MADE CURTAINS",
                            categoryName: "BED LINEN",
                            category: "BED LINEN"
                        };
                        Alloy.Globals.addWindowInNav("productListing", collectionAllData);
                    }, 50);
                    break;

                  case "CUSHION":
                    setTimeout(function() {
                        var collectionAllData = {
                            wName: "",
                            categoryId: e.source.id,
                            type: "C_Product",
                            categoryType: "shop",
                            subTitle: "CUSHION",
                            categoryName: "BED LINEN",
                            category: "BED LINEN"
                        };
                        Alloy.Globals.addWindowInNav("productListing", collectionAllData);
                    }, 50);
                    break;

                  case "TOWEL":
                    setTimeout(function() {
                        var collectionAllData = {
                            wName: "",
                            categoryId: e.source.id,
                            type: "C_Product",
                            categoryType: "shop",
                            subTitle: "TOWEL",
                            categoryName: "BED LINEN",
                            category: "BED LINEN"
                        };
                        Alloy.Globals.addWindowInNav("productListing", collectionAllData);
                    }, 50);
                    break;

                  case "RUGS":
                    setTimeout(function() {
                        var collectionAllData = {
                            wName: "",
                            categoryId: e.source.id,
                            type: "C_Product",
                            categoryType: "shop",
                            subTitle: "RUGS",
                            categoryName: "RUGS",
                            category: "RUGS"
                        };
                        Alloy.Globals.addWindowInNav("productListing", collectionAllData);
                    }, 50);
                }
            }
        } catch (ex) {
            Ti.API.info("catch = e" + ex.message);
        }
    }
    function navigateToMyAccount() {
        leftMoveForSlider();
        setTimeout(function() {
            Alloy.Globals.addWindowInNav("myaccount");
        }, 50);
    }
    function showOverFlow(e) {
        $.openView.visible = true;
        Alloy.Globals.overFlowFlag = true;
    }
    function hideOverFlow(e) {
        if (Alloy.Globals.overFlowFlag) {
            $.openView.visible = false;
            Alloy.Globals.overFlowFlag = false;
        }
    }
    function geolocation() {
        Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS, function(e) {
            e.success ? Ti.Media.requestCameraPermissions(function(e) {
                e.success && setDashboardData(homePageData);
            }) : Ti.Media.requestCameraPermissions();
        });
        Ti.Media.requestCameraPermissions(function(e) {
            e.success && setDashboardData(homePageData);
        });
    }
    function setDashboardData(e) {
        categoryData = e.data.banner_category.category;
        eshopData = e.data.banner_category.shop;
        setTimeout(function() {
            geolocation();
        }, 1500);
        try {
            e.data.home_page_banner;
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
                    width: Ti.UI.FILL,
                    height: Ti.UI.FILL
                });
                vwlbl[k] = Ti.UI.createView({
                    top: "130dp",
                    left: "10dp",
                    right: "10dp",
                    zIndex: "12",
                    height: Titanium.UI.SIZE
                });
                lbl1[k] = Ti.UI.createLabel({
                    top: "0dp",
                    left: "0dp",
                    text: value.banner_title,
                    font: {
                        fontFamily: "futura_lt_bt_light-webfont",
                        fontSize: "23dp"
                    },
                    color: "#c0bebc"
                });
                vwlbl[k].add(lbl1[k]);
                imageViewContainer[k].add(vwlbl[k]);
                imageview[k] = Ti.UI.createImageView({
                    image: encodeURI(value.banner_image),
                    callAction: encodeURI(value.banner_click),
                    data: value,
                    width: Ti.UI.FILL,
                    height: Ti.UI.FILL
                });
                imageViewContainer[k].add(imageview[k]);
                loadedViews.push(imageViewContainer[k]);
            });
            $.itemScrollableView.views = loadedViews;
            e.data.home_page_banner.length && $.scrollControllContainer.add(PagingControl($.itemScrollableView));
            try {
                setHomeBannerInterval();
            } catch (exp) {
                Ti.API.info("exp--->" + exp.message);
            }
            var categoryIds = e.data.banner_category.category;
            for (var i = 0; i < e.data.banner_category.category.length; i++) switch (categoryIds[i].name) {
              case "Collection":
                $.collectionView.typeId = categoryIds[i].categoryId;
                break;

              case "Curtains":
                $.curtainsView.typeId = categoryIds[i].categoryId;
                break;

              case "Upholstery":
                $.upholsteryView.typeId = categoryIds[i].categoryId;
                break;

              case "Bed Linen":
                $.beddingsView.typeId = categoryIds[i].categoryId;
                break;

              case "Wallpaper":
                $.wallpaperView.typeId = categoryIds[i].categoryId;
                break;

              case "Blinds":
                $.blindsView.typeId = categoryIds[i].categoryId;
                break;

              case "Ready Made Curtains":
                $.rmcView.typeId = categoryIds[i].categoryId;
                break;

              case "Cushion":
                $.cushionView.typeId = categoryIds[i].categoryId;
                break;

              case "Towel":
                $.towelView.typeId = categoryIds[i].categoryId;
                break;

              case "Rugs":
                $.rugsView.typeId = categoryIds[i].categoryId;
            }
        } catch (ex) {
            Ti.API.info("catch e= " + ex.message);
        }
    }
    function firstCategoryContainer(e) {
        switch (e.source.id) {
          case "collectionView":
            Alloy.Globals.addWindowInNav("allCollections");
            break;

          case "curtainsView":
            collectionAllData = {
                wName: "CURTAINS",
                categoryId: e.source.typeId,
                type: "C_Product",
                categoryType: "Collectionfabrics",
                categoryName: "CURTAINS"
            };
            Alloy.Globals.addWindowInNav("productListing", collectionAllData);
            break;

          case "upholsteryView":
            collectionAllData = {
                wName: "UPHOLSTERY",
                categoryId: e.source.typeId,
                type: "C_Product",
                categoryType: "Collectionfabrics",
                categoryName: "UPHOLSTERY"
            };
            Alloy.Globals.addWindowInNav("productListing", collectionAllData);
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
    function secondCategoryContainer(e) {
        switch (e.source.id) {
          case "beddingsView":
            Alloy.Globals.addWindowInNav("beddings");
            break;

          case "wallpaperView":
            collectionAllData = {
                wName: "WALLPAPERS",
                categoryId: e.source.typeId,
                type: "C_Product",
                categoryType: "wallpaper",
                categoryName: "wallpaper"
            };
            Alloy.Globals.addWindowInNav("productListing", collectionAllData);
            break;

          case "blindsView":
            Alloy.Globals.addWindowInNav("blinds");
        }
    }
    function thirdCategoryContainer(e) {
        switch (e.source.id) {
          case "rmcView":
            var collectionAllData = {
                wName: "",
                categoryId: e.source.typeId,
                type: "C_Product",
                categoryType: "shop",
                subTitle: "READY MADE CURTAINS",
                categoryName: "BED LINEN",
                category: "BED LINEN"
            };
            Alloy.Globals.addWindowInNav("productListing", collectionAllData);
            break;

          case "cushionView":
            var collectionAllData = {
                wName: "",
                categoryId: e.source.typeId,
                type: "C_Product",
                categoryType: "shop",
                subTitle: "CUSHION",
                categoryName: "BED LINEN",
                category: "BED LINEN"
            };
            Alloy.Globals.addWindowInNav("productListing", collectionAllData);
            break;

          case "towelView":
            var collectionAllData = {
                wName: "",
                categoryId: e.source.typeId,
                type: "C_Product",
                categoryType: "shop",
                subTitle: "TOWEL",
                categoryName: "BED LINEN",
                category: "BED LINEN"
            };
            Alloy.Globals.addWindowInNav("productListing", collectionAllData);
        }
    }
    function fourthCategoryContainer(e) {
        switch (e.source.id) {
          case "rugsView":
            var collectionAllData = {
                wName: "",
                categoryId: e.source.typeId,
                type: "C_Product",
                categoryType: "shop",
                subTitle: "RUGS",
                categoryName: "RUGS",
                category: "RUGS"
            };
            Alloy.Globals.addWindowInNav("productListing", collectionAllData);
        }
    }
    function navigateToStoreLocater() {
        Alloy.Globals.addWindowInNav("findStore");
    }
    function navigateToLoginAccount(e) {
        if (isNullVal(Ti.App.Properties.getString("access_token"))) {
            if ("Welcome Guest!" == e.source.text || "Login/Register" == e.source.text) {
                Alloy.Globals.addWindowInNav("signIn", "dashboard");
                toggleStatus ? leftMove() : rightMove();
            }
        } else ("Welcome Guest!" != e.source.text || "Login/Register" != e.source.text || "user_image" == e.source.type) && navigateToMyAccount();
    }
    function logout(e) {
        Alloy.Globals.fb.logout();
        Alloy.Globals.googleAuth.deAuthorize(function(e) {}, $.dashboard);
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
        toggleStatus ? leftMove() : rightMove();
        updateCount();
        Alloy.Globals.checkLogin();
    }
    function dashboardData(deviceToken) {
        showFullLoader($.menuScrollContainer);
        var userDeviceToken = deviceToken || "";
        Ti.API.info("Titanium.Platform.getId(); = " + Titanium.Platform.getId());
        var deviceId = Titanium.Platform.getId();
        var osName = "android";
        Ti.API.info("osName = " + osName);
        var url = Alloy.Globals.commonUrl.getBanners;
        var data = {
            device_type: osName,
            push_id: userDeviceToken,
            unique_id: deviceId
        };
        var requestParams = JSON.stringify(data);
        Alloy.Globals.webServiceCall(url, requestParams, dashboardSuccessCallback, dashboardErrorCallback, "POST", $.dashboard, true);
    }
    function dashboardSuccessCallback(e) {
        Ti.API.info("inside success");
        hideFullLoader($.menuScrollContainer);
        try {
            homePageData = e;
            Ti.API.info("param:" + JSON.stringify(homePageData));
            Ti.App.Properties.setString("quote_id", e.data.other_info.quote_id);
            Ti.App.Properties.setString("cartCount", e.data.other_info.cart_count);
            if (0 == e.data.other_info.cart_count) {
                Titanium.App.Properties.setList("removeCartProductIdArray", []);
                Titanium.App.Properties.setList("cartProductIdArray", []);
            }
            isNullVal(e.data.customer_info.image) || Ti.App.Properties.setString("image", e.data.customer_info.image);
            isNullVal(e.data.other_info.dimaginer_video_url) || (Alloy.Globals.DimaginerVideo = e.data.other_info.dimaginer_video_url);
            isNullVal(e.data.fabricCalculatorImages) || (Alloy.Globals.fabricCalculatorImages = e.data.fabricCalculatorImages);
            setDashboardData(e);
            loginViewFlag = e.data.login_view;
            updateCount();
            Titanium.App.version < e.data.version ? setTimeout(function() {
                updateVersion();
            }, 3e3) : true == isNullVal(Ti.App.Properties.getString("access_token")) && true == e.data.login_view ? setTimeout(function() {
                Alloy.Globals.addWindowInNav("signIn");
            }, 2e3) : Ti.API.info("else...");
        } catch (e) {
            hideFullLoader($.menuScrollContainer);
            alert("Something went wrong");
        }
    }
    function dashboardErrorCallback(e) {
        hideFullLoader($.menuScrollContainer);
    }
    function navigateToAboutUs() {
        Alloy.Globals.addWindowInNav("aboutUs");
    }
    function navigateToEstore() {
        Alloy.Globals.addWindowInNav("eshop");
    }
    function navigateToAppointment() {
        if (Ti.App.Properties.getString("access_token")) {
            Alloy.Globals.bookAppoinmentWindow = true;
            $.dashboard.add(Alloy.createController("bookappoinment", {
                mainWindow: $.dashboard,
                isDashboard: true
            }).getView());
            appointmentFlag = true;
        } else Alloy.Globals.addWindowInNav("signIn");
    }
    function clearMemory() {
        Ti.API.info("************** into clear Memory ***************");
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
    function stopImageRotation() {
        Ti.API.info("dashboard window focus lost **************");
        clearInterval(setImageRotationInterval);
    }
    function updateVersion() {
        var now = new Date().getTime();
        var remindToRate = Ti.App.Properties.getString("RemindToRate");
        if (remindToRate) if (now > remindToRate) {
            var alertDialog = Titanium.UI.createAlertDialog({
                title: "New version available",
                message: "Please,update app to new version to continue shopping",
                buttonNames: [ "UPDATE", "REMIND ME LATER", "NEVER" ],
                cancel: 2
            });
            alertDialog.addEventListener("click", function(evt) {
                switch (evt.index) {
                  case 0:
                    Ti.App.Properties.setString("RemindToRate", Number.MAX_VALUE);
                    if (Ti.Android) try {
                        Ti.Android.currentActivity.startActivity(Ti.Android.createIntent({
                            action: Ti.Android.ACTION_VIEW,
                            data: "market://details?id=com.ddecor.digitalEstore"
                        }));
                    } catch (ex) {
                        Ti.Android.currentActivity.startActivity(Ti.Android.createIntent({
                            action: Ti.Android.ACTION_VIEW,
                            data: "https://play.google.com/store/apps/details?id=com.ddecor.digitalEstore"
                        }));
                    }
                    break;

                  case 1:
                    Ti.App.Properties.setString("RemindToRate", now + 864e5);
                    true == isNullVal(Ti.App.Properties.getString("access_token")) && true == loginViewFlag && setTimeout(function() {
                        Alloy.Globals.addWindowInNav("signIn");
                    }, 2e3);
                    break;

                  case 2:
                    if (evt.button) {
                        Ti.App.Properties.setString("RemindToRate", Number.MAX_VALUE);
                        true == isNullVal(Ti.App.Properties.getString("access_token")) && true == loginViewFlag && setTimeout(function() {
                            Alloy.Globals.addWindowInNav("signIn");
                        }, 2e3);
                    }
                }
            });
            alertDialog.show();
        } else {
            Ti.API.info("close");
            true == isNullVal(Ti.App.Properties.getString("access_token")) && true == loginViewFlag && setTimeout(function() {
                Alloy.Globals.addWindowInNav("signIn");
            }, 1200);
        } else Ti.App.Properties.setString("RemindToRate", now);
    }
    function navigateToStyleDiscovery() {
        Alloy.Globals.addWindowInNav("styleDiscovery");
    }
    function navigateToLooks() {
        var shopByLookData = {
            type: "shopByLook"
        };
        Alloy.Globals.addWindowInNav("productListing", shopByLookData);
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "dashboard";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.dashboard = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        backgroundColor: "#ffffff",
        id: "dashboard"
    });
    $.__views.dashboard && $.addTopLevelView($.__views.dashboard);
    updateCount ? $.addListener($.__views.dashboard, "focus", updateCount) : __defers["$.__views.dashboard!focus!updateCount"] = true;
    clearMemory ? $.addListener($.__views.dashboard, "close", clearMemory) : __defers["$.__views.dashboard!close!clearMemory"] = true;
    stopImageRotation ? $.addListener($.__views.dashboard, "blur", stopImageRotation) : __defers["$.__views.dashboard!blur!stopImageRotation"] = true;
    $.__views.fullView = Ti.UI.createView({
        height: Titanium.UI.FILL,
        layout: "horizontal",
        id: "fullView"
    });
    $.__views.dashboard.add($.__views.fullView);
    $.__views.sliderView = Ti.UI.createView({
        height: Titanium.UI.FILL,
        backgroundColor: "#ffffff",
        id: "sliderView"
    });
    $.__views.fullView.add($.__views.sliderView);
    $.__views.img1 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        image: "/images/MainBG.png",
        id: "img1"
    });
    $.__views.sliderView.add($.__views.img1);
    $.__views.__alloyId335 = Ti.UI.createView({
        height: Titanium.UI.FILL,
        layout: "vertical",
        id: "__alloyId335"
    });
    $.__views.sliderView.add($.__views.__alloyId335);
    $.__views.topView = Ti.UI.createView({
        height: "150dp",
        width: Titanium.UI.FILL,
        id: "topView"
    });
    $.__views.__alloyId335.add($.__views.topView);
    $.__views.sliderProfileContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "sliderProfileContainer"
    });
    $.__views.topView.add($.__views.sliderProfileContainer);
    $.__views.profileImage = Ti.UI.createImageView({
        width: "75dp",
        height: "75dp",
        borderRadius: "37.5dp",
        left: "20dp",
        defaultImage: "/images/default_user_picture.png",
        image: "/images/default_user_picture.png",
        borderColor: "#ffffff",
        borderWidth: "0.35",
        id: "profileImage",
        type: "user_image"
    });
    $.__views.sliderProfileContainer.add($.__views.profileImage);
    $.__views.nameLabel = Ti.UI.createLabel({
        font: {
            fontFamily: "futura-hv-bt-heavy",
            fontSize: "12dp"
        },
        left: "115",
        color: "#555555",
        height: "15dp",
        top: "22.5",
        width: Titanium.UI.FILL,
        right: "20dp",
        ellipsize: true,
        wordWrap: false,
        text: "Welcome Guest!",
        id: "nameLabel",
        type: "nameEmail"
    });
    $.__views.sliderProfileContainer.add($.__views.nameLabel);
    $.__views.emailLabel = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "13dp"
        },
        left: "115",
        color: "#e65e48",
        height: "16dp",
        bottom: "20.5",
        width: Titanium.UI.FILL,
        right: "20dp",
        ellipsize: true,
        wordWrap: false,
        text: "Login/Register",
        id: "emailLabel",
        type: "nameEmail"
    });
    $.__views.sliderProfileContainer.add($.__views.emailLabel);
    $.__views.editProfile = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "13dp"
        },
        bottom: "15dp",
        right: "20dp",
        height: "20dp",
        width: "50dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        color: "#e65e48",
        text: "Edit",
        id: "editProfile",
        visible: false
    });
    $.__views.topView.add($.__views.editProfile);
    navigateToMyAccount ? $.addListener($.__views.editProfile, "click", navigateToMyAccount) : __defers["$.__views.editProfile!click!navigateToMyAccount"] = true;
    $.__views.__alloyId336 = Ti.UI.createView({
        height: "1dp",
        width: Titanium.UI.FILL,
        left: "20dp",
        right: "20dp",
        backgroundColor: "#4d000000",
        id: "__alloyId336"
    });
    $.__views.__alloyId335.add($.__views.__alloyId336);
    $.__views.menuScrollContainer = Ti.UI.createView({
        id: "menuScrollContainer",
        height: Titanium.UI.FILL
    });
    $.__views.__alloyId335.add($.__views.menuScrollContainer);
    $.__views.menuScroll = Ti.UI.createScrollView({
        height: Titanium.UI.FILL,
        backgroundColor: "transparent",
        scrollType: "vertical",
        id: "menuScroll",
        layout: "vertical"
    });
    $.__views.menuScrollContainer.add($.__views.menuScroll);
    $.__views.sliderCategories = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        layout: "vertical",
        backgroundColor: "transparent",
        id: "sliderCategories"
    });
    $.__views.menuScroll.add($.__views.sliderCategories);
    $.__views.ourrangeContainer = Ti.UI.createView({
        top: "15dp",
        height: Titanium.UI.SIZE,
        layout: "vertical",
        width: Titanium.UI.FILL,
        left: "20dp",
        right: "20dp",
        type: "scroll",
        id: "ourrangeContainer",
        category: 1
    });
    $.__views.sliderCategories.add($.__views.ourrangeContainer);
    $.__views.__alloyId337 = Ti.UI.createView({
        top: "0dp",
        width: Titanium.UI.FILL,
        height: "25dp",
        touchEnabled: false,
        id: "__alloyId337"
    });
    $.__views.ourrangeContainer.add($.__views.__alloyId337);
    $.__views.ourrangeLbl = Ti.UI.createLabel({
        font: {
            fontSize: "13sp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        left: "0dp",
        touchEnabled: false,
        text: "OUR RANGE",
        id: "ourrangeLbl"
    });
    $.__views.__alloyId337.add($.__views.ourrangeLbl);
    $.__views.ourrangeArrow = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "15dp"
        },
        color: "#000000",
        text: Alloy.Globals.icon.downArrow,
        right: "0dp",
        touchEnabled: false,
        id: "ourrangeArrow"
    });
    $.__views.__alloyId337.add($.__views.ourrangeArrow);
    $.__views.inspiredContainer = Ti.UI.createView({
        top: "15dp",
        height: Titanium.UI.SIZE,
        layout: "vertical",
        width: Titanium.UI.FILL,
        left: "20dp",
        right: "20dp",
        type: "scroll",
        id: "inspiredContainer",
        category: 2
    });
    $.__views.sliderCategories.add($.__views.inspiredContainer);
    $.__views.__alloyId338 = Ti.UI.createView({
        top: "0dp",
        width: Titanium.UI.FILL,
        height: "25dp",
        touchEnabled: false,
        id: "__alloyId338"
    });
    $.__views.inspiredContainer.add($.__views.__alloyId338);
    $.__views.inspiredLbl = Ti.UI.createLabel({
        font: {
            fontSize: "13sp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        left: "0dp",
        touchEnabled: false,
        text: "GET INSPIRED",
        id: "inspiredLbl"
    });
    $.__views.__alloyId338.add($.__views.inspiredLbl);
    $.__views.inspiredArrow = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "15dp"
        },
        color: "#000000",
        text: Alloy.Globals.icon.downArrow,
        right: "0dp",
        touchEnabled: false,
        id: "inspiredArrow"
    });
    $.__views.__alloyId338.add($.__views.inspiredArrow);
    $.__views.eshopContainer = Ti.UI.createView({
        top: "15dp",
        height: Titanium.UI.SIZE,
        layout: "vertical",
        width: Titanium.UI.FILL,
        left: "20dp",
        right: "20dp",
        type: "scroll",
        id: "eshopContainer",
        category: 3
    });
    $.__views.sliderCategories.add($.__views.eshopContainer);
    $.__views.__alloyId339 = Ti.UI.createView({
        top: "0dp",
        width: Titanium.UI.FILL,
        height: "25dp",
        touchEnabled: false,
        id: "__alloyId339"
    });
    $.__views.eshopContainer.add($.__views.__alloyId339);
    $.__views.eshopLbl = Ti.UI.createLabel({
        font: {
            fontSize: "13sp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        left: "0dp",
        touchEnabled: false,
        text: "SHOP",
        id: "eshopLbl"
    });
    $.__views.__alloyId339.add($.__views.eshopLbl);
    $.__views.eshopArrow = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "15dp"
        },
        color: "#000000",
        text: Alloy.Globals.icon.downArrow,
        right: "0dp",
        touchEnabled: false,
        id: "eshopArrow"
    });
    $.__views.__alloyId339.add($.__views.eshopArrow);
    $.__views.storeLocatorLbl = Ti.UI.createLabel({
        font: {
            fontSize: "12sp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#333333",
        height: "25dp",
        top: "15dp",
        width: Titanium.UI.FILL,
        left: "20dp",
        right: "20dp",
        text: "STORE LOCATOR",
        id: "storeLocatorLbl"
    });
    $.__views.sliderCategories.add($.__views.storeLocatorLbl);
    $.__views.appoinment = Ti.UI.createLabel({
        font: {
            fontSize: "12sp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#333333",
        height: "25dp",
        top: "15dp",
        width: Titanium.UI.FILL,
        left: "20dp",
        right: "20dp",
        text: "REQUEST AN APPOINTMENT",
        id: "appoinment"
    });
    $.__views.sliderCategories.add($.__views.appoinment);
    navigateToAppointment ? $.addListener($.__views.appoinment, "click", navigateToAppointment) : __defers["$.__views.appoinment!click!navigateToAppointment"] = true;
    $.__views.logoutLbl = Ti.UI.createLabel({
        font: {
            fontSize: "12sp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#333333",
        height: "25dp",
        top: "15dp",
        width: Titanium.UI.FILL,
        left: "20dp",
        right: "20dp",
        bottom: "50dp",
        text: "LOGOUT",
        id: "logoutLbl",
        visible: false
    });
    $.__views.sliderCategories.add($.__views.logoutLbl);
    $.__views.mainView = Ti.UI.createView({
        height: Titanium.UI.FILL,
        backgroundColor: "#ffffff",
        id: "mainView"
    });
    $.__views.fullView.add($.__views.mainView);
    $.__views.fadeView = Ti.UI.createView({
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        top: "50dp",
        zIndex: "500",
        backgroundColor: "transparent",
        touchEnabled: false,
        id: "fadeView"
    });
    $.__views.mainView.add($.__views.fadeView);
    $.__views.dashboardNavigation = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: "53dp",
        backgroundColor: "transparent",
        top: "0dp",
        id: "dashboardNavigation",
        zIndex: 100
    });
    $.__views.mainView.add($.__views.dashboardNavigation);
    $.__views.menuButton = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "35dp"
        },
        left: "-10dp",
        height: "45dp",
        width: "45dp",
        color: "#ffffff",
        backgroundColor: "transparent",
        id: "menuButton",
        text: Alloy.Globals.icon.menu
    });
    $.__views.dashboardNavigation.add($.__views.menuButton);
    $.__views.logoIcon = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon1",
            fontSize: "25dp"
        },
        height: "80dp",
        left: "45dp",
        width: Titanium.UI.SIZE,
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        color: "#ffffff",
        id: "logoIcon",
        text: Alloy.Globals.icon.logo
    });
    $.__views.dashboardNavigation.add($.__views.logoIcon);
    $.__views.cartContainer = Ti.UI.createView({
        width: "45dp",
        height: "45dp",
        right: "90dp",
        id: "cartContainer"
    });
    $.__views.dashboardNavigation.add($.__views.cartContainer);
    $.__views.cartCountLbl = Ti.UI.createLabel({
        width: "18dp",
        height: "18dp",
        left: "5dp",
        top: "7dp",
        borderRadius: "9dp",
        borderColor: "transparent",
        borderWidth: "0.7",
        color: "#000000",
        visible: false,
        zIndex: "10",
        font: {
            fontSize: "10dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#e65e48",
        touchEnabled: false,
        id: "cartCountLbl"
    });
    $.__views.cartContainer.add($.__views.cartCountLbl);
    $.__views.cartLbl = Ti.UI.createLabel({
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "icomoon",
            fontSize: "22dp"
        },
        height: "45dp",
        width: "45dp",
        color: "#ffffff",
        id: "cartLbl",
        text: Alloy.Globals.icon.bag
    });
    $.__views.cartContainer.add($.__views.cartLbl);
    $.__views.searchLbl = Ti.UI.createLabel({
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "icomoon",
            fontSize: "22dp"
        },
        height: "45dp",
        width: "45dp",
        color: "#ffffff",
        id: "searchLbl",
        text: Alloy.Globals.icon.search,
        right: "45dp"
    });
    $.__views.dashboardNavigation.add($.__views.searchLbl);
    $.__views.overFlowMenuLbl = Ti.UI.createLabel({
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "icomoon",
            fontSize: "22dp"
        },
        height: "45dp",
        width: "45dp",
        color: "#ffffff",
        id: "overFlowMenuLbl",
        text: Alloy.Globals.icon.dotsMenu,
        right: "0dp"
    });
    $.__views.dashboardNavigation.add($.__views.overFlowMenuLbl);
    $.__views.dashboardScroll = Ti.UI.createScrollView({
        width: Titanium.UI.FILL,
        layout: "vertical",
        top: "0dp",
        scrollType: "vertical",
        backgroundColor: "#404040",
        id: "dashboardScroll"
    });
    $.__views.mainView.add($.__views.dashboardScroll);
    $.__views.__alloyId340 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "0dp",
        id: "__alloyId340"
    });
    $.__views.dashboardScroll.add($.__views.__alloyId340);
    var __alloyId341 = [];
    $.__views.itemScrollableView = Ti.UI.createScrollableView({
        width: Titanium.UI.FILL,
        backgroundColor: "transparent",
        views: __alloyId341,
        id: "itemScrollableView",
        zIndex: 11
    });
    $.__views.__alloyId340.add($.__views.itemScrollableView);
    $.__views.opac = Ti.UI.createView({
        width: Titanium.UI.FILL,
        backgroundGradient: {
            type: "linear",
            colors: [ {
                color: "#bf231f20",
                position: 0
            }, {
                color: "transparent",
                position: 1
            } ],
            startPoint: {
                x: 0,
                y: "1%"
            },
            endPoint: {
                x: 0,
                y: "15%"
            },
            backFillStart: false
        },
        touchEnabled: false,
        id: "opac"
    });
    $.__views.__alloyId340.add($.__views.opac);
    $.__views.dashboardImage = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        image: "/images/dashboard_background.png",
        id: "dashboardImage"
    });
    $.__views.__alloyId340.add($.__views.dashboardImage);
    $.__views.scrollControllContainer = Ti.UI.createView({
        bottom: "15dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        zIndex: "14",
        id: "scrollControllContainer"
    });
    $.__views.__alloyId340.add($.__views.scrollControllContainer);
    $.__views.explore_lbl = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_medium_bt-webfont",
            fontSize: "16dp"
        },
        height: "40dp",
        bottom: "0dp",
        color: "#ffffff",
        backgroundColor: "#80404040",
        width: Titanium.UI.FILL,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "explore_lbl",
        text: "START EXPLORING"
    });
    $.__views.dashboardScroll.add($.__views.explore_lbl);
    $.__views.collectionContainer = Ti.UI.createView({
        backgroundColor: "#e6e6e6",
        layout: "vertical",
        id: "collectionContainer"
    });
    $.__views.dashboardScroll.add($.__views.collectionContainer);
    $.__views.__alloyId342 = Ti.UI.createView({
        top: "35dp",
        width: "25dp",
        height: "1dp",
        backgroundColor: "#cccccc",
        id: "__alloyId342"
    });
    $.__views.collectionContainer.add($.__views.__alloyId342);
    $.__views.__alloyId343 = Ti.UI.createLabel({
        top: "7dp",
        font: {
            fontSize: "20sp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#333333",
        text: "CATEGORIES",
        id: "__alloyId343"
    });
    $.__views.collectionContainer.add($.__views.__alloyId343);
    $.__views.categoriesContainer = Ti.UI.createView({
        top: "30dp",
        layout: "vertical",
        id: "categoriesContainer"
    });
    $.__views.collectionContainer.add($.__views.categoriesContainer);
    $.__views.upCategoryContainer = Ti.UI.createView({
        layout: "horizontal",
        width: Titanium.UI.FILL,
        top: "0dp",
        id: "upCategoryContainer"
    });
    $.__views.categoriesContainer.add($.__views.upCategoryContainer);
    $.__views.collectionView = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.FILL,
        id: "collectionView"
    });
    $.__views.upCategoryContainer.add($.__views.collectionView);
    $.__views.collectionLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "50sp"
        },
        color: "#000000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        touchEnabled: false,
        id: "collectionLbl",
        text: Alloy.Globals.icon.collections
    });
    $.__views.collectionView.add($.__views.collectionLbl);
    $.__views.__alloyId344 = Ti.UI.createLabel({
        color: "#000000",
        font: {
            fontSize: "10sp"
        },
        bottom: "5dp",
        touchEnabled: false,
        text: "COLLECTIONS",
        id: "__alloyId344"
    });
    $.__views.collectionView.add($.__views.__alloyId344);
    $.__views.curtainsView = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.FILL,
        id: "curtainsView"
    });
    $.__views.upCategoryContainer.add($.__views.curtainsView);
    $.__views.curtainsLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "50sp"
        },
        color: "#000000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        touchEnabled: false,
        id: "curtainsLbl",
        text: Alloy.Globals.icon.curtains
    });
    $.__views.curtainsView.add($.__views.curtainsLbl);
    $.__views.__alloyId345 = Ti.UI.createLabel({
        color: "#000000",
        font: {
            fontSize: "10sp"
        },
        bottom: "5dp",
        touchEnabled: false,
        text: "CURTAINS",
        id: "__alloyId345"
    });
    $.__views.curtainsView.add($.__views.__alloyId345);
    $.__views.upholsteryView = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.FILL,
        id: "upholsteryView"
    });
    $.__views.upCategoryContainer.add($.__views.upholsteryView);
    $.__views.upholsteryLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "50sp"
        },
        color: "#000000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        touchEnabled: false,
        id: "upholsteryLbl",
        text: Alloy.Globals.icon.upholstery
    });
    $.__views.upholsteryView.add($.__views.upholsteryLbl);
    $.__views.__alloyId346 = Ti.UI.createLabel({
        color: "#000000",
        font: {
            fontSize: "10sp"
        },
        bottom: "5dp",
        touchEnabled: false,
        text: "UPHOLSTERY",
        id: "__alloyId346"
    });
    $.__views.upholsteryView.add($.__views.__alloyId346);
    $.__views.downCategoryContainer = Ti.UI.createView({
        layout: "horizontal",
        width: Titanium.UI.FILL,
        top: "0dp",
        id: "downCategoryContainer"
    });
    $.__views.categoriesContainer.add($.__views.downCategoryContainer);
    $.__views.beddingsView = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.FILL,
        id: "beddingsView"
    });
    $.__views.downCategoryContainer.add($.__views.beddingsView);
    $.__views.beddingsLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "50sp"
        },
        color: "#000000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        touchEnabled: false,
        id: "beddingsLbl",
        text: Alloy.Globals.icon.beddings
    });
    $.__views.beddingsView.add($.__views.beddingsLbl);
    $.__views.__alloyId347 = Ti.UI.createLabel({
        color: "#000000",
        font: {
            fontSize: "10sp"
        },
        bottom: "5dp",
        touchEnabled: false,
        text: "BED LINEN",
        id: "__alloyId347"
    });
    $.__views.beddingsView.add($.__views.__alloyId347);
    $.__views.wallpaperView = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.FILL,
        id: "wallpaperView"
    });
    $.__views.downCategoryContainer.add($.__views.wallpaperView);
    $.__views.wallpaperLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "50sp"
        },
        color: "#000000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        touchEnabled: false,
        id: "wallpaperLbl",
        text: Alloy.Globals.icon.wallpaper
    });
    $.__views.wallpaperView.add($.__views.wallpaperLbl);
    $.__views.__alloyId348 = Ti.UI.createLabel({
        color: "#000000",
        font: {
            fontSize: "10sp"
        },
        bottom: "5dp",
        touchEnabled: false,
        text: "WALLPAPER",
        id: "__alloyId348"
    });
    $.__views.wallpaperView.add($.__views.__alloyId348);
    $.__views.blindsView = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.FILL,
        id: "blindsView"
    });
    $.__views.downCategoryContainer.add($.__views.blindsView);
    $.__views.blindsLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "50sp"
        },
        color: "#000000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        touchEnabled: false,
        id: "blindsLbl",
        text: Alloy.Globals.icon.blinds
    });
    $.__views.blindsView.add($.__views.blindsLbl);
    $.__views.__alloyId349 = Ti.UI.createLabel({
        color: "#000000",
        font: {
            fontSize: "10sp"
        },
        bottom: "5dp",
        touchEnabled: false,
        text: "BLINDS",
        id: "__alloyId349"
    });
    $.__views.blindsView.add($.__views.__alloyId349);
    $.__views.beddingCategoryContainer = Ti.UI.createView({
        layout: "horizontal",
        width: Titanium.UI.FILL,
        top: "0dp",
        id: "beddingCategoryContainer"
    });
    $.__views.categoriesContainer.add($.__views.beddingCategoryContainer);
    $.__views.rmcView = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.FILL,
        id: "rmcView"
    });
    $.__views.beddingCategoryContainer.add($.__views.rmcView);
    $.__views.rmcLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "50sp"
        },
        color: "#000000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        touchEnabled: false,
        id: "rmcLbl",
        text: Alloy.Globals.icon.rmc
    });
    $.__views.rmcView.add($.__views.rmcLbl);
    $.__views.__alloyId350 = Ti.UI.createLabel({
        color: "#000000",
        font: {
            fontSize: "10sp"
        },
        bottom: "5dp",
        touchEnabled: false,
        text: "RMC",
        id: "__alloyId350"
    });
    $.__views.rmcView.add($.__views.__alloyId350);
    $.__views.cushionView = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.FILL,
        id: "cushionView"
    });
    $.__views.beddingCategoryContainer.add($.__views.cushionView);
    $.__views.cushionLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "50sp"
        },
        color: "#000000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        touchEnabled: false,
        id: "cushionLbl",
        text: Alloy.Globals.icon.cushion
    });
    $.__views.cushionView.add($.__views.cushionLbl);
    $.__views.__alloyId351 = Ti.UI.createLabel({
        color: "#000000",
        font: {
            fontSize: "10sp"
        },
        bottom: "5dp",
        touchEnabled: false,
        text: "CUSHIONS",
        id: "__alloyId351"
    });
    $.__views.cushionView.add($.__views.__alloyId351);
    $.__views.towelView = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.FILL,
        id: "towelView"
    });
    $.__views.beddingCategoryContainer.add($.__views.towelView);
    $.__views.towelLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "50sp"
        },
        color: "#000000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        touchEnabled: false,
        id: "towelLbl",
        text: Alloy.Globals.icon.towel
    });
    $.__views.towelView.add($.__views.towelLbl);
    $.__views.__alloyId352 = Ti.UI.createLabel({
        color: "#000000",
        font: {
            fontSize: "10sp"
        },
        bottom: "5dp",
        touchEnabled: false,
        text: "TOWELS",
        id: "__alloyId352"
    });
    $.__views.towelView.add($.__views.__alloyId352);
    $.__views.rugsCategoryContainer = Ti.UI.createView({
        id: "rugsCategoryContainer"
    });
    $.__views.categoriesContainer.add($.__views.rugsCategoryContainer);
    $.__views.rugsView = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.FILL,
        id: "rugsView"
    });
    $.__views.rugsCategoryContainer.add($.__views.rugsView);
    $.__views.rugsLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoonNew",
            fontSize: "50sp"
        },
        color: "#000000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        touchEnabled: false,
        id: "rugsLbl",
        text: Alloy.Globals.icon.rug
    });
    $.__views.rugsView.add($.__views.rugsLbl);
    $.__views.__alloyId353 = Ti.UI.createLabel({
        color: "#000000",
        font: {
            fontSize: "10sp"
        },
        bottom: "5dp",
        touchEnabled: false,
        text: "RUGS",
        id: "__alloyId353"
    });
    $.__views.rugsView.add($.__views.__alloyId353);
    $.__views.storeLocator = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "12sp"
        },
        top: "18dp",
        color: "#FFFFFF",
        width: Titanium.UI.FILL,
        height: "40dp",
        backgroundColor: "#404040",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "storeLocator"
    });
    $.__views.collectionContainer.add($.__views.storeLocator);
    navigateToStoreLocater ? $.addListener($.__views.storeLocator, "click", navigateToStoreLocater) : __defers["$.__views.storeLocator!click!navigateToStoreLocater"] = true;
    $.__views.__alloyId354 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        backgroundColor: "#ffffff",
        id: "__alloyId354"
    });
    $.__views.collectionContainer.add($.__views.__alloyId354);
    $.__views.__alloyId355 = Ti.UI.createView({
        top: "35dp",
        width: "25dp",
        height: "1dp",
        backgroundColor: "#cccccc",
        id: "__alloyId355"
    });
    $.__views.__alloyId354.add($.__views.__alloyId355);
    $.__views.__alloyId356 = Ti.UI.createLabel({
        top: "20dp",
        font: {
            fontSize: "12sp"
        },
        color: "#e65e48",
        text: "VISIT OUR",
        id: "__alloyId356"
    });
    $.__views.__alloyId354.add($.__views.__alloyId356);
    $.__views.__alloyId357 = Ti.UI.createLabel({
        top: "7dp",
        font: {
            fontSize: "20sp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#333333",
        text: "E-STORE",
        id: "__alloyId357"
    });
    $.__views.__alloyId354.add($.__views.__alloyId357);
    $.__views.estoreImage = Ti.UI.createImageView({
        height: "230dp",
        width: "100%",
        defaultImage: "/images/default_logo.png",
        top: "15dp",
        bottom: "10dp",
        id: "estoreImage"
    });
    $.__views.__alloyId354.add($.__views.estoreImage);
    navigateToEstore ? $.addListener($.__views.estoreImage, "click", navigateToEstore) : __defers["$.__views.estoreImage!click!navigateToEstore"] = true;
    $.__views.__alloyId358 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        layout: "vertical",
        height: "585dp",
        backgroundColor: "#fff",
        id: "__alloyId358"
    });
    $.__views.collectionContainer.add($.__views.__alloyId358);
    $.__views.__alloyId359 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: "280dp",
        id: "__alloyId359"
    });
    $.__views.__alloyId358.add($.__views.__alloyId359);
    $.__views.exploreImg = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        id: "exploreImg",
        left: 0,
        top: 0,
        defaultImage: "/images/default_logo.png"
    });
    $.__views.__alloyId359.add($.__views.exploreImg);
    $.__views.exploreLookBtn = Ti.UI.createLabel({
        font: {
            fontFamily: "futura-hv-bt-heavy",
            fontSize: "11dp"
        },
        backgroundColor: "#4D000000",
        borderColor: "#4De64e48",
        text: "EXPLORE OUR  LOOKS",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        zIndex: 2,
        color: "#ffff",
        width: "240dp",
        height: "40dp",
        id: "exploreLookBtn"
    });
    $.__views.__alloyId359.add($.__views.exploreLookBtn);
    navigateToLooks ? $.addListener($.__views.exploreLookBtn, "click", navigateToLooks) : __defers["$.__views.exploreLookBtn!click!navigateToLooks"] = true;
    $.__views.__alloyId360 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: "305dp",
        id: "__alloyId360"
    });
    $.__views.__alloyId358.add($.__views.__alloyId360);
    navigateToStyleDiscovery ? $.addListener($.__views.__alloyId360, "click", navigateToStyleDiscovery) : __defers["$.__views.__alloyId360!click!navigateToStyleDiscovery"] = true;
    $.__views.styleImg = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        id: "styleImg",
        height: "200dp",
        left: 0,
        top: "80dp",
        defaultImage: "/images/default_logo.png"
    });
    $.__views.__alloyId360.add($.__views.styleImg);
    $.__views.__alloyId361 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        backgroundColor: "transparent",
        top: "0dp",
        id: "__alloyId361"
    });
    $.__views.__alloyId360.add($.__views.__alloyId361);
    $.__views.__alloyId362 = Ti.UI.createView({
        top: "35dp",
        width: "25dp",
        height: "1dp",
        backgroundColor: "#cccccc",
        id: "__alloyId362"
    });
    $.__views.__alloyId361.add($.__views.__alloyId362);
    $.__views.__alloyId363 = Ti.UI.createLabel({
        top: "20dp",
        font: {
            fontSize: "12sp"
        },
        color: "#e65e48",
        text: "DISCOVER YOUR",
        id: "__alloyId363"
    });
    $.__views.__alloyId361.add($.__views.__alloyId363);
    $.__views.__alloyId364 = Ti.UI.createLabel({
        top: "7dp",
        font: {
            fontSize: "20sp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#333333",
        text: "STYLE",
        id: "__alloyId364"
    });
    $.__views.__alloyId361.add($.__views.__alloyId364);
    $.__views.openView = Ti.UI.createView({
        zIndex: "100",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        top: "0dp",
        right: "5dp",
        visible: false,
        backgroundColor: "transparent",
        id: "openView"
    });
    $.__views.mainView.add($.__views.openView);
    $.__views.overFlowView = Ti.UI.createView({
        zIndex: "101",
        width: "55%",
        top: "8dp",
        right: "5dp",
        height: Titanium.UI.SIZE,
        borderRadius: "3dp",
        borderColor: "gray",
        borderWidth: "0.6",
        backgroundColor: "#ffffff",
        layout: "vertical",
        id: "overFlowView"
    });
    $.__views.openView.add($.__views.overFlowView);
    $.__views.homeLbl = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: "40dp",
        left: "10dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        text: "ABOUT US",
        id: "homeLbl"
    });
    $.__views.overFlowView.add($.__views.homeLbl);
    navigateToAboutUs ? $.addListener($.__views.homeLbl, "click", navigateToAboutUs) : __defers["$.__views.homeLbl!click!navigateToAboutUs"] = true;
    $.__views.appoinmantLbl = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: "40dp",
        left: "10dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        text: "FEEDBACK",
        id: "appoinmantLbl"
    });
    $.__views.overFlowView.add($.__views.appoinmantLbl);
    $.__views.customerService = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: "40dp",
        left: "10dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        text: "CUSTOMER SERVICE",
        id: "customerService"
    });
    $.__views.overFlowView.add($.__views.customerService);
    $.__views.return_refund = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: "40dp",
        left: "10dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        text: "RETURNS / REFUND",
        id: "return_refund"
    });
    $.__views.overFlowView.add($.__views.return_refund);
    $.__views.faq = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: "40dp",
        left: "10dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        text: "FAQ",
        id: "faq"
    });
    $.__views.overFlowView.add($.__views.faq);
    $.__views.privacy = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: "40dp",
        left: "10dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        text: "PRIVACY POLICY",
        id: "privacy"
    });
    $.__views.overFlowView.add($.__views.privacy);
    $.__views.shortlist = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: "40dp",
        left: "10dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        text: "MY SHORTLIST",
        id: "shortlist"
    });
    $.__views.overFlowView.add($.__views.shortlist);
    try {
        $.addListener($.__views.shortlist, "click", Alloy.Globals.navigateToMyShorlistScreen);
    } catch (e) {
        __defers["$.__views.shortlist!click!Alloy.Globals.navigateToMyShorlistScreen"] = true;
    }
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var appointmentFlag = false;
    var bannerNavigation = require("bannerNavigation");
    googleAnalyticsScreen("Home page");
    var collectionAllData = "";
    var flag = true;
    var categoryName = "";
    var subCategory = [];
    var categoryData = [];
    var eshopData = [];
    var homePageData = [];
    var beddingContainer = "";
    var label = [];
    var dImaginer = {
        visible: false
    };
    var loginViewFlag = null;
    var setImageRotationInterval;
    Ti.App.removeEventListener("updateCartCountInDashBoard", updateCount);
    Ti.App.addEventListener("updateCartCountInDashBoard", updateCount);
    touchEffect.createTouchEffect($.explore_lbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.storeLocator, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.menuButton, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.logoIcon, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.cartLbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.searchLbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.overFlowMenuLbl, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.storeLocatorLbl, "#a6333333", "#333333");
    touchEffect.createTouchEffect($.appoinment, "#a6333333", "#333333");
    touchEffect.createTouchEffect($.logoutLbl, "#a6333333", "#333333");
    $.searchLbl.addEventListener("click", function(e) {
        Alloy.Globals.addWindowInNav("searchListing");
    });
    $.storeLocatorLbl.addEventListener("click", function() {
        Alloy.Globals.addWindowInNav("findStore");
    });
    $.cartContainer.addEventListener("click", function(e) {
        if (Ti.App.Properties.getString("access_token")) {
            var quote_id = Ti.App.Properties.getString("quote_id");
            Alloy.Globals.addWindowInNav("myBag", quote_id);
        } else Alloy.Globals.addWindowInNav("signIn", "myBag");
    });
    var platformWidth = Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor;
    var sWidth = 80 * platformWidth / 100;
    $.collectionContainer.width = Ti.UI.FILL;
    $.collectionContainer.height = Titanium.UI.SIZE;
    var sliderWidth = parseInt(sWidth);
    var viewwidth = platformWidth + sliderWidth;
    $.fullView.setWidth(viewwidth);
    $.mainView.setWidth(platformWidth);
    $.fullView.setLeft(-sliderWidth);
    $.sliderView.setWidth(sliderWidth);
    var toggleStatus = false;
    var animation = require("alloy/animation");
    var matrix1 = Ti.UI.create2DMatrix();
    matrix1 = matrix1.scale(1, 1);
    var zoom = Ti.UI.createAnimation({
        transform: matrix1,
        duration: 400,
        anchorPoint: {
            x: 0,
            y: .5
        }
    });
    var matrix2 = Ti.UI.create2DMatrix();
    matrix2 = matrix2.scale(1, .9);
    var zoomout = Ti.UI.createAnimation({
        transform: matrix2,
        duration: 400
    });
    var sliderView = $.fullView;
    $.menuButton.removeEventListener("click", toggleSlider);
    $.fadeView.removeEventListener("click", toggleSlider);
    $.menuButton.addEventListener("click", toggleSlider);
    $.fadeView.addEventListener("click", toggleSlider);
    $.itemScrollableView.height = Ti.Platform.displayCaps.platformHeight / Ti.Platform.displayCaps.logicalDensityFactor - 58;
    $.dashboardImage.height = Ti.Platform.displayCaps.platformHeight / Ti.Platform.displayCaps.logicalDensityFactor - 58;
    $.opac.height = Ti.Platform.displayCaps.platformHeight / Ti.Platform.displayCaps.logicalDensityFactor - 58;
    var buttonWidth, x, buttonHeight;
    buttonWidth = parseInt(Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor - 50);
    x = buttonWidth - 15;
    buttonHeight = parseInt(x / 2);
    var height = parseInt(buttonWidth / 3);
    $.categoriesContainer.width = buttonWidth;
    $.categoriesContainer.height = 4 * height;
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
    $.explore_lbl.removeEventListener("click", exploreScroll);
    $.explore_lbl.addEventListener("click", exploreScroll);
    $.dashboardScroll.removeEventListener("scroll", headerEffect);
    $.dashboardScroll.addEventListener("scroll", headerEffect);
    $.menuScroll.removeEventListener("singletap", categoryOption);
    $.menuScroll.addEventListener("singletap", categoryOption);
    var text = " FIND A D'DECOR STORE NEAR YOU";
    var attr = Ti.UI.createAttributedString({
        text: text,
        attributes: [ {
            type: Ti.UI.ATTRIBUTE_FONT,
            value: {
                fontSize: 10,
                fontFamily: "futura_medium_bt-webfont"
            },
            range: [ text.indexOf("FIND A D'DECOR STORE NEAR YOU"), "FIND A D'DECOR STORE NEAR YOU".length ]
        } ]
    });
    $.storeLocator.attributedString = attr;
    touchEffect.createTouchEffect($.homeLbl, "#a6333333", "#333333");
    touchEffect.createTouchEffect($.appoinmantLbl, "#a6333333", "#333333");
    touchEffect.createTouchEffect($.customerService, "#a6333333", "#333333");
    touchEffect.createTouchEffect($.return_refund, "#a6333333", "#333333");
    touchEffect.createTouchEffect($.faq, "#a6333333", "#333333");
    $.overFlowMenuLbl.removeEventListener("click", showOverFlow);
    $.overFlowMenuLbl.addEventListener("click", showOverFlow);
    $.overFlowView.removeEventListener("click", hideOverFlow);
    $.overFlowView.addEventListener("click", hideOverFlow);
    $.openView.addEventListener("click", hideOverFlow);
    $.dashboardScroll.removeEventListener("click", hideOverFlow);
    $.dashboardScroll.addEventListener("click", hideOverFlow);
    $.itemScrollableView.addEventListener("click", function(e) {
        isNullVal(e.source.data.action) || ("App Page" == e.source.data.action ? e.source.data.product_id ? bannerNavigation.bannerNavigation(e.source.data.category_name, e.source.data.category_id, e.source.data.product_id) : "Appoinment" == e.source.data.category_name ? navigateToAppointment() : "Search" == e.source.data.category_name ? bannerNavigation.bannerSearchNavigation(e.source.data.category_name, e.source.data.search_term) : bannerNavigation.bannerNavigation(e.source.data.category_name, e.source.data.category_id) : "Web" == e.source.data.action ? bannerNavigation.bannerWebNavigation(e.source.data.web_url) : Ti.API.info("no hits"));
    });
    $.itemScrollableView.addEventListener("scrollend", function(e) {
        try {
            var numberOfPages = $.itemScrollableView.getViews().length;
            for (var i = 0; numberOfPages > i; i++) $.scrollControllContainer.children[0].children[i].setBackgroundColor("#80e7e7e7");
            $.scrollControllContainer.children[0].children[e.currentPage].setBackgroundColor("#e65e48");
        } catch (exp) {}
    });
    Alloy.Globals.checkLogin = function(e) {
        if (Ti.App.Properties.getString("access_token")) {
            $.nameLabel.text = Ti.App.Properties.getString("firstname").capitalize() + " " + Ti.App.Properties.getString("lastname").capitalize();
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
    Alloy.Globals.checkLogin();
    $.upCategoryContainer.removeEventListener("click", firstCategoryContainer);
    $.upCategoryContainer.removeEventListener("touchstart", touchStartView);
    $.upCategoryContainer.removeEventListener("touchcancel", touchCancelView);
    $.upCategoryContainer.removeEventListener("touchend", touchCancelView);
    $.upCategoryContainer.addEventListener("click", firstCategoryContainer);
    $.upCategoryContainer.addEventListener("touchstart", touchStartView);
    $.upCategoryContainer.addEventListener("touchcancel", touchCancelView);
    $.upCategoryContainer.addEventListener("touchend", touchCancelView);
    $.downCategoryContainer.removeEventListener("click", secondCategoryContainer);
    $.downCategoryContainer.removeEventListener("touchstart", touchStartView);
    $.downCategoryContainer.removeEventListener("touchcancel", touchCancelView);
    $.downCategoryContainer.removeEventListener("touchend", touchCancelView);
    $.downCategoryContainer.addEventListener("click", secondCategoryContainer);
    $.downCategoryContainer.addEventListener("touchstart", touchStartView);
    $.downCategoryContainer.addEventListener("touchcancel", touchCancelView);
    $.downCategoryContainer.addEventListener("touchend", touchCancelView);
    $.beddingCategoryContainer.removeEventListener("click", thirdCategoryContainer);
    $.beddingCategoryContainer.removeEventListener("touchstart", touchStartView);
    $.beddingCategoryContainer.removeEventListener("touchcancel", touchCancelView);
    $.beddingCategoryContainer.removeEventListener("touchend", touchCancelView);
    $.beddingCategoryContainer.addEventListener("click", thirdCategoryContainer);
    $.beddingCategoryContainer.addEventListener("touchstart", touchStartView);
    $.beddingCategoryContainer.addEventListener("touchcancel", touchCancelView);
    $.beddingCategoryContainer.addEventListener("touchend", touchCancelView);
    $.rugsCategoryContainer.removeEventListener("click", fourthCategoryContainer);
    $.rugsCategoryContainer.removeEventListener("touchstart", touchStartView);
    $.rugsCategoryContainer.removeEventListener("touchcancel", touchCancelView);
    $.rugsCategoryContainer.removeEventListener("touchend", touchCancelView);
    $.rugsCategoryContainer.addEventListener("click", fourthCategoryContainer);
    $.rugsCategoryContainer.addEventListener("touchstart", touchStartView);
    $.rugsCategoryContainer.addEventListener("touchcancel", touchCancelView);
    $.rugsCategoryContainer.addEventListener("touchend", touchCancelView);
    $.sliderProfileContainer.removeEventListener("click", navigateToLoginAccount);
    $.sliderProfileContainer.addEventListener("click", navigateToLoginAccount);
    $.logoutLbl.removeEventListener("click", logout);
    $.logoutLbl.addEventListener("click", logout);
    var toast = Ti.UI.createNotification({
        message: "Press Again To Exit",
        duration: Titanium.UI.NOTIFICATION_DURATION_SHORT
    });
    $.dashboard.add(toast);
    $.dashboard.addEventListener("focus", function() {
        closeFlag = false;
    });
    $.dashboard.addEventListener("android:back", function(e) {
        if (appointmentFlag) appointmentFlag = false; else if ("beddingVIEW" == beddingContainer.type) if (beddingContainer.children[3].getVisible()) beddingContainer.children[3].setVisible(false); else {
            hideShowView(beddingContainer);
            beddingContainer = "";
        } else if (dImaginer.visible) {
            Alloy.Globals.dimaginer.gotoback();
            dImaginer.visible = false;
        } else if (!Alloy.Globals.bookAppoinmentWindow) if (closeFlag) {
            $.dashboard.close();
            clearMemory();
            Alloy.Globals.destroyWindowInNav();
        } else {
            toast.show();
            closeFlag = true;
            setTimeout(function() {
                closeFlag = false;
            }, 2e3);
        }
    });
    $.customerService.addEventListener("click", function(e) {
        Alloy.Globals.addWindowInNav("customerService");
    });
    $.return_refund.addEventListener("click", function(e) {
        Alloy.Globals.addWindowInNav("returnRefund");
    });
    $.faq.addEventListener("click", function(e) {
        Alloy.Globals.addWindowInNav("faq");
    });
    $.privacy.addEventListener("click", function(e) {
        Alloy.Globals.addWindowInNav("privacypolicy");
    });
    $.appoinmantLbl.addEventListener("click", function(e) {
        Ti.App.Properties.getString("access_token") ? Alloy.Globals.addWindowInNav("feedBack") : Alloy.Globals.addWindowInNav("signIn");
    });
    dashboardData();
    __defers["$.__views.dashboard!focus!updateCount"] && $.addListener($.__views.dashboard, "focus", updateCount);
    __defers["$.__views.dashboard!close!clearMemory"] && $.addListener($.__views.dashboard, "close", clearMemory);
    __defers["$.__views.dashboard!blur!stopImageRotation"] && $.addListener($.__views.dashboard, "blur", stopImageRotation);
    __defers["$.__views.editProfile!click!navigateToMyAccount"] && $.addListener($.__views.editProfile, "click", navigateToMyAccount);
    __defers["$.__views.appoinment!click!navigateToAppointment"] && $.addListener($.__views.appoinment, "click", navigateToAppointment);
    __defers["$.__views.storeLocator!click!navigateToStoreLocater"] && $.addListener($.__views.storeLocator, "click", navigateToStoreLocater);
    __defers["$.__views.estoreImage!click!navigateToEstore"] && $.addListener($.__views.estoreImage, "click", navigateToEstore);
    __defers["$.__views.exploreLookBtn!click!navigateToLooks"] && $.addListener($.__views.exploreLookBtn, "click", navigateToLooks);
    __defers["$.__views.__alloyId360!click!navigateToStyleDiscovery"] && $.addListener($.__views.__alloyId360, "click", navigateToStyleDiscovery);
    __defers["$.__views.homeLbl!click!navigateToAboutUs"] && $.addListener($.__views.homeLbl, "click", navigateToAboutUs);
    __defers["$.__views.shortlist!click!Alloy.Globals.navigateToMyShorlistScreen"] && $.addListener($.__views.shortlist, "click", Alloy.Globals.navigateToMyShorlistScreen);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;