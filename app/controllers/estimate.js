var args = arguments[0] || {};
//Ti.API.info('args = ' + JSON.stringify(args));

googleAnalyticsScreen('ESTIMATE CALCULATOR');

isAppointment = false;

touchEffect.createTouchEffect($.getQuote, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.refreshIcon, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.estimateCloseLbl, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.whr2Buy1, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.freeHomeConsultation1, "#a6e65e48", "#e65e48");

$.superView.addEventListener("click", function(e) {
	if (e.source.type != "TextField") {
		$.textForWidth.blur();
		$.textForHeight.blur();
	}
});
//Ti.API.info('args.IS_EVO = ' + args.IS_EVO + "args.IS_CLASSIC = " + args.IS_CLASSIC);
var measurement = ["MILLIMETER", "CENTIMETER", "INCH", "FEET"];
var operations = ["MANUAL", "MOTORISED"];
//var cassetteObj = (args.IS_EVO && args.IS_CLASSIC) ? ["EVO", "CLASSIC"] : (args.IS_EVO) ? ["EVO"] : ["CLASSIC"];

if (args.IS_EVO && args.IS_CLASSIC) {
	var cassetteObj = ["EVO", "CLASSIC"];
	$.clothLbl.text = "EVO";
} else {
	if (args.IS_EVO) {
		var cassetteObj = ["EVO"];
		$.clothLbl.text = "EVO";
	} else if (args.IS_CLASSIC) {
		var cassetteObj = ["CLASSIC"];
		$.clothLbl.text = "CLASSIC";
	} else {
		var cassetteObj = [];
		$.clothLbl.text = "";
	}
}

//Ti.API.info('cassetteObj = ' + JSON.stringify(cassetteObj));

function setMeasurements() {
	_.each(measurement, function(value, key) {
		var categoryLbl = $.UI.create("Label", {
			classes : ['fontMedium', 'dropDownLbl'],
			width : Titanium.UI.FILL,
			text : value,
			touchEnabled : true
		});
		$.measurementScroll.add(categoryLbl);
	});
}

setMeasurements();

function setFitting() {
	_.each(operations, function(value, key) {
		var categoryLbl = $.UI.create("Label", {
			classes : ['fontMedium', 'dropDownLbl'],
			width : Titanium.UI.FILL,
			text : value,
			touchEnabled : true
		});
		$.fittingScroll.add(categoryLbl);
	});
}

setFitting();

function setClothing() {
	_.each(cassetteObj, function(value, key) {
		//Ti.API.info('value = ' + value);
		var categoryLbl = $.UI.create("Label", {
			classes : ['fontMedium', 'dropDownLbl'],
			width : Titanium.UI.FILL,
			text : value,
			touchEnabled : true
		});
		$.clothScroll.add(categoryLbl);
	});
}

setClothing();

var measurementFlag = true;
var fittingFlag = true;
var clothFlag = true;

$.measurementDropDown.addEventListener('click', function(e) {
	if (measurementFlag) {
		$.measurementDropDown.height = Titanium.UI.SIZE;
		$.measurementDropDown.backgroundColor = "#404040";
		$.measurementLbl.parent.children[1].text = Alloy.Globals.icon.expand;
		$.measurementScroll.height = "150";
		measurementFlag = false;
	} else {
		if (e.source.text) {
			//Ti.API.info('e.source.text = ' + e.source.text);
			$.measurementLbl.text = e.source.text;
			onMeasurementChange(e.source.text);
		}
		$.measurementLbl.parent.children[1].text = Alloy.Globals.icon.expandFill;
		$.measurementDropDown.backgroundColor = "transparent";
		$.measurementDropDown.height = "40dp";
		measurementFlag = true;
	}
});

