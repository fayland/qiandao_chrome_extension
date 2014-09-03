!function(win, doc, $){
    $(doc).ready(function() {
        chrome.runtime.sendMessage({method: "getLocalStorage", key: "taobao_status"}, function(res) {
            var status = res.data;
            var today = (new Date()).toDateString();
            if (! (status && today === status)) {
                var html = doc.documentElement.innerHTML;
                // <input name='_csrf_token' type='hidden' value='qyXK8dzP0GxL4qBK6jnLr4'>
                var m1 = html.match(/name=[\'\"]_csrf_token[\'\"] type=[\'\"]hidden[\'\"] value=[\'\"](.*?)[\'\"]/);
                if (m1 && m1[1]) {
                    var token = m1[1];
                    var timestamp = (new Date()).getTime();
                    var url = 'http://api.taojinbi.taobao.com/json/sign_in_everyday.htm?checkCode=null&t=' + timestamp + '&_tb_token_=' + token + '&enter_time=' + (timestamp - 10000) + '&ua=' + '&_ksTS=' + timestamp + '_200';
                    $.ajax({
                        type     : "GET",
                        url      : url,
                        dataType : 'json',
                        success  : function(data) {
                            // {"login":"true","currentLevel":"v5","nextLevel":"v6","nextMaxCoin":40,"code":1,"coinOld":9145,"coinNew":9155,"daysTomorrow":2,"coinTomorrow":"15","auth":true,"isTake":"false","takeAmount":"","friendNum":"0","switcher":"true"}
                            if (data.code == 1 || data.code == 2) { // 1 is OK, 2 is already done
                                chrome.runtime.sendMessage({
                                    method: "setLocalStorage", key: "taobao_status", val: today
                                }, function(res) {});
                                chrome.runtime.sendMessage({
                                    method: "setLocalStorage", key: "taobao_points", val: data.coinNew
                                }, function(res) {});
                            }
                        }
                    });
                }
            } else {
                console.log('[qiandao][taobao] already signIn today.');
            }
        });
    });
}(window, document, Zepto);