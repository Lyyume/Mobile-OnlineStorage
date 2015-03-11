var render = function(){
    var public = {
        pageIni: function(){
            view.style.width = document.documentElement.clientWidth + 'px';
            stage.style.width = document.documentElement.clientWidth - 32 + 'px'
        },
        textLoad: function(){
            stage.textContent = text;
            name.textContent = src.____name;
        }
    };

    var view = document.getElementById('view'),
        stage = document.getElementById('stage'),
        curtain = document.getElementById('curtain'),
        name = document.getElementById('name');

    return public
}();