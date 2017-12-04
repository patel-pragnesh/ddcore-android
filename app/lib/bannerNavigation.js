exports.bannerNavigation = function(category, categoryId, productId) {
    var collectionAllData = null;
    switch(category) {
    case "Collection":
        if (productId) {
            collectionAllData = {
                type : "collection",
                category : "COLLECTIONS",
                id : productId
            };
            Alloy.Globals.addWindowInNav("productDetails", collectionAllData);
        } else {
            collectionAllData = {
                categoryId : categoryId,
                categoryName : "COLLECTION",
                WindowName : "COLLECTIONS",
                type : "collection",
                block : "Allcollection"
            };

            Alloy.Globals.addWindowInNav("productListing", collectionAllData);
        }

        break;

    case "ShopByLook":

        if (productId) {
            collectionAllData = {
                type : "shopByLook",
                category : "SHOP BY LOOK",
                id : productId
            };
            Alloy.Globals.addWindowInNav("productDetails", collectionAllData);
        } else {
            collectionAllData = {
                type : "shopByLook"
            };

            Alloy.Globals.addWindowInNav("productListing", collectionAllData);
        }

        break;

    case "Curtains":
        if (productId) {
            collectionAllData = {
                Productid : productId,
                block : "collection",
                navigatedblockid : "",
                type : "collection",
                category : "",//categoryName,
                // listObject : e,
                // listViewReference : addToCartCallback,
            };
            Alloy.Globals.addWindowInNav("collectionQdsDetails", collectionAllData);
        } else {
            collectionAllData = {
                wName : "CURTAINS",
                categoryId : categoryId,
                type : "C_Product",
                categoryType : "Collectionfabrics",
                categoryName : "CURTAINS"
            };

            Alloy.Globals.addWindowInNav("productListing", collectionAllData);
        }
        break;

    case "Upholstery":

        if (productId) {
            collectionAllData = {
                Productid : productId,
                block : "collection",
                navigatedblockid : "",
                type : "collection",
                category : "",//categoryName,
                // listObject : e,
                // listViewReference : addToCartCallback,
            };
            Alloy.Globals.addWindowInNav("collectionQdsDetails", collectionAllData);
        } else {
            collectionAllData = {
                wName : "UPHOLSTERY",
                categoryId : categoryId,
                type : "C_Product",
                categoryType : "Collectionfabrics",
                categoryName : "UPHOLSTERY"
            };

            Alloy.Globals.addWindowInNav("productListing", collectionAllData);
        }
        break;

    case "Wallpaper":

        if (productId) {
            collectionAllData = {
                Productid : productId,
                block : "shop",
                product : "wallpaper",
                type : "shop",
                category : "wallpaper",
                // listObject : e,
                //listViewReference : addToCartCallback,
            };
            Alloy.Globals.addWindowInNav("estoreDetails", collectionAllData);
        } else {
            collectionAllData = {
                wName : "WALLPAPERS",
                categoryId : categoryId,
                type : "C_Product",
                categoryType : "wallpaper",
                categoryName : "WALLPAPERS"
            };

            Alloy.Globals.addWindowInNav("productListing", collectionAllData);
        }
        break;

    case "Bed Linen":
        Alloy.Globals.addWindowInNav("beddings");
        break;
    case "All Collection":
        Alloy.Globals.addWindowInNav("allCollections");
        break;

    case "Blind":

        if (productId) {
            collectionAllData = {
                Productid : productId,
                block : "blinds",
                navigatedblockid : "",
                type : "blinds",
                category : "",//categoryName,
                //listObject : e,
                //listViewReference : addToCartCallback,
            };
            Alloy.Globals.addWindowInNav("collectionQdsDetails", collectionAllData);
        } else {
            Alloy.Globals.addWindowInNav("blinds");
        }
        break;

    case "Ready Made Curtains":

        if (productId) {
            collectionAllData = {
                Productid : productId,
                block : "shop",
                product : "shopProduct",
                // listObject : e,
                // listViewReference : addToCartCallback,
                category : "BED LINEN",
                type : "SHOP"
            };
            Alloy.Globals.addWindowInNav("estoreDetails", collectionAllData);
        } else {
            var collectionAllData = {
                wName : "",
                categoryId : categoryId,
                type : "C_Product", 
                categoryType : "shop",
                subTitle : "READY MADE CURTAINS",
                categoryName : "BED LINEN",
                category : "BED LINEN",
            };
            Alloy.Globals.addWindowInNav("productListing", collectionAllData);
        }
        break;

    case "Cushion":
        if (productId) {
            collectionAllData = {
                Productid : productId,
                block : "shop",
                product : "shopProduct",
                // listObject : e,
                // listViewReference : addToCartCallback,
                category : "BED LINEN",
                type : "SHOP"
            };
            Alloy.Globals.addWindowInNav("estoreDetails", collectionAllData);
        } else {
            var collectionAllData = {
                wName : "",
                categoryId : categoryId,
                type : "C_Product",
                categoryType : "shop",
                subTitle : "CUSHION",
                categoryName : "BED LINEN",
                category : "BED LINEN",
            };
            Alloy.Globals.addWindowInNav("productListing", collectionAllData);
        }
        break;

    case "Towel":
        if (productId) {
            collectionAllData = {
                Productid : productId,
                block : "shop",
                product : "shopProduct",
                // listObject : e,
                // listViewReference : addToCartCallback,
                category : "BED LINEN",
                type : "SHOP"
            };
            Alloy.Globals.addWindowInNav("estoreDetails", collectionAllData);
        } else {
            var collectionAllData = {
                wName : "",
                categoryId : categoryId,
                type : "C_Product",
                categoryType : "shop",
                subTitle : "TOWEL",
                categoryName : "BED LINEN",
                category : "BED LINEN",
            };
            Alloy.Globals.addWindowInNav("productListing", collectionAllData);
        }
        break;

    case "About Us":
        Alloy.Globals.addWindowInNav("aboutUs");
        break;

    case "Eshop":
        Alloy.Globals.addWindowInNav("eshop");
        break;

    case "Customer Service":

        if (isNullVal(Ti.App.Properties.getString("access_token"))) {
            Alloy.Globals.addWindowInNav("signIn", "dashboard");
        } else {
            Alloy.Globals.addWindowInNav("customerService");
        }
        break;

    case "Style Discovery":
        Alloy.Globals.addWindowInNav("styleDiscovery", "bannerClick");
        break;
    
    case "Store Locator":
        Alloy.Globals.addWindowInNav("findStore");
        break;
        
    case "DImaginer":
        Alloy.Globals.addWindowInNav("dImaginer");
        break;

    case "My Account":
        if (isNullVal(Ti.App.Properties.getString("access_token"))) {
            Alloy.Globals.addWindowInNav("signIn", "dashboard");
        } else {
            Alloy.Globals.addWindowInNav("myaccount");
        }

        break;

    case "My Cart":
        if (Ti.App.Properties.getString("access_token")) {
            var quote_id = Ti.App.Properties.getString("quote_id");
            Alloy.Globals.addWindowInNav("myBag", quote_id);
        } else {
            Alloy.Globals.addWindowInNav("signIn", "myBag");
        }
        break;

    case "Return-Refund":
        Alloy.Globals.addWindowInNav("returnRefund");
        break;

    case "Faq":
        Alloy.Globals.addWindowInNav("faq");
        break;

    case "Privacy-Policy":
        Alloy.Globals.addWindowInNav("privacypolicy");
        break;

    case "FeedBack":
        if (isNullVal(Ti.App.Properties.getString("access_token"))) {
            Alloy.Globals.addWindowInNav("signIn", "dashboard");
        } else {
            Alloy.Globals.addWindowInNav("feedBack");
        }

        break;

    case "Shop Detail":
        collectionAllData = {
            Productid : categoryId,
            block : "shop",
            product : "shopProduct",
            // listObject : e,
            // listViewReference : addToCartCallback,
            category : "BED LINEN",
            type : "SHOP"
        };
        Alloy.Globals.addWindowInNav("estoreDetails", collectionAllData);
        break;
    case "Wallpaper Detail":
        collectionAllData = {
            Productid : categoryId,
            block : "shop",
            product : "wallpaper",
            type : "shop",
            category : "wallpaper",
            // listObject : e,
            //listViewReference : addToCartCallback,
        };
        Alloy.Globals.addWindowInNav("estoreDetails", collectionAllData);
        break;

    case "Collection Detail":
        collectionAllData = {
            type : "collection",
            category : "COLLECTIONS",
            id : categoryId
        };
        Alloy.Globals.addWindowInNav("productDetails", collectionAllData);
        break;

    case "Look Detail":
        collectionAllData = {
            type : "shopByLook",
            category : "SHOP BY LOOK",
            id : categoryId
        };
        Alloy.Globals.addWindowInNav("productDetails", collectionAllData);
        break;

    case "Blind Detail":
        collectionAllData = {
            Productid : categoryId,
            block : "blinds",
            navigatedblockid : "",
            type : "blinds",
            category : "",//categoryName,
            //listObject : e,
            //listViewReference : addToCartCallback,
        };
        Alloy.Globals.addWindowInNav("collectionQdsDetails", collectionAllData);
        break;

    case "Qds Detail":
        collectionAllData = {
            Productid : categoryId,
            block : "collection",
            navigatedblockid : "",
            type : "collection",
            category : "",//categoryName,
            // listObject : e,
            // listViewReference : addToCartCallback,
        };
        Alloy.Globals.addWindowInNav("collectionQdsDetails", collectionAllData);
        break;

    }

};


exports.bannerSearchNavigation = function(category, searchText) {
    var data = null;
    data = {
        searchText : searchText,
        action : "bannerClick"
    },
    Alloy.Globals.addWindowInNav("searchListing",data);
};

exports.bannerWebNavigation = function(url) {
    Titanium.Platform.openURL(url);
};
