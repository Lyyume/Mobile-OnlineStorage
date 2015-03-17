var render = function(){
    var public = {
        pageIni: function(){
            view.style.width = document.documentElement.clientWidth + 'px';
            stage.style.width = document.documentElement.clientWidth - 32 + 'px';
            tool.touchWP(configTouch,'touchend',function(){
                configCard.classList.remove('ani-config-hide');
                configCard.classList.add('ani-config-show');
                tool.touchWP(stage,'touchend',function(){
                    var markCard = document.getElementById('markCard');
                    if(markCard){
                        markCard.parentNode.removeChild(markCard);
                    }
                    configCard.classList.remove('ani-config-show');
                    configCard.classList.add('ani-config-hide');
                })
            })
        },
        textLoad: function(){
            stage.textContent = text;
            name.textContent = src.____name;
        },
        configIni: function(){
            var configSave = document.getElementById('configSave'),
                configLoad = document.getElementById('configLoad'),
                configNight = document.getElementById('configNight'),
                configSize = document.getElementById('configSize'),
                configFormat = document.getElementById('configFormat'),
                night = false,
                size = false,
                format = false;

            var markCard = document.createElement('div'),
                mark1 = document.createElement('div'),
                mark2 = document.createElement('div'),
                mark3 = document.createElement('div');

            function saveMark1(){
                worker.saveMark(1);
            }
            function saveMark2(){
                worker.saveMark(2);
            }
            function saveMark3(){
                worker.saveMark(3);
            }
            function loadMark1(){
                worker.loadMark(1);
            }
            function loadMark2(){
                worker.loadMark(2);
            }
            function loadMark3(){
                worker.loadMark(3);
            }

            markCard.id = 'markCard';
            mark1.innerHTML = '书签1';
            mark2.innerHTML = '书签2';
            mark3.innerHTML = '书签3';
            mark1.classList.add('mark');
            mark2.classList.add('mark');
            mark3.classList.add('mark');
            markCard.appendChild(mark1);
            markCard.appendChild(mark2);
            markCard.appendChild(mark3);


            tool.touchWP(configSave,'touchstart',function(){
                this.style.backgroundColor = '#4FC3F7';
            });
            tool.touchWP(configSave,'touchend',function(){
                this.style.backgroundColor = '#FFFFFF';
                markCard.style.marginTop = '';
                this.appendChild(markCard);
                markCard.classList.add('ani-mark-show');
                tool.touchWP(mark1,'touchend',loadMark1,false,true);
                tool.touchWP(mark2,'touchend',loadMark2,false,true);
                tool.touchWP(mark3,'touchend',loadMark3,false,true);
                tool.touchWP(mark1,'touchend',saveMark1);
                tool.touchWP(mark2,'touchend',saveMark2);
                tool.touchWP(mark3,'touchend',saveMark3);
            });
            tool.touchWP(configLoad,'touchstart',function(){
                this.style.backgroundColor = '#4FC3F7';
            });
            tool.touchWP(configLoad,'touchend',function(){
                this.style.backgroundColor = '#FFFFFF';
                markCard.style.marginTop = '40px';
                this.appendChild(markCard);
                markCard.classList.add('ani-mark-show');
                tool.touchWP(mark1,'touchend',saveMark1,false,true);
                tool.touchWP(mark2,'touchend',saveMark2,false,true);
                tool.touchWP(mark3,'touchend',saveMark3,false,true);
                tool.touchWP(mark1,'touchend',loadMark1);
                tool.touchWP(mark2,'touchend',loadMark2);
                tool.touchWP(mark3,'touchend',loadMark3);
            });
            tool.touchWP(configNight,'touchstart',function(){
                this.style.backgroundColor = '#4FC3F7';
            });
            tool.touchWP(configNight,'touchend',function(){
                this.style.backgroundColor = '#FFFFFF';
                if(night){
                    stage.style.backgroundColor = '#FFFFFF';
                    stage.style.color = '#000000';
                    curtain.style.backgroundColor = '#FFFFFF';
                    curtain.style.color = '#000000';
                    night = false;
                }
                else{
                    stage.style.backgroundColor = '#444444';
                    stage.style.color = '#CCCCCC';
                    curtain.style.backgroundColor = '#444444';
                    curtain.style.color = '#CCCCCC';
                    night = true;
                }
            });
            tool.touchWP(configSize,'touchstart',function(){
                this.style.backgroundColor = '#4FC3F7';
            });
            tool.touchWP(configSize,'touchend',function(){
                this.style.backgroundColor = '#FFFFFF';
                if(size){
                    stage.style.fontSize = '16px';
                    size = false;
                }
                else{
                    stage.style.fontSize = '24px';
                    size = true;
                }
            });
            tool.touchWP(configFormat,'touchstart',function(){
                this.style.backgroundColor = '#4FC3F7';
            });
            tool.touchWP(configFormat,'touchend',function(){
                this.style.backgroundColor = '#FFFFFF';
                if(format){
                    stage.textContent = text;
                    format = false
                }
                else{
                    stage.textContent = text.replace(/ */g,'');
                    format = true;
                }
            });
            tool.touchWP(mark1,'touchstart',function(e){
                e.stopPropagation();
                this.style.backgroundColor = '#4FC3F7';
            },true);
            tool.touchWP(mark1,'touchend',function(e){
                e.stopPropagation();
                this.style.backgroundColor = '#FFFFFF';
            },true);
            tool.touchWP(mark2,'touchstart',function(e){
                e.stopPropagation();
                this.style.backgroundColor = '#4FC3F7';
            },true);
            tool.touchWP(mark2,'touchend',function(e){
                e.stopPropagation();
                this.style.backgroundColor = '#FFFFFF';
            },true);
            tool.touchWP(mark3,'touchstart',function(e){
                e.stopPropagation();
                this.style.backgroundColor = '#4FC3F7';
            },true);
            tool.touchWP(mark3,'touchend',function(e){
                e.stopPropagation();
                this.style.backgroundColor = '#FFFFFF';
            },true);
        }
    };

    var view = document.getElementById('view'),
        stage = document.getElementById('stage'),
        curtain = document.getElementById('curtain'),
        name = document.getElementById('name'),
        moreVert = document.getElementById('moreVert'),
        configCard = document.getElementById('configCard'),
        configTouch = document.getElementById('configTouch'),
        message = document.getElementById('message');

    return public
}();