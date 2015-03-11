var render = function(){
    var public = {
        createAudio: function(){
            var video = document.createElement('video'),
                source = document.createElement('source'),
                height ,width;
            video.controls = 'controls';
            source.src = '../' + src.____src;
            source.type = 'audio/' + src.____extension;
            video.appendChild(source);
            stage.appendChild(video);
            name.textContent = src.____name;
            video.style.width = document.documentElement.clientWidth + 'px';
        }
    };

    var view = document.getElementById('view'),
        stage = document.getElementById('stage'),
        curtain = document.getElementById('curtain'),
        name = document.getElementById('name');

    return public
}();