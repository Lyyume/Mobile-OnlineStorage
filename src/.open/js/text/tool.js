var tool = function() {
    var public = {
        touchWP: function (ele, type, fn, phase, del) {
            del = del || false;
            function toWP(type) {
                switch (type) {
                    case 'touchstart':
                        return 'MSPointerDown';
                    case 'touchmove':
                        return 'MSPointerMove';
                    case 'touchend':
                        return 'MSPointerUp';
                }
                return '';
            }

            if (del) {
                if (window.navigator.msPointerEnabled) {
                    ele.removeEventListener(toWP(type), fn, phase)
                }
                else {
                    ele.removeEventListener(type, fn, phase)
                }
            }
            else {
                if (window.navigator.msPointerEnabled) {
                    ele.addEventListener(toWP(type), fn, phase)
                }
                else {
                    ele.addEventListener(type, fn, phase)
                }
            }
        }
    };

    return public
}();