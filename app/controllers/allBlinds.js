var args = arguments[0] || {};


var upholsteryPage = 1;
var beddingPage = 1;
var curtainPage = 1;

var beddingTotalCount,
    upholsteryTotalCount,
    curtainTotalCount,
    beddingLoaddedCount,
    upholsteryLoaddedCount,
    curtainLoaddedCount,
    imageContainer,
    logoText;
var blinds1TotalCount,
    blinds2TotalCount,
    blinds3TotalCount,
    blinds4TotalCount,
    blinds5TotalCount,
    blinds6TotalCount,
    blinds7TotalCount,
    blinds8TotalCount;
var blinds1LoaddedCount,
    blinds2LoaddedCount,
    blinds3LoaddedCount,
    blinds4LoaddedCount,
    blinds5LoaddedCount,
    blinds6LoaddedCount,
    blinds7LoaddedCount,
    blinds8LoaddedCount;
var blinds1Page = 1,
    blinds2Page = 1,
    blinds3Page = 1,
    blinds4Page = 1,
    blinds5Page = 1,
    blinds6Page = 1,
    blinds7Page = 1,
    blinds8Page = 1;
var addShortlist = "";

var gridProductname1,
    collectionId1,
    collectionImage1,
    gridWhereToBuy1,
    gridCart1,
    gridShare1,
    gridWish1,
    gridProductname2,
    collectionId2,
    collectionImage2,
    gridWhereToBuy2,
    gridCart2,
    gridShare2,
    gridWish2;

var isSelected_0,
    isSelected_1,
    wishIconColor_0,
    wishIconColor_1,
    cartIconColor_1,
    cartIconColor_0,
    productFontSize1,
    productFontSize2,
    productSize1,
    productSize2;

var shareUrl1,
    shareUrl2;

$.header.init({
	title : "ALL BLINDS",
	passWindow : $.allBlinds,
});

googleAnalyticsScreen("ALL BLIND");

/*
 * set listview height
 */

touchEffect.createTouchEffect($.blinds2LoadMore, "#a6333333", "#333333");
touchEffect.createTouchEffect($.blinds2ViewAllLbl, "#a6e65e48", "#e65e48");
touchEffect.createTouchEffect($.blinds2rightArrow, "#a6e65e48", "#e65e48");

touchEffect.createTouchEffect($.blinds1LoadMore, "#a6333333", "#333333");
touchEffect.createTouchEffect($.blinds1ViewAllLbl, "#a6e65e48", "#e65e48");
touchEffect.createTouchEffect($.blinds1rightArrow, "#a6e65e48", "#e65e48");

touchEffect.createTouchEffect($.blinds3LoadMore, "#a6333333", "#333333");
touchEffect.createTouchEffect($.blinds3ViewAllLbl, "#a6e65e48", "#e65e48");
touchEffect.createTouchEffect($.blinds3rightArrow, "#a6e65e48", "#e65e48");

touchEffect.createTouchEffect($.blinds4LoadMore, "#a6333333", "#333333");
touchEffect.createTouchEffect($.blinds4ViewAllLbl, "#a6e65e48", "#e65e48");
touchEffect.createTouchEffect($.blinds4rightArrow, "#a6e65e48", "#e65e48");

touchEffect.createTouchEffect($.blinds5LoadMore, "#a6333333", "#333333");
touchEffect.createTouchEffect($.blinds5ViewAllLbl, "#a6e65e48", "#e65e48");
touchEffect.createTouchEffect($.blinds5rightArrow, "#a6e65e48", "#e65e48");

touchEffect.createTouchEffect($.blinds6LoadMore, "#a6333333", "#333333");
touchEffect.createTouchEffect($.blinds6ViewAllLbl, "#a6e65e48", "#e65e48");
touchEffect.createTouchEffect($.blinds6rightArrow, "#a6e65e48", "#e65e48");

touchEffect.createTouchEffect($.blinds7LoadMore, "#a6333333", "#333333");
touchEffect.createTouchEffect($.blinds7ViewAllLbl, "#a6e65e48", "#e65e48");
touchEffect.createTouchEffect($.blinds7rightArrow, "#a6e65e48", "#e65e48");

touchEffect.createTouchEffect($.blinds8LoadMore, "#a6333333", "#333333");
touchEffect.createTouchEffect($.blinds8ViewAllLbl, "#a6e65e48", "#e65e48");
touchEffect.createTouchEffect($.blinds8rightArrow, "#a6e65e48", "#e65e48");

$.collectionScroll.addEventListener('click', hideOverFlowMenu);

function hideOverFlowMenu(e) {
	if (Alloy.Globals.overFlowFlag) {
		$.header.hideOverFlow();
	};
}

var curtainsSection;

/*
 * Fetch All collections
 */

function getAllCollection() {
	showLoader($.allBlinds);
	var url = Alloy.Globals.commonUrl.allblinds;

	var data = {};

	var requestParams = JSON.stringify(data);

	Alloy.Globals.webServiceCall(url, requestParams, allCollectionSuccessCallback, allCollectionErrorCallback, "POST", $.allBlinds);
}

