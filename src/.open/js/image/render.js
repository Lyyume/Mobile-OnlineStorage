var render = function(){
    var public = {
        pageIni: function(){
            view.style.height = document.documentElement.clientHeight + 'px';
            stage.style.height = document.documentElement.clientHeight - 24 + 'px';
        },
        createImg: function(){
            var img = document.createElement('img');
            img.src = '../' + src.____src;
            if(document.documentElement.clientWidth < width){
                img.width = document.documentElement.clientWidth;
            }
            stage.appendChild(img);
            name.textContent = src.____name;
        }
    };

    var view = document.getElementById('view'),
        stage = document.getElementById('stage'),
        curtain = document.getElementById('curtain'),
        name = document.getElementById('name');

    return public;
}();