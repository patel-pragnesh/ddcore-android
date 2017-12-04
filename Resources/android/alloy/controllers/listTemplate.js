function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "listTemplate";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        var __itemTemplate = __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __alloyId723 = [];
    var __alloyId724 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId725 = [];
            var __alloyId726 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId727 = [];
                    var __alloyId729 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId730 = [];
                            var __alloyId731 = {
                                type: "Ti.UI.ImageView",
                                bindId: "gridProductImage1",
                                properties: {
                                    width: Titanium.UI.FILL,
                                    height: Alloy.Globals.imageWidth,
                                    top: "0dp",
                                    bindId: "gridProductImage1"
                                }
                            };
                            __alloyId730.push(__alloyId731);
                            var __alloyId733 = {
                                type: "Ti.UI.Label",
                                bindId: "outOfStock1",
                                properties: {
                                    width: Titanium.UI.FILL,
                                    height: Alloy.Globals.imageWidth,
                                    top: "0dp",
                                    backgroundColor: "#BFffffff",
                                    text: "OUT OF STOCK",
                                    font: {
                                        fontSize: "14dp",
                                        fontFamily: "futura_lt_bt_light-webfont"
                                    },
                                    touchEnabled: false,
                                    visible: false,
                                    color: "#000",
                                    textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                                    bindId: "outOfStock1"
                                }
                            };
                            __alloyId730.push(__alloyId733);
                            var __alloyId735 = {
                                type: "Ti.UI.Label",
                                bindId: "gridLogo0",
                                properties: {
                                    font: {
                                        fontSize: "35dp",
                                        fontFamily: "icomoon1"
                                    },
                                    color: "#c5c3bf",
                                    zIndex: "-1",
                                    text: Alloy.Globals.icon.logo,
                                    bindId: "gridLogo0"
                                }
                            };
                            __alloyId730.push(__alloyId735);
                            var __alloyId736 = {
                                type: "Ti.UI.Label",
                                bindId: "gridCart1",
                                properties: {
                                    font: {
                                        fontSize: "20dp",
                                        fontFamily: "icomoon"
                                    },
                                    width: "35dp",
                                    height: "35dp",
                                    color: "#fff",
                                    textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                                    bottom: "10dp",
                                    right: "10dp",
                                    backgroundColor: "#66000000",
                                    borderRadius: 18,
                                    bindId: "gridCart1"
                                }
                            };
                            __alloyId730.push(__alloyId736);
                            return __alloyId730;
                        }(),
                        properties: {
                            width: Titanium.UI.FILL,
                            height: Titanium.UI.FILL,
                            backgroundColor: "#eeece7"
                        }
                    };
                    __alloyId727.push(__alloyId729);
                    var __alloyId738 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId739 = [];
                            var __alloyId741 = {
                                type: "Ti.UI.View",
                                bindId: "p1nameContainer",
                                childTemplates: function() {
                                    var __alloyId742 = [];
                                    var __alloyId743 = {
                                        type: "Ti.UI.Label",
                                        bindId: "gridProductname1",
                                        properties: {
                                            top: "0dp",
                                            font: {
                                                fontSize: "11dp",
                                                fontFamily: "futura_medium_bt-webfont"
                                            },
                                            color: "#333333",
                                            height: "12dp",
                                            width: Titanium.UI.FILL,
                                            ellipsize: true,
                                            wordWrap: false,
                                            bindId: "gridProductname1"
                                        }
                                    };
                                    __alloyId742.push(__alloyId743);
                                    var __alloyId745 = {
                                        type: "Ti.UI.Label",
                                        bindId: "productSize1",
                                        properties: {
                                            top: "2dp",
                                            left: "0dp",
                                            font: {
                                                fontSize: "9dp",
                                                fontFamily: "futura_medium_bt-webfont"
                                            },
                                            color: "#a6a6a6",
                                            height: Titanium.UI.SIZE,
                                            width: Titanium.UI.FILL,
                                            ellipsize: true,
                                            wordWrap: false,
                                            bindId: "productSize1"
                                        }
                                    };
                                    __alloyId742.push(__alloyId745);
                                    var __alloyId746 = {
                                        type: "Ti.UI.Label",
                                        bindId: "gridWhereToBuy1",
                                        properties: {
                                            top: "2dp",
                                            left: "0dp",
                                            font: {
                                                fontSize: "10dp",
                                                fontFamily: "futura_lt_bt_light-webfont"
                                            },
                                            color: "#e65e48",
                                            height: "13dp",
                                            ellipsize: true,
                                            wordWrap: false,
                                            width: Titanium.UI.SIZE,
                                            bindId: "gridWhereToBuy1"
                                        }
                                    };
                                    __alloyId742.push(__alloyId746);
                                    return __alloyId742;
                                }(),
                                properties: {
                                    left: "0dp",
                                    top: "0dp",
                                    height: Titanium.UI.SIZE,
                                    width: "63%",
                                    layout: "vertical",
                                    bindId: "p1nameContainer"
                                }
                            };
                            __alloyId739.push(__alloyId741);
                            var __alloyId747 = {
                                type: "Ti.UI.Label",
                                bindId: "gridShare1",
                                properties: {
                                    font: {
                                        fontSize: "18dp",
                                        fontFamily: "icomoon"
                                    },
                                    top: "2dp",
                                    width: "35dp",
                                    height: "35dp",
                                    color: "#a6a6a6",
                                    textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
                                    verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
                                    borderWidth: "0",
                                    right: "35dp",
                                    text: Alloy.Globals.icon.share,
                                    bindId: "gridShare1"
                                }
                            };
                            __alloyId739.push(__alloyId747);
                            var __alloyId748 = {
                                type: "Ti.UI.Label",
                                bindId: "gridWish1",
                                properties: {
                                    font: {
                                        fontSize: "18dp",
                                        fontFamily: "icomoon"
                                    },
                                    top: "2dp",
                                    width: "35dp",
                                    height: "35dp",
                                    color: "#a6a6a6",
                                    textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
                                    verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
                                    borderWidth: "0",
                                    right: "0dp",
                                    text: Alloy.Globals.icon.shortlist,
                                    bindId: "gridWish1"
                                }
                            };
                            __alloyId739.push(__alloyId748);
                            return __alloyId739;
                        }(),
                        properties: {
                            top: "8dp",
                            width: Titanium.UI.FILL,
                            height: Titanium.UI.SIZE
                        }
                    };
                    __alloyId727.push(__alloyId738);
                    return __alloyId727;
                }(),
                properties: {
                    width: Alloy.Globals.imageWidth,
                    height: Titanium.UI.SIZE,
                    layout: "vertical",
                    top: "0dp",
                    left: "0dp"
                }
            };
            __alloyId725.push(__alloyId726);
            var __alloyId749 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId750 = [];
                    var __alloyId752 = {
                        type: "Ti.UI.View",
                        bindId: "imageContainer",
                        childTemplates: function() {
                            var __alloyId753 = [];
                            var __alloyId754 = {
                                type: "Ti.UI.ImageView",
                                bindId: "gridProductImage2",
                                properties: {
                                    width: Titanium.UI.FILL,
                                    height: Alloy.Globals.imageWidth,
                                    top: "0dp",
                                    bindId: "gridProductImage2"
                                }
                            };
                            __alloyId753.push(__alloyId754);
                            var __alloyId756 = {
                                type: "Ti.UI.Label",
                                bindId: "outOfStock2",
                                properties: {
                                    width: Titanium.UI.FILL,
                                    height: Alloy.Globals.imageWidth,
                                    top: "0dp",
                                    backgroundColor: "#BFffffff",
                                    text: "OUT OF STOCK",
                                    font: {
                                        fontSize: "14dp",
                                        fontFamily: "futura_lt_bt_light-webfont"
                                    },
                                    touchEnabled: false,
                                    visible: false,
                                    color: "#000",
                                    textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                                    bindId: "outOfStock2"
                                }
                            };
                            __alloyId753.push(__alloyId756);
                            var __alloyId758 = {
                                type: "Ti.UI.Label",
                                bindId: "gridLogo",
                                properties: {
                                    font: {
                                        fontSize: "35dp",
                                        fontFamily: "icomoon1"
                                    },
                                    color: "#c5c3bf",
                                    zIndex: "-1",
                                    text: Alloy.Globals.icon.logo,
                                    bindId: "gridLogo"
                                }
                            };
                            __alloyId753.push(__alloyId758);
                            var __alloyId759 = {
                                type: "Ti.UI.Label",
                                bindId: "gridCart2",
                                properties: {
                                    font: {
                                        fontSize: "20dp",
                                        fontFamily: "icomoon"
                                    },
                                    width: "35dp",
                                    height: "35dp",
                                    color: "#fff",
                                    textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                                    bottom: "10dp",
                                    right: "10dp",
                                    backgroundColor: "#66000000",
                                    borderRadius: 18,
                                    bindId: "gridCart2"
                                }
                            };
                            __alloyId753.push(__alloyId759);
                            return __alloyId753;
                        }(),
                        properties: {
                            width: Titanium.UI.FILL,
                            height: Titanium.UI.FILL,
                            bindId: "imageContainer",
                            backgroundColor: "#eeece7"
                        }
                    };
                    __alloyId750.push(__alloyId752);
                    var __alloyId761 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId762 = [];
                            var __alloyId764 = {
                                type: "Ti.UI.View",
                                childTemplates: function() {
                                    var __alloyId765 = [];
                                    var __alloyId766 = {
                                        type: "Ti.UI.Label",
                                        bindId: "gridProductname2",
                                        properties: {
                                            top: "0dp",
                                            font: {
                                                fontSize: "11dp",
                                                fontFamily: "futura_medium_bt-webfont"
                                            },
                                            color: "#333333",
                                            height: "12dp",
                                            width: Titanium.UI.FILL,
                                            ellipsize: true,
                                            wordWrap: false,
                                            bindId: "gridProductname2"
                                        }
                                    };
                                    __alloyId765.push(__alloyId766);
                                    var __alloyId768 = {
                                        type: "Ti.UI.Label",
                                        bindId: "productSize2",
                                        properties: {
                                            top: "2dp",
                                            left: "0dp",
                                            font: {
                                                fontSize: "9dp",
                                                fontFamily: "futura_medium_bt-webfont"
                                            },
                                            color: "#a6a6a6",
                                            height: Titanium.UI.SIZE,
                                            width: Titanium.UI.FILL,
                                            ellipsize: true,
                                            wordWrap: false,
                                            bindId: "productSize2"
                                        }
                                    };
                                    __alloyId765.push(__alloyId768);
                                    var __alloyId769 = {
                                        type: "Ti.UI.Label",
                                        bindId: "gridWhereToBuy2",
                                        properties: {
                                            top: "2dp",
                                            left: "0dp",
                                            font: {
                                                fontSize: "10dp",
                                                fontFamily: "futura_lt_bt_light-webfont"
                                            },
                                            color: "#e65e48",
                                            height: "13dp",
                                            ellipsize: true,
                                            wordWrap: false,
                                            width: Titanium.UI.SIZE,
                                            bindId: "gridWhereToBuy2"
                                        }
                                    };
                                    __alloyId765.push(__alloyId769);
                                    return __alloyId765;
                                }(),
                                properties: {
                                    left: "0dp",
                                    top: "0dp",
                                    height: Titanium.UI.SIZE,
                                    width: "63%",
                                    layout: "vertical"
                                }
                            };
                            __alloyId762.push(__alloyId764);
                            var __alloyId770 = {
                                type: "Ti.UI.Label",
                                bindId: "gridShare2",
                                properties: {
                                    font: {
                                        fontSize: "18dp",
                                        fontFamily: "icomoon"
                                    },
                                    top: "2dp",
                                    width: "35dp",
                                    height: "35dp",
                                    color: "#a6a6a6",
                                    textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
                                    verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
                                    borderWidth: "0",
                                    text: Alloy.Globals.icon.share,
                                    right: "35dp",
                                    bindId: "gridShare2"
                                }
                            };
                            __alloyId762.push(__alloyId770);
                            var __alloyId771 = {
                                type: "Ti.UI.Label",
                                bindId: "gridWish2",
                                properties: {
                                    font: {
                                        fontSize: "18dp",
                                        fontFamily: "icomoon"
                                    },
                                    top: "2dp",
                                    width: "35dp",
                                    height: "35dp",
                                    color: "#a6a6a6",
                                    textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
                                    verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
                                    borderWidth: "0",
                                    right: "0dp",
                                    text: Alloy.Globals.icon.shortlist,
                                    bindId: "gridWish2"
                                }
                            };
                            __alloyId762.push(__alloyId771);
                            return __alloyId762;
                        }(),
                        properties: {
                            top: "8dp",
                            width: Titanium.UI.FILL,
                            height: Titanium.UI.SIZE
                        }
                    };
                    __alloyId750.push(__alloyId761);
                    return __alloyId750;
                }(),
                properties: {
                    width: Alloy.Globals.imageWidth,
                    height: Titanium.UI.SIZE,
                    layout: "vertical",
                    top: "0dp",
                    right: "0dp"
                }
            };
            __alloyId725.push(__alloyId749);
            return __alloyId725;
        }(),
        properties: {
            top: "12dp",
            width: Titanium.UI.FILL,
            height: Titanium.UI.SIZE
        }
    };
    __alloyId723.push(__alloyId724);
    $.__views.listTemplate = {
        properties: {
            selectionStyle: "none",
            height: Ti.UI.SIZE,
            backgroundColor: "transparent",
            width: Alloy.Globals.listWidth,
            name: "gridTemplate",
            bindId: "templateView",
            id: "listTemplate"
        },
        childTemplates: __alloyId723
    };
    __itemTemplate["gridTemplate"] = $.__views.listTemplate;
    $.__views.listTemplate && $.addTopLevelView($.__views.listTemplate);
    var __alloyId772 = [];
    var __alloyId773 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId774 = [];
            var __alloyId776 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId777 = [];
                    var __alloyId779 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId780 = [];
                            var __alloyId781 = {
                                type: "Ti.UI.ImageView",
                                bindId: "gridProductImage1",
                                properties: {
                                    width: "65dp",
                                    height: Titanium.UI.FILL,
                                    left: "0dp",
                                    defaultImage: "/images/default_logo.png",
                                    bindId: "gridProductImage1"
                                }
                            };
                            __alloyId780.push(__alloyId781);
                            var __alloyId783 = {
                                type: "Ti.UI.Label",
                                properties: {
                                    font: {
                                        fontSize: "35dp",
                                        fontFamily: "icomoon1"
                                    },
                                    color: "#c5c3bf",
                                    zIndex: "-1",
                                    touchEnabled: false,
                                    text: Alloy.Globals.icon.logo
                                }
                            };
                            __alloyId780.push(__alloyId783);
                            return __alloyId780;
                        }(),
                        properties: {
                            width: "65dp",
                            height: Titanium.UI.FILL,
                            left: "0dp",
                            backgroundColor: "#eeece7"
                        }
                    };
                    __alloyId777.push(__alloyId779);
                    var __alloyId785 = {
                        type: "Ti.UI.View",
                        bindId: "listContainer",
                        childTemplates: function() {
                            var __alloyId786 = [];
                            var __alloyId788 = {
                                type: "Ti.UI.View",
                                childTemplates: function() {
                                    var __alloyId789 = [];
                                    var __alloyId790 = {
                                        type: "Ti.UI.Label",
                                        bindId: "gridProductname1",
                                        properties: {
                                            font: {
                                                fontFamily: "futura-hv-bt-heavy",
                                                fontSize: "11dp"
                                            },
                                            left: "0dp",
                                            top: "3dp",
                                            height: "12dp",
                                            width: Titanium.UI.FILL,
                                            ellipsize: true,
                                            wordWrap: false,
                                            color: "#333333",
                                            bindId: "gridProductname1"
                                        }
                                    };
                                    __alloyId789.push(__alloyId790);
                                    var __alloyId792 = {
                                        type: "Ti.UI.Label",
                                        bindId: "productSize1",
                                        properties: {
                                            top: "2dp",
                                            left: "0dp",
                                            font: {
                                                fontSize: "9dp",
                                                fontFamily: "futura_medium_bt-webfont"
                                            },
                                            color: "#a6a6a6",
                                            height: Titanium.UI.SIZE,
                                            width: Titanium.UI.FILL,
                                            ellipsize: true,
                                            wordWrap: false,
                                            bindId: "productSize1"
                                        }
                                    };
                                    __alloyId789.push(__alloyId792);
                                    var __alloyId793 = {
                                        type: "Ti.UI.Label",
                                        bindId: "gridWhereToBuy1",
                                        properties: {
                                            left: "0dp",
                                            top: "2dp",
                                            ellipsize: true,
                                            wordWrap: false,
                                            width: Titanium.UI.SIZE,
                                            font: {
                                                fontSize: "10dp",
                                                fontFamily: "futura_lt_bt_light-webfont"
                                            },
                                            color: "#e65e48",
                                            text: "Where to buy",
                                            bindId: "gridWhereToBuy1"
                                        }
                                    };
                                    __alloyId789.push(__alloyId793);
                                    var __alloyId794 = {
                                        type: "Ti.UI.Label",
                                        bindId: "outOfStock1",
                                        properties: {
                                            left: "0dp",
                                            top: "5dp",
                                            text: "OUT OF STOCK",
                                            font: {
                                                fontSize: "10dp",
                                                fontFamily: "futura_lt_bt_light-webfont"
                                            },
                                            touchEnabled: false,
                                            bubbleParent: true,
                                            visible: false,
                                            color: "#000",
                                            textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                                            bindId: "outOfStock1"
                                        }
                                    };
                                    __alloyId789.push(__alloyId794);
                                    return __alloyId789;
                                }(),
                                properties: {
                                    top: "0dp",
                                    left: "0dp",
                                    width: "48%",
                                    height: Titanium.UI.SIZE,
                                    layout: "vertical"
                                }
                            };
                            __alloyId786.push(__alloyId788);
                            var __alloyId795 = {
                                type: "Ti.UI.Label",
                                bindId: "gridWish1",
                                properties: {
                                    font: {
                                        fontSize: "18dp",
                                        fontFamily: "icomoon"
                                    },
                                    top: "0dp",
                                    width: "50dp",
                                    height: "35dp",
                                    color: "#a6a6a6",
                                    textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                                    verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
                                    borderWidth: "0",
                                    right: "0dp",
                                    text: Alloy.Globals.icon.shortlist,
                                    bindId: "gridWish1"
                                }
                            };
                            __alloyId786.push(__alloyId795);
                            var __alloyId796 = {
                                type: "Ti.UI.Label",
                                bindId: "gridShare1",
                                properties: {
                                    font: {
                                        fontSize: "18dp",
                                        fontFamily: "icomoon"
                                    },
                                    top: "0dp",
                                    width: "35dp",
                                    height: "35dp",
                                    color: "#a6a6a6",
                                    textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                                    verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
                                    borderWidth: "0",
                                    right: "50dp",
                                    text: Alloy.Globals.icon.share,
                                    bindId: "gridShare1"
                                }
                            };
                            __alloyId786.push(__alloyId796);
                            var __alloyId797 = {
                                type: "Ti.UI.Label",
                                bindId: "gridCart1",
                                properties: {
                                    font: {
                                        fontSize: "18dp",
                                        fontFamily: "icomoon"
                                    },
                                    top: "0dp",
                                    width: "35dp",
                                    height: "35dp",
                                    color: "#a6a6a6",
                                    textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                                    verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
                                    borderWidth: "0",
                                    right: "85dp",
                                    text: Alloy.Globals.icon.bag,
                                    bindId: "gridCart1"
                                }
                            };
                            __alloyId786.push(__alloyId797);
                            var __alloyId798 = {
                                type: "Ti.UI.Label",
                                properties: {
                                    bottom: "3dp",
                                    left: "0dp",
                                    width: Titanium.UI.FILL,
                                    right: "15dp",
                                    ellipsize: true,
                                    wordWrap: false,
                                    touchEnabled: false,
                                    font: {
                                        fontSize: "10dp",
                                        fontFamily: "futura_lt_bt_light-webfont"
                                    },
                                    color: "#333333"
                                }
                            };
                            __alloyId786.push(__alloyId798);
                            return __alloyId786;
                        }(),
                        properties: {
                            left: "75dp",
                            width: Titanium.UI.FILL,
                            height: Titanium.UI.FILL,
                            bindId: "listContainer"
                        }
                    };
                    __alloyId777.push(__alloyId785);
                    return __alloyId777;
                }(),
                properties: {
                    height: "65dp",
                    width: Titanium.UI.FILL,
                    left: "15dp"
                }
            };
            __alloyId774.push(__alloyId776);
            var __alloyId800 = {
                type: "Ti.UI.View",
                properties: {
                    width: Titanium.UI.FILL,
                    bottom: "0dp",
                    left: "15dp",
                    right: "15dp",
                    backgroundColor: "#e6e6e6",
                    height: "1dp"
                }
            };
            __alloyId774.push(__alloyId800);
            return __alloyId774;
        }(),
        properties: {
            height: "100dp",
            width: Titanium.UI.FILL,
            backgroundSelectedColor: "#f2f2f2"
        }
    };
    __alloyId772.push(__alloyId773);
    $.__views.listTemplate = {
        properties: {
            selectionStyle: "none",
            name: "listTypeTemplate",
            bindId: "templateView",
            id: "listTemplate"
        },
        childTemplates: __alloyId772
    };
    __itemTemplate["listTypeTemplate"] = $.__views.listTemplate;
    $.__views.listTemplate && $.addTopLevelView($.__views.listTemplate);
    var __alloyId801 = [];
    var __alloyId802 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId803 = [];
            var __alloyId805 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId806 = [];
                    var __alloyId808 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId809 = [];
                            var __alloyId810 = {
                                type: "Ti.UI.ImageView",
                                bindId: "gridProductImage1",
                                properties: {
                                    height: Alloy.Globals.listWidth,
                                    width: Alloy.Globals.listWidth,
                                    bindId: "gridProductImage1"
                                }
                            };
                            __alloyId809.push(__alloyId810);
                            var __alloyId812 = {
                                type: "Ti.UI.Label",
                                bindId: "outOfStock1",
                                properties: {
                                    height: Alloy.Globals.listWidth,
                                    width: Alloy.Globals.listWidth,
                                    top: "0dp",
                                    backgroundColor: "#66ffffff",
                                    text: "OUT OF STOCK",
                                    font: {
                                        fontSize: "18dp",
                                        fontFamily: "futura_lt_bt_light-webfont"
                                    },
                                    touchEnabled: false,
                                    bubbleParent: true,
                                    visible: false,
                                    color: "#000",
                                    textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                                    bindId: "outOfStock1"
                                }
                            };
                            __alloyId809.push(__alloyId812);
                            return __alloyId809;
                        }(),
                        properties: {
                            height: Alloy.Globals.listWidth,
                            width: Alloy.Globals.listWidth,
                            backgroundColor: "#eeece7"
                        }
                    };
                    __alloyId806.push(__alloyId808);
                    var __alloyId814 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId815 = [];
                            var __alloyId817 = {
                                type: "Ti.UI.View",
                                childTemplates: function() {
                                    var __alloyId818 = [];
                                    var __alloyId819 = {
                                        type: "Ti.UI.Label",
                                        bindId: "gridProductname1",
                                        properties: {
                                            top: "0dp",
                                            font: {
                                                fontSize: "11dp",
                                                fontFamily: "futura_medium_bt-webfont"
                                            },
                                            color: "#333333",
                                            height: "12dp",
                                            width: Titanium.UI.FILL,
                                            ellipsize: true,
                                            wordWrap: false,
                                            bindId: "gridProductname1"
                                        }
                                    };
                                    __alloyId818.push(__alloyId819);
                                    var __alloyId821 = {
                                        type: "Ti.UI.Label",
                                        bindId: "productSize1",
                                        properties: {
                                            top: "2dp",
                                            left: "0dp",
                                            font: {
                                                fontSize: "9dp",
                                                fontFamily: "futura_medium_bt-webfont"
                                            },
                                            color: "#a6a6a6",
                                            height: Titanium.UI.SIZE,
                                            width: Titanium.UI.FILL,
                                            ellipsize: true,
                                            wordWrap: false,
                                            bindId: "productSize1"
                                        }
                                    };
                                    __alloyId818.push(__alloyId821);
                                    var __alloyId822 = {
                                        type: "Ti.UI.Label",
                                        bindId: "gridWhereToBuy1",
                                        properties: {
                                            top: 5,
                                            left: "0dp",
                                            font: {
                                                fontSize: "10dp",
                                                fontFamily: "futura_lt_bt_light-webfont"
                                            },
                                            color: "#e65e48",
                                            height: "13dp",
                                            ellipsize: true,
                                            wordWrap: false,
                                            width: Titanium.UI.SIZE,
                                            text: "Where to buy",
                                            bindId: "gridWhereToBuy1"
                                        }
                                    };
                                    __alloyId818.push(__alloyId822);
                                    return __alloyId818;
                                }(),
                                properties: {
                                    left: "0dp",
                                    top: "0dp",
                                    height: Titanium.UI.SIZE,
                                    width: "63%",
                                    layout: "vertical"
                                }
                            };
                            __alloyId815.push(__alloyId817);
                            var __alloyId823 = {
                                type: "Ti.UI.Label",
                                bindId: "gridShare1",
                                properties: {
                                    top: "2dp",
                                    font: {
                                        fontSize: "18dp",
                                        fontFamily: "icomoon"
                                    },
                                    width: "35dp",
                                    height: "35dp",
                                    color: "#a6a6a6",
                                    textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
                                    verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
                                    borderWidth: "0",
                                    right: "35dp",
                                    text: Alloy.Globals.icon.share,
                                    bindId: "gridShare1"
                                }
                            };
                            __alloyId815.push(__alloyId823);
                            var __alloyId824 = {
                                type: "Ti.UI.Label",
                                bindId: "gridWish1",
                                properties: {
                                    top: "2dp",
                                    font: {
                                        fontSize: "18dp",
                                        fontFamily: "icomoon"
                                    },
                                    width: "35dp",
                                    height: "35dp",
                                    color: "#a6a6a6",
                                    textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
                                    verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
                                    borderWidth: "0",
                                    right: "0dp",
                                    text: Alloy.Globals.icon.shortlist,
                                    bindId: "gridWish1"
                                }
                            };
                            __alloyId815.push(__alloyId824);
                            var __alloyId825 = {
                                type: "Ti.UI.Label",
                                bindId: "gridCart1",
                                properties: {
                                    top: "2dp",
                                    font: {
                                        fontSize: "18dp",
                                        fontFamily: "icomoon"
                                    },
                                    width: "35dp",
                                    height: "35dp",
                                    color: "#a6a6a6",
                                    textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
                                    verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
                                    borderWidth: "0",
                                    right: "70dp",
                                    text: Alloy.Globals.icon.bag,
                                    bindId: "gridCart1"
                                }
                            };
                            __alloyId815.push(__alloyId825);
                            return __alloyId815;
                        }(),
                        properties: {
                            top: "8dp",
                            width: Titanium.UI.FILL,
                            height: Titanium.UI.SIZE
                        }
                    };
                    __alloyId806.push(__alloyId814);
                    var __alloyId827 = {
                        type: "Ti.UI.View",
                        properties: {
                            width: Titanium.UI.FILL,
                            top: "15dp",
                            backgroundColor: "#e6e6e6",
                            height: "1dp"
                        }
                    };
                    __alloyId806.push(__alloyId827);
                    return __alloyId806;
                }(),
                properties: {
                    height: Titanium.UI.SIZE,
                    width: Titanium.UI.FILL,
                    left: "15dp",
                    right: "15dp",
                    top: "15dp",
                    layout: "vertical"
                }
            };
            __alloyId803.push(__alloyId805);
            return __alloyId803;
        }(),
        properties: {
            height: Titanium.UI.SIZE,
            width: Titanium.UI.FILL
        }
    };
    __alloyId801.push(__alloyId802);
    $.__views.listTemplate = {
        properties: {
            selectionStyle: "none",
            name: "blockTypeTemplate",
            bindId: "templateView",
            id: "listTemplate"
        },
        childTemplates: __alloyId801
    };
    __itemTemplate["blockTypeTemplate"] = $.__views.listTemplate;
    $.__views.listTemplate && $.addTopLevelView($.__views.listTemplate);
    var __alloyId828 = [];
    var __alloyId829 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId830 = [];
            var __alloyId832 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId833 = [];
                    var __alloyId835 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId836 = [];
                            var __alloyId837 = {
                                type: "Ti.UI.ImageView",
                                bindId: "cartImage",
                                properties: {
                                    width: "65dp",
                                    height: Titanium.UI.FILL,
                                    left: "0dp",
                                    defaultImage: "/images/default_logo.png",
                                    bindId: "cartImage"
                                }
                            };
                            __alloyId836.push(__alloyId837);
                            var __alloyId838 = {
                                type: "Ti.UI.Label",
                                bindId: "opacBlurLbl",
                                properties: {
                                    backgroundColor: "transparent",
                                    width: Titanium.UI.FILL,
                                    height: "45dp",
                                    top: "0dp",
                                    bindId: "opacBlurLbl"
                                }
                            };
                            __alloyId836.push(__alloyId838);
                            var __alloyId839 = {
                                type: "Ti.UI.Label",
                                bindId: "opacLbl",
                                properties: {
                                    backgroundColor: "transparent",
                                    width: Titanium.UI.FILL,
                                    height: "20dp",
                                    bottom: "0dp",
                                    font: {
                                        fontSize: "8dp",
                                        fontFamily: "futura_medium_bt-webfont"
                                    },
                                    textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                                    color: "#ffffff",
                                    bindId: "opacLbl"
                                }
                            };
                            __alloyId836.push(__alloyId839);
                            return __alloyId836;
                        }(),
                        properties: {
                            width: 65,
                            left: 0,
                            height: Titanium.UI.FILL
                        }
                    };
                    __alloyId833.push(__alloyId835);
                    var __alloyId841 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId842 = [];
                            var __alloyId844 = {
                                type: "Ti.UI.View",
                                childTemplates: function() {
                                    var __alloyId845 = [];
                                    var __alloyId846 = {
                                        type: "Ti.UI.Label",
                                        bindId: "productName",
                                        properties: {
                                            font: {
                                                fontFamily: "futura-hv-bt-heavy",
                                                fontSize: "11dp"
                                            },
                                            left: "0dp",
                                            top: "3dp",
                                            height: "12dp",
                                            width: Titanium.UI.FILL,
                                            ellipsize: true,
                                            wordWrap: false,
                                            color: "#333333",
                                            text: "THE BENEATH BED",
                                            bindId: "productName"
                                        }
                                    };
                                    __alloyId845.push(__alloyId846);
                                    var __alloyId847 = {
                                        type: "Ti.UI.Label",
                                        bindId: "productSize",
                                        properties: {
                                            left: "0dp",
                                            top: "2dp",
                                            ellipsize: true,
                                            wordWrap: false,
                                            width: Titanium.UI.FILL,
                                            font: {
                                                fontSize: "0dp",
                                                fontFamily: "futura_lt_bt_light-webfont"
                                            },
                                            color: "#737373",
                                            text: "DOUBLE BEDSHEET SET",
                                            bindId: "productSize"
                                        }
                                    };
                                    __alloyId845.push(__alloyId847);
                                    var __alloyId848 = {
                                        type: "Ti.UI.View",
                                        childTemplates: function() {
                                            var __alloyId849 = [];
                                            var __alloyId851 = {
                                                type: "Ti.UI.Label",
                                                properties: {
                                                    font: {
                                                        fontSize: "10dp",
                                                        fontFamily: "icomoon"
                                                    },
                                                    text: Alloy.Globals.icon.currency1,
                                                    left: "0dp",
                                                    color: "#333333"
                                                }
                                            };
                                            __alloyId849.push(__alloyId851);
                                            var __alloyId852 = {
                                                type: "Ti.UI.Label",
                                                bindId: "price",
                                                properties: {
                                                    left: "2dp",
                                                    ellipsize: true,
                                                    wordWrap: false,
                                                    font: {
                                                        fontSize: "9dp",
                                                        fontFamily: "futura_medium_bt-webfont"
                                                    },
                                                    color: "#333333",
                                                    bindId: "price"
                                                }
                                            };
                                            __alloyId849.push(__alloyId852);
                                            return __alloyId849;
                                        }(),
                                        properties: {
                                            left: "0dp",
                                            layout: "horizontal",
                                            top: "4dp",
                                            width: Titanium.UI.FILL,
                                            height: "11dp"
                                        }
                                    };
                                    __alloyId845.push(__alloyId848);
                                    return __alloyId845;
                                }(),
                                properties: {
                                    top: "0dp",
                                    left: "0dp",
                                    width: "48%",
                                    height: Titanium.UI.SIZE,
                                    layout: "vertical"
                                }
                            };
                            __alloyId842.push(__alloyId844);
                            var __alloyId853 = {
                                type: "Ti.UI.View",
                                childTemplates: function() {
                                    var __alloyId854 = [];
                                    var __alloyId856 = {
                                        type: "Ti.UI.ImageView",
                                        bindId: "colorImage",
                                        properties: {
                                            left: "0dp",
                                            bottom: "0dp",
                                            width: "15dp",
                                            height: "15dp",
                                            borderColor: "#f2f2f2",
                                            bindId: "colorImage"
                                        }
                                    };
                                    __alloyId854.push(__alloyId856);
                                    var __alloyId857 = {
                                        type: "Ti.UI.View",
                                        bindId: "qtyContainer",
                                        childTemplates: function() {
                                            var __alloyId858 = [];
                                            var __alloyId859 = {
                                                type: "Ti.UI.Label",
                                                bindId: "qtyLbl",
                                                properties: {
                                                    left: "0dp",
                                                    top: "2dp",
                                                    font: {
                                                        fontSize: "9dp",
                                                        fontFamily: "futura_medium_bt-webfont"
                                                    },
                                                    color: "#e65e48",
                                                    touchEnabled: false,
                                                    bindId: "qtyLbl"
                                                }
                                            };
                                            __alloyId858.push(__alloyId859);
                                            var __alloyId860 = {
                                                type: "Ti.UI.Label",
                                                bindId: "dropDownIcon",
                                                properties: {
                                                    left: "5dp",
                                                    top: "0dp",
                                                    text: Alloy.Globals.icon.expandFill,
                                                    font: {
                                                        fontSize: "12dp",
                                                        fontFamily: "icomoon"
                                                    },
                                                    color: "#333333",
                                                    touchEnabled: false,
                                                    bindId: "dropDownIcon"
                                                }
                                            };
                                            __alloyId858.push(__alloyId860);
                                            return __alloyId858;
                                        }(),
                                        properties: {
                                            left: "30dp",
                                            bottom: "0dp",
                                            width: Titanium.UI.FILL,
                                            height: "15dp",
                                            layout: "horizontal",
                                            bindId: "qtyContainer"
                                        }
                                    };
                                    __alloyId854.push(__alloyId857);
                                    return __alloyId854;
                                }(),
                                properties: {
                                    left: "0dp",
                                    bottom: "0dp",
                                    width: "50%",
                                    height: "20dp"
                                }
                            };
                            __alloyId842.push(__alloyId853);
                            var __alloyId862 = {
                                type: "Ti.UI.View",
                                childTemplates: function() {
                                    var __alloyId863 = [];
                                    var __alloyId865 = {
                                        type: "Ti.UI.Label",
                                        properties: {
                                            font: {
                                                fontSize: "11dp",
                                                fontFamily: "icomoon"
                                            },
                                            color: "#e65e48",
                                            text: Alloy.Globals.icon.currency,
                                            left: "0dp",
                                            top: "1dp",
                                            verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP
                                        }
                                    };
                                    __alloyId863.push(__alloyId865);
                                    var __alloyId867 = {
                                        type: "Ti.UI.Label",
                                        bindId: "totalPrice",
                                        properties: {
                                            top: "0dp",
                                            left: "10dp",
                                            font: {
                                                fontSize: "13dp",
                                                fontFamily: "futura-hv-bt-heavy"
                                            },
                                            color: "#e65e48",
                                            bindId: "totalPrice"
                                        }
                                    };
                                    __alloyId863.push(__alloyId867);
                                    return __alloyId863;
                                }(),
                                properties: {
                                    height: Titanium.UI.SIZE,
                                    width: Titanium.UI.SIZE,
                                    top: 0,
                                    right: 15
                                }
                            };
                            __alloyId842.push(__alloyId862);
                            var __alloyId868 = {
                                type: "Ti.UI.Label",
                                bindId: "cartWish",
                                properties: {
                                    font: {
                                        fontSize: "18dp",
                                        fontFamily: "icomoon"
                                    },
                                    bottom: "0dp",
                                    width: "35dp",
                                    height: "35dp",
                                    color: "#a6000000",
                                    verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM,
                                    textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                                    right: "50dp",
                                    text: Alloy.Globals.icon.shortlist,
                                    bindId: "cartWish"
                                }
                            };
                            __alloyId842.push(__alloyId868);
                            var __alloyId869 = {
                                type: "Ti.UI.Label",
                                bindId: "cartDelete",
                                properties: {
                                    font: {
                                        fontSize: "18dp",
                                        fontFamily: "icomoon"
                                    },
                                    bottom: "0dp",
                                    width: "50dp",
                                    height: "35dp",
                                    color: "#a6000000",
                                    verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM,
                                    textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                                    right: "0dp",
                                    text: Alloy.Globals.icon.deleteIcon,
                                    bindId: "cartDelete"
                                }
                            };
                            __alloyId842.push(__alloyId869);
                            return __alloyId842;
                        }(),
                        properties: {
                            left: "75dp",
                            width: Titanium.UI.FILL,
                            height: Titanium.UI.FILL
                        }
                    };
                    __alloyId833.push(__alloyId841);
                    return __alloyId833;
                }(),
                properties: {
                    height: "65dp",
                    width: Titanium.UI.FILL,
                    left: "15dp"
                }
            };
            __alloyId830.push(__alloyId832);
            var __alloyId871 = {
                type: "Ti.UI.View",
                properties: {
                    width: Titanium.UI.FILL,
                    bottom: "0dp",
                    left: "15dp",
                    right: "15dp",
                    backgroundColor: "#e6e6e6",
                    height: "1dp"
                }
            };
            __alloyId830.push(__alloyId871);
            return __alloyId830;
        }(),
        properties: {
            height: "100dp",
            width: Titanium.UI.FILL,
            backgroundSelectedColor: "#f2f2f2"
        }
    };
    __alloyId828.push(__alloyId829);
    $.__views.listTemplate = {
        properties: {
            selectionStyle: "none",
            name: "cartTemplate",
            bindId: "templateView",
            id: "listTemplate"
        },
        childTemplates: __alloyId828
    };
    __itemTemplate["cartTemplate"] = $.__views.listTemplate;
    $.__views.listTemplate && $.addTopLevelView($.__views.listTemplate);
    var __alloyId872 = [];
    var __alloyId873 = {
        type: "Ti.UI.View",
        bindId: "mainShortlistContainer",
        childTemplates: function() {
            var __alloyId874 = [];
            var __alloyId876 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId877 = [];
                    var __alloyId879 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId880 = [];
                            var __alloyId881 = {
                                type: "Ti.UI.ImageView",
                                bindId: "cartImage",
                                properties: {
                                    width: "65dp",
                                    height: Titanium.UI.FILL,
                                    left: "0dp",
                                    defaultImage: "/images/default_logo.png",
                                    bindId: "cartImage"
                                }
                            };
                            __alloyId880.push(__alloyId881);
                            var __alloyId882 = {
                                type: "Ti.UI.Label",
                                bindId: "opacBlurLbl",
                                properties: {
                                    backgroundColor: "transparent",
                                    width: Titanium.UI.FILL,
                                    height: "45dp",
                                    top: "0dp",
                                    bindId: "opacBlurLbl"
                                }
                            };
                            __alloyId880.push(__alloyId882);
                            var __alloyId883 = {
                                type: "Ti.UI.Label",
                                bindId: "opacLbl",
                                properties: {
                                    backgroundColor: "transparent",
                                    width: Titanium.UI.FILL,
                                    height: "20dp",
                                    bottom: "0dp",
                                    font: {
                                        fontSize: "8dp",
                                        fontFamily: "futura_medium_bt-webfont"
                                    },
                                    textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                                    color: "#ffffff",
                                    bindId: "opacLbl"
                                }
                            };
                            __alloyId880.push(__alloyId883);
                            return __alloyId880;
                        }(),
                        properties: {
                            width: 65,
                            left: 0,
                            height: Titanium.UI.FILL
                        }
                    };
                    __alloyId877.push(__alloyId879);
                    var __alloyId885 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId886 = [];
                            var __alloyId888 = {
                                type: "Ti.UI.View",
                                childTemplates: function() {
                                    var __alloyId889 = [];
                                    var __alloyId890 = {
                                        type: "Ti.UI.Label",
                                        bindId: "productName",
                                        properties: {
                                            font: {
                                                fontFamily: "futura-hv-bt-heavy",
                                                fontSize: "11dp"
                                            },
                                            left: "0dp",
                                            top: "3dp",
                                            height: "12dp",
                                            width: Titanium.UI.FILL,
                                            ellipsize: true,
                                            wordWrap: false,
                                            color: "#333333",
                                            bindId: "productName"
                                        }
                                    };
                                    __alloyId889.push(__alloyId890);
                                    var __alloyId891 = {
                                        type: "Ti.UI.Label",
                                        bindId: "productSize",
                                        properties: {
                                            left: "0dp",
                                            top: "2dp",
                                            ellipsize: true,
                                            wordWrap: false,
                                            width: Titanium.UI.FILL,
                                            font: {
                                                fontSize: "0dp",
                                                fontFamily: "futura_lt_bt_light-webfont"
                                            },
                                            color: "#737373",
                                            bindId: "productSize"
                                        }
                                    };
                                    __alloyId889.push(__alloyId891);
                                    return __alloyId889;
                                }(),
                                properties: {
                                    top: "0dp",
                                    left: "0dp",
                                    width: "48%",
                                    height: Titanium.UI.SIZE,
                                    layout: "vertical"
                                }
                            };
                            __alloyId886.push(__alloyId888);
                            var __alloyId892 = {
                                type: "Ti.UI.Label",
                                bindId: "notifyLbl",
                                properties: {
                                    left: "0dp",
                                    bottom: "20dp",
                                    height: Titanium.UI.SIZE,
                                    ellipsize: true,
                                    wordWrap: false,
                                    width: Titanium.UI.FILL,
                                    font: {
                                        fontSize: "10dp",
                                        fontFamily: "futura_lt_bt_light-webfont"
                                    },
                                    color: "#e65e48",
                                    bindId: "notifyLbl"
                                }
                            };
                            __alloyId886.push(__alloyId892);
                            var __alloyId894 = {
                                type: "Ti.UI.ImageView",
                                bindId: "colorImage",
                                properties: {
                                    left: "0dp",
                                    bottom: "0dp",
                                    width: "15dp",
                                    height: "15dp",
                                    borderColor: "#f2f2f2",
                                    bindId: "colorImage"
                                }
                            };
                            __alloyId886.push(__alloyId894);
                            var __alloyId896 = {
                                type: "Ti.UI.View",
                                childTemplates: function() {
                                    var __alloyId897 = [];
                                    var __alloyId899 = {
                                        type: "Ti.UI.Label",
                                        properties: {
                                            font: {
                                                fontSize: "11dp",
                                                fontFamily: "icomoon"
                                            },
                                            color: "#e65e48",
                                            text: Alloy.Globals.icon.currency,
                                            left: "0dp",
                                            top: "1dp",
                                            verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP
                                        }
                                    };
                                    __alloyId897.push(__alloyId899);
                                    var __alloyId901 = {
                                        type: "Ti.UI.Label",
                                        bindId: "totalPrice",
                                        properties: {
                                            top: "0dp",
                                            left: "10dp",
                                            font: {
                                                fontSize: "13dp",
                                                fontFamily: "futura-hv-bt-heavy"
                                            },
                                            color: "#e65e48",
                                            bindId: "totalPrice"
                                        }
                                    };
                                    __alloyId897.push(__alloyId901);
                                    return __alloyId897;
                                }(),
                                properties: {
                                    height: Titanium.UI.SIZE,
                                    width: Titanium.UI.SIZE,
                                    top: 0,
                                    right: 15
                                }
                            };
                            __alloyId886.push(__alloyId896);
                            var __alloyId902 = {
                                type: "Ti.UI.Label",
                                bindId: "cartWish",
                                properties: {
                                    font: {
                                        fontSize: "18dp",
                                        fontFamily: "icomoon"
                                    },
                                    bottom: "0dp",
                                    width: "35dp",
                                    height: "35dp",
                                    color: "#a6000000",
                                    verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM,
                                    textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                                    right: "50dp",
                                    text: Alloy.Globals.icon.shortlist,
                                    bindId: "cartWish"
                                }
                            };
                            __alloyId886.push(__alloyId902);
                            var __alloyId903 = {
                                type: "Ti.UI.Label",
                                bindId: "cartDelete",
                                properties: {
                                    font: {
                                        fontSize: "18dp",
                                        fontFamily: "icomoon"
                                    },
                                    bottom: "0dp",
                                    width: "50dp",
                                    height: "35dp",
                                    color: "#a6000000",
                                    verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM,
                                    textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
                                    right: "0dp",
                                    text: Alloy.Globals.icon.deleteIcon,
                                    bindId: "cartDelete"
                                }
                            };
                            __alloyId886.push(__alloyId903);
                            return __alloyId886;
                        }(),
                        properties: {
                            left: "75dp",
                            width: Titanium.UI.FILL,
                            height: Titanium.UI.FILL
                        }
                    };
                    __alloyId877.push(__alloyId885);
                    return __alloyId877;
                }(),
                properties: {
                    height: "65dp",
                    width: Titanium.UI.FILL,
                    left: "15dp"
                }
            };
            __alloyId874.push(__alloyId876);
            var __alloyId905 = {
                type: "Ti.UI.View",
                properties: {
                    width: Titanium.UI.FILL,
                    bottom: "0dp",
                    left: "15dp",
                    right: "15dp",
                    backgroundColor: "#e6e6e6",
                    height: "1dp"
                }
            };
            __alloyId874.push(__alloyId905);
            return __alloyId874;
        }(),
        properties: {
            height: "100dp",
            width: Titanium.UI.FILL,
            backgroundSelectedColor: "#f2f2f2",
            bindId: "mainShortlistContainer"
        }
    };
    __alloyId872.push(__alloyId873);
    $.__views.listTemplate = {
        properties: {
            selectionStyle: "none",
            name: "shortlistTemplate",
            bindId: "templateView",
            id: "listTemplate"
        },
        childTemplates: __alloyId872
    };
    __itemTemplate["shortlistTemplate"] = $.__views.listTemplate;
    $.__views.listTemplate && $.addTopLevelView($.__views.listTemplate);
    var __alloyId906 = [];
    var __alloyId907 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId908 = [];
            var __alloyId910 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId911 = [];
                    var __alloyId912 = {
                        type: "Ti.UI.ImageView",
                        bindId: "reviewImage",
                        properties: {
                            width: "65dp",
                            height: Titanium.UI.FILL,
                            left: "0dp",
                            defaultImage: "/images/default_logo.png",
                            touchEnabled: false,
                            bindId: "reviewImage"
                        }
                    };
                    __alloyId911.push(__alloyId912);
                    var __alloyId914 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId915 = [];
                            var __alloyId917 = {
                                type: "Ti.UI.View",
                                childTemplates: function() {
                                    var __alloyId918 = [];
                                    var __alloyId919 = {
                                        type: "Ti.UI.Label",
                                        bindId: "productName",
                                        properties: {
                                            font: {
                                                fontFamily: "futura-hv-bt-heavy",
                                                fontSize: "11dp"
                                            },
                                            left: "0dp",
                                            top: "3dp",
                                            height: "12dp",
                                            width: Titanium.UI.FILL,
                                            ellipsize: true,
                                            wordWrap: false,
                                            color: "#333333",
                                            text: "THE BENEATH BED",
                                            bindId: "productName"
                                        }
                                    };
                                    __alloyId918.push(__alloyId919);
                                    var __alloyId920 = {
                                        type: "Ti.UI.Label",
                                        bindId: "productSize",
                                        properties: {
                                            left: "0dp",
                                            top: "2dp",
                                            ellipsize: true,
                                            wordWrap: false,
                                            width: Titanium.UI.FILL,
                                            font: {
                                                fontSize: "0dp",
                                                fontFamily: "futura_lt_bt_light-webfont"
                                            },
                                            color: "#737373",
                                            text: "DOUBLE BEDSHEET SET",
                                            bindId: "productSize"
                                        }
                                    };
                                    __alloyId918.push(__alloyId920);
                                    var __alloyId921 = {
                                        type: "Ti.UI.Label",
                                        bindId: "perSetprice",
                                        properties: {
                                            left: "2dp",
                                            ellipsize: true,
                                            wordWrap: false,
                                            font: {
                                                fontSize: "9dp",
                                                fontFamily: "futura_medium_bt-webfont"
                                            },
                                            color: "#333333",
                                            bindId: "perSetprice"
                                        }
                                    };
                                    __alloyId918.push(__alloyId921);
                                    return __alloyId918;
                                }(),
                                properties: {
                                    top: "0dp",
                                    left: "0dp",
                                    width: "48%",
                                    height: Titanium.UI.SIZE,
                                    layout: "vertical",
                                    touchEnabled: false,
                                    bindId: "reviewImage"
                                }
                            };
                            __alloyId915.push(__alloyId917);
                            var __alloyId922 = {
                                type: "Ti.UI.View",
                                childTemplates: function() {
                                    var __alloyId923 = [];
                                    var __alloyId925 = {
                                        type: "Ti.UI.ImageView",
                                        bindId: "colorImage",
                                        properties: {
                                            left: "0dp",
                                            bottom: "0dp",
                                            width: "15dp",
                                            height: "15dp",
                                            borderColor: "#f2f2f2",
                                            touchEnabled: false,
                                            bindId: "reviewImage"
                                        }
                                    };
                                    __alloyId923.push(__alloyId925);
                                    var __alloyId926 = {
                                        type: "Ti.UI.View",
                                        childTemplates: function() {
                                            var __alloyId927 = [];
                                            var __alloyId928 = {
                                                type: "Ti.UI.Label",
                                                bindId: "qtyLbl",
                                                properties: {
                                                    left: "0dp",
                                                    top: "2dp",
                                                    font: {
                                                        fontSize: "9dp",
                                                        fontFamily: "futura_medium_bt-webfont"
                                                    },
                                                    color: "#e65e48",
                                                    bindId: "qtyLbl"
                                                }
                                            };
                                            __alloyId927.push(__alloyId928);
                                            return __alloyId927;
                                        }(),
                                        properties: {
                                            left: "30dp",
                                            bottom: "0dp",
                                            width: Titanium.UI.FILL,
                                            height: "15dp",
                                            layout: "horizontal",
                                            touchEnabled: false,
                                            bindId: "reviewImage"
                                        }
                                    };
                                    __alloyId923.push(__alloyId926);
                                    return __alloyId923;
                                }(),
                                properties: {
                                    left: "0dp",
                                    bottom: "0dp",
                                    width: "50%",
                                    height: "20dp",
                                    touchEnabled: false,
                                    bindId: "reviewImage"
                                }
                            };
                            __alloyId915.push(__alloyId922);
                            var __alloyId930 = {
                                type: "Ti.UI.View",
                                childTemplates: function() {
                                    var __alloyId931 = [];
                                    var __alloyId933 = {
                                        type: "Ti.UI.Label",
                                        properties: {
                                            font: {
                                                fontSize: "11dp",
                                                fontFamily: "icomoon"
                                            },
                                            color: "#e65e48",
                                            text: Alloy.Globals.icon.currency,
                                            left: "0dp",
                                            top: "1dp",
                                            verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP
                                        }
                                    };
                                    __alloyId931.push(__alloyId933);
                                    var __alloyId935 = {
                                        type: "Ti.UI.Label",
                                        bindId: "totalPrice",
                                        properties: {
                                            top: "0dp",
                                            left: "10dp",
                                            font: {
                                                fontSize: "13dp",
                                                fontFamily: "futura-hv-bt-heavy"
                                            },
                                            color: "#e65e48",
                                            bindId: "totalPrice"
                                        }
                                    };
                                    __alloyId931.push(__alloyId935);
                                    return __alloyId931;
                                }(),
                                properties: {
                                    touchEnabled: false,
                                    bindId: "reviewImage",
                                    height: Titanium.UI.SIZE,
                                    width: Titanium.UI.SIZE,
                                    top: 0,
                                    right: 15
                                }
                            };
                            __alloyId915.push(__alloyId930);
                            return __alloyId915;
                        }(),
                        properties: {
                            left: "75dp",
                            width: Titanium.UI.FILL,
                            height: Titanium.UI.FILL,
                            touchEnabled: false,
                            bindId: "reviewImage"
                        }
                    };
                    __alloyId911.push(__alloyId914);
                    return __alloyId911;
                }(),
                properties: {
                    height: "65dp",
                    width: Titanium.UI.FILL,
                    left: "15dp",
                    touchEnabled: false
                }
            };
            __alloyId908.push(__alloyId910);
            var __alloyId937 = {
                type: "Ti.UI.View",
                properties: {
                    width: Titanium.UI.FILL,
                    bottom: "0dp",
                    left: "15dp",
                    right: "15dp",
                    backgroundColor: "#e6e6e6",
                    height: "1dp"
                }
            };
            __alloyId908.push(__alloyId937);
            return __alloyId908;
        }(),
        properties: {
            height: "100dp",
            width: Titanium.UI.FILL,
            backgroundSelectedColor: "#f2f2f2"
        }
    };
    __alloyId906.push(__alloyId907);
    $.__views.listTemplate = {
        properties: {
            selectionStyle: "none",
            name: "reviewItemTemplate",
            bindId: "templateView",
            id: "listTemplate"
        },
        childTemplates: __alloyId906
    };
    __itemTemplate["reviewItemTemplate"] = $.__views.listTemplate;
    $.__views.listTemplate && $.addTopLevelView($.__views.listTemplate);
    var __alloyId938 = [];
    var __alloyId940 = {
        type: "Ti.UI.Label",
        bindId: "message",
        properties: {
            font: {
                fontSize: "11dp",
                fontFamily: "futura_medium_bt-webfont"
            },
            height: "15dp",
            textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
            color: "#a6000000",
            text: "THERE ARE NO COLLECTIONS IN THIS CATEGORY.",
            bindId: "message"
        }
    };
    __alloyId938.push(__alloyId940);
    $.__views.listTemplate = {
        properties: {
            selectionStyle: "none",
            name: "emptyTemplate",
            bindId: "templateView",
            id: "listTemplate"
        },
        childTemplates: __alloyId938
    };
    __itemTemplate["emptyTemplate"] = $.__views.listTemplate;
    $.__views.listTemplate && $.addTopLevelView($.__views.listTemplate);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;