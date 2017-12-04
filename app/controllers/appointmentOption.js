// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

//args.androidBack();
touchEffect.createTouchEffect($.close_btn, "#a6ffffff", "#fff");
touchEffect.createTouchEffect($.book_appointment_btn, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.addNewAddress, "#a6e64e48", Alloy.Globals.labelTitleColor);

args.mainWindow.removeEventListener("android:back", closeAppointment);
args.mainWindow.addEventListener("android:back", closeAppointment);

var selectedRow = null,
    selectedRowIndex = 0,
    currentRow;
var _height = parseInt(Ti.Platform.displayCaps.platformHeight / 10);
$.listContainer.height = parseInt(Ti.Platform.displayCaps.platformHeight / Ti.Platform.displayCaps.logicalDensityFactor);
$.addAddressContainer.top = parseInt((Ti.Platform.displayCaps.platformHeight / Ti.Platform.displayCaps.logicalDensityFactor));
var addAddress = Alloy.createController('addAddress', {
    isEdit : false,
    isClose : true,
    displayAddressFunction : returnAddress,
    closeFunction : closeAppointment,
    mainWindow : args.mainWindow,
    closeAndroidBack : closeAndroidBack
}).getView();

$.addAddressContainer.add(addAddress);
addAddress.show();

function closeAndroidBack() {

}

var y = 500;

init();

function init() {
    if (args.option == "inHome") {
        $.listSection.setItems([]);
        $.screenName.setText("AT HOME");
        getAddressList();
    } else {
        $.addNewAddress.setVisible(false);
        $.addNewAddress.setTouchEnabled(false);
        $.listSection.setItems([]);
        if (Alloy.Globals.getCurrentLocation() != null) {
            getStoreList(Alloy.Globals.getCurrentLocation());
        }

    }
}

function returnAddress(data) {
    $.addNewAddress.setVisible(true);
    $.addNewAddress.setTouchEnabled(true);

    $.book_appointment_btn.setVisible(true);
    $.book_appointment_btn.setTouchEnabled(true);

    /*Deleselect the pervious address*/

    if (selectedRow != null || selectedRow != undefined) {
        selectedRow.visible = false;

        $.listSection.updateItemAt(selectedRowIndex, currentRow);
    }

    /*
     pindex = e.itemIndex;
     pitemSection = e.section.items[pindex];
     pitemSection["isSelected"].visible = true;
     selectedRow = pitemSection["isSelected"];
     currentRow = pitemSection;
     selectedRowIndex = pindex;
     */

    /*Deleselect the pervious address*/

    setAddressList(data, true);
    $.appointmentOption.scrollTo(0, 0);
    // var interval = setInterval(function() {
    // if (y == 0) {
    // $.addAddressContainer.remove(addAddress);
    // $.appointmentOption.scrollTo(0, 0);
    // clearInterval(interval);
    //
    // } else {
    // $.appointmentOption.scrollTo(0, y);
    // y = y - 500;
    // }
    // }, 100);
    //return;
}

function checky(e) {
    var ycordinates = $.appointmentOption.contentOffset.y;
    //Ti.API.info('ycordinates = ' + ycordinates);
}

function openAddAddress(e) {
    if (e.source.id == "addNewAddress") {
        //$.addAddressContainer.top = parseInt((Ti.Platform.displayCaps.platformHeight / Ti.Platform.displayCaps.logicalDensityFactor)-65);
        var j = 1;

        var k = parseInt((Ti.Platform.displayCaps.platformHeight + _height + 140) / 10);
        //196
        //var k =parseInt(((Ti.Platform.displayCaps.platformHeight / Ti.Platform.displayCaps.logicalDensityFactor)-65)/10);
        var interval = setInterval(function() {
            if (j == 10) {
                j = 1;
                clearInterval(interval);
            } else {
                $.appointmentOption.scrollTo(0, k * j);
                //Ti.API.info('k*j' + k * j);
                // $.dashboardNavigation.backgroundColor="#737373";
                j++;
            }
        }, 25);

        $.addNewAddress.setVisible(false);
        $.addNewAddress.setTouchEnabled(false);

        $.book_appointment_btn.setVisible(false);
        $.book_appointment_btn.setTouchEnabled(false);

        // Ti.API.info('x --->' + e.x);
        // Ti.API.info('y --->' + e.y);
        // Ti.API.info('$.listContainer-->' + $.listContainer.getHeight());
        // //$.addAddressContainer
        //
        // var interval = setInterval(function() 		{
        // if (y == 3000) {
        //
        // //Ti.API.info('addressCloseLbl-->' + addAddress.getView("addressCloseLbl"));
        // //addAddress.getView("addressCloseLbl").addEventListener("click", closeAppointment);
        // $.addAddressContainer.add(addAddress);
        // addAddress.show();
        // $.appointmentOption.scrollTo(0, 2000);
        // clearInterval(interval);
        //
        // } else {
        // $.appointmentOption.scrollTo(0, y);
        // y = y + 500;
        // }
        // }, 100);

    }
}

