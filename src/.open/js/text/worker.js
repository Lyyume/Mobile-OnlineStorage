var worker = function(){
    var public = {
        getLocalStorage: function(){
            src = JSON.parse(localStorage.getItem("openText"));
            ajax.load();
        }
    };
    return public
}();