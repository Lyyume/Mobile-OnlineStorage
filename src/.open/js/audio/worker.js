var worker = function(){
    var public = {
        getLocalStorage: function(){
            src = JSON.parse(localStorage.getItem("openAudio"));
            render.pageIni();
            render.createAudio();
            render.playerIni();
        }
    };

    return public
}();