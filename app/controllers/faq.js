var args = arguments[0] || {};

googleAnalyticsScreen("FAQ");

touchEffect.createTouchEffect($.faqCloseLbl, "#a6ffffff", "#ffffff");
//"Call +91 99805 99805 from 07.30 hrs IST to 20.30 hrs IST or email enquiry@ddecor.com";
var text = "Call 1800 103 9008 from 10.30 AM to 07.00 PM or email enquiry@ddecor.com";

$.answerContact.attributedString = Titanium.UI.createAttributedString({
	text : text,
	attributes : [{
		type : Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
		value : "#e65e48",
		range : [text.indexOf('enquiry@ddecor.com'), ("enquiry@ddecor.com").length]
	}]
});

$.answerTextSupp.attributedString = Titanium.UI.createAttributedString({
	text : "You can track your order by keying in your order number in the 'Track Order' option. Or, simply send an email to enquiry@ddecor.com.",
	attributes : [{
		type : Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
		value : "#e65e48",
		range : [("You can track your order by keying in your order number in the 'Track Order' option. Or, simply send an email to enquiry@ddecor.com.").indexOf('enquiry@ddecor.com'), ("enquiry@ddecor.com").length]
	}]
});

$.answerTextSupp1.attributedString = Titanium.UI.createAttributedString({
	text : "Please write to our Support Executive at enquiry@ddecor.com. We will be happy to help you with your order.",
	attributes : [{
		type : Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
		value : "#e65e48",
		range : [("Please write to our Support Executive at enquiry@ddecor.com. We will be happy to help you with your order.").indexOf('enquiry@ddecor.com'), ("enquiry@ddecor.com").length]
	}]
});

$.answerTextSupp2.attributedString = Titanium.UI.createAttributedString({
	text : "Currently, D’decor only ships domestic orders. We will be starting International shipping soon. If you have a specific request, please write to enquiry@ddecor.com for further information.",
	attributes : [{
		type : Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
		value : "#e65e48",
		range : [("Currently, D’decor only ships domestic orders. We will be starting International shipping soon. If you have a specific request, please write to enquiry@ddecor.com for further information.").indexOf('enquiry@ddecor.com'), ("enquiry@ddecor.com").length]
	}]
});

$.answerTextSupp3.attributedString = Titanium.UI.createAttributedString({
	text : "Sorry, we do not ship to Post Office Boxes. If you have a specific request, please write to enquiry@ddecor.com for further information.",
	attributes : [{
		type : Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
		value : "#e65e48",
		range : [("Sorry, we do not ship to Post Office Boxes. If you have a specific request, please write to enquiry@ddecor.com for further information.").indexOf('enquiry@ddecor.com'), ("enquiry@ddecor.com").length]
	}]
});

$.answerTextSupp4.attributedString = Titanium.UI.createAttributedString({
	text : "Call 1800 103 9008 anytime between 10.30 AM to 7.00 PM or you could send us an email on enquiry@ddecor.com for further information.",
	attributes : [{
		type : Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
		value : "#e65e48",
		range : [("Call 1800 103 9008 anytime between 10.30 AM to 7.00 PM or you could send us an email on enquiry@ddecor.com for further information.").indexOf('enquiry@ddecor.com'), ("enquiry@ddecor.com").length]
	}]
});

var catArray = ["GENERAL", "ORDERS", "PAYMENT", "SHIPPING", "RETURNS"];

function setCategories() {
	_.each(catArray, function(value, key) {
		var categoryLbl = $.UI.create("Label", {
			classes : ['fontMedium', 'dropDownLbl'],
			width : Titanium.UI.FILL,
			text : value,
			touchEnabled : true
		});
		$.faqDropDownScroll.add(categoryLbl);
	});
}

setCategories();

var faqFlag = true;

