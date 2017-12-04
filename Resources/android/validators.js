var validators = {};

exports.validators = function() {
    return validators;
};

validators.RequiredFieldValidatorDropDown = function(pck) {
    var isValid = false;
    -1 === pck.getSelectedRow(0).title.toString().indexOf("Select") && (isValid = true);
    return isValid;
};

validators.RequiredFieldValidatorTextBox = function(txt) {
    var isValid = false;
    null !== txt.value && void 0 !== txt.value && "" !== txt.value.trim() && (isValid = true);
    return isValid;
};

validators.RegularExpressionName = function(txt) {
    var isValid = false;
    var reg = /^[A-Za-z ]+$/g;
    "" !== txt.value && null !== txt.value ? "" !== txt.value.trim() && (isValid = txt.value.length >= 2 && txt.value.length <= 30 ? !!txt.value.match(reg) : false) : isValid = false;
    return isValid;
};

validators.RegularExpressionNumber = function(txt) {
    var isValid = false;
    true !== isNaN(txt.value) && null !== txt.value && (isValid = true);
    return isValid;
};

validators.RegularExpressionMobileNumber = function(txt) {
    var isValid = false;
    false === isNaN(txt.value) && null !== txt.value && 10 === txt.value.length && "" !== txt.value.trim() && (isValid = true);
    return isValid;
};

validators.RegularExpressionNumberPin = function(txt) {
    var isValid = false;
    var val = txt.value;
    isValid = !("" === val || isNaN(val) || val.length < 6);
    return isValid;
};

validators.CheckForSpecialChars = function(str) {
    var iChars = "!@#$%^&*()+=-[]\\';,./{}|\":<>?";
    for (var i = 0; i < str.length; i++) if (-1 != iChars.indexOf(str.charAt(i))) return false;
    return true;
};

validators.RegularExpressionWebSideName = function(str) {
    var pattern = new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$", "i");
    return !!pattern.test(str);
};

validators.RegularExpressionEmail = function(txt) {
    var isValid = false;
    var reg = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    isValid = "" !== txt.value && null !== txt.value ? false !== reg.test(txt.value) : false;
    return isValid;
};

validators.RegularExpressionEmailMultiple = function(txt) {
    var isValid = false;
    var reg = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    isValid = "" !== txt && null !== txt ? false !== reg.test(txt) : false;
    return isValid;
};

validators.RegularExpressionNewsletterEmail = function(txt) {
    var isValid = false;
    var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    "" !== txt.value.trim() && (isValid = false !== reg.test(txt.value));
    return isValid;
};

validators.RegularExpressionUserName = function(txt) {
    var isValid = false;
    var reg = /^[A-Za-z0-9 ]+$/g;
    isValid = "" !== txt.value && "" !== txt.value.trim() ? false != reg.test(txt.value) : false;
    return isValid;
};

validators.RegularExpressionPassword = function(txt) {
    var isValid = false;
    var str = txt.value.toString().trim();
    var letter = /[a-zA-Z]/;
    var number = /[0-9]/;
    if (str.length >= 7) {
        var _valid = number.test(str) && letter.test(str);
        isValid = false != _valid;
    } else isValid = false;
    return isValid;
};

validators.RegularExpressionPasswordLength = function(txt) {
    var isValid = false;
    null !== txt.value && txt.value.length >= 6 && "" !== txt.value.trim() && (isValid = true);
    return isValid;
};

validators.RegularExpressionURL = function(txt) {
    var isValid = false;
    var reg = /^(ftp|http|https):\/\/[^ "]+$/;
    isValid = "" !== txt.value && "" !== txt.value.trim() ? false != reg.test(txt.value) : false;
    return isValid;
};

validators.RegularExpressionEmail_Mobile = function(txt) {
    var isValid = false;
    var reg = /^([_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,5}))|(\d+$)$/;
    isValid = "" !== txt.value && null !== txt.value ? false !== reg.test(txt.value) : false;
    return isValid;
};