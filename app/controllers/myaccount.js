var args = arguments[0] || {};
//var shortListCount = 0;

var loadFirst = true;
var isAndroidBack = true;
var previousImage = $.profile_img.getImage();
$.paging.setScrollableView($.scrollableView);

/*HEADER MODIFICATION*/
$.header.getView().backgroundColor = "transparent";
$.header.getView("openView").zIndex = 11;
$.header.getView().zIndex = 10;

$.header.init({
	title : "MY ACCOUNT",
	passWindow : $.myaccount,
});

googleAnalyticsScreen("MY ACCOUNT");

init();

function init() {
	// Ti.API.info('init function called *******');
	setTimeout(function() {
		$.myaccount.addEventListener("focus", updateCount);
	}, 2000);
	updateCount();

	/*
	if (!$.info.hasChild) {
	try {

	$.info.add(Alloy.createController("myaccount_info", {
	updateFunction : updateMyAccountInfo,
	mainWindow : $.myaccount,
	androidBack : androidBack,
	closeAndroidBack : windowBack,

	}).getView());
	$.info.hasChild = true;

	//setTimeout(function() {
	Ti.API.info('into setTimeOut');
	$.myaccount.addEventListener("focus", updateCount);
	// $.scrollableView.removeView($.orders);
	//}, 1500);

	} catch(exp) {

	Ti.API.info('myaccount_info : ' + exp.message);
	}

	}
	*/
	// new code added for time be to disable Orders tab

	//$.scrollableView.removeView($.orders);
}

function updateCount() {
	//  Ti.API.info('my account window focus*************');
	$.header.updateCartCount();

	/*Below function call is commented for time begin
	 Note: Please do not delete
	 * */

	updateMyAccountCurrentPage($.scrollableView.currentPage);
}

//$.header.getView("menuButton").addEventListener("click", backToDashboard);

function backToDashboard() {

	//  Ti.API.info('back to Dashboard 1');
	if (isAndroidBack) {
		//  Ti.API.info('back to Dashboard 2');

		//        Alloy.Globals.popWindowInNav();
		// var cacheDir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "/");
		// cacheDir.deleteDirectory(true);

		$.myaccount.close();
	}
}

/*Event Listener*/

// function tabHandler(e) {
// Ti.API.info('selected tab ', e.tab);
//
// }

function updateBGImage() {
	try {

		// commented for time begin

		if ($.scrollableView.getCurrentPage() != 4 && ($.profile_bg_img.hasStyle)) {

			var blob = ($.profile_img).toImage();
			var _image = blob.imageAsResized(10, 10);
			$.profile_bg_img.setImage(_image);
			$.profile_bg_img.hasStyle = false;
		}

		// if ($.scrollableView.getCurrentPage() != 3 && ($.profile_bg_img.hasStyle)) {
		//
		// var blob = ($.profile_img).toImage();
		// var _image = blob.imageAsResized(10, 10);
		// $.profile_bg_img.setImage(_image);
		// $.profile_bg_img.hasStyle = false;
		// }

	} catch(exp) {
		Ti.API.info('change background image exception-->' + exp.message);
	}
}

