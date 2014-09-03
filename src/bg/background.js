!function(win, doc, $){
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

        if (request.method === 'xiaomi_qiandao') {
            chrome.cookies.getAll({domain:".xiaomi.cn"}, function (cookies){
                var is_logined = 0;
                for (var i in cookies) {
                    if (cookies[i].name === 'userId') {
                        is_logined = 1;
                        break;
                    }
                }
                if (is_logined) {
                    $.ajax({
                        type     : "POST",
                        url      : 'http://bbs.xiaomi.cn/qiandao/index/share',
                        dataType : 'json',
                        success  : function(data) {
                            if (data.code == '200' || data.code == '202') {
                                var today = (new Date()).toDateString();
                                localStorage.setItem("xiaomi_status", today);
                                if (data.code == '200') {
                                    localStorage.setItem("xiaomi_points", data.user.tdays);
                                }
                            }
                        }
                    });
                }
            });
            return;
        }

        if (request.method === 'tieba_qiandao') {
            chrome.cookies.getAll({domain:"tieba.baidu.com"}, function (cookies){
                var is_logined = 0;
                for (var i in cookies) {
                    if (cookies[i].name === 'BAIDUID' || cookies[i].name === 'TIEBAUID') {
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
            return;
        }

        // utils
        if (request.method === "getLocalStorage") {
            sendResponse({data: localStorage[request.key]});
        } else if (request.method === "setLocalStorage") {
            localStorage.setItem(request.key, request.val);
            sendResponse({});
        } else {
            sendResponse({}); // snub them.
        }
    });
}(window, document, Zepto);