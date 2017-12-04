// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var requestMethod = args.requestMethod;
var requestParam = args.requestParam;
var _successCallback = args.successCallback;
var _errorCallback = args.errorCallback;
var windowContainer = args.windowContainer;
//var _showLoader = args.showLoader;
var _showLoader = (args.showLoader || undefined);

$.msgContainer.setText(args.message);

//$.productName.setText((args.productName).toUpperCase());
$.productName.setText((!isNullVal(args.productName)) ? args.productName.toUpperCase() : args.productName);

touchEffect.createTouchEffect($.close_btn, "#a6ffffff", "#fff");
touchEffect.createTouchEffect($.action1, "#a6ffffff", "#fff");
touchEffect.createTouchEffect($.action2, "#a6ffffff", "#fff");

$.close_btn.addEventListener("click", closeView);
$.action1.addEventListener("click", closeView);
$.action2.addEventListener("click", closeConfirmation);
windowContainer.addEventListener("android:back", closeView);

function closeView() {

   

    $.removeListener();
    $.close_btn.removeEventListener("click", closeView);
    $.action1.removeEventListener("click", closeView);
    $.action2.removeEventListener("click", closeConfirmation);
    windowContainer.removeEventListener("android:back", closeView);

    hideShowView($.confirmation);

    setTimeout(function() {
        windowContainer.remove($.confirmation);
        $.confirmation.removeAllChildren();
        $.destroy();
    }, 500);

}

function closeConfirmation() {

    if (_showLoader != undefined) {

        //_showLoader(windowContainer);
        showLoader(windowContainer);
    }

    Alloy.Globals.webServiceCall(requestMethod, requestParam, successCallback, errorCallback, "POST", windowContainer);
}

function successCallback(response) {
    //hideFullLoader();
    hideLoader();
    _successCallback(response);
    closeView();
}

function errorCallback(response) {
    hideLoader();
    _errorCallback(response);
}

