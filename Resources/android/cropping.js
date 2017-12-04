var args = arguments[0] || {};

originalImage = null;

exports.callimagecrop = function(photoView, win1, aspectRatio, returnFunction, removeFlag, removePhotoFunction) {
    function cropImage(dataToCrop, ImageToSet, imagefrom, aspectRatio) {
        Ti.API.info("photoView" + JSON.stringify(ImageToSet));
        var intent = Ti.Android.createIntent({
            action: "com.android.camera.action.CROP",
            data: dataToCrop,
            type: "image/*",
            flags: Titanium.Android.FLAG_GRANT_READ_URI_PERMISSION | Titanium.Android.FLAG_GRANT_WRITE_URI_PERMISSION
        });
        intent.putExtra("crop", true);
        intent.putExtra("aspectX", aspectRatio.x);
        intent.putExtra("aspectY", aspectRatio.y);
        intent.putExtra("scale", true);
        intent.putExtra("scaleUpIfNeeded", true);
        intent.putExtra("return-data", false);
        intent.putExtra("circleCrop", true);
        var activity = win1.getActivity();
        activity.startActivityForResult(intent, function(param) {
            Ti.API.info("param.resultCode " + param.resultCode);
            if (param.resultCode == Ti.Android.RESULT_OK && param.intent) {
                try {
                    var imageDir = Titanium.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, "ddecor");
                    imageDir.exists() || imageDir.createDirectory();
                    var source = Ti.Filesystem.getFile(null == param.intent.data ? intent.data : param.intent.data);
                    var photoFile = Ti.Filesystem.getFile(imageDir.nativePath, source.name);
                    source.copy(photoFile.nativePath);
                    var imageData = photoFile.read();
                    ImageToSet.image = imageData;
                    "camera" === imagefrom ? ImageToSet.isCamera = true : ImageToSet.isCamera = false;
                    originalImage = imageData;
                    returnFunction();
                } catch (e) {
                    alert("Cannot Crop Image! " + e);
                }
                intent = null, activity = null, imageDir = null, source = null, photoFile = null, 
                imageData = null;
            }
        });
    }
    var dialog = Titanium.UI.createOptionDialog({
        title: "Choose an image source...",
        options: true == removeFlag ? [ "Camera", "Photo Gallery", "Delete Photo", "Cancel" ] : [ "Camera", "Photo Gallery", "Cancel" ],
        cancel: true == removeFlag ? 3 : 2,
        customCancel: true == removeFlag ? 3 : 2
    });
    dialog.show();
    dialog.addEventListener("click", function(e) {
        if (0 == e.index) {
            if (Ti.Media.isCameraSupported) {
                Ti.API.info("camera supported");
                var count = 1;
                Ti.UI.createView({
                    width: "100%",
                    height: "100%",
                    backgroundColor: "transparent",
                    zIndex: 10
                });
                Ti.UI.createLabel({
                    text: count,
                    width: Ti.UI.SIZE,
                    height: Ti.UI.SIZE,
                    color: "#fff",
                    font: {
                        fontSize: "200sp"
                    }
                });
            }
            Titanium.Media.showCamera({
                success: function(event) {
                    event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO && cropImage(event.media.getFile().nativePath, photoView, "camera", aspectRatio);
                },
                error: function(error) {
                    var a = Titanium.UI.createAlertDialog({
                        title: "Camera"
                    });
                    error.code == Titanium.Media.NO_CAMERA ? a.setMessage("Device does not have camera") : a.setMessage("Unexpected error: " + error.code);
                    a.show();
                },
                saveToPhotoGallery: true,
                allowEditing: true,
                mediaTypes: [ Ti.Media.MEDIA_TYPE_PHOTO ],
                showControls: true
            });
            Ti.Media.switchCamera(Ti.Media.CAMERA_FRONT);
        } else 1 == e.index ? Ti.Media.openPhotoGallery({
            mediaTypes: [ Ti.Media.MEDIA_TYPE_PHOTO ],
            success: function(event) {
                Ti.API.info(JSON.stringify(event));
                event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO && cropImage(event.media.nativePath, photoView, "gallery", aspectRatio);
            },
            error: function(error) {
                var a = Titanium.UI.createAlertDialog({
                    title: "Gallery"
                });
                error.code == Titanium.Media.NO_CAMERA ? a.setMessage("Gallery not found") : a.setMessage("Unexpected error: " + error.code);
                a.show();
            },
            allowEditing: true,
            animated: true,
            autohide: true,
            mediaTypes: [ Ti.Media.MEDIA_TYPE_PHOTO ]
        }) : true == removeFlag && 3 == e.source.customCancel && 2 == e.index && removePhotoFunction();
    });
};

exports.getOriginalImage = function() {
    return originalImage;
};