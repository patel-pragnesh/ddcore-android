var args = arguments[0] || {};

googleAnalyticsScreen("RETURNS / REFUND POLICY");

touchEffect.createTouchEffect($.refundCloseLbl, "#a6ffffff", "#ffffff");

$.questions.addEventListener('click', function(e) {
	//Ti.API.info('e.source.type = ' + e.source.type);
	//Ti.API.info('e====' + JSON.stringify(e));

	// _.each($.questions.getChildren( ), function(value, key){
	// if (value.children[1].height != 0){
	// value.children[1].height = 0;
	// value.children[0].children[1].text = Alloy.Globals.icon.downArrow;
	// }
	// });
	//Ti.API.info('e.source.parent.children[1].height = ' + e.source.parent.children[1].height);
	switch(e.source.type) {
	case "question" : {
		//Ti.API.info('inside ?');
		_.each($.questions.getChildren(), function(value, key) {
			if (value.children[1].height != 0) {
				value.children[1].height = 0;
				value.children[0].children[1].text = Alloy.Globals.icon.downArrow;
				
			}
			value.children[0].type = "question";
		});

		
		e.source.parent.children[1].height = Titanium.UI.SIZE;
		e.source.children[1].text = Alloy.Globals.icon.upArrow;
		e.source.type = "expand";
		break;
	}
	case "expand": {
		//Ti.API.info('inside expand');
		//e.source.type = "question";
		_.each($.questions.getChildren(), function(value, key) {
			//Ti.API.info('value'+JSON.stringify(value));
			//Ti.API.info('value type = '+value.children[0].type);
			if (value.children[1].height != 0) {
				value.children[1].height = 0;
				value.children[0].children[1].text = Alloy.Globals.icon.downArrow;
				
			}
			value.children[0].type = "question";
		});
		e.source.type = "question";
		break;
	}
	// case "questionText" : {
	// e.source.parent.parent.children[1].height = Titanium.UI.SIZE;
	// e.source.parent.children[1].text = Alloy.Globals.icon.upArrow;
	// break;
	// }
	}
});

$.refundCloseLbl.addEventListener('click', goToBack);

function goToBack() {
	Alloy.Globals.popWindowInNav();
	$.returnRefund.close();
}

function destroyWindow(e) {
	$.returnRefund.removeAllChildren();
	$.destroy();
}