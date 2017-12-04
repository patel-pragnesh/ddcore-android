var args = arguments[0] || {};


googleAnalyticsScreen('FABRIC CALCULATOR');

touchEffect.createTouchEffect($.refresh_btn, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.close_btn, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.submitQtyBtn, "#a6e65e48", "#e65e48");
touchEffect.createTouchEffect($.cushion_whereToBuyBtn, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.curtains_whereToBuyBtn, "#a6ffffff", "#ffffff");

$.submitQtyBtn.text = "SUBMIT " + Alloy.Globals.icon.submitArrow;

init();

$.refresh_btn.addEventListener('click', function(e) {
    $.noOfPieces_txt.value = "";
    $.rodWidthTxt.value = "";
    $.dropLengthTxt.value = "";
    $.type.text = "SELECT TYPE";
    $.curtainType.text = "SELECT TYPE";
    $.size.text = "CUSHION SIZE";
    $.curtainImg.setImage("");
    $.cusionImg.setImage("");
    init();
});


var activeDropDown = null;
var type = ['KNIFE EDGE', 'SELF PIPED', '2 FLANGE'];

var cusionId = ['Knife Edge', 'Self Piped', '2 Flange'];

//var type =[['Knife Edge','Knife_Edge'],['Self Piped','Self_Piped'],['2 Flange','2_Flange']];
var size = ['40 X 40', '60 X 60', '30 X 40', '50 X 50', '30 X 50', '70 X 70', '30 X 30'];

var CushionsCalculatorObj = {
    "KNIFE_EDGE" : [{
        size : "40 X 40",
        value : "0.45",
    }, {
        size : "60 X 60",
        value : "0.65",
    }, {
        size : "30 X 40",
        value : "0.35",
    }, {
        size : "50 X 50",
        value : "0.55",
    }, {
        size : "30 X 50",
        value : "0.35",
    }, {
        size : "70 X 70",
        value : "0.8",
    }, {
        size : "30 X 30",
        value : "0.35",
    }],

    "SELF_PIPED" : [{
        size : "40 X 40",
        value : "0.55",
    }, {
        size : "60 X 60",
        value : "1.4",
    }, {
        size : "30 X 40",
        value : "0.45",
    }, {
        size : "50 X 50",
        value : "0.65",
    }, {
        size : "30 X 50",
        value : "0.45",
    }, {
        size : "70 X 70",
        value : "1.7",
    }, {
        size : "30 X 30",
        value : "0.4",
    }],

    "2_FLANGE" : [{
        size : "40 X 40",
        value : "0.65",
    }, {
        size : "60 X 60",
        value : "1.5",
    }, {
        size : "30 X 40",
        value : "0.5",
    }, {
        size : "50 X 50",
        value : "0.7",
    }, {
        size : "30 X 50",
        value : "0.5",
    }, {
        size : "70 X 70",
        value : "1.75",
    }, {
        size : "30 X 30",
        value : "0.5",
    }]

};

function toggelCalulatorTab(e) {
    if (e.currentPage === 0) {
        $.removeClass($.sliderSelection, "slideRight");
        $.addClass($.sliderSelection, "slideLeft isSelected");
    } else {
        $.removeClass($.sliderSelection, "slideLeft");
        $.addClass($.sliderSelection, "slideRight isSelected");
    }
}

/* setting default quantity value */

function init(){
    

var text = "0.00 MTRS";

var quantityValue = Titanium.UI.createAttributedString({
    text : text,
    attributes : [{
        type : Titanium.UI.ATTRIBUTE_FONT,
        value : {
            fontSize : "12dp",
            fontFamily : 'futura_lt_bt_light-webfont'
        },
        range : [text.indexOf('MTRS'), ('MTRS').length]
    }]
});

$.quantityLabel.attributedString = quantityValue;
$.curtainsQtyLabel.attributedString = quantityValue;



var text1 = "0.00 RS";

var quantityValue1 = Titanium.UI.createAttributedString({
    text : text1,
    attributes : [{
        type : Titanium.UI.ATTRIBUTE_FONT,
        value : {
            fontSize : "12dp",
            fontFamily : 'Futura Lt BT'
        },
        range : [text1.indexOf('RS'), ('RS').length]
    }]
});

$.priceLbl.attributedString = quantityValue1;
$.cushionPriceLbl.attributedString = quantityValue1;


}


