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
    //Ti.API.info('into Dashboard');
    args.mainWindow.removeEventListener("android:back", closeBookappoinment);
    args.mainWindow.addEventListener("android:back", closeBookappoinment);
}


// else if (args.isMainWindow) {
//Ti.API.info('do nothing');
//}

else if (args.isEstimate) {
    //Ti.API.info('estimate');
    //$.selectStore_lbl.setText("AT HOME");
    $.screenName.setText("HOME CONSULTATION");
    $.selectStore_lbl.setText("SELECT ADDRESS");
    // MKAE IT UNDERLINE
    $.selectOption.id = "inHome";
    $.selectStore_lbl.setBubbleParent(true);
    $.arrow.setBubbleParent(true);

    $.arrow.setVisible(false);

    $.selectStore_lbl.id = "inHome";

    $.removeListener($.selectOption, "click", showDropdownList);
    $.addListener($.selectOption, 'click', selectStoreOption);

    args.mainWindow.removeEventListener("android:back", closeBookappoinment);
    args.mainWindow.addEventListener("android:back", closeBookappoinment);

    var text = "SELECT ADDRESS";
    var attr = Ti.UI.createAttributedString({
        text : text,
        attributes : [{
            type : Titanium.UI.ATTRIBUTE_UNDERLINES_STYLE,
            value : Titanium.UI.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
            range : [text.indexOf("SELECT ADDRESS"), ("SELECT ADDRESS").length]
        }]
    });
    $.selectStore_lbl.attributedString = attr;

} else {
    if (args.androidBack != undefined) {
        args.androidBack();
        args.mainWindow.removeEventListener("android:back", closeBookappoinment);
        args.mainWindow.addEventListener("android:back", closeBookappoinment);
    }

}

var listView,
    lastSelectedAddress = {
    index : null,
    child : null
},
    lastSelectedStore = {
    index : null,
    child : null
},
    appointmentSlot = 0;

//var touchEffect = require("touchEffects");

if (args.isEdit) {
    $.selectOption.setTouchEnabled(false);
    $.selectStore_lbl.setColor("#33e64e48");
    $.removeListener($.selectOption, 'click', showDropdownList);

    $.screenName.setText("EDIT AN APPOINMENT");
    $.book_appointment_btn.setText("SAVE");
    setEditAppointmentDetails();
}

function closeBookappoinment() {
    //Ti.API.info('close');

    //hideShowView($.bookappoinment);

    //Ti.API.info('isAppointmentOption-->' + Alloy.Globals.isAppointmentOption);

    if (!Alloy.Globals.isAppointmentOption) {
        Ti.API.info('into close function');

        Alloy.Globals.bookAppoinmentWindow = false;

        $.bookappoinment.hide({
            animated : true
        });

        setTimeout(function() {
            var _parent = $.bookappoinment.parent;

            if (_parent != null || _parent != undefined)
                _parent.remove($.bookappoinment);

            $.bookappoinment.removeAllChildren();
        }, 500);

        //if ($.book_appointment_btn.getText() != "REQUEST"  ) {

        if (args.isDashboard) {
            //Ti.API.info('from dashboard');
        } else if (args.isMainWindow) {
            //Ti.API.info('from main window *********');
            if ($.book_appointment_btn.getText() != "REQUEST") {
                args.loadFirstAppointment();
            }

        } else if (args.isEstimate) {
            //Ti.API.info('from estimate');
            args.androidBack();
        } else {

            if ($.book_appointment_btn.getText() != "REQUEST") {
                Ti.App.fireEvent("refreshAppointmentList", {
                    count : 1
                });
                args.refreshCount(5);
            }

            if (args.closeAndroidBack != undefined) {
                args.closeAndroidBack();
                args.mainWindow.removeEventListener("android:back", closeBookappoinment);
            }

        }
        //}

        $.removeListener();
        $.destroy();
    }

}

function bookAppoinment() {
    //Ti.API.info('bookAppointment');

    if ($.book_appointment_btn.getText() === "REQUEST") {
        bookAppointmentWS();
    } else if ($.book_appointment_btn.getText() === "SAVE") {

        updateAppointmentWs();
    } else {
        closeBookappoinment();

    }
}

