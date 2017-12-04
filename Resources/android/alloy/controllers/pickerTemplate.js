function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function changeDate(e) {}
    function setDate() {
        setTimeout(function() {
            try {
                if (!args.isAddress) {
                    var currentDate = moment(picker.value);
                    var month = currentDate.month() + 1;
                    args.day.text = currentDate.date();
                    args.month.text = month;
                    args.year.text = currentDate.year();
                    var _date = args.day.text.toString();
                    var _month = month.toString();
                    1 == _date.length && (args.day.text = "0" + currentDate.date());
                    1 == _month.length && (args.month.text = "0" + month);
                    args.day.date = currentDate;
                }
                closePicker();
            } catch (exp) {
                Ti.API.info("date picker expection--->" + exp.message);
            }
        }, 800);
    }
    function closePicker() {
        var _parent = $.pickerTemplate.parent;
        _parent.remove($.pickerTemplate);
        cleanUp();
    }
    function cleanUp() {
        $.pickerTemplate.removeAllChildren();
        $.removeListener();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "pickerTemplate";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.pickerTemplate = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        zIndex: 20,
        backgroundColor: "#66231f20",
        id: "pickerTemplate"
    });
    $.__views.pickerTemplate && $.addTopLevelView($.__views.pickerTemplate);
    $.__views.pickerContainer = Ti.UI.createView({
        id: "pickerContainer",
        width: "300dp",
        height: Titanium.UI.SIZE,
        layout: "vertical",
        backgroundColor: "#231f20"
    });
    $.__views.pickerTemplate.add($.__views.pickerContainer);
    $.__views.picker = Ti.UI.createPicker({
        top: "0%",
        type: Ti.UI.PICKER_TYPE_DATE,
        minDate: new Date("Mon Jan 01 1900 00:00:00 GMT+0530 (IST)"),
        maxDate: Alloy.Globals.currentDate,
        id: "picker"
    });
    $.__views.pickerContainer.add($.__views.picker);
    changeDate ? $.addListener($.__views.picker, "change", changeDate) : __defers["$.__views.picker!change!changeDate"] = true;
    $.__views.picker1 = Ti.UI.createPicker({
        type: Ti.UI.PICKER_TYPE_DATE,
        top: "0%",
        minDate: Alloy.Globals.currentDate,
        maxDate: new Date("Sat Jan 01 2050 00:00:00 GMT+0530 (IST)"),
        id: "picker1"
    });
    $.__views.pickerContainer.add($.__views.picker1);
    changeDate ? $.addListener($.__views.picker1, "change", changeDate) : __defers["$.__views.picker1!change!changeDate"] = true;
    $.__views.__alloyId1141 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: "50dp",
        top: "10dp",
        left: 0,
        id: "__alloyId1141"
    });
    $.__views.pickerContainer.add($.__views.__alloyId1141);
    $.__views.__alloyId1142 = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: "18dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "SET",
        left: "10%",
        id: "__alloyId1142"
    });
    $.__views.__alloyId1141.add($.__views.__alloyId1142);
    setDate ? $.addListener($.__views.__alloyId1142, "click", setDate) : __defers["$.__views.__alloyId1142!click!setDate"] = true;
    $.__views.__alloyId1143 = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: "18dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "CANCEL",
        right: "10%",
        id: "__alloyId1143"
    });
    $.__views.__alloyId1141.add($.__views.__alloyId1143);
    closePicker ? $.addListener($.__views.__alloyId1143, "click", closePicker) : __defers["$.__views.__alloyId1143!click!closePicker"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var picker;
    if (args.setDate) {
        $.pickerContainer.remove($.picker1);
        picker = $.picker;
    } else {
        $.pickerContainer.remove($.picker);
        picker = $.picker1;
    }
    if (!isNullVal(args) && ("" != args.year || "" != args.month || "" != args.day)) if ("" != args.day.date) {
        _date = moment(args.day.date).format("MM,DD,YYYY");
        picker.value = new Date(_date);
    } else picker.value = new Date();
    __defers["$.__views.picker!change!changeDate"] && $.addListener($.__views.picker, "change", changeDate);
    __defers["$.__views.picker1!change!changeDate"] && $.addListener($.__views.picker1, "change", changeDate);
    __defers["$.__views.__alloyId1142!click!setDate"] && $.addListener($.__views.__alloyId1142, "click", setDate);
    __defers["$.__views.__alloyId1143!click!closePicker"] && $.addListener($.__views.__alloyId1143, "click", closePicker);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;