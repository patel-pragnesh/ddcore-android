// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

Alloy.Globals.dimaginer = null;
Alloy.Globals.dimaginer = $;

$.videoPlayer.setUrl(Alloy.Globals.DimaginerVideo);
// $.header.menuButton.addEventListener('click',function(e){
	 // $.videoPlayer.stop();
	 // $.videoPlayer.visible = false;
	 // $.superView.visible = false; 
	 // $.superView.removeAllChildren();
	// // gotoback();
// 	 
// });

$.videoContainer.addEventListener('click',function(e){ 
	   //$.videoPlayer.stop();
     //$.videoPlayer.visible = false;
	 $.videoContainer.top="0dp";
	 $.videoPlayer.visible = true;
	 $.videoPlayer.fullscreen = true; 
	 $.videoPlayer.play();
	 //$.videoPlayer.VIDEO_FINISH_REASON_USER_EXITED;
});

$.videoPlayer.addEventListener('fullscreen',function(e)
{
  if (e.entering === false) {
     $.videoPlayer.stop();
     $.videoPlayer.visible = false;
     $.videoContainer.top="125dp";
  }
});
 
$.videoPlayer.addEventListener('complete',function(e)
{
  if (e.type  == "complete" ) {
     $.videoPlayer.stop();
     $.videoPlayer.fullscreen = false;
     $.videoPlayer.visible = false;
     $.videoContainer.top="125dp";
  }
});

$.header.init({
    title : "D'IMAGINER",
    passWindow : $.dImaginer
    //passWindow : $.myBag, 
});

googleAnalyticsScreen("D'IMAGINER");


//$.aboutUsParagraph_lbl.text = "Get creative with out range of interactive sample rooms and discover the perfect designs for you";




var text="GO GET THE EXPERIENCE ON OUR DESKTOP WEBSITE OR A STORE NEAR YOU";

var attr = Ti.UI.createAttributedString({
    text : text,
    attributes : [
    {
        type: Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
        value: "#999999",
        range : [text.indexOf('STORE NEAR YOU'), ('STORE NEAR YOU').length]
    },
    {
         type: Ti.UI.ATTRIBUTE_UNDERLINES_STYLE,
         value: Ti.UI.ATTRIBUTE_UNDERLINE_STYLE_DOUBLE,
         range : [text.indexOf('STORE NEAR YOU'), ('STORE NEAR YOU').length]
    }]
});
$.storeLbl.attributedString = attr;
$.storeLbl.addEventListener('click', function(e) {
    Alloy.Globals.addWindowInNav("findStore");
});


function updateCount(){
	$.header.updateCartCount();
}

// function gotoback(){
    // $.videoPlayer.stop();
     // $.videoPlayer.fullscreen = false;
     // $.videoPlayer.visible = false;
     // $.videoContainer.top="125dp";
     // Alloy.Globals.dimaginer = null;
    // //  $.superView.removeAllChildren();
// }
// exports.gotoback = gotoback;

function goToBack(){  
    Alloy.Globals.popWindowInNav();
    $.dImaginer.close();
}

function destroyWindow(e) {
     $.superScroll.removeAllChildren();
}
