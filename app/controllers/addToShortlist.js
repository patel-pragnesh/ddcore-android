var args = arguments[0] || {};
//Ti.API.info('args = ' + JSON.stringify(args));

var selectedCount;
touchEffect.createTouchEffect($.shortlistSelectedLbl, "#a6ffffff", "#ffffff");
//touchEffect.createTouchEffect($.refreshIcon, "#a6ffffff", "#ffffff");
touchEffect.createTouchEffect($.fabricCloseLbl, "#a6ffffff", "#ffffff");

var fabricsCollectionWidth = parseInt(Alloy.Globals.platformWidth - 20);

$.fabricSelectedContainer.width = fabricsCollectionWidth;
var fabricsInnerContainer = parseInt(fabricsCollectionWidth - 50);
var fabricsWidthHeight = parseInt(fabricsInnerContainer / 4);


if(args.type == "collection"){
	$.collectionFabricTitle.text = "COLLECTION FABRICS";
	$.collectionTitle.text = "COLLECTION";
}else if(args.type == "shopByLook"){
	$.collectionFabricTitle.text = "LOOK FABRICS";
	$.collectionTitle.text = "LOOK";
}

fabricsContainer = [];
var selectedFabrics = [];
var gaSelectedFabrics =[];
var fabricsContainer = null,
    fabrics = null,
    ckeckLbl = null;
function displayFabric(e) {
	fabrics = [];
	//fabricsContainer = [];
	ckeckLbl = [];

	_.each(e, function(value, k) {

		fabricsContainer = Ti.UI.createView({
			width : fabricsWidthHeight,
			height : fabricsWidthHeight,
			top : "10dp",
			left : "10dp",
			id : value.entity_id,
			name : value.name,
			type : "fabricsCont"
		});

		fabrics = Ti.UI.createImageView({
			width : Ti.UI.FILL,
			height : Ti.UI.FILL,
			image : value.image,
			defaultImage:"/images/default_logo.png",
			top : "0dp",
			left : "0dp",
			borderColor : "#e65e48",
			borderWidth : "2",
			touchEnabled : false
		});

		fabricsContainer.add(fabrics);
		fabrics = null,

		ckeckLbl = Ti.UI.createLabel({
			width : "15dp",
			height : "15dp",
			right : "0dp",
			bottom : "0dp",
			text : Alloy.Globals.icon.tick,
			backgroundColor : "#e65e48",
			font : {
				fontSize : "10dp",
				fontFamily : "icomoon",
			},
			textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
			color : "#ffffff",
			touchEnabled : false
		});

		fabricsContainer.add(ckeckLbl);
		ckeckLbl = null;
		$.fabricSelectedContainer.add(fabricsContainer);
		selectedFabrics.push(value.entity_id);
		
		// gaSelectedFabrics.push({
		  // name :  value.name,
		  // sku : value.entity_id,
		  // lostSale : false,
		// });
		//gaSelectedFabrics.push(value.name +"("+value.entity_id+")");
		gaSelectedFabrics.push(value.name +"("+value.entity_id+")");
		if(!isNullVal(value.product_sku)){
		    
		  //gaSelectedFabrics.push(value.product_sku);
		}
		
	});
	hideLoader($.collectionFabricController);
}

$.fabricSelectedContainer.removeEventListener('click', fabricsSelectedEffect);
$.fabricSelectedContainer.addEventListener('click', fabricsSelectedEffect);

function fabricsSelectedEffect(e) {
	if (e.source.type == "fabricsCont") {
		if (e.source.children[0].borderWidth == "2") {
			e.source.children[0].borderWidth = "0";
			e.source.children[1].backgroundColor = "transparent";
			e.source.children[1].text = "";
			selectedFabrics.splice(selectedFabrics.indexOf(e.source.id), 1);
			gaSelectedFabrics.splice(gaSelectedFabrics.indexOf(e.source.name+"("+e.source.id+")"), 1);
			setAttributeStr(selectedFabrics.length);
		} else {
			e.source.children[0].borderWidth = "2";
			e.source.children[1].backgroundColor = "#e65e48";
			e.source.children[1].text = Alloy.Globals.icon.tick;
			selectedFabrics.push(e.source.id);
			gaSelectedFabrics.push(e.source.name+"("+e.source.id+")");
			setAttributeStr(selectedFabrics.length);
		}
	}
}

$.fabricCloseLbl.addEventListener('click', function(e) {
	hideShowView($.collectionFabricController);
	$.collectionFabricController.type = "";
});

/*
 * get collection sku
 */

	//var bind = args.bindId;
	//var index = args.itemIndex;
	//var a = args.section.items[index];
	$.fabricDescription.text =  args.collectionName;	
	