function changeScreen(e) {
	//Ti.API.info('e Scrollable View object--->' + JSON.stringify(e));

	//  Ti.API.info('changeScreeen--->' + JSON.stringify(e));

	try {

		if (e.view != undefined || e.view != null || e.view.id != undefined || e.view.id != null) {

			//Ti.API.info('into this function');
			switch(e.view.id) {
			case "info": {

				if (!$.info.hasChild) {
					try {

						$.info.add(Alloy.createController("myaccount_info", {
							updateFunction : updateMyAccountInfo,
							mainWindow : $.myaccount,
							androidBack : androidBack,
							closeAndroidBack : windowBack,

						}).getView());
						$.info.hasChild = true;

						$.scrollableView.addEventListener("scrollend", changeScreen);
						$.myaccount.addEventListener("focus", updateCount);

						$.removeListener($.scrollableView, 'scroll', changeScreen);

						//    $.scrollableView.removeView($.orders);
						googleAnalyticsScreen("MY ACCOUNT INFO");

					} catch(exp) {

						Ti.API.info('myaccount_info : ' + exp.message);
					}

				}

				break;
			}

			case "orders": {

				if (!$.orders.hasChild) {

					if ($.orders.getChildren().length != 0) {
						$.orders.removeAllChildren();
					}

					$.orders.add(Alloy.createController("myaccount_orders", {
						loadDefaultScreen : loadDefault,
						mainWindow : $.myaccount,
						container : $.orders,
						androidBack : androidBack,
						closeAndroidBack : windowBack,
					}).getView());
					$.orders.hasChild = true;
					googleAnalyticsScreen("MY ACCOUNT ORDER");

				}

				break;
			}

			case "shortlist": {
				if (!$.shortlist.hasChild) {

					if ($.shortlist.getChildren().length != 0) {
						$.shortlist.removeAllChildren();
					}

					if (Alloy.Globals.shortlistCount != 0) {

						//$.shortlist.removeAllChildren();
						$.shortlist.add(Alloy.createController("myshortlist", {
							loadDefaultScreen : loadDefault,
							mainWindow : $.myaccount,
							container : $.shortlist,
							refreshCount : refreshAccountCount,
							androidBack : androidBack,
							closeAndroidBack : windowBack,
							updateCount : updateCount
						}).getView());
						googleAnalyticsScreen("MY ACCOUNT SHORTLIST");

					} else {
						loadDefault("catalogue");
					}

				}

				$.shortlist.hasChild = true;

				break;
			}
			case "savedviews": {
				if (!$.savedviews.hasChild) {

					if ($.savedviews.getChildren().length != 0) {
						$.savedviews.removeAllChildren();
					}

					$.savedviews.add(Alloy.createController("savedviews", {
						loadDefaultScreen : loadDefault,
						mainWindow : $.myaccount,
						container : $.savedviews,
						androidBack : androidBack,
						closeAndroidBack : windowBack,
					}).getView());

					$.savedviews.hasChild = true;
					googleAnalyticsScreen("MY ACCOUNT SAVED VIEWS");

				}

				break;
			}
			case "style": {

				if (!$.style.hasChild) {

					if ($.style.getChildren().length != 0) {
						$.savedviews.removeAllChildren();
					}

					$.style.add(Alloy.createController("mystyle", {
						mainWindow : $.myaccount,
						container : $.style,
						styleBgContainer : $.profile_bg_img
					}).getView());

					$.style.hasChild = true;
					googleAnalyticsScreen("MY ACCOUNT MY STYLE");
				} else {

					$.profile_bg_img.setImage(($.profile_bg_img.styleBg || $.profile_img.getImage()));
					$.profile_bg_img.hasStyle = true;

				}
				break;
			}
			case "appointment": {

				if (!$.appoinments.hasChild) {

					if ($.appoinments.getChildren().length != 0) {
						$.appoinments.removeAllChildren();
					}

					try {

						$.appoinments.add(Alloy.createController("myappoinments", {
							loadDefaultScreen : loadDefault,
							mainWindow : $.myaccount,
							container : $.appoinments,
							refreshCount : refreshAccountCount,
							androidBack : androidBack,
							closeAndroidBack : windowBack,
						}).getView());

						googleAnalyticsScreen("MY ACCOUNT APPOINMENT");

					} catch(exp) {
						Ti.API.info('my appointment exp-->' + exp.message);
						//alert("Something went wrong");
					}

					$.appoinments.hasChild = true;

				}

				break;
			}

			};

		}

		updateBGImage();

	} catch(ex) {
		//Ti.API.info('ex--->' + ex.message);
		return;
	}

}

function navigateToBookAppoinment() {
	//Ti.API.info('navigate book an appointment page');

	$.myaccount.add(Alloy.createController("bookappoinment", {
		mainWindow : $.myaccount,
		androidBack : androidBack,
		closeAndroidBack : windowBack,
		refreshCount : refreshAccountCount

	}).getView());

}

