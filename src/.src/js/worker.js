var worker = function(){
    var public = {
        treeToObj: function(tree){
            var objTree = {},
                arrTree,
                arrPoint = [],
                pointer = objTree,
                buffer = '',
                jump = false;
            arrTree = tree.replace(/.\n/,'').split(/\n/);  //tree文件转化为数组
            for(var i = 0; i < arrTree.length - 1; i++){  //逐行处理tree文件
                var depth = arrPoint.length + 1,  //指针深度
                    _depth = arrTree[i].match(/[|]/g).length,  //文件深度
                    name = arrTree[i].replace(/[|]/g,'').replace(/^\s+/g,''),  //文件名
                    hide = !!name.match(/^[.]/);  //隐藏
                function extension(str){
                    //扩展名
                    var type = str.match(/[.]/g);
                    if(type === null){
                        return ''
                    }
                    if(type.length === 1){
                        if(hide){
                            return ''
                        }
                        else{
                            return str.match(/\w+$/)[0]
                        }
                    }
                    if(type.length > 1){
                        return str.match(/\w+$/)[0]
                    }
                }
                function src(obj){
                    //路径
                    var str = '';
                    if(obj.length === 0){
                        return str
                    }
                    else{
                        for(var u = 0; u < obj.length; u++){
                            str = str + obj[u] + '/'
                        }
                        return str
                    }
                }


                if(_depth === depth){
                    //同级目录
                    pointer[name] = {};
                    pointer[name]['____name'] = name;
                    pointer[name]['____extension'] = extension(name);
                    pointer[name]['____src'] = './' + src(arrPoint) + name;
                    pointer[name]['____hide'] = hide;
                    buffer = name;
                }
                else if(_depth === depth + 1){
                    //子目录
                    arrPoint.push(buffer);
                    pointer = pointer[buffer];
                    pointer[name] = {};
                    pointer[name]['____name'] = name;
                    pointer[name]['____extension'] = extension(name);
                    pointer[name]['____src'] = './' + src(arrPoint) + name;
                    pointer[name]['____hide'] = hide;
                    buffer = name;
                }
                else if(_depth < depth){
                    //父目录
                    var up = depth - _depth;
                    arrPoint.length = arrPoint.length - up;
                    if(arrPoint.length === 0){
                        pointer = objTree;
                    }
                    else{
                        var father = 'objTree';
                        for(var n = 0;n < arrPoint.length;n++){
                            father = father + '["' + arrPoint[n] + '"]'
                        }
                        pointer = eval(father);
                    }
                    pointer[name] = {};
                    pointer[name]['____name'] = name;
                    pointer[name]['____extension'] = extension(name);
                    pointer[name]['____src'] = './' + src(arrPoint) + name;
                    pointer[name]['____hide'] = hide;
                    buffer = name;
                }
            }
            return objTree;
        },
        setLocalStorage: function(){
            var srcJSON = JSON.stringify(src);
            localStorage.setItem("src",srcJSON);
        },
        getLocalStorage: function(){
            var srcJSON = localStorage.getItem("src");
            if(srcJSON === null){
                renderAndroid.createFirst();
            }
            else{
                src = JSON.parse(srcJSON);
                pointer = src;
                arrPoint = [];
                renderAndroid.dataLoad(src)
            }
        },
        delLocalStorage: function(){
            localStorage.removeItem('src');
        },
        regLocalStorage: function(str,type){
            localStorage.setItem("open" + type,str);
        }
    };
    return public
}();