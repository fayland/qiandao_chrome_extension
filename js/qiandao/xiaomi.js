!function(win, doc, $){
    $(doc).ready(function() {
        chrome.runtime.sendMessage({method: "getLocalStorage", key: "xiaomi_status"}, function(res) {
            var status = res.data;
            var today = (new Date()).toDateString();
            if (! (status && today === status)) {
                chrome.runtime.sendMessage({method: "xiaomi_qiandao"}, function(res) {});
            } else {
                console.log('[qiandao][xiaomi] already signIn today.');
            }
        });
    });
}(window, document, Zepto);