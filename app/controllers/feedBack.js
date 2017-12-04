var args = arguments[0] || {};
var reasonFlag = true;
//touchEffect.createTouchEffect($.reasonPicker, "#a6a0a0a0", "#a0a0a0");
$.header.init({
    title : "FEEDBACK",
    passWindow : $.feedBack,
});


$.feedBack.addEventListener("click", function(e) {
    if (e.source.type != "TextField") {
        $.reason.blur();
    }
});

googleAnalyticsScreen("FEEDBACK");

$.header.getView("cartContainer").setVisible(false);
$.header.getView("searchLbl").setVisible(false);
$.header.getView("overFlowMenuLbl").setVisible(false);

init();
$.reason.blur();
function init() {
    loadQuestion();
}

function loadQuestion() {

    showLoader($.feedBack);
    var requestMethod = Alloy.Globals.commonUrl.getCustomerServiceDetails;
    Alloy.Globals.webServiceCall(requestMethod, {}, loadQuestionSuccessCallback, loadQuestionErrorCallback, "POST", $.feedBack);

}

function loadQuestionSuccessCallback(response) {
    hideLoader();
    setReasons(response.data.what_is_it_about);
}

function loadQuestionErrorCallback(response) {
    hideLoader();
}

function setReasons(data) {
    try {

        //for (var i = 0; i < 5; i++) {
        _.each(data, function(value, k) {

            var reasonsLbl = $.UI.create("Label", {
                classes : ['fontLight', 'inputText'],
                width : Titanium.UI.FILL,
                //text : "bhupendra : " + i,
                text : value,
                touchEnabled : true
            });

            var reasonsSeparator = $.UI.create("View", {
                classes : ['horizontalSeparator'],
                left : "10dp",
                right : "10dp",
                touchEnabled : false
            });
            $.reasonScroll.add(reasonsLbl);
            $.reasonScroll.add(reasonsSeparator);
        });
        //};
    } catch(exp) {
        Ti.API.info('resons expection-->' + exp.message);
    }

}

$.reasonDropDown.addEventListener('click', function(e) {
    if (reasonFlag) {
        $.reasonDropDown.backgroundColor = "#cccccc";
        //$.reasonPicker.backgroundColor="#cccccc";
        $.reasonPicker.color = "#ffffff";
        $.reasonScroll.height = "140";
        reasonFlag = false;
    } else {
        if (e.source.text && e.source.type != 'icon') {
            $.reasonPicker.text = e.source.text;
        }

        $.reasonPicker.color = "#a0a0a0";
        $.reasonDropDown.backgroundColor = "transparent";
        //$.reasonPicker.backgroundColor="transparent";
        $.reasonScroll.height = "0";
        reasonFlag = true;
    }
});

function submitFeedback() {
    // if ($.reasonPicker.getText() === "WHAT IS IT ABOUT?") {
        // showAlert($.feedBack, "Please select the Feedback Question");
    // } 
     if( $.reason.getValue().trim() ==""){
    	showAlert($.feedBack, "Please enter your feedback comments");
    }
    
    else {
        var base64String="";
        
        if ($.camera.getText() === Alloy.Globals.icon.deleteIcon) {
            
            var blob = $.attachedImage.toBlob();
           var _image = blob.imageAsResized(400, 400);
            
            //base64String = Ti.Utils.base64encode($.attachedImage.image).toString();
            base64String = Ti.Utils.base64encode(_image).toString();
        }
        

        showLoader($.feedBack);
        var requestMethod = Alloy.Globals.commonUrl.submitFeeback;
        var param = {
            quiz_about : $.reasonPicker.getText(),
            note : $.reason.getValue(),
            base_image:base64String
        };

        var requestParam = JSON.stringify(param);
        //Ti.API.info('feedback request param--->' + requestParam);
        Alloy.Globals.webServiceCall(requestMethod, requestParam, submitFeebackSuccessCallback, submitFeebackErrorCallback, "POST", $.feedBack);
    }
}

function submitFeebackSuccessCallback(response) {
    hideLoader();
     $.reason.setValue("");
    showAlert($.feedBack, response.message);

    setTimeout(function() {
        closeFeedback();
    }, 1000);

}

function submitFeebackErrorCallback(response) {
    hideLoader();
    showAlert($.feedBack, response.message);

}

function closeFeedback() {
    Alloy.Globals.popWindowInNav();
    $.feedBack.close();
}

function cleanUp() {
    Ti.API.info('************** into clear Memory ***************');
    
    $.removeListener();
    
    $.feedBack.remove($.containerForPage);
    $.containerForPage.removeAllChildren();
    $.destroy();
}


function updateCount(){
	$.header.updateCartCount();
}




/*******************************/
function openCamera(e) {
    if (e.source.text === Alloy.Globals.icon.camera) {

        var cropping = require("cropping");
        cropping.callimagecrop($.attachedImage, $.feedBack, {
            x : 5,
            y : 6
        }, changePhotoFunction);
    } else {
        // delete Image
        var deleteConfirmation = $.UI.create("AlertDialog", {
            message : 'Are you sure ?',
            title : 'Delete Image',
            cancel : 1,
            buttonNames : ['Yes', 'No'],
        });

        deleteConfirmation.addEventListener('click', function(ex) {
            if (ex.index === 0) {
                $.attachedImage.image = "";
                $.camera.setText(Alloy.Globals.icon.camera);
                deleteConfirmation = null;
            }
        });

        deleteConfirmation.show();
    }
}

function changePhotoFunction() {
    $.camera.setText(Alloy.Globals.icon.deleteIcon);
}