preprocessForListView = function(rawData, categoryName) {
var product_sku1="",product_sku2="";

	return _.map(rawData, function(item) {

		if (item[0]) {
			if (item[0].wishlistItem == true) {
				isSelected_0 = Alloy.Globals.icon.setShortlist;
				wishIconColor_0 = "#e65e48";
			} else {
				isSelected_0 = Alloy.Globals.icon.shortlist;
				wishIconColor_0 = "#a6a6a6";
			}
			if (item[1]) {
				if (item[1].wishlistItem == true) {
					isSelected_1 = Alloy.Globals.icon.setShortlist;
					wishIconColor_1 = "#e65e48";

				} else {
					isSelected_1 = Alloy.Globals.icon.shortlist;
					wishIconColor_1 = "#a6a6a6";
				}
			} else {
				isSelected_1 = "";
			}
		}

		if (item[0]) {
		    product_sku1= item[0].product_sku;
			gridProductname1 = item[0].product_name;
			collectionId1 = item[0].product_id;
			collectionImage1 = encodeURI(item[0].image);
			//collectionImage1 = "/images/product1.jpg";
			gridWhereToBuy1 = Alloy.Globals.icon.currency + item[0].product_price;
			//gridCart1 = Alloy.Globals.icon.bag;
			gridShare1 = Alloy.Globals.icon.share;
			gridWish1 = isSelected_0;
			gridCart1 = "";
			shareUrl1 = item[0].product_url;
			//gridShare1 = "";
			//gridWish1 = "";
		} else {
		    product_sku1= "";
			gridProductname1 = "";
			collectionId1 = "";
			collectionImage1 = "";
			gridWhereToBuy1 = "";
			gridCart1 = "";
			gridShare1 = "";
			gridWish1 = "";
			shareUrl1 = "";
		}
		if (item[1]) {
		    product_sku2= item[1].product_sku;
			gridProductname2 = item[1].product_name;
			collectionId2 = item[1].product_id;
			collectionImage2 = encodeURI(item[1].image);
			//collectionImage2 = "/images/product2.jpg";
			gridWhereToBuy2 = Alloy.Globals.icon.currency + item[1].product_price;
			//gridCart2 = Alloy.Globals.icon.bag;
			gridShare2 = Alloy.Globals.icon.share;
			gridWish2 = isSelected_1;
			gridCart2 = "";
			imageContainer = "#eeece7";
			shareUrl2 = item[1].product_url;
			logoText = "\ue955";
			//\ue92a
			// gridShare2 = "";
			// gridWish2 = "";
		} else {
		    product_sku2= "";
			gridProductname2 = "";
			collectionId2 = "";
			collectionImage2 = "";
			gridWhereToBuy2 = "";
			gridCart2 = "";
			gridShare2 = "";
			gridWish2 = "";
			imageContainer = "#ffffff";
			//f4f4f4
			logoText = "";
			shareUrl2 = "";
			//\ue92a
		}
		
		
		
		return {
			properties : {

				//collectionId: collectionId1
			},
			template : 'gridTemplate',
			gridProductname1 : {
				text : gridProductname1.toUpperCase(),
				collectionId : collectionId1,
				category:categoryName
			},
			gridProductname2 : {
				text : gridProductname2.toUpperCase(),
				collectionId : collectionId2,
				category:categoryName
			},
			gridCart1 : {
				text : gridCart1,
				collectionId : collectionId1,
				category:categoryName,
				visible : (gridCart1 == "" ? false : true)
			},
			gridCart2 : {
				text : gridCart2,
				collectionId : collectionId2,
				category:categoryName,
				visible : (gridCart1 == "" ? false : true)
			},
			gridShare1 : {
				collectionId : collectionId1,
				text : gridShare1,
				shareUrl : shareUrl1,
				category:categoryName
			},
			gridShare2 : {
				collectionId : collectionId2,
				text : gridShare2,
				shareUrl : shareUrl2,
				category:categoryName
			},
			gridWish1 : {
				collectionId : collectionId1,
				iconValue : "\ue60b",
				text : gridWish1,
				color : wishIconColor_0,
				collectionName : gridProductname1,
				category:categoryName,
				product_sku:product_sku1
			},
			gridWish2 : {
				//value : collectionId2,
				collectionId : collectionId2,
				iconValue : "\ue60b",
				text : gridWish2,
				color : wishIconColor_1,
				collectionName : gridProductname2,
				category:categoryName,
				product_sku:product_sku2
			},
			gridProductImage1 : {
				image : collectionImage1,
				collectionId : collectionId1,
				category:categoryName
				//image : "/images/product1.jpg"
			},
			gridProductImage2 : {
				image : collectionImage2,
				collectionId : collectionId2,
				category:categoryName
				//image : "/images/product2.jpg"
			},
			gridWhereToBuy1 : {
				text : gridWhereToBuy1,
				collectionId : collectionId1,
				category:categoryName
			},
			gridWhereToBuy2 : {
				text : gridWhereToBuy2,
				collectionId : collectionId2,
				category:categoryName
			},
			productSize1 : {
				collectionId : collectionId1,
				text : "",
				height : "0",
				category:categoryName

			},
			productSize2 : {
				collectionId : collectionId2,
				text : "",
				height : "0",
				category:categoryName
			},
			imageContainer : {
				backgroundColor : imageContainer,
				category:categoryName
			},
			gridLogo : {
				text : logoText,
				category:categoryName
			}
		};

	});
};

function emptyData() {

	return [{
		properties : {

		},
		template : 'emptyTemplate',
		message : {
			text : "THERE ARE NO PRODUCTS IN THIS CATEGORY."
		}
	}];
}

var blinds = [],
    blinds1TotalCount = [],
    blinds1LoaddedCount = [];
