function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.ddecor.pagingcontrol/" + s : s.substring(0, index) + "/com.ddecor.pagingcontrol/" + s.substring(index + 1);
    return 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isApi: true,
    priority: 1000.0002,
    key: "Window",
    style: {
        orientationModes: [ Ti.UI.PORTRAIT ]
    }
}, {
    isApi: true,
    priority: 1000.0044,
    key: "ScrollView",
    style: {
        scrollType: "horizontal",
        width: Ti.UI.FILL,
        contentWidth: "auto",
        contentHeight: Ti.UI.FILL,
        showHorizontalScrollIndicator: false,
        showVerticalScrollIndicator: false
    }
}, {
    isApi: true,
    priority: 1101.0001,
    key: "Window",
    style: {
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_STATE_HIDDEN
    }
}, {
    isClass: true,
    priority: 10000.0003,
    key: "widthSize",
    style: {
        width: Titanium.UI.SIZE
    }
}, {
    isClass: true,
    priority: 10000.0004,
    key: "widthFill",
    style: {
        width: Titanium.UI.FILL
    }
}, {
    isClass: true,
    priority: 10000.0005,
    key: "heightSize",
    style: {
        height: Titanium.UI.SIZE
    }
}, {
    isClass: true,
    priority: 10000.0006,
    key: "heightFill",
    style: {
        height: Titanium.UI.FILL
    }
}, {
    isClass: true,
    priority: 10000.0007,
    key: "top0",
    style: {
        top: "0dp"
    }
}, {
    isClass: true,
    priority: 10000.0008,
    key: "bottom0",
    style: {
        bottom: "0dp"
    }
}, {
    isClass: true,
    priority: 10000.0009,
    key: "left0",
    style: {
        left: "0dp"
    }
}, {
    isClass: true,
    priority: 10000.001,
    key: "right0",
    style: {
        right: "0dp"
    }
}, {
    isClass: true,
    priority: 10000.0011,
    key: "keyBoardTypeEmail",
    style: {
        keyboardType: Ti.UI.KEYBOARD_EMAIL
    }
}, {
    isClass: true,
    priority: 10000.0012,
    key: "keyBoardTypeNumber",
    style: {
        keyboardType: Titanium.UI.KEYBOARD_PHONE_PAD
    }
}, {
    isClass: true,
    priority: 10000.0013,
    key: "layoutVertical",
    style: {
        layout: "vertical"
    }
}, {
    isClass: true,
    priority: 10000.0014,
    key: "layoutHorizontal",
    style: {
        layout: "horizontal"
    }
}, {
    isClass: true,
    priority: 10000.0015,
    key: "textfield",
    style: {
        height: "40dp",
        width: "98%",
        backgroundColor: "transparent",
        color: "#4d4f4a",
        hintTextColor: "#a0a0a0",
        font: {
            fontSize: "14dp",
            fontFamily: "futura_lt_bt_light-webfont"
        }
    }
}, {
    isClass: true,
    priority: 10000.0016,
    key: "textfieldSeperator",
    style: {
        height: "0.5dp",
        width: Titanium.UI.FILL,
        backgroundColor: "#A1A39E"
    }
}, {
    isClass: true,
    priority: 10000.0017,
    key: "registertextfieldSeperator",
    style: {
        height: "0.5dp",
        width: Titanium.UI.FILL,
        backgroundColor: "transparent"
    }
}, {
    isClass: true,
    priority: 10000.0018,
    key: "textCenter",
    style: {
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
    }
}, {
    isClass: true,
    priority: 10000.0019,
    key: "textRight",
    style: {
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT
    }
}, {
    isClass: true,
    priority: 10000.002,
    key: "textLeft",
    style: {
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT
    }
}, {
    isClass: true,
    priority: 10000.0021,
    key: "button_text_font",
    style: {
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        }
    }
}, {
    isClass: true,
    priority: 10000.0028,
    key: "iconFont",
    style: {
        font: {
            fontFamily: "icomoon"
        }
    }
}, {
    isClass: true,
    priority: 10000.0029,
    key: "iconFont1",
    style: {
        font: {
            fontFamily: "icomoon1"
        }
    }
}, {
    isClass: true,
    priority: 10000.003,
    key: "navigationMenuLbl",
    style: {
        height: "45dp",
        width: "45dp",
        font: {
            fontSize: "22dp"
        },
        color: "#ffffff"
    }
}, {
    isClass: true,
    priority: 10000.0031,
    key: "windowBackground",
    style: {
        backgroundColor: "#ffffff"
    }
}, {
    isClass: true,
    priority: 10000.0032,
    key: "windowBackgroundImage",
    style: {
        image: "/images/MainBG.png"
    }
}, {
    isClass: true,
    priority: 10000.0033,
    key: "transparent_border",
    style: {
        borderColor: "transparent",
        borderWidth: "0.0"
    }
}, {
    isClass: true,
    priority: 10000.0034,
    key: "iconFontNew",
    style: {
        font: {
            fontFamily: "icomoonNew"
        }
    }
}, {
    isClass: true,
    priority: 10101.0022,
    key: "fontMedium",
    style: {
        font: {
            fontFamily: "futura_medium_bt-webfont"
        }
    }
}, {
    isClass: true,
    priority: 10101.0023,
    key: "fontLight",
    style: {
        font: {
            fontFamily: "futura_lt_bt_light-webfont"
        }
    }
}, {
    isClass: true,
    priority: 10101.0024,
    key: "fontHeavy",
    style: {
        font: {
            fontFamily: "futura-hv-bt-heavy"
        }
    }
} ];