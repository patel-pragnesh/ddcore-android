function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function closeBookappoinment() {
        if (!Alloy.Globals.isAppointmentOption) {
            Ti.API.info("into close function");
            Alloy.Globals.bookAppoinmentWindow = false;
            $.bookappoinment.hide({
                animated: true
            });
            setTimeout(function() {
                var _parent = $.bookappoinment.parent;
                (null != _parent || void 0 != _parent) && _parent.remove($.bookappoinment);
                $.bookappoinment.removeAllChildren();
            }, 500);
            if (args.isDashboard) ; else if (args.isMainWindow) "REQUEST" != $.book_appointment_btn.getText() && args.loadFirstAppointment(); else if (args.isEstimate) args.androidBack(); else {
                if ("REQUEST" != $.book_appointment_btn.getText()) {
                    Ti.App.fireEvent("refreshAppointmentList", {
                        count: 1
                    });
                    args.refreshCount(5);
                }
                if (void 0 != args.closeAndroidBack) {
                    args.closeAndroidBack();
                    args.mainWindow.removeEventListener("android:back", closeBookappoinment);
                }
            }
            $.removeListener();
            $.destroy();
        }
    }
    function bookAppoinment() {
        "REQUEST" === $.book_appointment_btn.getText() ? bookAppointmentWS() : "SAVE" === $.book_appointment_btn.getText() ? updateAppointmentWs() : closeBookappoinment();
    }
    function showPicker() {
        var picker = Alloy.createController("pickerTemplate", {
            day: $.date,
            month: $.month,
            year: $.year,
            setDate: false
        }).getView();
        $.bookappoinment.parent.parent.add(picker);
    }
    function toggelRadio(e) {
        var radioId = e.source.slot;
        if ("morning" === radioId) {
            $.morningRd.color = Alloy.Globals.labelTitleColor;
            $.afternoonRd.color = "#33ffffff";
            $.eveningRd.color = "#33ffffff";
            appointmentSlot = 0;
        } else if ("afternoon" === radioId) {
            $.morningRd.color = "#33ffffff";
            $.afternoonRd.color = Alloy.Globals.labelTitleColor;
            $.eveningRd.color = "#33ffffff";
            appointmentSlot = 1;
        } else {
            $.morningRd.color = "#33ffffff";
            $.afternoonRd.color = "#33ffffff";
            $.eveningRd.color = Alloy.Globals.labelTitleColor;
            appointmentSlot = 2;
        }
    }
    function showDropdownList() {
        if (args.isEstimate) ; else if ($.dropList.getVisible()) {
            var m = Ti.UI.create2DMatrix({
                rotate: 0
            });
            $.arrow.transform = m;
            $.arrow.setText(Alloy.Globals.icon.dropdownArrow);
            $.dropList.setHeight("0dp");
            $.dropList.setVisible(false);
        } else {
            var m = Ti.UI.create2DMatrix({
                rotate: 180
            });
            $.arrow.transform = m;
            $.dropList.setHeight(Ti.UI.SIZE);
            $.dropList.setVisible(true);
        }
    }
    function selectStoreOption(e) {
        var lblId = e.source.id;
        if (args.isDashboard) args.mainWindow.removeEventListener("android:back", closeBookappoinment); else if (args.isMainWindow) ; else if (args.isEstimate) args.mainWindow.removeEventListener("android:back", closeBookappoinment); else if (void 0 != args.androidBack) {
            args.androidBack();
            args.mainWindow.removeEventListener("android:back", closeBookappoinment);
        }
        if ("inHome" == lblId) {
            Alloy.Globals.isAppointmentOption = true;
            var appointmentOption = Alloy.createController("appointmentOption", {
                mainWindow: args.mainWindow,
                option: lblId,
                updateSelectOption: setOptionData
            }).getView();
            args.mainWindow.add(appointmentOption);
        } else {
            Alloy.Globals.isAppointmentOption = true;
            if (null != Alloy.Globals.getCurrentLocation()) {
                var appointmentOption = Alloy.createController("appointmentOption", {
                    mainWindow: args.mainWindow,
                    option: lblId,
                    updateSelectOption: setOptionData
                }).getView();
                args.mainWindow.add(appointmentOption);
            }
        }
    }
    function refreshPage() {
        if (args.isEdit) setEditAppointmentDetails(); else {
            $.date.setText("DAY");
            $.month.setText("MONTH");
            $.year.setText("YEAR");
            $.note_txt.setValue("");
            $.note_txt.blur();
            $.morningRd.setColor("#e64e48");
            appointmentSlot = 0;
            $.afternoonRd.setColor("#33ffffff");
            $.eveningRd.setColor("#33ffffff");
            $.dropdownSelectionList.setHeight("0dp");
            $.dropdownSelectionList.setVisible(false);
            $.dropdownSelectionList.setHeight("0dp");
            $.bookappoinment.setScrollingEnabled(true);
            $.dropdownSelectionList.removeAllChildren();
            $.selectionOptionContainer.setHeight("0dp");
            $.selectionOptionContainer.setVisible(false);
            if ($.dropList.getVisible()) {
                var m = Ti.UI.create2DMatrix({
                    rotate: 0
                });
                $.arrow.transform = m;
                $.dropList.setHeight("0dp");
                $.dropList.setVisible(false);
            }
            if (args.isEstimate) {
                var text = "SELECT ADDRESS";
                var attr = Ti.UI.createAttributedString({
                    text: text,
                    attributes: [ {
                        type: Titanium.UI.ATTRIBUTE_UNDERLINES_STYLE,
                        value: Titanium.UI.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
                        range: [ text.indexOf("SELECT ADDRESS"), "SELECT ADDRESS".length ]
                    } ]
                });
                $.selectStore_lbl.attributedString = attr;
            } else {
                $.selectStore_lbl.setText("SELECT OPTION");
                $.selectionOptionContainer.setHeight("0dp");
                $.selectionOptionContainer.setVisible(false);
            }
        }
    }
    function selectAddressList(e) {
        null != lastSelectedAddress.child && lastSelectedAddress.child.setVisible(false);
        var child = e.source.children[0];
        child.setVisible(true);
        lastSelectedAddress.child = child;
    }
    function selectAddress(e) {
        showDropdownList();
        var m = Ti.UI.create2DMatrix({
            rotate: 0
        });
        $.arrow.transform = m;
        $.dropList.setHeight("0dp");
        $.dropList.setVisible(false);
        if (null != lastSelectedAddress.child) {
            lastSelectedAddress.index = lastSelectedAddress.child.index;
            displayAppointmentOptionDetails("home");
        }
    }
    function addressListView(response, flag) {
        var addressList = response.data.addresses;
        var addressContainer1 = $.UI.create("ScrollView", {
            width: Ti.UI.FILL,
            height: "70%",
            left: "0dp",
            layout: "vertical"
        });
        var addressContainer2 = $.UI.create("View", {
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE,
            left: "0dp"
        });
        var doneLbl = $.UI.create("Label", {
            text: "DONE",
            color: "#fff",
            left: "10%",
            font: {
                fontSize: "14dp"
            }
        });
        addressContainer2.add(doneLbl);
        doneLbl.addEventListener("click", selectAddress);
        var addAddressLbl = $.UI.create("Label", {
            text: "Add New Address",
            color: "#fff",
            font: {
                fontSize: "14dp"
            },
            right: "10%"
        });
        addressContainer2.add(addAddressLbl);
        addAddressLbl.addEventListener("click", function() {
            var addAddress = Alloy.createController("addAddress", {
                isEdit: false,
                displayAddressFunction: addressListView
            }).getView();
            addAddress.zIndex = 12;
            args.mainWindow.add(addAddress);
            addAddress.show();
        });
        for (var i = 0; i < addressList.length; i++) {
            var storeContainer = $.UI.create("View", {
                width: Ti.UI.FILL,
                height: Ti.UI.SIZE,
                top: "5dp"
            });
            storeContainer.addEventListener("click", selectAddressList);
            var isSelected = $.UI.create("Label", {
                classes: "iconFont",
                id: "tick",
                text: Alloy.Globals.icon.tick,
                color: Alloy.Globals.labelTitleColor,
                font: {
                    fontSize: "12dp"
                },
                left: "5%",
                top: "20dp",
                visible: !(lastSelectedAddress.index !== i),
                touchEnabled: false,
                index: i
            });
            var userName = $.UI.create("Label", {
                id: "userName",
                classes: "fontHeavy",
                left: "10%",
                top: "10dp",
                text: addressList[i].firstname + " " + addressList[i].lastname,
                font: {
                    fontSize: "12dp"
                },
                color: Alloy.Globals.labelTitleColor,
                touchEnabled: false
            });
            var mobNumber = $.UI.create("Label", {
                id: "mobNumber",
                classes: "fontLight",
                color: "#fff",
                font: {
                    fontSize: "10dp"
                },
                left: "10%",
                top: "25dp",
                text: addressList[i].mobile,
                touchEnabled: false
            });
            var address = $.UI.create("Label", {
                id: "address",
                classes: "fontLight",
                color: "#a0a0a0",
                font: {
                    fontSize: "12dp"
                },
                left: "10%",
                top: "40dp",
                bottom: "10dp",
                wordWrap: true,
                width: "80%",
                text: (addressList[i].street1 || "") + ", " + (addressList[i].street2 || "") + ", " + (addressList[i].city || "") + "-" + (addressList[i].pincode || "") + "." + (addressList[i].state || ""),
                touchEnabled: false
            });
            isSelected.address = address.getText();
            isSelected.contact_number = mobNumber.getText();
            isSelected.store_name = "";
            storeContainer.add(isSelected);
            storeContainer.add(userName);
            storeContainer.add(mobNumber);
            storeContainer.add(address);
            if (flag) addressContainer1.add(storeContainer); else {
                var _addressContainer1 = $.dropdownSelectionList.getChildren()[0];
                _addressContainer1.add(storeContainer);
            }
        }
        if (flag) {
            $.dropdownSelectionList.add(addressContainer1);
            $.dropdownSelectionList.add(addressContainer2);
        }
        $.dropdownSelectionList.setScrollingEnabled(false);
    }
    function addressListSuccessCallback(response) {
        hideLoader();
        addressListView(response, true);
    }
    function addressListErrorCallback(response) {
        hideLoader();
        showAlert($.bookappoinment, response.message);
    }
    function displayAppointmentOptionDetails(textId) {
        "home" == textId ? $.selectStore_lbl.setText("AT HOME") : $.selectStore_lbl.setText("IN STORE");
        $.selectionOptionContainer.setHeight(Ti.UI.SIZE);
        $.selectionOptionContainer.setVisible(true);
    }
    function bookAppointmentWS() {
        if ("DAY" === $.date.getText()) showAlert(args.mainWindow, "Please select a date"); else if (null === appointmentSlot) showAlert(args.mainWindow, "Please select appointment slot"); else if ("SELECT OPTION" === $.selectStore_lbl.getText()) showAlert(args.mainWindow, "Please select an option"); else {
            showLoader(args.mainWindow);
            var requestMethod = Alloy.Globals.commonUrl.bookAppointment;
            var param = {
                appointment_date: moment($.date.date).format("YYYY-MM-DD"),
                time_slot: appointmentSlot,
                visit_location: "AT HOME" === $.selectStore_lbl.getText() ? "1" : "0",
                store_name: $.selectStore_lbl.optionData.store_name,
                address: $.selectStore_lbl.optionData.address,
                contact_number: $.selectStore_lbl.optionData.contact_number,
                note: $.note_txt.getValue()
            };
            var requestParam = JSON.stringify(param);
            Alloy.Globals.webServiceCall(requestMethod, requestParam, bookAppointmentSuccessCallback, bookAppointmentErrorCallback, "POST", $.bookappoinment);
        }
    }
    function bookAppointmentSuccessCallback(response) {
        hideLoader();
        Alloy.Globals.appointmentCount = response.data.appointment_count;
        $.book_appointment_btn.setText("OK");
        $.thankyou_container.setVisible(true);
        $.bookappoinment_container.setVisible(false);
        $.bookappoinment.setScrollingEnabled(false);
        $.close_btn.setVisible(false);
        $.close_btn.setTouchEnabled(false);
    }
    function bookAppointmentErrorCallback(response) {
        hideLoader();
        showAlert($.bookappoinment, response.message);
    }
    function hideDropdownList(e) {
        if ("bookappoinment" === e.source.id) {
            $.dropdownSelectionList.setHeight("0dp");
            $.dropdownSelectionList.setVisible(false);
            $.bookappoinment.setScrollingEnabled(true);
            $.dropdownSelectionList.removeAllChildren();
            $.selectionOptionContainer.setHeight("0dp");
            $.selectionOptionContainer.setVisible(false);
            if ($.dropList.getVisible()) {
                var m = Ti.UI.create2DMatrix({
                    rotate: 0
                });
                $.arrow.transform = m;
                $.dropList.setHeight("0dp");
                $.dropList.setVisible(false);
            }
            Ti.UI.Android.hideSoftKeyboard();
        }
        Ti.UI.Android.hideSoftKeyboard();
    }
    function setEditAppointmentDetails() {
        var addressList = args.addressList;
        var date = addressList.appointment_date.split("-");
        $.date.setText(date[2]);
        $.date.date = addressList.appointment_date;
        $.month.setText(date[1]);
        $.year.setText(date[0]);
        "0" === addressList.time_slot ? $.morning.fireEvent("click") : "1" === addressList.time_slot ? $.afternoon.fireEvent("click") : "2" === addressList.time_slot && $.evening.fireEvent("click");
        $.note_txt.setValue(addressList.note || "");
    }
    function updateAppointmentWs() {
        var requestMethod = Alloy.Globals.commonUrl.updatebookAppointment;
        var param = {
            appointment_id: args.addressList.appoinment_id,
            appointment_date: moment($.date.date).format("YYYY-MM-DD"),
            time_slot: appointmentSlot,
            note: $.note_txt.getValue()
        };
        var requestParam = JSON.stringify(param);
        showLoader($.bookappoinment);
        Alloy.Globals.webServiceCall(requestMethod, requestParam, bookAppointmentSuccessCallback, updateAppointmentErrorCallback, "POST", $.bookappoinment);
    }
    function updateAppointmentErrorCallback(response) {
        Ti.API.info("updateAppointmentError response--->" + JSON.stringify(response));
        hideLoader();
    }
    function setOptionData(data, option) {
        args.mainWindow.removeEventListener("android:back", closeBookappoinment);
        args.mainWindow.addEventListener("android:back", closeBookappoinment);
        if (void 0 != data || null != data) {
            $.dropList.setHeight("0dp");
            $.dropList.setVisible(false);
            $.locationName.setText(data.headerTitle.text);
            $.locationKm.setText(data.locationKm.text);
            $.exculsive_lbl.setText(data.subTitle.text);
            $.address_lbl.setText(data.address.text);
            "" == data.subTitle.text.toString().trim() && $.exculsive_lbl.setHeight(0);
            $.selectStore_lbl.optionData = data.isSelected;
            $.selectionOptionContainer.setHeight(Ti.UI.SIZE);
            $.selectionOptionContainer.setVisible(true);
            if ("inHome" == option) {
                args.isEstimate || $.selectStore_lbl.setText("AT HOME");
                var m = Ti.UI.create2DMatrix({
                    rotate: 0
                });
                $.arrow.transform = m;
            } else {
                $.selectStore_lbl.setText("IN STORE");
                var m = Ti.UI.create2DMatrix({
                    rotate: 0
                });
                $.arrow.transform = m;
            }
        }
        Alloy.Globals.isAppointmentOption = false;
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "bookappoinment";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.bookappoinment = Ti.UI.createScrollView({
        width: "100%",
        height: "100%",
        backgroundColor: "#231f20",
        zIndex: 11,
        scrollType: "vertical",
        id: "bookappoinment",
        layout: "vertical"
    });
    $.__views.bookappoinment && $.addTopLevelView($.__views.bookappoinment);
    hideDropdownList ? $.addListener($.__views.bookappoinment, "touchstart", hideDropdownList) : __defers["$.__views.bookappoinment!touchstart!hideDropdownList"] = true;
    $.__views.bookappoinment_container = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "bookappoinment_container",
        layout: "vertical",
        visible: true
    });
    $.__views.bookappoinment.add($.__views.bookappoinment_container);
    $.__views.__alloyId285 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: "53dp",
        top: "10dp",
        left: 0,
        id: "__alloyId285"
    });
    $.__views.bookappoinment_container.add($.__views.__alloyId285);
    $.__views.screenName = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "18dp"
        },
        left: "5%",
        top: "0dp",
        text: "REQUEST AN APPOINTMENT",
        id: "screenName"
    });
    $.__views.__alloyId285.add($.__views.screenName);
    $.__views.refresh_btn = Ti.UI.createLabel({
        color: "#fff",
        widht: "20dp",
        height: "20dp",
        font: {
            fontSize: "20dp",
            fontFamily: "icomoon"
        },
        right: "15%",
        top: "0dp",
        text: Alloy.Globals.icon.refresh,
        id: "refresh_btn"
    });
    $.__views.__alloyId285.add($.__views.refresh_btn);
    refreshPage ? $.addListener($.__views.refresh_btn, "click", refreshPage) : __defers["$.__views.refresh_btn!click!refreshPage"] = true;
    $.__views.close_btn = Ti.UI.createLabel({
        color: "#fff",
        width: "20dp",
        height: "20dp",
        font: {
            fontSize: "20dp",
            fontFamily: "icomoon"
        },
        right: "5%",
        top: "0dp",
        text: Alloy.Globals.icon.close,
        id: "close_btn"
    });
    $.__views.__alloyId285.add($.__views.close_btn);
    closeBookappoinment ? $.addListener($.__views.close_btn, "click", closeBookappoinment) : __defers["$.__views.close_btn!click!closeBookappoinment"] = true;
    $.__views.date_container = Ti.UI.createView({
        borderColor: "#514f50",
        borderWidth: 1,
        width: "102%",
        height: "50dp",
        left: "-1%",
        top: "10dp",
        id: "date_container",
        layout: "horizontal"
    });
    $.__views.bookappoinment_container.add($.__views.date_container);
    $.__views.__alloyId286 = Ti.UI.createView({
        height: Titanium.UI.FILL,
        top: "5%",
        width: "30%",
        left: "1%",
        id: "__alloyId286"
    });
    $.__views.date_container.add($.__views.__alloyId286);
    showPicker ? $.addListener($.__views.__alloyId286, "click", showPicker) : __defers["$.__views.__alloyId286!click!showPicker"] = true;
    $.__views.date = Ti.UI.createLabel({
        color: Alloy.Globals.labelTitleColor,
        font: {
            fontSize: "10dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        text: "DAY",
        id: "date",
        left: "20dp"
    });
    $.__views.__alloyId286.add($.__views.date);
    $.__views.icon1 = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontFamily: "icomoon",
            fontSize: "6dp"
        },
        text: Alloy.Globals.icon.dropdownArrow,
        right: "5%",
        id: "icon1"
    });
    $.__views.__alloyId286.add($.__views.icon1);
    $.__views.__alloyId287 = Ti.UI.createView({
        width: "2px",
        height: "30dp",
        backgroundColor: "#514f50",
        left: "2%",
        top: "10dp",
        id: "__alloyId287"
    });
    $.__views.date_container.add($.__views.__alloyId287);
    $.__views.__alloyId288 = Ti.UI.createView({
        height: Titanium.UI.FILL,
        top: "5%",
        width: "30%",
        left: "1%",
        id: "__alloyId288"
    });
    $.__views.date_container.add($.__views.__alloyId288);
    showPicker ? $.addListener($.__views.__alloyId288, "click", showPicker) : __defers["$.__views.__alloyId288!click!showPicker"] = true;
    $.__views.month = Ti.UI.createLabel({
        color: Alloy.Globals.labelTitleColor,
        font: {
            fontSize: "10dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        text: "MONTH",
        id: "month",
        left: "20dp"
    });
    $.__views.__alloyId288.add($.__views.month);
    $.__views.icon2 = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontFamily: "icomoon",
            fontSize: "6dp"
        },
        text: Alloy.Globals.icon.dropdownArrow,
        right: "5%",
        id: "icon2"
    });
    $.__views.__alloyId288.add($.__views.icon2);
    $.__views.__alloyId289 = Ti.UI.createView({
        width: "2px",
        height: "30dp",
        backgroundColor: "#514f50",
        left: "2%",
        top: "10dp",
        id: "__alloyId289"
    });
    $.__views.date_container.add($.__views.__alloyId289);
    $.__views.__alloyId290 = Ti.UI.createView({
        height: Titanium.UI.FILL,
        top: "5%",
        width: "30%",
        left: "1%",
        id: "__alloyId290"
    });
    $.__views.date_container.add($.__views.__alloyId290);
    showPicker ? $.addListener($.__views.__alloyId290, "click", showPicker) : __defers["$.__views.__alloyId290!click!showPicker"] = true;
    $.__views.year = Ti.UI.createLabel({
        color: Alloy.Globals.labelTitleColor,
        font: {
            fontSize: "10dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        text: "YEAR",
        id: "year",
        left: "20dp"
    });
    $.__views.__alloyId290.add($.__views.year);
    $.__views.icon3 = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontFamily: "icomoon",
            fontSize: "6dp"
        },
        text: Alloy.Globals.icon.dropdownArrow,
        right: "5%",
        id: "icon3"
    });
    $.__views.__alloyId290.add($.__views.icon3);
    $.__views.__alloyId291 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "10dp",
        left: 0,
        layout: "vertical",
        id: "__alloyId291"
    });
    $.__views.bookappoinment_container.add($.__views.__alloyId291);
    $.__views.selectTimeSlot_lbl = Ti.UI.createLabel({
        color: Alloy.Globals.labelTitleColor,
        font: {
            fontFamily: "futura-hv-bt-heavy",
            fontSize: "10dp"
        },
        top: "0",
        left: "5%",
        text: "SELECT TIME SLOT",
        id: "selectTimeSlot_lbl"
    });
    $.__views.__alloyId291.add($.__views.selectTimeSlot_lbl);
    $.__views.morning = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        id: "morning",
        slot: "morning",
        top: "20dp",
        left: "5%",
        layout: "horizontal"
    });
    $.__views.__alloyId291.add($.__views.morning);
    toggelRadio ? $.addListener($.__views.morning, "click", toggelRadio) : __defers["$.__views.morning!click!toggelRadio"] = true;
    $.__views.morningRd = Ti.UI.createLabel({
        color: "#e64e48",
        font: {
            fontFamily: "icomoon",
            fontSize: "14dp"
        },
        text: Alloy.Globals.icon.radio,
        slot: "morning",
        id: "morningRd",
        right: "5%"
    });
    $.__views.morning.add($.__views.morningRd);
    $.__views.__alloyId292 = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        text: "MORNING (09.00 AM - 12.00 PM)",
        slot: "morning",
        id: "__alloyId292"
    });
    $.__views.morning.add($.__views.__alloyId292);
    $.__views.afternoon = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        id: "afternoon",
        slot: "afternoon",
        top: "20dp",
        left: "5%",
        layout: "horizontal"
    });
    $.__views.__alloyId291.add($.__views.afternoon);
    toggelRadio ? $.addListener($.__views.afternoon, "click", toggelRadio) : __defers["$.__views.afternoon!click!toggelRadio"] = true;
    $.__views.afternoonRd = Ti.UI.createLabel({
        color: "#33ffffff",
        font: {
            fontFamily: "icomoon",
            fontSize: "14dp"
        },
        text: Alloy.Globals.icon.radio,
        slot: "afternoon",
        id: "afternoonRd",
        right: "5%"
    });
    $.__views.afternoon.add($.__views.afternoonRd);
    $.__views.__alloyId293 = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        text: "AFTERNOON (12.00 PM - 06.00 PM)",
        slot: "afternoon",
        id: "__alloyId293"
    });
    $.__views.afternoon.add($.__views.__alloyId293);
    $.__views.evening = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        id: "evening",
        slot: "evening",
        top: "20dp",
        left: "5%",
        layout: "horizontal"
    });
    $.__views.__alloyId291.add($.__views.evening);
    toggelRadio ? $.addListener($.__views.evening, "click", toggelRadio) : __defers["$.__views.evening!click!toggelRadio"] = true;
    $.__views.eveningRd = Ti.UI.createLabel({
        color: "#33ffffff",
        font: {
            fontFamily: "icomoon",
            fontSize: "14dp"
        },
        text: Alloy.Globals.icon.radio,
        slot: "evening",
        id: "eveningRd",
        right: "5%"
    });
    $.__views.evening.add($.__views.eveningRd);
    $.__views.__alloyId294 = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        text: "EVENING (06.00 PM - 09.00 PM)",
        slot: "evening",
        id: "__alloyId294"
    });
    $.__views.evening.add($.__views.__alloyId294);
    $.__views.selectOption = Ti.UI.createView({
        borderColor: "#514f50",
        borderWidth: 1,
        width: "102%",
        height: "50dp",
        left: "-1%",
        top: "30dp",
        id: "selectOption"
    });
    $.__views.__alloyId291.add($.__views.selectOption);
    showDropdownList ? $.addListener($.__views.selectOption, "click", showDropdownList) : __defers["$.__views.selectOption!click!showDropdownList"] = true;
    $.__views.selectStore_lbl = Ti.UI.createLabel({
        color: Alloy.Globals.labelTitleColor,
        font: {
            fontFamily: "futura-hv-bt-heavy",
            fontSize: "10dp"
        },
        left: "5%",
        text: "SELECT OPTION",
        id: "selectStore_lbl"
    });
    $.__views.selectOption.add($.__views.selectStore_lbl);
    $.__views.arrow = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontFamily: "icomoon",
            fontSize: "6dp"
        },
        text: Alloy.Globals.icon.dropdownArrow,
        id: "arrow",
        right: "5%"
    });
    $.__views.selectOption.add($.__views.arrow);
    $.__views.dropList = Ti.UI.createView({
        width: Titanium.UI.FILL,
        backgroundColor: "transparent",
        borderColor: "#33ffffff",
        height: "0dp",
        top: "0",
        layout: "vertical",
        visible: false,
        id: "dropList"
    });
    $.__views.__alloyId291.add($.__views.dropList);
    $.__views.inStore = Ti.UI.createLabel({
        color: "#fff",
        width: Titanium.UI.FILL,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        left: "5%",
        top: "10dp",
        text: "IN STORE",
        id: "inStore"
    });
    $.__views.dropList.add($.__views.inStore);
    selectStoreOption ? $.addListener($.__views.inStore, "click", selectStoreOption) : __defers["$.__views.inStore!click!selectStoreOption"] = true;
    $.__views.inHome = Ti.UI.createLabel({
        color: "#fff",
        width: Titanium.UI.FILL,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        left: "5%",
        top: "10dp",
        text: "AT HOME",
        id: "inHome",
        bottom: "10dp"
    });
    $.__views.dropList.add($.__views.inHome);
    selectStoreOption ? $.addListener($.__views.inHome, "click", selectStoreOption) : __defers["$.__views.inHome!click!selectStoreOption"] = true;
    $.__views.selectionOptionContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        layout: "vertical",
        id: "selectionOptionContainer",
        height: 0,
        visible: true,
        top: 0,
        left: 0
    });
    $.__views.__alloyId291.add($.__views.selectionOptionContainer);
    $.__views.__alloyId295 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "5dp",
        left: 0,
        id: "__alloyId295"
    });
    $.__views.selectionOptionContainer.add($.__views.__alloyId295);
    $.__views.locationName = Ti.UI.createLabel({
        color: Alloy.Globals.labelTitleColor,
        font: {
            fontFamily: "futura-hv-bt-heavy",
            fontSize: "12dp"
        },
        left: "5%",
        top: "0",
        height: "12dp",
        text: "D'DECOR STORE, BANDRA",
        bindId: "headerTitle",
        id: "locationName"
    });
    $.__views.__alloyId295.add($.__views.locationName);
    $.__views.locationKm = Ti.UI.createLabel({
        color: "#a0a0a0",
        font: {
            fontFamily: "futura_medium_bt-webfont",
            fontSize: "12dp"
        },
        top: "0",
        right: "20dp",
        text: "3.3 km",
        bindId: "locationKm",
        id: "locationKm"
    });
    $.__views.__alloyId295.add($.__views.locationKm);
    $.__views.exculsive_lbl = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontFamily: "futura_medium_bt-webfont",
            fontSize: "10dp"
        },
        top: "5dp",
        left: "5%",
        text: "EXCULSIVE",
        bindId: "subTitle",
        id: "exculsive_lbl"
    });
    $.__views.selectionOptionContainer.add($.__views.exculsive_lbl);
    $.__views.address_lbl = Ti.UI.createLabel({
        color: "#a0a0a0",
        left: "5%",
        width: "70%",
        height: Titanium.UI.SIZE,
        maxLines: 4,
        wordWrap: true,
        font: {
            fontSize: "10dp"
        },
        text: "Ground floor, Noton Height, 20 , Guru Nanak Road, Station Road, Bandra West.",
        bindId: "address",
        id: "address_lbl"
    });
    $.__views.selectionOptionContainer.add($.__views.address_lbl);
    $.__views.dropdownSelectionList = Ti.UI.createScrollView({
        width: Titanium.UI.FILL,
        borderColor: "#33ffffff",
        height: 0,
        top: "0",
        visible: false,
        scrollType: "vertical",
        layout: "vertical",
        id: "dropdownSelectionList"
    });
    $.__views.__alloyId291.add($.__views.dropdownSelectionList);
    $.__views.note_lbl = Ti.UI.createLabel({
        color: "#a0a0a0",
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "18dp"
        },
        left: "5%",
        top: "20dp",
        id: "note_lbl",
        height: 0,
        visible: false
    });
    $.__views.__alloyId291.add($.__views.note_lbl);
    $.__views.note_txt = Ti.UI.createTextArea({
        font: {
            fontFamily: "futura_lt_bt_light-webfont"
        },
        backgroundColor: "transparent",
        width: "90%",
        top: "2dp",
        color: "#fff",
        height: "50dp",
        id: "note_txt",
        hintText: "NOTES (OPTIONAL)"
    });
    $.__views.__alloyId291.add($.__views.note_txt);
    $.__views.__alloyId296 = Ti.UI.createView({
        backgroundColor: Alloy.Globals.labelTitleColor,
        width: "90%",
        height: "2px",
        top: "2dp",
        id: "__alloyId296"
    });
    $.__views.__alloyId291.add($.__views.__alloyId296);
    $.__views.book_appointment_btn = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontFamily: "futura_medium_bt-webfont"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        width: "70%",
        height: "50dp",
        borderColor: "#7b7979",
        borderWidth: 1,
        top: "50dp",
        text: "REQUEST",
        id: "book_appointment_btn"
    });
    $.__views.bookappoinment.add($.__views.book_appointment_btn);
    bookAppoinment ? $.addListener($.__views.book_appointment_btn, "click", bookAppoinment) : __defers["$.__views.book_appointment_btn!click!bookAppoinment"] = true;
    $.__views.thankyou_container = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "thankyou_container",
        top: "-50%",
        layout: "vertical",
        visible: false
    });
    $.__views.bookappoinment.add($.__views.thankyou_container);
    $.__views.__alloyId297 = Ti.UI.createLabel({
        color: Alloy.Globals.labelTitleColor,
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        text: "THANK YOU!!",
        id: "__alloyId297"
    });
    $.__views.thankyou_container.add($.__views.__alloyId297);
    $.__views.__alloyId298 = Ti.UI.createLabel({
        color: "#fff",
        top: "5dp",
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        wordWrap: true,
        width: "80%",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "Thank you for requesting an appointment. We have received your details and notified the store. You will receive a confirmation over email/phone within the next 24 hours",
        id: "__alloyId298"
    });
    $.__views.thankyou_container.add($.__views.__alloyId298);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    googleAnalyticsScreen("REQUEST AN APPOINTMENT");
    touchEffect.createTouchEffect($.refresh_btn, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.close_btn, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.date, "#a6e64e48", Alloy.Globals.labelTitleColor);
    touchEffect.createTouchEffect($.month, "#a6e64e48", Alloy.Globals.labelTitleColor);
    touchEffect.createTouchEffect($.year, "#a6e64e48", Alloy.Globals.labelTitleColor);
    touchEffect.createTouchEffect($.icon1, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.icon2, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.icon3, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.selectStore_lbl, "#a6e64e48", Alloy.Globals.labelTitleColor);
    touchEffect.createTouchEffect($.arrow, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.book_appointment_btn, "#66ffffff", "#ffffff");
    touchEffect.createTouchEffect($.inStore, "#66ffffff", "#ffffff");
    touchEffect.createTouchEffect($.inHome, "#66ffffff", "#ffffff");
    Alloy.Globals.isAppointmentOption = false;
    if (args.isDashboard) {
        args.mainWindow.removeEventListener("android:back", closeBookappoinment);
        args.mainWindow.addEventListener("android:back", closeBookappoinment);
    } else if (args.isEstimate) {
        $.screenName.setText("HOME CONSULTATION");
        $.selectStore_lbl.setText("SELECT ADDRESS");
        $.selectOption.id = "inHome";
        $.selectStore_lbl.setBubbleParent(true);
        $.arrow.setBubbleParent(true);
        $.arrow.setVisible(false);
        $.selectStore_lbl.id = "inHome";
        $.removeListener($.selectOption, "click", showDropdownList);
        $.addListener($.selectOption, "click", selectStoreOption);
        args.mainWindow.removeEventListener("android:back", closeBookappoinment);
        args.mainWindow.addEventListener("android:back", closeBookappoinment);
        var text = "SELECT ADDRESS";
        var attr = Ti.UI.createAttributedString({
            text: text,
            attributes: [ {
                type: Titanium.UI.ATTRIBUTE_UNDERLINES_STYLE,
                value: Titanium.UI.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
                range: [ text.indexOf("SELECT ADDRESS"), "SELECT ADDRESS".length ]
            } ]
        });
        $.selectStore_lbl.attributedString = attr;
    } else if (void 0 != args.androidBack) {
        args.androidBack();
        args.mainWindow.removeEventListener("android:back", closeBookappoinment);
        args.mainWindow.addEventListener("android:back", closeBookappoinment);
    }
    var lastSelectedAddress = {
        index: null,
        child: null
    }, appointmentSlot = 0;
    if (args.isEdit) {
        $.selectOption.setTouchEnabled(false);
        $.selectStore_lbl.setColor("#33e64e48");
        $.removeListener($.selectOption, "click", showDropdownList);
        $.screenName.setText("EDIT AN APPOINMENT");
        $.book_appointment_btn.setText("SAVE");
        setEditAppointmentDetails();
    }
    __defers["$.__views.bookappoinment!touchstart!hideDropdownList"] && $.addListener($.__views.bookappoinment, "touchstart", hideDropdownList);
    __defers["$.__views.refresh_btn!click!refreshPage"] && $.addListener($.__views.refresh_btn, "click", refreshPage);
    __defers["$.__views.close_btn!click!closeBookappoinment"] && $.addListener($.__views.close_btn, "click", closeBookappoinment);
    __defers["$.__views.__alloyId286!click!showPicker"] && $.addListener($.__views.__alloyId286, "click", showPicker);
    __defers["$.__views.__alloyId288!click!showPicker"] && $.addListener($.__views.__alloyId288, "click", showPicker);
    __defers["$.__views.__alloyId290!click!showPicker"] && $.addListener($.__views.__alloyId290, "click", showPicker);
    __defers["$.__views.morning!click!toggelRadio"] && $.addListener($.__views.morning, "click", toggelRadio);
    __defers["$.__views.afternoon!click!toggelRadio"] && $.addListener($.__views.afternoon, "click", toggelRadio);
    __defers["$.__views.evening!click!toggelRadio"] && $.addListener($.__views.evening, "click", toggelRadio);
    __defers["$.__views.selectOption!click!showDropdownList"] && $.addListener($.__views.selectOption, "click", showDropdownList);
    __defers["$.__views.inStore!click!selectStoreOption"] && $.addListener($.__views.inStore, "click", selectStoreOption);
    __defers["$.__views.inHome!click!selectStoreOption"] && $.addListener($.__views.inHome, "click", selectStoreOption);
    __defers["$.__views.book_appointment_btn!click!bookAppoinment"] && $.addListener($.__views.book_appointment_btn, "click", bookAppoinment);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;