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
            name.innerHTML = src.____name
        },
        pageIni: function(){
            play.style.width = winWid + 'px';
            play.style.height = winWid + 'px';
            control.style.height = winWid / 3 + 'px';
            control.style.top = winWid + 20 + 'px';
            view.style.top = (winHei - winWid / 3 * 4 - 20) / 2 + 'px';
        },
        playerIni: function(){
            var audio = document.getElementById('audio'),
                check ,lengText;
            function audioPlay(){
                var img = document.createElement('img'),
                    playIcon = document.getElementById('play-icon');
                audio.play();
                tool.touchWP(play,'touchend',audioPlay,false,true);
                tool.touchWP(play,'touchend',audioPause);
                play.removeChild(playIcon);
                img.id = 'play-icon';
                img.src = './img/play.png';
                play.appendChild(img);

            }
            function audioPause(){
                var img = document.createElement('img'),
                    playIcon = document.getElementById('play-icon');
                audio.pause();
                tool.touchWP(play,'touchend',audioPause,false,true);
                tool.touchWP(play,'touchend',audioPlay);
                play.removeChild(playIcon);
                img.id = 'play-icon';
                img.src = './img/pause.png';
                play.appendChild(img);
            }
            function getTime(){
                if(audio.duration){
                    clearInterval(checkLoad);
                    time.max = audio.duration;
                }
            }
            function checkTime(){
                time.value = audio.currentTime;
                if ((~~audio.currentTime % 60) < 10){
                    leng.innerHTML = ~~(~~audio.currentTime / 60) + ':0' + ~~audio.currentTime % 60 + '/' +  lengText;
                }
                else{
                    leng.innerHTML = ~~(~~audio.currentTime / 60) + ':' + ~~audio.currentTime % 60 + '/' +  lengText;
                }
            }
            var checkLoad = setInterval(getTime,50);
            audio.preload = 'auto';
            time.value = audio.currentTime;
            volume.value = audio.volume * 100;


            tool.touchWP(audio,'durationchange',function(){
                lengText = ~~(~~audio.duration / 60) + ':' + ~~audio.duration % 60;
                leng.innerHTML = '0:00/' + lengText;
            });
            tool.touchWP(play,'touchend',audioPlay);
            tool.touchWP(volume,'change',function(){
                audio.volume = volume.value * 0.01;
            });
            tool.touchWP(time,'change',function(){
                audio.currentTime = time.value;
                if ((~~audio.currentTime % 60) < 10){
                    leng.innerHTML = ~~(~~audio.currentTime / 60) + ':0' + ~~audio.currentTime % 60 + '/' +  lengText;
                }
                else{
                    leng.innerHTML = ~~(~~audio.currentTime / 60) + ':' + ~~audio.currentTime % 60 + '/' +  lengText;
                }
            });
            tool.touchWP(audio,'play',function(){
                time.value = 100;
                check = setInterval(checkTime,200);
            });
            tool.touchWP(audio,'pause',function(){
                clearInterval(check)
            });
            tool.touchWP(time,'touchstart',function(){
                if(!audio.paused){
                    clearInterval(check)
                }
            });
            tool.touchWP(time,'touchend',function(){
                if(!audio.paused){
                    check = setInterval(checkTime,200);
                }
            });
            tool.touchWP(loop,'touchend',function(){
                function reset(){
                    audio.currentTime = 0;
                    audio.play();
                }
                if(this.style.opacity){
                    this.style.opacity = '';
                    tool.touchWP(audio,'ended',reset,false,true)
                }
                else{
                    this.style.opacity = '0.8';
                    tool.touchWP(audio,'ended',reset)
                }
            })
        }
    };

    var view = document.getElementById('view'),
        stage = document.getElementById('stage'),
        curtain = document.getElementById('curtain'),
        play = document.getElementById('play'),
        volume = document.getElementById('volume'),
        time = document.getElementById('time'),
        control = document.getElementById('control'),
        name = document.getElementById('name'),
        leng = document.getElementById('leng'),
        loop = document.getElementById('loop'),


        winHei = document.documentElement.clientHeight,
        winWid = document.documentElement.clientWidth;

    return public
}();