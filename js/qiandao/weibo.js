!function(win, doc, $){

    $(doc).ready(function() {
        chrome.runtime.sendMessage({method: "getLocalStorage", key: "weipan_status"}, function(res) {
            var status = res.data;
            var today = (new Date()).toDateString();
            if (! (status && today === status)) {
                // check if logined
                if (doc.cookie.match(/SSOLoginState=/)) {
                    $.ajax({
                        type     : "POST",
                        url      : 'http://vdisk.weibo.com/task/checkIn',
                        async    : !1,
                        dataType : 'json',
                        beforeSend : function (xhr) {
                            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                        },
                        success  : function(data) {
                            // {"errcode":0,"msg":null,"data":[268,2]}
                            // {"errcode":1,"msg":"已经签到过了","data":{"app_uid":2583117564,"time":1400896165,"size":376,"star":3,"sent_weibo_size":0,"date":"20140524","quota":4497}}
                            if (data.errcode == 0 || data.errcode == 1) {
                                chrome.runtime.sendMessage({
                                    method: "setLocalStorage", key: "weipan_status", val: today
                                }, function(res) {});
                            }
                            if (data.errcode == 0) {
                                chrome.runtime.sendMessage({
                                    method: "setLocalStorage", key: "weipan_points", val: data.data[0]
                                }, function(res) {});
                            }
                        },
                        error: function(err) {
                            console.log(err);
                        }
                    });
                }
            } else {
                console.log('[qiandao][weipan] already signIn today.');
            }
        });
    });

}(window, document, Zepto);