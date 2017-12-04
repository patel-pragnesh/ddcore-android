// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = arguments[0] || {};
//Ti.API.info('args are');
//Ti.API.info(JSON.stringify(args));

touchEffect.createTouchEffect($.closeLbl, "#a6333333", "#333333");
//touchEffect.createTouchEffect($.imagePreviewWishIcon, "#a6333333", "#333333");
touchEffect.createTouchEffect($.imagePreviewShareIcon, "#a6333333", "#333333");

var titouchgallery = require('com.gbaldera.titouchgallery');	
proxy = titouchgallery.createTouchGallery();	

var selectedImage = [];

//Ti.API.info('args = '+JSON.stringify(args));

var currentIndex = [0,(parseInt(Alloy.Globals.platformWidth / 69)-1)];

if (!isNullVal(args.type)) {
	switch(args.type) {
	case"shopByLook":
		getAllImagesSuccessCallback(args);
		break;
	case"collection":
		getAllImages();
		break;
	case"shop":
		if(args.wish_flag){
			$.imagePreviewWishIcon.text = Alloy.Globals.icon.setShortlist;
			$.imagePreviewWishIcon.color = "#e65e48";
		}else{
			$.imagePreviewWishIcon.text = Alloy.Globals.icon.shortlist;
			$.imagePreviewWishIcon.color = "#333333";
		}
		getAllImagesSuccessCallback(args);
	break;
	}
}

function getAllImages() {

	if (args.type == "collection") {

		var url = Alloy.Globals.commonUrl.hotspotGallery;

		var data = {
			collectionID : args.collectionId, //706
		};
	}
	var requestParams = JSON.stringify(data);

	Alloy.Globals.webServiceCall(url, requestParams, getAllImagesSuccessCallback, getAllImagesErrorCallback, "POST", $.imagePreview, true);
}


var baseHeight = 200;
var baseWidth = 200;

function getAllImagesSuccessCallback(e) {
	try {
		
		$.subImageContainer.otherItems = "";
		$.subImageContainer.otherItems = e.data;
		_.each($.subImageContainer.children, function(view, key) {
			$.subImageContainer.remove(view);
		});		
		var loadedViews = []; 
		var imageview = [];
		var imageviewContainer = [];
		var imageviewlist = [];			
		
		_.each(e.data, function(value, k) {	
		    		
				 imageviewlist.push( encodeURI(value));	
			imageviewContainer[k] = Ti.UI.createView({ 
				image : value,
				width : Ti.UI.FILL,
				height : Ti.UI.FILL,
				backgroundColor:"#ffffff"
				});
			imageview[k] = Ti.UI.createImageView({ 
					image : encodeURI(value),
					defaultImage:"/images/default_logo.png"
				});
				
				imageviewContainer[k].add(imageview[k]);
				loadedViews.push(imageviewContainer[k]);
				
			selectedImage[k] = Ti.UI.createView({
				width : "64dp",
				height : "48dp",
				left : "5dp",
				id : k,
				type : "imagePreView",
				borderColor : "transparent",
			});

			imageSubContainer = Ti.UI.createView({
				width : "60dp",
				height : "44dp",
				id : k,
				touchEnabled : false,
				image : value,
				backgroundColor : "#f4f4f4"
			});

			selectedImage[k].add(imageSubContainer);

			otherImage = Ti.UI.createImageView({
				id : k,
				touchEnabled : false,
				image : encodeURI(value),
				defaultImage: "/images/default_logo.png",
				backgroundColor : "#f4f4f4"
			});
	
			imageSubContainer.add(otherImage);
			$.subImageContainer.add(selectedImage[k]);
		});
		
    	proxy.setImages(imageviewlist);
  		
  		proxy.addEventListener("scroll", function(e){
            Ti.API.debug("Scroll event fired: " + JSON.stringify(e));
            
            _.each($.subImageContainer.otherItems, function(value, k) {
    	            selectedImage[k].backgroundColor = "transparent";
    	        });
    	        
    	       selectedImage[e.source.currentPage].backgroundColor = "#e65e48";
    	       
    	       
    	       
    	       if (e.source.currentPage > currentIndex[1]) {
    				currentIndex[1] = currentIndex[1]+1;
    				currentIndex[0] = currentIndex[0]+1;
    				$.subImageContainer.scrollTo(e.source.currentPage*69, 0);
    			}else if (e.source.currentPage < currentIndex[0]) {
    				currentIndex[1] = currentIndex[1]-1;
    				currentIndex[0] = currentIndex[0]-1;
    				$.subImageContainer.scrollTo(e.source.currentPage*69, 0);
    			}	
    	
	       
   		 });
   		 
        $.imagePreviewContainer.add(proxy);

	   //$.imagePreviewContainer.views = loadedViews;
		 selectedImage[0].backgroundColor = "#e65e48";
 
	} catch(ex) {
		Ti.API.info('catch= ' + ex.message);
	}

}

function getAllImagesErrorCallback(e) {
	Ti.API.info('e= ' + JSON.stringify(e));
}


