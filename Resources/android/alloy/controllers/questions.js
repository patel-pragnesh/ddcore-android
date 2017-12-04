function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function setAnswer() {
        var rowArr = [ answerArr ];
        _.each(rowArr, function(value, k) {
            var rowView = $.UI.create("View", {
                classes: "row"
            });
            var leftButton = $.UI.create("View", {
                classes: [ "answerbutton", "leftAlign" ],
                clickType: "buttons"
            });
            var labelLeft = $.UI.create("Label", {
                classes: [ "answerLabel", "fontMedium" ],
                text: value[0].answer.toUpperCase(),
                answer: value[0].answer,
                answer_id: value[0].answer_id,
                img: value[0].img,
                clickType: "buttons"
            });
            leftButton.add(labelLeft);
            if (0 === firstIndex) {
                $.answersImage.setImage(encodeURI(value[0].img));
                $.answersImage.selected = true;
                labelLeft.setColor("#e65e48");
                $.questions.answer_id = value[0].answer_id;
            }
            var vSep = $.UI.create("View", {
                classes: [ "vertical_seperator" ]
            });
            var rightButton = $.UI.create("View", {
                classes: [ "answerbutton", "rightAlign" ],
                clickType: "buttons"
            });
            var labelRight = $.UI.create("Label", {
                classes: [ "answerLabel", "fontMedium" ],
                text: value[1].answer.toUpperCase(),
                answer: value[1].answer,
                answer_id: value[1].answer_id,
                img: value[1].img,
                clickType: "buttons"
            });
            rightButton.add(labelRight);
            var hSep = $.UI.create("View", {
                classes: [ "horizontal_seperator" ]
            });
            rowView.add(leftButton);
            rowView.add(vSep);
            rowView.add(rightButton);
            rowView.add(hSep);
            $.options.add(rowView);
        });
        firstIndex += 2;
        if (4 >= firstIndex) {
            answerArr = answerList.splice(0, 2);
            setAnswer();
        }
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "questions";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.questions = Ti.UI.createView({
        backgroundColor: "#ffffff",
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        id: "questions"
    });
    $.__views.questions && $.addTopLevelView($.__views.questions);
    $.__views.__alloyId1278 = Ti.UI.createView({
        top: 0,
        width: Titanium.UI.FILL,
        height: "160dp",
        backgroundGradient: {
            type: "linear",
            colors: [ {
                color: "#000000",
                position: 0
            }, {
                color: "#00000000",
                position: 1
            } ],
            startPoint: {
                x: 0,
                y: "40%"
            },
            endPoint: {
                x: 0,
                y: "100%"
            },
            backFillStart: false
        },
        zIndex: 10,
        layout: "vertical",
        id: "__alloyId1278"
    });
    $.__views.questions.add($.__views.__alloyId1278);
    $.__views.__alloyId1279 = Ti.UI.createLabel({
        top: "15dp",
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        text: "TAP PICTURE TO CONFIRM YOUR ANSWER",
        id: "__alloyId1279"
    });
    $.__views.__alloyId1278.add($.__views.__alloyId1279);
    $.__views.__alloyId1280 = Ti.UI.createView({
        top: "23dp",
        width: "45dp",
        height: "1dp",
        backgroundColor: "#aaaaaa",
        id: "__alloyId1280"
    });
    $.__views.__alloyId1278.add($.__views.__alloyId1280);
    $.__views.question = Ti.UI.createLabel({
        top: "23dp",
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "What is your ideal vacation?",
        id: "question"
    });
    $.__views.__alloyId1278.add($.__views.question);
    $.__views.answersImage = Ti.UI.createImageView({
        top: "40dp",
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        zIndex: 2,
        selected: false,
        defaultImage: "/images/default_logo.png",
        id: "answersImage",
        clickType: "image"
    });
    $.__views.questions.add($.__views.answersImage);
    $.__views.options = Ti.UI.createView({
        bottom: 0,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        backgroundColor: "#E6231f20",
        layout: "vertical",
        bubbleParent: false,
        zIndex: 10,
        id: "options"
    });
    $.__views.questions.add($.__views.options);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var answerList = args.answerList;
    args.answerList;
    args.answerList;
    var questionDetail = args.question;
    $.question.setText(questionDetail.question);
    $.question.question_id = questionDetail.question_id;
    $.questions.question_id = questionDetail.question_id;
    var firstIndex = 0;
    var answerArr = answerList.splice(0, 2);
    setAnswer();
    $.options.addEventListener("click", function(e) {
        _.each($.options.children, function(row, rowNo) {
            row.children[0].children[0].color = "#cccccc";
            row.children[2].children[0].color = "#cccccc";
        });
        if (e.source.clickType && "buttons" == e.source.clickType) {
            $.answersImage.selected = true;
            $.answersImage.setImage(e.source.img);
            if ("Ti.UI.View" == e.source.apiName) {
                e.source.children[0].color = "#e65e48";
                $.questions.answer_id = e.source.children[0].answer_id;
            } else if ("Ti.UI.Label" == e.source.apiName) {
                e.source.color = "#e65e48";
                $.questions.answer_id = e.source.answer_id;
            }
        }
    });
    $.answersImage.addEventListener("click", function(e) {
        e.source.clickType && "image" == e.source.clickType && e.source.selected && args.parent.submitAnswer();
    });
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;