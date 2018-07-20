window.onload = function () {
    _init();
}

var _init = function () {
    var _videoUrl = "http://116.62.150.38:7001/live/7E708B46.flv";
    var videoElement = document.getElementById("videoElement");
    if (flvjs.isSupported() && videoElement) {
        var _player = flvjs.createPlayer({
            type: 'flv',
            isLive: true,//<====加个这个 
            hasAudio: false,
            enableWorker: true,
            autoCleanupSourceBuffer: true,//对SourceBuffer进行自动清理
            // autoCleanupMaxBackwardDuration: 60,//当后向缓冲区持续时间超过此值（以秒为单位）时，为SourceBuffer执行自动清理
            // autoCleanupMinBackwardDuration: 40,
            url: _videoUrl,//<==自行修改

        });
        _player.attachMediaElement(videoElement);
        _player.load(); //加载 

        // setTimeout(function () { 
            _player.play();
        // }, 1500); 
    }
}