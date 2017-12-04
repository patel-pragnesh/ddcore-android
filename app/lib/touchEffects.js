exports.createTouchEffect = function(vwToAddEffect, colorForAnimation, originalColor) {

    // vwToAddEffect.addEventListener('touchstart', function(e) {
    // e.source.color = colorForAnimation !== undefined ? colorForAnimation : originalColor;
    //
    // });
    //
    // vwToAddEffect.addEventListener('touchend', function(e) {
    // e.source.color = originalColor !== undefined ? originalColor : originalColor;
    //
    // });
    //
    // vwToAddEffect.addEventListener('touchcancel', function(e) {
    // e.source.color = originalColor !== undefined ? originalColor : originalColor;
    //
    // });

    vwToAddEffect.removeEventListener('touchstart', _touchStart);
    vwToAddEffect.removeEventListener('touchend', _touchEnd);
    vwToAddEffect.removeEventListener('touchcancel', _touchCancel);

    vwToAddEffect.addEventListener('touchstart', _touchStart);
    vwToAddEffect.addEventListener('touchend', _touchEnd);
    vwToAddEffect.addEventListener('touchcancel', _touchCancel);

    function _touchStart(e) {
        e.source.color = colorForAnimation !== undefined ? colorForAnimation : originalColor;
    }

    function _touchEnd(e) {
        e.source.color = originalColor !== undefined ? originalColor : originalColor;
    }

    function _touchCancel(e) {
        e.source.color = originalColor !== undefined ? originalColor : originalColor;
    }

};


exports.removeTouchEffect = function (){
  
    
};








exports.createTextBlurEffect = function(textFIELD, textSeperator, otherTextSeperator, colorForAnimation, originalColor) {

    textFIELD.addEventListener('focus', function(e) {
        //	e.source.color = colorForAnimation !== undefined ? colorForAnimation : originalColor;
        textSeperator.backgroundColor = colorForAnimation;
        otherTextSeperator.backgroundColor = originalColor;

    });

};
