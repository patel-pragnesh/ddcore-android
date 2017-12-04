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
        getAppointmentList();
    }
    function updateAppointmentList(data) {
        if (1 == data.count) {
            $.appointmentSection.setItems([]);
            getAppointmentList();
            Ti.App.removeEventListener("refreshAppointmentList", updateAppointmentList);
            Ti.App.addEventListener("refreshAppointmentList", updateAppointmentList);
        }
    }
    function getAppointmentList() {
        showFullLoader(args.container);
        var requestMethod = Alloy.Globals.commonUrl.getAllBookAppointment;
        var requestParam = {};
        Alloy.Globals.webServiceCall(requestMethod, requestParam, getAllBookAppointmentSuccessCallback, getAllBookAppointmentErrorCallback, "POST", args.mainWindow);
    }
    function getAllBookAppointmentSuccessCallback(response) {
        var responseData = response;
        if (0 === responseData.data.appointment_list.length) args.loadDefaultScreen("appointment"); else try {
            var _addressList = responseData.data.appointment_list;
            var _data = [];
            _.each(_addressList, function(value, k) {
                var date = moment(value.appointment_date).format("DD MMMM YYYY").toUpperCase();
                var slot;
                slot = "0" === value.time_slot ? "MORNING" : "1" === value.time_slot ? "AFTERNOON" : "2" === value.time_slot ? "EVENING" : "MORNING";
                var timeSlot = date + "  " + slot;
                var attr = Ti.UI.createAttributedString({
                    text: timeSlot,
                    attributes: [ {
                        type: Ti.UI.ATTRIBUTE_FONT,
                        value: {
                            fontFamily: "futura_lt_bt_light-webfont"
                        },
                        range: [ timeSlot.indexOf(slot), slot.length ]
                    }, {
                        type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
                        value: value.is_valid ? "#E2E2E2" : "#333333",
                        range: [ timeSlot.indexOf(slot), slot.length ]
                    } ]
                });
                var _address = "";
                value.address && (_address = value.address.replace(/(\r|\n|\t)/g, ""));
                _data.push({
                    appointmentSlot: {
                        attributedString: attr,
                        color: value.is_valid ? "#E2E2E2" : Alloy.Globals.labelTitleColor
                    },
                    callIcon: {
                        contactNo: value.contact_number,
                        color: value.is_valid ? "#E2E2E2" : "#555555"
                    },
                    deleteIcon: {
                        appoinment_id: value.appoinment_id,
                        color: value.is_valid ? "#E2E2E2" : "#555555",
                        visible: null != value.store_name
                    },
                    storeName: {
                        text: null != value.store_name ? value.store_name + " - " + (value.contact_number[0] ? value.contact_number[0] : "") : "",
                        color: value.is_valid ? "#E2E2E2" : "#333333",
                        height: null != value.store_name ? Ti.UI.SIZE : "0"
                    },
                    address: {
                        text: _address,
                        color: value.is_valid ? "#E2E2E2" : "#555555",
                        top: null != value.store_name ? 10 : 0
                    },
                    noteLbl: {
                        text: "View Notes",
                        color: value.is_valid ? "#E2E2E2" : Alloy.Globals.labelTitleColor,
                        visible: "" != value.note,
                        touchEnabled: "" != value.note,
                        height: "" == value.note ? "0" : Ti.UI.SIZE
                    },
                    note: {
                        text: value.note,
                        color: value.is_valid ? "#E2E2E2" : "#555555"
                    }
                });
            });
            $.appointmentSection.appendItems(_data);
        } catch (exp) {
            alert("Something went wrong");
        }
        hideLoader();
        hideFullLoader();
    }
    function getAllBookAppointmentErrorCallback(response) {
        showAlert(args.mainWindow, response.message);
        hideLoader();
        hideFullLoader();
    }
    function deleteAppointment(e) {
        args.androidBack();
        var requestMethod = Alloy.Globals.commonUrl.cancelAppointment;
        var param = {
            appointment_id: e.appoinment_id
        };
        var requestParam = JSON.stringify(param);
        args.mainWindow.add(Alloy.createController("confirmation", {
            requestMethod: requestMethod,
            requestParam: requestParam,
            successCallback: cancelAppointmentSuccessCallback,
            errorCallback: cancelAppointmentErrorCallback,
            windowContainer: args.mainWindow,
            message: "Are you sure you want to delete this appointment ?",
            productName: "",
            showLoader: showTransparentLoader
        }).getView());
    }
    function cancelAppointmentSuccessCallback(response) {
        args.closeAndroidBack();
        $.appointmentSection.deleteItemsAt(itemIndex, 1, {
            animated: true
        });
        Alloy.Globals.appointmentCount = response.data.appointment_count;
        args.refreshCount(5);
        deleteRow = null;
        _border = null;
        hideLoader();
        hideTransparentLoader();
    }
    function cancelAppointmentErrorCallback(e) {
        hideLoader();
        hideTransparentLoader();
        showAlert(args.mainWindow, e.message);
        args.closeAndroidBack();
    }
    function callAppointment(e) {
        var contantNo = Alloy.Globals.customerCareNo;
        Ti.Platform.openURL("tel:" + contantNo);
    }
    function appointmentListClick(e) {
        var bindId = e.bindId;
        var index = e.itemIndex;
        itemIndex = index;
        var currentItem, listItem;
        if (bindId) {
            var bind = bindId;
            currentItem = e.section.items[index];
            listItem = currentItem[bind];
        }
        if ("deleteIcon" == bindId) deleteAppointment(listItem); else if ("callIcon" == bindId) callAppointment(); else if ("noteLbl" == bindId) {
            var note = currentItem["note"];
            if ("View Notes" === listItem.text) {
                note.height = Ti.UI.SIZE;
                listItem.text = "Hide Notes";
            } else {
                listItem.text = "View Notes";
                note.height = 0;
            }
            e.section.updateItemAt(itemIndex, currentItem);
        }
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "myappoinments";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    var __alloyId1019 = {};
    var __alloyId1022 = [];
    var __alloyId1024 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId1025 = [];
            var __alloyId1027 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId1028 = [];
                    var __alloyId1029 = {
                        type: "Ti.UI.Label",
                        bindId: "appointmentSlot",
                        properties: {
                            top: 0,
                            color: Alloy.Globals.labelTitleColor,
                            font: {
                                fontFamily: "futura-hv-bt-heavy",
                                fontSize: "12dp"
                            },
                            left: "3%",
                            bindId: "appointmentSlot"
                        }
                    };
                    __alloyId1028.push(__alloyId1029);
                    var __alloyId1031 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId1032 = [];
                            var __alloyId1034 = {
                                type: "Ti.UI.Label",
                                bindId: "callIcon",
                                properties: {
                                    font: {
                                        fontFamily: "icomoon",
                                        fontSize: "16dp"
                                    },
                                    color: "#555555",
                                    text: Alloy.Globals.icon.call,
                                    top: 1,
                                    bindId: "callIcon",
                                    right: "20dp",
                                    left: 0
                                }
                            };
                            __alloyId1032.push(__alloyId1034);
                            var __alloyId1036 = {
                                type: "Ti.UI.Label",
                                bindId: "deleteIcon",
                                properties: {
                                    font: {
                                        fontFamily: "icomoon",
                                        fontSize: "16dp"
                                    },
                                    right: "1%",
                                    color: "#555555",
                                    text: Alloy.Globals.icon.deleteIcon,
                                    top: 1,
                                    bindId: "deleteIcon"
                                }
                            };
                            __alloyId1032.push(__alloyId1036);
                            return __alloyId1032;
                        }(),
                        properties: {
                            width: Titanium.UI.SIZE,
                            height: Titanium.UI.SIZE,
                            top: 0,
                            right: "5%",
                            layout: "horizontal",
                            bottom: "1dp"
                        }
                    };
                    __alloyId1028.push(__alloyId1031);
                    return __alloyId1028;
                }(),
                properties: {
                    width: Titanium.UI.FILL,
                    height: Titanium.UI.SIZE,
                    left: "0%",
                    borderColor: "transparent"
                }
            };
            __alloyId1025.push(__alloyId1027);
            var __alloyId1037 = {
                type: "Ti.UI.Label",
                bindId: "storeName",
                properties: {
                    top: 0,
                    left: "3%",
                    color: "#333333",
                    font: {
                        fontFamily: "futura_medium_bt-webfont",
                        fontSize: "10dp"
                    },
                    bindId: "storeName"
                }
            };
            __alloyId1025.push(__alloyId1037);
            var __alloyId1038 = {
                type: "Ti.UI.Label",
                bindId: "address",
                properties: {
                    height: Titanium.UI.SIZE,
                    top: 10,
                    left: "3%",
                    font: {
                        fontSize: "12dp",
                        fontFamily: "futura_lt_bt_light-webfont"
                    },
                    color: "#555555",
                    width: "80%",
                    wordWrap: true,
                    bindId: "address"
                }
            };
            __alloyId1025.push(__alloyId1038);
            var __alloyId1039 = {
                type: "Ti.UI.Label",
                bindId: "noteLbl",
                properties: {
                    color: Alloy.Globals.labelTitleColor,
                    top: 10,
                    font: {
                        fontFamily: "futura_lt_bt_light-webfont",
                        fontSize: "10dp"
                    },
                    left: "3%",
                    bindId: "noteLbl"
                }
            };
            __alloyId1025.push(__alloyId1039);
            var __alloyId1040 = {
                type: "Ti.UI.Label",
                bindId: "note",
                properties: {
                    top: 0,
                    height: "0",
                    width: "70%",
                    color: "#555555",
                    font: {
                        fontSize: "10dp"
                    },
                    left: "3%",
                    wordWrap: true,
                    visible: true,
                    bindId: "note"
                }
            };
            __alloyId1025.push(__alloyId1040);
            var __alloyId1042 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#555555",
                    height: "1px",
                    width: "95%",
                    left: "5dp",
                    right: "0%",
                    zIndex: 0
                }
            };
            __alloyId1025.push(__alloyId1042);
            var __alloyId1044 = {
                type: "Ti.UI.Label",
                properties: {
                    height: "10dp"
                }
            };
            __alloyId1025.push(__alloyId1044);
            return __alloyId1025;
        }(),
        properties: {
            width: Titanium.UI.FILL,
            height: Titanium.UI.SIZE,
            top: 5,
            layout: "vertical"
        }
    };
    __alloyId1022.push(__alloyId1024);
    var __alloyId1021 = {
        properties: {
            top: 0,
            height: Ti.UI.SIZE,
            backgroundColor: "transparent",
            width: Ti.UI.FILL,
            name: "appointmentTemplate",
            selectionStyle: "none"
        },
        childTemplates: __alloyId1022
    };
    __alloyId1019["appointmentTemplate"] = __alloyId1021;
    $.__views.appointmentSection = Ti.UI.createListSection({
        id: "appointmentSection"
    });
    var __alloyId1046 = [];
    __alloyId1046.push($.__views.appointmentSection);
    $.__views.myappoinments = Ti.UI.createListView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        sections: __alloyId1046,
        templates: __alloyId1019,
        id: "myappoinments",
        top: 10,
        defaultItemTemplate: "appointmentTemplate",
        left: "5dp",
        right: "5dp"
    });
    $.__views.myappoinments && $.addTopLevelView($.__views.myappoinments);
    appointmentListClick ? $.addListener($.__views.myappoinments, "itemclick", appointmentListClick) : __defers["$.__views.myappoinments!itemclick!appointmentListClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var deleteRow = null, _border = null, itemIndex = null;
    init();
    Ti.App.removeEventListener("refreshAppointmentList", updateAppointmentList);
    Ti.App.addEventListener("refreshAppointmentList", updateAppointmentList);
    __defers["$.__views.myappoinments!itemclick!appointmentListClick"] && $.addListener($.__views.myappoinments, "itemclick", appointmentListClick);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;