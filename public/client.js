var getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
};

var _baseURL = 'http://116.62.150.38:8080/ggmanager/api/';
var _cellHeight = Math.floor(document.body.clientHeight / 10);
var _cellWidth = Math.floor(document.body.clientWidth / 10);
var _groupLabel = undefined;
var _videoCameraIndex = 0;

var myBrowser = function () {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器
    if (userAgent.indexOf("Trident") > -1) {
        return "Edge";
    } //判断是否Edge浏览器
}();

var generateIeFlashVideo = function (item) {
    var _requestVideoUrl = '';
    if (item.camera === true) {
        _requestVideoUrl = "rtmp://116.62.150.38:1935/live/" + _groupLabel;
    } else if (item.video) {
        _requestVideoUrl = "http://116.62.150.38:8080/ggmanager/ggmanager_resources/" + _groupLabel + "/" + item.video;
    }
    return '<object v-if="flashShow" classid="clsid:D27CDB6E-AE6D-11cf-96B8-44455354000 ' + _videoCameraIndex + '"  width="100%" :height="100%">' +
        '<param name="movie" value="vgaplayer.swf" />' +
        '<param name="FlashVars" value="url=' + _requestVideoUrl + '" />' +
        '<param name="play" value="true">' +
        '<param name="loop" value="true">' +
        '<param name="bgcolor" value="#ffffff">' +
        '<embed src="vgaplayer.swf" width="100%" height="100%" allowScriptAccess="sameDomain" loop="true" bgcolor="#ffffff" ' +
        'allowFullScreen="true" type="application/x-shockwave-flash" FlashVars="url=' + _requestVideoUrl + '" pluginspage="https://get.adobe.com/cn/flashplayer/" />'
    '</object>';
}

var _parseVideoPlayer = function (gridstack, item) {
    _videoCameraIndex = _videoCameraIndex + 2;

    if (myBrowser === "IE" || myBrowser === "Edge") {
        var _dom = generateIeFlashVideo(item);
        gridstack.addWidget($(_dom),
            item.x, item.y, item.width, item.height, false);
        return;
    }
    if (item.camera === true) {
        var _videoUrl = "http://116.62.150.38:7001/live/" + _groupLabel + ".flv";
        console.log(_videoUrl);
        let _videoID = "video" + _videoCameraIndex;
        var _dom = '<video id="' + _videoID + '" class="video-js vjs-default-skin" width="640" height="480" muted="muted"' +
            ' data-setup="{ "controls": true, "autoplay": true, "preload": "auto"}" >' +
            '<source src="' + _videoUrl + '" type="video/x-flv"></video>';


        gridstack.addWidget($(_dom),
            item.x, item.y, item.width, item.height, false);

        setTimeout(function () {
            var videoElement = document.getElementById(_videoID);
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

                setTimeout(function () {
                    console.log(_player);
                    _player.play();
                }, 1500);

            }
        }, 1500);

    } else if (item.video) {
        var _videoUrl = "http://116.62.150.38:8080/ggmanager/ggmanager_resources/" + _groupLabel + "/" + item.video;
        var _dom = '<video style="background-color: #000000;" controls="controls" loop="loop" muted="muted" autoplay="autoplay" ' +
            'width="100%" height="100%" src="' + _videoUrl + '">浏览器不支持</video>'; 

        gridstack.addWidget($(_dom),
            item.x, item.y, item.width, item.height, false);
    }
}

var _parseImageLoop = function (gridstack, item) {
    var _images = item.images;

    if (!_images || _images.length == 0) return;
    var _baseUrl = "http://116.62.150.38:8080/ggmanager/ggmanager_resources/" + _groupLabel + "/";

    var itemHtml = "";
    _images.forEach(function (_image, _index) {
        if (_index === 0) {
            itemHtml = itemHtml + "<div class='item active' style='width: 100%; height: 100%;'><img style='width: 100%; height: 100%;' src='" + _baseUrl + _image + "'> </div>";
        } else {
            itemHtml = itemHtml + "<div class='item' style='width: 100%; height: 100%;'><img style='width: 100%; height: 100%;' src='" + _baseUrl + _image + "'> </div>";
        }
    });

    var indicatorsHtml = "";
    _images.forEach(function (_image, _index) {
        if (_index === 0) {
            indicatorsHtml = indicatorsHtml + "<li data-target='#carousel-example-generic' data-slide-to='0' class='active'></li>";
        } else {
            indicatorsHtml = indicatorsHtml + "<li data-target='#carousel-example-generic' data-slide-to='" + _index + "' class=''></li>";
        }
    });
    console.log(indicatorsHtml);
    var _dom =
        '<div>' +
        '<div id="carousel-example-generic" style="width: 100%; height: 100%;"  class="carousel slide carousel-vertical" data-ride="carousel">' +
        '<ol class="carousel-indicators">' + indicatorsHtml +
        '</ol>' +
        '<div class="carousel-inner" role="listbox" style="width: 100%; height: 100%;">' + itemHtml +
        '</div>' +
        '</div>' +
        '</div>';
    gridstack.addWidget($(_dom),
        item.x, item.y, item.width, item.height, false);

    setTimeout(function () {
        $('.carousel').carousel({
            interval: (item.interval ? item.interval : 3) * 1000
        })
    }, 2000);

}

