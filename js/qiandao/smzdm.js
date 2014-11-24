!function(win, doc, $){
    $(doc).ready(function() {
        chrome.runtime.sendMessage({method: "getLocalStorage", key: "smzdm_status"}, function(res) {
            var status = res.data;
            status = '';
            var today = (new Date()).toDateString();
            if (! (status && today === status)) {
                // check if logined
                if (doc.cookie.match(/user=/)) {
                    var onData = function(text) {
                        text = text.replace('(', '').replace(')', '');
                        var data = JSON.parse(text);

                        var error_code = data.error_code;
                        var point = data.data.cpoints;
                        if (error_code == 0) {
                            console.log('[qiandao][smzdm] qiandao OK.');
                            chrome.runtime.sendMessage({
                                method: "setLocalStorage", key: "smzdm_status", val: today
                            }, function(res) {});
                            chrome.runtime.sendMessage({
                                method: "setLocalStorage", key: "smzdm_points", val: point
                            }, function(res) {});
                        }
                    };
                    $.ajax({
                        type: "get",
                        url: 'http://www.smzdm.com/user/qiandao/jsonp_checkin',
                        // dataType: "json",
                        success: function(text) {
                            onData(text);
                        },
                        error: function(xhr) {
                            onData(xhr.responseText);
                        }
                    });
                }
            } else {
                console.log('[qiandao][smzdm] already signIn today.');
            }
        });
    });
}(window, document, Zepto);