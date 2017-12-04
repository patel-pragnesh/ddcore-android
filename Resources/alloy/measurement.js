var dpi = Ti.Platform.displayCaps.dpi, density = Ti.Platform.displayCaps.density;

exports.dpToPX = function(val) {
    return val * dpi / 160;
};

exports.pxToDP = function(val) {
    return val / dpi * 160;
};

exports.pointPXToDP = function(pt) {
    return {
        x: exports.pxToDP(pt.x),
        y: exports.pxToDP(pt.y)
    };
};