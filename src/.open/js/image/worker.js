var worker = function(){
    var public = {
        getLocalStorage: function(){
            src = JSON.parse(localStorage.getItem("openImage"));
            worker.getImageSize();
        },
        getImageSize: function(){
            var img = new Image();
            img.src = '../' + src.____src + '?' + Date.parse(new Date());
            var check = function(){
                console.log('width:' + img.width + ',height:' + img.height);
                if(img.width>0 || img.height>0){
                    height = img.height;
                    width = img.width;
                    clearInterval(set);
                    render.createImg();
                }
            };
            var set = setInterval(check,40);
        }
    };

    return public;
}();