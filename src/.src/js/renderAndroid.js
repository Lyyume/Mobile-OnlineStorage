var renderAndroid = function(){
    var public = {
        createFirst: function(){
            var div = document.createElement('div'),
                divHeight = document.documentElement.clientHeight - 56 + 'px';
            div.style.height = divHeight;
            div.innerHTML = '未在缓存中找到数据，请下拉刷新';
            div.id = 'first';
            article.appendChild(div);
        },
        pageIni: function(){
            if(_configFB){
                var fb = document.createElement('div'),
                    fbIcon = document.createElement('div');
                fb.id = 'floatButton';
                fbIcon.id = 'floatButton-icon';
                fbIcon.innerHTML = '+';
                fb.appendChild(fbIcon);
                body.appendChild(fb);
                tool.touchWP(fb,'touchend',function(){
                    var view = document.createElement('div'),
                        shade = document.createElement('div'),
                        ok;
                    fb.classList.remove('ani-FB-show');
                    fb.classList.add('ani-FB-hide');
                    shade.classList.add('shade');
                    view.classList.add('view');
                    view.innerHTML = '<div>这个按钮只是一个DEMO！<br>你可以在设置里关掉它<br>请使用带有LocalStorage的浏览器访问本页<br>推荐使用移动版chrome</div><span id="view-ok">好的</span>';
                    shade.appendChild(view);
                    body.appendChild(shade);
                    view.style.marginTop = -tool.renderStyle(view,'height',true)/2 + 'px';
                    console.log(-tool.renderStyle(view,'height',true)/2 + 'px');
                    ok = document.getElementById('view-ok');
                    tool.touchWP(ok,'touchend',function(){
                        body.removeChild(shade);
                        fb.classList.remove('ani-FB-hide');
                        fb.classList.add('ani-FB-show');
                    });
                });
            }else{
                var _fb = document.getElementById('floatButton');
                body.removeChild(_fb);
                while(true){
                    _fb = document.getElementById('floatButton');
                    if(_fb){
                        body.removeChild(_fb);
                    }
                    else{
                        break;
                    }
                }
            }
        },
        eventReg: function(){
            tool.touchWP(menu,'touchend',function(){
                var shade = document.createElement('div');
                shade.classList.add('shade');
                body.appendChild(shade);
                aside.classList.remove('ani-aside-hide');
                aside.classList.add('ani-aside-show');
                tool.touchWP(shade,'touchend',function(){
                    aside.classList.remove('ani-aside-show');
                    aside.classList.add('ani-aside-hide');
                    body.removeChild(shade);
                })
            });
            tool.touchWP(article,'touchstart',function(e){
                if (window.navigator.msPointerEnabled){
                    return
                }
                if((document.body.scrollTop === 0)){
                    touchStartY = e.targetTouches[0].pageY;
                }
                else{
                    touchStartY = e.targetTouches[0].pageY - document.body.scrollTop
                }
            },true);
            tool.touchWP(article,'touchmove',function(e){
                if (window.navigator.msPointerEnabled){
                    return
                }
                touchMoveY = e.targetTouches[0].pageY - touchStartY;
                if(document.body.scrollTop === 0){
                    article.style.marginTop = touchMoveY + 'px'
                }
                if(touchMoveY > 100){

                }
                console.log(e.targetTouches[0].pageY - touchStartY + 'px')
            },true);
            tool.touchWP(article,'touchend',function(e){
                if (window.navigator.msPointerEnabled){
                    return
                }
                if(article.style.marginTop){
                    e.stopPropagation();
                }
                if(article.style.marginTop.replace(/px/,'') > 100){
                    ajax.reload();
                }
                article.style.marginTop = null;
            },true);
            tool.touchWP(search,'touchend',function(){
                alert(localStorage.getItem("src"));
                ajax.reload();
            })
        },
        configLoad: function(){
            var configHide = document.getElementById('config-hide'),
                configFB = document.getElementById('config-FB'),
                configClean = document.getElementById('config-clean');

            function configFBChange(){
                var fb = document.getElementById('floatButton');
                _configFB = configFB.checked;
                if(_configFB){
                    renderAndroid.pageIni();
                    fb = document.getElementById('floatButton');
                    fb.classList.remove('ani-FB-hide');
                    fb.classList.add('ani-FB-show');
                }
                else{
                    fb.classList.remove('ani-FB-show');
                    fb.classList.add('ani-FB-hide');
                    setTimeout(function(){
                        renderAndroid.pageIni();
                    },500)
                }
            }

            configHide.addEventListener('change',function(){
                _configHide = configHide.checked;
                removeList();
                renderAndroid.dataLoad(pointer);
            });
            configFB.addEventListener('change',tool.deBounce(configFBChange,500));
            tool.touchWP(configClean,'touchend',function(){
                var view = document.createElement('div'),
                    yes ,no;
                view.classList.add('view');
                view.innerHTML = '<div>您真的要清理本地存储吗？<br>此操作将不可恢复</div><span id="view-yes">确认</span><span id="view-no">取消</span>';
                body.appendChild(view);
                view.style.marginTop = -tool.renderStyle(view,'height',true)/2 + 'px';
                yes = document.getElementById('view-yes');
                no = document.getElementById('view-no');
                tool.touchWP(yes,'touchend',function(e){
                    body.removeChild(view);
                    worker.delLocalStorage();
                },true);
                tool.touchWP(no,'touchend',function(e){
                    body.removeChild(view)
                },true)
            })
        },
        dataLoad: function(obj){
            var fileList = Object.keys(obj),
                toggle = true;
            function animateClick(e,focus){
                var wave = document.createElement('div'),
                    file = document.getElementsByClassName('file'),
                    waveX, waveY;
                wave.classList.add('wave');
                if(window.navigator.msPointerEnabled){
                    if(focus.id.slice(4) === ''){
                        waveX = e.pageX + 'px';
                        waveY = e.pageY - 56 + 'px';
                    }else{
                        waveX = e.pageX + 'px';
                        if (pointer === src){
                            waveY = e.pageY - (focus.id.slice(4) * 73) - 56 + 'px'
                        }
                        else{
                            waveY = e.pageY - (focus.id.slice(4) * 73) - 129 + 'px'
                        }
                    }
                }
                else{
                    if(focus.id.slice(4) === ''){
                        waveX = e.changedTouches[0].pageX + 'px';
                        waveY = e.changedTouches[0].pageY - 56 + 'px';
                    }else{
                        waveX = e.changedTouches[0].pageX + 'px';
                        if (pointer === src){
                            waveY = e.changedTouches[0].pageY - (focus.id.slice(4) * 73) - 56 + 'px'
                        }
                        else{
                            waveY = e.changedTouches[0].pageY - (focus.id.slice(4) * 73) - 129 + 'px'
                        }
                    }
                }
                wave.style.left = waveX;
                wave.style.top = waveY;
                wave.classList.add('ani-file-click-wave');
                focus.appendChild(wave);
                for(var i = 0;i < file.length;i++){
                    file[i].classList.add('ani-file-hide')
                }
            }
            function createBack(){
                var back = document.createElement('div'),
                    type = document.createElement('div'),
                    text = document.createElement('span');
                back.classList.add('file');
                back.id = 'back';
                type.classList.add('life-type-folder');
                text.classList.add('life-text');
                text.innerHTML = '../';
                back.appendChild(type);
                back.appendChild(text);
                article.appendChild(back);
                setTimeout(function(){
                    back.classList.add('ani-file-show')
                },0);
                tool.touchWP(back,'touchend',function(e){  //注册返回按钮事件
                    animateClick(e,this);
                    setTimeout(function(){
                        removeList();
                        arrPoint.length = arrPoint.length - 1;
                        if(arrPoint.length === 0){
                            pointer = src
                        }
                        else{
                            var father = 'src';
                            for(var n = 0;n < arrPoint.length;n++){
                                father = father + '["' + arrPoint[n] + '"]'
                            }
                            pointer = eval(father);
                        }
                        renderAndroid.dataLoad(pointer);
                    },500);
                });
            }
            function createList(list){
                for(var i = 0, No = 0;i < list.length;i++){  //生成文件列表以及注册点击事件
                    var div = document.createElement('div'),
                        type = document.createElement('div'),
                        text = document.createElement('span'),
                        maxWidth = tool.renderStyle(article,'width',true) - 98,
                        ext = {
                            folder:[''],
                            text:['txt','text','html','css','js','json','bat','command'],
                            image:['jpg','jpeg','bmp','png','gif','svg'],
                            audio:['mp3','wav','m4a'],
                            video:['mp4','avi'],
                            other:[]
                        };
                    if(!_configHide && list[i][0] === '.'){
                        continue
                    }
                    if(list[i].substr(0,4) === '____'){
                        continue
                    }
                    div.classList.add('file');
                    div.id = 'file' + No;
                    No = No + 1;
                    div['src'] = list[i];
                    text.classList.add('life-text');
                    text.innerHTML = list[i];
                    if(tool.mySome(ext.folder,pointer[list[i]].____extension)){
                        type.classList.add('life-type-folder');
                    }
                    else if(tool.mySome(ext.text,pointer[list[i]].____extension)){
                        type.classList.add('life-type-text');
                    }
                    else if(tool.mySome(ext.image,pointer[list[i]].____extension)){
                        type.classList.add('life-type-image');
                    }
                    else if(tool.mySome(ext.audio,pointer[list[i]].____extension)){
                        type.classList.add('life-type-audio');
                    }
                    else if(tool.mySome(ext.video,pointer[list[i]].____extension)){
                        type.classList.add('life-type-video');
                    }
                    else{
                        type.classList.add('life-type-other');
                    }
                    div.appendChild(type);
                    div.appendChild(text);
                    article.appendChild(div);
                    if(tool.renderStyle(text,'width',true) > maxWidth ){
                        text.innerHTML = text.innerHTML.substr(0,~~maxWidth/18) + '...';
                    }
                    setTimeout(function(div){
                        div.classList.add('ani-file-show');
                    },50 + 50 * i,div);
                    tool.touchWP(div,'touchend',function(e){
                        if(toggle){
                            var target = this['src'];
                            if(pointer[target].____extension === ''){
                                toggle = false;
                                animateClick(e,this);
                                setTimeout(function(){
                                    removeList();
                                    arrPoint.push(target);
                                    pointer = pointer[target];
                                    renderAndroid.dataLoad(pointer);
                                },500);
                            }
                            else if(tool.mySome(ext.text,pointer[target].____extension)){
                                worker.regLocalStorage(JSON.stringify(pointer[target]),'Text');
                                if (window.navigator.msPointerEnabled){
                                    setTimeout(function(){
                                        window.location = './.open/text.html';
                                    },0)
                                }
                                else{
                                    setTimeout(function(){
                                        window.open('./.open/text.html');
                                    },0);
                                }
                            }
                            else if(tool.mySome(ext.image,pointer[target].____extension)){
                                worker.regLocalStorage(JSON.stringify(pointer[target]),'Image');
                                if (window.navigator.msPointerEnabled){
                                    setTimeout(function(){
                                        window.location = './.open/image.html';
                                    },0)
                                }
                                else{
                                    setTimeout(function(){
                                        window.open('./.open/image.html');
                                    },0);
                                }
                            }
                            else if(tool.mySome(ext.audio,pointer[target].____extension)){
                                worker.regLocalStorage(JSON.stringify(pointer[target]),'Audio');
                                if (window.navigator.msPointerEnabled){
                                    setTimeout(function(){
                                        window.location = './.open/audio.html';
                                    },0)
                                }
                                else{
                                    setTimeout(function(){
                                        window.open('./.open/audio.html');
                                    },0);
                                }
                            }
                            else if(tool.mySome(ext.video,pointer[target].____extension)){
                                worker.regLocalStorage(JSON.stringify(pointer[target]),'Video');
                                if (window.navigator.msPointerEnabled){
                                    setTimeout(function(){
                                        window.location = './.open/video.html';
                                    },0)
                                }
                                else{
                                    setTimeout(function(){
                                        window.open('./.open/video.html');
                                    },0);
                                }
                            }
                        }
                    })
                }
                if(obj === src){
                    title.innerHTML = window.location.origin.replace(/^\w+:\/\//,'');
                    pageSet();
                }
                else{
                    var m = '.';
                    for(var n = 0;n < arrPoint.length;n++){
                        m = m + '/' + arrPoint[n];
                    }
                    title.innerHTML = m;
                    pageSet();
                }

            }
            removeList();
            if(obj !== src){
                createBack();
            }
            createList(fileList);
        }
    };

    var body = document.body,
        top = document.getElementById('top'),
        menu = document.getElementById('menu'),
        search = document.getElementById('search'),
        aside = document.getElementById('aside'),
        article = document.getElementById('article'),
        back = document.getElementById('back'),
        title = document.getElementById('title');

    function removeList(){
        var file = Array.prototype.slice.call(document.getElementsByClassName('file')),
            first = document.getElementById('first');
        for(var n = 0;n < file.length;n++){
            article.removeChild(file[n]);
        }
        if(first){
            article.removeChild(first);
        }
    }
    function pageSet(){
        title.style.marginTop = (- ( tool.renderStyle(title,'height',true) / 2 )) + 'px';
    }
    return public
}();