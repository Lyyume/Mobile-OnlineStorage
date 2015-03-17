var worker = function(){
    var public = {
        getLocalStorage: function(){
            src = JSON.parse(localStorage.getItem("openText"));
            ajax.load();
        },
        saveMark: function(num){
            var message = document.getElementById('message');
            localStorage.setItem(src.____name + 'Mark' + num ,document.body.scrollTop);
            message.innerHTML = '书签' + num + '存储成功';
            message.classList.remove('ani-message');
            setTimeout(function(){message.classList.add('ani-message');},0)
        },
        loadMark: function(num){
            var message = document.getElementById('message'),
                mark = localStorage.getItem(src.____name + 'Mark' + num);
            if(mark){
                document.body.scrollTop = mark;
                message.innerHTML = '书签' + num + '读取成功';
                message.classList.remove('ani-message');
                setTimeout(function(){message.classList.add('ani-message');},0)
            }
            else{
                message.innerHTML = '书签' + num + '未找到';
                message.classList.remove('ani-message');
                setTimeout(function(){message.classList.add('ani-message');},0)
            }
        }
    };
    return public
}();