function closeAppointment() {
    //Ti.API.info('into new close event');

    //$.addAddressContainer.remove(addAddress);
    //hideShowView($.appointmentOption);

    Alloy.Globals.isAppointmentOption = false;

    $.appointmentOption.hide({
        animated : true
    });

    args.mainWindow.removeEventListener("android:back", closeAppointment);

    args.updateSelectOption(currentRow, args.option);

    setTimeout(function() {
        var _parent = $.appointmentOption.parent;

        if (_parent != null || _parent != undefined)
            _parent.remove($.appointmentOption);

        $.appointmentOption.removeAllChildren();
    }, 500);

    $.removeListener();
    $.destroy();

    //args.closeAndroidBack();

    //$.appointmentOption.removeAllChildren();

    // var parent = $.appointmentOption.parent;
    // parent.remove($.appointmentOption);

}

function getAddressList() {
    showLoader(args.mainWindow);
    var requestMethod = Alloy.Globals.commonUrl.viewAddress;
    Alloy.Globals.webServiceCall(requestMethod, {}, getAddressListSuccessCallback, getAddressListErrorCallback, "POST", args.mainWindow);
}

function getAddressListSuccessCallback(response) {
    //Ti.API.info('into success--->' + JSON.stringify(response));
    if (response.data.addresses.length == 0) {
        //alert("No Address in list");
        showAlert($.appointmentOption, "No Address found");
        $.book_appointment_btn.setVisible(false);
        $.book_appointment_btn.setTouchEnabled(false);
    } else {
        setAddressList(response);
    }
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
                headerTitle : {
                    text : (value.firstname + " " + value.lastname).toUpperCase(),
                    color : Alloy.Globals.labelTitleColor
                },
                locationKm : {
                    text : "" //empty
                },
                subTitle : {
                    text : (value.mobile || "")
                },
                address : {
                    text : addressText.capitalize()
                },
                getDirection : {
                    text : ""// empty
                },
                isSelected : {
                    store_name : "",
                    address : addressText,
                    contact_number : (value.mobile || ""),
                    visible : ((flag) ? true : false)
                }
            });
        });

        $.listSection.appendItems(listData);

        if (flag) {
            var index = $.listSection.getItems().length;
            index = parseInt(index) - 1;
            //Ti.API.info('index--->' + index);

            pitemSection = $.listSection.items[index];
            //Ti.API.info('pitemSection--->' + JSON.stringify(pitemSection));

            selectedRow = pitemSection["isSelected"];
            currentRow = pitemSection;
            selectedRowIndex = index;

            $.appointListContainer.scrollToItem(0, index);
        }

    } catch(exp) {
        Ti.API.info('address list expection-->' + exp.message);
    }

}

function selectList(e) {

    var bind,
        a,
        index;

    if (e.bindId) {
        bind = e.bindId;

        index = e.itemIndex;
        a = e.section.items[index];
        //Ti.API.info('a = ' + a[bind].collectionId);
    }

    if (e.bindId == "getDirection") {
        // var obj = {
        // latitude :a[bind].latitude,
        // longitude : a[bind].longitude,
        // title : a[bind].store_name,
        // subtitle : a[bind].store_address,
        // merchant_type:a[bind].merchant_type
        // };

        // Alloy.Globals.addWindowInNav("findStore", {
        // inStore : true,
        // storeInfo : obj
        // });
        var openUrlDirection = "http://maps.google.com/?q=" + a[bind].latitude + "," + a[bind].longitude + "";
        Ti.Platform.openURL(openUrlDirection);

    } else {

        if (selectedRow != null || selectedRow != undefined) {
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
        latitude : coordinate.latitude, //"18.9955",
        longitude : coordinate.longitude, //"72.8302"
        filter : "All",
        storetype : ""

    };

    var requestParam = JSON.stringify(param);

    Alloy.Globals.webServiceCall(requestMethod, requestParam, getStoreListSuccessCallback, getStoreListErrorCallback, "POST", args.mainWindow);
}

function getStoreListSuccessCallback(response) {
    hideLoader();
    if (response.data.store_list.length != 0) {
        setStoreList(response);
    } else {
        showAlert(args.mainWindow, "No Store Avaliable near your location");

    }
}

function getStoreListErrorCallback(response) {
    //Ti.API.info('getStoreListErrorCallback-->' + JSON.stringify(response));
    hideLoader();
    showAlert(args.mainWindow, response.message);
}

function setStoreList(response) {
    var storeList = response.data.store_list;
    var listData = [];
    _.each(storeList, function(value, k) {

        listData.push({
            headerTitle : {
                text : (value.store_name).toUpperCase(),
            },
            locationKm : {
                //text : (value.distance_in_km).toFixed(2) + " km",
                text : value.distance_in_km,
            },
            subTitle : {
                text : (value.merchant_type == "EBO" ? "EXCLUSIVE" : "")
            },
            address : {
                text : (value.store_address || "").capitalize()
            },
            getDirection : {
                latitude : value.latitude,
                longitude : value.longitude,
                store_name : value.store_name,
                store_address : value.store_address,
                merchant_type : value.merchant_type
            },
            isSelected : {
                visible : false,
                store_name : value.store_name,
                address : value.store_address,
                contact_number : value.store_contact,
            }
        });
    });

    $.listSection.appendItems(listData);
}

function selectOption() {
    if (selectedRow != null || selectedRow != undefined) {

        args.mainWindow.removeEventListener("android:back", closeAppointment);

        args.updateSelectOption(currentRow, args.option);
        closeAppointment();
    } else {
        showAlert(args.mainWindow, "Please select a address");
    }
}
