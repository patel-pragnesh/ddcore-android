var args = arguments[0] || {};

//args.screenName;

//Ti.API.info('screen name-->' + args.screenName);
touchEffect.createTouchEffect($.myAccountActionBtn, "#a6ffffff", "#ffffff");


$.myAccountActionBtn.myAccountPage = args.screenName;

//Ti.API.info('myAccountActionBtn.myAccountPage-->' + $.myAccountActionBtn.myAccountPage);

switch(args.screenName) {
case "estore": {
	$.myaccountEmptylbl.setText("YOU HAVE NO ORDERS");
	break;
}

case "catalogue": {
	$.myaccountEmptylbl.setText("YOU HAVE NO SHORTLISTED PRODUCTS");
	$.myAccountActionBtn.setText("VIEW OUR CATALOGUE");
	break;
}
case "appointment": {
	//$.myaccountEmptylbl.setText();
	$.myaccountEmptylbl.setText("YOU HAVE NOT REQUESTED FOR ANY APPOINTMENT SO FAR");
	$.myAccountActionBtn.setText("REQUEST AN APPOINMENT");
	break;
}

case "savedviews": {
	$.myaccountEmptylbl.setText("YOU HAVE NO SAVED VIEWED");
	$.myAccountActionBtn.setVisible(false);

	break;
}

};

function myaccountNavigation(e) {
	var id = e.source.myAccountPage;

	switch(id) {
	case "estore": {
		//args.mainWindow.close();
		//Alloy.Globals.addWindowInNav("eshop");
		Alloy.Globals.addWindowInNav("eshop");
		// args.mainWindow.close();
		// Alloy.Globals.popWindowInNav();

		break;
	}

	case "catalogue": {

		//Alloy.Globals.addWindowInNav("signIn");
		//args.mainWindow.close();
		var collectionAllData = {
			
			categoryId : Alloy.Globals.categoryId,
			categoryName : "COLLECTION",
			WindowName : "COLLECTIONS",
			type : "collection",
			block : "Allcollection"
		};

		Alloy.Globals.addWindowInNav("productListing", collectionAllData);
		
		// args.mainWindow.close();
		// Alloy.Globals.popWindowInNav();

		break;
	}
	case "appointment": {
		args.mainWindow.add(Alloy.createController("bookappoinment", {
			mainWindow : args.mainWindow,
			androidBack : args.androidBack,
			closeAndroidBack : args.closeAndroidBack,
			isMainWindow : true,
			loadFirstAppointment : args.loadFirstAppointment,
			refreshCount : args.refreshCount

		}).getView());
		break;
	}

	case "savedviews": {

		break;
	}

	};
}
