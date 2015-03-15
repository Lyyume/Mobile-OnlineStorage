var tool = function(){
    var public = {
        deBounce: function (fn,delay) {
            var timer = null;
            return function(){
                var context = this, args = arguments;
                clearTimeout(timer);
                timer = setTimeout(function(){
                    fn.apply(context, args);
                }, delay);
            };
        },
        renderStyle: function(ele,css,num){
            num = num || false;
            if(num){
                return +window.getComputedStyle(ele,null)[css+''].match(/\d*/)[0];
            }
            else{
                return window.getComputedStyle(ele,null)[css+'']
            }
        },
        mySome: function(arr,str){
            for(var i = 0;i < arr.length;i++){
                if (arr[i] === str){
                    return true
                }
                else{
                    continue
                }
            }
            return false
        },
        touchWP: function(ele,type,fn,phase){
            function toWP(type){
                switch (type){
                    case 'touchstart':
                        return 'MSPointerDown';
                    case 'touchmove':
                        return 'MSPointerMove';
                    case 'touchend':
                        return 'MSPointerUp';
                }
                return '';
            }

            if (window.navigator.msPointerEnabled) {
                ele.addEventListener(toWP(type),fn,phase)
            }
            else {
                ele.addEventListener(type,fn,phase)
            }
        },
        cssAniEvent: function(ele,type,fn){
            ele.addEventListener('webkit' + type ,fn ,false);
            ele.addEventListener(type.toLowerCase() ,fn ,false)
        }
    };
    return public
}();