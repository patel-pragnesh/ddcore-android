// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.header.init({
    title : "ALL BLINDS",
    passWindow : $.allBlinds,
});

init();

function init() {

    _getAllCollection();
    //  _allCollectionSuccessCallback();
}

function _getAllCollection() {
    showLoader($.allBlinds);
    var url = Alloy.Globals.commonUrl.allblinds;

    var data = {};

    var requestParams = JSON.stringify(data);

    Alloy.Globals.webServiceCall(url, requestParams, _allCollectionSuccessCallback, _allCollectionErrorCallback, "POST", $.allBlinds);
}

function _allCollectionSuccessCallback(response) {

    //var response = {"status":true,"message":"Data Retrieved Successfully","data":{"product_data":[{"categoryName":"Roman","categoryId":"100","product_data":[{"product_id":"12240","product_sku":"KAR006-200B_401","product_name":"Karvina Taupe","product_url":"http://dev.ddecor.com/karvina-taupe-kar006-200b-401","product_price":"0.00/sq.mtr.","wishlistItem":true,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"796","product_sku":"PAL004-280B_401","product_name":"Palma Beige","product_url":"http://dev.ddecor.com/palma-beige-pal004-280b-401","product_price":"0.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"12418","product_sku":"LUG003-182B_401","product_name":"Lugano Beige","product_url":"http://dev.ddecor.com/lugano-beige-lug003-182b-401","product_price":"0.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"11288","product_sku":"BEX003-240B_401","product_name":"Bexley Mocha","product_url":"http://dev.ddecor.com/bexley-mocha-bex003-240b-401","product_price":"0.00/sq.mtr.","wishlistItem":true,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"12426","product_sku":"LUG001-182B_401","product_name":"Lugano Chocolate","product_url":"http://dev.ddecor.com/lugano-chocolate-lug001-182b-401","product_price":"0.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"771","product_sku":"OLY001-210B_401","product_name":"Olympia Grass","product_url":"http://dev.ddecor.com/olympia-grass-oly001-210b-401","product_price":"0.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"}],"total_count":6},{"categoryName":"Duplex","categoryId":"101","product_data":[{"product_id":"11983","product_sku":"FRI001-280B_449","product_name":"Frida Ice","product_url":"http://dev.ddecor.com/frida-ice-fri001-280b-449","product_price":"4,900.00/sq.mtr.","wishlistItem":true,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"6","product_sku":"ABR001-280B_449","product_name":"Abril White","product_url":"http://dev.ddecor.com/abril-white-abr001-280b-449","product_price":"6,200.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"12349","product_sku":"LEX001-280B_449","product_name":"Lexie Willow","product_url":"http://dev.ddecor.com/lexie-willow-lex001-280b-449","product_price":"7,750.00/sq.mtr.","wishlistItem":true,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"11791","product_sku":"ERI001-280B_449","product_name":"Erika White","product_url":"http://dev.ddecor.com/erika-white-eri001-280b-449","product_price":"7,750.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"12345","product_sku":"LEX002-280B_449","product_name":"Lexie Dove","product_url":"http://dev.ddecor.com/lexie-dove-lex002-280b-449","product_price":"7,750.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"1186","product_sku":"REA002-280B_449","product_name":"Reagan Ivory","product_url":"http://dev.ddecor.com/reagan-ivory-rea002-280b-449","product_price":"7,750.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"}],"total_count":82},{"categoryName":"Romex","categoryId":"102","product_data":[{"product_id":"11675","product_sku":"CHE025-280B_466","product_name":"Chelsea White","product_url":"http://dev.ddecor.com/chelsea-white-che025-280b-466","product_price":"4,750.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_40293.jpg"},{"product_id":"1589","product_sku":"TUS001-280B_466","product_name":"Tuscany Frost","product_url":"http://dev.ddecor.com/tuscany-frost-tus001-280b-466","product_price":"4,750.00/sq.mtr.","wishlistItem":true,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_32012.jpg"},{"product_id":"12314","product_sku":"LAT001-280B_466","product_name":"Latina Silk","product_url":"http://dev.ddecor.com/latina-silk-lat001-280b-466","product_price":"4,750.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_40533.jpg"},{"product_id":"11865","product_sku":"FER001-280B_466","product_name":"Ferrara Cotton","product_url":"http://dev.ddecor.com/ferrara-cotton-fer001-280b-466","product_price":"4,750.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_40351.jpg"},{"product_id":"11591","product_sku":"CHE001-280B_466","product_name":"Chelsea Ice","product_url":"http://dev.ddecor.com/chelsea-ice-che001-280b-466","product_price":"4,750.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_40249.jpg"},{"product_id":"830","product_sku":"PAL001-280B_466","product_name":"Palma Ice","product_url":"http://dev.ddecor.com/palma-ice-pal001-280b-466","product_price":"4,750.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_31712.jpg"}],"total_count":342},{"categoryName":"Vertical","categoryId":"103","product_data":[{"product_id":"11864","product_sku":"FER001V-8.9_467","product_name":"Ferrara Cotton","product_url":"http://dev.ddecor.com/ferrara-cotton-fer001v-8-9-467","product_price":"1,910.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"829","product_sku":"PAL001V-8.9_467","product_name":"Palma Ice","product_url":"http://dev.ddecor.com/palma-ice-pal001v-8-9-467","product_price":"1,910.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"11595","product_sku":"CHE001V-8.9_467","product_name":"Chelsea Ice","product_url":"http://dev.ddecor.com/chelsea-ice-che001v-8-9-467","product_price":"1,910.00/sq.mtr.","wishlistItem":true,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_40252.jpg"},{"product_id":"12313","product_sku":"LAT001V-8.9_467","product_name":"Latina Silk","product_url":"http://dev.ddecor.com/latina-silk-lat001v-8-9-467","product_price":"1,910.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"11682","product_sku":"CHE025V-8.9_467","product_name":"Chelsea White","product_url":"http://dev.ddecor.com/chelsea-white-che025v-8-9-467","product_price":"1,910.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_40296.jpg"},{"product_id":"1588","product_sku":"TUS001V-8.9_467","product_name":"Tuscany Frost","product_url":"http://dev.ddecor.com/tuscany-frost-tus001v-8-9-467","product_price":"1,910.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"}],"total_count":210},{"categoryName":"Roller","categoryId":"104","product_data":[{"product_id":"12339","product_sku":"LAT011-235B_487","product_name":"Latvia Silk","product_url":"http://dev.ddecor.com/latvia-silk-lat011-235b-487","product_price":"1,910.00/sq.mtr.","wishlistItem":true,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_40543.jpg"},{"product_id":"11677","product_sku":"CHE025-280B_487","product_name":"Chelsea White","product_url":"http://dev.ddecor.com/chelsea-white-che025-280b-487","product_price":"1,910.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"1591","product_sku":"TUS001-280B_487","product_name":"Tuscany Frost","product_url":"http://dev.ddecor.com/tuscany-frost-tus001-280b-487","product_price":"1,910.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"12316","product_sku":"LAT001-280B_487","product_name":"Latina Silk","product_url":"http://dev.ddecor.com/latina-silk-lat001-280b-487","product_price":"1,910.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"832","product_sku":"PAL001-280B_487","product_name":"Palma Ice","product_url":"http://dev.ddecor.com/palma-ice-pal001-280b-487","product_price":"1,910.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"11867","product_sku":"FER001-280B_487","product_name":"Ferrara Cotton","product_url":"http://dev.ddecor.com/ferrara-cotton-fer001-280b-487","product_price":"1,910.00/sq.mtr.","wishlistItem":true,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"}],"total_count":672},{"categoryName":"Sheer Horizon","categoryId":"105","product_data":[{"product_id":"11742","product_sku":"DON001-300B_495","product_name":"Donna Ice","product_url":"http://dev.ddecor.com/donna-ice-don001-300b-495","product_price":"9,200.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"1206","product_sku":"REI001-280B_495","product_name":"Reina Frost","product_url":"http://dev.ddecor.com/reina-frost-rei001-280b-495","product_price":"11,360.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"631","product_sku":"NOE001-280B_495","product_name":"Noelle Marble","product_url":"http://dev.ddecor.com/noelle-marble-noe001-280b-495","product_price":"11,890.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"419","product_sku":"MOR001-280B_495","product_name":"Moriah Silk","product_url":"http://dev.ddecor.com/moriah-silk-mor001-280b-495","product_price":"11,890.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"1346","product_sku":"SAS001-280B_495","product_name":"Sasha Winter","product_url":"http://dev.ddecor.com/sasha-winter-sas001-280b-495","product_price":"12,960.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"11743","product_sku":"DON002-300B_495","product_name":"Donna Ivory","product_url":"http://dev.ddecor.com/donna-ivory-don002-300b-495","product_price":"9,200.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"}],"total_count":28},{"categoryName":"Panel","categoryId":"106","product_data":[{"product_id":"11869","product_sku":"FER001-280B_503","product_name":"Ferrara Cotton","product_url":"http://dev.ddecor.com/ferrara-cotton-fer001-280b-503","product_price":"3,440.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"1593","product_sku":"TUS001-280B_503","product_name":"Tuscany Frost","product_url":"http://dev.ddecor.com/tuscany-frost-tus001-280b-503","product_price":"3,440.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"12341","product_sku":"LAT011-235B_503","product_name":"Latvia Silk","product_url":"http://dev.ddecor.com/latvia-silk-lat011-235b-503","product_price":"3,440.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"11679","product_sku":"CHE025-280B_503","product_name":"Chelsea White","product_url":"http://dev.ddecor.com/chelsea-white-che025-280b-503","product_price":"3,440.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"12318","product_sku":"LAT001-280B_503","product_name":"Latina Silk","product_url":"http://dev.ddecor.com/latina-silk-lat001-280b-503","product_price":"3,440.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"834","product_sku":"PAL001-280B_503","product_name":"Palma Ice","product_url":"http://dev.ddecor.com/palma-ice-pal001-280b-503","product_price":"3,440.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"}],"total_count":670},{"categoryName":"Cladded","categoryId":"107","product_data":[{"product_id":"12342","product_sku":"LAT011-235B_505","product_name":"Latvia Silk","product_url":"http://dev.ddecor.com/latvia-silk-lat011-235b-505","product_price":"8,050.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"11680","product_sku":"CHE025-280B_505","product_name":"Chelsea White","product_url":"http://dev.ddecor.com/chelsea-white-che025-280b-505","product_price":"8,050.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"11871","product_sku":"FER001-280B_513","product_name":"Ferrara Cotton","product_url":"http://dev.ddecor.com/ferrara-cotton-fer001-280b-513","product_price":"8,050.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"12319","product_sku":"LAT001-280B_505","product_name":"Latina Silk","product_url":"http://dev.ddecor.com/latina-silk-lat001-280b-505","product_price":"8,050.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"1595","product_sku":"TUS001-280B_513","product_name":"Tuscany Frost","product_url":"http://dev.ddecor.com/tuscany-frost-tus001-280b-513","product_price":"8,050.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"835","product_sku":"PAL001-280B_505","product_name":"Palma Ice","product_url":"http://dev.ddecor.com/palma-ice-pal001-280b-505","product_price":"8,050.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"}],"total_count":671}]}};

    //var response =   {"status":true,"message":"Data Retrieved Successfully","data":{"product_data":[{"categoryName":"Roman","categoryId":"100","product_data":[{"product_id":"12240","product_sku":"KAR006-200B_401","product_name":"Karvina Taupe","product_url":"http://dev.ddecor.com/karvina-taupe-kar006-200b-401","product_price":"0.00/sq.mtr.","wishlistItem":true,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"796","product_sku":"PAL004-280B_401","product_name":"Palma Beige","product_url":"http://dev.ddecor.com/palma-beige-pal004-280b-401","product_price":"0.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"12418","product_sku":"LUG003-182B_401","product_name":"Lugano Beige","product_url":"http://dev.ddecor.com/lugano-beige-lug003-182b-401","product_price":"0.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"11288","product_sku":"BEX003-240B_401","product_name":"Bexley Mocha","product_url":"http://dev.ddecor.com/bexley-mocha-bex003-240b-401","product_price":"0.00/sq.mtr.","wishlistItem":true,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"12426","product_sku":"LUG001-182B_401","product_name":"Lugano Chocolate","product_url":"http://dev.ddecor.com/lugano-chocolate-lug001-182b-401","product_price":"0.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"771","product_sku":"OLY001-210B_401","product_name":"Olympia Grass","product_url":"http://dev.ddecor.com/olympia-grass-oly001-210b-401","product_price":"0.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"}],"total_count":6},{"categoryName":"Duplex","categoryId":"101","product_data":[{"product_id":"11983","product_sku":"FRI001-280B_449","product_name":"Frida Ice","product_url":"http://dev.ddecor.com/frida-ice-fri001-280b-449","product_price":"4,900.00/sq.mtr.","wishlistItem":true,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"6","product_sku":"ABR001-280B_449","product_name":"Abril White","product_url":"http://dev.ddecor.com/abril-white-abr001-280b-449","product_price":"6,200.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"12349","product_sku":"LEX001-280B_449","product_name":"Lexie Willow","product_url":"http://dev.ddecor.com/lexie-willow-lex001-280b-449","product_price":"7,750.00/sq.mtr.","wishlistItem":true,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"11791","product_sku":"ERI001-280B_449","product_name":"Erika White","product_url":"http://dev.ddecor.com/erika-white-eri001-280b-449","product_price":"7,750.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"12345","product_sku":"LEX002-280B_449","product_name":"Lexie Dove","product_url":"http://dev.ddecor.com/lexie-dove-lex002-280b-449","product_price":"7,750.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"1186","product_sku":"REA002-280B_449","product_name":"Reagan Ivory","product_url":"http://dev.ddecor.com/reagan-ivory-rea002-280b-449","product_price":"7,750.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"}],"total_count":82},{"categoryName":"Romex","categoryId":"102","product_data":[{"product_id":"11675","product_sku":"CHE025-280B_466","product_name":"Chelsea White","product_url":"http://dev.ddecor.com/chelsea-white-che025-280b-466","product_price":"4,750.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_40293.jpg"},{"product_id":"1589","product_sku":"TUS001-280B_466","product_name":"Tuscany Frost","product_url":"http://dev.ddecor.com/tuscany-frost-tus001-280b-466","product_price":"4,750.00/sq.mtr.","wishlistItem":true,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_32012.jpg"},{"product_id":"12314","product_sku":"LAT001-280B_466","product_name":"Latina Silk","product_url":"http://dev.ddecor.com/latina-silk-lat001-280b-466","product_price":"4,750.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_40533.jpg"},{"product_id":"11865","product_sku":"FER001-280B_466","product_name":"Ferrara Cotton","product_url":"http://dev.ddecor.com/ferrara-cotton-fer001-280b-466","product_price":"4,750.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_40351.jpg"},{"product_id":"11591","product_sku":"CHE001-280B_466","product_name":"Chelsea Ice","product_url":"http://dev.ddecor.com/chelsea-ice-che001-280b-466","product_price":"4,750.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_40249.jpg"},{"product_id":"830","product_sku":"PAL001-280B_466","product_name":"Palma Ice","product_url":"http://dev.ddecor.com/palma-ice-pal001-280b-466","product_price":"4,750.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_31712.jpg"}],"total_count":342},{"categoryName":"Vertical","categoryId":"103","product_data":[{"product_id":"11864","product_sku":"FER001V-8.9_467","product_name":"Ferrara Cotton","product_url":"http://dev.ddecor.com/ferrara-cotton-fer001v-8-9-467","product_price":"1,910.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"829","product_sku":"PAL001V-8.9_467","product_name":"Palma Ice","product_url":"http://dev.ddecor.com/palma-ice-pal001v-8-9-467","product_price":"1,910.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"11595","product_sku":"CHE001V-8.9_467","product_name":"Chelsea Ice","product_url":"http://dev.ddecor.com/chelsea-ice-che001v-8-9-467","product_price":"1,910.00/sq.mtr.","wishlistItem":true,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_40252.jpg"},{"product_id":"12313","product_sku":"LAT001V-8.9_467","product_name":"Latina Silk","product_url":"http://dev.ddecor.com/latina-silk-lat001v-8-9-467","product_price":"1,910.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"11682","product_sku":"CHE025V-8.9_467","product_name":"Chelsea White","product_url":"http://dev.ddecor.com/chelsea-white-che025v-8-9-467","product_price":"1,910.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_40296.jpg"},{"product_id":"1588","product_sku":"TUS001V-8.9_467","product_name":"Tuscany Frost","product_url":"http://dev.ddecor.com/tuscany-frost-tus001v-8-9-467","product_price":"1,910.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"}],"total_count":210},{"categoryName":"Roller","categoryId":"104","product_data":[{"product_id":"12339","product_sku":"LAT011-235B_487","product_name":"Latvia Silk","product_url":"http://dev.ddecor.com/latvia-silk-lat011-235b-487","product_price":"1,910.00/sq.mtr.","wishlistItem":true,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_40543.jpg"},{"product_id":"11677","product_sku":"CHE025-280B_487","product_name":"Chelsea White","product_url":"http://dev.ddecor.com/chelsea-white-che025-280b-487","product_price":"1,910.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"1591","product_sku":"TUS001-280B_487","product_name":"Tuscany Frost","product_url":"http://dev.ddecor.com/tuscany-frost-tus001-280b-487","product_price":"1,910.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"12316","product_sku":"LAT001-280B_487","product_name":"Latina Silk","product_url":"http://dev.ddecor.com/latina-silk-lat001-280b-487","product_price":"1,910.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"832","product_sku":"PAL001-280B_487","product_name":"Palma Ice","product_url":"http://dev.ddecor.com/palma-ice-pal001-280b-487","product_price":"1,910.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"11867","product_sku":"FER001-280B_487","product_name":"Ferrara Cotton","product_url":"http://dev.ddecor.com/ferrara-cotton-fer001-280b-487","product_price":"1,910.00/sq.mtr.","wishlistItem":true,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"}],"total_count":672},{"categoryName":"Sheer Horizon","categoryId":"105","product_data":[{"product_id":"11742","product_sku":"DON001-300B_495","product_name":"Donna Ice","product_url":"http://dev.ddecor.com/donna-ice-don001-300b-495","product_price":"9,200.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"1206","product_sku":"REI001-280B_495","product_name":"Reina Frost","product_url":"http://dev.ddecor.com/reina-frost-rei001-280b-495","product_price":"11,360.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"631","product_sku":"NOE001-280B_495","product_name":"Noelle Marble","product_url":"http://dev.ddecor.com/noelle-marble-noe001-280b-495","product_price":"11,890.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"419","product_sku":"MOR001-280B_495","product_name":"Moriah Silk","product_url":"http://dev.ddecor.com/moriah-silk-mor001-280b-495","product_price":"11,890.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"1346","product_sku":"SAS001-280B_495","product_name":"Sasha Winter","product_url":"http://dev.ddecor.com/sasha-winter-sas001-280b-495","product_price":"12,960.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"11743","product_sku":"DON002-300B_495","product_name":"Donna Ivory","product_url":"http://dev.ddecor.com/donna-ivory-don002-300b-495","product_price":"9,200.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"}],"total_count":28},{"categoryName":"Panel","categoryId":"106","product_data":[],"total_count":670},{"categoryName":"Cladded","categoryId":"107","product_data":[{"product_id":"12342","product_sku":"LAT011-235B_505","product_name":"Latvia Silk","product_url":"http://dev.ddecor.com/latvia-silk-lat011-235b-505","product_price":"8,050.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"11680","product_sku":"CHE025-280B_505","product_name":"Chelsea White","product_url":"http://dev.ddecor.com/chelsea-white-che025-280b-505","product_price":"8,050.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"11871","product_sku":"FER001-280B_513","product_name":"Ferrara Cotton","product_url":"http://dev.ddecor.com/ferrara-cotton-fer001-280b-513","product_price":"8,050.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"12319","product_sku":"LAT001-280B_505","product_name":"Latina Silk","product_url":"http://dev.ddecor.com/latina-silk-lat001-280b-505","product_price":"8,050.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"1595","product_sku":"TUS001-280B_513","product_name":"Tuscany Frost","product_url":"http://dev.ddecor.com/tuscany-frost-tus001-280b-513","product_price":"8,050.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"},{"product_id":"835","product_sku":"PAL001-280B_505","product_name":"Palma Ice","product_url":"http://dev.ddecor.com/palma-ice-pal001-280b-505","product_price":"8,050.00/sq.mtr.","wishlistItem":false,"image":"http://dev.ddecor.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noimage_01.jpg"}],"total_count":671}]}};

    /*
     for (var i = 0; i < response.data.product_data.length; i++) {
     //testTemp[i] = Alloy.createController("testBlindTemplate").getView();
     // $.collectionScroll.add( testTemp[i] );

     var blindTemplate = Alloy.createController("blindTemplate", {
     response : response.data.product_data[i],
     mainWindow : $.allBlinds
     }).getView();
     $.collectionScroll.add(blindTemplate);
     }

     hideLoader();
     */

    _.each(response.data.product_data, function(value, k) {

        // Ti.API.info('value--->' + value.product_data.length);

        if (value.product_data.length == 0) {
            // $.blinds1NameLbl.setText((value.categoryName).toUpperCase());
            var blindEmpty = Alloy.createController("blindEmpty", {
                //response : response.data.product_data[i],
                response : value,
                mainWindow : $.allBlinds
            }).getView();
            $.collectionScroll.add(blindEmpty);
            blindEmpty = null;

        } else {

            //$.collectionScroll.remove($.mainContainer);

            var blindTemplate = Alloy.createController("blindTemplate", {
                //response : response.data.product_data[i],
                response : value,
                mainWindow : $.allBlinds
            }).getView();
            $.collectionScroll.add(blindTemplate);
            blindTemplate = null;
        }

    });

    setTimeout(function() {

        hideLoader();

    }, 300);
    

}

function _allCollectionErrorCallback(response) {
    hideLoader();
    showAlert($.allBlinds, response.message);
}

function goToBack() {

    Alloy.Globals.popWindowInNav();
    $.allBlinds.close();

}

function destroyWindow(e) {

    $.allBlinds.remove($.collectionScroll);
    $.collectionScroll.removeAllChildren();

    $.removeListener();
    $.destroy();

}

function updateCount() {
    $.header.updateCartCount();
}
