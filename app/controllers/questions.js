var args = arguments[0] || {};

var answerList = args.answerList;
var answerList1 = args.answerList;
var answerList2 = args.answerList;
var questionDetail = args.question;

$.question.setText(questionDetail.question);
$.question.question_id = questionDetail.question_id;

//args.parent.question_id = questionDetail.question_id;
$.questions.question_id = questionDetail.question_id;


var firstIndex = 0;
var answerArr = answerList.splice(0, 2);

setAnswer();

//for (var i = 0; i < 3; i++) {
function setAnswer() {

    var rowArr = [answerArr];

    _.each(rowArr, function(value, k) {

        /* for the row */
       

        var rowView = $.UI.create('View', {
            classes : 'row'
        });

        /* for the left button */
        var leftButton = $.UI.create('View', {
            classes : ['answerbutton', 'leftAlign'],
            clickType : "buttons"
        });
        var labelLeft = $.UI.create('Label', {
            classes : ['answerLabel', 'fontMedium'],
            //text : "A CASTLE IN ENGLAND",
            text : (value[0].answer).toUpperCase(),
            answer : value[0].answer,
            answer_id : value[0].answer_id,
            img : value[0].img,
            // color:"#e65e48",
            clickType : "buttons",
            
        });
        leftButton.add(labelLeft);
        
         if (firstIndex === 0) {
            $.answersImage.setImage(encodeURI(value[0].img));
            
            // $.answersImage1.setImage(encodeURI(value[0].img));
            /***/

            // var blob = $.answersImage1.toBlob();
            // var _image = blob.imageAsResized(640, 960);
            // $.answersImage.setImage(_image);

            /***/
            
            
            
            $.answersImage.selected = true;
            labelLeft.setColor("#e65e48");
            //args.parent.answer_id = value[0].answer_id;
            $.questions.answer_id = value[0].answer_id;
        }

        /* for the vertical seperator */
        var vSep = $.UI.create('View', {
            classes : ['vertical_seperator']
        });

        /* for the right button */
        var rightButton = $.UI.create('View', {
            classes : ['answerbutton', 'rightAlign'],
            clickType : "buttons"
        });
        var labelRight = $.UI.create('Label', {
            classes : ['answerLabel', 'fontMedium'],
            //text : "SHOPPING TRIP AT MANHATTAN",
            text : (value[1].answer).toUpperCase(),
            answer : value[1].answer,
            answer_id : value[1].answer_id,
            img : value[1].img,
            clickType : "buttons"
        });
        rightButton.add(labelRight);

        /* for the vertical seperator */
        var hSep = $.UI.create('View', {
            classes : ['horizontal_seperator']
        });

        rowView.add(leftButton);
        rowView.add(vSep);

        rowView.add(rightButton);
        rowView.add(hSep);

        $.options.add(rowView);
        //}
    });

    firstIndex = firstIndex + 2;
   // Ti.API.info('firstIndex-->' + firstIndex);

    if (firstIndex <= 4) {
        answerArr = answerList.splice(0, 2);
        setAnswer();

    }

}

$.options.addEventListener('click', function(e) {
    _.each($.options.children, function(row, rowNo) {
        row.children[0].children[0].color = "#cccccc";
        row.children[2].children[0].color = "#cccccc";
    });

    if (e.source.clickType && e.source.clickType == "buttons") {
        $.answersImage.selected = true;
        $.answersImage.setImage(e.source.img);
        
        // $.answersImage1.setImage(e.source.img);

        /***/

        //var blob = $.answersImage1.toBlob();
        //var _image = blob.imageAsResized(640, 960);
        //$.answersImage.setImage(_image);

        /***/
        

        if (e.source.apiName == "Ti.UI.View") {
            e.source.children[0].color = "#e65e48";
            //args.parent.answer_id = e.source.children[0].answer_id;
            $.questions.answer_id = e.source.children[0].answer_id;
            
        } else if (e.source.apiName == "Ti.UI.Label") {
            e.source.color = "#e65e48";
            // args.parent.answer_id = e.source.answer_id;
             $.questions.answer_id = e.source.answer_id;
        }
    }
});

$.answersImage.addEventListener('click', function(e) {
    if (e.source.clickType && e.source.clickType == "image" && e.source.selected) {
        args.parent.submitAnswer();
    }
});
