!function(win, doc, $){
    $(doc).ready(function () {
        // Mark as Read
        chrome.browserAction.setBadgeText({
            text: ""
        });

        var ele = ['yhd_status', 'dianping_status', 'suning_status', 'suning_points', 'xiami_status'];
        $.each(ele, function(i, v) {
            $('#' + v).text(localStorage.getItem(v));
        });
    });

}(window, document, Zepto);