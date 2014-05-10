!function(win, doc, $){

    $(doc).ready(function() {
        chrome.runtime.sendMessage({method: "getLocalStorage", key: "taobao_status"}, function(res) {
            var status = res.data;
            var today = (new Date()).toDateString();
            if (! (status && today === status)) {
                // need cookie
                chrome.runtime.sendMessage({method: "taobao_qiandao"}, function(res) {
                    console.log(res);
                });
            } else {
                console.log('[qiandao][taobao] already signIn today.');
            }
        });
    });

}(window, document, Zepto);