function openDropDown(e) {
    // var dropDown = Alloy.createController("dropdown").getView();
    //
    // Ti.API.info('e.x' + e.x);
    // Ti.API.info('e.y' + e.y);

    //$.bookappoinment.add(dropDown);
    //alert(JSON.stringify(e));

}

function showPicker() {

    var picker = Alloy.createController('pickerTemplate', {
        day : $.date,
        month : $.month,
        year : $.year,
        setDate : false,
    }).getView();

    $.bookappoinment.parent.parent.add(picker);
}

function toggelRadio(e) {
    var radioId = e.source.slot;

    if (radioId === "morning") {
        $.morningRd.color = Alloy.Globals.labelTitleColor;
        $.afternoonRd.color = "#33ffffff";
        $.eveningRd.color = "#33ffffff";
        appointmentSlot = 0;
    } else if (radioId === "afternoon") {
        $.morningRd.color = "#33ffffff";
        $.afternoonRd.color = Alloy.Globals.labelTitleColor;
        $.eveningRd.color = "#33ffffff";
        appointmentSlot = 1;
    } else {
        //evening
        $.morningRd.color = "#33ffffff";
        $.afternoonRd.color = "#33ffffff";
        $.eveningRd.color = Alloy.Globals.labelTitleColor;
        appointmentSlot = 2;
    }

    //Ti.API.info('appointmentSlot-->' + appointmentSlot);
}

function showDropdownList() {

    if (args.isEstimate) {
        //Ti.API.info('do nothing');
    } else {

        if ($.dropList.getVisible()) {

            var m = Ti.UI.create2DMatrix({
                rotate : 0
            });
            $.arrow.transform = m;

            $.arrow.setText(Alloy.Globals.icon.dropdownArrow);

            $.dropList.setHeight("0dp");
            $.dropList.setVisible(false);

        } else {

            var m = Ti.UI.create2DMatrix({
                rotate : 180
            });

            $.arrow.transform = m;

            $.dropList.setHeight(Ti.UI.SIZE);
            $.dropList.setVisible(true);
        }
    }
}

function selectStoreOption(e) {
    var lblId = e.source.id;

    if (args.isDashboard) {
        //Ti.API.info('into backEvent');

        args.mainWindow.removeEventListener("android:back", closeBookappoinment);

    } else if (args.isMainWindow) {
        //Ti.API.info('from main window');
    } else if (args.isEstimate) {
        args.mainWindow.removeEventListener("android:back", closeBookappoinment);
    } else {
        if (args.androidBack != undefined) {
            args.androidBack();
            args.mainWindow.removeEventListener("android:back", closeBookappoinment);
        }
    }

    if (lblId == "inHome") {
        Alloy.Globals.isAppointmentOption = true;

        var appointmentOption = Alloy.createController("appointmentOption", {
            mainWindow : args.mainWindow,
            option : lblId,
            updateSelectOption : setOptionData,

            // androidBack:args.mainWindow.androidBack,
            // closeAndroidBack:args.mainWindow.closeAndroidBack
        }).getView();

        //appointmentOption.hide();
        args.mainWindow.add(appointmentOption);

    } else {
        Alloy.Globals.isAppointmentOption = true;
        if (Alloy.Globals.getCurrentLocation() != null) {

            var appointmentOption = Alloy.createController("appointmentOption", {
                mainWindow : args.mainWindow,
                option : lblId,
                updateSelectOption : setOptionData,
                // androidBack:args.mainWindow.androidBack,
                // closeAndroidBack:args.mainWindow.closeAndroidBack
            }).getView();

            args.mainWindow.add(appointmentOption);
        }
    }

    //appointmentOption.show();

    /*
     var lblId = e.source.id;
     Ti.API.info('label id. ' + lblId);

     $.dropdownSelectionList.setScrollingEnabled(true);
     showDropdownList();

     setTimeout(function() {

     $.dropdownSelectionList.setHeight("280dp");
     $.dropdownSelectionList.setVisible(true);
     if (lblId === "inHome") {
     addressList();
     //addressListView();
     } else {

     if (Alloy.Globals.getCurrentLocation() != null) {
     storeList(Alloy.Globals.getCurrentLocation());
     }

     //storeListView();
     }
     $.bookappoinment.setScrollingEnabled(false);
     }, 400);
     */
}