function allCollectionSuccessCallback(e) {
	//Ti.API.info('data in controller = ' +JSON.stringify(e));

	try {

		var blinds1 = e.data.product_data[0].product_data;
		var blinds2 = e.data.product_data[1].product_data;
		var blinds3 = e.data.product_data[2].product_data;
		var blinds4 = e.data.product_data[3].product_data;
		var blinds5 = e.data.product_data[4].product_data;
		var blinds6 = e.data.product_data[5].product_data;
		var blinds7 = e.data.product_data[6].product_data;
		var blinds8 = e.data.product_data[7].product_data;

		$.blinds1NameLbl.text = e.data.product_data[0].categoryName.toUpperCase();
		$.blinds2NameLbl.text = e.data.product_data[1].categoryName.toUpperCase();
		$.blinds3NameLbl.text = e.data.product_data[2].categoryName.toUpperCase();
		$.blinds4NameLbl.text = e.data.product_data[3].categoryName.toUpperCase();
		$.blinds5NameLbl.text = e.data.product_data[4].categoryName.toUpperCase();
		$.blinds6NameLbl.text = e.data.product_data[5].categoryName.toUpperCase();
		$.blinds7NameLbl.text = e.data.product_data[6].categoryName.toUpperCase();
		$.blinds8NameLbl.text = e.data.product_data[7].categoryName.toUpperCase();

		if (blinds1.length > 0) {
			//$.blinds1ListView.height = (Alloy.Globals.imageWidth + 133);
			$.blinds1ListView.height = (((Alloy.Globals.imageWidth + 63) * 3) + 56);
			blinds1TotalCount = e.data.product_data[0].total_count;
			blinds1LoaddedCount = blinds1.length;
			$.blinds1LoadMoreLbl.categoryName = e.data.product_data[0].categoryName;
			$.blinds1LoadMoreLbl.categoryId = e.data.product_data[0].categoryId;
			$.blinds1ViewAllLbl.categoryName = e.data.product_data[0].categoryName;
			$.blinds1ViewAllLbl.categoryId = e.data.product_data[0].categoryId;
			$.blinds1rightArrow.categoryName = e.data.product_data[0].categoryName;
		}

		if (blinds1TotalCount <= 6) {
			$.blinds1LoadMoreLbl.color = "#e65e48";
			$.blinds1LoadMoreLbl.text = "VIEW ALL";
		}
		if (blinds2.length > 0) {
			$.blinds2ListView.height = (((Alloy.Globals.imageWidth + 63) * 3) + 56);
			blinds2TotalCount = e.data.product_data[1].total_count;
			blinds2LoaddedCount = blinds2.length;
			$.blinds2LoadMoreLbl.categoryName = e.data.product_data[1].categoryName;
			$.blinds2LoadMoreLbl.categoryId = e.data.product_data[1].categoryId;
			$.blinds2ViewAllLbl.categoryName = e.data.product_data[1].categoryName;
			$.blinds2ViewAllLbl.categoryId = e.data.product_data[1].categoryId;
			$.blinds2rightArrow.categoryName = e.data.product_data[1].categoryName;
		}

		if (blinds2TotalCount <= 6) {
			$.blinds2LoadMoreLbl.color = "#e65e48";
			$.blinds2LoadMoreLbl.text = "VIEW ALL";
		}

		if (blinds3.length > 0) {
			$.blinds3ListView.height = (((Alloy.Globals.imageWidth + 63) * 3) + 56);
			blinds3TotalCount = e.data.product_data[2].total_count;
			blinds3LoaddedCount = blinds3.length;
			$.blinds3LoadMoreLbl.categoryName = e.data.product_data[2].categoryName;
			$.blinds3LoadMoreLbl.categoryId = e.data.product_data[2].categoryId;
			$.blinds3ViewAllLbl.categoryName = e.data.product_data[2].categoryName;
			$.blinds3ViewAllLbl.categoryId = e.data.product_data[2].categoryId;
			$.blinds3rightArrow.categoryName = e.data.product_data[2].categoryName;
		}

		if (blinds3TotalCount <= 6) {
			$.blinds3LoadMoreLbl.color = "#e65e48";
			$.blinds3LoadMoreLbl.text = "VIEW ALL";
		}

		if (blinds4.length > 0) {
			$.blinds4ListView.height = (((Alloy.Globals.imageWidth + 63) * 3) + 56);
			blinds4TotalCount = e.data.product_data[3].total_count;
			blinds4LoaddedCount = blinds4.length;
			$.blinds4LoadMoreLbl.categoryName = e.data.product_data[3].categoryName;
			$.blinds4LoadMoreLbl.categoryId = e.data.product_data[3].categoryId;
			$.blinds4ViewAllLbl.categoryName = e.data.product_data[3].categoryName;
			$.blinds4ViewAllLbl.categoryId = e.data.product_data[3].categoryId;
			$.blinds4rightArrow.categoryName = e.data.product_data[3].categoryName;
		}

		if (blinds4TotalCount <= 6) {
			$.blinds4LoadMoreLbl.color = "#e65e48";
			$.blinds4LoadMoreLbl.text = "VIEW ALL";
		}

		if (blinds5.length > 0) {
			$.blinds5ListView.height = (((Alloy.Globals.imageWidth + 63) * 3) + 56);
			blinds5TotalCount = e.data.product_data[4].total_count;
			blinds5LoaddedCount = blinds5.length;
			$.blinds5LoadMoreLbl.categoryName = e.data.product_data[4].categoryName;
			$.blinds5LoadMoreLbl.categoryId = e.data.product_data[4].categoryId;
			$.blinds5ViewAllLbl.categoryName = e.data.product_data[4].categoryName;
			$.blinds5ViewAllLbl.categoryId = e.data.product_data[4].categoryId;
			$.blinds5rightArrow.categoryName = e.data.product_data[4].categoryName;
		}

		if (blinds5TotalCount <= 6) {
			$.blinds5LoadMoreLbl.color = "#e65e48";
			$.blinds5LoadMoreLbl.text = "VIEW ALL";
		}

		if (blinds6.length > 0) {
			$.blinds6ListView.height = (((Alloy.Globals.imageWidth + 63) * 3) + 56);
			blinds6TotalCount = e.data.product_data[5].total_count;
			blinds6LoaddedCount = blinds6.length;
			$.blinds6LoadMoreLbl.categoryName = e.data.product_data[5].categoryName;
			$.blinds6LoadMoreLbl.categoryId = e.data.product_data[5].categoryId;
			$.blinds6ViewAllLbl.categoryName = e.data.product_data[5].categoryName;
			$.blinds6ViewAllLbl.categoryId = e.data.product_data[5].categoryId;
			$.blinds6rightArrow.categoryName = e.data.product_data[5].categoryName;
		}

		if (blinds6TotalCount <= 6) {
			$.blinds6LoadMoreLbl.color = "#e65e48";
			$.blinds6LoadMoreLbl.text = "VIEW ALL";
		}

		if (blinds7.length > 0) {
			$.blinds7ListView.height = (((Alloy.Globals.imageWidth + 63) * 3) + 56);
			blinds7TotalCount = e.data.product_data[6].total_count;
			blinds7LoaddedCount = blinds7.length;
			$.blinds7LoadMoreLbl.categoryName = e.data.product_data[6].categoryName;
			$.blinds7LoadMoreLbl.categoryId = e.data.product_data[6].categoryId;
			$.blinds7ViewAllLbl.categoryName = e.data.product_data[6].categoryName;
			$.blinds7ViewAllLbl.categoryId = e.data.product_data[6].categoryId;
			$.blinds7rightArrow.categoryName = e.data.product_data[6].categoryName;
		}

		if (blinds7TotalCount <= 6) {
			$.blinds7LoadMoreLbl.color = "#e65e48";
			$.blinds7LoadMoreLbl.text = "VIEW ALL";
		}

		if (blinds8.length > 0) {
			$.blinds8ListView.height = (((Alloy.Globals.imageWidth + 63) * 3) + 56);
			blinds8TotalCount = e.data.product_data[7].total_count;
			blinds8LoaddedCount = blinds8.length;
			$.blinds8LoadMoreLbl.categoryName = e.data.product_data[7].categoryName;
			$.blinds8LoadMoreLbl.categoryId = e.data.product_data[7].categoryId;
			$.blinds8ViewAllLbl.categoryName = e.data.product_data[7].categoryName;
			$.blinds8ViewAllLbl.categoryId = e.data.product_data[7].categoryId;
			$.blinds8rightArrow.categoryName = e.data.product_data[7].categoryName;
		}

		if (blinds8TotalCount <= 6) {
			$.blinds8LoadMoreLbl.color = "#e65e48";
			$.blinds8LoadMoreLbl.text = "VIEW ALL";
		}

		var size = 2;
		//var beddingDataArr = [];
		var blinds1DataArr = [];
		var blinds2DataArr = [];
		var blinds3DataArr = [];
		var blinds4DataArr = [];
		var blinds5DataArr = [];
		var blinds6DataArr = [];
		var blinds7DataArr = [];
		var blinds8DataArr = [];

		var myDataArrCounter = 0;

		for (var i = 0; i < 6; i += size) {

			if (blinds1.length > 0) {
				var smallblinds1Array = blinds1.slice(i, i + size);
				blinds1DataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallblinds1Array) + "");
			}
			if (blinds2.length > 0) {
				var smallblinds2Array = blinds2.slice(i, i + size);
				blinds2DataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallblinds2Array) + "");
			}
			if (blinds3.length > 0) {
				var smallblinds3Array = blinds3.slice(i, i + size);
				blinds3DataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallblinds3Array) + "");
			}
			if (blinds4.length > 0) {
				var smallblinds4Array = blinds4.slice(i, i + size);
				blinds4DataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallblinds4Array) + "");
			}
			if (blinds5.length > 0) {
				var smallblinds5Array = blinds5.slice(i, i + size);
				blinds5DataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallblinds5Array) + "");
			}
			if (blinds6.length > 0) {
				var smallblinds6Array = blinds6.slice(i, i + size);
				blinds6DataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallblinds6Array) + "");
			}
			if (blinds7.length > 0) {
				var smallblinds7Array = blinds7.slice(i, i + size);
				blinds7DataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallblinds7Array) + "");
			}
			if (blinds8.length > 0) {
				var smallblinds8Array = blinds8.slice(i, i + size);
				blinds8DataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallblinds8Array) + "");
			}

			myDataArrCounter++;
		}

		var blinds1ToAdd = "",
		    blinds2ToAdd = "",
		    blinds3ToAdd = "",
		    blinds4ToAdd = "",
		    blinds5ToAdd = "",
		    blinds6ToAdd = "",
		    blinds7ToAdd = "",
		    blinds8ToAdd = "";

		if (blinds1.length > 0) {
			blinds1ToAdd = preprocessForListView(JSON.parse("{" + blinds1DataArr + "}"), "Roman");
			$.blinds1ListView.sections[0].appendItems(blinds1ToAdd);
			blinds1Page++;
		} else if (blinds1.length == 6) {
			$.blinds1ViewAllContainer.visible = false;
			$.blinds1LoadMore.top = "0dp";
			$.blinds1LoadMore.height = "0dp";
		} else {
			blinds1ToAdd = emptyData();
			$.blinds1ListView.sections[0].appendItems(blinds1ToAdd);
			$.blinds1ViewAllContainer.visible = false;
			$.blinds1LoadMore.top = "0dp";
			$.blinds1LoadMore.height = "0dp";

		}

		if (blinds2.length > 0) {
			blinds2ToAdd = preprocessForListView(JSON.parse("{" + blinds2DataArr + "}"), "Duplex");
			$.blinds2ListView.sections[0].appendItems(blinds2ToAdd);
			blinds2Page++;
		} else if (blinds2.length == 6) {
			$.blinds2ViewAllContainer.visible = false;
			$.blinds2LoadMore.top = "0dp";
			$.blinds2LoadMore.height = "0dp";
		} else {
			blinds2ToAdd = emptyData();
			$.blinds2ListView.sections[0].appendItems(blinds1ToAdd);
			$.blinds2ViewAllContainer.visible = false;
			$.blinds2LoadMore.top = "0dp";
			$.blinds2LoadMore.height = "0dp";

		}

		if (blinds3.length > 0) {
			blinds3ToAdd = preprocessForListView(JSON.parse("{" + blinds3DataArr + "}"), "Romex");
			$.blinds3ListView.sections[0].appendItems(blinds3ToAdd);
			blinds3Page++;
		} else if (blinds3.length == 6) {
			$.blinds3ViewAllContainer.visible = false;
			$.blinds3LoadMore.top = "0dp";
			$.blinds3LoadMore.height = "0dp";
		} else {
			blinds3ToAdd = emptyData();
			$.blinds3ListView.sections[0].appendItems(blinds3ToAdd);
			$.blinds3ViewAllContainer.visible = false;
			$.blinds3LoadMore.top = "0dp";
			$.blinds3LoadMore.height = "0dp";

		}

		if (blinds4.length > 0) {
			blinds4ToAdd = preprocessForListView(JSON.parse("{" + blinds4DataArr + "}"), "Vertical");
			$.blinds4ListView.sections[0].appendItems(blinds4ToAdd);
			blinds4Page++;
		} else if (blinds4.length == 6) {
			$.blinds4ViewAllContainer.visible = false;
			$.blinds4LoadMore.top = "0dp";
			$.blinds4LoadMore.height = "0dp";
		} else {
			blinds4ToAdd = emptyData();
			$.blinds4ListView.sections[0].appendItems(blinds4ToAdd);
			$.blinds4ViewAllContainer.visible = false;
			$.blinds4LoadMore.top = "0dp";
			$.blinds4LoadMore.height = "0dp";

		}

		if (blinds5.length > 0) {
			blinds5ToAdd = preprocessForListView(JSON.parse("{" + blinds5DataArr + "}"), "Roller");
			$.blinds5ListView.sections[0].appendItems(blinds5ToAdd);
			blinds5Page++;
		} else if (blinds5.length == 6) {
			$.blinds5ViewAllContainer.visible = false;
			$.blinds5LoadMore.top = "0dp";
			$.blinds5LoadMore.height = "0dp";
		} else {
			blinds5ToAdd = emptyData();
			$.blinds5ListView.sections[0].appendItems(blinds5ToAdd);
			$.blinds5ViewAllContainer.visible = false;
			$.blinds5LoadMore.top = "0dp";
			$.blinds5LoadMore.height = "0dp";

		}

		if (blinds6.length > 0) {
			blinds6ToAdd = preprocessForListView(JSON.parse("{" + blinds6DataArr + "}"), "Sheer Horizon");
			$.blinds6ListView.sections[0].appendItems(blinds6ToAdd);
			blinds6Page++;
		} else if (blinds6.length == 6) {
			$.blinds6ViewAllContainer.visible = false;
			$.blinds6LoadMore.top = "0dp";
			$.blinds6LoadMore.height = "0dp";
		} else {
			blinds6ToAdd = emptyData();
			$.blinds6ListView.sections[0].appendItems(blinds6ToAdd);
			$.blinds6ViewAllContainer.visible = false;
			$.blinds6LoadMore.top = "0dp";
			$.blinds6LoadMore.height = "0dp";

		}

		if (blinds7.length > 0) {
			blinds7ToAdd = preprocessForListView(JSON.parse("{" + blinds7DataArr + "}"), "Panel");
			$.blinds7ListView.sections[0].appendItems(blinds7ToAdd);
			blinds7Page++;
		} else if (blinds7.length == 6) {
			$.blinds7ViewAllContainer.visible = false;
			$.blinds7LoadMore.top = "0dp";
			$.blinds7LoadMore.height = "0dp";
		} else {
			blinds7ToAdd = emptyData();
			$.blinds7ListView.sections[0].appendItems(blinds7ToAdd);
			$.blinds7ViewAllContainer.visible = false;
			$.blinds7LoadMore.top = "0dp";
			$.blinds7LoadMore.height = "0dp";

		}

		if (blinds8.length > 0) {
			blinds8ToAdd = preprocessForListView(JSON.parse("{" + blinds8DataArr + "}"), "Cladded");
			$.blinds8ListView.sections[0].appendItems(blinds8ToAdd);
			blinds8Page++;
		} else if (blinds8.length == 6) {
			$.blinds8ViewAllContainer.visible = false;
			$.blinds8LoadMore.top = "0dp";
			$.blinds8LoadMore.height = "0dp";
		} else {
			blinds8ToAdd = emptyData();
			$.blinds8ListView.sections[0].appendItems(blinds8ToAdd);
			$.blinds8ViewAllContainer.visible = false;
			$.blinds8LoadMore.top = "0dp";
			$.blinds8LoadMore.height = "0dp";

		}

		hideLoader($.allBlinds);
	} catch(ex) {
		hideLoader($.allBlinds);
		Ti.API.info('catch ex = ' + ex.message);
	}
}

