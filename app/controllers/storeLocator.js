var args = arguments[0] || {};

var Map = require('ti.map');

/*Attribute String*/

/*Attribute String*/

var coord = Alloy.Globals.getCurrentLocation();


var mountainView = Map.createAnnotation({
    latitude : coord.latitude, //33.74511,
    longitude : coord.longitude, //-84.38993,
    title : "Current Location",
    subtitle : 'Test',
    pincolor : Map.ANNOTATION_RED,
    myid : 1 // Custom property to uniquely identify this annotation.
});


var mapview = Map.createView({
    mapType : Map.NORMAL_TYPE,
    region : {
        latitude : coord.latitude, //33.74511,
        longitude : coord.longitude, //-84.38993,
        latitudeDelta : 0.01,
        longitudeDelta : 0.01
    },
    animate : true,
    regionFit : true,
    userLocation : true,
    annotations : [mountainView]
});

$.map_container.add(mapview);

function enableSearch() {
    $.searchField.visible = true;
    $.screenLbl.visible = false;
    $.searchField.focus();
}

function toggelDetailList() {

    //Ti.API.info('toggel 1');

    if ($.store_list.getHeight() === "300dp") {
        $.store_list.animate({
            height : "40dp",
            duration : 500
        });
        setTimeout(function() {
            $.store_list.setHeight("40dp");
            $.filterLbl.hide();
            $.store_list_container.setVisible(false);
        }, 500);
        $.storeDetails.setBackgroundColor("#fff");
        $.storeDetails.setColor("#A4A4A4");
        $.storeDetails.setBorderColor("#A4A4A4");
    } else {
        $.store_list.animate({
            height : "300dp",
            duration : 500
        });

        setTimeout(function() {
            $.store_list.setHeight("300dp");
            $.filterLbl.show();
            $.store_list_container.setVisible(true);
        }, 500);
        $.storeDetails.setBackgroundColor(Alloy.Globals.labelTitleColor);
        $.storeDetails.setColor("#000");
        $.storeDetails.setBorderColor("transparent");
    }

    //Ti.API.info('toggel 2');

}

function openFilterList() {
    $.filterLbl.hide();
    $.filterContatiner.visible = true;
    $.filterListContainer.animate({
        height : "200dp",
        duration : 500
    });
    $.filterListContainer.setHeight("200dp");
}

function closeFilterList() {

    $.filterListContainer.animate({
        height : "0dp",
        duration : 500
    });
    setTimeout(function() {
        $.filterContatiner.setVisible(false);
        $.filterLbl.show();
    }, 500);
    $.filterListContainer.setHeight("0dp");
}

function goToBack() {
    Alloy.Globals.popWindowInNav();
    $.storeLocator.close();
}

function destroyWindow(e) {
    $.storeLocator.removeAllChildren();
    $.destroy();
}
