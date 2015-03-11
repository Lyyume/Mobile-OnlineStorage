var render = function(){
    var public = {
        createAudio: function(){
            var audio = document.createElement('audio'),
                source = document.createElement('source');
            audio.controls = 'controls';
            source.src = '../' + src.____src;
            source.type = 'audio/' + src.____extension;
            audio.appendChild(source);
            stage.appendChild(audio);
            name.textContent = src.____name;
        }
    };

    var view = document.getElementById('view'),
        stage = document.getElementById('stage'),
        curtain = document.getElementById('curtain'),
        name = document.getElementById('name');

    return public
}();