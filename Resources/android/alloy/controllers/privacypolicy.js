function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function destroyWindow(e) {
        Alloy.Globals.popWindowInNav();
        $.privacyPolicy.close();
        $.removeListener();
        $.superView.removeAllChildren();
        args = {};
        $.destroy();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "privacypolicy";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.privacyPolicy = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        windowSoftInputMode: Titanium.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        id: "privacyPolicy"
    });
    $.__views.privacyPolicy && $.addTopLevelView($.__views.privacyPolicy);
    destroyWindow ? $.addListener($.__views.privacyPolicy, "close", destroyWindow) : __defers["$.__views.privacyPolicy!close!destroyWindow"] = true;
    $.__views.superView = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        backgroundColor: "#231f20",
        id: "superView"
    });
    $.__views.privacyPolicy.add($.__views.superView);
    $.__views.__alloyId1144 = Ti.UI.createView({
        top: "20dp",
        zIndex: "100",
        width: Titanium.UI.FILL,
        height: "40dp",
        id: "__alloyId1144"
    });
    $.__views.superView.add($.__views.__alloyId1144);
    $.__views.__alloyId1145 = Ti.UI.createLabel({
        left: "20dp",
        height: Titanium.UI.FILL,
        font: {
            fontSize: "16dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        text: "PRIVACY POLICY",
        id: "__alloyId1145"
    });
    $.__views.__alloyId1144.add($.__views.__alloyId1145);
    $.__views.refundCloseLbl = Ti.UI.createLabel({
        right: "15dp",
        width: "40dp",
        height: "40dp",
        font: {
            fontSize: "20dp",
            fontFamily: "icomoon"
        },
        color: "#ffffff",
        text: Alloy.Globals.icon.close,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "refundCloseLbl"
    });
    $.__views.__alloyId1144.add($.__views.refundCloseLbl);
    $.__views.__alloyId1146 = Ti.UI.createScrollView({
        layout: "vertical",
        top: "60dp",
        id: "__alloyId1146"
    });
    $.__views.superView.add($.__views.__alloyId1146);
    $.__views.__alloyId1147 = Ti.UI.createView({
        left: "20dp",
        right: "20dp",
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId1147"
    });
    $.__views.__alloyId1146.add($.__views.__alloyId1147);
    $.__views.__alloyId1148 = Ti.UI.createView({
        top: "20dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId1148"
    });
    $.__views.__alloyId1147.add($.__views.__alloyId1148);
    $.__views.__alloyId1149 = Ti.UI.createLabel({
        font: {
            fontSize: "13dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        text: "You hereby consent and agree that You have read and fully understood the Privacy Policy of the Mobile Application.\n	The User further consents that the terms and contents of such Privacy Policy are acceptable to him.",
        id: "__alloyId1149"
    });
    $.__views.__alloyId1148.add($.__views.__alloyId1149);
    $.__views.__alloyId1150 = Ti.UI.createView({
        top: "30dp",
        height: "0.5dp",
        width: Titanium.UI.FILL,
        backgroundColor: "#999999",
        id: "__alloyId1150"
    });
    $.__views.__alloyId1146.add($.__views.__alloyId1150);
    $.__views.questions = Ti.UI.createView({
        left: "20dp",
        right: "20dp",
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "questions"
    });
    $.__views.__alloyId1146.add($.__views.questions);
    $.__views.__alloyId1151 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId1151"
    });
    $.__views.questions.add($.__views.__alloyId1151);
    $.__views.__alloyId1152 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        top: "30dp",
        id: "__alloyId1152"
    });
    $.__views.__alloyId1151.add($.__views.__alloyId1152);
    $.__views.__alloyId1153 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        text: "LIMITED USER",
        type: "questionText",
        id: "__alloyId1153"
    });
    $.__views.__alloyId1152.add($.__views.__alloyId1153);
    $.__views.__alloyId1154 = Ti.UI.createLabel({
        right: 0,
        width: "10%",
        color: "#ffffff",
        font: {
            fontSize: "12dp",
            fontFamily: "icomoon"
        },
        text: Alloy.Globals.icon.downArrow,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        type: "questionText",
        id: "__alloyId1154"
    });
    $.__views.__alloyId1152.add($.__views.__alloyId1154);
    $.__views.__alloyId1155 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId1155"
    });
    $.__views.__alloyId1151.add($.__views.__alloyId1155);
    $.__views.__alloyId1156 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "The User agrees and undertakes not to reverse engineer, modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information or software obtained from the Mobile Application. Limited reproduction and copying of the content of the Mobile Application is permitted provided that D'decor (www.ddecor.com) name is stated as the source and prior written permission of D'decor (www.ddecor.com) is sought. For the removal of doubt, it is clarified that unlimited or wholesale reproduction, copying of the content for commercial or noncommercial purposes and unwarranted modification of data and information within the content of the Mobile Application is not permitted",
        bottom: "8dp",
        id: "__alloyId1156"
    });
    $.__views.__alloyId1155.add($.__views.__alloyId1156);
    $.__views.__alloyId1157 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId1157"
    });
    $.__views.questions.add($.__views.__alloyId1157);
    $.__views.__alloyId1158 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId1158"
    });
    $.__views.__alloyId1157.add($.__views.__alloyId1158);
    $.__views.__alloyId1159 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        text: "INTELLECTUAL PROPERTY",
        type: "questionText",
        id: "__alloyId1159"
    });
    $.__views.__alloyId1158.add($.__views.__alloyId1159);
    $.__views.__alloyId1160 = Ti.UI.createLabel({
        right: 0,
        width: "10%",
        color: "#ffffff",
        font: {
            fontSize: "12dp",
            fontFamily: "icomoon"
        },
        text: Alloy.Globals.icon.downArrow,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        type: "questionText",
        id: "__alloyId1160"
    });
    $.__views.__alloyId1158.add($.__views.__alloyId1160);
    $.__views.__alloyId1161 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId1161"
    });
    $.__views.__alloyId1157.add($.__views.__alloyId1161);
    $.__views.__alloyId1162 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "D'decor and its suppliers and licensors expressly reserve all intellectual property rights in all text, programs, products, processes, technology, content and other materials, which appear on this Site. Access to this Site does not confer and shall not be considered as conferring upon anyone any license under any of Our or any third party's intellectual property rights. All rights, including copyright, in this Mobile Application are owned by or licensed to D'decor. Any use of this Mobile Application or its contents, including copying or storing it or them in whole or part, other than for your own personal, non-commercial use is prohibited without the permission of D'decor. You may not modify, distribute or re-post anything on this Mobile Application for any purpose.\n	The D'decor names and logos and all related product and service names, design marks and slogans are the trademarks or service marks of D'decor. All other marks are the property of their respective companies. No trademark or service mark license is granted in connection with the materials contained on this Site. Access to this Site does not authorize anyone to use any name, logo or mark in any manner. References on this Site to any names, marks, products or services of third parties or hypertext links to third party sites or information are provided solely as a convenience to you and do not in any way constitute or imply Our endorsement, sponsorship or recommendation of the third party, information, product or service.\n	We are not responsible for the content of any third party sites and do not make any representations regarding the content or accuracy of material on such sites. If you decide to link to any such third party Mobile Applications, you do so entirely at your own risk.\n	All materials, including images, text, illustrations, designs, icons, photographs, programs, music clips or downloads, video clips and written and other materials that are part of this Site (collectively, the \"Contents\") are intended solely for personal, non-commercial use. You may download or copy the Contents and other downloadable materials displayed on the Site for your personal use only. No right, title or interest in any downloaded materials or software is transferred to you as a result of any such downloading or copying. You may not reproduce (except as noted above), publish, transmit, distribute, display, modify, create derivative works from, sell or participate in any sale of or exploit in any way, in whole or in part, any of the Contents, the Site or any related software. All software used on this Site is the property of D'decor or its suppliers and protected by Indian and international copyright laws. The Contents and software on this Site may be used only as a shopping resource. Any other use, including the reproduction, modification, distribution, transmission, republication, display, or performance, of the Contents on this Site is strictly prohibited.",
        bottom: "8dp",
        id: "__alloyId1162"
    });
    $.__views.__alloyId1161.add($.__views.__alloyId1162);
    $.__views.__alloyId1163 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId1163"
    });
    $.__views.questions.add($.__views.__alloyId1163);
    $.__views.__alloyId1164 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId1164"
    });
    $.__views.__alloyId1163.add($.__views.__alloyId1164);
    $.__views.__alloyId1165 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        text: "USER WARRANTY & REPRESENTATION",
        type: "questionText",
        id: "__alloyId1165"
    });
    $.__views.__alloyId1164.add($.__views.__alloyId1165);
    $.__views.__alloyId1166 = Ti.UI.createLabel({
        right: 0,
        width: "10%",
        color: "#ffffff",
        font: {
            fontSize: "12dp",
            fontFamily: "icomoon"
        },
        text: Alloy.Globals.icon.downArrow,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        type: "questionText",
        id: "__alloyId1166"
    });
    $.__views.__alloyId1164.add($.__views.__alloyId1166);
    $.__views.__alloyId1167 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId1167"
    });
    $.__views.__alloyId1163.add($.__views.__alloyId1167);
    $.__views.__alloyId1168 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "The User guarantees, warrants, and certifies that You are the owner of the content which you submit or otherwise authorized to use the content and that the content does not infringe upon the property rights, intellectual property rights or other rights of others.",
        bottom: "8dp",
        id: "__alloyId1168"
    });
    $.__views.__alloyId1167.add($.__views.__alloyId1168);
    $.__views.__alloyId1169 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId1169"
    });
    $.__views.questions.add($.__views.__alloyId1169);
    $.__views.__alloyId1170 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId1170"
    });
    $.__views.__alloyId1169.add($.__views.__alloyId1170);
    $.__views.__alloyId1171 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        text: "INDEMNITY",
        type: "questionText",
        id: "__alloyId1171"
    });
    $.__views.__alloyId1170.add($.__views.__alloyId1171);
    $.__views.__alloyId1172 = Ti.UI.createLabel({
        right: 0,
        width: "10%",
        color: "#ffffff",
        font: {
            fontSize: "12dp",
            fontFamily: "icomoon"
        },
        text: Alloy.Globals.icon.downArrow,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        type: "questionText",
        id: "__alloyId1172"
    });
    $.__views.__alloyId1170.add($.__views.__alloyId1172);
    $.__views.__alloyId1173 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId1173"
    });
    $.__views.__alloyId1169.add($.__views.__alloyId1173);
    $.__views.__alloyId1174 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "You agree to defend, indemnify and hold harmless D'decor, its employees, directors, officers, agents and their successors and assigns from and against any and all claims, liabilities, damages, losses, costs and expenses, including attorney's fees, caused by or arising out of claims based upon your actions or inactions, which may result in any loss or liability to Us or any third party including but not limited to breach of any warranties, representations or undertakings or in relation to the non-fulfillment of any of your obligations under these Terms or arising out of the your violation of any applicable laws, regulations including but not limited to Intellectual Property Rights, payment of statutory dues and taxes, claim of libel, defamation, violation of rights of privacy or publicity, loss of service by other subscribers and infringement of intellectual property or other rights. This clause shall survive the expiry or termination of these Terms.",
        bottom: "18dp",
        id: "__alloyId1174"
    });
    $.__views.__alloyId1173.add($.__views.__alloyId1174);
    $.__views.__alloyId1175 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId1175"
    });
    $.__views.questions.add($.__views.__alloyId1175);
    $.__views.__alloyId1176 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId1176"
    });
    $.__views.__alloyId1175.add($.__views.__alloyId1176);
    $.__views.__alloyId1177 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        text: "TERMINATION",
        type: "questionText",
        id: "__alloyId1177"
    });
    $.__views.__alloyId1176.add($.__views.__alloyId1177);
    $.__views.__alloyId1178 = Ti.UI.createLabel({
        right: 0,
        width: "10%",
        color: "#ffffff",
        font: {
            fontSize: "12dp",
            fontFamily: "icomoon"
        },
        text: Alloy.Globals.icon.downArrow,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        type: "questionText",
        id: "__alloyId1178"
    });
    $.__views.__alloyId1176.add($.__views.__alloyId1178);
    $.__views.__alloyId1179 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId1179"
    });
    $.__views.__alloyId1175.add($.__views.__alloyId1179);
    $.__views.__alloyId1180 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "We may suspend or terminate your use of the Mobile Application or any service if we believe, in our sole and absolute discretion that You have breached any of the Terms. We may also in our sole discretion and at any time discontinue providing the service, or any part thereof. Termination of your access to the use of the Mobile Application may be effected without prior notice to you, and you acknowledge and agree that We may immediately bar any further access to the Mobile Application\n	If You or We terminates your use of the Mobile Application or any service, We may delete any content or other materials relating to your use of the Mobile Application and will have no liability to you or any third party for doing so. You shall be liable to pay for any service or product that you have already ordered till the time of Termination by either party whatsoever.",
        bottom: "18dp",
        id: "__alloyId1180"
    });
    $.__views.__alloyId1179.add($.__views.__alloyId1180);
    $.__views.__alloyId1181 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId1181"
    });
    $.__views.questions.add($.__views.__alloyId1181);
    $.__views.__alloyId1182 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId1182"
    });
    $.__views.__alloyId1181.add($.__views.__alloyId1182);
    $.__views.__alloyId1183 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        text: "DISCLAIMER OF WARRANTIES",
        type: "questionText",
        id: "__alloyId1183"
    });
    $.__views.__alloyId1182.add($.__views.__alloyId1183);
    $.__views.__alloyId1184 = Ti.UI.createLabel({
        right: 0,
        width: "10%",
        color: "#ffffff",
        font: {
            fontSize: "12dp",
            fontFamily: "icomoon"
        },
        text: Alloy.Globals.icon.downArrow,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        type: "questionText",
        id: "__alloyId1184"
    });
    $.__views.__alloyId1182.add($.__views.__alloyId1184);
    $.__views.__alloyId1185 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId1185"
    });
    $.__views.__alloyId1181.add($.__views.__alloyId1185);
    $.__views.__alloyId1186 = Ti.UI.createView({
        top: "8dp",
        bottom: "8dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId1186"
    });
    $.__views.__alloyId1185.add($.__views.__alloyId1186);
    $.__views.__alloyId1187 = Ti.UI.createView({
        left: 0,
        height: "5dp",
        width: "5dp",
        borderRadius: "2.5dp",
        backgroundColor: "#e65e48",
        top: 5,
        id: "__alloyId1187"
    });
    $.__views.__alloyId1186.add($.__views.__alloyId1187);
    $.__views.__alloyId1188 = Ti.UI.createLabel({
        left: "20dp",
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: 'Your accessing or use of the Mobile Application is at your sole risk. The Mobile Application is provided on an "as is" and "as available" basis. We and our licensors, suppliers, vendors, parent, holding, subsidiary and related companies, affiliates, officers, agents and employees expressly disclaim all warranties of any kind, whether express or implied, including, but not limited to the implied warranties of merchantability, fitness for a particular purpose and non- infringement.',
        id: "__alloyId1188"
    });
    $.__views.__alloyId1186.add($.__views.__alloyId1188);
    $.__views.__alloyId1189 = Ti.UI.createView({
        top: "8dp",
        bottom: "8dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId1189"
    });
    $.__views.__alloyId1185.add($.__views.__alloyId1189);
    $.__views.__alloyId1190 = Ti.UI.createView({
        left: 0,
        height: "5dp",
        width: "5dp",
        borderRadius: "2.5dp",
        backgroundColor: "#e65e48",
        top: 5,
        id: "__alloyId1190"
    });
    $.__views.__alloyId1189.add($.__views.__alloyId1190);
    $.__views.__alloyId1191 = Ti.UI.createLabel({
        left: "20dp",
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "We, our associates and technology partners make no representations or warranties about the accuracy, reliability, completeness, current-ness and/or timeliness of any content, information, software, text, graphics, links or communications provided on or through the use of the Site or that the operation of the Site will be error free and/or uninterrupted. Consequently, we assume no liability whatsoever for any monetary or other damage suffered by you on account of the delay, failure, interruption, or corruption of any data or other information transmitted in connection with use of the Site; and/or any interruption or errors in the operation of the Site.",
        id: "__alloyId1191"
    });
    $.__views.__alloyId1189.add($.__views.__alloyId1191);
    $.__views.__alloyId1192 = Ti.UI.createView({
        top: "8dp",
        bottom: "8dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId1192"
    });
    $.__views.__alloyId1185.add($.__views.__alloyId1192);
    $.__views.__alloyId1193 = Ti.UI.createView({
        left: 0,
        height: "5dp",
        width: "5dp",
        borderRadius: "2.5dp",
        backgroundColor: "#e65e48",
        top: 5,
        id: "__alloyId1193"
    });
    $.__views.__alloyId1192.add($.__views.__alloyId1193);
    $.__views.__alloyId1194 = Ti.UI.createLabel({
        left: "20dp",
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: 'We and our licensors, suppliers, vendors, parent, holding, subsidiary and related companies, affiliates, officers, agents and employees make no warranty that\n	The service will meet your requirements\n	The service will be uninterrupted, timely, secure, or error-free	\n	The service will be accessible at any time or at all times via the channel selected or used by you			\n	The information, content or advertisements (collectively, the "materials") contained on, distributed through, or linked, downloaded or accessed from or through the service, or the results that may be obtained from the use of the service, will be accurate or reliable.\n	This disclaimer does not apply to any product warranty offered by the manufacturer of the product as specified in the product specifications. This disclaimer constitutes an essential part of the Terms.',
        id: "__alloyId1194"
    });
    $.__views.__alloyId1192.add($.__views.__alloyId1194);
    $.__views.__alloyId1195 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId1195"
    });
    $.__views.questions.add($.__views.__alloyId1195);
    $.__views.__alloyId1196 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId1196"
    });
    $.__views.__alloyId1195.add($.__views.__alloyId1196);
    $.__views.__alloyId1197 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        text: "LIMITATION OF LIABILITY",
        type: "questionText",
        id: "__alloyId1197"
    });
    $.__views.__alloyId1196.add($.__views.__alloyId1197);
    $.__views.__alloyId1198 = Ti.UI.createLabel({
        right: 0,
        width: "10%",
        color: "#ffffff",
        font: {
            fontSize: "12dp",
            fontFamily: "icomoon"
        },
        text: Alloy.Globals.icon.downArrow,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        type: "questionText",
        id: "__alloyId1198"
    });
    $.__views.__alloyId1196.add($.__views.__alloyId1198);
    $.__views.__alloyId1199 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId1199"
    });
    $.__views.__alloyId1195.add($.__views.__alloyId1199);
    $.__views.__alloyId1200 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "To the fullest extent permitted under applicable law, We, our associates, parent companies, or suppliers shall not be liable for any indirect, incidental, special, incidental, consequential or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data or other intangible losses arising out of or in connection with the Site, its services or these Terms.\n	Without prejudice to the generality of the section above, Our total liability to you for all liabilities arising out of these Terms be it in tort or contract is limited to the value of the product ordered by you.",
        bottom: "8dp",
        id: "__alloyId1200"
    });
    $.__views.__alloyId1199.add($.__views.__alloyId1200);
    $.__views.__alloyId1201 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId1201"
    });
    $.__views.questions.add($.__views.__alloyId1201);
    $.__views.__alloyId1202 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId1202"
    });
    $.__views.__alloyId1201.add($.__views.__alloyId1202);
    $.__views.__alloyId1203 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        text: "MOBILE APPLICATION SECURITY",
        type: "questionText",
        id: "__alloyId1203"
    });
    $.__views.__alloyId1202.add($.__views.__alloyId1203);
    $.__views.__alloyId1204 = Ti.UI.createLabel({
        right: 0,
        width: "10%",
        color: "#ffffff",
        font: {
            fontSize: "12dp",
            fontFamily: "icomoon"
        },
        text: Alloy.Globals.icon.downArrow,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        type: "questionText",
        id: "__alloyId1204"
    });
    $.__views.__alloyId1202.add($.__views.__alloyId1204);
    $.__views.__alloyId1205 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId1205"
    });
    $.__views.__alloyId1201.add($.__views.__alloyId1205);
    $.__views.__alloyId1206 = Ti.UI.createView({
        top: "8dp",
        bottom: "8dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId1206"
    });
    $.__views.__alloyId1205.add($.__views.__alloyId1206);
    $.__views.__alloyId1207 = Ti.UI.createView({
        left: 0,
        height: "5dp",
        width: "5dp",
        borderRadius: "2.5dp",
        backgroundColor: "#e65e48",
        top: 5,
        id: "__alloyId1207"
    });
    $.__views.__alloyId1206.add($.__views.__alloyId1207);
    $.__views.__alloyId1208 = Ti.UI.createLabel({
        left: "20dp",
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: 'Your accessing or use of the Mobile Application is at your sole risk. The Mobile Application is provided on an "as is" and "as available" basis. We and our licensors, suppliers, vendors, parent, holding, subsidiary and related companies, affiliates, officers, agents and employees expressly disclaim all warranties of any kind, whether express or implied, including, but not limited to the implied warranties of merchantability, fitness for a particular purpose and non- infringement.',
        id: "__alloyId1208"
    });
    $.__views.__alloyId1206.add($.__views.__alloyId1208);
    $.__views.__alloyId1209 = Ti.UI.createView({
        top: "8dp",
        bottom: "8dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId1209"
    });
    $.__views.__alloyId1205.add($.__views.__alloyId1209);
    $.__views.__alloyId1210 = Ti.UI.createView({
        left: 0,
        height: "5dp",
        width: "5dp",
        borderRadius: "2.5dp",
        backgroundColor: "#e65e48",
        top: 5,
        id: "__alloyId1210"
    });
    $.__views.__alloyId1209.add($.__views.__alloyId1210);
    $.__views.__alloyId1211 = Ti.UI.createLabel({
        left: "20dp",
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "We, our associates and technology partners make no representations or warranties about the accuracy, reliability, completeness, current-ness and/or timeliness of any content, information, software, text, graphics, links or communications provided on or through the use of the Site or that the operation of the Site will be error free and/or uninterrupted. Consequently, we assume no liability whatsoever for any monetary or other damage suffered by you on account of the delay, failure, interruption, or corruption of any data or other information transmitted in connection with use of the Site; and/or any interruption or errors in the operation of the Site.",
        id: "__alloyId1211"
    });
    $.__views.__alloyId1209.add($.__views.__alloyId1211);
    $.__views.__alloyId1212 = Ti.UI.createView({
        top: "8dp",
        bottom: "8dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId1212"
    });
    $.__views.__alloyId1205.add($.__views.__alloyId1212);
    $.__views.__alloyId1213 = Ti.UI.createView({
        left: 0,
        height: "5dp",
        width: "5dp",
        borderRadius: "2.5dp",
        backgroundColor: "#e65e48",
        top: 5,
        id: "__alloyId1213"
    });
    $.__views.__alloyId1212.add($.__views.__alloyId1213);
    $.__views.__alloyId1214 = Ti.UI.createLabel({
        left: "20dp",
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: 'We and our licensors, suppliers, vendors, parent, holding, subsidiary and related companies, affiliates, officers, agents and employees make no warranty that\n	The service will meet your requirements	\n	The service will be uninterrupted, timely, secure, or error-free\n	The service will be accessible at any time or at all times via the channel selected or used by you\n	The information, content or advertisements (collectively, the "materials") contained on, distributed through, or linked, downloaded or accessed from or through the service, or the results that may be obtained from the use of the service, will be accurate or reliable.\n	This disclaimer does not apply to any product warranty offered by the manufacturer of the product as specified in the product specifications. This disclaimer constitutes an essential part of the Terms.',
        id: "__alloyId1214"
    });
    $.__views.__alloyId1212.add($.__views.__alloyId1214);
    $.__views.__alloyId1215 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId1215"
    });
    $.__views.questions.add($.__views.__alloyId1215);
    $.__views.__alloyId1216 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId1216"
    });
    $.__views.__alloyId1215.add($.__views.__alloyId1216);
    $.__views.__alloyId1217 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        text: "FRAUDULENT /DECLINED TRANSACTIONS",
        type: "questionText",
        id: "__alloyId1217"
    });
    $.__views.__alloyId1216.add($.__views.__alloyId1217);
    $.__views.__alloyId1218 = Ti.UI.createLabel({
        right: 0,
        width: "10%",
        color: "#ffffff",
        font: {
            fontSize: "12dp",
            fontFamily: "icomoon"
        },
        text: Alloy.Globals.icon.downArrow,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        type: "questionText",
        id: "__alloyId1218"
    });
    $.__views.__alloyId1216.add($.__views.__alloyId1218);
    $.__views.__alloyId1219 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId1219"
    });
    $.__views.__alloyId1215.add($.__views.__alloyId1219);
    $.__views.__alloyId1220 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "We reserve the right to recover the cost of goods, collection charges and lawyers fees from persons using the Site fraudulently. We reserve the right to initiate legal proceedings against such persons for fraudulent use of the Site and any other unlawful acts or acts or omissions in breach of these terms and conditions.",
        id: "__alloyId1220"
    });
    $.__views.__alloyId1219.add($.__views.__alloyId1220);
    $.__views.__alloyId1221 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId1221"
    });
    $.__views.questions.add($.__views.__alloyId1221);
    $.__views.__alloyId1222 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId1222"
    });
    $.__views.__alloyId1221.add($.__views.__alloyId1222);
    $.__views.__alloyId1223 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        text: "ENTIRE AGREEMENT",
        type: "questionText",
        id: "__alloyId1223"
    });
    $.__views.__alloyId1222.add($.__views.__alloyId1223);
    $.__views.__alloyId1224 = Ti.UI.createLabel({
        right: 0,
        width: "10%",
        color: "#ffffff",
        font: {
            fontSize: "12dp",
            fontFamily: "icomoon"
        },
        text: Alloy.Globals.icon.downArrow,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        type: "questionText",
        id: "__alloyId1224"
    });
    $.__views.__alloyId1222.add($.__views.__alloyId1224);
    $.__views.__alloyId1225 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId1225"
    });
    $.__views.__alloyId1221.add($.__views.__alloyId1225);
    $.__views.__alloyId1226 = Ti.UI.createView({
        top: "8dp",
        bottom: "8dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId1226"
    });
    $.__views.__alloyId1225.add($.__views.__alloyId1226);
    $.__views.__alloyId1227 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "These Terms and Conditions of Use constitute the entire agreement between you and D'decor and govern your use of the Mobile Application, superseding any prior understandings and agreements between you and us and any previous statements or representations from either party to the other party. These Terms do not apply to any affiliate services, third-party content or third- party software that does not or cannot reasonably be deemed to form part of the Mobile Application which may be provided to you by our licensors, suppliers, vendors, parent, holding, subsidiary or related companies, other affiliates or other third parties, which may be subject to additional terms and conditions imposed by that party. You also may be subject to additional terms and conditions that may apply when you use affiliate services, third-party content or third-party software.",
        id: "__alloyId1227"
    });
    $.__views.__alloyId1226.add($.__views.__alloyId1227);
    $.__views.__alloyId1228 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId1228"
    });
    $.__views.questions.add($.__views.__alloyId1228);
    $.__views.__alloyId1229 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId1229"
    });
    $.__views.__alloyId1228.add($.__views.__alloyId1229);
    $.__views.__alloyId1230 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        text: "NON TRANSFERABILITY",
        type: "questionText",
        id: "__alloyId1230"
    });
    $.__views.__alloyId1229.add($.__views.__alloyId1230);
    $.__views.__alloyId1231 = Ti.UI.createLabel({
        right: 0,
        width: "10%",
        color: "#ffffff",
        font: {
            fontSize: "12dp",
            fontFamily: "icomoon"
        },
        text: Alloy.Globals.icon.downArrow,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        type: "questionText",
        id: "__alloyId1231"
    });
    $.__views.__alloyId1229.add($.__views.__alloyId1231);
    $.__views.__alloyId1232 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId1232"
    });
    $.__views.__alloyId1228.add($.__views.__alloyId1232);
    $.__views.__alloyId1233 = Ti.UI.createView({
        top: "8dp",
        bottom: "8dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId1233"
    });
    $.__views.__alloyId1232.add($.__views.__alloyId1233);
    $.__views.__alloyId1234 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "You agree that your account on the Mobile Application is non-transferable and any rights to your Account ID or contents within your account terminate upon your death. Upon receipt of a copy of a death certificate, your account may be terminated and all contents therein permanently deleted.",
        id: "__alloyId1234"
    });
    $.__views.__alloyId1233.add($.__views.__alloyId1234);
    $.__views.__alloyId1235 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId1235"
    });
    $.__views.questions.add($.__views.__alloyId1235);
    $.__views.__alloyId1236 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId1236"
    });
    $.__views.__alloyId1235.add($.__views.__alloyId1236);
    $.__views.__alloyId1237 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        text: "GOVERNING LAW AND JURISDICTION",
        type: "questionText",
        id: "__alloyId1237"
    });
    $.__views.__alloyId1236.add($.__views.__alloyId1237);
    $.__views.__alloyId1238 = Ti.UI.createLabel({
        right: 0,
        width: "10%",
        color: "#ffffff",
        font: {
            fontSize: "12dp",
            fontFamily: "icomoon"
        },
        text: Alloy.Globals.icon.downArrow,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        type: "questionText",
        id: "__alloyId1238"
    });
    $.__views.__alloyId1236.add($.__views.__alloyId1238);
    $.__views.__alloyId1239 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId1239"
    });
    $.__views.__alloyId1235.add($.__views.__alloyId1239);
    $.__views.__alloyId1240 = Ti.UI.createView({
        top: "8dp",
        bottom: "8dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId1240"
    });
    $.__views.__alloyId1239.add($.__views.__alloyId1240);
    $.__views.__alloyId1241 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "These Terms and the relationship between you and us shall be governed by the laws of the Republic of India without regard to its conflict of law provisions. The Courts at Mumbai, India shall have exclusive jurisdiction in any proceedings arising out of these Terms.",
        id: "__alloyId1241"
    });
    $.__views.__alloyId1240.add($.__views.__alloyId1241);
    $.__views.__alloyId1242 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId1242"
    });
    $.__views.questions.add($.__views.__alloyId1242);
    $.__views.__alloyId1243 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        type: "question",
        id: "__alloyId1243"
    });
    $.__views.__alloyId1242.add($.__views.__alloyId1243);
    $.__views.__alloyId1244 = Ti.UI.createLabel({
        left: 0,
        width: "90%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "futura-hv-bt-heavy"
        },
        color: "#e65e48",
        text: "CONTACT US",
        type: "questionText",
        id: "__alloyId1244"
    });
    $.__views.__alloyId1243.add($.__views.__alloyId1244);
    $.__views.__alloyId1245 = Ti.UI.createLabel({
        right: 0,
        width: "10%",
        color: "#ffffff",
        font: {
            fontSize: "12dp",
            fontFamily: "icomoon"
        },
        text: Alloy.Globals.icon.downArrow,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        type: "questionText",
        id: "__alloyId1245"
    });
    $.__views.__alloyId1243.add($.__views.__alloyId1245);
    $.__views.__alloyId1246 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 0,
        layout: "vertical",
        type: "answer",
        top: "18dp",
        id: "__alloyId1246"
    });
    $.__views.__alloyId1242.add($.__views.__alloyId1246);
    $.__views.__alloyId1247 = Ti.UI.createView({
        top: "8dp",
        bottom: "8dp",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId1247"
    });
    $.__views.__alloyId1246.add($.__views.__alloyId1247);
    $.__views.__alloyId1248 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Please send any questions or comments (including all inquiries unrelated to copyright infringement) regarding this",
        id: "__alloyId1248"
    });
    $.__views.__alloyId1247.add($.__views.__alloyId1248);
    $.__views.__alloyId1249 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "GRIEVANCE OFFICER",
        bottom: "8dp",
        id: "__alloyId1249"
    });
    $.__views.__alloyId1246.add($.__views.__alloyId1249);
    $.__views.__alloyId1250 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "SOLITAIRE CORPORATE PARK, S-14, 167 GURU HARGOVINDJI MARG, ANDHERI-GHATKOPAR LINK ROAD CHAKALA, ANDHERI EAST,\nMUMBAI 400093",
        bottom: "8dp",
        id: "__alloyId1250"
    });
    $.__views.__alloyId1246.add($.__views.__alloyId1250);
    $.__views.__alloyId1251 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Toll free number: 1800 103 9008",
        bottom: "18dp",
        id: "__alloyId1251"
    });
    $.__views.__alloyId1246.add($.__views.__alloyId1251);
    $.__views.__alloyId1252 = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontFamily: "futura_lt_bt_light-webfont"
        },
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        text: "Mail id: enquiry@ddecor.com",
        bottom: "18dp",
        id: "__alloyId1252"
    });
    $.__views.__alloyId1246.add($.__views.__alloyId1252);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    googleAnalyticsScreen("PRIVACY POLICY");
    touchEffect.createTouchEffect($.refundCloseLbl, "#a6ffffff", "#ffffff");
    $.questions.addEventListener("click", function(e) {
        switch (e.source.type) {
          case "questionText":
            _.each($.questions.getChildren(), function(value, key) {
                if (0 != value.children[1].height) {
                    value.children[1].height = 0;
                    value.children[0].children[1].text = Alloy.Globals.icon.downArrow;
                }
                value.children[0].type = "questionText";
            });
            e.source.parent.parent.children[1].height = Titanium.UI.SIZE;
            e.source.parent.children[1].text = Alloy.Globals.icon.upArrow;
            e.source.type = "expand";
            break;

          case "expand":
            _.each($.questions.getChildren(), function(value, key) {
                if (0 != value.children[1].height) {
                    value.children[1].height = 0;
                    value.children[0].children[1].text = Alloy.Globals.icon.downArrow;
                }
                value.children[0].type = "questionText";
            });
            e.source.type = "questionText";
        }
    });
    $.refundCloseLbl.addEventListener("click", destroyWindow);
    __defers["$.__views.privacyPolicy!close!destroyWindow"] && $.addListener($.__views.privacyPolicy, "close", destroyWindow);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;