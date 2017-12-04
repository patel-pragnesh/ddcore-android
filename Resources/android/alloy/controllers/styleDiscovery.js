function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function goToBack() {
        if (currentPage > 0) {
            $.scrollableView.movePrevious();
            currentPage--;
            updateHeaderTitle(currentPage);
            0 === currentPage && $.header.init({
                title: "STYLE DISCOVERY"
            });
        } else {
            Alloy.Globals.popWindowInNav();
            $.styleDiscovery.close();
        }
    }
    function submitAnswer() {
        if (currentPage <= $.scrollableView.getViews().length - 2) {
            currentPage++;
            updateHeaderTitle(currentPage);
            $.scrollableView.moveNext();
        } else submitQuiz();
    }
    function quizQuestionList() {
        showLoader($.styleDiscovery);
        var requestMethod = Alloy.Globals.commonUrl.quizQuestion;
        var param = {
            current_page: "1",
            page_size: "1"
        };
        JSON.stringify(param);
        Alloy.Globals.webServiceCall(requestMethod, {}, quizQuestionListSuccessCallback, quizQuestionListErrorCallback, "POST", $.styleDiscovery, true);
    }
    function quizQuestionListSuccessCallback(response) {
        setQuestionView(response.data);
        hideLoader();
    }
    function quizQuestionListErrorCallback(response) {
        hideLoader();
        showAlert($.styleDiscovery, response.message);
    }
    function setQuestionView(data) {
        questionCount = data.question_list.length;
        _.each(data.question_list, function(value, k) {
            $.scrollableView.addView(Alloy.createController("questions", {
                parent: $,
                answerList: value.answers,
                question: value
            }).getView());
        }, banner());
    }
    function banner() {
        "bannerClick" == args && setTimeout(function(e) {
            moveToQuestionScreen();
        }, 500);
    }
    function moveToQuestionScreen() {
        currentPage++;
        updateHeaderTitle(currentPage);
        $.scrollableView.moveNext();
    }
    function updateHeaderTitle(answerCount) {
        $.header.init({
            title: "QUESTION " + answerCount + "/" + questionCount
        });
    }
    function submitQuiz() {
        showLoader($.styleDiscovery);
        var questionList = $.scrollableView.getViews();
        var obj = {};
        for (var i = 1; i < questionList.length; i++) {
            var key = questionList[i].question_id.toString();
            obj[key] = questionList[i].answer_id;
        }
        var requestMethod = Alloy.Globals.commonUrl.submitQuiz;
        var param = {
            answers: obj
        };
        var requestParameter = JSON.stringify(param);
        Alloy.Globals.webServiceCall(requestMethod, requestParameter, submitQuizSuccessCallback, submitQuizErrorCallback, "POST", $.styleDiscovery);
    }
    function submitQuizSuccessCallback(response) {
        hideLoader();
        loadMyStyle ? args.init() : Alloy.Globals.addWindowInNav("quizResults", {
            response: response
        });
        Alloy.Globals.popWindowInNav();
        $.styleDiscovery.close();
    }
    function submitQuizErrorCallback(response) {
        hideLoader();
        showAlert($.styleDiscovery, response.message);
    }
    function cleanUp() {
        $.styleDiscovery.close();
        $.removeListener();
        $.styleDiscovery.remove($.scrollableView);
        $.scrollableView.removeAllChildren();
        args = {};
        loadMyStyle = null;
        currentPage = null;
        questionPage = null;
        questionCount = null;
        $.destroy();
        0 != currentPage && Alloy.Globals.popWindowInNav();
    }
    function updateCount() {
        $.header.updateCartCount();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "styleDiscovery";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.styleDiscovery = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        backgroundColor: "#ffffff",
        id: "styleDiscovery"
    });
    $.__views.styleDiscovery && $.addTopLevelView($.__views.styleDiscovery);
    goToBack ? $.addListener($.__views.styleDiscovery, "android:back", goToBack) : __defers["$.__views.styleDiscovery!android:back!goToBack"] = true;
    updateCount ? $.addListener($.__views.styleDiscovery, "focus", updateCount) : __defers["$.__views.styleDiscovery!focus!updateCount"] = true;
    cleanUp ? $.addListener($.__views.styleDiscovery, "close", cleanUp) : __defers["$.__views.styleDiscovery!close!cleanUp"] = true;
    $.__views.header = Alloy.createWidget("headerView", "widget", {
        id: "header",
        __parentSymbol: $.__views.styleDiscovery
    });
    $.__views.header.setParent($.__views.styleDiscovery);
    var __alloyId1565 = [];
    $.__views.__alloyId1566 = Ti.UI.createScrollView({
        scrollType: "vertical",
        id: "__alloyId1566"
    });
    __alloyId1565.push($.__views.__alloyId1566);
    $.__views.__alloyId1567 = Ti.UI.createView({
        top: 0,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        layout: "vertical",
        backgroundImage: "/images/styleDiscovery.jpg",
        id: "__alloyId1567"
    });
    $.__views.__alloyId1566.add($.__views.__alloyId1567);
    $.__views.__alloyId1568 = Ti.UI.createView({
        top: "40dp",
        width: "45dp",
        height: "1dp",
        backgroundColor: "#cccccc",
        id: "__alloyId1568"
    });
    $.__views.__alloyId1567.add($.__views.__alloyId1568);
    $.__views.__alloyId1569 = Ti.UI.createLabel({
        top: "20dp",
        font: {
            fontSize: "10dp"
        },
        color: "#e65e48",
        text: "DISCOVER YOUR",
        id: "__alloyId1569"
    });
    $.__views.__alloyId1567.add($.__views.__alloyId1569);
    $.__views.__alloyId1570 = Ti.UI.createLabel({
        top: "7dp",
        font: {
            fontSize: "22dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#333333",
        text: "STYLE",
        id: "__alloyId1570"
    });
    $.__views.__alloyId1567.add($.__views.__alloyId1570);
    $.__views.__alloyId1571 = Ti.UI.createLabel({
        top: "22dp",
        width: "88%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#555555",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "Make shopping more fun by exploring designs that truly fit your taste",
        id: "__alloyId1571"
    });
    $.__views.__alloyId1567.add($.__views.__alloyId1571);
    $.__views.__alloyId1572 = Ti.UI.createImageView({
        top: "25dp",
        backgroundColor: "transparent",
        width: Titanium.UI.FILL,
        height: "300dp",
        id: "__alloyId1572"
    });
    $.__views.__alloyId1567.add($.__views.__alloyId1572);
    $.__views.tourDeQuiz = Ti.UI.createLabel({
        font: {
            fontSize: "11dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        top: "20dp",
        bottom: "20dp",
        width: "70%",
        height: "40dp",
        color: "#ffffff",
        backgroundColor: "#CC7b7979",
        borderColor: "#CC7b7979",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "TAKE THE QUIZ",
        id: "tourDeQuiz"
    });
    $.__views.__alloyId1567.add($.__views.tourDeQuiz);
    moveToQuestionScreen ? $.addListener($.__views.tourDeQuiz, "click", moveToQuestionScreen) : __defers["$.__views.tourDeQuiz!click!moveToQuestionScreen"] = true;
    $.__views.scrollableView = Ti.UI.createScrollableView({
        top: "53dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        scrollingEnabled: false,
        views: __alloyId1565,
        id: "scrollableView"
    });
    $.__views.styleDiscovery.add($.__views.scrollableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var loadMyStyle = args.myStyle;
    var currentPage = 0, questionPage = 0, questionCount = 0;
    $.header.getView("menuButton").addEventListener("click", goToBack);
    $.header.getView("home").addEventListener("click", cleanUp);
    $.header.init({
        title: "STYLE DISCOVERY"
    });
    googleAnalyticsScreen("STYLE DISCOVERY");
    quizQuestionList();
    touchEffect.createTouchEffect($.tourDeQuiz, "#a6ffffff", "#ffffff");
    exports.submitAnswer = submitAnswer;
    __defers["$.__views.styleDiscovery!android:back!goToBack"] && $.addListener($.__views.styleDiscovery, "android:back", goToBack);
    __defers["$.__views.styleDiscovery!focus!updateCount"] && $.addListener($.__views.styleDiscovery, "focus", updateCount);
    __defers["$.__views.styleDiscovery!close!cleanUp"] && $.addListener($.__views.styleDiscovery, "close", cleanUp);
    __defers["$.__views.tourDeQuiz!click!moveToQuestionScreen"] && $.addListener($.__views.tourDeQuiz, "click", moveToQuestionScreen);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;