function onMeasurementChange(unit) {
	switch(unit) {
	case "MILLIMETER": {
		$.maxwidth.text = "MAX " + args.MAX_WIDTH + " MM";
		$.maxHeight.text = "MAX " + args.MAX_DROP + " MM";
		var textWidth = conversion($.textForWidth.getValue(), $.textForWidth.unit, "MILLIMETER");
		var textHeight = conversion($.textForHeight.getValue(), $.textForHeight.unit, "MILLIMETER");
		$.textForWidth.value = (Math.round(parseFloat(textWidth)*100)/100);
		$.textForHeight.value = (Math.round(parseFloat(textHeight)*100)/100);
		$.textForWidth.unit = "MILLIMETER";
		$.textForHeight.unit = "MILLIMETER";
		break;
	}
	case "CENTIMETER": {
		$.maxwidth.text = "MAX " + (Math.round(parseFloat(mmToCM(args.MAX_WIDTH))*100)/100) + " CM";
		$.maxHeight.text = "MAX " + (Math.round(parseFloat(mmToCM(args.MAX_DROP))*100)/100) + " CM";

		var textWidth = conversion($.textForWidth.getValue(), $.textForWidth.unit, "CENTIMETER");
		var textHeight = conversion($.textForHeight.getValue(), $.textForHeight.unit, "CENTIMETER");

		$.textForWidth.value = (Math.round(parseFloat(textWidth)*100)/100);
		$.textForHeight.value = (Math.round(parseFloat(textHeight)*100)/100);
		$.textForWidth.unit = "CENTIMETER";
		$.textForHeight.unit = "CENTIMETER";
		break;
	}
	case "INCH": {
		$.maxwidth.text = "MAX " + (Math.round(parseFloat(mmToInch(args.MAX_WIDTH))*100)/100) + " IN";
		$.maxHeight.text = "MAX " + (Math.round(parseFloat(mmToInch(args.MAX_DROP))*100)/100) + " IN";

		var textWidth = conversion($.textForWidth.getValue(), $.textForWidth.unit, "INCH");
		var textHeight = conversion($.textForHeight.getValue(), $.textForHeight.unit, "INCH");
		$.textForWidth.value = (Math.round(parseFloat(textWidth)*100)/100);
		$.textForHeight.value = (Math.round(parseFloat(textHeight)*100)/100);
		$.textForWidth.unit = "INCH";
		$.textForHeight.unit = "INCH";
		break;
	}
	case "FEET": {
		$.maxwidth.text = "MAX " + (Math.round(parseFloat(mmToFeet(args.MAX_WIDTH))*100)/100) + " FT";
		$.maxHeight.text = "MAX " + (Math.round(parseFloat(mmToFeet(args.MAX_DROP))*100)/100) + " FT";

		var textWidth = conversion($.textForWidth.getValue(), $.textForWidth.unit, "FEET");
		var textHeight = conversion($.textForHeight.getValue(), $.textForHeight.unit, "FEET");

		$.textForWidth.value = (Math.round(parseFloat(textWidth)*100)/100);
		$.textForHeight.value = (Math.round(parseFloat(textHeight)*100)/100);
		$.textForWidth.unit = "FEET";
		$.textForHeight.unit = "FEET";
		break;
	}
	};
	//Ti.API.info('conversion(args.MAX_WIDTH, "", $.textForWidth.unit)= ' + conversion(args.MAX_WIDTH, "", $.textForWidth.unit));
	
	
	if (parseFloat($.textForWidth.getValue()) > conversion(args.MAX_WIDTH, "", $.textForWidth.unit) || parseFloat($.textForWidth.getValue()) < conversion(250, "", $.textForWidth.unit)) {
		showAlert($.estimate, "Width cannot be less than " + conversion(250, "", $.textForWidth.unit) + " and more than " + conversion(args.MAX_WIDTH, "", $.textForWidth.unit) + " " + $.textForWidth.unit + ".");
		return;
	}
	if (parseFloat($.textForHeight.getValue()) > conversion(args.MAX_DROP, "", $.textForHeight.unit) || parseFloat($.textForHeight.getValue()) < conversion(250, "", $.textForHeight.unit)) {
		showAlert($.estimate, "Height cannot be less than " + conversion(250, "", $.textForHeight.unit) + " and more than " + conversion(args.MAX_DROP, "", $.textForHeight.unit) + " " + $.textForWidth.unit + ".");
		return;
	}
}

function conversion(value, fromUnit, toUnit) {
	switch(fromUnit) {
	case "MILLIMETER": {
		Ti.API.info('millimeter1');
		value = value;
		break;
	}
	case "CENTIMETER": {
		value = cmToMM(value);
		break;
	}
	case "INCH": {
		value = inchToMM(value);
		break;
	}
	case "FEET": {
		value = feetToMM(value);
		break;
	}
	};
	switch(toUnit) {
	case "MILLIMETER": {
		Ti.API.info('millimeter');
		return value;
		break;
	}
	case "CENTIMETER": {
		return mmToCM(value);
		break;
	}
	case "INCH": {
		return mmToInch(value);
		break;
	}
	case "FEET": {
		return mmToFeet(value);
		break;
	}
	};
}

