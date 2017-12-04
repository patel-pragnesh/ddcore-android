var args = arguments[0] || {};

var loadMyStyle = args.myStyle;

//Ti.API.info('init-->' + loadMyStyle);

var currentPage = 0,
    questionPage = 0,
    questionCount = 0;

$.header.getView("menuButton").addEventListener("click", goToBack);

$.header.getView("home").addEventListener("click", cleanUp);

/*Please do not pass the window reference */
$.header.init({
    title : "STYLE DISCOVERY",
    //passWindow : $.styleDiscovery,
    // passWindow : $.styleDiscovery,
});

googleAnalyticsScreen("STYLE DISCOVERY");

//getQuizResult();
quizQuestionList();

touchEffect.createTouchEffect($.tourDeQuiz, "#a6ffffff", "#ffffff");

// commented for time begin
/*
$.tourDeQuiz.addEventListener('click', function(e) {
currentPage++;
$.scrollableView.moveNext();
});

for ( i = 0; i < 10; i++) {
$.scrollableView.addView(Alloy.createController('questions', {
parent : $
}).getView());
}
*/

// $.styleDiscovery.addEventListener('android:back', function() {
// if (currentPage > 0) {
// $.scrollableView.movePrevious();
// currentPage--;
// updateHeaderTitle(currentPage);
// } else {
// $.styleDiscovery.close();
// }
// });

function goToBack() {

    //Ti.API.info('currentPage-->' + currentPage);

    if (currentPage > 0) {
        $.scrollableView.movePrevious();
        currentPage--;
        updateHeaderTitle(currentPage);

        if (currentPage === 0) {
            $.header.init({
                title : "STYLE DISCOVERY",
            });
        }

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
    } else {

        submitQuiz();

        //Ti.API.info('quiz Result-->'+JSON.stringify($.scrollableView.getViews()[1].question_id));

        // commented for time beign
        // Alloy.createController("quizResults").getView().open();
        // $.styleDiscovery.close();
    }
}

function quizQuestionList() {
    showLoader($.styleDiscovery);
    var requestMethod = Alloy.Globals.commonUrl.quizQuestion;
    var param = {
        current_page : "1",
        page_size : "1"
    };

    var requestParameter = JSON.stringify(param);
    //Ti.API.info('requestParameter --> ' + requestParameter);

    Alloy.Globals.webServiceCall(requestMethod, {}, quizQuestionListSuccessCallback, quizQuestionListErrorCallback, "POST", $.styleDiscovery, true);
}

function quizQuestionListSuccessCallback(response) {
    //Ti.API.info('quiz Question success-->' + JSON.stringify(response));
    setQuestionView(response.data);
    hideLoader();
}

function quizQuestionListErrorCallback(response) {
    //Ti.API.info('quiz Question error-->' + JSON.stringify(response));
    hideLoader();
    showAlert($.styleDiscovery, response.message);
}

function setQuestionView(data) {

    //for (var i = 0; i < 10; i++) {
   
    questionCount = data.question_list.length;
    _.each(data.question_list, function(value, k) {

        $.scrollableView.addView(Alloy.createController('questions', {
            parent : $,
            answerList : value.answers,
            question : value,
        }).getView());
        //}
    },banner());

}
 
 
 function banner(){
        if(args == "bannerClick")
        {   
            setTimeout(function(e){
                moveToQuestionScreen();
            },500);
             
        }
    };
function moveToQuestionScreen() {
    currentPage++;
    updateHeaderTitle(currentPage);
    $.scrollableView.moveNext();

}



function updateHeaderTitle(answerCount) {
    $.header.init({
        title : "QUESTION " + answerCount + "/" + questionCount,
    });
}

function submitQuiz() {
    showLoader($.styleDiscovery);

    var questionList = $.scrollableView.getViews();

    var obj = {};

    for (var i = 1; i < questionList.length; i++) {
        //obj[key] = value;
        //Ti.API.info('questionList[i].question_id---> ' + questionList[i].question_id);

        //Ti.API.info('questionList[i].answer_id---> ' + questionList[i].answer_id);

        var key = (questionList[i].question_id).toString();
        obj[key] = questionList[i].answer_id;

        //Ti.API.info('obj--->' + JSON.stringify(obj));
    }

    var requestMethod = Alloy.Globals.commonUrl.submitQuiz;
    var param = {
        answers : obj
    };

    var requestParameter = JSON.stringify(param);
    //Ti.API.info('requestParameter --> ' + requestParameter);
    Alloy.Globals.webServiceCall(requestMethod, requestParameter, submitQuizSuccessCallback, submitQuizErrorCallback, "POST", $.styleDiscovery);
}

function submitQuizSuccessCallback(response) {
    hideLoader();
    //Ti.API.info('submit quiz success-->' + JSON.stringify(response));

    // Alloy.createController("quizResults").getView().open();
    if (loadMyStyle) {
        //loadMyStyle();

        args.init();
    } else {

        Alloy.Globals.addWindowInNav("quizResults", {
            response : response
        });
    }
    Alloy.Globals.popWindowInNav();
    $.styleDiscovery.close();
}

function submitQuizErrorCallback(response) {
    //Ti.API.info('submit quiz error-->' + JSON.stringify(response));
    hideLoader();
    showAlert($.styleDiscovery, response.message);
}

function getQuizResult() {
    showLoader($.styleDiscovery);
    var requestMethod = Alloy.Globals.commonUrl.quizResult;
    Alloy.Globals.webServiceCall(requestMethod, {}, getQuizResultSuccessCallback, getQuizResultErrorCallback, "POST", $.styleDiscovery);

}

function getQuizResultSuccessCallback(response) {
    //Ti.API.info('quiz success--->' + JSON.stringify(response));
}

function getQuizResultErrorCallback(response) {

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

    if (currentPage != 0) {
        Alloy.Globals.popWindowInNav();
    }
}

exports.submitAnswer = submitAnswer;

//exports.updateHeaderTitle = updateHeaderTitle;

function updateCount() {
    $.header.updateCartCount();
}