var worker = function(){
    var public = {
        getLocalStorage: function(){
            src = JSON.parse(localStorage.getItem("openVideo"));
            render.createAudio();
        }
    };

    return public
}();