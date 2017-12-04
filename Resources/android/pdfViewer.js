var vwPdfContainer = null;

var webView = null;

exports.createPdfViewer = function(url) {
    Ti.API.info("url = " + url);
    vwPdfContainer = null;
    webView = null;
    vwPdfContainer = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        zIndex: 1e5,
        backgroundColor: "#231f20"
    });
    showLoader(vwPdfContainer);
    vwClose = Ti.UI.createLabel({
        width: "50dp",
        height: "50dp",
        color: "#ffffff",
        top: "0dp",
        right: "0dp",
        text: Alloy.Globals.icon.close,
        font: {
            fontFamily: "icomoon",
            fontSize: "20dp"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
    });
    vwPdfContainer.add(vwClose);
    webView = Ti.UI.createWebView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        top: "53dp",
        url: "https://docs.google.com/viewer?url=http://dev.ddecor.com/media/uploads/invoicePDF/invoice_100000048.pdf"
    });
    vwPdfContainer.add(webView);
    var appFile = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, "map.pdf");
    var appfilepath = appFile.nativePath;
    var xhr = Ti.Network.createHTTPClient();
    xhr.onload = function() {
        appFile.write(this.responseData);
        try {
            Ti.Android.currentActivity.startActivity(Ti.Android.createIntent({
                action: Ti.Android.ACTION_VIEW,
                type: "application/pdf",
                data: appfilepath
            }));
        } catch (e) {
            Ti.API.info("error trying to launch activity, e = " + e);
            alert("No PDF apps installed!");
        }
    };
    xhr.onerror = function() {
        alert("Cannot retrieve PDF from web site");
    };
    xhr.timeout = 1e4;
    xhr.open("GET", "http://dev.ddecor.com/media/uploads/invoicePDF/invoice_100000048.pdf");
    xhr.send();
    vwClose.addEventListener("click", function(e) {
        exports.clearPdfMemory();
    });
    webView.addEventListener("beforeload", function(e) {
        Ti.API.info("e = beforeload =" + JSON.stringify(e));
    });
    webView.addEventListener("load", function(e) {
        Ti.API.info("e = load =" + JSON.stringify(e));
        hideLoader(vwPdfContainer);
    });
    webView.addEventListener("error", function(e) {
        Ti.API.info("e = error =" + JSON.stringify(e));
    });
    webView.addEventListener("onLoadResource", function(e) {
        Ti.API.info("e = onLoadResource =" + JSON.stringify(e));
    });
    return vwPdfContainer;
};

exports.clearPdfMemory = function() {
    vwPdfContainer.parent.remove(vwPdfContainer);
    vwPdfContainer = null;
    webView = null;
};