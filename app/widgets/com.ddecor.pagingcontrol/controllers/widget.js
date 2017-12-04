var args = arguments[0] || {};

//Ti.API.info('get style values--->' +JSON.stringify(args));

// xml boolean args is string ("false" == true)
_.each(['tabs', 'findScrollableView'], function(key) {

	if (!_.has(args, key)) {
		return;
	}

	try {
		args[key] = JSON.parse(args[key]);
	} catch (e) {
		delete args[key];
		Ti.API.error("Unable to set argument '" + key + "'. It must be boolean.");
	}
});

// fill undefined args with defaults
_.defaults(args, {
	dividerColor : "#a0a0a0", //"#cacaca",//"#ccc",
	indicatorColor : "#e64e48", //"#000",
	indicatorHeight : "6px", //5
	tabs : false,
	scrollOffset : 40,
	height : args.tabs ? 42 : 5, //args.tabs ? 36 : 5, //args.tabs ? 48 : 5,
	width : Ti.UI.FILL,
	findScrollableView : true,
	color : "#a0a0a0", //"#fff",//"#000",
	font : {
		fontSize : "12dp",
		fontFamily : "futura_lt_bt_light-webfont",
		//fontWeight : 'bold'
	}
});

// additional adjustments for tabs
if (args.tabs) {
	args.tabs = {
		dividerColor : args.dividerColor,
		width : args.tabWidth,
		backgroundColor : args.backgroundColor,
		activeColor : "#e64e48", //args.activeColor,
		color : args.color,
		font : args.font
	};
}

// apply properties of Ti.UI.View that can be applied to paging control view
["backgroundColor", "backgroundImage", "backgroundLeftCap", "backgroundRepeat", "backgroundTopCap", "borderRadius", "borderWidth", "bottom", "height", "horizontalWrap", "left", "opacity", "right", "top", "visible", "width", "zIndex"].forEach(function(prop) {
	_.has(args, prop) && ($.pagingcontrol[prop] = args[prop]);
});

// NOTE: THIS DOES NOT WORK ANYMORE WITH ALLOY 1.4.0
// try to find scrollable view as child of parent
// this should work, if pagingcontrol is scrollable view have the same parent
// otherwise you can pass it with args or setScrollableView
if (args.__parentSymbol && args.findScrollableView) {
	args.__parentSymbol.children.length > 0 && ($.scrollableView = _.find(args.__parentSymbol.children, function(child) {
		return child.apiName === "Ti.UI.ScrollableView";
	}));
}

// assign passed reference of scrollable view
(_.has(args, "scrollableView")) && ($.scrollableView = args.scrollableView);

if ($.scrollableView) {
	postLayout(init);
}

/**
 * calls back after postlayout
 * @param {Function} callback
 * @param {Boolean} orientation change  wether called from oc callback
 */
function postLayout(callback, oc) {

	if (!oc && $.pagingcontrol.size.width) {
		callback();
	} else {
		// wait for postlayout event to get the pagingcontrol size
		$.pagingcontrol.addEventListener('postlayout', function onPostLayout(evt) {

			// callback
			callback();

			// remove eventlistener
			evt.source.removeEventListener('postlayout', onPostLayout);
		});
	}
}

/**
 * initialization method
 */
function init() {

	if (args.tabs) {

		// create tabs
		$.tabsCtrl = Widget.createController('tabs', {
			tabs : args.tabs,
			titles : _.map($.scrollableView.getViews(), function(v) {
				//Ti.API.info('get widget title************* : ' +v.title);
				return v.title;
			})
		});

		// add tabs
		$.pagingcontrol.add($.tabsCtrl.getView());

		// add bottom border
		$.pagingcontrol.add(Ti.UI.createView({
			width : Ti.UI.FILL,
			height : 2,
			bottom : 0,
			backgroundColor : "transparent"//'#ededed'
		}));

		// add tab select listener
		$.tabsCtrl.on('select', function(e) {
			$.trigger('select', {
				tab : e.tab,
				view : e.view
			});
			$.scrollableView.currentPage = e.tab;
			$.indicator.setLeft(e.tab * $.iWidth);
		});
	}

	// create the indicator view
	$.indicator = Ti.UI.createView({
		backgroundColor : args.indicatorColor,
		height : args.indicatorHeight,
		width : Ti.UI.SIZE,
		//bottom: 0,
		bottom : 3,
		left : 0,
		zIndex : 2
	});

	adjustePositions();

	// add the indicator
	$.pagingcontrol.add($.indicator);

	// remove events before adding to scrollable view
	$.scrollableView.removeEventListener('scroll', onScroll);
	$.scrollableView.removeEventListener('scrollend', onScrollEnd);
	Ti.Gesture.removeEventListener('orientationchange', onOrientationChange);

	// add scroll listener to scrollable view
	$.scrollableView.addEventListener('scroll', onScroll);
	$.scrollableView.addEventListener('scrollend', onScrollEnd);
	Ti.Gesture.addEventListener('orientationchange', onOrientationChange);
}

