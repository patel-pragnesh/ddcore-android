// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
  
  var response = args.response;
  var categoryName = (response.categoryName).toUpperCase();
    $.blinds1NameLbl.setText(categoryName);