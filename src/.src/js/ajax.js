var ajax = function(){
    var public = {
        reload: function(){
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4){
                    if(xhr.status === 200){
                        tree = xhr.responseText;
                        src = worker.treeToObj(tree);
                        pointer = src;
                        arrPoint = [];
                        worker.setLocalStorage();
                        renderAndroid.dataLoad(src);

                    }
                    else{
                        //处理其他响应
                    }
                }
                else{
                    //通信信息
                }
            };
            xhr.open('GET','./tree.txt',true);
            xhr.send();
        }
    };
    return public
}();