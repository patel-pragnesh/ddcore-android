function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function init() {
        var text = "0.00 MTRS";
        var quantityValue = Titanium.UI.createAttributedString({
            text: text,
            attributes: [ {
                type: Titanium.UI.ATTRIBUTE_FONT,
                value: {
                    fontSize: "12dp",
                    fontFamily: "futura_lt_bt_light-webfont"
                },
                range: [ text.indexOf("MTRS"), "MTRS".length ]
            } ]
        });
        $.quantityLabel.attributedString = quantityValue;
        $.curtainsQtyLabel.attributedString = quantityValue;
        var text1 = "0.00 RS";
        var quantityValue1 = Titanium.UI.createAttributedString({
            text: text1,
            attributes: [ {
                type: Titanium.UI.ATTRIBUTE_FONT,
                value: {
                    fontSize: "12dp",
                    fontFamily: "Futura Lt BT"
                },
                range: [ text1.indexOf("RS"), "RS".length ]
            } ]
        });
        $.priceLbl.attributedString = quantityValue1;
        $.cushionPriceLbl.attributedString = quantityValue1;
    }
    function showCusionDropdownList(e) {
        activeDropDown = e.source.dropValue;
        var listArr, listView = [];
        var selectedValueText = null;
        if ("type" === e.source.dropValue) {
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
            for (var i = 0; i < listArr.length; i++) listView.push({
                properties: {
                    title: listArr[i],
                    cusionId: "type" == e.source.dropValue ? cusionId[i] : "",
                    color: "#fff",
                    font: {
                        fontSize: "10dp",
                        fontFamily: "futura_medium_bt-webfont"
                    },
                    backgroundColor: selectedValueText.text == listArr[i] ? "#231f20" : "transparent",
                    selectionStyle: "none"
                }
            });
            $.section.setItems([]);
            $.section.setItems(listView);
        }
    }
    function cusionListSelection(e) {
        var item = $.section.getItemAt(e.itemIndex);
        if ("type" === activeDropDown) {
            $.type.text = item.properties.title;
            var imageKey = item.properties.cusionId;
            $.cusionImg.setImage(Alloy.Globals.fabricCalculatorImages[imageKey]);
        } else $.size.text = item.properties.title;
        $.dropdownView.setVisible(false);
    }
    function submitCusionSize() {
        var type = $.type.getText();
        var size = $.size.getText();
        var noOfPiece = $.noOfPieces_txt.getValue();
        var cusionAttr = type.replace(" ", "_");
        if (!(-1 === type.indexOf("SELECT"))) {
            showAlert($.fabricCalculator, "Please select type of Cushion");
            return;
        }
        if (!(-1 === size.indexOf("CUSHION"))) {
            showAlert($.fabricCalculator, "Please select size of Cushion");
            return;
        }
        if (!validators.RequiredFieldValidatorTextBox($.noOfPieces_txt)) {
            showAlert($.fabricCalculator, "Please enter number of Pieces");
            return;
        }
        var cusionType = CushionsCalculatorObj[cusionAttr];
        var lenthObj = _.where(cusionType, {
            size: size
        });
        text = (parseFloat(lenthObj[0]["value"]) * parseInt(noOfPiece)).toFixed(2) + " MTRS";
        var cushionPrice = (parseFloat(lenthObj[0]["value"]) * parseInt(noOfPiece) * args).toFixed(2) + " RS";
        quantityValue = Titanium.UI.createAttributedString({
            text: text,
            attributes: [ {
                type: Titanium.UI.ATTRIBUTE_FONT,
                value: {
                    fontSize: "12dp",
                    fontFamily: "futura_lt_bt_light-webfont"
                },
                range: [ text.indexOf("MTRS"), "MTRS".length ]
            } ]
        });
        $.quantityLabel.attributedString = quantityValue;
        var cushionAttar = Titanium.UI.createAttributedString({
            text: cushionPrice,
            attributes: [ {
                type: Titanium.UI.ATTRIBUTE_FONT,
                value: {
                    fontSize: "12dp",
                    fontFamily: "Futura Lt BT"
                },
                range: [ cushionPrice.indexOf("RS"), "RS".length ]
            } ]
        });
        $.cushionPriceLbl.attributedString = cushionAttar;
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
        if (0 === $.curtainType.type) {
            $.rodWidthTxt.setHintText("ENTER MIN 20 INCHES");
            $.dropLengthTxt.setValue("280");
            $.dropLengthTxt.setEditable(false);
        } else if (2 === $.curtainType.type) {
            $.rodWidthTxt.setHintText("ROD WIDTH (IN CMS)");
            $.dropLengthTxt.setHintText("DROP LENGTH (MIN. 75 CMS)");
            $.dropLengthTxt.setEditable(true);
        } else {
            $.rodWidthTxt.setHintText("ROD WIDTH (IN CMS)");
            $.dropLengthTxt.setHintText("DROP LENGTH (MIN. 50 CMS)");
            $.dropLengthTxt.setEditable(true);
        }
        $.curtainDropdownView.setVisible(false);
        $.curtainSection.setItems([]);
    }
    function hideCurtainDropdown() {
        $.curtainDropdownView.getVisible();
    }
    function submitCurtainSize() {
        var price = null;
        if ("undefined" == typeof $.curtainType.type) {
            showAlert($.fabricCalculator, "Please select the fabric type");
            return;
        }
        if (0 === $.curtainType.type) {
            if (!validators.RequiredFieldValidatorTextBox($.rodWidthTxt)) {
                showAlert($.fabricCalculator, "Please enter Rod width in Inches");
                return;
            }
            if (parseInt($.rodWidthTxt.getValue()) < 20) {
                showAlert($.fabricCalculator, "Please enter minimum value of 20 Inches");
                return;
            }
            var Y = 2.54 * parseInt($.rodWidthTxt.getValue());
            var A = 1.15;
            var B = Math.round(Y / 20);
            text = (A * B).toFixed(2) + " MTRS";
            price = (A * B * args).toFixed(2);
        } else if (2 === $.curtainType.type) {
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
            var A = (X + 50) / 100;
            var B = Math.round(Y / 75);
            text = (A * B).toFixed(2) + " MTRS";
            price = (A * B * args).toFixed(2);
        } else {
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
            var A = (X + 30) / 100;
            var B = Math.round(Y / 50);
            text = (A * B).toFixed(2) + " MTRS";
            price = (A * B * args).toFixed(2);
        }
        quantityValue = Titanium.UI.createAttributedString({
            text: text,
            attributes: [ {
                type: Titanium.UI.ATTRIBUTE_FONT,
                value: {
                    fontSize: "12dp",
                    fontFamily: "futura_lt_bt_light-webfont"
                },
                range: [ text.indexOf("MTRS"), "MTRS".length ]
            } ]
        });
        var priceText = price + " RS";
        priceAttar = Titanium.UI.createAttributedString({
            text: priceText,
            attributes: [ {
                type: Titanium.UI.ATTRIBUTE_FONT,
                value: {
                    fontSize: "12dp",
                    fontFamily: "Futura Lt BT"
                },
                range: [ priceText.indexOf("RS"), "RS".length ]
            } ]
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
    function toggleLabelEffect1(e) {
        $.scrollableView.scrollToView(1);
        $.sliderSelection.animate({
            left: "50%",
            duration: 200
        });
    }
    function toggleLabelEffect2(e) {
        $.scrollableView.scrollToView(0);
        $.sliderSelection.animate({
            left: "0",
            duration: 200
        });
    }
    function navigateToFindstore(e) {
        Alloy.Globals.addWindowInNav("findStore");
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "fabricCalculator";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.fabricCalculator = Ti.UI.createView({
        visible: false,
        type: "fabricCalc",
        id: "fabricCalculator"
    });
    $.__views.fabricCalculator && $.addTopLevelView($.__views.fabricCalculator);
    $.__views.fabricCalculatorContainer = Ti.UI.createView({
        width: "100%",
        height: "100%",
        backgroundColor: "#231f20",
        zIndex: 1,
        layout: "vertical",
        id: "fabricCalculatorContainer"
    });
    $.__views.fabricCalculator.add($.__views.fabricCalculatorContainer);
    $.__views.__alloyId439 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: "53dp",
        top: "0dp",
        left: 0,
        id: "__alloyId439"
    });
    $.__views.fabricCalculatorContainer.add($.__views.__alloyId439);
    $.__views.screenName = Ti.UI.createLabel({
        font: {
            fontFamily: "futura_lt_bt_light-webfont",
            fontSize: "15sp"
        },
        left: "15dp",
        top: "10dp",
        color: "#fff",
        text: "FABRIC CALCULATOR",
        id: "screenName"
    });
    $.__views.__alloyId439.add($.__views.screenName);
    $.__views.refresh_btn = Ti.UI.createLabel({
        right: "60dp",
        width: "40dp",
        height: "40dp",
        font: {
            fontSize: "20dp",
            fontFamily: "icomoon"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: Alloy.Globals.icon.refresh,
        id: "refresh_btn"
    });
    $.__views.__alloyId439.add($.__views.refresh_btn);
    $.__views.close_btn = Ti.UI.createLabel({
        right: "15dp",
        width: "40dp",
        height: "40dp",
        font: {
            fontSize: "20dp",
            fontFamily: "icomoon"
        },
        color: "#ffffff",
        text: Alloy.Globals.icon.close,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "close_btn"
    });
    $.__views.__alloyId439.add($.__views.close_btn);
    closeView ? $.addListener($.__views.close_btn, "click", closeView) : __defers["$.__views.close_btn!click!closeView"] = true;
    $.__views.__alloyId440 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        left: 0,
        layout: "vertical",
        id: "__alloyId440"
    });
    $.__views.fabricCalculatorContainer.add($.__views.__alloyId440);
    $.__views.calculatorTab = Ti.UI.createView({
        top: "0",
        backgroundColor: "#231f20",
        width: Titanium.UI.FILL,
        height: "35dp",
        id: "calculatorTab"
    });
    $.__views.__alloyId440.add($.__views.calculatorTab);
    $.__views.curtains_lbl = Ti.UI.createLabel({
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: Alloy.Globals.labelTitleColor,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        height: Titanium.UI.FILL,
        width: "48%",
        left: "0dp",
        text: "CURTAINS",
        id: "curtains_lbl"
    });
    $.__views.calculatorTab.add($.__views.curtains_lbl);
    $.__views.sliderSelection = Ti.UI.createView({
        backgroundColor: Alloy.Globals.labelTitleColor,
        height: "2dp",
        width: "48%",
        bottom: "1dp",
        left: "0dp",
        id: "sliderSelection"
    });
    $.__views.calculatorTab.add($.__views.sliderSelection);
    $.__views.__alloyId441 = Ti.UI.createLabel({
        font: {
            fontSize: "12sp"
        },
        color: "#a6ffffff",
        text: "|",
        id: "__alloyId441"
    });
    $.__views.calculatorTab.add($.__views.__alloyId441);
    $.__views.cusion_lbl = Ti.UI.createLabel({
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: Alloy.Globals.labelTitleColor,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        height: Titanium.UI.FILL,
        width: "48%",
        right: "0dp",
        text: "CUSHIONS",
        id: "cusion_lbl"
    });
    $.__views.calculatorTab.add($.__views.cusion_lbl);
    var __alloyId442 = [];
    $.__views.curtains = Ti.UI.createScrollView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        id: "curtains",
        title: "CURTAINS"
    });
    __alloyId442.push($.__views.curtains);
    hideCurtainDropdown ? $.addListener($.__views.curtains, "singletap", hideCurtainDropdown) : __defers["$.__views.curtains!singletap!hideCurtainDropdown"] = true;
    $.__views.__alloyId443 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        top: 0,
        id: "__alloyId443"
    });
    $.__views.curtains.add($.__views.__alloyId443);
    $.__views.__alloyId444 = Ti.UI.createView({
        borderColor: "#514f50",
        borderWidth: 1,
        width: "102%",
        height: "60dp",
        left: "-1%",
        top: "20dp",
        id: "__alloyId444"
    });
    $.__views.__alloyId443.add($.__views.__alloyId444);
    $.__views.__alloyId445 = Ti.UI.createView({
        left: "5%",
        width: "95%",
        height: "98%",
        id: "__alloyId445"
    });
    $.__views.__alloyId444.add($.__views.__alloyId445);
    showCurtainDropdownList ? $.addListener($.__views.__alloyId445, "click", showCurtainDropdownList) : __defers["$.__views.__alloyId445!click!showCurtainDropdownList"] = true;
    $.__views.curtainType = Ti.UI.createLabel({
        color: Alloy.Globals.labelTitleColor,
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        text: "SELECT TYPE",
        id: "curtainType",
        left: "5%"
    });
    $.__views.__alloyId445.add($.__views.curtainType);
    $.__views.__alloyId446 = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "6dp"
        },
        text: Alloy.Globals.icon.dropdownArrow,
        color: "#514f50",
        right: "5%",
        id: "__alloyId446"
    });
    $.__views.__alloyId445.add($.__views.__alloyId446);
    $.__views.__alloyId447 = Ti.UI.createView({
        width: "80%",
        height: Ti.UI.SIZE,
        top: "20dp",
        id: "__alloyId447"
    });
    $.__views.__alloyId443.add($.__views.__alloyId447);
    $.__views.curtainImg = Ti.UI.createImageView({
        width: "70dp",
        height: "70dp",
        left: 1,
        id: "curtainImg",
        top: "5dp"
    });
    $.__views.__alloyId447.add($.__views.curtainImg);
    $.__views.__alloyId448 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: "160dp",
        layout: "vertical",
        left: "90dp",
        id: "__alloyId448"
    });
    $.__views.__alloyId447.add($.__views.__alloyId448);
    $.__views.rodWidthTxt = Ti.UI.createTextField({
        color: "#fff",
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        left: "2%",
        top: 2,
        hintTextColor: "#999999",
        backgroundColor: "transparent",
        keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
        id: "rodWidthTxt",
        type: "TextField",
        hintText: "ROD WIDTH (IN CMS)"
    });
    $.__views.__alloyId448.add($.__views.rodWidthTxt);
    $.__views.dropLengthTxt = Ti.UI.createTextField({
        color: "#fff",
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        left: "2%",
        top: 2,
        hintTextColor: "#999999",
        backgroundColor: "transparent",
        keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
        id: "dropLengthTxt",
        type: "TextField",
        hintText: "DROP LENGTH (MIN. 50 CMS)"
    });
    $.__views.__alloyId448.add($.__views.dropLengthTxt);
    $.__views.__alloyId449 = Ti.UI.createView({
        backgroundColor: Alloy.Globals.labelTitleColor,
        height: "1dp",
        width: "100%",
        top: "5dp",
        left: "0%",
        id: "__alloyId449"
    });
    $.__views.__alloyId448.add($.__views.__alloyId449);
    $.__views.submitCurtainQtyBtn = Ti.UI.createLabel({
        color: Alloy.Globals.labelTitleColor,
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        left: "5%",
        top: "10dp",
        text: "SUBMIT",
        id: "submitCurtainQtyBtn"
    });
    $.__views.__alloyId448.add($.__views.submitCurtainQtyBtn);
    submitCurtainSize ? $.addListener($.__views.submitCurtainQtyBtn, "click", submitCurtainSize) : __defers["$.__views.submitCurtainQtyBtn!click!submitCurtainSize"] = true;
    $.__views.curtainDropdownView = Ti.UI.createView({
        backgroundColor: "#514f50",
        width: "90%",
        height: "160dp",
        zIndex: 2,
        top: "60dp",
        visible: false,
        left: "5%",
        id: "curtainDropdownView"
    });
    $.__views.curtains.add($.__views.curtainDropdownView);
    $.__views.curtainSection = Ti.UI.createListSection({
        id: "curtainSection"
    });
    var __alloyId451 = [];
    __alloyId451.push($.__views.curtainSection);
    $.__views.curtainDropdownList = Ti.UI.createListView({
        backgroundColor: "transparent",
        sections: __alloyId451,
        id: "curtainDropdownList"
    });
    $.__views.curtainDropdownView.add($.__views.curtainDropdownList);
    curtainListSelection ? $.addListener($.__views.curtainDropdownList, "itemclick", curtainListSelection) : __defers["$.__views.curtainDropdownList!itemclick!curtainListSelection"] = true;
    $.__views.__alloyId452 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        top: "240dp",
        height: "80dp",
        bottom: "100dp",
        id: "__alloyId452"
    });
    $.__views.curtains.add($.__views.__alloyId452);
    $.__views.__alloyId453 = Ti.UI.createView({
        height: "1dp",
        width: "90%",
        backgroundColor: "#514f50",
        left: "5%",
        top: 0,
        id: "__alloyId453"
    });
    $.__views.__alloyId452.add($.__views.__alloyId453);
    $.__views.__alloyId454 = Ti.UI.createLabel({
        color: "#999999",
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        text: "QUANTITY",
        top: "10dp",
        left: "7%",
        id: "__alloyId454"
    });
    $.__views.__alloyId452.add($.__views.__alloyId454);
    $.__views.curtainsQtyLabel = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: "16dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        id: "curtainsQtyLabel",
        top: "10dp",
        right: "7%"
    });
    $.__views.__alloyId452.add($.__views.curtainsQtyLabel);
    $.__views.__alloyId455 = Ti.UI.createLabel({
        color: "#999999",
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        text: "PRICE",
        bottom: "10dp",
        left: "7%",
        id: "__alloyId455"
    });
    $.__views.__alloyId452.add($.__views.__alloyId455);
    $.__views.priceLbl = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: "16dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        id: "priceLbl",
        bottom: "10dp",
        right: "7%"
    });
    $.__views.__alloyId452.add($.__views.priceLbl);
    $.__views.__alloyId456 = Ti.UI.createView({
        height: "1dp",
        width: "90%",
        backgroundColor: "#514f50",
        left: "5%",
        bottom: 0,
        id: "__alloyId456"
    });
    $.__views.__alloyId452.add($.__views.__alloyId456);
    $.__views.curtains_whereToBuyBtn = Ti.UI.createLabel({
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        width: "70%",
        height: "40dp",
        borderColor: "#80e7e7e7",
        borderWidth: 1,
        color: "#fff",
        bottom: "20dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        text: "WHERE TO BUY",
        id: "curtains_whereToBuyBtn"
    });
    $.__views.curtains.add($.__views.curtains_whereToBuyBtn);
    $.__views.cusion = Ti.UI.createScrollView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        id: "cusion",
        title: "CUSHIONS"
    });
    __alloyId442.push($.__views.cusion);
    $.__views.__alloyId457 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        top: 0,
        id: "__alloyId457"
    });
    $.__views.cusion.add($.__views.__alloyId457);
    $.__views.__alloyId458 = Ti.UI.createView({
        borderColor: "#514f50",
        borderWidth: 1,
        width: "102%",
        height: "60dp",
        left: "-1%",
        top: "20dp",
        id: "__alloyId458"
    });
    $.__views.__alloyId457.add($.__views.__alloyId458);
    $.__views.__alloyId459 = Ti.UI.createView({
        dropValue: "type",
        left: "5%",
        width: "42%",
        height: "98%",
        id: "__alloyId459"
    });
    $.__views.__alloyId458.add($.__views.__alloyId459);
    showCusionDropdownList ? $.addListener($.__views.__alloyId459, "click", showCusionDropdownList) : __defers["$.__views.__alloyId459!click!showCusionDropdownList"] = true;
    $.__views.type = Ti.UI.createLabel({
        color: Alloy.Globals.labelTitleColor,
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        text: "SELECT TYPE",
        dropValue: "type",
        id: "type",
        left: "5%"
    });
    $.__views.__alloyId459.add($.__views.type);
    $.__views.__alloyId460 = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "6dp"
        },
        text: Alloy.Globals.icon.dropdownArrow,
        color: "#514f50",
        dropValue: "type",
        right: "5%",
        id: "__alloyId460"
    });
    $.__views.__alloyId459.add($.__views.__alloyId460);
    $.__views.__alloyId461 = Ti.UI.createView({
        backgroundColor: "#514f50",
        width: "2px",
        height: "70%",
        id: "__alloyId461"
    });
    $.__views.__alloyId458.add($.__views.__alloyId461);
    $.__views.__alloyId462 = Ti.UI.createView({
        dropValue: "size",
        right: "5%",
        width: "42%",
        height: "98%",
        id: "__alloyId462"
    });
    $.__views.__alloyId458.add($.__views.__alloyId462);
    showCusionDropdownList ? $.addListener($.__views.__alloyId462, "click", showCusionDropdownList) : __defers["$.__views.__alloyId462!click!showCusionDropdownList"] = true;
    $.__views.size = Ti.UI.createLabel({
        color: Alloy.Globals.labelTitleColor,
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        text: "CUSHION SIZE",
        dropValue: "size",
        id: "size",
        left: "5%"
    });
    $.__views.__alloyId462.add($.__views.size);
    $.__views.__alloyId463 = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "6dp"
        },
        text: Alloy.Globals.icon.dropdownArrow,
        color: "#514f50",
        dropValue: "size",
        right: "5%",
        id: "__alloyId463"
    });
    $.__views.__alloyId462.add($.__views.__alloyId463);
    $.__views.__alloyId464 = Ti.UI.createView({
        width: "80%",
        height: "100dp",
        top: "20dp",
        id: "__alloyId464"
    });
    $.__views.__alloyId457.add($.__views.__alloyId464);
    $.__views.cusionImg = Ti.UI.createImageView({
        width: "70dp",
        height: "70dp",
        left: 1,
        id: "cusionImg"
    });
    $.__views.__alloyId464.add($.__views.cusionImg);
    $.__views.__alloyId465 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: "70dp",
        layout: "vertical",
        left: "90dp",
        id: "__alloyId465"
    });
    $.__views.__alloyId464.add($.__views.__alloyId465);
    $.__views.noOfPieces_txt = Ti.UI.createTextField({
        color: "#fff",
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        left: "2%",
        top: 2,
        hintTextColor: "#999999",
        backgroundColor: "transparent",
        keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
        id: "noOfPieces_txt",
        type: "TextField",
        hintText: "NO. OF PIECES"
    });
    $.__views.__alloyId465.add($.__views.noOfPieces_txt);
    $.__views.__alloyId466 = Ti.UI.createView({
        backgroundColor: Alloy.Globals.labelTitleColor,
        height: "1dp",
        width: "100%",
        top: "5dp",
        left: "0%",
        id: "__alloyId466"
    });
    $.__views.__alloyId465.add($.__views.__alloyId466);
    $.__views.submitQtyBtn = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "13dp"
        },
        color: Alloy.Globals.labelTitleColor,
        left: "5%",
        top: "10dp",
        id: "submitQtyBtn"
    });
    $.__views.__alloyId465.add($.__views.submitQtyBtn);
    submitCusionSize ? $.addListener($.__views.submitQtyBtn, "click", submitCusionSize) : __defers["$.__views.submitQtyBtn!click!submitCusionSize"] = true;
    $.__views.dropdownView = Ti.UI.createView({
        backgroundColor: "#514f50",
        width: "42%",
        height: "160dp",
        zIndex: 2,
        top: "60dp",
        visible: false,
        id: "dropdownView"
    });
    $.__views.cusion.add($.__views.dropdownView);
    $.__views.section = Ti.UI.createListSection({
        id: "section"
    });
    var __alloyId468 = [];
    __alloyId468.push($.__views.section);
    $.__views.dropdownList = Ti.UI.createListView({
        backgroundColor: "transparent",
        sections: __alloyId468,
        id: "dropdownList"
    });
    $.__views.dropdownView.add($.__views.dropdownList);
    cusionListSelection ? $.addListener($.__views.dropdownList, "itemclick", cusionListSelection) : __defers["$.__views.dropdownList!itemclick!cusionListSelection"] = true;
    $.__views.__alloyId469 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        top: "240dp",
        height: "80dp",
        bottom: "100dp",
        id: "__alloyId469"
    });
    $.__views.cusion.add($.__views.__alloyId469);
    $.__views.__alloyId470 = Ti.UI.createView({
        height: "1dp",
        width: "90%",
        backgroundColor: "#514f50",
        left: "5%",
        top: 0,
        id: "__alloyId470"
    });
    $.__views.__alloyId469.add($.__views.__alloyId470);
    $.__views.__alloyId471 = Ti.UI.createLabel({
        color: "#999999",
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        text: "QUANTITY",
        top: "10dp",
        left: "7%",
        id: "__alloyId471"
    });
    $.__views.__alloyId469.add($.__views.__alloyId471);
    $.__views.quantityLabel = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: "16dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        id: "quantityLabel",
        top: "10dp",
        right: "7%"
    });
    $.__views.__alloyId469.add($.__views.quantityLabel);
    $.__views.__alloyId472 = Ti.UI.createLabel({
        color: "#999999",
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        text: "PRICE",
        bottom: "10dp",
        left: "7%",
        id: "__alloyId472"
    });
    $.__views.__alloyId469.add($.__views.__alloyId472);
    $.__views.cushionPriceLbl = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: "16dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        id: "cushionPriceLbl",
        bottom: "10dp",
        right: "7%"
    });
    $.__views.__alloyId469.add($.__views.cushionPriceLbl);
    $.__views.__alloyId473 = Ti.UI.createView({
        height: "1dp",
        width: "90%",
        backgroundColor: "#514f50",
        left: "5%",
        bottom: 0,
        id: "__alloyId473"
    });
    $.__views.__alloyId469.add($.__views.__alloyId473);
    $.__views.cushion_whereToBuyBtn = Ti.UI.createLabel({
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        width: "70%",
        height: "40dp",
        borderColor: "#80e7e7e7",
        borderWidth: 1,
        color: "#fff",
        bottom: "20dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        text: "WHERE TO BUY",
        id: "cushion_whereToBuyBtn"
    });
    $.__views.cusion.add($.__views.cushion_whereToBuyBtn);
    $.__views.scrollableView = Ti.UI.createScrollableView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        top: 0,
        views: __alloyId442,
        id: "scrollableView",
        scrollingEnabled: false
    });
    $.__views.__alloyId440.add($.__views.scrollableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    googleAnalyticsScreen("FABRIC CALCULATOR");
    touchEffect.createTouchEffect($.refresh_btn, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.close_btn, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.submitQtyBtn, "#a6e65e48", "#e65e48");
    touchEffect.createTouchEffect($.cushion_whereToBuyBtn, "#a6ffffff", "#ffffff");
    touchEffect.createTouchEffect($.curtains_whereToBuyBtn, "#a6ffffff", "#ffffff");
    $.submitQtyBtn.text = "SUBMIT " + Alloy.Globals.icon.submitArrow;
    init();
    $.refresh_btn.addEventListener("click", function(e) {
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
    var type = [ "KNIFE EDGE", "SELF PIPED", "2 FLANGE" ];
    var cusionId = [ "Knife Edge", "Self Piped", "2 Flange" ];
    var size = [ "40 X 40", "60 X 60", "30 X 40", "50 X 50", "30 X 50", "70 X 70", "30 X 30" ];
    var CushionsCalculatorObj = {
        KNIFE_EDGE: [ {
            size: "40 X 40",
            value: "0.45"
        }, {
            size: "60 X 60",
            value: "0.65"
        }, {
            size: "30 X 40",
            value: "0.35"
        }, {
            size: "50 X 50",
            value: "0.55"
        }, {
            size: "30 X 50",
            value: "0.35"
        }, {
            size: "70 X 70",
            value: "0.8"
        }, {
            size: "30 X 30",
            value: "0.35"
        } ],
        SELF_PIPED: [ {
            size: "40 X 40",
            value: "0.55"
        }, {
            size: "60 X 60",
            value: "1.4"
        }, {
            size: "30 X 40",
            value: "0.45"
        }, {
            size: "50 X 50",
            value: "0.65"
        }, {
            size: "30 X 50",
            value: "0.45"
        }, {
            size: "70 X 70",
            value: "1.7"
        }, {
            size: "30 X 30",
            value: "0.4"
        } ],
        "2_FLANGE": [ {
            size: "40 X 40",
            value: "0.65"
        }, {
            size: "60 X 60",
            value: "1.5"
        }, {
            size: "30 X 40",
            value: "0.5"
        }, {
            size: "50 X 50",
            value: "0.7"
        }, {
            size: "30 X 50",
            value: "0.5"
        }, {
            size: "70 X 70",
            value: "1.75"
        }, {
            size: "30 X 30",
            value: "0.5"
        } ]
    };
    var curtaintypeArr = [ {
        name: "ALL TYPES",
        type: 0,
        id: "All Types"
    }, {
        name: "EYELET",
        type: 1,
        id: "Eyelet"
    }, {
        name: "AMERICAN PLEAT",
        type: 1,
        id: "American pleat"
    }, {
        name: "PENCIL",
        type: 1,
        id: "Pencil"
    }, {
        name: "ROD POCKET",
        type: 1,
        id: "Rod Pocket"
    }, {
        name: "TAB TOP",
        type: 2,
        id: "Tab Top"
    }, {
        name: "BACK TAB",
        type: 2,
        id: "Back Tab"
    } ];
    var curtainListView = [];
    for (var i = 0; i < curtaintypeArr.length; i++) curtainListView.push({
        properties: {
            title: curtaintypeArr[i]["name"],
            type: curtaintypeArr[i]["type"],
            curtainId: curtaintypeArr[i]["id"],
            color: "#fff",
            font: {
                fontSize: "10dp",
                fontFamily: "futura_medium_bt-webfont"
            },
            backgroundColor: $.curtainType.text == curtaintypeArr[i]["name"] ? "#231f20" : "transparent",
            selectionStyle: "none"
        }
    });
    $.cusion_lbl.addEventListener("click", toggleLabelEffect1);
    $.curtains_lbl.addEventListener("click", toggleLabelEffect2);
    $.fabricCalculator.addEventListener("click", function(e) {
        if ("TextField" != e.source.type) {
            $.noOfPieces_txt.blur();
            $.rodWidthTxt.blur();
            $.dropLengthTxt.blur();
        }
    });
    $.cushion_whereToBuyBtn.addEventListener("click", navigateToFindstore);
    $.curtains_whereToBuyBtn.addEventListener("click", navigateToFindstore);
    __defers["$.__views.close_btn!click!closeView"] && $.addListener($.__views.close_btn, "click", closeView);
    __defers["$.__views.curtains!singletap!hideCurtainDropdown"] && $.addListener($.__views.curtains, "singletap", hideCurtainDropdown);
    __defers["$.__views.__alloyId445!click!showCurtainDropdownList"] && $.addListener($.__views.__alloyId445, "click", showCurtainDropdownList);
    __defers["$.__views.submitCurtainQtyBtn!click!submitCurtainSize"] && $.addListener($.__views.submitCurtainQtyBtn, "click", submitCurtainSize);
    __defers["$.__views.curtainDropdownList!itemclick!curtainListSelection"] && $.addListener($.__views.curtainDropdownList, "itemclick", curtainListSelection);
    __defers["$.__views.__alloyId459!click!showCusionDropdownList"] && $.addListener($.__views.__alloyId459, "click", showCusionDropdownList);
    __defers["$.__views.__alloyId462!click!showCusionDropdownList"] && $.addListener($.__views.__alloyId462, "click", showCusionDropdownList);
    __defers["$.__views.submitQtyBtn!click!submitCusionSize"] && $.addListener($.__views.submitQtyBtn, "click", submitCusionSize);
    __defers["$.__views.dropdownList!itemclick!cusionListSelection"] && $.addListener($.__views.dropdownList, "itemclick", cusionListSelection);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;