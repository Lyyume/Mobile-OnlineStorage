var worker = function(){
    var public = {
        getLocalStorage: function(){
            src = JSON.parse(localStorage.getItem("openAudio"));
            render.createAudio();
        }
    };

    return public
}();