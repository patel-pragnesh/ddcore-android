var args = arguments[0] || {};
originalImage = null;
exports.callimagecrop = function(photoView, win1, aspectRatio, returnFunction, removeFlag, removePhotoFunction) {
    var dialog = Titanium.UI.createOptionDialog({
        title : 'Choose an image source...',
        //options : ['Camera', 'Photo Gallery', 'Cancel'],
        //cancel : 2
        options : ((removeFlag == true) ? ['Camera', 'Photo Gallery', 'Delete Photo', 'Cancel'] : ['Camera', 'Photo Gallery', 'Cancel']),
        cancel : ((removeFlag == true) ? 3 : 2),
        customCancel : ((removeFlag == true) ? 3 : 2),
    });
    dialog.show();
    dialog.addEventListener('click', function(e) {
        if (e.index == 0) {

            if (Ti.Media.isCameraSupported) {

                Ti.API.info('camera supported');

                var count = 1;

                var vwCameraCountContainer = Ti.UI.createView({
                    width : "100%",
                    height : "100%",
                    backgroundColor : "transparent",
                    zIndex : 10
                });

                var lblCameraCount = Ti.UI.createLabel({
                    text : count,
                    width : Ti.UI.SIZE,
                    height : Ti.UI.SIZE,
                    color : "#fff",
                    font : {
                        fontSize : "200sp"
                    }
                });

            }

            //if (Ti.Platform.osname === "android") {
            Titanium.Media.showCamera({
                success : function(event) {
                    if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                        if (Ti.Platform.osname === "android") {

                            cropImage(event.media.getFile().nativePath, photoView, "camera", aspectRatio);
                            //Ti.App.fireEvent("changePhoto");
                        } else {
                            photoView.image = event.media;
                            photoView.isCamera = true;
                            originalImage = event.media;
                            //Alloy.Globals.setImageFlag = true;
                            //Ti.App.fireEvent("changePhoto");
                            returnFunction();
                        }
                    }
                },

                error : function(error) {
                    var a = Titanium.UI.createAlertDialog({
                        title : 'Camera'
                    });
                    if (error.code == Titanium.Media.NO_CAMERA) {
                        a.setMessage('Device does not have camera');
                    } else {
                        a.setMessage('Unexpected error: ' + error.code);
                    }
                    a.show();
                },
                saveToPhotoGallery : true,
                allowEditing : true,
                mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
                showControls : true,
                //overlay : vwCameraCountContainer,
                // autohide:true,
                //animated:true,
            });

            //open Front Camera
            Ti.Media.switchCamera(Ti.Media.CAMERA_FRONT);

        } else if (e.index == 1) {
            //if (Ti.Platform.osname === "android") {
            Ti.Media.openPhotoGallery({
                mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
                success : function(event) {
                    Ti.API.info(JSON.stringify(event));
                    if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                        if (Ti.Platform.osname === "android") {

                            cropImage(event.media.nativePath, photoView, "gallery", aspectRatio);
                            //Ti.App.fireEvent("changePhoto");
                        } else {
                            photoView.image = event.media;
                            originalImage = event.media;
                            //Alloy.Globals.setImageFlag = true;
                            //Ti.API.info('set value');
                            //Ti.App.fireEvent("changePhoto");
                            returnFunction();
                        }
                    }
                },
                error : function(error) {
                    var a = Titanium.UI.createAlertDialog({
                        title : 'Gallery'
                    });
                    if (error.code == Titanium.Media.NO_CAMERA) {
                        a.setMessage('Gallery not found');
                    } else {
                        a.setMessage('Unexpected error: ' + error.code);
                    }
                    a.show();
                },
                allowEditing : true,
                animated : true,
                autohide : true,
                mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
                // popoverView:
            });

        } else {
            // Ti.App.Properties.setString("photo", null);

            if (removeFlag == true && e.source.customCancel == 3 && e.index == 2) {

                removePhotoFunction();
            }
        }
    });

    function cropImage(dataToCrop, ImageToSet, imagefrom, aspectRatio) {
        Ti.API.info('photoView' + JSON.stringify(ImageToSet));
        var intent = Ti.Android.createIntent({
            action : "com.android.camera.action.CROP",
            data : dataToCrop,
            type : 'image/*',
            flags : Titanium.Android.FLAG_GRANT_READ_URI_PERMISSION | Titanium.Android.FLAG_GRANT_WRITE_URI_PERMISSION
        });

        intent.putExtra("crop", true);
        //intent.putExtra("outputX", 160);
        //intent.putExtra("outputY", );
        intent.putExtra("aspectX", aspectRatio.x);
        intent.putExtra("aspectY", aspectRatio.y);
        intent.putExtra("scale", true);
        intent.putExtra("scaleUpIfNeeded", true);
        intent.putExtra("return-data", false);
        intent.putExtra("circleCrop", true);

        /*
         intent.putExtra(MediaStore.EXTRA_OUTPUT, getTempUri());
         intent.putExtra("outputFormat", Bitmap.CompressFormat.JPEG.toString());
         intent.putExtra("noFaceDetection", true);        // lol, negative boolean noFaceDetection
         */
        var activity = win1.getActivity();

        activity.startActivityForResult(intent, function(param) {
            Ti.API.info('param.resultCode ' + param.resultCode);
            if (param.resultCode == Ti.Android.RESULT_OK) {
                if (param.intent) {
                    try {
                        var imageDir = Titanium.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'ddecor');
                        if (!imageDir.exists()) {
                            imageDir.createDirectory();
                        }

                        // var source = Ti.Filesystem.getFile(param.intent.data);
                        // var photoFile = Ti.Filesystem.getFile(imageDir.nativePath, source.name);
                        // source.copy(photoFile.nativePath);
                        // var imageData = photoFile.read();
                        //Ti.API.info('param.intent.data ' + param.intent.data);
                        //Ti.API.info('intent.data '+intent.data);
                        var source = Ti.Filesystem.getFile((param.intent.data == null ? intent.data : param.intent.data));
                        var photoFile = Ti.Filesystem.getFile(imageDir.nativePath, source.name);
                        source.copy(photoFile.nativePath);
                        var imageData = photoFile.read();

                        //ImageToSet.extension = photoFile.extension();
                        //ImageToSet.filename = photoFile.getName();

                        ImageToSet.image = imageData;
                        //(photoFile.nativePath);

                        //imageData;

                        if (imagefrom === "camera") {
                            ImageToSet.isCamera = true;
                        } else {
                            ImageToSet.isCamera = false;

                        }

                        // var _blob = (ImageToSet.image).toBlob();
                        //
                        // Ti.API.info('blob-->' + _blob);
                        // var resizedImg = (_blob).imageAsResized(1000, 1000);
                        //
                        // ImageToSet.image = resizedImg;

                        //ImageToSet.base64 = Titanium.Utils.base64encode(imageData);

                        //ImageToSet.fireEvent('getReal');

                        //Ti.API.info('base64encoded--> '+ Ti.Utils.base64encode(ImageToSet).toString());

                        // Ti.API.info('photoView -->' + JSON.stringify(ImageToSet));

                        // textContainer.children[2].children[0].children[1].visible = false;
                        originalImage = imageData;
                        //Ti.App.Properties.setString("photo", Titanium.Utils.base64encode(imageData));
                        // if (imagefrom == "gallery") {
                        // if (imageDir.deleteDirectory() == false) {
                        // imageDir.deleteDirectory(true);
                        // // force a recursive directory, which will delete contents
                        //
                        // }
                        // }

                        // Ti.App.fireEvent("changePhoto");
                        returnFunction();

                    } catch(e) {
                        alert("Cannot Crop Image! " + e);
                    }

                    intent = null,
                    activity = null,
                    imageDir = null,
                    source = null,
                    photoFile = null,
                    imageData = null;
                }
            }
        });
    }

};

exports.getOriginalImage = function() {
    return originalImage;
};