function inchToMM(value) {
	return parseInt(Math.round(value * 25.4));
}

function cmToMM(value) {
	return parseInt(Math.round(value * 10));
}

function feetToMM(value) {
	return parseInt(Math.round((value * 304.8)));
}

function mmToInch(value) {
	return (Math.round(parseFloat((value / 25.4))*100)/100);
}

function mmToCM(value) {
	return value / 10;
}

function mmToFeet(value) {
	return (Math.round(parseFloat((value / 304.8))*100)/100);
}

$.fittingDropDown.addEventListener('click', function(e) {
	if (fittingFlag) {
		$.fittingDropDown.height = Titanium.UI.SIZE;
		$.fittingDropDown.backgroundColor = "#404040";
		$.fittingScroll.height = Titanium.UI.SIZE;
		$.fittingLbl.parent.children[1].text = Alloy.Globals.icon.expand;
		fittingFlag = false;
	} else {
		if (e.source.text) {
			//Ti.API.info('filter option e.source.text = ' + e.source.text);
			$.fittingLbl.text = e.source.text;
		}
		$.fittingLbl.parent.children[1].text = Alloy.Globals.icon.expandFill;
		$.fittingDropDown.backgroundColor = "transparent";
		$.fittingDropDown.height = "40dp";
		fittingFlag = true;
	}
});

$.clothDropDown.addEventListener('click', function(e) {
	if (clothFlag) {
		$.clothDropDown.height = Titanium.UI.SIZE;
		$.clothDropDown.backgroundColor = "#404040";
		$.clothScroll.height = Titanium.UI.SIZE;
		$.clothLbl.parent.children[1].text = Alloy.Globals.icon.expand;
		clothFlag = false;
	} else {
		if (e.source.text) {
			//Ti.API.info('evo e.source.text = ' + e.source.text);
			$.clothLbl.text = e.source.text;
		}
		$.clothLbl.parent.children[1].text = Alloy.Globals.icon.expandFill;
		$.clothDropDown.backgroundColor = "transparent";
		$.clothDropDown.height = "40dp";
		clothFlag = true;
	}
});

$.getQuote.addEventListener('click', function(e) {
	if ($.fittingLbl.text == "SELECT OPERATION") {
		showAlert($.estimate, "Please select a operation.");
		return;
	} else if ($.clothLbl.text == "CASSETTE") {
		showAlert($.estimate, "Please select a cassette.");
		return;
	} else if (parseFloat($.textForWidth.getValue()) > conversion(args.MAX_WIDTH, "", $.textForWidth.unit) || parseFloat($.textForWidth.getValue()) < conversion(250, "", $.textForWidth.unit)) {
		showAlert($.estimate, "Width cannot be less than " + conversion(250, "", $.textForWidth.unit) + " and more than " + conversion(args.MAX_WIDTH, "", $.textForWidth.unit) + " " + $.textForWidth.unit + ".");
		return;
	} else if (parseFloat($.textForHeight.getValue()) > conversion(args.MAX_DROP, "", $.textForHeight.unit) || parseFloat($.textForHeight.getValue()) < conversion(250, "", $.textForHeight.unit)) {
		showAlert($.estimate, "Height cannot be less than " + conversion(250, "", $.textForHeight.unit) + " and more than " + conversion(args.MAX_DROP, "", $.textForHeight.unit) + " " + $.textForWidth.unit + ".");
		return;
	} else {
		//Ti.API.info('$.measurementLbl.text = ' + $.measurementLbl.getText());
		//Ti.API.info('$.clothLbl  = ' + $.clothLbl.getText());
		switch($.measurementLbl.getText()) {
		case "MILLIMETER":
			var widthInM = $.textForWidth.getValue() / 1000;
			var dropInM = $.textForHeight.getValue() / 1000;
			var valueInMM = $.textForWidth.getValue();
			break;

		case "CENTIMETER":
			var widthInM = $.textForWidth.getValue() / 100;
			var dropInM = $.textForHeight.getValue() / 100;
			var valueInMM = cmToMM($.textForWidth.getValue());
			break;

		case "INCH":
			var widthInM = $.textForWidth.getValue() / 39.370;
			var dropInM = $.textForHeight.getValue() / 39.370;
			var valueInMM = inchToMM($.textForWidth.getValue());
			break;

		case "FEET":
			var widthInM = $.textForWidth.getValue() / 3.28084;
			var dropInM = $.textForHeight.getValue() / 3.28084;
			var valueInMM = feetToMM($.textForWidth.getValue());
			break;

		}
		var calculatedSize = widthInM * dropInM;
		//Ti.API.info('done' + calculatedSize);
		//Ti.API.info('valueInMM= ' + valueInMM);

		var url = Alloy.Globals.commonUrl.blindsCalculator;

		var data = {
			calculatedSize : calculatedSize,
			blind_type_id : args.BLIND_TYPE_ID,
			blind_fabric_group_id : args.BLIND_FABRIC_GROUP_ID,
			blinds_operation : $.fittingLbl.getText(),
			blinds_category : args.BLIND_CATEGORY,
			blinds_category_id : args.BLIND_CATEGORY_ID,
			blinds_cassette : $.clothLbl.getText(),
			widthInM :(parseFloat(valueInMM) / 1000) 

		};
		var requestParams = JSON.stringify(data);

		Alloy.Globals.webServiceCall(url, requestParams, getBlindsEstimateSuccessCallback, getBlindsEstimateErrorCallback, "POST", $.estimate);

	}

	// if ($.clothLbl.text == "CASSETTE") {
	// showAlert($.estimate, "Please select a cassette.");
	// return;
	// }
	//$.superView.children[2].setVisible(true);
	//$.superView.children[1].setVisible(false);
});

