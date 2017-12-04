var args = arguments[0] || {};



//$.picker.value = new Date();
//$.picker1.value = new Date();
var picker;
if (args.setDate) {
    $.pickerContainer.remove($.picker1);
    picker = $.picker;
} else {
    $.pickerContainer.remove($.picker);
    picker = $.picker1;
}

if (!isNullVal(args)) {
    if (args.year != "" || args.month != "" || args.day != "") { 
    
        if (args.day.date != "") {
    
            _date = moment(args.day.date).format('MM,DD,YYYY');
    
            picker.value = new Date(_date);
    
        } else {
            picker.value = new Date();
        }
    
    }
}

/*
 //commented for time begin
 if (args.setDate) {
 if (args.year != "" || args.month != "" || args.day != "") {

 if (args.day.date != "") {
 _date = moment(args.day.date).format('MM,DD,YYYY');

 picker.value = new Date(_date);

 } else {
 picker.value = new Date();
 }

 }
 }
 */

function changeDate(e) {
    //Ti.API.info('Json files-->' + JSON.stringify(e));
    //Ti.API.info('date value-->' + e.value);
}

function setDate() {
    //Ti.API.info('picker--> ' + $.picker.value);

    setTimeout(function() {

        try {

            if (!args.isAddress) {
                var currentDate = moment(picker.value);
                //var currentDate = moment(picker.value);
                var month = (currentDate.month() + 1);
                args.day.text = currentDate.date();
                args.month.text = month;
                args.year.text = currentDate.year();

                var _date = (args.day.text).toString();
                var _month = (month).toString();

                if (_date.length == 1) {
                    args.day.text = "0" + currentDate.date();
                }
                if (_month.length == 1) {
                    args.month.text = "0" + month;
                }
                args.day.date = currentDate;

                //Ti.API.info('args.day.date-->' + args.day.date);
            }

            closePicker();
        } catch(exp) {
            Ti.API.info('date picker expection--->' + exp.message);
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
