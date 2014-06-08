!function(win, doc, $){

    $(doc).ready(function() {
        chrome.runtime.sendMessage({method: "getLocalStorage", key: "tmall_mei_status"}, function(res) {
            var status = res.data;
            var today = (new Date()).toDateString();
            if (! (status && today === status)) {
                var m1 = doc.cookie.match(/_tb_token_=(.*?);/);
                if (m1) {
                    var tmall_mei_callback = function(t) {
                        if (t.success || t.code === "E03") {
                            chrome.runtime.sendMessage({
                                method: "setLocalStorage", key: "tmall_mei_status", val: today
                            }, function(res) {});
                            chrome.runtime.sendMessage({
                                method: "setLocalStorage", key: "tmall_mei_points", val: t.availableDays
                            }, function(res) {});
                        }
                    }

                    var tb_token = m1[1];
                    var timestamp = (new Date()).getTime();
                    $.ajax({
                        type     : "GET",
                        url      : 'http://shiyong.tmall.com/sign/doSignIn.htm',
                        data: {
                            _tb_token_: tb_token,
                            ua: '', // no need
                            cache: +new Date
                        },
                        dataType : 'json',
                        success  : function(data) {
                            tmall_mei_callback(data);
                        },
                        error: function(err) {
                            var err = err.response;
                            err = err.replace(/^\s*jsonp\(/, '').replace(/\)\;$/, '');
                            var data = JSON.parse(err);
                            tmall_mei_callback(data);
                        }
                    });
                }
            } else {
                console.log('[qiandao][tmall_mei] already signIn today.');
            }
        });
    });
}(window, document, Zepto);