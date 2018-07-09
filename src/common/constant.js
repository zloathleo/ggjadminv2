
Date.prototype.Format = function (formatStr) {
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];

    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));

    str = str.replace(/MM/, this.getMonth() > 9 ? this.getMonth().toString() : '0' + this.getMonth());
    str = str.replace(/M/g, this.getMonth());

    str = str.replace(/w|W/g, Week[this.getDay()]);

    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    str = str.replace(/d|D/g, this.getDate());

    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    str = str.replace(/h|H/g, this.getHours());
    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    str = str.replace(/m/g, this.getMinutes());

    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    str = str.replace(/s|S/g, this.getSeconds());

    return str;
}

export default {
    serverPath: "http://116.62.150.38:8080/ggmanager/",

    parseDateTime: function (_long) {
        var _d = new Date(_long).Format("yyyy-MM-dd HH:mm:ss");
        return _d;
    },
    newDataTableOptions: function () {
        return {
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
    }
}