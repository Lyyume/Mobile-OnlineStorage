var tool = function(){
    var public = {
        renderStyle: function(ele,css,num){
            num = num || false;
            if(num){
                return +window.getComputedStyle(ele,null)[css+''].match(/\d*/)[0];
            }
            else{
                return window.getComputedStyle(ele,null)[css+'']
            }
        }
    };

    return public
}();