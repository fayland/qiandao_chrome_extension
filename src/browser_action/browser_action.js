!function(win, doc, $){
    $(doc).ready(function () {
        // Mark as Read
        chrome.browserAction.setBadgeText({
            text: ""
        });

        var ele = [
            'taobao_status', 'taobao_points',
            'yhd_status',
            'dianping_status',
            'xiami_status', 'xiami_points',
            'tieba_status',
            'weipan_status', 'weipan_points',
            'fund123_status',
            'iqiyi_status', 'iqiyi_points',
            'tmall_mei_status', 'tmall_mei_points',
            'etao_status', 'etao_points',
            'xiaomi_status', 'xiaomi_points'
        ];
        $.each(ele, function(i, v) {
            $('#' + v).text(localStorage.getItem(v));
        });
    });

}(window, document, Zepto);