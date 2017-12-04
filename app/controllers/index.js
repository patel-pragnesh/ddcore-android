//Alloy.Globals.addWindowInNav("dashboard");

// function dashboardData(){
//
// var url = Alloy.Globals.commonUrl.getBanners;
// var requestParams={};
//
// Alloy.Globals.webServiceCall(url, requestParams, dashboardSuccessCallback, dashboardErrorCallback, "POST");
// }
//
// function dashboardSuccessCallback(e){
// Ti.API.info('dashboard e = '+e);
// Alloy.Globals.addWindowInNav("dashboard",e);
// }
// function dashboardErrorCallback(e){
// Ti.API.info('dashboard error e = '+JSON.stringify(e));
// }
// dashboardData();
//$.index.open();

//Alloy.createController("testBlinds").getView().open();

//Alloy.createController("dashboard").getView().open();
Alloy.Globals.addWindowInNav("dashboard");

// if (!isNullVal(Ti.App.Properties.getString("access_token"))) {
// Alloy.Globals.addWindowInNav("dashboard");
// } else {
// Alloy.createController('signIn').getView().open();
// }

if (Ti.Platform.Android) {
    $.index.fbProxy = Alloy.Globals.fb.createActivityWorker({
        lifecycleContainer : $.index
    });
}

function sendSourceData() {

    var actionLabel,
        mediumLabel,
        campaignLabel = "";

    var InstallReferrer = require('net.pixelfactor.installreferrer');
    var utmSource = InstallReferrer.getUtmSource();
  //  Ti.API.info('utmSource = '+utmSource);
    if (utmSource != null) { 

        utmSource = decodeURIComponent(utmSource);

        var utmParts = utmSource.split('&');

        var utmObject = {};
        utmParts.map(function(part) {

            var currPart = part.split('=');
            //alert("currPart = "+currPart);
            utmObject[currPart[0]] = currPart[1];

            if (currPart[0] == "utm_source") {
                actionLabel = currPart[1];
            }

            if (currPart[0] == "utm_medium") {
                mediumLabel = currPart[1];
            } 
            if (currPart[0] == "utm_campaign") {
                campaignLabel = currPart[1];
            }

        });

        // Ti.API.info('actionLabel = ' + actionLabel + " mediumLabel =" + mediumLabel + " campaignLabel =" + campaignLabel);
         //alert('actionLabel = ' + actionLabel + " mediumLabel =" + mediumLabel + " campaignLabel =" + campaignLabel);
        Ti.App.Properties.setString("actionLabel", actionLabel);
        Alloy.Globals.tracker.trackEvent({
            category : "referrer",
            action : actionLabel, //SourceName (Facebook here)
            label : mediumLabel, //medium name (cpc here)
            customDimension : {
                "2" : actionLabel,
                "3" : mediumLabel,
                "4" : campaignLabel //iprospect_camp here
            }
            
            // category : "referrer124",
            // action : "actionLabel", //SourceName (Facebook here)
            // label : "mediumLabel", //medium name (cpc here)
            // customDimension : {
                // "2" : "actionLabel",
                // "3" : "mediumLabel",
                // "4" : "campaignLabel" //iprospect_camp here
            // }
            
        });

        Ti.App.Properties.setString("checkSource", true);
 
    }

    var bc = Ti.Android.createBroadcastReceiver({
        onReceived : function(e) {
                // Alloy.Globals.tracker.trackEvent({
            // // category : "referrer1",
            // // action : actionLabel, //SourceName (Facebook here)
            // // label : mediumLabel, //medium name (cpc here)
            // // customDimension : {
                // // "2" : actionLabel,
                // // "3" : mediumLabel,
                // // "4" : campaignLabel //iprospect_camp here
            // // }
//             
            // category : "referrer11",
            // action : "actionLabel", //SourceName (Facebook here)
            // label : "mediumLabel", //medium name (cpc here)
            // customDimension : {
                // "2" : "actionLabel",
                // "3" : "mediumLabel",
                // "4" : "campaignLabel" //iprospect_camp here
            // }
//             
        // });

        }
    }); 

    //utm_source%3Dfacebook%26utm_medium%3Dcpc%26utm_term%3Dtest_camp_term%26utm_content%3Dtest_camp_content%26utm_campaign%3Diprospect_camp%26anid%3Dadmob

    Ti.Android.registerBroadcastReceiver(bc, ['com.android.vending.INSTALL_REFERRER']);

}

if (Ti.App.Properties.getString("checkSource") == null) {
   sendSourceData();
}
 
// test svn