function getBlindsEstimateSuccessCallback(e) {
	try {
		//Ti.API.info('success = ' + JSON.stringify(e));
		if (!isNullVal(e.data)) {
			$.rupies.visible = true;
			$.amountLbl.text = e.data;
		} else {
			$.rupies.visible = false;
			$.amountLbl.text = "";
		}
	} catch(ex) {
		Ti.API.info('catch = ' + ex.message);
	}
}

function getBlindsEstimateErrorCallback(e) {
	//Ti.API.info('error = ' + JSON.stringify(e));
	$.rupies.visible = false;
	$.amountLbl.text = "";
}


$.whr2Buy1.addEventListener('click', function(e) {
	Alloy.Globals.addWindowInNav("findStore");
});

function goToBack() {

	if ($.superView.children[2].getVisible()) {
		$.superView.children[2].setVisible(false);
		$.superView.children[1].setVisible(true);
	} else {
		Alloy.Globals.popWindowInNav();
		$.estimate.close();
	}

}

function refresh() {
	$.textForWidth.setValue(250);
	$.textForHeight.setValue(250);

	$.textForWidth.unit = "MILLIMETER";
	$.textForHeight.unit = "MILLIMETER";

	$.measurementLbl.setText("MILLIMETER");
	$.fittingLbl.setText("SELECT OPERATION");
	//$.clothLbl.setText("CASSETTE");

	if (args.IS_EVO && args.IS_CLASSIC) {

		$.clothLbl.text = "EVO";
	} else {
		if (args.IS_EVO) {

			$.clothLbl.text = "EVO";
		} else if (args.IS_CLASSIC) {

			$.clothLbl.text = "CLASSIC";
		} else {

			$.clothLbl.text = "";
		}
	}

	$.maxwidth.text = "MAX " + args.MAX_WIDTH + " MM";
	$.maxHeight.text = "MAX " + args.MAX_DROP + " MM";
	$.productNameLabel.text = args.productName;
	
	$.amountLbl.text = "";
	$.rupies.visible = false;
}

function navigateToAppointment() {

	if (Ti.App.Properties.getString("access_token")) {

		$.estimate.add(Alloy.createController("bookappoinment", {
			mainWindow : $.estimate,
			isEstimate : true,
			androidBack : updateAndroidEvent
		}).getView());
		isAppointment = true;

		$.removeListener($.estimate, "android:back", goToBack);

	} else {

		Alloy.Globals.addWindowInNav("signIn");

	}

}

function updateAndroidEvent() {
	$.addListener($.estimate, "android:back", goToBack);
	
	//Ti.API.info('into focus event');
}

function clearMemory(){
      
    $.removeListener();
    $.estimate.remove($.superView);
    $.superView.removeAllChildren();
    $.destroy();
}
