function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function enableSearch() {
        $.searchField.visible = true;
        $.screenLbl.visible = false;
        $.searchField.focus();
    }
    function toggelDetailList() {
        if ("300dp" === $.store_list.getHeight()) {
            $.store_list.animate({
                height: "40dp",
                duration: 500
            });
            setTimeout(function() {
                $.store_list.setHeight("40dp");
                $.filterLbl.hide();
                $.store_list_container.setVisible(false);
            }, 500);
            $.storeDetails.setBackgroundColor("#fff");
            $.storeDetails.setColor("#A4A4A4");
            $.storeDetails.setBorderColor("#A4A4A4");
        } else {
            $.store_list.animate({
                height: "300dp",
                duration: 500
            });
            setTimeout(function() {
                $.store_list.setHeight("300dp");
                $.filterLbl.show();
                $.store_list_container.setVisible(true);
            }, 500);
            $.storeDetails.setBackgroundColor(Alloy.Globals.labelTitleColor);
            $.storeDetails.setColor("#000");
            $.storeDetails.setBorderColor("transparent");
        }
    }
    function openFilterList() {
        $.filterLbl.hide();
        $.filterContatiner.visible = true;
        $.filterListContainer.animate({
            height: "200dp",
            duration: 500
        });
        $.filterListContainer.setHeight("200dp");
    }
    function closeFilterList() {
        $.filterListContainer.animate({
            height: "0dp",
            duration: 500
        });
        setTimeout(function() {
            $.filterContatiner.setVisible(false);
            $.filterLbl.show();
        }, 500);
        $.filterListContainer.setHeight("0dp");
    }
    function goToBack() {
        Alloy.Globals.popWindowInNav();
        $.storeLocator.close();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "storeLocator";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.storeLocator = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        backgroundColor: "#fff",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        id: "storeLocator"
    });
    $.__views.storeLocator && $.addTopLevelView($.__views.storeLocator);
    goToBack ? $.addListener($.__views.storeLocator, "android:back", goToBack) : __defers["$.__views.storeLocator!android:back!goToBack"] = true;
    $.__views.header = Ti.UI.createView({
        height: "53dp",
        width: Titanium.UI.FILL,
        top: "0",
        left: "0",
        backgroundColor: "#231f20",
        id: "header"
    });
    $.__views.storeLocator.add($.__views.header);
    $.__views.screenLbl = Ti.UI.createLabel({
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        left: "5%",
        color: "#fff",
        text: "FIND A STORE",
        visible: true,
        id: "screenLbl"
    });
    $.__views.header.add($.__views.screenLbl);
    $.__views.searchField = Ti.UI.createTextField({
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "14dp"
        },
        color: "#ffff",
        left: "5%",
        width: Titanium.UI.FILL,
        right: "20%",
        visible: false,
        id: "searchField",
        hintText: "Enter City/ State/ Pincode"
    });
    $.__views.header.add($.__views.searchField);
    $.__views.searchStore = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "18dp"
        },
        text: Alloy.Globals.icon.search,
        right: "14%",
        color: "#fff",
        id: "searchStore"
    });
    $.__views.header.add($.__views.searchStore);
    enableSearch ? $.addListener($.__views.searchStore, "click", enableSearch) : __defers["$.__views.searchStore!click!enableSearch"] = true;
    $.__views.__alloyId1539 = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "16dp"
        },
        text: Alloy.Globals.icon.close,
        right: "5%",
        color: "#fff",
        id: "__alloyId1539"
    });
    $.__views.header.add($.__views.__alloyId1539);
    $.__views.filterContainer = Ti.UI.createView({
        top: "53dp",
        backgroundColor: "#231f20",
        width: Titanium.UI.FILL,
        height: "35dp",
        id: "filterContainer"
    });
    $.__views.storeLocator.add($.__views.filterContainer);
    $.__views.fabric_lbl = Ti.UI.createLabel({
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: Alloy.Globals.labelTitleColor,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        height: Titanium.UI.FILL,
        width: "48%",
        left: "0dp",
        text: "FABRIC STORES",
        id: "fabric_lbl"
    });
    $.__views.filterContainer.add($.__views.fabric_lbl);
    $.__views.__alloyId1540 = Ti.UI.createView({
        backgroundColor: Alloy.Globals.labelTitleColor,
        height: "2dp",
        width: "48%",
        bottom: "1dp",
        left: "5dp",
        id: "__alloyId1540"
    });
    $.__views.filterContainer.add($.__views.__alloyId1540);
    $.__views.__alloyId1541 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp"
        },
        color: "#a6ffffff",
        text: "|",
        id: "__alloyId1541"
    });
    $.__views.filterContainer.add($.__views.__alloyId1541);
    $.__views.blind_lbl = Ti.UI.createLabel({
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: Alloy.Globals.labelTitleColor,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        height: Titanium.UI.FILL,
        width: "48%",
        right: "0dp",
        text: "BLINDS STORES",
        id: "blind_lbl"
    });
    $.__views.filterContainer.add($.__views.blind_lbl);
    $.__views.__alloyId1542 = Ti.UI.createView({
        backgroundColor: Alloy.Globals.labelTitleColor,
        height: "2dp",
        width: "48%",
        bottom: "1dp",
        visible: false,
        right: "5dp",
        id: "__alloyId1542"
    });
    $.__views.filterContainer.add($.__views.__alloyId1542);
    $.__views.map_container = Ti.UI.createView({
        top: "90dp",
        left: "0",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        id: "map_container"
    });
    $.__views.storeLocator.add($.__views.map_container);
    $.__views.store_list = Ti.UI.createView({
        bottom: "0dp",
        width: Titanium.UI.FILL,
        height: "40dp",
        zIndex: 1,
        id: "store_list"
    });
    $.__views.storeLocator.add($.__views.store_list);
    $.__views.storeDirection = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "14dp"
        },
        text: Alloy.Globals.icon.location,
        backgroundColor: "#fff",
        borderColor: "#A4A4A4",
        borderRadius: 20,
        borderWidth: .5,
        color: "#A4A4A4",
        width: "30dp",
        height: "30dp",
        top: "0dp",
        right: "16%",
        zIndex: 2,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "storeDirection"
    });
    $.__views.store_list.add($.__views.storeDirection);
    $.__views.storeDetails = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "14dp"
        },
        text: Alloy.Globals.icon.details,
        backgroundColor: "#fff",
        borderColor: "#A4A4A4",
        borderRadius: 20,
        borderWidth: .5,
        color: "#A4A4A4",
        width: "30dp",
        height: "30dp",
        top: "0dp",
        right: "5%",
        zIndex: 2,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "storeDetails"
    });
    $.__views.store_list.add($.__views.storeDetails);
    toggelDetailList ? $.addListener($.__views.storeDetails, "click", toggelDetailList) : __defers["$.__views.storeDetails!click!toggelDetailList"] = true;
    $.__views.store_list_container = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        top: "20dp",
        left: "0dp",
        borderColor: "#231f20",
        backgroundColor: "#231f20",
        visible: false,
        id: "store_list_container"
    });
    $.__views.store_list.add($.__views.store_list_container);
    var __alloyId1543 = {};
    var __alloyId1546 = [];
    var __alloyId1548 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId1549 = [];
            var __alloyId1550 = {
                type: "Ti.UI.Label",
                properties: {
                    font: {
                        fontFamily: "futura_medium_bt-webfont",
                        fontSize: "12dp"
                    },
                    left: "0%",
                    top: "0",
                    color: "#fff",
                    height: "12dp",
                    text: "D'Decor Store ,Bandra"
                }
            };
            __alloyId1549.push(__alloyId1550);
            var __alloyId1551 = {
                type: "Ti.UI.Label",
                properties: {
                    font: {
                        fontFamily: "futura_medium_bt-webfont",
                        fontSize: "10dp"
                    },
                    color: "grey",
                    top: "0",
                    right: "0%",
                    text: "3.3 km"
                }
            };
            __alloyId1549.push(__alloyId1551);
            return __alloyId1549;
        }(),
        properties: {
            width: Titanium.UI.FILL,
            height: Titanium.UI.SIZE,
            top: 0,
            left: "0%"
        }
    };
    __alloyId1546.push(__alloyId1548);
    var __alloyId1552 = {
        type: "Ti.UI.Label",
        properties: {
            color: "#fff",
            font: {
                fontSize: "10dp"
            },
            top: "5dp",
            left: "0%",
            text: "EXCULSIVE"
        }
    };
    __alloyId1546.push(__alloyId1552);
    var __alloyId1553 = {
        type: "Ti.UI.Label",
        properties: {
            color: "#fff",
            width: "70%",
            height: Titanium.UI.SIZE,
            maxLines: 4,
            wordWrap: true,
            font: {
                fontSize: "10dp"
            },
            text: "address addressaddress address addressaddress address addressaddress address addressaddress address addressaddress address addressaddress address address"
        }
    };
    __alloyId1546.push(__alloyId1553);
    var __alloyId1554 = {
        type: "Ti.UI.Label",
        properties: {
            color: Alloy.Globals.labelTitleColor,
            top: "5dp",
            left: "0%",
            font: {
                fontSize: "12dp"
            },
            text: "GET DIRECTIONS"
        }
    };
    __alloyId1546.push(__alloyId1554);
    var __alloyId1545 = {
        properties: {
            width: Titanium.UI.FILL,
            height: Titanium.UI.SIZE,
            name: "template",
            selectionStyle: "none",
            layout: "vertical"
        },
        childTemplates: __alloyId1546
    };
    __alloyId1543["template"] = __alloyId1545;
    var __alloyId1557 = [];
    $.__views.__alloyId1558 = {
        properties: {
            id: "__alloyId1558"
        }
    };
    __alloyId1557.push($.__views.__alloyId1558);
    $.__views.__alloyId1559 = {
        properties: {
            id: "__alloyId1559"
        }
    };
    __alloyId1557.push($.__views.__alloyId1559);
    $.__views.__alloyId1555 = Ti.UI.createListSection({
        id: "__alloyId1555"
    });
    $.__views.__alloyId1555.items = __alloyId1557;
    var __alloyId1560 = [];
    __alloyId1560.push($.__views.__alloyId1555);
    $.__views.storeListView = Ti.UI.createListView({
        top: "20dp",
        left: "5%",
        right: "5%",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        sections: __alloyId1560,
        templates: __alloyId1543,
        id: "storeListView",
        defaultItemTemplate: "template"
    });
    $.__views.store_list_container.add($.__views.storeListView);
    $.__views.filterLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "14dp"
        },
        text: Alloy.Globals.icon.filter,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        bottom: "5dp",
        right: "5%",
        width: "30dp",
        height: "30dp",
        color: "#fff",
        borderRadius: 20,
        backgroundColor: Alloy.Globals.labelTitleColor,
        visible: false,
        id: "filterLbl"
    });
    $.__views.store_list.add($.__views.filterLbl);
    openFilterList ? $.addListener($.__views.filterLbl, "click", openFilterList) : __defers["$.__views.filterLbl!click!openFilterList"] = true;
    $.__views.filterContatiner = Ti.UI.createView({
        backgroundColor: "#66231f20",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        visible: false,
        zIndex: 3,
        id: "filterContatiner"
    });
    $.__views.storeLocator.add($.__views.filterContatiner);
    $.__views.filterListContainer = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: "0dp",
        right: "5%",
        bottom: "5dp",
        layout: "vertical",
        id: "filterListContainer"
    });
    $.__views.filterContatiner.add($.__views.filterListContainer);
    $.__views.__alloyId1561 = Ti.UI.createLabel({
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        color: Alloy.Globals.labelTitleColor,
        font: {
            fontSize: "12dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        right: 0,
        top: "5dp",
        text: "ALL",
        id: "__alloyId1561"
    });
    $.__views.filterListContainer.add($.__views.__alloyId1561);
    $.__views.__alloyId1562 = Ti.UI.createLabel({
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        color: Alloy.Globals.labelTitleColor,
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        right: 0,
        top: "20dp",
        text: "EXCLUSIVE BRAND OUTLETS",
        id: "__alloyId1562"
    });
    $.__views.filterListContainer.add($.__views.__alloyId1562);
    $.__views.__alloyId1563 = Ti.UI.createLabel({
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        color: Alloy.Globals.labelTitleColor,
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        right: 0,
        top: "20dp",
        text: "FRANCHISES",
        id: "__alloyId1563"
    });
    $.__views.filterListContainer.add($.__views.__alloyId1563);
    $.__views.__alloyId1564 = Ti.UI.createLabel({
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        color: Alloy.Globals.labelTitleColor,
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        right: 0,
        top: "20dp",
        text: "DEALERS",
        id: "__alloyId1564"
    });
    $.__views.filterListContainer.add($.__views.__alloyId1564);
    $.__views.closeFilterLbl = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "12dp"
        },
        text: Alloy.Globals.icon.close,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: Alloy.Globals.labelTitleColor,
        color: "white",
        width: "30dp",
        height: "30dp",
        right: "5%",
        bottom: "5dp",
        borderRadius: 20,
        id: "closeFilterLbl"
    });
    $.__views.filterContatiner.add($.__views.closeFilterLbl);
    closeFilterList ? $.addListener($.__views.closeFilterLbl, "click", closeFilterList) : __defers["$.__views.closeFilterLbl!click!closeFilterList"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var Map = require("ti.map");
    var coord = Alloy.Globals.getCurrentLocation();
    var mountainView = Map.createAnnotation({
        latitude: coord.latitude,
        longitude: coord.longitude,
        title: "Current Location",
        subtitle: "Test",
        pincolor: Map.ANNOTATION_RED,
        myid: 1
    });
    var mapview = Map.createView({
        mapType: Map.NORMAL_TYPE,
        region: {
            latitude: coord.latitude,
            longitude: coord.longitude,
            latitudeDelta: .01,
            longitudeDelta: .01
        },
        animate: true,
        regionFit: true,
        userLocation: true,
        annotations: [ mountainView ]
    });
    $.map_container.add(mapview);
    __defers["$.__views.storeLocator!android:back!goToBack"] && $.addListener($.__views.storeLocator, "android:back", goToBack);
    __defers["$.__views.searchStore!click!enableSearch"] && $.addListener($.__views.searchStore, "click", enableSearch);
    __defers["$.__views.storeDetails!click!toggelDetailList"] && $.addListener($.__views.storeDetails, "click", toggelDetailList);
    __defers["$.__views.filterLbl!click!openFilterList"] && $.addListener($.__views.filterLbl, "click", openFilterList);
    __defers["$.__views.closeFilterLbl!click!closeFilterList"] && $.addListener($.__views.closeFilterLbl, "click", closeFilterList);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;