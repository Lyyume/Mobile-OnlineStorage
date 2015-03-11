var ajax = function(){
    var public = {
        load: function(){
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4){
                    if(xhr.status === 200){
                        text = xhr.responseText;
                        render.textLoad();
                    }
                    else{
                        //处理其他响应
                    }
                }
                else{
                    //通信信息
                }
            };
            xhr.open('GET','../'+src.____src,true);
            xhr.send();
        }
    };

    return public;
}();