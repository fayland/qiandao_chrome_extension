!function(win, doc, $){
    $(doc).ready(function() {

        chrome.runtime.sendMessage({method: "getLocalStorage", key: "fund123_status"}, function(res) {
            var status = res.data;
            var today = (new Date()).toDateString();
            if (! (status && today === status)) {
                // check if logined
                if (doc.cookie.match(/user=/)) {
                    $.ajax({
                        type     : "POST",
                        url      : 'http://i.fund123.cn/Task/AjaxSignIn/',
                        dataType : 'json',
                        success  : function(data) {
                            if (data.success || data.msg == "您今天已经签过到啦") {
                                chrome.runtime.sendMessage({
                                    method: "setLocalStorage", key: "fund123_status", val: today
                                }, function(res) {});
                            }
                        }
                    });
                }
            } else {
                console.log('[qiandao][fund123] already signIn today.');
            }
        });
    });
}(window, document, Zepto);