function getCollectionProduct(e) {
	showLoader($.collectionFabricController);
	var url = "";
	var data = {};
	if(args.type == "collection"){
		url = Alloy.Globals.commonUrl.getCollectionProducts;
		data["collection_id"] = args.collectionId;
	}else if(args.type == "shopByLook"){
		url = Alloy.Globals.commonUrl.getLookProducts;
		data["look_id"] = args.collectionId;
	}

	//Ti.API.info('data' + JSON.stringify(data));

	var requestParams = JSON.stringify(data);

	Alloy.Globals.webServiceCall(url, requestParams, getCollectionProductSuccessCallback, getCollectionProductErrorCallback, "POST", $.collectionFabricController, true);
}

getCollectionProduct();

function getCollectionProductSuccessCallback(e) {

	try {
		
		if (e.data.count > 0) {	
			$.shortlistContainer.visible = true;	
		 	selectedCount = e.data.count+" Selected";
			setAttributeStr(e.data.count);
			displayFabric(e.data.products);
		} else {
			showAlert($.collectionFabricController, "There are no products in this collection");
			setTimeout(function() {
				hideShowView($.collectionFabricController);
			}, 2000);
		}
	} catch(e) {
		Ti.API.info('catch = ' + JSON.stringify(e));
	}
}

function getCollectionProductErrorCallback(e) {
	hideLoader($.collectionFabricController);
	showAlert($.collectionFabricController, e.message);
	setTimeout(function() {
		$.collectionFabricController.type = "";
		hideShowView($.collectionFabricController);			
	}, 2000);
}


function setAttributeStr(count){
		
		selectedCount = count+" Selected";
		var attr = Ti.UI.createAttributedString({
				text : selectedCount,
				attributes : [{
					type : Ti.UI.ATTRIBUTE_FONT,
					value : {
						color : "#e65e48",
						font : {
							fontFamily : "futura_medium_bt-webfont"
						}
					},
					range : [selectedCount.indexOf(count+""), (count+"").length]
				}]
			});
			$.selectedCountLbl.attributedString = attr;
}

$.shortlistSelectedLbl.removeEventListener('click', addToShortlist);
$.shortlistSelectedLbl.addEventListener('click', addToShortlist);

function addToShortlist(e) {

	if (selectedFabrics.length <= 0) {
		showAlert($.collectionFabricController, "Please select the products you wish to shortlist");
	} else {
	    showAlert($.collectionFabricController, "Processing...",true);
		$.shortlistSelectedLbl.touchEnabled = false;
		$.fabricCloseLbl.touchEnabled = false;
		//showLoader($.collectionFabricController);
		var url = Alloy.Globals.commonUrl.addToShortlist;
		//Ti.API.info('JSON.stringify(selectedFabrics) = ' + selectedFabrics);
		var data = {};

		data["product_id"] = selectedFabrics.join(",");

		var requestParams = JSON.stringify(data);

		Alloy.Globals.webServiceCall(url, requestParams, addToShortlistSuccessCallback, addToShortlistErrorCallback, "POST", $.collectionFabricController);
	}
}

function addToShortlistSuccessCallback(e) {
	try {
	    Alloy.Globals.shortlistCount = e.count;
	    
	    if(!isNullVal(args.mainWindow)){
	        Ti.API.info('into focus function ****************');
	        args.mainWindow.fireEvent("focus");
	    }
	   
	    
	    
		$.shortlistSelectedLbl.touchEnabled = true;
		
		showAlert($.collectionFabricController, e.message);
		setTimeout(function() {
			$.collectionFabricController.type = "";
			$.fabricCloseLbl.touchEnabled = true;
			hideShowView($.collectionFabricController);
			
		}, 500);
		
		_.each(gaSelectedFabrics,function(value,k){
		    //Ti.API.info('ga *********' + value);
		    googleAnalyticsQdsShortlist(value,args.type+" page");
		});
		
		//googleAnalyticsShortlist();
		
		

	} catch(ex) {
		$.shortlistSelectedLbl.touchEnabled = true;
		Ti.API.info('catch = ' + (ex.message));
	}
	
	$.collectionFabricController.remove(Alloy.Globals.toast);
}

function addToShortlistErrorCallback(e) {
	$.shortlistSelectedLbl.touchEnabled = true;
	
	//hideLoader($.collectionFabricController);
	showAlert($.collectionFabricController, e.message);
	setTimeout(function() {
			$.collectionFabricController.type = "";
			$.fabricCloseLbl.touchEnabled = true;
			hideShowView($.collectionFabricController);
	}, 500);
}