function refreshPage() {
    /*TODO REFRESH ALL CONTROLLER*/

    if (args.isEdit) {
        setEditAppointmentDetails();
    } else {

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
                rotate : 0
            });

            $.arrow.transform = m;

            $.dropList.setHeight("0dp");
            $.dropList.setVisible(false);
        }

        if (args.isEstimate) {
            var text = "SELECT ADDRESS";
            var attr = Ti.UI.createAttributedString({
                text : text,
                attributes : [{
                    type : Titanium.UI.ATTRIBUTE_UNDERLINES_STYLE,
                    value : Titanium.UI.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
                    range : [text.indexOf("SELECT ADDRESS"), ("SELECT ADDRESS").length]
                }]
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

    if (lastSelectedAddress.child != null) {
        lastSelectedAddress.child.setVisible(false);
    }
    var child = e.source.children[0];

    child.setVisible(true);

    lastSelectedAddress.child = child;

}

function selectAddress(e) {
    /*TODO select the address and display below the option*/

    //Ti.API.info('lastSelectedAddress.child-->' + lastSelectedAddress.child);

    showDropdownList();
    var m = Ti.UI.create2DMatrix({
        rotate : 0
    });
    $.arrow.transform = m;
    $.dropList.setHeight("0dp");
    $.dropList.setVisible(false);

    if (lastSelectedAddress.child != null) {
        lastSelectedAddress.index = lastSelectedAddress.child.index;
        displayAppointmentOptionDetails("home");
    }

}

function addressListView(response, flag) {

    var addressList = response.data.addresses;
    //Ti.API.info('addressList -->' + JSON.stringify(addressList));

    var addressContainer1 = $.UI.create("ScrollView", {
        width : Ti.UI.FILL,
        height : "70%",
        left : "0dp",
        // borderColor : "red",
        layout : "vertical",
    });

    var addressContainer2 = $.UI.create("View", {
        width : Ti.UI.FILL,
        height : Ti.UI.SIZE,
        left : "0dp",
        // borderColor : "red",

    });

    var doneLbl = $.UI.create("Label", {
        text : "DONE",
        color : "#fff",
        left : "10%",
        font : {
            fontSize : "14dp"
        },

    });
    addressContainer2.add(doneLbl);

    doneLbl.addEventListener("click", selectAddress);

    var addAddressLbl = $.UI.create("Label", {
        text : "Add New Address",
        color : "#fff", //Alloy.Globals.labelTitleColor,
        font : {
            fontSize : "14dp"
        },
        right : "10%",
    });
    addressContainer2.add(addAddressLbl);

    addAddressLbl.addEventListener("click", function() {
        var addAddress = Alloy.createController("addAddress", {
            isEdit : false,
            // customerAddress : {},
            // addressLabel : "",
            // isFormat : true,
            displayAddressFunction : addressListView
        }).getView();

        addAddress.zIndex = 12;
        args.mainWindow.add(addAddress);
        addAddress.show();
    });

    //Ti.API.info('addressList length-->' + addressList.length);
    for (var i = 0; i < addressList.length; i++) {

        var storeContainer = $.UI.create("View", {
            width : Ti.UI.FILL,
            height : Ti.UI.SIZE,
            top : "5dp",
        });

        storeContainer.addEventListener("click", selectAddressList);

        var isSelected = $.UI.create("Label", {
            classes : "iconFont",
            id : "tick",
            text : Alloy.Globals.icon.tick,
            color : Alloy.Globals.labelTitleColor,
            font : {
                fontSize : "12dp"
            },
            left : "5%",
            top : "20dp",
            visible : ((lastSelectedAddress.index === i) ? true : false),
            touchEnabled : false,
            index : i,

        });

        var userName = $.UI.create("Label", {
            id : "userName",
            classes : "fontHeavy",
            left : "10%",
            top : "10dp",
            //text : "PIYUSHA ANEJA",
            text : (addressList[i].firstname + " " + addressList[i].lastname),
            font : {
                fontSize : "12dp"
            },
            color : Alloy.Globals.labelTitleColor,
            touchEnabled : false
        });

        var mobNumber = $.UI.create("Label", {
            id : "mobNumber",
            classes : "fontLight",
            color : '#fff',
            font : {
                fontSize : '10dp'
            },
            left : "10%",
            top : '25dp',
            //text : "9874561230",
            text : addressList[i].mobile,
            touchEnabled : false
        });

        var address = $.UI.create("Label", {
            id : "address",
            classes : "fontLight",
            color : '#a0a0a0',
            font : {
                fontSize : '12dp'
            },
            left : "10%",
            top : '40dp',
            bottom : "10dp",
            wordWrap : true,
            width : "80%",
            //text : "Ground floor, Notan heights, Sector 69x,Guru naka road, Bandra (w),Mumbai - 4000081.Maharashtra",
            text : ((addressList[i].street1 || "") + ", " + (addressList[i].street2 || "") + ", " + (addressList[i].city || "") + "-" + (addressList[i].pincode || "") + "." + (addressList[i].state || "")   ),
            touchEnabled : false
        });

        isSelected.address = address.getText();
        isSelected.contact_number = mobNumber.getText();
        isSelected.store_name = "";

        storeContainer.add(isSelected);
        storeContainer.add(userName);
        storeContainer.add(mobNumber);
        storeContainer.add(address);

        //$.dropdownSelectionList.add(storeContainer);
        if (flag) {

            addressContainer1.add(storeContainer);
        } else {
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

function storeListView(response) {

    var storeList = response.data.store_list;

    var storeListContainer = $.UI.create("ScrollView", {
        width : Ti.UI.FILL,
        height : "80%",
        left : "0dp",
        layout : "vertical",
    });

    var doneLbl = $.UI.create("Label", {
        text : "DONE",
        color : "#fff",
        left : "10%",
        font : {
            fontSize : "14dp"
        },

    });

    doneLbl.addEventListener("click", selectStore);

    for (var i = 0; i < storeList.length; i++) {

        var storeContainer = $.UI.create("View", {
            width : Ti.UI.FILL,
            height : Ti.UI.SIZE,
            top : "5dp",
        });
        storeContainer.addEventListener("click", selectStoreList);

        var isSelected = $.UI.create("Label", {
            classes : "iconFont",
            text : Alloy.Globals.icon.tick,
            color : Alloy.Globals.labelTitleColor,
            left : "5%",
            top : "10dp",
            visible : ((lastSelectedStore.index === i) ? true : false),
            touchEnabled : true,
            font : {
                fontSize : "12dp"
            },
            index : i
        });

        var store_name = storeList[i].store_name;
        var distance = storeList[i].distance_in_km.toFixed(2) + "km";

        var storeName = $.UI.create("Label", {
            id : "storeName",
            classes : "fontHeavy",
            left : "12%",
            top : "10dp",
            text : store_name + "   " + distance,
            font : {
                fontSize : "12dp"
            },
            color : Alloy.Globals.labelTitleColor,
            touchEnabled : false,
            bottom : "10dp",
            // width:"100%",
            //Ti.UI.SIZE,
            // borderColor:"red",
        });

        var attr = Ti.UI.createAttributedString({
            text : storeName.text,
            attributes : [{
                type : Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
                value : "#a0a0a0",
                range : [storeName.text.indexOf(distance), (distance).length]
            }]
        });

        storeName.attributedString = attr;

        var border = $.UI.create("View", {
            classes : "border",
            backgroundColor : "#a0a0a0",
            touchEnabled : false,
            width : "80%"
        });

        storeContainer.add(isSelected);
        storeContainer.add(storeName);

        isSelected.address = storeList[i].store_address;
        isSelected.contact_number = storeList[i].store_contact;
        isSelected.store_name = store_name;

        if (i != 0) {

            storeContainer.add(border);
        }

        //$.dropdownSelectionList.add(storeContainer);

        storeListContainer.add(storeContainer);
    }

    $.dropdownSelectionList.add(storeListContainer);
    $.dropdownSelectionList.add(doneLbl);

}

function addressList() {
    showLoader($.bookappoinment);
    var requestMethod = Alloy.Globals.commonUrl.viewAddress;
    Alloy.Globals.webServiceCall(requestMethod, {}, addressListSuccessCallback, addressListErrorCallback, "POST", $.bookappoinment);
}

function addressListSuccessCallback(response) {
    //Ti.API.info('address Listing -->' + JSON.stringify(response));
    hideLoader();
    // displayAddress(e);
    addressListView(response, true);
}

function addressListErrorCallback(response) {
    hideLoader();
    showAlert($.bookappoinment, response.message);
}

function displayAppointmentOptionDetails(textId) {

    if (textId == "home") {
        $.selectStore_lbl.setText("AT HOME");
        //$.optionLbl.setText("Address");
        //Ti.API.info('address--->' + JSON.stringify(lastSelectedAddress));
        //$.optionLbl.setText(lastSelectedAddress.child.address);
        // $.optionLbl.address = lastSelectedAddress.child.address;
        // $.optionLbl.contact_number = lastSelectedAddress.child.contact_number;
        // $.optionLbl.store_name = lastSelectedAddress.child.store_name;
    } else {
        $.selectStore_lbl.setText("IN STORE");
        //$.optionLbl.setText("Store details");
        //	Ti.API.info('store --->' + JSON.stringify(lastSelectedStore));
        //$.optionLbl.setText(lastSelectedStore.child.address);
        // $.optionLbl.address = lastSelectedStore.child.address;
        // $.optionLbl.contact_number = lastSelectedStore.child.contact_number;
        // $.optionLbl.store_name = lastSelectedStore.child.store_name;
    }

    $.selectionOptionContainer.setHeight(Ti.UI.SIZE);
    $.selectionOptionContainer.setVisible(true);
}

function storeList(coordinate) {
    showLoader($.bookappoinment);
    var requestMethod = Alloy.Globals.commonUrl.storeList;

    var param = {
        latitude : coordinate.latitude, //"18.9955",
        longitude : coordinate.longitude, //"72.8302"
        filter : "All",
        storetype : ""

    };

    var requestParam = JSON.stringify(param);

    Alloy.Globals.webServiceCall(requestMethod, requestParam, storeListSuccessCallback, storeListErrorCallback, "POST", $.bookappoinment);
}

function storeListSuccessCallback(e) {
    //Ti.API.info('storeList Response-->' + JSON.stringify(e));
    hideLoader();
    storeListView(e);
}

function storeListErrorCallback(e) {
    hideLoader();
    showAlert($.bookappoinment, e.message);
}

function selectStoreList(e) {
    //lastSelectedStore

    if (lastSelectedStore.child != null) {
        lastSelectedStore.child.setVisible(false);
    }
    var child = e.source.children[0];

    child.setVisible(true);
    lastSelectedStore.child = child;
}

function selectStore(e) {

    showDropdownList();
    var m = Ti.UI.create2DMatrix({
        rotate : 0
    });
    $.arrow.transform = m;

    $.dropList.setHeight("0dp");
    $.dropList.setVisible(false);
    if (lastSelectedStore.child != null) {

        lastSelectedStore.index = lastSelectedStore.child.index;

        displayAppointmentOptionDetails("store");
    }

}

function bookAppointmentWS() {

    if ($.date.getText() === "DAY") {
        showAlert(args.mainWindow, "Please select a date");
    } else if (appointmentSlot === null) {
        showAlert(args.mainWindow, "Please select appointment slot");
    } else if ($.selectStore_lbl.getText() === "SELECT OPTION") {
        showAlert(args.mainWindow, "Please select an option");
    } else {

        showLoader(args.mainWindow);
        var requestMethod = Alloy.Globals.commonUrl.bookAppointment;

        var param = {
            appointment_date : (moment($.date.date).format('YYYY-MM-DD')), //"2016-04-05",
            time_slot : appointmentSlot, //"1",
            visit_location : ($.selectStore_lbl.getText() === "AT HOME" ? "1" : "0" ), //"0",
            store_name : $.selectStore_lbl.optionData.store_name, //"Beauty Furnishing",
            address : $.selectStore_lbl.optionData.address, //"8-9,SHREEJI DARSHAN,, 100 S.V.ROAD, KANDIVALI",
            contact_number : $.selectStore_lbl.optionData.contact_number, //"2808999291",
            note : $.note_txt.getValue() //"fksdfksdb fk"
        };

        var requestParam = JSON.stringify(param);
        //Ti.API.info('book an appointment request Param-->' + requestParam);

        Alloy.Globals.webServiceCall(requestMethod, requestParam, bookAppointmentSuccessCallback, bookAppointmentErrorCallback, "POST", $.bookappoinment);
    }

}

function bookAppointmentSuccessCallback(response) {
    var responseData = response;
    //Ti.API.info('book an appoint success -->' + JSON.stringify(response));
    hideLoader();
    Alloy.Globals.appointmentCount = response.data.appointment_count;
    //bookAppoinment();
    //Alloy.Globals.appointmentCount = responseData.data.appointment_count;
    //Ti.API.info('appointment count***********\t' + Alloy.Globals.appointmentCount);

    // Ti.App.fireEvent("refreshAppointmentList");

    // args.updateAppointmentList();

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

    if (e.source.id === "bookappoinment") {

        $.dropdownSelectionList.setHeight("0dp");
        $.dropdownSelectionList.setVisible(false);
        $.bookappoinment.setScrollingEnabled(true);
        $.dropdownSelectionList.removeAllChildren();

        $.selectionOptionContainer.setHeight("0dp");
        $.selectionOptionContainer.setVisible(false);

        if ($.dropList.getVisible()) {

            var m = Ti.UI.create2DMatrix({
                rotate : 0
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

    //Ti.API.info('edit Appointment slot-->' + JSON.stringify(addressList));

    var date = addressList.appointment_date.split("-");
    // need to convert date
    $.date.setText(date[2]);
    $.date.date = addressList.appointment_date;
    $.month.setText(date[1]);
    $.year.setText(date[0]);

    // condition dependting on slot value
    if (addressList.time_slot === "0") {
        $.morning.fireEvent("click");
    } else if (addressList.time_slot === "1") {
        $.afternoon.fireEvent("click");
    } else if (addressList.time_slot === "2") {
        $.evening.fireEvent("click");
    }

    $.note_txt.setValue(addressList.note || "");

}

function updateAppointmentWs() {
    var requestMethod = Alloy.Globals.commonUrl.updatebookAppointment;

    var param = {
        appointment_id : args.addressList.appoinment_id,
        appointment_date : (moment($.date.date).format('YYYY-MM-DD')),
        time_slot : appointmentSlot,
        note : $.note_txt.getValue()
    };

    var requestParam = JSON.stringify(param);

    //Ti.API.info('requestParam for updateAppointment-->' + requestParam);

    showLoader($.bookappoinment);
    Alloy.Globals.webServiceCall(requestMethod, requestParam, bookAppointmentSuccessCallback, updateAppointmentErrorCallback, "POST", $.bookappoinment);
}

// function updateAppointmentSuccessCallback(response) {
// Ti.API.info('updateAppointmentSuccess response--->' + JSON.stringify(response));
// hideLoader();
// }

function updateAppointmentErrorCallback(response) {
    Ti.API.info('updateAppointmentError response--->' + JSON.stringify(response));
    hideLoader();
}

function setOptionData(data, option) {
    //Ti.API.info('into book appointment --->' + JSON.stringify(data));

    args.mainWindow.removeEventListener("android:back", closeBookappoinment);
    args.mainWindow.addEventListener("android:back", closeBookappoinment);

    if (data != undefined || data != null) {
        $.dropList.setHeight("0dp");
        $.dropList.setVisible(false);

        $.locationName.setText(data.headerTitle.text);
        $.locationKm.setText(data.locationKm.text);
        $.exculsive_lbl.setText(data.subTitle.text);
        $.address_lbl.setText(data.address.text);

        if ((data.subTitle.text).toString().trim() == "") {
            $.exculsive_lbl.setHeight(0);
        }

        $.selectStore_lbl.optionData = data.isSelected;

        //$.selectionOptionContainer.setHeight("100dp");
        $.selectionOptionContainer.setHeight(Ti.UI.SIZE);
        $.selectionOptionContainer.setVisible(true);

        if (option == "inHome") {
            if (!args.isEstimate) {
                $.selectStore_lbl.setText("AT HOME");
            }
            var m = Ti.UI.create2DMatrix({
                rotate : 0
            });
            $.arrow.transform = m;

        } else {
            $.selectStore_lbl.setText("IN STORE");

            var m = Ti.UI.create2DMatrix({
                rotate : 0
            });
            $.arrow.transform = m;
        }

    }

    Alloy.Globals.isAppointmentOption = false;

}