/************ Cushions Event *************/
function showCusionDropdownList(e) {

    activeDropDown = e.source.dropValue;

    var listArr,
        listView = [];
    var selectedValueText = null;

    if (e.source.dropValue === "type") {
        $.removeClass($.dropdownView, "right5 left5");
        $.addClass($.dropdownView, "dropdownView left5");
        listArr = type;
        selectedValueText = $.type;

    } else {
        $.removeClass($.dropdownView, "right5 left5");
        $.addClass($.dropdownView, "dropdownView right5");
        listArr = size;
        selectedValueText = $.size;
    }

    if ($.dropdownView.getVisible()) {
        $.dropdownView.setVisible(false);
        $.section.setItems([]);
    } else {
        $.dropdownView.setVisible(true);
/*TODO */
        for (var i = 0; i < listArr.length; i++) {
            listView.push({
                properties : {
                    title : listArr[i],
                   // cusionId:cusionId[i],
                    cusionId:(e.source.dropValue== "type" ? cusionId[i]:""),
                    color : "#fff",
                    font : {
                        fontSize : "10dp",
                        fontFamily : "futura_medium_bt-webfont"
                    },
                    backgroundColor : (selectedValueText.text == listArr[i] ? "#231f20" : "transparent"),
                    selectionStyle : "none",
                }
            });
        }

        $.section.setItems([]);
        $.section.setItems(listView);
    }
}

function cusionListSelection(e) {

    var item = $.section.getItemAt(e.itemIndex);
    
    

    if (activeDropDown === "type") {
        $.type.text = item.properties.title;
        var imageKey = item.properties.cusionId;   
        $.cusionImg.setImage(Alloy.Globals.fabricCalculatorImages[imageKey]);
    
    } else {
        //size
        $.size.text = item.properties.title;
    }

    $.dropdownView.setVisible(false);
}

function submitCusionSize() {
    var type = $.type.getText();
    var size = $.size.getText();
    var noOfPiece = $.noOfPieces_txt.getValue();
    //Ti.API.info('type = ' + JSON.stringify(type));
    var cusionAttr = type.replace(" ", "_");
    //Ti.API.info('cusionAttr = ' + JSON.stringify(cusionAttr));
    if (!(type.indexOf('SELECT') === -1)) {
        showAlert($.fabricCalculator, "Please select type of Cushion");
        return;
    }
    if (!(size.indexOf('CUSHION') === -1)) {
        showAlert($.fabricCalculator, "Please select size of Cushion");
        return;
    }
    if (!(validators.RequiredFieldValidatorTextBox($.noOfPieces_txt))) {
        showAlert($.fabricCalculator, "Please enter number of Pieces");
        return;
    }

    var cusionType = CushionsCalculatorObj[cusionAttr];
    //Ti.API.info('cusionType = ' + JSON.stringify(cusionType));
    var lenthObj = _.where(cusionType, {
        "size" : size
    });
    //Ti.API.info('lenthObj = ' + JSON.stringify(lenthObj));
    text = (parseFloat(lenthObj[0]['value']) * parseInt(noOfPiece)).toFixed(2) + " MTRS";
    
    
    var cushionPrice = ((parseFloat(lenthObj[0]['value']) * parseInt(noOfPiece))*args).toFixed(2) + " RS";

    quantityValue = Titanium.UI.createAttributedString({
        text : text,
        attributes : [{
            type : Titanium.UI.ATTRIBUTE_FONT,
            value : {
                fontSize : "12dp",
                fontFamily : 'futura_lt_bt_light-webfont'
            },
            range : [text.indexOf('MTRS'), ('MTRS').length]
        }]
    });

    $.quantityLabel.attributedString = quantityValue;
    
    
    var cushionAttar = Titanium.UI.createAttributedString({
        text : cushionPrice,
        attributes : [{
            type : Titanium.UI.ATTRIBUTE_FONT,
            value : {
                fontSize : "12dp",
                fontFamily : 'Futura Lt BT'
            },
            range : [cushionPrice.indexOf('RS'), ('RS').length]
        }]
    });

    $.cushionPriceLbl.attributedString = cushionAttar;

}

