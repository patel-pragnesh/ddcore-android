var args = arguments[0] || {};
//var mainContainer = args.mainContainer;

var state = ["Maharastra", "Assam", "Goa", "Tamil Nadu", "Maharastra", "Assam", "Goa", "Tamil Nadu", "Maharastra", "Assam", "Goa", "Tamil Nadu"];

for (var i = 0; i < state.length; i++) {
    var listName = $.UI.create("Label", {
        classes : "fontLight",
        font : {
            fontSize : "12sp"
        },
        color : "black",
        top : "5dp",
        text : state[i],
        textAlign :Ti.UI.TEXT_ALIGNMENT_LEFT
        //left:"5dp"
    });
    $.dropdownList.add(listName);
}
    