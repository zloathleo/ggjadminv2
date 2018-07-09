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