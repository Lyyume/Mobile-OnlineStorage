var render = function(){
    var public = {
        pageIni: function(){
            view.style.height = winHei + 'px';
            view.style.width = winWid + 'px';
            stage.style.height = winHei - 24 + 'px';
            stage.style.width = winWid + 'px';
            touch.style.height = winHei - 24 + 'px';
            touch.style.width = winWid + 'px';

            document.styleSheets[0].insertRule('@-webkit-keyframes leftOut{ 0%{ margin-left:0px } 100%{ margin-left:-' + winWid + 'px } }', 0);
            document.styleSheets[0].insertRule('.leftOut{ -webkit-animation: leftOut 0.3s; -webkit-animation-fill-mode: forwards; }', 0);
            document.styleSheets[0].insertRule('@-webkit-keyframes rightOut{ 0%{ margin-left:0px } 100%{ margin-left:' + winWid + 'px } }', 0);
            document.styleSheets[0].insertRule('.rightOut{ -webkit-animation: rightOut 0.3s; -webkit-animation-fill-mode: forwards; }', 0);

            document.styleSheets[0].insertRule('@-webkit-keyframes rightIn{ 0%{ margin-left:0px } 100%{ margin-left:-' + winWid + 'px } }', 0);
            document.styleSheets[0].insertRule('.rightIn{ -webkit-animation: rightIn 0.3s; -webkit-animation-fill-mode: forwards; }', 0);
            document.styleSheets[0].insertRule('@-webkit-keyframes leftIn{ 0%{ margin-left:0px } 100%{ margin-left:' + winWid + 'px } }', 0);
            document.styleSheets[0].insertRule('.leftIn{ -webkit-animation: leftIn 0.3s; -webkit-animation-fill-mode: forwards; }', 0);
        },
        eventReg:function(){
            var timer = 0;
            tool.touchWP(left,'touchend',function(){
                console.log('last');
                last();
            });
            tool.touchWP(right,'touchend',function(){
                console.log('next');
                next();
            });
            tool.touchWP(leftCenter,'touchend',function(e){
                e.stopPropagation();
                timer = timer + 1;
                var touch = setTimeout(function(){
                    timer = 0;
                    console.log('last');
                    last();
                },300);
                if(timer === 2){
                    timer = 0;
                    clearTimeout(touch);
                    clearTimeout(touch - 1);
                    console.log('dbTouch');
                }
            });
            tool.touchWP(rightCenter,'touchend',function(e){
                e.stopPropagation();
                timer = timer + 1;
                var touch = setTimeout(function(){
                    timer = 0;
                    console.log('next');
                    next();
                },300);
                if(timer === 2){
                    timer = 0;
                    clearTimeout(touch);
                    clearTimeout(touch - 1);
                    console.log('dbTouch');
                }
            },true);
        },
        createImg: function(){
            var img = document.createElement('img');
            img.src = '../' + src.____src + '/' + list[pointer];
            img.classList.add('pointer');
            tool.getImgSize(src.____src + '/' + list[pointer],create);
            function create(wid,hei){
                if(winWid < wid){
                    img.width = winWid;
                    img.style.top = (winHei - 24 - winWid / wid * hei) / 2 + 'px';
                }
                stage.appendChild(img);
                name.textContent = list[pointer];
                number.textContent = (pointer + 1) + '/' + list.length;
                bufferNext();
            }
        }
    };

    var view = document.getElementById('view'),
        stage = document.getElementById('stage'),
        curtain = document.getElementById('curtain'),
        touch = document.getElementById('touch'),
        left = document.getElementById('left'),
        right = document.getElementById('right'),
        leftCenter = document.getElementById('leftCenter'),
        rightCenter = document.getElementById('rightCenter'),
        name = document.getElementById('name'),
        number = document.getElementById('number'),

        winHei = document.documentElement.clientHeight,
        winWid = document.documentElement.clientWidth;

    function last(){
        if(!!document.getElementsByClassName('next')[0] && pointer !== 0){
            var thisImg = document.getElementsByClassName('pointer')[0],
                nextImg = document.getElementsByClassName('next')[0],
                lastImg;
            thisImg.classList.add('rightOut');
            bufferLast(goLast);
            function goLast(){
                stage.removeChild(thisImg);
                lastImg = document.getElementsByClassName('last')[0];
                lastImg.classList.remove('last');
                lastImg.classList.add('pointer');
                lastImg.classList.add('leftIn');
                stage.removeChild(nextImg);
                pointer = pointer - 1;
                name.textContent = list[pointer];
                number.textContent = (pointer + 1) + '/' + list.length;
                bufferNext();
                tool.cssAniEvent(lastImg,'AnimationEnd',function(){
                    lastImg.style.left = '0px';
                    lastImg.classList.remove('leftIn');
                })
            }
        }
    }
    function next(){
        if(!!document.getElementsByClassName('next')[0] && pointer !== list.length){
            var thisImg = document.getElementsByClassName('pointer')[0],
                nextImg = document.getElementsByClassName('next')[0];
            nextImg.classList.remove('next');
            nextImg.classList.add('pointer');
            thisImg.classList.add('leftOut');
            tool.cssAniEvent(thisImg,'AnimationEnd',function(){
                stage.removeChild(thisImg);
                nextImg.classList.add('rightIn');
                pointer = pointer + 1;
                name.textContent = list[pointer];
                number.textContent = (pointer + 1) + '/' + list.length;
                bufferNext();
            });
            tool.cssAniEvent(nextImg,'AnimationEnd',function(){
                nextImg.style.left = '0px';
                nextImg.classList.remove('rightIn');
            })
        }
    }
    function dbTouch(){

    }
    function bufferNext(){
        var img = document.createElement('img');
        img.src = '../' + src.____src + '/' + list[pointer + 1];
        img.classList.add('next');
        tool.getImgSize(src.____src + '/' + list[pointer + 1],create);
        function create(wid,hei){
            if(winWid < wid){
                img.width = winWid;
                img.style.top = (winHei - 24 - winWid / wid * hei) / 2 + 'px';
            }
            stage.appendChild(img);
            img.style.left = winWid + 'px';
        }
    }
    function bufferLast(fn){
        var img = document.createElement('img');
        img.src = '../' + src.____src + '/' + list[pointer - 1];
        img.classList.add('last');
        tool.getImgSize(src.____src + '/' + list[pointer - 1],create);
        function create(wid,hei){
            if(winWid < wid){
                img.width = winWid;
                img.style.top = (winHei - 24 - winWid / wid * hei) / 2 + 'px';
            }
            stage.appendChild(img);
            img.style.left = - winWid + 'px';
            fn()
        }
    }

    return public;
}();
