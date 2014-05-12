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
                        break;
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
                            if (data.errcode == 0) {
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
        } else if (request.method == 'tieba_qiandao') {
            chrome.cookies.getAll({domain:"tieba.baidu.com"}, function (cookies){
                var is_logined = 0;
                for (var i in cookies) {
                    if (cookies[i].name == 'BAIDUID' || cookies[i].name == 'TIEBAUID') {
                        is_logined = 1;
                        break;
                    }
                }
                if (is_logined) {
                    var url = 'http://tieba.baidu.com/sign/add';
                    $.ajax({
                        type     : "POST",
                        url      : url,
                        data     : {
                            ie   : 'utf-8',
                            kw   : request.kw,
                            tbs  : request.tbs
                        },
                        dataType : 'json',
                        success  : function(data) {
                            // alert(JSON.stringify(data));
                            // {"no":0,"error":"","data":{"errno":0,"errmsg":"success","sign_version":2,"is_block":0,"finfo":{"forum_info":{"forum_id":8021166,"forum_name":"\u767e\u5ea6\u5f71\u68d2"},"current_rank_info":{"sign_count":1101}},"uinfo":{"user_id":889003992,"is_sign_in":1,"user_sign_rank":1101,"sign_time":1399875492,"cont_sign_num":1,"total_sign_num":2,"cout_total_sing_num":2,"hun_sign_num":1,"total_resign_num":0,"is_org_name":0}}}
                            // {"no":1101,"error":"亲，你之前已经签过了","data":""}
                            if (data.no == 0 || data.no == 1101) {
                                var today = (new Date()).toDateString();
                                localStorage.setItem("tieba_" + encodeURIComponent(request.kw) + "_status", today);
                                localStorage.setItem("tieba_status", today);
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