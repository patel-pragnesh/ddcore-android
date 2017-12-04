exports.createTouchEffect = function(vwToAddEffect, colorForAnimation, originalColor) {
    function _touchStart(e) {
        e.source.color = void 0 !== colorForAnimation ? colorForAnimation : originalColor;
    }
    function _touchEnd(e) {
        e.source.color = void 0 !== originalColor ? originalColor : originalColor;
    }
    function _touchCancel(e) {
        e.source.color = void 0 !== originalColor ? originalColor : originalColor;
    }
    vwToAddEffect.removeEventListener("touchstart", _touchStart);
    vwToAddEffect.removeEventListener("touchend", _touchEnd);
    vwToAddEffect.removeEventListener("touchcancel", _touchCancel);
    vwToAddEffect.addEventListener("touchstart", _touchStart);
    vwToAddEffect.addEventListener("touchend", _touchEnd);
    vwToAddEffect.addEventListener("touchcancel", _touchCancel);
};

exports.removeTouchEffect = function() {};

exports.createTextBlurEffect = function(textFIELD, textSeperator, otherTextSeperator, colorForAnimation, originalColor) {
    textFIELD.addEventListener("focus", function(e) {
        textSeperator.backgroundColor = colorForAnimation;
        otherTextSeperator.backgroundColor = originalColor;
    });
};