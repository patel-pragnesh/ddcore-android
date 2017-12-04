var validators = {};
exports.validators = function() {
	return validators;
};

validators.RequiredFieldValidatorDropDown = function(pck) {
	var isValid = false;
	if (pck.getSelectedRow(0).title.toString().indexOf('Select') === -1) {
		isValid = true;
	}

	return isValid;
};

validators.RequiredFieldValidatorTextBox = function(txt) {
	var isValid = false;
	if (txt.value !== null && txt.value !== undefined) {
		if (txt.value.trim() !== '') {
			isValid = true;
		}
	}
	return isValid;
};

validators.RegularExpressionName = function(txt) {
	var isValid = false;
	var reg = /^[A-Za-z ]+$/g;
	//var reg = /^([A-Za-z ]+) {2,20}$/;

	if (txt.value !== '' && txt.value !== null) {
		if (txt.value.trim() !== '') {

			if (txt.value.length >= 2 && txt.value.length <= 30) {

				if (!txt.value.match(reg)) {
					isValid = false;

				} else {
					isValid = true;
				}

			} else {
				isValid = false;

			}

		}
	} else {

		isValid = false;
	}
	return isValid;
};

validators.RegularExpressionNumber = function(txt) {

	var isValid = false;

	if (isNaN(txt.value) !== true && txt.value !== null) {

		isValid = true;
	}

	return isValid;
};

validators.RegularExpressionMobileNumber = function(txt) {
	var isValid = false;

	if (isNaN(txt.value) === false && txt.value !== null) {
		if (txt.value.length === 10) {
			if (txt.value.trim() !== '') {
				isValid = true;
			}
		}
	}

	return isValid;
};

validators.RegularExpressionNumberPin = function(txt) {
	var isValid = false;
	var val = txt.value;

	if (val === '' || isNaN(val) || val.length < 6)
		isValid = false;
	else
		isValid = true;

	return isValid;
};

validators.CheckForSpecialChars = function(str) {
	var iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?";
	for (var i = 0; i < str.length; i++) {
		if (iChars.indexOf(str.charAt(i)) != -1) {

			return false;
		}
	}
	return true;
};

validators.RegularExpressionWebSideName = function(str) {
	var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
	'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
	'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
	'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
	'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
	'(\\#[-a-z\\d_]*)?$', 'i');
	// fragment locater

	if (!pattern.test(str)) {
		return false;
	} else {
		return true;
	}
};

validators.RegularExpressionEmail = function(txt) {
	var isValid = false;
	//var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	var reg = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

	if (txt.value !== '' && txt.value !== null) {

		if (reg.test(txt.value) === false) {
			isValid = false;

		} else {
			isValid = true;
		}
	} else {
		isValid = false;
	}
	return isValid;
};

validators.RegularExpressionEmailMultiple = function(txt) {
	var isValid = false;
	//var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	var reg = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

	if (txt !== '' && txt !== null) {

		if (reg.test(txt) === false) {
			isValid = false;

		} else {
			isValid = true;
		}
	} else {
		isValid = false;
	}
	return isValid;
};

validators.RegularExpressionNewsletterEmail = function(txt) {
	var isValid = false;
	var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	if (txt.value.trim() !== '') {
		if (reg.test(txt.value) === false) {
			isValid = false;
		} else {
			isValid = true;
		}
	}
	return isValid;
};

validators.RegularExpressionUserName = function(txt) {
	var isValid = false;
	var reg = /^[A-Za-z0-9 ]+$/g;

	if (txt.value !== '' && txt.value.trim() !== '') {
		if (reg.test(txt.value) == false) {
			isValid = false;
		} else {
			isValid = true;
		}
	} else {
		isValid = false;
	}
	return isValid;
};

validators.RegularExpressionPassword = function(txt) {

	/*
	 var isValid = false;
	 var str = txt.value;

	 if (str.length < 7) {

	 isValid = false;
	 } else if (str.length > 50) {

	 isValid = false;
	 } else if (str.search(/\d/) == -1) {

	 isValid = false;
	 } else if (str.search(/[a-zA-Z]/) == -1) {

	 isValid = false;
	 } else if (str.search(/[^a-zA-Z0-9]/) != -1) {

	 isValid = false;
	 } else {
	 isValid = true;

	 }
	 */
	/*TODO need to make changes here*/
	var isValid = false;

	var str = txt.value.toString().trim();
	// var reg = /^([a-z0-9])|(?=.*[_$@.])+$/i;

	var letter = /[a-zA-Z]/;
	var number = /[0-9]/;
	//var valid = number.test(str) && letter.test(str);

	if (str.length >= 7) {
		// isValid = false;
		var _valid = number.test(str) && letter.test(str);
		// if (reg.test(str) == false) {
		if (_valid == false) {
			isValid = false;
		} else {
			isValid = true;
		}
	} else {
		isValid = false;
	}

	return isValid;
};

validators.RegularExpressionPasswordLength = function(txt) {
	var isValid = false;
	//Ti.API.info(JSON.stringify(txt));
	if (txt.value !== null) {
		if (txt.value.length >= 6) {
			if (txt.value.trim() !== '') {
				isValid = true;
			}
		}
	}
	return isValid;
};

validators.RegularExpressionURL = function(txt) {
	var isValid = false;
	var reg = /^(ftp|http|https):\/\/[^ "]+$/;

	if (txt.value !== '' && txt.value.trim() !== '') {
		if (reg.test(txt.value) == false) {
			isValid = false;
		} else {
			isValid = true;
		}
	} else {
		isValid = false;
	}
	return isValid;

};

validators.RegularExpressionEmail_Mobile = function(txt) {
	var isValid = false;

	//    var reg = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
	//var reg = /^([_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,5}))|(\d+$)$/;
	var reg = /^([_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,5}))|(\d+$)$/;

	if (txt.value !== '' && txt.value !== null) {
		if (reg.test(txt.value) === false) {
			isValid = false;
		} else {
			isValid = true;
		}
	} else {
		isValid = false;
	}
	return isValid;
};
