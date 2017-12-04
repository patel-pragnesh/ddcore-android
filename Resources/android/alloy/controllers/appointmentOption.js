function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function closeAndroidBack() {}
    function init() {
        if ("inHome" == args.option) {
            $.listSection.setItems([]);
            $.screenName.setText("AT HOME");
            getAddressList();
        } else {
            $.addNewAddress.setVisible(false);
            $.addNewAddress.setTouchEnabled(false);
            $.listSection.setItems([]);
            null != Alloy.Globals.getCurrentLocation() && getStoreList(Alloy.Globals.getCurrentLocation());
        }
    }
    function returnAddress(data) {
        $.addNewAddress.setVisible(true);
        $.addNewAddress.setTouchEnabled(true);
        $.book_appointment_btn.setVisible(true);
        $.book_appointment_btn.setTouchEnabled(true);
        if (null != selectedRow || void 0 != selectedRow) {
            selectedRow.visible = false;
            $.listSection.updateItemAt(selectedRowIndex, currentRow);
        }
        setAddressList(data, true);
        $.appointmentOption.scrollTo(0, 0);
    }
    function checky(e) {
        $.appointmentOption.contentOffset.y;
    }
    function openAddAddress(e) {
        if ("addNewAddress" == e.source.id) {
            var j = 1;
            var k = parseInt((Ti.Platform.displayCaps.platformHeight + _height + 140) / 10);
            var interval = setInterval(function() {
                if (10 == j) {
                    j = 1;
                    clearInterval(interval);
                } else {
                    $.appointmentOption.scrollTo(0, k * j);
                    j++;
                }
            }, 25);
            $.addNewAddress.setVisible(false);
            $.addNewAddress.setTouchEnabled(false);
            $.book_appointment_btn.setVisible(false);
            $.book_appointment_btn.setTouchEnabled(false);
        }
    }
    function closeAppointment() {
        Alloy.Globals.isAppointmentOption = false;
        $.appointmentOption.hide({
            animated: true
        });
        args.mainWindow.removeEventListener("android:back", closeAppointment);
        args.updateSelectOption(currentRow, args.option);
        setTimeout(function() {
            var _parent = $.appointmentOption.parent;
            (null != _parent || void 0 != _parent) && _parent.remove($.appointmentOption);
            $.appointmentOption.removeAllChildren();
        }, 500);
        $.removeListener();
        $.destroy();
    }
    function getAddressList() {
        showLoader(args.mainWindow);
        var requestMethod = Alloy.Globals.commonUrl.viewAddress;
        Alloy.Globals.webServiceCall(requestMethod, {}, getAddressListSuccessCallback, getAddressListErrorCallback, "POST", args.mainWindow);
    }
    function getAddressListSuccessCallback(response) {
        if (0 == response.data.addresses.length) {
            showAlert($.appointmentOption, "No Address found");
            $.book_appointment_btn.setVisible(false);
            $.book_appointment_btn.setTouchEnabled(false);
        } else setAddressList(response);
        hideLoader();
    }
    function getAddressListErrorCallback(response) {
        showAlert(args.mainWindow, response.message);
        hideLoader();
    }
    function setAddressList(data, flag) {
        try {
            var addressList = data.data.addresses;
            var listData = [];
            _.each(addressList, function(value, k) {
                var addressText = (value.street1 || "") + " " + (value.street2 || "") + " " + ((value.city || "") + " - " + (value.pincode || "")) + " " + (value.state || "");
                listData.push({
                    headerTitle: {
                        text: (value.firstname + " " + value.lastname).toUpperCase(),
                        color: Alloy.Globals.labelTitleColor
                    },
                    locationKm: {
                        text: ""
                    },
                    subTitle: {
                        text: value.mobile || ""
                    },
                    address: {
                        text: addressText.capitalize()
                    },
                    getDirection: {
                        text: ""
                    },
                    isSelected: {
                        store_name: "",
                        address: addressText,
                        contact_number: value.mobile || "",
                        visible: !!flag
                    }
                });
            });
            $.listSection.appendItems(listData);
            if (flag) {
                var index = $.listSection.getItems().length;
                index = parseInt(index) - 1;
                pitemSection = $.listSection.items[index];
                selectedRow = pitemSection["isSelected"];
                currentRow = pitemSection;
                selectedRowIndex = index;
                $.appointListContainer.scrollToItem(0, index);
            }
        } catch (exp) {
            Ti.API.info("address list expection-->" + exp.message);
        }
    }
    function selectList(e) {
        var bind, a, index;
        if (e.bindId) {
            bind = e.bindId;
            index = e.itemIndex;
            a = e.section.items[index];
        }
        if ("getDirection" == e.bindId) {
            var openUrlDirection = "http://maps.google.com/?q=" + a[bind].latitude + "," + a[bind].longitude;
            Ti.Platform.openURL(openUrlDirection);
        } else {
            if (null != selectedRow || void 0 != selectedRow) {
                selectedRow.visible = false;
                e.section.updateItemAt(selectedRowIndex, currentRow);
            }
            pindex = e.itemIndex;
            pitemSection = e.section.items[pindex];
            pitemSection["isSelected"].visible = true;
            selectedRow = pitemSection["isSelected"];
            currentRow = pitemSection;
            selectedRowIndex = pindex;
            e.section.updateItemAt(e.itemIndex, pitemSection);
        }
    }
    function getStoreList(coordinate) {
        showLoader(args.mainWindow);
        var requestMethod = Alloy.Globals.commonUrl.storeList;
        var param = {
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
            filter: "All",
            storetype: ""
        };
        var requestParam = JSON.stringify(param);
        Alloy.Globals.webServiceCall(requestMethod, requestParam, getStoreListSuccessCallback, getStoreListErrorCallback, "POST", args.mainWindow);
    }
    function getStoreListSuccessCallback(response) {
        hideLoader();
        0 != response.data.store_list.length ? setStoreList(response) : showAlert(args.mainWindow, "No Store Avaliable near your location");
    }
    function getStoreListErrorCallback(response) {
        hideLoader();
        showAlert(args.mainWindow, response.message);
    }
    function setStoreList(response) {
        var storeList = response.data.store_list;
        var listData = [];
        _.each(storeList, function(value, k) {
            listData.push({
                headerTitle: {
                    text: value.store_name.toUpperCase()
                },
                locationKm: {
                    text: value.distance_in_km
                },
                subTitle: {
                    text: "EBO" == value.merchant_type ? "EXCLUSIVE" : ""
                },
                address: {
                    text: (value.store_address || "").capitalize()
                },
                getDirection: {
                    latitude: value.latitude,
                    longitude: value.longitude,
                    store_name: value.store_name,
                    store_address: value.store_address,
                    merchant_type: value.merchant_type
                },
                isSelected: {
                    visible: false,
                    store_name: value.store_name,
                    address: value.store_address,
                    contact_number: value.store_contact
                }
            });
        });
        $.listSection.appendItems(listData);
    }
    function selectOption() {
        if (null != selectedRow || void 0 != selectedRow) {
            args.mainWindow.removeEventListener("android:back", closeAppointment);
            args.updateSelectOption(currentRow, args.option);
            closeAppointment();
        } else showAlert(args.mainWindow, "Please select a address");
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "appointmentOption";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.appointmentOption = Ti.UI.createScrollView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        backgroundColor: "#231f20",
        scrollType: "vertical",
        zIndex: 15,
        id: "appointmentOption",
        scrollingEnabled: false
    });
    $.__views.appointmentOption && $.addTopLevelView($.__views.appointmentOption);
    checky ? $.addListener($.__views.appointmentOption, "scroll", checky) : __defers["$.__views.appointmentOption!scroll!checky"] = true;
    openAddAddress ? $.addListener($.__views.appointmentOption, "click", openAddAddress) : __defers["$.__views.appointmentOption!click!openAddAddress"] = true;
    $.__views.listContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        id: "listContainer",
        left: "0dp",
        top: "0dp"
    });
    $.__views.appointmentOption.add($.__views.listContainer);
    $.__views.headerContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        top: "5dp",
        left: "0dp",
        height: "53dp",
        id: "headerContainer"
    });
    $.__views.listContainer.add($.__views.headerContainer);
    $.__views.screenName = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "18dp"
        },
        left: "20dp",
        top: "5dp",
        color: "#fff",
        text: "IN STORE",
        id: "screenName"
    });
    $.__views.headerContainer.add($.__views.screenName);
    $.__views.close_btn = Ti.UI.createLabel({
        width: "20dp",
        height: "20dp",
        font: {
            fontSize: "20dp",
            fontFamily: "icomoon"
        },
        right: "5%",
        top: "5dp",
        color: "#fff",
        text: Alloy.Globals.icon.close,
        id: "close_btn"
    });
    $.__views.headerContainer.add($.__views.close_btn);
    closeAppointment ? $.addListener($.__views.close_btn, "click", closeAppointment) : __defers["$.__views.close_btn!click!closeAppointment"] = true;
    var __alloyId250 = {};
    var __alloyId253 = [];
    var __alloyId255 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId256 = [];
            var __alloyId257 = {
                type: "Ti.UI.Label",
                bindId: "isSelected",
                properties: {
                    font: {
                        fontFamily: "icomoon",
                        fontSize: "12dp"
                    },
                    text: Alloy.Globals.icon.tick,
                    color: Alloy.Globals.labelTitleColor,
                    left: "10dp",
                    top: "5dp",
                    visible: false,
                    bindId: "isSelected"
                }
            };
            __alloyId256.push(__alloyId257);
            var __alloyId258 = {
                type: "Ti.UI.Label",
                bindId: "headerTitle",
                properties: {
                    font: {
                        fontFamily: "futura-hv-bt-heavy",
                        fontSize: "12dp"
                    },
                    left: "40dp",
                    top: "0",
                    color: "#fff",
                    height: "12dp",
                    bindId: "headerTitle"
                }
            };
            __alloyId256.push(__alloyId258);
            var __alloyId259 = {
                type: "Ti.UI.Label",
                bindId: "locationKm",
                properties: {
                    font: {
                        fontFamily: "futura_medium_bt-webfont",
                        fontSize: "12dp"
                    },
                    color: "#a0a0a0",
                    top: "0",
                    right: "20dp",
                    bindId: "locationKm"
                }
            };
            __alloyId256.push(__alloyId259);
            return __alloyId256;
        }(),
        properties: {
            width: Titanium.UI.FILL,
            height: Titanium.UI.SIZE,
            top: "5dp",
            left: 0
        }
    };
    __alloyId253.push(__alloyId255);
    var __alloyId260 = {
        type: "Ti.UI.Label",
        bindId: "subTitle",
        properties: {
            font: {
                fontFamily: "futura_medium_bt-webfont",
                fontSize: "10dp"
            },
            color: "#fff",
            top: "5dp",
            left: "40dp",
            bindId: "subTitle"
        }
    };
    __alloyId253.push(__alloyId260);
    var __alloyId261 = {
        type: "Ti.UI.Label",
        bindId: "address",
        properties: {
            left: "40dp",
            color: "#a0a0a0",
            width: "70%",
            height: Titanium.UI.SIZE,
            maxLines: 4,
            wordWrap: true,
            font: {
                fontSize: "10dp"
            },
            bindId: "address"
        }
    };
    __alloyId253.push(__alloyId261);
    var __alloyId262 = {
        type: "Ti.UI.Label",
        bindId: "getDirection",
        properties: {
            color: Alloy.Globals.labelTitleColor,
            top: "5dp",
            left: "40dp",
            bottom: "15dp",
            font: {
                fontSize: "12dp"
            },
            text: "GET DIRECTIONS",
            bindId: "getDirection"
        }
    };
    __alloyId253.push(__alloyId262);
    var __alloyId252 = {
        properties: {
            height: Ti.UI.SIZE,
            backgroundColor: "transparent",
            width: Ti.UI.FILL,
            layout: "vertical",
            name: "appointOptionTemplate",
            selectionStyle: "none"
        },
        childTemplates: __alloyId253
    };
    __alloyId250["appointOptionTemplate"] = __alloyId252;
    $.__views.listSection = Ti.UI.createListSection({
        id: "listSection"
    });
    var __alloyId264 = [];
    __alloyId264.push($.__views.listSection);
    $.__views.appointListContainer = Ti.UI.createListView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        top: "55dp",
        left: "5dp",
        right: "5dp",
        scrollType: "vertical",
        bottom: "160dp",
        sections: __alloyId264,
        templates: __alloyId250,
        id: "appointListContainer",
        defaultItemTemplate: "appointOptionTemplate"
    });
    $.__views.listContainer.add($.__views.appointListContainer);
    selectList ? $.addListener($.__views.appointListContainer, "itemclick", selectList) : __defers["$.__views.appointListContainer!itemclick!selectList"] = true;
    $.__views.book_appointment_btn = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_medium_bt-webfont",
            fontSize: "16dp"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        width: "70%",
        height: "50dp",
        borderColor: "#7b7979",
        borderWidth: 1,
        color: "#fff",
        bottom: "75dp",
        text: "DONE",
        id: "book_appointment_btn"
    });
    $.__views.listContainer.add($.__views.book_appointment_btn);
    selectOption ? $.addListener($.__views.book_appointment_btn, "click", selectOption) : __defers["$.__views.book_appointment_btn!click!selectOption"] = true;
    $.__views.addNewAddress = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "14dp"
        },
        bottom: "40dp",
        height: "25dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        color: Alloy.Globals.labelTitleColor,
        text: "ADD NEW ADDRESS",
        id: "addNewAddress"
    });
    $.__views.listContainer.add($.__views.addNewAddress);
    $.__views.addAddressContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        bottom: "65dp",
        id: "addAddressContainer",
        left: "0dp"
    });
    $.__views.appointmentOption.add($.__views.addAddressContainer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = $.args;
    touchEffect.createTouchEffect($.close_btn, "#a6ffffff", "#fff");
    touchEffect.createTouchEffect($.book_appointment_btn, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.addNewAddress, "#a6e64e48", Alloy.Globals.labelTitleColor);
    args.mainWindow.removeEventListener("android:back", closeAppointment);
    args.mainWindow.addEventListener("android:back", closeAppointment);
    var currentRow, selectedRow = null, selectedRowIndex = 0;
    var _height = parseInt(Ti.Platform.displayCaps.platformHeight / 10);
    $.listContainer.height = parseInt(Ti.Platform.displayCaps.platformHeight / Ti.Platform.displayCaps.logicalDensityFactor);
    $.addAddressContainer.top = parseInt(Ti.Platform.displayCaps.platformHeight / Ti.Platform.displayCaps.logicalDensityFactor);
    var addAddress = Alloy.createController("addAddress", {
        isEdit: false,
        isClose: true,
        displayAddressFunction: returnAddress,
        closeFunction: closeAppointment,
        mainWindow: args.mainWindow,
        closeAndroidBack: closeAndroidBack
    }).getView();
    $.addAddressContainer.add(addAddress);
    addAddress.show();
    init();
    __defers["$.__views.appointmentOption!scroll!checky"] && $.addListener($.__views.appointmentOption, "scroll", checky);
    __defers["$.__views.appointmentOption!click!openAddAddress"] && $.addListener($.__views.appointmentOption, "click", openAddAddress);
    __defers["$.__views.close_btn!click!closeAppointment"] && $.addListener($.__views.close_btn, "click", closeAppointment);
    __defers["$.__views.appointListContainer!itemclick!selectList"] && $.addListener($.__views.appointListContainer, "itemclick", selectList);
    __defers["$.__views.book_appointment_btn!click!selectOption"] && $.addListener($.__views.book_appointment_btn, "click", selectOption);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;