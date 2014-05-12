!function(win, doc, $){
    $(doc).ready(function() {
        var html = doc.documentElement.innerHTML;
        var m1 = html.match(/tbs[\'\"]?:\s*[\'\"](\w+)[\'\"]/); // tbs:'zzzz'
        var m2 = html.match(/fname=[\'\"]([^\'\"]+)[\'\"]/); // fname="Zzz"
        if (m1 && m2) {
            var tbs = m1[1];
            var kw  = m2[1];
            var status_key = "tieba_" + encodeURIComponent(kw) + "_status";
            chrome.runtime.sendMessage({method: "getLocalStorage", key: status_key}, function(res) {
                var status = res.data;
                var today = (new Date()).toDateString();
                if (! (status && today === status)) {
                    // need cookie
                    chrome.runtime.sendMessage({method: "tieba_qiandao", "tbs": tbs, "kw": kw}, function(res) {});
                } else {
                    console.log("[qiandao][tieba][" + kw + "] already signIn today.");
                }
            });
        }
    });
}(window, document, Zepto);