function allCollectionErrorCallback(e) {
	hideLoader($.allBlinds);
	//Ti.API.info('collection error e = ' + JSON.stringify(e));
	showAlert($.allBlinds, e.message);
}

getAllCollection();

$.blinds1LoadMore.addEventListener('click', blinds1DataFn);

function blinds1DataFn(e) {
	if (blinds1LoaddedCount != blinds1TotalCount && e.source.categoryName && blinds1LoaddedCount != "18") {
		$.blinds1LoadMoreLbl.text = "";
		$.blinds1ActivityIndicator.show();
		$.blinds1LoadMore.touchEnabled = false;
		$.blinds1LoadMoreLbl.touchEnabled = false;

		loadMoreData(e.source.categoryName, e.source.categoryId, blinds1Page, 6);
		
	} else if ($.blinds1LoadMoreLbl.text == "VIEW ALL") {

		$.blinds1LoadMoreLbl.color = "#e65e48";
		loadMoreToViewAll(e.source.categoryName, e.source.categoryId);
	} else {
		$.blinds1LoadMoreLbl.color = "#e65e48";
		$.blinds1LoadMoreLbl.text = "VIEW ALL";
	}
}

$.blinds2LoadMore.addEventListener('click', blinds2DataFn);

function blinds2DataFn(e) {
	if (blinds2LoaddedCount != blinds2TotalCount && e.source.categoryName && blinds2LoaddedCount != "18") {
		$.blinds2LoadMoreLbl.text = "";
		$.blinds2ActivityIndicator.show();
		$.blinds2LoadMore.touchEnabled = false;
		loadMoreData(e.source.categoryName, e.source.categoryId, blinds2Page, 6);
	} else if ($.blinds2LoadMoreLbl.text == "VIEW ALL") {
		$.blinds2LoadMoreLbl.color = "#e65e48";
		loadMoreToViewAll(e.source.categoryName, e.source.categoryId);
	} else {
		$.blinds2LoadMoreLbl.color = "#e65e48";
		$.blinds2LoadMoreLbl.text = "VIEW ALL";
	}
}

