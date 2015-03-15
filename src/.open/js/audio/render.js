var render = function(){
    var public = {
        createAudio: function(){
            var audio = document.createElement('audio'),
                source = document.createElement('source');
            audio.controls = 'controls';
            source.src = '../' + src.____src;
            source.type = 'audio/' + src.____extension;
            audio.id = 'audio';
            audio.appendChild(source);
            stage.appendChild(audio);
            name.textContent = src.____name;
        },
        pageIni: function(){
            var audio = document.getElementById('audio'),
                check;
            function audioPlay(){
                audio.play();
                tool.touchWP(play,'touchend',audioPlay,false,true);
                tool.touchWP(play,'touchend',audioPause);
            }
            function audioPause(){
                audio.pause();
                tool.touchWP(play,'touchend',audioPause,false,true);
                tool.touchWP(play,'touchend',audioPlay);
            }
            function getTime(){
                console.log(audio.duration);
                if(audio.duration){
                    clearInterval(checkLoad);
                    time.max = audio.duration;
                }
            }
            function checkTime(){
                time.value = audio.currentTime;
            }
            var checkLoad = setInterval(getTime,50);
            audio.preload = 'auto';

            tool.touchWP(play,'touchend',audioPlay);
            tool.touchWP(volume,'change',function(){
                console.log('volume:' + volume.value);
                audio.volume = volume.value * 0.01;
            });
            tool.touchWP(time,'change',function(){
                console.log('time:' + time.value);
                audio.currentTime = time.value;
            });
            tool.touchWP(audio,'play',function(){
                check = setInterval(checkTime,50);
            });
            tool.touchWP(audio,'pause',function(){
                clearInterval(check)
            });
            tool.touchWP(audio,'playing',function(){
                clearInterval(check)
            });
            tool.touchWP(time,'touchstart',function(){
                if(!audio.paused){
                    clearInterval(check)
                }
            });
            tool.touchWP(time,'touchend',function(){
                if(!audio.paused){
                    check = setInterval(checkTime,50);
                }
            });
        }
    };

    var view = document.getElementById('view'),
        stage = document.getElementById('stage'),
        curtain = document.getElementById('curtain'),
        name = document.getElementById('name'),
        play = document.getElementById('play'),
        volume = document.getElementById('volume'),
        time = document.getElementById('time');

    return public
}();