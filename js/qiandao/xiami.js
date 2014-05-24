!function(win, doc, $){
    $(doc).ready(function() {

        chrome.runtime.sendMessage({method: "getLocalStorage", key: "xiami_status"}, function(res) {
            var status = res.data;
            var today = (new Date()).toDateString();
            if (! (status && today === status)) {
                // check if logined
                if (doc.cookie.match(/user=\d+/)) {
                    $.ajax({
                        type     : "POST",
                        url      : 'http://www.xiami.com/task/signin',
                        dataType : 'html',
                        success  : function(data) {
                            if (parseInt(data) === 1 || parseInt(data) === 2) {
                                chrome.runtime.sendMessage({
                                    method: "setLocalStorage", key: "xiami_status", val: today
                                }, function(res) {});
                            }
                        }
                    });
                }
            } else {
                console.log('[qiandao][xiami] already signIn today.');
            }
        });
    });
}(window, document, Zepto);