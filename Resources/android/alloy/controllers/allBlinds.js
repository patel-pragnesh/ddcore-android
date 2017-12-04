function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function hideOverFlowMenu(e) {
        Alloy.Globals.overFlowFlag && $.header.hideOverFlow();
    }
    function getAllCollection() {
        showLoader($.allBlinds);
        var url = Alloy.Globals.commonUrl.allblinds;
        var data = {};
        var requestParams = JSON.stringify(data);
        Alloy.Globals.webServiceCall(url, requestParams, allCollectionSuccessCallback, allCollectionErrorCallback, "POST", $.allBlinds);
    }
    function emptyData() {
        return [ {
            properties: {},
            template: "emptyTemplate",
            message: {
                text: "THERE ARE NO PRODUCTS IN THIS CATEGORY."
            }
        } ];
    }
    function allCollectionSuccessCallback(e) {
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
                $.blinds1ListView.height = 3 * (Alloy.Globals.imageWidth + 63) + 56;
                blinds1TotalCount = e.data.product_data[0].total_count;
                blinds1LoaddedCount = blinds1.length;
                $.blinds1LoadMoreLbl.categoryName = e.data.product_data[0].categoryName;
                $.blinds1LoadMoreLbl.categoryId = e.data.product_data[0].categoryId;
                $.blinds1ViewAllLbl.categoryName = e.data.product_data[0].categoryName;
                $.blinds1ViewAllLbl.categoryId = e.data.product_data[0].categoryId;
                $.blinds1rightArrow.categoryName = e.data.product_data[0].categoryName;
            }
            if (6 >= blinds1TotalCount) {
                $.blinds1LoadMoreLbl.color = "#e65e48";
                $.blinds1LoadMoreLbl.text = "VIEW ALL";
            }
            if (blinds2.length > 0) {
                $.blinds2ListView.height = 3 * (Alloy.Globals.imageWidth + 63) + 56;
                blinds2TotalCount = e.data.product_data[1].total_count;
                blinds2LoaddedCount = blinds2.length;
                $.blinds2LoadMoreLbl.categoryName = e.data.product_data[1].categoryName;
                $.blinds2LoadMoreLbl.categoryId = e.data.product_data[1].categoryId;
                $.blinds2ViewAllLbl.categoryName = e.data.product_data[1].categoryName;
                $.blinds2ViewAllLbl.categoryId = e.data.product_data[1].categoryId;
                $.blinds2rightArrow.categoryName = e.data.product_data[1].categoryName;
            }
            if (6 >= blinds2TotalCount) {
                $.blinds2LoadMoreLbl.color = "#e65e48";
                $.blinds2LoadMoreLbl.text = "VIEW ALL";
            }
            if (blinds3.length > 0) {
                $.blinds3ListView.height = 3 * (Alloy.Globals.imageWidth + 63) + 56;
                blinds3TotalCount = e.data.product_data[2].total_count;
                blinds3LoaddedCount = blinds3.length;
                $.blinds3LoadMoreLbl.categoryName = e.data.product_data[2].categoryName;
                $.blinds3LoadMoreLbl.categoryId = e.data.product_data[2].categoryId;
                $.blinds3ViewAllLbl.categoryName = e.data.product_data[2].categoryName;
                $.blinds3ViewAllLbl.categoryId = e.data.product_data[2].categoryId;
                $.blinds3rightArrow.categoryName = e.data.product_data[2].categoryName;
            }
            if (6 >= blinds3TotalCount) {
                $.blinds3LoadMoreLbl.color = "#e65e48";
                $.blinds3LoadMoreLbl.text = "VIEW ALL";
            }
            if (blinds4.length > 0) {
                $.blinds4ListView.height = 3 * (Alloy.Globals.imageWidth + 63) + 56;
                blinds4TotalCount = e.data.product_data[3].total_count;
                blinds4LoaddedCount = blinds4.length;
                $.blinds4LoadMoreLbl.categoryName = e.data.product_data[3].categoryName;
                $.blinds4LoadMoreLbl.categoryId = e.data.product_data[3].categoryId;
                $.blinds4ViewAllLbl.categoryName = e.data.product_data[3].categoryName;
                $.blinds4ViewAllLbl.categoryId = e.data.product_data[3].categoryId;
                $.blinds4rightArrow.categoryName = e.data.product_data[3].categoryName;
            }
            if (6 >= blinds4TotalCount) {
                $.blinds4LoadMoreLbl.color = "#e65e48";
                $.blinds4LoadMoreLbl.text = "VIEW ALL";
            }
            if (blinds5.length > 0) {
                $.blinds5ListView.height = 3 * (Alloy.Globals.imageWidth + 63) + 56;
                blinds5TotalCount = e.data.product_data[4].total_count;
                blinds5LoaddedCount = blinds5.length;
                $.blinds5LoadMoreLbl.categoryName = e.data.product_data[4].categoryName;
                $.blinds5LoadMoreLbl.categoryId = e.data.product_data[4].categoryId;
                $.blinds5ViewAllLbl.categoryName = e.data.product_data[4].categoryName;
                $.blinds5ViewAllLbl.categoryId = e.data.product_data[4].categoryId;
                $.blinds5rightArrow.categoryName = e.data.product_data[4].categoryName;
            }
            if (6 >= blinds5TotalCount) {
                $.blinds5LoadMoreLbl.color = "#e65e48";
                $.blinds5LoadMoreLbl.text = "VIEW ALL";
            }
            if (blinds6.length > 0) {
                $.blinds6ListView.height = 3 * (Alloy.Globals.imageWidth + 63) + 56;
                blinds6TotalCount = e.data.product_data[5].total_count;
                blinds6LoaddedCount = blinds6.length;
                $.blinds6LoadMoreLbl.categoryName = e.data.product_data[5].categoryName;
                $.blinds6LoadMoreLbl.categoryId = e.data.product_data[5].categoryId;
                $.blinds6ViewAllLbl.categoryName = e.data.product_data[5].categoryName;
                $.blinds6ViewAllLbl.categoryId = e.data.product_data[5].categoryId;
                $.blinds6rightArrow.categoryName = e.data.product_data[5].categoryName;
            }
            if (6 >= blinds6TotalCount) {
                $.blinds6LoadMoreLbl.color = "#e65e48";
                $.blinds6LoadMoreLbl.text = "VIEW ALL";
            }
            if (blinds7.length > 0) {
                $.blinds7ListView.height = 3 * (Alloy.Globals.imageWidth + 63) + 56;
                blinds7TotalCount = e.data.product_data[6].total_count;
                blinds7LoaddedCount = blinds7.length;
                $.blinds7LoadMoreLbl.categoryName = e.data.product_data[6].categoryName;
                $.blinds7LoadMoreLbl.categoryId = e.data.product_data[6].categoryId;
                $.blinds7ViewAllLbl.categoryName = e.data.product_data[6].categoryName;
                $.blinds7ViewAllLbl.categoryId = e.data.product_data[6].categoryId;
                $.blinds7rightArrow.categoryName = e.data.product_data[6].categoryName;
            }
            if (6 >= blinds7TotalCount) {
                $.blinds7LoadMoreLbl.color = "#e65e48";
                $.blinds7LoadMoreLbl.text = "VIEW ALL";
            }
            if (blinds8.length > 0) {
                $.blinds8ListView.height = 3 * (Alloy.Globals.imageWidth + 63) + 56;
                blinds8TotalCount = e.data.product_data[7].total_count;
                blinds8LoaddedCount = blinds8.length;
                $.blinds8LoadMoreLbl.categoryName = e.data.product_data[7].categoryName;
                $.blinds8LoadMoreLbl.categoryId = e.data.product_data[7].categoryId;
                $.blinds8ViewAllLbl.categoryName = e.data.product_data[7].categoryName;
                $.blinds8ViewAllLbl.categoryId = e.data.product_data[7].categoryId;
                $.blinds8rightArrow.categoryName = e.data.product_data[7].categoryName;
            }
            if (6 >= blinds8TotalCount) {
                $.blinds8LoadMoreLbl.color = "#e65e48";
                $.blinds8LoadMoreLbl.text = "VIEW ALL";
            }
            var size = 2;
            var blinds1DataArr = [];
            var blinds2DataArr = [];
            var blinds3DataArr = [];
            var blinds4DataArr = [];
            var blinds5DataArr = [];
            var blinds6DataArr = [];
            var blinds7DataArr = [];
            var blinds8DataArr = [];
            var myDataArrCounter = 0;
            for (var i = 0; 6 > i; i += size) {
                if (blinds1.length > 0) {
                    var smallblinds1Array = blinds1.slice(i, i + size);
                    blinds1DataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallblinds1Array));
                }
                if (blinds2.length > 0) {
                    var smallblinds2Array = blinds2.slice(i, i + size);
                    blinds2DataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallblinds2Array));
                }
                if (blinds3.length > 0) {
                    var smallblinds3Array = blinds3.slice(i, i + size);
                    blinds3DataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallblinds3Array));
                }
                if (blinds4.length > 0) {
                    var smallblinds4Array = blinds4.slice(i, i + size);
                    blinds4DataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallblinds4Array));
                }
                if (blinds5.length > 0) {
                    var smallblinds5Array = blinds5.slice(i, i + size);
                    blinds5DataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallblinds5Array));
                }
                if (blinds6.length > 0) {
                    var smallblinds6Array = blinds6.slice(i, i + size);
                    blinds6DataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallblinds6Array));
                }
                if (blinds7.length > 0) {
                    var smallblinds7Array = blinds7.slice(i, i + size);
                    blinds7DataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallblinds7Array));
                }
                if (blinds8.length > 0) {
                    var smallblinds8Array = blinds8.slice(i, i + size);
                    blinds8DataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallblinds8Array));
                }
                myDataArrCounter++;
            }
            var blinds1ToAdd = "", blinds2ToAdd = "", blinds3ToAdd = "", blinds4ToAdd = "", blinds5ToAdd = "", blinds6ToAdd = "", blinds7ToAdd = "", blinds8ToAdd = "";
            if (blinds1.length > 0) {
                blinds1ToAdd = preprocessForListView(JSON.parse("{" + blinds1DataArr + "}"), "Roman");
                $.blinds1ListView.sections[0].appendItems(blinds1ToAdd);
                blinds1Page++;
            } else if (6 == blinds1.length) {
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
            } else if (6 == blinds2.length) {
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
            } else if (6 == blinds3.length) {
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
            } else if (6 == blinds4.length) {
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
            } else if (6 == blinds5.length) {
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
            } else if (6 == blinds6.length) {
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
            } else if (6 == blinds7.length) {
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
            } else if (6 == blinds8.length) {
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
        } catch (ex) {
            hideLoader($.allBlinds);
            Ti.API.info("catch ex = " + ex.message);
        }
    }
    function allCollectionErrorCallback(e) {
        hideLoader($.allBlinds);
        showAlert($.allBlinds, e.message);
    }
    function blinds1DataFn(e) {
        if (blinds1LoaddedCount != blinds1TotalCount && e.source.categoryName && "18" != blinds1LoaddedCount) {
            $.blinds1LoadMoreLbl.text = "";
            $.blinds1ActivityIndicator.show();
            $.blinds1LoadMore.touchEnabled = false;
            $.blinds1LoadMoreLbl.touchEnabled = false;
            loadMoreData(e.source.categoryName, e.source.categoryId, blinds1Page, 6);
        } else if ("VIEW ALL" == $.blinds1LoadMoreLbl.text) {
            $.blinds1LoadMoreLbl.color = "#e65e48";
            loadMoreToViewAll(e.source.categoryName, e.source.categoryId);
        } else {
            $.blinds1LoadMoreLbl.color = "#e65e48";
            $.blinds1LoadMoreLbl.text = "VIEW ALL";
        }
    }
    function blinds2DataFn(e) {
        if (blinds2LoaddedCount != blinds2TotalCount && e.source.categoryName && "18" != blinds2LoaddedCount) {
            $.blinds2LoadMoreLbl.text = "";
            $.blinds2ActivityIndicator.show();
            $.blinds2LoadMore.touchEnabled = false;
            loadMoreData(e.source.categoryName, e.source.categoryId, blinds2Page, 6);
        } else if ("VIEW ALL" == $.blinds2LoadMoreLbl.text) {
            $.blinds2LoadMoreLbl.color = "#e65e48";
            loadMoreToViewAll(e.source.categoryName, e.source.categoryId);
        } else {
            $.blinds2LoadMoreLbl.color = "#e65e48";
            $.blinds2LoadMoreLbl.text = "VIEW ALL";
        }
    }
    function blinds3DataFn(e) {
        if (blinds3LoaddedCount != blinds3TotalCount && e.source.categoryName && "18" != blinds3LoaddedCount) {
            $.blinds3LoadMoreLbl.text = "";
            $.blinds3ActivityIndicator.show();
            $.blinds3LoadMore.touchEnabled = false;
            loadMoreData(e.source.categoryName, e.source.categoryId, blinds3Page, 6);
        } else if ("VIEW ALL" == $.blinds3LoadMoreLbl.text) {
            $.blinds3LoadMoreLbl.color = "#e65e48";
            loadMoreToViewAll(e.source.categoryName, e.source.categoryId);
        } else {
            $.blinds3LoadMoreLbl.color = "#e65e48";
            $.blinds3LoadMoreLbl.text = "VIEW ALL";
        }
    }
    function blinds4DataFn(e) {
        if (blinds4LoaddedCount != blinds4TotalCount && e.source.categoryName && "18" != blinds4LoaddedCount) {
            $.blinds4LoadMoreLbl.text = "";
            $.blinds4ActivityIndicator.show();
            $.blinds4LoadMore.touchEnabled = false;
            loadMoreData(e.source.categoryName, e.source.categoryId, blinds4Page, 6);
        } else if ("VIEW ALL" == $.blinds4LoadMoreLbl.text) {
            $.blinds4LoadMoreLbl.color = "#e65e48";
            loadMoreToViewAll(e.source.categoryName, e.source.categoryId);
        } else {
            $.blinds4LoadMoreLbl.color = "#e65e48";
            $.blinds4LoadMoreLbl.text = "VIEW ALL";
        }
    }
    function blinds5DataFn(e) {
        if (blinds5LoaddedCount != blinds5TotalCount && e.source.categoryName && "18" != blinds5LoaddedCount) {
            $.blinds5LoadMoreLbl.text = "";
            $.blinds5ActivityIndicator.show();
            $.blinds5LoadMore.touchEnabled = false;
            loadMoreData(e.source.categoryName, e.source.categoryId, blinds5Page, 6);
        } else if ("VIEW ALL" == $.blinds5LoadMoreLbl.text) {
            $.blinds5LoadMoreLbl.color = "#e65e48";
            loadMoreToViewAll(e.source.categoryName, e.source.categoryId);
        } else {
            $.blinds5LoadMoreLbl.color = "#e65e48";
            $.blinds5LoadMoreLbl.text = "VIEW ALL";
        }
    }
    function blinds6DataFn(e) {
        if (blinds6LoaddedCount != blinds6TotalCount && e.source.categoryName && "18" != blinds6LoaddedCount) {
            $.blinds6LoadMoreLbl.text = "";
            $.blinds6ActivityIndicator.show();
            $.blinds6LoadMore.touchEnabled = false;
            loadMoreData(e.source.categoryName, e.source.categoryId, blinds6Page, 6);
        } else if ("VIEW ALL" == $.blinds6LoadMoreLbl.text) {
            $.blinds6LoadMoreLbl.color = "#e65e48";
            loadMoreToViewAll(e.source.categoryName, e.source.categoryId);
        } else {
            $.blinds6LoadMoreLbl.color = "#e65e48";
            $.blinds6LoadMoreLbl.text = "VIEW ALL";
        }
    }
    function blinds7DataFn(e) {
        if (blinds7LoaddedCount != blinds7TotalCount && e.source.categoryName && "18" != blinds7LoaddedCount) {
            $.blinds7LoadMoreLbl.text = "";
            $.blinds7ActivityIndicator.show();
            $.blinds7LoadMore.touchEnabled = false;
            loadMoreData(e.source.categoryName, e.source.categoryId, blinds7Page, 6);
        } else if ("VIEW ALL" == $.blinds7LoadMoreLbl.text) {
            $.blinds7LoadMoreLbl.color = "#e65e48";
            loadMoreToViewAll(e.source.categoryName, e.source.categoryId);
        } else {
            $.blinds7LoadMoreLbl.color = "#e65e48";
            $.blinds7LoadMoreLbl.text = "VIEW ALL";
        }
    }
    function blinds8DataFn(e) {
        if (blinds8LoaddedCount != blinds8TotalCount && e.source.categoryName && "18" != blinds8LoaddedCount) {
            $.blinds8LoadMoreLbl.text = "";
            $.blinds8ActivityIndicator.show();
            $.blinds8LoadMore.touchEnabled = false;
            loadMoreData(e.source.categoryName, e.source.categoryId, blinds8Page, 6);
        } else if ("VIEW ALL" == $.blinds8LoadMoreLbl.text) {
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
            wName: categoryName,
            categoryId: categoryId,
            type: "C_Product",
            categoryType: "blinds",
            categoryName: categoryName
        };
        Alloy.Globals.addWindowInNav("productListing", collectionAllData);
    }
    function loadMoreData(name, id, pageNo, limit) {
        var url = Alloy.Globals.commonUrl.ourrange;
        var data;
        data = {
            category: name,
            categoryId: id,
            sortby: "latest",
            pagination: {}
        };
        data.pagination = {
            page_no: pageNo,
            page_size: limit
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
                paginationDataArr.push('"data' + myDataArrCounter + '":' + JSON.stringify(smallPaginationArray));
                myDataArrCounter++;
            }
            loadMorePaginationData = "{" + paginationDataArr + "}";
            var finalPaginationData = JSON.parse(loadMorePaginationData);
            if (finalPaginationData) switch (categoryName) {
              case "Roman":
                $.blinds1LoadMoreLbl.text = "LOAD MORE";
                $.blinds1ActivityIndicator.hide();
                $.blinds1LoadMore.touchEnabled = true;
                $.blinds1LoadMoreLbl.touchEnabled = true;
                blinds1LoaddedCount += paginationData.length;
                if (paginationData.length < 6) {
                    $.blinds1LoadMoreLbl.color = "#e65e48";
                    $.blinds1LoadMoreLbl.text = "VIEW ALL";
                } else if (18 == blinds1LoaddedCount) {
                    $.blinds1LoadMoreLbl.color = "#e65e48";
                    $.blinds1LoadMoreLbl.text = "VIEW ALL";
                }
                var ListViewHeight = parseInt($.blinds1ListView.getHeight());
                var a = 3 * Alloy.Globals.imageWidth + 175;
                $.blinds1ListView.height = ListViewHeight + a;
                var dataToAdd = preprocessForListView(finalPaginationData, "Roman");
                $.blinds1ListView.sections[0].appendItems(dataToAdd);
                blinds1Page++;
                break;

              case "Duplex":
                $.blinds2LoadMoreLbl.text = "LOAD MORE";
                $.blinds2ActivityIndicator.hide();
                $.blinds2LoadMore.touchEnabled = true;
                blinds2LoaddedCount += paginationData.length;
                if (paginationData.length < 6) {
                    $.blinds2LoadMoreLbl.color = "#e65e48";
                    $.blinds2LoadMoreLbl.text = "VIEW ALL";
                } else if (18 == blinds2LoaddedCount) {
                    $.blinds2LoadMoreLbl.color = "#e65e48";
                    $.blinds2LoadMoreLbl.text = "VIEW ALL";
                }
                var ListViewHeight = parseInt($.blinds2ListView.getHeight());
                var a = 3 * Alloy.Globals.imageWidth + 175;
                $.blinds2ListView.height = ListViewHeight + a;
                var dataToAdd = preprocessForListView(finalPaginationData, "Duplex");
                $.blinds2ListView.sections[0].appendItems(dataToAdd);
                blinds2Page++;
                break;

              case "Romex":
                $.blinds3LoadMoreLbl.text = "LOAD MORE";
                $.blinds3ActivityIndicator.hide();
                $.blinds3LoadMore.touchEnabled = true;
                blinds3LoaddedCount += paginationData.length;
                if (paginationData.length < 6) {
                    $.blinds3LoadMoreLbl.color = "#e65e48";
                    $.blinds3LoadMoreLbl.text = "VIEW ALL";
                } else if (18 == blinds3LoaddedCount) {
                    $.blinds3LoadMoreLbl.color = "#e65e48";
                    $.blinds3LoadMoreLbl.text = "VIEW ALL";
                }
                var ListViewHeight = parseInt($.blinds3ListView.getHeight());
                var a = 3 * Alloy.Globals.imageWidth + 175;
                $.blinds3ListView.height = ListViewHeight + a;
                var dataToAdd = preprocessForListView(finalPaginationData, "Romex");
                $.blinds3ListView.sections[0].appendItems(dataToAdd);
                blinds3Page++;
                break;

              case "Vertical":
                $.blinds4LoadMoreLbl.text = "LOAD MORE";
                $.blinds4ActivityIndicator.hide();
                $.blinds4LoadMore.touchEnabled = true;
                blinds4LoaddedCount += paginationData.length;
                if (paginationData.length < 6) {
                    $.blinds4LoadMoreLbl.color = "#e65e48";
                    $.blinds4LoadMoreLbl.text = "VIEW ALL";
                } else if (18 == blinds4LoaddedCount) {
                    $.blinds4LoadMoreLbl.color = "#e65e48";
                    $.blinds4LoadMoreLbl.text = "VIEW ALL";
                }
                var ListViewHeight = parseInt($.blinds4ListView.getHeight());
                var a = 3 * Alloy.Globals.imageWidth + 175;
                $.blinds4ListView.height = ListViewHeight + a;
                var dataToAdd = preprocessForListView(finalPaginationData, "Vertical");
                $.blinds4ListView.sections[0].appendItems(dataToAdd);
                blinds4Page++;
                break;

              case "Roller":
                $.blinds5LoadMoreLbl.text = "LOAD MORE";
                $.blinds5ActivityIndicator.hide();
                $.blinds5LoadMore.touchEnabled = true;
                blinds5LoaddedCount += paginationData.length;
                if (paginationData.length < 6) {
                    $.blinds5LoadMoreLbl.color = "#e65e48";
                    $.blinds5LoadMoreLbl.text = "VIEW ALL";
                } else if (18 == blinds5LoaddedCount) {
                    $.blinds5LoadMoreLbl.color = "#e65e48";
                    $.blinds5LoadMoreLbl.text = "VIEW ALL";
                }
                var ListViewHeight = parseInt($.blinds5ListView.getHeight());
                var a = 3 * Alloy.Globals.imageWidth + 175;
                $.blinds5ListView.height = ListViewHeight + a;
                var dataToAdd = preprocessForListView(finalPaginationData, "Roller");
                $.blinds5ListView.sections[0].appendItems(dataToAdd);
                blinds5Page++;
                break;

              case "Sheer Horizon":
                $.blinds6LoadMoreLbl.text = "LOAD MORE";
                $.blinds6ActivityIndicator.hide();
                $.blinds6LoadMore.touchEnabled = true;
                blinds6LoaddedCount += paginationData.length;
                if (paginationData.length < 6) {
                    $.blinds6LoadMoreLbl.color = "#e65e48";
                    $.blinds6LoadMoreLbl.text = "VIEW ALL";
                } else if (18 == blinds6LoaddedCount) {
                    $.blinds6LoadMoreLbl.color = "#e65e48";
                    $.blinds6LoadMoreLbl.text = "VIEW ALL";
                }
                var ListViewHeight = parseInt($.blinds6ListView.getHeight());
                var a = 3 * Alloy.Globals.imageWidth + 175;
                $.blinds6ListView.height = ListViewHeight + a;
                var dataToAdd = preprocessForListView(finalPaginationData, "Sheer Horizon");
                $.blinds6ListView.sections[0].appendItems(dataToAdd);
                blinds6Page++;
                break;

              case "Panel":
                $.blinds7LoadMoreLbl.text = "LOAD MORE";
                $.blinds7ActivityIndicator.hide();
                $.blinds7LoadMore.touchEnabled = true;
                blinds7LoaddedCount += paginationData.length;
                if (paginationData.length < 6) {
                    $.blinds7LoadMoreLbl.color = "#e65e48";
                    $.blinds7LoadMoreLbl.text = "VIEW ALL";
                } else if (18 == blinds7LoaddedCount) {
                    $.blinds7LoadMoreLbl.color = "#e65e48";
                    $.blinds7LoadMoreLbl.text = "VIEW ALL";
                }
                var ListViewHeight = parseInt($.blinds7ListView.getHeight());
                var a = 3 * Alloy.Globals.imageWidth + 175;
                $.blinds7ListView.height = ListViewHeight + a;
                var dataToAdd = preprocessForListView(finalPaginationData, "Panel");
                $.blinds7ListView.sections[0].appendItems(dataToAdd);
                blinds7Page++;
                break;

              case "Cladded":
                $.blinds8LoadMoreLbl.text = "LOAD MORE";
                $.blinds8ActivityIndicator.hide();
                $.blinds8LoadMore.touchEnabled = true;
                blinds8LoaddedCount += paginationData.length;
                if (paginationData.length < 6) {
                    $.blinds8LoadMoreLbl.color = "#e65e48";
                    $.blinds8LoadMoreLbl.text = "VIEW ALL";
                } else if (18 == blinds8LoaddedCount) {
                    $.blinds8LoadMoreLbl.color = "#e65e48";
                    $.blinds8LoadMoreLbl.text = "VIEW ALL";
                }
                var ListViewHeight = parseInt($.blinds8ListView.getHeight());
                var a = 3 * Alloy.Globals.imageWidth + 175;
                $.blinds8ListView.height = ListViewHeight + a;
                var dataToAdd = preprocessForListView(finalPaginationData, "Cladded");
                $.blinds8ListView.sections[0].appendItems(dataToAdd);
                blinds8Page++;
            }
        } catch (e) {
            Ti.API.info("catch error = " + e.message);
        }
    }
    function loadmoreErrorCallback(e) {
        showAlert($.allBlinds, e.message);
    }
    function categoryViewAll(e) {
        collectionAllData = "";
        if (!isNullVal(e.source.categoryName)) {
            collectionAllData = {
                wName: e.source.categoryName,
                categoryId: e.source.categoryId,
                type: "C_Product",
                categoryType: "blinds",
                categoryName: e.source.categoryName
            };
            Alloy.Globals.addWindowInNav("productListing", collectionAllData);
        }
    }
    function addToShortlist(productData) {
        if (!isNullVal(productData.bindId) && "message" != productData.bindId) {
            bind = productData.bindId;
            index = productData.itemIndex;
            itemSection = productData.section.items[index];
            if (!isNullVal(itemSection[bind].collectionId)) if ("gridWish1" == productData.bindId || "gridWish2" == productData.bindId) if (isNullVal(Ti.App.Properties.getString("access_token"))) Alloy.Globals.addWindowInNav("signIn", "allBlinds"); else {
                shortlistData = "";
                if (!isNullVal(productData.bindId)) {
                    shortlistData = productData;
                    if ("" == itemSection[bind].text) {
                        gaShortlistProduct = itemSection[bind].collectionName + "(" + itemSection[bind].product_sku + ")";
                        itemSection[bind].text = "";
                        itemSection[bind].color = "#e65e48";
                        productData.section.updateItemAt(index, itemSection);
                        var url = Alloy.Globals.commonUrl.addToShortlist;
                        var data = {
                            product_id: itemSection[bind].collectionId
                        };
                        var requestParams = JSON.stringify(data);
                        Alloy.Globals.webServiceCall(url, requestParams, addToShortlistSuccessCallback, addToShortlistErrorCallback, "POST", $.allBlinds);
                    } else {
                        itemSection[bind].text = "";
                        itemSection[bind].color = "#a6a6a6";
                        productData.section.updateItemAt(index, itemSection);
                        var url = Alloy.Globals.commonUrl.removeShortlist;
                        var data = {
                            product_id: itemSection[bind].collectionId
                        };
                        var requestParams = JSON.stringify(data);
                        Alloy.Globals.webServiceCall(url, requestParams, removeShortlistProductSuccessCallback, removeShortlistProductErrorCallback, "POST", $.allBlinds);
                    }
                }
            } else if ("gridShare1" == productData.bindId || "gridShare2" == productData.bindId) shareImage(itemSection[bind].shareUrl); else if ("message" != productData.bindId && !isNullVal(itemSection[bind].collectionId)) {
                var pData = {
                    Productid: itemSection[bind].collectionId,
                    block: "blinds",
                    navigatedblockid: "",
                    type: "blinds",
                    category: itemSection[bind].category
                };
                Alloy.Globals.addWindowInNav("collectionQdsDetails", pData);
            }
        }
    }
    function addToShortlistSuccessCallback(e) {
        try {
            showAlert($.allBlinds, e.message);
            googleAnalyticsQdsShortlist(gaShortlistProduct, "ALL BLINDS");
        } catch (e) {
            Ti.API.info("catch = " + JSON.stringify(e));
        }
    }
    function addToShortlistErrorCallback(e) {
        showAlert($.allBlinds, e.message);
        var pbind = "", pindex = "", pitemSection = "";
        pbind = shortlistData.bindId;
        pindex = shortlistData.itemIndex;
        pitemSection = shortlistData.section.items[index];
        pitemSection[bind].text = "";
        pitemSection[bind].color = "#a6a6a6";
        shortlistData.section.updateItemAt(shortlistData.itemIndex, pitemSection);
    }
    function removeShortlistProductSuccessCallback(e) {
        try {
            showAlert($.allBlinds, e.message);
        } catch (e) {
            Ti.API.info("catch = " + JSON.stringify(e));
        }
    }
    function removeShortlistProductErrorCallback(e) {
        showAlert($.allBlinds, e.message);
        var pbind = "", pindex = "", pitemSection = "";
        pbind = shortlistData.bindId;
        pindex = shortlistData.itemIndex;
        pitemSection = shortlistData.section.items[pindex];
        pitemSection[pbind].text = "";
        pitemSection[pbind].color = "#e65e48";
        shortlistData.section.updateItemAt(shortlistData.itemIndex, pitemSection);
    }
    function goToBack() {
        if ("shortlist" == addShortlist.type) {
            hideShowView(addShortlist);
            addShortlist = "";
        } else {
            $.blinds1LoadMore.removeEventListener("click", blinds1DataFn);
            $.blinds2LoadMore.removeEventListener("click", blinds2DataFn);
            $.blinds3LoadMore.removeEventListener("click", blinds3DataFn);
            $.blinds4LoadMore.removeEventListener("click", blinds4DataFn);
            $.blinds5LoadMore.removeEventListener("click", blinds5DataFn);
            $.blinds6LoadMore.removeEventListener("click", blinds6DataFn);
            $.blinds7LoadMore.removeEventListener("click", blinds7DataFn);
            $.blinds8LoadMore.removeEventListener("click", blinds8DataFn);
            $.blinds1ViewAllContainer.removeEventListener("click", categoryViewAll);
            $.blinds2ViewAllContainer.removeEventListener("click", categoryViewAll);
            $.blinds3ViewAllContainer.removeEventListener("click", categoryViewAll);
            $.blinds4ViewAllContainer.removeEventListener("click", categoryViewAll);
            $.blinds5ViewAllContainer.removeEventListener("click", categoryViewAll);
            $.blinds6ViewAllContainer.removeEventListener("click", categoryViewAll);
            $.blinds7ViewAllContainer.removeEventListener("click", categoryViewAll);
            $.blinds8ViewAllContainer.removeEventListener("click", categoryViewAll);
            $.blinds1ListView.removeEventListener("itemclick", addToShortlist);
            $.blinds2ListView.removeEventListener("itemclick", addToShortlist);
            $.blinds3ListView.removeEventListener("itemclick", addToShortlist);
            $.blinds4ListView.removeEventListener("itemclick", addToShortlist);
            $.blinds5ListView.removeEventListener("itemclick", addToShortlist);
            $.blinds6ListView.removeEventListener("itemclick", addToShortlist);
            $.blinds7ListView.removeEventListener("itemclick", addToShortlist);
            $.blinds8ListView.removeEventListener("itemclick", addToShortlist);
            Alloy.Globals.popWindowInNav();
            $.allBlinds.close();
        }
    }
    function destroyWindow(e) {
        $.allBlinds.removeAllChildren();
        $.destroy();
    }
    function updateCount() {
        $.header.updateCartCount();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "allBlinds";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.allBlinds = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        backgroundColor: "#ffffff",
        id: "allBlinds"
    });
    $.__views.allBlinds && $.addTopLevelView($.__views.allBlinds);
    goToBack ? $.addListener($.__views.allBlinds, "android:back", goToBack) : __defers["$.__views.allBlinds!android:back!goToBack"] = true;
    updateCount ? $.addListener($.__views.allBlinds, "focus", updateCount) : __defers["$.__views.allBlinds!focus!updateCount"] = true;
    destroyWindow ? $.addListener($.__views.allBlinds, "close", destroyWindow) : __defers["$.__views.allBlinds!close!destroyWindow"] = true;
    $.__views.header = Alloy.createWidget("headerView", "widget", {
        id: "header",
        __parentSymbol: $.__views.allBlinds
    });
    $.__views.header.setParent($.__views.allBlinds);
    $.__views.collectionScroll = Ti.UI.createScrollView({
        width: Titanium.UI.FILL,
        left: "15dp",
        right: "15dp",
        layout: "vertical",
        top: "53",
        scrollType: "vertical",
        height: Titanium.UI.FILL,
        id: "collectionScroll"
    });
    $.__views.allBlinds.add($.__views.collectionScroll);
    $.__views.__alloyId92 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        top: "0dp",
        layout: "vertical",
        id: "__alloyId92"
    });
    $.__views.collectionScroll.add($.__views.__alloyId92);
    $.__views.blinds1Container = Ti.UI.createView({
        top: "10dp",
        width: Titanium.UI.FILL,
        height: "20dp",
        id: "blinds1Container"
    });
    $.__views.__alloyId92.add($.__views.blinds1Container);
    $.__views.blinds1NameLbl = Ti.UI.createLabel({
        font: {
            fontSize: "11dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#333333",
        left: "0dp",
        id: "blinds1NameLbl"
    });
    $.__views.blinds1Container.add($.__views.blinds1NameLbl);
    $.__views.blinds1ViewAllContainer = Ti.UI.createView({
        height: Titanium.UI.FILL,
        right: "0dp",
        width: "40%",
        id: "blinds1ViewAllContainer"
    });
    $.__views.blinds1Container.add($.__views.blinds1ViewAllContainer);
    $.__views.blinds1ViewAllLbl = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        font: {
            fontSize: "9dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        right: "20dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        text: "VIEW ALL",
        height: Titanium.UI.FILL,
        id: "blinds1ViewAllLbl"
    });
    $.__views.blinds1ViewAllContainer.add($.__views.blinds1ViewAllLbl);
    $.__views.blinds1rightArrow = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "15dp"
        },
        color: "#e65e48",
        text: Alloy.Globals.icon.leftArrow,
        height: Titanium.UI.FILL,
        right: "0dp",
        width: "20dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        id: "blinds1rightArrow"
    });
    $.__views.blinds1ViewAllContainer.add($.__views.blinds1rightArrow);
    $.__views.__alloyId94 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId94"
    });
    $.__views.blinds1LoadMore = Ti.UI.createView({
        top: "13dp",
        width: Titanium.UI.FILL,
        height: "35dp",
        backgroundColor: "#f4f4f4",
        id: "blinds1LoadMore"
    });
    $.__views.__alloyId94.add($.__views.blinds1LoadMore);
    $.__views.blinds1LoadMoreLbl = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "LOAD MORE",
        id: "blinds1LoadMoreLbl"
    });
    $.__views.blinds1LoadMore.add($.__views.blinds1LoadMoreLbl);
    $.__views.blinds1ActivityIndicator = Ti.UI.createActivityIndicator({
        style: Ti.UI.ActivityIndicatorStyle.PLAIN,
        color: "#333333",
        id: "blinds1ActivityIndicator",
        message: " Loading..."
    });
    $.__views.blinds1LoadMore.add($.__views.blinds1ActivityIndicator);
    $.__views.__alloyId95 = Ti.UI.createView({
        width: "96%",
        backgroundColor: "#e6e6e6",
        height: "1dp",
        top: "20dp",
        id: "__alloyId95"
    });
    $.__views.__alloyId94.add($.__views.__alloyId95);
    var __alloyId103 = {};
    Alloy.createController("listTemplate", {
        __parentSymbol: __parentSymbol,
        __itemTemplate: __alloyId103
    });
    $.__views.__alloyId105 = Ti.UI.createListSection({
        id: "__alloyId105"
    });
    var __alloyId107 = [];
    __alloyId107.push($.__views.__alloyId105);
    $.__views.blinds1ListView = Ti.UI.createListView({
        sections: __alloyId107,
        templates: __alloyId103,
        footerView: $.__views.__alloyId94,
        id: "blinds1ListView",
        defaultItemTemplate: "gridTemplate"
    });
    $.__views.__alloyId92.add($.__views.blinds1ListView);
    $.__views.__alloyId108 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        top: "0dp",
        layout: "vertical",
        id: "__alloyId108"
    });
    $.__views.collectionScroll.add($.__views.__alloyId108);
    $.__views.blinds2Container = Ti.UI.createView({
        top: "10dp",
        width: Titanium.UI.FILL,
        height: "20dp",
        id: "blinds2Container"
    });
    $.__views.__alloyId108.add($.__views.blinds2Container);
    $.__views.blinds2NameLbl = Ti.UI.createLabel({
        font: {
            fontSize: "11dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#333333",
        left: "0dp",
        id: "blinds2NameLbl"
    });
    $.__views.blinds2Container.add($.__views.blinds2NameLbl);
    $.__views.blinds2ViewAllContainer = Ti.UI.createView({
        height: Titanium.UI.FILL,
        right: "0dp",
        width: "40%",
        id: "blinds2ViewAllContainer"
    });
    $.__views.blinds2Container.add($.__views.blinds2ViewAllContainer);
    $.__views.blinds2ViewAllLbl = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        font: {
            fontSize: "9dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        right: "20dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        text: "VIEW ALL",
        height: Titanium.UI.FILL,
        id: "blinds2ViewAllLbl"
    });
    $.__views.blinds2ViewAllContainer.add($.__views.blinds2ViewAllLbl);
    $.__views.blinds2rightArrow = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "15dp"
        },
        color: "#e65e48",
        text: Alloy.Globals.icon.leftArrow,
        height: Titanium.UI.FILL,
        right: "0dp",
        width: "20dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        id: "blinds2rightArrow"
    });
    $.__views.blinds2ViewAllContainer.add($.__views.blinds2rightArrow);
    $.__views.__alloyId110 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId110"
    });
    $.__views.blinds2LoadMore = Ti.UI.createView({
        top: "13dp",
        width: Titanium.UI.FILL,
        height: "35dp",
        backgroundColor: "#f4f4f4",
        id: "blinds2LoadMore"
    });
    $.__views.__alloyId110.add($.__views.blinds2LoadMore);
    $.__views.blinds2LoadMoreLbl = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "LOAD MORE",
        id: "blinds2LoadMoreLbl"
    });
    $.__views.blinds2LoadMore.add($.__views.blinds2LoadMoreLbl);
    $.__views.blinds2ActivityIndicator = Ti.UI.createActivityIndicator({
        style: Ti.UI.ActivityIndicatorStyle.PLAIN,
        color: "#333333",
        id: "blinds2ActivityIndicator",
        message: " Loading..."
    });
    $.__views.blinds2LoadMore.add($.__views.blinds2ActivityIndicator);
    $.__views.__alloyId111 = Ti.UI.createView({
        width: "96%",
        backgroundColor: "#e6e6e6",
        height: "1dp",
        top: "20dp",
        id: "__alloyId111"
    });
    $.__views.__alloyId110.add($.__views.__alloyId111);
    var __alloyId119 = {};
    Alloy.createController("listTemplate", {
        __parentSymbol: __parentSymbol,
        __itemTemplate: __alloyId119
    });
    $.__views.__alloyId121 = Ti.UI.createListSection({
        id: "__alloyId121"
    });
    var __alloyId123 = [];
    __alloyId123.push($.__views.__alloyId121);
    $.__views.blinds2ListView = Ti.UI.createListView({
        sections: __alloyId123,
        templates: __alloyId119,
        footerView: $.__views.__alloyId110,
        id: "blinds2ListView",
        defaultItemTemplate: "gridTemplate"
    });
    $.__views.__alloyId108.add($.__views.blinds2ListView);
    $.__views.__alloyId124 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        top: "0dp",
        layout: "vertical",
        id: "__alloyId124"
    });
    $.__views.collectionScroll.add($.__views.__alloyId124);
    $.__views.blinds3Container = Ti.UI.createView({
        top: "10dp",
        width: Titanium.UI.FILL,
        height: "20dp",
        id: "blinds3Container"
    });
    $.__views.__alloyId124.add($.__views.blinds3Container);
    $.__views.blinds3NameLbl = Ti.UI.createLabel({
        font: {
            fontSize: "11dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#333333",
        left: "0dp",
        id: "blinds3NameLbl"
    });
    $.__views.blinds3Container.add($.__views.blinds3NameLbl);
    $.__views.blinds3ViewAllContainer = Ti.UI.createView({
        height: Titanium.UI.FILL,
        right: "0dp",
        width: "40%",
        id: "blinds3ViewAllContainer"
    });
    $.__views.blinds3Container.add($.__views.blinds3ViewAllContainer);
    $.__views.blinds3ViewAllLbl = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        font: {
            fontSize: "9dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        right: "20dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        text: "VIEW ALL",
        height: Titanium.UI.FILL,
        id: "blinds3ViewAllLbl"
    });
    $.__views.blinds3ViewAllContainer.add($.__views.blinds3ViewAllLbl);
    $.__views.blinds3rightArrow = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "15dp"
        },
        color: "#e65e48",
        text: Alloy.Globals.icon.leftArrow,
        height: Titanium.UI.FILL,
        right: "0dp",
        width: "20dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        id: "blinds3rightArrow"
    });
    $.__views.blinds3ViewAllContainer.add($.__views.blinds3rightArrow);
    $.__views.__alloyId126 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId126"
    });
    $.__views.blinds3LoadMore = Ti.UI.createView({
        top: "13dp",
        width: Titanium.UI.FILL,
        height: "35dp",
        backgroundColor: "#f4f4f4",
        id: "blinds3LoadMore"
    });
    $.__views.__alloyId126.add($.__views.blinds3LoadMore);
    $.__views.blinds3LoadMoreLbl = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "LOAD MORE",
        id: "blinds3LoadMoreLbl"
    });
    $.__views.blinds3LoadMore.add($.__views.blinds3LoadMoreLbl);
    $.__views.blinds3ActivityIndicator = Ti.UI.createActivityIndicator({
        style: Ti.UI.ActivityIndicatorStyle.PLAIN,
        color: "#333333",
        id: "blinds3ActivityIndicator",
        message: " Loading..."
    });
    $.__views.blinds3LoadMore.add($.__views.blinds3ActivityIndicator);
    $.__views.__alloyId127 = Ti.UI.createView({
        width: "96%",
        backgroundColor: "#e6e6e6",
        height: "1dp",
        top: "20dp",
        id: "__alloyId127"
    });
    $.__views.__alloyId126.add($.__views.__alloyId127);
    var __alloyId135 = {};
    Alloy.createController("listTemplate", {
        __parentSymbol: __parentSymbol,
        __itemTemplate: __alloyId135
    });
    $.__views.__alloyId137 = Ti.UI.createListSection({
        id: "__alloyId137"
    });
    var __alloyId139 = [];
    __alloyId139.push($.__views.__alloyId137);
    $.__views.blinds3ListView = Ti.UI.createListView({
        sections: __alloyId139,
        templates: __alloyId135,
        footerView: $.__views.__alloyId126,
        id: "blinds3ListView",
        defaultItemTemplate: "gridTemplate"
    });
    $.__views.__alloyId124.add($.__views.blinds3ListView);
    $.__views.__alloyId140 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        top: "0dp",
        layout: "vertical",
        id: "__alloyId140"
    });
    $.__views.collectionScroll.add($.__views.__alloyId140);
    $.__views.blinds4Container = Ti.UI.createView({
        top: "10dp",
        width: Titanium.UI.FILL,
        height: "20dp",
        id: "blinds4Container"
    });
    $.__views.__alloyId140.add($.__views.blinds4Container);
    $.__views.blinds4NameLbl = Ti.UI.createLabel({
        font: {
            fontSize: "11dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#333333",
        left: "0dp",
        id: "blinds4NameLbl"
    });
    $.__views.blinds4Container.add($.__views.blinds4NameLbl);
    $.__views.blinds4ViewAllContainer = Ti.UI.createView({
        height: Titanium.UI.FILL,
        right: "0dp",
        width: "40%",
        id: "blinds4ViewAllContainer"
    });
    $.__views.blinds4Container.add($.__views.blinds4ViewAllContainer);
    $.__views.blinds4ViewAllLbl = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        font: {
            fontSize: "9dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        right: "20dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        text: "VIEW ALL",
        height: Titanium.UI.FILL,
        id: "blinds4ViewAllLbl"
    });
    $.__views.blinds4ViewAllContainer.add($.__views.blinds4ViewAllLbl);
    $.__views.blinds4rightArrow = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "15dp"
        },
        color: "#e65e48",
        text: Alloy.Globals.icon.leftArrow,
        height: Titanium.UI.FILL,
        right: "0dp",
        width: "20dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        id: "blinds4rightArrow"
    });
    $.__views.blinds4ViewAllContainer.add($.__views.blinds4rightArrow);
    $.__views.__alloyId142 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId142"
    });
    $.__views.blinds4LoadMore = Ti.UI.createView({
        top: "13dp",
        width: Titanium.UI.FILL,
        height: "35dp",
        backgroundColor: "#f4f4f4",
        id: "blinds4LoadMore"
    });
    $.__views.__alloyId142.add($.__views.blinds4LoadMore);
    $.__views.blinds4LoadMoreLbl = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "LOAD MORE",
        id: "blinds4LoadMoreLbl"
    });
    $.__views.blinds4LoadMore.add($.__views.blinds4LoadMoreLbl);
    $.__views.blinds4ActivityIndicator = Ti.UI.createActivityIndicator({
        style: Ti.UI.ActivityIndicatorStyle.PLAIN,
        color: "#333333",
        id: "blinds4ActivityIndicator",
        message: " Loading..."
    });
    $.__views.blinds4LoadMore.add($.__views.blinds4ActivityIndicator);
    $.__views.__alloyId143 = Ti.UI.createView({
        width: "96%",
        backgroundColor: "#e6e6e6",
        height: "1dp",
        top: "20dp",
        id: "__alloyId143"
    });
    $.__views.__alloyId142.add($.__views.__alloyId143);
    var __alloyId151 = {};
    Alloy.createController("listTemplate", {
        __parentSymbol: __parentSymbol,
        __itemTemplate: __alloyId151
    });
    $.__views.__alloyId153 = Ti.UI.createListSection({
        id: "__alloyId153"
    });
    var __alloyId155 = [];
    __alloyId155.push($.__views.__alloyId153);
    $.__views.blinds4ListView = Ti.UI.createListView({
        sections: __alloyId155,
        templates: __alloyId151,
        footerView: $.__views.__alloyId142,
        id: "blinds4ListView",
        defaultItemTemplate: "gridTemplate"
    });
    $.__views.__alloyId140.add($.__views.blinds4ListView);
    $.__views.__alloyId156 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        top: "0dp",
        layout: "vertical",
        id: "__alloyId156"
    });
    $.__views.collectionScroll.add($.__views.__alloyId156);
    $.__views.blinds5Container = Ti.UI.createView({
        top: "10dp",
        width: Titanium.UI.FILL,
        height: "20dp",
        id: "blinds5Container"
    });
    $.__views.__alloyId156.add($.__views.blinds5Container);
    $.__views.blinds5NameLbl = Ti.UI.createLabel({
        font: {
            fontSize: "11dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#333333",
        left: "0dp",
        id: "blinds5NameLbl"
    });
    $.__views.blinds5Container.add($.__views.blinds5NameLbl);
    $.__views.blinds5ViewAllContainer = Ti.UI.createView({
        height: Titanium.UI.FILL,
        right: "0dp",
        width: "40%",
        id: "blinds5ViewAllContainer"
    });
    $.__views.blinds5Container.add($.__views.blinds5ViewAllContainer);
    $.__views.blinds5ViewAllLbl = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        font: {
            fontSize: "9dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        right: "20dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        text: "VIEW ALL",
        height: Titanium.UI.FILL,
        id: "blinds5ViewAllLbl"
    });
    $.__views.blinds5ViewAllContainer.add($.__views.blinds5ViewAllLbl);
    $.__views.blinds5rightArrow = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "15dp"
        },
        color: "#e65e48",
        text: Alloy.Globals.icon.leftArrow,
        height: Titanium.UI.FILL,
        right: "0dp",
        width: "20dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        id: "blinds5rightArrow"
    });
    $.__views.blinds5ViewAllContainer.add($.__views.blinds5rightArrow);
    $.__views.__alloyId158 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId158"
    });
    $.__views.blinds5LoadMore = Ti.UI.createView({
        top: "13dp",
        width: Titanium.UI.FILL,
        height: "35dp",
        backgroundColor: "#f4f4f4",
        id: "blinds5LoadMore"
    });
    $.__views.__alloyId158.add($.__views.blinds5LoadMore);
    $.__views.blinds5LoadMoreLbl = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "LOAD MORE",
        id: "blinds5LoadMoreLbl"
    });
    $.__views.blinds5LoadMore.add($.__views.blinds5LoadMoreLbl);
    $.__views.blinds5ActivityIndicator = Ti.UI.createActivityIndicator({
        style: Ti.UI.ActivityIndicatorStyle.PLAIN,
        color: "#333333",
        id: "blinds5ActivityIndicator",
        message: " Loading..."
    });
    $.__views.blinds5LoadMore.add($.__views.blinds5ActivityIndicator);
    $.__views.__alloyId159 = Ti.UI.createView({
        width: "96%",
        backgroundColor: "#e6e6e6",
        height: "1dp",
        top: "20dp",
        id: "__alloyId159"
    });
    $.__views.__alloyId158.add($.__views.__alloyId159);
    var __alloyId167 = {};
    Alloy.createController("listTemplate", {
        __parentSymbol: __parentSymbol,
        __itemTemplate: __alloyId167
    });
    $.__views.__alloyId169 = Ti.UI.createListSection({
        id: "__alloyId169"
    });
    var __alloyId171 = [];
    __alloyId171.push($.__views.__alloyId169);
    $.__views.blinds5ListView = Ti.UI.createListView({
        sections: __alloyId171,
        templates: __alloyId167,
        footerView: $.__views.__alloyId158,
        id: "blinds5ListView",
        defaultItemTemplate: "gridTemplate"
    });
    $.__views.__alloyId156.add($.__views.blinds5ListView);
    $.__views.__alloyId172 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        top: "0dp",
        layout: "vertical",
        id: "__alloyId172"
    });
    $.__views.collectionScroll.add($.__views.__alloyId172);
    $.__views.blinds6Container = Ti.UI.createView({
        top: "10dp",
        width: Titanium.UI.FILL,
        height: "20dp",
        id: "blinds6Container"
    });
    $.__views.__alloyId172.add($.__views.blinds6Container);
    $.__views.blinds6NameLbl = Ti.UI.createLabel({
        font: {
            fontSize: "11dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#333333",
        left: "0dp",
        id: "blinds6NameLbl"
    });
    $.__views.blinds6Container.add($.__views.blinds6NameLbl);
    $.__views.blinds6ViewAllContainer = Ti.UI.createView({
        height: Titanium.UI.FILL,
        right: "0dp",
        width: "40%",
        id: "blinds6ViewAllContainer"
    });
    $.__views.blinds6Container.add($.__views.blinds6ViewAllContainer);
    $.__views.blinds6ViewAllLbl = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        font: {
            fontSize: "9dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        right: "20dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        text: "VIEW ALL",
        height: Titanium.UI.FILL,
        id: "blinds6ViewAllLbl"
    });
    $.__views.blinds6ViewAllContainer.add($.__views.blinds6ViewAllLbl);
    $.__views.blinds6rightArrow = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "15dp"
        },
        color: "#e65e48",
        text: Alloy.Globals.icon.leftArrow,
        height: Titanium.UI.FILL,
        right: "0dp",
        width: "20dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        id: "blinds6rightArrow"
    });
    $.__views.blinds6ViewAllContainer.add($.__views.blinds6rightArrow);
    $.__views.__alloyId174 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId174"
    });
    $.__views.blinds6LoadMore = Ti.UI.createView({
        top: "13dp",
        width: Titanium.UI.FILL,
        height: "35dp",
        backgroundColor: "#f4f4f4",
        id: "blinds6LoadMore"
    });
    $.__views.__alloyId174.add($.__views.blinds6LoadMore);
    $.__views.blinds6LoadMoreLbl = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "LOAD MORE",
        id: "blinds6LoadMoreLbl"
    });
    $.__views.blinds6LoadMore.add($.__views.blinds6LoadMoreLbl);
    $.__views.blinds6ActivityIndicator = Ti.UI.createActivityIndicator({
        style: Ti.UI.ActivityIndicatorStyle.PLAIN,
        color: "#333333",
        id: "blinds6ActivityIndicator",
        message: " Loading..."
    });
    $.__views.blinds6LoadMore.add($.__views.blinds6ActivityIndicator);
    $.__views.__alloyId175 = Ti.UI.createView({
        width: "96%",
        backgroundColor: "#e6e6e6",
        height: "1dp",
        top: "20dp",
        id: "__alloyId175"
    });
    $.__views.__alloyId174.add($.__views.__alloyId175);
    var __alloyId183 = {};
    Alloy.createController("listTemplate", {
        __parentSymbol: __parentSymbol,
        __itemTemplate: __alloyId183
    });
    $.__views.__alloyId185 = Ti.UI.createListSection({
        id: "__alloyId185"
    });
    var __alloyId187 = [];
    __alloyId187.push($.__views.__alloyId185);
    $.__views.blinds6ListView = Ti.UI.createListView({
        sections: __alloyId187,
        templates: __alloyId183,
        footerView: $.__views.__alloyId174,
        id: "blinds6ListView",
        defaultItemTemplate: "gridTemplate"
    });
    $.__views.__alloyId172.add($.__views.blinds6ListView);
    $.__views.__alloyId188 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        top: "0dp",
        layout: "vertical",
        id: "__alloyId188"
    });
    $.__views.collectionScroll.add($.__views.__alloyId188);
    $.__views.blinds7Container = Ti.UI.createView({
        top: "10dp",
        width: Titanium.UI.FILL,
        height: "20dp",
        id: "blinds7Container"
    });
    $.__views.__alloyId188.add($.__views.blinds7Container);
    $.__views.blinds7NameLbl = Ti.UI.createLabel({
        font: {
            fontSize: "11dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#333333",
        left: "0dp",
        id: "blinds7NameLbl"
    });
    $.__views.blinds7Container.add($.__views.blinds7NameLbl);
    $.__views.blinds7ViewAllContainer = Ti.UI.createView({
        height: Titanium.UI.FILL,
        right: "0dp",
        width: "40%",
        id: "blinds7ViewAllContainer"
    });
    $.__views.blinds7Container.add($.__views.blinds7ViewAllContainer);
    $.__views.blinds7ViewAllLbl = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        font: {
            fontSize: "9dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        right: "20dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        text: "VIEW ALL",
        height: Titanium.UI.FILL,
        id: "blinds7ViewAllLbl"
    });
    $.__views.blinds7ViewAllContainer.add($.__views.blinds7ViewAllLbl);
    $.__views.blinds7rightArrow = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "15dp"
        },
        color: "#e65e48",
        text: Alloy.Globals.icon.leftArrow,
        height: Titanium.UI.FILL,
        right: "0dp",
        width: "20dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        id: "blinds7rightArrow"
    });
    $.__views.blinds7ViewAllContainer.add($.__views.blinds7rightArrow);
    $.__views.__alloyId190 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId190"
    });
    $.__views.blinds7LoadMore = Ti.UI.createView({
        top: "13dp",
        width: Titanium.UI.FILL,
        height: "35dp",
        backgroundColor: "#f4f4f4",
        id: "blinds7LoadMore"
    });
    $.__views.__alloyId190.add($.__views.blinds7LoadMore);
    $.__views.blinds7LoadMoreLbl = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "LOAD MORE",
        id: "blinds7LoadMoreLbl"
    });
    $.__views.blinds7LoadMore.add($.__views.blinds7LoadMoreLbl);
    $.__views.blinds7ActivityIndicator = Ti.UI.createActivityIndicator({
        style: Ti.UI.ActivityIndicatorStyle.PLAIN,
        color: "#333333",
        id: "blinds7ActivityIndicator",
        message: " Loading..."
    });
    $.__views.blinds7LoadMore.add($.__views.blinds7ActivityIndicator);
    $.__views.__alloyId191 = Ti.UI.createView({
        width: "96%",
        backgroundColor: "#e6e6e6",
        height: "1dp",
        top: "20dp",
        id: "__alloyId191"
    });
    $.__views.__alloyId190.add($.__views.__alloyId191);
    var __alloyId199 = {};
    Alloy.createController("listTemplate", {
        __parentSymbol: __parentSymbol,
        __itemTemplate: __alloyId199
    });
    $.__views.__alloyId201 = Ti.UI.createListSection({
        id: "__alloyId201"
    });
    var __alloyId203 = [];
    __alloyId203.push($.__views.__alloyId201);
    $.__views.blinds7ListView = Ti.UI.createListView({
        sections: __alloyId203,
        templates: __alloyId199,
        footerView: $.__views.__alloyId190,
        id: "blinds7ListView",
        defaultItemTemplate: "gridTemplate"
    });
    $.__views.__alloyId188.add($.__views.blinds7ListView);
    $.__views.__alloyId204 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        top: "0dp",
        layout: "vertical",
        id: "__alloyId204"
    });
    $.__views.collectionScroll.add($.__views.__alloyId204);
    $.__views.blinds8Container = Ti.UI.createView({
        top: "10dp",
        width: Titanium.UI.FILL,
        height: "20dp",
        id: "blinds8Container"
    });
    $.__views.__alloyId204.add($.__views.blinds8Container);
    $.__views.blinds8NameLbl = Ti.UI.createLabel({
        font: {
            fontSize: "11dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#333333",
        left: "0dp",
        id: "blinds8NameLbl"
    });
    $.__views.blinds8Container.add($.__views.blinds8NameLbl);
    $.__views.blinds8ViewAllContainer = Ti.UI.createView({
        height: Titanium.UI.FILL,
        right: "0dp",
        width: "40%",
        id: "blinds8ViewAllContainer"
    });
    $.__views.blinds8Container.add($.__views.blinds8ViewAllContainer);
    $.__views.blinds8ViewAllLbl = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        font: {
            fontSize: "9dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        right: "20dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        text: "VIEW ALL",
        height: Titanium.UI.FILL,
        id: "blinds8ViewAllLbl"
    });
    $.__views.blinds8ViewAllContainer.add($.__views.blinds8ViewAllLbl);
    $.__views.blinds8rightArrow = Ti.UI.createLabel({
        font: {
            fontFamily: "icomoon",
            fontSize: "15dp"
        },
        color: "#e65e48",
        text: Alloy.Globals.icon.leftArrow,
        height: Titanium.UI.FILL,
        right: "0dp",
        width: "20dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        id: "blinds8rightArrow"
    });
    $.__views.blinds8ViewAllContainer.add($.__views.blinds8rightArrow);
    $.__views.__alloyId206 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId206"
    });
    $.__views.blinds8LoadMore = Ti.UI.createView({
        top: "13dp",
        width: Titanium.UI.FILL,
        height: "35dp",
        backgroundColor: "#f4f4f4",
        id: "blinds8LoadMore"
    });
    $.__views.__alloyId206.add($.__views.blinds8LoadMore);
    $.__views.blinds8LoadMoreLbl = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "LOAD MORE",
        id: "blinds8LoadMoreLbl"
    });
    $.__views.blinds8LoadMore.add($.__views.blinds8LoadMoreLbl);
    $.__views.blinds8ActivityIndicator = Ti.UI.createActivityIndicator({
        style: Ti.UI.ActivityIndicatorStyle.PLAIN,
        color: "#333333",
        id: "blinds8ActivityIndicator",
        message: " Loading..."
    });
    $.__views.blinds8LoadMore.add($.__views.blinds8ActivityIndicator);
    $.__views.__alloyId207 = Ti.UI.createView({
        width: "96%",
        backgroundColor: "#e6e6e6",
        height: "1dp",
        top: "20dp",
        id: "__alloyId207"
    });
    $.__views.__alloyId206.add($.__views.__alloyId207);
    var __alloyId215 = {};
    Alloy.createController("listTemplate", {
        __parentSymbol: __parentSymbol,
        __itemTemplate: __alloyId215
    });
    $.__views.__alloyId217 = Ti.UI.createListSection({
        id: "__alloyId217"
    });
    var __alloyId219 = [];
    __alloyId219.push($.__views.__alloyId217);
    $.__views.blinds8ListView = Ti.UI.createListView({
        sections: __alloyId219,
        templates: __alloyId215,
        footerView: $.__views.__alloyId206,
        id: "blinds8ListView",
        defaultItemTemplate: "gridTemplate"
    });
    $.__views.__alloyId204.add($.__views.blinds8ListView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var imageContainer, logoText;
    var blinds1TotalCount, blinds2TotalCount, blinds3TotalCount, blinds4TotalCount, blinds5TotalCount, blinds6TotalCount, blinds7TotalCount, blinds8TotalCount;
    var blinds1LoaddedCount, blinds2LoaddedCount, blinds3LoaddedCount, blinds4LoaddedCount, blinds5LoaddedCount, blinds6LoaddedCount, blinds7LoaddedCount, blinds8LoaddedCount;
    var blinds1Page = 1, blinds2Page = 1, blinds3Page = 1, blinds4Page = 1, blinds5Page = 1, blinds6Page = 1, blinds7Page = 1, blinds8Page = 1;
    var addShortlist = "";
    var gridProductname1, collectionId1, collectionImage1, gridWhereToBuy1, gridCart1, gridShare1, gridWish1, gridProductname2, collectionId2, collectionImage2, gridWhereToBuy2, gridCart2, gridShare2, gridWish2;
    var isSelected_0, isSelected_1, wishIconColor_0, wishIconColor_1;
    var shareUrl1, shareUrl2;
    $.header.init({
        title: "ALL BLINDS",
        passWindow: $.allBlinds
    });
    googleAnalyticsScreen("ALL BLIND");
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
    $.collectionScroll.addEventListener("click", hideOverFlowMenu);
    preprocessForListView = function(rawData, categoryName) {
        var product_sku1 = "", product_sku2 = "";
        return _.map(rawData, function(item) {
            if (item[0]) {
                if (true == item[0].wishlistItem) {
                    isSelected_0 = Alloy.Globals.icon.setShortlist;
                    wishIconColor_0 = "#e65e48";
                } else {
                    isSelected_0 = Alloy.Globals.icon.shortlist;
                    wishIconColor_0 = "#a6a6a6";
                }
                if (item[1]) if (true == item[1].wishlistItem) {
                    isSelected_1 = Alloy.Globals.icon.setShortlist;
                    wishIconColor_1 = "#e65e48";
                } else {
                    isSelected_1 = Alloy.Globals.icon.shortlist;
                    wishIconColor_1 = "#a6a6a6";
                } else isSelected_1 = "";
            }
            if (item[0]) {
                product_sku1 = item[0].product_sku;
                gridProductname1 = item[0].product_name;
                collectionId1 = item[0].product_id;
                collectionImage1 = encodeURI(item[0].image);
                gridWhereToBuy1 = Alloy.Globals.icon.currency + item[0].product_price;
                gridShare1 = Alloy.Globals.icon.share;
                gridWish1 = isSelected_0;
                gridCart1 = "";
                shareUrl1 = item[0].product_url;
            } else {
                product_sku1 = "";
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
                product_sku2 = item[1].product_sku;
                gridProductname2 = item[1].product_name;
                collectionId2 = item[1].product_id;
                collectionImage2 = encodeURI(item[1].image);
                gridWhereToBuy2 = Alloy.Globals.icon.currency + item[1].product_price;
                gridShare2 = Alloy.Globals.icon.share;
                gridWish2 = isSelected_1;
                gridCart2 = "";
                imageContainer = "#eeece7";
                shareUrl2 = item[1].product_url;
                logoText = "";
            } else {
                product_sku2 = "";
                gridProductname2 = "";
                collectionId2 = "";
                collectionImage2 = "";
                gridWhereToBuy2 = "";
                gridCart2 = "";
                gridShare2 = "";
                gridWish2 = "";
                imageContainer = "#ffffff";
                logoText = "";
                shareUrl2 = "";
            }
            return {
                properties: {},
                template: "gridTemplate",
                gridProductname1: {
                    text: gridProductname1.toUpperCase(),
                    collectionId: collectionId1,
                    category: categoryName
                },
                gridProductname2: {
                    text: gridProductname2.toUpperCase(),
                    collectionId: collectionId2,
                    category: categoryName
                },
                gridCart1: {
                    text: gridCart1,
                    collectionId: collectionId1,
                    category: categoryName,
                    visible: "" != gridCart1
                },
                gridCart2: {
                    text: gridCart2,
                    collectionId: collectionId2,
                    category: categoryName,
                    visible: "" != gridCart1
                },
                gridShare1: {
                    collectionId: collectionId1,
                    text: gridShare1,
                    shareUrl: shareUrl1,
                    category: categoryName
                },
                gridShare2: {
                    collectionId: collectionId2,
                    text: gridShare2,
                    shareUrl: shareUrl2,
                    category: categoryName
                },
                gridWish1: {
                    collectionId: collectionId1,
                    iconValue: "",
                    text: gridWish1,
                    color: wishIconColor_0,
                    collectionName: gridProductname1,
                    category: categoryName,
                    product_sku: product_sku1
                },
                gridWish2: {
                    collectionId: collectionId2,
                    iconValue: "",
                    text: gridWish2,
                    color: wishIconColor_1,
                    collectionName: gridProductname2,
                    category: categoryName,
                    product_sku: product_sku2
                },
                gridProductImage1: {
                    image: collectionImage1,
                    collectionId: collectionId1,
                    category: categoryName
                },
                gridProductImage2: {
                    image: collectionImage2,
                    collectionId: collectionId2,
                    category: categoryName
                },
                gridWhereToBuy1: {
                    text: gridWhereToBuy1,
                    collectionId: collectionId1,
                    category: categoryName
                },
                gridWhereToBuy2: {
                    text: gridWhereToBuy2,
                    collectionId: collectionId2,
                    category: categoryName
                },
                productSize1: {
                    collectionId: collectionId1,
                    text: "",
                    height: "0",
                    category: categoryName
                },
                productSize2: {
                    collectionId: collectionId2,
                    text: "",
                    height: "0",
                    category: categoryName
                },
                imageContainer: {
                    backgroundColor: imageContainer,
                    category: categoryName
                },
                gridLogo: {
                    text: logoText,
                    category: categoryName
                }
            };
        });
    };
    var blinds1TotalCount = [], blinds1LoaddedCount = [];
    getAllCollection();
    $.blinds1LoadMore.addEventListener("click", blinds1DataFn);
    $.blinds2LoadMore.addEventListener("click", blinds2DataFn);
    $.blinds3LoadMore.addEventListener("click", blinds3DataFn);
    $.blinds4LoadMore.addEventListener("click", blinds4DataFn);
    $.blinds5LoadMore.addEventListener("click", blinds5DataFn);
    $.blinds6LoadMore.addEventListener("click", blinds6DataFn);
    $.blinds7LoadMore.addEventListener("click", blinds7DataFn);
    $.blinds1ViewAllContainer.addEventListener("click", categoryViewAll);
    $.blinds2ViewAllContainer.addEventListener("click", categoryViewAll);
    $.blinds3ViewAllContainer.addEventListener("click", categoryViewAll);
    $.blinds4ViewAllContainer.addEventListener("click", categoryViewAll);
    $.blinds5ViewAllContainer.addEventListener("click", categoryViewAll);
    $.blinds6ViewAllContainer.addEventListener("click", categoryViewAll);
    $.blinds7ViewAllContainer.addEventListener("click", categoryViewAll);
    $.blinds8ViewAllContainer.addEventListener("click", categoryViewAll);
    $.blinds1ListView.addEventListener("itemclick", addToShortlist);
    $.blinds2ListView.addEventListener("itemclick", addToShortlist);
    $.blinds3ListView.addEventListener("itemclick", addToShortlist);
    $.blinds4ListView.addEventListener("itemclick", addToShortlist);
    $.blinds5ListView.addEventListener("itemclick", addToShortlist);
    $.blinds6ListView.addEventListener("itemclick", addToShortlist);
    $.blinds7ListView.addEventListener("itemclick", addToShortlist);
    $.blinds8ListView.addEventListener("itemclick", addToShortlist);
    __defers["$.__views.allBlinds!android:back!goToBack"] && $.addListener($.__views.allBlinds, "android:back", goToBack);
    __defers["$.__views.allBlinds!focus!updateCount"] && $.addListener($.__views.allBlinds, "focus", updateCount);
    __defers["$.__views.allBlinds!close!destroyWindow"] && $.addListener($.__views.allBlinds, "close", destroyWindow);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;