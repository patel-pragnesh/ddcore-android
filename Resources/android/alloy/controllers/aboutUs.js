function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function openIntPage(e) {
        Titanium.Platform.openURL(Alloy.Globals.ddecorUrl + "about-us#international-head");
    }
    function updateCount() {
        $.header.updateCartCount();
    }
    function clearMemory() {
        Alloy.Globals.popWindowInNav();
        $.removeListener();
        $.aboutUs.remove($.superScroll);
        $.superScroll.removeAllChildren();
        $.destroy();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "aboutUs";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.aboutUs = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        backgroundColor: "#ffffff",
        id: "aboutUs"
    });
    $.__views.aboutUs && $.addTopLevelView($.__views.aboutUs);
    updateCount ? $.addListener($.__views.aboutUs, "focus", updateCount) : __defers["$.__views.aboutUs!focus!updateCount"] = true;
    clearMemory ? $.addListener($.__views.aboutUs, "close", clearMemory) : __defers["$.__views.aboutUs!close!clearMemory"] = true;
    $.__views.header = Alloy.createWidget("headerView", "widget", {
        id: "header",
        __parentSymbol: $.__views.aboutUs
    });
    $.__views.header.setParent($.__views.aboutUs);
    $.__views.superScroll = Ti.UI.createScrollView({
        top: "53dp",
        scrollType: "vertical",
        layout: "vertical",
        id: "superScroll"
    });
    $.__views.aboutUs.add($.__views.superScroll);
    $.__views.__alloyId0 = Ti.UI.createView({
        left: "15dp",
        right: "15dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        bottom: "15dp",
        id: "__alloyId0"
    });
    $.__views.superScroll.add($.__views.__alloyId0);
    $.__views.__alloyId1 = Ti.UI.createView({
        top: "50dp",
        width: "45dp",
        height: "1dp",
        backgroundColor: "#cccccc",
        id: "__alloyId1"
    });
    $.__views.__alloyId0.add($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        font: {
            fontSize: "27dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#333333",
        text: "WORLD'S LARGEST",
        top: "20dp",
        id: "__alloyId2"
    });
    $.__views.__alloyId0.add($.__views.__alloyId2);
    $.__views.__alloyId3 = Ti.UI.createLabel({
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#e65e48",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "PRODUCER OF CURTAINS & UPHOLSTERY FABRICS",
        id: "__alloyId3"
    });
    $.__views.__alloyId0.add($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createLabel({
        width: "94%",
        top: "30dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#999999",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "D’Decor is the world’s largest maker of soft furnishing fabrics. Everyday our factories create over 120,000 sq mtrs of high quality fabrics for homes around the world. We are proud to be ‘globally local’, understanding the aesthetic sensibilities of every country that we touch.",
        id: "__alloyId4"
    });
    $.__views.__alloyId0.add($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createLabel({
        width: "94%",
        top: "30dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#999999",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "Founded in 1999, we are today the partners of choice for premier furniture and furnishing makers around the world. We are defined by our commitment to excellence and our passion to bring to life visions that meld expertise with art.",
        id: "__alloyId5"
    });
    $.__views.__alloyId0.add($.__views.__alloyId5);
    $.__views.infrastructure = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        backgroundImage: "/images/aboutusBg.png",
        id: "infrastructure",
        top: "60dp",
        backgroundColor: "#999999"
    });
    $.__views.superScroll.add($.__views.infrastructure);
    $.__views.__alloyId6 = Ti.UI.createView({
        left: "15dp",
        right: "15dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        bottom: "15dp",
        id: "__alloyId6"
    });
    $.__views.infrastructure.add($.__views.__alloyId6);
    $.__views.__alloyId7 = Ti.UI.createView({
        top: "50dp",
        width: "45dp",
        height: "1dp",
        backgroundColor: "#cccccc",
        id: "__alloyId7"
    });
    $.__views.__alloyId6.add($.__views.__alloyId7);
    $.__views.__alloyId8 = Ti.UI.createLabel({
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#e65e48",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "O U R",
        top: "20dp",
        id: "__alloyId8"
    });
    $.__views.__alloyId6.add($.__views.__alloyId8);
    $.__views.__alloyId9 = Ti.UI.createLabel({
        font: {
            fontSize: "27dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        text: "INFRASTRUCTURE",
        id: "__alloyId9"
    });
    $.__views.__alloyId6.add($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createLabel({
        width: "94%",
        top: "30dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "5 state of the art plants in Tarapur, India is where all the magic is brought to life. Every year, 44 million meters of fabric are created here destined for homes around the world. Featuring cutting edge equipment with an average age of just 4 years, our Tarapur facilities are exemplary of how closely we have embraced technology and the spirit of re-invention. We are proud to have delivered several prominent firsts in Indian textile manufacturing such as creating water-repellent and flame-retardant fabrics as well as the country’s first robotic warehouse.",
        id: "__alloyId10"
    });
    $.__views.__alloyId6.add($.__views.__alloyId10);
    $.__views.__alloyId11 = Ti.UI.createView({
        width: "100%",
        height: Titanium.UI.SIZE,
        top: "25dp",
        layout: "horizontal",
        id: "__alloyId11"
    });
    $.__views.__alloyId6.add($.__views.__alloyId11);
    $.__views.__alloyId12 = Ti.UI.createLabel({
        width: "25%",
        height: "50dp",
        font: {
            fontSize: "35dp",
            fontFamily: "icomoon"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        left: 0,
        text: Alloy.Globals.icon.yarn,
        id: "__alloyId12"
    });
    $.__views.__alloyId11.add($.__views.__alloyId12);
    $.__views.__alloyId13 = Ti.UI.createLabel({
        width: "25%",
        height: "50dp",
        font: {
            fontSize: "35dp",
            fontFamily: "icomoon"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: Alloy.Globals.icon.fabricWeaving,
        id: "__alloyId13"
    });
    $.__views.__alloyId11.add($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createLabel({
        width: "20%",
        height: "50dp",
        font: {
            fontSize: "35dp",
            fontFamily: "icomoon"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: Alloy.Globals.icon.fabricProcessing,
        id: "__alloyId14"
    });
    $.__views.__alloyId11.add($.__views.__alloyId14);
    $.__views.__alloyId15 = Ti.UI.createLabel({
        width: "25%",
        height: "50dp",
        font: {
            fontSize: "35dp",
            fontFamily: "icomoon"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: Alloy.Globals.icon.machineStiching,
        id: "__alloyId15"
    });
    $.__views.__alloyId11.add($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createView({
        width: "100%",
        height: Titanium.UI.SIZE,
        top: "12dp",
        layout: "horizontal",
        id: "__alloyId16"
    });
    $.__views.__alloyId6.add($.__views.__alloyId16);
    $.__views.__alloyId17 = Ti.UI.createLabel({
        width: "25%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "9dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "YARN \nPROCESS",
        left: 0,
        id: "__alloyId17"
    });
    $.__views.__alloyId16.add($.__views.__alloyId17);
    $.__views.__alloyId18 = Ti.UI.createLabel({
        width: "25%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "9dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "FABRIC \nWEAVING",
        id: "__alloyId18"
    });
    $.__views.__alloyId16.add($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createLabel({
        width: "20%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "9dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "FABRIC \nPROCESSING",
        id: "__alloyId19"
    });
    $.__views.__alloyId16.add($.__views.__alloyId19);
    $.__views.__alloyId20 = Ti.UI.createLabel({
        width: "25%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "9dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "PRINTING & \nREADYMADE \nSTITCHING",
        id: "__alloyId20"
    });
    $.__views.__alloyId16.add($.__views.__alloyId20);
    $.__views.__alloyId21 = Ti.UI.createView({
        width: "100%",
        height: Titanium.UI.SIZE,
        top: "20dp",
        layout: "horizontal",
        id: "__alloyId21"
    });
    $.__views.__alloyId6.add($.__views.__alloyId21);
    $.__views.__alloyId22 = Ti.UI.createLabel({
        width: "25%",
        height: "50dp",
        font: {
            fontSize: "35dp",
            fontFamily: "icomoon"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        left: 0,
        text: "",
        id: "__alloyId22"
    });
    $.__views.__alloyId21.add($.__views.__alloyId22);
    $.__views.__alloyId23 = Ti.UI.createLabel({
        width: "25%",
        height: "50dp",
        font: {
            fontSize: "35dp",
            fontFamily: "icomoon"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "",
        id: "__alloyId23"
    });
    $.__views.__alloyId21.add($.__views.__alloyId23);
    $.__views.__alloyId24 = Ti.UI.createLabel({
        width: "20%",
        height: "50dp",
        font: {
            fontSize: "35dp",
            fontFamily: "icomoon"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: Alloy.Globals.icon.embroidary,
        id: "__alloyId24"
    });
    $.__views.__alloyId21.add($.__views.__alloyId24);
    $.__views.__alloyId25 = Ti.UI.createLabel({
        width: "25%",
        height: "50dp",
        font: {
            fontSize: "35dp",
            fontFamily: "icomoon"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: Alloy.Globals.icon.robotised,
        id: "__alloyId25"
    });
    $.__views.__alloyId21.add($.__views.__alloyId25);
    $.__views.__alloyId26 = Ti.UI.createView({
        width: "100%",
        height: Titanium.UI.SIZE,
        top: "12dp",
        bottom: "25dp",
        layout: "horizontal",
        id: "__alloyId26"
    });
    $.__views.__alloyId6.add($.__views.__alloyId26);
    $.__views.__alloyId27 = Ti.UI.createLabel({
        width: "25%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "9dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "DIGITAL \nPRINTING",
        left: 0,
        id: "__alloyId27"
    });
    $.__views.__alloyId26.add($.__views.__alloyId27);
    $.__views.__alloyId28 = Ti.UI.createLabel({
        width: "25%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "9dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "CUSTOM MADE \nBLINDS",
        id: "__alloyId28"
    });
    $.__views.__alloyId26.add($.__views.__alloyId28);
    $.__views.__alloyId29 = Ti.UI.createLabel({
        width: "20%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "9dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "EMBROIDERY",
        id: "__alloyId29"
    });
    $.__views.__alloyId26.add($.__views.__alloyId29);
    $.__views.__alloyId30 = Ti.UI.createLabel({
        width: "25%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "9dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "ROBOTIZED \nWAREHOUSING",
        id: "__alloyId30"
    });
    $.__views.__alloyId26.add($.__views.__alloyId30);
    $.__views.management = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "management"
    });
    $.__views.superScroll.add($.__views.management);
    $.__views.__alloyId31 = Ti.UI.createView({
        left: "15dp",
        right: "15dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        bottom: "15dp",
        id: "__alloyId31"
    });
    $.__views.management.add($.__views.__alloyId31);
    $.__views.__alloyId32 = Ti.UI.createView({
        top: "50dp",
        width: "45dp",
        height: "1dp",
        backgroundColor: "#cccccc",
        id: "__alloyId32"
    });
    $.__views.__alloyId31.add($.__views.__alloyId32);
    $.__views.__alloyId33 = Ti.UI.createLabel({
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#e65e48",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "O U R",
        top: "20dp",
        id: "__alloyId33"
    });
    $.__views.__alloyId31.add($.__views.__alloyId33);
    $.__views.__alloyId34 = Ti.UI.createLabel({
        font: {
            fontSize: "27dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#333333",
        text: "MANAGEMENT TEAM",
        id: "__alloyId34"
    });
    $.__views.__alloyId31.add($.__views.__alloyId34);
    $.__views.__alloyId35 = Ti.UI.createLabel({
        width: "94%",
        top: "30dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#B3000000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "They represent the dynamic forces that shape the past, present and future of D’Decor. Visionaries, innovators and leaders are just some of the many roles they straddle with ease. Together, they form D’Decor’s pillars of strength, a rock-solid foundation that has held strong for over a decade.",
        id: "__alloyId35"
    });
    $.__views.__alloyId31.add($.__views.__alloyId35);
    $.__views.__alloyId36 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "horizontal",
        top: "20dp",
        id: "__alloyId36"
    });
    $.__views.management.add($.__views.__alloyId36);
    $.__views.__alloyId37 = Ti.UI.createImageView({
        height: Titanium.UI.SIZE,
        width: "33.33%",
        left: 0,
        image: "/images/vkarora.png",
        id: "__alloyId37"
    });
    $.__views.__alloyId36.add($.__views.__alloyId37);
    $.__views.__alloyId38 = Ti.UI.createImageView({
        height: Titanium.UI.SIZE,
        width: "33.33%",
        left: 0,
        image: "/images/sanjayarora.png",
        id: "__alloyId38"
    });
    $.__views.__alloyId36.add($.__views.__alloyId38);
    $.__views.__alloyId39 = Ti.UI.createImageView({
        height: Titanium.UI.SIZE,
        width: "33.33%",
        left: 0,
        image: "/images/ajayarora.png",
        id: "__alloyId39"
    });
    $.__views.__alloyId36.add($.__views.__alloyId39);
    $.__views.__alloyId40 = Ti.UI.createView({
        left: "15dp",
        right: "15dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        bottom: "15dp",
        id: "__alloyId40"
    });
    $.__views.superScroll.add($.__views.__alloyId40);
    $.__views.__alloyId41 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "50dp",
        id: "__alloyId41"
    });
    $.__views.__alloyId40.add($.__views.__alloyId41);
    $.__views.__alloyId42 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: "60dp",
        font: {
            fontSize: "40dp",
            fontFamily: "icomoon"
        },
        color: "#333333",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: Alloy.Globals.icon.award,
        id: "__alloyId42"
    });
    $.__views.__alloyId41.add($.__views.__alloyId42);
    $.__views.__alloyId43 = Ti.UI.createLabel({
        font: {
            fontSize: "18dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#333333",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "SYNTHETIC & RAYON \nFILAMENT FABRICS",
        top: "25dp",
        id: "__alloyId43"
    });
    $.__views.__alloyId40.add($.__views.__alloyId43);
    $.__views.__alloyId44 = Ti.UI.createLabel({
        font: {
            fontSize: "9dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#e65e48",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "THE BEST EXPORT PERFORMANCE AWARD",
        top: "3dp",
        id: "__alloyId44"
    });
    $.__views.__alloyId40.add($.__views.__alloyId44);
    $.__views.__alloyId45 = Ti.UI.createLabel({
        font: {
            fontSize: "9dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#e65e48",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "2013 - 2014",
        top: "3dp",
        id: "__alloyId45"
    });
    $.__views.__alloyId40.add($.__views.__alloyId45);
    $.__views.viewAllAwards = Ti.UI.createLabel({
        font: {
            fontSize: "11dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#333333",
        width: Titanium.UI.FILL,
        height: "35dp",
        backgroundColor: "#f4f4f4",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "VIEW ALL AWARDS",
        id: "viewAllAwards",
        top: "30dp"
    });
    $.__views.__alloyId40.add($.__views.viewAllAwards);
    $.__views.capabalities = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "capabalities",
        backgroundColor: "#333333"
    });
    $.__views.superScroll.add($.__views.capabalities);
    $.__views.__alloyId46 = Ti.UI.createView({
        left: "15dp",
        right: "15dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        bottom: "15dp",
        id: "__alloyId46"
    });
    $.__views.capabalities.add($.__views.__alloyId46);
    $.__views.__alloyId47 = Ti.UI.createView({
        top: "50dp",
        width: "45dp",
        height: "1dp",
        backgroundColor: "#cccccc",
        id: "__alloyId47"
    });
    $.__views.__alloyId46.add($.__views.__alloyId47);
    $.__views.__alloyId48 = Ti.UI.createLabel({
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#e65e48",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "D E S I G N",
        top: "20dp",
        id: "__alloyId48"
    });
    $.__views.__alloyId46.add($.__views.__alloyId48);
    $.__views.__alloyId49 = Ti.UI.createLabel({
        font: {
            fontSize: "27dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#fff",
        text: "CAPABALITIES",
        id: "__alloyId49"
    });
    $.__views.__alloyId46.add($.__views.__alloyId49);
    $.__views.__alloyId50 = Ti.UI.createLabel({
        font: {
            fontFamily: "Tangerine_Bold",
            fontSize: "28dp"
        },
        color: "#fff",
        text: "Creative with Contemporary",
        top: "20dp",
        id: "__alloyId50"
    });
    $.__views.__alloyId46.add($.__views.__alloyId50);
    $.__views.__alloyId51 = Ti.UI.createLabel({
        width: "94%",
        top: "30dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#B3ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "Innovation and customization are our biggest strengths. Our 15 year partnership with European Studios and investment in 5000 original artworks is the starting point for our 250 people strong product development team. Our continuous efforts and investment in new colors, design trends, substrates, weaves and finishes, provide customers with a wide variety of contemporary products to choose from each year. Our customers are spoilt for choice with over 20,000 SKUs each year.\n	\n\n	We have 60 CAD stations which convert the work of our team as electronic input to our computer aided manufacturing. These SKUs are combined and presented as 100 new collections to our customer. Each collection is designed to beautifully convert a room into your dream home, bringing the 'Live Beautiful' philosophy to life.",
        bottom: "20dp",
        id: "__alloyId51"
    });
    $.__views.__alloyId46.add($.__views.__alloyId51);
    $.__views.__alloyId52 = Ti.UI.createView({
        left: "15dp",
        right: "15dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        bottom: "15dp",
        id: "__alloyId52"
    });
    $.__views.superScroll.add($.__views.__alloyId52);
    $.__views.__alloyId53 = Ti.UI.createView({
        top: "50dp",
        width: "45dp",
        height: "1dp",
        backgroundColor: "#cccccc",
        id: "__alloyId53"
    });
    $.__views.__alloyId52.add($.__views.__alloyId53);
    $.__views.__alloyId54 = Ti.UI.createLabel({
        font: {
            fontSize: "10dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#e65e48",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "ABOUT",
        top: "10dp",
        id: "__alloyId54"
    });
    $.__views.__alloyId52.add($.__views.__alloyId54);
    $.__views.__alloyId55 = Ti.UI.createLabel({
        font: {
            fontSize: "21dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#333333",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "INTERNATIONAL ALLAINCES",
        top: "5dp",
        id: "__alloyId55"
    });
    $.__views.__alloyId52.add($.__views.__alloyId55);
    openIntPage ? $.addListener($.__views.__alloyId55, "click", openIntPage) : __defers["$.__views.__alloyId55!click!openIntPage"] = true;
    $.__views.__alloyId56 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "30dp",
        id: "__alloyId56"
    });
    $.__views.__alloyId52.add($.__views.__alloyId56);
    openIntPage ? $.addListener($.__views.__alloyId56, "click", openIntPage) : __defers["$.__views.__alloyId56!click!openIntPage"] = true;
    $.__views.__alloyId57 = Ti.UI.createImageView({
        height: "80dp",
        image: "/images/marveldisney.png",
        id: "__alloyId57"
    });
    $.__views.__alloyId56.add($.__views.__alloyId57);
    $.__views.__alloyId58 = Ti.UI.createLabel({
        width: "94%",
        top: "30dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#999999",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "Tuck your child in with their heroes, their princesses. Let their fantasies take shape. Let them sail ships, discover new lands and save the day. Presenting our new collection of bedding for kids.",
        id: "__alloyId58"
    });
    $.__views.__alloyId52.add($.__views.__alloyId58);
    $.__views.__alloyId59 = Ti.UI.createLabel({
        width: "94%",
        top: "30dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#999999",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "A child’s bedroom is where he creates his own world. And with our revolutionary digital rinting and 100% pure cotton fabric, you couldn’t have opened a better window to their imagination.",
        id: "__alloyId59"
    });
    $.__views.__alloyId52.add($.__views.__alloyId59);
    $.__views.__alloyId60 = Ti.UI.createView({
        left: "15dp",
        right: "15dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        bottom: "20dp",
        id: "__alloyId60"
    });
    $.__views.superScroll.add($.__views.__alloyId60);
    $.__views.__alloyId61 = Ti.UI.createView({
        top: "50dp",
        width: "45dp",
        height: "1dp",
        backgroundColor: "#cccccc",
        id: "__alloyId61"
    });
    $.__views.__alloyId60.add($.__views.__alloyId61);
    $.__views.__alloyId62 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "25dp",
        id: "__alloyId62"
    });
    $.__views.__alloyId60.add($.__views.__alloyId62);
    $.__views.__alloyId63 = Ti.UI.createImageView({
        height: "45dp",
        image: "/images/sunbrella.png",
        id: "__alloyId63"
    });
    $.__views.__alloyId62.add($.__views.__alloyId63);
    $.__views.__alloyId64 = Ti.UI.createLabel({
        width: "94%",
        top: "30dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#999999",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "Armed To Hold Up Against Any External Weather Conditions.",
        id: "__alloyId64"
    });
    $.__views.__alloyId60.add($.__views.__alloyId64);
    $.__views.__alloyId65 = Ti.UI.createLabel({
        width: "94%",
        top: "30dp",
        font: {
            fontSize: "13dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#999999",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "For over 50 years, Sunbrella® has been the leader in performance fabrics. And there's good reason people look to Sunbrella first for their fabric needs.",
        id: "__alloyId65"
    });
    $.__views.__alloyId60.add($.__views.__alloyId65);
    $.__views.__alloyId66 = Ti.UI.createView({
        width: "94%",
        height: Titanium.UI.SIZE,
        top: "25dp",
        id: "__alloyId66"
    });
    $.__views.__alloyId60.add($.__views.__alloyId66);
    $.__views.__alloyId67 = Ti.UI.createLabel({
        width: "33%",
        height: "50dp",
        font: {
            fontSize: "35dp",
            fontFamily: "icomoon"
        },
        color: "#999999",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        left: 0,
        text: Alloy.Globals.icon.fadeProof,
        id: "__alloyId67"
    });
    $.__views.__alloyId66.add($.__views.__alloyId67);
    $.__views.__alloyId68 = Ti.UI.createLabel({
        width: "33%",
        height: "50dp",
        font: {
            fontSize: "35dp",
            fontFamily: "icomoon"
        },
        color: "#999999",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: Alloy.Globals.icon.waterResist,
        id: "__alloyId68"
    });
    $.__views.__alloyId66.add($.__views.__alloyId68);
    $.__views.__alloyId69 = Ti.UI.createLabel({
        width: "33%",
        height: "50dp",
        font: {
            fontSize: "35dp",
            fontFamily: "icomoon"
        },
        color: "#999999",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        right: 0,
        text: Alloy.Globals.icon.breathable,
        id: "__alloyId69"
    });
    $.__views.__alloyId66.add($.__views.__alloyId69);
    $.__views.__alloyId70 = Ti.UI.createView({
        width: "94%",
        height: Titanium.UI.SIZE,
        top: "12dp",
        id: "__alloyId70"
    });
    $.__views.__alloyId60.add($.__views.__alloyId70);
    $.__views.__alloyId71 = Ti.UI.createLabel({
        width: "33%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "9dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#999999",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "FADE PROOF",
        left: 0,
        id: "__alloyId71"
    });
    $.__views.__alloyId70.add($.__views.__alloyId71);
    $.__views.__alloyId72 = Ti.UI.createLabel({
        width: "33%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "9dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#999999",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "WATER & STAIN \nRESISTANCE",
        id: "__alloyId72"
    });
    $.__views.__alloyId70.add($.__views.__alloyId72);
    $.__views.__alloyId73 = Ti.UI.createLabel({
        width: "33%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "9dp",
            fontFamily: "futura_medium_bt-webfont"
        },
        color: "#999999",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "BREATHABLE",
        right: 0,
        id: "__alloyId73"
    });
    $.__views.__alloyId70.add($.__views.__alloyId73);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    touchEffect.createTouchEffect($.viewAllAwards, "#a6333333", "#333333");
    $.header.getView("cartContainer").setVisible(false);
    $.header.getView("searchLbl").setVisible(false);
    $.header.getView("overFlowMenuLbl").setVisible(false);
    $.header.init({
        title: "ABOUT US",
        passWindow: $.aboutUs
    });
    $.header.updateCartCount();
    googleAnalyticsScreen("ABOUT US");
    $.viewAllAwards.addEventListener("click", function(e) {
        Titanium.Platform.openURL(Alloy.Globals.ddecorUrl + "about-us#about-awards");
    });
    $.infrastructure.addEventListener("click", function(e) {
        Titanium.Platform.openURL(Alloy.Globals.ddecorUrl + "about-us#about-infrastructure");
    });
    __defers["$.__views.aboutUs!focus!updateCount"] && $.addListener($.__views.aboutUs, "focus", updateCount);
    __defers["$.__views.aboutUs!close!clearMemory"] && $.addListener($.__views.aboutUs, "close", clearMemory);
    __defers["$.__views.__alloyId55!click!openIntPage"] && $.addListener($.__views.__alloyId55, "click", openIntPage);
    __defers["$.__views.__alloyId56!click!openIntPage"] && $.addListener($.__views.__alloyId56, "click", openIntPage);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;