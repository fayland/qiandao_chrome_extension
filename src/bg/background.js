!function(win, doc, $){
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.method == 'taobao_qiandao') {
            chrome.cookies.getAll({domain:"taobao.com"}, function (cookies){
                var token;
                for (var i in cookies) {
                    if (cookies[i].name == '_tb_token_') {
                        token = cookies[i].value;
                    }
                }
                if (token) {
                    var timestamp = (new Date()).getTime();
                    var url = 'http://vip.taobao.com/home/grant_everyday_coin.htm?checkCode=null&t=' + timestamp + '&_tb_token_=' + token;
                    $.ajax({
                        type     : "GET",
                        url      : url,
                        dataType : 'json',
                        success  : function(data) {
                            // {"login":"true","currentLevel":"v5","nextLevel":"v6","nextMaxCoin":40,"code":1,"coinOld":9145,"coinNew":9155,"daysTomorrow":2,"coinTomorrow":"15","auth":true,"isTake":"false","takeAmount":"","friendNum":"0","switcher":"true"}
                            if (data.code == 1 || data.code == 2) { // 1 is OK, 2 is already done
                                var today = (new Date()).toDateString();
                                localStorage.setItem('taobao_status', today);
                                localStorage.setItem('taobao_points', data.coinNew);
                            }
                        }
                    });
                }
            });
        } else if (request.method == 'weibo_qiandao') {
            chrome.cookies.getAll({domain:"weibo.com"}, function (cookies){
                var is_logined = 0;
                for (var i in cookies) {
                    if (cookies[i].name == 'login_sid_t') {
                        is_logined = 1;
                    }
                }
                console.log('is_logined:' + is_logined);
                if (is_logined) {
                    var url = 'http://vdisk.weibo.com/task/checkIn';
                    $.ajax({
                        type     : "POST",
                        url      : url,
                        async    : !1,
                        dataType : 'json',
                        success  : function(data) {
                            console.log(data);
                            // {"errcode":0,"msg":null,"data":[268,2]}
                            if (data.errcode == 0) { // 1 is OK, 2 is already done
                                var today = (new Date()).toDateString();
                                localStorage.setItem('weibo_status', today);
                                localStorage.setItem('weibo_points', data.data[1]);
                            }
                        },
                        error: function(err) {
                            console.log(err);
                        }
                    });
                }
            });
        } else if (request.method == "getLocalStorage") {
            sendResponse({data: localStorage[request.key]});
        } else if (request.method == "setLocalStorage") {
            localStorage.setItem(request.key, request.val);
            sendResponse({});
        } else {
            sendResponse({}); // snub them.
        }
    });
}(window, document, Zepto);