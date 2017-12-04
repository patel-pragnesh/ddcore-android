var args = arguments[0] || {};

//Ti.API.info('args-->' + JSON.stringify(args));
//Ti.API.info('into my appointment');
var deleteRow = null,
    _border = null,
    itemIndex = null;

init();

function init() {
	//Ti.API.info('from init************');
	getAppointmentList();
}

Ti.App.removeEventListener("refreshAppointmentList", updateAppointmentList);
Ti.App.addEventListener("refreshAppointmentList", updateAppointmentList);

function updateAppointmentList(data) {
	//Ti.API.info('************updateDataCount--->' + data.count);

	if (data.count == 1) {
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

	if (responseData.data.appointment_list.length === 0) {
		args.loadDefaultScreen("appointment");

	} else {
		try {

			var _addressList = responseData.data.appointment_list;

			/*TODO
			 *
			 * Note
			 * is_valid : 0 YES , 1 NO
			 *
			 *
			 *  */
			var _data = [];

			_.each(_addressList, function(value, k) {

				var date = (moment(value.appointment_date).format('DD MMMM YYYY')).toUpperCase();
				var slot;
				if (value.time_slot === "0") {
					slot = "MORNING";
				} else if (value.time_slot === "1") {

					slot = "AFTERNOON";
				} else if (value.time_slot === "2") {
					slot = "EVENING";
				} else {
					slot = "MORNING";
				}

				var timeSlot = date + "  " + slot;

				var attr = Ti.UI.createAttributedString({
					text : timeSlot,
					attributes : [{
						type : Ti.UI.ATTRIBUTE_FONT,
						value : {
							fontFamily : "futura_lt_bt_light-webfont"
						},
						range : [timeSlot.indexOf(slot), (slot).length]
					}, {
						type : Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
						value : ((value.is_valid) ? "#E2E2E2" : "#333333"),
						range : [timeSlot.indexOf(slot), (slot).length]
					}]

				});

				var _address = "";
				if (value.address) {
					_address = (value.address).replace(/(\r|\n|\t)/g, "");
				}

				_data.push({
					appointmentSlot : {
						//text : timeSlot,
						attributedString : attr,
						color : ((value.is_valid) ? "#E2E2E2" : Alloy.Globals.labelTitleColor)
					},
					callIcon : {
						contactNo : value.contact_number,
						color : ((value.is_valid) ? "#E2E2E2" : "#555555"),
					},
					deleteIcon : {
						appoinment_id : value.appoinment_id,
						color : ((value.is_valid) ? "#E2E2E2" : "#555555"),
						visible : (value.store_name == null ? false : true)
					},
					storeName : {
						text : (value.store_name != null ? (value.store_name + " - " + ((value.contact_number[0]) ? value.contact_number[0] : "") ) : ""),
						color : ((value.is_valid) ? "#E2E2E2" : "#333333"),
						height : (value.store_name != null ? Ti.UI.SIZE : "0"),
					},
					address : {
						text : _address,
						color : ((value.is_valid) ? "#E2E2E2" : "#555555"),
						top : (value.store_name != null ? 10 : 0)
					},
					noteLbl : {
						text : "View Notes",
						color : ((value.is_valid) ? "#E2E2E2" : Alloy.Globals.labelTitleColor),
						visible : (value.note == "" ? false : true),
						touchEnabled : (value.note == "" ? false : true),
						height : (value.note == "" ? "0" : Ti.UI.SIZE),
					},
					note : {
						text : value.note,
						color : ((value.is_valid) ? "#E2E2E2" : "#555555"),
					}
				});

			});
			$.appointmentSection.appendItems(_data);

		} catch(exp) {
			//Ti.API.info('exception-->' + exp.message);
			alert("Something went wrong");
		}

	}

	hideLoader();
	hideFullLoader();

}

function getAllBookAppointmentErrorCallback(response) {
	//Ti.API.info('appoint error response-->' + JSON.stringify(response));
	showAlert(args.mainWindow, response.message);
	hideLoader();
	hideFullLoader();

}

function toggleNote(e) {
	//$.note.
	if ($.view_notes.text === "View notes") {

		$.removeClass($.note, "height0", {
			visible : false
		});

		$.addClass($.note, "heightSize", {
			visible : true
		});

		$.view_notes.text = "Hide notes";
	} else {

		$.view_notes.text = "View notes";

		$.removeClass($.note, "heightSize", {
			visible : true
		});

		$.addClass($.note, "height0", {
			visible : true
		});
	}

}

function deleteAppointment(e) {
	/*
	var deleteConfirmation = $.UI.create("AlertDialog", {
		message : 'Are you sure ?',
		title : 'Delete Appointment',
		cancel : 1,
		buttonNames : ['Yes', 'No'],
	});

	deleteConfirmation.addEventListener('click', function(ex) {
		if (ex.index === 0) {

			//deleteRow = e.source.rowRef;
			//_border = e.source.borderRef;
			showLoader(args.mainWindow);
			var requestMethod = Alloy.Globals.commonUrl.cancelAppointment;

			var param = {
				appointment_id : e.appoinment_id
			};

			var requestParam = JSON.stringify(param);

			Alloy.Globals.webServiceCall(requestMethod, requestParam, cancelAppointmentSuccessCallback, cancelAppointmentErrorCallback, "POST", args.mainWindow);
		} else {
			deleteConfirmation = null;
			this.removeEventListener('click', arguments.callee, false);
		}
	});

	deleteConfirmation.show();
	*/
	args.androidBack();
	
	var requestMethod = Alloy.Globals.commonUrl.cancelAppointment;

	var param = {
		appointment_id : e.appoinment_id
	};

	var requestParam = JSON.stringify(param);

	args.mainWindow.add(Alloy.createController("confirmation", {
		requestMethod : requestMethod,
		requestParam : requestParam,
		successCallback : cancelAppointmentSuccessCallback,
		errorCallback : cancelAppointmentErrorCallback,
		windowContainer : args.mainWindow,
		message : "Are you sure you want to delete this appointment ?",
		productName : "",
		showLoader : showTransparentLoader,
	}).getView());
	
	
}

function cancelAppointmentSuccessCallback(response) {
args.closeAndroidBack();

	$.appointmentSection.deleteItemsAt(itemIndex, 1, {
		animated : true
	});

	Alloy.Globals.appointmentCount = response.data.appointment_count;
	//Alloy.Globals.appointmentCount - 1;
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
	//var contantNo = e.source.contactNo;
	//var contantNo = "1800-00-1300";
	var contantNo = Alloy.Globals.customerCareNo;

	//Ti.API.info('contantNo-->' + contantNo);

	Ti.Platform.openURL('tel:' + contantNo);

}

function editAppointment(e) {

	//Ti.API.info('addressList -->' + JSON.stringify(e.source.addressList));

	args.mainWindow.add(Alloy.createController("bookappoinment", {
		mainWindow : args.mainWindow,
		isEdit : true,
		addressList : e.source.addressList,
		updateAppointmentList : updateAppointmentList
	}).getView());

}

function appointmentListClick(e) {
	var bindId = e.bindId;
	var index = e.itemIndex;
	itemIndex = index;
	var currentItem,
	    listItem;
	if (bindId) {
		var bind = bindId;
		currentItem = e.section.items[index];
		listItem = currentItem[bind];
		// Ti.API.info('a = ' + currentItem[bind].collectionId);
	}

	if (bindId == "deleteIcon") {
		//		$.appointmentSection.
		
		deleteAppointment(listItem);
		
	} else if (bindId == "callIcon") {
		//
		callAppointment();
	} else if (bindId == "noteLbl") {
		//View Notes

		var note = currentItem["note"];
		//Ti.API.info('noteLbl--->' + JSON.stringify(note));

		if (listItem.text === "View Notes") {

			note.height = Ti.UI.SIZE;

			listItem.text = "Hide Notes";

		} else {

			listItem.text = "View Notes";
			note.height = 0;

		}
		e.section.updateItemAt(itemIndex, currentItem);

	}
}