$.closeLbl.addEventListener('click', function(e) {
	hideShowView($.imagePreview);
	$.imagePreview.type = "";
});

$.imagePreviewWishIcon.addEventListener('click',function(e){
	
	if (!isNullVal(args.type)) {
		switch(args.type) {
		case"shopByLook":
			var collectionData = {
				collectionName : args.collectionName,
				collectionId : args.collectionId,
				type : "shopByLook",
			};
			var addShortlist = Alloy.createController('addToShortlist', collectionData).getView();
			$.imagePreview.add(addShortlist);
			hideShowView(addShortlist);
			break;
		case"collection":
			var collectionData = {
				collectionName : args.collectionName,
				collectionId : args.collectionId,
				type : "collection",
			};
			var addShortlist = Alloy.createController('addToShortlist', collectionData).getView();
			$.imagePreview.add(addShortlist);
			hideShowView(addShortlist);
			break;
		case"shop":
			
			if (!isNullVal(Ti.App.Properties.getString("access_token"))) {
				if (e.source.text == "\ue927") {
					$.imagePreviewWishIcon.text = Alloy.Globals.icon.shortlist;
					$.imagePreviewWishIcon.color = "#333333";
					var url = Alloy.Globals.commonUrl.removeShortlist;
					var data = {
						product_id : args.product_id
					};
					var requestParams = JSON.stringify(data);
					Alloy.Globals.webServiceCall(url, requestParams, removeShortlistProductSuccessCallback, removeShortlistProductErrorCallback, "POST", $.imagePreview);
	
				} else {
					$.imagePreviewWishIcon.text = Alloy.Globals.icon.setShortlist;
					$.imagePreviewWishIcon.color = "#e65e48";
		
					var url = Alloy.Globals.commonUrl.addToShortlist;
					var data = {
						product_id : args.product_id
					};
			
					var requestParams = JSON.stringify(data);
			
					Alloy.Globals.webServiceCall(url, requestParams, addToShortlistSuccessCallback, addToShortlistErrorCallback, "POST", $.imagePreview);
				}

			} else {
				Alloy.Globals.addWindowInNav("signIn", "imagePreview");
			}	
			break;
		}
}
		
});


function addToShortlistSuccessCallback(e) {
	try {
		// $.imagePreviewWishIcon.text = Alloy.Globals.icon.setShortlist;
		// $.imagePreviewWishIcon.color = "#e65e48";
		showAlert($.imagePreview, e.message);
	} catch(e) {
		Ti.API.info('catch = ' + JSON.stringify(e));
	}
}

function addToShortlistErrorCallback(e) {
	showAlert($.imagePreview, e.message);
	$.imagePreviewWishIcon.text = Alloy.Globals.icon.shortlist;
	$.imagePreviewWishIcon.color = "#333333";
}


function removeShortlistProductSuccessCallback(e) {
	try {
		// $.imagePreviewWishIcon.text = Alloy.Globals.icon.shortlist;
		// $.imagePreviewWishIcon.color = "#333333";
		showAlert($.imagePreview, e.message);
	} catch(ex) {
		Ti.API.info('catch = ' + JSON.stringify(ex.message));
	}
}

function removeShortlistProductErrorCallback(e) {
	showAlert($.imagePreview, e.message);
	$.imagePreviewWishIcon.text = Alloy.Globals.icon.setShortlist;
	$.imagePreviewWishIcon.color = "#e65e48";
}

$.imagePreviewContainer.addEventListener('scrollend',function(e){
	
	Ti.API.info('e.currentPage = '+e.currentPage);
	
	_.each($.subImageContainer.otherItems, function(value, k) {
			selectedImage[k].backgroundColor = "transparent";
	});
	selectedImage[e.currentPage].backgroundColor = "#e65e48";
	
	if (e.currentPage > currentIndex[1]) {
		currentIndex[1] = currentIndex[1]+1;
		currentIndex[0] = currentIndex[0]+1;
		$.subImageContainer.scrollTo(e.currentPage*69, 0);
	} else if (e.currentPage < currentIndex[0]) {
		currentIndex[1] = currentIndex[1]-1;
		currentIndex[0] = currentIndex[0]-1;
		$.subImageContainer.scrollTo(e.currentPage*69, 0);
	}		
});

$.imagePreviewShareIcon.addEventListener("click",function(){
	//Ti.API.info('social share called');
	//Ti.API.info('share tu'+args.sharingProductUrl);
		shareImage(args.sharingProductUrl);
	// socialShare();
});






/*

$.subImageContainer.addEventListener('click', function(e) {

   
    Ti.API.info('subImageContainer--->' + e.source.type);
    Ti.API.info('subImageContainer--->' + $.subImageContainer.otherItems);
    Ti.API.info('subImageContainer--->' + e.source.children[0].id);
    
    
     if (e.source.type == "imagePreView") {
        _.each($.subImageContainer.otherItems, function(value, k) {
            selectedImage[k].backgroundColor = "transparent";
        });
        
        selectedImage[e.source.id].backgroundColor = "#e65e48";
        $.imagePreviewContainer.scrollToView(e.source.children[0].id);
        
    }
    
    
});

*/