/**
 * Callback for scroll event
 */
function onScroll(e) {

	// restrict this to $.scrollableView to support nesting scrollableViews
	if (e.source !== $.scrollableView)
		return;

	// update the indicator position
	$.indicator.setLeft(e.currentPageAsFloat * $.iWidth);

	args.tabs && updateOffset(e.currentPageAsFloat);

	//Ti.API.info('scroll ******');
}

/**
 * Callback for scrollend event
 */
var previousPage = null;

/*Note: do not change the order */
//var pageName=["myaccount_info","myaccount_orders","","savedviews","mystyle","myappoinments"];

function onScrollEnd(e) {
	if (previousPage !== e.currentPage) {
		$.tabsCtrl.selectColor(e.currentPage);
		previousPage = e.currentPage;
		// Ti.API.info('e--->'+previousPage);
		//Ti.API.info('on scroll end**********');
	}
}

/**
 * sets the tab bar offset
 * @param {Number} index
 */
function updateOffset(index) {

	if (args.tabWidth === 'auto') {
		return;
	}

	var width = $.pagingcontrol.size.width,
	    tabsWidth = $.tabsCtrl.getWidth(),
	    maxOffset = tabsWidth - width,
	    tabSpace = tabsWidth * index / $.scrollableView.views.length,
	    measurement = require('alloy/measurement');

	if (width < tabsWidth) {

		var offset = tabSpace - args.scrollOffset,
		    offsetDp = offset < maxOffset ? offset : maxOffset,
		    newOffset = OS_IOS ? (offsetDp < 0 ? 0 : offsetDp) : measurement.dpToPX(offsetDp);

		$.pagingcontrol.setContentOffset({
			x : newOffset,
			y : 0
		}, {
			animated : false
		});
	}
}

/**
 * Callback for orientationchange event
 */
function onOrientationChange(e) {

	postLayout(function() {
		$.tabsCtrl.updateWidth();
		adjustePositions();
	}, true);
}

/**
 * Adjust initial layout positions
 */
function adjustePositions() {
	var totalWidth = args.tabs ? $.tabsCtrl.getWidth() : $.pagingcontrol.size.width;
	$.iWidth = Math.floor(totalWidth / $.scrollableView.views.length);
	$.indicator.setWidth($.iWidth);
	$.indicator.setLeft($.scrollableView.getCurrentPage() * $.iWidth);
}

/**
 * if you need to set it in the controller
 * @param {Ti.UI.Scrollableview} scrollable view
 */
exports.setScrollableView = function(_sv) {
	if ($.scrollableView) {
		Ti.API.error("Already initialized");
		return;
	}
	$.scrollableView = _sv;
	postLayout(init);
};

/**
 * removes orientationchange Listener
 */
exports.cleanup = function() {
	Ti.Gesture.removeEventListener('orientationchange', onOrientationChange);
	args.tabs && $.tabsCtrl && $.tabsCtrl.off();
};

exports.refresh = function() {
	Ti.API.info('into refresh');
	$.pagingcontrol.removeAllChildren();
	exports.cleanup();
	init();
};

exports.updateLabelTitle = function(index, title) {

	if ($.tabsCtrl != undefined) {
		$.tabsCtrl.updateTitle(index, title);
	} else {
		Ti.API.info('into widget else condition');
		exports.refresh();
	}
};