/************ Curtain Event ************/

var curtaintypeArr = [{
    name : 'ALL TYPES',
    type : 0,
    id:'All Types',
}, {
    name : 'EYELET',
    type : 1,
    id:'Eyelet',
}, {
    name : 'AMERICAN PLEAT',
    type : 1,
    id:'American pleat',
}, {
    name : 'PENCIL',
    type : 1,
    id:'Pencil'
}, {
    name : 'ROD POCKET',
    type : 1,
    id:'Rod Pocket'
}, {
    name : 'TAB TOP',
    type : 2,
    id:'Tab Top',
}, {
    name : 'BACK TAB',
    type : 2,
    id:'Back Tab',
}];

var curtainListView = [];
for (var i = 0; i < curtaintypeArr.length; i++) {
    curtainListView.push({
        properties : {
            title : curtaintypeArr[i]['name'],
            type : curtaintypeArr[i]['type'],
            curtainId:curtaintypeArr[i]['id'],
            color : "#fff",
            font : {
                fontSize : "10dp",
                fontFamily : "futura_medium_bt-webfont"
            },
            backgroundColor : ($.curtainType.text == curtaintypeArr[i]['name'] ? "#231f20" : "transparent"),
            selectionStyle : "none",
            
        }
    });
}

function showCurtainDropdownList() {
    if ($.curtainDropdownView.getVisible()) {
        $.curtainDropdownView.setVisible(false);
        $.curtainSection.setItems([]);
    } else {
        $.curtainSection.setItems(curtainListView);
        $.curtainDropdownView.setVisible(true);
    }
}

function curtainListSelection(e) {
    var item = $.curtainSection.getItemAt(e.itemIndex);
    
    $.curtainType.text = item.properties.title;
    $.curtainType.type = item.properties.type;
    
    var imageKey = item.properties.curtainId;
   
    $.curtainImg.setImage(Alloy.Globals.fabricCalculatorImages[imageKey]);
    
    if ($.curtainType.type === 0) {
        $.rodWidthTxt.setHintText("ENTER MIN 20 INCHES");
        $.dropLengthTxt.setValue("280");
        $.dropLengthTxt.setEditable(false);
    } else if ($.curtainType.type === 2) {
        $.rodWidthTxt.setHintText("ROD WIDTH (IN CMS)");
        $.dropLengthTxt.setHintText("DROP LENGTH (MIN. 75 CMS)");
      //  $.dropLengthTxt.setValue("");
        $.dropLengthTxt.setEditable(true);
    } else {
        $.rodWidthTxt.setHintText("ROD WIDTH (IN CMS)");
        $.dropLengthTxt.setHintText("DROP LENGTH (MIN. 50 CMS)");
       // $.dropLengthTxt.setValue("");
        $.dropLengthTxt.setEditable(true);
    }
    $.curtainDropdownView.setVisible(false);
    $.curtainSection.setItems([]);
}

function hideCurtainDropdown() {
    if ($.curtainDropdownView.getVisible()) {
        // Commented for time begin
        // $.curtainSection.setItems([]);
        // $.curtainDropdownView.setVisible(false);
    }
}

