'use strict';
(() => {
    var result;
    function onPaste(event) {
        document.removeEventListener('paste', onPaste, true);
        event.stopImmediatePropagation();
        event.preventDefault();
        result = event.clipboardData.getData('text/plain');
    }
    document.addEventListener('paste', onPaste, true);
    document.execCommand('paste');
    return result;
})();