$.blinds3LoadMore.addEventListener('click', blinds3DataFn);

function blinds3DataFn(e) {
	if (blinds3LoaddedCount != blinds3TotalCount && e.source.categoryName && blinds3LoaddedCount != "18") {
		$.blinds3LoadMoreLbl.text = "";
		$.blinds3ActivityIndicator.show();
		$.blinds3LoadMore.touchEnabled = false;
		loadMoreData(e.source.categoryName, e.source.categoryId, blinds3Page, 6);
	} else if ($.blinds3LoadMoreLbl.text == "VIEW ALL") {
		$.blinds3LoadMoreLbl.color = "#e65e48";
		loadMoreToViewAll(e.source.categoryName, e.source.categoryId);
	} else {
		$.blinds3LoadMoreLbl.color = "#e65e48";
		$.blinds3LoadMoreLbl.text = "VIEW ALL";
	}
}

$.blinds4LoadMore.addEventListener('click', blinds4DataFn);

function blinds4DataFn(e) {
	if (blinds4LoaddedCount != blinds4TotalCount && e.source.categoryName && blinds4LoaddedCount != "18") {
		$.blinds4LoadMoreLbl.text = "";
		$.blinds4ActivityIndicator.show();
		$.blinds4LoadMore.touchEnabled = false;
		loadMoreData(e.source.categoryName, e.source.categoryId, blinds4Page, 6);
	} else if ($.blinds4LoadMoreLbl.text == "VIEW ALL") {
		$.blinds4LoadMoreLbl.color = "#e65e48";
		loadMoreToViewAll(e.source.categoryName, e.source.categoryId);
	} else {
		$.blinds4LoadMoreLbl.color = "#e65e48";
		$.blinds4LoadMoreLbl.text = "VIEW ALL";
	}
}

$.blinds5LoadMore.addEventListener('click', blinds5DataFn);

function blinds5DataFn(e) {
	if (blinds5LoaddedCount != blinds5TotalCount && e.source.categoryName && blinds5LoaddedCount != "18") {
		$.blinds5LoadMoreLbl.text = "";
		$.blinds5ActivityIndicator.show();
		$.blinds5LoadMore.touchEnabled = false;
		loadMoreData(e.source.categoryName, e.source.categoryId, blinds5Page, 6);
	} else if ($.blinds5LoadMoreLbl.text == "VIEW ALL") {
		$.blinds5LoadMoreLbl.color = "#e65e48";
		loadMoreToViewAll(e.source.categoryName, e.source.categoryId);
	} else {
		$.blinds5LoadMoreLbl.color = "#e65e48";
		$.blinds5LoadMoreLbl.text = "VIEW ALL";
	}
}

$.blinds6LoadMore.addEventListener('click', blinds6DataFn);

function blinds6DataFn(e) {
	if (blinds6LoaddedCount != blinds6TotalCount && e.source.categoryName && blinds6LoaddedCount != "18") {
		$.blinds6LoadMoreLbl.text = "";
		$.blinds6ActivityIndicator.show();
		$.blinds6LoadMore.touchEnabled = false;
		loadMoreData(e.source.categoryName, e.source.categoryId, blinds6Page, 6);
	} else if ($.blinds6LoadMoreLbl.text == "VIEW ALL") {
		$.blinds6LoadMoreLbl.color = "#e65e48";
		loadMoreToViewAll(e.source.categoryName, e.source.categoryId);
	} else {
		$.blinds6LoadMoreLbl.color = "#e65e48";
		$.blinds6LoadMoreLbl.text = "VIEW ALL";
	}
}

$.blinds7LoadMore.addEventListener('click', blinds7DataFn);

function blinds7DataFn(e) {
	if (blinds7LoaddedCount != blinds7TotalCount && e.source.categoryName && blinds7LoaddedCount != "18") {
		$.blinds7LoadMoreLbl.text = "";
		$.blinds7ActivityIndicator.show();
		$.blinds7LoadMore.touchEnabled = false;
		loadMoreData(e.source.categoryName, e.source.categoryId, blinds7Page, 6);
	} else if ($.blinds7LoadMoreLbl.text == "VIEW ALL") {
		$.blinds7LoadMoreLbl.color = "#e65e48";
		loadMoreToViewAll(e.source.categoryName, e.source.categoryId);
	} else {
		$.blinds7LoadMoreLbl.color = "#e65e48";
		$.blinds7LoadMoreLbl.text = "VIEW ALL";
	}
}


function blinds8DataFn(e) {
	if (blinds8LoaddedCount != blinds8TotalCount && e.source.categoryName && blinds8LoaddedCount != "18") {
		$.blinds8LoadMoreLbl.text = "";
		$.blinds8ActivityIndicator.show();
		$.blinds8LoadMore.touchEnabled = false;
		loadMoreData(e.source.categoryName, e.source.categoryId, blinds8Page, 6);
	} else if ($.blinds8LoadMoreLbl.text == "VIEW ALL") {
		$.blinds8LoadMoreLbl.color = "#e65e48";
		loadMoreToViewAll(e.source.categoryName, e.source.categoryId);
	} else {
		$.blinds8LoadMoreLbl.color = "#e65e48";
		$.blinds8LoadMoreLbl.text = "VIEW ALL";
	}
}

