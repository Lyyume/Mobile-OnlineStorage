var tool = function(){
    var public = {
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
        getImgSize: function(src,fn){
            var img = new Image(),
                height ,width;
            img.src = '../' + src;
            var check = function(){
                console.log('width:' + img.width + ',height:' + img.height);
                if(img.width>0 || img.height>0){
                    height = img.height;
                    width = img.width;
                    clearInterval(set);
                    fn(width,height);
                }
            };
            var set = setInterval(check,40);
        },
        cssAniEvent: function(ele,type,fn){
            ele.addEventListener('webkit' + type ,fn ,false);
            ele.addEventListener(type.toLowerCase() ,fn ,false)
        }
    };

    return public
}();
