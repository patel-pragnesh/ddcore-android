var args = arguments[0] || {};

googleAnalyticsScreen("PRIVACY POLICY");

touchEffect.createTouchEffect($.refundCloseLbl, "#a6ffffff", "#ffffff");

$.questions.addEventListener('click', function(e) {
    /*
    _.each($.questions.getChildren(), function(value, key) {
    if (value.children[1].height != 0) {
    value.children[1].height = 0;
    value.children[0].children[1].text = Alloy.Globals.icon.downArrow;
    }
    });

    switch(e.source.type) {
    case "question" : {
    e.source.parent.children[1].height = Titanium.UI.SIZE;
    e.source.children[1].text = Alloy.Globals.icon.upArrow;
    break;
    }
    case "questionText" : {
    e.source.parent.parent.children[1].height = Titanium.UI.SIZE;
    e.source.parent.children[1].text = Alloy.Globals.icon.upArrow;
    break;
    }
    }
    */
    //	Ti.API.info('type-->' + e.source.type);

    switch(e.source.type) {
    case "questionText" : {
        //Ti.API.info('inside ?');
        _.each($.questions.getChildren(), function(value, key) {
            if (value.children[1].height != 0) {
                value.children[1].height = 0;
                value.children[0].children[1].text = Alloy.Globals.icon.downArrow;

            }
            value.children[0].type = "questionText";
        });

        e.source.parent.parent.children[1].height = Titanium.UI.SIZE;
        e.source.parent.children[1].text = Alloy.Globals.icon.upArrow;
        e.source.type = "expand";
        break;
    }
    case "expand": {
        //Ti.API.info('inside expand');
        //e.source.type = "question";
        _.each($.questions.getChildren(), function(value, key) {
            //Ti.API.info('value'+JSON.stringify(value));
            //	Ti.API.info('value type = ' + value.children[0].type);
            if (value.children[1].height != 0) {
                value.children[1].height = 0;
                value.children[0].children[1].text = Alloy.Globals.icon.downArrow;

            }
            value.children[0].type = "questionText";
        });
        e.source.type = "questionText";
        break;
    }

    }

});

$.refundCloseLbl.addEventListener('click', destroyWindow);

function destroyWindow(e) {

    Alloy.Globals.popWindowInNav();
    $.privacyPolicy.close();

   $.removeListener();

    $.superView.removeAllChildren();
    args = {};

    $.destroy();

}