function loadMoreToViewAll(categoryName, categoryId) {
	collectionAllData = "";
	collectionAllData = {
		wName : categoryName,
		categoryId : categoryId,
		type : "C_Product",
		categoryType : "blinds",
		categoryName:categoryName,
	};
	
	
	//Ti.API.info('loadMoreToViewAll--->' + JSON.stringify(collectionAllData));

	Alloy.Globals.addWindowInNav("productListing", collectionAllData);
}

//
function loadMoreData(name, id, pageNo, limit) {
	var url = Alloy.Globals.commonUrl.ourrange;
	var data;

	data = {
		"category" : name,
		"categoryId" : id,
		"sortby" : "latest",
		"pagination" : {}
	};

	data.pagination = {
		"page_no" : pageNo,
		"page_size" : limit
	};

	var requestParams = JSON.stringify(data);

	Alloy.Globals.webServiceCall(url, requestParams, loadMoreSuccessCallback, loadmoreErrorCallback, "POST", $.allBlinds);
}

function loadMoreSuccessCallback(e) {

	try {

		var categoryName = e.data.product_data.categoryName;
		var paginationData = e.data.product_data.product_listing;

		var size = 2;
		var paginationDataArr = [];

		var myDataArrCounter = 0;

		for (var i = 0; i < paginationData.length; i += size) {
			var smallPaginationArray = paginationData.slice(i, i + size);
			paginationDataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallPaginationArray) + "");

			myDataArrCounter++;
		}

		loadMorePaginationData = "{" + paginationDataArr + "}";

		var finalPaginationData = JSON.parse(loadMorePaginationData);
		if (finalPaginationData) {

			switch(categoryName) {

			case "Roman" :
				$.blinds1LoadMoreLbl.text = "LOAD MORE";
				$.blinds1ActivityIndicator.hide();
				$.blinds1LoadMore.touchEnabled = true;
				$.blinds1LoadMoreLbl.touchEnabled = true;
				blinds1LoaddedCount = (blinds1LoaddedCount + paginationData.length);

				if (paginationData.length < 6) {
					$.blinds1LoadMoreLbl.color = "#e65e48";
					$.blinds1LoadMoreLbl.text = "VIEW ALL";
				} else if (blinds1LoaddedCount == 18) {
					$.blinds1LoadMoreLbl.color = "#e65e48";
					$.blinds1LoadMoreLbl.text = "VIEW ALL";
				}

				var ListViewHeight = parseInt($.blinds1ListView.getHeight());
				//var a = (216*(BEDDING.length/2));
				var a = ((Alloy.Globals.imageWidth * 3) + 175);
				//216//432

				$.blinds1ListView.height = (ListViewHeight + a);
				var dataToAdd = preprocessForListView(finalPaginationData ,"Roman");
				$.blinds1ListView.sections[0].appendItems(dataToAdd);
				blinds1Page++;
				break;

			case "Duplex" :
				$.blinds2LoadMoreLbl.text = "LOAD MORE";
				$.blinds2ActivityIndicator.hide();
				$.blinds2LoadMore.touchEnabled = true;
				blinds2LoaddedCount = (blinds2LoaddedCount + paginationData.length);

				if (paginationData.length < 6) {
					$.blinds2LoadMoreLbl.color = "#e65e48";
					$.blinds2LoadMoreLbl.text = "VIEW ALL";
				} else if (blinds2LoaddedCount == 18) {
					$.blinds2LoadMoreLbl.color = "#e65e48";
					$.blinds2LoadMoreLbl.text = "VIEW ALL";
				}

				var ListViewHeight = parseInt($.blinds2ListView.getHeight());
				var a = ((Alloy.Globals.imageWidth * 3) + 175);
				$.blinds2ListView.height = (ListViewHeight + a);
				var dataToAdd = preprocessForListView(finalPaginationData, "Duplex");
				$.blinds2ListView.sections[0].appendItems(dataToAdd);
				blinds2Page++;
				break;

			case "Romex" :
				$.blinds3LoadMoreLbl.text = "LOAD MORE";
				$.blinds3ActivityIndicator.hide();
				$.blinds3LoadMore.touchEnabled = true;
				blinds3LoaddedCount = (blinds3LoaddedCount + paginationData.length);

				if (paginationData.length < 6) {
					$.blinds3LoadMoreLbl.color = "#e65e48";
					$.blinds3LoadMoreLbl.text = "VIEW ALL";
				} else if (blinds3LoaddedCount == 18) {
					$.blinds3LoadMoreLbl.color = "#e65e48";
					$.blinds3LoadMoreLbl.text = "VIEW ALL";
				}

				var ListViewHeight = parseInt($.blinds3ListView.getHeight());
				var a = ((Alloy.Globals.imageWidth * 3) + 175);
				$.blinds3ListView.height = (ListViewHeight + a);
				var dataToAdd = preprocessForListView(finalPaginationData, "Romex");
				$.blinds3ListView.sections[0].appendItems(dataToAdd);
				blinds3Page++;
				break;

			case "Vertical" :
				$.blinds4LoadMoreLbl.text = "LOAD MORE";
				$.blinds4ActivityIndicator.hide();
				$.blinds4LoadMore.touchEnabled = true;
				blinds4LoaddedCount = (blinds4LoaddedCount + paginationData.length);

				if (paginationData.length < 6) {
					$.blinds4LoadMoreLbl.color = "#e65e48";
					$.blinds4LoadMoreLbl.text = "VIEW ALL";
				} else if (blinds4LoaddedCount == 18) {
					$.blinds4LoadMoreLbl.color = "#e65e48";
					$.blinds4LoadMoreLbl.text = "VIEW ALL";
				}

				var ListViewHeight = parseInt($.blinds4ListView.getHeight());
				var a = ((Alloy.Globals.imageWidth * 3) + 175);
				$.blinds4ListView.height = (ListViewHeight + a);
				var dataToAdd = preprocessForListView(finalPaginationData,"Vertical");
				$.blinds4ListView.sections[0].appendItems(dataToAdd);
				blinds4Page++;
				break;

			case "Roller" :
				$.blinds5LoadMoreLbl.text = "LOAD MORE";
				$.blinds5ActivityIndicator.hide();
				$.blinds5LoadMore.touchEnabled = true;
				blinds5LoaddedCount = (blinds5LoaddedCount + paginationData.length);

				if (paginationData.length < 6) {
					$.blinds5LoadMoreLbl.color = "#e65e48";
					$.blinds5LoadMoreLbl.text = "VIEW ALL";
				} else if (blinds5LoaddedCount == 18) {
					$.blinds5LoadMoreLbl.color = "#e65e48";
					$.blinds5LoadMoreLbl.text = "VIEW ALL";
				}

				var ListViewHeight = parseInt($.blinds5ListView.getHeight());
				var a = ((Alloy.Globals.imageWidth * 3) + 175);
				$.blinds5ListView.height = (ListViewHeight + a);
				var dataToAdd = preprocessForListView(finalPaginationData,"Roller");
				$.blinds5ListView.sections[0].appendItems(dataToAdd);
				blinds5Page++;
				break;

			case "Sheer Horizon" :
				$.blinds6LoadMoreLbl.text = "LOAD MORE";
				$.blinds6ActivityIndicator.hide();
				$.blinds6LoadMore.touchEnabled = true;
				blinds6LoaddedCount = (blinds6LoaddedCount + paginationData.length);

				if (paginationData.length < 6) {
					$.blinds6LoadMoreLbl.color = "#e65e48";
					$.blinds6LoadMoreLbl.text = "VIEW ALL";
				} else if (blinds6LoaddedCount == 18) {
					$.blinds6LoadMoreLbl.color = "#e65e48";
					$.blinds6LoadMoreLbl.text = "VIEW ALL";
				}

				var ListViewHeight = parseInt($.blinds6ListView.getHeight());
				var a = ((Alloy.Globals.imageWidth * 3) + 175);
				$.blinds6ListView.height = (ListViewHeight + a);
				var dataToAdd = preprocessForListView(finalPaginationData,"Sheer Horizon");
				$.blinds6ListView.sections[0].appendItems(dataToAdd);
				blinds6Page++;
				break;

			case "Panel" :
				$.blinds7LoadMoreLbl.text = "LOAD MORE";
				$.blinds7ActivityIndicator.hide();
				$.blinds7LoadMore.touchEnabled = true;
				blinds7LoaddedCount = (blinds7LoaddedCount + paginationData.length);

				if (paginationData.length < 6) {
					$.blinds7LoadMoreLbl.color = "#e65e48";
					$.blinds7LoadMoreLbl.text = "VIEW ALL";
				} else if (blinds7LoaddedCount == 18) {
					$.blinds7LoadMoreLbl.color = "#e65e48";
					$.blinds7LoadMoreLbl.text = "VIEW ALL";
				}

				var ListViewHeight = parseInt($.blinds7ListView.getHeight());
				var a = ((Alloy.Globals.imageWidth * 3) + 175);
				$.blinds7ListView.height = (ListViewHeight + a);
				var dataToAdd = preprocessForListView(finalPaginationData, "Panel");
				$.blinds7ListView.sections[0].appendItems(dataToAdd);
				blinds7Page++;
				break;

			case "Cladded" :
				$.blinds8LoadMoreLbl.text = "LOAD MORE";
				$.blinds8ActivityIndicator.hide();
				$.blinds8LoadMore.touchEnabled = true;
				blinds8LoaddedCount = (blinds8LoaddedCount + paginationData.length);

				if (paginationData.length < 6) {
					$.blinds8LoadMoreLbl.color = "#e65e48";
					$.blinds8LoadMoreLbl.text = "VIEW ALL";
				} else if (blinds8LoaddedCount == 18) {
					$.blinds8LoadMoreLbl.color = "#e65e48";
					$.blinds8LoadMoreLbl.text = "VIEW ALL";
				}

				var ListViewHeight = parseInt($.blinds8ListView.getHeight());
				var a = ((Alloy.Globals.imageWidth * 3) + 175);
				$.blinds8ListView.height = (ListViewHeight + a);
				var dataToAdd = preprocessForListView(finalPaginationData, "Cladded");
				$.blinds8ListView.sections[0].appendItems(dataToAdd);
				blinds8Page++;
				break;

			}

		}
	} catch(e) {
		Ti.API.info('catch error = ' + e.message);
	}
}

