var tree ,src ,pointer ,arrPoint;
var _configHide = false,
    _configFB = true;
var touchStartY;


renderAndroid.pageIni();
renderAndroid.eventReg();
renderAndroid.configLoad();
worker.getLocalStorage();