function updateProfileImage() {
	$.profile_img.setTouchEnabled(false);

	previousImage = $.profile_img.image;

	var cropping = require("cropping");

	cropping.callimagecrop($.profile_img, $.myaccount, {
		x : 5,
		y : 6
	}, changePhotoFunction, true, removePhoto);

	$.profile_img.setTouchEnabled(true);

}

function changePhotoFunction() {
	//Ti.API.info('into change photo event');
	/*TODO*/
	imageUpload($.profile_img);

	if ($.scrollableView.getCurrentPage() != 4) {// condition commented for time begin
		// if ($.scrollableView.getCurrentPage() != 3) {
		$.profile_bg_img.image = $.profile_img.image;

		$.profile_bg_img.bgImage = $.profile_img.image;

	}

}

function removePhoto() {
	imageUpload("", true);
	if ($.scrollableView.getCurrentPage() != 4) {

		$.profile_bg_img.image = $.profile_img.image;
		$.profile_bg_img.bgImage = $.profile_img.image;
	}
}

/*Event Listener */

function imageUpload(img, removeFlag) {

	// var imageB64 = Ti.Utils.base64encode(img.image).toString();

	var imageB64 = "";

	if (removeFlag) {
		imageB64 = "";
	} else {

		imageB64 = Ti.Utils.base64encode(img.image).toString();
	}

	var requestMethod = Alloy.Globals.commonUrl.imageUpload;
	var param = {
		image : imageB64
	};

	var requestParam = JSON.stringify(param);

	//Ti.API.info('imageUpload request Param-->' + requestParam);

	showTransparentLoader($.myaccount_photo_container);

	Alloy.Globals.webServiceCall(requestMethod, requestParam, imageUploadSuccessCallback, imageUploadErrorCallback, "POST", $.myaccount);
}

function imageUploadSuccessCallback(e) {

	//$.profile_img.setImage(e.data.image);

	try {

		if (e.data == null) {

			$.profile_img.setImage("");
			Ti.App.Properties.setString("image", "");
		} else {

			$.profile_img.setImage(e.data.image);
			Ti.App.Properties.setString("image", e.data.image);
		}

		$.profile_img.setBackgroundColor($.profile_img.getImage() == "" ? "#80000000" : "#000");

		if ($.scrollableView.getCurrentPage() != 4) {// commented for time begin
			// if ($.scrollableView.getCurrentPage() != 3) {

			// $.profile_bg_img.setImage($.profile_img.getImage());
			if (e.data != null) {

				var tempBgImage = Ti.UI.createImageView({
					image : $.profile_img.getImage()
				});

				var blob = tempBgImage.toBlob();

				var _image = blob.imageAsResized(10, 10);
				$.profile_bg_img.setImage(_image);

			}
		}

		previousImage = $.profile_img.getImage();

		//  Ti.App.Properties.setString("image", e.data.image);

		hideTransparentLoader();
	} catch(exp) {
		Ti.API.info('image upload exception--->' + exp.message);
	}

}

function imageUploadErrorCallback(e) {
	hideTransparentLoader();
	showAlert($.myaccount, e.message);
	$.profile_img.setImage(previousImage);
	$.profile_img.setBackgroundColor($.profile_img.getImage() == "" ? "#80000000" : "#000");

}

// var style1 = $.createStyle({
    // font : {
        // fontFamily : "gender"
    // },
// });
// var style2 = $.createStyle({
    // font : {
        // fontFamily : "icomoon"
    // },
// });