function loadmoreErrorCallback(e) {
	//Ti.API.info('e= ' + JSON.stringify(e));
	showAlert($.allBlinds, e.message);
}

$.blinds1ViewAllContainer.addEventListener('click', categoryViewAll);
$.blinds2ViewAllContainer.addEventListener('click', categoryViewAll);
$.blinds3ViewAllContainer.addEventListener('click', categoryViewAll);
$.blinds4ViewAllContainer.addEventListener('click', categoryViewAll);
$.blinds5ViewAllContainer.addEventListener('click', categoryViewAll);
$.blinds6ViewAllContainer.addEventListener('click', categoryViewAll);
$.blinds7ViewAllContainer.addEventListener('click', categoryViewAll);
$.blinds8ViewAllContainer.addEventListener('click', categoryViewAll);

function categoryViewAll(e) {
	collectionAllData = "";
	//Ti.API.info('e.source.categoryId = ' + e.source.categoryId);
	if (!isNullVal(e.source.categoryName)) {

		collectionAllData = {
			wName : e.source.categoryName,
			categoryId : e.source.categoryId,
			type : "C_Product",
			categoryType : "blinds",
			categoryName: e.source.categoryName,
			
		};
		
	//	Ti.API.info('viewAll *************' + JSON.stringify(collectionAllData));

		Alloy.Globals.addWindowInNav("productListing", collectionAllData);
	}
}

//$.bedLinenListView.addEventListener('itemclick', addToShortlist);

$.blinds1ListView.addEventListener('itemclick', addToShortlist);
$.blinds2ListView.addEventListener('itemclick', addToShortlist);
$.blinds3ListView.addEventListener('itemclick', addToShortlist);
$.blinds4ListView.addEventListener('itemclick', addToShortlist);
$.blinds5ListView.addEventListener('itemclick', addToShortlist);
$.blinds6ListView.addEventListener('itemclick', addToShortlist);
$.blinds7ListView.addEventListener('itemclick', addToShortlist);
$.blinds8ListView.addEventListener('itemclick', addToShortlist);

function addToShortlist(productData) {
	if (!isNullVal(productData.bindId) && productData.bindId != "message") {
		//Ti.API.info('call add to shortlist');
		bind = productData.bindId;
		index = productData.itemIndex;
		itemSection = productData.section.items[index];
		if (!isNullVal(itemSection[bind].collectionId)) {
			if (productData.bindId == "gridWish1" || productData.bindId == "gridWish2") {
				if (!isNullVal(Ti.App.Properties.getString("access_token"))) {
					shortlistData = "";
					if (!isNullVal(productData.bindId)) {

						shortlistData = productData;

						if (itemSection[bind].text == "\ue60b") {

							/*display product as shortlisted before hit api */
							gaShortlistProduct = itemSection[bind].collectionName+"("+itemSection[bind].product_sku+")";
							itemSection[bind].text = "\ue927";
							itemSection[bind].color = "#e65e48";
							productData.section.updateItemAt(index, itemSection);

							var url = Alloy.Globals.commonUrl.addToShortlist;
							var data = {
								product_id : itemSection[bind].collectionId
							};
							var requestParams = JSON.stringify(data);
							Alloy.Globals.webServiceCall(url, requestParams, addToShortlistSuccessCallback, addToShortlistErrorCallback, "POST", $.allBlinds);
						} else {
							/*remove product as shortlisted before hit api */

							itemSection[bind].text = "\ue60b";
							itemSection[bind].color = "#a6a6a6";
							productData.section.updateItemAt(index, itemSection);

							var url = Alloy.Globals.commonUrl.removeShortlist;
							var data = {
								product_id : itemSection[bind].collectionId,
							};
							var requestParams = JSON.stringify(data);
							Alloy.Globals.webServiceCall(url, requestParams, removeShortlistProductSuccessCallback, removeShortlistProductErrorCallback, "POST", $.allBlinds);

						}
					}
				} else {
					Alloy.Globals.addWindowInNav("signIn", "allBlinds");
				}
			} else if (productData.bindId == "gridShare1" || productData.bindId == "gridShare2") {
				//Ti.API.info('e is ' +JSON.stringify(productData[bind]));
				//Ti.API.info('share url is '+itemSection[bind].shareUrl);
				// socialShare();

				// var shareProductUrl='http://dev.ddecor.com/collection/silky-satin';
				shareImage(itemSection[bind].shareUrl);
			} else {

				if (productData.bindId != "message" && !isNullVal(itemSection[bind].collectionId)) {
				    
				    
					var pData = {
						Productid : itemSection[bind].collectionId,
						block : "blinds",
						navigatedblockid : "",
						type : "blinds",
						category:itemSection[bind].category, // blind category
						//category:"blinds",
						
					};
					Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
				}
			}

		}
	}
}

