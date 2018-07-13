var getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
};

var _baseURL = 'http://116.62.150.38:8080/ggmanager/api/';

window.onload = function () {

    var _group = this.getUrlParam("group");
    var _page = this.getUrlParam("page");

    if (_group) {
        let _response = $.ajax({ url: _baseURL + 'group/' + _group, async: false });
        if (_response) {
            var _json = _response.responseJSON;
            console.log(_json);
        }

    } else if (_page) {
        var _response = $.ajax({ url: _baseURL + 'page/' + _page, async: false });
        if (_response) {
            var _json = _response.responseJSON;

            var _content = _json.content;
            console.log(_json);
        }
    } else {

    }



    // var liveurl = "rtmp://116.62.150.38:1935/live/" + _name;
    // console.log(liveurl);

    // document.getElementById("swfobjecturl").value = "url=" + liveurl;

    // document.getElementById("swfobjectembed").flashvars = "url=" + liveurl;
}