var _parseTextLoop = function (gridstack, item) {
    if (item.texts) {
        var _height = (item.height * _cellHeight) + "px";

        var _textList = item.texts.split("\n");
        var newsHtml = "";
        _textList.forEach(function (_text, _index) {
            newsHtml = newsHtml + "<li class='news-item' style='color:#fff'>" + _text + "</li>";
        }); 

        var _dom = '<ul class="news" style="overflowY:hidden;height:`+ _height + `;padding: 20px;">' + newsHtml + '</ul>';
        gridstack.addWidget($(_dom),
            item.x, item.y, item.width, item.height, false); 
    } else {

    }
}

var parsePageJson = function (_content) {

    if (!_content || _content.length < 5) {
        document.getElementById("info").textContent = "页面未设计";
        return;
    }
    var _json = JSON.parse(_content);

    var _h = 10;
    var _w = 12;

    var options = {
        float: true,
        staticGrid: true,
        height: _h,
        width: _w,
        verticalMargin: "1px",
        cellHeight: _cellHeight,
        oneColumnModeClass: "",
    };
    $('.grid-stack').gridstack(options);
    var gridstack = $('.grid-stack').data('gridstack');

    // $('.grid-stack').on('added', function (event, items) {
    //     console.log(event);
    // });

    var items = GridStackUI.Utils.sort(_json);
    console.log(items);
    if (!items || items.length == 0) {

    }

    items.forEach(function (item) {
        if (item.type == "videoplayer") {
            _parseVideoPlayer(gridstack, item);
        } else if (item.type == "imageloop") {
            _parseImageLoop(gridstack, item);
        } else if (item.type == "textloop") {
            _parseTextLoop(gridstack, item);
        }
    });

}

var _lastJsonUpdateTime = 0;
var _group = this.getUrlParam("group");
var _page = this.getUrlParam("page");

var initPage = function () {
    if (_group) {
        _groupLabel = _group;
        var _response = $.ajax({ url: _baseURL + 'group/' + _group, async: false });
        if (_response) {
            var _json = _response.responseJSON;
            console.log(_json);
            var _content = _json.content;
            _lastJsonUpdateTime = _json.updateTime;
            parsePageJson(_content);
        }
    } else if (_page) {
        // client.html?page=2489C680  
        var _response = $.ajax({ url: _baseURL + 'page/' + _page, async: false });
        if (_response) {
            var _json = _response.responseJSON;
            _groupLabel = _json.group;
            console.log(_json);
            var _content = _json.content;
            _lastJsonUpdateTime = _json.updateTime;
            parsePageJson(_content);
        }
    } else {

    }
}

var _checkPage = function () {
    var _response = $.ajax({ url: _baseURL + 'group/' + _groupLabel + "/messages", async: false });
    if (_response) {
        var _json = _response.responseJSON;
        var _rows = _json.rows;
        if (_rows && _rows.length > 0) {
            var _message = _rows[0];
            var content = _message.name;
            document.getElementById("message").textContent = content;
        } else {
            document.getElementById("message").textContent = "";
        }
    }

    if (_group) {
        var _response = $.ajax({ url: _baseURL + 'group/' + _groupLabel, async: false });
        if (_response) {
            var _json = _response.responseJSON;
            if (_json.updateTime !== _lastJsonUpdateTime) {
                location.reload();
            }
        }
    } else if (_page) {
        // client.html?page=2489C680
        var _response = $.ajax({ url: _baseURL + 'page/' + _page, async: false });
        if (_response) {
            var _json = _response.responseJSON;
            if (_json.updateTime !== _lastJsonUpdateTime) {
                location.reload();
            }
        }
    } else {

    }
}

window.onload = function () {
    initPage();
    setInterval(_checkPage, 6000);
}