!function(win, doc, $){

    $(doc).ready(function() {
        // only do it when login
        if (1) {
            chrome.runtime.sendMessage({method: "getLocalStorage", key: "xiami_status"}, function(res) {
                var status = res.data;
                var today = (new Date()).toDateString();
                if (! (status && today === status)) {
                    $.ajax({
                        type     : "POST",
                        url      : 'http://www.xiami.com/task/signin',
                        dataType : 'html',
                        success  : function(data) {
                            if (data === '1') {
                                chrome.runtime.sendMessage({
                                    method: "setLocalStorage", key: "xiami_status", val: today
                                }, function(res) {});
                                console.log('[qiandao][xiami] signIn OK.');
                            } else {
                                console.log(data);
                            }
                        }
                    });
                } else {
                    console.log('[qiandao][xiami] already signIn today.');
                }
            });
        } else {
            console.log('[qiandao][xiami] not login yet.');
        }
    });

}(window, document, Zepto);