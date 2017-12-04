function taskPause() {
    Ti.API.info("**************************** pause fired");
}

function taskResume() {
    Ti.API.info("**************************** resume fired");
}

Ti.API.info("into service js");

var service = Ti.Android.currentService;

var serviceIntent = service.intent;

service.addEventListener("taskremoved", function() {
    Ti.API.info("**************************** taskremoved fired");
});