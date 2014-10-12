!function(win, doc, $){

    $(doc).ready(function() {
        // only do it when login
        if ($('.J-user').length) {
            chrome.runtime.sendMessage({method: "getLocalStorage", key: "dianping_status"}, function(res) {
                var status = res.data;
                var today = (new Date()).toDateString();
                if (! (status && today === status)) {
                    $.getJSON('http://www.dianping.com/ajax/member/signIn/signIn', function(data) {
                        if (data.signInResult || data.code == 210) {
                            chrome.runtime.sendMessage({
                                method: "setLocalStorage", key: "dianping_status", val: today
                            }, function(res) {});
                            console.log('[qiandao][dianping] signIn OK.');
                            // console.log(data);
                        } else {
                            console.log('[qiandao][dianping] signIn failed.');
                        }
                    });

                } else {
                    console.log('[qiandao][dianping] already signIn today.');
                }
            });
        } else {
            console.log('[qiandao][dianping] not login yet.');
        }
    });

}(window, document, Zepto);