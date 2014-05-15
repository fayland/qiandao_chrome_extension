!function(win, doc, $){
    $(doc).ready(function() {
        chrome.runtime.sendMessage({method: "getLocalStorage", key: "xiami_status"}, function(res) {
            var status = res.data;
            var today = (new Date()).toDateString();
            if (! (status && today === status)) {
                // need cookie
                chrome.runtime.sendMessage({method: "xiami_qiandao"}, function(res) {});
            } else {
                console.log('[qiandao][xiami] already signIn today.');
            }
        });
    });
}(window, document, Zepto);