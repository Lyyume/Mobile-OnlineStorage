var tool=function(){var a={deBounce:function(a,b){var c=null;return function(){var d=this,e=arguments;clearTimeout(c),c=setTimeout(function(){a.apply(d,e)},b)}},renderStyle:function(a,b,c){return c=c||!1,c?+window.getComputedStyle(a,null)[b+""].match(/\d*/)[0]:window.getComputedStyle(a,null)[b+""]},mySome:function(a,b){for(var c=0;c<a.length;c++)if(a[c]===b)return!0;return!1},touchWP:function(a,b,c,d){function e(a){switch(a){case"touchstart":return"MSPointerDown";case"touchmove":return"MSPointerMove";case"touchend":return"MSPointerUp"}return""}window.navigator.msPointerEnabled?a.addEventListener(e(b),c,d):a.addEventListener(b,c,d)},cssAniEvent:function(a,b,c){a.addEventListener("webkit"+b,c,!1),a.addEventListener(b.toLowerCase(),c,!1)}};return a}(),worker=function(){var public={treeToObj:function(tree){function extension(a){var b=a.match(/[.]/g);return null===b?"":1===b.length?hide?"":a.match(/\w+$/)[0]:b.length>1?a.match(/\w+$/)[0]:void 0}function src(a){var b="";if(0===a.length)return b;for(var c=0;c<a.length;c++)b=b+a[c]+"/";return b}var objTree={},arrTree,arrPoint=[],pointer=objTree,buffer="",jump=!1;arrTree=tree.replace(/.\n/,"").split(/\n/);for(var i=0;i<arrTree.length-1;i++){var depth=arrPoint.length+1,_depth=arrTree[i].match(/[|]/g).length,name=arrTree[i].replace(/[|]/g,"").replace(/^\s+/g,""),hide=!!name.match(/^[.]/);if(_depth===depth)pointer[name]={},pointer[name].____name=name,pointer[name].____extension=extension(name),pointer[name].____src="./"+src(arrPoint)+name,pointer[name].____hide=hide,buffer=name;else if(_depth===depth+1)arrPoint.push(buffer),pointer=pointer[buffer],pointer[name]={},pointer[name].____name=name,pointer[name].____extension=extension(name),pointer[name].____src="./"+src(arrPoint)+name,pointer[name].____hide=hide,buffer=name;else if(depth>_depth){var up=depth-_depth;if(arrPoint.length=arrPoint.length-up,0===arrPoint.length)pointer=objTree;else{for(var father="objTree",n=0;n<arrPoint.length;n++)father=father+'["'+arrPoint[n]+'"]';pointer=eval(father)}pointer[name]={},pointer[name].____name=name,pointer[name].____extension=extension(name),pointer[name].____src="./"+src(arrPoint)+name,pointer[name].____hide=hide,buffer=name}}return objTree},setLocalStorage:function(){var a=JSON.stringify(src);localStorage.setItem("src",a)},getLocalStorage:function(){var a=localStorage.getItem("src");null===a?renderAndroid.createFirst():(src=JSON.parse(a),pointer=src,arrPoint=[],renderAndroid.dataLoad(src))},delLocalStorage:function(){localStorage.removeItem("src")},regLocalStorage:function(a,b){localStorage.setItem("open"+b,a)}};return public}(),ajax=function(){var a={reload:function(){var a=new XMLHttpRequest;a.onreadystatechange=function(){4===a.readyState&&200===a.status&&(tree=a.responseText,src=worker.treeToObj(tree),pointer=src,arrPoint=[],worker.setLocalStorage(),renderAndroid.dataLoad(src))},a.open("GET","./tree.txt",!0),a.send()}};return a}(),renderAndroid=function(){function removeList(){for(var a=Array.prototype.slice.call(document.getElementsByClassName("file")),b=document.getElementById("first"),c=0;c<a.length;c++)article.removeChild(a[c]);b&&article.removeChild(b)}function pageSet(){title.style.marginTop=-(tool.renderStyle(title,"height",!0)/2)+"px"}var public={createFirst:function(){var a=document.createElement("div"),b=document.documentElement.clientHeight-56+"px";a.style.height=b,a.innerHTML="未在缓存中找到数据，请下拉刷新",a.id="first",article.appendChild(a)},pageIni:function(){if(_configFB){var a=document.createElement("div"),b=document.createElement("div");a.id="floatButton",b.id="floatButton-icon",b.innerHTML="+",a.appendChild(b),body.appendChild(a),tool.touchWP(a,"touchend",function(){var b,c=document.createElement("div"),d=document.createElement("div");a.classList.remove("ani-FB-show"),a.classList.add("ani-FB-hide"),d.classList.add("shade"),c.classList.add("view"),c.innerHTML='<div>这个按钮只是一个DEMO！<br>你可以在设置里关掉它<br>请使用带有LocalStorage的浏览器访问本页<br>推荐使用移动版chrome</div><span id="view-ok">好的</span>',d.appendChild(c),body.appendChild(d),c.style.marginTop=-tool.renderStyle(c,"height",!0)/2+"px",b=document.getElementById("view-ok"),tool.touchWP(b,"touchend",function(){body.removeChild(d),a.classList.remove("ani-FB-hide"),a.classList.add("ani-FB-show")})})}else{var c=document.getElementById("floatButton");for(body.removeChild(c);;){if(c=document.getElementById("floatButton"),!c)break;body.removeChild(c)}}},eventReg:function(){tool.touchWP(menu,"touchend",function(){var a=document.createElement("div");a.classList.add("shade"),body.appendChild(a),aside.classList.remove("ani-aside-hide"),aside.classList.add("ani-aside-show"),tool.touchWP(a,"touchend",function(){aside.classList.remove("ani-aside-show"),aside.classList.add("ani-aside-hide"),body.removeChild(a)})}),tool.touchWP(article,"touchstart",function(a){window.navigator.msPointerEnabled||(touchStartY=0===document.body.scrollTop?a.targetTouches[0].pageY:a.targetTouches[0].pageY-document.body.scrollTop)},!0),tool.touchWP(article,"touchmove",function(a){window.navigator.msPointerEnabled||(touchMoveY=a.targetTouches[0].pageY-touchStartY,0===document.body.scrollTop&&(article.style.marginTop=touchMoveY+"px"),touchMoveY>100,console.log(a.targetTouches[0].pageY-touchStartY+"px"))},!0),tool.touchWP(article,"touchend",function(a){window.navigator.msPointerEnabled||(article.style.marginTop&&a.stopPropagation(),article.style.marginTop.replace(/px/,"")>100&&ajax.reload(),article.style.marginTop=null)},!0),tool.touchWP(search,"touchend",function(){alert(localStorage.getItem("src")),ajax.reload()})},configLoad:function(){function a(){var a=document.getElementById("floatButton");_configFB=c.checked,_configFB?(renderAndroid.pageIni(),a=document.getElementById("floatButton"),a.classList.remove("ani-FB-hide"),a.classList.add("ani-FB-show")):(a.classList.remove("ani-FB-show"),a.classList.add("ani-FB-hide"),setTimeout(function(){renderAndroid.pageIni()},500))}var b=document.getElementById("config-hide"),c=document.getElementById("config-FB"),d=document.getElementById("config-clean");b.addEventListener("change",function(){_configHide=b.checked,removeList(),renderAndroid.dataLoad(pointer)}),c.addEventListener("change",tool.deBounce(a,500)),tool.touchWP(d,"touchend",function(){var a,b,c=document.createElement("div");c.classList.add("view"),c.innerHTML='<div>您真的要清理本地存储吗？<br>此操作将不可恢复</div><span id="view-yes">确认</span><span id="view-no">取消</span>',body.appendChild(c),c.style.marginTop=-tool.renderStyle(c,"height",!0)/2+"px",a=document.getElementById("view-yes"),b=document.getElementById("view-no"),tool.touchWP(a,"touchend",function(){body.removeChild(c),worker.delLocalStorage()},!0),tool.touchWP(b,"touchend",function(){body.removeChild(c)},!0)})},dataLoad:function(obj){function animateClick(a,b){var c,d,e=document.createElement("div"),f=document.getElementsByClassName("file");e.classList.add("wave"),window.navigator.msPointerEnabled?""===b.id.slice(4)?(c=a.pageX+"px",d=a.pageY-56+"px"):(c=a.pageX+"px",d=pointer===src?a.pageY-73*b.id.slice(4)-56+"px":a.pageY-73*b.id.slice(4)-129+"px"):""===b.id.slice(4)?(c=a.changedTouches[0].pageX+"px",d=a.changedTouches[0].pageY-56+"px"):(c=a.changedTouches[0].pageX+"px",d=pointer===src?a.changedTouches[0].pageY-73*b.id.slice(4)-56+"px":a.changedTouches[0].pageY-73*b.id.slice(4)-129+"px"),e.style.left=c,e.style.top=d,e.classList.add("ani-file-click-wave"),b.appendChild(e);for(var g=0;g<f.length;g++)f[g].classList.add("ani-file-hide")}function createBack(){var back=document.createElement("div"),type=document.createElement("div"),text=document.createElement("span");back.classList.add("file"),back.id="back",type.classList.add("life-type-folder"),text.classList.add("life-text"),text.innerHTML="../",back.appendChild(type),back.appendChild(text),article.appendChild(back),setTimeout(function(){back.classList.add("ani-file-show")},0),tool.touchWP(back,"touchend",function(e){animateClick(e,this),tool.cssAniEvent(back,"AnimationEnd",function(){if(removeList(),arrPoint.length=arrPoint.length-1,0===arrPoint.length)pointer=src;else{for(var father="src",n=0;n<arrPoint.length;n++)father=father+'["'+arrPoint[n]+'"]';pointer=eval(father)}renderAndroid.dataLoad(pointer)})})}function createList(a){for(var b=0,c=0;b<a.length;b++){var d=document.createElement("div"),e=document.createElement("div"),f=document.createElement("span"),g=tool.renderStyle(article,"width",!0)-98,h={folder:[""],text:["txt","text","html","css","js","json","bat","command"],image:["jpg","jpeg","bmp","png","gif","svg"],audio:["mp3","wav","m4a"],video:["mp4","avi"],other:[]};(_configHide||"."!==a[b][0])&&"____"!==a[b].substr(0,4)&&"index.html"!==a[b]&&"tree.txt"!==a[b]&&"create-tree.command"!==a[b]&&"index.haml"!==a[b]&&(d.classList.add("file"),d.id="file"+c,c+=1,d.src=a[b],f.classList.add("life-text"),f.innerHTML=a[b],e.classList.add(tool.mySome(h.folder,pointer[a[b]].____extension)?"life-type-folder":tool.mySome(h.text,pointer[a[b]].____extension)?"life-type-text":tool.mySome(h.image,pointer[a[b]].____extension)?"life-type-image":tool.mySome(h.audio,pointer[a[b]].____extension)?"life-type-audio":tool.mySome(h.video,pointer[a[b]].____extension)?"life-type-video":"life-type-other"),d.appendChild(e),d.appendChild(f),article.appendChild(d),tool.renderStyle(f,"width",!0)>g&&(f.innerHTML=f.innerHTML.substr(0,~~g/18)+"..."),setTimeout(function(a){a.classList.add("ani-file-show")},50+50*b,d),tool.touchWP(d,"touchend",function(a){if(toggle){var b=this.src;""===pointer[b].____extension?(toggle=!1,animateClick(a,this),tool.cssAniEvent(this,"AnimationEnd",function(){removeList(),arrPoint.push(b),pointer=pointer[b],renderAndroid.dataLoad(pointer)})):tool.mySome(h.text,pointer[b].____extension)?(worker.regLocalStorage(JSON.stringify(pointer[b]),"Text"),window.navigator.msPointerEnabled?setTimeout(function(){window.location="./.open/text.html"},0):setTimeout(function(){window.open("./.open/text.html")},0)):tool.mySome(h.image,pointer[b].____extension)?(worker.regLocalStorage(JSON.stringify(pointer[b]),"Image"),worker.regLocalStorage(JSON.stringify(pointer),"ImageSrc"),window.navigator.msPointerEnabled?setTimeout(function(){window.location="./.open/image.html"},0):setTimeout(function(){window.open("./.open/image.html")},0)):tool.mySome(h.audio,pointer[b].____extension)?(worker.regLocalStorage(JSON.stringify(pointer[b]),"Audio"),window.navigator.msPointerEnabled?setTimeout(function(){window.location="./.open/audio.html"},0):setTimeout(function(){window.open("./.open/audio.html")},0)):tool.mySome(h.video,pointer[b].____extension)&&(worker.regLocalStorage(JSON.stringify(pointer[b]),"Video"),window.navigator.msPointerEnabled?setTimeout(function(){window.location="./.open/video.html"},0):setTimeout(function(){window.open("./.open/video.html")},0))}}))}if(obj===src)title.innerHTML=window.location.origin.replace(/^\w+:\/\//,""),pageSet();else{for(var i=".",j=0;j<arrPoint.length;j++)i=i+"/"+arrPoint[j];title.innerHTML=i,pageSet()}}var fileList=Object.keys(obj),toggle=!0;removeList(),obj!==src&&createBack(),createList(fileList)}},body=document.body,top=document.getElementById("top"),menu=document.getElementById("menu"),search=document.getElementById("search"),aside=document.getElementById("aside"),article=document.getElementById("article"),back=document.getElementById("back"),title=document.getElementById("title");return public}(),_configHide=!1,_configFB=!0,touchStartY;renderAndroid.pageIni(),renderAndroid.eventReg(),renderAndroid.configLoad(),worker.getLocalStorage();