function updateMyAccountInfo(data, flag) {
	try {

		//Ti.API.info('response--->' + JSON.stringify(data));

		var response = data.customer;
		if (flag) {
			//Ti.API.info('1');
			//return;
			
			
		} else {
			//Ti.API.info('into updateMyAccountInfo **** else part********');

			Alloy.Globals.shortlistCount = response.shortlist_count;
			Alloy.Globals.orderCount = response.order_count;
			Alloy.Globals.appointmentCount = response.myappointment_count;
			Alloy.Globals.categoryId = response.categoryId;
			Alloy.Globals.customerCareNo = response.customer_care_number;

			$.orders.title = "ORDERS " + (response.order_count.toString().length === 1 ? ("0" + response.order_count) : response.order_count);
			$.shortlist.title = "SHORTLIST " + (response.shortlist_count.toString().length === 1 ? ("0" + response.shortlist_count) : response.shortlist_count);
			$.appointment.title = "APPOINTMENTS " + (response.myappointment_count.toString().length === 1 ? ("0" + response.myappointment_count) : response.myappointment_count);
			
			setTimeout(function(){
				$.paging.refresh();
			},300);
			
		}

		$.useremail_lbl.setText((response.email) || "");

		//Ti.API.info('response.image = '+response.image);
		//Ti.API.info('encodeURI(response.image) = '+encodeURI(response.image));

		$.profile_img.setImage(encodeURI(response.image) || "");

		$.profile_img.setBackgroundColor(($.profile_img.getImage() == "" ? "#80000000" : "#000"));

		Ti.App.Properties.setString("image", (response.image || ""));

		if ($.profile_img.getImage() != "") {

			var tempBgImage = Ti.UI.createImageView({
				image : $.profile_img.getImage()
			});

			var blob = tempBgImage.toBlob();

			var _image = blob.imageAsResized(10, 10);
			$.profile_bg_img.setImage(_image);

		}

		var gender = Alloy.Globals.icon.female;

		if (response.gender === "1") {
			//male
			gender = Alloy.Globals.icon.male;
			//$.username_lbl.applyProperties(style2);

		} else if (response.gender === "2") {
			//female
			gender = Alloy.Globals.icon.female;
			//$.username_lbl.applyProperties(style2);
		}else if (response.gender === "3") {
            //female
            gender = Alloy.Globals.icon.other;
            //$.username_lbl.applyProperties(style1);
        }

		var username = ((response.firstname || "") + " " + (response.lastname || "")).capitalize();

		var usernameText = gender.toString() + " " + username;

		$.username_lbl.setText(usernameText);

		var attr = Ti.UI.createAttributedString({
			text : usernameText,
			attributes : [{
				type : Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
				value : Alloy.Globals.labelTitleColor,
				range : [usernameText.indexOf(gender), (gender).length]
			}, {
				type : Ti.UI.ATTRIBUTE_FONT,
				value : {
					font : {
						fontFamily : "futura_medium_bt-webfont"
					}
				},
				range : [usernameText.indexOf(username), (username).length]
			}]
		});

		$.username_lbl.attributedString = attr;

	} catch(ex) {
		Ti.API.info('my account info error--->' + ex.message);
		// alert("Something went wrong");
	}
}

function loadDefault(_screenName) {

	var emptyScreen = Alloy.createController("emptyMyAccount", {
		screenName : _screenName, //"appointment",
		mainWindow : $.myaccount,
		androidBack : androidBack,
		closeAndroidBack : windowBack,
		isMainWindow : true,
		loadFirstAppointment : enableAppointment,
		refreshCount : refreshAccountCount
	}).getView();

	switch(_screenName) {

	case "estore": {
		$.orders.removeAllChildren();
		$.orders.add(emptyScreen);
		$.orders.hasChild = true;
		break;
	}

	case "catalogue": {
		$.shortlist.removeAllChildren();
		$.shortlist.add(emptyScreen);
		//$.shortlist.hasChild = true;

		break;
	}
	case "appointment": {
		$.appoinments.add(emptyScreen);
		$.appoinments.hasChild = true;
		$.addAppoinment.setVisible(false);
		break;
	}

	case "savedviews": {

		$.savedviews.add(emptyScreen);
		$.savedviews.hasChild = true;
		$.savedviews.setVisible(true);

		break;
	}

	};
}