$.faqDropDown.addEventListener('click', function(e) {
	if (faqFlag) {
		$.faqDropDown.height = Titanium.UI.SIZE;
		$.faqDropDownScroll.height = "150";
		faqFlag = false;
	} else {
		if (e.source.text) {
			$.faqLbl.text = e.source.text;
			switch(e.source.text) {
			case "GENERAL": {
				$.generalQuestions.visible = true;
				$.orderQuestions.visible = false;
				$.paymentQuestions.visible = false;
				$.shippingQuestions.visible = false;
				$.returnsQuestions.visible = false;
				break;
			}
			case "ORDERS": {
				$.generalQuestions.visible = false;
				$.orderQuestions.visible = true;
				$.paymentQuestions.visible = false;
				$.shippingQuestions.visible = false;
				$.returnsQuestions.visible = false;
				break;
			}
			case "PAYMENT": {
				$.generalQuestions.visible = false;
				$.orderQuestions.visible = false;
				$.paymentQuestions.visible = true;
				$.shippingQuestions.visible = false;
				$.returnsQuestions.visible = false;
				break;
			}
			case "SHIPPING": {
				$.generalQuestions.visible = false;
				$.orderQuestions.visible = false;
				$.paymentQuestions.visible = false;
				$.shippingQuestions.visible = true;
				$.returnsQuestions.visible = false;
				break;
			}
			case "RETURNS": {
				$.generalQuestions.visible = false;
				$.orderQuestions.visible = false;
				$.paymentQuestions.visible = false;
				$.shippingQuestions.visible = false;
				$.returnsQuestions.visible = true;
				break;
			}
			}
		}
		$.faqDropDown.height = "40dp";
		faqFlag = true;
	}
});

$.generalQuestions.visible = true;
$.orderQuestions.visible = false;
$.paymentQuestions.visible = false;
$.shippingQuestions.visible = false;
$.returnsQuestions.visible = false;

$.generalQuestions.addEventListener('click', function(e) {
	manageAccordion(e, $.generalQuestions);
});

$.orderQuestions.addEventListener('click', function(e) {
	manageAccordion(e, $.orderQuestions);
});

$.paymentQuestions.addEventListener('click', function(e) {
	manageAccordion(e, $.paymentQuestions);
});

$.shippingQuestions.addEventListener('click', function(e) {
	manageAccordion(e, $.shippingQuestions);
});

$.returnsQuestions.addEventListener('click', function(e) {
	manageAccordion(e, $.returnsQuestions);
});

function manageAccordion(e, view) {
	//Ti.API.info('e.source.type = ' + e.source.type);
	// _.each(view.getChildren( ), function(value, key){
	// if (value.children[1].height != 0){
	// value.children[1].height = 0;
	// value.children[0].children[1].text = Alloy.Globals.icon.downArrow;
	// }
	// });

	switch(e.source.type) {
	case "question" : {

		_.each(view.getChildren(), function(value, key) {
			//Ti.API.info('value type 1 = '+value.children[0].type);
			if (value.children[1].height != 0) {
				value.children[1].height = 0;
				value.children[0].children[1].text = Alloy.Globals.icon.downArrow;
			}
			value.children[0].type = "question";
		});

		e.source.parent.children[1].height = Titanium.UI.SIZE;
		e.source.children[1].text = Alloy.Globals.icon.upArrow;
		//e.source.parent.parent.children[1].height = Titanium.UI.SIZE;
		//e.source.parent.children[1].text = Alloy.Globals.icon.upArrow;
		e.source.type = "expand";
		break;
	}
	// case "questionText" : {
	// e.source.parent.parent.children[1].height = Titanium.UI.SIZE;
	// e.source.parent.children[1].text = Alloy.Globals.icon.upArrow;
	// break;
	// }
	case "expand": {
		_.each(view.getChildren(), function(value, key) {
			//Ti.API.info('value type 2 = '+value.children[0].type);
			if (value.children[1].height != 0) {
				value.children[1].height = 0;
				value.children[0].children[1].text = Alloy.Globals.icon.downArrow;
			}
			value.children[0].type = "question";
		});
		e.source.type = "question";
		break;
	}
	}
}

$.faqCloseLbl.addEventListener('click', goToBack);

function goToBack() {
	Alloy.Globals.popWindowInNav();
	$.faq.close();
}

function destroyWindow(e) {
    Ti.API.info('************** into clear Memory ***************');
    $.removeListener();
	$.faq.remove($.superView);
	$.superView.removeAllChildren();
	$.destroy();
}
