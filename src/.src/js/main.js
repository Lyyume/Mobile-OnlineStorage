var tree ,src ,pointer ,arrPoint ,config;
var _configHide = false,
    _configFB = true;
var touchStartY;


worker.configLoad();
renderAndroid.pageIni();
renderAndroid.eventReg();
renderAndroid.configLoad();
worker.getLocalStorage();