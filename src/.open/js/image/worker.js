var worker = function(){
    var public = {
        getLocalStorage: function(){
            src = JSON.parse(localStorage.getItem("openImageSrc"));
            image = JSON.parse(localStorage.getItem("openImage"));
            list = Object.keys(src).filter(function(str){
                return !!str.match(/.jpg$/) || !!str.match(/.png$/) || !!str.match(/.bmp$/)
            });
            pointer = list.indexOf(image.____name);
            render.createImg();
        }
    };

    return public;
}();