function submitCurtainSize() {
    var price = null;
    if ( typeof $.curtainType.type == "undefined") {
        showAlert($.fabricCalculator, "Please select the fabric type");
        return;
    }

    if ($.curtainType.type === 0) {// for all types
        if (!validators.RequiredFieldValidatorTextBox($.rodWidthTxt)) {
            showAlert($.fabricCalculator, "Please enter Rod width in Inches");
            return;
        }

        if (parseInt($.rodWidthTxt.getValue()) < 20) {
            showAlert($.fabricCalculator, "Please enter minimum value of 20 Inches");
            return;
        }

        var Y = parseInt($.rodWidthTxt.getValue()) * 2.54;
        // converted inches to centimeters
        var A = 1.15;
        var B = Math.round(Y / 20);

        text = (A * B).toFixed(2) + " MTRS";
        
        price = ((A * B)*args).toFixed(2);
        

    } else if ($.curtainType.type === 2) {// for tab top, backtab
        if (!validators.RequiredFieldValidatorTextBox($.rodWidthTxt)) {
            showAlert($.fabricCalculator, "Please enter Rod Width in centimeters");
            return;
        }

        if (!validators.RequiredFieldValidatorTextBox($.dropLengthTxt)) {
            showAlert($.fabricCalculator, "Please enter Drop Length in centimeters");
            return;
        }

        if (parseInt($.dropLengthTxt.getValue()) < 75) {
            showAlert($.fabricCalculator, "Please enter minimum value of 75 centimeters");
            return;
        }

        var X = parseFloat($.dropLengthTxt.getValue());
        var Y = parseFloat($.rodWidthTxt.getValue());
        // + 50;

        var A = (X + 50) / 100;
        var B = Math.round(Y / 75);

        text = (A * B).toFixed(2) + " MTRS";
        
         price = ((A * B)*args).toFixed(2);

    } else {// for remaining
        if (!validators.RequiredFieldValidatorTextBox($.rodWidthTxt)) {
            showAlert($.fabricCalculator, "Please enter Rod Width in centimeters");
            return;
        }

        if (!validators.RequiredFieldValidatorTextBox($.dropLengthTxt)) {
            showAlert($.fabricCalculator, "Please enter Drop Length in centimeters");
            return;
        }

        if (parseInt($.dropLengthTxt.getValue()) < 50) {
            showAlert($.fabricCalculator, "Please enter minimum value of 50 centimeters");
            return;
        }

        var X = parseFloat($.dropLengthTxt.getValue());
        var Y = parseFloat($.rodWidthTxt.getValue());
        // + 30;

        var A = (X + 30) / 100;
        var B = Math.round(Y / 50);

        text = (A * B).toFixed(2) + " MTRS";
        
        price = ((A * B)*args).toFixed(2);
    }

    quantityValue = Titanium.UI.createAttributedString({
        text : text,
        attributes : [{
            type : Titanium.UI.ATTRIBUTE_FONT,
            value : {
                fontSize : "12dp",
                fontFamily : 'futura_lt_bt_light-webfont'
            },
            range : [text.indexOf('MTRS'), ('MTRS').length]
        }]
    });
    
    
    var priceText = price+ " RS";
    
    priceAttar = Titanium.UI.createAttributedString({
        text : priceText,
        attributes : [{
            type : Titanium.UI.ATTRIBUTE_FONT,
            value : {
                fontSize : "12dp",
                fontFamily : 'Futura Lt BT'
            },
            range : [priceText.indexOf('RS'), ('RS').length]
        }]
    });
    

    $.curtainsQtyLabel.attributedString = quantityValue;
    $.priceLbl.attributedString = priceAttar;
}

function closeView() {
    hideKeyboard();
    hideShowView($.fabricCalculator);

}

function hideKeyboard() {
    $.noOfPieces_txt.blur();
    $.rodWidthTxt.blur();
    $.dropLengthTxt.blur();
}

$.cusion_lbl.addEventListener("click", toggleLabelEffect1);
function toggleLabelEffect1(e) {
    $.scrollableView.scrollToView(1);

    $.sliderSelection.animate({
        left : "50%",
        duration : 200
    });
}

$.curtains_lbl.addEventListener("click", toggleLabelEffect2);
function toggleLabelEffect2(e) {
    $.scrollableView.scrollToView(0);
    $.sliderSelection.animate({
        left : "0",
        duration : 200
    });
}

$.fabricCalculator.addEventListener("click", function(e) {
    if (e.source.type != "TextField") {
        $.noOfPieces_txt.blur();
        $.rodWidthTxt.blur();
        $.dropLengthTxt.blur();
    }
});

$.cushion_whereToBuyBtn.addEventListener('click', navigateToFindstore);
$.curtains_whereToBuyBtn.addEventListener('click', navigateToFindstore);

function navigateToFindstore(e) {
    Alloy.Globals.addWindowInNav("findStore");
}