function refreshAccountCount(index) {

	var orderCount = (Alloy.Globals.orderCount || 0);
	var shortlistCount = (Alloy.Globals.shortlistCount || 0);
	var appointmentCount = (Alloy.Globals.appointmentCount || 0);

	$.orders.title = "ORDERS " + (orderCount.toString().length === 1 ? ("0" + orderCount) : orderCount);
	// commented for time begin

	$.shortlist.title = "SHORTLIST " + (shortlistCount.toString().length === 1 ? ("0" + shortlistCount) : shortlistCount);

	$.appointment.title = "APPOINTMENTS " + (appointmentCount.toString().length === 1 ? ("0" + appointmentCount) : appointmentCount);


/*TODO need to work here*/
	Ti.API.info('calling widget function ******* index : ' + index);

	setTimeout(function() {

		if (index == 2) {

			$.paging.updateLabelTitle(index, $.shortlist.title);
		} else if (index == 1) {
			$.paging.updateLabelTitle(index, $.orders.title);
		} else if (index == 5) {
			$.paging.updateLabelTitle(index, $.appointment.title);
		}

	}, 800);

	// if (index == 2) {
	// $.paging.updateLabelTitle(index, $.shortlist.title);
	// } else if (index == 5) {
	// $.paging.updateLabelTitle(index, $.appointment.title);
	// }

}

function androidBack() {
	$.header.init({
		title : "MY ACCOUNT",
		// passWindow : $.myaccount,
	});
	isAndroidBack = false;
}

function windowBack() {
	$.header.init({
		title : "MY ACCOUNT",
		passWindow : $.myaccount,
	});
	isAndroidBack = true;

	//Ti.API.info('call windowBack');
}

if (Ti.Platform.Android) {
	$.myaccount.fbProxy = Alloy.Globals.fb.createActivityWorker({
		lifecycleContainer : $.myaccount
	});
}

function enableAppointment() {

	$.addAppoinment.setVisible(true);
	$.appoinments.removeAllChildren();

	if ($.appoinments.getChildren().length != 0) {
		$.appoinments.removeAllChildren();
	}

	try {

		$.appoinments.add(Alloy.createController("myappoinments", {
			loadDefaultScreen : loadDefault,
			mainWindow : $.myaccount,
			container : $.appoinments,
			refreshCount : refreshAccountCount
		}).getView());

	} catch(exp) {
		Ti.API.info('my appointment exp-->' + exp.message);
		//alert("Something went wrong");
	}

	$.appoinments.hasChild = true;

}

function updateMyAccountCurrentPage(currentPage) {

	try {

		var obj = {
			view : {
				id : ""
			}
		};

		switch(currentPage) {
		case 0: {
			refreshAccountCount(2);
			$.shortlist.hasChild = false;
			obj.view.id = "shortlist";

			break;
		}

		case 1: {
			refreshAccountCount(2);
			$.shortlist.hasChild = false;
			obj.view.id = "shortlist";

			break;
		}

		case 2: {
			refreshAccountCount(2);
			$.shortlist.hasChild = false;
			obj.view.id = "shortlist";

			break;
		}

		case 3: {
			refreshAccountCount(2);
			$.shortlist.hasChild = false;
			obj.view.id = "shortlist";
			break;
		}

		case 4: {
			refreshAccountCount(2);
			$.shortlist.hasChild = false;
			obj.view.id = "shortlist";
			break;
		}
		case 5: {
			refreshAccountCount(2);
			$.shortlist.hasChild = false;
			obj.view.id = "shortlist";
			break;
		}

		};

		changeScreen(obj);

	} catch(exp) {
		Ti.API.info('expection--->' + exp.message);
	}

}

function cleanUp() {

	var f = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'invoice.pdf');

	if (f.exists()) {
		var success = f.deleteFile();
		// Ti.API.info((success == true) ? 'success' : 'fail');
		// outputs 'success'
	} else {
		//Ti.API.info('else');
	}

	Alloy.Globals.navWindowObject.pop();
	Alloy.Globals.popWindowInNav();
	//$.myaccount.removeAllChildren();
	//$.destory();
	$.myaccount.remove($.myaccount_photo_container);
	$.myaccount.remove($.myaccount_detail_container);

	$.myaccount_photo_container.removeAllChildren();

	$.info.removeAllChildren();
	//$.orders.removeAllChildren();
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

exports.enableAppointment = enableAppointment;

