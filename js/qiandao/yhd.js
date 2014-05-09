!function(win, doc, $){

    $(doc).ready(function() {
        // only do it when login
        if (1) { // no way to find expect another request with https://passport.yhd.com/publicPassport/isLogin.do
            chrome.runtime.sendMessage({method: "getLocalStorage", key: "yhd_status"}, function(res) {
                var status = res.data;
                var today = (new Date()).toDateString();
                if (! (status && today === status)) {
                    console.log('send reques');
                    $.ajax({
                        type     : "POST",
                        url      : "http://vip.yhd.com/point.html",
                        dataType : "text/xml",
                        success  : function(data) {
                            // "code":1,"data":5,"message":""
                            // {"code":0,"data":"300100000003","message":"user today already sign point"}
                            if (data.indexOf('"code"') > -1) {
                                chrome.runtime.sendMessage({
                                    method: "setLocalStorage", key: "yhd_status", val: today
                                }, function(res) {});
                                console.log('[qiandao][yhd] signIn OK.');
                                // console.log(data);
                            }
                        }
                    });
                } else {
                    console.log('[qiandao][yhd] already signIn today.');
                }
            });
        } else {
            console.log('[qiandao][yhd] not login yet.');
        }
    });

}(window, document, Zepto);