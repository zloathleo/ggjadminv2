export default {
    serverPath: "http://124.47.22.86:8080/ggmanager/",

    uuid: function (len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;
        if (len) {
            // Compact form
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            var r;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    },

    parseError: function (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            if (error.response.data.err == -5) {
                setTimeout(function () {
                    window.location.href = "login.html";
                }, 1500);
            }
            return error.response.data.message;
        }
        return error;
    },

    parseDateTime: function (_long) {
        if (_long) {
            return new Date(_long).Format("yyyy-MM-dd HH:mm:ss");
        } else {
            return "-";
        }
    },

    parseScreenType: function (_stype) {
        if (_stype === "1") {
            return "竖屏";
        } else if (_stype === "2") {
            return "横屏";
        }
        return '';
    },

    parseMsgState: function (_s) {
        if (_s === 1) {
            return "正在播放";
        } else if (_s === -1) {
            return "已播放";
        } else {
            return "准备播放";
        }
        return _d;
    },
    newDataTableOptions: function () {
        return {
            destroy: true,
            ordering: false,
            searching: true,
            pagingType: "full_numbers",
            pageLength: 10,
            lengthMenu: [[10, 20], [10, 20]],
            language: {
                "decimal": "",
                "search": "搜索",
                "infoFiltered": " (从总计 _MAX_ 条记录中检索)",
                "searchPlaceholder": "",
                "emptyTable": "没有数据",
                "info": "共计 _TOTAL_ 条数据 , 当前展示第 _START_ 条至第 _END_ 条",
                "infoEmpty": "共计 0 条数据",
                "lengthMenu": "每页展示 _MENU_ 条数据",
                "loadingRecords": "数据加载中...",
                "zeroRecords": "没有找到符合条件的数据",
                paginate: {
                    first: "首页",
                    last: "尾页",
                    next: "下一页",
                    previous: "上一页"
                }
            }
        }

    },

    download_file: undefined,
    downloadFile: function (url) {
        if (this.download_file == undefined) {
            var iframe = document.createElement("iframe");
            this.download_file = iframe;
            document.body.appendChild(this.download_file);
        }
        this.download_file.src = this.serverPath + url;
        this.download_file.style.display = "none";
    },

}