function addToShortlistSuccessCallback(e) {
	try {
		// var pbind = "",
		// pindex = "",
		// pitemSection = "";
		//
		// pbind = shortlistData.bindId;
		// pindex = shortlistData.itemIndex;
		// pitemSection = shortlistData.section.items[index];
		// pitemSection[bind].text = "\ue927";
		// pitemSection[bind].color = "#e65e48";
		// shortlistData.section.updateItemAt(shortlistData.itemIndex, pitemSection);
		showAlert($.allBlinds, e.message);
		googleAnalyticsQdsShortlist(gaShortlistProduct,"ALL BLINDS");
	} catch(e) {
		Ti.API.info('catch = ' + JSON.stringify(e));
		// var pbind = "",
		// pindex = "",
		// pitemSection = "";
		//
		// pbind = shortlistData.bindId;
		// pindex = shortlistData.itemIndex;
		// pitemSection = shortlistData.section.items[index];
		// pitemSection[bind].text = "\ue60b";
		// pitemSection[bind].color = "#a6a6a6";
		// shortlistData.section.updateItemAt(shortlistData.itemIndex, pitemSection);
	}
}

function addToShortlistErrorCallback(e) {
	showAlert($.allBlinds, e.message);
	var pbind = "",
	    pindex = "",
	    pitemSection = "";

	pbind = shortlistData.bindId;
	pindex = shortlistData.itemIndex;
	pitemSection = shortlistData.section.items[index];
	pitemSection[bind].text = "\ue60b";
	pitemSection[bind].color = "#a6a6a6";
	shortlistData.section.updateItemAt(shortlistData.itemIndex, pitemSection);
}

function removeShortlistProductSuccessCallback(e) {
	try {
		// var pbind = "",
		// pindex = "",
		// pitemSection = "";
		//
		// pbind = shortlistData.bindId;
		// pindex = shortlistData.itemIndex;
		// pitemSection = shortlistData.section.items[pindex];
		// pitemSection[pbind].text = "\ue60b";
		// pitemSection[pbind].color = "#a6a6a6";
		// shortlistData.section.updateItemAt(shortlistData.itemIndex, pitemSection);
		showAlert($.allBlinds, e.message);
	} catch(e) {
		Ti.API.info('catch = ' + JSON.stringify(e));
		// var pbind = "",
		// pindex = "",
		// pitemSection = "";
		//
		// pbind = shortlistData.bindId;
		// pindex = shortlistData.itemIndex;
		// pitemSection = shortlistData.section.items[pindex];
		// pitemSection[pbind].text = "\ue60b";
		// pitemSection[pbind].color = "#a6a6a6";
		// shortlistData.section.updateItemAt(shortlistData.itemIndex, pitemSection);
	}
}

function removeShortlistProductErrorCallback(e) {
	showAlert($.allBlinds, e.message);
	var pbind = "",
	    pindex = "",
	    pitemSection = "";

	pbind = shortlistData.bindId;
	pindex = shortlistData.itemIndex;
	pitemSection = shortlistData.section.items[pindex];
	pitemSection[pbind].text = "\ue927";
	pitemSection[pbind].color = "#e65e48";
	shortlistData.section.updateItemAt(shortlistData.itemIndex, pitemSection);
}

//Alloy.Globals.setCount();

function goToBack() {

	if (addShortlist.type == "shortlist") {
		hideShowView(addShortlist);
		addShortlist = "";
	} else {
		$.blinds1LoadMore.removeEventListener('click', blinds1DataFn);
		$.blinds2LoadMore.removeEventListener('click', blinds2DataFn);
		$.blinds3LoadMore.removeEventListener('click', blinds3DataFn);
		$.blinds4LoadMore.removeEventListener('click', blinds4DataFn);
		$.blinds5LoadMore.removeEventListener('click', blinds5DataFn);
		$.blinds6LoadMore.removeEventListener('click', blinds6DataFn);
		$.blinds7LoadMore.removeEventListener('click', blinds7DataFn);
		$.blinds8LoadMore.removeEventListener('click', blinds8DataFn);

		$.blinds1ViewAllContainer.removeEventListener('click', categoryViewAll);
		$.blinds2ViewAllContainer.removeEventListener('click', categoryViewAll);
		$.blinds3ViewAllContainer.removeEventListener('click', categoryViewAll);
		$.blinds4ViewAllContainer.removeEventListener('click', categoryViewAll);
		$.blinds5ViewAllContainer.removeEventListener('click', categoryViewAll);
		$.blinds6ViewAllContainer.removeEventListener('click', categoryViewAll);
		$.blinds7ViewAllContainer.removeEventListener('click', categoryViewAll);
		$.blinds8ViewAllContainer.removeEventListener('click', categoryViewAll);
		$.blinds1ListView.removeEventListener('itemclick', addToShortlist);
		$.blinds2ListView.removeEventListener('itemclick', addToShortlist);
		$.blinds3ListView.removeEventListener('itemclick', addToShortlist);
		$.blinds4ListView.removeEventListener('itemclick', addToShortlist);
		$.blinds5ListView.removeEventListener('itemclick', addToShortlist);
		$.blinds6ListView.removeEventListener('itemclick', addToShortlist);
		$.blinds7ListView.removeEventListener('itemclick', addToShortlist);
		$.blinds8ListView.removeEventListener('itemclick', addToShortlist);
		//args = {};
		Alloy.Globals.popWindowInNav();
		$.allBlinds.close();
	}

}

function destroyWindow(e) {

	$.allBlinds.removeAllChildren();
	$.destroy();
}

// if (Ti.Platform.Android) {
//
// $.allBlinds.fbProxy = Alloy.Globals.fb.createActivityWorker({
// lifecycleContainer : $.allBlinds
// });
// }

function updateCount() {
	$.header.updateCartCount();
}
