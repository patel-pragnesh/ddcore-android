// Grab a reference to the service and its intent
Ti.API.info('into service js');
var service = Ti.Android.currentService;
var serviceIntent = service.intent;

//Ti.API.info(service.serviceInstanceId);

service.addEventListener('taskremoved', function() {
    Ti.API.info('**************************** taskremoved fired');
});

// service.removeEventListener('pause',taskPause);
// service.addEventListener('pause',taskPause);
// 
// 
// service.removeEventListener('resume', taskResume);
// service.addEventListener('resume', taskResume);



function taskPause(){
    Ti.API.info('**************************** pause fired');
    //service.removeEventListener('pause',taskPause);
}

function taskResume(){
      Ti.API.info('**************************** resume fired');
      //service.removeEventListener('resume', taskResume);
}


// Ti.Android.currentActivity.addEventListener('pause',function(e){
    // Ti.API.info("APP In background");
// });
// 
// Ti.Android.currentActivity.addEventListener('resume',function(e){
    // Ti.API.info("APP In foreground");
// });
// 
// 
// service.addEventListener('taskremoved', function() {
    // Ti.API.info('**************************** taskremoved fired');
// });



